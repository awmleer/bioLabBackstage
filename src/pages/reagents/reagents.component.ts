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
  reagents:ReagentEntry;
  searchText:string;
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
      this.api.get(`/reagent/list/${this.pageNumber}/`).then(data=>{
        this.reagents=data['reagents'];
        this.totalPageCount=data['totalPageCount'];
      });
      console.log(this.route);
    });
  }

  pageChange(pageNumber){
    this.router.navigate([`../${pageNumber}`], {relativeTo: this.route});
  }

  search(){
    if (!this.searchText) {
      return;
    }
    this.api.post(`/reagent/search/${this.pageNumber}/`,[{
      "field": "name",
      "value": this.searchText
    }]).then(data=>{
      this.reagents=data['reagents'];
      this.totalPageCount=data['totalPageCount'];
      console.log(this.reagents);
    });
  }

}
