'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var Customer = sequelize.define('customer', {
        customer_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        customer_status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customer_max_mt_month: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customer_max_mt_day: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        customer_tolerance: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },{
        underscored: true
    });

    return Customer;
};
