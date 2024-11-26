import fetch from '@libs/fetch';
import NovelStatus from '@libs/novelStatus';
import cheerio from 'cheerio';

export default {
  id: 'nhvnovels',
  name: 'NHV Novels',
  site: 'https://nhvnovels.com/',
  version: '1.0.0',
  icon: 'https://raw.githubusercontent.com/MartialGodAsura/lnplugins/main/assets/nhvvnovels-icon.jpg',

  async popularNovels(page) {
    const url = `https://nhvnovels.com/popular?page=${page}`;
    const result = await fetch(url);
    const novels = [];

    const $ = cheerio.load(result);
    $('.novel-item').each(function () {
      const name = $('.novel-title', this).text().trim();
      const cover = $('.novel-cover img', this).attr('src');
      const link = $('.novel-title a', this).attr('href');

      novels.push({
        name,
        cover: cover.startsWith('http') ? cover : `${this.site}${cover}`,
        path: link.replace(this.site, ''),
      });
    });

    return novels;
  },

  async parseNovelAndChapters(novelUrl) {
    const result = await fetch(this.site + novelUrl);
    const $ = cheerio.load(result);

    const name = $('.novel-title').text().trim();
    const cover = $('.novel-cover img').attr('src');
    const summary = $('.novel-summary').text().trim();
    const statusText = $('.novel-status').text().trim().toLowerCase();

    let status = NovelStatus.Unknown;
    if (statusText.includes('completed')) status = NovelStatus.Completed;
    if (statusText.includes('ongoing')) status = NovelStatus.Ongoing;

    const chapters = [];
    $('.chapter-item').each(function () {
      const chapterName = $('.chapter-title', this).text().trim();
      const chapterUrl = $('a', this).attr('href');

      chapters.push({
        name: chapterName,
        path: chapterUrl.replace(this.site, ''),
      });
    });

    return {
      name,
      cover: cover.startsWith('http') ? cover : `${this.site}${cover}`,
      summary,
      status,
      chapters,
    };
  },

  async parseChapter(chapterUrl) {
    const result = await fetch(this.site + chapterUrl);
    const $ = cheerio.load(result);

    return $('.chapter-content').html();
  },

  async searchNovels(searchTerm) {
    const url = `${this.site}/search?query=${encodeURIComponent(searchTerm)}`;
    const result = await fetch(url);
    const novels = [];

    const $ = cheerio.load(result);
    $('.novel-item').each(function () {
      const name = $('.novel-title', this).text().trim();
      const cover = $('.novel-cover img', this).attr('src');
      const link = $('.novel-title a', this).attr('href');

      novels.push({
        name,
        cover: cover.startsWith('http') ? cover : `${this.site}${cover}`,
        path: link.replace(this.site, ''),
      });
    });

    return novels;
  },
};
