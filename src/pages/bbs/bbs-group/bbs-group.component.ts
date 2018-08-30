import { Component, OnInit } from '@angular/core';
import {BbsService} from '../../../services/bbs.service';
import {PostGroup} from '../../../classes/bbs';

@Component({
  selector: 'app-bbs-group',
  templateUrl: './bbs-group.component.html',
  styleUrls: ['./bbs-group.component.scss']
})
export class BbsGroupComponent implements OnInit {

  groups: PostGroup[] = null;

  constructor(
    private bbsSvc: BbsService,
  ) { }

  ngOnInit() {
    this.updateGroups();
  }

  async updateGroups() {
    this.groups = await this.bbsSvc.postGroups();
  }

  async addGroup() {
    const name = prompt('请输入新版块的名字');
    if (!name) return;
    await this.bbsSvc.addGroup(name);
    await this.updateGroups();
  }

  async removeGroup(group: PostGroup) {
    await this.bbsSvc.removeGroup(group.id);
    await this.updateGroups();
  }

}
