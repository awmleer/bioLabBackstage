import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public route: ActivatedRoute
  ){}

  ngOnInit(){
    // console.log(this.router.routerState.root.data);
    console.log(this.route);
  }

  get routeData(){
    return this.route.firstChild.data;
  }

}
