import { Component, OnInit } from '@angular/core';
import {BioFile} from '../../../classes/courseware';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CoursewareService} from '../../../services/courseware.service';

@Component({
  selector: 'app-courseware-list',
  templateUrl: './courseware-list.component.html',
  styleUrls: ['./courseware-list.component.scss']
})
export class CoursewareListComponent implements OnInit {
  path: BioFile[];
  files: BioFile[];

  constructor(
    private route: ActivatedRoute,
    private coursewareSvc: CoursewareService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params: Params) => {
      console.log(params);
      let folderId = null;
      if (params.folderId) folderId = params.folderId;
      const data = await this.coursewareSvc.ls(params.folderId);
      this.path = data.path;
      this.files = data.files;
    });
  }

  goFolder(folder: BioFile) {
    this.router.navigate(['./', {folderId: folder.id}], {
      relativeTo: this.route
    });
  }

}
