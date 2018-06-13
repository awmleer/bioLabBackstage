import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {InstrumentDetail} from '../../classes/instrument';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../services/api.service';
import {Location} from '@angular/common';
import {InstrumentService} from '../../services/instrument.service';

@Component({
  selector: 'app-instrument-edit',
  templateUrl: './instrument-edit.component.html',
  styleUrls: ['./instrument-edit.component.scss']
})
export class InstrumentEditComponent implements OnInit {
  instrument:InstrumentDetail = null;
  createMode:boolean = true;

  editorOptions = null;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private apiSvc: ApiService,
    private messageSvc: NzMessageService,
    private instrumentSvc: InstrumentService,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(async (params: Params)=>{
        if(params['id']){
          this.createMode = false;
          this.instrument = await this.instrumentSvc.instrumentDetail(params['id']);
        }else{
          this.instrument = new InstrumentDetail();
          this.createMode = true;
        }
      });
  }

  async submit(){
    for(const key of Object.keys(this.instrument.content)){
      if(this.instrument.content[key]===null){
        this.instrument.content[key]='';
      }
    }
    if(this.createMode){
      const newId = await this.instrumentSvc.addInstrument(this.instrument);
      this.messageSvc.success('创建成功');
      this.router.navigate(['/instrument', newId]);
    }else{
      await this.instrumentSvc.editInstrument(this.instrument.id, this.instrument);
      this.messageSvc.success('修改成功');
      this.router.navigate(['/instrument',this.instrument.id]);
    }
  }


}
