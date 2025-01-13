const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  usuario_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  usuario_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_clave: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caja_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'usuario',
  timestamps: false,
});

module.exports = Usuario;
