import { Component, OnInit } from '@angular/core';
import {ReagentDetail} from "../../classes/reagent";
import {ApiService} from "../../services/api.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-reagent-add',
  templateUrl: './reagent-add.component.html',
  styleUrls: ['./reagent-add.component.scss']
})
export class ReagentAddComponent implements OnInit {
  reagent:ReagentDetail=new ReagentDetail();
  constructor(
    public location: Location,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  submit(){
    if (this.reagent.dangerous == '') {
      this.reagent.dangerous=null;
    }
    this.api.post('/reagent/add/',this.reagent).then((data)=>{
      alert('添加成功');
      this.router.navigate(['/reagent',data.reagentId]);
    });
  }


}
