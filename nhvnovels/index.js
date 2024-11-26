var e = this && this.__awaiter || function (e, a, t, l) {
    return new (t || (t = Promise))(function (s, r) {
        function i(e) { try { o(l.next(e)); } catch (e) { r(e); } }
        function n(e) { try { o(l.throw(e)); } catch (e) { r(e); } }
        function o(e) { var a; e.done ? s(e.value) : (a = e.value, a instanceof t ? a : new t(function (e) { e(a); })).then(i, n); }
        o((l = l.apply(e, a || [])).next());
    });
};
var a = this && this.__generator || function (e, a) {
    var t, l, s, r, i = { label: 0, sent: function () { if (1 & s[0]) throw s[1]; return s[1]; }, trys: [], ops: [] };
    return r = { next: n(0), throw: n(1), return: n(2) }, "function" == typeof Symbol && (r[Symbol.iterator] = function () { return this; }), r;
    function n(n) {
        return function (o) { return function (n) {
            if (t) throw new TypeError("Generator is already executing.");
            for (; r && (r = 0, n[0] && (i = 0)), i;) try {
                if (t = 1, l && (s = 2 & n[0] ? l.return : n[0] ? l.throw || ((s = l.return) && s.call(l), 0) : l.next) && !(s = s.call(l, n[1])).done) return s;
                switch (l = 0, s && (n = [2 & n[0], s.value]), n[0]) {
                    case 0: case 1: s = n; break;
                    case 4: return i.label++, { value: n[1], done: !1 };
                    case 5: i.label++, l = n[1], n = [0]; continue;
                    case 7: n = i.ops.pop(), i.trys.pop(); continue;
                    default:
                        if (!(s = i.trys, (s = s.length > 0 && s[s.length - 1]) || 6 !== n[0] && 2 !== n[0])) {
                            i = 0; continue;
                        }
                        if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) {
                            i.label = n[1]; break;
                        }
                        if (6 === n[0] && i.label < s[1]) {
                            i.label = s[1], s = n; break;
                        }
                        if (s && i.label < s[2]) {
                            i.label = s[2], i.ops.push(n); break;
                        }
                        s[2] && i.ops.pop(), i.trys.pop(); continue;
                }
                n = a.call(e, i);
            } catch (e) { n = [6, e], l = 0; } finally { t = s = 0; }
            if (5 & n[0]) throw n[1];
            return { value: n[0] ? n[1] : void 0, done: !0 };
        }([n, o]);
    }
};
Object.defineProperty(exports, "__esModule", { value: !0 });
var t = require("cheerio"), l = require("htmlparser2"), s = require("@libs/fetch"), r = require("@libs/novelStatus"), i = require("@libs/defaultCover");

var nhvnovels = new (function () {
    function o() {
        this.id = "nhvnovels";
        this.name = "NHV Novels";
        this.icon = "multisrc/lightnovelwp/nhvnovels/icon.png";
        this.site = "https://nhvnovels.com/";
        this.version = "1.0.0";
        this.filters = {};
    }

    o.prototype.parseNovels = function (html) {
        var novels = [];
        var $ = t.load(html);
        $(".novel-item").each(function () {
            var name = $(".novel-title", this).text().trim();
            var cover = $(".novel-cover img", this).attr("src");
            var link = $(".novel-title a", this).attr("href");
            novels.push({ name: name, cover: cover, path: link });
        });
        return novels;
    };

    o.prototype.popularNovels = function (page, options) {
        return e(this, void 0, void 0, function () {
            var url, html;
            return a(this, function (a) {
                switch (a.label) {
                    case 0:
                        url = this.site + "popular?page=" + page;
                        return [4, (0, s.fetchApi)(url)];
                    case 1:
                        html = a.sent();
                        return [2, this.parseNovels(html)];
                }
            });
        });
    };

    o.prototype.parseNovel = function (path) {
        return e(this, void 0, void 0, function () {
            var url, html, $, name, cover, summary, chapters = [];
            return a(this, function (a) {
                switch (a.label) {
                    case 0:
                        url = this.site + path;
                        return [4, (0, s.fetchApi)(url)];
                    case 1:
                        html = a.sent();
                        $ = t.load(html);
                        name = $(".novel-title").text().trim();
                        cover = $(".novel-cover img").attr("src");
                        summary = $(".novel-summary").text().trim();
                        $(".chapter-item").each(function () {
                            var chapterName = $(".chapter-title", this).text().trim();
                            var chapterPath = $("a", this).attr("href");
                            chapters.push({ name: chapterName, path: chapterPath });
                        });
                        return [2, { name: name, cover: cover, summary: summary, chapters: chapters }];
                }
            });
        });
    };

    return o;
}());

exports.default = nhvnovels;
