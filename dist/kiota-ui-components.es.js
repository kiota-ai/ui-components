import * as ve from "react";
import Ce, { createContext as Of, useContext as cs, useState as Ke, useRef as Ie, useEffect as Me, useDebugValue as sl, createElement as vr, useCallback as Re, forwardRef as Ef, useMemo as Et, useLayoutEffect as xp, PureComponent as Op, useReducer as Ep, useImperativeHandle as Sp, Fragment as _p } from "react";
import Di, { createPortal as Tp } from "react-dom";
const Np = {
  type: "logger",
  log(e) {
    this.output("log", e);
  },
  warn(e) {
    this.output("warn", e);
  },
  error(e) {
    this.output("error", e);
  },
  output(e, t) {
    console && console[e] && console[e].apply(console, t);
  }
};
class fi {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, r);
  }
  init(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = r.prefix || "i18next:", this.logger = t || Np, this.options = r, this.debug = r.debug;
  }
  log() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    return this.forward(r, "log", "", !0);
  }
  warn() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    return this.forward(r, "warn", "", !0);
  }
  error() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    return this.forward(r, "error", "");
  }
  deprecate() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    return this.forward(r, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(t, r, n, i) {
    return i && !this.debug ? null : (typeof t[0] == "string" && (t[0] = `${n}${this.prefix} ${t[0]}`), this.logger[r](t));
  }
  create(t) {
    return new fi(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new fi(this.logger, t);
  }
}
var yt = new fi();
class Ri {
  constructor() {
    this.observers = {};
  }
  on(t, r) {
    return t.split(" ").forEach((n) => {
      this.observers[n] = this.observers[n] || [], this.observers[n].push(r);
    }), this;
  }
  off(t, r) {
    if (this.observers[t]) {
      if (!r) {
        delete this.observers[t];
        return;
      }
      this.observers[t] = this.observers[t].filter((n) => n !== r);
    }
  }
  emit(t) {
    for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
      n[i - 1] = arguments[i];
    this.observers[t] && [].concat(this.observers[t]).forEach((o) => {
      o(...n);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((o) => {
      o.apply(o, [t, ...n]);
    });
  }
}
function Yr() {
  let e, t;
  const r = new Promise((n, i) => {
    e = n, t = i;
  });
  return r.resolve = e, r.reject = t, r;
}
function ll(e) {
  return e == null ? "" : "" + e;
}
function Ap(e, t, r) {
  e.forEach((n) => {
    t[n] && (r[n] = t[n]);
  });
}
function fs(e, t, r) {
  function n(o) {
    return o && o.indexOf("###") > -1 ? o.replace(/###/g, ".") : o;
  }
  function i() {
    return !e || typeof e == "string";
  }
  const a = typeof t != "string" ? [].concat(t) : t.split(".");
  for (; a.length > 1; ) {
    if (i())
      return {};
    const o = n(a.shift());
    !e[o] && r && (e[o] = new r()), Object.prototype.hasOwnProperty.call(e, o) ? e = e[o] : e = {};
  }
  return i() ? {} : {
    obj: e,
    k: n(a.shift())
  };
}
function ul(e, t, r) {
  const {
    obj: n,
    k: i
  } = fs(e, t, Object);
  n[i] = r;
}
function kp(e, t, r, n) {
  const {
    obj: i,
    k: a
  } = fs(e, t, Object);
  i[a] = i[a] || [], n && (i[a] = i[a].concat(r)), n || i[a].push(r);
}
function di(e, t) {
  const {
    obj: r,
    k: n
  } = fs(e, t);
  if (r)
    return r[n];
}
function jp(e, t, r) {
  const n = di(e, r);
  return n !== void 0 ? n : di(t, r);
}
function Sf(e, t, r) {
  for (const n in t)
    n !== "__proto__" && n !== "constructor" && (n in e ? typeof e[n] == "string" || e[n] instanceof String || typeof t[n] == "string" || t[n] instanceof String ? r && (e[n] = t[n]) : Sf(e[n], t[n], r) : e[n] = t[n]);
  return e;
}
function ar(e) {
  return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var Pp = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function Cp(e) {
  return typeof e == "string" ? e.replace(/[&<>"'\/]/g, (t) => Pp[t]) : e;
}
const Ip = [" ", ",", "?", "!", ";"];
function Lp(e, t, r) {
  t = t || "", r = r || "";
  const n = Ip.filter((o) => t.indexOf(o) < 0 && r.indexOf(o) < 0);
  if (n.length === 0)
    return !0;
  const i = new RegExp(`(${n.map((o) => o === "?" ? "\\?" : o).join("|")})`);
  let a = !i.test(e);
  if (!a) {
    const o = e.indexOf(r);
    o > 0 && !i.test(e.substring(0, o)) && (a = !0);
  }
  return a;
}
function hi(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e)
    return;
  if (e[t])
    return e[t];
  const n = t.split(r);
  let i = e;
  for (let a = 0; a < n.length; ++a) {
    if (!i || typeof i[n[a]] == "string" && a + 1 < n.length)
      return;
    if (i[n[a]] === void 0) {
      let o = 2, s = n.slice(a, a + o).join(r), l = i[s];
      for (; l === void 0 && n.length > a + o; )
        o++, s = n.slice(a, a + o).join(r), l = i[s];
      if (l === void 0)
        return;
      if (l === null)
        return null;
      if (t.endsWith(s)) {
        if (typeof l == "string")
          return l;
        if (s && typeof l[s] == "string")
          return l[s];
      }
      const f = n.slice(a + o).join(r);
      return f ? hi(l, f, r) : void 0;
    }
    i = i[n[a]];
  }
  return i;
}
function pi(e) {
  return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e;
}
class cl extends Ri {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = t || {}, this.options = r, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const r = this.options.ns.indexOf(t);
    r > -1 && this.options.ns.splice(r, 1);
  }
  getResource(t, r, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const a = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, o = i.ignoreJSONStructure !== void 0 ? i.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let s = [t, r];
    n && typeof n != "string" && (s = s.concat(n)), n && typeof n == "string" && (s = s.concat(a ? n.split(a) : n)), t.indexOf(".") > -1 && (s = t.split("."));
    const l = di(this.data, s);
    return l || !o || typeof n != "string" ? l : hi(this.data && this.data[t] && this.data[t][r], n, a);
  }
  addResource(t, r, n, i) {
    let a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const o = a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let s = [t, r];
    n && (s = s.concat(o ? n.split(o) : n)), t.indexOf(".") > -1 && (s = t.split("."), i = r, r = s[1]), this.addNamespaces(r), ul(this.data, s, i), a.silent || this.emit("added", t, r, n, i);
  }
  addResources(t, r, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const a in n)
      (typeof n[a] == "string" || Object.prototype.toString.apply(n[a]) === "[object Array]") && this.addResource(t, r, a, n[a], {
        silent: !0
      });
    i.silent || this.emit("added", t, r, n);
  }
  addResourceBundle(t, r, n, i, a) {
    let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, s = [t, r];
    t.indexOf(".") > -1 && (s = t.split("."), i = n, n = r, r = s[1]), this.addNamespaces(r);
    let l = di(this.data, s) || {};
    i ? Sf(l, n, a) : l = {
      ...l,
      ...n
    }, ul(this.data, s, l), o.silent || this.emit("added", t, r, n);
  }
  removeResourceBundle(t, r) {
    this.hasResourceBundle(t, r) && delete this.data[t][r], this.removeNamespaces(r), this.emit("removed", t, r);
  }
  hasResourceBundle(t, r) {
    return this.getResource(t, r) !== void 0;
  }
  getResourceBundle(t, r) {
    return r || (r = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? {
      ...this.getResource(t, r)
    } : this.getResource(t, r);
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const r = this.getDataByLanguage(t);
    return !!(r && Object.keys(r) || []).find((i) => r[i] && Object.keys(r[i]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var _f = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, r, n, i) {
    return e.forEach((a) => {
      this.processors[a] && (t = this.processors[a].process(t, r, n, i));
    }), t;
  }
};
const fl = {};
class vi extends Ri {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), Ap(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = r, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = yt.create("translator");
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (t == null)
      return !1;
    const n = this.resolve(t, r);
    return n && n.res !== void 0;
  }
  extractFromKey(t, r) {
    let n = r.nsSeparator !== void 0 ? r.nsSeparator : this.options.nsSeparator;
    n === void 0 && (n = ":");
    const i = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator;
    let a = r.ns || this.options.defaultNS || [];
    const o = n && t.indexOf(n) > -1, s = !this.options.userDefinedKeySeparator && !r.keySeparator && !this.options.userDefinedNsSeparator && !r.nsSeparator && !Lp(t, n, i);
    if (o && !s) {
      const l = t.match(this.interpolator.nestingRegexp);
      if (l && l.length > 0)
        return {
          key: t,
          namespaces: a
        };
      const f = t.split(n);
      (n !== i || n === i && this.options.ns.indexOf(f[0]) > -1) && (a = f.shift()), t = f.join(i);
    }
    return typeof a == "string" && (a = [a]), {
      key: t,
      namespaces: a
    };
  }
  translate(t, r, n) {
    if (typeof r != "object" && this.options.overloadTranslationOptionHandler && (r = this.options.overloadTranslationOptionHandler(arguments)), typeof r == "object" && (r = {
      ...r
    }), r || (r = {}), t == null)
      return "";
    Array.isArray(t) || (t = [String(t)]);
    const i = r.returnDetails !== void 0 ? r.returnDetails : this.options.returnDetails, a = r.keySeparator !== void 0 ? r.keySeparator : this.options.keySeparator, {
      key: o,
      namespaces: s
    } = this.extractFromKey(t[t.length - 1], r), l = s[s.length - 1], f = r.lng || this.language, d = r.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (f && f.toLowerCase() === "cimode") {
      if (d) {
        const p = r.nsSeparator || this.options.nsSeparator;
        return i ? {
          res: `${l}${p}${o}`,
          usedKey: o,
          exactUsedKey: o,
          usedLng: f,
          usedNS: l
        } : `${l}${p}${o}`;
      }
      return i ? {
        res: o,
        usedKey: o,
        exactUsedKey: o,
        usedLng: f,
        usedNS: l
      } : o;
    }
    const c = this.resolve(t, r);
    let u = c && c.res;
    const h = c && c.usedKey || o, y = c && c.exactUsedKey || o, g = Object.prototype.toString.apply(u), b = ["[object Number]", "[object Function]", "[object RegExp]"], v = r.joinArrays !== void 0 ? r.joinArrays : this.options.joinArrays, m = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (m && u && (typeof u != "string" && typeof u != "boolean" && typeof u != "number") && b.indexOf(g) < 0 && !(typeof v == "string" && g === "[object Array]")) {
      if (!r.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const p = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(h, u, {
          ...r,
          ns: s
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return i ? (c.res = p, c) : p;
      }
      if (a) {
        const p = g === "[object Array]", w = p ? [] : {}, S = p ? y : h;
        for (const E in u)
          if (Object.prototype.hasOwnProperty.call(u, E)) {
            const A = `${S}${a}${E}`;
            w[E] = this.translate(A, {
              ...r,
              joinArrays: !1,
              ns: s
            }), w[E] === A && (w[E] = u[E]);
          }
        u = w;
      }
    } else if (m && typeof v == "string" && g === "[object Array]")
      u = u.join(v), u && (u = this.extendTranslation(u, t, r, n));
    else {
      let p = !1, w = !1;
      const S = r.count !== void 0 && typeof r.count != "string", E = vi.hasDefaultValue(r), A = S ? this.pluralResolver.getSuffix(f, r.count, r) : "", j = r.ordinal && S ? this.pluralResolver.getSuffix(f, r.count, {
        ordinal: !1
      }) : "", _ = r[`defaultValue${A}`] || r[`defaultValue${j}`] || r.defaultValue;
      !this.isValidLookup(u) && E && (p = !0, u = _), this.isValidLookup(u) || (w = !0, u = o);
      const N = (r.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && w ? void 0 : u, k = E && _ !== u && this.options.updateMissing;
      if (w || p || k) {
        if (this.logger.log(k ? "updateKey" : "missingKey", f, l, o, k ? _ : u), a) {
          const U = this.resolve(o, {
            ...r,
            keySeparator: !1
          });
          U && U.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let I = [];
        const R = this.languageUtils.getFallbackCodes(this.options.fallbackLng, r.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && R && R[0])
          for (let U = 0; U < R.length; U++)
            I.push(R[U]);
        else
          this.options.saveMissingTo === "all" ? I = this.languageUtils.toResolveHierarchy(r.lng || this.language) : I.push(r.lng || this.language);
        const H = (U, G, q) => {
          const P = E && q !== u ? q : N;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(U, l, G, P, k, r) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(U, l, G, P, k, r), this.emit("missingKey", U, l, G, u);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && S ? I.forEach((U) => {
          this.pluralResolver.getSuffixes(U, r).forEach((G) => {
            H([U], o + G, r[`defaultValue${G}`] || _);
          });
        }) : H(I, o, _));
      }
      u = this.extendTranslation(u, t, r, c, n), w && u === o && this.options.appendNamespaceToMissingKey && (u = `${l}:${o}`), (w || p) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? u = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${l}:${o}` : o, p ? u : void 0) : u = this.options.parseMissingKeyHandler(u));
    }
    return i ? (c.res = u, c) : u;
  }
  extendTranslation(t, r, n, i, a) {
    var o = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      t = this.i18nFormat.parse(t, {
        ...this.options.interpolation.defaultVariables,
        ...n
      }, n.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
        resolved: i
      });
    else if (!n.skipInterpolation) {
      n.interpolation && this.interpolator.init({
        ...n,
        interpolation: {
          ...this.options.interpolation,
          ...n.interpolation
        }
      });
      const f = typeof t == "string" && (n && n.interpolation && n.interpolation.skipOnVariables !== void 0 ? n.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let d;
      if (f) {
        const u = t.match(this.interpolator.nestingRegexp);
        d = u && u.length;
      }
      let c = n.replace && typeof n.replace != "string" ? n.replace : n;
      if (this.options.interpolation.defaultVariables && (c = {
        ...this.options.interpolation.defaultVariables,
        ...c
      }), t = this.interpolator.interpolate(t, c, n.lng || this.language, n), f) {
        const u = t.match(this.interpolator.nestingRegexp), h = u && u.length;
        d < h && (n.nest = !1);
      }
      !n.lng && this.options.compatibilityAPI !== "v1" && i && i.res && (n.lng = i.usedLng), n.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var u = arguments.length, h = new Array(u), y = 0; y < u; y++)
          h[y] = arguments[y];
        return a && a[0] === h[0] && !n.context ? (o.logger.warn(`It seems you are nesting recursively key: ${h[0]} in key: ${r[0]}`), null) : o.translate(...h, r);
      }, n)), n.interpolation && this.interpolator.reset();
    }
    const s = n.postProcess || this.options.postProcess, l = typeof s == "string" ? [s] : s;
    return t != null && l && l.length && n.applyPostProcessor !== !1 && (t = _f.handle(l, t, r, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: i,
      ...n
    } : n, this)), t;
  }
  resolve(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n, i, a, o, s;
    return typeof t == "string" && (t = [t]), t.forEach((l) => {
      if (this.isValidLookup(n))
        return;
      const f = this.extractFromKey(l, r), d = f.key;
      i = d;
      let c = f.namespaces;
      this.options.fallbackNS && (c = c.concat(this.options.fallbackNS));
      const u = r.count !== void 0 && typeof r.count != "string", h = u && !r.ordinal && r.count === 0 && this.pluralResolver.shouldUseIntlApi(), y = r.context !== void 0 && (typeof r.context == "string" || typeof r.context == "number") && r.context !== "", g = r.lngs ? r.lngs : this.languageUtils.toResolveHierarchy(r.lng || this.language, r.fallbackLng);
      c.forEach((b) => {
        this.isValidLookup(n) || (s = b, !fl[`${g[0]}-${b}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(s) && (fl[`${g[0]}-${b}`] = !0, this.logger.warn(`key "${i}" for languages "${g.join(", ")}" won't get resolved as namespace "${s}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), g.forEach((v) => {
          if (this.isValidLookup(n))
            return;
          o = v;
          const m = [d];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(m, d, v, b, r);
          else {
            let p;
            u && (p = this.pluralResolver.getSuffix(v, r.count, r));
            const w = `${this.options.pluralSeparator}zero`, S = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (u && (m.push(d + p), r.ordinal && p.indexOf(S) === 0 && m.push(d + p.replace(S, this.options.pluralSeparator)), h && m.push(d + w)), y) {
              const E = `${d}${this.options.contextSeparator}${r.context}`;
              m.push(E), u && (m.push(E + p), r.ordinal && p.indexOf(S) === 0 && m.push(E + p.replace(S, this.options.pluralSeparator)), h && m.push(E + w));
            }
          }
          let x;
          for (; x = m.pop(); )
            this.isValidLookup(n) || (a = x, n = this.getResource(v, b, x, r));
        }));
      });
    }), {
      res: n,
      usedKey: i,
      exactUsedKey: a,
      usedLng: o,
      usedNS: s
    };
  }
  isValidLookup(t) {
    return t !== void 0 && !(!this.options.returnNull && t === null) && !(!this.options.returnEmptyString && t === "");
  }
  getResource(t, r, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(t, r, n, i) : this.resourceStore.getResource(t, r, n, i);
  }
  static hasDefaultValue(t) {
    const r = "defaultValue";
    for (const n in t)
      if (Object.prototype.hasOwnProperty.call(t, n) && r === n.substring(0, r.length) && t[n] !== void 0)
        return !0;
    return !1;
  }
}
function ca(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
class dl {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = yt.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = pi(t), !t || t.indexOf("-") < 0)
      return null;
    const r = t.split("-");
    return r.length === 2 || (r.pop(), r[r.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(r.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = pi(t), !t || t.indexOf("-") < 0)
      return t;
    const r = t.split("-");
    return this.formatLanguageCode(r[0]);
  }
  formatLanguageCode(t) {
    if (typeof t == "string" && t.indexOf("-") > -1) {
      const r = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let n = t.split("-");
      return this.options.lowerCaseLng ? n = n.map((i) => i.toLowerCase()) : n.length === 2 ? (n[0] = n[0].toLowerCase(), n[1] = n[1].toUpperCase(), r.indexOf(n[1].toLowerCase()) > -1 && (n[1] = ca(n[1].toLowerCase()))) : n.length === 3 && (n[0] = n[0].toLowerCase(), n[1].length === 2 && (n[1] = n[1].toUpperCase()), n[0] !== "sgn" && n[2].length === 2 && (n[2] = n[2].toUpperCase()), r.indexOf(n[1].toLowerCase()) > -1 && (n[1] = ca(n[1].toLowerCase())), r.indexOf(n[2].toLowerCase()) > -1 && (n[2] = ca(n[2].toLowerCase()))), n.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? t.toLowerCase() : t;
  }
  isSupportedCode(t) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(t) > -1;
  }
  getBestMatchFromCodes(t) {
    if (!t)
      return null;
    let r;
    return t.forEach((n) => {
      if (r)
        return;
      const i = this.formatLanguageCode(n);
      (!this.options.supportedLngs || this.isSupportedCode(i)) && (r = i);
    }), !r && this.options.supportedLngs && t.forEach((n) => {
      if (r)
        return;
      const i = this.getLanguagePartFromCode(n);
      if (this.isSupportedCode(i))
        return r = i;
      r = this.options.supportedLngs.find((a) => {
        if (a === i)
          return a;
        if (!(a.indexOf("-") < 0 && i.indexOf("-") < 0) && a.indexOf(i) === 0)
          return a;
      });
    }), r || (r = this.getFallbackCodes(this.options.fallbackLng)[0]), r;
  }
  getFallbackCodes(t, r) {
    if (!t)
      return [];
    if (typeof t == "function" && (t = t(r)), typeof t == "string" && (t = [t]), Object.prototype.toString.apply(t) === "[object Array]")
      return t;
    if (!r)
      return t.default || [];
    let n = t[r];
    return n || (n = t[this.getScriptPartFromCode(r)]), n || (n = t[this.formatLanguageCode(r)]), n || (n = t[this.getLanguagePartFromCode(r)]), n || (n = t.default), n || [];
  }
  toResolveHierarchy(t, r) {
    const n = this.getFallbackCodes(r || this.options.fallbackLng || [], t), i = [], a = (o) => {
      o && (this.isSupportedCode(o) ? i.push(o) : this.logger.warn(`rejecting language code not found in supportedLngs: ${o}`));
    };
    return typeof t == "string" && (t.indexOf("-") > -1 || t.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(t))) : typeof t == "string" && a(this.formatLanguageCode(t)), n.forEach((o) => {
      i.indexOf(o) < 0 && a(this.formatLanguageCode(o));
    }), i;
  }
}
let Mp = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "tl", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kk", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "ht", "id", "ja", "jbo", "ka", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he", "iw"],
  nr: [1, 2, 20, 21],
  fc: 22
}], Dp = {
  1: function(e) {
    return +(e > 1);
  },
  2: function(e) {
    return +(e != 1);
  },
  3: function(e) {
    return 0;
  },
  4: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  5: function(e) {
    return e == 0 ? 0 : e == 1 ? 1 : e == 2 ? 2 : e % 100 >= 3 && e % 100 <= 10 ? 3 : e % 100 >= 11 ? 4 : 5;
  },
  6: function(e) {
    return e == 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2;
  },
  7: function(e) {
    return e == 1 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  8: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e != 8 && e != 11 ? 2 : 3;
  },
  9: function(e) {
    return +(e >= 2);
  },
  10: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4;
  },
  11: function(e) {
    return e == 1 || e == 11 ? 0 : e == 2 || e == 12 ? 1 : e > 2 && e < 20 ? 2 : 3;
  },
  12: function(e) {
    return +(e % 10 != 1 || e % 100 == 11);
  },
  13: function(e) {
    return +(e !== 0);
  },
  14: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : e == 3 ? 2 : 3;
  },
  15: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2;
  },
  16: function(e) {
    return e % 10 == 1 && e % 100 != 11 ? 0 : e !== 0 ? 1 : 2;
  },
  17: function(e) {
    return e == 1 || e % 10 == 1 && e % 100 != 11 ? 0 : 1;
  },
  18: function(e) {
    return e == 0 ? 0 : e == 1 ? 1 : 2;
  },
  19: function(e) {
    return e == 1 ? 0 : e == 0 || e % 100 > 1 && e % 100 < 11 ? 1 : e % 100 > 10 && e % 100 < 20 ? 2 : 3;
  },
  20: function(e) {
    return e == 1 ? 0 : e == 0 || e % 100 > 0 && e % 100 < 20 ? 1 : 2;
  },
  21: function(e) {
    return e % 100 == 1 ? 1 : e % 100 == 2 ? 2 : e % 100 == 3 || e % 100 == 4 ? 3 : 0;
  },
  22: function(e) {
    return e == 1 ? 0 : e == 2 ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3;
  }
};
const Rp = ["v1", "v2", "v3"], $p = ["v4"], hl = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function zp() {
  const e = {};
  return Mp.forEach((t) => {
    t.lngs.forEach((r) => {
      e[r] = {
        numbers: t.nr,
        plurals: Dp[t.fc]
      };
    });
  }), e;
}
class Fp {
  constructor(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = r, this.logger = yt.create("pluralResolver"), (!this.options.compatibilityJSON || $p.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = zp();
  }
  addRule(t, r) {
    this.rules[t] = r;
  }
  getRule(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(pi(t), {
          type: r.ordinal ? "ordinal" : "cardinal"
        });
      } catch {
        return;
      }
    return this.rules[t] || this.rules[this.languageUtils.getLanguagePartFromCode(t)];
  }
  needsPlural(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const n = this.getRule(t, r);
    return this.shouldUseIntlApi() ? n && n.resolvedOptions().pluralCategories.length > 1 : n && n.numbers.length > 1;
  }
  getPluralFormsOfKey(t, r) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(t, n).map((i) => `${r}${i}`);
  }
  getSuffixes(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const n = this.getRule(t, r);
    return n ? this.shouldUseIntlApi() ? n.resolvedOptions().pluralCategories.sort((i, a) => hl[i] - hl[a]).map((i) => `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : n.numbers.map((i) => this.getSuffix(t, i, r)) : [];
  }
  getSuffix(t, r) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = this.getRule(t, n);
    return i ? this.shouldUseIntlApi() ? `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(r)}` : this.getSuffixRetroCompatible(i, r) : (this.logger.warn(`no plural rule found for: ${t}`), "");
  }
  getSuffixRetroCompatible(t, r) {
    const n = t.noAbs ? t.plurals(r) : t.plurals(Math.abs(r));
    let i = t.numbers[n];
    this.options.simplifyPluralSuffix && t.numbers.length === 2 && t.numbers[0] === 1 && (i === 2 ? i = "plural" : i === 1 && (i = ""));
    const a = () => this.options.prepend && i.toString() ? this.options.prepend + i.toString() : i.toString();
    return this.options.compatibilityJSON === "v1" ? i === 1 ? "" : typeof i == "number" ? `_plural_${i.toString()}` : a() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && t.numbers.length === 2 && t.numbers[0] === 1 ? a() : this.options.prepend && n.toString() ? this.options.prepend + n.toString() : n.toString();
  }
  shouldUseIntlApi() {
    return !Rp.includes(this.options.compatibilityJSON);
  }
}
function pl(e, t, r) {
  let n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, a = jp(e, t, r);
  return !a && i && typeof r == "string" && (a = hi(e, r, n), a === void 0 && (a = hi(t, r, n))), a;
}
class Bp {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = yt.create("interpolator"), this.options = t, this.format = t.interpolation && t.interpolation.format || ((r) => r), this.init(t);
  }
  init() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    t.interpolation || (t.interpolation = {
      escapeValue: !0
    });
    const r = t.interpolation;
    this.escape = r.escape !== void 0 ? r.escape : Cp, this.escapeValue = r.escapeValue !== void 0 ? r.escapeValue : !0, this.useRawValueToEscape = r.useRawValueToEscape !== void 0 ? r.useRawValueToEscape : !1, this.prefix = r.prefix ? ar(r.prefix) : r.prefixEscaped || "{{", this.suffix = r.suffix ? ar(r.suffix) : r.suffixEscaped || "}}", this.formatSeparator = r.formatSeparator ? r.formatSeparator : r.formatSeparator || ",", this.unescapePrefix = r.unescapeSuffix ? "" : r.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : r.unescapeSuffix || "", this.nestingPrefix = r.nestingPrefix ? ar(r.nestingPrefix) : r.nestingPrefixEscaped || ar("$t("), this.nestingSuffix = r.nestingSuffix ? ar(r.nestingSuffix) : r.nestingSuffixEscaped || ar(")"), this.nestingOptionsSeparator = r.nestingOptionsSeparator ? r.nestingOptionsSeparator : r.nestingOptionsSeparator || ",", this.maxReplaces = r.maxReplaces ? r.maxReplaces : 1e3, this.alwaysFormat = r.alwaysFormat !== void 0 ? r.alwaysFormat : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(t, "g");
    const r = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(r, "g");
    const n = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(n, "g");
  }
  interpolate(t, r, n, i) {
    let a, o, s;
    const l = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function f(y) {
      return y.replace(/\$/g, "$$$$");
    }
    const d = (y) => {
      if (y.indexOf(this.formatSeparator) < 0) {
        const m = pl(r, l, y, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(m, void 0, n, {
          ...i,
          ...r,
          interpolationkey: y
        }) : m;
      }
      const g = y.split(this.formatSeparator), b = g.shift().trim(), v = g.join(this.formatSeparator).trim();
      return this.format(pl(r, l, b, this.options.keySeparator, this.options.ignoreJSONStructure), v, n, {
        ...i,
        ...r,
        interpolationkey: b
      });
    };
    this.resetRegExp();
    const c = i && i.missingInterpolationHandler || this.options.missingInterpolationHandler, u = i && i.interpolation && i.interpolation.skipOnVariables !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (y) => f(y)
    }, {
      regex: this.regexp,
      safeValue: (y) => this.escapeValue ? f(this.escape(y)) : f(y)
    }].forEach((y) => {
      for (s = 0; a = y.regex.exec(t); ) {
        const g = a[1].trim();
        if (o = d(g), o === void 0)
          if (typeof c == "function") {
            const v = c(t, a, i);
            o = typeof v == "string" ? v : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, g))
            o = "";
          else if (u) {
            o = a[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${g} for interpolating ${t}`), o = "";
        else
          typeof o != "string" && !this.useRawValueToEscape && (o = ll(o));
        const b = y.safeValue(o);
        if (t = t.replace(a[0], b), u ? (y.regex.lastIndex += o.length, y.regex.lastIndex -= a[0].length) : y.regex.lastIndex = 0, s++, s >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, r) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i, a, o;
    function s(l, f) {
      const d = this.nestingOptionsSeparator;
      if (l.indexOf(d) < 0)
        return l;
      const c = l.split(new RegExp(`${d}[ ]*{`));
      let u = `{${c[1]}`;
      l = c[0], u = this.interpolate(u, o);
      const h = u.match(/'/g), y = u.match(/"/g);
      (h && h.length % 2 === 0 && !y || y.length % 2 !== 0) && (u = u.replace(/'/g, '"'));
      try {
        o = JSON.parse(u), f && (o = {
          ...f,
          ...o
        });
      } catch (g) {
        return this.logger.warn(`failed parsing options string in nesting for key ${l}`, g), `${l}${d}${u}`;
      }
      return delete o.defaultValue, l;
    }
    for (; i = this.nestingRegexp.exec(t); ) {
      let l = [];
      o = {
        ...n
      }, o = o.replace && typeof o.replace != "string" ? o.replace : o, o.applyPostProcessor = !1, delete o.defaultValue;
      let f = !1;
      if (i[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(i[1])) {
        const d = i[1].split(this.formatSeparator).map((c) => c.trim());
        i[1] = d.shift(), l = d, f = !0;
      }
      if (a = r(s.call(this, i[1].trim(), o), o), a && i[0] === t && typeof a != "string")
        return a;
      typeof a != "string" && (a = ll(a)), a || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${t}`), a = ""), f && (a = l.reduce((d, c) => this.format(d, c, n.lng, {
        ...n,
        interpolationkey: i[1].trim()
      }), a.trim())), t = t.replace(i[0], a), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
function qp(e) {
  let t = e.toLowerCase().trim();
  const r = {};
  if (e.indexOf("(") > -1) {
    const n = e.split("(");
    t = n[0].toLowerCase().trim();
    const i = n[1].substring(0, n[1].length - 1);
    t === "currency" && i.indexOf(":") < 0 ? r.currency || (r.currency = i.trim()) : t === "relativetime" && i.indexOf(":") < 0 ? r.range || (r.range = i.trim()) : i.split(";").forEach((o) => {
      if (!o)
        return;
      const [s, ...l] = o.split(":"), f = l.join(":").trim().replace(/^'+|'+$/g, "");
      r[s.trim()] || (r[s.trim()] = f), f === "false" && (r[s.trim()] = !1), f === "true" && (r[s.trim()] = !0), isNaN(f) || (r[s.trim()] = parseInt(f, 10));
    });
  }
  return {
    formatName: t,
    formatOptions: r
  };
}
function or(e) {
  const t = {};
  return function(n, i, a) {
    const o = i + JSON.stringify(a);
    let s = t[o];
    return s || (s = e(pi(i), a), t[o] = s), s(n);
  };
}
class Up {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = yt.create("formatter"), this.options = t, this.formats = {
      number: or((r, n) => {
        const i = new Intl.NumberFormat(r, {
          ...n
        });
        return (a) => i.format(a);
      }),
      currency: or((r, n) => {
        const i = new Intl.NumberFormat(r, {
          ...n,
          style: "currency"
        });
        return (a) => i.format(a);
      }),
      datetime: or((r, n) => {
        const i = new Intl.DateTimeFormat(r, {
          ...n
        });
        return (a) => i.format(a);
      }),
      relativetime: or((r, n) => {
        const i = new Intl.RelativeTimeFormat(r, {
          ...n
        });
        return (a) => i.format(a, n.range || "day");
      }),
      list: or((r, n) => {
        const i = new Intl.ListFormat(r, {
          ...n
        });
        return (a) => i.format(a);
      })
    }, this.init(t);
  }
  init(t) {
    const n = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    }).interpolation;
    this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ",";
  }
  add(t, r) {
    this.formats[t.toLowerCase().trim()] = r;
  }
  addCached(t, r) {
    this.formats[t.toLowerCase().trim()] = or(r);
  }
  format(t, r, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return r.split(this.formatSeparator).reduce((s, l) => {
      const {
        formatName: f,
        formatOptions: d
      } = qp(l);
      if (this.formats[f]) {
        let c = s;
        try {
          const u = i && i.formatParams && i.formatParams[i.interpolationkey] || {}, h = u.locale || u.lng || i.locale || i.lng || n;
          c = this.formats[f](s, h, {
            ...d,
            ...i,
            ...u
          });
        } catch (u) {
          this.logger.warn(u);
        }
        return c;
      } else
        this.logger.warn(`there was no format function for ${f}`);
      return s;
    }, t);
  }
}
function Hp(e, t) {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
}
class Wp extends Ri {
  constructor(t, r, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = r, this.services = n, this.languageUtils = n.languageUtils, this.options = i, this.logger = yt.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(n, i.backend, i);
  }
  queueLoad(t, r, n, i) {
    const a = {}, o = {}, s = {}, l = {};
    return t.forEach((f) => {
      let d = !0;
      r.forEach((c) => {
        const u = `${f}|${c}`;
        !n.reload && this.store.hasResourceBundle(f, c) ? this.state[u] = 2 : this.state[u] < 0 || (this.state[u] === 1 ? o[u] === void 0 && (o[u] = !0) : (this.state[u] = 1, d = !1, o[u] === void 0 && (o[u] = !0), a[u] === void 0 && (a[u] = !0), l[c] === void 0 && (l[c] = !0)));
      }), d || (s[f] = !0);
    }), (Object.keys(a).length || Object.keys(o).length) && this.queue.push({
      pending: o,
      pendingCount: Object.keys(o).length,
      loaded: {},
      errors: [],
      callback: i
    }), {
      toLoad: Object.keys(a),
      pending: Object.keys(o),
      toLoadLanguages: Object.keys(s),
      toLoadNamespaces: Object.keys(l)
    };
  }
  loaded(t, r, n) {
    const i = t.split("|"), a = i[0], o = i[1];
    r && this.emit("failedLoading", a, o, r), n && this.store.addResourceBundle(a, o, n), this.state[t] = r ? -1 : 2;
    const s = {};
    this.queue.forEach((l) => {
      kp(l.loaded, [a], o), Hp(l, t), r && l.errors.push(r), l.pendingCount === 0 && !l.done && (Object.keys(l.loaded).forEach((f) => {
        s[f] || (s[f] = {});
        const d = l.loaded[f];
        d.length && d.forEach((c) => {
          s[f][c] === void 0 && (s[f][c] = !0);
        });
      }), l.done = !0, l.errors.length ? l.callback(l.errors) : l.callback());
    }), this.emit("loaded", s), this.queue = this.queue.filter((l) => !l.done);
  }
  read(t, r, n) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, o = arguments.length > 5 ? arguments[5] : void 0;
    if (!t.length)
      return o(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: r,
        fcName: n,
        tried: i,
        wait: a,
        callback: o
      });
      return;
    }
    this.readingCalls++;
    const s = (f, d) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const c = this.waitingReads.shift();
        this.read(c.lng, c.ns, c.fcName, c.tried, c.wait, c.callback);
      }
      if (f && d && i < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, t, r, n, i + 1, a * 2, o);
        }, a);
        return;
      }
      o(f, d);
    }, l = this.backend[n].bind(this.backend);
    if (l.length === 2) {
      try {
        const f = l(t, r);
        f && typeof f.then == "function" ? f.then((d) => s(null, d)).catch(s) : s(null, f);
      } catch (f) {
        s(f);
      }
      return;
    }
    return l(t, r, s);
  }
  prepareLoading(t, r) {
    let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
    typeof t == "string" && (t = this.languageUtils.toResolveHierarchy(t)), typeof r == "string" && (r = [r]);
    const a = this.queueLoad(t, r, n, i);
    if (!a.toLoad.length)
      return a.pending.length || i(), null;
    a.toLoad.forEach((o) => {
      this.loadOne(o);
    });
  }
  load(t, r, n) {
    this.prepareLoading(t, r, {}, n);
  }
  reload(t, r, n) {
    this.prepareLoading(t, r, {
      reload: !0
    }, n);
  }
  loadOne(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const n = t.split("|"), i = n[0], a = n[1];
    this.read(i, a, "read", void 0, void 0, (o, s) => {
      o && this.logger.warn(`${r}loading namespace ${a} for language ${i} failed`, o), !o && s && this.logger.log(`${r}loaded namespace ${a} for language ${i}`, s), this.loaded(t, o, s);
    });
  }
  saveMissing(t, r, n, i, a) {
    let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, s = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(r)) {
      this.logger.warn(`did not save key "${n}" as the namespace "${r}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(n == null || n === "")) {
      if (this.backend && this.backend.create) {
        const l = {
          ...o,
          isUpdate: a
        }, f = this.backend.create.bind(this.backend);
        if (f.length < 6)
          try {
            let d;
            f.length === 5 ? d = f(t, r, n, i, l) : d = f(t, r, n, i), d && typeof d.then == "function" ? d.then((c) => s(null, c)).catch(s) : s(null, d);
          } catch (d) {
            s(d);
          }
        else
          f(t, r, n, i, s, l);
      }
      !t || !t[0] || this.store.addResource(t[0], r, n, i);
    }
  }
}
function vl() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function(t) {
      let r = {};
      if (typeof t[1] == "object" && (r = t[1]), typeof t[1] == "string" && (r.defaultValue = t[1]), typeof t[2] == "string" && (r.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
        const n = t[3] || t[2];
        Object.keys(n).forEach((i) => {
          r[i] = n[i];
        });
      }
      return r;
    },
    interpolation: {
      escapeValue: !0,
      format: (e, t, r, n) => e,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0
    }
  };
}
function gl(e) {
  return typeof e.ns == "string" && (e.ns = [e.ns]), typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]), typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
}
function Sn() {
}
function Yp(e) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((r) => {
    typeof e[r] == "function" && (e[r] = e[r].bind(e));
  });
}
class sn extends Ri {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = gl(t), this.services = {}, this.logger = yt, this.modules = {
      external: []
    }, Yp(this), r && !this.isInitialized && !t.isClone) {
      if (!this.options.initImmediate)
        return this.init(t, r), this;
      setTimeout(() => {
        this.init(t, r);
      }, 0);
    }
  }
  init() {
    var t = this;
    let r = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    typeof r == "function" && (n = r, r = {}), !r.defaultNS && r.defaultNS !== !1 && r.ns && (typeof r.ns == "string" ? r.defaultNS = r.ns : r.ns.indexOf("translation") < 0 && (r.defaultNS = r.ns[0]));
    const i = vl();
    this.options = {
      ...i,
      ...this.options,
      ...gl(r)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...i.interpolation,
      ...this.options.interpolation
    }), r.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = r.keySeparator), r.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = r.nsSeparator);
    function a(d) {
      return d ? typeof d == "function" ? new d() : d : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? yt.init(a(this.modules.logger), this.options) : yt.init(null, this.options);
      let d;
      this.modules.formatter ? d = this.modules.formatter : typeof Intl < "u" && (d = Up);
      const c = new dl(this.options);
      this.store = new cl(this.options.resources, this.options);
      const u = this.services;
      u.logger = yt, u.resourceStore = this.store, u.languageUtils = c, u.pluralResolver = new Fp(c, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), d && (!this.options.interpolation.format || this.options.interpolation.format === i.interpolation.format) && (u.formatter = a(d), u.formatter.init(u, this.options), this.options.interpolation.format = u.formatter.format.bind(u.formatter)), u.interpolator = new Bp(this.options), u.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, u.backendConnector = new Wp(a(this.modules.backend), u.resourceStore, u, this.options), u.backendConnector.on("*", function(h) {
        for (var y = arguments.length, g = new Array(y > 1 ? y - 1 : 0), b = 1; b < y; b++)
          g[b - 1] = arguments[b];
        t.emit(h, ...g);
      }), this.modules.languageDetector && (u.languageDetector = a(this.modules.languageDetector), u.languageDetector.init && u.languageDetector.init(u, this.options.detection, this.options)), this.modules.i18nFormat && (u.i18nFormat = a(this.modules.i18nFormat), u.i18nFormat.init && u.i18nFormat.init(this)), this.translator = new vi(this.services, this.options), this.translator.on("*", function(h) {
        for (var y = arguments.length, g = new Array(y > 1 ? y - 1 : 0), b = 1; b < y; b++)
          g[b - 1] = arguments[b];
        t.emit(h, ...g);
      }), this.modules.external.forEach((h) => {
        h.init && h.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, n || (n = Sn), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const d = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      d.length > 0 && d[0] !== "dev" && (this.options.lng = d[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((d) => {
      this[d] = function() {
        return t.store[d](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((d) => {
      this[d] = function() {
        return t.store[d](...arguments), t;
      };
    });
    const l = Yr(), f = () => {
      const d = (c, u) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), l.resolve(u), n(c, u);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return d(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, d);
    };
    return this.options.resources || !this.options.initImmediate ? f() : setTimeout(f, 0), l;
  }
  loadResources(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Sn;
    const i = typeof t == "string" ? t : this.language;
    if (typeof t == "function" && (n = t), !this.options.resources || this.options.partialBundledLanguages) {
      if (i && i.toLowerCase() === "cimode")
        return n();
      const a = [], o = (s) => {
        if (!s)
          return;
        this.services.languageUtils.toResolveHierarchy(s).forEach((f) => {
          a.indexOf(f) < 0 && a.push(f);
        });
      };
      i ? o(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => o(l)), this.options.preload && this.options.preload.forEach((s) => o(s)), this.services.backendConnector.load(a, this.options.ns, (s) => {
        !s && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), n(s);
      });
    } else
      n(null);
  }
  reloadResources(t, r, n) {
    const i = Yr();
    return t || (t = this.languages), r || (r = this.options.ns), n || (n = Sn), this.services.backendConnector.reload(t, r, (a) => {
      i.resolve(), n(a);
    }), i;
  }
  use(t) {
    if (!t)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && _f.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(["cimode", "dev"].indexOf(t) > -1))
      for (let r = 0; r < this.languages.length; r++) {
        const n = this.languages[r];
        if (!(["cimode", "dev"].indexOf(n) > -1) && this.store.hasLanguageSomeTranslations(n)) {
          this.resolvedLanguage = n;
          break;
        }
      }
  }
  changeLanguage(t, r) {
    var n = this;
    this.isLanguageChangingTo = t;
    const i = Yr();
    this.emit("languageChanging", t);
    const a = (l) => {
      this.language = l, this.languages = this.services.languageUtils.toResolveHierarchy(l), this.resolvedLanguage = void 0, this.setResolvedLanguage(l);
    }, o = (l, f) => {
      f ? (a(f), this.translator.changeLanguage(f), this.isLanguageChangingTo = void 0, this.emit("languageChanged", f), this.logger.log("languageChanged", f)) : this.isLanguageChangingTo = void 0, i.resolve(function() {
        return n.t(...arguments);
      }), r && r(l, function() {
        return n.t(...arguments);
      });
    }, s = (l) => {
      !t && !l && this.services.languageDetector && (l = []);
      const f = typeof l == "string" ? l : this.services.languageUtils.getBestMatchFromCodes(l);
      f && (this.language || a(f), this.translator.language || this.translator.changeLanguage(f), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(f)), this.loadResources(f, (d) => {
        o(d, f);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? s(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(s) : this.services.languageDetector.detect(s) : s(t), i;
  }
  getFixedT(t, r, n) {
    var i = this;
    const a = function(o, s) {
      let l;
      if (typeof s != "object") {
        for (var f = arguments.length, d = new Array(f > 2 ? f - 2 : 0), c = 2; c < f; c++)
          d[c - 2] = arguments[c];
        l = i.options.overloadTranslationOptionHandler([o, s].concat(d));
      } else
        l = {
          ...s
        };
      l.lng = l.lng || a.lng, l.lngs = l.lngs || a.lngs, l.ns = l.ns || a.ns, l.keyPrefix = l.keyPrefix || n || a.keyPrefix;
      const u = i.options.keySeparator || ".";
      let h;
      return l.keyPrefix && Array.isArray(o) ? h = o.map((y) => `${l.keyPrefix}${u}${y}`) : h = l.keyPrefix ? `${l.keyPrefix}${u}${o}` : o, i.t(h, l);
    };
    return typeof t == "string" ? a.lng = t : a.lngs = t, a.ns = r, a.keyPrefix = n, a;
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(t) {
    this.options.defaultNS = t;
  }
  hasLoadedNamespace(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const n = r.lng || this.resolvedLanguage || this.languages[0], i = this.options ? this.options.fallbackLng : !1, a = this.languages[this.languages.length - 1];
    if (n.toLowerCase() === "cimode")
      return !0;
    const o = (s, l) => {
      const f = this.services.backendConnector.state[`${s}|${l}`];
      return f === -1 || f === 2;
    };
    if (r.precheck) {
      const s = r.precheck(this, o);
      if (s !== void 0)
        return s;
    }
    return !!(this.hasResourceBundle(n, t) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || o(n, t) && (!i || o(a, t)));
  }
  loadNamespaces(t, r) {
    const n = Yr();
    return this.options.ns ? (typeof t == "string" && (t = [t]), t.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      n.resolve(), r && r(i);
    }), n) : (r && r(), Promise.resolve());
  }
  loadLanguages(t, r) {
    const n = Yr();
    typeof t == "string" && (t = [t]);
    const i = this.options.preload || [], a = t.filter((o) => i.indexOf(o) < 0);
    return a.length ? (this.options.preload = i.concat(a), this.loadResources((o) => {
      n.resolve(), r && r(o);
    }), n) : (r && r(), Promise.resolve());
  }
  dir(t) {
    if (t || (t = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !t)
      return "rtl";
    const r = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], n = this.services && this.services.languageUtils || new dl(vl());
    return r.indexOf(n.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    return new sn(t, r);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Sn;
    const n = t.forkResourceStore;
    n && delete t.forkResourceStore;
    const i = {
      ...this.options,
      ...t,
      isClone: !0
    }, a = new sn(i);
    return (t.debug !== void 0 || t.prefix !== void 0) && (a.logger = a.logger.clone(t)), ["store", "services", "language"].forEach((s) => {
      a[s] = this[s];
    }), a.services = {
      ...this.services
    }, a.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, n && (a.store = new cl(this.store.data, i), a.services.resourceStore = a.store), a.translator = new vi(a.services, i), a.translator.on("*", function(s) {
      for (var l = arguments.length, f = new Array(l > 1 ? l - 1 : 0), d = 1; d < l; d++)
        f[d - 1] = arguments[d];
      a.emit(s, ...f);
    }), a.init(i, r), a.translator.options = i, a.translator.backendConnector.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, a;
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage
    };
  }
}
const Ze = sn.createInstance();
Ze.createInstance = sn.createInstance;
Ze.createInstance;
Ze.dir;
Ze.init;
Ze.loadResources;
Ze.reloadResources;
Ze.use;
Ze.changeLanguage;
Ze.getFixedT;
Ze.t;
Ze.exists;
Ze.setDefaultNamespace;
Ze.hasLoadedNamespace;
Ze.loadNamespaces;
Ze.loadLanguages;
var rt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Tf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Vp() {
  if (console && console.warn) {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    typeof t[0] == "string" && (t[0] = `react-i18next:: ${t[0]}`), console.warn(...t);
  }
}
const ml = {};
function ro() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  typeof t[0] == "string" && ml[t[0]] || (typeof t[0] == "string" && (ml[t[0]] = /* @__PURE__ */ new Date()), Vp(...t));
}
const Nf = (e, t) => () => {
  if (e.isInitialized)
    t();
  else {
    const r = () => {
      setTimeout(() => {
        e.off("initialized", r);
      }, 0), t();
    };
    e.on("initialized", r);
  }
};
function yl(e, t, r) {
  e.loadNamespaces(t, Nf(e, r));
}
function bl(e, t, r, n) {
  typeof r == "string" && (r = [r]), r.forEach((i) => {
    e.options.ns.indexOf(i) < 0 && e.options.ns.push(i);
  }), e.loadLanguages(t, Nf(e, n));
}
function Gp(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const n = t.languages[0], i = t.options ? t.options.fallbackLng : !1, a = t.languages[t.languages.length - 1];
  if (n.toLowerCase() === "cimode")
    return !0;
  const o = (s, l) => {
    const f = t.services.backendConnector.state[`${s}|${l}`];
    return f === -1 || f === 2;
  };
  return r.bindI18n && r.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !o(t.isLanguageChangingTo, e) ? !1 : !!(t.hasResourceBundle(n, e) || !t.services.backendConnector.backend || t.options.resources && !t.options.partialBundledLanguages || o(n, e) && (!i || o(a, e)));
}
function Kp(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !t.languages || !t.languages.length ? (ro("i18n.languages were undefined or empty", t.languages), !0) : t.options.ignoreJSONStructure !== void 0 ? t.hasLoadedNamespace(e, {
    lng: r.lng,
    precheck: (i, a) => {
      if (r.bindI18n && r.bindI18n.indexOf("languageChanging") > -1 && i.services.backendConnector.backend && i.isLanguageChangingTo && !a(i.isLanguageChangingTo, e))
        return !1;
    }
  }) : Gp(e, t, r);
}
const Zp = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Qp = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "©",
  "&#169;": "©",
  "&reg;": "®",
  "&#174;": "®",
  "&hellip;": "…",
  "&#8230;": "…",
  "&#x2F;": "/",
  "&#47;": "/"
}, Xp = (e) => Qp[e], Jp = (e) => e.replace(Zp, Xp);
let no = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: Jp
};
function ev() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  no = {
    ...no,
    ...e
  };
}
function tv() {
  return no;
}
let Af;
function rv(e) {
  Af = e;
}
function nv() {
  return Af;
}
const iv = {
  type: "3rdParty",
  init(e) {
    ev(e.options.react), rv(e);
  }
}, av = Of();
class ov {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((r) => {
      this.usedNamespaces[r] || (this.usedNamespaces[r] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const sv = (e, t) => {
  const r = Ie();
  return Me(() => {
    r.current = t ? r.current : e;
  }, [e, t]), r.current;
};
function er(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    i18n: r
  } = t, {
    i18n: n,
    defaultNS: i
  } = cs(av) || {}, a = r || n || nv();
  if (a && !a.reportNamespaces && (a.reportNamespaces = new ov()), !a) {
    ro("You will need to pass in an i18next instance by using initReactI18next");
    const x = (w, S) => typeof S == "string" ? S : S && typeof S == "object" && typeof S.defaultValue == "string" ? S.defaultValue : Array.isArray(w) ? w[w.length - 1] : w, p = [x, {}, !1];
    return p.t = x, p.i18n = {}, p.ready = !1, p;
  }
  a.options.react && a.options.react.wait !== void 0 && ro("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const o = {
    ...tv(),
    ...a.options.react,
    ...t
  }, {
    useSuspense: s,
    keyPrefix: l
  } = o;
  let f = e || i || a.options && a.options.defaultNS;
  f = typeof f == "string" ? [f] : f || ["translation"], a.reportNamespaces.addUsedNamespaces && a.reportNamespaces.addUsedNamespaces(f);
  const d = (a.isInitialized || a.initializedStoreOnce) && f.every((x) => Kp(x, a, o));
  function c() {
    return a.getFixedT(t.lng || null, o.nsMode === "fallback" ? f : f[0], l);
  }
  const [u, h] = Ke(c);
  let y = f.join();
  t.lng && (y = `${t.lng}${y}`);
  const g = sv(y), b = Ie(!0);
  Me(() => {
    const {
      bindI18n: x,
      bindI18nStore: p
    } = o;
    b.current = !0, !d && !s && (t.lng ? bl(a, t.lng, f, () => {
      b.current && h(c);
    }) : yl(a, f, () => {
      b.current && h(c);
    })), d && g && g !== y && b.current && h(c);
    function w() {
      b.current && h(c);
    }
    return x && a && a.on(x, w), p && a && a.store.on(p, w), () => {
      b.current = !1, x && a && x.split(" ").forEach((S) => a.off(S, w)), p && a && p.split(" ").forEach((S) => a.store.off(S, w));
    };
  }, [a, y]);
  const v = Ie(!0);
  Me(() => {
    b.current && !v.current && h(c), v.current = !1;
  }, [a, l]);
  const m = [u, a, d];
  if (m.t = u, m.i18n = a, m.ready = d, d || !d && !s)
    return m;
  throw new Promise((x) => {
    t.lng ? bl(a, t.lng, f, () => x()) : yl(a, f, () => x());
  });
}
function tA(e) {
  Ze.use(iv).init(e);
}
var io = { exports: {} }, Vr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wl;
function lv() {
  if (wl)
    return Vr;
  wl = 1;
  var e = Ce, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(s, l, f) {
    var d, c = {}, u = null, h = null;
    f !== void 0 && (u = "" + f), l.key !== void 0 && (u = "" + l.key), l.ref !== void 0 && (h = l.ref);
    for (d in l)
      n.call(l, d) && !a.hasOwnProperty(d) && (c[d] = l[d]);
    if (s && s.defaultProps)
      for (d in l = s.defaultProps, l)
        c[d] === void 0 && (c[d] = l[d]);
    return { $$typeof: t, type: s, key: u, ref: h, props: c, _owner: i.current };
  }
  return Vr.Fragment = r, Vr.jsx = o, Vr.jsxs = o, Vr;
}
var Gr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xl;
function uv() {
  return xl || (xl = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Ce, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), y = Symbol.iterator, g = "@@iterator";
    function b(B) {
      if (B === null || typeof B != "object")
        return null;
      var re = y && B[y] || B[g];
      return typeof re == "function" ? re : null;
    }
    var v = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function m(B) {
      {
        for (var re = arguments.length, oe = new Array(re > 1 ? re - 1 : 0), fe = 1; fe < re; fe++)
          oe[fe - 1] = arguments[fe];
        x("error", B, oe);
      }
    }
    function x(B, re, oe) {
      {
        var fe = v.ReactDebugCurrentFrame, Ee = fe.getStackAddendum();
        Ee !== "" && (re += "%s", oe = oe.concat([Ee]));
        var Ae = oe.map(function(xe) {
          return String(xe);
        });
        Ae.unshift("Warning: " + re), Function.prototype.apply.call(console[B], console, Ae);
      }
    }
    var p = !1, w = !1, S = !1, E = !1, A = !1, j;
    j = Symbol.for("react.module.reference");
    function _(B) {
      return !!(typeof B == "string" || typeof B == "function" || B === n || B === a || A || B === i || B === f || B === d || E || B === h || p || w || S || typeof B == "object" && B !== null && (B.$$typeof === u || B.$$typeof === c || B.$$typeof === o || B.$$typeof === s || B.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      B.$$typeof === j || B.getModuleId !== void 0));
    }
    function O(B, re, oe) {
      var fe = B.displayName;
      if (fe)
        return fe;
      var Ee = re.displayName || re.name || "";
      return Ee !== "" ? oe + "(" + Ee + ")" : oe;
    }
    function N(B) {
      return B.displayName || "Context";
    }
    function k(B) {
      if (B == null)
        return null;
      if (typeof B.tag == "number" && m("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof B == "function")
        return B.displayName || B.name || null;
      if (typeof B == "string")
        return B;
      switch (B) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case i:
          return "StrictMode";
        case f:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof B == "object")
        switch (B.$$typeof) {
          case s:
            var re = B;
            return N(re) + ".Consumer";
          case o:
            var oe = B;
            return N(oe._context) + ".Provider";
          case l:
            return O(B, B.render, "ForwardRef");
          case c:
            var fe = B.displayName || null;
            return fe !== null ? fe : k(B.type) || "Memo";
          case u: {
            var Ee = B, Ae = Ee._payload, xe = Ee._init;
            try {
              return k(xe(Ae));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, R = 0, H, U, G, q, P, T, M;
    function D() {
    }
    D.__reactDisabledLog = !0;
    function F() {
      {
        if (R === 0) {
          H = console.log, U = console.info, G = console.warn, q = console.error, P = console.group, T = console.groupCollapsed, M = console.groupEnd;
          var B = {
            configurable: !0,
            enumerable: !0,
            value: D,
            writable: !0
          };
          Object.defineProperties(console, {
            info: B,
            log: B,
            warn: B,
            error: B,
            group: B,
            groupCollapsed: B,
            groupEnd: B
          });
        }
        R++;
      }
    }
    function z() {
      {
        if (R--, R === 0) {
          var B = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, B, {
              value: H
            }),
            info: I({}, B, {
              value: U
            }),
            warn: I({}, B, {
              value: G
            }),
            error: I({}, B, {
              value: q
            }),
            group: I({}, B, {
              value: P
            }),
            groupCollapsed: I({}, B, {
              value: T
            }),
            groupEnd: I({}, B, {
              value: M
            })
          });
        }
        R < 0 && m("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var C = v.ReactCurrentDispatcher, $;
    function W(B, re, oe) {
      {
        if ($ === void 0)
          try {
            throw Error();
          } catch (Ee) {
            var fe = Ee.stack.trim().match(/\n( *(at )?)/);
            $ = fe && fe[1] || "";
          }
        return `
` + $ + B;
      }
    }
    var Y = !1, V;
    {
      var te = typeof WeakMap == "function" ? WeakMap : Map;
      V = new te();
    }
    function Z(B, re) {
      if (!B || Y)
        return "";
      {
        var oe = V.get(B);
        if (oe !== void 0)
          return oe;
      }
      var fe;
      Y = !0;
      var Ee = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ae;
      Ae = C.current, C.current = null, F();
      try {
        if (re) {
          var xe = function() {
            throw Error();
          };
          if (Object.defineProperty(xe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(xe, []);
            } catch (xt) {
              fe = xt;
            }
            Reflect.construct(B, [], xe);
          } else {
            try {
              xe.call();
            } catch (xt) {
              fe = xt;
            }
            B.call(xe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (xt) {
            fe = xt;
          }
          B();
        }
      } catch (xt) {
        if (xt && fe && typeof xt.stack == "string") {
          for (var be = xt.stack.split(`
`), Qe = fe.stack.split(`
`), Fe = be.length - 1, Be = Qe.length - 1; Fe >= 1 && Be >= 0 && be[Fe] !== Qe[Be]; )
            Be--;
          for (; Fe >= 1 && Be >= 0; Fe--, Be--)
            if (be[Fe] !== Qe[Be]) {
              if (Fe !== 1 || Be !== 1)
                do
                  if (Fe--, Be--, Be < 0 || be[Fe] !== Qe[Be]) {
                    var at = `
` + be[Fe].replace(" at new ", " at ");
                    return B.displayName && at.includes("<anonymous>") && (at = at.replace("<anonymous>", B.displayName)), typeof B == "function" && V.set(B, at), at;
                  }
                while (Fe >= 1 && Be >= 0);
              break;
            }
        }
      } finally {
        Y = !1, C.current = Ae, z(), Error.prepareStackTrace = Ee;
      }
      var ir = B ? B.displayName || B.name : "", ol = ir ? W(ir) : "";
      return typeof B == "function" && V.set(B, ol), ol;
    }
    function le(B, re, oe) {
      return Z(B, !1);
    }
    function ce(B) {
      var re = B.prototype;
      return !!(re && re.isReactComponent);
    }
    function he(B, re, oe) {
      if (B == null)
        return "";
      if (typeof B == "function")
        return Z(B, ce(B));
      if (typeof B == "string")
        return W(B);
      switch (B) {
        case f:
          return W("Suspense");
        case d:
          return W("SuspenseList");
      }
      if (typeof B == "object")
        switch (B.$$typeof) {
          case l:
            return le(B.render);
          case c:
            return he(B.type, re, oe);
          case u: {
            var fe = B, Ee = fe._payload, Ae = fe._init;
            try {
              return he(Ae(Ee), re, oe);
            } catch {
            }
          }
        }
      return "";
    }
    var Ne = Object.prototype.hasOwnProperty, Oe = {}, K = v.ReactDebugCurrentFrame;
    function Q(B) {
      if (B) {
        var re = B._owner, oe = he(B.type, B._source, re ? re.type : null);
        K.setExtraStackFrame(oe);
      } else
        K.setExtraStackFrame(null);
    }
    function ie(B, re, oe, fe, Ee) {
      {
        var Ae = Function.call.bind(Ne);
        for (var xe in B)
          if (Ae(B, xe)) {
            var be = void 0;
            try {
              if (typeof B[xe] != "function") {
                var Qe = Error((fe || "React class") + ": " + oe + " type `" + xe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof B[xe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Qe.name = "Invariant Violation", Qe;
              }
              be = B[xe](re, xe, fe, oe, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Fe) {
              be = Fe;
            }
            be && !(be instanceof Error) && (Q(Ee), m("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", fe || "React class", oe, xe, typeof be), Q(null)), be instanceof Error && !(be.message in Oe) && (Oe[be.message] = !0, Q(Ee), m("Failed %s type: %s", oe, be.message), Q(null));
          }
      }
    }
    var ae = Array.isArray;
    function J(B) {
      return ae(B);
    }
    function de(B) {
      {
        var re = typeof Symbol == "function" && Symbol.toStringTag, oe = re && B[Symbol.toStringTag] || B.constructor.name || "Object";
        return oe;
      }
    }
    function X(B) {
      try {
        return ne(B), !1;
      } catch {
        return !0;
      }
    }
    function ne(B) {
      return "" + B;
    }
    function ge(B) {
      if (X(B))
        return m("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", de(B)), ne(B);
    }
    var ye = v.ReactCurrentOwner, pe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, it, we, He;
    He = {};
    function zr(B) {
      if (Ne.call(B, "ref")) {
        var re = Object.getOwnPropertyDescriptor(B, "ref").get;
        if (re && re.isReactWarning)
          return !1;
      }
      return B.ref !== void 0;
    }
    function Fr(B) {
      if (Ne.call(B, "key")) {
        var re = Object.getOwnPropertyDescriptor(B, "key").get;
        if (re && re.isReactWarning)
          return !1;
      }
      return B.key !== void 0;
    }
    function rr(B, re) {
      if (typeof B.ref == "string" && ye.current && re && ye.current.stateNode !== re) {
        var oe = k(ye.current.type);
        He[oe] || (m('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(ye.current.type), B.ref), He[oe] = !0);
      }
    }
    function Br(B, re) {
      {
        var oe = function() {
          it || (it = !0, m("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", re));
        };
        oe.isReactWarning = !0, Object.defineProperty(B, "key", {
          get: oe,
          configurable: !0
        });
      }
    }
    function qr(B, re) {
      {
        var oe = function() {
          we || (we = !0, m("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", re));
        };
        oe.isReactWarning = !0, Object.defineProperty(B, "ref", {
          get: oe,
          configurable: !0
        });
      }
    }
    var Ur = function(B, re, oe, fe, Ee, Ae, xe) {
      var be = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: B,
        key: re,
        ref: oe,
        props: xe,
        // Record the component responsible for creating this element.
        _owner: Ae
      };
      return be._store = {}, Object.defineProperty(be._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(be, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: fe
      }), Object.defineProperty(be, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ee
      }), Object.freeze && (Object.freeze(be.props), Object.freeze(be)), be;
    };
    function Hr(B, re, oe, fe, Ee) {
      {
        var Ae, xe = {}, be = null, Qe = null;
        oe !== void 0 && (ge(oe), be = "" + oe), Fr(re) && (ge(re.key), be = "" + re.key), zr(re) && (Qe = re.ref, rr(re, Ee));
        for (Ae in re)
          Ne.call(re, Ae) && !pe.hasOwnProperty(Ae) && (xe[Ae] = re[Ae]);
        if (B && B.defaultProps) {
          var Fe = B.defaultProps;
          for (Ae in Fe)
            xe[Ae] === void 0 && (xe[Ae] = Fe[Ae]);
        }
        if (be || Qe) {
          var Be = typeof B == "function" ? B.displayName || B.name || "Unknown" : B;
          be && Br(xe, Be), Qe && qr(xe, Be);
        }
        return Ur(B, be, Qe, Ee, fe, ye.current, xe);
      }
    }
    var Wr = v.ReactCurrentOwner, el = v.ReactDebugCurrentFrame;
    function nr(B) {
      if (B) {
        var re = B._owner, oe = he(B.type, B._source, re ? re.type : null);
        el.setExtraStackFrame(oe);
      } else
        el.setExtraStackFrame(null);
    }
    var la;
    la = !1;
    function ua(B) {
      return typeof B == "object" && B !== null && B.$$typeof === t;
    }
    function tl() {
      {
        if (Wr.current) {
          var B = k(Wr.current.type);
          if (B)
            return `

Check the render method of \`` + B + "`.";
        }
        return "";
      }
    }
    function hp(B) {
      {
        if (B !== void 0) {
          var re = B.fileName.replace(/^.*[\\\/]/, ""), oe = B.lineNumber;
          return `

Check your code at ` + re + ":" + oe + ".";
        }
        return "";
      }
    }
    var rl = {};
    function pp(B) {
      {
        var re = tl();
        if (!re) {
          var oe = typeof B == "string" ? B : B.displayName || B.name;
          oe && (re = `

Check the top-level render call using <` + oe + ">.");
        }
        return re;
      }
    }
    function nl(B, re) {
      {
        if (!B._store || B._store.validated || B.key != null)
          return;
        B._store.validated = !0;
        var oe = pp(re);
        if (rl[oe])
          return;
        rl[oe] = !0;
        var fe = "";
        B && B._owner && B._owner !== Wr.current && (fe = " It was passed a child from " + k(B._owner.type) + "."), nr(B), m('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', oe, fe), nr(null);
      }
    }
    function il(B, re) {
      {
        if (typeof B != "object")
          return;
        if (J(B))
          for (var oe = 0; oe < B.length; oe++) {
            var fe = B[oe];
            ua(fe) && nl(fe, re);
          }
        else if (ua(B))
          B._store && (B._store.validated = !0);
        else if (B) {
          var Ee = b(B);
          if (typeof Ee == "function" && Ee !== B.entries)
            for (var Ae = Ee.call(B), xe; !(xe = Ae.next()).done; )
              ua(xe.value) && nl(xe.value, re);
        }
      }
    }
    function vp(B) {
      {
        var re = B.type;
        if (re == null || typeof re == "string")
          return;
        var oe;
        if (typeof re == "function")
          oe = re.propTypes;
        else if (typeof re == "object" && (re.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        re.$$typeof === c))
          oe = re.propTypes;
        else
          return;
        if (oe) {
          var fe = k(re);
          ie(oe, B.props, "prop", fe, B);
        } else if (re.PropTypes !== void 0 && !la) {
          la = !0;
          var Ee = k(re);
          m("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ee || "Unknown");
        }
        typeof re.getDefaultProps == "function" && !re.getDefaultProps.isReactClassApproved && m("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function gp(B) {
      {
        for (var re = Object.keys(B.props), oe = 0; oe < re.length; oe++) {
          var fe = re[oe];
          if (fe !== "children" && fe !== "key") {
            nr(B), m("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", fe), nr(null);
            break;
          }
        }
        B.ref !== null && (nr(B), m("Invalid attribute `ref` supplied to `React.Fragment`."), nr(null));
      }
    }
    function al(B, re, oe, fe, Ee, Ae) {
      {
        var xe = _(B);
        if (!xe) {
          var be = "";
          (B === void 0 || typeof B == "object" && B !== null && Object.keys(B).length === 0) && (be += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Qe = hp(Ee);
          Qe ? be += Qe : be += tl();
          var Fe;
          B === null ? Fe = "null" : J(B) ? Fe = "array" : B !== void 0 && B.$$typeof === t ? (Fe = "<" + (k(B.type) || "Unknown") + " />", be = " Did you accidentally export a JSX literal instead of a component?") : Fe = typeof B, m("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Fe, be);
        }
        var Be = Hr(B, re, oe, Ee, Ae);
        if (Be == null)
          return Be;
        if (xe) {
          var at = re.children;
          if (at !== void 0)
            if (fe)
              if (J(at)) {
                for (var ir = 0; ir < at.length; ir++)
                  il(at[ir], B);
                Object.freeze && Object.freeze(at);
              } else
                m("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              il(at, B);
        }
        return B === n ? gp(Be) : vp(Be), Be;
      }
    }
    function mp(B, re, oe) {
      return al(B, re, oe, !0);
    }
    function yp(B, re, oe) {
      return al(B, re, oe, !1);
    }
    var bp = yp, wp = mp;
    Gr.Fragment = n, Gr.jsx = bp, Gr.jsxs = wp;
  }()), Gr;
}
process.env.NODE_ENV === "production" ? io.exports = lv() : io.exports = uv();
var L = io.exports;
const rA = ({ height: e = "8rem", backgroundSize: t = "contain" }) => /* @__PURE__ */ L.jsx("div", { className: "bg-no-repeat w-screen absolute top-0 left-0 lg:hidden bg-banner", style: { height: e, backgroundSize: t } }), nA = ({
  onClick: e,
  type: t,
  marginRight: r = "0",
  marginLeft: n = "0",
  icon: i,
  iconComponent: a,
  text: o,
  disabled: s,
  width: l = "auto",
  paddingVertical: f = "0"
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: s,
    className: `text-center block w-${l} py-${f} mr-${r} ml-${n} py-2 px-4
          text-xs font-semibold text-text-buttons-main placeholder-gray bg-bg-buttons-main rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out 
          hover:bg-buttons-main-hover hover:text-buttons-main hover:shadow-hover
          focus:outline-none hover:shadow-inner`,
    children: [
      i && /* @__PURE__ */ L.jsx("img", { src: i, alt: "Icon", className: "inline | mr-2 | w-auto" }),
      a && a,
      o
    ]
  }
), iA = ({ text: e }) => /* @__PURE__ */ L.jsx("div", { className: "sm:w-3/4 bottom-0 | pt-8 sm:pb-2 | text-center", children: /* @__PURE__ */ L.jsx("span", { className: "block left-0 | text-gray font-normal text-xs", children: e }) });
var tt = function() {
  return tt = Object.assign || function(t) {
    for (var r, n = 1, i = arguments.length; n < i; n++) {
      r = arguments[n];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, tt.apply(this, arguments);
};
function mr(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, i = t.length, a; n < i; n++)
      (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function cv(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(r) {
    return t[r] === void 0 && (t[r] = e(r)), t[r];
  };
}
var fv = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, dv = /* @__PURE__ */ cv(
  function(e) {
    return fv.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), ke = "-ms-", rn = "-moz-", Te = "-webkit-", kf = "comm", $i = "rule", ds = "decl", hv = "@import", jf = "@keyframes", pv = "@layer", vv = Math.abs, hs = String.fromCharCode, ao = Object.assign;
function gv(e, t) {
  return Ge(e, 0) ^ 45 ? (((t << 2 ^ Ge(e, 0)) << 2 ^ Ge(e, 1)) << 2 ^ Ge(e, 2)) << 2 ^ Ge(e, 3) : 0;
}
function Pf(e) {
  return e.trim();
}
function Ot(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function me(e, t, r) {
  return e.replace(t, r);
}
function Zn(e, t) {
  return e.indexOf(t);
}
function Ge(e, t) {
  return e.charCodeAt(t) | 0;
}
function yr(e, t, r) {
  return e.slice(t, r);
}
function mt(e) {
  return e.length;
}
function Cf(e) {
  return e.length;
}
function en(e, t) {
  return t.push(e), e;
}
function mv(e, t) {
  return e.map(t).join("");
}
function Ol(e, t) {
  return e.filter(function(r) {
    return !Ot(r, t);
  });
}
var zi = 1, br = 1, If = 0, st = 0, Ue = 0, _r = "";
function Fi(e, t, r, n, i, a, o, s) {
  return { value: e, root: t, parent: r, type: n, props: i, children: a, line: zi, column: br, length: o, return: "", siblings: s };
}
function It(e, t) {
  return ao(Fi("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function sr(e) {
  for (; e.root; )
    e = It(e.root, { children: [e] });
  en(e, e.siblings);
}
function yv() {
  return Ue;
}
function bv() {
  return Ue = st > 0 ? Ge(_r, --st) : 0, br--, Ue === 10 && (br = 1, zi--), Ue;
}
function ht() {
  return Ue = st < If ? Ge(_r, st++) : 0, br++, Ue === 10 && (br = 1, zi++), Ue;
}
function Vt() {
  return Ge(_r, st);
}
function Qn() {
  return st;
}
function Bi(e, t) {
  return yr(_r, e, t);
}
function oo(e) {
  switch (e) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function wv(e) {
  return zi = br = 1, If = mt(_r = e), st = 0, [];
}
function xv(e) {
  return _r = "", e;
}
function fa(e) {
  return Pf(Bi(st - 1, so(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function Ov(e) {
  for (; (Ue = Vt()) && Ue < 33; )
    ht();
  return oo(e) > 2 || oo(Ue) > 3 ? "" : " ";
}
function Ev(e, t) {
  for (; --t && ht() && !(Ue < 48 || Ue > 102 || Ue > 57 && Ue < 65 || Ue > 70 && Ue < 97); )
    ;
  return Bi(e, Qn() + (t < 6 && Vt() == 32 && ht() == 32));
}
function so(e) {
  for (; ht(); )
    switch (Ue) {
      case e:
        return st;
      case 34:
      case 39:
        e !== 34 && e !== 39 && so(Ue);
        break;
      case 40:
        e === 41 && so(e);
        break;
      case 92:
        ht();
        break;
    }
  return st;
}
function Sv(e, t) {
  for (; ht() && e + Ue !== 47 + 10; )
    if (e + Ue === 42 + 42 && Vt() === 47)
      break;
  return "/*" + Bi(t, st - 1) + "*" + hs(e === 47 ? e : ht());
}
function _v(e) {
  for (; !oo(Vt()); )
    ht();
  return Bi(e, st);
}
function Tv(e) {
  return xv(Xn("", null, null, null, [""], e = wv(e), 0, [0], e));
}
function Xn(e, t, r, n, i, a, o, s, l) {
  for (var f = 0, d = 0, c = o, u = 0, h = 0, y = 0, g = 1, b = 1, v = 1, m = 0, x = "", p = i, w = a, S = n, E = x; b; )
    switch (y = m, m = ht()) {
      case 40:
        if (y != 108 && Ge(E, c - 1) == 58) {
          Zn(E += me(fa(m), "&", "&\f"), "&\f") != -1 && (v = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        E += fa(m);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        E += Ov(y);
        break;
      case 92:
        E += Ev(Qn() - 1, 7);
        continue;
      case 47:
        switch (Vt()) {
          case 42:
          case 47:
            en(Nv(Sv(ht(), Qn()), t, r, l), l);
            break;
          default:
            E += "/";
        }
        break;
      case 123 * g:
        s[f++] = mt(E) * v;
      case 125 * g:
      case 59:
      case 0:
        switch (m) {
          case 0:
          case 125:
            b = 0;
          case 59 + d:
            v == -1 && (E = me(E, /\f/g, "")), h > 0 && mt(E) - c && en(h > 32 ? Sl(E + ";", n, r, c - 1, l) : Sl(me(E, " ", "") + ";", n, r, c - 2, l), l);
            break;
          case 59:
            E += ";";
          default:
            if (en(S = El(E, t, r, f, d, i, s, x, p = [], w = [], c, a), a), m === 123)
              if (d === 0)
                Xn(E, t, S, S, p, a, c, s, w);
              else
                switch (u === 99 && Ge(E, 3) === 110 ? 100 : u) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Xn(e, S, S, n && en(El(e, S, S, 0, 0, i, s, x, i, p = [], c, w), w), i, w, c, s, n ? p : w);
                    break;
                  default:
                    Xn(E, S, S, S, [""], w, 0, s, w);
                }
        }
        f = d = h = 0, g = v = 1, x = E = "", c = o;
        break;
      case 58:
        c = 1 + mt(E), h = y;
      default:
        if (g < 1) {
          if (m == 123)
            --g;
          else if (m == 125 && g++ == 0 && bv() == 125)
            continue;
        }
        switch (E += hs(m), m * g) {
          case 38:
            v = d > 0 ? 1 : (E += "\f", -1);
            break;
          case 44:
            s[f++] = (mt(E) - 1) * v, v = 1;
            break;
          case 64:
            Vt() === 45 && (E += fa(ht())), u = Vt(), d = c = mt(x = E += _v(Qn())), m++;
            break;
          case 45:
            y === 45 && mt(E) == 2 && (g = 0);
        }
    }
  return a;
}
function El(e, t, r, n, i, a, o, s, l, f, d, c) {
  for (var u = i - 1, h = i === 0 ? a : [""], y = Cf(h), g = 0, b = 0, v = 0; g < n; ++g)
    for (var m = 0, x = yr(e, u + 1, u = vv(b = o[g])), p = e; m < y; ++m)
      (p = Pf(b > 0 ? h[m] + " " + x : me(x, /&\f/g, h[m]))) && (l[v++] = p);
  return Fi(e, t, r, i === 0 ? $i : s, l, f, d, c);
}
function Nv(e, t, r, n) {
  return Fi(e, t, r, kf, hs(yv()), yr(e, 2, -2), 0, n);
}
function Sl(e, t, r, n, i) {
  return Fi(e, t, r, ds, yr(e, 0, n), yr(e, n + 1, -1), n, i);
}
function Lf(e, t, r) {
  switch (gv(e, t)) {
    case 5103:
      return Te + "print-" + e + e;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return Te + e + e;
    case 4789:
      return rn + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Te + e + rn + e + ke + e + e;
    case 5936:
      switch (Ge(e, t + 11)) {
        case 114:
          return Te + e + ke + me(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Te + e + ke + me(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Te + e + ke + me(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return Te + e + ke + e + e;
    case 6165:
      return Te + e + ke + "flex-" + e + e;
    case 5187:
      return Te + e + me(e, /(\w+).+(:[^]+)/, Te + "box-$1$2" + ke + "flex-$1$2") + e;
    case 5443:
      return Te + e + ke + "flex-item-" + me(e, /flex-|-self/g, "") + (Ot(e, /flex-|baseline/) ? "" : ke + "grid-row-" + me(e, /flex-|-self/g, "")) + e;
    case 4675:
      return Te + e + ke + "flex-line-pack" + me(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return Te + e + ke + me(e, "shrink", "negative") + e;
    case 5292:
      return Te + e + ke + me(e, "basis", "preferred-size") + e;
    case 6060:
      return Te + "box-" + me(e, "-grow", "") + Te + e + ke + me(e, "grow", "positive") + e;
    case 4554:
      return Te + me(e, /([^-])(transform)/g, "$1" + Te + "$2") + e;
    case 6187:
      return me(me(me(e, /(zoom-|grab)/, Te + "$1"), /(image-set)/, Te + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return me(e, /(image-set\([^]*)/, Te + "$1$`$1");
    case 4968:
      return me(me(e, /(.+:)(flex-)?(.*)/, Te + "box-pack:$3" + ke + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Te + e + e;
    case 4200:
      if (!Ot(e, /flex-|baseline/))
        return ke + "grid-column-align" + yr(e, t) + e;
      break;
    case 2592:
    case 3360:
      return ke + me(e, "template-", "") + e;
    case 4384:
    case 3616:
      return r && r.some(function(n, i) {
        return t = i, Ot(n.props, /grid-\w+-end/);
      }) ? ~Zn(e + (r = r[t].value), "span") ? e : ke + me(e, "-start", "") + e + ke + "grid-row-span:" + (~Zn(r, "span") ? Ot(r, /\d+/) : +Ot(r, /\d+/) - +Ot(e, /\d+/)) + ";" : ke + me(e, "-start", "") + e;
    case 4896:
    case 4128:
      return r && r.some(function(n) {
        return Ot(n.props, /grid-\w+-start/);
      }) ? e : ke + me(me(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return me(e, /(.+)-inline(.+)/, Te + "$1$2") + e;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (mt(e) - 1 - t > 6)
        switch (Ge(e, t + 1)) {
          case 109:
            if (Ge(e, t + 4) !== 45)
              break;
          case 102:
            return me(e, /(.+:)(.+)-([^]+)/, "$1" + Te + "$2-$3$1" + rn + (Ge(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~Zn(e, "stretch") ? Lf(me(e, "stretch", "fill-available"), t, r) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return me(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(n, i, a, o, s, l, f) {
        return ke + i + ":" + a + f + (o ? ke + i + "-span:" + (s ? l : +l - +a) + f : "") + e;
      });
    case 4949:
      if (Ge(e, t + 6) === 121)
        return me(e, ":", ":" + Te) + e;
      break;
    case 6444:
      switch (Ge(e, Ge(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return me(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + Te + (Ge(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Te + "$2$3$1" + ke + "$2box$3") + e;
        case 100:
          return me(e, ":", ":" + ke) + e;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return me(e, "scroll-", "scroll-snap-") + e;
  }
  return e;
}
function gi(e, t) {
  for (var r = "", n = 0; n < e.length; n++)
    r += t(e[n], n, e, t) || "";
  return r;
}
function Av(e, t, r, n) {
  switch (e.type) {
    case pv:
      if (e.children.length)
        break;
    case hv:
    case ds:
      return e.return = e.return || e.value;
    case kf:
      return "";
    case jf:
      return e.return = e.value + "{" + gi(e.children, n) + "}";
    case $i:
      if (!mt(e.value = e.props.join(",")))
        return "";
  }
  return mt(r = gi(e.children, n)) ? e.return = e.value + "{" + r + "}" : "";
}
function kv(e) {
  var t = Cf(e);
  return function(r, n, i, a) {
    for (var o = "", s = 0; s < t; s++)
      o += e[s](r, n, i, a) || "";
    return o;
  };
}
function jv(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function Pv(e, t, r, n) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case ds:
        e.return = Lf(e.value, e.length, r);
        return;
      case jf:
        return gi([It(e, { value: me(e.value, "@", "@" + Te) })], n);
      case $i:
        if (e.length)
          return mv(r = e.props, function(i) {
            switch (Ot(i, n = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                sr(It(e, { props: [me(i, /:(read-\w+)/, ":" + rn + "$1")] })), sr(It(e, { props: [i] })), ao(e, { props: Ol(r, n) });
                break;
              case "::placeholder":
                sr(It(e, { props: [me(i, /:(plac\w+)/, ":" + Te + "input-$1")] })), sr(It(e, { props: [me(i, /:(plac\w+)/, ":" + rn + "$1")] })), sr(It(e, { props: [me(i, /:(plac\w+)/, ke + "input-$1")] })), sr(It(e, { props: [i] })), ao(e, { props: Ol(r, n) });
                break;
            }
            return "";
          });
    }
}
var Cv = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, Zt = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", ps = typeof window < "u" && "HTMLElement" in window, Iv = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== "false" && process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.SC_DISABLE_SPEEDY !== void 0 && process.env.SC_DISABLE_SPEEDY !== "" ? process.env.SC_DISABLE_SPEEDY !== "false" && process.env.SC_DISABLE_SPEEDY : process.env.NODE_ENV !== "production"), _l = /invalid hook call/i, _n = /* @__PURE__ */ new Set(), Lv = function(e, t) {
  if (process.env.NODE_ENV !== "production") {
    var r = t ? ' with the id of "'.concat(t, '"') : "", n = "The component ".concat(e).concat(r, ` has been created dynamically.
`) + `You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.`, i = console.error;
    try {
      var a = !0;
      console.error = function(o) {
        for (var s = [], l = 1; l < arguments.length; l++)
          s[l - 1] = arguments[l];
        _l.test(o) ? (a = !1, _n.delete(n)) : i.apply(void 0, mr([o], s, !1));
      }, Ie(), a && !_n.has(n) && (console.warn(n), _n.add(n));
    } catch (o) {
      _l.test(o.message) && _n.delete(n);
    } finally {
      console.error = i;
    }
  }
}, qi = Object.freeze([]), wr = Object.freeze({});
function Mv(e, t, r) {
  return r === void 0 && (r = wr), e.theme !== r.theme && e.theme || t || r.theme;
}
var lo = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), Dv = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, Rv = /(^-|-$)/g;
function Tl(e) {
  return e.replace(Dv, "-").replace(Rv, "");
}
var $v = /(a)(d)/gi, Nl = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function uo(e) {
  var t, r = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0)
    r = Nl(t % 52) + r;
  return (Nl(t % 52) + r).replace($v, "$1-$2");
}
var da, qt = function(e, t) {
  for (var r = t.length; r; )
    e = 33 * e ^ t.charCodeAt(--r);
  return e;
}, Mf = function(e) {
  return qt(5381, e);
};
function zv(e) {
  return uo(Mf(e) >>> 0);
}
function Df(e) {
  return process.env.NODE_ENV !== "production" && typeof e == "string" && e || e.displayName || e.name || "Component";
}
function ha(e) {
  return typeof e == "string" && (process.env.NODE_ENV === "production" || e.charAt(0) === e.charAt(0).toLowerCase());
}
var Rf = typeof Symbol == "function" && Symbol.for, $f = Rf ? Symbol.for("react.memo") : 60115, Fv = Rf ? Symbol.for("react.forward_ref") : 60112, Bv = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 }, qv = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, zf = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, Uv = ((da = {})[Fv] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, da[$f] = zf, da);
function Al(e) {
  return ("type" in (t = e) && t.type.$$typeof) === $f ? zf : "$$typeof" in e ? Uv[e.$$typeof] : Bv;
  var t;
}
var Hv = Object.defineProperty, Wv = Object.getOwnPropertyNames, kl = Object.getOwnPropertySymbols, Yv = Object.getOwnPropertyDescriptor, Vv = Object.getPrototypeOf, jl = Object.prototype;
function Ff(e, t, r) {
  if (typeof t != "string") {
    if (jl) {
      var n = Vv(t);
      n && n !== jl && Ff(e, n, r);
    }
    var i = Wv(t);
    kl && (i = i.concat(kl(t)));
    for (var a = Al(e), o = Al(t), s = 0; s < i.length; ++s) {
      var l = i[s];
      if (!(l in qv || r && r[l] || o && l in o || a && l in a)) {
        var f = Yv(t, l);
        try {
          Hv(e, l, f);
        } catch {
        }
      }
    }
  }
  return e;
}
function xr(e) {
  return typeof e == "function";
}
function vs(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function Ht(e, t) {
  return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function Pl(e, t) {
  if (e.length === 0)
    return "";
  for (var r = e[0], n = 1; n < e.length; n++)
    r += t ? t + e[n] : e[n];
  return r;
}
function Or(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function co(e, t, r) {
  if (r === void 0 && (r = !1), !r && !Or(e) && !Array.isArray(e))
    return t;
  if (Array.isArray(t))
    for (var n = 0; n < t.length; n++)
      e[n] = co(e[n], t[n]);
  else if (Or(t))
    for (var n in t)
      e[n] = co(e[n], t[n]);
  return e;
}
function gs(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
var Gv = process.env.NODE_ENV !== "production" ? { 1: `Cannot create styled-component for component: %s.

`, 2: `Can't collect styles once you've consumed a \`ServerStyleSheet\`'s styles! \`ServerStyleSheet\` is a one off instance for each server-side render cycle.

- Are you trying to reuse it across renders?
- Are you accidentally calling collectStyles twice?

`, 3: `Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.

`, 4: `The \`StyleSheetManager\` expects a valid target or sheet prop!

- Does this error occur on the client and is your target falsy?
- Does this error occur on the server and is the sheet falsy?

`, 5: `The clone method cannot be used on the client!

- Are you running in a client-like environment on the server?
- Are you trying to run SSR on the client?

`, 6: `Trying to insert a new style tag, but the given Node is unmounted!

- Are you using a custom target that isn't mounted?
- Does your document not have a valid head element?
- Have you accidentally removed a style tag manually?

`, 7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n', 8: `ThemeProvider: Please make your "theme" prop an object.

`, 9: "Missing document `<head>`\n\n", 10: `Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021

`, 11: `_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.

`, 12: "It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n", 13: `%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.

`, 14: `ThemeProvider: "theme" prop is required.

`, 15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n", 16: `Reached the limit of how many styled components may be created at group %s.
You may only create up to 1,073,741,824 components. If you're creating components dynamically,
as for instance in your render method then you may be running into this limitation.

`, 17: `CSSStyleSheet could not be found on HTMLStyleElement.
Has styled-components' style tag been unmounted or altered by another script?
`, 18: "ThemeProvider: Please make sure your useTheme hook is within a `<ThemeProvider>`" } : {};
function Kv() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var r = e[0], n = [], i = 1, a = e.length; i < a; i += 1)
    n.push(e[i]);
  return n.forEach(function(o) {
    r = r.replace(/%[a-z]/, o);
  }), r;
}
function Tr(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  return process.env.NODE_ENV === "production" ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e, " for more information.").concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : "")) : new Error(Kv.apply(void 0, mr([Gv[e]], t, !1)).trim());
}
var Zv = function() {
  function e(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t;
  }
  return e.prototype.indexOfGroup = function(t) {
    for (var r = 0, n = 0; n < t; n++)
      r += this.groupSizes[n];
    return r;
  }, e.prototype.insertRules = function(t, r) {
    if (t >= this.groupSizes.length) {
      for (var n = this.groupSizes, i = n.length, a = i; t >= a; )
        if ((a <<= 1) < 0)
          throw Tr(16, "".concat(t));
      this.groupSizes = new Uint32Array(a), this.groupSizes.set(n), this.length = a;
      for (var o = i; o < a; o++)
        this.groupSizes[o] = 0;
    }
    for (var s = this.indexOfGroup(t + 1), l = (o = 0, r.length); o < l; o++)
      this.tag.insertRule(s, r[o]) && (this.groupSizes[t]++, s++);
  }, e.prototype.clearGroup = function(t) {
    if (t < this.length) {
      var r = this.groupSizes[t], n = this.indexOfGroup(t), i = n + r;
      this.groupSizes[t] = 0;
      for (var a = n; a < i; a++)
        this.tag.deleteRule(n);
    }
  }, e.prototype.getGroup = function(t) {
    var r = "";
    if (t >= this.length || this.groupSizes[t] === 0)
      return r;
    for (var n = this.groupSizes[t], i = this.indexOfGroup(t), a = i + n, o = i; o < a; o++)
      r += "".concat(this.tag.getRule(o)).concat(`/*!sc*/
`);
    return r;
  }, e;
}(), Jn = /* @__PURE__ */ new Map(), mi = /* @__PURE__ */ new Map(), pa = 1, Tn = function(e) {
  if (Jn.has(e))
    return Jn.get(e);
  for (; mi.has(pa); )
    pa++;
  var t = pa++;
  if (process.env.NODE_ENV !== "production" && ((0 | t) < 0 || t > 1073741824))
    throw Tr(16, "".concat(t));
  return Jn.set(e, t), mi.set(t, e), t;
}, Qv = function(e, t) {
  Jn.set(e, t), mi.set(t, e);
}, Xv = "style[".concat(Zt, "][").concat("data-styled-version", '="').concat("6.0.7", '"]'), Jv = new RegExp("^".concat(Zt, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), eg = function(e, t, r) {
  for (var n, i = r.split(","), a = 0, o = i.length; a < o; a++)
    (n = i[a]) && e.registerName(t, n);
}, tg = function(e, t) {
  for (var r, n = ((r = t.textContent) !== null && r !== void 0 ? r : "").split(`/*!sc*/
`), i = [], a = 0, o = n.length; a < o; a++) {
    var s = n[a].trim();
    if (s) {
      var l = s.match(Jv);
      if (l) {
        var f = 0 | parseInt(l[1], 10), d = l[2];
        f !== 0 && (Qv(d, f), eg(e, d, l[3]), e.getTag().insertRules(f, i)), i.length = 0;
      } else
        i.push(s);
    }
  }
};
function rg() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var Bf = function(e) {
  var t = document.head, r = e || t, n = document.createElement("style"), i = function(s) {
    var l = Array.from(s.querySelectorAll("style[".concat(Zt, "]")));
    return l[l.length - 1];
  }(r), a = i !== void 0 ? i.nextSibling : null;
  n.setAttribute(Zt, "active"), n.setAttribute("data-styled-version", "6.0.7");
  var o = rg();
  return o && n.setAttribute("nonce", o), r.insertBefore(n, a), n;
}, ng = function() {
  function e(t) {
    this.element = Bf(t), this.element.appendChild(document.createTextNode("")), this.sheet = function(r) {
      if (r.sheet)
        return r.sheet;
      for (var n = document.styleSheets, i = 0, a = n.length; i < a; i++) {
        var o = n[i];
        if (o.ownerNode === r)
          return o;
      }
      throw Tr(17);
    }(this.element), this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    try {
      return this.sheet.insertRule(r, t), this.length++, !0;
    } catch {
      return !1;
    }
  }, e.prototype.deleteRule = function(t) {
    this.sheet.deleteRule(t), this.length--;
  }, e.prototype.getRule = function(t) {
    var r = this.sheet.cssRules[t];
    return r && r.cssText ? r.cssText : "";
  }, e;
}(), ig = function() {
  function e(t) {
    this.element = Bf(t), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    if (t <= this.length && t >= 0) {
      var n = document.createTextNode(r);
      return this.element.insertBefore(n, this.nodes[t] || null), this.length++, !0;
    }
    return !1;
  }, e.prototype.deleteRule = function(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }, e;
}(), ag = function() {
  function e(t) {
    this.rules = [], this.length = 0;
  }
  return e.prototype.insertRule = function(t, r) {
    return t <= this.length && (this.rules.splice(t, 0, r), this.length++, !0);
  }, e.prototype.deleteRule = function(t) {
    this.rules.splice(t, 1), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.rules[t] : "";
  }, e;
}(), Cl = ps, og = { isServer: !ps, useCSSOMInjection: !Iv }, qf = function() {
  function e(t, r, n) {
    t === void 0 && (t = wr), r === void 0 && (r = {});
    var i = this;
    this.options = tt(tt({}, og), t), this.gs = r, this.names = new Map(n), this.server = !!t.isServer, !this.server && ps && Cl && (Cl = !1, function(a) {
      for (var o = document.querySelectorAll(Xv), s = 0, l = o.length; s < l; s++) {
        var f = o[s];
        f && f.getAttribute(Zt) !== "active" && (tg(a, f), f.parentNode && f.parentNode.removeChild(f));
      }
    }(this)), gs(this, function() {
      return function(a) {
        for (var o = a.getTag(), s = o.length, l = "", f = function(c) {
          var u = function(v) {
            return mi.get(v);
          }(c);
          if (u === void 0)
            return "continue";
          var h = a.names.get(u), y = o.getGroup(c);
          if (h === void 0 || y.length === 0)
            return "continue";
          var g = "".concat(Zt, ".g").concat(c, '[id="').concat(u, '"]'), b = "";
          h !== void 0 && h.forEach(function(v) {
            v.length > 0 && (b += "".concat(v, ","));
          }), l += "".concat(y).concat(g, '{content:"').concat(b, '"}').concat(`/*!sc*/
`);
        }, d = 0; d < s; d++)
          f(d);
        return l;
      }(i);
    });
  }
  return e.registerId = function(t) {
    return Tn(t);
  }, e.prototype.reconstructWithOptions = function(t, r) {
    return r === void 0 && (r = !0), new e(tt(tt({}, this.options), t), this.gs, r && this.names || void 0);
  }, e.prototype.allocateGSInstance = function(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }, e.prototype.getTag = function() {
    return this.tag || (this.tag = (t = function(r) {
      var n = r.useCSSOMInjection, i = r.target;
      return r.isServer ? new ag(i) : n ? new ng(i) : new ig(i);
    }(this.options), new Zv(t)));
    var t;
  }, e.prototype.hasNameForId = function(t, r) {
    return this.names.has(t) && this.names.get(t).has(r);
  }, e.prototype.registerName = function(t, r) {
    if (Tn(t), this.names.has(t))
      this.names.get(t).add(r);
    else {
      var n = /* @__PURE__ */ new Set();
      n.add(r), this.names.set(t, n);
    }
  }, e.prototype.insertRules = function(t, r, n) {
    this.registerName(t, r), this.getTag().insertRules(Tn(t), n);
  }, e.prototype.clearNames = function(t) {
    this.names.has(t) && this.names.get(t).clear();
  }, e.prototype.clearRules = function(t) {
    this.getTag().clearGroup(Tn(t)), this.clearNames(t);
  }, e.prototype.clearTag = function() {
    this.tag = void 0;
  }, e;
}(), sg = /&/g, lg = /^\s*\/\/.*$/gm;
function Uf(e, t) {
  return e.map(function(r) {
    return r.type === "rule" && (r.value = "".concat(t, " ").concat(r.value), r.value = r.value.replaceAll(",", ",".concat(t, " ")), r.props = r.props.map(function(n) {
      return "".concat(t, " ").concat(n);
    })), Array.isArray(r.children) && r.type !== "@keyframes" && (r.children = Uf(r.children, t)), r;
  });
}
function ug(e) {
  var t, r, n, i = e === void 0 ? wr : e, a = i.options, o = a === void 0 ? wr : a, s = i.plugins, l = s === void 0 ? qi : s, f = function(u, h, y) {
    return y === r || y.startsWith(r) && y.endsWith(r) && y.replaceAll(r, "").length > 0 ? ".".concat(t) : u;
  }, d = l.slice();
  d.push(function(u) {
    u.type === $i && u.value.includes("&") && (u.props[0] = u.props[0].replace(sg, r).replace(n, f));
  }), o.prefix && d.push(Pv), d.push(Av);
  var c = function(u, h, y, g) {
    h === void 0 && (h = ""), y === void 0 && (y = ""), g === void 0 && (g = "&"), t = g, r = h, n = new RegExp("\\".concat(r, "\\b"), "g");
    var b = u.replace(lg, ""), v = Tv(y || h ? "".concat(y, " ").concat(h, " { ").concat(b, " }") : b);
    o.namespace && (v = Uf(v, o.namespace));
    var m = [];
    return gi(v, kv(d.concat(jv(function(x) {
      return m.push(x);
    })))), m;
  };
  return c.hash = l.length ? l.reduce(function(u, h) {
    return h.name || Tr(15), qt(u, h.name);
  }, 5381).toString() : "", c;
}
var cg = new qf(), fo = ug(), Hf = Ce.createContext({ shouldForwardProp: void 0, styleSheet: cg, stylis: fo });
Hf.Consumer;
Ce.createContext(void 0);
function Il() {
  return cs(Hf);
}
var Ll = function() {
  function e(t, r) {
    var n = this;
    this.inject = function(i, a) {
      a === void 0 && (a = fo);
      var o = n.name + a.hash;
      i.hasNameForId(n.id, o) || i.insertRules(n.id, o, a(n.rules, o, "@keyframes"));
    }, this.name = t, this.id = "sc-keyframes-".concat(t), this.rules = r, gs(this, function() {
      throw Tr(12, String(n.name));
    });
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = fo), this.name + t.hash;
  }, e;
}(), fg = function(e) {
  return e >= "A" && e <= "Z";
};
function Ml(e) {
  for (var t = "", r = 0; r < e.length; r++) {
    var n = e[r];
    if (r === 1 && n === "-" && e[0] === "-")
      return e;
    fg(n) ? t += "-" + n.toLowerCase() : t += n;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
var Wf = function(e) {
  return e == null || e === !1 || e === "";
}, Yf = function(e) {
  var t, r, n = [];
  for (var i in e) {
    var a = e[i];
    e.hasOwnProperty(i) && !Wf(a) && (Array.isArray(a) && a.isCss || xr(a) ? n.push("".concat(Ml(i), ":"), a, ";") : Or(a) ? n.push.apply(n, mr(mr(["".concat(i, " {")], Yf(a), !1), ["}"], !1)) : n.push("".concat(Ml(i), ": ").concat((t = i, (r = a) == null || typeof r == "boolean" || r === "" ? "" : typeof r != "number" || r === 0 || t in Cv || t.startsWith("--") ? String(r).trim() : "".concat(r, "px")), ";")));
  }
  return n;
};
function Gt(e, t, r, n) {
  if (Wf(e))
    return [];
  if (vs(e))
    return [".".concat(e.styledComponentId)];
  if (xr(e)) {
    if (!xr(a = e) || a.prototype && a.prototype.isReactComponent || !t)
      return [e];
    var i = e(t);
    return process.env.NODE_ENV === "production" || typeof i != "object" || Array.isArray(i) || i instanceof Ll || Or(i) || i === null || console.error("".concat(Df(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), Gt(i, t, r, n);
  }
  var a;
  return e instanceof Ll ? r ? (e.inject(r, n), [e.getName(n)]) : [e] : Or(e) ? Yf(e) : Array.isArray(e) ? Array.prototype.concat.apply(qi, e.map(function(o) {
    return Gt(o, t, r, n);
  })) : [e.toString()];
}
function dg(e) {
  for (var t = 0; t < e.length; t += 1) {
    var r = e[t];
    if (xr(r) && !vs(r))
      return !1;
  }
  return !0;
}
var hg = Mf("6.0.7"), pg = function() {
  function e(t, r, n) {
    this.rules = t, this.staticRulesId = "", this.isStatic = process.env.NODE_ENV === "production" && (n === void 0 || n.isStatic) && dg(t), this.componentId = r, this.baseHash = qt(hg, r), this.baseStyle = n, qf.registerId(r);
  }
  return e.prototype.generateAndInjectStyles = function(t, r, n) {
    var i = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, r, n) : "";
    if (this.isStatic && !n.hash)
      if (this.staticRulesId && r.hasNameForId(this.componentId, this.staticRulesId))
        i = Ht(i, this.staticRulesId);
      else {
        var a = Pl(Gt(this.rules, t, r, n)), o = uo(qt(this.baseHash, a) >>> 0);
        if (!r.hasNameForId(this.componentId, o)) {
          var s = n(a, ".".concat(o), void 0, this.componentId);
          r.insertRules(this.componentId, o, s);
        }
        i = Ht(i, o), this.staticRulesId = o;
      }
    else {
      for (var l = qt(this.baseHash, n.hash), f = "", d = 0; d < this.rules.length; d++) {
        var c = this.rules[d];
        if (typeof c == "string")
          f += c, process.env.NODE_ENV !== "production" && (l = qt(l, c));
        else if (c) {
          var u = Pl(Gt(c, t, r, n));
          l = qt(l, u), f += u;
        }
      }
      if (f) {
        var h = uo(l >>> 0);
        r.hasNameForId(this.componentId, h) || r.insertRules(this.componentId, h, n(f, ".".concat(h), void 0, this.componentId)), i = Ht(i, h);
      }
    }
    return i;
  }, e;
}(), Vf = Ce.createContext(void 0);
Vf.Consumer;
var va = {}, Dl = /* @__PURE__ */ new Set();
function vg(e, t, r) {
  var n = vs(e), i = e, a = !ha(e), o = t.attrs, s = o === void 0 ? qi : o, l = t.componentId, f = l === void 0 ? function(p, w) {
    var S = typeof p != "string" ? "sc" : Tl(p);
    va[S] = (va[S] || 0) + 1;
    var E = "".concat(S, "-").concat(zv("6.0.7" + S + va[S]));
    return w ? "".concat(w, "-").concat(E) : E;
  }(t.displayName, t.parentComponentId) : l, d = t.displayName, c = d === void 0 ? function(p) {
    return ha(p) ? "styled.".concat(p) : "Styled(".concat(Df(p), ")");
  }(e) : d, u = t.displayName && t.componentId ? "".concat(Tl(t.displayName), "-").concat(t.componentId) : t.componentId || f, h = n && i.attrs ? i.attrs.concat(s).filter(Boolean) : s, y = t.shouldForwardProp;
  if (n && i.shouldForwardProp) {
    var g = i.shouldForwardProp;
    if (t.shouldForwardProp) {
      var b = t.shouldForwardProp;
      y = function(p, w) {
        return g(p, w) && b(p, w);
      };
    } else
      y = g;
  }
  var v = new pg(r, u, n ? i.componentStyle : void 0);
  function m(p, w) {
    return function(S, E, A) {
      var j = S.attrs, _ = S.componentStyle, O = S.defaultProps, N = S.foldedComponentIds, k = S.styledComponentId, I = S.target, R = Ce.useContext(Vf), H = Il(), U = S.shouldForwardProp || H.shouldForwardProp;
      process.env.NODE_ENV !== "production" && sl(k);
      var G = function(F, z, C) {
        for (var $, W = tt(tt({}, z), { className: void 0, theme: C }), Y = 0; Y < F.length; Y += 1) {
          var V = xr($ = F[Y]) ? $(W) : $;
          for (var te in V)
            W[te] = te === "className" ? Ht(W[te], V[te]) : te === "style" ? tt(tt({}, W[te]), V[te]) : V[te];
        }
        return z.className && (W.className = Ht(W.className, z.className)), W;
      }(j, E, Mv(E, R, O) || wr), q = G.as || I, P = {};
      for (var T in G)
        G[T] === void 0 || T[0] === "$" || T === "as" || T === "theme" || (T === "forwardedAs" ? P.as = G.forwardedAs : U && !U(T, q) || (P[T] = G[T], U || process.env.NODE_ENV !== "development" || dv(T) || Dl.has(T) || !lo.has(q) || (Dl.add(T), console.warn('styled-components: it looks like an unknown prop "'.concat(T, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
      var M = function(F, z) {
        var C = Il(), $ = F.generateAndInjectStyles(z, C.styleSheet, C.stylis);
        return process.env.NODE_ENV !== "production" && sl($), $;
      }(_, G);
      process.env.NODE_ENV !== "production" && S.warnTooManyClasses && S.warnTooManyClasses(M);
      var D = Ht(N, k);
      return M && (D += " " + M), G.className && (D += " " + G.className), P[ha(q) && !lo.has(q) ? "class" : "className"] = D, P.ref = A, vr(q, P);
    }(x, p, w);
  }
  process.env.NODE_ENV !== "production" && (m.displayName = c);
  var x = Ce.forwardRef(m);
  return x.attrs = h, x.componentStyle = v, x.shouldForwardProp = y, process.env.NODE_ENV !== "production" && (x.displayName = c), x.foldedComponentIds = n ? Ht(i.foldedComponentIds, i.styledComponentId) : "", x.styledComponentId = u, x.target = n ? i.target : e, Object.defineProperty(x, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(p) {
    this._foldedDefaultProps = n ? function(w) {
      for (var S = [], E = 1; E < arguments.length; E++)
        S[E - 1] = arguments[E];
      for (var A = 0, j = S; A < j.length; A++)
        co(w, j[A], !0);
      return w;
    }({}, i.defaultProps, p) : p;
  } }), process.env.NODE_ENV !== "production" && (Lv(c, u), x.warnTooManyClasses = function(p, w) {
    var S = {}, E = !1;
    return function(A) {
      if (!E && (S[A] = !0, Object.keys(S).length >= 200)) {
        var j = w ? ' with the id of "'.concat(w, '"') : "";
        console.warn("Over ".concat(200, " classes were generated for component ").concat(p).concat(j, `.
`) + `Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), E = !0, S = {};
      }
    };
  }(c, u)), gs(x, function() {
    return ".".concat(x.styledComponentId);
  }), a && Ff(x, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), x;
}
function Rl(e, t) {
  for (var r = [e[0]], n = 0, i = t.length; n < i; n += 1)
    r.push(t[n], e[n + 1]);
  return r;
}
var $l = function(e) {
  return Object.assign(e, { isCss: !0 });
};
function yi(e) {
  for (var t = [], r = 1; r < arguments.length; r++)
    t[r - 1] = arguments[r];
  if (xr(e) || Or(e)) {
    var n = e;
    return $l(Gt(Rl(qi, mr([n], t, !0))));
  }
  var i = e;
  return t.length === 0 && i.length === 1 && typeof i[0] == "string" ? Gt(i) : $l(Gt(Rl(i, t)));
}
function ho(e, t, r) {
  if (r === void 0 && (r = wr), !t)
    throw Tr(1, t);
  var n = function(i) {
    for (var a = [], o = 1; o < arguments.length; o++)
      a[o - 1] = arguments[o];
    return e(t, r, yi.apply(void 0, mr([i], a, !1)));
  };
  return n.attrs = function(i) {
    return ho(e, t, tt(tt({}, r), { attrs: Array.prototype.concat(r.attrs, i).filter(Boolean) }));
  }, n.withConfig = function(i) {
    return ho(e, t, tt(tt({}, r), i));
  }, n;
}
var Gf = function(e) {
  return ho(vg, e);
}, ms = Gf;
lo.forEach(function(e) {
  ms[e] = Gf(e);
});
process.env.NODE_ENV !== "production" && typeof navigator < "u" && navigator.product === "ReactNative" && console.warn(`It looks like you've imported 'styled-components' on React Native.
Perhaps you're looking to import 'styled-components/native'?
Read more about this at https://www.styled-components.com/docs/basics#react-native`);
var Nn = "__sc-".concat(Zt, "__");
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof window < "u" && (window[Nn] || (window[Nn] = 0), window[Nn] === 1 && console.warn(`It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.

See https://s-c.sh/2BAXzed for more info.`), window[Nn] += 1);
const aA = ms.div`
  margin: 0 auto;

  ${(e) => e.$variant === "session" && yi`
      min-height: 100vh;
      width: 100vw;
      display: flex;
      padding: 0rem;

      > * {
        width: 100%;
        @media screen (min-width: 780px) {
          width: 50%;
        }
      }
    `};

    ${(e) => e.$variant === "center" && yi`
        height: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
`, gg = "https://kiota-public-resources.s3.amazonaws.com/logo_000.svg", mg = "https://www.kiota.com", yg = "www.kiota.com", oA = ({ link: e = "false", image: t = gg, backgroundClass: r = "bg-main" }) => /* @__PURE__ */ L.jsxs("div", { className: `hidden lg:block ${r}`, children: [
  /* @__PURE__ */ L.jsx("div", { style: { height: "calc(100vh - 5rem)" }, children: /* @__PURE__ */ L.jsx("img", { src: t, alt: "Logo", className: "w-full h-full" }) }),
  e !== "false" && /* @__PURE__ */ L.jsx("div", { children: /* @__PURE__ */ L.jsxs("div", { className: "w-full flex justify-center items-center relative bottom-16 xl:bottom-42", children: [
    /* @__PURE__ */ L.jsx(
      "a",
      {
        href: e || mg,
        target: "_blank",
        rel: "noreferrer",
        className: "absolute translate-y-1/2 bg-white px-5 py-1 text-xs font-medium rounded-md cursor-pointer text-main hover:text-link-hover",
        children: e || yg
      }
    ),
    /* @__PURE__ */ L.jsx("hr", { className: "w-8/12 h-full  text-white" })
  ] }) })
] }), sA = ({ formTitle: e, formSubtitle: t }) => /* @__PURE__ */ L.jsxs("div", { className: "block mb-4 sm:mb-12 sm:px-0 mt-20 lg:mt-0", children: [
  /* @__PURE__ */ L.jsx("h1", { className: "text-main", children: e }),
  /* @__PURE__ */ L.jsx("h5", { className: "text-secondary font-semibold", children: t })
] });
function zl(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function se(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? zl(Object(r), !0).forEach(function(n) {
      Ve(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : zl(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function bi(e) {
  "@babel/helpers - typeof";
  return bi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, bi(e);
}
function bg(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Fl(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function wg(e, t, r) {
  return t && Fl(e.prototype, t), r && Fl(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Ve(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function ys(e, t) {
  return Og(e) || Sg(e, t) || Kf(e, t) || Tg();
}
function gn(e) {
  return xg(e) || Eg(e) || Kf(e) || _g();
}
function xg(e) {
  if (Array.isArray(e))
    return po(e);
}
function Og(e) {
  if (Array.isArray(e))
    return e;
}
function Eg(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Sg(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n = [], i = !0, a = !1, o, s;
    try {
      for (r = r.call(e); !(i = (o = r.next()).done) && (n.push(o.value), !(t && n.length === t)); i = !0)
        ;
    } catch (l) {
      a = !0, s = l;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (a)
          throw s;
      }
    }
    return n;
  }
}
function Kf(e, t) {
  if (e) {
    if (typeof e == "string")
      return po(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return po(e, t);
  }
}
function po(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function _g() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Tg() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Bl = function() {
}, bs = {}, Zf = {}, Qf = null, Xf = {
  mark: Bl,
  measure: Bl
};
try {
  typeof window < "u" && (bs = window), typeof document < "u" && (Zf = document), typeof MutationObserver < "u" && (Qf = MutationObserver), typeof performance < "u" && (Xf = performance);
} catch {
}
var Ng = bs.navigator || {}, ql = Ng.userAgent, Ul = ql === void 0 ? "" : ql, Dt = bs, Le = Zf, Hl = Qf, An = Xf;
Dt.document;
var Nt = !!Le.documentElement && !!Le.head && typeof Le.addEventListener == "function" && typeof Le.createElement == "function", Jf = ~Ul.indexOf("MSIE") || ~Ul.indexOf("Trident/"), kn, jn, Pn, Cn, In, St = "___FONT_AWESOME___", vo = 16, ed = "fa", td = "svg-inline--fa", Qt = "data-fa-i2svg", go = "data-fa-pseudo-element", Ag = "data-fa-pseudo-element-pending", ws = "data-prefix", xs = "data-icon", Wl = "fontawesome-i2svg", kg = "async", jg = ["HTML", "HEAD", "STYLE", "SCRIPT"], rd = function() {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return !1;
  }
}(), Pe = "classic", $e = "sharp", Os = [Pe, $e];
function mn(e) {
  return new Proxy(e, {
    get: function(r, n) {
      return n in r ? r[n] : r[Pe];
    }
  });
}
var ln = mn((kn = {}, Ve(kn, Pe, {
  fa: "solid",
  fas: "solid",
  "fa-solid": "solid",
  far: "regular",
  "fa-regular": "regular",
  fal: "light",
  "fa-light": "light",
  fat: "thin",
  "fa-thin": "thin",
  fad: "duotone",
  "fa-duotone": "duotone",
  fab: "brands",
  "fa-brands": "brands",
  fak: "kit",
  "fa-kit": "kit"
}), Ve(kn, $e, {
  fa: "solid",
  fass: "solid",
  "fa-solid": "solid",
  fasr: "regular",
  "fa-regular": "regular",
  fasl: "light",
  "fa-light": "light"
}), kn)), un = mn((jn = {}, Ve(jn, Pe, {
  solid: "fas",
  regular: "far",
  light: "fal",
  thin: "fat",
  duotone: "fad",
  brands: "fab",
  kit: "fak"
}), Ve(jn, $e, {
  solid: "fass",
  regular: "fasr",
  light: "fasl"
}), jn)), cn = mn((Pn = {}, Ve(Pn, Pe, {
  fab: "fa-brands",
  fad: "fa-duotone",
  fak: "fa-kit",
  fal: "fa-light",
  far: "fa-regular",
  fas: "fa-solid",
  fat: "fa-thin"
}), Ve(Pn, $e, {
  fass: "fa-solid",
  fasr: "fa-regular",
  fasl: "fa-light"
}), Pn)), Pg = mn((Cn = {}, Ve(Cn, Pe, {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
}), Ve(Cn, $e, {
  "fa-solid": "fass",
  "fa-regular": "fasr",
  "fa-light": "fasl"
}), Cn)), Cg = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/, nd = "fa-layers-text", Ig = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, Lg = mn((In = {}, Ve(In, Pe, {
  900: "fas",
  400: "far",
  normal: "far",
  300: "fal",
  100: "fat"
}), Ve(In, $e, {
  900: "fass",
  400: "fasr",
  300: "fasl"
}), In)), id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], Mg = id.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), Dg = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], Wt = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, fn = /* @__PURE__ */ new Set();
Object.keys(un[Pe]).map(fn.add.bind(fn));
Object.keys(un[$e]).map(fn.add.bind(fn));
var Rg = [].concat(Os, gn(fn), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Wt.GROUP, Wt.SWAP_OPACITY, Wt.PRIMARY, Wt.SECONDARY]).concat(id.map(function(e) {
  return "".concat(e, "x");
})).concat(Mg.map(function(e) {
  return "w-".concat(e);
})), nn = Dt.FontAwesomeConfig || {};
function $g(e) {
  var t = Le.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function zg(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (Le && typeof Le.querySelector == "function") {
  var Fg = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  Fg.forEach(function(e) {
    var t = ys(e, 2), r = t[0], n = t[1], i = zg($g(r));
    i != null && (nn[n] = i);
  });
}
var ad = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: ed,
  replacementClass: td,
  autoReplaceSvg: !0,
  autoAddCss: !0,
  autoA11y: !0,
  searchPseudoElements: !1,
  observeMutations: !0,
  mutateApproach: "async",
  keepOriginalSource: !0,
  measurePerformance: !1,
  showMissingIcons: !0
};
nn.familyPrefix && (nn.cssPrefix = nn.familyPrefix);
var Er = se(se({}, ad), nn);
Er.autoReplaceSvg || (Er.observeMutations = !1);
var ue = {};
Object.keys(ad).forEach(function(e) {
  Object.defineProperty(ue, e, {
    enumerable: !0,
    set: function(r) {
      Er[e] = r, an.forEach(function(n) {
        return n(ue);
      });
    },
    get: function() {
      return Er[e];
    }
  });
});
Object.defineProperty(ue, "familyPrefix", {
  enumerable: !0,
  set: function(t) {
    Er.cssPrefix = t, an.forEach(function(r) {
      return r(ue);
    });
  },
  get: function() {
    return Er.cssPrefix;
  }
});
Dt.FontAwesomeConfig = ue;
var an = [];
function Bg(e) {
  return an.push(e), function() {
    an.splice(an.indexOf(e), 1);
  };
}
var Pt = vo, bt = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function qg(e) {
  if (!(!e || !Nt)) {
    var t = Le.createElement("style");
    t.setAttribute("type", "text/css"), t.innerHTML = e;
    for (var r = Le.head.childNodes, n = null, i = r.length - 1; i > -1; i--) {
      var a = r[i], o = (a.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(o) > -1 && (n = a);
    }
    return Le.head.insertBefore(t, n), e;
  }
}
var Ug = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function dn() {
  for (var e = 12, t = ""; e-- > 0; )
    t += Ug[Math.random() * 62 | 0];
  return t;
}
function Nr(e) {
  for (var t = [], r = (e || []).length >>> 0; r--; )
    t[r] = e[r];
  return t;
}
function Es(e) {
  return e.classList ? Nr(e.classList) : (e.getAttribute("class") || "").split(" ").filter(function(t) {
    return t;
  });
}
function od(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Hg(e) {
  return Object.keys(e || {}).reduce(function(t, r) {
    return t + "".concat(r, '="').concat(od(e[r]), '" ');
  }, "").trim();
}
function Ui(e) {
  return Object.keys(e || {}).reduce(function(t, r) {
    return t + "".concat(r, ": ").concat(e[r].trim(), ";");
  }, "");
}
function Ss(e) {
  return e.size !== bt.size || e.x !== bt.x || e.y !== bt.y || e.rotate !== bt.rotate || e.flipX || e.flipY;
}
function Wg(e) {
  var t = e.transform, r = e.containerWidth, n = e.iconWidth, i = {
    transform: "translate(".concat(r / 2, " 256)")
  }, a = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), o = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), s = "rotate(".concat(t.rotate, " 0 0)"), l = {
    transform: "".concat(a, " ").concat(o, " ").concat(s)
  }, f = {
    transform: "translate(".concat(n / 2 * -1, " -256)")
  };
  return {
    outer: i,
    inner: l,
    path: f
  };
}
function Yg(e) {
  var t = e.transform, r = e.width, n = r === void 0 ? vo : r, i = e.height, a = i === void 0 ? vo : i, o = e.startCentered, s = o === void 0 ? !1 : o, l = "";
  return s && Jf ? l += "translate(".concat(t.x / Pt - n / 2, "em, ").concat(t.y / Pt - a / 2, "em) ") : s ? l += "translate(calc(-50% + ".concat(t.x / Pt, "em), calc(-50% + ").concat(t.y / Pt, "em)) ") : l += "translate(".concat(t.x / Pt, "em, ").concat(t.y / Pt, "em) "), l += "scale(".concat(t.size / Pt * (t.flipX ? -1 : 1), ", ").concat(t.size / Pt * (t.flipY ? -1 : 1), ") "), l += "rotate(".concat(t.rotate, "deg) "), l;
}
var Vg = `:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0s);
          animation-delay: var(--fa-animation-delay, 0s);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    -webkit-transition-delay: 0s;
            transition-delay: 0s;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;
function sd() {
  var e = ed, t = td, r = ue.cssPrefix, n = ue.replacementClass, i = Vg;
  if (r !== e || n !== t) {
    var a = new RegExp("\\.".concat(e, "\\-"), "g"), o = new RegExp("\\--".concat(e, "\\-"), "g"), s = new RegExp("\\.".concat(t), "g");
    i = i.replace(a, ".".concat(r, "-")).replace(o, "--".concat(r, "-")).replace(s, ".".concat(n));
  }
  return i;
}
var Yl = !1;
function ga() {
  ue.autoAddCss && !Yl && (qg(sd()), Yl = !0);
}
var Gg = {
  mixout: function() {
    return {
      dom: {
        css: sd,
        insertCss: ga
      }
    };
  },
  hooks: function() {
    return {
      beforeDOMElementCreation: function() {
        ga();
      },
      beforeI2svg: function() {
        ga();
      }
    };
  }
}, _t = Dt || {};
_t[St] || (_t[St] = {});
_t[St].styles || (_t[St].styles = {});
_t[St].hooks || (_t[St].hooks = {});
_t[St].shims || (_t[St].shims = []);
var dt = _t[St], ld = [], Kg = function e() {
  Le.removeEventListener("DOMContentLoaded", e), wi = 1, ld.map(function(t) {
    return t();
  });
}, wi = !1;
Nt && (wi = (Le.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(Le.readyState), wi || Le.addEventListener("DOMContentLoaded", Kg));
function Zg(e) {
  Nt && (wi ? setTimeout(e, 0) : ld.push(e));
}
function yn(e) {
  var t = e.tag, r = e.attributes, n = r === void 0 ? {} : r, i = e.children, a = i === void 0 ? [] : i;
  return typeof e == "string" ? od(e) : "<".concat(t, " ").concat(Hg(n), ">").concat(a.map(yn).join(""), "</").concat(t, ">");
}
function Vl(e, t, r) {
  if (e && e[t] && e[t][r])
    return {
      prefix: t,
      iconName: r,
      icon: e[t][r]
    };
}
var Qg = function(t, r) {
  return function(n, i, a, o) {
    return t.call(r, n, i, a, o);
  };
}, ma = function(t, r, n, i) {
  var a = Object.keys(t), o = a.length, s = i !== void 0 ? Qg(r, i) : r, l, f, d;
  for (n === void 0 ? (l = 1, d = t[a[0]]) : (l = 0, d = n); l < o; l++)
    f = a[l], d = s(d, t[f], f, t);
  return d;
};
function Xg(e) {
  for (var t = [], r = 0, n = e.length; r < n; ) {
    var i = e.charCodeAt(r++);
    if (i >= 55296 && i <= 56319 && r < n) {
      var a = e.charCodeAt(r++);
      (a & 64512) == 56320 ? t.push(((i & 1023) << 10) + (a & 1023) + 65536) : (t.push(i), r--);
    } else
      t.push(i);
  }
  return t;
}
function mo(e) {
  var t = Xg(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function Jg(e, t) {
  var r = e.length, n = e.charCodeAt(t), i;
  return n >= 55296 && n <= 56319 && r > t + 1 && (i = e.charCodeAt(t + 1), i >= 56320 && i <= 57343) ? (n - 55296) * 1024 + i - 56320 + 65536 : n;
}
function Gl(e) {
  return Object.keys(e).reduce(function(t, r) {
    var n = e[r], i = !!n.icon;
    return i ? t[n.iconName] = n.icon : t[r] = n, t;
  }, {});
}
function yo(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, n = r.skipHooks, i = n === void 0 ? !1 : n, a = Gl(t);
  typeof dt.hooks.addPack == "function" && !i ? dt.hooks.addPack(e, Gl(t)) : dt.styles[e] = se(se({}, dt.styles[e] || {}), a), e === "fas" && yo("fa", t);
}
var Ln, Mn, Dn, fr = dt.styles, em = dt.shims, tm = (Ln = {}, Ve(Ln, Pe, Object.values(cn[Pe])), Ve(Ln, $e, Object.values(cn[$e])), Ln), _s = null, ud = {}, cd = {}, fd = {}, dd = {}, hd = {}, rm = (Mn = {}, Ve(Mn, Pe, Object.keys(ln[Pe])), Ve(Mn, $e, Object.keys(ln[$e])), Mn);
function nm(e) {
  return ~Rg.indexOf(e);
}
function im(e, t) {
  var r = t.split("-"), n = r[0], i = r.slice(1).join("-");
  return n === e && i !== "" && !nm(i) ? i : null;
}
var pd = function() {
  var t = function(a) {
    return ma(fr, function(o, s, l) {
      return o[l] = ma(s, a, {}), o;
    }, {});
  };
  ud = t(function(i, a, o) {
    if (a[3] && (i[a[3]] = o), a[2]) {
      var s = a[2].filter(function(l) {
        return typeof l == "number";
      });
      s.forEach(function(l) {
        i[l.toString(16)] = o;
      });
    }
    return i;
  }), cd = t(function(i, a, o) {
    if (i[o] = o, a[2]) {
      var s = a[2].filter(function(l) {
        return typeof l == "string";
      });
      s.forEach(function(l) {
        i[l] = o;
      });
    }
    return i;
  }), hd = t(function(i, a, o) {
    var s = a[2];
    return i[o] = o, s.forEach(function(l) {
      i[l] = o;
    }), i;
  });
  var r = "far" in fr || ue.autoFetchSvg, n = ma(em, function(i, a) {
    var o = a[0], s = a[1], l = a[2];
    return s === "far" && !r && (s = "fas"), typeof o == "string" && (i.names[o] = {
      prefix: s,
      iconName: l
    }), typeof o == "number" && (i.unicodes[o.toString(16)] = {
      prefix: s,
      iconName: l
    }), i;
  }, {
    names: {},
    unicodes: {}
  });
  fd = n.names, dd = n.unicodes, _s = Hi(ue.styleDefault, {
    family: ue.familyDefault
  });
};
Bg(function(e) {
  _s = Hi(e.styleDefault, {
    family: ue.familyDefault
  });
});
pd();
function Ts(e, t) {
  return (ud[e] || {})[t];
}
function am(e, t) {
  return (cd[e] || {})[t];
}
function Yt(e, t) {
  return (hd[e] || {})[t];
}
function vd(e) {
  return fd[e] || {
    prefix: null,
    iconName: null
  };
}
function om(e) {
  var t = dd[e], r = Ts("fas", e);
  return t || (r ? {
    prefix: "fas",
    iconName: r
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function Rt() {
  return _s;
}
var Ns = function() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function Hi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.family, n = r === void 0 ? Pe : r, i = ln[n][e], a = un[n][e] || un[n][i], o = e in dt.styles ? e : null;
  return a || o || null;
}
var Kl = (Dn = {}, Ve(Dn, Pe, Object.keys(cn[Pe])), Ve(Dn, $e, Object.keys(cn[$e])), Dn);
function Wi(e) {
  var t, r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = r.skipLookups, i = n === void 0 ? !1 : n, a = (t = {}, Ve(t, Pe, "".concat(ue.cssPrefix, "-").concat(Pe)), Ve(t, $e, "".concat(ue.cssPrefix, "-").concat($e)), t), o = null, s = Pe;
  (e.includes(a[Pe]) || e.some(function(f) {
    return Kl[Pe].includes(f);
  })) && (s = Pe), (e.includes(a[$e]) || e.some(function(f) {
    return Kl[$e].includes(f);
  })) && (s = $e);
  var l = e.reduce(function(f, d) {
    var c = im(ue.cssPrefix, d);
    if (fr[d] ? (d = tm[s].includes(d) ? Pg[s][d] : d, o = d, f.prefix = d) : rm[s].indexOf(d) > -1 ? (o = d, f.prefix = Hi(d, {
      family: s
    })) : c ? f.iconName = c : d !== ue.replacementClass && d !== a[Pe] && d !== a[$e] && f.rest.push(d), !i && f.prefix && f.iconName) {
      var u = o === "fa" ? vd(f.iconName) : {}, h = Yt(f.prefix, f.iconName);
      u.prefix && (o = null), f.iconName = u.iconName || h || f.iconName, f.prefix = u.prefix || f.prefix, f.prefix === "far" && !fr.far && fr.fas && !ue.autoFetchSvg && (f.prefix = "fas");
    }
    return f;
  }, Ns());
  return (e.includes("fa-brands") || e.includes("fab")) && (l.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (l.prefix = "fad"), !l.prefix && s === $e && (fr.fass || ue.autoFetchSvg) && (l.prefix = "fass", l.iconName = Yt(l.prefix, l.iconName) || l.iconName), (l.prefix === "fa" || o === "fa") && (l.prefix = Rt() || "fas"), l;
}
var sm = /* @__PURE__ */ function() {
  function e() {
    bg(this, e), this.definitions = {};
  }
  return wg(e, [{
    key: "add",
    value: function() {
      for (var r = this, n = arguments.length, i = new Array(n), a = 0; a < n; a++)
        i[a] = arguments[a];
      var o = i.reduce(this._pullDefinitions, {});
      Object.keys(o).forEach(function(s) {
        r.definitions[s] = se(se({}, r.definitions[s] || {}), o[s]), yo(s, o[s]);
        var l = cn[Pe][s];
        l && yo(l, o[s]), pd();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(r, n) {
      var i = n.prefix && n.iconName && n.icon ? {
        0: n
      } : n;
      return Object.keys(i).map(function(a) {
        var o = i[a], s = o.prefix, l = o.iconName, f = o.icon, d = f[2];
        r[s] || (r[s] = {}), d.length > 0 && d.forEach(function(c) {
          typeof c == "string" && (r[s][c] = f);
        }), r[s][l] = f;
      }), r;
    }
  }]), e;
}(), Zl = [], dr = {}, gr = {}, lm = Object.keys(gr);
function um(e, t) {
  var r = t.mixoutsTo;
  return Zl = e, dr = {}, Object.keys(gr).forEach(function(n) {
    lm.indexOf(n) === -1 && delete gr[n];
  }), Zl.forEach(function(n) {
    var i = n.mixout ? n.mixout() : {};
    if (Object.keys(i).forEach(function(o) {
      typeof i[o] == "function" && (r[o] = i[o]), bi(i[o]) === "object" && Object.keys(i[o]).forEach(function(s) {
        r[o] || (r[o] = {}), r[o][s] = i[o][s];
      });
    }), n.hooks) {
      var a = n.hooks();
      Object.keys(a).forEach(function(o) {
        dr[o] || (dr[o] = []), dr[o].push(a[o]);
      });
    }
    n.provides && n.provides(gr);
  }), r;
}
function bo(e, t) {
  for (var r = arguments.length, n = new Array(r > 2 ? r - 2 : 0), i = 2; i < r; i++)
    n[i - 2] = arguments[i];
  var a = dr[e] || [];
  return a.forEach(function(o) {
    t = o.apply(null, [t].concat(n));
  }), t;
}
function Xt(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  var i = dr[e] || [];
  i.forEach(function(a) {
    a.apply(null, r);
  });
}
function Tt() {
  var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return gr[e] ? gr[e].apply(null, t) : void 0;
}
function wo(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  var t = e.iconName, r = e.prefix || Rt();
  if (t)
    return t = Yt(r, t) || t, Vl(gd.definitions, r, t) || Vl(dt.styles, r, t);
}
var gd = new sm(), cm = function() {
  ue.autoReplaceSvg = !1, ue.observeMutations = !1, Xt("noAuto");
}, fm = {
  i2svg: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return Nt ? (Xt("beforeI2svg", t), Tt("pseudoElements2svg", t), Tt("i2svg", t)) : Promise.reject("Operation requires a DOM of some kind.");
  },
  watch: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.autoReplaceSvgRoot;
    ue.autoReplaceSvg === !1 && (ue.autoReplaceSvg = !0), ue.observeMutations = !0, Zg(function() {
      hm({
        autoReplaceSvgRoot: r
      }), Xt("watch", t);
    });
  }
}, dm = {
  icon: function(t) {
    if (t === null)
      return null;
    if (bi(t) === "object" && t.prefix && t.iconName)
      return {
        prefix: t.prefix,
        iconName: Yt(t.prefix, t.iconName) || t.iconName
      };
    if (Array.isArray(t) && t.length === 2) {
      var r = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1], n = Hi(t[0]);
      return {
        prefix: n,
        iconName: Yt(n, r) || r
      };
    }
    if (typeof t == "string" && (t.indexOf("".concat(ue.cssPrefix, "-")) > -1 || t.match(Cg))) {
      var i = Wi(t.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: i.prefix || Rt(),
        iconName: Yt(i.prefix, i.iconName) || i.iconName
      };
    }
    if (typeof t == "string") {
      var a = Rt();
      return {
        prefix: a,
        iconName: Yt(a, t) || t
      };
    }
  }
}, nt = {
  noAuto: cm,
  config: ue,
  dom: fm,
  parse: dm,
  library: gd,
  findIconDefinition: wo,
  toHtml: yn
}, hm = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.autoReplaceSvgRoot, n = r === void 0 ? Le : r;
  (Object.keys(dt.styles).length > 0 || ue.autoFetchSvg) && Nt && ue.autoReplaceSvg && nt.dom.i2svg({
    node: n
  });
};
function Yi(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map(function(n) {
        return yn(n);
      });
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (Nt) {
        var n = Le.createElement("div");
        return n.innerHTML = e.html, n.children;
      }
    }
  }), e;
}
function pm(e) {
  var t = e.children, r = e.main, n = e.mask, i = e.attributes, a = e.styles, o = e.transform;
  if (Ss(o) && r.found && !n.found) {
    var s = r.width, l = r.height, f = {
      x: s / l / 2,
      y: 0.5
    };
    i.style = Ui(se(se({}, a), {}, {
      "transform-origin": "".concat(f.x + o.x / 16, "em ").concat(f.y + o.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: i,
    children: t
  }];
}
function vm(e) {
  var t = e.prefix, r = e.iconName, n = e.children, i = e.attributes, a = e.symbol, o = a === !0 ? "".concat(t, "-").concat(ue.cssPrefix, "-").concat(r) : a;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: se(se({}, i), {}, {
        id: o
      }),
      children: n
    }]
  }];
}
function As(e) {
  var t = e.icons, r = t.main, n = t.mask, i = e.prefix, a = e.iconName, o = e.transform, s = e.symbol, l = e.title, f = e.maskId, d = e.titleId, c = e.extra, u = e.watchable, h = u === void 0 ? !1 : u, y = n.found ? n : r, g = y.width, b = y.height, v = i === "fak", m = [ue.replacementClass, a ? "".concat(ue.cssPrefix, "-").concat(a) : ""].filter(function(j) {
    return c.classes.indexOf(j) === -1;
  }).filter(function(j) {
    return j !== "" || !!j;
  }).concat(c.classes).join(" "), x = {
    children: [],
    attributes: se(se({}, c.attributes), {}, {
      "data-prefix": i,
      "data-icon": a,
      class: m,
      role: c.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(g, " ").concat(b)
    })
  }, p = v && !~c.classes.indexOf("fa-fw") ? {
    width: "".concat(g / b * 16 * 0.0625, "em")
  } : {};
  h && (x.attributes[Qt] = ""), l && (x.children.push({
    tag: "title",
    attributes: {
      id: x.attributes["aria-labelledby"] || "title-".concat(d || dn())
    },
    children: [l]
  }), delete x.attributes.title);
  var w = se(se({}, x), {}, {
    prefix: i,
    iconName: a,
    main: r,
    mask: n,
    maskId: f,
    transform: o,
    symbol: s,
    styles: se(se({}, p), c.styles)
  }), S = n.found && r.found ? Tt("generateAbstractMask", w) || {
    children: [],
    attributes: {}
  } : Tt("generateAbstractIcon", w) || {
    children: [],
    attributes: {}
  }, E = S.children, A = S.attributes;
  return w.children = E, w.attributes = A, s ? vm(w) : pm(w);
}
function Ql(e) {
  var t = e.content, r = e.width, n = e.height, i = e.transform, a = e.title, o = e.extra, s = e.watchable, l = s === void 0 ? !1 : s, f = se(se(se({}, o.attributes), a ? {
    title: a
  } : {}), {}, {
    class: o.classes.join(" ")
  });
  l && (f[Qt] = "");
  var d = se({}, o.styles);
  Ss(i) && (d.transform = Yg({
    transform: i,
    startCentered: !0,
    width: r,
    height: n
  }), d["-webkit-transform"] = d.transform);
  var c = Ui(d);
  c.length > 0 && (f.style = c);
  var u = [];
  return u.push({
    tag: "span",
    attributes: f,
    children: [t]
  }), a && u.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [a]
  }), u;
}
function gm(e) {
  var t = e.content, r = e.title, n = e.extra, i = se(se(se({}, n.attributes), r ? {
    title: r
  } : {}), {}, {
    class: n.classes.join(" ")
  }), a = Ui(n.styles);
  a.length > 0 && (i.style = a);
  var o = [];
  return o.push({
    tag: "span",
    attributes: i,
    children: [t]
  }), r && o.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [r]
  }), o;
}
var ya = dt.styles;
function xo(e) {
  var t = e[0], r = e[1], n = e.slice(4), i = ys(n, 1), a = i[0], o = null;
  return Array.isArray(a) ? o = {
    tag: "g",
    attributes: {
      class: "".concat(ue.cssPrefix, "-").concat(Wt.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(ue.cssPrefix, "-").concat(Wt.SECONDARY),
        fill: "currentColor",
        d: a[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(ue.cssPrefix, "-").concat(Wt.PRIMARY),
        fill: "currentColor",
        d: a[1]
      }
    }]
  } : o = {
    tag: "path",
    attributes: {
      fill: "currentColor",
      d: a
    }
  }, {
    found: !0,
    width: t,
    height: r,
    icon: o
  };
}
var mm = {
  found: !1,
  width: 512,
  height: 512
};
function ym(e, t) {
  !rd && !ue.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function Oo(e, t) {
  var r = t;
  return t === "fa" && ue.styleDefault !== null && (t = Rt()), new Promise(function(n, i) {
    if (Tt("missingIconAbstract"), r === "fa") {
      var a = vd(e) || {};
      e = a.iconName || e, t = a.prefix || t;
    }
    if (e && t && ya[t] && ya[t][e]) {
      var o = ya[t][e];
      return n(xo(o));
    }
    ym(e, t), n(se(se({}, mm), {}, {
      icon: ue.showMissingIcons && e ? Tt("missingIconAbstract") || {} : {}
    }));
  });
}
var Xl = function() {
}, Eo = ue.measurePerformance && An && An.mark && An.measure ? An : {
  mark: Xl,
  measure: Xl
}, tn = 'FA "6.4.2"', bm = function(t) {
  return Eo.mark("".concat(tn, " ").concat(t, " begins")), function() {
    return md(t);
  };
}, md = function(t) {
  Eo.mark("".concat(tn, " ").concat(t, " ends")), Eo.measure("".concat(tn, " ").concat(t), "".concat(tn, " ").concat(t, " begins"), "".concat(tn, " ").concat(t, " ends"));
}, ks = {
  begin: bm,
  end: md
}, ei = function() {
};
function Jl(e) {
  var t = e.getAttribute ? e.getAttribute(Qt) : null;
  return typeof t == "string";
}
function wm(e) {
  var t = e.getAttribute ? e.getAttribute(ws) : null, r = e.getAttribute ? e.getAttribute(xs) : null;
  return t && r;
}
function xm(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(ue.replacementClass);
}
function Om() {
  if (ue.autoReplaceSvg === !0)
    return ti.replace;
  var e = ti[ue.autoReplaceSvg];
  return e || ti.replace;
}
function Em(e) {
  return Le.createElementNS("http://www.w3.org/2000/svg", e);
}
function Sm(e) {
  return Le.createElement(e);
}
function yd(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = t.ceFn, n = r === void 0 ? e.tag === "svg" ? Em : Sm : r;
  if (typeof e == "string")
    return Le.createTextNode(e);
  var i = n(e.tag);
  Object.keys(e.attributes || []).forEach(function(o) {
    i.setAttribute(o, e.attributes[o]);
  });
  var a = e.children || [];
  return a.forEach(function(o) {
    i.appendChild(yd(o, {
      ceFn: n
    }));
  }), i;
}
function _m(e) {
  var t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
var ti = {
  replace: function(t) {
    var r = t[0];
    if (r.parentNode)
      if (t[1].forEach(function(i) {
        r.parentNode.insertBefore(yd(i), r);
      }), r.getAttribute(Qt) === null && ue.keepOriginalSource) {
        var n = Le.createComment(_m(r));
        r.parentNode.replaceChild(n, r);
      } else
        r.remove();
  },
  nest: function(t) {
    var r = t[0], n = t[1];
    if (~Es(r).indexOf(ue.replacementClass))
      return ti.replace(t);
    var i = new RegExp("".concat(ue.cssPrefix, "-.*"));
    if (delete n[0].attributes.id, n[0].attributes.class) {
      var a = n[0].attributes.class.split(" ").reduce(function(s, l) {
        return l === ue.replacementClass || l.match(i) ? s.toSvg.push(l) : s.toNode.push(l), s;
      }, {
        toNode: [],
        toSvg: []
      });
      n[0].attributes.class = a.toSvg.join(" "), a.toNode.length === 0 ? r.removeAttribute("class") : r.setAttribute("class", a.toNode.join(" "));
    }
    var o = n.map(function(s) {
      return yn(s);
    }).join(`
`);
    r.setAttribute(Qt, ""), r.innerHTML = o;
  }
};
function eu(e) {
  e();
}
function bd(e, t) {
  var r = typeof t == "function" ? t : ei;
  if (e.length === 0)
    r();
  else {
    var n = eu;
    ue.mutateApproach === kg && (n = Dt.requestAnimationFrame || eu), n(function() {
      var i = Om(), a = ks.begin("mutate");
      e.map(i), a(), r();
    });
  }
}
var js = !1;
function wd() {
  js = !0;
}
function So() {
  js = !1;
}
var xi = null;
function tu(e) {
  if (Hl && ue.observeMutations) {
    var t = e.treeCallback, r = t === void 0 ? ei : t, n = e.nodeCallback, i = n === void 0 ? ei : n, a = e.pseudoElementsCallback, o = a === void 0 ? ei : a, s = e.observeMutationsRoot, l = s === void 0 ? Le : s;
    xi = new Hl(function(f) {
      if (!js) {
        var d = Rt();
        Nr(f).forEach(function(c) {
          if (c.type === "childList" && c.addedNodes.length > 0 && !Jl(c.addedNodes[0]) && (ue.searchPseudoElements && o(c.target), r(c.target)), c.type === "attributes" && c.target.parentNode && ue.searchPseudoElements && o(c.target.parentNode), c.type === "attributes" && Jl(c.target) && ~Dg.indexOf(c.attributeName))
            if (c.attributeName === "class" && wm(c.target)) {
              var u = Wi(Es(c.target)), h = u.prefix, y = u.iconName;
              c.target.setAttribute(ws, h || d), y && c.target.setAttribute(xs, y);
            } else
              xm(c.target) && i(c.target);
        });
      }
    }), Nt && xi.observe(l, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    });
  }
}
function Tm() {
  xi && xi.disconnect();
}
function Nm(e) {
  var t = e.getAttribute("style"), r = [];
  return t && (r = t.split(";").reduce(function(n, i) {
    var a = i.split(":"), o = a[0], s = a.slice(1);
    return o && s.length > 0 && (n[o] = s.join(":").trim()), n;
  }, {})), r;
}
function Am(e) {
  var t = e.getAttribute("data-prefix"), r = e.getAttribute("data-icon"), n = e.innerText !== void 0 ? e.innerText.trim() : "", i = Wi(Es(e));
  return i.prefix || (i.prefix = Rt()), t && r && (i.prefix = t, i.iconName = r), i.iconName && i.prefix || (i.prefix && n.length > 0 && (i.iconName = am(i.prefix, e.innerText) || Ts(i.prefix, mo(e.innerText))), !i.iconName && ue.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (i.iconName = e.firstChild.data)), i;
}
function km(e) {
  var t = Nr(e.attributes).reduce(function(i, a) {
    return i.name !== "class" && i.name !== "style" && (i[a.name] = a.value), i;
  }, {}), r = e.getAttribute("title"), n = e.getAttribute("data-fa-title-id");
  return ue.autoA11y && (r ? t["aria-labelledby"] = "".concat(ue.replacementClass, "-title-").concat(n || dn()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function jm() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: bt,
    symbol: !1,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    extra: {
      classes: [],
      styles: {},
      attributes: {}
    }
  };
}
function ru(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  }, r = Am(e), n = r.iconName, i = r.prefix, a = r.rest, o = km(e), s = bo("parseNodeAttributes", {}, e), l = t.styleParser ? Nm(e) : [];
  return se({
    iconName: n,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: i,
    transform: bt,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: a,
      styles: l,
      attributes: o
    }
  }, s);
}
var Pm = dt.styles;
function xd(e) {
  var t = ue.autoReplaceSvg === "nest" ? ru(e, {
    styleParser: !1
  }) : ru(e);
  return ~t.extra.classes.indexOf(nd) ? Tt("generateLayersText", e, t) : Tt("generateSvgReplacementMutation", e, t);
}
var $t = /* @__PURE__ */ new Set();
Os.map(function(e) {
  $t.add("fa-".concat(e));
});
Object.keys(ln[Pe]).map($t.add.bind($t));
Object.keys(ln[$e]).map($t.add.bind($t));
$t = gn($t);
function nu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!Nt)
    return Promise.resolve();
  var r = Le.documentElement.classList, n = function(c) {
    return r.add("".concat(Wl, "-").concat(c));
  }, i = function(c) {
    return r.remove("".concat(Wl, "-").concat(c));
  }, a = ue.autoFetchSvg ? $t : Os.map(function(d) {
    return "fa-".concat(d);
  }).concat(Object.keys(Pm));
  a.includes("fa") || a.push("fa");
  var o = [".".concat(nd, ":not([").concat(Qt, "])")].concat(a.map(function(d) {
    return ".".concat(d, ":not([").concat(Qt, "])");
  })).join(", ");
  if (o.length === 0)
    return Promise.resolve();
  var s = [];
  try {
    s = Nr(e.querySelectorAll(o));
  } catch {
  }
  if (s.length > 0)
    n("pending"), i("complete");
  else
    return Promise.resolve();
  var l = ks.begin("onTree"), f = s.reduce(function(d, c) {
    try {
      var u = xd(c);
      u && d.push(u);
    } catch (h) {
      rd || h.name === "MissingIcon" && console.error(h);
    }
    return d;
  }, []);
  return new Promise(function(d, c) {
    Promise.all(f).then(function(u) {
      bd(u, function() {
        n("active"), n("complete"), i("pending"), typeof t == "function" && t(), l(), d();
      });
    }).catch(function(u) {
      l(), c(u);
    });
  });
}
function Cm(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  xd(e).then(function(r) {
    r && bd([r], t);
  });
}
function Im(e) {
  return function(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = (t || {}).icon ? t : wo(t || {}), i = r.mask;
    return i && (i = (i || {}).icon ? i : wo(i || {})), e(n, se(se({}, r), {}, {
      mask: i
    }));
  };
}
var Lm = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = r.transform, i = n === void 0 ? bt : n, a = r.symbol, o = a === void 0 ? !1 : a, s = r.mask, l = s === void 0 ? null : s, f = r.maskId, d = f === void 0 ? null : f, c = r.title, u = c === void 0 ? null : c, h = r.titleId, y = h === void 0 ? null : h, g = r.classes, b = g === void 0 ? [] : g, v = r.attributes, m = v === void 0 ? {} : v, x = r.styles, p = x === void 0 ? {} : x;
  if (t) {
    var w = t.prefix, S = t.iconName, E = t.icon;
    return Yi(se({
      type: "icon"
    }, t), function() {
      return Xt("beforeDOMElementCreation", {
        iconDefinition: t,
        params: r
      }), ue.autoA11y && (u ? m["aria-labelledby"] = "".concat(ue.replacementClass, "-title-").concat(y || dn()) : (m["aria-hidden"] = "true", m.focusable = "false")), As({
        icons: {
          main: xo(E),
          mask: l ? xo(l.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: w,
        iconName: S,
        transform: se(se({}, bt), i),
        symbol: o,
        title: u,
        maskId: d,
        titleId: y,
        extra: {
          attributes: m,
          styles: p,
          classes: b
        }
      });
    });
  }
}, Mm = {
  mixout: function() {
    return {
      icon: Im(Lm)
    };
  },
  hooks: function() {
    return {
      mutationObserverCallbacks: function(r) {
        return r.treeCallback = nu, r.nodeCallback = Cm, r;
      }
    };
  },
  provides: function(t) {
    t.i2svg = function(r) {
      var n = r.node, i = n === void 0 ? Le : n, a = r.callback, o = a === void 0 ? function() {
      } : a;
      return nu(i, o);
    }, t.generateSvgReplacementMutation = function(r, n) {
      var i = n.iconName, a = n.title, o = n.titleId, s = n.prefix, l = n.transform, f = n.symbol, d = n.mask, c = n.maskId, u = n.extra;
      return new Promise(function(h, y) {
        Promise.all([Oo(i, s), d.iconName ? Oo(d.iconName, d.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function(g) {
          var b = ys(g, 2), v = b[0], m = b[1];
          h([r, As({
            icons: {
              main: v,
              mask: m
            },
            prefix: s,
            iconName: i,
            transform: l,
            symbol: f,
            maskId: c,
            title: a,
            titleId: o,
            extra: u,
            watchable: !0
          })]);
        }).catch(y);
      });
    }, t.generateAbstractIcon = function(r) {
      var n = r.children, i = r.attributes, a = r.main, o = r.transform, s = r.styles, l = Ui(s);
      l.length > 0 && (i.style = l);
      var f;
      return Ss(o) && (f = Tt("generateAbstractTransformGrouping", {
        main: a,
        transform: o,
        containerWidth: a.width,
        iconWidth: a.width
      })), n.push(f || a.icon), {
        children: n,
        attributes: i
      };
    };
  }
}, Dm = {
  mixout: function() {
    return {
      layer: function(r) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = n.classes, a = i === void 0 ? [] : i;
        return Yi({
          type: "layer"
        }, function() {
          Xt("beforeDOMElementCreation", {
            assembler: r,
            params: n
          });
          var o = [];
          return r(function(s) {
            Array.isArray(s) ? s.map(function(l) {
              o = o.concat(l.abstract);
            }) : o = o.concat(s.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(ue.cssPrefix, "-layers")].concat(gn(a)).join(" ")
            },
            children: o
          }];
        });
      }
    };
  }
}, Rm = {
  mixout: function() {
    return {
      counter: function(r) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = n.title, a = i === void 0 ? null : i, o = n.classes, s = o === void 0 ? [] : o, l = n.attributes, f = l === void 0 ? {} : l, d = n.styles, c = d === void 0 ? {} : d;
        return Yi({
          type: "counter",
          content: r
        }, function() {
          return Xt("beforeDOMElementCreation", {
            content: r,
            params: n
          }), gm({
            content: r.toString(),
            title: a,
            extra: {
              attributes: f,
              styles: c,
              classes: ["".concat(ue.cssPrefix, "-layers-counter")].concat(gn(s))
            }
          });
        });
      }
    };
  }
}, $m = {
  mixout: function() {
    return {
      text: function(r) {
        var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = n.transform, a = i === void 0 ? bt : i, o = n.title, s = o === void 0 ? null : o, l = n.classes, f = l === void 0 ? [] : l, d = n.attributes, c = d === void 0 ? {} : d, u = n.styles, h = u === void 0 ? {} : u;
        return Yi({
          type: "text",
          content: r
        }, function() {
          return Xt("beforeDOMElementCreation", {
            content: r,
            params: n
          }), Ql({
            content: r,
            transform: se(se({}, bt), a),
            title: s,
            extra: {
              attributes: c,
              styles: h,
              classes: ["".concat(ue.cssPrefix, "-layers-text")].concat(gn(f))
            }
          });
        });
      }
    };
  },
  provides: function(t) {
    t.generateLayersText = function(r, n) {
      var i = n.title, a = n.transform, o = n.extra, s = null, l = null;
      if (Jf) {
        var f = parseInt(getComputedStyle(r).fontSize, 10), d = r.getBoundingClientRect();
        s = d.width / f, l = d.height / f;
      }
      return ue.autoA11y && !i && (o.attributes["aria-hidden"] = "true"), Promise.resolve([r, Ql({
        content: r.innerHTML,
        width: s,
        height: l,
        transform: a,
        title: i,
        extra: o,
        watchable: !0
      })]);
    };
  }
}, zm = new RegExp('"', "ug"), iu = [1105920, 1112319];
function Fm(e) {
  var t = e.replace(zm, ""), r = Jg(t, 0), n = r >= iu[0] && r <= iu[1], i = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: mo(i ? t[0] : t),
    isSecondary: n || i
  };
}
function au(e, t) {
  var r = "".concat(Ag).concat(t.replace(":", "-"));
  return new Promise(function(n, i) {
    if (e.getAttribute(r) !== null)
      return n();
    var a = Nr(e.children), o = a.filter(function(E) {
      return E.getAttribute(go) === t;
    })[0], s = Dt.getComputedStyle(e, t), l = s.getPropertyValue("font-family").match(Ig), f = s.getPropertyValue("font-weight"), d = s.getPropertyValue("content");
    if (o && !l)
      return e.removeChild(o), n();
    if (l && d !== "none" && d !== "") {
      var c = s.getPropertyValue("content"), u = ~["Sharp"].indexOf(l[2]) ? $e : Pe, h = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(l[2]) ? un[u][l[2].toLowerCase()] : Lg[u][f], y = Fm(c), g = y.value, b = y.isSecondary, v = l[0].startsWith("FontAwesome"), m = Ts(h, g), x = m;
      if (v) {
        var p = om(g);
        p.iconName && p.prefix && (m = p.iconName, h = p.prefix);
      }
      if (m && !b && (!o || o.getAttribute(ws) !== h || o.getAttribute(xs) !== x)) {
        e.setAttribute(r, x), o && e.removeChild(o);
        var w = jm(), S = w.extra;
        S.attributes[go] = t, Oo(m, h).then(function(E) {
          var A = As(se(se({}, w), {}, {
            icons: {
              main: E,
              mask: Ns()
            },
            prefix: h,
            iconName: x,
            extra: S,
            watchable: !0
          })), j = Le.createElementNS("http://www.w3.org/2000/svg", "svg");
          t === "::before" ? e.insertBefore(j, e.firstChild) : e.appendChild(j), j.outerHTML = A.map(function(_) {
            return yn(_);
          }).join(`
`), e.removeAttribute(r), n();
        }).catch(i);
      } else
        n();
    } else
      n();
  });
}
function Bm(e) {
  return Promise.all([au(e, "::before"), au(e, "::after")]);
}
function qm(e) {
  return e.parentNode !== document.head && !~jg.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(go) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function ou(e) {
  if (Nt)
    return new Promise(function(t, r) {
      var n = Nr(e.querySelectorAll("*")).filter(qm).map(Bm), i = ks.begin("searchPseudoElements");
      wd(), Promise.all(n).then(function() {
        i(), So(), t();
      }).catch(function() {
        i(), So(), r();
      });
    });
}
var Um = {
  hooks: function() {
    return {
      mutationObserverCallbacks: function(r) {
        return r.pseudoElementsCallback = ou, r;
      }
    };
  },
  provides: function(t) {
    t.pseudoElements2svg = function(r) {
      var n = r.node, i = n === void 0 ? Le : n;
      ue.searchPseudoElements && ou(i);
    };
  }
}, su = !1, Hm = {
  mixout: function() {
    return {
      dom: {
        unwatch: function() {
          wd(), su = !0;
        }
      }
    };
  },
  hooks: function() {
    return {
      bootstrap: function() {
        tu(bo("mutationObserverCallbacks", {}));
      },
      noAuto: function() {
        Tm();
      },
      watch: function(r) {
        var n = r.observeMutationsRoot;
        su ? So() : tu(bo("mutationObserverCallbacks", {
          observeMutationsRoot: n
        }));
      }
    };
  }
}, lu = function(t) {
  var r = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return t.toLowerCase().split(" ").reduce(function(n, i) {
    var a = i.toLowerCase().split("-"), o = a[0], s = a.slice(1).join("-");
    if (o && s === "h")
      return n.flipX = !0, n;
    if (o && s === "v")
      return n.flipY = !0, n;
    if (s = parseFloat(s), isNaN(s))
      return n;
    switch (o) {
      case "grow":
        n.size = n.size + s;
        break;
      case "shrink":
        n.size = n.size - s;
        break;
      case "left":
        n.x = n.x - s;
        break;
      case "right":
        n.x = n.x + s;
        break;
      case "up":
        n.y = n.y - s;
        break;
      case "down":
        n.y = n.y + s;
        break;
      case "rotate":
        n.rotate = n.rotate + s;
        break;
    }
    return n;
  }, r);
}, Wm = {
  mixout: function() {
    return {
      parse: {
        transform: function(r) {
          return lu(r);
        }
      }
    };
  },
  hooks: function() {
    return {
      parseNodeAttributes: function(r, n) {
        var i = n.getAttribute("data-fa-transform");
        return i && (r.transform = lu(i)), r;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractTransformGrouping = function(r) {
      var n = r.main, i = r.transform, a = r.containerWidth, o = r.iconWidth, s = {
        transform: "translate(".concat(a / 2, " 256)")
      }, l = "translate(".concat(i.x * 32, ", ").concat(i.y * 32, ") "), f = "scale(".concat(i.size / 16 * (i.flipX ? -1 : 1), ", ").concat(i.size / 16 * (i.flipY ? -1 : 1), ") "), d = "rotate(".concat(i.rotate, " 0 0)"), c = {
        transform: "".concat(l, " ").concat(f, " ").concat(d)
      }, u = {
        transform: "translate(".concat(o / 2 * -1, " -256)")
      }, h = {
        outer: s,
        inner: c,
        path: u
      };
      return {
        tag: "g",
        attributes: se({}, h.outer),
        children: [{
          tag: "g",
          attributes: se({}, h.inner),
          children: [{
            tag: n.icon.tag,
            children: n.icon.children,
            attributes: se(se({}, n.icon.attributes), h.path)
          }]
        }]
      };
    };
  }
}, ba = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function uu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function Ym(e) {
  return e.tag === "g" ? e.children : [e];
}
var Vm = {
  hooks: function() {
    return {
      parseNodeAttributes: function(r, n) {
        var i = n.getAttribute("data-fa-mask"), a = i ? Wi(i.split(" ").map(function(o) {
          return o.trim();
        })) : Ns();
        return a.prefix || (a.prefix = Rt()), r.mask = a, r.maskId = n.getAttribute("data-fa-mask-id"), r;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractMask = function(r) {
      var n = r.children, i = r.attributes, a = r.main, o = r.mask, s = r.maskId, l = r.transform, f = a.width, d = a.icon, c = o.width, u = o.icon, h = Wg({
        transform: l,
        containerWidth: c,
        iconWidth: f
      }), y = {
        tag: "rect",
        attributes: se(se({}, ba), {}, {
          fill: "white"
        })
      }, g = d.children ? {
        children: d.children.map(uu)
      } : {}, b = {
        tag: "g",
        attributes: se({}, h.inner),
        children: [uu(se({
          tag: d.tag,
          attributes: se(se({}, d.attributes), h.path)
        }, g))]
      }, v = {
        tag: "g",
        attributes: se({}, h.outer),
        children: [b]
      }, m = "mask-".concat(s || dn()), x = "clip-".concat(s || dn()), p = {
        tag: "mask",
        attributes: se(se({}, ba), {}, {
          id: m,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [y, v]
      }, w = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: x
          },
          children: Ym(u)
        }, p]
      };
      return n.push(w, {
        tag: "rect",
        attributes: se({
          fill: "currentColor",
          "clip-path": "url(#".concat(x, ")"),
          mask: "url(#".concat(m, ")")
        }, ba)
      }), {
        children: n,
        attributes: i
      };
    };
  }
}, Gm = {
  provides: function(t) {
    var r = !1;
    Dt.matchMedia && (r = Dt.matchMedia("(prefers-reduced-motion: reduce)").matches), t.missingIconAbstract = function() {
      var n = [], i = {
        fill: "currentColor"
      }, a = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      n.push({
        tag: "path",
        attributes: se(se({}, i), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var o = se(se({}, a), {}, {
        attributeName: "opacity"
      }), s = {
        tag: "circle",
        attributes: se(se({}, i), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return r || s.children.push({
        tag: "animate",
        attributes: se(se({}, a), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: se(se({}, o), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), n.push(s), n.push({
        tag: "path",
        attributes: se(se({}, i), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: r ? [] : [{
          tag: "animate",
          attributes: se(se({}, o), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      }), r || n.push({
        tag: "path",
        attributes: se(se({}, i), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [{
          tag: "animate",
          attributes: se(se({}, o), {}, {
            values: "0;0;1;1;0;0;"
          })
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: n
      };
    };
  }
}, Km = {
  hooks: function() {
    return {
      parseNodeAttributes: function(r, n) {
        var i = n.getAttribute("data-fa-symbol"), a = i === null ? !1 : i === "" ? !0 : i;
        return r.symbol = a, r;
      }
    };
  }
}, Zm = [Gg, Mm, Dm, Rm, $m, Um, Hm, Wm, Vm, Gm, Km];
um(Zm, {
  mixoutsTo: nt
});
nt.noAuto;
nt.config;
nt.library;
nt.dom;
var _o = nt.parse;
nt.findIconDefinition;
nt.toHtml;
var Qm = nt.icon;
nt.layer;
nt.text;
nt.counter;
var To = { exports: {} }, Rn = { exports: {} }, Se = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cu;
function Xm() {
  if (cu)
    return Se;
  cu = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, c = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, m = e ? Symbol.for("react.scope") : 60119;
  function x(w) {
    if (typeof w == "object" && w !== null) {
      var S = w.$$typeof;
      switch (S) {
        case t:
          switch (w = w.type, w) {
            case l:
            case f:
            case n:
            case a:
            case i:
            case c:
              return w;
            default:
              switch (w = w && w.$$typeof, w) {
                case s:
                case d:
                case y:
                case h:
                case o:
                  return w;
                default:
                  return S;
              }
          }
        case r:
          return S;
      }
    }
  }
  function p(w) {
    return x(w) === f;
  }
  return Se.AsyncMode = l, Se.ConcurrentMode = f, Se.ContextConsumer = s, Se.ContextProvider = o, Se.Element = t, Se.ForwardRef = d, Se.Fragment = n, Se.Lazy = y, Se.Memo = h, Se.Portal = r, Se.Profiler = a, Se.StrictMode = i, Se.Suspense = c, Se.isAsyncMode = function(w) {
    return p(w) || x(w) === l;
  }, Se.isConcurrentMode = p, Se.isContextConsumer = function(w) {
    return x(w) === s;
  }, Se.isContextProvider = function(w) {
    return x(w) === o;
  }, Se.isElement = function(w) {
    return typeof w == "object" && w !== null && w.$$typeof === t;
  }, Se.isForwardRef = function(w) {
    return x(w) === d;
  }, Se.isFragment = function(w) {
    return x(w) === n;
  }, Se.isLazy = function(w) {
    return x(w) === y;
  }, Se.isMemo = function(w) {
    return x(w) === h;
  }, Se.isPortal = function(w) {
    return x(w) === r;
  }, Se.isProfiler = function(w) {
    return x(w) === a;
  }, Se.isStrictMode = function(w) {
    return x(w) === i;
  }, Se.isSuspense = function(w) {
    return x(w) === c;
  }, Se.isValidElementType = function(w) {
    return typeof w == "string" || typeof w == "function" || w === n || w === f || w === a || w === i || w === c || w === u || typeof w == "object" && w !== null && (w.$$typeof === y || w.$$typeof === h || w.$$typeof === o || w.$$typeof === s || w.$$typeof === d || w.$$typeof === b || w.$$typeof === v || w.$$typeof === m || w.$$typeof === g);
  }, Se.typeOf = x, Se;
}
var _e = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fu;
function Jm() {
  return fu || (fu = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, c = e ? Symbol.for("react.suspense") : 60113, u = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, m = e ? Symbol.for("react.scope") : 60119;
    function x(Z) {
      return typeof Z == "string" || typeof Z == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      Z === n || Z === f || Z === a || Z === i || Z === c || Z === u || typeof Z == "object" && Z !== null && (Z.$$typeof === y || Z.$$typeof === h || Z.$$typeof === o || Z.$$typeof === s || Z.$$typeof === d || Z.$$typeof === b || Z.$$typeof === v || Z.$$typeof === m || Z.$$typeof === g);
    }
    function p(Z) {
      if (typeof Z == "object" && Z !== null) {
        var le = Z.$$typeof;
        switch (le) {
          case t:
            var ce = Z.type;
            switch (ce) {
              case l:
              case f:
              case n:
              case a:
              case i:
              case c:
                return ce;
              default:
                var he = ce && ce.$$typeof;
                switch (he) {
                  case s:
                  case d:
                  case y:
                  case h:
                  case o:
                    return he;
                  default:
                    return le;
                }
            }
          case r:
            return le;
        }
      }
    }
    var w = l, S = f, E = s, A = o, j = t, _ = d, O = n, N = y, k = h, I = r, R = a, H = i, U = c, G = !1;
    function q(Z) {
      return G || (G = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), P(Z) || p(Z) === l;
    }
    function P(Z) {
      return p(Z) === f;
    }
    function T(Z) {
      return p(Z) === s;
    }
    function M(Z) {
      return p(Z) === o;
    }
    function D(Z) {
      return typeof Z == "object" && Z !== null && Z.$$typeof === t;
    }
    function F(Z) {
      return p(Z) === d;
    }
    function z(Z) {
      return p(Z) === n;
    }
    function C(Z) {
      return p(Z) === y;
    }
    function $(Z) {
      return p(Z) === h;
    }
    function W(Z) {
      return p(Z) === r;
    }
    function Y(Z) {
      return p(Z) === a;
    }
    function V(Z) {
      return p(Z) === i;
    }
    function te(Z) {
      return p(Z) === c;
    }
    _e.AsyncMode = w, _e.ConcurrentMode = S, _e.ContextConsumer = E, _e.ContextProvider = A, _e.Element = j, _e.ForwardRef = _, _e.Fragment = O, _e.Lazy = N, _e.Memo = k, _e.Portal = I, _e.Profiler = R, _e.StrictMode = H, _e.Suspense = U, _e.isAsyncMode = q, _e.isConcurrentMode = P, _e.isContextConsumer = T, _e.isContextProvider = M, _e.isElement = D, _e.isForwardRef = F, _e.isFragment = z, _e.isLazy = C, _e.isMemo = $, _e.isPortal = W, _e.isProfiler = Y, _e.isStrictMode = V, _e.isSuspense = te, _e.isValidElementType = x, _e.typeOf = p;
  }()), _e;
}
var du;
function Od() {
  return du || (du = 1, process.env.NODE_ENV === "production" ? Rn.exports = Xm() : Rn.exports = Jm()), Rn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var wa, hu;
function ey() {
  if (hu)
    return wa;
  hu = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
  function n(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var o = {}, s = 0; s < 10; s++)
        o["_" + String.fromCharCode(s)] = s;
      var l = Object.getOwnPropertyNames(o).map(function(d) {
        return o[d];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var f = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        f[d] = d;
      }), Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return wa = i() ? Object.assign : function(a, o) {
    for (var s, l = n(a), f, d = 1; d < arguments.length; d++) {
      s = Object(arguments[d]);
      for (var c in s)
        t.call(s, c) && (l[c] = s[c]);
      if (e) {
        f = e(s);
        for (var u = 0; u < f.length; u++)
          r.call(s, f[u]) && (l[f[u]] = s[f[u]]);
      }
    }
    return l;
  }, wa;
}
var xa, pu;
function Ps() {
  if (pu)
    return xa;
  pu = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return xa = e, xa;
}
var Oa, vu;
function Ed() {
  return vu || (vu = 1, Oa = Function.call.bind(Object.prototype.hasOwnProperty)), Oa;
}
var Ea, gu;
function ty() {
  if (gu)
    return Ea;
  gu = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Ps(), r = {}, n = Ed();
    e = function(a) {
      var o = "Warning: " + a;
      typeof console < "u" && console.error(o);
      try {
        throw new Error(o);
      } catch {
      }
    };
  }
  function i(a, o, s, l, f) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in a)
        if (n(a, d)) {
          var c;
          try {
            if (typeof a[d] != "function") {
              var u = Error(
                (l || "React class") + ": " + s + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw u.name = "Invariant Violation", u;
            }
            c = a[d](o, d, l, s, null, t);
          } catch (y) {
            c = y;
          }
          if (c && !(c instanceof Error) && e(
            (l || "React class") + ": type specification of " + s + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof c + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), c instanceof Error && !(c.message in r)) {
            r[c.message] = !0;
            var h = f ? f() : "";
            e(
              "Failed " + s + " type: " + c.message + (h ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, Ea = i, Ea;
}
var Sa, mu;
function ry() {
  if (mu)
    return Sa;
  mu = 1;
  var e = Od(), t = ey(), r = Ps(), n = Ed(), i = ty(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(s) {
    var l = "Warning: " + s;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function o() {
    return null;
  }
  return Sa = function(s, l) {
    var f = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function c(P) {
      var T = P && (f && P[f] || P[d]);
      if (typeof T == "function")
        return T;
    }
    var u = "<<anonymous>>", h = {
      array: v("array"),
      bigint: v("bigint"),
      bool: v("boolean"),
      func: v("function"),
      number: v("number"),
      object: v("object"),
      string: v("string"),
      symbol: v("symbol"),
      any: m(),
      arrayOf: x,
      element: p(),
      elementType: w(),
      instanceOf: S,
      node: _(),
      objectOf: A,
      oneOf: E,
      oneOfType: j,
      shape: N,
      exact: k
    };
    function y(P, T) {
      return P === T ? P !== 0 || 1 / P === 1 / T : P !== P && T !== T;
    }
    function g(P, T) {
      this.message = P, this.data = T && typeof T == "object" ? T : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function b(P) {
      if (process.env.NODE_ENV !== "production")
        var T = {}, M = 0;
      function D(z, C, $, W, Y, V, te) {
        if (W = W || u, V = V || $, te !== r) {
          if (l) {
            var Z = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw Z.name = "Invariant Violation", Z;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var le = W + ":" + $;
            !T[le] && // Avoid spamming the console because they are often not actionable except for lib authors
            M < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + V + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), T[le] = !0, M++);
          }
        }
        return C[$] == null ? z ? C[$] === null ? new g("The " + Y + " `" + V + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + Y + " `" + V + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : P(C, $, W, Y, V);
      }
      var F = D.bind(null, !1);
      return F.isRequired = D.bind(null, !0), F;
    }
    function v(P) {
      function T(M, D, F, z, C, $) {
        var W = M[D], Y = H(W);
        if (Y !== P) {
          var V = U(W);
          return new g(
            "Invalid " + z + " `" + C + "` of type " + ("`" + V + "` supplied to `" + F + "`, expected ") + ("`" + P + "`."),
            { expectedType: P }
          );
        }
        return null;
      }
      return b(T);
    }
    function m() {
      return b(o);
    }
    function x(P) {
      function T(M, D, F, z, C) {
        if (typeof P != "function")
          return new g("Property `" + C + "` of component `" + F + "` has invalid PropType notation inside arrayOf.");
        var $ = M[D];
        if (!Array.isArray($)) {
          var W = H($);
          return new g("Invalid " + z + " `" + C + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected an array."));
        }
        for (var Y = 0; Y < $.length; Y++) {
          var V = P($, Y, F, z, C + "[" + Y + "]", r);
          if (V instanceof Error)
            return V;
        }
        return null;
      }
      return b(T);
    }
    function p() {
      function P(T, M, D, F, z) {
        var C = T[M];
        if (!s(C)) {
          var $ = H(C);
          return new g("Invalid " + F + " `" + z + "` of type " + ("`" + $ + "` supplied to `" + D + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(P);
    }
    function w() {
      function P(T, M, D, F, z) {
        var C = T[M];
        if (!e.isValidElementType(C)) {
          var $ = H(C);
          return new g("Invalid " + F + " `" + z + "` of type " + ("`" + $ + "` supplied to `" + D + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(P);
    }
    function S(P) {
      function T(M, D, F, z, C) {
        if (!(M[D] instanceof P)) {
          var $ = P.name || u, W = q(M[D]);
          return new g("Invalid " + z + " `" + C + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return b(T);
    }
    function E(P) {
      if (!Array.isArray(P))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), o;
      function T(M, D, F, z, C) {
        for (var $ = M[D], W = 0; W < P.length; W++)
          if (y($, P[W]))
            return null;
        var Y = JSON.stringify(P, function(te, Z) {
          var le = U(Z);
          return le === "symbol" ? String(Z) : Z;
        });
        return new g("Invalid " + z + " `" + C + "` of value `" + String($) + "` " + ("supplied to `" + F + "`, expected one of " + Y + "."));
      }
      return b(T);
    }
    function A(P) {
      function T(M, D, F, z, C) {
        if (typeof P != "function")
          return new g("Property `" + C + "` of component `" + F + "` has invalid PropType notation inside objectOf.");
        var $ = M[D], W = H($);
        if (W !== "object")
          return new g("Invalid " + z + " `" + C + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected an object."));
        for (var Y in $)
          if (n($, Y)) {
            var V = P($, Y, F, z, C + "." + Y, r);
            if (V instanceof Error)
              return V;
          }
        return null;
      }
      return b(T);
    }
    function j(P) {
      if (!Array.isArray(P))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), o;
      for (var T = 0; T < P.length; T++) {
        var M = P[T];
        if (typeof M != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + G(M) + " at index " + T + "."
          ), o;
      }
      function D(F, z, C, $, W) {
        for (var Y = [], V = 0; V < P.length; V++) {
          var te = P[V], Z = te(F, z, C, $, W, r);
          if (Z == null)
            return null;
          Z.data && n(Z.data, "expectedType") && Y.push(Z.data.expectedType);
        }
        var le = Y.length > 0 ? ", expected one of type [" + Y.join(", ") + "]" : "";
        return new g("Invalid " + $ + " `" + W + "` supplied to " + ("`" + C + "`" + le + "."));
      }
      return b(D);
    }
    function _() {
      function P(T, M, D, F, z) {
        return I(T[M]) ? null : new g("Invalid " + F + " `" + z + "` supplied to " + ("`" + D + "`, expected a ReactNode."));
      }
      return b(P);
    }
    function O(P, T, M, D, F) {
      return new g(
        (P || "React class") + ": " + T + " type `" + M + "." + D + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + F + "`."
      );
    }
    function N(P) {
      function T(M, D, F, z, C) {
        var $ = M[D], W = H($);
        if (W !== "object")
          return new g("Invalid " + z + " `" + C + "` of type `" + W + "` " + ("supplied to `" + F + "`, expected `object`."));
        for (var Y in P) {
          var V = P[Y];
          if (typeof V != "function")
            return O(F, z, C, Y, U(V));
          var te = V($, Y, F, z, C + "." + Y, r);
          if (te)
            return te;
        }
        return null;
      }
      return b(T);
    }
    function k(P) {
      function T(M, D, F, z, C) {
        var $ = M[D], W = H($);
        if (W !== "object")
          return new g("Invalid " + z + " `" + C + "` of type `" + W + "` " + ("supplied to `" + F + "`, expected `object`."));
        var Y = t({}, M[D], P);
        for (var V in Y) {
          var te = P[V];
          if (n(P, V) && typeof te != "function")
            return O(F, z, C, V, U(te));
          if (!te)
            return new g(
              "Invalid " + z + " `" + C + "` key `" + V + "` supplied to `" + F + "`.\nBad object: " + JSON.stringify(M[D], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(P), null, "  ")
            );
          var Z = te($, V, F, z, C + "." + V, r);
          if (Z)
            return Z;
        }
        return null;
      }
      return b(T);
    }
    function I(P) {
      switch (typeof P) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !P;
        case "object":
          if (Array.isArray(P))
            return P.every(I);
          if (P === null || s(P))
            return !0;
          var T = c(P);
          if (T) {
            var M = T.call(P), D;
            if (T !== P.entries) {
              for (; !(D = M.next()).done; )
                if (!I(D.value))
                  return !1;
            } else
              for (; !(D = M.next()).done; ) {
                var F = D.value;
                if (F && !I(F[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function R(P, T) {
      return P === "symbol" ? !0 : T ? T["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && T instanceof Symbol : !1;
    }
    function H(P) {
      var T = typeof P;
      return Array.isArray(P) ? "array" : P instanceof RegExp ? "object" : R(T, P) ? "symbol" : T;
    }
    function U(P) {
      if (typeof P > "u" || P === null)
        return "" + P;
      var T = H(P);
      if (T === "object") {
        if (P instanceof Date)
          return "date";
        if (P instanceof RegExp)
          return "regexp";
      }
      return T;
    }
    function G(P) {
      var T = U(P);
      switch (T) {
        case "array":
        case "object":
          return "an " + T;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + T;
        default:
          return T;
      }
    }
    function q(P) {
      return !P.constructor || !P.constructor.name ? u : P.constructor.name;
    }
    return h.checkPropTypes = i, h.resetWarningCache = i.resetWarningCache, h.PropTypes = h, h;
  }, Sa;
}
var _a, yu;
function ny() {
  if (yu)
    return _a;
  yu = 1;
  var e = Ps();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, _a = function() {
    function n(o, s, l, f, d, c) {
      if (c !== e) {
        var u = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw u.name = "Invariant Violation", u;
      }
    }
    n.isRequired = n;
    function i() {
      return n;
    }
    var a = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: i,
      element: n,
      elementType: n,
      instanceOf: i,
      node: n,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: r,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, _a;
}
if (process.env.NODE_ENV !== "production") {
  var iy = Od(), ay = !0;
  To.exports = ry()(iy.isElement, ay);
} else
  To.exports = ny()();
var oy = To.exports;
const ee = /* @__PURE__ */ Tf(oy);
function bu(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Lt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? bu(Object(r), !0).forEach(function(n) {
      hr(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : bu(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Oi(e) {
  "@babel/helpers - typeof";
  return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Oi(e);
}
function hr(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function sy(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), i, a;
  for (a = 0; a < n.length; a++)
    i = n[a], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
function ly(e, t) {
  if (e == null)
    return {};
  var r = sy(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function No(e) {
  return uy(e) || cy(e) || fy(e) || dy();
}
function uy(e) {
  if (Array.isArray(e))
    return Ao(e);
}
function cy(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function fy(e, t) {
  if (e) {
    if (typeof e == "string")
      return Ao(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Ao(e, t);
  }
}
function Ao(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function dy() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function hy(e) {
  var t, r = e.beat, n = e.fade, i = e.beatFade, a = e.bounce, o = e.shake, s = e.flash, l = e.spin, f = e.spinPulse, d = e.spinReverse, c = e.pulse, u = e.fixedWidth, h = e.inverse, y = e.border, g = e.listItem, b = e.flip, v = e.size, m = e.rotation, x = e.pull, p = (t = {
    "fa-beat": r,
    "fa-fade": n,
    "fa-beat-fade": i,
    "fa-bounce": a,
    "fa-shake": o,
    "fa-flash": s,
    "fa-spin": l,
    "fa-spin-reverse": d,
    "fa-spin-pulse": f,
    "fa-pulse": c,
    "fa-fw": u,
    "fa-inverse": h,
    "fa-border": y,
    "fa-li": g,
    "fa-flip": b === !0,
    "fa-flip-horizontal": b === "horizontal" || b === "both",
    "fa-flip-vertical": b === "vertical" || b === "both"
  }, hr(t, "fa-".concat(v), typeof v < "u" && v !== null), hr(t, "fa-rotate-".concat(m), typeof m < "u" && m !== null && m !== 0), hr(t, "fa-pull-".concat(x), typeof x < "u" && x !== null), hr(t, "fa-swap-opacity", e.swapOpacity), t);
  return Object.keys(p).map(function(w) {
    return p[w] ? w : null;
  }).filter(function(w) {
    return w;
  });
}
function py(e) {
  return e = e - 0, e === e;
}
function Sd(e) {
  return py(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, function(t, r) {
    return r ? r.toUpperCase() : "";
  }), e.substr(0, 1).toLowerCase() + e.substr(1));
}
var vy = ["style"];
function gy(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function my(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, r) {
    var n = r.indexOf(":"), i = Sd(r.slice(0, n)), a = r.slice(n + 1).trim();
    return i.startsWith("webkit") ? t[gy(i)] = a : t[i] = a, t;
  }, {});
}
function _d(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof t == "string")
    return t;
  var n = (t.children || []).map(function(l) {
    return _d(e, l);
  }), i = Object.keys(t.attributes || {}).reduce(function(l, f) {
    var d = t.attributes[f];
    switch (f) {
      case "class":
        l.attrs.className = d, delete t.attributes.class;
        break;
      case "style":
        l.attrs.style = my(d);
        break;
      default:
        f.indexOf("aria-") === 0 || f.indexOf("data-") === 0 ? l.attrs[f.toLowerCase()] = d : l.attrs[Sd(f)] = d;
    }
    return l;
  }, {
    attrs: {}
  }), a = r.style, o = a === void 0 ? {} : a, s = ly(r, vy);
  return i.attrs.style = Lt(Lt({}, i.attrs.style), o), e.apply(void 0, [t.tag, Lt(Lt({}, i.attrs), s)].concat(No(n)));
}
var Td = !1;
try {
  Td = process.env.NODE_ENV === "production";
} catch {
}
function yy() {
  if (!Td && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function wu(e) {
  if (e && Oi(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (_o.icon)
    return _o.icon(e);
  if (e === null)
    return null;
  if (e && Oi(e) === "object" && e.prefix && e.iconName)
    return e;
  if (Array.isArray(e) && e.length === 2)
    return {
      prefix: e[0],
      iconName: e[1]
    };
  if (typeof e == "string")
    return {
      prefix: "fas",
      iconName: e
    };
}
function Ta(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? hr({}, e, t) : {};
}
var et = /* @__PURE__ */ Ce.forwardRef(function(e, t) {
  var r = e.icon, n = e.mask, i = e.symbol, a = e.className, o = e.title, s = e.titleId, l = e.maskId, f = wu(r), d = Ta("classes", [].concat(No(hy(e)), No(a.split(" ")))), c = Ta("transform", typeof e.transform == "string" ? _o.transform(e.transform) : e.transform), u = Ta("mask", wu(n)), h = Qm(f, Lt(Lt(Lt(Lt({}, d), c), u), {}, {
    symbol: i,
    title: o,
    titleId: s,
    maskId: l
  }));
  if (!h)
    return yy("Could not find icon", f), null;
  var y = h.abstract, g = {
    ref: t
  };
  return Object.keys(e).forEach(function(b) {
    et.defaultProps.hasOwnProperty(b) || (g[b] = e[b]);
  }), by(y[0], g);
});
et.displayName = "FontAwesomeIcon";
et.propTypes = {
  beat: ee.bool,
  border: ee.bool,
  beatFade: ee.bool,
  bounce: ee.bool,
  className: ee.string,
  fade: ee.bool,
  flash: ee.bool,
  mask: ee.oneOfType([ee.object, ee.array, ee.string]),
  maskId: ee.string,
  fixedWidth: ee.bool,
  inverse: ee.bool,
  flip: ee.oneOf([!0, !1, "horizontal", "vertical", "both"]),
  icon: ee.oneOfType([ee.object, ee.array, ee.string]),
  listItem: ee.bool,
  pull: ee.oneOf(["right", "left"]),
  pulse: ee.bool,
  rotation: ee.oneOf([0, 90, 180, 270]),
  shake: ee.bool,
  size: ee.oneOf(["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"]),
  spin: ee.bool,
  spinPulse: ee.bool,
  spinReverse: ee.bool,
  symbol: ee.oneOfType([ee.bool, ee.string]),
  title: ee.string,
  titleId: ee.string,
  transform: ee.oneOfType([ee.string, ee.object]),
  swapOpacity: ee.bool
};
et.defaultProps = {
  border: !1,
  className: "",
  mask: null,
  maskId: null,
  fixedWidth: !1,
  inverse: !1,
  flip: !1,
  icon: null,
  listItem: !1,
  pull: null,
  pulse: !1,
  rotation: null,
  size: null,
  spin: !1,
  spinPulse: !1,
  spinReverse: !1,
  beat: !1,
  fade: !1,
  beatFade: !1,
  bounce: !1,
  shake: !1,
  symbol: !1,
  title: "",
  titleId: null,
  transform: null,
  swapOpacity: !1
};
var by = _d.bind(null, Ce.createElement);
const wy = ({ errors: e }) => {
  var r, n, i, a, o, s, l, f, d;
  let t = "";
  return (e.password_register && e.password_register.types || e.new_password && e.new_password.types) && (e.password_register && ((n = (r = e == null ? void 0 : e.password_register) == null ? void 0 : r.types) != null && n.matches) ? t = t + e.password_register.types.matches : e.new_password && ((a = (i = e == null ? void 0 : e.new_password) == null ? void 0 : i.types) != null && a.matches) && (t = t + e.new_password.types.matches), e.password_register && ((s = (o = e == null ? void 0 : e.password_register) == null ? void 0 : o.types) != null && s.min) ? t = t + e.password_register.types.min : e.new_password && ((f = (l = e == null ? void 0 : e.new_password) == null ? void 0 : l.types) != null && f.min) && (t = t + ((d = e == null ? void 0 : e.new_password.types) == null ? void 0 : d.min))), /* @__PURE__ */ L.jsxs("div", { className: "text-xs mb-4 mt-4", children: [
    "t('password_req')",
    /* @__PURE__ */ L.jsxs("ul", { className: "ml-2", children: [
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_length')") ? /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_min_char')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_uppercase')") ? /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_uppercase')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_lowercase')") ? /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_lowercase')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_number')") ? /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_number')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_special_char')") ? /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(et, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_special_char'): ^ $ * . [ ] { } ( ) ? \" ! @ # % & , > < ' : ; _ ~  ` \\ |"
      ] })
    ] })
  ] });
};
var Nd = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, xu = Ce.createContext && Ce.createContext(Nd), Mt = globalThis && globalThis.__assign || function() {
  return Mt = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, Mt.apply(this, arguments);
}, xy = globalThis && globalThis.__rest || function(e, t) {
  var r = {};
  for (var n in e)
    Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
      t.indexOf(n[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[i]) && (r[n[i]] = e[n[i]]);
  return r;
};
function Ad(e) {
  return e && e.map(function(t, r) {
    return Ce.createElement(t.tag, Mt({
      key: r
    }, t.attr), Ad(t.child));
  });
}
function ze(e) {
  return function(t) {
    return Ce.createElement(Oy, Mt({
      attr: Mt({}, e.attr)
    }, t), Ad(e.child));
  };
}
function Oy(e) {
  var t = function(r) {
    var n = e.attr, i = e.size, a = e.title, o = xy(e, ["attr", "size", "title"]), s = i || r.size || "1em", l;
    return r.className && (l = r.className), e.className && (l = (l ? l + " " : "") + e.className), Ce.createElement("svg", Mt({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, r.attr, n, o, {
      className: l,
      style: Mt(Mt({
        color: e.color || r.color
      }, r.style), e.style),
      height: s,
      width: s,
      xmlns: "http://www.w3.org/2000/svg"
    }), a && Ce.createElement("title", null, a), e.children);
  };
  return xu !== void 0 ? Ce.createElement(xu.Consumer, null, function(r) {
    return t(r);
  }) : t(Nd);
}
function Ey(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" } }] })(e);
}
function Sy(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" } }] })(e);
}
function _y(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" } }] })(e);
}
function Ty(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" } }] })(e);
}
function Ny(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 640 512" }, child: [{ tag: "path", attr: { d: "M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" } }] })(e);
}
function Ay(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" } }] })(e);
}
function lr(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 384 512" }, child: [{ tag: "path", attr: { d: "M384 121.941V128H256V0h6.059a24 24 0 0 1 16.97 7.029l97.941 97.941a24.002 24.002 0 0 1 7.03 16.971zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zm-135.455 16c26.51 0 48 21.49 48 48s-21.49 48-48 48-48-21.49-48-48 21.491-48 48-48zm208 240h-256l.485-48.485L104.545 328c4.686-4.686 11.799-4.201 16.485.485L160.545 368 264.06 264.485c4.686-4.686 12.284-4.686 16.971 0L320.545 304v112z" } }] })(e);
}
function ky(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 384 512" }, child: [{ tag: "path", attr: { d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" } }] })(e);
}
function kd(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" } }] })(e);
}
function jy(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" } }] })(e);
}
function Py(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" } }] })(e);
}
function Cy(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" } }] })(e);
}
function Cs(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 352 512" }, child: [{ tag: "path", attr: { d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" } }] })(e);
}
function Ou(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" } }] })(e);
}
function Na(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" } }] })(e);
}
function Eu(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 384 512" }, child: [{ tag: "path", attr: { d: "M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" } }] })(e);
}
const lA = ({
  reference: e,
  error: t,
  label: r,
  placeholder: n,
  type: i,
  maxLength: a = 255,
  required: o = !1,
  ...s
}) => {
  const [l, f] = Ke(i || "text");
  return /* @__PURE__ */ L.jsxs("div", { className: "w-full", children: [
    r && /* @__PURE__ */ L.jsxs(
      "label",
      {
        htmlFor: r,
        className: "block mb-1 text-left text-xs font-medium flex",
        children: [
          r,
          " ",
          o && /* @__PURE__ */ L.jsx("span", { className: "text-red inline-block mx-1", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ L.jsx(
      "input",
      {
        ...e,
        ...s,
        type: l,
        maxLength: a,
        placeholder: n,
        required: o,
        className: "shadow-soft-white border border-gray-lines focus:border-main bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-2xl placeholder-gray cursor-pointer transition-all duration-200 outline-none hover:border-main hover:outline-none hover:shadow-inner focus:outline-none focus:shadow-focus active:outline-none"
      }
    ),
    i === "password" && /* @__PURE__ */ L.jsxs("div", { className: "relative flex justify-end mr-4 bottom-9 md:bottom-12", children: [
      l === "password" && /* @__PURE__ */ L.jsx(
        Ay,
        {
          onClick: () => f("text"),
          className: "cursor-pointer text-main text-sm z-20"
        }
      ),
      l !== "password" && /* @__PURE__ */ L.jsx(
        Ny,
        {
          onClick: () => f("password"),
          className: "cursor-pointer text-main text-sm z-20"
        }
      )
    ] }),
    t && ((t == null ? void 0 : t.password_register) || (t == null ? void 0 : t.new_password)) && /* @__PURE__ */ L.jsx(wy, { errors: t }),
    t && /* @__PURE__ */ L.jsx("div", { className: "text-red relative left-2 -top-3 text-xxs text-left", children: t.message })
  ] });
};
function uA() {
  return /* @__PURE__ */ L.jsx("div", { className: "sm:w-3/4 bottom-0 | sm:pb-2 | text-center border-t border-gray-lines", children: /* @__PURE__ */ L.jsx("span", { className: "block left-0 | text-gray font-normal text-xxs", children: "t('powered_by_kiota')" }) });
}
function cA() {
  const e = /* @__PURE__ */ L.jsxs(
    "svg",
    {
      id: "loading-spinner",
      width: "192",
      height: "193",
      viewBox: "-5 0 278 270",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ L.jsx(
          "path",
          {
            id: "path-one",
            d: "M15.3283 0H0V272.708H15.3283V0Z",
            stroke: "white",
            strokeWidth: "3"
          }
        ),
        /* @__PURE__ */ L.jsx(
          "path",
          {
            id: "path-two",
            d: "M150.271 150.57L85.0244 215.817L141.875 272.653H158.709L215.206 216.156L215.572 215.789L150.271 150.57ZM150.705 264.053L102.482 215.844L150.271 168.055L198.426 216.224L150.705 264.053Z",
            stroke: "#3C5DA3",
            strokeWidth: "3"
          }
        ),
        /* @__PURE__ */ L.jsx(
          "path",
          {
            id: "path-three",
            d: "M150.271 37.6017L85.0244 102.849L150.271 168.095L215.152 103.215L215.518 102.849L150.271 37.6017ZM150.271 150.638L102.482 102.849L150.271 55.0597L198.047 102.849L150.271 150.638Z",
            stroke: "#3C5DA3",
            strokeWidth: "3"
          }
        ),
        /* @__PURE__ */ L.jsx(
          "path",
          {
            id: "path-four",
            d: "M207.094 207.447L141.983 272.708L271.717 272.273L207.094 207.447ZM171.731 260.35L207.094 224.905L242.214 260.174L171.731 260.35Z",
            stroke: "#67A7DE",
            strokeWidth: "3"
          }
        ),
        /* @__PURE__ */ L.jsx(
          "path",
          {
            id: "path-five",
            d: "M93.5975 94.0586L28.3506 159.305L93.5975 224.539L158.478 159.658L158.844 159.305L93.5975 94.0586ZM141.386 159.305L93.5975 207.094L45.8492 159.305L93.5975 111.503L141.386 159.305Z",
            stroke: "white",
            strokeWidth: "3"
          }
        ),
        /* @__PURE__ */ L.jsx(
          "path",
          {
            id: "path-six",
            d: "M182.895 13.5648C178.611 9.28067 173.524 5.88228 167.927 3.5637C162.329 1.24512 156.33 0.0517655 150.271 0.0517654C144.213 0.0517654 138.213 1.24512 132.616 3.5637C127.018 5.88228 121.932 9.28067 117.648 13.5648C113.364 17.849 109.965 22.9351 107.647 28.5326C105.328 34.1301 104.135 40.1295 104.135 46.1883C104.135 52.247 105.328 58.2464 107.647 63.844C109.965 69.4415 113.364 74.5275 117.648 78.8117C126.3 87.464 138.035 92.3248 150.271 92.3248C162.507 92.3248 174.242 87.464 182.895 78.8117C191.547 70.1594 196.408 58.4244 196.408 46.1883C196.408 33.9521 191.547 22.2171 182.895 13.5648V13.5648ZM174.159 70.076C169.432 74.8058 163.409 78.0276 156.851 79.3338C150.293 80.6401 143.495 79.972 137.317 77.4142C131.139 74.8564 125.858 70.5237 122.143 64.9642C118.428 59.4047 116.444 52.8682 116.444 46.1815C116.444 39.4948 118.428 32.9583 122.143 27.3988C125.858 21.8393 131.139 17.5066 137.317 14.9488C143.495 12.391 150.293 11.7229 156.851 13.0292C163.409 14.3354 169.432 17.5572 174.159 22.287C180.495 28.6304 184.054 37.2294 184.054 46.1951C184.054 55.1607 180.495 63.7597 174.159 70.1031V70.076Z",
            stroke: "#67A7DE",
            strokeWidth: "3"
          }
        )
      ]
    }
  );
  return Di.createPortal(
    /* @__PURE__ */ L.jsx(
      "div",
      {
        className: "bg-gray-opacity h-screen fixed top-0 right-0 z-50",
        id: "spinner",
        children: e
      }
    ),
    document.body
  );
}
const fA = ({
  title: e,
  showBack: t = !1,
  onBackClick: r,
  removeMargin: n = !1
}) => /* @__PURE__ */ L.jsx("div", { className: "flex", children: /* @__PURE__ */ L.jsxs("div", { className: `text-3xl text-main font-bold ${n ? "" : "mb-4"}`, children: [
  t && /* @__PURE__ */ L.jsx(
    Ey,
    {
      className: "inline-block mr-3 cursor-pointer",
      onClick: r
    }
  ),
  e
] }) }), dA = ({
  id: e,
  title: t,
  children: r,
  padding: n = "10",
  movilePadding: i = "4",
  marginX: a = "0",
  movileMarginX: o = "0",
  movileMarginY: s = "0",
  marginY: l = "0",
  marginYB: f,
  width: d = "full",
  rounded: c = "2xl",
  startupsList: u = !1,
  clickable: h = !1,
  onClick: y,
  wrapperClassName: g = "",
  containerClassName: b = "",
  bgColor: v = "bg-white",
  ...m
}) => {
  const x = `${b} rounded-${c} w-full p-${i} sm:p-${n} ${(u || h) && "hover:shadow-inner"}`;
  return /* @__PURE__ */ L.jsx(
    "div",
    {
      id: e,
      onClick: y,
      className: `
        ${g} ${v} rounded-${c}
        w-${d} px-${o} py-${s} sm:px-${a} 
        sm:py-${l} pb-${f} ${h && "cursor-pointer"} 
      `,
      children: /* @__PURE__ */ L.jsxs("div", { className: x, ...m, children: [
        t && /* @__PURE__ */ L.jsx("h2", { className: "font-semibold mb-4", children: t }),
        r
      ] })
    }
  );
}, Iy = ({
  onClick: e,
  type: t,
  marginRight: r = "0",
  marginLeft: n = "0",
  marginTop: i = "0",
  icon: a,
  width: o = "auto",
  iconComponent: s,
  text: l,
  disabled: f
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: f,
    className: `text-center block w-${o} mr-${r} ml-${n} py-2 px-4 mt-${i}
          text-xs font-semibold text-text-buttons-secondary placeholder-gray bg-bg-buttons-secondary rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out border border-border-buttons-secondary
          hover:bg-buttons-secondary-hover hover:text-buttons-secondary hover:shadow-hover
          focus:outline-none hover:shadow-inner`,
    children: [
      a && /* @__PURE__ */ L.jsx("img", { src: a, alt: "Icon", className: "inline | mr-2 | w-auto" }),
      s && s,
      l
    ]
  }
), Ly = ({
  onClick: e,
  type: t,
  marginRight: r = "0",
  marginLeft: n = "0",
  marginTop: i = "0",
  icon: a,
  width: o = "auto",
  iconComponent: s,
  text: l,
  disabled: f
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: f,
    className: `text-center block w-${o} mr-${r} ml-${n} py-2 px-4 mt-${i}
          text-xs font-semibold text-red placeholder-gray border-red rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out border 
          hover:shadow-hover focus:outline-none hover:shadow-inner`,
    children: [
      a && /* @__PURE__ */ L.jsx("img", { src: a, alt: "Icon", className: "inline | mr-2 | w-auto" }),
      s && s,
      l
    ]
  }
), hA = ({
  headers: e = [],
  data: t = [],
  actions: r = [],
  compact: n = !1,
  bordered: i = !1,
  stickyHeader: a = !0,
  stickyActions: o = !0,
  wrapperClassName: s = "",
  actionsHeaderClassName: l = ""
}) => {
  const f = n ? "px-3 py-2" : "px-6 py-4", [d, c] = Ke(100), u = Re((p) => {
    if (!p)
      return;
    const w = p.querySelectorAll(".data-grid-actions");
    let S = 0;
    w.forEach((E) => {
      const A = E.getBoundingClientRect().width;
      A > S && (S = A);
    }), c(S);
  }, []), [h, y] = Ke(!1), [g, b] = Ke(!1), v = Ie(null), m = Ie(null), x = new IntersectionObserver((p) => {
    y(!p[0].isIntersecting);
  });
  return Me(() => (x.disconnect(), v.current && x.observe(v.current), () => {
    x.disconnect();
  }), [v.current]), Me(() => {
    const p = () => {
      if (v.current) {
        const w = m.current.scrollWidth - m.current.clientWidth - 5;
        b(m.current.scrollLeft < w);
      }
    };
    return m.current.addEventListener("scroll", p), p(), () => {
    };
  }, [m]), /* @__PURE__ */ L.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ L.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ L.jsx("div", { className: "inline-block w-full", children: /* @__PURE__ */ L.jsx("div", { className: `overflow-auto ${s}`, ref: m, children: /* @__PURE__ */ L.jsxs(
    "table",
    {
      style: { borderSpacing: 0 },
      className: "relative min-w-full",
      ref: u,
      children: [
        /* @__PURE__ */ L.jsx("thead", { className: "bg-white border-b", children: /* @__PURE__ */ L.jsxs("tr", { ref: v, children: [
          e.filter((p) => p.show ? p.show(p) : !0).map((p) => /* @__PURE__ */ L.jsx(
            "th",
            {
              scope: "col",
              className: `${f} 
                        ${a ? "sticky top-0" : ""}
                        ${p.columnClassName} 
                        ${p.headerClassName ? p.headerClassName : "text-main text-sm font-medium text-left bg-white"} 
                        ${i ? "border border-gray-lines" : ""}
                        ${h ? "shadow-basic" : ""}`,
              children: p.title
            },
            p.key
          )),
          !!(r && r.length) && /* @__PURE__ */ L.jsx(
            "th",
            {
              scope: "col",
              style: { width: d },
              className: `${f} 
                        ${o ? "sticky top-0 right-0" : ""} 
                        bg-white relative z-10 
                        ${h ? "shadow-basic" : ""}
                        ${i ? "border-l border-b border-gray-lines" : ""}
                        ${l}`,
              children: " "
            }
          )
        ] }) }),
        /* @__PURE__ */ L.jsx("tbody", { children: t.map((p) => /* @__PURE__ */ L.jsxs(
          "tr",
          {
            className: "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100",
            children: [
              e.filter((w) => w.show ? w.show(w) : !0).map((w) => /* @__PURE__ */ L.jsx(
                "td",
                {
                  className: `${f} 
                        whitespace-nowrap text-sm font-medium 
                        ${w.columnClassName} 
                        ${p.rowClassName} 
                        ${i ? "border border-gray-lines" : ""}`,
                  children: w.render ? w.render(w.key, p) : p[w.key]
                },
                w.key
              )),
              !!(r && r.length) && /* @__PURE__ */ L.jsx(
                "td",
                {
                  style: { width: d },
                  className: `${f} 
                          bg-white whitespace-nowrap text-sm font-medium 
                          ${o ? "sticky top-0 right-0" : ""} 
                          ${i ? "border border-gray-lines" : ""} 
                          ${g ? "shadow-basic" : ""}`,
                  children: /* @__PURE__ */ L.jsx("div", { className: "flex flex-row justify-end items-end data-grid-actions", children: r.filter((w) => w.show ? w.show(p) : !0).map((w) => /* @__PURE__ */ L.jsx(
                    "div",
                    {
                      className: "mr-1",
                      "data-tip": w.tip,
                      children: w.id === "delete" ? /* @__PURE__ */ L.jsx(
                        Ly,
                        {
                          ...w.buttonProps,
                          onClick: () => {
                            w.onClick && w.onClick(p);
                          }
                        }
                      ) : /* @__PURE__ */ L.jsx(
                        Iy,
                        {
                          ...w.buttonProps,
                          onClick: () => {
                            w.onClick && w.onClick(p);
                          }
                        }
                      )
                    },
                    w.id
                  )) })
                }
              )
            ]
          },
          p.id
        )) })
      ]
    }
  ) }) }) }) });
}, Su = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjE3NSAtNi40MjYzOGUtMDhMNSAzLjg2NjI0TDguODI1IC02LjQyNjM4ZS0wOEwxMCAxLjE5NjA5TDUgNi4yNUwwIDEuMTk2MDlMMS4xNzUgLTYuNDI2MzhlLTA4WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==", _u = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik04LjgyNSA2LjI1TDUgMi4zODM3NkwxLjE3NSA2LjI1TDIuMzg0MTllLTA3IDUuMDUzOTFMNSAtNS40NzI3ZS0wOEwxMCA1LjA1MzkxTDguODI1IDYuMjVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K", My = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjgxMzMyIDcuMjQ3OUMzLjU4OTMyIDcuMjQ3OSAzLjM2NTMyIDcuMTYyOSAzLjE5NDMyIDYuOTkxOUwwLjgyMTMxOSA0LjYxODlDMC40NzkzMTkgNC4yNzY5IDAuNDc5MzE5IDMuNzIyOSAwLjgyMTMxOSAzLjM4MTlDMS4xNjMzMiAzLjAzOTkgMS43MTYzMiAzLjAzODkgMi4wNTgzMiAzLjM4MDlMMy44MTMzMiA1LjEzNTlMNy45NDEzMiAxLjAwNzlDOC4yODMzMiAwLjY2NTkwNCA4LjgzNjMyIDAuNjY1OTA0IDkuMTc4MzIgMS4wMDc5QzkuNTIwMzIgMS4zNDk5IDkuNTIwMzIgMS45MDM5IDkuMTc4MzIgMi4yNDU5TDQuNDMyMzIgNi45OTE5QzQuMjYxMzIgNy4xNjI5IDQuMDM3MzIgNy4yNDc5IDMuODEzMzIgNy4yNDc5WiIgZmlsbD0iIzEzMEYyNiIvPgo8L3N2Zz4K", Tu = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0IDI0TDEwIDI4TDYgMjQiIHN0cm9rZT0iIzRENzBCMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwIDRWMjgiIHN0cm9rZT0iIzRENzBCMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE4IDhMMjIgNEwyNiA4IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMiAyOFY0IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=", jd = ({
  label: e,
  placeholder: t,
  reset: r = !1,
  setReset: n,
  items: i = [],
  multiSelect: a = !1,
  error: o,
  initialValues: s = [],
  onSelect: l,
  sort: f,
  required: d = !1,
  className: c = "",
  disabled: u = !1,
  isClearable: h = !0,
  showQuantity: y = !0,
  noOptionsText: g
}) => {
  const { t: b } = er(), [v, m] = Ke(!1), [x, p] = Ke(s), w = (O) => {
    let N = [];
    if (!x.some((k) => k.id === O.id))
      a ? a && (N = [...x, O]) : N = [O];
    else {
      let k = x;
      if (k.length === 1 && !a)
        return;
      k = k.filter((I) => I.id !== O.id), N = [...k];
    }
    p(N), l && l(N), a || m(!v);
  }, S = (O) => x.some((N) => N.id === O.id), E = () => {
    p([]), l && l([]);
  }, A = () => (x == null ? void 0 : x.length) > 0, j = () => {
    if (s.length === 0)
      return !1;
    if (x.length !== s.length)
      return !0;
    for (let O = 0; O < x.length; O++)
      if (x[O].id !== s[O].id)
        return !0;
    return !1;
  }, _ = () => t && t !== "" ? /* @__PURE__ */ L.jsx("span", { className: "text-placeholder-gray", children: t }) : /* @__PURE__ */ L.jsx("span", { className: "text-placeholder-gray", children: b(a ? "select_multi_default_placeholder" : "select_default_placeholder") });
  return Me(() => {
    r && (E(), n && n(!1));
  }, [r]), Me(() => {
    s.length ? j() && p(s) : p(s);
  }, [s]), /* @__PURE__ */ L.jsxs("div", { className: c, children: [
    /* @__PURE__ */ L.jsxs(
      "div",
      {
        className: "mb-2 sm:mb-5 sm:w-auto outline:none focus:outline-none",
        onClick: () => !u && m(!v),
        children: [
          /* @__PURE__ */ L.jsxs("label", { className: "block mb-1 text-left text-xs font-medium text-black", children: [
            e,
            d && /* @__PURE__ */ L.jsx("span", { className: "text-red", children: " *" }),
            a && y && A() && /* @__PURE__ */ L.jsxs("span", { children: [
              " (",
              x.length,
              ")"
            ] }),
            A() && h && /* @__PURE__ */ L.jsx(
              "span",
              {
                "data-tip": b("reset"),
                className: "hover:underline text-main relative -top-[1px]",
                onClick: (O) => {
                  O.stopPropagation(), E();
                },
                children: /* @__PURE__ */ L.jsx(Cs, { className: "cursor-pointer inline-block ml-1" })
              }
            )
          ] }),
          /* @__PURE__ */ L.jsx(
            "div",
            {
              className: `border border-gray-lines bg-white w-full py-2 sm:py-3 px-7 relative z-1s0 text-left text-xs 
            font-normal rounded-2xl placeholder-gray ${!u && `shadow-soft-white 
            hover:border-main hover:outline-none hover:shadow-focus focus:outline-none 
            focus:shadow-focus active:outline-none active:shadow-focus`} cursor-pointer transition-all  
            duration-500 outline-none ${u && "shadow-inner"} ${v && "shadow-inner"}`,
              children: /* @__PURE__ */ L.jsxs("div", { children: [
                v && /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                  f && /* @__PURE__ */ L.jsx(L.Fragment, { children: /* @__PURE__ */ L.jsxs("div", { className: "flex justify-between items-center bg-white", children: [
                    /* @__PURE__ */ L.jsxs("div", { className: "flex", children: [
                      /* @__PURE__ */ L.jsx("img", { src: Tu, alt: "Arrow down", className: "w-4 mr-1" }),
                      /* @__PURE__ */ L.jsx("p", { className: "text-xs hidden sm:block", children: a ? _() : x.length ? x[0].value : _() })
                    ] }),
                    /* @__PURE__ */ L.jsx("img", { src: _u, alt: "Arrow up", className: "pl-8" })
                  ] }) }),
                  !f && /* @__PURE__ */ L.jsx(L.Fragment, { children: /* @__PURE__ */ L.jsxs("div", { className: "flex justify-between items-center bg-white", children: [
                    /* @__PURE__ */ L.jsxs("div", { className: "flex text-xs", children: [
                      !a && x.length > 0 && x[0].image && /* @__PURE__ */ L.jsx("span", { className: "mr-2", children: x[0].image }),
                      /* @__PURE__ */ L.jsx("span", { children: a ? _() : x.length ? x[0].value : _() })
                    ] }),
                    /* @__PURE__ */ L.jsx("img", { src: _u, alt: "Arrow up", className: "pl-8" })
                  ] }) })
                ] }),
                !v && /* @__PURE__ */ L.jsx("div", { className: "flex justify-between bg-white", children: f ? /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                  /* @__PURE__ */ L.jsxs("div", { className: "flex", children: [
                    /* @__PURE__ */ L.jsx("img", { src: Tu, alt: "Arrow down", className: "w-4 mr-1" }),
                    /* @__PURE__ */ L.jsx("p", { className: "text-xs hidden sm:block", children: a ? _() : x.length ? x[0].value : _() })
                  ] }),
                  /* @__PURE__ */ L.jsx("img", { src: Su, alt: "Arrow down", className: "pl-8" })
                ] }) : /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                  /* @__PURE__ */ L.jsx("div", { className: "flex text-xs bg-white", children: /* @__PURE__ */ L.jsx("span", { children: a ? _() : x.length ? x[0].value : _() }) }),
                  /* @__PURE__ */ L.jsx("img", { src: Su, alt: "Arrow down", className: "pl-8" })
                ] }) })
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ L.jsx("div", { className: "relative w-full bg-white", children: v && /* @__PURE__ */ L.jsxs(
      "ul",
      {
        className: `max-h-60 overflow-y-auto bg-white w-full 
              border border-gray-lines -mt-4 mb-4 py-2 sm:py-3 px-4 absolute z-20 
              text-left text-xs font-normal rounded-xl placeholder-gray shadow-soft-white 
              cursor-pointer transition-all duration-200 outline-none hover:outline-none 
              focus:outline-none focus:shadow-focus active:outline-none shadow-hover`,
        children: [
          !i.length && /* @__PURE__ */ L.jsx("li", { className: "py-1 px-3", children: /* @__PURE__ */ L.jsx("span", { className: "text-gray", children: g || b("no_options") }) }),
          i.map((O) => /* @__PURE__ */ L.jsxs(
            "li",
            {
              className: `py-1 border-b hover:text-main 
                  ${O.disabled ? "bg-white" : null} 
                  ${S(O) ? "text-main" : null}`,
              children: [
                O.disabled && /* @__PURE__ */ L.jsx("span", { className: "text-gray", children: O.value }),
                !O.disabled && /* @__PURE__ */ L.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => O.disabled ? null : w(O),
                    className: "w-full bg-white flex items-center gap-3 text-left outline:none focus:outline-none",
                    children: [
                      /* @__PURE__ */ L.jsx("span", { className: "w-2", children: S(O) && /* @__PURE__ */ L.jsx("img", { src: My, alt: "Tick icon" }) }),
                      /* @__PURE__ */ L.jsxs("div", { className: "flex", children: [
                        O.image && /* @__PURE__ */ L.jsx("span", { className: "mr-2", children: O.image }),
                        /* @__PURE__ */ L.jsx("span", { children: O.value })
                      ] })
                    ]
                  }
                )
              ]
            },
            O.id
          ))
        ]
      }
    ) }),
    o && /* @__PURE__ */ L.jsx("div", { className: "text-red relative -top-3 left-2 text-xxs", children: o.message })
  ] });
}, pA = ({
  showRowsPerPage: e = !1,
  currentPage: t,
  setCurrentPage: r,
  perPage: n,
  setPerPage: i,
  pages: a,
  maxPaginationNumbers: o,
  paginateOptions: s = [10, 25, 50]
}) => {
  const { t: l } = er(), [f, d] = Ke([1, 2, 3, 4, 5]), c = (h) => t - Math.floor(h / 2) <= 0 || a < h ? 0 : t + Math.floor(h / 2) >= a ? a - h : t - Math.floor(h / 2), u = (h) => {
    h === "next" && t < a - 1 ? r(t + 1) : h === "prev" && t >= 0 && r(t - 1);
  };
  return Me(() => {
    const h = o || 5, y = a < h ? a : h, g = c(y) + 1, b = [];
    for (let v = g; v < g + y; v++)
      b.push(v);
    return d(b), () => {
      d([]);
    };
  }, [a, t]), /* @__PURE__ */ L.jsxs("div", { className: "relative top-0 left-0 pb-3 pt-6 flex items-center justify-between rounded-b-2xl lg:static w-auto", children: [
    /* @__PURE__ */ L.jsxs("div", { className: "flex-1 flex justify-between sm:hidden", children: [
      /* @__PURE__ */ L.jsx(
        "button",
        {
          disabled: t === 0,
          onClick: () => u("prev"),
          className: `
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t === 0 ? "opacity-50 cursor-not-allowed" : ""}
              `,
          children: /* @__PURE__ */ L.jsx("span", { children: l("previous") })
        }
      ),
      /* @__PURE__ */ L.jsx(
        "button",
        {
          disabled: t === a - 1,
          onClick: () => u("next"),
          className: `
            bg-transparence-blue hover:shadow-inner ml-4  
            inline-flex items-center p-2 rounded-xl text-main
            text-sm font-medium cursor-pointer outline-none focus:outline-none
            ${t === a - 1 ? "opacity-50 cursor-not-allowed" : ""}
          `,
          children: /* @__PURE__ */ L.jsx("span", { children: l("next") })
        }
      )
    ] }),
    /* @__PURE__ */ L.jsxs("div", { className: `hidden sm:flex-1 sm:flex sm:items-center ${e ? "sm:justify-between" : "sm:justify-end"}`, children: [
      e && /* @__PURE__ */ L.jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ L.jsx(
        jd,
        {
          items: s.map((h) => ({ id: h, value: h })),
          initialValues: [{ id: n, value: n }],
          onSelect: i,
          isClearable: !1,
          className: "mt-4"
        }
      ) }),
      /* @__PURE__ */ L.jsxs("nav", { className: "relative z-0 inline-flex rounded-md shadow-sm", "aria-label": "Pagination", children: [
        /* @__PURE__ */ L.jsx(
          "button",
          {
            disabled: t === 0,
            onClick: () => u("prev"),
            className: `
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t === 0 ? "opacity-50 cursor-not-allowed" : ""}
              `,
            children: /* @__PURE__ */ L.jsx("span", { children: l("previous") })
          }
        ),
        f.map((h) => /* @__PURE__ */ L.jsxs("span", { children: [
          t + 1 === h && /* @__PURE__ */ L.jsx("button", { className: "mx-1 px-4 py-2 text-sm font-medium rounded-xl shadow-inner hover:shadow-inner bg-main text-white", children: h }),
          t + 1 !== h && /* @__PURE__ */ L.jsx(
            "button",
            {
              onClick: () => r(h - 1),
              className: "mx-1 px-4 py-2 text-sm font-medium text-mainrounded-xl bg-transparence-blue hover:text-mainhover:shadow-inner",
              children: h
            }
          )
        ] }, h)),
        /* @__PURE__ */ L.jsx(
          "button",
          {
            disabled: t === a - 1,
            onClick: () => u("next"),
            className: `
                bg-transparence-blue hover:shadow-inner ml-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t === a - 1 ? "opacity-50 cursor-not-allowed" : ""}
              `,
            children: /* @__PURE__ */ L.jsx("span", { children: l("next") })
          }
        )
      ] })
    ] })
  ] });
}, vA = ({ children: e }) => /* @__PURE__ */ L.jsx(
  "div",
  {
    style: { zIndex: 99 },
    className: "absolute top-0 right-0 flex justify-end box-border max-h-full w-full overflow-x-hidden overflow-y-auto",
    children: e
  }
), gA = ({ children: e, onDismiss: t, appearance: r = "error" }) => {
  const n = {
    error: "bg-red",
    success: "bg-green",
    alert: "bg-main"
  };
  return /* @__PURE__ */ L.jsxs(
    "div",
    {
      onClick: t,
      className: `${n[r]} text-white font-semibold flex items-center justify-start w-72 text-white shadow-basic rounded-2xl cursor-pointer text-xs font-normal m-4 p-4`,
      children: [
        r === "success" && /* @__PURE__ */ L.jsx(Sy, { className: "mr-2 inline-block text-sm w-12" }),
        r === "error" && /* @__PURE__ */ L.jsx(Cy, { className: "mr-2 inline-block text-sm w-12" }),
        r === "alert" && /* @__PURE__ */ L.jsx(kd, { className: "mr-2 inline-block text-sm w-12" }),
        /* @__PURE__ */ L.jsx("span", { children: e })
      ]
    }
  );
};
var Dy = process.env.NODE_ENV === "production";
function ko(e, t) {
  if (!Dy) {
    if (e)
      return;
    var r = "Warning: " + t;
    typeof console < "u" && console.warn(r);
    try {
      throw Error(r);
    } catch {
    }
  }
}
function Nu(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Vi(e, t, r) {
  return t && Nu(e.prototype, t), r && Nu(e, r), e;
}
function Xe() {
  return Xe = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xe.apply(this, arguments);
}
function Ry(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, jo(e, t);
}
function jo(e, t) {
  return jo = Object.setPrototypeOf || function(n, i) {
    return n.__proto__ = i, n;
  }, jo(e, t);
}
function $y(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), i, a;
  for (a = 0; a < n.length; a++)
    i = n[a], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
function zy(e, t) {
  if (e) {
    if (typeof e == "string")
      return Au(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Au(e, t);
  }
}
function Au(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Sr(e, t) {
  var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r)
    return (r = r.call(e)).next.bind(r);
  if (Array.isArray(e) || (r = zy(e)) || t && e && typeof e.length == "number") {
    r && (e = r);
    var n = 0;
    return function() {
      return n >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[n++]
      };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function ku(e) {
  var t = Ie(null);
  function r(n) {
    !n || n === t.current || (t.current = n, e(n));
  }
  return r;
}
function Fy(e) {
  var t = Ie(e);
  return Et(function() {
    function r(i) {
      typeof i == "function" ? t.current = i(t.current) : t.current = i;
    }
    function n() {
      return t.current;
    }
    return [n, r];
  }, []);
}
function By() {
  var e = Ie([]);
  return Et(function() {
    function t() {
      return e.current.length > 0;
    }
    function r() {
      for (var i = Sr(e.current), a; !(a = i()).done; ) {
        var o = a.value;
        o();
      }
      e.current = [];
    }
    function n(i) {
      e.current.push(i);
    }
    return {
      hasEventSubscriptions: t,
      removeAllEventSubscriptions: r,
      addEventSubscription: n
    };
  }, []);
}
var Aa = typeof window < "u" ? xp : Me;
function qy(e, t) {
  var r = Ie(e);
  return t ? (r.current = e, r) : (r.current = null, r);
}
function hn(e) {
  return parseFloat(e.replace("px", ""));
}
function Po(e, t, r) {
  return e < t ? t : e > r ? r : e;
}
function ju(e) {
  return e != null;
}
function Pu() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    for (var i = Sr(t), a; !(a = i()).done; ) {
      var o = a.value;
      o && (typeof o == "function" ? o(n) : o.current = n);
    }
  };
}
function Uy(e, t) {
  if (!(typeof e > "u"))
    return t || e.ResizeObserver;
}
function Pd(e, t) {
  var r = [];
  if (!e || !t || e === document.body)
    return r;
  var n = t.getComputedStyle(e), i = n.overflow, a = n.overflowX, o = n.overflowY;
  return [i, a, o].some(function(s) {
    return ["auto", "scroll"].includes(s);
  }) && r.push(e), [].concat(r, Pd(e.parentElement, t));
}
function $n(e) {
  return "react-laag: Could not find a valid reference for the " + e + ` element. There might be 2 causes:
   - Make sure that the 'ref' is set correctly on the ` + e + ` element when isOpen: true. Also make sure your component forwards the ref with "forwardRef()".
   - Make sure that you are actually rendering the ` + e + " when the isOpen prop is set to true";
}
function Hy(e) {
  var t = e.enabled, r = e.onChange, n = e.environment, i = e.ResizeObserverPolyfill, a = e.overflowContainer, o = e.triggerOption, s = Uy(n, i);
  Me(function() {
    process.env.NODE_ENV !== "production" && ko(s, "This browser does not support ResizeObserver out of the box. We recommend to add a polyfill in order to utilize the full capabilities of react-laag. See: https://github.com/everweij/react-laag#resize-observer");
  }, [s]);
  var l = Ie(null), f = !!o, d = Fy({
    scrollContainers: [],
    trigger: null,
    layer: null
  }), c = d[0], u = d[1], h = By(), y = h.hasEventSubscriptions, g = h.addEventSubscription, b = h.removeAllEventSubscriptions, v = Re(function() {
    var j = c(), _ = j.layer, O = j.trigger, N = j.scrollContainers, k = N[0];
    if (!_)
      throw new Error($n("layer"));
    if (!O && !f)
      throw new Error($n("trigger"));
    var I = {
      top: 0,
      left: 0
    };
    if (k) {
      var R = k.scrollLeft, H = k.scrollTop;
      I = {
        top: H,
        left: R
      };
    } else {
      var U = n.scrollX, G = n.scrollY;
      I = {
        top: G,
        left: U
      };
    }
    var q = {
      left: 0,
      top: 0
    };
    if (k) {
      var P = n.getComputedStyle(k), T = P.borderLeftWidth, M = P.borderTopWidth;
      q = {
        left: hn(T) || 0,
        top: hn(M) || 0
      };
    }
    r({
      layer: _,
      trigger: O,
      scrollContainers: N,
      arrow: l.current
    }, I, q);
  }, [c, r, n, l, f]), m = Re(function() {
    var j = c(), _ = j.trigger, O = j.layer, N = j.scrollContainers;
    if (!O)
      throw new Error($n("layer"));
    if (!_ && !f)
      throw new Error($n("trigger"));
    if (s) {
      for (var k = !1, I = function() {
        if (!k) {
          k = !0;
          return;
        }
        v();
      }, R = new s(I), H = 0, U = [_, O, document.body]; H < U.length; H++) {
        var G = U[H];
        G && R.observe(G);
      }
      g(function() {
        for (var D = 0, F = [_, O, document.body]; D < F.length; D++) {
          var z = F[D];
          z && R.unobserve(z);
        }
        R.disconnect();
      });
    }
    for (var q = [n].concat(N), P = function() {
      var F = M.value;
      F.addEventListener("scroll", v), g(function() {
        return F.removeEventListener("scroll", v);
      });
    }, T = Sr(q), M; !(M = T()).done; )
      P();
  }, [c, g, v, n, s, f]), x = Re(function(A, j) {
    t && A && A !== j && (b(), m(), v());
  }, [b, m, v, t]), p = ku(Re(function(A) {
    var j = c(), _ = j.layer;
    u(function(O) {
      return Xe({}, O, {
        layer: A
      });
    }), x(_, A);
  }, [c, u, x])), w = Re(function(j) {
    var _ = Pd(j, n), O = _[0];
    if (O) {
      var N = n.getComputedStyle(O).position, k = ["relative", "absolute", "fixed"].includes(N) || a;
      k || (O.style.position = "relative"), process.env.NODE_ENV !== "production" && ko(k, `react-laag: Set the 'position' style of the nearest scroll-container to 'relative', 'absolute' or 'fixed', or set the 'overflowContainer' prop to true. This is needed in order to position the layer properly. Currently the scroll-container is positioned: "` + N + '". For now, "position: relative;" is added for you, but this behavior might be removed in the future. Visit https://react-laag.com/docs/#position-relative for more info.');
    }
    return _;
  }, [n, a]), S = ku(Re(function(A) {
    var j = w(A), _ = c(), O = _.trigger;
    u(function(N) {
      return Xe({}, N, {
        trigger: A,
        scrollContainers: j
      });
    }), x(O, A);
  }, [c, u, x, w])), E = o == null || o.getParent == null ? void 0 : o.getParent();
  return Aa(function() {
    E && u(function(A) {
      return Xe({}, A, {
        scrollContainers: w(E)
      });
    });
  }, [E, u, w]), Aa(function() {
    return t && (y() || m()), function() {
      y() && b();
    };
  }, [t, y, m, b]), Aa(function() {
    t && v();
  }), {
    triggerRef: S,
    layerRef: p,
    arrowRef: l,
    closestScrollContainer: c().scrollContainers[0] || null
  };
}
var Cd = /* @__PURE__ */ Of({});
function Wy(e) {
  var t = e.children, r = e.registrations, n = Re(function(a) {
    return r.current.add(a), function() {
      return r.current.delete(a);
    };
  }, [r]);
  return vr(Cd.Provider, {
    value: n
  }, t);
}
function Yy(e, t) {
  for (var r = Sr(e), n; !(n = r()).done; ) {
    var i = n.value.shouldCloseWhenClickedOutside;
    if (!i(t))
      return !1;
  }
  return !0;
}
function Vy(e) {
  var t = e.isOpen, r = e.onOutsideClick, n = e.onParentClose, i = Ie(null), a = Ie(null), o = Ie(/* @__PURE__ */ new Set()), s = cs(Cd), l = Re(function(d) {
    var c = d.target, u = i.current && i.current.contains(c), h = a.current && a.current.contains(c), y = Yy(o.current, d);
    return h && y && o.current.forEach(function(g) {
      var b = g.closeChild;
      return b();
    }), !u && !h && y;
  }, [i, a, o]);
  return Me(function() {
    if (typeof s == "function")
      return s({
        shouldCloseWhenClickedOutside: l,
        closeChild: function() {
          process.env.NODE_ENV !== "production" && ko(n, "react-laag: You are using useLayer() in a nested setting but forgot to set the 'onParentClose()' callback in the options. This could lead to unexpected behavior."), n && n();
        }
      });
  }, [s, l, n, o]), Me(function() {
    var f = typeof s == "function", d = !t || !r || f;
    if (d)
      return;
    function c(u) {
      l(u) && r();
    }
    return document.addEventListener("click", c, !0), function() {
      return document.removeEventListener("click", c, !0);
    };
  }, [t, r, l, s]), Me(function() {
    t || o.current.forEach(function(f) {
      var d = f.closeChild;
      return d();
    });
  }, [t]), {
    closeOnOutsideClickRefs: {
      trigger: i,
      layer: a
    },
    registrations: o
  };
}
var Gy = ["bottom-start", "bottom-end", "bottom-center", "top-start", "top-center", "top-end", "left-end", "left-center", "left-start", "right-end", "right-center", "right-start", "center"], Ky = {
  top: "bottom",
  left: "right",
  bottom: "top",
  right: "left",
  center: "center"
}, Zy = /* @__PURE__ */ function() {
  function e(r, n, i, a, o, s, l, f, d) {
    this.prop = void 0, this.opposite = void 0, this.isHorizontal = void 0, this.sizeProp = void 0, this.oppositeSizeProp = void 0, this.cssProp = void 0, this.oppositeCssProp = void 0, this.isCenter = void 0, this.isPush = void 0, this.prop = r, this.opposite = n, this.isHorizontal = i, this.sizeProp = a, this.oppositeSizeProp = o, this.cssProp = s, this.oppositeCssProp = l, this.isCenter = f, this.isPush = d;
  }
  var t = e.prototype;
  return t.factor = function(n) {
    return n * (this.isPush ? 1 : -1);
  }, t.isOppositeDirection = function(n) {
    return this.isHorizontal !== n.isHorizontal;
  }, e;
}();
function pr(e, t) {
  t === void 0 && (t = !0);
  var r = ["left", "right"].includes(e);
  return new Zy(e, t ? pr(Ky[e], !1) : null, r, r ? "width" : "height", r ? "height" : "width", r ? "left" : "top", r ? "top" : "left", e === "center", !["right", "bottom"].includes(e));
}
var We = {
  top: /* @__PURE__ */ pr("top"),
  bottom: /* @__PURE__ */ pr("bottom"),
  left: /* @__PURE__ */ pr("left"),
  right: /* @__PURE__ */ pr("right")
}, qe = /* @__PURE__ */ Xe({}, We, {
  center: /* @__PURE__ */ pr("center")
}), zn = ["top", "left", "bottom", "right"], Is = /* @__PURE__ */ function() {
  function e(t) {
    return this.top = void 0, this.left = void 0, this.right = void 0, this.bottom = void 0, Object.assign(this, t);
  }
  return e.mergeSmallestSides = function(r) {
    var n = r[0], i = r.slice(1);
    if (!n)
      throw new Error("Please provide at least 1 bounds objects in order to merge");
    for (var a = Object.fromEntries(zn.map(function(u) {
      return [u, n[u]];
    })), o = Sr(i), s; !(s = o()).done; )
      for (var l = s.value, f = Sr(zn), d; !(d = f()).done; ) {
        var c = d.value;
        a[c] = Math.min(a[c], l[c]);
      }
    return new e(a);
  }, Vi(e, [{
    key: "allSidesArePositive",
    get: function() {
      var r = this;
      return zn.every(function(n) {
        return r[n] >= 0;
      });
    }
    /**
     * Returns a partial IBoundsOffsets with sides that are negative, meaning sides aren't entirely
     * visible in respect to a parent Bounds instance
     */
  }, {
    key: "negativeSides",
    get: function() {
      var r = this;
      return Object.fromEntries(zn.filter(function(n) {
        return r[n] < 0;
      }).map(function(n) {
        return [n, r[n]];
      }));
    }
  }]), e;
}();
function Cu() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return t.reduce(function(n, i) {
    return n + (i ? hn(i) : 0);
  }, 0);
}
function Co(e) {
  var t = e.top, r = e.left, n = e.right, i = e.bottom, a = e.width, o = e.height;
  return {
    top: t,
    left: r,
    right: n,
    bottom: i,
    width: a,
    height: o
  };
}
var Qy = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
}, ct = /* @__PURE__ */ function() {
  e.create = function(n) {
    return new e(n);
  }, e.fromElement = function(n, i) {
    i === void 0 && (i = {});
    var a = i, o = a.withTransform, s = o === void 0 ? !0 : o, l = a.environment, f = l === void 0 ? window : l, d = a.withScrollbars, c = d === void 0 ? !0 : d, u = Co(n.getBoundingClientRect()), h = new e(u);
    if (!s) {
      var y = f.getComputedStyle(n), g = y.width, b = y.height, v = y.boxSizing, m = y.borderLeft, x = y.borderRight, p = y.borderTop, w = y.borderBottom, S = y.paddingLeft, E = y.paddingRight, A = y.paddingTop, j = y.paddingBottom, _ = v === "border-box" ? hn(g) : Cu(g, m, x, S, E), O = v === "border-box" ? hn(b) : Cu(b, p, w, A, j);
      h = new e(Xe({}, h, {
        width: _,
        height: O
      }));
    }
    if (!c) {
      var N = h.width - n.clientWidth, k = h.height - n.clientHeight;
      return h.substract({
        right: N,
        bottom: k
      });
    }
    return h;
  }, e.empty = function() {
    return new e();
  }, e.fromWindow = function(n) {
    var i, a = (i = n == null ? void 0 : n.document.scrollingElement) != null ? i : n == null ? void 0 : n.document.documentElement, o = a ?? {}, s = o.clientWidth, l = s === void 0 ? 0 : s, f = o.clientHeight, d = f === void 0 ? 0 : f;
    return new e({
      width: l,
      height: d,
      right: l,
      bottom: d
    });
  };
  function e(r) {
    return r === void 0 && (r = {}), this.top = void 0, this.left = void 0, this.right = void 0, this.bottom = void 0, this.width = void 0, this.height = void 0, Object.assign(this, Qy, r);
  }
  var t = e.prototype;
  return t.toObject = function() {
    return Co(this);
  }, t.merge = function(n) {
    var i = this.toObject();
    return new e(Xe({}, i, typeof n == "function" ? n(i) : n));
  }, t.substract = function(n) {
    for (var i = this.toObject(), a = Object.entries(n), o = 0, s = a; o < s.length; o++) {
      var l = s[o], f = l[0], d = l[1];
      if (f in We) {
        var c = We[f];
        i[f] += c.factor(d), i[c.isHorizontal ? "width" : "height"] -= d;
      } else
        i[f] -= d || 0;
    }
    return new e(i);
  }, t.offsetsTo = function(n) {
    return new Is({
      top: n.top - this.top,
      bottom: this.bottom - n.bottom,
      left: n.left - this.left,
      right: this.right - n.right
    });
  }, t.mapSides = function(n) {
    for (var i = this.toObject(), a = Object.values(We), o = 0, s = a; o < s.length; o++) {
      var l = s[o];
      i[l.prop] = n(l, i[l.prop]);
    }
    return new e(i);
  }, Vi(e, [{
    key: "surface",
    get: function() {
      return this.width * this.height;
    }
  }]), e;
}(), Id = /* @__PURE__ */ function() {
  function e(r, n, i, a, o) {
    this.primary = void 0, this.secondary = void 0, this.offsets = void 0, this.subjectsBounds = void 0, this._cachedLayerBounds = null, this._cachedContainerOffsets = null, this.primary = r, this.secondary = n, this.offsets = o, this.setSubjectsBounds(i, a);
  }
  var t = e.prototype;
  return t.setSubjectsBounds = function(n, i) {
    if (!i) {
      this.subjectsBounds = n;
      return;
    }
    var a = (
      // if the user passed a callback, call it with the layerSide corresponding to
      // the placement
      typeof i == "function" ? i(this.primary.prop) : i
    );
    this.subjectsBounds = n.merge({
      layer: Xe({}, n.layer, a)
    });
  }, t.getLayerBounds = function(n) {
    if (n === void 0 && (n = 0), this._cachedLayerBounds && n === 0)
      return this._cachedLayerBounds;
    var i = this.primary, a = this.secondary, o = this.subjectsBounds, s = o.trigger, l = o.layer, f = o.arrow, d = i.isHorizontal, c = i.oppositeCssProp, u = i.oppositeSizeProp, h = i.prop, y = i.opposite, g = ct.empty();
    g[y.prop] = s[h] - i.factor(this.offsets.trigger), g[h] = g[y.prop] - i.factor(l[i.sizeProp]);
    var b = this.offsets.arrow * 2, v = s[c] - (l[u] - f[u]) + b, m = s[c] + (s[u] - f[u]) - b;
    if (a.isPush || (v += l[u], m += l[u]), a.isCenter) {
      var x = (d ? We.top : We.left).prop, p = (d ? We.bottom : We.right).prop;
      g[x] = Po(s[x] + s[u] / 2 - l[u] / 2 + n, v, m), g[p] = g[x] + l[u];
    } else {
      var w = a, S = s[w.prop], E = S < v ? v - S : S > m ? m - S : 0;
      g[w.prop] = Po(S + n + E, v, m), g[w.opposite.prop] = g[w.prop] + a.factor(l[u]);
    }
    g.width = g.right - g.left, g.height = g.bottom - g.top;
    var A = ct.create(g);
    return n === 0 && (this._cachedLayerBounds = A), A;
  }, t.getLayerCollisionBounds = function() {
    var n = this.offsets.container;
    return this.getLayerBounds().mapSides(function(i, a) {
      return a -= i.factor(n);
    }).merge(function(i) {
      var a = i.width, o = i.height;
      return {
        width: a + n * 2,
        height: o + n * 2
      };
    });
  }, t.getContainerOffsets = function(n) {
    if (this._cachedContainerOffsets && !n)
      return this._cachedContainerOffsets;
    var i = this.subjectsBounds.merge({
      layer: n || this.getLayerCollisionBounds()
    }), a = Is.mergeSmallestSides(i.layerOffsetsToScrollContainers);
    return n || (this._cachedContainerOffsets = a), a;
  }, Vi(e, [{
    key: "type",
    get: function() {
      return this.primary.prop + "-" + (this.secondary.prop === "center" ? "center" : ["bottom", "right"].includes(this.secondary.prop) ? "end" : "start");
    }
  }, {
    key: "triggerIsBigger",
    get: function() {
      var n = this.secondary.isHorizontal, i = this.subjectsBounds, a = i.triggerHasBiggerWidth, o = i.triggerHasBiggerHeight;
      return n && a || !n && o;
    }
    /**
     * Checks whether the placement fits within all it's container (including container-offset)
     */
  }, {
    key: "fitsContainer",
    get: function() {
      return this.getContainerOffsets().allSidesArePositive;
    }
    /**
     * Returns the surface in square pixels of the visible part of the layer
     */
  }, {
    key: "visibleSurface",
    get: function() {
      var n = this.getLayerBounds(), i = this.getContainerOffsets(n), a = i.negativeSides;
      for (var o in a)
        a[o] = -a[o];
      return n.substract(a).surface;
    }
    /**
     * Returns a BoundSide by looking at the most negative offset that is the opposite direction
     */
  }, {
    key: "secondaryOffsetSide",
    get: function() {
      var n, i, a = this, o = this.getContainerOffsets(), s = (n = (i = Object.entries(o.negativeSides).map(function(f) {
        var d = f[0], c = f[1];
        return [We[d], c];
      }).filter(function(f) {
        var d = f[0];
        return a.primary.isOppositeDirection(d);
      }).sort(function(f, d) {
        var c = f[1], u = d[1];
        return u - c;
      })) == null ? void 0 : i[0]) != null ? n : [], l = s[0];
      return l || null;
    }
  }]), e;
}(), Iu = /* @__PURE__ */ function(e) {
  Ry(t, e);
  function t() {
    return e.apply(this, arguments) || this;
  }
  var r = t.prototype;
  return r.getLayerBounds = function() {
    var i = this.subjectsBounds, a = i.trigger, o = i.layer, s = ct.empty();
    return s.top = a.top + a.height / 2 - o.height / 2, s.bottom = s.top + o.height, s.left = a.left + a.width / 2 - o.width / 2, s.right = s.left + o.width, s.width = s.right - s.left, s.height = s.bottom - s.top, s;
  }, t;
}(Id);
function Xy(e, t, r) {
  var n = e.layer, i = e.trigger, a = e.arrow, o = t.primary.oppositeSizeProp, s = t.primary.isHorizontal ? ["top", "bottom"] : ["left", "right"], l = s[0], f = s[1], d = n[l] + n[o] / 2 - i[l] - a[o] / 2 - r, c = n[f] - n[o] / 2 - i[f] + a[o] / 2 + r;
  return (d < 0 ? -d : 0) + (c > 0 ? -c : 0);
}
var Lu = {
  position: "absolute",
  willChange: "top, left",
  left: null,
  right: null,
  top: null,
  bottom: null
};
function Jy(e, t, r) {
  var n;
  if (t.primary.isCenter)
    return Lu;
  var i = e.layer, a = e.trigger, o = e.arrow, s = t.primary.oppositeSizeProp, l = a[s] > i[s], f = r + o[s] / 2, d = i[s] - o[s] / 2 - r, c = Xy(e, t, r), u = t.primary.prop, h = t.primary.oppositeCssProp, y = l ? i[s] / 2 + c : a[h] + a[s] / 2 - i[h];
  return Xe({}, Lu, (n = {}, n[u] = "100%", n[h] = Po(y, f, d), n));
}
var Mu = /* @__PURE__ */ function() {
  function e(r, n, i) {
    this.placements = void 0, this.config = void 0, this.subjectsBounds = void 0, this.placements = r, this.config = n, this.subjectsBounds = i;
  }
  e.getSidesFromPlacementType = function(n) {
    var i = n.split("-"), a = i[0], o = i[1], s = We[a], l;
    return o === "center" ? l = qe.center : s.isHorizontal ? l = o === "start" ? qe.top : qe.bottom : l = o === "start" ? qe.left : qe.right, [s, l];
  }, e.create = function(n, i) {
    var a = {
      arrow: i.arrowOffset,
      container: i.containerOffset,
      trigger: i.triggerOffset
    };
    function o(s) {
      s === void 0 && (s = i.placement);
      var l = e.getSidesFromPlacementType(s), f = l[0], d = l[1], c = We[f.isHorizontal ? i.preferY : i.preferX], u = !f.isHorizontal && n.triggerHasBiggerWidth || f.isHorizontal && n.triggerHasBiggerHeight;
      function h(g, b) {
        return new Id(g, b, n, i.layerDimensions, a);
      }
      var y = [];
      return y[0] = h(f, d), y[1] = h(f, d.isCenter ? c : qe.center), y[2] = h(f, qe[(d.opposite.isCenter ? c.opposite : d.opposite).prop]), y[3] = h(c, u ? f : qe[f.opposite.prop]), y[4] = h(c, qe.center), y[5] = h(c, u ? qe[f.opposite.prop] : f), y[6] = h(We[c.opposite.prop], u ? f : qe[f.opposite.prop]), y[7] = h(We[c.opposite.prop], qe.center), y[8] = h(We[c.opposite.prop], u ? qe[f.opposite.prop] : f), y[9] = h(We[f.opposite.prop], d), y[10] = h(We[f.opposite.prop], d.isCenter ? c : qe.center), y[11] = h(We[f.opposite.prop], qe[(d.opposite.isCenter ? c.opposite : d.opposite).prop]), y = y.filter(function(g) {
        return g.type === i.placement || i.possiblePlacements.includes(g.type);
      }), y;
    }
    return i.placement === "center" ? new e([new Iu(qe.center, qe.center, n, i.layerDimensions, a)].concat(o(i.preferY + "-" + i.preferX)), i, n) : new e(o(), i, n);
  };
  var t = e.prototype;
  return t.filterPlacementsBySide = function(n) {
    return this.placements.filter(function(i) {
      return i.primary === n;
    });
  }, t.findFirstPlacementThatFits = function() {
    return this.placements.find(function(n) {
      return n.fitsContainer;
    });
  }, t.placementWithBiggestVisibleSurface = function() {
    var n = this.placements.map(function(a) {
      return {
        placement: a,
        surface: a.visibleSurface
      };
    }).sort(function(a, o) {
      return o.surface - a.surface;
    }), i = n[0].placement;
    return i;
  }, t.findSuitablePlacement = function() {
    return this.config.auto ? this.findFirstPlacementThatFits() || this.placementWithBiggestVisibleSurface() : this.placements[0];
  }, t.getSecondaryOffset = function(n) {
    var i = this.config, a = i.auto, o = i.snap;
    if (!a || o || n instanceof Iu)
      return 0;
    var s = this.filterPlacementsBySide(n.primary), l = s.indexOf(n) === 0;
    if (l && n.fitsContainer)
      return 0;
    var f = s.find(function(g) {
      return !g.fitsContainer;
    });
    if (!f)
      return 0;
    var d = f.secondaryOffsetSide;
    if (!d)
      return 0;
    var c = n.getContainerOffsets(), u = n.secondary, h;
    n.triggerIsBigger || f === n ? h = d.isPush ? -1 : 1 : h = u === qe.left || [qe.top, qe.center].includes(u) && d.isPush ? -1 : 1;
    var y = c[d.prop];
    return y * h;
  }, t.getStyles = function(n, i, a, o) {
    var s = {
      willChange: "top, left, width, height"
    }, l = Jy(this.subjectsBounds.merge({
      layer: n
    }), i, this.config.arrowOffset), f = this.config.overflowContainer ? Xe({}, s, {
      position: "fixed",
      top: n.top,
      left: n.left
    }) : Xe({}, s, {
      position: "absolute",
      top: n.top - this.subjectsBounds.parent.top + a.top - o.top,
      left: n.left - this.subjectsBounds.parent.left + a.left - o.left
    });
    return {
      arrow: l,
      layer: f
    };
  }, t.getHasDisappeared = function(n) {
    var i = this.config.overflowContainer ? this.subjectsBounds.trigger : n, a = Is.mergeSmallestSides(this.subjectsBounds.offsetsToScrollContainers(i, !0)), o = Object.entries(a.negativeSides), s = o.some(function(l) {
      var f = l[0], d = l[1], c = We[f];
      return d <= -i[c.sizeProp];
    });
    return s ? "full" : a.allSidesArePositive ? null : "partial";
  }, t.result = function(n, i) {
    var a = this.findSuitablePlacement(), o = this.getSecondaryOffset(a), s = a.getLayerBounds(o), l = this.getStyles(s, a, n, i), f = a.primary.prop;
    return {
      styles: l,
      layerSide: f,
      placement: a,
      layerBounds: s,
      hasDisappeared: this.getHasDisappeared(s)
    };
  }, e;
}(), e1 = /* @__PURE__ */ function() {
  function e(r, n) {
    this.overflowContainer = void 0, this.trigger = void 0, this.layer = void 0, this.arrow = void 0, this.parent = void 0, this.window = void 0, this.scrollContainers = void 0, this.overflowContainer = n, Object.assign(this, r);
  }
  e.create = function(n, i, a, o, s, l, f, d) {
    var c = ct.fromWindow(n);
    return new e({
      layer: ct.fromElement(i, {
        environment: n,
        withTransform: !1
      }),
      trigger: d ? ct.create(Co(d())) : ct.fromElement(a),
      arrow: s ? ct.fromElement(s) : ct.empty(),
      parent: o ? ct.fromElement(o) : c,
      window: c,
      scrollContainers: [c].concat(l.map(function(u) {
        return ct.fromElement(u, {
          withScrollbars: !1
        });
      }))
    }, f);
  };
  var t = e.prototype;
  return t.merge = function(n) {
    return new e(Xe({}, this, n), this.overflowContainer);
  }, t.offsetsToScrollContainers = function(n, i) {
    i === void 0 && (i = !1);
    var a = this.overflowContainer && !i ? [this.window] : this.scrollContainers;
    return a.map(function(o) {
      return o.offsetsTo(n);
    });
  }, Vi(e, [{
    key: "layerOffsetsToScrollContainers",
    get: function() {
      return this.offsetsToScrollContainers(this.layer);
    }
  }, {
    key: "triggerHasBiggerWidth",
    get: function() {
      return this.trigger.width > this.layer.width;
    }
  }, {
    key: "triggerHasBiggerHeight",
    get: function() {
      return this.trigger.height > this.layer.height;
    }
  }]), e;
}(), Du = null, ut = {
  auto: !1,
  arrowOffset: 0,
  containerOffset: 10,
  triggerOffset: 0,
  overflowContainer: !0,
  placement: "top-center",
  possiblePlacements: Gy,
  preferX: "right",
  preferY: "bottom",
  snap: !1,
  container: void 0,
  trigger: void 0
};
function t1(e) {
  var t, r = e.isOpen, n = r === void 0 ? !1 : r, i = e.overflowContainer, a = i === void 0 ? ut.overflowContainer : i, o = e.environment, s = o === void 0 ? typeof window < "u" ? window : void 0 : o, l = e.ResizeObserver, f = e.placement, d = f === void 0 ? ut.placement : f, c = e.possiblePlacements, u = c === void 0 ? ut.possiblePlacements : c, h = e.preferX, y = h === void 0 ? ut.preferX : h, g = e.preferY, b = g === void 0 ? ut.preferY : g, v = e.auto, m = v === void 0 ? ut.auto : v, x = e.snap, p = x === void 0 ? ut.snap : x, w = e.triggerOffset, S = w === void 0 ? ut.triggerOffset : w, E = e.containerOffset, A = E === void 0 ? ut.containerOffset : E, j = e.arrowOffset, _ = j === void 0 ? ut.arrowOffset : j, O = e.container, N = O === void 0 ? ut.container : O, k = e.layerDimensions, I = k === void 0 ? null : k, R = e.onDisappear, H = e.onOutsideClick, U = e.onParentClose, G = e.trigger, q = Ke(function() {
    return {
      layerSide: d === "center" ? "center" : Mu.getSidesFromPlacementType(d)[0].prop,
      styles: {
        layer: {
          position: a ? "fixed" : "absolute",
          top: 0,
          left: 0
        },
        arrow: {
          position: "absolute",
          top: 0,
          left: 0
        }
      }
    };
  }), P = q[0], T = q[1], M = Ie(null), D = qy(P, n), F = Ie({
    cancelled: !1
  });
  Me(function() {
    return function() {
      F.current.cancelled = !0;
    };
  }, []);
  var z = Re(function(Ne, Oe, K) {
    var Q = Ne.arrow, ie = Ne.layer, ae = Ne.scrollContainers, J = Ne.trigger, de = ae[0], X = e1.create(s, ie, J, de, Q, ae, a, G == null ? void 0 : G.getBounds), ne = {
      placement: d,
      possiblePlacements: u,
      auto: m,
      layerDimensions: I,
      arrowOffset: _,
      containerOffset: A,
      triggerOffset: S,
      preferX: y,
      preferY: b,
      snap: p,
      overflowContainer: a
    }, ge = Mu.create(X, ne).result(Oe, K), ye = ge.hasDisappeared, pe = ge.layerSide, it = ge.styles, we = {
      layerSide: pe,
      styles: it
    };
    if (!D.current || r1(D.current, we)) {
      D.current = we, F.current.cancelled = !0;
      var He = {
        cancelled: !1
      };
      F.current = He, Promise.resolve().then(function() {
        He.cancelled || T(we);
      });
    }
    ju(ye) && ju(R) && R(ye);
  }, [_, m, A, s, I, R, a, d, u, y, b, p, S, D, G]), C = Hy({
    ResizeObserverPolyfill: l,
    environment: s,
    enabled: n,
    overflowContainer: a,
    onChange: z,
    triggerOption: G
  }), $ = C.triggerRef, W = C.layerRef, Y = C.arrowRef, V = C.closestScrollContainer, te = Vy({
    isOpen: n,
    onOutsideClick: H,
    onParentClose: U
  }), Z = te.closeOnOutsideClickRefs, le = te.registrations, ce = {
    triggerProps: G ? {} : {
      ref: Pu($, Z.trigger, M)
    },
    layerProps: {
      ref: Pu(W, Z.layer),
      style: P.styles.layer
    },
    arrowProps: {
      ref: Y,
      style: P.styles.arrow,
      layerSide: P.layerSide
    },
    layerSide: P.layerSide,
    triggerBounds: n ? G ? G.getBounds() : (t = M.current) == null ? void 0 : t.getBoundingClientRect() : null,
    renderLayer: function(Ne) {
      return typeof document < "u" ? Tp(vr(Wy, {
        registrations: le,
        children: Ne
      }), a || !V ? n1(N) : V) : null;
    }
  };
  return ce;
}
function r1(e, t) {
  if (e.layerSide !== t.layerSide)
    return !0;
  for (var r = ["position", "top", "left", "right", "bottom"], n = 0, i = r; n < i.length; n++) {
    var a = i[n];
    if (e.styles.layer[a] !== t.styles.layer[a] || e.styles.arrow[a] !== t.styles.arrow[a])
      return !0;
  }
  return !1;
}
var Ru = "layers";
function n1(e) {
  var t;
  if (typeof e == "function") {
    if (t = e(), !t || !(t instanceof HTMLElement))
      throw new Error("react-laag: You've passed a function to the 'container' prop, but it returned no valid HTMLElement");
  } else if (e instanceof HTMLElement)
    t = e;
  else if (typeof e == "string") {
    if (t = document.getElementById(e), !t)
      throw new Error("react-laag: You've passed element with id '" + e + "' to the 'container' prop, but it returned no valid HTMLElement");
  } else {
    if (Du instanceof HTMLElement)
      return Du;
    t = document.getElementById(Ru), t || (t = document.createElement("div"), t.id = Ru, t.style.cssText = `
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
      `, document.body.appendChild(t));
  }
  return t;
}
var i1 = ["size", "angle", "borderWidth", "borderColor", "roundness", "backgroundColor", "layerSide", "style"], ri = "left", ni = "top", ii = "bottom", ai = "right";
function Ei(e, t) {
  return Math.tan(e * (Math.PI / 180)) * t;
}
function a1(e, t, r, n) {
  var i, a = (i = {}, i[ii] = "0 " + -n + " " + t + " " + e, i[ni] = "0 0 " + t + " " + (e + n), i[ai] = -n + " 0 " + e + " " + t, i[ri] = "0 0 " + (e + n) + " " + t, i);
  return a[r.prop];
}
function o1(e, t, r, n, i) {
  var a, o, s, l = n / 10 * e * 2, f = (a = {}, a[ii] = [0, e], a[ni] = [0, 0], a[ai] = [e, t], a[ri] = [0, t], a)[r.prop].join(" "), d = r.isHorizontal ? "V 0" : "H " + t, c = t / 2, u = t / 2 + Ei(i, e / 8), h = e / 8, y = (o = {}, o[ii] = ["C", u, h, c + l, 0, c, 0], o[ni] = ["C", u, e - h, c + l, e, c, e], o[ai] = ["C", h, t - u, 0, c - l, 0, c], o[ri] = ["C", e - h, t - u, e, c - l, e, c], o)[r.prop].join(" "), g = t / 2 - Ei(i, e / 8), b = e / 8, v = (s = {}, s[ii] = ["C", c - l, 0, g, b, f], s[ni] = ["C", c - l, e, g, e - b, f], s[ai] = ["C", 0, c + l, b, t - g, f], s[ri] = ["C", e, c + l, e - b, t - g, f], s)[r.prop].join(" ");
  return ["M", f, d, y, v].join(" ");
}
function s1(e, t, r, n, i) {
  var a = Ei(i, r), o = n.isPush ? [0, r] : [e, e - r], s = o[0], l = o[1];
  return n.isHorizontal ? ["M", s, r, "V", t - r, "L", l, t - r - a, "V", a + r, "Z"].join(" ") : ["M", r, s, "H", t - r, "L", t - r - a, l, "H", a + r, "Z"].join(" ");
}
var l1 = /* @__PURE__ */ Ef(function(t, r) {
  var n = t.size, i = n === void 0 ? 8 : n, a = t.angle, o = a === void 0 ? 45 : a, s = t.borderWidth, l = s === void 0 ? 0 : s, f = t.borderColor, d = f === void 0 ? "black" : f, c = t.roundness, u = c === void 0 ? 0 : c, h = t.backgroundColor, y = h === void 0 ? "white" : h, g = t.layerSide, b = g === void 0 ? "top" : g, v = t.style, m = v === void 0 ? {} : v, x = $y(t, i1);
  if (b === "center")
    return null;
  var p = We[b], w = i, S = Ei(o, i) * 2, E = Math.max(w, S);
  return vr("svg", Xe({
    ref: r
  }, x, {
    style: Xe({}, m, {
      transform: "translate" + (p.isHorizontal ? "Y" : "X") + "(-50%)"
    }),
    width: E,
    height: E,
    preserveAspectRatio: p.isPush ? "xMinYMin" : "xMaxYMax",
    viewBox: a1(w, S, p, l)
  }), vr("path", {
    fill: y,
    strokeWidth: l,
    stroke: d,
    d: o1(w, S, p, u, o)
  }), vr("path", {
    fill: y,
    d: s1(w, S, l, p, o)
  }));
}), $u;
(function(e) {
  e[e.ENTERING = 0] = "ENTERING", e[e.LEAVING = 1] = "LEAVING", e[e.IDLE = 2] = "IDLE";
})($u || ($u = {}));
const u1 = ({ onClick: e }) => {
  const { t } = er(), [r, n] = Ke(!1), i = (u) => {
    n(!1), e(u);
  }, a = (u) => {
    n(!1), u();
  }, o = () => {
    localStorage.clear(), e("/");
  }, s = () => {
    const u = [{
      title: "my_account",
      icon: /* @__PURE__ */ L.jsx(Ou, {}),
      investor: !0,
      founder: !0,
      admin: !1,
      url: "/account"
    }];
    return u.push({
      title: "logout",
      icon: /* @__PURE__ */ L.jsx(Py, {}),
      investor: !0,
      founder: !0,
      admin: !0,
      method: () => o()
    }), u;
  }, { renderLayer: l, triggerProps: f, layerProps: d, arrowProps: c } = t1({
    isOpen: r,
    onOutsideClick: () => n(!1),
    onDisappear: () => n(!1),
    overflowContainer: !0,
    auto: !0,
    placement: "bottom-center",
    triggerOffset: 12,
    containerOffset: 16,
    arrowOffset: 16
  });
  return /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    /* @__PURE__ */ L.jsx(
      "button",
      {
        id: "account-button",
        ...f,
        onClick: () => n(!r),
        className: "bg-bg-buttons-secondary border border-border-buttons-secondary focus:outline-none custom-circle hover:shadow-inner shadow-soft-white w-12 h-12 rounded-full ml-2",
        children: /* @__PURE__ */ L.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ L.jsx(Ou, {}) })
      }
    ),
    r && l(
      /* @__PURE__ */ L.jsxs(
        "ul",
        {
          ...d,
          className: "mt-2 px-2 py-2 z-30 | shadow-hover border bg-white rounded-2xl border-border-buttons-secondary",
          children: [
            s().map((u, h) => /* @__PURE__ */ L.jsxs(
              "li",
              {
                onClick: () => u.method ? a(u.method) : i(u.url),
                className: "px-2 py-2 flex text-main items-center cursor-pointer text-sm text-gray",
                children: [
                  /* @__PURE__ */ L.jsx("span", { className: "mr-2 text-main", children: u.icon }),
                  /* @__PURE__ */ L.jsx("span", { className: "hover:font-bold", children: t(u.title) })
                ]
              },
              h
            )),
            /* @__PURE__ */ L.jsx(
              l1,
              {
                ...c,
                borderColor: "#61D8BD",
                borderWidth: 1,
                className: "w-5"
              }
            )
          ]
        }
      )
    )
  ] });
}, mA = ({ onClick: e }) => /* @__PURE__ */ L.jsx("header", { className: "p-3 pr-10 w-full flex justify-end items-center", children: /* @__PURE__ */ L.jsx("div", { className: "flex items-center", id: "header-options", children: /* @__PURE__ */ L.jsx(u1, { onClick: e }) }) }), c1 = ms.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  ${(e) => e.horizontal && yi`
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    `}
`, f1 = (e) => /* @__PURE__ */ L.jsx(c1, { ...e, children: e.children.map((t, r) => /* @__PURE__ */ L.jsx("li", { children: t }, r)) }), yA = ({ sections: e, onClick: t, activePath: r }) => {
  const { t: n } = er(), i = (s) => {
    t(s.url);
  }, a = (s) => {
    if (r === s || r.startsWith(s + "/"))
      return !0;
  }, o = () => e.map((s, l) => /* @__PURE__ */ L.jsx("div", { id: `sidebar-menu-item-${l + 1}`, className: "flex justify-center text-right w-full", children: /* @__PURE__ */ L.jsxs(
    "div",
    {
      onClick: () => i(s),
      className: `flex items-center w-full  
              h-9 my-2 ml-6 lg:ml-2 px-2 
              rounded-l-2xl cursor-pointer text-center 
              hover:bg-white hover:text-main hover:shadow-none ${a(s.url) ? "bg-white text-main" : "text-white"}
              `,
      children: [
        /* @__PURE__ */ L.jsx("div", { className: "w-8 flex justify-between text-center", children: s.icon }),
        /* @__PURE__ */ L.jsx("div", { className: "text-sm font-medium hidden lg:block", children: n(s.title) })
      ]
    }
  ) }, l));
  return /* @__PURE__ */ L.jsxs("div", { className: "fixed top-0 bg-main h-screen w-20 lg:w-52 z-20", children: [
    /* @__PURE__ */ L.jsxs("div", { className: "menu-logo-container", children: [
      /* @__PURE__ */ L.jsx("div", { className: "mt-4 px-4 flex justify-center items-center hidden lg:flex", children: /* @__PURE__ */ L.jsx("img", { src: "https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg", alt: "Kiota Logo", className: "object-cover w-full h-full" }) }),
      /* @__PURE__ */ L.jsx("div", { className: "h-12 mt-2 px-2 flex justify-center items-center block lg:hidden", children: /* @__PURE__ */ L.jsx("img", { src: "https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg", alt: "kiota", className: "object-cover w-full h-full" }) })
    ] }),
    /* @__PURE__ */ L.jsx(f1, { className: "mt-4 lg:mt-8", children: o() }),
    /* @__PURE__ */ L.jsx("div", { className: "mt-8 fixed bottom-3 w-20 lg:w-52", children: /* @__PURE__ */ L.jsx("div", { className: "text-xxs lg:text-xxs px-4 text-center text-white", children: n("powered_by_kiota") }) })
  ] });
};
function d1(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M184.3 204.8h-77.7c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h112.2c7.7 0 13.9-6.2 13.9-13.9V106.6c0-7.7-6.2-13.9-13.9-13.9h-.2c-7.7 0-13.9 6.2-13.9 13.9v77.7L87.7 68c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.4-9.8 4.1-5.4 5.4-5.4 14.2 0 19.6l116.2 117.1zM293.1 232.8h112.2c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9h-77.7L444 87.7c5.4-5.4 5.4-14.2 0-19.6-2.6-2.6-6.1-4.1-9.8-4.1-3.7 0-7.2 1.4-9.8 4L307.3 184.3v-77.7c0-7.7-6.2-13.9-13.9-13.9h-.2c-7.7 0-13.9 6.2-13.9 13.9v112.2c0 7.7 6.2 14 13.8 14zM77.9 448c3.7 0 7.2-1.4 9.8-4l117.1-116.3v77.7c0 7.7 6.2 13.9 13.9 13.9h.2c7.7 0 13.9-6.2 13.9-13.9V293.1c0-7.7-6.2-13.9-13.9-13.9H106.6c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h77.7L68 424.3c-5.4 5.4-5.4 14.2 0 19.6 2.7 2.7 6.2 4.1 9.9 4.1zM293.1 419.2h.2c7.7 0 13.9-6.2 13.9-13.9v-77.7L424.3 444c2.6 2.6 6.1 4 9.8 4 3.7 0 7.2-1.4 9.8-4.1 5.4-5.4 5.4-14.2 0-19.6L327.7 307.2h77.7c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9H293.1c-7.7 0-13.9 6.2-13.9 13.9v112.2c.1 7.7 6.3 13.9 13.9 13.9z" } }] })(e);
}
function h1(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M112.4 92h77.7c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9H77.9C70.2 64 64 70.2 64 77.9v112.2c0 7.7 6.2 13.9 13.9 13.9h.2c7.7 0 13.9-6.2 13.9-13.9v-77.7l117.1 116.3c2.6 2.6 6.1 4 9.8 4 3.7 0 7.2-1.4 9.8-4.1 5.4-5.4 5.4-14.2 0-19.6L112.4 92zM434.1 64H321.9c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h77.7L283.3 209.1c-5.4 5.4-5.4 14.2 0 19.6 2.6 2.6 6.1 4.1 9.8 4.1 3.7 0 7.2-1.4 9.8-4L420 112.4v77.7c0 7.7 6.2 13.9 13.9 13.9h.2c7.7 0 13.9-6.2 13.9-13.9V77.9c0-7.7-6.2-13.9-13.9-13.9zM218.9 279.2c-3.7 0-7.2 1.4-9.8 4L92 399.6v-77.7c0-7.7-6.2-13.9-13.9-13.9h-.2c-7.7 0-13.9 6.2-13.9 13.9v112.2c0 7.7 6.2 13.9 13.9 13.9h112.2c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9h-77.7l116.3-117.1c5.4-5.4 5.4-14.2 0-19.6-2.6-2.6-6.1-4.1-9.8-4.1zM434.1 308h-.2c-7.7 0-13.9 6.2-13.9 13.9v77.7L302.9 283.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.4-9.8 4.1-5.4 5.4-5.4 14.2 0 19.6l116.3 117h-77.7c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h112.2c7.7 0 13.9-6.2 13.9-13.9V321.9c0-7.7-6.2-13.9-13.9-13.9z" } }] })(e);
}
const bA = ({ children: e, onClose: t, title: r, width: n, showExpand: i = !1 }) => {
  const [a, o] = Ke(!1);
  return Di.createPortal(
    /* @__PURE__ */ L.jsx(
      "div",
      {
        className: "fixed z-50 left-0 top-0 w-screen h-screen bg-gray-opacity side-panel",
        children: /* @__PURE__ */ L.jsxs(
          "div",
          {
            className: `fixed top-0 right-0 h-screen mb-16 shadow-soft-white overflow-auto overscroll-y-auto transition ${n && !a && `w-${n}`} ${a && "w-10/12"}`,
            style: { backgroundColor: "#F8F8F9", animation: "appearFromRight 0.3s ease-in-out" },
            children: [
              /* @__PURE__ */ L.jsxs("div", { className: "flex px-4 py-3 bg-main text-white text-lg items-center flex justify-between", children: [
                /* @__PURE__ */ L.jsxs("div", { onClick: () => t && t(), children: [
                  /* @__PURE__ */ L.jsx(Cs, { className: "inline mr-4 relative -mt-1 cursor-pointer" }),
                  r
                ] }),
                i && /* @__PURE__ */ L.jsxs("div", { children: [
                  a && /* @__PURE__ */ L.jsx(d1, { className: "inline mr-4 relative -mt-1 cursor-pointer", onClick: () => o(!a) }),
                  !a && /* @__PURE__ */ L.jsx(h1, { className: "inline mr-4 relative -mt-1 cursor-pointer", onClick: () => o(!a) })
                ] })
              ] }),
              /* @__PURE__ */ L.jsx("div", { className: "p-4 pt-6", children: e })
            ]
          }
        )
      }
    ),
    document.body
  );
}, ka = ({
  onClick: e,
  bgColor: t = "transparence-blue",
  width: r = "9",
  height: n = "9",
  shadow: i,
  shadowHover: a,
  icon: o,
  iconWidth: s = "5",
  alt: l,
  marginY: f
}) => /* @__PURE__ */ L.jsx(
  "button",
  {
    onClick: e,
    className: `w-${r} h-${n} mx-1 my-${f} | 
        bg-${t} rounded-2xl | 
        flex justify-center items-center | 
        cursor-pointer outline-none transition-all duration-500 ease-in-out shadow-${i} | 
        hover:shadow-${a} hover:outline-none`,
    children: /* @__PURE__ */ L.jsx(
      "img",
      {
        src: o,
        alt: l,
        className: `h-${s} w-auto`
      }
    )
  }
), p1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuNjQyOTEgOC44Mjg0MkwxNC41MjIyIDMuOTMzNDVDMTQuODI3NCAzLjYyNjUyIDE1IDMuMjA3MzEgMTUgMi43Njk4VjEuMzM0MTZDMTUgMC40MzMzNTMgMTQuMjg1MyAwIDEzLjQwMzcgMEgxLjU5NjNDMC43MTQ3MTIgMCAwIDAuNDMzMzUzIDAgMS4zMzQxNlYyLjc5NTU4QzAgMy4yMDk4MSAwLjE1Mzg1IDMuNjA5MDYgMC40MzE0MzIgMy45MTE4Mkw0LjkxNDI2IDguODAyNjRDNC45OTg5MSA4Ljg5NDk2IDUuMTE2OTUgOC45NDczNyA1LjI0MTQ5IDguOTQ4Mkw5LjMyNjI2IDguOTU5ODRDOS40NDQyOSA4Ljk2MDY3IDkuNTU4MjYgOC45MTQwOSA5LjY0MjkxIDguODI4NDJaIiBmaWxsPSIjNEQ3MEIzIi8+CjxwYXRoIG9wYWNpdHk9IjAuNCIgZD0iTTUuMDQ3IDguOTA0NzlWMTQuNDA4NkM1LjA0NyAxNC42MDkxIDUuMTQ3OTQgMTQuNzk3OSA1LjMxMzE4IDE0LjkwNkM1LjQwNzYxIDE0Ljk2ODQgNS41MTY2OSAxNSA1LjYyNTc3IDE1QzUuNzA3OTggMTUgNS43OTAyIDE0Ljk4MjUgNS44NjY3MiAxNC45NDc2TDkuMTcxNjUgMTMuNDA3MkM5LjM3ODQxIDEzLjMxMTUgOS41MTExIDEzLjEwMTEgOS41MTExIDEyLjg2OVY4LjkwNDc5SDUuMDQ3WiIgZmlsbD0iIzRENzBCMyIvPgo8L3N2Zz4K", v1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjcuNSIgeDI9IjcuNSIgeTI9IjE1IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB5MT0iNy41IiB4Mj0iMTUiIHkyPSI3LjUiIHN0cm9rZT0iIzRENzBCMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=", g1 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC40IiBkPSJNNy4zODk1IDguOTg0NTJINi40NTY1QzQuNDIxNSA4Ljk4NDUyIDIuNzcxNSAxMC42MzQ1IDIuNzcxNSAxMi42Njk1VjE3LjU0NDVDMi43NzE1IDE5LjU3ODUgNC40MjE1IDIxLjIyODUgNi40NTY1IDIxLjIyODVIMTcuNTg2NUMxOS42MjE1IDIxLjIyODUgMjEuMjcxNSAxOS41Nzg1IDIxLjI3MTUgMTcuNTQ0NVYxMi42NTk1QzIxLjI3MTUgMTAuNjMwNSAxOS42MjY1IDguOTg0NTIgMTcuNTk3NSA4Ljk4NDUyTDE2LjY1NDUgOC45ODQ1MiIgc3Ryb2tlPSIjNEQ3MEIzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMi4wMjE0IDIuMTkxNDJWMTQuMjMyNCIgc3Ryb2tlPSIjNEQ3MEIzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05LjEwNjMgNS4xMTkxNEwxMi4wMjEzIDIuMTkxMTRMMTQuOTM3MyA1LjExOTE0IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==";
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var Ld = function(e, t) {
  return (Ld = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, n) {
    r.__proto__ = n;
  } || function(r, n) {
    for (var i in n)
      n.hasOwnProperty(i) && (r[i] = n[i]);
  })(e, t);
}, m1, Fn, y1 = (function(e) {
  /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  (function() {
    var t = {}.hasOwnProperty;
    function r() {
      for (var n = [], i = 0; i < arguments.length; i++) {
        var a = arguments[i];
        if (a) {
          var o = typeof a;
          if (o === "string" || o === "number")
            n.push(a);
          else if (Array.isArray(a) && a.length) {
            var s = r.apply(null, a);
            s && n.push(s);
          } else if (o === "object")
            for (var l in a)
              t.call(a, l) && a[l] && n.push(l);
        }
      }
      return n.join(" ");
    }
    e.exports ? (r.default = r, e.exports = r) : window.classNames = r;
  })();
}(Fn = { path: m1, exports: {}, require: function(e, t) {
  return function() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
  }(t == null && Fn.path);
} }, Fn.exports), Fn.exports);
function Io(e, t, r) {
  var n, i, a, o, s;
  function l() {
    var d = Date.now() - o;
    d < t && d >= 0 ? n = setTimeout(l, t - d) : (n = null, r || (s = e.apply(a, i), a = i = null));
  }
  t == null && (t = 100);
  var f = function() {
    a = this, i = arguments, o = Date.now();
    var d = r && !n;
    return n || (n = setTimeout(l, t)), d && (s = e.apply(a, i), a = i = null), s;
  };
  return f.clear = function() {
    n && (clearTimeout(n), n = null);
  }, f.flush = function() {
    n && (s = e.apply(a, i), a = i = null, clearTimeout(n), n = null);
  }, f;
}
Io.debounce = Io;
var b1 = Io;
(function(e, t) {
  t === void 0 && (t = {});
  var r = t.insertAt;
  if (e && typeof document < "u") {
    var n = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
    i.type = "text/css", r === "top" && n.firstChild ? n.insertBefore(i, n.firstChild) : n.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e));
  }
})(`.indiana-scroll-container {
  overflow: auto; }
  .indiana-scroll-container--dragging {
    scroll-behavior: auto !important; }
    .indiana-scroll-container--dragging > * {
      pointer-events: none;
      cursor: -webkit-grab;
      cursor: grab; }
  .indiana-scroll-container--hide-scrollbars {
    overflow: hidden;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
    scrollbar-width: none; }
    .indiana-scroll-container--hide-scrollbars::-webkit-scrollbar {
      display: none !important;
      height: 0 !important;
      width: 0 !important;
      background: transparent !important;
      -webkit-appearance: none !important; }
  .indiana-scroll-container--native-scroll {
    overflow: auto; }

.indiana-dragging {
  cursor: -webkit-grab;
  cursor: grab; }
`);
var ja, w1 = (ja = "indiana-scroll-container", function(e, t) {
  if (!e)
    return ja;
  var r;
  typeof e == "string" ? r = e : t = e;
  var n = ja;
  return r && (n += "__" + r), n + (t ? Object.keys(t).reduce(function(i, a) {
    var o = t[a];
    return o && (i += " " + (typeof o == "boolean" ? n + "--" + a : n + "--" + a + "_" + o)), i;
  }, "") : "");
}), x1 = function(e) {
  function t(r) {
    var n = e.call(this, r) || this;
    return n.onEndScroll = function() {
      n.scrolling = !1, !n.pressed && n.started && n.processEnd();
    }, n.onScroll = function(i) {
      var a = n.container.current;
      a.scrollLeft === n.scrollLeft && a.scrollTop === n.scrollTop || (n.scrolling = !0, n.processScroll(i), n.onEndScroll());
    }, n.onTouchStart = function(i) {
      var a = n.props.nativeMobileScroll;
      if (n.isDraggable(i.target))
        if (n.internal = !0, a && n.scrolling)
          n.pressed = !0;
        else {
          var o = i.touches[0];
          n.processClick(i, o.clientX, o.clientY), !a && n.props.stopPropagation && i.stopPropagation();
        }
    }, n.onTouchEnd = function(i) {
      var a = n.props.nativeMobileScroll;
      n.pressed && (!n.started || n.scrolling && a ? n.pressed = !1 : n.processEnd(), n.forceUpdate());
    }, n.onTouchMove = function(i) {
      var a = n.props.nativeMobileScroll;
      if (n.pressed && (!a || !n.isMobile)) {
        var o = i.touches[0];
        o && n.processMove(i, o.clientX, o.clientY), i.preventDefault(), n.props.stopPropagation && i.stopPropagation();
      }
    }, n.onMouseDown = function(i) {
      n.isDraggable(i.target) && n.isScrollable() && (n.internal = !0, n.props.buttons.indexOf(i.button) !== -1 && (n.processClick(i, i.clientX, i.clientY), i.preventDefault(), n.props.stopPropagation && i.stopPropagation()));
    }, n.onMouseMove = function(i) {
      n.pressed && (n.processMove(i, i.clientX, i.clientY), i.preventDefault(), n.props.stopPropagation && i.stopPropagation());
    }, n.onMouseUp = function(i) {
      n.pressed && (n.started ? n.processEnd() : (n.internal = !1, n.pressed = !1, n.forceUpdate(), n.props.onClick && n.props.onClick(i)), i.preventDefault(), n.props.stopPropagation && i.stopPropagation());
    }, n.container = Ce.createRef(), n.onEndScroll = b1(n.onEndScroll, 300), n.scrolling = !1, n.started = !1, n.pressed = !1, n.internal = !1, n.getRef = n.getRef.bind(n), n;
  }
  return function(r, n) {
    function i() {
      this.constructor = r;
    }
    Ld(r, n), r.prototype = n === null ? Object.create(n) : (i.prototype = n.prototype, new i());
  }(t, e), t.prototype.componentDidMount = function() {
    var r = this.props.nativeMobileScroll, n = this.container.current;
    window.addEventListener("mouseup", this.onMouseUp), window.addEventListener("mousemove", this.onMouseMove), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd), n.addEventListener("touchstart", this.onTouchStart, { passive: !1 }), n.addEventListener("mousedown", this.onMouseDown, { passive: !1 }), r && (this.isMobile = this.isMobileDevice(), this.isMobile && this.forceUpdate());
  }, t.prototype.componentWillUnmount = function() {
    window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
  }, t.prototype.getElement = function() {
    return this.container.current;
  }, t.prototype.isMobileDevice = function() {
    return window.orientation !== void 0 || navigator.userAgent.indexOf("IEMobile") !== -1;
  }, t.prototype.isDraggable = function(r) {
    var n = this.props.ignoreElements;
    if (n) {
      var i = r.closest(n);
      return i === null || i.contains(this.getElement());
    }
    return !0;
  }, t.prototype.isScrollable = function() {
    var r = this.container.current;
    return r && (r.scrollWidth > r.clientWidth || r.scrollHeight > r.clientHeight);
  }, t.prototype.processClick = function(r, n, i) {
    var a = this.container.current;
    this.scrollLeft = a.scrollLeft, this.scrollTop = a.scrollTop, this.clientX = n, this.clientY = i, this.pressed = !0;
  }, t.prototype.processStart = function(r) {
    r === void 0 && (r = !0);
    var n = this.props.onStartScroll;
    this.started = !0, r && document.body.classList.add("indiana-dragging"), n && n({ external: !this.internal }), this.forceUpdate();
  }, t.prototype.processScroll = function(r) {
    if (this.started) {
      var n = this.props.onScroll;
      n && n({ external: !this.internal });
    } else
      this.processStart(!1);
  }, t.prototype.processMove = function(r, n, i) {
    var a = this.props, o = a.horizontal, s = a.vertical, l = a.activationDistance, f = a.onScroll, d = this.container.current;
    this.started ? (o && (d.scrollLeft -= n - this.clientX), s && (d.scrollTop -= i - this.clientY), f && f({ external: !this.internal }), this.clientX = n, this.clientY = i, this.scrollLeft = d.scrollLeft, this.scrollTop = d.scrollTop) : (o && Math.abs(n - this.clientX) > l || s && Math.abs(i - this.clientY) > l) && (this.clientX = n, this.clientY = i, this.processStart());
  }, t.prototype.processEnd = function() {
    var r = this.props.onEndScroll;
    this.container.current && r && r({ external: !this.internal }), this.pressed = !1, this.started = !1, this.scrolling = !1, this.internal = !1, document.body.classList.remove("indiana-dragging"), this.forceUpdate();
  }, t.prototype.getRef = function(r) {
    [this.container, this.props.innerRef].forEach(function(n) {
      n && (typeof n == "function" ? n(r) : n.current = r);
    });
  }, t.prototype.render = function() {
    var r = this.props, n = r.children, i = r.draggingClassName, a = r.className, o = r.style, s = r.hideScrollbars, l = r.component;
    return Ce.createElement(l, { className: y1(a, this.pressed && i, w1({ dragging: this.pressed, "hide-scrollbars": s, "native-scroll": this.isMobile })), style: o, ref: this.getRef, onScroll: this.onScroll }, n);
  }, t.defaultProps = { nativeMobileScroll: !0, hideScrollbars: !0, activationDistance: 10, vertical: !0, horizontal: !0, stopPropagation: !1, style: {}, component: "div", buttons: [0] }, t;
}(Op);
const wA = ({
  sectionTitles: e = [],
  sectionKeys: t = [],
  sortItems: r = [],
  setShowFilters: n,
  setShowAdd: i,
  setShowUpload: a,
  section: o,
  sort: s,
  setSection: l = null,
  setSort: f,
  showFilters: d = !1,
  showAdd: c = !1,
  showSort: u = !1,
  showUpload: h = !1,
  className: y = ""
}) => {
  const { t: g } = er(), b = Ie(), v = Ie(), m = Ie(), [x, p] = Ke(!1), [w, S] = Ke(!1), [E, A] = Ke(0), j = () => {
    if (!m || !m.current || !t || !t.length)
      return 0;
    let k = 0;
    const I = m.current.querySelectorAll("button");
    for (let R = 0; R < I.length; R++)
      k += I[R].offsetWidth + 18;
    return k;
  }, _ = (k) => {
    l && l(t[k]);
  }, O = () => {
    v.current.scrollLeft > 30 ? S(!0) : S(!1), v.current.offsetWidth - v.current.scrollLeft > 30 ? p(!0) : p(!1);
  }, N = (k, I) => {
    k === "left" ? v.current.scrollLeft -= I : v.current.scrollLeft += I;
  };
  return Me(() => {
    A(j());
  }, [
    t,
    e,
    m
  ]), Me(() => (v != null && v.current && v.current.addEventListener("scroll", O), () => {
    v != null && v.current && v.current.removeEventListener("scroll", O);
  }), [v]), Me(() => {
    b != null && b.current && E > b.current.offsetWidth && p(!0);
  }, [b, m, v]), /* @__PURE__ */ L.jsxs("div", { className: `flex relative w-full px-4 mt-2 border-b border-border-section-header ${y}`, children: [
    /* @__PURE__ */ L.jsxs("div", { className: "flex-1 max-w-full", children: [
      x && /* @__PURE__ */ L.jsx("div", { className: "flex justify-end items-center h-full top-0 right-0 w-24 absolute bg-gradient-to-l from-white to-transparent z-10", children: /* @__PURE__ */ L.jsx(
        Ty,
        {
          className: "text-main cursor-pointer",
          onClick: () => N("right", 50)
        }
      ) }),
      w && /* @__PURE__ */ L.jsx("div", { className: "flex justify-start items-center h-full top-0 left-0 w-24 absolute bg-gradient-to-r from-white to-transparent z-10", children: /* @__PURE__ */ L.jsx(
        _y,
        {
          className: "text-main cursor-pointer",
          onClick: () => N("left", 50)
        }
      ) }),
      /* @__PURE__ */ L.jsx("div", { className: "flex max-w-full", ref: b, children: /* @__PURE__ */ L.jsx(
        x1,
        {
          className: "cursor-grab active:cursor-grabbing w-full",
          horizontal: !0,
          hideScrollbars: !0,
          innerRef: v,
          children: /* @__PURE__ */ L.jsx(
            "div",
            {
              ref: m,
              className: "min-w-full",
              style: { width: E },
              children: e.map((k, I) => /* @__PURE__ */ L.jsx(
                "button",
                {
                  onClick: () => _(I),
                  className: `select-none text-sm mr-4 outline-none focus:outline-none ${o === t[I] ? "text-text-section-header-active-item font-semibold" : "text-gray font-medium"}`,
                  children: k
                },
                k
              ))
            }
          )
        }
      ) })
    ] }),
    (d || c || u || h) && /* @__PURE__ */ L.jsxs("div", { className: "flex", children: [
      u && /* @__PURE__ */ L.jsx(
        jd,
        {
          isClearable: !1,
          placeholder: g("sort_by"),
          sort: "true",
          initialValues: [{ id: s, value: g(`sort_${s}`) }],
          items: r,
          onSelect: (k) => {
            f(String(k[0].id));
          }
        }
      ),
      d && /* @__PURE__ */ L.jsx("span", { className: "inline-block relative -top-1", children: /* @__PURE__ */ L.jsx(
        ka,
        {
          width: "8",
          height: "8",
          shadow: "hover",
          shadowHover: "inner",
          iconWidth: "4",
          icon: p1,
          onClick: () => n(!0)
        }
      ) }),
      c && /* @__PURE__ */ L.jsx(
        ka,
        {
          width: "8",
          height: "8",
          shadow: "hover",
          shadowHover: "inner",
          iconWidth: "4",
          icon: v1,
          onClick: () => i(!0)
        }
      ),
      h && /* @__PURE__ */ L.jsx(
        ka,
        {
          width: "8",
          height: "8",
          shadow: "hover",
          shadowHover: "inner",
          iconWidth: "5",
          icon: g1,
          onClick: () => a(!0)
        }
      )
    ] })
  ] });
};
function Ar(e, t, r, n) {
  function i(a) {
    return a instanceof r ? a : new r(function(o) {
      o(a);
    });
  }
  return new (r || (r = Promise))(function(a, o) {
    function s(d) {
      try {
        f(n.next(d));
      } catch (c) {
        o(c);
      }
    }
    function l(d) {
      try {
        f(n.throw(d));
      } catch (c) {
        o(c);
      }
    }
    function f(d) {
      d.done ? a(d.value) : i(d.value).then(s, l);
    }
    f((n = n.apply(e, t || [])).next());
  });
}
function kr(e, t) {
  var r = { label: 0, sent: function() {
    if (a[0] & 1)
      throw a[1];
    return a[1];
  }, trys: [], ops: [] }, n, i, a, o;
  return o = { next: s(0), throw: s(1), return: s(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function s(f) {
    return function(d) {
      return l([f, d]);
    };
  }
  function l(f) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, f[0] && (r = 0)), r; )
      try {
        if (n = 1, i && (a = f[0] & 2 ? i.return : f[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, f[1])).done)
          return a;
        switch (i = 0, a && (f = [f[0] & 2, a.value]), f[0]) {
          case 0:
          case 1:
            a = f;
            break;
          case 4:
            return r.label++, { value: f[1], done: !1 };
          case 5:
            r.label++, i = f[1], f = [0];
            continue;
          case 7:
            f = r.ops.pop(), r.trys.pop();
            continue;
          default:
            if (a = r.trys, !(a = a.length > 0 && a[a.length - 1]) && (f[0] === 6 || f[0] === 2)) {
              r = 0;
              continue;
            }
            if (f[0] === 3 && (!a || f[1] > a[0] && f[1] < a[3])) {
              r.label = f[1];
              break;
            }
            if (f[0] === 6 && r.label < a[1]) {
              r.label = a[1], a = f;
              break;
            }
            if (a && r.label < a[2]) {
              r.label = a[2], r.ops.push(f);
              break;
            }
            a[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        f = t.call(e, r);
      } catch (d) {
        f = [6, d], i = 0;
      } finally {
        n = a = 0;
      }
    if (f[0] & 5)
      throw f[1];
    return { value: f[0] ? f[1] : void 0, done: !0 };
  }
}
function zu(e, t) {
  var r = typeof Symbol == "function" && e[Symbol.iterator];
  if (!r)
    return e;
  var n = r.call(e), i, a = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = n.next()).done; )
      a.push(i.value);
  } catch (s) {
    o = { error: s };
  } finally {
    try {
      i && !i.done && (r = n.return) && r.call(n);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return a;
}
function Fu(e, t, r) {
  if (r || arguments.length === 2)
    for (var n = 0, i = t.length, a; n < i; n++)
      (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var O1 = /* @__PURE__ */ new Map([
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  ["aac", "audio/aac"],
  ["abw", "application/x-abiword"],
  ["arc", "application/x-freearc"],
  ["avif", "image/avif"],
  ["avi", "video/x-msvideo"],
  ["azw", "application/vnd.amazon.ebook"],
  ["bin", "application/octet-stream"],
  ["bmp", "image/bmp"],
  ["bz", "application/x-bzip"],
  ["bz2", "application/x-bzip2"],
  ["cda", "application/x-cdf"],
  ["csh", "application/x-csh"],
  ["css", "text/css"],
  ["csv", "text/csv"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["eot", "application/vnd.ms-fontobject"],
  ["epub", "application/epub+zip"],
  ["gz", "application/gzip"],
  ["gif", "image/gif"],
  ["heic", "image/heic"],
  ["heif", "image/heif"],
  ["htm", "text/html"],
  ["html", "text/html"],
  ["ico", "image/vnd.microsoft.icon"],
  ["ics", "text/calendar"],
  ["jar", "application/java-archive"],
  ["jpeg", "image/jpeg"],
  ["jpg", "image/jpeg"],
  ["js", "text/javascript"],
  ["json", "application/json"],
  ["jsonld", "application/ld+json"],
  ["mid", "audio/midi"],
  ["midi", "audio/midi"],
  ["mjs", "text/javascript"],
  ["mp3", "audio/mpeg"],
  ["mp4", "video/mp4"],
  ["mpeg", "video/mpeg"],
  ["mpkg", "application/vnd.apple.installer+xml"],
  ["odp", "application/vnd.oasis.opendocument.presentation"],
  ["ods", "application/vnd.oasis.opendocument.spreadsheet"],
  ["odt", "application/vnd.oasis.opendocument.text"],
  ["oga", "audio/ogg"],
  ["ogv", "video/ogg"],
  ["ogx", "application/ogg"],
  ["opus", "audio/opus"],
  ["otf", "font/otf"],
  ["png", "image/png"],
  ["pdf", "application/pdf"],
  ["php", "application/x-httpd-php"],
  ["ppt", "application/vnd.ms-powerpoint"],
  ["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
  ["rar", "application/vnd.rar"],
  ["rtf", "application/rtf"],
  ["sh", "application/x-sh"],
  ["svg", "image/svg+xml"],
  ["swf", "application/x-shockwave-flash"],
  ["tar", "application/x-tar"],
  ["tif", "image/tiff"],
  ["tiff", "image/tiff"],
  ["ts", "video/mp2t"],
  ["ttf", "font/ttf"],
  ["txt", "text/plain"],
  ["vsd", "application/vnd.visio"],
  ["wav", "audio/wav"],
  ["weba", "audio/webm"],
  ["webm", "video/webm"],
  ["webp", "image/webp"],
  ["woff", "font/woff"],
  ["woff2", "font/woff2"],
  ["xhtml", "application/xhtml+xml"],
  ["xls", "application/vnd.ms-excel"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["xml", "application/xml"],
  ["xul", "application/vnd.mozilla.xul+xml"],
  ["zip", "application/zip"],
  ["7z", "application/x-7z-compressed"],
  // Others
  ["mkv", "video/x-matroska"],
  ["mov", "video/quicktime"],
  ["msg", "application/vnd.ms-outlook"]
]);
function bn(e, t) {
  var r = E1(e);
  if (typeof r.path != "string") {
    var n = e.webkitRelativePath;
    Object.defineProperty(r, "path", {
      value: typeof t == "string" ? t : typeof n == "string" && n.length > 0 ? n : e.name,
      writable: !1,
      configurable: !1,
      enumerable: !0
    });
  }
  return r;
}
function E1(e) {
  var t = e.name, r = t && t.lastIndexOf(".") !== -1;
  if (r && !e.type) {
    var n = t.split(".").pop().toLowerCase(), i = O1.get(n);
    i && Object.defineProperty(e, "type", {
      value: i,
      writable: !1,
      configurable: !1,
      enumerable: !0
    });
  }
  return e;
}
var S1 = [
  // Thumbnail cache files for macOS and Windows
  ".DS_Store",
  "Thumbs.db"
  // Windows
];
function _1(e) {
  return Ar(this, void 0, void 0, function() {
    return kr(this, function(t) {
      return Si(e) && T1(e.dataTransfer) ? [2, j1(e.dataTransfer, e.type)] : N1(e) ? [2, A1(e)] : Array.isArray(e) && e.every(function(r) {
        return "getFile" in r && typeof r.getFile == "function";
      }) ? [2, k1(e)] : [2, []];
    });
  });
}
function T1(e) {
  return Si(e);
}
function N1(e) {
  return Si(e) && Si(e.target);
}
function Si(e) {
  return typeof e == "object" && e !== null;
}
function A1(e) {
  return Lo(e.target.files).map(function(t) {
    return bn(t);
  });
}
function k1(e) {
  return Ar(this, void 0, void 0, function() {
    var t;
    return kr(this, function(r) {
      switch (r.label) {
        case 0:
          return [4, Promise.all(e.map(function(n) {
            return n.getFile();
          }))];
        case 1:
          return t = r.sent(), [2, t.map(function(n) {
            return bn(n);
          })];
      }
    });
  });
}
function j1(e, t) {
  return Ar(this, void 0, void 0, function() {
    var r, n;
    return kr(this, function(i) {
      switch (i.label) {
        case 0:
          return e.items ? (r = Lo(e.items).filter(function(a) {
            return a.kind === "file";
          }), t !== "drop" ? [2, r] : [4, Promise.all(r.map(P1))]) : [3, 2];
        case 1:
          return n = i.sent(), [2, Bu(Md(n))];
        case 2:
          return [2, Bu(Lo(e.files).map(function(a) {
            return bn(a);
          }))];
      }
    });
  });
}
function Bu(e) {
  return e.filter(function(t) {
    return S1.indexOf(t.name) === -1;
  });
}
function Lo(e) {
  if (e === null)
    return [];
  for (var t = [], r = 0; r < e.length; r++) {
    var n = e[r];
    t.push(n);
  }
  return t;
}
function P1(e) {
  if (typeof e.webkitGetAsEntry != "function")
    return qu(e);
  var t = e.webkitGetAsEntry();
  return t && t.isDirectory ? Dd(t) : qu(e);
}
function Md(e) {
  return e.reduce(function(t, r) {
    return Fu(Fu([], zu(t), !1), zu(Array.isArray(r) ? Md(r) : [r]), !1);
  }, []);
}
function qu(e) {
  var t = e.getAsFile();
  if (!t)
    return Promise.reject("".concat(e, " is not a File"));
  var r = bn(t);
  return Promise.resolve(r);
}
function C1(e) {
  return Ar(this, void 0, void 0, function() {
    return kr(this, function(t) {
      return [2, e.isDirectory ? Dd(e) : I1(e)];
    });
  });
}
function Dd(e) {
  var t = e.createReader();
  return new Promise(function(r, n) {
    var i = [];
    function a() {
      var o = this;
      t.readEntries(function(s) {
        return Ar(o, void 0, void 0, function() {
          var l, f, d;
          return kr(this, function(c) {
            switch (c.label) {
              case 0:
                if (s.length)
                  return [3, 5];
                c.label = 1;
              case 1:
                return c.trys.push([1, 3, , 4]), [4, Promise.all(i)];
              case 2:
                return l = c.sent(), r(l), [3, 4];
              case 3:
                return f = c.sent(), n(f), [3, 4];
              case 4:
                return [3, 6];
              case 5:
                d = Promise.all(s.map(C1)), i.push(d), a(), c.label = 6;
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, function(s) {
        n(s);
      });
    }
    a();
  });
}
function I1(e) {
  return Ar(this, void 0, void 0, function() {
    return kr(this, function(t) {
      return [2, new Promise(function(r, n) {
        e.file(function(i) {
          var a = bn(i, e.fullPath);
          r(a);
        }, function(i) {
          n(i);
        });
      })];
    });
  });
}
var L1 = function(e, t) {
  if (e && t) {
    var r = Array.isArray(t) ? t : t.split(","), n = e.name || "", i = (e.type || "").toLowerCase(), a = i.replace(/\/.*$/, "");
    return r.some(function(o) {
      var s = o.trim().toLowerCase();
      return s.charAt(0) === "." ? n.toLowerCase().endsWith(s) : s.endsWith("/*") ? a === s.replace(/\/.*$/, "") : i === s;
    });
  }
  return !0;
};
function Uu(e) {
  return R1(e) || D1(e) || $d(e) || M1();
}
function M1() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function D1(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function R1(e) {
  if (Array.isArray(e))
    return Mo(e);
}
function Hu(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Hu(Object(r), !0).forEach(function(n) {
      Rd(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Hu(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Rd(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function pn(e, t) {
  return F1(e) || z1(e, t) || $d(e, t) || $1();
}
function $1() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function $d(e, t) {
  if (e) {
    if (typeof e == "string")
      return Mo(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Mo(e, t);
  }
}
function Mo(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function z1(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n = [], i = !0, a = !1, o, s;
    try {
      for (r = r.call(e); !(i = (o = r.next()).done) && (n.push(o.value), !(t && n.length === t)); i = !0)
        ;
    } catch (l) {
      a = !0, s = l;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (a)
          throw s;
      }
    }
    return n;
  }
}
function F1(e) {
  if (Array.isArray(e))
    return e;
}
var B1 = "file-invalid-type", q1 = "file-too-large", U1 = "file-too-small", H1 = "too-many-files", W1 = function(t) {
  t = Array.isArray(t) && t.length === 1 ? t[0] : t;
  var r = Array.isArray(t) ? "one of ".concat(t.join(", ")) : t;
  return {
    code: B1,
    message: "File type must be ".concat(r)
  };
}, Yu = function(t) {
  return {
    code: q1,
    message: "File is larger than ".concat(t, " ").concat(t === 1 ? "byte" : "bytes")
  };
}, Vu = function(t) {
  return {
    code: U1,
    message: "File is smaller than ".concat(t, " ").concat(t === 1 ? "byte" : "bytes")
  };
}, Y1 = {
  code: H1,
  message: "Too many files"
};
function zd(e, t) {
  var r = e.type === "application/x-moz-file" || L1(e, t);
  return [r, r ? null : W1(t)];
}
function Fd(e, t, r) {
  if (Ut(e.size))
    if (Ut(t) && Ut(r)) {
      if (e.size > r)
        return [!1, Yu(r)];
      if (e.size < t)
        return [!1, Vu(t)];
    } else {
      if (Ut(t) && e.size < t)
        return [!1, Vu(t)];
      if (Ut(r) && e.size > r)
        return [!1, Yu(r)];
    }
  return [!0, null];
}
function Ut(e) {
  return e != null;
}
function V1(e) {
  var t = e.files, r = e.accept, n = e.minSize, i = e.maxSize, a = e.multiple, o = e.maxFiles, s = e.validator;
  return !a && t.length > 1 || a && o >= 1 && t.length > o ? !1 : t.every(function(l) {
    var f = zd(l, r), d = pn(f, 1), c = d[0], u = Fd(l, n, i), h = pn(u, 1), y = h[0], g = s ? s(l) : null;
    return c && y && !g;
  });
}
function _i(e) {
  return typeof e.isPropagationStopped == "function" ? e.isPropagationStopped() : typeof e.cancelBubble < "u" ? e.cancelBubble : !1;
}
function Bn(e) {
  return e.dataTransfer ? Array.prototype.some.call(e.dataTransfer.types, function(t) {
    return t === "Files" || t === "application/x-moz-file";
  }) : !!e.target && !!e.target.files;
}
function Gu(e) {
  e.preventDefault();
}
function G1(e) {
  return e.indexOf("MSIE") !== -1 || e.indexOf("Trident/") !== -1;
}
function K1(e) {
  return e.indexOf("Edge/") !== -1;
}
function Z1() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
  return G1(e) || K1(e);
}
function pt() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return function(n) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      a[o - 1] = arguments[o];
    return t.some(function(s) {
      return !_i(n) && s && s.apply(void 0, [n].concat(a)), _i(n);
    });
  };
}
function Q1() {
  return "showOpenFilePicker" in window;
}
function X1(e) {
  if (Ut(e)) {
    var t = Object.entries(e).filter(function(r) {
      var n = pn(r, 2), i = n[0], a = n[1], o = !0;
      return Bd(i) || (console.warn('Skipped "'.concat(i, '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')), o = !1), (!Array.isArray(a) || !a.every(qd)) && (console.warn('Skipped "'.concat(i, '" because an invalid file extension was provided.')), o = !1), o;
    }).reduce(function(r, n) {
      var i = pn(n, 2), a = i[0], o = i[1];
      return Wu(Wu({}, r), {}, Rd({}, a, o));
    }, {});
    return [{
      // description is required due to https://crbug.com/1264708
      description: "Files",
      accept: t
    }];
  }
  return e;
}
function J1(e) {
  if (Ut(e))
    return Object.entries(e).reduce(function(t, r) {
      var n = pn(r, 2), i = n[0], a = n[1];
      return [].concat(Uu(t), [i], Uu(a));
    }, []).filter(function(t) {
      return Bd(t) || qd(t);
    }).join(",");
}
function e0(e) {
  return e instanceof DOMException && (e.name === "AbortError" || e.code === e.ABORT_ERR);
}
function t0(e) {
  return e instanceof DOMException && (e.name === "SecurityError" || e.code === e.SECURITY_ERR);
}
function Bd(e) {
  return e === "audio/*" || e === "video/*" || e === "image/*" || e === "text/*" || /\w+\/[-+.\w]+/g.test(e);
}
function qd(e) {
  return /^.*\.[\w]+$/.test(e);
}
var r0 = ["children"], n0 = ["open"], i0 = ["refKey", "role", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"], a0 = ["refKey", "onChange", "onClick"];
function o0(e) {
  return u0(e) || l0(e) || Ud(e) || s0();
}
function s0() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function l0(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function u0(e) {
  if (Array.isArray(e))
    return Do(e);
}
function Pa(e, t) {
  return d0(e) || f0(e, t) || Ud(e, t) || c0();
}
function c0() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Ud(e, t) {
  if (e) {
    if (typeof e == "string")
      return Do(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Do(e, t);
  }
}
function Do(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function f0(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n = [], i = !0, a = !1, o, s;
    try {
      for (r = r.call(e); !(i = (o = r.next()).done) && (n.push(o.value), !(t && n.length === t)); i = !0)
        ;
    } catch (l) {
      a = !0, s = l;
    } finally {
      try {
        !i && r.return != null && r.return();
      } finally {
        if (a)
          throw s;
      }
    }
    return n;
  }
}
function d0(e) {
  if (Array.isArray(e))
    return e;
}
function Ku(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function De(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Ku(Object(r), !0).forEach(function(n) {
      Ro(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ku(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ro(e, t, r) {
  return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ti(e, t) {
  if (e == null)
    return {};
  var r = h0(e, t), n, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      n = a[i], !(t.indexOf(n) >= 0) && Object.prototype.propertyIsEnumerable.call(e, n) && (r[n] = e[n]);
  }
  return r;
}
function h0(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), i, a;
  for (a = 0; a < n.length; a++)
    i = n[a], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
var Ls = /* @__PURE__ */ Ef(function(e, t) {
  var r = e.children, n = Ti(e, r0), i = Wd(n), a = i.open, o = Ti(i, n0);
  return Sp(t, function() {
    return {
      open: a
    };
  }, [a]), /* @__PURE__ */ Ce.createElement(_p, null, r(De(De({}, o), {}, {
    open: a
  })));
});
Ls.displayName = "Dropzone";
var Hd = {
  disabled: !1,
  getFilesFromEvent: _1,
  maxSize: 1 / 0,
  minSize: 0,
  multiple: !0,
  maxFiles: 0,
  preventDropOnDocument: !0,
  noClick: !1,
  noKeyboard: !1,
  noDrag: !1,
  noDragEventsBubbling: !1,
  validator: null,
  useFsAccessApi: !0,
  autoFocus: !1
};
Ls.defaultProps = Hd;
Ls.propTypes = {
  /**
   * Render function that exposes the dropzone state and prop getter fns
   *
   * @param {object} params
   * @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
   * @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
   * @param {Function} params.open Open the native file selection dialog
   * @param {boolean} params.isFocused Dropzone area is in focus
   * @param {boolean} params.isFileDialogActive File dialog is opened
   * @param {boolean} params.isDragActive Active drag is in progress
   * @param {boolean} params.isDragAccept Dragged files are accepted
   * @param {boolean} params.isDragReject Some dragged files are rejected
   * @param {File[]} params.acceptedFiles Accepted files
   * @param {FileRejection[]} params.fileRejections Rejected files and why they were rejected
   */
  children: ee.func,
  /**
   * Set accepted file types.
   * Checkout https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker types option for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all (https://github.com/react-dropzone/react-dropzone/issues/276).
   */
  accept: ee.objectOf(ee.arrayOf(ee.string)),
  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: ee.bool,
  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: ee.bool,
  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: ee.bool,
  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: ee.bool,
  /**
   * If true, disables drag 'n' drop
   */
  noDrag: ee.bool,
  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: ee.bool,
  /**
   * Minimum file size (in bytes)
   */
  minSize: ee.number,
  /**
   * Maximum file size (in bytes)
   */
  maxSize: ee.number,
  /**
   * Maximum accepted number of files
   * The default value is 0 which means there is no limitation to how many files are accepted.
   */
  maxFiles: ee.number,
  /**
   * Enable/disable the dropzone
   */
  disabled: ee.bool,
  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: ee.func,
  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: ee.func,
  /**
   * Cb for when opening the file dialog
   */
  onFileDialogOpen: ee.func,
  /**
   * Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   * to open the file picker instead of using an `<input type="file">` click event.
   */
  useFsAccessApi: ee.bool,
  /**
   * Set to true to focus the root element on render
   */
  autoFocus: ee.bool,
  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: ee.func,
  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: ee.func,
  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: ee.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that this callback is invoked after the `getFilesFromEvent` callback is done.
   *
   * Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
   * `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
   * If `multiple` is set to false and additional files are dropped,
   * all files besides the first will be rejected.
   * Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
   *
   * Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
   * If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
   *
   * `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
   * For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
   *
   * ```js
   * function onDrop(acceptedFiles) {
   *   const req = request.post('/upload')
   *   acceptedFiles.forEach(file => {
   *     req.attach(file.name, file)
   *   })
   *   req.end(callback)
   * }
   * ```
   *
   * @param {File[]} acceptedFiles
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  onDrop: ee.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: ee.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: ee.func,
  /**
   * Cb for when there's some error from any of the promises.
   *
   * @param {Error} error
   */
  onError: ee.func,
  /**
   * Custom validation function. It must return null if there's no errors.
   * @param {File} file
   * @returns {FileError|FileError[]|null}
   */
  validator: ee.func
};
var $o = {
  isFocused: !1,
  isFileDialogActive: !1,
  isDragActive: !1,
  isDragAccept: !1,
  isDragReject: !1,
  acceptedFiles: [],
  fileRejections: []
};
function Wd() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = De(De({}, Hd), e), r = t.accept, n = t.disabled, i = t.getFilesFromEvent, a = t.maxSize, o = t.minSize, s = t.multiple, l = t.maxFiles, f = t.onDragEnter, d = t.onDragLeave, c = t.onDragOver, u = t.onDrop, h = t.onDropAccepted, y = t.onDropRejected, g = t.onFileDialogCancel, b = t.onFileDialogOpen, v = t.useFsAccessApi, m = t.autoFocus, x = t.preventDropOnDocument, p = t.noClick, w = t.noKeyboard, S = t.noDrag, E = t.noDragEventsBubbling, A = t.onError, j = t.validator, _ = Et(function() {
    return J1(r);
  }, [r]), O = Et(function() {
    return X1(r);
  }, [r]), N = Et(function() {
    return typeof b == "function" ? b : Zu;
  }, [b]), k = Et(function() {
    return typeof g == "function" ? g : Zu;
  }, [g]), I = Ie(null), R = Ie(null), H = Ep(p0, $o), U = Pa(H, 2), G = U[0], q = U[1], P = G.isFocused, T = G.isFileDialogActive, M = Ie(typeof window < "u" && window.isSecureContext && v && Q1()), D = function() {
    !M.current && T && setTimeout(function() {
      if (R.current) {
        var ne = R.current.files;
        ne.length || (q({
          type: "closeDialog"
        }), k());
      }
    }, 300);
  };
  Me(function() {
    return window.addEventListener("focus", D, !1), function() {
      window.removeEventListener("focus", D, !1);
    };
  }, [R, T, k, M]);
  var F = Ie([]), z = function(ne) {
    I.current && I.current.contains(ne.target) || (ne.preventDefault(), F.current = []);
  };
  Me(function() {
    return x && (document.addEventListener("dragover", Gu, !1), document.addEventListener("drop", z, !1)), function() {
      x && (document.removeEventListener("dragover", Gu), document.removeEventListener("drop", z));
    };
  }, [I, x]), Me(function() {
    return !n && m && I.current && I.current.focus(), function() {
    };
  }, [I, m, n]);
  var C = Re(function(X) {
    A ? A(X) : console.error(X);
  }, [A]), $ = Re(function(X) {
    X.preventDefault(), X.persist(), ie(X), F.current = [].concat(o0(F.current), [X.target]), Bn(X) && Promise.resolve(i(X)).then(function(ne) {
      if (!(_i(X) && !E)) {
        var ge = ne.length, ye = ge > 0 && V1({
          files: ne,
          accept: _,
          minSize: o,
          maxSize: a,
          multiple: s,
          maxFiles: l,
          validator: j
        }), pe = ge > 0 && !ye;
        q({
          isDragAccept: ye,
          isDragReject: pe,
          isDragActive: !0,
          type: "setDraggedFiles"
        }), f && f(X);
      }
    }).catch(function(ne) {
      return C(ne);
    });
  }, [i, f, C, E, _, o, a, s, l, j]), W = Re(function(X) {
    X.preventDefault(), X.persist(), ie(X);
    var ne = Bn(X);
    if (ne && X.dataTransfer)
      try {
        X.dataTransfer.dropEffect = "copy";
      } catch {
      }
    return ne && c && c(X), !1;
  }, [c, E]), Y = Re(function(X) {
    X.preventDefault(), X.persist(), ie(X);
    var ne = F.current.filter(function(ye) {
      return I.current && I.current.contains(ye);
    }), ge = ne.indexOf(X.target);
    ge !== -1 && ne.splice(ge, 1), F.current = ne, !(ne.length > 0) && (q({
      type: "setDraggedFiles",
      isDragActive: !1,
      isDragAccept: !1,
      isDragReject: !1
    }), Bn(X) && d && d(X));
  }, [I, d, E]), V = Re(function(X, ne) {
    var ge = [], ye = [];
    X.forEach(function(pe) {
      var it = zd(pe, _), we = Pa(it, 2), He = we[0], zr = we[1], Fr = Fd(pe, o, a), rr = Pa(Fr, 2), Br = rr[0], qr = rr[1], Ur = j ? j(pe) : null;
      if (He && Br && !Ur)
        ge.push(pe);
      else {
        var Hr = [zr, qr];
        Ur && (Hr = Hr.concat(Ur)), ye.push({
          file: pe,
          errors: Hr.filter(function(Wr) {
            return Wr;
          })
        });
      }
    }), (!s && ge.length > 1 || s && l >= 1 && ge.length > l) && (ge.forEach(function(pe) {
      ye.push({
        file: pe,
        errors: [Y1]
      });
    }), ge.splice(0)), q({
      acceptedFiles: ge,
      fileRejections: ye,
      type: "setFiles"
    }), u && u(ge, ye, ne), ye.length > 0 && y && y(ye, ne), ge.length > 0 && h && h(ge, ne);
  }, [q, s, _, o, a, l, u, h, y, j]), te = Re(function(X) {
    X.preventDefault(), X.persist(), ie(X), F.current = [], Bn(X) && Promise.resolve(i(X)).then(function(ne) {
      _i(X) && !E || V(ne, X);
    }).catch(function(ne) {
      return C(ne);
    }), q({
      type: "reset"
    });
  }, [i, V, C, E]), Z = Re(function() {
    if (M.current) {
      q({
        type: "openDialog"
      }), N();
      var X = {
        multiple: s,
        types: O
      };
      window.showOpenFilePicker(X).then(function(ne) {
        return i(ne);
      }).then(function(ne) {
        V(ne, null), q({
          type: "closeDialog"
        });
      }).catch(function(ne) {
        e0(ne) ? (k(ne), q({
          type: "closeDialog"
        })) : t0(ne) ? (M.current = !1, R.current ? (R.current.value = null, R.current.click()) : C(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))) : C(ne);
      });
      return;
    }
    R.current && (q({
      type: "openDialog"
    }), N(), R.current.value = null, R.current.click());
  }, [q, N, k, v, V, C, O, s]), le = Re(function(X) {
    !I.current || !I.current.isEqualNode(X.target) || (X.key === " " || X.key === "Enter" || X.keyCode === 32 || X.keyCode === 13) && (X.preventDefault(), Z());
  }, [I, Z]), ce = Re(function() {
    q({
      type: "focus"
    });
  }, []), he = Re(function() {
    q({
      type: "blur"
    });
  }, []), Ne = Re(function() {
    p || (Z1() ? setTimeout(Z, 0) : Z());
  }, [p, Z]), Oe = function(ne) {
    return n ? null : ne;
  }, K = function(ne) {
    return w ? null : Oe(ne);
  }, Q = function(ne) {
    return S ? null : Oe(ne);
  }, ie = function(ne) {
    E && ne.stopPropagation();
  }, ae = Et(function() {
    return function() {
      var X = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, ne = X.refKey, ge = ne === void 0 ? "ref" : ne, ye = X.role, pe = X.onKeyDown, it = X.onFocus, we = X.onBlur, He = X.onClick, zr = X.onDragEnter, Fr = X.onDragOver, rr = X.onDragLeave, Br = X.onDrop, qr = Ti(X, i0);
      return De(De(Ro({
        onKeyDown: K(pt(pe, le)),
        onFocus: K(pt(it, ce)),
        onBlur: K(pt(we, he)),
        onClick: Oe(pt(He, Ne)),
        onDragEnter: Q(pt(zr, $)),
        onDragOver: Q(pt(Fr, W)),
        onDragLeave: Q(pt(rr, Y)),
        onDrop: Q(pt(Br, te)),
        role: typeof ye == "string" && ye !== "" ? ye : "presentation"
      }, ge, I), !n && !w ? {
        tabIndex: 0
      } : {}), qr);
    };
  }, [I, le, ce, he, Ne, $, W, Y, te, w, S, n]), J = Re(function(X) {
    X.stopPropagation();
  }, []), de = Et(function() {
    return function() {
      var X = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, ne = X.refKey, ge = ne === void 0 ? "ref" : ne, ye = X.onChange, pe = X.onClick, it = Ti(X, a0), we = Ro({
        accept: _,
        multiple: s,
        type: "file",
        style: {
          display: "none"
        },
        onChange: Oe(pt(ye, te)),
        onClick: Oe(pt(pe, J)),
        tabIndex: -1
      }, ge, R);
      return De(De({}, we), it);
    };
  }, [R, r, s, te, n]);
  return De(De({}, G), {}, {
    isFocused: P && !n,
    getRootProps: ae,
    getInputProps: de,
    rootRef: I,
    inputRef: R,
    open: Oe(Z)
  });
}
function p0(e, t) {
  switch (t.type) {
    case "focus":
      return De(De({}, e), {}, {
        isFocused: !0
      });
    case "blur":
      return De(De({}, e), {}, {
        isFocused: !1
      });
    case "openDialog":
      return De(De({}, $o), {}, {
        isFileDialogActive: !0
      });
    case "closeDialog":
      return De(De({}, e), {}, {
        isFileDialogActive: !1
      });
    case "setDraggedFiles":
      return De(De({}, e), {}, {
        isDragActive: t.isDragActive,
        isDragAccept: t.isDragAccept,
        isDragReject: t.isDragReject
      });
    case "setFiles":
      return De(De({}, e), {}, {
        acceptedFiles: t.acceptedFiles,
        fileRejections: t.fileRejections
      });
    case "reset":
      return De({}, $o);
    default:
      return e;
  }
}
function Zu() {
}
const Qu = {
  border: "2px dashed #4D70B3"
}, v0 = {
  border: "2px dashed rgba(85, 136, 80, 0.2)"
}, g0 = {
  border: "2px dashed rgba(194, 56, 50, 0.2)"
};
function Xu(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM514.1 580.1l-61.8-102.4c-2.2-3.6-6.1-5.8-10.3-5.8h-38.4c-2.3 0-4.5.6-6.4 1.9-5.6 3.5-7.3 10.9-3.7 16.6l82.3 130.4-83.4 132.8a12.04 12.04 0 0 0 10.2 18.4h34.5c4.2 0 8-2.2 10.2-5.7L510 664.8l62.3 101.4c2.2 3.6 6.1 5.7 10.2 5.7H620c2.3 0 4.5-.7 6.5-1.9 5.6-3.6 7.2-11 3.6-16.6l-84-130.4 85.3-132.5a12.04 12.04 0 0 0-10.1-18.5h-35.7c-4.2 0-8.1 2.2-10.3 5.8l-61.2 102.3z" } }] })(e);
}
function Ju(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M424 476c-4.4 0-8 3.6-8 8v276c0 4.4 3.6 8 8 8h32.5c4.4 0 8-3.6 8-8v-95.5h63.3c59.4 0 96.2-38.9 96.2-94.1 0-54.5-36.3-94.3-96-94.3H424zm150.6 94.3c0 43.4-26.5 54.3-71.2 54.3h-38.9V516.2h56.2c33.8 0 53.9 19.7 53.9 54.1zm280-281.7L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" } }] })(e);
}
function ec(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM528.1 472h-32.2c-5.5 0-10.3 3.7-11.6 9.1L434.6 680l-46.1-198.7c-1.3-5.4-6.1-9.3-11.7-9.3h-35.4a12.02 12.02 0 0 0-11.6 15.1l74.2 276c1.4 5.2 6.2 8.9 11.6 8.9h32c5.4 0 10.2-3.6 11.6-8.9l52.8-197 52.8 197c1.4 5.2 6.2 8.9 11.6 8.9h31.8c5.4 0 10.2-3.6 11.6-8.9l74.4-276a12.04 12.04 0 0 0-11.6-15.1H647c-5.6 0-10.4 3.9-11.7 9.3l-45.8 199.1-49.8-199.3c-1.3-5.4-6.1-9.1-11.6-9.1z" } }] })(e);
}
function m0(e) {
  return ze({ tag: "svg", attr: { viewBox: "0 0 16 16", fill: "currentColor" }, child: [{ tag: "path", attr: { fillRule: "evenodd", clipRule: "evenodd", d: "M6 2.984V2h-.09c-.313 0-.616.062-.909.185a2.33 2.33 0 0 0-.775.53 2.23 2.23 0 0 0-.493.753v.001a3.542 3.542 0 0 0-.198.83v.002a6.08 6.08 0 0 0-.024.863c.012.29.018.58.018.869 0 .203-.04.393-.117.572v.001a1.504 1.504 0 0 1-.765.787 1.376 1.376 0 0 1-.558.115H2v.984h.09c.195 0 .38.04.556.121l.001.001c.178.078.329.184.455.318l.002.002c.13.13.233.285.307.465l.001.002c.078.18.117.368.117.566 0 .29-.006.58-.018.869-.012.296-.004.585.024.87v.001c.033.283.099.558.197.824v.001c.106.273.271.524.494.753.223.23.482.407.775.53.293.123.596.185.91.185H6v-.984h-.09c-.2 0-.387-.038-.563-.115a1.613 1.613 0 0 1-.457-.32 1.659 1.659 0 0 1-.309-.467c-.074-.18-.11-.37-.11-.573 0-.228.003-.453.011-.672.008-.228.008-.45 0-.665a4.639 4.639 0 0 0-.055-.64 2.682 2.682 0 0 0-.168-.609A2.284 2.284 0 0 0 3.522 8a2.284 2.284 0 0 0 .738-.955c.08-.192.135-.393.168-.602.033-.21.051-.423.055-.64.008-.22.008-.442 0-.666-.008-.224-.012-.45-.012-.678a1.47 1.47 0 0 1 .877-1.354 1.33 1.33 0 0 1 .563-.121H6zm4 10.032V14h.09c.313 0 .616-.062.909-.185.293-.123.552-.3.775-.53.223-.23.388-.48.493-.753v-.001c.1-.266.165-.543.198-.83v-.002c.028-.28.036-.567.024-.863-.012-.29-.018-.58-.018-.869 0-.203.04-.393.117-.572v-.001a1.502 1.502 0 0 1 .765-.787 1.38 1.38 0 0 1 .558-.115H14v-.984h-.09c-.196 0-.381-.04-.557-.121l-.001-.001a1.376 1.376 0 0 1-.455-.318l-.002-.002a1.415 1.415 0 0 1-.307-.465v-.002a1.405 1.405 0 0 1-.118-.566c0-.29.006-.58.018-.869a6.174 6.174 0 0 0-.024-.87v-.001a3.537 3.537 0 0 0-.197-.824v-.001a2.23 2.23 0 0 0-.494-.753 2.331 2.331 0 0 0-.775-.53 2.325 2.325 0 0 0-.91-.185H10v.984h.09c.2 0 .387.038.562.115.174.082.326.188.457.32.127.134.23.29.309.467.074.18.11.37.11.573 0 .228-.003.452-.011.672-.008.228-.008.45 0 .665.004.222.022.435.055.64.033.214.089.416.168.609a2.285 2.285 0 0 0 .738.955 2.285 2.285 0 0 0-.738.955 2.689 2.689 0 0 0-.168.602c-.033.21-.051.423-.055.64a9.15 9.15 0 0 0 0 .666c.008.224.012.45.012.678a1.471 1.471 0 0 1-.877 1.354 1.33 1.33 0 0 1-.563.121H10z" } }] })(e);
}
const y0 = ({
  documentName: e = "",
  size: t = 55,
  link: r = !1
}) => {
  const n = e.split("."), i = n[n.length - 1], a = {
    default: { icon: /* @__PURE__ */ L.jsx(ky, {}), colorClass: "bg-main" },
    pdf: { icon: /* @__PURE__ */ L.jsx(Eu, {}), colorClass: "bg-rose-600" },
    PDF: { icon: /* @__PURE__ */ L.jsx(Eu, {}), colorClass: "bg-rose-600" },
    docx: { icon: /* @__PURE__ */ L.jsx(ec, {}), colorClass: "bg-indigo-700" },
    doc: { icon: /* @__PURE__ */ L.jsx(ec, {}), colorClass: "bg-indigo-700" },
    json: { icon: /* @__PURE__ */ L.jsx(m0, {}), colorClass: "bg-violet-700" },
    ppt: { icon: /* @__PURE__ */ L.jsx(Ju, {}), colorClass: "bg-yellow-400" },
    pptx: { icon: /* @__PURE__ */ L.jsx(Ju, {}), colorClass: "bg-yellow-400" },
    xls: { icon: /* @__PURE__ */ L.jsx(Xu, {}), colorClass: "bg-emerald-400" },
    xlsx: { icon: /* @__PURE__ */ L.jsx(Xu, {}), colorClass: "bg-emerald-400" },
    mp4: { icon: /* @__PURE__ */ L.jsx(Na, {}), colorClass: "bg-fuchsia-400" },
    avi: { icon: /* @__PURE__ */ L.jsx(Na, {}), colorClass: "bg-fuchsia-400" },
    mov: { icon: /* @__PURE__ */ L.jsx(Na, {}), colorClass: "bg-fuchsia-400" },
    png: { icon: /* @__PURE__ */ L.jsx(lr, {}), colorClass: "bg-teal-400" },
    jpg: { icon: /* @__PURE__ */ L.jsx(lr, {}), colorClass: "bg-teal-400" },
    jpeg: { icon: /* @__PURE__ */ L.jsx(lr, {}), colorClass: "bg-teal-400" },
    gif: { icon: /* @__PURE__ */ L.jsx(lr, {}), colorClass: "bg-teal-400" },
    bmp: { icon: /* @__PURE__ */ L.jsx(lr, {}), colorClass: "bg-teal-400" },
    tiff: { icon: /* @__PURE__ */ L.jsx(lr, {}), colorClass: "bg-teal-400" },
    link: { icon: /* @__PURE__ */ L.jsx(jy, {}), colorClass: "bg-gray" }
  }, o = r ? a.link : a[i] || a.default;
  return /* @__PURE__ */ L.jsx(
    "span",
    {
      style: { width: t, height: t, padding: 3, fontSize: t * 0.6 },
      className: `rounded-full bg-main text-white inline-block flex justify-center items-center ${o.colorClass}`,
      children: o.icon
    }
  );
}, xA = ({
  error: e,
  label: t,
  placeholder: r,
  selectedFile: n,
  setSelectedFile: i,
  id: a,
  accept: o = ".pdf, .doc, .docx, .json, .ppt, .pptx, .xls, .xlsx, video/mp4, video/avi, video/mov",
  fileError: s,
  className: l = "",
  height: f = "",
  padding: d = "2rem",
  multiple: c = !1,
  ...u
}) => {
  const { t: h } = er(), y = Wd({
    multiple: c,
    minSize: 0,
    maxSize: 262144e5,
    accept: o,
    onDrop: (E) => {
      if (E.length > 0) {
        const A = E[E.length - 1];
        i(c ? E : A);
      } else
        i(null);
    }
  }), {
    getRootProps: g,
    getInputProps: b,
    isDragActive: v,
    isDragAccept: m,
    isDragReject: x,
    fileRejections: p
  } = y, w = p.map(({ errors: E }, A) => /* @__PURE__ */ L.jsx("div", { className: "mt-6", children: /* @__PURE__ */ L.jsx("div", { children: E[0].code === "file-too-large" ? /* @__PURE__ */ L.jsx("span", { className: "text-xs pt-6 text-red", children: h("large_file") }, E[0].code) : /* @__PURE__ */ L.jsx("span", { className: "text-xs pt-6 text-red", children: E[0].message }, E[0].code) }) }, A)), S = Et(() => ({
    ...v ? Qu : {},
    ...m ? v0 : {},
    ...x ? g0 : {},
    ...n ? Qu : {}
  }), [v]);
  return /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    /* @__PURE__ */ L.jsxs("div", { ...u, className: "flex flex-col justify-center", children: [
      t && /* @__PURE__ */ L.jsx(
        "label",
        {
          htmlFor: a,
          className: "block mb-1 | text-left text-xs font-medium text-black",
          children: t
        }
      ),
      /* @__PURE__ */ L.jsxs(
        "div",
        {
          ...g({
            style: { height: f, padding: d, ...S },
            className: `${l} 
              w-full flex flex-col items-center justify-center 
              rounded-xl text-center text-coolGray-500 placeholder-gray shadow-inner hover:border-dashed 
              cursor-pointer transition-all duration-200 
              outline-none hover:outline-none hover:shadow-focus 
              focus:border-2 focus:border-main focus:outline-none focus:shadow-focus 
              active:outline-none border`
          }),
          children: [
            /* @__PURE__ */ L.jsx("span", { className: "text-xxs", children: !v && !n && (r || h("input_file_text")) }),
            n && !s && /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
              !c && /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                /* @__PURE__ */ L.jsx(y0, { documentName: n.name }),
                /* @__PURE__ */ L.jsx("p", { className: "text-xs text-main", children: n.name })
              ] }),
              c && /* @__PURE__ */ L.jsx("div", { className: "text-center text-2xl", children: h("multiple_files", { count: n.length }) })
            ] }),
            w,
            s && /* @__PURE__ */ L.jsx("span", { className: "text-red mt-6 text-sm", children: h("file_too_large") }),
            /* @__PURE__ */ L.jsx("input", { ...b() })
          ]
        }
      )
    ] }),
    e && /* @__PURE__ */ L.jsx("div", { className: "text-red relative text-xs", children: e.message })
  ] });
}, OA = ({
  onClick: e,
  type: t,
  marginRight: r = "0",
  marginLeft: n = "0",
  icon: i,
  iconComponent: a,
  text: o,
  disabled: s
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: s,
    className: `text-center block w-auto mr-${r} ml-${n} py-2 px-4
          text-xs font-semibold text-text-buttons-card-main placeholder-gray bg-bg-buttons-card-main rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out 
          hover:bg-buttons-card-main-hover hover:text-text-buttons-card-main hover:shadow-hover
          focus:outline-none hover:shadow-inner`,
    children: [
      i && /* @__PURE__ */ L.jsx("img", { src: i, alt: "Icon", className: "inline | mr-2 | w-auto" }),
      a && a,
      o
    ]
  }
), tc = ({
  onClick: e,
  type: t,
  width: r = "full",
  verticalMargin: n = "5",
  vertical: i = "2.5",
  horizontal: a = "7",
  marginRight: o = "0",
  marginLeft: s = "0",
  bgColor: l = "transparence-blue",
  textColor: f = "blue-dark",
  bgHoverColor: d,
  borderColor: c,
  textColorHover: u,
  icon: h,
  iconComponent: y,
  text: g,
  disabled: b,
  textSize: v = "sm",
  weight: m = "semibold",
  shadow: x = "soft-white",
  iconWidth: p = "auto",
  textAlign: w = "center",
  className: S = ""
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: b,
    className: `${w === "center" ? "text-center" : w === "right" ? "text-right" : "text-left"} 
        block w-${r} my-${n} mr-${o} ml-${s} py-${i} px-${a} 
        text-${v} font-${m} text-${f} placeholder-gray bg-${l} rounded-2xl 
        shadow-${x} cursor-pointer transition-all duration-500 ease-in-out 
        hover:bg-${d} hover:border-${c} hover:text-${u} hover:shadow-hover
        ${c && `border border-${c}`}
        focus:outline-none hover:shadow-inner ${S}`,
    children: [
      h && /* @__PURE__ */ L.jsx("img", { src: h, alt: "Icon", className: `inline | mr-2 | w-${p} ` }),
      y && y,
      g
    ]
  }
), EA = ({ image: e, title: t, textOne: r, textTwo: n, backgroundImage: i, showExtraTextOnHover: a = !1, className: o = "" }) => /* @__PURE__ */ L.jsx(
  "div",
  {
    className: `w-full group h-full flex justify-center items-center ${o}`,
    style: { backgroundImage: `url(${i})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" },
    children: /* @__PURE__ */ L.jsxs("div", { className: "text-gray text-center ", children: [
      e,
      /* @__PURE__ */ L.jsx("h3", { className: "mb-4", children: t }),
      /* @__PURE__ */ L.jsx("p", { className: `text-base mb-2 ${a && "hidden group-hover:block duration-300"}`, children: r }),
      /* @__PURE__ */ L.jsx("p", { className: `text-base ${a && "hidden group-hover:block duration-300"}`, children: n })
    ] })
  }
), b0 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNy4wMTYzMSA1Ljc3MDMyTDUuMjM3MzEgMy45OTIzMkw3LjAxNTMxIDIuMjE0MzJDNy4zNTczMSAxLjg3MzMyIDcuMzU3MzEgMS4zMTgzMiA3LjAxNTMxIDAuOTc3MzE3QzYuNjczMzEgMC42MzMzMTcgNi4xMjAzMSAwLjYzNDMxNyA1Ljc3ODMxIDAuOTc2MzE3TDMuOTk5MzEgMi43NTQzMkwyLjIyMDMxIDAuOTc0MzE3QzEuODc4MzEgMC42MzIzMTcgMS4zMjQzMSAwLjYzNDMxNyAwLjk4MjMxMyAwLjk3NDMxN0MwLjY0MTMxMyAxLjMxNjMyIDAuNjQxMzEzIDEuODcxMzIgMC45ODIzMTMgMi4yMTIzMkwyLjc2MjMxIDMuOTkyMzJMMC45ODYzMTMgNS43NjczMkMwLjY0NDMxMyA2LjEwOTMyIDAuNjQ0MzEzIDYuNjY0MzIgMC45ODYzMTMgNy4wMDQzMkMxLjE1NzMxIDcuMTc2MzIgMS4zODAzMSA3LjI2MTMyIDEuNjA0MzEgNy4yNjEzMkMxLjgyOTMxIDcuMjYxMzIgMi4wNTIzMSA3LjE3NjMyIDIuMjIzMzEgNy4wMDUzMkwzLjk5OTMxIDUuMjI5MzJMNS43NzkzMSA3LjAwODMyQzUuOTUwMzEgNy4xNzkzMiA2LjE3MzMxIDcuMjY0MzIgNi4zOTczMSA3LjI2NDMyQzYuNjIxMzEgNy4yNjQzMiA2Ljg0NTMxIDcuMTc4MzIgNy4wMTYzMSA3LjAwODMyQzcuMzU4MzEgNi42NjYzMiA3LjM1ODMxIDYuMTEyMzIgNy4wMTYzMSA1Ljc3MDMyIiBmaWxsPSIjNDM2RkI0Ii8+Cjwvc3ZnPgo=", w0 = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOCA2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMy4zMTg4NyA1LjMyMDkxQzMuMTI1NTggNS4zMjE4OSAyLjkzMjI5IDUuMjUyMjcgMi43ODMyOSA1LjEwOTExTDAuODY2NDY0IDMuMjY1NkMwLjU3MDQ4NCAyLjk3OTI3IDAuNTY3NDYzIDIuNTE0NDcgMC44NjA0MjQgMi4yMjYxN0MxLjE1MzM4IDEuOTM2OSAxLjYzMTU4IDEuOTMzOTYgMS45Mjg1NyAyLjIxOTMxTDMuMzA3OCAzLjU0NTA3TDYuNjc1MzMgMC4yMjQ3OTJDNi45NjkzIC0wLjA2NDQ4MjIgNy40NDc1IC0wLjA2NzQyNCA3Ljc0MzQ4IDAuMjE3OTI3QzguMDQwNDcgMC41MDQyNiA4LjA0MzQ5IDAuOTcwMDM5IDcuNzUwNTMgMS4yNTczNUwzLjg1MTQ0IDUuMTAyMjRDMy43MDQ0NSA1LjI0NzM3IDMuNTEyMTcgNS4zMTk5MyAzLjMxODg3IDUuMzIwOTEiIGZpbGw9IiM0RDcwQjMiLz4KPC9zdmc+Cg==";
/**
 * @remix-run/router v1.8.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function zo() {
  return zo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, zo.apply(this, arguments);
}
var rc;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(rc || (rc = {}));
function Ye(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Gi(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Fo(e) {
  let {
    pathname: t = "/",
    search: r = "",
    hash: n = ""
  } = e;
  return r && r !== "?" && (t += r.charAt(0) === "?" ? r : "?" + r), n && n !== "#" && (t += n.charAt(0) === "#" ? n : "#" + n), t;
}
function Yd(e) {
  let t = {};
  if (e) {
    let r = e.indexOf("#");
    r >= 0 && (t.hash = e.substr(r), e = e.substr(0, r));
    let n = e.indexOf("?");
    n >= 0 && (t.search = e.substr(n), e = e.substr(0, n)), e && (t.pathname = e);
  }
  return t;
}
var nc;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(nc || (nc = {}));
function Bo(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let r = t.endsWith("/") ? t.length - 1 : t.length, n = e.charAt(r);
  return n && n !== "/" ? null : e.slice(r) || "/";
}
function x0(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: r,
    search: n = "",
    hash: i = ""
  } = typeof e == "string" ? Yd(e) : e;
  return {
    pathname: r ? r.startsWith("/") ? r : O0(r, t) : t,
    search: E0(n),
    hash: S0(i)
  };
}
function O0(e, t) {
  let r = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((i) => {
    i === ".." ? r.length > 1 && r.pop() : i !== "." && r.push(i);
  }), r.length > 1 ? r.join("/") : "/";
}
function Ca(e, t, r, n) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(n) + "].  Please separate it out to the ") + ("`to." + r + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Vd(e) {
  return e.filter((t, r) => r === 0 || t.route.path && t.route.path.length > 0);
}
function Gd(e, t, r, n) {
  n === void 0 && (n = !1);
  let i;
  typeof e == "string" ? i = Yd(e) : (i = zo({}, e), Ye(!i.pathname || !i.pathname.includes("?"), Ca("?", "pathname", "search", i)), Ye(!i.pathname || !i.pathname.includes("#"), Ca("#", "pathname", "hash", i)), Ye(!i.search || !i.search.includes("#"), Ca("#", "search", "hash", i)));
  let a = e === "" || i.pathname === "", o = a ? "/" : i.pathname, s;
  if (n || o == null)
    s = r;
  else {
    let c = t.length - 1;
    if (o.startsWith("..")) {
      let u = o.split("/");
      for (; u[0] === ".."; )
        u.shift(), c -= 1;
      i.pathname = u.join("/");
    }
    s = c >= 0 ? t[c] : "/";
  }
  let l = x0(i, s), f = o && o !== "/" && o.endsWith("/"), d = (a || o === ".") && r.endsWith("/");
  return !l.pathname.endsWith("/") && (f || d) && (l.pathname += "/"), l;
}
const Ms = (e) => e.join("/").replace(/\/\/+/g, "/"), E0 = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, S0 = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, Kd = ["post", "put", "patch", "delete"];
new Set(Kd);
const _0 = ["get", ...Kd];
new Set(_0);
/**
 * React Router v6.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function qo() {
  return qo = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, qo.apply(this, arguments);
}
const Ki = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (Ki.displayName = "DataRouter");
const Zd = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (Zd.displayName = "DataRouterState");
const T0 = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (T0.displayName = "Await");
const zt = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (zt.displayName = "Navigation");
const Ds = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (Ds.displayName = "Location");
const jr = /* @__PURE__ */ ve.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (jr.displayName = "Route");
const N0 = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (N0.displayName = "RouteError");
function A0(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t;
  Rs() || (process.env.NODE_ENV !== "production" ? Ye(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : Ye(!1));
  let {
    basename: n,
    navigator: i
  } = ve.useContext(zt), {
    hash: a,
    pathname: o,
    search: s
  } = Zi(e, {
    relative: r
  }), l = o;
  return n !== "/" && (l = o === "/" ? n : Ms([n, o])), i.createHref({
    pathname: l,
    search: s,
    hash: a
  });
}
function Rs() {
  return ve.useContext(Ds) != null;
}
function wn() {
  return Rs() || (process.env.NODE_ENV !== "production" ? Ye(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : Ye(!1)), ve.useContext(Ds).location;
}
const Qd = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Xd(e) {
  ve.useContext(zt).static || ve.useLayoutEffect(e);
}
function k0() {
  let {
    isDataRoute: e
  } = ve.useContext(jr);
  return e ? L0() : j0();
}
function j0() {
  Rs() || (process.env.NODE_ENV !== "production" ? Ye(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : Ye(!1));
  let e = ve.useContext(Ki), {
    basename: t,
    navigator: r
  } = ve.useContext(zt), {
    matches: n
  } = ve.useContext(jr), {
    pathname: i
  } = wn(), a = JSON.stringify(Vd(n).map((l) => l.pathnameBase)), o = ve.useRef(!1);
  return Xd(() => {
    o.current = !0;
  }), ve.useCallback(function(l, f) {
    if (f === void 0 && (f = {}), process.env.NODE_ENV !== "production" && Gi(o.current, Qd), !o.current)
      return;
    if (typeof l == "number") {
      r.go(l);
      return;
    }
    let d = Gd(l, JSON.parse(a), i, f.relative === "path");
    e == null && t !== "/" && (d.pathname = d.pathname === "/" ? t : Ms([t, d.pathname])), (f.replace ? r.replace : r.push)(d, f.state, f);
  }, [t, r, a, i, e]);
}
function Zi(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    matches: n
  } = ve.useContext(jr), {
    pathname: i
  } = wn(), a = JSON.stringify(Vd(n).map((o) => o.pathnameBase));
  return ve.useMemo(() => Gd(e, JSON.parse(a), i, r === "path"), [e, a, i, r]);
}
var Jd = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Jd || {}), $s = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}($s || {});
function eh(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function P0(e) {
  let t = ve.useContext(Ki);
  return t || (process.env.NODE_ENV !== "production" ? Ye(!1, eh(e)) : Ye(!1)), t;
}
function C0(e) {
  let t = ve.useContext(jr);
  return t || (process.env.NODE_ENV !== "production" ? Ye(!1, eh(e)) : Ye(!1)), t;
}
function th(e) {
  let t = C0(e), r = t.matches[t.matches.length - 1];
  return r.route.id || (process.env.NODE_ENV !== "production" ? Ye(!1, e + ' can only be used on routes that contain a unique "id"') : Ye(!1)), r.route.id;
}
function I0() {
  return th($s.UseRouteId);
}
function L0() {
  let {
    router: e
  } = P0(Jd.UseNavigateStable), t = th($s.UseNavigateStable), r = ve.useRef(!1);
  return Xd(() => {
    r.current = !0;
  }), ve.useCallback(function(i, a) {
    a === void 0 && (a = {}), process.env.NODE_ENV !== "production" && Gi(r.current, Qd), r.current && (typeof i == "number" ? e.navigate(i) : e.navigate(i, qo({
      fromRouteId: t
    }, a)));
  }, [e, t]);
}
new Promise(() => {
});
/**
 * React Router DOM v6.15.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function Jt() {
  return Jt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Jt.apply(this, arguments);
}
function zs(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), i, a;
  for (a = 0; a < n.length; a++)
    i = n[a], !(t.indexOf(i) >= 0) && (r[i] = e[i]);
  return r;
}
const oi = "get", si = "application/x-www-form-urlencoded";
function Qi(e) {
  return e != null && typeof e.tagName == "string";
}
function M0(e) {
  return Qi(e) && e.tagName.toLowerCase() === "button";
}
function D0(e) {
  return Qi(e) && e.tagName.toLowerCase() === "form";
}
function R0(e) {
  return Qi(e) && e.tagName.toLowerCase() === "input";
}
function $0(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function z0(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !$0(e);
}
let qn = null;
function F0() {
  if (qn === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), qn = !1;
    } catch {
      qn = !0;
    }
  return qn;
}
const B0 = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Ia(e) {
  return e != null && !B0.has(e) ? (process.env.NODE_ENV !== "production" && Gi(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + si + '"')), null) : e;
}
function q0(e, t) {
  let r, n, i, a, o;
  if (D0(e)) {
    let s = e.getAttribute("action");
    n = s ? Bo(s, t) : null, r = e.getAttribute("method") || oi, i = Ia(e.getAttribute("enctype")) || si, a = new FormData(e);
  } else if (M0(e) || R0(e) && (e.type === "submit" || e.type === "image")) {
    let s = e.form;
    if (s == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let l = e.getAttribute("formaction") || s.getAttribute("action");
    if (n = l ? Bo(l, t) : null, r = e.getAttribute("formmethod") || s.getAttribute("method") || oi, i = Ia(e.getAttribute("formenctype")) || Ia(s.getAttribute("enctype")) || si, a = new FormData(s, e), !F0()) {
      let {
        name: f,
        type: d,
        value: c
      } = e;
      if (d === "image") {
        let u = f ? f + "." : "";
        a.append(u + "x", "0"), a.append(u + "y", "0");
      } else
        f && a.append(f, c);
    }
  } else {
    if (Qi(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    r = oi, n = null, i = si, o = e;
  }
  return a && i === "text/plain" && (o = a, a = void 0), {
    action: n,
    method: r.toLowerCase(),
    encType: i,
    formData: a,
    body: o
  };
}
const U0 = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], H0 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], W0 = ["reloadDocument", "replace", "state", "method", "action", "onSubmit", "submit", "relative", "preventScrollReset"];
process.env.NODE_ENV;
const Y0 = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", V0 = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Fs = /* @__PURE__ */ ve.forwardRef(function(t, r) {
  let {
    onClick: n,
    relative: i,
    reloadDocument: a,
    replace: o,
    state: s,
    target: l,
    to: f,
    preventScrollReset: d
  } = t, c = zs(t, U0), {
    basename: u
  } = ve.useContext(zt), h, y = !1;
  if (typeof f == "string" && V0.test(f) && (h = f, Y0))
    try {
      let m = new URL(window.location.href), x = f.startsWith("//") ? new URL(m.protocol + f) : new URL(f), p = Bo(x.pathname, u);
      x.origin === m.origin && p != null ? f = p + x.search + x.hash : y = !0;
    } catch {
      process.env.NODE_ENV !== "production" && Gi(!1, '<Link to="' + f + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let g = A0(f, {
    relative: i
  }), b = X0(f, {
    replace: o,
    state: s,
    target: l,
    preventScrollReset: d,
    relative: i
  });
  function v(m) {
    n && n(m), m.defaultPrevented || b(m);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ ve.createElement("a", Jt({}, c, {
      href: h || g,
      onClick: y || a ? n : v,
      ref: r,
      target: l
    }))
  );
});
process.env.NODE_ENV !== "production" && (Fs.displayName = "Link");
const G0 = /* @__PURE__ */ ve.forwardRef(function(t, r) {
  let {
    "aria-current": n = "page",
    caseSensitive: i = !1,
    className: a = "",
    end: o = !1,
    style: s,
    to: l,
    children: f
  } = t, d = zs(t, H0), c = Zi(l, {
    relative: d.relative
  }), u = wn(), h = ve.useContext(Zd), {
    navigator: y
  } = ve.useContext(zt), g = y.encodeLocation ? y.encodeLocation(c).pathname : c.pathname, b = u.pathname, v = h && h.navigation && h.navigation.location ? h.navigation.location.pathname : null;
  i || (b = b.toLowerCase(), v = v ? v.toLowerCase() : null, g = g.toLowerCase());
  let m = b === g || !o && b.startsWith(g) && b.charAt(g.length) === "/", x = v != null && (v === g || !o && v.startsWith(g) && v.charAt(g.length) === "/"), p = m ? n : void 0, w;
  typeof a == "function" ? w = a({
    isActive: m,
    isPending: x
  }) : w = [a, m ? "active" : null, x ? "pending" : null].filter(Boolean).join(" ");
  let S = typeof s == "function" ? s({
    isActive: m,
    isPending: x
  }) : s;
  return /* @__PURE__ */ ve.createElement(Fs, Jt({}, d, {
    "aria-current": p,
    className: w,
    ref: r,
    style: S,
    to: l
  }), typeof f == "function" ? f({
    isActive: m,
    isPending: x
  }) : f);
});
process.env.NODE_ENV !== "production" && (G0.displayName = "NavLink");
const K0 = /* @__PURE__ */ ve.forwardRef((e, t) => {
  let r = eb();
  return /* @__PURE__ */ ve.createElement(rh, Jt({}, e, {
    submit: r,
    ref: t
  }));
});
process.env.NODE_ENV !== "production" && (K0.displayName = "Form");
const rh = /* @__PURE__ */ ve.forwardRef((e, t) => {
  let {
    reloadDocument: r,
    replace: n,
    state: i,
    method: a = oi,
    action: o,
    onSubmit: s,
    submit: l,
    relative: f,
    preventScrollReset: d
  } = e, c = zs(e, W0), u = a.toLowerCase() === "get" ? "get" : "post", h = tb(o, {
    relative: f
  }), y = (g) => {
    if (s && s(g), g.defaultPrevented)
      return;
    g.preventDefault();
    let b = g.nativeEvent.submitter, v = (b == null ? void 0 : b.getAttribute("formmethod")) || a;
    l(b || g.currentTarget, {
      method: v,
      replace: n,
      state: i,
      relative: f,
      preventScrollReset: d
    });
  };
  return /* @__PURE__ */ ve.createElement("form", Jt({
    ref: t,
    method: u,
    action: h,
    onSubmit: r ? s : y
  }, c));
});
process.env.NODE_ENV !== "production" && (rh.displayName = "FormImpl");
process.env.NODE_ENV;
var Uo;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher";
})(Uo || (Uo = {}));
var ic;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(ic || (ic = {}));
function Z0(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Q0(e) {
  let t = ve.useContext(Ki);
  return t || (process.env.NODE_ENV !== "production" ? Ye(!1, Z0(e)) : Ye(!1)), t;
}
function X0(e, t) {
  let {
    target: r,
    replace: n,
    state: i,
    preventScrollReset: a,
    relative: o
  } = t === void 0 ? {} : t, s = k0(), l = wn(), f = Zi(e, {
    relative: o
  });
  return ve.useCallback((d) => {
    if (z0(d, r)) {
      d.preventDefault();
      let c = n !== void 0 ? n : Fo(l) === Fo(f);
      s(e, {
        replace: c,
        state: i,
        preventScrollReset: a,
        relative: o
      });
    }
  }, [l, s, f, n, i, r, e, a, o]);
}
function J0() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function eb() {
  let {
    router: e
  } = Q0(Uo.UseSubmit), {
    basename: t
  } = ve.useContext(zt), r = I0();
  return ve.useCallback(function(n, i) {
    i === void 0 && (i = {}), J0();
    let {
      action: a,
      method: o,
      encType: s,
      formData: l,
      body: f
    } = q0(n, t);
    e.navigate(i.action || a, {
      preventScrollReset: i.preventScrollReset,
      formData: l,
      body: f,
      formMethod: i.method || o,
      formEncType: i.encType || s,
      replace: i.replace,
      state: i.state,
      fromRouteId: r
    });
  }, [e, t, r]);
}
function tb(e, t) {
  let {
    relative: r
  } = t === void 0 ? {} : t, {
    basename: n
  } = ve.useContext(zt), i = ve.useContext(jr);
  i || (process.env.NODE_ENV !== "production" ? Ye(!1, "useFormAction must be used inside a RouteContext") : Ye(!1));
  let [a] = i.matches.slice(-1), o = Jt({}, Zi(e || ".", {
    relative: r
  })), s = wn();
  if (e == null && (o.search = s.search, a.route.index)) {
    let l = new URLSearchParams(o.search);
    l.delete("index"), o.search = l.toString() ? "?" + l.toString() : "";
  }
  return (!e || e === ".") && a.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), n !== "/" && (o.pathname = o.pathname === "/" ? n : Ms([n, o.pathname])), Fo(o);
}
const SA = ({
  children: e,
  onClose: t,
  showCloseModal: r,
  showModal: n,
  setShowModal: i,
  width: a = "full",
  height: o = "auto",
  paddingBottom: s = "8",
  paddingTop: l = "10",
  px: f = "8",
  fixedWidth: d,
  closeOnClickOutside: c = !1
}) => {
  const u = Ie(null), h = (y) => {
    const { current: g } = u;
    c && g && !g.contains(y.target) && (t && t(), i && i(!1));
  };
  return Me(() => (document.addEventListener("mousedown", h), () => {
    document.removeEventListener("mousedown", h);
  }), [c]), n ? Di.createPortal(
    /* @__PURE__ */ L.jsx("div", { className: "h-full w-full | top-0 left-0 bottom-0 fixed z-50 | bg-gray-opacity | flex justify-center items-center", children: /* @__PURE__ */ L.jsx("div", { ref: u, className: `${d} relative`, children: /* @__PURE__ */ L.jsxs("div", { className: `max-h-screen rounded-2xl shadow-md px-${f} pb-${s} pt-${l} w-${a} h-${o} sm:m-0 bg-white`, children: [
      /* @__PURE__ */ L.jsx("div", { className: "relative top-4 right-4 | flex justify-end", children: r && /* @__PURE__ */ L.jsx(
        "button",
        {
          type: "button",
          onClick: t,
          className: "p-2 rounded-full  absolute -top-9 -right-8  border border-border-buttons-secondary",
          children: /* @__PURE__ */ L.jsx(Cs, { className: "block w-6 text-2xl text-text-buttons-secondary" })
        }
      ) }),
      e
    ] }) }) }),
    document.body
  ) : null;
}, _A = ({
  title: e,
  titleColor: t = "blue-dark",
  text: r,
  textMargin: n = "4",
  textWidth: i = "medium",
  onClick: a,
  img: o = w0,
  bgColor: s = "white",
  textColor: l = "blue-dark",
  width: f = "96",
  widtMovile: d = "80",
  height: c = "96",
  heightMovile: u = "80",
  padding: h = "4",
  exit: y = !1,
  link: g = null,
  showIcon: b = !0,
  action: v = !1,
  actionText: m = ""
}) => {
  const x = () => {
  }, { t: p } = er();
  return /* @__PURE__ */ L.jsx("div", { className: "h-full w-full | top-0 left-0 absolute z-50 | bg-gray-opacity | flex justify-center items-center", children: /* @__PURE__ */ L.jsxs("div", { className: `bg-${s} rounded-lg shadow-md | w-${d} h-${u} sm:w-${f} sm:h-${c} p-${h}`, children: [
    /* @__PURE__ */ L.jsx("div", { className: "relative top-0 right-0 | flex justify-end | cursor-pointer", children: a && /* @__PURE__ */ L.jsx(
      "button",
      {
        type: "button",
        onClick: a,
        className: "shadow-hover hover:shadow-inner p-2 rounded-2xl bg-transparence-blue",
        children: /* @__PURE__ */ L.jsx("img", { src: b0, alt: "Close icon", className: "block w-4" })
      }
    ) }),
    /* @__PURE__ */ L.jsxs("div", { className: "w-full h-full p-8 | flex flex-col justify-center items-center", children: [
      b && /* @__PURE__ */ L.jsx("img", { src: o, alt: "Tic icon", className: "w-16" }),
      e && /* @__PURE__ */ L.jsx("h3", { className: `text-center text-lg font-medium mb-1 mt-6 text-${t}`, children: e }),
      /* @__PURE__ */ L.jsx("p", { className: `text-${l} text-center text-sm font-${i} mt-${n}`, children: r }),
      g && /* @__PURE__ */ L.jsxs("div", { className: "flex text-xs text-gray mt-4", children: [
        p("kiota_express_requirements"),
        " ",
        /* @__PURE__ */ L.jsx(Fs, { to: g, className: "underline", children: p("here") })
      ] }),
      y && /* @__PURE__ */ L.jsx(
        tc,
        {
          text: p("exit"),
          width: "auto",
          onClick: x,
          textColor: "blue-dark",
          shadow: "none"
        }
      ),
      v && /* @__PURE__ */ L.jsx(
        tc,
        {
          text: m,
          width: "auto",
          onClick: () => v(),
          textColor: "blue-dark",
          shadow: "none"
        }
      )
    ] })
  ] }) });
}, TA = ({
  onChange: e,
  checked: t,
  text: r,
  error: n,
  size: i = "md",
  textSize: a = "sm",
  tooltip: o = !1,
  disabled: s = !1
}) => {
  const [l, f] = Ke(""), [d, c] = Ke(""), [u, h] = Ke(t), y = Ie(!1), g = () => {
    s || h(!u);
  };
  return Me(() => {
    switch (i) {
      case "sm":
        f("w-8 h-4"), c("w-2 h-2");
        break;
      case "md":
        f("w-10 h-5"), c("w-3 h-3");
        break;
      case "lg":
        f("w-12 h-6"), c("w-4 h-4");
    }
  }, [i]), Me(() => {
    y.current ? e && e(u) : y.current = !0;
  }, [u]), Me(() => {
    t !== u && h(t);
  }, [t]), /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    /* @__PURE__ */ L.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ L.jsxs(
      "label",
      {
        className: `flex items-center ${!s && "cursor-pointer"}`,
        onClick: g,
        children: [
          /* @__PURE__ */ L.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ L.jsx(
              "div",
              {
                className: `${u ? "bg-main" : "bg-gray-light"} ${l} rounded-full shadow-inner`
              }
            ),
            /* @__PURE__ */ L.jsx(
              "div",
              {
                className: `${u ? "translate-x-[120%]" : ""} absolute ${d} bg-transparence-blue shadow-inner rounded-full shadow-switch left-2 top-1 transition`
              }
            )
          ] }),
          !o && /* @__PURE__ */ L.jsx("div", { className: `ml-3 text-${a}`, children: r }),
          o && /* @__PURE__ */ L.jsxs("div", { className: `ml-3 text-${a}`, "data-tip": o, children: [
            r,
            o && /* @__PURE__ */ L.jsx(kd, { className: "inline ml-1 w-4 h-4" })
          ] })
        ]
      }
    ) }),
    n && /* @__PURE__ */ L.jsx("div", { className: "text-red text-xs", children: n.message })
  ] });
};
function rb() {
  this.__data__ = [], this.size = 0;
}
var nb = rb;
function ib(e, t) {
  return e === t || e !== e && t !== t;
}
var nh = ib, ab = nh;
function ob(e, t) {
  for (var r = e.length; r--; )
    if (ab(e[r][0], t))
      return r;
  return -1;
}
var Xi = ob, sb = Xi, lb = Array.prototype, ub = lb.splice;
function cb(e) {
  var t = this.__data__, r = sb(t, e);
  if (r < 0)
    return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : ub.call(t, r, 1), --this.size, !0;
}
var fb = cb, db = Xi;
function hb(e) {
  var t = this.__data__, r = db(t, e);
  return r < 0 ? void 0 : t[r][1];
}
var pb = hb, vb = Xi;
function gb(e) {
  return vb(this.__data__, e) > -1;
}
var mb = gb, yb = Xi;
function bb(e, t) {
  var r = this.__data__, n = yb(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
var wb = bb, xb = nb, Ob = fb, Eb = pb, Sb = mb, _b = wb;
function Pr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Pr.prototype.clear = xb;
Pr.prototype.delete = Ob;
Pr.prototype.get = Eb;
Pr.prototype.has = Sb;
Pr.prototype.set = _b;
var Ji = Pr, Tb = Ji;
function Nb() {
  this.__data__ = new Tb(), this.size = 0;
}
var Ab = Nb;
function kb(e) {
  var t = this.__data__, r = t.delete(e);
  return this.size = t.size, r;
}
var jb = kb;
function Pb(e) {
  return this.__data__.get(e);
}
var Cb = Pb;
function Ib(e) {
  return this.__data__.has(e);
}
var Lb = Ib, Mb = typeof rt == "object" && rt && rt.Object === Object && rt, ih = Mb, Db = ih, Rb = typeof self == "object" && self && self.Object === Object && self, $b = Db || Rb || Function("return this")(), At = $b, zb = At, Fb = zb.Symbol, Bs = Fb, ac = Bs, ah = Object.prototype, Bb = ah.hasOwnProperty, qb = ah.toString, Kr = ac ? ac.toStringTag : void 0;
function Ub(e) {
  var t = Bb.call(e, Kr), r = e[Kr];
  try {
    e[Kr] = void 0;
    var n = !0;
  } catch {
  }
  var i = qb.call(e);
  return n && (t ? e[Kr] = r : delete e[Kr]), i;
}
var Hb = Ub, Wb = Object.prototype, Yb = Wb.toString;
function Vb(e) {
  return Yb.call(e);
}
var Gb = Vb, oc = Bs, Kb = Hb, Zb = Gb, Qb = "[object Null]", Xb = "[object Undefined]", sc = oc ? oc.toStringTag : void 0;
function Jb(e) {
  return e == null ? e === void 0 ? Xb : Qb : sc && sc in Object(e) ? Kb(e) : Zb(e);
}
var ea = Jb;
function e2(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var oh = e2, t2 = ea, r2 = oh, n2 = "[object AsyncFunction]", i2 = "[object Function]", a2 = "[object GeneratorFunction]", o2 = "[object Proxy]";
function s2(e) {
  if (!r2(e))
    return !1;
  var t = t2(e);
  return t == i2 || t == a2 || t == n2 || t == o2;
}
var sh = s2, l2 = At, u2 = l2["__core-js_shared__"], c2 = u2, La = c2, lc = function() {
  var e = /[^.]+$/.exec(La && La.keys && La.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function f2(e) {
  return !!lc && lc in e;
}
var d2 = f2, h2 = Function.prototype, p2 = h2.toString;
function v2(e) {
  if (e != null) {
    try {
      return p2.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var lh = v2, g2 = sh, m2 = d2, y2 = oh, b2 = lh, w2 = /[\\^$.*+?()[\]{}|]/g, x2 = /^\[object .+?Constructor\]$/, O2 = Function.prototype, E2 = Object.prototype, S2 = O2.toString, _2 = E2.hasOwnProperty, T2 = RegExp(
  "^" + S2.call(_2).replace(w2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function N2(e) {
  if (!y2(e) || m2(e))
    return !1;
  var t = g2(e) ? T2 : x2;
  return t.test(b2(e));
}
var A2 = N2;
function k2(e, t) {
  return e == null ? void 0 : e[t];
}
var j2 = k2, P2 = A2, C2 = j2;
function I2(e, t) {
  var r = C2(e, t);
  return P2(r) ? r : void 0;
}
var Cr = I2, L2 = Cr, M2 = At, D2 = L2(M2, "Map"), qs = D2, R2 = Cr, $2 = R2(Object, "create"), ta = $2, uc = ta;
function z2() {
  this.__data__ = uc ? uc(null) : {}, this.size = 0;
}
var F2 = z2;
function B2(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var q2 = B2, U2 = ta, H2 = "__lodash_hash_undefined__", W2 = Object.prototype, Y2 = W2.hasOwnProperty;
function V2(e) {
  var t = this.__data__;
  if (U2) {
    var r = t[e];
    return r === H2 ? void 0 : r;
  }
  return Y2.call(t, e) ? t[e] : void 0;
}
var G2 = V2, K2 = ta, Z2 = Object.prototype, Q2 = Z2.hasOwnProperty;
function X2(e) {
  var t = this.__data__;
  return K2 ? t[e] !== void 0 : Q2.call(t, e);
}
var J2 = X2, ew = ta, tw = "__lodash_hash_undefined__";
function rw(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = ew && t === void 0 ? tw : t, this;
}
var nw = rw, iw = F2, aw = q2, ow = G2, sw = J2, lw = nw;
function Ir(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ir.prototype.clear = iw;
Ir.prototype.delete = aw;
Ir.prototype.get = ow;
Ir.prototype.has = sw;
Ir.prototype.set = lw;
var uw = Ir, cc = uw, cw = Ji, fw = qs;
function dw() {
  this.size = 0, this.__data__ = {
    hash: new cc(),
    map: new (fw || cw)(),
    string: new cc()
  };
}
var hw = dw;
function pw(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var vw = pw, gw = vw;
function mw(e, t) {
  var r = e.__data__;
  return gw(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
var ra = mw, yw = ra;
function bw(e) {
  var t = yw(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var ww = bw, xw = ra;
function Ow(e) {
  return xw(this, e).get(e);
}
var Ew = Ow, Sw = ra;
function _w(e) {
  return Sw(this, e).has(e);
}
var Tw = _w, Nw = ra;
function Aw(e, t) {
  var r = Nw(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
var kw = Aw, jw = hw, Pw = ww, Cw = Ew, Iw = Tw, Lw = kw;
function Lr(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Lr.prototype.clear = jw;
Lr.prototype.delete = Pw;
Lr.prototype.get = Cw;
Lr.prototype.has = Iw;
Lr.prototype.set = Lw;
var uh = Lr, Mw = Ji, Dw = qs, Rw = uh, $w = 200;
function zw(e, t) {
  var r = this.__data__;
  if (r instanceof Mw) {
    var n = r.__data__;
    if (!Dw || n.length < $w - 1)
      return n.push([e, t]), this.size = ++r.size, this;
    r = this.__data__ = new Rw(n);
  }
  return r.set(e, t), this.size = r.size, this;
}
var Fw = zw, Bw = Ji, qw = Ab, Uw = jb, Hw = Cb, Ww = Lb, Yw = Fw;
function Mr(e) {
  var t = this.__data__ = new Bw(e);
  this.size = t.size;
}
Mr.prototype.clear = qw;
Mr.prototype.delete = Uw;
Mr.prototype.get = Hw;
Mr.prototype.has = Ww;
Mr.prototype.set = Yw;
var Vw = Mr, Gw = "__lodash_hash_undefined__";
function Kw(e) {
  return this.__data__.set(e, Gw), this;
}
var Zw = Kw;
function Qw(e) {
  return this.__data__.has(e);
}
var Xw = Qw, Jw = uh, ex = Zw, tx = Xw;
function Ni(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.__data__ = new Jw(); ++t < r; )
    this.add(e[t]);
}
Ni.prototype.add = Ni.prototype.push = ex;
Ni.prototype.has = tx;
var rx = Ni;
function nx(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
    if (t(e[r], r, e))
      return !0;
  return !1;
}
var ix = nx;
function ax(e, t) {
  return e.has(t);
}
var ox = ax, sx = rx, lx = ix, ux = ox, cx = 1, fx = 2;
function dx(e, t, r, n, i, a) {
  var o = r & cx, s = e.length, l = t.length;
  if (s != l && !(o && l > s))
    return !1;
  var f = a.get(e), d = a.get(t);
  if (f && d)
    return f == t && d == e;
  var c = -1, u = !0, h = r & fx ? new sx() : void 0;
  for (a.set(e, t), a.set(t, e); ++c < s; ) {
    var y = e[c], g = t[c];
    if (n)
      var b = o ? n(g, y, c, t, e, a) : n(y, g, c, e, t, a);
    if (b !== void 0) {
      if (b)
        continue;
      u = !1;
      break;
    }
    if (h) {
      if (!lx(t, function(v, m) {
        if (!ux(h, m) && (y === v || i(y, v, r, n, a)))
          return h.push(m);
      })) {
        u = !1;
        break;
      }
    } else if (!(y === g || i(y, g, r, n, a))) {
      u = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), u;
}
var ch = dx, hx = At, px = hx.Uint8Array, vx = px;
function gx(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n, i) {
    r[++t] = [i, n];
  }), r;
}
var mx = gx;
function yx(e) {
  var t = -1, r = Array(e.size);
  return e.forEach(function(n) {
    r[++t] = n;
  }), r;
}
var bx = yx, fc = Bs, dc = vx, wx = nh, xx = ch, Ox = mx, Ex = bx, Sx = 1, _x = 2, Tx = "[object Boolean]", Nx = "[object Date]", Ax = "[object Error]", kx = "[object Map]", jx = "[object Number]", Px = "[object RegExp]", Cx = "[object Set]", Ix = "[object String]", Lx = "[object Symbol]", Mx = "[object ArrayBuffer]", Dx = "[object DataView]", hc = fc ? fc.prototype : void 0, Ma = hc ? hc.valueOf : void 0;
function Rx(e, t, r, n, i, a, o) {
  switch (r) {
    case Dx:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case Mx:
      return !(e.byteLength != t.byteLength || !a(new dc(e), new dc(t)));
    case Tx:
    case Nx:
    case jx:
      return wx(+e, +t);
    case Ax:
      return e.name == t.name && e.message == t.message;
    case Px:
    case Ix:
      return e == t + "";
    case kx:
      var s = Ox;
    case Cx:
      var l = n & Sx;
      if (s || (s = Ex), e.size != t.size && !l)
        return !1;
      var f = o.get(e);
      if (f)
        return f == t;
      n |= _x, o.set(e, t);
      var d = xx(s(e), s(t), n, i, a, o);
      return o.delete(e), d;
    case Lx:
      if (Ma)
        return Ma.call(e) == Ma.call(t);
  }
  return !1;
}
var $x = Rx;
function zx(e, t) {
  for (var r = -1, n = t.length, i = e.length; ++r < n; )
    e[i + r] = t[r];
  return e;
}
var Fx = zx, Bx = Array.isArray, Us = Bx, qx = Fx, Ux = Us;
function Hx(e, t, r) {
  var n = t(e);
  return Ux(e) ? n : qx(n, r(e));
}
var Wx = Hx;
function Yx(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, i = 0, a = []; ++r < n; ) {
    var o = e[r];
    t(o, r, e) && (a[i++] = o);
  }
  return a;
}
var Vx = Yx;
function Gx() {
  return [];
}
var Kx = Gx, Zx = Vx, Qx = Kx, Xx = Object.prototype, Jx = Xx.propertyIsEnumerable, pc = Object.getOwnPropertySymbols, eO = pc ? function(e) {
  return e == null ? [] : (e = Object(e), Zx(pc(e), function(t) {
    return Jx.call(e, t);
  }));
} : Qx, tO = eO;
function rO(e, t) {
  for (var r = -1, n = Array(e); ++r < e; )
    n[r] = t(r);
  return n;
}
var nO = rO;
function iO(e) {
  return e != null && typeof e == "object";
}
var na = iO, aO = ea, oO = na, sO = "[object Arguments]";
function lO(e) {
  return oO(e) && aO(e) == sO;
}
var uO = lO, vc = uO, cO = na, fh = Object.prototype, fO = fh.hasOwnProperty, dO = fh.propertyIsEnumerable, hO = vc(function() {
  return arguments;
}()) ? vc : function(e) {
  return cO(e) && fO.call(e, "callee") && !dO.call(e, "callee");
}, pO = hO, Ai = { exports: {} };
function vO() {
  return !1;
}
var gO = vO;
Ai.exports;
(function(e, t) {
  var r = At, n = gO, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, s = o ? r.Buffer : void 0, l = s ? s.isBuffer : void 0, f = l || n;
  e.exports = f;
})(Ai, Ai.exports);
var dh = Ai.exports, mO = 9007199254740991, yO = /^(?:0|[1-9]\d*)$/;
function bO(e, t) {
  var r = typeof e;
  return t = t ?? mO, !!t && (r == "number" || r != "symbol" && yO.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var wO = bO, xO = 9007199254740991;
function OO(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= xO;
}
var hh = OO, EO = ea, SO = hh, _O = na, TO = "[object Arguments]", NO = "[object Array]", AO = "[object Boolean]", kO = "[object Date]", jO = "[object Error]", PO = "[object Function]", CO = "[object Map]", IO = "[object Number]", LO = "[object Object]", MO = "[object RegExp]", DO = "[object Set]", RO = "[object String]", $O = "[object WeakMap]", zO = "[object ArrayBuffer]", FO = "[object DataView]", BO = "[object Float32Array]", qO = "[object Float64Array]", UO = "[object Int8Array]", HO = "[object Int16Array]", WO = "[object Int32Array]", YO = "[object Uint8Array]", VO = "[object Uint8ClampedArray]", GO = "[object Uint16Array]", KO = "[object Uint32Array]", je = {};
je[BO] = je[qO] = je[UO] = je[HO] = je[WO] = je[YO] = je[VO] = je[GO] = je[KO] = !0;
je[TO] = je[NO] = je[zO] = je[AO] = je[FO] = je[kO] = je[jO] = je[PO] = je[CO] = je[IO] = je[LO] = je[MO] = je[DO] = je[RO] = je[$O] = !1;
function ZO(e) {
  return _O(e) && SO(e.length) && !!je[EO(e)];
}
var QO = ZO;
function XO(e) {
  return function(t) {
    return e(t);
  };
}
var JO = XO, ki = { exports: {} };
ki.exports;
(function(e, t) {
  var r = ih, n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, o = a && r.process, s = function() {
    try {
      var l = i && i.require && i.require("util").types;
      return l || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = s;
})(ki, ki.exports);
var eE = ki.exports, tE = QO, rE = JO, gc = eE, mc = gc && gc.isTypedArray, nE = mc ? rE(mc) : tE, ph = nE, iE = nO, aE = pO, oE = Us, sE = dh, lE = wO, uE = ph, cE = Object.prototype, fE = cE.hasOwnProperty;
function dE(e, t) {
  var r = oE(e), n = !r && aE(e), i = !r && !n && sE(e), a = !r && !n && !i && uE(e), o = r || n || i || a, s = o ? iE(e.length, String) : [], l = s.length;
  for (var f in e)
    (t || fE.call(e, f)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    lE(f, l))) && s.push(f);
  return s;
}
var hE = dE, pE = Object.prototype;
function vE(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || pE;
  return e === r;
}
var gE = vE;
function mE(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var yE = mE, bE = yE, wE = bE(Object.keys, Object), xE = wE, OE = gE, EE = xE, SE = Object.prototype, _E = SE.hasOwnProperty;
function TE(e) {
  if (!OE(e))
    return EE(e);
  var t = [];
  for (var r in Object(e))
    _E.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
var NE = TE, AE = sh, kE = hh;
function jE(e) {
  return e != null && kE(e.length) && !AE(e);
}
var PE = jE, CE = hE, IE = NE, LE = PE;
function ME(e) {
  return LE(e) ? CE(e) : IE(e);
}
var DE = ME, RE = Wx, $E = tO, zE = DE;
function FE(e) {
  return RE(e, zE, $E);
}
var BE = FE, yc = BE, qE = 1, UE = Object.prototype, HE = UE.hasOwnProperty;
function WE(e, t, r, n, i, a) {
  var o = r & qE, s = yc(e), l = s.length, f = yc(t), d = f.length;
  if (l != d && !o)
    return !1;
  for (var c = l; c--; ) {
    var u = s[c];
    if (!(o ? u in t : HE.call(t, u)))
      return !1;
  }
  var h = a.get(e), y = a.get(t);
  if (h && y)
    return h == t && y == e;
  var g = !0;
  a.set(e, t), a.set(t, e);
  for (var b = o; ++c < l; ) {
    u = s[c];
    var v = e[u], m = t[u];
    if (n)
      var x = o ? n(m, v, u, t, e, a) : n(v, m, u, e, t, a);
    if (!(x === void 0 ? v === m || i(v, m, r, n, a) : x)) {
      g = !1;
      break;
    }
    b || (b = u == "constructor");
  }
  if (g && !b) {
    var p = e.constructor, w = t.constructor;
    p != w && "constructor" in e && "constructor" in t && !(typeof p == "function" && p instanceof p && typeof w == "function" && w instanceof w) && (g = !1);
  }
  return a.delete(e), a.delete(t), g;
}
var YE = WE, VE = Cr, GE = At, KE = VE(GE, "DataView"), ZE = KE, QE = Cr, XE = At, JE = QE(XE, "Promise"), e4 = JE, t4 = Cr, r4 = At, n4 = t4(r4, "Set"), i4 = n4, a4 = Cr, o4 = At, s4 = a4(o4, "WeakMap"), l4 = s4, Ho = ZE, Wo = qs, Yo = e4, Vo = i4, Go = l4, vh = ea, Dr = lh, bc = "[object Map]", u4 = "[object Object]", wc = "[object Promise]", xc = "[object Set]", Oc = "[object WeakMap]", Ec = "[object DataView]", c4 = Dr(Ho), f4 = Dr(Wo), d4 = Dr(Yo), h4 = Dr(Vo), p4 = Dr(Go), Bt = vh;
(Ho && Bt(new Ho(new ArrayBuffer(1))) != Ec || Wo && Bt(new Wo()) != bc || Yo && Bt(Yo.resolve()) != wc || Vo && Bt(new Vo()) != xc || Go && Bt(new Go()) != Oc) && (Bt = function(e) {
  var t = vh(e), r = t == u4 ? e.constructor : void 0, n = r ? Dr(r) : "";
  if (n)
    switch (n) {
      case c4:
        return Ec;
      case f4:
        return bc;
      case d4:
        return wc;
      case h4:
        return xc;
      case p4:
        return Oc;
    }
  return t;
});
var v4 = Bt, Da = Vw, g4 = ch, m4 = $x, y4 = YE, Sc = v4, _c = Us, Tc = dh, b4 = ph, w4 = 1, Nc = "[object Arguments]", Ac = "[object Array]", Un = "[object Object]", x4 = Object.prototype, kc = x4.hasOwnProperty;
function O4(e, t, r, n, i, a) {
  var o = _c(e), s = _c(t), l = o ? Ac : Sc(e), f = s ? Ac : Sc(t);
  l = l == Nc ? Un : l, f = f == Nc ? Un : f;
  var d = l == Un, c = f == Un, u = l == f;
  if (u && Tc(e)) {
    if (!Tc(t))
      return !1;
    o = !0, d = !1;
  }
  if (u && !d)
    return a || (a = new Da()), o || b4(e) ? g4(e, t, r, n, i, a) : m4(e, t, l, r, n, i, a);
  if (!(r & w4)) {
    var h = d && kc.call(e, "__wrapped__"), y = c && kc.call(t, "__wrapped__");
    if (h || y) {
      var g = h ? e.value() : e, b = y ? t.value() : t;
      return a || (a = new Da()), i(g, b, r, n, a);
    }
  }
  return u ? (a || (a = new Da()), y4(e, t, r, n, i, a)) : !1;
}
var E4 = O4, S4 = E4, jc = na;
function gh(e, t, r, n, i) {
  return e === t ? !0 : e == null || t == null || !jc(e) && !jc(t) ? e !== e && t !== t : S4(e, t, r, n, gh, i);
}
var _4 = gh, T4 = _4;
function N4(e, t) {
  return T4(e, t);
}
var A4 = N4, mh = { exports: {} };
/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function(e, t) {
  (function(n, i) {
    e.exports = i();
  })(typeof self < "u" ? self : rt, function() {
    return (
      /******/
      function(r) {
        var n = {};
        function i(a) {
          if (n[a])
            return n[a].exports;
          var o = n[a] = {
            /******/
            i: a,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return r[a].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
        }
        return i.m = r, i.c = n, i.d = function(a, o, s) {
          i.o(a, o) || Object.defineProperty(a, o, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: s
            /******/
          });
        }, i.n = function(a) {
          var o = a && a.__esModule ? (
            /******/
            function() {
              return a.default;
            }
          ) : (
            /******/
            function() {
              return a;
            }
          );
          return i.d(o, "a", o), o;
        }, i.o = function(a, o) {
          return Object.prototype.hasOwnProperty.call(a, o);
        }, i.p = "", i(i.s = 109);
      }([
        /* 0 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", { value: !0 });
          var a = i(17), o = i(18), s = i(19), l = i(45), f = i(46), d = i(47), c = i(48), u = i(49), h = i(12), y = i(32), g = i(33), b = i(31), v = i(1), m = {
            Scope: v.Scope,
            create: v.create,
            find: v.find,
            query: v.query,
            register: v.register,
            Container: a.default,
            Format: o.default,
            Leaf: s.default,
            Embed: c.default,
            Scroll: l.default,
            Block: d.default,
            Inline: f.default,
            Text: u.default,
            Attributor: {
              Attribute: h.default,
              Class: y.default,
              Style: g.default,
              Store: b.default
            }
          };
          n.default = m;
        },
        /* 1 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(v, m) {
              v.__proto__ = m;
            } || function(v, m) {
              for (var x in m)
                m.hasOwnProperty(x) && (v[x] = m[x]);
            };
            return function(v, m) {
              b(v, m);
              function x() {
                this.constructor = v;
              }
              v.prototype = m === null ? Object.create(m) : (x.prototype = m.prototype, new x());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = (
            /** @class */
            function(b) {
              a(v, b);
              function v(m) {
                var x = this;
                return m = "[Parchment] " + m, x = b.call(this, m) || this, x.message = m, x.name = x.constructor.name, x;
              }
              return v;
            }(Error)
          );
          n.ParchmentError = o;
          var s = {}, l = {}, f = {}, d = {};
          n.DATA_KEY = "__blot";
          var c;
          (function(b) {
            b[b.TYPE = 3] = "TYPE", b[b.LEVEL = 12] = "LEVEL", b[b.ATTRIBUTE = 13] = "ATTRIBUTE", b[b.BLOT = 14] = "BLOT", b[b.INLINE = 7] = "INLINE", b[b.BLOCK = 11] = "BLOCK", b[b.BLOCK_BLOT = 10] = "BLOCK_BLOT", b[b.INLINE_BLOT = 6] = "INLINE_BLOT", b[b.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", b[b.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", b[b.ANY = 15] = "ANY";
          })(c = n.Scope || (n.Scope = {}));
          function u(b, v) {
            var m = y(b);
            if (m == null)
              throw new o("Unable to create " + b + " blot");
            var x = m, p = (
              // @ts-ignore
              b instanceof Node || b.nodeType === Node.TEXT_NODE ? b : x.create(v)
            );
            return new x(p, v);
          }
          n.create = u;
          function h(b, v) {
            return v === void 0 && (v = !1), b == null ? null : b[n.DATA_KEY] != null ? b[n.DATA_KEY].blot : v ? h(b.parentNode, v) : null;
          }
          n.find = h;
          function y(b, v) {
            v === void 0 && (v = c.ANY);
            var m;
            if (typeof b == "string")
              m = d[b] || s[b];
            else if (b instanceof Text || b.nodeType === Node.TEXT_NODE)
              m = d.text;
            else if (typeof b == "number")
              b & c.LEVEL & c.BLOCK ? m = d.block : b & c.LEVEL & c.INLINE && (m = d.inline);
            else if (b instanceof HTMLElement) {
              var x = (b.getAttribute("class") || "").split(/\s+/);
              for (var p in x)
                if (m = l[x[p]], m)
                  break;
              m = m || f[b.tagName];
            }
            return m == null ? null : v & c.LEVEL & m.scope && v & c.TYPE & m.scope ? m : null;
          }
          n.query = y;
          function g() {
            for (var b = [], v = 0; v < arguments.length; v++)
              b[v] = arguments[v];
            if (b.length > 1)
              return b.map(function(p) {
                return g(p);
              });
            var m = b[0];
            if (typeof m.blotName != "string" && typeof m.attrName != "string")
              throw new o("Invalid definition");
            if (m.blotName === "abstract")
              throw new o("Cannot register abstract class");
            if (d[m.blotName || m.attrName] = m, typeof m.keyName == "string")
              s[m.keyName] = m;
            else if (m.className != null && (l[m.className] = m), m.tagName != null) {
              Array.isArray(m.tagName) ? m.tagName = m.tagName.map(function(p) {
                return p.toUpperCase();
              }) : m.tagName = m.tagName.toUpperCase();
              var x = Array.isArray(m.tagName) ? m.tagName : [m.tagName];
              x.forEach(function(p) {
                (f[p] == null || m.className == null) && (f[p] = m);
              });
            }
            return m;
          }
          n.register = g;
        },
        /* 2 */
        /***/
        function(r, n, i) {
          var a = i(51), o = i(11), s = i(3), l = i(20), f = String.fromCharCode(0), d = function(c) {
            Array.isArray(c) ? this.ops = c : c != null && Array.isArray(c.ops) ? this.ops = c.ops : this.ops = [];
          };
          d.prototype.insert = function(c, u) {
            var h = {};
            return c.length === 0 ? this : (h.insert = c, u != null && typeof u == "object" && Object.keys(u).length > 0 && (h.attributes = u), this.push(h));
          }, d.prototype.delete = function(c) {
            return c <= 0 ? this : this.push({ delete: c });
          }, d.prototype.retain = function(c, u) {
            if (c <= 0)
              return this;
            var h = { retain: c };
            return u != null && typeof u == "object" && Object.keys(u).length > 0 && (h.attributes = u), this.push(h);
          }, d.prototype.push = function(c) {
            var u = this.ops.length, h = this.ops[u - 1];
            if (c = s(!0, {}, c), typeof h == "object") {
              if (typeof c.delete == "number" && typeof h.delete == "number")
                return this.ops[u - 1] = { delete: h.delete + c.delete }, this;
              if (typeof h.delete == "number" && c.insert != null && (u -= 1, h = this.ops[u - 1], typeof h != "object"))
                return this.ops.unshift(c), this;
              if (o(c.attributes, h.attributes)) {
                if (typeof c.insert == "string" && typeof h.insert == "string")
                  return this.ops[u - 1] = { insert: h.insert + c.insert }, typeof c.attributes == "object" && (this.ops[u - 1].attributes = c.attributes), this;
                if (typeof c.retain == "number" && typeof h.retain == "number")
                  return this.ops[u - 1] = { retain: h.retain + c.retain }, typeof c.attributes == "object" && (this.ops[u - 1].attributes = c.attributes), this;
              }
            }
            return u === this.ops.length ? this.ops.push(c) : this.ops.splice(u, 0, c), this;
          }, d.prototype.chop = function() {
            var c = this.ops[this.ops.length - 1];
            return c && c.retain && !c.attributes && this.ops.pop(), this;
          }, d.prototype.filter = function(c) {
            return this.ops.filter(c);
          }, d.prototype.forEach = function(c) {
            this.ops.forEach(c);
          }, d.prototype.map = function(c) {
            return this.ops.map(c);
          }, d.prototype.partition = function(c) {
            var u = [], h = [];
            return this.forEach(function(y) {
              var g = c(y) ? u : h;
              g.push(y);
            }), [u, h];
          }, d.prototype.reduce = function(c, u) {
            return this.ops.reduce(c, u);
          }, d.prototype.changeLength = function() {
            return this.reduce(function(c, u) {
              return u.insert ? c + l.length(u) : u.delete ? c - u.delete : c;
            }, 0);
          }, d.prototype.length = function() {
            return this.reduce(function(c, u) {
              return c + l.length(u);
            }, 0);
          }, d.prototype.slice = function(c, u) {
            c = c || 0, typeof u != "number" && (u = 1 / 0);
            for (var h = [], y = l.iterator(this.ops), g = 0; g < u && y.hasNext(); ) {
              var b;
              g < c ? b = y.next(c - g) : (b = y.next(u - g), h.push(b)), g += l.length(b);
            }
            return new d(h);
          }, d.prototype.compose = function(c) {
            var u = l.iterator(this.ops), h = l.iterator(c.ops), y = [], g = h.peek();
            if (g != null && typeof g.retain == "number" && g.attributes == null) {
              for (var b = g.retain; u.peekType() === "insert" && u.peekLength() <= b; )
                b -= u.peekLength(), y.push(u.next());
              g.retain - b > 0 && h.next(g.retain - b);
            }
            for (var v = new d(y); u.hasNext() || h.hasNext(); )
              if (h.peekType() === "insert")
                v.push(h.next());
              else if (u.peekType() === "delete")
                v.push(u.next());
              else {
                var m = Math.min(u.peekLength(), h.peekLength()), x = u.next(m), p = h.next(m);
                if (typeof p.retain == "number") {
                  var w = {};
                  typeof x.retain == "number" ? w.retain = m : w.insert = x.insert;
                  var S = l.attributes.compose(x.attributes, p.attributes, typeof x.retain == "number");
                  if (S && (w.attributes = S), v.push(w), !h.hasNext() && o(v.ops[v.ops.length - 1], w)) {
                    var E = new d(u.rest());
                    return v.concat(E).chop();
                  }
                } else
                  typeof p.delete == "number" && typeof x.retain == "number" && v.push(p);
              }
            return v.chop();
          }, d.prototype.concat = function(c) {
            var u = new d(this.ops.slice());
            return c.ops.length > 0 && (u.push(c.ops[0]), u.ops = u.ops.concat(c.ops.slice(1))), u;
          }, d.prototype.diff = function(c, u) {
            if (this.ops === c.ops)
              return new d();
            var h = [this, c].map(function(m) {
              return m.map(function(x) {
                if (x.insert != null)
                  return typeof x.insert == "string" ? x.insert : f;
                var p = m === c ? "on" : "with";
                throw new Error("diff() called " + p + " non-document");
              }).join("");
            }), y = new d(), g = a(h[0], h[1], u), b = l.iterator(this.ops), v = l.iterator(c.ops);
            return g.forEach(function(m) {
              for (var x = m[1].length; x > 0; ) {
                var p = 0;
                switch (m[0]) {
                  case a.INSERT:
                    p = Math.min(v.peekLength(), x), y.push(v.next(p));
                    break;
                  case a.DELETE:
                    p = Math.min(x, b.peekLength()), b.next(p), y.delete(p);
                    break;
                  case a.EQUAL:
                    p = Math.min(b.peekLength(), v.peekLength(), x);
                    var w = b.next(p), S = v.next(p);
                    o(w.insert, S.insert) ? y.retain(p, l.attributes.diff(w.attributes, S.attributes)) : y.push(S).delete(p);
                    break;
                }
                x -= p;
              }
            }), y.chop();
          }, d.prototype.eachLine = function(c, u) {
            u = u || `
`;
            for (var h = l.iterator(this.ops), y = new d(), g = 0; h.hasNext(); ) {
              if (h.peekType() !== "insert")
                return;
              var b = h.peek(), v = l.length(b) - h.peekLength(), m = typeof b.insert == "string" ? b.insert.indexOf(u, v) - v : -1;
              if (m < 0)
                y.push(h.next());
              else if (m > 0)
                y.push(h.next(m));
              else {
                if (c(y, h.next(1).attributes || {}, g) === !1)
                  return;
                g += 1, y = new d();
              }
            }
            y.length() > 0 && c(y, {}, g);
          }, d.prototype.transform = function(c, u) {
            if (u = !!u, typeof c == "number")
              return this.transformPosition(c, u);
            for (var h = l.iterator(this.ops), y = l.iterator(c.ops), g = new d(); h.hasNext() || y.hasNext(); )
              if (h.peekType() === "insert" && (u || y.peekType() !== "insert"))
                g.retain(l.length(h.next()));
              else if (y.peekType() === "insert")
                g.push(y.next());
              else {
                var b = Math.min(h.peekLength(), y.peekLength()), v = h.next(b), m = y.next(b);
                if (v.delete)
                  continue;
                m.delete ? g.push(m) : g.retain(b, l.attributes.transform(v.attributes, m.attributes, u));
              }
            return g.chop();
          }, d.prototype.transformPosition = function(c, u) {
            u = !!u;
            for (var h = l.iterator(this.ops), y = 0; h.hasNext() && y <= c; ) {
              var g = h.peekLength(), b = h.peekType();
              if (h.next(), b === "delete") {
                c -= Math.min(g, c - y);
                continue;
              } else
                b === "insert" && (y < c || !u) && (c += g);
              y += g;
            }
            return c;
          }, r.exports = d;
        },
        /* 3 */
        /***/
        function(r, n) {
          var i = Object.prototype.hasOwnProperty, a = Object.prototype.toString, o = Object.defineProperty, s = Object.getOwnPropertyDescriptor, l = function(h) {
            return typeof Array.isArray == "function" ? Array.isArray(h) : a.call(h) === "[object Array]";
          }, f = function(h) {
            if (!h || a.call(h) !== "[object Object]")
              return !1;
            var y = i.call(h, "constructor"), g = h.constructor && h.constructor.prototype && i.call(h.constructor.prototype, "isPrototypeOf");
            if (h.constructor && !y && !g)
              return !1;
            var b;
            for (b in h)
              ;
            return typeof b > "u" || i.call(h, b);
          }, d = function(h, y) {
            o && y.name === "__proto__" ? o(h, y.name, {
              enumerable: !0,
              configurable: !0,
              value: y.newValue,
              writable: !0
            }) : h[y.name] = y.newValue;
          }, c = function(h, y) {
            if (y === "__proto__")
              if (i.call(h, y)) {
                if (s)
                  return s(h, y).value;
              } else
                return;
            return h[y];
          };
          r.exports = function u() {
            var h, y, g, b, v, m, x = arguments[0], p = 1, w = arguments.length, S = !1;
            for (typeof x == "boolean" && (S = x, x = arguments[1] || {}, p = 2), (x == null || typeof x != "object" && typeof x != "function") && (x = {}); p < w; ++p)
              if (h = arguments[p], h != null)
                for (y in h)
                  g = c(x, y), b = c(h, y), x !== b && (S && b && (f(b) || (v = l(b))) ? (v ? (v = !1, m = g && l(g) ? g : []) : m = g && f(g) ? g : {}, d(x, { name: y, newValue: u(S, m, b) })) : typeof b < "u" && d(x, { name: y, newValue: b }));
            return x;
          };
        },
        /* 4 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.BlockEmbed = n.bubbleFormats = void 0;
          var a = function() {
            function O(N, k) {
              for (var I = 0; I < k.length; I++) {
                var R = k[I];
                R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(N, R.key, R);
              }
            }
            return function(N, k, I) {
              return k && O(N.prototype, k), I && O(N, I), N;
            };
          }(), o = function O(N, k, I) {
            N === null && (N = Function.prototype);
            var R = Object.getOwnPropertyDescriptor(N, k);
            if (R === void 0) {
              var H = Object.getPrototypeOf(N);
              return H === null ? void 0 : O(H, k, I);
            } else {
              if ("value" in R)
                return R.value;
              var U = R.get;
              return U === void 0 ? void 0 : U.call(I);
            }
          }, s = i(3), l = x(s), f = i(2), d = x(f), c = i(0), u = x(c), h = i(16), y = x(h), g = i(6), b = x(g), v = i(7), m = x(v);
          function x(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function p(O, N) {
            if (!(O instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function w(O, N) {
            if (!O)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return N && (typeof N == "object" || typeof N == "function") ? N : O;
          }
          function S(O, N) {
            if (typeof N != "function" && N !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof N);
            O.prototype = Object.create(N && N.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(O, N) : O.__proto__ = N);
          }
          var E = 1, A = function(O) {
            S(N, O);
            function N() {
              return p(this, N), w(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
            }
            return a(N, [{
              key: "attach",
              value: function() {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "attach", this).call(this), this.attributes = new u.default.Attributor.Store(this.domNode);
              }
            }, {
              key: "delta",
              value: function() {
                return new d.default().insert(this.value(), (0, l.default)(this.formats(), this.attributes.values()));
              }
            }, {
              key: "format",
              value: function(I, R) {
                var H = u.default.query(I, u.default.Scope.BLOCK_ATTRIBUTE);
                H != null && this.attributes.attribute(H, R);
              }
            }, {
              key: "formatAt",
              value: function(I, R, H, U) {
                this.format(H, U);
              }
            }, {
              key: "insertAt",
              value: function(I, R, H) {
                if (typeof R == "string" && R.endsWith(`
`)) {
                  var U = u.default.create(j.blotName);
                  this.parent.insertBefore(U, I === 0 ? this : this.next), U.insertAt(0, R.slice(0, -1));
                } else
                  o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertAt", this).call(this, I, R, H);
              }
            }]), N;
          }(u.default.Embed);
          A.scope = u.default.Scope.BLOCK_BLOT;
          var j = function(O) {
            S(N, O);
            function N(k) {
              p(this, N);
              var I = w(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this, k));
              return I.cache = {}, I;
            }
            return a(N, [{
              key: "delta",
              value: function() {
                return this.cache.delta == null && (this.cache.delta = this.descendants(u.default.Leaf).reduce(function(I, R) {
                  return R.length() === 0 ? I : I.insert(R.value(), _(R));
                }, new d.default()).insert(`
`, _(this))), this.cache.delta;
              }
            }, {
              key: "deleteAt",
              value: function(I, R) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "deleteAt", this).call(this, I, R), this.cache = {};
              }
            }, {
              key: "formatAt",
              value: function(I, R, H, U) {
                R <= 0 || (u.default.query(H, u.default.Scope.BLOCK) ? I + R === this.length() && this.format(H, U) : o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "formatAt", this).call(this, I, Math.min(R, this.length() - I - 1), H, U), this.cache = {});
              }
            }, {
              key: "insertAt",
              value: function(I, R, H) {
                if (H != null)
                  return o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertAt", this).call(this, I, R, H);
                if (R.length !== 0) {
                  var U = R.split(`
`), G = U.shift();
                  G.length > 0 && (I < this.length() - 1 || this.children.tail == null ? o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertAt", this).call(this, Math.min(I, this.length() - 1), G) : this.children.tail.insertAt(this.children.tail.length(), G), this.cache = {});
                  var q = this;
                  U.reduce(function(P, T) {
                    return q = q.split(P, !0), q.insertAt(0, T), T.length;
                  }, I + G.length);
                }
              }
            }, {
              key: "insertBefore",
              value: function(I, R) {
                var H = this.children.head;
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertBefore", this).call(this, I, R), H instanceof y.default && H.remove(), this.cache = {};
              }
            }, {
              key: "length",
              value: function() {
                return this.cache.length == null && (this.cache.length = o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "length", this).call(this) + E), this.cache.length;
              }
            }, {
              key: "moveChildren",
              value: function(I, R) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "moveChildren", this).call(this, I, R), this.cache = {};
              }
            }, {
              key: "optimize",
              value: function(I) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "optimize", this).call(this, I), this.cache = {};
              }
            }, {
              key: "path",
              value: function(I) {
                return o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "path", this).call(this, I, !0);
              }
            }, {
              key: "removeChild",
              value: function(I) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "removeChild", this).call(this, I), this.cache = {};
              }
            }, {
              key: "split",
              value: function(I) {
                var R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                if (R && (I === 0 || I >= this.length() - E)) {
                  var H = this.clone();
                  return I === 0 ? (this.parent.insertBefore(H, this), this) : (this.parent.insertBefore(H, this.next), H);
                } else {
                  var U = o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "split", this).call(this, I, R);
                  return this.cache = {}, U;
                }
              }
            }]), N;
          }(u.default.Block);
          j.blotName = "block", j.tagName = "P", j.defaultChild = "break", j.allowedChildren = [b.default, u.default.Embed, m.default];
          function _(O) {
            var N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return O == null || (typeof O.formats == "function" && (N = (0, l.default)(N, O.formats())), O.parent == null || O.parent.blotName == "scroll" || O.parent.statics.scope !== O.statics.scope) ? N : _(O.parent, N);
          }
          n.bubbleFormats = _, n.BlockEmbed = A, n.default = j;
        },
        /* 5 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.overload = n.expandConfig = void 0;
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(q) {
            return typeof q;
          } : function(q) {
            return q && typeof Symbol == "function" && q.constructor === Symbol && q !== Symbol.prototype ? "symbol" : typeof q;
          }, o = function() {
            function q(P, T) {
              var M = [], D = !0, F = !1, z = void 0;
              try {
                for (var C = P[Symbol.iterator](), $; !(D = ($ = C.next()).done) && (M.push($.value), !(T && M.length === T)); D = !0)
                  ;
              } catch (W) {
                F = !0, z = W;
              } finally {
                try {
                  !D && C.return && C.return();
                } finally {
                  if (F)
                    throw z;
                }
              }
              return M;
            }
            return function(P, T) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return q(P, T);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), s = function() {
            function q(P, T) {
              for (var M = 0; M < T.length; M++) {
                var D = T[M];
                D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(P, D.key, D);
              }
            }
            return function(P, T, M) {
              return T && q(P.prototype, T), M && q(P, M), P;
            };
          }();
          i(50);
          var l = i(2), f = _(l), d = i(14), c = _(d), u = i(8), h = _(u), y = i(9), g = _(y), b = i(0), v = _(b), m = i(15), x = _(m), p = i(3), w = _(p), S = i(10), E = _(S), A = i(34), j = _(A);
          function _(q) {
            return q && q.__esModule ? q : { default: q };
          }
          function O(q, P, T) {
            return P in q ? Object.defineProperty(q, P, { value: T, enumerable: !0, configurable: !0, writable: !0 }) : q[P] = T, q;
          }
          function N(q, P) {
            if (!(q instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          var k = (0, E.default)("quill"), I = function() {
            s(q, null, [{
              key: "debug",
              value: function(T) {
                T === !0 && (T = "log"), E.default.level(T);
              }
            }, {
              key: "find",
              value: function(T) {
                return T.__quill || v.default.find(T);
              }
            }, {
              key: "import",
              value: function(T) {
                return this.imports[T] == null && k.error("Cannot import " + T + ". Are you sure it was registered?"), this.imports[T];
              }
            }, {
              key: "register",
              value: function(T, M) {
                var D = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                if (typeof T != "string") {
                  var z = T.attrName || T.blotName;
                  typeof z == "string" ? this.register("formats/" + z, T, M) : Object.keys(T).forEach(function(C) {
                    D.register(C, T[C], M);
                  });
                } else
                  this.imports[T] != null && !F && k.warn("Overwriting " + T + " with", M), this.imports[T] = M, (T.startsWith("blots/") || T.startsWith("formats/")) && M.blotName !== "abstract" ? v.default.register(M) : T.startsWith("modules") && typeof M.register == "function" && M.register();
              }
            }]);
            function q(P) {
              var T = this, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (N(this, q), this.options = R(P, M), this.container = this.options.container, this.container == null)
                return k.error("Invalid Quill container", P);
              this.options.debug && q.debug(this.options.debug);
              var D = this.container.innerHTML.trim();
              this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new h.default(), this.scroll = v.default.create(this.root, {
                emitter: this.emitter,
                whitelist: this.options.formats
              }), this.editor = new c.default(this.scroll), this.selection = new x.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(h.default.events.EDITOR_CHANGE, function(z) {
                z === h.default.events.TEXT_CHANGE && T.root.classList.toggle("ql-blank", T.editor.isBlank());
              }), this.emitter.on(h.default.events.SCROLL_UPDATE, function(z, C) {
                var $ = T.selection.lastRange, W = $ && $.length === 0 ? $.index : void 0;
                H.call(T, function() {
                  return T.editor.update(null, C, W);
                }, z);
              });
              var F = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + D + "<p><br></p></div>");
              this.setContents(F), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
            }
            return s(q, [{
              key: "addContainer",
              value: function(T) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                if (typeof T == "string") {
                  var D = T;
                  T = document.createElement("div"), T.classList.add(D);
                }
                return this.container.insertBefore(T, M), T;
              }
            }, {
              key: "blur",
              value: function() {
                this.selection.setRange(null);
              }
            }, {
              key: "deleteText",
              value: function(T, M, D) {
                var F = this, z = U(T, M, D), C = o(z, 4);
                return T = C[0], M = C[1], D = C[3], H.call(this, function() {
                  return F.editor.deleteText(T, M);
                }, D, T, -1 * M);
              }
            }, {
              key: "disable",
              value: function() {
                this.enable(!1);
              }
            }, {
              key: "enable",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.scroll.enable(T), this.container.classList.toggle("ql-disabled", !T);
              }
            }, {
              key: "focus",
              value: function() {
                var T = this.scrollingContainer.scrollTop;
                this.selection.focus(), this.scrollingContainer.scrollTop = T, this.scrollIntoView();
              }
            }, {
              key: "format",
              value: function(T, M) {
                var D = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : h.default.sources.API;
                return H.call(this, function() {
                  var z = D.getSelection(!0), C = new f.default();
                  if (z == null)
                    return C;
                  if (v.default.query(T, v.default.Scope.BLOCK))
                    C = D.editor.formatLine(z.index, z.length, O({}, T, M));
                  else {
                    if (z.length === 0)
                      return D.selection.format(T, M), C;
                    C = D.editor.formatText(z.index, z.length, O({}, T, M));
                  }
                  return D.setSelection(z, h.default.sources.SILENT), C;
                }, F);
              }
            }, {
              key: "formatLine",
              value: function(T, M, D, F, z) {
                var C = this, $ = void 0, W = U(T, M, D, F, z), Y = o(W, 4);
                return T = Y[0], M = Y[1], $ = Y[2], z = Y[3], H.call(this, function() {
                  return C.editor.formatLine(T, M, $);
                }, z, T, 0);
              }
            }, {
              key: "formatText",
              value: function(T, M, D, F, z) {
                var C = this, $ = void 0, W = U(T, M, D, F, z), Y = o(W, 4);
                return T = Y[0], M = Y[1], $ = Y[2], z = Y[3], H.call(this, function() {
                  return C.editor.formatText(T, M, $);
                }, z, T, 0);
              }
            }, {
              key: "getBounds",
              value: function(T) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, D = void 0;
                typeof T == "number" ? D = this.selection.getBounds(T, M) : D = this.selection.getBounds(T.index, T.length);
                var F = this.container.getBoundingClientRect();
                return {
                  bottom: D.bottom - F.top,
                  height: D.height,
                  left: D.left - F.left,
                  right: D.right - F.left,
                  top: D.top - F.top,
                  width: D.width
                };
              }
            }, {
              key: "getContents",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - T, D = U(T, M), F = o(D, 2);
                return T = F[0], M = F[1], this.editor.getContents(T, M);
              }
            }, {
              key: "getFormat",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                return typeof T == "number" ? this.editor.getFormat(T, M) : this.editor.getFormat(T.index, T.length);
              }
            }, {
              key: "getIndex",
              value: function(T) {
                return T.offset(this.scroll);
              }
            }, {
              key: "getLength",
              value: function() {
                return this.scroll.length();
              }
            }, {
              key: "getLeaf",
              value: function(T) {
                return this.scroll.leaf(T);
              }
            }, {
              key: "getLine",
              value: function(T) {
                return this.scroll.line(T);
              }
            }, {
              key: "getLines",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
                return typeof T != "number" ? this.scroll.lines(T.index, T.length) : this.scroll.lines(T, M);
              }
            }, {
              key: "getModule",
              value: function(T) {
                return this.theme.modules[T];
              }
            }, {
              key: "getSelection",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                return T && this.focus(), this.update(), this.selection.getRange()[0];
              }
            }, {
              key: "getText",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - T, D = U(T, M), F = o(D, 2);
                return T = F[0], M = F[1], this.editor.getText(T, M);
              }
            }, {
              key: "hasFocus",
              value: function() {
                return this.selection.hasFocus();
              }
            }, {
              key: "insertEmbed",
              value: function(T, M, D) {
                var F = this, z = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : q.sources.API;
                return H.call(this, function() {
                  return F.editor.insertEmbed(T, M, D);
                }, z, T);
              }
            }, {
              key: "insertText",
              value: function(T, M, D, F, z) {
                var C = this, $ = void 0, W = U(T, 0, D, F, z), Y = o(W, 4);
                return T = Y[0], $ = Y[2], z = Y[3], H.call(this, function() {
                  return C.editor.insertText(T, M, $);
                }, z, T, M.length);
              }
            }, {
              key: "isEnabled",
              value: function() {
                return !this.container.classList.contains("ql-disabled");
              }
            }, {
              key: "off",
              value: function() {
                return this.emitter.off.apply(this.emitter, arguments);
              }
            }, {
              key: "on",
              value: function() {
                return this.emitter.on.apply(this.emitter, arguments);
              }
            }, {
              key: "once",
              value: function() {
                return this.emitter.once.apply(this.emitter, arguments);
              }
            }, {
              key: "pasteHTML",
              value: function(T, M, D) {
                this.clipboard.dangerouslyPasteHTML(T, M, D);
              }
            }, {
              key: "removeFormat",
              value: function(T, M, D) {
                var F = this, z = U(T, M, D), C = o(z, 4);
                return T = C[0], M = C[1], D = C[3], H.call(this, function() {
                  return F.editor.removeFormat(T, M);
                }, D, T);
              }
            }, {
              key: "scrollIntoView",
              value: function() {
                this.selection.scrollIntoView(this.scrollingContainer);
              }
            }, {
              key: "setContents",
              value: function(T) {
                var M = this, D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : h.default.sources.API;
                return H.call(this, function() {
                  T = new f.default(T);
                  var F = M.getLength(), z = M.editor.deleteText(0, F), C = M.editor.applyDelta(T), $ = C.ops[C.ops.length - 1];
                  $ != null && typeof $.insert == "string" && $.insert[$.insert.length - 1] === `
` && (M.editor.deleteText(M.getLength() - 1, 1), C.delete(1));
                  var W = z.compose(C);
                  return W;
                }, D);
              }
            }, {
              key: "setSelection",
              value: function(T, M, D) {
                if (T == null)
                  this.selection.setRange(null, M || q.sources.API);
                else {
                  var F = U(T, M, D), z = o(F, 4);
                  T = z[0], M = z[1], D = z[3], this.selection.setRange(new m.Range(T, M), D), D !== h.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
                }
              }
            }, {
              key: "setText",
              value: function(T) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : h.default.sources.API, D = new f.default().insert(T);
                return this.setContents(D, M);
              }
            }, {
              key: "update",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : h.default.sources.USER, M = this.scroll.update(T);
                return this.selection.update(T), M;
              }
            }, {
              key: "updateContents",
              value: function(T) {
                var M = this, D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : h.default.sources.API;
                return H.call(this, function() {
                  return T = new f.default(T), M.editor.applyDelta(T, D);
                }, D, !0);
              }
            }]), q;
          }();
          I.DEFAULTS = {
            bounds: null,
            formats: null,
            modules: {},
            placeholder: "",
            readOnly: !1,
            scrollingContainer: null,
            strict: !0,
            theme: "default"
          }, I.events = h.default.events, I.sources = h.default.sources, I.version = "1.3.7", I.imports = {
            delta: f.default,
            parchment: v.default,
            "core/module": g.default,
            "core/theme": j.default
          };
          function R(q, P) {
            if (P = (0, w.default)(!0, {
              container: q,
              modules: {
                clipboard: !0,
                keyboard: !0,
                history: !0
              }
            }, P), !P.theme || P.theme === I.DEFAULTS.theme)
              P.theme = j.default;
            else if (P.theme = I.import("themes/" + P.theme), P.theme == null)
              throw new Error("Invalid theme " + P.theme + ". Did you register it?");
            var T = (0, w.default)(!0, {}, P.theme.DEFAULTS);
            [T, P].forEach(function(F) {
              F.modules = F.modules || {}, Object.keys(F.modules).forEach(function(z) {
                F.modules[z] === !0 && (F.modules[z] = {});
              });
            });
            var M = Object.keys(T.modules).concat(Object.keys(P.modules)), D = M.reduce(function(F, z) {
              var C = I.import("modules/" + z);
              return C == null ? k.error("Cannot load " + z + " module. Are you sure you registered it?") : F[z] = C.DEFAULTS || {}, F;
            }, {});
            return P.modules != null && P.modules.toolbar && P.modules.toolbar.constructor !== Object && (P.modules.toolbar = {
              container: P.modules.toolbar
            }), P = (0, w.default)(!0, {}, I.DEFAULTS, { modules: D }, T, P), ["bounds", "container", "scrollingContainer"].forEach(function(F) {
              typeof P[F] == "string" && (P[F] = document.querySelector(P[F]));
            }), P.modules = Object.keys(P.modules).reduce(function(F, z) {
              return P.modules[z] && (F[z] = P.modules[z]), F;
            }, {}), P;
          }
          function H(q, P, T, M) {
            if (this.options.strict && !this.isEnabled() && P === h.default.sources.USER)
              return new f.default();
            var D = T == null ? null : this.getSelection(), F = this.editor.delta, z = q();
            if (D != null && (T === !0 && (T = D.index), M == null ? D = G(D, z, P) : M !== 0 && (D = G(D, T, M, P)), this.setSelection(D, h.default.sources.SILENT)), z.length() > 0) {
              var C, $ = [h.default.events.TEXT_CHANGE, z, F, P];
              if ((C = this.emitter).emit.apply(C, [h.default.events.EDITOR_CHANGE].concat($)), P !== h.default.sources.SILENT) {
                var W;
                (W = this.emitter).emit.apply(W, $);
              }
            }
            return z;
          }
          function U(q, P, T, M, D) {
            var F = {};
            return typeof q.index == "number" && typeof q.length == "number" ? typeof P != "number" ? (D = M, M = T, T = P, P = q.length, q = q.index) : (P = q.length, q = q.index) : typeof P != "number" && (D = M, M = T, T = P, P = 0), (typeof T > "u" ? "undefined" : a(T)) === "object" ? (F = T, D = M) : typeof T == "string" && (M != null ? F[T] = M : D = T), D = D || h.default.sources.API, [q, P, F, D];
          }
          function G(q, P, T, M) {
            if (q == null)
              return null;
            var D = void 0, F = void 0;
            if (P instanceof f.default) {
              var z = [q.index, q.index + q.length].map(function(Y) {
                return P.transformPosition(Y, M !== h.default.sources.USER);
              }), C = o(z, 2);
              D = C[0], F = C[1];
            } else {
              var $ = [q.index, q.index + q.length].map(function(Y) {
                return Y < P || Y === P && M === h.default.sources.USER ? Y : T >= 0 ? Y + T : Math.max(P, Y + T);
              }), W = o($, 2);
              D = W[0], F = W[1];
            }
            return new m.Range(D, F - D);
          }
          n.expandConfig = R, n.overload = U, n.default = I;
        },
        /* 6 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function b(v, m) {
              for (var x = 0; x < m.length; x++) {
                var p = m[x];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, m, x) {
              return m && b(v.prototype, m), x && b(v, x), v;
            };
          }(), o = function b(v, m, x) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, m);
            if (p === void 0) {
              var w = Object.getPrototypeOf(v);
              return w === null ? void 0 : b(w, m, x);
            } else {
              if ("value" in p)
                return p.value;
              var S = p.get;
              return S === void 0 ? void 0 : S.call(x);
            }
          }, s = i(7), l = c(s), f = i(0), d = c(f);
          function c(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function u(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function h(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function y(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var g = function(b) {
            y(v, b);
            function v() {
              return u(this, v), h(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "formatAt",
              value: function(x, p, w, S) {
                if (v.compare(this.statics.blotName, w) < 0 && d.default.query(w, d.default.Scope.BLOT)) {
                  var E = this.isolate(x, p);
                  S && E.wrap(w, S);
                } else
                  o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "formatAt", this).call(this, x, p, w, S);
              }
            }, {
              key: "optimize",
              value: function(x) {
                if (o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "optimize", this).call(this, x), this.parent instanceof v && v.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                  var p = this.parent.isolate(this.offset(), this.length());
                  this.moveChildren(p), p.wrap(this);
                }
              }
            }], [{
              key: "compare",
              value: function(x, p) {
                var w = v.order.indexOf(x), S = v.order.indexOf(p);
                return w >= 0 || S >= 0 ? w - S : x === p ? 0 : x < p ? -1 : 1;
              }
            }]), v;
          }(d.default.Inline);
          g.allowedChildren = [g, d.default.Embed, l.default], g.order = [
            "cursor",
            "inline",
            // Must be lower
            "underline",
            "strike",
            "italic",
            "bold",
            "script",
            "link",
            "code"
            // Must be higher
          ], n.default = g;
        },
        /* 7 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(0), o = s(a);
          function s(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function l(u, h) {
            if (!(u instanceof h))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(u, h) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return h && (typeof h == "object" || typeof h == "function") ? h : u;
          }
          function d(u, h) {
            if (typeof h != "function" && h !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof h);
            u.prototype = Object.create(h && h.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), h && (Object.setPrototypeOf ? Object.setPrototypeOf(u, h) : u.__proto__ = h);
          }
          var c = function(u) {
            d(h, u);
            function h() {
              return l(this, h), f(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));
            }
            return h;
          }(o.default.Text);
          n.default = c;
        },
        /* 8 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function m(x, p) {
              for (var w = 0; w < p.length; w++) {
                var S = p[w];
                S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(x, S.key, S);
              }
            }
            return function(x, p, w) {
              return p && m(x.prototype, p), w && m(x, w), x;
            };
          }(), o = function m(x, p, w) {
            x === null && (x = Function.prototype);
            var S = Object.getOwnPropertyDescriptor(x, p);
            if (S === void 0) {
              var E = Object.getPrototypeOf(x);
              return E === null ? void 0 : m(E, p, w);
            } else {
              if ("value" in S)
                return S.value;
              var A = S.get;
              return A === void 0 ? void 0 : A.call(w);
            }
          }, s = i(54), l = c(s), f = i(10), d = c(f);
          function c(m) {
            return m && m.__esModule ? m : { default: m };
          }
          function u(m, x) {
            if (!(m instanceof x))
              throw new TypeError("Cannot call a class as a function");
          }
          function h(m, x) {
            if (!m)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return x && (typeof x == "object" || typeof x == "function") ? x : m;
          }
          function y(m, x) {
            if (typeof x != "function" && x !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof x);
            m.prototype = Object.create(x && x.prototype, { constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 } }), x && (Object.setPrototypeOf ? Object.setPrototypeOf(m, x) : m.__proto__ = x);
          }
          var g = (0, d.default)("quill:events"), b = ["selectionchange", "mousedown", "mouseup", "click"];
          b.forEach(function(m) {
            document.addEventListener(m, function() {
              for (var x = arguments.length, p = Array(x), w = 0; w < x; w++)
                p[w] = arguments[w];
              [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(S) {
                if (S.__quill && S.__quill.emitter) {
                  var E;
                  (E = S.__quill.emitter).handleDOM.apply(E, p);
                }
              });
            });
          });
          var v = function(m) {
            y(x, m);
            function x() {
              u(this, x);
              var p = h(this, (x.__proto__ || Object.getPrototypeOf(x)).call(this));
              return p.listeners = {}, p.on("error", g.error), p;
            }
            return a(x, [{
              key: "emit",
              value: function() {
                g.log.apply(g, arguments), o(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "emit", this).apply(this, arguments);
              }
            }, {
              key: "handleDOM",
              value: function(w) {
                for (var S = arguments.length, E = Array(S > 1 ? S - 1 : 0), A = 1; A < S; A++)
                  E[A - 1] = arguments[A];
                (this.listeners[w.type] || []).forEach(function(j) {
                  var _ = j.node, O = j.handler;
                  (w.target === _ || _.contains(w.target)) && O.apply(void 0, [w].concat(E));
                });
              }
            }, {
              key: "listenDOM",
              value: function(w, S, E) {
                this.listeners[w] || (this.listeners[w] = []), this.listeners[w].push({ node: S, handler: E });
              }
            }]), x;
          }(l.default);
          v.events = {
            EDITOR_CHANGE: "editor-change",
            SCROLL_BEFORE_UPDATE: "scroll-before-update",
            SCROLL_OPTIMIZE: "scroll-optimize",
            SCROLL_UPDATE: "scroll-update",
            SELECTION_CHANGE: "selection-change",
            TEXT_CHANGE: "text-change"
          }, v.sources = {
            API: "api",
            SILENT: "silent",
            USER: "user"
          }, n.default = v;
        },
        /* 9 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          function a(s, l) {
            if (!(s instanceof l))
              throw new TypeError("Cannot call a class as a function");
          }
          var o = function s(l) {
            var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            a(this, s), this.quill = l, this.options = f;
          };
          o.DEFAULTS = {}, n.default = o;
        },
        /* 10 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = ["error", "warn", "log", "info"], o = "warn";
          function s(f) {
            if (a.indexOf(f) <= a.indexOf(o)) {
              for (var d, c = arguments.length, u = Array(c > 1 ? c - 1 : 0), h = 1; h < c; h++)
                u[h - 1] = arguments[h];
              (d = console)[f].apply(d, u);
            }
          }
          function l(f) {
            return a.reduce(function(d, c) {
              return d[c] = s.bind(console, c, f), d;
            }, {});
          }
          s.level = l.level = function(f) {
            o = f;
          }, n.default = l;
        },
        /* 11 */
        /***/
        function(r, n, i) {
          var a = Array.prototype.slice, o = i(52), s = i(53), l = r.exports = function(u, h, y) {
            return y || (y = {}), u === h ? !0 : u instanceof Date && h instanceof Date ? u.getTime() === h.getTime() : !u || !h || typeof u != "object" && typeof h != "object" ? y.strict ? u === h : u == h : c(u, h, y);
          };
          function f(u) {
            return u == null;
          }
          function d(u) {
            return !(!u || typeof u != "object" || typeof u.length != "number" || typeof u.copy != "function" || typeof u.slice != "function" || u.length > 0 && typeof u[0] != "number");
          }
          function c(u, h, y) {
            var g, b;
            if (f(u) || f(h) || u.prototype !== h.prototype)
              return !1;
            if (s(u))
              return s(h) ? (u = a.call(u), h = a.call(h), l(u, h, y)) : !1;
            if (d(u)) {
              if (!d(h) || u.length !== h.length)
                return !1;
              for (g = 0; g < u.length; g++)
                if (u[g] !== h[g])
                  return !1;
              return !0;
            }
            try {
              var v = o(u), m = o(h);
            } catch {
              return !1;
            }
            if (v.length != m.length)
              return !1;
            for (v.sort(), m.sort(), g = v.length - 1; g >= 0; g--)
              if (v[g] != m[g])
                return !1;
            for (g = v.length - 1; g >= 0; g--)
              if (b = v[g], !l(u[b], h[b], y))
                return !1;
            return typeof u == typeof h;
          }
        },
        /* 12 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", { value: !0 });
          var a = i(1), o = (
            /** @class */
            function() {
              function s(l, f, d) {
                d === void 0 && (d = {}), this.attrName = l, this.keyName = f;
                var c = a.Scope.TYPE & a.Scope.ATTRIBUTE;
                d.scope != null ? this.scope = d.scope & a.Scope.LEVEL | c : this.scope = a.Scope.ATTRIBUTE, d.whitelist != null && (this.whitelist = d.whitelist);
              }
              return s.keys = function(l) {
                return [].map.call(l.attributes, function(f) {
                  return f.name;
                });
              }, s.prototype.add = function(l, f) {
                return this.canAdd(l, f) ? (l.setAttribute(this.keyName, f), !0) : !1;
              }, s.prototype.canAdd = function(l, f) {
                var d = a.query(l, a.Scope.BLOT & (this.scope | a.Scope.TYPE));
                return d == null ? !1 : this.whitelist == null ? !0 : typeof f == "string" ? this.whitelist.indexOf(f.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(f) > -1;
              }, s.prototype.remove = function(l) {
                l.removeAttribute(this.keyName);
              }, s.prototype.value = function(l) {
                var f = l.getAttribute(this.keyName);
                return this.canAdd(l, f) && f ? f : "";
              }, s;
            }()
          );
          n.default = o;
        },
        /* 13 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.Code = void 0;
          var a = function() {
            function A(j, _) {
              var O = [], N = !0, k = !1, I = void 0;
              try {
                for (var R = j[Symbol.iterator](), H; !(N = (H = R.next()).done) && (O.push(H.value), !(_ && O.length === _)); N = !0)
                  ;
              } catch (U) {
                k = !0, I = U;
              } finally {
                try {
                  !N && R.return && R.return();
                } finally {
                  if (k)
                    throw I;
                }
              }
              return O;
            }
            return function(j, _) {
              if (Array.isArray(j))
                return j;
              if (Symbol.iterator in Object(j))
                return A(j, _);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function A(j, _) {
              for (var O = 0; O < _.length; O++) {
                var N = _[O];
                N.enumerable = N.enumerable || !1, N.configurable = !0, "value" in N && (N.writable = !0), Object.defineProperty(j, N.key, N);
              }
            }
            return function(j, _, O) {
              return _ && A(j.prototype, _), O && A(j, O), j;
            };
          }(), s = function A(j, _, O) {
            j === null && (j = Function.prototype);
            var N = Object.getOwnPropertyDescriptor(j, _);
            if (N === void 0) {
              var k = Object.getPrototypeOf(j);
              return k === null ? void 0 : A(k, _, O);
            } else {
              if ("value" in N)
                return N.value;
              var I = N.get;
              return I === void 0 ? void 0 : I.call(O);
            }
          }, l = i(2), f = m(l), d = i(0), c = m(d), u = i(4), h = m(u), y = i(6), g = m(y), b = i(7), v = m(b);
          function m(A) {
            return A && A.__esModule ? A : { default: A };
          }
          function x(A, j) {
            if (!(A instanceof j))
              throw new TypeError("Cannot call a class as a function");
          }
          function p(A, j) {
            if (!A)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return j && (typeof j == "object" || typeof j == "function") ? j : A;
          }
          function w(A, j) {
            if (typeof j != "function" && j !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof j);
            A.prototype = Object.create(j && j.prototype, { constructor: { value: A, enumerable: !1, writable: !0, configurable: !0 } }), j && (Object.setPrototypeOf ? Object.setPrototypeOf(A, j) : A.__proto__ = j);
          }
          var S = function(A) {
            w(j, A);
            function j() {
              return x(this, j), p(this, (j.__proto__ || Object.getPrototypeOf(j)).apply(this, arguments));
            }
            return j;
          }(g.default);
          S.blotName = "code", S.tagName = "CODE";
          var E = function(A) {
            w(j, A);
            function j() {
              return x(this, j), p(this, (j.__proto__ || Object.getPrototypeOf(j)).apply(this, arguments));
            }
            return o(j, [{
              key: "delta",
              value: function() {
                var O = this, N = this.domNode.textContent;
                return N.endsWith(`
`) && (N = N.slice(0, -1)), N.split(`
`).reduce(function(k, I) {
                  return k.insert(I).insert(`
`, O.formats());
                }, new f.default());
              }
            }, {
              key: "format",
              value: function(O, N) {
                if (!(O === this.statics.blotName && N)) {
                  var k = this.descendant(v.default, this.length() - 1), I = a(k, 1), R = I[0];
                  R != null && R.deleteAt(R.length() - 1, 1), s(j.prototype.__proto__ || Object.getPrototypeOf(j.prototype), "format", this).call(this, O, N);
                }
              }
            }, {
              key: "formatAt",
              value: function(O, N, k, I) {
                if (N !== 0 && !(c.default.query(k, c.default.Scope.BLOCK) == null || k === this.statics.blotName && I === this.statics.formats(this.domNode))) {
                  var R = this.newlineIndex(O);
                  if (!(R < 0 || R >= O + N)) {
                    var H = this.newlineIndex(O, !0) + 1, U = R - H + 1, G = this.isolate(H, U), q = G.next;
                    G.format(k, I), q instanceof j && q.formatAt(0, O - H + N - U, k, I);
                  }
                }
              }
            }, {
              key: "insertAt",
              value: function(O, N, k) {
                if (k == null) {
                  var I = this.descendant(v.default, O), R = a(I, 2), H = R[0], U = R[1];
                  H.insertAt(U, N);
                }
              }
            }, {
              key: "length",
              value: function() {
                var O = this.domNode.textContent.length;
                return this.domNode.textContent.endsWith(`
`) ? O : O + 1;
              }
            }, {
              key: "newlineIndex",
              value: function(O) {
                var N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                if (N)
                  return this.domNode.textContent.slice(0, O).lastIndexOf(`
`);
                var k = this.domNode.textContent.slice(O).indexOf(`
`);
                return k > -1 ? O + k : -1;
              }
            }, {
              key: "optimize",
              value: function(O) {
                this.domNode.textContent.endsWith(`
`) || this.appendChild(c.default.create("text", `
`)), s(j.prototype.__proto__ || Object.getPrototypeOf(j.prototype), "optimize", this).call(this, O);
                var N = this.next;
                N != null && N.prev === this && N.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === N.statics.formats(N.domNode) && (N.optimize(O), N.moveChildren(this), N.remove());
              }
            }, {
              key: "replace",
              value: function(O) {
                s(j.prototype.__proto__ || Object.getPrototypeOf(j.prototype), "replace", this).call(this, O), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(N) {
                  var k = c.default.find(N);
                  k == null ? N.parentNode.removeChild(N) : k instanceof c.default.Embed ? k.remove() : k.unwrap();
                });
              }
            }], [{
              key: "create",
              value: function(O) {
                var N = s(j.__proto__ || Object.getPrototypeOf(j), "create", this).call(this, O);
                return N.setAttribute("spellcheck", !1), N;
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), j;
          }(h.default);
          E.blotName = "code-block", E.tagName = "PRE", E.TAB = "  ", n.Code = S, n.default = E;
        },
        /* 14 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(q) {
            return typeof q;
          } : function(q) {
            return q && typeof Symbol == "function" && q.constructor === Symbol && q !== Symbol.prototype ? "symbol" : typeof q;
          }, o = function() {
            function q(P, T) {
              var M = [], D = !0, F = !1, z = void 0;
              try {
                for (var C = P[Symbol.iterator](), $; !(D = ($ = C.next()).done) && (M.push($.value), !(T && M.length === T)); D = !0)
                  ;
              } catch (W) {
                F = !0, z = W;
              } finally {
                try {
                  !D && C.return && C.return();
                } finally {
                  if (F)
                    throw z;
                }
              }
              return M;
            }
            return function(P, T) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return q(P, T);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), s = function() {
            function q(P, T) {
              for (var M = 0; M < T.length; M++) {
                var D = T[M];
                D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(P, D.key, D);
              }
            }
            return function(P, T, M) {
              return T && q(P.prototype, T), M && q(P, M), P;
            };
          }(), l = i(2), f = N(l), d = i(20), c = N(d), u = i(0), h = N(u), y = i(13), g = N(y), b = i(24), v = N(b), m = i(4), x = N(m), p = i(16), w = N(p), S = i(21), E = N(S), A = i(11), j = N(A), _ = i(3), O = N(_);
          function N(q) {
            return q && q.__esModule ? q : { default: q };
          }
          function k(q, P, T) {
            return P in q ? Object.defineProperty(q, P, { value: T, enumerable: !0, configurable: !0, writable: !0 }) : q[P] = T, q;
          }
          function I(q, P) {
            if (!(q instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          var R = /^[ -~]*$/, H = function() {
            function q(P) {
              I(this, q), this.scroll = P, this.delta = this.getDelta();
            }
            return s(q, [{
              key: "applyDelta",
              value: function(T) {
                var M = this, D = !1;
                this.scroll.update();
                var F = this.scroll.length();
                return this.scroll.batchStart(), T = G(T), T.reduce(function(z, C) {
                  var $ = C.retain || C.delete || C.insert.length || 1, W = C.attributes || {};
                  if (C.insert != null) {
                    if (typeof C.insert == "string") {
                      var Y = C.insert;
                      Y.endsWith(`
`) && D && (D = !1, Y = Y.slice(0, -1)), z >= F && !Y.endsWith(`
`) && (D = !0), M.scroll.insertAt(z, Y);
                      var V = M.scroll.line(z), te = o(V, 2), Z = te[0], le = te[1], ce = (0, O.default)({}, (0, m.bubbleFormats)(Z));
                      if (Z instanceof x.default) {
                        var he = Z.descendant(h.default.Leaf, le), Ne = o(he, 1), Oe = Ne[0];
                        ce = (0, O.default)(ce, (0, m.bubbleFormats)(Oe));
                      }
                      W = c.default.attributes.diff(ce, W) || {};
                    } else if (a(C.insert) === "object") {
                      var K = Object.keys(C.insert)[0];
                      if (K == null)
                        return z;
                      M.scroll.insertAt(z, K, C.insert[K]);
                    }
                    F += $;
                  }
                  return Object.keys(W).forEach(function(Q) {
                    M.scroll.formatAt(z, $, Q, W[Q]);
                  }), z + $;
                }, 0), T.reduce(function(z, C) {
                  return typeof C.delete == "number" ? (M.scroll.deleteAt(z, C.delete), z) : z + (C.retain || C.insert.length || 1);
                }, 0), this.scroll.batchEnd(), this.update(T);
              }
            }, {
              key: "deleteText",
              value: function(T, M) {
                return this.scroll.deleteAt(T, M), this.update(new f.default().retain(T).delete(M));
              }
            }, {
              key: "formatLine",
              value: function(T, M) {
                var D = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return this.scroll.update(), Object.keys(F).forEach(function(z) {
                  if (!(D.scroll.whitelist != null && !D.scroll.whitelist[z])) {
                    var C = D.scroll.lines(T, Math.max(M, 1)), $ = M;
                    C.forEach(function(W) {
                      var Y = W.length();
                      if (!(W instanceof g.default))
                        W.format(z, F[z]);
                      else {
                        var V = T - W.offset(D.scroll), te = W.newlineIndex(V + $) - V + 1;
                        W.formatAt(V, te, z, F[z]);
                      }
                      $ -= Y;
                    });
                  }
                }), this.scroll.optimize(), this.update(new f.default().retain(T).retain(M, (0, E.default)(F)));
              }
            }, {
              key: "formatText",
              value: function(T, M) {
                var D = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return Object.keys(F).forEach(function(z) {
                  D.scroll.formatAt(T, M, z, F[z]);
                }), this.update(new f.default().retain(T).retain(M, (0, E.default)(F)));
              }
            }, {
              key: "getContents",
              value: function(T, M) {
                return this.delta.slice(T, T + M);
              }
            }, {
              key: "getDelta",
              value: function() {
                return this.scroll.lines().reduce(function(T, M) {
                  return T.concat(M.delta());
                }, new f.default());
              }
            }, {
              key: "getFormat",
              value: function(T) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, D = [], F = [];
                M === 0 ? this.scroll.path(T).forEach(function(C) {
                  var $ = o(C, 1), W = $[0];
                  W instanceof x.default ? D.push(W) : W instanceof h.default.Leaf && F.push(W);
                }) : (D = this.scroll.lines(T, M), F = this.scroll.descendants(h.default.Leaf, T, M));
                var z = [D, F].map(function(C) {
                  if (C.length === 0)
                    return {};
                  for (var $ = (0, m.bubbleFormats)(C.shift()); Object.keys($).length > 0; ) {
                    var W = C.shift();
                    if (W == null)
                      return $;
                    $ = U((0, m.bubbleFormats)(W), $);
                  }
                  return $;
                });
                return O.default.apply(O.default, z);
              }
            }, {
              key: "getText",
              value: function(T, M) {
                return this.getContents(T, M).filter(function(D) {
                  return typeof D.insert == "string";
                }).map(function(D) {
                  return D.insert;
                }).join("");
              }
            }, {
              key: "insertEmbed",
              value: function(T, M, D) {
                return this.scroll.insertAt(T, M, D), this.update(new f.default().retain(T).insert(k({}, M, D)));
              }
            }, {
              key: "insertText",
              value: function(T, M) {
                var D = this, F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return M = M.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(T, M), Object.keys(F).forEach(function(z) {
                  D.scroll.formatAt(T, M.length, z, F[z]);
                }), this.update(new f.default().retain(T).insert(M, (0, E.default)(F)));
              }
            }, {
              key: "isBlank",
              value: function() {
                if (this.scroll.children.length == 0)
                  return !0;
                if (this.scroll.children.length > 1)
                  return !1;
                var T = this.scroll.children.head;
                return T.statics.blotName !== x.default.blotName || T.children.length > 1 ? !1 : T.children.head instanceof w.default;
              }
            }, {
              key: "removeFormat",
              value: function(T, M) {
                var D = this.getText(T, M), F = this.scroll.line(T + M), z = o(F, 2), C = z[0], $ = z[1], W = 0, Y = new f.default();
                C != null && (C instanceof g.default ? W = C.newlineIndex($) - $ + 1 : W = C.length() - $, Y = C.delta().slice($, $ + W - 1).insert(`
`));
                var V = this.getContents(T, M + W), te = V.diff(new f.default().insert(D).concat(Y)), Z = new f.default().retain(T).concat(te);
                return this.applyDelta(Z);
              }
            }, {
              key: "update",
              value: function(T) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], D = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, F = this.delta;
                if (M.length === 1 && M[0].type === "characterData" && M[0].target.data.match(R) && h.default.find(M[0].target)) {
                  var z = h.default.find(M[0].target), C = (0, m.bubbleFormats)(z), $ = z.offset(this.scroll), W = M[0].oldValue.replace(v.default.CONTENTS, ""), Y = new f.default().insert(W), V = new f.default().insert(z.value()), te = new f.default().retain($).concat(Y.diff(V, D));
                  T = te.reduce(function(Z, le) {
                    return le.insert ? Z.insert(le.insert, C) : Z.push(le);
                  }, new f.default()), this.delta = F.compose(T);
                } else
                  this.delta = this.getDelta(), (!T || !(0, j.default)(F.compose(T), this.delta)) && (T = F.diff(this.delta, D));
                return T;
              }
            }]), q;
          }();
          function U(q, P) {
            return Object.keys(P).reduce(function(T, M) {
              return q[M] == null || (P[M] === q[M] ? T[M] = P[M] : Array.isArray(P[M]) ? P[M].indexOf(q[M]) < 0 && (T[M] = P[M].concat([q[M]])) : T[M] = [P[M], q[M]]), T;
            }, {});
          }
          function G(q) {
            return q.reduce(function(P, T) {
              if (T.insert === 1) {
                var M = (0, E.default)(T.attributes);
                return delete M.image, P.insert({ image: T.attributes.image }, M);
              }
              if (T.attributes != null && (T.attributes.list === !0 || T.attributes.bullet === !0) && (T = (0, E.default)(T), T.attributes.list ? T.attributes.list = "ordered" : (T.attributes.list = "bullet", delete T.attributes.bullet)), typeof T.insert == "string") {
                var D = T.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
                return P.insert(D, T.attributes);
              }
              return P.push(T);
            }, new f.default());
          }
          n.default = H;
        },
        /* 15 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.Range = void 0;
          var a = function() {
            function A(j, _) {
              var O = [], N = !0, k = !1, I = void 0;
              try {
                for (var R = j[Symbol.iterator](), H; !(N = (H = R.next()).done) && (O.push(H.value), !(_ && O.length === _)); N = !0)
                  ;
              } catch (U) {
                k = !0, I = U;
              } finally {
                try {
                  !N && R.return && R.return();
                } finally {
                  if (k)
                    throw I;
                }
              }
              return O;
            }
            return function(j, _) {
              if (Array.isArray(j))
                return j;
              if (Symbol.iterator in Object(j))
                return A(j, _);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function A(j, _) {
              for (var O = 0; O < _.length; O++) {
                var N = _[O];
                N.enumerable = N.enumerable || !1, N.configurable = !0, "value" in N && (N.writable = !0), Object.defineProperty(j, N.key, N);
              }
            }
            return function(j, _, O) {
              return _ && A(j.prototype, _), O && A(j, O), j;
            };
          }(), s = i(0), l = v(s), f = i(21), d = v(f), c = i(11), u = v(c), h = i(8), y = v(h), g = i(10), b = v(g);
          function v(A) {
            return A && A.__esModule ? A : { default: A };
          }
          function m(A) {
            if (Array.isArray(A)) {
              for (var j = 0, _ = Array(A.length); j < A.length; j++)
                _[j] = A[j];
              return _;
            } else
              return Array.from(A);
          }
          function x(A, j) {
            if (!(A instanceof j))
              throw new TypeError("Cannot call a class as a function");
          }
          var p = (0, b.default)("quill:selection"), w = function A(j) {
            var _ = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            x(this, A), this.index = j, this.length = _;
          }, S = function() {
            function A(j, _) {
              var O = this;
              x(this, A), this.emitter = _, this.scroll = j, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = l.default.create("cursor", this), this.lastRange = this.savedRange = new w(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
                O.mouseDown || setTimeout(O.update.bind(O, y.default.sources.USER), 1);
              }), this.emitter.on(y.default.events.EDITOR_CHANGE, function(N, k) {
                N === y.default.events.TEXT_CHANGE && k.length() > 0 && O.update(y.default.sources.SILENT);
              }), this.emitter.on(y.default.events.SCROLL_BEFORE_UPDATE, function() {
                if (O.hasFocus()) {
                  var N = O.getNativeRange();
                  N != null && N.start.node !== O.cursor.textNode && O.emitter.once(y.default.events.SCROLL_UPDATE, function() {
                    try {
                      O.setNativeRange(N.start.node, N.start.offset, N.end.node, N.end.offset);
                    } catch {
                    }
                  });
                }
              }), this.emitter.on(y.default.events.SCROLL_OPTIMIZE, function(N, k) {
                if (k.range) {
                  var I = k.range, R = I.startNode, H = I.startOffset, U = I.endNode, G = I.endOffset;
                  O.setNativeRange(R, H, U, G);
                }
              }), this.update(y.default.sources.SILENT);
            }
            return o(A, [{
              key: "handleComposition",
              value: function() {
                var _ = this;
                this.root.addEventListener("compositionstart", function() {
                  _.composing = !0;
                }), this.root.addEventListener("compositionend", function() {
                  if (_.composing = !1, _.cursor.parent) {
                    var O = _.cursor.restore();
                    if (!O)
                      return;
                    setTimeout(function() {
                      _.setNativeRange(O.startNode, O.startOffset, O.endNode, O.endOffset);
                    }, 1);
                  }
                });
              }
            }, {
              key: "handleDragging",
              value: function() {
                var _ = this;
                this.emitter.listenDOM("mousedown", document.body, function() {
                  _.mouseDown = !0;
                }), this.emitter.listenDOM("mouseup", document.body, function() {
                  _.mouseDown = !1, _.update(y.default.sources.USER);
                });
              }
            }, {
              key: "focus",
              value: function() {
                this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
              }
            }, {
              key: "format",
              value: function(_, O) {
                if (!(this.scroll.whitelist != null && !this.scroll.whitelist[_])) {
                  this.scroll.update();
                  var N = this.getNativeRange();
                  if (!(N == null || !N.native.collapsed || l.default.query(_, l.default.Scope.BLOCK))) {
                    if (N.start.node !== this.cursor.textNode) {
                      var k = l.default.find(N.start.node, !1);
                      if (k == null)
                        return;
                      if (k instanceof l.default.Leaf) {
                        var I = k.split(N.start.offset);
                        k.parent.insertBefore(this.cursor, I);
                      } else
                        k.insertBefore(this.cursor, N.start.node);
                      this.cursor.attach();
                    }
                    this.cursor.format(_, O), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                  }
                }
              }
            }, {
              key: "getBounds",
              value: function(_) {
                var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, N = this.scroll.length();
                _ = Math.min(_, N - 1), O = Math.min(_ + O, N - 1) - _;
                var k = void 0, I = this.scroll.leaf(_), R = a(I, 2), H = R[0], U = R[1];
                if (H == null)
                  return null;
                var G = H.position(U, !0), q = a(G, 2);
                k = q[0], U = q[1];
                var P = document.createRange();
                if (O > 0) {
                  P.setStart(k, U);
                  var T = this.scroll.leaf(_ + O), M = a(T, 2);
                  if (H = M[0], U = M[1], H == null)
                    return null;
                  var D = H.position(U, !0), F = a(D, 2);
                  return k = F[0], U = F[1], P.setEnd(k, U), P.getBoundingClientRect();
                } else {
                  var z = "left", C = void 0;
                  return k instanceof Text ? (U < k.data.length ? (P.setStart(k, U), P.setEnd(k, U + 1)) : (P.setStart(k, U - 1), P.setEnd(k, U), z = "right"), C = P.getBoundingClientRect()) : (C = H.domNode.getBoundingClientRect(), U > 0 && (z = "right")), {
                    bottom: C.top + C.height,
                    height: C.height,
                    left: C[z],
                    right: C[z],
                    top: C.top,
                    width: 0
                  };
                }
              }
            }, {
              key: "getNativeRange",
              value: function() {
                var _ = document.getSelection();
                if (_ == null || _.rangeCount <= 0)
                  return null;
                var O = _.getRangeAt(0);
                if (O == null)
                  return null;
                var N = this.normalizeNative(O);
                return p.info("getNativeRange", N), N;
              }
            }, {
              key: "getRange",
              value: function() {
                var _ = this.getNativeRange();
                if (_ == null)
                  return [null, null];
                var O = this.normalizedToRange(_);
                return [O, _];
              }
            }, {
              key: "hasFocus",
              value: function() {
                return document.activeElement === this.root;
              }
            }, {
              key: "normalizedToRange",
              value: function(_) {
                var O = this, N = [[_.start.node, _.start.offset]];
                _.native.collapsed || N.push([_.end.node, _.end.offset]);
                var k = N.map(function(H) {
                  var U = a(H, 2), G = U[0], q = U[1], P = l.default.find(G, !0), T = P.offset(O.scroll);
                  return q === 0 ? T : P instanceof l.default.Container ? T + P.length() : T + P.index(G, q);
                }), I = Math.min(Math.max.apply(Math, m(k)), this.scroll.length() - 1), R = Math.min.apply(Math, [I].concat(m(k)));
                return new w(R, I - R);
              }
            }, {
              key: "normalizeNative",
              value: function(_) {
                if (!E(this.root, _.startContainer) || !_.collapsed && !E(this.root, _.endContainer))
                  return null;
                var O = {
                  start: { node: _.startContainer, offset: _.startOffset },
                  end: { node: _.endContainer, offset: _.endOffset },
                  native: _
                };
                return [O.start, O.end].forEach(function(N) {
                  for (var k = N.node, I = N.offset; !(k instanceof Text) && k.childNodes.length > 0; )
                    if (k.childNodes.length > I)
                      k = k.childNodes[I], I = 0;
                    else if (k.childNodes.length === I)
                      k = k.lastChild, I = k instanceof Text ? k.data.length : k.childNodes.length + 1;
                    else
                      break;
                  N.node = k, N.offset = I;
                }), O;
              }
            }, {
              key: "rangeToNative",
              value: function(_) {
                var O = this, N = _.collapsed ? [_.index] : [_.index, _.index + _.length], k = [], I = this.scroll.length();
                return N.forEach(function(R, H) {
                  R = Math.min(I - 1, R);
                  var U = void 0, G = O.scroll.leaf(R), q = a(G, 2), P = q[0], T = q[1], M = P.position(T, H !== 0), D = a(M, 2);
                  U = D[0], T = D[1], k.push(U, T);
                }), k.length < 2 && (k = k.concat(k)), k;
              }
            }, {
              key: "scrollIntoView",
              value: function(_) {
                var O = this.lastRange;
                if (O != null) {
                  var N = this.getBounds(O.index, O.length);
                  if (N != null) {
                    var k = this.scroll.length() - 1, I = this.scroll.line(Math.min(O.index, k)), R = a(I, 1), H = R[0], U = H;
                    if (O.length > 0) {
                      var G = this.scroll.line(Math.min(O.index + O.length, k)), q = a(G, 1);
                      U = q[0];
                    }
                    if (!(H == null || U == null)) {
                      var P = _.getBoundingClientRect();
                      N.top < P.top ? _.scrollTop -= P.top - N.top : N.bottom > P.bottom && (_.scrollTop += N.bottom - P.bottom);
                    }
                  }
                }
              }
            }, {
              key: "setNativeRange",
              value: function(_, O) {
                var N = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : _, k = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : O, I = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
                if (p.info("setNativeRange", _, O, N, k), !(_ != null && (this.root.parentNode == null || _.parentNode == null || N.parentNode == null))) {
                  var R = document.getSelection();
                  if (R != null)
                    if (_ != null) {
                      this.hasFocus() || this.root.focus();
                      var H = (this.getNativeRange() || {}).native;
                      if (H == null || I || _ !== H.startContainer || O !== H.startOffset || N !== H.endContainer || k !== H.endOffset) {
                        _.tagName == "BR" && (O = [].indexOf.call(_.parentNode.childNodes, _), _ = _.parentNode), N.tagName == "BR" && (k = [].indexOf.call(N.parentNode.childNodes, N), N = N.parentNode);
                        var U = document.createRange();
                        U.setStart(_, O), U.setEnd(N, k), R.removeAllRanges(), R.addRange(U);
                      }
                    } else
                      R.removeAllRanges(), this.root.blur(), document.body.focus();
                }
              }
            }, {
              key: "setRange",
              value: function(_) {
                var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, N = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : y.default.sources.API;
                if (typeof O == "string" && (N = O, O = !1), p.info("setRange", _), _ != null) {
                  var k = this.rangeToNative(_);
                  this.setNativeRange.apply(this, m(k).concat([O]));
                } else
                  this.setNativeRange(null);
                this.update(N);
              }
            }, {
              key: "update",
              value: function() {
                var _ = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : y.default.sources.USER, O = this.lastRange, N = this.getRange(), k = a(N, 2), I = k[0], R = k[1];
                if (this.lastRange = I, this.lastRange != null && (this.savedRange = this.lastRange), !(0, u.default)(O, this.lastRange)) {
                  var H;
                  !this.composing && R != null && R.native.collapsed && R.start.node !== this.cursor.textNode && this.cursor.restore();
                  var U = [y.default.events.SELECTION_CHANGE, (0, d.default)(this.lastRange), (0, d.default)(O), _];
                  if ((H = this.emitter).emit.apply(H, [y.default.events.EDITOR_CHANGE].concat(U)), _ !== y.default.sources.SILENT) {
                    var G;
                    (G = this.emitter).emit.apply(G, U);
                  }
                }
              }
            }]), A;
          }();
          function E(A, j) {
            try {
              j.parentNode;
            } catch {
              return !1;
            }
            return j instanceof Text && (j = j.parentNode), A.contains(j);
          }
          n.Range = w, n.default = S;
        },
        /* 16 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(g, b) {
              for (var v = 0; v < b.length; v++) {
                var m = b[v];
                m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(g, m.key, m);
              }
            }
            return function(g, b, v) {
              return b && y(g.prototype, b), v && y(g, v), g;
            };
          }(), o = function y(g, b, v) {
            g === null && (g = Function.prototype);
            var m = Object.getOwnPropertyDescriptor(g, b);
            if (m === void 0) {
              var x = Object.getPrototypeOf(g);
              return x === null ? void 0 : y(x, b, v);
            } else {
              if ("value" in m)
                return m.value;
              var p = m.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, s = i(0), l = f(s);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function d(y, g) {
            if (!(y instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, g) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : y;
          }
          function u(y, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            y.prototype = Object.create(g && g.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(y, g) : y.__proto__ = g);
          }
          var h = function(y) {
            u(g, y);
            function g() {
              return d(this, g), c(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments));
            }
            return a(g, [{
              key: "insertInto",
              value: function(v, m) {
                v.children.length === 0 ? o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "insertInto", this).call(this, v, m) : this.remove();
              }
            }, {
              key: "length",
              value: function() {
                return 0;
              }
            }, {
              key: "value",
              value: function() {
                return "";
              }
            }], [{
              key: "value",
              value: function() {
              }
            }]), g;
          }(l.default.Embed);
          h.blotName = "break", h.tagName = "BR", n.default = h;
        },
        /* 17 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, h) {
              u.__proto__ = h;
            } || function(u, h) {
              for (var y in h)
                h.hasOwnProperty(y) && (u[y] = h[y]);
            };
            return function(u, h) {
              c(u, h);
              function y() {
                this.constructor = u;
              }
              u.prototype = h === null ? Object.create(h) : (y.prototype = h.prototype, new y());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(44), s = i(30), l = i(1), f = (
            /** @class */
            function(c) {
              a(u, c);
              function u(h) {
                var y = c.call(this, h) || this;
                return y.build(), y;
              }
              return u.prototype.appendChild = function(h) {
                this.insertBefore(h);
              }, u.prototype.attach = function() {
                c.prototype.attach.call(this), this.children.forEach(function(h) {
                  h.attach();
                });
              }, u.prototype.build = function() {
                var h = this;
                this.children = new o.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(y) {
                  try {
                    var g = d(y);
                    h.insertBefore(g, h.children.head || void 0);
                  } catch (b) {
                    if (b instanceof l.ParchmentError)
                      return;
                    throw b;
                  }
                });
              }, u.prototype.deleteAt = function(h, y) {
                if (h === 0 && y === this.length())
                  return this.remove();
                this.children.forEachAt(h, y, function(g, b, v) {
                  g.deleteAt(b, v);
                });
              }, u.prototype.descendant = function(h, y) {
                var g = this.children.find(y), b = g[0], v = g[1];
                return h.blotName == null && h(b) || h.blotName != null && b instanceof h ? [b, v] : b instanceof u ? b.descendant(h, v) : [null, -1];
              }, u.prototype.descendants = function(h, y, g) {
                y === void 0 && (y = 0), g === void 0 && (g = Number.MAX_VALUE);
                var b = [], v = g;
                return this.children.forEachAt(y, g, function(m, x, p) {
                  (h.blotName == null && h(m) || h.blotName != null && m instanceof h) && b.push(m), m instanceof u && (b = b.concat(m.descendants(h, x, v))), v -= p;
                }), b;
              }, u.prototype.detach = function() {
                this.children.forEach(function(h) {
                  h.detach();
                }), c.prototype.detach.call(this);
              }, u.prototype.formatAt = function(h, y, g, b) {
                this.children.forEachAt(h, y, function(v, m, x) {
                  v.formatAt(m, x, g, b);
                });
              }, u.prototype.insertAt = function(h, y, g) {
                var b = this.children.find(h), v = b[0], m = b[1];
                if (v)
                  v.insertAt(m, y, g);
                else {
                  var x = g == null ? l.create("text", y) : l.create(y, g);
                  this.appendChild(x);
                }
              }, u.prototype.insertBefore = function(h, y) {
                if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(g) {
                  return h instanceof g;
                }))
                  throw new l.ParchmentError("Cannot insert " + h.statics.blotName + " into " + this.statics.blotName);
                h.insertInto(this, y);
              }, u.prototype.length = function() {
                return this.children.reduce(function(h, y) {
                  return h + y.length();
                }, 0);
              }, u.prototype.moveChildren = function(h, y) {
                this.children.forEach(function(g) {
                  h.insertBefore(g, y);
                });
              }, u.prototype.optimize = function(h) {
                if (c.prototype.optimize.call(this, h), this.children.length === 0)
                  if (this.statics.defaultChild != null) {
                    var y = l.create(this.statics.defaultChild);
                    this.appendChild(y), y.optimize(h);
                  } else
                    this.remove();
              }, u.prototype.path = function(h, y) {
                y === void 0 && (y = !1);
                var g = this.children.find(h, y), b = g[0], v = g[1], m = [[this, h]];
                return b instanceof u ? m.concat(b.path(v, y)) : (b != null && m.push([b, v]), m);
              }, u.prototype.removeChild = function(h) {
                this.children.remove(h);
              }, u.prototype.replace = function(h) {
                h instanceof u && h.moveChildren(this), c.prototype.replace.call(this, h);
              }, u.prototype.split = function(h, y) {
                if (y === void 0 && (y = !1), !y) {
                  if (h === 0)
                    return this;
                  if (h === this.length())
                    return this.next;
                }
                var g = this.clone();
                return this.parent.insertBefore(g, this.next), this.children.forEachAt(h, this.length(), function(b, v, m) {
                  b = b.split(v, y), g.appendChild(b);
                }), g;
              }, u.prototype.unwrap = function() {
                this.moveChildren(this.parent, this.next), this.remove();
              }, u.prototype.update = function(h, y) {
                var g = this, b = [], v = [];
                h.forEach(function(m) {
                  m.target === g.domNode && m.type === "childList" && (b.push.apply(b, m.addedNodes), v.push.apply(v, m.removedNodes));
                }), v.forEach(function(m) {
                  if (!(m.parentNode != null && // @ts-ignore
                  m.tagName !== "IFRAME" && document.body.compareDocumentPosition(m) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                    var x = l.find(m);
                    x != null && (x.domNode.parentNode == null || x.domNode.parentNode === g.domNode) && x.detach();
                  }
                }), b.filter(function(m) {
                  return m.parentNode == g.domNode;
                }).sort(function(m, x) {
                  return m === x ? 0 : m.compareDocumentPosition(x) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
                }).forEach(function(m) {
                  var x = null;
                  m.nextSibling != null && (x = l.find(m.nextSibling));
                  var p = d(m);
                  (p.next != x || p.next == null) && (p.parent != null && p.parent.removeChild(g), g.insertBefore(p, x || void 0));
                });
              }, u;
            }(s.default)
          );
          function d(c) {
            var u = l.find(c);
            if (u == null)
              try {
                u = l.create(c);
              } catch {
                u = l.create(l.Scope.INLINE), [].slice.call(c.childNodes).forEach(function(y) {
                  u.domNode.appendChild(y);
                }), c.parentNode && c.parentNode.replaceChild(u.domNode, c), u.attach();
              }
            return u;
          }
          n.default = f;
        },
        /* 18 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, h) {
              u.__proto__ = h;
            } || function(u, h) {
              for (var y in h)
                h.hasOwnProperty(y) && (u[y] = h[y]);
            };
            return function(u, h) {
              c(u, h);
              function y() {
                this.constructor = u;
              }
              u.prototype = h === null ? Object.create(h) : (y.prototype = h.prototype, new y());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(12), s = i(31), l = i(17), f = i(1), d = (
            /** @class */
            function(c) {
              a(u, c);
              function u(h) {
                var y = c.call(this, h) || this;
                return y.attributes = new s.default(y.domNode), y;
              }
              return u.formats = function(h) {
                if (typeof this.tagName == "string")
                  return !0;
                if (Array.isArray(this.tagName))
                  return h.tagName.toLowerCase();
              }, u.prototype.format = function(h, y) {
                var g = f.query(h);
                g instanceof o.default ? this.attributes.attribute(g, y) : y && g != null && (h !== this.statics.blotName || this.formats()[h] !== y) && this.replaceWith(h, y);
              }, u.prototype.formats = function() {
                var h = this.attributes.values(), y = this.statics.formats(this.domNode);
                return y != null && (h[this.statics.blotName] = y), h;
              }, u.prototype.replaceWith = function(h, y) {
                var g = c.prototype.replaceWith.call(this, h, y);
                return this.attributes.copy(g), g;
              }, u.prototype.update = function(h, y) {
                var g = this;
                c.prototype.update.call(this, h, y), h.some(function(b) {
                  return b.target === g.domNode && b.type === "attributes";
                }) && this.attributes.build();
              }, u.prototype.wrap = function(h, y) {
                var g = c.prototype.wrap.call(this, h, y);
                return g instanceof u && g.statics.scope === this.statics.scope && this.attributes.move(g), g;
              }, u;
            }(l.default)
          );
          n.default = d;
        },
        /* 19 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, c) {
              d.__proto__ = c;
            } || function(d, c) {
              for (var u in c)
                c.hasOwnProperty(u) && (d[u] = c[u]);
            };
            return function(d, c) {
              f(d, c);
              function u() {
                this.constructor = d;
              }
              d.prototype = c === null ? Object.create(c) : (u.prototype = c.prototype, new u());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(30), s = i(1), l = (
            /** @class */
            function(f) {
              a(d, f);
              function d() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return d.value = function(c) {
                return !0;
              }, d.prototype.index = function(c, u) {
                return this.domNode === c || this.domNode.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(u, 1) : -1;
              }, d.prototype.position = function(c, u) {
                var h = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                return c > 0 && (h += 1), [this.parent.domNode, h];
              }, d.prototype.value = function() {
                var c;
                return c = {}, c[this.statics.blotName] = this.statics.value(this.domNode) || !0, c;
              }, d.scope = s.Scope.INLINE_BLOT, d;
            }(o.default)
          );
          n.default = l;
        },
        /* 20 */
        /***/
        function(r, n, i) {
          var a = i(11), o = i(3), s = {
            attributes: {
              compose: function(f, d, c) {
                typeof f != "object" && (f = {}), typeof d != "object" && (d = {});
                var u = o(!0, {}, d);
                c || (u = Object.keys(u).reduce(function(y, g) {
                  return u[g] != null && (y[g] = u[g]), y;
                }, {}));
                for (var h in f)
                  f[h] !== void 0 && d[h] === void 0 && (u[h] = f[h]);
                return Object.keys(u).length > 0 ? u : void 0;
              },
              diff: function(f, d) {
                typeof f != "object" && (f = {}), typeof d != "object" && (d = {});
                var c = Object.keys(f).concat(Object.keys(d)).reduce(function(u, h) {
                  return a(f[h], d[h]) || (u[h] = d[h] === void 0 ? null : d[h]), u;
                }, {});
                return Object.keys(c).length > 0 ? c : void 0;
              },
              transform: function(f, d, c) {
                if (typeof f != "object")
                  return d;
                if (typeof d == "object") {
                  if (!c)
                    return d;
                  var u = Object.keys(d).reduce(function(h, y) {
                    return f[y] === void 0 && (h[y] = d[y]), h;
                  }, {});
                  return Object.keys(u).length > 0 ? u : void 0;
                }
              }
            },
            iterator: function(f) {
              return new l(f);
            },
            length: function(f) {
              return typeof f.delete == "number" ? f.delete : typeof f.retain == "number" ? f.retain : typeof f.insert == "string" ? f.insert.length : 1;
            }
          };
          function l(f) {
            this.ops = f, this.index = 0, this.offset = 0;
          }
          l.prototype.hasNext = function() {
            return this.peekLength() < 1 / 0;
          }, l.prototype.next = function(f) {
            f || (f = 1 / 0);
            var d = this.ops[this.index];
            if (d) {
              var c = this.offset, u = s.length(d);
              if (f >= u - c ? (f = u - c, this.index += 1, this.offset = 0) : this.offset += f, typeof d.delete == "number")
                return { delete: f };
              var h = {};
              return d.attributes && (h.attributes = d.attributes), typeof d.retain == "number" ? h.retain = f : typeof d.insert == "string" ? h.insert = d.insert.substr(c, f) : h.insert = d.insert, h;
            } else
              return { retain: 1 / 0 };
          }, l.prototype.peek = function() {
            return this.ops[this.index];
          }, l.prototype.peekLength = function() {
            return this.ops[this.index] ? s.length(this.ops[this.index]) - this.offset : 1 / 0;
          }, l.prototype.peekType = function() {
            return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
          }, l.prototype.rest = function() {
            if (this.hasNext()) {
              if (this.offset === 0)
                return this.ops.slice(this.index);
              var f = this.offset, d = this.index, c = this.next(), u = this.ops.slice(this.index);
              return this.offset = f, this.index = d, [c].concat(u);
            } else
              return [];
          }, r.exports = s;
        },
        /* 21 */
        /***/
        function(r, n) {
          var i = function() {
            function a(g, b) {
              return b != null && g instanceof b;
            }
            var o;
            try {
              o = Map;
            } catch {
              o = function() {
              };
            }
            var s;
            try {
              s = Set;
            } catch {
              s = function() {
              };
            }
            var l;
            try {
              l = Promise;
            } catch {
              l = function() {
              };
            }
            function f(g, b, v, m, x) {
              typeof b == "object" && (v = b.depth, m = b.prototype, x = b.includeNonEnumerable, b = b.circular);
              var p = [], w = [], S = typeof Buffer < "u";
              typeof b > "u" && (b = !0), typeof v > "u" && (v = 1 / 0);
              function E(A, j) {
                if (A === null)
                  return null;
                if (j === 0)
                  return A;
                var _, O;
                if (typeof A != "object")
                  return A;
                if (a(A, o))
                  _ = new o();
                else if (a(A, s))
                  _ = new s();
                else if (a(A, l))
                  _ = new l(function(P, T) {
                    A.then(function(M) {
                      P(E(M, j - 1));
                    }, function(M) {
                      T(E(M, j - 1));
                    });
                  });
                else if (f.__isArray(A))
                  _ = [];
                else if (f.__isRegExp(A))
                  _ = new RegExp(A.source, y(A)), A.lastIndex && (_.lastIndex = A.lastIndex);
                else if (f.__isDate(A))
                  _ = new Date(A.getTime());
                else {
                  if (S && Buffer.isBuffer(A))
                    return Buffer.allocUnsafe ? _ = Buffer.allocUnsafe(A.length) : _ = new Buffer(A.length), A.copy(_), _;
                  a(A, Error) ? _ = Object.create(A) : typeof m > "u" ? (O = Object.getPrototypeOf(A), _ = Object.create(O)) : (_ = Object.create(m), O = m);
                }
                if (b) {
                  var N = p.indexOf(A);
                  if (N != -1)
                    return w[N];
                  p.push(A), w.push(_);
                }
                a(A, o) && A.forEach(function(P, T) {
                  var M = E(T, j - 1), D = E(P, j - 1);
                  _.set(M, D);
                }), a(A, s) && A.forEach(function(P) {
                  var T = E(P, j - 1);
                  _.add(T);
                });
                for (var k in A) {
                  var I;
                  O && (I = Object.getOwnPropertyDescriptor(O, k)), !(I && I.set == null) && (_[k] = E(A[k], j - 1));
                }
                if (Object.getOwnPropertySymbols)
                  for (var R = Object.getOwnPropertySymbols(A), k = 0; k < R.length; k++) {
                    var H = R[k], U = Object.getOwnPropertyDescriptor(A, H);
                    U && !U.enumerable && !x || (_[H] = E(A[H], j - 1), U.enumerable || Object.defineProperty(_, H, {
                      enumerable: !1
                    }));
                  }
                if (x)
                  for (var G = Object.getOwnPropertyNames(A), k = 0; k < G.length; k++) {
                    var q = G[k], U = Object.getOwnPropertyDescriptor(A, q);
                    U && U.enumerable || (_[q] = E(A[q], j - 1), Object.defineProperty(_, q, {
                      enumerable: !1
                    }));
                  }
                return _;
              }
              return E(g, v);
            }
            f.clonePrototype = function(b) {
              if (b === null)
                return null;
              var v = function() {
              };
              return v.prototype = b, new v();
            };
            function d(g) {
              return Object.prototype.toString.call(g);
            }
            f.__objToStr = d;
            function c(g) {
              return typeof g == "object" && d(g) === "[object Date]";
            }
            f.__isDate = c;
            function u(g) {
              return typeof g == "object" && d(g) === "[object Array]";
            }
            f.__isArray = u;
            function h(g) {
              return typeof g == "object" && d(g) === "[object RegExp]";
            }
            f.__isRegExp = h;
            function y(g) {
              var b = "";
              return g.global && (b += "g"), g.ignoreCase && (b += "i"), g.multiline && (b += "m"), b;
            }
            return f.__getRegExpFlags = y, f;
          }();
          typeof r == "object" && r.exports && (r.exports = i);
        },
        /* 22 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function _(O, N) {
              var k = [], I = !0, R = !1, H = void 0;
              try {
                for (var U = O[Symbol.iterator](), G; !(I = (G = U.next()).done) && (k.push(G.value), !(N && k.length === N)); I = !0)
                  ;
              } catch (q) {
                R = !0, H = q;
              } finally {
                try {
                  !I && U.return && U.return();
                } finally {
                  if (R)
                    throw H;
                }
              }
              return k;
            }
            return function(O, N) {
              if (Array.isArray(O))
                return O;
              if (Symbol.iterator in Object(O))
                return _(O, N);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function _(O, N) {
              for (var k = 0; k < N.length; k++) {
                var I = N[k];
                I.enumerable = I.enumerable || !1, I.configurable = !0, "value" in I && (I.writable = !0), Object.defineProperty(O, I.key, I);
              }
            }
            return function(O, N, k) {
              return N && _(O.prototype, N), k && _(O, k), O;
            };
          }(), s = function _(O, N, k) {
            O === null && (O = Function.prototype);
            var I = Object.getOwnPropertyDescriptor(O, N);
            if (I === void 0) {
              var R = Object.getPrototypeOf(O);
              return R === null ? void 0 : _(R, N, k);
            } else {
              if ("value" in I)
                return I.value;
              var H = I.get;
              return H === void 0 ? void 0 : H.call(k);
            }
          }, l = i(0), f = p(l), d = i(8), c = p(d), u = i(4), h = p(u), y = i(16), g = p(y), b = i(13), v = p(b), m = i(25), x = p(m);
          function p(_) {
            return _ && _.__esModule ? _ : { default: _ };
          }
          function w(_, O) {
            if (!(_ instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function S(_, O) {
            if (!_)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return O && (typeof O == "object" || typeof O == "function") ? O : _;
          }
          function E(_, O) {
            if (typeof O != "function" && O !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            _.prototype = Object.create(O && O.prototype, { constructor: { value: _, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(_, O) : _.__proto__ = O);
          }
          function A(_) {
            return _ instanceof h.default || _ instanceof u.BlockEmbed;
          }
          var j = function(_) {
            E(O, _);
            function O(N, k) {
              w(this, O);
              var I = S(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, N));
              return I.emitter = k.emitter, Array.isArray(k.whitelist) && (I.whitelist = k.whitelist.reduce(function(R, H) {
                return R[H] = !0, R;
              }, {})), I.domNode.addEventListener("DOMNodeInserted", function() {
              }), I.optimize(), I.enable(), I;
            }
            return o(O, [{
              key: "batchStart",
              value: function() {
                this.batch = !0;
              }
            }, {
              key: "batchEnd",
              value: function() {
                this.batch = !1, this.optimize();
              }
            }, {
              key: "deleteAt",
              value: function(k, I) {
                var R = this.line(k), H = a(R, 2), U = H[0], G = H[1], q = this.line(k + I), P = a(q, 1), T = P[0];
                if (s(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "deleteAt", this).call(this, k, I), T != null && U !== T && G > 0) {
                  if (U instanceof u.BlockEmbed || T instanceof u.BlockEmbed) {
                    this.optimize();
                    return;
                  }
                  if (U instanceof v.default) {
                    var M = U.newlineIndex(U.length(), !0);
                    if (M > -1 && (U = U.split(M + 1), U === T)) {
                      this.optimize();
                      return;
                    }
                  } else if (T instanceof v.default) {
                    var D = T.newlineIndex(0);
                    D > -1 && T.split(D + 1);
                  }
                  var F = T.children.head instanceof g.default ? null : T.children.head;
                  U.moveChildren(T, F), U.remove();
                }
                this.optimize();
              }
            }, {
              key: "enable",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.domNode.setAttribute("contenteditable", k);
              }
            }, {
              key: "formatAt",
              value: function(k, I, R, H) {
                this.whitelist != null && !this.whitelist[R] || (s(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "formatAt", this).call(this, k, I, R, H), this.optimize());
              }
            }, {
              key: "insertAt",
              value: function(k, I, R) {
                if (!(R != null && this.whitelist != null && !this.whitelist[I])) {
                  if (k >= this.length())
                    if (R == null || f.default.query(I, f.default.Scope.BLOCK) == null) {
                      var H = f.default.create(this.statics.defaultChild);
                      this.appendChild(H), R == null && I.endsWith(`
`) && (I = I.slice(0, -1)), H.insertAt(0, I, R);
                    } else {
                      var U = f.default.create(I, R);
                      this.appendChild(U);
                    }
                  else
                    s(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertAt", this).call(this, k, I, R);
                  this.optimize();
                }
              }
            }, {
              key: "insertBefore",
              value: function(k, I) {
                if (k.statics.scope === f.default.Scope.INLINE_BLOT) {
                  var R = f.default.create(this.statics.defaultChild);
                  R.appendChild(k), k = R;
                }
                s(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertBefore", this).call(this, k, I);
              }
            }, {
              key: "leaf",
              value: function(k) {
                return this.path(k).pop() || [null, -1];
              }
            }, {
              key: "line",
              value: function(k) {
                return k === this.length() ? this.line(k - 1) : this.descendant(A, k);
              }
            }, {
              key: "lines",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, R = function H(U, G, q) {
                  var P = [], T = q;
                  return U.children.forEachAt(G, q, function(M, D, F) {
                    A(M) ? P.push(M) : M instanceof f.default.Container && (P = P.concat(H(M, D, T))), T -= F;
                  }), P;
                };
                return R(this, k, I);
              }
            }, {
              key: "optimize",
              value: function() {
                var k = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                this.batch !== !0 && (s(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "optimize", this).call(this, k, I), k.length > 0 && this.emitter.emit(c.default.events.SCROLL_OPTIMIZE, k, I));
              }
            }, {
              key: "path",
              value: function(k) {
                return s(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "path", this).call(this, k).slice(1);
              }
            }, {
              key: "update",
              value: function(k) {
                if (this.batch !== !0) {
                  var I = c.default.sources.USER;
                  typeof k == "string" && (I = k), Array.isArray(k) || (k = this.observer.takeRecords()), k.length > 0 && this.emitter.emit(c.default.events.SCROLL_BEFORE_UPDATE, I, k), s(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "update", this).call(this, k.concat([])), k.length > 0 && this.emitter.emit(c.default.events.SCROLL_UPDATE, I, k);
                }
              }
            }]), O;
          }(f.default.Scroll);
          j.blotName = "scroll", j.className = "ql-editor", j.tagName = "DIV", j.defaultChild = "block", j.allowedChildren = [h.default, u.BlockEmbed, x.default], n.default = j;
        },
        /* 23 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.SHORTKEY = n.default = void 0;
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(C) {
            return typeof C;
          } : function(C) {
            return C && typeof Symbol == "function" && C.constructor === Symbol && C !== Symbol.prototype ? "symbol" : typeof C;
          }, o = function() {
            function C($, W) {
              var Y = [], V = !0, te = !1, Z = void 0;
              try {
                for (var le = $[Symbol.iterator](), ce; !(V = (ce = le.next()).done) && (Y.push(ce.value), !(W && Y.length === W)); V = !0)
                  ;
              } catch (he) {
                te = !0, Z = he;
              } finally {
                try {
                  !V && le.return && le.return();
                } finally {
                  if (te)
                    throw Z;
                }
              }
              return Y;
            }
            return function($, W) {
              if (Array.isArray($))
                return $;
              if (Symbol.iterator in Object($))
                return C($, W);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), s = function() {
            function C($, W) {
              for (var Y = 0; Y < W.length; Y++) {
                var V = W[Y];
                V.enumerable = V.enumerable || !1, V.configurable = !0, "value" in V && (V.writable = !0), Object.defineProperty($, V.key, V);
              }
            }
            return function($, W, Y) {
              return W && C($.prototype, W), Y && C($, Y), $;
            };
          }(), l = i(21), f = _(l), d = i(11), c = _(d), u = i(3), h = _(u), y = i(2), g = _(y), b = i(20), v = _(b), m = i(0), x = _(m), p = i(5), w = _(p), S = i(10), E = _(S), A = i(9), j = _(A);
          function _(C) {
            return C && C.__esModule ? C : { default: C };
          }
          function O(C, $, W) {
            return $ in C ? Object.defineProperty(C, $, { value: W, enumerable: !0, configurable: !0, writable: !0 }) : C[$] = W, C;
          }
          function N(C, $) {
            if (!(C instanceof $))
              throw new TypeError("Cannot call a class as a function");
          }
          function k(C, $) {
            if (!C)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return $ && (typeof $ == "object" || typeof $ == "function") ? $ : C;
          }
          function I(C, $) {
            if (typeof $ != "function" && $ !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof $);
            C.prototype = Object.create($ && $.prototype, { constructor: { value: C, enumerable: !1, writable: !0, configurable: !0 } }), $ && (Object.setPrototypeOf ? Object.setPrototypeOf(C, $) : C.__proto__ = $);
          }
          var R = (0, E.default)("quill:keyboard"), H = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", U = function(C) {
            I($, C), s($, null, [{
              key: "match",
              value: function(Y, V) {
                return V = z(V), ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(te) {
                  return !!V[te] !== Y[te] && V[te] !== null;
                }) ? !1 : V.key === (Y.which || Y.keyCode);
              }
            }]);
            function $(W, Y) {
              N(this, $);
              var V = k(this, ($.__proto__ || Object.getPrototypeOf($)).call(this, W, Y));
              return V.bindings = {}, Object.keys(V.options.bindings).forEach(function(te) {
                te === "list autofill" && W.scroll.whitelist != null && !W.scroll.whitelist.list || V.options.bindings[te] && V.addBinding(V.options.bindings[te]);
              }), V.addBinding({ key: $.keys.ENTER, shiftKey: null }, M), V.addBinding({ key: $.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
              }), /Firefox/i.test(navigator.userAgent) ? (V.addBinding({ key: $.keys.BACKSPACE }, { collapsed: !0 }, q), V.addBinding({ key: $.keys.DELETE }, { collapsed: !0 }, P)) : (V.addBinding({ key: $.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, q), V.addBinding({ key: $.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, P)), V.addBinding({ key: $.keys.BACKSPACE }, { collapsed: !1 }, T), V.addBinding({ key: $.keys.DELETE }, { collapsed: !1 }, T), V.addBinding({ key: $.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, q), V.listen(), V;
            }
            return s($, [{
              key: "addBinding",
              value: function(Y) {
                var V = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, te = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, Z = z(Y);
                if (Z == null || Z.key == null)
                  return R.warn("Attempted to add invalid keyboard binding", Z);
                typeof V == "function" && (V = { handler: V }), typeof te == "function" && (te = { handler: te }), Z = (0, h.default)(Z, V, te), this.bindings[Z.key] = this.bindings[Z.key] || [], this.bindings[Z.key].push(Z);
              }
            }, {
              key: "listen",
              value: function() {
                var Y = this;
                this.quill.root.addEventListener("keydown", function(V) {
                  if (!V.defaultPrevented) {
                    var te = V.which || V.keyCode, Z = (Y.bindings[te] || []).filter(function(we) {
                      return $.match(V, we);
                    });
                    if (Z.length !== 0) {
                      var le = Y.quill.getSelection();
                      if (!(le == null || !Y.quill.hasFocus())) {
                        var ce = Y.quill.getLine(le.index), he = o(ce, 2), Ne = he[0], Oe = he[1], K = Y.quill.getLeaf(le.index), Q = o(K, 2), ie = Q[0], ae = Q[1], J = le.length === 0 ? [ie, ae] : Y.quill.getLeaf(le.index + le.length), de = o(J, 2), X = de[0], ne = de[1], ge = ie instanceof x.default.Text ? ie.value().slice(0, ae) : "", ye = X instanceof x.default.Text ? X.value().slice(ne) : "", pe = {
                          collapsed: le.length === 0,
                          empty: le.length === 0 && Ne.length() <= 1,
                          format: Y.quill.getFormat(le),
                          offset: Oe,
                          prefix: ge,
                          suffix: ye
                        }, it = Z.some(function(we) {
                          if (we.collapsed != null && we.collapsed !== pe.collapsed || we.empty != null && we.empty !== pe.empty || we.offset != null && we.offset !== pe.offset)
                            return !1;
                          if (Array.isArray(we.format)) {
                            if (we.format.every(function(He) {
                              return pe.format[He] == null;
                            }))
                              return !1;
                          } else if (a(we.format) === "object" && !Object.keys(we.format).every(function(He) {
                            return we.format[He] === !0 ? pe.format[He] != null : we.format[He] === !1 ? pe.format[He] == null : (0, c.default)(we.format[He], pe.format[He]);
                          }))
                            return !1;
                          return we.prefix != null && !we.prefix.test(pe.prefix) || we.suffix != null && !we.suffix.test(pe.suffix) ? !1 : we.handler.call(Y, le, pe) !== !0;
                        });
                        it && V.preventDefault();
                      }
                    }
                  }
                });
              }
            }]), $;
          }(j.default);
          U.keys = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            ESCAPE: 27,
            LEFT: 37,
            UP: 38,
            RIGHT: 39,
            DOWN: 40,
            DELETE: 46
          }, U.DEFAULTS = {
            bindings: {
              bold: F("bold"),
              italic: F("italic"),
              underline: F("underline"),
              indent: {
                // highlight tab or tab at beginning of list, indent or blockquote
                key: U.keys.TAB,
                format: ["blockquote", "indent", "list"],
                handler: function($, W) {
                  if (W.collapsed && W.offset !== 0)
                    return !0;
                  this.quill.format("indent", "+1", w.default.sources.USER);
                }
              },
              outdent: {
                key: U.keys.TAB,
                shiftKey: !0,
                format: ["blockquote", "indent", "list"],
                // highlight tab or tab at beginning of list, indent or blockquote
                handler: function($, W) {
                  if (W.collapsed && W.offset !== 0)
                    return !0;
                  this.quill.format("indent", "-1", w.default.sources.USER);
                }
              },
              "outdent backspace": {
                key: U.keys.BACKSPACE,
                collapsed: !0,
                shiftKey: null,
                metaKey: null,
                ctrlKey: null,
                altKey: null,
                format: ["indent", "list"],
                offset: 0,
                handler: function($, W) {
                  W.format.indent != null ? this.quill.format("indent", "-1", w.default.sources.USER) : W.format.list != null && this.quill.format("list", !1, w.default.sources.USER);
                }
              },
              "indent code-block": D(!0),
              "outdent code-block": D(!1),
              "remove tab": {
                key: U.keys.TAB,
                shiftKey: !0,
                collapsed: !0,
                prefix: /\t$/,
                handler: function($) {
                  this.quill.deleteText($.index - 1, 1, w.default.sources.USER);
                }
              },
              tab: {
                key: U.keys.TAB,
                handler: function($) {
                  this.quill.history.cutoff();
                  var W = new g.default().retain($.index).delete($.length).insert("	");
                  this.quill.updateContents(W, w.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection($.index + 1, w.default.sources.SILENT);
                }
              },
              "list empty enter": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: ["list"],
                empty: !0,
                handler: function($, W) {
                  this.quill.format("list", !1, w.default.sources.USER), W.format.indent && this.quill.format("indent", !1, w.default.sources.USER);
                }
              },
              "checklist enter": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: { list: "checked" },
                handler: function($) {
                  var W = this.quill.getLine($.index), Y = o(W, 2), V = Y[0], te = Y[1], Z = (0, h.default)({}, V.formats(), { list: "checked" }), le = new g.default().retain($.index).insert(`
`, Z).retain(V.length() - te - 1).retain(1, { list: "unchecked" });
                  this.quill.updateContents(le, w.default.sources.USER), this.quill.setSelection($.index + 1, w.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "header enter": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: ["header"],
                suffix: /^$/,
                handler: function($, W) {
                  var Y = this.quill.getLine($.index), V = o(Y, 2), te = V[0], Z = V[1], le = new g.default().retain($.index).insert(`
`, W.format).retain(te.length() - Z - 1).retain(1, { header: null });
                  this.quill.updateContents(le, w.default.sources.USER), this.quill.setSelection($.index + 1, w.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "list autofill": {
                key: " ",
                collapsed: !0,
                format: { list: !1 },
                prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                handler: function($, W) {
                  var Y = W.prefix.length, V = this.quill.getLine($.index), te = o(V, 2), Z = te[0], le = te[1];
                  if (le > Y)
                    return !0;
                  var ce = void 0;
                  switch (W.prefix.trim()) {
                    case "[]":
                    case "[ ]":
                      ce = "unchecked";
                      break;
                    case "[x]":
                      ce = "checked";
                      break;
                    case "-":
                    case "*":
                      ce = "bullet";
                      break;
                    default:
                      ce = "ordered";
                  }
                  this.quill.insertText($.index, " ", w.default.sources.USER), this.quill.history.cutoff();
                  var he = new g.default().retain($.index - le).delete(Y + 1).retain(Z.length() - 2 - le).retain(1, { list: ce });
                  this.quill.updateContents(he, w.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection($.index - Y, w.default.sources.SILENT);
                }
              },
              "code exit": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: ["code-block"],
                prefix: /\n\n$/,
                suffix: /^\s+$/,
                handler: function($) {
                  var W = this.quill.getLine($.index), Y = o(W, 2), V = Y[0], te = Y[1], Z = new g.default().retain($.index + V.length() - te - 2).retain(1, { "code-block": null }).delete(1);
                  this.quill.updateContents(Z, w.default.sources.USER);
                }
              },
              "embed left": G(U.keys.LEFT, !1),
              "embed left shift": G(U.keys.LEFT, !0),
              "embed right": G(U.keys.RIGHT, !1),
              "embed right shift": G(U.keys.RIGHT, !0)
            }
          };
          function G(C, $) {
            var W, Y = C === U.keys.LEFT ? "prefix" : "suffix";
            return W = {
              key: C,
              shiftKey: $,
              altKey: null
            }, O(W, Y, /^$/), O(W, "handler", function(te) {
              var Z = te.index;
              C === U.keys.RIGHT && (Z += te.length + 1);
              var le = this.quill.getLeaf(Z), ce = o(le, 1), he = ce[0];
              return he instanceof x.default.Embed ? (C === U.keys.LEFT ? $ ? this.quill.setSelection(te.index - 1, te.length + 1, w.default.sources.USER) : this.quill.setSelection(te.index - 1, w.default.sources.USER) : $ ? this.quill.setSelection(te.index, te.length + 1, w.default.sources.USER) : this.quill.setSelection(te.index + te.length + 1, w.default.sources.USER), !1) : !0;
            }), W;
          }
          function q(C, $) {
            if (!(C.index === 0 || this.quill.getLength() <= 1)) {
              var W = this.quill.getLine(C.index), Y = o(W, 1), V = Y[0], te = {};
              if ($.offset === 0) {
                var Z = this.quill.getLine(C.index - 1), le = o(Z, 1), ce = le[0];
                if (ce != null && ce.length() > 1) {
                  var he = V.formats(), Ne = this.quill.getFormat(C.index - 1, 1);
                  te = v.default.attributes.diff(he, Ne) || {};
                }
              }
              var Oe = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test($.prefix) ? 2 : 1;
              this.quill.deleteText(C.index - Oe, Oe, w.default.sources.USER), Object.keys(te).length > 0 && this.quill.formatLine(C.index - Oe, Oe, te, w.default.sources.USER), this.quill.focus();
            }
          }
          function P(C, $) {
            var W = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test($.suffix) ? 2 : 1;
            if (!(C.index >= this.quill.getLength() - W)) {
              var Y = {}, V = 0, te = this.quill.getLine(C.index), Z = o(te, 1), le = Z[0];
              if ($.offset >= le.length() - 1) {
                var ce = this.quill.getLine(C.index + 1), he = o(ce, 1), Ne = he[0];
                if (Ne) {
                  var Oe = le.formats(), K = this.quill.getFormat(C.index, 1);
                  Y = v.default.attributes.diff(Oe, K) || {}, V = Ne.length();
                }
              }
              this.quill.deleteText(C.index, W, w.default.sources.USER), Object.keys(Y).length > 0 && this.quill.formatLine(C.index + V - 1, W, Y, w.default.sources.USER);
            }
          }
          function T(C) {
            var $ = this.quill.getLines(C), W = {};
            if ($.length > 1) {
              var Y = $[0].formats(), V = $[$.length - 1].formats();
              W = v.default.attributes.diff(V, Y) || {};
            }
            this.quill.deleteText(C, w.default.sources.USER), Object.keys(W).length > 0 && this.quill.formatLine(C.index, 1, W, w.default.sources.USER), this.quill.setSelection(C.index, w.default.sources.SILENT), this.quill.focus();
          }
          function M(C, $) {
            var W = this;
            C.length > 0 && this.quill.scroll.deleteAt(C.index, C.length);
            var Y = Object.keys($.format).reduce(function(V, te) {
              return x.default.query(te, x.default.Scope.BLOCK) && !Array.isArray($.format[te]) && (V[te] = $.format[te]), V;
            }, {});
            this.quill.insertText(C.index, `
`, Y, w.default.sources.USER), this.quill.setSelection(C.index + 1, w.default.sources.SILENT), this.quill.focus(), Object.keys($.format).forEach(function(V) {
              Y[V] == null && (Array.isArray($.format[V]) || V !== "link" && W.quill.format(V, $.format[V], w.default.sources.USER));
            });
          }
          function D(C) {
            return {
              key: U.keys.TAB,
              shiftKey: !C,
              format: { "code-block": !0 },
              handler: function(W) {
                var Y = x.default.query("code-block"), V = W.index, te = W.length, Z = this.quill.scroll.descendant(Y, V), le = o(Z, 2), ce = le[0], he = le[1];
                if (ce != null) {
                  var Ne = this.quill.getIndex(ce), Oe = ce.newlineIndex(he, !0) + 1, K = ce.newlineIndex(Ne + he + te), Q = ce.domNode.textContent.slice(Oe, K).split(`
`);
                  he = 0, Q.forEach(function(ie, ae) {
                    C ? (ce.insertAt(Oe + he, Y.TAB), he += Y.TAB.length, ae === 0 ? V += Y.TAB.length : te += Y.TAB.length) : ie.startsWith(Y.TAB) && (ce.deleteAt(Oe + he, Y.TAB.length), he -= Y.TAB.length, ae === 0 ? V -= Y.TAB.length : te -= Y.TAB.length), he += ie.length + 1;
                  }), this.quill.update(w.default.sources.USER), this.quill.setSelection(V, te, w.default.sources.SILENT);
                }
              }
            };
          }
          function F(C) {
            return {
              key: C[0].toUpperCase(),
              shortKey: !0,
              handler: function(W, Y) {
                this.quill.format(C, !Y.format[C], w.default.sources.USER);
              }
            };
          }
          function z(C) {
            if (typeof C == "string" || typeof C == "number")
              return z({ key: C });
            if ((typeof C > "u" ? "undefined" : a(C)) === "object" && (C = (0, f.default)(C, !1)), typeof C.key == "string")
              if (U.keys[C.key.toUpperCase()] != null)
                C.key = U.keys[C.key.toUpperCase()];
              else if (C.key.length === 1)
                C.key = C.key.toUpperCase().charCodeAt(0);
              else
                return null;
            return C.shortKey && (C[H] = C.shortKey, delete C.shortKey), C;
          }
          n.default = U, n.SHORTKEY = H;
        },
        /* 24 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function v(m, x) {
              var p = [], w = !0, S = !1, E = void 0;
              try {
                for (var A = m[Symbol.iterator](), j; !(w = (j = A.next()).done) && (p.push(j.value), !(x && p.length === x)); w = !0)
                  ;
              } catch (_) {
                S = !0, E = _;
              } finally {
                try {
                  !w && A.return && A.return();
                } finally {
                  if (S)
                    throw E;
                }
              }
              return p;
            }
            return function(m, x) {
              if (Array.isArray(m))
                return m;
              if (Symbol.iterator in Object(m))
                return v(m, x);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function v(m, x, p) {
            m === null && (m = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(m, x);
            if (w === void 0) {
              var S = Object.getPrototypeOf(m);
              return S === null ? void 0 : v(S, x, p);
            } else {
              if ("value" in w)
                return w.value;
              var E = w.get;
              return E === void 0 ? void 0 : E.call(p);
            }
          }, s = function() {
            function v(m, x) {
              for (var p = 0; p < x.length; p++) {
                var w = x[p];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(m, w.key, w);
              }
            }
            return function(m, x, p) {
              return x && v(m.prototype, x), p && v(m, p), m;
            };
          }(), l = i(0), f = u(l), d = i(7), c = u(d);
          function u(v) {
            return v && v.__esModule ? v : { default: v };
          }
          function h(v, m) {
            if (!(v instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(v, m) {
            if (!v)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : v;
          }
          function g(v, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            v.prototype = Object.create(m && m.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(v, m) : v.__proto__ = m);
          }
          var b = function(v) {
            g(m, v), s(m, null, [{
              key: "value",
              value: function() {
              }
            }]);
            function m(x, p) {
              h(this, m);
              var w = y(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, x));
              return w.selection = p, w.textNode = document.createTextNode(m.CONTENTS), w.domNode.appendChild(w.textNode), w._length = 0, w;
            }
            return s(m, [{
              key: "detach",
              value: function() {
                this.parent != null && this.parent.removeChild(this);
              }
            }, {
              key: "format",
              value: function(p, w) {
                if (this._length !== 0)
                  return o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "format", this).call(this, p, w);
                for (var S = this, E = 0; S != null && S.statics.scope !== f.default.Scope.BLOCK_BLOT; )
                  E += S.offset(S.parent), S = S.parent;
                S != null && (this._length = m.CONTENTS.length, S.optimize(), S.formatAt(E, m.CONTENTS.length, p, w), this._length = 0);
              }
            }, {
              key: "index",
              value: function(p, w) {
                return p === this.textNode ? 0 : o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "index", this).call(this, p, w);
              }
            }, {
              key: "length",
              value: function() {
                return this._length;
              }
            }, {
              key: "position",
              value: function() {
                return [this.textNode, this.textNode.data.length];
              }
            }, {
              key: "remove",
              value: function() {
                o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "remove", this).call(this), this.parent = null;
              }
            }, {
              key: "restore",
              value: function() {
                if (!(this.selection.composing || this.parent == null)) {
                  var p = this.textNode, w = this.selection.getNativeRange(), S = void 0, E = void 0, A = void 0;
                  if (w != null && w.start.node === p && w.end.node === p) {
                    var j = [p, w.start.offset, w.end.offset];
                    S = j[0], E = j[1], A = j[2];
                  }
                  for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
                    this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                  if (this.textNode.data !== m.CONTENTS) {
                    var _ = this.textNode.data.split(m.CONTENTS).join("");
                    this.next instanceof c.default ? (S = this.next.domNode, this.next.insertAt(0, _), this.textNode.data = m.CONTENTS) : (this.textNode.data = _, this.parent.insertBefore(f.default.create(this.textNode), this), this.textNode = document.createTextNode(m.CONTENTS), this.domNode.appendChild(this.textNode));
                  }
                  if (this.remove(), E != null) {
                    var O = [E, A].map(function(k) {
                      return Math.max(0, Math.min(S.data.length, k - 1));
                    }), N = a(O, 2);
                    return E = N[0], A = N[1], {
                      startNode: S,
                      startOffset: E,
                      endNode: S,
                      endOffset: A
                    };
                  }
                }
              }
            }, {
              key: "update",
              value: function(p, w) {
                var S = this;
                if (p.some(function(A) {
                  return A.type === "characterData" && A.target === S.textNode;
                })) {
                  var E = this.restore();
                  E && (w.range = E);
                }
              }
            }, {
              key: "value",
              value: function() {
                return "";
              }
            }]), m;
          }(f.default.Embed);
          b.blotName = "cursor", b.className = "ql-cursor", b.tagName = "span", b.CONTENTS = "\uFEFF", n.default = b;
        },
        /* 25 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(0), o = f(a), s = i(4), l = f(s);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function d(y, g) {
            if (!(y instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, g) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : y;
          }
          function u(y, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            y.prototype = Object.create(g && g.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(y, g) : y.__proto__ = g);
          }
          var h = function(y) {
            u(g, y);
            function g() {
              return d(this, g), c(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments));
            }
            return g;
          }(o.default.Container);
          h.allowedChildren = [l.default, s.BlockEmbed, h], n.default = h;
        },
        /* 26 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.ColorStyle = n.ColorClass = n.ColorAttributor = void 0;
          var a = function() {
            function b(v, m) {
              for (var x = 0; x < m.length; x++) {
                var p = m[x];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, m, x) {
              return m && b(v.prototype, m), x && b(v, x), v;
            };
          }(), o = function b(v, m, x) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, m);
            if (p === void 0) {
              var w = Object.getPrototypeOf(v);
              return w === null ? void 0 : b(w, m, x);
            } else {
              if ("value" in p)
                return p.value;
              var S = p.get;
              return S === void 0 ? void 0 : S.call(x);
            }
          }, s = i(0), l = f(s);
          function f(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function d(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function u(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var h = function(b) {
            u(v, b);
            function v() {
              return d(this, v), c(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "value",
              value: function(x) {
                var p = o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "value", this).call(this, x);
                return p.startsWith("rgb(") ? (p = p.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + p.split(",").map(function(w) {
                  return ("00" + parseInt(w).toString(16)).slice(-2);
                }).join("")) : p;
              }
            }]), v;
          }(l.default.Attributor.Style), y = new l.default.Attributor.Class("color", "ql-color", {
            scope: l.default.Scope.INLINE
          }), g = new h("color", "color", {
            scope: l.default.Scope.INLINE
          });
          n.ColorAttributor = h, n.ColorClass = y, n.ColorStyle = g;
        },
        /* 27 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.sanitize = n.default = void 0;
          var a = function() {
            function g(b, v) {
              for (var m = 0; m < v.length; m++) {
                var x = v[m];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(b, x.key, x);
              }
            }
            return function(b, v, m) {
              return v && g(b.prototype, v), m && g(b, m), b;
            };
          }(), o = function g(b, v, m) {
            b === null && (b = Function.prototype);
            var x = Object.getOwnPropertyDescriptor(b, v);
            if (x === void 0) {
              var p = Object.getPrototypeOf(b);
              return p === null ? void 0 : g(p, v, m);
            } else {
              if ("value" in x)
                return x.value;
              var w = x.get;
              return w === void 0 ? void 0 : w.call(m);
            }
          }, s = i(6), l = f(s);
          function f(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function d(g, b) {
            if (!(g instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(g, b) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return b && (typeof b == "object" || typeof b == "function") ? b : g;
          }
          function u(g, b) {
            if (typeof b != "function" && b !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof b);
            g.prototype = Object.create(b && b.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(g, b) : g.__proto__ = b);
          }
          var h = function(g) {
            u(b, g);
            function b() {
              return d(this, b), c(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments));
            }
            return a(b, [{
              key: "format",
              value: function(m, x) {
                if (m !== this.statics.blotName || !x)
                  return o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "format", this).call(this, m, x);
                x = this.constructor.sanitize(x), this.domNode.setAttribute("href", x);
              }
            }], [{
              key: "create",
              value: function(m) {
                var x = o(b.__proto__ || Object.getPrototypeOf(b), "create", this).call(this, m);
                return m = this.sanitize(m), x.setAttribute("href", m), x.setAttribute("rel", "noopener noreferrer"), x.setAttribute("target", "_blank"), x;
              }
            }, {
              key: "formats",
              value: function(m) {
                return m.getAttribute("href");
              }
            }, {
              key: "sanitize",
              value: function(m) {
                return y(m, this.PROTOCOL_WHITELIST) ? m : this.SANITIZED_URL;
              }
            }]), b;
          }(l.default);
          h.blotName = "link", h.tagName = "A", h.SANITIZED_URL = "about:blank", h.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
          function y(g, b) {
            var v = document.createElement("a");
            v.href = g;
            var m = v.href.slice(0, v.href.indexOf(":"));
            return b.indexOf(m) > -1;
          }
          n.default = h, n.sanitize = y;
        },
        /* 28 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(b) {
            return typeof b;
          } : function(b) {
            return b && typeof Symbol == "function" && b.constructor === Symbol && b !== Symbol.prototype ? "symbol" : typeof b;
          }, o = function() {
            function b(v, m) {
              for (var x = 0; x < m.length; x++) {
                var p = m[x];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, m, x) {
              return m && b(v.prototype, m), x && b(v, x), v;
            };
          }(), s = i(23), l = c(s), f = i(107), d = c(f);
          function c(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function u(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          var h = 0;
          function y(b, v) {
            b.setAttribute(v, b.getAttribute(v) !== "true");
          }
          var g = function() {
            function b(v) {
              var m = this;
              u(this, b), this.select = v, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
                m.togglePicker();
              }), this.label.addEventListener("keydown", function(x) {
                switch (x.keyCode) {
                  case l.default.keys.ENTER:
                    m.togglePicker();
                    break;
                  case l.default.keys.ESCAPE:
                    m.escape(), x.preventDefault();
                    break;
                }
              }), this.select.addEventListener("change", this.update.bind(this));
            }
            return o(b, [{
              key: "togglePicker",
              value: function() {
                this.container.classList.toggle("ql-expanded"), y(this.label, "aria-expanded"), y(this.options, "aria-hidden");
              }
            }, {
              key: "buildItem",
              value: function(m) {
                var x = this, p = document.createElement("span");
                return p.tabIndex = "0", p.setAttribute("role", "button"), p.classList.add("ql-picker-item"), m.hasAttribute("value") && p.setAttribute("data-value", m.getAttribute("value")), m.textContent && p.setAttribute("data-label", m.textContent), p.addEventListener("click", function() {
                  x.selectItem(p, !0);
                }), p.addEventListener("keydown", function(w) {
                  switch (w.keyCode) {
                    case l.default.keys.ENTER:
                      x.selectItem(p, !0), w.preventDefault();
                      break;
                    case l.default.keys.ESCAPE:
                      x.escape(), w.preventDefault();
                      break;
                  }
                }), p;
              }
            }, {
              key: "buildLabel",
              value: function() {
                var m = document.createElement("span");
                return m.classList.add("ql-picker-label"), m.innerHTML = d.default, m.tabIndex = "0", m.setAttribute("role", "button"), m.setAttribute("aria-expanded", "false"), this.container.appendChild(m), m;
              }
            }, {
              key: "buildOptions",
              value: function() {
                var m = this, x = document.createElement("span");
                x.classList.add("ql-picker-options"), x.setAttribute("aria-hidden", "true"), x.tabIndex = "-1", x.id = "ql-picker-options-" + h, h += 1, this.label.setAttribute("aria-controls", x.id), this.options = x, [].slice.call(this.select.options).forEach(function(p) {
                  var w = m.buildItem(p);
                  x.appendChild(w), p.selected === !0 && m.selectItem(w);
                }), this.container.appendChild(x);
              }
            }, {
              key: "buildPicker",
              value: function() {
                var m = this;
                [].slice.call(this.select.attributes).forEach(function(x) {
                  m.container.setAttribute(x.name, x.value);
                }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
              }
            }, {
              key: "escape",
              value: function() {
                var m = this;
                this.close(), setTimeout(function() {
                  return m.label.focus();
                }, 1);
              }
            }, {
              key: "close",
              value: function() {
                this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
              }
            }, {
              key: "selectItem",
              value: function(m) {
                var x = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, p = this.container.querySelector(".ql-selected");
                if (m !== p && (p != null && p.classList.remove("ql-selected"), m != null && (m.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(m.parentNode.children, m), m.hasAttribute("data-value") ? this.label.setAttribute("data-value", m.getAttribute("data-value")) : this.label.removeAttribute("data-value"), m.hasAttribute("data-label") ? this.label.setAttribute("data-label", m.getAttribute("data-label")) : this.label.removeAttribute("data-label"), x))) {
                  if (typeof Event == "function")
                    this.select.dispatchEvent(new Event("change"));
                  else if ((typeof Event > "u" ? "undefined" : a(Event)) === "object") {
                    var w = document.createEvent("Event");
                    w.initEvent("change", !0, !0), this.select.dispatchEvent(w);
                  }
                  this.close();
                }
              }
            }, {
              key: "update",
              value: function() {
                var m = void 0;
                if (this.select.selectedIndex > -1) {
                  var x = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                  m = this.select.options[this.select.selectedIndex], this.selectItem(x);
                } else
                  this.selectItem(null);
                var p = m != null && m !== this.select.querySelector("option[selected]");
                this.label.classList.toggle("ql-active", p);
              }
            }]), b;
          }();
          n.default = g;
        },
        /* 29 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(0), o = R(a), s = i(5), l = R(s), f = i(4), d = R(f), c = i(16), u = R(c), h = i(25), y = R(h), g = i(24), b = R(g), v = i(35), m = R(v), x = i(6), p = R(x), w = i(22), S = R(w), E = i(7), A = R(E), j = i(55), _ = R(j), O = i(42), N = R(O), k = i(23), I = R(k);
          function R(H) {
            return H && H.__esModule ? H : { default: H };
          }
          l.default.register({
            "blots/block": d.default,
            "blots/block/embed": f.BlockEmbed,
            "blots/break": u.default,
            "blots/container": y.default,
            "blots/cursor": b.default,
            "blots/embed": m.default,
            "blots/inline": p.default,
            "blots/scroll": S.default,
            "blots/text": A.default,
            "modules/clipboard": _.default,
            "modules/history": N.default,
            "modules/keyboard": I.default
          }), o.default.register(d.default, u.default, b.default, p.default, S.default, A.default), n.default = l.default;
        },
        /* 30 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", { value: !0 });
          var a = i(1), o = (
            /** @class */
            function() {
              function s(l) {
                this.domNode = l, this.domNode[a.DATA_KEY] = { blot: this };
              }
              return Object.defineProperty(s.prototype, "statics", {
                // Hack for accessing inherited static methods
                get: function() {
                  return this.constructor;
                },
                enumerable: !0,
                configurable: !0
              }), s.create = function(l) {
                if (this.tagName == null)
                  throw new a.ParchmentError("Blot definition missing tagName");
                var f;
                return Array.isArray(this.tagName) ? (typeof l == "string" && (l = l.toUpperCase(), parseInt(l).toString() === l && (l = parseInt(l))), typeof l == "number" ? f = document.createElement(this.tagName[l - 1]) : this.tagName.indexOf(l) > -1 ? f = document.createElement(l) : f = document.createElement(this.tagName[0])) : f = document.createElement(this.tagName), this.className && f.classList.add(this.className), f;
              }, s.prototype.attach = function() {
                this.parent != null && (this.scroll = this.parent.scroll);
              }, s.prototype.clone = function() {
                var l = this.domNode.cloneNode(!1);
                return a.create(l);
              }, s.prototype.detach = function() {
                this.parent != null && this.parent.removeChild(this), delete this.domNode[a.DATA_KEY];
              }, s.prototype.deleteAt = function(l, f) {
                var d = this.isolate(l, f);
                d.remove();
              }, s.prototype.formatAt = function(l, f, d, c) {
                var u = this.isolate(l, f);
                if (a.query(d, a.Scope.BLOT) != null && c)
                  u.wrap(d, c);
                else if (a.query(d, a.Scope.ATTRIBUTE) != null) {
                  var h = a.create(this.statics.scope);
                  u.wrap(h), h.format(d, c);
                }
              }, s.prototype.insertAt = function(l, f, d) {
                var c = d == null ? a.create("text", f) : a.create(f, d), u = this.split(l);
                this.parent.insertBefore(c, u);
              }, s.prototype.insertInto = function(l, f) {
                f === void 0 && (f = null), this.parent != null && this.parent.children.remove(this);
                var d = null;
                l.children.insertBefore(this, f), f != null && (d = f.domNode), (this.domNode.parentNode != l.domNode || this.domNode.nextSibling != d) && l.domNode.insertBefore(this.domNode, d), this.parent = l, this.attach();
              }, s.prototype.isolate = function(l, f) {
                var d = this.split(l);
                return d.split(f), d;
              }, s.prototype.length = function() {
                return 1;
              }, s.prototype.offset = function(l) {
                return l === void 0 && (l = this.parent), this.parent == null || this == l ? 0 : this.parent.children.offset(this) + this.parent.offset(l);
              }, s.prototype.optimize = function(l) {
                this.domNode[a.DATA_KEY] != null && delete this.domNode[a.DATA_KEY].mutations;
              }, s.prototype.remove = function() {
                this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
              }, s.prototype.replace = function(l) {
                l.parent != null && (l.parent.insertBefore(this, l.next), l.remove());
              }, s.prototype.replaceWith = function(l, f) {
                var d = typeof l == "string" ? a.create(l, f) : l;
                return d.replace(this), d;
              }, s.prototype.split = function(l, f) {
                return l === 0 ? this : this.next;
              }, s.prototype.update = function(l, f) {
              }, s.prototype.wrap = function(l, f) {
                var d = typeof l == "string" ? a.create(l, f) : l;
                return this.parent != null && this.parent.insertBefore(d, this.next), d.appendChild(this), d;
              }, s.blotName = "abstract", s;
            }()
          );
          n.default = o;
        },
        /* 31 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", { value: !0 });
          var a = i(12), o = i(32), s = i(33), l = i(1), f = (
            /** @class */
            function() {
              function d(c) {
                this.attributes = {}, this.domNode = c, this.build();
              }
              return d.prototype.attribute = function(c, u) {
                u ? c.add(this.domNode, u) && (c.value(this.domNode) != null ? this.attributes[c.attrName] = c : delete this.attributes[c.attrName]) : (c.remove(this.domNode), delete this.attributes[c.attrName]);
              }, d.prototype.build = function() {
                var c = this;
                this.attributes = {};
                var u = a.default.keys(this.domNode), h = o.default.keys(this.domNode), y = s.default.keys(this.domNode);
                u.concat(h).concat(y).forEach(function(g) {
                  var b = l.query(g, l.Scope.ATTRIBUTE);
                  b instanceof a.default && (c.attributes[b.attrName] = b);
                });
              }, d.prototype.copy = function(c) {
                var u = this;
                Object.keys(this.attributes).forEach(function(h) {
                  var y = u.attributes[h].value(u.domNode);
                  c.format(h, y);
                });
              }, d.prototype.move = function(c) {
                var u = this;
                this.copy(c), Object.keys(this.attributes).forEach(function(h) {
                  u.attributes[h].remove(u.domNode);
                }), this.attributes = {};
              }, d.prototype.values = function() {
                var c = this;
                return Object.keys(this.attributes).reduce(function(u, h) {
                  return u[h] = c.attributes[h].value(c.domNode), u;
                }, {});
              }, d;
            }()
          );
          n.default = f;
        },
        /* 32 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, c) {
              d.__proto__ = c;
            } || function(d, c) {
              for (var u in c)
                c.hasOwnProperty(u) && (d[u] = c[u]);
            };
            return function(d, c) {
              f(d, c);
              function u() {
                this.constructor = d;
              }
              d.prototype = c === null ? Object.create(c) : (u.prototype = c.prototype, new u());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(12);
          function s(f, d) {
            var c = f.getAttribute("class") || "";
            return c.split(/\s+/).filter(function(u) {
              return u.indexOf(d + "-") === 0;
            });
          }
          var l = (
            /** @class */
            function(f) {
              a(d, f);
              function d() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return d.keys = function(c) {
                return (c.getAttribute("class") || "").split(/\s+/).map(function(u) {
                  return u.split("-").slice(0, -1).join("-");
                });
              }, d.prototype.add = function(c, u) {
                return this.canAdd(c, u) ? (this.remove(c), c.classList.add(this.keyName + "-" + u), !0) : !1;
              }, d.prototype.remove = function(c) {
                var u = s(c, this.keyName);
                u.forEach(function(h) {
                  c.classList.remove(h);
                }), c.classList.length === 0 && c.removeAttribute("class");
              }, d.prototype.value = function(c) {
                var u = s(c, this.keyName)[0] || "", h = u.slice(this.keyName.length + 1);
                return this.canAdd(c, h) ? h : "";
              }, d;
            }(o.default)
          );
          n.default = l;
        },
        /* 33 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, c) {
              d.__proto__ = c;
            } || function(d, c) {
              for (var u in c)
                c.hasOwnProperty(u) && (d[u] = c[u]);
            };
            return function(d, c) {
              f(d, c);
              function u() {
                this.constructor = d;
              }
              d.prototype = c === null ? Object.create(c) : (u.prototype = c.prototype, new u());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(12);
          function s(f) {
            var d = f.split("-"), c = d.slice(1).map(function(u) {
              return u[0].toUpperCase() + u.slice(1);
            }).join("");
            return d[0] + c;
          }
          var l = (
            /** @class */
            function(f) {
              a(d, f);
              function d() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return d.keys = function(c) {
                return (c.getAttribute("style") || "").split(";").map(function(u) {
                  var h = u.split(":");
                  return h[0].trim();
                });
              }, d.prototype.add = function(c, u) {
                return this.canAdd(c, u) ? (c.style[s(this.keyName)] = u, !0) : !1;
              }, d.prototype.remove = function(c) {
                c.style[s(this.keyName)] = "", c.getAttribute("style") || c.removeAttribute("style");
              }, d.prototype.value = function(c) {
                var u = c.style[s(this.keyName)];
                return this.canAdd(c, u) ? u : "";
              }, d;
            }(o.default)
          );
          n.default = l;
        },
        /* 34 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function l(f, d) {
              for (var c = 0; c < d.length; c++) {
                var u = d[c];
                u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(f, u.key, u);
              }
            }
            return function(f, d, c) {
              return d && l(f.prototype, d), c && l(f, c), f;
            };
          }();
          function o(l, f) {
            if (!(l instanceof f))
              throw new TypeError("Cannot call a class as a function");
          }
          var s = function() {
            function l(f, d) {
              o(this, l), this.quill = f, this.options = d, this.modules = {};
            }
            return a(l, [{
              key: "init",
              value: function() {
                var d = this;
                Object.keys(this.options.modules).forEach(function(c) {
                  d.modules[c] == null && d.addModule(c);
                });
              }
            }, {
              key: "addModule",
              value: function(d) {
                var c = this.quill.constructor.import("modules/" + d);
                return this.modules[d] = new c(this.quill, this.options.modules[d] || {}), this.modules[d];
              }
            }]), l;
          }();
          s.DEFAULTS = {
            modules: {}
          }, s.themes = {
            default: s
          }, n.default = s;
        },
        /* 35 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function v(m, x) {
              for (var p = 0; p < x.length; p++) {
                var w = x[p];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(m, w.key, w);
              }
            }
            return function(m, x, p) {
              return x && v(m.prototype, x), p && v(m, p), m;
            };
          }(), o = function v(m, x, p) {
            m === null && (m = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(m, x);
            if (w === void 0) {
              var S = Object.getPrototypeOf(m);
              return S === null ? void 0 : v(S, x, p);
            } else {
              if ("value" in w)
                return w.value;
              var E = w.get;
              return E === void 0 ? void 0 : E.call(p);
            }
          }, s = i(0), l = c(s), f = i(7), d = c(f);
          function c(v) {
            return v && v.__esModule ? v : { default: v };
          }
          function u(v, m) {
            if (!(v instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function h(v, m) {
            if (!v)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : v;
          }
          function y(v, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            v.prototype = Object.create(m && m.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(v, m) : v.__proto__ = m);
          }
          var g = "\uFEFF", b = function(v) {
            y(m, v);
            function m(x) {
              u(this, m);
              var p = h(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, x));
              return p.contentNode = document.createElement("span"), p.contentNode.setAttribute("contenteditable", !1), [].slice.call(p.domNode.childNodes).forEach(function(w) {
                p.contentNode.appendChild(w);
              }), p.leftGuard = document.createTextNode(g), p.rightGuard = document.createTextNode(g), p.domNode.appendChild(p.leftGuard), p.domNode.appendChild(p.contentNode), p.domNode.appendChild(p.rightGuard), p;
            }
            return a(m, [{
              key: "index",
              value: function(p, w) {
                return p === this.leftGuard ? 0 : p === this.rightGuard ? 1 : o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "index", this).call(this, p, w);
              }
            }, {
              key: "restore",
              value: function(p) {
                var w = void 0, S = void 0, E = p.data.split(g).join("");
                if (p === this.leftGuard)
                  if (this.prev instanceof d.default) {
                    var A = this.prev.length();
                    this.prev.insertAt(A, E), w = {
                      startNode: this.prev.domNode,
                      startOffset: A + E.length
                    };
                  } else
                    S = document.createTextNode(E), this.parent.insertBefore(l.default.create(S), this), w = {
                      startNode: S,
                      startOffset: E.length
                    };
                else
                  p === this.rightGuard && (this.next instanceof d.default ? (this.next.insertAt(0, E), w = {
                    startNode: this.next.domNode,
                    startOffset: E.length
                  }) : (S = document.createTextNode(E), this.parent.insertBefore(l.default.create(S), this.next), w = {
                    startNode: S,
                    startOffset: E.length
                  }));
                return p.data = g, w;
              }
            }, {
              key: "update",
              value: function(p, w) {
                var S = this;
                p.forEach(function(E) {
                  if (E.type === "characterData" && (E.target === S.leftGuard || E.target === S.rightGuard)) {
                    var A = S.restore(E.target);
                    A && (w.range = A);
                  }
                });
              }
            }]), m;
          }(l.default.Embed);
          n.default = b;
        },
        /* 36 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.AlignStyle = n.AlignClass = n.AlignAttribute = void 0;
          var a = i(0), o = s(a);
          function s(u) {
            return u && u.__esModule ? u : { default: u };
          }
          var l = {
            scope: o.default.Scope.BLOCK,
            whitelist: ["right", "center", "justify"]
          }, f = new o.default.Attributor.Attribute("align", "align", l), d = new o.default.Attributor.Class("align", "ql-align", l), c = new o.default.Attributor.Style("align", "text-align", l);
          n.AlignAttribute = f, n.AlignClass = d, n.AlignStyle = c;
        },
        /* 37 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.BackgroundStyle = n.BackgroundClass = void 0;
          var a = i(0), o = l(a), s = i(26);
          function l(c) {
            return c && c.__esModule ? c : { default: c };
          }
          var f = new o.default.Attributor.Class("background", "ql-bg", {
            scope: o.default.Scope.INLINE
          }), d = new s.ColorAttributor("background", "background-color", {
            scope: o.default.Scope.INLINE
          });
          n.BackgroundClass = f, n.BackgroundStyle = d;
        },
        /* 38 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.DirectionStyle = n.DirectionClass = n.DirectionAttribute = void 0;
          var a = i(0), o = s(a);
          function s(u) {
            return u && u.__esModule ? u : { default: u };
          }
          var l = {
            scope: o.default.Scope.BLOCK,
            whitelist: ["rtl"]
          }, f = new o.default.Attributor.Attribute("direction", "dir", l), d = new o.default.Attributor.Class("direction", "ql-direction", l), c = new o.default.Attributor.Style("direction", "direction", l);
          n.DirectionAttribute = f, n.DirectionClass = d, n.DirectionStyle = c;
        },
        /* 39 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.FontClass = n.FontStyle = void 0;
          var a = function() {
            function v(m, x) {
              for (var p = 0; p < x.length; p++) {
                var w = x[p];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(m, w.key, w);
              }
            }
            return function(m, x, p) {
              return x && v(m.prototype, x), p && v(m, p), m;
            };
          }(), o = function v(m, x, p) {
            m === null && (m = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(m, x);
            if (w === void 0) {
              var S = Object.getPrototypeOf(m);
              return S === null ? void 0 : v(S, x, p);
            } else {
              if ("value" in w)
                return w.value;
              var E = w.get;
              return E === void 0 ? void 0 : E.call(p);
            }
          }, s = i(0), l = f(s);
          function f(v) {
            return v && v.__esModule ? v : { default: v };
          }
          function d(v, m) {
            if (!(v instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(v, m) {
            if (!v)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : v;
          }
          function u(v, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            v.prototype = Object.create(m && m.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(v, m) : v.__proto__ = m);
          }
          var h = {
            scope: l.default.Scope.INLINE,
            whitelist: ["serif", "monospace"]
          }, y = new l.default.Attributor.Class("font", "ql-font", h), g = function(v) {
            u(m, v);
            function m() {
              return d(this, m), c(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return a(m, [{
              key: "value",
              value: function(p) {
                return o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "value", this).call(this, p).replace(/["']/g, "");
              }
            }]), m;
          }(l.default.Attributor.Style), b = new g("font", "font-family", h);
          n.FontStyle = b, n.FontClass = y;
        },
        /* 40 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.SizeStyle = n.SizeClass = void 0;
          var a = i(0), o = s(a);
          function s(d) {
            return d && d.__esModule ? d : { default: d };
          }
          var l = new o.default.Attributor.Class("size", "ql-size", {
            scope: o.default.Scope.INLINE,
            whitelist: ["small", "large", "huge"]
          }), f = new o.default.Attributor.Style("size", "font-size", {
            scope: o.default.Scope.INLINE,
            whitelist: ["10px", "18px", "32px"]
          });
          n.SizeClass = l, n.SizeStyle = f;
        },
        /* 41 */
        /***/
        function(r, n, i) {
          r.exports = {
            align: {
              "": i(76),
              center: i(77),
              right: i(78),
              justify: i(79)
            },
            background: i(80),
            blockquote: i(81),
            bold: i(82),
            clean: i(83),
            code: i(58),
            "code-block": i(58),
            color: i(84),
            direction: {
              "": i(85),
              rtl: i(86)
            },
            float: {
              center: i(87),
              full: i(88),
              left: i(89),
              right: i(90)
            },
            formula: i(91),
            header: {
              1: i(92),
              2: i(93)
            },
            italic: i(94),
            image: i(95),
            indent: {
              "+1": i(96),
              "-1": i(97)
            },
            link: i(98),
            list: {
              ordered: i(99),
              bullet: i(100),
              check: i(101)
            },
            script: {
              sub: i(102),
              super: i(103)
            },
            strike: i(104),
            underline: i(105),
            video: i(106)
          };
        },
        /* 42 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.getLastChangeIndex = n.default = void 0;
          var a = function() {
            function x(p, w) {
              for (var S = 0; S < w.length; S++) {
                var E = w[S];
                E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(p, E.key, E);
              }
            }
            return function(p, w, S) {
              return w && x(p.prototype, w), S && x(p, S), p;
            };
          }(), o = i(0), s = u(o), l = i(5), f = u(l), d = i(9), c = u(d);
          function u(x) {
            return x && x.__esModule ? x : { default: x };
          }
          function h(x, p) {
            if (!(x instanceof p))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(x, p) {
            if (!x)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return p && (typeof p == "object" || typeof p == "function") ? p : x;
          }
          function g(x, p) {
            if (typeof p != "function" && p !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof p);
            x.prototype = Object.create(p && p.prototype, { constructor: { value: x, enumerable: !1, writable: !0, configurable: !0 } }), p && (Object.setPrototypeOf ? Object.setPrototypeOf(x, p) : x.__proto__ = p);
          }
          var b = function(x) {
            g(p, x);
            function p(w, S) {
              h(this, p);
              var E = y(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, w, S));
              return E.lastRecorded = 0, E.ignoreChange = !1, E.clear(), E.quill.on(f.default.events.EDITOR_CHANGE, function(A, j, _, O) {
                A !== f.default.events.TEXT_CHANGE || E.ignoreChange || (!E.options.userOnly || O === f.default.sources.USER ? E.record(j, _) : E.transform(j));
              }), E.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, E.undo.bind(E)), E.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, E.redo.bind(E)), /Win/i.test(navigator.platform) && E.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, E.redo.bind(E)), E;
            }
            return a(p, [{
              key: "change",
              value: function(S, E) {
                if (this.stack[S].length !== 0) {
                  var A = this.stack[S].pop();
                  this.stack[E].push(A), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(A[S], f.default.sources.USER), this.ignoreChange = !1;
                  var j = m(A[S]);
                  this.quill.setSelection(j);
                }
              }
            }, {
              key: "clear",
              value: function() {
                this.stack = { undo: [], redo: [] };
              }
            }, {
              key: "cutoff",
              value: function() {
                this.lastRecorded = 0;
              }
            }, {
              key: "record",
              value: function(S, E) {
                if (S.ops.length !== 0) {
                  this.stack.redo = [];
                  var A = this.quill.getContents().diff(E), j = Date.now();
                  if (this.lastRecorded + this.options.delay > j && this.stack.undo.length > 0) {
                    var _ = this.stack.undo.pop();
                    A = A.compose(_.undo), S = _.redo.compose(S);
                  } else
                    this.lastRecorded = j;
                  this.stack.undo.push({
                    redo: S,
                    undo: A
                  }), this.stack.undo.length > this.options.maxStack && this.stack.undo.shift();
                }
              }
            }, {
              key: "redo",
              value: function() {
                this.change("redo", "undo");
              }
            }, {
              key: "transform",
              value: function(S) {
                this.stack.undo.forEach(function(E) {
                  E.undo = S.transform(E.undo, !0), E.redo = S.transform(E.redo, !0);
                }), this.stack.redo.forEach(function(E) {
                  E.undo = S.transform(E.undo, !0), E.redo = S.transform(E.redo, !0);
                });
              }
            }, {
              key: "undo",
              value: function() {
                this.change("undo", "redo");
              }
            }]), p;
          }(c.default);
          b.DEFAULTS = {
            delay: 1e3,
            maxStack: 100,
            userOnly: !1
          };
          function v(x) {
            var p = x.ops[x.ops.length - 1];
            return p == null ? !1 : p.insert != null ? typeof p.insert == "string" && p.insert.endsWith(`
`) : p.attributes != null ? Object.keys(p.attributes).some(function(w) {
              return s.default.query(w, s.default.Scope.BLOCK) != null;
            }) : !1;
          }
          function m(x) {
            var p = x.reduce(function(S, E) {
              return S += E.delete || 0, S;
            }, 0), w = x.length() - p;
            return v(x) && (w -= 1), w;
          }
          n.default = b, n.getLastChangeIndex = m;
        },
        /* 43 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.BaseTooltip = void 0;
          var a = function() {
            function M(D, F) {
              for (var z = 0; z < F.length; z++) {
                var C = F[z];
                C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(D, C.key, C);
              }
            }
            return function(D, F, z) {
              return F && M(D.prototype, F), z && M(D, z), D;
            };
          }(), o = function M(D, F, z) {
            D === null && (D = Function.prototype);
            var C = Object.getOwnPropertyDescriptor(D, F);
            if (C === void 0) {
              var $ = Object.getPrototypeOf(D);
              return $ === null ? void 0 : M($, F, z);
            } else {
              if ("value" in C)
                return C.value;
              var W = C.get;
              return W === void 0 ? void 0 : W.call(z);
            }
          }, s = i(3), l = j(s), f = i(2), d = j(f), c = i(8), u = j(c), h = i(23), y = j(h), g = i(34), b = j(g), v = i(59), m = j(v), x = i(60), p = j(x), w = i(28), S = j(w), E = i(61), A = j(E);
          function j(M) {
            return M && M.__esModule ? M : { default: M };
          }
          function _(M, D) {
            if (!(M instanceof D))
              throw new TypeError("Cannot call a class as a function");
          }
          function O(M, D) {
            if (!M)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return D && (typeof D == "object" || typeof D == "function") ? D : M;
          }
          function N(M, D) {
            if (typeof D != "function" && D !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof D);
            M.prototype = Object.create(D && D.prototype, { constructor: { value: M, enumerable: !1, writable: !0, configurable: !0 } }), D && (Object.setPrototypeOf ? Object.setPrototypeOf(M, D) : M.__proto__ = D);
          }
          var k = [!1, "center", "right", "justify"], I = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], R = [!1, "serif", "monospace"], H = ["1", "2", "3", !1], U = ["small", !1, "large", "huge"], G = function(M) {
            N(D, M);
            function D(F, z) {
              _(this, D);
              var C = O(this, (D.__proto__ || Object.getPrototypeOf(D)).call(this, F, z)), $ = function W(Y) {
                if (!document.body.contains(F.root))
                  return document.body.removeEventListener("click", W);
                C.tooltip != null && !C.tooltip.root.contains(Y.target) && document.activeElement !== C.tooltip.textbox && !C.quill.hasFocus() && C.tooltip.hide(), C.pickers != null && C.pickers.forEach(function(V) {
                  V.container.contains(Y.target) || V.close();
                });
              };
              return F.emitter.listenDOM("click", document.body, $), C;
            }
            return a(D, [{
              key: "addModule",
              value: function(z) {
                var C = o(D.prototype.__proto__ || Object.getPrototypeOf(D.prototype), "addModule", this).call(this, z);
                return z === "toolbar" && this.extendToolbar(C), C;
              }
            }, {
              key: "buildButtons",
              value: function(z, C) {
                z.forEach(function($) {
                  var W = $.getAttribute("class") || "";
                  W.split(/\s+/).forEach(function(Y) {
                    if (Y.startsWith("ql-") && (Y = Y.slice(3), C[Y] != null))
                      if (Y === "direction")
                        $.innerHTML = C[Y][""] + C[Y].rtl;
                      else if (typeof C[Y] == "string")
                        $.innerHTML = C[Y];
                      else {
                        var V = $.value || "";
                        V != null && C[Y][V] && ($.innerHTML = C[Y][V]);
                      }
                  });
                });
              }
            }, {
              key: "buildPickers",
              value: function(z, C) {
                var $ = this;
                this.pickers = z.map(function(Y) {
                  if (Y.classList.contains("ql-align"))
                    return Y.querySelector("option") == null && T(Y, k), new p.default(Y, C.align);
                  if (Y.classList.contains("ql-background") || Y.classList.contains("ql-color")) {
                    var V = Y.classList.contains("ql-background") ? "background" : "color";
                    return Y.querySelector("option") == null && T(Y, I, V === "background" ? "#ffffff" : "#000000"), new m.default(Y, C[V]);
                  } else
                    return Y.querySelector("option") == null && (Y.classList.contains("ql-font") ? T(Y, R) : Y.classList.contains("ql-header") ? T(Y, H) : Y.classList.contains("ql-size") && T(Y, U)), new S.default(Y);
                });
                var W = function() {
                  $.pickers.forEach(function(V) {
                    V.update();
                  });
                };
                this.quill.on(u.default.events.EDITOR_CHANGE, W);
              }
            }]), D;
          }(b.default);
          G.DEFAULTS = (0, l.default)(!0, {}, b.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  formula: function() {
                    this.quill.theme.tooltip.edit("formula");
                  },
                  image: function() {
                    var D = this, F = this.container.querySelector("input.ql-image[type=file]");
                    F == null && (F = document.createElement("input"), F.setAttribute("type", "file"), F.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), F.classList.add("ql-image"), F.addEventListener("change", function() {
                      if (F.files != null && F.files[0] != null) {
                        var z = new FileReader();
                        z.onload = function(C) {
                          var $ = D.quill.getSelection(!0);
                          D.quill.updateContents(new d.default().retain($.index).delete($.length).insert({ image: C.target.result }), u.default.sources.USER), D.quill.setSelection($.index + 1, u.default.sources.SILENT), F.value = "";
                        }, z.readAsDataURL(F.files[0]);
                      }
                    }), this.container.appendChild(F)), F.click();
                  },
                  video: function() {
                    this.quill.theme.tooltip.edit("video");
                  }
                }
              }
            }
          });
          var q = function(M) {
            N(D, M);
            function D(F, z) {
              _(this, D);
              var C = O(this, (D.__proto__ || Object.getPrototypeOf(D)).call(this, F, z));
              return C.textbox = C.root.querySelector('input[type="text"]'), C.listen(), C;
            }
            return a(D, [{
              key: "listen",
              value: function() {
                var z = this;
                this.textbox.addEventListener("keydown", function(C) {
                  y.default.match(C, "enter") ? (z.save(), C.preventDefault()) : y.default.match(C, "escape") && (z.cancel(), C.preventDefault());
                });
              }
            }, {
              key: "cancel",
              value: function() {
                this.hide();
              }
            }, {
              key: "edit",
              value: function() {
                var z = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), C != null ? this.textbox.value = C : z !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + z) || ""), this.root.setAttribute("data-mode", z);
              }
            }, {
              key: "restoreFocus",
              value: function() {
                var z = this.quill.scrollingContainer.scrollTop;
                this.quill.focus(), this.quill.scrollingContainer.scrollTop = z;
              }
            }, {
              key: "save",
              value: function() {
                var z = this.textbox.value;
                switch (this.root.getAttribute("data-mode")) {
                  case "link": {
                    var C = this.quill.root.scrollTop;
                    this.linkRange ? (this.quill.formatText(this.linkRange, "link", z, u.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", z, u.default.sources.USER)), this.quill.root.scrollTop = C;
                    break;
                  }
                  case "video":
                    z = P(z);
                  case "formula": {
                    if (!z)
                      break;
                    var $ = this.quill.getSelection(!0);
                    if ($ != null) {
                      var W = $.index + $.length;
                      this.quill.insertEmbed(W, this.root.getAttribute("data-mode"), z, u.default.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(W + 1, " ", u.default.sources.USER), this.quill.setSelection(W + 2, u.default.sources.USER);
                    }
                    break;
                  }
                }
                this.textbox.value = "", this.hide();
              }
            }]), D;
          }(A.default);
          function P(M) {
            var D = M.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || M.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
            return D ? (D[1] || "https") + "://www.youtube.com/embed/" + D[2] + "?showinfo=0" : (D = M.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (D[1] || "https") + "://player.vimeo.com/video/" + D[2] + "/" : M;
          }
          function T(M, D) {
            var F = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            D.forEach(function(z) {
              var C = document.createElement("option");
              z === F ? C.setAttribute("selected", "selected") : C.setAttribute("value", z), M.appendChild(C);
            });
          }
          n.BaseTooltip = q, n.default = G;
        },
        /* 44 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", { value: !0 });
          var a = (
            /** @class */
            function() {
              function o() {
                this.head = this.tail = null, this.length = 0;
              }
              return o.prototype.append = function() {
                for (var s = [], l = 0; l < arguments.length; l++)
                  s[l] = arguments[l];
                this.insertBefore(s[0], null), s.length > 1 && this.append.apply(this, s.slice(1));
              }, o.prototype.contains = function(s) {
                for (var l, f = this.iterator(); l = f(); )
                  if (l === s)
                    return !0;
                return !1;
              }, o.prototype.insertBefore = function(s, l) {
                s && (s.next = l, l != null ? (s.prev = l.prev, l.prev != null && (l.prev.next = s), l.prev = s, l === this.head && (this.head = s)) : this.tail != null ? (this.tail.next = s, s.prev = this.tail, this.tail = s) : (s.prev = null, this.head = this.tail = s), this.length += 1);
              }, o.prototype.offset = function(s) {
                for (var l = 0, f = this.head; f != null; ) {
                  if (f === s)
                    return l;
                  l += f.length(), f = f.next;
                }
                return -1;
              }, o.prototype.remove = function(s) {
                this.contains(s) && (s.prev != null && (s.prev.next = s.next), s.next != null && (s.next.prev = s.prev), s === this.head && (this.head = s.next), s === this.tail && (this.tail = s.prev), this.length -= 1);
              }, o.prototype.iterator = function(s) {
                return s === void 0 && (s = this.head), function() {
                  var l = s;
                  return s != null && (s = s.next), l;
                };
              }, o.prototype.find = function(s, l) {
                l === void 0 && (l = !1);
                for (var f, d = this.iterator(); f = d(); ) {
                  var c = f.length();
                  if (s < c || l && s === c && (f.next == null || f.next.length() !== 0))
                    return [f, s];
                  s -= c;
                }
                return [null, 0];
              }, o.prototype.forEach = function(s) {
                for (var l, f = this.iterator(); l = f(); )
                  s(l);
              }, o.prototype.forEachAt = function(s, l, f) {
                if (!(l <= 0))
                  for (var d = this.find(s), c = d[0], u = d[1], h, y = s - u, g = this.iterator(c); (h = g()) && y < s + l; ) {
                    var b = h.length();
                    s > y ? f(h, s - y, Math.min(l, y + b - s)) : f(h, 0, Math.min(b, s + l - y)), y += b;
                  }
              }, o.prototype.map = function(s) {
                return this.reduce(function(l, f) {
                  return l.push(s(f)), l;
                }, []);
              }, o.prototype.reduce = function(s, l) {
                for (var f, d = this.iterator(); f = d(); )
                  l = s(l, f);
                return l;
              }, o;
            }()
          );
          n.default = a;
        },
        /* 45 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(u, h) {
              u.__proto__ = h;
            } || function(u, h) {
              for (var y in h)
                h.hasOwnProperty(y) && (u[y] = h[y]);
            };
            return function(u, h) {
              c(u, h);
              function y() {
                this.constructor = u;
              }
              u.prototype = h === null ? Object.create(h) : (y.prototype = h.prototype, new y());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(17), s = i(1), l = {
            attributes: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0
          }, f = 100, d = (
            /** @class */
            function(c) {
              a(u, c);
              function u(h) {
                var y = c.call(this, h) || this;
                return y.scroll = y, y.observer = new MutationObserver(function(g) {
                  y.update(g);
                }), y.observer.observe(y.domNode, l), y.attach(), y;
              }
              return u.prototype.detach = function() {
                c.prototype.detach.call(this), this.observer.disconnect();
              }, u.prototype.deleteAt = function(h, y) {
                this.update(), h === 0 && y === this.length() ? this.children.forEach(function(g) {
                  g.remove();
                }) : c.prototype.deleteAt.call(this, h, y);
              }, u.prototype.formatAt = function(h, y, g, b) {
                this.update(), c.prototype.formatAt.call(this, h, y, g, b);
              }, u.prototype.insertAt = function(h, y, g) {
                this.update(), c.prototype.insertAt.call(this, h, y, g);
              }, u.prototype.optimize = function(h, y) {
                var g = this;
                h === void 0 && (h = []), y === void 0 && (y = {}), c.prototype.optimize.call(this, y);
                for (var b = [].slice.call(this.observer.takeRecords()); b.length > 0; )
                  h.push(b.pop());
                for (var v = function(w, S) {
                  S === void 0 && (S = !0), !(w == null || w === g) && w.domNode.parentNode != null && (w.domNode[s.DATA_KEY].mutations == null && (w.domNode[s.DATA_KEY].mutations = []), S && v(w.parent));
                }, m = function(w) {
                  // @ts-ignore
                  w.domNode[s.DATA_KEY] == null || // @ts-ignore
                  w.domNode[s.DATA_KEY].mutations == null || (w instanceof o.default && w.children.forEach(m), w.optimize(y));
                }, x = h, p = 0; x.length > 0; p += 1) {
                  if (p >= f)
                    throw new Error("[Parchment] Maximum optimize iterations reached");
                  for (x.forEach(function(w) {
                    var S = s.find(w.target, !0);
                    S != null && (S.domNode === w.target && (w.type === "childList" ? (v(s.find(w.previousSibling, !1)), [].forEach.call(w.addedNodes, function(E) {
                      var A = s.find(E, !1);
                      v(A, !1), A instanceof o.default && A.children.forEach(function(j) {
                        v(j, !1);
                      });
                    })) : w.type === "attributes" && v(S.prev)), v(S));
                  }), this.children.forEach(m), x = [].slice.call(this.observer.takeRecords()), b = x.slice(); b.length > 0; )
                    h.push(b.pop());
                }
              }, u.prototype.update = function(h, y) {
                var g = this;
                y === void 0 && (y = {}), h = h || this.observer.takeRecords(), h.map(function(b) {
                  var v = s.find(b.target, !0);
                  return v == null ? null : v.domNode[s.DATA_KEY].mutations == null ? (v.domNode[s.DATA_KEY].mutations = [b], v) : (v.domNode[s.DATA_KEY].mutations.push(b), null);
                }).forEach(function(b) {
                  b == null || b === g || //@ts-ignore
                  b.domNode[s.DATA_KEY] == null || b.update(b.domNode[s.DATA_KEY].mutations || [], y);
                }), this.domNode[s.DATA_KEY].mutations != null && c.prototype.update.call(this, this.domNode[s.DATA_KEY].mutations, y), this.optimize(h, y);
              }, u.blotName = "scroll", u.defaultChild = "block", u.scope = s.Scope.BLOCK_BLOT, u.tagName = "DIV", u;
            }(o.default)
          );
          n.default = d;
        },
        /* 46 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var d = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, u) {
              c.__proto__ = u;
            } || function(c, u) {
              for (var h in u)
                u.hasOwnProperty(h) && (c[h] = u[h]);
            };
            return function(c, u) {
              d(c, u);
              function h() {
                this.constructor = c;
              }
              c.prototype = u === null ? Object.create(u) : (h.prototype = u.prototype, new h());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(18), s = i(1);
          function l(d, c) {
            if (Object.keys(d).length !== Object.keys(c).length)
              return !1;
            for (var u in d)
              if (d[u] !== c[u])
                return !1;
            return !0;
          }
          var f = (
            /** @class */
            function(d) {
              a(c, d);
              function c() {
                return d !== null && d.apply(this, arguments) || this;
              }
              return c.formats = function(u) {
                if (u.tagName !== c.tagName)
                  return d.formats.call(this, u);
              }, c.prototype.format = function(u, h) {
                var y = this;
                u === this.statics.blotName && !h ? (this.children.forEach(function(g) {
                  g instanceof o.default || (g = g.wrap(c.blotName, !0)), y.attributes.copy(g);
                }), this.unwrap()) : d.prototype.format.call(this, u, h);
              }, c.prototype.formatAt = function(u, h, y, g) {
                if (this.formats()[y] != null || s.query(y, s.Scope.ATTRIBUTE)) {
                  var b = this.isolate(u, h);
                  b.format(y, g);
                } else
                  d.prototype.formatAt.call(this, u, h, y, g);
              }, c.prototype.optimize = function(u) {
                d.prototype.optimize.call(this, u);
                var h = this.formats();
                if (Object.keys(h).length === 0)
                  return this.unwrap();
                var y = this.next;
                y instanceof c && y.prev === this && l(h, y.formats()) && (y.moveChildren(this), y.remove());
              }, c.blotName = "inline", c.scope = s.Scope.INLINE_BLOT, c.tagName = "SPAN", c;
            }(o.default)
          );
          n.default = f;
        },
        /* 47 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, c) {
              d.__proto__ = c;
            } || function(d, c) {
              for (var u in c)
                c.hasOwnProperty(u) && (d[u] = c[u]);
            };
            return function(d, c) {
              f(d, c);
              function u() {
                this.constructor = d;
              }
              d.prototype = c === null ? Object.create(c) : (u.prototype = c.prototype, new u());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(18), s = i(1), l = (
            /** @class */
            function(f) {
              a(d, f);
              function d() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return d.formats = function(c) {
                var u = s.query(d.blotName).tagName;
                if (c.tagName !== u)
                  return f.formats.call(this, c);
              }, d.prototype.format = function(c, u) {
                s.query(c, s.Scope.BLOCK) != null && (c === this.statics.blotName && !u ? this.replaceWith(d.blotName) : f.prototype.format.call(this, c, u));
              }, d.prototype.formatAt = function(c, u, h, y) {
                s.query(h, s.Scope.BLOCK) != null ? this.format(h, y) : f.prototype.formatAt.call(this, c, u, h, y);
              }, d.prototype.insertAt = function(c, u, h) {
                if (h == null || s.query(u, s.Scope.INLINE) != null)
                  f.prototype.insertAt.call(this, c, u, h);
                else {
                  var y = this.split(c), g = s.create(u, h);
                  y.parent.insertBefore(g, y);
                }
              }, d.prototype.update = function(c, u) {
                navigator.userAgent.match(/Trident/) ? this.build() : f.prototype.update.call(this, c, u);
              }, d.blotName = "block", d.scope = s.Scope.BLOCK_BLOT, d.tagName = "P", d;
            }(o.default)
          );
          n.default = l;
        },
        /* 48 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var l = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(f, d) {
              f.__proto__ = d;
            } || function(f, d) {
              for (var c in d)
                d.hasOwnProperty(c) && (f[c] = d[c]);
            };
            return function(f, d) {
              l(f, d);
              function c() {
                this.constructor = f;
              }
              f.prototype = d === null ? Object.create(d) : (c.prototype = d.prototype, new c());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(19), s = (
            /** @class */
            function(l) {
              a(f, l);
              function f() {
                return l !== null && l.apply(this, arguments) || this;
              }
              return f.formats = function(d) {
              }, f.prototype.format = function(d, c) {
                l.prototype.formatAt.call(this, 0, this.length(), d, c);
              }, f.prototype.formatAt = function(d, c, u, h) {
                d === 0 && c === this.length() ? this.format(u, h) : l.prototype.formatAt.call(this, d, c, u, h);
              }, f.prototype.formats = function() {
                return this.statics.formats(this.domNode);
              }, f;
            }(o.default)
          );
          n.default = s;
        },
        /* 49 */
        /***/
        function(r, n, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, c) {
              d.__proto__ = c;
            } || function(d, c) {
              for (var u in c)
                c.hasOwnProperty(u) && (d[u] = c[u]);
            };
            return function(d, c) {
              f(d, c);
              function u() {
                this.constructor = d;
              }
              d.prototype = c === null ? Object.create(c) : (u.prototype = c.prototype, new u());
            };
          }();
          Object.defineProperty(n, "__esModule", { value: !0 });
          var o = i(19), s = i(1), l = (
            /** @class */
            function(f) {
              a(d, f);
              function d(c) {
                var u = f.call(this, c) || this;
                return u.text = u.statics.value(u.domNode), u;
              }
              return d.create = function(c) {
                return document.createTextNode(c);
              }, d.value = function(c) {
                var u = c.data;
                return u.normalize && (u = u.normalize()), u;
              }, d.prototype.deleteAt = function(c, u) {
                this.domNode.data = this.text = this.text.slice(0, c) + this.text.slice(c + u);
              }, d.prototype.index = function(c, u) {
                return this.domNode === c ? u : -1;
              }, d.prototype.insertAt = function(c, u, h) {
                h == null ? (this.text = this.text.slice(0, c) + u + this.text.slice(c), this.domNode.data = this.text) : f.prototype.insertAt.call(this, c, u, h);
              }, d.prototype.length = function() {
                return this.text.length;
              }, d.prototype.optimize = function(c) {
                f.prototype.optimize.call(this, c), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof d && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
              }, d.prototype.position = function(c, u) {
                return [this.domNode, c];
              }, d.prototype.split = function(c, u) {
                if (u === void 0 && (u = !1), !u) {
                  if (c === 0)
                    return this;
                  if (c === this.length())
                    return this.next;
                }
                var h = s.create(this.domNode.splitText(c));
                return this.parent.insertBefore(h, this.next), this.text = this.statics.value(this.domNode), h;
              }, d.prototype.update = function(c, u) {
                var h = this;
                c.some(function(y) {
                  return y.type === "characterData" && y.target === h.domNode;
                }) && (this.text = this.statics.value(this.domNode));
              }, d.prototype.value = function() {
                return this.text;
              }, d.blotName = "text", d.scope = s.Scope.INLINE_BLOT, d;
            }(o.default)
          );
          n.default = l;
        },
        /* 50 */
        /***/
        function(r, n, i) {
          var a = document.createElement("div");
          if (a.classList.toggle("test-class", !1), a.classList.contains("test-class")) {
            var o = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(s, l) {
              return arguments.length > 1 && !this.contains(s) == !l ? l : o.call(this, s);
            };
          }
          String.prototype.startsWith || (String.prototype.startsWith = function(s, l) {
            return l = l || 0, this.substr(l, s.length) === s;
          }), String.prototype.endsWith || (String.prototype.endsWith = function(s, l) {
            var f = this.toString();
            (typeof l != "number" || !isFinite(l) || Math.floor(l) !== l || l > f.length) && (l = f.length), l -= s.length;
            var d = f.indexOf(s, l);
            return d !== -1 && d === l;
          }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
            value: function(l) {
              if (this === null)
                throw new TypeError("Array.prototype.find called on null or undefined");
              if (typeof l != "function")
                throw new TypeError("predicate must be a function");
              for (var f = Object(this), d = f.length >>> 0, c = arguments[1], u, h = 0; h < d; h++)
                if (u = f[h], l.call(c, u, h, f))
                  return u;
            }
          }), document.addEventListener("DOMContentLoaded", function() {
            document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1);
          });
        },
        /* 51 */
        /***/
        function(r, n) {
          var i = -1, a = 1, o = 0;
          function s(p, w, S) {
            if (p == w)
              return p ? [[o, p]] : [];
            (S < 0 || p.length < S) && (S = null);
            var E = c(p, w), A = p.substring(0, E);
            p = p.substring(E), w = w.substring(E), E = u(p, w);
            var j = p.substring(p.length - E);
            p = p.substring(0, p.length - E), w = w.substring(0, w.length - E);
            var _ = l(p, w);
            return A && _.unshift([o, A]), j && _.push([o, j]), y(_), S != null && (_ = v(_, S)), _ = m(_), _;
          }
          function l(p, w) {
            var S;
            if (!p)
              return [[a, w]];
            if (!w)
              return [[i, p]];
            var E = p.length > w.length ? p : w, A = p.length > w.length ? w : p, j = E.indexOf(A);
            if (j != -1)
              return S = [
                [a, E.substring(0, j)],
                [o, A],
                [a, E.substring(j + A.length)]
              ], p.length > w.length && (S[0][0] = S[2][0] = i), S;
            if (A.length == 1)
              return [[i, p], [a, w]];
            var _ = h(p, w);
            if (_) {
              var O = _[0], N = _[1], k = _[2], I = _[3], R = _[4], H = s(O, k), U = s(N, I);
              return H.concat([[o, R]], U);
            }
            return f(p, w);
          }
          function f(p, w) {
            for (var S = p.length, E = w.length, A = Math.ceil((S + E) / 2), j = A, _ = 2 * A, O = new Array(_), N = new Array(_), k = 0; k < _; k++)
              O[k] = -1, N[k] = -1;
            O[j + 1] = 0, N[j + 1] = 0;
            for (var I = S - E, R = I % 2 != 0, H = 0, U = 0, G = 0, q = 0, P = 0; P < A; P++) {
              for (var T = -P + H; T <= P - U; T += 2) {
                var M = j + T, D;
                T == -P || T != P && O[M - 1] < O[M + 1] ? D = O[M + 1] : D = O[M - 1] + 1;
                for (var F = D - T; D < S && F < E && p.charAt(D) == w.charAt(F); )
                  D++, F++;
                if (O[M] = D, D > S)
                  U += 2;
                else if (F > E)
                  H += 2;
                else if (R) {
                  var z = j + I - T;
                  if (z >= 0 && z < _ && N[z] != -1) {
                    var C = S - N[z];
                    if (D >= C)
                      return d(p, w, D, F);
                  }
                }
              }
              for (var $ = -P + G; $ <= P - q; $ += 2) {
                var z = j + $, C;
                $ == -P || $ != P && N[z - 1] < N[z + 1] ? C = N[z + 1] : C = N[z - 1] + 1;
                for (var W = C - $; C < S && W < E && p.charAt(S - C - 1) == w.charAt(E - W - 1); )
                  C++, W++;
                if (N[z] = C, C > S)
                  q += 2;
                else if (W > E)
                  G += 2;
                else if (!R) {
                  var M = j + I - $;
                  if (M >= 0 && M < _ && O[M] != -1) {
                    var D = O[M], F = j + D - M;
                    if (C = S - C, D >= C)
                      return d(p, w, D, F);
                  }
                }
              }
            }
            return [[i, p], [a, w]];
          }
          function d(p, w, S, E) {
            var A = p.substring(0, S), j = w.substring(0, E), _ = p.substring(S), O = w.substring(E), N = s(A, j), k = s(_, O);
            return N.concat(k);
          }
          function c(p, w) {
            if (!p || !w || p.charAt(0) != w.charAt(0))
              return 0;
            for (var S = 0, E = Math.min(p.length, w.length), A = E, j = 0; S < A; )
              p.substring(j, A) == w.substring(j, A) ? (S = A, j = S) : E = A, A = Math.floor((E - S) / 2 + S);
            return A;
          }
          function u(p, w) {
            if (!p || !w || p.charAt(p.length - 1) != w.charAt(w.length - 1))
              return 0;
            for (var S = 0, E = Math.min(p.length, w.length), A = E, j = 0; S < A; )
              p.substring(p.length - A, p.length - j) == w.substring(w.length - A, w.length - j) ? (S = A, j = S) : E = A, A = Math.floor((E - S) / 2 + S);
            return A;
          }
          function h(p, w) {
            var S = p.length > w.length ? p : w, E = p.length > w.length ? w : p;
            if (S.length < 4 || E.length * 2 < S.length)
              return null;
            function A(U, G, q) {
              for (var P = U.substring(q, q + Math.floor(U.length / 4)), T = -1, M = "", D, F, z, C; (T = G.indexOf(P, T + 1)) != -1; ) {
                var $ = c(
                  U.substring(q),
                  G.substring(T)
                ), W = u(
                  U.substring(0, q),
                  G.substring(0, T)
                );
                M.length < W + $ && (M = G.substring(T - W, T) + G.substring(T, T + $), D = U.substring(0, q - W), F = U.substring(q + $), z = G.substring(0, T - W), C = G.substring(T + $));
              }
              return M.length * 2 >= U.length ? [
                D,
                F,
                z,
                C,
                M
              ] : null;
            }
            var j = A(
              S,
              E,
              Math.ceil(S.length / 4)
            ), _ = A(
              S,
              E,
              Math.ceil(S.length / 2)
            ), O;
            if (!j && !_)
              return null;
            _ ? j ? O = j[4].length > _[4].length ? j : _ : O = _ : O = j;
            var N, k, I, R;
            p.length > w.length ? (N = O[0], k = O[1], I = O[2], R = O[3]) : (I = O[0], R = O[1], N = O[2], k = O[3]);
            var H = O[4];
            return [N, k, I, R, H];
          }
          function y(p) {
            p.push([o, ""]);
            for (var w = 0, S = 0, E = 0, A = "", j = "", _; w < p.length; )
              switch (p[w][0]) {
                case a:
                  E++, j += p[w][1], w++;
                  break;
                case i:
                  S++, A += p[w][1], w++;
                  break;
                case o:
                  S + E > 1 ? (S !== 0 && E !== 0 && (_ = c(j, A), _ !== 0 && (w - S - E > 0 && p[w - S - E - 1][0] == o ? p[w - S - E - 1][1] += j.substring(0, _) : (p.splice(0, 0, [
                    o,
                    j.substring(0, _)
                  ]), w++), j = j.substring(_), A = A.substring(_)), _ = u(j, A), _ !== 0 && (p[w][1] = j.substring(j.length - _) + p[w][1], j = j.substring(0, j.length - _), A = A.substring(0, A.length - _))), S === 0 ? p.splice(
                    w - E,
                    S + E,
                    [a, j]
                  ) : E === 0 ? p.splice(
                    w - S,
                    S + E,
                    [i, A]
                  ) : p.splice(
                    w - S - E,
                    S + E,
                    [i, A],
                    [a, j]
                  ), w = w - S - E + (S ? 1 : 0) + (E ? 1 : 0) + 1) : w !== 0 && p[w - 1][0] == o ? (p[w - 1][1] += p[w][1], p.splice(w, 1)) : w++, E = 0, S = 0, A = "", j = "";
                  break;
              }
            p[p.length - 1][1] === "" && p.pop();
            var O = !1;
            for (w = 1; w < p.length - 1; )
              p[w - 1][0] == o && p[w + 1][0] == o && (p[w][1].substring(p[w][1].length - p[w - 1][1].length) == p[w - 1][1] ? (p[w][1] = p[w - 1][1] + p[w][1].substring(0, p[w][1].length - p[w - 1][1].length), p[w + 1][1] = p[w - 1][1] + p[w + 1][1], p.splice(w - 1, 1), O = !0) : p[w][1].substring(0, p[w + 1][1].length) == p[w + 1][1] && (p[w - 1][1] += p[w + 1][1], p[w][1] = p[w][1].substring(p[w + 1][1].length) + p[w + 1][1], p.splice(w + 1, 1), O = !0)), w++;
            O && y(p);
          }
          var g = s;
          g.INSERT = a, g.DELETE = i, g.EQUAL = o, r.exports = g;
          function b(p, w) {
            if (w === 0)
              return [o, p];
            for (var S = 0, E = 0; E < p.length; E++) {
              var A = p[E];
              if (A[0] === i || A[0] === o) {
                var j = S + A[1].length;
                if (w === j)
                  return [E + 1, p];
                if (w < j) {
                  p = p.slice();
                  var _ = w - S, O = [A[0], A[1].slice(0, _)], N = [A[0], A[1].slice(_)];
                  return p.splice(E, 1, O, N), [E + 1, p];
                } else
                  S = j;
              }
            }
            throw new Error("cursor_pos is out of bounds!");
          }
          function v(p, w) {
            var S = b(p, w), E = S[1], A = S[0], j = E[A], _ = E[A + 1];
            if (j == null)
              return p;
            if (j[0] !== o)
              return p;
            if (_ != null && j[1] + _[1] === _[1] + j[1])
              return E.splice(A, 2, _, j), x(E, A, 2);
            if (_ != null && _[1].indexOf(j[1]) === 0) {
              E.splice(A, 2, [_[0], j[1]], [0, j[1]]);
              var O = _[1].slice(j[1].length);
              return O.length > 0 && E.splice(A + 2, 0, [_[0], O]), x(E, A, 3);
            } else
              return p;
          }
          function m(p) {
            for (var w = !1, S = function(_) {
              return _.charCodeAt(0) >= 56320 && _.charCodeAt(0) <= 57343;
            }, E = function(_) {
              return _.charCodeAt(_.length - 1) >= 55296 && _.charCodeAt(_.length - 1) <= 56319;
            }, A = 2; A < p.length; A += 1)
              p[A - 2][0] === o && E(p[A - 2][1]) && p[A - 1][0] === i && S(p[A - 1][1]) && p[A][0] === a && S(p[A][1]) && (w = !0, p[A - 1][1] = p[A - 2][1].slice(-1) + p[A - 1][1], p[A][1] = p[A - 2][1].slice(-1) + p[A][1], p[A - 2][1] = p[A - 2][1].slice(0, -1));
            if (!w)
              return p;
            for (var j = [], A = 0; A < p.length; A += 1)
              p[A][1].length > 0 && j.push(p[A]);
            return j;
          }
          function x(p, w, S) {
            for (var E = w + S - 1; E >= 0 && E >= w - 1; E--)
              if (E + 1 < p.length) {
                var A = p[E], j = p[E + 1];
                A[0] === j[1] && p.splice(E, 2, [A[0], A[1] + j[1]]);
              }
            return p;
          }
        },
        /* 52 */
        /***/
        function(r, n) {
          n = r.exports = typeof Object.keys == "function" ? Object.keys : i, n.shim = i;
          function i(a) {
            var o = [];
            for (var s in a)
              o.push(s);
            return o;
          }
        },
        /* 53 */
        /***/
        function(r, n) {
          var i = function() {
            return Object.prototype.toString.call(arguments);
          }() == "[object Arguments]";
          n = r.exports = i ? a : o, n.supported = a;
          function a(s) {
            return Object.prototype.toString.call(s) == "[object Arguments]";
          }
          n.unsupported = o;
          function o(s) {
            return s && typeof s == "object" && typeof s.length == "number" && Object.prototype.hasOwnProperty.call(s, "callee") && !Object.prototype.propertyIsEnumerable.call(s, "callee") || !1;
          }
        },
        /* 54 */
        /***/
        function(r, n) {
          var i = Object.prototype.hasOwnProperty, a = "~";
          function o() {
          }
          Object.create && (o.prototype = /* @__PURE__ */ Object.create(null), new o().__proto__ || (a = !1));
          function s(f, d, c) {
            this.fn = f, this.context = d, this.once = c || !1;
          }
          function l() {
            this._events = new o(), this._eventsCount = 0;
          }
          l.prototype.eventNames = function() {
            var d = [], c, u;
            if (this._eventsCount === 0)
              return d;
            for (u in c = this._events)
              i.call(c, u) && d.push(a ? u.slice(1) : u);
            return Object.getOwnPropertySymbols ? d.concat(Object.getOwnPropertySymbols(c)) : d;
          }, l.prototype.listeners = function(d, c) {
            var u = a ? a + d : d, h = this._events[u];
            if (c)
              return !!h;
            if (!h)
              return [];
            if (h.fn)
              return [h.fn];
            for (var y = 0, g = h.length, b = new Array(g); y < g; y++)
              b[y] = h[y].fn;
            return b;
          }, l.prototype.emit = function(d, c, u, h, y, g) {
            var b = a ? a + d : d;
            if (!this._events[b])
              return !1;
            var v = this._events[b], m = arguments.length, x, p;
            if (v.fn) {
              switch (v.once && this.removeListener(d, v.fn, void 0, !0), m) {
                case 1:
                  return v.fn.call(v.context), !0;
                case 2:
                  return v.fn.call(v.context, c), !0;
                case 3:
                  return v.fn.call(v.context, c, u), !0;
                case 4:
                  return v.fn.call(v.context, c, u, h), !0;
                case 5:
                  return v.fn.call(v.context, c, u, h, y), !0;
                case 6:
                  return v.fn.call(v.context, c, u, h, y, g), !0;
              }
              for (p = 1, x = new Array(m - 1); p < m; p++)
                x[p - 1] = arguments[p];
              v.fn.apply(v.context, x);
            } else {
              var w = v.length, S;
              for (p = 0; p < w; p++)
                switch (v[p].once && this.removeListener(d, v[p].fn, void 0, !0), m) {
                  case 1:
                    v[p].fn.call(v[p].context);
                    break;
                  case 2:
                    v[p].fn.call(v[p].context, c);
                    break;
                  case 3:
                    v[p].fn.call(v[p].context, c, u);
                    break;
                  case 4:
                    v[p].fn.call(v[p].context, c, u, h);
                    break;
                  default:
                    if (!x)
                      for (S = 1, x = new Array(m - 1); S < m; S++)
                        x[S - 1] = arguments[S];
                    v[p].fn.apply(v[p].context, x);
                }
            }
            return !0;
          }, l.prototype.on = function(d, c, u) {
            var h = new s(c, u || this), y = a ? a + d : d;
            return this._events[y] ? this._events[y].fn ? this._events[y] = [this._events[y], h] : this._events[y].push(h) : (this._events[y] = h, this._eventsCount++), this;
          }, l.prototype.once = function(d, c, u) {
            var h = new s(c, u || this, !0), y = a ? a + d : d;
            return this._events[y] ? this._events[y].fn ? this._events[y] = [this._events[y], h] : this._events[y].push(h) : (this._events[y] = h, this._eventsCount++), this;
          }, l.prototype.removeListener = function(d, c, u, h) {
            var y = a ? a + d : d;
            if (!this._events[y])
              return this;
            if (!c)
              return --this._eventsCount === 0 ? this._events = new o() : delete this._events[y], this;
            var g = this._events[y];
            if (g.fn)
              g.fn === c && (!h || g.once) && (!u || g.context === u) && (--this._eventsCount === 0 ? this._events = new o() : delete this._events[y]);
            else {
              for (var b = 0, v = [], m = g.length; b < m; b++)
                (g[b].fn !== c || h && !g[b].once || u && g[b].context !== u) && v.push(g[b]);
              v.length ? this._events[y] = v.length === 1 ? v[0] : v : --this._eventsCount === 0 ? this._events = new o() : delete this._events[y];
            }
            return this;
          }, l.prototype.removeAllListeners = function(d) {
            var c;
            return d ? (c = a ? a + d : d, this._events[c] && (--this._eventsCount === 0 ? this._events = new o() : delete this._events[c])) : (this._events = new o(), this._eventsCount = 0), this;
          }, l.prototype.off = l.prototype.removeListener, l.prototype.addListener = l.prototype.on, l.prototype.setMaxListeners = function() {
            return this;
          }, l.prefixed = a, l.EventEmitter = l, typeof r < "u" && (r.exports = l);
        },
        /* 55 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.matchText = n.matchSpacing = n.matchNewline = n.matchBlot = n.matchAttributor = n.default = void 0;
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(K) {
            return typeof K;
          } : function(K) {
            return K && typeof Symbol == "function" && K.constructor === Symbol && K !== Symbol.prototype ? "symbol" : typeof K;
          }, o = function() {
            function K(Q, ie) {
              var ae = [], J = !0, de = !1, X = void 0;
              try {
                for (var ne = Q[Symbol.iterator](), ge; !(J = (ge = ne.next()).done) && (ae.push(ge.value), !(ie && ae.length === ie)); J = !0)
                  ;
              } catch (ye) {
                de = !0, X = ye;
              } finally {
                try {
                  !J && ne.return && ne.return();
                } finally {
                  if (de)
                    throw X;
                }
              }
              return ae;
            }
            return function(Q, ie) {
              if (Array.isArray(Q))
                return Q;
              if (Symbol.iterator in Object(Q))
                return K(Q, ie);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), s = function() {
            function K(Q, ie) {
              for (var ae = 0; ae < ie.length; ae++) {
                var J = ie[ae];
                J.enumerable = J.enumerable || !1, J.configurable = !0, "value" in J && (J.writable = !0), Object.defineProperty(Q, J.key, J);
              }
            }
            return function(Q, ie, ae) {
              return ie && K(Q.prototype, ie), ae && K(Q, ae), Q;
            };
          }(), l = i(3), f = N(l), d = i(2), c = N(d), u = i(0), h = N(u), y = i(5), g = N(y), b = i(10), v = N(b), m = i(9), x = N(m), p = i(36), w = i(37), S = i(13), E = N(S), A = i(26), j = i(38), _ = i(39), O = i(40);
          function N(K) {
            return K && K.__esModule ? K : { default: K };
          }
          function k(K, Q, ie) {
            return Q in K ? Object.defineProperty(K, Q, { value: ie, enumerable: !0, configurable: !0, writable: !0 }) : K[Q] = ie, K;
          }
          function I(K, Q) {
            if (!(K instanceof Q))
              throw new TypeError("Cannot call a class as a function");
          }
          function R(K, Q) {
            if (!K)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return Q && (typeof Q == "object" || typeof Q == "function") ? Q : K;
          }
          function H(K, Q) {
            if (typeof Q != "function" && Q !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof Q);
            K.prototype = Object.create(Q && Q.prototype, { constructor: { value: K, enumerable: !1, writable: !0, configurable: !0 } }), Q && (Object.setPrototypeOf ? Object.setPrototypeOf(K, Q) : K.__proto__ = Q);
          }
          var U = (0, v.default)("quill:clipboard"), G = "__ql-matcher", q = [[Node.TEXT_NODE, Oe], [Node.TEXT_NODE, ce], ["br", te], [Node.ELEMENT_NODE, ce], [Node.ELEMENT_NODE, V], [Node.ELEMENT_NODE, he], [Node.ELEMENT_NODE, Y], [Node.ELEMENT_NODE, Ne], ["li", le], ["b", W.bind(W, "bold")], ["i", W.bind(W, "italic")], ["style", Z]], P = [p.AlignAttribute, j.DirectionAttribute].reduce(function(K, Q) {
            return K[Q.keyName] = Q, K;
          }, {}), T = [p.AlignStyle, w.BackgroundStyle, A.ColorStyle, j.DirectionStyle, _.FontStyle, O.SizeStyle].reduce(function(K, Q) {
            return K[Q.keyName] = Q, K;
          }, {}), M = function(K) {
            H(Q, K);
            function Q(ie, ae) {
              I(this, Q);
              var J = R(this, (Q.__proto__ || Object.getPrototypeOf(Q)).call(this, ie, ae));
              return J.quill.root.addEventListener("paste", J.onPaste.bind(J)), J.container = J.quill.addContainer("ql-clipboard"), J.container.setAttribute("contenteditable", !0), J.container.setAttribute("tabindex", -1), J.matchers = [], q.concat(J.options.matchers).forEach(function(de) {
                var X = o(de, 2), ne = X[0], ge = X[1];
                !ae.matchVisual && ge === he || J.addMatcher(ne, ge);
              }), J;
            }
            return s(Q, [{
              key: "addMatcher",
              value: function(ae, J) {
                this.matchers.push([ae, J]);
              }
            }, {
              key: "convert",
              value: function(ae) {
                if (typeof ae == "string")
                  return this.container.innerHTML = ae.replace(/\>\r?\n +\</g, "><"), this.convert();
                var J = this.quill.getFormat(this.quill.selection.savedRange.index);
                if (J[E.default.blotName]) {
                  var de = this.container.innerText;
                  return this.container.innerHTML = "", new c.default().insert(de, k({}, E.default.blotName, J[E.default.blotName]));
                }
                var X = this.prepareMatching(), ne = o(X, 2), ge = ne[0], ye = ne[1], pe = $(this.container, ge, ye);
                return z(pe, `
`) && pe.ops[pe.ops.length - 1].attributes == null && (pe = pe.compose(new c.default().retain(pe.length() - 1).delete(1))), U.log("convert", this.container.innerHTML, pe), this.container.innerHTML = "", pe;
              }
            }, {
              key: "dangerouslyPasteHTML",
              value: function(ae, J) {
                var de = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : g.default.sources.API;
                if (typeof ae == "string")
                  this.quill.setContents(this.convert(ae), J), this.quill.setSelection(0, g.default.sources.SILENT);
                else {
                  var X = this.convert(J);
                  this.quill.updateContents(new c.default().retain(ae).concat(X), de), this.quill.setSelection(ae + X.length(), g.default.sources.SILENT);
                }
              }
            }, {
              key: "onPaste",
              value: function(ae) {
                var J = this;
                if (!(ae.defaultPrevented || !this.quill.isEnabled())) {
                  var de = this.quill.getSelection(), X = new c.default().retain(de.index), ne = this.quill.scrollingContainer.scrollTop;
                  this.container.focus(), this.quill.selection.update(g.default.sources.SILENT), setTimeout(function() {
                    X = X.concat(J.convert()).delete(de.length), J.quill.updateContents(X, g.default.sources.USER), J.quill.setSelection(X.length() - de.length, g.default.sources.SILENT), J.quill.scrollingContainer.scrollTop = ne, J.quill.focus();
                  }, 1);
                }
              }
            }, {
              key: "prepareMatching",
              value: function() {
                var ae = this, J = [], de = [];
                return this.matchers.forEach(function(X) {
                  var ne = o(X, 2), ge = ne[0], ye = ne[1];
                  switch (ge) {
                    case Node.TEXT_NODE:
                      de.push(ye);
                      break;
                    case Node.ELEMENT_NODE:
                      J.push(ye);
                      break;
                    default:
                      [].forEach.call(ae.container.querySelectorAll(ge), function(pe) {
                        pe[G] = pe[G] || [], pe[G].push(ye);
                      });
                      break;
                  }
                }), [J, de];
              }
            }]), Q;
          }(x.default);
          M.DEFAULTS = {
            matchers: [],
            matchVisual: !0
          };
          function D(K, Q, ie) {
            return (typeof Q > "u" ? "undefined" : a(Q)) === "object" ? Object.keys(Q).reduce(function(ae, J) {
              return D(ae, J, Q[J]);
            }, K) : K.reduce(function(ae, J) {
              return J.attributes && J.attributes[Q] ? ae.push(J) : ae.insert(J.insert, (0, f.default)({}, k({}, Q, ie), J.attributes));
            }, new c.default());
          }
          function F(K) {
            if (K.nodeType !== Node.ELEMENT_NODE)
              return {};
            var Q = "__ql-computed-style";
            return K[Q] || (K[Q] = window.getComputedStyle(K));
          }
          function z(K, Q) {
            for (var ie = "", ae = K.ops.length - 1; ae >= 0 && ie.length < Q.length; --ae) {
              var J = K.ops[ae];
              if (typeof J.insert != "string")
                break;
              ie = J.insert + ie;
            }
            return ie.slice(-1 * Q.length) === Q;
          }
          function C(K) {
            if (K.childNodes.length === 0)
              return !1;
            var Q = F(K);
            return ["block", "list-item"].indexOf(Q.display) > -1;
          }
          function $(K, Q, ie) {
            return K.nodeType === K.TEXT_NODE ? ie.reduce(function(ae, J) {
              return J(K, ae);
            }, new c.default()) : K.nodeType === K.ELEMENT_NODE ? [].reduce.call(K.childNodes || [], function(ae, J) {
              var de = $(J, Q, ie);
              return J.nodeType === K.ELEMENT_NODE && (de = Q.reduce(function(X, ne) {
                return ne(J, X);
              }, de), de = (J[G] || []).reduce(function(X, ne) {
                return ne(J, X);
              }, de)), ae.concat(de);
            }, new c.default()) : new c.default();
          }
          function W(K, Q, ie) {
            return D(ie, K, !0);
          }
          function Y(K, Q) {
            var ie = h.default.Attributor.Attribute.keys(K), ae = h.default.Attributor.Class.keys(K), J = h.default.Attributor.Style.keys(K), de = {};
            return ie.concat(ae).concat(J).forEach(function(X) {
              var ne = h.default.query(X, h.default.Scope.ATTRIBUTE);
              ne != null && (de[ne.attrName] = ne.value(K), de[ne.attrName]) || (ne = P[X], ne != null && (ne.attrName === X || ne.keyName === X) && (de[ne.attrName] = ne.value(K) || void 0), ne = T[X], ne != null && (ne.attrName === X || ne.keyName === X) && (ne = T[X], de[ne.attrName] = ne.value(K) || void 0));
            }), Object.keys(de).length > 0 && (Q = D(Q, de)), Q;
          }
          function V(K, Q) {
            var ie = h.default.query(K);
            if (ie == null)
              return Q;
            if (ie.prototype instanceof h.default.Embed) {
              var ae = {}, J = ie.value(K);
              J != null && (ae[ie.blotName] = J, Q = new c.default().insert(ae, ie.formats(K)));
            } else
              typeof ie.formats == "function" && (Q = D(Q, ie.blotName, ie.formats(K)));
            return Q;
          }
          function te(K, Q) {
            return z(Q, `
`) || Q.insert(`
`), Q;
          }
          function Z() {
            return new c.default();
          }
          function le(K, Q) {
            var ie = h.default.query(K);
            if (ie == null || ie.blotName !== "list-item" || !z(Q, `
`))
              return Q;
            for (var ae = -1, J = K.parentNode; !J.classList.contains("ql-clipboard"); )
              (h.default.query(J) || {}).blotName === "list" && (ae += 1), J = J.parentNode;
            return ae <= 0 ? Q : Q.compose(new c.default().retain(Q.length() - 1).retain(1, { indent: ae }));
          }
          function ce(K, Q) {
            return z(Q, `
`) || (C(K) || Q.length() > 0 && K.nextSibling && C(K.nextSibling)) && Q.insert(`
`), Q;
          }
          function he(K, Q) {
            if (C(K) && K.nextElementSibling != null && !z(Q, `

`)) {
              var ie = K.offsetHeight + parseFloat(F(K).marginTop) + parseFloat(F(K).marginBottom);
              K.nextElementSibling.offsetTop > K.offsetTop + ie * 1.5 && Q.insert(`
`);
            }
            return Q;
          }
          function Ne(K, Q) {
            var ie = {}, ae = K.style || {};
            return ae.fontStyle && F(K).fontStyle === "italic" && (ie.italic = !0), ae.fontWeight && (F(K).fontWeight.startsWith("bold") || parseInt(F(K).fontWeight) >= 700) && (ie.bold = !0), Object.keys(ie).length > 0 && (Q = D(Q, ie)), parseFloat(ae.textIndent || 0) > 0 && (Q = new c.default().insert("	").concat(Q)), Q;
          }
          function Oe(K, Q) {
            var ie = K.data;
            if (K.parentNode.tagName === "O:P")
              return Q.insert(ie.trim());
            if (ie.trim().length === 0 && K.parentNode.classList.contains("ql-clipboard"))
              return Q;
            if (!F(K.parentNode).whiteSpace.startsWith("pre")) {
              var ae = function(de, X) {
                return X = X.replace(/[^\u00a0]/g, ""), X.length < 1 && de ? " " : X;
              };
              ie = ie.replace(/\r\n/g, " ").replace(/\n/g, " "), ie = ie.replace(/\s\s+/g, ae.bind(ae, !0)), (K.previousSibling == null && C(K.parentNode) || K.previousSibling != null && C(K.previousSibling)) && (ie = ie.replace(/^\s+/, ae.bind(ae, !1))), (K.nextSibling == null && C(K.parentNode) || K.nextSibling != null && C(K.nextSibling)) && (ie = ie.replace(/\s+$/, ae.bind(ae, !1)));
            }
            return Q.insert(ie);
          }
          n.default = M, n.matchAttributor = Y, n.matchBlot = V, n.matchNewline = ce, n.matchSpacing = he, n.matchText = Oe;
        },
        /* 56 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(g, b) {
              for (var v = 0; v < b.length; v++) {
                var m = b[v];
                m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(g, m.key, m);
              }
            }
            return function(g, b, v) {
              return b && y(g.prototype, b), v && y(g, v), g;
            };
          }(), o = function y(g, b, v) {
            g === null && (g = Function.prototype);
            var m = Object.getOwnPropertyDescriptor(g, b);
            if (m === void 0) {
              var x = Object.getPrototypeOf(g);
              return x === null ? void 0 : y(x, b, v);
            } else {
              if ("value" in m)
                return m.value;
              var p = m.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, s = i(6), l = f(s);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function d(y, g) {
            if (!(y instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, g) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : y;
          }
          function u(y, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            y.prototype = Object.create(g && g.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(y, g) : y.__proto__ = g);
          }
          var h = function(y) {
            u(g, y);
            function g() {
              return d(this, g), c(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments));
            }
            return a(g, [{
              key: "optimize",
              value: function(v) {
                o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "optimize", this).call(this, v), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
              }
            }], [{
              key: "create",
              value: function() {
                return o(g.__proto__ || Object.getPrototypeOf(g), "create", this).call(this);
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), g;
          }(l.default);
          h.blotName = "bold", h.tagName = ["STRONG", "B"], n.default = h;
        },
        /* 57 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.addControls = n.default = void 0;
          var a = function() {
            function O(N, k) {
              var I = [], R = !0, H = !1, U = void 0;
              try {
                for (var G = N[Symbol.iterator](), q; !(R = (q = G.next()).done) && (I.push(q.value), !(k && I.length === k)); R = !0)
                  ;
              } catch (P) {
                H = !0, U = P;
              } finally {
                try {
                  !R && G.return && G.return();
                } finally {
                  if (H)
                    throw U;
                }
              }
              return I;
            }
            return function(N, k) {
              if (Array.isArray(N))
                return N;
              if (Symbol.iterator in Object(N))
                return O(N, k);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function O(N, k) {
              for (var I = 0; I < k.length; I++) {
                var R = k[I];
                R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(N, R.key, R);
              }
            }
            return function(N, k, I) {
              return k && O(N.prototype, k), I && O(N, I), N;
            };
          }(), s = i(2), l = v(s), f = i(0), d = v(f), c = i(5), u = v(c), h = i(10), y = v(h), g = i(9), b = v(g);
          function v(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function m(O, N, k) {
            return N in O ? Object.defineProperty(O, N, { value: k, enumerable: !0, configurable: !0, writable: !0 }) : O[N] = k, O;
          }
          function x(O, N) {
            if (!(O instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function p(O, N) {
            if (!O)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return N && (typeof N == "object" || typeof N == "function") ? N : O;
          }
          function w(O, N) {
            if (typeof N != "function" && N !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof N);
            O.prototype = Object.create(N && N.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(O, N) : O.__proto__ = N);
          }
          var S = (0, y.default)("quill:toolbar"), E = function(O) {
            w(N, O);
            function N(k, I) {
              x(this, N);
              var R = p(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this, k, I));
              if (Array.isArray(R.options.container)) {
                var H = document.createElement("div");
                j(H, R.options.container), k.container.parentNode.insertBefore(H, k.container), R.container = H;
              } else
                typeof R.options.container == "string" ? R.container = document.querySelector(R.options.container) : R.container = R.options.container;
              if (!(R.container instanceof HTMLElement)) {
                var U;
                return U = S.error("Container required for toolbar", R.options), p(R, U);
              }
              return R.container.classList.add("ql-toolbar"), R.controls = [], R.handlers = {}, Object.keys(R.options.handlers).forEach(function(G) {
                R.addHandler(G, R.options.handlers[G]);
              }), [].forEach.call(R.container.querySelectorAll("button, select"), function(G) {
                R.attach(G);
              }), R.quill.on(u.default.events.EDITOR_CHANGE, function(G, q) {
                G === u.default.events.SELECTION_CHANGE && R.update(q);
              }), R.quill.on(u.default.events.SCROLL_OPTIMIZE, function() {
                var G = R.quill.selection.getRange(), q = a(G, 1), P = q[0];
                R.update(P);
              }), R;
            }
            return o(N, [{
              key: "addHandler",
              value: function(I, R) {
                this.handlers[I] = R;
              }
            }, {
              key: "attach",
              value: function(I) {
                var R = this, H = [].find.call(I.classList, function(G) {
                  return G.indexOf("ql-") === 0;
                });
                if (H) {
                  if (H = H.slice(3), I.tagName === "BUTTON" && I.setAttribute("type", "button"), this.handlers[H] == null) {
                    if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[H] == null) {
                      S.warn("ignoring attaching to disabled format", H, I);
                      return;
                    }
                    if (d.default.query(H) == null) {
                      S.warn("ignoring attaching to nonexistent format", H, I);
                      return;
                    }
                  }
                  var U = I.tagName === "SELECT" ? "change" : "click";
                  I.addEventListener(U, function(G) {
                    var q = void 0;
                    if (I.tagName === "SELECT") {
                      if (I.selectedIndex < 0)
                        return;
                      var P = I.options[I.selectedIndex];
                      P.hasAttribute("selected") ? q = !1 : q = P.value || !1;
                    } else
                      I.classList.contains("ql-active") ? q = !1 : q = I.value || !I.hasAttribute("value"), G.preventDefault();
                    R.quill.focus();
                    var T = R.quill.selection.getRange(), M = a(T, 1), D = M[0];
                    if (R.handlers[H] != null)
                      R.handlers[H].call(R, q);
                    else if (d.default.query(H).prototype instanceof d.default.Embed) {
                      if (q = prompt("Enter " + H), !q)
                        return;
                      R.quill.updateContents(new l.default().retain(D.index).delete(D.length).insert(m({}, H, q)), u.default.sources.USER);
                    } else
                      R.quill.format(H, q, u.default.sources.USER);
                    R.update(D);
                  }), this.controls.push([H, I]);
                }
              }
            }, {
              key: "update",
              value: function(I) {
                var R = I == null ? {} : this.quill.getFormat(I);
                this.controls.forEach(function(H) {
                  var U = a(H, 2), G = U[0], q = U[1];
                  if (q.tagName === "SELECT") {
                    var P = void 0;
                    if (I == null)
                      P = null;
                    else if (R[G] == null)
                      P = q.querySelector("option[selected]");
                    else if (!Array.isArray(R[G])) {
                      var T = R[G];
                      typeof T == "string" && (T = T.replace(/\"/g, '\\"')), P = q.querySelector('option[value="' + T + '"]');
                    }
                    P == null ? (q.value = "", q.selectedIndex = -1) : P.selected = !0;
                  } else if (I == null)
                    q.classList.remove("ql-active");
                  else if (q.hasAttribute("value")) {
                    var M = R[G] === q.getAttribute("value") || R[G] != null && R[G].toString() === q.getAttribute("value") || R[G] == null && !q.getAttribute("value");
                    q.classList.toggle("ql-active", M);
                  } else
                    q.classList.toggle("ql-active", R[G] != null);
                });
              }
            }]), N;
          }(b.default);
          E.DEFAULTS = {};
          function A(O, N, k) {
            var I = document.createElement("button");
            I.setAttribute("type", "button"), I.classList.add("ql-" + N), k != null && (I.value = k), O.appendChild(I);
          }
          function j(O, N) {
            Array.isArray(N[0]) || (N = [N]), N.forEach(function(k) {
              var I = document.createElement("span");
              I.classList.add("ql-formats"), k.forEach(function(R) {
                if (typeof R == "string")
                  A(I, R);
                else {
                  var H = Object.keys(R)[0], U = R[H];
                  Array.isArray(U) ? _(I, H, U) : A(I, H, U);
                }
              }), O.appendChild(I);
            });
          }
          function _(O, N, k) {
            var I = document.createElement("select");
            I.classList.add("ql-" + N), k.forEach(function(R) {
              var H = document.createElement("option");
              R !== !1 ? H.setAttribute("value", R) : H.setAttribute("selected", "selected"), I.appendChild(H);
            }), O.appendChild(I);
          }
          E.DEFAULTS = {
            container: null,
            handlers: {
              clean: function() {
                var N = this, k = this.quill.getSelection();
                if (k != null)
                  if (k.length == 0) {
                    var I = this.quill.getFormat();
                    Object.keys(I).forEach(function(R) {
                      d.default.query(R, d.default.Scope.INLINE) != null && N.quill.format(R, !1);
                    });
                  } else
                    this.quill.removeFormat(k, u.default.sources.USER);
              },
              direction: function(N) {
                var k = this.quill.getFormat().align;
                N === "rtl" && k == null ? this.quill.format("align", "right", u.default.sources.USER) : !N && k === "right" && this.quill.format("align", !1, u.default.sources.USER), this.quill.format("direction", N, u.default.sources.USER);
              },
              indent: function(N) {
                var k = this.quill.getSelection(), I = this.quill.getFormat(k), R = parseInt(I.indent || 0);
                if (N === "+1" || N === "-1") {
                  var H = N === "+1" ? 1 : -1;
                  I.direction === "rtl" && (H *= -1), this.quill.format("indent", R + H, u.default.sources.USER);
                }
              },
              link: function(N) {
                N === !0 && (N = prompt("Enter link URL:")), this.quill.format("link", N, u.default.sources.USER);
              },
              list: function(N) {
                var k = this.quill.getSelection(), I = this.quill.getFormat(k);
                N === "check" ? I.list === "checked" || I.list === "unchecked" ? this.quill.format("list", !1, u.default.sources.USER) : this.quill.format("list", "unchecked", u.default.sources.USER) : this.quill.format("list", N, u.default.sources.USER);
              }
            }
          }, n.default = E, n.addControls = j;
        },
        /* 58 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
        },
        /* 59 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(g, b) {
              for (var v = 0; v < b.length; v++) {
                var m = b[v];
                m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(g, m.key, m);
              }
            }
            return function(g, b, v) {
              return b && y(g.prototype, b), v && y(g, v), g;
            };
          }(), o = function y(g, b, v) {
            g === null && (g = Function.prototype);
            var m = Object.getOwnPropertyDescriptor(g, b);
            if (m === void 0) {
              var x = Object.getPrototypeOf(g);
              return x === null ? void 0 : y(x, b, v);
            } else {
              if ("value" in m)
                return m.value;
              var p = m.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, s = i(28), l = f(s);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function d(y, g) {
            if (!(y instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, g) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : y;
          }
          function u(y, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            y.prototype = Object.create(g && g.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(y, g) : y.__proto__ = g);
          }
          var h = function(y) {
            u(g, y);
            function g(b, v) {
              d(this, g);
              var m = c(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, b));
              return m.label.innerHTML = v, m.container.classList.add("ql-color-picker"), [].slice.call(m.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(x) {
                x.classList.add("ql-primary");
              }), m;
            }
            return a(g, [{
              key: "buildItem",
              value: function(v) {
                var m = o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "buildItem", this).call(this, v);
                return m.style.backgroundColor = v.getAttribute("value") || "", m;
              }
            }, {
              key: "selectItem",
              value: function(v, m) {
                o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "selectItem", this).call(this, v, m);
                var x = this.label.querySelector(".ql-color-label"), p = v && v.getAttribute("data-value") || "";
                x && (x.tagName === "line" ? x.style.stroke = p : x.style.fill = p);
              }
            }]), g;
          }(l.default);
          n.default = h;
        },
        /* 60 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(g, b) {
              for (var v = 0; v < b.length; v++) {
                var m = b[v];
                m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(g, m.key, m);
              }
            }
            return function(g, b, v) {
              return b && y(g.prototype, b), v && y(g, v), g;
            };
          }(), o = function y(g, b, v) {
            g === null && (g = Function.prototype);
            var m = Object.getOwnPropertyDescriptor(g, b);
            if (m === void 0) {
              var x = Object.getPrototypeOf(g);
              return x === null ? void 0 : y(x, b, v);
            } else {
              if ("value" in m)
                return m.value;
              var p = m.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, s = i(28), l = f(s);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function d(y, g) {
            if (!(y instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, g) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : y;
          }
          function u(y, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            y.prototype = Object.create(g && g.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(y, g) : y.__proto__ = g);
          }
          var h = function(y) {
            u(g, y);
            function g(b, v) {
              d(this, g);
              var m = c(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, b));
              return m.container.classList.add("ql-icon-picker"), [].forEach.call(m.container.querySelectorAll(".ql-picker-item"), function(x) {
                x.innerHTML = v[x.getAttribute("data-value") || ""];
              }), m.defaultItem = m.container.querySelector(".ql-selected"), m.selectItem(m.defaultItem), m;
            }
            return a(g, [{
              key: "selectItem",
              value: function(v, m) {
                o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "selectItem", this).call(this, v, m), v = v || this.defaultItem, this.label.innerHTML = v.innerHTML;
              }
            }]), g;
          }(l.default);
          n.default = h;
        },
        /* 61 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function l(f, d) {
              for (var c = 0; c < d.length; c++) {
                var u = d[c];
                u.enumerable = u.enumerable || !1, u.configurable = !0, "value" in u && (u.writable = !0), Object.defineProperty(f, u.key, u);
              }
            }
            return function(f, d, c) {
              return d && l(f.prototype, d), c && l(f, c), f;
            };
          }();
          function o(l, f) {
            if (!(l instanceof f))
              throw new TypeError("Cannot call a class as a function");
          }
          var s = function() {
            function l(f, d) {
              var c = this;
              o(this, l), this.quill = f, this.boundsContainer = d || document.body, this.root = f.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
                c.root.style.marginTop = -1 * c.quill.root.scrollTop + "px";
              }), this.hide();
            }
            return a(l, [{
              key: "hide",
              value: function() {
                this.root.classList.add("ql-hidden");
              }
            }, {
              key: "position",
              value: function(d) {
                var c = d.left + d.width / 2 - this.root.offsetWidth / 2, u = d.bottom + this.quill.root.scrollTop;
                this.root.style.left = c + "px", this.root.style.top = u + "px", this.root.classList.remove("ql-flip");
                var h = this.boundsContainer.getBoundingClientRect(), y = this.root.getBoundingClientRect(), g = 0;
                if (y.right > h.right && (g = h.right - y.right, this.root.style.left = c + g + "px"), y.left < h.left && (g = h.left - y.left, this.root.style.left = c + g + "px"), y.bottom > h.bottom) {
                  var b = y.bottom - y.top, v = d.bottom - d.top + b;
                  this.root.style.top = u - v + "px", this.root.classList.add("ql-flip");
                }
                return g;
              }
            }, {
              key: "show",
              value: function() {
                this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
              }
            }]), l;
          }();
          n.default = s;
        },
        /* 62 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function _(O, N) {
              var k = [], I = !0, R = !1, H = void 0;
              try {
                for (var U = O[Symbol.iterator](), G; !(I = (G = U.next()).done) && (k.push(G.value), !(N && k.length === N)); I = !0)
                  ;
              } catch (q) {
                R = !0, H = q;
              } finally {
                try {
                  !I && U.return && U.return();
                } finally {
                  if (R)
                    throw H;
                }
              }
              return k;
            }
            return function(O, N) {
              if (Array.isArray(O))
                return O;
              if (Symbol.iterator in Object(O))
                return _(O, N);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function _(O, N, k) {
            O === null && (O = Function.prototype);
            var I = Object.getOwnPropertyDescriptor(O, N);
            if (I === void 0) {
              var R = Object.getPrototypeOf(O);
              return R === null ? void 0 : _(R, N, k);
            } else {
              if ("value" in I)
                return I.value;
              var H = I.get;
              return H === void 0 ? void 0 : H.call(k);
            }
          }, s = function() {
            function _(O, N) {
              for (var k = 0; k < N.length; k++) {
                var I = N[k];
                I.enumerable = I.enumerable || !1, I.configurable = !0, "value" in I && (I.writable = !0), Object.defineProperty(O, I.key, I);
              }
            }
            return function(O, N, k) {
              return N && _(O.prototype, N), k && _(O, k), O;
            };
          }(), l = i(3), f = x(l), d = i(8), c = x(d), u = i(43), h = x(u), y = i(27), g = x(y), b = i(15), v = i(41), m = x(v);
          function x(_) {
            return _ && _.__esModule ? _ : { default: _ };
          }
          function p(_, O) {
            if (!(_ instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function w(_, O) {
            if (!_)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return O && (typeof O == "object" || typeof O == "function") ? O : _;
          }
          function S(_, O) {
            if (typeof O != "function" && O !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            _.prototype = Object.create(O && O.prototype, { constructor: { value: _, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(_, O) : _.__proto__ = O);
          }
          var E = [[{ header: ["1", "2", "3", !1] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], A = function(_) {
            S(O, _);
            function O(N, k) {
              p(this, O), k.modules.toolbar != null && k.modules.toolbar.container == null && (k.modules.toolbar.container = E);
              var I = w(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, N, k));
              return I.quill.container.classList.add("ql-snow"), I;
            }
            return s(O, [{
              key: "extendToolbar",
              value: function(k) {
                k.container.classList.add("ql-snow"), this.buildButtons([].slice.call(k.container.querySelectorAll("button")), m.default), this.buildPickers([].slice.call(k.container.querySelectorAll("select")), m.default), this.tooltip = new j(this.quill, this.options.bounds), k.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, function(I, R) {
                  k.handlers.link.call(k, !R.format.link);
                });
              }
            }]), O;
          }(h.default);
          A.DEFAULTS = (0, f.default)(!0, {}, h.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(O) {
                    if (O) {
                      var N = this.quill.getSelection();
                      if (N == null || N.length == 0)
                        return;
                      var k = this.quill.getText(N);
                      /^\S+@\S+\.\S+$/.test(k) && k.indexOf("mailto:") !== 0 && (k = "mailto:" + k);
                      var I = this.quill.theme.tooltip;
                      I.edit("link", k);
                    } else
                      this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var j = function(_) {
            S(O, _);
            function O(N, k) {
              p(this, O);
              var I = w(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, N, k));
              return I.preview = I.root.querySelector("a.ql-preview"), I;
            }
            return s(O, [{
              key: "listen",
              value: function() {
                var k = this;
                o(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(I) {
                  k.root.classList.contains("ql-editing") ? k.save() : k.edit("link", k.preview.textContent), I.preventDefault();
                }), this.root.querySelector("a.ql-remove").addEventListener("click", function(I) {
                  if (k.linkRange != null) {
                    var R = k.linkRange;
                    k.restoreFocus(), k.quill.formatText(R, "link", !1, c.default.sources.USER), delete k.linkRange;
                  }
                  I.preventDefault(), k.hide();
                }), this.quill.on(c.default.events.SELECTION_CHANGE, function(I, R, H) {
                  if (I != null) {
                    if (I.length === 0 && H === c.default.sources.USER) {
                      var U = k.quill.scroll.descendant(g.default, I.index), G = a(U, 2), q = G[0], P = G[1];
                      if (q != null) {
                        k.linkRange = new b.Range(I.index - P, q.length());
                        var T = g.default.formats(q.domNode);
                        k.preview.textContent = T, k.preview.setAttribute("href", T), k.show(), k.position(k.quill.getBounds(k.linkRange));
                        return;
                      }
                    } else
                      delete k.linkRange;
                    k.hide();
                  }
                });
              }
            }, {
              key: "show",
              value: function() {
                o(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
              }
            }]), O;
          }(u.BaseTooltip);
          j.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), n.default = A;
        },
        /* 63 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(29), o = J(a), s = i(36), l = i(38), f = i(64), d = i(65), c = J(d), u = i(66), h = J(u), y = i(67), g = J(y), b = i(37), v = i(26), m = i(39), x = i(40), p = i(56), w = J(p), S = i(68), E = J(S), A = i(27), j = J(A), _ = i(69), O = J(_), N = i(70), k = J(N), I = i(71), R = J(I), H = i(72), U = J(H), G = i(73), q = J(G), P = i(13), T = J(P), M = i(74), D = J(M), F = i(75), z = J(F), C = i(57), $ = J(C), W = i(41), Y = J(W), V = i(28), te = J(V), Z = i(59), le = J(Z), ce = i(60), he = J(ce), Ne = i(61), Oe = J(Ne), K = i(108), Q = J(K), ie = i(62), ae = J(ie);
          function J(de) {
            return de && de.__esModule ? de : { default: de };
          }
          o.default.register({
            "attributors/attribute/direction": l.DirectionAttribute,
            "attributors/class/align": s.AlignClass,
            "attributors/class/background": b.BackgroundClass,
            "attributors/class/color": v.ColorClass,
            "attributors/class/direction": l.DirectionClass,
            "attributors/class/font": m.FontClass,
            "attributors/class/size": x.SizeClass,
            "attributors/style/align": s.AlignStyle,
            "attributors/style/background": b.BackgroundStyle,
            "attributors/style/color": v.ColorStyle,
            "attributors/style/direction": l.DirectionStyle,
            "attributors/style/font": m.FontStyle,
            "attributors/style/size": x.SizeStyle
          }, !0), o.default.register({
            "formats/align": s.AlignClass,
            "formats/direction": l.DirectionClass,
            "formats/indent": f.IndentClass,
            "formats/background": b.BackgroundStyle,
            "formats/color": v.ColorStyle,
            "formats/font": m.FontClass,
            "formats/size": x.SizeClass,
            "formats/blockquote": c.default,
            "formats/code-block": T.default,
            "formats/header": h.default,
            "formats/list": g.default,
            "formats/bold": w.default,
            "formats/code": P.Code,
            "formats/italic": E.default,
            "formats/link": j.default,
            "formats/script": O.default,
            "formats/strike": k.default,
            "formats/underline": R.default,
            "formats/image": U.default,
            "formats/video": q.default,
            "formats/list/item": y.ListItem,
            "modules/formula": D.default,
            "modules/syntax": z.default,
            "modules/toolbar": $.default,
            "themes/bubble": Q.default,
            "themes/snow": ae.default,
            "ui/icons": Y.default,
            "ui/picker": te.default,
            "ui/icon-picker": he.default,
            "ui/color-picker": le.default,
            "ui/tooltip": Oe.default
          }, !0), n.default = o.default;
        },
        /* 64 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.IndentClass = void 0;
          var a = function() {
            function g(b, v) {
              for (var m = 0; m < v.length; m++) {
                var x = v[m];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(b, x.key, x);
              }
            }
            return function(b, v, m) {
              return v && g(b.prototype, v), m && g(b, m), b;
            };
          }(), o = function g(b, v, m) {
            b === null && (b = Function.prototype);
            var x = Object.getOwnPropertyDescriptor(b, v);
            if (x === void 0) {
              var p = Object.getPrototypeOf(b);
              return p === null ? void 0 : g(p, v, m);
            } else {
              if ("value" in x)
                return x.value;
              var w = x.get;
              return w === void 0 ? void 0 : w.call(m);
            }
          }, s = i(0), l = f(s);
          function f(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function d(g, b) {
            if (!(g instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(g, b) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return b && (typeof b == "object" || typeof b == "function") ? b : g;
          }
          function u(g, b) {
            if (typeof b != "function" && b !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof b);
            g.prototype = Object.create(b && b.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(g, b) : g.__proto__ = b);
          }
          var h = function(g) {
            u(b, g);
            function b() {
              return d(this, b), c(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments));
            }
            return a(b, [{
              key: "add",
              value: function(m, x) {
                if (x === "+1" || x === "-1") {
                  var p = this.value(m) || 0;
                  x = x === "+1" ? p + 1 : p - 1;
                }
                return x === 0 ? (this.remove(m), !0) : o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "add", this).call(this, m, x);
              }
            }, {
              key: "canAdd",
              value: function(m, x) {
                return o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "canAdd", this).call(this, m, x) || o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "canAdd", this).call(this, m, parseInt(x));
              }
            }, {
              key: "value",
              value: function(m) {
                return parseInt(o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "value", this).call(this, m)) || void 0;
              }
            }]), b;
          }(l.default.Attributor.Class), y = new h("indent", "ql-indent", {
            scope: l.default.Scope.BLOCK,
            whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
          });
          n.IndentClass = y;
        },
        /* 65 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(4), o = s(a);
          function s(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function l(u, h) {
            if (!(u instanceof h))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(u, h) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return h && (typeof h == "object" || typeof h == "function") ? h : u;
          }
          function d(u, h) {
            if (typeof h != "function" && h !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof h);
            u.prototype = Object.create(h && h.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), h && (Object.setPrototypeOf ? Object.setPrototypeOf(u, h) : u.__proto__ = h);
          }
          var c = function(u) {
            d(h, u);
            function h() {
              return l(this, h), f(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));
            }
            return h;
          }(o.default);
          c.blotName = "blockquote", c.tagName = "blockquote", n.default = c;
        },
        /* 66 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function h(y, g) {
              for (var b = 0; b < g.length; b++) {
                var v = g[b];
                v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(y, v.key, v);
              }
            }
            return function(y, g, b) {
              return g && h(y.prototype, g), b && h(y, b), y;
            };
          }(), o = i(4), s = l(o);
          function l(h) {
            return h && h.__esModule ? h : { default: h };
          }
          function f(h, y) {
            if (!(h instanceof y))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(h, y) {
            if (!h)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return y && (typeof y == "object" || typeof y == "function") ? y : h;
          }
          function c(h, y) {
            if (typeof y != "function" && y !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof y);
            h.prototype = Object.create(y && y.prototype, { constructor: { value: h, enumerable: !1, writable: !0, configurable: !0 } }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(h, y) : h.__proto__ = y);
          }
          var u = function(h) {
            c(y, h);
            function y() {
              return f(this, y), d(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments));
            }
            return a(y, null, [{
              key: "formats",
              value: function(b) {
                return this.tagName.indexOf(b.tagName) + 1;
              }
            }]), y;
          }(s.default);
          u.blotName = "header", u.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], n.default = u;
        },
        /* 67 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.ListItem = void 0;
          var a = function() {
            function p(w, S) {
              for (var E = 0; E < S.length; E++) {
                var A = S[E];
                A.enumerable = A.enumerable || !1, A.configurable = !0, "value" in A && (A.writable = !0), Object.defineProperty(w, A.key, A);
              }
            }
            return function(w, S, E) {
              return S && p(w.prototype, S), E && p(w, E), w;
            };
          }(), o = function p(w, S, E) {
            w === null && (w = Function.prototype);
            var A = Object.getOwnPropertyDescriptor(w, S);
            if (A === void 0) {
              var j = Object.getPrototypeOf(w);
              return j === null ? void 0 : p(j, S, E);
            } else {
              if ("value" in A)
                return A.value;
              var _ = A.get;
              return _ === void 0 ? void 0 : _.call(E);
            }
          }, s = i(0), l = h(s), f = i(4), d = h(f), c = i(25), u = h(c);
          function h(p) {
            return p && p.__esModule ? p : { default: p };
          }
          function y(p, w, S) {
            return w in p ? Object.defineProperty(p, w, { value: S, enumerable: !0, configurable: !0, writable: !0 }) : p[w] = S, p;
          }
          function g(p, w) {
            if (!(p instanceof w))
              throw new TypeError("Cannot call a class as a function");
          }
          function b(p, w) {
            if (!p)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return w && (typeof w == "object" || typeof w == "function") ? w : p;
          }
          function v(p, w) {
            if (typeof w != "function" && w !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof w);
            p.prototype = Object.create(w && w.prototype, { constructor: { value: p, enumerable: !1, writable: !0, configurable: !0 } }), w && (Object.setPrototypeOf ? Object.setPrototypeOf(p, w) : p.__proto__ = w);
          }
          var m = function(p) {
            v(w, p);
            function w() {
              return g(this, w), b(this, (w.__proto__ || Object.getPrototypeOf(w)).apply(this, arguments));
            }
            return a(w, [{
              key: "format",
              value: function(E, A) {
                E === x.blotName && !A ? this.replaceWith(l.default.create(this.statics.scope)) : o(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "format", this).call(this, E, A);
              }
            }, {
              key: "remove",
              value: function() {
                this.prev == null && this.next == null ? this.parent.remove() : o(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "remove", this).call(this);
              }
            }, {
              key: "replaceWith",
              value: function(E, A) {
                return this.parent.isolate(this.offset(this.parent), this.length()), E === this.parent.statics.blotName ? (this.parent.replaceWith(E, A), this) : (this.parent.unwrap(), o(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "replaceWith", this).call(this, E, A));
              }
            }], [{
              key: "formats",
              value: function(E) {
                return E.tagName === this.tagName ? void 0 : o(w.__proto__ || Object.getPrototypeOf(w), "formats", this).call(this, E);
              }
            }]), w;
          }(d.default);
          m.blotName = "list-item", m.tagName = "LI";
          var x = function(p) {
            v(w, p), a(w, null, [{
              key: "create",
              value: function(E) {
                var A = E === "ordered" ? "OL" : "UL", j = o(w.__proto__ || Object.getPrototypeOf(w), "create", this).call(this, A);
                return (E === "checked" || E === "unchecked") && j.setAttribute("data-checked", E === "checked"), j;
              }
            }, {
              key: "formats",
              value: function(E) {
                if (E.tagName === "OL")
                  return "ordered";
                if (E.tagName === "UL")
                  return E.hasAttribute("data-checked") ? E.getAttribute("data-checked") === "true" ? "checked" : "unchecked" : "bullet";
              }
            }]);
            function w(S) {
              g(this, w);
              var E = b(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this, S)), A = function(_) {
                if (_.target.parentNode === S) {
                  var O = E.statics.formats(S), N = l.default.find(_.target);
                  O === "checked" ? N.format("list", "unchecked") : O === "unchecked" && N.format("list", "checked");
                }
              };
              return S.addEventListener("touchstart", A), S.addEventListener("mousedown", A), E;
            }
            return a(w, [{
              key: "format",
              value: function(E, A) {
                this.children.length > 0 && this.children.tail.format(E, A);
              }
            }, {
              key: "formats",
              value: function() {
                return y({}, this.statics.blotName, this.statics.formats(this.domNode));
              }
            }, {
              key: "insertBefore",
              value: function(E, A) {
                if (E instanceof m)
                  o(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "insertBefore", this).call(this, E, A);
                else {
                  var j = A == null ? this.length() : A.offset(this), _ = this.split(j);
                  _.parent.insertBefore(E, _);
                }
              }
            }, {
              key: "optimize",
              value: function(E) {
                o(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "optimize", this).call(this, E);
                var A = this.next;
                A != null && A.prev === this && A.statics.blotName === this.statics.blotName && A.domNode.tagName === this.domNode.tagName && A.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (A.moveChildren(this), A.remove());
              }
            }, {
              key: "replace",
              value: function(E) {
                if (E.statics.blotName !== this.statics.blotName) {
                  var A = l.default.create(this.statics.defaultChild);
                  E.moveChildren(A), this.appendChild(A);
                }
                o(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "replace", this).call(this, E);
              }
            }]), w;
          }(u.default);
          x.blotName = "list", x.scope = l.default.Scope.BLOCK_BLOT, x.tagName = ["OL", "UL"], x.defaultChild = "list-item", x.allowedChildren = [m], n.ListItem = m, n.default = x;
        },
        /* 68 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(56), o = s(a);
          function s(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function l(u, h) {
            if (!(u instanceof h))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(u, h) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return h && (typeof h == "object" || typeof h == "function") ? h : u;
          }
          function d(u, h) {
            if (typeof h != "function" && h !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof h);
            u.prototype = Object.create(h && h.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), h && (Object.setPrototypeOf ? Object.setPrototypeOf(u, h) : u.__proto__ = h);
          }
          var c = function(u) {
            d(h, u);
            function h() {
              return l(this, h), f(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));
            }
            return h;
          }(o.default);
          c.blotName = "italic", c.tagName = ["EM", "I"], n.default = c;
        },
        /* 69 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(g, b) {
              for (var v = 0; v < b.length; v++) {
                var m = b[v];
                m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), Object.defineProperty(g, m.key, m);
              }
            }
            return function(g, b, v) {
              return b && y(g.prototype, b), v && y(g, v), g;
            };
          }(), o = function y(g, b, v) {
            g === null && (g = Function.prototype);
            var m = Object.getOwnPropertyDescriptor(g, b);
            if (m === void 0) {
              var x = Object.getPrototypeOf(g);
              return x === null ? void 0 : y(x, b, v);
            } else {
              if ("value" in m)
                return m.value;
              var p = m.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, s = i(6), l = f(s);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function d(y, g) {
            if (!(y instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, g) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : y;
          }
          function u(y, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            y.prototype = Object.create(g && g.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(y, g) : y.__proto__ = g);
          }
          var h = function(y) {
            u(g, y);
            function g() {
              return d(this, g), c(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments));
            }
            return a(g, null, [{
              key: "create",
              value: function(v) {
                return v === "super" ? document.createElement("sup") : v === "sub" ? document.createElement("sub") : o(g.__proto__ || Object.getPrototypeOf(g), "create", this).call(this, v);
              }
            }, {
              key: "formats",
              value: function(v) {
                if (v.tagName === "SUB")
                  return "sub";
                if (v.tagName === "SUP")
                  return "super";
              }
            }]), g;
          }(l.default);
          h.blotName = "script", h.tagName = ["SUB", "SUP"], n.default = h;
        },
        /* 70 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(6), o = s(a);
          function s(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function l(u, h) {
            if (!(u instanceof h))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(u, h) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return h && (typeof h == "object" || typeof h == "function") ? h : u;
          }
          function d(u, h) {
            if (typeof h != "function" && h !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof h);
            u.prototype = Object.create(h && h.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), h && (Object.setPrototypeOf ? Object.setPrototypeOf(u, h) : u.__proto__ = h);
          }
          var c = function(u) {
            d(h, u);
            function h() {
              return l(this, h), f(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));
            }
            return h;
          }(o.default);
          c.blotName = "strike", c.tagName = "S", n.default = c;
        },
        /* 71 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = i(6), o = s(a);
          function s(u) {
            return u && u.__esModule ? u : { default: u };
          }
          function l(u, h) {
            if (!(u instanceof h))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(u, h) {
            if (!u)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return h && (typeof h == "object" || typeof h == "function") ? h : u;
          }
          function d(u, h) {
            if (typeof h != "function" && h !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof h);
            u.prototype = Object.create(h && h.prototype, { constructor: { value: u, enumerable: !1, writable: !0, configurable: !0 } }), h && (Object.setPrototypeOf ? Object.setPrototypeOf(u, h) : u.__proto__ = h);
          }
          var c = function(u) {
            d(h, u);
            function h() {
              return l(this, h), f(this, (h.__proto__ || Object.getPrototypeOf(h)).apply(this, arguments));
            }
            return h;
          }(o.default);
          c.blotName = "underline", c.tagName = "U", n.default = c;
        },
        /* 72 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function b(v, m) {
              for (var x = 0; x < m.length; x++) {
                var p = m[x];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, m, x) {
              return m && b(v.prototype, m), x && b(v, x), v;
            };
          }(), o = function b(v, m, x) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, m);
            if (p === void 0) {
              var w = Object.getPrototypeOf(v);
              return w === null ? void 0 : b(w, m, x);
            } else {
              if ("value" in p)
                return p.value;
              var S = p.get;
              return S === void 0 ? void 0 : S.call(x);
            }
          }, s = i(0), l = d(s), f = i(27);
          function d(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function c(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function u(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function h(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var y = ["alt", "height", "width"], g = function(b) {
            h(v, b);
            function v() {
              return c(this, v), u(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "format",
              value: function(x, p) {
                y.indexOf(x) > -1 ? p ? this.domNode.setAttribute(x, p) : this.domNode.removeAttribute(x) : o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "format", this).call(this, x, p);
              }
            }], [{
              key: "create",
              value: function(x) {
                var p = o(v.__proto__ || Object.getPrototypeOf(v), "create", this).call(this, x);
                return typeof x == "string" && p.setAttribute("src", this.sanitize(x)), p;
              }
            }, {
              key: "formats",
              value: function(x) {
                return y.reduce(function(p, w) {
                  return x.hasAttribute(w) && (p[w] = x.getAttribute(w)), p;
                }, {});
              }
            }, {
              key: "match",
              value: function(x) {
                return /\.(jpe?g|gif|png)$/.test(x) || /^data:image\/.+;base64/.test(x);
              }
            }, {
              key: "sanitize",
              value: function(x) {
                return (0, f.sanitize)(x, ["http", "https", "data"]) ? x : "//:0";
              }
            }, {
              key: "value",
              value: function(x) {
                return x.getAttribute("src");
              }
            }]), v;
          }(l.default.Embed);
          g.blotName = "image", g.tagName = "IMG", n.default = g;
        },
        /* 73 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          });
          var a = function() {
            function b(v, m) {
              for (var x = 0; x < m.length; x++) {
                var p = m[x];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, m, x) {
              return m && b(v.prototype, m), x && b(v, x), v;
            };
          }(), o = function b(v, m, x) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, m);
            if (p === void 0) {
              var w = Object.getPrototypeOf(v);
              return w === null ? void 0 : b(w, m, x);
            } else {
              if ("value" in p)
                return p.value;
              var S = p.get;
              return S === void 0 ? void 0 : S.call(x);
            }
          }, s = i(4), l = i(27), f = d(l);
          function d(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function c(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function u(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function h(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var y = ["height", "width"], g = function(b) {
            h(v, b);
            function v() {
              return c(this, v), u(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "format",
              value: function(x, p) {
                y.indexOf(x) > -1 ? p ? this.domNode.setAttribute(x, p) : this.domNode.removeAttribute(x) : o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "format", this).call(this, x, p);
              }
            }], [{
              key: "create",
              value: function(x) {
                var p = o(v.__proto__ || Object.getPrototypeOf(v), "create", this).call(this, x);
                return p.setAttribute("frameborder", "0"), p.setAttribute("allowfullscreen", !0), p.setAttribute("src", this.sanitize(x)), p;
              }
            }, {
              key: "formats",
              value: function(x) {
                return y.reduce(function(p, w) {
                  return x.hasAttribute(w) && (p[w] = x.getAttribute(w)), p;
                }, {});
              }
            }, {
              key: "sanitize",
              value: function(x) {
                return f.default.sanitize(x);
              }
            }, {
              key: "value",
              value: function(x) {
                return x.getAttribute("src");
              }
            }]), v;
          }(s.BlockEmbed);
          g.blotName = "video", g.className = "ql-video", g.tagName = "IFRAME", n.default = g;
        },
        /* 74 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.FormulaBlot = void 0;
          var a = function() {
            function x(p, w) {
              for (var S = 0; S < w.length; S++) {
                var E = w[S];
                E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(p, E.key, E);
              }
            }
            return function(p, w, S) {
              return w && x(p.prototype, w), S && x(p, S), p;
            };
          }(), o = function x(p, w, S) {
            p === null && (p = Function.prototype);
            var E = Object.getOwnPropertyDescriptor(p, w);
            if (E === void 0) {
              var A = Object.getPrototypeOf(p);
              return A === null ? void 0 : x(A, w, S);
            } else {
              if ("value" in E)
                return E.value;
              var j = E.get;
              return j === void 0 ? void 0 : j.call(S);
            }
          }, s = i(35), l = h(s), f = i(5), d = h(f), c = i(9), u = h(c);
          function h(x) {
            return x && x.__esModule ? x : { default: x };
          }
          function y(x, p) {
            if (!(x instanceof p))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(x, p) {
            if (!x)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return p && (typeof p == "object" || typeof p == "function") ? p : x;
          }
          function b(x, p) {
            if (typeof p != "function" && p !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof p);
            x.prototype = Object.create(p && p.prototype, { constructor: { value: x, enumerable: !1, writable: !0, configurable: !0 } }), p && (Object.setPrototypeOf ? Object.setPrototypeOf(x, p) : x.__proto__ = p);
          }
          var v = function(x) {
            b(p, x);
            function p() {
              return y(this, p), g(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));
            }
            return a(p, null, [{
              key: "create",
              value: function(S) {
                var E = o(p.__proto__ || Object.getPrototypeOf(p), "create", this).call(this, S);
                return typeof S == "string" && (window.katex.render(S, E, {
                  throwOnError: !1,
                  errorColor: "#f00"
                }), E.setAttribute("data-value", S)), E;
              }
            }, {
              key: "value",
              value: function(S) {
                return S.getAttribute("data-value");
              }
            }]), p;
          }(l.default);
          v.blotName = "formula", v.className = "ql-formula", v.tagName = "SPAN";
          var m = function(x) {
            b(p, x), a(p, null, [{
              key: "register",
              value: function() {
                d.default.register(v, !0);
              }
            }]);
            function p() {
              y(this, p);
              var w = g(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this));
              if (window.katex == null)
                throw new Error("Formula module requires KaTeX.");
              return w;
            }
            return p;
          }(u.default);
          n.FormulaBlot = v, n.default = m;
        },
        /* 75 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.CodeToken = n.CodeBlock = void 0;
          var a = function() {
            function S(E, A) {
              for (var j = 0; j < A.length; j++) {
                var _ = A[j];
                _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(E, _.key, _);
              }
            }
            return function(E, A, j) {
              return A && S(E.prototype, A), j && S(E, j), E;
            };
          }(), o = function S(E, A, j) {
            E === null && (E = Function.prototype);
            var _ = Object.getOwnPropertyDescriptor(E, A);
            if (_ === void 0) {
              var O = Object.getPrototypeOf(E);
              return O === null ? void 0 : S(O, A, j);
            } else {
              if ("value" in _)
                return _.value;
              var N = _.get;
              return N === void 0 ? void 0 : N.call(j);
            }
          }, s = i(0), l = g(s), f = i(5), d = g(f), c = i(9), u = g(c), h = i(13), y = g(h);
          function g(S) {
            return S && S.__esModule ? S : { default: S };
          }
          function b(S, E) {
            if (!(S instanceof E))
              throw new TypeError("Cannot call a class as a function");
          }
          function v(S, E) {
            if (!S)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return E && (typeof E == "object" || typeof E == "function") ? E : S;
          }
          function m(S, E) {
            if (typeof E != "function" && E !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof E);
            S.prototype = Object.create(E && E.prototype, { constructor: { value: S, enumerable: !1, writable: !0, configurable: !0 } }), E && (Object.setPrototypeOf ? Object.setPrototypeOf(S, E) : S.__proto__ = E);
          }
          var x = function(S) {
            m(E, S);
            function E() {
              return b(this, E), v(this, (E.__proto__ || Object.getPrototypeOf(E)).apply(this, arguments));
            }
            return a(E, [{
              key: "replaceWith",
              value: function(j) {
                this.domNode.textContent = this.domNode.textContent, this.attach(), o(E.prototype.__proto__ || Object.getPrototypeOf(E.prototype), "replaceWith", this).call(this, j);
              }
            }, {
              key: "highlight",
              value: function(j) {
                var _ = this.domNode.textContent;
                this.cachedText !== _ && ((_.trim().length > 0 || this.cachedText == null) && (this.domNode.innerHTML = j(_), this.domNode.normalize(), this.attach()), this.cachedText = _);
              }
            }]), E;
          }(y.default);
          x.className = "ql-syntax";
          var p = new l.default.Attributor.Class("token", "hljs", {
            scope: l.default.Scope.INLINE
          }), w = function(S) {
            m(E, S), a(E, null, [{
              key: "register",
              value: function() {
                d.default.register(p, !0), d.default.register(x, !0);
              }
            }]);
            function E(A, j) {
              b(this, E);
              var _ = v(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, A, j));
              if (typeof _.options.highlight != "function")
                throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
              var O = null;
              return _.quill.on(d.default.events.SCROLL_OPTIMIZE, function() {
                clearTimeout(O), O = setTimeout(function() {
                  _.highlight(), O = null;
                }, _.options.interval);
              }), _.highlight(), _;
            }
            return a(E, [{
              key: "highlight",
              value: function() {
                var j = this;
                if (!this.quill.selection.composing) {
                  this.quill.update(d.default.sources.USER);
                  var _ = this.quill.getSelection();
                  this.quill.scroll.descendants(x).forEach(function(O) {
                    O.highlight(j.options.highlight);
                  }), this.quill.update(d.default.sources.SILENT), _ != null && this.quill.setSelection(_, d.default.sources.SILENT);
                }
              }
            }]), E;
          }(u.default);
          w.DEFAULTS = {
            highlight: function() {
              return window.hljs == null ? null : function(S) {
                var E = window.hljs.highlightAuto(S);
                return E.value;
              };
            }(),
            interval: 1e3
          }, n.CodeBlock = x, n.CodeToken = p, n.default = w;
        },
        /* 76 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 77 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
        },
        /* 78 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 79 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
        },
        /* 80 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
        },
        /* 81 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
        },
        /* 82 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
        },
        /* 83 */
        /***/
        function(r, n) {
          r.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
        },
        /* 84 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
        },
        /* 85 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
        },
        /* 86 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
        },
        /* 87 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 88 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 89 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 90 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
        },
        /* 91 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
        },
        /* 92 */
        /***/
        function(r, n) {
          r.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
        },
        /* 93 */
        /***/
        function(r, n) {
          r.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
        },
        /* 94 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
        },
        /* 95 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
        },
        /* 96 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
        },
        /* 97 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
        },
        /* 98 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
        },
        /* 99 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
        },
        /* 100 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
        },
        /* 101 */
        /***/
        function(r, n) {
          r.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
        },
        /* 102 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
        },
        /* 103 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
        },
        /* 104 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
        },
        /* 105 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
        },
        /* 106 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
        },
        /* 107 */
        /***/
        function(r, n) {
          r.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
        },
        /* 108 */
        /***/
        function(r, n, i) {
          Object.defineProperty(n, "__esModule", {
            value: !0
          }), n.default = n.BubbleTooltip = void 0;
          var a = function E(A, j, _) {
            A === null && (A = Function.prototype);
            var O = Object.getOwnPropertyDescriptor(A, j);
            if (O === void 0) {
              var N = Object.getPrototypeOf(A);
              return N === null ? void 0 : E(N, j, _);
            } else {
              if ("value" in O)
                return O.value;
              var k = O.get;
              return k === void 0 ? void 0 : k.call(_);
            }
          }, o = function() {
            function E(A, j) {
              for (var _ = 0; _ < j.length; _++) {
                var O = j[_];
                O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(A, O.key, O);
              }
            }
            return function(A, j, _) {
              return j && E(A.prototype, j), _ && E(A, _), A;
            };
          }(), s = i(3), l = b(s), f = i(8), d = b(f), c = i(43), u = b(c), h = i(15), y = i(41), g = b(y);
          function b(E) {
            return E && E.__esModule ? E : { default: E };
          }
          function v(E, A) {
            if (!(E instanceof A))
              throw new TypeError("Cannot call a class as a function");
          }
          function m(E, A) {
            if (!E)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return A && (typeof A == "object" || typeof A == "function") ? A : E;
          }
          function x(E, A) {
            if (typeof A != "function" && A !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof A);
            E.prototype = Object.create(A && A.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), A && (Object.setPrototypeOf ? Object.setPrototypeOf(E, A) : E.__proto__ = A);
          }
          var p = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], w = function(E) {
            x(A, E);
            function A(j, _) {
              v(this, A), _.modules.toolbar != null && _.modules.toolbar.container == null && (_.modules.toolbar.container = p);
              var O = m(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, j, _));
              return O.quill.container.classList.add("ql-bubble"), O;
            }
            return o(A, [{
              key: "extendToolbar",
              value: function(_) {
                this.tooltip = new S(this.quill, this.options.bounds), this.tooltip.root.appendChild(_.container), this.buildButtons([].slice.call(_.container.querySelectorAll("button")), g.default), this.buildPickers([].slice.call(_.container.querySelectorAll("select")), g.default);
              }
            }]), A;
          }(u.default);
          w.DEFAULTS = (0, l.default)(!0, {}, u.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(A) {
                    A ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var S = function(E) {
            x(A, E);
            function A(j, _) {
              v(this, A);
              var O = m(this, (A.__proto__ || Object.getPrototypeOf(A)).call(this, j, _));
              return O.quill.on(d.default.events.EDITOR_CHANGE, function(N, k, I, R) {
                if (N === d.default.events.SELECTION_CHANGE)
                  if (k != null && k.length > 0 && R === d.default.sources.USER) {
                    O.show(), O.root.style.left = "0px", O.root.style.width = "", O.root.style.width = O.root.offsetWidth + "px";
                    var H = O.quill.getLines(k.index, k.length);
                    if (H.length === 1)
                      O.position(O.quill.getBounds(k));
                    else {
                      var U = H[H.length - 1], G = O.quill.getIndex(U), q = Math.min(U.length() - 1, k.index + k.length - G), P = O.quill.getBounds(new h.Range(G, q));
                      O.position(P);
                    }
                  } else
                    document.activeElement !== O.textbox && O.quill.hasFocus() && O.hide();
              }), O;
            }
            return o(A, [{
              key: "listen",
              value: function() {
                var _ = this;
                a(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                  _.root.classList.remove("ql-editing");
                }), this.quill.on(d.default.events.SCROLL_OPTIMIZE, function() {
                  setTimeout(function() {
                    if (!_.root.classList.contains("ql-hidden")) {
                      var O = _.quill.getSelection();
                      O != null && _.position(_.quill.getBounds(O));
                    }
                  }, 1);
                });
              }
            }, {
              key: "cancel",
              value: function() {
                this.show();
              }
            }, {
              key: "position",
              value: function(_) {
                var O = a(A.prototype.__proto__ || Object.getPrototypeOf(A.prototype), "position", this).call(this, _), N = this.root.querySelector(".ql-tooltip-arrow");
                if (N.style.marginLeft = "", O === 0)
                  return O;
                N.style.marginLeft = -1 * O - N.offsetWidth / 2 + "px";
              }
            }]), A;
          }(c.BaseTooltip);
          S.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), n.BubbleTooltip = S, n.default = w;
        },
        /* 109 */
        /***/
        function(r, n, i) {
          r.exports = i(63);
        }
        /******/
      ]).default
    );
  });
})(mh);
var k4 = mh.exports, j4 = rt && rt.__extends || function() {
  var e = function(t, r) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, i) {
      n.__proto__ = i;
    } || function(n, i) {
      for (var a in i)
        i.hasOwnProperty(a) && (n[a] = i[a]);
    }, e(t, r);
  };
  return function(t, r) {
    e(t, r);
    function n() {
      this.constructor = t;
    }
    t.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n());
  };
}(), ji = rt && rt.__assign || function() {
  return ji = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, ji.apply(this, arguments);
}, P4 = rt && rt.__spreadArrays || function() {
  for (var e = 0, t = 0, r = arguments.length; t < r; t++)
    e += arguments[t].length;
  for (var n = Array(e), i = 0, t = 0; t < r; t++)
    for (var a = arguments[t], o = 0, s = a.length; o < s; o++, i++)
      n[i] = a[o];
  return n;
}, ia = rt && rt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, vt = ia(Ce), C4 = ia(Di), Zr = ia(A4), Pc = ia(k4), I4 = (
  /** @class */
  function(e) {
    j4(t, e);
    function t(r) {
      var n = e.call(this, r) || this;
      n.dirtyProps = [
        "modules",
        "formats",
        "bounds",
        "theme",
        "children"
      ], n.cleanProps = [
        "id",
        "className",
        "style",
        "placeholder",
        "tabIndex",
        "onChange",
        "onChangeSelection",
        "onFocus",
        "onBlur",
        "onKeyPress",
        "onKeyDown",
        "onKeyUp"
      ], n.state = {
        generation: 0
      }, n.selection = null, n.onEditorChange = function(a, o, s, l) {
        var f, d, c, u;
        a === "text-change" ? (d = (f = n).onEditorChangeText) === null || d === void 0 || d.call(f, n.editor.root.innerHTML, o, l, n.unprivilegedEditor) : a === "selection-change" && ((u = (c = n).onEditorChangeSelection) === null || u === void 0 || u.call(c, o, l, n.unprivilegedEditor));
      };
      var i = n.isControlled() ? r.value : r.defaultValue;
      return n.value = i ?? "", n;
    }
    return t.prototype.validateProps = function(r) {
      var n;
      if (vt.default.Children.count(r.children) > 1)
        throw new Error("The Quill editing area can only be composed of a single React element.");
      if (vt.default.Children.count(r.children)) {
        var i = vt.default.Children.only(r.children);
        if (((n = i) === null || n === void 0 ? void 0 : n.type) === "textarea")
          throw new Error("Quill does not support editing on a <textarea>. Use a <div> instead.");
      }
      if (this.lastDeltaChangeSet && r.value === this.lastDeltaChangeSet)
        throw new Error("You are passing the `delta` object from the `onChange` event back as `value`. You most probably want `editor.getContents()` instead. See: https://github.com/zenoamaro/react-quill#using-deltas");
    }, t.prototype.shouldComponentUpdate = function(r, n) {
      var i = this, a;
      if (this.validateProps(r), !this.editor || this.state.generation !== n.generation)
        return !0;
      if ("value" in r) {
        var o = this.getEditorContents(), s = (a = r.value, a ?? "");
        this.isEqualValue(s, o) || this.setEditorContents(this.editor, s);
      }
      return r.readOnly !== this.props.readOnly && this.setEditorReadOnly(this.editor, r.readOnly), P4(this.cleanProps, this.dirtyProps).some(function(l) {
        return !Zr.default(r[l], i.props[l]);
      });
    }, t.prototype.shouldComponentRegenerate = function(r) {
      var n = this;
      return this.dirtyProps.some(function(i) {
        return !Zr.default(r[i], n.props[i]);
      });
    }, t.prototype.componentDidMount = function() {
      this.instantiateEditor(), this.setEditorContents(this.editor, this.getEditorContents());
    }, t.prototype.componentWillUnmount = function() {
      this.destroyEditor();
    }, t.prototype.componentDidUpdate = function(r, n) {
      var i = this;
      if (this.editor && this.shouldComponentRegenerate(r)) {
        var a = this.editor.getContents(), o = this.editor.getSelection();
        this.regenerationSnapshot = { delta: a, selection: o }, this.setState({ generation: this.state.generation + 1 }), this.destroyEditor();
      }
      if (this.state.generation !== n.generation) {
        var s = this.regenerationSnapshot, a = s.delta, l = s.selection;
        delete this.regenerationSnapshot, this.instantiateEditor();
        var f = this.editor;
        f.setContents(a), Cc(function() {
          return i.setEditorSelection(f, l);
        });
      }
    }, t.prototype.instantiateEditor = function() {
      this.editor ? this.hookEditor(this.editor) : this.editor = this.createEditor(this.getEditingArea(), this.getEditorConfig());
    }, t.prototype.destroyEditor = function() {
      this.editor && this.unhookEditor(this.editor);
    }, t.prototype.isControlled = function() {
      return "value" in this.props;
    }, t.prototype.getEditorConfig = function() {
      return {
        bounds: this.props.bounds,
        formats: this.props.formats,
        modules: this.props.modules,
        placeholder: this.props.placeholder,
        readOnly: this.props.readOnly,
        scrollingContainer: this.props.scrollingContainer,
        tabIndex: this.props.tabIndex,
        theme: this.props.theme
      };
    }, t.prototype.getEditor = function() {
      if (!this.editor)
        throw new Error("Accessing non-instantiated editor");
      return this.editor;
    }, t.prototype.createEditor = function(r, n) {
      var i = new Pc.default(r, n);
      return n.tabIndex != null && this.setEditorTabIndex(i, n.tabIndex), this.hookEditor(i), i;
    }, t.prototype.hookEditor = function(r) {
      this.unprivilegedEditor = this.makeUnprivilegedEditor(r), r.on("editor-change", this.onEditorChange);
    }, t.prototype.unhookEditor = function(r) {
      r.off("editor-change", this.onEditorChange);
    }, t.prototype.getEditorContents = function() {
      return this.value;
    }, t.prototype.getEditorSelection = function() {
      return this.selection;
    }, t.prototype.isDelta = function(r) {
      return r && r.ops;
    }, t.prototype.isEqualValue = function(r, n) {
      return this.isDelta(r) && this.isDelta(n) ? Zr.default(r.ops, n.ops) : Zr.default(r, n);
    }, t.prototype.setEditorContents = function(r, n) {
      var i = this;
      this.value = n;
      var a = this.getEditorSelection();
      typeof n == "string" ? r.setContents(r.clipboard.convert(n)) : r.setContents(n), Cc(function() {
        return i.setEditorSelection(r, a);
      });
    }, t.prototype.setEditorSelection = function(r, n) {
      if (this.selection = n, n) {
        var i = r.getLength();
        n.index = Math.max(0, Math.min(n.index, i - 1)), n.length = Math.max(0, Math.min(n.length, i - 1 - n.index)), r.setSelection(n);
      }
    }, t.prototype.setEditorTabIndex = function(r, n) {
      var i, a;
      !((a = (i = r) === null || i === void 0 ? void 0 : i.scroll) === null || a === void 0) && a.domNode && (r.scroll.domNode.tabIndex = n);
    }, t.prototype.setEditorReadOnly = function(r, n) {
      n ? r.disable() : r.enable();
    }, t.prototype.makeUnprivilegedEditor = function(r) {
      var n = r;
      return {
        getHTML: function() {
          return n.root.innerHTML;
        },
        getLength: n.getLength.bind(n),
        getText: n.getText.bind(n),
        getContents: n.getContents.bind(n),
        getSelection: n.getSelection.bind(n),
        getBounds: n.getBounds.bind(n)
      };
    }, t.prototype.getEditingArea = function() {
      if (!this.editingArea)
        throw new Error("Instantiating on missing editing area");
      var r = C4.default.findDOMNode(this.editingArea);
      if (!r)
        throw new Error("Cannot find element for editing area");
      if (r.nodeType === 3)
        throw new Error("Editing area cannot be a text node");
      return r;
    }, t.prototype.renderEditingArea = function() {
      var r = this, n = this.props, i = n.children, a = n.preserveWhitespace, o = this.state.generation, s = {
        key: o,
        ref: function(l) {
          r.editingArea = l;
        }
      };
      return vt.default.Children.count(i) ? vt.default.cloneElement(vt.default.Children.only(i), s) : a ? vt.default.createElement("pre", ji({}, s)) : vt.default.createElement("div", ji({}, s));
    }, t.prototype.render = function() {
      var r;
      return vt.default.createElement("div", { id: this.props.id, style: this.props.style, key: this.state.generation, className: "quill " + (r = this.props.className, r ?? ""), onKeyPress: this.props.onKeyPress, onKeyDown: this.props.onKeyDown, onKeyUp: this.props.onKeyUp }, this.renderEditingArea());
    }, t.prototype.onEditorChangeText = function(r, n, i, a) {
      var o, s;
      if (this.editor) {
        var l = this.isDelta(this.value) ? a.getContents() : a.getHTML();
        l !== this.getEditorContents() && (this.lastDeltaChangeSet = n, this.value = l, (s = (o = this.props).onChange) === null || s === void 0 || s.call(o, r, n, i, a));
      }
    }, t.prototype.onEditorChangeSelection = function(r, n, i) {
      var a, o, s, l, f, d;
      if (this.editor) {
        var c = this.getEditorSelection(), u = !c && r, h = c && !r;
        Zr.default(r, c) || (this.selection = r, (o = (a = this.props).onChangeSelection) === null || o === void 0 || o.call(a, r, n, i), u ? (l = (s = this.props).onFocus) === null || l === void 0 || l.call(s, r, n, i) : h && ((d = (f = this.props).onBlur) === null || d === void 0 || d.call(f, c, n, i)));
      }
    }, t.prototype.focus = function() {
      this.editor && this.editor.focus();
    }, t.prototype.blur = function() {
      this.editor && (this.selection = null, this.editor.blur());
    }, t.displayName = "React Quill", t.Quill = Pc.default, t.defaultProps = {
      theme: "snow",
      modules: {},
      readOnly: !1
    }, t;
  }(vt.default.Component)
);
function Cc(e) {
  Promise.resolve().then(e);
}
var L4 = I4;
const M4 = /* @__PURE__ */ Tf(L4), D4 = [
  "header",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "list",
  "bullet",
  "indent",
  "link",
  "color"
], R4 = ({ toolbarClassName: e }) => /* @__PURE__ */ L.jsxs("div", { id: "toolbar", className: e, children: [
  /* @__PURE__ */ L.jsx("span", { className: "ql-formats", children: /* @__PURE__ */ L.jsxs("select", { className: "ql-header", defaultValue: "3", children: [
    /* @__PURE__ */ L.jsx("option", { value: "1", children: "Heading" }),
    /* @__PURE__ */ L.jsx("option", { value: "2", children: "Subheading" }),
    /* @__PURE__ */ L.jsx("option", { value: "3", children: "Normal" })
  ] }) }),
  /* @__PURE__ */ L.jsxs("span", { className: "ql-formats", children: [
    /* @__PURE__ */ L.jsx("button", { className: "ql-bold" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-italic" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-underline" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-strike" })
  ] }),
  /* @__PURE__ */ L.jsxs("span", { className: "ql-formats", children: [
    /* @__PURE__ */ L.jsx("button", { className: "ql-list", value: "ordered" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-list", value: "bullet" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-indent", value: "-1" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-indent", value: "+1" })
  ] }),
  /* @__PURE__ */ L.jsxs("span", { className: "ql-formats", children: [
    /* @__PURE__ */ L.jsx("select", { className: "ql-align" }),
    /* @__PURE__ */ L.jsx("select", { className: "ql-color" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-link" }),
    /* @__PURE__ */ L.jsx("button", { className: "ql-clean" })
  ] })
] }), NA = ({
  label: e,
  id: t,
  value: r,
  onChange: n,
  placeholder: i,
  disabled: a,
  reference: o,
  error: s,
  className: l,
  toolbarClassName: f = ""
}) => {
  const d = (c, u) => {
    n && c === "user" && n(u.getHTML());
  };
  return /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    e && /* @__PURE__ */ L.jsx("label", { htmlFor: t, className: "block mb-1 text-left text-xs font-medium", children: e }),
    /* @__PURE__ */ L.jsx(R4, { toolbarClassName: f }),
    /* @__PURE__ */ L.jsx(
      M4,
      {
        modules: { toolbar: `.${f}` },
        ref: o,
        id: t,
        value: r,
        defaultValue: r,
        theme: "snow",
        onChange: d,
        placeholder: i,
        readOnly: a,
        className: l,
        formats: D4
      }
    ),
    s && /* @__PURE__ */ L.jsx("div", { className: "text-red text-xxs", children: s.message })
  ] });
};
var Ic = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto < "u" && typeof msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto), $4 = new Uint8Array(16);
function z4() {
  if (!Ic)
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return Ic($4);
}
var yh = [];
for (var Hn = 0; Hn < 256; ++Hn)
  yh[Hn] = (Hn + 256).toString(16).substr(1);
function F4(e, t) {
  var r = t || 0, n = yh;
  return [n[e[r++]], n[e[r++]], n[e[r++]], n[e[r++]], "-", n[e[r++]], n[e[r++]], "-", n[e[r++]], n[e[r++]], "-", n[e[r++]], n[e[r++]], "-", n[e[r++]], n[e[r++]], n[e[r++]], n[e[r++]], n[e[r++]], n[e[r++]]].join("");
}
function B4(e, t, r) {
  var n = t && r || 0;
  typeof e == "string" && (t = e === "binary" ? new Array(16) : null, e = null), e = e || {};
  var i = e.random || (e.rng || z4)();
  if (i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, t)
    for (var a = 0; a < 16; ++a)
      t[n + a] = i[a];
  return t || F4(i);
}
function Lc(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ko(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Lc(Object(r), !0).forEach(function(n) {
      on(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Lc(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function q4(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function Mc(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function U4(e, t, r) {
  return t && Mc(e.prototype, t), r && Mc(e, r), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function on(e, t, r) {
  return t in e ? Object.defineProperty(e, t, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = r, e;
}
function Pi() {
  return Pi = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Pi.apply(this, arguments);
}
function H4(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError("Super expression must either be null or a function");
  e.prototype = Object.create(t && t.prototype, {
    constructor: {
      value: e,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(e, "prototype", {
    writable: !1
  }), t && Zo(e, t);
}
function Ci(e) {
  return Ci = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(r) {
    return r.__proto__ || Object.getPrototypeOf(r);
  }, Ci(e);
}
function Zo(e, t) {
  return Zo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, i) {
    return n.__proto__ = i, n;
  }, Zo(e, t);
}
function W4() {
  if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham)
    return !1;
  if (typeof Proxy == "function")
    return !0;
  try {
    return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    })), !0;
  } catch {
    return !1;
  }
}
function Y4(e) {
  if (e === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}
function V4(e, t) {
  if (t && (typeof t == "object" || typeof t == "function"))
    return t;
  if (t !== void 0)
    throw new TypeError("Derived constructors may only return object or undefined");
  return Y4(e);
}
function G4(e) {
  var t = W4();
  return function() {
    var n = Ci(e), i;
    if (t) {
      var a = Ci(this).constructor;
      i = Reflect.construct(n, arguments, a);
    } else
      i = n.apply(this, arguments);
    return V4(this, i);
  };
}
function K4(e, t) {
  if (e) {
    if (typeof e == "string")
      return Dc(e, t);
    var r = Object.prototype.toString.call(e).slice(8, -1);
    if (r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set")
      return Array.from(e);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return Dc(e, t);
  }
}
function Dc(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = new Array(t); r < t; r++)
    n[r] = e[r];
  return n;
}
function Z4(e, t) {
  var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (!r) {
    if (Array.isArray(e) || (r = K4(e)) || t && e && typeof e.length == "number") {
      r && (e = r);
      var n = 0, i = function() {
      };
      return {
        s: i,
        n: function() {
          return n >= e.length ? {
            done: !0
          } : {
            done: !1,
            value: e[n++]
          };
        },
        e: function(l) {
          throw l;
        },
        f: i
      };
    }
    throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  var a = !0, o = !1, s;
  return {
    s: function() {
      r = r.call(e);
    },
    n: function() {
      var l = r.next();
      return a = l.done, l;
    },
    e: function(l) {
      o = !0, s = l;
    },
    f: function() {
      try {
        !a && r.return != null && r.return();
      } finally {
        if (o)
          throw s;
      }
    }
  };
}
var Rc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Wn = function(e) {
  return e && e.Math == Math && e;
}, kt = (
  // eslint-disable-next-line es/no-global-this -- safe
  Wn(typeof globalThis == "object" && globalThis) || Wn(typeof window == "object" && window) || // eslint-disable-next-line no-restricted-globals -- safe
  Wn(typeof self == "object" && self) || Wn(typeof Rc == "object" && Rc) || // eslint-disable-next-line no-new-func -- fallback
  function() {
    return this;
  }() || Function("return this")()
), Hs = {}, jt = function(e) {
  try {
    return !!e();
  } catch {
    return !0;
  }
}, Q4 = jt, Ft = !Q4(function() {
  return Object.defineProperty({}, 1, { get: function() {
    return 7;
  } })[1] != 7;
}), X4 = jt, Ws = !X4(function() {
  var e = (function() {
  }).bind();
  return typeof e != "function" || e.hasOwnProperty("prototype");
}), J4 = Ws, Yn = Function.prototype.call, Ys = J4 ? Yn.bind(Yn) : function() {
  return Yn.apply(Yn, arguments);
}, bh = {}, wh = {}.propertyIsEnumerable, xh = Object.getOwnPropertyDescriptor, e3 = xh && !wh.call({ 1: 2 }, 1);
bh.f = e3 ? function(t) {
  var r = xh(this, t);
  return !!r && r.enumerable;
} : wh;
var Oh = function(e, t) {
  return {
    enumerable: !(e & 1),
    configurable: !(e & 2),
    writable: !(e & 4),
    value: t
  };
}, Eh = Ws, Sh = Function.prototype, Qo = Sh.call, t3 = Eh && Sh.bind.bind(Qo, Qo), _h = function(e) {
  return Eh ? t3(e) : function() {
    return Qo.apply(e, arguments);
  };
}, Th = _h, r3 = Th({}.toString), n3 = Th("".slice), aa = function(e) {
  return n3(r3(e), 8, -1);
}, i3 = aa, a3 = _h, wt = function(e) {
  if (i3(e) === "Function")
    return a3(e);
}, o3 = wt, s3 = jt, l3 = aa, Ra = Object, u3 = o3("".split), Nh = s3(function() {
  return !Ra("z").propertyIsEnumerable(0);
}) ? function(e) {
  return l3(e) == "String" ? u3(e, "") : Ra(e);
} : Ra, Ah = function(e) {
  return e == null;
}, c3 = Ah, f3 = TypeError, kh = function(e) {
  if (c3(e))
    throw f3("Can't call method on " + e);
  return e;
}, d3 = Nh, h3 = kh, oa = function(e) {
  return d3(h3(e));
}, Xo = typeof document == "object" && document.all, p3 = typeof Xo > "u" && Xo !== void 0, jh = {
  all: Xo,
  IS_HTMLDDA: p3
}, Ph = jh, v3 = Ph.all, lt = Ph.IS_HTMLDDA ? function(e) {
  return typeof e == "function" || e === v3;
} : function(e) {
  return typeof e == "function";
}, $c = lt, Ch = jh, g3 = Ch.all, Rr = Ch.IS_HTMLDDA ? function(e) {
  return typeof e == "object" ? e !== null : $c(e) || e === g3;
} : function(e) {
  return typeof e == "object" ? e !== null : $c(e);
}, $a = kt, m3 = lt, y3 = function(e) {
  return m3(e) ? e : void 0;
}, xn = function(e, t) {
  return arguments.length < 2 ? y3($a[e]) : $a[e] && $a[e][t];
}, b3 = wt, w3 = b3({}.isPrototypeOf), x3 = xn, O3 = x3("navigator", "userAgent") || "", Ih = kt, za = O3, zc = Ih.process, Fc = Ih.Deno, Bc = zc && zc.versions || Fc && Fc.version, qc = Bc && Bc.v8, ft, Ii;
qc && (ft = qc.split("."), Ii = ft[0] > 0 && ft[0] < 4 ? 1 : +(ft[0] + ft[1]));
!Ii && za && (ft = za.match(/Edge\/(\d+)/), (!ft || ft[1] >= 74) && (ft = za.match(/Chrome\/(\d+)/), ft && (Ii = +ft[1])));
var E3 = Ii, Uc = E3, S3 = jt, Lh = !!Object.getOwnPropertySymbols && !S3(function() {
  var e = Symbol();
  return !String(e) || !(Object(e) instanceof Symbol) || // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  !Symbol.sham && Uc && Uc < 41;
}), _3 = Lh, Mh = _3 && !Symbol.sham && typeof Symbol.iterator == "symbol", T3 = xn, N3 = lt, A3 = w3, k3 = Mh, j3 = Object, Dh = k3 ? function(e) {
  return typeof e == "symbol";
} : function(e) {
  var t = T3("Symbol");
  return N3(t) && A3(t.prototype, j3(e));
}, P3 = String, C3 = function(e) {
  try {
    return P3(e);
  } catch {
    return "Object";
  }
}, I3 = lt, L3 = C3, M3 = TypeError, Rh = function(e) {
  if (I3(e))
    return e;
  throw M3(L3(e) + " is not a function");
}, D3 = Rh, R3 = Ah, $3 = function(e, t) {
  var r = e[t];
  return R3(r) ? void 0 : D3(r);
}, Fa = Ys, Ba = lt, qa = Rr, z3 = TypeError, F3 = function(e, t) {
  var r, n;
  if (t === "string" && Ba(r = e.toString) && !qa(n = Fa(r, e)) || Ba(r = e.valueOf) && !qa(n = Fa(r, e)) || t !== "string" && Ba(r = e.toString) && !qa(n = Fa(r, e)))
    return n;
  throw z3("Can't convert object to primitive value");
}, Vs = { exports: {} }, Hc = kt, B3 = Object.defineProperty, Gs = function(e, t) {
  try {
    B3(Hc, e, { value: t, configurable: !0, writable: !0 });
  } catch {
    Hc[e] = t;
  }
  return t;
}, q3 = kt, U3 = Gs, Wc = "__core-js_shared__", H3 = q3[Wc] || U3(Wc, {}), Ks = H3, Yc = Ks;
(Vs.exports = function(e, t) {
  return Yc[e] || (Yc[e] = t !== void 0 ? t : {});
})("versions", []).push({
  version: "3.25.5",
  mode: "global",
  copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.25.5/LICENSE",
  source: "https://github.com/zloirock/core-js"
});
var W3 = kh, Y3 = Object, $h = function(e) {
  return Y3(W3(e));
}, V3 = wt, G3 = $h, K3 = V3({}.hasOwnProperty), tr = Object.hasOwn || function(t, r) {
  return K3(G3(t), r);
}, Z3 = wt, Q3 = 0, X3 = Math.random(), J3 = Z3(1 .toString), zh = function(e) {
  return "Symbol(" + (e === void 0 ? "" : e) + ")_" + J3(++Q3 + X3, 36);
}, eS = kt, tS = Vs.exports, Vc = tr, rS = zh, Gc = Lh, Fh = Mh, ur = tS("wks"), Kt = eS.Symbol, Kc = Kt && Kt.for, nS = Fh ? Kt : Kt && Kt.withoutSetter || rS, On = function(e) {
  if (!Vc(ur, e) || !(Gc || typeof ur[e] == "string")) {
    var t = "Symbol." + e;
    Gc && Vc(Kt, e) ? ur[e] = Kt[e] : Fh && Kc ? ur[e] = Kc(t) : ur[e] = nS(t);
  }
  return ur[e];
}, iS = Ys, Zc = Rr, Qc = Dh, aS = $3, oS = F3, sS = On, lS = TypeError, uS = sS("toPrimitive"), cS = function(e, t) {
  if (!Zc(e) || Qc(e))
    return e;
  var r = aS(e, uS), n;
  if (r) {
    if (t === void 0 && (t = "default"), n = iS(r, e, t), !Zc(n) || Qc(n))
      return n;
    throw lS("Can't convert object to primitive value");
  }
  return t === void 0 && (t = "number"), oS(e, t);
}, fS = cS, dS = Dh, Bh = function(e) {
  var t = fS(e, "string");
  return dS(t) ? t : t + "";
}, hS = kt, Xc = Rr, Jo = hS.document, pS = Xc(Jo) && Xc(Jo.createElement), qh = function(e) {
  return pS ? Jo.createElement(e) : {};
}, vS = Ft, gS = jt, mS = qh, Uh = !vS && !gS(function() {
  return Object.defineProperty(mS("div"), "a", {
    get: function() {
      return 7;
    }
  }).a != 7;
}), yS = Ft, bS = Ys, wS = bh, xS = Oh, OS = oa, ES = Bh, SS = tr, _S = Uh, Jc = Object.getOwnPropertyDescriptor;
Hs.f = yS ? Jc : function(t, r) {
  if (t = OS(t), r = ES(r), _S)
    try {
      return Jc(t, r);
    } catch {
    }
  if (SS(t, r))
    return xS(!bS(wS.f, t, r), t[r]);
};
var $r = {}, TS = Ft, NS = jt, Hh = TS && NS(function() {
  return Object.defineProperty(function() {
  }, "prototype", {
    value: 42,
    writable: !1
  }).prototype != 42;
}), AS = Rr, kS = String, jS = TypeError, sa = function(e) {
  if (AS(e))
    return e;
  throw jS(kS(e) + " is not an object");
}, PS = Ft, CS = Uh, IS = Hh, Vn = sa, ef = Bh, LS = TypeError, Ua = Object.defineProperty, MS = Object.getOwnPropertyDescriptor, Ha = "enumerable", Wa = "configurable", Ya = "writable";
$r.f = PS ? IS ? function(t, r, n) {
  if (Vn(t), r = ef(r), Vn(n), typeof t == "function" && r === "prototype" && "value" in n && Ya in n && !n[Ya]) {
    var i = MS(t, r);
    i && i[Ya] && (t[r] = n.value, n = {
      configurable: Wa in n ? n[Wa] : i[Wa],
      enumerable: Ha in n ? n[Ha] : i[Ha],
      writable: !1
    });
  }
  return Ua(t, r, n);
} : Ua : function(t, r, n) {
  if (Vn(t), r = ef(r), Vn(n), CS)
    try {
      return Ua(t, r, n);
    } catch {
    }
  if ("get" in n || "set" in n)
    throw LS("Accessors not supported");
  return "value" in n && (t[r] = n.value), t;
};
var DS = Ft, RS = $r, $S = Oh, Wh = DS ? function(e, t, r) {
  return RS.f(e, t, $S(1, r));
} : function(e, t, r) {
  return e[t] = r, e;
}, Yh = { exports: {} }, es = Ft, zS = tr, Vh = Function.prototype, FS = es && Object.getOwnPropertyDescriptor, Zs = zS(Vh, "name"), BS = Zs && (function() {
}).name === "something", qS = Zs && (!es || es && FS(Vh, "name").configurable), US = {
  EXISTS: Zs,
  PROPER: BS,
  CONFIGURABLE: qS
}, HS = wt, WS = lt, ts = Ks, YS = HS(Function.toString);
WS(ts.inspectSource) || (ts.inspectSource = function(e) {
  return YS(e);
});
var Gh = ts.inspectSource, VS = kt, GS = lt, tf = VS.WeakMap, KS = GS(tf) && /native code/.test(String(tf)), ZS = Vs.exports, QS = zh, rf = ZS("keys"), Kh = function(e) {
  return rf[e] || (rf[e] = QS(e));
}, Qs = {}, XS = KS, Zh = kt, JS = Rr, e_ = Wh, Va = tr, Ga = Ks, t_ = Kh, r_ = Qs, nf = "Object already initialized", rs = Zh.TypeError, n_ = Zh.WeakMap, Li, vn, Mi, i_ = function(e) {
  return Mi(e) ? vn(e) : Li(e, {});
}, a_ = function(e) {
  return function(t) {
    var r;
    if (!JS(t) || (r = vn(t)).type !== e)
      throw rs("Incompatible receiver, " + e + " required");
    return r;
  };
};
if (XS || Ga.state) {
  var gt = Ga.state || (Ga.state = new n_());
  gt.get = gt.get, gt.has = gt.has, gt.set = gt.set, Li = function(e, t) {
    if (gt.has(e))
      throw rs(nf);
    return t.facade = e, gt.set(e, t), t;
  }, vn = function(e) {
    return gt.get(e) || {};
  }, Mi = function(e) {
    return gt.has(e);
  };
} else {
  var cr = t_("state");
  r_[cr] = !0, Li = function(e, t) {
    if (Va(e, cr))
      throw rs(nf);
    return t.facade = e, e_(e, cr, t), t;
  }, vn = function(e) {
    return Va(e, cr) ? e[cr] : {};
  }, Mi = function(e) {
    return Va(e, cr);
  };
}
var o_ = {
  set: Li,
  get: vn,
  has: Mi,
  enforce: i_,
  getterFor: a_
}, s_ = jt, l_ = lt, Gn = tr, ns = Ft, u_ = US.CONFIGURABLE, c_ = Gh, Qh = o_, f_ = Qh.enforce, d_ = Qh.get, li = Object.defineProperty, h_ = ns && !s_(function() {
  return li(function() {
  }, "length", { value: 8 }).length !== 8;
}), p_ = String(String).split("String"), v_ = Yh.exports = function(e, t, r) {
  String(t).slice(0, 7) === "Symbol(" && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"), r && r.getter && (t = "get " + t), r && r.setter && (t = "set " + t), (!Gn(e, "name") || u_ && e.name !== t) && (ns ? li(e, "name", { value: t, configurable: !0 }) : e.name = t), h_ && r && Gn(r, "arity") && e.length !== r.arity && li(e, "length", { value: r.arity });
  try {
    r && Gn(r, "constructor") && r.constructor ? ns && li(e, "prototype", { writable: !1 }) : e.prototype && (e.prototype = void 0);
  } catch {
  }
  var n = f_(e);
  return Gn(n, "source") || (n.source = p_.join(typeof t == "string" ? t : "")), e;
};
Function.prototype.toString = v_(function() {
  return l_(this) && d_(this).source || c_(this);
}, "toString");
var g_ = lt, m_ = $r, y_ = Yh.exports, b_ = Gs, w_ = function(e, t, r, n) {
  n || (n = {});
  var i = n.enumerable, a = n.name !== void 0 ? n.name : t;
  if (g_(r) && y_(r, a, n), n.global)
    i ? e[t] = r : b_(t, r);
  else {
    try {
      n.unsafe ? e[t] && (i = !0) : delete e[t];
    } catch {
    }
    i ? e[t] = r : m_.f(e, t, {
      value: r,
      enumerable: !1,
      configurable: !n.nonConfigurable,
      writable: !n.nonWritable
    });
  }
  return e;
}, Xh = {}, x_ = Math.ceil, O_ = Math.floor, E_ = Math.trunc || function(t) {
  var r = +t;
  return (r > 0 ? O_ : x_)(r);
}, S_ = E_, Jh = function(e) {
  var t = +e;
  return t !== t || t === 0 ? 0 : S_(t);
}, __ = Jh, T_ = Math.max, N_ = Math.min, A_ = function(e, t) {
  var r = __(e);
  return r < 0 ? T_(r + t, 0) : N_(r, t);
}, k_ = Jh, j_ = Math.min, P_ = function(e) {
  return e > 0 ? j_(k_(e), 9007199254740991) : 0;
}, C_ = P_, ep = function(e) {
  return C_(e.length);
}, I_ = oa, L_ = A_, M_ = ep, af = function(e) {
  return function(t, r, n) {
    var i = I_(t), a = M_(i), o = L_(n, a), s;
    if (e && r != r) {
      for (; a > o; )
        if (s = i[o++], s != s)
          return !0;
    } else
      for (; a > o; o++)
        if ((e || o in i) && i[o] === r)
          return e || o || 0;
    return !e && -1;
  };
}, D_ = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: af(!0),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: af(!1)
}, R_ = wt, Ka = tr, $_ = oa, z_ = D_.indexOf, F_ = Qs, of = R_([].push), tp = function(e, t) {
  var r = $_(e), n = 0, i = [], a;
  for (a in r)
    !Ka(F_, a) && Ka(r, a) && of(i, a);
  for (; t.length > n; )
    Ka(r, a = t[n++]) && (~z_(i, a) || of(i, a));
  return i;
}, Xs = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf"
], B_ = tp, q_ = Xs, U_ = q_.concat("length", "prototype");
Xh.f = Object.getOwnPropertyNames || function(t) {
  return B_(t, U_);
};
var rp = {};
rp.f = Object.getOwnPropertySymbols;
var H_ = xn, W_ = wt, Y_ = Xh, V_ = rp, G_ = sa, K_ = W_([].concat), Z_ = H_("Reflect", "ownKeys") || function(t) {
  var r = Y_.f(G_(t)), n = V_.f;
  return n ? K_(r, n(t)) : r;
}, sf = tr, Q_ = Z_, X_ = Hs, J_ = $r, eT = function(e, t, r) {
  for (var n = Q_(t), i = J_.f, a = X_.f, o = 0; o < n.length; o++) {
    var s = n[o];
    !sf(e, s) && !(r && sf(r, s)) && i(e, s, a(t, s));
  }
}, tT = jt, rT = lt, nT = /#|\.prototype\./, En = function(e, t) {
  var r = aT[iT(e)];
  return r == sT ? !0 : r == oT ? !1 : rT(t) ? tT(t) : !!t;
}, iT = En.normalize = function(e) {
  return String(e).replace(nT, ".").toLowerCase();
}, aT = En.data = {}, oT = En.NATIVE = "N", sT = En.POLYFILL = "P", lT = En, Za = kt, uT = Hs.f, cT = Wh, fT = w_, dT = Gs, hT = eT, pT = lT, vT = function(e, t) {
  var r = e.target, n = e.global, i = e.stat, a, o, s, l, f, d;
  if (n ? o = Za : i ? o = Za[r] || dT(r, {}) : o = (Za[r] || {}).prototype, o)
    for (s in t) {
      if (f = t[s], e.dontCallGetSet ? (d = uT(o, s), l = d && d.value) : l = o[s], a = pT(n ? s : r + (i ? "." : "#") + s, e.forced), !a && l !== void 0) {
        if (typeof f == typeof l)
          continue;
        hT(f, l);
      }
      (e.sham || l && l.sham) && cT(f, "sham", !0), fT(o, s, f, e);
    }
}, lf = wt, gT = Rh, mT = Ws, yT = lf(lf.bind), bT = function(e, t) {
  return gT(e), t === void 0 ? e : mT ? yT(e, t) : function() {
    return e.apply(t, arguments);
  };
}, wT = aa, xT = Array.isArray || function(t) {
  return wT(t) == "Array";
}, OT = On, ET = OT("toStringTag"), np = {};
np[ET] = "z";
var ST = String(np) === "[object z]", _T = ST, TT = lt, ui = aa, NT = On, AT = NT("toStringTag"), kT = Object, jT = ui(function() {
  return arguments;
}()) == "Arguments", PT = function(e, t) {
  try {
    return e[t];
  } catch {
  }
}, CT = _T ? ui : function(e) {
  var t, r, n;
  return e === void 0 ? "Undefined" : e === null ? "Null" : typeof (r = PT(t = kT(e), AT)) == "string" ? r : jT ? ui(t) : (n = ui(t)) == "Object" && TT(t.callee) ? "Arguments" : n;
}, IT = wt, LT = jt, ip = lt, MT = CT, DT = xn, RT = Gh, ap = function() {
}, $T = [], op = DT("Reflect", "construct"), Js = /^\s*(?:class|function)\b/, zT = IT(Js.exec), FT = !Js.exec(ap), Qr = function(t) {
  if (!ip(t))
    return !1;
  try {
    return op(ap, $T, t), !0;
  } catch {
    return !1;
  }
}, sp = function(t) {
  if (!ip(t))
    return !1;
  switch (MT(t)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return !1;
  }
  try {
    return FT || !!zT(Js, RT(t));
  } catch {
    return !0;
  }
};
sp.sham = !0;
var BT = !op || LT(function() {
  var e;
  return Qr(Qr.call) || !Qr(Object) || !Qr(function() {
    e = !0;
  }) || e;
}) ? sp : Qr, uf = xT, qT = BT, UT = Rr, HT = On, WT = HT("species"), cf = Array, YT = function(e) {
  var t;
  return uf(e) && (t = e.constructor, qT(t) && (t === cf || uf(t.prototype)) ? t = void 0 : UT(t) && (t = t[WT], t === null && (t = void 0))), t === void 0 ? cf : t;
}, VT = YT, GT = function(e, t) {
  return new (VT(e))(t === 0 ? 0 : t);
}, KT = bT, ZT = wt, QT = Nh, XT = $h, JT = ep, eN = GT, ff = ZT([].push), Ct = function(e) {
  var t = e == 1, r = e == 2, n = e == 3, i = e == 4, a = e == 6, o = e == 7, s = e == 5 || a;
  return function(l, f, d, c) {
    for (var u = XT(l), h = QT(u), y = KT(f, d), g = JT(h), b = 0, v = c || eN, m = t ? v(l, g) : r || o ? v(l, 0) : void 0, x, p; g > b; b++)
      if ((s || b in h) && (x = h[b], p = y(x, b, u), e))
        if (t)
          m[b] = p;
        else if (p)
          switch (e) {
            case 3:
              return !0;
            case 5:
              return x;
            case 6:
              return b;
            case 2:
              ff(m, x);
          }
        else
          switch (e) {
            case 4:
              return !1;
            case 7:
              ff(m, x);
          }
    return a ? -1 : n || i ? i : m;
  };
}, tN = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: Ct(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: Ct(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: Ct(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: Ct(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: Ct(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: Ct(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: Ct(6),
  // `Array.prototype.filterReject` method
  // https://github.com/tc39/proposal-array-filtering
  filterReject: Ct(7)
}, lp = {}, rN = tp, nN = Xs, iN = Object.keys || function(t) {
  return rN(t, nN);
}, aN = Ft, oN = Hh, sN = $r, lN = sa, uN = oa, cN = iN;
lp.f = aN && !oN ? Object.defineProperties : function(t, r) {
  lN(t);
  for (var n = uN(r), i = cN(r), a = i.length, o = 0, s; a > o; )
    sN.f(t, s = i[o++], n[s]);
  return t;
};
var fN = xn, dN = fN("document", "documentElement"), hN = sa, pN = lp, df = Xs, vN = Qs, gN = dN, mN = qh, yN = Kh, hf = ">", pf = "<", is = "prototype", as = "script", up = yN("IE_PROTO"), Qa = function() {
}, cp = function(e) {
  return pf + as + hf + e + pf + "/" + as + hf;
}, vf = function(e) {
  e.write(cp("")), e.close();
  var t = e.parentWindow.Object;
  return e = null, t;
}, bN = function() {
  var e = mN("iframe"), t = "java" + as + ":", r;
  return e.style.display = "none", gN.appendChild(e), e.src = String(t), r = e.contentWindow.document, r.open(), r.write(cp("document.F=Object")), r.close(), r.F;
}, Kn, ci = function() {
  try {
    Kn = new ActiveXObject("htmlfile");
  } catch {
  }
  ci = typeof document < "u" ? document.domain && Kn ? vf(Kn) : bN() : vf(Kn);
  for (var e = df.length; e--; )
    delete ci[is][df[e]];
  return ci();
};
vN[up] = !0;
var wN = Object.create || function(t, r) {
  var n;
  return t !== null ? (Qa[is] = hN(t), n = new Qa(), Qa[is] = null, n[up] = t) : n = ci(), r === void 0 ? n : pN.f(n, r);
}, xN = On, ON = wN, EN = $r.f, os = xN("unscopables"), ss = Array.prototype;
ss[os] == null && EN(ss, os, {
  configurable: !0,
  value: ON(null)
});
var SN = function(e) {
  ss[os][e] = !0;
}, _N = vT, TN = tN.find, NN = SN, ls = "find", fp = !0;
ls in [] && Array(1)[ls](function() {
  fp = !1;
});
_N({ target: "Array", proto: !0, forced: fp }, {
  find: function(t) {
    return TN(this, t, arguments.length > 1 ? arguments[1] : void 0);
  }
});
NN(ls);
var ot = {
  GLOBAL: {
    HIDE: "__react_tooltip_hide_event",
    REBUILD: "__react_tooltip_rebuild_event",
    SHOW: "__react_tooltip_show_event"
  }
}, Xa = function(t, r) {
  var n;
  typeof window.CustomEvent == "function" ? n = new window.CustomEvent(t, {
    detail: r
  }) : (n = document.createEvent("Event"), n.initEvent(t, !1, !0, r)), window.dispatchEvent(n);
};
function AN(e) {
  e.hide = function(t) {
    Xa(ot.GLOBAL.HIDE, {
      target: t
    });
  }, e.rebuild = function() {
    Xa(ot.GLOBAL.REBUILD);
  }, e.show = function(t) {
    Xa(ot.GLOBAL.SHOW, {
      target: t
    });
  }, e.prototype.globalRebuild = function() {
    this.mount && (this.unbindListener(), this.bindListener());
  }, e.prototype.globalShow = function(t) {
    if (this.mount) {
      var r = t && t.detail && t.detail.target && !0 || !1;
      this.showTooltip({
        currentTarget: r && t.detail.target
      }, !0);
    }
  }, e.prototype.globalHide = function(t) {
    if (this.mount) {
      var r = t && t.detail && t.detail.target && !0 || !1;
      this.hideTooltip({
        currentTarget: r && t.detail.target
      }, r);
    }
  };
}
function kN(e) {
  e.prototype.bindWindowEvents = function(t) {
    window.removeEventListener(ot.GLOBAL.HIDE, this.globalHide), window.addEventListener(ot.GLOBAL.HIDE, this.globalHide, !1), window.removeEventListener(ot.GLOBAL.REBUILD, this.globalRebuild), window.addEventListener(ot.GLOBAL.REBUILD, this.globalRebuild, !1), window.removeEventListener(ot.GLOBAL.SHOW, this.globalShow), window.addEventListener(ot.GLOBAL.SHOW, this.globalShow, !1), t && (window.removeEventListener("resize", this.onWindowResize), window.addEventListener("resize", this.onWindowResize, !1));
  }, e.prototype.unbindWindowEvents = function() {
    window.removeEventListener(ot.GLOBAL.HIDE, this.globalHide), window.removeEventListener(ot.GLOBAL.REBUILD, this.globalRebuild), window.removeEventListener(ot.GLOBAL.SHOW, this.globalShow), window.removeEventListener("resize", this.onWindowResize);
  }, e.prototype.onWindowResize = function() {
    this.mount && this.hideTooltip();
  };
}
var dp = function(t, r) {
  var n = this.state.show, i = this.props.id, a = this.isCapture(r.currentTarget), o = r.currentTarget.getAttribute("currentItem");
  a || r.stopPropagation(), n && o === "true" ? t || this.hideTooltip(r) : (r.currentTarget.setAttribute("currentItem", "true"), jN(r.currentTarget, this.getTargetArray(i)), this.showTooltip(r));
}, jN = function(t, r) {
  for (var n = 0; n < r.length; n++)
    t !== r[n] ? r[n].setAttribute("currentItem", "false") : r[n].setAttribute("currentItem", "true");
}, Ja = {
  id: "9b69f92e-d3fe-498b-b1b4-c5e63a51b0cf",
  set: function(t, r, n) {
    if (this.id in t) {
      var i = t[this.id];
      i[r] = n;
    } else
      Object.defineProperty(t, this.id, {
        configurable: !0,
        value: on({}, r, n)
      });
  },
  get: function(t, r) {
    var n = t[this.id];
    if (n !== void 0)
      return n[r];
  }
};
function PN(e) {
  e.prototype.isCustomEvent = function(t) {
    var r = this.state.event;
    return r || !!t.getAttribute("data-event");
  }, e.prototype.customBindListener = function(t) {
    var r = this, n = this.state, i = n.event, a = n.eventOff, o = t.getAttribute("data-event") || i, s = t.getAttribute("data-event-off") || a;
    o.split(" ").forEach(function(l) {
      t.removeEventListener(l, Ja.get(t, l));
      var f = dp.bind(r, s);
      Ja.set(t, l, f), t.addEventListener(l, f, !1);
    }), s && s.split(" ").forEach(function(l) {
      t.removeEventListener(l, r.hideTooltip), t.addEventListener(l, r.hideTooltip, !1);
    });
  }, e.prototype.customUnbindListener = function(t) {
    var r = this.state, n = r.event, i = r.eventOff, a = n || t.getAttribute("data-event"), o = i || t.getAttribute("data-event-off");
    t.removeEventListener(a, Ja.get(t, n)), o && t.removeEventListener(o, this.hideTooltip);
  };
}
function CN(e) {
  e.prototype.isCapture = function(t) {
    return t && t.getAttribute("data-iscapture") === "true" || this.props.isCapture || !1;
  };
}
function IN(e) {
  e.prototype.getEffect = function(t) {
    var r = t.getAttribute("data-effect");
    return r || this.props.effect || "float";
  };
}
var LN = function(t) {
  var r = {};
  for (var n in t)
    typeof t[n] == "function" ? r[n] = t[n].bind(t) : r[n] = t[n];
  return r;
}, Xr = function(t, r, n) {
  for (var i = r.respectEffect, a = i === void 0 ? !1 : i, o = r.customEvent, s = o === void 0 ? !1 : o, l = this.props.id, f = null, d, c = n.target, u; f === null && c !== null; )
    u = c, f = c.getAttribute("data-tip") || null, d = c.getAttribute("data-for") || null, c = c.parentElement;
  if (c = u || n.target, !(this.isCustomEvent(c) && !s)) {
    var h = l == null && d == null || d === l;
    if (f != null && (!a || this.getEffect(c) === "float") && h) {
      var y = LN(n);
      y.currentTarget = c, t(y);
    }
  }
}, gf = function(t, r) {
  var n = {};
  return t.forEach(function(i) {
    var a = i.getAttribute(r);
    a && a.split(" ").forEach(function(o) {
      return n[o] = !0;
    });
  }), n;
}, mf = function() {
  return document.getElementsByTagName("body")[0];
};
function MN(e) {
  e.prototype.isBodyMode = function() {
    return !!this.props.bodyMode;
  }, e.prototype.bindBodyListener = function(t) {
    var r = this, n = this.state, i = n.event, a = n.eventOff, o = n.possibleCustomEvents, s = n.possibleCustomEventsOff, l = mf(), f = gf(t, "data-event"), d = gf(t, "data-event-off");
    i != null && (f[i] = !0), a != null && (d[a] = !0), o.split(" ").forEach(function(g) {
      return f[g] = !0;
    }), s.split(" ").forEach(function(g) {
      return d[g] = !0;
    }), this.unbindBodyListener(l);
    var c = this.bodyModeListeners = {};
    i == null && (c.mouseover = Xr.bind(this, this.showTooltip, {}), c.mousemove = Xr.bind(this, this.updateTooltip, {
      respectEffect: !0
    }), c.mouseout = Xr.bind(this, this.hideTooltip, {}));
    for (var u in f)
      c[u] = Xr.bind(this, function(g) {
        var b = g.currentTarget.getAttribute("data-event-off") || a;
        dp.call(r, b, g);
      }, {
        customEvent: !0
      });
    for (var h in d)
      c[h] = Xr.bind(this, this.hideTooltip, {
        customEvent: !0
      });
    for (var y in c)
      l.addEventListener(y, c[y]);
  }, e.prototype.unbindBodyListener = function(t) {
    t = t || mf();
    var r = this.bodyModeListeners;
    for (var n in r)
      t.removeEventListener(n, r[n]);
  };
}
var DN = function() {
  return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
};
function RN(e) {
  e.prototype.bindRemovalTracker = function() {
    var t = this, r = DN();
    if (r != null) {
      var n = new r(function(i) {
        for (var a = 0; a < i.length; a++)
          for (var o = i[a], s = 0; s < o.removedNodes.length; s++) {
            var l = o.removedNodes[s];
            if (l === t.state.currentTarget) {
              t.hideTooltip();
              return;
            }
          }
      });
      n.observe(window.document, {
        childList: !0,
        subtree: !0
      }), this.removalTracker = n;
    }
  }, e.prototype.unbindRemovalTracker = function() {
    this.removalTracker && (this.removalTracker.disconnect(), this.removalTracker = null);
  };
}
function yf(e, t, r, n, i, a, o) {
  var s = us(r), l = s.width, f = s.height, d = us(t), c = d.width, u = d.height, h = $N(e, t, a), y = h.mouseX, g = h.mouseY, b = zN(a, c, u, l, f), v = FN(o), m = v.extraOffsetX, x = v.extraOffsetY, p = window.innerWidth, w = window.innerHeight, S = BN(r), E = S.parentTop, A = S.parentLeft, j = function(z) {
    var C = b[z].l;
    return y + C + m;
  }, _ = function(z) {
    var C = b[z].r;
    return y + C + m;
  }, O = function(z) {
    var C = b[z].t;
    return g + C + x;
  }, N = function(z) {
    var C = b[z].b;
    return g + C + x;
  }, k = function(z) {
    return j(z) < 0;
  }, I = function(z) {
    return _(z) > p;
  }, R = function(z) {
    return O(z) < 0;
  }, H = function(z) {
    return N(z) > w;
  }, U = function(z) {
    return k(z) || I(z) || R(z) || H(z);
  }, G = function(z) {
    return !U(z);
  }, q = {
    top: G("top"),
    bottom: G("bottom"),
    left: G("left"),
    right: G("right")
  };
  function P() {
    var F = i.split(",").concat(n, ["top", "bottom", "left", "right"]), z = Z4(F), C;
    try {
      for (z.s(); !(C = z.n()).done; ) {
        var $ = C.value;
        if (q[$])
          return $;
      }
    } catch (W) {
      z.e(W);
    } finally {
      z.f();
    }
    return n;
  }
  var T = P(), M = !1, D;
  return T && T !== n && (M = !0, D = T), M ? {
    isNewState: !0,
    newState: {
      place: D
    }
  } : {
    isNewState: !1,
    position: {
      left: parseInt(j(n) - A, 10),
      top: parseInt(O(n) - E, 10)
    }
  };
}
var us = function(t) {
  var r = t.getBoundingClientRect(), n = r.height, i = r.width;
  return {
    height: parseInt(n, 10),
    width: parseInt(i, 10)
  };
}, $N = function(t, r, n) {
  var i = r.getBoundingClientRect(), a = i.top, o = i.left, s = us(r), l = s.width, f = s.height;
  return n === "float" ? {
    mouseX: t.clientX,
    mouseY: t.clientY
  } : {
    mouseX: o + l / 2,
    mouseY: a + f / 2
  };
}, zN = function(t, r, n, i, a) {
  var o, s, l, f, d = 3, c = 2, u = 12;
  return t === "float" ? (o = {
    l: -(i / 2),
    r: i / 2,
    t: -(a + d + c),
    b: -d
  }, l = {
    l: -(i / 2),
    r: i / 2,
    t: d + u,
    b: a + d + c + u
  }, f = {
    l: -(i + d + c),
    r: -d,
    t: -(a / 2),
    b: a / 2
  }, s = {
    l: d,
    r: i + d + c,
    t: -(a / 2),
    b: a / 2
  }) : t === "solid" && (o = {
    l: -(i / 2),
    r: i / 2,
    t: -(n / 2 + a + c),
    b: -(n / 2)
  }, l = {
    l: -(i / 2),
    r: i / 2,
    t: n / 2,
    b: n / 2 + a + c
  }, f = {
    l: -(i + r / 2 + c),
    r: -(r / 2),
    t: -(a / 2),
    b: a / 2
  }, s = {
    l: r / 2,
    r: i + r / 2 + c,
    t: -(a / 2),
    b: a / 2
  }), {
    top: o,
    bottom: l,
    left: f,
    right: s
  };
}, FN = function(t) {
  var r = 0, n = 0;
  Object.prototype.toString.apply(t) === "[object String]" && (t = JSON.parse(t.toString().replace(/'/g, '"')));
  for (var i in t)
    i === "top" ? n -= parseInt(t[i], 10) : i === "bottom" ? n += parseInt(t[i], 10) : i === "left" ? r -= parseInt(t[i], 10) : i === "right" && (r += parseInt(t[i], 10));
  return {
    extraOffsetX: r,
    extraOffsetY: n
  };
}, BN = function(t) {
  for (var r = t; r; ) {
    var n = window.getComputedStyle(r);
    if (n.getPropertyValue("transform") !== "none" || n.getPropertyValue("will-change") === "transform")
      break;
    r = r.parentElement;
  }
  var i = r && r.getBoundingClientRect().top || 0, a = r && r.getBoundingClientRect().left || 0;
  return {
    parentTop: i,
    parentLeft: a
  };
};
function bf(e, t, r, n) {
  if (t)
    return t;
  if (r != null)
    return r;
  if (r === null)
    return null;
  var i = /<br\s*\/?>/;
  return !n || n === "false" || !i.test(e) ? e : e.split(i).map(function(a, o) {
    return /* @__PURE__ */ Ce.createElement("span", {
      key: o,
      className: "multi-line"
    }, a);
  });
}
function wf(e) {
  var t = {};
  return Object.keys(e).filter(function(r) {
    return /(^aria-\w+$|^role$)/.test(r);
  }).forEach(function(r) {
    t[r] = e[r];
  }), t;
}
function eo(e) {
  var t = e.length;
  return e.hasOwnProperty ? Array.prototype.slice.call(e) : new Array(t).fill().map(function(r) {
    return e[r];
  });
}
function qN() {
  return "t" + B4();
}
var UN = `.__react_component_tooltip {
  border-radius: 3px;
  display: inline-block;
  font-size: 13px;
  left: -999em;
  opacity: 0;
  position: fixed;
  pointer-events: none;
  transition: opacity 0.3s ease-out;
  top: -999em;
  visibility: hidden;
  z-index: 999;
}
.__react_component_tooltip.allow_hover, .__react_component_tooltip.allow_click {
  pointer-events: auto;
}
.__react_component_tooltip::before, .__react_component_tooltip::after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
}
.__react_component_tooltip.show {
  opacity: 0.9;
  margin-top: 0;
  margin-left: 0;
  visibility: visible;
}
.__react_component_tooltip.place-top::before {
  bottom: 0;
  left: 50%;
  margin-left: -11px;
}
.__react_component_tooltip.place-bottom::before {
  top: 0;
  left: 50%;
  margin-left: -11px;
}
.__react_component_tooltip.place-left::before {
  right: 0;
  top: 50%;
  margin-top: -9px;
}
.__react_component_tooltip.place-right::before {
  left: 0;
  top: 50%;
  margin-top: -9px;
}
.__react_component_tooltip .multi-line {
  display: block;
  padding: 2px 0;
  text-align: center;
}`, xf = {
  dark: {
    text: "#fff",
    background: "#222",
    border: "transparent",
    arrow: "#222"
  },
  success: {
    text: "#fff",
    background: "#8DC572",
    border: "transparent",
    arrow: "#8DC572"
  },
  warning: {
    text: "#fff",
    background: "#F0AD4E",
    border: "transparent",
    arrow: "#F0AD4E"
  },
  error: {
    text: "#fff",
    background: "#BE6464",
    border: "transparent",
    arrow: "#BE6464"
  },
  info: {
    text: "#fff",
    background: "#337AB7",
    border: "transparent",
    arrow: "#337AB7"
  },
  light: {
    text: "#222",
    background: "#fff",
    border: "transparent",
    arrow: "#fff"
  }
};
function HN(e) {
  return xf[e] ? Ko({}, xf[e]) : void 0;
}
var WN = "8px 21px", YN = {
  tooltip: 3,
  arrow: 0
};
function VN(e, t, r, n, i, a) {
  return GN(e, KN(t, r, n), i, a);
}
function GN(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : WN, n = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : YN, i = t.text, a = t.background, o = t.border, s = t.arrow, l = n.arrow, f = n.tooltip;
  return `
  	.`.concat(e, ` {
	    color: `).concat(i, `;
	    background: `).concat(a, `;
	    border: 1px solid `).concat(o, `;
	    border-radius: `).concat(f, `px;
	    padding: `).concat(r, `;
  	}

  	.`).concat(e, `.place-top {
        margin-top: -10px;
    }
    .`).concat(e, `.place-top::before {
        content: "";
        background-color: inherit;
        position: absolute;
        z-index: 2;
        width: 20px;
        height: 12px;
    }
    .`).concat(e, `.place-top::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-top-right-radius: `).concat(l, `px;
        border: 1px solid `).concat(o, `;
        background-color: `).concat(s, `;
        z-index: -2;
        bottom: -6px;
        left: 50%;
        margin-left: -6px;
        transform: rotate(135deg);
    }

    .`).concat(e, `.place-bottom {
        margin-top: 10px;
    }
    .`).concat(e, `.place-bottom::before {
        content: "";
        background-color: inherit;
        position: absolute;
        z-index: -1;
        width: 18px;
        height: 10px;
    }
    .`).concat(e, `.place-bottom::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-top-right-radius: `).concat(l, `px;
        border: 1px solid `).concat(o, `;
        background-color: `).concat(s, `;
        z-index: -2;
        top: -6px;
        left: 50%;
        margin-left: -6px;
        transform: rotate(45deg);
    }

    .`).concat(e, `.place-left {
        margin-left: -10px;
    }
    .`).concat(e, `.place-left::before {
        content: "";
        background-color: inherit;
        position: absolute;
        z-index: -1;
        width: 10px;
        height: 18px;
    }
    .`).concat(e, `.place-left::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-top-right-radius: `).concat(l, `px;
        border: 1px solid `).concat(o, `;
        background-color: `).concat(s, `;
        z-index: -2;
        right: -6px;
        top: 50%;
        margin-top: -6px;
        transform: rotate(45deg);
    }

    .`).concat(e, `.place-right {
        margin-left: 10px;
    }
    .`).concat(e, `.place-right::before {
        content: "";
        background-color: inherit;
        position: absolute;
        z-index: -1;
        width: 10px;
        height: 18px;
    }
    .`).concat(e, `.place-right::after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-top-right-radius: `).concat(l, `px;
        border: 1px solid `).concat(o, `;
        background-color: `).concat(s, `;
        z-index: -2;
        left: -6px;
        top: 50%;
        margin-top: -6px;
        transform: rotate(-135deg);
    }
  `);
}
function KN(e, t, r) {
  var n = e.text, i = e.background, a = e.border, o = e.arrow ? e.arrow : e.background, s = HN(t);
  return n && (s.text = n), i && (s.background = i), r && (a ? s.border = a : s.border = t === "light" ? "black" : "white"), o && (s.arrow = o), s;
}
var Je, Jr, to = AN(Je = kN(Je = PN(Je = CN(Je = IN(Je = MN(Je = RN(Je = (Jr = /* @__PURE__ */ function(e) {
  H4(r, e);
  var t = G4(r);
  function r(n) {
    var i;
    return q4(this, r), i = t.call(this, n), i.state = {
      uuid: n.uuid || qN(),
      place: n.place || "top",
      // Direction of tooltip
      desiredPlace: n.place || "top",
      type: n.type || "dark",
      // Color theme of tooltip
      effect: n.effect || "float",
      // float or fixed
      show: !1,
      border: !1,
      borderClass: "border",
      customColors: {},
      customRadius: {},
      offset: {},
      padding: n.padding,
      extraClass: "",
      html: !1,
      delayHide: 0,
      delayShow: 0,
      event: n.event || null,
      eventOff: n.eventOff || null,
      currentEvent: null,
      // Current mouse event
      currentTarget: null,
      // Current target of mouse event
      ariaProps: wf(n),
      // aria- and role attributes
      isEmptyTip: !1,
      disable: !1,
      possibleCustomEvents: n.possibleCustomEvents || "",
      possibleCustomEventsOff: n.possibleCustomEventsOff || "",
      originTooltip: null,
      isMultiline: !1
    }, i.bind(["showTooltip", "updateTooltip", "hideTooltip", "hideTooltipOnScroll", "getTooltipContent", "globalRebuild", "globalShow", "globalHide", "onWindowResize", "mouseOnToolTip"]), i.mount = !0, i.delayShowLoop = null, i.delayHideLoop = null, i.delayReshow = null, i.intervalUpdateContent = null, i;
  }
  return U4(r, [{
    key: "bind",
    value: function(i) {
      var a = this;
      i.forEach(function(o) {
        a[o] = a[o].bind(a);
      });
    }
  }, {
    key: "componentDidMount",
    value: function() {
      var i = this.props;
      i.insecure;
      var a = i.resizeHide, o = i.disableInternalStyle;
      this.mount = !0, this.bindListener(), this.bindWindowEvents(a), o || this.injectStyles();
    }
  }, {
    key: "componentWillUnmount",
    value: function() {
      this.mount = !1, this.clearTimer(), this.unbindListener(), this.removeScrollListener(this.state.currentTarget), this.unbindWindowEvents();
    }
    /* Look for the closest DOM root having tooltip and inject styles. */
  }, {
    key: "injectStyles",
    value: function() {
      var i = this.tooltipRef;
      if (i) {
        for (var a = i.parentNode; a.parentNode; )
          a = a.parentNode;
        var o;
        switch (a.constructor.name) {
          case "Document":
          case "HTMLDocument":
          case void 0:
            o = a.head;
            break;
          case "ShadowRoot":
          default:
            o = a;
            break;
        }
        if (!o.querySelector("style[data-react-tooltip]")) {
          var s = document.createElement("style");
          s.textContent = UN, s.setAttribute("data-react-tooltip", "true"), o.appendChild(s);
        }
      }
    }
    /**
     * Return if the mouse is on the tooltip.
     * @returns {boolean} true - mouse is on the tooltip
     */
  }, {
    key: "mouseOnToolTip",
    value: function() {
      var i = this.state.show;
      return i && this.tooltipRef ? (this.tooltipRef.matches || (this.tooltipRef.msMatchesSelector ? this.tooltipRef.matches = this.tooltipRef.msMatchesSelector : this.tooltipRef.matches = this.tooltipRef.mozMatchesSelector), this.tooltipRef.matches(":hover")) : !1;
    }
    /**
     * Pick out corresponded target elements
     */
  }, {
    key: "getTargetArray",
    value: function(i) {
      var a = [], o;
      if (!i)
        o = "[data-tip]:not([data-for])";
      else {
        var s = i.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        o = '[data-tip][data-for="'.concat(s, '"]');
      }
      return eo(document.getElementsByTagName("*")).filter(function(l) {
        return l.shadowRoot;
      }).forEach(function(l) {
        a = a.concat(eo(l.shadowRoot.querySelectorAll(o)));
      }), a.concat(eo(document.querySelectorAll(o)));
    }
    /**
     * Bind listener to the target elements
     * These listeners used to trigger showing or hiding the tooltip
     */
  }, {
    key: "bindListener",
    value: function() {
      var i = this, a = this.props, o = a.id, s = a.globalEventOff, l = a.isCapture, f = this.getTargetArray(o);
      f.forEach(function(d) {
        d.getAttribute("currentItem") === null && d.setAttribute("currentItem", "false"), i.unbindBasicListener(d), i.isCustomEvent(d) && i.customUnbindListener(d);
      }), this.isBodyMode() ? this.bindBodyListener(f) : f.forEach(function(d) {
        var c = i.isCapture(d), u = i.getEffect(d);
        if (i.isCustomEvent(d)) {
          i.customBindListener(d);
          return;
        }
        d.addEventListener("mouseenter", i.showTooltip, c), d.addEventListener("focus", i.showTooltip, c), u === "float" && d.addEventListener("mousemove", i.updateTooltip, c), d.addEventListener("mouseleave", i.hideTooltip, c), d.addEventListener("blur", i.hideTooltip, c);
      }), s && (window.removeEventListener(s, this.hideTooltip), window.addEventListener(s, this.hideTooltip, l)), this.bindRemovalTracker();
    }
    /**
     * Unbind listeners on target elements
     */
  }, {
    key: "unbindListener",
    value: function() {
      var i = this, a = this.props, o = a.id, s = a.globalEventOff;
      if (this.isBodyMode())
        this.unbindBodyListener();
      else {
        var l = this.getTargetArray(o);
        l.forEach(function(f) {
          i.unbindBasicListener(f), i.isCustomEvent(f) && i.customUnbindListener(f);
        });
      }
      s && window.removeEventListener(s, this.hideTooltip), this.unbindRemovalTracker();
    }
    /**
     * Invoke this before bind listener and unmount the component
     * it is necessary to invoke this even when binding custom event
     * so that the tooltip can switch between custom and default listener
     */
  }, {
    key: "unbindBasicListener",
    value: function(i) {
      var a = this.isCapture(i);
      i.removeEventListener("mouseenter", this.showTooltip, a), i.removeEventListener("mousemove", this.updateTooltip, a), i.removeEventListener("mouseleave", this.hideTooltip, a);
    }
  }, {
    key: "getTooltipContent",
    value: function() {
      var i = this.props, a = i.getContent, o = i.children, s;
      return a && (Array.isArray(a) ? s = a[0] && a[0](this.state.originTooltip) : s = a(this.state.originTooltip)), bf(this.state.originTooltip, o, s, this.state.isMultiline);
    }
  }, {
    key: "isEmptyTip",
    value: function(i) {
      return typeof i == "string" && i === "" || i === null;
    }
    /**
     * When mouse enter, show the tooltip
     */
  }, {
    key: "showTooltip",
    value: function(i, a) {
      if (this.tooltipRef) {
        if (a) {
          var o = this.getTargetArray(this.props.id), s = o.some(function(A) {
            return A === i.currentTarget;
          });
          if (!s)
            return;
        }
        var l = this.props, f = l.multiline, d = l.getContent, c = i.currentTarget.getAttribute("data-tip"), u = i.currentTarget.getAttribute("data-multiline") || f || !1, h = i instanceof window.FocusEvent || a, y = !0;
        i.currentTarget.getAttribute("data-scroll-hide") ? y = i.currentTarget.getAttribute("data-scroll-hide") === "true" : this.props.scrollHide != null && (y = this.props.scrollHide), i && i.currentTarget && i.currentTarget.setAttribute && i.currentTarget.setAttribute("aria-describedby", this.props.id || this.state.uuid);
        var g = i.currentTarget.getAttribute("data-place") || this.props.place || "top", b = h && "solid" || this.getEffect(i.currentTarget), v = i.currentTarget.getAttribute("data-offset") || this.props.offset || {}, m = yf(i, i.currentTarget, this.tooltipRef, g.split(",")[0], g, b, v);
        m.position && this.props.overridePosition && (m.position = this.props.overridePosition(m.position, i, i.currentTarget, this.tooltipRef, g, g, b, v));
        var x = m.isNewState ? m.newState.place : g.split(",")[0];
        this.clearTimer();
        var p = i.currentTarget, w = this.state.show ? p.getAttribute("data-delay-update") || this.props.delayUpdate : 0, S = this, E = function() {
          S.setState({
            originTooltip: c,
            isMultiline: u,
            desiredPlace: g,
            place: x,
            type: p.getAttribute("data-type") || S.props.type || "dark",
            customColors: {
              text: p.getAttribute("data-text-color") || S.props.textColor || null,
              background: p.getAttribute("data-background-color") || S.props.backgroundColor || null,
              border: p.getAttribute("data-border-color") || S.props.borderColor || null,
              arrow: p.getAttribute("data-arrow-color") || S.props.arrowColor || null
            },
            customRadius: {
              tooltip: p.getAttribute("data-tooltip-radius") || S.props.tooltipRadius || "3",
              arrow: p.getAttribute("data-arrow-radius") || S.props.arrowRadius || "0"
            },
            effect: b,
            offset: v,
            padding: p.getAttribute("data-padding") || S.props.padding,
            html: (p.getAttribute("data-html") ? p.getAttribute("data-html") === "true" : S.props.html) || !1,
            delayShow: p.getAttribute("data-delay-show") || S.props.delayShow || 0,
            delayHide: p.getAttribute("data-delay-hide") || S.props.delayHide || 0,
            delayUpdate: p.getAttribute("data-delay-update") || S.props.delayUpdate || 0,
            border: (p.getAttribute("data-border") ? p.getAttribute("data-border") === "true" : S.props.border) || !1,
            borderClass: p.getAttribute("data-border-class") || S.props.borderClass || "border",
            extraClass: p.getAttribute("data-class") || S.props.class || S.props.className || "",
            disable: (p.getAttribute("data-tip-disable") ? p.getAttribute("data-tip-disable") === "true" : S.props.disable) || !1,
            currentTarget: p
          }, function() {
            y && S.addScrollListener(S.state.currentTarget), S.updateTooltip(i), d && Array.isArray(d) && (S.intervalUpdateContent = setInterval(function() {
              if (S.mount) {
                var j = S.props.getContent, _ = bf(c, "", j[0](), u), O = S.isEmptyTip(_);
                S.setState({
                  isEmptyTip: O
                }), S.updatePosition();
              }
            }, d[1]));
          });
        };
        w ? this.delayReshow = setTimeout(E, w) : E();
      }
    }
    /**
     * When mouse hover, update tool tip
     */
  }, {
    key: "updateTooltip",
    value: function(i) {
      var a = this, o = this.state, s = o.delayShow, l = o.disable, f = this.props, d = f.afterShow, c = f.disable, u = this.getTooltipContent(), h = i.currentTarget || i.target;
      if (!this.mouseOnToolTip() && !(this.isEmptyTip(u) || l || c)) {
        var y = this.state.show ? 0 : parseInt(s, 10), g = function() {
          if (Array.isArray(u) && u.length > 0 || u) {
            var v = !a.state.show;
            a.setState({
              currentEvent: i,
              currentTarget: h,
              show: !0
            }, function() {
              a.updatePosition(function() {
                v && d && d(i);
              });
            });
          }
        };
        this.delayShowLoop && clearTimeout(this.delayShowLoop), y ? this.delayShowLoop = setTimeout(g, y) : (this.delayShowLoop = null, g());
      }
    }
    /*
     * If we're mousing over the tooltip remove it when we leave.
     */
  }, {
    key: "listenForTooltipExit",
    value: function() {
      var i = this.state.show;
      i && this.tooltipRef && this.tooltipRef.addEventListener("mouseleave", this.hideTooltip);
    }
  }, {
    key: "removeListenerForTooltipExit",
    value: function() {
      var i = this.state.show;
      i && this.tooltipRef && this.tooltipRef.removeEventListener("mouseleave", this.hideTooltip);
    }
    /**
     * When mouse leave, hide tooltip
     */
  }, {
    key: "hideTooltip",
    value: function(i, a) {
      var o = this, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
        isScroll: !1
      }, l = this.state.disable, f = s.isScroll, d = f ? 0 : this.state.delayHide, c = this.props, u = c.afterHide, h = c.disable, y = this.getTooltipContent();
      if (this.mount && !(this.isEmptyTip(y) || l || h)) {
        if (a) {
          var g = this.getTargetArray(this.props.id), b = g.some(function(m) {
            return m === i.currentTarget;
          });
          if (!b || !this.state.show)
            return;
        }
        i && i.currentTarget && i.currentTarget.removeAttribute && i.currentTarget.removeAttribute("aria-describedby");
        var v = function() {
          var x = o.state.show;
          if (o.mouseOnToolTip()) {
            o.listenForTooltipExit();
            return;
          }
          o.removeListenerForTooltipExit(), o.setState({
            show: !1
          }, function() {
            o.removeScrollListener(o.state.currentTarget), x && u && u(i);
          });
        };
        this.clearTimer(), d ? this.delayHideLoop = setTimeout(v, parseInt(d, 10)) : v();
      }
    }
    /**
     * When scroll, hide tooltip
     */
  }, {
    key: "hideTooltipOnScroll",
    value: function(i, a) {
      this.hideTooltip(i, a, {
        isScroll: !0
      });
    }
    /**
     * Add scroll event listener when tooltip show
     * automatically hide the tooltip when scrolling
     */
  }, {
    key: "addScrollListener",
    value: function(i) {
      var a = this.isCapture(i);
      window.addEventListener("scroll", this.hideTooltipOnScroll, a);
    }
  }, {
    key: "removeScrollListener",
    value: function(i) {
      var a = this.isCapture(i);
      window.removeEventListener("scroll", this.hideTooltipOnScroll, a);
    }
    // Calculation the position
  }, {
    key: "updatePosition",
    value: function(i) {
      var a = this, o = this.state, s = o.currentEvent, l = o.currentTarget, f = o.place, d = o.desiredPlace, c = o.effect, u = o.offset, h = this.tooltipRef, y = yf(s, l, h, f, d, c, u);
      if (y.position && this.props.overridePosition && (y.position = this.props.overridePosition(y.position, s, l, h, f, d, c, u)), y.isNewState)
        return this.setState(y.newState, function() {
          a.updatePosition(i);
        });
      i && typeof i == "function" && i(), h.style.left = y.position.left + "px", h.style.top = y.position.top + "px";
    }
    /**
     * CLear all kinds of timeout of interval
     */
  }, {
    key: "clearTimer",
    value: function() {
      this.delayShowLoop && (clearTimeout(this.delayShowLoop), this.delayShowLoop = null), this.delayHideLoop && (clearTimeout(this.delayHideLoop), this.delayHideLoop = null), this.delayReshow && (clearTimeout(this.delayReshow), this.delayReshow = null), this.intervalUpdateContent && (clearInterval(this.intervalUpdateContent), this.intervalUpdateContent = null);
    }
  }, {
    key: "hasCustomColors",
    value: function() {
      var i = this;
      return !!(Object.keys(this.state.customColors).find(function(a) {
        return a !== "border" && i.state.customColors[a];
      }) || this.state.border && this.state.customColors.border);
    }
  }, {
    key: "render",
    value: function() {
      var i = this, a = this.state, o = a.extraClass, s = a.html, l = a.ariaProps, f = a.disable, d = a.uuid, c = this.getTooltipContent(), u = this.isEmptyTip(c), h = this.props.disableInternalStyle ? "" : VN(this.state.uuid, this.state.customColors, this.state.type, this.state.border, this.state.padding, this.state.customRadius), y = "__react_component_tooltip" + " ".concat(this.state.uuid) + (this.state.show && !f && !u ? " show" : "") + (this.state.border ? " " + this.state.borderClass : "") + " place-".concat(this.state.place) + // top, bottom, left, right
      " type-".concat(this.hasCustomColors() ? "custom" : this.state.type) + // dark, success, warning, error, info, light, custom
      (this.props.delayUpdate ? " allow_hover" : "") + (this.props.clickable ? " allow_click" : ""), g = this.props.wrapper;
      r.supportedWrappers.indexOf(g) < 0 && (g = r.defaultProps.wrapper);
      var b = [y, o].filter(Boolean).join(" ");
      if (s) {
        var v = "".concat(c).concat(h ? `
<style aria-hidden="true">`.concat(h, "</style>") : "");
        return /* @__PURE__ */ Ce.createElement(g, Pi({
          className: "".concat(b),
          id: this.props.id || d,
          ref: function(x) {
            return i.tooltipRef = x;
          }
        }, l, {
          "data-id": "tooltip",
          dangerouslySetInnerHTML: {
            __html: v
          }
        }));
      } else
        return /* @__PURE__ */ Ce.createElement(g, Pi({
          className: "".concat(b),
          id: this.props.id || d
        }, l, {
          ref: function(x) {
            return i.tooltipRef = x;
          },
          "data-id": "tooltip"
        }), h && /* @__PURE__ */ Ce.createElement("style", {
          dangerouslySetInnerHTML: {
            __html: h
          },
          "aria-hidden": "true"
        }), c);
    }
  }], [{
    key: "propTypes",
    get: function() {
      return {
        uuid: ee.string,
        children: ee.any,
        place: ee.string,
        type: ee.string,
        effect: ee.string,
        offset: ee.object,
        padding: ee.string,
        multiline: ee.bool,
        border: ee.bool,
        borderClass: ee.string,
        textColor: ee.string,
        backgroundColor: ee.string,
        borderColor: ee.string,
        arrowColor: ee.string,
        arrowRadius: ee.string,
        tooltipRadius: ee.string,
        insecure: ee.bool,
        class: ee.string,
        className: ee.string,
        id: ee.string,
        html: ee.bool,
        delayHide: ee.number,
        delayUpdate: ee.number,
        delayShow: ee.number,
        event: ee.string,
        eventOff: ee.string,
        isCapture: ee.bool,
        globalEventOff: ee.string,
        getContent: ee.any,
        afterShow: ee.func,
        afterHide: ee.func,
        overridePosition: ee.func,
        disable: ee.bool,
        scrollHide: ee.bool,
        resizeHide: ee.bool,
        wrapper: ee.string,
        bodyMode: ee.bool,
        possibleCustomEvents: ee.string,
        possibleCustomEventsOff: ee.string,
        clickable: ee.bool,
        disableInternalStyle: ee.bool
      };
    }
  }, {
    key: "getDerivedStateFromProps",
    value: function(i, a) {
      var o = a.ariaProps, s = wf(i), l = Object.keys(s).some(function(f) {
        return s[f] !== o[f];
      });
      return l ? Ko(Ko({}, a), {}, {
        ariaProps: s
      }) : null;
    }
  }]), r;
}(Ce.Component), on(Jr, "defaultProps", {
  insecure: !0,
  resizeHide: !0,
  wrapper: "div",
  clickable: !1
}), on(Jr, "supportedWrappers", ["div", "span"]), on(Jr, "displayName", "ReactTooltip"), Jr)) || Je) || Je) || Je) || Je) || Je) || Je) || Je;
const ZN = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDIyQzYuNDc5NjcgMjEuOTk0IDIuMDA2MDYgMTcuNTIwNCAyIDEyVjExLjhDMi4xMDk5MyA2LjMwNDU1IDYuNjM0NTkgMS45Mjc5NyAxMi4xMzA3IDIuMDAwOUMxNy42MjY4IDIuMDczODIgMjIuMDMzNyA2LjU2ODkgMjEuOTk3OCAxMi4wNjU0QzIxLjk2MTkgMTcuNTYxOCAxNy40OTY2IDIxLjk5ODkgMTIgMjJaTTExLjk4NCAyMEgxMkMxNi40MTY3IDE5Ljk5NTYgMTkuOTk0MiAxNi40MTI3IDE5Ljk5MiAxMS45OTZDMTkuOTg5OCA3LjU3OTMxIDE2LjQwODcgNC4wMDAwMiAxMS45OTIgNC4wMDAwMkM3LjU3NTI4IDQuMDAwMDIgMy45OTQyMSA3LjU3OTMxIDMuOTkyIDExLjk5NkMzLjk4OTc5IDE2LjQxMjcgNy41NjcyOSAxOS45OTU2IDExLjk4NCAyMFpNMTMgMThIMTFWMTZIMTNWMThaTTEzIDE1SDExQzEwLjk2ODQgMTMuNjk3NyAxMS42NDYxIDEyLjQ4MDggMTIuNzcgMTEuODIyQzEzLjQzIDExLjMxNiAxNCAxMC44OCAxNCAxMEMxNCA4Ljg5NTQ1IDEzLjEwNDYgOC4wMDAwMiAxMiA4LjAwMDAyQzEwLjg5NTQgOC4wMDAwMiAxMCA4Ljg5NTQ1IDEwIDEwSDhWOS45MTAwMkM4LjAxNjA4IDguNDgwOTYgOC43OTMzMyA3LjE2OTAyIDEwLjAzOSA2LjQ2ODQyQzExLjI4NDYgNS43Njc4MSAxMi44MDk0IDUuNzg0OTYgMTQuMDM5IDYuNTEzNDJDMTUuMjY4NSA3LjI0MTg3IDE2LjAxNjEgOC41NzA5NiAxNiAxMEMxNS45Mjg0IDExLjA3OSAxNS4zNDk3IDEyLjA2MDMgMTQuNDQgMTIuNjQ1QzEzLjYxNzcgMTMuMTYxMiAxMy4wODQ3IDE0LjAzMjggMTMgMTVaIiBmaWxsPSIjNEQ3MEIzIi8+Cjwvc3ZnPgo=", QN = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBvcGFjaXR5PSIwLjQiIGN4PSI3IiBjeT0iNyIgcj0iNyIgZmlsbD0iIzRENzBCMyIvPgo8cGF0aCBkPSJNMTAuMzIwNSA3LjcwODM0SDcuNzQ5NTJWMTAuMjU3QzcuNzQ5NTIgMTAuNjY3MyA3LjQxMzk1IDExIDcgMTFDNi41ODYwNSAxMSA2LjI1MDQ4IDEwLjY2NzMgNi4yNTA0OCAxMC4yNTdWNy43MDgzNEgzLjY3OTU1QzMuMjkzNDIgNy42Njg3IDMgNy4zNDYxNCAzIDYuOTYxMzJDMyA2LjU3NjUgMy4yOTM0MiA2LjI1Mzk0IDMuNjc5NTUgNi4yMTQzMUg2LjI0MjQyVjMuNjczNjVDNi4yODI0MSAzLjI5MDg4IDYuNjA3NzggMyA2Ljk5NTk3IDNDNy4zODQxNiAzIDcuNzA5NTQgMy4yOTA4OCA3Ljc0OTUyIDMuNjczNjVWNi4yMTQzMUgxMC4zMjA1QzEwLjcwNjYgNi4yNTM5NCAxMSA2LjU3NjUgMTEgNi45NjEzMkMxMSA3LjM0NjE0IDEwLjcwNjYgNy42Njg3IDEwLjMyMDUgNy43MDgzNFY3LjcwODM0WiIgZmlsbD0iIzRENzBCMyIvPgo8L3N2Zz4K";
const XN = ({
  dataFor: e,
  infoTootlip: t = !0,
  basicAumented: r = !1,
  children1: n,
  children: i,
  setHeight: a = !1,
  icon: o = !0,
  dataDelay: s = "0"
}) => /* @__PURE__ */ L.jsxs("div", { className: `${a ? "h-3.5" : "h-auto flex"}`, children: [
  t && o ? /* @__PURE__ */ L.jsx("button", { "data-tip": !0, "data-for": e, children: /* @__PURE__ */ L.jsx("img", { src: ZN, alt: "Help icon", className: "w-3.5 ml-1" }) }) : /* @__PURE__ */ L.jsxs("button", { "data-tip": !0, "data-for": e, "data-delay-show": s, children: [
    n,
    r && o && /* @__PURE__ */ L.jsx("img", { src: QN, alt: "More info", className: "inline w-2" })
  ] }),
  t && /* @__PURE__ */ L.jsx(
    to,
    {
      id: e,
      type: "error",
      backgroundColor: "#fff",
      children: /* @__PURE__ */ L.jsx("div", { className: "text-xxxs max-w-sm text-black rounded-2xl p-2", children: i })
    }
  ),
  !t && r && /* @__PURE__ */ L.jsx(
    to,
    {
      id: e,
      type: "error",
      delayHide: 500,
      effect: "solid",
      clickable: !0,
      className: "customTooltip",
      children: /* @__PURE__ */ L.jsx("div", { className: "text-xs max-w-xs flex text-black flex flex-col", children: i })
    }
  ),
  !t && !r && /* @__PURE__ */ L.jsx(
    to,
    {
      id: e,
      type: "error",
      delayHide: 500,
      effect: "solid",
      clickable: !0,
      className: "customTooltipColumn",
      children: /* @__PURE__ */ L.jsx("div", { className: "text-xs max-w-sm flex text-black flex flex-col", children: i })
    }
  )
] }), AA = ({
  name: e,
  id: t,
  reference: r,
  label: n,
  error: i,
  checked: a,
  onChange: o,
  onClick: s,
  value: l,
  disabled: f,
  help: d,
  dataFor: c,
  children: u,
  width: h = "full"
}) => /* @__PURE__ */ L.jsxs("div", { className: `flex flex-col | w-${h} | my-2 mx-0`, children: [
  /* @__PURE__ */ L.jsxs("div", { children: [
    /* @__PURE__ */ L.jsx(
      "input",
      {
        ...r,
        className: `form-checkbox rounded-sm cursor-pointer hover:shadow-inner bg-main border border-gray-lines text-main ${a ? "shadow-inner" : "shadow-soft-white"}`,
        type: "checkbox",
        name: e,
        id: t,
        checked: a,
        onChange: o,
        onClick: s,
        value: l,
        disabled: f
      }
    ),
    /* @__PURE__ */ L.jsxs("label", { className: "ml-2 mb-0 text-xs cursor-pointer", htmlFor: t, children: [
      n,
      " ",
      d && /* @__PURE__ */ L.jsx(XN, { dataFor: c, children: u })
    ] })
  ] }),
  i && /* @__PURE__ */ L.jsx("div", { className: "text-red -top-3 left-2 text-xxs", children: i.message })
] });
export {
  rA as BannerResponsive,
  gA as BasicToast,
  iA as BottomText,
  tc as Button,
  OA as ButtonCardMain,
  Ly as ButtonDanger,
  nA as ButtonMain,
  Iy as ButtonSecondary,
  dA as Card,
  AA as Checkbox,
  aA as Container,
  oA as CoverBackground,
  hA as DataGrid,
  sA as FormTitle,
  mA as Header,
  lA as Input,
  xA as InputFile,
  cA as Loader,
  yA as Menu,
  SA as Modal,
  _A as ModalSwal,
  EA as NoDataInfo,
  fA as PageTitle,
  pA as Pagination,
  u1 as PopoverMenu,
  uA as PoweredText,
  NA as RichEditor,
  wA as SectionHeader,
  jd as Select,
  bA as SidePanel,
  TA as Switch,
  vA as ToastContainer,
  XN as Tooltip,
  f1 as UiList,
  tA as configureI18n,
  Ze as i18n
};
