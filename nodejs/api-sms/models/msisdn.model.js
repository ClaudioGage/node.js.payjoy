'use strict';

module.exports = (sequelize, DataTypes) => {
    var Msisdn = sequelize.define('msisdn', {
        msisdn_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        msisdn: {
            type: DataTypes.STRING
        },
        msisdn_mtime: {
            type: DataTypes.DATE
        },
        carrier_id: {
            type: DataTypes.INTEGER
        }
    },{
        underscored: true
    });

    return Msisdn;
};
