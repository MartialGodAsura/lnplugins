export default {
  id: 'testplugin',
  name: 'Test Plugin',
  version: '1.0.0',
  async popularNovels() {
    return [
      {
        name: 'Example Novel',
        cover: 'https://example.com/cover.jpg',
        path: '/example-novel',
      },
    ];
  },
};
