const plugin = {
    id: "raeitranslations",
    name: "Raei Translations",
    version: "1.0.0",
    site: "https://raeitranslations.com",

    /**
     * Fetch the list of novels.
     */
    async fetchNovelList() {
        const novels = [];
        try {
            const response = await fetch(`${this.site}/novels/`);
            const html = await response.text();
            const $ = require("cheerio").load(html);

            $(".novel-item").each((_, element) => {
                const title = $(element).find(".novel-title").text().trim();
                const url = $(element).find("a").attr("href");
                const cover = $(element).find("img").attr("src");

                novels.push({
                    name: title,
                    cover: cover ? (cover.startsWith("http") ? cover : `${this.site}${cover}`) : "",
                    url: url ? (url.startsWith("http") ? url : `${this.site}${url}`) : "",
                });
            });
        } catch (error) {
            console.error("Error fetching novel list:", error.message);
        }
        return novels;
    },

    /**
     * Fetch details of a specific novel.
     */
    async fetchNovelDetails(novelUrl) {
        const details = {
            name: "",
            cover: "",
            summary: "",
            chapters: [],
        };

        try {
            const response = await fetch(novelUrl);
            const html = await response.text();
            const $ = require("cheerio").load(html);

            details.name = $("h1.novel-title").text().trim();
            details.cover = $(".novel-cover img").attr("src") || "";
            details.summary = $(".novel-summary").text().trim();

            $(".chapter-list li").each((_, element) => {
                const chapterName = $(element).find("a").text().trim();
                const chapterUrl = $(element).find("a").attr("href");

                if (chapterName && chapterUrl) {
                    details.chapters.push({
                        name: chapterName,
                        url: chapterUrl.startsWith("http") ? chapterUrl : `${this.site}${chapterUrl}`,
                    });
                }
            });
        } catch (error) {
            console.error(`Error fetching novel details: ${error.message}`);
        }
        return details;
    },

    /**
     * Fetch the content of a specific chapter.
     */
    async fetchChapterContent(chapterUrl) {
        try {
            const response = await fetch(chapterUrl);
            const html = await response.text();
            const $ = require("cheerio").load(html);

            return $(".chapter-content").html() || "No content available.";
        } catch (error) {
            console.error(`Error fetching chapter content: ${error.message}`);
            return "Error loading chapter content.";
        }
    },
};

exports.default = plugin;
