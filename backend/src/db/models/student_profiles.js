const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const student_profiles = sequelize.define(
    'student_profiles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      strengths: {
        type: DataTypes.TEXT,
      },

      weaknesses: {
        type: DataTypes.TEXT,
      },

      learning_preferences: {
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

  student_profiles.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.student_profiles.hasMany(db.study_plans, {
      as: 'study_plans_student_profile',
      foreignKey: {
        name: 'student_profileId',
      },
      constraints: false,
    });

    //end loop

    db.student_profiles.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.student_profiles.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.student_profiles.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.student_profiles.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return student_profiles;
};
