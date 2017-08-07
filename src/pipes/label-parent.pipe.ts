import { Pipe, PipeTransform } from '@angular/core';
import {Label} from "../classes/types";
import * as _ from "lodash"


@Pipe({
  name: 'labelParent'
})


export class LabelParentPipe implements PipeTransform {

  transform(label:Label, labelList:Label[]):string {
    if (!label) {
      return '';
    }
    let result:string='';
    let l:Label = label;
    while (l.parentId!=null){
      console.log(l.parentId);
      result+='<-';
      l=_.find(labelList,{
        'id': l.parentId
      });
      result+=l.name;
      console.log(result);
      console.log(l);
    }
    return result;
  }

}
