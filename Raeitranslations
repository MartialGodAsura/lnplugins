var e = this && this.__awaiter || function (e, t, a, l) {
    return new (a || (a = Promise))(function (r, n) {
        function i(e) { try { s(l.next(e)); } catch (e) { n(e); } }
        function o(e) { try { s(l.throw(e)); } catch (e) { n(e); } }
        function s(e) { var t; e.done ? r(e.value) : (t = e.value, t instanceof a ? t : new a(function (e) { e(t); })).then(i, o); }
        s((l = l.apply(e, t || [])).next());
    });
}, t = this && this.__generator || function (e, t) {
    var a, l, r, n, i = { label: 0, sent: function () { if (1 & r[0]) throw r[1]; return r[1]; }, trys: [], ops: [] };
    return n = { next: o(0), throw: o(1), return: o(2) }, "function" == typeof Symbol && (n[Symbol.iterator] = function () { return this; }), n;
    function o(o) { return function (s) { return function (o) {
        if (a) throw new TypeError("Generator is already executing.");
        for (; i && (i = 0, o[0] && (r = 0)), i;) try {
            if (a = 1, l && (r = 2 & o[0] ? l.return : o[0] ? l.throw || ((r = l.return) && r.call(l), 0) : l.next) && !(r = r.call(l, o[1])).done) return r;
            switch (l = 0, r && (o = [2 & o[0], r.value]), o[0]) {
                case 0: case 1: r = o; break;
                case 4: return i.label++, { value: o[1], done: !1 };
                case 5: i.label++, l = o[1], o = [0]; continue;
                case 7: o = i.ops.pop(), i.trys.pop(); continue;
                default: if (!(r = i.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== o[0] && 2 !== o[0])) { i = 0; continue; }
                    if (3 === o[0] && (!r || o[1] > r[0] && o[1] < r[3])) { i.label = o[1]; break; }
                    if (6 === o[0] && i.label < r[1]) { i.label = r[1], r = o; break; }
                    if (r && i.label < r[2]) { i.label = r[2], i.ops.push(o); break; }
                    r[2] && i.ops.pop(), i.trys.pop(); continue;
            }
            o = t.call(e, i);
        } catch (e) { o = [6, e], l = 0; } finally { a = r = 0; }
        if (5 & o[0]) throw o[1]; return { value: o[0] ? o[1] : void 0, done: !0 };
    }([o, s]); };
}, a = this && this.__spreadArray || function (e, t, a) {
    if (a || 2 === arguments.length) for (var l, r = 0, n = t.length; r < n; r++) !l && r in t || (l || (l = Array.prototype.slice.call(t, 0, r)), l[r] = t[r]);
    return e.concat(l || Array.prototype.slice.call(t));
}, l = this && this.__importDefault || function (e) { return e && e.__esModule ? e : { default: e }; };
Object.defineProperty(exports, "__esModule", { value: !0 });
var r = require("@libs/fetch"), n = require("cheerio"), i = require("@libs/defaultCover"), o = require("@libs/novelStatus"), s = l(require("dayjs")), u = function (e, t) { return new RegExp(t.join("|")).test(e); }, c = new (function () {
    function l(e) {
        var t;
        this.parseData = function (e) {
            var t, a = (0, s.default)(), l = (null === (t = e.match(/\d+/)) || void 0 === t ? void 0 : t[0]) || "", r = parseInt(l, 10);
            if (!l) return e;
            if (u(e, ["second", "sec"])) a = a.subtract(r, "second");
            else if (u(e, ["minute", "min"])) a = a.subtract(r, "minute");
            else if (u(e, ["hour", "hr"])) a = a.subtract(r, "hours");
            else if (u(e, ["day"])) a = a.subtract(r, "days");
            else if (u(e, ["week"])) a = a.subtract(r, "week");
            else if (u(e, ["month"])) a = a.subtract(r, "month");
            else { if (!u(e, ["year"])) return "Invalid Date" !== (0, s.default)(e).format("LL") ? (0, s.default)(e).format("LL") : e; a = a.subtract(r, "year"); }
            return a.format("LL");
        };
        this.id = e.id;
        this.name = e.sourceName;
        this.icon = "multisrc/madara/".concat(e.id.toLowerCase(), "/icon.png");
        this.site = e.sourceSite;
        var a = (null === (t = e.options) || void 0 === t ? void 0 : t.versionIncrements) || 0;
        this.version = "1.0.".concat(5 + a);
        this.options = e.options;
        this.filters = e.filters;
    }
    return l.prototype.getCheerio = function (a, l) {
        return e(this, void 0, void 0, function () {
            var e, i, o, s;
            return t(this, function (t) {
                switch (t.label) {
                    case 0: return [4, (0, r.fetchApi)(a)];
                    case 1:
                        if (!(e = t.sent()).ok && 1 != l) throw new Error("Could not reach site (" + e.status + ") try to open in webview.");
                        return o = n.load, [4, e.text()];
                    case 2:
                        return i = o.apply(void 0, [t.sent()]), s = i("title").text().trim(), this.getHostname(a) != this.getHostname(e.url) || "Bot Verification" == s ? [2, null] : [2, i];
                }
            });
        });
    }, l;
}())({
    id: "raeitranslations",
    sourceSite: "https://raeitranslations.com/",
    sourceName: "Raei Translations",
    options: { useNewChapterEndpoint: true },
    filters: {}
});
exports.default = c;
