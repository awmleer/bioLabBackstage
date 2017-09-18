import { Component, OnInit } from '@angular/core';

import {ApiService} from "../../services/api.service";
import {PaperEntry} from "../../classes/paper";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {

  papers:PaperEntry[];
  searchText:string;
  searchTextInputed:string='';
  pageNumber:number;
  totalPageCount:number=1;

  constructor(
    private api:ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pageNumber = parseInt(params['pageNumber']);
      if(params['searchText']){
        this.searchText=params['searchText'];
        this.searchTextInputed=this.searchText;
      }else{
        this.searchText=null;
      }
      this.fetchList();
    });
  }

  pageChange(pageNumber){
    this.router.navigate([`../${pageNumber}`], {relativeTo: this.route});
  }

  fetchList(){
    if (this.searchText) {
      this.api.post(`/paper/search/${this.pageNumber}/`,[{
        "field": "name",
        "value": this.searchText
      }]).then(data=>{
        this.papers=data['papers'];
        console.log(this.papers);
        this.totalPageCount=data['totalPageCount'];
      });
    }else{
      this.api.get(`/paper/list/${this.pageNumber}/`).then(data=>{
        this.papers=data['papers'];
        this.totalPageCount=data['totalPageCount'];
      });
    }
  }

  search(){
    this.router.navigateByUrl(`/paper/search/${this.searchTextInputed}/${this.pageNumber}`);
  }

}

