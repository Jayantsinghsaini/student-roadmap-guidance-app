const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Student_profilesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const student_profiles = await db.student_profiles.create(
      {
        id: data.id || undefined,

        strengths: data.strengths || null,
        weaknesses: data.weaknesses || null,
        learning_preferences: data.learning_preferences || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await student_profiles.setUser(data.user || null, {
      transaction,
    });

    await student_profiles.setOrganization(
      currentUser.organization.id || null,
      {
        transaction,
      },
    );

    return student_profiles;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const student_profilesData = data.map((item, index) => ({
      id: item.id || undefined,

      strengths: item.strengths || null,
      weaknesses: item.weaknesses || null,
      learning_preferences: item.learning_preferences || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const student_profiles = await db.student_profiles.bulkCreate(
      student_profilesData,
      { transaction },
    );

    // For each item created, replace relation files

    return student_profiles;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const student_profiles = await db.student_profiles.findByPk(
      id,
      {},
      { transaction },
    );

    await student_profiles.update(
      {
        strengths: data.strengths || null,
        weaknesses: data.weaknesses || null,
        learning_preferences: data.learning_preferences || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await student_profiles.setUser(data.user || null, {
      transaction,
    });

    await student_profiles.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return student_profiles;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const student_profiles = await db.student_profiles.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of student_profiles) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of student_profiles) {
        await record.destroy({ transaction });
      }
    });

    return student_profiles;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const student_profiles = await db.student_profiles.findByPk(id, options);

    await student_profiles.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await student_profiles.destroy({
      transaction,
    });

    return student_profiles;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const student_profiles = await db.student_profiles.findOne(
      { where },
      { transaction },
    );

    if (!student_profiles) {
      return student_profiles;
    }

    const output = student_profiles.get({ plain: true });

    output.study_plans_student_profile =
      await student_profiles.getStudy_plans_student_profile({
        transaction,
      });

    output.user = await student_profiles.getUser({
      transaction,
    });

    output.organization = await student_profiles.getOrganization({
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

      if (filter.strengths) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'student_profiles',
            'strengths',
            filter.strengths,
          ),
        };
      }

      if (filter.weaknesses) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'student_profiles',
            'weaknesses',
            filter.weaknesses,
          ),
        };
      }

      if (filter.learning_preferences) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'student_profiles',
            'learning_preferences',
            filter.learning_preferences,
          ),
        };
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
          count: await db.student_profiles.count({
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
      : await db.student_profiles.findAndCountAll({
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
          Utils.ilike('student_profiles', 'user', query),
        ],
      };
    }

    const records = await db.student_profiles.findAll({
      attributes: ['id', 'user'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['user', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.user,
    }));
  }
};
