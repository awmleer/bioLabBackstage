import { Component, OnInit } from '@angular/core';
import {ReagentEntry} from "../../classes/reagent";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-reagents',
  templateUrl: './reagents.component.html',
  styleUrls: ['./reagents.component.scss']
})
export class ReagentsComponent implements OnInit {
  reagents:ReagentEntry;
  searchText:string;

  constructor(
    private api:ApiService
  ) { }

  ngOnInit() {
    this.api.get(`/reagent/list/`).then(data=>{
      this.reagents=data;
    });
  }
  search(){
    if (!this.searchText) {
      return;
    }
    this.api.post(`/reagent/search/1/`,[{
      "field": "name",
      "value": this.searchText
    }]).then(data=>{
      this.reagents=data['reagents'];
      console.log(this.reagents);
    });
  }

}
