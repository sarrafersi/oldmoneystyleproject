const UserRepository = require('../../../domain/user/repositories/UserRepository');

class InMemoryUserRepository extends UserRepository {
  constructor() {
    super();
    this.users = [];
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async create(user) {
    this.users.push(user);
  }
}

module.exports = InMemoryUserRepository;
