import { Component, OnInit } from '@angular/core';

import {ApiService} from '../../services/api.service';
import {InstrumentBrief, InstrumentEntry} from '../../classes/instrument';
import {ActivatedRoute, Router} from '@angular/router';
import {LabsService} from '../../services/labs.service';
import {Lab} from '../../classes/lab';


@Component({
  selector: 'app-lab-reserve',
  templateUrl: './lab-reserve.component.html',
  styleUrls: ['./lab-reserve.component.scss']
})
export class LabReserveComponent implements OnInit {

  labList:Lab[];


  constructor(
    private api:ApiService,
    private labSvc: LabsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.fetchLabList();
    });
  }


  async fetchLabList(){
      this.labList = await this.labSvc.getLabList();
  }

}

