const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class AchievementsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const achievements = await db.achievements.create(
      {
        id: data.id || undefined,

        achievement_name: data.achievement_name || null,
        date_earned: data.date_earned || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await achievements.setUser(data.user || null, {
      transaction,
    });

    await achievements.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return achievements;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const achievementsData = data.map((item, index) => ({
      id: item.id || undefined,

      achievement_name: item.achievement_name || null,
      date_earned: item.date_earned || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const achievements = await db.achievements.bulkCreate(achievementsData, {
      transaction,
    });

    // For each item created, replace relation files

    return achievements;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const achievements = await db.achievements.findByPk(
      id,
      {},
      { transaction },
    );

    await achievements.update(
      {
        achievement_name: data.achievement_name || null,
        date_earned: data.date_earned || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await achievements.setUser(data.user || null, {
      transaction,
    });

    await achievements.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return achievements;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const achievements = await db.achievements.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of achievements) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of achievements) {
        await record.destroy({ transaction });
      }
    });

    return achievements;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const achievements = await db.achievements.findByPk(id, options);

    await achievements.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await achievements.destroy({
      transaction,
    });

    return achievements;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const achievements = await db.achievements.findOne(
      { where },
      { transaction },
    );

    if (!achievements) {
      return achievements;
    }

    const output = achievements.get({ plain: true });

    output.user = await achievements.getUser({
      transaction,
    });

    output.organization = await achievements.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.organizations,
        as: 'organization',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.achievement_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'achievements',
            'achievement_name',
            filter.achievement_name,
          ),
        };
      }

      if (filter.date_earnedRange) {
        const [start, end] = filter.date_earnedRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_earned: {
              ...where.date_earned,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_earned: {
              ...where.date_earned,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user) {
        const listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.achievements.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.achievements.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('achievements', 'achievement_name', query),
        ],
      };
    }

    const records = await db.achievements.findAll({
      attributes: ['id', 'achievement_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['achievement_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.achievement_name,
    }));
  }
};
