import { HomeAutomationPage } from './app.po';

describe('home-automation App', function() {
  let page: HomeAutomationPage;

  beforeEach(() => {
    page = new HomeAutomationPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
