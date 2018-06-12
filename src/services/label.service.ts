import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {ApiService} from './api.service';
import {Label} from '../classes/label';


@Injectable()
export class LabelService {

  paperLabels=[];
  reagentLabels=[];
  instrumentLabels=[];

  constructor(
    private api: ApiService,
  ) {
    this.initLabels();
  }

  async initLabels(){
    this.paperLabels = await this.api.get('/paper/label/list/');
    this.reagentLabels = await this.api.get('/reagent/label/list/');
    this.instrumentLabels = await this.api.get('/instrument/label/list/');
  }

  getLabels(which:'paper'|'reagent'|'instrument'):Label[]{
    if(which==='paper'){
      return this.paperLabels;
    }else if(which==='reagent'){
      return this.reagentLabels;
    }else if(which === 'instrument'){
      return this.instrumentLabels;
    }else{
      return null;
    }
  }

}
