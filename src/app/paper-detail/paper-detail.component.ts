import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';

// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  styleUrls: ['./paper-detail.component.scss']
})
export class PaperDetailComponent implements OnInit {

  paper;

  schema;

  constructor(
    private http:Http,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.http.get(`/api/paper/${params['id']}/detail/`).toPromise().then(response=>{
          this.paper=response.json();
        });
        this.http.get(`/api/paper/${params['id']}/schema/`).toPromise().then(response=>{
          this.schema=response.json().schema;
        });
      });
  }

  goBack(){
    this.location.back();
  }


}
