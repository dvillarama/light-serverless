const CORS_KEY = 'access-control-allow-origin';
const CONTENT_TYPE = 'content-type';

const responseHeaders = {
    [CORS_KEY]: '*',
    [CONTENT_TYPE]: 'application/json',
};

module.exports = {
  responseHeaders
};
