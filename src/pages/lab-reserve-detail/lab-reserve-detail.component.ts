import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {ApiService} from '../../services/api.service';
import {LabsService} from '../../services/labs.service';
import {Lab} from '../../classes/lab';
import {Reservation} from '../../classes/lab';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'app-instrument-detail',
  templateUrl: './lab-reserve-detail.component.html',
  styleUrls: ['./lab-reserve-detail.component.scss']
})
export class LabReserveDetailComponent implements OnInit {
  lab:Lab;
  lab_reservations: Reservation[];

  constructor(
    private apiSvc: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    public labSvc: LabsService,
    private messageSvc: NzMessageService,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe(async (params: Params)=>{
        this.lab = await this.labSvc.getLab(params['id']);
        this.lab_reservations = await this.labSvc.ReservationList(params['id']);
      });
  }

  async remove() {
    await this.labSvc.removeLab(this.lab.id);
    this.messageSvc.success('删除成功');
    this.router.navigate(['/lab-reserve', 'labs']);
  }

  async R_approve(reservationid: number) {
    await this.labSvc.R_approve(reservationid);
    this.messageSvc.success('已同意该请求');
    this.router.navigate(['lab-reserve', 'labs', this.lab.id]);
  }

  async R_reject(reservationid: number) {
    await this.labSvc.R_reject(reservationid);
    this.messageSvc.success('已抨击该请求');
    this.router.navigate(['lab-reserve', 'labs', this.lab.id]);
  }

}
