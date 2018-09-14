import {Component, OnInit, DoCheck} from '@angular/core';
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
export class LabReserveDetailComponent implements OnInit, DoCheck {
  lab:Lab;
  lab_reservations: Reservation[];
  startdate: Date;
  oldstartdate: Date;
  rstr: string;

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
        this.lab = await this.labSvc.getLaboratory(params['id']);
        if (this.startdate) {this.lab_reservations = await this.labSvc.getReservationList(params['id'], [this.startdate.getFullYear().toString(), this.pad(this.startdate.getMonth() + 1, 2), this.pad(this.startdate.getDate(), 2)].join('-'));}
      });
  }

  async DoLaboratoryRemoving() {
    await this.labSvc.removeLaboratory(this.lab.id);
    this.messageSvc.success('删除成功');
    this.router.navigate(['/lab-reserve', 'labs']);
  }

  async ApprovingReservation(reservationid: number) {
    await this.labSvc.PerformanceRequestForApprovingReservation(reservationid);
    this.messageSvc.success('已同意该请求');
    this.router.navigate(['lab-reserve', 'labs', this.lab.id]);
    this.ReservationListUpdate();
  }

  async RejectingReservation(reservationid: number) {
    await this.labSvc.PerformanceRequestForRejectingReservation(reservationid);
    this.messageSvc.success('已抨击该请求');
    this.router.navigate(['lab-reserve', 'labs', this.lab.id]);
    this.ReservationListUpdate();
  }

  ngDoCheck() {
    if (this.startdate !== this.oldstartdate) {
      this.ReservationListUpdate();
    }
  }

  async ReservationListUpdate() {
    this.rstr = [this.startdate.getFullYear().toString(), this.pad(this.startdate.getMonth() + 1, 2), this.pad(this.startdate.getDate(), 2)].join('-');
    this.lab_reservations = await this.labSvc.getReservationList(this.lab.id, this.rstr);
    this.oldstartdate = this.startdate;
  }

  TranslatingTimeStampToString(ts:number) {
    const d = new Date();
    d.setTime(ts);
    return d.toLocaleString();
  }


  TranslatingStatusFromEnglishEnumerationToChineseDescription(status: 'init' | 'approved' | 'rejected') {
    const dict = {'approved': '受到同意的', 'rejected': '受到抨击的', 'init': '等待受刑的'};
    return dict[status];
  }
}
