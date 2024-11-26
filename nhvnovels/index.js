var t = require("cheerio"),
    s = require("@libs/fetch"),
    i = require("@libs/defaultCover"),
    r = require("@libs/novelStatus");

var plugin = new (function () {
    function plugin(e) {
        var t, s;
        this.id = e.id;
        this.name = e.sourceName;
        this.icon = "multisrc/lightnovelwp/".concat(e.id.toLowerCase(), "/icon.png");
        this.site = e.sourceSite;
        var i = (null === (t = e.options) || void 0 === t ? void 0 : t.versionIncrements) || 0;
        this.version = "1.0.".concat(0 + i);
        this.options = null !== (s = e.options) && void 0 !== s ? s : {};
    }

    plugin.prototype.safeFetch = function (url) {
        return new Promise((resolve, reject) => {
            (0, s.fetchApi)(url)
                .then((response) => {
                    if (!response.ok) {
                        reject(new Error(`Failed to fetch (${response.status})`));
                    }
                    return response.text();
                })
                .then((data) => resolve(data))
                .catch((error) => reject(error));
        });
    };

    plugin.prototype.parseNovels = function (html) {
        var $ = t.load(html),
            novels = [];
        $("div.novel-item").each(function () {
            var title = $("h2.novel-title", this).text().trim();
            var cover = $("img", this).attr("src") || i.defaultCover;
            var link = $("a", this).attr("href");

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
    };

    plugin.prototype.fetchNovelList = function (page) {
        var url = `${this.site}/novels/?page=${page}`;
        return this.safeFetch(url)
            .then((html) => this.parseNovels(html))
            .catch((error) => {
                console.error("Error fetching novel list:", error.message);
                return [];
            });
    };

    plugin.prototype.parseNovelDetails = function (html) {
        var $ = t.load(html),
            chapters = [];
        $("ul.chapter-list li").each(function () {
            var name = $("a", this).text().trim();
            var link = $("a", this).attr("href");

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
    };

    plugin.prototype.fetchNovelDetails = function (novelUrl) {
        return this.safeFetch(novelUrl)
            .then((html) => this.parseNovelDetails(html))
            .catch((error) => {
                console.error(`Error fetching novel details: ${error.message}`);
                return null;
            });
    };

    plugin.prototype.fetchChapterContent = function (chapterUrl) {
        return this.safeFetch(chapterUrl)
            .then((html) => {
                var $ = t.load(html);
                return $("div.chapter-content").html();
            })
            .catch((error) => {
                console.error(`Error fetching chapter content: ${error.message}`);
                return "Error loading chapter content.";
            });
    };

    return plugin;
})({
    id: "nhvnovels",
    sourceSite: "https://nhvnovels.com/",
    sourceName: "NHV Novels",
    options: {},
});

exports.default = plugin;
