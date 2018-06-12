import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import 'rxjs/add/operator/debounceTime';
import {ApiService} from '../../services/api.service';
import {CONST} from '../../app/const';
import {NzModalService} from 'ng-zorro-antd';
import {PaperService} from '../../services/paper.service';
import {PaperDetail} from '../../classes/paper';


@Component({
  selector: 'app-paper-detail',
  templateUrl: './paper-detail.component.html',
  styleUrls: ['./paper-detail.component.scss']
})
export class PaperDetailComponent implements OnInit {
  public uploader:FileUploader;
  paper:PaperDetail;
  private newPdfContent:string='';

  constructor(
    private apiSvc: ApiService,
    private route: ActivatedRoute,
    private modalSvc: NzModalService,
    public paperSvc: PaperService,
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params)=>{
        this.paperSvc.getPaperDetail(params['id']).then(data=>{
          this.paper=data;
          this.uploader=new FileUploader({url: `${CONST.apiUrl}/paper/${this.paper.id}/upload/`});
        });
      });
  }

  openModal(contentTpl) {
    this.modalSvc.create({
      nzTitle: '更新PDF中的文字',
      nzContent: contentTpl,
      // nzFooter: tplFooter,
      nzMaskClosable: true,
      nzClosable: true,
      nzOnOk: () => {
        this.updatePdfContent();
      }
    });
    // this.modal=this.modalCtrl.open(content);
  }

  updatePdfContent(){
    this.apiSvc.post(`/paper/${this.paper.id}/updatePDFContent/`, this.newPdfContent).then(() => {
      //TODO toast 提交成功
    });
  }

}
