if (typeof WH === "undefined") {
    var WH = {data: {}, entities: {}, pageVars: {}, wowheadRemote: true, staticUrl: "https://wow.zamimg.com"}
}
WH.isTouch = function () {
    if (!WH.wowheadRemote && typeof Platform !== "undefined") {
        WH.isTouch = function () {
            return Platform.isTouch()
        }
    } else {
        var b = navigator.userAgent || navigator.vendor || window.opera;
        var a = {isMobile: false, isTablet: false};
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4))) {
            a.isMobile = true
        }
        if (!a.isMobile && /(android|ipad|playbook|silk)/i.test(b)) {
            a.isTablet = true
        }
        WH.isTouch = (function (c) {
            return c.isMobile || c.isTablet
        }).bind(null, a);
        WH.isMobile = (function (c) {
            return c
        }).bind(null, a.isMobile);
        WH.isTablet = (function (c) {
            return c
        }).bind(null, a.isTablet)
    }
    return WH.isTouch()
};
if (typeof $WowheadPower === "undefined") {
    var $WowheadPower = new function () {
        var Y = {
            "-1000": {name: "Mount", path: "mount", data: {}, maxId: 50000},
            "-1001": {name: "Recipe", path: "recipe", data: {}, maxId: 500000},
            1: {name: "NPC", path: "npc", data: {}, maxId: 500000},
            2: {name: "Object", path: "object", data: {}, maxId: 750000},
            3: {name: "Item", path: "item", data: {}, maxId: 500000},
            4: {name: "Item Set", path: "item-set", data: {}, maxId: 10000, minId: -5000},
            5: {name: "Quest", path: "quest", data: {}, maxId: 100000},
            6: {name: "Spell", path: "spell", data: {}, maxId: 500000},
            7: {name: "Zone", path: "zone", data: {}, maxId: 50000},
            10: {name: "Achievement", path: "achievement", data: {}, maxId: 50000},
            12: {name: "Holiday", path: "event", data: {}, maxId: 10000},
            17: {name: "Currency", path: "currency", data: {}, maxId: 10000},
            20: {name: "Building", path: "building", data: {}, maxId: 1000},
            21: {name: "Follower", path: "follower", data: {}, maxId: 10000},
            22: {name: "Mission Ability", path: "mission-ability", data: {}, maxId: 10000},
            23: {name: "Mission", path: "mission", data: {}, maxId: 10000},
            25: {name: "Ship", path: "ship", data: {}, maxId: 10000},
            26: {name: "Threat", path: "threat", data: {}, maxId: 1000},
            27: {name: "Resource", path: "resource", data: {}, maxId: 100, minId: 0},
            28: {name: "Champion", path: "champion", data: {}, maxId: 10000},
            30: {name: "Order Advancement", path: "order-advancement", data: {}, maxId: 5000},
            38: {name: "BFA Champion", path: "bfa-champion", data: {}, maxId: 10000},
            40: {name: "Affix", path: "affix", data: {}, maxId: 1000},
            42: {name: "Azerite Essence Power", path: "azerite-essence-power", data: {}, maxId: 1000},
            43: {name: "Azerite Essence", path: "azerite-essence", data: {}, maxId: 100},
            44: {name: "Storyline", path: "storyline", data: {}, maxId: 10000},
            46: {name: "Adventure Combatant Ability", path: "adventure-combatant-ability", data: {}, maxId: 10000},
            100: {name: "Guide", path: "guide", data: {}},
            101: {name: "Transmog Set", path: "transmog-set", data: {}, maxId: 50000},
            110: {name: "Outfit", path: "outfit", data: {}},
            200: {name: "Pet Ability", path: "pet-ability", data: {}, maxId: 10000}
        };
        var K = WH.wowheadRemote;
        var aN = K;
        var w = false;
        var av = {applyto: 3}, H = document.getElementsByTagName("head")[0], aJ,
            aA = {attach: 3, attachToIcon: 1, attachWithoutScreenshot: 4, "float": 0, floatWithoutIcon: 5, screen: 2},
            v = 550, aR = {colorLinks: "colorlinks", iconizeLinks: "iconizelinks", renameLinks: "renamelinks"}, ag, z,
            P, at, l, am, aq, ap, al = aA["float"], B = false, aa = null, A = 1, y = 1, aF = -1, k = 0, b = 1, J = 0,
            ab = 1, az = 2, d = 3, aj = 4, t = 5, Z = 1, Q = 2, s = 3, i = 4, aD = 5, ad = 6, T = 7, U = 10, j = 12,
            S = 13, h = 17, aB = 20, X = 21, x = 22, aE = 23, p = 25, ae = 26, m = 27, I = 28, aQ = 30, aL = 38, a = 40,
            aI = 42, O = 43, E = 44, aC = 46;
        TYPE_GUIDE = 100, TYPE_TRANSMOGSET = 101, TYPE_OUTFIT = 110, TYPE_PETABILITY = 200, ICONIZE_TYPES = [U, O, aI, s, ad], CURSOR_HSPACE = 15, CURSOR_VSPACE = 15, _LANG = {
            0: {
                achievementComplete: "Achievement earned by $1 on $2/$3/$4",
                loading: "Loading…",
                noResponse: "No response from server :(",
                notFound: "%s Not Found"
            },
            1: {
                achievementComplete: "$1이(가) $2/$3/$4에 업적을 달성함",
                loading: "로딩 중…",
                noResponse: "서버가 응답하지 않습니다 :(",
                notFound: "%s 을(를) 찾을 수 없음"
            },
            2: {
                achievementComplete: "Haut-fait reçu par $1 le $2/$3/$4",
                loading: "Chargement…",
                noResponse: "Pas de réponse du serveur :(",
                notFound: "%s non trouvé"
            },
            3: {
                achievementComplete: "Erfolg wurde von $1 am $3.$2.$4 errungen",
                loading: "Lädt…",
                noResponse: "Keine Antwort vom Server :(",
                notFound: "%s nicht gefunden"
            },
            4: {achievementComplete: "$1在$2/$3/$4上获得成就", loading: "正在载入…", noResponse: "服务器没有响应 :(", notFound: "%s未找到"},
            6: {
                achievementComplete: "Logro conseguido por $1 el $2/$3/$4",
                loading: "Cargando…",
                noResponse: "No hay respuesta del servidor :(",
                notFound: "%s no encontrado/a"
            },
            7: {
                achievementComplete: "$1 получил(а) это достижение $2/$3/$4",
                loading: "Загрузка…",
                noResponse: "Нет ответа от сервера :(",
                notFound: "%s не найдено"
            },
            8: {
                achievementComplete: "Conquista conseguida por $1 em $3/$2/$4",
                loading: "Carregando…",
                noResponse: "Sem resposta do servidor :(",
                notFound: "%s não encontrado(a)"
            },
            9: {
                achievementComplete: "Impresa compiuta da $1 su $2/$3/$4",
                loading: "Caricamento…",
                noResponse: "Nessuna risposta dal server :(",
                notFound: "%s Non Trovato"
            }
        }, STEALTH_TYPES = [TYPE_GUIDE];
        var W = new function () {
            var aW = {};
            var aV = {};
            var aU = {};
            var aT = {};
            this.fetch = function (a0, a3) {
                if (!aT.hasOwnProperty(a0) || aT[a0].hasOwnProperty(a3)) {
                    return
                }
                aT[a0][a3] = ab;
                aW[a0][a3] = [];
                var a1 = WH.dataEnvTerm[a3];
                switch (a3) {
                    case WH.dataEnv.BETA:
                        a1 = WH.BETA_DOMAIN || a1;
                        break;
                    case WH.dataEnv.MAIN:
                        a1 = "www";
                        break
                }
                var aZ = af(a1) + aV[a0];
                var a2 = WH.getDataBuild(a3);
                aZ += (a2 !== "0") ? "&" + a2 : "";
                aZ += "&json";
                WH.xhrJsonRequest(aZ, (function (a4, a6, a5) {
                    if (!a5) {
                        WH.error("Wowhead tooltips failed to load scaling data for " + ar(a4));
                        return
                    }
                    W.setData(a4, a6, a5)
                }).bind(null, a0, a3))
            };
            this.getSpellsBySpec = function (aZ, a0) {
                var a1 = P || WH.getDataEnv();
                this.registerCallback(S, a1, function () {
                    var a3 = aU[S][a1];
                    var a2 = [];
                    if (a3.specMap.hasOwnProperty(aZ)) {
                        a2 = a3["class"][a3.specMap[aZ]].concat(a3.spec[aZ] || [])
                    }
                    a0(a2)
                })
            };
            this.isLoaded = function (aZ, a0) {
                if (!aT.hasOwnProperty(aZ)) {
                    return true
                }
                if (aT[aZ][a0] === aj) {
                    aX();
                    return true
                }
                return false
            };
            this.registerCallback = function (aZ, a1, a0) {
                if (this.isLoaded(aZ, a1)) {
                    window.requestAnimationFrame(a0);
                    return
                }
                if (!aW[aZ].hasOwnProperty(a1)) {
                    this.fetch(aZ, a1)
                }
                aW[aZ][a1].push(a0)
            };
            this.setData = function (a0, a2, a1) {
                aT[a0][a2] = aj;
                aW[a0][a2] = aW[a0][a2] || [];
                aU[a0][a2] = a1;
                aX();
                var aZ = aW[a0][a2];
                while (aZ.length) {
                    aZ.shift()()
                }
            };

            function aY() {
                aV[s] = "/data/item-scaling";
                aV[ad] = "/data/spell-scaling";
                aV[S] = "/data/spec-spells";
                for (var aZ in aV) {
                    if (!aV.hasOwnProperty(aZ)) {
                        continue
                    }
                    aT[aZ] = {};
                    aW[aZ] = {};
                    aU[aZ] = {}
                }
            }

            function aX() {
                var a0 = P || WH.getDataEnv();
                var aZ;
                if (aZ = aU[s][a0]) {
                    WH.staminaFactor = aZ.staminaByIlvl;
                    WH.convertRatingToPercent.RB = aZ.combatRatingsBase;
                    WH.convertRatingToPercent.LH = aZ.ratingsToPercentLH;
                    WH.convertRatingToPercent.RM = aZ.ratingsToPercentRM;
                    WH.convertRatingToPercent.LT = aZ.ratingsToPercentLT;
                    WH.convertScalingFactor.SV = aZ.itemScalingValue;
                    WH.convertScalingFactor.SD = aZ.scalingFactors;
                    WH.curvePoints = aZ.curvePoints;
                    WH.applyStatModifications.ScalingData = aZ.scalingData;
                    WH.data.artifactKnowledgeMultiplier = aZ.artifactKnowledgeMultiplier;
                    WH.data.bonusItemEffects = aZ.bonusEffects
                }
                if (aZ = aU[ad][a0]) {
                    WH.convertScalingSpell.SV = aZ.scalingValue;
                    WH.convertScalingSpell.SpellInformation = aZ.spellInformation;
                    WH.convertScalingSpell.RandPropPoints = aZ.randPropPoints
                }
            }

            aY()
        };
        this.setScales = W.setData;
        var o = {0: "enus", 1: "kokr", 2: "frfr", 3: "dede", 4: "zhcn", 6: "eses", 7: "ruru", 8: "ptbr", 9: "itit"};
        var V = {
            getId: function () {
                return 0
            }, getName: function () {
                return "enus"
            }
        };
        if (typeof aK === "undefined") {
            var aK = {
                tooltip_genericrating: '<span class="q2">Equip: Increases your $1 by <!--rtg$2-->$3&nbsp;<small>(<!--rtg%$2-->0&nbsp;@&nbsp;L<!--lvl-->0)</small>.</span><br />',
                tooltip_reforged: "Reforged ($1 $2 &rarr; $1 $3)",
                traits: {
                    agi: ["Agility", "Agi", "Agi"],
                    arcres: ["Arcane resistance", "Arcane Resist", "ArcR"],
                    arcsplpwr: ["Arcane spell power", "Arcane Power", "ArcP"],
                    armor: ["Armor", "Armor", "Armor"],
                    armorbonus: ["Additional armor", "Bonus Armor", "AddAr"],
                    armorpenrtng: ["Armor penetration rating", "Armor Pen", "Pen"],
                    atkpwr: ["Attack power", "AP", "AP"],
                    block: ["Block value", "Block Value", "BkVal"],
                    blockrtng: ["Block rating", "Block", "Block"],
                    critstrkrtng: ["Critical strike rating", "Crit", "Crit"],
                    defrtng: ["Defense rating", "Defense", "Def"],
                    dmg: ["Weapon damage", "Damage", "Dmg"],
                    dmgmax1: ["Maximum damage", "Max Damage", "Max"],
                    dmgmin1: ["Minimum damage", "Min Damage", "Min"],
                    dodgertng: ["Dodge rating", "Dodge", "Dodge"],
                    dps: ["Damage per second", "DPS", "DPS"],
                    exprtng: ["Expertise rating", "Expertise", "Exp"],
                    firres: ["Fire resistance", "Fire Resist", "FirR"],
                    firsplpwr: ["Fire spell power", "Fire Power", "FireP"],
                    frores: ["Frost resistance", "Frost Resist", "FroR"],
                    frosplpwr: ["Frost spell power", "Frost Power", "FroP"],
                    hastertng: ["Haste rating", "Haste", "Haste"],
                    health: ["Health", "Health", "Hlth"],
                    healthrgn: ["Health regeneration", "HP5", "HP5"],
                    hitrtng: ["Hit rating", "Hit", "Hit"],
                    holres: ["Holy resistance", "Holy Resist", "HolR"],
                    holsplpwr: ["Holy spell power", "Holy Power", "HolP"],
                    "int": ["Intellect", "Int", "Int"],
                    level: ["Level", "Level", "Lvl"],
                    mana: ["Mana", "Mana", "Mana"],
                    manargn: ["Mana regeneration", "MP5", "MP5"],
                    mastrtng: ["Mastery rating", "Mastery", "Mastery"],
                    mleatkpwr: ["Melee attack power", "Melee AP", "AP"],
                    mlecritstrkrtng: ["Melee critical strike rating", "Melee Crit", "Crit"],
                    mledmgmax: ["Melee maximum damage", "Melee Max Damage", "Max"],
                    mledmgmin: ["Melee minimum damage", "Melee Min Damage", "Min"],
                    mledps: ["Melee DPS", "Melee DPS", "DPS"],
                    mlehastertng: ["Melee haste rating", "Melee Haste", "Haste"],
                    mlehitrtng: ["Melee hit rating", "Melee Hit", "Hit"],
                    mlespeed: ["Melee speed", "Melee Speed", "Speed"],
                    natres: ["Nature resistance", "Nature Resist", "NatR"],
                    natsplpwr: ["Nature spell power", "Nature Power", "NatP"],
                    nsockets: ["Number of sockets", "Sockets", "Sockt"],
                    parryrtng: ["Parry rating", "Parry", "Parry"],
                    reqarenartng: ["Required personal and team arena rating", "Req Rating", "Rating"],
                    reqlevel: ["Required level", "Req Level", "Level"],
                    resirtng: ["PvP Resilience rating", "PvP Resilience", "Resil"],
                    rgdatkpwr: ["Ranged attack power", "Ranged AP", "RAP"],
                    rgdcritstrkrtng: ["Ranged critical strike rating", "Ranged Crit", "Crit"],
                    rgddmgmax: ["Ranged maximum damage", "Ranged Max Damage", "Max"],
                    rgddmgmin: ["Ranged minimum damage", "Ranged Min Damage", "Min"],
                    rgddps: ["Ranged DPS", "Ranged DPS", "DPS"],
                    rgdhastertng: ["Ranged haste rating", "Ranged Haste", "Haste"],
                    rgdhitrtng: ["Ranged hit rating", "Ranged Hit", "Hit"],
                    rgdspeed: ["Ranged speed", "Ranged Speed", "Speed"],
                    sepbasestats: "Base stats",
                    sepdefensivestats: "Defensive stats",
                    sepindividualstats: "Individual stats",
                    sepoffensivestats: "Offensive stats",
                    sepresistances: "Resistances",
                    sepweaponstats: "Weapon stats",
                    shares: ["Shadow resistance", "Shadow Resist", "ShaR"],
                    shasplpwr: ["Shadow spell power", "Shadow Power", "ShaP"],
                    speed: ["Speed", "Speed", "Speed"],
                    spi: ["Spirit", "Spi", "Spi"],
                    splcritstrkrtng: ["Spell critical strike rating", "Spell Crit", "Crit"],
                    spldmg: ["Damage done by spells", "Spell Damage", "Dmg"],
                    splheal: ["Healing done by spells", "Healing", "Heal"],
                    splpwr: ["Spell power", "Spell Power", "SP"],
                    splhastertng: ["Spell haste rating", "Spell Haste", "Haste"],
                    splhitrtng: ["Spell hit rating", "Spell Hit", "Hit"],
                    splpen: ["Spell penetration", "Spell Pen", "Pen"],
                    sta: ["Stamina", "Sta", "Sta"],
                    str: ["Strength", "Str", "Str"],
                    pvppower: ["PvP Power", "PvPPower", "PvPPower"]
                }
            }
        }

        function ao() {
            if (WH.Tooltip) {
                WH.wowheadRemotePreload = true
            }
            if (K) {
                if (!WH.wowheadRemotePreload) {
                    var aT = ["basic.js?32"];
                    if (g("iconSize")) {
                        aT.push("global/WH/Icon.js?2")
                    }
                    for (var aW = 0, aV; aV = aT[aW]; aW++) {
                        var aU = document.createElement("script");
                        aU.src = WH.staticUrl + "/js/" + aV;
                        H.appendChild(aU)
                    }
                }
            } else {
                M();
                q(function () {
                    V = window.Locale;
                    W.fetch(s, WH.getDataEnv());
                    W.fetch(ad, WH.getDataEnv())
                })
            }
        }

        function au() {
            var aU = g("hide");
            if (!aU) {
                return
            }
            if (typeof aJ !== "undefined") {
                return
            }
            if (!document.styleSheets) {
                return
            }
            var aV = document.createElement("style");
            aV.type = "text/css";
            H.appendChild(aV);
            if (!window.createPopup) {
                H.appendChild(document.createTextNode(""))
            }
            aJ = document.styleSheets[document.styleSheets.length - 1];
            for (var aT in aU) {
                if (!aU.hasOwnProperty(aT) || !aU[aT]) {
                    continue
                }
                if (aJ.insertRule) {
                    aJ.insertRule(".wowhead-tooltip .whtt-" + aT + "{display: none}", aJ.cssRules.length)
                } else {
                    if (aJ.addRule) {
                        aJ.addRule(".wowhead-tooltip .whtt-" + aT, "display: none", -1)
                    }
                }
            }
        }

        this.getEntity = function (aU, aX, aW, aT) {
            var aV = aP(aU);
            aV[aX] = aV[aX] || {};
            aV[aX][aW] = aV[aX][aW] || {};
            aV[aX][aW][aT] = aV[aX][aW][aT] || {status: J, callbacks: [], data: {}};
            return aV[aX][aW][aT]
        };

        function aP(aT) {
            if (typeof Y[aT] !== "object") {
                throw new Error("Wowhead tooltips could not find config for entity #" + aT)
            }
            return Y[aT].data
        }

        function aG(aT) {
            if (typeof Y[aT] !== "object") {
                WH.error("Wowhead tooltips could not find config for entity #" + aT);
                return undefined
            }
            if (!WH.wowheadRemote || !Y[aT].hasOwnProperty("maxId")) {
                return undefined
            }
            return {min: Y[aT].hasOwnProperty("minId") ? Y[aT].minId : 1, max: Y[aT].maxId}
        }

        function ar(aT) {
            if (typeof Y[aT] !== "object") {
                WH.error("Wowhead tooltips could not find config for entity #" + aT);
                return "Entity"
            }
            return Y[aT].name
        }

        function ak(aT) {
            if (typeof Y[aT] !== "object") {
                WH.error("Wowhead tooltips could not find config for entity #" + aT);
                return "unknown"
            }
            return Y[aT].path
        }

        function c(aT, aU) {
            var aV = _LANG[aT] || _LANG[0];
            return aV[aU] || ""
        }

        function g(aU) {
            var aT = N();
            if (!aT) {
                return null
            }
            if (!aT.hasOwnProperty(aU)) {
                if (aR[aU] && aT.hasOwnProperty(aR[aU])) {
                    return aT[aR[aU]]
                }
                return null
            }
            return aT[aU]
        }

        function N() {
            if (typeof whTooltips === "object") {
                return whTooltips
            }
            if (typeof wowhead_tooltips === "object") {
                return wowhead_tooltips
            }
            return null
        }

        function M() {
            if (B) {
                return
            }
            B = true;
            WH.aE(document, "keydown", function (aT) {
                aT = WH.normalizeEvent(aT);
                switch (aT.keyCode) {
                    case 27:
                        $WowheadPower.clearTouchTooltip();
                        WH.Tooltip.hide();
                        break
                }
            });
            if (WH.isTouch()) {
                f()
            } else {
                WH.aE(document, "mouseover", C)
            }
        }

        this.attachTouchTooltips = function (aT) {
            if (!WH.isTouch()) {
                return
            }
            if (aT && aT.nodeType === 1) {
                f(aT)
            }
        };

        function q(aT) {
            if (document.readyState === "loading") {
                document.addEventListener("DOMContentLoaded", aT)
            } else {
                aT()
            }
        }

        function ah(aT) {
            if (!aT.dataset || aT.dataset.hasWhTouchEvent === "true") {
                return
            }
            if (aT.onclick == null) {
                aT.onclick = n
            } else {
                WH.aE(aT, "click", n)
            }
            aT.dataset.hasWhTouchEvent = "true"
        }

        function f(aT) {
            if (!WH.isTouch()) {
                return
            }
            q(function () {
                aT = aT || document.body;
                var aV = WH.gE(aT, "a");
                for (var aW = 0, aU = aV.length; aW < aU; aW++) {
                    ah(aV[aW])
                }
            })
        }

        this.init = function () {
            if (g("iconSize") && typeof Icon === "undefined") {
                setTimeout($WowheadPower.init, 10);
                return
            }
            if (K) {
                if (!WH.wowheadRemotePreload) {
                    WH.ae(H, WH.ce("link", {
                        type: "text/css",
                        href: WH.staticUrl + "/css/basic.css?&14",
                        rel: "stylesheet"
                    }));
                    if (g("iconSize")) {
                        WH.ae(H, WH.ce("link", {
                            type: "text/css",
                            href: WH.staticUrl + "/css/global/icon.css",
                            rel: "stylesheet"
                        }))
                    }
                }
            }
            M();
            q(function () {
                if (g("renameLinks") || g("colorLinks") || g("iconizeLinks") || g("iconSize")) {
                    for (var aT = 0; aT < document.links.length; aT++) {
                        var aU = document.links[aT];
                        D(aU)
                    }
                    au()
                } else {
                    if (document.querySelectorAll) {
                        var aV = document.querySelectorAll('a[href*="wowhead.com/talent-calc/embed/"]');
                        for (var aT = 0; aT < aV.length; aT++) {
                            D(aV[aT])
                        }
                    }
                }
            })
        };

        function G(aT) {
            var aU = WH.getCursorPos(aT);
            aq = aU.x;
            ap = aU.y
        }

        function ai(aU, aV) {
            if (aU.classList) {
                aU.classList.add.apply(aU.classList, aV)
            } else {
                for (var aT = 0; aT < aV.length; aT++) {
                    if ((" " + aU.className + " ").indexOf(" " + aV[aT] + " ") < 0) {
                        aU.className = (aU.className ? aU.className + " " : "") + aV[aT]
                    }
                }
            }
        }

        function D(aW, bi) {
            if (bi && aW.dataset && aW.dataset.simpleTooltip) {
                if (!WH.isTouch() && !aW.onmouseout) {
                    aW.onmousemove = ax;
                    aW.onmouseout = ac
                }
                WH.Tooltip.show(aW, aW.dataset.simpleTooltip.length < 30 ? '<div class="no-wrap">' + aW.dataset.simpleTooltip + "</div>" : aW.dataset.simpleTooltip);
                return b
            }
            if (aW.nodeName !== "A" && aW.nodeName !== "AREA") {
                return aF
            }
            var a0 = aW.rel;
            try {
                if (aW.dataset && aW.dataset.hasOwnProperty("wowhead")) {
                    a0 = aW.dataset.wowhead
                } else {
                    if (aW.getAttribute && aW.getAttribute("data-wowhead")) {
                        a0 = aW.getAttribute("data-wowhead")
                    }
                }
            } catch (bo) {
                void (0)
            }
            if ((!aW.href.length && !a0) || (a0 && /^np\b/.test(a0)) || (aW.getAttribute("data-disable-wowhead-tooltip") === "true") || (WH.isTouch() && aW.getAttribute("data-disable-wowhead-touch-tooltip") === "true")) {
                return k
            }
            var bf, be, bd, aU, bl = {};
            var a1 = /^https?:\/\/(?:[^/]+\.)?classic\.(?:[^/]+\.)?wowhead\.com\/talent-calc\/embed\/[^#]+/;
            if (K && (aU = aW.href.match(a1))) {
                aW.parentNode.replaceChild(WH.ce("div", {
                    style: {
                        maxWidth: "750px",
                        maxHeight: "513px",
                        margin: "10px auto"
                    }, className: "wowhead-embed wowhead-embed-talent-calc"
                }, WH.ce("div", {
                    style: {
                        position: "relative",
                        width: "100%",
                        height: 0,
                        paddingTop: "68.4%"
                    }
                }, WH.ce("iframe", {
                    src: aU[0],
                    width: "100%",
                    height: "100%",
                    style: {border: 0, left: 0, position: "absolute", top: 0, borderRadius: "6px"},
                    sandbox: "allow-scripts allow-top-navigation"
                }))), aW);
                return b
            }
            l = bl;
            var aZ = function (bq, br, bs) {
                switch (br) {
                    case"buff":
                    case"map":
                    case"noimage":
                    case"nomajor":
                    case"notip":
                    case"premium":
                    case"pvp":
                    case"sock":
                    case"text":
                    case"twcata":
                    case"twmists":
                    case"twtbc":
                    case"twwotlk":
                        bl[br] = true;
                        break;
                    case"artk":
                    case"c":
                    case"dd":
                    case"ddsize":
                    case"diff":
                    case"diffnew":
                    case"ench":
                    case"gem1lvl":
                    case"gem2lvl":
                    case"gem3lvl":
                    case"ilvl":
                    case"level":
                    case"lvl":
                    case"nlc":
                    case"pwr":
                    case"q":
                    case"rand":
                    case"rank":
                    case"spec":
                    case"tink":
                    case"upgd":
                        bl[br] = parseInt(bs);
                        break;
                    case"abil":
                    case"azerite-essence-powers":
                    case"azerite-powers":
                    case"bonus":
                    case"cri":
                    case"forg":
                    case"gem1bonus":
                    case"gem2bonus":
                    case"gem3bonus":
                    case"gems":
                    case"know":
                    case"pcs":
                    case"rewards":
                        bl[br] = bs.split(":");
                        break;
                    case"domain":
                    case"who":
                        bl[br] = bs;
                        break;
                    case"image":
                        if (bs === "premium") {
                            bl[bs] = true
                        } else {
                            bl[br] = bs ? ("_" + bs) : ""
                        }
                        break;
                    case"transmog":
                        if (bs === "hidden") {
                            bl[br] = bs
                        } else {
                            bl[br] = parseInt(bs)
                        }
                        break;
                    case"when":
                        bl[br] = new Date(parseInt(bs));
                        break
                }
            };
            if (av.applyto & 1) {
                be = 2;
                bd = 3;
                if (aW.href.indexOf("http://") == 0 || aW.href.indexOf("https://") == 0) {
                    bf = 1;
                    aU = aW.href.match(/^https?:\/\/(.+?)?\.?(?:wowhead)\.com(?:\:\d+)?\/\??(item|quest|spell|zone|achievement|event|itemset|item-set|transmog-set|outfit|guide|statistic|currency|npc|object|pet-ability|petability|building|follower|champion|bfa-champion|garrisonability|mission-ability|mission|ship|threat|resource|order-advancement|affix|azerite-essence|azerite-essence-power|storyline|adventure-combatant-ability|mount|recipe)[=/](?:[^/?&#]+-)?(-?\d+(?:\.\d+)?)/);
                    if (!aU) {
                        aU = aW.href.match(/^https?:\/\/(.+?)?\.?(?:wowhead)\.com(?:\:\d+)?\/(guide)s\/([^\?&#]+)/)
                    }
                    y = 0
                } else {
                    aU = aW.href.match(/()\/\??(item|quest|spell|zone|achievement|event|itemset|item-set|transmog-set|outfit|statistic|currency|npc|object|pet-ability|petability|building|follower|champion|bfa-champion|garrisonability|mission-ability|mission|ship|threat|resource|order-advancement|affix|azerite-essence|azerite-essence-power|storyline|adventure-combatant-ability|guide|mount|recipe)[=/](?:[^/?&#]+-)?(-?\d+(?:\.\d+)?)/);
                    if (!aU) {
                        aU = aW.href.match(/()\/(guide)s\/([^\?&#]+)/)
                    }
                    y = 1
                }
            }
            if (aU == null && a0 && (av.applyto & 2)) {
                bf = 0;
                be = 1;
                bd = 2;
                aU = a0.match(/(item|quest|spell|zone|achievement|event|itemset|item-set|transmog-set|outfit|statistic|currency|npc|object|pet-ability|petability|building|follower|champion|bfa-champion|garrisonability|mission-ability|mission|ship|threat|resource|order-advancement|affix|azerite-essence|azerite-essence-power|storyline|adventure-combatant-ability|guide|mount|recipe).?(-?\d+(?:\.\d+)?)/);
                y = 1
            }
            if (!aU) {
                return k
            }
            aW.href.replace(/([a-zA-Z0-9-]+)=?([^&?#]*)/g, aZ);
            if (a0) {
                a0.replace(/([a-zA-Z0-9-]+)=?([^&?#]*)/g, aZ)
            }
            if (bl.gems && bl.gems.length > 0) {
                var bj;
                for (bj = Math.min(3, bl.gems.length - 1); bj >= 0; --bj) {
                    if (parseInt(bl.gems[bj])) {
                        break
                    }
                }
                ++bj;
                if (bj == 0) {
                    delete bl.gems
                } else {
                    if (bj < bl.gems.length) {
                        bl.gems = bl.gems.slice(0, bj)
                    }
                }
            }
            var aV = ["bonus", "gem1bonus", "gem2bonus", "gem3bonus"];
            for (var ba = 0, a2; a2 = aV[ba]; ba++) {
                if (bl[a2] && bl[a2].length > 0) {
                    for (bj = Math.min(16, bl[a2].length - 1); bj >= 0; --bj) {
                        if (parseInt(bl[a2][bj])) {
                            break
                        }
                    }
                    ++bj;
                    if (bj == 0) {
                        delete bl[a2]
                    } else {
                        if (bj < bl[a2].length) {
                            bl[a2] = bl[a2].slice(0, bj)
                        }
                    }
                }
            }
            if (bl.abil && bl.abil.length > 0) {
                var bj, bn = [], bh;
                for (bj = 0; bj < Math.min(8, bl.abil.length); bj++) {
                    if (bh = parseInt(bl.abil[bj])) {
                        bn.push(bh)
                    }
                }
                if (bn.length == 0) {
                    delete bl.abil
                } else {
                    bl.abil = bn
                }
            }
            if (bl.rewards && bl.rewards.length > 0) {
                var bj;
                for (bj = Math.min(3, bl.rewards.length - 1); bj >= 0; --bj) {
                    if (/^\d+.\d+$/.test(bl.rewards[bj])) {
                        break
                    }
                }
                ++bj;
                if (bj == 0) {
                    delete bl.rewards
                } else {
                    if (bj < bl.rewards.length) {
                        bl.rewards = bl.rewards.slice(0, bj)
                    }
                }
            }
            am = aW;
            var bp = null;
            var bg = V.getId();
            var aT = WH.getDataEnv();
            if (bl.domain) {
                bp = bl.domain.toLowerCase()
            } else {
                if (bf && aU[bf]) {
                    bp = aU[bf].toLowerCase().replace(/(?:^|\.)(staging|dev)$/, "")
                }
            }
            if (bp !== null) {
                aT = WH.dataEnv.MAIN;
                bg = WH.getLocaleFromDomain(bp);
                if ((new RegExp("\\b" + WH.BETA_DOMAIN + "\\b")).test(bp)) {
                    aT = WH.dataEnv.BETA
                } else {
                    if (/^sl|shadow$/.test(bp)) {
                        aT = WH.dataEnv.BETA
                    } else {
                        for (var a8 in WH.dataEnv) {
                            if (!WH.dataEnv.hasOwnProperty(a8) || !WH.dataEnvTerm.hasOwnProperty(WH.dataEnv[a8])) {
                                continue
                            }
                            if ((new RegExp("\\b" + WH.dataEnvTerm[WH.dataEnv[a8]] + "\\b")).test(bp)) {
                                aT = WH.dataEnv[a8];
                                break
                            }
                        }
                    }
                }
            }
            if (aT === WH.dataEnv.PTR && !WH.isPtrActive()) {
                aT = WH.dataEnv.MAIN
            }
            if (aT === WH.dataEnv.BETA && !WH.isBetaActive()) {
                aT = WH.dataEnv.MAIN
            }
            if ([WH.dataEnv.BETA, WH.dataEnv.PTR].indexOf(aT) >= 0) {
                bg = 0
            }
            if (aW.href.indexOf("#") != -1 && document.location.href.indexOf(aU[be] + "=" + aU[bd]) != -1) {
                return k
            }
            var a5 = false;
            if (WH.isTouch()) {
                if ("innerWidth" in window) {
                    a5 = window.innerWidth < v
                } else {
                    var bm = document.documentElement || document.body;
                    a5 = !isNaN(bm.clientWidth) && bm.clientWidth < v
                }
            }
            al = aA["float"];
            if (a5) {
                al = aA.screen
            } else {
                if ((aW.parentNode.className.indexOf("icon") == 0 && aW.parentNode.nodeName == "DIV") || aW.getAttribute("data-whattach") == "icon") {
                    al = aA.attachToIcon
                } else {
                    if (WH.isTouch() || aW.getAttribute("data-whattach") == "true") {
                        al = aA.attach
                    } else {
                        var a4 = aW.parentNode;
                        var a3 = 0;
                        while (a4) {
                            if (a4.className && a4.className.indexOf("menu-inner") == 0) {
                                al = aA.attachWithoutScreenshot;
                                break
                            }
                            a3++;
                            if (a3 > 9) {
                                break
                            }
                            a4 = a4.parentNode
                        }
                    }
                }
            }
            if (!WH.isTouch() && !aW.onmouseout) {
                if (al === aA["float"]) {
                    aW.onmousemove = ax
                }
                aW.onmouseout = ac
            }
            if (al === aA["float"] && aW.dataset.whtticon === "false") {
                al = aA.floatWithoutIcon
            }
            var a6 = aU[be];
            var aY = WH.getTypeIdFromTypeString(a6);
            var aX = aU[bd];
            if (bi) {
                w = true;
                G(bi);
                WH.Tooltip.showingTooltip = true;
                if (typeof aW.overrideTooltip == "object") {
                    var a9 = aW.overrideTooltip.html;
                    var a7 = aW.overrideTooltip.html2;
                    if (typeof aW.overrideTooltip.htmlGenerator == "function") {
                        a9 = aW.overrideTooltip.htmlGenerator(aW.overrideTooltip)
                    }
                    if (typeof aW.overrideTooltip.html2Generator == "function") {
                        a7 = aW.overrideTooltip.html2Generator(aW.overrideTooltip)
                    }
                    if (aW.overrideTooltip.spanClass) {
                        a9 = '<span class="' + aW.overrideTooltip.spanClass + '">' + a9 + "</span>";
                        if (a7) {
                            a7 = '<span class="' + aW.overrideTooltip.spanClass + '">' + a7 + "</span>"
                        }
                    }
                    aO(bg, a9, aW.overrideTooltip.icon, aW.overrideTooltip.map, aW.overrideTooltip.spellData, a7, aW.overrideTooltip.image, aW.overrideTooltip.imageClass)
                } else {
                    e(aY, aX, aT, bg, bl)
                }
            }
            if (bi || !N()) {
                return b
            }
            var bb = $WowheadPower.getEntity(aY, an(aY, aX, bl), aT, bg);
            var bc = [];
            if ((g("renameLinks") && aW.getAttribute("data-wh-rename-link") !== "false") || aW.getAttribute("data-wh-rename-link") === "true") {
                bc.push(function () {
                    delete aW.dataset.whIconAdded;
                    aW.innerHTML = "<span>" + bb.data.name + "</span>"
                })
            }
            var bk = aW.getAttribute("data-wh-icon-size");
            if ((bk || g("iconizeLinks")) && ICONIZE_TYPES.indexOf(aY) !== -1) {
                if (!bk) {
                    bk = g("iconSize")
                }
                bc.push(function () {
                    if (bb.data.icon && aW.dataset.whIconAdded !== "true") {
                        ay(aW, bb.data, bk)
                    }
                })
            }
            if (g("colorLinks") && aY === s) {
                bc.push(function () {
                    ai(aW, ["q" + bb.data.quality])
                })
            }
            if (bc.length) {
                if (bb.status === J || bb.status === ab) {
                    bb.callbacks = bb.callbacks.concat(bc);
                    if (bb.status === J) {
                        aw(aY, aX, aT, bg, true, bl)
                    }
                } else {
                    if (bb.status === aj || bb.status === t) {
                        while (bc.length) {
                            bc.shift()()
                        }
                    }
                }
            }
            return b
        }

        function ay(aU, aV, aT) {
            if (!aT || typeof WH.Icon === "undefined" || !WH.Icon.isValidSize(aT)) {
                aT = "tiny"
            }
            var aW = aV.icon.toLocaleLowerCase();
            if (aT === "tiny") {
                ai(aU, ["icontinyl"]);
                if (aU.style.setProperty) {
                    aU.style.setProperty("padding-left", "18px", "important")
                } else {
                    aU.style.paddingLeft = "18px"
                }
                aU.style.verticalAlign = "center";
                aU.style.background = "url(" + WH.staticUrl + "/images/wow/icons/tiny/" + aW + ".gif) left center no-repeat"
            } else {
                if (aU.getAttribute("data-wh-icon-added") === "true") {
                    return
                }
                WH.aef(aU, WH.Icon.create(aW, aT, null, {span: true}))
            }
            aU.setAttribute("data-wh-icon-added", "true")
        }

        function C(aV) {
            aV = WH.normalizeEvent(aV);
            var aU = aV._target;
            var aT = 0;
            while (aU != null && aT < 5 && D(aU, aV) === aF) {
                aU = aU.parentNode;
                ++aT
            }
        }

        function n(aW) {
            aW = WH.normalizeEvent(aW);
            var aV = this;
            if (aV.hasWHTouchTooltip === true) {
                return
            }
            var aU = 0;
            var aT;
            while (aV != null && aU < 5 && (aT = D(aV, aW)) === aF) {
                aV = aV.parentNode;
                ++aU
            }
            if (aT === b) {
                if (aa !== null) {
                    aa.removeAttribute("data-showing-touch-tooltip");
                    aa.hasWHTouchTooltip = false
                }
                aa = aV;
                aa.hasWHTouchTooltip = true;
                if (aW.stopPropagation) {
                    aW.stopPropagation()
                }
                if (aW.preventDefault) {
                    aW.preventDefault()
                }
                return false
            }
        }

        function ax(aT) {
            aT = WH.normalizeEvent(aT);
            G(aT);
            WH.Tooltip.move(aq, ap, 0, 0, CURSOR_HSPACE, CURSOR_VSPACE)
        }

        function ac() {
            ag = null;
            am = null;
            WH.Tooltip.hide()
        }

        function af(aV) {
            if (!WH.isDev()) {
                return "https://" + aV + ".wowhead.com"
            }
            var aT = document.location.hostname.split(".");
            aT = aT[aT.length - 3];
            if (aV === "www") {
                aV = aT
            } else {
                aV = aV + "." + aT
            }
            var aU = "https://" + aV + ".wowhead.com";
            if (document.location.port !== "") {
                aU += ((document.location.port.indexOf(":") < 0) ? ":" : "") + document.location.port
            }
            if (document.location.protocol !== "https:") {
                aU = aU.replace(/^https:/, "http:")
            }
            return aU
        }

        function r(aU) {
            var aT = "tooltip";
            if (l && l.buff) {
                aT = "buff"
            }
            if (l && l.text) {
                aT = "text"
            }
            if (l && l.premium) {
                aT = "tooltip_premium"
            }
            return aT + (aU || "")
        }

        function aM() {
            return (l && l.text) ? "text_icon" : "icon"
        }

        function aS() {
            return (l && l.buff ? "buff" : "") + "spells"
        }

        function u(aT) {
            if (typeof aT === "undefined") {
                return "image_NONE"
            }
            return "image" + aT
        }

        function e(aY, aU, aV, a0, aW) {
            if (!aW) {
                aW = {}
            }
            var aZ = an(aY, aU, aW);
            ag = aY;
            z = aZ;
            P = aV;
            at = a0;
            l = aW;
            W.isLoaded(aY, aV);
            var aX = $WowheadPower.getEntity(aY, aZ, aV, a0);
            if (aX.status === aj || aX.status === d) {
                var a1 = aX.data[u(aW.image)];
                var a2 = aX.data["image" + aW.image + "_class"];
                var aT = F(aY, aU, aV);
                if (aT) {
                    a1 = aT[0];
                    a2 = aT[1]
                }
                aO(a0, aX.data[r()], aX.data[aM()], aX.data.map, aX.data[aS()], aX.data[r(2)], a1, a2)
            } else {
                if (aX.status === ab || aX.status === t) {
                    if (WH.inArray(STEALTH_TYPES, aY) == -1) {
                        aO(a0, c(a0, "loading"))
                    }
                } else {
                    aw(aY, aU, aV, a0, WH.inArray(STEALTH_TYPES, aY) != -1, aW)
                }
            }
        }

        function aw(a3, aU, aV, a6, a2, aW) {
            var a4 = an(a3, aU, aW);
            var aY = $WowheadPower.getEntity(a3, a4, aV, a6);
            if (aY.status !== J && aY.status !== az) {
                return
            }
            aY.status = ab;
            var a0 = aG(a3);
            if (a0 && (parseInt(aU, 10) < a0.min || parseInt(aU, 10) > a0.max)) {
                $WowheadPower.register(a3, aU, aV, a6, {error: "ID is out of range"});
                return
            }
            if (!a2) {
                aY.timer = setTimeout(R.bind(this, a3, a4, aV, a6), 333)
            }
            var a7 = [];
            for (var aZ in aW) {
                switch (aZ) {
                    case"spec":
                        if (a3 === ad || a3 === aI) {
                            break
                        }
                    case"abil":
                    case"artk":
                    case"azerite-essence-powers":
                    case"azerite-powers":
                    case"bonus":
                    case"dd":
                    case"ddsize":
                    case"diff":
                    case"diffnew":
                    case"ench":
                    case"gem1bonus":
                    case"gem1lvl":
                    case"gem2bonus":
                    case"gem2lvl":
                    case"gem3bonus":
                    case"gem3lvl":
                    case"gems":
                    case"ilvl":
                    case"level":
                    case"lvl":
                    case"nlc":
                    case"nomajor":
                    case"pvp":
                    case"q":
                    case"rand":
                    case"rank":
                    case"rewards":
                    case"sock":
                    case"tink":
                    case"transmog":
                    case"twcata":
                    case"twmists":
                    case"twtbc":
                    case"twwotlk":
                    case"upgd":
                        if (typeof aW[aZ] === "object") {
                            a7.push(aZ + "=" + aW[aZ].join(":"))
                        } else {
                            if (aW[aZ] === true) {
                                a7.push(aZ)
                            } else {
                                a7.push(aZ + "=" + aW[aZ])
                            }
                        }
                        break
                }
            }
            var aX = WH.getDomainFromLocale(a6);
            switch (aV) {
                case WH.dataEnv.MAIN:
                    break;
                case WH.dataEnv.BETA:
                    if (WH.BETA_DOMAIN) {
                        aX += (aX ? "." : "") + WH.BETA_DOMAIN;
                        break
                    }
                default:
                    aX += (aX ? "." : "") + WH.dataEnvTerm[aV]
            }
            if (!aX) {
                aX = "www"
            }
            var a1 = af(aX);
            if (aV === WH.dataEnv.PTR || aV === WH.dataEnv.BETA) {
                if (WH.getDataBuild(aV) !== "0") {
                    a7.push(WH.getDataBuild(aV))
                }
            }
            if (!W.isLoaded(a3, aV)) {
                W.fetch(a3, aV)
            }
            if (a3 == s && aW && aW.hasOwnProperty("lvl") && !W.isLoaded(ad, aV)) {
                W.fetch(ad, aV)
            }
            var aT = a7.length ? "?" + a7.join("&") : "";
            var a5 = a1 + "/tooltip/" + ak(a3) + "/" + aU + aT;
            //aU = id
            if (aU >= 50000) {
                a5 = 'api/index.php?url=customitems/get/i/' + aU;
            }

            WH.xhrJsonRequest(a5, (function (ba, bd, a9, bc, a8, bb) {
                if (!bb) {
                    WH.error("Wowhead tooltips failed to load data for " + ar(ba) + " #" + bd);
                    return
                } else {
                    if (bb.error) {
                        WH.error("Wowhead tooltip request responded with an error", bb.error, ar(ba) + " #" + bd)
                    }
                }
                $WowheadPower.register(ba, a9, bc, a8, bb)
            }).bind(null, a3, aU, a4, aV, a6))
        }

        function aO(bb, be, a1, bd, aT, bl, aV, a0) {
            au();
            if (!w) {
                return
            }
            if (am && am._fixTooltip) {
                be = am._fixTooltip(be, ag, z, am)
            }
            var bh = false;
            if (!be) {
                be = c(bb, "notFound").replace("%s", ar(ag));
                a1 = "inv_misc_questionmark";
                bh = true
            } else {
                if (l != null) {
                    if (WH.reforgeStats && l.forg && WH.reforgeStats[l.forg]) {
                        var aZ = WH.reforgeStats[l.forg];
                        var bu = [aZ.i1];
                        for (var br in WH.individualToGlobalStat) {
                            if (WH.individualToGlobalStat[br] == bu[0]) {
                                bu.push(br)
                            }
                        }
                        var bp;
                        if ((bp = be.match(new RegExp("(<!--(stat|rtg)(" + bu.join("|") + ")-->)[+-]?([0-9]+)"))) && !be.match(new RegExp("<!--(stat|rtg)" + aZ.i2 + "-->[+-]?[0-9]+"))) {
                            var bm = Math.floor(bp[4] * aZ.v), bk = aK.traits[aZ.s2][0];
                            if (aZ.i2 == 6) {
                                be = be.replace("<!--rs-->", "<br />+" + bm + " " + bk)
                            } else {
                                be = be.replace("<!--rr-->", WH.sprintfGlobal(aK.tooltip_genericrating, bk.toLowerCase(), aZ.i2, bm))
                            }
                            be = be.replace(bp[0], bp[1] + (bp[4] - bm));
                            be = be.replace("<!--rf-->", '<span class="q2">' + WH.sprintfGlobal(aK.tooltip_reforged, bm, aK.traits[aZ.s1][2], aK.traits[aZ.s2][2]) + "</span><br />")
                        }
                    }
                    if (l.pcs && l.pcs.length) {
                        var bo = 0;
                        for (var br = 0, a5 = l.pcs.length; br < a5; ++br) {
                            var bp;
                            var ba = new RegExp("<span><!--si([0-9]+:)*" + l.pcs[br] + '(:[0-9]+)*--><a href="/??item=(\\d+)">(.+?)</a></span>');
                            if (bp = be.match(ba)) {
                                var bt = !isNaN(parseInt(at)) ? o[at] : "enus";
                                var a3 = (WH.isSet("g_items") && g_items[l.pcs[br]]) ? g_items[l.pcs[br]]["name_" + bt] : bp[4];
                                var aX = '<a href="/item=' + bp[3] + '">' + a3 + "</a>";
                                var a9 = '<span class="q13"><!--si' + l.pcs[br] + "-->" + aX + "</span>";
                                be = be.replace(bp[0], a9);
                                ++bo
                            }
                        }
                        if (bo > 0) {
                            be = be.replace("(0/", "(" + bo + "/");
                            be = be.replace(new RegExp("<span>\\(([0-" + bo + "])\\)", "g"), '<span class="q2">($1)')
                        }
                    }
                    if (l.know && l.know.length) {
                        be = WH.setTooltipSpells(be, l.know, aT)
                    }
                    if (l.lvl && !l.ilvl) {
                        be = WH.setTooltipLevel(be, (l.lvl ? l.lvl : WH.maxLevel), l.buff)
                    }
                    if (l.who && l.when) {
                        be = be.replace("<table><tr><td><br />", '<table><tr><td><br /><span class="q2">' + WH.sprintf(c(bb, "achievementComplete"), l.who, l.when.getMonth() + 1, l.when.getDate(), l.when.getFullYear()) + "</span><br /><br />");
                        be = be.replace(/class="q0"/g, 'class="r3"')
                    }
                    if (l.notip && aV) {
                        be = "";
                        a1 = null
                    }
                    if ((ag == TYPE_PETABILITY) && l.pwr) {
                        be = be.replace(/<!--sca-->(\d+)<!--sca-->/g, function (bv, bw) {
                            return Math.floor(parseInt(bw) * (1 + 0.05 * l.pwr))
                        })
                    }
                    if ((ag == U) && l.cri) {
                        for (var br = 0; br < l.cri.length; br++) {
                            be = be.replace(new RegExp("<!--cr" + parseInt(l.cri[br]) + ":[^<]+", "g"), '<span class="q2">$&</span>')
                        }
                    }
                }
            }
            if (!aN && WH.isSet("g_user") && ((WH.isRetailTree(P) && ("lists" in g_user) && WH.isSet("g_completion")) || (WH.isClassicTree(P) && g_user.characterProfiles && g_user.characterProfiles.length))) {
                var aY = "";
                var aU = (WH.isRetailTree(P) && (ag in g_types) && (g_types[ag] in g_completion)) ? g_completion[g_types[ag]] : false;
                var a4 = $WowheadPower.getEntity(ag, z);
                if (aU && (ag == aD)) {
                    if (bh || be === c(bb, "loading") || (a4.hasOwnProperty("worldquesttype") && a4.worldquesttype != 0) || (a4.hasOwnProperty("daily") && a4.daily != 0) || (a4.hasOwnProperty("weekly") && a4.weekly != 0)) {
                        aU = false
                    }
                }
                var bg = !(aU && (ag in g_completion_categories) && WH.inArray(g_completion_categories[ag], a4.completion_category) === -1);
                var bf = /^-?\d+(?:\.\d+)?/.exec(z);
                bf = (bf && bf.length) ? bf[0] : z;
                if (aU) {
                    for (var bs in g_user.lists) {
                        var bq = g_user.lists[bs];
                        if (!(bq.id in aU)) {
                            continue
                        }
                        var a6 = (WH.inArray(aU[bq.id], bf) != -1);
                        if (!a6 && !bg) {
                            continue
                        }
                        aY += '<br><span class="progress-icon ' + (a6 ? "progress-8" : "progress-0") + '"></span> ';
                        aY += bq.character + " - " + bq.realm + " " + bq.region
                    }
                }
                if (WH.isClassicTree(P) && ag === aD) {
                    for (var aW, br = 0; aW = g_user.characterProfiles[br]; br++) {
                        var a6 = (WH.inArray(aW.quests, bf) != -1);
                        if (!a6 && !bg) {
                            continue
                        }
                        aY += '<br><span class="progress-icon ' + (a6 ? "progress-8" : "progress-0");
                        aY += '"></span> ' + aW.name + " - " + aW.realm
                    }
                }
                if (aY != "") {
                    be += '<br><span class="q">' + window.LANG.completion + ":</span>" + aY
                }
            }
            if (!K && ag == s && WH.isSet("g_completion") && ("bagscans" in g_completion) && WH.isRetailTree(P)) {
                var a7 = /^\d+/.exec(z);
                if (a7) {
                    a7 = a7[0]
                } else {
                    a7 = -1
                }
                var bn = [];
                for (var bc in g_completion.bagscans) {
                    bn.push(bc)
                }
                var bj = "";
                while (bc = bn.pop()) {
                    if (g_completion.bagscans[bc].items.hasOwnProperty(a7)) {
                        bj += '<tr><td class="q2" style="text-align: right">' + g_completion.bagscans[bc].items[a7] + '&nbsp;</td><td style="white-space: nowrap">' + g_completion.bagscans[bc].name + "</td></tr>"
                    }
                }
                if (bj != "") {
                    be += '<br><span class="q">' + window.LANG.tooltip_bagscanner + "</span><br><table>" + bj + "</table>"
                }
            }
            if (!K && ag == TYPE_TRANSMOGSET && typeof WH.getPreferredTransmogRace !== "undefined") {
                var a2 = WH.getPreferredTransmogRace();
                be = be.replace(/\/modelviewer\/([^\/]+)\/webthumbs\/transmog\/\d+\/\d+\//g, "/modelviewer/$1/webthumbs/transmog/" + a2.race + "/" + (a2.gender - 1) + "/")
            }
            if (!K && be && (l.diff || l.diffnew || l.noimage)) {
                aV = "";
                a0 = ""
            }
            be = be.replace("http://", "https://");
            if (l.map && bd && bd.getMap) {
                bl = bd.getMap()
            }
            var bi = function (bx, bv) {
                if (ag !== bx.type || z !== bx.id || P !== bx.dataEnv || at !== bx.locale || l !== bx.params) {
                    return
                }
                switch (al) {
                    case aA.screen:
                        WH.Tooltip.showInScreen(am, bv, null, bl, aV, a0, a1);
                        break;
                    case aA.attachToIcon:
                    case aA.attach:
                        var bw = WH.isElementFixedPosition(am);
                        WH.Tooltip.setIcon(al === aA.attachToIcon ? null : a1, bw);
                        WH.Tooltip.show(am, bv, null, null, null, bl, aV, a0, bw);
                        break;
                    case aA.attachWithoutScreenshot:
                        var bw = WH.isElementFixedPosition(am);
                        WH.Tooltip.setIcon(a1, bw);
                        WH.Tooltip.show(am, bv, null, null, null, bl, null, null, bw);
                        break;
                    case aA.floatWithoutIcon:
                        var bw = WH.isElementFixedPosition(am);
                        WH.Tooltip.setIcon(null, bw);
                        WH.Tooltip.showAtXY(bv, aq, ap, CURSOR_HSPACE, CURSOR_VSPACE, bl, aV, a0, bw);
                        break;
                    case aA["float"]:
                    default:
                        var bw = WH.isElementFixedPosition(am);
                        WH.Tooltip.setIcon(a1, bw);
                        WH.Tooltip.showAtXY(bv, aq, ap, CURSOR_HSPACE, CURSOR_VSPACE, bl, aV, a0, bw)
                }
                if (K && WH.Tooltip.logo) {
                    WH.Tooltip.logo.style.display = (y ? "block" : "none")
                }
            };
            var a8 = {type: ag, id: z, dataEnv: P, locale: at, params: l};
            aH(be, aT, bi.bind(this, a8), a8)
        }

        function aH(aU, aV, aX, aW) {
            switch (aW.type) {
                case aI:
                    var aT = $WowheadPower.getEntity(aW.type, aW.id, aW.dataEnv, aW.locale);
                    if (aW.params.spec && !(aW.params.know && aW.params.know.length)) {
                        W.getSpellsBySpec(aW.params.spec, function (aY) {
                            aU = aU.replace(/<!--embed:([^>]+)-->/g, function (aZ, a0) {
                                return WH.setTooltipSpells(aT.data.embeds[a0].tooltip, aY, aT.data.embeds[a0].spells)
                            });
                            aX(aU)
                        });
                        break
                    } else {
                        aU = aU.replace(/<!--embed:([^>]+)-->/g, function (aY, aZ) {
                            return WH.setTooltipSpells(aT.data.embeds[aZ].tooltip, aW.params.know, aT.data.embeds[aZ].spells)
                        })
                    }
                    window.requestAnimationFrame(aX.bind(null, aU));
                    break;
                case ad:
                    if (aW.params.spec && !(aW.params.know && aW.params.know.length)) {
                        W.getSpellsBySpec(aW.params.spec, function (aY) {
                            aU = WH.setTooltipSpells(aU, aY, aV);
                            aX(aU)
                        });
                        break
                    }
                    window.requestAnimationFrame(aX.bind(null, aU));
                    break;
                default:
                    window.requestAnimationFrame(aX.bind(null, aU))
            }
        }

        function R(aV, aX, aW, aT) {
            if (ag == aV && z == aX && P == aW && at == aT) {
                aO(aT, c(aT, "loading"));
                var aU = $WowheadPower.getEntity(aV, aX, aW, aT);
                aU.timer = setTimeout(L.bind(this, aV, aX, aW, aT), 3850)
            }
        }

        function L(aV, aX, aW, aT) {
            var aU = $WowheadPower.getEntity(aV, aX, aW, aT);
            aU.status = az;
            if (ag == aV && z == aX && P == aW && at == aT) {
                aO(aT, c(aT, "noResponse"))
            }
        }

        function an(aT, aV, aU) {
            return aV + (aU.rand ? "r" + aU.rand : "") + (aU.ench ? "e" + aU.ench : "") + (aU.gems ? "g" + aU.gems.join(",") : "") + (aU.sock ? "s" : "") + (aU.upgd ? "u" + aU.upgd : "") + (aU.twtbc ? "twtbc" : "") + (aU.twwotlk ? "twwotlk" : "") + (aU.twcata ? "twcata" : "") + (aU.twmists ? "twmists" : "") + (aU.ilvl ? "ilvl" + aU.ilvl : "") + (aU.lvl ? "lvl" + aU.lvl : "") + (aU.gem1lvl ? "g1lvl" + aU.gem1lvl : "") + (aU.gem2lvl ? "g2lvl" + aU.gem2lvl : "") + (aU.gem3lvl ? "g3lvl" + aU.gem3lvl : "") + (aU.artk ? "ak" + aU.artk : "") + (aU.nlc ? "nlc" + aU.nlc : "") + (aU.transmog ? "transmog" + aU.transmog : "") + (aU.tink ? "tink" + aU.tink : "") + (aU.pvp ? "pvp" : "") + (aU.bonus ? "b" + aU.bonus.join(",") : "") + (aU.gem1bonus ? "g1b" + aU.gem1bonus.join(",") : "") + (aU.gem2bonus ? "g2b" + aU.gem2bonus.join(",") : "") + (aU.gem3bonus ? "g3b" + aU.gem3bonus.join(",") : "") + (aU.q ? "q" + aU.q : "") + (aU.level ? "level" + aU.level : "") + (aU.abil ? "abil" + aU.abil.join(",") : "") + (aU.dd ? "dd" + aU.dd : "") + (aU.ddsize ? "ddsize" + aU.ddsize : "") + (aU.diff == ad ? "diff" + aU.diff : "") + (aU.rank ? "rank" + aU.rank : "") + (aT !== ad && aU.spec ? "spec" + aU.spec : "") + (aU.rewards ? "rewards" + aU.rewards.join(":") : "") + (aU["azerite-powers"] ? "azPowers" + aU["azerite-powers"] : "") + (aU["azerite-essence-powers"] ? "aePowers" + aU["azerite-essence-powers"] : "") + (aU.nomajor ? "nomajor" : "")
        }

        this.clearTouchTooltip = function (aV) {
            if (aa) {
                if (aV !== true) {
                    aa.removeAttribute("data-showing-touch-tooltip")
                }
                aa.hasWHTouchTooltip = false
            }
            aa = null;
            if (aV !== true && document.querySelectorAll) {
                var aT = document.querySelectorAll("[data-showing-touch-tooltip]");
                if (aT && aT.length) {
                    for (var aW = 0, aU; aU = aT[aW]; aW++) {
                        aU.removeAttribute("data-showing-touch-tooltip")
                    }
                }
            }
            if (WH.Tooltip.screen) {
                WH.Tooltip.screenInnerWrapper.scrollTop = 0;
                WH.Tooltip.screenInnerWrapper.scrollLeft = 0;
                WH.Tooltip.screen.style.display = "none";
                WH.Tooltip.mobileTooltipShown = false
            }
            WH.Tooltip.hide();
            $WowheadPower.setParent()
        };

        function F(aU, aW, aV) {
            if (K) {
                return false
            }
            if (!WH.User.isPremium()) {
                return false
            }
            if (WH.Tooltip.hideScreenshots) {
                return false
            }
            var aT = WH.Gatherer.get(aU, aW, aV, true);
            if (aT && aT.screenshot) {
                return [WH.getScreenshotUrl(aT.screenshot.id, "small", {imageType: aT.screenshot.imageType}), "screenshot"]
            }
            return false
        }

        this.register = function (a0, aU, aV, a1, aZ) {
            var aY = this.getEntity(a0, aU, aV, a1);
            if (aZ.hasOwnProperty("additionalIds")) {
                var aW = aZ.additionalIds;
                delete aZ.additionalIds;
                if (aW.length) {
                    for (var a2 = 0; a2 < aW.length; a2++) {
                        this.register(a0, aW[a2], aV, a1, aZ)
                    }
                }
            }
            if (!W.isLoaded(a0, aV)) {
                aY.status = t;
                W.registerCallback(a0, aV, this.register.bind(this, a0, aU, aV, a1, aZ));
                return
            }
            if ((typeof aU === "string" && (aU.indexOf("lvl") === 0 || aU.match(/[^i]lvl/))) && !W.isLoaded(ad, aV)) {
                aY.status = t;
                W.registerCallback(ad, aV, this.register.bind(this, a0, aU, aV, a1, aZ));
                return
            }
            if (aY.timer) {
                clearTimeout(aY.timer);
                delete aY.timer
            }
            if (!WH.wowheadRemote && aZ.map) {
                if (aY.data.map == null) {
                    aY.data.map = new Mapper({parent: WH.ce("div"), zoom: 3, zoomable: false, buttons: false})
                }
                aY.data.map.update(aZ.map);
                delete aZ.map
            }
            for (var aX in aZ) {
                if (!aZ.hasOwnProperty(aX)) {
                    continue
                }
                aY.data[aX] = aZ[aX]
            }
            switch (aY.status) {
                case ab:
                case t:
                case J:
                    if (aY.data[r()]) {
                        aY.status = aj
                    } else {
                        aY.status = d
                    }
            }
            if (WH.Tooltip.showingTooltip && ag == a0 && z == aU && P == aV && at == a1) {
                var a3 = aY.data[u(l.image)];
                var a4 = aY.data["image" + l.image + "_class"];
                var aT = F(a0, aU, aV);
                if (aT) {
                    a3 = aT[0];
                    a4 = aT[1]
                }
                aO(a1, aY.data[r()], aY.data.icon, aY.data.map, aY.data[aS()], aY.data[r(2)], a3, a4)
            }
            while (aY.callbacks.length) {
                aY.callbacks.shift()()
            }
        };
        this.request = function (aV, aY, aX, aT, aW) {
            if (!aW) {
                aW = {}
            }
            if (aT === undefined) {
                aT = V.getId()
            }
            if (!aX) {
                aX = WH.getDataEnv()
            }
            var aU = an(aV, aY, aW);
            this.getEntity(aV, aU, aX, aT);
            aw(aV, aY, aX, aT, true, aW)
        };
        this.triggerTooltip = function (aU, aT) {
            D(aU, aT || {target: aU})
        };
        this.refreshLinks = function (aU) {
            if (aU === true || g("renameLinks") || g("colorLinks") || g("iconizeLinks")) {
                var aT = WH.isTouch();
                for (var aV = 0; aV < document.links.length; aV++) {
                    var aX = document.links[aV];
                    var aW = aX.parentNode;
                    var aY = false;
                    while (aW != null) {
                        if ((" " + aW.className + " ").replace(/[\n\t]/g, " ").indexOf(" wowhead-tooltip ") > -1) {
                            aY = true;
                            break
                        }
                        aW = aW.parentNode
                    }
                    if (!aY) {
                        D(aX);
                        if (aT) {
                            ah(aX)
                        }
                    }
                }
            }
            this.hideTooltip()
        };
        this.setParent = function (aT) {
            WH.Tooltip.reset();
            WH.Tooltip.prepare(aT, WH.isElementFixedPosition(aT))
        };
        this.replaceWithTooltip = function (a3, aZ, aU, aV, a1, aW) {
            if (!aW) {
                aW = {}
            }
            if (a1 === undefined) {
                a1 = V.getId()
            }
            if (!aV) {
                aV = WH.getDataEnv()
            }
            if (typeof a3 == "string") {
                a3 = document.getElementById(a3)
            }
            if (!a3) {
                return false
            }
            var a0 = an(aZ, aU, aW);
            var aX = this.getEntity(aZ, a0, aV, a1);
            switch (aX.status) {
                case aj:
                    if (!a3.parentNode) {
                        return true
                    }
                    while (a3.hasChildNodes()) {
                        a3.removeChild(a3.firstChild)
                    }
                    var aT = ["wowhead-tooltip-inline"];
                    if (aX.data.icon) {
                        aT.push("wowhead-tooltip-inline-icon")
                    }
                    ai(a3, aT);
                    var aY = aX.data[r()];
                    var a2 = function (a4) {
                        WH.Tooltip.append(a3, a4, true, aX.data.icon)
                    };
                    aH(aY, aX.data[aS()], a2, {type: aZ, id: aU, dataEnv: aV, locale: a1, params: aW});
                    return true;
                case ab:
                case J:
                    aX.callbacks.push(this.replaceWithTooltip.bind(this, a3, aZ, aU, aV, a1, aW));
                    this.request(aZ, aU, aV, a1, aW);
                    return true
            }
            return false
        };
        if (K) {
            this.set = function (aT) {
                WH.cO(av, aT)
            };
            this.showTooltip = function (aV, aU, aT) {
                G(aV);
                aO(0, aU, aT)
            };
            this.hideTooltip = function () {
                if (typeof WH === "undefined" || typeof WH.Tooltip === "undefined" || typeof WH.Tooltip.hide !== "function") {
                    return
                }
                WH.Tooltip.hide()
            };
            this.moveTooltip = function (aT) {
                ax(aT)
            }
        } else {
            this.disableCompletion = function () {
                aN = true
            }
        }
        ao()
    }
}
;
