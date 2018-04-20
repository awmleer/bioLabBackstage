import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {InstrumentDetail} from '../../classes/instrument';
import {NzMessageService} from 'ng-zorro-antd';
import {ApiService} from '../../services/api.service';
import {Location} from '@angular/common';

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
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        if(params['id']){
          this.createMode = false;
          // this.apiSvc.get(`/instrument/${params['id']}/detail/`).then(data=>{
          //   this.instrument=data;
          // });
        }else{
          this.instrument = new InstrumentDetail();
          this.createMode = true;
        }
      });
  }


}
