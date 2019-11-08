'use strict';

module.exports = (sequelize, DataTypes) => {
    var CustomerParent = sequelize.define('customer_parent', {
        customer_parent_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },        
        customer_id: {
            type: DataTypes.INTEGER(11)
        },
        customer_child_id: {
            type: DataTypes.INTEGER(11)
        }        
    },{
        underscored: true
    });

    return CustomerParent;
};
