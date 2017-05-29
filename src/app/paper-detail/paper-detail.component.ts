import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';

// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {LabelService} from "../services/label.service";
import * as _ from "lodash"


@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  styleUrls: ['./paper-detail.component.scss']
})
export class PaperDetailComponent implements OnInit {

  paper;

  schema;

  labelSearchText:string;
  filteredLabels=[];

  constructor(
    private http:Http,
    private route: ActivatedRoute,
    private location: Location,
    private labelService: LabelService
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


  removeLabel(id:number){
    _.remove(this.paper.labels,{
      id:id
    });
  }

  addLabel(){

  }

  filterLabels(){
    if (this.labelSearchText == '') {
      this.filteredLabels=[];
      return;
    }
    this.filteredLabels=_.filter(this.labelService.labels,(label)=>{
      return label.name.indexOf(this.labelSearchText)!=-1
    });
  }

  labelSearchTextChanged(newValue){
    // this.labelSearchText=$event.target.value;
    this.labelSearchText=newValue;
    this.filterLabels();
  }


  goBack(){
    this.location.back();
  }


}
