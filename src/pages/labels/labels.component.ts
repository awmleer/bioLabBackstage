import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import {CONFIG} from "../../app/config";

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  labelTree;

  constructor(
    private http:Http
  ) { }

  ngOnInit() {
    this.initLabelTree();
  }

  initLabelTree(){
    this.http.get(`${CONFIG.apiUrl}/paper/label/tree/`).toPromise().then(response=>{
      this.labelTree=response.json();
      console.log(this.labelTree);
    });
  }

  addLabelNode(parentLabel){
    let name = prompt('请输入新标签的名字');
    this.http.post(CONFIG.apiUrl+'/paper/label/add/',{
      parentId: parentLabel.id,
      name: name
    }).toPromise().then(response=>{
      let data = response.json();
      if (data['status']=='success') {
        parentLabel.children.push({
          id:data['payload'].newLabelId,
          name: name,
          children: []
        });
        this.labelTree.treeModel.update();
      }else if (data['status']=='error') {
        alert(data['payload']);
      }
    });
  }

  removeLabel(label){
    if(!confirm('确定要删除这个标签吗？'))return;
    this.http.post(CONFIG.apiUrl+'/paper/label/remove/',{
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
    this.http.post(CONFIG.apiUrl+'/paper/label/edit/',{
      id: label.id,
      name: name
    }).toPromise().then(response=>{
      let data = response.json();
      if (data['status'] == 'success') {
        label.name=name;
        this.labelTree.treeModel.update();
      }else{
        alert(data['payload']);
      }
    });
  }


}
