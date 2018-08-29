import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {ApiService} from '../../../services/api.service';
import {NoticeService} from '../../../services/notice.service';
import {NoticeDetail} from '../../../classes/notice';


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
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(async (params: Params)=>{
        this.notice = await this.noticeSvc.noticeDetail(params['id']);
      });
  }

}
