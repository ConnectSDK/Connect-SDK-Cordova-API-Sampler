
// version.js
enyo && enyo.version && (enyo.version.layout = "2.4.0-pre.1");

// contextual/source/ContextualLayout.js
enyo.kind({
    name: "enyo.ContextualLayout",
    kind: "Layout",
    adjustPosition: function() {
        if (this.container.showing && this.container.hasNode()) {
            this.resetPositioning();
            var t = this.getViewWidth(), i = this.getViewHeight(), o = this.container.vertFlushMargin, s = i - this.container.vertFlushMargin, e = this.container.horizFlushMargin, n = t - this.container.horizFlushMargin;
            if (o > this.offset.top + this.offset.height || this.offset.top > s) {
                if (this.applyVerticalFlushPositioning(e, n)) return;
                if (this.applyHorizontalFlushPositioning(e, n)) return;
                if (this.applyVerticalPositioning()) return;
            } else if ((e > this.offset.left + this.offset.width || this.offset.left > n) && this.applyHorizontalPositioning()) return;
            var h = this.getBoundingRect(this.container.node);
            if (h.width > this.container.widePopup) {
                if (this.applyVerticalPositioning()) return;
            } else if (h.height > this.container.longPopup && this.applyHorizontalPositioning()) return;
            if (this.applyVerticalPositioning()) return;
            if (this.applyHorizontalPositioning()) return;
        }
    },
    initVerticalPositioning: function() {
        this.resetPositioning(), this.container.addClass("vertical");
        var t = this.getBoundingRect(this.container.node), i = this.getViewHeight();
        return this.container.floating ? i / 2 > this.offset.top ? (this.applyPosition({
            top: this.offset.top + this.offset.height,
            bottom: "auto"
        }), this.container.addClass("below")) : (this.applyPosition({
            top: this.offset.top - t.height,
            bottom: "auto"
        }), this.container.addClass("above")) : t.top + t.height > i && i - t.bottom < t.top - t.height ? this.container.addClass("above") : this.container.addClass("below"), 
        t = this.getBoundingRect(this.container.node), t.top + t.height > i || 0 > t.top ? !1 : !0;
    },
    applyVerticalPositioning: function() {
        if (!this.initVerticalPositioning()) return !1;
        var t = this.getBoundingRect(this.container.node), i = this.getViewWidth();
        if (this.container.floating) {
            var o = this.offset.left + this.offset.width / 2 - t.width / 2;
            o + t.width > i ? (this.applyPosition({
                left: this.offset.left + this.offset.width - t.width
            }), this.container.addClass("left")) : 0 > o ? (this.applyPosition({
                left: this.offset.left
            }), this.container.addClass("right")) : this.applyPosition({
                left: o
            });
        } else {
            var s = this.offset.left + this.offset.width / 2 - t.left - t.width / 2;
            t.right + s > i ? (this.applyPosition({
                left: this.offset.left + this.offset.width - t.right
            }), this.container.addRemoveClass("left", !0)) : 0 > t.left + s ? this.container.addRemoveClass("right", !0) : this.applyPosition({
                left: s
            });
        }
        return !0;
    },
    applyVerticalFlushPositioning: function(t, i) {
        if (!this.initVerticalPositioning()) return !1;
        var o = this.getBoundingRect(this.container.node), s = this.getViewWidth();
        return t > this.offset.left + this.offset.width / 2 ? (this.offset.left + this.offset.width / 2 < this.container.horizBuffer ? this.applyPosition({
            left: this.container.horizBuffer + (this.container.floating ? 0 : -o.left)
        }) : this.applyPosition({
            left: this.offset.width / 2 + (this.container.floating ? this.offset.left : 0)
        }), this.container.addClass("right"), this.container.addClass("corner"), !0) : this.offset.left + this.offset.width / 2 > i ? (this.offset.left + this.offset.width / 2 > s - this.container.horizBuffer ? this.applyPosition({
            left: s - this.container.horizBuffer - o.right
        }) : this.applyPosition({
            left: this.offset.left + this.offset.width / 2 - o.right
        }), this.container.addClass("left"), this.container.addClass("corner"), !0) : !1;
    },
    initHorizontalPositioning: function() {
        this.resetPositioning();
        var t = this.getBoundingRect(this.container.node), i = this.getViewWidth();
        return this.container.floating ? i / 2 > this.offset.left + this.offset.width ? (this.applyPosition({
            left: this.offset.left + this.offset.width
        }), this.container.addRemoveClass("left", !0)) : (this.applyPosition({
            left: this.offset.left - t.width
        }), this.container.addRemoveClass("right", !0)) : this.offset.left - t.width > 0 ? (this.applyPosition({
            left: this.offset.left - t.left - t.width
        }), this.container.addRemoveClass("right", !0)) : (this.applyPosition({
            left: this.offset.width
        }), this.container.addRemoveClass("left", !0)), this.container.addRemoveClass("horizontal", !0), 
        t = this.getBoundingRect(this.container.node), 0 > t.left || t.left + t.width > i ? !1 : !0;
    },
    applyHorizontalPositioning: function() {
        if (!this.initHorizontalPositioning()) return !1;
        var t = this.getBoundingRect(this.container.node), i = this.getViewHeight(), o = this.offset.top + this.offset.height / 2;
        return this.container.floating ? o >= i / 2 - .05 * i && i / 2 + .05 * i >= o ? this.applyPosition({
            top: this.offset.top + this.offset.height / 2 - t.height / 2,
            bottom: "auto"
        }) : i / 2 > this.offset.top + this.offset.height ? (this.applyPosition({
            top: this.offset.top,
            bottom: "auto"
        }), this.container.addRemoveClass("high", !0)) : (this.applyPosition({
            top: this.offset.top - t.height + 2 * this.offset.height,
            bottom: "auto"
        }), this.container.addRemoveClass("low", !0)) : o >= i / 2 - .05 * i && i / 2 + .05 * i >= o ? this.applyPosition({
            top: (this.offset.height - t.height) / 2
        }) : i / 2 > this.offset.top + this.offset.height ? (this.applyPosition({
            top: -this.offset.height
        }), this.container.addRemoveClass("high", !0)) : (this.applyPosition({
            top: t.top - t.height - this.offset.top + this.offset.height
        }), this.container.addRemoveClass("low", !0)), !0;
    },
    applyHorizontalFlushPositioning: function(t, i) {
        if (!this.initHorizontalPositioning()) return !1;
        var o = this.getBoundingRect(this.container.node), s = this.getViewHeight();
        return this.container.floating ? s / 2 > this.offset.top ? (this.applyPosition({
            top: this.offset.top + this.offset.height / 2
        }), this.container.addRemoveClass("high", !0)) : (this.applyPosition({
            top: this.offset.top + this.offset.height / 2 - o.height
        }), this.container.addRemoveClass("low", !0)) : o.top + o.height > s && s - o.bottom < o.top - o.height ? (this.applyPosition({
            top: o.top - o.height - this.offset.top - this.offset.height / 2
        }), this.container.addRemoveClass("low", !0)) : (this.applyPosition({
            top: this.offset.height / 2
        }), this.container.addRemoveClass("high", !0)), t > this.offset.left + this.offset.width ? (this.container.addClass("left"), 
        this.container.addClass("corner"), !0) : this.offset.left > i ? (this.container.addClass("right"), 
        this.container.addClass("corner"), !0) : !1;
    },
    getBoundingRect: function(t) {
        var i = t.getBoundingClientRect();
        return i.width && i.height ? i : {
            left: i.left,
            right: i.right,
            top: i.top,
            bottom: i.bottom,
            width: i.right - i.left,
            height: i.bottom - i.top
        };
    },
    getViewHeight: function() {
        return void 0 === window.innerHeight ? document.documentElement.clientHeight : window.innerHeight;
    },
    getViewWidth: function() {
        return void 0 === window.innerWidth ? document.documentElement.clientWidth : window.innerWidth;
    },
    applyPosition: function(t) {
        var i = "";
        for (var o in t) i += o + ":" + t[o] + (isNaN(t[o]) ? "; " : "px; ");
        this.container.addStyles(i);
    },
    resetPositioning: function() {
        this.container.removeClass("right"), this.container.removeClass("left"), this.container.removeClass("high"), 
        this.container.removeClass("low"), this.container.removeClass("corner"), this.container.removeClass("below"), 
        this.container.removeClass("above"), this.container.removeClass("vertical"), this.container.removeClass("horizontal"), 
        this.applyPosition({
            left: "auto"
        }), this.applyPosition({
            top: "auto"
        });
    },
    reflow: function() {
        this.offset = this.container.activatorOffset, this.adjustPosition();
    }
});

// fittable/source/FittableLayout.js
enyo.kind({
    name: "enyo.FittableLayout",
    kind: "Layout",
    constructor: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.container.addRemoveClass("force-left-to-right", enyo.Control.prototype.rtl && !this.container.get("rtl"));
        };
    }),
    calcFitIndex: function() {
        var t, i, o = this.container.children;
        for (i = 0; o.length > i; i++) if (t = o[i], t.fit && t.showing) return i;
    },
    getFitControl: function() {
        var t = this.container.children, i = t[this.fitIndex];
        return i && i.fit && i.showing || (this.fitIndex = this.calcFitIndex(), i = t[this.fitIndex]), 
        i;
    },
    shouldReverse: function() {
        return this.container.rtl && "h" === this.orient;
    },
    getFirstChild: function() {
        var t = this.getShowingChildren();
        return this.shouldReverse() ? t[t.length - 1] : t[0];
    },
    getLastChild: function() {
        var t = this.getShowingChildren();
        return this.shouldReverse() ? t[0] : t[t.length - 1];
    },
    getShowingChildren: function() {
        for (var t = [], i = 0, o = this.container.children, e = o.length; e > i; i++) o[i].showing && t.push(o[i]);
        return t;
    },
    _reflow: function(t, i, o, e) {
        this.container.addRemoveClass("enyo-stretch", !this.container.noStretch);
        var s, n, h, a, r, f = this.getFitControl(), l = this.container.hasNode(), d = 0, g = 0, c = 0;
        if (f && l) {
            if (s = enyo.dom.calcPaddingExtents(l), n = f.getBounds(), d = l[i] - (s[o] + s[e]), 
            this.shouldReverse()) {
                a = this.getFirstChild(), c = d - (n[o] + n[t]);
                var p = enyo.dom.getComputedBoxValue(a.hasNode(), "margin", o) || 0;
                if (a == f) g = p; else {
                    var u = a.getBounds(), y = u[o];
                    g = n[o] + p - y;
                }
            } else {
                h = this.getLastChild(), g = n[o] - (s[o] || 0);
                var w = enyo.dom.getComputedBoxValue(h.hasNode(), "margin", e) || 0;
                if (h == f) c = w; else {
                    var v = h.getBounds(), C = n[o] + n[t], m = v[o] + v[t] + w;
                    c = m - C;
                }
            }
            r = d - (g + c), f.applyStyle(t, r + "px");
        }
    },
    reflow: function() {
        "h" == this.orient ? this._reflow("width", "clientWidth", "left", "right") : this._reflow("height", "clientHeight", "top", "bottom");
    }
}), enyo.kind({
    name: "enyo.FittableColumnsLayout",
    kind: "FittableLayout",
    orient: "h",
    layoutClass: "enyo-fittable-columns-layout"
}), enyo.kind({
    name: "enyo.FittableRowsLayout",
    kind: "FittableLayout",
    layoutClass: "enyo-fittable-rows-layout",
    orient: "v"
});

// fittable/source/FittableRows.js
enyo.kind({
    name: "enyo.FittableRows",
    layoutKind: "FittableRowsLayout",
    noStretch: !1
});

// fittable/source/FittableColumns.js
enyo.kind({
    name: "enyo.FittableColumns",
    layoutKind: "FittableColumnsLayout",
    noStretch: !1
});

// fittable/source/FittableHeaderLayout.js
enyo.kind({
    name: "enyo.FittableHeaderLayout",
    kind: "FittableColumnsLayout",
    applyFitSize: enyo.inherit(function(t) {
        return function(i, e, o, n) {
            var s = o - n, h = this.getFitControl();
            0 > s ? (h.applyStyle("padding-left", Math.abs(s) + "px"), h.applyStyle("padding-right", null)) : s > 0 ? (h.applyStyle("padding-left", null), 
            h.applyStyle("padding-right", Math.abs(s) + "px")) : (h.applyStyle("padding-left", null), 
            h.applyStyle("padding-right", null)), t.apply(this, arguments);
        };
    })
});

// list/source/FlyweightRepeater.js
enyo.kind({
    name: "enyo.FlyweightRepeater",
    published: {
        count: 0,
        noSelect: !1,
        multiSelect: !1,
        toggleSelected: !1,
        clientClasses: "",
        clientStyle: "",
        rowOffset: 0,
        orient: "v"
    },
    events: {
        onSetupItem: "",
        onRenderRow: ""
    },
    bottomUp: !1,
    components: [ {
        kind: "Selection",
        onSelect: "selectDeselect",
        onDeselect: "selectDeselect"
    }, {
        name: "client"
    } ],
    create: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.noSelectChanged(), this.multiSelectChanged(), this.clientClassesChanged(), 
            this.clientStyleChanged();
        };
    }),
    noSelectChanged: function() {
        this.noSelect && this.$.selection.clear();
    },
    multiSelectChanged: function() {
        this.$.selection.setMulti(this.multiSelect);
    },
    clientClassesChanged: function() {
        this.$.client.setClasses(this.clientClasses);
    },
    clientStyleChanged: function() {
        this.$.client.setStyle(this.clientStyle);
    },
    setupItem: function(t) {
        this.doSetupItem({
            index: t,
            selected: this.isSelected(t)
        });
    },
    generateChildHtml: enyo.inherit(function(t) {
        return function() {
            var i = "";
            this.index = null;
            for (var e = 0, o = 0; this.count > e; e++) o = this.rowOffset + (this.bottomUp ? this.count - e - 1 : e), 
            this.setupItem(o), this.$.client.setAttribute("data-enyo-index", o), "h" == this.orient && this.$.client.setStyle("display:inline-block;"), 
            i += t.apply(this, arguments), this.$.client.teardownRender();
            return i;
        };
    }),
    previewDomEvent: function(t) {
        var i = this.index = this.rowForEvent(t);
        t.rowIndex = t.index = i, t.flyweight = this;
    },
    decorateEvent: enyo.inherit(function(t) {
        return function(i, e) {
            var o = e && null != e.index ? e.index : this.index;
            e && null != o && (e.index = o, e.flyweight = this), t.apply(this, arguments);
        };
    }),
    tap: function(t, i) {
        this.noSelect || -1 === i.index || (this.toggleSelected ? this.$.selection.toggle(i.index) : this.$.selection.select(i.index));
    },
    selectDeselect: function(t, i) {
        this.renderRow(i.key);
    },
    getSelection: function() {
        return this.$.selection;
    },
    isSelected: function(t) {
        return this.getSelection().isSelected(t);
    },
    renderRow: function(t) {
        if (!(this.rowOffset > t || t >= this.count + this.rowOffset)) {
            this.setupItem(t);
            var i = this.fetchRowNode(t);
            i && (enyo.dom.setInnerHtml(i, this.$.client.generateChildHtml()), this.$.client.teardownChildren(), 
            this.doRenderRow({
                rowIndex: t
            }));
        }
    },
    fetchRowNode: function(t) {
        return this.hasNode() ? this.node.querySelector('[data-enyo-index="' + t + '"]') : void 0;
    },
    rowForEvent: function(t) {
        if (!this.hasNode()) return -1;
        for (var i = t.target; i && i !== this.node; ) {
            var e = i.getAttribute && i.getAttribute("data-enyo-index");
            if (null !== e) return Number(e);
            i = i.parentNode;
        }
        return -1;
    },
    prepareRow: function(t) {
        if (!(this.rowOffset > t || t >= this.count + this.rowOffset)) {
            this.setupItem(t);
            var i = this.fetchRowNode(t);
            enyo.FlyweightRepeater.claimNode(this.$.client, i);
        }
    },
    lockRow: function() {
        this.$.client.teardownChildren();
    },
    performOnRow: function(t, i, e) {
        this.rowOffset > t || t >= this.count + this.rowOffset || i && (this.prepareRow(t), 
        enyo.call(e || null, i), this.lockRow());
    },
    statics: {
        claimNode: function(t, i) {
            var e;
            i && (e = i.id !== t.id ? i.querySelector("#" + t.id) : i), t.generated = Boolean(e || !t.tag), 
            t.node = e, t.node && t.rendered();
            for (var o, n = 0, s = t.children; o = s[n]; n++) this.claimNode(o, i);
        }
    }
});

// list/source/List.js
enyo.kind({
    name: "enyo.List",
    kind: "Scroller",
    classes: "enyo-list",
    published: {
        count: 0,
        rowsPerPage: 50,
        orient: "v",
        bottomUp: !1,
        noSelect: !1,
        multiSelect: !1,
        toggleSelected: !1,
        fixedSize: !1,
        reorderable: !1,
        centerReorderContainer: !0,
        reorderComponents: [],
        pinnedReorderComponents: [],
        swipeableComponents: [],
        enableSwipe: !1,
        persistSwipeableItem: !1
    },
    events: {
        onSetupItem: "",
        onSetupReorderComponents: "",
        onSetupPinnedReorderComponents: "",
        onReorder: "",
        onSetupSwipeItem: "",
        onSwipeDrag: "",
        onSwipe: "",
        onSwipeComplete: ""
    },
    handlers: {
        onAnimateFinish: "animateFinish",
        onRenderRow: "rowRendered",
        ondragstart: "dragstart",
        ondrag: "drag",
        ondragfinish: "dragfinish",
        onup: "up",
        onholdpulse: "holdpulse",
        onflick: "flick"
    },
    rowSize: 0,
    listTools: [ {
        name: "port",
        classes: "enyo-list-port enyo-border-box",
        components: [ {
            name: "generator",
            kind: "FlyweightRepeater",
            canGenerate: !1,
            components: [ {
                tag: null,
                name: "client"
            } ]
        }, {
            name: "holdingarea",
            allowHtml: !0,
            classes: "enyo-list-holdingarea"
        }, {
            name: "page0",
            allowHtml: !0,
            classes: "enyo-list-page"
        }, {
            name: "page1",
            allowHtml: !0,
            classes: "enyo-list-page"
        }, {
            name: "placeholder",
            classes: "enyo-list-placeholder"
        }, {
            name: "swipeableComponents",
            style: "position:absolute; display:block; top:-1000px; left:0;"
        } ]
    } ],
    reorderHoldTimeMS: 600,
    draggingRowIndex: -1,
    initHoldCounter: 3,
    holdCounter: 3,
    holding: !1,
    draggingRowNode: null,
    placeholderRowIndex: -1,
    dragToScrollThreshold: .1,
    prevScrollTop: 0,
    autoScrollTimeoutMS: 20,
    autoScrollTimeout: null,
    autoscrollPageY: 0,
    pinnedReorderMode: !1,
    initialPinPosition: -1,
    itemMoved: !1,
    currentPageNumber: -1,
    completeReorderTimeout: null,
    swipeIndex: null,
    swipeDirection: null,
    persistentItemVisible: !1,
    persistentItemOrigin: null,
    swipeComplete: !1,
    completeSwipeTimeout: null,
    completeSwipeDelayMS: 500,
    normalSwipeSpeedMS: 200,
    fastSwipeSpeedMS: 100,
    percentageDraggedThreshold: .2,
    importProps: enyo.inherit(function(t) {
        return function(e) {
            e && e.reorderable && (this.touch = !0), t.apply(this, arguments);
        };
    }),
    create: enyo.inherit(function(t) {
        return function() {
            this.pageSizes = [], this.orientV = "v" == this.orient, this.vertical = this.orientV ? "default" : "hidden", 
            t.apply(this, arguments), this.$.generator.orient = this.orient, this.getStrategy().translateOptimized = !0, 
            this.$.port.addRemoveClass("horizontal", !this.orientV), this.$.port.addRemoveClass("vertical", this.orientV), 
            this.$.page0.addRemoveClass("vertical", this.orientV), this.$.page1.addRemoveClass("vertical", this.orientV), 
            this.bottomUpChanged(), this.noSelectChanged(), this.multiSelectChanged(), this.toggleSelectedChanged(), 
            this.$.generator.setRowOffset(0), this.$.generator.setCount(this.count);
        };
    }),
    initComponents: enyo.inherit(function(t) {
        return function() {
            this.createReorderTools(), t.apply(this, arguments), this.createSwipeableComponents();
        };
    }),
    createReorderTools: function() {
        this.createComponent({
            name: "reorderContainer",
            classes: "enyo-list-reorder-container",
            ondown: "sendToStrategy",
            ondrag: "sendToStrategy",
            ondragstart: "sendToStrategy",
            ondragfinish: "sendToStrategy",
            onflick: "sendToStrategy"
        });
    },
    createStrategy: enyo.inherit(function(t) {
        return function() {
            this.controlParentName = "strategy", t.apply(this, arguments), this.createChrome(this.listTools), 
            this.controlParentName = "client", this.discoverControlParent();
        };
    }),
    createSwipeableComponents: function() {
        for (var t = 0; this.swipeableComponents.length > t; t++) this.$.swipeableComponents.createComponent(this.swipeableComponents[t], {
            owner: this.owner
        });
    },
    rendered: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.$.generator.node = this.$.port.hasNode(), this.$.generator.generated = !0, 
            this.reset();
        };
    }),
    resizeHandler: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.refresh();
        };
    }),
    bottomUpChanged: function() {
        this.$.generator.bottomUp = this.bottomUp, this.$.page0.applyStyle(this.pageBound, null), 
        this.$.page1.applyStyle(this.pageBound, null), this.pageBound = this.orientV ? this.bottomUp ? "bottom" : "top" : this.rtl ? this.bottomUp ? "left" : "right" : this.bottomUp ? "right" : "left", 
        !this.orientV && this.bottomUp && (this.$.page0.applyStyle("left", "auto"), this.$.page1.applyStyle("left", "auto")), 
        this.hasNode() && this.reset();
    },
    noSelectChanged: function() {
        this.$.generator.setNoSelect(this.noSelect);
    },
    multiSelectChanged: function() {
        this.$.generator.setMultiSelect(this.multiSelect);
    },
    toggleSelectedChanged: function() {
        this.$.generator.setToggleSelected(this.toggleSelected);
    },
    countChanged: function() {
        this.hasNode() && this.updateMetrics();
    },
    sendToStrategy: function(t, e) {
        this.$.strategy.dispatchEvent("on" + e.type, e, t);
    },
    updateMetrics: function() {
        this.defaultPageSize = this.rowsPerPage * (this.rowSize || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), 
        this.portSize = 0;
        for (var t = 0; this.pageCount > t; t++) this.portSize += this.getPageSize(t);
        this.adjustPortSize();
    },
    holdpulse: function(t, e) {
        return this.getReorderable() && !this.isReordering() ? e.holdTime >= this.reorderHoldTimeMS && this.shouldStartReordering(t, e) ? (this.startReordering(e), 
        !1) : void 0 : void 0;
    },
    dragstart: function(t, e) {
        return this.isReordering() ? !0 : this.isSwipeable() ? this.swipeDragStart(t, e) : void 0;
    },
    drag: function(t, e) {
        return this.shouldDoReorderDrag(e) ? (e.preventDefault(), this.reorderDrag(e), !0) : this.isSwipeable() ? (e.preventDefault(), 
        this.swipeDrag(t, e), !0) : void 0;
    },
    dragfinish: function(t, e) {
        this.isReordering() ? this.finishReordering(t, e) : this.isSwipeable() && this.swipeDragFinish(t, e);
    },
    up: function(t, e) {
        this.isReordering() && this.finishReordering(t, e);
    },
    generatePage: function(t, e) {
        this.page = t;
        var i = this.rowsPerPage * this.page;
        this.$.generator.setRowOffset(i);
        var o = Math.min(this.count - i, this.rowsPerPage);
        this.$.generator.setCount(o);
        var n = this.$.generator.generateChildHtml();
        e.setContent(n), this.getReorderable() && this.draggingRowIndex > -1 && this.hideReorderingRow();
        var s = e.getBounds(), r = this.orientV ? s.height : s.width;
        if (!this.rowSize && r > 0 && (this.rowSize = Math.floor(r / o), this.updateMetrics()), 
        !this.fixedSize) {
            var h = this.getPageSize(t);
            h != r && r > 0 && (this.pageSizes[t] = r, this.portSize += r - h);
        }
    },
    pageForRow: function(t) {
        return Math.floor(t / this.rowsPerPage);
    },
    preserveDraggingRowNode: function(t) {
        this.draggingRowNode && this.pageForRow(this.draggingRowIndex) === t && (this.$.holdingarea.hasNode().appendChild(this.draggingRowNode), 
        this.draggingRowNode = null, this.removedInitialPage = !0);
    },
    update: function(t) {
        var e = !1, i = this.positionToPageInfo(t), o = i.pos + this.scrollerSize / 2, n = Math.floor(o / Math.max(i.size, this.scrollerSize) + .5) + i.no, s = 0 === n % 2 ? n : n - 1;
        this.p0 != s && this.isPageInRange(s) && (this.preserveDraggingRowNode(this.p0), 
        this.generatePage(s, this.$.page0), this.positionPage(s, this.$.page0), this.p0 = s, 
        e = !0, this.p0RowBounds = this.getPageRowSizes(this.$.page0)), s = 0 === n % 2 ? Math.max(1, n - 1) : n, 
        this.p1 != s && this.isPageInRange(s) && (this.preserveDraggingRowNode(this.p1), 
        this.generatePage(s, this.$.page1), this.positionPage(s, this.$.page1), this.p1 = s, 
        e = !0, this.p1RowBounds = this.getPageRowSizes(this.$.page1)), e && (this.$.generator.setRowOffset(0), 
        this.$.generator.setCount(this.count), this.fixedSize || (this.adjustBottomPage(), 
        this.adjustPortSize()));
    },
    getPageRowSizes: function(t) {
        for (var e, i, o = {}, n = t.hasNode().querySelectorAll("div[data-enyo-index]"), s = 0; n.length > s; s++) e = n[s].getAttribute("data-enyo-index"), 
        null !== e && (i = enyo.dom.getBounds(n[s]), o[parseInt(e, 10)] = {
            height: i.height,
            width: i.width
        });
        return o;
    },
    updateRowBounds: function(t) {
        this.p0RowBounds[t] ? this.updateRowBoundsAtIndex(t, this.p0RowBounds, this.$.page0) : this.p1RowBounds[t] && this.updateRowBoundsAtIndex(t, this.p1RowBounds, this.$.page1);
    },
    updateRowBoundsAtIndex: function(t, e, i) {
        var o = i.hasNode().querySelector('div[data-enyo-index="' + t + '"]'), n = enyo.dom.getBounds(o);
        e[t].height = n.height, e[t].width = n.width;
    },
    updateForPosition: function(t) {
        this.update(this.calcPos(t));
    },
    calcPos: function(t) {
        return this.bottomUp ? this.portSize - this.scrollerSize - t : t;
    },
    adjustBottomPage: function() {
        var t = this.p0 >= this.p1 ? this.$.page0 : this.$.page1;
        this.positionPage(t.pageNo, t);
    },
    adjustPortSize: function() {
        this.scrollerSize = this.orientV ? this.getBounds().height : this.getBounds().width;
        var t = Math.max(this.scrollerSize, this.portSize);
        this.$.port.applyStyle(this.orientV ? "height" : "width", t + "px"), this.orientV || this.$.port.applyStyle("height", this.getBounds().height + "px");
    },
    positionPage: function(t, e) {
        e.pageNo = t;
        var i = this.pageToPosition(t);
        e.applyStyle(this.pageBound, i + "px");
    },
    pageToPosition: function(t) {
        for (var e = 0, i = t; i > 0; ) i--, e += this.getPageSize(i);
        return e;
    },
    positionToPageInfo: function(t) {
        for (var e = -1, i = this.calcPos(t), o = this.defaultPageSize; i >= 0; ) e++, o = this.getPageSize(e), 
        i -= o;
        return e = Math.max(e, 0), {
            no: e,
            size: o,
            pos: i + o,
            startRow: e * this.rowsPerPage,
            endRow: Math.min((e + 1) * this.rowsPerPage - 1, this.count - 1)
        };
    },
    isPageInRange: function(t) {
        return t == Math.max(0, Math.min(this.pageCount - 1, t));
    },
    getPageSize: function(t) {
        var e = this.pageSizes[t];
        if (!e) {
            var i = this.rowsPerPage * t, o = Math.min(this.count - i, this.rowsPerPage);
            e = this.defaultPageSize * (o / this.rowsPerPage);
        }
        return Math.max(1, e);
    },
    invalidatePages: function() {
        this.p0 = this.p1 = null, this.p0RowBounds = {}, this.p1RowBounds = {}, this.$.page0.setContent(""), 
        this.$.page1.setContent("");
    },
    invalidateMetrics: function() {
        this.pageSizes = [], this.rowSize = 0, this.updateMetrics();
    },
    scroll: enyo.inherit(function(t) {
        return function(e, i) {
            var o = t.apply(this, arguments), n = this.orientV ? this.getScrollTop() : this.getScrollLeft();
            return this.lastPos === n ? o : (this.lastPos = n, this.update(n), this.pinnedReorderMode && this.reorderScroll(e, i), 
            o);
        };
    }),
    setScrollTop: enyo.inherit(function(t) {
        return function(e) {
            this.update(e), t.apply(this, arguments), this.twiddle();
        };
    }),
    getScrollPosition: function() {
        return this.calcPos(this[this.orientV ? "getScrollTop" : "getScrollLeft"]());
    },
    setScrollPosition: function(t) {
        this[this.orientV ? "setScrollTop" : "setScrollLeft"](this.calcPos(t));
    },
    scrollToBottom: enyo.inherit(function(t) {
        return function() {
            this.update(this.getScrollBounds().maxTop), t.apply(this, arguments);
        };
    }),
    scrollToRow: function(t) {
        var e = this.pageForRow(t), i = this.pageToPosition(e);
        if (this.updateForPosition(i), i = this.pageToPosition(e), this.setScrollPosition(i), 
        e == this.p0 || e == this.p1) {
            var o = this.$.generator.fetchRowNode(t);
            if (o) {
                var n = this.orientV ? o.offsetTop : o.offsetLeft;
                this.bottomUp && (n = this.getPageSize(e) - (this.orientV ? o.offsetHeight : o.offsetWidth) - n);
                var s = this.getScrollPosition() + n;
                this.setScrollPosition(s);
            }
        }
    },
    scrollToStart: function() {
        this[this.bottomUp ? this.orientV ? "scrollToBottom" : "scrollToRight" : "scrollToTop"]();
    },
    scrollToEnd: function() {
        this[this.bottomUp ? this.orientV ? "scrollToTop" : "scrollToLeft" : this.orientV ? "scrollToBottom" : "scrollToRight"]();
    },
    refresh: function() {
        this.invalidatePages(), this.update(this[this.orientV ? "getScrollTop" : "getScrollLeft"]()), 
        this.stabilize(), 4 === enyo.platform.android && this.twiddle();
    },
    reset: function() {
        this.getSelection().clear(), this.invalidateMetrics(), this.invalidatePages(), this.stabilize(), 
        this.scrollToStart();
    },
    getSelection: function() {
        return this.$.generator.getSelection();
    },
    select: function(t, e) {
        return this.getSelection().select(t, e);
    },
    deselect: function(t) {
        return this.getSelection().deselect(t);
    },
    isSelected: function(t) {
        return this.$.generator.isSelected(t);
    },
    renderRow: function(t) {
        this.$.generator.renderRow(t);
    },
    rowRendered: function(t, e) {
        this.updateRowBounds(e.rowIndex);
    },
    prepareRow: function(t) {
        this.$.generator.prepareRow(t);
    },
    lockRow: function() {
        this.$.generator.lockRow();
    },
    performOnRow: function(t, e, i) {
        this.$.generator.performOnRow(t, e, i);
    },
    animateFinish: function() {
        return this.twiddle(), !0;
    },
    twiddle: function() {
        var t = this.getStrategy();
        enyo.call(t, "twiddle");
    },
    pageForPageNumber: function(t, e) {
        return 0 === t % 2 ? e && t !== this.p0 ? null : this.$.page0 : e && t !== this.p1 ? null : this.$.page1;
    },
    shouldStartReordering: function(t, e) {
        return !this.getReorderable() || null == e.rowIndex || 0 > e.rowIndex || this.pinnedReorderMode || t !== this.$.strategy || null == e.index || 0 > e.index ? !1 : !0;
    },
    startReordering: function(t) {
        this.$.strategy.listReordering = !0, this.buildReorderContainer(), this.doSetupReorderComponents(t), 
        this.styleReorderContainer(t), this.draggingRowIndex = this.placeholderRowIndex = t.rowIndex, 
        this.draggingRowNode = t.target, this.removedInitialPage = !1, this.itemMoved = !1, 
        this.initialPageNumber = this.currentPageNumber = this.pageForRow(t.rowIndex), this.prevScrollTop = this.getScrollTop(), 
        this.replaceNodeWithPlaceholder(t.rowIndex);
    },
    buildReorderContainer: function() {
        this.$.reorderContainer.destroyClientControls();
        for (var t = 0; this.reorderComponents.length > t; t++) this.$.reorderContainer.createComponent(this.reorderComponents[t], {
            owner: this.owner
        });
        this.$.reorderContainer.render();
    },
    styleReorderContainer: function(t) {
        this.setItemPosition(this.$.reorderContainer, t.rowIndex), this.setItemBounds(this.$.reorderContainer, t.rowIndex), 
        this.$.reorderContainer.setShowing(!0), this.centerReorderContainer && this.centerReorderContainerOnPointer(t);
    },
    appendNodeToReorderContainer: function(t) {
        this.$.reorderContainer.createComponent({
            allowHtml: !0,
            content: t.innerHTML
        }).render();
    },
    centerReorderContainerOnPointer: function(t) {
        var e = enyo.dom.calcNodePosition(this.hasNode()), i = t.pageX - e.left - parseInt(this.$.reorderContainer.domStyles.width, 10) / 2, o = t.pageY - e.top + this.getScrollTop() - parseInt(this.$.reorderContainer.domStyles.height, 10) / 2;
        "ScrollStrategy" != this.getStrategyKind() && (i -= this.getScrollLeft(), o -= this.getScrollTop()), 
        this.positionReorderContainer(i, o);
    },
    positionReorderContainer: function(t, e) {
        this.$.reorderContainer.addClass("enyo-animatedTopAndLeft"), this.$.reorderContainer.addStyles("left:" + t + "px;top:" + e + "px;"), 
        this.setPositionReorderContainerTimeout();
    },
    setPositionReorderContainerTimeout: function() {
        this.clearPositionReorderContainerTimeout(), this.positionReorderContainerTimeout = setTimeout(this.bindSafely(function() {
            this.$.reorderContainer.removeClass("enyo-animatedTopAndLeft"), this.clearPositionReorderContainerTimeout();
        }), 100);
    },
    clearPositionReorderContainerTimeout: function() {
        this.positionReorderContainerTimeout && (clearTimeout(this.positionReorderContainerTimeout), 
        this.positionReorderContainerTimeout = null);
    },
    shouldDoReorderDrag: function() {
        return !this.getReorderable() || 0 > this.draggingRowIndex || this.pinnedReorderMode ? !1 : !0;
    },
    reorderDrag: function(t) {
        this.positionReorderNode(t), this.checkForAutoScroll(t), this.updatePlaceholderPosition(t.pageY);
    },
    updatePlaceholderPosition: function(t) {
        var e = this.getRowIndexFromCoordinate(t);
        -1 !== e && (e >= this.placeholderRowIndex ? this.movePlaceholderToIndex(Math.min(this.count, e + 1)) : this.movePlaceholderToIndex(e));
    },
    positionReorderNode: function(t) {
        var e = this.$.reorderContainer.getBounds(), i = e.left + t.ddx, o = e.top + t.ddy;
        o = "ScrollStrategy" == this.getStrategyKind() ? o + (this.getScrollTop() - this.prevScrollTop) : o, 
        this.$.reorderContainer.addStyles("top: " + o + "px ; left: " + i + "px"), this.prevScrollTop = this.getScrollTop();
    },
    checkForAutoScroll: function(t) {
        var e, i = enyo.dom.calcNodePosition(this.hasNode()), o = this.getBounds();
        this.autoscrollPageY = t.pageY, t.pageY - i.top < o.height * this.dragToScrollThreshold ? (e = 100 * (1 - (t.pageY - i.top) / (o.height * this.dragToScrollThreshold)), 
        this.scrollDistance = -1 * e) : t.pageY - i.top > o.height * (1 - this.dragToScrollThreshold) ? (e = 100 * ((t.pageY - i.top - o.height * (1 - this.dragToScrollThreshold)) / (o.height - o.height * (1 - this.dragToScrollThreshold))), 
        this.scrollDistance = 1 * e) : this.scrollDistance = 0, 0 === this.scrollDistance ? this.stopAutoScrolling() : this.autoScrollTimeout || this.startAutoScrolling();
    },
    stopAutoScrolling: function() {
        this.autoScrollTimeout && (clearTimeout(this.autoScrollTimeout), this.autoScrollTimeout = null);
    },
    startAutoScrolling: function() {
        this.autoScrollTimeout = setInterval(this.bindSafely(this.autoScroll), this.autoScrollTimeoutMS);
    },
    autoScroll: function() {
        0 === this.scrollDistance ? this.stopAutoScrolling() : this.autoScrollTimeout || this.startAutoScrolling(), 
        this.setScrollPosition(this.getScrollPosition() + this.scrollDistance), this.positionReorderNode({
            ddx: 0,
            ddy: 0
        }), this.updatePlaceholderPosition(this.autoscrollPageY);
    },
    movePlaceholderToIndex: function(t) {
        var e, i;
        if (!(0 > t)) {
            t >= this.count ? (e = null, i = this.pageForPageNumber(this.pageForRow(this.count - 1)).hasNode()) : (e = this.$.generator.fetchRowNode(t), 
            i = e.parentNode);
            var o = this.pageForRow(t);
            o >= this.pageCount && (o = this.currentPageNumber), i.insertBefore(this.placeholderNode, e), 
            this.currentPageNumber !== o && (this.updatePageSize(this.currentPageNumber), this.updatePageSize(o), 
            this.updatePagePositions(o)), this.placeholderRowIndex = t, this.currentPageNumber = o, 
            this.itemMoved = !0;
        }
    },
    finishReordering: function(t, e) {
        return !this.isReordering() || this.pinnedReorderMode || this.completeReorderTimeout ? void 0 : (this.stopAutoScrolling(), 
        this.$.strategy.listReordering = !1, this.moveReorderedContainerToDroppedPosition(e), 
        this.completeReorderTimeout = setTimeout(this.bindSafely(this.completeFinishReordering, e), 100), 
        e.preventDefault(), !0);
    },
    moveReorderedContainerToDroppedPosition: function() {
        var t = this.getRelativeOffset(this.placeholderNode, this.hasNode()), e = "ScrollStrategy" == this.getStrategyKind() ? t.top : t.top - this.getScrollTop(), i = t.left - this.getScrollLeft();
        this.positionReorderContainer(i, e);
    },
    completeFinishReordering: function(t) {
        return this.completeReorderTimeout = null, this.placeholderRowIndex > this.draggingRowIndex && (this.placeholderRowIndex = Math.max(0, this.placeholderRowIndex - 1)), 
        this.draggingRowIndex != this.placeholderRowIndex || !this.pinnedReorderComponents.length || this.pinnedReorderMode || this.itemMoved ? (this.removeDraggingRowNode(), 
        this.removePlaceholderNode(), this.emptyAndHideReorderContainer(), this.pinnedReorderMode = !1, 
        this.reorderRows(t), this.draggingRowIndex = this.placeholderRowIndex = -1, this.refresh(), 
        void 0) : (this.beginPinnedReorder(t), void 0);
    },
    beginPinnedReorder: function(t) {
        this.buildPinnedReorderContainer(), this.doSetupPinnedReorderComponents(enyo.mixin(t, {
            index: this.draggingRowIndex
        })), this.pinnedReorderMode = !0, this.initialPinPosition = t.pageY;
    },
    emptyAndHideReorderContainer: function() {
        this.$.reorderContainer.destroyComponents(), this.$.reorderContainer.setShowing(!1);
    },
    buildPinnedReorderContainer: function() {
        this.$.reorderContainer.destroyClientControls();
        for (var t = 0; this.pinnedReorderComponents.length > t; t++) this.$.reorderContainer.createComponent(this.pinnedReorderComponents[t], {
            owner: this.owner
        });
        this.$.reorderContainer.render();
    },
    reorderRows: function(t) {
        this.doReorder(this.makeReorderEvent(t)), this.positionReorderedNode(), this.updateListIndices();
    },
    makeReorderEvent: function(t) {
        return t.reorderFrom = this.draggingRowIndex, t.reorderTo = this.placeholderRowIndex, 
        t;
    },
    positionReorderedNode: function() {
        if (!this.removedInitialPage) {
            var t = this.$.generator.fetchRowNode(this.placeholderRowIndex);
            if (t && (t.parentNode.insertBefore(this.hiddenNode, t), this.showNode(this.hiddenNode)), 
            this.hiddenNode = null, this.currentPageNumber != this.initialPageNumber) {
                var e, i, o = this.pageForPageNumber(this.currentPageNumber), n = this.pageForPageNumber(this.currentPageNumber + 1);
                this.initialPageNumber < this.currentPageNumber ? (e = o.hasNode().firstChild, n.hasNode().appendChild(e)) : (e = o.hasNode().lastChild, 
                i = n.hasNode().firstChild, n.hasNode().insertBefore(e, i)), this.correctPageSizes(), 
                this.updatePagePositions(this.initialPageNumber);
            }
        }
    },
    updateListIndices: function() {
        if (this.shouldDoRefresh()) return this.refresh(), this.correctPageSizes(), void 0;
        var t, e, i, o, n = Math.min(this.draggingRowIndex, this.placeholderRowIndex), s = Math.max(this.draggingRowIndex, this.placeholderRowIndex), r = this.draggingRowIndex - this.placeholderRowIndex > 0 ? 1 : -1;
        if (1 === r) {
            for (t = this.$.generator.fetchRowNode(this.draggingRowIndex), t && t.setAttribute("data-enyo-index", "reordered"), 
            e = s - 1, i = s; e >= n; e--) t = this.$.generator.fetchRowNode(e), t && (o = parseInt(t.getAttribute("data-enyo-index"), 10), 
            i = o + 1, t.setAttribute("data-enyo-index", i));
            t = this.hasNode().querySelector('[data-enyo-index="reordered"]'), t.setAttribute("data-enyo-index", this.placeholderRowIndex);
        } else for (t = this.$.generator.fetchRowNode(this.draggingRowIndex), t && t.setAttribute("data-enyo-index", this.placeholderRowIndex), 
        e = n + 1, i = n; s >= e; e++) t = this.$.generator.fetchRowNode(e), t && (o = parseInt(t.getAttribute("data-enyo-index"), 10), 
        i = o - 1, t.setAttribute("data-enyo-index", i));
    },
    shouldDoRefresh: function() {
        return Math.abs(this.initialPageNumber - this.currentPageNumber) > 1;
    },
    getNodeStyle: function(t) {
        var e = this.$.generator.fetchRowNode(t);
        if (e) {
            var i = this.getRelativeOffset(e, this.hasNode()), o = enyo.dom.getBounds(e);
            return {
                h: o.height,
                w: o.width,
                left: i.left,
                top: i.top
            };
        }
    },
    getRelativeOffset: function(t, e) {
        var i = {
            top: 0,
            left: 0
        };
        if (t !== e && t.parentNode) do i.top += t.offsetTop || 0, i.left += t.offsetLeft || 0, 
        t = t.offsetParent; while (t && t !== e);
        return i;
    },
    replaceNodeWithPlaceholder: function(t) {
        var e = this.$.generator.fetchRowNode(t);
        if (!e) return enyo.log("No node - " + t), void 0;
        this.placeholderNode = this.createPlaceholderNode(e), this.hiddenNode = this.hideNode(e);
        var i = this.pageForPageNumber(this.currentPageNumber);
        i.hasNode().insertBefore(this.placeholderNode, this.hiddenNode);
    },
    createPlaceholderNode: function(t) {
        var e = this.$.placeholder.hasNode().cloneNode(!0), i = enyo.dom.getBounds(t);
        return e.style.height = i.height + "px", e.style.width = i.width + "px", e;
    },
    removePlaceholderNode: function() {
        this.removeNode(this.placeholderNode), this.placeholderNode = null;
    },
    removeDraggingRowNode: function() {
        this.draggingRowNode = null;
        var t = this.$.holdingarea.hasNode();
        t.innerHTML = "";
    },
    removeNode: function(t) {
        t && t.parentNode && t.parentNode.removeChild(t);
    },
    updatePageSize: function(t) {
        if (!(0 > t)) {
            var e = this.pageForPageNumber(t, !0);
            if (e) {
                var i = this.pageSizes[t], o = Math.max(1, e.getBounds().height);
                this.pageSizes[t] = o, this.portSize += o - i;
            }
        }
    },
    updatePagePositions: function(t) {
        this.positionPage(this.currentPageNumber, this.pageForPageNumber(this.currentPageNumber)), 
        this.positionPage(t, this.pageForPageNumber(t));
    },
    correctPageSizes: function() {
        var t = this.initialPageNumber % 2;
        this.updatePageSize(this.currentPageNumber, this.$["page" + this.currentPage]), 
        t != this.currentPageNumber && this.updatePageSize(this.initialPageNumber, this.$["page" + t]);
    },
    hideNode: function(t) {
        return t.style.display = "none", t;
    },
    showNode: function(t) {
        return t.style.display = "block", t;
    },
    dropPinnedRow: function(t) {
        this.moveReorderedContainerToDroppedPosition(t), this.completeReorderTimeout = setTimeout(this.bindSafely(this.completeFinishReordering, t), 100);
    },
    cancelPinnedMode: function(t) {
        this.placeholderRowIndex = this.draggingRowIndex, this.dropPinnedRow(t);
    },
    getRowIndexFromCoordinate: function(t) {
        var e = this.getScrollTop() + t - enyo.dom.calcNodePosition(this.hasNode()).top;
        if (0 > e) return -1;
        var i = this.positionToPageInfo(e), o = i.no == this.p0 ? this.p0RowBounds : this.p1RowBounds;
        if (!o) return this.count;
        for (var n = i.pos, s = this.placeholderNode ? enyo.dom.getBounds(this.placeholderNode).height : 0, r = 0, h = i.startRow; i.endRow >= h; ++h) {
            if (h === this.placeholderRowIndex && (r += s, r >= n)) return -1;
            if (h !== this.draggingRowIndex && (r += o[h].height, r >= n)) return h;
        }
        return h;
    },
    getIndexPosition: function(t) {
        return enyo.dom.calcNodePosition(this.$.generator.fetchRowNode(t));
    },
    setItemPosition: function(t, e) {
        var i = this.getNodeStyle(e), o = "ScrollStrategy" == this.getStrategyKind() ? i.top : i.top - this.getScrollTop(), n = "top:" + o + "px; left:" + i.left + "px;";
        t.addStyles(n);
    },
    setItemBounds: function(t, e) {
        var i = this.getNodeStyle(e), o = "width:" + i.w + "px; height:" + i.h + "px;";
        t.addStyles(o);
    },
    reorderScroll: function() {
        "ScrollStrategy" == this.getStrategyKind() && this.$.reorderContainer.addStyles("top:" + (this.initialPinPosition + this.getScrollTop() - this.rowSize) + "px;"), 
        this.updatePlaceholderPosition(this.initialPinPosition);
    },
    hideReorderingRow: function() {
        var t = this.hasNode().querySelector('[data-enyo-index="' + this.draggingRowIndex + '"]');
        t && (this.hiddenNode = this.hideNode(t));
    },
    isReordering: function() {
        return this.draggingRowIndex > -1;
    },
    isSwiping: function() {
        return null != this.swipeIndex && !this.swipeComplete && null != this.swipeDirection;
    },
    swipeDragStart: function(t, e) {
        return null == e.index || e.vertical ? !0 : (this.completeSwipeTimeout && this.completeSwipe(e), 
        this.swipeComplete = !1, this.swipeIndex != e.index && (this.clearSwipeables(), 
        this.swipeIndex = e.index), this.swipeDirection = e.xDirection, this.persistentItemVisible || this.startSwipe(e), 
        this.draggedXDistance = 0, this.draggedYDistance = 0, !0);
    },
    swipeDrag: function(t, e) {
        return this.persistentItemVisible ? (this.dragPersistentItem(e), this.preventDragPropagation) : this.isSwiping() ? (this.dragSwipeableComponents(this.calcNewDragPosition(e.ddx)), 
        this.draggedXDistance = e.dx, this.draggedYDistance = e.dy, !0) : !1;
    },
    swipeDragFinish: function(t, e) {
        if (this.persistentItemVisible) this.dragFinishPersistentItem(e); else {
            if (!this.isSwiping()) return !1;
            var i = this.calcPercentageDragged(this.draggedXDistance);
            i > this.percentageDraggedThreshold && e.xDirection === this.swipeDirection ? this.swipe(this.fastSwipeSpeedMS) : this.backOutSwipe(e);
        }
        return this.preventDragPropagation;
    },
    isSwipeable: function() {
        return this.enableSwipe && 0 !== this.$.swipeableComponents.controls.length && !this.isReordering() && !this.pinnedReorderMode;
    },
    positionSwipeableContainer: function(t, e) {
        var i = this.$.generator.fetchRowNode(t);
        if (i) {
            var o = this.getRelativeOffset(i, this.hasNode()), n = enyo.dom.getBounds(i), s = 1 == e ? -1 * n.width : n.width;
            this.$.swipeableComponents.addStyles("top: " + o.top + "px; left: " + s + "px; height: " + n.height + "px; width: " + n.width + "px;");
        }
    },
    calcNewDragPosition: function(t) {
        var e = this.$.swipeableComponents.getBounds(), i = e.left, o = this.$.swipeableComponents.getBounds(), n = 1 == this.swipeDirection ? 0 : -1 * o.width, s = 1 == this.swipeDirection ? i + t > n ? n : i + t : n > i + t ? n : i + t;
        return s;
    },
    dragSwipeableComponents: function(t) {
        this.$.swipeableComponents.applyStyle("left", t + "px");
    },
    startSwipe: function(t) {
        t.index = this.swipeIndex, this.positionSwipeableContainer(this.swipeIndex, t.xDirection), 
        this.$.swipeableComponents.setShowing(!0), this.setPersistentItemOrigin(t.xDirection), 
        this.doSetupSwipeItem(t);
    },
    dragPersistentItem: function(t) {
        var e = 0, i = "right" == this.persistentItemOrigin ? Math.max(e, e + t.dx) : Math.min(e, e + t.dx);
        this.$.swipeableComponents.applyStyle("left", i + "px");
    },
    dragFinishPersistentItem: function(t) {
        var e = this.calcPercentageDragged(t.dx) > .2, i = t.dx > 0 ? "right" : 0 > t.dx ? "left" : null;
        this.persistentItemOrigin == i ? e ? this.slideAwayItem() : this.bounceItem(t) : this.bounceItem(t);
    },
    setPersistentItemOrigin: function(t) {
        this.persistentItemOrigin = 1 == t ? "left" : "right";
    },
    calcPercentageDragged: function(t) {
        return Math.abs(t / this.$.swipeableComponents.getBounds().width);
    },
    swipe: function(t) {
        this.swipeComplete = !0, this.animateSwipe(0, t);
    },
    backOutSwipe: function() {
        var t = this.$.swipeableComponents.getBounds(), e = 1 == this.swipeDirection ? -1 * t.width : t.width;
        this.animateSwipe(e, this.fastSwipeSpeedMS), this.swipeDirection = null;
    },
    bounceItem: function() {
        var t = this.$.swipeableComponents.getBounds();
        t.left != t.width && this.animateSwipe(0, this.normalSwipeSpeedMS);
    },
    slideAwayItem: function() {
        var t = this.$.swipeableComponents, e = t.getBounds().width, i = "left" == this.persistentItemOrigin ? -1 * e : e;
        this.animateSwipe(i, this.normalSwipeSpeedMS), this.persistentItemVisible = !1, 
        this.setPersistSwipeableItem(!1);
    },
    clearSwipeables: function() {
        this.$.swipeableComponents.setShowing(!1), this.persistentItemVisible = !1, this.setPersistSwipeableItem(!1);
    },
    completeSwipe: function() {
        this.completeSwipeTimeout && (clearTimeout(this.completeSwipeTimeout), this.completeSwipeTimeout = null), 
        this.getPersistSwipeableItem() ? this.swipeComplete && (this.persistentItemVisible = !0) : (this.$.swipeableComponents.setShowing(!1), 
        this.swipeComplete && this.doSwipeComplete({
            index: this.swipeIndex,
            xDirection: this.swipeDirection
        })), this.swipeIndex = null, this.swipeDirection = null;
    },
    animateSwipe: function(t, e) {
        var i = enyo.now(), o = this.$.swipeableComponents, n = parseInt(o.domStyles.left, 10), s = t - n;
        this.stopAnimateSwipe();
        var r = this.bindSafely(function() {
            var t = enyo.now() - i, h = t / e, a = n + s * Math.min(h, 1);
            o.applyStyle("left", a + "px"), this.job = enyo.requestAnimationFrame(r), t / e >= 1 && (this.stopAnimateSwipe(), 
            this.completeSwipeTimeout = setTimeout(this.bindSafely(function() {
                this.completeSwipe();
            }), this.completeSwipeDelayMS));
        });
        this.job = enyo.requestAnimationFrame(r);
    },
    stopAnimateSwipe: function() {
        this.job && (this.job = enyo.cancelRequestAnimationFrame(this.job));
    }
});

// list/source/PulldownList.js
enyo.kind({
    name: "enyo.PulldownList",
    kind: "List",
    touch: !0,
    pully: null,
    pulldownTools: [ {
        name: "pulldown",
        classes: "enyo-list-pulldown",
        components: [ {
            name: "puller",
            kind: "Puller"
        } ]
    } ],
    events: {
        onPullStart: "",
        onPullCancel: "",
        onPull: "",
        onPullRelease: "",
        onPullComplete: ""
    },
    handlers: {
        onScrollStart: "scrollStartHandler",
        onScrollStop: "scrollStopHandler",
        ondragfinish: "dragfinish"
    },
    pullingMessage: "Pull down to refresh...",
    pulledMessage: "Release to refresh...",
    loadingMessage: "Loading...",
    pullingIconClass: "enyo-puller-arrow enyo-puller-arrow-down",
    pulledIconClass: "enyo-puller-arrow enyo-puller-arrow-up",
    loadingIconClass: "",
    create: enyo.inherit(function(t) {
        return function() {
            var e = {
                kind: "Puller",
                showing: !1,
                text: this.loadingMessage,
                iconClass: this.loadingIconClass,
                onCreate: "setPully"
            };
            this.listTools.splice(0, 0, e), t.apply(this, arguments), this.setPulling();
        };
    }),
    initComponents: enyo.inherit(function(t) {
        return function() {
            this.createChrome(this.pulldownTools), this.accel = enyo.dom.canAccelerate(), this.translation = this.accel ? "translate3d" : "translate", 
            this.strategyKind = this.resetStrategyKind(), t.apply(this, arguments);
        };
    }),
    resetStrategyKind: function() {
        return enyo.platform.android >= 3 ? "TranslateScrollStrategy" : "TouchScrollStrategy";
    },
    setPully: function(t, e) {
        this.pully = e.originator;
    },
    scrollStartHandler: function() {
        this.firedPullStart = !1, this.firedPull = !1, this.firedPullCancel = !1;
    },
    scroll: enyo.inherit(function(t) {
        return function() {
            var e = t.apply(this, arguments);
            this.completingPull && this.pully.setShowing(!1);
            var i = this.getStrategy().$.scrollMath || this.getStrategy(), o = -1 * this.getScrollTop();
            return i.isInOverScroll() && o > 0 && (enyo.dom.transformValue(this.$.pulldown, this.translation, "0," + o + "px" + (this.accel ? ",0" : "")), 
            this.firedPullStart || (this.firedPullStart = !0, this.pullStart(), this.pullHeight = this.$.pulldown.getBounds().height), 
            o > this.pullHeight && !this.firedPull && (this.firedPull = !0, this.firedPullCancel = !1, 
            this.pull()), this.firedPull && !this.firedPullCancel && this.pullHeight > o && (this.firedPullCancel = !0, 
            this.firedPull = !1, this.pullCancel())), e;
        };
    }),
    scrollStopHandler: function() {
        this.completingPull && (this.completingPull = !1, this.doPullComplete());
    },
    dragfinish: function() {
        if (this.firedPull) {
            var t = this.getStrategy().$.scrollMath || this.getStrategy();
            t.setScrollY(-1 * this.getScrollTop() - this.pullHeight), this.pullRelease();
        }
    },
    completePull: function() {
        this.completingPull = !0;
        var t = this.getStrategy().$.scrollMath || this.getStrategy();
        t.setScrollY(this.pullHeight), t.start();
    },
    pullStart: function() {
        this.setPulling(), this.pully.setShowing(!1), this.$.puller.setShowing(!0), this.doPullStart();
    },
    pull: function() {
        this.setPulled(), this.doPull();
    },
    pullCancel: function() {
        this.setPulling(), this.doPullCancel();
    },
    pullRelease: function() {
        this.$.puller.setShowing(!1), this.pully.setShowing(!0), this.doPullRelease();
    },
    setPulling: function() {
        this.$.puller.setText(this.pullingMessage), this.$.puller.setIconClass(this.pullingIconClass);
    },
    setPulled: function() {
        this.$.puller.setText(this.pulledMessage), this.$.puller.setIconClass(this.pulledIconClass);
    }
}), enyo.kind({
    name: "enyo.Puller",
    classes: "enyo-puller",
    published: {
        text: "",
        iconClass: ""
    },
    events: {
        onCreate: ""
    },
    components: [ {
        name: "icon"
    }, {
        name: "text",
        tag: "span",
        classes: "enyo-puller-text"
    } ],
    create: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.doCreate(), this.textChanged(), this.iconClassChanged();
        };
    }),
    textChanged: function() {
        this.$.text.setContent(this.text);
    },
    iconClassChanged: function() {
        this.$.icon.setClasses(this.iconClass);
    }
});

// list/source/AroundList.js
enyo.kind({
    name: "enyo.AroundList",
    kind: "enyo.List",
    listTools: [ {
        name: "port",
        classes: "enyo-list-port enyo-border-box",
        components: [ {
            name: "aboveClient"
        }, {
            name: "generator",
            kind: "FlyweightRepeater",
            canGenerate: !1,
            components: [ {
                tag: null,
                name: "client"
            } ]
        }, {
            name: "holdingarea",
            allowHtml: !0,
            classes: "enyo-list-holdingarea"
        }, {
            name: "page0",
            allowHtml: !0,
            classes: "enyo-list-page"
        }, {
            name: "page1",
            allowHtml: !0,
            classes: "enyo-list-page"
        }, {
            name: "belowClient"
        }, {
            name: "placeholder"
        }, {
            name: "swipeableComponents",
            style: "position:absolute; display:block; top:-1000px; left:0px;"
        } ]
    } ],
    aboveComponents: null,
    initComponents: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.aboveComponents && this.$.aboveClient.createComponents(this.aboveComponents, {
                owner: this.owner
            }), this.belowComponents && this.$.belowClient.createComponents(this.belowComponents, {
                owner: this.owner
            });
        };
    }),
    updateMetrics: function() {
        this.defaultPageSize = this.rowsPerPage * (this.rowSize || 100), this.pageCount = Math.ceil(this.count / this.rowsPerPage), 
        this.aboveHeight = this.$.aboveClient.getBounds().height, this.belowHeight = this.$.belowClient.getBounds().height, 
        this.portSize = this.aboveHeight + this.belowHeight;
        for (var t = 0; this.pageCount > t; t++) this.portSize += this.getPageSize(t);
        this.adjustPortSize();
    },
    positionPage: function(t, e) {
        e.pageNo = t;
        var i = this.pageToPosition(t), o = this.bottomUp ? this.belowHeight : this.aboveHeight;
        i += o, e.applyStyle(this.pageBound, i + "px");
    },
    scrollToContentStart: function() {
        var t = this.bottomUp ? this.belowHeight : this.aboveHeight;
        this.setScrollPosition(t);
    }
});

// list/source/GridFlyweightRepeater.js
enyo.kind({
    name: "enyo.GridFlyWeightRepeater",
    kind: "enyo.FlyweightRepeater",
    events: {
        onSizeupItem: ""
    },
    itemsPerRow: 0,
    _itemsFromPreviousPage: 0,
    generateChildHtml: function() {
        return this.itemFluidWidth || this.itemFixedSize ? this._generateChildHtmlEqualSizedItems() : this._generateChildHtmlVariableSizedItems();
    },
    _generateChildHtmlEqualSizedItems: function() {
        var t = this.owner.hasNode().clientWidth, e = this.$.client, i = "", o = 0, n = this.itemWidth, s = this.itemHeight;
        if (this.itemFluidWidth) {
            o = 100 / this.itemsPerRow;
            var r = 0;
            this.itemSpacing >= 0 && (r = (this.itemsPerRow + 1) * this.itemSpacing, o = 100 / this.itemsPerRow - 100 * r / (this.itemsPerRow * t)), 
            n = o / 100 * t, s = n * (this.itemHeight / this.itemWidth);
        }
        for (var h = this.rowOffset; this.rowOffset + this.count > h; h++) e.setAttribute("data-enyo-index", h), 
        this.doSetupItem({
            index: h,
            selected: this.isSelected(h)
        }), this.itemFluidWidth ? e.addStyles("width:" + o + "%;height:" + s + "px;") : e.addStyles("width:" + this.itemWidth + "px;height:" + this.itemHeight + "px;"), 
        this.itemSpacing >= 0 && (e.addStyles("margin-top:" + this.itemSpacing + "px; margin-left:" + this.itemSpacing + "px;"), 
        h % this.itemsPerRow == this.itemsPerRow - 1 ? e.addStyles("margin-right:" + this.itemSpacing + "px;") : e.addStyles("margin-right: 0px;"), 
        h >= this.count - this.itemsPerRow && e.addStyles("margin-bottom:" + this.itemSpacing + "px;")), 
        i += e.generateHtml(), e.teardownRender();
        return i;
    },
    _generateChildHtmlVariableSizedItems: function() {
        this.index = null;
        var t, e, i = null, o = this.$.client, n = this.owner.hasNode().clientWidth, s = 0, r = 0, h = 0, a = 0, l = 0, d = 0, g = 0, p = 0, c = 0, u = this.itemMinWidth / this.itemMinHeight, f = [ {
            index: 0,
            items: []
        } ], m = this.owner.$._dummy_.hasNode();
        0 === this.owner.page && (this._itemsFromPreviousPage = 0);
        var w = this.count + this._itemsFromPreviousPage;
        for (t = 0, e = t + this.rowOffset - this._itemsFromPreviousPage; w > t; t++, e++) {
            p = 0, c = 0, this.doSizeupItem({
                index: e,
                selected: this.isSelected(e)
            }), p = this.itemWidth, c = this.itemHeight, (!p || 0 >= p) && (this.doSetupItem({
                index: e,
                selected: this.isSelected(e)
            }), m.innerHTML = o.generateChildHtml(), p = m.clientWidth, c = m.clientHeight), 
            (!p || 0 >= p) && (p = this.itemMinWidth, c = this.itemMinHeight), (!c || 0 >= c) && (c = this.itemMinHeight), 
            u = p / c, s = Math.min(p, n), this.itemMinWidth && this.itemMinWidth > 0 && (s = Math.max(p, this.itemMinWidth));
            var S = t == w - 1;
            if (h = s / u, r += s, a += h, i = {
                index: e,
                pageIndex: t,
                width: s,
                height: h
            }, f[g].items.push(i), this.normalizeRows && (l = r / f[g].items.length, d = a / f[g].items.length, 
            r >= n || S)) {
                f[g].avgHeight = d, f[g].index = g;
                var y = f[g].items.length, P = (n - r) / y;
                if (this._itemsFromPreviousPage = 0, S && P + l > 1.5 * l) {
                    this._itemsFromPreviousPage = y, f[g] = {
                        avgHeight: 0,
                        index: g,
                        items: []
                    };
                    break;
                }
                this._normalizeRow(f[g]), S || (g++, f[g] = {
                    avgHeight: 0,
                    index: 0,
                    items: []
                }), r = a = d = l = s = h = p = c = 0;
            }
        }
        m.innerHTML = "";
        var R, C = "", v = "";
        for (t = 0; f.length > t; t++) if (R = f[t], R.items && 0 !== R.items.length) for (var b = 0; R.items.length > b; b++) i = R.items[b], 
        this.doSetupItem({
            index: i.index,
            selected: this.isSelected(i.index)
        }), o.setAttribute("data-enyo-index", i.index), o.addStyles("width:" + i.width + "px;height:" + i.height + "px;"), 
        this.itemSpacing >= 0 && o.addStyles("margin-top:" + this.itemSpacing + "px;margin-left:" + this.itemSpacing + "px;"), 
        v = o.generateHtml(), o.teardownRender(), C += v;
        return C;
    },
    _normalizeRow: function(t) {
        if (this.normalizeRows && t.items && 0 !== t.items.length) {
            var e, i, o = this.owner.hasNode().clientWidth, n = 0, s = 0, r = "", h = 0, a = 0, l = 0, d = 0;
            for (i = 0; t.items.length > i; i++) e = t.items[i], h = e.width, a = e.height, 
            s = Math.floor(t.avgHeight / a * h), r += " " + s, e.width = s, e.height = t.avgHeight, 
            n += s, this.itemSpacing >= 0 && (n += this.itemSpacing, i == t.items.length - 1 && (n += this.itemSpacing));
            for (d = o - n, l = o / (o - d), n = 0, s = 0, r = "", i = 0; t.items.length > i; i++) {
                e = t.items[i], h = e.width, a = e.height, s = Math.floor(h * l), r += " " + s;
                var g = Math.floor(a * l);
                e.width = s, e.height = g, n += s, this.itemSpacing >= 0 && (n += this.itemSpacing, 
                i == t.items.length - 1 && (n += this.itemSpacing));
            }
            d = o - n, e = t.items[t.items.length - 1], h = e.width, a = e.height, e.width = h + d, 
            e.height = a;
        }
    }
});

// list/source/GridList.js
enyo.kind({
    name: "enyo.GridList",
    kind: "enyo.List",
    classes: "enyo-gridlist",
    published: {
        itemFluidWidth: !1,
        itemFixedSize: !1,
        itemMinWidth: 160,
        itemMinHeight: 160,
        itemWidth: 160,
        itemHeight: 160,
        itemSpacing: 0,
        normalizeRows: !1
    },
    horizontal: "hidden",
    events: {
        onSizeupItem: ""
    },
    show: function(t) {
        this._calculateItemsPerRow(), this.setCount(t), this.reset();
    },
    create: enyo.inherit(function(t) {
        return function() {
            this._setComponents(), t.apply(this, arguments), this.itemFluidWidthChanged(), this.itemFixedSizeChanged(), 
            this.itemMinWidthChanged(), this.itemMinHeightChanged(), this.itemWidthChanged(), 
            this.itemHeightChanged(), this.itemSpacingChanged(), this.normalizeRowsChanged(), 
            this.$.generator.setClientClasses("enyo-gridlist-row");
        };
    }),
    itemFluidWidthChanged: function() {
        this.$.generator.itemFluidWidth = this.itemFluidWidth, this.setNormalizeRows(!this.itemFluidWidth && !this.itemFixedSize);
    },
    itemFixedSizeChanged: function() {
        this.$.generator.itemFixedSize = this.itemFixedSize, this.setNormalizeRows(!this.itemFluidWidth && !this.itemFixedSize);
    },
    itemWidthChanged: function() {
        this.$.generator.itemWidth = this.itemWidth;
    },
    itemHeightChanged: function() {
        this.$.generator.itemHeight = this.itemHeight;
    },
    itemMinWidthChanged: function() {
        var t = this.hasNode();
        t && (this.itemMinWidth || (this.itemMinWidth = 160), this.itemMinWidth = Math.min(this.itemMinWidth, t.clientWidth)), 
        this.$.generator.itemMinWidth = this.itemMinWidth;
    },
    itemMinHeightChanged: function() {
        var t = this.hasNode();
        t && (this.itemMinHeight || (this.itemMinHeight = 160), this.itemMinHeight = Math.min(this.itemMinHeight, t.clientHeight)), 
        this.$.generator.itemMinHeight = this.itemMinHeight;
    },
    itemSpacingChanged: function() {
        0 > this.itemSpacing && (this.itemSpacing = 0), this.itemSpacing = this.itemSpacing, 
        this.$.generator.itemSpacing = this.itemSpacing;
    },
    normalizeRowsChanged: function() {
        this.$.generator.normalizeRows = this.normalizeRows;
    },
    bottomUpChanged: function() {
        this.bottomUp = !1, this.pageBound = "top";
    },
    reflow: enyo.inherit(function(t) {
        return function() {
            this._calculateItemsPerRow(), t.apply(this, arguments);
        };
    }),
    _calculateItemsPerRow: function() {
        var t = this.hasNode();
        if (t) {
            this.itemsPerRow = Math.floor((t.clientWidth - this.itemSpacing) / (this.itemMinWidth + this.itemSpacing));
            var e = Math.round((t.clientHeight - this.itemSpacing) / (this.itemMinHeight + this.itemSpacing));
            if (this.itemFixedSize || this.itemFluidWidth) {
                var i = Math.floor((t.clientWidth - this.itemSpacing) / (this.itemWidth + this.itemSpacing)), o = Math.floor(i), n = Math.ceil(i), s = t.clientWidth - this.itemSpacing - n * (this.itemWidth + this.itemSpacing);
                this.itemsPerRow = s > 0 ? n : o, e = Math.round((t.clientHeight - this.itemSpacing) / (this.itemHeight + this.itemSpacing));
            }
            this.itemsPerRow = Math.max(1, this.itemsPerRow), this.rowsPerPage = 3 * this.itemsPerRow * e, 
            this.$.generator.itemsPerRow = this.itemsPerRow;
        }
    },
    _setComponents: function() {
        this.listTools = enyo.clone(this.listTools), this.listTools[0] = enyo.clone(this.listTools[0]), 
        this.listTools[0].components = enyo.clone(this.listTools[0].components);
        var t = this.listTools[0].components;
        this.createComponent(new enyo.Component({
            name: "_dummy_",
            allowHtml: !0,
            classes: "enyo-gridlist-dummy",
            showing: !1
        }, {
            owner: this
        }));
        for (var e = 0; t.length > e; e++) if ("generator" == t[e].name) return t[e] = enyo.clone(t[e]), 
        t[e].kind = "enyo.GridFlyWeightRepeater", void 0;
    }
});

// list/source/GridListImageItem.js
enyo.kind({
    name: "enyo.GridListImageItem",
    classes: "enyo-gridlist-imageitem",
    components: [ {
        name: "image",
        kind: "enyo.Image"
    }, {
        name: "caption",
        classes: "caption"
    }, {
        name: "subCaption",
        classes: "sub-caption"
    } ],
    published: {
        source: "",
        caption: "",
        subCaption: "",
        selected: !1
    },
    bindings: [ {
        from: ".source",
        to: ".$.image.src"
    }, {
        from: ".caption",
        to: ".$.caption.content"
    }, {
        from: ".caption",
        to: ".$.caption.showing",
        kind: "enyo.EmptyBinding"
    }, {
        from: ".subCaption",
        to: ".$.subCaption.content"
    }, {
        from: ".subCaption",
        to: ".$.subCaption.showing",
        kind: "enyo.EmptyBinding"
    } ],
    create: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.selectedChanged();
        };
    }),
    selectedChanged: function() {
        this.addRemoveClass("selected", this.selected);
    },
    disabledChanged: function() {
        this.addRemoveClass("disabled", this.disabled);
    }
});

// slideable/source/Slideable.js
enyo.kind({
    name: "enyo.Slideable",
    kind: "Control",
    published: {
        axis: "h",
        value: 0,
        unit: "px",
        min: 0,
        max: 0,
        accelerated: "auto",
        overMoving: !0,
        draggable: !0
    },
    events: {
        onAnimateFinish: "",
        onChange: ""
    },
    preventDragPropagation: !1,
    tools: [ {
        kind: "Animator",
        onStep: "animatorStep",
        onEnd: "animatorComplete"
    } ],
    handlers: {
        ondragstart: "dragstart",
        ondrag: "drag",
        ondragfinish: "dragfinish"
    },
    kDragScalar: 1,
    dragEventProp: "dx",
    unitModifier: !1,
    canTransform: !1,
    create: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.acceleratedChanged(), this.transformChanged(), this.axisChanged(), 
            this.valueChanged(), this.addClass("enyo-slideable");
        };
    }),
    initComponents: enyo.inherit(function(t) {
        return function() {
            this.createComponents(this.tools), t.apply(this, arguments);
        };
    }),
    rendered: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.canModifyUnit(), this.updateDragScalar();
        };
    }),
    resizeHandler: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.updateDragScalar();
        };
    }),
    canModifyUnit: function() {
        if (!this.canTransform) {
            var t = this.getInitialStyleValue(this.hasNode(), this.boundary);
            t.match(/px/i) && "%" === this.unit && (this.unitModifier = this.getBounds()[this.dimension]);
        }
    },
    getInitialStyleValue: function(t, e) {
        var i = enyo.dom.getComputedStyle(t);
        return i ? i.getPropertyValue(e) : t && t.currentStyle ? t.currentStyle[e] : "0";
    },
    updateBounds: function(t, e) {
        var i = {};
        i[this.boundary] = t, this.setBounds(i, this.unit), this.setInlineStyles(t, e);
    },
    updateDragScalar: function() {
        if ("%" == this.unit) {
            var t = this.getBounds()[this.dimension];
            this.kDragScalar = t ? 100 / t : 1, this.canTransform || this.updateBounds(this.value, 100);
        }
    },
    transformChanged: function() {
        this.canTransform = enyo.dom.canTransform();
    },
    acceleratedChanged: function() {
        (!enyo.platform.android || 2 >= enyo.platform.android) && enyo.dom.accelerate(this, this.accelerated);
    },
    axisChanged: function() {
        var t = "h" == this.axis;
        this.dragMoveProp = t ? "dx" : "dy", this.shouldDragProp = t ? "horizontal" : "vertical", 
        this.transform = t ? "translateX" : "translateY", this.dimension = t ? "width" : "height", 
        this.boundary = t ? "left" : "top";
    },
    setInlineStyles: function(t, e) {
        var i = {};
        this.unitModifier ? (i[this.boundary] = this.percentToPixels(t, this.unitModifier), 
        i[this.dimension] = this.unitModifier, this.setBounds(i)) : (e ? i[this.dimension] = e : i[this.boundary] = t, 
        this.setBounds(i, this.unit));
    },
    valueChanged: function(t) {
        var e = this.value;
        this.isOob(e) && !this.isAnimating() && (this.value = this.overMoving ? this.dampValue(e) : this.clampValue(e)), 
        enyo.platform.android > 2 && (this.value ? (0 === t || void 0 === t) && enyo.dom.accelerate(this, this.accelerated) : enyo.dom.accelerate(this, !1)), 
        this.canTransform ? enyo.dom.transformValue(this, this.transform, this.value + this.unit) : this.setInlineStyles(this.value, !1), 
        this.doChange();
    },
    getAnimator: function() {
        return this.$.animator;
    },
    isAtMin: function() {
        return this.value <= this.calcMin();
    },
    isAtMax: function() {
        return this.value >= this.calcMax();
    },
    calcMin: function() {
        return this.min;
    },
    calcMax: function() {
        return this.max;
    },
    clampValue: function(t) {
        var e = this.calcMin(), i = this.calcMax();
        return Math.max(e, Math.min(t, i));
    },
    dampValue: function(t) {
        return this.dampBound(this.dampBound(t, this.min, 1), this.max, -1);
    },
    dampBound: function(t, e, i) {
        var o = t;
        return e * i > o * i && (o = e + (o - e) / 4), o;
    },
    percentToPixels: function(t, e) {
        return Math.floor(e / 100 * t);
    },
    pixelsToPercent: function(t) {
        var e = this.unitModifier ? this.getBounds()[this.dimension] : this.container.getBounds()[this.dimension];
        return 100 * (t / e);
    },
    shouldDrag: function(t) {
        return this.draggable && t[this.shouldDragProp];
    },
    isOob: function(t) {
        return t > this.calcMax() || this.calcMin() > t;
    },
    dragstart: function(t, e) {
        return this.shouldDrag(e) ? (e.preventDefault(), this.$.animator.stop(), e.dragInfo = {}, 
        this.dragging = !0, this.drag0 = this.value, this.dragd0 = 0, this.preventDragPropagation) : void 0;
    },
    drag: function(t, e) {
        if (this.dragging) {
            e.preventDefault();
            var i = this.canTransform ? e[this.dragMoveProp] * this.kDragScalar : this.pixelsToPercent(e[this.dragMoveProp]), o = this.drag0 + i, n = i - this.dragd0;
            return this.dragd0 = i, n && (e.dragInfo.minimizing = 0 > n), this.setValue(o), 
            this.preventDragPropagation;
        }
    },
    dragfinish: function(t, e) {
        return this.dragging ? (this.dragging = !1, this.completeDrag(e), e.preventTap(), 
        this.preventDragPropagation) : void 0;
    },
    completeDrag: function(t) {
        this.value !== this.calcMax() && this.value != this.calcMin() && this.animateToMinMax(t.dragInfo.minimizing);
    },
    isAnimating: function() {
        return this.$.animator.isAnimating();
    },
    play: function(t, e) {
        this.$.animator.play({
            startValue: t,
            endValue: e,
            node: this.hasNode()
        });
    },
    animateTo: function(t) {
        this.play(this.value, t);
    },
    animateToMin: function() {
        this.animateTo(this.calcMin());
    },
    animateToMax: function() {
        this.animateTo(this.calcMax());
    },
    animateToMinMax: function(t) {
        t ? this.animateToMin() : this.animateToMax();
    },
    animatorStep: function(t) {
        return this.setValue(t.value), !0;
    },
    animatorComplete: function(t) {
        return this.doAnimateFinish(t), !0;
    },
    toggleMinMax: function() {
        this.animateToMinMax(!this.isAtMin());
    }
});

// panels/source/arrangers/Arranger.js
enyo.kind({
    name: "enyo.Arranger",
    kind: "Layout",
    layoutClass: "enyo-arranger",
    accelerated: "auto",
    dragProp: "ddx",
    dragDirectionProp: "xDirection",
    canDragProp: "horizontal",
    incrementalPoints: !1,
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) e._arranger = null;
            t.apply(this, arguments);
        };
    }),
    arrange: function() {},
    size: function() {},
    start: function() {
        var t = this.container.fromIndex, e = this.container.toIndex, i = this.container.transitionPoints = [ t ];
        if (this.incrementalPoints) for (var n = Math.abs(e - t) - 2, o = t; n >= 0; ) o += t > e ? -1 : 1, 
        i.push(o), n--;
        i.push(this.container.toIndex);
    },
    finish: function() {},
    calcArrangementDifference: function() {},
    canDragEvent: function(t) {
        return t[this.canDragProp];
    },
    calcDragDirection: function(t) {
        return t[this.dragDirectionProp];
    },
    calcDrag: function(t) {
        return t[this.dragProp];
    },
    drag: function(t, e, i, n, o) {
        var s = this.measureArrangementDelta(-t, e, i, n, o);
        return s;
    },
    measureArrangementDelta: function(t, e, i, n, o) {
        var s = this.calcArrangementDifference(e, i, n, o), r = s ? t / Math.abs(s) : 0;
        return r *= this.container.fromIndex > this.container.toIndex ? -1 : 1;
    },
    _arrange: function(t) {
        this.containerBounds || this.reflow();
        var e = this.getOrderedControls(t);
        this.arrange(e, t);
    },
    arrangeControl: function(t, e) {
        t._arranger = enyo.mixin(t._arranger || {}, e);
    },
    flow: function() {
        this.c$ = [].concat(this.container.getPanels()), this.controlsIndex = 0;
        for (var t, e = 0, i = this.container.getPanels(); t = i[e]; e++) if (enyo.dom.accelerate(t, !t.preventAccelerate && this.accelerated), 
        enyo.platform.safari) for (var n, o = t.children, s = 0; n = o[s]; s++) enyo.dom.accelerate(n, this.accelerated);
    },
    reflow: function() {
        var t = this.container.hasNode();
        this.containerBounds = t ? {
            width: t.clientWidth,
            height: t.clientHeight
        } : {}, this.size();
    },
    flowArrangement: function() {
        var t = this.container.arrangement;
        if (t) for (var e, i = 0, n = this.container.getPanels(); (e = n[i]) && t[i]; i++) this.flowControl(e, t[i]);
    },
    flowControl: function(t, e) {
        enyo.Arranger.positionControl(t, e);
        var i = e.opacity;
        null != i && enyo.Arranger.opacifyControl(t, i);
    },
    getOrderedControls: function(t) {
        for (var e = Math.floor(t), i = e - this.controlsIndex, n = i > 0, o = this.c$ || [], s = 0; Math.abs(i) > s; s++) n ? o.push(o.shift()) : o.unshift(o.pop());
        return this.controlsIndex = e, o;
    },
    statics: {
        positionControl: function(t, e, i) {
            var n = i || "px";
            if (!this.updating) if (!enyo.dom.canTransform() || t.preventTransform || enyo.platform.android || 10 === enyo.platform.ie) enyo.dom.canTransform() && t.preventTransform && enyo.dom.transform(t, {
                translateX: null,
                translateY: null
            }), t.setBounds(e, i); else {
                var o = e.left, s = e.top;
                o = enyo.isString(o) ? o : o && o + n, s = enyo.isString(s) ? s : s && s + n, enyo.dom.transform(t, {
                    translateX: o || null,
                    translateY: s || null
                });
            }
        },
        opacifyControl: function(t, e) {
            var i = e;
            i = i > .99 ? 1 : .01 > i ? 0 : i, 9 > enyo.platform.ie ? t.applyStyle("filter", "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + 100 * i + ")") : t.applyStyle("opacity", i);
        }
    }
});

// panels/source/arrangers/CardArranger.js
enyo.kind({
    name: "enyo.CardArranger",
    kind: "Arranger",
    layoutClass: "enyo-arranger enyo-arranger-fit",
    calcArrangementDifference: function() {
        return this.containerBounds.width;
    },
    arrange: function(t) {
        for (var e, i, n = 0; e = t[n]; n++) i = 0 === n ? 1 : 0, this.arrangeControl(e, {
            opacity: i
        });
    },
    start: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments);
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) {
                var o = e.showing;
                e.setShowing(n == this.container.fromIndex || n == this.container.toIndex), e.showing && !o && e.resized();
            }
        };
    }),
    finish: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments);
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) e.setShowing(n == this.container.toIndex);
        };
    }),
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) enyo.Arranger.opacifyControl(e, 1), 
            e.showing || e.setShowing(!0);
            t.apply(this, arguments);
        };
    })
});

// panels/source/arrangers/CardSlideInArranger.js
enyo.kind({
    name: "enyo.CardSlideInArranger",
    kind: "CardArranger",
    start: function() {
        for (var t, e = this.container.getPanels(), i = 0; t = e[i]; i++) {
            var n = t.showing;
            t.setShowing(i == this.container.fromIndex || i == this.container.toIndex), t.showing && !n && t.resized();
        }
        var o = this.container.fromIndex;
        i = this.container.toIndex, this.container.transitionPoints = [ i + "." + o + ".s", i + "." + o + ".f" ];
    },
    finish: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments);
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) e.setShowing(n == this.container.toIndex);
        };
    }),
    arrange: function(t, e) {
        for (var i, n, o = e.split("."), s = o[0], r = o[1], a = "s" == o[2], h = this.containerBounds.width, l = 0, d = this.container.getPanels(); i = d[l]; l++) n = h, 
        r == l && (n = a ? 0 : -h), s == l && (n = a ? h : 0), r == l && r == s && (n = 0), 
        this.arrangeControl(i, {
            left: n
        });
    },
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) enyo.Arranger.positionControl(e, {
                left: null
            });
            t.apply(this, arguments);
        };
    })
});

// panels/source/arrangers/CarouselArranger.js
enyo.kind({
    name: "enyo.CarouselArranger",
    kind: "Arranger",
    size: function() {
        var t, e, i, n, o, s = this.container.getPanels(), r = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, a = this.containerBounds;
        a.height -= r.top + r.bottom, a.width -= r.left + r.right;
        var h;
        for (t = 0, i = 0; o = s[t]; t++) n = enyo.dom.calcMarginExtents(o.hasNode()), o.width = o.getBounds().width, 
        o.marginWidth = n.right + n.left, i += (o.fit ? 0 : o.width) + o.marginWidth, o.fit && (h = o);
        if (h) {
            var l = a.width - i;
            h.width = l >= 0 ? l : h.width;
        }
        for (t = 0, e = r.left; o = s[t]; t++) o.setBounds({
            top: r.top,
            bottom: r.bottom,
            width: o.fit ? o.width : null
        });
    },
    arrange: function(t, e) {
        this.container.wrap ? this.arrangeWrap(t, e) : this.arrangeNoWrap(t, e);
    },
    arrangeNoWrap: function(t, e) {
        var i, n, o, s, r = this.container.getPanels(), a = this.container.clamp(e), h = this.containerBounds.width;
        for (i = a, o = 0; (s = r[i]) && (o += s.width + s.marginWidth, !(o > h)); i++) ;
        var l = h - o, d = 0;
        if (l > 0) for (i = a - 1, n = 0; s = r[i]; i--) if (n += s.width + s.marginWidth, 
        0 >= l - n) {
            d = l - n, a = i;
            break;
        }
        var c, g;
        for (i = 0, g = this.containerPadding.left + d; s = r[i]; i++) c = s.width + s.marginWidth, 
        a > i ? this.arrangeControl(s, {
            left: -c
        }) : (this.arrangeControl(s, {
            left: Math.floor(g)
        }), g += c);
    },
    arrangeWrap: function(t) {
        for (var e, i = 0, n = this.containerPadding.left; e = t[i]; i++) this.arrangeControl(e, {
            left: n
        }), n += e.width + e.marginWidth;
    },
    calcArrangementDifference: function(t, e, i, n) {
        var o = Math.abs(t % this.c$.length);
        return e[o].left - n[o].left;
    },
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) enyo.Arranger.positionControl(e, {
                left: null,
                top: null
            }), e.applyStyle("top", null), e.applyStyle("bottom", null), e.applyStyle("left", null), 
            e.applyStyle("width", null);
            t.apply(this, arguments);
        };
    })
});

// panels/source/arrangers/CollapsingArranger.js
enyo.kind({
    name: "enyo.CollapsingArranger",
    kind: "CarouselArranger",
    peekWidth: 0,
    size: enyo.inherit(function(t) {
        return function() {
            this.clearLastSize(), t.apply(this, arguments);
        };
    }),
    clearLastSize: function() {
        for (var t, e = 0, i = this.container.getPanels(); t = i[e]; e++) t._fit && e != i.length - 1 && (t.applyStyle("width", null), 
        t._fit = null);
    },
    constructor: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.peekWidth = null != this.container.peekWidth ? this.container.peekWidth : this.peekWidth;
        };
    }),
    arrange: function(t, e) {
        for (var i, n = this.container.getPanels(), o = 0, s = this.containerPadding.left, r = 0; i = n[o]; o++) i.getShowing() ? (this.arrangeControl(i, {
            left: s + r * this.peekWidth
        }), o >= e && (s += i.width + i.marginWidth - this.peekWidth), r++) : (this.arrangeControl(i, {
            left: s
        }), o >= e && (s += i.width + i.marginWidth)), o == n.length - 1 && 0 > e && this.arrangeControl(i, {
            left: s - e
        });
    },
    calcArrangementDifference: function(t, e, i, n) {
        var o = this.container.getPanels().length - 1;
        return Math.abs(n[o].left - e[o].left);
    },
    flowControl: enyo.inherit(function(t) {
        return function(e, i) {
            if (t.apply(this, arguments), this.container.realtimeFit) {
                var n = this.container.getPanels(), o = n.length - 1, s = n[o];
                e == s && this.fitControl(e, i.left);
            }
        };
    }),
    finish: enyo.inherit(function(t) {
        return function() {
            if (t.apply(this, arguments), !this.container.realtimeFit && this.containerBounds) {
                var e = this.container.getPanels(), i = this.container.arrangement, n = e.length - 1, o = e[n];
                this.fitControl(o, i[n].left);
            }
        };
    }),
    fitControl: function(t, e) {
        t._fit = !0, t.applyStyle("width", this.containerBounds.width - e + "px"), t.resized();
    }
});

// panels/source/arrangers/DockRightArranger.js
enyo.kind({
    name: "enyo.DockRightArranger",
    kind: "Arranger",
    basePanel: !1,
    overlap: 0,
    layoutWidth: 0,
    constructor: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.overlap = null != this.container.overlap ? this.container.overlap : this.overlap, 
            this.layoutWidth = null != this.container.layoutWidth ? this.container.layoutWidth : this.layoutWidth;
        };
    }),
    size: function() {
        var t, e, i, n = this.container.getPanels(), o = this.containerPadding = this.container.hasNode() ? enyo.dom.calcPaddingExtents(this.container.node) : {}, s = this.containerBounds;
        s.width -= o.left + o.right;
        var r, a = s.width, h = n.length;
        for (this.container.transitionPositions = {}, t = 0; i = n[t]; t++) i.width = 0 === t && this.container.basePanel ? a : i.getBounds().width;
        for (t = 0; i = n[t]; t++) {
            0 === t && this.container.basePanel && i.setBounds({
                width: a
            }), i.setBounds({
                top: o.top,
                bottom: o.bottom
            });
            for (var l = 0; i = n[l]; l++) {
                var d;
                if (0 === t && this.container.basePanel) d = 0; else if (t > l) d = a; else {
                    if (t !== l) break;
                    r = a > this.layoutWidth ? this.overlap : 0, d = a - n[t].width + r;
                }
                this.container.transitionPositions[t + "." + l] = d;
            }
            if (h > l) for (var c = !1, g = t + 1; h > g; g++) {
                if (r = 0, c) r = 0; else if (n[t].width + n[g].width - this.overlap > a) r = 0, 
                c = !0; else {
                    for (r = n[t].width - this.overlap, e = t; g > e; e++) {
                        var u = r + n[e + 1].width - this.overlap;
                        if (!(a > u)) {
                            r = a;
                            break;
                        }
                        r = u;
                    }
                    r = a - r;
                }
                this.container.transitionPositions[t + "." + g] = r;
            }
        }
    },
    arrange: function(t, e) {
        var i, n, o = this.container.getPanels(), s = this.container.clamp(e);
        for (i = 0; n = o[i]; i++) {
            var r = this.container.transitionPositions[i + "." + s];
            this.arrangeControl(n, {
                left: r
            });
        }
    },
    calcArrangementDifference: function(t, e, i) {
        var n = this.container.getPanels(), o = i > t ? n[i].width : n[t].width;
        return o;
    },
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) enyo.Arranger.positionControl(e, {
                left: null,
                top: null
            }), e.applyStyle("top", null), e.applyStyle("bottom", null), e.applyStyle("left", null), 
            e.applyStyle("width", null);
            t.apply(this, arguments);
        };
    })
});

// panels/source/arrangers/OtherArrangers.js
enyo.kind({
    name: "enyo.LeftRightArranger",
    kind: "Arranger",
    margin: 40,
    axisSize: "width",
    offAxisSize: "height",
    axisPosition: "left",
    constructor: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.margin = null != this.container.margin ? this.container.margin : this.margin;
        };
    }),
    size: function() {
        for (var t, e, i = this.container.getPanels(), n = this.containerBounds[this.axisSize], o = n - this.margin - this.margin, s = 0; e = i[s]; s++) t = {}, 
        t[this.axisSize] = o, t[this.offAxisSize] = "100%", e.setBounds(t);
    },
    start: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments);
            for (var e, i = this.container.fromIndex, n = this.container.toIndex, o = this.getOrderedControls(n), s = Math.floor(o.length / 2), r = 0; e = o[r]; r++) i > n ? r == o.length - s ? e.applyStyle("z-index", 0) : e.applyStyle("z-index", 1) : r == o.length - 1 - s ? e.applyStyle("z-index", 0) : e.applyStyle("z-index", 1);
        };
    }),
    arrange: function(t, e) {
        var i, n, o;
        if (1 == this.container.getPanels().length) return o = {}, o[this.axisPosition] = this.margin, 
        this.arrangeControl(this.container.getPanels()[0], o), void 0;
        var s = Math.floor(this.container.getPanels().length / 2), r = this.getOrderedControls(Math.floor(e) - s), a = this.containerBounds[this.axisSize] - this.margin - this.margin, h = this.margin - a * s;
        for (i = 0; n = r[i]; i++) o = {}, o[this.axisPosition] = h, this.arrangeControl(n, o), 
        h += a;
    },
    calcArrangementDifference: function(t, e, i, n) {
        if (1 == this.container.getPanels().length) return 0;
        var o = Math.abs(t % this.c$.length);
        return e[o][this.axisPosition] - n[o][this.axisPosition];
    },
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) enyo.Arranger.positionControl(e, {
                left: null,
                top: null
            }), enyo.Arranger.opacifyControl(e, 1), e.applyStyle("left", null), e.applyStyle("top", null), 
            e.applyStyle("height", null), e.applyStyle("width", null);
            t.apply(this, arguments);
        };
    })
}), enyo.kind({
    name: "enyo.TopBottomArranger",
    kind: "LeftRightArranger",
    dragProp: "ddy",
    dragDirectionProp: "yDirection",
    canDragProp: "vertical",
    axisSize: "height",
    offAxisSize: "width",
    axisPosition: "top"
}), enyo.kind({
    name: "enyo.SpiralArranger",
    kind: "Arranger",
    incrementalPoints: !0,
    inc: 20,
    size: function() {
        for (var t, e = this.container.getPanels(), i = this.containerBounds, n = this.controlWidth = i.width / 3, o = this.controlHeight = i.height / 3, s = 0; t = e[s]; s++) t.setBounds({
            width: n,
            height: o
        });
    },
    arrange: function(t) {
        for (var e, i = this.inc, n = 0, o = t.length; e = t[n]; n++) {
            var s = Math.cos(2 * (n / o) * Math.PI) * n * i + this.controlWidth, r = Math.sin(2 * (n / o) * Math.PI) * n * i + this.controlHeight;
            this.arrangeControl(e, {
                left: s,
                top: r
            });
        }
    },
    start: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments);
            for (var e, i = this.getOrderedControls(this.container.toIndex), n = 0; e = i[n]; n++) e.applyStyle("z-index", i.length - n);
        };
    }),
    calcArrangementDifference: function() {
        return this.controlWidth;
    },
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) e.applyStyle("z-index", null), 
            enyo.Arranger.positionControl(e, {
                left: null,
                top: null
            }), e.applyStyle("left", null), e.applyStyle("top", null), e.applyStyle("height", null), 
            e.applyStyle("width", null);
            t.apply(this, arguments);
        };
    })
}), enyo.kind({
    name: "enyo.GridArranger",
    kind: "Arranger",
    incrementalPoints: !0,
    colWidth: 100,
    colHeight: 100,
    size: function() {
        for (var t, e = this.container.getPanels(), i = this.colWidth, n = this.colHeight, o = 0; t = e[o]; o++) t.setBounds({
            width: i,
            height: n
        });
    },
    arrange: function(t) {
        for (var e, i = this.colWidth, n = this.colHeight, o = Math.max(1, Math.floor(this.containerBounds.width / i)), s = 0, r = 0; t.length > r; s++) for (var a = 0; o > a && (e = t[r]); a++, 
        r++) this.arrangeControl(e, {
            left: i * a,
            top: n * s
        });
    },
    flowControl: enyo.inherit(function(t) {
        return function(e, i) {
            t.apply(this, arguments), enyo.Arranger.opacifyControl(e, 0 !== i.top % this.colHeight ? .25 : 1);
        };
    }),
    calcArrangementDifference: function() {
        return this.colWidth;
    },
    destroy: enyo.inherit(function(t) {
        return function() {
            for (var e, i = this.container.getPanels(), n = 0; e = i[n]; n++) enyo.Arranger.positionControl(e, {
                left: null,
                top: null
            }), e.applyStyle("left", null), e.applyStyle("top", null), e.applyStyle("height", null), 
            e.applyStyle("width", null);
            t.apply(this, arguments);
        };
    })
});

// panels/source/Panels.js
enyo.kind({
    name: "enyo.Panels",
    classes: "enyo-panels",
    published: {
        index: 0,
        draggable: !0,
        animate: !0,
        wrap: !1,
        arrangerKind: "CardArranger",
        narrowFit: !0
    },
    events: {
        onTransitionStart: "",
        onTransitionFinish: ""
    },
    handlers: {
        ondragstart: "dragstart",
        ondrag: "drag",
        ondragfinish: "dragfinish",
        onscroll: "domScroll"
    },
    tools: [ {
        kind: "Animator",
        onStep: "step",
        onEnd: "completed"
    } ],
    fraction: 0,
    create: enyo.inherit(function(t) {
        return function() {
            this.transitionPoints = [], t.apply(this, arguments), this.arrangerKindChanged(), 
            this.narrowFitChanged(), this.indexChanged();
        };
    }),
    rendered: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), enyo.makeBubble(this, "scroll");
        };
    }),
    domScroll: function() {
        this.hasNode() && this.node.scrollLeft > 0 && (this.node.scrollLeft = 0);
    },
    initComponents: enyo.inherit(function(t) {
        return function() {
            this.createChrome(this.tools), t.apply(this, arguments);
        };
    }),
    arrangerKindChanged: function() {
        this.setLayoutKind(this.arrangerKind);
    },
    narrowFitChanged: function() {
        this.addRemoveClass("enyo-panels-fit-narrow", this.narrowFit && enyo.Panels.isScreenNarrow());
    },
    destroy: enyo.inherit(function(t) {
        return function() {
            this.destroying = !0, t.apply(this, arguments);
        };
    }),
    removeControl: enyo.inherit(function(t) {
        return function(e) {
            if (this.destroying) return t.apply(this, arguments);
            var i = -1, n = enyo.indexOf(e, this.controls);
            n === this.index && (i = Math.max(n - 1, 0)), t.apply(this, arguments), -1 !== i && this.controls.length > 0 && (this.setIndex(i), 
            this.flow(), this.reflow());
        };
    }),
    isPanel: function() {
        return !0;
    },
    flow: enyo.inherit(function(t) {
        return function() {
            this.arrangements = [], t.apply(this, arguments);
        };
    }),
    reflow: enyo.inherit(function(t) {
        return function() {
            this.arrangements = [], t.apply(this, arguments), this.refresh();
        };
    }),
    getPanels: function() {
        var t = this.controlParent || this;
        return t.children;
    },
    getActive: function() {
        var t = this.getPanels(), e = this.index % t.length;
        return 0 > e && (e += t.length), t[e];
    },
    getAnimator: function() {
        return this.$.animator;
    },
    setIndex: function(t) {
        var e = this.get("index");
        this.index = this.clamp(t), this.notifyObservers("index", e, t);
    },
    setIndexDirect: function(t) {
        this.setIndex(t), this.completed();
    },
    selectPanelByName: function(t) {
        if (t) for (var e = 0, i = this.getPanels(), n = i.length; n > e; ++e) if (t === i[e].name) return this.setIndex(e), 
        e;
    },
    previous: function() {
        var t = this.index - 1;
        this.wrap && 0 > t && (t = this.getPanels().length - 1), this.setIndex(t);
    },
    next: function() {
        var t = this.index + 1;
        this.wrap && t >= this.getPanels().length && (t = 0), this.setIndex(t);
    },
    clamp: function(t) {
        var e = this.getPanels().length - 1;
        return this.wrap ? t : Math.max(0, Math.min(t, e));
    },
    indexChanged: function(t) {
        this.lastIndex = t, !this.dragging && this.$.animator && (this.$.animator.isAnimating() && (this.finishTransitionInfo && (this.finishTransitionInfo.animating = !0), 
        this.completed()), this.$.animator.stop(), this.hasNode() && (this.animate ? (this.startTransition(!0), 
        this.$.animator.play({
            startValue: this.fraction
        })) : this.refresh()));
    },
    step: function(t) {
        return this.fraction = t.value, this.stepTransition(), !0;
    },
    completed: function() {
        return this.$.animator.isAnimating() && this.$.animator.stop(), this.fraction = 1, 
        this.stepTransition(), this.finishTransition(!0), !0;
    },
    dragstart: function(t, e) {
        return this.draggable && this.layout && this.layout.canDragEvent(e) ? (e.preventDefault(), 
        this.dragstartTransition(e), this.dragging = !0, this.$.animator.stop(), !0) : void 0;
    },
    drag: function(t, e) {
        this.dragging && (e.preventDefault(), this.dragTransition(e));
    },
    dragfinish: function(t, e) {
        this.dragging && (this.dragging = !1, e.preventTap(), this.dragfinishTransition(e));
    },
    dragstartTransition: function(t) {
        if (this.$.animator.isAnimating()) this.verifyDragTransition(t); else {
            var e = this.fromIndex = this.index;
            this.toIndex = e - (this.layout ? this.layout.calcDragDirection(t) : 0);
        }
        this.fromIndex = this.clamp(this.fromIndex), this.toIndex = this.clamp(this.toIndex), 
        this.fireTransitionStart(), this.layout && this.layout.start();
    },
    dragTransition: function(t) {
        var e = this.layout ? this.layout.calcDrag(t) : 0, i = this.transitionPoints, n = i[0], o = i[i.length - 1], s = this.fetchArrangement(n), r = this.fetchArrangement(o), a = this.layout ? this.layout.drag(e, n, s, o, r) : 0, h = e && !a;
        this.fraction += a;
        var l = this.fraction;
        (l > 1 || 0 > l || h) && ((l > 0 || h) && this.dragfinishTransition(t), this.dragstartTransition(t), 
        this.fraction = 0), this.stepTransition();
    },
    dragfinishTransition: function(t) {
        this.verifyDragTransition(t), this.setIndex(this.toIndex), this.dragging && this.fireTransitionFinish();
    },
    verifyDragTransition: function(t) {
        var e = this.layout ? this.layout.calcDragDirection(t) : 0, i = Math.min(this.fromIndex, this.toIndex), n = Math.max(this.fromIndex, this.toIndex);
        if (e > 0) {
            var o = i;
            i = n, n = o;
        }
        i != this.fromIndex && (this.fraction = 1 - this.fraction), this.fromIndex = i, 
        this.toIndex = n;
    },
    refresh: function() {
        this.$.animator && this.$.animator.isAnimating() && this.$.animator.stop(), this.startTransition(!1), 
        this.fraction = 1, this.stepTransition(), this.finishTransition(!1);
    },
    startTransition: function(t) {
        this.fromIndex = null != this.fromIndex ? this.fromIndex : this.lastIndex || 0, 
        this.toIndex = null != this.toIndex ? this.toIndex : this.index, this.layout && this.layout.start(), 
        t && this.fireTransitionStart();
    },
    finishTransition: function(t) {
        this.layout && this.layout.finish(), this.transitionPoints = [], this.fraction = 0, 
        this.fromIndex = this.toIndex = null, t && this.fireTransitionFinish();
    },
    fireTransitionStart: function() {
        var t = this.startTransitionInfo;
        !this.hasNode() || t && t.fromIndex == this.fromIndex && t.toIndex == this.toIndex || (this.startTransitionInfo = {
            fromIndex: this.fromIndex,
            toIndex: this.toIndex
        }, this.doTransitionStart(enyo.clone(this.startTransitionInfo)));
    },
    fireTransitionFinish: function() {
        var t = this.finishTransitionInfo;
        !this.hasNode() || t && t.fromIndex == this.lastIndex && t.toIndex == this.index || (this.finishTransitionInfo = t && t.animating ? {
            fromIndex: t.toIndex,
            toIndex: this.lastIndex
        } : {
            fromIndex: this.lastIndex,
            toIndex: this.index
        }, this.doTransitionFinish(enyo.clone(this.finishTransitionInfo)));
    },
    stepTransition: function() {
        if (this.hasNode()) {
            var t = this.transitionPoints, e = (this.fraction || 0) * (t.length - 1), i = Math.floor(e);
            e -= i;
            var n = t[i], o = t[i + 1], s = this.fetchArrangement(n), r = this.fetchArrangement(o);
            this.arrangement = s && r ? enyo.Panels.lerp(s, r, e) : s || r, this.arrangement && this.layout && this.layout.flowArrangement();
        }
    },
    fetchArrangement: function(t) {
        return null != t && !this.arrangements[t] && this.layout && (this.layout._arrange(t), 
        this.arrangements[t] = this.readArrangement(this.getPanels())), this.arrangements[t];
    },
    readArrangement: function(t) {
        for (var e, i = [], n = 0, o = t; e = o[n]; n++) i.push(enyo.clone(e._arranger));
        return i;
    },
    statics: {
        isScreenNarrow: function() {
            var t = navigator.userAgent, e = enyo.dom.getWindowWidth();
            switch (enyo.platform.platformName) {
              case "ios":
                return /iP(?:hone|od;(?: U;)? CPU) OS (\d+)/.test(t);

              case "android":
                return /Mobile/.test(t) && (enyo.platform.android > 2 ? !0 : 800 >= e);
            }
            return 800 >= e;
        },
        lerp: function(t, e, i) {
            for (var n, o = [], s = 0, r = enyo.keys(t); n = r[s]; s++) o.push(this.lerpObject(t[n], e[n], i));
            return o;
        },
        lerpObject: function(t, e, i) {
            var n, o, s = enyo.clone(t);
            if (e) for (var r in t) n = t[r], o = e[r], n != o && (s[r] = n - (n - o) * i);
            return s;
        }
    }
});

// tree/source/Node.js
enyo.kind({
    name: "enyo.Node",
    published: {
        expandable: !1,
        expanded: !1,
        icon: "",
        onlyIconExpands: !1,
        selected: !1
    },
    style: "padding: 0 0 0 16px;",
    content: "Node",
    defaultKind: "Node",
    classes: "enyo-node",
    components: [ {
        name: "icon",
        kind: "Image",
        showing: !1
    }, {
        kind: "Control",
        name: "caption",
        Xtag: "span",
        style: "display: inline-block; padding: 4px;",
        allowHtml: !0
    }, {
        kind: "Control",
        name: "extra",
        tag: "span",
        allowHtml: !0
    } ],
    childClient: [ {
        kind: "Control",
        name: "box",
        classes: "enyo-node-box",
        Xstyle: "border: 1px solid orange;",
        components: [ {
            kind: "Control",
            name: "client",
            classes: "enyo-node-client",
            Xstyle: "border: 1px solid lightblue;"
        } ]
    } ],
    handlers: {
        ondblclick: "dblclick"
    },
    events: {
        onNodeTap: "nodeTap",
        onNodeDblClick: "nodeDblClick",
        onExpand: "nodeExpand",
        onDestroyed: "nodeDestroyed"
    },
    create: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.selectedChanged(), this.iconChanged();
        };
    }),
    destroy: enyo.inherit(function(t) {
        return function() {
            this.doDestroyed(), t.apply(this, arguments);
        };
    }),
    initComponents: enyo.inherit(function(t) {
        return function() {
            this.expandable && (this.kindComponents = this.kindComponents.concat(this.childClient)), 
            t.apply(this, arguments);
        };
    }),
    contentChanged: function() {
        this.$.caption.setContent(this.content);
    },
    iconChanged: function() {
        this.$.icon.setSrc(this.icon), this.$.icon.setShowing(Boolean(this.icon));
    },
    selectedChanged: function() {
        this.addRemoveClass("enyo-selected", this.selected);
    },
    rendered: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.expandable && !this.expanded && this.quickCollapse();
        };
    }),
    addNodes: function(t) {
        this.destroyClientControls();
        for (var e, i = 0; e = t[i]; i++) this.createComponent(e);
        this.$.client.render();
    },
    addTextNodes: function(t) {
        this.destroyClientControls();
        for (var e, i = 0; e = t[i]; i++) this.createComponent({
            content: e
        });
        this.$.client.render();
    },
    tap: function(t, e) {
        return this.onlyIconExpands ? e.target == this.$.icon.hasNode() ? this.toggleExpanded() : this.doNodeTap() : (this.toggleExpanded(), 
        this.doNodeTap()), !0;
    },
    dblclick: function() {
        return this.doNodeDblClick(), !0;
    },
    toggleExpanded: function() {
        this.setExpanded(!this.expanded);
    },
    quickCollapse: function() {
        this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "0");
        var t = this.$.client.getBounds().height;
        this.$.client.setBounds({
            top: -t
        });
    },
    _expand: function() {
        this.addClass("enyo-animate");
        var t = this.$.client.getBounds().height;
        this.$.box.setBounds({
            height: t
        }), this.$.client.setBounds({
            top: 0
        }), setTimeout(this.bindSafely(function() {
            this.expanded && (this.removeClass("enyo-animate"), this.$.box.applyStyle("height", "auto"));
        }), 225);
    },
    _collapse: function() {
        this.removeClass("enyo-animate");
        var t = this.$.client.getBounds().height;
        this.$.box.setBounds({
            height: t
        }), setTimeout(this.bindSafely(function() {
            this.addClass("enyo-animate"), this.$.box.applyStyle("height", "0"), this.$.client.setBounds({
                top: -t
            });
        }), 25);
    },
    expandedChanged: function() {
        if (this.expandable) {
            var t = {
                expanded: this.expanded
            };
            this.doExpand(t), t.wait || this.effectExpanded();
        } else this.expanded = !1;
    },
    effectExpanded: function() {
        this.$.client && (this.expanded ? this._expand() : this._collapse());
    }
});

// imageview/source/PanZoomView.js
enyo.kind({
    name: "enyo.PanZoomView",
    kind: enyo.Scroller,
    touchOverscroll: !1,
    thumb: !1,
    animate: !0,
    verticalDragPropagation: !0,
    horizontalDragPropagation: !0,
    published: {
        scale: "auto",
        disableZoom: !1
    },
    events: {
        onZoom: ""
    },
    touch: !0,
    preventDragPropagation: !1,
    handlers: {
        ondragstart: "dragPropagation",
        onSetDimensions: "setDimensions"
    },
    components: [ {
        name: "animator",
        kind: "Animator",
        onStep: "zoomAnimationStep",
        onEnd: "zoomAnimationEnd"
    }, {
        name: "viewport",
        style: "overflow:hidden;min-height:100%;min-width:100%;",
        classes: "enyo-fit",
        ongesturechange: "gestureTransform",
        ongestureend: "saveState",
        ontap: "singleTap",
        ondblclick: "doubleClick",
        onmousewheel: "mousewheel",
        components: [ {
            name: "content"
        } ]
    } ],
    create: enyo.inherit(function(t) {
        return function() {
            this.scaleKeyword = this.scale;
            var e = this.components;
            if (this.components = [], t.apply(this, arguments), this.$.content.applyStyle("width", this.contentWidth + "px"), 
            this.$.content.applyStyle("height", this.contentHeight + "px"), this.unscaledComponents) {
                var i = this.hasOwnProperty("unscaledComponents") ? this.getInstanceOwner() : this;
                this.createComponents(this.unscaledComponents, {
                    owner: i
                });
            }
            this.controlParentName = "content", this.discoverControlParent(), this.createComponents(e), 
            this.canTransform = enyo.dom.canTransform(), this.canTransform || this.$.content.applyStyle("position", "relative"), 
            this.canAccelerate = enyo.dom.canAccelerate(), this.getStrategy().setDragDuringGesture(!1);
        };
    }),
    rendered: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.getOriginalScale();
        };
    }),
    dragPropagation: function(t, e) {
        var i = this.getStrategy().getScrollBounds(), n = 0 === i.top && e.dy > 0 || i.top >= i.maxTop - 2 && 0 > e.dy, o = 0 === i.left && e.dx > 0 || i.left >= i.maxLeft - 2 && 0 > e.dx;
        return !(n && this.verticalDragPropagation || o && this.horizontalDragPropagation);
    },
    mousewheel: function(t, e) {
        e.pageX |= e.clientX + e.target.scrollLeft, e.pageY |= e.clientY + e.target.scrollTop;
        var i = (this.maxScale - this.minScale) / 10, n = this.scale;
        return e.wheelDelta > 0 || 0 > e.detail ? this.scale = this.limitScale(this.scale + i) : (0 > e.wheelDelta || e.detail > 0) && (this.scale = this.limitScale(this.scale - i)), 
        this.eventPt = this.calcEventLocation(e), this.transform(this.scale), n != this.scale && this.doZoom({
            scale: this.scale
        }), this.ratioX = this.ratioY = null, e.preventDefault(), !0;
    },
    resizeHandler: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.scaleChanged();
        };
    }),
    setDimensions: function(t, e) {
        return this.$.content.applyStyle("width", e.width + "px"), this.$.content.applyStyle("height", e.height + "px"), 
        this.originalWidth = e.width, this.originalHeight = e.height, this.scale = this.scaleKeyword, 
        this.scaleChanged(), !0;
    },
    getOriginalScale: function() {
        this.$.content.hasNode() && (this.originalWidth = this.$.content.node.clientWidth, 
        this.originalHeight = this.$.content.node.clientHeight, this.scale = this.scaleKeyword, 
        this.scaleChanged());
    },
    scaleChanged: function() {
        var t = this.hasNode();
        if (t) {
            this.containerWidth = t.clientWidth, this.containerHeight = t.clientHeight;
            var e = this.containerWidth / this.originalWidth, i = this.containerHeight / this.originalHeight;
            this.minScale = Math.min(e, i), this.maxScale = 1 > 3 * this.minScale ? 1 : 3 * this.minScale, 
            "auto" == this.scale ? this.scale = this.minScale : "width" == this.scale ? this.scale = e : "height" == this.scale ? this.scale = i : "fit" == this.scale ? (this.fitAlignment = "center", 
            this.scale = Math.max(e, i)) : (this.maxScale = Math.max(this.maxScale, this.scale), 
            this.scale = this.limitScale(this.scale));
        }
        this.eventPt = this.calcEventLocation(), this.transform(this.scale), this.getStrategy().$.scrollMath && this.getStrategy().$.scrollMath.start(), 
        this.align();
    },
    align: function() {
        if (this.fitAlignment && "center" === this.fitAlignment) {
            var t = this.getScrollBounds();
            this.setScrollLeft(t.maxLeft / 2), this.setScrollTop(t.maxTop / 2);
        }
    },
    gestureTransform: function(t, e) {
        this.eventPt = this.calcEventLocation(e), this.transform(this.limitScale(this.scale * e.scale));
    },
    calcEventLocation: function(t) {
        var e = {
            x: 0,
            y: 0
        };
        if (t && this.hasNode()) {
            var i = this.node.getBoundingClientRect();
            e.x = Math.round(t.pageX - i.left - this.bounds.x), e.x = Math.max(0, Math.min(this.bounds.width, e.x)), 
            e.y = Math.round(t.pageY - i.top - this.bounds.y), e.y = Math.max(0, Math.min(this.bounds.height, e.y));
        }
        return e;
    },
    transform: function(t) {
        this.tapped = !1;
        var e = this.bounds || this.innerBounds(t);
        this.bounds = this.innerBounds(t), this.scale > this.minScale ? this.$.viewport.applyStyle("cursor", "move") : this.$.viewport.applyStyle("cursor", null), 
        this.$.viewport.setBounds({
            width: this.bounds.width + "px",
            height: this.bounds.height + "px"
        }), this.ratioX = this.ratioX || (this.eventPt.x + this.getScrollLeft()) / e.width, 
        this.ratioY = this.ratioY || (this.eventPt.y + this.getScrollTop()) / e.height;
        var i, n;
        if (this.$.animator.ratioLock ? (i = this.$.animator.ratioLock.x * this.bounds.width - this.containerWidth / 2, 
        n = this.$.animator.ratioLock.y * this.bounds.height - this.containerHeight / 2) : (i = this.ratioX * this.bounds.width - this.eventPt.x, 
        n = this.ratioY * this.bounds.height - this.eventPt.y), i = Math.max(0, Math.min(this.bounds.width - this.containerWidth, i)), 
        n = Math.max(0, Math.min(this.bounds.height - this.containerHeight, n)), this.canTransform) {
            var o = {
                scale: t
            };
            o = this.canAccelerate ? enyo.mixin({
                translate3d: Math.round(this.bounds.left) + "px, " + Math.round(this.bounds.top) + "px, 0px"
            }, o) : enyo.mixin({
                translate: this.bounds.left + "px, " + this.bounds.top + "px"
            }, o), enyo.dom.transform(this.$.content, o);
        } else if (enyo.platform.ie) {
            var s = '"progid:DXImageTransform.Microsoft.Matrix(M11=' + t + ", M12=0, M21=0, M22=" + t + ", SizingMethod='auto expand')\"";
            this.$.content.applyStyle("-ms-filter", s), this.$.content.setBounds({
                width: this.bounds.width * t + "px",
                height: this.bounds.height * t + "px",
                left: this.bounds.left + "px",
                top: this.bounds.top + "px"
            }), this.$.content.applyStyle("width", t * this.bounds.width), this.$.content.applyStyle("height", t * this.bounds.height);
        }
        this.setScrollLeft(i), this.setScrollTop(n), this.positionClientControls(t);
    },
    limitScale: function(t) {
        return this.disableZoom ? t = this.scale : t > this.maxScale ? t = this.maxScale : this.minScale > t && (t = this.minScale), 
        t;
    },
    innerBounds: function(t) {
        var e = this.originalWidth * t, i = this.originalHeight * t, n = {
            x: 0,
            y: 0,
            transX: 0,
            transY: 0
        };
        return this.containerWidth > e && (n.x += (this.containerWidth - e) / 2), this.containerHeight > i && (n.y += (this.containerHeight - i) / 2), 
        this.canTransform && (n.transX -= (this.originalWidth - e) / 2, n.transY -= (this.originalHeight - i) / 2), 
        {
            left: n.x + n.transX,
            top: n.y + n.transY,
            width: e,
            height: i,
            x: n.x,
            y: n.y
        };
    },
    saveState: function(t, e) {
        var i = this.scale;
        this.scale *= e.scale, this.scale = this.limitScale(this.scale), i != this.scale && this.doZoom({
            scale: this.scale
        }), this.ratioX = this.ratioY = null;
    },
    doubleClick: function(t, e) {
        8 == enyo.platform.ie && (this.tapped = !0, e.pageX = e.clientX + e.target.scrollLeft, 
        e.pageY = e.clientY + e.target.scrollTop, this.singleTap(t, e), e.preventDefault());
    },
    singleTap: function(t, e) {
        setTimeout(this.bindSafely(function() {
            this.tapped = !1;
        }), 300), this.tapped ? (this.tapped = !1, this.smartZoom(t, e)) : this.tapped = !0;
    },
    smartZoom: function(t, e) {
        var i = this.hasNode(), n = this.$.content.hasNode();
        if (i && n && this.hasNode() && !this.disableZoom) {
            var o = this.scale;
            if (this.scale = this.scale != this.minScale ? this.minScale : this.maxScale, this.eventPt = this.calcEventLocation(e), 
            this.animate) {
                var s = {
                    x: (this.eventPt.x + this.getScrollLeft()) / this.bounds.width,
                    y: (this.eventPt.y + this.getScrollTop()) / this.bounds.height
                };
                this.$.animator.play({
                    duration: 350,
                    ratioLock: s,
                    baseScale: o,
                    deltaScale: this.scale - o
                });
            } else this.transform(this.scale), this.doZoom({
                scale: this.scale
            });
        }
    },
    zoomAnimationStep: function() {
        var t = this.$.animator.baseScale + this.$.animator.deltaScale * this.$.animator.value;
        return this.transform(t), !0;
    },
    zoomAnimationEnd: function() {
        return this.stabilize(), this.doZoom({
            scale: this.scale
        }), this.$.animator.ratioLock = void 0, !0;
    },
    positionClientControls: function(t) {
        this.waterfallDown("onPositionPin", {
            scale: t,
            bounds: this.bounds
        });
    }
});

// imageview/source/ImageViewPin.js
enyo.kind({
    name: "enyo.ImageViewPin",
    kind: "enyo.Control",
    published: {
        highlightAnchorPoint: !1,
        anchor: {
            top: 0,
            left: 0
        },
        position: {
            top: 0,
            left: 0
        }
    },
    style: "position:absolute;z-index:1000;width:0px;height:0px;",
    handlers: {
        onPositionPin: "reAnchor"
    },
    create: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.styleClientControls(), this.positionClientControls(), 
            this.highlightAnchorPointChanged(), this.anchorChanged();
        };
    }),
    styleClientControls: function() {
        for (var t = this.getClientControls(), e = 0; t.length > e; e++) t[e].applyStyle("position", "absolute");
    },
    positionClientControls: function() {
        for (var t = this.getClientControls(), e = 0; t.length > e; e++) for (var i in this.position) t[e].applyStyle(i, this.position[i] + "px");
    },
    highlightAnchorPointChanged: function() {
        this.addRemoveClass("pinDebug", this.highlightAnchorPoint);
    },
    anchorChanged: function() {
        var t = null, e = null;
        for (e in this.anchor) t = ("" + this.anchor[e]).match(/^(\d+(?:\.\d+)?)(.*)$/), 
        t && (this.anchor[e + "Coords"] = {
            value: t[1],
            units: t[2] || "px"
        });
    },
    reAnchor: function(t, e) {
        var i = e.scale, n = e.bounds, o = this.anchor.right ? "px" == this.anchor.rightCoords.units ? n.width + n.x - this.anchor.rightCoords.value * i : n.width * (100 - this.anchor.rightCoords.value) / 100 + n.x : "px" == this.anchor.leftCoords.units ? this.anchor.leftCoords.value * i + n.x : n.width * this.anchor.leftCoords.value / 100 + n.x, s = this.anchor.bottom ? "px" == this.anchor.bottomCoords.units ? n.height + n.y - this.anchor.bottomCoords.value * i : n.height * (100 - this.anchor.bottomCoords.value) / 100 + n.y : "px" == this.anchor.topCoords.units ? this.anchor.topCoords.value * i + n.y : n.height * this.anchor.topCoords.value / 100 + n.y;
        this.applyStyle("left", o + "px"), this.applyStyle("top", s + "px");
    }
});

// imageview/source/ImageView.js
enyo.kind({
    name: "enyo.ImageView",
    kind: "enyo.PanZoomView",
    subKindComponents: [ {
        kind: "Image",
        ondown: "down",
        style: "vertical-align: text-top;"
    } ],
    create: enyo.inherit(function(t) {
        return function() {
            this.unscaledComponents = this.components, this.components = [], this.kindComponents[1].components[0].components = this.subKindComponents, 
            t.apply(this, arguments), this.$.content.applyStyle("display", "inline-block"), 
            this.bufferImage = new Image(), this.bufferImage.onload = enyo.bind(this, "imageLoaded"), 
            this.bufferImage.onerror = enyo.bind(this, "imageError"), this.srcChanged(), this.getStrategy().$.scrollMath && this.getStrategy().$.scrollMath.start();
        };
    }),
    destroy: enyo.inherit(function(t) {
        return function() {
            this.bufferImage && (this.bufferImage.onerror = void 0, this.bufferImage.onerror = void 0, 
            delete this.bufferImage), t.apply(this, arguments);
        };
    }),
    down: function(t, e) {
        e.preventDefault();
    },
    srcChanged: function() {
        this.src && this.src.length > 0 && this.bufferImage && this.src != this.bufferImage.src && (this.bufferImage.src = this.src);
    },
    imageLoaded: function() {
        this.scale = this.scaleKeyword, this.originalWidth = this.contentWidth = this.bufferImage.width, 
        this.originalHeight = this.contentHeight = this.bufferImage.height, this.scaleChanged(), 
        this.$.image.setSrc(this.bufferImage.src), enyo.dom.transformValue(this.getStrategy().$.client, "translate3d", "0px, 0px, 0"), 
        this.positionClientControls(this.scale), this.align();
    },
    imageError: function(t) {
        enyo.error("Error loading image: " + this.src), this.bubble("onerror", t);
    }
});

// imageview/source/ImageCarousel.js
enyo.kind({
    name: "enyo.ImageCarousel",
    kind: enyo.Panels,
    arrangerKind: "enyo.CarouselArranger",
    defaultScale: "auto",
    disableZoom: !1,
    lowMemory: !1,
    published: {
        images: []
    },
    handlers: {
        onTransitionStart: "transitionStart",
        onTransitionFinish: "transitionFinish"
    },
    create: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.imageCount = this.images.length, this.images.length > 0 && (this.initContainers(), 
            this.loadNearby());
        };
    }),
    initContainers: function() {
        for (var t = 0; this.images.length > t; t++) this.$["container" + t] || (this.createComponent({
            name: "container" + t,
            style: "height:100%; width:100%;"
        }), this.$["container" + t].render());
        for (t = this.images.length; this.imageCount > t; t++) this.$["image" + t] && this.$["image" + t].destroy(), 
        this.$["container" + t].destroy();
        this.imageCount = this.images.length;
    },
    loadNearby: function() {
        var t = this.getBufferRange();
        for (var e in t) this.loadImageView(t[e]);
    },
    getBufferRange: function() {
        var t = [];
        if (this.layout.containerBounds) {
            var e, i, n, o, s = 1, r = this.layout.containerBounds;
            for (i = this.index - 1, n = 0, o = r.width * s; i >= 0 && o >= n; ) e = this.$["container" + i], 
            n += e.width + e.marginWidth, t.unshift(i), i--;
            for (i = this.index, n = 0, o = r.width * (s + 1); this.images.length > i && o >= n; ) e = this.$["container" + i], 
            n += e.width + e.marginWidth, t.push(i), i++;
        }
        return t;
    },
    reflow: enyo.inherit(function(t) {
        return function() {
            t.apply(this, arguments), this.loadNearby();
        };
    }),
    loadImageView: function(t) {
        return this.wrap && (t = (t % this.images.length + this.images.length) % this.images.length), 
        t >= 0 && this.images.length - 1 >= t && (this.$["image" + t] ? this.$["image" + t].src != this.images[t] && (this.$["image" + t].setSrc(this.images[t]), 
        this.$["image" + t].setScale(this.defaultScale), this.$["image" + t].setDisableZoom(this.disableZoom)) : (this.$["container" + t].createComponent({
            name: "image" + t,
            kind: "ImageView",
            scale: this.defaultScale,
            disableZoom: this.disableZoom,
            src: this.images[t],
            verticalDragPropagation: !1,
            style: "height:100%; width:100%;"
        }, {
            owner: this
        }), this.$["image" + t].render())), this.$["image" + t];
    },
    setImages: function(t) {
        this.set("images", t);
    },
    imagesChanged: function() {
        this.initContainers(), this.loadNearby();
    },
    indexChanged: enyo.inherit(function(t) {
        return function() {
            this.loadNearby(), this.lowMemory && this.cleanupMemory(), t.apply(this, arguments);
        };
    }),
    transitionStart: function(t, e) {
        return e.fromIndex == e.toIndex ? !0 : void 0;
    },
    transitionFinish: function() {
        this.loadNearby(), this.lowMemory && this.cleanupMemory();
    },
    getActiveImage: function() {
        return this.getImageByIndex(this.index);
    },
    getImageByIndex: function(t) {
        return this.$["image" + t] || this.loadImageView(t);
    },
    cleanupMemory: function() {
        for (var t = this.getBufferRange(), e = 0; this.images.length > e; e++) -1 === enyo.indexOf(e, t) && this.$["image" + e] && this.$["image" + e].destroy();
    }
});
