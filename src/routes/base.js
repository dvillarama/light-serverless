const bunyan = require('bunyan');

const { getConnection, closeConnection } = require('../lib/db-connection');
const { decode } = require('../lib/authorization');
const { responseHeaders } = require('./lib/response-headers');
const errorHandler = require('./lib/error-handler');

require('dotenv').config();

class Base {
  constructor() {
    // We use bunyan so that it would be all the logs would be in JSON format
    // to stream to elasticsearch.
    global.log = bunyan.createLogger({ name: 'logger' });
    log.info(`Lambda is running ${process.env.IS_LOCAL ? 'locally' : 'in cloud'}`);
  }

  /**
   * Information can be passed through the endpoint via the query string, body
   * or route path.  Get these from the AWS event.
   */
  parseParameters(event) {
    const { body = '{}', pathParameters = {}, queryStringParameters = {} } = event;
    const bodyParams = JSON.parse(body);
    return { pathParams: pathParameters, bodyParams, queryParams: queryStringParameters };
  }

  /**
   * Get the user information from the JWT token and put in a global variable
   */
  parseAuthorization({ authorization }) {
    global.currentUser = decode(authorization) || {};
    log.info({ currentUser }, 'Current User');
  }

  /**
   * Handle successful results
   */
  handleResponse(responseBody, logResponse) {
    const response = {
      headers: responseHeaders,
      body: JSON.stringify(responseBody),
      statusCode: 200,
    };

    if (logResponse) {
      log.info({ response }, 'Response');
    }

    return response;
  }

  /**
   * Most endpoints should use this method.
   *  - sets up database if necessary
   *  - standarizes logging
   */
  async route(event, { useDb = true, logResponse = true }, callback) {
    try {
      const { routeKey, rawPath, rawQueryString, headers = {} } = event;
      log.info(`****** Starting Event ${routeKey} ******* `);
      log.info({ event }, 'Received Event');
      this.parseAuthorization(headers);

      // cache database connection
      this.connection = useDb && (this.connection || (await getConnection()));
      const responseBody = await callback(this.parseParameters(event));
      return this.handleResponse(responseBody, logResponse);

    } catch (error) {
      return errorHandler(error);
    } finally {
      await closeConnection(this.connection);
      log.info('****** Event Finished ******* ');
    }
  }
}

module.exports = Base;
