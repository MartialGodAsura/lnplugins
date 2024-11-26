const t = require("cheerio");
const s = require("@libs/fetch");
const i = require("@libs/defaultCover");
const r = require("@libs/novelStatus");

class NHVNovelsPlugin {
    constructor({ id, sourceName, sourceSite, options }) {
        this.id = id;
        this.name = sourceName;
        this.icon = `multisrc/lightnovelwp/${id.toLowerCase()}/icon.png`;
        this.site = sourceSite;
        this.version = `1.0.${options?.versionIncrements || 0}`;
        this.options = options || {};
    }

    /**
     * Fetch data from a given URL safely.
     */
    async safeFetch(url) {
        try {
            const response = await s.fetchApi(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch (${response.status})`);
            }
            return await response.text();
        } catch (error) {
            console.error(`Error fetching URL: ${url}`, error.message);
            throw error;
        }
    }

    /**
     * Parse the novel list from HTML.
     */
    parseNovels(html) {
        const $ = t.load(html);
        const novels = [];

        $("div.novel-item").each((_, element) => {
            const title = $("h2.novel-title", element).text().trim();
            const cover = $("img", element).attr("src") || i.defaultCover;
            let link = $("a", element).attr("href");

            if (typeof link === "string" && link.length > 0) {
                link = link.startsWith("http") ? link : `${this.site}${link}`;
            } else {
                console.error("Novel link is undefined or empty.");
                link = "";
            }

            novels.push({
                name: title,
                cover: cover.startsWith("http") ? cover : `${this.site}${cover}`,
                url: link,
            });
        });

        return novels;
    }

    /**
     * Fetch the list of novels for a given page.
     */
    async fetchNovelList(page) {
        const url = `${this.site}/novels/?page=${page}`;
        try {
            const html = await this.safeFetch(url);
            return this.parseNovels(html);
        } catch (error) {
            console.error("Error fetching novel list:", error.message);
            return [];
        }
    }

    /**
     * Parse novel details and chapters from HTML.
     */
    parseNovelDetails(html) {
        const $ = t.load(html);
        const chapters = [];

        $("ul.chapter-list li").each((_, element) => {
            const name = $("a", element).text().trim();
            let link = $("a", element).attr("href");

            if (typeof link === "string" && link.length > 0) {
                link = link.startsWith("http") ? link : `${this.site}${link}`;
            } else {
                console.error("Chapter link is undefined or empty.");
                link = "";
            }

            chapters.push({
                name: name,
                url: link,
            });
        });

        return {
            name: $("h1.novel-title").text().trim(),
            cover: $("img.novel-cover").attr("src") || i.defaultCover,
            summary: $("div.novel-summary").text().trim(),
            chapters: chapters,
        };
    }

    /**
     * Fetch details of a specific novel.
     */
    async fetchNovelDetails(novelUrl) {
        try {
            const html = await this.safeFetch(novelUrl);
            return this.parseNovelDetails(html);
        } catch (error) {
            console.error(`Error fetching novel details: ${error.message}`);
            return null;
        }
    }

    /**
     * Fetch content of a specific chapter.
     */
    async fetchChapterContent(chapterUrl) {
        try {
            const html = await this.safeFetch(chapterUrl);
            const $ = t.load(html);
            return $("div.chapter-content").html();
        } catch (error) {
            console.error(`Error fetching chapter content: ${error.message}`);
            return "Error loading chapter content.";
        }
    }
}

// Plugin instantiation and export
const plugin = new NHVNovelsPlugin({
    id: "nhvnovels",
    sourceName: "NHV Novels",
    sourceSite: "https://nhvnovels.com/",
    options: {},
});

exports.default = plugin;
