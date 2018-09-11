import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Lab} from '../../classes/lab';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../services/api.service';
import {Location} from '@angular/common';
import {LabsService} from '../../services/labs.service';

@Component({
  selector: 'app-lab-reserve-edit',
  templateUrl: './lab-reserve-edit.component.html',
  styleUrls: ['./lab-reserve-edit.component.scss']
})
export class LabReserveEditComponent implements OnInit {
  lab:Lab = null;
  createMode:boolean = true;

  editorOptions = null;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private apiSvc: ApiService,
    private messageSvc: NzMessageService,
    private LabsSvc: LabsService,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(async (params: Params)=>{
        if(params['id']){
          this.createMode = false;
          this.lab = await this.LabsSvc.getLab(params['id']);
        }else{
          this.lab = new Lab();
          this.createMode = true;
        }
      });
  }

  async submit(){
    if(this.createMode){
      const newId = await this.LabsSvc.createLab(this.lab);
      this.messageSvc.success('创建成功');
      this.router.navigate(['/lab-reserve', newId]);
    }else{
      await this.LabsSvc.editLab(this.lab.id, this.lab);
      this.messageSvc.success('修改成功');
      this.router.navigate(['/lab-reserve',this.lab.id]);
    }
  }


}
