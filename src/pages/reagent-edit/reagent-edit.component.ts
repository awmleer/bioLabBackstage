import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ReagentDetail} from '../../classes/reagent';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-reagent-edit',
  templateUrl: './reagent-edit.component.html',
  styleUrls: ['./reagent-edit.component.scss']
})
export class ReagentEditComponent implements OnInit {
  reagent:ReagentDetail;
  createMode:boolean = true;
  loading: boolean = false;

  constructor(
    private apiSvc: ApiService,
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private messageSvc: NzMessageService,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        if(params['id']) {
          this.createMode = false;
          this.apiSvc.get(`/reagent/${params['id']}/detail/`).then(data=>{
            this.reagent=data;
          });
        }else{
          this.createMode = true;
          this.reagent = new ReagentDetail();
        }
      });
  }

  async submit(){
    this.loading = true;
    try {
      if (this.createMode) {
        const data = await this.apiSvc.post('/reagent/add/',this.reagent);
        this.messageSvc.success('添加成功');
        this.router.navigate(['/reagent',data.reagentId]);
      }else{
        await this.apiSvc.post(`/reagent/${this.reagent.id}/edit/`,this.reagent);
        this.router.navigate(['/reagent',this.reagent.id]);
        this.messageSvc.success('修改成功');
      }
    } catch (e) {
      this.messageSvc.error('操作失败');
    } finally {
      this.loading = false;
    }
  }

}
