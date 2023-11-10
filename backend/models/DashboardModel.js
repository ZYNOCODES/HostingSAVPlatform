const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const statistic = sequelize.define('statistics', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  NbTicketsOuverts: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  ProduitEnAttente: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  ProduitDeposes: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  ProduitRepares: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  ProduitEnReparation: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  EnAttenteDePickup: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  Produitlivre: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  ProduitSuspendu:{
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  DelaiMoyenReparation: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  createdAt	: {
    type: DataTypes.DATEONLY,
  },
  updatedAt	: {
    type: DataTypes.DATE,
  },
},{
  timestamps: true,
});

module.exports = statistic;
