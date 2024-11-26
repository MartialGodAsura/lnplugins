export default {
  id: 'testplugin',
  name: 'Test Plugin',
  version: '1.0.0',
  async popularNovels() {
    return [
      { name: 'Test Novel', cover: '', path: '/test-path' },
    ];
  },
};
