const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Study_plansDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const study_plans = await db.study_plans.create(
      {
        id: data.id || undefined,

        created_date: data.created_date || null,
        last_updated: data.last_updated || null,
        plan_details: data.plan_details || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await study_plans.setStudent_profile(data.student_profile || null, {
      transaction,
    });

    await study_plans.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    return study_plans;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const study_plansData = data.map((item, index) => ({
      id: item.id || undefined,

      created_date: item.created_date || null,
      last_updated: item.last_updated || null,
      plan_details: item.plan_details || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const study_plans = await db.study_plans.bulkCreate(study_plansData, {
      transaction,
    });

    // For each item created, replace relation files

    return study_plans;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const study_plans = await db.study_plans.findByPk(id, {}, { transaction });

    await study_plans.update(
      {
        created_date: data.created_date || null,
        last_updated: data.last_updated || null,
        plan_details: data.plan_details || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await study_plans.setStudent_profile(data.student_profile || null, {
      transaction,
    });

    await study_plans.setOrganization(
      (globalAccess ? data.organization : currentUser.organization.id) || null,
      {
        transaction,
      },
    );

    return study_plans;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const study_plans = await db.study_plans.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of study_plans) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of study_plans) {
        await record.destroy({ transaction });
      }
    });

    return study_plans;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const study_plans = await db.study_plans.findByPk(id, options);

    await study_plans.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await study_plans.destroy({
      transaction,
    });

    return study_plans;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const study_plans = await db.study_plans.findOne(
      { where },
      { transaction },
    );

    if (!study_plans) {
      return study_plans;
    }

    const output = study_plans.get({ plain: true });

    output.student_profile = await study_plans.getStudent_profile({
      transaction,
    });

    output.organization = await study_plans.getOrganization({
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
        model: db.student_profiles,
        as: 'student_profile',
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

      if (filter.plan_details) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'study_plans',
            'plan_details',
            filter.plan_details,
          ),
        };
      }

      if (filter.calendarStart && filter.calendarEnd) {
        where = {
          ...where,
          [Op.or]: [
            {
              created_date: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
            {
              last_updated: {
                [Op.between]: [filter.calendarStart, filter.calendarEnd],
              },
            },
          ],
        };
      }

      if (filter.created_dateRange) {
        const [start, end] = filter.created_dateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            created_date: {
              ...where.created_date,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            created_date: {
              ...where.created_date,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.last_updatedRange) {
        const [start, end] = filter.last_updatedRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            last_updated: {
              ...where.last_updated,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            last_updated: {
              ...where.last_updated,
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

      if (filter.student_profile) {
        const listItems = filter.student_profile.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          student_profileId: { [Op.or]: listItems },
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
          count: await db.study_plans.count({
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
      : await db.study_plans.findAndCountAll({
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
          Utils.ilike('study_plans', 'plan_details', query),
        ],
      };
    }

    const records = await db.study_plans.findAll({
      attributes: ['id', 'plan_details'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['plan_details', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.plan_details,
    }));
  }
};
