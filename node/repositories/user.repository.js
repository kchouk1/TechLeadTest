const db = require("../db");

class UserRepository {
  /**
   * @param {number} id
   * @returns {Promise<User|null>}
   */
  async findById(id) {
    const result = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return result[0] || null;
  }

  /**
   * @param {number} id
   * @param {UpdateUserRequest} userData
   * @returns {Promise<void>}
   */
  async updateUser(id, userData) {
    await db.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [userData.name, userData.email, id]
    );
  }

  /**
   * @param {number} id
   * @param {string} password
   * @returns {Promise<void>}
   */
  async updatePassword(id, password) {
    await db.query("UPDATE users SET password = ? WHERE id = ?", [password, id]);
  }
}

module.exports = UserRepository;
