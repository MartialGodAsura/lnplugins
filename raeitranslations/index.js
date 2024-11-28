const plugin = {
    id: "raeitranslations",
    name: "RaeiTranslations",
    version: "1.0.0",
    icon: "https://raw.githubusercontent.com/MartialGodAsura/lnplugins/refs/heads/main/assests/raei-icon.jpg",
    site: "https://raeitranslations.com",
    filters: {
        search: {
            query: "",
        },
    },
    fetchNovels: async () => {
        const url = `${plugin.site}/novels`;
        const response = await fetch(url);
        const html = await response.text();

        // Parse novels list
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const novels = [];
        const novelElements = doc.querySelectorAll(".novel-list .novel-item");

        novelElements.forEach(novel => {
            novels.push({
                title: novel.querySelector(".novel-title").textContent.trim(),
                url: novel.querySelector("a").href,
                cover: novel.querySelector("img").src,
            });
        });

        return novels;
    },
    fetchChapters: async (novelUrl) => {
        const response = await fetch(novelUrl);
        const html = await response.text();

        // Parse chapters list
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const chapters = [];
        const chapterElements = doc.querySelectorAll(".chapter-list .chapter-item");

        chapterElements.forEach(chapter => {
            chapters.push({
                title: chapter.querySelector(".chapter-title").textContent.trim(),
                url: chapter.querySelector("a").href,
            });
        });

        return chapters;
    },
    fetchChapter: async (chapterUrl) => {
        const response = await fetch(chapterUrl);
        const html = await response.text();

        // Parse chapter content
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const content = doc.querySelector(".chapter-content").innerHTML;

        return { content };
    },
};

module.exports = plugin;
