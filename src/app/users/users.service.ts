import { Injectable } from '@angular/core';
import { UserAdd } from './user-add.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  id = 1;

  users = [
    new UserAdd('Maria', 'Ivanova', 'mimi@abv.bg', '+35988374623', this.id)
  ];

  constructor() { }

  getAllUsers() { 
    return this.users;
  }

  addUser(user : UserAdd) {
    this.users.unshift(user);
  }

  deleteUser(id : number) {
    for (let i = this.users.length - 1; i >= 0; i--) {
      if(this.users[i].id === id) {
        this.users.splice(i, 1);
        break;
      }
    }
  }

  updateUser(user: UserAdd) {
    for (let i = 0; i < this.users.length; i++) {
      if (user.id === this.users[i].id) {
        this.users[i] = user;
        break;
      }
    }
  }
}
