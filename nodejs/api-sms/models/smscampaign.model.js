'use strict';

module.exports = (sequelize, DataTypes) => {
    var SmsCampaign = sequelize.define('sms_campaign', {
        sms_campaign_id: {
            type: DataTypes.INTEGER(11), 
            autoIncrement: true,
            primaryKey: true,
            allowNull: false        
        },
        sms_campaign_entry_time: {
            type: DataTypes.DATE
        },
        sms_campaign_delivery_time: {
            type: DataTypes.DATE
        },
        sms_campaign_destination: {
            type: DataTypes.STRING
        },
        sms_campaign_source: {
            type: DataTypes.STRING
        },
        sms_campaign_content: {
            type: DataTypes.STRING
        },
        sms_campaign_intentos: {
            type: DataTypes.INTEGER
        },
        sms_campaign_type_message_id: {
            type: DataTypes.INTEGER
        },
        sms_campaign_secuencia: {
            type: DataTypes.INTEGER
        },
        sms_campaign_status_id: {
            type: DataTypes.INTEGER
        },
        msisdn_id: {
            type: DataTypes.INTEGER
        },campaign_id: {
            type: DataTypes.INTEGER
        },
        customer_id: {
            type: DataTypes.INTEGER
        },api_message_id: {
            type: DataTypes.STRING
        }
    },{
        underscored: true
    });

    return SmsCampaign;
};
