import { FlickrApiCodingChallengePage } from './app.po';

describe('flickr-api-coding-challenge App', () => {
  let page: FlickrApiCodingChallengePage;

  beforeEach(() => {
    page = new FlickrApiCodingChallengePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
