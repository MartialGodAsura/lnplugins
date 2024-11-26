const fetch = require('@libs/fetch');
const NovelStatus = require('@libs/novelStatus');

module.exports = {
    id: "nhvnovels",
    name: "NHV Novels",
    site: "https://nhvnovels.com/",
    version: "1.0.0",
    icon: "https://example.com/icon.png", 

    
    popularNovels: async function (page) {
        const url = `https://nhvnovels.com/popular?page=${page}`;
        const result = await fetch(url);
        const novels = [];

        const $ = require('cheerio').load(result);
        $('.novel-item').each(function () {
            const name = $('.novel-title', this).text().trim();
            const cover = $('.novel-cover img', this).attr('src');
            const link = $('.novel-title a', this).attr('href');

            novels.push({
                name,
                cover,
                path: link.replace(this.site, ''),
            });
        });

        return novels;
    },

    
    parseNovelAndChapters: async function (novelUrl) {
        const result = await fetch(this.site + novelUrl);
        const $ = require('cheerio').load(result);

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
            cover,
            summary,
            status,
            chapters,
        };
    },

    
    parseChapter: async function (chapterUrl) {
        const result = await fetch(this.site + chapterUrl);
        const $ = require('cheerio').load(result);

        return $('.chapter-content').html();
    },

    
    searchNovels: async function (searchTerm) {
        const url = `${this.site}/search?query=${encodeURIComponent(searchTerm)}`;
        const result = await fetch(url);
        const novels = [];

        const $ = require('cheerio').load(result);
        $('.novel-item').each(function () {
            const name = $('.novel-title', this).text().trim();
            const cover = $('.novel-cover img', this).attr('src');
            const link = $('.novel-title a', this).attr('href');

            novels.push({
                name,
                cover,
                path: link.replace(this.site, ''),
            });
        });

        return novels;
    },
};
