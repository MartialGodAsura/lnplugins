const plugin = {
    id: "testplugin",
    name: "Test Plugin",
    version: "1.0.0",
    async fetchNovelList() {
        return [
            {
                name: "Dummy Novel",
                cover: "https://example.com/cover.jpg",
                url: "https://example.com/dummy-novel",
            },
        ];
    },
};

exports.default = plugin;
