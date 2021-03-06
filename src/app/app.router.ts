import {RouterModule} from '@angular/router';
import {PapersComponent} from '../pages/papers/papers.component';
import {LabelsComponent} from '../pages/labels/labels.component';
import {PaperDetailComponent} from '../pages/paper-detail/paper-detail.component';
import {PaperEditComponent} from '../pages/paper-edit/paper-edit.component';
import {ReagentsComponent} from '../pages/reagents/reagents.component';
import {ReagentDetailComponent} from '../pages/reagent-detail/reagent-detail.component';
import {ReagentEditComponent} from '../pages/reagent-edit/reagent-edit.component';
import {InstrumentEditComponent} from '../pages/instrument-edit/instrument-edit.component';
import {InstrumentsComponent} from '../pages/instruments/instruments.component';
import {InstrumentDetailComponent} from '../pages/instrument-detail/instrument-detail.component';
import {LabReserveComponent} from '../pages/lab-reserve/lab-reserve.component';
import {LabReserveDetailComponent} from '../pages/lab-reserve-detail/lab-reserve-detail.component';
import {LabReserveEditComponent} from '../pages/lab-reserve-edit/lab-reserve-edit.component';
import {NoticesComponent} from '../pages/notice/notices/notices.component';
import {NoticeEditComponent} from '../pages/notice/notice-edit/notice-edit.component';
import {NoticeDetailComponent} from '../pages/notice/notice-detail/notice-detail.component';
import {BbsListComponent} from '../pages/bbs/bbs-list/bbs-list.component';
import {BbsGroupComponent} from '../pages/bbs/bbs-group/bbs-group.component';
import {UserProfileComponent} from '../pages/user-profile/user-profile.component';
import {LoginComponent} from '../pages/login/login.component';
import {CoursewareListComponent} from '../pages/courseware/courseware-list/courseware-list.component';
import {UserManagementComponent} from '../pages/user/user-management/user-management.component';
import {UserAddBulkComponent} from '../pages/user/user-add-bulk/user-add-bulk.component';
import {UserEditComponent} from '../pages/user/user-edit/user-edit.component';
import {BbsDetailComponent} from '../pages/bbs/bbs-detail/bbs-detail.component';

export const Router=RouterModule.forRoot([
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: '登录'
    }
  },{
    path: 'user/profile',
    component: UserProfileComponent,
    data: {
      title: '账号信息'
    }
  },{
    path: 'user/management',
    component: UserManagementComponent,
    data: {
      title: '账号管理'
    }
  },{
    path: 'user/add-bulk',
    component: UserAddBulkComponent,
    data: {
      title: '批量账号导入'
    }
  },{
    path: 'user/add',
    component: UserEditComponent,
    data: {
      title: '添加用户'
    }
  },{
    path: 'user/:id/edit',
    component: UserEditComponent,
    data: {
      title: '编辑用户'
    }
  },{
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
    component: PaperEditComponent,
    data: {
      title: '添加论文'
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
    path: 'reagent/add',
    component: ReagentEditComponent,
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
    path: 'reagent/:id/edit',
    component: ReagentEditComponent,
    data: {
      title: '编辑试剂'
    }
  },{
    path: 'instrument/list/:pageNumber',
    component: InstrumentsComponent,
    data: {
      title: '仪器列表'
    }
  },{
    path: 'instrument/search/:searchText/:pageNumber',
    component: InstrumentsComponent,
    data: {
      title: '仪器搜索'
    }
  },{
    path: 'instrument/add',
    component: InstrumentEditComponent,
    data: {
      title: '添加仪器'
    }
  },{
    path: 'instrument/:id/edit',
    component: InstrumentEditComponent,
    data: {
      title: '编辑仪器'
    }
  },{
    path: 'instrument/:id',
    component: InstrumentDetailComponent,
    data: {
      title: '仪器详情'
    }
  },{
    path: 'lab-reserve/labs',
    component: LabReserveComponent,
    data: {
      title: '实验室列表'
    }
  },{
    path: 'lab-reserve/labs/create',
    component: LabReserveEditComponent,
    data: {
      title: '添加实验室'
    }
  },{
    path: 'lab-reserve/labs/:id/edit',
    component: LabReserveEditComponent,
    data: {
      title: '编辑实验室'
    }
  },{
    path: 'lab-reserve/labs/:id',
    component: LabReserveDetailComponent,
    data: {
      title: '实验室审批'
    }
  },{
    path: 'labels/:type',
    component: LabelsComponent,
    data: {
      title: '标签'
    }
  },{
    path: 'notice/list/:pageNumber',
    component: NoticesComponent,
    data: {
      title: '公告列表'
    }
  },{
    path: 'notice/:id/edit',
    component: NoticeEditComponent,
    data: {
      title: '编辑公告'
    }
  },{
    path: 'notice/add',
    component: NoticeEditComponent,
    data: {
      title: '发布公告'
    }
  },{
    path: 'notice/:id',
    component: NoticeDetailComponent,
    data: {
      title: '公告详情'
    }
  },{
    path: 'bbs/post/list/:pageNumber',
    component: BbsListComponent,
    data: {
      title: '讨论列表'
    }
  },{
    path: 'bbs/post/:id',
    component: BbsDetailComponent,
    data: {
      title: '讨论详情'
    }
  },{
    path: 'bbs/group',
    component: BbsGroupComponent,
    data: {
      title: '讨论版块管理'
    }
  },{
    path: 'courseware/ls',
    component: CoursewareListComponent,
    data: {
      title: '课件资料管理'
    }
  }
],{
  useHash: true
});
