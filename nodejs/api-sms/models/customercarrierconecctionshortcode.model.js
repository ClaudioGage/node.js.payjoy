'use strict';
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const jwt           	= require('jsonwebtoken');
const {TE, to}          = require('../services/util.service');
const CONFIG            = require('../config/config');

module.exports = (sequelize, DataTypes) => {
    var CustomerCarrierConecctionShortCode = sequelize.define('customer_carrier_conecction_short_code', {
        customer_carrier_conecction_short_code_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'customer',
                key: 'customer_id'
            } 
        },
        short_code_id: {
            type: DataTypes.INTEGER(11),            
            references: {
                model: 'short_code',
                key: 'short_code_id'
            } 
        },
        carrier_connection_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    },{
        underscored: true
    });

    return CustomerCarrierConecctionShortCode;
};
