import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {CONFIG} from "../../app/config";
import {Http} from "@angular/http";
import { Location } from '@angular/common';

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.component.html',
  styleUrls: ['./paper-edit.component.scss']
})
export class PaperEditComponent implements OnInit {
  paper=null;


  constructor(
    private http: Http,
    private location: Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.http.get(`${CONFIG.apiUrl}/paper/${params['id']}/detail/`).toPromise().then(response=>{
          this.paper=response.json();
        });
      });
  }

}
