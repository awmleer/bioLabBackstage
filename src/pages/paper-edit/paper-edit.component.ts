import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {PaperDetail} from "../../classes/paper";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.component.html',
  styleUrls: ['./paper-edit.component.scss']
})
export class PaperEditComponent implements OnInit {
  paper:PaperDetail=null;
  teachersText:string='';


  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private api: ApiService,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.api.get(`/paper/${params['id']}/detail/`).then(data=>{
          this.paper=data;
          this.teachersText='';
          for (let i in this.paper.teachers) {
            this.teachersText+=this.paper.teachers[i].name+' ';
          }
        });
      });
  }

  submit(){
    let teachers = this.teachersText.split(' ');
    for (let i = 0; i < teachers.length; i++) {
      if(teachers[i]==''){
        teachers.splice(i,1);
        i--;
      }
    }
    this.api.post(`/paper/${this.paper.id}/edit/`,{
      title:this.paper.title,
      subject:this.paper.subject,
      keyword:this.paper.keyword,
      publishYear:this.paper.publishYear,
      abstract:this.paper.abstract,
      author:this.paper.author,
      major:this.paper.major,
      teachers: teachers
    }).then(()=>{
      alert('修改成功');
      this.location.back();
    });
  }

}
