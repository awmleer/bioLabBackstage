import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {ApiService} from './api.service';
import {Label} from '../classes/label';


@Injectable()
export class LabelService {

  paperLabels=[];//TODO 需要重构成paperLabels
  reagentLabels=[];

  constructor(
    private api: ApiService,
  ) {
    this.api.get(`/paper/label/list/`).then(data=>{
      this.paperLabels=data;
    });
    this.api.get(`/reagent/label/list/`).then(data=>{
      this.reagentLabels=data;
    });
  }

  getLabels(which:'paper'|'reagent'):Label[]{
    if(which==='paper'){
      return this.paperLabels;
    }else if(which==='reagent'){
      return this.reagentLabels;
    }else{
      return null;
    }
  }

}
