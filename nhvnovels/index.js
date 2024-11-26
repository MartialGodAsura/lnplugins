var e = this && this.__awaiter || function (e, a, t, l) {
    return new (t || (t = Promise))(function (s, r) {
        function i(e) {
            try { o(l.next(e)); } catch (e) { r(e); }
        }
        function n(e) {
            try { o(l.throw(e)); } catch (e) { r(e); }
        }
        function o(e) {
            var a;
            e.done ? s(e.value) : (a = e.value, a instanceof t ? a : new t(function (e) { e(a); })).then(i, n);
        }
        o((l = l.apply(e, a || [])).next());
    });
}, a = this && this.__generator || function (e, a) {
    var t, l, s, r, i = { label: 0, sent: function () { if (1 & s[0]) throw s[1]; return s[1]; }, trys: [], ops: [] };
    return r = { next: n(0), throw: n(1), return: n(2) }, "function" == typeof Symbol && (r[Symbol.iterator] = function () { return this; }), r;
    function n(n) { return function (o) { return function (n) { if (t) throw new TypeError("Generator is already executing.");
        for (; i && (i = 0, n[0] && (r = 0)), r;) try {
            if (t = 1, l && (s = 2 & n[0] ? l.return : n[0] ? l.throw || ((s = l.return) && s.call(l), 0) : l.next) && !(s = s.call(l, n[1])).done) return s;
            switch (l = 0, s && (n = [2 & n[0], s.value]), n[0]) {
                case 0: case 1: s = n; break;
                case 4: return i.label++, { value: n[1], done: !1 };
                case 5: i.label++, l = n[1], n = [0]; continue;
                case 7: n = i.ops.pop(), i.trys.pop(); continue;
                default: if (!(s = i.trys, (s = s.length > 0 && s[s.length - 1]) || 6 !== n[0] && 2 !== n[0])) { r = 0; continue; }
                    if (3 === n[0] && (!s || n[1] > s[0] && n[1] < s[3])) { i.label = n[1]; break; }
                    if (6 === n[0] && i.label < s[1]) { i.label = s[1], s = n; break; }
                    if (s && i.label < s[2]) { i.label = s[2], i.ops.push(n); break; }
                    s[2] && i.ops.pop(), i.trys.pop(); continue;
            } n = a.call(e, i);
        } catch (e) { n = [6, e], l = 0; } finally { t = s = 0; }
        if (5 & n[0]) throw n[1]; return { value: n[0] ? n[1] : void 0, done: !0 };
    }([n, o]); };
};

var plugin = new (function () {
    function plugin() {
        this.id = "nhvnovels";
        this.name = "NHV Novels";
        this.version = "1.0.0";
        this.site = "https://nhvnovels.com";
    }

    plugin.prototype.fetchNovelList = function () {
        return e(this, void 0, void 0, function () {
            return a(this, function (e) {
                return [2 /*return*/, [
                    {
                        name: "Test Novel",
                        cover: "https://example.com/cover.jpg",
                        url: "https://nhvnovels.com/novel/test-novel",
                    },
                ]];
            });
        });
    };

    plugin.prototype.fetchNovelDetails = function (novelUrl) {
        return e(this, void 0, void 0, function () {
            return a(this, function (e) {
                return [2 /*return*/, {
                    name: "Test Novel",
                    cover: "https://example.com/cover.jpg",
                    summary: "This is a test summary for NHV Novels.",
                    chapters: [
                        { name: "Chapter 1", url: "https://nhvnovels.com/novel/test-novel/ch1" },
                    ],
                }];
            });
        });
    };

    plugin.prototype.fetchChapterContent = function (chapterUrl) {
        return e(this, void 0, void 0, function () {
            return a(this, function (e) {
                return [2 /*return*/, "<p>This is the test chapter content.</p>"];
            });
        });
    };

    return plugin;
})();

exports.default = plugin;
