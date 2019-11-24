import { Component, OnInit } from '@angular/core';
import {ReagentEntry} from "../../classes/reagent";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-reagents',
  templateUrl: './reagents.component.html',
  styleUrls: ['./reagents.component.scss']
})
export class ReagentsComponent implements OnInit {
  reagents:ReagentEntry[];
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
      this.api.post(`/reagent/search/${this.pageNumber}/`,[{
        "field": "name",
        "value": this.searchText
      }]).then(data=>{
        this.reagents=data['reagents'];
        this.totalPageCount=data['totalPageCount'];
      });
    }else{
      this.api.get(`/reagent/list/${this.pageNumber}/`).then(data=>{
        this.reagents=data['reagents'];
        this.totalPageCount=data['totalPageCount'];
      });
    }
  }

  search(){
    if (this.searchTextInputed) {
      this.router.navigateByUrl(`/reagent/search/${this.searchTextInputed}/1`);
    } else {
      this.router.navigateByUrl(`/reagent/list/1`);
    }
  }

}
