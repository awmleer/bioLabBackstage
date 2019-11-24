import { Component, OnInit } from '@angular/core';

import {ApiService} from '../../services/api.service';
import {PaperEntry} from '../../classes/paper';
import {ActivatedRoute, Router} from '@angular/router';


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
      this.pageNumber = parseInt(params['pageNumber'], 10);
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

  async fetchList(){
    let data;
    if (this.searchText) {
      data = await this.api.post(`/paper/search/${this.pageNumber}/`,[{
        'field': 'title',
        'value': this.searchText
      }]);
    }else{
      data = await this.api.get(`/paper/list/${this.pageNumber}/`);
    }
    this.papers=data['papers'];
    this.totalPageCount=data['totalPageCount'];
  }

  search(){
    if (this.searchTextInputed) {
      this.router.navigateByUrl(`/paper/search/${this.searchTextInputed}/1`);
    } else {
      this.router.navigateByUrl(`/paper/list/1`);
    }
  }

}

