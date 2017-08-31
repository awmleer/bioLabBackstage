import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {ApiService} from "./api.service";


@Injectable()
export class LabelService {

  labels=[];//TODO 需要重构成paperLabels
  reagentLabels=[];

  constructor(
    private api: ApiService,
  ) {
    this.api.get(`/paper/label/list/`).then(data=>{
      this.labels=data;
    });
    this.api.get(`/reagent/label/list/`).then(data=>{
      this.reagentLabels=data;
    });
  }

}
