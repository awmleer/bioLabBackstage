import { Component, OnInit } from '@angular/core';
import {UserInfo, UserItem} from '../../../classes/user';
import {Page} from '../../../classes/page';
import {AccountService} from '../../../services/account.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  searchText = '';
  searchTextInputted = '';
  page: Page<UserInfo> = null;
  pageNumber = 1;

  constructor(
    private accountSvc: AccountService,
    private messageSvc: NzMessageService,
  ) { }

  ngOnInit() {
    this.fetchPage();
  }

  search() {
    this.searchText = this.searchTextInputted;
    this.fetchPage();
  }

  async remove(userId: number) {
    await this.accountSvc.delete(userId);
    this.messageSvc.success('删除成功');
    await this.fetchPage();
  }

  pageChange(newPageNumber: number) {
    this.pageNumber = newPageNumber;
    this.fetchPage();
  }

  async fetchPage() {
    this.page = await this.accountSvc.getUserList(this.pageNumber, {
      search: this.searchText
    });
  }

  async deleteAll() {
    if (!this.page) return;
    const loadingMessage = this.messageSvc.loading('删除中', {
      nzDuration: 0,
    });
    let success = true;
    try {
      for (const item of this.page.items) {
        await this.accountSvc.delete(item.id);
      }
    } catch (e) {
      success = false
    }
    this.messageSvc.remove(loadingMessage.messageId);
    this.fetchPage();
    if (success) {
      this.messageSvc.success('删除完成');
    } else {
      this.messageSvc.error('删除失败');
    }
  }

}
