import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApiService} from '../../services/api.service';
import {InstrumentService} from '../../services/instrument.service';
import {InstrumentDetail} from '../../classes/instrument';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.scss']
})
export class InstrumentDetailComponent implements OnInit {
  instrument:InstrumentDetail;

  constructor(
    private apiSvc: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public instrumentSvc: InstrumentService,
    private messageSvc: NzMessageService,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(async (params: Params)=>{
        this.instrument = await this.instrumentSvc.instrumentDetail(params['id']);
      });
  }

  async remove() {
    await this.instrumentSvc.removeInstrument(this.instrument.id);
    this.messageSvc.success('删除成功');
    await this.router.navigate(['/instrument', 'list', 1]);
  }

}
