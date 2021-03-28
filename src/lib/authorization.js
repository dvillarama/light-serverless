const jwtDecode = require('jwt-decode');

/**
 * We need to get the user information from the JWT token
 */
const decode = (authorization = '') => {
  const [bearer, token] = authorization.split(' ');
  if (token) {
    return jwtDecode(token);
  }
};

module.exports = {
  decode,
};
