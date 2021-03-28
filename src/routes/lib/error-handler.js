const { responseHeaders } = require('./response-headers');

/**
 * Catch all for all exceptions that did not get caught and handled.
 */
module.exports = error => {
  let statusCode = 500;
  let code = 'Internal Server Error';
  let message = error.message;
  log.info(error, 'Error caught in Router');

  const response = {
    headers: responseHeaders,
    statusCode,
    body: JSON.stringify({ message, code }),
  };
  log.info(response, 'response');

  return response;
};
