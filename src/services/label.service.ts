import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../app/config";

@Injectable()
export class LabelService {

  labels=[];

  constructor(
    private http: Http
  ) {
    this.http.get(`${CONFIG.apiUrl}/paper/label/list/`).toPromise().then(response=>{
      this.labels=response.json();
    })
  }

}
