import {html, uri} from "./types";

export class ReagentEntry {
  id: number;
  chineseName: string='';
}

export class ReagentBrief extends ReagentEntry {
  englishName: string='';
  molecularFormula: string='';
  molecularFormulaParsed: html='';
  molecularWeight: number=0;
  dangerous: null | string='';
  labels: ReagentLabel[]=[];
}

export class ReagentDetail extends ReagentBrief {
  pictures: ReagentPicture[]=[];
}

export interface ReagentPicture {
  description: string;
  uri: uri;
}

export interface ReagentLabel {
  id: number;
  name: string;
  parentId: number;
}
export interface ReagentLabelTreeNode extends ReagentLabel {
  children: ReagentLabelTreeNode[];
}
