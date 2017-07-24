import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../app/config";
import {ApiService} from "./api.service";
import {Http} from "@angular/http";

@Injectable()
export class LabelService {

  labels=[];//TODO 需要重构成paperLabels
  reagentLabels=[];

  constructor(
    private api: ApiService,
    private http: Http
  ) {
    this.http.get(`${CONFIG.apiUrl}/paper/label/list/`).toPromise().then(response=>{
      this.labels=response.json();
    });
    this.api.get(`/reagent/label/list/`).then(data=>{
      this.reagentLabels=data;
    });
  }

}
