const Base = require("./base");

/**
 *  The model should contain all the business logic.
 *  (and in libs).
 *
 *  Unit testing should mostly be focused here.
 */
class Users extends Base {

  /**
   * Override create to pass the uid
   */
  async create(uid, params) {
    return super.create({ ...params, uid });
  }
}

module.exports = Users;
