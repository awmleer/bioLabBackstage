import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import {Http} from '@angular/http';
import { Location } from '@angular/common';
import {ApiService} from '../../services/api.service';

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
    major:'',
    author:''
  };
  teachersText:string='';


  constructor(
    private apiSvc: ApiService,
    public location: Location,
    private router: Router
  ) { }

  ngOnInit(){}

  submit(){
    const teachers = this.teachersText.split(' ');
    for (let i = 0; i < teachers.length; i++) {
      if(teachers[i]===''){
        teachers.splice(i,1);
        i--;
      }
    }
    this.apiSvc.post('/paper/add/',{
      title:this.paper.title,
      subject:this.paper.subject,
      keyword:this.paper.keyword,
      publishYear:this.paper.publishYear,
      abstract:this.paper.abstract,
      author:this.paper.author,
      major:this.paper.major,
      teachers:teachers
    }).then(data=>{
      alert('创建成功');//TODO use notification service
      this.router.navigate(['/paper',data['payload'].paperId]);
    });
  }

}
