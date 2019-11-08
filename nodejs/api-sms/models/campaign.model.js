'use strict';

module.exports = (sequelize, DataTypes) => {
    var Campaign = sequelize.define('campaign', {
        campaign_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        campaign_status_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'user',
                key: 'user_id'
            } 
        },
        short_code_id: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'short_code',
                key: 'short_code_id'
            } 
        },
        country_id: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'contries',
                key: 'country_id'
            } 
        }
    },{
        underscored: true
    });

    return Campaign;
};
