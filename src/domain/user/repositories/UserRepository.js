class UserRepository {
  async create(user) {}
  async findByEmail(email) {}
  async findByResetToken(token) {}
  async updatePassword(userId, newPassword) {}
  async saveResetToken(email, token, expires) {}
}
module.exports = UserRepository;