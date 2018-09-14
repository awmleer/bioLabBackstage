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
  CurrentLaboratory:Lab;
  ReservationsForCurrentLaboratory: Reservation[];
  TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow: Date;
  TheOldDateWeUsedToCheckIfTheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNowIsChanged: Date;
  TheParameterStringWeUsedToFeedBackendToRepresentTheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow: string;

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
        this.CurrentLaboratory = await this.labSvc.getLaboratory(params['id']);
        if (this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow) {this.ReservationsForCurrentLaboratory = await this.labSvc.getReservationList(params['id'], [this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow.getFullYear().toString(), this.pad(this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow.getMonth() + 1, 2), this.pad(this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow.getDate(), 2)].join('-'));}
      });
  }

  async DoLaboratoryRemoving() {
    await this.labSvc.removeLaboratory(this.CurrentLaboratory.id);
    this.messageSvc.success('删除成功');
    this.router.navigate(['/CurrentLaboratory-reserve', 'labs']);
  }

  async ApprovingReservation(reservationid: number) {
    await this.labSvc.PerformanceRequestForApprovingReservation(reservationid);
    this.messageSvc.success('已同意该请求');
    this.router.navigate(['CurrentLaboratory-reserve', 'labs', this.CurrentLaboratory.id]);
    this.ReservationListUpdate();
  }

  async RejectingReservation(reservationid: number) {
    await this.labSvc.PerformanceRequestForRejectingReservation(reservationid);
    this.messageSvc.success('已抨击该请求');
    this.router.navigate(['CurrentLaboratory-reserve', 'labs', this.CurrentLaboratory.id]);
    this.ReservationListUpdate();
  }

  ngDoCheck() {
    if (this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow !== this.TheOldDateWeUsedToCheckIfTheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNowIsChanged) {
      this.ReservationListUpdate();
    }
  }

  async ReservationListUpdate() {
    this.TheParameterStringWeUsedToFeedBackendToRepresentTheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow = [this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow.getFullYear().toString(), this.pad(this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow.getMonth() + 1, 2), this.pad(this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow.getDate(), 2)].join('-');
    this.ReservationsForCurrentLaboratory = await this.labSvc.getReservationList(this.CurrentLaboratory.id, this.TheParameterStringWeUsedToFeedBackendToRepresentTheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow);
    this.TheOldDateWeUsedToCheckIfTheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNowIsChanged = this.TheDateWeUsedToGetReservationsForCurrentLaboratoryFromWhichUpToNow;
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
