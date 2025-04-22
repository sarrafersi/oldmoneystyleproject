const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({
      id: user.id,
      role: user.role
    }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token, user };
  }
}

module.exports = LoginUser;
