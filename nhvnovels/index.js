import axios from 'axios';
import cheerio from 'cheerio';

export default {
  id: 'nhvnovels',
  name: 'NHV Novels',
  version: '1.0.0',
  icon: 'https://nhvnovels.com/favicon.ico',
  site: 'https://nhvnovels.com',
  protected: false,

  async fetchNovelList() {
    try {
      const novels = [];
      const response = await axios.get('https://nhvnovels.com/novels/');
      const $ = cheerio.load(response.data);

      $('div.novel-item').each((i, el) => {
        const title = $(el).find('h2.novel-title').text().trim();
        const novelUrl = $(el).find('a').attr('href');
        const coverUrl = $(el).find('img').attr('src');
        novels.push({
          title,
          url: novelUrl.startsWith('http') ? novelUrl : `https://nhvnovels.com${novelUrl}`,
          cover: coverUrl.startsWith('http') ? coverUrl : `https://nhvnovels.com${coverUrl}`,
        });
      });

      return novels;
    } catch (error) {
      console.error('Error fetching novel list:', error.message);
      return [];
    }
  },

  async fetchNovelDetails(novelUrl) {
    try {
      const response = await axios.get(novelUrl);
      const $ = cheerio.load(response.data);

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
          url: chapterUrl.startsWith('http') ? chapterUrl : `https://nhvnovels.com${chapterUrl}`,
        });
      });

      return {
        title,
        author,
        summary,
        cover: cover.startsWith('http') ? cover : `https://nhvnovels.com${cover}`,
        chapters,
      };
    } catch (error) {
      console.error(`Error fetching details for ${novelUrl}:`, error.message);
      return null;
    }
  },

  async fetchChapterContent(chapterUrl) {
    try {
      const response = await axios.get(chapterUrl);
      const $ = cheerio.load(response.data);

      const content = $('div.chapter-content').html();
      return content || '<p>No content available.</p>';
    } catch (error) {
      console.error(`Error fetching chapter content for ${chapterUrl}:`, error.message);
      return '<p>Error fetching chapter content.</p>';
    }
  },
};
