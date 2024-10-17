const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const study_plans = sequelize.define(
    'study_plans',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      created_date: {
        type: DataTypes.DATE,
      },

      last_updated: {
        type: DataTypes.DATE,
      },

      plan_details: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  study_plans.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.study_plans.belongsTo(db.student_profiles, {
      as: 'student_profile',
      foreignKey: {
        name: 'student_profileId',
      },
      constraints: false,
    });

    db.study_plans.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.study_plans.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.study_plans.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return study_plans;
};
