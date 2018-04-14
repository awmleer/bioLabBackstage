import {RouterModule} from '@angular/router';
import {PapersComponent} from '../pages/papers/papers.component';
import {LabelsComponent} from '../pages/labels/labels.component';
import {PaperDetailComponent} from '../pages/paper-detail/paper-detail.component';
import {PaperEditComponent} from '../pages/paper-edit/paper-edit.component';
import {PaperAddComponent} from '../pages/paper-add/paper-add.component';
import {ReagentsComponent} from '../pages/reagents/reagents.component';
import {ReagentAddComponent} from '../pages/reagent-add/reagent-add.component';
import {ReagentDetailComponent} from '../pages/reagent-detail/reagent-detail.component';
import {ReagentEditComponent} from '../pages/reagent-edit/reagent-edit.component';

export const Router=RouterModule.forRoot([
  {
    path: 'paper/list/:pageNumber',
    component: PapersComponent,
    data: {
      title: '论文列表'
    }
  },{
    path: 'paper/search/:searchText/:pageNumber',
    component: PapersComponent,
    data: {
      title: '论文搜索'
    }
  },{
    path: 'reagent/list/:pageNumber',
    component: ReagentsComponent,
    data: {
      title: '试剂列表'
    }
  },{
    path: 'reagent/search/:searchText/:pageNumber',
    component: ReagentsComponent,
    data: {
      title: '试剂搜索'
    }
  },{
    path: 'paper/add',
    component: PaperAddComponent,
    data: {
      title: '添加论文'
    }
  },{
    path: 'reagent/add',
    component: ReagentAddComponent,
    data: {
      title: '添加试剂'
    }
  },{
    path: 'reagent/:id',
    component: ReagentDetailComponent,
    data: {
      title: '试剂详情'
    }
  },{
    path: 'labels/:type',
    component: LabelsComponent,
    data: {
      title: '标签'
    }
  },{
    path: 'paper/:id',
    component: PaperDetailComponent,
    data: {
      title: '论文详情'
    }
  },{
    path: 'paper/:id/edit',
    component: PaperEditComponent,
    data: {
      title: '编辑论文'
    }
  },{
    path: 'reagent/:id/edit',
    component: ReagentEditComponent,
    data: {
      title: '编辑试剂'
    }
  }
],{
  useHash: true
});
