import {html, uri} from "./types";

export interface ReagentEntry {
  id: number;
  chineseName: string;
}

export interface ReagentBrief extends ReagentEntry {
  englishName: string;
  molecularFormula: html;
  molecularWeight: number;
  dangerous: null | string;
  labels: ReagentLabel[];
}

export interface ReagentDetail extends ReagentBrief {
  pictures: ReagentPicture[];
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
