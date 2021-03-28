const region = process.env.DB_REGION
const hostname = process.env.DB_HOSTNAME
const port = process.env.DB_PORT
const username = process.env.DB_USERNAME
const password: process.env.DEV_PASSWORD,
const database = `${process.env.NODE_ENV}-main`;
const ssl = 'Amazon RDS';

/**
 *  For connecting to the AWS Database directly
 */
class Db {
  createConfig() {
    log.info('Creating Local Database Connection Configuration');

    return {
      host: hostname,
      user: username,
      database,
      password,
      ssl
    };
  }
}

module.exports = Db;
