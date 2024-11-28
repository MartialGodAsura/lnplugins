import { fetchApi } from '@libs/fetch';
import { Plugin } from '@typings/plugin';
import { Filters } from '@libs/filterInputs';
import { load as loadCheerio } from 'cheerio';
import { defaultCover } from '@libs/defaultCover';
import { NovelStatus } from '@libs/novelStatus';

class RaeiTranslations implements Plugin.PluginBase {
  id = 'raeitranslations';
  name = 'Raei Translations';
  icon = 'https://raeitranslations.com/favicon.ico';
  site = 'https://raeitranslations.com';
  version = '1.0.0';
  filters: Filters | undefined = undefined;

  async popularNovels(
    pageNo: number,
  ): Promise<Plugin.NovelItem[]> {
    const novels: Plugin.NovelItem[] = [];
    const url = `${this.site}/novels?page=${pageNo}`;
    const body = await fetchApi(url).then(res => res.text());
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

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const url = `${this.site}${novelPath}`;
    const body = await fetchApi(url).then(res => res.text());
    const $ = loadCheerio(body);

    const novel: Plugin.SourceNovel = {
      path: novelPath,
      name: $('h1.novel-title').text().trim(),
      cover: $('div.novel-cover img').attr('src') || defaultCover,
      author: $('span.author').text().trim(),
      summary: $('div.novel-summary').text().trim(),
      genres: $('div.genres').text().replace(/\s+/g, ', '),
      status: $('span.status').text().includes('Ongoing')
        ? NovelStatus.Ongoing
        : NovelStatus.Completed,
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
    const body = await fetchApi(url).then(res => res.text());
    const $ = loadCheerio(body);

    const chapterText = $('div.chapter-content').html() || '';
    return chapterText;
  }

  async searchNovels(searchTerm: string): Promise<Plugin.NovelItem[]> {
    const novels: Plugin.NovelItem[] = [];
    const url = `${this.site}/search?query=${encodeURIComponent(searchTerm)}`;
    const body = await fetchApi(url).then(res => res.text());
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

  resolveUrl = (path: string, isNovel?: boolean) =>
    this.site + (isNovel ? '/novel/' : '/chapter/') + path;
}

export default new RaeiTranslations();
