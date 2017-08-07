import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {ReagentDetail, ReagentLabel} from "../../classes/reagent";
import {LabelService} from "../../services/label.service";
import * as _ from "lodash"
import {Location} from "@angular/common";
import { FileUploader } from 'ng2-file-upload';
import {CONFIG} from "../../app/config";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/debounceTime';



@Component({
  selector: 'app-reagent-detail',
  templateUrl: './reagent-detail.component.html',
  styleUrls: ['./reagent-detail.component.scss']
})
export class ReagentDetailComponent implements OnInit {
  public uploader:FileUploader;
  reagent: ReagentDetail;
  labelSearchText:string='';
  labelSearchTextSubject: Subject<string> = new Subject<string>();

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    public labelService: LabelService,
    private api: ApiService
  ) {
    this.labelSearchTextSubject
      .debounceTime(500) // wait 300ms after the last event before emitting last event
      .subscribe(val => this.labelSearchText = val);
  }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.freshReagent(params['id']).then(()=>{
          this.uploader=new FileUploader({url: `${CONFIG.apiUrl}/reagent/${this.reagent.id}/picture/add/`});
        });
      });
  }

  freshReagent(reagentId=this.reagent.id){
    return this.api.get(`/reagent/${reagentId}/detail/`).then(data=>{
      this.reagent=data;
      return;
    });
  }



  removeLabel(id:number){
    this.api.get(`/reagent/${this.reagent.id}/label/remove/${id}/`).then(data=>{
      _.remove(this.reagent.labels,{
        id:id
      });
    });
  }

  addLabel(label){
    this.api.get(`/paper/${this.reagent.id}/label/add/${label.id}/`).then(data=>{
      if (_.isUndefined(_.find(this.reagent.labels,{id:label.id}))) {
        this.reagent.labels.push(label);
      }
      this.labelSearchText='';
    });
  }

  get filteredLabels():ReagentLabel[]{
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


  removePicture(pictureId){
    if (confirm('确定要删除这张图片吗？')) {
      this.api.get(`/reagent/picture/${pictureId}/remove/`).then(()=>{
        this.freshReagent();
      });
    }
  }

  movePicture(pictureId,direction:'up'|'down'){
    this.api.get(`/reagent/picture/${pictureId}/move/`,{
      direction:direction
    }).then(()=>{
      this.freshReagent();
    });
  }

  editPictureDescription(pictureId){
    let description=prompt('请输入对这张图片的描述');
    this.api.post(`/reagent/picture/${pictureId}/editDescription/`,{
      description: description
    }).then(()=>{
      this.freshReagent();
    });
  }

}
