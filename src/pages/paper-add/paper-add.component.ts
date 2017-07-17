import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {CONFIG} from "../../app/config";
import {Http} from "@angular/http";
import { Location } from '@angular/common';

@Component({
  selector: 'app-paper-add',
  templateUrl: './paper-add.component.html',
  styleUrls: ['./paper-add.component.scss']
})
export class PaperAddComponent implements OnInit {
  paper={
    title:'',
    subject:'',
    keyword:'',
    publishYear:'',
    abstract:'',
    major:''
  };


  constructor(
    private http: Http,
    public location: Location
  ) { }

  ngOnInit(){}

  submit(){
    this.http.post(CONFIG.apiUrl+`/paper/add/`,{
      title:this.paper.title,
      subject:this.paper.subject,
      keyword:this.paper.keyword,
      publishYear:this.paper.publishYear,
      abstract:this.paper.abstract,
      major:this.paper.major
    }).toPromise().then(response=>{
      let data = response.json();
      if (data['status']=='success') {
        alert('修改成功');
        this.location.go(`#/paper/${data['payload'].paperId}`);
      }else{
        alert(data['payload']);
      }
    });
  }

}
