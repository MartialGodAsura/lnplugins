export default {
  id: 'nhvnovels',
  name: 'NHV Novels',
  version: '1.0.0',
  icon: 'https://nhvnovels.com/favicon.ico',
  site: 'https://nhvnovels.com',
  protected: false,

  async fetchNovelList() {
    const novels = [];
    const response = await fetch('https://nhvnovels.com/novels/');
    const text = await response.text();
    const $ = require('cheerio').load(text);

    $('div.novel-item').each((i, el) => {
      const title = $(el).find('h2.novel-title').text().trim();
      const novelUrl = $(el).find('a').attr('href');
      const coverUrl = $(el).find('img').attr('src');
      novels.push({
        title,
        url: novelUrl,
        cover: coverUrl.startsWith('http') ? coverUrl : `https://nhvnovels.com${coverUrl}`,
      });
    });

    return novels;
  },

  async fetchNovelDetails(novelUrl) {
    const response = await fetch(novelUrl);
    const text = await response.text();
    const $ = require('cheerio').load(text);

    const title = $('h1.novel-title').text().trim();
    const author = $('span.author').text().trim();
    const summary = $('div.novel-summary').text().trim();
    const cover = $('div.novel-cover img').attr('src');

    const chapters = [];
    $('ul.chapter-list li').each((i, el) => {
      const chapterTitle = $(el).find('a').text().trim();
      const chapterUrl = $(el).find('a').attr('href');
      chapters.push({
        title: chapterTitle,
        url: chapterUrl,
      });
    });

    return {
      title,
      author,
      summary,
      cover: cover.startsWith('http') ? cover : `https://nhvnovels.com${cover}`,
      chapters,
    };
  },

  async fetchChapterContent(chapterUrl) {
    const response = await fetch(chapterUrl);
    const text = await response.text();
    const $ = require('cheerio').load(text);

    const content = $('div.chapter-content').html();
    return content;
  },
};
