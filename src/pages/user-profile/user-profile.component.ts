import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(
    public accountSvc: AccountService,
    private location: Location,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.accountSvc.logout().then(() => {
      this.location.go('/login');
    });
  }

}
