import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UsersService } from '../users/users.service';
import { UserAdd } from '../users/user-add.model';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  users = [];
  editUserId: number = 0;
  errors = [];

  constructor(private usersService: UsersService, private toastr: ToastrService) { }

  ngOnInit() {
    this.users = this.usersService.getAllUsers();
  }

  delete(id : number) {
    this.usersService.deleteUser(id);
    this.toastr.success('User deleted!', 'Success!');
  }

  edit(userId : number) {
    this.editUserId = userId;
  }

  update(editedUser : UserAdd) {
    if(editedUser.firstName.length < 2) {
      this.errors.push("First name's length must be longer than two letters.");
    }

    if(editedUser.lastName.length < 2) {
      this.errors.push("Last name's length must be longer than two letters.");
    }

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(editedUser.email)) {
      this.errors.push("Please provide a valid email.");
    }

    let phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!phoneNumberRegex.test(editedUser.phoneNumber)) {
      this.errors.push("Please provide a valid phone number.");
    }

    if(this.errors.length > 0) {
      for (let i = 0; i < this.errors.length; i++) {
        this.toastr.error(this.errors[i], 'Error!');
      }
      this.errors = [];
    } else {
      this.usersService.updateUser(editedUser);
      this.editUserId = 0;
      this.toastr.success('User info updated!', 'Success!');
    }
  }

  cancel() {
    this.editUserId = 0;
  }
}
