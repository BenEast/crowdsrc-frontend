import { CrowdsrcPage } from './app.po';

describe('crowdsrc App', () => {
  let page: CrowdsrcPage;

  beforeEach(() => {
    page = new CrowdsrcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
