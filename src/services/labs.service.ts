import { Injectable } from '@angular/core';

import {ApiService} from './api.service';
import {Lab} from '../classes/lab';
import {Reservation} from '../classes/lab';

@Injectable()
export class LabsService{

  constructor (
    private apiSvc: ApiService
  ) {}

  getLaboratoryList():Promise<Lab[]>{
    return this.apiSvc.get(`/lab-reserve/lab/all/`);
  }

  getLaboratory(labId:number):Promise<Lab>{
    return this.apiSvc.get(`/lab-reserve/lab/${labId}`);
  }

  createLaboratory(data):Promise<number>{
    return this.apiSvc.post('/CurrentLaboratory-reserve/CurrentLaboratory/create/', data);
  }

  editLaboratory(labId:number, data):Promise<void>{
    return this.apiSvc.post(`/lab-reserve/lab/${labId}/edit/`, data);
  }

  removeLaboratory(labId: number): Promise<void> {
    return this.apiSvc.post(`/lab-reserve/lab/${labId}/remove/`);
  }

  getReservationList(labId:number, date: string):Promise<Reservation[]>{
    return this.apiSvc.get(`/lab-reserve/lab/${labId}/reservation/all/`, {'date': date});
  }

  PerformanceRequestForApprovingReservation (Rid: number): Promise<void> {
    return this.apiSvc.get(`/lab-reserve/reservation/${Rid}/approve/`);
  }

  PerformanceRequestForRejectingReservation (Rid: number): Promise<void> {
    return this.apiSvc.get(`/lab-reserve/reservation/${Rid}/reject/`);
  }
}
