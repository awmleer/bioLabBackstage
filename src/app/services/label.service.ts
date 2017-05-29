import { Injectable } from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LabelService {

  labels=[];

  constructor(
    private http: Http
  ) {
    this.http.get('/api/paper/label/list/').toPromise().then(response=>{
      this.labels=response.json();
    })
  }

}
