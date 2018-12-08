import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApiService} from '../../../services/api.service';
import {NoticeService} from '../../../services/notice.service';
import {NoticeDetail} from '../../../classes/notice';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.component.html',
  styleUrls: ['./notice-detail.component.scss']
})
export class NoticeDetailComponent implements OnInit {
  notice:NoticeDetail;

  constructor(
    private apiSvc: ApiService,
    private route: ActivatedRoute,
    public noticeSvc: NoticeService,
    private messageSvc: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.updateData(params['id']);
      });
  }

  async updateData(id: number = this.notice.id) {
    this.notice = await this.noticeSvc.noticeDetail(id);
  }

  async star() {
    await this.noticeSvc.star(this.notice.id);
    await this.updateData();
  }

  async unstar() {
    await this.noticeSvc.unstar(this.notice.id);
    await this.updateData();
  }

  async deleteNotice() {
    await this.noticeSvc.removeNotice(this.notice.id);
    await this.messageSvc.success('删除成功');
    this.router.navigate(['../list/1'], {
      relativeTo: this.route
    });
  }

}
