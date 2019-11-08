const Sequelize = require('sequelize');
const {ApiKeySecret, ApiKey, ApiSecret, Customer, CustomerIp} = require('./../models');
const { to, ReE, ReS } = require('../services/util.service');
var BasicStrategy = require('passport-http').BasicStrategy;
const validator     = require('validator');
const logger = require('../config/logger');

function getCallerIP(request) {
    var ip = request.headers['x-forwarded-for'] ||
        request.connection.remoteAddress ||
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;
    ip = ip.split(',')[0];
    ip = ip.split(':').slice(-1); //in case the ip returned in a format: "::ffff:146.xxx.xxx.xxx"
    return ip;
}

module.exports = function(passport){
    logger.info("INICIA...");
    console.log("entro");
    
    var opts = {};
    opts.passReqToCallback = true;

    passport.use(
        new BasicStrategy(opts, async function(req, username, password, callback) {
            
           const publicKey = req.params.customer_id;           
           console.log("publicKey", publicKey);

            if(username == "" || password == ""){
                return callback(null, false);
            }            

            if(username != "apisecret_id"){
                return callback(null, false);
            }

            const campaniaId = req.params.campania_id;
            if(campaniaId == ""){
                return callback(null, false);
            }

            if(!validator.isNumeric(campaniaId)){
                console.log("campaniaId isNumeric", campaniaId);
                return callback(null, false);
            }

            req.campaniaId = campaniaId;
            
            let rawCustomer;
            [err, rawCustomer] = await to(ApiKeySecret.findOne({    
                attributes: ['customer_id'],
                include: [
                    {
                        model: ApiKey,
                        required: true,
                        where: {
                            apikey: Sequelize.where(Sequelize.fn('BINARY', Sequelize.col('apikey')), 'LIKE',  publicKey)
                        },
                        attributes: []
                    },
                    {
                        model: ApiSecret,
                        required: true,
                        where: {
                            apisecret: Sequelize.where(Sequelize.fn('BINARY', Sequelize.col('apisecret')), 'LIKE',  password)
                        },
                        attributes: []
                    },
                    {
                        model: Customer,
                        required: true,
                        where:{
                            customer_status: [1] 
                        },
                        attributes: ['customer_max_mt_month', 'customer_max_mt_day', 'customer_tolerance']
                    }                
                ],
                raw: true
            }));

            console.log("success", rawCustomer);
            console.log("err", err);            
            
            if(err){
                return callback(null, false);
            }            

            console.log("SI PASSA 1");

            var customerId = 0;
            if ( rawCustomer === null){
                return callback(null, false);                
            }else{
                if(rawCustomer.customer_id){
                    console.log("SI PASSA 1.1");
                    req.customer_id = rawCustomer.customer_id;
                    req.customer_max_mt_month = rawCustomer['customer.customer_max_mt_month'];
                    req.customer_max_mt_day = rawCustomer['customer.customer_max_mt_day'];
                    req.customer_tolerance = rawCustomer['customer.customer_tolerance'];
                    console.log("rawCustomer.customer_id", rawCustomer.customer_id);
                }else{
                    return callback(null, false);
                }
            }
            
            console.log("SI PASSA 2", req.customer_id);

            var ip = getCallerIP(req);

            let rawCustomerIp;
            [err, rawCustomerIp] = await to(CustomerIp.findOne({    
                attributes: ['customer_id'],
                where: {
                    customer_id: req.customer_id,
                    ip: ip
                },                
                raw: true
            }));

            if(rawCustomerIp === null){
                return callback(null, false);     
            }else{
                console.log("SI PASSA");
                if(rawCustomerIp.customer_id){
                    return callback(null, username);
                }else{
                    return callback(null, false);
                }
            }
        })
    );
}
