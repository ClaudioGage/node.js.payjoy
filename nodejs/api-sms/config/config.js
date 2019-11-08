require('dotenv').config();//instatiate environment variables

let CONFIG = {} //Make this global to use all over the application

CONFIG.app          = process.env.APP   || 'dev';
CONFIG.port         = process.env.PORT  || '3030';

CONFIG.db_dialect   = process.env.DB_DIALECT    || 'mysql';
CONFIG.db_host      = process.env.DB_HOST       || '169.62.164.215';
CONFIG.db_port      = process.env.DB_PORT       || '3306';
CONFIG.db_name      = process.env.DB_NAME       || 'messages';
CONFIG.db_user      = process.env.DB_USER       || 'messages';
CONFIG.db_password  = process.env.DB_PASSWORD   || '1qBs@messages';

CONFIG.jwt_encryption  = process.env.JWT_ENCRYPTION || 'cambioPassword';
CONFIG.jwt_expiration  = process.env.JWT_EXPIRATION || '30000';

module.exports = CONFIG;
