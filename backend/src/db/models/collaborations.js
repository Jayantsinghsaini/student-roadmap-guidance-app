const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const collaborations = sequelize.define(
    'collaborations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      topic: {
        type: DataTypes.TEXT,
      },

      start_time: {
        type: DataTypes.DATE,
      },

      end_time: {
        type: DataTypes.DATE,
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

  collaborations.associate = (db) => {
    db.collaborations.belongsToMany(db.users, {
      as: 'students',
      foreignKey: {
        name: 'collaborations_studentsId',
      },
      constraints: false,
      through: 'collaborationsStudentsUsers',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.collaborations.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.collaborations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.collaborations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return collaborations;
};
