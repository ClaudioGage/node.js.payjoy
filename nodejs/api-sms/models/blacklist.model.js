'use strict';

module.exports = (sequelize, DataTypes) => {
    var Blacklist = sequelize.define('blacklist', {
        blacklist_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        blacklist_msisdn: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        underscored: true
    });

    return Blacklist;
};