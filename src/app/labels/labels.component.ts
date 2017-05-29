import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../config";

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  labelTree;

  constructor(
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get(`${CONFIG.apiUrl}/paper/label/tree/`).toPromise().then(response=>{
      this.labelTree=response.json();
    });
  }

}
