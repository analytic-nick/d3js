// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/rough-notation/lib/rough-notation.esm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotate = _;
exports.annotationGroup = m;
const t = "http://www.w3.org/2000/svg";
class e {
  constructor(t) {
    this.seed = t;
  }
  next() {
    return this.seed ? (2 ** 31 - 1 & (this.seed = Math.imul(48271, this.seed))) / 2 ** 31 : Math.random();
  }
}
function s(t, e, s, i, n) {
  return {
    type: "path",
    ops: c(t, e, s, i, n)
  };
}
function i(t, e, i) {
  const n = (t || []).length;
  if (n > 2) {
    const s = [];
    for (let e = 0; e < n - 1; e++) s.push(...c(t[e][0], t[e][1], t[e + 1][0], t[e + 1][1], i));
    return e && s.push(...c(t[n - 1][0], t[n - 1][1], t[0][0], t[0][1], i)), {
      type: "path",
      ops: s
    };
  }
  return 2 === n ? s(t[0][0], t[0][1], t[1][0], t[1][1], i) : {
    type: "path",
    ops: []
  };
}
function n(t, e, s, n, o) {
  return function (t, e) {
    return i(t, !0, e);
  }([[t, e], [t + s, e], [t + s, e + n], [t, e + n]], o);
}
function o(t, e, s, i, n) {
  return function (t, e, s, i) {
    const [n, o] = l(i.increment, t, e, i.rx, i.ry, 1, i.increment * h(.1, h(.4, 1, s), s), s);
    let r = f(n, null, s);
    if (!s.disableMultiStroke) {
      const [n] = l(i.increment, t, e, i.rx, i.ry, 1.5, 0, s),
        o = f(n, null, s);
      r = r.concat(o);
    }
    return {
      estimatedPoints: o,
      opset: {
        type: "path",
        ops: r
      }
    };
  }(t, e, n, function (t, e, s) {
    const i = Math.sqrt(2 * Math.PI * Math.sqrt((Math.pow(t / 2, 2) + Math.pow(e / 2, 2)) / 2)),
      n = Math.max(s.curveStepCount, s.curveStepCount / Math.sqrt(200) * i),
      o = 2 * Math.PI / n;
    let r = Math.abs(t / 2),
      h = Math.abs(e / 2);
    const c = 1 - s.curveFitting;
    return r += a(r * c, s), h += a(h * c, s), {
      increment: o,
      rx: r,
      ry: h
    };
  }(s, i, n)).opset;
}
function r(t) {
  return t.randomizer || (t.randomizer = new e(t.seed || 0)), t.randomizer.next();
}
function h(t, e, s, i = 1) {
  return s.roughness * i * (r(s) * (e - t) + t);
}
function a(t, e, s = 1) {
  return h(-t, t, e, s);
}
function c(t, e, s, i, n, o = !1) {
  const r = o ? n.disableMultiStrokeFill : n.disableMultiStroke,
    h = u(t, e, s, i, n, !0, !1);
  if (r) return h;
  const a = u(t, e, s, i, n, !0, !0);
  return h.concat(a);
}
function u(t, e, s, i, n, o, h) {
  const c = Math.pow(t - s, 2) + Math.pow(e - i, 2),
    u = Math.sqrt(c);
  let f = 1;
  f = u < 200 ? 1 : u > 500 ? .4 : -.0016668 * u + 1.233334;
  let l = n.maxRandomnessOffset || 0;
  l * l * 100 > c && (l = u / 10);
  const g = l / 2,
    d = .2 + .2 * r(n);
  let p = n.bowing * n.maxRandomnessOffset * (i - e) / 200,
    _ = n.bowing * n.maxRandomnessOffset * (t - s) / 200;
  p = a(p, n, f), _ = a(_, n, f);
  const m = [],
    w = () => a(g, n, f),
    v = () => a(l, n, f);
  return o && (h ? m.push({
    op: "move",
    data: [t + w(), e + w()]
  }) : m.push({
    op: "move",
    data: [t + a(l, n, f), e + a(l, n, f)]
  })), h ? m.push({
    op: "bcurveTo",
    data: [p + t + (s - t) * d + w(), _ + e + (i - e) * d + w(), p + t + 2 * (s - t) * d + w(), _ + e + 2 * (i - e) * d + w(), s + w(), i + w()]
  }) : m.push({
    op: "bcurveTo",
    data: [p + t + (s - t) * d + v(), _ + e + (i - e) * d + v(), p + t + 2 * (s - t) * d + v(), _ + e + 2 * (i - e) * d + v(), s + v(), i + v()]
  }), m;
}
function f(t, e, s) {
  const i = t.length,
    n = [];
  if (i > 3) {
    const o = [],
      r = 1 - s.curveTightness;
    n.push({
      op: "move",
      data: [t[1][0], t[1][1]]
    });
    for (let e = 1; e + 2 < i; e++) {
      const s = t[e];
      o[0] = [s[0], s[1]], o[1] = [s[0] + (r * t[e + 1][0] - r * t[e - 1][0]) / 6, s[1] + (r * t[e + 1][1] - r * t[e - 1][1]) / 6], o[2] = [t[e + 1][0] + (r * t[e][0] - r * t[e + 2][0]) / 6, t[e + 1][1] + (r * t[e][1] - r * t[e + 2][1]) / 6], o[3] = [t[e + 1][0], t[e + 1][1]], n.push({
        op: "bcurveTo",
        data: [o[1][0], o[1][1], o[2][0], o[2][1], o[3][0], o[3][1]]
      });
    }
    if (e && 2 === e.length) {
      const t = s.maxRandomnessOffset;
      n.push({
        op: "lineTo",
        data: [e[0] + a(t, s), e[1] + a(t, s)]
      });
    }
  } else 3 === i ? (n.push({
    op: "move",
    data: [t[1][0], t[1][1]]
  }), n.push({
    op: "bcurveTo",
    data: [t[1][0], t[1][1], t[2][0], t[2][1], t[2][0], t[2][1]]
  })) : 2 === i && n.push(...c(t[0][0], t[0][1], t[1][0], t[1][1], s));
  return n;
}
function l(t, e, s, i, n, o, r, h) {
  const c = [],
    u = [],
    f = a(.5, h) - Math.PI / 2;
  u.push([a(o, h) + e + .9 * i * Math.cos(f - t), a(o, h) + s + .9 * n * Math.sin(f - t)]);
  for (let r = f; r < 2 * Math.PI + f - .01; r += t) {
    const t = [a(o, h) + e + i * Math.cos(r), a(o, h) + s + n * Math.sin(r)];
    c.push(t), u.push(t);
  }
  return u.push([a(o, h) + e + i * Math.cos(f + 2 * Math.PI + .5 * r), a(o, h) + s + n * Math.sin(f + 2 * Math.PI + .5 * r)]), u.push([a(o, h) + e + .98 * i * Math.cos(f + r), a(o, h) + s + .98 * n * Math.sin(f + r)]), u.push([a(o, h) + e + .9 * i * Math.cos(f + .5 * r), a(o, h) + s + .9 * n * Math.sin(f + .5 * r)]), [u, c];
}
function g(t, e) {
  return {
    maxRandomnessOffset: 2,
    roughness: "highlight" === t ? 3 : 1.5,
    bowing: 1,
    stroke: "#000",
    strokeWidth: 1.5,
    curveTightness: 0,
    curveFitting: .95,
    curveStepCount: 9,
    fillStyle: "hachure",
    fillWeight: -1,
    hachureAngle: -41,
    hachureGap: -1,
    dashOffset: -1,
    dashGap: -1,
    zigzagOffset: -1,
    combineNestedSvgPaths: !1,
    disableMultiStroke: "double" !== t,
    disableMultiStrokeFill: !1,
    seed: e
  };
}
function d(e, r, h, a, c, u) {
  const f = [];
  let l = h.strokeWidth || 2;
  const d = function (t) {
      const e = t.padding;
      if (e || 0 === e) {
        if ("number" == typeof e) return [e, e, e, e];
        if (Array.isArray(e)) {
          const t = e;
          if (t.length) switch (t.length) {
            case 4:
              return [...t];
            case 1:
              return [t[0], t[0], t[0], t[0]];
            case 2:
              return [...t, ...t];
            case 3:
              return [...t, t[1]];
            default:
              return [t[0], t[1], t[2], t[3]];
          }
        }
      }
      return [5, 5, 5, 5];
    }(h),
    p = void 0 === h.animate || !!h.animate,
    _ = h.iterations || 2,
    m = g("single", u);
  switch (h.type) {
    case "underline":
      {
        const t = r.y + r.h + d[2];
        for (let e = 0; e < _; e++) e % 2 ? f.push(s(r.x + r.w, t, r.x, t, m)) : f.push(s(r.x, t, r.x + r.w, t, m));
        break;
      }
    case "strike-through":
      {
        const t = r.y + r.h / 2;
        for (let e = 0; e < _; e++) e % 2 ? f.push(s(r.x + r.w, t, r.x, t, m)) : f.push(s(r.x, t, r.x + r.w, t, m));
        break;
      }
    case "box":
      {
        const t = r.x - d[3],
          e = r.y - d[0],
          s = r.w + (d[1] + d[3]),
          i = r.h + (d[0] + d[2]);
        for (let o = 0; o < _; o++) f.push(n(t, e, s, i, m));
        break;
      }
    case "bracket":
      {
        const t = Array.isArray(h.brackets) ? h.brackets : h.brackets ? [h.brackets] : ["right"],
          e = r.x - 2 * d[3],
          s = r.x + r.w + 2 * d[1],
          n = r.y - 2 * d[0],
          o = r.y + r.h + 2 * d[2];
        for (const h of t) {
          let t;
          switch (h) {
            case "bottom":
              t = [[e, r.y + r.h], [e, o], [s, o], [s, r.y + r.h]];
              break;
            case "top":
              t = [[e, r.y], [e, n], [s, n], [s, r.y]];
              break;
            case "left":
              t = [[r.x, n], [e, n], [e, o], [r.x, o]];
              break;
            case "right":
              t = [[r.x + r.w, n], [s, n], [s, o], [r.x + r.w, o]];
          }
          t && f.push(i(t, !1, m));
        }
        break;
      }
    case "crossed-off":
      {
        const t = r.x,
          e = r.y,
          i = t + r.w,
          n = e + r.h;
        for (let o = 0; o < _; o++) o % 2 ? f.push(s(i, n, t, e, m)) : f.push(s(t, e, i, n, m));
        for (let o = 0; o < _; o++) o % 2 ? f.push(s(t, n, i, e, m)) : f.push(s(i, e, t, n, m));
        break;
      }
    case "circle":
      {
        const t = g("double", u),
          e = r.w + (d[1] + d[3]),
          s = r.h + (d[0] + d[2]),
          i = r.x - d[3] + e / 2,
          n = r.y - d[0] + s / 2,
          h = Math.floor(_ / 2),
          a = _ - 2 * h;
        for (let r = 0; r < h; r++) f.push(o(i, n, e, s, t));
        for (let t = 0; t < a; t++) f.push(o(i, n, e, s, m));
        break;
      }
    case "highlight":
      {
        const t = g("highlight", u);
        l = .95 * r.h;
        const e = r.y + r.h / 2;
        for (let i = 0; i < _; i++) i % 2 ? f.push(s(r.x + r.w, e, r.x, e, t)) : f.push(s(r.x, e, r.x + r.w, e, t));
        break;
      }
  }
  if (f.length) {
    const s = function (t) {
        const e = [];
        for (const s of t) {
          let t = "";
          for (const i of s.ops) {
            const s = i.data;
            switch (i.op) {
              case "move":
                t.trim() && e.push(t.trim()), t = `M${s[0]} ${s[1]} `;
                break;
              case "bcurveTo":
                t += `C${s[0]} ${s[1]}, ${s[2]} ${s[3]}, ${s[4]} ${s[5]} `;
                break;
              case "lineTo":
                t += `L${s[0]} ${s[1]} `;
            }
          }
          t.trim() && e.push(t.trim());
        }
        return e;
      }(f),
      i = [],
      n = [];
    let o = 0;
    const r = (t, e, s) => t.setAttribute(e, s);
    for (const a of s) {
      const s = document.createElementNS(t, "path");
      if (r(s, "d", a), r(s, "fill", "none"), r(s, "stroke", h.color || "currentColor"), r(s, "stroke-width", "" + l), p) {
        const t = s.getTotalLength();
        i.push(t), o += t;
      }
      e.appendChild(s), n.push(s);
    }
    if (p) {
      let t = 0;
      for (let e = 0; e < n.length; e++) {
        const s = n[e],
          r = i[e],
          h = o ? c * (r / o) : 0,
          u = a + t,
          f = s.style;
        f.strokeDashoffset = "" + r, f.strokeDasharray = "" + r, f.animation = `rough-notation-dash ${h}ms ease-out ${u}ms forwards`, t += h;
      }
    }
  }
}
class p {
  constructor(t, e) {
    this._state = "unattached", this._resizing = !1, this._seed = Math.floor(Math.random() * 2 ** 31), this._lastSizes = [], this._animationDelay = 0, this._resizeListener = () => {
      this._resizing || (this._resizing = !0, setTimeout(() => {
        this._resizing = !1, "showing" === this._state && this.haveRectsChanged() && this.show();
      }, 400));
    }, this._e = t, this._config = JSON.parse(JSON.stringify(e)), this.attach();
  }
  get animate() {
    return this._config.animate;
  }
  set animate(t) {
    this._config.animate = t;
  }
  get animationDuration() {
    return this._config.animationDuration;
  }
  set animationDuration(t) {
    this._config.animationDuration = t;
  }
  get iterations() {
    return this._config.iterations;
  }
  set iterations(t) {
    this._config.iterations = t;
  }
  get color() {
    return this._config.color;
  }
  set color(t) {
    this._config.color !== t && (this._config.color = t, this.refresh());
  }
  get strokeWidth() {
    return this._config.strokeWidth;
  }
  set strokeWidth(t) {
    this._config.strokeWidth !== t && (this._config.strokeWidth = t, this.refresh());
  }
  get padding() {
    return this._config.padding;
  }
  set padding(t) {
    this._config.padding !== t && (this._config.padding = t, this.refresh());
  }
  attach() {
    if ("unattached" === this._state && this._e.parentElement) {
      !function () {
        if (!window.__rno_kf_s) {
          const t = window.__rno_kf_s = document.createElement("style");
          t.textContent = "@keyframes rough-notation-dash { to { stroke-dashoffset: 0; } }", document.head.appendChild(t);
        }
      }();
      const e = this._svg = document.createElementNS(t, "svg");
      e.setAttribute("class", "rough-annotation");
      const s = e.style;
      s.position = "absolute", s.top = "0", s.left = "0", s.overflow = "visible", s.pointerEvents = "none", s.width = "100px", s.height = "100px";
      const i = "highlight" === this._config.type;
      if (this._e.insertAdjacentElement(i ? "beforebegin" : "afterend", e), this._state = "not-showing", i) {
        const t = window.getComputedStyle(this._e).position;
        (!t || "static" === t) && (this._e.style.position = "relative");
      }
      this.attachListeners();
    }
  }
  detachListeners() {
    window.removeEventListener("resize", this._resizeListener), this._ro && this._ro.unobserve(this._e);
  }
  attachListeners() {
    this.detachListeners(), window.addEventListener("resize", this._resizeListener, {
      passive: !0
    }), !this._ro && "ResizeObserver" in window && (this._ro = new window.ResizeObserver(t => {
      for (const e of t) e.contentRect && this._resizeListener();
    })), this._ro && this._ro.observe(this._e);
  }
  haveRectsChanged() {
    if (this._lastSizes.length) {
      const t = this.rects();
      if (t.length !== this._lastSizes.length) return !0;
      for (let e = 0; e < t.length; e++) if (!this.isSameRect(t[e], this._lastSizes[e])) return !0;
    }
    return !1;
  }
  isSameRect(t, e) {
    const s = (t, e) => Math.round(t) === Math.round(e);
    return s(t.x, e.x) && s(t.y, e.y) && s(t.w, e.w) && s(t.h, e.h);
  }
  isShowing() {
    return "not-showing" !== this._state;
  }
  refresh() {
    this.isShowing() && !this.pendingRefresh && (this.pendingRefresh = Promise.resolve().then(() => {
      this.isShowing() && this.show(), delete this.pendingRefresh;
    }));
  }
  show() {
    switch (this._state) {
      case "unattached":
        break;
      case "showing":
        this.hide(), this._svg && this.render(this._svg, !0);
        break;
      case "not-showing":
        this.attach(), this._svg && this.render(this._svg, !1);
    }
  }
  hide() {
    if (this._svg) for (; this._svg.lastChild;) this._svg.removeChild(this._svg.lastChild);
    this._state = "not-showing";
  }
  remove() {
    this._svg && this._svg.parentElement && this._svg.parentElement.removeChild(this._svg), this._svg = void 0, this._state = "unattached", this.detachListeners();
  }
  render(t, e) {
    let s = this._config;
    e && (s = JSON.parse(JSON.stringify(this._config)), s.animate = !1);
    const i = this.rects();
    let n = 0;
    i.forEach(t => n += t.w);
    const o = s.animationDuration || 800;
    let r = 0;
    for (let e = 0; e < i.length; e++) {
      const h = o * (i[e].w / n);
      d(t, i[e], s, r + this._animationDelay, h, this._seed), r += h;
    }
    this._lastSizes = i, this._state = "showing";
  }
  rects() {
    const t = [];
    if (this._svg) if (this._config.multiline) {
      const e = this._e.getClientRects();
      for (let s = 0; s < e.length; s++) t.push(this.svgRect(this._svg, e[s]));
    } else t.push(this.svgRect(this._svg, this._e.getBoundingClientRect()));
    return t;
  }
  svgRect(t, e) {
    const s = t.getBoundingClientRect(),
      i = e;
    return {
      x: (i.x || i.left) - (s.x || s.left),
      y: (i.y || i.top) - (s.y || s.top),
      w: i.width,
      h: i.height
    };
  }
}
function _(t, e) {
  return new p(t, e);
}
function m(t) {
  let e = 0;
  for (const s of t) {
    const t = s;
    t._animationDelay = e;
    e += 0 === t.animationDuration ? 0 : t.animationDuration || 800;
  }
  const s = [...t];
  return {
    show() {
      for (const t of s) t.show();
    },
    hide() {
      for (const t of s) t.hide();
    }
  };
}
},{}],"js/roughAnnotations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationColor = exports.trainColor = exports.testColor = void 0;
var _roughNotation = require("rough-notation");
var testColor = exports.testColor = "rgba(255, 147, 79, .35)";
var trainColor = exports.trainColor = "rgba(45, 49, 66, .2)";
var validationColor = exports.validationColor = "rgba(	5, 142, 217,.35)";
var annotation1Intro = document.querySelector("#annotation1-intro");
var annotation2Intro = document.querySelector("#annotation2-intro");
var annotation3Intro = document.querySelector("#annotation3-intro");
var annotation1 = document.querySelector("#annotation1");
var annotation2 = document.querySelector("#annotation2");
var annotation3 = document.querySelector("#annotation3");
var annotation4 = document.querySelector("#annotation4");
var annotation5 = document.querySelector("#annotation5");
var annotation6 = document.querySelector("#annotation6");
var annotation7 = document.querySelector("#annotation7");
var annotation8 = document.querySelector("#annotation8");
var annotation9 = document.querySelector("#annotation9");
var annotation10 = document.querySelector("#annotation10");
var annotation11 = document.querySelector("#annotation11");
var annotation12 = document.querySelector("#annotation12");
var a1Intro = (0, _roughNotation.annotate)(annotation1Intro, {
  type: "highlight",
  color: trainColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a2Intro = (0, _roughNotation.annotate)(annotation2Intro, {
  type: "highlight",
  color: testColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false
});
var a3Intro = (0, _roughNotation.annotate)(annotation3Intro, {
  type: "highlight",
  color: validationColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a1 = (0, _roughNotation.annotate)(annotation1, {
  type: "highlight",
  color: trainColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a2 = (0, _roughNotation.annotate)(annotation2, {
  type: "highlight",
  color: testColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false
});
var a3 = (0, _roughNotation.annotate)(annotation3, {
  type: "highlight",
  color: validationColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a4 = (0, _roughNotation.annotate)(annotation4, {
  type: "highlight",
  color: trainColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false
});
var a5 = (0, _roughNotation.annotate)(annotation5, {
  type: "highlight",
  color: validationColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false
});
var a6 = (0, _roughNotation.annotate)(annotation6, {
  type: "highlight",
  color: testColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a7 = (0, _roughNotation.annotate)(annotation7, {
  type: "highlight",
  color: trainColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a8 = (0, _roughNotation.annotate)(annotation8, {
  type: "highlight",
  color: validationColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a9 = (0, _roughNotation.annotate)(annotation9, {
  type: "highlight",
  color: testColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a10 = (0, _roughNotation.annotate)(annotation10, {
  type: "highlight",
  color: trainColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a11 = (0, _roughNotation.annotate)(annotation11, {
  type: "highlight",
  color: validationColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var a12 = (0, _roughNotation.annotate)(annotation12, {
  type: "highlight",
  color: testColor,
  strokeWidth: 1,
  iterations: 1,
  animate: false,
  multiline: true
});
var ag = (0, _roughNotation.annotationGroup)([a3, a1, a2, a4, a5, a6, a7, a8, a9, a10, a11, a12, a1Intro, a2Intro, a3Intro]);
ag.show();
},{"rough-notation":"node_modules/rough-notation/lib/rough-notation.esm.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59313" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/roughAnnotations.js"], null)
//# sourceMappingURL=/roughAnnotations.abb4a4de.js.map