import {Label, LabeledItem} from './label';

export interface PaperLabel extends Label{}

export class PaperEntry implements LabeledItem {
  title:string;
  id:number;
  labels:PaperLabel[];
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

export interface PaperLabelTreeNode extends PaperLabel {
  children: PaperLabelTreeNode[];
}
