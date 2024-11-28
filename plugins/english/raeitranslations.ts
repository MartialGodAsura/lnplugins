import { fetchApi } from '../../libs/fetch';
import { PluginBase, NovelItem, SourceNovel, ChapterItem } from '../../types/plugin';
import { defaultCover } from '../../libs/defaultCover';
import { NovelStatus } from '../../libs/novelStatus';

class RaeiTranslations implements PluginBase {
  id = 'raeitranslations';
  name = 'Raei Translations';
  version = '1.0.0';
  icon = 'https://raeitranslations.com/favicon.ico';
  site = 'https://raeitranslations.com';
  filters = undefined;

  async popularNovels(pageNo: number): Promise<NovelItem[]> {
    const novels: NovelItem[] = [];
    const url = `${this.site}/novels?page=${pageNo}`;
    const body = await fetchApi(url).then((res) => res.text());
    const $ = loadCheerio(body);

    $('div.novel-item').each((_, el) => {
      const name = $(el).find('h2.novel-title').text().trim();
      const path = $(el).find('a').attr('href') || '';
      const cover = $(el).find('img').attr('src') || defaultCover;

      novels.push({
        name,
        path,
        cover: cover.startsWith('http') ? cover : `${this.site}${cover}`,
      });
    });

    return novels;
  }

  async parseNovel(novelPath: string): Promise<SourceNovel> {
    const url = `${this.site}${novelPath}`;
    const body = await fetchApi(url).then((res) => res.text());
    const $ = loadCheerio(body);

    const novel: SourceNovel = {
      name: $('h1.novel-title').text().trim(),
      path: novelPath,
      cover: $('div.novel-cover img').attr('src') || defaultCover,
      author: $('span.author').text().trim(),
      summary: $('div.novel-summary').text().trim(),
      genres: $('div.genres').text().replace(/\s+/g, ', '),
      status: $('span.status').text().includes('Ongoing') ? NovelStatus.Ongoing : NovelStatus.Completed,
      chapters: [],
    };

    $('ul.chapter-list li').each((i, el) => {
      const chapterName = $(el).find('a').text().trim();
      const chapterPath = $(el).find('a').attr('href') || '';
      const releaseTime = $(el).find('span.release-time').text().trim();

      novel.chapters.push({
        name: chapterName,
        path: chapterPath,
        releaseTime,
        chapterNumber: i + 1,
      });
    });

    return novel;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const url = `${this.site}${chapterPath}`;
    const body = await fetchApi(url).then((res) => res.text());
    const $ = loadCheerio(body);

    const chapterText = $('div.chapter-content').html() || '';
    return chapterText;
  }

  async searchNovels(searchTerm: string): Promise<NovelItem[]> {
    const novels: NovelItem[] = [];
    const url = `${this.site}/search?query=${encodeURIComponent(searchTerm)}`;
    const body = await fetchApi(url).then((res) => res.text());
    const $ = loadCheerio(body);

    $('div.novel-item').each((_, el) => {
      const name = $(el).find('h2.novel-title').text().trim();
      const path = $(el).find('a').attr('href') || '';
      const cover = $(el).find('img').attr('src') || defaultCover;

      novels.push({
        name,
        path,
        cover: cover.startsWith('http') ? cover : `${this.site}${cover}`,
      });
    });

    return novels;
  }

  resolveUrl(path: string, isNovel = false): string {
    return `${this.site}${isNovel ? '/novel/' : '/chapter/'}${path}`;
  }
}

export default new RaeiTranslations();
