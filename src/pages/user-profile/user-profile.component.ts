import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public accountSvc: AccountService,
    private messageSvc: NzMessageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.accountSvc.logout().then(() => {
      this.messageSvc.success('退出登录成功');
      this.router.navigate(['/login']);
    });
  }

}
