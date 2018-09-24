import { Component, OnInit } from '@angular/core';
import {BioFile} from '../../../classes/courseware';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CoursewareService} from '../../../services/courseware.service';
import {CONST} from '../../../app/const';
import {log} from 'util';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-courseware-list',
  templateUrl: './courseware-list.component.html',
  styleUrls: ['./courseware-list.component.scss']
})
export class CoursewareListComponent implements OnInit {
  path: BioFile[];
  files: BioFile[];
  folderId: number = null;

  get uploadUrl() {
    return `${CONST.apiUrl}/courseware/upload/` + (this.folderId ? `?folderId=${this.folderId}` : '');
  }

  constructor(
    private route: ActivatedRoute,
    private coursewareSvc: CoursewareService,
    private router: Router,
    private messageSvc: NzMessageService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.folderId) {
        if (params.folderId === 'null') {
          this.folderId = null;
        } else {
          this.folderId = params.folderId;
        }
      }
      this.fetchList();
    });
  }

  async fetchList() {
    const data = await this.coursewareSvc.ls(this.folderId);
    this.path = data.path;
    this.files = data.files;
  }

  goFolder(folder: BioFile) {
    this.router.navigate(['./', {
      folderId: folder ? folder.id : 'null'
    }], {
      relativeTo: this.route
    });
  }

  onUploadChange(e) {
    console.log(e);
    if (e.file.status === 'done') {
      this.messageSvc.success('上传成功');
      this.fetchList();
    } else if (e.file.status === 'done') {
      this.messageSvc.error('上传失败');
    }
  }

  async deleteFile(file: BioFile) {
    await this.coursewareSvc.deleteFile(file.id);
    this.messageSvc.success('删除成功');
    await this.fetchList();
  }

  getDownloadLink(file: BioFile) {
    return `${CONST.apiUrl}/courseware/${file.id}/download/`;
  }

  async mkdir() {
    const name = prompt('请输入新文件夹的名字');
    await this.coursewareSvc.mkdir(this.folderId, name);
    this.messageSvc.success('创建成功');
    await this.fetchList();
  }

}
