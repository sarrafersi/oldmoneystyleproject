// src/domain/user/repositories/UserRepository.js
class UserRepository {
    constructor() {
      this.users = []; // Cette liste est temporaire, à remplacer par une vraie DB
    }
  
    async add(user) {
      this.users.push(user);
      return user;
    }
  
    async getByEmail(email) {
      return this.users.find(user => user.email === email);
    }
  
    // Tu peux ajouter d'autres méthodes ici, comme `getById`, `remove`, etc.
  }
  
  module.exports = UserRepository;

  