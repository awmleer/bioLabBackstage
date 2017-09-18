import {RouterModule} from "@angular/router";
import {PapersComponent} from "../pages/papers/papers.component";
import {LabelsComponent} from "../pages/labels/labels.component";
import {PaperDetailComponent} from "../pages/paper-detail/paper-detail.component";
import {PaperEditComponent} from "../pages/paper-edit/paper-edit.component";
import {PaperAddComponent} from "../pages/paper-add/paper-add.component";
import {ReagentsComponent} from "../pages/reagents/reagents.component";
import {ReagentAddComponent} from "../pages/reagent-add/reagent-add.component";
import {ReagentDetailComponent} from "../pages/reagent-detail/reagent-detail.component";
import {ReagentEditComponent} from "../pages/reagent-edit/reagent-edit.component";

export const Router=RouterModule.forRoot([
  {
    path: 'papers',
    component: PapersComponent
  },{
    path: 'reagent/list/:pageNumber',
    component: ReagentsComponent,
  },{
    path: 'reagent/search/:searchText/:pageNumber',
    component: ReagentsComponent,
  },{
    path: 'paper/add',
    component: PaperAddComponent,
  },{
    path: 'reagent/add',
    component: ReagentAddComponent,
  },{
    path: 'reagent/:id',
    component: ReagentDetailComponent
  },{
    path: 'labels/:type',
    component: LabelsComponent
  },{
    path: 'paper/:id',
    component: PaperDetailComponent
  },{
    path: 'paper/:id/edit',
    component: PaperEditComponent
  },{
    path: 'reagent/:id/edit',
    component: ReagentEditComponent
  }
],{
  useHash: true
});
