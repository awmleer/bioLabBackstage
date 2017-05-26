import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PapersComponent } from './papers/papers.component';
import {RouterModule} from "@angular/router";
import { LabelsComponent } from './labels/labels.component';

@NgModule({
  declarations: [
    AppComponent,
    PapersComponent,
    LabelsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'papers',
        component: PapersComponent
      },{
        path: 'labels',
        component: LabelsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
