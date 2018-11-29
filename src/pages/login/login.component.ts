import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

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
    private router: Router,
    private messageSvc: NzMessageService,
  ) { }

  ngOnInit() {
  }

  submitForm() {
    this.accountSvc.login(this.username, this.password).then(() => {
      this.messageSvc.success('登录成功');
      this.router.navigate(['/user/profile']);
    });
  }

}
