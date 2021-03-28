const toPascalCase = require('to-pascal-case');

class Base {
  constructor(connection) {
    this.connection = connection;
    //  Get the name of the table from the file name
    this.tableName = toPascalCase(this.constructor.name);
  }

  /**
   * Executes an SQL query
   */
  async execute(sql, params) {
    try {
      log.info({ sql, params }, 'Running Query');
      const [rows, fields] = await this.connection.execute(sql, params);
      return rows;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  /**
   * We can assume that the parameters here is correct because we validate them
   * in schema.
   */
  async create(params) {
    const currentUserId = currentUser.sub || 'unknown';
    const columns = [...Object.keys(params), 'createdBy', 'updatedBy'];
    const markers = new Array(columns.length).fill('?').join(',');
    const sql = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES (${markers})`;
    const rows = await this.execute(sql, [...Object.values(params), currentUserId, currentUserId]);
    return rows;
  }

  /**
   * Gets an Entity
   */
  async get(id) {
    const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const rows = await this.execute(sql, [id, uid]);
    return rows[0];
  }

  /**
   * Updates an entity
   * We can assume that the parameters here is correct because we validate them
   * in schema.
   */
  async update(id, params) {
    const currentUserId = currentUser.sub || 'unknown';
    const columns = [...Object.keys(params), 'updatedBy'].map((col) => {
      return `${col} = ?`;
    });

    const sql = `UPDATE ${this.tableName}
                   SET ${columns.join(',')}
                 WHERE id = ?`;

    const rows = await this.execute(sql, [...Object.values(params), currentUserId, id]);
    return rows;
  }

  /**
   * Delete an entity
   */
  async delete(id) {
    const sql = `DELETE FROM ${this.tableName}
                 WHERE id = ?`;
    const rows = await this.execute(sql, [id]);
    return rows;
  }
}

module.exports = Base;
