import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NoticeBrief} from '../../../classes/notice';
import {NoticeService} from '../../../services/notice.service';
import {ApiService} from '../../../services/api.service';
import {Page} from '../../../classes/page';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.scss']
})
export class NoticesComponent implements OnInit {
  searchText:string;
  searchTextInputed:string='';

  pageNumber:number;

  page:Page<NoticeBrief>;

  get notices():NoticeBrief[]{
    if (this.page) {
      return this.page.items;
    }else{
      return null;
    }
  }

  constructor(
    private api:ApiService,
    private noticeSvc: NoticeService,
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
      this.page = await this.api.post(`/notice/search/${this.pageNumber}/`,[{
        'field': 'title',
        'value': this.searchText
      }]);
    }else{
      this.page = await this.noticeSvc.noticeList(this.pageNumber);
    }
  }

}
