import { fetchApi, fetchText } from '@libs/fetch';
import { Plugin } from '@typings/plugin';
import { Filters } from '@libs/filterInputs';
import { load as loadCheerio } from 'cheerio';
import { defaultCover } from '@libs/defaultCover';

class RaeiTranslationsPlugin implements Plugin.PluginBase {
  id = 'raeitranslations';
  name = 'RaeiTranslations';
  icon = 'https://raw.githubusercontent.com/MartialGodAsura/lnplugins/refs/heads/main/assests/raei-icon.jpg';
  site = 'https://raeitranslations.com';
  version = '1.0.0';
  filters: Filters | undefined = undefined;

  async popularNovels(pageNo: number): Promise<Plugin.NovelItem[]> {
    const novels: Plugin.NovelItem[] = [];
    const url = `${this.site}/novels?page=${pageNo}`;
    const result = await fetchText(url);
    const $ = loadCheerio(result);

    $('.novel-item').each((_, el) => {
      const name = $(el).find('.novel-title').text().trim();
      const path = $(el).find('a').attr('href');
      const cover = $(el).find('img').attr('src') || defaultCover;

      novels.push({
        name,
        path,
        cover: this.resolveUrl(cover, true),
      });
    });

    return novels;
  }

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    const url = this.resolveUrl(novelPath, true);
    const result = await fetchText(url);
    const $ = loadCheerio(result);

    const novel: Plugin.SourceNovel = {
      path: novelPath,
      name: $('h1.novel-title').text().trim(),
      cover: $('img.cover').attr('src') || defaultCover,
      author: $('.novel-author').text().trim(),
      genres: $('.novel-genres').text().trim(),
      summary: $('.novel-summary').text().trim(),
      status: $('.novel-status').text().includes('Ongoing')
        ? Plugin.NovelStatus.Ongoing
        : Plugin.NovelStatus.Completed,
      chapters: [],
    };

    $('.chapter-item').each((index, el) => {
      const name = $(el).find('.chapter-title').text().trim();
      const path = $(el).find('a').attr('href');
      const releaseTime = $(el).find('.release-time').text().trim();

      novel.chapters.push({
        name,
        path,
        releaseTime,
        chapterNumber: index + 1,
      });
    });

    return novel;
  }

  async parseChapter(chapterPath: string): Promise<string> {
    const url = this.resolveUrl(chapterPath, false);
    const result = await fetchText(url);
    const $ = loadCheerio(result);

    const chapterText = $('.chapter-content').html() || '';
    return chapterText;
  }

  async searchNovels(searchTerm: string, pageNo: number): Promise<Plugin.NovelItem[]> {
    const novels: Plugin.NovelItem[] = [];
    const url = `${this.site}/search?query=${encodeURIComponent(searchTerm)}&page=${pageNo}`;
    const result = await fetchText(url);
    const $ = loadCheerio(result);

    $('.novel-item').each((_, el) => {
      const name = $(el).find('.novel-title').text().trim();
      const path = $(el).find('a').attr('href');
      const cover = $(el).find('img').attr('src') || defaultCover;

      novels.push({
        name,
        path,
        cover: this.resolveUrl(cover, true),
      });
    });

    return novels;
  }

  resolveUrl = (path: string, isNovel?: boolean) =>
    path.startsWith('http')
      ? path
      : this.site + (isNovel ? '/novel/' : '/chapter/') + path;
}

export default new RaeiTranslationsPlugin();
