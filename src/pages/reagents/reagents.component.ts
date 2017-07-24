import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {CONFIG} from "../../app/config";
import {ReagentEntry} from "../../classes/reagent";

@Component({
  selector: 'app-reagents',
  templateUrl: './reagents.component.html',
  styleUrls: ['./reagents.component.scss']
})
export class ReagentsComponent implements OnInit {
  reagents:ReagentEntry;
  constructor(
    private http:Http
  ) { }

  ngOnInit() {
    this.http.get(`${CONFIG.apiUrl}/reagent/list/`).toPromise().then(response=>{
      this.reagents=response.json()['payload'];
    });
  }

}
