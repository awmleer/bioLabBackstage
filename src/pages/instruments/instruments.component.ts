import { Component, OnInit } from '@angular/core';

import {ApiService} from '../../services/api.service';
import {InstrumentBrief, InstrumentEntry} from '../../classes/instrument';
import {ActivatedRoute, Router} from '@angular/router';
import {InstrumentService} from '../../services/instrument.service';
import {Page} from '../../classes/page';


@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {
  searchText:string;
  searchTextInputed:string='';
  pageNumber:number;

  page:Page<InstrumentBrief>;

  get instruments():InstrumentBrief[]{
    return this.page.items;
  }

  constructor(
    private api:ApiService,
    private instrumentSvc: InstrumentService,
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
      this.page = await this.api.post(`/instrument/search/${this.pageNumber}/`,[{
        'field': 'title',
        'value': this.searchText
      }]);
    }else{
      this.page = await this.instrumentSvc.instrumentList(this.pageNumber);
    }
  }

  search(){
    this.router.navigateByUrl(`/instrument/search/${this.searchTextInputed}/${this.pageNumber}`);
  }

}

