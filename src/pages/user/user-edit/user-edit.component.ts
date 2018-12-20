import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../../../classes/user';
import {Location} from '@angular/common';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AccountService} from '../../../services/account.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  user: UserInfo;
  createMode: boolean = true;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private accountSvc: AccountService,
    private messageSvc: NzMessageService,
  ) {
    this.route.params
      .subscribe(async (params: Params) => {
        if(params['id']) {
          this.createMode = false;
          this.user = await this.accountSvc.getUserInfo(params['id']);
        } else {
          this.user = new UserInfo();
          this.createMode = true;
        }
      });
  }

  async submit() {
    if(this.createMode){
      const newId = await this.accountSvc.addUser(this.user);
      this.messageSvc.success('创建成功');
      this.router.navigate(['/user', newId, 'edit']);
    }else{
      await this.accountSvc.changeUserInfo(this.user.id, this.user);
      this.messageSvc.success('修改成功');
      this.router.navigate(['/user',this.user.id, 'edit']);
    }
  }

}
