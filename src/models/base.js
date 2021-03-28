const toSnakeCase = require('to-snake-case');

class Base {
  constructor(connection) {
    // The doa class has the same name as the parent file
    const childName = toSnakeCase(this.constructor.name);
    const Doa = require(`../doa/${childName}`);
    this.connection = connection;
    this.db = new Doa(connection);
  }

 async create(params) {
    return this.db.create(params);
  }

  async get(id) {
    return this.db.get(id);
  }

  async delete(id) {
    return this.db.delete(id);
  }

  async update(id, params) {
    return this.db.update(id, params);
  }
}

module.exports = Base;
