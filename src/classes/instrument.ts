export class InstrumentEntry {
  id: number;
  chineseName: string;
  englishName: string;
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
