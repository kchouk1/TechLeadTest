class UserValidator {
  static validateUserId(id) {
    const userId = parseInt(id);
    if (isNaN(userId) || userId <= 0) {
      throw new Error("Invalid user ID");
    }
    return userId;
  }

  static validateUpdateUserData(data) {
    const { name, email } = data;
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      throw new Error("Name is required and must be a non-empty string");
    }
    
    if (!email || typeof email !== 'string' || !this.isValidEmail(email)) {
      throw new Error("Valid email is required");
    }
    
    return { name: name.trim(), email: email.trim() };
  }

  static validatePassword(password) {
    if (!password || typeof password !== 'string' || password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }
    return password;
  }

  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

module.exports = UserValidator;
