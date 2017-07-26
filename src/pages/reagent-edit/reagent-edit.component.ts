import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {ReagentDetail} from "../../classes/reagent";

@Component({
  selector: 'app-reagent-edit',
  templateUrl: './reagent-edit.component.html',
  styleUrls: ['./reagent-edit.component.scss']
})
export class ReagentEditComponent implements OnInit {
  reagent:ReagentDetail;

  constructor(
    private api: ApiService,
    public location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.api.get(`/reagent/${params['id']}/detail/`).then(data=>{
          this.reagent=data;
        });
      });
  }

  submit(){
    this.api.post(`/reagent/${this.reagent.id}/edit/`,this.reagent).then(()=>{
      this.location.back();
    });
  }

}
