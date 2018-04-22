import {Label, LabeledItem} from './label';

export class PaperEntry implements LabeledItem {
  title:string;
  id:number;
  labels:Label[];
}

export class PaperBrief extends PaperEntry {
  author:string;
  major:string;
  teachers:{
    id: number;
    name: string;
  }[];
  abstract:string;
  keyword:string;
  publishYear:number;
  downloadCount:number;
}

export class PaperDetail extends PaperBrief{
  subject:string;
}

