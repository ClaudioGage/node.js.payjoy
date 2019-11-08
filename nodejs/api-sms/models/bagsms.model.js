'use strict';

module.exports = (sequelize, DataTypes) => {
    var Bagsms = sequelize.define('bagsms', {
        bagsms_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        bagsms_created: {
            type: DataTypes.DATE
        },
        bagsms_expired: {
            type: DataTypes.DATE
        },
        bagsms_quantity: {
            type: DataTypes.INTEGER
        },
        bagsms_status: {
            type: DataTypes.INTEGER
        },
        customer_id: {
            type: DataTypes.INTEGER
        },
        type: {
            type: DataTypes.INTEGER
        }
    },{
        underscored: true
    });

    return Bagsms;
};
