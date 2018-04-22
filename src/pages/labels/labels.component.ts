import {Component, OnInit} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {LabelTreeNode} from '../../classes/label';

@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {
  type:'paper'|'reagent';
  labelTree: LabelTreeNode[] = null;

  constructor(
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

  addLabelNode(parentLabelId){
    console.log(parentLabelId);
    const name = prompt('请输入新标签的名字');
    this.api.post(`/${this.type}/label/add/`,{
      parentId: parentLabelId,
      name: name
    }).then(response=>{
      this.initLabelTree();
    });
  }

  removeLabel(label){
    if(!confirm('确定要删除这个标签吗？')) {return; }
    this.api.post(`/${this.type}/label/remove/`,{
      id: label.id
    }).then(response=>{
      this.initLabelTree();
    });
  }

  editLabel(label){
    const name = prompt('请输入新的标签名');
    this.api.post(`/${this.type}/label/edit/`,{
      id: label.id,
      name: name
    }).then(response=>{
      this.initLabelTree();
    });
  }


}
