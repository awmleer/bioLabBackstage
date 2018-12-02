import { Component, OnInit } from '@angular/core';
import {CONST} from '../../../app/const';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-user-add-bulk',
  templateUrl: './user-add-bulk.component.html',
  styleUrls: ['./user-add-bulk.component.scss']
})
export class UserAddBulkComponent implements OnInit {
  apiUrl = CONST.apiUrl;

  constructor(
    private nzMessageSvc: NzMessageService
  ) { }

  ngOnInit() {
  }

  onUploadChange(data) {
    console.log(data.file);
    if (data.file && data.file.status === 'done') {
      this.nzMessageSvc.success('导入完成');
    }
  }

}
