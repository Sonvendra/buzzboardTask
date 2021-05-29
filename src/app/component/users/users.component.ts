import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userData: any = [];
  list: any = [];
  delUser: any;
  data = {};
  addForm: boolean = false;
  updateClick: boolean = false;
  constructor(private service: UserService, private fb: FormBuilder) {}

  ngOnInit() {
    this.list = this.userData = this.service.userList;
  }

  search(value) {
    this.userData = this.list.filter((val) =>
      val['name'].toLowerCase().includes(value.toLowerCase())
    );
  }
  updateModal(user) {
    this.data = user;
    this.addForm = true;
    this.updateClick = true;
  }
  delete() {
    this.list = this.userData = this.userData.filter(
      (item) => item != this.delUser
    );
  }
  deleteModal(user) {
    this.delUser = user;
  }
  addFormEnable() {
    this.addForm = true;
    this.data = {};
    this.updateClick = false;
  }
  submitForm(data) {
    if (this.updateClick)
      this.userData.map((res) => (res.id == data.id ? (res = data) : res));
    else this.userData.push(data);
  }
}
