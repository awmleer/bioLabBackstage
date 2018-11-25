import {html, url} from './types';
import {Label, LabeledItem} from './label';

export class ReagentEntry implements LabeledItem {
  id: number;
  chineseName: string='';
  englishName: string='';
  alias: string='';
  labels: Label[];
}

export class ReagentBrief extends ReagentEntry {
  molecularFormula: string='';
  molecularFormulaParsed: html;
  molecularWeight: string='';
  dangerous: boolean = false;
}

export class ReagentDetail extends ReagentBrief {
  pictures: ReagentPicture[]=[];
  description: string='';
}

export interface ReagentPicture {
  id: number;
  description: string;
  url: url;
}
