export class InstrumentEntry {
  id: number;
  chineseName: string;
  englishName: string;
}

export class InstrumentBrief extends InstrumentEntry {
  modelNumber: string;
}

export class InstrumentDetail extends InstrumentBrief {
  content: string;//HTML
}
