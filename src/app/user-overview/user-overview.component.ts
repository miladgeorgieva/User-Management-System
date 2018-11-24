import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserAdd } from '../users/user-add.model';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css']
})
export class UserOverviewComponent implements OnInit {
  bindingModel: UserAdd;
  id = 1;
  errors = [];

  constructor(private usersService: UsersService, private toastr: ToastrService) {
    this.bindingModel = new UserAdd("", "", "" ,"", this.id);
   }

  ngOnInit() { }

  add() {
    this.id += 1;

    if(this.bindingModel.firstName.length < 2) {
      this.errors.push("First name's length must be longer than two letters.");
    }

    if(this.bindingModel.lastName.length < 2) {
      this.errors.push("Last name's length must be longer than two letters.");
    }

    let users = this.usersService.getAllUsers();
    let emailExists = users.filter(user => {
      return user.email === this.bindingModel.email;
    }).length > 0;

    if(emailExists) {
      this.errors.push("Username with such email already exists.");
    }

    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailRegex.test(this.bindingModel.email)) {
      this.errors.push("Please provide a valid email.");
    }

    let phoneNumberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(!phoneNumberRegex.test(this.bindingModel.phoneNumber)) {
      this.errors.push("Please provide a valid phone number.");
    }

    if(this.errors.length > 0) {
      for (let i = 0; i < this.errors.length; i++) {
        this.toastr.error(this.errors[i], 'Error!');
      }
      this.errors = [];
    } else {
      let user = new UserAdd(this.bindingModel.firstName, this.bindingModel.lastName, this.bindingModel.email, this.bindingModel.phoneNumber, this.id);
      this.usersService.addUser(user);
      this.toastr.success('User added!', 'Success!');
    }
  }
}
