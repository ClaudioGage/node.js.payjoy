var Queue = require('bull', 'redis://127.0.0.1:6379');
var messageQueue = new Queue('messages', 'redis://127.0.0.1:6379');

const uuidV1 = require('uuid/v1');
const validator     = require('validator');
const { to, ReE, ReS } = require('../services/util.service');
var accents = require('remove-accents');
const Sequelize = require('sequelize');
const {Blacklist, Msisdn, SmsCampaign, DeferredSmsCampaign} = require('./../models');


messageQueue.on('error', function (error) {
    console.error(`Error in bull queue happend: ${error}`);
})

messageQueue.process(async (job, done) => {
    let data = job.data;
    [errMsisdn, getMsisdn] = await to(validaMsisdn(data.message.destination));
    console.log("getMsisdn", getMsisdn);

    if(errMsisdn){
        done(null, "error");
    }

    let msisdnId = 0;
    if(getMsisdn !== null){
        msisdnId = getMsisdn.msisdn_id;
    }else{
        [errCreateMsisdn, getCreateMsisdn] = await to(createMsisdn(data.message.destination));
        if(errCreateMsisdn || getCreateMsisdn === undefined){
            done(null, "error");
        }

        if(parseInt(getCreateMsisdn.dataValues.msisdn_id) >= 1){
            msisdnId = getCreateMsisdn.dataValues.msisdn_id;
        }else{
            done(null, "error");
        }
    }

    let insert = {};
    insert.destination = data.message.destination;
    insert.text = data.message.text;
    insert.api_message_id = data.message.api_message_id;
    insert.customer_id = data.message.general.customer_id_original;
    insert.campaign_id = data.message.general.campaign_id;
    insert.short_code = data.message.general.short_code;
    insert.carrier_connection_id = data.message.general.carrier_connection_id;
    insert.msisdn_id = msisdnId;
    
    console.log("insert", insert);

    [errCreateSmsCampania, createSmsCampania] = await to(insertSmsCampaign(insert));
    if(errCreateSmsCampania || createSmsCampania === undefined){
        done(null, "error");
    }

    let smsCampaignId = 0;
    if(parseInt(createSmsCampania.dataValues.sms_campaign_id) >= 1){
        smsCampaignId = createSmsCampania.dataValues.sms_campaign_id;
    }else{
        done(null, "error");
    }

    insert.sms_campaign_id = smsCampaignId;
    
    console.log("hasta aqui");

    [errInsertDeferred, getInsertDeferred] = await to(insertDeferred(insert));
    if(errInsertDeferred || getInsertDeferred === undefined){
        done(null, "error");
    }

    if(parseInt(getInsertDeferred.dataValues.deferred_sms_campaign_id) >= 1){
        insert.deferred_sms_campaign_id = getInsertDeferred.dataValues.deferred_sms_campaign_id;
        done(null, `success: ${insert.destination} ${insert.short_code} ${insert.api_message_id} ${insert.deferred_sms_campaign_id}`);  
    }else{
        done(null, "error");
    }

    done(null, "success");   
});

messageQueue.on('completed', (job, result) => {
    console.log(`Job completed with result ${result}`);
});

function validString (string) {//[^ == not
    var regex = /[^0-9A-Za-z $\%#"\/\?!+-\\*\.{='&\]}()<>;,:¡]/g
    return !regex.test(string);//false if found
}

//insertSmsCampaign 
async function insertDeferred(insert){
    try{
        let getMsisdn;    
        [err, getMsisdn] = await to(DeferredSmsCampaign.create({    
            delivery_time: Sequelize.fn('NOW'),          
            source: insert.short_code,  
            destination: insert.destination,            
            text: insert.text,
            carrier_connection_id: insert.carrier_connection_id,
            dlr: 17,
            encoding: 'CHARSET_GSM8',
            encoding_byte: 0,
            sms_campaign_id: insert.sms_campaign_id,
            sms_campaign_api_id: 0,
            deferred_sms_campaign_estatus: 0,
            sms_campaign_type_message_id: 1
        }));
        return getMsisdn;
    }catch(err){
        return false;
    }    
}

//insertSmsCampaign 
async function insertSmsCampaign(insert){
    try{
        let getMsisdn;    
        [err, getMsisdn] = await to(SmsCampaign.create({    
            sms_campaign_entry_time: Sequelize.fn('NOW'),
            sms_campaign_delivery_time: Sequelize.fn('NOW'),
            sms_campaign_destination: insert.destination,
            sms_campaign_source: insert.short_code,
            sms_campaign_content: insert.text,
            sms_campaign_intentos: 0,
            sms_campaign_type_message_id: 1,
            sms_campaign_secuencia: 0,
            sms_campaign_status_id: 4,
            msisdn_id: insert.msisdn_id,
            campaign_id: insert.campaign_id,
            customer_id: insert.customer_id,
            api_message_id: insert.api_message_id
        }));
        return getMsisdn;
    }catch(err){
        return false;
    }    
}

//createMsisdn 
async function createMsisdn(msisdn){

    console.log("validaMsisdn");
    try{
        let getMsisdn;    
        [err, getMsisdn] = await to(Msisdn.create({    
             msisdn: msisdn,
             carrier_id: -10
        }));

        return getMsisdn;
    }catch(err){
        return false;
    }    
}

//validaMsisdn 
async function validaMsisdn(msisdn){

    console.log("validaMsisdn");
    try{
        let getMsisdn;    
        [err, getMsisdn] = await to(Msisdn.findOne({    
            attributes: ['msisdn', 'msisdn_id'],
            where: {
                msisdn: msisdn
            },                
            raw: true
        }));

        return getMsisdn;
    }catch(err){
        return false;
    }    
}

//valida blacklist
async function validaBlacklist(msisdn, customerId){

    console.log("INICIO BLACK");
    try{
        let blacklist;    
        [err, blacklist] = await to(Blacklist.findOne({    
            attributes: ['customer_id'],
            where: {
                customer_id: customerId,
                blacklist_msisdn: msisdn
            },                
            raw: true
        }));

        let valida = (blacklist === null ) ? false : (blacklist.customer_id) ? true : false;
        console.log("fin blacklist", valida);
        return valida;
    }catch(err){
        return false;
    }    
}


const send = async function(req, res){    

    console.log("ENTRA DASH", "SI");
    
    var sms = {};
    sms.text = validator.trim(req.body.text);
    sms.destination = validator.trim(req.body.destination);
    sms.customer_id = req.customer_id;
    sms.text = validator.escape(sms.text);
    sms.general = req.general;


    console.log("=>SMS=>", sms);

    if(validator.isEmpty(sms.text)){
        return ReE(res, "err text empty");
    }

    if(accents.has(sms.text)){
        return ReE(res, "err formating text");
    }

    if(validator.isEmpty(sms.destination)){
        return ReE(res, "err formating mobile");
    }

    if(!validator.isNumeric(sms.destination)){
        return ReE(res, "err formating mobile");
    }

    if(sms.destination.length != sms.general.code_logn){
        return ReE(res, "err formating length");
    }

    if(!validString(sms.text)){
        return ReE(res, "err formating text characters");
    }

    console.log("JUAN");
    //validaBlacklist
    [errBlack, black] = await to(validaBlacklist(sms.destination, sms.customer_id));

    if(black || errBlack){
        console.log("validaBlacklist", "entra");
        return ReE(res, "err blacklist");
    }
    //validaBlacklist
   
    sms.api_message_id = uuidV1();
    console.log("=>MESSAGE", sms);

    //return res.json({success:true, message: 'queued', api_message_id: sms.api_meessage_id});

    
    messageQueue.add({message: sms}).then((job) => {
        return res.json({success:true, message: 'queued', api_message_id: sms.api_message_id});
    })
    .catch(err => {
        console.log("err", err);
        //posible conexion a redis
        return ReE(res, "err internal error");
    });
}
module.exports.send = send
