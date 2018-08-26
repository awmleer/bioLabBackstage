import { Component, OnInit } from '@angular/core';
import {Page} from '../../../classes/page';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BbsService} from '../../../services/bbs.service';
import {PostBrief} from '../../../classes/bbs';

@Component({
  selector: 'app-bbs-list',
  templateUrl: './bbs-list.component.html',
  styleUrls: ['./bbs-list.component.scss']
})
export class BbsListComponent implements OnInit {

  searchText:string;
  searchTextInputed:string='';

  pageNumber:number;

  page:Page<PostBrief>;

  get posts():PostBrief[]{
    if (this.page) {
      return this.page.items;
    }else{
      return null;
    }
  }

  constructor(
    private api:ApiService,
    private bbsSvc: BbsService,
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
    if (this.searchText) {
      //TODO
    }else{
      this.page = await this.bbsSvc.postList(this.pageNumber);
    }
  }

}
