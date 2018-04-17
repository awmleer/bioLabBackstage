import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {PaperDetail} from '../../classes/paper';
import {ApiService} from '../../services/api.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-paper-edit',
  templateUrl: './paper-edit.component.html',
  styleUrls: ['./paper-edit.component.scss']
})
export class PaperEditComponent implements OnInit {
  paper:PaperDetail = null;
  teachersText:string = '';
  createMode:boolean = true;

  constructor(
    public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private apiSvc: ApiService,
    private messageSvc: NzMessageService,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        if(params['id']){
          this.createMode = false;
          this.apiSvc.get(`/paper/${params['id']}/detail/`).then(data=>{
            this.paper=data;
            this.teachersText='';
            for (const paper of this.paper.teachers) {
              this.teachersText+=paper.name+' ';
            }
          });
        }else{
          this.paper = new PaperDetail();
          this.teachersText='';
          this.createMode = true;
        }
      });
  }

  submit(){
    const teachers = this.teachersText.split(' ');
    for (let i = 0; i < teachers.length; i++) {
      if(teachers[i]===''){
        teachers.splice(i,1);
        i--;
      }
    }
    const postData = {
      title:this.paper.title,
      subject:this.paper.subject,
      keyword:this.paper.keyword,
      publishYear:this.paper.publishYear,
      abstract:this.paper.abstract,
      author:this.paper.author,
      major:this.paper.major,
      teachers: teachers
    };
    if(this.createMode){
      this.apiSvc.post('/paper/add/', postData).then(data=>{
        this.messageSvc.success('创建成功');
        this.router.navigate(['/paper',data['payload'].paperId]);
      });
    }else{
      this.apiSvc.post(`/paper/${this.paper.id}/edit/`, postData).then(()=>{
        this.messageSvc.success('修改成功');
        this.router.navigate(['/paper',this.paper.id]);
      });
    }

  }

}
