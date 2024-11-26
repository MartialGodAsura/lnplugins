const plugin = {
    id: "nhvnovels",
    name: "NHV Novels",
    version: "1.0.0",
    site: "https://nhvnovels.com",

    /**
     * Fetch the list of novels.
     */
    async fetchNovelList() {
        return [
            {
                name: "Test Novel",
                cover: "https://example.com/cover.jpg",
                url: "https://nhvnovels.com/novel/test-novel",
            },
        ];
    },

    /**
     * Fetch details of a specific novel.
     */
    async fetchNovelDetails(novelUrl) {
        return {
            name: "Test Novel",
            cover: "https://example.com/cover.jpg",
            summary: "This is a test novel for NHV Novels plugin.",
            chapters: [
                {
                    name: "Chapter 1",
                    url: "https://nhvnovels.com/novel/test-novel/ch1",
                },
                {
                    name: "Chapter 2",
                    url: "https://nhvnovels.com/novel/test-novel/ch2",
                },
            ],
        };
    },

    /**
     * Fetch the content of a specific chapter.
     */
    async fetchChapterContent(chapterUrl) {
        return "<p>This is the content of the chapter.</p>";
    },
};

exports.default = plugin;
