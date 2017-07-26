import {html, uri} from "./types";

export class ReagentEntry {
  id: number;
  chineseName: string;
  englishName: string;
  alias: string;
}

export class ReagentBrief extends ReagentEntry {
  molecularFormula: string;
  molecularFormulaParsed: html;
  molecularWeight: number;
  dangerous: null | string;
  labels: ReagentLabel[];
}

export class ReagentDetail extends ReagentBrief {
  pictures: ReagentPicture[];
  description: string;
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
