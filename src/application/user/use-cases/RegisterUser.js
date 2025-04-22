const bcrypt = require('bcrypt');
const User = require('../../../domain/user/entities/User');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(name, email, password, role = 'client') {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(Date.now().toString(), name, email, hashedPassword, role);
    await this.userRepository.create(user);
    return user;
  }
}

module.exports = RegisterUser;
