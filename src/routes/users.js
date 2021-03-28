const Base = require('./base');
const Model = require('../models/users');

// validation rules are different per endpoint
const {
  validateCreate,
  validateUpdate,
  validatePath,
} = require('../schema/users');

// You can DRY this up by creating validator handler that you can pass in the constructor
// but I think that will just make it harder to maintain once endpoints functionality diverges.
class Users extends Base {
  /**
   * Create the authenticated user's account
   * - The user creates their own account.
   */
  async create(event) {
    return await this.route(event, {}, async ({ pathParams, bodyParams, queryParams }) => {
      const model = new Model(this.connection);
      const uid = currentUser?.sub; // Authenticated user is global variable
      return await model.create(validateCreate(uid, bodyParams));
    });
  }

  /**
   * Update their own account
   *  - Warning:  This is not good security.  Another authenticated user can modify someone
   *  else's account.  You can fix this on this level by creating an Authorization library
   *  or do it at the database level.
   */
  async update(event) {
    return await this.route(event, {}, async ({ pathParams, bodyParams, queryParams }) => {
      const model = new Model(this.connection);
      return await model.update(validatePath(pathParams), validateUpdate(bodyParams));
    });
  }

  /**
   * Get an account
   */
  async get(event) {
    return await this.route(event, {}, async ({ pathParams, bodyParams, queryParams }) => {
      const model = new Model(this.connection);
      return await model.update(validatePath(pathParams));
    });
  }

  /**
   *  Delete the account.
   */
  async remove(event) {
    return await this.route(event, {}, async ({ pathParams, bodyParams, queryParams }) => {
      const model = new Model(this.connection);
      return await model.remove(validatePath(pathParams));
    });
  }
}

const router = new Users();

module.exports = {
  create: event => router.create(event),
  get: event => router.get(event),
  update: event => router.update(event),
  remove: event => router.remove(event),
};
