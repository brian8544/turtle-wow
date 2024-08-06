function $(C) {
    if (arguments.length > 1) {
        var D = [];
        for (var B = 0, A = arguments.length; B < A; ++B) {
            D.push($(arguments[B]))
        }
        return D
    }
    if (typeof C == "string") {
        C = ge(C)
    }
    return C
}

function $E(A) {
    if (!A) {
        A = event
    }
    A._button = A.which ? A.which : A.button;
    A._target = A.target ? A.target : A.srcElement;
    return A
}

function $A(B) {
    var D = [];
    for (var C = 0, A = B.length; C < A; ++C) {
        D.push(B[C])
    }
    return D
}

Function.prototype.bind = function () {
    var A = this,
        C = $A(arguments),
        B = C.shift();
    return function () {
        return A.apply(B, C.concat($A(arguments)))
    }
};

function strcmp(B, A) {
    if (B == A) {
        return 0
    }
    if (B == null) {
        return -1
    }
    if (A == null) {
        return 1
    }
    return B < A ? -1 : 1
}

function trim(A) {
    return A.replace(/(^\s*|\s*$)/g, "")
}

function rtrim(B, C) {
    var A = B.length;
    while (--A > 0 && B.charAt(A) == C) {
    }
    B = B.substring(0, A + 1);
    if (B == C) {
        B = ""
    }
    return B
}

function sprintf(C) {
    for (var B = 1, A = arguments.length; B < A; ++B) {
        C = C.replace("$" + B, arguments[B])
    }
    return C
}

function str_replace(C, B, A) {
    while (C.indexOf(B) != -1) {
        C = C.replace(B, A)
    }
    return C
}

function urlencode(A) {
    A = encodeURIComponent(A);
    A = str_replace(A, "+", "%2B");
    return A
}

function number_format(A) {
    A = "" + parseInt(A);
    if (A.length <= 3) {
        return A
    }
    return number_format(A.substr(0, A.length - 3)) + "," + A.substr(A.length - 3)
}

function in_array(B, E, F, D) {
    if (B == null) {
        return -1
    }
    if (F) {
        return in_arrayf(B, E, F, D)
    }
    for (var C = D || 0, A = B.length; C < A; ++C) {
        if (B[C] == E) {
            return C
        }
    }
    return -1
}

function in_arrayf(B, E, F, D) {
    for (var C = D || 0, A = B.length; C < A; ++C) {
        if (F(B[C]) == E) {
            return C
        }
    }
    return -1
}

function array_walk(C, F, B) {
    var E;
    for (var D = 0, A = C.length; D < A; ++D) {
        E = F(C[D], B, C, D);
        if (E != null) {
            C[D] = E
        }
    }
}

function array_apply(C, F, B) {
    var E;
    for (var D = 0, A = C.length; D < A; ++D) {
        F(C[D], B, C, D)
    }
}

function ge(A) {
    return document.getElementById(A)
}

function gE(A, B) {
    return A.getElementsByTagName(B)
}

function ce(C, B) {
    var A = document.createElement(C);
    if (B) {
        cOr(A, B)
    }
    return A
}

function de(A) {
    A.parentNode.removeChild(A)
}

function ae(A, B) {
    return A.appendChild(B)
}

function ct(A) {
    return document.createTextNode(A)
}

function rf() {
    return false
}

function rf2(A) {
    A = $E(A);
    if (A.ctrlKey || A.shiftKey || A.altKey || A.metaKey) {
        return
    }
    return false
}

function tb() {
    this.blur()
}

function ac(C) {
    var B = 0,
        A = 0;
    while (C) {
        B += C.offsetLeft;
        A += C.offsetTop;
        C = C.offsetParent
    }
    return [B, A]
}

function aE(B, C, A) {
    if (Browser.ie) {
        B.attachEvent("on" + C, A)
    } else {
        B.addEventListener(C, A, false)
    }
}

function dE(B, C, A) {
    if (Browser.ie) {
        B.detachEvent("on" + C, A)
    } else {
        B.removeEventListener(C, A, false)
    }
}

function sp(A) {
    if (!A) {
        A = event
    }
    if (Browser.ie) {
        A.cancelBubble = true
    } else {
        A.stopPropagation()
    }
}

function sc(F, G, B, D, E) {
    var C = new Date();
    var A = F + "=" + escape(B) + "; ";
    C.setDate(C.getDate() + G);
    A += "expires=" + C.toUTCString() + "; ";
    if (D) {
        A += "path=" + D + "; "
    }
    if (E) {
        A += "domain=" + E + "; "
    }
    document.cookie = A
}

function dc(A) {
    sc(A, -1)
}

function gc(D) {
    var A, E;
    if (!D) {
        var B = [];
        E = document.cookie.split("; ");
        for (var C = 0; C < E.length; ++C) {
            A = E[C].split("=");
            B[A[0]] = unescape(A[1])
        }
        return B
    } else {
        A = document.cookie.indexOf(D + "=");
        if (A != -1) {
            if (A == 0 || document.cookie.substring(A - 2, A) == "; ") {
                A += D.length + 1;
                E = document.cookie.indexOf("; ", A);
                if (E == -1) {
                    E = document.cookie.length
                }
                return unescape(document.cookie.substring(A, E))
            }
        }
    }
    return null
}

function ns(A) {
    A.onmousedown = A.onselectstart = A.ondragstart = rf;
    if (Browser.ie) {
        A.onfocus = tb
    }
}

function cO(C, A) {
    for (var B in A) {
        C[B] = A[B]
    }
}

function cOr(C, A) {
    for (var B in A) {
        if (typeof A[B] == "object") {
            if (!C[B]) {
                C[B] = {}
            }
            cOr(C[B], A[B])
        } else {
            C[B] = A[B]
        }
    }
}

var Browser = {
    ie: !!(window.attachEvent && !window.opera),
    opera: !!window.opera,
    safari: navigator.userAgent.indexOf("Safari") != -1,
    gecko: navigator.userAgent.indexOf("Gecko") != -1 && navigator.userAgent.indexOf("KHTML") == -1
};
Browser.ie7 = Browser.ie && navigator.userAgent.indexOf("MSIE 7.0") != -1;
Browser.ie6 = Browser.ie && navigator.userAgent.indexOf("MSIE 6.0") != -1 && !Browser.ie7;
navigator.userAgent.match(/Gecko\/([0-9]+)/);
Browser.geckoVersion = parseInt(RegExp.$1) | 0;
var OS = {
    windows: navigator.appVersion.indexOf("Windows") != -1,
    mac: navigator.appVersion.indexOf("Macintosh") != -1,
    linux: navigator.appVersion.indexOf("Linux") != -1
};

function g_getWindowSize() {
    var B = 0,
        A = 0;
    if (typeof window.innerWidth == "number") {
        B = window.innerWidth;
        A = window.innerHeight
    } else {
        if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
            B = document.documentElement.clientWidth;
            A = document.documentElement.clientHeight
        } else {
            if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
                B = document.body.clientWidth;
                A = document.body.clientHeight
            }
        }
    }
    return {
        w: B,
        h: A
    }
}

function g_getScroll() {
    var A = 0,
        B = 0;
    if (typeof (window.pageYOffset) == "number") {
        A = window.pageXOffset;
        B = window.pageYOffset
    } else {
        if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
            A = document.body.scrollLeft;
            B = document.body.scrollTop
        } else {
            if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
                A = document.documentElement.scrollLeft;
                B = document.documentElement.scrollTop
            }
        }
    }
    return {
        x: A,
        y: B
    }
}

function g_getCursorPos(C) {
    var B, D;
    if (window.innerHeight) {
        B = C.pageX;
        D = C.pageY
    } else {
        var A = g_getScroll();
        B = C.clientX + A.x;
        D = C.clientY + A.y
    }
    return {
        x: B,
        y: D
    }
}

function g_scrollTo(C, B) {
    var M, K = g_getWindowSize(),
        L = g_getScroll(),
        I = K.w,
        E = K.h,
        G = L.x,
        D = L.y;
    C = $(C);
    if (B == null) {
        B = []
    } else {
        if (typeof B == "number") {
            B = [B]
        }
    }
    M = B.length;
    if (M == 0) {
        B[0] = B[1] = B[2] = B[3] = 0
    } else {
        if (M == 1) {
            B[1] = B[2] = B[3] = B[0]
        } else {
            if (M == 2) {
                B[2] = B[0];
                B[3] = B[1]
            } else {
                if (M == 3) {
                    B[3] = B[1]
                }
            }
        }
    }
    M = ac(C);
    var A = M[0] - B[3];
    var H = M[1] - B[0];
    var J = M[0] + C.offsetWidth + B[1];
    var F = M[1] + C.offsetHeight + B[2];
    if (J - A > I || A < G) {
        G = A
    } else {
        if (J - I > G) {
            G = J - I
        }
    }
    if (F - H > E || H < D) {
        D = H
    } else {
        if (F - E > D) {
            D = F - E
        }
    }
    scrollTo(G, D)
}

function g_setTextNodes(C, B) {
    if (C.nodeType == 3) {
        C.nodeValue = B
    } else {
        for (var A = 0; A < C.childNodes.length; ++A) {
            g_setTextNodes(C.childNodes[A], B)
        }
    }
}

function g_getTextContent(C) {
    var A = "";
    for (var B = 0; B < C.childNodes.length; ++B) {
        if (C.childNodes[B].nodeValue) {
            A += C.childNodes[B].nodeValue
        } else {
            if (C.childNodes[B].nodeName == "BR") {
                if (Browser.ie) {
                    A += "\r"
                } else {
                    A += "\n"
                }
            }
        }
        A += g_getTextContent(C.childNodes[B])
    }
    return A
}

function g_setSelectedLink(C, B) {
    if (!g_setSelectedLink.groups) {
        g_setSelectedLink.groups = {}
    }
    var A = g_setSelectedLink.groups;
    if (A[B]) {
        A[B].className = ""
    }
    C.className = "selected";
    A[B] = C
}

function g_toggleDisplay(A) {
    if (A.style.display == "none") {
        A.style.display = "";
        return true
    } else {
        A.style.display = "none";
        return false
    }
}

function g_initHeader(B) {
    var H = ce("dl");
    g_expandSite()
    for (var G = 0, J = mn_path.length; G < J; ++G) {
        var E = ce("dt");
        var L = ce("a");
        var I = ce("ins");
        var F = ce("big");
        var D = ce("span");
        if (mn_path[G][0] != B) {
            L.menu = mn_path[G][3];
            L.onmouseover = Menu.show;
            L.onmouseout = Menu.hide
        }
        if (mn_path[G][2]) {
            L.href = mn_path[G][2]
        } else {
            L.href = "javascript:;";
            ns(L);
            L.style.cursor = "default"
        }
        if (B != null && mn_path[G][0] == B) {
            L.className = "selected"
        }
        ae(F, ct(mn_path[G][1].charAt(0)));
        ae(I, F);
        ae(I, ct(mn_path[G][1].substr(1)));
        ae(L, I);
        ae(L, D);
        ae(E, L);
        ae(H, E)
    }
    ae(ge("toptabs-right-generic"), H);
    var A = ge("menu-buttons-generic");
    if (B != null && B >= 0 && B < mn_path.length) {
        switch (B) {
            case 0:
                Menu.addButtons(A, Menu.explode(mn_database));
                break;
            case 1:
                Menu.addButtons(A, mn_tools);
                break;
            case 2:
                Menu.addButtons(A, Menu.explode(mn_more));
                break;
        }
    } else {
        ae(A, ct(String.fromCharCode(160)))
    }
    g_initLanguageChanger();
    var M = ge("live-search-generic");
    var K = M.previousSibling;
    var C = M.parentNode;
    ns(K);
    K.onclick = function () {
        this.parentNode.onsubmit()
    };
    if (M.value == "") {
        M.className = "search-database"
    }
    M.onmousemove = function () {
        if (trim(this.value) != "") {
            M.className = ""
        }
    };
    M.onfocus = function () {
        M.className = ""
    };
    M.onblur = function () {
        if (trim(this.value) == "") {
            M.className = "search-database"
        }
    };
    // C.onsubmit = function () {
    //     var N = this.elements[0].value;
    //     if (trim(N) == "" || trim(N).length <= 3) {
    //         return false
    //     }
    //     this.submit()
    // }
}

function g_submit_live_search() {
    document.getElementById('live-search-generic').value =
        document.getElementById('live-search-generic').value.trim();
    document.getElementById('header-search-form').submit();
}

function g_initLanguageChanger() {
    var A = ge("language-changer");
    if (!A) {
        return
    }
    A.menu = [[0, "English", (g_locale.id != 0 ? "?locale=0" : null)] /*,  [NOTE] deactivated [0, "Русский", (g_locale.id != 8 ? "?locale=8" : null)]*/];
    A.menu.rightAligned = 1;
    if (g_locale.id != 25) {
        A.menu[{
            0: 0,
            8: 1
        }[g_locale.id]].checked = 1
    }
    A.onmouseover = Menu.show;
    A.onmouseout = Menu.hide
}

function g_initPath(K, D) {
    var G = mn_path,
        H = null,
        C = null,
        L = 0,
        I = ge("main-precontents"),
        A = ce("div");
    A.className = "path";
    if (D != null) {
        var J = ce("div");
        J.className = "path-right";
        var M = ce("a");
        M.href = "javascript:;";
        M.id = "fi_toggle";
        ns(M);
        M.onclick = fi_Toggle;
        if (D) {
            M.className = "disclosure-on";
            ae(M, ct(LANG.fihide))
        } else {
            M.className = "disclosure-off";
            ae(M, ct(LANG.fishow))
        }
        ae(J, M);
        ae(I, J)
    }
    for (var F = 0; F < K.length; ++F) {
        var M, B, N = 0;
        for (var E = 0; E < G.length; ++E) {
            if (G[E][0] == K[F]) {
                N = 1;
                G = G[E];
                G.checked = 1;
                break
            }
        }
        if (!N) {
            L = 1;
            break
        }
        M = ce("a");
        B = ce("span");
        if (G[2]) {
            M.href = G[2]
        } else {
            M.href = "javascript:;";
            ns(M);
            M.style.textDecoration = "none";
            M.style.color = "white";
            M.style.cursor = "default"
        }
        if (F < K.length - 1 && G[3]) {
            B.className = "menuarrow"
        }
        ae(M, ct(G[4] == null ? G[1] : G[4]));
        if (F == 0) {
            M.menu = mn_path
        } else {
            M.menu = H[3]
        }
        M.onmouseover = Menu.show;
        M.onmouseout = Menu.hide;
        ae(B, M);
        ae(A, B);
        C = B;
        H = G;
        G = G[3];
        if (!G) {
            L = 1;
            break
        }
    }
    if (L && C) {
        C.className = ""
    }
    var J = ce("div");
    J.className = "clear";
    ae(A, J);
    ae(I, A);
    g_initPath.lastIt = H
}

function g_formatTimeElapsed(D) {
    function G(L, K, J) {
        if (J && LANG.timeunitsab[K] == "") {
            J = 0
        }
        if (J) {
            return L + " " + LANG.timeunitsab[K]
        } else {
            return L + " " + (L == 1 ? LANG.timeunitssg[K] : LANG.timeunitspl[K])
        }
    }

    var E = [31557600, 2629800, 604800, 86400, 3600, 60, 1];
    var H = [1, 3, 3, -1, 5, -1, -1];
    D = Math.max(D, 1);
    for (var C = 3, F = E.length; C < F; ++C) {
        if (D >= E[C]) {
            var B = C;
            var I = Math.floor(D / E[B]);
            if (H[B] != -1) {
                var A = H[B];
                D %= E[B];
                v2 = Math.floor(D / E[A]);
                if (v2 > 0) {
                    return G(I, B, 1) + " " + G(v2, A, 1)
                }
            }
            return G(I, B, 0)
        }
    }
    return "(n/a)"
}

function g_formatDateSimple(E, A) {
    function C(J) {
        return (J < 10 ? "0" + J : J)
    }

    var H = "",
        G = E.getDate(),
        D = E.getMonth() + 1,
        F = E.getFullYear();
    H += sprintf(LANG.date_simple, C(G), C(D), F);
    if (A == 1) {
        var I = E.getHours() + 1,
            B = E.getMinutes() + 1;
        H += LANG.date_at + C(I) + ":" + C(B)
    }
    return H
}

function g_createGlow(A, G) {
    var D = ce("span");
    for (var C = -1; C <= 1; ++C) {
        for (var B = -1; B <= 1; ++B) {
            var F = ce("div");
            F.style.position = "absolute";
            F.style.whiteSpace = "nowrap";
            F.style.left = C + "px";
            F.style.top = B + "px";
            if (C == 0 && B == 0) {
                F.style.zIndex = 4
            } else {
                F.style.color = "black";
                F.style.zIndex = 2
            }
            ae(F, ct(A));
            ae(D, F)
        }
    }
    D.style.position = "relative";
    D.className = "glow" + (G != null ? " " + G : "");
    var E = ce("span");
    E.style.visibility = "hidden";
    ae(E, ct(A));
    ae(D, E);
    return D
}

function g_appendReputation(G, F, D, E) {
    G = $(G);
    var B = ce("a");
    B.href = "javascript:;";
    B.className = "reputation";
    var H = ce("div");
    H.className = "reputation-text";
    var A = ce("del");
    ae(A, ct(g_reputation_standings[F]));
    ae(H, A);
    var C = ce("ins");
    ae(C, ct(E));
    ae(H, C);
    ae(B, H);
    H = ce("div");
    H.className = "reputation-bar" + F;
    if (D <= 0 || D > 100) {
        H.style.visibility = "hidden"
    }
    H.style.width = D + "%";
    ae(H, ct(String.fromCharCode(160)));
    ae(B, H);
    ae(G, B)
}

function g_convertRatingToPercent(E, A, D) {
    var C = {
        12: 1.5,
        13: 12,
        14: 15,
        15: 5,
        16: 10,
        17: 10,
        18: 8,
        19: 14,
        20: 14,
        21: 14,
        22: 0,
        23: 0,
        24: 0,
        25: 0,
        26: 0,
        27: 0,
        28: 10,
        29: 10,
        30: 10,
        31: 10,
        32: 14,
        33: 0,
        34: 0,
        35: 25,
        36: 10,
        37: 2.5
    };
    if (E < 10) {
        E = 10
    } else {
        if (E > 70) {
            E = 70
        }
    }
    if (D < 0) {
        D = 0
    }
    var B;
    if (C[A] == null) {
        B = 0
    } else {
        f = C[A];
        if (E >= 1 && E <= 59) {
            B = D / f / ((1 / 52) * E - (8 / 52))
        } else {
            if (E >= 60 && E <= 70) {
                B = D / f * ((-3 / 82) * E + (131 / 41))
            } else {
                B = 0
            }
        }
    }
    return B
}

function g_setRatingLevel(F, E, A, C) {
    var D = prompt(LANG.prompt_ratinglevel, E);
    if (D != null) {
        D |= 0;
        if (D != E && D >= 1 && D <= 70) {
            E = D;
            var B = g_convertRatingToPercent(E, A, C);
            B = (Math.round(B * 100) / 100);
            if (A != 12 && A != 37) {
                B += "%"
            }
            F.innerHTML = sprintf(LANG.tooltip_combatrating, B, E);
            F.onclick = g_setRatingLevel.bind(0, F, E, A, C)
        }
    }
}

function g_getMoneyHtml(C) {
    var B = 0,
        A = "";
    if (C >= 10000) {
        B = 1;
        A += '<span class="moneygold">' + Math.floor(C / 10000) + "</span>";
        C %= 10000
    }
    if (C >= 100) {
        if (B) {
            A += " "
        } else {
            B = 1
        }
        A += '<span class="moneysilver">' + Math.floor(C / 100) + "</span>";
        C %= 100
    }
    if (C >= 1) {
        if (B) {
            A += " "
        } else {
            B = 1
        }
        A += '<span class="moneycopper">' + C + "</span>"
    }
    return A
}

function g_getPatchVersion(E) {
    var D = g_getPatchVersion;
    var B = 0,
        C = D.T.length - 2,
        A;
    while (C > B) {
        A = Math.floor((C + B) / 2);
        if (E >= D.T[A] && E < D.T[A + 1]) {
            return D.V[A]
        }
        if (E >= D.T[A]) {
            B = A + 1
        } else {
            C = A - 1
        }
    }
    A = Math.ceil((C + B) / 2);
    return D.V[A]
}

g_getPatchVersion.V = ["1.12.0", "1.12.1", "1.12.2"];
g_getPatchVersion.T = [1153540800000, 1159243200000, 1160712000000];

function g_expandSite() {
    de(ge("sidebar"));
    de(ge("header-ad"));
    ge("wrapper").className = "noads";
    var A = ge("contribute-ad");
    if (A) {
        de(A)
    }
}

function g_insertTag(E, H, A, J) {
    var C = $(E);
    C.focus();
    if (C.selectionStart != null) {
        var K = C.selectionStart,
            G = C.selectionEnd,
            I = C.scrollLeft,
            D = C.scrollTop;
        var B = C.value.substring(K, G);
        if (typeof J == "function") {
            B = J(B)
        }
        C.value = C.value.substr(0, K) + H + B + A + C.value.substr(G);
        C.selectionStart = C.selectionEnd = G + H.length;
        C.scrollLeft = I;
        C.scrollTop = D
    } else {
        if (document.selection && document.selection.createRange) {
            var F = document.selection.createRange();
            if (F.parentElement() != C) {
                return
            }
            var B = F.text;
            if (typeof J == "function") {
                B = J(B)
            }
            F.text = H + B + A
        }
    }
    if (C.onkeyup) {
        C.onkeyup()
    }
}

function g_getLocaleFromDomain(B) {
    var A = g_getLocaleFromDomain.L;
    return (A[B] ? A[B] : 0)
}

g_getLocaleFromDomain.L = {
    fr: 2,
    de: 3,
    es: 6,
    wotlk: 25
};

function g_getIdFromTypeName(A) {
    var B = g_getIdFromTypeName.L;
    return (B[A] ? B[A] : -1)
}

g_getIdFromTypeName.L = {
    npc: 1,
    object: 2,
    item: 3,
    itemset: 4,
    quest: 5,
    spell: 6,
    zone: 7,
    faction: 8
};

function g_getIngameLink(color, entry, name) {
    prompt('Copy/paste the following to your in-game chat window:',
    '/script DEFAULT_CHAT_FRAME:AddMessage("\\124c' + color + "\\124Hitem:" + entry + ":0:0:0:0:0:0:0:0\\124h[" + name.replace(/"/g, '\\"') + ']\\124h\\124r");');

    // prompt('Copy/paste the following to your in-game chat window:',
    //     '"\\124c' + color + "\\124Hitem:" + entry + ":0:0:0:0:0:0:0:0\\124h[" + name.replace(/"/g, '\\"') + ']\\124h\\124r"');
}

function g_isEmailValid(A) {
    return A.match(/^[A-Z0-9._-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) != null
}

function g_userDescription() {
    var C = ge("description");
    var D = (typeof g_pageInfo == "object" && g_user.name == g_pageInfo.username);
    var B = (C.childNodes.length == 0);
    if (B) {
        if (D) {
            ae(C, ct(LANG.user_nodescription2))
        } else {
            ae(C, ct(LANG.user_nodescription))
        }
    }
    if (D) {
        var A = ce("button"),
            E = ce("div");
        E.className = "pad";
        A.onclick = function () {
            location.href = "?account#public-description"
        };
        if (B) {
            ae(A, ct(LANG.user_composeone))
        } else {
            ae(A, ct(LANG.user_editdescription))
        }
        ae(C, E);
        ae(C, A)
    }
}

function co_addYourComment() {
    tabsContribute.focus(0);
    var A = gE(document.forms.addcomment, "textarea")[0];
    A.focus()
}

function co_cancelReply() {
    ge("replybox-generic").style.display = "none";
    document.forms.addcomment.elements.replyto.value = ""
}

function co_validateForm(B) {
    var A = gE(B, "textarea")[0];
    if (Listview.funcBox.coValidate(A)) {
        if (g_user.permissions & 1) {
            return true
        }
    }
    return false
}

function ss_submitAScreenshot() {
    tabsContribute.focus(1)
}

function ss_validateForm(A) {
    if (!A.elements.screenshotfile.value.length) {
        alert(LANG.message_noscreenshot);
        return false
    }
    return true
}

function ss_appendSticky() {
    var J = ge("infobox-sticky");
    var F = g_pageInfo.type;
    var A = g_pageInfo.typeId;
}

function Ajax(B, C) {
    if (!B) {
        return
    }
    var A;
    try {
        A = new XMLHttpRequest()
    } catch (D) {
        try {
            A = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (D) {
            try {
                A = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (D) {
                if (window.createRequest) {
                    A = window.createRequest()
                } else {
                    alert(LANG.message_ajaxnotsupported);
                    return
                }
            }
        }
    }
    this.request = A;
    cO(this, C);
    this.method = this.method || (this.params && "POST") || "GET";
    A.open(this.method, B, this.async == null ? true : this.async);
    A.onreadystatechange = Ajax.onReadyStateChange.bind(this);
    if (this.method.toUpperCase() == "POST") {
        A.setRequestHeader("Content-Type", (this.contentType || "application/x-www-form-urlencoded") + "; charset=" + (this.encoding || "UTF-8"))
    }
    A.send(this.params)
}

Ajax.onReadyStateChange = function () {
    if (this.request.readyState == 4) {
        if (this.request.status == 0 || (this.request.status >= 200 && this.request.status < 300)) {
            this.onSuccess != null && this.onSuccess(this.request, this)
        } else {
            this.onFailure != null && this.onFailure(this.request, this)
        }
        if (this.onComplete != null) {
            this.onComplete(this.request, this)
        }
    }
};

function g_ajaxIshRequest(A) {
    var B = document.getElementsByTagName("head")[0];
    ae(B, ce("script", {
        type: "text/javascript",
        src: A
    }))
}

var Menu = {
    iframes: [],
    divs: [],
    selection: [],
    show: function () {
        try {
            clearTimeout(Menu.timer);
            if (Menu.currentLink) {
                Menu._show(this)
            } else {
                this.className = "open";
                Menu.timer = setTimeout(Menu._show.bind(0, this), 100)
            }
        } catch (A) {
        }
    },
    _show: function (B) {
        if (Menu.currentLink != B) {
            var A = ac(B);
            Menu._hide();
            Menu.selection = [-1];
            Menu.currentLink = B;
            Menu.showDepth(0, B.menu, A[0], A[1] + B.offsetHeight + 1, B.offsetHeight + 8, B.offsetWidth, A[1]);
            B.className = "open"
        } else {
            Menu.truncate(0);
            Menu.clean(0)
        }
    },
    showAtCursor: function (A) {
        A = $E(A);
        clearTimeout(Menu.timer);
        Menu._hide();
        Menu.selection = [-1];
        Menu.currentLink = null;
        var B = g_getCursorPos(A);
        Menu.showDepth(0, this.menu, B.x, B.y, 0, 0, 0)
    },
    hide: function () {
        try {
            clearTimeout(Menu.timer);
            if (Menu.currentLink) {
                Menu.timer = setTimeout(Menu._hide, 333)
            } else {
                this.className = ""
            }
        } catch (A) {
        }
    },
    _hide: function () {
        for (var B = 0, A = Menu.selection.length; B < A; ++B) {
            Menu.divs[B].style.display = "none";
            Menu.divs[B].style.visibility = "hidden";
            if (Browser.ie6) {
                Menu.iframes[B].style.display = "none"
            }
        }
        Menu.selection = [];
        if (Menu.currentLink) {
            Menu.currentLink.className = ""
        }
        Menu.currentLink = null
    },
    sepOver: function () {
        var B = this.d;
        var A = B.i;
        Menu.truncate(A);
        Menu.clean(A);
        Menu.selection[A] = -1
    },
    elemOver: function () {
        var E = this.d;
        var D = E.i;
        var C = this.i;
        var A = this.k;
        var B = this.firstChild.className == "menusub";
        Menu.truncate(D + B);
        if (B && C != Menu.selection[D]) {
            var F = ac(this);
            Menu.selection[D + 1] = -1;
            Menu.showDepth(D + 1, E.menuArray[C][3], F[0], F[1] - 2, this.offsetHeight, this.offsetWidth - 3, 0)
        }
        Menu.clean(D);
        Menu.selection[D] = A;
        if (this.className.length) {
            this.className += " open"
        } else {
            this.className = "open"
        }
    },
    getIframe: function (A) {
        var B;
        if (Menu.iframes[A] == null) {
            B = ce("iframe");
            B.src = "javascript:0;";
            B.frameBorder = 0;
            ae(ge("layers"), B);
            Menu.iframes[A] = B
        } else {
            B = Menu.iframes[A]
        }
        return B
    },
    getDiv: function (B, A) {
        var C;
        if (Menu.divs[B] == null) {
            C = ce("div");
            C.className = "menu";
            ae(ge("layers"), C);
            Menu.divs[B] = C
        } else {
            C = Menu.divs[B]
        }
        C.i = B;
        C.menuArray = A;
        return C
    },
    showDepth: function (Z, V, M, L, g, N, D) {
        var r, n = Menu.getDiv(Z, V);
        while (n.firstChild) {
            de(n.firstChild)
        }
        var l = ce("table"),
            A = ce("tbody"),
            E = ce("tr"),
            I = ce("td"),
            Q = ce("div"),
            G = ce("div");
        var S = 999;
        var P = g_getWindowSize(),
            C = g_getScroll(),
            J = P.w,
            T = P.h,
            B = C.x,
            o = C.y;
        if (g > 0) {
            if ((25 + 1) * V.length > T - 25 - D) {
                for (var X = 2; X < 4; ++X) {
                    if (g / X * V.length + 30 < T - D) {
                        break
                    }
                }
                S = Math.floor(V.length / X)
            }
        }
        var H = 0;
        var U = 0;
        for (var X = 0, e = V.length; X < e; ++X) {
            if (V[X][0] == null) {
                var Y = ce("span");
                Y.className = "separator";
                ns(Y);
                ae(Y, ct(V[X][1]));
                Y.d = n;
                Y.onmouseover = Menu.sepOver;
                ae(G, Y)
            } else {
                var q = ce("a");
                q.d = n;
                q.k = U++;
                q.i = X;
                if (V[X][2]) {
                    if (Menu.currentLink && Menu.currentLink.menuappend) {
                        if (V[X][2].indexOf(Menu.currentLink.menuappend) == -1) {
                            q.href = V[X][2] + Menu.currentLink.menuappend
                        } else {
                            q.href = V[X][2]
                        }
                    } else {
                        if (typeof V[X][2] == "function") {
                            q.href = "javascript:;";
                            q.onclick = V[X][2];
                            ns(q)
                        } else {
                            q.href = V[X][2]
                        }
                    }
                } else {
                    q.href = "javascript:;";
                    q.style.cursor = "default";
                    ns(q)
                }
                q.onmouseover = Menu.elemOver;
                var O = ce("span"),
                    F = ce("span");
                if (V[X][3] != null) {
                    O.className = "menusub"
                }
                if (V[X][5] != null) {
                    V[X][5] = V[X][5].toLowerCase();
                    F.className = "icontiny";
                    F.style.backgroundImage = "url(images/icons/small/" + V[X][5] + ".png)";
                    if (V[X].checked) {
                        var K = ce("span");
                        K.className = "menucheck";
                        ae(K, ct(V[X][1]));
                        ae(F, K);
                    } else {
                        ae(F, ct(V[X][1]));
                    }
                } else {
                    if (V[X].checked) {
                        F.className = "menucheck"
                    }
                    ae(F, ct(V[X][1]));
                }
                ae(O, F);
                ae(q, O);
                ae(G, q)
            }
            if (H++ == S) {
                Q.onmouseover = Menu.divOver;
                Q.onmouseout = Menu.divOut;
                ae(Q, G);
                if (!Browser.ie6) {
                    var R = ce("p");
                    ae(R, ce("em"));
                    ae(R, ce("var"));
                    ae(R, ce("strong"));
                    ae(R, Q);
                    ae(I, R)
                } else {
                    ae(I, Q)
                }
                ae(E, I);
                I = ce("td");
                R = ce("p");
                Q = ce("div");
                G = ce("div");
                H = 0
            }
        }
        Q.onmouseover = Menu.divOver;
        Q.onmouseout = Menu.divOut;
        ae(Q, G);
        if (!Browser.ie6) {
            if (S != 999) {
                var R = ce("p");
                ae(R, ce("em"));
                ae(R, ce("var"));
                ae(R, ce("strong"));
                ae(R, Q);
                ae(I, R)
            } else {
                ae(n, ce("em"));
                ae(n, ce("var"));
                ae(n, ce("strong"));
                ae(I, Q)
            }
        } else {
            ae(I, Q)
        }
        ae(E, I);
        ae(A, E);
        ae(l, A);
        ae(n, l);
        n.style.left = n.style.top = "-2323px";
        n.style.display = "";
        var K = l.offsetWidth,
            W = l.offsetHeight;
        if (V.rightAligned) {
            M = M + N - K
        } else {
            if (M + N + K + 15 > J) {
                M = Math.max(0, M - K - 3)
            } else {
                if (Z > 0) {
                    M += N
                }
            }
        }
        if (L + W > T + o) {
            L = Math.max(o + 5, T + o - W - 10)
        }
        n.style.left = M + "px";
        n.style.top = L + "px";
        if (Browser.ie6) {
            r = Menu.getIframe(Z);
            r.style.left = M + "px";
            r.style.top = L + "px";
            r.style.width = K + "px";
            r.style.height = W + "px";
            r.style.display = "";
            r.style.visibility = "visible"
        }
        n.style.visibility = "visible";
        if (Browser.opera) {
            n.style.display = "none";
            n.style.display = ""
        }
    },
    divOver: function () {
        clearTimeout(Menu.timer)
    },
    divOut: function () {
        clearTimeout(Menu.timer);
        Menu.timer = setTimeout(Menu._hide, 333)
    },
    truncate: function (A) {
        var B;
        while (Menu.selection.length - 1 > A) {
            B = Menu.selection.length - 1;
            Menu.divs[B].style.display = "none";
            Menu.divs[B].style.visibility = "hidden";
            if (Browser.ie6) {
                Menu.iframes[B].style.display = "none"
            }
            Menu.selection.pop()
        }
    },
    clean: function (A) {
        for (var B = A; B < Menu.selection.length; ++B) {
            if (Menu.selection[B] != -1) {
                d = gE(Menu.divs[B], "a")[Menu.selection[B]];
                if (d.className.indexOf("sub") != -1) {
                    d.className = "sub"
                } else {
                    d.className = ""
                }
                Menu.selection[B] = -1
            }
        }
    },
    append: function (A, B) {
        A[2] += B;
        if (A[3] != null) {
            Menu._append(A[3], B)
        }
    },
    _append: function (A, C) {
        var D, E = 0;
        for (var B = 0; B < A.length; ++B) {
            if (A[B][2].indexOf("sl=") != -1) {
                C = C.replace(/sl=([0-9]:?)+/, "");
                E = 1
            } else {
                if (A[B][2].indexOf("cl=") != -1) {
                    C = C.replace(/cl=[0-9]+/, "");
                    E = 1
                }
            }
            if (E) {
                C = C.replace("&filter=", ";");
                C = rtrim(C, ";");
                C = C.replace(";;", ";")
            }
            A[B][2] += C;
            if (A[B][3]) {
                Menu._append(A[B][3], C)
            }
        }
    },
    fixUrls: function (E, B, D) {
        for (var C = 0, A = E.length; C < A; ++C) {
            if (E[C][2] == null) {
                E[C][2] = B + E[C][0]
            }
            if (E[C][3]) {
                if (D) {
                    Menu.fixUrls(E[C][3], B, D)
                } else {
                    Menu.fixUrls(E[C][3], B + E[C][0] + ".", D)
                }
            }
        }
    },
    addButtons: function (F, E) {
        for (var C = 0, A = E.length; C < A; ++C) {
            if (E[C][0] == null) {
                continue
            }
            var B = ce("a"),
                D = ce("span");
            if (E[C][2]) {
                B.href = E[C][2]
            } else {
                B.href = "javascript:;";
                B.style.cursor = "default";
                B.style.textDecoration = "none";
                ns(B)
            }
            if (E[C][3] != null) {
                D.className = "menuarrowd";
                B.menu = E[C][3];
                B.onmouseover = Menu.show;
                B.onmouseout = Menu.hide
            }
            ae(D, ct(E[C][1]));
            ae(B, D);
            ae(F, B)
        }
    },
    explode: function (F) {
        var B = [],
            E = null,
            D;
        for (var C = 0, A = F.length; C < A; ++C) {
            if (F[C][0] != null) {
                if (E != null) {
                    D.push(F[C])
                } else {
                    B.push(F[C])
                }
            }
            if (E != null && (F[C][0] == null || C == A - 1)) {
                B.push([0, E[1], , D])
            }
            if (F[C][0] == null) {
                E = F[C];
                D = []
            }
        }
        return B
    }
};

function Tabs(A) {
    cO(this, A);
    if (this.parent) {
        this.parent = $(this.parent)
    } else {
        return
    }
    this.oldMode = (Browser.geckoVersion > 20000000 && Browser.geckoVersion <= 20060414);
    this.selectedTab = -1;
    this.uls = [];
    this.tabs = [];
    this.nShows = 0;
    if (this.poundable == null) {
        this.poundable = 1
    }
    this.poundedTab = null;
    if (this.onLoad == null) {
        this.onLoad = Tabs.onLoad.bind(this)
    }
    if (this.onShow == null) {
        this.onShow = Tabs.onShow.bind(this)
    }
    if (this.onHide) {
        this.onHide = this.onHide.bind(this)
    }
}

Tabs.prototype = {
    add: function (A, D) {
        var C, B = this.tabs.length;
        C = {
            caption: A,
            index: B,
            owner: this
        };
        cO(C, D);
        this.tabs.push(C);
        return B
    },
    focus: function (A) {
        if (A < 0) {
            A = this.tabs.length + A
        }
        this.forceScroll = 1;
        gE(this.uls[this.oldMode ? 0 : 2], "a")[A].onclick({}, true);
        this.forceScroll = null
    },
    show: function (C, E) {
        var B;
        if (isNaN(C) || C < 0) {
            C = 0
        } else {
            if (C >= this.tabs.length) {
                C = this.tabs.length - 1
            }
        }
        if (E == null && C == this.selectedTab) {
            return
        }
        if (this.selectedTab != -1) {
            B = this.tabs[this.selectedTab];
            if (this.onHide && !this.onHide(B)) {
                return
            }
            if (B.onHide && !B.onHide()) {
                return
            }
        }
        ++this.nShows;
        var A = this.oldMode ? 0 : 3;
        for (var D = 0; D <= A; ++D) {
            B = gE(this.uls[D], "a");
            if (this.selectedTab != -1) {
                B[this.selectedTab].className = ""
            }
            B[C].className = "selected"
        }
        B = this.tabs[C];
        if (B.onLoad) {
            B.onLoad();
            B.onLoad = null
        }
        this.onShow(this.tabs[C], this.tabs[this.selectedTab]);
        if (B.onShow) {
            B.onShow(this.tabs[this.selectedTab])
        }
        this.selectedTab = C
    },
    flush: function (J) {
        if (this.oldMode) {
            var H, M, C, K;
            H = ce("ul");
            H.className = "old-tabs";
            for (var G = 0; G < this.tabs.length; ++G) {
                var D = this.tabs[G];
                M = ce("li");
                C = ce("div");
                K = ce("a");
                if (this.poundable) {
                    K.href = "#" + D.id
                } else {
                    K.href = "javascript:;"
                }
                ns(K);
                K.onclick = Tabs.onClick.bind(D, K);
                ae(K, ct(D.caption));
                ae(M, C);
                ae(M, K);
                ae(H, M)
            }
            this.uls[0] = H;
            ae(this.parent, H)
        } else {
            var L, E, K, I, A;
            var B = ce("div");
            B.className = "tabs-container";
            I = ce("div");
            I.style.visibility = "hidden";
            this.uls[0] = ce("ul");
            this.uls[0].className = "tabs";
            ae(I, this.uls[0]);
            ae(B, I);
            I = ce("div");
            I.className = "tabs-levels";
            for (var G = 1; G <= 3; ++G) {
                A = ce("div");
                A.className = "tabs-level";
                this.uls[G] = ce("ul");
                this.uls[G].className = "tabs";
                this.uls[G].style.top = (-30 * (3 - G)) + "px";
                ae(A, this.uls[G]);
                ae(I, A)
            }
            ae(B, I);
            for (var G = 0; G < this.tabs.length; ++G) {
                var D = this.tabs[G];
                for (var F = 0; F <= 3; ++F) {
                    E = ce("li");
                    K = ce("a");
                    b = ce("b");
                    if (this.poundable) {
                        K.href = "#" + D.id
                    } else {
                        K.href = "javascript:;"
                    }
                    if (F > 0) {
                        ns(K);
                        K.onclick = Tabs.onClick.bind(D, K)
                    }
                    if (!Browser.ie6) {
                        I = ce("div");
                        ae(I, ct(D.caption));
                        ae(K, I)
                    }
                    ae(b, ct(D.caption));
                    ae(K, b);
                    ae(E, K);
                    ae(this.uls[F], E)
                }
            }
            ae(this.parent, B)
        }
        if (this.onLoad) {
            L = this.onLoad();
            if (L != null) {
                this.poundedTab = J = L
            }
        }
        this.show(J)
    },
    setTabName: function (C, B) {
        var A = this.oldMode ? 0 : 3;
        for (var D = 0; D <= A; ++D) {
            _ = gE(this.uls[D], "a");
            g_setTextNodes(_[C], B)
        }
    },
    setTabPound: function (C, A) {
        if (!this.poundable) {
            return
        }
        var B = this.oldMode ? 0 : 3;
        for (var D = 0; D <= B; ++D) {
            _ = gE(this.uls[D], "a");
            _[C].href = "#" + this.tabs[C].id + ":" + A
        }
    }
};
Tabs.onClick = function (A, E, D) {
    if (D == null && this.index == this.owner.selectedTab) {
        return
    }
    var C = rf2(E);
    if (C == null) {
        return
    }
    this.owner.show(this.index, D);
    if (this.owner.poundable) {
        var B = A.href.indexOf("#");
        B != -1 && location.replace(A.href.substr(B))
    }
    return C
};
Tabs.onLoad = function () {
    if (!this.poundable || !location.hash.length) {
        return
    }
    var A = location.hash.substr(1).split(":")[0];
    if (A) {
        return in_array(this.tabs, A, function (B) {
            return B.id
        })
    }
};
Tabs.onShow = function (E, D) {
    var B;
    if (D) {
        ge("tab-" + D.id).style.display = "none"
    }
    B = ge("tab-" + E.id);
    B.style.display = "";
    if ((this.nShows == 1 && this.poundedTab != null && this.poundedTab >= 0) || this.forceScroll) {
        var C, A;
        if (this.__st) {
            C = this.__st;
            A = 15
        } else {
            C = B;
            A = this.parent.offsetHeight + 15
        }
        if (Browser.ie) {
            setTimeout(g_scrollTo.bind(this, C, A), 1)
        } else {
            g_scrollTo(C, A)
        }
    }
};
var Icon = {
    sizes: ["small", "medium", "large"],
    create: function (A, J, I, D, B, H) {
        var G;
        var E = ce("div"),
            C = ce("div");
        E.className = "icon" + Icon.sizes[J];
        if (A != null) {
            E.style.backgroundImage = "url(images/icons/" + Icon.sizes[J] + "/" + A.toLowerCase() + ".png)"
        }
        C.className = "tile";
        if (I || D) {
            var F = ce("a");
            if (I && I.length) {
                F.tooltip = I;
                F.onmouseover = Icon.over;
                F.onmouseout = Icon.out
            }
            if (D) {
                F.href = D
            } else {
                F.href = "javascript:;";
                ns(F)
            }
            ae(C, F)
        } else {
            if (J == 2) {
                E.ondblclick = function () {
                    prompt("", A)
                }
            }
        }
        if (B != null && (B > 1 || B.length)) {
            G = g_createGlow(B, "q1");
            G.style.right = "0";
            G.style.bottom = "0";
            G.style.position = "absolute";
            ae(C, G)
        }
        if (H != null && H > 0) {
            G = g_createGlow("(" + H + ")", "q");
            G.style.left = "0";
            G.style.top = "0";
            G.style.position = "absolute";
            ae(C, G)
        }
        ae(E, C);
        return E
    },
    over: function () {
        if (this.tooltip != null) {
            Tooltip.show(this, this.tooltip, 0, 0)
        }
    },
    out: function () {
        Tooltip.hide()
    }
};
var Tooltip = {
    clip: "main-contents",
    create: function (G) {
        var E = ce("div"),
            J = ce("table"),
            C = ce("tbody"),
            D = ce("tr"),
            B = ce("tr"),
            A = ce("td"),
            I = ce("th"),
            H = ce("th"),
            F = ce("th");
        E.className = "tooltip";
        I.style.backgroundPosition = "top right";
        H.style.backgroundPosition = "bottom left";
        F.style.backgroundPosition = "bottom right";
        if (G) {
            A.innerHTML = G
        }
        ae(D, A);
        ae(D, I);
        ae(C, D);
        ae(B, H);
        ae(B, F);
        ae(C, B);
        ae(J, C);
        Tooltip.icon = ce("p");
        Tooltip.icon.style.visibility = "hidden";
        ae(Tooltip.icon, ce("div"));
        ae(E, Tooltip.icon);
        ae(E, J);
        return E
    },
    fix: function (D, B, E) {
        var C = gE(D, "table")[0],
            G = gE(C, "td")[0],
            F = G.childNodes;
        if (F.length >= 2 && F[0].nodeName == "TABLE" && F[1].nodeName == "TABLE") {
            var A;
            if (F[1].offsetWidth > 300) {
                A = Math.max(300, F[0].offsetWidth) + 20
            } else {
                A = Math.max(F[0].offsetWidth, F[1].offsetWidth) + 20
            }
            if (A > 20) {
                D.style.width = A + "px";
                F[0].style.width = F[1].style.width = "100%";
                if (!B && D.offsetHeight > document.body.clientHeight) {
                    C.className = "shrink"
                }
            }
        }
        if (E) {
            D.style.visibility = "visible"
        }
    },
    fixSafe: function (C, B, A) {
        if (Browser.ie) {
            setTimeout(Tooltip.fix.bind(this, C, B, A), 1)
        } else {
            Tooltip.fix(C, B, A)
        }
    },
    append: function (B, A) {
        var B = $(B);
        var C = Tooltip.create(A);
        ae(B, C);
        Tooltip.fixSafe(C, 1, 1)
    },
    prepare: function () {
        if (!Tooltip.tooltip) {
            var B = Tooltip.create();
            B.style.position = "absolute";
            B.style.left = B.style.top = "-2323px";
            var A = ge("layers");
            ae(A, B);
            Tooltip.tooltip = B;
            Tooltip.tooltipTable = gE(B, "table")[0];
            Tooltip.tooltipTd = gE(B, "td")[0];
            if (Browser.ie6) {
                B = ce("iframe");
                B.src = "javascript:1;";
                B.frameBorder = 0;
                ae(A, B);
                Tooltip.iframe = B
            }
        }
    },
    move: function (O, M, P, K, B, A, U, H, N, T) {
        if (!Tooltip.tooltipTable) {
            return
        }
        var W, G = O,
            R = M,
            J = O,
            I = M,
            F = 0,
            E = 0,
            Q = g_getWindowSize(),
            D = g_getScroll(),
            L = Q.w,
            S = Q.h,
            C = D.x,
            V = D.y;
        if (U == null) {
            U = Tooltip.clip
        }
        if (H == null) {
            H = Tooltip.tooltip;
            N = Tooltip.tooltipTable.offsetWidth;
            T = Tooltip.tooltipTable.offsetHeight
        }
        H.style.width = N + "px";
        if (U) {
            W = ge(U);
            if (W) {
                c = ac(W);
                F = c[0];
                E = c[1];
                if (W.offsetWidth + F <= C + L) {
                    L = W.offsetWidth + F - C
                }
                if (W.offsetHeight + E <= V + S) {
                    S = W.offsetHeight + E - V
                }
            }
        }
        if (G + P + N > L) {
            G = Math.max(G - N, F) - B
        } else {
            G += P + B
        }
        if (G < F) {
            G = F
        } else {
            if (G + N > C + L) {
                G = C + L - N
            }
        }
        if (R - T > Math.max(V, E)) {
            R -= T + A
        } else {
            R += K + A
        }
        if (R < E) {
            R = E
        } else {
            if (R + T > V + S) {
                R = Math.max(V, V + S - T)
            }
        }
        if (Tooltip.iconVisible) {
            if (J >= G - 48 && J <= G && I >= R - 4 && I <= R + 48) {
                R -= 48 - (I - R)
            }
        }
        H.style.left = G + "px";
        H.style.top = R + "px";
        H.style.visibility = "visible";
        if (Browser.ie6 && Tooltip.iframe) {
            W = Tooltip.iframe;
            W.style.left = G + "px";
            W.style.top = R + "px";
            W.style.width = N + "px";
            W.style.height = T + "px";
            W.style.display = "";
            W.style.visibility = "visible"
        }
    },
    show: function (G, E, A, F, C) {
        if (Tooltip.disabled) {
            return
        }
        var B;
        Tooltip.prepare();
        if (C) {
            E = '<span class="' + C + '">' + E + "</span>"
        }
        B = Tooltip.tooltip;
        B.style.width = "550px";
        B.style.left = "-2323px";
        B.style.top = "-2323px";
        Tooltip.tooltipTd.innerHTML = E;
        B.style.display = "";
        var D = ac(G);
        Tooltip.fix(B, 0, 0);
        Tooltip.move(D[0], D[1], G.offsetWidth, G.offsetHeight, A, F)
    },
    showAtCursor: function (B, E, A, G, D) {
        if (Tooltip.disabled) {
            return
        }
        if (!A || A < 10) {
            A = 10
        }
        if (!G || G < 10) {
            G = 10
        }
        B = $E(B);
        Tooltip.prepare();
        if (D) {
            E = '<span class="' + D + '">' + E + "</span>"
        }
        var C;
        C = Tooltip.tooltip;
        C.style.width = "550px";
        C.style.left = "-2323px";
        C.style.top = "-2323px";
        Tooltip.tooltipTd.innerHTML = E;
        C.style.display = "";
        var F = g_getCursorPos(B);
        Tooltip.fix(C, 0, 0);
        Tooltip.move(F.x, F.y, 0, 0, A, G)
    },
    showAtXY: function (E, A, F, D, C) {
        if (Tooltip.disabled) {
            return
        }
        Tooltip.prepare();
        var B;
        B = Tooltip.tooltip;
        B.style.width = "550px";
        B.style.left = "-2323px";
        B.style.top = "-2323px";
        Tooltip.tooltipTd.innerHTML = E;
        B.style.display = "";
        Tooltip.fix(B, 0, 0);
        Tooltip.move(A, F, 0, 0, D, C, null, null, null, null)
    },
    cursorUpdate: function (B, A, D) {
        if (Tooltip.disabled || !Tooltip.tooltip) {
            return
        }
        B = $E(B);
        if (!A || A < 10) {
            A = 10
        }
        if (!D || D < 10) {
            D = 10
        }
        var C = g_getCursorPos(B);
        Tooltip.move(C.x, C.y, 0, 0, A, D)
    },
    hide: function () {
        if (Tooltip.tooltip) {
            Tooltip.tooltip.style.display = "none";
            Tooltip.tooltip.visibility = "hidden";
            Tooltip.tooltipTable.className = "";
            if (Browser.ie6) {
                Tooltip.iframe.style.display = "none"
            }
            Tooltip.setIcon(null)
        }
    },
    setIcon: function (A) {
        Tooltip.prepare();
        if (A) {
            Tooltip.icon.style.backgroundImage = "url(images/icons/medium/" + A.toLowerCase() + ".png)";
            Tooltip.icon.style.visibility = "visible"
        } else {
            Tooltip.icon.style.backgroundImage = "none";
            Tooltip.icon.style.visibility = "hidden"
        }
        Tooltip.iconVisible = A ? 1 : 0
    }
};
var g_listviews = {};

function Listview(A) {
    cO(this, A);
    if (this.id) {
        var K = (this.tabs ? "tab-" : "lv-") + this.id;
        if (this.parent) {
            var H = ce("div");
            H.id = K;
            ae($(this.parent), H);
            this.container = H
        } else {
            this.container = ge(K)
        }
    } else {
        return
    }
    if (this.template) {
        this.template = Listview.templates[this.template]
    } else {
        return
    }
    g_listviews[this.id] = this;
    if (this.poundable == null) {
        if (this.template.poundable != null) {
            this.poundable = this.template.poundable
        } else {
            this.poundable = 1
        }
    }
    if (this.hideBands == null) {
        this.hideBands = this.template.hideBands
    }
    if (this.computeDataFunc == null && this.template.computeDataFunc != null) {
        this.computeDataFunc = this.template.computeDataFunc
    }
    if (this.createCbControls == null && this.template.createCbControls != null) {
        this.createCbControls = this.template.createCbControls
    }
    if (this.onBeforeCreate == null && this.template.onBeforeCreate != null) {
        this.onBeforeCreate = this.template.onBeforeCreate
    }
    if (this.onAfterCreate == null && this.template.onAfterCreate != null) {
        this.onAfterCreate = this.template.onAfterCreate
    }
    if (this.createNote == null && this.template.createNote != null) {
        this.createNote = this.template.createNote
    }
    this.rowOffset = 0;
    if (this.mode == null) {
        this.mode = this.template.mode
    }
    this.mode |= 0;
    if (this.nItemsPerPage == null) {
        var N = this.template.nItemsPerPage;
        this.nItemsPerPage = (N != null ? N : 50)
    }
    this.nItemsPerPage |= 0;
    if (this.nItemsPerPage <= 0) {
        this.nItemsPerPage = 0
    }
    if (this.mode == 3) {
        if (this.nItemsPerRow == null) {
            var M = this.template.nItemsPerRow;
            this.nItemsPerRow = (M != null ? M : 4)
        }
        this.nItemsPerRow |= 0;
        if (this.nItemsPerRow <= 1) {
            this.nItemsPerRow = 1
        }
    } else {
        this.nItemsPerRow = 1
    }
    this.columns = this.template.columns.slice(0);
    if (this.extraCols != null) {
        for (var D = 0, G = this.extraCols.length; D < G; ++D) {
            var I = null;
            var C = this.extraCols[D];
            if (C.after != null) {
                var F = in_array(this.columns, C.after, function (O) {
                    return O.id
                });
                if (F != -1) {
                    I = F + 1
                }
            }
            if (I == null) {
                I = this.columns.length
            }
            this.columns.splice(I, 0, C)
        }
    }
    this.visibility = [];
    var L = [],
        J = [];
    if (this.visibleCols != null) {
        array_walk(this.visibleCols, function (O) {
            L[O] = 1
        })
    }
    if (this.hiddenCols != null) {
        array_walk(this.hiddenCols, function (O) {
            J[O] = 1
        })
    }
    for (var D = 0, G = this.columns.length; D < G; ++D) {
        var C = this.columns[D];
        if (L[C.id] != null || (!C.hidden && J[C.id] == null)) {
            this.visibility.push(D)
        }
    }
    if (this.sort == null && this.template.sort) {
        this.sort = this.template.sort.slice(0)
    } else {
        if (this.sort != null) {
            var B = this.sort;
            this.sort = [];
            for (var D = 0, G = B.length; D < G; ++D) {
                var C = parseInt(B[D]);
                if (isNaN(C)) {
                    var E = 0;
                    if (B[D].charAt(0) == "-") {
                        E = 1;
                        B[D] = B[D].substring(1)
                    }
                    var F = in_array(this.columns, B[D], function (O) {
                        return O.id
                    });
                    if (F != -1) {
                        if (E) {
                            this.sort.push(-(F + 1))
                        } else {
                            this.sort.push(F + 1)
                        }
                    }
                } else {
                    this.sort.push(C)
                }
            }
        }
    }
    if (this.tabs) {
        this.tabIndex = this.tabs.add(this.getTabName(), {
            id: this.id,
            onLoad: this.initialize.bind(this)
        })
    } else {
        this.initialize()
    }
}

Listview.prototype = {
    initialize: function () {
        if (!this.data.length) {
            this.showNoData();
            return
        }
        if (this.computeDataFunc != null) {
            for (var E = 0, C = this.data.length; E < C; ++E) {
                this.computeDataFunc(this.data[E])
            }
        }
        if (this.tabs) {
            this.pounded = (this.tabs.poundedTab == this.tabIndex);
            if (this.pounded) {
                this.readPound()
            }
        } else {
            this.readPound()
        }
        this.updateSortIndex();
        var B;
        if (this.onBeforeCreate != null) {
            B = this.onBeforeCreate()
        }
        if (this.mode == 2) {
            this.mainDiv = ce("div");
            this.mainDiv.className = "listview-mode2";
            this.refreshRows();
            this.createBands(this.mainDiv)
        } else {
            this.table = ce("table");
            this.thead = ce("thead");
            this.tbody = ce("tbody");
            if (this.mode == 3) {
                this.tbody.className = "listview-mode3";
                var A = ce("colgroup");
                var F = (100 / this.nItemsPerRow) + "%";
                for (var E = 0; E < this.nItemsPerRow; ++E) {
                    var D = ce("col");
                    D.style.width = F;
                    ae(A, D)
                }
                ae(this.table, A)
            } else {
                this.tbody.className = "listview-std";
                this.createHeader();
                this.updateSortArrow()
            }
            ae(this.table, this.thead);
            ae(this.table, this.tbody);
            this.refreshRows();
            this.createBands(this.table);
            if (this.mode == 1 && Browser.ie) {
                setTimeout(Listview.cbIeFix.bind(this), 1)
            }
        }

        //	Сортируем при загрузке, дабы снизить нагрузку с сервера
        this.applySort();
        this.refreshRows();

        if (this.onAfterCreate != null) {
            this.onAfterCreate(B)
        }
    },
    createHeader: function () {
        var H = ce("tr");
        if (this.mode == 1) {
            var C = ce("th");
            var B = ce("div");
            var J = ce("a");
            C.style.width = "33px";
            if (this.poundable == 2) {
                J.style.cursor = "default";
                J.style.backgroundColor = "#585858"
            }
            J.href = "javascript:;";
            J.className = "listview-cb";
            ns(J);
            ae(J, ct(String.fromCharCode(160)));
            ae(B, J);
            ae(C, B);
            ae(H, C)
        }
        for (var E = 0, G = this.visibility.length; E < G; ++E) {
            var I = this.visibility[E];
            var D = this.columns[I];
            var C = ce("th");
            var B = ce("div");
            var J = ce("a");
            var A = ce("span");
            var F = ce("span");
            if (this.poundable == 2) {
                J.style.cursor = "default";
                J.style.backgroundColor = "#585858"
            }
            J.href = "javascript:;";
            J.onclick = this.sortBy.bind(this, I + 1);
            ns(J);
            if (D.tooltip != null) {
                J.onmouseover = Listview.headerOver.bind(J, D.tooltip);
                J.onmousemove = Tooltip.cursorUpdate;
                J.onmouseout = Tooltip.hide
            }
            if (D.width != null) {
                C.style.width = D.width
            }
            if (D.align != null) {
                C.style.textAlign = D.align
            }
            if (D.span != null) {
                C.colSpan = D.span
            }
            ae(F, ct(D.name));
            ae(A, F);
            ae(J, A);
            ae(B, J);
            ae(C, B);
            ae(H, C)
        }
        ae(this.thead, H)
    },
    createBands: function (E) {
        var C = ce("div"),
            D = ce("div");
        C.className = "listview-band-top";
        D.className = "listview-band-bottom";
        this.navTop = this.createNav();
        this.navBot = this.createNav();
        var A = ce("div"),
            B = ce("div");
        A.className = B.className = "listview-note";
        if (this.note) {
            A.innerHTML = this.note
        } else {
            if (this.createNote) {
                this.createNote(A, B)
            }
        }
        if (!A.firstChild && this.mode != 1) {
            ae(A, ct(String.fromCharCode(160)))
        }
        if (this.mode != 1) {
            ae(B, ct(String.fromCharCode(160)))
        }
        ae(C, this.navTop);
        ae(D, this.navBot);
        ae(C, A);
        ae(D, B);
        if (this.mode == 1) {
            ae(C, this.createCbBar());
            ae(D, this.createCbBar())
        }
        this.bandTop = C;
        this.bandBot = D;
        this.updateNav();
        if (this.hideBands != null) {
            C.style.display = D.style.display = "none"
        }
        ae(this.container, this.bandTop);
        ae(this.container, E);
        ae(this.container, this.bandBot)
    },
    createNav: function () {
        var B = ce("div");
        B.className = "listview-nav";
        var D = ce("a"),
            C = ce("a"),
            A = ce("a"),
            I = ce("a");
        D.href = C.href = A.href = I.href = "javascript:;";
        ae(D, ct(String.fromCharCode(171) + LANG.lvpage_first));
        ae(C, ct(String.fromCharCode(8249) + LANG.lvpage_previous));
        ae(A, ct(LANG.lvpage_next + String.fromCharCode(8250)));
        ae(I, ct(LANG.lvpage_last + String.fromCharCode(187)));
        ns(D);
        ns(C);
        ns(A);
        ns(I);
        D.onclick = this.firstPage.bind(this);
        C.onclick = this.previousPage.bind(this);
        A.onclick = this.nextPage.bind(this);
        I.onclick = this.lastPage.bind(this);
        var H = ce("span");
        var G = ce("b"),
            F = ce("b"),
            E = ce("b");
        ae(G, ct("a"));
        ae(F, ct("a"));
        ae(E, ct("a"));
        ae(H, G);
        ae(H, ct(LANG.hyphen));
        ae(H, F);
        ae(H, ct(LANG.lvpage_of));
        ae(H, E);
        ae(B, D);
        ae(B, C);
        ae(B, H);
        ae(B, A);
        ae(B, I);
        return B
    },
    createCbBar: function () {
        var F = ce("div");
        var C = ce("div");
        var B = ce("a"),
            A = ce("a"),
            E = ce("a");
        B.href = A.href = E.href = "javascript:;";
        ae(B, ct("All"));
        ae(A, ct("None"));
        ae(E, ct("Inverse"));
        B.onclick = Listview.cbSelect.bind(this, true);
        A.onclick = Listview.cbSelect.bind(this, false);
        E.onclick = Listview.cbSelect.bind(this, null);
        ns(B);
        ns(A);
        ns(E);
        ae(C, ct("Select: "));
        ae(C, B);
        ae(C, ct(LANG.comma));
        ae(C, A);
        ae(C, ct(LANG.comma));
        ae(C, E);
        if (this.createCbControls) {
            var D = ce("div");
            this.createCbControls(D, C);
            D.style.paddingBottom = "6px";
            ae(F, D)
        }
        ae(F, C);
        return F
    },
    refreshRows: function () {
        var B = this.data.length;
        var D = (this.mode == 2 ? this.mainDiv : this.tbody);
        while (D.firstChild) {
            D.removeChild(D.firstChild)
        }
        if (B > 0) {
            var G, A, F;
            if (this.nItemsPerPage > 0) {
                G = this.rowOffset;
                A = Math.min(B, this.rowOffset + this.nItemsPerPage)
            } else {
                G = 0;
                A = B
            }
            if (this.mode == 2) {
                for (var E = G; E < A; ++E) {
                    ae(this.mainDiv, this.getDiv(E))
                }
            } else {
                if (this.mode == 3) {
                    var C = 0,
                        H = ce("tr");
                    for (var E = G; E < A; ++E) {
                        ae(H, this.getCell(E));
                        if (++C == this.nItemsPerRow) {
                            ae(this.tbody, H);
                            if (E + 1 < A) {
                                H = ce("tr")
                            }
                            C = 0
                        }
                    }
                    if (C != 0) {
                        for (; C < 4; ++C) {
                            D = ce("td");
                            D.className = "empty-cell";
                            ae(H, D)
                        }
                        ae(this.tbody, H)
                    }
                } else {
                    for (var E = G; E < A; ++E) {
                        ae(this.tbody, this.getRow(E))
                    }
                }
            }
        } else {
            this.bandTop.style.display = this.bandBot.style.display = "none";
            if (this.mode == 2) {
                this.mainDiv.style.display = "none"
            } else {
                this.table.style.display = "none"
            }
            this.showNoData()
        }
    },
    showNoData: function () {
        var B = ce("div");
        B.className = "listview-nodata";
        var A = -1;
        if (this.template.onNoData) {
            A = (this.template.onNoData.bind(this, B))()
        }
        if (A == -1) {
            ae(B, ct(LANG.lvnodata))
        }
        ae(this.container, B)
    },
    getDiv: function (B) {
        var A = this.data[B];
        if (A.__div == null) {
            this.createDiv(A, B)
        }
        return A.__div
    },
    createDiv: function (A, B) {
        var C = ce("div");
        A.__div = C;
        (this.template.compute.bind(this, A, C, B))()
    },
    getCell: function (B) {
        var A = this.data[B];
        if (A.__div == null) {
            this.createCell(A, B)
        }
        return A.__td
    },
    createCell: function (A, B) {
        var C = ce("td");
        A.__td = C;
        (this.template.compute.bind(this, A, C, B))();
        if (this.template.getItemLink) {
            C.onclick = this.itemClick.bind(this, A)
        }
        if (Browser.ie6) {
            C.onmouseover = Listview.itemOver;
            C.onmouseout = Listview.itemOut
        }
    },
    getRow: function (A) {
        var B = this.data[A];
        if (B.__tr == null) {
            this.createRow(B)
        }
        return B.__tr
    },
    createRow: function (I) {
        var F = ce("tr");
        I.__tr = F;
        if (this.mode == 1) {
            var B = ce("td");
            B.className = "listview-cb";
            B.onclick = Listview.cbCellClick;
            var C = ce("input");
            ns(C);
            C.type = "checkbox";
            C.onclick = Listview.cbClick;
            if (I.__chk) {
                C.checked = true;
                if (Browser.ie) {
                    C.defaultChecked = true
                }
            }
            I.__cb = C;
            ae(B, C);
            ae(F, B)
        }
        for (var D = 0, E = this.visibility.length; D < E; ++D) {
            var G = this.visibility[D];
            var A = this.columns[G];
            var B = ce("td");
            if (A.align != null) {
                B.style.textAlign = A.align
            }
            var H = null;
            if (A.compute) {
                H = (A.compute.bind(this, I, B, F, G))()
            } else {
                if (I[A.value] != null) {
                    ae(B, ct(I[A.value]))
                } else {
                    H = -1
                }
            }
            if (H != -1 && H != null) {
                B.insertBefore(ct(H), B.firstChild)
            }
            ae(F, B)
        }
        if (this.mode == 1 && I.__chk) {
            F.className = "checked"
        }
        if (this.template.getItemLink) {
            F.onclick = this.itemClick.bind(this, I)
        }
        if (Browser.ie6) {
            F.onmouseover = Listview.itemOver;
            F.onmouseout = Listview.itemOut
        }
    },
    itemClick: function (A, D) {
        D = $E(D);
        var B = 0,
            C = D._target;
        while (C && B < 3) {
            if (C.nodeName == "A") {
                return
            }
            C = C.parentNode
        }
        location.href = this.template.getItemLink(A)
    },
    validatePage: function () {
        var C = this.nItemsPerPage,
            B = this.rowOffset,
            A = this.data.length;
        if (B < 0) {
            this.rowOffset = 0
        } else {
            this.rowOffset = this.getRowOffset(B + C > A ? A - 1 : B)
        }
    },
    getRowOffset: function (B) {
        var A = this.nItemsPerPage;
        return (A > 0 && B > 0 ? Math.floor(B / A) * A : 0)
    },
    changePage: function () {
        this.validatePage();
        this.refreshRows();
        this.updateNav();
        this.updatePound();
        var A = g_getScroll(),
            B = ac(this.container);
        if (A.y > B[1]) {
            scrollTo(A.x, B[1])
        }
    },
    firstPage: function () {
        this.rowOffset = 0;
        this.changePage();
        return false
    },
    previousPage: function () {
        this.rowOffset -= this.nItemsPerPage;
        this.changePage();
        return false
    },
    nextPage: function () {
        this.rowOffset += this.nItemsPerPage;
        this.changePage();
        return false
    },
    lastPage: function () {
        this.rowOffset = 99999999;
        this.changePage();
        return false
    },
    addSort: function (A, C) {
        var B = in_array(A, C, function (D) {
            return Math.abs(D)
        });
        if (B != -1) {
            C = A[B];
            A.splice(B, 1)
        }
        A.splice(0, 0, C)
    },
    sortBy: function (A) {
        if (this.poundable == 2 || A <= 0 || A > this.columns.length) {
            return
        }
        if (Math.abs(this.sort[0]) == A) {
            this.sort[0] = -this.sort[0]
        } else {
            this.addSort(this.sort, A)
        }
        this.applySort();
        if (this.template.onSort) {
            (this.template.onSort.bind(this))()
        }
        this.refreshRows();
        if (this.mode != 2) {
            this.updateSortArrow()
        }
        this.updatePound()
    },
    applySort: function () {
        Listview.sort = this.sort;
        Listview.columns = this.columns;
        if (this.indexCreated) {
            this.data.sort(Listview.sortIndexedRows)
        } else {
            this.data.sort(Listview.sortRows)
        }
        this.updateSortIndex()
    },
    setSort: function (B, A, C) {
        if (this.sort.toString() != B.toString()) {
            this.sort = B;
            this.applySort();
            if (A) {
                this.refreshRows()
            }
            if (C) {
                this.updatePound()
            }
        }
    },
    readPound: function () {
        if (!this.poundable || !location.hash.length) {
            return
        }
        var B = location.hash.substr(1);
        if (this.tabs) {
            var G = B.indexOf(":");
            if (G == -1) {
                return
            }
            B = B.substr(G + 1)
        }
        var A = parseInt(B);
        if (!isNaN(A)) {
            this.rowOffset = A;
            this.validatePage();
            if (this.poundable != 2) {
                var D = [];
                var F = B.match(/(\+|\-)[0-9]+/g);
                if (F != null) {
                    for (var C = F.length - 1; C >= 0; --C) {
                        var E = parseInt(F[C]) | 0;
                        var B = Math.abs(E);
                        if (B <= 0 || B > this.columns.length) {
                            break
                        }
                        this.addSort(D, E)
                    }
                    this.setSort(D, false, false)
                }
            }
            if (this.tabs) {
                this.tabs.setTabPound(this.tabIndex, this.getTabPound())
            }
        }
    },
    updateSortArrow: function () {
        if (!this.sort.length) {
            return
        }
        var A = in_array(this.visibility, Math.abs(this.sort[0]) - 1);
        if (A == -1) {
            return
        }
        if (this.mode == 1) {
            ++A
        }
        var B = this.thead.firstChild.childNodes[A].firstChild.firstChild.firstChild;
        if (this.lsa && this.lsa != B) {
            this.lsa.className = ""
        }
        B.className = (this.sort[0] < 0 ? "sortdesc" : "sortasc");
        this.lsa = B
    },
    updateSortIndex: function () {
        var B = this.data;
        for (var C = 0, A = B.length; C < A; ++C) {
            B[C].__si = C
        }
        this.indexCreated = true
    },
    updateTabName: function () {
        if (this.tabIndex != null) {
            this.tabs.setTabName(this.tabIndex, this.getTabName())
        }
    },
    updatePound: function () {
        if (!this.poundable) {
            return
        }
        var A = this.getTabPound();
        if (this.tabs) {
            this.tabs.setTabPound(this.tabIndex, A);
            location.replace("#" + this.id + ":" + A)
        } else {
            location.replace("#" + A)
        }
    },
    updateNav: function () {
        var J = this.nItemsPerPage,
            H = this.rowOffset,
            D = this.data.length;
        var B = 0,
            F = 0,
            C = 0,
            I = 0;
        if (J) {
            if (H > 0) {
                F = 1;
                if (H >= J + J) {
                    B = 1
                }
            }
            if (H + J < D) {
                C = 1;
                if (H + J + J < D) {
                    I = 1
                }
            }
        }
        var E = [this.navTop, this.navBot];
        for (var A = 0; A < 2; ++A) {
            var G = E[A].childNodes;
            G[0].style.display = (B ? "" : "none");
            G[1].style.display = (F ? "" : "none");
            G[3].style.display = (C ? "" : "none");
            G[4].style.display = (I ? "" : "none");
            G = G[2].childNodes;
            G[0].firstChild.nodeValue = H + 1;
            G[2].firstChild.nodeValue = J ? Math.min(H + J, D) : D;
            G[4].firstChild.nodeValue = D
        }
    },
    getTabName: function () {
        var A = this.name;
        var B = this.data.length;
        if (B > 0) {
            A += sprintf(LANG.qty, B)
        }
        return A
    },
    getTabPound: function () {
        var A = "";
        A += this.rowOffset;
        if (this.poundable != 2 && this.sort.length) {
            A += ("+" + this.sort.join("+")).replace(/\+\-/g, "-")
        }
        return A
    },
    getCheckedRows: function () {
        var D = [];
        for (var C = 0, A = this.data.length; C < A; ++C) {
            var B = this.data[C];
            if ((B.__cb && B.__cb.checked) || (!B.__cb && B.__chk)) {
                D.push(B)
            }
        }
        return D
    },
    deleteRows: function (M) {
        if (!M.length) {
            return
        }
        var C = 0;
        var H = 0;
        for (var E = M.length - 1; E >= 0; --E) {
            var L = M[E];
            var G = -1;
            if (L.__tr && L.__tr.rowIndex > 0) {
                G = this.rowOffset + L.__tr.rowIndex - 1
            } else {
                G = in_array(this.data, L);
                H = 1
            }
            if (G == -1) {
                continue
            }
            ++C;
            var K = this.nItemsPerPage;
            var F = this.rowOffset;
            var J = F + (K > 0 ? K : this.data.length) - 1;
            if (G >= F && G <= J) {
                if (this.mode == 2) {
                    de(L.__div)
                } else {
                    de(L.__tr)
                }
            }
            this.data.splice(G, 1)
        }
        if (C == 0) {
            return
        }
        this.updateTabName();
        if (this.rowOffset >= this.data.length) {
            this.previousPage()
        } else {
            if (this.data.length == 0 || H) {
                this.refreshRows()
            }
            this.updateNav();
            var K = this.nItemsPerPage;
            var A = (this.mode == 2 ? this.mainDiv : this.tbody);
            var B = (this.mode == 2 ? this.getDiv : this.getRow);
            var I = A.childNodes.length;
            if (K > 0 && this.rowOffset + I < this.data.length) {
                for (var E = this.rowOffset + I, D = E + K - I; E < D; ++E) {
                    ae(A, B(E))
                }
            }
        }
    }
};
Listview.sortRows = function (C, B) {
    var G = Listview.sort,
        H = Listview.columns;
    for (var F = 0, A = G.length; F < A; ++F) {
        var E, D = H[Math.abs(G[F]) - 1];
        if (D.sortFunc) {
            E = D.sortFunc(C, B, G[F])
        } else {
            E = strcmp(C[D.value], B[D.value])
        }
        if (E != 0) {
            return E * G[F]
        }
    }
    return 0
}, Listview.sortIndexedRows = function (B, A) {
    var E = Listview.sort,
        F = Listview.columns;
    var D, C = F[Math.abs(E[0]) - 1];
    if (C.sortFunc) {
        D = C.sortFunc(B, A, E[0])
    } else {
        D = strcmp(B[C.value], A[C.value])
    }
    if (D != 0) {
        return D * E[0]
    }
    return B.__si - A.__si
}, Listview.cbSelect = function (B) {
    for (var D = 0, A = this.data.length; D < A; ++D) {
        var C = this.data[D];
        var F = B;
        if (C.__tr) {
            var E = C.__tr.firstChild.firstChild;
            if (F == null) {
                F = !E.checked
            }
            if (E.checked != F) {
                E.checked = F;
                C.__tr.className = (E.checked ? "checked" : "");
                if (Browser.ie) {
                    E.defaultChecked = F;
                    if (Browser.ie6) {
                        (Listview.itemOut.bind(C.__tr))()
                    }
                }
            }
        } else {
            if (F == null) {
                F = true
            }
        }
        C.__chk = F
    }
};
Listview.cbClick = function (A) {
    setTimeout(Listview.cbUpdate.bind(0, 0, this, this.parentNode.parentNode), 1);
    sp(A)
};
Listview.cbCellClick = function (A) {
    setTimeout(Listview.cbUpdate.bind(0, 1, this.firstChild, this.parentNode), 1);
    sp(A)
};
Listview.cbIeFix = function () {
    var D = gE(this.tbody, "tr");
    for (var C = 0, A = D.length; C < A; ++C) {
        var B = D[C].firstChild.firstChild;
        B.checked = B.defaultChecked = false
    }
};
Listview.cbUpdate = function (B, A, C) {
    if (B) {
        A.checked = !A.checked
    }
    C.className = (A.checked ? "checked" : "");
    if (Browser.ie) {
        A.defaultChecked = A.checked;
        if (Browser.ie6) {
            (Listview.itemOver.bind(C))()
        }
    }
};
Listview.itemOver = function () {
    this.style.backgroundColor = (this.className == "checked" ? "#2C2C2C" : "#202020")
};
Listview.itemOut = function () {
    this.style.backgroundColor = (this.className == "checked" ? "#242424" : "transparent")
};
Listview.headerOver = function (B, A) {
    Tooltip.showAtCursor(A, B, 0, 0, "q")
};
Listview.extraCols = {
    cost: {
        id: "cost",
        name: LANG.cost,
        compute: function (A, B) {
            Listview.funcBox.appendMoney(B, A.cost[0], null, A.cost[1], A.cost[2], A.cost[3])
        },
        sortFunc: function (B, A, C) {
            var E = 0,
                D = 0;
            if (B.cost[3] != null) {
                array_walk(B.cost[3], function (F, G, G, H) {
                    E += Math.pow(10, H) + F[1]
                })
            }
            if (A.cost[3] != null) {
                array_walk(A.cost[3], function (F, G, G, H) {
                    D += Math.pow(10, H) + F[1]
                })
            }
            return strcmp(E, D) || strcmp(B.cost[2], A.cost[2]) || strcmp(B.cost[1], A.cost[1]) || strcmp(B.cost[0], A.cost[0])
        }
    },
    count: {
        id: "count",
        name: LANG.count,
        width: "11%",
        value: "count",
        compute: function (B, C) {
            if (B.outof) {
                var A = ce("div");
                A.className = "small q0";
                ae(A, ct(sprintf(LANG.lvdrop_outof, B.outof)));
                ae(C, A)
            }
            return B.count
        }
    },
    percent: {
        id: "percent",
        name: "%",
        width: "10%",
        value: "percent",
        compute: function (A, B) {
            if (A.percent >= 1.95) {
                return A.percent.toFixed(0)
            } else if (A.percent < 0) {
                return ((-1 * A.percent) + ' (' + LANG.types[5][0] + ')')
            } else {
                return parseFloat(A.percent.toFixed(4))
            }
        }
    },
    stock: {
        id: "stock",
        name: LANG.stock,
        width: "10%",
        value: "stock",
        compute: function (A, B) {
            if (A.stock > 0) {
                return A.stock
            } else {
                B.style.fontFamily = "Verdana, sans-serif";
                return String.fromCharCode(8734)
            }
        }
    }
};
Listview.funcBox = {
    createSimpleCol: function (C, D, A, B) {
        return {
            id: C,
            name: LANG[D],
            width: A,
            value: B
        }
    },
    initLootTable: function (A) {
        if (this._totalCount != null) {
            A.percent = A.count / this._totalCount
        } else {
            A.percent = A.count / A.outof
        }
        A.percent *= 100
    },
    beforeUserComments: function () {
        if ((g_user.roles & 26) != 0) {
            this.mode = 1;
            this.createCbControls = function (B) {
                var A = ce("input");
                A.type = "button";
                A.value = "Delete";
                A.onclick = (function () {
                    var E = this.getCheckedRows();
                    if (!E.length) {
                        alert("No comments selected.")
                    } else {
                        if (confirm("Are you sure that you want to delete " + (E.length == 1 ? "this comment" : "these " + E.length + " comments") + "?")) {
                            var C = "";
                            var D = 0;
                            array_walk(E, function (F) {
                                if (F.purged == 0 && F.deleted == 0) {
                                    F.deleted = 1;
                                    if (F.__tr != null) {
                                        F.__tr.childNodes[2].lastChild.lastChild.firstChild.nodeValue = " (Deleted)"
                                    }
                                    C += F.id + ","
                                } else {
                                    if (F.purged == 1) {
                                        ++D
                                    }
                                }
                            });
                            C = rtrim(C, ",");
                            if (C != "") {
                                new Ajax("?comment=delete&id=" + C + "&username=" + g_pageInfo.username)
                            }
                            (Listview.cbSelect.bind(this, false))();
                            if (D > 0) {
                                alert("Purged comments cannot be deleted.\n\nA purged comment is a comment that has been\nautomatically removed from the site due to a negative rating.")
                            }
                        }
                    }
                }).bind(this);
                ae(B, A);
                if (g_user.roles & 26) {
                    var A = ce("input");
                    A.type = "button";
                    A.value = "Undelete";
                    A.onclick = (function () {
                        var D = this.getCheckedRows();
                        if (!D.length) {
                            alert("No comments selected.")
                        } else {
                            var C = "";
                            array_walk(D, function (E) {
                                if (E.deleted == 1) {
                                    E.deleted = 0;
                                    if (E.__tr != null) {
                                        E.__tr.childNodes[2].lastChild.lastChild.firstChild.nodeValue = ""
                                    }
                                    C += E.id + ","
                                }
                            });
                            C = rtrim(C, ",");
                            if (C != "") {
                                new Ajax("?comment=undelete&id=" + C + "&username=" + g_pageInfo.username)
                            }
                            (Listview.cbSelect.bind(this, false))()
                        }
                    }).bind(this);
                    ae(B, A)
                }
            }
        }
    },
    assocArrCmp: function (C, B, A) {
        if (C == null) {
            return -1
        } else {
            if (B == null) {
                return 1
            }
        }
        var F = Math.max(C.length, B.length);
        for (var E = 0; E < F; ++E) {
            if (C[E] == null) {
                return -1
            } else {
                if (B[E] == null) {
                    return 1
                }
            }
            var D = strcmp(A[C[E]], A[B[E]]);
            if (D != 0) {
                return D
            }
        }
        return 0
    },
    location: function (E, F) {
        if (E.location == null) {
            return -1
        }
        for (var D = 0, B = E.location.length; D < B; ++D) {
            if (D > 0) {
                ae(F, ct(LANG.comma))
            }
            var A = E.location[D];
            if (A == -1) {
                ae(F, ct(LANG.ellipsis))
            } else {
                var C = ce("a");
                C.className = "q1";
                C.href = "?zone=" + A;
                ae(C, ct(g_zones[A]));
                ae(F, C)
            }
        }
    },
    createCenteredIcons: function (I, C, L) {
        if (I != null) {
            var H = ce("div"),
                A = ce("div");
            if (L) {
                var G = ce("div");
                G.style.position = "relative";
                G.style.width = "1px";
                var J = ce("div");
                J.className = "q0";
                J.style.position = "absolute";
                J.style.right = "2px";
                J.style.lineHeight = "26px";
                J.style.fontSize = "11px";
                J.style.whiteSpace = "nowrap";
                ae(J, ct(L));
                ae(G, J);
                ae(H, G)
            }
            for (var D = 0, F = I.length; D < F; ++D) {
                var B, E;
                if (typeof I[D] == "object") {
                    B = I[D][0];
                    E = I[D][1]
                } else {
                    B = I[D]
                }
                var K = g_items.createIcon(B, 0, E);
                K.style.cssFloat = K.style.styleFloat = "left";
                ae(H, K)
            }
            H.style.margin = "0 auto";
            H.style.textAlign = "left";
            H.style.width = (26 * I.length) + "px";
            A.className = "clear";
            ae(C, H);
            ae(C, A);
            return true
        }
    },
    getItemType: function (C, B, A) {
        if (A != null && g_item_subsubclasses[C] != null && g_item_subsubclasses[C][B] != null) {
            return g_item_subsubclasses[C][B][A]
        }
        if (g_item_subclasses[C] != null) {
            return g_item_subclasses[C][B]
        } else {
            return g_item_classes[C]
        }
    },
    getQuestCategory: function (A) {
        if (A > 0) {
            return g_zones[A]
        } else {
            return g_quest_sorts[-A]
        }
    },
    createTextRange: function (B, A) {
        B |= 0;
        A |= 0;
        if (B > 1 || A > 1) {
            if (B != A && A > 0) {
                return B + "-" + A
            } else {
                return B + ""
            }
        }
        return null
    },
    coGetColor: function (C, A) {
        if (C.user && g_customColors[C.user]) {
            return " comment-" + g_customColors[C.user]
        }
        switch (A) {
            case -1:
                var B = C.divPost.childNodes[1].className.match(/comment-([a-z]+)/);
                if (B != null) {
                    return " comment-" + B[1]
                }
                break;
            case 3:
            case 4:
                if (C.roles & 24) {
                    return " comment-green"
                }
                break
        }
        if (C.roles & 2) {
            return " comment-blue"
        } else {
            if (C.rating >= 10) {
                return " comment-green"
            } else {
                if (C.rating < 0) {
                    return " comment-bt"
                }
            }
        }
        return ""
    },
    coToggleVis: function (A) {
        this.firstChild.nodeValue = (g_toggleDisplay(A.divBody) ? LANG.lvcomment_hide : LANG.lvcomment_show);
        if (A.ratable) {
            A.divHeader.firstChild.lastChild.style.display = ""
        }
        g_toggleDisplay(A.divLinks);
        if (A.lastEdit != null) {
            g_toggleDisplay(A.divLastEdit)
        }
    },
    coRate: function (D, B) {
        if (B == 0) {
            var A = 5;
            if (g_user.roles & 2) {
                A = 25
            } else {
                if (g_user.roles & 16) {
                    A = 15
                }
            }
            var C = prompt(sprintf(LANG.prompt_customrating, A, A), 0);
            if (C == null) {
                return
            } else {
                C |= 0;
                if (C != 0 && Math.abs(C) <= A) {
                    B = C
                }
            }
            if (B == 0) {
                return
            }
        } else {
            if (g_user.roles & 26) {
                B *= 5
            }
        }
        new Ajax("?comment=rate&id=" + D.id + "&rating=" + B);
        D.rating += B;
        _ = D.divHeader.firstChild;
        _ = _.childNodes[_.childNodes.length - 3];
        _.lastChild.firstChild.nodeValue = (D.rating > 0 ? "+" : "") + D.rating;
        Tooltip.hide();
        de(_.nextSibling);
        de(_.nextSibling)
    },
    coDelete: function (A) {
        if (A.purged) {
            alert(LANG.message_cantdeletecomment)
        } else {
            if (confirm(LANG.confirm_deletecomment)) {
                new Ajax("?comment=delete&id=" + A.id);
                this.deleteRows([A])
            }
        }
    },
    coDetach: function (A) {
        if (A.replyTo == 0) {
            alert(LANG.message_cantdetachcomment)
        } else {
            if (confirm(LANG.confirm_detachcomment)) {
                new Ajax("?comment=detach&id=" + A.id);
                A.replyTo = 0;
                alert(LANG.message_commentdetached)
            }
        }
    },
    coEdit: function (G, E) {
        G.divBody.style.display = "none";
        G.divLinks.firstChild.style.display = "none";
        var F = ce("div");
        F.className = "comment-edit";
        G.divEdit = F;
        if (E == -1) {
            if (g_users[G.user] != null) {
                G.roles = g_users[G.user].roles
            }
        }
        var C = Listview.funcBox.coEditAppend(F, G, E);
        var B = ce("div");
        B.className = "comment-edit-buttons";
        var D = ce("input");
        D.type = "button";
        D.value = LANG.compose_save;
        D.onclick = Listview.funcBox.coEditButton.bind(D, G, true, E);
        ae(B, D);
        ae(B, ct(" "));
        D = ce("input");
        D.type = "button";
        D.value = LANG.compose_cancel;
        D.onclick = Listview.funcBox.coEditButton.bind(D, G, false, E);
        ae(B, D);
        ae(F, B);
        var A = F;
        if (Browser.ie6) {
            A = ce("div");
            A.style.width = "99%";
            ae(A, F)
        }
        if (E == -1) {
            G.divPost.insertBefore(A, G.divBody.nextSibling)
        } else {
            G.__div.insertBefore(A, G.divBody.nextSibling)
        }
        C.focus()
    },
    coEditAppend: function (L, C, K) {
        var F = Listview.funcBox.coGetCharLimit(K);
        if (K == 1 || K == 3 || K == 4) {
            C.user = g_user.name;
            C.roles = g_user.roles;
            C.rating = 1
        } else {
            if (K >= 1) {
                C.roles = 0;
                C.rating = 1
            }
        }
        if (K == -1 || K == 0) {
            var J = ce("div");
            J.className = "comment-edit-modes";
            ae(J, ct(LANG.compose_mode));
            var P = ce("a");
            P.className = "selected";
            P.onclick = Listview.funcBox.coModeLink.bind(P, 1, K);
            P.href = "javascript:;";
            ae(P, ct(LANG.compose_edit));
            ae(J, P);
            ae(J, ct("|"));
            var N = ce("a");
            N.onclick = Listview.funcBox.coModeLink.bind(N, 2, K);
            N.href = "javascript:;";
            ae(N, ct(LANG.compose_preview));
            ae(J, N);
            ae(L, J)
        }
        var A = ce("div");
        A.style.display = "none";
        A.className = "comment-body" + Listview.funcBox.coGetColor(C, K);
        ae(L, A);
        var H = ce("div");
        H.className = "comment-edit-body";
        var G = ce("div");
        G.className = "toolbar";
        var I = ce("textarea");
        I.className = "comment-editbox";
        I.rows = 10;
        I.value = C.body;
        switch (K) {
            case 1:
                I.name = "commentbody";
                break;
            case 2:
                I.name = "desc";
                I.originalValue = C.body;
                break;
            case 3:
                I.name = "body";
                break;
            case 4:
                I.name = "sig";
                I.originalValue = C.body;
                I.rows = (Browser.gecko ? 2 : 3);
                I.style.height = "auto";
                break
        }
        if (K != -1 && K != 0) {
            var E = ce("h3"),
                W = ce("a"),
                O = ce("div"),
                V = ce("div");
            var D = Listview.funcBox.coLivePreview.bind(I, C, K, O);
            if (C.body) {
                W.className = "disclosure-off";
                O.style.display = "none"
            } else {
                W.className = "disclosure-on"
            }
            ae(W, ct(LANG.compose_livepreview));
            ae(E, W);
            W.href = "javascript:;";
            W.onclick = function () {
                D(1);
                W.className = "disclosure-" + (g_toggleDisplay(O) ? "on" : "off")
            };
            ns(W);
            E.className = "first";
            V.className = "pad";
            ae(A, E);
            ae(A, O);
            ae(A, V);
            var U;
            var T = function () {
                if (U) {
                    clearTimeout(U);
                    U = null
                }
                U = setTimeout(D, 50)
            };
            I.onchange = T;
            I.onkeyup = T;
            aE(I, "focus", function () {
                D();
                A.style.display = "";
                if (K != 4) {
                    I.style.height = "22em"
                }
            })
        } else {
            if (K != 4) {
                aE(I, "focus", function () {
                    I.style.height = "22em"
                })
            }
        }
        var S = [{
            id: "b",
            title: LANG.markup_b,
            pre: "[b]",
            post: "[/b]"
        },
            {
                id: "i",
                title: LANG.markup_i,
                pre: "[i]",
                post: "[/i]"
            },
            {
                id: "u",
                title: LANG.markup_u,
                pre: "[u]",
                post: "[/u]"
            },
            {
                id: "s",
                title: LANG.markup_s,
                pre: "[s]",
                post: "[/s]"
            },
            {
                id: "small",
                title: LANG.markup_small,
                pre: "[small]",
                post: "[/small]"
            },
            {
                id: "url",
                title: LANG.markup_url,
                onclick: function () {
                    var Y = prompt(LANG.prompt_linkurl, "http://");
                    if (Y) {
                        g_insertTag(I, "[url=" + Y + "]", "[/url]")
                    }
                }
            },
            {
                id: "quote",
                title: LANG.markup_quote,
                pre: "[quote]",
                post: "[/quote]"
            },
            {
                id: "code",
                title: LANG.markup_code,
                pre: "[code]",
                post: "[/code]"
            },
            {
                id: "ul",
                title: LANG.markup_ul,
                pre: "[ul]\n[li]",
                post: "[/li]\n[/ul]",
                rep: function (Y) {
                    return Y.replace(/\n/g, "[/li]\n[li]")
                }
            },
            {
                id: "ol",
                title: LANG.markup_ol,
                pre: "[ol]\n[li]",
                post: "[/li]\n[/ol]",
                rep: function (Y) {
                    return Y.replace(/\n/g, "[/li]\n[li]")
                }
            },
            {
                id: "li",
                title: LANG.markup_li,
                pre: "[li]",
                post: "[/li]"
            }];
        for (var Q = 0, R = S.length; Q < R; ++Q) {
            var B = S[Q];
            if (K == 4 && B.id == "quote") {
                break
            }
            var M = ce("button");
            var X = ce("img");
            M.setAttribute("type", "button");
            M.title = B.title;
            if (B.onclick != null) {
                M.onclick = B.onclick
            } else {
                M.onclick = g_insertTag.bind(0, I, B.pre, B.post, B.rep)
            }
            X.src = "templates/wowhead/images/pixel.gif";
            X.className = "toolbar-" + B.id;
            ae(M, X);
            ae(G, M)
        }
        ae(H, G);
        ae(H, I);
        ae(H, ce("br"));
        if (K == 4) {
            ae(H, ct(sprintf(LANG.compose_limit2, F)))
        } else {
            ae(H, ct(sprintf(LANG.compose_limit, F)))
        }
        ae(L, H);
        return I
    },
    coLivePreview: function (E, F, A, B) {
        if (B != 1 && A.style.display == "none") {
            return
        }
        var C = this,
            I = Listview.funcBox.coGetCharLimit(F),
            G = (C.value.length > I ? C.value.substring(0, I) : C.value);
        if (F == 4) {
            var H;
            if ((H = G.indexOf("\n")) != -1 && (H = G.indexOf("\n", H + 1)) != -1 && (H = G.indexOf("\n", H + 1)) != -1) {
                G = G.substring(0, H)
            }
        }
        var D = Markup.toHtml(G, {
            mode: Markup.MODE_COMMENT
        });
        if (D) {
            A.innerHTML = D
        } else {
            A.innerHTML = '<span class="q6">...</span>'
        }
    },
    coEditButton: function (E, D, B) {
        if (D) {
            var A = gE(E.divEdit, "textarea")[0];
            if (!Listview.funcBox.coValidate(A, B)) {
                return
            }
            if (A.value != E.body) {
                var C = 0;
                if (E.lastEdit != null) {
                    C = E.lastEdit[1]
                }
                ++C;
                E.lastEdit = [g_serverTime, C, g_user.name];
                Listview.funcBox.coUpdateLastEdit(E);
                E.divBody.innerHTML = Markup.toHtml((A.value.length > 7500 ? A.value.substring(0, 7500) : A.value), {
                    mode: Markup.MODE_COMMENT
                });
                E.body = A.value;
                if (B == -1) {
                    new Ajax("?forums=editpost&id=" + E.id, {
                        method: "POST",
                        params: "body=" + urlencode(E.body)
                    })
                } else {
                    new Ajax("?comment=edit&id=" + E.id, {
                        method: "POST",
                        params: "body=" + urlencode(E.body)
                    })
                }
            }
        }
        E.divBody.style.display = "";
        E.divLinks.firstChild.style.display = "";
        de(E.divEdit);
        E.divEdit = null
    },
    coGetCharLimit: function (A) {
        if (A == 4) {
            return 250
        } else {
            return 7500
        }
    },
    coModeLink: function (D, A) {
        var I = Listview.funcBox.coGetCharLimit(D);
        var B = Markup.MODE_COMMENT;
        array_walk(gE(this.parentNode, "a"), function (J) {
            J.className = ""
        });
        this.className = "selected";
        var C = gE(this.parentNode.parentNode, "textarea")[0],
            H = C.parentNode,
            E = H.previousSibling;
        if (A == 4) {
            B = Markup.MODE_SIGNATURE
        }
        switch (D) {
            case 1:
                H.style.display = "";
                E.style.display = "none";
                H.firstChild.focus();
                break;
            case 2:
                H.style.display = "none";
                var F = (C.value.length > I ? C.value.substring(0, I) : C.value);
                if (A == 4) {
                    var G;
                    if ((G = F.indexOf("\n")) != -1 && (G = F.indexOf("\n", G + 1)) != -1 && (G = F.indexOf("\n", G + 1)) != -1) {
                        F = F.substring(0, G)
                    }
                }
                E.innerHTML = Markup.toHtml(F, {
                    mode: B
                });
                E.style.display = "";
                break
        }
    },
    coReply: function (B) {
        document.forms.addcomment.elements.replyto.value = B.replyTo;
        var A = ge("replybox-generic");
        gE(A, "span")[0].innerHTML = B.user;
        A.style.display = "";
        co_addYourComment()
    },
    coValidate: function (A, B) {
        B |= 0;
        if (B == 1 || B == -1) {
            if (trim(A.value).length < 1) {
                alert(LANG.message_forumposttooshort);
                return false
            }
        } else {
            if (trim(A.value).length < 10) {
                alert(LANG.message_commenttooshort);
                return false
            }
        }
        if (A.value.length > 7500) {
            if (!confirm(sprintf((B == 1 ? LANG.confirm_forumposttoolong : LANG.confirm_commenttoolong), A.value.substring(7470, 7500)))) {
                return false
            }
        }
        return true
    },
    coCustomRatingOver: function (A) {
        Tooltip.showAtCursor(A, LANG.tooltip_customrating, 0, 0, "q")
    },
    coPlusRatingOver: function (A) {
        Tooltip.showAtCursor(A, LANG.tooltip_uprate, 0, 0, "q2")
    },
    coMinusRatingOver: function (A) {
        Tooltip.showAtCursor(A, LANG.tooltip_downrate, 0, 0, "q7")
    },
    coSortDate: function (A) {
        A.nextSibling.nextSibling.className = "";
        A.className = "selected";
        this.mainDiv.className = "listview-aci";
        this.setSort([1], true, false)
    },
    coSortHighestRatedFirst: function (A) {
        A.previousSibling.previousSibling.className = "";
        A.className = "selected";
        this.mainDiv.className = "";
        this.setSort([-3, 2], true, false)
    },
    coUpdateLastEdit: function (F) {
        var B = F.divLastEdit;
        if (!B) {
            return
        }
        if (F.lastEdit != null) {
            var E = F.lastEdit;
            B.childNodes[1].firstChild.nodeValue = E[2];
            B.childNodes[1].href = "?user=" + E[2];
            var D = new Date(E[0]);
            var A = (g_serverTime - D) / 1000;
            if (B.childNodes[3].firstChild) {
                de(B.childNodes[3].firstChild)
            }
            Listview.funcBox.coFormatDate(B.childNodes[3], A, D);
            var C = "";
            if (F.rating != null) {
                C += LANG.lvcomment_patch1 + g_getPatchVersion(D) + LANG.lvcomment_patch2
            }
            if (E[1] > 1) {
                C += LANG.dash + sprintf(LANG.lvcomment_nedits, E[1])
            }
            B.childNodes[4].nodeValue = C;
            B.style.display = ""
        } else {
            B.style.display = "none"
        }
    },
    coFormatDate: function (E, A, D, F, G) {
        var C;
        if (A < 2592000) {
            txt = sprintf(LANG.date_ago, g_formatTimeElapsed(A));
            var B = D;
            B.setTime(B.getTime() + (g_localTime - g_serverTime));
            E.style.cursor = "help";
            E.title = B.toLocaleString()
        } else {
            txt = LANG.date_on + g_formatDateSimple(D, F);
            E.style.cursor = E.title = ""
        }
        if (G == 1) {
            txt = txt.substr(0, 1).toUpperCase() + txt.substr(1)
        }
        C = ct(txt);
        ae(E, C)
    },
    ssCellOver: function () {
        this.className = "screenshot-caption-over"
    },
    ssCellOut: function () {
        this.className = "screenshot-caption"
    },
    ssCellClick: function (B, D) {
        D = $E(D);
        if (D.shiftKey || D.ctrlKey) {
            return
        }
        var A = 0,
            C = D._target;
        while (C && A < 3) {
            if (C.nodeName == "A") {
                return
            }
            if (C.nodeName == "IMG") {
                break
            }
            C = C.parentNode
        }
        ScreenshotViewer.show({
            screenshots: this.data,
            pos: B
        })
    },
    moneyHonorOver: function (A) {
        Tooltip.showAtCursor(A, "<b>" + LANG.tooltip_honorpoints + "</b>", 0, 0, "q")
    },
    moneyArenaOver: function (A) {
        Tooltip.showAtCursor(A, "<b>" + LANG.tooltip_arenapoints + "</b>", 0, 0, "q")
    },
    appendMoney: function (E, A, F, J, K, B) {
        var I, H = 0;
        if (A >= 10000) {
            H = 1;
            I = ce("span");
            I.className = "moneygold";
            ae(I, ct(Math.floor(A / 10000)));
            ae(E, I);
            A %= 10000
        }
        if (A >= 100) {
            if (H) {
                ae(E, ct(" "))
            } else {
                H = 1
            }
            I = ce("span");
            I.className = "moneysilver";
            ae(I, ct(Math.floor(A / 100)));
            ae(E, I);
            A %= 100
        }
        if (A >= 1 || F != null) {
            if (H) {
                ae(E, ct(" "))
            } else {
                H = 1
            }
            I = ce("span");
            I.className = "moneycopper";
            ae(I, ct(A));
            ae(E, I)
        }
        if (J != null && J != 0) {
            if (H) {
                ae(E, ct(" "))
            } else {
                H = 1
            }
            I = ce("span");
            I.className = "money" + (J < 0 ? "horde" : "alliance") + " tip";
            I.onmouseover = Listview.funcBox.moneyHonorOver;
            I.onmousemove = Tooltip.cursorUpdate;
            I.onmouseout = Tooltip.hide;
            ae(I, ct(number_format(Math.abs(J))));
            ae(E, I)
        }
        if (K >= 1) {
            if (H) {
                ae(E, ct(" "))
            } else {
                H = 1
            }
            I = ce("span");
            I.className = "moneyarena tip";
            I.onmouseover = Listview.funcBox.moneyArenaOver;
            I.onmousemove = Tooltip.cursorUpdate;
            I.onmouseout = Tooltip.hide;
            ae(I, ct(number_format(K)));
            ae(E, I)
        }
        if (B != null) {
            for (var C = 0; C < B.length; ++C) {
                if (H) {
                    ae(E, ct(" "))
                } else {
                    H = 1
                }
                var G = B[C][0];
                var D = B[C][1];
                I = ce("a");
                I.href = "?item=" + G;
                I.className = "moneyitem";
                I.style.backgroundImage = "url(images/icons/small/" + g_items.getIcon(G).toLowerCase() + ".png)";
                ae(I, ct(D));
                ae(E, I)
            }
        }
    }
};
Listview.templates = {
    faction: {
        sort: [1],
        nItemsPerPage: -1,
        columns: [{
            id: "name",
            name: LANG.name,
            align: "left",
            value: "name",
            compute: function (C, D) {
                var A = ce("a");
                A.style.fontFamily = "Verdana, sans-serif";
                A.href = this.template.getItemLink(C);
                ae(A, ct(C.name));
                if (C.expansion == 1) {
                    var B = ce("span");
                    B.className = "bc-icon";
                    ae(B, A);
                    ae(D, B)
                } else {
                    ae(D, A)
                }
            }
        },
            {
                id: "group",
                name: LANG.group,
                value: "group",
                compute: function (A, B) {
                    if (A.group != null) {
                        return A.group
                    }
                }
            },
            {
                id: "side",
                name: LANG.side,
                width: "10%",
                compute: function (B, C) {
                    if (B.side) {
                        var A = ce("span");
                        A.className = (B.side == 1 ? "alliance-icon" : "horde-icon");
                        ae(A, ct(g_sides[B.side]));
                        ae(C, A)
                    }
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_sides[B.side], g_sides[A.side])
                }
            }],
        getItemLink: function (A) {
            return "?faction=" + A.id
        }
    },
    item: {
        sort: [1],
        columns: [{
            id: "name",
            name: LANG.name,
            align: "left",
            span: 2,
            value: "name",
            compute: function (D, G, E) {
                var C = ce("td");
                C.style.width = "1px";
                C.style.padding = "0";
                C.style.borderRight = "none";
                var B = null,
                    F = null;
                if (D.stack != null) {
                    B = Listview.funcBox.createTextRange(D.stack[0], D.stack[1])
                }
                if (D.avail != null) {
                    F = D.avail
                }
                ae(C, g_items.createIcon(D.id, 1, B, F));
                ae(E, C);
                G.style.borderLeft = "none";
                var A = ce("a");
                A.className = "q" + (6 - parseInt(D.name.charAt(0)));
                A.style.fontFamily = "Verdana, sans-serif";
                A.href = this.template.getItemLink(D);
                ae(A, ct(D.name.substring(1)));
                ae(G, A)
            }
        },
            {
                id: "level",
                name: LANG.level,
                width: "7%",
                value: "level",
                sortFunc: function (B, A, C) {
                    return strcmp(B.level, A.level) || strcmp(B.reqlevel, A.reqlevel)
                }
            },
            {
                id: "reqlevel",
                name: LANG.req,
                tooltip: LANG.tooltip_reqlevel,
                width: "7%",
                value: "reqlevel",
                compute: function (A, B) {
                    if (A.reqlevel > 1) {
                        return A.reqlevel
                    }
                },
                sortFunc: function (B, A, C) {
                    return strcmp(B.reqlevel, A.reqlevel) || strcmp(B.level, A.level)
                }
            },
            {
                id: "dps",
                name: LANG.dps,
                width: "10%",
                value: "dps",
                compute: function (A, B) {
                    return (A.dps || 0).toFixed(1)
                },
                hidden: true
            },
            {
                id: "speed",
                name: LANG.speed,
                width: "10%",
                value: "speed",
                compute: function (A, B) {
                    return (A.speed || 0).toFixed(2)
                },
                hidden: true
            },
            {
                id: "armor",
                name: LANG.armor,
                width: "10%",
                value: "armor",
                compute: function (A, B) {
                    if (A.armor > 0) {
                        return A.armor
                    }
                },
                hidden: true
            },
            {
                id: "slot",
                name: LANG.slot,
                width: "10%",
                compute: function (A, B) {
                    return g_item_slots[A.slot]
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_item_slots[B.slot], g_item_slots[A.slot])
                },
                hidden: true
            },
            {
                id: "slots",
                name: LANG.slots,
                width: "10%",
                value: "nslots",
                hidden: true
            },
            {
                id: "skill",
                name: LANG.skill,
                width: "10%",
                value: "skill",
                hidden: true
            },
            {
                id: "source",
                name: LANG.source,
                width: "12%",
                compute: function (C, D) {
                    if (C.source != null) {
                        for (var B = 0, A = C.source.length; B < A; ++B) {
                            if (B > 0) {
                                ae(D, ct(LANG.comma))
                            }
                            ae(D, ct(g_sources[C.source[B]]))
                        }
                    }
                },
                sortFunc: function (B, A, C) {
                    return Listview.funcBox.assocArrCmp(B.source, A.source, g_sources)
                }
            },
            {
                id: "type",
                name: LANG.type,
                width: "14%",
                compute: function (C, D) {
                    D.className = "small q1";
                    var A = ce("a");
                    var B = "?items=" + C.classs;
                    if (g_item_subclasses[C.classs] != null) {
                        B += "." + C.subclass
                    }
                    if (C.subsubclass != null && g_item_subsubclasses[C.classs][C.subclass] != null) {
                        B += "." + C.subsubclass
                    }
                    A.href = B;
                    ae(A, ct(Listview.funcBox.getItemType(C.classs, C.subclass, C.subsubclass)));
                    ae(D, A)
                },
                sortFunc: function (B, A, D) {
                    var C = Listview.funcBox.getItemType;
                    return strcmp(C(B.classs, B.subclass, B.subsubclass), C(A.classs, A.subclass, A.subsubclass))
                }
            }],
        getItemLink: function (A) {
            return "?item=" + A.id
        }
    },
    itemset: {
        sort: [1],
        nItemsPerPage: 75,
        columns: [{
            id: "name",
            name: LANG.name,
            align: "left",
            value: "name",
            compute: function (B, D) {
                var A = ce("a");
                A.className = "q" + (6 - parseInt(B.name.charAt(0)));
                A.style.fontFamily = "Verdana, sans-serif";
                A.href = this.template.getItemLink(B);
                ae(A, ct(B.name.substring(1)));
                ae(D, A);
                if (B.note) {
                    var C = ce("div");
                    C.className = "small";
                    ae(C, ct(g_itemset_notes[B.note]));
                    ae(D, C)
                }
            }
        },
            {
                id: "level",
                name: LANG.level,
                compute: function (A, B) {
                    if (A.minlevel > 0 && A.maxlevel > 0) {
                        if (A.minlevel != A.maxlevel) {
                            return A.minlevel + LANG.hyphen + A.maxlevel
                        } else {
                            return A.minlevel
                        }
                    } else {
                        return -1
                    }
                },
                sortFunc: function (B, A, C) {
                    if (C > 0) {
                        return strcmp(B.minlevel, A.minlevel) || strcmp(B.maxlevel, A.maxlevel)
                    } else {
                        return strcmp(B.maxlevel, A.maxlevel) || strcmp(B.minlevel, A.minlevel)
                    }
                }
            },
            {
                id: "pieces",
                name: LANG.pieces,
                compute: function (A, B) {
                    B.style.padding = "0";
                    Listview.funcBox.createCenteredIcons(A.pieces, B)
                },
                sortFunc: function (B, A) {
                    var D = (B.pieces != null ? B.pieces.length : 0);
                    var C = (A.pieces != null ? A.pieces.length : 0);
                    return strcmp(D, C)
                }
            },
            {
                id: "type",
                name: LANG.type,
                compute: function (A, B) {
                    return g_itemset_types[A.type]
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_itemset_types[B.type], g_itemset_types[A.type])
                }
            },
            {
                id: "classes",
                name: LANG.classes,
                compute: function (C, D) {
                    if (C.classes != null) {
                        for (var B = 0, A = C.classes.length; B < A; ++B) {
                            if (B > 0) {
                                ae(D, ct(LANG.comma))
                            }
                            ae(D, ct(g_chr_classes[C.classes[B]]))
                        }
                    }
                },
                sortFunc: function (B, A, C) {
                    return Listview.funcBox.assocArrCmp(B.classes, A.classes, g_chr_classes)
                }
            }],
        getItemLink: function (A) {
            return "?itemset=" + A.id
        }
    },
    npc: {
        sort: [1],
        nItemsPerPage: 100,
        columns: [
            {
                id: "name",
                name: LANG.name,
                align: "left",
                value: "name",
                compute: function (B, D) {
                    var A = ce("a");
                    A.style.fontFamily = "Verdana, sans-serif";
                    A.href = this.template.getItemLink(B);
                    ae(A, ct(B.name));
                    ae(D, A);
                    if (B.tag != null) {
                        var C = ce("div");
                        C.className = "small";
                        ae(C, ct("<" + B.tag + ">"));
                        ae(D, C)
                    }
                }
            },
            {
                id: "level",
                name: LANG.level,
                width: "10%",
                compute: function (A, C) {
                    if (A.classification) {
                        var B = ce("div");
                        B.className = "small";
                        ae(B, ct(g_npc_classifications[A.classification]));
                        ae(C, B)
                    }
                    if (A.classification == 3) {
                        return "??"
                    }
                    if (A.minlevel > 0 && A.maxlevel > 0) {
                        if (A.minlevel != A.maxlevel) {
                            return A.minlevel + LANG.hyphen + A.maxlevel
                        } else {
                            return A.minlevel
                        }
                    }
                    return -1
                },
                sortFunc: function (B, A, C) {
                    if (C > 0) {
                        return strcmp(B.minlevel, A.minlevel) || strcmp(B.maxlevel, A.maxlevel) || strcmp(B.classification, A.classification)
                    } else {
                        return strcmp(B.maxlevel, A.maxlevel) || strcmp(B.minlevel, A.minlevel) || strcmp(B.classification, A.classification)
                    }
                }
            },
            {
                id: "location",
                name: LANG.location,
                compute: function (A, B) {
                    return Listview.funcBox.location(A, B)
                },
                sortFunc: function (B, A, C) {
                    return Listview.funcBox.assocArrCmp(B.location, A.location, g_zones)
                }
            },
            {
                id: "react",
                name: LANG.react,
                width: "10%",
                value: "react",
                compute: function (B, G) {
                    if (B.react == null) {
                        return -1
                    }
                    var D = [LANG.lvnpc_alliance, LANG.lvnpc_horde];
                    var C = "";
                    var F = 0;
                    for (var A = 0; A < 2; ++A) {
                        if (B.react[A] != null) {
                            if (F++ > 0) {
                                ae(G, ct(" "))
                            }
                            var E = ce("span");
                            E.className = (B.react[A] < 0 ? "q7" : (B.react[A] > 0 ? "q2" : "q"));
                            ae(E, ct(D[A]));
                            ae(G, E)
                        }
                    }
                }
            },
            {
                id: "petfamily",
                name: LANG.petfamily,
                width: "12%",
                compute: function (B, C) {
                    C.className = "q1";
                    var A = ce("a");
                    A.href = "?spells=-3." + B.family;
                    ae(A, ct(g_spell_skills[B.family]));
                    ae(C, A)
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_spell_skills[B.family], g_spell_skills[A.family])
                },
                hidden: 1
            },
            {
                id: "type",
                name: LANG.type,
                width: "12%",
                compute: function (B, C) {
                    C.className = "small q1";
                    var A = ce("a");
                    A.href = "?npcs=" + B.type;
                    ae(A, ct(g_npc_types[B.type]));
                    ae(C, A)
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_npc_types[B.type], g_npc_types[A.type])
                }
            }],
        getItemLink: function (A) {
            return "?npc=" + A.id
        }
    },
    object: {
        sort: [1],
        nItemsPerPage: 100,
        columns: [{
            id: "name",
            name: LANG.name,
            align: "left",
            value: "name",
            compute: function (B, C) {
                var A = ce("a");
                A.style.fontFamily = "Verdana, sans-serif";
                A.href = this.template.getItemLink(B);
                ae(A, ct(B.name));
                ae(C, A)
            }
        },
            {
                id: "location",
                name: LANG.location,
                compute: function (A, B) {
                    return Listview.funcBox.location(A, B)
                },
                sortFunc: function (B, A, C) {
                    return Listview.funcBox.assocArrCmp(B.location, A.location, g_zones)
                }
            },
            {
                id: "skill",
                name: LANG.skill,
                width: "10%",
                value: "skill",
                hidden: true
            },
            {
                id: "type",
                name: LANG.type,
                width: "12%",
                compute: function (B, C) {
                    C.className = "small q1";
                    var A = ce("a");
                    A.href = "?objects=" + B.type;
                    ae(A, ct(g_object_types[B.type]));
                    ae(C, A)
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_object_types[B.type], g_object_types[A.type])
                }
            }],
        getItemLink: function (A) {
            return "?object=" + A.id
        }
    },
    quest: {
        sort: [1, 2],
        nItemsPerPage: 100,
        columns: [{
            id: "name",
            name: LANG.name,
            align: "left",
            value: "name",
            compute: function (B, C) {
                var A = ce("a");
                A.style.fontFamily = "Verdana, sans-serif";
                A.href = this.template.getItemLink(B);
                ae(A, ct(B.name));
                ae(C, A)
            }
        },
            {
                id: "level",
                name: LANG.level,
                width: "7%",
                compute: function (A, C) {
                    if (A.type || A.daily) {
                        var B = ce("div");
                        B.className = "small";
                        B.style.whiteSpace = "nowrap";
                        if (A.type && A.daily) {
                            ae(B, ct(sprintf(LANG.lvquest_daily, g_quest_types[A.type])))
                        } else {
                            if (A.daily) {
                                ae(B, ct(LANG.daily))
                            } else {
                                if (A.type) {
                                    ae(B, ct(g_quest_types[A.type]))
                                }
                            }
                        }
                        ae(C, B)
                    }
                    return A.level
                },
                sortFunc: function (B, A, C) {
                    return strcmp(B.level, A.level) || strcmp(B.type, A.type) || strcmp(B.reqlevel, A.reqlevel)
                }
            },
            {
                id: "reqlevel",
                name: LANG.req,
                tooltip: LANG.tooltip_reqlevel,
                width: "7%",
                value: "reqlevel",
                sortFunc: function (B, A, C) {
                    return strcmp(B.reqlevel, A.reqlevel) || strcmp(B.level, A.level)
                }
            },
            {
                id: "side",
                name: LANG.side,
                width: "10%",
                compute: function (A, C) {
                    if (A.side) {
                        var B = ce("span");
                        if (A.side == 1) {
                            B.className = "alliance-icon"
                        } else {
                            if (A.side == 2) {
                                B.className = "horde-icon"
                            }
                        }
                        ae(B, ct(g_sides[A.side]));
                        ae(C, B)
                    } else {
                        return -1
                    }
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_sides[B.side], g_sides[A.side])
                }
            },
            {
                id: "rewards",
                name: LANG.rewards,
                width: "25%",
                compute: function (B, F) {
                    var A = (B.itemchoices != null || B.itemrewards != null);
                    if (A) {
                        F.style.padding = "0";
                        var E, D;
                        if (B.itemchoices && B.itemchoices.length > 1) {
                            E = LANG.lvquest_pickone;
                            if (B.itemrewards && B.itemrewards.length > 0) {
                                D = LANG.lvquest_alsoget
                            }
                        }
                        Listview.funcBox.createCenteredIcons(B.itemchoices, F, E);
                        Listview.funcBox.createCenteredIcons(B.itemrewards, F, D)
                    }
                    if (B.xp > 0 || B.money > 0) {
                        var C = ce("div");
                        if (A) {
                            C.style.padding = "4px"
                        }
                        if (B.xp > 0) {
                            ae(C, ct(sprintf(LANG.lvquest_xp, B.xp) + (B.money > 0 ? " + " : "")))
                        }
                        if (B.money > 0) {
                            Listview.funcBox.appendMoney(C, B.money)
                        }
                        ae(F, C)
                    }
                },
                sortFunc: function (B, A, C) {
                    var E = (B.itemchoices != null ? B.itemchoices.length : 0) + (B.itemrewards != null ? B.itemrewards.length : 0);
                    var D = (A.itemchoices != null ? A.itemchoices.length : 0) + (A.itemrewards != null ? A.itemrewards.length : 0);
                    return strcmp(E, D) || strcmp((B.xp | 0) + (B.money | 0), (A.xp | 0) + (A.money | 0))
                }
            },
            {
                id: "reputation",
                name: LANG.reputation,
                width: "14%",
                value: "id",
                hidden: true
            },
            {
                id: "category",
                name: LANG.category,
                width: "16%",
                compute: function (B, C) {
                    if (B.category != 0) {
                        C.className = "small q1";
                        var A = ce("a");
                        A.href = "?quests=" + B.category2 + "." + B.category;
                        ae(A, ct(Listview.funcBox.getQuestCategory(B.category)));
                        ae(C, A)
                    }
                },
                sortFunc: function (B, A, D) {
                    var C = Listview.funcBox.getQuestCategory;
                    return strcmp(C(B.category), C(A.category))
                }
            }],
        getItemLink: function (A) {
            return "?quest=" + A.id
        }
    },
    spell: {
        sort: [1, 2],
        columns: [{
            id: "name",
            name: LANG.name,
            align: "left",
            span: 2,
            value: "name",
            compute: function (F, C, J) {
                var E = ce("td"),
                    M;
                E.style.width = "44px";
                E.style.padding = "0";
                E.style.borderRight = "none";
                if (F.creates != null) {
                    M = g_items.createIcon(F.creates[0], 1, Listview.funcBox.createTextRange(F.creates[1], F.creates[2]))
                } else {
                    M = g_spells.createIcon(F.id, 1)
                }
                M.style.cssFloat = M.style.styleFloat = "left";
                ae(E, M);
                ae(J, E);
                C.style.borderLeft = "none";
                var A = ce("div");
                var L = ce("a");
                var I = F.name.charAt(0);
                if (I != "@") {
                    L.className = "q" + (6 - parseInt(I))
                }
                L.style.fontFamily = "Verdana, sans-serif";
                L.href = this.template.getItemLink(F);
                ae(L, ct(F.name.substring(1)));
                ae(A, L);
                var B = F.talent != null && this._noTalents == null;
                if (F.rank != null || B) {
                    var H = ce("div");
                    H.className = "small2";
                    var D = "";
                    if (F.rank != null) {
                        D += F.rank;
                        if (B) {
                            D += " "
                        }
                    }
                    if (B) {
                        D += "(Talent)"
                    }
                    ae(H, ct(D));
                    ae(A, H)
                }
                if (F.races != null) {
                    A.style.position = "relative";
                    var H = ce("div");
                    H.className = "small";
                    H.style.fontStyle = "italic";
                    H.style.position = "absolute";
                    H.style.right = H.style.bottom = "3px";
                    var K = F.races.toString();
                    if (K == "1,3,4,7,11") {
                        ae(H, ct(g_sides[1]))
                    } else {
                        if (K == "2,5,6,8,10") {
                            ae(H, ct(g_sides[2]))
                        } else {
                            for (var E = 0, G = F.races.length; E < G; ++E) {
                                if (E > 0) {
                                    ae(H, ct(LANG.comma))
                                }
                                ae(H, ct(g_chr_races[F.races[E]]))
                            }
                        }
                    }
                    ae(A, H)
                }
                ae(C, A)
            }
        },
            {
                id: "level",
                name: LANG.level,
                width: "10%",
                value: "level",
                compute: function (A, B) {
                    if (A.level > 0) {
                        return A.level
                    }
                },
                hidden: true
            },
            {
                id: "school",
                name: LANG.school,
                width: "10%",
                hidden: true,
                compute: function (A, B) {
                    return g_spell_resistances[A.school]
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_spell_resistances[B.school], g_spell_resistances[A.school])
                }
            },
            {
                id: "reagents",
                name: LANG.reagents,
                align: "left",
                width: "15%",
                compute: function (F, C) {
                    var A = (F.reagents != null);
                    if (A) {
                        C.style.padding = "0";
                        var H = ce("div");
                        var I = F.reagents;
                        H.style.width = (44 * I.length) + "px";
                        for (var D = 0, G = I.length; D < G; ++D) {
                            var B = I[D][0];
                            var E = I[D][1];
                            var J = g_items.createIcon(B, 1, E);
                            J.style.cssFloat = J.style.styleFloat = "left";
                            ae(H, J)
                        }
                        ae(C, H)
                    }
                },
                sortFunc: function (B, A) {
                    var D = (B.reagents != null ? B.reagents.length : 0);
                    var C = (A.reagents != null ? A.reagents.length : 0);
                    if (D > 0 && D == C) {
                        return strcmp(B.reagents.toString(), A.reagents.toString())
                    } else {
                        return strcmp(D, C)
                    }
                }
            },
            {
                id: "tp",
                name: LANG.tp,
                tooltip: LANG.tooltip_trainingpoints,
                width: "7%",
                hidden: true,
                value: "tp",
                compute: function (A, B) {
                    if (A.tp > 0) {
                        return A.tp
                    }
                }
            },
            {
                id: "source",
                name: LANG.source,
                width: "12%",
                hidden: true,
                compute: function (B, D) {
                    if (B.source != null) {
                        for (var C = 0, A = B.source.length; C < A; ++C) {
                            if (C > 0) {
                                ae(D, ct(LANG.comma))
                            }
                            ae(D, ct(g_sources[B.source[C]]))
                        }
                    }
                },
                sortFunc: function (B, A, C) {
                    return Listview.funcBox.assocArrCmp(B.source, A.source, g_sources)
                }
            },
            {
                id: "skill",
                name: LANG.skill,
                width: "16%",
                compute: function (E, C) {
                    if (E.skill != null) {
                        var B = ce("div");
                        B.className = "small";
                        for (var D = 0, G = E.skill.length; D < G; ++D) {
                            if (D > 0) {
                                ae(B, ct(LANG.comma))
                            }
                            if (E.skill[D] == -1) {
                                ae(B, ct(LANG.ellipsis))
                            } else {
                                if (in_array([7, -2, -3, 11, 9], E.cat) != -1) {
                                    var H = ce("a");
                                    H.className = "q1";
                                    H.href = "?spells=" + E.cat + "." + (E.chrclass ? E.chrclass + "." : "") + E.skill[D];
                                    ae(H, ct(g_spell_skills[E.skill[D]]));
                                    ae(B, H)
                                } else {
                                    ae(B, ct(g_spell_skills[E.skill[D]]))
                                }
                            }
                        }
                        if (E.learnedat > 0) {
                            ae(B, ct(" ("));
                            var F = ce("span");
                            if (E.learnedat == 9999) {
                                F.className = "q0";
                                ae(F, ct("??"))
                            } else {
                                if (E.learnedat > 0) {
                                    ae(F, ct(E.learnedat));
                                    F.style.fontWeight = "bold"
                                }
                            }
                            ae(B, F);
                            ae(B, ct(")"))
                        }
                        ae(C, B);
                        if (E.colors != null) {
                            var A = E.colors,
                                I = 0;
                            for (var D = 0; D < A.length; ++D) {
                                if (A[D] > 0) {
                                    ++I;
                                    break
                                }
                            }
                            if (I > 0) {
                                I = 0;
                                B = ce("div");
                                B.className = "small";
                                B.style.fontWeight = "bold";
                                for (var D = 0; D < A.length; ++D) {
                                    if (A[D] > 0) {
                                        if (I++ > 0) {
                                            ae(B, ct(" "))
                                        }
                                        var J = ce("span");
                                        J.className = "r" + (D + 1);
                                        ae(J, ct(A[D]));
                                        ae(B, J)
                                    }
                                }
                                ae(C, B)
                            }
                        }
                    }
                },
                sortFunc: function (B, A) {
                    var D = strcmp(B.learnedat, A.learnedat);
                    if (D != 0) {
                        return D
                    }
                    if (B.colors != null && A.colors != null) {
                        for (var C = 0; C < 4; ++C) {
                            D = strcmp(B.colors[C], A.colors[C]);
                            if (D != 0) {
                                return D
                            }
                        }
                    }
                    return Listview.funcBox.assocArrCmp(B.skill, A.skill, g_spell_skills)
                }
            }],
        getItemLink: function (A) {
            return "?spell=" + A.id
        }
    },
    zone: {
        sort: [1],
        nItemsPerPage: -1,
        columns: [{
            id: "name",
            name: LANG.name,
            align: "left",
            value: "name",
            compute: function (B, D) {
                var A = ce("a");
                A.style.fontFamily = "Verdana, sans-serif";
                A.href = this.template.getItemLink(B);
                ae(A, ct(B.name));
                if (B.expansion == 1) {
                    var C = ce("span");
                    C.className = "bc-icon";
                    ae(C, A);
                    ae(D, C)
                } else {
                    ae(D, A)
                }
            }
        },
            {
                id: "level",
                name: LANG.level,
                width: "10%",
                compute: function (A, B) {
                    if (A.minlevel > 0 && A.maxlevel > 0) {
                        if (A.minlevel != A.maxlevel) {
                            return A.minlevel + LANG.hyphen + A.maxlevel
                        } else {
                            return A.minlevel
                        }
                    }
                },
                sortFunc: function (B, A, C) {
                    if (C > 0) {
                        return strcmp(B.minlevel, A.minlevel) || strcmp(B.maxlevel, A.maxlevel)
                    } else {
                        return strcmp(B.maxlevel, A.maxlevel) || strcmp(B.minlevel, A.minlevel)
                    }
                }
            },
            {
                id: "territory",
                name: LANG.territory,
                width: "13%",
                compute: function (A, C) {
                    var B = ce("span");
                    switch (A.territory) {
                        case 0:
                            B.className = "alliance-icon";
                            break;
                        case 1:
                            B.className = "horde-icon";
                            break;
                        case 4:
                            B.className = "ffapvp-icon";
                            break
                    }
                    ae(B, ct(g_zone_territories[A.territory]));
                    ae(C, B)
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_zone_territories[B.territory], g_zone_territories[A.territory])
                }
            },
            {
                id: "instancetype",
                name: LANG.instancetype,
                compute: function (A, D) {
                    if (A.instance > 0) {
                        var B = ce("span");
                        if (A.instance >= 1 && A.instance <= 5) {
                            B.className = "instance-icon" + A.instance
                        }
                        var C = g_zone_instancetypes[A.instance];
                        if (A.nplayers > 0 && ((A.instance != 2 && A.instance != 5) || A.nplayers > 5)) {
                            C += " (";
                            if (A.instance == 4) {
                                C += sprintf(LANG.lvzone_xvx, A.nplayers, A.nplayers)
                            } else {
                                C += sprintf(LANG.lvzone_xman, A.nplayers)
                            }
                            C += ")"
                        }
                        ae(B, ct(C));
                        ae(D, B)
                    }
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_zone_instancetypes[B.instance], g_zone_instancetypes[A.instance]) || strcmp(B.instance, A.instance) || strcmp(B.nplayers, A.nplayers)
                }
            },
            {
                id: "category",
                name: LANG.category,
                width: "15%",
                compute: function (B, C) {
                    C.className = "small q1";
                    var A = ce("a");
                    A.href = "?zones=" + B.category;
                    ae(A, ct(g_zone_categories[B.category]));
                    ae(C, A)
                },
                sortFunc: function (B, A, C) {
                    return strcmp(g_zone_categories[B.category], g_zone_categories[A.category])
                }
            }],
        getItemLink: function (A) {
            return "?zone=" + A.id
        }
    },
    comment: {
        sort: [1],
        mode: 2,
        nItemsPerPage: 40,
        poundable: 2,
        columns: [{
            value: "number"
        },
            {
                value: "id"
            },
            {
                value: "rating"
            }],
        compute: function (A, R) {
            var l, h = new Date(A.date),
                F = (g_serverTime - h) / 1000,
                j = (g_user.roles & 26) != 0,
                I = A.rating < 0 || A.purged || A.deleted,
                X = j || A.user.toLowerCase() == g_user.name.toLowerCase(),
                K = X && A.deleted == 0,
                G = X && A.replyTo != A.id,
                g = A.purged == 0 && A.deleted == 0 && g_user.id && A.user.toLowerCase() != g_user.name.toLowerCase() && in_array(A.raters, g_user.id, function (n) {
                    return n[0]
                }) == -1,
                m = A.rating >= 0 && (g_user.id == 0 || g);
            A.ratable = g;
            R.className = "comment";
            if (A.indent) {
                R.className += " comment-indent"
            }
            var V = ce("div");
            var N = ce("div");
            var Q = ce("div");
            A.divHeader = V;
            A.divBody = N;
            A.divLinks = Q;
            V.className = (I ? "comment-header-bt" : "comment-header");
            var L = ce("div");
            L.className = "comment-rating";
            if (I) {
                var J = ce("a");
                J.href = "javascript:;";
                J.onclick = Listview.funcBox.coToggleVis.bind(J, A);
                ae(J, ct(LANG.lvcomment_show));
                ae(L, J);
                ae(L, ct(" " + String.fromCharCode(160) + " "))
            }
            var C = ce("b");
            ae(C, ct(LANG.lvcomment_rating));
            var U = ce("span");
            ae(U, ct((A.rating > 0 ? "+" : "") + A.rating));
            ae(C, U);
            ae(L, C);
            ae(L, ct(" "));
            var O = ce("span");
            var i = ce("a"),
                H = ce("a");
            if (g) {
                i.href = H.href = "javascript:;";
                i.onclick = Listview.funcBox.coRate.bind(i, A, 1);
                H.onclick = Listview.funcBox.coRate.bind(H, A, -1);
                if (j) {
                    var W = ce("a");
                    W.href = "javascript:;";
                    W.onclick = Listview.funcBox.coRate.bind(W, A, 0);
                    W.onmouseover = Listview.funcBox.coCustomRatingOver;
                    W.onmousemove = Tooltip.cursorUpdate;
                    W.onmouseout = Tooltip.hide;
                    ae(W, ct("[~]"));
                    ae(O, W);
                    ae(O, ct(" "))
                }
            } else {
                i.href = H.href = "?account=signin"
            }
            ae(i, ct("[+]"));
            i.onmouseover = Listview.funcBox.coPlusRatingOver;
            H.onmouseover = Listview.funcBox.coMinusRatingOver;
            i.onmousemove = H.onmousemove = Tooltip.cursorUpdate;
            i.onmouseout = H.onmouseout = Tooltip.hide;
            ae(H, ct("[-]"));
            ae(O, H);
            ae(O, ct(" "));
            ae(O, i);
            ae(L, O);
            if (!m) {
                O.style.display = "none"
            }
            ae(V, L);
            ae(V, ct(LANG.lvcomment_by));
            var B = ce("a");
            B.href = "?user=" + A.user;
            ae(B, ct(A.user));
            ae(V, B);
            ae(V, ct(" "));
            var M = ce("a");
            M.className = "q0";
            M.href = "#comments:id=" + A.id;
            Listview.funcBox.coFormatDate(M, F, h);
            M.style.cursor = "pointer";
            ae(V, M);
            ae(V, ct(LANG.lvcomment_patch1 + g_getPatchVersion(h) + LANG.lvcomment_patch2));
            ae(R, V);
            N.className = "comment-body" + Listview.funcBox.coGetColor(A);
            if (A.indent) {
                N.className += " comment-body-indent"
            }
            N.innerHTML = Markup.toHtml(A.body, {
                mode: Markup.MODE_COMMENT
            });
            ae(R, N);
            if ((A.roles & 26) == 0 || g_user.roles & 26) {
                var e = ce("div");
                A.divLastEdit = e;
                e.className = "comment-lastedit";
                ae(e, ct(LANG.lvcomment_lastedit));
                var Z = ce("a");
                ae(Z, ct(" "));
                ae(e, Z);
                ae(e, ct(" "));
                var a = ce("span");
                ae(e, a);
                ae(e, ct(" "));
                Listview.funcBox.coUpdateLastEdit(A);
                if (I) {
                    e.style.display = "none"
                }
                ae(R, e)
            }
            Q.className = "comment-links";
            if (X) {
                var E = ce("span");
                var Y = ce("a");
                ae(Y, ct(LANG.lvcomment_edit));
                Y.onclick = Listview.funcBox.coEdit.bind(this, A, 0);
                ns(Y);
                Y.href = "javascript:;";
                ae(E, Y);
                ae(E, ct("|"));
                ae(Q, E)
            }
            if (K) {
                var k = ce("span");
                var P = ce("a");
                ae(P, ct(LANG.lvcomment_delete));
                P.onclick = Listview.funcBox.coDelete.bind(this, A);
                ns(P);
                P.href = "javascript:;";
                ae(k, P);
                ae(k, ct("|"));
                ae(Q, k)
            }
            if (G) {
                var D = ce("span");
                var T = ce("a");
                ae(T, ct(LANG.lvcomment_detach));
                T.onclick = Listview.funcBox.coDetach.bind(this, A);
                ns(T);
                T.href = "javascript:;";
                ae(D, T);
                ae(D, ct("|"));
                ae(Q, D)
            }
            var S = ce("a");
            ae(S, ct(LANG.lvcomment_reply));
            if (g_user.id > 0) {
                S.onclick = Listview.funcBox.coReply.bind(this, A);
                S.href = "javascript:;"
            } else {
                S.href = "?account=signin"
            }
            ae(Q, S);
            if (I) {
                N.style.display = "none";
                Q.style.display = "none"
            }
            ae(R, Q)
        },
        createNote: function (F) {
            var E = ce("small");
            var A = ce("a");
            if (g_user.id > 0) {
                A.href = "javascript:;";
                A.onclick = co_addYourComment
            } else {
                A.href = "?account=signin"
            }
            ae(A, ct(LANG.lvcomment_add));
            ae(E, A);
            var D = ce("span");
            D.style.padding = "0 5px";
            D.style.color = "white";
            ae(D, ct("|"));
            ae(E, D);
            ae(E, ct(LANG.lvcomment_sort));
            var C = ce("a");
            C.href = "javascript:;";
            ae(C, ct(LANG.lvcomment_sortdate));
            C.onclick = Listview.funcBox.coSortDate.bind(this, C);
            ae(E, C);
            ae(E, ct(LANG.comma));
            var B = ce("a");
            B.href = "javascript:;";
            ae(B, ct(LANG.lvcomment_sortrating));
            B.onclick = Listview.funcBox.coSortHighestRatedFirst.bind(this, B);
            ae(E, B);
            C.onclick();
            ae(F, E)
        },
        onNoData: function (C) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var A = "<b>" + LANG.lvnodata_co1 + "</b><br /><br />";
                if (g_user.id > 0) {
                    var B = LANG.lvnodata_co2;
                    B = B.replace("<a>", '<a href="javascript:;" onclick="co_addYourComment()" onmousedown="return false">');
                    A += B
                } else {
                    var B = LANG.lvnodata_co3;
                    B = B.replace("<a>", '<a href="?account=signin">');
                    B = B.replace("<a>", '<a href="?account=signup">');
                    A += B
                }
                C.style.padding = "1.5em 0";
                C.innerHTML = A
            }
        },
        onBeforeCreate: function () {
            if (location.hash.match(/:id=([0-9]+)/) != null) {
                var A = in_array(this.data, parseInt(RegExp.$1), function (B) {
                    return B.id
                });
                this.rowOffset = this.getRowOffset(A);
                return this.data[A]
            }
        },
        onAfterCreate: function (A) {
            if (A != null) {
                var B = A.__div;
                this.tabs.__st = B;
                B.firstChild.style.border = "1px solid #505050"
            }
        }
    },
    commentpreview: {
        sort: [3],
        nItemsPerPage: 75,
        columns: [{
            id: "subject",
            name: LANG.subject,
            align: "left",
            value: "subject",
            compute: function (D, C) {
                var A = ce("a");
                A.style.fontFamily = "Verdana, sans-serif";
                A.href = this.template.getItemLink(D);
                ae(A, ct(D.subject));
                ae(C, A);
                var B = ce("div");
                B.className = "small";
                ae(B, ct(LANG.types[D.type][0]));
                ae(C, B)
            }
        },
            {
                id: "preview",
                name: LANG.preview,
                align: "left",
                width: "50%",
                value: "preview",
                compute: function (H, G) {
                    var E = ce("div");
                    E.className = "crop";
                    if (H.rating >= 10) {
                        E.className += " comment-green"
                    }
                    ae(E, ct(Markup.removeTags(H.preview, {
                        mode: (H.rating != null ? Markup.MODE_COMMENT : Markup.MODE_ARTICLE)
                    })));
                    ae(G, E);
                    var A = H.rating != null;
                    var D = H.user != null;
                    if (A || D) {
                        E = ce("div");
                        E.className = "small3";
                        if (D) {
                            ae(E, ct(LANG.lvcomment_by));
                            var B = ce("a");
                            B.href = "?user=" + H.user;
                            ae(B, ct(H.user));
                            ae(E, B);
                            if (A) {
                                ae(E, ct(LANG.hyphen))
                            }
                        }
                        if (A) {
                            ae(E, ct(LANG.lvcomment_rating + (H.rating > 0 ? "+" : "") + H.rating));
                            var C = ce("span"),
                                F = "";
                            C.className = "q7";
                            if (H.deleted) {
                                F = " (Deleted)"
                            } else {
                                if (H.purged) {
                                    F = " (Purged)"
                                }
                            }
                            ae(C, ct(F));
                            ae(E, C)
                        }
                        ae(G, E)
                    }
                }
            },
            {
                id: "posted",
                name: LANG.posted,
                width: "16%",
                value: "elapsed",
                compute: function (E, D) {
                    var B = new Date(E.date),
                        A = (g_serverTime - B) / 1000;
                    var C = ce("span");
                    Listview.funcBox.coFormatDate(C, A, B, 0, 1);
                    ae(D, C)
                }
            }],
        getItemLink: function (A) {
            return "?" + g_types[A.type] + "=" + A.typeId + (A.id != null ? "#comments:id=" + A.id : "")
        }
    },
    screenshot: {
        sort: [],
        mode: 3,
        nItemsPerPage: 40,
        nItemsPerRow: 4,
        poundable: 2,
        columns: [],
        compute: function (J, C, E) {
            var N, G = new Date(J.date),
                O = (g_serverTime - G) / 1000;
            C.className = "screenshot-cell";
            C.vAlign = "bottom";
            var M = ce("a");
            M.href = "#screenshots:id=" + J.id;
            M.onclick = rf2;
            var F = ce("img"),
                B = Math.min(150 / J.width, 150 / J.height);
            F.src = "http://upload.wowhead.com/images/screenshots/thumb/" + J.id + ".jpg";
            F.width = parseInt(B * J.width);
            F.height = parseInt(B * J.height);
            ae(M, F);
            ae(C, M);
            var I = ce("div");
            I.className = "screenshot-cell-user";
            var P = (J.user != null && J.user.length);
            if (P) {
                M = ce("a");
                M.href = "?user=" + J.user;
                ae(M, ct(J.user));
                ae(I, ct(LANG.lvscreenshot_from));
                ae(I, M);
                ae(I, ct(" "))
            }
            var Q = ce("span");
            if (P) {
                Listview.funcBox.coFormatDate(Q, O, G)
            } else {
                Listview.funcBox.coFormatDate(Q, O, G, 0, 1)
            }
            ae(I, Q);
            ae(C, I);
            I = ce("div");
            I.style.position = "relative";
            I.style.height = "1em";
            if (g_locale.id != 0 && g_locale.id != 25 && J.caption) {
                J.caption = ""
            }
            var H = (J.caption != null && J.caption.length);
            var D = (J.subject != null && J.subject.length);
            if (H || D) {
                var A = ce("div");
                A.className = "screenshot-caption";
                if (D) {
                    var L = ce("small");
                    ae(L, ct(LANG.types[J.type][0] + LANG.colon));
                    var K = ce("a");
                    ae(K, ct(J.subject));
                    K.href = "?" + g_types[J.type] + "=" + J.typeId;
                    ae(L, K);
                    ae(A, L);
                    if (H && J.caption.length) {
                        ae(L, ct(" (...)"))
                    }
                    ae(L, ce("br"))
                }
                if (H) {
                    aE(C, "mouseover", Listview.funcBox.ssCellOver.bind(A));
                    aE(C, "mouseout", Listview.funcBox.ssCellOut.bind(A));
                    ae(A, ct('"' + J.caption + '"'))
                }
                ae(I, A)
            }
            aE(C, "click", Listview.funcBox.ssCellClick.bind(this, E));
            ae(C, I)
        },
        createNote: function (C) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var B = ce("small");
                var A = ce("a");
                if (g_user.id > 0) {
                    A.href = "javascript:;";
                    A.onclick = ss_submitAScreenshot
                } else {
                    A.href = "?account=signin"
                }
                ae(A, ct(LANG.lvscreenshot_submit));
                ae(B, A);
                ae(C, B)
            }
        },
        onNoData: function (C) {
            if (typeof g_pageInfo == "object" && g_pageInfo.type > 0) {
                var A = "<b>" + LANG.lvnodata_ss1 + "</b><br /><br />";
                if (g_user.id > 0) {
                    var B = LANG.lvnodata_ss2;
                    B = B.replace("<a>", '<a href="javascript:;" onclick="ss_submitAScreenshot()" onmousedown="return false">');
                    A += B
                } else {
                    var B = LANG.lvnodata_ss3;
                    B = B.replace("<a>", '<a href="?account=signin">');
                    B = B.replace("<a>", '<a href="?account=signup">');
                    A += B
                }
                C.style.padding = "1.5em 0";
                C.innerHTML = A
            } else {
                return -1
            }
        },
        onBeforeCreate: function () {
            if (location.hash.match(/:id=([0-9]+)/) != null) {
                var A = in_array(this.data, parseInt(RegExp.$1), function (B) {
                    return B.id
                });
                this.rowOffset = this.getRowOffset(A);
                return A
            }
        },
        onAfterCreate: function (A) {
            if (A != null) {
                setTimeout((function () {
                    ScreenshotViewer.show({
                        screenshots: this.data,
                        pos: A
                    })
                }).bind(this), 1)
            }
        }
    }
};
Menu.fixUrls(mn_items, "?items=");
Menu.fixUrls(mn_itemSets, "?itemsets&filter=cl=");
Menu.fixUrls(mn_npcs, "?npcs=");
Menu.fixUrls(mn_objects, "?objects=");
Menu.fixUrls(mn_quests, "?quests=");
Menu.fixUrls(mn_spells, "?spells=");
Menu.fixUrls(mn_zones, "?zones=");
Menu.fixUrls(mn_talentCalc, "?talent=");
var g_locale = {
    id: 0,
    name: "enus"
};
var g_localTime = new Date();
var g_user = {
    id: 0,
    name: "",
    roles: 0
};
var g_items = [];
var g_quests = [];
var g_spells = [];
var g_users = [];
var g_types = {
    1: "npc",
    2: "object",
    3: "item",
    4: "itemset",
    5: "quest",
    6: "spell",
    7: "zone",
    8: "faction"
};
var g_locales = {
    0: "enus",
    2: "frfr",
    3: "dede",
    6: "eses",
    25: "wotlk"
};
var g_customColors = {
    Miyari: "pink"
};
g_items.getIcon = function (A) {
    if (g_items[A] != null) {
        return g_items[A].icon
    } else {
        return "temp"
    }
};
g_items.createIcon = function (D, B, A, C) {
    return Icon.create(g_items.getIcon(D), B, null, "?item=" + D, A, C)
};
g_spells.getIcon = function (A) {
    if (g_spells[A] != null) {
        return g_spells[A].icon
    } else {
        return "temp"
    }
};
g_spells.createIcon = function (D, B, A, C) {
    return Icon.create(g_spells.getIcon(D), B, null, "?spell=" + D, A, C)
};
var $WowheadPower = new

function () {
    var V, a, L, // language
        T, F, J, H, R = 0,
        i = 0,
        K = 1,
        E = 2,
        M = 3,
        N = 4,
        G = 3,
        O = 5,
        g = 6,
        j = 15,
        W = 15,
        S = {
            3: [g_items, "item"],
            5: [g_quests, "quest"],
            6: [g_spells, "spell"]
        };

    function Z() {
        aE(document, "mouseover", U)
    }

    function A(k) {
        var l = g_getCursorPos(k);
        J = l.x;
        H = l.y
    }

    function e(u, q) {
        if (u.nodeName != "A") {
            return -2323
        }
        if (!u.href.length) {
            return
        }
        var o, n, l, k;
        n = 2;
        l = 3;
        //		if (u.href.indexOf("http://") == 0) {
        //			o = 1;
        //			k = u.href.match(/http:\/\/(www|dev|fr|es|de|wotlk)?\.?wowhead\.com\/\?(item|quest|spell)=([0-9]+)/)
        //		} else {
        k = u.href.match(/()\?(item|quest|spell)=([0-9]+)/)
        //		}
        if (k == null && u.rel) {
            o = 0;
            n = 1;
            l = 2;
            k = u.rel.match(/(item|quest|spell).?([0-9]+)/)
        }
        if (k) {
            //			var s,
            //			p = "www";
            //			if (o && k[o]) {
            //				p = k[o]
            //			} else {
            //				var r = location.hostname.match(/(www|dev|fr|es|de|wotlk)\.?wowhead\.com/);
            //				if (r != null) {
            //					p = r[1]
            //				}
            //			}
            //			s = g_getLocaleFromDomain(p);
            //			T = p;
            s = 0;
            F = u;
            if (u.href.indexOf("#") != -1 && document.location.href.indexOf(k[n] + "=" + k[l]) != -1) {
                return
            }
            R = (u.parentNode.className == "tile" ? 1 : 0);
            if (!u.onmouseout) {
                if (R == 0) {
                    u.onmousemove = Q
                }
                u.onmouseout = P
            }
            A(q);
            Y(g_getIdFromTypeName(k[n]), k[l], s)
        }
    }

    function U(m) {
        m = $E(m);
        var l = m._target;
        var k = 0;
        while (l != null && k < 3 && e(l, m) == -2323) {
            l = l.parentNode;
            ++k
        }
    }

    function Q(k) {
        k = $E(k);
        A(k);
        Tooltip.move(J, H, 0, 0, j, W)
    }

    function P() {
        V = null;
        F = null;
        Tooltip.hide()
    }

    function X(k) {
        return "tooltip"
    }

    function h(m, n, l) {
        var k = S[m][0];
        if (k[n] == null) {
            k[n] = {}
        }
        if (k[n].status == null) {
            k[n].status = {}
        }
        if (k[n].status[l] == null) {
            k[n].status[l] = i
        }
    }

    function Y(m, n, l) {
        // m - type ('item', etc)
        // n - id
        // l - language
        V = m;
        a = n;
        L = l;
        h(m, n, l);
        var k = S[m][0];
        if (k[n].status[l] == N || k[n].status[l] == M) {
            C(k[n][X(l)], k[n].icon)
        } else {
            if (k[n].status[l] == K) {
                C(LANG.tooltip_loading)
            } else {
                D(m, n, l)
            }
        }
    }

    function D(n, o, l, m) {
        var k = S[n][0];
        if (k[o].status[l] != i && k[o].status[l] != E) {
            return
        }
        k[o].status[l] = K;
        if (!m) {
            k[o].timer = setTimeout(function () {
                B.apply(this, [n, o, l])
            }, 333)
        }
        g_ajaxIshRequest("ajax.php?" + S[n][1] + "=" + o)
    }

    function C(k, l) {
        if (F._fixTooltip) {
            k = F._fixTooltip(k, V, a, F)
        }
        //		if (!k) {
        //			k = LANG["tooltip_" + g_types[V] + "notfound"];
        //			l = "Temp"
        //		}
        if (R == 1) {
            Tooltip.setIcon(null);
            Tooltip.show(F, k, 0, 0)
        } else {
            Tooltip.setIcon(l);
            Tooltip.showAtXY(k, J, H, j, W)
        }
    }

    function B(m, n, l) {
        if (V == m && a == n && L == l) {
            C(LANG.tooltip_loading);
            var k = S[m][0];
            k[n].timer = setTimeout(function () {
                I.apply(this, [m, n, l])
            }, 3850)
        }
    }

    function I(m, n, l) {
        var k = S[m][0];
        k[n].status[l] = E;
        if (V == m && a == n && L == l) {
            C(LANG.tooltip_noresponse)
        }
    }

    this.register = function (n, o, l, m) {
        var k = S[n][0];
        clearTimeout(k[o].timer);
        cO(k[o], m);
        if (k[o][X(l)]) {
            k[o].status[l] = N
        } else {
            k[o].status[l] = M
        }
        if (V == n && o == a && L == l) {
            C(k[o][X(l)], k[o].icon)
        }
    };
    this.registerItem = function (m, k, l) {
        this.register(G, m, k, l)
    };
    this.registerQuest = function (m, k, l) {
        this.register(O, m, k, l)
    };
    this.registerSpell = function (m, k, l) {
        this.register(g, m, k, l)
    };
    this.request = function (l, m, k) {
        h(l, m, k);
        D(l, m, k, 1)
    };
    this.requestItem = function (k) {
        this.request(G, g_locale.id, k)
    };
    this.requestSpell = function (k) {
        this.request(g, g_locale.id, k)
    };
    this.getStatus = function (m, n, l) {
        var k = S[m][0];
        if (k[n] != null) {
            return k[n].status[l]
        } else {
            return i
        }
    };
    this.getItemStatus = function (l, k) {
        this.getStatus(G, l, k)
    };
    this.requestSpell = function (l, k) {
        this.getStatus(g, l, k)
    };
    Z()
};

LiveSearch = new

function () {
    var currentTextbox, lastSearch = {},
        lastDiv, timer, prepared, container, cancelNext, hasData;

    function setText(textbox, txt) {
        textbox.value = txt;
        textbox.selectionStart = textbox.selectionEnd = txt.length
    }

    function colorDiv(div, fromOver) {
        if (lastDiv) {
            lastDiv.className = lastDiv.className.replace("live-search-selected", "")
        }
        lastDiv = div;
        lastDiv.className += " live-search-selected";
        if (!fromOver) {
            show();
            setTimeout(setText.bind(0, currentTextbox, g_getTextContent(div.firstChild.firstChild.childNodes[1])), 1);
            cancelNext = 1
        }
    }

    function aOver() {
        colorDiv(this.parentNode.parentNode, 1)
    }

    function isVisible() {
        if (!container) {
            return false
        }
        return container.style.display != "none"
    }

    function adjust(fromResize) {
        if (fromResize == 1 && !isVisible()) {
            return
        }
        if (currentTextbox == null) {
            return
        }
        var c = ac(currentTextbox);
        container.style.left = (c[0] - 2) + "px";
        container.style.top = (c[1] + currentTextbox.offsetHeight + 1) + "px";
        container.style.width = currentTextbox.offsetWidth + "px"
    }

    function prepare() {
        if (prepared) {
            return
        }
        prepared = 1;
        container = ce("div");
        container.className = "live-search";
        container.style.display = "none";
        ae(ge("layers"), container);
        aE(window, "resize", adjust.bind(0, 1));
        aE(document, "click", hide)
    }

    function show() {
        if (container && !isVisible()) {
            adjust();
            container.style.display = ""
        }
    }

    function hide() {
        if (container) {
            container.style.display = "none"
        }
    }

    function boldify(match) {
        return "<b>" + match + "</b>"
    }

    function display(textbox, search, suggz, dataz) {
        prepare();
        show();
        lastA = null;
        hasData = 1;
        while (container.firstChild) {
            de(container.firstChild)
        }
        if (!Browser.ie6) {
            ae(container, ce("em"));
            ae(container, ce("var"));
            ae(container, ce("strong"))
        }
        search = search.replace(/[^a-z0-9'\-]/, " ");
        search = trim(search.replace(/\s+/g, " "));
        var parts = search.split(" "),
            strRegex = "";
        for (var j = 0, len = parts.length; j < len; ++j) {
            if (j > 0) {
                strRegex += "|"
            }
            strRegex += parts[j]
        }
        var regex = new RegExp("(" + strRegex + ")", "gi");
        for (var i = 0, len = suggz.length; i < len; ++i) {
            var pos = suggz[i].lastIndexOf("(");
            if (pos != -1) {
                suggz[i] = suggz[i].substr(0, pos - 1)
            }
            var type = dataz[i][0],
                typeId = dataz[i][1],
                param1 = dataz[i][2],
                param2 = dataz[i][3],
                a = ce("a"),
                sp = ce("i"),
                sp2 = ce("span"),
                div = ce("div"),
                div2 = ce("div");
            a.onmouseover = aOver;
            a.href = "?" + g_types[type] + "=" + typeId;
            if (type == 3 && param2) {
                a.className += " q" + param2
            }
            if ((type == 3 || type == 6) && param1) {
                div.className += " live-search-icon";
                div.style.backgroundImage = "url(images/icons/small/" + param1.toLowerCase() + ".png)"
            } else {
                if (type == 5 && param1 >= 1 && param1 <= 2) {
                    div.className += " live-search-icon-quest-" + (param1 == 1 ? "alliance" : "horde")
                }
            }
            ae(sp, ct(LANG.types[type][0]));
            ae(a, sp);
            var buffer = suggz[i];
            buffer = buffer.replace(regex, boldify);
            sp2.innerHTML = buffer;
            ae(a, sp2);
            if (type == 6 && param2) {
                ae(a, ct(" (" + param2 + ")"))
            }
            ae(div2, a);
            ae(div, div2);
            ae(container, div)
        }
    }

    function receive(xhr, opt) {
        var text = xhr.responseText;
        if (text == '0' || text.charAt(0) != "[" || text.charAt(text.length - 1) != "]")
            return
        text = text.replace('\n', '');
        var a = eval(text);
        var search = a[0];
        if (search == opt.search) {
            if (a.length == 8) {
                display(opt.textbox, search, a[1], a[7])
            } else {
                hide()
            }
        }
    }

    function fetch(textbox, search) {
        search = search.trim();
        new Ajax("opensearch.php?search=" + urlencode(search), {
            onSuccess: receive,
            textbox: textbox,
            search: search
        })
    }

    function preFetch(textbox, search) {
        if (cancelNext) {
            cancelNext = 0;
            return
        }
        hasData = 0;
        if (timer > 0) {
            clearTimeout(timer);
            timer = 0
        }
        timer = setTimeout(fetch.bind(0, textbox, search), 200)
    }

    function cycle(dir) {
        if (!isVisible()) {
            if (hasData) {
                show()
            }
            return
        }
        var firstNode = (container.childNodes[0].nodeName == "EM" ? container.childNodes[3] : container.firstChild);
        var bakDiv = dir ? firstNode : container.lastChild;
        if (lastDiv == null) {
            colorDiv(bakDiv)
        } else {
            var div = dir ? lastDiv.nextSibling : lastDiv.previousSibling;
            if (div) {
                if (div.nodeName == "STRONG") {
                    div = container.lastChild
                }
                colorDiv(div)
            } else {
                colorDiv(bakDiv)
            }
        }
    }

    var searchTimeout = null;
    var quickSearch = function (tbox, searchstring) {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
            searchTimeout = null
        }
        searchTimeout = setTimeout(function() {
            preFetch(tbox, searchstring)
        }, 500)
    };
    function onKeyUp(e) {
        e = $E(e);
        var textbox = e._target;
        if (Browser.gecko && e.ctrlKey) {
            switch (e.keyCode) {
                case 48:
                case 96:
                case 107:
                case 109:
                    adjust(textbox);
                    break
            }
        }
        var search = trim(textbox.value.replace(/\s+/g, " "));
        if (search == lastSearch[textbox.id]) {
            return
        }
        lastSearch[textbox.id] = search;
        if (search.length) {
            quickSearch(textbox, search);
        } else {
            hide()
        }
    }

    function onKeyDown(e) {
        e = $E(e);
        var textbox = e._target;
        switch (e.keyCode) {
            case 27:
                hide();
                break;
            case 38:
                cycle(0);
                break;
            case 40:
                cycle(1);
                break
        }
    }

    function onFocus(e) {
        e = $E(e);
        var textbox = e._target;
        if (textbox != document) {
            currentTextbox = textbox
        }
    }

    this.attach = function (textbox) {
        textbox.setAttribute("autocomplete", "off");
        aE(textbox, "focus", onFocus);
        aE(textbox, "keyup", onKeyUp);
        aE(textbox, Browser.opera ? "keypress" : "keydown", onKeyDown)
    }
};

Lightbox = new

function () {
    var F, N, Q, J = {},
        C = {},
        P, D, E;

    function O() {
        aE(F, "click", G);
        aE(N, "mousewheel", B);
        aE(document, Browser.opera ? "keypress" : "keydown", H);
        aE(window, "resize", A);
        if (Browser.ie6) {
            aE(window, "scroll", M)
        }
    }

    function K() {
        dE(F, "click", G);
        dE(N, "mousewheel", B);
        dE(document, Browser.opera ? "keypress" : "keydown", H);
        dE(window, "resize", A);
        if (Browser.ie6) {
            dE(window, "scroll", M)
        }
    }

    function I() {
        if (P) {
            return
        }
        P = 1;
        var R = ge("layers");
        F = ce("div");
        F.className = "lightbox-overlay";
        N = ce("div");
        N.className = "lightbox-outer";
        Q = ce("div");
        Q.className = "lightbox-inner";
        F.style.display = N.style.display = "none";
        ae(R, F);
        ae(N, Q);
        ae(R, N)
    }

    function B(R) {
        R = $E(R);
        R.returnValue = false
    }

    function H(R) {
        R = $E(R);
        switch (R.keyCode) {
            case 27:
                G();
                break
        }
    }

    function A(R) {
        if (R != 1234) {
            if (C.onResize) {
                C.onResize()
            }
        }
        F.style.height = document.body.offsetHeight + "px";
        if (Browser.ie6) {
            M()
        }
    }

    function M() {
        var S = g_getScroll().y,
            R = g_getWindowSize().h;
        N.style.top = (S + R / 2) + "px"
    }

    function G() {
        K();
        if (C.onHide) {
            C.onHide()
        }
        E = 0;
        F.style.display = N.style.display = "none";
        array_apply(gE(document, "iframe"), function (R) {
            R.style.display = ""
        })
    }

    function L() {
        F.style.display = N.style.display = J[D].style.display = ""
    }

    this.setSize = function (R, S) {
        Q.style.visibility = "hidden";
        Q.style.width = R + "px";
        Q.style.height = S + "px";
        Q.style.left = -parseInt(R / 2) + "px";
        Q.style.top = -parseInt(S / 2) + "px";
        Q.style.visibility = "visible"
    };
    this.show = function (V, S, R) {
        E = 1;
        C = S || {};
        array_apply(gE(document, "iframe"), function (W) {
            W.style.display = "none"
        });
        I();
        O();
        if (D != V && J[D] != null) {
            J[D].style.display = "none"
        }
        D = V;
        var U = 0,
            T;
        if (J[V] == null) {
            U = 1;
            T = ce("div");
            ae(Q, T);
            J[V] = T
        } else {
            T = J[V]
        }
        if (C.onShow) {
            C.onShow(T, U, R)
        }
        A(1234);
        L()
    };
    this.reveal = function () {
        L()
    };
    this.hide = function () {
        G()
    };
    this.isVisible = function () {
        return E
    }
};

function toggle_filters() {
    document.getElementById('filters_form').classList.toggle('filters_hidden')
    let filters = document.getElementById('filters')
    if (document.getElementById('filters_form').classList.contains('filters_hidden'))
        filters.setAttribute('value', 'off');
    else
        filters.setAttribute('value', 'on');
}

function reset_filters() {
    document.getElementsByName("item_level_min")[0].setAttribute('value', '0')
    document.getElementsByName("item_level_max")[0].setAttribute('value', '0')

    document.getElementsByName("req_level_min")[0].setAttribute('value', '0')
    document.getElementsByName("req_level_max")[0].setAttribute('value', '0')

    document.getElementById("item_quality_min").value = 0

    document.getElementById("stat_1").value = 0
    document.getElementsByName("value_1")[0].setAttribute('value', '0')

    document.getElementById("stat_2").value = 0
    document.getElementsByName("value_2")[0].setAttribute('value', '0')

    document.getElementById("stat_3").value = 0
    document.getElementsByName("value_3")[0].setAttribute('value', '0')

    document.getElementById("other_stat_1").value = 0
    document.getElementsByName("other_value_1")[0].setAttribute('value', '0')

    document.getElementById("other_stat_2").value = 0
    document.getElementsByName("other_value_2")[0].setAttribute('value', '0')

    document.getElementById("other_stat_3").value = 0
    document.getElementsByName("other_value_3")[0].setAttribute('value', '0')
}