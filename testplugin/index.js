export default {
  id: 'testplugin',
  name: 'Test Plugin',
  version: '1.0.0',
  async fetchNovelList() {
    return [
      {
        title: 'Test Novel',
        url: 'https://example.com/novel',
        cover: 'https://example.com/cover.jpg',
      },
    ];
  },
