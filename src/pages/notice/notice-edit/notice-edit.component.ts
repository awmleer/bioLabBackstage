import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {NoticeDetail} from '../../../classes/notice';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../../services/api.service';
import {Location} from '@angular/common';
import {NoticeService} from '../../../services/notice.service';

@Component({
  selector: 'app-notice-edit',
  templateUrl: './notice-edit.component.html',
  styleUrls: ['./notice-edit.component.scss']
})
export class NoticeEditComponent implements OnInit {
  notice:NoticeDetail = null;
  createMode:boolean = true;

  editorOptions = null;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private apiSvc: ApiService,
    private messageSvc: NzMessageService,
    private noticeSvc: NoticeService,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(async (params: Params)=>{
        if(params['id']){
          this.createMode = false;
          this.notice = await this.noticeSvc.noticeDetail(params['id']);
        }else{
          this.notice = new NoticeDetail();
          this.createMode = true;
        }
      });
  }

  async submit(){
    for(const key of Object.keys(this.notice.content)){
      if(this.notice.content[key]===null){
        this.notice.content[key]='';
      }
    }
    if(this.createMode){
      const newId = await this.noticeSvc.addNotice(this.notice);
      this.messageSvc.success('创建成功');
      this.router.navigate(['/notice', newId]);
    }else{
      await this.noticeSvc.editNotice(this.notice.id, this.notice);
      this.messageSvc.success('修改成功');
      this.router.navigate(['/notice',this.notice.id]);
    }
  }


}
