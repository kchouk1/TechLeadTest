const UserRepository = require("../repositories/user.repository");
const UserValidator = require("../validators/user.validator");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * @param {string} id
   * @returns {Promise<User>}
   */
  async getUserById(id) {
    const userId = UserValidator.validateUserId(id);
    const user = await this.userRepository.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    return user;
  }

  /**
   * @param {string} id
   * @param {UpdateUserRequest} userData
   * @returns {Promise<void>}
   */
  async updateUser(id, userData) {
    const userId = UserValidator.validateUserId(id);
    const validatedData = UserValidator.validateUpdateUserData(userData);
    
    await this.userRepository.updateUser(userId, validatedData);
  }

  /**
   * @param {ChangePasswordRequest} passwordData
   * @returns {Promise<void>}
   */
  async changePassword(passwordData) {
    const userId = UserValidator.validateUserId(passwordData.id);
    const validatedPassword = UserValidator.validatePassword(passwordData.password);
    
    await this.userRepository.updatePassword(userId, validatedPassword);
  }
}

module.exports = UserService;
