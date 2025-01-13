const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta según tu configuración

const Caja = sequelize.define('Caja', {
    caja_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    caja_nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    caja_estado: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    caja_fecha_apertura: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    caja_fecha_cierre: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuario',
            key: 'usuario_id',
        },
        allowNull: false,
    },
}, {
    tableName: 'caja',
    timestamps: false,
});

// Relación con usuario
Caja.belongsTo(require('./Usuario'), { foreignKey: 'usuario_id' });

module.exports = Caja;
