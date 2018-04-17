import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PapersComponent } from '../pages/papers/papers.component';
import { LabelsComponent } from '../pages/labels/labels.component';
import { PaperDetailComponent } from '../pages/paper-detail/paper-detail.component';
import {LabelService} from '../services/label.service';
import {TreeModule} from 'angular-tree-component';
import {Router} from './app.router';

// import { FileSelectDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { PaperEditComponent } from '../pages/paper-edit/paper-edit.component';
import {FileUploadModule} from 'ng2-file-upload';
import { ReagentsComponent } from '../pages/reagents/reagents.component';
import {ApiService} from '../services/api.service';
import { ReagentAddComponent } from '../pages/reagent-add/reagent-add.component';
import { ReagentDetailComponent } from '../pages/reagent-detail/reagent-detail.component';
import { ReagentEditComponent } from '../pages/reagent-edit/reagent-edit.component';
import { LabelParentPipe } from '../pipes/label-parent.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { LabelManagementComponent } from '../components/label-management/label-management.component';
import {PaperService} from '../services/paper.service';
import {ReagentService} from '../services/reagent.service';


@NgModule({
  declarations: [
    AppComponent,
    PapersComponent,
    LabelsComponent,
    PaperDetailComponent,
    PaperEditComponent,
    ReagentsComponent,
    ReagentAddComponent,
    ReagentDetailComponent,
    ReagentEditComponent,
    LabelParentPipe,
    LabelManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TreeModule,
    FileUploadModule,
    NgZorroAntdModule.forRoot(),
    Router
  ],
  providers: [
    ApiService,
    LabelService,
    PaperService,
    ReagentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
