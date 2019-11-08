'use strict';

module.exports = (sequelize, DataTypes) => {
    var Contries = sequelize.define('contries', {
        country_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        code: {
            type: DataTypes.INTEGER
        },
        code_logn: {
            type: DataTypes.INTEGER
        },
        length: {
            type: DataTypes.INTEGER
        }
    },{
        underscored: true
    });

    return Contries;
};
