import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  papers;
  constructor(
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get('/api/paper/list/').toPromise().then(response=>{
      this.papers=response.json();
    });
  }

  some(){
  }

}
