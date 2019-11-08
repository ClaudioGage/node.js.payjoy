'use strict';

module.exports = (sequelize, DataTypes) => {
    var ApiKeySecret = sequelize.define('api_key_secret', {
        api_key_secret_id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        apikey_id: {
            type: DataTypes.INTEGER(11),   
            references: {
                model: 'apikey',
                key: 'apikey_id'
            }     
        },
        apisecret_id: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'apisecret',
                key: 'apisecret_id'
            } 
        },
        customer_id: {
            type: DataTypes.INTEGER(11),
            references: {
                model: 'customer',
                key: 'customer_id'
            }
        }
    },{
        underscored: true
    });

    ApiKeySecret.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return ApiKeySecret;
};