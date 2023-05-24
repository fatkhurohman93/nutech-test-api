"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonColumn = void 0;

var _sequelize = require("sequelize");

var commonColumn = {
  createdTime: {
    type: _sequelize.DataTypes.DATE,
    allowNull: false
  },
  createdDate: {
    type: _sequelize.DataTypes.DATEONLY,
    allowNull: false
  },
  year: {
    type: _sequelize.DataTypes.SMALLINT,
    allowNull: false
  },
  lastUpdatedTime: {
    type: _sequelize.DataTypes.DATE
  },
  month: {
    type: _sequelize.DataTypes.SMALLINT,
    allowNull: false
  },
  createdBy: {
    type: _sequelize.DataTypes.STRING('16')
  },
  lastUpdatedBy: {
    type: _sequelize.DataTypes.STRING('16')
  },
  archived: {
    type: _sequelize.DataTypes.BOOLEAN
  }
};
exports.commonColumn = commonColumn;