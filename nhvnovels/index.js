import fetch from '@libs/fetch';
import cheerio from 'cheerio';

export default {
  id: 'nhvnovels',
  name: 'NHV Novels',
  version: '1.0.0',
  icon: 'https://nhvnovels.com/favicon.ico',
  site: 'https://nhvnovels.com',

  async fetchNovelList() {
    const novels = [];
    const url = `${this.site}/novels/`;
    const result = await fetch(url);
    const $ = cheerio.load(result);

    $('.novel-item').each(function () {
      const name = $('.novel-title', this).text().trim();
      const cover = $('.novel-cover img', this).attr('src');
      const link = $('a', this).attr('href');

      novels.push({
        name,
        cover: cover.startsWith('http') ? cover : `${this.site}${cover}`,
        url: link.startsWith('http') ? link : `${this.site}${link}`,
      });
    });

    return novels;
  },

  async fetchNovelDetails(novelUrl) {
    const result = await fetch(novelUrl);
    const $ = cheerio.load(result);

    const name = $('.novel-title').text().trim();
    const cover = $('.novel-cover img').attr('src');
    const summary = $('.novel-summary').text().trim();

    const chapters = [];
    $('.chapter-list li').each(function () {
      const chapterName = $('a', this).text().trim();
      const chapterUrl = $('a', this).attr('href');

      chapters.push({
        name: chapterName,
        url: chapterUrl.startsWith('http') ? chapterUrl : `${this.site}${chapterUrl}`,
      });
    });

    return {
      name,
      cover: cover.startsWith('http') ? cover : `${this.site}${cover}`,
      summary,
      chapters,
    };
  },

  async fetchChapterContent(chapterUrl) {
    const result = await fetch(chapterUrl);
    const $ = cheerio.load(result);

    return $('.chapter-content').html();
  },
};
