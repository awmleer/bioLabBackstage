import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';

// import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import {LabelService} from "../services/label.service";
import * as _ from "lodash"
import {CONFIG} from "../config";


@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  styleUrls: ['./paper-detail.component.scss']
})
export class PaperDetailComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url: '/api/paper/1/upload/'});
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
        this.http.get(`${CONFIG.apiUrl}/paper/${params['id']}/detail/`).toPromise().then(response=>{
          this.paper=response.json();
        });
        this.http.get(`${CONFIG.apiUrl}/paper/${params['id']}/schema/`).toPromise().then(response=>{
          this.schema=response.json().schema;
        });
      });
  }


  removeLabel(id:number){
    this.http.get(`${CONFIG.apiUrl}/paper/${this.paper.id}/label/remove/${id}/`).toPromise().then(response=>{
      if (response.text() == 'success') {
        _.remove(this.paper.labels,{
          id:id
        });
      }
    });
  }

  addLabel(label){
    this.http.get(`${CONFIG.apiUrl}/paper/${this.paper.id}/label/add/${label.id}/`).toPromise().then(response=>{
      if (response.text() == 'success') {
        if (_.isUndefined(_.find(this.paper.labels,{id:label.id}))) {
          this.paper.labels.push(label);
        }
      }
      this.labelSearchText='';
      this.filteredLabels=[];
    });
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
