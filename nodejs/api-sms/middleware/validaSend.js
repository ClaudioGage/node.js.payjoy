const { to, ReE, ReS } = require('../services/util.service');
const {Campaign, Bagsms, CustomerParent, CustomerControlMt, User, UserControlMt, ShortCode, CustomerCarrierConecctionShortCode, Contries} = require('./../models');
const Sequelize = require('sequelize');

//valida user month
async function controlUserMtsMonth(userId){
    try{
        let sumaBolsa;    
        [err, sumaBolsa] = await to(UserControlMt.findOne({    
            attributes: [
                /*[Sequelize.fn('SUM', Sequelize.col('customer_control_mt_delivered')), 'total']*/
                [Sequelize.literal('IFNULL(SUM(user_control_mt_delivered), 0)'), 'total']
            ],            
            where: {
                user_id: userId,
                where: Sequelize.and(
                    Sequelize.where(
                        Sequelize.fn('MONTH', Sequelize.col('user_control_mt_created')), 
                        Sequelize.Op.eq,
                        Sequelize.fn('MONTH', Sequelize.fn('NOW'))
                    ),
                    Sequelize.where(
                        Sequelize.fn('YEAR', Sequelize.col('user_control_mt_created')), 
                        Sequelize.Op.eq,
                        Sequelize.fn('YEAR', Sequelize.fn('NOW'))
                    )
                )                        
            },                  
            raw: true
        }));       
        let valida = (sumaBolsa === null ) ? false : (sumaBolsa.total) ? true : false;
        if(!valida)
            return null;
        else
            return sumaBolsa;
    }catch(err){
        return false;
    }    
}

//valida user DAY
async function controlUserrMtsDay(userId){
    try{
        let sumaBolsa;    
        [err, sumaBolsa] = await to(UserControlMt.findOne({    
            attributes: [
                /*[Sequelize.fn('SUM', Sequelize.col('customer_control_mt_delivered')), 'total']*/
                [Sequelize.literal('IFNULL(SUM(user_control_mt_delivered), 0)'), 'total']
            ],            
            where: {
                user_id: userId,
                where: Sequelize.and(
                    Sequelize.where(
                        Sequelize.fn('DATE', Sequelize.col('user_control_mt_created')), 
                        Sequelize.Op.eq,
                        Sequelize.fn('DATE', Sequelize.fn('NOW'))
                    )
                )                        
            },                  
            raw: true
        }));
        let valida = (sumaBolsa === null ) ? false : (sumaBolsa.total) ? true : false;
        if(!valida)
            return null;
        else
            return sumaBolsa;
    }catch(err){
        return false;
    }    
}

//valida customer month
async function controlCustomerMtsMonth(customerId){
    try{
        let sumaBolsa;    
        [err, sumaBolsa] = await to(CustomerControlMt.findOne({    
            attributes: [
                /*[Sequelize.fn('SUM', Sequelize.col('customer_control_mt_delivered')), 'total']*/
                [Sequelize.literal('IFNULL(SUM(customer_control_mt_delivered), 0)'), 'total']
            ],            
            where: {
                customer_id: customerId,
                where: Sequelize.and(
                    Sequelize.where(
                        Sequelize.fn('MONTH', Sequelize.col('customer_control_mt_created')), 
                        Sequelize.Op.eq,
                        Sequelize.fn('MONTH', Sequelize.fn('NOW'))
                    ),
                    Sequelize.where(
                        Sequelize.fn('YEAR', Sequelize.col('customer_control_mt_created')), 
                        Sequelize.Op.eq,
                        Sequelize.fn('YEAR', Sequelize.fn('NOW'))
                    )
                )                        
            },                  
            raw: true
        }));       
        let valida = (sumaBolsa === null ) ? false : (sumaBolsa.total) ? true : false;
        if(!valida)
            return null;
        else
            return sumaBolsa;
    }catch(err){
        return false;
    }    
}

//valida customer DAY
async function controlCustomerMtsDay(customerId){
    try{
        let sumaBolsa;    
        [err, sumaBolsa] = await to(CustomerControlMt.findOne({    
            attributes: [
                /*[Sequelize.fn('SUM', Sequelize.col('customer_control_mt_delivered')), 'total']*/
                [Sequelize.literal('IFNULL(SUM(customer_control_mt_delivered), 0)'), 'total']
            ],            
            where: {
                customer_id: customerId,
                where: Sequelize.and(
                    Sequelize.where(
                        Sequelize.fn('DATE', Sequelize.col('customer_control_mt_created')), 
                        Sequelize.Op.eq,
                        Sequelize.fn('DATE', Sequelize.fn('NOW'))
                    )
                )                        
            },                  
            raw: true
        }));       
        let valida = (sumaBolsa === null ) ? false : (sumaBolsa.total) ? true : false;
        if(!valida)
            return null;
        else
            return sumaBolsa;
    }catch(err){
        return false;
    }    
}

//valida controlMts
async function controlMts(customerId, fecha){
    try{
        let sumaBolsa;    
        [err, sumaBolsa] = await to(CustomerControlMt.findOne({    
            attributes: [
                /*[Sequelize.fn('SUM', Sequelize.col('customer_control_mt_delivered')), 'total']*/
                [Sequelize.literal('IFNULL(SUM(customer_control_mt_delivered), 0)'), 'total']
            ],            
            where: {
                customer_id: customerId,
                where: Sequelize.and(
                    Sequelize.where(
                        Sequelize.fn('DATE', Sequelize.col('customer_control_mt_created')), 
                        Sequelize.Op.gte,
                        Sequelize.fn('DATE', fecha)
                    )
                )                        
            },                  
            raw: true
        }));
        let valida = (sumaBolsa === null ) ? false : (sumaBolsa.total) ? true : false;
        if(!valida)
            return null;
        else
            return sumaBolsa;
    }catch(err){
        console.log(err);
        return false;
    }    
}

//valida obtieneBolsa
async function obtieneBolsaSuma(customerId){
    try{
        let sumaBolsa;    
        [err, sumaBolsa] = await to(Bagsms.findOne({    
            attributes: [
                /*[Sequelize.fn('SUM', Sequelize.col('bagsms_quantity')), 'total']*/
                [Sequelize.literal('IFNULL(SUM(bagsms_quantity), 0)'), 'total']
            ],            
            where: {
                customer_id: customerId,
                bagsms_status: 1
            },                  
            raw: true
        }));
       
        let valida = (sumaBolsa === null ) ? false : (sumaBolsa.total) ? true : false;
        if(!valida)
            return null;
        else
            return sumaBolsa;        
    }catch(err){
        return false;
    }    
}

//valida obtieneBolsaParent
async function obtieneBolsaParent(customerId){
    try{
        let customer;    
        [err, customer] = await to(CustomerParent.findOne({    
            attributes: [                
                'customer_id'
            ],            
            where: {
                customer_child_id: customerId,
            },                
            raw: true
        }));

        let valida = (customer === null ) ? false : (customer.customer_id) ? true : false;
        if(!valida)
            return null;
        else
            return customer;
    }catch(err){
        return false;
    }    
}

//valida obtieneBolsa
async function obtieneBolsa(customerId){
    try{
        let tipoBolsa;    
        [err, tipoBolsa] = await to(Bagsms.findOne({    
            attributes: [
                /*[Sequelize.literal('CASE WHEN bagsms_created IS NULL THEN now() ELSE bagsms_created END'), 'fecha'],*/
                /*[Sequelize.literal('CASE WHEN SUM(bagsms_quantity) IS NULL THEN "" ELSE SUM(bagsms_quantity) END'), 'total_bolsa']*/
                'type', 'bagsms_created'
            ],            
            where: {
                customer_id: customerId,
                bagsms_status: 1
            },    
            order: [
                ['bagsms_created', 'ASC'],
            ],   
            raw: true
        }));

        let valida = (tipoBolsa === null ) ? false : (tipoBolsa.type) ? true : false;
        if(!valida)
            return null;
        else
            return tipoBolsa;
    }catch(err){
        return false;
    }    
}

//valida validaCampania
async function validaCampania(customerId, campaniaId){

    try{
        let campaign;    
        [err, campaign] = await to(Campaign.findOne({    
            attributes: ['user_id'],
            include: [
                {
                    model: User,
                    required: true,
                    where: {
                        user_status: 1
                    },
                    attributes: ['user_max_mt_month', 'user_max_mt_day']
                },
                {
                    model: Contries,
                    required: true,                    
                    attributes: ['code_logn']
                },
                {
                    model: ShortCode,
                    required: true,                
                    attributes: ['short_code'],
                    include: [
                        {
                            model: CustomerCarrierConecctionShortCode,
                            required: true,                
                            attributes: ['carrier_connection_id'],
                            where: {
                                customer_id: customerId
                            }
                        }
                    ]
                }                
            ],
            where: {
                customer_id: customerId,
                campaign_id: campaniaId,
                campaign_status_id: 3
            },                
            raw: true
        }));
        let valida = (campaign === null ) ? false : (campaign.user_id) ? true : false;
        if(!valida)
            return false;
        else{
            return campaign;
        }
    }catch(err){
        return false;
    }    
}

let validaSend = async function (req, res, next) {

    let general = {};

    let customer_id, campania_id, err;
    customer_id = req.customer_id;
    campania_id = req.campaniaId;

    general.customer_id = customer_id;
    general.campaign_id = campania_id;
    general.customer_id_original = customer_id;

    [errCampania, getUserId] = await to(validaCampania(customer_id, campania_id));

    console.log("getUserId", getUserId);

    if(errCampania || getUserId === null || !getUserId){
        return ReE(res, "err finding campania_id");
    }

    const userId = getUserId.user_id;
    const userMaxMonth = getUserId['user.user_max_mt_month'];
    const userMaxDay = getUserId['user.user_max_mt_day'];
    const shortCode = getUserId['short_code.short_code'];
    const carrierConnectionId = getUserId['short_code.customer_carrier_conecction_short_codes.carrier_connection_id'];
    //const 

    general.user_id = userId;
    general.user_max_mt_month = userMaxMonth;
    general.user_max_mt_day = userMaxDay;
    general.short_code = shortCode;
    general.carrier_connection_id = carrierConnectionId;
    general.code_logn = getUserId['contry.code_logn'];

    [errBolsa, bolsaTipo] = await to(obtieneBolsa(customer_id));

    if(errBolsa){
        return ReE(res, "err bagsms");
    }

    let bolsaCustomerId = customer_id;
    let bolsaType = "";
    let bolsaCreated = "";
    let bolsaTotal = 0;

    const customer_max_mt_month = req.customer_max_mt_month;
    const customer_max_mt_day = req.customer_max_mt_day;
    const customer_tolerance = req.customer_tolerance;

    general.customer_max_mt_month = customer_max_mt_month;
    general.customer_max_mt_day = customer_max_mt_day;
    general.customer_tolerance = customer_tolerance;

    console.log("customer_tolerance", customer_tolerance);

    //valida si tiene bolsa
    if(bolsaTipo === null){
        console.log("no tiene bolsa");
        [errParent, customerParent] = await to(obtieneBolsaParent(customer_id));

        if(errParent || customerParent === null){
            return ReE(res, "err bagsms");
        }

        //asignacion de customer parent
        bolsaCustomerId = customerParent.customer_id;
        general.customer_id_parent = bolsaCustomerId;
        general.customer_id = bolsaCustomerId;

        [errBolsa, bolsaTipo] = await to(obtieneBolsa(customer_id));

        if(errBolsa || bolsaTipo === null){
            return ReE(res, "err bagsms");
        }

        bolsaType = bolsaTipo.type;
        bolsaCreated = bolsaTipo.bagsms_created;

    }else{
        bolsaType = bolsaTipo.type;
        bolsaCreated = bolsaTipo.bagsms_created;
    }

    console.log("bolsaCustomerId", bolsaCustomerId);
    [errBolsaSuma, bolsaSuma] = await to(obtieneBolsaSuma(bolsaCustomerId));

    console.log("err err obtieneBolsaSuma", errBolsaSuma);
    console.log("success obtieneBolsaSuma", bolsaSuma);

    if(errBolsaSuma || (bolsaSuma === null)){
        return ReE(res, "err bagsms");
    }    

    console.log("bolsaSuma", bolsaSuma);

    //asigna bolsa configurada
    bolsaTotal = bolsaSuma.total;
    console.log("bolsaTotal", bolsaTotal);

    [errMtMandados, mtMandados] = await to(controlMts(bolsaCustomerId, bolsaCreated));

    if(errMtMandados || (mtMandados === null)){
        return ReE(res, "err bagsms");
    }

    console.log("mtMandados", mtMandados);

    const mtProcesados = mtMandados.total;
    let tolerancia = 0;
    if(customer_tolerance >= 1){
        let factor = customer_tolerance / 100;
        tolerancia = Math.floor(bolsaTotal * factor);
    }

    console.log("tolerancia", tolerancia);

    console.log("operacion", `${mtProcesados} > (${bolsaTotal} + ${tolerancia})`);

    let total = parseInt(bolsaTotal) + parseInt(tolerancia);
    console.log("total", total);
    if(parseInt(mtProcesados) >= total){        
        return ReE(res, "err max mts");
    }

    [errCustomerControlDay, customerControlDay] = await to(controlCustomerMtsDay(bolsaCustomerId));

    if(errCustomerControlDay || (customerControlDay === null)){
        return ReE(res, "err bagsms");
    }

    console.log("antes de la ultima", `${customerControlDay.total} >= ${customer_max_mt_day}`)
    if(parseInt(customerControlDay.total >= customer_max_mt_day)){        
        return ReE(res, "err bagsms");
    }

    console.log("customerControlDay", customerControlDay);

    [errCustomerMtsMonth, customerMtsMonth] = await to(controlCustomerMtsMonth(bolsaCustomerId));

    if(errCustomerMtsMonth || (customerMtsMonth === null)){
        return ReE(res, "err bagsms");
    }

    console.log("controlCustomerMtsMonth", customerMtsMonth);

    console.log("antes de la controlCustomerMtsMonth", `${customerMtsMonth.total} >= ${customer_max_mt_day}`)
    if(parseInt(customerMtsMonth.total >= customer_max_mt_month)){        
        return ReE(res, "err bagsms");
    }


    //valida user  day  
    [errControlUserrMtsDay, mtsControlUserMtsDay] = await to(controlUserrMtsDay(userId));

    if(errControlUserrMtsDay || (mtsControlUserMtsDay === null)){
        return ReE(res, "err bagsms");
    }

    console.log("antes de la ultima user", `${mtsControlUserMtsDay.total} >= ${userMaxDay}`)
    if(parseInt(mtsControlUserMtsDay.total >= userMaxDay)){        
        return ReE(res, "err bagsms");
    }

    console.log("customerControlDay", mtsControlUserMtsDay);

    //valida user month  
    [errControlUserrMtsMonth, mtsControlUserMtsMonth] = await to(controlUserMtsMonth(userId));

    if(errControlUserrMtsMonth || (mtsControlUserMtsMonth === null)){
        return ReE(res, "err bagsms");
    }

    console.log("antes de la ultima user", `${mtsControlUserMtsMonth.total} >= ${userMaxMonth}`)
    if(parseInt(mtsControlUserMtsMonth.total >= userMaxMonth)){
        return ReE(res, "err bagsms");
    }

    console.log("mtsControlUserMtsMonth", mtsControlUserMtsMonth);


    console.log("=>VALIDA");

    req.general = general;
    console.log("general", req.general);

    next();
}

module.exports.validaSend = validaSend;