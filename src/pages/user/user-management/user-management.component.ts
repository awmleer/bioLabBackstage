import { Component, OnInit } from '@angular/core';
import {UserInfo} from '../../../classes/user';
import {Page} from '../../../classes/page';
import {AccountService} from '../../../services/account.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  searchTextInputted = '';
  page: Page<UserInfo> = null;
  pageNumber = 0;

  constructor(
    private accountSvc: AccountService
  ) { }

  ngOnInit() {
    this.fetchPage()
  }

  search() {

  }

  pageChange(newPageNumber: number) {
    this.pageNumber = newPageNumber;
    this.fetchPage();
  }

  async fetchPage() {
    this.page = await this.accountSvc.getUserList(this.pageNumber);
  }

}
