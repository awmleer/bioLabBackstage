import { Component, OnInit } from '@angular/core';

import {ApiService} from '../../services/api.service';
import {InstrumentEntry} from '../../classes/instrument';
import {ActivatedRoute, Router} from '@angular/router';
import {InstrumentService} from '../../services/instrument.service';


@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss']
})
export class InstrumentsComponent implements OnInit {

  instruments:InstrumentEntry[];
  searchText:string;
  searchTextInputed:string='';
  pageNumber:number;
  totalPageCount:number=1;

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
    let data;
    if (this.searchText) {
      data = await this.api.post(`/instrument/search/${this.pageNumber}/`,[{
        'field': 'title',
        'value': this.searchText
      }]);
    }else{
      data = await this.instrumentSvc.instrumentList(this.pageNumber);
    }
    this.instruments=data['instruments'];
    this.totalPageCount=data['totalPageCount'];
  }

  search(){
    this.router.navigateByUrl(`/instrument/search/${this.searchTextInputed}/${this.pageNumber}`);
  }

}

