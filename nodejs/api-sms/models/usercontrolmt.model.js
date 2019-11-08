'use strict';

module.exports = (sequelize, DataTypes) => {
    var UserControlMt = sequelize.define('user_control_mt', {
        user_control_mt_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        user_control_mt_created: {
            type: DataTypes.DATE
        },
        user_control_mt_mtime: {
            type: DataTypes.DATE
        },
        user_control_mt_count: {
            type: DataTypes.INTEGER
        },
        user_control_mt_delivered: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        }
    },{
        underscored: true
    });

    return UserControlMt;
};
