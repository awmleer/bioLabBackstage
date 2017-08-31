import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import { Location } from '@angular/common';
import { FileUploader } from 'ng2-file-upload';

import {LabelService} from "../../services/label.service";
import * as _ from "lodash"
import {CONFIG} from "../../app/config";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';
import {ApiService} from "../../services/api.service";


@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  styleUrls: ['./paper-detail.component.scss']
})
export class PaperDetailComponent implements OnInit {
  public uploader:FileUploader;
  paper;

  labelSearchText:string;
  labelSearchTextSubject: Subject<string> = new Subject<string>();

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    public location: Location,
    public labelService: LabelService
  ) {
    this.labelSearchTextSubject
      .debounceTime(500) // wait 300ms after the last event before emitting last event
      .subscribe(val => this.labelSearchText = val);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.api.get(`/paper/${params['id']}/detail/`).then(data=>{
          this.paper=data;
          this.uploader=new FileUploader({url: `${CONFIG.apiUrl}/paper/${this.paper.id}/upload/`});
        });
      });
  }


  removeLabel(id:number){
    this.api.get(`/paper/${this.paper.id}/label/remove/${id}/`).then(()=>{
      _.remove(this.paper.labels,{
        id:id
      });
    });
  }

  addLabel(label){
    this.api.get(`/paper/${this.paper.id}/label/add/${label.id}/`).then(()=>{
      if (_.isUndefined(_.find(this.paper.labels,{id:label.id}))) {
        this.paper.labels.push(label);
      }
      this.labelSearchText='';
    });
  }


  get filteredLabels(){ //TODO type definition
    if (this.labelSearchText == '') {
      return [];
    }else{
      return _.filter(this.labelService.labels,(label)=>{
        return label.name.indexOf(this.labelSearchText)!=-1
      });
    }
  }

  labelSearchTextChanged(newValue){
    this.labelSearchTextSubject.next(newValue);
  }


}
