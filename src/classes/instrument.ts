import {Label, LabeledItem} from './label';

export class InstrumentEntry implements LabeledItem {
  id: number;
  chineseName: string;
  englishName: string;
  labels: Label[];
}

export class InstrumentBrief extends InstrumentEntry {
  coverImg: string;//url
  modelNumber: string;
}

export class InstrumentDetail extends InstrumentBrief {
  content: {
    outer: string;
    inner: string;
    instructions: string;
    attentions: string;
  } = {
    outer: '',
    inner: '',
    instructions: '',
    attentions: ''
  };//HTML
}
