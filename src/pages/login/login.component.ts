import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Location} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor(
    private accountSvc: AccountService,
    private location: Location,
    private messageSvc: NzMessageService,
  ) { }

  ngOnInit() {
  }

  submitForm() {
    this.accountSvc.login(this.username, this.password).then(() => {
      this.messageSvc.success('登录成功');
      this.location.go('/account/profile');
    });
  }

}
