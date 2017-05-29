import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PapersComponent } from './papers/papers.component';
import {RouterModule} from '@angular/router';
import { LabelsComponent } from './labels/labels.component';
import { PaperDetailComponent } from './paper-detail/paper-detail.component';
import {LabelService} from "./services/label.service";

@NgModule({
  declarations: [
    AppComponent,
    PapersComponent,
    LabelsComponent,
    PaperDetailComponent
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
      },{
        path: 'paper/:id',
        component: PaperDetailComponent
      }
    ])
  ],
  providers: [LabelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
