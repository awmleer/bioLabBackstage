import {Label} from "./types";

export interface PaperLabel extends Label{}

export class PaperEntry {
  title:string;
  id:number;
  label:{
    id:number;
    name:string;
  }[];
}

export class PaperBrief {
  id:number;
  title:string;
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
  labels:{
    id:number;
    name:string;
  }[];
  subject:string;
}

export interface PaperLabelTreeNode extends PaperLabel {
  children: PaperLabelTreeNode[];
}
