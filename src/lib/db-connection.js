const mysql = require('mysql2/promise');

const Db = require('./db');
const Proxy = require('./proxy');

/**
 * Create a database connection
 */
const createConnection = async (source) => {
  const connectionConfig = source.createConfig();
  const connection = await mysql.createConnection(connectionConfig);
  log.info('Successful created a connection');
  return connection;
}

/**
 * Mini-factory.  Return the correct connection for the environment.
 */
const getConnection = async () => {
  // The Db Proxy is only available inside the VPN
  // so I connect to the database the old fashioned way when
  // testing locally (sls invoke local -f <method>)
  if (process.env.IS_LOCAL) {
    return await createConnection(new Db());
  }
  return await createConnection(new Proxy());
}

// When testing locally, you don't need to cache the database
// connection
const closeConnection = async (connection) => {
  // close the connection if running locally
  if (process.env.IS_LOCAL && connection) {
    return await connection.end();
  }
}

module.exports = {
  getConnection,
  closeConnection
}
