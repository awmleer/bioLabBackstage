import { BioLabBackstagePage } from './app.po';

describe('bio-lab-backstage App', () => {
  let page: BioLabBackstagePage;

  beforeEach(() => {
    page = new BioLabBackstagePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
