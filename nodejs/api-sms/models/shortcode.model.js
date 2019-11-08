'use strict';

module.exports = (sequelize, DataTypes) => {
    var ShortCode = sequelize.define('short_code', {
        short_code_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        short_code: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        master: {
            type: DataTypes.INTEGER(11),
            allowNull: false 
        }
    },{
        underscored: true
    });

    return ShortCode;
};
