'use strict';

module.exports = (sequelize, DataTypes) => {
    var CustomerControlMt = sequelize.define('customer_control_mt', {
        customer_control_mt_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        customer_control_mt_created: {
            type: DataTypes.DATE
        },
        customer_control_mt_mtime: {
            type: DataTypes.DATE
        },
        customer_control_mt_count: {
            type: DataTypes.INTEGER
        },
        customer_control_mt_delivered: {
            type: DataTypes.INTEGER
        },
        customer_id: {
            type: DataTypes.INTEGER
        }
    },{
        underscored: true
    });

    return CustomerControlMt;
};
