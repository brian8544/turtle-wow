function Mapper(C, D) {
    cO(this, C);
    if (this.parent) {
        this.parent = $(this.parent)
    } else {
        return
    }
    var B;
    this.mouseX = this.mouseY = 0;
    this.editable = this.editable || false;
    if (this.editable) {
        this.zoomable = this.toggle = false;
        this.show = this.mouse = true
    } else {
        this.zoomable = (this.zoomable == null ? true : this.zoomable);
        this.toggle = (this.toggle == null ? true : this.toggle);
        this.show = (this.show == null ? true : this.show);
        this.mouse = (this.mouse == null ? false : this.mouse)
    }
    this.zoneLink = (this.zoneLink == null ? true : this.zoneLink);
    if (location.href.indexOf("zone=") != -1) {
        this.zoneLink = false
    }
    this.zoom = (this.zoom == null ? 0 : this.zoom);
    this.zone = (this.zone == null ? 0 : this.zone);
    this.locale = (this.locale == null ? "enus" : this.locale);
    this.pins = [];
    this.nCoords = 0;
    this.parent.className = "mapper";
    this.parent.appendChild(this.span = ce("span"));
    B = this.span.style;
    B.display = "block";
    B.position = "relative";
    ns(this.span);
    if (this.editable) {
        this.span.onmouseup = this.addPin.bind(this);
        B = g_createGlow(LANG.mapper_tippin);
        B.style.fontSize = "11px";
        B.style.position = "absolute";
        B.style.bottom = B.style.right = "0";
        ns(B);
        this.parent.appendChild(B)
    } else {
        this.sToggle = B = g_createGlow(LANG.mapper_hidepins);
        B.style.position = "absolute";
        B.style.top = B.style.right = "0";
        B.onclick = this.toggleShow.bind(this);
        B.style.display = "none";
        ns(B);
        this.parent.appendChild(B)
    }
    if (this.zoomable) {
        this.span.onclick = this.toggleZoom.bind(this);
        this.sZoom = B = g_createGlow(LANG.mapper_tipzoom);
        B.style.fontSize = "11px";
        B.style.position = "absolute";
        B.style.bottom = B.style.right = "0";
        ns(B);
        this.span.appendChild(B)
    }
    if (this.zoneLink) {
        this.sZoneLink = B = g_createGlow("zone link");
        var E = B.childNodes[4];
        var A = ce("a");
        A.href = "?zones";
        ae(A, ct(E.firstChild.nodeValue));
        de(E.firstChild);
        ae(E, A);
        B.style.display = "none";
        B.style.position = "absolute";
        B.style.top = B.style.left = "0";
        this.parent.appendChild(B)
    }
    if (this.mouse) {
        this.parent.onmouseout = (function () {
            this.timeout = setTimeout((function () {
                this.sMouse.style.display = "none"
            }).bind(this), 1)
        }).bind(this);
        this.parent.onmouseover = (function () {
            clearTimeout(this.timeout);
            this.sMouse.style.display = ""
        }).bind(this);
        this.span.onmousemove = this.span.onmousedown = this.getMousePos.bind(this);
        this.sMouse = B = g_createGlow("(0.0, 0.0)");
        B.style.display = "none";
        B.style.position = "absolute";
        B.style.bottom = B.style.left = "0";
        B.onmouseup = sp;
        ns(B);
        this.span.appendChild(B)
    }
    this.pinBag = B = ce("div");
    ae(this.span, this.pinBag);
    if (C.coords != null) {
        this.setCoords(C.coords)
    } else {
        if (C.link != null) {
            this.setLink(C.link)
        }
    }
    this.updateMap(D)
}
Mapper.sizes = [[488, 325, "normal"], [772, 515, "zoom"]];
Mapper.prototype = {
    update: function (A, B) {
        if (A.zoom != null) {
            this.zoom = A.zoom
        }
        if (A.zone != null) {
            this.zone = A.zone
        }
        if (A.locale != null) {
            this.locale = A.locale
        }
        if (A.show != null) {
            this.show = A.show
        }
        if (A.coords != null) {
            this.setCoords(A.coords)
        } else {
            if (A.link != null) {
                this.setLink(A.link)
            }
        }
        this.updateMap(B)
    },
    getZone: function () {
        return this.zone
    },
    setZone: function (A, B) {
        this.zone = A;
        this.updateMap(B);
        return true
    },
    getLocale: function () {
        return this.locale
    },
    setLocale: function (A, B) {
        this.locale = A;
        this.updateMap(B)
    },
    getZoom: function () {
        return this.zoom
    },
    setZoom: function (A, B) {
        this.zoom = A;
        this.updateMap(B)
    },
    toggleZoom: function (A) {
        this.zoom = 1 - this.zoom;
        this.updateMap();
        this.getMousePos(A);
        if (this.sZoom) {
            this.sZoom.style.display = "none";
            this.sZoom = null
        }
    },
    getShow: function () {
        return this.show
    },
    setShow: function (A) {
        this.show = A;
        var B = this.show ? "" : "none";
        this.pinBag.style.display = B;
        g_setTextNodes(this.sToggle, (this.show ? LANG.mapper_hidepins : LANG.mapper_showpins))
    },
    toggleShow: function () {
        this.setShow(!this.show)
    },
    getCoords: function () {
        var A = [];
        for (var B in this.pins) {
            if (!this.pins[B].free) {
                A.push([this.pins[B].x, this.pins[B].y])
            }
        }
        return A
    },
    setCoords: function (D) {
        var A;
        for (var C in this.pins) {
            this.pins[C].style.display = "none";
            this.pins[C].free = true
        }
        this.nCoords = D.length;
        for (var C in D) {
            var E = D[C];
            var B = E[2];
            A = this.getPin();
            A.x = E[0];
            A.y = E[1];
            A.style.left = A.x + "%";
            A.style.top = A.y + "%";
            if (this.editable) {
                A.a.onmouseup = this.delPin.bind(this, A)
            } else {
                if (B && B.url) {
                    A.a.href = B.url;
                    A.a.style.cursor = "pointer"
                }
            }
            if (B && B.label) {
                A.a.tt = B.label
            } else {
                A.a.tt = "$"
            }
            if (B && B.type) {
                A.className += " pin-" + B.type
            }
            A.a.tt = str_replace(A.a.tt, "$", A.x.toFixed(1) + ", " + A.y.toFixed(1))
        }
        this.onPinUpdate && this.onPinUpdate(this)
    },
    getLink: function () {
        var B = "";
        for (var A in this.pins) {
            if (!this.pins[A].free) {
                B += (this.pins[A].x < 10 ? "0" : "") + (this.pins[A].x * 10).toFixed(0) + (this.pins[A].y < 10 ? "0" : "") + (this.pins[A].y * 10).toFixed(0)
            }
        }
        return (this.zone ? this.zone : "") + (B ? ":" + B : "")
    },
    setLink: function (D) {
        var B = [];
        D = D.split(":");
        if (!this.setZone(D[0])) {
            return false
        }
        if (D.length == 2) {
            for (var C = 0; C < D[1].length; C += 6) {
                var A = D[1].substr(C, 3) / 10;
                var E = D[1].substr(C + 3, 3) / 10;
                if (isNaN(A) || isNaN(E)) {
                    break
                }
                B.push([A, E])
            }
        }
        this.setCoords(B);
        return true
    },
    updateMap: function (C) {
        this.parent.style.width = this.span.style.width = Mapper.sizes[this.zoom][0] + "px";
        this.parent.style.height = this.span.style.height = Mapper.sizes[this.zoom][1] + "px";
        if (!this.editable) {
            // this.parent.style.cssFloat = this.parent.style.styleFloat = "left"
        }
        if (this.zone == "0") {
            this.span.style.background = "black"
        } else {
            this.span.style.background = "url(images/maps/" + this.locale + "/" + Mapper.sizes[this.zoom][2] + "/" + this.zone + ".jpg)"
        }
        if (this.zoneLink) {
            var A = parseInt(this.zone);
            var B = g_zones[A] != null;
            if (B) {
                g_setTextNodes(this.sZoneLink, g_zones[A]);
                this.sZoneLink.childNodes[4].firstChild.href = "?zone=" + A
            }
            this.sZoneLink.style.display = B ? "" : "none"
        }
        if (this.sToggle) {
            this.sToggle.style.display = (this.toggle && this.nCoords ? "" : "none")
        }
        if (!C) {
            g_scrollTo(this.parent, 3)
        }
        this.onMapUpdate && this.onMapUpdate(this)
    },
    cleanPin: function (B) {
        var A = this.pins[B];
        A.style.display = "";
        A.free = false;
        A.className = "pin";
        A.a.onmousedown = rf;
        A.a.onmouseup = rf;
        A.a.href = "javascript:;";
        A.a.style.cursor = "default";
        return A
    },
    getPin: function () {
        for (var C = 0; C < this.pins.length; ++C) {
            if (this.pins[C].free) {
                return this.cleanPin(C)
            }
        }
        var B = ce("div"),
            A = ce("a");
        B.className = "pin";
        B.appendChild(A);
        B.a = A;
        A.onmouseover = this.pinOver;
        A.onmouseout = Tooltip.hide;
        A.onclick = sp;
        this.pins.push(B);
        this.cleanPin(this.pins.length - 1);
        ae(this.pinBag, B);
        return B
    },
    addPin: function (B) {
        B = $E(B);
        if (B._button >= 2) {
            return
        }
        this.getMousePos(B);
        var A = this.getPin();
        A.x = this.mouseX;
        A.y = this.mouseY;
        A.style.left = A.x.toFixed(1) + "%";
        A.style.top = A.y.toFixed(1) + "%";
        A.a.onmouseup = this.delPin.bind(this, A);
        A.a.tt = A.x.toFixed(1) + ", " + A.y.toFixed(1);
        this.onPinUpdate && this.onPinUpdate(this);
        return false
    },
    delPin: function (A, B) {
        B = $E(B);
        A.style.display = "none";
        A.free = true;
        sp(B);
        this.onPinUpdate && this.onPinUpdate(this);
        return
    },
    pinOver: function () {
        Tooltip.show(this, this.tt, 4, 0)
    },
    getMousePos: function (B) {
        B = $E(B);
        var C = ac(this.parent);
        var A = g_getScroll();
        this.mouseX = Math.floor((B.clientX + A.x - C[0] - 3) / Mapper.sizes[this.zoom][0] * 1000) / 10;
        this.mouseY = Math.floor((B.clientY + A.y - C[1] - 3) / Mapper.sizes[this.zoom][1] * 1000) / 10;
        if (this.mouseX < 0) {
            this.mouseX = 0
        } else {
            if (this.mouseX > 100) {
                this.mouseX = 100
            }
        }
        if (this.mouseY < 0) {
            this.mouseY = 0
        } else {
            if (this.mouseY > 100) {
                this.mouseY = 100
            }
        }
        if (this.mouse) {
            g_setTextNodes(this.sMouse, "(" + this.mouseX.toFixed(1) + ", " + this.mouseY.toFixed(1) + ")")
        }
    }
};

function ma_initShowOnMap() {
    var D = ge("lenrlkn4");
    var A = ce("select");
    var C = ce("option");
    C.value = "";
    C.style.color = "#bbbbbb";
    ae(C, ct(LANG.showonmap));
    ae(A, C);
    if (showOnMap.qg_alliance || showOnMap.qg_horde) {
        var B = ce("optgroup", {
            label: LANG.som_questgivers
        });
        if (showOnMap.qg_alliance) {
            ae(B, ce("option", {
                value: "qg_alliance",
                innerHTML: g_sides[1] + sprintf(LANG.qty, showOnMap.qg_alliance.count)
            }))
        }
        if (showOnMap.qg_horde) {
            ae(B, ce("option", {
                value: "qg_horde",
                innerHTML: g_sides[2] + sprintf(LANG.qty, showOnMap.qg_horde.count)
            }))
        }
        ae(A, B)
    }
    A.onchange = A.onkeyup = function () {
        var E = this.options[this.selectedIndex].value;
        myMapper.update({
            zone: g_pageInfo.id,
            coords: E ? showOnMap[E].coords : []
        })
    };
    ae(D, A)
};
