import {Component, Input, OnInit} from '@angular/core';
import {LabelService} from '../../services/label.service';
import * as _ from 'lodash';
import {Subject} from 'rxjs';
import {Label, LabeledItem, LabeledItemService} from '../../classes/label';
import {PaperService} from '../../services/paper.service';
import {ReagentService} from '../../services/reagent.service';
import {InstrumentService} from '../../services/instrument.service';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'label-management',
  templateUrl: './label-management.component.html',
  styleUrls: ['./label-management.component.scss']
})
export class LabelManagementComponent implements OnInit {

  @Input() item: LabeledItem;
  @Input() itemType: 'paper'|'reagent'|'instrument';

  labelSearchText:string = '';
  labelSearchTextSubject: Subject<string> = new Subject<string>();

  filteredLabels:Label[] = [];

  constructor(
    public labelSvc: LabelService,
    private paperSvc: PaperService,
    private reagentSvc: ReagentService,
    private instrumentSvc: InstrumentService,
  ) {}

  ngOnInit() {
    this.labelSearchTextSubject
      .pipe(debounceTime(500)) // wait 500ms after the last event before emitting last event
      .subscribe(val => {
        this.labelSearchText = val;
        if (this.labelSearchText === '') {
          this.filteredLabels = [];
        }else{
          this.filteredLabels = _.filter(this.labels,(label)=>{
            return label.name.indexOf(this.labelSearchText)!==-1;
          });
        }
      });
  }

  get labels():Label[]{
    return this.labelSvc.getLabels(this.itemType);
  }

  labelSearchTextChanged(newValue){
    this.labelSearchTextSubject.next(newValue);
  }


  removeLabel(label:Label){
    this.labeledItemSvc.removeLabel(this.item, label);
  }

  addLabel(label:Label){
    this.labeledItemSvc.addLabel(this.item, label).then(() => {
      this.labelSearchText='';
      this.filteredLabels = [];
    });
  }

  get labeledItemSvc():LabeledItemService{
    if(this.itemType === 'paper'){
      return this.paperSvc;
    }else if(this.itemType === 'reagent'){
      return this.reagentSvc;
    }else if(this.itemType === 'instrument'){
      return this.instrumentSvc;
    }
  }

}
