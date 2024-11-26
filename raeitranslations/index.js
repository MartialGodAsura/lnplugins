const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
    name: 'Raei Translations',
    baseUrl: 'https://raeitranslations.com',

    async fetchNovelList() {
        const novels = [];
        const response = await axios.get(this.baseUrl);
        const $ = cheerio.load(response.data);

        // Adjust selectors based on the website's HTML structure
        $('div.novel-item').each((i, element) => {
            const title = $(element).find('h2.novel-title').text();
            const url = $(element).find('a').attr('href');
            const coverUrl = $(element).find('img.cover').attr('src');
            novels.push({ title, url, coverUrl });
        });

        return novels;
    },

    async fetchChapterList(novelUrl) {
        const chapters = [];
        const response = await axios.get(novelUrl);
        const $ = cheerio.load(response.data);

        // Adjust selectors for the chapter list
        $('ul.chapter-list li').each((i, element) => {
            const title = $(element).find('a').text();
            const url = $(element).find('a').attr('href');
            chapters.push({ title, url });
        });

        return chapters;
    },

    async fetchChapterContent(chapterUrl) {
        const response = await axios.get(chapterUrl);
        const $ = cheerio.load(response.data);

        // Adjust selector for chapter content
        const content = $('div.chapter-content').html();
        return content;
    }
};
