'use strict';

module.exports = (sequelize, DataTypes) => {
    var DeferredSmsCampaign = sequelize.define('deferred_sms_campaign', {
        deferred_sms_campaign_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        delivery_time: {
            type: DataTypes.DATE
        },       
        source: {
            type: DataTypes.STRING
        },
        destination: {
            type: DataTypes.STRING
        },
        text: {
            type: DataTypes.STRING
        },
        carrier_connection_id: {
            type: DataTypes.INTEGER
        },
        dlr: {
            type: DataTypes.INTEGER
        },
        encoding: {
            type: DataTypes.STRING
        },
        encoding_byte: {
            type: DataTypes.INTEGER
        },
        sms_campaign_id: {
            type: DataTypes.INTEGER
        },
        sms_campaign_api_id: {
            type: DataTypes.INTEGER
        },
        deferred_sms_campaign_estatus: {
            type: DataTypes.INTEGER
        },
        sms_campaign_type_message_id: {
            type: DataTypes.INTEGER
        }
    },{
        underscored: true
    });

    return DeferredSmsCampaign;
};
