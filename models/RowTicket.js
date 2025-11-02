const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RowTicket = sequelize.define('rowTicket', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ticket_title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = RowTicket;