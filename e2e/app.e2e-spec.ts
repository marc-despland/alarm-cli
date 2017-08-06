import { AlarmCliPage } from './app.po';

describe('alarm-cli App', () => {
  let page: AlarmCliPage;

  beforeEach(() => {
    page = new AlarmCliPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
