'use strict';
const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const db        = {};
const CONFIG = require('../config/config');

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
  host: CONFIG.db_host,
  dialect: CONFIG.db_dialect,
  port: CONFIG.db_port,
  operatorsAliases: false,
  define: {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  },
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: true
  },
  timezone: '-05:00', // for writing to database
  pool: {
    max: 20,
    min: 1,
    idle: 10000
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

//inicio de modelos
db.ApiKey = require("./apikey.model")(sequelize, Sequelize);
db.ApiSecret = require("./apisecret.model")(sequelize, Sequelize);
db.ApiKeySecret = require("./apikeysecret.model")(sequelize, Sequelize);
db.Customer = require("./customer.model")(sequelize, Sequelize);
db.CustomerIp = require("./customerip.model")(sequelize, Sequelize);
db.Blacklist = require("./blacklist.model")(sequelize, Sequelize);
db.Campaign = require("./campaign.model")(sequelize, Sequelize);
db.Bagsms = require("./bagsms.model")(sequelize, Sequelize);
db.CustomerParent = require("./customerparent.model")(sequelize, Sequelize);
db.CustomerControlMt = require("./customercontrolmt.model")(sequelize, Sequelize);
db.User = require("./user.model")(sequelize, Sequelize);
db.UserControlMt = require("./usercontrolmt.model")(sequelize, Sequelize);
db.ShortCode = require("./shortcode.model")(sequelize, Sequelize);
db.CustomerCarrierConecctionShortCode = require("./customercarrierconecctionshortcode.model")(sequelize, Sequelize);
db.Contries = require("./contries.model")(sequelize, Sequelize);
db.Msisdn = require("./msisdn.model")(sequelize, Sequelize);
db.SmsCampaign = require("./smscampaign.model")(sequelize, Sequelize);
db.DeferredSmsCampaign = require("./deferredsmscampaign.model")(sequelize, Sequelize);

//relaciones
db.ApiKey.hasMany(db.ApiKeySecret,  {  foreignKey: "apikey_id" });
db.ApiKeySecret.belongsTo(db.ApiKey,  {  foreignKey: "apikey_id" });

db.ApiSecret.hasMany(db.ApiKeySecret,  {  foreignKey: "apisecret_id" });
db.ApiKeySecret.belongsTo(db.ApiSecret,  {  foreignKey: "apisecret_id" });

db.Customer.hasMany(db.ApiKeySecret,  {  foreignKey: "customer_id" });
db.ApiKeySecret.belongsTo(db.Customer,  {  foreignKey: "customer_id" });

db.User.hasMany(db.Campaign,  {  foreignKey: "user_id" });
db.Campaign.belongsTo(db.User,  {  foreignKey: "user_id" });

db.ShortCode.hasMany(db.Campaign,  {  foreignKey: "short_code_id" });
db.Campaign.belongsTo(db.ShortCode,  {  foreignKey: "short_code_id"});

db.ShortCode.hasMany(db.CustomerCarrierConecctionShortCode,  {  foreignKey: "short_code_id"});
db.CustomerCarrierConecctionShortCode.belongsTo(db.ShortCode,  {  foreignKey: "short_code_id" });

db.Contries.hasMany(db.Campaign,  {  foreignKey: "country_id" });
db.Campaign.belongsTo(db.Contries,  {  foreignKey: "country_id" });



module.exports = db;