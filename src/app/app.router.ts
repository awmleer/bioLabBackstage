import {RouterModule} from "@angular/router";
import {PapersComponent} from "./papers/papers.component";
import {LabelsComponent} from "./labels/labels.component";
import {PaperDetailComponent} from "./paper-detail/paper-detail.component";

export const Router=RouterModule.forRoot([
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
],{
  useHash: true
});
