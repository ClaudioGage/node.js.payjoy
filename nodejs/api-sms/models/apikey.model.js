'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var ApiKey = sequelize.define('apikey', {
        apikey_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        apikey: {
            type: DataTypes.STRING,
            allowNull: false
        },
        apikey_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        underscored: true
    });

    return ApiKey;
};
