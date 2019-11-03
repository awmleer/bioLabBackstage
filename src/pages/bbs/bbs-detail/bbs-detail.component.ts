import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApiService} from '../../../services/api.service';
import {BbsService} from '../../../services/bbs.service';
import {NzMessageService} from 'ng-zorro-antd';
import {PostDetail} from '../../../classes/bbs';


@Component({
  selector: 'app-bbs-detail',
  templateUrl: './bbs-detail.component.html',
  styleUrls: ['./bbs-detail.component.scss']
})
export class BbsDetailComponent implements OnInit {
  bbs: PostDetail;

  constructor(
    private apiSvc: ApiService,
    private route: ActivatedRoute,
    public bbsSvc: BbsService,
    private messageSvc: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.updateData(params['id']);
      });
  }

  async updateData(id: number = this.bbs.id) {
    this.bbs = await this.bbsSvc.postDetail(id);
  }

  async deleteBbs() {
    await this.bbsSvc.deletePost(this.bbs.id);
    await this.messageSvc.success('删除成功');
    this.router.navigate(['../list/1'], {
      relativeTo: this.route
    });
  }

}
