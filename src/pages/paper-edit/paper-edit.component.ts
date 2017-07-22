import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {CONFIG} from "../../app/config";
import {Http} from "@angular/http";
import { Location } from '@angular/common';
import {PaperDetail} from "../../classes/paper";

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.component.html',
  styleUrls: ['./paper-edit.component.scss']
})
export class PaperEditComponent implements OnInit {
  paper:PaperDetail=null;
  teachersText:string='';


  constructor(
    private http: Http,
    public location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.http.get(`${CONFIG.apiUrl}/paper/${params['id']}/detail/`).toPromise().then(response=>{
          this.paper=response.json();
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

    console.log(teachers);
    this.http.post(CONFIG.apiUrl+`/paper/${this.paper.id}/edit/`,{
      title:this.paper.title,
      subject:this.paper.subject,
      keyword:this.paper.keyword,
      publishYear:this.paper.publishYear,
      abstract:this.paper.abstract,
      major:this.paper.major,
      teachers: teachers
    }).toPromise().then(response=>{
      let data = response.json();
      if (data['status']=='success') {
        alert('修改成功');
        this.location.back();
      }else{
        alert(data['payload']);
      }
    });
  }

}
