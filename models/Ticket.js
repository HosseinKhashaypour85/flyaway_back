const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Ticket = sequelize.define('tickets', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    buyer_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ticket_time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount_paid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ticket_type: {
        type: DataTypes.ENUM('plane', 'train', 'bus'),
        allowNull: false
    },
    passengers_amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { timestamps: false })

module.exports = Ticket;