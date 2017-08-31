import { Component, OnInit } from '@angular/core';

import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  papers;
  constructor(
    private api:ApiService
  ) { }

  ngOnInit() {
    this.api.get(`/paper/list/`).then(data=>{
      this.papers=data;
    });
  }

  some(){
  }

}
