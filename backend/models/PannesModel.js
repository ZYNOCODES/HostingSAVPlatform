const { DataTypes } = require('sequelize');
const sequelize = require('../config/Database');

const Panne = sequelize.define('pannes', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  Nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ReferanceProduit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  NbrSerie: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  TypePanne: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Wilaya: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  CentreDepot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  DateDepot: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  FinReparation:{
    type: DataTypes.DATE,
    allowNull: true,
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Progres: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  StatueGarantie:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  ActionCorrective:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  DescriptionAC:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  Etat:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  BDPDFfile:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  BLPDFfile:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  UserID: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
},{
  timestamps: true,
});

module.exports = Panne;
