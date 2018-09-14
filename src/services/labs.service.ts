import { Injectable } from '@angular/core';

import {ApiService} from './api.service';
import {Lab} from '../classes/lab';
import {Reservation} from '../classes/lab';

@Injectable()
export class LabsService{

  constructor (
    private apiSvc: ApiService
  ) {}

  LabList():Promise<Lab[]>{
    return this.apiSvc.get(`/lab-reserve/lab/all/`);
  }

  getLab(labId:number):Promise<Lab>{
    return this.apiSvc.get(`/lab-reserve/lab/${labId}`);
  }

  createLab(data):Promise<number>{
    return this.apiSvc.post('/lab-reserve/lab/create/', data);
  }

  editLab(labId:number, data):Promise<void>{
    return this.apiSvc.post(`/lab-reserve/lab/${labId}/edit/`, data);
  }

  removeLab(labId: number): Promise<void> {
    return this.apiSvc.post(`/lab-reserve/lab/${labId}/remove/`);
  }

  ReservationList(labId:number, date: string):Promise<Reservation[]>{
    return this.apiSvc.get(`/lab-reserve/lab/${labId}/reservation/all/`, {'date': date});
  }

  R_approve (Rid: number): Promise<void> {
    return this.apiSvc.get(`/lab-reserve/reservation/${Rid}/approve/`);
  }

  R_reject (Rid: number): Promise<void> {
    return this.apiSvc.get(`/lab-reserve/reservation/${Rid}/reject/`);
  }
}
