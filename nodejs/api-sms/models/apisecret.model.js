'use strict';

module.exports = (sequelize, DataTypes) => {
    var ApiSecret = sequelize.define('apisecret', {
        apisecret_id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true
        },
        apisecret_created: {
            type: DataTypes.DATE,
            allowNull: false
        },
        apisecret_mtime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        apisecret: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        underscored: true
    });

    return ApiSecret;
};
