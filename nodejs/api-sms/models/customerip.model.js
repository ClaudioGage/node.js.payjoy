'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var CustomerIp = sequelize.define('customer_ip', {
        customer_ip_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        underscored: true
    });

    return CustomerIp;
};
