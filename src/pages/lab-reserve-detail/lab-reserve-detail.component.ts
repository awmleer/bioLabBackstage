import {Component, OnInit, DoCheck, SimpleChange} from '@angular/core';
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
  currLab:Lab;
  ReservationsForCurrLab: Reservation[];
  startDate: Date;
  strBuff: string;

  pad = function(tbl) {
    return function(num, n) {
      return (0 >= (n = n-num.toString().length)) ? num : (tbl[n] || (tbl[n] = Array(n+1).join('0'))) + num;
    };
  }([]);

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
        this.currLab = await this.labSvc.getLab(params['id']);
        this.startDate = new Date();
        if (this.startDate) {this.ReservationsForCurrLab = await this.labSvc.getReservationList(params['id'], [this.startDate.getFullYear().toString(), this.pad(this.startDate.getMonth() + 1, 2), this.pad(this.startDate.getDate(), 2)].join('-'));}
      });
  }

  async removeLab() {
    await this.labSvc.removeLab(this.currLab.id);
    this.messageSvc.success('删除成功');
    this.router.navigate(['/lab-reserve', 'labs']);
  }

  async approvingReservation(reservationid: number) {
    await this.labSvc.approvingReservation(reservationid);
    this.messageSvc.success('已同意该请求');
    this.router.navigate(['lab-reserve', 'labs', this.currLab.id]);
    this.reservationListUpdate();
  }

  async rejectingReservation(reservationid: number) {
    await this.labSvc.rejectingReservation(reservationid);
    this.messageSvc.success('已拒绝该请求');
    this.router.navigate(['lab-reserve', 'labs', this.currLab.id]);
    this.reservationListUpdate();
  }

  async reservationListUpdate() {
    this.strBuff = [this.startDate.getFullYear().toString(), this.pad(this.startDate.getMonth() + 1, 2), this.pad(this.startDate.getDate(), 2)].join('-');
    this.ReservationsForCurrLab = await this.labSvc.getReservationList(this.currLab.id, this.strBuff);
  }

  onDateChange(event: any) {
    // this.startDate = event.target.value;
    this.reservationListUpdate();
  }

  TranslateDescription(status: 'init' | 'approved' | 'rejected') {
    const dict = {'approved': '已同意', 'rejected': '已拒绝', 'init': '未处理'};
    return dict[status];
  }
}
