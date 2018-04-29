import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/debounceTime';
import {ApiService} from '../../services/api.service';
import {InstrumentService} from '../../services/instrument.service';
import {InstrumentDetail} from '../../classes/instrument';


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
    public location: Location,
    public instrumentSvc: InstrumentService,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(async (params: Params)=>{
        this.instrument = await this.instrumentSvc.instrumentDetail(params['id']);
      });
  }

}
