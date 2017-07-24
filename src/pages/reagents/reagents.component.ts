import { Component, OnInit } from '@angular/core';
import {ReagentEntry} from "../../classes/reagent";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-reagents',
  templateUrl: './reagents.component.html',
  styleUrls: ['./reagents.component.scss']
})
export class ReagentsComponent implements OnInit {
  reagents:ReagentEntry;
  constructor(
    private api:ApiService
  ) { }

  ngOnInit() {
    this.api.get(`/reagent/list/`).then(data=>{
      this.reagents=data;
    });
  }

}
