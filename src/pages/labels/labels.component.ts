import {Component, OnInit} from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../../app/config";
import {ActivatedRoute, Params} from "@angular/router";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  type:'paper'|'reagent';
  labelTree;

  constructor(
    private http:Http,
    private api: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.type=params['type'];
      this.labelTree=null;
      this.initLabelTree();
    });
  }

  initLabelTree(){
    this.api.get(`/${this.type}/label/tree/`).then(data=>{
      this.labelTree=data;
    });
  }

  addLabelNode(parentLabel){
    console.log(parentLabel);
    let name = prompt('请输入新标签的名字');
    this.http.post(`${CONFIG.apiUrl}/${this.type}/label/add/`,{
      parentId: parentLabel.id,
      name: name
    }).toPromise().then(response=>{
      let data = response.json();
      if (data['status']=='success') {
        this.initLabelTree();
      }else if (data['status']=='error') {
        alert(data['payload']);
      }
    });
  }

  removeLabel(label){
    if(!confirm('确定要删除这个标签吗？'))return;
    this.http.post(`${CONFIG.apiUrl}/${this.type}/label/remove/`,{
      id: label.id
    }).toPromise().then(response=>{
      let data = response.json();
      if (data['status']=='success') {
        this.initLabelTree();
      }else{
        alert(data['payload']);
      }
    });
  }

  editLabel(label){
    let name = prompt('请输入新的标签名');
    this.http.post(`${CONFIG.apiUrl}/${this.type}/label/edit/`,{
      id: label.id,
      name: name
    }).toPromise().then(response=>{
      let data = response.json();
      if (data['status'] == 'success') {
        this.initLabelTree();
      }else{
        alert(data['payload']);
      }
    });
  }


}
