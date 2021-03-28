const AWS = require('aws-sdk');

const region = process.env.DB_REGION
const hostname = process.env.DB_HOSTNAME
const port = process.env.DB_PORT
const username = process.env.DB_USERNAME
const database = `${process.env.NODE_ENV}-main`;
const ssl = 'Amazon RDS';

/**
 *  For connecting to the AWS Database Proxy
 */
class Proxy {
  createConfig() {
    log.info('Creating Proxy Database Connection Configuration');

    const signer = new AWS.RDS.Signer({
      username,
      region,
      hostname,
      port
    });

    const rdsSignerAuth = () => () => {
      const token = signer.getAuthToken({ username, region, hostname, port });
      log.info ("IAM Token obtained: " + token);
      return token;
    };

    return {
      host: hostname,
      user: username,
      database,
      ssl: { rejectUnauthorized: false},
      authPlugins: { mysql_clear_password: rdsSignerAuth },
    };
  }
}

module.exports = Proxy;
