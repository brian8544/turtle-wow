var _____WB$wombat$assign$function_____ = function (name) {
    return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name];
};
if (!self.__WB_pmw) {
    self.__WB_pmw = function (obj) {
        this.__WB_source = obj;
        return this;
    }
}
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    if (!window.WH) {
        window.WH = {PageMeta: {}, staticUrl: "https://web.archive.org/web/20210506211249/https://wow.zamimg.com"}
    }
    WH.dataEnv = {MAIN: 1, PTR: 2, BETA: 3, CLASSIC: 4, TBC: 5};
    WH.dataEnvKey = {1: "live", 2: "ptr", 3: "beta", 4: "classic", 5: "tbc"};
    WH.dataEnvTerm = {1: "live", 2: "ptr", 3: "beta", 4: "classic", 5: "burningCrusade"};
    WH.dataTree = {RETAIL: 1, CLASSIC: 4, TBC: 5};
    WH.dataTreeTerm = {1: "retail", 4: "classic", 5: "burningCrusade"};
    WH.dataEnvToTree = {};
    WH.dataEnvToTree[WH.dataEnv.MAIN] = WH.dataTree.RETAIL;
    WH.dataEnvToTree[WH.dataEnv.PTR] = WH.dataTree.RETAIL;
    WH.dataEnvToTree[WH.dataEnv.BETA] = WH.dataTree.RETAIL;
    WH.dataEnvToTree[WH.dataEnv.CLASSIC] = WH.dataTree.CLASSIC;
    WH.dataEnvToTree[WH.dataEnv.TBC] = WH.dataTree.TBC;
    WH.dataTreeToRoot = {};
    WH.dataTreeToRoot[WH.dataTree.RETAIL] = WH.dataEnv.MAIN;
    WH.dataTreeToRoot[WH.dataTree.CLASSIC] = WH.dataEnv.CLASSIC;
    WH.dataTreeToRoot[WH.dataTree.TBC] = WH.dataEnv.TBC;
    WH.BETA_DOMAIN = "shadowlands";
    WH.Types = new function () {
        const h = this;
        this.NPC = 1;
        this.OBJECT = 2;
        this.ITEM = 3;
        this.ITEM_SET = 4;
        this.QUEST = 5;
        this.SPELL = 6;
        this.ZONE = 7;
        this.FACTION = 8;
        this.PET = 9;
        this.ACHIEVEMENT = 10;
        this.TITLE = 11;
        this.EVENT = 12;
        this.CLASS = 13;
        this.RACE = 14;
        this.SKILL = 15;
        this.CURRENCY = 17;
        this.PROJECT = 18;
        this.SOUND = 19;
        this.BUILDING = 20;
        this.FOLLOWER = 21;
        this.MISSION_ABILITY = 22;
        this.MISSION = 23;
        this.SHIP = 25;
        this.THREAT = 26;
        this.RESOURCE = 27;
        this.CHAMPION = 28;
        this.ICON = 29;
        this.ORDER_ADVANCEMENT = 30;
        this.FOLLOWER_A = 31;
        this.FOLLOWER_H = 32;
        this.SHIP_A = 33;
        this.SHIP_H = 34;
        this.CHAMPION_A = 35;
        this.CHAMPION_H = 36;
        this.TRANSMOG_ITEM = 37;
        this.BFA_CHAMPION = 38;
        this.BFA_CHAMPION_A = 39;
        this.AFFIX = 40;
        this.BFA_CHAMPION_H = 41;
        this.AZERITE_ESSENCE_POWER = 42;
        this.AZERITE_ESSENCE = 43;
        this.STORYLINE = 44;
        this.ADVENTURE_COMBATANT_ABILITY = 46;
        this.ENCOUNTER = 47;
        this.COVENANT = 48;
        this.SOULBIND = 49;
        this.PET_ABILITY = 200;
        this.SCREENSHOT = 91;
        this.GUIDE_IMAGE = 98;
        this.GUIDE = 100;
        this.TRANSMOG_SET = 101;
        this.OUTFIT = 110;
        this.GEAR_SET = 111;
        this.LISTVIEW = 158;
        this.SURVEY_COVENANTS = 161;
        this.NEWS_POST = 162;
        const e = [this.NPC, this.OBJECT, this.ITEM, this.ITEM_SET, this.QUEST, this.SPELL, this.ZONE, this.FACTION, this.PET, this.ACHIEVEMENT, this.TITLE, this.EVENT, this.CLASS, this.RACE, this.SKILL, this.CURRENCY, this.SOUND, this.BUILDING, this.FOLLOWER, this.MISSION_ABILITY, this.MISSION, this.SHIP, this.THREAT, this.RESOURCE, this.CHAMPION, this.ICON, this.ORDER_ADVANCEMENT, this.BFA_CHAMPION, this.AFFIX, this.AZERITE_ESSENCE_POWER, this.AZERITE_ESSENCE, this.STORYLINE, this.ADVENTURE_COMBATANT_ABILITY, this.PET_ABILITY];
        const a = function () {
            let types = {};
            types[WH.dataTree.RETAIL] = [h.ACHIEVEMENT, h.ADVENTURE_COMBATANT_ABILITY, h.AFFIX, h.AZERITE_ESSENCE, h.AZERITE_ESSENCE_POWER, h.BFA_CHAMPION, h.BUILDING, h.CHAMPION, h.CLASS, h.CURRENCY, h.EVENT, h.FACTION, h.FOLLOWER, h.GUIDE, h.GUIDE_IMAGE, h.ICON, h.ITEM, h.ITEM_SET, h.LISTVIEW, h.MISSION, h.MISSION_ABILITY, h.NPC, h.OBJECT, h.ORDER_ADVANCEMENT, h.OUTFIT, h.PET, h.PET_ABILITY, h.QUEST, h.RACE, h.RESOURCE, h.SCREENSHOT, h.SHIP, h.SKILL, h.SOUND, h.SPELL, h.STORYLINE, h.THREAT, h.TITLE, h.TRANSMOG_SET, h.ZONE];
            types[WH.dataTree.CLASSIC] = [h.CLASS, h.FACTION, h.GEAR_SET, h.GUIDE, h.GUIDE_IMAGE, h.ICON, h.ITEM, h.ITEM_SET, h.LISTVIEW, h.NPC, h.OBJECT, h.OUTFIT, h.PET, h.QUEST, h.RACE, h.RESOURCE, h.SCREENSHOT, h.SKILL, h.SOUND, h.SPELL, h.ZONE];
            types[WH.dataTree.TBC] = [h.CLASS, h.FACTION, h.GUIDE, h.GUIDE_IMAGE, h.ICON, h.ITEM, h.ITEM_SET, h.LISTVIEW, h.NPC, h.OBJECT, h.OUTFIT, h.PET, h.QUEST, h.RACE, h.RESOURCE, h.SCREENSHOT, h.SKILL, h.SOUND, h.SPELL, h.ZONE];
            return types
        }();
        const g = 0;
        const j = 1;
        const c = 2;
        const d = 3;
        const f = {typeNames: undefined};
        this.existsInDataEnv = function (k) {
            return a[WH.getDataTree()].includes(k)
        };
        this.getGameEntityTypes = function () {
            return e.slice()
        };
        this.getRequiredTrees = function (k) {
            let result = [];
            let wasMissing = false;
            for (let tree in a) {
                if (!a.hasOwnProperty(tree)) {
                    continue
                }
                if (a[tree].includes(k)) {
                    result.push(parseInt(tree))
                } else {
                    wasMissing = true
                }
            }
            return wasMissing ? result : null
        };
        this.hasName = function (k) {
            return f.typeNames.hasOwnProperty(k)
        };
        this.getLowerPlural = function (k) {
            return b(k)[d]
        };
        this.getLowerSingular = function (k) {
            return b(k)[j]
        };
        this.getUpperPlural = function (k) {
            return b(k)[c]
        };
        this.getUpperSingular = function (k) {
            return b(k)[g]
        };

        function b(k) {
            if (f.typeNames === undefined) {
                f.typeNames = WH.getPageData("WH.Types.names") || {}
            }
            return f.typeNames[k] || Array(4).fill(WH.term("unknownType_format", k), 0, 4)
        }
    };
    if (!String.prototype.ltrim) {
        String.prototype.ltrim = function () {
            return this.replace(/^\s*/, "")
        }
    }
    if (!String.prototype.rtrim) {
        String.prototype.rtrim = function () {
            return this.replace(/\s*$/, "")
        }
    }
    WH.error = function (a) {
        console.error.apply(console.error, Array.prototype.slice.call(arguments));
        if (!a) {
            console.error("The error message was empty, and thus will not be logged.");
            return
        }
        if (WH.Track) {
            WH.Track.nonInteractiveEvent.apply(WH.Track, ["Error"].concat(Array.prototype.slice.call(arguments)))
        }
    };
    WH.info = function (a) {
        console.info.apply(console.info, Array.prototype.slice.call(arguments))
    };
    WH.log = function (a) {
        console.log.apply(console.log, Array.prototype.slice.call(arguments))
    };
    WH.warn = function (a) {
        console.warn.apply(console.warn, Array.prototype.slice.call(arguments))
    };
    (function () {
        const a = {};
        WH.getPageData = function (b) {
            if (WH.wowheadRemote) {
                return undefined
            }
            if (a.hasOwnProperty(b)) {
                return a[b]
            }
            let script = document.querySelector(("script#data." + b).replace(/\./g, "\\."));
            if (script) {
                return JSON.parse(script.innerHTML)
            }
            return undefined
        };
        WH.setPageData = function (b, c) {
            if (a.hasOwnProperty(b)) {
                WH.warn("Duplicate data key", b)
            }
            a[b] = c
        }
    })();
    Object.assign(WH.PageMeta, WH.getPageData("pageMeta") || {});
    WH.PageMeta.serverTime = WH.PageMeta.serverTime ? new Date(WH.PageMeta.serverTime) : new Date();
    if (WH.PageMeta.staticUrl !== undefined) {
        WH.staticUrl = WH.PageMeta.staticUrl
    }
    WH.stringCompare = function (d, c) {
        if (d == c) {
            return 0
        }
        if (d == null) {
            return -1
        }
        if (c == null) {
            return 1
        }
        var f = parseFloat(d);
        var e = parseFloat(c);
        if (!isNaN(f) && !isNaN(e) && f != e) {
            return f < e ? -1 : 1
        }
        if (typeof d == "string" && typeof c == "string") {
            return d.localeCompare(c, undefined, {numeric: true})
        }
        return d < c ? -1 : 1
    };
    WH.trim = function (a) {
        return a.replace(/(^\s*|\s*$)/g, "")
    };
    WH.rtrim = function (b, c) {
        var a = b.length;
        while (--a > 0 && b.charAt(a) == c) {
        }
        b = b.substring(0, a + 1);
        if (b == c) {
            b = ""
        }
        return b
    };
    WH.sprintf = function (c) {
        if (typeof c !== "string") {
            WH.error("No format passed to WH.sprintf.", c);
            return ""
        }
        for (var b = 1, a = arguments.length; b < a; ++b) {
            c = c.replace("$" + b, arguments[b])
        }
        return c
    };
    WH.sprintfGlobal = function (c) {
        for (var b = 1, a = arguments.length; b < a; ++b) {
            c = c.replace(new RegExp("\\$" + b, "g"), arguments[b])
        }
        return c
    };
    WH.stringReplace = function (c, b, a) {
        while (c.indexOf(b) != -1) {
            c = c.replace(b, a)
        }
        return c
    };
    WH.term = function (a) {
        if (!WH.TERMS) {
            return a
        }
        let args = [WH.TERMS[a]].concat(Array.prototype.slice.call(arguments, 1));
        return WH.Strings.sprintf.apply(null, args)
    };
    WH.wowTerm = function (a) {
        if (!WH.GlobalStrings) {
            return a
        }
        let args = [WH.GlobalStrings[a]].concat(Array.prototype.slice.call(arguments, 1));
        return WH.Strings.sprintf.apply(null, args)
    };
    WH.htmlEntities = function (a) {
        return a.replace(/[\u00A0-\u9999<>\&]/gim, function (b) {
            return "&#" + b.charCodeAt(0) + ";"
        })
    };
    WH.stub = function (a) {
        let classNames = a.split(".");
        let currentClass = WH;
        for (let i = 0, className; className = classNames[i]; i++) {
            if (!currentClass[className]) {
                currentClass[className] = {}
            }
            currentClass = currentClass[className]
        }
    };
    WH.urlEncode = function (a) {
        a = encodeURIComponent(a);
        a = WH.stringReplace(a, "+", "%2B");
        return a
    };
    WH.urlEncodeHref = function (a) {
        a = encodeURIComponent(a);
        a = WH.stringReplace(a, "%20", "+");
        a = WH.stringReplace(a, "%3D", "=");
        return a
    };
    WH.numberFormat = function (b) {
        var c = ("" + parseFloat(b)).split(".");
        b = c[0];
        var a = c.length > 1 ? "." + c[1] : "";
        if (b.length <= 3) {
            return b + a
        }
        return WH.numberFormat(b.substr(0, b.length - 3)) + "," + b.substr(b.length - 3) + a
    };
    WH.numberLocaleFormat = function (d, b) {
        var c = "";
        if (typeof b == "number") {
            c = Locale.locales[b].name
        } else {
            if (typeof b == "string") {
                c = b
            } else {
                c = Locale.getName()
            }
        }
        if (c.length == 4) {
            c = c.substr(0, 2).toLowerCase() + "-" + c.substr(2).toUpperCase()
        }
        var a = "" + d;
        try {
            a = d.toLocaleString(c)
        } catch (f) {
            a = d.toLocaleString()
        }
        return a
    };
    WH.inArray = function (f, g, b, e) {
        if (f == null) {
            return -1
        }
        if (!Array.isArray(f)) {
            WH.error("Tried looking for a value in a haystack which is not an array.", arguments);
            return -1
        }
        var a;
        if (b) {
            a = f.length;
            for (var d = e || 0; d < a; ++d) {
                if (b(f[d]) == g) {
                    return d
                }
            }
            return -1
        }
        a = f.indexOf(g, e);
        if (a >= 0) {
            return a
        }
        a = f.length;
        for (var c = e || 0; c < a; ++c) {
            if (f[c] == g) {
                return c
            }
        }
        return -1
    };
    WH.isSet = function (a) {
        return typeof window[a] !== "undefined"
    };
    if (!WH.isSet("console")) {
        var console = {
            log: function () {
            }
        }
    }
    WH.arrayWalk = function (f, e, c) {
        for (var d = 0, b = f.length; d < b; ++d) {
            var a = e(f[d], c, f, d);
            if (a != null) {
                f[d] = a
            }
        }
    };
    WH.arrayApply = function (e, d, b) {
        for (var c = 0, a = e.length; c < a; ++c) {
            d(e[c], b, e, c)
        }
    };
    WH.arrayFilter = function (e, d) {
        var b = [];
        for (var c = 0, a = e.length; c < a; ++c) {
            if (d(e[c])) {
                b.push(e[c])
            }
        }
        return b
    };
    WH.arrayUnique = function (e) {
        var b = {};
        for (var c = e.length - 1; c >= 0; --c) {
            b[e[c]] = 1
        }
        var a = [];
        for (var d in b) {
            a.push(d)
        }
        return a
    };
    WH.closest = function (b, a) {
        while (b && b.nodeType === Node.ELEMENT_NODE) {
            if (b.matches(a)) {
                return b
            }
            b = b.parentNode
        }
        return undefined
    };
    WH.ge = function (a) {
        if (typeof a != "string") {
            return a
        }
        return document.getElementById(a)
    };
    WH.gE = function (b, a) {
        return b.getElementsByTagName(a)
    };
    WH.qs = function (a, b) {
        return (b || document).querySelector(a)
    };
    WH.qsa = function (a, b) {
        return (b || document).querySelectorAll(a)
    };
    WH.ce = function (a, b, c) {
    };
    WH.ce = (function (a) {
        return function (b, d, e) {
            var c = a(b);
            if (d) {
                WH.cOr(c, d)
            }
            if (e) {
                WH.ae(c, e)
            }
            if (c.tagName === "INPUT" && c.type === "range" && !WH.isRemote() && WH.DOM) {
                WH.DOM.styleRangeElement(c)
            }
            return c
        }
    })(typeof document.createElementOriginal === "function" ? document.createElementOriginal.bind(document) : document.createElement.bind(document));
    WH.de = function (b, a) {
        if (typeof b === "string") {
            b = (a || document).querySelector(b)
        }
        if (b && b.parentNode) {
            b.parentNode.removeChild(b)
        }
    };
    WH.ae = function (a, b) {
        if (Array.isArray(b)) {
            WH.arrayApply(b, a.appendChild.bind(a));
            return b
        } else {
            return a.appendChild(b)
        }
    };
    WH.aef = function (a, b) {
        return a.insertBefore(b, a.firstChild)
    };
    WH.ee = function (b, a) {
        if (!a) {
            a = 0
        }
        while (b.childNodes[a]) {
            b.removeChild(b.childNodes[a])
        }
    };
    WH.ct = function (a) {
        return document.createTextNode(a)
    };
    WH.st = function (a, b) {
        if (a.firstChild && a.firstChild.nodeType == 3) {
            a.firstChild.nodeValue = b
        } else {
            WH.aef(a, WH.ct(b))
        }
    };
    WH.noWrap = function (a) {
        a.style.whiteSpace = "nowrap"
    };
    WH.rf = function () {
        return false
    };
    WH.rfWithoutControlKey = function (a) {
        if (a.ctrlKey || a.shiftKey || a.altKey || a.metaKey) {
            return
        }
        return false
    };
    WH.aE = function (d, b, c, a) {
        if (!d) {
            return
        }
        if (typeof d === "string") {
            d = document.querySelectorAll(d)
        } else {
            if (d instanceof EventTarget) {
                d = [d]
            } else {
                if (Array.isArray(d) || (d instanceof NodeList)) {
                } else {
                    WH.warn("Unrecognized elements parameter", d);
                    d = [d]
                }
            }
        }
        for (let i = 0; i < d.length; i++) {
            d[i].addEventListener(b, c, a || false)
        }
    };
    WH.dE = function (d, b, c, a) {
        if (!d) {
            return
        }
        if (typeof d === "string") {
            d = document.querySelectorAll(d)
        } else {
            if (d instanceof EventTarget) {
                d = [d]
            } else {
                if (Array.isArray(d) || (d instanceof NodeList)) {
                } else {
                    WH.warn("Unrecognized elements parameter", d);
                    d = [d]
                }
            }
        }
        for (let i = 0; i < d.length; i++) {
            d[i].removeEventListener(b, c, a || false)
        }
    };
    WH.preventSelectStart = function (a) {
        a.dataset.preventSelectStart = "true"
    };
    WH.sp = function (a) {
        if (!a) {
            a = window.event
        }
        a.stopPropagation()
    };
    WH.setCookie = function (b, h, e, g, d, f) {
        var a = new Date();
        var c = b + "=" + encodeURI(e) + "; ";
        a.setDate(a.getDate() + h);
        c += "expires=" + a.toUTCString() + "; ";
        if (g) {
            c += "path=" + g + "; "
        }
        if (d) {
            c += "domain=" + d + "; "
        }
        if (f === true) {
            c += "secure;"
        }
        document.cookie = c;
        WH.getCookies(b);
        WH.getCookies.C[b] = e
    };
    WH.deleteCookie = function (a, d, b, c) {
        WH.setCookie(a, -1, "", d, b, c);
        WH.getCookies.C[a] = null
    };
    WH.getCookies = function (b) {
        if (WH.getCookies.I == null) {
            var e = decodeURI(document.cookie).split("; ");
            WH.getCookies.C = {};
            for (var c = 0, a = e.length; c < a; ++c) {
                var g = e[c].indexOf("="), f, d;
                if (g != -1) {
                    f = e[c].substr(0, g);
                    d = e[c].substr(g + 1)
                } else {
                    f = e[c];
                    d = ""
                }
                WH.getCookies.C[f] = d
            }
            WH.getCookies.I = 1
        }
        if (!b) {
            return WH.getCookies.C
        } else {
            return WH.getCookies.C[b]
        }
    };
    WH.dO = function (a) {
        return WH.cO({}, a)
    };
    WH.cO = function (c, b) {
        for (var a in b) {
            if (b[a] !== null && typeof b[a] == "object" && b[a].length) {
                c[a] = b[a].slice(0)
            } else {
                c[a] = b[a]
            }
        }
        return c
    };
    WH.cOr = function (d, c, b) {
        for (var a in c) {
            if (b && (a.substr(0, b.length) == b)) {
                continue
            }
            if (c[a] !== null && typeof c[a] == "object") {
                if (Array.isArray(c[a])) {
                    d[a] = c[a].slice(0)
                } else {
                    if (!d[a]) {
                        d[a] = {}
                    }
                    WH.cOr(d[a], c[a], b)
                }
            } else {
                d[a] = c[a]
            }
        }
        return d
    };
    WH.fround = function (b) {
        if (Math.fround) {
            return Math.fround(b)
        } else {
            if (typeof Float32Array != "undefined" && Float32Array) {
                var a = new Float32Array(1);
                a[0] = +b;
                return a[0]
            } else {
                return b
            }
        }
    };
    WH.displayBlock = function (b, a) {
        if (typeof b === "string") {
            b = (a || document).querySelector(b);
            if (!b) {
                return
            }
        }
        b.style.display = "block"
    };
    WH.displayDefault = function (b, a) {
        if (typeof b === "string") {
            b = (a || document).querySelector(b);
            if (!b) {
                return
            }
        }
        b.style.removeProperty("display")
    };
    WH.displayInline = function (b, a) {
        if (typeof b === "string") {
            b = (a || document).querySelector(b);
            if (!b) {
                return
            }
        }
        b.style.display = "inline"
    };
    WH.displayNone = function (b, a) {
        if (typeof b === "string") {
            b = (a || document).querySelector(b);
            if (!b) {
                return
            }
        }
        b.style.display = "none"
    };
    WH.setData = function (b, d, c, a) {
        let elements;
        if (typeof b === "string") {
            elements = (a || document).querySelectorAll(b)
        } else {
            if (b) {
                if (b.dataset) {
                    elements = [b]
                } else {
                    if (b.length) {
                        elements = b
                    } else {
                        WH.error("Element not supported by WH.setData().", d, c, b, a);
                        return
                    }
                }
            } else {
                WH.error("No element passed to WH.setData().", d, c, b, a);
                return
            }
        }
        if (c == null) {
            for (let i = 0, b; b = elements[i]; i++) {
                delete b.dataset[d]
            }
        } else {
            for (let i = 0, b; b = elements[i]; i++) {
                b.dataset[d] = c
            }
        }
    };
    WH.getWindowSize = function () {
        return {w: window.innerWidth, h: window.innerHeight}
    };
    WH.getScroll = function () {
        return {x: window.scrollX, y: window.scrollY}
    };
    WH.getCursorPos = function (a) {
        return {x: a.pageX, y: a.pageY}
    };
    WH.ac = function (b, a) {
        let x = 0;
        let y = 0;
        while (b) {
            let match;
            if (b.style.transform && (match = b.style.transform.match(/scale\(([\d.]+)\)/i))) {
                x *= parseFloat(match[1]);
                y *= parseFloat(match[1])
            }
            x += b.offsetLeft;
            y += b.offsetTop;
            let parent = b.parentNode;
            while (parent && parent !== b.offsetParent && parent.offsetParent) {
                if (parent.scrollLeft || parent.scrollTop) {
                    x -= (parent.scrollLeft | 0);
                    y -= (parent.scrollTop | 0);
                    break
                }
                parent = parent.parentNode
            }
            b = b.offsetParent
        }
        if (window.Lightbox && Lightbox.isVisible()) {
            a = true
        }
        if (a) {
            let scroll = WH.getScroll();
            x += scroll.x;
            y += scroll.y
        }
        let result = [x, y];
        result.x = x;
        result.y = y;
        return result
    };
    WH.getOffset = function (a, b) {
        let rect = a.getBoundingClientRect();
        let offset = {left: rect.left, top: rect.top};
        if (b !== true) {
            let scroll = WH.getScroll();
            offset.left += scroll.x;
            offset.top += scroll.y
        }
        return offset
    };
    WH.scrollTo = function (b, a) {
        a = a || {};
        if (typeof b === "string") {
            let selectedTarget = document.querySelector(b);
            if (!selectedTarget) {
                WH.error("Could not select element to scroll to.", b);
                return
            }
            b = selectedTarget
        }
        if (!b || b.nodeType !== Node.ELEMENT_NODE) {
            WH.error("Invalid target to scroll to.", b);
            return
        }
        if (a.asNeeded) {
            let rect = b.getBoundingClientRect();
            let offset = a.position === "center" ? 10 : 0;
            if (rect.top >= offset && rect.top + rect.height + offset < window.innerHeight && rect.left >= offset && rect.left + rect.width + offset < window.innerWidth) {
                return
            }
        }
        b.scrollIntoView({behavior: a.animated === false ? "auto" : "smooth", block: a.position || "start"})
    };
    WH.isElementFixedPosition = function (a) {
        while (a && a.nodeType === Node.ELEMENT_NODE) {
            if (getComputedStyle(a).getPropertyValue("position") === "fixed") {
                return true
            }
            a = a.parentNode
        }
        return false
    };
    WH.createReverseLookupJson = function (c) {
        var a = {};
        for (var b in c) {
            a[c[b]] = b
        }
        return a
    };
    WH.getLocaleFromDomain = function (a) {
        var c = WH.getLocaleFromDomain.L;
        if (a && (typeof a == "string")) {
            var b = a.split(".");
            return c[b[0]] || 0
        }
        return 0
    };
    WH.getLocaleFromDomain.L = {ko: 1, fr: 2, de: 3, cn: 4, es: 6, ru: 7, pt: 8, it: 9};
    WH.getDomainFromLocale = function (a) {
        var b;
        if (WH.getDomainFromLocale.L) {
            b = WH.getDomainFromLocale.L
        } else {
            b = WH.getDomainFromLocale.L = WH.createReverseLookupJson(WH.getLocaleFromDomain.L)
        }
        return (b[a] ? b[a] : "")
    };
    WH.getTypeIdFromTypeString = function (a) {
        if (!WH.getTypeIdFromTypeString.lookup[a]) {
            WH.error("No type ID found for type string [" + a + "].");
            return -1
        }
        return WH.getTypeIdFromTypeString.lookup[a]
    };
    WH.getTypeIdFromTypeString.lookup = {
        mount: -1000,
        recipe: -1001,
        "battle-pet": -1002,
        npc: 1,
        object: 2,
        item: 3,
        itemset: 4,
        "item-set": 4,
        quest: 5,
        spell: 6,
        zone: 7,
        faction: 8,
        pet: 9,
        achievement: 10,
        title: 11,
        event: 12,
        statistic: 16,
        currency: 17,
        building: 20,
        follower: 21,
        garrisonability: 22,
        missionability: 22,
        "mission-ability": 22,
        mission: 23,
        ship: 25,
        threat: 26,
        resource: 27,
        champion: 28,
        icon: 29,
        "order-advancement": 30,
        "bfa-champion": 38,
        affix: 40,
        "azerite-essence": 43,
        "azerite-essence-power": 42,
        storyline: WH.Types.STORYLINE,
        "adventure-combatant-ability": WH.Types.ADVENTURE_COMBATANT_ABILITY,
        guide: 100,
        "transmog-set": 101,
        outfit: 110,
        petability: 200,
        "pet-ability": 200
    };
    WH.fetch = (function () {
        let convertDictionaryToUrlEncoded = function (a) {
            let body = [];
            for (let key in a) {
                if (a.hasOwnProperty(key)) {
                    body.push(encodeURIComponent(key) + "=" + encodeURIComponent(a[key]))
                }
            }
            return body.join("&")
        };
        let getRequestContentType = function (a) {
            if (a.contentType) {
                return a.contentType
            }
            if (typeof a.form === "object") {
                return "application/x-www-form-urlencoded"
            }
            if (a.hasOwnProperty("json")) {
                return "application/json"
            }
            if (typeof a.body === "string") {
                return "application/octet-stream"
            }
            return undefined
        };
        if (typeof window.fetch !== "function") {
            let onXhrLoad = function (b, a, d) {
                let xhr = this;
                let data = xhr.responseText;
                let isJsonResponse = (xhr.getResponseHeader("content-type") || "").indexOf("application/json") === 0;
                let error = null;
                if (xhr.status < 200 || xhr.status > 399) {
                    error = "Legacy WH.fetch call got a bad response code."
                } else {
                    if (isJsonResponse) {
                        try {
                            data = JSON.parse(data)
                        } catch (c) {
                            data = undefined;
                            error = "Could not process Legacy WH.fetch JSON response. " + c.message
                        }
                    }
                }
                if (error) {
                    WH.error(error, b, xhr.status, xhr.responseText, xhr);
                    if (a.error) {
                        a.error(data, xhr.status)
                    }
                } else {
                    if (a.success) {
                        a.success(data, xhr.status)
                    }
                }
                if (a.complete) {
                    a.complete(data, xhr.status)
                }
            };
            let onXhrError = function (b, a, c) {
                let xhr = this;
                let message = "Legacy WH.fetch call could not complete.";
                let data = xhr.responseText || undefined;
                WH.error(message, b, xhr.status, xhr.responseText, xhr);
                if (a.error) {
                    a.error(data, xhr.status)
                }
                if (a.complete) {
                    a.complete(data, xhr.status)
                }
            };
            return function (b, a) {
                a = a || {};
                if (a.query) {
                    b += (b.indexOf("?") > -1 ? "&" : "?") + WH.Url.buildQuery(a.query)
                }
                let method = a.method || "GET";
                if (a.hasOwnProperty("data") || (typeof a.body === "string")) {
                    method = a.method || "POST"
                }
                let request = new XMLHttpRequest();
                WH.aE(request, "load", onXhrLoad.bind(request, b, a));
                WH.aE(request, "error", onXhrError.bind(request, b, a));
                request.overrideMimeType("text/plain");
                request.open(method, b, true);
                let contentType = getRequestContentType(a);
                if (contentType) {
                    request.setRequestHeader("Content-Type", contentType)
                }
                if (typeof a.form === "object") {
                    request.send(convertDictionaryToUrlEncoded(a.form))
                } else {
                    if (a.hasOwnProperty("json")) {
                        request.send(JSON.stringify(a.json))
                    } else {
                        if (typeof a.body === "string") {
                            request.send(a.body)
                        } else {
                            request.send()
                        }
                    }
                }
            }
        }
        let onFetchResponsePromise = function (c, b, a, d) {
            if (!a.ok) {
                WH.error("WH.fetch call got a bad response code.", c, a.status, d, a);
                if (b.error) {
                    b.error(d, a.status)
                }
            } else {
                if (b.success) {
                    b.success(d, a.status)
                }
            }
            if (b.complete) {
                b.complete(d, a.status)
            }
        };
        let onFetchResponsePromiseError = function (c, b, a, d) {
            let message = "Could not process WH.fetch response. " + d.message;
            WH.error(message, c, a.status, "", a);
            if (b.error) {
                b.error(undefined, a.status)
            }
            if (b.complete) {
                b.complete(undefined, a.status)
            }
        };
        let onFetch = function (c, b, a) {
            let jsonResponse = (a.headers.get("content-type") || "").indexOf("application/json") === 0;
            (jsonResponse ? a.json() : a.text()).then(onFetchResponsePromise.bind(null, c, b, a))["catch"](onFetchResponsePromiseError.bind(null, c, b, a))
        };
        let onFetchError = function (b, a, c) {
            let message = "WH.fetch call could not complete. " + c.message;
            WH.error(message, b, 0, "", c);
            if (a.error) {
                a.error(undefined, 0, c.message)
            }
            if (a.complete) {
                a.complete(undefined, 0, c.message)
            }
        };
        return function (b, a) {
            a = a || {};
            if (a.query) {
                b += (b.indexOf("?") > -1 ? "&" : "?") + WH.Url.buildQuery(a.query)
            }
            let useCookies = typeof a.cookies === "boolean" ? a.cookies : true;
            let fetchOptions = {
                credentials: useCookies ? "same-origin" : "omit",
                headers: new Headers(),
                method: a.method || "GET",
                mode: a.mode || "same-origin"
            };
            let contentType = getRequestContentType(a);
            if (contentType) {
                fetchOptions.headers.set("Content-Type", contentType)
            }
            if (typeof a.form === "object") {
                fetchOptions.method = a.method || "POST";
                fetchOptions.body = convertDictionaryToUrlEncoded(a.form)
            } else {
                if (a.hasOwnProperty("json")) {
                    fetchOptions.method = a.method || "POST";
                    fetchOptions.body = JSON.stringify(a.json)
                } else {
                    if (typeof a.body === "string") {
                        fetchOptions.method = a.method || "POST";
                        fetchOptions.body = a.body
                    }
                }
            }
            fetch(b, fetchOptions).then(onFetch.bind(null, b, a))["catch"](onFetchError.bind(null, b, a))
        }
    })();
    WH.ajaxIshRequest = function (c, e) {
        var d = document.getElementsByTagName("head")[0];
        if (c.substr(0, 5) === "http:" && location.protocol === "https:") {
            WH.error("Refused to AJAX-ish load URL.", c);
            return undefined
        }
        if (e) {
            var a = WH.ce("script", {type: "text/javascript", src: c});
            WH.ae(d, a);
            return a
        }
        var b = WH.getGets();
        if (b.refresh != null) {
            if (b.refresh.length) {
                c += ("&refresh=" + b.refresh)
            } else {
                c += "&refresh"
            }
        }
        if (b.locale != null) {
            c += "&locale=" + b.locale
        }
        if (b.ptr != null) {
            c += "&ptr"
        }
        var a = WH.ce("script", {type: "text/javascript", src: c, charset: "utf8"});
        WH.ae(d, a);
        return a
    };
    WH.xhrJsonRequest = function (a, c) {
        var b = new XMLHttpRequest();
        b.onload = function (d) {
            var f = d.target.response;
            switch (d.target.responseType) {
                case"json":
                    break;
                case"":
                case"text":
                    try {
                        f = JSON.parse(f)
                    } catch (g) {
                        WH.error("Could not parse expected JSON response", d.target);
                        return c()
                    }
                    break;
                default:
                    WH.error("Unexpected response type from JSON request", d.target);
                    return c()
            }
            return c(f)
        };
        b.onerror = function () {
            return c()
        };
        b.open("GET", a, true);
        b.responseType = "json";
        b.send()
    };
    WH.getGets = function () {
        if (WH.getGets.C != null) {
            return WH.getGets.C
        }
        var b = WH.getQueryString();
        var a = WH.parseQueryString(b);
        WH.getGets.C = a;
        return a
    };
    WH.visitUrlWithPostData = function (b, d) {
        var c = WH.ce("form");
        c.action = b;
        c.method = "post";
        for (var a in d) {
            if (d.hasOwnProperty(a)) {
                var e = WH.ce("input");
                e.type = "hidden";
                e.name = a;
                e.value = d[a];
                WH.ae(c, e)
            }
        }
        WH.ae(document.body, c);
        c.submit()
    };
    WH.getQueryString = function () {
        var a = "";
        if (location.pathname) {
            a += location.pathname.substr(1)
        }
        if (location.search) {
            if (location.pathname) {
                a += "&"
            }
            a += location.search.substr(1)
        }
        return a
    };
    WH.parseQueryString = function (e) {
        e = decodeURIComponent(e).replace(/^\?+/, "");
        var d = e.split("&");
        var c = {};
        for (var b = 0, a = d.length; b < a; ++b) {
            WH.splitQueryParam(d[b], c)
        }
        return c
    };
    WH.splitQueryParam = function (c, d) {
        if (c === "") {
            return
        }
        var e = c.indexOf("=");
        var a;
        var b;
        if (e != -1) {
            a = c.substr(0, e);
            b = c.substr(e + 1)
        } else {
            a = c;
            b = ""
        }
        d[a] = b
    };
    WH.createRect = function (d, c, b, a) {
        return {l: d, t: c, r: d + b, b: c + a}
    };
    WH.intersectRect = function (d, c) {
        return !(d.l >= c.r || c.l >= d.r || d.t >= c.b || c.t >= d.b)
    };
    WH.getViewport = function () {
        var a = $(window);
        return new Rectangle(a.scrollLeft(), a.scrollTop(), a.width(), a.height())
    };
    WH.keyPressIsAlphaNumeric = function (b) {
        var a = document.all ? b.keycode : b.which;
        return ((a > 47 && a < 58) || (a > 64 && a < 91) || (a > 95 && a < 112) || a == 222 || a == 0)
    };
    WH.isRemote = function () {
        return !WH.PageMeta.wowhead
    };
    WH.isDev = function () {
        return !!WH.PageMeta.dev
    };
    WH.getDataEnv = function () {
        return WH.PageMeta.hasOwnProperty("dataEnv") ? WH.PageMeta.dataEnv.env : WH.dataEnv.MAIN
    };
    WH.getDataEnvFromKey = function (a) {
        for (let dataEnv in WH.dataEnvKey) {
            if (WH.dataEnvKey[dataEnv] === a) {
                return parseInt(dataEnv)
            }
        }
        return undefined
    };
    WH.getDataEnvKey = function (a) {
        return WH.dataEnvKey[a || WH.getDataEnv()]
    };
    WH.getDataEnvTerm = function (a) {
        return WH.dataEnvTerm[a || WH.getDataEnv()]
    };
    WH.getDataTree = function (a) {
        if (a !== undefined) {
            return WH.dataEnvToTree[a]
        }
        return WH.PageMeta.hasOwnProperty("dataEnv") ? WH.PageMeta.dataEnv.tree : WH.dataTree.RETAIL
    };
    WH.getDataTreeKey = function (a) {
        return WH.getDataEnvKey(WH.dataTreeToRoot[a || WH.getDataTree()])
    };
    WH.getDataTreeTerm = function (a) {
        return WH.dataTreeTerm[a || WH.getDataTree()]
    };
    WH.getRootEnv = function (a) {
        return WH.dataTreeToRoot[WH.getDataTree(a || WH.getDataEnv())]
    };
    WH.getServerTime = function () {
        return WH.PageMeta.serverTime
    };
    WH.getDataBuild = function (a) {
        return (WH.PageMeta.dataBuild && WH.PageMeta.dataBuild[a || WH.getDataEnv()]) || "0"
    };
    WH.isBeta = function () {
        return WH.getDataEnv() === WH.dataEnv.BETA
    };
    WH.isBetaActive = function () {
        if (WH.PageMeta.hasOwnProperty("dataEnv")) {
            return WH.PageMeta.dataEnv.active.beta
        }
        return !!WH.wowheadRemote
    };
    WH.isClassicTree = function (a) {
        return WH.getDataTree(a) === WH.dataTree.CLASSIC
    };
    WH.isBurningCrusadeTree = function (a) {
        return WH.getDataTree(a) === WH.dataTree.TBC
    };
    WH.isPtr = function () {
        return WH.getDataEnv() === WH.dataEnv.PTR
    };
    WH.isPtrActive = function () {
        if (WH.PageMeta.hasOwnProperty("dataEnv")) {
            return WH.PageMeta.dataEnv.active.ptr
        }
        return !!WH.wowheadRemote
    };
    WH.isRetailTree = function (a) {
        return WH.getDataTree(a) === WH.dataTree.RETAIL
    };
    WH.suppressExternalDebug = function () {
        return !!WH.PageMeta.suppressExternalDebug
    };
    WH.setupFooterMenus = function () {
        var b = {
            "footer-help-menu": mn_footer_help,
            "footer-tools-menu": mn_footer_tools,
            "footer-about-menu": mn_footer_about
        };
        for (var c in b) {
            if (!b.hasOwnProperty(c)) {
                continue
            }
            var a = $("#" + c);
            if (a.length) {
                a.addClass("hassubmenu");
                Menu.add(a.get(0), b[c])
            }
        }
    };
    WH.getScreenshotUrl = function (f, c, b) {
        if (!c) {
            c = "normal"
        }
        b = b || {};
        var a = c == "normal" && typeof b.description == "string" && b.description ? "-" + WH.Strings.slug(b.description, true) : "";
        var d = {2: ".jpg", 3: ".png", 18: ".webp"};
        var e = d[b.imageType || 2] || d[2];
        return WH.staticUrl + "/uploads/screenshots/" + c + "/" + f + a + e
    };
    WH.maxLevel = WH.maxLevel || 60;
    WH.maxSkill = WH.maxSkill || 900;
    WH.convertRatingToPercent = function (a, c, j, g) {
        const b = WH.Wow.PlayerClass;
        const h = WH.Wow.Item.Stat;
        c = parseInt(c);
        var d = WH.convertRatingToPercent.RB, e = WH.convertRatingToPercent.LH, f = WH.convertRatingToPercent.LT;
        if (!d || d[c] == null) {
            return 0
        }
        if (a < 0) {
            a = 1
        } else {
            if (a > WH.maxLevel) {
                a = WH.maxLevel
            }
        }
        if ([h.ID_DEFENSE_SKILL_RATING, h.ID_DODGE_RATING, h.ID_PARRY_RATING, h.ID_BLOCK_RATING].includes(c) && a < 34) {
            a = 34
        }
        let modifiedRatingBase = d[c];
        if ([h.ID_HASTE_MELEE_RATING, h.ID_HASTE_RATING].includes(c) && [b.PALADIN, b.DEATH_KNIGHT, b.SHAMAN, b.DRUID].includes(g)) {
            modifiedRatingBase /= 1.3
        }
        if (j < 0) {
            j = 0
        }
        if (f && f[c] && (a >= 80) && (a - 80 < f[c].length)) {
            return j / f[c][a - 80]
        }
        let H;
        if (a > 80) {
            H = e[a]
        } else {
            if (a > 70) {
                H = (82 / 52) * Math.pow((131 / 63), ((a - 70) / 10))
            } else {
                if (a > 60) {
                    H = (82 / (262 - 3 * a))
                } else {
                    if (a > 10) {
                        H = ((a - 8) / 52)
                    } else {
                        H = 2 / 52
                    }
                }
            }
        }
        return j / modifiedRatingBase / H
    };
    WH.statToRating = {
        11: 0,
        12: 1,
        13: 2,
        14: 3,
        15: 4,
        16: 5,
        17: 6,
        18: 7,
        19: 8,
        20: 9,
        21: 10,
        25: 15,
        26: 15,
        27: 15,
        28: 17,
        29: 18,
        30: 19,
        31: 5,
        32: 8,
        34: 15,
        35: 15,
        36: 17,
        37: 23,
        44: 24,
        49: 25,
        57: 26,
        59: 11,
        60: 12,
        61: 13,
        62: 16,
        63: 20,
        64: 21,
        40: 29
    };
    WH.statToJson = {
        0: "mana",
        1: "health",
        3: "agi",
        4: "str",
        5: "int",
        6: "spi",
        7: "sta",
        8: "energy",
        9: "rage",
        10: "focus",
        13: "dodgertng",
        14: "parryrtng",
        15: "blockrtng",
        16: "mlehitrtng",
        17: "rgdhitrtng",
        18: "splhitrtng",
        19: "mlecritstrkrtng",
        20: "rgdcritstrkrtng",
        21: "splcritstrkrtng",
        22: "corruption",
        23: "corruptionres",
        24: "_splhitrtng",
        25: "_mlecritstrkrtng",
        26: "_rgdcritstrkrtng",
        27: "_splcritstrkrtng",
        28: "mlehastertng",
        29: "rgdhastertng",
        30: "splhastertng",
        31: "hitrtng",
        32: "critstrkrtng",
        33: "_hitrtng",
        34: "_critstrkrtng",
        35: "resirtng",
        36: "hastertng",
        37: "exprtng",
        38: "atkpwr",
        39: "rgdatkpwr",
        40: "versatility",
        41: "splheal",
        42: "spldmg",
        43: "manargn",
        44: "armorpenrtng",
        45: "splpwr",
        46: "healthrgn",
        47: "splpen",
        49: "mastrtng",
        50: "armorbonus",
        51: "firres",
        52: "frores",
        53: "holres",
        54: "shares",
        55: "natres",
        56: "arcres",
        57: "pvppower",
        58: "amplify",
        59: "multistrike",
        60: "readiness",
        61: "speedbonus",
        62: "lifesteal",
        63: "avoidance",
        64: "sturdiness",
        66: "cleave",
        71: "agistrint",
        72: "agistr",
        73: "agiint",
        74: "strint"
    };
    WH.jsonToStat = {};
    for (var i in WH.statToJson) {
        WH.jsonToStat[WH.statToJson[i]] = i
    }
    WH.individualToGlobalStat = {
        16: 31,
        17: 31,
        18: 31,
        19: 32,
        20: 32,
        21: 32,
        24: 33,
        25: 34,
        26: 34,
        27: 34,
        28: 36,
        29: 36,
        30: 36
    };
    WH.convertScalingFactor = function (b, g, f, d, j) {
        var a = WH.convertScalingFactor.SV;
        var c = WH.convertScalingFactor.SD;
        if (!a || !a[b]) {
            if (g_user.roles & U_GROUP_ADMIN) {
                alert("There are no item scaling values for level " + b)
            }
            return (j ? {} : 0)
        }
        var k = {}, h = a[b], e = c[f];
        if (!e || !(d >= 0 && d <= 9)) {
            k.v = h[g]
        } else {
            k.n = WH.statToJson[e[d]];
            k.s = e[d];
            k.v = Math.floor(h[g] * e[d + 10] / 10000)
        }
        return (j ? k : k.v)
    };
    g_itemScalingCallbacks = [];
    WH.effectAverage = function (f, j, e, a) {
        var c = WH.convertScalingSpell.RandPropPoints;
        var h = f.scalingClass;
        var d = f.coefficient[a];
        var g = 1;
        var b = 0;
        if (d != 0 && h != 0) {
            if (f.scalesWithItemLevel) {
                if (h == 19) {
                    b = c[e][0]
                } else {
                    if (h == 21) {
                        b = c[e][2]
                    } else {
                        b = c[e][1]
                    }
                }
            } else {
                b = WH.convertScalingSpell.SV[j][h - 1]
            }
            if (h == 255) {
                g = WH.getCombatRatingMult(e, 12)
            }
            return d * b * g
        }
        return f.effectBasePoints[a]
    };
    WH.convertScalingSpell = function (p, d, a, e, q, k) {
        var f = WH.convertScalingSpell.SpellInformation;
        if (!f || !f[d]) {
            return p
        }
        a = a - 1;
        if (p.effects == undefined) {
            p.effects = {}
        }
        if (!p.effects.hasOwnProperty(a + 1)) {
            p.effects[a + 1] = {}
        }
        var m = f[d];
        var o = 0;
        var c = WH.effectAverage(m, q, k, a);
        if (m.deltaCoefficient[a] != 0) {
            var j = m.deltaCoefficient[a];
            var b = Math.ceil(c - (c * j / 2));
            var n = Math.floor(c + (c * j / 2));
            if (e == 0) {
                o = (b + n) / 2
            } else {
                if (e == 1) {
                    o = b
                } else {
                    if (e == 2) {
                        o = n
                    }
                }
            }
        } else {
            if (m.coefficient[a] != 0) {
                o = c
            } else {
                o = m.effectBasePoints[a]
            }
        }
        o = Math.abs(o);
        var g = "avg";
        switch (parseInt(e)) {
            case 0:
            case 3:
                g = "avg";
                break;
            case 1:
                g = "min";
                break;
            case 2:
                g = "max";
                break;
            case 4:
                g = "pts";
                break;
            default:
                g = "avg"
        }
        var l = 5;
        var h = l;
        if (window.g_pageInfo && window.g_pageInfo.type == WH.Types.AZERITE_ESSENCE_POWER) {
            h = WH.Wow.Item.INVENTORY_TYPE_NECK
        }
        if (m.scalesWithItemLevel && m.appliesRatingAura && m.appliesRatingAura[a]) {
            o *= WH.getCombatRatingMult(k, h)
        }
        p.effects[a + 1][g] = o;
        return p
    };
    WH.getDataSource = function () {
        if (WH.isSet("g_pageInfo")) {
            switch (g_pageInfo.type) {
                case WH.Types.ITEM:
                    if (WH.isSet("g_items")) {
                        return g_items
                    }
                    break;
                case WH.Types.SPELL:
                    if (WH.isSet("g_spells")) {
                        return g_spells
                    }
                    break;
                case WH.Types.AZERITE_ESSENCE_POWER:
                    if (WH.isSet("g_azeriteEssencePowers")) {
                        return g_azeriteEssencePowers
                    }
                    break;
                case WH.Types.PET_ABILITY:
                    if (WH.isSet("g_petabilities")) {
                        return g_petabilities
                    }
                    break
            }
        }
        return []
    };
    WH.setJsonItemLevel = function (s, b, h) {
        if (h && ((h.scalingcategory - 11) > 0)) {
            var u = h.maxlvlscaling ? Math.min(b, h.maxlvlscaling) : b;
            var g = WH.getSpellScalingValue(h.scalingcategory, u);
            for (var q = 1; q < 3; ++q) {
                var a = h["itemenchspell" + q];
                var l = h["itemenchtype" + q];
                var m = WH.statToJson[a];
                if ((l == 5) && s[m]) {
                    var j = h["damage" + q];
                    if (j) {
                        s[m] = Math.round(g * j)
                    }
                }
            }
            if (h.allstats) {
                for (var t in s) {
                    s[t] = Math.round(g * h.damage1)
                }
            }
        }
        if (!s.scadist || !s.scaflags) {
            return
        }
        s.bonuses = s.bonuses || {};
        var k = s.scaflags & 255, d = (s.scaflags >> 8) & 255, n = (s.scaflags & (1 << 16)) != 0,
            f = (s.scaflags & (1 << 17)) != 0, o = (s.scaflags & (1 << 18)) != 0, p;
        switch (k) {
            case 5:
            case 1:
            case 7:
            case 17:
                p = 7;
                break;
            case 3:
            case 12:
                p = 8;
                break;
            case 16:
            case 11:
            case 14:
                p = 9;
                break;
            case 15:
                p = 10;
                break;
            case 23:
            case 21:
            case 22:
            case 13:
                p = 11;
                break;
            default:
                p = -1
        }
        if (p >= 0) {
            for (var q = 0; q < 10; ++q) {
                var e = WH.convertScalingFactor(b, p, s.scadist, q, 1);
                if (e.n) {
                    s[e.n] = e.v
                }
                s.bonuses[e.s] = e.v
            }
        }
        if (o) {
            s.splpwr = s.bonuses[45] = WH.convertScalingFactor(b, 6)
        }
        if (n) {
            switch (k) {
                case 3:
                    s.armor = WH.convertScalingFactor(b, 11 + d);
                    break;
                case 5:
                    s.armor = WH.convertScalingFactor(b, 15 + d);
                    break;
                case 1:
                    s.armor = WH.convertScalingFactor(b, 19 + d);
                    break;
                case 7:
                    s.armor = WH.convertScalingFactor(b, 23 + d);
                    break;
                case 16:
                    s.armor = WH.convertScalingFactor(b, 28);
                    break;
                case 14:
                    s.armor = WH.convertScalingFactor(b, 29);
                    break;
                default:
                    s.armor = 0
            }
        }
        if (f) {
            var c = (s.mledps ? "mle" : "rgd"), r;
            switch (k) {
                case 23:
                case 21:
                case 22:
                case 13:
                    s.dps = s[c + "dps"] = WH.convertScalingFactor(b, o ? 2 : 0);
                    r = 0.3;
                    break;
                case 17:
                    s.dps = s[c + "dps"] = WH.convertScalingFactor(b, o ? 3 : 1);
                    r = 0.2;
                    break;
                case 15:
                    s.dps = s[c + "dps"] = WH.convertScalingFactor(b, d == 19 ? 5 : 4);
                    r = 0.3;
                    break;
                default:
                    s.dps = s[c + "dps"] = 0;
                    r = 0
            }
            s.dmgmin = s[c + "dmgmin"] = Math.floor(s.dps * s.speed * (1 - r));
            s.dmgmax = s[c + "dmgmax"] = Math.floor(s.dps * s.speed * (1 + r))
        }
    };
    WH.scaleItemEnchantment = function (h, b) {
        var f = h.enchantment;
        if (h.scalinginfo && (h.scalinginfo.scalingcategory - 11) > 0) {
            var e = f.match(/\d+/g);
            if (e) {
                var g = parseInt(h.scalinginfo.maxlvlscaling) ? Math.min(b, parseInt(h.scalinginfo.maxlvlscaling)) : b;
                var a = WH.getSpellScalingValue(h.scalinginfo.scalingcategory, g);
                for (var c = 0; c < e.length; ++c) {
                    var d = h.scalinginfo["damage" + (c + 1)];
                    if (d) {
                        f = f.replace(e[c], Math.round(a * d))
                    }
                }
            }
        }
        return f
    };
    WH.getItemRandPropPointsType = function (a) {
        var b = a.slotbak ? a.slotbak : a.slot;
        switch (b) {
            case 1:
            case 4:
            case 5:
            case 7:
            case 15:
            case 17:
            case 20:
            case 25:
                return 0;
            case 2:
            case 9:
            case 11:
            case 16:
                return 2;
            case 3:
            case 6:
            case 8:
            case 10:
            case 12:
                return 1;
            case 13:
            case 14:
            case 21:
            case 22:
            case 23:
                return 3;
            case 26:
                if (a.subclass == 19) {
                    return 3
                }
                return 0;
            case 28:
                return 4;
                break;
            default:
                return -1
        }
    };
    WH.scaleItemLevel = function (b, a) {
        let retItemLevel = b.level;
        let curvePointsDB = WH.curvePoints;
        if (!curvePointsDB) {
            return retItemLevel
        }
        let curveId = null;
        let minLevel = null;
        let maxLevel = null;
        if (b.scadist) {
            let scalingDistributions = WH.convertScalingFactor.SD;
            let scalingDistribution = scalingDistributions ? scalingDistributions[b.scadist] : null;
            if (scalingDistribution && scalingDistribution[22] && scalingDistribution[22] > 0) {
                minLevel = scalingDistribution[20];
                maxLevel = scalingDistribution[21];
                curveId = scalingDistribution[22]
            }
        } else {
            if (b.contenttuning) {
                let contentTuning = WH.contentTuningLevels[b.contenttuning];
                if (contentTuning) {
                    minLevel = contentTuning[0];
                    maxLevel = contentTuning[1]
                }
            }
            curveId = b.playercurve
        }
        if (curveId) {
            let playerLevel = a ? a : WH.maxLevel;
            if (minLevel && playerLevel < minLevel) {
                playerLevel = minLevel
            }
            if (maxLevel && playerLevel > maxLevel) {
                playerLevel = maxLevel
            }
            let curvePoints = curvePointsDB[curveId];
            if (curvePoints && curvePoints.length > 0) {
                let indexHi = -1;
                for (let index in curvePoints) {
                    let point = curvePoints[index];
                    if (point[1] >= playerLevel) {
                        indexHi = index;
                        break
                    }
                }
                let pointHi = curvePoints[indexHi != -1 ? indexHi : (curvePoints.length - 1)];
                let pointLo = null;
                let y = 0;
                if (indexHi > 0) {
                    pointLo = curvePoints[indexHi - 1];
                    let xDiff = pointHi[1] - pointLo[1];
                    if (xDiff > 0) {
                        let lvlDiff = playerLevel - pointLo[1];
                        let div = lvlDiff / xDiff;
                        let yDiff = pointHi[2] - pointLo[2];
                        let yOffset = div * yDiff;
                        y = pointLo[2] + yOffset
                    }
                } else {
                    y = pointHi[2]
                }
                if (y > 0) {
                    retItemLevel = Math.round(y)
                }
            }
        }
        return retItemLevel
    };
    WH.applyStatModifications = function (ac, p, Q, v, af, h, F, o) {
        var a = {};
        if (ac.hasOwnProperty("level")) {
            a = WH.dO(ac)
        } else {
            WH.cOr(a, ac, "__")
        }
        if (af && af.length) {
            var D = false;
            for (var Y = 0; Y < af.length; ++Y) {
                var q = af[Y];
                if (q > 0 && WH.isSet("g_itembonuses") && g_itembonuses[q]) {
                    var G = g_itembonuses[q];
                    for (var X = 0; X < G.length; ++X) {
                        var w = G[X];
                        switch (w[0]) {
                            case 11:
                            case 13:
                                if (D === false || w[2] < D) {
                                    a.scadist = w[1];
                                    a.scadistbonus = q;
                                    a.scadistbonustype = w[0];
                                    a.contenttuning = w[3];
                                    a.playercurve = w[4];
                                    D = w[2]
                                }
                                break;
                            default:
                                break
                        }
                    }
                }
            }
        }
        a.level = WH.scaleItemLevel(a, h);
        if (Q == "pvp" && ac.pvpUpgrade) {
            a.level += ac.pvpUpgrade
        }
        if (a.subitems && a.subitems[p]) {
            for (var ag in a.subitems[p].jsonequip) {
                if (!a.hasOwnProperty(ag)) {
                    a[ag] = 0
                }
                a[ag] += a.subitems[p].jsonequip[ag]
            }
        }
        if (af && af.length) {
            if (ac.statsInfo) {
                a.statsInfo = {};
                for (var Y in ac.statsInfo) {
                    a.statsInfo[Y] = {
                        alloc: parseInt(ac.statsInfo[Y].alloc),
                        qty: ac.statsInfo[Y].qty,
                        socketMult: ac.statsInfo[Y].socketMult
                    }
                }
            }
            var C = [0, 0, 0, 0, 2147483647, 2147483647, 2147483647, 2147483647];
            a.extraStats = [];
            var k = a.scadistbonus ? false : 0;
            let craftingStats = [24, 25];
            let craftingIndex = 0;
            for (var Y = 0; Y < af.length; ++Y) {
                var q = af[Y];
                if (q > 0 && WH.isSet("g_itembonuses") && g_itembonuses[q]) {
                    var G = g_itembonuses[q];
                    for (var X = 0; X < G.length; ++X) {
                        var w = G[X];
                        if (w[0] == 25) {
                            w[0] = 2;
                            let stat = a.statsInfo[craftingStats[craftingIndex]];
                            if (stat && stat.alloc) {
                                w[2] = stat.alloc
                            } else {
                                w[2] = 0
                            }
                            craftingIndex = Math.min(craftingIndex + 1, craftingStats.length - 1)
                        }
                        switch (w[0]) {
                            case 1:
                                if (!a.scadistbonus) {
                                    a.level += w[1];
                                    k = false
                                }
                                break;
                            case 2:
                                if (a.statsInfo) {
                                    if (a.statsInfo.hasOwnProperty(w[1])) {
                                        a.statsInfo[w[1]].alloc += w[2]
                                    } else {
                                        a.extraStats.push(w[1]);
                                        a.statsInfo[w[1]] = {alloc: parseInt(w[2]), qty: 0, socketMult: 0}
                                    }
                                }
                                break;
                            case 3:
                                a.quality = parseInt(w[1]);
                                break;
                            case 4:
                                var e = w[1];
                                var b = w[2];
                                var U = 4;
                                var T = 4;
                                do {
                                    if (b <= C[U]) {
                                        var u = e;
                                        e = C[U - 4];
                                        C[U - 4] = u;
                                        var S = b;
                                        b = C[U];
                                        C[U] = S
                                    }
                                    ++U;
                                    --T
                                } while (T);
                                break;
                            case 5:
                                a.nameSuffix = WH.Wow.Item.getNameDescription(w[1]) || a.nameSuffix;
                                break;
                            case 6:
                                var M = a.nsockets ? a.nsockets : 0;
                                a.nsockets = M + w[1];
                                for (var V = M; V < (M + w[1]); ++V) {
                                    a["socket" + (V + 1)] = w[2]
                                }
                                break;
                            case 7:
                                break;
                            case 8:
                                a.reqlevel += w[1];
                                break;
                            case 14:
                                if (k !== false) {
                                    k = a.level
                                }
                                break;
                            case 16:
                                a.bond = parseInt(w[1]);
                                break;
                            default:
                                break
                        }
                    }
                }
            }
            if (k) {
                a.level = k;
                a.previewLevel = k
            }
            a.namedesc = a.namedesc ? a.namedesc : "";
            for (var X = 0; X < 4; ++X) {
                let thisNameDesc = WH.Wow.Item.getNameDescription(C[X]);
                if (thisNameDesc) {
                    a.namedesc += (!a.namedesc ? "" : " ") + thisNameDesc;
                    if (!X) {
                        a.namedesccolor = WH.Wow.Item.getNameDescriptionColor(C[X])
                    }
                }
            }
        }
        (function () {
            if (!o || !o.length || !a.statsInfo) {
                return
            }
            for (let fromStat, fromIndex = 0; fromStat = WH.Wow.Item.Stat.CRAFTING_STAT_FROM[fromIndex]; fromIndex++) {
                let toStat = o[fromIndex];
                if (!toStat) {
                    continue
                }
                if (!a.statsInfo[fromStat]) {
                    continue
                }
                if (a.statsInfo[toStat]) {
                    a.statsInfo[toStat].alloc += ac.statsInfo[fromStat].alloc
                } else {
                    a.statsInfo[toStat] = a.statsInfo[fromStat];
                    a.extraStats.push(toStat)
                }
                delete a.statsInfo[fromStat]
            }
        })();
        if (ac.statsInfo && ac.level && WH.applyStatModifications.ScalingData) {
            var aa = WH.applyStatModifications.ScalingData.AV, m = WH.applyStatModifications.ScalingData.SV,
                B = WH.applyStatModifications.ScalingData.AL;
            a.level = v ? v : (Q && ac.upgrades && ac.upgrades[Q - 1] ? (a.level + ac.upgrades[Q - 1]) : a.level);
            var t = a.level - ac.level;
            var P = Math.pow(1.15, t / 15);
            var K = WH.getItemRandPropPointsType(a);
            var R = [];
            for (var Z = a.level; Z >= 0; Z--) {
                if (m.hasOwnProperty(Z)) {
                    R = m[Z];
                    break
                }
            }
            var s = 0;
            if (K != -1) {
                var O = 0;
                switch (a.quality) {
                    case 5:
                    case 4:
                        O = 0;
                        break;
                    case 7:
                    case 3:
                        O = 1;
                        break;
                    case 2:
                        O = 2;
                        break;
                    default:
                        break
                }
                var r = O * 5 + K;
                s = R[r] ? R[r] : 0
            }
            var N = R[15];
            for (var Y in WH.statToJson) {
                var g = WH.statToJson[Y];
                if (a[g] || (a.statsInfo && a.statsInfo[Y])) {
                    var l = 0;
                    var ae = 0;
                    if (a.statsInfo.hasOwnProperty(Y)) {
                        l = parseFloat(a.statsInfo[Y].socketMult);
                        ae = parseInt(a.statsInfo[Y].alloc)
                    }
                    var A = Math.round(l * N);
                    if (ae && (s > 0 || a.contenttuning > 0)) {
                        a[g] = ae * 0.0001 * s - A
                    } else {
                        a[g] = ((a[g] + A) * P) - A
                    }
                    if (g == "sta") {
                        a[g] = a[g] * WH.getStaminaRatingMult(a.level, a.slot || g_items[a.id].slot)
                    } else {
                        if (F && WH.inArray(WH.applyStatModifications.BASE_STATS, Y) < 0) {
                            a[g] = a[g] * WH.getCombatRatingMult(a.level, a.slot || g_items[a.id].slot)
                        } else {
                            if (g === "corruption" || g === "corruptionres") {
                                a[g] = ae
                            }
                        }
                    }
                    switch (g) {
                        case"agistrint":
                            a.agi = a.str = a["int"] = a[g];
                            break;
                        case"agistr":
                            a.agi = a.str = a[g];
                            break;
                        case"agiint":
                            a.agi = a["int"] = a[g];
                            break;
                        case"strint":
                            a.str = a["int"] = a[g];
                            break;
                        default:
                            break
                    }
                }
            }
            if (a.armor && aa[a.level]) {
                var E = (a.quality == 7) ? 3 : a.quality;
                var c = (a.subclass == -6) ? 1 : a.subclass;
                if (WH.inArray([1, 2, 3, 4], c) != -1) {
                    var ad = aa[a.level][11 + E];
                    var L = aa[a.level][c - 1];
                    var f = B[a.slot][c - 1];
                    a.armor = Math.floor(L * ad * f + 0.5)
                }
                if (a.subclass == 6) {
                    a.armor = aa[a.level][4 + E]
                }
            }
            if (a.dps) {
                var d = ["dps", "mledps", "rgddps"];
                var W = ["dmgmin1", "mledmgmin", "rgddmgmin", "dmgmax1", "mledmgmax", "rgddmgmax"];
                var ab = WH.getEffectiveWeaponDamage(a, false);
                var z = WH.getEffectiveWeaponDamage(a, true);
                ab = Math.floor(Math.max(1, ab));
                z = Math.max(1, z);
                if (!WH.isRetailTree()) {
                    ab = a.damagemin || ab;
                    z = a.damagemax || z
                }
                var J = ((ab + z) / 2) / a.speed;
                var I = J >= 1000 ? 0 : (WH.isRetailTree() ? 1 : 2);
                J = parseFloat(J.toFixed(I));
                for (var Y in d) {
                    if (a[d[Y]]) {
                        a[d[Y]] = J
                    }
                }
                for (var Y in W) {
                    if (a[W[Y]]) {
                        if (W[Y].indexOf("max") != -1) {
                            a[W[Y]] = z
                        } else {
                            a[W[Y]] = ab
                        }
                    }
                }
            }
        }
        return a
    };
    WH.applyStatModifications.BASE_STATS = [4, 3, 5, 71, 72, 73, 74, 7, 1, 0, 8, 9, 2, 10];
    WH.applyStatModifications.ITEM_TIMEWALKINGMODE_TBC_LEVEL = 67;
    WH.applyStatModifications.ITEM_TIMEWALKINGMODE_WOTLK_LEVEL = 92;
    WH.applyStatModifications.ITEM_TIMEWALKINGMODE_CATA_LEVEL = 104;
    WH.applyStatModifications.ITEM_TIMEWALKINGMODE_MISTS_LEVEL = 116;
    WH.getItemDamageValue = function (c, e, a) {
        var b = WH.applyStatModifications.ScalingData.DV;
        var d = 7 * a + e;
        if (b && b[c] && b[c][d]) {
            return b[c][d]
        }
        return 0
    };
    WH.getEffectiveWeaponDamage = function (j, a) {
        var f = j.level;
        var c = j.subclass;
        var h = j.quality;
        var d = j.slotbak ? j.slotbak : j.slot;
        var g = 0;
        var k = false;
        var b = j.flags2 & 512;
        if (j.classs != 2) {
            return 0
        }
        if (h > 7) {
            return 0
        }
        if (h == 7) {
            h = 3
        }
        if (d > 22) {
            if (d == 24) {
                g = 0;
                k = true
            }
            if (!k && (d <= 24 || d > 26)) {
                k = true
            }
        } else {
            if (d == 21 || d == 22 || d == 13) {
                if (!b) {
                    g = WH.getItemDamageValue(f, h, 0)
                } else {
                    g = WH.getItemDamageValue(f, h, 1)
                }
                k = true
            }
            if (!k && d != 15) {
                if (d != 17) {
                    k = true
                } else {
                    if (!b) {
                        g = WH.getItemDamageValue(f, h, 2)
                    } else {
                        g = WH.getItemDamageValue(f, h, 3)
                    }
                    k = true
                }
            }
        }
        if (!k && c >= 2) {
            if (c == 2 || c == 3 || c == 18) {
                if (!b) {
                    g = WH.getItemDamageValue(f, h, 2)
                } else {
                    g = WH.getItemDamageValue(f, h, 3)
                }
                k = true
            }
            if (!k && c == 19) {
                g = WH.getItemDamageValue(f, h, 1)
            }
        }
        if (g > 0) {
            var e = j.dmgrange || 0;
            if (!a) {
                return g * j.speed * (1 - e / 2)
            } else {
                return Math.floor((g * j.speed * (1 + e / 2)) + 0.5)
            }
        }
        return 0
    };
    WH.getJsonReforge = function (c, a) {
        if (!a) {
            if (!WH.reforgeStats) {
                return []
            }
            c.__reforge = {};
            c.__reforge.all = [];
            for (var a in WH.reforgeStats) {
                var d = WH.getJsonReforge(c, a);
                if (d.amount) {
                    c.__reforge.all.push(d)
                }
            }
            return c.__reforge.all
        }
        if (!WH.reforgeStats || !WH.reforgeStats[a]) {
            return {}
        }
        c.__statidx = {};
        for (var b in c) {
            if (WH.individualToGlobalStat[WH.jsonToStat[b]]) {
                c.__statidx[WH.individualToGlobalStat[WH.jsonToStat[b]]] = c[b]
            } else {
                c.__statidx[WH.jsonToStat[b]] = c[b]
            }
        }
        if (!c.__reforge) {
            c.__reforge = {}
        }
        var d = c.__reforge[a] = WH.dO(WH.reforgeStats[a]);
        c.__reforge[a].amount = Math.floor(d.v * (c.__statidx[d.i1] && !c.__statidx[d.i2] ? c.__statidx[d.i1] : 0));
        return c.__reforge[a]
    };
    WH.getJsonItemEnchantMask = function (a) {
        if (a.classs == 2 && a.subclass == 19) {
            return 1 << (21 - 1)
        }
        return 1 << (a.slot - 1)
    };
    WH.getArtifactKnowledgeMultiplier = function (a) {
        let multiplier = 1;
        for (let i = 0, possibleMultiplier; possibleMultiplier = WH.Tooltip.ARTIFACT_KNOWLEDGE_MULTIPLIERS[i]; i++) {
            if (i > a) {
                break
            }
            multiplier = possibleMultiplier
        }
        return multiplier
    };
    WH.getCurveValue = function (c, b) {
        var d;
        if (!WH.curvePoints || !(d = WH.curvePoints[c])) {
            return undefined
        }
        var f = d[0][1];
        var e = d[0][2];
        if (f > b) {
            return e
        }
        for (var g = 0, a; a = d[g]; g++) {
            if (b == a[1]) {
                return a[2]
            }
            if (b < a[1]) {
                return (a[2] - e) / (a[1] - f) * (b - f) + e
            }
            f = a[1];
            e = a[2]
        }
        return e
    };
    WH.setItemModifications = function (k, r, w, o, K, s, D) {
        if (!WH.isSet("g_items") || !g_items[r] || !g_items[r].jsonequip) {
            return k
        }
        if (!K) {
            K = WH.maxLevel
        }
        w = w ? w.split(":") : null;
        var l = g_items[r].bonusesData;
        var E = 0;
        var a = w ? w.indexOf("u") : -1;
        if (l && a != -1) {
            E = w[a + 1];
            w.splice(a, 1)
        }
        if (!s) {
            s = 0;
            switch (o) {
                case"twtbc":
                    s = WH.applyStatModifications.ITEM_TIMEWALKINGMODE_TBC_LEVEL;
                    break;
                case"twwotlk":
                    s = WH.applyStatModifications.ITEM_TIMEWALKINGMODE_WOTLK_LEVEL;
                    break;
                case"twcata":
                    s = WH.applyStatModifications.ITEM_TIMEWALKINGMODE_CATA_LEVEL;
                    break;
                case"twmists":
                    s = WH.applyStatModifications.ITEM_TIMEWALKINGMODE_MISTS_LEVEL;
                    break
            }
        }
        o = !s ? o : null;
        var B = WH.applyStatModifications(g_items[r].jsonequip, 0, o, s, w, K, undefined, D);
        if (!B.name && g_items[r].hasOwnProperty("name_" + Locale.getName())) {
            B.name = g_items[r]["name_" + Locale.getName()];
            B.quality = g_items[r].quality
        }
        if (E) {
            var F = WH.bonusesBtnGetContextBonusId(w);
            var n = l[F].sub[E].sub;
            for (var A in n) {
                var C = WH.applyStatModifications(g_items[r].jsonequip, 0, o, s, [F, A]);
                for (var c in C.statsInfo) {
                    var d = C[WH.statToJson[c]];
                    if (B.statsInfo[c]) {
                        if (typeof B[WH.statToJson[c]] == "number" || !B[WH.statToJson[c]]) {
                            var b = B[WH.statToJson[c]] ? B[WH.statToJson[c]] : d;
                            B[WH.statToJson[c]] = {};
                            B[WH.statToJson[c]]["min"] = b;
                            B[WH.statToJson[c]]["max"] = b
                        }
                        var v = B[WH.statToJson[c]]["min"];
                        var e = B[WH.statToJson[c]]["max"];
                        if (d < v) {
                            B[WH.statToJson[c]]["min"] = d
                        } else {
                            if (d > e) {
                                B[WH.statToJson[c]]["max"] = d
                            }
                        }
                    }
                }
            }
        }
        k = k.replace(/(<!--ilvl-->)\d+\+?/, function (L, M) {
            return M + B.level + (B.previewLevel ? "+" : "")
        });
        let displaySlider = false;
        let minLevel = 1;
        let maxLevel = WH.maxLevel;
        if (B.scadist) {
            let scalingDistributions = WH.convertScalingFactor.SD;
            let scalingDistribution = scalingDistributions ? scalingDistributions[B.scadist] : null;
            if (scalingDistribution && scalingDistribution[21]) {
                displaySlider = true;
                minLevel = scalingDistribution[20] ? scalingDistribution[20] : 1;
                maxLevel = scalingDistribution[21]
            }
        } else {
            if (B.contenttuning) {
                let contentTuning = WH.contentTuningLevels[B.contenttuning];
                if (contentTuning) {
                    displaySlider = true;
                    minLevel = contentTuning[0];
                    maxLevel = contentTuning[1]
                }
            } else {
                if (B.scadistbonus && B.scadistbonustype === 13 && B.playercurve) {
                    let curvePoints = WH.curvePoints[B.playercurve];
                    minLevel = curvePoints[0][1];
                    maxLevel = curvePoints[curvePoints.length - 1][1];
                    displaySlider = true
                }
            }
        }
        if (displaySlider) {
            K = ((K && K <= maxLevel) ? K : maxLevel);
            k = k.replace(/(<!--lvl-->)\d+/g, function (L, M) {
                return M + ((K && K <= maxLevel) ? K : maxLevel)
            });
            k = k.replace(/(<!--minlvl-->)\d+/, function (L, M) {
                return M + minLevel
            });
            k = k.replace(/(<!--maxlvl-->)\d+/, function (L, M) {
                return M + maxLevel
            });
            let didReplace = false;
            k = k.replace(/<!--i\?(\d+):(\d+):(\d+):(\d+)(?::(\d+):(\d+))?/, function (P, R, O, L, M, N, Q) {
                didReplace = true;
                return "<!--i?" + R + ":" + minLevel + ":" + maxLevel + ":" + K + ":" + (B.scadist || B.contenttuning) + ":" + (Q || 0)
            });
            if (!didReplace) {
                k += "<!--i?" + r + ":" + minLevel + ":" + maxLevel + ":" + K + ":" + (B.scadist || B.contenttuning) + ":0-->"
            }
            k = k.replace(/(<!--huindex-->)\d+/, function (L, M) {
                let heirloomUpgradeIdx = 0;
                if (B.scadistbonus && B.heirloombonuses) {
                    for (let i = 0, heirloomBonus; heirloomBonus = B.heirloombonuses[i]; i++) {
                        if (parseInt(B.scadistbonus) === heirloomBonus) {
                            heirloomUpgradeIdx = i + 1;
                            break
                        }
                    }
                }
                return M + heirloomUpgradeIdx
            })
        } else {
            k = k.replace(/<!--i\?(\d+):(\d+):(\d+):(\d+)(?::(\d+):(\d+))?/, function (P, R, O, L, M, N, Q) {
                return "<!--i?" + R + ":" + O + ":" + L + ":" + (K ? K : L)
            })
        }
        var t;
        if (t = WH.ge("sl" + r)) {
            t.style.display = displaySlider ? "" : "none"
        }
        k = k.replace(/(<!--pvpilvl-->)\d+/, function (L, M) {
            return M + (B.level + ((o != "pvp") ? B.pvpUpgrade : 0))
        });
        k = k.replace(/(<!--ilvldelta-->)\d+/, function (M, N) {
            var L = 1718;
            var O = Math.floor(WH.getCurveValue(L, B.level) || 2);
            return N + O
        });
        k = k.replace(/(<!--rlvl-->)\d+/, function (L, M) {
            return M + B.reqlevel
        });
        k = k.replace(/(<!--uindex-->)\d+/, function (L, M) {
            return (o && o != "pvp") ? (M + o) : L
        });
        var u = (typeof B.dmgrange != "undefined") && B.dmgrange;
        var G = new RegExp("(<!--dmg-->)[\\d,]+" + (u ? "(\\D*?)[\\d,]+" : "") + "");
        k = k.replace(G, function (M, N, L) {
            return N + WH.numberFormat(B.dmgmin1) + (u ? (L + WH.numberFormat(B.dmgmax1)) : "")
        });
        k = k.replace(/(<!--dps-->\D*?)([\d,]+(?:\.\d+)?)/, function (M, N) {
            var L = B.dps >= 1000 ? 0 : (WH.isRetailTree() ? 1 : 2);
            return N + (B.dps ? WH.numberFormat(B.dps.toFixed(L)) : "0")
        });
        k = k.replace(/(<!--amr-->)\d+/, function (L, M) {
            return M + B.armor
        });
        var J = WH.getCombatRatingMult(B.level, g_items[r].slot);
        k = (function (L) {
            let div = WH.ce("div", {innerHTML: L});
            WH.qsa("span", div).forEach(function (M) {
                let c;
                let ratingId;
                let statComment;
                let ratingComment;
                M.childNodes.forEach(function (N) {
                    if (N.nodeType === Node.COMMENT_NODE) {
                        let p;
                        if (p = (N.nodeValue || "").match(/^stat(\d+)$/)) {
                            c = parseInt(p[1]);
                            statComment = N
                        }
                        if (p = (N.nodeValue || "").match(/^rtg(\d+)$/)) {
                            ratingId = parseInt(p[1]);
                            ratingComment = N
                        }
                    }
                });
                if (c === undefined && ratingId === undefined) {
                    return
                }
                let hidden = false;
                if (ratingId) {
                    let value = B[WH.statToJson[ratingId]] ? B[WH.statToJson[ratingId]] : 0;
                    let sign = value < 0 ? "-" : "+";
                    if (value) {
                        let min = Math.round((E && value.min ? value.min : value) * J);
                        let max = Math.round((E && value.max ? value.max : value) * J);
                        value = WH.numberLocaleFormat(min != max ? (min + "-" + max) : min)
                    } else {
                        hidden = true;
                        value = 0
                    }
                    let signNode = ratingComment.previousSibling;
                    if (signNode && signNode.nodeType === Node.TEXT_NODE) {
                        signNode.nodeValue = signNode.nodeValue.replace(/[-+]$/, sign)
                    }
                    let amountNode = ratingComment.nextSibling;
                    if (amountNode && amountNode.nodeType === Node.TEXT_NODE) {
                        amountNode.nodeValue = amountNode.nodeValue.replace(/[-\d\.,]+/, value)
                    }
                } else {
                    let value = B[WH.statToJson[c]] ? B[WH.statToJson[c]] : 0;
                    if (value) {
                        let min = Math.round(E && value.min ? value.min : value);
                        let max = Math.round(E && value.max ? value.max : value);
                        value = (min > 0 ? "+" : "-") + WH.numberLocaleFormat(min != max ? (min + "-" + max) : min)
                    } else {
                        hidden = true;
                        value = "+0"
                    }
                    let amountNode = statComment.nextSibling;
                    if (amountNode && amountNode.nodeType === Node.TEXT_NODE) {
                        amountNode.nodeValue = amountNode.nodeValue.replace(/[-+][-\d\.,]+/, value)
                    }
                }
                if (hidden) {
                    WH.displayNone(M);
                    let node = M.nextSibling;
                    while (node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.nodeName.toLowerCase() === "br") {
                                node.parentNode.replaceChild(document.createComment("br"), node)
                            }
                            break
                        }
                        node = node.nextSibling
                    }
                } else {
                    WH.displayDefault(M)
                }
            });
            return div.innerHTML
        })(k);
        if (B.extraStats && B.extraStats.length) {
            k = k.replace(/<!--re--><span[^<]*?<\/span>(<br \/>)?/, "");
            var h = WH.applyStatModifications.BASE_STATS;
            k = k.replace(/<!--ebstats-->/, function (T) {
                var O = "";
                for (var N = 0; N < B.extraStats.length; ++N) {
                    var L = B.extraStats[N];
                    if (h.indexOf(L) == -1) {
                        continue
                    }
                    var Q = "$1$2 " + (WH.statToJson && WH.statToJson[L] && LANG.traits[WH.statToJson[L]] ? LANG.traits[WH.statToJson[L]][1] : "Unknown");
                    var P = WH.statToJson && WH.statToJson[L] ? B[WH.statToJson[L]] : 0;
                    var M = Math.round((E && P.min ? P.min : P) * J);
                    var R = Math.round((E && P.max ? P.max : P) * J);
                    var S = WH.numberLocaleFormat(M != R ? (M + "-" + R) : M);
                    O += "<br /><span><!--stat" + L + "-->" + WH.sprintf(Q, (M < 0) ? "-" : "+", S) + "</span>"
                }
                return O + T
            });
            k = k.replace(/<!--egstats-->/, function (V) {
                var P = "";
                for (var O = 0; O < B.extraStats.length; ++O) {
                    var M = B.extraStats[O];
                    if (h.indexOf(M) != -1) {
                        continue
                    }
                    var Y = J;
                    var L = "q2";
                    switch (WH.statToJson[M]) {
                        case"corruption":
                            L = "stat-corruption";
                            Y = 1;
                            break;
                        case"corruptionres":
                            L = "q6";
                            Y = 1;
                            break
                    }
                    var S = "$1$2 " + (WH.statToJson && WH.statToJson[M] && LANG.traits[WH.statToJson[M]] ? LANG.traits[WH.statToJson[M]][1] : "Unknown");
                    var R = WH.statToJson && WH.statToJson[M] ? B[WH.statToJson[M]] : 0;
                    var N = Math.round((E && R.min ? R.min : R) * Y);
                    var T = Math.round((E && R.max ? R.max : R) * Y);
                    var U = WH.numberLocaleFormat(N != T ? (N + "-" + T) : N);
                    var Q = WH.sprintf("<!--rtg$1-->$2", M, U);
                    var W = "";
                    if (WH.statToRating && WH.statToRating[M]) {
                        W = WH.sprintf("&nbsp;<small>(<!--rtg%$1-->0&nbsp;@&nbsp;L$2" + WH.maxLevel + ")</small>", M, E ? "" : "<!--lvl-->")
                    }
                    var X = "";
                    if (M == 50) {
                        X = "<!--stat%d-->"
                    }
                    if (M == 64) {
                        S = S.substr(5);
                        W = ""
                    }
                    P += '<br /><span class="' + L + '">' + X + WH.sprintf(S, (N >= 0) ? "+" : "-", Q) + W + "</span>"
                }
                return P + V
            })
        }
        k = k.replace(/(<!--nstart-->)(.*)(<!--nend-->)/, function (P, M, N, L) {
            var R = B.quality;
            var O = B.name;
            var Q = B.nameSuffix ? (" " + B.nameSuffix) : "";
            return M + WH.sprintf('<b class="q$1">$2</b>', R, O + Q) + L
        });
        k = k.replace(/(<!--ndstart-->)(.*)(<!--ndend-->)/, function (O, M, L, P) {
            if (!B.namedesc) {
                return M + P
            }
            if (!B.namedesccolor) {
                return O
            }
            var N = parseInt(B.namedesccolor).toString(16);
            while (N.length < 6) {
                N = "0" + N
            }
            return M + WH.sprintf('<br /><span style="color: $1">$2</span>', "#" + N, B.namedesc) + P
        });
        var q = g_items[r].jsonequip.nsockets | 0;
        if ((!q && B.nsockets) || (q && B.nsockets > q)) {
            k = k.replace(/<!--ps-->(<br(?: \/)?>)?/, function (R, T) {
                var O = "";
                for (var M = q; M < B.nsockets; ++M) {
                    if (!B["socket" + (M + 1)]) {
                        continue
                    }
                    var P = B["socket" + (M + 1)];
                    var N = "socket-unknown";
                    var L = 81;
                    var Q = P;
                    switch (P) {
                        case 1:
                            N = "socket-meta";
                            L = 81;
                            Q = 1;
                            break;
                        case 2:
                            N = "socket-red";
                            L = 81;
                            Q = 2;
                            break;
                        case 3:
                            N = "socket-yellow";
                            L = 81;
                            Q = 3;
                            break;
                        case 4:
                            N = "socket-blue";
                            L = 81;
                            Q = 4;
                            break;
                        case 5:
                            N = "socket-hydraulic";
                            L = 81;
                            Q = 5;
                            break;
                        case 6:
                            N = "socket-cogwheel";
                            L = 81;
                            Q = 6;
                            break;
                        case 7:
                            N = "socket-prismatic";
                            L = 81;
                            Q = 9;
                            break;
                        case 8:
                            N = "socket-relic-iron";
                            L = 225;
                            Q = 64;
                            break;
                        case 9:
                            N = "socket-relic-blood";
                            L = 225;
                            Q = 128;
                            break;
                        case 10:
                            N = "socket-relic-shadow";
                            L = 225;
                            Q = 256;
                            break;
                        case 11:
                            N = "socket-relic-fel";
                            L = 225;
                            Q = 512;
                            break;
                        case 12:
                            N = "socket-relic-arcane";
                            L = 225;
                            Q = 1024;
                            break;
                        case 13:
                            N = "socket-relic-frost";
                            L = 225;
                            Q = 2048;
                            break;
                        case 14:
                            N = "socket-relic-fire";
                            L = 225;
                            Q = 4096;
                            break;
                        case 15:
                            N = "socket-relic-water";
                            L = 225;
                            Q = 8192;
                            break;
                        case 16:
                            N = "socket-relic-life";
                            L = 225;
                            Q = 16384;
                            break;
                        case 17:
                            N = "socket-relic-storm";
                            L = 225;
                            Q = 32768;
                            break;
                        case 18:
                            N = "socket-relic-holy";
                            L = 225;
                            Q = 65536;
                            break;
                        default:
                            break
                    }
                    var S = WH.sprintf('<a href="/items/gems?filter=$1;$2;0" class="$3 q0">', L, Q, N);
                    S += g_socket_names[P] ? g_socket_names[P] : (g_gem_types[P] ? WH.sprintf(WH.TERMS.emptyrelicslot_format.replace("%s", "$1"), g_gem_types[P]) : "Unknown Socket");
                    S += "</a>";
                    O += "<br>" + S
                }
                return (q == 0 ? "<br>" : "") + O + "<br><br>"
            })
        }
        if (w && WH.Tooltip.BONUS_ITEM_EFFECTS) {
            k = k.replace(/<!--itemEffects:(\d)-->/, function (M, L) {
                let useCorruptionColor = B.extraStats && B.extraStats.indexOf(parseInt(WH.jsonToStat.corruption)) >= 0;
                let result = "";
                for (let bonus, bonusIndex = 0; bonus = w[bonusIndex]; bonusIndex++) {
                    let effectIds = WH.Tooltip.BONUS_ITEM_EFFECTS[bonus] || [];
                    for (let effectId, effectIdIndex = 0; effectId = effectIds[effectIdIndex]; effectIdIndex++) {
                        let effectHtml = WH.Tooltip.ITEM_EFFECT_TOOLTIP_HTML[effectId];
                        if (effectHtml) {
                            if (useCorruptionColor) {
                                effectHtml = effectHtml.replace(/\b(class=")q2\b/g, "$1stat-corruption")
                            }
                            result += (result ? "<br>" : "") + effectHtml
                        }
                    }
                }
                return result + ((result && L) ? "<br>" : "") + M
            })
        }
        if (WH.applyStatModifications && WH.convertScalingSpell.SpellInformation) {
            var p;
            var g = {effects: {}};
            var j = /(<!--pts(\d):(\d):(\d+(?:\.\d+)?):(\d+)(:\d+(?:\.\d+)?)?(:crm)?-->(?:<!--rtg\d+-->)?)(\d+(?:\.\d+)?)(<!---->(%?))?/g;
            while ((p = j.exec(k)) !== null) {
                var z = p[2];
                var I = p[3];
                var f = p[5];
                if (f <= 0) {
                    continue
                }
                g[f] = g[f] || {};
                let itemLevel = (B.scadistbonus && B.scadistbonustype === 13) ? g_items[r].level : B.level;
                WH.cO(g[f], WH.convertScalingSpell(g[f], f, z, I, K, itemLevel))
            }
            k = WH.adjustSpellPoints(k, g, B.level, g_items[r].jsonequip.slot)
        }
        var m = 0;
        switch (s) {
            case WH.applyStatModifications.ITEM_TIMEWALKINGMODE_TBC_LEVEL:
                m = 70;
                break;
            case WH.applyStatModifications.ITEM_TIMEWALKINGMODE_WOTLK_LEVEL:
                m = 80;
                break;
            case WH.applyStatModifications.ITEM_TIMEWALKINGMODE_CATA_LEVEL:
                m = 85;
                break;
            case WH.applyStatModifications.ITEM_TIMEWALKINGMODE_MISTS_LEVEL:
                m = 90;
                break;
            default:
                break
        }
        if (m) {
            k = k.replace(/<!--ee(\d+):(\d+):(\d+):(\d+):(\d+):(\d+)-->([^<]*)<\/span>/gi, function (L, U, M, N, T, R, P, Q) {
                var S = {
                    enchantment: Q,
                    scalinginfo: {
                        scalingcategory: U,
                        minlvlscaling: M,
                        maxlvlscaling: N,
                        damage1: T / 1000,
                        damage2: R / 1000,
                        damage3: P / 1000
                    }
                };
                var O = WH.scaleItemEnchantment(S, m);
                return "<!--ee-->" + O + "</span>"
            })
        }
        k = k.replace(/(<!--rtg%(\d+)-->)([\.,0-9]+)%?/g, function (N, P, O, M) {
            _ = k.match(new RegExp("<!--rtg" + O + "-->([\\d\\.,]+)(-[\\d\\.,]+)?"));
            if (!_) {
                return N
            }
            if (_[2]) {
                _[2] = _[2].replace(/\D/, "")
            }
            _[1] = _[1].replace(/\D/, "");
            var L = _[2] ? ((Math.abs(parseInt(_[2])) + parseInt(_[1])) / 2) : _[1];
            return P + (_[2] ? "~" : "") + (Math.round(WH.convertRatingToPercent(K ? K : WH.maxLevel, O, L) * 100) / 100) + (O != 49 ? "%" : "")
        });
        k = k.replace(/<!--bo-->(<br(?: \/)?>)?/, function (M, L) {
            let bond = "";
            if (B.bond) {
                switch (B.bond) {
                    case 1:
                        bond = WH.GlobalStrings.ITEM_BIND_ON_PICKUP;
                        break;
                    case 2:
                        bond = WH.GlobalStrings.ITEM_BIND_ON_EQUIP;
                        break;
                    case 3:
                        bond = WH.GlobalStrings.ITEM_BIND_ON_USE;
                        break;
                    case 4:
                    case 5:
                        bond = WH.GlobalStrings.ITEM_BIND_QUEST;
                        break;
                    default:
                        bond = WH.TERMS.unknownBindType_stc;
                        break
                }
            }
            if (bond != "") {
                bond = "<br />" + bond
            }
            return "<!--bo-->" + bond + L
        });
        (function () {
            var L = WH.ce("div");
            L.innerHTML = k;
            L.querySelectorAll('a[href*="/spell="]').forEach(function (N) {
                var M = N.dataset.wowhead || "";
                M = M.replace(/(^|&)i?lvl=\d+/g, "");
                if (K) {
                    M += (M ? "&" : "") + "lvl=" + K
                }
                if (B.level) {
                    M += (M ? "&" : "") + "ilvl=" + B.level
                }
                N.dataset.wowhead = M
            });
            let priceFactors = WH.getPageData("item.sellprice." + r);
            let sellPriceDiv = L.querySelector(".whtt-sellprice");
            if (priceFactors && sellPriceDiv) {
                let labelNode = sellPriceDiv.firstChild;
                WH.ee(sellPriceDiv);
                WH.ae(sellPriceDiv, labelNode);
                let levels = priceFactors.itemLevel;
                let levelFactor = levels[B.level] || levels[Math.max.apply(null, Object.keys(levels))];
                let qualityFactor = priceFactors.quality[B.quality] || 0;
                let newPrice = Math.floor(priceFactors.base * levelFactor * qualityFactor);
                WH.ae(sellPriceDiv, WH.Wow.buildMoney({copper: newPrice}))
            }
            k = L.innerHTML
        })();
        return k
    };
    WH.setTooltipLevel = function (e, b, w) {
        var h = typeof e;
        if (h == "number") {
            var a = WH.getDataSource();
            if (a[e] && a[e][(w ? "buff_" : "tooltip_") + Locale.getName()]) {
                e = a[e][(w ? "buff_" : "tooltip_") + Locale.getName()]
            } else {
                return e
            }
        } else {
            if (h != "string") {
                return e
            }
        }
        e = e.replace(/<!--(gem|ee)(\d+):(\d+):(\d+):(\d+):(\d+):(\d+)-->([^<]*)<\/span>/gi, function (j, M, L, C, D, K, I, F, G) {
            var J = {
                enchantment: G,
                scalinginfo: {
                    scalingcategory: L,
                    minlvlscaling: C,
                    maxlvlscaling: D,
                    damage1: K / 1000,
                    damage2: I / 1000,
                    damage3: F / 1000
                }
            };
            var E = WH.scaleItemEnchantment(J, b);
            return "<!--" + M + "-->" + E + "</span>"
        });
        var z = e.match(/<!--i?\?([0-9-:]*)-->/);
        var f;
        var n;
        if (z) {
            f = z[1].split(":").map(Number);
            b = Math.min(f[2], Math.max(f[1], b));
            n = f[4] || 0
        }
        if (n) {
            if (!e.match(/<!--pts\d:\d:\d+(?:\.\d+)?:\d+-->/g) && !(n < 0) && !w) {
                e = WH.setItemModifications(e, f[0], null, null, b);
                WH.updateItemStringLink.call(this)
            } else {
                if (n > 0) {
                    if (!f[7] && WH.isSet("g_pageInfo") && g_pageInfo.type == 3 && g_items[g_pageInfo.typeId] && g_items[g_pageInfo.typeId].quality != 7) {
                        b = Math.min(g_items[g_pageInfo.typeId].reqlevel, b)
                    }
                    var v = {scadist: n};
                    e = e.replace(/<!--cast-->\d+\.\d+/, "<!--cast-->" + v.cast);
                    var m = /<!--pts([0-9-:]*)-->/g;
                    var r = m.exec(e);
                    v.effects = true;
                    while (r != null) {
                        var u = r[1].split(":").map(Number);
                        var p = u[0];
                        var B = u[1];
                        var c = u[3];
                        if (c > 0) {
                            if (v[c] == undefined) {
                                v[c] = {};
                                v[c].effects = {}
                            }
                            WH.cO(v[c], WH.convertScalingSpell(v[c], c, p, B, b, b))
                        }
                        r = m.exec(e)
                    }
                    if (v.effects) {
                        var d = 5;
                        var k = d;
                        if (window.g_pageInfo && window.g_pageInfo.type == WH.Types.AZERITE_ESSENCE_POWER) {
                            k = WH.Wow.Item.INVENTORY_TYPE_NECK
                        }
                        e = WH.adjustSpellPoints(e, v, b, k);
                        if (this.modified) {
                            for (var l in this.modified[1]) {
                                var A = this.modified[1][l];
                                for (var s = 0; s < A.length; ++s) {
                                    A[s][0] = WH.adjustSpellPoints(A[s][0], v, b, k);
                                    A[s][1] = WH.adjustSpellPoints(A[s][1], v, b, k)
                                }
                            }
                        }
                    }
                } else {
                    var o = -n;
                    var g = WH.getSpellScalingValue(o, b);
                    for (var t = 0; t < 3; ++t) {
                        var q = f[5 + t] / 1000;
                        e = e.replace(new RegExp("<!--gem" + (t + 1) + "-->(.+?)<"), "<!--gem" + (t + 1) + "-->" + Math.round(g * q) + "<")
                    }
                }
            }
        }
        e = e.replace(/<!--ppl(\d+):(\d+):(\d+):(\d+):(\d+)(?::(1))?-->\s*\d+/gi, function (F, J, D, C, G, I, E) {
            var j = E ? Math.ceil : Math.floor;
            return "<!--ppl" + J + ":" + D + ":" + C + ":" + G + ":" + I + "-->" + j(parseInt(G) + (Math.min(Math.max(b, D), C) - D) * I / 100)
        });
        e = e.replace(/(<!--rtg%(\d+)-->)([\.0-9]+)%?/g, function (C, E, D, j) {
            _ = e.match(new RegExp("<!--rtg" + D + "-->(\\d+)"));
            if (!_) {
                return C
            }
            return E + (Math.round(WH.convertRatingToPercent(b, D, _[1]) * 100) / 100) + (D != 49 ? "%" : "")
        });
        e = e.replace(/(<!--i?\?\d+:\d+:\d+:)\d+/g, "$1" + b);
        e = e.replace(/<!--lvl-->\d+/g, "<!--lvl-->" + b);
        return e
    };
    WH.getSpellScalingValue = function (a, c) {
        var b = WH.convertScalingSpell ? WH.convertScalingSpell.SV : null;
        if (!b) {
            return 0
        }
        return b[c][a - 1]
    };
    WH.adjustSpellPoints = function (e, c, b, f) {
        var a = 1;
        if (b && f) {
            a = WH.getCombatRatingMult(b, f)
        }
        for (var d = 1; d <= 20; ++d) {
            e = e.replace(new RegExp("<!--pts" + d + ":0:0:(\\d+)(:\\d+(?:\\.\\d+)?)?(:crm)?-->(<!--rtg\\d+-->)?(.+?)<", "g"), function (m, h, k, g, j) {
                var l = (c[h] && c[h].hasOwnProperty("effects")) ? c[h].effects[d] : c.effects[d];
                if (!l) {
                    return m
                }
                var n = Math.round(l.avg * (g ? a : 1));
                return "<!--pts" + d + ":0:0:" + h + (k || "") + (g || "") + "-->" + (j ? j : "") + n + "<"
            });
            e = e.replace(new RegExp("<!--pts" + d + ":1:0:(\\d+)(:\\d+(?:\\.\\d+)?)?(:crm)?-->(<!--rtg\\d+-->)?(.+?)<", "g"), function (m, h, k, g, j) {
                var l = (c[h] && c[h].hasOwnProperty("effects")) ? c[h].effects[d] : c.effects[d];
                if (!l) {
                    return m
                }
                var n = Math.round(l.min * (g ? a : 1));
                return "<!--pts" + d + ":1:0:" + h + (k || "") + (g || "") + "-->" + (j ? j : "") + n + "<"
            });
            e = e.replace(new RegExp("<!--pts" + d + ":2:0:(\\d+)(:\\d+(?:\\.\\d+)?)?(:crm)?-->(<!--rtg\\d+-->)?(.+?)<", "g"), function (m, h, k, g, j) {
                var l = (c[h] && c[h].hasOwnProperty("effects")) ? c[h].effects[d] : c.effects[d];
                if (!l) {
                    return m
                }
                var n = Math.round(l.max * (g ? a : 1));
                return "<!--pts" + d + ":2:0:" + h + (k || "") + (g || "") + "-->" + (j ? j : "") + n + "<"
            });
            e = e.replace(new RegExp("<!--pts" + d + ":3:(\\d+(?:\\.\\d+)?):(\\d+)(:\\d+(?:\\.\\d+)?)?(:crm)?-->(<!--rtg\\d+-->)?(.+?)<", "g"), function (n, m, h, k, g, j) {
                var l = (c[h] && c[h].hasOwnProperty("effects")) ? c[h].effects[d] : c.effects[d];
                if (!l) {
                    return n
                }
                var o = Math.round(l.avg * m * (g ? a : 1));
                return "<!--pts" + d + ":3:" + m + ":" + h + (k || "") + (g || "") + "-->" + (j ? j : "") + o + "<"
            });
            e = e.replace(new RegExp("<!--pts" + d + ":4:0:(\\d+)(:\\d+(?:\\.\\d+)?)?(:crm)?-->(<!--rtg\\d+-->)?(.+?)<", "g"), function (m, h, k, g, j) {
                var l = (c[h] && c[h].hasOwnProperty("effects")) ? c[h].effects[d] : c.effects[d];
                if (!l) {
                    return m
                }
                var n = Math.round(l.pts * (g ? a : 1));
                return "<!--pts" + d + ":4:0:" + h + (k || "") + (g || "") + "-->" + (j ? j : "") + n + "<"
            })
        }
        return e
    };
    WH.getStaminaRatingMult = function (a, b) {
        let slotRatingOffset = 0;
        switch (b) {
            case 2:
            case 11:
                slotRatingOffset = 3;
                break;
            case 12:
                slotRatingOffset = 2;
                break;
            case 13:
            case 14:
            case 15:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
            case 26:
                slotRatingOffset = 1;
                break
        }
        return WH.staminaFactor && WH.staminaFactor[a] && WH.staminaFactor[a][slotRatingOffset] || 1
    };
    WH.getCombatRatingMult = function (d, c) {
        var a = 0;
        switch (c) {
            case 2:
            case 11:
                a = 3;
                break;
            case 12:
                a = 2;
                break;
            case 13:
            case 14:
            case 15:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
            case 26:
                a = 1;
                break
        }
        var b = (WH.convertRatingToPercent.hasOwnProperty("RM") && WH.convertRatingToPercent.RM.hasOwnProperty(d)) ? WH.convertRatingToPercent.RM[d][a] : 1;
        if (typeof b == "undefined") {
            b = 1
        }
        return b
    };
    WH.roundArtifactPower = function (b) {
        var a = 1;
        if (b > 50) {
            a = 5
        }
        if (b > 1000) {
            a = 25
        }
        if (b > 5000) {
            a = 50
        }
        return WH.roundHalfEven(b / a) * a
    };
    WH.roundHalfEven = function (b) {
        if (Math.floor(b * 100000) % 100000 == 50000) {
            var a = Math.floor(b);
            return a + a % 2
        }
        return Math.round(b)
    };
    WH.setTooltipSpells = function (g, l, h, I) {
        l = l || [];
        h = h || {};
        if (!l.length) {
            l = [0]
        } else {
            let c = window.g_pageInfo ? g_pageInfo.typeId : null;
            if (c) {
                let idIndex = l.indexOf(parseInt(c));
                if (idIndex !== -1) {
                    l[idIndex] = 0
                }
            }
        }
        if (I === undefined) {
            var B = function (K) {
                var J = [];
                if (K.hasOwnProperty("data")) {
                    J.push(K.data)
                }
                for (var j = 0; j < K.children.length; j++) {
                    J = J.concat(B(K.children[j]))
                }
                return J
            };
            for (let c in h) {
                if (!h.hasOwnProperty(c)) {
                    continue
                }
                if (h[c].length < 2) {
                    continue
                }
                for (var p = 0; p < h[c].length; p++) {
                    h[c][p] = {data: h[c][p], children: []};
                    var r = 0;
                    for (var o = 0; o <= 1; o++) {
                        var b = -1;
                        while ((b = h[c][p].data[o].indexOf("<!--sp" + c + "-->", b + 1)) >= 0) {
                            r++
                        }
                    }
                    var F = p - r;
                    if (F < 0) {
                        continue
                    }
                    while (r-- > 0) {
                        var k = h[c].splice(F, 1);
                        p--;
                        h[c][p].children.push(k[0])
                    }
                }
                h[c] = B({children: h[c]})
            }
        }
        I = I || {};
        var f = function (j) {
            I[j] = (I[j] || 0) + 1;
            if (I[j] >= (h[j] || []).length) {
                I[j] = 0
            }
        };
        var w = [];
        var e = /<!--sp([0-9]+):[01]-->/g;
        var m;
        while (m = e.exec(g)) {
            var v = m[0];
            var G = m.index + v.length;
            var n = "<!--sp" + m[1] + "-->";
            var u = g.indexOf(n, G);
            if (u < 0) {
                WH.warn("Could not find closing end tag for tooltip spell.", n, g);
                return g
            }
            var E = new RegExp("<!--sp" + m[1] + ":[01]-->", "g");
            E.lastIndex = G;
            var q = E.exec(g);
            while (q && q.index < u) {
                u = g.indexOf(n, u + n.length);
                if (u < 0) {
                    WH.warn("Could not find nested closing end tag for tooltip spell.", n, g);
                    return g
                }
                q = E.exec(g)
            }
            w.push(g.substring(m.index, u + n.length));
            e.lastIndex = u + n.length
        }
        var d = 0;
        var D = /^(<!--sp([0-9]+):[01]-->).*(<!--sp\2-->)$/;
        for (var C = 0; C < w.length; ++C) {
            var c = w[C].match(D)[2];
            var a = WH.inArray(l, parseInt(c)) >= 0 ? 1 : 0;
            if (h[c] == null) {
                continue
            }
            if (I[c] == null) {
                I[c] = 0
            }
            var s = h[c][I[c]];
            if (s == null || s[a] == null) {
                continue
            }
            f(c);
            if (a && (m = s[2].match(/^(!?)(\d+)$/))) {
                if (m[1]) {
                    if (WH.inArray(l, parseInt(m[2])) >= 0) {
                        a = 0
                    }
                } else {
                    l.push(parseInt(m[2]))
                }
            }
            var A = s[a];
            A = WH.setTooltipSpells(A, l, h, I);
            var t = "<!--sp" + c + ":" + a + "-->" + A + "<!--sp" + c + "-->";
            g = g.substr(0, d) + g.substr(d).replace(w[C], t);
            d = g.indexOf(t, d) + t.length;
            if (a) {
                for (var z = C + 1; z < w.length; z++) {
                    if (g.indexOf(w[z], d) !== d) {
                        break
                    }
                    m = w[z].match(D);
                    t = m[1] + m[3];
                    g = g.substr(0, d) + g.substr(d).replace(w[z], t);
                    f(m[2]);
                    d += t.length;
                    C++
                }
            }
        }
        g = WH.Tooltip.evalFormulas(g);
        return g
    };
    WH.enhanceTooltip = function (N, M, v, U, s, g, b, S, R, z, d, I, K, J) {
        if ((!WH.applyStatModifications || !WH.applyStatModifications.ScalingData) && (J || S)) {
            g_itemScalingCallbacks.push((function (ac) {
                return function () {
                    var ad = WH.enhanceTooltip.call(ac, N, M, v, U, s, g, b, S, R, z, d, I, K, J);
                    WH.updateTooltip.call(ac, ad)
                }
            })(this));
            return WH.TERMS.loading_ellipsis
        }
        var ab = typeof N, Y, O;
        var u = WH.getDataSource();
        var n = WH.isSet("g_pageInfo") ? g_pageInfo.type : null;
        O = WH.isSet("g_pageInfo") ? g_pageInfo.typeId : null;
        this._knownSpells = g;
        if (ab == "number") {
            O = N;
            var P = "tooltip_";
            if (s) {
                P = "buff_"
            }
            if (I) {
                P = "tooltip_premium_"
            }
            if (K) {
                P = "text_"
            }
            if (u[O] && u[O][P + Locale.getName()]) {
                N = u[O][P + Locale.getName()];
                Y = u[O][(s ? "buff" : "") + "spells_" + Locale.getName()];
                this._rppmModList = u[O]["rppmmod"];
                if (Y) {
                    N = WH.setTooltipSpells(N, g, Y)
                }
            } else {
                return N
            }
        } else {
            if (ab != "string") {
                return N
            }
        }
        var o;
        if (v) {
            var Z = WH.getGets();
            if (Z.lvl) {
                N = WH.setTooltipLevel(N, Z.lvl, s)
            }
            o = Z.ilvl
        }
        let getCraftedStats = function () {
            let params = WH.parseQueryString(WH.getQueryString());
            if (!params["crafted-stats"]) {
                return []
            }
            return params["crafted-stats"].split(":").map(function (ac) {
                return parseInt(ac)
            }).filter(function (ac) {
                return WH.Wow.Item.Stat.CRAFTING_STAT_TO.includes(ac)
            })
        };
        let craftedStats = getCraftedStats();
        if ((J || S || craftedStats.length) && O) {
            N = WH.setItemModifications(N, O, J, S, this._selectedLevel ? this._selectedLevel : null, o, craftedStats)
        }
        if (M) {
            N = N.replace(/\(([^\)]*?<!--lvl-->[^\(]*?)\)/gi, function (ad, ac) {
                return '(<a href="javascript:" onmousedown="return false" class="tip" style="color: white; cursor: pointer" onclick="WH.staticTooltipLevelClick(this, null, 0)" onmouseover="WH.Tooltip.showAtCursor(event, \'<span class=\\\'q2\\\'>\' + WH.TERMS.clicktochangelevel_stc + \'</span>\')" onmousemove="WH.Tooltip.cursorUpdate(event)" onmouseout="WH.Tooltip.hide()">' + ac + "</a>)"
            });
            if (N.indexOf("<!--artpow:") > 0) {
                if (!this.hasOwnProperty("_knowledgeLevel")) {
                    var D = /(&|\?)artk=(\d+)/.exec(location.href);
                    if (D && parseInt(D[2]) <= g_artifact_knowledge_max_level) {
                        this._knowledgeLevel = parseInt(D[2])
                    }
                }
                var C = this._knowledgeLevel ? parseInt(this._knowledgeLevel) : 0;
                N = N.replace(/(<!--ndstart-->)?<!--ndend-->/i, function (ac, ad) {
                    return (ad ? ad + "<br />" : " ") + '<a href="javascript:" onmousedown="return false" class="tip" style="color: white; cursor: pointer" onclick="WH.staticTooltipKnowledgeLevelClick(this, null, ' + O + ')" onmouseover="WH.Tooltip.showAtCursor(event, \'<span class=\\\'q2\\\'>\' + WH.TERMS.clicktochangelevel_stc + \'</span>\')" onmousemove="WH.Tooltip.cursorUpdate(event)" onmouseout="WH.Tooltip.hide()">' + WH.sprintf(WH.TERMS.knowledge_format.replace("%d", "$1"), C) + "</a>"
                });
                N = N.replace(/(<!--artpow:(\d+)-->)[\d\.\,]+/, function (ac, ae, ad) {
                    return ae + WH.numberLocaleFormat(WH.roundArtifactPower(parseInt(ad) * WH.getArtifactKnowledgeMultiplier(C)))
                })
            }
        }
        if (U && Slider) {
            var T = WH.groupSizeScalingShouldShow(O);
            if (s) {
                s.bufftip = this;
                if (T && WH.isSet("g_difficulties") && g_difficulties[T]) {
                    N = WH.groupSizeScalingOnChange.call(s, this, g_difficulties[T].maxplayers, 1, true)
                }
            } else {
                var e = new RegExp("<!--" + ((n && n == 3) ? "i" : "") + "\\?(\\d+):(\\d+):(\\d+):(\\d+)");
                var k = N.match(e);
                if (typeof k == "undefined" && n == 3) {
                    e = new RegExp("<!--\\?(\\d+):(\\d+):(\\d+):(\\d+)");
                    k = N.match(e)
                }
                if (!k && !WH.isRetailTree()) {
                    e = new RegExp("<!--ppl(\\d+):(\\d+):(\\d+):(\\d+):(\\d+)");
                    var a = N.match(e);
                    if (a) {
                        k = [null, null, a[2], WH.maxLevel, WH.maxLevel]
                    }
                }
                if (T && WH.isSet("g_difficulties") && g_difficulties[T]) {
                    var p = WH.ce("label");
                    p.innerHTML = WH.TERMS.difficulty + ": ";
                    this._difficultyBtn = WH.ce("a");
                    this._difficultyBtn.ttId = O;
                    WH.difficultyBtnBuildMenu.call(this, O);
                    Menu.add(this._difficultyBtn, this._difficultyBtn.menu);
                    $("#dd" + O).append(p).append(this._difficultyBtn);
                    WH.difficultyBtnOnChange.call(this, u[O].initial_dd || T, u[O].initial_ddSize);
                    N = WH.groupSizeScalingOnChange.call(this, this, g_difficulties[T].maxplayers, 0, true)
                } else {
                    if (k) {
                        if (k[2] != k[3]) {
                            this.slider = Slider.init(U, {
                                maxValue: parseInt(k[3]),
                                minValue: Math.max(parseInt(k[2]), 1),
                                onMove: WH.tooltipSliderMove.bind(this),
                                title: WH.GlobalStrings.LEVEL
                            });
                            Slider.setValue(this.slider, parseInt(k[4]));
                            this.slider.onmouseover = function (ac) {
                                WH.Tooltip.showAtCursor(ac, WH.TERMS.dragtochangelevel_stc, 0, 0, "q2")
                            };
                            this.slider.onmousemove = WH.Tooltip.cursorUpdate;
                            this.slider.onmouseout = WH.Tooltip.hide;
                            WH.Tooltip.simple(Slider.getInput(this.slider), WH.TERMS.clicktochangelevel_stc, "q2")
                        }
                    }
                }
            }
        }
        if (b) {
            if (s && s.modified) {
                s.bufftip = this
            } else {
                var X = 0;
                for (var aa in Y) {
                    if (Y.hasOwnProperty(aa) && g_spells.hasOwnProperty(aa) && WH.inArray(g, aa) == -1) {
                        X++
                    }
                }
                var E;
                for (var aa in Y) {
                    if (!g_spells[aa] || WH.inArray(g, aa) != -1) {
                        continue
                    }
                    if (X < 4) {
                        var V = WH.ce("label");
                        var f = WH.ce("input", {type: "checkbox", dataset: {spellId: aa}});
                        WH.ae(V, f);
                        WH.aE(f, "click", WH.tooltipSpellsChange.bind(this));
                        WH.ae(V, WH.ce("a", {dataset: {wowhead: "spell=" + aa + "&know=" + aa}}, WH.ct(g_spells[aa]["name_" + Locale.getName()] + (g_spells[aa]["rank_" + Locale.getName()] || ""))));
                        V.setAttribute("unselectable", "");
                        WH.ae(b, V);
                        WH.ae(b, WH.ce("br"))
                    } else {
                        if (!E) {
                            E = WH.ce("select");
                            E.multiple = true;
                            E.size = 6;
                            WH.ae(b, E);
                            WH.aE(E, "change", WH.tooltipSpellsChange.bind(this))
                        }
                        WH.ae(E, WH.ce("option", {value: aa}, WH.ct(g_spells[aa]["name_" + Locale.getName()] + (g_spells[aa]["rank_" + Locale.getName()] || ""))))
                    }
                }
            }
            this.modified = [b, Y, g];
            $(b).toggle(!$(b).is(":empty"))
        }
        if (d) {
            var a = N.match(/<!--rppm-->(\d+(?:\.\d+)?)<!--rppm-->/);
            if (a) {
                var l = $("#rppm" + O);
                if (this._rppmModList.hasOwnProperty(4)) {
                    this._rppmModBase = parseFloat(a[1]);
                    if (l.is(":empty")) {
                        this._rppmSpecModList = this._rppmModList[4];
                        this._rppmSpecModList.splice(0, 0, {spec: -1, modifiervalue: 0, filename: ""});
                        l.append(WH.getMajorHeading(WH.TERMS.realppmmodifiers, 2, 3));
                        for (var aa in this._rppmSpecModList) {
                            var q = Icon.create(this._rppmSpecModList[aa]["filename"], 0, null);
                            q.style.display = "inline-block";
                            q.style.verticalAlign = "middle";
                            var j = $('<input name="rppmmod" type="radio" id="rppm-' + aa + '" />');
                            j.get(0).checked = (this._rppmSpecModList[aa]["spec"] == -1);
                            l.append(j).append(this._rppmSpecModList[aa]["spec"] == -1 ? "" : q).append('<label for="rppm-' + aa + '"> <a>' + (this._rppmSpecModList[aa]["spec"] == -1 ? WH.TERMS.none : WH.Wow.PlayerClass.Specialization.getName(this._rppmSpecModList[aa]["spec"])) + "</a></label>").append("<br />");
                            var Q = this;
                            $("#rppm-" + aa).change(function () {
                                WH.tooltipRPPMChange.call(this, Q)
                            })
                        }
                    } else {
                        var w = this._rppmModBase;
                        var B = this._rppmSpecModList;
                        N = N.replace(/<!--rppm-->(\[?)(\d+(?:\.\d+)?)([^<]*)<!--rppm-->/, function (ac, af, ae, ad) {
                            return "<!--rppm-->" + af + (w * (1 + parseFloat(B[$('input[name="rppmmod"]:checked', l).attr("id").match(/\d+$/)[0]].modifiervalue))).toFixed(2) + ad + "<!--rppm-->"
                        })
                    }
                }
                l.toggle(!(l.is(":empty")));
                var G = "";
                if (this._rppmModList.hasOwnProperty(1)) {
                    G += " + " + LANG.traits.hastertng[2]
                } else {
                    if (this._rppmModList.hasOwnProperty(2)) {
                        G += " + " + LANG.traits.critstrkrtng[2]
                    }
                }
                if (g_pageInfo.type == 6 && this._rppmModList.hasOwnProperty(6)) {
                    G += " + Budget"
                }
                if (G.length > 0) {
                    N = N.replace(/<!--rppm-->\[?(\d+(?:\.\d+)?)([^<]*)<!--rppm-->/, function (ac, ae, ad) {
                        return "<!--rppm-->[" + ae + G + "]" + ad + "<!--rppm-->"
                    })
                }
            }
        }
        if (z) {
            for (aa = 1; aa <= R; ++aa) {
                $(z).append('<input type="checkbox" id="item-upgrade-' + aa + '" />').append('<label for="item-upgrade-' + aa + '"><a>' + WH.term("itemUpgrade_format", aa) + "</a></label>").append("<br />");
                $("#item-upgrade-" + aa).change(WH.upgradeItemTooltip.bind(this, z, aa))
            }
            if (u[O] && u[O].hasOwnProperty("tooltip_" + Locale.getName() + "_pvp")) {
                $(z).append('<input type="checkbox" id="item-upgrade-pvp" />').append('<label for="item-upgrade-pvp"><a>' + WH.TERMS.pvpmode + "</a></label>").append("<br />");
                $("#item-upgrade-pvp").change(WH.upgradeItemTooltip.bind(this, z, "pvp"))
            }
            if (u[O] && u[O].hasOwnProperty("tooltip_" + Locale.getName() + "_twtbc")) {
                $(z).append('<input type="checkbox" id="item-upgrade-twtbc" />').append('<label for="item-upgrade-twtbc"><a>' + g_difficulty_names[24] + " " + WH.TERMS.theburningcrusade_short + "</a></label>").append("<br />");
                $("#item-upgrade-twtbc").change(WH.upgradeItemTooltip.bind(this, z, "twtbc"))
            }
            if (u[O] && u[O].hasOwnProperty("tooltip_" + Locale.getName() + "_twwotlk")) {
                $(z).append('<input type="checkbox" id="item-upgrade-twwotlk" />').append('<label for="item-upgrade-twwotlk"><a>' + g_difficulty_names[24] + " " + WH.TERMS.wrathofthelichking_abbrev + "</a></label>").append("<br />");
                $("#item-upgrade-twwotlk").change(WH.upgradeItemTooltip.bind(this, z, "twwotlk"))
            }
            if (u[O] && u[O].hasOwnProperty("tooltip_" + Locale.getName() + "_twcata")) {
                $(z).append('<input type="checkbox" id="item-upgrade-twcata" />').append('<label for="item-upgrade-twcata"><a>' + g_difficulty_names[24] + " " + WH.TERMS.cataclysm_abbrev + "</a></label>").append("<br />");
                $("#item-upgrade-twcata").change(WH.upgradeItemTooltip.bind(this, z, "twcata"))
            }
            if (u[O] && u[O].hasOwnProperty("tooltip_" + Locale.getName() + "_twmists")) {
                $(z).append('<input type="checkbox" id="item-upgrade-twmists" />').append('<label for="item-upgrade-twmists"><a>' + g_difficulty_names[24] + " " + WH.TERMS.mistsofpandaria_abbrev + "</a></label>").append("<br />");
                $("#item-upgrade-twmists").change(WH.upgradeItemTooltip.bind(this, z, "twmists"))
            }
            $(z).toggle(!$(z).is(":empty"))
        }
        if (n == 3) {
            var r = $("#cs" + O);
            if (r && WH.Wow.Item.tooltipHasSpecStats(N)) {
                if (!this._classSpecBtn) {
                    var t = WH.ce("label");
                    t.innerHTML = WH.TERMS.showingtooltipfor_stc + " ";
                    this._classSpecBtn = WH.ce("a");
                    this._classSpecBtn.ttId = O;
                    WH.classSpecBtnBuildMenu.call(this, u[O].hasOwnProperty("validMenuSpecs") ? u[O].validMenuSpecs : false);
                    Menu.add(this._classSpecBtn, this._classSpecBtn.menu);
                    r.append(t).append(this._classSpecBtn).show()
                }
                var F = WH.LocalStorage.get("tooltips_class:spec");
                F = F ? F.split(":") : null;
                var W = /(&|\?)class=(\d+)/.exec(location.href);
                if (W) {
                    F = [W[2], 0]
                }
                var A = /(&|\?)spec=(\d+)/.exec(location.href);
                var L, m;
                if (A) {
                    L = A[2];
                    m = WH.Wow.PlayerClass.getBySpec(L);
                    if (m) {
                        F = [m, L]
                    }
                }
                if (F && F.length == 2) {
                    N = WH.classSpecBtnOnChange.call(this, F[0], F[1], N, true)
                } else {
                    $(this._classSpecBtn).text(WH.isRetailTree() ? WH.TERMS.chooseaspec_stc : WH.TERMS.chooseAClass_stc)
                }
            }
        }
        if (u[O] && WH.bonusesBtnShouldShow(u[O].bonusesData)) {
            var c = $("#bs" + O);
            if (c && !this._bonusesBtn) {
                var h = WH.ce("label");
                h.innerHTML = WH.TERMS.itembonuses + ": ";
                this._bonusesBtn = WH.ce("a");
                this._bonusesBtn.ttId = O;
                this._bonusesBtn.menu = WH.bonusesBtnBuildMenu.call(this, u[O]);
                Menu.add(this._bonusesBtn, this._bonusesBtn.menu);
                $(this._bonusesBtn).text(WH.TERMS.selectbonus_stc);
                c.append(h).append(this._bonusesBtn).show();
                if (J !== "") {
                    WH.bonusesBtnOnChange.call(this, J, true)
                }
            }
        }
        (function () {
            let craftedStatDiv = WH.ge("craftedStatsSelector" + O);
            if (!u[O] || !craftedStatDiv || craftedStatDiv.dataset.initialized) {
                return
            }
            const ac = this;
            let statSlots = 0;
            let anchor;
            let toggleCraftedStat = function (ad) {
                let currentStats = getCraftedStats();
                let pos = currentStats.indexOf(ad);
                if (pos >= 0) {
                    currentStats.splice(pos, 1)
                } else {
                    currentStats.push(ad);
                    currentStats = currentStats.slice(-1 * statSlots)
                }
                WH.Url.replacePageQuery(function (ae) {
                    if (currentStats.length) {
                        ae["crafted-stats"] = currentStats.join(":")
                    } else {
                        delete ae["crafted-stats"]
                    }
                });
                updateAnchor();
                if (u[O]["tooltip_" + Locale.getName()]) {
                    let J = this._bonusesBtn && this._bonusesBtn.selectedBonus ? this._bonusesBtn.selectedBonus : null;
                    let tooltipStr = WH.enhanceTooltip.call(this, O, true, true, false, null, this._knownSpells, WH.ge("ks" + O), S, null, null, true, null, null, J);
                    WH.updateTooltip.call(this, tooltipStr)
                }
            };
            let updateAnchor = function () {
                let text = "";
                let currentStats = getCraftedStats();
                if (!currentStats.length) {
                    text = WH.TERMS.none
                } else {
                    currentStats.forEach(function (ad) {
                        text += (text ? " + " : "") + LANG.traits[WH.statToJson[ad]][0]
                    })
                }
                WH.st(anchor, text)
            };
            craftedStatDiv.dataset.initialized = 1;
            let statsInfo = u[O].jsonequip && u[O].jsonequip.statsInfo || {};
            WH.Wow.Item.Stat.CRAFTING_STAT_FROM.forEach(function (ad) {
                if (statsInfo.hasOwnProperty(ad)) {
                    statSlots++
                }
            });
            if (!statSlots) {
                return
            }
            WH.displayDefault(craftedStatDiv);
            WH.ae(craftedStatDiv, WH.ce("label", {}, WH.ct(WH.TERMS.optionalReagentStats + WH.TERMS.colon_punct)));
            anchor = WH.ce("a", {}, WH.ct(WH.TERMS.none));
            WH.ae(craftedStatDiv, anchor);
            let menu = [];
            WH.Wow.Item.Stat.CRAFTING_STAT_TO.forEach(function (ad) {
                menu.push(Menu.createItem({
                    label: LANG.traits[WH.statToJson[ad]][0],
                    name: ad,
                    url: toggleCraftedStat.bind(ac, ad),
                    options: {
                        checkedFunc: function (ae) {
                            return getCraftedStats().includes(parseInt(ae[Menu.ITEM_NAME]))
                        }
                    }
                }))
            });
            menu.sort(function (ae, ad) {
                return ae[Menu.ITEM_LABEL].localeCompare(ad[Menu.ITEM_LABEL])
            });
            Menu.add(anchor, menu);
            updateAnchor()
        }).call(this);
        if (n === WH.Types.ITEM) {
            WH.updateItemStringLink.call(this)
        }
        return N
    };
    WH.groupSizeScalingShouldShow = function (a) {
        if (WH.isSet("g_difficulties") && WH.isSet("g_spells") && g_spells[a] && g_spells[a].difficulties && g_spells[a].difficulties.length > 0) {
            return g_spells[a].difficulties[0]
        }
        return false
    };
    WH.groupSizeScalingSliderMove = function (f, d, b) {
        var a = WH.getDataSource();
        var c = WH.isSet("g_pageInfo") ? g_pageInfo.typeId : null;
        if (!a[c]) {
            return
        }
        let dd = this._difficultyBtn.selectedDD;
        let ddSize = b.value;
        WH.Url.replacePageQuery(function (e) {
            if (dd != WH.groupSizeScalingShouldShow(c) || ddSize != g_difficulties[WH.groupSizeScalingShouldShow(c)].maxplayers) {
                e.dd = dd;
                e.ddsize = ddSize
            } else {
                delete e.dd;
                delete e.ddsize
            }
        });
        WH.groupSizeScalingOnChange.call(this, this, b.value, 0);
        if (this.bufftip) {
            WH.groupSizeScalingOnChange.call(this, this.bufftip, b.value, 1)
        }
        WH.Tooltip.hide()
    };
    WH.groupSizeScalingOnChange = function (a, c, m, n) {
        const o = this;
        while (a.className.indexOf("tooltip") == -1) {
            a = a.parentNode
        }
        c = parseInt(c);
        if (isNaN(c)) {
            return
        }
        var f = WH.getDataSource();
        var h = WH.isSet("g_pageInfo") ? g_pageInfo.typeId : null;
        if (!f[h]) {
            return
        }
        var e = this._difficultyBtn.selectedDD;
        var k = Locale.getName();
        var d = "server_" + (m ? "buff_" : "tooltip_") + k;
        var l = "dd" + e + "ddsize" + c;
        WH.groupSizeScalingOnChange.lastCall = l;
        if (!f[h][d]) {
            f[h]["server_tooltip_" + k] = {};
            f[h]["server_buff_" + k] = {};
            var b = "dd" + f[h].initial_dd + "ddsize" + f[h].initial_ddSize;
            f[h]["server_tooltip_" + k][b] = f[h]["tooltip_" + k];
            f[h]["server_buff_" + k][b] = f[h]["buff_" + k]
        }
        if (f[h][d][l]) {
            var g = f[h][d][l];
            if (n) {
                return g
            }
            WH.updateTooltip.call(a, g);
            return
        }
        if (n) {
            return f[h][d.substr(7)]
        }
        if (m) {
            return
        }
        if (f[h][d].hasOwnProperty(l)) {
            return
        }
        f[h][d][l] = "";
        var j = "/spell=" + h + "&dd=" + e + "&ddsize=" + c;
        if (WH.isBeta() || WH.isPtr()) {
            j += "&" + WH.getDataBuild()
        }
        WH.xhrJsonRequest(j, (function (p) {
            if (!p) {
                return
            }
            f[h]["server_tooltip_" + k][l] = p.tooltip;
            f[h]["server_buff_" + k][l] = p.buff;
            if (WH.groupSizeScalingOnChange.lastCall === l) {
                WH.groupSizeScalingOnChange.call(o, a, c);
                if (o.bufftip) {
                    WH.groupSizeScalingOnChange.call(o, o.bufftip, c, true)
                }
            }
        }))
    };
    WH.difficultyBtnBuildMenu = function (f) {
        var e = [];
        var a = g_spells[f];
        for (var d = 0; d < a.difficulties.length; ++d) {
            var c = a.difficulties[d];
            var b = [c, g_difficulty_names[c], WH.difficultyBtnOnChange.bind(this, c, false)];
            e.push(b)
        }
        this._difficultyBtn.menu = e
    };
    WH.difficultyBtnOnChange = function (b, d) {
        this._difficultyBtn.selectedDD = b;
        $(this._difficultyBtn).text("");
        WH.arrayWalk(this._difficultyBtn.menu, function (j) {
            j.checked = false
        });
        var h = Menu.findItem(this._difficultyBtn.menu, [b]);
        h.checked = true;
        $(this._difficultyBtn).text(h[MENU_IDX_LABEL]);
        var f = this._difficultyBtn.selectedPlayers || d;
        var e = g_difficulties[b].minplayers, a = g_difficulties[b].maxplayers, c = g_difficulties[b].maxplayers;
        if (f) {
            if (f > a) {
                c = a
            } else {
                if (f < e) {
                    c = e
                } else {
                    c = f
                }
            }
        }
        e = a;
        var g = $("#sl" + this._difficultyBtn.ttId);
        g.html("").hide();
        this.slider = null;
        if (e != a) {
            g.show();
            this.slider = Slider.init(g.get(0), {
                maxValue: parseInt(a),
                minValue: parseInt(e),
                onMove: WH.groupSizeScalingSliderMove.bind(this),
                title: WH.TERMS.players
            });
            Slider.setValue(this.slider, parseInt(c));
            this.slider.onmouseover = function (j) {
                WH.Tooltip.showAtCursor(j, WH.TERMS.dragtochangeplayers_stc, 0, 0, "q2")
            };
            this.slider.onmousemove = WH.Tooltip.cursorUpdate;
            this.slider.onmouseout = WH.Tooltip.hide;
            WH.Tooltip.simple(Slider.getInput(this.slider), WH.TERMS.clicktochangeplayers_stc, "q2")
        }
        WH.groupSizeScalingSliderMove.call(this, null, null, {value: c})
    };
    WH.classSpecBtnOnChange = function (e, a, d, b) {
        e = parseInt(e);
        a = a ? parseInt(a) : null;
        WH.ee(this._classSpecBtn);
        this._classSpecBtn.selectedSpec = a;
        let menuItem = Menu.findItem(this._classSpecBtn.menu, [e, a]);
        if (menuItem && menuItem[Menu.ITEM_OPTIONS] && menuItem[Menu.ITEM_OPTIONS].tinyIcon) {
            let tinyIcon = menuItem[Menu.ITEM_OPTIONS].tinyIcon;
            let icon = WH.Icon.create(tinyIcon, WH.Icon.SMALL, "javascript:");
            icon.style.display = "inline-block";
            icon.style.verticalAlign = "middle";
            WH.ae(this._classSpecBtn, icon)
        }
        let specName = WH.Wow.PlayerClass.Specialization.getName(a);
        WH.ae(this._classSpecBtn, WH.ce("span", undefined, WH.ct(" " + ((!WH.isRetailTree() || !specName) ? WH.Wow.PlayerClass.getName(e) : WH.Strings.sprintf(WH.TERMS.specclass_format, specName, WH.Wow.PlayerClass.getName(e))))));
        if (!b) {
            WH.LocalStorage.set("tooltips_class:spec", e + ":" + a)
        }
        var c = d ? d : this.innerHTML;
        c = c.replace(/<!--scstart(\d+):(\d+)--><span class="q(\d+)">(<!--asc\d+-->)?(.*?)<\/span><!--scend-->/i, function (l, h, j, g, k, f) {
            g = 1;
            var n = h == 2 && (!g_classes_allowed_weapon[e] || WH.inArray(g_classes_allowed_weapon[e], j) == -1);
            var m = h == 4 && (!g_classes_allowed_armor[e] || WH.inArray(g_classes_allowed_armor[e], j) == -1);
            if (n || m) {
                g = 10
            }
            return "<!--scstart" + h + ":" + j + '--><span class="q' + g + '">' + (k ? k : "") + f + "</span><!--scend-->"
        });
        if (WH.isRetailTree()) {
            c = c.replace(/<span[^>]*?><!--stat(\d+)-->([-+][\d\.,]+(?:-[\d\.,]+)?)(\D*?)<\/span>/gi, function (k, j, g, f) {
                let div = WH.ce("div", {innerHTML: k});
                let span = WH.qs("span", div);
                span.classList.remove("q0", "q2");
                j = parseInt(j);
                if (j === 50) {
                    span.classList.add("q2")
                }
                if (g_grayedOutStats[j] && (g_grayedOutStats[j].indexOf(a) != -1)) {
                    span.classList.remove("q2");
                    span.classList.add("q0")
                }
                let realStatId = a ? WH.getStatForSpec(j, a) : WH.getStatForClass(j, e);
                if (realStatId !== j && WH.statToJson[realStatId]) {
                    var h = LANG.traits[WH.statToJson[realStatId]];
                    if (h) {
                        f = " " + h[1]
                    }
                }
                span.innerHTML = "<!--stat" + j + "-->";
                WH.ae(span, WH.ct(g + f));
                return span.outerHTML
            });
            c = c.replace(/(<!--traitspecstart:(\d+)(?::(\d+))?-->)[\w\W]*?(<!--traitspecend-->)/g, function (k, j, f, h, g) {
                var l = "";
                if (WH.isSet("g_pageInfo") && g_pageInfo.hasOwnProperty("typeId") && g_pageInfo.type == 3 && g_items.hasOwnProperty(g_pageInfo.typeId) && g_items[g_pageInfo.typeId].hasOwnProperty("affectsArtifactPowerTypesData") && g_items[g_pageInfo.typeId].affectsArtifactPowerTypesData.hasOwnProperty(f) && g_items[g_pageInfo.typeId].affectsArtifactPowerTypesData[f].hasOwnProperty(a)) {
                    l = g_items[g_pageInfo.typeId].affectsArtifactPowerTypesData[f][a]
                } else {
                    if (h) {
                        l = '<span style="color: #00FF00">' + WH.sprintf(LANG["tooltip_relicrank" + (h > 1 ? "s" : "") + "increase"].replace("%d", "$1"), h) + ": </span>" + WH.TERMS.relic_minortrait
                    }
                }
                return j + l + g
            })
        }
        WH.Url.replacePageQuery(function (f) {
            if (e) {
                f["class"] = e
            } else {
                delete f["class"]
            }
            if (WH.isRetailTree() && a) {
                f.spec = a
            } else {
                delete f.spec
            }
        });
        if (!d) {
            this.innerHTML = WH.Tooltip.evalFormulas(c)
        }
        return c
    };
    WH.classSpecBtnBuildMenu = function (k) {
        var d = [];
        if (!WH.isRetailTree()) {
            d.push([, WH.TERMS.chooseAClass_stc]);
            var j = Menu.findItem(mn_spells, [7]);
            d = d.concat($.extend(true, [], Menu.getSubmenu(j)))
        } else {
            d.push([, WH.TERMS.chooseaspec_stc]);
            var o = Menu.findItem(mn_spells, [-12]);
            d = d.concat($.extend(true, [], Menu.getSubmenu(o)))
        }
        for (var l in g_chr_specs_by_class) {
            var f = g_chr_specs_by_class[l];
            for (var n in d) {
                var b = d[n];
                if (b[Menu.ITEM_NAME] == l) {
                    if (!WH.isRetailTree()) {
                        b[Menu.ITEM_URL] = WH.classSpecBtnOnChange.bind(this, l, 0, false)
                    } else {
                        if (b[Menu.ITEM_URL]) {
                            b[Menu.ITEM_URL] = null
                        }
                        for (var e = 0, m = f.length; e < m; e++) {
                            var a = Menu.getSubmenu(d[n]);
                            for (var g = 0, c = a.length; g < c; g++) {
                                var h = a[g];
                                if (h[Menu.ITEM_NAME] == f[e]) {
                                    if (k && (WH.inArray(k, f[e]) < 0)) {
                                        delete h[Menu.ITEM_OPTIONS].tinyIcon;
                                        h[Menu.ITEM_OPTIONS].className = "q0";
                                        h[Menu.ITEM_URL] = "javascript:"
                                    } else {
                                        h[Menu.ITEM_URL] = WH.classSpecBtnOnChange.bind(this, l, f[e], false)
                                    }
                                    break
                                }
                            }
                        }
                    }
                    break
                }
            }
        }
        this._classSpecBtn.menu = d
    };
    WH.getStatForClass = function (a, b) {
        let potentialStat = undefined;
        let specIds = WH.Wow.PlayerClass.Specialization.getByClass(b) || [];
        for (let i = 0, specId; specId = specIds[i]; i++) {
            let specStat = WH.getStatForSpec(a, specId);
            if (potentialStat === undefined) {
                potentialStat = specStat
            } else {
                if (potentialStat !== specStat) {
                    potentialStat = null;
                    break
                }
            }
        }
        return potentialStat
    };
    WH.getStatForSpec = function (d, m) {
        var a = 3;
        var n = 4;
        var h = 5;
        var b = 71;
        var j = 72;
        var f = 73;
        var g = 74;
        var c;
        var e;
        var l = g_specPrimaryStatOrders[m];
        var k = g_specPrimaryStatOrders[m].length;
        if (d === b) {
            e = 0;
            if (!k) {
                return h
            }
            while (1) {
                c = l[e];
                if (c >= a && c <= h) {
                    break
                }
                e++;
                if (e >= k) {
                    return h
                }
            }
        } else {
            if (d !== j) {
                if (d !== f) {
                    if (d !== g) {
                        return d
                    }
                    e = 0;
                    if (k) {
                        while (1) {
                            c = l[e];
                            if (c >= n && c <= h) {
                                break
                            }
                            e++;
                            if (e >= k) {
                                return h
                            }
                        }
                        return c
                    }
                    return h
                }
                e = 0;
                if (k) {
                    while (1) {
                        c = l[e];
                        if (l[e] === a) {
                            break
                        }
                        if (l[e] === h) {
                            break
                        }
                        e++;
                        if (e >= k) {
                            return h
                        }
                    }
                    return c
                }
                return h
            }
            e = 0;
            if (!k) {
                return a
            }
            while (1) {
                c = l[e];
                if (c >= a && c <= n) {
                    break
                }
                e++;
                if (e >= k) {
                    return a
                }
            }
        }
        return c
    };
    WH.bonusesBtnShouldShow = function (a) {
        for (var b in a) {
            if (a.hasOwnProperty(b)) {
                return true
            }
        }
        return false
    };
    WH.bonusesBtnBuildMenu = function (a) {
        let menuItems = [];
        let bonusesData = a.bonusesData;
        if (bonusesData) {
            for (let bonusId in bonusesData) {
                if (!bonusesData.hasOwnProperty(bonusId)) {
                    continue
                }
                let isGroupedUpgrade = bonusesData[bonusId].groupedUpgrade;
                let bName = WH.getItemBonusName.call(this, bonusId, a);
                let menuItem = Menu.createItem({
                    name: bonusId,
                    label: bName,
                    url: WH.bonusesBtnOnChange.bind(this, (isGroupedUpgrade ? "u:" : "") + bonusId, false)
                });
                if (typeof isGroupedUpgrade == "undefined") {
                    for (let chanceBonusId in bonusesData[bonusId].sub) {
                        if (!bonusesData[bonusId].sub.hasOwnProperty(chanceBonusId)) {
                            continue
                        }
                        isGroupedUpgrade = bonusesData[bonusId].sub[chanceBonusId].groupedUpgrade;
                        bName = WH.getItemBonusName.call(this, chanceBonusId, a, bonusId);
                        if (bName === "???") {
                            continue
                        }
                        let subMenuItem = Menu.createItem({
                            name: chanceBonusId,
                            label: bName,
                            url: WH.bonusesBtnOnChange.bind(this, bonusId + ":" + (isGroupedUpgrade ? "u:" : "") + chanceBonusId, false, true)
                        });
                        Menu.addToSubmenu(menuItem, subMenuItem)
                    }
                }
                let submenu = Menu.getSubmenu(menuItem);
                if (submenu) {
                    submenu.sort(function (d, c) {
                        let typeA = WH.getItemBonusChanceType(d[Menu.ITEM_NAME]);
                        let typeB = WH.getItemBonusChanceType(c[Menu.ITEM_NAME]);
                        return WH.stringCompare(typeA, typeB) || WH.stringCompare(d[Menu.ITEM_LABEL], c[Menu.ITEM_LABEL])
                    });
                    let chanceHeadings = [];
                    let prevType = 0;
                    for (let i = 0; i < submenu.length; ++i) {
                        let chanceBonusId = submenu[i][Menu.ITEM_NAME];
                        if (chanceBonusId && bonusesData[bonusId].sub[chanceBonusId].type !== prevType) {
                            prevType = bonusesData[bonusId].sub[chanceBonusId].type;
                            let chanceHeader = WH.TERMS.unknown;
                            switch (prevType) {
                                case 1:
                                    chanceHeader = WH.TERMS.upgrades;
                                    break;
                                case 2:
                                    chanceHeader = WH.TERMS.stats;
                                    break;
                                case 4:
                                    chanceHeader = WH.TERMS.sockets;
                                    break;
                                default:
                                    break
                            }
                            chanceHeadings.push({index: i, name: chanceHeader})
                        }
                    }
                    for (let i = 0; i < chanceHeadings.length; ++i) {
                        let newPos = chanceHeadings[i].index + i;
                        let newSubItem = Menu.createItem({label: chanceHeadings[i].name, options: {heading: true}});
                        submenu.splice(newPos, 0, newSubItem)
                    }
                }
                menuItems.push(menuItem)
            }
            let nameCount = {};
            for (let i = 0, menuItem; menuItem = menuItems[i]; i++) {
                if (nameCount.hasOwnProperty(menuItem[Menu.ITEM_LABEL])) {
                    let count = ++nameCount[menuItem[Menu.ITEM_LABEL]];
                    menuItem[Menu.ITEM_LABEL] = WH.term("parens_format", menuItem[Menu.ITEM_LABEL], count)
                } else {
                    nameCount[menuItem[Menu.ITEM_LABEL]] = 1
                }
            }
            menuItems.sort(function (d, c) {
                return WH.stringCompare(d[Menu.ITEM_LABEL].innerText || d[Menu.ITEM_LABEL], c[Menu.ITEM_LABEL].innerText || c[Menu.ITEM_LABEL])
            })
        }
        let menu = [Menu.createItem({label: WH.TERMS.selectbonus_stc, options: {heading: true}})];
        if (menuItems.length > 0) {
            menu = menu.concat(menuItems)
        }
        return menu
    };
    WH.getItemBonusChanceType = function (f) {
        var e = 0;
        if (f > 0 && WH.isSet("g_itembonuses") && g_itembonuses && g_itembonuses[f]) {
            var a = g_itembonuses[f];
            for (var c = 0; c < a.length; ++c) {
                var b = a[c];
                var d = 0;
                switch (b[0]) {
                    case 1:
                    case 3:
                    case 4:
                    case 5:
                    case 11:
                        d = 1;
                        break;
                    case 2:
                        d = 2;
                        break;
                    case 6:
                        d = 4;
                        break;
                    default:
                        break
                }
                if (d && (!e || d < e)) {
                    e = d
                }
            }
        }
        return e
    };
    WH.getItemBonusUpgradeType = function (d) {
        if (d > 0 && WH.isSet("g_itembonuses") && g_itembonuses && g_itembonuses[d]) {
            var a = g_itembonuses[d];
            for (var c = 0; c < a.length; ++c) {
                var b = a[c];
                switch (b[0]) {
                    case 3:
                    case 4:
                    case 5:
                    case 11:
                        return 1 << b[0];
                    default:
                        break
                }
            }
        }
        return 0
    };
    WH.getItemBonusName = function (g, p, f) {
        var h = "";
        var c = p.level;
        let hasCorruptionResist = false;
        if (f && WH.isSet("g_itembonuses") && f > 0 && g_itembonuses[f]) {
            for (var d = 0; d < g_itembonuses[f].length; ++d) {
                var l = g_itembonuses[f][d];
                if (l[0] == 1) {
                    c += l[1]
                }
            }
        }
        if (WH.isSet("g_itembonuses") && g > 0 && g_itembonuses[g]) {
            var e = g_itembonuses[g].slice();
            e.sort(function (q, j) {
                return q[0] - j[0]
            });
            var a = "";
            var o = "";
            let desc = "";
            let suffix = "";
            let effectName = "";
            for (var d = 0; d < e.length; ++d) {
                var l = e[d];
                switch (l[0]) {
                    case 1:
                        a = WH.TERMS.itemlevel + " " + (c + l[1]);
                        break;
                    case 2:
                        h += (h ? " / " : "") + ((WH.statToJson[l[1]] && LANG.traits[WH.statToJson[l[1]]]) ? LANG.traits[WH.statToJson[l[1]]][1] : "Unknown stat");
                        if (l[1] == 23) {
                            h += " " + l[2];
                            hasCorruptionResist = true
                        }
                        break;
                    case 3:
                        o = l[1];
                        break;
                    case 4:
                        desc = WH.Wow.Item.getNameDescription(l[1]) || desc;
                        break;
                    case 5:
                        suffix = WH.Wow.Item.getNameDescription(l[1]) || suffix;
                        break;
                    case 6:
                        var k = l[2];
                        h += (h ? " / " : "") + l[1] + " " + (g_socket_names[k] || (g_gem_types[k] ? WH.sprintf(WH.TERMS.emptyrelicslot_format.replace("%s", "$1"), g_gem_types[k]) : "Unknown Socket"));
                        break;
                    case 8:
                        h += (h ? " / " : "") + WH.sprintf(WH.TERMS.requireslevel_format.replace("%s", "$1"), p.reqlevel + l[1]);
                        break;
                    case 11:
                        if (p.heirloombonuses) {
                            var m = "?";
                            for (var b = 0, n; n = p.heirloombonuses[b]; b++) {
                                if (parseInt(g) === n) {
                                    m = b + 1;
                                    break
                                }
                            }
                            h += (h ? " / " : "") + WH.sprintf(WH.TERMS.heirloomupgradejs_format, m)
                        }
                        break;
                    case 13:
                        a = WH.TERMS.scaleswithlevel_stc;
                        break;
                    case 14:
                        if (p.actualBonusLevels && p.actualBonusLevels[g]) {
                            a = WH.TERMS.itemlevel + " " + p.actualBonusLevels[g] + "+"
                        } else {
                            a = WH.TERMS.itemlevel + " " + c + "+"
                        }
                        break;
                    case 23:
                        if (l[1] > 0) {
                            effectName = WH.Tooltip.ITEM_EFFECT_NAMES[l[1]] || ""
                        }
                        break;
                    default:
                        break
                }
            }
            if (hasCorruptionResist && !a && c) {
                a = WH.TERMS.itemlevel + WH.TERMS.wordspace_punct + c
            }
            if (a) {
                h = h ? a + " / " + h : a
            }
            desc += suffix ? WH.TERMS.wordspace_punct + suffix : "";
            h += desc ? " / " + desc : "";
            if (effectName && !hasCorruptionResist) {
                h = effectName + (h ? " / " + h : "")
            }
            h += (o && p.quality != o) ? " / " + WH.Wow.Item.getQualityName(o) : "";
            if (h.substr(0, 3) == " / ") {
                h = h.substr(3)
            }
        } else {
            if (g == "0") {
                h = WH.TERMS.normal
            }
        }
        return h ? h : (f ? WH.TERMS.openparenthesis_punct + g + WH.TERMS.closedparenthesis_punct : WH.TERMS.normal)
    };
    WH.bonusesBtnGetContextBonusId = function (a) {
        let contextBonusId = 0;
        let itemBonusesListGroup = WH.getPageData("WH.Wow.Item.Bonuses.listGroup");
        if (a && a.length) {
            for (let i = 0; i < a.length; ++i) {
                let bonusId = parseInt(a[i]);
                if ((window.g_itembonuses && g_itembonuses["-1"] && g_itembonuses["-1"].includes(bonusId)) || (itemBonusesListGroup !== null && itemBonusesListGroup.includes(bonusId))) {
                    contextBonusId = a[i];
                    break
                }
            }
        }
        return contextBonusId
    };
    WH.bonusesBtnIsComboValid = function (g, d, h) {
        if (!g[d] || !g[d].sub) {
            return false
        }
        var e = g[d].sub;
        var f = 32768;
        var c = 32768;
        for (var a in h) {
            var j = h[a];
            if (j != d) {
                if (e[j]) {
                    if ((f & e[j].type) == 1) {
                    } else {
                        if (f & e[j].type) {
                            f = false;
                            break
                        } else {
                            f |= e[j].type
                        }
                    }
                    if (c & e[j].upgradeType) {
                        c = false;
                        break
                    } else {
                        c |= e[j].upgradeType
                    }
                } else {
                    f = false;
                    break
                }
            }
        }
        return f && c
    };
    WH.bonusesGetItem = function () {
        var a = WH.getDataSource();
        var b = this._bonusesBtn.ttId;
        return a[b]
    };
    WH.bonusesGetDefaultAdjustmentBonus = function (c) {
        var b = WH.bonusesGetItem.call(this);
        var a = WH.bonusesBtnGetContextBonusId(c);
        if (b.defaultAdjustmentBonuses[a]) {
            return b.defaultAdjustmentBonuses[a].toString()
        }
        return null
    };
    WH.bonusesBtnOnChange = function (K, U, b) {
        var w = WH.getDataSource();
        var z = this._bonusesBtn.ttId;
        var J = w[z].bonusesData;
        if (b === true) {
            var e = K.split(":");
            var B = 0;
            var t = e.indexOf("u");
            if (t != -1) {
                B = e[t + 1];
                e.splice(t, 1)
            }
            var l = e[0];
            var G = !Menu.findItem(this._bonusesBtn.menu, e).checked;
            var N = 0;
            var o = [];
            WH.arrayWalk(this._bonusesBtn.menu, function (aa) {
                if (aa.checked) {
                    N = aa[MENU_IDX_NAME];
                    var j = Menu.getSubmenu(aa);
                    if (j) {
                        WH.arrayWalk(j, function (ab) {
                            if (ab[MENU_IDX_NAME] && ab.checked) {
                                o.push(ab[MENU_IDX_NAME]);
                                if (N == l && J[N].sub[ab[MENU_IDX_NAME]].groupedUpgrade && !B) {
                                    B = ab[MENU_IDX_NAME]
                                }
                            }
                        })
                    }
                }
            });
            var d;
            if (N == l) {
                if (G) {
                    d = o.concat(e)
                } else {
                    o.splice(o.indexOf(e[1]), 1);
                    d = o.concat([l])
                }
            } else {
                d = e
            }
            d.sort(function (aa, j) {
                return aa - j
            });
            if (!WH.bonusesBtnIsComboValid(J, l, d)) {
                d = e;
                var C = J[l].sub[e[1]].type;
                var I = J[l].sub[e[1]].upgradeType;
                for (var W = 0; W < o.length; ++W) {
                    if (C != J[l].sub[o[W]].type) {
                        d.push(o[W])
                    } else {
                        if (I != J[l].sub[o[W]].upgradeType) {
                            d.push(o[W])
                        }
                    }
                }
                d.sort(function (aa, j) {
                    return aa - j
                })
            }
            if (B) {
                var D = d.indexOf(B);
                if (D != -1) {
                    d.splice(d.indexOf(B), 0, "u")
                }
            }
            K = d.join(":").replace(/^0:/, "")
        }
        this._bonusesBtn.selectedBonus = K;
        var F = this._bonusesBtn.selectedBonus.split(":");
        var O = WH.bonusesGetDefaultAdjustmentBonus.call(this, F);
        if (O != null) {
            var M = false;
            for (var W in F) {
                var r = F[W];
                if (1372 <= r && r <= 1672) {
                    M = true
                }
            }
            if (!M) {
                F.push(O);
                this._bonusesBtn.selectedBonus = F.join(":")
            }
        }
        var t = F.indexOf("u");
        if (t != -1) {
            F.splice(t, 1)
        }
        var q = [];
        for (var W = 0; W < this._bonusesBtn.menu.length; W++) {
            var u = this._bonusesBtn.menu[W][MENU_IDX_NAME];
            if (u && q.indexOf(u) < 0) {
                q.push(u)
            }
        }
        F.sort(function (aa, j) {
            return (q.indexOf(aa) < 0 ? 1 : -1) - (q.indexOf(j) < 0 ? 1 : -1)
        });
        $(this._bonusesBtn).html("");
        var n = WH.bonusesBtnGetContextBonusId(F);
        WH.arrayWalk(this._bonusesBtn.menu, function (aa) {
            aa.checked = aa[MENU_IDX_NAME] == n;
            var j = Menu.getSubmenu(aa);
            if (j) {
                WH.arrayWalk(j, function (ab) {
                    if (ab[MENU_IDX_NAME]) {
                        ab.checked = aa.checked && F.indexOf(ab[MENU_IDX_NAME]) != -1;
                        if (ab.$a) {
                            ab[MENU_IDX_OPT] = null;
                            Menu.updateItem(ab)
                        }
                    }
                })
            }
        });
        var Y = Menu.findItem(this._bonusesBtn.menu, [n]);
        if (Y) {
            var R = Menu.getSubmenu(Y);
            if (R) {
                WH.arrayWalk(R, function (aa) {
                    if (aa[MENU_IDX_NAME]) {
                        var j = F;
                        if (F.indexOf(aa[MENU_IDX_NAME]) == -1) {
                            j = j.concat([aa[MENU_IDX_NAME]])
                        }
                        j.sort(function (ac, ab) {
                            return ac - ab
                        });
                        if (!WH.bonusesBtnIsComboValid(J, n, j) && F.indexOf(O) == -1) {
                            aa[MENU_IDX_OPT] = {"class": "q0"}
                        } else {
                            aa[MENU_IDX_OPT] = {}
                        }
                        Menu.updateItem(aa)
                    }
                })
            }
        }
        var s = (Y && Y[MENU_IDX_LABEL]) || WH.getItemBonusName.call(this, n, w[z]);
        for (var W = 0; W < F.length; ++W) {
            if (F[W] != n && F[W] != O) {
                s += " + " + WH.getItemBonusName.call(this, F[W], w[z], n)
            }
        }
        $(this._bonusesBtn).append(s);
        var p = 0;
        if (WH.isSet("g_itembonuses") && g_items && g_items[z]) {
            for (var W in F) {
                var m = F[W];
                if (g_itembonuses[m]) {
                    for (var V = 0; V < g_itembonuses[m].length; ++V) {
                        var A = g_itembonuses[m][V];
                        if (A[0] == 7 && g_items[z].appearances && g_items[z].appearances[A[1]]) {
                            p = g_items[z].appearances[A[1]][0];
                            break
                        }
                    }
                }
            }
        }
        var P = $("#e8c7e052e3e0");
        if (P.length > 0) {
            var k = P.get(0).attributes.onclick.value;
            var g = new RegExp("\\(this, " + z + ", \\[[^\\]]*?],");
            if (g.test(k)) {
                var L = [];
                for (var f in F) {
                    var h = F[f];
                    if (h == 0) {
                        L.push(h);
                        continue
                    }
                    var T = WH.isSet("g_itembonuses") && g_itembonuses[h] ? g_itembonuses[h] : [];
                    for (var v in T) {
                        if (!T.hasOwnProperty(v)) {
                            continue
                        }
                        var Z = T[v][0];
                        var E = T[v][1];
                        if (WH.inArray([1, 2, 6, 14], Z) != -1) {
                            if (Z == 2 && WH.inArray([61, 62, 63, 64, 66], E) != -1) {
                                continue
                            }
                            L.push(h)
                        }
                    }
                }
                P.get(0).attributes.onclick.value = k.replace(g, "(this, " + z + ", [" + L.join(",") + "],")
            }
        }
        var X = $("#ic" + z);
        if (X.length > 0 && g_items) {
            var S = g_items.getIcon(z, F);
            if (S) {
                X[0].removeChild(X[0].firstChild);
                X[0].appendChild(Icon.create(S, 2))
            }
        }
        var a = $("#wh-mv-view-in-3d-button")[0];
        if (a) {
            if (!a.dataset.mvDisplayIdOrig && a.dataset.mvDisplayId) {
                a.dataset.mvDisplayIdOrig = a.dataset.mvDisplayId
            }
            if (!p && a.dataset.mvDisplayIdOrig) {
                p = a.dataset.mvDisplayIdOrig
            }
            if (p) {
                let gathered = WH.Gatherer.get(parseInt(a.dataset.mvType), parseInt(a.dataset.mvTypeId));
                let raceMask = gathered && gathered.jsonequip && gathered.jsonequip.races;
                let raceId = WH.Wow.Models.getRaceIdFromMask(raceMask);
                if (gathered.classs !== WH.Wow.Item.CLASS_ARMOR) {
                    raceId = undefined
                }
                a.attributes.onclick.value = a.attributes.onclick.value.replace(/"displayId":\d+/, '"displayId":' + p);
                a.dataset.mvDisplayId = p;
                let stickyImg = WH.ge("sticky-screenshot-model-substitute");
                if (stickyImg) {
                    stickyImg.src = WH.Wow.Item.getThumbUrl(parseInt(p), raceId)
                }
            }
        }
        let bonusForUrl = this._bonusesBtn.selectedBonus.replace(/u:/, "");
        WH.Url.replacePageQuery(function (j) {
            if (bonusForUrl) {
                j.bonus = bonusForUrl
            } else {
                delete j.bonus
            }
        });
        WH.updateItemStringLink.call(this);
        if (!U && w[z]["tooltip_" + Locale.getName()]) {
            var c = WH.ge("sl" + z);
            c.innerHTML = "";
            this.slider = null;
            var Q = WH.enhanceTooltip.call(this, z, true, true, c, null, this._knownSpells, WH.ge("ks" + z), this._selectedUpgrade, null, null, true, null, null, this._bonusesBtn.selectedBonus);
            WH.updateTooltip.call(this, Q)
        }
    };
    WH.updateItemStringLink = function () {
        var a = WH.getDataSource();
        var k = WH.isSet("g_pageInfo") ? g_pageInfo.typeId : null;
        if (a[k]) {
            var n = "";
            var b = [];
            if (this._bonusesBtn && this._bonusesBtn.selectedBonus) {
                n = this._bonusesBtn.selectedBonus.replace(/u:/, "");
                b = n.split(":")
            }
            var h = (typeof this._selectedUpgrade == "number") ? this._selectedUpgrade : 0;
            var p = (a[k].upgradeData.length > 0) ? a[k].upgradeData[h].id : "";
            var s = this._selectedLevel ? this._selectedLevel : WH.maxLevel;
            var d = this._knowledgeLevel ? this._knowledgeLevel : 0;
            var o = (this._classSpecBtn && this._classSpecBtn.selectedSpec) ? this._classSpecBtn.selectedSpec : "";
            var g = 0;
            var j = "";
            if (p) {
                g |= 4;
                j = (j ? ":" : "") + p
            } else {
                if (b.length && g_itembonuses) {
                    bonus_check_block:for (var l = 0, e; e = b[l]; l++) {
                        if (!g_itembonuses[e]) {
                            continue
                        }
                        for (var c = 0, q; q = g_itembonuses[e][c]; c++) {
                            if (q[0] == 11 || q[0] == 13) {
                                g |= 512;
                                j = (j ? ":" : "") + s;
                                break bonus_check_block
                            }
                        }
                    }
                }
            }
            if (d) {
                g |= 8388608;
                j = (j ? ":" : "") + (d + 1)
            }
            var r = "" + (g ? g : "") + "::" + (b.length ? b.length + ":" : "") + n + ":" + j;
            var m = WH.ge("open-links-button");
            if (m) {
                var f = {
                    type: 3,
                    typeId: k,
                    linkColor: "ff" + WH.Wow.Item.getQualityColor(a[k].quality, true).replace(/^#/, ""),
                    linkId: "item:" + k + "::::::::" + s + ":" + o + ":" + r,
                    linkName: a[k]["name_" + Locale.getName()],
                    bonuses: b,
                    slot: a[k].slot
                };
                if (s != WH.maxLevel) {
                    f.lvl = s
                }
                if (o) {
                    f.spec = o
                }
                if (sliderControl = WH.ge("sl" + k)) {
                    f.dropLevel = $(sliderControl).find("input").val()
                }
                m.onclick = WH.Links.show.bind(WH.Links, m, f)
            }
        }
    };
    WH.upgradeItemTooltip = function (d, j) {
        var c = WH.getDataSource();
        var g = g_pageInfo.typeId;
        if (c[g]) {
            var e = $("#" + d.id + " > input");
            var a = null;
            if (typeof j != "number") {
                e.each(function (k, l) {
                    if (l.id.indexOf(j) != -1) {
                        a = l;
                        return false
                    }
                })
            } else {
                a = e.get(j - 1)
            }
            var h = a.checked;
            e.each(function (k, l) {
                l.checked = false
            });
            a.checked = h;
            if (!h) {
                j = null
            }
            this._selectedUpgrade = j;
            WH.updateItemStringLink.call(this);
            if (c[g]["tooltip_" + Locale.getName()]) {
                var f = this._bonusesBtn && this._bonusesBtn.selectedBonus ? this._bonusesBtn.selectedBonus : null;
                var b = WH.enhanceTooltip.call(this, g, true, true, false, null, this._knownSpells, WH.ge("ks" + g), j, null, null, true, null, null, f);
                WH.updateTooltip.call(this, b)
            }
        }
    };
    WH.updateTooltip = function (a) {
        if (this.classList.contains("partial-sub-tooltip")) {
            this.innerHTML = WH.Tooltip.evalFormulas(a);
            return
        }
        this.innerHTML = "<table><tr><td>" + WH.Tooltip.evalFormulas(a) + '</td><th style="background-position: top right"></th></tr><tr><th style="background-position: bottom left"></th><th style="background-position: bottom right"></th></tr></table>';
        WH.Tooltip.fixSafe(this, 1, 1)
    };
    WH.staticTooltipLevelClick = function (b, c, k, n) {
        while (b.className.indexOf("tooltip") == -1) {
            b = b.parentNode
        }
        var e = b.innerHTML;
        var l = e.match(/<!--i?\?(\d+):(\d+):(\d+):(\d+)/);
        if (!l && !WH.isRetailTree()) {
            l = e.match(/<!--ppl(\d+):(\d+):(\d+):(\d+):(\d+)/);
            if (l) {
                l = [null, l[1], l[2], WH.maxLevel, 0]
            }
        }
        if (!l) {
            return
        }
        var h = parseInt(l[1]), a = parseInt(l[2]), j = parseInt(l[3]), f = parseInt(l[4]);
        if (a >= j) {
            return
        }
        if (isNaN(c)) {
            c = prompt(WH.sprintf(WH.TERMS.ratinglevel_format, a, j), f)
        }
        c = parseInt(c);
        if (isNaN(c)) {
            return
        }
        if (c == f || c < a || c > j) {
            return
        }
        b._selectedLevel = c;
        var d = WH.getDataSource();
        l = (WH.setTooltipLevel.bind(b, d[h][(n ? "buff_" : "tooltip_") + Locale.getName()], c, n))();
        var g = b._bonusesBtn && b._bonusesBtn.selectedBonus ? b._bonusesBtn.selectedBonus : null;
        var m = b._selectedUpgrade ? b._selectedUpgrade : 0;
        l = WH.enhanceTooltip.call(b, l, true, null, null, null, null, null, m, null, null, null, null, null, g);
        WH.updateTooltip.call(b, l);
        if (b.slider && !k) {
            Slider.setValue(b.slider, c)
        }
        if (!n) {
            (WH.tooltipSpellsChange.bind(b))()
        }
    };
    WH.staticTooltipKnowledgeLevelClick = function (g, f, d) {
        while (g.className.indexOf("tooltip") == -1) {
            g = g.parentNode
        }
        var b = g.innerHTML;
        if (isNaN(f)) {
            WH.Tooltip.hide();
            f = prompt(WH.sprintf(WH.TERMS.ratinglevel_format, 0, g_artifact_knowledge_max_level), g._knowledgeLevel ? g._knowledgeLevel : 0)
        }
        f = parseInt(f);
        if (isNaN(f)) {
            return
        }
        if (f < 0 || f > g_artifact_knowledge_max_level) {
            return
        }
        g._knowledgeLevel = f;
        WH.Url.replacePageQuery(function (h) {
            if (f) {
                h.artk = f
            } else {
                delete h.artk
            }
        });
        var a = WH.getDataSource();
        b = (WH.setTooltipLevel.bind(g, a[d]["tooltip_" + Locale.getName()], g._selectedLevel, null))();
        var e = g._bonusesBtn && g._bonusesBtn.selectedBonus ? g._bonusesBtn.selectedBonus : null;
        var c = g._selectedUpgrade ? g._selectedUpgrade : 0;
        b = WH.enhanceTooltip.call(g, b, true, null, null, null, null, null, c, null, null, null, null, null, e);
        WH.updateTooltip.call(g, b)
    };
    WH.tooltipSliderMove = function (c, b, a) {
        WH.staticTooltipLevelClick(this, a.value, 1);
        if (this.bufftip) {
            WH.staticTooltipLevelClick(this.bufftip, a.value, 1, 1)
        }
        WH.Tooltip.hide()
    };
    WH.tooltipSpellsChange = function () {
        if (!this.modified) {
            return
        }
        var c = this.modified[0], a = this.modified[1], b = [];
        $.each($("input:checked", c), function (d, e) {
            b.push(parseInt(e.dataset.spellId))
        });
        $.each($("select option", c), function (e, d) {
            if (d.selected) {
                b.push(parseInt(d.value))
            }
        });
        this.modified[2] = b;
        this.innerHTML = WH.setTooltipSpells(this.innerHTML, b, a);
        if (this.bufftip) {
            (WH.tooltipSpellsChange.bind(this.bufftip))()
        }
    };
    WH.tooltipRPPMChange = function (b) {
        var a = $(this).attr("id").match(/\d+$/)[0];
        b.innerHTML = WH.Tooltip.evalFormulas(b.innerHTML.replace(/<!--rppm-->(\[?)(\d+(?:\.\d+)?)([^<]*)<!--rppm-->/, function (c, f, e, d) {
            return "<!--rppm-->" + f + (b._rppmModBase * (1 + parseFloat(b._rppmSpecModList[a].modifiervalue))).toFixed(2) + d + "<!--rppm-->"
        }))
    };
    WH.validateBpet = function (j, d) {
        var a = 1, h = 25, k = 25, b = 0, f = 4, e = 3, l = (1 << 10) - 1, c = 3, g = $.extend({}, d);
        if (j.minlevel) {
            a = j.minlevel
        }
        if (j.maxlevel) {
            h = j.maxlevel
        }
        if (j.companion) {
            h = a
        }
        if (!g.level) {
            g.level = k
        }
        g.level = Math.min(Math.max(g.level, a), h);
        if (j.minquality) {
            b = j.minquality;
            if (j.untameable) {
                f = b
            }
        }
        if (j.maxquality) {
            f = j.maxquality
        }
        if (g.quality == null) {
            g.quality = e
        }
        g.quality = Math.min(Math.max(g.quality, b), f);
        if (j.companion) {
            delete (g.quality)
        }
        if (j.breeds > 0) {
            l = j.breeds & l
        }
        if (!(l & (1 << c - 3))) {
            c = Math.floor(3 + Math.log(l) / Math.LN2)
        }
        if (g.breed && g.breed >= 13) {
            g.breed -= 10
        }
        if (!g.breed || !(l & (1 << g.breed - 3))) {
            g.breed = c
        }
        return g
    };
    WH.calcBattlePetStats = function (j, c, k, a, d) {
        if (!WH.battlePetBreedStats[c]) {
            c = 3
        }
        var h = j.health;
        if (isNaN(h)) {
            h = 0
        }
        var b = j.power;
        if (isNaN(b)) {
            b = 0
        }
        var f = j.speed;
        if (isNaN(f)) {
            f = 0
        }
        if (isNaN(k)) {
            k = 1
        }
        k = Math.min(Math.max(0, k), 5);
        if (isNaN(a)) {
            a = 1
        }
        a = Math.min(Math.max(1, a), 25);
        var e = WH.battlePetBreedStats[c];
        var g = 1 + (k / 10);
        h = ((h + e[0]) * 5 * a * g) + 100;
        b = (b + e[1]) * a * g;
        f = (f + e[2]) * a * g;
        if (d) {
            h = h * 5 / 6;
            b = b * 4 / 5
        }
        return {health: Math.round(h), power: Math.round(b), speed: Math.round(f)}
    };
    WH.battlePetBreedStats = {
        3: [0.5, 0.5, 0.5],
        4: [0, 2, 0],
        5: [0, 0, 2],
        6: [2, 0, 0],
        7: [0.9, 0.9, 0],
        8: [0, 0.9, 0.9],
        9: [0.9, 0, 0.9],
        10: [0.4, 0.9, 0.4],
        11: [0.4, 0.4, 0.9],
        12: [0.9, 0.4, 0.4]
    };
    WH.battlePetAbilityLevels = [1, 2, 4, 10, 15, 20];
    WH.Tooltip = {
        ARTIFACT_KNOWLEDGE_MULTIPLIERS: undefined,
        BONUS_ITEM_EFFECTS: undefined,
        ITEM_EFFECT_NAMES: undefined,
        ITEM_EFFECT_TOOLTIP_HTML: undefined,
        showingTooltip: false,
        create: function (j, l) {
            var g = WH.ce("div"), n = WH.ce("table"), c = WH.ce("tbody"), f = WH.ce("tr"), b = WH.ce("tr"),
                a = WH.ce("td"), m = WH.ce("th"), k = WH.ce("th"), h = WH.ce("th");
            g.className = "wowhead-tooltip";
            m.style.backgroundPosition = "top right";
            k.style.backgroundPosition = "bottom left";
            h.style.backgroundPosition = "bottom right";
            if (j) {
                a.innerHTML = WH.Tooltip.evalFormulas(j)
            }
            WH.ae(f, a);
            WH.ae(f, m);
            WH.ae(c, f);
            WH.ae(b, k);
            WH.ae(b, h);
            WH.ae(c, b);
            WH.ae(n, c);
            if (!l) {
                WH.Tooltip.icon = WH.ce("p");
                WH.Tooltip.icon.style.visibility = "hidden";
                WH.ae(WH.Tooltip.icon, WH.ce("div"));
                WH.ae(g, WH.Tooltip.icon)
            }
            WH.ae(g, n);
            if (!l) {
                var e = WH.ce("div");
                e.className = "wowhead-tooltip-powered";
                WH.ae(g, e);
                WH.Tooltip.logo = e
            }
            return g
        },
        getMultiPartHtml: function (b, a) {
            return "<table><tr><td>" + b + "</td></tr></table><table><tr><td>" + a + "</td></tr></table>"
        },
        evalFormulas: function (e) {
            if (typeof e !== "string") {
                return e
            }
            let exp = /<span class="wh-tooltip-formula" style="display:none">(\[[\w\W]*?\])<\/span>(?:\d+(?:\.\d+)?)?/g;
            e = e.replace(exp, "$1");
            var a = 0;
            var d = 0;
            var c = "";
            var g = 0;
            for (var f = 0; f < e.length; f++) {
                var b = e.substr(f, 1);
                switch (b) {
                    case"[":
                        a++;
                        d = 0;
                        c = "";
                        break;
                    case"]":
                        a--;
                        if (a < 0) {
                            a = 0
                        }
                        d = 0;
                        c = "";
                        break;
                    case"(":
                        if (a > 0) {
                            break
                        }
                        c += b;
                        d++;
                        break;
                    case")":
                        if (a > 0) {
                            break
                        }
                        if (d > 0) {
                            c += b;
                            d--
                        }
                        break;
                    default:
                        if (a == 0 && d > 0) {
                            c += b
                        }
                }
                if (a == 0 && d == 0 && c) {
                    g = f - c.length + 1;
                    if (/[^ ()0-9\+\*\/\.-]/.test(c.replace(/<!--[\w\W]*?-->/g, "").replace(/\b(floor|ceil|abs)\b/gi, ""))) {
                        c = "";
                        continue
                    }
                    if (/^\([0-9\.]*\)$/.test(c)) {
                        c = "";
                        continue
                    }
                    if (!/<!--[\w\W]*?-->/g.test(c)) {
                        c = "";
                        continue
                    }
                    e = e.substr(0, g) + "[" + e.substring(g, f + 1) + "]" + e.substr(f + 1);
                    f += 2;
                    c = ""
                }
            }
            e = e.replace(/\[([^\]]+)\]/g, function (j, l) {
                var h;
                l = l.replace(/<!--[\w\W]*?-->/g, "");
                l = l.replace(/\b(floor|ceil|abs)\b/gi, "Math.$1");
                try {
                    h = Function('"use strict";return (' + l + ")")()
                } catch (k) {
                    h = undefined
                }
                if (typeof h === "undefined") {
                    return j
                }
                return '<span class="wh-tooltip-formula" style="display:none">' + j + "</span>" + Math.abs(h).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")
            });
            return e
        },
        fix: function (k, b, d) {
            var j = WH.gE(k, "table")[0], f = WH.gE(j, "td")[0], g = f.childNodes;
            k.className = WH.trim(k.className.replace("tooltip-slider", ""));
            if (g.length >= 2 && g[0].nodeName == "TABLE" && g[1].nodeName == "TABLE") {
                g[0].style.whiteSpace = "nowrap";
                var e = parseInt(k.style.width);
                if (!k.slider || !e) {
                    if (g[1].offsetWidth == 0) {
                        e = 320
                    } else {
                        if (g[1].offsetWidth > 300) {
                            e = Math.max(300, g[0].offsetWidth) + 20
                        } else {
                            e = Math.max(g[0].offsetWidth, g[1].offsetWidth) + 20
                        }
                    }
                }
                for (var h = 2; h < g.length; h++) {
                    if (g[h].nodeName == "BLOCKQUOTE") {
                        e = Math.max(e, g[h].offsetWidth + 20)
                    }
                }
                e = Math.min(320, e);
                if (e > 20) {
                    if (k.slider) {
                        Slider.setSize(k.slider, e - 6);
                        k.className += " tooltip-slider"
                    }
                    k.className += " wowhead-tooltip-width-restriction wowhead-tooltip-width-" + e;
                    k.style.width = e + "px";
                    g[0].style.width = g[1].style.width = "100%";
                    if (!b && k.offsetHeight > document.documentElement.offsetHeight) {
                        j.className = "shrink"
                    }
                }
            } else {
                if (g.length >= 1 && k.slider) {
                    var a = g[0].nodeName == "TABLE";
                    if (a) {
                        g[0].style.whiteSpace = "nowrap"
                    }
                    var e = parseInt(k.style.width);
                    if (!e && a) {
                        e = g[0].offsetWidth + 20
                    } else {
                        e = j.offsetWidth + 20
                    }
                    e = Math.min(320, e);
                    if (e > 20) {
                        k.style.width = e + "px";
                        if (a) {
                            g[0].style.width = "100%"
                        }
                        if (k.slider) {
                            Slider.setSize(k.slider, e - 6);
                            k.className += " tooltip-slider"
                        }
                        if (!b && k.offsetHeight > document.documentElement.offsetHeight) {
                            j.className = "shrink"
                        }
                    }
                }
            }
            if (d) {
                WH.Tooltip.setTooltipVisibility(k, true)
            }
        },
        fixSafe: function (c, b, a) {
            WH.Tooltip.fix(c, b, a)
        },
        attachImage: function (d, e, j, k) {
            if (typeof k == "undefined") {
                k = ""
            }
            if (typeof jQuery != "undefined") {
                jQuery(d.parentNode).children(".image" + k).remove()
            } else {
                var l = new RegExp("\\bimage" + k + "\\b");
                for (var h = 0; h < d.parentNode.childNodes.length; h++) {
                    if (l.test(d.parentNode.childNodes[h].className)) {
                        d.parentNode.removeChild(d.parentNode.childNodes[h]);
                        h--
                    }
                }
            }
            var f = typeof e;
            if (f == "number") {
                var g = WH.getDataSource(), b = e;
                if (g[b] && g[b]["image_" + Locale.getName() + k]) {
                    e = g[b]["image_" + Locale.getName() + k]
                } else {
                    return
                }
            } else {
                if (f != "string" || !e) {
                    return
                }
            }
            var a = WH.ce("div");
            a.className = "image" + k + (j ? " " + j : "");
            a.style.backgroundImage = "url(" + e + ")";
            if (typeof jQuery != "undefined") {
                jQuery(d).after(a)
            } else {
                d.parentNode.insertBefore(a, d.nextSibling)
            }
        },
        append: function (e, b, a, d) {
            var e = WH.ge(e);
            var f = WH.Tooltip.create(b, a);
            if (d) {
                var c = WH.ce("p");
                c.style.backgroundImage = "url(" + WH.staticUrl + "/images/wow/icons/medium/" + d.toLowerCase() + ".jpg)";
                WH.ae(c, WH.ce("div"));
                WH.ae(f, c)
            }
            WH.ae(e, f);
            WH.Tooltip.fixSafe(f, 1, 1)
        },
        reset: function () {
            if (WH.Tooltip.tooltip) {
                WH.Tooltip.tooltip.parentNode.removeChild(WH.Tooltip.tooltip);
                WH.Tooltip.tooltip = null
            }
            if (WH.Tooltip.tooltip2) {
                WH.Tooltip.tooltip2.parentNode.removeChild(WH.Tooltip.tooltip2);
                WH.Tooltip.tooltip2 = null
            }
        },
        prepare: function (c, e) {
            var a = e === true ? "fixed" : "absolute";
            if (WH.Tooltip.tooltip) {
                WH.Tooltip.tooltip.style.position = a;
                WH.Tooltip.tooltip2.style.position = a;
                return
            }
            var d = (typeof c != "undefined") ? c : document.body;
            var b = WH.Tooltip.create();
            b.style.position = a;
            b.style.left = b.style.top = "-2323px";
            WH.ae(d, b);
            WH.Tooltip.tooltip = b;
            WH.Tooltip.tooltipTable = WH.gE(b, "table")[0];
            WH.Tooltip.tooltipTd = WH.gE(b, "td")[0];
            var b = WH.Tooltip.create(null, true);
            b.style.position = a;
            b.style.left = b.style.top = "-2323px";
            WH.ae(d, b);
            WH.Tooltip.tooltip2 = b;
            WH.Tooltip.tooltipTable2 = WH.gE(b, "table")[0];
            WH.Tooltip.tooltipTd2 = WH.gE(b, "td")[0]
        },
        prepareScreen: function () {
            if (WH.Tooltip.screen) {
                WH.Tooltip.screen.style.display = "block"
            } else {
                WH.Tooltip.screen = WH.ce("div", {id: "wowhead-tooltip-screen", className: "wowhead-tooltip-screen"});
                WH.Tooltip.screenCloser = WH.ce("a", {
                    id: "wowhead-tooltip-screen-close",
                    className: "wowhead-tooltip-screen-close",
                    onclick: $WowheadPower.clearTouchTooltip
                });
                WH.Tooltip.screenInnerWrapper = WH.ce("div", {
                    id: "wowhead-tooltip-screen-inner-wrapper",
                    className: "wowhead-tooltip-screen-inner-wrapper"
                });
                WH.Tooltip.screenInner = WH.ce("div", {
                    id: "wowhead-tooltip-screen-inner",
                    className: "wowhead-tooltip-screen-inner"
                });
                WH.Tooltip.screenInnerBox = WH.ce("div", {
                    id: "wowhead-tooltip-screen-inner-box",
                    className: "wowhead-tooltip-screen-inner-box"
                });
                WH.Tooltip.screenCaption = WH.ce("div", {
                    id: "wowhead-tooltip-screen-caption",
                    className: "wowhead-tooltip-screen-caption"
                });
                WH.ae(WH.Tooltip.screen, WH.Tooltip.screenCloser);
                WH.ae(WH.Tooltip.screenInner, WH.Tooltip.screenInnerBox);
                WH.ae(WH.Tooltip.screenInnerWrapper, WH.Tooltip.screenInner);
                WH.ae(WH.Tooltip.screen, WH.Tooltip.screenInnerWrapper);
                WH.ae(WH.Tooltip.screen, WH.Tooltip.screenCaption);
                WH.ae(document.body, WH.Tooltip.screen)
            }
            WH.Tooltip.mobileTooltipShown = true;
            WH.Tooltip.setupIScroll()
        },
        destroyIScroll: function () {
            if (WH.Tooltip.iScroll) {
                WH.Tooltip.iScroll.destroy();
                WH.Tooltip.iScroll = null
            }
        },
        setupIScroll: function () {
            if (!WH.Tooltip.mobileScrollSetUp) {
                var a = function (b) {
                    if (WH.Tooltip.mobileTooltipShown) {
                        if (!document.getElementById("wowhead-tooltip-screen-inner").contains(b.target)) {
                            b.preventDefault()
                        }
                    }
                };
                WH.aE(document.body, "touchmove", a);
                WH.aE(document.body, "mousewheel", a);
                WH.Tooltip.mobileScrollSetUp = true
            }
            if (typeof IScroll != "function") {
                return
            }
            setTimeout(function () {
                WH.Tooltip.destroyIScroll();
                WH.Tooltip.iScroll = new IScroll(WH.Tooltip.screenInnerWrapper, {mouseWheel: true, tap: true})
            }, 1)
        },
        setTooltipVisibility: function (a, b) {
            if (b) {
                a.setAttribute("data-visible", "yes");
                a.style.visibility = "visible"
            } else {
                a.setAttribute("data-visible", "no");
                a.style.visibility = "hidden"
            }
        },
        set: function (d, b, c, a) {
            WH.Tooltip.tooltip.style.width = "550px";
            WH.Tooltip.tooltip.style.left = "-2323px";
            WH.Tooltip.tooltip.style.top = "-2323px";
            WH.Tooltip.tooltip.className = "wowhead-tooltip";
            if (d.nodeName) {
                WH.ee(WH.Tooltip.tooltipTd);
                WH.ae(WH.Tooltip.tooltipTd, d)
            } else {
                WH.Tooltip.tooltipTd.innerHTML = WH.Tooltip.evalFormulas(d)
            }
            WH.Tooltip.tooltip.style.display = "";
            WH.Tooltip.setTooltipVisibility(WH.Tooltip.tooltip, true);
            WH.Tooltip.fix(WH.Tooltip.tooltip, 0, 0);
            if (b) {
                WH.Tooltip.showSecondary = true;
                WH.Tooltip.tooltip2.style.width = "550px";
                WH.Tooltip.tooltip2.style.left = "-2323px";
                WH.Tooltip.tooltip2.style.top = "-2323px";
                if (b.nodeName) {
                    WH.ee(WH.Tooltip.tooltipTd2);
                    WH.ae(WH.Tooltip.tooltipTd2, b)
                } else {
                    WH.Tooltip.tooltipTd2.innerHTML = WH.Tooltip.evalFormulas(b)
                }
                WH.Tooltip.tooltip2.style.display = "";
                WH.Tooltip.fix(WH.Tooltip.tooltip2, 0, 0)
            } else {
                WH.Tooltip.showSecondary = false
            }
            if (window.Platform && Platform.isTouch() || window.WH && WH.isTouch()) {
                let target = WH.Tooltip.showSecondary ? WH.Tooltip.tooltipTd2 : WH.Tooltip.tooltipTd;
                let closer = WH.ce("a");
                closer.href = "javascript:";
                closer.className = "wowhead-touch-tooltip-closer";
                closer.onclick = $WowheadPower.clearTouchTooltip;
                WH.ae(target, closer)
            }
            WH.Tooltip.tooltipTable.style.display = (d == "") ? "none" : "";
            WH.Tooltip.attachImage(WH.Tooltip.tooltipTable, c, a);
            WH.Tooltip.generateEvent("show")
        },
        moveTests: [[null, null], [null, false], [false, null], [false, false]],
        move: function (o, n, e, q, d, b) {
            if (!WH.Tooltip.tooltipTable) {
                return
            }
            var r = WH.Tooltip.tooltip, j = WH.Tooltip.tooltipTable.offsetWidth,
                c = WH.Tooltip.tooltipTable.offsetHeight, l = WH.Tooltip.tooltip2,
                g = WH.Tooltip.showSecondary ? WH.Tooltip.tooltipTable2.offsetWidth : 0,
                a = WH.Tooltip.showSecondary ? WH.Tooltip.tooltipTable2.offsetHeight : 0, p;
            r.style.width = (j == 0) ? "auto" : (j + "px");
            l.style.width = g + "px";
            var m, f;
            for (var h = 0, k = WH.Tooltip.moveTests.length; h < k; ++h) {
                p = WH.Tooltip.moveTests[h];
                m = WH.Tooltip.moveTest(o, n, e, q, d, b, p[0], p[1]);
                if (WH.WAS && !WH.WAS.intersect(m)) {
                    f = true;
                    break
                } else {
                    if (!WH.WAS) {
                        break
                    }
                }
            }
            if (WH.WAS && !f) {
                WH.WAS.intersect(m, true)
            }
            r.style.left = m.l + "px";
            r.style.top = m.t + "px";
            WH.Tooltip.setTooltipVisibility(r, true);
            if (WH.Tooltip.showSecondary) {
                l.style.left = m.l + j + "px";
                l.style.top = m.t + "px";
                WH.Tooltip.setTooltipVisibility(l, true)
            }
            WH.Tooltip.generateEvent("move")
        },
        moveTest: function (d, j, o, k, b, a, l, h) {
            var w = d, n = j, e = WH.Tooltip.tooltip, p = WH.Tooltip.tooltipTable.offsetWidth,
                v = WH.Tooltip.tooltipTable.offsetHeight, m = WH.Tooltip.tooltip2,
                q = WH.Tooltip.showSecondary ? WH.Tooltip.tooltipTable2.offsetWidth : 0,
                g = WH.Tooltip.showSecondary ? WH.Tooltip.tooltipTable2.offsetHeight : 0, f = WH.getWindowSize(),
                c = WH.getScroll(), u = c.x, t = c.y, s = c.x + f.w, r = c.y + f.h;
            if (e.style.position === "fixed") {
                d -= c.x;
                j -= c.y;
                w -= d;
                n -= j;
                c = {x: 0, y: 0};
                u = t = 0;
                s = f.w;
                r = f.h
            }
            if (l == null) {
                l = (d + o + p + q <= s)
            }
            if (h == null) {
                h = (j - Math.max(v, g) >= t)
            }
            if (l) {
                d += o + b
            } else {
                d = Math.max(d - (p + q), u) - b
            }
            if (h) {
                j -= Math.max(v, g) + a
            } else {
                j += k + a
            }
            if (d < u) {
                d = u
            } else {
                if (d + p + q > s) {
                    d = s - (p + q)
                }
            }
            if (j < t) {
                j = t
            } else {
                if (j + Math.max(v, g) > r) {
                    j = Math.max(c.y, r - Math.max(v, g))
                }
            }
            if (WH.Tooltip.iconVisible) {
                if (w >= d - 48 && w <= d && n >= j - 4 && n <= j + 48) {
                    j -= 48 - (n - j)
                }
            }
            return WH.createRect(d, j, p, v)
        },
        show: function (g, j, c, a, b, d, e, h, f) {
            if (j == null || WH.Tooltip.disabled) {
                return
            }
            if (!c || c < 1) {
                c = 1
            }
            if (!a || a < 1) {
                a = 1
            }
            if (b) {
                j = '<span class="' + b + '">' + j + "</span>"
            }
            let offset = WH.getOffset(g);
            WH.Tooltip.prepare(undefined, f);
            WH.Tooltip.set(j, d, e, h);
            WH.Tooltip.move(offset.left, offset.top, g.offsetWidth, g.offsetHeight, c, a)
        },
        showAtCursor: function (f, h, d, b, a, e, g, c) {
            if (h == null || WH.Tooltip.disabled) {
                return
            }
            if (!d || d < 10) {
                d = 10
            }
            if (!b || b < 10) {
                b = 10
            }
            if (a) {
                h = '<span class="' + a + '">' + h + "</span>";
                if (e) {
                    e = '<span class="' + a + '">' + e + "</span>"
                }
            }
            WH.Tooltip.prepare(undefined, f.target ? WH.isElementFixedPosition(f.target) : false);
            WH.Tooltip.set(h, e, g, c);
            WH.Tooltip.move(f.pageX, f.pageY, 0, 0, d, b)
        },
        showAtXY: function (j, g, f, b, a, c, d, h, e) {
            if (j == null || WH.Tooltip.disabled) {
                return
            }
            WH.Tooltip.prepare(undefined, e);
            WH.Tooltip.set(j, c, d, h);
            WH.Tooltip.move(g, f, 0, 0, b, a)
        },
        showFadingTooltipAtCursor: function (a, b, e, d, c) {
            c = c || window.event;
            a = WH.Tooltip.prepareTooltipHtml(a, e, d, c);
            WH.Tooltip.showAtCursor(c, a, undefined, undefined, b);
            requestAnimationFrame(function () {
                WH.Tooltip.tooltip.classList.add("fade-out")
            })
        },
        showInScreen: function (e, j, b, c, d, h, f) {
            $WowheadPower.clearTouchTooltip(true);
            if (j == null || WH.Tooltip.disabled) {
                return
            }
            if (b) {
                j = '<span class="' + b + '">' + j + "</span>"
            }
            WH.Tooltip.prepareScreen();
            WH.ee(WH.Tooltip.screenCaption);
            var g = WH.ce("a", {
                innerHTML: WH.isRemote() ? "Tap Link" : WH.TERMS.taplink, onclick: (function (l, a) {
                    l.setAttribute("data-disable-wowhead-tooltip", "true");
                    if (l.fireEvent) {
                        l.fireEvent("on" + a)
                    } else {
                        if (typeof MouseEvent == "function") {
                            l.dispatchEvent(new MouseEvent(a, {bubbles: true, cancelable: true}))
                        } else {
                            var m = document.createEvent("Events");
                            m.initEvent(a, true, true);
                            l.dispatchEvent(m)
                        }
                    }
                    if (l) {
                        l.removeAttribute("data-disable-wowhead-tooltip")
                    }
                    $WowheadPower.clearTouchTooltip()
                }).bind(null, e, "click")
            });
            var k = WH.ce("i", {className: "fa fa-hand-o-up"});
            WH.aef(g, k);
            WH.ae(WH.Tooltip.screenCaption, g);
            $WowheadPower.setParent(WH.Tooltip.screenInnerBox);
            WH.Tooltip.setIcon(f);
            WH.Tooltip.set(j, c, d, h);
            WH.Tooltip.move()
        },
        cursorUpdate: function (b, a, d) {
            if (WH.Tooltip.disabled || !WH.Tooltip.tooltip) {
                return
            }
            if (!a || a < 10) {
                a = 10
            }
            if (!d || d < 10) {
                d = 10
            }
            var c = WH.getCursorPos(b);
            WH.Tooltip.move(c.x, c.y, 0, 0, a, d)
        },
        hide: function () {
            if (WH.Tooltip.tooltip) {
                WH.Tooltip.showingTooltip = false;
                WH.Tooltip.tooltip.style.display = "none";
                WH.Tooltip.setTooltipVisibility(WH.Tooltip.tooltip, false);
                WH.Tooltip.tooltipTable.className = "";
                WH.Tooltip.setIcon(null);
                if (WH.WAS) {
                    WH.WAS.restoreHidden()
                }
                WH.Tooltip.generateEvent("hide")
            }
            if (WH.Tooltip.tooltip2) {
                WH.Tooltip.tooltip2.style.display = "none";
                WH.Tooltip.setTooltipVisibility(WH.Tooltip.tooltip2, false);
                WH.Tooltip.tooltipTable2.className = ""
            }
        },
        setIcon: function (a, b) {
            WH.Tooltip.prepare(undefined, b);
            if (a) {
                WH.Tooltip.icon.style.backgroundImage = "url(" + WH.staticUrl + "/images/wow/icons/medium/" + a.toLowerCase() + ".jpg)";
                WH.Tooltip.icon.style.visibility = "visible"
            } else {
                WH.Tooltip.icon.style.backgroundImage = "none";
                WH.Tooltip.icon.style.visibility = "hidden"
            }
            WH.Tooltip.iconVisible = a ? 1 : 0
        },
        generateEvent: function (a) {
            if (!WH.Tooltip.tooltip) {
                return
            }
            try {
                WH.Tooltip.tooltip.dispatchEvent(new Event(a))
            } catch (c) {
                try {
                    var b = document.createEvent("Event");
                    b.initEvent(a, true, true);
                    WH.Tooltip.tooltip.dispatchEvent(b)
                } catch (c) {
                    void (0)
                }
            }
        },
        addTooltipText: function (a, c, b) {
            if (!a) {
                WH.error("Tooltip text addition element not found!", a, c, b);
                return
            }
            a._fixTooltip = (function (f, l, h, e) {
                var g = /<\/table>\s*$/;
                var k = typeof h === "function" ? h() : h;
                var j = h ? ' class="' + k + '"' : "";
                var d = typeof l === "function" ? l() : l;
                if (g.test(e)) {
                    return e.replace(g, '<tr><td colspan="2"><div' + j + ' style="margin-top:10px">' + d + "</div></td></tr></table>")
                } else {
                    return e + "<div" + j + ' style="margin-top:10px">' + d + "</div>"
                }
            }).bind(null, a, c, b)
        },
        prepareTooltipHtml: function (a, d, c, b) {
            a = typeof a === "function" ? a.call(b.target, b) : a;
            if (typeof a === "string") {
                if (d === undefined && a.length < 30) {
                    d = true
                }
                let attributes = [];
                if (d) {
                    attributes.push(' class="no-wrap"')
                }
                if (c && !isNaN(c)) {
                    attributes.push(' style="max-width:' + c + 'px"')
                }
                if (attributes.length) {
                    a = "<div" + attributes.join("") + ">" + a + "</div>"
                }
            }
            return a
        },
        simple: function (d, c, e, b, a, g, f) {
            if (d instanceof jQuery) {
                for (let i = 0, individualElement; individualElement = d[i]; i++) {
                    WH.Tooltip.simple(individualElement, c, e, b, a, g, f)
                }
                return
            }
            if (b) {
                if (a) {
                    d.onmouseover = function (h) {
                        let tooltipHtml = WH.Tooltip.prepareTooltipHtml(c, g, f, h);
                        WH.Tooltip.show(d, tooltipHtml, false, false, e);
                        h.stopPropagation()
                    }
                } else {
                    d.onmouseover = function (h) {
                        let tooltipHtml = WH.Tooltip.prepareTooltipHtml(c, g, f, h);
                        WH.Tooltip.show(d, tooltipHtml, false, false, e)
                    }
                }
            } else {
                if (a) {
                    d.onmouseover = function (h) {
                        let tooltipHtml = WH.Tooltip.prepareTooltipHtml(c, g, f, h);
                        WH.Tooltip.showAtCursor(h, tooltipHtml, false, false, e);
                        h.stopPropagation()
                    }
                } else {
                    d.onmouseover = function (h) {
                        let tooltipHtml = WH.Tooltip.prepareTooltipHtml(c, g, f, h);
                        WH.Tooltip.showAtCursor(h, tooltipHtml, false, false, e)
                    }
                }
                d.onmousemove = WH.Tooltip.cursorUpdate
            }
            d.onmouseout = WH.Tooltip.hide
        },
        simpleNonTouch: function (a, d, b, c, e) {
            if (!Platform.isTouch()) {
                WH.Tooltip.simple(a, d, b, c, false, e)
            }
        },
        simpleOverride: function (e, f, c, a, h, g, j, d, k, b, l) {
            e.overrideTooltip = {
                html: f,
                htmlGenerator: c,
                spanClass: a,
                icon: h,
                html2: g,
                html2Generator: j,
                image: d,
                imageClass: k,
                map: b,
                spellData: l
            }
        }
    };
    WH.createButton = function (l, d, o) {
        var j = "btn btn-site";
        var h = "";
        var e = "";
        var c = "";
        var n = "";
        var f = [];
        var m = [];
        if (!o) {
            o = {}
        }
        if (!o["no-margin"]) {
            m.push("margin-left:5px")
        }
        if (typeof d != "string" || d === "") {
            d = "javascript:"
        }
        if (o["new-window"]) {
            h = ' target="_blank"'
        }
        if (typeof o.id == "string") {
            e = ' id="' + o.id + '"'
        }
        if (typeof o.size != "undefined") {
            switch (o.size) {
                case"small":
                case"large":
                    f.push("btn-" + o.size);
                    break
            }
        } else {
            f.push("btn-small")
        }
        if (typeof o["class"] == "string") {
            f.push(o["class"])
        }
        if (typeof o.type == "string") {
            switch (o.type) {
                case"default":
                case"gray":
                    j = "btn";
                    break;
                default:
                    j = "btn btn-" + o.type
            }
        }
        if (o.disabled) {
            f.push("btn-disabled");
            d = "javascript:"
        }
        if (f.length) {
            j += " " + f.join(" ")
        }
        if (j) {
            j = ' class="' + j + '"'
        }
        if (!(typeof o["float"] != "undefined" && !o["float"])) {
            m.push("float:right")
        }
        if (typeof o.style == "string") {
            m.push(o.style)
        }
        if (m.length) {
            c = ' style="' + m.join(";") + '"'
        }
        var g = '<a href="' + d + '"' + h + e + j + c + ">" + (l || "") + "</a>";
        var b = WH.ce("div");
        b.innerHTML = g;
        var k = b.childNodes[0];
        if (typeof o.click == "function" && !o.disabled) {
            k.onclick = o.click
        }
        if (typeof o.tooltip != "undefined") {
            if (o.tooltip !== false) {
                k.setAttribute("data-whattach", "true")
            }
            if (o.tooltip === false) {
                k.rel = "np"
            } else {
                if (typeof o.tooltip == "string") {
                    WH.Tooltip.simple(k, o.tooltip, null, true)
                } else {
                    if (typeof o.tooltip == "object" && o.tooltip["text"]) {
                        WH.Tooltip.simple(k, o.tooltip["text"], o.tooltip["class"], true)
                    }
                }
            }
        }
        return k
    };
    if (WH.isSet("$WowheadPower")) {
        $WowheadPower.init()
    }
    ;

}
/*
     FILE ARCHIVED ON 21:12:49 May 06, 2021 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:46:59 Sep 11, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 59.822
  exclusion.robots: 0.083
  exclusion.robots.policy: 0.075
  RedisCDXSource: 2.466
  esindex: 0.008
  LoadShardBlock: 41.671 (3)
  PetaboxLoader3.datanode: 48.844 (5)
  CDXLines.iter: 13.703 (3)
  load_resource: 69.337
  PetaboxLoader3.resolve: 26.801
  loaddict: 34.3
*/
