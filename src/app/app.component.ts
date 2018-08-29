import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from '../services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public route: ActivatedRoute,
    private accountSvc: AccountService,
  ){}

  ngOnInit(){
    // console.log(this.router.routerState.root.data);
    console.log(this.route);
    this.accountSvc.getUserInfo();
  }

  get routeData(){
    return this.route.firstChild.data;
  }

}
