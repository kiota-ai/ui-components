import * as ve from "react";
import Ue, { createContext as tu, useContext as qa, useState as Ge, useRef as Ce, useEffect as Le, useDebugValue as jo, createElement as nn, useCallback as Re, forwardRef as nu, useMemo as mt, useLayoutEffect as of, PureComponent as sf, useReducer as lf, useImperativeHandle as uf, Fragment as cf } from "react";
import Xr, { createPortal as ff } from "react-dom";
const df = {
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
class Cr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(t, n);
  }
  init(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.prefix = n.prefix || "i18next:", this.logger = t || df, this.options = n, this.debug = n.debug;
  }
  log() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "log", "", !0);
  }
  warn() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "warn", "", !0);
  }
  error() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "error", "");
  }
  deprecate() {
    for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
      n[r] = arguments[r];
    return this.forward(n, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(t, n, r, i) {
    return i && !this.debug ? null : (typeof t[0] == "string" && (t[0] = `${r}${this.prefix} ${t[0]}`), this.logger[n](t));
  }
  create(t) {
    return new Cr(this.logger, {
      prefix: `${this.prefix}:${t}:`,
      ...this.options
    });
  }
  clone(t) {
    return t = t || this.options, t.prefix = t.prefix || this.prefix, new Cr(this.logger, t);
  }
}
var ht = new Cr();
class Jr {
  constructor() {
    this.observers = {};
  }
  on(t, n) {
    return t.split(" ").forEach((r) => {
      this.observers[r] = this.observers[r] || [], this.observers[r].push(n);
    }), this;
  }
  off(t, n) {
    if (this.observers[t]) {
      if (!n) {
        delete this.observers[t];
        return;
      }
      this.observers[t] = this.observers[t].filter((r) => r !== n);
    }
  }
  emit(t) {
    for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++)
      r[i - 1] = arguments[i];
    this.observers[t] && [].concat(this.observers[t]).forEach((o) => {
      o(...r);
    }), this.observers["*"] && [].concat(this.observers["*"]).forEach((o) => {
      o.apply(o, [t, ...r]);
    });
  }
}
function Pn() {
  let e, t;
  const n = new Promise((r, i) => {
    e = r, t = i;
  });
  return n.resolve = e, n.reject = t, n;
}
function Po(e) {
  return e == null ? "" : "" + e;
}
function hf(e, t, n) {
  e.forEach((r) => {
    t[r] && (n[r] = t[r]);
  });
}
function Ua(e, t, n) {
  function r(o) {
    return o && o.indexOf("###") > -1 ? o.replace(/###/g, ".") : o;
  }
  function i() {
    return !e || typeof e == "string";
  }
  const a = typeof t != "string" ? [].concat(t) : t.split(".");
  for (; a.length > 1; ) {
    if (i())
      return {};
    const o = r(a.shift());
    !e[o] && n && (e[o] = new n()), Object.prototype.hasOwnProperty.call(e, o) ? e = e[o] : e = {};
  }
  return i() ? {} : {
    obj: e,
    k: r(a.shift())
  };
}
function Co(e, t, n) {
  const {
    obj: r,
    k: i
  } = Ua(e, t, Object);
  r[i] = n;
}
function pf(e, t, n, r) {
  const {
    obj: i,
    k: a
  } = Ua(e, t, Object);
  i[a] = i[a] || [], r && (i[a] = i[a].concat(n)), r || i[a].push(n);
}
function Ir(e, t) {
  const {
    obj: n,
    k: r
  } = Ua(e, t);
  if (n)
    return n[r];
}
function vf(e, t, n) {
  const r = Ir(e, n);
  return r !== void 0 ? r : Ir(t, n);
}
function ru(e, t, n) {
  for (const r in t)
    r !== "__proto__" && r !== "constructor" && (r in e ? typeof e[r] == "string" || e[r] instanceof String || typeof t[r] == "string" || t[r] instanceof String ? n && (e[r] = t[r]) : ru(e[r], t[r], n) : e[r] = t[r]);
  return e;
}
function Kt(e) {
  return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var gf = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function mf(e) {
  return typeof e == "string" ? e.replace(/[&<>"'\/]/g, (t) => gf[t]) : e;
}
const yf = [" ", ",", "?", "!", ";"];
function bf(e, t, n) {
  t = t || "", n = n || "";
  const r = yf.filter((o) => t.indexOf(o) < 0 && n.indexOf(o) < 0);
  if (r.length === 0)
    return !0;
  const i = new RegExp(`(${r.map((o) => o === "?" ? "\\?" : o).join("|")})`);
  let a = !i.test(e);
  if (!a) {
    const o = e.indexOf(n);
    o > 0 && !i.test(e.substring(0, o)) && (a = !0);
  }
  return a;
}
function Lr(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e)
    return;
  if (e[t])
    return e[t];
  const r = t.split(n);
  let i = e;
  for (let a = 0; a < r.length; ++a) {
    if (!i || typeof i[r[a]] == "string" && a + 1 < r.length)
      return;
    if (i[r[a]] === void 0) {
      let o = 2, l = r.slice(a, a + o).join(n), u = i[l];
      for (; u === void 0 && r.length > a + o; )
        o++, l = r.slice(a, a + o).join(n), u = i[l];
      if (u === void 0)
        return;
      if (u === null)
        return null;
      if (t.endsWith(l)) {
        if (typeof u == "string")
          return u;
        if (l && typeof u[l] == "string")
          return u[l];
      }
      const f = r.slice(a + o).join(n);
      return f ? Lr(u, f, n) : void 0;
    }
    i = i[r[a]];
  }
  return i;
}
function Mr(e) {
  return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e;
}
class Io extends Jr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    super(), this.data = t || {}, this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.options.ignoreJSONStructure === void 0 && (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(t) {
    this.options.ns.indexOf(t) < 0 && this.options.ns.push(t);
  }
  removeNamespaces(t) {
    const n = this.options.ns.indexOf(t);
    n > -1 && this.options.ns.splice(n, 1);
  }
  getResource(t, n, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const a = i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator, o = i.ignoreJSONStructure !== void 0 ? i.ignoreJSONStructure : this.options.ignoreJSONStructure;
    let l = [t, n];
    r && typeof r != "string" && (l = l.concat(r)), r && typeof r == "string" && (l = l.concat(a ? r.split(a) : r)), t.indexOf(".") > -1 && (l = t.split("."));
    const u = Ir(this.data, l);
    return u || !o || typeof r != "string" ? u : Lr(this.data && this.data[t] && this.data[t][n], r, a);
  }
  addResource(t, n, r, i) {
    let a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : {
      silent: !1
    };
    const o = a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let l = [t, n];
    r && (l = l.concat(o ? r.split(o) : r)), t.indexOf(".") > -1 && (l = t.split("."), i = n, n = l[1]), this.addNamespaces(n), Co(this.data, l, i), a.silent || this.emit("added", t, n, r, i);
  }
  addResources(t, n, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {
      silent: !1
    };
    for (const a in r)
      (typeof r[a] == "string" || Object.prototype.toString.apply(r[a]) === "[object Array]") && this.addResource(t, n, a, r[a], {
        silent: !0
      });
    i.silent || this.emit("added", t, n, r);
  }
  addResourceBundle(t, n, r, i, a) {
    let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {
      silent: !1
    }, l = [t, n];
    t.indexOf(".") > -1 && (l = t.split("."), i = r, r = n, n = l[1]), this.addNamespaces(n);
    let u = Ir(this.data, l) || {};
    i ? ru(u, r, a) : u = {
      ...u,
      ...r
    }, Co(this.data, l, u), o.silent || this.emit("added", t, n, r);
  }
  removeResourceBundle(t, n) {
    this.hasResourceBundle(t, n) && delete this.data[t][n], this.removeNamespaces(n), this.emit("removed", t, n);
  }
  hasResourceBundle(t, n) {
    return this.getResource(t, n) !== void 0;
  }
  getResourceBundle(t, n) {
    return n || (n = this.options.defaultNS), this.options.compatibilityAPI === "v1" ? {
      ...this.getResource(t, n)
    } : this.getResource(t, n);
  }
  getDataByLanguage(t) {
    return this.data[t];
  }
  hasLanguageSomeTranslations(t) {
    const n = this.getDataByLanguage(t);
    return !!(n && Object.keys(n) || []).find((i) => n[i] && Object.keys(n[i]).length > 0);
  }
  toJSON() {
    return this.data;
  }
}
var iu = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, t, n, r, i) {
    return e.forEach((a) => {
      this.processors[a] && (t = this.processors[a].process(t, n, r, i));
    }), t;
  }
};
const Lo = {};
class Rr extends Jr {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(), hf(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat", "utils"], t, this), this.options = n, this.options.keySeparator === void 0 && (this.options.keySeparator = "."), this.logger = ht.create("translator");
  }
  changeLanguage(t) {
    t && (this.language = t);
  }
  exists(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    };
    if (t == null)
      return !1;
    const r = this.resolve(t, n);
    return r && r.res !== void 0;
  }
  extractFromKey(t, n) {
    let r = n.nsSeparator !== void 0 ? n.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const i = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator;
    let a = n.ns || this.options.defaultNS || [];
    const o = r && t.indexOf(r) > -1, l = !this.options.userDefinedKeySeparator && !n.keySeparator && !this.options.userDefinedNsSeparator && !n.nsSeparator && !bf(t, r, i);
    if (o && !l) {
      const u = t.match(this.interpolator.nestingRegexp);
      if (u && u.length > 0)
        return {
          key: t,
          namespaces: a
        };
      const f = t.split(r);
      (r !== i || r === i && this.options.ns.indexOf(f[0]) > -1) && (a = f.shift()), t = f.join(i);
    }
    return typeof a == "string" && (a = [a]), {
      key: t,
      namespaces: a
    };
  }
  translate(t, n, r) {
    if (typeof n != "object" && this.options.overloadTranslationOptionHandler && (n = this.options.overloadTranslationOptionHandler(arguments)), typeof n == "object" && (n = {
      ...n
    }), n || (n = {}), t == null)
      return "";
    Array.isArray(t) || (t = [String(t)]);
    const i = n.returnDetails !== void 0 ? n.returnDetails : this.options.returnDetails, a = n.keySeparator !== void 0 ? n.keySeparator : this.options.keySeparator, {
      key: o,
      namespaces: l
    } = this.extractFromKey(t[t.length - 1], n), u = l[l.length - 1], f = n.lng || this.language, h = n.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (f && f.toLowerCase() === "cimode") {
      if (h) {
        const p = n.nsSeparator || this.options.nsSeparator;
        return i ? {
          res: `${u}${p}${o}`,
          usedKey: o,
          exactUsedKey: o,
          usedLng: f,
          usedNS: u
        } : `${u}${p}${o}`;
      }
      return i ? {
        res: o,
        usedKey: o,
        exactUsedKey: o,
        usedLng: f,
        usedNS: u
      } : o;
    }
    const c = this.resolve(t, n);
    let s = c && c.res;
    const d = c && c.usedKey || o, y = c && c.exactUsedKey || o, m = Object.prototype.toString.apply(s), b = ["[object Number]", "[object Function]", "[object RegExp]"], v = n.joinArrays !== void 0 ? n.joinArrays : this.options.joinArrays, g = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (g && s && (typeof s != "string" && typeof s != "boolean" && typeof s != "number") && b.indexOf(m) < 0 && !(typeof v == "string" && m === "[object Array]")) {
      if (!n.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler || this.logger.warn("accessing an object - but returnObjects options is not enabled!");
        const p = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(d, s, {
          ...n,
          ns: l
        }) : `key '${o} (${this.language})' returned an object instead of string.`;
        return i ? (c.res = p, c) : p;
      }
      if (a) {
        const p = m === "[object Array]", x = p ? [] : {}, _ = p ? y : d;
        for (const E in s)
          if (Object.prototype.hasOwnProperty.call(s, E)) {
            const k = `${_}${a}${E}`;
            x[E] = this.translate(k, {
              ...n,
              joinArrays: !1,
              ns: l
            }), x[E] === k && (x[E] = s[E]);
          }
        s = x;
      }
    } else if (g && typeof v == "string" && m === "[object Array]")
      s = s.join(v), s && (s = this.extendTranslation(s, t, n, r));
    else {
      let p = !1, x = !1;
      const _ = n.count !== void 0 && typeof n.count != "string", E = Rr.hasDefaultValue(n), k = _ ? this.pluralResolver.getSuffix(f, n.count, n) : "", j = n.ordinal && _ ? this.pluralResolver.getSuffix(f, n.count, {
        ordinal: !1
      }) : "", S = n[`defaultValue${k}`] || n[`defaultValue${j}`] || n.defaultValue;
      !this.isValidLookup(s) && E && (p = !0, s = S), this.isValidLookup(s) || (x = !0, s = o);
      const N = (n.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && x ? void 0 : s, T = E && S !== s && this.options.updateMissing;
      if (x || p || T) {
        if (this.logger.log(T ? "updateKey" : "missingKey", f, u, o, T ? S : s), a) {
          const U = this.resolve(o, {
            ...n,
            keySeparator: !1
          });
          U && U.res && this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
        }
        let C = [];
        const D = this.languageUtils.getFallbackCodes(this.options.fallbackLng, n.lng || this.language);
        if (this.options.saveMissingTo === "fallback" && D && D[0])
          for (let U = 0; U < D.length; U++)
            C.push(D[U]);
        else
          this.options.saveMissingTo === "all" ? C = this.languageUtils.toResolveHierarchy(n.lng || this.language) : C.push(n.lng || this.language);
        const H = (U, K, q) => {
          const P = E && q !== s ? q : N;
          this.options.missingKeyHandler ? this.options.missingKeyHandler(U, u, K, P, T, n) : this.backendConnector && this.backendConnector.saveMissing && this.backendConnector.saveMissing(U, u, K, P, T, n), this.emit("missingKey", U, u, K, s);
        };
        this.options.saveMissing && (this.options.saveMissingPlurals && _ ? C.forEach((U) => {
          this.pluralResolver.getSuffixes(U, n).forEach((K) => {
            H([U], o + K, n[`defaultValue${K}`] || S);
          });
        }) : H(C, o, S));
      }
      s = this.extendTranslation(s, t, n, c, r), x && s === o && this.options.appendNamespaceToMissingKey && (s = `${u}:${o}`), (x || p) && this.options.parseMissingKeyHandler && (this.options.compatibilityAPI !== "v1" ? s = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${u}:${o}` : o, p ? s : void 0) : s = this.options.parseMissingKeyHandler(s));
    }
    return i ? (c.res = s, c) : s;
  }
  extendTranslation(t, n, r, i, a) {
    var o = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      t = this.i18nFormat.parse(t, {
        ...this.options.interpolation.defaultVariables,
        ...r
      }, r.lng || this.language || i.usedLng, i.usedNS, i.usedKey, {
        resolved: i
      });
    else if (!r.skipInterpolation) {
      r.interpolation && this.interpolator.init({
        ...r,
        interpolation: {
          ...this.options.interpolation,
          ...r.interpolation
        }
      });
      const f = typeof t == "string" && (r && r.interpolation && r.interpolation.skipOnVariables !== void 0 ? r.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
      let h;
      if (f) {
        const s = t.match(this.interpolator.nestingRegexp);
        h = s && s.length;
      }
      let c = r.replace && typeof r.replace != "string" ? r.replace : r;
      if (this.options.interpolation.defaultVariables && (c = {
        ...this.options.interpolation.defaultVariables,
        ...c
      }), t = this.interpolator.interpolate(t, c, r.lng || this.language, r), f) {
        const s = t.match(this.interpolator.nestingRegexp), d = s && s.length;
        h < d && (r.nest = !1);
      }
      !r.lng && this.options.compatibilityAPI !== "v1" && i && i.res && (r.lng = i.usedLng), r.nest !== !1 && (t = this.interpolator.nest(t, function() {
        for (var s = arguments.length, d = new Array(s), y = 0; y < s; y++)
          d[y] = arguments[y];
        return a && a[0] === d[0] && !r.context ? (o.logger.warn(`It seems you are nesting recursively key: ${d[0]} in key: ${n[0]}`), null) : o.translate(...d, n);
      }, r)), r.interpolation && this.interpolator.reset();
    }
    const l = r.postProcess || this.options.postProcess, u = typeof l == "string" ? [l] : l;
    return t != null && u && u.length && r.applyPostProcessor !== !1 && (t = iu.handle(u, t, n, this.options && this.options.postProcessPassResolved ? {
      i18nResolved: i,
      ...r
    } : r, this)), t;
  }
  resolve(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r, i, a, o, l;
    return typeof t == "string" && (t = [t]), t.forEach((u) => {
      if (this.isValidLookup(r))
        return;
      const f = this.extractFromKey(u, n), h = f.key;
      i = h;
      let c = f.namespaces;
      this.options.fallbackNS && (c = c.concat(this.options.fallbackNS));
      const s = n.count !== void 0 && typeof n.count != "string", d = s && !n.ordinal && n.count === 0 && this.pluralResolver.shouldUseIntlApi(), y = n.context !== void 0 && (typeof n.context == "string" || typeof n.context == "number") && n.context !== "", m = n.lngs ? n.lngs : this.languageUtils.toResolveHierarchy(n.lng || this.language, n.fallbackLng);
      c.forEach((b) => {
        this.isValidLookup(r) || (l = b, !Lo[`${m[0]}-${b}`] && this.utils && this.utils.hasLoadedNamespace && !this.utils.hasLoadedNamespace(l) && (Lo[`${m[0]}-${b}`] = !0, this.logger.warn(`key "${i}" for languages "${m.join(", ")}" won't get resolved as namespace "${l}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!")), m.forEach((v) => {
          if (this.isValidLookup(r))
            return;
          o = v;
          const g = [h];
          if (this.i18nFormat && this.i18nFormat.addLookupKeys)
            this.i18nFormat.addLookupKeys(g, h, v, b, n);
          else {
            let p;
            s && (p = this.pluralResolver.getSuffix(v, n.count, n));
            const x = `${this.options.pluralSeparator}zero`, _ = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
            if (s && (g.push(h + p), n.ordinal && p.indexOf(_) === 0 && g.push(h + p.replace(_, this.options.pluralSeparator)), d && g.push(h + x)), y) {
              const E = `${h}${this.options.contextSeparator}${n.context}`;
              g.push(E), s && (g.push(E + p), n.ordinal && p.indexOf(_) === 0 && g.push(E + p.replace(_, this.options.pluralSeparator)), d && g.push(E + x));
            }
          }
          let w;
          for (; w = g.pop(); )
            this.isValidLookup(r) || (a = w, r = this.getResource(v, b, w, n));
        }));
      });
    }), {
      res: r,
      usedKey: i,
      exactUsedKey: a,
      usedLng: o,
      usedNS: l
    };
  }
  isValidLookup(t) {
    return t !== void 0 && !(!this.options.returnNull && t === null) && !(!this.options.returnEmptyString && t === "");
  }
  getResource(t, n, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource ? this.i18nFormat.getResource(t, n, r, i) : this.resourceStore.getResource(t, n, r, i);
  }
  static hasDefaultValue(t) {
    const n = "defaultValue";
    for (const r in t)
      if (Object.prototype.hasOwnProperty.call(t, r) && n === r.substring(0, n.length) && t[r] !== void 0)
        return !0;
    return !1;
  }
}
function Ei(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
class Mo {
  constructor(t) {
    this.options = t, this.supportedLngs = this.options.supportedLngs || !1, this.logger = ht.create("languageUtils");
  }
  getScriptPartFromCode(t) {
    if (t = Mr(t), !t || t.indexOf("-") < 0)
      return null;
    const n = t.split("-");
    return n.length === 2 || (n.pop(), n[n.length - 1].toLowerCase() === "x") ? null : this.formatLanguageCode(n.join("-"));
  }
  getLanguagePartFromCode(t) {
    if (t = Mr(t), !t || t.indexOf("-") < 0)
      return t;
    const n = t.split("-");
    return this.formatLanguageCode(n[0]);
  }
  formatLanguageCode(t) {
    if (typeof t == "string" && t.indexOf("-") > -1) {
      const n = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let r = t.split("-");
      return this.options.lowerCaseLng ? r = r.map((i) => i.toLowerCase()) : r.length === 2 ? (r[0] = r[0].toLowerCase(), r[1] = r[1].toUpperCase(), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Ei(r[1].toLowerCase()))) : r.length === 3 && (r[0] = r[0].toLowerCase(), r[1].length === 2 && (r[1] = r[1].toUpperCase()), r[0] !== "sgn" && r[2].length === 2 && (r[2] = r[2].toUpperCase()), n.indexOf(r[1].toLowerCase()) > -1 && (r[1] = Ei(r[1].toLowerCase())), n.indexOf(r[2].toLowerCase()) > -1 && (r[2] = Ei(r[2].toLowerCase()))), r.join("-");
    }
    return this.options.cleanCode || this.options.lowerCaseLng ? t.toLowerCase() : t;
  }
  isSupportedCode(t) {
    return (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) && (t = this.getLanguagePartFromCode(t)), !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(t) > -1;
  }
  getBestMatchFromCodes(t) {
    if (!t)
      return null;
    let n;
    return t.forEach((r) => {
      if (n)
        return;
      const i = this.formatLanguageCode(r);
      (!this.options.supportedLngs || this.isSupportedCode(i)) && (n = i);
    }), !n && this.options.supportedLngs && t.forEach((r) => {
      if (n)
        return;
      const i = this.getLanguagePartFromCode(r);
      if (this.isSupportedCode(i))
        return n = i;
      n = this.options.supportedLngs.find((a) => {
        if (a === i)
          return a;
        if (!(a.indexOf("-") < 0 && i.indexOf("-") < 0) && a.indexOf(i) === 0)
          return a;
      });
    }), n || (n = this.getFallbackCodes(this.options.fallbackLng)[0]), n;
  }
  getFallbackCodes(t, n) {
    if (!t)
      return [];
    if (typeof t == "function" && (t = t(n)), typeof t == "string" && (t = [t]), Object.prototype.toString.apply(t) === "[object Array]")
      return t;
    if (!n)
      return t.default || [];
    let r = t[n];
    return r || (r = t[this.getScriptPartFromCode(n)]), r || (r = t[this.formatLanguageCode(n)]), r || (r = t[this.getLanguagePartFromCode(n)]), r || (r = t.default), r || [];
  }
  toResolveHierarchy(t, n) {
    const r = this.getFallbackCodes(n || this.options.fallbackLng || [], t), i = [], a = (o) => {
      o && (this.isSupportedCode(o) ? i.push(o) : this.logger.warn(`rejecting language code not found in supportedLngs: ${o}`));
    };
    return typeof t == "string" && (t.indexOf("-") > -1 || t.indexOf("_") > -1) ? (this.options.load !== "languageOnly" && a(this.formatLanguageCode(t)), this.options.load !== "languageOnly" && this.options.load !== "currentOnly" && a(this.getScriptPartFromCode(t)), this.options.load !== "currentOnly" && a(this.getLanguagePartFromCode(t))) : typeof t == "string" && a(this.formatLanguageCode(t)), r.forEach((o) => {
      i.indexOf(o) < 0 && a(this.formatLanguageCode(o));
    }), i;
  }
}
let xf = [{
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
}], wf = {
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
const Of = ["v1", "v2", "v3"], Ef = ["v4"], Ro = {
  zero: 0,
  one: 1,
  two: 2,
  few: 3,
  many: 4,
  other: 5
};
function _f() {
  const e = {};
  return xf.forEach((t) => {
    t.lngs.forEach((n) => {
      e[n] = {
        numbers: t.nr,
        plurals: wf[t.fc]
      };
    });
  }), e;
}
class Sf {
  constructor(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.languageUtils = t, this.options = n, this.logger = ht.create("pluralResolver"), (!this.options.compatibilityJSON || Ef.includes(this.options.compatibilityJSON)) && (typeof Intl > "u" || !Intl.PluralRules) && (this.options.compatibilityJSON = "v3", this.logger.error("Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling.")), this.rules = _f();
  }
  addRule(t, n) {
    this.rules[t] = n;
  }
  getRule(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(Mr(t), {
          type: n.ordinal ? "ordinal" : "cardinal"
        });
      } catch {
        return;
      }
    return this.rules[t] || this.rules[this.languageUtils.getLanguagePartFromCode(t)];
  }
  needsPlural(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = this.getRule(t, n);
    return this.shouldUseIntlApi() ? r && r.resolvedOptions().pluralCategories.length > 1 : r && r.numbers.length > 1;
  }
  getPluralFormsOfKey(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(t, r).map((i) => `${n}${i}`);
  }
  getSuffixes(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = this.getRule(t, n);
    return r ? this.shouldUseIntlApi() ? r.resolvedOptions().pluralCategories.sort((i, a) => Ro[i] - Ro[a]).map((i) => `${this.options.prepend}${n.ordinal ? `ordinal${this.options.prepend}` : ""}${i}`) : r.numbers.map((i) => this.getSuffix(t, i, n)) : [];
  }
  getSuffix(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = this.getRule(t, r);
    return i ? this.shouldUseIntlApi() ? `${this.options.prepend}${r.ordinal ? `ordinal${this.options.prepend}` : ""}${i.select(n)}` : this.getSuffixRetroCompatible(i, n) : (this.logger.warn(`no plural rule found for: ${t}`), "");
  }
  getSuffixRetroCompatible(t, n) {
    const r = t.noAbs ? t.plurals(n) : t.plurals(Math.abs(n));
    let i = t.numbers[r];
    this.options.simplifyPluralSuffix && t.numbers.length === 2 && t.numbers[0] === 1 && (i === 2 ? i = "plural" : i === 1 && (i = ""));
    const a = () => this.options.prepend && i.toString() ? this.options.prepend + i.toString() : i.toString();
    return this.options.compatibilityJSON === "v1" ? i === 1 ? "" : typeof i == "number" ? `_plural_${i.toString()}` : a() : this.options.compatibilityJSON === "v2" || this.options.simplifyPluralSuffix && t.numbers.length === 2 && t.numbers[0] === 1 ? a() : this.options.prepend && r.toString() ? this.options.prepend + r.toString() : r.toString();
  }
  shouldUseIntlApi() {
    return !Of.includes(this.options.compatibilityJSON);
  }
}
function Do(e, t, n) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".", i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0, a = vf(e, t, n);
  return !a && i && typeof n == "string" && (a = Lr(e, n, r), a === void 0 && (a = Lr(t, n, r))), a;
}
class Nf {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = ht.create("interpolator"), this.options = t, this.format = t.interpolation && t.interpolation.format || ((n) => n), this.init(t);
  }
  init() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    t.interpolation || (t.interpolation = {
      escapeValue: !0
    });
    const n = t.interpolation;
    this.escape = n.escape !== void 0 ? n.escape : mf, this.escapeValue = n.escapeValue !== void 0 ? n.escapeValue : !0, this.useRawValueToEscape = n.useRawValueToEscape !== void 0 ? n.useRawValueToEscape : !1, this.prefix = n.prefix ? Kt(n.prefix) : n.prefixEscaped || "{{", this.suffix = n.suffix ? Kt(n.suffix) : n.suffixEscaped || "}}", this.formatSeparator = n.formatSeparator ? n.formatSeparator : n.formatSeparator || ",", this.unescapePrefix = n.unescapeSuffix ? "" : n.unescapePrefix || "-", this.unescapeSuffix = this.unescapePrefix ? "" : n.unescapeSuffix || "", this.nestingPrefix = n.nestingPrefix ? Kt(n.nestingPrefix) : n.nestingPrefixEscaped || Kt("$t("), this.nestingSuffix = n.nestingSuffix ? Kt(n.nestingSuffix) : n.nestingSuffixEscaped || Kt(")"), this.nestingOptionsSeparator = n.nestingOptionsSeparator ? n.nestingOptionsSeparator : n.nestingOptionsSeparator || ",", this.maxReplaces = n.maxReplaces ? n.maxReplaces : 1e3, this.alwaysFormat = n.alwaysFormat !== void 0 ? n.alwaysFormat : !1, this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const t = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(t, "g");
    const n = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(n, "g");
    const r = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(r, "g");
  }
  interpolate(t, n, r, i) {
    let a, o, l;
    const u = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
    function f(y) {
      return y.replace(/\$/g, "$$$$");
    }
    const h = (y) => {
      if (y.indexOf(this.formatSeparator) < 0) {
        const g = Do(n, u, y, this.options.keySeparator, this.options.ignoreJSONStructure);
        return this.alwaysFormat ? this.format(g, void 0, r, {
          ...i,
          ...n,
          interpolationkey: y
        }) : g;
      }
      const m = y.split(this.formatSeparator), b = m.shift().trim(), v = m.join(this.formatSeparator).trim();
      return this.format(Do(n, u, b, this.options.keySeparator, this.options.ignoreJSONStructure), v, r, {
        ...i,
        ...n,
        interpolationkey: b
      });
    };
    this.resetRegExp();
    const c = i && i.missingInterpolationHandler || this.options.missingInterpolationHandler, s = i && i.interpolation && i.interpolation.skipOnVariables !== void 0 ? i.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
    return [{
      regex: this.regexpUnescape,
      safeValue: (y) => f(y)
    }, {
      regex: this.regexp,
      safeValue: (y) => this.escapeValue ? f(this.escape(y)) : f(y)
    }].forEach((y) => {
      for (l = 0; a = y.regex.exec(t); ) {
        const m = a[1].trim();
        if (o = h(m), o === void 0)
          if (typeof c == "function") {
            const v = c(t, a, i);
            o = typeof v == "string" ? v : "";
          } else if (i && Object.prototype.hasOwnProperty.call(i, m))
            o = "";
          else if (s) {
            o = a[0];
            continue;
          } else
            this.logger.warn(`missed to pass in variable ${m} for interpolating ${t}`), o = "";
        else
          typeof o != "string" && !this.useRawValueToEscape && (o = Po(o));
        const b = y.safeValue(o);
        if (t = t.replace(a[0], b), s ? (y.regex.lastIndex += o.length, y.regex.lastIndex -= a[0].length) : y.regex.lastIndex = 0, l++, l >= this.maxReplaces)
          break;
      }
    }), t;
  }
  nest(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i, a, o;
    function l(u, f) {
      const h = this.nestingOptionsSeparator;
      if (u.indexOf(h) < 0)
        return u;
      const c = u.split(new RegExp(`${h}[ ]*{`));
      let s = `{${c[1]}`;
      u = c[0], s = this.interpolate(s, o);
      const d = s.match(/'/g), y = s.match(/"/g);
      (d && d.length % 2 === 0 && !y || y.length % 2 !== 0) && (s = s.replace(/'/g, '"'));
      try {
        o = JSON.parse(s), f && (o = {
          ...f,
          ...o
        });
      } catch (m) {
        return this.logger.warn(`failed parsing options string in nesting for key ${u}`, m), `${u}${h}${s}`;
      }
      return delete o.defaultValue, u;
    }
    for (; i = this.nestingRegexp.exec(t); ) {
      let u = [];
      o = {
        ...r
      }, o = o.replace && typeof o.replace != "string" ? o.replace : o, o.applyPostProcessor = !1, delete o.defaultValue;
      let f = !1;
      if (i[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(i[1])) {
        const h = i[1].split(this.formatSeparator).map((c) => c.trim());
        i[1] = h.shift(), u = h, f = !0;
      }
      if (a = n(l.call(this, i[1].trim(), o), o), a && i[0] === t && typeof a != "string")
        return a;
      typeof a != "string" && (a = Po(a)), a || (this.logger.warn(`missed to resolve ${i[1]} for nesting ${t}`), a = ""), f && (a = u.reduce((h, c) => this.format(h, c, r.lng, {
        ...r,
        interpolationkey: i[1].trim()
      }), a.trim())), t = t.replace(i[0], a), this.regexp.lastIndex = 0;
    }
    return t;
  }
}
function Af(e) {
  let t = e.toLowerCase().trim();
  const n = {};
  if (e.indexOf("(") > -1) {
    const r = e.split("(");
    t = r[0].toLowerCase().trim();
    const i = r[1].substring(0, r[1].length - 1);
    t === "currency" && i.indexOf(":") < 0 ? n.currency || (n.currency = i.trim()) : t === "relativetime" && i.indexOf(":") < 0 ? n.range || (n.range = i.trim()) : i.split(";").forEach((o) => {
      if (!o)
        return;
      const [l, ...u] = o.split(":"), f = u.join(":").trim().replace(/^'+|'+$/g, "");
      n[l.trim()] || (n[l.trim()] = f), f === "false" && (n[l.trim()] = !1), f === "true" && (n[l.trim()] = !0), isNaN(f) || (n[l.trim()] = parseInt(f, 10));
    });
  }
  return {
    formatName: t,
    formatOptions: n
  };
}
function Gt(e) {
  const t = {};
  return function(r, i, a) {
    const o = i + JSON.stringify(a);
    let l = t[o];
    return l || (l = e(Mr(i), a), t[o] = l), l(r);
  };
}
class kf {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    this.logger = ht.create("formatter"), this.options = t, this.formats = {
      number: Gt((n, r) => {
        const i = new Intl.NumberFormat(n, {
          ...r
        });
        return (a) => i.format(a);
      }),
      currency: Gt((n, r) => {
        const i = new Intl.NumberFormat(n, {
          ...r,
          style: "currency"
        });
        return (a) => i.format(a);
      }),
      datetime: Gt((n, r) => {
        const i = new Intl.DateTimeFormat(n, {
          ...r
        });
        return (a) => i.format(a);
      }),
      relativetime: Gt((n, r) => {
        const i = new Intl.RelativeTimeFormat(n, {
          ...r
        });
        return (a) => i.format(a, r.range || "day");
      }),
      list: Gt((n, r) => {
        const i = new Intl.ListFormat(n, {
          ...r
        });
        return (a) => i.format(a);
      })
    }, this.init(t);
  }
  init(t) {
    const r = (arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      interpolation: {}
    }).interpolation;
    this.formatSeparator = r.formatSeparator ? r.formatSeparator : r.formatSeparator || ",";
  }
  add(t, n) {
    this.formats[t.toLowerCase().trim()] = n;
  }
  addCached(t, n) {
    this.formats[t.toLowerCase().trim()] = Gt(n);
  }
  format(t, n, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return n.split(this.formatSeparator).reduce((l, u) => {
      const {
        formatName: f,
        formatOptions: h
      } = Af(u);
      if (this.formats[f]) {
        let c = l;
        try {
          const s = i && i.formatParams && i.formatParams[i.interpolationkey] || {}, d = s.locale || s.lng || i.locale || i.lng || r;
          c = this.formats[f](l, d, {
            ...h,
            ...i,
            ...s
          });
        } catch (s) {
          this.logger.warn(s);
        }
        return c;
      } else
        this.logger.warn(`there was no format function for ${f}`);
      return l;
    }, t);
  }
}
function Tf(e, t) {
  e.pending[t] !== void 0 && (delete e.pending[t], e.pendingCount--);
}
class jf extends Jr {
  constructor(t, n, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(), this.backend = t, this.store = n, this.services = r, this.languageUtils = r.languageUtils, this.options = i, this.logger = ht.create("backendConnector"), this.waitingReads = [], this.maxParallelReads = i.maxParallelReads || 10, this.readingCalls = 0, this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5, this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350, this.state = {}, this.queue = [], this.backend && this.backend.init && this.backend.init(r, i.backend, i);
  }
  queueLoad(t, n, r, i) {
    const a = {}, o = {}, l = {}, u = {};
    return t.forEach((f) => {
      let h = !0;
      n.forEach((c) => {
        const s = `${f}|${c}`;
        !r.reload && this.store.hasResourceBundle(f, c) ? this.state[s] = 2 : this.state[s] < 0 || (this.state[s] === 1 ? o[s] === void 0 && (o[s] = !0) : (this.state[s] = 1, h = !1, o[s] === void 0 && (o[s] = !0), a[s] === void 0 && (a[s] = !0), u[c] === void 0 && (u[c] = !0)));
      }), h || (l[f] = !0);
    }), (Object.keys(a).length || Object.keys(o).length) && this.queue.push({
      pending: o,
      pendingCount: Object.keys(o).length,
      loaded: {},
      errors: [],
      callback: i
    }), {
      toLoad: Object.keys(a),
      pending: Object.keys(o),
      toLoadLanguages: Object.keys(l),
      toLoadNamespaces: Object.keys(u)
    };
  }
  loaded(t, n, r) {
    const i = t.split("|"), a = i[0], o = i[1];
    n && this.emit("failedLoading", a, o, n), r && this.store.addResourceBundle(a, o, r), this.state[t] = n ? -1 : 2;
    const l = {};
    this.queue.forEach((u) => {
      pf(u.loaded, [a], o), Tf(u, t), n && u.errors.push(n), u.pendingCount === 0 && !u.done && (Object.keys(u.loaded).forEach((f) => {
        l[f] || (l[f] = {});
        const h = u.loaded[f];
        h.length && h.forEach((c) => {
          l[f][c] === void 0 && (l[f][c] = !0);
        });
      }), u.done = !0, u.errors.length ? u.callback(u.errors) : u.callback());
    }), this.emit("loaded", l), this.queue = this.queue.filter((u) => !u.done);
  }
  read(t, n, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0, a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : this.retryTimeout, o = arguments.length > 5 ? arguments[5] : void 0;
    if (!t.length)
      return o(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: t,
        ns: n,
        fcName: r,
        tried: i,
        wait: a,
        callback: o
      });
      return;
    }
    this.readingCalls++;
    const l = (f, h) => {
      if (this.readingCalls--, this.waitingReads.length > 0) {
        const c = this.waitingReads.shift();
        this.read(c.lng, c.ns, c.fcName, c.tried, c.wait, c.callback);
      }
      if (f && h && i < this.maxRetries) {
        setTimeout(() => {
          this.read.call(this, t, n, r, i + 1, a * 2, o);
        }, a);
        return;
      }
      o(f, h);
    }, u = this.backend[r].bind(this.backend);
    if (u.length === 2) {
      try {
        const f = u(t, n);
        f && typeof f.then == "function" ? f.then((h) => l(null, h)).catch(l) : l(null, f);
      } catch (f) {
        l(f);
      }
      return;
    }
    return u(t, n, l);
  }
  prepareLoading(t, n) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, i = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return this.logger.warn("No backend was added via i18next.use. Will not load resources."), i && i();
    typeof t == "string" && (t = this.languageUtils.toResolveHierarchy(t)), typeof n == "string" && (n = [n]);
    const a = this.queueLoad(t, n, r, i);
    if (!a.toLoad.length)
      return a.pending.length || i(), null;
    a.toLoad.forEach((o) => {
      this.loadOne(o);
    });
  }
  load(t, n, r) {
    this.prepareLoading(t, n, {}, r);
  }
  reload(t, n, r) {
    this.prepareLoading(t, n, {
      reload: !0
    }, r);
  }
  loadOne(t) {
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const r = t.split("|"), i = r[0], a = r[1];
    this.read(i, a, "read", void 0, void 0, (o, l) => {
      o && this.logger.warn(`${n}loading namespace ${a} for language ${i} failed`, o), !o && l && this.logger.log(`${n}loaded namespace ${a} for language ${i}`, l), this.loaded(t, o, l);
    });
  }
  saveMissing(t, n, r, i, a) {
    let o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {}, l = arguments.length > 6 && arguments[6] !== void 0 ? arguments[6] : () => {
    };
    if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(n)) {
      this.logger.warn(`did not save key "${r}" as the namespace "${n}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
      return;
    }
    if (!(r == null || r === "")) {
      if (this.backend && this.backend.create) {
        const u = {
          ...o,
          isUpdate: a
        }, f = this.backend.create.bind(this.backend);
        if (f.length < 6)
          try {
            let h;
            f.length === 5 ? h = f(t, n, r, i, u) : h = f(t, n, r, i), h && typeof h.then == "function" ? h.then((c) => l(null, c)).catch(l) : l(null, h);
          } catch (h) {
            l(h);
          }
        else
          f(t, n, r, i, l, u);
      }
      !t || !t[0] || this.store.addResource(t[0], n, r, i);
    }
  }
}
function $o() {
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
      let n = {};
      if (typeof t[1] == "object" && (n = t[1]), typeof t[1] == "string" && (n.defaultValue = t[1]), typeof t[2] == "string" && (n.tDescription = t[2]), typeof t[2] == "object" || typeof t[3] == "object") {
        const r = t[3] || t[2];
        Object.keys(r).forEach((i) => {
          n[i] = r[i];
        });
      }
      return n;
    },
    interpolation: {
      escapeValue: !0,
      format: (e, t, n, r) => e,
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
function zo(e) {
  return typeof e.ns == "string" && (e.ns = [e.ns]), typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]), typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]), e.supportedLngs && e.supportedLngs.indexOf("cimode") < 0 && (e.supportedLngs = e.supportedLngs.concat(["cimode"])), e;
}
function er() {
}
function Pf(e) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((n) => {
    typeof e[n] == "function" && (e[n] = e[n].bind(e));
  });
}
class Bn extends Jr {
  constructor() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    if (super(), this.options = zo(t), this.services = {}, this.logger = ht, this.modules = {
      external: []
    }, Pf(this), n && !this.isInitialized && !t.isClone) {
      if (!this.options.initImmediate)
        return this.init(t, n), this;
      setTimeout(() => {
        this.init(t, n);
      }, 0);
    }
  }
  init() {
    var t = this;
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = arguments.length > 1 ? arguments[1] : void 0;
    typeof n == "function" && (r = n, n = {}), !n.defaultNS && n.defaultNS !== !1 && n.ns && (typeof n.ns == "string" ? n.defaultNS = n.ns : n.ns.indexOf("translation") < 0 && (n.defaultNS = n.ns[0]));
    const i = $o();
    this.options = {
      ...i,
      ...this.options,
      ...zo(n)
    }, this.options.compatibilityAPI !== "v1" && (this.options.interpolation = {
      ...i.interpolation,
      ...this.options.interpolation
    }), n.keySeparator !== void 0 && (this.options.userDefinedKeySeparator = n.keySeparator), n.nsSeparator !== void 0 && (this.options.userDefinedNsSeparator = n.nsSeparator);
    function a(h) {
      return h ? typeof h == "function" ? new h() : h : null;
    }
    if (!this.options.isClone) {
      this.modules.logger ? ht.init(a(this.modules.logger), this.options) : ht.init(null, this.options);
      let h;
      this.modules.formatter ? h = this.modules.formatter : typeof Intl < "u" && (h = kf);
      const c = new Mo(this.options);
      this.store = new Io(this.options.resources, this.options);
      const s = this.services;
      s.logger = ht, s.resourceStore = this.store, s.languageUtils = c, s.pluralResolver = new Sf(c, {
        prepend: this.options.pluralSeparator,
        compatibilityJSON: this.options.compatibilityJSON,
        simplifyPluralSuffix: this.options.simplifyPluralSuffix
      }), h && (!this.options.interpolation.format || this.options.interpolation.format === i.interpolation.format) && (s.formatter = a(h), s.formatter.init(s, this.options), this.options.interpolation.format = s.formatter.format.bind(s.formatter)), s.interpolator = new Nf(this.options), s.utils = {
        hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
      }, s.backendConnector = new jf(a(this.modules.backend), s.resourceStore, s, this.options), s.backendConnector.on("*", function(d) {
        for (var y = arguments.length, m = new Array(y > 1 ? y - 1 : 0), b = 1; b < y; b++)
          m[b - 1] = arguments[b];
        t.emit(d, ...m);
      }), this.modules.languageDetector && (s.languageDetector = a(this.modules.languageDetector), s.languageDetector.init && s.languageDetector.init(s, this.options.detection, this.options)), this.modules.i18nFormat && (s.i18nFormat = a(this.modules.i18nFormat), s.i18nFormat.init && s.i18nFormat.init(this)), this.translator = new Rr(this.services, this.options), this.translator.on("*", function(d) {
        for (var y = arguments.length, m = new Array(y > 1 ? y - 1 : 0), b = 1; b < y; b++)
          m[b - 1] = arguments[b];
        t.emit(d, ...m);
      }), this.modules.external.forEach((d) => {
        d.init && d.init(this);
      });
    }
    if (this.format = this.options.interpolation.format, r || (r = er), this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
      const h = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
      h.length > 0 && h[0] !== "dev" && (this.options.lng = h[0]);
    }
    !this.services.languageDetector && !this.options.lng && this.logger.warn("init: no languageDetector is used and no lng is defined"), ["getResource", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"].forEach((h) => {
      this[h] = function() {
        return t.store[h](...arguments);
      };
    }), ["addResource", "addResources", "addResourceBundle", "removeResourceBundle"].forEach((h) => {
      this[h] = function() {
        return t.store[h](...arguments), t;
      };
    });
    const u = Pn(), f = () => {
      const h = (c, s) => {
        this.isInitialized && !this.initializedStoreOnce && this.logger.warn("init: i18next is already initialized. You should call init just once!"), this.isInitialized = !0, this.options.isClone || this.logger.log("initialized", this.options), this.emit("initialized", this.options), u.resolve(s), r(c, s);
      };
      if (this.languages && this.options.compatibilityAPI !== "v1" && !this.isInitialized)
        return h(null, this.t.bind(this));
      this.changeLanguage(this.options.lng, h);
    };
    return this.options.resources || !this.options.initImmediate ? f() : setTimeout(f, 0), u;
  }
  loadResources(t) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : er;
    const i = typeof t == "string" ? t : this.language;
    if (typeof t == "function" && (r = t), !this.options.resources || this.options.partialBundledLanguages) {
      if (i && i.toLowerCase() === "cimode")
        return r();
      const a = [], o = (l) => {
        if (!l)
          return;
        this.services.languageUtils.toResolveHierarchy(l).forEach((f) => {
          a.indexOf(f) < 0 && a.push(f);
        });
      };
      i ? o(i) : this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((u) => o(u)), this.options.preload && this.options.preload.forEach((l) => o(l)), this.services.backendConnector.load(a, this.options.ns, (l) => {
        !l && !this.resolvedLanguage && this.language && this.setResolvedLanguage(this.language), r(l);
      });
    } else
      r(null);
  }
  reloadResources(t, n, r) {
    const i = Pn();
    return t || (t = this.languages), n || (n = this.options.ns), r || (r = er), this.services.backendConnector.reload(t, n, (a) => {
      i.resolve(), r(a);
    }), i;
  }
  use(t) {
    if (!t)
      throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
    if (!t.type)
      throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
    return t.type === "backend" && (this.modules.backend = t), (t.type === "logger" || t.log && t.warn && t.error) && (this.modules.logger = t), t.type === "languageDetector" && (this.modules.languageDetector = t), t.type === "i18nFormat" && (this.modules.i18nFormat = t), t.type === "postProcessor" && iu.addPostProcessor(t), t.type === "formatter" && (this.modules.formatter = t), t.type === "3rdParty" && this.modules.external.push(t), this;
  }
  setResolvedLanguage(t) {
    if (!(!t || !this.languages) && !(["cimode", "dev"].indexOf(t) > -1))
      for (let n = 0; n < this.languages.length; n++) {
        const r = this.languages[n];
        if (!(["cimode", "dev"].indexOf(r) > -1) && this.store.hasLanguageSomeTranslations(r)) {
          this.resolvedLanguage = r;
          break;
        }
      }
  }
  changeLanguage(t, n) {
    var r = this;
    this.isLanguageChangingTo = t;
    const i = Pn();
    this.emit("languageChanging", t);
    const a = (u) => {
      this.language = u, this.languages = this.services.languageUtils.toResolveHierarchy(u), this.resolvedLanguage = void 0, this.setResolvedLanguage(u);
    }, o = (u, f) => {
      f ? (a(f), this.translator.changeLanguage(f), this.isLanguageChangingTo = void 0, this.emit("languageChanged", f), this.logger.log("languageChanged", f)) : this.isLanguageChangingTo = void 0, i.resolve(function() {
        return r.t(...arguments);
      }), n && n(u, function() {
        return r.t(...arguments);
      });
    }, l = (u) => {
      !t && !u && this.services.languageDetector && (u = []);
      const f = typeof u == "string" ? u : this.services.languageUtils.getBestMatchFromCodes(u);
      f && (this.language || a(f), this.translator.language || this.translator.changeLanguage(f), this.services.languageDetector && this.services.languageDetector.cacheUserLanguage && this.services.languageDetector.cacheUserLanguage(f)), this.loadResources(f, (h) => {
        o(h, f);
      });
    };
    return !t && this.services.languageDetector && !this.services.languageDetector.async ? l(this.services.languageDetector.detect()) : !t && this.services.languageDetector && this.services.languageDetector.async ? this.services.languageDetector.detect.length === 0 ? this.services.languageDetector.detect().then(l) : this.services.languageDetector.detect(l) : l(t), i;
  }
  getFixedT(t, n, r) {
    var i = this;
    const a = function(o, l) {
      let u;
      if (typeof l != "object") {
        for (var f = arguments.length, h = new Array(f > 2 ? f - 2 : 0), c = 2; c < f; c++)
          h[c - 2] = arguments[c];
        u = i.options.overloadTranslationOptionHandler([o, l].concat(h));
      } else
        u = {
          ...l
        };
      u.lng = u.lng || a.lng, u.lngs = u.lngs || a.lngs, u.ns = u.ns || a.ns, u.keyPrefix = u.keyPrefix || r || a.keyPrefix;
      const s = i.options.keySeparator || ".";
      let d;
      return u.keyPrefix && Array.isArray(o) ? d = o.map((y) => `${u.keyPrefix}${s}${y}`) : d = u.keyPrefix ? `${u.keyPrefix}${s}${o}` : o, i.t(d, u);
    };
    return typeof t == "string" ? a.lng = t : a.lngs = t, a.ns = n, a.keyPrefix = r, a;
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
    let n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages), !1;
    if (!this.languages || !this.languages.length)
      return this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages), !1;
    const r = n.lng || this.resolvedLanguage || this.languages[0], i = this.options ? this.options.fallbackLng : !1, a = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode")
      return !0;
    const o = (l, u) => {
      const f = this.services.backendConnector.state[`${l}|${u}`];
      return f === -1 || f === 2;
    };
    if (n.precheck) {
      const l = n.precheck(this, o);
      if (l !== void 0)
        return l;
    }
    return !!(this.hasResourceBundle(r, t) || !this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages || o(r, t) && (!i || o(a, t)));
  }
  loadNamespaces(t, n) {
    const r = Pn();
    return this.options.ns ? (typeof t == "string" && (t = [t]), t.forEach((i) => {
      this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
    }), this.loadResources((i) => {
      r.resolve(), n && n(i);
    }), r) : (n && n(), Promise.resolve());
  }
  loadLanguages(t, n) {
    const r = Pn();
    typeof t == "string" && (t = [t]);
    const i = this.options.preload || [], a = t.filter((o) => i.indexOf(o) < 0);
    return a.length ? (this.options.preload = i.concat(a), this.loadResources((o) => {
      r.resolve(), n && n(o);
    }), r) : (n && n(), Promise.resolve());
  }
  dir(t) {
    if (t || (t = this.resolvedLanguage || (this.languages && this.languages.length > 0 ? this.languages[0] : this.language)), !t)
      return "rtl";
    const n = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ug", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam", "ckb"], r = this.services && this.services.languageUtils || new Mo($o());
    return n.indexOf(r.getLanguagePartFromCode(t)) > -1 || t.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
  }
  static createInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 ? arguments[1] : void 0;
    return new Bn(t, n);
  }
  cloneInstance() {
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : er;
    const r = t.forkResourceStore;
    r && delete t.forkResourceStore;
    const i = {
      ...this.options,
      ...t,
      isClone: !0
    }, a = new Bn(i);
    return (t.debug !== void 0 || t.prefix !== void 0) && (a.logger = a.logger.clone(t)), ["store", "services", "language"].forEach((l) => {
      a[l] = this[l];
    }), a.services = {
      ...this.services
    }, a.services.utils = {
      hasLoadedNamespace: a.hasLoadedNamespace.bind(a)
    }, r && (a.store = new Io(this.store.data, i), a.services.resourceStore = a.store), a.translator = new Rr(a.services, i), a.translator.on("*", function(l) {
      for (var u = arguments.length, f = new Array(u > 1 ? u - 1 : 0), h = 1; h < u; h++)
        f[h - 1] = arguments[h];
      a.emit(l, ...f);
    }), a.init(i, n), a.translator.options = i, a.translator.backendConnector.services.utils = {
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
const Ze = Bn.createInstance();
Ze.createInstance = Bn.createInstance;
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
var tt = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function au(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Cf() {
  if (console && console.warn) {
    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
      t[n] = arguments[n];
    typeof t[0] == "string" && (t[0] = `react-i18next:: ${t[0]}`), console.warn(...t);
  }
}
const Fo = {};
function Zi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  typeof t[0] == "string" && Fo[t[0]] || (typeof t[0] == "string" && (Fo[t[0]] = /* @__PURE__ */ new Date()), Cf(...t));
}
const ou = (e, t) => () => {
  if (e.isInitialized)
    t();
  else {
    const n = () => {
      setTimeout(() => {
        e.off("initialized", n);
      }, 0), t();
    };
    e.on("initialized", n);
  }
};
function Bo(e, t, n) {
  e.loadNamespaces(t, ou(e, n));
}
function qo(e, t, n, r) {
  typeof n == "string" && (n = [n]), n.forEach((i) => {
    e.options.ns.indexOf(i) < 0 && e.options.ns.push(i);
  }), e.loadLanguages(t, ou(e, r));
}
function If(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const r = t.languages[0], i = t.options ? t.options.fallbackLng : !1, a = t.languages[t.languages.length - 1];
  if (r.toLowerCase() === "cimode")
    return !0;
  const o = (l, u) => {
    const f = t.services.backendConnector.state[`${l}|${u}`];
    return f === -1 || f === 2;
  };
  return n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && t.services.backendConnector.backend && t.isLanguageChangingTo && !o(t.isLanguageChangingTo, e) ? !1 : !!(t.hasResourceBundle(r, e) || !t.services.backendConnector.backend || t.options.resources && !t.options.partialBundledLanguages || o(r, e) && (!i || o(a, e)));
}
function Lf(e, t) {
  let n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  return !t.languages || !t.languages.length ? (Zi("i18n.languages were undefined or empty", t.languages), !0) : t.options.ignoreJSONStructure !== void 0 ? t.hasLoadedNamespace(e, {
    lng: n.lng,
    precheck: (i, a) => {
      if (n.bindI18n && n.bindI18n.indexOf("languageChanging") > -1 && i.services.backendConnector.backend && i.isLanguageChangingTo && !a(i.isLanguageChangingTo, e))
        return !1;
    }
  }) : If(e, t, n);
}
const Mf = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g, Rf = {
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
}, Df = (e) => Rf[e], $f = (e) => e.replace(Mf, Df);
let Qi = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: !0,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: !0,
  unescape: $f
};
function zf() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  Qi = {
    ...Qi,
    ...e
  };
}
function Ff() {
  return Qi;
}
let su;
function Bf(e) {
  su = e;
}
function qf() {
  return su;
}
const Uf = {
  type: "3rdParty",
  init(e) {
    zf(e.options.react), Bf(e);
  }
}, Hf = tu();
class Wf {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(t) {
    t.forEach((n) => {
      this.usedNamespaces[n] || (this.usedNamespaces[n] = !0);
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
}
const Yf = (e, t) => {
  const n = Ce();
  return Le(() => {
    n.current = t ? n.current : e;
  }, [e, t]), n.current;
};
function Ht(e) {
  let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    i18n: n
  } = t, {
    i18n: r,
    defaultNS: i
  } = qa(Hf) || {}, a = n || r || qf();
  if (a && !a.reportNamespaces && (a.reportNamespaces = new Wf()), !a) {
    Zi("You will need to pass in an i18next instance by using initReactI18next");
    const w = (x, _) => typeof _ == "string" ? _ : _ && typeof _ == "object" && typeof _.defaultValue == "string" ? _.defaultValue : Array.isArray(x) ? x[x.length - 1] : x, p = [w, {}, !1];
    return p.t = w, p.i18n = {}, p.ready = !1, p;
  }
  a.options.react && a.options.react.wait !== void 0 && Zi("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const o = {
    ...Ff(),
    ...a.options.react,
    ...t
  }, {
    useSuspense: l,
    keyPrefix: u
  } = o;
  let f = e || i || a.options && a.options.defaultNS;
  f = typeof f == "string" ? [f] : f || ["translation"], a.reportNamespaces.addUsedNamespaces && a.reportNamespaces.addUsedNamespaces(f);
  const h = (a.isInitialized || a.initializedStoreOnce) && f.every((w) => Lf(w, a, o));
  function c() {
    return a.getFixedT(t.lng || null, o.nsMode === "fallback" ? f : f[0], u);
  }
  const [s, d] = Ge(c);
  let y = f.join();
  t.lng && (y = `${t.lng}${y}`);
  const m = Yf(y), b = Ce(!0);
  Le(() => {
    const {
      bindI18n: w,
      bindI18nStore: p
    } = o;
    b.current = !0, !h && !l && (t.lng ? qo(a, t.lng, f, () => {
      b.current && d(c);
    }) : Bo(a, f, () => {
      b.current && d(c);
    })), h && m && m !== y && b.current && d(c);
    function x() {
      b.current && d(c);
    }
    return w && a && a.on(w, x), p && a && a.store.on(p, x), () => {
      b.current = !1, w && a && w.split(" ").forEach((_) => a.off(_, x)), p && a && p.split(" ").forEach((_) => a.store.off(_, x));
    };
  }, [a, y]);
  const v = Ce(!0);
  Le(() => {
    b.current && !v.current && d(c), v.current = !1;
  }, [a, u]);
  const g = [s, a, h];
  if (g.t = s, g.i18n = a, g.ready = h, h || !h && !l)
    return g;
  throw new Promise((w) => {
    t.lng ? qo(a, t.lng, f, () => w()) : Bo(a, f, () => w());
  });
}
function Ew(e) {
  Ze.use(Uf).init(e);
}
var Xi = { exports: {} }, Cn = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uo;
function Vf() {
  if (Uo)
    return Cn;
  Uo = 1;
  var e = Ue, t = Symbol.for("react.element"), n = Symbol.for("react.fragment"), r = Object.prototype.hasOwnProperty, i = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function o(l, u, f) {
    var h, c = {}, s = null, d = null;
    f !== void 0 && (s = "" + f), u.key !== void 0 && (s = "" + u.key), u.ref !== void 0 && (d = u.ref);
    for (h in u)
      r.call(u, h) && !a.hasOwnProperty(h) && (c[h] = u[h]);
    if (l && l.defaultProps)
      for (h in u = l.defaultProps, u)
        c[h] === void 0 && (c[h] = u[h]);
    return { $$typeof: t, type: l, key: s, ref: d, props: c, _owner: i.current };
  }
  return Cn.Fragment = n, Cn.jsx = o, Cn.jsxs = o, Cn;
}
var In = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ho;
function Kf() {
  return Ho || (Ho = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Ue, t = Symbol.for("react.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.provider"), l = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), h = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), s = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), y = Symbol.iterator, m = "@@iterator";
    function b(F) {
      if (F === null || typeof F != "object")
        return null;
      var te = y && F[y] || F[m];
      return typeof te == "function" ? te : null;
    }
    var v = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function g(F) {
      {
        for (var te = arguments.length, ae = new Array(te > 1 ? te - 1 : 0), fe = 1; fe < te; fe++)
          ae[fe - 1] = arguments[fe];
        w("error", F, ae);
      }
    }
    function w(F, te, ae) {
      {
        var fe = v.ReactDebugCurrentFrame, Ee = fe.getStackAddendum();
        Ee !== "" && (te += "%s", ae = ae.concat([Ee]));
        var ke = ae.map(function(we) {
          return String(we);
        });
        ke.unshift("Warning: " + te), Function.prototype.apply.call(console[F], console, ke);
      }
    }
    var p = !1, x = !1, _ = !1, E = !1, k = !1, j;
    j = Symbol.for("react.module.reference");
    function S(F) {
      return !!(typeof F == "string" || typeof F == "function" || F === r || F === a || k || F === i || F === f || F === h || E || F === d || p || x || _ || typeof F == "object" && F !== null && (F.$$typeof === s || F.$$typeof === c || F.$$typeof === o || F.$$typeof === l || F.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      F.$$typeof === j || F.getModuleId !== void 0));
    }
    function O(F, te, ae) {
      var fe = F.displayName;
      if (fe)
        return fe;
      var Ee = te.displayName || te.name || "";
      return Ee !== "" ? ae + "(" + Ee + ")" : ae;
    }
    function N(F) {
      return F.displayName || "Context";
    }
    function T(F) {
      if (F == null)
        return null;
      if (typeof F.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof F == "function")
        return F.displayName || F.name || null;
      if (typeof F == "string")
        return F;
      switch (F) {
        case r:
          return "Fragment";
        case n:
          return "Portal";
        case a:
          return "Profiler";
        case i:
          return "StrictMode";
        case f:
          return "Suspense";
        case h:
          return "SuspenseList";
      }
      if (typeof F == "object")
        switch (F.$$typeof) {
          case l:
            var te = F;
            return N(te) + ".Consumer";
          case o:
            var ae = F;
            return N(ae._context) + ".Provider";
          case u:
            return O(F, F.render, "ForwardRef");
          case c:
            var fe = F.displayName || null;
            return fe !== null ? fe : T(F.type) || "Memo";
          case s: {
            var Ee = F, ke = Ee._payload, we = Ee._init;
            try {
              return T(we(ke));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var C = Object.assign, D = 0, H, U, K, q, P, A, M;
    function R() {
    }
    R.__reactDisabledLog = !0;
    function z() {
      {
        if (D === 0) {
          H = console.log, U = console.info, K = console.warn, q = console.error, P = console.group, A = console.groupCollapsed, M = console.groupEnd;
          var F = {
            configurable: !0,
            enumerable: !0,
            value: R,
            writable: !0
          };
          Object.defineProperties(console, {
            info: F,
            log: F,
            warn: F,
            error: F,
            group: F,
            groupCollapsed: F,
            groupEnd: F
          });
        }
        D++;
      }
    }
    function B() {
      {
        if (D--, D === 0) {
          var F = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: C({}, F, {
              value: H
            }),
            info: C({}, F, {
              value: U
            }),
            warn: C({}, F, {
              value: K
            }),
            error: C({}, F, {
              value: q
            }),
            group: C({}, F, {
              value: P
            }),
            groupCollapsed: C({}, F, {
              value: A
            }),
            groupEnd: C({}, F, {
              value: M
            })
          });
        }
        D < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var I = v.ReactCurrentDispatcher, $;
    function W(F, te, ae) {
      {
        if ($ === void 0)
          try {
            throw Error();
          } catch (Ee) {
            var fe = Ee.stack.trim().match(/\n( *(at )?)/);
            $ = fe && fe[1] || "";
          }
        return `
` + $ + F;
      }
    }
    var Y = !1, V;
    {
      var ee = typeof WeakMap == "function" ? WeakMap : Map;
      V = new ee();
    }
    function Z(F, te) {
      if (!F || Y)
        return "";
      {
        var ae = V.get(F);
        if (ae !== void 0)
          return ae;
      }
      var fe;
      Y = !0;
      var Ee = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var ke;
      ke = I.current, I.current = null, z();
      try {
        if (te) {
          var we = function() {
            throw Error();
          };
          if (Object.defineProperty(we.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(we, []);
            } catch (vt) {
              fe = vt;
            }
            Reflect.construct(F, [], we);
          } else {
            try {
              we.call();
            } catch (vt) {
              fe = vt;
            }
            F.call(we.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (vt) {
            fe = vt;
          }
          F();
        }
      } catch (vt) {
        if (vt && fe && typeof vt.stack == "string") {
          for (var be = vt.stack.split(`
`), Qe = fe.stack.split(`
`), ze = be.length - 1, Fe = Qe.length - 1; ze >= 1 && Fe >= 0 && be[ze] !== Qe[Fe]; )
            Fe--;
          for (; ze >= 1 && Fe >= 0; ze--, Fe--)
            if (be[ze] !== Qe[Fe]) {
              if (ze !== 1 || Fe !== 1)
                do
                  if (ze--, Fe--, Fe < 0 || be[ze] !== Qe[Fe]) {
                    var it = `
` + be[ze].replace(" at new ", " at ");
                    return F.displayName && it.includes("<anonymous>") && (it = it.replace("<anonymous>", F.displayName)), typeof F == "function" && V.set(F, it), it;
                  }
                while (ze >= 1 && Fe >= 0);
              break;
            }
        }
      } finally {
        Y = !1, I.current = ke, B(), Error.prepareStackTrace = Ee;
      }
      var Vt = F ? F.displayName || F.name : "", To = Vt ? W(Vt) : "";
      return typeof F == "function" && V.set(F, To), To;
    }
    function le(F, te, ae) {
      return Z(F, !1);
    }
    function ce(F) {
      var te = F.prototype;
      return !!(te && te.isReactComponent);
    }
    function he(F, te, ae) {
      if (F == null)
        return "";
      if (typeof F == "function")
        return Z(F, ce(F));
      if (typeof F == "string")
        return W(F);
      switch (F) {
        case f:
          return W("Suspense");
        case h:
          return W("SuspenseList");
      }
      if (typeof F == "object")
        switch (F.$$typeof) {
          case u:
            return le(F.render);
          case c:
            return he(F.type, te, ae);
          case s: {
            var fe = F, Ee = fe._payload, ke = fe._init;
            try {
              return he(ke(Ee), te, ae);
            } catch {
            }
          }
        }
      return "";
    }
    var Ae = Object.prototype.hasOwnProperty, Oe = {}, G = v.ReactDebugCurrentFrame;
    function Q(F) {
      if (F) {
        var te = F._owner, ae = he(F.type, F._source, te ? te.type : null);
        G.setExtraStackFrame(ae);
      } else
        G.setExtraStackFrame(null);
    }
    function re(F, te, ae, fe, Ee) {
      {
        var ke = Function.call.bind(Ae);
        for (var we in F)
          if (ke(F, we)) {
            var be = void 0;
            try {
              if (typeof F[we] != "function") {
                var Qe = Error((fe || "React class") + ": " + ae + " type `" + we + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof F[we] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Qe.name = "Invariant Violation", Qe;
              }
              be = F[we](te, we, fe, ae, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ze) {
              be = ze;
            }
            be && !(be instanceof Error) && (Q(Ee), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", fe || "React class", ae, we, typeof be), Q(null)), be instanceof Error && !(be.message in Oe) && (Oe[be.message] = !0, Q(Ee), g("Failed %s type: %s", ae, be.message), Q(null));
          }
      }
    }
    var ie = Array.isArray;
    function J(F) {
      return ie(F);
    }
    function de(F) {
      {
        var te = typeof Symbol == "function" && Symbol.toStringTag, ae = te && F[Symbol.toStringTag] || F.constructor.name || "Object";
        return ae;
      }
    }
    function X(F) {
      try {
        return ne(F), !1;
      } catch {
        return !0;
      }
    }
    function ne(F) {
      return "" + F;
    }
    function ge(F) {
      if (X(F))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", de(F)), ne(F);
    }
    var ye = v.ReactCurrentOwner, pe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, rt, xe, He;
    He = {};
    function _n(F) {
      if (Ae.call(F, "ref")) {
        var te = Object.getOwnPropertyDescriptor(F, "ref").get;
        if (te && te.isReactWarning)
          return !1;
      }
      return F.ref !== void 0;
    }
    function Sn(F) {
      if (Ae.call(F, "key")) {
        var te = Object.getOwnPropertyDescriptor(F, "key").get;
        if (te && te.isReactWarning)
          return !1;
      }
      return F.key !== void 0;
    }
    function Wt(F, te) {
      if (typeof F.ref == "string" && ye.current && te && ye.current.stateNode !== te) {
        var ae = T(ye.current.type);
        He[ae] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', T(ye.current.type), F.ref), He[ae] = !0);
      }
    }
    function Nn(F, te) {
      {
        var ae = function() {
          rt || (rt = !0, g("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
        };
        ae.isReactWarning = !0, Object.defineProperty(F, "key", {
          get: ae,
          configurable: !0
        });
      }
    }
    function An(F, te) {
      {
        var ae = function() {
          xe || (xe = !0, g("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", te));
        };
        ae.isReactWarning = !0, Object.defineProperty(F, "ref", {
          get: ae,
          configurable: !0
        });
      }
    }
    var kn = function(F, te, ae, fe, Ee, ke, we) {
      var be = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: F,
        key: te,
        ref: ae,
        props: we,
        // Record the component responsible for creating this element.
        _owner: ke
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
    function Tn(F, te, ae, fe, Ee) {
      {
        var ke, we = {}, be = null, Qe = null;
        ae !== void 0 && (ge(ae), be = "" + ae), Sn(te) && (ge(te.key), be = "" + te.key), _n(te) && (Qe = te.ref, Wt(te, Ee));
        for (ke in te)
          Ae.call(te, ke) && !pe.hasOwnProperty(ke) && (we[ke] = te[ke]);
        if (F && F.defaultProps) {
          var ze = F.defaultProps;
          for (ke in ze)
            we[ke] === void 0 && (we[ke] = ze[ke]);
        }
        if (be || Qe) {
          var Fe = typeof F == "function" ? F.displayName || F.name || "Unknown" : F;
          be && Nn(we, Fe), Qe && An(we, Fe);
        }
        return kn(F, be, Qe, Ee, fe, ye.current, we);
      }
    }
    var jn = v.ReactCurrentOwner, Eo = v.ReactDebugCurrentFrame;
    function Yt(F) {
      if (F) {
        var te = F._owner, ae = he(F.type, F._source, te ? te.type : null);
        Eo.setExtraStackFrame(ae);
      } else
        Eo.setExtraStackFrame(null);
    }
    var wi;
    wi = !1;
    function Oi(F) {
      return typeof F == "object" && F !== null && F.$$typeof === t;
    }
    function _o() {
      {
        if (jn.current) {
          var F = T(jn.current.type);
          if (F)
            return `

Check the render method of \`` + F + "`.";
        }
        return "";
      }
    }
    function Qc(F) {
      {
        if (F !== void 0) {
          var te = F.fileName.replace(/^.*[\\\/]/, ""), ae = F.lineNumber;
          return `

Check your code at ` + te + ":" + ae + ".";
        }
        return "";
      }
    }
    var So = {};
    function Xc(F) {
      {
        var te = _o();
        if (!te) {
          var ae = typeof F == "string" ? F : F.displayName || F.name;
          ae && (te = `

Check the top-level render call using <` + ae + ">.");
        }
        return te;
      }
    }
    function No(F, te) {
      {
        if (!F._store || F._store.validated || F.key != null)
          return;
        F._store.validated = !0;
        var ae = Xc(te);
        if (So[ae])
          return;
        So[ae] = !0;
        var fe = "";
        F && F._owner && F._owner !== jn.current && (fe = " It was passed a child from " + T(F._owner.type) + "."), Yt(F), g('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ae, fe), Yt(null);
      }
    }
    function Ao(F, te) {
      {
        if (typeof F != "object")
          return;
        if (J(F))
          for (var ae = 0; ae < F.length; ae++) {
            var fe = F[ae];
            Oi(fe) && No(fe, te);
          }
        else if (Oi(F))
          F._store && (F._store.validated = !0);
        else if (F) {
          var Ee = b(F);
          if (typeof Ee == "function" && Ee !== F.entries)
            for (var ke = Ee.call(F), we; !(we = ke.next()).done; )
              Oi(we.value) && No(we.value, te);
        }
      }
    }
    function Jc(F) {
      {
        var te = F.type;
        if (te == null || typeof te == "string")
          return;
        var ae;
        if (typeof te == "function")
          ae = te.propTypes;
        else if (typeof te == "object" && (te.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        te.$$typeof === c))
          ae = te.propTypes;
        else
          return;
        if (ae) {
          var fe = T(te);
          re(ae, F.props, "prop", fe, F);
        } else if (te.PropTypes !== void 0 && !wi) {
          wi = !0;
          var Ee = T(te);
          g("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ee || "Unknown");
        }
        typeof te.getDefaultProps == "function" && !te.getDefaultProps.isReactClassApproved && g("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ef(F) {
      {
        for (var te = Object.keys(F.props), ae = 0; ae < te.length; ae++) {
          var fe = te[ae];
          if (fe !== "children" && fe !== "key") {
            Yt(F), g("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", fe), Yt(null);
            break;
          }
        }
        F.ref !== null && (Yt(F), g("Invalid attribute `ref` supplied to `React.Fragment`."), Yt(null));
      }
    }
    function ko(F, te, ae, fe, Ee, ke) {
      {
        var we = S(F);
        if (!we) {
          var be = "";
          (F === void 0 || typeof F == "object" && F !== null && Object.keys(F).length === 0) && (be += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Qe = Qc(Ee);
          Qe ? be += Qe : be += _o();
          var ze;
          F === null ? ze = "null" : J(F) ? ze = "array" : F !== void 0 && F.$$typeof === t ? (ze = "<" + (T(F.type) || "Unknown") + " />", be = " Did you accidentally export a JSX literal instead of a component?") : ze = typeof F, g("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ze, be);
        }
        var Fe = Tn(F, te, ae, Ee, ke);
        if (Fe == null)
          return Fe;
        if (we) {
          var it = te.children;
          if (it !== void 0)
            if (fe)
              if (J(it)) {
                for (var Vt = 0; Vt < it.length; Vt++)
                  Ao(it[Vt], F);
                Object.freeze && Object.freeze(it);
              } else
                g("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ao(it, F);
        }
        return F === r ? ef(Fe) : Jc(Fe), Fe;
      }
    }
    function tf(F, te, ae) {
      return ko(F, te, ae, !0);
    }
    function nf(F, te, ae) {
      return ko(F, te, ae, !1);
    }
    var rf = nf, af = tf;
    In.Fragment = r, In.jsx = rf, In.jsxs = af;
  }()), In;
}
process.env.NODE_ENV === "production" ? Xi.exports = Vf() : Xi.exports = Kf();
var L = Xi.exports;
const Gf = {
  height: "8rem",
  backgroundSize: "contain"
}, _w = () => /* @__PURE__ */ L.jsx("div", { className: "bg-no-repeat w-screen absolute top-0 left-0 lg:hidden bg-banner", style: Gf }), Sw = ({
  onClick: e,
  type: t,
  marginRight: n = "0",
  marginLeft: r = "0",
  icon: i,
  iconComponent: a,
  text: o,
  disabled: l,
  width: u = "auto",
  paddingVertical: f = "0"
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: l,
    className: `text-center block w-${u} py-${f} mr-${n} ml-${r} py-2 px-4
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
), Nw = ({ text: e }) => /* @__PURE__ */ L.jsx("div", { className: "sm:w-3/4 bottom-0 | pt-8 sm:pb-2 | text-center", children: /* @__PURE__ */ L.jsx("span", { className: "block left-0 | text-gray font-normal text-xs", children: e }) });
var et = function() {
  return et = Object.assign || function(t) {
    for (var n, r = 1, i = arguments.length; r < i; r++) {
      n = arguments[r];
      for (var a in n)
        Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, et.apply(this, arguments);
};
function dn(e, t, n, r) {
  function i(a) {
    return a instanceof n ? a : new n(function(o) {
      o(a);
    });
  }
  return new (n || (n = Promise))(function(a, o) {
    function l(h) {
      try {
        f(r.next(h));
      } catch (c) {
        o(c);
      }
    }
    function u(h) {
      try {
        f(r.throw(h));
      } catch (c) {
        o(c);
      }
    }
    function f(h) {
      h.done ? a(h.value) : i(h.value).then(l, u);
    }
    f((r = r.apply(e, t || [])).next());
  });
}
function hn(e, t) {
  var n = { label: 0, sent: function() {
    if (a[0] & 1)
      throw a[1];
    return a[1];
  }, trys: [], ops: [] }, r, i, a, o;
  return o = { next: l(0), throw: l(1), return: l(2) }, typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function l(f) {
    return function(h) {
      return u([f, h]);
    };
  }
  function u(f) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, f[0] && (n = 0)), n; )
      try {
        if (r = 1, i && (a = f[0] & 2 ? i.return : f[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, f[1])).done)
          return a;
        switch (i = 0, a && (f = [f[0] & 2, a.value]), f[0]) {
          case 0:
          case 1:
            a = f;
            break;
          case 4:
            return n.label++, { value: f[1], done: !1 };
          case 5:
            n.label++, i = f[1], f = [0];
            continue;
          case 7:
            f = n.ops.pop(), n.trys.pop();
            continue;
          default:
            if (a = n.trys, !(a = a.length > 0 && a[a.length - 1]) && (f[0] === 6 || f[0] === 2)) {
              n = 0;
              continue;
            }
            if (f[0] === 3 && (!a || f[1] > a[0] && f[1] < a[3])) {
              n.label = f[1];
              break;
            }
            if (f[0] === 6 && n.label < a[1]) {
              n.label = a[1], a = f;
              break;
            }
            if (a && n.label < a[2]) {
              n.label = a[2], n.ops.push(f);
              break;
            }
            a[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        f = t.call(e, n);
      } catch (h) {
        f = [6, h], i = 0;
      } finally {
        r = a = 0;
      }
    if (f[0] & 5)
      throw f[1];
    return { value: f[0] ? f[1] : void 0, done: !0 };
  }
}
function Wo(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n)
    return e;
  var r = n.call(e), i, a = [], o;
  try {
    for (; (t === void 0 || t-- > 0) && !(i = r.next()).done; )
      a.push(i.value);
  } catch (l) {
    o = { error: l };
  } finally {
    try {
      i && !i.done && (n = r.return) && n.call(r);
    } finally {
      if (o)
        throw o.error;
    }
  }
  return a;
}
function At(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, i = t.length, a; r < i; r++)
      (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
function Zf(e) {
  var t = /* @__PURE__ */ Object.create(null);
  return function(n) {
    return t[n] === void 0 && (t[n] = e(n)), t[n];
  };
}
var Qf = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, Xf = /* @__PURE__ */ Zf(
  function(e) {
    return Qf.test(e) || e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91;
  }
  /* Z+1 */
), Te = "-ms-", $n = "-moz-", Ne = "-webkit-", lu = "comm", ei = "rule", Ha = "decl", Jf = "@import", uu = "@keyframes", ed = "@layer", td = Math.abs, Wa = String.fromCharCode, Ji = Object.assign;
function nd(e, t) {
  return Ke(e, 0) ^ 45 ? (((t << 2 ^ Ke(e, 0)) << 2 ^ Ke(e, 1)) << 2 ^ Ke(e, 2)) << 2 ^ Ke(e, 3) : 0;
}
function cu(e) {
  return e.trim();
}
function gt(e, t) {
  return (e = t.exec(e)) ? e[0] : e;
}
function me(e, t, n) {
  return e.replace(t, n);
}
function xr(e, t) {
  return e.indexOf(t);
}
function Ke(e, t) {
  return e.charCodeAt(t) | 0;
}
function an(e, t, n) {
  return e.slice(t, n);
}
function dt(e) {
  return e.length;
}
function fu(e) {
  return e.length;
}
function Rn(e, t) {
  return t.push(e), e;
}
function rd(e, t) {
  return e.map(t).join("");
}
function Yo(e, t) {
  return e.filter(function(n) {
    return !gt(n, t);
  });
}
var ti = 1, on = 1, du = 0, at = 0, qe = 0, pn = "";
function ni(e, t, n, r, i, a, o, l) {
  return { value: e, root: t, parent: n, type: r, props: i, children: a, line: ti, column: on, length: o, return: "", siblings: l };
}
function _t(e, t) {
  return Ji(ni("", null, null, "", null, null, 0, e.siblings), e, { length: -e.length }, t);
}
function Zt(e) {
  for (; e.root; )
    e = _t(e.root, { children: [e] });
  Rn(e, e.siblings);
}
function id() {
  return qe;
}
function ad() {
  return qe = at > 0 ? Ke(pn, --at) : 0, on--, qe === 10 && (on = 1, ti--), qe;
}
function ut() {
  return qe = at < du ? Ke(pn, at++) : 0, on++, qe === 10 && (on = 1, ti++), qe;
}
function $t() {
  return Ke(pn, at);
}
function wr() {
  return at;
}
function ri(e, t) {
  return an(pn, e, t);
}
function ea(e) {
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
function od(e) {
  return ti = on = 1, du = dt(pn = e), at = 0, [];
}
function sd(e) {
  return pn = "", e;
}
function _i(e) {
  return cu(ri(at - 1, ta(e === 91 ? e + 2 : e === 40 ? e + 1 : e)));
}
function ld(e) {
  for (; (qe = $t()) && qe < 33; )
    ut();
  return ea(e) > 2 || ea(qe) > 3 ? "" : " ";
}
function ud(e, t) {
  for (; --t && ut() && !(qe < 48 || qe > 102 || qe > 57 && qe < 65 || qe > 70 && qe < 97); )
    ;
  return ri(e, wr() + (t < 6 && $t() == 32 && ut() == 32));
}
function ta(e) {
  for (; ut(); )
    switch (qe) {
      case e:
        return at;
      case 34:
      case 39:
        e !== 34 && e !== 39 && ta(qe);
        break;
      case 40:
        e === 41 && ta(e);
        break;
      case 92:
        ut();
        break;
    }
  return at;
}
function cd(e, t) {
  for (; ut() && e + qe !== 47 + 10; )
    if (e + qe === 42 + 42 && $t() === 47)
      break;
  return "/*" + ri(t, at - 1) + "*" + Wa(e === 47 ? e : ut());
}
function fd(e) {
  for (; !ea($t()); )
    ut();
  return ri(e, at);
}
function dd(e) {
  return sd(Or("", null, null, null, [""], e = od(e), 0, [0], e));
}
function Or(e, t, n, r, i, a, o, l, u) {
  for (var f = 0, h = 0, c = o, s = 0, d = 0, y = 0, m = 1, b = 1, v = 1, g = 0, w = "", p = i, x = a, _ = r, E = w; b; )
    switch (y = g, g = ut()) {
      case 40:
        if (y != 108 && Ke(E, c - 1) == 58) {
          xr(E += me(_i(g), "&", "&\f"), "&\f") != -1 && (v = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        E += _i(g);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        E += ld(y);
        break;
      case 92:
        E += ud(wr() - 1, 7);
        continue;
      case 47:
        switch ($t()) {
          case 42:
          case 47:
            Rn(hd(cd(ut(), wr()), t, n, u), u);
            break;
          default:
            E += "/";
        }
        break;
      case 123 * m:
        l[f++] = dt(E) * v;
      case 125 * m:
      case 59:
      case 0:
        switch (g) {
          case 0:
          case 125:
            b = 0;
          case 59 + h:
            v == -1 && (E = me(E, /\f/g, "")), d > 0 && dt(E) - c && Rn(d > 32 ? Ko(E + ";", r, n, c - 1, u) : Ko(me(E, " ", "") + ";", r, n, c - 2, u), u);
            break;
          case 59:
            E += ";";
          default:
            if (Rn(_ = Vo(E, t, n, f, h, i, l, w, p = [], x = [], c, a), a), g === 123)
              if (h === 0)
                Or(E, t, _, _, p, a, c, l, x);
              else
                switch (s === 99 && Ke(E, 3) === 110 ? 100 : s) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Or(e, _, _, r && Rn(Vo(e, _, _, 0, 0, i, l, w, i, p = [], c, x), x), i, x, c, l, r ? p : x);
                    break;
                  default:
                    Or(E, _, _, _, [""], x, 0, l, x);
                }
        }
        f = h = d = 0, m = v = 1, w = E = "", c = o;
        break;
      case 58:
        c = 1 + dt(E), d = y;
      default:
        if (m < 1) {
          if (g == 123)
            --m;
          else if (g == 125 && m++ == 0 && ad() == 125)
            continue;
        }
        switch (E += Wa(g), g * m) {
          case 38:
            v = h > 0 ? 1 : (E += "\f", -1);
            break;
          case 44:
            l[f++] = (dt(E) - 1) * v, v = 1;
            break;
          case 64:
            $t() === 45 && (E += _i(ut())), s = $t(), h = c = dt(w = E += fd(wr())), g++;
            break;
          case 45:
            y === 45 && dt(E) == 2 && (m = 0);
        }
    }
  return a;
}
function Vo(e, t, n, r, i, a, o, l, u, f, h, c) {
  for (var s = i - 1, d = i === 0 ? a : [""], y = fu(d), m = 0, b = 0, v = 0; m < r; ++m)
    for (var g = 0, w = an(e, s + 1, s = td(b = o[m])), p = e; g < y; ++g)
      (p = cu(b > 0 ? d[g] + " " + w : me(w, /&\f/g, d[g]))) && (u[v++] = p);
  return ni(e, t, n, i === 0 ? ei : l, u, f, h, c);
}
function hd(e, t, n, r) {
  return ni(e, t, n, lu, Wa(id()), an(e, 2, -2), 0, r);
}
function Ko(e, t, n, r, i) {
  return ni(e, t, n, Ha, an(e, 0, r), an(e, r + 1, -1), r, i);
}
function hu(e, t, n) {
  switch (nd(e, t)) {
    case 5103:
      return Ne + "print-" + e + e;
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
      return Ne + e + e;
    case 4789:
      return $n + e + e;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return Ne + e + $n + e + Te + e + e;
    case 5936:
      switch (Ke(e, t + 11)) {
        case 114:
          return Ne + e + Te + me(e, /[svh]\w+-[tblr]{2}/, "tb") + e;
        case 108:
          return Ne + e + Te + me(e, /[svh]\w+-[tblr]{2}/, "tb-rl") + e;
        case 45:
          return Ne + e + Te + me(e, /[svh]\w+-[tblr]{2}/, "lr") + e;
      }
    case 6828:
    case 4268:
    case 2903:
      return Ne + e + Te + e + e;
    case 6165:
      return Ne + e + Te + "flex-" + e + e;
    case 5187:
      return Ne + e + me(e, /(\w+).+(:[^]+)/, Ne + "box-$1$2" + Te + "flex-$1$2") + e;
    case 5443:
      return Ne + e + Te + "flex-item-" + me(e, /flex-|-self/g, "") + (gt(e, /flex-|baseline/) ? "" : Te + "grid-row-" + me(e, /flex-|-self/g, "")) + e;
    case 4675:
      return Ne + e + Te + "flex-line-pack" + me(e, /align-content|flex-|-self/g, "") + e;
    case 5548:
      return Ne + e + Te + me(e, "shrink", "negative") + e;
    case 5292:
      return Ne + e + Te + me(e, "basis", "preferred-size") + e;
    case 6060:
      return Ne + "box-" + me(e, "-grow", "") + Ne + e + Te + me(e, "grow", "positive") + e;
    case 4554:
      return Ne + me(e, /([^-])(transform)/g, "$1" + Ne + "$2") + e;
    case 6187:
      return me(me(me(e, /(zoom-|grab)/, Ne + "$1"), /(image-set)/, Ne + "$1"), e, "") + e;
    case 5495:
    case 3959:
      return me(e, /(image-set\([^]*)/, Ne + "$1$`$1");
    case 4968:
      return me(me(e, /(.+:)(flex-)?(.*)/, Ne + "box-pack:$3" + Te + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + Ne + e + e;
    case 4200:
      if (!gt(e, /flex-|baseline/))
        return Te + "grid-column-align" + an(e, t) + e;
      break;
    case 2592:
    case 3360:
      return Te + me(e, "template-", "") + e;
    case 4384:
    case 3616:
      return n && n.some(function(r, i) {
        return t = i, gt(r.props, /grid-\w+-end/);
      }) ? ~xr(e + (n = n[t].value), "span") ? e : Te + me(e, "-start", "") + e + Te + "grid-row-span:" + (~xr(n, "span") ? gt(n, /\d+/) : +gt(n, /\d+/) - +gt(e, /\d+/)) + ";" : Te + me(e, "-start", "") + e;
    case 4896:
    case 4128:
      return n && n.some(function(r) {
        return gt(r.props, /grid-\w+-start/);
      }) ? e : Te + me(me(e, "-end", "-span"), "span ", "") + e;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return me(e, /(.+)-inline(.+)/, Ne + "$1$2") + e;
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
      if (dt(e) - 1 - t > 6)
        switch (Ke(e, t + 1)) {
          case 109:
            if (Ke(e, t + 4) !== 45)
              break;
          case 102:
            return me(e, /(.+:)(.+)-([^]+)/, "$1" + Ne + "$2-$3$1" + $n + (Ke(e, t + 3) == 108 ? "$3" : "$2-$3")) + e;
          case 115:
            return ~xr(e, "stretch") ? hu(me(e, "stretch", "fill-available"), t, n) + e : e;
        }
      break;
    case 5152:
    case 5920:
      return me(e, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(r, i, a, o, l, u, f) {
        return Te + i + ":" + a + f + (o ? Te + i + "-span:" + (l ? u : +u - +a) + f : "") + e;
      });
    case 4949:
      if (Ke(e, t + 6) === 121)
        return me(e, ":", ":" + Ne) + e;
      break;
    case 6444:
      switch (Ke(e, Ke(e, 14) === 45 ? 18 : 11)) {
        case 120:
          return me(e, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + Ne + (Ke(e, 14) === 45 ? "inline-" : "") + "box$3$1" + Ne + "$2$3$1" + Te + "$2box$3") + e;
        case 100:
          return me(e, ":", ":" + Te) + e;
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
function Dr(e, t) {
  for (var n = "", r = 0; r < e.length; r++)
    n += t(e[r], r, e, t) || "";
  return n;
}
function pd(e, t, n, r) {
  switch (e.type) {
    case ed:
      if (e.children.length)
        break;
    case Jf:
    case Ha:
      return e.return = e.return || e.value;
    case lu:
      return "";
    case uu:
      return e.return = e.value + "{" + Dr(e.children, r) + "}";
    case ei:
      if (!dt(e.value = e.props.join(",")))
        return "";
  }
  return dt(n = Dr(e.children, r)) ? e.return = e.value + "{" + n + "}" : "";
}
function vd(e) {
  var t = fu(e);
  return function(n, r, i, a) {
    for (var o = "", l = 0; l < t; l++)
      o += e[l](n, r, i, a) || "";
    return o;
  };
}
function gd(e) {
  return function(t) {
    t.root || (t = t.return) && e(t);
  };
}
function md(e, t, n, r) {
  if (e.length > -1 && !e.return)
    switch (e.type) {
      case Ha:
        e.return = hu(e.value, e.length, n);
        return;
      case uu:
        return Dr([_t(e, { value: me(e.value, "@", "@" + Ne) })], r);
      case ei:
        if (e.length)
          return rd(n = e.props, function(i) {
            switch (gt(i, r = /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                Zt(_t(e, { props: [me(i, /:(read-\w+)/, ":" + $n + "$1")] })), Zt(_t(e, { props: [i] })), Ji(e, { props: Yo(n, r) });
                break;
              case "::placeholder":
                Zt(_t(e, { props: [me(i, /:(plac\w+)/, ":" + Ne + "input-$1")] })), Zt(_t(e, { props: [me(i, /:(plac\w+)/, ":" + $n + "$1")] })), Zt(_t(e, { props: [me(i, /:(plac\w+)/, Te + "input-$1")] })), Zt(_t(e, { props: [i] })), Ji(e, { props: Yo(n, r) });
                break;
            }
            return "";
          });
    }
}
var yd = {
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
}, Ft = typeof process < "u" && process.env !== void 0 && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || "data-styled", Ya = typeof window < "u" && "HTMLElement" in window, bd = !!(typeof SC_DISABLE_SPEEDY == "boolean" ? SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== void 0 && process.env.REACT_APP_SC_DISABLE_SPEEDY !== "" ? process.env.REACT_APP_SC_DISABLE_SPEEDY !== "false" && process.env.REACT_APP_SC_DISABLE_SPEEDY : typeof process < "u" && process.env !== void 0 && process.env.SC_DISABLE_SPEEDY !== void 0 && process.env.SC_DISABLE_SPEEDY !== "" ? process.env.SC_DISABLE_SPEEDY !== "false" && process.env.SC_DISABLE_SPEEDY : process.env.NODE_ENV !== "production"), Go = /invalid hook call/i, tr = /* @__PURE__ */ new Set(), xd = function(e, t) {
  if (process.env.NODE_ENV !== "production") {
    var n = t ? ' with the id of "'.concat(t, '"') : "", r = "The component ".concat(e).concat(n, ` has been created dynamically.
`) + `You may see this warning because you've called styled inside another component.
To resolve this only create new StyledComponents outside of any render method and function component.`, i = console.error;
    try {
      var a = !0;
      console.error = function(o) {
        for (var l = [], u = 1; u < arguments.length; u++)
          l[u - 1] = arguments[u];
        Go.test(o) ? (a = !1, tr.delete(r)) : i.apply(void 0, At([o], l, !1));
      }, Ce(), a && !tr.has(r) && (console.warn(r), tr.add(r));
    } catch (o) {
      Go.test(o.message) && tr.delete(r);
    } finally {
      console.error = i;
    }
  }
}, ii = Object.freeze([]), sn = Object.freeze({});
function wd(e, t, n) {
  return n === void 0 && (n = sn), e.theme !== n.theme && e.theme || t || n.theme;
}
var na = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), Od = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g, Ed = /(^-|-$)/g;
function Zo(e) {
  return e.replace(Od, "-").replace(Ed, "");
}
var _d = /(a)(d)/gi, Qo = function(e) {
  return String.fromCharCode(e + (e > 25 ? 39 : 97));
};
function ra(e) {
  var t, n = "";
  for (t = Math.abs(e); t > 52; t = t / 52 | 0)
    n = Qo(t % 52) + n;
  return (Qo(t % 52) + n).replace(_d, "$1-$2");
}
var Si, It = function(e, t) {
  for (var n = t.length; n; )
    e = 33 * e ^ t.charCodeAt(--n);
  return e;
}, pu = function(e) {
  return It(5381, e);
};
function Sd(e) {
  return ra(pu(e) >>> 0);
}
function vu(e) {
  return process.env.NODE_ENV !== "production" && typeof e == "string" && e || e.displayName || e.name || "Component";
}
function Ni(e) {
  return typeof e == "string" && (process.env.NODE_ENV === "production" || e.charAt(0) === e.charAt(0).toLowerCase());
}
var gu = typeof Symbol == "function" && Symbol.for, mu = gu ? Symbol.for("react.memo") : 60115, Nd = gu ? Symbol.for("react.forward_ref") : 60112, Ad = { childContextTypes: !0, contextType: !0, contextTypes: !0, defaultProps: !0, displayName: !0, getDefaultProps: !0, getDerivedStateFromError: !0, getDerivedStateFromProps: !0, mixins: !0, propTypes: !0, type: !0 }, kd = { name: !0, length: !0, prototype: !0, caller: !0, callee: !0, arguments: !0, arity: !0 }, yu = { $$typeof: !0, compare: !0, defaultProps: !0, displayName: !0, propTypes: !0, type: !0 }, Td = ((Si = {})[Nd] = { $$typeof: !0, render: !0, defaultProps: !0, displayName: !0, propTypes: !0 }, Si[mu] = yu, Si);
function Xo(e) {
  return ("type" in (t = e) && t.type.$$typeof) === mu ? yu : "$$typeof" in e ? Td[e.$$typeof] : Ad;
  var t;
}
var jd = Object.defineProperty, Pd = Object.getOwnPropertyNames, Jo = Object.getOwnPropertySymbols, Cd = Object.getOwnPropertyDescriptor, Id = Object.getPrototypeOf, es = Object.prototype;
function bu(e, t, n) {
  if (typeof t != "string") {
    if (es) {
      var r = Id(t);
      r && r !== es && bu(e, r, n);
    }
    var i = Pd(t);
    Jo && (i = i.concat(Jo(t)));
    for (var a = Xo(e), o = Xo(t), l = 0; l < i.length; ++l) {
      var u = i[l];
      if (!(u in kd || n && n[u] || o && u in o || a && u in a)) {
        var f = Cd(t, u);
        try {
          jd(e, u, f);
        } catch {
        }
      }
    }
  }
  return e;
}
function ln(e) {
  return typeof e == "function";
}
function Va(e) {
  return typeof e == "object" && "styledComponentId" in e;
}
function Mt(e, t) {
  return e && t ? "".concat(e, " ").concat(t) : e || t || "";
}
function ts(e, t) {
  if (e.length === 0)
    return "";
  for (var n = e[0], r = 1; r < e.length; r++)
    n += t ? t + e[r] : e[r];
  return n;
}
function un(e) {
  return e !== null && typeof e == "object" && e.constructor.name === Object.name && !("props" in e && e.$$typeof);
}
function ia(e, t, n) {
  if (n === void 0 && (n = !1), !n && !un(e) && !Array.isArray(e))
    return t;
  if (Array.isArray(t))
    for (var r = 0; r < t.length; r++)
      e[r] = ia(e[r], t[r]);
  else if (un(t))
    for (var r in t)
      e[r] = ia(e[r], t[r]);
  return e;
}
function Ka(e, t) {
  Object.defineProperty(e, "toString", { value: t });
}
var Ld = process.env.NODE_ENV !== "production" ? { 1: `Cannot create styled-component for component: %s.

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
function Md() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e[t] = arguments[t];
  for (var n = e[0], r = [], i = 1, a = e.length; i < a; i += 1)
    r.push(e[i]);
  return r.forEach(function(o) {
    n = n.replace(/%[a-z]/, o);
  }), n;
}
function vn(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  return process.env.NODE_ENV === "production" ? new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(e, " for more information.").concat(t.length > 0 ? " Args: ".concat(t.join(", ")) : "")) : new Error(Md.apply(void 0, At([Ld[e]], t, !1)).trim());
}
var Rd = function() {
  function e(t) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = t;
  }
  return e.prototype.indexOfGroup = function(t) {
    for (var n = 0, r = 0; r < t; r++)
      n += this.groupSizes[r];
    return n;
  }, e.prototype.insertRules = function(t, n) {
    if (t >= this.groupSizes.length) {
      for (var r = this.groupSizes, i = r.length, a = i; t >= a; )
        if ((a <<= 1) < 0)
          throw vn(16, "".concat(t));
      this.groupSizes = new Uint32Array(a), this.groupSizes.set(r), this.length = a;
      for (var o = i; o < a; o++)
        this.groupSizes[o] = 0;
    }
    for (var l = this.indexOfGroup(t + 1), u = (o = 0, n.length); o < u; o++)
      this.tag.insertRule(l, n[o]) && (this.groupSizes[t]++, l++);
  }, e.prototype.clearGroup = function(t) {
    if (t < this.length) {
      var n = this.groupSizes[t], r = this.indexOfGroup(t), i = r + n;
      this.groupSizes[t] = 0;
      for (var a = r; a < i; a++)
        this.tag.deleteRule(r);
    }
  }, e.prototype.getGroup = function(t) {
    var n = "";
    if (t >= this.length || this.groupSizes[t] === 0)
      return n;
    for (var r = this.groupSizes[t], i = this.indexOfGroup(t), a = i + r, o = i; o < a; o++)
      n += "".concat(this.tag.getRule(o)).concat(`/*!sc*/
`);
    return n;
  }, e;
}(), Er = /* @__PURE__ */ new Map(), $r = /* @__PURE__ */ new Map(), Ai = 1, nr = function(e) {
  if (Er.has(e))
    return Er.get(e);
  for (; $r.has(Ai); )
    Ai++;
  var t = Ai++;
  if (process.env.NODE_ENV !== "production" && ((0 | t) < 0 || t > 1073741824))
    throw vn(16, "".concat(t));
  return Er.set(e, t), $r.set(t, e), t;
}, Dd = function(e, t) {
  Er.set(e, t), $r.set(t, e);
}, $d = "style[".concat(Ft, "][").concat("data-styled-version", '="').concat("6.0.7", '"]'), zd = new RegExp("^".concat(Ft, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), Fd = function(e, t, n) {
  for (var r, i = n.split(","), a = 0, o = i.length; a < o; a++)
    (r = i[a]) && e.registerName(t, r);
}, Bd = function(e, t) {
  for (var n, r = ((n = t.textContent) !== null && n !== void 0 ? n : "").split(`/*!sc*/
`), i = [], a = 0, o = r.length; a < o; a++) {
    var l = r[a].trim();
    if (l) {
      var u = l.match(zd);
      if (u) {
        var f = 0 | parseInt(u[1], 10), h = u[2];
        f !== 0 && (Dd(h, f), Fd(e, h, u[3]), e.getTag().insertRules(f, i)), i.length = 0;
      } else
        i.push(l);
    }
  }
};
function qd() {
  return typeof __webpack_nonce__ < "u" ? __webpack_nonce__ : null;
}
var xu = function(e) {
  var t = document.head, n = e || t, r = document.createElement("style"), i = function(l) {
    var u = Array.from(l.querySelectorAll("style[".concat(Ft, "]")));
    return u[u.length - 1];
  }(n), a = i !== void 0 ? i.nextSibling : null;
  r.setAttribute(Ft, "active"), r.setAttribute("data-styled-version", "6.0.7");
  var o = qd();
  return o && r.setAttribute("nonce", o), n.insertBefore(r, a), r;
}, Ud = function() {
  function e(t) {
    this.element = xu(t), this.element.appendChild(document.createTextNode("")), this.sheet = function(n) {
      if (n.sheet)
        return n.sheet;
      for (var r = document.styleSheets, i = 0, a = r.length; i < a; i++) {
        var o = r[i];
        if (o.ownerNode === n)
          return o;
      }
      throw vn(17);
    }(this.element), this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    try {
      return this.sheet.insertRule(n, t), this.length++, !0;
    } catch {
      return !1;
    }
  }, e.prototype.deleteRule = function(t) {
    this.sheet.deleteRule(t), this.length--;
  }, e.prototype.getRule = function(t) {
    var n = this.sheet.cssRules[t];
    return n && n.cssText ? n.cssText : "";
  }, e;
}(), Hd = function() {
  function e(t) {
    this.element = xu(t), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    if (t <= this.length && t >= 0) {
      var r = document.createTextNode(n);
      return this.element.insertBefore(r, this.nodes[t] || null), this.length++, !0;
    }
    return !1;
  }, e.prototype.deleteRule = function(t) {
    this.element.removeChild(this.nodes[t]), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.nodes[t].textContent : "";
  }, e;
}(), Wd = function() {
  function e(t) {
    this.rules = [], this.length = 0;
  }
  return e.prototype.insertRule = function(t, n) {
    return t <= this.length && (this.rules.splice(t, 0, n), this.length++, !0);
  }, e.prototype.deleteRule = function(t) {
    this.rules.splice(t, 1), this.length--;
  }, e.prototype.getRule = function(t) {
    return t < this.length ? this.rules[t] : "";
  }, e;
}(), ns = Ya, Yd = { isServer: !Ya, useCSSOMInjection: !bd }, wu = function() {
  function e(t, n, r) {
    t === void 0 && (t = sn), n === void 0 && (n = {});
    var i = this;
    this.options = et(et({}, Yd), t), this.gs = n, this.names = new Map(r), this.server = !!t.isServer, !this.server && Ya && ns && (ns = !1, function(a) {
      for (var o = document.querySelectorAll($d), l = 0, u = o.length; l < u; l++) {
        var f = o[l];
        f && f.getAttribute(Ft) !== "active" && (Bd(a, f), f.parentNode && f.parentNode.removeChild(f));
      }
    }(this)), Ka(this, function() {
      return function(a) {
        for (var o = a.getTag(), l = o.length, u = "", f = function(c) {
          var s = function(v) {
            return $r.get(v);
          }(c);
          if (s === void 0)
            return "continue";
          var d = a.names.get(s), y = o.getGroup(c);
          if (d === void 0 || y.length === 0)
            return "continue";
          var m = "".concat(Ft, ".g").concat(c, '[id="').concat(s, '"]'), b = "";
          d !== void 0 && d.forEach(function(v) {
            v.length > 0 && (b += "".concat(v, ","));
          }), u += "".concat(y).concat(m, '{content:"').concat(b, '"}').concat(`/*!sc*/
`);
        }, h = 0; h < l; h++)
          f(h);
        return u;
      }(i);
    });
  }
  return e.registerId = function(t) {
    return nr(t);
  }, e.prototype.reconstructWithOptions = function(t, n) {
    return n === void 0 && (n = !0), new e(et(et({}, this.options), t), this.gs, n && this.names || void 0);
  }, e.prototype.allocateGSInstance = function(t) {
    return this.gs[t] = (this.gs[t] || 0) + 1;
  }, e.prototype.getTag = function() {
    return this.tag || (this.tag = (t = function(n) {
      var r = n.useCSSOMInjection, i = n.target;
      return n.isServer ? new Wd(i) : r ? new Ud(i) : new Hd(i);
    }(this.options), new Rd(t)));
    var t;
  }, e.prototype.hasNameForId = function(t, n) {
    return this.names.has(t) && this.names.get(t).has(n);
  }, e.prototype.registerName = function(t, n) {
    if (nr(t), this.names.has(t))
      this.names.get(t).add(n);
    else {
      var r = /* @__PURE__ */ new Set();
      r.add(n), this.names.set(t, r);
    }
  }, e.prototype.insertRules = function(t, n, r) {
    this.registerName(t, n), this.getTag().insertRules(nr(t), r);
  }, e.prototype.clearNames = function(t) {
    this.names.has(t) && this.names.get(t).clear();
  }, e.prototype.clearRules = function(t) {
    this.getTag().clearGroup(nr(t)), this.clearNames(t);
  }, e.prototype.clearTag = function() {
    this.tag = void 0;
  }, e;
}(), Vd = /&/g, Kd = /^\s*\/\/.*$/gm;
function Ou(e, t) {
  return e.map(function(n) {
    return n.type === "rule" && (n.value = "".concat(t, " ").concat(n.value), n.value = n.value.replaceAll(",", ",".concat(t, " ")), n.props = n.props.map(function(r) {
      return "".concat(t, " ").concat(r);
    })), Array.isArray(n.children) && n.type !== "@keyframes" && (n.children = Ou(n.children, t)), n;
  });
}
function Gd(e) {
  var t, n, r, i = e === void 0 ? sn : e, a = i.options, o = a === void 0 ? sn : a, l = i.plugins, u = l === void 0 ? ii : l, f = function(s, d, y) {
    return y === n || y.startsWith(n) && y.endsWith(n) && y.replaceAll(n, "").length > 0 ? ".".concat(t) : s;
  }, h = u.slice();
  h.push(function(s) {
    s.type === ei && s.value.includes("&") && (s.props[0] = s.props[0].replace(Vd, n).replace(r, f));
  }), o.prefix && h.push(md), h.push(pd);
  var c = function(s, d, y, m) {
    d === void 0 && (d = ""), y === void 0 && (y = ""), m === void 0 && (m = "&"), t = m, n = d, r = new RegExp("\\".concat(n, "\\b"), "g");
    var b = s.replace(Kd, ""), v = dd(y || d ? "".concat(y, " ").concat(d, " { ").concat(b, " }") : b);
    o.namespace && (v = Ou(v, o.namespace));
    var g = [];
    return Dr(v, vd(h.concat(gd(function(w) {
      return g.push(w);
    })))), g;
  };
  return c.hash = u.length ? u.reduce(function(s, d) {
    return d.name || vn(15), It(s, d.name);
  }, 5381).toString() : "", c;
}
var Zd = new wu(), aa = Gd(), Eu = Ue.createContext({ shouldForwardProp: void 0, styleSheet: Zd, stylis: aa });
Eu.Consumer;
Ue.createContext(void 0);
function rs() {
  return qa(Eu);
}
var is = function() {
  function e(t, n) {
    var r = this;
    this.inject = function(i, a) {
      a === void 0 && (a = aa);
      var o = r.name + a.hash;
      i.hasNameForId(r.id, o) || i.insertRules(r.id, o, a(r.rules, o, "@keyframes"));
    }, this.name = t, this.id = "sc-keyframes-".concat(t), this.rules = n, Ka(this, function() {
      throw vn(12, String(r.name));
    });
  }
  return e.prototype.getName = function(t) {
    return t === void 0 && (t = aa), this.name + t.hash;
  }, e;
}(), Qd = function(e) {
  return e >= "A" && e <= "Z";
};
function as(e) {
  for (var t = "", n = 0; n < e.length; n++) {
    var r = e[n];
    if (n === 1 && r === "-" && e[0] === "-")
      return e;
    Qd(r) ? t += "-" + r.toLowerCase() : t += r;
  }
  return t.startsWith("ms-") ? "-" + t : t;
}
var _u = function(e) {
  return e == null || e === !1 || e === "";
}, Su = function(e) {
  var t, n, r = [];
  for (var i in e) {
    var a = e[i];
    e.hasOwnProperty(i) && !_u(a) && (Array.isArray(a) && a.isCss || ln(a) ? r.push("".concat(as(i), ":"), a, ";") : un(a) ? r.push.apply(r, At(At(["".concat(i, " {")], Su(a), !1), ["}"], !1)) : r.push("".concat(as(i), ": ").concat((t = i, (n = a) == null || typeof n == "boolean" || n === "" ? "" : typeof n != "number" || n === 0 || t in yd || t.startsWith("--") ? String(n).trim() : "".concat(n, "px")), ";")));
  }
  return r;
};
function zt(e, t, n, r) {
  if (_u(e))
    return [];
  if (Va(e))
    return [".".concat(e.styledComponentId)];
  if (ln(e)) {
    if (!ln(a = e) || a.prototype && a.prototype.isReactComponent || !t)
      return [e];
    var i = e(t);
    return process.env.NODE_ENV === "production" || typeof i != "object" || Array.isArray(i) || i instanceof is || un(i) || i === null || console.error("".concat(vu(e), " is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.")), zt(i, t, n, r);
  }
  var a;
  return e instanceof is ? n ? (e.inject(n, r), [e.getName(r)]) : [e] : un(e) ? Su(e) : Array.isArray(e) ? Array.prototype.concat.apply(ii, e.map(function(o) {
    return zt(o, t, n, r);
  })) : [e.toString()];
}
function Xd(e) {
  for (var t = 0; t < e.length; t += 1) {
    var n = e[t];
    if (ln(n) && !Va(n))
      return !1;
  }
  return !0;
}
var Jd = pu("6.0.7"), eh = function() {
  function e(t, n, r) {
    this.rules = t, this.staticRulesId = "", this.isStatic = process.env.NODE_ENV === "production" && (r === void 0 || r.isStatic) && Xd(t), this.componentId = n, this.baseHash = It(Jd, n), this.baseStyle = r, wu.registerId(n);
  }
  return e.prototype.generateAndInjectStyles = function(t, n, r) {
    var i = this.baseStyle ? this.baseStyle.generateAndInjectStyles(t, n, r) : "";
    if (this.isStatic && !r.hash)
      if (this.staticRulesId && n.hasNameForId(this.componentId, this.staticRulesId))
        i = Mt(i, this.staticRulesId);
      else {
        var a = ts(zt(this.rules, t, n, r)), o = ra(It(this.baseHash, a) >>> 0);
        if (!n.hasNameForId(this.componentId, o)) {
          var l = r(a, ".".concat(o), void 0, this.componentId);
          n.insertRules(this.componentId, o, l);
        }
        i = Mt(i, o), this.staticRulesId = o;
      }
    else {
      for (var u = It(this.baseHash, r.hash), f = "", h = 0; h < this.rules.length; h++) {
        var c = this.rules[h];
        if (typeof c == "string")
          f += c, process.env.NODE_ENV !== "production" && (u = It(u, c));
        else if (c) {
          var s = ts(zt(c, t, n, r));
          u = It(u, s), f += s;
        }
      }
      if (f) {
        var d = ra(u >>> 0);
        n.hasNameForId(this.componentId, d) || n.insertRules(this.componentId, d, r(f, ".".concat(d), void 0, this.componentId)), i = Mt(i, d);
      }
    }
    return i;
  }, e;
}(), Nu = Ue.createContext(void 0);
Nu.Consumer;
var ki = {}, os = /* @__PURE__ */ new Set();
function th(e, t, n) {
  var r = Va(e), i = e, a = !Ni(e), o = t.attrs, l = o === void 0 ? ii : o, u = t.componentId, f = u === void 0 ? function(p, x) {
    var _ = typeof p != "string" ? "sc" : Zo(p);
    ki[_] = (ki[_] || 0) + 1;
    var E = "".concat(_, "-").concat(Sd("6.0.7" + _ + ki[_]));
    return x ? "".concat(x, "-").concat(E) : E;
  }(t.displayName, t.parentComponentId) : u, h = t.displayName, c = h === void 0 ? function(p) {
    return Ni(p) ? "styled.".concat(p) : "Styled(".concat(vu(p), ")");
  }(e) : h, s = t.displayName && t.componentId ? "".concat(Zo(t.displayName), "-").concat(t.componentId) : t.componentId || f, d = r && i.attrs ? i.attrs.concat(l).filter(Boolean) : l, y = t.shouldForwardProp;
  if (r && i.shouldForwardProp) {
    var m = i.shouldForwardProp;
    if (t.shouldForwardProp) {
      var b = t.shouldForwardProp;
      y = function(p, x) {
        return m(p, x) && b(p, x);
      };
    } else
      y = m;
  }
  var v = new eh(n, s, r ? i.componentStyle : void 0);
  function g(p, x) {
    return function(_, E, k) {
      var j = _.attrs, S = _.componentStyle, O = _.defaultProps, N = _.foldedComponentIds, T = _.styledComponentId, C = _.target, D = Ue.useContext(Nu), H = rs(), U = _.shouldForwardProp || H.shouldForwardProp;
      process.env.NODE_ENV !== "production" && jo(T);
      var K = function(z, B, I) {
        for (var $, W = et(et({}, B), { className: void 0, theme: I }), Y = 0; Y < z.length; Y += 1) {
          var V = ln($ = z[Y]) ? $(W) : $;
          for (var ee in V)
            W[ee] = ee === "className" ? Mt(W[ee], V[ee]) : ee === "style" ? et(et({}, W[ee]), V[ee]) : V[ee];
        }
        return B.className && (W.className = Mt(W.className, B.className)), W;
      }(j, E, wd(E, D, O) || sn), q = K.as || C, P = {};
      for (var A in K)
        K[A] === void 0 || A[0] === "$" || A === "as" || A === "theme" || (A === "forwardedAs" ? P.as = K.forwardedAs : U && !U(A, q) || (P[A] = K[A], U || process.env.NODE_ENV !== "development" || Xf(A) || os.has(A) || !na.has(q) || (os.add(A), console.warn('styled-components: it looks like an unknown prop "'.concat(A, '" is being sent through to the DOM, which will likely trigger a React console error. If you would like automatic filtering of unknown props, you can opt-into that behavior via `<StyleSheetManager shouldForwardProp={...}>` (connect an API like `@emotion/is-prop-valid`) or consider using transient props (`$` prefix for automatic filtering.)')))));
      var M = function(z, B) {
        var I = rs(), $ = z.generateAndInjectStyles(B, I.styleSheet, I.stylis);
        return process.env.NODE_ENV !== "production" && jo($), $;
      }(S, K);
      process.env.NODE_ENV !== "production" && _.warnTooManyClasses && _.warnTooManyClasses(M);
      var R = Mt(N, T);
      return M && (R += " " + M), K.className && (R += " " + K.className), P[Ni(q) && !na.has(q) ? "class" : "className"] = R, P.ref = k, nn(q, P);
    }(w, p, x);
  }
  process.env.NODE_ENV !== "production" && (g.displayName = c);
  var w = Ue.forwardRef(g);
  return w.attrs = d, w.componentStyle = v, w.shouldForwardProp = y, process.env.NODE_ENV !== "production" && (w.displayName = c), w.foldedComponentIds = r ? Mt(i.foldedComponentIds, i.styledComponentId) : "", w.styledComponentId = s, w.target = r ? i.target : e, Object.defineProperty(w, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(p) {
    this._foldedDefaultProps = r ? function(x) {
      for (var _ = [], E = 1; E < arguments.length; E++)
        _[E - 1] = arguments[E];
      for (var k = 0, j = _; k < j.length; k++)
        ia(x, j[k], !0);
      return x;
    }({}, i.defaultProps, p) : p;
  } }), process.env.NODE_ENV !== "production" && (xd(c, s), w.warnTooManyClasses = function(p, x) {
    var _ = {}, E = !1;
    return function(k) {
      if (!E && (_[k] = !0, Object.keys(_).length >= 200)) {
        var j = x ? ' with the id of "'.concat(x, '"') : "";
        console.warn("Over ".concat(200, " classes were generated for component ").concat(p).concat(j, `.
`) + `Consider using the attrs method, together with a style object for frequently changed styles.
Example:
  const Component = styled.div.attrs(props => ({
    style: {
      background: props.background,
    },
  }))\`width: 100%;\`

  <Component />`), E = !0, _ = {};
      }
    };
  }(c, s)), Ka(w, function() {
    return ".".concat(w.styledComponentId);
  }), a && bu(w, e, { attrs: !0, componentStyle: !0, displayName: !0, foldedComponentIds: !0, shouldForwardProp: !0, styledComponentId: !0, target: !0 }), w;
}
function ss(e, t) {
  for (var n = [e[0]], r = 0, i = t.length; r < i; r += 1)
    n.push(t[r], e[r + 1]);
  return n;
}
var ls = function(e) {
  return Object.assign(e, { isCss: !0 });
};
function zr(e) {
  for (var t = [], n = 1; n < arguments.length; n++)
    t[n - 1] = arguments[n];
  if (ln(e) || un(e)) {
    var r = e;
    return ls(zt(ss(ii, At([r], t, !0))));
  }
  var i = e;
  return t.length === 0 && i.length === 1 && typeof i[0] == "string" ? zt(i) : ls(zt(ss(i, t)));
}
function oa(e, t, n) {
  if (n === void 0 && (n = sn), !t)
    throw vn(1, t);
  var r = function(i) {
    for (var a = [], o = 1; o < arguments.length; o++)
      a[o - 1] = arguments[o];
    return e(t, n, zr.apply(void 0, At([i], a, !1)));
  };
  return r.attrs = function(i) {
    return oa(e, t, et(et({}, n), { attrs: Array.prototype.concat(n.attrs, i).filter(Boolean) }));
  }, r.withConfig = function(i) {
    return oa(e, t, et(et({}, n), i));
  }, r;
}
var Au = function(e) {
  return oa(th, e);
}, Ga = Au;
na.forEach(function(e) {
  Ga[e] = Au(e);
});
process.env.NODE_ENV !== "production" && typeof navigator < "u" && navigator.product === "ReactNative" && console.warn(`It looks like you've imported 'styled-components' on React Native.
Perhaps you're looking to import 'styled-components/native'?
Read more about this at https://www.styled-components.com/docs/basics#react-native`);
var rr = "__sc-".concat(Ft, "__");
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test" && typeof window < "u" && (window[rr] || (window[rr] = 0), window[rr] === 1 && console.warn(`It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.

See https://s-c.sh/2BAXzed for more info.`), window[rr] += 1);
const Aw = Ga.div`
  margin: 0 auto;

  ${(e) => e.$variant === "session" && zr`
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

    ${(e) => e.$variant === "center" && zr`
        height: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
`, kw = ({ link: e = "false" }) => /* @__PURE__ */ L.jsxs("div", { className: "hidden lg:block bg-main", children: [
  /* @__PURE__ */ L.jsx("div", { style: { height: "calc(100vh - 5rem)" }, children: /* @__PURE__ */ L.jsx("img", { src: "https://kiota-public-resources.s3.amazonaws.com/logo_000.svg", alt: "Logo", className: "w-full h-full" }) }),
  e && /* @__PURE__ */ L.jsx("div", { children: /* @__PURE__ */ L.jsxs("div", { className: "w-full flex justify-center items-center relative bottom-16 xl:bottom-42", children: [
    /* @__PURE__ */ L.jsx(
      "a",
      {
        href: "https://www.kiota.com",
        target: "_blank",
        rel: "noreferrer",
        className: "absolute translate-y-1/2 bg-white px-5 py-1 text-xs font-medium rounded-md cursor-pointer text-main hover:text-link-hover",
        children: "www.kiota.com"
      }
    ),
    /* @__PURE__ */ L.jsx("hr", { className: "w-8/12 h-full  text-white" })
  ] }) })
] }), Tw = ({ formTitle: e, formSubtitle: t }) => /* @__PURE__ */ L.jsxs("div", { className: "block mb-4 sm:mb-12 sm:px-0 mt-20 lg:mt-0", children: [
  /* @__PURE__ */ L.jsx("h1", { className: "text-main", children: e }),
  /* @__PURE__ */ L.jsx("h5", { className: "text-secondary font-semibold", children: t })
] });
function us(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function oe(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? us(Object(n), !0).forEach(function(r) {
      Ve(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : us(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Fr(e) {
  "@babel/helpers - typeof";
  return Fr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Fr(e);
}
function nh(e, t) {
  if (!(e instanceof t))
    throw new TypeError("Cannot call a class as a function");
}
function cs(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function rh(e, t, n) {
  return t && cs(e.prototype, t), n && cs(e, n), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}
function Ve(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Za(e, t) {
  return ah(e) || sh(e, t) || ku(e, t) || uh();
}
function Gn(e) {
  return ih(e) || oh(e) || ku(e) || lh();
}
function ih(e) {
  if (Array.isArray(e))
    return sa(e);
}
function ah(e) {
  if (Array.isArray(e))
    return e;
}
function oh(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function sh(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], i = !0, a = !1, o, l;
    try {
      for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0)
        ;
    } catch (u) {
      a = !0, l = u;
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (a)
          throw l;
      }
    }
    return r;
  }
}
function ku(e, t) {
  if (e) {
    if (typeof e == "string")
      return sa(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return sa(e, t);
  }
}
function sa(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function lh() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function uh() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var fs = function() {
}, Qa = {}, Tu = {}, ju = null, Pu = {
  mark: fs,
  measure: fs
};
try {
  typeof window < "u" && (Qa = window), typeof document < "u" && (Tu = document), typeof MutationObserver < "u" && (ju = MutationObserver), typeof performance < "u" && (Pu = performance);
} catch {
}
var ch = Qa.navigator || {}, ds = ch.userAgent, hs = ds === void 0 ? "" : ds, kt = Qa, Ie = Tu, ps = ju, ir = Pu;
kt.document;
var wt = !!Ie.documentElement && !!Ie.head && typeof Ie.addEventListener == "function" && typeof Ie.createElement == "function", Cu = ~hs.indexOf("MSIE") || ~hs.indexOf("Trident/"), ar, or, sr, lr, ur, yt = "___FONT_AWESOME___", la = 16, Iu = "fa", Lu = "svg-inline--fa", Bt = "data-fa-i2svg", ua = "data-fa-pseudo-element", fh = "data-fa-pseudo-element-pending", Xa = "data-prefix", Ja = "data-icon", vs = "fontawesome-i2svg", dh = "async", hh = ["HTML", "HEAD", "STYLE", "SCRIPT"], Mu = function() {
  try {
    return process.env.NODE_ENV === "production";
  } catch {
    return !1;
  }
}(), Pe = "classic", De = "sharp", eo = [Pe, De];
function Zn(e) {
  return new Proxy(e, {
    get: function(n, r) {
      return r in n ? n[r] : n[Pe];
    }
  });
}
var qn = Zn((ar = {}, Ve(ar, Pe, {
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
}), Ve(ar, De, {
  fa: "solid",
  fass: "solid",
  "fa-solid": "solid",
  fasr: "regular",
  "fa-regular": "regular",
  fasl: "light",
  "fa-light": "light"
}), ar)), Un = Zn((or = {}, Ve(or, Pe, {
  solid: "fas",
  regular: "far",
  light: "fal",
  thin: "fat",
  duotone: "fad",
  brands: "fab",
  kit: "fak"
}), Ve(or, De, {
  solid: "fass",
  regular: "fasr",
  light: "fasl"
}), or)), Hn = Zn((sr = {}, Ve(sr, Pe, {
  fab: "fa-brands",
  fad: "fa-duotone",
  fak: "fa-kit",
  fal: "fa-light",
  far: "fa-regular",
  fas: "fa-solid",
  fat: "fa-thin"
}), Ve(sr, De, {
  fass: "fa-solid",
  fasr: "fa-regular",
  fasl: "fa-light"
}), sr)), ph = Zn((lr = {}, Ve(lr, Pe, {
  "fa-brands": "fab",
  "fa-duotone": "fad",
  "fa-kit": "fak",
  "fa-light": "fal",
  "fa-regular": "far",
  "fa-solid": "fas",
  "fa-thin": "fat"
}), Ve(lr, De, {
  "fa-solid": "fass",
  "fa-regular": "fasr",
  "fa-light": "fasl"
}), lr)), vh = /fa(s|r|l|t|d|b|k|ss|sr|sl)?[\-\ ]/, Ru = "fa-layers-text", gh = /Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i, mh = Zn((ur = {}, Ve(ur, Pe, {
  900: "fas",
  400: "far",
  normal: "far",
  300: "fal",
  100: "fat"
}), Ve(ur, De, {
  900: "fass",
  400: "fasr",
  300: "fasl"
}), ur)), Du = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], yh = Du.concat([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]), bh = ["class", "data-prefix", "data-icon", "data-fa-transform", "data-fa-mask"], Rt = {
  GROUP: "duotone-group",
  SWAP_OPACITY: "swap-opacity",
  PRIMARY: "primary",
  SECONDARY: "secondary"
}, Wn = /* @__PURE__ */ new Set();
Object.keys(Un[Pe]).map(Wn.add.bind(Wn));
Object.keys(Un[De]).map(Wn.add.bind(Wn));
var xh = [].concat(eo, Gn(Wn), ["2xs", "xs", "sm", "lg", "xl", "2xl", "beat", "border", "fade", "beat-fade", "bounce", "flip-both", "flip-horizontal", "flip-vertical", "flip", "fw", "inverse", "layers-counter", "layers-text", "layers", "li", "pull-left", "pull-right", "pulse", "rotate-180", "rotate-270", "rotate-90", "rotate-by", "shake", "spin-pulse", "spin-reverse", "spin", "stack-1x", "stack-2x", "stack", "ul", Rt.GROUP, Rt.SWAP_OPACITY, Rt.PRIMARY, Rt.SECONDARY]).concat(Du.map(function(e) {
  return "".concat(e, "x");
})).concat(yh.map(function(e) {
  return "w-".concat(e);
})), zn = kt.FontAwesomeConfig || {};
function wh(e) {
  var t = Ie.querySelector("script[" + e + "]");
  if (t)
    return t.getAttribute(e);
}
function Oh(e) {
  return e === "" ? !0 : e === "false" ? !1 : e === "true" ? !0 : e;
}
if (Ie && typeof Ie.querySelector == "function") {
  var Eh = [["data-family-prefix", "familyPrefix"], ["data-css-prefix", "cssPrefix"], ["data-family-default", "familyDefault"], ["data-style-default", "styleDefault"], ["data-replacement-class", "replacementClass"], ["data-auto-replace-svg", "autoReplaceSvg"], ["data-auto-add-css", "autoAddCss"], ["data-auto-a11y", "autoA11y"], ["data-search-pseudo-elements", "searchPseudoElements"], ["data-observe-mutations", "observeMutations"], ["data-mutate-approach", "mutateApproach"], ["data-keep-original-source", "keepOriginalSource"], ["data-measure-performance", "measurePerformance"], ["data-show-missing-icons", "showMissingIcons"]];
  Eh.forEach(function(e) {
    var t = Za(e, 2), n = t[0], r = t[1], i = Oh(wh(n));
    i != null && (zn[r] = i);
  });
}
var $u = {
  styleDefault: "solid",
  familyDefault: "classic",
  cssPrefix: Iu,
  replacementClass: Lu,
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
zn.familyPrefix && (zn.cssPrefix = zn.familyPrefix);
var cn = oe(oe({}, $u), zn);
cn.autoReplaceSvg || (cn.observeMutations = !1);
var ue = {};
Object.keys($u).forEach(function(e) {
  Object.defineProperty(ue, e, {
    enumerable: !0,
    set: function(n) {
      cn[e] = n, Fn.forEach(function(r) {
        return r(ue);
      });
    },
    get: function() {
      return cn[e];
    }
  });
});
Object.defineProperty(ue, "familyPrefix", {
  enumerable: !0,
  set: function(t) {
    cn.cssPrefix = t, Fn.forEach(function(n) {
      return n(ue);
    });
  },
  get: function() {
    return cn.cssPrefix;
  }
});
kt.FontAwesomeConfig = ue;
var Fn = [];
function _h(e) {
  return Fn.push(e), function() {
    Fn.splice(Fn.indexOf(e), 1);
  };
}
var Et = la, pt = {
  size: 16,
  x: 0,
  y: 0,
  rotate: 0,
  flipX: !1,
  flipY: !1
};
function Sh(e) {
  if (!(!e || !wt)) {
    var t = Ie.createElement("style");
    t.setAttribute("type", "text/css"), t.innerHTML = e;
    for (var n = Ie.head.childNodes, r = null, i = n.length - 1; i > -1; i--) {
      var a = n[i], o = (a.tagName || "").toUpperCase();
      ["STYLE", "LINK"].indexOf(o) > -1 && (r = a);
    }
    return Ie.head.insertBefore(t, r), e;
  }
}
var Nh = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Yn() {
  for (var e = 12, t = ""; e-- > 0; )
    t += Nh[Math.random() * 62 | 0];
  return t;
}
function gn(e) {
  for (var t = [], n = (e || []).length >>> 0; n--; )
    t[n] = e[n];
  return t;
}
function to(e) {
  return e.classList ? gn(e.classList) : (e.getAttribute("class") || "").split(" ").filter(function(t) {
    return t;
  });
}
function zu(e) {
  return "".concat(e).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function Ah(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, '="').concat(zu(e[n]), '" ');
  }, "").trim();
}
function ai(e) {
  return Object.keys(e || {}).reduce(function(t, n) {
    return t + "".concat(n, ": ").concat(e[n].trim(), ";");
  }, "");
}
function no(e) {
  return e.size !== pt.size || e.x !== pt.x || e.y !== pt.y || e.rotate !== pt.rotate || e.flipX || e.flipY;
}
function kh(e) {
  var t = e.transform, n = e.containerWidth, r = e.iconWidth, i = {
    transform: "translate(".concat(n / 2, " 256)")
  }, a = "translate(".concat(t.x * 32, ", ").concat(t.y * 32, ") "), o = "scale(".concat(t.size / 16 * (t.flipX ? -1 : 1), ", ").concat(t.size / 16 * (t.flipY ? -1 : 1), ") "), l = "rotate(".concat(t.rotate, " 0 0)"), u = {
    transform: "".concat(a, " ").concat(o, " ").concat(l)
  }, f = {
    transform: "translate(".concat(r / 2 * -1, " -256)")
  };
  return {
    outer: i,
    inner: u,
    path: f
  };
}
function Th(e) {
  var t = e.transform, n = e.width, r = n === void 0 ? la : n, i = e.height, a = i === void 0 ? la : i, o = e.startCentered, l = o === void 0 ? !1 : o, u = "";
  return l && Cu ? u += "translate(".concat(t.x / Et - r / 2, "em, ").concat(t.y / Et - a / 2, "em) ") : l ? u += "translate(calc(-50% + ".concat(t.x / Et, "em), calc(-50% + ").concat(t.y / Et, "em)) ") : u += "translate(".concat(t.x / Et, "em, ").concat(t.y / Et, "em) "), u += "scale(".concat(t.size / Et * (t.flipX ? -1 : 1), ", ").concat(t.size / Et * (t.flipY ? -1 : 1), ") "), u += "rotate(".concat(t.rotate, "deg) "), u;
}
var jh = `:root, :host {
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
function Fu() {
  var e = Iu, t = Lu, n = ue.cssPrefix, r = ue.replacementClass, i = jh;
  if (n !== e || r !== t) {
    var a = new RegExp("\\.".concat(e, "\\-"), "g"), o = new RegExp("\\--".concat(e, "\\-"), "g"), l = new RegExp("\\.".concat(t), "g");
    i = i.replace(a, ".".concat(n, "-")).replace(o, "--".concat(n, "-")).replace(l, ".".concat(r));
  }
  return i;
}
var gs = !1;
function Ti() {
  ue.autoAddCss && !gs && (Sh(Fu()), gs = !0);
}
var Ph = {
  mixout: function() {
    return {
      dom: {
        css: Fu,
        insertCss: Ti
      }
    };
  },
  hooks: function() {
    return {
      beforeDOMElementCreation: function() {
        Ti();
      },
      beforeI2svg: function() {
        Ti();
      }
    };
  }
}, bt = kt || {};
bt[yt] || (bt[yt] = {});
bt[yt].styles || (bt[yt].styles = {});
bt[yt].hooks || (bt[yt].hooks = {});
bt[yt].shims || (bt[yt].shims = []);
var lt = bt[yt], Bu = [], Ch = function e() {
  Ie.removeEventListener("DOMContentLoaded", e), Br = 1, Bu.map(function(t) {
    return t();
  });
}, Br = !1;
wt && (Br = (Ie.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(Ie.readyState), Br || Ie.addEventListener("DOMContentLoaded", Ch));
function Ih(e) {
  wt && (Br ? setTimeout(e, 0) : Bu.push(e));
}
function Qn(e) {
  var t = e.tag, n = e.attributes, r = n === void 0 ? {} : n, i = e.children, a = i === void 0 ? [] : i;
  return typeof e == "string" ? zu(e) : "<".concat(t, " ").concat(Ah(r), ">").concat(a.map(Qn).join(""), "</").concat(t, ">");
}
function ms(e, t, n) {
  if (e && e[t] && e[t][n])
    return {
      prefix: t,
      iconName: n,
      icon: e[t][n]
    };
}
var Lh = function(t, n) {
  return function(r, i, a, o) {
    return t.call(n, r, i, a, o);
  };
}, ji = function(t, n, r, i) {
  var a = Object.keys(t), o = a.length, l = i !== void 0 ? Lh(n, i) : n, u, f, h;
  for (r === void 0 ? (u = 1, h = t[a[0]]) : (u = 0, h = r); u < o; u++)
    f = a[u], h = l(h, t[f], f, t);
  return h;
};
function Mh(e) {
  for (var t = [], n = 0, r = e.length; n < r; ) {
    var i = e.charCodeAt(n++);
    if (i >= 55296 && i <= 56319 && n < r) {
      var a = e.charCodeAt(n++);
      (a & 64512) == 56320 ? t.push(((i & 1023) << 10) + (a & 1023) + 65536) : (t.push(i), n--);
    } else
      t.push(i);
  }
  return t;
}
function ca(e) {
  var t = Mh(e);
  return t.length === 1 ? t[0].toString(16) : null;
}
function Rh(e, t) {
  var n = e.length, r = e.charCodeAt(t), i;
  return r >= 55296 && r <= 56319 && n > t + 1 && (i = e.charCodeAt(t + 1), i >= 56320 && i <= 57343) ? (r - 55296) * 1024 + i - 56320 + 65536 : r;
}
function ys(e) {
  return Object.keys(e).reduce(function(t, n) {
    var r = e[n], i = !!r.icon;
    return i ? t[r.iconName] = r.icon : t[n] = r, t;
  }, {});
}
function fa(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, r = n.skipHooks, i = r === void 0 ? !1 : r, a = ys(t);
  typeof lt.hooks.addPack == "function" && !i ? lt.hooks.addPack(e, ys(t)) : lt.styles[e] = oe(oe({}, lt.styles[e] || {}), a), e === "fas" && fa("fa", t);
}
var cr, fr, dr, Xt = lt.styles, Dh = lt.shims, $h = (cr = {}, Ve(cr, Pe, Object.values(Hn[Pe])), Ve(cr, De, Object.values(Hn[De])), cr), ro = null, qu = {}, Uu = {}, Hu = {}, Wu = {}, Yu = {}, zh = (fr = {}, Ve(fr, Pe, Object.keys(qn[Pe])), Ve(fr, De, Object.keys(qn[De])), fr);
function Fh(e) {
  return ~xh.indexOf(e);
}
function Bh(e, t) {
  var n = t.split("-"), r = n[0], i = n.slice(1).join("-");
  return r === e && i !== "" && !Fh(i) ? i : null;
}
var Vu = function() {
  var t = function(a) {
    return ji(Xt, function(o, l, u) {
      return o[u] = ji(l, a, {}), o;
    }, {});
  };
  qu = t(function(i, a, o) {
    if (a[3] && (i[a[3]] = o), a[2]) {
      var l = a[2].filter(function(u) {
        return typeof u == "number";
      });
      l.forEach(function(u) {
        i[u.toString(16)] = o;
      });
    }
    return i;
  }), Uu = t(function(i, a, o) {
    if (i[o] = o, a[2]) {
      var l = a[2].filter(function(u) {
        return typeof u == "string";
      });
      l.forEach(function(u) {
        i[u] = o;
      });
    }
    return i;
  }), Yu = t(function(i, a, o) {
    var l = a[2];
    return i[o] = o, l.forEach(function(u) {
      i[u] = o;
    }), i;
  });
  var n = "far" in Xt || ue.autoFetchSvg, r = ji(Dh, function(i, a) {
    var o = a[0], l = a[1], u = a[2];
    return l === "far" && !n && (l = "fas"), typeof o == "string" && (i.names[o] = {
      prefix: l,
      iconName: u
    }), typeof o == "number" && (i.unicodes[o.toString(16)] = {
      prefix: l,
      iconName: u
    }), i;
  }, {
    names: {},
    unicodes: {}
  });
  Hu = r.names, Wu = r.unicodes, ro = oi(ue.styleDefault, {
    family: ue.familyDefault
  });
};
_h(function(e) {
  ro = oi(e.styleDefault, {
    family: ue.familyDefault
  });
});
Vu();
function io(e, t) {
  return (qu[e] || {})[t];
}
function qh(e, t) {
  return (Uu[e] || {})[t];
}
function Dt(e, t) {
  return (Yu[e] || {})[t];
}
function Ku(e) {
  return Hu[e] || {
    prefix: null,
    iconName: null
  };
}
function Uh(e) {
  var t = Wu[e], n = io("fas", e);
  return t || (n ? {
    prefix: "fas",
    iconName: n
  } : null) || {
    prefix: null,
    iconName: null
  };
}
function Tt() {
  return ro;
}
var ao = function() {
  return {
    prefix: null,
    iconName: null,
    rest: []
  };
};
function oi(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.family, r = n === void 0 ? Pe : n, i = qn[r][e], a = Un[r][e] || Un[r][i], o = e in lt.styles ? e : null;
  return a || o || null;
}
var bs = (dr = {}, Ve(dr, Pe, Object.keys(Hn[Pe])), Ve(dr, De, Object.keys(Hn[De])), dr);
function si(e) {
  var t, n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.skipLookups, i = r === void 0 ? !1 : r, a = (t = {}, Ve(t, Pe, "".concat(ue.cssPrefix, "-").concat(Pe)), Ve(t, De, "".concat(ue.cssPrefix, "-").concat(De)), t), o = null, l = Pe;
  (e.includes(a[Pe]) || e.some(function(f) {
    return bs[Pe].includes(f);
  })) && (l = Pe), (e.includes(a[De]) || e.some(function(f) {
    return bs[De].includes(f);
  })) && (l = De);
  var u = e.reduce(function(f, h) {
    var c = Bh(ue.cssPrefix, h);
    if (Xt[h] ? (h = $h[l].includes(h) ? ph[l][h] : h, o = h, f.prefix = h) : zh[l].indexOf(h) > -1 ? (o = h, f.prefix = oi(h, {
      family: l
    })) : c ? f.iconName = c : h !== ue.replacementClass && h !== a[Pe] && h !== a[De] && f.rest.push(h), !i && f.prefix && f.iconName) {
      var s = o === "fa" ? Ku(f.iconName) : {}, d = Dt(f.prefix, f.iconName);
      s.prefix && (o = null), f.iconName = s.iconName || d || f.iconName, f.prefix = s.prefix || f.prefix, f.prefix === "far" && !Xt.far && Xt.fas && !ue.autoFetchSvg && (f.prefix = "fas");
    }
    return f;
  }, ao());
  return (e.includes("fa-brands") || e.includes("fab")) && (u.prefix = "fab"), (e.includes("fa-duotone") || e.includes("fad")) && (u.prefix = "fad"), !u.prefix && l === De && (Xt.fass || ue.autoFetchSvg) && (u.prefix = "fass", u.iconName = Dt(u.prefix, u.iconName) || u.iconName), (u.prefix === "fa" || o === "fa") && (u.prefix = Tt() || "fas"), u;
}
var Hh = /* @__PURE__ */ function() {
  function e() {
    nh(this, e), this.definitions = {};
  }
  return rh(e, [{
    key: "add",
    value: function() {
      for (var n = this, r = arguments.length, i = new Array(r), a = 0; a < r; a++)
        i[a] = arguments[a];
      var o = i.reduce(this._pullDefinitions, {});
      Object.keys(o).forEach(function(l) {
        n.definitions[l] = oe(oe({}, n.definitions[l] || {}), o[l]), fa(l, o[l]);
        var u = Hn[Pe][l];
        u && fa(u, o[l]), Vu();
      });
    }
  }, {
    key: "reset",
    value: function() {
      this.definitions = {};
    }
  }, {
    key: "_pullDefinitions",
    value: function(n, r) {
      var i = r.prefix && r.iconName && r.icon ? {
        0: r
      } : r;
      return Object.keys(i).map(function(a) {
        var o = i[a], l = o.prefix, u = o.iconName, f = o.icon, h = f[2];
        n[l] || (n[l] = {}), h.length > 0 && h.forEach(function(c) {
          typeof c == "string" && (n[l][c] = f);
        }), n[l][u] = f;
      }), n;
    }
  }]), e;
}(), xs = [], Jt = {}, rn = {}, Wh = Object.keys(rn);
function Yh(e, t) {
  var n = t.mixoutsTo;
  return xs = e, Jt = {}, Object.keys(rn).forEach(function(r) {
    Wh.indexOf(r) === -1 && delete rn[r];
  }), xs.forEach(function(r) {
    var i = r.mixout ? r.mixout() : {};
    if (Object.keys(i).forEach(function(o) {
      typeof i[o] == "function" && (n[o] = i[o]), Fr(i[o]) === "object" && Object.keys(i[o]).forEach(function(l) {
        n[o] || (n[o] = {}), n[o][l] = i[o][l];
      });
    }), r.hooks) {
      var a = r.hooks();
      Object.keys(a).forEach(function(o) {
        Jt[o] || (Jt[o] = []), Jt[o].push(a[o]);
      });
    }
    r.provides && r.provides(rn);
  }), n;
}
function da(e, t) {
  for (var n = arguments.length, r = new Array(n > 2 ? n - 2 : 0), i = 2; i < n; i++)
    r[i - 2] = arguments[i];
  var a = Jt[e] || [];
  return a.forEach(function(o) {
    t = o.apply(null, [t].concat(r));
  }), t;
}
function qt(e) {
  for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
    n[r - 1] = arguments[r];
  var i = Jt[e] || [];
  i.forEach(function(a) {
    a.apply(null, n);
  });
}
function xt() {
  var e = arguments[0], t = Array.prototype.slice.call(arguments, 1);
  return rn[e] ? rn[e].apply(null, t) : void 0;
}
function ha(e) {
  e.prefix === "fa" && (e.prefix = "fas");
  var t = e.iconName, n = e.prefix || Tt();
  if (t)
    return t = Dt(n, t) || t, ms(Gu.definitions, n, t) || ms(lt.styles, n, t);
}
var Gu = new Hh(), Vh = function() {
  ue.autoReplaceSvg = !1, ue.observeMutations = !1, qt("noAuto");
}, Kh = {
  i2svg: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return wt ? (qt("beforeI2svg", t), xt("pseudoElements2svg", t), xt("i2svg", t)) : Promise.reject("Operation requires a DOM of some kind.");
  },
  watch: function() {
    var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot;
    ue.autoReplaceSvg === !1 && (ue.autoReplaceSvg = !0), ue.observeMutations = !0, Ih(function() {
      Zh({
        autoReplaceSvgRoot: n
      }), qt("watch", t);
    });
  }
}, Gh = {
  icon: function(t) {
    if (t === null)
      return null;
    if (Fr(t) === "object" && t.prefix && t.iconName)
      return {
        prefix: t.prefix,
        iconName: Dt(t.prefix, t.iconName) || t.iconName
      };
    if (Array.isArray(t) && t.length === 2) {
      var n = t[1].indexOf("fa-") === 0 ? t[1].slice(3) : t[1], r = oi(t[0]);
      return {
        prefix: r,
        iconName: Dt(r, n) || n
      };
    }
    if (typeof t == "string" && (t.indexOf("".concat(ue.cssPrefix, "-")) > -1 || t.match(vh))) {
      var i = si(t.split(" "), {
        skipLookups: !0
      });
      return {
        prefix: i.prefix || Tt(),
        iconName: Dt(i.prefix, i.iconName) || i.iconName
      };
    }
    if (typeof t == "string") {
      var a = Tt();
      return {
        prefix: a,
        iconName: Dt(a, t) || t
      };
    }
  }
}, nt = {
  noAuto: Vh,
  config: ue,
  dom: Kh,
  parse: Gh,
  library: Gu,
  findIconDefinition: ha,
  toHtml: Qn
}, Zh = function() {
  var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, n = t.autoReplaceSvgRoot, r = n === void 0 ? Ie : n;
  (Object.keys(lt.styles).length > 0 || ue.autoFetchSvg) && wt && ue.autoReplaceSvg && nt.dom.i2svg({
    node: r
  });
};
function li(e, t) {
  return Object.defineProperty(e, "abstract", {
    get: t
  }), Object.defineProperty(e, "html", {
    get: function() {
      return e.abstract.map(function(r) {
        return Qn(r);
      });
    }
  }), Object.defineProperty(e, "node", {
    get: function() {
      if (wt) {
        var r = Ie.createElement("div");
        return r.innerHTML = e.html, r.children;
      }
    }
  }), e;
}
function Qh(e) {
  var t = e.children, n = e.main, r = e.mask, i = e.attributes, a = e.styles, o = e.transform;
  if (no(o) && n.found && !r.found) {
    var l = n.width, u = n.height, f = {
      x: l / u / 2,
      y: 0.5
    };
    i.style = ai(oe(oe({}, a), {}, {
      "transform-origin": "".concat(f.x + o.x / 16, "em ").concat(f.y + o.y / 16, "em")
    }));
  }
  return [{
    tag: "svg",
    attributes: i,
    children: t
  }];
}
function Xh(e) {
  var t = e.prefix, n = e.iconName, r = e.children, i = e.attributes, a = e.symbol, o = a === !0 ? "".concat(t, "-").concat(ue.cssPrefix, "-").concat(n) : a;
  return [{
    tag: "svg",
    attributes: {
      style: "display: none;"
    },
    children: [{
      tag: "symbol",
      attributes: oe(oe({}, i), {}, {
        id: o
      }),
      children: r
    }]
  }];
}
function oo(e) {
  var t = e.icons, n = t.main, r = t.mask, i = e.prefix, a = e.iconName, o = e.transform, l = e.symbol, u = e.title, f = e.maskId, h = e.titleId, c = e.extra, s = e.watchable, d = s === void 0 ? !1 : s, y = r.found ? r : n, m = y.width, b = y.height, v = i === "fak", g = [ue.replacementClass, a ? "".concat(ue.cssPrefix, "-").concat(a) : ""].filter(function(j) {
    return c.classes.indexOf(j) === -1;
  }).filter(function(j) {
    return j !== "" || !!j;
  }).concat(c.classes).join(" "), w = {
    children: [],
    attributes: oe(oe({}, c.attributes), {}, {
      "data-prefix": i,
      "data-icon": a,
      class: g,
      role: c.attributes.role || "img",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 ".concat(m, " ").concat(b)
    })
  }, p = v && !~c.classes.indexOf("fa-fw") ? {
    width: "".concat(m / b * 16 * 0.0625, "em")
  } : {};
  d && (w.attributes[Bt] = ""), u && (w.children.push({
    tag: "title",
    attributes: {
      id: w.attributes["aria-labelledby"] || "title-".concat(h || Yn())
    },
    children: [u]
  }), delete w.attributes.title);
  var x = oe(oe({}, w), {}, {
    prefix: i,
    iconName: a,
    main: n,
    mask: r,
    maskId: f,
    transform: o,
    symbol: l,
    styles: oe(oe({}, p), c.styles)
  }), _ = r.found && n.found ? xt("generateAbstractMask", x) || {
    children: [],
    attributes: {}
  } : xt("generateAbstractIcon", x) || {
    children: [],
    attributes: {}
  }, E = _.children, k = _.attributes;
  return x.children = E, x.attributes = k, l ? Xh(x) : Qh(x);
}
function ws(e) {
  var t = e.content, n = e.width, r = e.height, i = e.transform, a = e.title, o = e.extra, l = e.watchable, u = l === void 0 ? !1 : l, f = oe(oe(oe({}, o.attributes), a ? {
    title: a
  } : {}), {}, {
    class: o.classes.join(" ")
  });
  u && (f[Bt] = "");
  var h = oe({}, o.styles);
  no(i) && (h.transform = Th({
    transform: i,
    startCentered: !0,
    width: n,
    height: r
  }), h["-webkit-transform"] = h.transform);
  var c = ai(h);
  c.length > 0 && (f.style = c);
  var s = [];
  return s.push({
    tag: "span",
    attributes: f,
    children: [t]
  }), a && s.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [a]
  }), s;
}
function Jh(e) {
  var t = e.content, n = e.title, r = e.extra, i = oe(oe(oe({}, r.attributes), n ? {
    title: n
  } : {}), {}, {
    class: r.classes.join(" ")
  }), a = ai(r.styles);
  a.length > 0 && (i.style = a);
  var o = [];
  return o.push({
    tag: "span",
    attributes: i,
    children: [t]
  }), n && o.push({
    tag: "span",
    attributes: {
      class: "sr-only"
    },
    children: [n]
  }), o;
}
var Pi = lt.styles;
function pa(e) {
  var t = e[0], n = e[1], r = e.slice(4), i = Za(r, 1), a = i[0], o = null;
  return Array.isArray(a) ? o = {
    tag: "g",
    attributes: {
      class: "".concat(ue.cssPrefix, "-").concat(Rt.GROUP)
    },
    children: [{
      tag: "path",
      attributes: {
        class: "".concat(ue.cssPrefix, "-").concat(Rt.SECONDARY),
        fill: "currentColor",
        d: a[0]
      }
    }, {
      tag: "path",
      attributes: {
        class: "".concat(ue.cssPrefix, "-").concat(Rt.PRIMARY),
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
    height: n,
    icon: o
  };
}
var ep = {
  found: !1,
  width: 512,
  height: 512
};
function tp(e, t) {
  !Mu && !ue.showMissingIcons && e && console.error('Icon with name "'.concat(e, '" and prefix "').concat(t, '" is missing.'));
}
function va(e, t) {
  var n = t;
  return t === "fa" && ue.styleDefault !== null && (t = Tt()), new Promise(function(r, i) {
    if (xt("missingIconAbstract"), n === "fa") {
      var a = Ku(e) || {};
      e = a.iconName || e, t = a.prefix || t;
    }
    if (e && t && Pi[t] && Pi[t][e]) {
      var o = Pi[t][e];
      return r(pa(o));
    }
    tp(e, t), r(oe(oe({}, ep), {}, {
      icon: ue.showMissingIcons && e ? xt("missingIconAbstract") || {} : {}
    }));
  });
}
var Os = function() {
}, ga = ue.measurePerformance && ir && ir.mark && ir.measure ? ir : {
  mark: Os,
  measure: Os
}, Dn = 'FA "6.4.2"', np = function(t) {
  return ga.mark("".concat(Dn, " ").concat(t, " begins")), function() {
    return Zu(t);
  };
}, Zu = function(t) {
  ga.mark("".concat(Dn, " ").concat(t, " ends")), ga.measure("".concat(Dn, " ").concat(t), "".concat(Dn, " ").concat(t, " begins"), "".concat(Dn, " ").concat(t, " ends"));
}, so = {
  begin: np,
  end: Zu
}, _r = function() {
};
function Es(e) {
  var t = e.getAttribute ? e.getAttribute(Bt) : null;
  return typeof t == "string";
}
function rp(e) {
  var t = e.getAttribute ? e.getAttribute(Xa) : null, n = e.getAttribute ? e.getAttribute(Ja) : null;
  return t && n;
}
function ip(e) {
  return e && e.classList && e.classList.contains && e.classList.contains(ue.replacementClass);
}
function ap() {
  if (ue.autoReplaceSvg === !0)
    return Sr.replace;
  var e = Sr[ue.autoReplaceSvg];
  return e || Sr.replace;
}
function op(e) {
  return Ie.createElementNS("http://www.w3.org/2000/svg", e);
}
function sp(e) {
  return Ie.createElement(e);
}
function Qu(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, n = t.ceFn, r = n === void 0 ? e.tag === "svg" ? op : sp : n;
  if (typeof e == "string")
    return Ie.createTextNode(e);
  var i = r(e.tag);
  Object.keys(e.attributes || []).forEach(function(o) {
    i.setAttribute(o, e.attributes[o]);
  });
  var a = e.children || [];
  return a.forEach(function(o) {
    i.appendChild(Qu(o, {
      ceFn: r
    }));
  }), i;
}
function lp(e) {
  var t = " ".concat(e.outerHTML, " ");
  return t = "".concat(t, "Font Awesome fontawesome.com "), t;
}
var Sr = {
  replace: function(t) {
    var n = t[0];
    if (n.parentNode)
      if (t[1].forEach(function(i) {
        n.parentNode.insertBefore(Qu(i), n);
      }), n.getAttribute(Bt) === null && ue.keepOriginalSource) {
        var r = Ie.createComment(lp(n));
        n.parentNode.replaceChild(r, n);
      } else
        n.remove();
  },
  nest: function(t) {
    var n = t[0], r = t[1];
    if (~to(n).indexOf(ue.replacementClass))
      return Sr.replace(t);
    var i = new RegExp("".concat(ue.cssPrefix, "-.*"));
    if (delete r[0].attributes.id, r[0].attributes.class) {
      var a = r[0].attributes.class.split(" ").reduce(function(l, u) {
        return u === ue.replacementClass || u.match(i) ? l.toSvg.push(u) : l.toNode.push(u), l;
      }, {
        toNode: [],
        toSvg: []
      });
      r[0].attributes.class = a.toSvg.join(" "), a.toNode.length === 0 ? n.removeAttribute("class") : n.setAttribute("class", a.toNode.join(" "));
    }
    var o = r.map(function(l) {
      return Qn(l);
    }).join(`
`);
    n.setAttribute(Bt, ""), n.innerHTML = o;
  }
};
function _s(e) {
  e();
}
function Xu(e, t) {
  var n = typeof t == "function" ? t : _r;
  if (e.length === 0)
    n();
  else {
    var r = _s;
    ue.mutateApproach === dh && (r = kt.requestAnimationFrame || _s), r(function() {
      var i = ap(), a = so.begin("mutate");
      e.map(i), a(), n();
    });
  }
}
var lo = !1;
function Ju() {
  lo = !0;
}
function ma() {
  lo = !1;
}
var qr = null;
function Ss(e) {
  if (ps && ue.observeMutations) {
    var t = e.treeCallback, n = t === void 0 ? _r : t, r = e.nodeCallback, i = r === void 0 ? _r : r, a = e.pseudoElementsCallback, o = a === void 0 ? _r : a, l = e.observeMutationsRoot, u = l === void 0 ? Ie : l;
    qr = new ps(function(f) {
      if (!lo) {
        var h = Tt();
        gn(f).forEach(function(c) {
          if (c.type === "childList" && c.addedNodes.length > 0 && !Es(c.addedNodes[0]) && (ue.searchPseudoElements && o(c.target), n(c.target)), c.type === "attributes" && c.target.parentNode && ue.searchPseudoElements && o(c.target.parentNode), c.type === "attributes" && Es(c.target) && ~bh.indexOf(c.attributeName))
            if (c.attributeName === "class" && rp(c.target)) {
              var s = si(to(c.target)), d = s.prefix, y = s.iconName;
              c.target.setAttribute(Xa, d || h), y && c.target.setAttribute(Ja, y);
            } else
              ip(c.target) && i(c.target);
        });
      }
    }), wt && qr.observe(u, {
      childList: !0,
      attributes: !0,
      characterData: !0,
      subtree: !0
    });
  }
}
function up() {
  qr && qr.disconnect();
}
function cp(e) {
  var t = e.getAttribute("style"), n = [];
  return t && (n = t.split(";").reduce(function(r, i) {
    var a = i.split(":"), o = a[0], l = a.slice(1);
    return o && l.length > 0 && (r[o] = l.join(":").trim()), r;
  }, {})), n;
}
function fp(e) {
  var t = e.getAttribute("data-prefix"), n = e.getAttribute("data-icon"), r = e.innerText !== void 0 ? e.innerText.trim() : "", i = si(to(e));
  return i.prefix || (i.prefix = Tt()), t && n && (i.prefix = t, i.iconName = n), i.iconName && i.prefix || (i.prefix && r.length > 0 && (i.iconName = qh(i.prefix, e.innerText) || io(i.prefix, ca(e.innerText))), !i.iconName && ue.autoFetchSvg && e.firstChild && e.firstChild.nodeType === Node.TEXT_NODE && (i.iconName = e.firstChild.data)), i;
}
function dp(e) {
  var t = gn(e.attributes).reduce(function(i, a) {
    return i.name !== "class" && i.name !== "style" && (i[a.name] = a.value), i;
  }, {}), n = e.getAttribute("title"), r = e.getAttribute("data-fa-title-id");
  return ue.autoA11y && (n ? t["aria-labelledby"] = "".concat(ue.replacementClass, "-title-").concat(r || Yn()) : (t["aria-hidden"] = "true", t.focusable = "false")), t;
}
function hp() {
  return {
    iconName: null,
    title: null,
    titleId: null,
    prefix: null,
    transform: pt,
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
function Ns(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    styleParser: !0
  }, n = fp(e), r = n.iconName, i = n.prefix, a = n.rest, o = dp(e), l = da("parseNodeAttributes", {}, e), u = t.styleParser ? cp(e) : [];
  return oe({
    iconName: r,
    title: e.getAttribute("title"),
    titleId: e.getAttribute("data-fa-title-id"),
    prefix: i,
    transform: pt,
    mask: {
      iconName: null,
      prefix: null,
      rest: []
    },
    maskId: null,
    symbol: !1,
    extra: {
      classes: a,
      styles: u,
      attributes: o
    }
  }, l);
}
var pp = lt.styles;
function ec(e) {
  var t = ue.autoReplaceSvg === "nest" ? Ns(e, {
    styleParser: !1
  }) : Ns(e);
  return ~t.extra.classes.indexOf(Ru) ? xt("generateLayersText", e, t) : xt("generateSvgReplacementMutation", e, t);
}
var jt = /* @__PURE__ */ new Set();
eo.map(function(e) {
  jt.add("fa-".concat(e));
});
Object.keys(qn[Pe]).map(jt.add.bind(jt));
Object.keys(qn[De]).map(jt.add.bind(jt));
jt = Gn(jt);
function As(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  if (!wt)
    return Promise.resolve();
  var n = Ie.documentElement.classList, r = function(c) {
    return n.add("".concat(vs, "-").concat(c));
  }, i = function(c) {
    return n.remove("".concat(vs, "-").concat(c));
  }, a = ue.autoFetchSvg ? jt : eo.map(function(h) {
    return "fa-".concat(h);
  }).concat(Object.keys(pp));
  a.includes("fa") || a.push("fa");
  var o = [".".concat(Ru, ":not([").concat(Bt, "])")].concat(a.map(function(h) {
    return ".".concat(h, ":not([").concat(Bt, "])");
  })).join(", ");
  if (o.length === 0)
    return Promise.resolve();
  var l = [];
  try {
    l = gn(e.querySelectorAll(o));
  } catch {
  }
  if (l.length > 0)
    r("pending"), i("complete");
  else
    return Promise.resolve();
  var u = so.begin("onTree"), f = l.reduce(function(h, c) {
    try {
      var s = ec(c);
      s && h.push(s);
    } catch (d) {
      Mu || d.name === "MissingIcon" && console.error(d);
    }
    return h;
  }, []);
  return new Promise(function(h, c) {
    Promise.all(f).then(function(s) {
      Xu(s, function() {
        r("active"), r("complete"), i("pending"), typeof t == "function" && t(), u(), h();
      });
    }).catch(function(s) {
      u(), c(s);
    });
  });
}
function vp(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
  ec(e).then(function(n) {
    n && Xu([n], t);
  });
}
function gp(e) {
  return function(t) {
    var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = (t || {}).icon ? t : ha(t || {}), i = n.mask;
    return i && (i = (i || {}).icon ? i : ha(i || {})), e(r, oe(oe({}, n), {}, {
      mask: i
    }));
  };
}
var mp = function(t) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r = n.transform, i = r === void 0 ? pt : r, a = n.symbol, o = a === void 0 ? !1 : a, l = n.mask, u = l === void 0 ? null : l, f = n.maskId, h = f === void 0 ? null : f, c = n.title, s = c === void 0 ? null : c, d = n.titleId, y = d === void 0 ? null : d, m = n.classes, b = m === void 0 ? [] : m, v = n.attributes, g = v === void 0 ? {} : v, w = n.styles, p = w === void 0 ? {} : w;
  if (t) {
    var x = t.prefix, _ = t.iconName, E = t.icon;
    return li(oe({
      type: "icon"
    }, t), function() {
      return qt("beforeDOMElementCreation", {
        iconDefinition: t,
        params: n
      }), ue.autoA11y && (s ? g["aria-labelledby"] = "".concat(ue.replacementClass, "-title-").concat(y || Yn()) : (g["aria-hidden"] = "true", g.focusable = "false")), oo({
        icons: {
          main: pa(E),
          mask: u ? pa(u.icon) : {
            found: !1,
            width: null,
            height: null,
            icon: {}
          }
        },
        prefix: x,
        iconName: _,
        transform: oe(oe({}, pt), i),
        symbol: o,
        title: s,
        maskId: h,
        titleId: y,
        extra: {
          attributes: g,
          styles: p,
          classes: b
        }
      });
    });
  }
}, yp = {
  mixout: function() {
    return {
      icon: gp(mp)
    };
  },
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.treeCallback = As, n.nodeCallback = vp, n;
      }
    };
  },
  provides: function(t) {
    t.i2svg = function(n) {
      var r = n.node, i = r === void 0 ? Ie : r, a = n.callback, o = a === void 0 ? function() {
      } : a;
      return As(i, o);
    }, t.generateSvgReplacementMutation = function(n, r) {
      var i = r.iconName, a = r.title, o = r.titleId, l = r.prefix, u = r.transform, f = r.symbol, h = r.mask, c = r.maskId, s = r.extra;
      return new Promise(function(d, y) {
        Promise.all([va(i, l), h.iconName ? va(h.iconName, h.prefix) : Promise.resolve({
          found: !1,
          width: 512,
          height: 512,
          icon: {}
        })]).then(function(m) {
          var b = Za(m, 2), v = b[0], g = b[1];
          d([n, oo({
            icons: {
              main: v,
              mask: g
            },
            prefix: l,
            iconName: i,
            transform: u,
            symbol: f,
            maskId: c,
            title: a,
            titleId: o,
            extra: s,
            watchable: !0
          })]);
        }).catch(y);
      });
    }, t.generateAbstractIcon = function(n) {
      var r = n.children, i = n.attributes, a = n.main, o = n.transform, l = n.styles, u = ai(l);
      u.length > 0 && (i.style = u);
      var f;
      return no(o) && (f = xt("generateAbstractTransformGrouping", {
        main: a,
        transform: o,
        containerWidth: a.width,
        iconWidth: a.width
      })), r.push(f || a.icon), {
        children: r,
        attributes: i
      };
    };
  }
}, bp = {
  mixout: function() {
    return {
      layer: function(n) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.classes, a = i === void 0 ? [] : i;
        return li({
          type: "layer"
        }, function() {
          qt("beforeDOMElementCreation", {
            assembler: n,
            params: r
          });
          var o = [];
          return n(function(l) {
            Array.isArray(l) ? l.map(function(u) {
              o = o.concat(u.abstract);
            }) : o = o.concat(l.abstract);
          }), [{
            tag: "span",
            attributes: {
              class: ["".concat(ue.cssPrefix, "-layers")].concat(Gn(a)).join(" ")
            },
            children: o
          }];
        });
      }
    };
  }
}, xp = {
  mixout: function() {
    return {
      counter: function(n) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.title, a = i === void 0 ? null : i, o = r.classes, l = o === void 0 ? [] : o, u = r.attributes, f = u === void 0 ? {} : u, h = r.styles, c = h === void 0 ? {} : h;
        return li({
          type: "counter",
          content: n
        }, function() {
          return qt("beforeDOMElementCreation", {
            content: n,
            params: r
          }), Jh({
            content: n.toString(),
            title: a,
            extra: {
              attributes: f,
              styles: c,
              classes: ["".concat(ue.cssPrefix, "-layers-counter")].concat(Gn(l))
            }
          });
        });
      }
    };
  }
}, wp = {
  mixout: function() {
    return {
      text: function(n) {
        var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, i = r.transform, a = i === void 0 ? pt : i, o = r.title, l = o === void 0 ? null : o, u = r.classes, f = u === void 0 ? [] : u, h = r.attributes, c = h === void 0 ? {} : h, s = r.styles, d = s === void 0 ? {} : s;
        return li({
          type: "text",
          content: n
        }, function() {
          return qt("beforeDOMElementCreation", {
            content: n,
            params: r
          }), ws({
            content: n,
            transform: oe(oe({}, pt), a),
            title: l,
            extra: {
              attributes: c,
              styles: d,
              classes: ["".concat(ue.cssPrefix, "-layers-text")].concat(Gn(f))
            }
          });
        });
      }
    };
  },
  provides: function(t) {
    t.generateLayersText = function(n, r) {
      var i = r.title, a = r.transform, o = r.extra, l = null, u = null;
      if (Cu) {
        var f = parseInt(getComputedStyle(n).fontSize, 10), h = n.getBoundingClientRect();
        l = h.width / f, u = h.height / f;
      }
      return ue.autoA11y && !i && (o.attributes["aria-hidden"] = "true"), Promise.resolve([n, ws({
        content: n.innerHTML,
        width: l,
        height: u,
        transform: a,
        title: i,
        extra: o,
        watchable: !0
      })]);
    };
  }
}, Op = new RegExp('"', "ug"), ks = [1105920, 1112319];
function Ep(e) {
  var t = e.replace(Op, ""), n = Rh(t, 0), r = n >= ks[0] && n <= ks[1], i = t.length === 2 ? t[0] === t[1] : !1;
  return {
    value: ca(i ? t[0] : t),
    isSecondary: r || i
  };
}
function Ts(e, t) {
  var n = "".concat(fh).concat(t.replace(":", "-"));
  return new Promise(function(r, i) {
    if (e.getAttribute(n) !== null)
      return r();
    var a = gn(e.children), o = a.filter(function(E) {
      return E.getAttribute(ua) === t;
    })[0], l = kt.getComputedStyle(e, t), u = l.getPropertyValue("font-family").match(gh), f = l.getPropertyValue("font-weight"), h = l.getPropertyValue("content");
    if (o && !u)
      return e.removeChild(o), r();
    if (u && h !== "none" && h !== "") {
      var c = l.getPropertyValue("content"), s = ~["Sharp"].indexOf(u[2]) ? De : Pe, d = ~["Solid", "Regular", "Light", "Thin", "Duotone", "Brands", "Kit"].indexOf(u[2]) ? Un[s][u[2].toLowerCase()] : mh[s][f], y = Ep(c), m = y.value, b = y.isSecondary, v = u[0].startsWith("FontAwesome"), g = io(d, m), w = g;
      if (v) {
        var p = Uh(m);
        p.iconName && p.prefix && (g = p.iconName, d = p.prefix);
      }
      if (g && !b && (!o || o.getAttribute(Xa) !== d || o.getAttribute(Ja) !== w)) {
        e.setAttribute(n, w), o && e.removeChild(o);
        var x = hp(), _ = x.extra;
        _.attributes[ua] = t, va(g, d).then(function(E) {
          var k = oo(oe(oe({}, x), {}, {
            icons: {
              main: E,
              mask: ao()
            },
            prefix: d,
            iconName: w,
            extra: _,
            watchable: !0
          })), j = Ie.createElementNS("http://www.w3.org/2000/svg", "svg");
          t === "::before" ? e.insertBefore(j, e.firstChild) : e.appendChild(j), j.outerHTML = k.map(function(S) {
            return Qn(S);
          }).join(`
`), e.removeAttribute(n), r();
        }).catch(i);
      } else
        r();
    } else
      r();
  });
}
function _p(e) {
  return Promise.all([Ts(e, "::before"), Ts(e, "::after")]);
}
function Sp(e) {
  return e.parentNode !== document.head && !~hh.indexOf(e.tagName.toUpperCase()) && !e.getAttribute(ua) && (!e.parentNode || e.parentNode.tagName !== "svg");
}
function js(e) {
  if (wt)
    return new Promise(function(t, n) {
      var r = gn(e.querySelectorAll("*")).filter(Sp).map(_p), i = so.begin("searchPseudoElements");
      Ju(), Promise.all(r).then(function() {
        i(), ma(), t();
      }).catch(function() {
        i(), ma(), n();
      });
    });
}
var Np = {
  hooks: function() {
    return {
      mutationObserverCallbacks: function(n) {
        return n.pseudoElementsCallback = js, n;
      }
    };
  },
  provides: function(t) {
    t.pseudoElements2svg = function(n) {
      var r = n.node, i = r === void 0 ? Ie : r;
      ue.searchPseudoElements && js(i);
    };
  }
}, Ps = !1, Ap = {
  mixout: function() {
    return {
      dom: {
        unwatch: function() {
          Ju(), Ps = !0;
        }
      }
    };
  },
  hooks: function() {
    return {
      bootstrap: function() {
        Ss(da("mutationObserverCallbacks", {}));
      },
      noAuto: function() {
        up();
      },
      watch: function(n) {
        var r = n.observeMutationsRoot;
        Ps ? ma() : Ss(da("mutationObserverCallbacks", {
          observeMutationsRoot: r
        }));
      }
    };
  }
}, Cs = function(t) {
  var n = {
    size: 16,
    x: 0,
    y: 0,
    flipX: !1,
    flipY: !1,
    rotate: 0
  };
  return t.toLowerCase().split(" ").reduce(function(r, i) {
    var a = i.toLowerCase().split("-"), o = a[0], l = a.slice(1).join("-");
    if (o && l === "h")
      return r.flipX = !0, r;
    if (o && l === "v")
      return r.flipY = !0, r;
    if (l = parseFloat(l), isNaN(l))
      return r;
    switch (o) {
      case "grow":
        r.size = r.size + l;
        break;
      case "shrink":
        r.size = r.size - l;
        break;
      case "left":
        r.x = r.x - l;
        break;
      case "right":
        r.x = r.x + l;
        break;
      case "up":
        r.y = r.y - l;
        break;
      case "down":
        r.y = r.y + l;
        break;
      case "rotate":
        r.rotate = r.rotate + l;
        break;
    }
    return r;
  }, n);
}, kp = {
  mixout: function() {
    return {
      parse: {
        transform: function(n) {
          return Cs(n);
        }
      }
    };
  },
  hooks: function() {
    return {
      parseNodeAttributes: function(n, r) {
        var i = r.getAttribute("data-fa-transform");
        return i && (n.transform = Cs(i)), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractTransformGrouping = function(n) {
      var r = n.main, i = n.transform, a = n.containerWidth, o = n.iconWidth, l = {
        transform: "translate(".concat(a / 2, " 256)")
      }, u = "translate(".concat(i.x * 32, ", ").concat(i.y * 32, ") "), f = "scale(".concat(i.size / 16 * (i.flipX ? -1 : 1), ", ").concat(i.size / 16 * (i.flipY ? -1 : 1), ") "), h = "rotate(".concat(i.rotate, " 0 0)"), c = {
        transform: "".concat(u, " ").concat(f, " ").concat(h)
      }, s = {
        transform: "translate(".concat(o / 2 * -1, " -256)")
      }, d = {
        outer: l,
        inner: c,
        path: s
      };
      return {
        tag: "g",
        attributes: oe({}, d.outer),
        children: [{
          tag: "g",
          attributes: oe({}, d.inner),
          children: [{
            tag: r.icon.tag,
            children: r.icon.children,
            attributes: oe(oe({}, r.icon.attributes), d.path)
          }]
        }]
      };
    };
  }
}, Ci = {
  x: 0,
  y: 0,
  width: "100%",
  height: "100%"
};
function Is(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return e.attributes && (e.attributes.fill || t) && (e.attributes.fill = "black"), e;
}
function Tp(e) {
  return e.tag === "g" ? e.children : [e];
}
var jp = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, r) {
        var i = r.getAttribute("data-fa-mask"), a = i ? si(i.split(" ").map(function(o) {
          return o.trim();
        })) : ao();
        return a.prefix || (a.prefix = Tt()), n.mask = a, n.maskId = r.getAttribute("data-fa-mask-id"), n;
      }
    };
  },
  provides: function(t) {
    t.generateAbstractMask = function(n) {
      var r = n.children, i = n.attributes, a = n.main, o = n.mask, l = n.maskId, u = n.transform, f = a.width, h = a.icon, c = o.width, s = o.icon, d = kh({
        transform: u,
        containerWidth: c,
        iconWidth: f
      }), y = {
        tag: "rect",
        attributes: oe(oe({}, Ci), {}, {
          fill: "white"
        })
      }, m = h.children ? {
        children: h.children.map(Is)
      } : {}, b = {
        tag: "g",
        attributes: oe({}, d.inner),
        children: [Is(oe({
          tag: h.tag,
          attributes: oe(oe({}, h.attributes), d.path)
        }, m))]
      }, v = {
        tag: "g",
        attributes: oe({}, d.outer),
        children: [b]
      }, g = "mask-".concat(l || Yn()), w = "clip-".concat(l || Yn()), p = {
        tag: "mask",
        attributes: oe(oe({}, Ci), {}, {
          id: g,
          maskUnits: "userSpaceOnUse",
          maskContentUnits: "userSpaceOnUse"
        }),
        children: [y, v]
      }, x = {
        tag: "defs",
        children: [{
          tag: "clipPath",
          attributes: {
            id: w
          },
          children: Tp(s)
        }, p]
      };
      return r.push(x, {
        tag: "rect",
        attributes: oe({
          fill: "currentColor",
          "clip-path": "url(#".concat(w, ")"),
          mask: "url(#".concat(g, ")")
        }, Ci)
      }), {
        children: r,
        attributes: i
      };
    };
  }
}, Pp = {
  provides: function(t) {
    var n = !1;
    kt.matchMedia && (n = kt.matchMedia("(prefers-reduced-motion: reduce)").matches), t.missingIconAbstract = function() {
      var r = [], i = {
        fill: "currentColor"
      }, a = {
        attributeType: "XML",
        repeatCount: "indefinite",
        dur: "2s"
      };
      r.push({
        tag: "path",
        attributes: oe(oe({}, i), {}, {
          d: "M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"
        })
      });
      var o = oe(oe({}, a), {}, {
        attributeName: "opacity"
      }), l = {
        tag: "circle",
        attributes: oe(oe({}, i), {}, {
          cx: "256",
          cy: "364",
          r: "28"
        }),
        children: []
      };
      return n || l.children.push({
        tag: "animate",
        attributes: oe(oe({}, a), {}, {
          attributeName: "r",
          values: "28;14;28;28;14;28;"
        })
      }, {
        tag: "animate",
        attributes: oe(oe({}, o), {}, {
          values: "1;0;1;1;0;1;"
        })
      }), r.push(l), r.push({
        tag: "path",
        attributes: oe(oe({}, i), {}, {
          opacity: "1",
          d: "M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"
        }),
        children: n ? [] : [{
          tag: "animate",
          attributes: oe(oe({}, o), {}, {
            values: "1;0;0;0;0;1;"
          })
        }]
      }), n || r.push({
        tag: "path",
        attributes: oe(oe({}, i), {}, {
          opacity: "0",
          d: "M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"
        }),
        children: [{
          tag: "animate",
          attributes: oe(oe({}, o), {}, {
            values: "0;0;1;1;0;0;"
          })
        }]
      }), {
        tag: "g",
        attributes: {
          class: "missing"
        },
        children: r
      };
    };
  }
}, Cp = {
  hooks: function() {
    return {
      parseNodeAttributes: function(n, r) {
        var i = r.getAttribute("data-fa-symbol"), a = i === null ? !1 : i === "" ? !0 : i;
        return n.symbol = a, n;
      }
    };
  }
}, Ip = [Ph, yp, bp, xp, wp, Np, Ap, kp, jp, Pp, Cp];
Yh(Ip, {
  mixoutsTo: nt
});
nt.noAuto;
nt.config;
nt.library;
nt.dom;
var ya = nt.parse;
nt.findIconDefinition;
nt.toHtml;
var Lp = nt.icon;
nt.layer;
nt.text;
nt.counter;
var ba = { exports: {} }, hr = { exports: {} }, _e = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ls;
function Mp() {
  if (Ls)
    return _e;
  Ls = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, c = e ? Symbol.for("react.suspense") : 60113, s = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, g = e ? Symbol.for("react.scope") : 60119;
  function w(x) {
    if (typeof x == "object" && x !== null) {
      var _ = x.$$typeof;
      switch (_) {
        case t:
          switch (x = x.type, x) {
            case u:
            case f:
            case r:
            case a:
            case i:
            case c:
              return x;
            default:
              switch (x = x && x.$$typeof, x) {
                case l:
                case h:
                case y:
                case d:
                case o:
                  return x;
                default:
                  return _;
              }
          }
        case n:
          return _;
      }
    }
  }
  function p(x) {
    return w(x) === f;
  }
  return _e.AsyncMode = u, _e.ConcurrentMode = f, _e.ContextConsumer = l, _e.ContextProvider = o, _e.Element = t, _e.ForwardRef = h, _e.Fragment = r, _e.Lazy = y, _e.Memo = d, _e.Portal = n, _e.Profiler = a, _e.StrictMode = i, _e.Suspense = c, _e.isAsyncMode = function(x) {
    return p(x) || w(x) === u;
  }, _e.isConcurrentMode = p, _e.isContextConsumer = function(x) {
    return w(x) === l;
  }, _e.isContextProvider = function(x) {
    return w(x) === o;
  }, _e.isElement = function(x) {
    return typeof x == "object" && x !== null && x.$$typeof === t;
  }, _e.isForwardRef = function(x) {
    return w(x) === h;
  }, _e.isFragment = function(x) {
    return w(x) === r;
  }, _e.isLazy = function(x) {
    return w(x) === y;
  }, _e.isMemo = function(x) {
    return w(x) === d;
  }, _e.isPortal = function(x) {
    return w(x) === n;
  }, _e.isProfiler = function(x) {
    return w(x) === a;
  }, _e.isStrictMode = function(x) {
    return w(x) === i;
  }, _e.isSuspense = function(x) {
    return w(x) === c;
  }, _e.isValidElementType = function(x) {
    return typeof x == "string" || typeof x == "function" || x === r || x === f || x === a || x === i || x === c || x === s || typeof x == "object" && x !== null && (x.$$typeof === y || x.$$typeof === d || x.$$typeof === o || x.$$typeof === l || x.$$typeof === h || x.$$typeof === b || x.$$typeof === v || x.$$typeof === g || x.$$typeof === m);
  }, _e.typeOf = w, _e;
}
var Se = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ms;
function Rp() {
  return Ms || (Ms = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, i = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, o = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, h = e ? Symbol.for("react.forward_ref") : 60112, c = e ? Symbol.for("react.suspense") : 60113, s = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, y = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, v = e ? Symbol.for("react.responder") : 60118, g = e ? Symbol.for("react.scope") : 60119;
    function w(Z) {
      return typeof Z == "string" || typeof Z == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      Z === r || Z === f || Z === a || Z === i || Z === c || Z === s || typeof Z == "object" && Z !== null && (Z.$$typeof === y || Z.$$typeof === d || Z.$$typeof === o || Z.$$typeof === l || Z.$$typeof === h || Z.$$typeof === b || Z.$$typeof === v || Z.$$typeof === g || Z.$$typeof === m);
    }
    function p(Z) {
      if (typeof Z == "object" && Z !== null) {
        var le = Z.$$typeof;
        switch (le) {
          case t:
            var ce = Z.type;
            switch (ce) {
              case u:
              case f:
              case r:
              case a:
              case i:
              case c:
                return ce;
              default:
                var he = ce && ce.$$typeof;
                switch (he) {
                  case l:
                  case h:
                  case y:
                  case d:
                  case o:
                    return he;
                  default:
                    return le;
                }
            }
          case n:
            return le;
        }
      }
    }
    var x = u, _ = f, E = l, k = o, j = t, S = h, O = r, N = y, T = d, C = n, D = a, H = i, U = c, K = !1;
    function q(Z) {
      return K || (K = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), P(Z) || p(Z) === u;
    }
    function P(Z) {
      return p(Z) === f;
    }
    function A(Z) {
      return p(Z) === l;
    }
    function M(Z) {
      return p(Z) === o;
    }
    function R(Z) {
      return typeof Z == "object" && Z !== null && Z.$$typeof === t;
    }
    function z(Z) {
      return p(Z) === h;
    }
    function B(Z) {
      return p(Z) === r;
    }
    function I(Z) {
      return p(Z) === y;
    }
    function $(Z) {
      return p(Z) === d;
    }
    function W(Z) {
      return p(Z) === n;
    }
    function Y(Z) {
      return p(Z) === a;
    }
    function V(Z) {
      return p(Z) === i;
    }
    function ee(Z) {
      return p(Z) === c;
    }
    Se.AsyncMode = x, Se.ConcurrentMode = _, Se.ContextConsumer = E, Se.ContextProvider = k, Se.Element = j, Se.ForwardRef = S, Se.Fragment = O, Se.Lazy = N, Se.Memo = T, Se.Portal = C, Se.Profiler = D, Se.StrictMode = H, Se.Suspense = U, Se.isAsyncMode = q, Se.isConcurrentMode = P, Se.isContextConsumer = A, Se.isContextProvider = M, Se.isElement = R, Se.isForwardRef = z, Se.isFragment = B, Se.isLazy = I, Se.isMemo = $, Se.isPortal = W, Se.isProfiler = Y, Se.isStrictMode = V, Se.isSuspense = ee, Se.isValidElementType = w, Se.typeOf = p;
  }()), Se;
}
var Rs;
function tc() {
  return Rs || (Rs = 1, process.env.NODE_ENV === "production" ? hr.exports = Mp() : hr.exports = Rp()), hr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ii, Ds;
function Dp() {
  if (Ds)
    return Ii;
  Ds = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(a) {
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
      for (var o = {}, l = 0; l < 10; l++)
        o["_" + String.fromCharCode(l)] = l;
      var u = Object.getOwnPropertyNames(o).map(function(h) {
        return o[h];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var f = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(h) {
        f[h] = h;
      }), Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ii = i() ? Object.assign : function(a, o) {
    for (var l, u = r(a), f, h = 1; h < arguments.length; h++) {
      l = Object(arguments[h]);
      for (var c in l)
        t.call(l, c) && (u[c] = l[c]);
      if (e) {
        f = e(l);
        for (var s = 0; s < f.length; s++)
          n.call(l, f[s]) && (u[f[s]] = l[f[s]]);
      }
    }
    return u;
  }, Ii;
}
var Li, $s;
function uo() {
  if ($s)
    return Li;
  $s = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Li = e, Li;
}
var Mi, zs;
function nc() {
  return zs || (zs = 1, Mi = Function.call.bind(Object.prototype.hasOwnProperty)), Mi;
}
var Ri, Fs;
function $p() {
  if (Fs)
    return Ri;
  Fs = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = uo(), n = {}, r = nc();
    e = function(a) {
      var o = "Warning: " + a;
      typeof console < "u" && console.error(o);
      try {
        throw new Error(o);
      } catch {
      }
    };
  }
  function i(a, o, l, u, f) {
    if (process.env.NODE_ENV !== "production") {
      for (var h in a)
        if (r(a, h)) {
          var c;
          try {
            if (typeof a[h] != "function") {
              var s = Error(
                (u || "React class") + ": " + l + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw s.name = "Invariant Violation", s;
            }
            c = a[h](o, h, u, l, null, t);
          } catch (y) {
            c = y;
          }
          if (c && !(c instanceof Error) && e(
            (u || "React class") + ": type specification of " + l + " `" + h + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof c + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), c instanceof Error && !(c.message in n)) {
            n[c.message] = !0;
            var d = f ? f() : "";
            e(
              "Failed " + l + " type: " + c.message + (d ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Ri = i, Ri;
}
var Di, Bs;
function zp() {
  if (Bs)
    return Di;
  Bs = 1;
  var e = tc(), t = Dp(), n = uo(), r = nc(), i = $p(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(l) {
    var u = "Warning: " + l;
    typeof console < "u" && console.error(u);
    try {
      throw new Error(u);
    } catch {
    }
  });
  function o() {
    return null;
  }
  return Di = function(l, u) {
    var f = typeof Symbol == "function" && Symbol.iterator, h = "@@iterator";
    function c(P) {
      var A = P && (f && P[f] || P[h]);
      if (typeof A == "function")
        return A;
    }
    var s = "<<anonymous>>", d = {
      array: v("array"),
      bigint: v("bigint"),
      bool: v("boolean"),
      func: v("function"),
      number: v("number"),
      object: v("object"),
      string: v("string"),
      symbol: v("symbol"),
      any: g(),
      arrayOf: w,
      element: p(),
      elementType: x(),
      instanceOf: _,
      node: S(),
      objectOf: k,
      oneOf: E,
      oneOfType: j,
      shape: N,
      exact: T
    };
    function y(P, A) {
      return P === A ? P !== 0 || 1 / P === 1 / A : P !== P && A !== A;
    }
    function m(P, A) {
      this.message = P, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function b(P) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, M = 0;
      function R(B, I, $, W, Y, V, ee) {
        if (W = W || s, V = V || $, ee !== n) {
          if (u) {
            var Z = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw Z.name = "Invariant Violation", Z;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var le = W + ":" + $;
            !A[le] && // Avoid spamming the console because they are often not actionable except for lib authors
            M < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + V + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[le] = !0, M++);
          }
        }
        return I[$] == null ? B ? I[$] === null ? new m("The " + Y + " `" + V + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new m("The " + Y + " `" + V + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : P(I, $, W, Y, V);
      }
      var z = R.bind(null, !1);
      return z.isRequired = R.bind(null, !0), z;
    }
    function v(P) {
      function A(M, R, z, B, I, $) {
        var W = M[R], Y = H(W);
        if (Y !== P) {
          var V = U(W);
          return new m(
            "Invalid " + B + " `" + I + "` of type " + ("`" + V + "` supplied to `" + z + "`, expected ") + ("`" + P + "`."),
            { expectedType: P }
          );
        }
        return null;
      }
      return b(A);
    }
    function g() {
      return b(o);
    }
    function w(P) {
      function A(M, R, z, B, I) {
        if (typeof P != "function")
          return new m("Property `" + I + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var $ = M[R];
        if (!Array.isArray($)) {
          var W = H($);
          return new m("Invalid " + B + " `" + I + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var Y = 0; Y < $.length; Y++) {
          var V = P($, Y, z, B, I + "[" + Y + "]", n);
          if (V instanceof Error)
            return V;
        }
        return null;
      }
      return b(A);
    }
    function p() {
      function P(A, M, R, z, B) {
        var I = A[M];
        if (!l(I)) {
          var $ = H(I);
          return new m("Invalid " + z + " `" + B + "` of type " + ("`" + $ + "` supplied to `" + R + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(P);
    }
    function x() {
      function P(A, M, R, z, B) {
        var I = A[M];
        if (!e.isValidElementType(I)) {
          var $ = H(I);
          return new m("Invalid " + z + " `" + B + "` of type " + ("`" + $ + "` supplied to `" + R + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(P);
    }
    function _(P) {
      function A(M, R, z, B, I) {
        if (!(M[R] instanceof P)) {
          var $ = P.name || s, W = q(M[R]);
          return new m("Invalid " + B + " `" + I + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + $ + "`."));
        }
        return null;
      }
      return b(A);
    }
    function E(P) {
      if (!Array.isArray(P))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), o;
      function A(M, R, z, B, I) {
        for (var $ = M[R], W = 0; W < P.length; W++)
          if (y($, P[W]))
            return null;
        var Y = JSON.stringify(P, function(ee, Z) {
          var le = U(Z);
          return le === "symbol" ? String(Z) : Z;
        });
        return new m("Invalid " + B + " `" + I + "` of value `" + String($) + "` " + ("supplied to `" + z + "`, expected one of " + Y + "."));
      }
      return b(A);
    }
    function k(P) {
      function A(M, R, z, B, I) {
        if (typeof P != "function")
          return new m("Property `" + I + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var $ = M[R], W = H($);
        if (W !== "object")
          return new m("Invalid " + B + " `" + I + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var Y in $)
          if (r($, Y)) {
            var V = P($, Y, z, B, I + "." + Y, n);
            if (V instanceof Error)
              return V;
          }
        return null;
      }
      return b(A);
    }
    function j(P) {
      if (!Array.isArray(P))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), o;
      for (var A = 0; A < P.length; A++) {
        var M = P[A];
        if (typeof M != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + K(M) + " at index " + A + "."
          ), o;
      }
      function R(z, B, I, $, W) {
        for (var Y = [], V = 0; V < P.length; V++) {
          var ee = P[V], Z = ee(z, B, I, $, W, n);
          if (Z == null)
            return null;
          Z.data && r(Z.data, "expectedType") && Y.push(Z.data.expectedType);
        }
        var le = Y.length > 0 ? ", expected one of type [" + Y.join(", ") + "]" : "";
        return new m("Invalid " + $ + " `" + W + "` supplied to " + ("`" + I + "`" + le + "."));
      }
      return b(R);
    }
    function S() {
      function P(A, M, R, z, B) {
        return C(A[M]) ? null : new m("Invalid " + z + " `" + B + "` supplied to " + ("`" + R + "`, expected a ReactNode."));
      }
      return b(P);
    }
    function O(P, A, M, R, z) {
      return new m(
        (P || "React class") + ": " + A + " type `" + M + "." + R + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function N(P) {
      function A(M, R, z, B, I) {
        var $ = M[R], W = H($);
        if (W !== "object")
          return new m("Invalid " + B + " `" + I + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var Y in P) {
          var V = P[Y];
          if (typeof V != "function")
            return O(z, B, I, Y, U(V));
          var ee = V($, Y, z, B, I + "." + Y, n);
          if (ee)
            return ee;
        }
        return null;
      }
      return b(A);
    }
    function T(P) {
      function A(M, R, z, B, I) {
        var $ = M[R], W = H($);
        if (W !== "object")
          return new m("Invalid " + B + " `" + I + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var Y = t({}, M[R], P);
        for (var V in Y) {
          var ee = P[V];
          if (r(P, V) && typeof ee != "function")
            return O(z, B, I, V, U(ee));
          if (!ee)
            return new m(
              "Invalid " + B + " `" + I + "` key `" + V + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(M[R], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(P), null, "  ")
            );
          var Z = ee($, V, z, B, I + "." + V, n);
          if (Z)
            return Z;
        }
        return null;
      }
      return b(A);
    }
    function C(P) {
      switch (typeof P) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !P;
        case "object":
          if (Array.isArray(P))
            return P.every(C);
          if (P === null || l(P))
            return !0;
          var A = c(P);
          if (A) {
            var M = A.call(P), R;
            if (A !== P.entries) {
              for (; !(R = M.next()).done; )
                if (!C(R.value))
                  return !1;
            } else
              for (; !(R = M.next()).done; ) {
                var z = R.value;
                if (z && !C(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function D(P, A) {
      return P === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function H(P) {
      var A = typeof P;
      return Array.isArray(P) ? "array" : P instanceof RegExp ? "object" : D(A, P) ? "symbol" : A;
    }
    function U(P) {
      if (typeof P > "u" || P === null)
        return "" + P;
      var A = H(P);
      if (A === "object") {
        if (P instanceof Date)
          return "date";
        if (P instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function K(P) {
      var A = U(P);
      switch (A) {
        case "array":
        case "object":
          return "an " + A;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + A;
        default:
          return A;
      }
    }
    function q(P) {
      return !P.constructor || !P.constructor.name ? s : P.constructor.name;
    }
    return d.checkPropTypes = i, d.resetWarningCache = i.resetWarningCache, d.PropTypes = d, d;
  }, Di;
}
var $i, qs;
function Fp() {
  if (qs)
    return $i;
  qs = 1;
  var e = uo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, $i = function() {
    function r(o, l, u, f, h, c) {
      if (c !== e) {
        var s = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw s.name = "Invariant Violation", s;
      }
    }
    r.isRequired = r;
    function i() {
      return r;
    }
    var a = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: i,
      element: r,
      elementType: r,
      instanceOf: i,
      node: r,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, $i;
}
if (process.env.NODE_ENV !== "production") {
  var Bp = tc(), qp = !0;
  ba.exports = zp()(Bp.isElement, qp);
} else
  ba.exports = Fp()();
var Up = ba.exports;
const se = /* @__PURE__ */ au(Up);
function Us(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function St(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Us(Object(n), !0).forEach(function(r) {
      en(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Us(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function Ur(e) {
  "@babel/helpers - typeof";
  return Ur = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
    return typeof t;
  } : function(t) {
    return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
  }, Ur(e);
}
function en(e, t, n) {
  return t in e ? Object.defineProperty(e, t, {
    value: n,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[t] = n, e;
}
function Hp(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Wp(e, t) {
  if (e == null)
    return {};
  var n = Hp(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function xa(e) {
  return Yp(e) || Vp(e) || Kp(e) || Gp();
}
function Yp(e) {
  if (Array.isArray(e))
    return wa(e);
}
function Vp(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Kp(e, t) {
  if (e) {
    if (typeof e == "string")
      return wa(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return wa(e, t);
  }
}
function wa(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Gp() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Zp(e) {
  var t, n = e.beat, r = e.fade, i = e.beatFade, a = e.bounce, o = e.shake, l = e.flash, u = e.spin, f = e.spinPulse, h = e.spinReverse, c = e.pulse, s = e.fixedWidth, d = e.inverse, y = e.border, m = e.listItem, b = e.flip, v = e.size, g = e.rotation, w = e.pull, p = (t = {
    "fa-beat": n,
    "fa-fade": r,
    "fa-beat-fade": i,
    "fa-bounce": a,
    "fa-shake": o,
    "fa-flash": l,
    "fa-spin": u,
    "fa-spin-reverse": h,
    "fa-spin-pulse": f,
    "fa-pulse": c,
    "fa-fw": s,
    "fa-inverse": d,
    "fa-border": y,
    "fa-li": m,
    "fa-flip": b === !0,
    "fa-flip-horizontal": b === "horizontal" || b === "both",
    "fa-flip-vertical": b === "vertical" || b === "both"
  }, en(t, "fa-".concat(v), typeof v < "u" && v !== null), en(t, "fa-rotate-".concat(g), typeof g < "u" && g !== null && g !== 0), en(t, "fa-pull-".concat(w), typeof w < "u" && w !== null), en(t, "fa-swap-opacity", e.swapOpacity), t);
  return Object.keys(p).map(function(x) {
    return p[x] ? x : null;
  }).filter(function(x) {
    return x;
  });
}
function Qp(e) {
  return e = e - 0, e === e;
}
function rc(e) {
  return Qp(e) ? e : (e = e.replace(/[\-_\s]+(.)?/g, function(t, n) {
    return n ? n.toUpperCase() : "";
  }), e.substr(0, 1).toLowerCase() + e.substr(1));
}
var Xp = ["style"];
function Jp(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ev(e) {
  return e.split(";").map(function(t) {
    return t.trim();
  }).filter(function(t) {
    return t;
  }).reduce(function(t, n) {
    var r = n.indexOf(":"), i = rc(n.slice(0, r)), a = n.slice(r + 1).trim();
    return i.startsWith("webkit") ? t[Jp(i)] = a : t[i] = a, t;
  }, {});
}
function ic(e, t) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (typeof t == "string")
    return t;
  var r = (t.children || []).map(function(u) {
    return ic(e, u);
  }), i = Object.keys(t.attributes || {}).reduce(function(u, f) {
    var h = t.attributes[f];
    switch (f) {
      case "class":
        u.attrs.className = h, delete t.attributes.class;
        break;
      case "style":
        u.attrs.style = ev(h);
        break;
      default:
        f.indexOf("aria-") === 0 || f.indexOf("data-") === 0 ? u.attrs[f.toLowerCase()] = h : u.attrs[rc(f)] = h;
    }
    return u;
  }, {
    attrs: {}
  }), a = n.style, o = a === void 0 ? {} : a, l = Wp(n, Xp);
  return i.attrs.style = St(St({}, i.attrs.style), o), e.apply(void 0, [t.tag, St(St({}, i.attrs), l)].concat(xa(r)));
}
var ac = !1;
try {
  ac = process.env.NODE_ENV === "production";
} catch {
}
function tv() {
  if (!ac && console && typeof console.error == "function") {
    var e;
    (e = console).error.apply(e, arguments);
  }
}
function Hs(e) {
  if (e && Ur(e) === "object" && e.prefix && e.iconName && e.icon)
    return e;
  if (ya.icon)
    return ya.icon(e);
  if (e === null)
    return null;
  if (e && Ur(e) === "object" && e.prefix && e.iconName)
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
function zi(e, t) {
  return Array.isArray(t) && t.length > 0 || !Array.isArray(t) && t ? en({}, e, t) : {};
}
var Je = /* @__PURE__ */ Ue.forwardRef(function(e, t) {
  var n = e.icon, r = e.mask, i = e.symbol, a = e.className, o = e.title, l = e.titleId, u = e.maskId, f = Hs(n), h = zi("classes", [].concat(xa(Zp(e)), xa(a.split(" ")))), c = zi("transform", typeof e.transform == "string" ? ya.transform(e.transform) : e.transform), s = zi("mask", Hs(r)), d = Lp(f, St(St(St(St({}, h), c), s), {}, {
    symbol: i,
    title: o,
    titleId: l,
    maskId: u
  }));
  if (!d)
    return tv("Could not find icon", f), null;
  var y = d.abstract, m = {
    ref: t
  };
  return Object.keys(e).forEach(function(b) {
    Je.defaultProps.hasOwnProperty(b) || (m[b] = e[b]);
  }), nv(y[0], m);
});
Je.displayName = "FontAwesomeIcon";
Je.propTypes = {
  beat: se.bool,
  border: se.bool,
  beatFade: se.bool,
  bounce: se.bool,
  className: se.string,
  fade: se.bool,
  flash: se.bool,
  mask: se.oneOfType([se.object, se.array, se.string]),
  maskId: se.string,
  fixedWidth: se.bool,
  inverse: se.bool,
  flip: se.oneOf([!0, !1, "horizontal", "vertical", "both"]),
  icon: se.oneOfType([se.object, se.array, se.string]),
  listItem: se.bool,
  pull: se.oneOf(["right", "left"]),
  pulse: se.bool,
  rotation: se.oneOf([0, 90, 180, 270]),
  shake: se.bool,
  size: se.oneOf(["2xs", "xs", "sm", "lg", "xl", "2xl", "1x", "2x", "3x", "4x", "5x", "6x", "7x", "8x", "9x", "10x"]),
  spin: se.bool,
  spinPulse: se.bool,
  spinReverse: se.bool,
  symbol: se.oneOfType([se.bool, se.string]),
  title: se.string,
  titleId: se.string,
  transform: se.oneOfType([se.string, se.object]),
  swapOpacity: se.bool
};
Je.defaultProps = {
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
var nv = ic.bind(null, Ue.createElement);
const rv = ({ errors: e }) => {
  var n, r, i, a, o, l, u, f, h;
  let t = "";
  return (e.password_register && e.password_register.types || e.new_password && e.new_password.types) && (e.password_register && ((r = (n = e == null ? void 0 : e.password_register) == null ? void 0 : n.types) != null && r.matches) ? t = t + e.password_register.types.matches : e.new_password && ((a = (i = e == null ? void 0 : e.new_password) == null ? void 0 : i.types) != null && a.matches) && (t = t + e.new_password.types.matches), e.password_register && ((l = (o = e == null ? void 0 : e.password_register) == null ? void 0 : o.types) != null && l.min) ? t = t + e.password_register.types.min : e.new_password && ((f = (u = e == null ? void 0 : e.new_password) == null ? void 0 : u.types) != null && f.min) && (t = t + ((h = e == null ? void 0 : e.new_password.types) == null ? void 0 : h.min))), /* @__PURE__ */ L.jsxs("div", { className: "text-xs mb-4 mt-4", children: [
    "t('password_req')",
    /* @__PURE__ */ L.jsxs("ul", { className: "ml-2", children: [
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_length')") ? /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_min_char')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_uppercase')") ? /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_uppercase')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_lowercase')") ? /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_lowercase')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_number')") ? /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_number')",
        " "
      ] }),
      /* @__PURE__ */ L.jsxs("li", { children: [
        t && !t.includes("t('password_req_special_char')") ? /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-blue-light", icon: "check" }) : /* @__PURE__ */ L.jsx(Je, { className: "mr-1 text-red", icon: "check" }),
        "t('password_req_special_char'): ^ $ * . [ ] { } ( ) ? \" ! @ # % & , > < ' : ; _ ~  ` \\ |"
      ] })
    ] })
  ] });
};
var oc = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
}, Ws = Ue.createContext && Ue.createContext(oc), Nt = globalThis && globalThis.__assign || function() {
  return Nt = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, Nt.apply(this, arguments);
}, iv = globalThis && globalThis.__rest || function(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, r = Object.getOwnPropertySymbols(e); i < r.length; i++)
      t.indexOf(r[i]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[i]) && (n[r[i]] = e[r[i]]);
  return n;
};
function sc(e) {
  return e && e.map(function(t, n) {
    return Ue.createElement(t.tag, Nt({
      key: n
    }, t.attr), sc(t.child));
  });
}
function $e(e) {
  return function(t) {
    return Ue.createElement(av, Nt({
      attr: Nt({}, e.attr)
    }, t), sc(e.child));
  };
}
function av(e) {
  var t = function(n) {
    var r = e.attr, i = e.size, a = e.title, o = iv(e, ["attr", "size", "title"]), l = i || n.size || "1em", u;
    return n.className && (u = n.className), e.className && (u = (u ? u + " " : "") + e.className), Ue.createElement("svg", Nt({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, n.attr, r, o, {
      className: u,
      style: Nt(Nt({
        color: e.color || n.color
      }, n.style), e.style),
      height: l,
      width: l,
      xmlns: "http://www.w3.org/2000/svg"
    }), a && Ue.createElement("title", null, a), e.children);
  };
  return Ws !== void 0 ? Ue.createElement(Ws.Consumer, null, function(n) {
    return t(n);
  }) : t(oc);
}
function ov(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z" } }] })(e);
}
function sv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" } }] })(e);
}
function lv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" } }] })(e);
}
function uv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 320 512" }, child: [{ tag: "path", attr: { d: "M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" } }] })(e);
}
function cv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 640 512" }, child: [{ tag: "path", attr: { d: "M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z" } }] })(e);
}
function fv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" } }] })(e);
}
function Qt(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 384 512" }, child: [{ tag: "path", attr: { d: "M384 121.941V128H256V0h6.059a24 24 0 0 1 16.97 7.029l97.941 97.941a24.002 24.002 0 0 1 7.03 16.971zM248 160c-13.2 0-24-10.8-24-24V0H24C10.745 0 0 10.745 0 24v464c0 13.255 10.745 24 24 24h336c13.255 0 24-10.745 24-24V160H248zm-135.455 16c26.51 0 48 21.49 48 48s-21.49 48-48 48-48-21.49-48-48 21.491-48 48-48zm208 240h-256l.485-48.485L104.545 328c4.686-4.686 11.799-4.201 16.485.485L160.545 368 264.06 264.485c4.686-4.686 12.284-4.686 16.971 0L320.545 304v112z" } }] })(e);
}
function dv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 384 512" }, child: [{ tag: "path", attr: { d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" } }] })(e);
}
function lc(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" } }] })(e);
}
function hv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z" } }] })(e);
}
function pv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" } }] })(e);
}
function vv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" } }] })(e);
}
function co(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 352 512" }, child: [{ tag: "path", attr: { d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" } }] })(e);
}
function Ys(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 448 512" }, child: [{ tag: "path", attr: { d: "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" } }] })(e);
}
function Fi(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 576 512" }, child: [{ tag: "path", attr: { d: "M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" } }] })(e);
}
function Vs(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 384 512" }, child: [{ tag: "path", attr: { d: "M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm250.2-143.7c-12.2-12-47-8.7-64.4-6.5-17.2-10.5-28.7-25-36.8-46.3 3.9-16.1 10.1-40.6 5.4-56-4.2-26.2-37.8-23.6-42.6-5.9-4.4 16.1-.4 38.5 7 67.1-10 23.9-24.9 56-35.4 74.4-20 10.3-47 26.2-51 46.2-3.3 15.8 26 55.2 76.1-31.2 22.4-7.4 46.8-16.5 68.4-20.1 18.9 10.2 41 17 55.8 17 25.5 0 28-28.2 17.5-38.7zm-198.1 77.8c5.1-13.7 24.5-29.5 30.4-35-19 30.3-30.4 35.7-30.4 35zm81.6-190.6c7.4 0 6.7 32.1 1.8 40.8-4.4-13.9-4.3-40.8-1.8-40.8zm-24.4 136.6c9.7-16.9 18-37 24.7-54.7 8.3 15.1 18.9 27.2 30.1 35.5-20.8 4.3-38.9 13.1-54.8 19.2zm131.6-5s-5 6-37.3-7.8c35.1-2.6 40.9 5.4 37.3 7.8z" } }] })(e);
}
const jw = ({
  reference: e,
  error: t,
  label: n,
  placeholder: r,
  type: i,
  maxLength: a = 255,
  required: o = !1,
  ...l
}) => {
  const [u, f] = Ge(i || "text");
  return /* @__PURE__ */ L.jsxs("div", { className: "w-full", children: [
    n && /* @__PURE__ */ L.jsxs(
      "label",
      {
        htmlFor: n,
        className: "block mb-1 text-left text-xs font-medium flex",
        children: [
          n,
          " ",
          o && /* @__PURE__ */ L.jsx("span", { className: "text-red inline-block mx-1", children: "*" })
        ]
      }
    ),
    /* @__PURE__ */ L.jsx(
      "input",
      {
        ...e,
        ...l,
        type: u,
        maxLength: a,
        placeholder: r,
        required: o,
        className: "shadow-soft-white border border-gray-lines focus:border-main bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-2xl placeholder-gray cursor-pointer transition-all duration-200 outline-none hover:border-main hover:outline-none hover:shadow-inner focus:outline-none focus:shadow-focus active:outline-none"
      }
    ),
    i === "password" && /* @__PURE__ */ L.jsxs("div", { className: "relative flex justify-end mr-4 bottom-9 md:bottom-12", children: [
      u === "password" && /* @__PURE__ */ L.jsx(
        fv,
        {
          onClick: () => f("text"),
          className: "cursor-pointer text-main text-sm z-20"
        }
      ),
      u !== "password" && /* @__PURE__ */ L.jsx(
        cv,
        {
          onClick: () => f("password"),
          className: "cursor-pointer text-main text-sm z-20"
        }
      )
    ] }),
    t && ((t == null ? void 0 : t.password_register) || (t == null ? void 0 : t.new_password)) && /* @__PURE__ */ L.jsx(rv, { errors: t }),
    t && /* @__PURE__ */ L.jsx("div", { className: "text-red relative left-2 -top-3 text-xxs text-left", children: t.message })
  ] });
};
function Pw() {
  return /* @__PURE__ */ L.jsx("div", { className: "sm:w-3/4 bottom-0 | sm:pb-2 | text-center border-t border-gray-lines", children: /* @__PURE__ */ L.jsx("span", { className: "block left-0 | text-gray font-normal text-xxs", children: "t('powered_by_kiota')" }) });
}
function Cw() {
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
  return Xr.createPortal(
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
const Iw = ({
  title: e,
  showBack: t = !1,
  onBackClick: n,
  removeMargin: r = !1
}) => /* @__PURE__ */ L.jsx("div", { className: "flex", children: /* @__PURE__ */ L.jsxs("div", { className: `text-3xl text-main font-bold ${r ? "" : "mb-4"}`, children: [
  t && /* @__PURE__ */ L.jsx(
    ov,
    {
      className: "inline-block mr-3 cursor-pointer",
      onClick: n
    }
  ),
  e
] }) }), Lw = ({
  id: e,
  title: t,
  children: n,
  padding: r = "10",
  movilePadding: i = "4",
  marginX: a = "0",
  movileMarginX: o = "0",
  movileMarginY: l = "0",
  marginY: u = "0",
  marginYB: f,
  width: h = "full",
  rounded: c = "2xl",
  startupsList: s = !1,
  clickable: d = !1,
  onClick: y,
  wrapperClassName: m = "",
  containerClassName: b = "",
  bgColor: v = "bg-white",
  ...g
}) => {
  const w = `${b} rounded-${c} w-full p-${i} sm:p-${r} ${(s || d) && "hover:shadow-inner"}`;
  return /* @__PURE__ */ L.jsx(
    "div",
    {
      id: e,
      onClick: y,
      className: `
        ${m} ${v} rounded-${c}
        w-${h} px-${o} py-${l} sm:px-${a} 
        sm:py-${u} pb-${f} ${d && "cursor-pointer"} 
      `,
      children: /* @__PURE__ */ L.jsxs("div", { className: w, ...g, children: [
        t && /* @__PURE__ */ L.jsx("h2", { className: "font-semibold mb-4", children: t }),
        n
      ] })
    }
  );
}, gv = ({
  onClick: e,
  type: t,
  marginRight: n = "0",
  marginLeft: r = "0",
  marginTop: i = "0",
  icon: a,
  width: o = "auto",
  iconComponent: l,
  text: u,
  disabled: f
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: f,
    className: `text-center block w-${o} mr-${n} ml-${r} py-2 px-4 mt-${i}
          text-xs font-semibold text-text-buttons-secondary placeholder-gray bg-bg-buttons-secondary rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out border border-border-buttons-secondary
          hover:bg-buttons-secondary-hover hover:text-buttons-secondary hover:shadow-hover
          focus:outline-none hover:shadow-inner`,
    children: [
      a && /* @__PURE__ */ L.jsx("img", { src: a, alt: "Icon", className: "inline | mr-2 | w-auto" }),
      l && l,
      u
    ]
  }
), mv = ({
  onClick: e,
  type: t,
  marginRight: n = "0",
  marginLeft: r = "0",
  marginTop: i = "0",
  icon: a,
  width: o = "auto",
  iconComponent: l,
  text: u,
  disabled: f
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: f,
    className: `text-center block w-${o} mr-${n} ml-${r} py-2 px-4 mt-${i}
          text-xs font-semibold text-red placeholder-gray border-red rounded-2xl 
          shadow-soft-white cursor-pointer transition-all duration-500 ease-in-out border 
          hover:shadow-hover focus:outline-none hover:shadow-inner`,
    children: [
      a && /* @__PURE__ */ L.jsx("img", { src: a, alt: "Icon", className: "inline | mr-2 | w-auto" }),
      l && l,
      u
    ]
  }
), Mw = ({
  headers: e = [],
  data: t = [],
  actions: n = [],
  compact: r = !1,
  bordered: i = !1,
  stickyHeader: a = !0,
  stickyActions: o = !0,
  wrapperClassName: l = "",
  actionsHeaderClassName: u = ""
}) => {
  const f = r ? "px-3 py-2" : "px-6 py-4", [h, c] = Ge(100), s = Re((p) => {
    if (!p)
      return;
    const x = p.querySelectorAll(".data-grid-actions");
    let _ = 0;
    x.forEach((E) => {
      const k = E.getBoundingClientRect().width;
      k > _ && (_ = k);
    }), c(_);
  }, []), [d, y] = Ge(!1), [m, b] = Ge(!1), v = Ce(null), g = Ce(null), w = new IntersectionObserver((p) => {
    y(!p[0].isIntersecting);
  });
  return Le(() => (w.disconnect(), v.current && w.observe(v.current), () => {
    w.disconnect();
  }), [v.current]), Le(() => {
    const p = () => {
      if (v.current) {
        const x = g.current.scrollWidth - g.current.clientWidth - 5;
        b(g.current.scrollLeft < x);
      }
    };
    return g.current.addEventListener("scroll", p), p(), () => {
    };
  }, [g]), /* @__PURE__ */ L.jsx("div", { className: "flex flex-col", children: /* @__PURE__ */ L.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ L.jsx("div", { className: "inline-block w-full", children: /* @__PURE__ */ L.jsx("div", { className: `overflow-auto ${l}`, ref: g, children: /* @__PURE__ */ L.jsxs(
    "table",
    {
      style: { borderSpacing: 0 },
      className: "relative min-w-full",
      ref: s,
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
                        ${d ? "shadow-basic" : ""}`,
              children: p.title
            },
            p.key
          )),
          !!(n && n.length) && /* @__PURE__ */ L.jsx(
            "th",
            {
              scope: "col",
              style: { width: h },
              className: `${f} 
                        ${o ? "sticky top-0 right-0" : ""} 
                        bg-white relative z-10 
                        ${d ? "shadow-basic" : ""}
                        ${i ? "border-l border-b border-gray-lines" : ""}
                        ${u}`,
              children: " "
            }
          )
        ] }) }),
        /* @__PURE__ */ L.jsx("tbody", { children: t.map((p) => /* @__PURE__ */ L.jsxs(
          "tr",
          {
            className: "bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100",
            children: [
              e.filter((x) => x.show ? x.show(x) : !0).map((x) => /* @__PURE__ */ L.jsx(
                "td",
                {
                  className: `${f} 
                        whitespace-nowrap text-sm font-medium 
                        ${x.columnClassName} 
                        ${p.rowClassName} 
                        ${i ? "border border-gray-lines" : ""}`,
                  children: x.render ? x.render(x.key, p) : p[x.key]
                },
                x.key
              )),
              !!(n && n.length) && /* @__PURE__ */ L.jsx(
                "td",
                {
                  style: { width: h },
                  className: `${f} 
                          bg-white whitespace-nowrap text-sm font-medium 
                          ${o ? "sticky top-0 right-0" : ""} 
                          ${i ? "border border-gray-lines" : ""} 
                          ${m ? "shadow-basic" : ""}`,
                  children: /* @__PURE__ */ L.jsx("div", { className: "flex flex-row justify-end items-end data-grid-actions", children: n.filter((x) => x.show ? x.show(p) : !0).map((x) => /* @__PURE__ */ L.jsx(
                    "div",
                    {
                      className: "mr-1",
                      "data-tip": x.tip,
                      children: x.id === "delete" ? /* @__PURE__ */ L.jsx(
                        mv,
                        {
                          ...x.buttonProps,
                          onClick: () => {
                            x.onClick && x.onClick(p);
                          }
                        }
                      ) : /* @__PURE__ */ L.jsx(
                        gv,
                        {
                          ...x.buttonProps,
                          onClick: () => {
                            x.onClick && x.onClick(p);
                          }
                        }
                      )
                    },
                    x.id
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
}, Ks = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xLjE3NSAtNi40MjYzOGUtMDhMNSAzLjg2NjI0TDguODI1IC02LjQyNjM4ZS0wOEwxMCAxLjE5NjA5TDUgNi4yNUwwIDEuMTk2MDlMMS4xNzUgLTYuNDI2MzhlLTA4WiIgZmlsbD0iYmxhY2siLz4KPC9zdmc+Cg==", Gs = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDEwIDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik04LjgyNSA2LjI1TDUgMi4zODM3NkwxLjE3NSA2LjI1TDIuMzg0MTllLTA3IDUuMDUzOTFMNSAtNS40NzI3ZS0wOEwxMCA1LjA1MzkxTDguODI1IDYuMjVaIiBmaWxsPSJibGFjayIvPgo8L3N2Zz4K", yv = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDEwIDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0zLjgxMzMyIDcuMjQ3OUMzLjU4OTMyIDcuMjQ3OSAzLjM2NTMyIDcuMTYyOSAzLjE5NDMyIDYuOTkxOUwwLjgyMTMxOSA0LjYxODlDMC40NzkzMTkgNC4yNzY5IDAuNDc5MzE5IDMuNzIyOSAwLjgyMTMxOSAzLjM4MTlDMS4xNjMzMiAzLjAzOTkgMS43MTYzMiAzLjAzODkgMi4wNTgzMiAzLjM4MDlMMy44MTMzMiA1LjEzNTlMNy45NDEzMiAxLjAwNzlDOC4yODMzMiAwLjY2NTkwNCA4LjgzNjMyIDAuNjY1OTA0IDkuMTc4MzIgMS4wMDc5QzkuNTIwMzIgMS4zNDk5IDkuNTIwMzIgMS45MDM5IDkuMTc4MzIgMi4yNDU5TDQuNDMyMzIgNi45OTE5QzQuMjYxMzIgNy4xNjI5IDQuMDM3MzIgNy4yNDc5IDMuODEzMzIgNy4yNDc5WiIgZmlsbD0iIzEzMEYyNiIvPgo8L3N2Zz4K", Zs = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE0IDI0TDEwIDI4TDYgMjQiIHN0cm9rZT0iIzRENzBCMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTEwIDRWMjgiIHN0cm9rZT0iIzRENzBCMyIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPHBhdGggZD0iTTE4IDhMMjIgNEwyNiA4IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0yMiAyOFY0IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=", uc = ({
  label: e,
  placeholder: t,
  reset: n = !1,
  setReset: r,
  items: i = [],
  multiSelect: a = !1,
  error: o,
  initialValues: l = [],
  onSelect: u,
  sort: f,
  required: h = !1,
  className: c = "",
  disabled: s = !1,
  isClearable: d = !0,
  showQuantity: y = !0,
  noOptionsText: m
}) => {
  const { t: b } = Ht(), [v, g] = Ge(!1), [w, p] = Ge(l), x = (O) => {
    let N = [];
    if (!w.some((T) => T.id === O.id))
      a ? a && (N = [...w, O]) : N = [O];
    else {
      let T = w;
      if (T.length === 1 && !a)
        return;
      T = T.filter((C) => C.id !== O.id), N = [...T];
    }
    p(N), u && u(N), a || g(!v);
  }, _ = (O) => w.some((N) => N.id === O.id), E = () => {
    p([]), u && u([]);
  }, k = () => (w == null ? void 0 : w.length) > 0, j = () => {
    if (l.length === 0)
      return !1;
    if (w.length !== l.length)
      return !0;
    for (let O = 0; O < w.length; O++)
      if (w[O].id !== l[O].id)
        return !0;
    return !1;
  }, S = () => t && t !== "" ? /* @__PURE__ */ L.jsx("span", { className: "text-placeholder-gray", children: t }) : /* @__PURE__ */ L.jsx("span", { className: "text-placeholder-gray", children: b(a ? "select_multi_default_placeholder" : "select_default_placeholder") });
  return Le(() => {
    n && (E(), r && r(!1));
  }, [n]), Le(() => {
    l.length ? j() && p(l) : p(l);
  }, [l]), /* @__PURE__ */ L.jsxs("div", { className: c, children: [
    /* @__PURE__ */ L.jsxs(
      "div",
      {
        className: "mb-2 sm:mb-5 sm:w-auto outline:none focus:outline-none",
        onClick: () => !s && g(!v),
        children: [
          /* @__PURE__ */ L.jsxs("label", { className: "block mb-1 text-left text-xs font-medium text-black", children: [
            e,
            h && /* @__PURE__ */ L.jsx("span", { className: "text-red", children: " *" }),
            a && y && k() && /* @__PURE__ */ L.jsxs("span", { children: [
              " (",
              w.length,
              ")"
            ] }),
            k() && d && /* @__PURE__ */ L.jsx(
              "span",
              {
                "data-tip": b("reset"),
                className: "hover:underline text-main relative -top-[1px]",
                onClick: (O) => {
                  O.stopPropagation(), E();
                },
                children: /* @__PURE__ */ L.jsx(co, { className: "cursor-pointer inline-block ml-1" })
              }
            )
          ] }),
          /* @__PURE__ */ L.jsx(
            "div",
            {
              className: `border border-gray-lines bg-white w-full py-2 sm:py-3 px-7 relative z-1s0 text-left text-xs 
            font-normal rounded-2xl placeholder-gray ${!s && `shadow-soft-white 
            hover:border-main hover:outline-none hover:shadow-focus focus:outline-none 
            focus:shadow-focus active:outline-none active:shadow-focus`} cursor-pointer transition-all  
            duration-500 outline-none ${s && "shadow-inner"} ${v && "shadow-inner"}`,
              children: /* @__PURE__ */ L.jsxs("div", { children: [
                v && /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                  f && /* @__PURE__ */ L.jsx(L.Fragment, { children: /* @__PURE__ */ L.jsxs("div", { className: "flex justify-between items-center bg-white", children: [
                    /* @__PURE__ */ L.jsxs("div", { className: "flex", children: [
                      /* @__PURE__ */ L.jsx("img", { src: Zs, alt: "Arrow down", className: "w-4 mr-1" }),
                      /* @__PURE__ */ L.jsx("p", { className: "text-xs hidden sm:block", children: a ? S() : w.length ? w[0].value : S() })
                    ] }),
                    /* @__PURE__ */ L.jsx("img", { src: Gs, alt: "Arrow up", className: "pl-8" })
                  ] }) }),
                  !f && /* @__PURE__ */ L.jsx(L.Fragment, { children: /* @__PURE__ */ L.jsxs("div", { className: "flex justify-between items-center bg-white", children: [
                    /* @__PURE__ */ L.jsxs("div", { className: "flex text-xs", children: [
                      !a && w.length > 0 && w[0].image && /* @__PURE__ */ L.jsx("span", { className: "mr-2", children: w[0].image }),
                      /* @__PURE__ */ L.jsx("span", { children: a ? S() : w.length ? w[0].value : S() })
                    ] }),
                    /* @__PURE__ */ L.jsx("img", { src: Gs, alt: "Arrow up", className: "pl-8" })
                  ] }) })
                ] }),
                !v && /* @__PURE__ */ L.jsx("div", { className: "flex justify-between bg-white", children: f ? /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                  /* @__PURE__ */ L.jsxs("div", { className: "flex", children: [
                    /* @__PURE__ */ L.jsx("img", { src: Zs, alt: "Arrow down", className: "w-4 mr-1" }),
                    /* @__PURE__ */ L.jsx("p", { className: "text-xs hidden sm:block", children: a ? S() : w.length ? w[0].value : S() })
                  ] }),
                  /* @__PURE__ */ L.jsx("img", { src: Ks, alt: "Arrow down", className: "pl-8" })
                ] }) : /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                  /* @__PURE__ */ L.jsx("div", { className: "flex text-xs bg-white", children: /* @__PURE__ */ L.jsx("span", { children: a ? S() : w.length ? w[0].value : S() }) }),
                  /* @__PURE__ */ L.jsx("img", { src: Ks, alt: "Arrow down", className: "pl-8" })
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
          !i.length && /* @__PURE__ */ L.jsx("li", { className: "py-1 px-3", children: /* @__PURE__ */ L.jsx("span", { className: "text-gray", children: m || b("no_options") }) }),
          i.map((O) => /* @__PURE__ */ L.jsxs(
            "li",
            {
              className: `py-1 border-b hover:text-main 
                  ${O.disabled ? "bg-white" : null} 
                  ${_(O) ? "text-main" : null}`,
              children: [
                O.disabled && /* @__PURE__ */ L.jsx("span", { className: "text-gray", children: O.value }),
                !O.disabled && /* @__PURE__ */ L.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => O.disabled ? null : x(O),
                    className: "w-full bg-white flex items-center gap-3 text-left outline:none focus:outline-none",
                    children: [
                      /* @__PURE__ */ L.jsx("span", { className: "w-2", children: _(O) && /* @__PURE__ */ L.jsx("img", { src: yv, alt: "Tick icon" }) }),
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
}, Rw = ({
  showRowsPerPage: e = !1,
  currentPage: t,
  setCurrentPage: n,
  perPage: r,
  setPerPage: i,
  pages: a,
  maxPaginationNumbers: o,
  paginateOptions: l = [10, 25, 50]
}) => {
  const { t: u } = Ht(), [f, h] = Ge([1, 2, 3, 4, 5]), c = (d) => t - Math.floor(d / 2) <= 0 || a < d ? 0 : t + Math.floor(d / 2) >= a ? a - d : t - Math.floor(d / 2), s = (d) => {
    d === "next" && t < a - 1 ? n(t + 1) : d === "prev" && t >= 0 && n(t - 1);
  };
  return Le(() => {
    const d = o || 5, y = a < d ? a : d, m = c(y) + 1, b = [];
    for (let v = m; v < m + y; v++)
      b.push(v);
    return h(b), () => {
      h([]);
    };
  }, [a, t]), /* @__PURE__ */ L.jsxs("div", { className: "relative top-0 left-0 pb-3 pt-6 flex items-center justify-between rounded-b-2xl lg:static w-auto", children: [
    /* @__PURE__ */ L.jsxs("div", { className: "flex-1 flex justify-between sm:hidden", children: [
      /* @__PURE__ */ L.jsx(
        "button",
        {
          disabled: t === 0,
          onClick: () => s("prev"),
          className: `
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t === 0 ? "opacity-50 cursor-not-allowed" : ""}
              `,
          children: /* @__PURE__ */ L.jsx("span", { children: u("previous") })
        }
      ),
      /* @__PURE__ */ L.jsx(
        "button",
        {
          disabled: t === a - 1,
          onClick: () => s("next"),
          className: `
            bg-transparence-blue hover:shadow-inner ml-4  
            inline-flex items-center p-2 rounded-xl text-main
            text-sm font-medium cursor-pointer outline-none focus:outline-none
            ${t === a - 1 ? "opacity-50 cursor-not-allowed" : ""}
          `,
          children: /* @__PURE__ */ L.jsx("span", { children: u("next") })
        }
      )
    ] }),
    /* @__PURE__ */ L.jsxs("div", { className: `hidden sm:flex-1 sm:flex sm:items-center ${e ? "sm:justify-between" : "sm:justify-end"}`, children: [
      e && /* @__PURE__ */ L.jsx("div", { className: "flex justify-center items-center", children: /* @__PURE__ */ L.jsx(
        uc,
        {
          items: l.map((d) => ({ id: d, value: d })),
          initialValues: [{ id: r, value: r }],
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
            onClick: () => s("prev"),
            className: `
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t === 0 ? "opacity-50 cursor-not-allowed" : ""}
              `,
            children: /* @__PURE__ */ L.jsx("span", { children: u("previous") })
          }
        ),
        f.map((d) => /* @__PURE__ */ L.jsxs("span", { children: [
          t + 1 === d && /* @__PURE__ */ L.jsx("button", { className: "mx-1 px-4 py-2 text-sm font-medium rounded-xl shadow-inner hover:shadow-inner bg-main text-white", children: d }),
          t + 1 !== d && /* @__PURE__ */ L.jsx(
            "button",
            {
              onClick: () => n(d - 1),
              className: "mx-1 px-4 py-2 text-sm font-medium text-mainrounded-xl bg-transparence-blue hover:text-mainhover:shadow-inner",
              children: d
            }
          )
        ] }, d)),
        /* @__PURE__ */ L.jsx(
          "button",
          {
            disabled: t === a - 1,
            onClick: () => s("next"),
            className: `
                bg-transparence-blue hover:shadow-inner ml-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t === a - 1 ? "opacity-50 cursor-not-allowed" : ""}
              `,
            children: /* @__PURE__ */ L.jsx("span", { children: u("next") })
          }
        )
      ] })
    ] })
  ] });
}, Dw = ({ children: e }) => /* @__PURE__ */ L.jsx(
  "div",
  {
    style: { zIndex: 99 },
    className: "absolute top-0 right-0 flex justify-end box-border max-h-full w-full overflow-x-hidden overflow-y-auto",
    children: e
  }
), $w = ({ children: e, onDismiss: t, appearance: n = "error" }) => {
  const r = {
    error: "bg-red",
    success: "bg-green",
    alert: "bg-main"
  };
  return /* @__PURE__ */ L.jsxs(
    "div",
    {
      onClick: t,
      className: `${r[n]} text-white font-semibold flex items-center justify-start w-72 text-white shadow-basic rounded-2xl cursor-pointer text-xs font-normal m-4 p-4`,
      children: [
        n === "success" && /* @__PURE__ */ L.jsx(sv, { className: "mr-2 inline-block text-sm w-12" }),
        n === "error" && /* @__PURE__ */ L.jsx(vv, { className: "mr-2 inline-block text-sm w-12" }),
        n === "alert" && /* @__PURE__ */ L.jsx(lc, { className: "mr-2 inline-block text-sm w-12" }),
        /* @__PURE__ */ L.jsx("span", { children: e })
      ]
    }
  );
};
var bv = process.env.NODE_ENV === "production";
function Oa(e, t) {
  if (!bv) {
    if (e)
      return;
    var n = "Warning: " + t;
    typeof console < "u" && console.warn(n);
    try {
      throw Error(n);
    } catch {
    }
  }
}
function Qs(e, t) {
  for (var n = 0; n < t.length; n++) {
    var r = t[n];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
  }
}
function ui(e, t, n) {
  return t && Qs(e.prototype, t), n && Qs(e, n), e;
}
function Xe() {
  return Xe = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Xe.apply(this, arguments);
}
function xv(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ea(e, t);
}
function Ea(e, t) {
  return Ea = Object.setPrototypeOf || function(r, i) {
    return r.__proto__ = i, r;
  }, Ea(e, t);
}
function wv(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function Ov(e, t) {
  if (e) {
    if (typeof e == "string")
      return Xs(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Xs(e, t);
  }
}
function Xs(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function fn(e, t) {
  var n = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n)
    return (n = n.call(e)).next.bind(n);
  if (Array.isArray(e) || (n = Ov(e)) || t && e && typeof e.length == "number") {
    n && (e = n);
    var r = 0;
    return function() {
      return r >= e.length ? {
        done: !0
      } : {
        done: !1,
        value: e[r++]
      };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Js(e) {
  var t = Ce(null);
  function n(r) {
    !r || r === t.current || (t.current = r, e(r));
  }
  return n;
}
function Ev(e) {
  var t = Ce(e);
  return mt(function() {
    function n(i) {
      typeof i == "function" ? t.current = i(t.current) : t.current = i;
    }
    function r() {
      return t.current;
    }
    return [r, n];
  }, []);
}
function _v() {
  var e = Ce([]);
  return mt(function() {
    function t() {
      return e.current.length > 0;
    }
    function n() {
      for (var i = fn(e.current), a; !(a = i()).done; ) {
        var o = a.value;
        o();
      }
      e.current = [];
    }
    function r(i) {
      e.current.push(i);
    }
    return {
      hasEventSubscriptions: t,
      removeAllEventSubscriptions: n,
      addEventSubscription: r
    };
  }, []);
}
var Bi = typeof window < "u" ? of : Le;
function Sv(e, t) {
  var n = Ce(e);
  return t ? (n.current = e, n) : (n.current = null, n);
}
function Vn(e) {
  return parseFloat(e.replace("px", ""));
}
function _a(e, t, n) {
  return e < t ? t : e > n ? n : e;
}
function el(e) {
  return e != null;
}
function tl() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(r) {
    for (var i = fn(t), a; !(a = i()).done; ) {
      var o = a.value;
      o && (typeof o == "function" ? o(r) : o.current = r);
    }
  };
}
function Nv(e, t) {
  if (!(typeof e > "u"))
    return t || e.ResizeObserver;
}
function cc(e, t) {
  var n = [];
  if (!e || !t || e === document.body)
    return n;
  var r = t.getComputedStyle(e), i = r.overflow, a = r.overflowX, o = r.overflowY;
  return [i, a, o].some(function(l) {
    return ["auto", "scroll"].includes(l);
  }) && n.push(e), [].concat(n, cc(e.parentElement, t));
}
function pr(e) {
  return "react-laag: Could not find a valid reference for the " + e + ` element. There might be 2 causes:
   - Make sure that the 'ref' is set correctly on the ` + e + ` element when isOpen: true. Also make sure your component forwards the ref with "forwardRef()".
   - Make sure that you are actually rendering the ` + e + " when the isOpen prop is set to true";
}
function Av(e) {
  var t = e.enabled, n = e.onChange, r = e.environment, i = e.ResizeObserverPolyfill, a = e.overflowContainer, o = e.triggerOption, l = Nv(r, i);
  Le(function() {
    process.env.NODE_ENV !== "production" && Oa(l, "This browser does not support ResizeObserver out of the box. We recommend to add a polyfill in order to utilize the full capabilities of react-laag. See: https://github.com/everweij/react-laag#resize-observer");
  }, [l]);
  var u = Ce(null), f = !!o, h = Ev({
    scrollContainers: [],
    trigger: null,
    layer: null
  }), c = h[0], s = h[1], d = _v(), y = d.hasEventSubscriptions, m = d.addEventSubscription, b = d.removeAllEventSubscriptions, v = Re(function() {
    var j = c(), S = j.layer, O = j.trigger, N = j.scrollContainers, T = N[0];
    if (!S)
      throw new Error(pr("layer"));
    if (!O && !f)
      throw new Error(pr("trigger"));
    var C = {
      top: 0,
      left: 0
    };
    if (T) {
      var D = T.scrollLeft, H = T.scrollTop;
      C = {
        top: H,
        left: D
      };
    } else {
      var U = r.scrollX, K = r.scrollY;
      C = {
        top: K,
        left: U
      };
    }
    var q = {
      left: 0,
      top: 0
    };
    if (T) {
      var P = r.getComputedStyle(T), A = P.borderLeftWidth, M = P.borderTopWidth;
      q = {
        left: Vn(A) || 0,
        top: Vn(M) || 0
      };
    }
    n({
      layer: S,
      trigger: O,
      scrollContainers: N,
      arrow: u.current
    }, C, q);
  }, [c, n, r, u, f]), g = Re(function() {
    var j = c(), S = j.trigger, O = j.layer, N = j.scrollContainers;
    if (!O)
      throw new Error(pr("layer"));
    if (!S && !f)
      throw new Error(pr("trigger"));
    if (l) {
      for (var T = !1, C = function() {
        if (!T) {
          T = !0;
          return;
        }
        v();
      }, D = new l(C), H = 0, U = [S, O, document.body]; H < U.length; H++) {
        var K = U[H];
        K && D.observe(K);
      }
      m(function() {
        for (var R = 0, z = [S, O, document.body]; R < z.length; R++) {
          var B = z[R];
          B && D.unobserve(B);
        }
        D.disconnect();
      });
    }
    for (var q = [r].concat(N), P = function() {
      var z = M.value;
      z.addEventListener("scroll", v), m(function() {
        return z.removeEventListener("scroll", v);
      });
    }, A = fn(q), M; !(M = A()).done; )
      P();
  }, [c, m, v, r, l, f]), w = Re(function(k, j) {
    t && k && k !== j && (b(), g(), v());
  }, [b, g, v, t]), p = Js(Re(function(k) {
    var j = c(), S = j.layer;
    s(function(O) {
      return Xe({}, O, {
        layer: k
      });
    }), w(S, k);
  }, [c, s, w])), x = Re(function(j) {
    var S = cc(j, r), O = S[0];
    if (O) {
      var N = r.getComputedStyle(O).position, T = ["relative", "absolute", "fixed"].includes(N) || a;
      T || (O.style.position = "relative"), process.env.NODE_ENV !== "production" && Oa(T, `react-laag: Set the 'position' style of the nearest scroll-container to 'relative', 'absolute' or 'fixed', or set the 'overflowContainer' prop to true. This is needed in order to position the layer properly. Currently the scroll-container is positioned: "` + N + '". For now, "position: relative;" is added for you, but this behavior might be removed in the future. Visit https://react-laag.com/docs/#position-relative for more info.');
    }
    return S;
  }, [r, a]), _ = Js(Re(function(k) {
    var j = x(k), S = c(), O = S.trigger;
    s(function(N) {
      return Xe({}, N, {
        trigger: k,
        scrollContainers: j
      });
    }), w(O, k);
  }, [c, s, w, x])), E = o == null || o.getParent == null ? void 0 : o.getParent();
  return Bi(function() {
    E && s(function(k) {
      return Xe({}, k, {
        scrollContainers: x(E)
      });
    });
  }, [E, s, x]), Bi(function() {
    return t && (y() || g()), function() {
      y() && b();
    };
  }, [t, y, g, b]), Bi(function() {
    t && v();
  }), {
    triggerRef: _,
    layerRef: p,
    arrowRef: u,
    closestScrollContainer: c().scrollContainers[0] || null
  };
}
var fc = /* @__PURE__ */ tu({});
function kv(e) {
  var t = e.children, n = e.registrations, r = Re(function(a) {
    return n.current.add(a), function() {
      return n.current.delete(a);
    };
  }, [n]);
  return nn(fc.Provider, {
    value: r
  }, t);
}
function Tv(e, t) {
  for (var n = fn(e), r; !(r = n()).done; ) {
    var i = r.value.shouldCloseWhenClickedOutside;
    if (!i(t))
      return !1;
  }
  return !0;
}
function jv(e) {
  var t = e.isOpen, n = e.onOutsideClick, r = e.onParentClose, i = Ce(null), a = Ce(null), o = Ce(/* @__PURE__ */ new Set()), l = qa(fc), u = Re(function(h) {
    var c = h.target, s = i.current && i.current.contains(c), d = a.current && a.current.contains(c), y = Tv(o.current, h);
    return d && y && o.current.forEach(function(m) {
      var b = m.closeChild;
      return b();
    }), !s && !d && y;
  }, [i, a, o]);
  return Le(function() {
    if (typeof l == "function")
      return l({
        shouldCloseWhenClickedOutside: u,
        closeChild: function() {
          process.env.NODE_ENV !== "production" && Oa(r, "react-laag: You are using useLayer() in a nested setting but forgot to set the 'onParentClose()' callback in the options. This could lead to unexpected behavior."), r && r();
        }
      });
  }, [l, u, r, o]), Le(function() {
    var f = typeof l == "function", h = !t || !n || f;
    if (h)
      return;
    function c(s) {
      u(s) && n();
    }
    return document.addEventListener("click", c, !0), function() {
      return document.removeEventListener("click", c, !0);
    };
  }, [t, n, u, l]), Le(function() {
    t || o.current.forEach(function(f) {
      var h = f.closeChild;
      return h();
    });
  }, [t]), {
    closeOnOutsideClickRefs: {
      trigger: i,
      layer: a
    },
    registrations: o
  };
}
var Pv = ["bottom-start", "bottom-end", "bottom-center", "top-start", "top-center", "top-end", "left-end", "left-center", "left-start", "right-end", "right-center", "right-start", "center"], Cv = {
  top: "bottom",
  left: "right",
  bottom: "top",
  right: "left",
  center: "center"
}, Iv = /* @__PURE__ */ function() {
  function e(n, r, i, a, o, l, u, f, h) {
    this.prop = void 0, this.opposite = void 0, this.isHorizontal = void 0, this.sizeProp = void 0, this.oppositeSizeProp = void 0, this.cssProp = void 0, this.oppositeCssProp = void 0, this.isCenter = void 0, this.isPush = void 0, this.prop = n, this.opposite = r, this.isHorizontal = i, this.sizeProp = a, this.oppositeSizeProp = o, this.cssProp = l, this.oppositeCssProp = u, this.isCenter = f, this.isPush = h;
  }
  var t = e.prototype;
  return t.factor = function(r) {
    return r * (this.isPush ? 1 : -1);
  }, t.isOppositeDirection = function(r) {
    return this.isHorizontal !== r.isHorizontal;
  }, e;
}();
function tn(e, t) {
  t === void 0 && (t = !0);
  var n = ["left", "right"].includes(e);
  return new Iv(e, t ? tn(Cv[e], !1) : null, n, n ? "width" : "height", n ? "height" : "width", n ? "left" : "top", n ? "top" : "left", e === "center", !["right", "bottom"].includes(e));
}
var We = {
  top: /* @__PURE__ */ tn("top"),
  bottom: /* @__PURE__ */ tn("bottom"),
  left: /* @__PURE__ */ tn("left"),
  right: /* @__PURE__ */ tn("right")
}, Be = /* @__PURE__ */ Xe({}, We, {
  center: /* @__PURE__ */ tn("center")
}), vr = ["top", "left", "bottom", "right"], fo = /* @__PURE__ */ function() {
  function e(t) {
    return this.top = void 0, this.left = void 0, this.right = void 0, this.bottom = void 0, Object.assign(this, t);
  }
  return e.mergeSmallestSides = function(n) {
    var r = n[0], i = n.slice(1);
    if (!r)
      throw new Error("Please provide at least 1 bounds objects in order to merge");
    for (var a = Object.fromEntries(vr.map(function(s) {
      return [s, r[s]];
    })), o = fn(i), l; !(l = o()).done; )
      for (var u = l.value, f = fn(vr), h; !(h = f()).done; ) {
        var c = h.value;
        a[c] = Math.min(a[c], u[c]);
      }
    return new e(a);
  }, ui(e, [{
    key: "allSidesArePositive",
    get: function() {
      var n = this;
      return vr.every(function(r) {
        return n[r] >= 0;
      });
    }
    /**
     * Returns a partial IBoundsOffsets with sides that are negative, meaning sides aren't entirely
     * visible in respect to a parent Bounds instance
     */
  }, {
    key: "negativeSides",
    get: function() {
      var n = this;
      return Object.fromEntries(vr.filter(function(r) {
        return n[r] < 0;
      }).map(function(r) {
        return [r, n[r]];
      }));
    }
  }]), e;
}();
function nl() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return t.reduce(function(r, i) {
    return r + (i ? Vn(i) : 0);
  }, 0);
}
function Sa(e) {
  var t = e.top, n = e.left, r = e.right, i = e.bottom, a = e.width, o = e.height;
  return {
    top: t,
    left: n,
    right: r,
    bottom: i,
    width: a,
    height: o
  };
}
var Lv = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: 0,
  height: 0
}, st = /* @__PURE__ */ function() {
  e.create = function(r) {
    return new e(r);
  }, e.fromElement = function(r, i) {
    i === void 0 && (i = {});
    var a = i, o = a.withTransform, l = o === void 0 ? !0 : o, u = a.environment, f = u === void 0 ? window : u, h = a.withScrollbars, c = h === void 0 ? !0 : h, s = Sa(r.getBoundingClientRect()), d = new e(s);
    if (!l) {
      var y = f.getComputedStyle(r), m = y.width, b = y.height, v = y.boxSizing, g = y.borderLeft, w = y.borderRight, p = y.borderTop, x = y.borderBottom, _ = y.paddingLeft, E = y.paddingRight, k = y.paddingTop, j = y.paddingBottom, S = v === "border-box" ? Vn(m) : nl(m, g, w, _, E), O = v === "border-box" ? Vn(b) : nl(b, p, x, k, j);
      d = new e(Xe({}, d, {
        width: S,
        height: O
      }));
    }
    if (!c) {
      var N = d.width - r.clientWidth, T = d.height - r.clientHeight;
      return d.substract({
        right: N,
        bottom: T
      });
    }
    return d;
  }, e.empty = function() {
    return new e();
  }, e.fromWindow = function(r) {
    var i, a = (i = r == null ? void 0 : r.document.scrollingElement) != null ? i : r == null ? void 0 : r.document.documentElement, o = a ?? {}, l = o.clientWidth, u = l === void 0 ? 0 : l, f = o.clientHeight, h = f === void 0 ? 0 : f;
    return new e({
      width: u,
      height: h,
      right: u,
      bottom: h
    });
  };
  function e(n) {
    return n === void 0 && (n = {}), this.top = void 0, this.left = void 0, this.right = void 0, this.bottom = void 0, this.width = void 0, this.height = void 0, Object.assign(this, Lv, n);
  }
  var t = e.prototype;
  return t.toObject = function() {
    return Sa(this);
  }, t.merge = function(r) {
    var i = this.toObject();
    return new e(Xe({}, i, typeof r == "function" ? r(i) : r));
  }, t.substract = function(r) {
    for (var i = this.toObject(), a = Object.entries(r), o = 0, l = a; o < l.length; o++) {
      var u = l[o], f = u[0], h = u[1];
      if (f in We) {
        var c = We[f];
        i[f] += c.factor(h), i[c.isHorizontal ? "width" : "height"] -= h;
      } else
        i[f] -= h || 0;
    }
    return new e(i);
  }, t.offsetsTo = function(r) {
    return new fo({
      top: r.top - this.top,
      bottom: this.bottom - r.bottom,
      left: r.left - this.left,
      right: this.right - r.right
    });
  }, t.mapSides = function(r) {
    for (var i = this.toObject(), a = Object.values(We), o = 0, l = a; o < l.length; o++) {
      var u = l[o];
      i[u.prop] = r(u, i[u.prop]);
    }
    return new e(i);
  }, ui(e, [{
    key: "surface",
    get: function() {
      return this.width * this.height;
    }
  }]), e;
}(), dc = /* @__PURE__ */ function() {
  function e(n, r, i, a, o) {
    this.primary = void 0, this.secondary = void 0, this.offsets = void 0, this.subjectsBounds = void 0, this._cachedLayerBounds = null, this._cachedContainerOffsets = null, this.primary = n, this.secondary = r, this.offsets = o, this.setSubjectsBounds(i, a);
  }
  var t = e.prototype;
  return t.setSubjectsBounds = function(r, i) {
    if (!i) {
      this.subjectsBounds = r;
      return;
    }
    var a = (
      // if the user passed a callback, call it with the layerSide corresponding to
      // the placement
      typeof i == "function" ? i(this.primary.prop) : i
    );
    this.subjectsBounds = r.merge({
      layer: Xe({}, r.layer, a)
    });
  }, t.getLayerBounds = function(r) {
    if (r === void 0 && (r = 0), this._cachedLayerBounds && r === 0)
      return this._cachedLayerBounds;
    var i = this.primary, a = this.secondary, o = this.subjectsBounds, l = o.trigger, u = o.layer, f = o.arrow, h = i.isHorizontal, c = i.oppositeCssProp, s = i.oppositeSizeProp, d = i.prop, y = i.opposite, m = st.empty();
    m[y.prop] = l[d] - i.factor(this.offsets.trigger), m[d] = m[y.prop] - i.factor(u[i.sizeProp]);
    var b = this.offsets.arrow * 2, v = l[c] - (u[s] - f[s]) + b, g = l[c] + (l[s] - f[s]) - b;
    if (a.isPush || (v += u[s], g += u[s]), a.isCenter) {
      var w = (h ? We.top : We.left).prop, p = (h ? We.bottom : We.right).prop;
      m[w] = _a(l[w] + l[s] / 2 - u[s] / 2 + r, v, g), m[p] = m[w] + u[s];
    } else {
      var x = a, _ = l[x.prop], E = _ < v ? v - _ : _ > g ? g - _ : 0;
      m[x.prop] = _a(_ + r + E, v, g), m[x.opposite.prop] = m[x.prop] + a.factor(u[s]);
    }
    m.width = m.right - m.left, m.height = m.bottom - m.top;
    var k = st.create(m);
    return r === 0 && (this._cachedLayerBounds = k), k;
  }, t.getLayerCollisionBounds = function() {
    var r = this.offsets.container;
    return this.getLayerBounds().mapSides(function(i, a) {
      return a -= i.factor(r);
    }).merge(function(i) {
      var a = i.width, o = i.height;
      return {
        width: a + r * 2,
        height: o + r * 2
      };
    });
  }, t.getContainerOffsets = function(r) {
    if (this._cachedContainerOffsets && !r)
      return this._cachedContainerOffsets;
    var i = this.subjectsBounds.merge({
      layer: r || this.getLayerCollisionBounds()
    }), a = fo.mergeSmallestSides(i.layerOffsetsToScrollContainers);
    return r || (this._cachedContainerOffsets = a), a;
  }, ui(e, [{
    key: "type",
    get: function() {
      return this.primary.prop + "-" + (this.secondary.prop === "center" ? "center" : ["bottom", "right"].includes(this.secondary.prop) ? "end" : "start");
    }
  }, {
    key: "triggerIsBigger",
    get: function() {
      var r = this.secondary.isHorizontal, i = this.subjectsBounds, a = i.triggerHasBiggerWidth, o = i.triggerHasBiggerHeight;
      return r && a || !r && o;
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
      var r = this.getLayerBounds(), i = this.getContainerOffsets(r), a = i.negativeSides;
      for (var o in a)
        a[o] = -a[o];
      return r.substract(a).surface;
    }
    /**
     * Returns a BoundSide by looking at the most negative offset that is the opposite direction
     */
  }, {
    key: "secondaryOffsetSide",
    get: function() {
      var r, i, a = this, o = this.getContainerOffsets(), l = (r = (i = Object.entries(o.negativeSides).map(function(f) {
        var h = f[0], c = f[1];
        return [We[h], c];
      }).filter(function(f) {
        var h = f[0];
        return a.primary.isOppositeDirection(h);
      }).sort(function(f, h) {
        var c = f[1], s = h[1];
        return s - c;
      })) == null ? void 0 : i[0]) != null ? r : [], u = l[0];
      return u || null;
    }
  }]), e;
}(), rl = /* @__PURE__ */ function(e) {
  xv(t, e);
  function t() {
    return e.apply(this, arguments) || this;
  }
  var n = t.prototype;
  return n.getLayerBounds = function() {
    var i = this.subjectsBounds, a = i.trigger, o = i.layer, l = st.empty();
    return l.top = a.top + a.height / 2 - o.height / 2, l.bottom = l.top + o.height, l.left = a.left + a.width / 2 - o.width / 2, l.right = l.left + o.width, l.width = l.right - l.left, l.height = l.bottom - l.top, l;
  }, t;
}(dc);
function Mv(e, t, n) {
  var r = e.layer, i = e.trigger, a = e.arrow, o = t.primary.oppositeSizeProp, l = t.primary.isHorizontal ? ["top", "bottom"] : ["left", "right"], u = l[0], f = l[1], h = r[u] + r[o] / 2 - i[u] - a[o] / 2 - n, c = r[f] - r[o] / 2 - i[f] + a[o] / 2 + n;
  return (h < 0 ? -h : 0) + (c > 0 ? -c : 0);
}
var il = {
  position: "absolute",
  willChange: "top, left",
  left: null,
  right: null,
  top: null,
  bottom: null
};
function Rv(e, t, n) {
  var r;
  if (t.primary.isCenter)
    return il;
  var i = e.layer, a = e.trigger, o = e.arrow, l = t.primary.oppositeSizeProp, u = a[l] > i[l], f = n + o[l] / 2, h = i[l] - o[l] / 2 - n, c = Mv(e, t, n), s = t.primary.prop, d = t.primary.oppositeCssProp, y = u ? i[l] / 2 + c : a[d] + a[l] / 2 - i[d];
  return Xe({}, il, (r = {}, r[s] = "100%", r[d] = _a(y, f, h), r));
}
var al = /* @__PURE__ */ function() {
  function e(n, r, i) {
    this.placements = void 0, this.config = void 0, this.subjectsBounds = void 0, this.placements = n, this.config = r, this.subjectsBounds = i;
  }
  e.getSidesFromPlacementType = function(r) {
    var i = r.split("-"), a = i[0], o = i[1], l = We[a], u;
    return o === "center" ? u = Be.center : l.isHorizontal ? u = o === "start" ? Be.top : Be.bottom : u = o === "start" ? Be.left : Be.right, [l, u];
  }, e.create = function(r, i) {
    var a = {
      arrow: i.arrowOffset,
      container: i.containerOffset,
      trigger: i.triggerOffset
    };
    function o(l) {
      l === void 0 && (l = i.placement);
      var u = e.getSidesFromPlacementType(l), f = u[0], h = u[1], c = We[f.isHorizontal ? i.preferY : i.preferX], s = !f.isHorizontal && r.triggerHasBiggerWidth || f.isHorizontal && r.triggerHasBiggerHeight;
      function d(m, b) {
        return new dc(m, b, r, i.layerDimensions, a);
      }
      var y = [];
      return y[0] = d(f, h), y[1] = d(f, h.isCenter ? c : Be.center), y[2] = d(f, Be[(h.opposite.isCenter ? c.opposite : h.opposite).prop]), y[3] = d(c, s ? f : Be[f.opposite.prop]), y[4] = d(c, Be.center), y[5] = d(c, s ? Be[f.opposite.prop] : f), y[6] = d(We[c.opposite.prop], s ? f : Be[f.opposite.prop]), y[7] = d(We[c.opposite.prop], Be.center), y[8] = d(We[c.opposite.prop], s ? Be[f.opposite.prop] : f), y[9] = d(We[f.opposite.prop], h), y[10] = d(We[f.opposite.prop], h.isCenter ? c : Be.center), y[11] = d(We[f.opposite.prop], Be[(h.opposite.isCenter ? c.opposite : h.opposite).prop]), y = y.filter(function(m) {
        return m.type === i.placement || i.possiblePlacements.includes(m.type);
      }), y;
    }
    return i.placement === "center" ? new e([new rl(Be.center, Be.center, r, i.layerDimensions, a)].concat(o(i.preferY + "-" + i.preferX)), i, r) : new e(o(), i, r);
  };
  var t = e.prototype;
  return t.filterPlacementsBySide = function(r) {
    return this.placements.filter(function(i) {
      return i.primary === r;
    });
  }, t.findFirstPlacementThatFits = function() {
    return this.placements.find(function(r) {
      return r.fitsContainer;
    });
  }, t.placementWithBiggestVisibleSurface = function() {
    var r = this.placements.map(function(a) {
      return {
        placement: a,
        surface: a.visibleSurface
      };
    }).sort(function(a, o) {
      return o.surface - a.surface;
    }), i = r[0].placement;
    return i;
  }, t.findSuitablePlacement = function() {
    return this.config.auto ? this.findFirstPlacementThatFits() || this.placementWithBiggestVisibleSurface() : this.placements[0];
  }, t.getSecondaryOffset = function(r) {
    var i = this.config, a = i.auto, o = i.snap;
    if (!a || o || r instanceof rl)
      return 0;
    var l = this.filterPlacementsBySide(r.primary), u = l.indexOf(r) === 0;
    if (u && r.fitsContainer)
      return 0;
    var f = l.find(function(m) {
      return !m.fitsContainer;
    });
    if (!f)
      return 0;
    var h = f.secondaryOffsetSide;
    if (!h)
      return 0;
    var c = r.getContainerOffsets(), s = r.secondary, d;
    r.triggerIsBigger || f === r ? d = h.isPush ? -1 : 1 : d = s === Be.left || [Be.top, Be.center].includes(s) && h.isPush ? -1 : 1;
    var y = c[h.prop];
    return y * d;
  }, t.getStyles = function(r, i, a, o) {
    var l = {
      willChange: "top, left, width, height"
    }, u = Rv(this.subjectsBounds.merge({
      layer: r
    }), i, this.config.arrowOffset), f = this.config.overflowContainer ? Xe({}, l, {
      position: "fixed",
      top: r.top,
      left: r.left
    }) : Xe({}, l, {
      position: "absolute",
      top: r.top - this.subjectsBounds.parent.top + a.top - o.top,
      left: r.left - this.subjectsBounds.parent.left + a.left - o.left
    });
    return {
      arrow: u,
      layer: f
    };
  }, t.getHasDisappeared = function(r) {
    var i = this.config.overflowContainer ? this.subjectsBounds.trigger : r, a = fo.mergeSmallestSides(this.subjectsBounds.offsetsToScrollContainers(i, !0)), o = Object.entries(a.negativeSides), l = o.some(function(u) {
      var f = u[0], h = u[1], c = We[f];
      return h <= -i[c.sizeProp];
    });
    return l ? "full" : a.allSidesArePositive ? null : "partial";
  }, t.result = function(r, i) {
    var a = this.findSuitablePlacement(), o = this.getSecondaryOffset(a), l = a.getLayerBounds(o), u = this.getStyles(l, a, r, i), f = a.primary.prop;
    return {
      styles: u,
      layerSide: f,
      placement: a,
      layerBounds: l,
      hasDisappeared: this.getHasDisappeared(l)
    };
  }, e;
}(), Dv = /* @__PURE__ */ function() {
  function e(n, r) {
    this.overflowContainer = void 0, this.trigger = void 0, this.layer = void 0, this.arrow = void 0, this.parent = void 0, this.window = void 0, this.scrollContainers = void 0, this.overflowContainer = r, Object.assign(this, n);
  }
  e.create = function(r, i, a, o, l, u, f, h) {
    var c = st.fromWindow(r);
    return new e({
      layer: st.fromElement(i, {
        environment: r,
        withTransform: !1
      }),
      trigger: h ? st.create(Sa(h())) : st.fromElement(a),
      arrow: l ? st.fromElement(l) : st.empty(),
      parent: o ? st.fromElement(o) : c,
      window: c,
      scrollContainers: [c].concat(u.map(function(s) {
        return st.fromElement(s, {
          withScrollbars: !1
        });
      }))
    }, f);
  };
  var t = e.prototype;
  return t.merge = function(r) {
    return new e(Xe({}, this, r), this.overflowContainer);
  }, t.offsetsToScrollContainers = function(r, i) {
    i === void 0 && (i = !1);
    var a = this.overflowContainer && !i ? [this.window] : this.scrollContainers;
    return a.map(function(o) {
      return o.offsetsTo(r);
    });
  }, ui(e, [{
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
}(), ol = null, ot = {
  auto: !1,
  arrowOffset: 0,
  containerOffset: 10,
  triggerOffset: 0,
  overflowContainer: !0,
  placement: "top-center",
  possiblePlacements: Pv,
  preferX: "right",
  preferY: "bottom",
  snap: !1,
  container: void 0,
  trigger: void 0
};
function $v(e) {
  var t, n = e.isOpen, r = n === void 0 ? !1 : n, i = e.overflowContainer, a = i === void 0 ? ot.overflowContainer : i, o = e.environment, l = o === void 0 ? typeof window < "u" ? window : void 0 : o, u = e.ResizeObserver, f = e.placement, h = f === void 0 ? ot.placement : f, c = e.possiblePlacements, s = c === void 0 ? ot.possiblePlacements : c, d = e.preferX, y = d === void 0 ? ot.preferX : d, m = e.preferY, b = m === void 0 ? ot.preferY : m, v = e.auto, g = v === void 0 ? ot.auto : v, w = e.snap, p = w === void 0 ? ot.snap : w, x = e.triggerOffset, _ = x === void 0 ? ot.triggerOffset : x, E = e.containerOffset, k = E === void 0 ? ot.containerOffset : E, j = e.arrowOffset, S = j === void 0 ? ot.arrowOffset : j, O = e.container, N = O === void 0 ? ot.container : O, T = e.layerDimensions, C = T === void 0 ? null : T, D = e.onDisappear, H = e.onOutsideClick, U = e.onParentClose, K = e.trigger, q = Ge(function() {
    return {
      layerSide: h === "center" ? "center" : al.getSidesFromPlacementType(h)[0].prop,
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
  }), P = q[0], A = q[1], M = Ce(null), R = Sv(P, r), z = Ce({
    cancelled: !1
  });
  Le(function() {
    return function() {
      z.current.cancelled = !0;
    };
  }, []);
  var B = Re(function(Ae, Oe, G) {
    var Q = Ae.arrow, re = Ae.layer, ie = Ae.scrollContainers, J = Ae.trigger, de = ie[0], X = Dv.create(l, re, J, de, Q, ie, a, K == null ? void 0 : K.getBounds), ne = {
      placement: h,
      possiblePlacements: s,
      auto: g,
      layerDimensions: C,
      arrowOffset: S,
      containerOffset: k,
      triggerOffset: _,
      preferX: y,
      preferY: b,
      snap: p,
      overflowContainer: a
    }, ge = al.create(X, ne).result(Oe, G), ye = ge.hasDisappeared, pe = ge.layerSide, rt = ge.styles, xe = {
      layerSide: pe,
      styles: rt
    };
    if (!R.current || zv(R.current, xe)) {
      R.current = xe, z.current.cancelled = !0;
      var He = {
        cancelled: !1
      };
      z.current = He, Promise.resolve().then(function() {
        He.cancelled || A(xe);
      });
    }
    el(ye) && el(D) && D(ye);
  }, [S, g, k, l, C, D, a, h, s, y, b, p, _, R, K]), I = Av({
    ResizeObserverPolyfill: u,
    environment: l,
    enabled: r,
    overflowContainer: a,
    onChange: B,
    triggerOption: K
  }), $ = I.triggerRef, W = I.layerRef, Y = I.arrowRef, V = I.closestScrollContainer, ee = jv({
    isOpen: r,
    onOutsideClick: H,
    onParentClose: U
  }), Z = ee.closeOnOutsideClickRefs, le = ee.registrations, ce = {
    triggerProps: K ? {} : {
      ref: tl($, Z.trigger, M)
    },
    layerProps: {
      ref: tl(W, Z.layer),
      style: P.styles.layer
    },
    arrowProps: {
      ref: Y,
      style: P.styles.arrow,
      layerSide: P.layerSide
    },
    layerSide: P.layerSide,
    triggerBounds: r ? K ? K.getBounds() : (t = M.current) == null ? void 0 : t.getBoundingClientRect() : null,
    renderLayer: function(Ae) {
      return typeof document < "u" ? ff(nn(kv, {
        registrations: le,
        children: Ae
      }), a || !V ? Fv(N) : V) : null;
    }
  };
  return ce;
}
function zv(e, t) {
  if (e.layerSide !== t.layerSide)
    return !0;
  for (var n = ["position", "top", "left", "right", "bottom"], r = 0, i = n; r < i.length; r++) {
    var a = i[r];
    if (e.styles.layer[a] !== t.styles.layer[a] || e.styles.arrow[a] !== t.styles.arrow[a])
      return !0;
  }
  return !1;
}
var sl = "layers";
function Fv(e) {
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
    if (ol instanceof HTMLElement)
      return ol;
    t = document.getElementById(sl), t || (t = document.createElement("div"), t.id = sl, t.style.cssText = `
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
      `, document.body.appendChild(t));
  }
  return t;
}
var Bv = ["size", "angle", "borderWidth", "borderColor", "roundness", "backgroundColor", "layerSide", "style"], Nr = "left", Ar = "top", kr = "bottom", Tr = "right";
function Hr(e, t) {
  return Math.tan(e * (Math.PI / 180)) * t;
}
function qv(e, t, n, r) {
  var i, a = (i = {}, i[kr] = "0 " + -r + " " + t + " " + e, i[Ar] = "0 0 " + t + " " + (e + r), i[Tr] = -r + " 0 " + e + " " + t, i[Nr] = "0 0 " + (e + r) + " " + t, i);
  return a[n.prop];
}
function Uv(e, t, n, r, i) {
  var a, o, l, u = r / 10 * e * 2, f = (a = {}, a[kr] = [0, e], a[Ar] = [0, 0], a[Tr] = [e, t], a[Nr] = [0, t], a)[n.prop].join(" "), h = n.isHorizontal ? "V 0" : "H " + t, c = t / 2, s = t / 2 + Hr(i, e / 8), d = e / 8, y = (o = {}, o[kr] = ["C", s, d, c + u, 0, c, 0], o[Ar] = ["C", s, e - d, c + u, e, c, e], o[Tr] = ["C", d, t - s, 0, c - u, 0, c], o[Nr] = ["C", e - d, t - s, e, c - u, e, c], o)[n.prop].join(" "), m = t / 2 - Hr(i, e / 8), b = e / 8, v = (l = {}, l[kr] = ["C", c - u, 0, m, b, f], l[Ar] = ["C", c - u, e, m, e - b, f], l[Tr] = ["C", 0, c + u, b, t - m, f], l[Nr] = ["C", e, c + u, e - b, t - m, f], l)[n.prop].join(" ");
  return ["M", f, h, y, v].join(" ");
}
function Hv(e, t, n, r, i) {
  var a = Hr(i, n), o = r.isPush ? [0, n] : [e, e - n], l = o[0], u = o[1];
  return r.isHorizontal ? ["M", l, n, "V", t - n, "L", u, t - n - a, "V", a + n, "Z"].join(" ") : ["M", n, l, "H", t - n, "L", t - n - a, u, "H", a + n, "Z"].join(" ");
}
var Wv = /* @__PURE__ */ nu(function(t, n) {
  var r = t.size, i = r === void 0 ? 8 : r, a = t.angle, o = a === void 0 ? 45 : a, l = t.borderWidth, u = l === void 0 ? 0 : l, f = t.borderColor, h = f === void 0 ? "black" : f, c = t.roundness, s = c === void 0 ? 0 : c, d = t.backgroundColor, y = d === void 0 ? "white" : d, m = t.layerSide, b = m === void 0 ? "top" : m, v = t.style, g = v === void 0 ? {} : v, w = wv(t, Bv);
  if (b === "center")
    return null;
  var p = We[b], x = i, _ = Hr(o, i) * 2, E = Math.max(x, _);
  return nn("svg", Xe({
    ref: n
  }, w, {
    style: Xe({}, g, {
      transform: "translate" + (p.isHorizontal ? "Y" : "X") + "(-50%)"
    }),
    width: E,
    height: E,
    preserveAspectRatio: p.isPush ? "xMinYMin" : "xMaxYMax",
    viewBox: qv(x, _, p, u)
  }), nn("path", {
    fill: y,
    strokeWidth: u,
    stroke: h,
    d: Uv(x, _, p, s, o)
  }), nn("path", {
    fill: y,
    d: Hv(x, _, u, p, o)
  }));
}), ll;
(function(e) {
  e[e.ENTERING = 0] = "ENTERING", e[e.LEAVING = 1] = "LEAVING", e[e.IDLE = 2] = "IDLE";
})(ll || (ll = {}));
const Yv = ({ onClick: e }) => {
  const { t } = Ht(), [n, r] = Ge(!1), i = (s) => {
    r(!1), e(s);
  }, a = (s) => {
    r(!1), s();
  }, o = () => {
    localStorage.clear(), e("/");
  }, l = () => {
    const s = [{
      title: "my_account",
      icon: /* @__PURE__ */ L.jsx(Ys, {}),
      investor: !0,
      founder: !0,
      admin: !1,
      url: "/account"
    }];
    return s.push({
      title: "logout",
      icon: /* @__PURE__ */ L.jsx(pv, {}),
      investor: !0,
      founder: !0,
      admin: !0,
      method: () => o()
    }), s;
  }, { renderLayer: u, triggerProps: f, layerProps: h, arrowProps: c } = $v({
    isOpen: n,
    onOutsideClick: () => r(!1),
    onDisappear: () => r(!1),
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
        onClick: () => r(!n),
        className: "bg-bg-buttons-secondary border border-border-buttons-secondary focus:outline-none custom-circle hover:shadow-inner shadow-soft-white w-12 h-12 rounded-full ml-2",
        children: /* @__PURE__ */ L.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ L.jsx(Ys, {}) })
      }
    ),
    n && u(
      /* @__PURE__ */ L.jsxs(
        "ul",
        {
          ...h,
          className: "mt-2 px-2 py-2 z-30 | shadow-hover border bg-white rounded-2xl border-border-buttons-secondary",
          children: [
            l().map((s, d) => /* @__PURE__ */ L.jsxs(
              "li",
              {
                onClick: () => s.method ? a(s.method) : i(s.url),
                className: "px-2 py-2 flex text-main items-center cursor-pointer text-sm text-gray",
                children: [
                  /* @__PURE__ */ L.jsx("span", { className: "mr-2 text-main", children: s.icon }),
                  /* @__PURE__ */ L.jsx("span", { className: "hover:font-bold", children: t(s.title) })
                ]
              },
              d
            )),
            /* @__PURE__ */ L.jsx(
              Wv,
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
}, zw = ({ onClick: e }) => /* @__PURE__ */ L.jsx("header", { className: "p-3 pr-10 w-full flex justify-end items-center", children: /* @__PURE__ */ L.jsx("div", { className: "flex items-center", id: "header-options", children: /* @__PURE__ */ L.jsx(Yv, { onClick: e }) }) }), Vv = Ga.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  ${(e) => e.horizontal && zr`
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
    `}
`, Kv = (e) => /* @__PURE__ */ L.jsx(Vv, { ...e, children: e.children.map((t, n) => /* @__PURE__ */ L.jsx("li", { children: t }, n)) }), Fw = ({ sections: e, onClick: t, activePath: n }) => {
  const { t: r } = Ht(), i = (l) => {
    t(l.url);
  }, a = (l) => {
    if (n === l || n.startsWith(l + "/"))
      return !0;
  }, o = () => e.map((l, u) => /* @__PURE__ */ L.jsx("div", { id: `sidebar-menu-item-${u + 1}`, className: "flex justify-center text-right w-full", children: /* @__PURE__ */ L.jsxs(
    "div",
    {
      onClick: () => i(l),
      className: `flex items-center w-full  
              h-9 my-2 ml-6 lg:ml-2 px-2 
              rounded-l-2xl cursor-pointer text-center 
              hover:bg-white hover:text-main hover:shadow-none ${a(l.url) ? "bg-white text-main" : "text-white"}
              `,
      children: [
        /* @__PURE__ */ L.jsx("div", { className: "w-8 flex justify-between text-center", children: l.icon }),
        /* @__PURE__ */ L.jsx("div", { className: "text-sm font-medium hidden lg:block", children: r(l.title) })
      ]
    }
  ) }, u));
  return /* @__PURE__ */ L.jsxs("div", { className: "fixed top-0 bg-main h-screen w-20 lg:w-52 z-20", children: [
    /* @__PURE__ */ L.jsxs("div", { className: "menu-logo-container", children: [
      /* @__PURE__ */ L.jsx("div", { className: "mt-4 px-4 flex justify-center items-center hidden lg:flex", children: /* @__PURE__ */ L.jsx("img", { src: "https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg", alt: "Kiota Logo", className: "object-cover w-full h-full" }) }),
      /* @__PURE__ */ L.jsx("div", { className: "h-12 mt-2 px-2 flex justify-center items-center block lg:hidden", children: /* @__PURE__ */ L.jsx("img", { src: "https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg", alt: "kiota", className: "object-cover w-full h-full" }) })
    ] }),
    /* @__PURE__ */ L.jsx(Kv, { className: "mt-4 lg:mt-8", children: o() }),
    /* @__PURE__ */ L.jsx("div", { className: "mt-8 fixed bottom-3 w-20 lg:w-52", children: /* @__PURE__ */ L.jsx("div", { className: "text-xxs lg:text-xxs px-4 text-center text-white", children: r("powered_by_kiota") }) })
  ] });
};
function Gv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M184.3 204.8h-77.7c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h112.2c7.7 0 13.9-6.2 13.9-13.9V106.6c0-7.7-6.2-13.9-13.9-13.9h-.2c-7.7 0-13.9 6.2-13.9 13.9v77.7L87.7 68c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.4-9.8 4.1-5.4 5.4-5.4 14.2 0 19.6l116.2 117.1zM293.1 232.8h112.2c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9h-77.7L444 87.7c5.4-5.4 5.4-14.2 0-19.6-2.6-2.6-6.1-4.1-9.8-4.1-3.7 0-7.2 1.4-9.8 4L307.3 184.3v-77.7c0-7.7-6.2-13.9-13.9-13.9h-.2c-7.7 0-13.9 6.2-13.9 13.9v112.2c0 7.7 6.2 14 13.8 14zM77.9 448c3.7 0 7.2-1.4 9.8-4l117.1-116.3v77.7c0 7.7 6.2 13.9 13.9 13.9h.2c7.7 0 13.9-6.2 13.9-13.9V293.1c0-7.7-6.2-13.9-13.9-13.9H106.6c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h77.7L68 424.3c-5.4 5.4-5.4 14.2 0 19.6 2.7 2.7 6.2 4.1 9.9 4.1zM293.1 419.2h.2c7.7 0 13.9-6.2 13.9-13.9v-77.7L424.3 444c2.6 2.6 6.1 4 9.8 4 3.7 0 7.2-1.4 9.8-4.1 5.4-5.4 5.4-14.2 0-19.6L327.7 307.2h77.7c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9H293.1c-7.7 0-13.9 6.2-13.9 13.9v112.2c.1 7.7 6.3 13.9 13.9 13.9z" } }] })(e);
}
function Zv(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 512 512" }, child: [{ tag: "path", attr: { d: "M112.4 92h77.7c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9H77.9C70.2 64 64 70.2 64 77.9v112.2c0 7.7 6.2 13.9 13.9 13.9h.2c7.7 0 13.9-6.2 13.9-13.9v-77.7l117.1 116.3c2.6 2.6 6.1 4 9.8 4 3.7 0 7.2-1.4 9.8-4.1 5.4-5.4 5.4-14.2 0-19.6L112.4 92zM434.1 64H321.9c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h77.7L283.3 209.1c-5.4 5.4-5.4 14.2 0 19.6 2.6 2.6 6.1 4.1 9.8 4.1 3.7 0 7.2-1.4 9.8-4L420 112.4v77.7c0 7.7 6.2 13.9 13.9 13.9h.2c7.7 0 13.9-6.2 13.9-13.9V77.9c0-7.7-6.2-13.9-13.9-13.9zM218.9 279.2c-3.7 0-7.2 1.4-9.8 4L92 399.6v-77.7c0-7.7-6.2-13.9-13.9-13.9h-.2c-7.7 0-13.9 6.2-13.9 13.9v112.2c0 7.7 6.2 13.9 13.9 13.9h112.2c7.7 0 13.9-6.2 13.9-13.9v-.2c0-7.7-6.2-13.9-13.9-13.9h-77.7l116.3-117.1c5.4-5.4 5.4-14.2 0-19.6-2.6-2.6-6.1-4.1-9.8-4.1zM434.1 308h-.2c-7.7 0-13.9 6.2-13.9 13.9v77.7L302.9 283.3c-2.6-2.6-6.1-4-9.8-4-3.7 0-7.2 1.4-9.8 4.1-5.4 5.4-5.4 14.2 0 19.6l116.3 117h-77.7c-7.7 0-13.9 6.2-13.9 13.9v.2c0 7.7 6.2 13.9 13.9 13.9h112.2c7.7 0 13.9-6.2 13.9-13.9V321.9c0-7.7-6.2-13.9-13.9-13.9z" } }] })(e);
}
const Bw = ({ children: e, onClose: t, title: n, width: r, showExpand: i = !1 }) => {
  const [a, o] = Ge(!1);
  return Xr.createPortal(
    /* @__PURE__ */ L.jsx(
      "div",
      {
        className: "fixed z-50 left-0 top-0 w-screen h-screen bg-gray-opacity side-panel",
        children: /* @__PURE__ */ L.jsxs(
          "div",
          {
            className: `fixed top-0 right-0 h-screen mb-16 shadow-soft-white overflow-auto overscroll-y-auto transition ${r && !a && `w-${r}`} ${a && "w-10/12"}`,
            style: { backgroundColor: "#F8F8F9", animation: "appearFromRight 0.3s ease-in-out" },
            children: [
              /* @__PURE__ */ L.jsxs("div", { className: "flex px-4 py-3 bg-main text-white text-lg items-center flex justify-between", children: [
                /* @__PURE__ */ L.jsxs("div", { onClick: () => t && t(), children: [
                  /* @__PURE__ */ L.jsx(co, { className: "inline mr-4 relative -mt-1 cursor-pointer" }),
                  n
                ] }),
                i && /* @__PURE__ */ L.jsxs("div", { children: [
                  a && /* @__PURE__ */ L.jsx(Gv, { className: "inline mr-4 relative -mt-1 cursor-pointer", onClick: () => o(!a) }),
                  !a && /* @__PURE__ */ L.jsx(Zv, { className: "inline mr-4 relative -mt-1 cursor-pointer", onClick: () => o(!a) })
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
}, qi = ({
  onClick: e,
  bgColor: t = "transparence-blue",
  width: n = "9",
  height: r = "9",
  shadow: i,
  shadowHover: a,
  icon: o,
  iconWidth: l = "5",
  alt: u,
  marginY: f
}) => /* @__PURE__ */ L.jsx(
  "button",
  {
    onClick: e,
    className: `w-${n} h-${r} mx-1 my-${f} | 
        bg-${t} rounded-2xl | 
        flex justify-center items-center | 
        cursor-pointer outline-none transition-all duration-500 ease-in-out shadow-${i} | 
        hover:shadow-${a} hover:outline-none`,
    children: /* @__PURE__ */ L.jsx(
      "img",
      {
        src: o,
        alt: u,
        className: `h-${l} w-auto`
      }
    )
  }
), Qv = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkuNjQyOTEgOC44Mjg0MkwxNC41MjIyIDMuOTMzNDVDMTQuODI3NCAzLjYyNjUyIDE1IDMuMjA3MzEgMTUgMi43Njk4VjEuMzM0MTZDMTUgMC40MzMzNTMgMTQuMjg1MyAwIDEzLjQwMzcgMEgxLjU5NjNDMC43MTQ3MTIgMCAwIDAuNDMzMzUzIDAgMS4zMzQxNlYyLjc5NTU4QzAgMy4yMDk4MSAwLjE1Mzg1IDMuNjA5MDYgMC40MzE0MzIgMy45MTE4Mkw0LjkxNDI2IDguODAyNjRDNC45OTg5MSA4Ljg5NDk2IDUuMTE2OTUgOC45NDczNyA1LjI0MTQ5IDguOTQ4Mkw5LjMyNjI2IDguOTU5ODRDOS40NDQyOSA4Ljk2MDY3IDkuNTU4MjYgOC45MTQwOSA5LjY0MjkxIDguODI4NDJaIiBmaWxsPSIjNEQ3MEIzIi8+CjxwYXRoIG9wYWNpdHk9IjAuNCIgZD0iTTUuMDQ3IDguOTA0NzlWMTQuNDA4NkM1LjA0NyAxNC42MDkxIDUuMTQ3OTQgMTQuNzk3OSA1LjMxMzE4IDE0LjkwNkM1LjQwNzYxIDE0Ljk2ODQgNS41MTY2OSAxNSA1LjYyNTc3IDE1QzUuNzA3OTggMTUgNS43OTAyIDE0Ljk4MjUgNS44NjY3MiAxNC45NDc2TDkuMTcxNjUgMTMuNDA3MkM5LjM3ODQxIDEzLjMxMTUgOS41MTExIDEzLjEwMTEgOS41MTExIDEyLjg2OVY4LjkwNDc5SDUuMDQ3WiIgZmlsbD0iIzRENzBCMyIvPgo8L3N2Zz4K", Xv = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjcuNSIgeDI9IjcuNSIgeTI9IjE1IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB5MT0iNy41IiB4Mj0iMTUiIHkyPSI3LjUiIHN0cm9rZT0iIzRENzBCMyIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=", Jv = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggb3BhY2l0eT0iMC40IiBkPSJNNy4zODk1IDguOTg0NTJINi40NTY1QzQuNDIxNSA4Ljk4NDUyIDIuNzcxNSAxMC42MzQ1IDIuNzcxNSAxMi42Njk1VjE3LjU0NDVDMi43NzE1IDE5LjU3ODUgNC40MjE1IDIxLjIyODUgNi40NTY1IDIxLjIyODVIMTcuNTg2NUMxOS42MjE1IDIxLjIyODUgMjEuMjcxNSAxOS41Nzg1IDIxLjI3MTUgMTcuNTQ0NVYxMi42NTk1QzIxLjI3MTUgMTAuNjMwNSAxOS42MjY1IDguOTg0NTIgMTcuNTk3NSA4Ljk4NDUyTDE2LjY1NDUgOC45ODQ1MiIgc3Ryb2tlPSIjNEQ3MEIzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xMi4wMjE0IDIuMTkxNDJWMTQuMjMyNCIgc3Ryb2tlPSIjNEQ3MEIzIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik05LjEwNjMgNS4xMTkxNEwxMi4wMjEzIDIuMTkxMTRMMTQuOTM3MyA1LjExOTE0IiBzdHJva2U9IiM0RDcwQjMiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==";
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
var hc = function(e, t) {
  return (hc = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(n, r) {
    n.__proto__ = r;
  } || function(n, r) {
    for (var i in r)
      r.hasOwnProperty(i) && (n[i] = r[i]);
  })(e, t);
}, eg, gr, tg = (function(e) {
  /*!
    Copyright (c) 2017 Jed Watson.
    Licensed under the MIT License (MIT), see
    http://jedwatson.github.io/classnames
  */
  (function() {
    var t = {}.hasOwnProperty;
    function n() {
      for (var r = [], i = 0; i < arguments.length; i++) {
        var a = arguments[i];
        if (a) {
          var o = typeof a;
          if (o === "string" || o === "number")
            r.push(a);
          else if (Array.isArray(a) && a.length) {
            var l = n.apply(null, a);
            l && r.push(l);
          } else if (o === "object")
            for (var u in a)
              t.call(a, u) && a[u] && r.push(u);
        }
      }
      return r.join(" ");
    }
    e.exports ? (n.default = n, e.exports = n) : window.classNames = n;
  })();
}(gr = { path: eg, exports: {}, require: function(e, t) {
  return function() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
  }(t == null && gr.path);
} }, gr.exports), gr.exports);
function Na(e, t, n) {
  var r, i, a, o, l;
  function u() {
    var h = Date.now() - o;
    h < t && h >= 0 ? r = setTimeout(u, t - h) : (r = null, n || (l = e.apply(a, i), a = i = null));
  }
  t == null && (t = 100);
  var f = function() {
    a = this, i = arguments, o = Date.now();
    var h = n && !r;
    return r || (r = setTimeout(u, t)), h && (l = e.apply(a, i), a = i = null), l;
  };
  return f.clear = function() {
    r && (clearTimeout(r), r = null);
  }, f.flush = function() {
    r && (l = e.apply(a, i), a = i = null, clearTimeout(r), r = null);
  }, f;
}
Na.debounce = Na;
var ng = Na;
(function(e, t) {
  t === void 0 && (t = {});
  var n = t.insertAt;
  if (e && typeof document < "u") {
    var r = document.head || document.getElementsByTagName("head")[0], i = document.createElement("style");
    i.type = "text/css", n === "top" && r.firstChild ? r.insertBefore(i, r.firstChild) : r.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e));
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
var Ui, rg = (Ui = "indiana-scroll-container", function(e, t) {
  if (!e)
    return Ui;
  var n;
  typeof e == "string" ? n = e : t = e;
  var r = Ui;
  return n && (r += "__" + n), r + (t ? Object.keys(t).reduce(function(i, a) {
    var o = t[a];
    return o && (i += " " + (typeof o == "boolean" ? r + "--" + a : r + "--" + a + "_" + o)), i;
  }, "") : "");
}), ig = function(e) {
  function t(n) {
    var r = e.call(this, n) || this;
    return r.onEndScroll = function() {
      r.scrolling = !1, !r.pressed && r.started && r.processEnd();
    }, r.onScroll = function(i) {
      var a = r.container.current;
      a.scrollLeft === r.scrollLeft && a.scrollTop === r.scrollTop || (r.scrolling = !0, r.processScroll(i), r.onEndScroll());
    }, r.onTouchStart = function(i) {
      var a = r.props.nativeMobileScroll;
      if (r.isDraggable(i.target))
        if (r.internal = !0, a && r.scrolling)
          r.pressed = !0;
        else {
          var o = i.touches[0];
          r.processClick(i, o.clientX, o.clientY), !a && r.props.stopPropagation && i.stopPropagation();
        }
    }, r.onTouchEnd = function(i) {
      var a = r.props.nativeMobileScroll;
      r.pressed && (!r.started || r.scrolling && a ? r.pressed = !1 : r.processEnd(), r.forceUpdate());
    }, r.onTouchMove = function(i) {
      var a = r.props.nativeMobileScroll;
      if (r.pressed && (!a || !r.isMobile)) {
        var o = i.touches[0];
        o && r.processMove(i, o.clientX, o.clientY), i.preventDefault(), r.props.stopPropagation && i.stopPropagation();
      }
    }, r.onMouseDown = function(i) {
      r.isDraggable(i.target) && r.isScrollable() && (r.internal = !0, r.props.buttons.indexOf(i.button) !== -1 && (r.processClick(i, i.clientX, i.clientY), i.preventDefault(), r.props.stopPropagation && i.stopPropagation()));
    }, r.onMouseMove = function(i) {
      r.pressed && (r.processMove(i, i.clientX, i.clientY), i.preventDefault(), r.props.stopPropagation && i.stopPropagation());
    }, r.onMouseUp = function(i) {
      r.pressed && (r.started ? r.processEnd() : (r.internal = !1, r.pressed = !1, r.forceUpdate(), r.props.onClick && r.props.onClick(i)), i.preventDefault(), r.props.stopPropagation && i.stopPropagation());
    }, r.container = Ue.createRef(), r.onEndScroll = ng(r.onEndScroll, 300), r.scrolling = !1, r.started = !1, r.pressed = !1, r.internal = !1, r.getRef = r.getRef.bind(r), r;
  }
  return function(n, r) {
    function i() {
      this.constructor = n;
    }
    hc(n, r), n.prototype = r === null ? Object.create(r) : (i.prototype = r.prototype, new i());
  }(t, e), t.prototype.componentDidMount = function() {
    var n = this.props.nativeMobileScroll, r = this.container.current;
    window.addEventListener("mouseup", this.onMouseUp), window.addEventListener("mousemove", this.onMouseMove), window.addEventListener("touchmove", this.onTouchMove, { passive: !1 }), window.addEventListener("touchend", this.onTouchEnd), r.addEventListener("touchstart", this.onTouchStart, { passive: !1 }), r.addEventListener("mousedown", this.onMouseDown, { passive: !1 }), n && (this.isMobile = this.isMobileDevice(), this.isMobile && this.forceUpdate());
  }, t.prototype.componentWillUnmount = function() {
    window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchmove", this.onTouchMove), window.removeEventListener("touchend", this.onTouchEnd);
  }, t.prototype.getElement = function() {
    return this.container.current;
  }, t.prototype.isMobileDevice = function() {
    return window.orientation !== void 0 || navigator.userAgent.indexOf("IEMobile") !== -1;
  }, t.prototype.isDraggable = function(n) {
    var r = this.props.ignoreElements;
    if (r) {
      var i = n.closest(r);
      return i === null || i.contains(this.getElement());
    }
    return !0;
  }, t.prototype.isScrollable = function() {
    var n = this.container.current;
    return n && (n.scrollWidth > n.clientWidth || n.scrollHeight > n.clientHeight);
  }, t.prototype.processClick = function(n, r, i) {
    var a = this.container.current;
    this.scrollLeft = a.scrollLeft, this.scrollTop = a.scrollTop, this.clientX = r, this.clientY = i, this.pressed = !0;
  }, t.prototype.processStart = function(n) {
    n === void 0 && (n = !0);
    var r = this.props.onStartScroll;
    this.started = !0, n && document.body.classList.add("indiana-dragging"), r && r({ external: !this.internal }), this.forceUpdate();
  }, t.prototype.processScroll = function(n) {
    if (this.started) {
      var r = this.props.onScroll;
      r && r({ external: !this.internal });
    } else
      this.processStart(!1);
  }, t.prototype.processMove = function(n, r, i) {
    var a = this.props, o = a.horizontal, l = a.vertical, u = a.activationDistance, f = a.onScroll, h = this.container.current;
    this.started ? (o && (h.scrollLeft -= r - this.clientX), l && (h.scrollTop -= i - this.clientY), f && f({ external: !this.internal }), this.clientX = r, this.clientY = i, this.scrollLeft = h.scrollLeft, this.scrollTop = h.scrollTop) : (o && Math.abs(r - this.clientX) > u || l && Math.abs(i - this.clientY) > u) && (this.clientX = r, this.clientY = i, this.processStart());
  }, t.prototype.processEnd = function() {
    var n = this.props.onEndScroll;
    this.container.current && n && n({ external: !this.internal }), this.pressed = !1, this.started = !1, this.scrolling = !1, this.internal = !1, document.body.classList.remove("indiana-dragging"), this.forceUpdate();
  }, t.prototype.getRef = function(n) {
    [this.container, this.props.innerRef].forEach(function(r) {
      r && (typeof r == "function" ? r(n) : r.current = n);
    });
  }, t.prototype.render = function() {
    var n = this.props, r = n.children, i = n.draggingClassName, a = n.className, o = n.style, l = n.hideScrollbars, u = n.component;
    return Ue.createElement(u, { className: tg(a, this.pressed && i, rg({ dragging: this.pressed, "hide-scrollbars": l, "native-scroll": this.isMobile })), style: o, ref: this.getRef, onScroll: this.onScroll }, r);
  }, t.defaultProps = { nativeMobileScroll: !0, hideScrollbars: !0, activationDistance: 10, vertical: !0, horizontal: !0, stopPropagation: !1, style: {}, component: "div", buttons: [0] }, t;
}(sf);
const qw = ({
  sectionTitles: e = [],
  sectionKeys: t = [],
  sortItems: n = [],
  setShowFilters: r,
  setShowAdd: i,
  setShowUpload: a,
  section: o,
  sort: l,
  setSection: u = null,
  setSort: f,
  showFilters: h = !1,
  showAdd: c = !1,
  showSort: s = !1,
  showUpload: d = !1,
  className: y = ""
}) => {
  const { t: m } = Ht(), b = Ce(), v = Ce(), g = Ce(), [w, p] = Ge(!1), [x, _] = Ge(!1), [E, k] = Ge(0), j = () => {
    if (!g || !g.current || !t || !t.length)
      return 0;
    let T = 0;
    const C = g.current.querySelectorAll("button");
    for (let D = 0; D < C.length; D++)
      T += C[D].offsetWidth + 18;
    return T;
  }, S = (T) => {
    u && u(t[T]);
  }, O = () => {
    v.current.scrollLeft > 30 ? _(!0) : _(!1), v.current.offsetWidth - v.current.scrollLeft > 30 ? p(!0) : p(!1);
  }, N = (T, C) => {
    T === "left" ? v.current.scrollLeft -= C : v.current.scrollLeft += C;
  };
  return Le(() => {
    k(j());
  }, [
    t,
    e,
    g
  ]), Le(() => (v != null && v.current && v.current.addEventListener("scroll", O), () => {
    v != null && v.current && v.current.removeEventListener("scroll", O);
  }), [v]), Le(() => {
    b != null && b.current && E > b.current.offsetWidth && p(!0);
  }, [b, g, v]), /* @__PURE__ */ L.jsxs("div", { className: `flex relative w-full px-4 mt-2 border-b border-border-section-header ${y}`, children: [
    /* @__PURE__ */ L.jsxs("div", { className: "flex-1 max-w-full", children: [
      w && /* @__PURE__ */ L.jsx("div", { className: "flex justify-end items-center h-full top-0 right-0 w-24 absolute bg-gradient-to-l from-white to-transparent z-10", children: /* @__PURE__ */ L.jsx(
        uv,
        {
          className: "text-main cursor-pointer",
          onClick: () => N("right", 50)
        }
      ) }),
      x && /* @__PURE__ */ L.jsx("div", { className: "flex justify-start items-center h-full top-0 left-0 w-24 absolute bg-gradient-to-r from-white to-transparent z-10", children: /* @__PURE__ */ L.jsx(
        lv,
        {
          className: "text-main cursor-pointer",
          onClick: () => N("left", 50)
        }
      ) }),
      /* @__PURE__ */ L.jsx("div", { className: "flex max-w-full", ref: b, children: /* @__PURE__ */ L.jsx(
        ig,
        {
          className: "cursor-grab active:cursor-grabbing w-full",
          horizontal: !0,
          hideScrollbars: !0,
          innerRef: v,
          children: /* @__PURE__ */ L.jsx(
            "div",
            {
              ref: g,
              className: "min-w-full",
              style: { width: E },
              children: e.map((T, C) => /* @__PURE__ */ L.jsx(
                "button",
                {
                  onClick: () => S(C),
                  className: `select-none text-sm mr-4 outline-none focus:outline-none ${o === t[C] ? "text-text-section-header-active-item font-semibold" : "text-gray font-medium"}`,
                  children: T
                },
                T
              ))
            }
          )
        }
      ) })
    ] }),
    (h || c || s || d) && /* @__PURE__ */ L.jsxs("div", { className: "flex", children: [
      s && /* @__PURE__ */ L.jsx(
        uc,
        {
          isClearable: !1,
          placeholder: m("sort_by"),
          sort: "true",
          initialValues: [{ id: l, value: m(`sort_${l}`) }],
          items: n,
          onSelect: (T) => {
            f(String(T[0].id));
          }
        }
      ),
      h && /* @__PURE__ */ L.jsx("span", { className: "inline-block relative -top-1", children: /* @__PURE__ */ L.jsx(
        qi,
        {
          width: "8",
          height: "8",
          shadow: "hover",
          shadowHover: "inner",
          iconWidth: "4",
          icon: Qv,
          onClick: () => r(!0)
        }
      ) }),
      c && /* @__PURE__ */ L.jsx(
        qi,
        {
          width: "8",
          height: "8",
          shadow: "hover",
          shadowHover: "inner",
          iconWidth: "4",
          icon: Xv,
          onClick: () => i(!0)
        }
      ),
      d && /* @__PURE__ */ L.jsx(
        qi,
        {
          width: "8",
          height: "8",
          shadow: "hover",
          shadowHover: "inner",
          iconWidth: "5",
          icon: Jv,
          onClick: () => a(!0)
        }
      )
    ] })
  ] });
};
var ag = /* @__PURE__ */ new Map([
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
function Xn(e, t) {
  var n = og(e);
  if (typeof n.path != "string") {
    var r = e.webkitRelativePath;
    Object.defineProperty(n, "path", {
      value: typeof t == "string" ? t : typeof r == "string" && r.length > 0 ? r : e.name,
      writable: !1,
      configurable: !1,
      enumerable: !0
    });
  }
  return n;
}
function og(e) {
  var t = e.name, n = t && t.lastIndexOf(".") !== -1;
  if (n && !e.type) {
    var r = t.split(".").pop().toLowerCase(), i = ag.get(r);
    i && Object.defineProperty(e, "type", {
      value: i,
      writable: !1,
      configurable: !1,
      enumerable: !0
    });
  }
  return e;
}
var sg = [
  // Thumbnail cache files for macOS and Windows
  ".DS_Store",
  "Thumbs.db"
  // Windows
];
function lg(e) {
  return dn(this, void 0, void 0, function() {
    return hn(this, function(t) {
      return Wr(e) && ug(e.dataTransfer) ? [2, hg(e.dataTransfer, e.type)] : cg(e) ? [2, fg(e)] : Array.isArray(e) && e.every(function(n) {
        return "getFile" in n && typeof n.getFile == "function";
      }) ? [2, dg(e)] : [2, []];
    });
  });
}
function ug(e) {
  return Wr(e);
}
function cg(e) {
  return Wr(e) && Wr(e.target);
}
function Wr(e) {
  return typeof e == "object" && e !== null;
}
function fg(e) {
  return Aa(e.target.files).map(function(t) {
    return Xn(t);
  });
}
function dg(e) {
  return dn(this, void 0, void 0, function() {
    var t;
    return hn(this, function(n) {
      switch (n.label) {
        case 0:
          return [4, Promise.all(e.map(function(r) {
            return r.getFile();
          }))];
        case 1:
          return t = n.sent(), [2, t.map(function(r) {
            return Xn(r);
          })];
      }
    });
  });
}
function hg(e, t) {
  return dn(this, void 0, void 0, function() {
    var n, r;
    return hn(this, function(i) {
      switch (i.label) {
        case 0:
          return e.items ? (n = Aa(e.items).filter(function(a) {
            return a.kind === "file";
          }), t !== "drop" ? [2, n] : [4, Promise.all(n.map(pg))]) : [3, 2];
        case 1:
          return r = i.sent(), [2, ul(pc(r))];
        case 2:
          return [2, ul(Aa(e.files).map(function(a) {
            return Xn(a);
          }))];
      }
    });
  });
}
function ul(e) {
  return e.filter(function(t) {
    return sg.indexOf(t.name) === -1;
  });
}
function Aa(e) {
  if (e === null)
    return [];
  for (var t = [], n = 0; n < e.length; n++) {
    var r = e[n];
    t.push(r);
  }
  return t;
}
function pg(e) {
  if (typeof e.webkitGetAsEntry != "function")
    return cl(e);
  var t = e.webkitGetAsEntry();
  return t && t.isDirectory ? vc(t) : cl(e);
}
function pc(e) {
  return e.reduce(function(t, n) {
    return At(At([], Wo(t), !1), Wo(Array.isArray(n) ? pc(n) : [n]), !1);
  }, []);
}
function cl(e) {
  var t = e.getAsFile();
  if (!t)
    return Promise.reject("".concat(e, " is not a File"));
  var n = Xn(t);
  return Promise.resolve(n);
}
function vg(e) {
  return dn(this, void 0, void 0, function() {
    return hn(this, function(t) {
      return [2, e.isDirectory ? vc(e) : gg(e)];
    });
  });
}
function vc(e) {
  var t = e.createReader();
  return new Promise(function(n, r) {
    var i = [];
    function a() {
      var o = this;
      t.readEntries(function(l) {
        return dn(o, void 0, void 0, function() {
          var u, f, h;
          return hn(this, function(c) {
            switch (c.label) {
              case 0:
                if (l.length)
                  return [3, 5];
                c.label = 1;
              case 1:
                return c.trys.push([1, 3, , 4]), [4, Promise.all(i)];
              case 2:
                return u = c.sent(), n(u), [3, 4];
              case 3:
                return f = c.sent(), r(f), [3, 4];
              case 4:
                return [3, 6];
              case 5:
                h = Promise.all(l.map(vg)), i.push(h), a(), c.label = 6;
              case 6:
                return [
                  2
                  /*return*/
                ];
            }
          });
        });
      }, function(l) {
        r(l);
      });
    }
    a();
  });
}
function gg(e) {
  return dn(this, void 0, void 0, function() {
    return hn(this, function(t) {
      return [2, new Promise(function(n, r) {
        e.file(function(i) {
          var a = Xn(i, e.fullPath);
          n(a);
        }, function(i) {
          r(i);
        });
      })];
    });
  });
}
var mg = function(e, t) {
  if (e && t) {
    var n = Array.isArray(t) ? t : t.split(","), r = e.name || "", i = (e.type || "").toLowerCase(), a = i.replace(/\/.*$/, "");
    return n.some(function(o) {
      var l = o.trim().toLowerCase();
      return l.charAt(0) === "." ? r.toLowerCase().endsWith(l) : l.endsWith("/*") ? a === l.replace(/\/.*$/, "") : i === l;
    });
  }
  return !0;
};
function fl(e) {
  return xg(e) || bg(e) || mc(e) || yg();
}
function yg() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bg(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function xg(e) {
  if (Array.isArray(e))
    return ka(e);
}
function dl(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function hl(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? dl(Object(n), !0).forEach(function(r) {
      gc(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : dl(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function gc(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Kn(e, t) {
  return Eg(e) || Og(e, t) || mc(e, t) || wg();
}
function wg() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function mc(e, t) {
  if (e) {
    if (typeof e == "string")
      return ka(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return ka(e, t);
  }
}
function ka(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Og(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], i = !0, a = !1, o, l;
    try {
      for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0)
        ;
    } catch (u) {
      a = !0, l = u;
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (a)
          throw l;
      }
    }
    return r;
  }
}
function Eg(e) {
  if (Array.isArray(e))
    return e;
}
var _g = "file-invalid-type", Sg = "file-too-large", Ng = "file-too-small", Ag = "too-many-files", kg = function(t) {
  t = Array.isArray(t) && t.length === 1 ? t[0] : t;
  var n = Array.isArray(t) ? "one of ".concat(t.join(", ")) : t;
  return {
    code: _g,
    message: "File type must be ".concat(n)
  };
}, pl = function(t) {
  return {
    code: Sg,
    message: "File is larger than ".concat(t, " ").concat(t === 1 ? "byte" : "bytes")
  };
}, vl = function(t) {
  return {
    code: Ng,
    message: "File is smaller than ".concat(t, " ").concat(t === 1 ? "byte" : "bytes")
  };
}, Tg = {
  code: Ag,
  message: "Too many files"
};
function yc(e, t) {
  var n = e.type === "application/x-moz-file" || mg(e, t);
  return [n, n ? null : kg(t)];
}
function bc(e, t, n) {
  if (Lt(e.size))
    if (Lt(t) && Lt(n)) {
      if (e.size > n)
        return [!1, pl(n)];
      if (e.size < t)
        return [!1, vl(t)];
    } else {
      if (Lt(t) && e.size < t)
        return [!1, vl(t)];
      if (Lt(n) && e.size > n)
        return [!1, pl(n)];
    }
  return [!0, null];
}
function Lt(e) {
  return e != null;
}
function jg(e) {
  var t = e.files, n = e.accept, r = e.minSize, i = e.maxSize, a = e.multiple, o = e.maxFiles, l = e.validator;
  return !a && t.length > 1 || a && o >= 1 && t.length > o ? !1 : t.every(function(u) {
    var f = yc(u, n), h = Kn(f, 1), c = h[0], s = bc(u, r, i), d = Kn(s, 1), y = d[0], m = l ? l(u) : null;
    return c && y && !m;
  });
}
function Yr(e) {
  return typeof e.isPropagationStopped == "function" ? e.isPropagationStopped() : typeof e.cancelBubble < "u" ? e.cancelBubble : !1;
}
function mr(e) {
  return e.dataTransfer ? Array.prototype.some.call(e.dataTransfer.types, function(t) {
    return t === "Files" || t === "application/x-moz-file";
  }) : !!e.target && !!e.target.files;
}
function gl(e) {
  e.preventDefault();
}
function Pg(e) {
  return e.indexOf("MSIE") !== -1 || e.indexOf("Trident/") !== -1;
}
function Cg(e) {
  return e.indexOf("Edge/") !== -1;
}
function Ig() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
  return Pg(e) || Cg(e);
}
function ct() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return function(r) {
    for (var i = arguments.length, a = new Array(i > 1 ? i - 1 : 0), o = 1; o < i; o++)
      a[o - 1] = arguments[o];
    return t.some(function(l) {
      return !Yr(r) && l && l.apply(void 0, [r].concat(a)), Yr(r);
    });
  };
}
function Lg() {
  return "showOpenFilePicker" in window;
}
function Mg(e) {
  if (Lt(e)) {
    var t = Object.entries(e).filter(function(n) {
      var r = Kn(n, 2), i = r[0], a = r[1], o = !0;
      return xc(i) || (console.warn('Skipped "'.concat(i, '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')), o = !1), (!Array.isArray(a) || !a.every(wc)) && (console.warn('Skipped "'.concat(i, '" because an invalid file extension was provided.')), o = !1), o;
    }).reduce(function(n, r) {
      var i = Kn(r, 2), a = i[0], o = i[1];
      return hl(hl({}, n), {}, gc({}, a, o));
    }, {});
    return [{
      // description is required due to https://crbug.com/1264708
      description: "Files",
      accept: t
    }];
  }
  return e;
}
function Rg(e) {
  if (Lt(e))
    return Object.entries(e).reduce(function(t, n) {
      var r = Kn(n, 2), i = r[0], a = r[1];
      return [].concat(fl(t), [i], fl(a));
    }, []).filter(function(t) {
      return xc(t) || wc(t);
    }).join(",");
}
function Dg(e) {
  return e instanceof DOMException && (e.name === "AbortError" || e.code === e.ABORT_ERR);
}
function $g(e) {
  return e instanceof DOMException && (e.name === "SecurityError" || e.code === e.SECURITY_ERR);
}
function xc(e) {
  return e === "audio/*" || e === "video/*" || e === "image/*" || e === "text/*" || /\w+\/[-+.\w]+/g.test(e);
}
function wc(e) {
  return /^.*\.[\w]+$/.test(e);
}
var zg = ["children"], Fg = ["open"], Bg = ["refKey", "role", "onKeyDown", "onFocus", "onBlur", "onClick", "onDragEnter", "onDragOver", "onDragLeave", "onDrop"], qg = ["refKey", "onChange", "onClick"];
function Ug(e) {
  return Yg(e) || Wg(e) || Oc(e) || Hg();
}
function Hg() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Wg(e) {
  if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null)
    return Array.from(e);
}
function Yg(e) {
  if (Array.isArray(e))
    return Ta(e);
}
function Hi(e, t) {
  return Gg(e) || Kg(e, t) || Oc(e, t) || Vg();
}
function Vg() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Oc(e, t) {
  if (e) {
    if (typeof e == "string")
      return Ta(e, t);
    var n = Object.prototype.toString.call(e).slice(8, -1);
    if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set")
      return Array.from(e);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return Ta(e, t);
  }
}
function Ta(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var n = 0, r = new Array(t); n < t; n++)
    r[n] = e[n];
  return r;
}
function Kg(e, t) {
  var n = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (n != null) {
    var r = [], i = !0, a = !1, o, l;
    try {
      for (n = n.call(e); !(i = (o = n.next()).done) && (r.push(o.value), !(t && r.length === t)); i = !0)
        ;
    } catch (u) {
      a = !0, l = u;
    } finally {
      try {
        !i && n.return != null && n.return();
      } finally {
        if (a)
          throw l;
      }
    }
    return r;
  }
}
function Gg(e) {
  if (Array.isArray(e))
    return e;
}
function ml(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t && (r = r.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), n.push.apply(n, r);
  }
  return n;
}
function Me(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ml(Object(n), !0).forEach(function(r) {
      ja(e, r, n[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ml(Object(n)).forEach(function(r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
    });
  }
  return e;
}
function ja(e, t, n) {
  return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e;
}
function Vr(e, t) {
  if (e == null)
    return {};
  var n = Zg(e, t), r, i;
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (i = 0; i < a.length; i++)
      r = a[i], !(t.indexOf(r) >= 0) && Object.prototype.propertyIsEnumerable.call(e, r) && (n[r] = e[r]);
  }
  return n;
}
function Zg(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
var ho = /* @__PURE__ */ nu(function(e, t) {
  var n = e.children, r = Vr(e, zg), i = _c(r), a = i.open, o = Vr(i, Fg);
  return uf(t, function() {
    return {
      open: a
    };
  }, [a]), /* @__PURE__ */ Ue.createElement(cf, null, n(Me(Me({}, o), {}, {
    open: a
  })));
});
ho.displayName = "Dropzone";
var Ec = {
  disabled: !1,
  getFilesFromEvent: lg,
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
ho.defaultProps = Ec;
ho.propTypes = {
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
  children: se.func,
  /**
   * Set accepted file types.
   * Checkout https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker types option for more information.
   * Keep in mind that mime type determination is not reliable across platforms. CSV files,
   * for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
   * Windows. In some cases there might not be a mime type set at all (https://github.com/react-dropzone/react-dropzone/issues/276).
   */
  accept: se.objectOf(se.arrayOf(se.string)),
  /**
   * Allow drag 'n' drop (or selection from the file dialog) of multiple files
   */
  multiple: se.bool,
  /**
   * If false, allow dropped items to take over the current browser window
   */
  preventDropOnDocument: se.bool,
  /**
   * If true, disables click to open the native file selection dialog
   */
  noClick: se.bool,
  /**
   * If true, disables SPACE/ENTER to open the native file selection dialog.
   * Note that it also stops tracking the focus state.
   */
  noKeyboard: se.bool,
  /**
   * If true, disables drag 'n' drop
   */
  noDrag: se.bool,
  /**
   * If true, stops drag event propagation to parents
   */
  noDragEventsBubbling: se.bool,
  /**
   * Minimum file size (in bytes)
   */
  minSize: se.number,
  /**
   * Maximum file size (in bytes)
   */
  maxSize: se.number,
  /**
   * Maximum accepted number of files
   * The default value is 0 which means there is no limitation to how many files are accepted.
   */
  maxFiles: se.number,
  /**
   * Enable/disable the dropzone
   */
  disabled: se.bool,
  /**
   * Use this to provide a custom file aggregator
   *
   * @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
   */
  getFilesFromEvent: se.func,
  /**
   * Cb for when closing the file dialog with no selection
   */
  onFileDialogCancel: se.func,
  /**
   * Cb for when opening the file dialog
   */
  onFileDialogOpen: se.func,
  /**
   * Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
   * to open the file picker instead of using an `<input type="file">` click event.
   */
  useFsAccessApi: se.bool,
  /**
   * Set to true to focus the root element on render
   */
  autoFocus: se.bool,
  /**
   * Cb for when the `dragenter` event occurs.
   *
   * @param {DragEvent} event
   */
  onDragEnter: se.func,
  /**
   * Cb for when the `dragleave` event occurs
   *
   * @param {DragEvent} event
   */
  onDragLeave: se.func,
  /**
   * Cb for when the `dragover` event occurs
   *
   * @param {DragEvent} event
   */
  onDragOver: se.func,
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
  onDrop: se.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are accepted, this callback is not invoked.
   *
   * @param {File[]} files
   * @param {(DragEvent|Event)} event
   */
  onDropAccepted: se.func,
  /**
   * Cb for when the `drop` event occurs.
   * Note that if no files are rejected, this callback is not invoked.
   *
   * @param {FileRejection[]} fileRejections
   * @param {(DragEvent|Event)} event
   */
  onDropRejected: se.func,
  /**
   * Cb for when there's some error from any of the promises.
   *
   * @param {Error} error
   */
  onError: se.func,
  /**
   * Custom validation function. It must return null if there's no errors.
   * @param {File} file
   * @returns {FileError|FileError[]|null}
   */
  validator: se.func
};
var Pa = {
  isFocused: !1,
  isFileDialogActive: !1,
  isDragActive: !1,
  isDragAccept: !1,
  isDragReject: !1,
  acceptedFiles: [],
  fileRejections: []
};
function _c() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, t = Me(Me({}, Ec), e), n = t.accept, r = t.disabled, i = t.getFilesFromEvent, a = t.maxSize, o = t.minSize, l = t.multiple, u = t.maxFiles, f = t.onDragEnter, h = t.onDragLeave, c = t.onDragOver, s = t.onDrop, d = t.onDropAccepted, y = t.onDropRejected, m = t.onFileDialogCancel, b = t.onFileDialogOpen, v = t.useFsAccessApi, g = t.autoFocus, w = t.preventDropOnDocument, p = t.noClick, x = t.noKeyboard, _ = t.noDrag, E = t.noDragEventsBubbling, k = t.onError, j = t.validator, S = mt(function() {
    return Rg(n);
  }, [n]), O = mt(function() {
    return Mg(n);
  }, [n]), N = mt(function() {
    return typeof b == "function" ? b : yl;
  }, [b]), T = mt(function() {
    return typeof m == "function" ? m : yl;
  }, [m]), C = Ce(null), D = Ce(null), H = lf(Qg, Pa), U = Hi(H, 2), K = U[0], q = U[1], P = K.isFocused, A = K.isFileDialogActive, M = Ce(typeof window < "u" && window.isSecureContext && v && Lg()), R = function() {
    !M.current && A && setTimeout(function() {
      if (D.current) {
        var ne = D.current.files;
        ne.length || (q({
          type: "closeDialog"
        }), T());
      }
    }, 300);
  };
  Le(function() {
    return window.addEventListener("focus", R, !1), function() {
      window.removeEventListener("focus", R, !1);
    };
  }, [D, A, T, M]);
  var z = Ce([]), B = function(ne) {
    C.current && C.current.contains(ne.target) || (ne.preventDefault(), z.current = []);
  };
  Le(function() {
    return w && (document.addEventListener("dragover", gl, !1), document.addEventListener("drop", B, !1)), function() {
      w && (document.removeEventListener("dragover", gl), document.removeEventListener("drop", B));
    };
  }, [C, w]), Le(function() {
    return !r && g && C.current && C.current.focus(), function() {
    };
  }, [C, g, r]);
  var I = Re(function(X) {
    k ? k(X) : console.error(X);
  }, [k]), $ = Re(function(X) {
    X.preventDefault(), X.persist(), re(X), z.current = [].concat(Ug(z.current), [X.target]), mr(X) && Promise.resolve(i(X)).then(function(ne) {
      if (!(Yr(X) && !E)) {
        var ge = ne.length, ye = ge > 0 && jg({
          files: ne,
          accept: S,
          minSize: o,
          maxSize: a,
          multiple: l,
          maxFiles: u,
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
      return I(ne);
    });
  }, [i, f, I, E, S, o, a, l, u, j]), W = Re(function(X) {
    X.preventDefault(), X.persist(), re(X);
    var ne = mr(X);
    if (ne && X.dataTransfer)
      try {
        X.dataTransfer.dropEffect = "copy";
      } catch {
      }
    return ne && c && c(X), !1;
  }, [c, E]), Y = Re(function(X) {
    X.preventDefault(), X.persist(), re(X);
    var ne = z.current.filter(function(ye) {
      return C.current && C.current.contains(ye);
    }), ge = ne.indexOf(X.target);
    ge !== -1 && ne.splice(ge, 1), z.current = ne, !(ne.length > 0) && (q({
      type: "setDraggedFiles",
      isDragActive: !1,
      isDragAccept: !1,
      isDragReject: !1
    }), mr(X) && h && h(X));
  }, [C, h, E]), V = Re(function(X, ne) {
    var ge = [], ye = [];
    X.forEach(function(pe) {
      var rt = yc(pe, S), xe = Hi(rt, 2), He = xe[0], _n = xe[1], Sn = bc(pe, o, a), Wt = Hi(Sn, 2), Nn = Wt[0], An = Wt[1], kn = j ? j(pe) : null;
      if (He && Nn && !kn)
        ge.push(pe);
      else {
        var Tn = [_n, An];
        kn && (Tn = Tn.concat(kn)), ye.push({
          file: pe,
          errors: Tn.filter(function(jn) {
            return jn;
          })
        });
      }
    }), (!l && ge.length > 1 || l && u >= 1 && ge.length > u) && (ge.forEach(function(pe) {
      ye.push({
        file: pe,
        errors: [Tg]
      });
    }), ge.splice(0)), q({
      acceptedFiles: ge,
      fileRejections: ye,
      type: "setFiles"
    }), s && s(ge, ye, ne), ye.length > 0 && y && y(ye, ne), ge.length > 0 && d && d(ge, ne);
  }, [q, l, S, o, a, u, s, d, y, j]), ee = Re(function(X) {
    X.preventDefault(), X.persist(), re(X), z.current = [], mr(X) && Promise.resolve(i(X)).then(function(ne) {
      Yr(X) && !E || V(ne, X);
    }).catch(function(ne) {
      return I(ne);
    }), q({
      type: "reset"
    });
  }, [i, V, I, E]), Z = Re(function() {
    if (M.current) {
      q({
        type: "openDialog"
      }), N();
      var X = {
        multiple: l,
        types: O
      };
      window.showOpenFilePicker(X).then(function(ne) {
        return i(ne);
      }).then(function(ne) {
        V(ne, null), q({
          type: "closeDialog"
        });
      }).catch(function(ne) {
        Dg(ne) ? (T(ne), q({
          type: "closeDialog"
        })) : $g(ne) ? (M.current = !1, D.current ? (D.current.value = null, D.current.click()) : I(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))) : I(ne);
      });
      return;
    }
    D.current && (q({
      type: "openDialog"
    }), N(), D.current.value = null, D.current.click());
  }, [q, N, T, v, V, I, O, l]), le = Re(function(X) {
    !C.current || !C.current.isEqualNode(X.target) || (X.key === " " || X.key === "Enter" || X.keyCode === 32 || X.keyCode === 13) && (X.preventDefault(), Z());
  }, [C, Z]), ce = Re(function() {
    q({
      type: "focus"
    });
  }, []), he = Re(function() {
    q({
      type: "blur"
    });
  }, []), Ae = Re(function() {
    p || (Ig() ? setTimeout(Z, 0) : Z());
  }, [p, Z]), Oe = function(ne) {
    return r ? null : ne;
  }, G = function(ne) {
    return x ? null : Oe(ne);
  }, Q = function(ne) {
    return _ ? null : Oe(ne);
  }, re = function(ne) {
    E && ne.stopPropagation();
  }, ie = mt(function() {
    return function() {
      var X = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, ne = X.refKey, ge = ne === void 0 ? "ref" : ne, ye = X.role, pe = X.onKeyDown, rt = X.onFocus, xe = X.onBlur, He = X.onClick, _n = X.onDragEnter, Sn = X.onDragOver, Wt = X.onDragLeave, Nn = X.onDrop, An = Vr(X, Bg);
      return Me(Me(ja({
        onKeyDown: G(ct(pe, le)),
        onFocus: G(ct(rt, ce)),
        onBlur: G(ct(xe, he)),
        onClick: Oe(ct(He, Ae)),
        onDragEnter: Q(ct(_n, $)),
        onDragOver: Q(ct(Sn, W)),
        onDragLeave: Q(ct(Wt, Y)),
        onDrop: Q(ct(Nn, ee)),
        role: typeof ye == "string" && ye !== "" ? ye : "presentation"
      }, ge, C), !r && !x ? {
        tabIndex: 0
      } : {}), An);
    };
  }, [C, le, ce, he, Ae, $, W, Y, ee, x, _, r]), J = Re(function(X) {
    X.stopPropagation();
  }, []), de = mt(function() {
    return function() {
      var X = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, ne = X.refKey, ge = ne === void 0 ? "ref" : ne, ye = X.onChange, pe = X.onClick, rt = Vr(X, qg), xe = ja({
        accept: S,
        multiple: l,
        type: "file",
        style: {
          display: "none"
        },
        onChange: Oe(ct(ye, ee)),
        onClick: Oe(ct(pe, J)),
        tabIndex: -1
      }, ge, D);
      return Me(Me({}, xe), rt);
    };
  }, [D, n, l, ee, r]);
  return Me(Me({}, K), {}, {
    isFocused: P && !r,
    getRootProps: ie,
    getInputProps: de,
    rootRef: C,
    inputRef: D,
    open: Oe(Z)
  });
}
function Qg(e, t) {
  switch (t.type) {
    case "focus":
      return Me(Me({}, e), {}, {
        isFocused: !0
      });
    case "blur":
      return Me(Me({}, e), {}, {
        isFocused: !1
      });
    case "openDialog":
      return Me(Me({}, Pa), {}, {
        isFileDialogActive: !0
      });
    case "closeDialog":
      return Me(Me({}, e), {}, {
        isFileDialogActive: !1
      });
    case "setDraggedFiles":
      return Me(Me({}, e), {}, {
        isDragActive: t.isDragActive,
        isDragAccept: t.isDragAccept,
        isDragReject: t.isDragReject
      });
    case "setFiles":
      return Me(Me({}, e), {}, {
        acceptedFiles: t.acceptedFiles,
        fileRejections: t.fileRejections
      });
    case "reset":
      return Me({}, Pa);
    default:
      return e;
  }
}
function yl() {
}
const bl = {
  border: "2px dashed #4D70B3"
}, Xg = {
  border: "2px dashed rgba(85, 136, 80, 0.2)"
}, Jg = {
  border: "2px dashed rgba(194, 56, 50, 0.2)"
};
function xl(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM514.1 580.1l-61.8-102.4c-2.2-3.6-6.1-5.8-10.3-5.8h-38.4c-2.3 0-4.5.6-6.4 1.9-5.6 3.5-7.3 10.9-3.7 16.6l82.3 130.4-83.4 132.8a12.04 12.04 0 0 0 10.2 18.4h34.5c4.2 0 8-2.2 10.2-5.7L510 664.8l62.3 101.4c2.2 3.6 6.1 5.7 10.2 5.7H620c2.3 0 4.5-.7 6.5-1.9 5.6-3.6 7.2-11 3.6-16.6l-84-130.4 85.3-132.5a12.04 12.04 0 0 0-10.1-18.5h-35.7c-4.2 0-8.1 2.2-10.3 5.8l-61.2 102.3z" } }] })(e);
}
function wl(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M424 476c-4.4 0-8 3.6-8 8v276c0 4.4 3.6 8 8 8h32.5c4.4 0 8-3.6 8-8v-95.5h63.3c59.4 0 96.2-38.9 96.2-94.1 0-54.5-36.3-94.3-96-94.3H424zm150.6 94.3c0 43.4-26.5 54.3-71.2 54.3h-38.9V516.2h56.2c33.8 0 53.9 19.7 53.9 54.1zm280-281.7L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494z" } }] })(e);
}
function Ol(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 1024 1024" }, child: [{ tag: "path", attr: { d: "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM528.1 472h-32.2c-5.5 0-10.3 3.7-11.6 9.1L434.6 680l-46.1-198.7c-1.3-5.4-6.1-9.3-11.7-9.3h-35.4a12.02 12.02 0 0 0-11.6 15.1l74.2 276c1.4 5.2 6.2 8.9 11.6 8.9h32c5.4 0 10.2-3.6 11.6-8.9l52.8-197 52.8 197c1.4 5.2 6.2 8.9 11.6 8.9h31.8c5.4 0 10.2-3.6 11.6-8.9l74.4-276a12.04 12.04 0 0 0-11.6-15.1H647c-5.6 0-10.4 3.9-11.7 9.3l-45.8 199.1-49.8-199.3c-1.3-5.4-6.1-9.1-11.6-9.1z" } }] })(e);
}
function em(e) {
  return $e({ tag: "svg", attr: { viewBox: "0 0 16 16", fill: "currentColor" }, child: [{ tag: "path", attr: { fillRule: "evenodd", clipRule: "evenodd", d: "M6 2.984V2h-.09c-.313 0-.616.062-.909.185a2.33 2.33 0 0 0-.775.53 2.23 2.23 0 0 0-.493.753v.001a3.542 3.542 0 0 0-.198.83v.002a6.08 6.08 0 0 0-.024.863c.012.29.018.58.018.869 0 .203-.04.393-.117.572v.001a1.504 1.504 0 0 1-.765.787 1.376 1.376 0 0 1-.558.115H2v.984h.09c.195 0 .38.04.556.121l.001.001c.178.078.329.184.455.318l.002.002c.13.13.233.285.307.465l.001.002c.078.18.117.368.117.566 0 .29-.006.58-.018.869-.012.296-.004.585.024.87v.001c.033.283.099.558.197.824v.001c.106.273.271.524.494.753.223.23.482.407.775.53.293.123.596.185.91.185H6v-.984h-.09c-.2 0-.387-.038-.563-.115a1.613 1.613 0 0 1-.457-.32 1.659 1.659 0 0 1-.309-.467c-.074-.18-.11-.37-.11-.573 0-.228.003-.453.011-.672.008-.228.008-.45 0-.665a4.639 4.639 0 0 0-.055-.64 2.682 2.682 0 0 0-.168-.609A2.284 2.284 0 0 0 3.522 8a2.284 2.284 0 0 0 .738-.955c.08-.192.135-.393.168-.602.033-.21.051-.423.055-.64.008-.22.008-.442 0-.666-.008-.224-.012-.45-.012-.678a1.47 1.47 0 0 1 .877-1.354 1.33 1.33 0 0 1 .563-.121H6zm4 10.032V14h.09c.313 0 .616-.062.909-.185.293-.123.552-.3.775-.53.223-.23.388-.48.493-.753v-.001c.1-.266.165-.543.198-.83v-.002c.028-.28.036-.567.024-.863-.012-.29-.018-.58-.018-.869 0-.203.04-.393.117-.572v-.001a1.502 1.502 0 0 1 .765-.787 1.38 1.38 0 0 1 .558-.115H14v-.984h-.09c-.196 0-.381-.04-.557-.121l-.001-.001a1.376 1.376 0 0 1-.455-.318l-.002-.002a1.415 1.415 0 0 1-.307-.465v-.002a1.405 1.405 0 0 1-.118-.566c0-.29.006-.58.018-.869a6.174 6.174 0 0 0-.024-.87v-.001a3.537 3.537 0 0 0-.197-.824v-.001a2.23 2.23 0 0 0-.494-.753 2.331 2.331 0 0 0-.775-.53 2.325 2.325 0 0 0-.91-.185H10v.984h.09c.2 0 .387.038.562.115.174.082.326.188.457.32.127.134.23.29.309.467.074.18.11.37.11.573 0 .228-.003.452-.011.672-.008.228-.008.45 0 .665.004.222.022.435.055.64.033.214.089.416.168.609a2.285 2.285 0 0 0 .738.955 2.285 2.285 0 0 0-.738.955 2.689 2.689 0 0 0-.168.602c-.033.21-.051.423-.055.64a9.15 9.15 0 0 0 0 .666c.008.224.012.45.012.678a1.471 1.471 0 0 1-.877 1.354 1.33 1.33 0 0 1-.563.121H10z" } }] })(e);
}
const tm = ({
  documentName: e = "",
  size: t = 55,
  link: n = !1
}) => {
  const r = e.split("."), i = r[r.length - 1], a = {
    default: { icon: /* @__PURE__ */ L.jsx(dv, {}), colorClass: "bg-main" },
    pdf: { icon: /* @__PURE__ */ L.jsx(Vs, {}), colorClass: "bg-rose-600" },
    PDF: { icon: /* @__PURE__ */ L.jsx(Vs, {}), colorClass: "bg-rose-600" },
    docx: { icon: /* @__PURE__ */ L.jsx(Ol, {}), colorClass: "bg-indigo-700" },
    doc: { icon: /* @__PURE__ */ L.jsx(Ol, {}), colorClass: "bg-indigo-700" },
    json: { icon: /* @__PURE__ */ L.jsx(em, {}), colorClass: "bg-violet-700" },
    ppt: { icon: /* @__PURE__ */ L.jsx(wl, {}), colorClass: "bg-yellow-400" },
    pptx: { icon: /* @__PURE__ */ L.jsx(wl, {}), colorClass: "bg-yellow-400" },
    xls: { icon: /* @__PURE__ */ L.jsx(xl, {}), colorClass: "bg-emerald-400" },
    xlsx: { icon: /* @__PURE__ */ L.jsx(xl, {}), colorClass: "bg-emerald-400" },
    mp4: { icon: /* @__PURE__ */ L.jsx(Fi, {}), colorClass: "bg-fuchsia-400" },
    avi: { icon: /* @__PURE__ */ L.jsx(Fi, {}), colorClass: "bg-fuchsia-400" },
    mov: { icon: /* @__PURE__ */ L.jsx(Fi, {}), colorClass: "bg-fuchsia-400" },
    png: { icon: /* @__PURE__ */ L.jsx(Qt, {}), colorClass: "bg-teal-400" },
    jpg: { icon: /* @__PURE__ */ L.jsx(Qt, {}), colorClass: "bg-teal-400" },
    jpeg: { icon: /* @__PURE__ */ L.jsx(Qt, {}), colorClass: "bg-teal-400" },
    gif: { icon: /* @__PURE__ */ L.jsx(Qt, {}), colorClass: "bg-teal-400" },
    bmp: { icon: /* @__PURE__ */ L.jsx(Qt, {}), colorClass: "bg-teal-400" },
    tiff: { icon: /* @__PURE__ */ L.jsx(Qt, {}), colorClass: "bg-teal-400" },
    link: { icon: /* @__PURE__ */ L.jsx(hv, {}), colorClass: "bg-gray" }
  }, o = n ? a.link : a[i] || a.default;
  return /* @__PURE__ */ L.jsx(
    "span",
    {
      style: { width: t, height: t, padding: 3, fontSize: t * 0.6 },
      className: `rounded-full bg-main text-white inline-block flex justify-center items-center ${o.colorClass}`,
      children: o.icon
    }
  );
}, Uw = ({
  error: e,
  label: t,
  placeholder: n,
  selectedFile: r,
  setSelectedFile: i,
  id: a,
  accept: o = ".pdf, .doc, .docx, .json, .ppt, .pptx, .xls, .xlsx, video/mp4, video/avi, video/mov",
  fileError: l,
  className: u = "",
  height: f = "",
  padding: h = "2rem",
  multiple: c = !1,
  ...s
}) => {
  const { t: d } = Ht(), y = _c({
    multiple: c,
    minSize: 0,
    maxSize: 262144e5,
    accept: o,
    onDrop: (E) => {
      if (E.length > 0) {
        const k = E[E.length - 1];
        i(c ? E : k);
      } else
        i(null);
    }
  }), {
    getRootProps: m,
    getInputProps: b,
    isDragActive: v,
    isDragAccept: g,
    isDragReject: w,
    fileRejections: p
  } = y, x = p.map(({ errors: E }, k) => /* @__PURE__ */ L.jsx("div", { className: "mt-6", children: /* @__PURE__ */ L.jsx("div", { children: E[0].code === "file-too-large" ? /* @__PURE__ */ L.jsx("span", { className: "text-xs pt-6 text-red", children: d("large_file") }, E[0].code) : /* @__PURE__ */ L.jsx("span", { className: "text-xs pt-6 text-red", children: E[0].message }, E[0].code) }) }, k)), _ = mt(() => ({
    ...v ? bl : {},
    ...g ? Xg : {},
    ...w ? Jg : {},
    ...r ? bl : {}
  }), [v]);
  return /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    /* @__PURE__ */ L.jsxs("div", { ...s, className: "flex flex-col justify-center", children: [
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
          ...m({
            style: { height: f, padding: h, ..._ },
            className: `${u} 
              w-full flex flex-col items-center justify-center 
              rounded-xl text-center text-coolGray-500 placeholder-gray shadow-inner hover:border-dashed 
              cursor-pointer transition-all duration-200 
              outline-none hover:outline-none hover:shadow-focus 
              focus:border-2 focus:border-main focus:outline-none focus:shadow-focus 
              active:outline-none border`
          }),
          children: [
            /* @__PURE__ */ L.jsx("span", { className: "text-xxs", children: !v && !r && (n || d("input_file_text")) }),
            r && !l && /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
              !c && /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
                /* @__PURE__ */ L.jsx(tm, { documentName: r.name }),
                /* @__PURE__ */ L.jsx("p", { className: "text-xs text-main", children: r.name })
              ] }),
              c && /* @__PURE__ */ L.jsx("div", { className: "text-center text-2xl", children: d("multiple_files", { count: r.length }) })
            ] }),
            x,
            l && /* @__PURE__ */ L.jsx("span", { className: "text-red mt-6 text-sm", children: d("file_too_large") }),
            /* @__PURE__ */ L.jsx("input", { ...b() })
          ]
        }
      )
    ] }),
    e && /* @__PURE__ */ L.jsx("div", { className: "text-red relative text-xs", children: e.message })
  ] });
}, Hw = ({
  onClick: e,
  type: t,
  marginRight: n = "0",
  marginLeft: r = "0",
  icon: i,
  iconComponent: a,
  text: o,
  disabled: l
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: l,
    className: `text-center block w-auto mr-${n} ml-${r} py-2 px-4
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
), El = ({
  onClick: e,
  type: t,
  width: n = "full",
  verticalMargin: r = "5",
  vertical: i = "2.5",
  horizontal: a = "7",
  marginRight: o = "0",
  marginLeft: l = "0",
  bgColor: u = "transparence-blue",
  textColor: f = "blue-dark",
  bgHoverColor: h,
  borderColor: c,
  textColorHover: s,
  icon: d,
  iconComponent: y,
  text: m,
  disabled: b,
  textSize: v = "sm",
  weight: g = "semibold",
  shadow: w = "soft-white",
  iconWidth: p = "auto",
  textAlign: x = "center",
  className: _ = ""
}) => /* @__PURE__ */ L.jsxs(
  "button",
  {
    onClick: e,
    type: t,
    disabled: b,
    className: `${x === "center" ? "text-center" : x === "right" ? "text-right" : "text-left"} 
        block w-${n} my-${r} mr-${o} ml-${l} py-${i} px-${a} 
        text-${v} font-${g} text-${f} placeholder-gray bg-${u} rounded-2xl 
        shadow-${w} cursor-pointer transition-all duration-500 ease-in-out 
        hover:bg-${h} hover:border-${c} hover:text-${s} hover:shadow-hover
        ${c && `border border-${c}`}
        focus:outline-none hover:shadow-inner ${_}`,
    children: [
      d && /* @__PURE__ */ L.jsx("img", { src: d, alt: "Icon", className: `inline | mr-2 | w-${p} ` }),
      y && y,
      m
    ]
  }
), Ww = ({ image: e, title: t, textOne: n, textTwo: r, backgroundImage: i, showExtraTextOnHover: a = !1, className: o = "" }) => /* @__PURE__ */ L.jsx(
  "div",
  {
    className: `w-full group h-full flex justify-center items-center ${o}`,
    style: { backgroundImage: `url(${i})`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" },
    children: /* @__PURE__ */ L.jsxs("div", { className: "text-gray text-center ", children: [
      e,
      /* @__PURE__ */ L.jsx("h3", { className: "mb-4", children: t }),
      /* @__PURE__ */ L.jsx("p", { className: `text-base mb-2 ${a && "hidden group-hover:block duration-300"}`, children: n }),
      /* @__PURE__ */ L.jsx("p", { className: `text-base ${a && "hidden group-hover:block duration-300"}`, children: r })
    ] })
  }
), nm = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNy4wMTYzMSA1Ljc3MDMyTDUuMjM3MzEgMy45OTIzMkw3LjAxNTMxIDIuMjE0MzJDNy4zNTczMSAxLjg3MzMyIDcuMzU3MzEgMS4zMTgzMiA3LjAxNTMxIDAuOTc3MzE3QzYuNjczMzEgMC42MzMzMTcgNi4xMjAzMSAwLjYzNDMxNyA1Ljc3ODMxIDAuOTc2MzE3TDMuOTk5MzEgMi43NTQzMkwyLjIyMDMxIDAuOTc0MzE3QzEuODc4MzEgMC42MzIzMTcgMS4zMjQzMSAwLjYzNDMxNyAwLjk4MjMxMyAwLjk3NDMxN0MwLjY0MTMxMyAxLjMxNjMyIDAuNjQxMzEzIDEuODcxMzIgMC45ODIzMTMgMi4yMTIzMkwyLjc2MjMxIDMuOTkyMzJMMC45ODYzMTMgNS43NjczMkMwLjY0NDMxMyA2LjEwOTMyIDAuNjQ0MzEzIDYuNjY0MzIgMC45ODYzMTMgNy4wMDQzMkMxLjE1NzMxIDcuMTc2MzIgMS4zODAzMSA3LjI2MTMyIDEuNjA0MzEgNy4yNjEzMkMxLjgyOTMxIDcuMjYxMzIgMi4wNTIzMSA3LjE3NjMyIDIuMjIzMzEgNy4wMDUzMkwzLjk5OTMxIDUuMjI5MzJMNS43NzkzMSA3LjAwODMyQzUuOTUwMzEgNy4xNzkzMiA2LjE3MzMxIDcuMjY0MzIgNi4zOTczMSA3LjI2NDMyQzYuNjIxMzEgNy4yNjQzMiA2Ljg0NTMxIDcuMTc4MzIgNy4wMTYzMSA3LjAwODMyQzcuMzU4MzEgNi42NjYzMiA3LjM1ODMxIDYuMTEyMzIgNy4wMTYzMSA1Ljc3MDMyIiBmaWxsPSIjNDM2RkI0Ii8+Cjwvc3ZnPgo=", rm = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI2IiB2aWV3Qm94PSIwIDAgOCA2IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMy4zMTg4NyA1LjMyMDkxQzMuMTI1NTggNS4zMjE4OSAyLjkzMjI5IDUuMjUyMjcgMi43ODMyOSA1LjEwOTExTDAuODY2NDY0IDMuMjY1NkMwLjU3MDQ4NCAyLjk3OTI3IDAuNTY3NDYzIDIuNTE0NDcgMC44NjA0MjQgMi4yMjYxN0MxLjE1MzM4IDEuOTM2OSAxLjYzMTU4IDEuOTMzOTYgMS45Mjg1NyAyLjIxOTMxTDMuMzA3OCAzLjU0NTA3TDYuNjc1MzMgMC4yMjQ3OTJDNi45NjkzIC0wLjA2NDQ4MjIgNy40NDc1IC0wLjA2NzQyNCA3Ljc0MzQ4IDAuMjE3OTI3QzguMDQwNDcgMC41MDQyNiA4LjA0MzQ5IDAuOTcwMDM5IDcuNzUwNTMgMS4yNTczNUwzLjg1MTQ0IDUuMTAyMjRDMy43MDQ0NSA1LjI0NzM3IDMuNTEyMTcgNS4zMTk5MyAzLjMxODg3IDUuMzIwOTEiIGZpbGw9IiM0RDcwQjMiLz4KPC9zdmc+Cg==";
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
function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ca.apply(this, arguments);
}
var _l;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(_l || (_l = {}));
function Ye(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function ci(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Ia(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: r = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t;
}
function Sc(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let r = e.indexOf("?");
    r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e);
  }
  return t;
}
var Sl;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(Sl || (Sl = {}));
function La(e, t) {
  if (t === "/")
    return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function im(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: i = ""
  } = typeof e == "string" ? Sc(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : am(n, t) : t,
    search: om(r),
    hash: sm(i)
  };
}
function am(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((i) => {
    i === ".." ? n.length > 1 && n.pop() : i !== "." && n.push(i);
  }), n.length > 1 ? n.join("/") : "/";
}
function Wi(e, t, n, r) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Nc(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function Ac(e, t, n, r) {
  r === void 0 && (r = !1);
  let i;
  typeof e == "string" ? i = Sc(e) : (i = Ca({}, e), Ye(!i.pathname || !i.pathname.includes("?"), Wi("?", "pathname", "search", i)), Ye(!i.pathname || !i.pathname.includes("#"), Wi("#", "pathname", "hash", i)), Ye(!i.search || !i.search.includes("#"), Wi("#", "search", "hash", i)));
  let a = e === "" || i.pathname === "", o = a ? "/" : i.pathname, l;
  if (r || o == null)
    l = n;
  else {
    let c = t.length - 1;
    if (o.startsWith("..")) {
      let s = o.split("/");
      for (; s[0] === ".."; )
        s.shift(), c -= 1;
      i.pathname = s.join("/");
    }
    l = c >= 0 ? t[c] : "/";
  }
  let u = im(i, l), f = o && o !== "/" && o.endsWith("/"), h = (a || o === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (f || h) && (u.pathname += "/"), u;
}
const po = (e) => e.join("/").replace(/\/\/+/g, "/"), om = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, sm = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e, kc = ["post", "put", "patch", "delete"];
new Set(kc);
const lm = ["get", ...kc];
new Set(lm);
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
function Ma() {
  return Ma = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ma.apply(this, arguments);
}
const fi = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (fi.displayName = "DataRouter");
const Tc = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (Tc.displayName = "DataRouterState");
const um = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (um.displayName = "Await");
const Pt = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (Pt.displayName = "Navigation");
const vo = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (vo.displayName = "Location");
const mn = /* @__PURE__ */ ve.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (mn.displayName = "Route");
const cm = /* @__PURE__ */ ve.createContext(null);
process.env.NODE_ENV !== "production" && (cm.displayName = "RouteError");
function fm(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  go() || (process.env.NODE_ENV !== "production" ? Ye(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : Ye(!1));
  let {
    basename: r,
    navigator: i
  } = ve.useContext(Pt), {
    hash: a,
    pathname: o,
    search: l
  } = di(e, {
    relative: n
  }), u = o;
  return r !== "/" && (u = o === "/" ? r : po([r, o])), i.createHref({
    pathname: u,
    search: l,
    hash: a
  });
}
function go() {
  return ve.useContext(vo) != null;
}
function Jn() {
  return go() || (process.env.NODE_ENV !== "production" ? Ye(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : Ye(!1)), ve.useContext(vo).location;
}
const jc = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Pc(e) {
  ve.useContext(Pt).static || ve.useLayoutEffect(e);
}
function dm() {
  let {
    isDataRoute: e
  } = ve.useContext(mn);
  return e ? mm() : hm();
}
function hm() {
  go() || (process.env.NODE_ENV !== "production" ? Ye(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : Ye(!1));
  let e = ve.useContext(fi), {
    basename: t,
    navigator: n
  } = ve.useContext(Pt), {
    matches: r
  } = ve.useContext(mn), {
    pathname: i
  } = Jn(), a = JSON.stringify(Nc(r).map((u) => u.pathnameBase)), o = ve.useRef(!1);
  return Pc(() => {
    o.current = !0;
  }), ve.useCallback(function(u, f) {
    if (f === void 0 && (f = {}), process.env.NODE_ENV !== "production" && ci(o.current, jc), !o.current)
      return;
    if (typeof u == "number") {
      n.go(u);
      return;
    }
    let h = Ac(u, JSON.parse(a), i, f.relative === "path");
    e == null && t !== "/" && (h.pathname = h.pathname === "/" ? t : po([t, h.pathname])), (f.replace ? n.replace : n.push)(h, f.state, f);
  }, [t, n, a, i, e]);
}
function di(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    matches: r
  } = ve.useContext(mn), {
    pathname: i
  } = Jn(), a = JSON.stringify(Nc(r).map((o) => o.pathnameBase));
  return ve.useMemo(() => Ac(e, JSON.parse(a), i, n === "path"), [e, a, i, n]);
}
var Cc = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Cc || {}), mo = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(mo || {});
function Ic(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function pm(e) {
  let t = ve.useContext(fi);
  return t || (process.env.NODE_ENV !== "production" ? Ye(!1, Ic(e)) : Ye(!1)), t;
}
function vm(e) {
  let t = ve.useContext(mn);
  return t || (process.env.NODE_ENV !== "production" ? Ye(!1, Ic(e)) : Ye(!1)), t;
}
function Lc(e) {
  let t = vm(e), n = t.matches[t.matches.length - 1];
  return n.route.id || (process.env.NODE_ENV !== "production" ? Ye(!1, e + ' can only be used on routes that contain a unique "id"') : Ye(!1)), n.route.id;
}
function gm() {
  return Lc(mo.UseRouteId);
}
function mm() {
  let {
    router: e
  } = pm(Cc.UseNavigateStable), t = Lc(mo.UseNavigateStable), n = ve.useRef(!1);
  return Pc(() => {
    n.current = !0;
  }), ve.useCallback(function(i, a) {
    a === void 0 && (a = {}), process.env.NODE_ENV !== "production" && ci(n.current, jc), n.current && (typeof i == "number" ? e.navigate(i) : e.navigate(i, Ma({
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
function Ut() {
  return Ut = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ut.apply(this, arguments);
}
function yo(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
const jr = "get", Pr = "application/x-www-form-urlencoded";
function hi(e) {
  return e != null && typeof e.tagName == "string";
}
function ym(e) {
  return hi(e) && e.tagName.toLowerCase() === "button";
}
function bm(e) {
  return hi(e) && e.tagName.toLowerCase() === "form";
}
function xm(e) {
  return hi(e) && e.tagName.toLowerCase() === "input";
}
function wm(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Om(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !wm(e);
}
let yr = null;
function Em() {
  if (yr === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), yr = !1;
    } catch {
      yr = !0;
    }
  return yr;
}
const _m = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Yi(e) {
  return e != null && !_m.has(e) ? (process.env.NODE_ENV !== "production" && ci(!1, '"' + e + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + Pr + '"')), null) : e;
}
function Sm(e, t) {
  let n, r, i, a, o;
  if (bm(e)) {
    let l = e.getAttribute("action");
    r = l ? La(l, t) : null, n = e.getAttribute("method") || jr, i = Yi(e.getAttribute("enctype")) || Pr, a = new FormData(e);
  } else if (ym(e) || xm(e) && (e.type === "submit" || e.type === "image")) {
    let l = e.form;
    if (l == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let u = e.getAttribute("formaction") || l.getAttribute("action");
    if (r = u ? La(u, t) : null, n = e.getAttribute("formmethod") || l.getAttribute("method") || jr, i = Yi(e.getAttribute("formenctype")) || Yi(l.getAttribute("enctype")) || Pr, a = new FormData(l, e), !Em()) {
      let {
        name: f,
        type: h,
        value: c
      } = e;
      if (h === "image") {
        let s = f ? f + "." : "";
        a.append(s + "x", "0"), a.append(s + "y", "0");
      } else
        f && a.append(f, c);
    }
  } else {
    if (hi(e))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    n = jr, r = null, i = Pr, o = e;
  }
  return a && i === "text/plain" && (o = a, a = void 0), {
    action: r,
    method: n.toLowerCase(),
    encType: i,
    formData: a,
    body: o
  };
}
const Nm = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"], Am = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"], km = ["reloadDocument", "replace", "state", "method", "action", "onSubmit", "submit", "relative", "preventScrollReset"];
process.env.NODE_ENV;
const Tm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", jm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, bo = /* @__PURE__ */ ve.forwardRef(function(t, n) {
  let {
    onClick: r,
    relative: i,
    reloadDocument: a,
    replace: o,
    state: l,
    target: u,
    to: f,
    preventScrollReset: h
  } = t, c = yo(t, Nm), {
    basename: s
  } = ve.useContext(Pt), d, y = !1;
  if (typeof f == "string" && jm.test(f) && (d = f, Tm))
    try {
      let g = new URL(window.location.href), w = f.startsWith("//") ? new URL(g.protocol + f) : new URL(f), p = La(w.pathname, s);
      w.origin === g.origin && p != null ? f = p + w.search + w.hash : y = !0;
    } catch {
      process.env.NODE_ENV !== "production" && ci(!1, '<Link to="' + f + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let m = fm(f, {
    relative: i
  }), b = Mm(f, {
    replace: o,
    state: l,
    target: u,
    preventScrollReset: h,
    relative: i
  });
  function v(g) {
    r && r(g), g.defaultPrevented || b(g);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ ve.createElement("a", Ut({}, c, {
      href: d || m,
      onClick: y || a ? r : v,
      ref: n,
      target: u
    }))
  );
});
process.env.NODE_ENV !== "production" && (bo.displayName = "Link");
const Pm = /* @__PURE__ */ ve.forwardRef(function(t, n) {
  let {
    "aria-current": r = "page",
    caseSensitive: i = !1,
    className: a = "",
    end: o = !1,
    style: l,
    to: u,
    children: f
  } = t, h = yo(t, Am), c = di(u, {
    relative: h.relative
  }), s = Jn(), d = ve.useContext(Tc), {
    navigator: y
  } = ve.useContext(Pt), m = y.encodeLocation ? y.encodeLocation(c).pathname : c.pathname, b = s.pathname, v = d && d.navigation && d.navigation.location ? d.navigation.location.pathname : null;
  i || (b = b.toLowerCase(), v = v ? v.toLowerCase() : null, m = m.toLowerCase());
  let g = b === m || !o && b.startsWith(m) && b.charAt(m.length) === "/", w = v != null && (v === m || !o && v.startsWith(m) && v.charAt(m.length) === "/"), p = g ? r : void 0, x;
  typeof a == "function" ? x = a({
    isActive: g,
    isPending: w
  }) : x = [a, g ? "active" : null, w ? "pending" : null].filter(Boolean).join(" ");
  let _ = typeof l == "function" ? l({
    isActive: g,
    isPending: w
  }) : l;
  return /* @__PURE__ */ ve.createElement(bo, Ut({}, h, {
    "aria-current": p,
    className: x,
    ref: n,
    style: _,
    to: u
  }), typeof f == "function" ? f({
    isActive: g,
    isPending: w
  }) : f);
});
process.env.NODE_ENV !== "production" && (Pm.displayName = "NavLink");
const Cm = /* @__PURE__ */ ve.forwardRef((e, t) => {
  let n = Dm();
  return /* @__PURE__ */ ve.createElement(Mc, Ut({}, e, {
    submit: n,
    ref: t
  }));
});
process.env.NODE_ENV !== "production" && (Cm.displayName = "Form");
const Mc = /* @__PURE__ */ ve.forwardRef((e, t) => {
  let {
    reloadDocument: n,
    replace: r,
    state: i,
    method: a = jr,
    action: o,
    onSubmit: l,
    submit: u,
    relative: f,
    preventScrollReset: h
  } = e, c = yo(e, km), s = a.toLowerCase() === "get" ? "get" : "post", d = $m(o, {
    relative: f
  }), y = (m) => {
    if (l && l(m), m.defaultPrevented)
      return;
    m.preventDefault();
    let b = m.nativeEvent.submitter, v = (b == null ? void 0 : b.getAttribute("formmethod")) || a;
    u(b || m.currentTarget, {
      method: v,
      replace: r,
      state: i,
      relative: f,
      preventScrollReset: h
    });
  };
  return /* @__PURE__ */ ve.createElement("form", Ut({
    ref: t,
    method: s,
    action: d,
    onSubmit: n ? l : y
  }, c));
});
process.env.NODE_ENV !== "production" && (Mc.displayName = "FormImpl");
process.env.NODE_ENV;
var Ra;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher";
})(Ra || (Ra = {}));
var Nl;
(function(e) {
  e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(Nl || (Nl = {}));
function Im(e) {
  return e + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function Lm(e) {
  let t = ve.useContext(fi);
  return t || (process.env.NODE_ENV !== "production" ? Ye(!1, Im(e)) : Ye(!1)), t;
}
function Mm(e, t) {
  let {
    target: n,
    replace: r,
    state: i,
    preventScrollReset: a,
    relative: o
  } = t === void 0 ? {} : t, l = dm(), u = Jn(), f = di(e, {
    relative: o
  });
  return ve.useCallback((h) => {
    if (Om(h, n)) {
      h.preventDefault();
      let c = r !== void 0 ? r : Ia(u) === Ia(f);
      l(e, {
        replace: c,
        state: i,
        preventScrollReset: a,
        relative: o
      });
    }
  }, [u, l, f, r, i, n, e, a, o]);
}
function Rm() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
function Dm() {
  let {
    router: e
  } = Lm(Ra.UseSubmit), {
    basename: t
  } = ve.useContext(Pt), n = gm();
  return ve.useCallback(function(r, i) {
    i === void 0 && (i = {}), Rm();
    let {
      action: a,
      method: o,
      encType: l,
      formData: u,
      body: f
    } = Sm(r, t);
    e.navigate(i.action || a, {
      preventScrollReset: i.preventScrollReset,
      formData: u,
      body: f,
      formMethod: i.method || o,
      formEncType: i.encType || l,
      replace: i.replace,
      state: i.state,
      fromRouteId: n
    });
  }, [e, t, n]);
}
function $m(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    basename: r
  } = ve.useContext(Pt), i = ve.useContext(mn);
  i || (process.env.NODE_ENV !== "production" ? Ye(!1, "useFormAction must be used inside a RouteContext") : Ye(!1));
  let [a] = i.matches.slice(-1), o = Ut({}, di(e || ".", {
    relative: n
  })), l = Jn();
  if (e == null && (o.search = l.search, a.route.index)) {
    let u = new URLSearchParams(o.search);
    u.delete("index"), o.search = u.toString() ? "?" + u.toString() : "";
  }
  return (!e || e === ".") && a.route.index && (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"), r !== "/" && (o.pathname = o.pathname === "/" ? r : po([r, o.pathname])), Ia(o);
}
const Yw = ({
  children: e,
  onClose: t,
  showCloseModal: n,
  showModal: r,
  setShowModal: i,
  width: a = "full",
  height: o = "auto",
  paddingBottom: l = "8",
  paddingTop: u = "10",
  px: f = "8",
  fixedWidth: h,
  closeOnClickOutside: c = !1
}) => {
  const s = Ce(null), d = (y) => {
    const { current: m } = s;
    c && m && !m.contains(y.target) && (t && t(), i && i(!1));
  };
  return Le(() => (document.addEventListener("mousedown", d), () => {
    document.removeEventListener("mousedown", d);
  }), [c]), r ? Xr.createPortal(
    /* @__PURE__ */ L.jsx("div", { className: "h-full w-full | top-0 left-0 bottom-0 fixed z-50 | bg-gray-opacity | flex justify-center items-center", children: /* @__PURE__ */ L.jsx("div", { ref: s, className: `${h} relative`, children: /* @__PURE__ */ L.jsxs("div", { className: `max-h-screen rounded-2xl shadow-md px-${f} pb-${l} pt-${u} w-${a} h-${o} sm:m-0 bg-white`, children: [
      /* @__PURE__ */ L.jsx("div", { className: "relative top-4 right-4 | flex justify-end", children: n && /* @__PURE__ */ L.jsx(
        "button",
        {
          type: "button",
          onClick: t,
          className: "p-2 rounded-full  absolute -top-9 -right-8  border border-border-buttons-secondary",
          children: /* @__PURE__ */ L.jsx(co, { className: "block w-6 text-2xl text-text-buttons-secondary" })
        }
      ) }),
      e
    ] }) }) }),
    document.body
  ) : null;
}, Vw = ({
  title: e,
  titleColor: t = "blue-dark",
  text: n,
  textMargin: r = "4",
  textWidth: i = "medium",
  onClick: a,
  img: o = rm,
  bgColor: l = "white",
  textColor: u = "blue-dark",
  width: f = "96",
  widtMovile: h = "80",
  height: c = "96",
  heightMovile: s = "80",
  padding: d = "4",
  exit: y = !1,
  link: m = null,
  showIcon: b = !0,
  action: v = !1,
  actionText: g = ""
}) => {
  const w = () => {
  }, { t: p } = Ht();
  return /* @__PURE__ */ L.jsx("div", { className: "h-full w-full | top-0 left-0 absolute z-50 | bg-gray-opacity | flex justify-center items-center", children: /* @__PURE__ */ L.jsxs("div", { className: `bg-${l} rounded-lg shadow-md | w-${h} h-${s} sm:w-${f} sm:h-${c} p-${d}`, children: [
    /* @__PURE__ */ L.jsx("div", { className: "relative top-0 right-0 | flex justify-end | cursor-pointer", children: a && /* @__PURE__ */ L.jsx(
      "button",
      {
        type: "button",
        onClick: a,
        className: "shadow-hover hover:shadow-inner p-2 rounded-2xl bg-transparence-blue",
        children: /* @__PURE__ */ L.jsx("img", { src: nm, alt: "Close icon", className: "block w-4" })
      }
    ) }),
    /* @__PURE__ */ L.jsxs("div", { className: "w-full h-full p-8 | flex flex-col justify-center items-center", children: [
      b && /* @__PURE__ */ L.jsx("img", { src: o, alt: "Tic icon", className: "w-16" }),
      e && /* @__PURE__ */ L.jsx("h3", { className: `text-center text-lg font-medium mb-1 mt-6 text-${t}`, children: e }),
      /* @__PURE__ */ L.jsx("p", { className: `text-${u} text-center text-sm font-${i} mt-${r}`, children: n }),
      m && /* @__PURE__ */ L.jsxs("div", { className: "flex text-xs text-gray mt-4", children: [
        p("kiota_express_requirements"),
        " ",
        /* @__PURE__ */ L.jsx(bo, { to: m, className: "underline", children: p("here") })
      ] }),
      y && /* @__PURE__ */ L.jsx(
        El,
        {
          text: p("exit"),
          width: "auto",
          onClick: w,
          textColor: "blue-dark",
          shadow: "none"
        }
      ),
      v && /* @__PURE__ */ L.jsx(
        El,
        {
          text: g,
          width: "auto",
          onClick: () => v(),
          textColor: "blue-dark",
          shadow: "none"
        }
      )
    ] })
  ] }) });
}, Kw = ({
  onChange: e,
  checked: t,
  text: n,
  error: r,
  size: i = "md",
  textSize: a = "sm",
  tooltip: o = !1,
  disabled: l = !1
}) => {
  const [u, f] = Ge(""), [h, c] = Ge(""), [s, d] = Ge(t), y = Ce(!1), m = () => {
    l || d(!s);
  };
  return Le(() => {
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
  }, [i]), Le(() => {
    y.current ? e && e(s) : y.current = !0;
  }, [s]), Le(() => {
    t !== s && d(t);
  }, [t]), /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    /* @__PURE__ */ L.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ L.jsxs(
      "label",
      {
        className: `flex items-center ${!l && "cursor-pointer"}`,
        onClick: m,
        children: [
          /* @__PURE__ */ L.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ L.jsx(
              "div",
              {
                className: `${s ? "bg-main" : "bg-gray-light"} ${u} rounded-full shadow-inner`
              }
            ),
            /* @__PURE__ */ L.jsx(
              "div",
              {
                className: `${s ? "translate-x-[120%]" : ""} absolute ${h} bg-transparence-blue shadow-inner rounded-full shadow-switch left-2 top-1 transition`
              }
            )
          ] }),
          !o && /* @__PURE__ */ L.jsx("div", { className: `ml-3 text-${a}`, children: n }),
          o && /* @__PURE__ */ L.jsxs("div", { className: `ml-3 text-${a}`, "data-tip": o, children: [
            n,
            o && /* @__PURE__ */ L.jsx(lc, { className: "inline ml-1 w-4 h-4" })
          ] })
        ]
      }
    ) }),
    r && /* @__PURE__ */ L.jsx("div", { className: "text-red text-xs", children: r.message })
  ] });
};
function zm() {
  this.__data__ = [], this.size = 0;
}
var Fm = zm;
function Bm(e, t) {
  return e === t || e !== e && t !== t;
}
var Rc = Bm, qm = Rc;
function Um(e, t) {
  for (var n = e.length; n--; )
    if (qm(e[n][0], t))
      return n;
  return -1;
}
var pi = Um, Hm = pi, Wm = Array.prototype, Ym = Wm.splice;
function Vm(e) {
  var t = this.__data__, n = Hm(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Ym.call(t, n, 1), --this.size, !0;
}
var Km = Vm, Gm = pi;
function Zm(e) {
  var t = this.__data__, n = Gm(t, e);
  return n < 0 ? void 0 : t[n][1];
}
var Qm = Zm, Xm = pi;
function Jm(e) {
  return Xm(this.__data__, e) > -1;
}
var ey = Jm, ty = pi;
function ny(e, t) {
  var n = this.__data__, r = ty(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
var ry = ny, iy = Fm, ay = Km, oy = Qm, sy = ey, ly = ry;
function yn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
yn.prototype.clear = iy;
yn.prototype.delete = ay;
yn.prototype.get = oy;
yn.prototype.has = sy;
yn.prototype.set = ly;
var vi = yn, uy = vi;
function cy() {
  this.__data__ = new uy(), this.size = 0;
}
var fy = cy;
function dy(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
var hy = dy;
function py(e) {
  return this.__data__.get(e);
}
var vy = py;
function gy(e) {
  return this.__data__.has(e);
}
var my = gy, yy = typeof tt == "object" && tt && tt.Object === Object && tt, Dc = yy, by = Dc, xy = typeof self == "object" && self && self.Object === Object && self, wy = by || xy || Function("return this")(), Ot = wy, Oy = Ot, Ey = Oy.Symbol, xo = Ey, Al = xo, $c = Object.prototype, _y = $c.hasOwnProperty, Sy = $c.toString, Ln = Al ? Al.toStringTag : void 0;
function Ny(e) {
  var t = _y.call(e, Ln), n = e[Ln];
  try {
    e[Ln] = void 0;
    var r = !0;
  } catch {
  }
  var i = Sy.call(e);
  return r && (t ? e[Ln] = n : delete e[Ln]), i;
}
var Ay = Ny, ky = Object.prototype, Ty = ky.toString;
function jy(e) {
  return Ty.call(e);
}
var Py = jy, kl = xo, Cy = Ay, Iy = Py, Ly = "[object Null]", My = "[object Undefined]", Tl = kl ? kl.toStringTag : void 0;
function Ry(e) {
  return e == null ? e === void 0 ? My : Ly : Tl && Tl in Object(e) ? Cy(e) : Iy(e);
}
var gi = Ry;
function Dy(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var zc = Dy, $y = gi, zy = zc, Fy = "[object AsyncFunction]", By = "[object Function]", qy = "[object GeneratorFunction]", Uy = "[object Proxy]";
function Hy(e) {
  if (!zy(e))
    return !1;
  var t = $y(e);
  return t == By || t == qy || t == Fy || t == Uy;
}
var Fc = Hy, Wy = Ot, Yy = Wy["__core-js_shared__"], Vy = Yy, Vi = Vy, jl = function() {
  var e = /[^.]+$/.exec(Vi && Vi.keys && Vi.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Ky(e) {
  return !!jl && jl in e;
}
var Gy = Ky, Zy = Function.prototype, Qy = Zy.toString;
function Xy(e) {
  if (e != null) {
    try {
      return Qy.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Bc = Xy, Jy = Fc, e1 = Gy, t1 = zc, n1 = Bc, r1 = /[\\^$.*+?()[\]{}|]/g, i1 = /^\[object .+?Constructor\]$/, a1 = Function.prototype, o1 = Object.prototype, s1 = a1.toString, l1 = o1.hasOwnProperty, u1 = RegExp(
  "^" + s1.call(l1).replace(r1, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function c1(e) {
  if (!t1(e) || e1(e))
    return !1;
  var t = Jy(e) ? u1 : i1;
  return t.test(n1(e));
}
var f1 = c1;
function d1(e, t) {
  return e == null ? void 0 : e[t];
}
var h1 = d1, p1 = f1, v1 = h1;
function g1(e, t) {
  var n = v1(e, t);
  return p1(n) ? n : void 0;
}
var bn = g1, m1 = bn, y1 = Ot, b1 = m1(y1, "Map"), wo = b1, x1 = bn, w1 = x1(Object, "create"), mi = w1, Pl = mi;
function O1() {
  this.__data__ = Pl ? Pl(null) : {}, this.size = 0;
}
var E1 = O1;
function _1(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var S1 = _1, N1 = mi, A1 = "__lodash_hash_undefined__", k1 = Object.prototype, T1 = k1.hasOwnProperty;
function j1(e) {
  var t = this.__data__;
  if (N1) {
    var n = t[e];
    return n === A1 ? void 0 : n;
  }
  return T1.call(t, e) ? t[e] : void 0;
}
var P1 = j1, C1 = mi, I1 = Object.prototype, L1 = I1.hasOwnProperty;
function M1(e) {
  var t = this.__data__;
  return C1 ? t[e] !== void 0 : L1.call(t, e);
}
var R1 = M1, D1 = mi, $1 = "__lodash_hash_undefined__";
function z1(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = D1 && t === void 0 ? $1 : t, this;
}
var F1 = z1, B1 = E1, q1 = S1, U1 = P1, H1 = R1, W1 = F1;
function xn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
xn.prototype.clear = B1;
xn.prototype.delete = q1;
xn.prototype.get = U1;
xn.prototype.has = H1;
xn.prototype.set = W1;
var Y1 = xn, Cl = Y1, V1 = vi, K1 = wo;
function G1() {
  this.size = 0, this.__data__ = {
    hash: new Cl(),
    map: new (K1 || V1)(),
    string: new Cl()
  };
}
var Z1 = G1;
function Q1(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
var X1 = Q1, J1 = X1;
function e0(e, t) {
  var n = e.__data__;
  return J1(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
var yi = e0, t0 = yi;
function n0(e) {
  var t = t0(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
var r0 = n0, i0 = yi;
function a0(e) {
  return i0(this, e).get(e);
}
var o0 = a0, s0 = yi;
function l0(e) {
  return s0(this, e).has(e);
}
var u0 = l0, c0 = yi;
function f0(e, t) {
  var n = c0(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
var d0 = f0, h0 = Z1, p0 = r0, v0 = o0, g0 = u0, m0 = d0;
function wn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
wn.prototype.clear = h0;
wn.prototype.delete = p0;
wn.prototype.get = v0;
wn.prototype.has = g0;
wn.prototype.set = m0;
var qc = wn, y0 = vi, b0 = wo, x0 = qc, w0 = 200;
function O0(e, t) {
  var n = this.__data__;
  if (n instanceof y0) {
    var r = n.__data__;
    if (!b0 || r.length < w0 - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new x0(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
var E0 = O0, _0 = vi, S0 = fy, N0 = hy, A0 = vy, k0 = my, T0 = E0;
function On(e) {
  var t = this.__data__ = new _0(e);
  this.size = t.size;
}
On.prototype.clear = S0;
On.prototype.delete = N0;
On.prototype.get = A0;
On.prototype.has = k0;
On.prototype.set = T0;
var j0 = On, P0 = "__lodash_hash_undefined__";
function C0(e) {
  return this.__data__.set(e, P0), this;
}
var I0 = C0;
function L0(e) {
  return this.__data__.has(e);
}
var M0 = L0, R0 = qc, D0 = I0, $0 = M0;
function Kr(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new R0(); ++t < n; )
    this.add(e[t]);
}
Kr.prototype.add = Kr.prototype.push = D0;
Kr.prototype.has = $0;
var z0 = Kr;
function F0(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
var B0 = F0;
function q0(e, t) {
  return e.has(t);
}
var U0 = q0, H0 = z0, W0 = B0, Y0 = U0, V0 = 1, K0 = 2;
function G0(e, t, n, r, i, a) {
  var o = n & V0, l = e.length, u = t.length;
  if (l != u && !(o && u > l))
    return !1;
  var f = a.get(e), h = a.get(t);
  if (f && h)
    return f == t && h == e;
  var c = -1, s = !0, d = n & K0 ? new H0() : void 0;
  for (a.set(e, t), a.set(t, e); ++c < l; ) {
    var y = e[c], m = t[c];
    if (r)
      var b = o ? r(m, y, c, t, e, a) : r(y, m, c, e, t, a);
    if (b !== void 0) {
      if (b)
        continue;
      s = !1;
      break;
    }
    if (d) {
      if (!W0(t, function(v, g) {
        if (!Y0(d, g) && (y === v || i(y, v, n, r, a)))
          return d.push(g);
      })) {
        s = !1;
        break;
      }
    } else if (!(y === m || i(y, m, n, r, a))) {
      s = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), s;
}
var Uc = G0, Z0 = Ot, Q0 = Z0.Uint8Array, X0 = Q0;
function J0(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, i) {
    n[++t] = [i, r];
  }), n;
}
var eb = J0;
function tb(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var nb = tb, Il = xo, Ll = X0, rb = Rc, ib = Uc, ab = eb, ob = nb, sb = 1, lb = 2, ub = "[object Boolean]", cb = "[object Date]", fb = "[object Error]", db = "[object Map]", hb = "[object Number]", pb = "[object RegExp]", vb = "[object Set]", gb = "[object String]", mb = "[object Symbol]", yb = "[object ArrayBuffer]", bb = "[object DataView]", Ml = Il ? Il.prototype : void 0, Ki = Ml ? Ml.valueOf : void 0;
function xb(e, t, n, r, i, a, o) {
  switch (n) {
    case bb:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case yb:
      return !(e.byteLength != t.byteLength || !a(new Ll(e), new Ll(t)));
    case ub:
    case cb:
    case hb:
      return rb(+e, +t);
    case fb:
      return e.name == t.name && e.message == t.message;
    case pb:
    case gb:
      return e == t + "";
    case db:
      var l = ab;
    case vb:
      var u = r & sb;
      if (l || (l = ob), e.size != t.size && !u)
        return !1;
      var f = o.get(e);
      if (f)
        return f == t;
      r |= lb, o.set(e, t);
      var h = ib(l(e), l(t), r, i, a, o);
      return o.delete(e), h;
    case mb:
      if (Ki)
        return Ki.call(e) == Ki.call(t);
  }
  return !1;
}
var wb = xb;
function Ob(e, t) {
  for (var n = -1, r = t.length, i = e.length; ++n < r; )
    e[i + n] = t[n];
  return e;
}
var Eb = Ob, _b = Array.isArray, Oo = _b, Sb = Eb, Nb = Oo;
function Ab(e, t, n) {
  var r = t(e);
  return Nb(e) ? r : Sb(r, n(e));
}
var kb = Ab;
function Tb(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, i = 0, a = []; ++n < r; ) {
    var o = e[n];
    t(o, n, e) && (a[i++] = o);
  }
  return a;
}
var jb = Tb;
function Pb() {
  return [];
}
var Cb = Pb, Ib = jb, Lb = Cb, Mb = Object.prototype, Rb = Mb.propertyIsEnumerable, Rl = Object.getOwnPropertySymbols, Db = Rl ? function(e) {
  return e == null ? [] : (e = Object(e), Ib(Rl(e), function(t) {
    return Rb.call(e, t);
  }));
} : Lb, $b = Db;
function zb(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Fb = zb;
function Bb(e) {
  return e != null && typeof e == "object";
}
var bi = Bb, qb = gi, Ub = bi, Hb = "[object Arguments]";
function Wb(e) {
  return Ub(e) && qb(e) == Hb;
}
var Yb = Wb, Dl = Yb, Vb = bi, Hc = Object.prototype, Kb = Hc.hasOwnProperty, Gb = Hc.propertyIsEnumerable, Zb = Dl(function() {
  return arguments;
}()) ? Dl : function(e) {
  return Vb(e) && Kb.call(e, "callee") && !Gb.call(e, "callee");
}, Qb = Zb, Gr = { exports: {} };
function Xb() {
  return !1;
}
var Jb = Xb;
Gr.exports;
(function(e, t) {
  var n = Ot, r = Jb, i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, l = o ? n.Buffer : void 0, u = l ? l.isBuffer : void 0, f = u || r;
  e.exports = f;
})(Gr, Gr.exports);
var Wc = Gr.exports, e2 = 9007199254740991, t2 = /^(?:0|[1-9]\d*)$/;
function n2(e, t) {
  var n = typeof e;
  return t = t ?? e2, !!t && (n == "number" || n != "symbol" && t2.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var r2 = n2, i2 = 9007199254740991;
function a2(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= i2;
}
var Yc = a2, o2 = gi, s2 = Yc, l2 = bi, u2 = "[object Arguments]", c2 = "[object Array]", f2 = "[object Boolean]", d2 = "[object Date]", h2 = "[object Error]", p2 = "[object Function]", v2 = "[object Map]", g2 = "[object Number]", m2 = "[object Object]", y2 = "[object RegExp]", b2 = "[object Set]", x2 = "[object String]", w2 = "[object WeakMap]", O2 = "[object ArrayBuffer]", E2 = "[object DataView]", _2 = "[object Float32Array]", S2 = "[object Float64Array]", N2 = "[object Int8Array]", A2 = "[object Int16Array]", k2 = "[object Int32Array]", T2 = "[object Uint8Array]", j2 = "[object Uint8ClampedArray]", P2 = "[object Uint16Array]", C2 = "[object Uint32Array]", je = {};
je[_2] = je[S2] = je[N2] = je[A2] = je[k2] = je[T2] = je[j2] = je[P2] = je[C2] = !0;
je[u2] = je[c2] = je[O2] = je[f2] = je[E2] = je[d2] = je[h2] = je[p2] = je[v2] = je[g2] = je[m2] = je[y2] = je[b2] = je[x2] = je[w2] = !1;
function I2(e) {
  return l2(e) && s2(e.length) && !!je[o2(e)];
}
var L2 = I2;
function M2(e) {
  return function(t) {
    return e(t);
  };
}
var R2 = M2, Zr = { exports: {} };
Zr.exports;
(function(e, t) {
  var n = Dc, r = t && !t.nodeType && t, i = r && !0 && e && !e.nodeType && e, a = i && i.exports === r, o = a && n.process, l = function() {
    try {
      var u = i && i.require && i.require("util").types;
      return u || o && o.binding && o.binding("util");
    } catch {
    }
  }();
  e.exports = l;
})(Zr, Zr.exports);
var D2 = Zr.exports, $2 = L2, z2 = R2, $l = D2, zl = $l && $l.isTypedArray, F2 = zl ? z2(zl) : $2, Vc = F2, B2 = Fb, q2 = Qb, U2 = Oo, H2 = Wc, W2 = r2, Y2 = Vc, V2 = Object.prototype, K2 = V2.hasOwnProperty;
function G2(e, t) {
  var n = U2(e), r = !n && q2(e), i = !n && !r && H2(e), a = !n && !r && !i && Y2(e), o = n || r || i || a, l = o ? B2(e.length, String) : [], u = l.length;
  for (var f in e)
    (t || K2.call(e, f)) && !(o && // Safari 9 has enumerable `arguments.length` in strict mode.
    (f == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    i && (f == "offset" || f == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    a && (f == "buffer" || f == "byteLength" || f == "byteOffset") || // Skip index properties.
    W2(f, u))) && l.push(f);
  return l;
}
var Z2 = G2, Q2 = Object.prototype;
function X2(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || Q2;
  return e === n;
}
var J2 = X2;
function ex(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var tx = ex, nx = tx, rx = nx(Object.keys, Object), ix = rx, ax = J2, ox = ix, sx = Object.prototype, lx = sx.hasOwnProperty;
function ux(e) {
  if (!ax(e))
    return ox(e);
  var t = [];
  for (var n in Object(e))
    lx.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
var cx = ux, fx = Fc, dx = Yc;
function hx(e) {
  return e != null && dx(e.length) && !fx(e);
}
var px = hx, vx = Z2, gx = cx, mx = px;
function yx(e) {
  return mx(e) ? vx(e) : gx(e);
}
var bx = yx, xx = kb, wx = $b, Ox = bx;
function Ex(e) {
  return xx(e, Ox, wx);
}
var _x = Ex, Fl = _x, Sx = 1, Nx = Object.prototype, Ax = Nx.hasOwnProperty;
function kx(e, t, n, r, i, a) {
  var o = n & Sx, l = Fl(e), u = l.length, f = Fl(t), h = f.length;
  if (u != h && !o)
    return !1;
  for (var c = u; c--; ) {
    var s = l[c];
    if (!(o ? s in t : Ax.call(t, s)))
      return !1;
  }
  var d = a.get(e), y = a.get(t);
  if (d && y)
    return d == t && y == e;
  var m = !0;
  a.set(e, t), a.set(t, e);
  for (var b = o; ++c < u; ) {
    s = l[c];
    var v = e[s], g = t[s];
    if (r)
      var w = o ? r(g, v, s, t, e, a) : r(v, g, s, e, t, a);
    if (!(w === void 0 ? v === g || i(v, g, n, r, a) : w)) {
      m = !1;
      break;
    }
    b || (b = s == "constructor");
  }
  if (m && !b) {
    var p = e.constructor, x = t.constructor;
    p != x && "constructor" in e && "constructor" in t && !(typeof p == "function" && p instanceof p && typeof x == "function" && x instanceof x) && (m = !1);
  }
  return a.delete(e), a.delete(t), m;
}
var Tx = kx, jx = bn, Px = Ot, Cx = jx(Px, "DataView"), Ix = Cx, Lx = bn, Mx = Ot, Rx = Lx(Mx, "Promise"), Dx = Rx, $x = bn, zx = Ot, Fx = $x(zx, "Set"), Bx = Fx, qx = bn, Ux = Ot, Hx = qx(Ux, "WeakMap"), Wx = Hx, Da = Ix, $a = wo, za = Dx, Fa = Bx, Ba = Wx, Kc = gi, En = Bc, Bl = "[object Map]", Yx = "[object Object]", ql = "[object Promise]", Ul = "[object Set]", Hl = "[object WeakMap]", Wl = "[object DataView]", Vx = En(Da), Kx = En($a), Gx = En(za), Zx = En(Fa), Qx = En(Ba), Ct = Kc;
(Da && Ct(new Da(new ArrayBuffer(1))) != Wl || $a && Ct(new $a()) != Bl || za && Ct(za.resolve()) != ql || Fa && Ct(new Fa()) != Ul || Ba && Ct(new Ba()) != Hl) && (Ct = function(e) {
  var t = Kc(e), n = t == Yx ? e.constructor : void 0, r = n ? En(n) : "";
  if (r)
    switch (r) {
      case Vx:
        return Wl;
      case Kx:
        return Bl;
      case Gx:
        return ql;
      case Zx:
        return Ul;
      case Qx:
        return Hl;
    }
  return t;
});
var Xx = Ct, Gi = j0, Jx = Uc, ew = wb, tw = Tx, Yl = Xx, Vl = Oo, Kl = Wc, nw = Vc, rw = 1, Gl = "[object Arguments]", Zl = "[object Array]", br = "[object Object]", iw = Object.prototype, Ql = iw.hasOwnProperty;
function aw(e, t, n, r, i, a) {
  var o = Vl(e), l = Vl(t), u = o ? Zl : Yl(e), f = l ? Zl : Yl(t);
  u = u == Gl ? br : u, f = f == Gl ? br : f;
  var h = u == br, c = f == br, s = u == f;
  if (s && Kl(e)) {
    if (!Kl(t))
      return !1;
    o = !0, h = !1;
  }
  if (s && !h)
    return a || (a = new Gi()), o || nw(e) ? Jx(e, t, n, r, i, a) : ew(e, t, u, n, r, i, a);
  if (!(n & rw)) {
    var d = h && Ql.call(e, "__wrapped__"), y = c && Ql.call(t, "__wrapped__");
    if (d || y) {
      var m = d ? e.value() : e, b = y ? t.value() : t;
      return a || (a = new Gi()), i(m, b, n, r, a);
    }
  }
  return s ? (a || (a = new Gi()), tw(e, t, n, r, i, a)) : !1;
}
var ow = aw, sw = ow, Xl = bi;
function Gc(e, t, n, r, i) {
  return e === t ? !0 : e == null || t == null || !Xl(e) && !Xl(t) ? e !== e && t !== t : sw(e, t, n, r, Gc, i);
}
var lw = Gc, uw = lw;
function cw(e, t) {
  return uw(e, t);
}
var fw = cw, Zc = { exports: {} };
/*!
 * Quill Editor v1.3.7
 * https://quilljs.com/
 * Copyright (c) 2014, Jason Chen
 * Copyright (c) 2013, salesforce.com
 */
(function(e, t) {
  (function(r, i) {
    e.exports = i();
  })(typeof self < "u" ? self : tt, function() {
    return (
      /******/
      function(n) {
        var r = {};
        function i(a) {
          if (r[a])
            return r[a].exports;
          var o = r[a] = {
            /******/
            i: a,
            /******/
            l: !1,
            /******/
            exports: {}
            /******/
          };
          return n[a].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
        }
        return i.m = n, i.c = r, i.d = function(a, o, l) {
          i.o(a, o) || Object.defineProperty(a, o, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: l
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
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var a = i(17), o = i(18), l = i(19), u = i(45), f = i(46), h = i(47), c = i(48), s = i(49), d = i(12), y = i(32), m = i(33), b = i(31), v = i(1), g = {
            Scope: v.Scope,
            create: v.create,
            find: v.find,
            query: v.query,
            register: v.register,
            Container: a.default,
            Format: o.default,
            Leaf: l.default,
            Embed: c.default,
            Scroll: u.default,
            Block: h.default,
            Inline: f.default,
            Text: s.default,
            Attributor: {
              Attribute: d.default,
              Class: y.default,
              Style: m.default,
              Store: b.default
            }
          };
          r.default = g;
        },
        /* 1 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var b = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(v, g) {
              v.__proto__ = g;
            } || function(v, g) {
              for (var w in g)
                g.hasOwnProperty(w) && (v[w] = g[w]);
            };
            return function(v, g) {
              b(v, g);
              function w() {
                this.constructor = v;
              }
              v.prototype = g === null ? Object.create(g) : (w.prototype = g.prototype, new w());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = (
            /** @class */
            function(b) {
              a(v, b);
              function v(g) {
                var w = this;
                return g = "[Parchment] " + g, w = b.call(this, g) || this, w.message = g, w.name = w.constructor.name, w;
              }
              return v;
            }(Error)
          );
          r.ParchmentError = o;
          var l = {}, u = {}, f = {}, h = {};
          r.DATA_KEY = "__blot";
          var c;
          (function(b) {
            b[b.TYPE = 3] = "TYPE", b[b.LEVEL = 12] = "LEVEL", b[b.ATTRIBUTE = 13] = "ATTRIBUTE", b[b.BLOT = 14] = "BLOT", b[b.INLINE = 7] = "INLINE", b[b.BLOCK = 11] = "BLOCK", b[b.BLOCK_BLOT = 10] = "BLOCK_BLOT", b[b.INLINE_BLOT = 6] = "INLINE_BLOT", b[b.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE", b[b.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE", b[b.ANY = 15] = "ANY";
          })(c = r.Scope || (r.Scope = {}));
          function s(b, v) {
            var g = y(b);
            if (g == null)
              throw new o("Unable to create " + b + " blot");
            var w = g, p = (
              // @ts-ignore
              b instanceof Node || b.nodeType === Node.TEXT_NODE ? b : w.create(v)
            );
            return new w(p, v);
          }
          r.create = s;
          function d(b, v) {
            return v === void 0 && (v = !1), b == null ? null : b[r.DATA_KEY] != null ? b[r.DATA_KEY].blot : v ? d(b.parentNode, v) : null;
          }
          r.find = d;
          function y(b, v) {
            v === void 0 && (v = c.ANY);
            var g;
            if (typeof b == "string")
              g = h[b] || l[b];
            else if (b instanceof Text || b.nodeType === Node.TEXT_NODE)
              g = h.text;
            else if (typeof b == "number")
              b & c.LEVEL & c.BLOCK ? g = h.block : b & c.LEVEL & c.INLINE && (g = h.inline);
            else if (b instanceof HTMLElement) {
              var w = (b.getAttribute("class") || "").split(/\s+/);
              for (var p in w)
                if (g = u[w[p]], g)
                  break;
              g = g || f[b.tagName];
            }
            return g == null ? null : v & c.LEVEL & g.scope && v & c.TYPE & g.scope ? g : null;
          }
          r.query = y;
          function m() {
            for (var b = [], v = 0; v < arguments.length; v++)
              b[v] = arguments[v];
            if (b.length > 1)
              return b.map(function(p) {
                return m(p);
              });
            var g = b[0];
            if (typeof g.blotName != "string" && typeof g.attrName != "string")
              throw new o("Invalid definition");
            if (g.blotName === "abstract")
              throw new o("Cannot register abstract class");
            if (h[g.blotName || g.attrName] = g, typeof g.keyName == "string")
              l[g.keyName] = g;
            else if (g.className != null && (u[g.className] = g), g.tagName != null) {
              Array.isArray(g.tagName) ? g.tagName = g.tagName.map(function(p) {
                return p.toUpperCase();
              }) : g.tagName = g.tagName.toUpperCase();
              var w = Array.isArray(g.tagName) ? g.tagName : [g.tagName];
              w.forEach(function(p) {
                (f[p] == null || g.className == null) && (f[p] = g);
              });
            }
            return g;
          }
          r.register = m;
        },
        /* 2 */
        /***/
        function(n, r, i) {
          var a = i(51), o = i(11), l = i(3), u = i(20), f = String.fromCharCode(0), h = function(c) {
            Array.isArray(c) ? this.ops = c : c != null && Array.isArray(c.ops) ? this.ops = c.ops : this.ops = [];
          };
          h.prototype.insert = function(c, s) {
            var d = {};
            return c.length === 0 ? this : (d.insert = c, s != null && typeof s == "object" && Object.keys(s).length > 0 && (d.attributes = s), this.push(d));
          }, h.prototype.delete = function(c) {
            return c <= 0 ? this : this.push({ delete: c });
          }, h.prototype.retain = function(c, s) {
            if (c <= 0)
              return this;
            var d = { retain: c };
            return s != null && typeof s == "object" && Object.keys(s).length > 0 && (d.attributes = s), this.push(d);
          }, h.prototype.push = function(c) {
            var s = this.ops.length, d = this.ops[s - 1];
            if (c = l(!0, {}, c), typeof d == "object") {
              if (typeof c.delete == "number" && typeof d.delete == "number")
                return this.ops[s - 1] = { delete: d.delete + c.delete }, this;
              if (typeof d.delete == "number" && c.insert != null && (s -= 1, d = this.ops[s - 1], typeof d != "object"))
                return this.ops.unshift(c), this;
              if (o(c.attributes, d.attributes)) {
                if (typeof c.insert == "string" && typeof d.insert == "string")
                  return this.ops[s - 1] = { insert: d.insert + c.insert }, typeof c.attributes == "object" && (this.ops[s - 1].attributes = c.attributes), this;
                if (typeof c.retain == "number" && typeof d.retain == "number")
                  return this.ops[s - 1] = { retain: d.retain + c.retain }, typeof c.attributes == "object" && (this.ops[s - 1].attributes = c.attributes), this;
              }
            }
            return s === this.ops.length ? this.ops.push(c) : this.ops.splice(s, 0, c), this;
          }, h.prototype.chop = function() {
            var c = this.ops[this.ops.length - 1];
            return c && c.retain && !c.attributes && this.ops.pop(), this;
          }, h.prototype.filter = function(c) {
            return this.ops.filter(c);
          }, h.prototype.forEach = function(c) {
            this.ops.forEach(c);
          }, h.prototype.map = function(c) {
            return this.ops.map(c);
          }, h.prototype.partition = function(c) {
            var s = [], d = [];
            return this.forEach(function(y) {
              var m = c(y) ? s : d;
              m.push(y);
            }), [s, d];
          }, h.prototype.reduce = function(c, s) {
            return this.ops.reduce(c, s);
          }, h.prototype.changeLength = function() {
            return this.reduce(function(c, s) {
              return s.insert ? c + u.length(s) : s.delete ? c - s.delete : c;
            }, 0);
          }, h.prototype.length = function() {
            return this.reduce(function(c, s) {
              return c + u.length(s);
            }, 0);
          }, h.prototype.slice = function(c, s) {
            c = c || 0, typeof s != "number" && (s = 1 / 0);
            for (var d = [], y = u.iterator(this.ops), m = 0; m < s && y.hasNext(); ) {
              var b;
              m < c ? b = y.next(c - m) : (b = y.next(s - m), d.push(b)), m += u.length(b);
            }
            return new h(d);
          }, h.prototype.compose = function(c) {
            var s = u.iterator(this.ops), d = u.iterator(c.ops), y = [], m = d.peek();
            if (m != null && typeof m.retain == "number" && m.attributes == null) {
              for (var b = m.retain; s.peekType() === "insert" && s.peekLength() <= b; )
                b -= s.peekLength(), y.push(s.next());
              m.retain - b > 0 && d.next(m.retain - b);
            }
            for (var v = new h(y); s.hasNext() || d.hasNext(); )
              if (d.peekType() === "insert")
                v.push(d.next());
              else if (s.peekType() === "delete")
                v.push(s.next());
              else {
                var g = Math.min(s.peekLength(), d.peekLength()), w = s.next(g), p = d.next(g);
                if (typeof p.retain == "number") {
                  var x = {};
                  typeof w.retain == "number" ? x.retain = g : x.insert = w.insert;
                  var _ = u.attributes.compose(w.attributes, p.attributes, typeof w.retain == "number");
                  if (_ && (x.attributes = _), v.push(x), !d.hasNext() && o(v.ops[v.ops.length - 1], x)) {
                    var E = new h(s.rest());
                    return v.concat(E).chop();
                  }
                } else
                  typeof p.delete == "number" && typeof w.retain == "number" && v.push(p);
              }
            return v.chop();
          }, h.prototype.concat = function(c) {
            var s = new h(this.ops.slice());
            return c.ops.length > 0 && (s.push(c.ops[0]), s.ops = s.ops.concat(c.ops.slice(1))), s;
          }, h.prototype.diff = function(c, s) {
            if (this.ops === c.ops)
              return new h();
            var d = [this, c].map(function(g) {
              return g.map(function(w) {
                if (w.insert != null)
                  return typeof w.insert == "string" ? w.insert : f;
                var p = g === c ? "on" : "with";
                throw new Error("diff() called " + p + " non-document");
              }).join("");
            }), y = new h(), m = a(d[0], d[1], s), b = u.iterator(this.ops), v = u.iterator(c.ops);
            return m.forEach(function(g) {
              for (var w = g[1].length; w > 0; ) {
                var p = 0;
                switch (g[0]) {
                  case a.INSERT:
                    p = Math.min(v.peekLength(), w), y.push(v.next(p));
                    break;
                  case a.DELETE:
                    p = Math.min(w, b.peekLength()), b.next(p), y.delete(p);
                    break;
                  case a.EQUAL:
                    p = Math.min(b.peekLength(), v.peekLength(), w);
                    var x = b.next(p), _ = v.next(p);
                    o(x.insert, _.insert) ? y.retain(p, u.attributes.diff(x.attributes, _.attributes)) : y.push(_).delete(p);
                    break;
                }
                w -= p;
              }
            }), y.chop();
          }, h.prototype.eachLine = function(c, s) {
            s = s || `
`;
            for (var d = u.iterator(this.ops), y = new h(), m = 0; d.hasNext(); ) {
              if (d.peekType() !== "insert")
                return;
              var b = d.peek(), v = u.length(b) - d.peekLength(), g = typeof b.insert == "string" ? b.insert.indexOf(s, v) - v : -1;
              if (g < 0)
                y.push(d.next());
              else if (g > 0)
                y.push(d.next(g));
              else {
                if (c(y, d.next(1).attributes || {}, m) === !1)
                  return;
                m += 1, y = new h();
              }
            }
            y.length() > 0 && c(y, {}, m);
          }, h.prototype.transform = function(c, s) {
            if (s = !!s, typeof c == "number")
              return this.transformPosition(c, s);
            for (var d = u.iterator(this.ops), y = u.iterator(c.ops), m = new h(); d.hasNext() || y.hasNext(); )
              if (d.peekType() === "insert" && (s || y.peekType() !== "insert"))
                m.retain(u.length(d.next()));
              else if (y.peekType() === "insert")
                m.push(y.next());
              else {
                var b = Math.min(d.peekLength(), y.peekLength()), v = d.next(b), g = y.next(b);
                if (v.delete)
                  continue;
                g.delete ? m.push(g) : m.retain(b, u.attributes.transform(v.attributes, g.attributes, s));
              }
            return m.chop();
          }, h.prototype.transformPosition = function(c, s) {
            s = !!s;
            for (var d = u.iterator(this.ops), y = 0; d.hasNext() && y <= c; ) {
              var m = d.peekLength(), b = d.peekType();
              if (d.next(), b === "delete") {
                c -= Math.min(m, c - y);
                continue;
              } else
                b === "insert" && (y < c || !s) && (c += m);
              y += m;
            }
            return c;
          }, n.exports = h;
        },
        /* 3 */
        /***/
        function(n, r) {
          var i = Object.prototype.hasOwnProperty, a = Object.prototype.toString, o = Object.defineProperty, l = Object.getOwnPropertyDescriptor, u = function(d) {
            return typeof Array.isArray == "function" ? Array.isArray(d) : a.call(d) === "[object Array]";
          }, f = function(d) {
            if (!d || a.call(d) !== "[object Object]")
              return !1;
            var y = i.call(d, "constructor"), m = d.constructor && d.constructor.prototype && i.call(d.constructor.prototype, "isPrototypeOf");
            if (d.constructor && !y && !m)
              return !1;
            var b;
            for (b in d)
              ;
            return typeof b > "u" || i.call(d, b);
          }, h = function(d, y) {
            o && y.name === "__proto__" ? o(d, y.name, {
              enumerable: !0,
              configurable: !0,
              value: y.newValue,
              writable: !0
            }) : d[y.name] = y.newValue;
          }, c = function(d, y) {
            if (y === "__proto__")
              if (i.call(d, y)) {
                if (l)
                  return l(d, y).value;
              } else
                return;
            return d[y];
          };
          n.exports = function s() {
            var d, y, m, b, v, g, w = arguments[0], p = 1, x = arguments.length, _ = !1;
            for (typeof w == "boolean" && (_ = w, w = arguments[1] || {}, p = 2), (w == null || typeof w != "object" && typeof w != "function") && (w = {}); p < x; ++p)
              if (d = arguments[p], d != null)
                for (y in d)
                  m = c(w, y), b = c(d, y), w !== b && (_ && b && (f(b) || (v = u(b))) ? (v ? (v = !1, g = m && u(m) ? m : []) : g = m && f(m) ? m : {}, h(w, { name: y, newValue: s(_, g, b) })) : typeof b < "u" && h(w, { name: y, newValue: b }));
            return w;
          };
        },
        /* 4 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.BlockEmbed = r.bubbleFormats = void 0;
          var a = function() {
            function O(N, T) {
              for (var C = 0; C < T.length; C++) {
                var D = T[C];
                D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(N, D.key, D);
              }
            }
            return function(N, T, C) {
              return T && O(N.prototype, T), C && O(N, C), N;
            };
          }(), o = function O(N, T, C) {
            N === null && (N = Function.prototype);
            var D = Object.getOwnPropertyDescriptor(N, T);
            if (D === void 0) {
              var H = Object.getPrototypeOf(N);
              return H === null ? void 0 : O(H, T, C);
            } else {
              if ("value" in D)
                return D.value;
              var U = D.get;
              return U === void 0 ? void 0 : U.call(C);
            }
          }, l = i(3), u = w(l), f = i(2), h = w(f), c = i(0), s = w(c), d = i(16), y = w(d), m = i(6), b = w(m), v = i(7), g = w(v);
          function w(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function p(O, N) {
            if (!(O instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function x(O, N) {
            if (!O)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return N && (typeof N == "object" || typeof N == "function") ? N : O;
          }
          function _(O, N) {
            if (typeof N != "function" && N !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof N);
            O.prototype = Object.create(N && N.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(O, N) : O.__proto__ = N);
          }
          var E = 1, k = function(O) {
            _(N, O);
            function N() {
              return p(this, N), x(this, (N.__proto__ || Object.getPrototypeOf(N)).apply(this, arguments));
            }
            return a(N, [{
              key: "attach",
              value: function() {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "attach", this).call(this), this.attributes = new s.default.Attributor.Store(this.domNode);
              }
            }, {
              key: "delta",
              value: function() {
                return new h.default().insert(this.value(), (0, u.default)(this.formats(), this.attributes.values()));
              }
            }, {
              key: "format",
              value: function(C, D) {
                var H = s.default.query(C, s.default.Scope.BLOCK_ATTRIBUTE);
                H != null && this.attributes.attribute(H, D);
              }
            }, {
              key: "formatAt",
              value: function(C, D, H, U) {
                this.format(H, U);
              }
            }, {
              key: "insertAt",
              value: function(C, D, H) {
                if (typeof D == "string" && D.endsWith(`
`)) {
                  var U = s.default.create(j.blotName);
                  this.parent.insertBefore(U, C === 0 ? this : this.next), U.insertAt(0, D.slice(0, -1));
                } else
                  o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertAt", this).call(this, C, D, H);
              }
            }]), N;
          }(s.default.Embed);
          k.scope = s.default.Scope.BLOCK_BLOT;
          var j = function(O) {
            _(N, O);
            function N(T) {
              p(this, N);
              var C = x(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this, T));
              return C.cache = {}, C;
            }
            return a(N, [{
              key: "delta",
              value: function() {
                return this.cache.delta == null && (this.cache.delta = this.descendants(s.default.Leaf).reduce(function(C, D) {
                  return D.length() === 0 ? C : C.insert(D.value(), S(D));
                }, new h.default()).insert(`
`, S(this))), this.cache.delta;
              }
            }, {
              key: "deleteAt",
              value: function(C, D) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "deleteAt", this).call(this, C, D), this.cache = {};
              }
            }, {
              key: "formatAt",
              value: function(C, D, H, U) {
                D <= 0 || (s.default.query(H, s.default.Scope.BLOCK) ? C + D === this.length() && this.format(H, U) : o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "formatAt", this).call(this, C, Math.min(D, this.length() - C - 1), H, U), this.cache = {});
              }
            }, {
              key: "insertAt",
              value: function(C, D, H) {
                if (H != null)
                  return o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertAt", this).call(this, C, D, H);
                if (D.length !== 0) {
                  var U = D.split(`
`), K = U.shift();
                  K.length > 0 && (C < this.length() - 1 || this.children.tail == null ? o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertAt", this).call(this, Math.min(C, this.length() - 1), K) : this.children.tail.insertAt(this.children.tail.length(), K), this.cache = {});
                  var q = this;
                  U.reduce(function(P, A) {
                    return q = q.split(P, !0), q.insertAt(0, A), A.length;
                  }, C + K.length);
                }
              }
            }, {
              key: "insertBefore",
              value: function(C, D) {
                var H = this.children.head;
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "insertBefore", this).call(this, C, D), H instanceof y.default && H.remove(), this.cache = {};
              }
            }, {
              key: "length",
              value: function() {
                return this.cache.length == null && (this.cache.length = o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "length", this).call(this) + E), this.cache.length;
              }
            }, {
              key: "moveChildren",
              value: function(C, D) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "moveChildren", this).call(this, C, D), this.cache = {};
              }
            }, {
              key: "optimize",
              value: function(C) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "optimize", this).call(this, C), this.cache = {};
              }
            }, {
              key: "path",
              value: function(C) {
                return o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "path", this).call(this, C, !0);
              }
            }, {
              key: "removeChild",
              value: function(C) {
                o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "removeChild", this).call(this, C), this.cache = {};
              }
            }, {
              key: "split",
              value: function(C) {
                var D = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
                if (D && (C === 0 || C >= this.length() - E)) {
                  var H = this.clone();
                  return C === 0 ? (this.parent.insertBefore(H, this), this) : (this.parent.insertBefore(H, this.next), H);
                } else {
                  var U = o(N.prototype.__proto__ || Object.getPrototypeOf(N.prototype), "split", this).call(this, C, D);
                  return this.cache = {}, U;
                }
              }
            }]), N;
          }(s.default.Block);
          j.blotName = "block", j.tagName = "P", j.defaultChild = "break", j.allowedChildren = [b.default, s.default.Embed, g.default];
          function S(O) {
            var N = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            return O == null || (typeof O.formats == "function" && (N = (0, u.default)(N, O.formats())), O.parent == null || O.parent.blotName == "scroll" || O.parent.statics.scope !== O.statics.scope) ? N : S(O.parent, N);
          }
          r.bubbleFormats = S, r.BlockEmbed = k, r.default = j;
        },
        /* 5 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.overload = r.expandConfig = void 0;
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(q) {
            return typeof q;
          } : function(q) {
            return q && typeof Symbol == "function" && q.constructor === Symbol && q !== Symbol.prototype ? "symbol" : typeof q;
          }, o = function() {
            function q(P, A) {
              var M = [], R = !0, z = !1, B = void 0;
              try {
                for (var I = P[Symbol.iterator](), $; !(R = ($ = I.next()).done) && (M.push($.value), !(A && M.length === A)); R = !0)
                  ;
              } catch (W) {
                z = !0, B = W;
              } finally {
                try {
                  !R && I.return && I.return();
                } finally {
                  if (z)
                    throw B;
                }
              }
              return M;
            }
            return function(P, A) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return q(P, A);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), l = function() {
            function q(P, A) {
              for (var M = 0; M < A.length; M++) {
                var R = A[M];
                R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(P, R.key, R);
              }
            }
            return function(P, A, M) {
              return A && q(P.prototype, A), M && q(P, M), P;
            };
          }();
          i(50);
          var u = i(2), f = S(u), h = i(14), c = S(h), s = i(8), d = S(s), y = i(9), m = S(y), b = i(0), v = S(b), g = i(15), w = S(g), p = i(3), x = S(p), _ = i(10), E = S(_), k = i(34), j = S(k);
          function S(q) {
            return q && q.__esModule ? q : { default: q };
          }
          function O(q, P, A) {
            return P in q ? Object.defineProperty(q, P, { value: A, enumerable: !0, configurable: !0, writable: !0 }) : q[P] = A, q;
          }
          function N(q, P) {
            if (!(q instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          var T = (0, E.default)("quill"), C = function() {
            l(q, null, [{
              key: "debug",
              value: function(A) {
                A === !0 && (A = "log"), E.default.level(A);
              }
            }, {
              key: "find",
              value: function(A) {
                return A.__quill || v.default.find(A);
              }
            }, {
              key: "import",
              value: function(A) {
                return this.imports[A] == null && T.error("Cannot import " + A + ". Are you sure it was registered?"), this.imports[A];
              }
            }, {
              key: "register",
              value: function(A, M) {
                var R = this, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
                if (typeof A != "string") {
                  var B = A.attrName || A.blotName;
                  typeof B == "string" ? this.register("formats/" + B, A, M) : Object.keys(A).forEach(function(I) {
                    R.register(I, A[I], M);
                  });
                } else
                  this.imports[A] != null && !z && T.warn("Overwriting " + A + " with", M), this.imports[A] = M, (A.startsWith("blots/") || A.startsWith("formats/")) && M.blotName !== "abstract" ? v.default.register(M) : A.startsWith("modules") && typeof M.register == "function" && M.register();
              }
            }]);
            function q(P) {
              var A = this, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
              if (N(this, q), this.options = D(P, M), this.container = this.options.container, this.container == null)
                return T.error("Invalid Quill container", P);
              this.options.debug && q.debug(this.options.debug);
              var R = this.container.innerHTML.trim();
              this.container.classList.add("ql-container"), this.container.innerHTML = "", this.container.__quill = this, this.root = this.addContainer("ql-editor"), this.root.classList.add("ql-blank"), this.root.setAttribute("data-gramm", !1), this.scrollingContainer = this.options.scrollingContainer || this.root, this.emitter = new d.default(), this.scroll = v.default.create(this.root, {
                emitter: this.emitter,
                whitelist: this.options.formats
              }), this.editor = new c.default(this.scroll), this.selection = new w.default(this.scroll, this.emitter), this.theme = new this.options.theme(this, this.options), this.keyboard = this.theme.addModule("keyboard"), this.clipboard = this.theme.addModule("clipboard"), this.history = this.theme.addModule("history"), this.theme.init(), this.emitter.on(d.default.events.EDITOR_CHANGE, function(B) {
                B === d.default.events.TEXT_CHANGE && A.root.classList.toggle("ql-blank", A.editor.isBlank());
              }), this.emitter.on(d.default.events.SCROLL_UPDATE, function(B, I) {
                var $ = A.selection.lastRange, W = $ && $.length === 0 ? $.index : void 0;
                H.call(A, function() {
                  return A.editor.update(null, I, W);
                }, B);
              });
              var z = this.clipboard.convert(`<div class='ql-editor' style="white-space: normal;">` + R + "<p><br></p></div>");
              this.setContents(z), this.history.clear(), this.options.placeholder && this.root.setAttribute("data-placeholder", this.options.placeholder), this.options.readOnly && this.disable();
            }
            return l(q, [{
              key: "addContainer",
              value: function(A) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                if (typeof A == "string") {
                  var R = A;
                  A = document.createElement("div"), A.classList.add(R);
                }
                return this.container.insertBefore(A, M), A;
              }
            }, {
              key: "blur",
              value: function() {
                this.selection.setRange(null);
              }
            }, {
              key: "deleteText",
              value: function(A, M, R) {
                var z = this, B = U(A, M, R), I = o(B, 4);
                return A = I[0], M = I[1], R = I[3], H.call(this, function() {
                  return z.editor.deleteText(A, M);
                }, R, A, -1 * M);
              }
            }, {
              key: "disable",
              value: function() {
                this.enable(!1);
              }
            }, {
              key: "enable",
              value: function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.scroll.enable(A), this.container.classList.toggle("ql-disabled", !A);
              }
            }, {
              key: "focus",
              value: function() {
                var A = this.scrollingContainer.scrollTop;
                this.selection.focus(), this.scrollingContainer.scrollTop = A, this.scrollIntoView();
              }
            }, {
              key: "format",
              value: function(A, M) {
                var R = this, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : d.default.sources.API;
                return H.call(this, function() {
                  var B = R.getSelection(!0), I = new f.default();
                  if (B == null)
                    return I;
                  if (v.default.query(A, v.default.Scope.BLOCK))
                    I = R.editor.formatLine(B.index, B.length, O({}, A, M));
                  else {
                    if (B.length === 0)
                      return R.selection.format(A, M), I;
                    I = R.editor.formatText(B.index, B.length, O({}, A, M));
                  }
                  return R.setSelection(B, d.default.sources.SILENT), I;
                }, z);
              }
            }, {
              key: "formatLine",
              value: function(A, M, R, z, B) {
                var I = this, $ = void 0, W = U(A, M, R, z, B), Y = o(W, 4);
                return A = Y[0], M = Y[1], $ = Y[2], B = Y[3], H.call(this, function() {
                  return I.editor.formatLine(A, M, $);
                }, B, A, 0);
              }
            }, {
              key: "formatText",
              value: function(A, M, R, z, B) {
                var I = this, $ = void 0, W = U(A, M, R, z, B), Y = o(W, 4);
                return A = Y[0], M = Y[1], $ = Y[2], B = Y[3], H.call(this, function() {
                  return I.editor.formatText(A, M, $);
                }, B, A, 0);
              }
            }, {
              key: "getBounds",
              value: function(A) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, R = void 0;
                typeof A == "number" ? R = this.selection.getBounds(A, M) : R = this.selection.getBounds(A.index, A.length);
                var z = this.container.getBoundingClientRect();
                return {
                  bottom: R.bottom - z.top,
                  height: R.height,
                  left: R.left - z.left,
                  right: R.right - z.left,
                  top: R.top - z.top,
                  width: R.width
                };
              }
            }, {
              key: "getContents",
              value: function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - A, R = U(A, M), z = o(R, 2);
                return A = z[0], M = z[1], this.editor.getContents(A, M);
              }
            }, {
              key: "getFormat",
              value: function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.getSelection(!0), M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
                return typeof A == "number" ? this.editor.getFormat(A, M) : this.editor.getFormat(A.index, A.length);
              }
            }, {
              key: "getIndex",
              value: function(A) {
                return A.offset(this.scroll);
              }
            }, {
              key: "getLength",
              value: function() {
                return this.scroll.length();
              }
            }, {
              key: "getLeaf",
              value: function(A) {
                return this.scroll.leaf(A);
              }
            }, {
              key: "getLine",
              value: function(A) {
                return this.scroll.line(A);
              }
            }, {
              key: "getLines",
              value: function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE;
                return typeof A != "number" ? this.scroll.lines(A.index, A.length) : this.scroll.lines(A, M);
              }
            }, {
              key: "getModule",
              value: function(A) {
                return this.theme.modules[A];
              }
            }, {
              key: "getSelection",
              value: function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1;
                return A && this.focus(), this.update(), this.selection.getRange()[0];
              }
            }, {
              key: "getText",
              value: function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : this.getLength() - A, R = U(A, M), z = o(R, 2);
                return A = z[0], M = z[1], this.editor.getText(A, M);
              }
            }, {
              key: "hasFocus",
              value: function() {
                return this.selection.hasFocus();
              }
            }, {
              key: "insertEmbed",
              value: function(A, M, R) {
                var z = this, B = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : q.sources.API;
                return H.call(this, function() {
                  return z.editor.insertEmbed(A, M, R);
                }, B, A);
              }
            }, {
              key: "insertText",
              value: function(A, M, R, z, B) {
                var I = this, $ = void 0, W = U(A, 0, R, z, B), Y = o(W, 4);
                return A = Y[0], $ = Y[2], B = Y[3], H.call(this, function() {
                  return I.editor.insertText(A, M, $);
                }, B, A, M.length);
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
              value: function(A, M, R) {
                this.clipboard.dangerouslyPasteHTML(A, M, R);
              }
            }, {
              key: "removeFormat",
              value: function(A, M, R) {
                var z = this, B = U(A, M, R), I = o(B, 4);
                return A = I[0], M = I[1], R = I[3], H.call(this, function() {
                  return z.editor.removeFormat(A, M);
                }, R, A);
              }
            }, {
              key: "scrollIntoView",
              value: function() {
                this.selection.scrollIntoView(this.scrollingContainer);
              }
            }, {
              key: "setContents",
              value: function(A) {
                var M = this, R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d.default.sources.API;
                return H.call(this, function() {
                  A = new f.default(A);
                  var z = M.getLength(), B = M.editor.deleteText(0, z), I = M.editor.applyDelta(A), $ = I.ops[I.ops.length - 1];
                  $ != null && typeof $.insert == "string" && $.insert[$.insert.length - 1] === `
` && (M.editor.deleteText(M.getLength() - 1, 1), I.delete(1));
                  var W = B.compose(I);
                  return W;
                }, R);
              }
            }, {
              key: "setSelection",
              value: function(A, M, R) {
                if (A == null)
                  this.selection.setRange(null, M || q.sources.API);
                else {
                  var z = U(A, M, R), B = o(z, 4);
                  A = B[0], M = B[1], R = B[3], this.selection.setRange(new g.Range(A, M), R), R !== d.default.sources.SILENT && this.selection.scrollIntoView(this.scrollingContainer);
                }
              }
            }, {
              key: "setText",
              value: function(A) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d.default.sources.API, R = new f.default().insert(A);
                return this.setContents(R, M);
              }
            }, {
              key: "update",
              value: function() {
                var A = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : d.default.sources.USER, M = this.scroll.update(A);
                return this.selection.update(A), M;
              }
            }, {
              key: "updateContents",
              value: function(A) {
                var M = this, R = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : d.default.sources.API;
                return H.call(this, function() {
                  return A = new f.default(A), M.editor.applyDelta(A, R);
                }, R, !0);
              }
            }]), q;
          }();
          C.DEFAULTS = {
            bounds: null,
            formats: null,
            modules: {},
            placeholder: "",
            readOnly: !1,
            scrollingContainer: null,
            strict: !0,
            theme: "default"
          }, C.events = d.default.events, C.sources = d.default.sources, C.version = "1.3.7", C.imports = {
            delta: f.default,
            parchment: v.default,
            "core/module": m.default,
            "core/theme": j.default
          };
          function D(q, P) {
            if (P = (0, x.default)(!0, {
              container: q,
              modules: {
                clipboard: !0,
                keyboard: !0,
                history: !0
              }
            }, P), !P.theme || P.theme === C.DEFAULTS.theme)
              P.theme = j.default;
            else if (P.theme = C.import("themes/" + P.theme), P.theme == null)
              throw new Error("Invalid theme " + P.theme + ". Did you register it?");
            var A = (0, x.default)(!0, {}, P.theme.DEFAULTS);
            [A, P].forEach(function(z) {
              z.modules = z.modules || {}, Object.keys(z.modules).forEach(function(B) {
                z.modules[B] === !0 && (z.modules[B] = {});
              });
            });
            var M = Object.keys(A.modules).concat(Object.keys(P.modules)), R = M.reduce(function(z, B) {
              var I = C.import("modules/" + B);
              return I == null ? T.error("Cannot load " + B + " module. Are you sure you registered it?") : z[B] = I.DEFAULTS || {}, z;
            }, {});
            return P.modules != null && P.modules.toolbar && P.modules.toolbar.constructor !== Object && (P.modules.toolbar = {
              container: P.modules.toolbar
            }), P = (0, x.default)(!0, {}, C.DEFAULTS, { modules: R }, A, P), ["bounds", "container", "scrollingContainer"].forEach(function(z) {
              typeof P[z] == "string" && (P[z] = document.querySelector(P[z]));
            }), P.modules = Object.keys(P.modules).reduce(function(z, B) {
              return P.modules[B] && (z[B] = P.modules[B]), z;
            }, {}), P;
          }
          function H(q, P, A, M) {
            if (this.options.strict && !this.isEnabled() && P === d.default.sources.USER)
              return new f.default();
            var R = A == null ? null : this.getSelection(), z = this.editor.delta, B = q();
            if (R != null && (A === !0 && (A = R.index), M == null ? R = K(R, B, P) : M !== 0 && (R = K(R, A, M, P)), this.setSelection(R, d.default.sources.SILENT)), B.length() > 0) {
              var I, $ = [d.default.events.TEXT_CHANGE, B, z, P];
              if ((I = this.emitter).emit.apply(I, [d.default.events.EDITOR_CHANGE].concat($)), P !== d.default.sources.SILENT) {
                var W;
                (W = this.emitter).emit.apply(W, $);
              }
            }
            return B;
          }
          function U(q, P, A, M, R) {
            var z = {};
            return typeof q.index == "number" && typeof q.length == "number" ? typeof P != "number" ? (R = M, M = A, A = P, P = q.length, q = q.index) : (P = q.length, q = q.index) : typeof P != "number" && (R = M, M = A, A = P, P = 0), (typeof A > "u" ? "undefined" : a(A)) === "object" ? (z = A, R = M) : typeof A == "string" && (M != null ? z[A] = M : R = A), R = R || d.default.sources.API, [q, P, z, R];
          }
          function K(q, P, A, M) {
            if (q == null)
              return null;
            var R = void 0, z = void 0;
            if (P instanceof f.default) {
              var B = [q.index, q.index + q.length].map(function(Y) {
                return P.transformPosition(Y, M !== d.default.sources.USER);
              }), I = o(B, 2);
              R = I[0], z = I[1];
            } else {
              var $ = [q.index, q.index + q.length].map(function(Y) {
                return Y < P || Y === P && M === d.default.sources.USER ? Y : A >= 0 ? Y + A : Math.max(P, Y + A);
              }), W = o($, 2);
              R = W[0], z = W[1];
            }
            return new g.Range(R, z - R);
          }
          r.expandConfig = D, r.overload = U, r.default = C;
        },
        /* 6 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function b(v, g) {
              for (var w = 0; w < g.length; w++) {
                var p = g[w];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, g, w) {
              return g && b(v.prototype, g), w && b(v, w), v;
            };
          }(), o = function b(v, g, w) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, g);
            if (p === void 0) {
              var x = Object.getPrototypeOf(v);
              return x === null ? void 0 : b(x, g, w);
            } else {
              if ("value" in p)
                return p.value;
              var _ = p.get;
              return _ === void 0 ? void 0 : _.call(w);
            }
          }, l = i(7), u = c(l), f = i(0), h = c(f);
          function c(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function s(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function y(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var m = function(b) {
            y(v, b);
            function v() {
              return s(this, v), d(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "formatAt",
              value: function(w, p, x, _) {
                if (v.compare(this.statics.blotName, x) < 0 && h.default.query(x, h.default.Scope.BLOT)) {
                  var E = this.isolate(w, p);
                  _ && E.wrap(x, _);
                } else
                  o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "formatAt", this).call(this, w, p, x, _);
              }
            }, {
              key: "optimize",
              value: function(w) {
                if (o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "optimize", this).call(this, w), this.parent instanceof v && v.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
                  var p = this.parent.isolate(this.offset(), this.length());
                  this.moveChildren(p), p.wrap(this);
                }
              }
            }], [{
              key: "compare",
              value: function(w, p) {
                var x = v.order.indexOf(w), _ = v.order.indexOf(p);
                return x >= 0 || _ >= 0 ? x - _ : w === p ? 0 : w < p ? -1 : 1;
              }
            }]), v;
          }(h.default.Inline);
          m.allowedChildren = [m, h.default.Embed, u.default], m.order = [
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
          ], r.default = m;
        },
        /* 7 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(0), o = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          function u(s, d) {
            if (!(s instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(s, d) {
            if (!s)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : s;
          }
          function h(s, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            s.prototype = Object.create(d && d.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(s, d) : s.__proto__ = d);
          }
          var c = function(s) {
            h(d, s);
            function d() {
              return u(this, d), f(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
            }
            return d;
          }(o.default.Text);
          r.default = c;
        },
        /* 8 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function g(w, p) {
              for (var x = 0; x < p.length; x++) {
                var _ = p[x];
                _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(w, _.key, _);
              }
            }
            return function(w, p, x) {
              return p && g(w.prototype, p), x && g(w, x), w;
            };
          }(), o = function g(w, p, x) {
            w === null && (w = Function.prototype);
            var _ = Object.getOwnPropertyDescriptor(w, p);
            if (_ === void 0) {
              var E = Object.getPrototypeOf(w);
              return E === null ? void 0 : g(E, p, x);
            } else {
              if ("value" in _)
                return _.value;
              var k = _.get;
              return k === void 0 ? void 0 : k.call(x);
            }
          }, l = i(54), u = c(l), f = i(10), h = c(f);
          function c(g) {
            return g && g.__esModule ? g : { default: g };
          }
          function s(g, w) {
            if (!(g instanceof w))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(g, w) {
            if (!g)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return w && (typeof w == "object" || typeof w == "function") ? w : g;
          }
          function y(g, w) {
            if (typeof w != "function" && w !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof w);
            g.prototype = Object.create(w && w.prototype, { constructor: { value: g, enumerable: !1, writable: !0, configurable: !0 } }), w && (Object.setPrototypeOf ? Object.setPrototypeOf(g, w) : g.__proto__ = w);
          }
          var m = (0, h.default)("quill:events"), b = ["selectionchange", "mousedown", "mouseup", "click"];
          b.forEach(function(g) {
            document.addEventListener(g, function() {
              for (var w = arguments.length, p = Array(w), x = 0; x < w; x++)
                p[x] = arguments[x];
              [].slice.call(document.querySelectorAll(".ql-container")).forEach(function(_) {
                if (_.__quill && _.__quill.emitter) {
                  var E;
                  (E = _.__quill.emitter).handleDOM.apply(E, p);
                }
              });
            });
          });
          var v = function(g) {
            y(w, g);
            function w() {
              s(this, w);
              var p = d(this, (w.__proto__ || Object.getPrototypeOf(w)).call(this));
              return p.listeners = {}, p.on("error", m.error), p;
            }
            return a(w, [{
              key: "emit",
              value: function() {
                m.log.apply(m, arguments), o(w.prototype.__proto__ || Object.getPrototypeOf(w.prototype), "emit", this).apply(this, arguments);
              }
            }, {
              key: "handleDOM",
              value: function(x) {
                for (var _ = arguments.length, E = Array(_ > 1 ? _ - 1 : 0), k = 1; k < _; k++)
                  E[k - 1] = arguments[k];
                (this.listeners[x.type] || []).forEach(function(j) {
                  var S = j.node, O = j.handler;
                  (x.target === S || S.contains(x.target)) && O.apply(void 0, [x].concat(E));
                });
              }
            }, {
              key: "listenDOM",
              value: function(x, _, E) {
                this.listeners[x] || (this.listeners[x] = []), this.listeners[x].push({ node: _, handler: E });
              }
            }]), w;
          }(u.default);
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
          }, r.default = v;
        },
        /* 9 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          function a(l, u) {
            if (!(l instanceof u))
              throw new TypeError("Cannot call a class as a function");
          }
          var o = function l(u) {
            var f = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            a(this, l), this.quill = u, this.options = f;
          };
          o.DEFAULTS = {}, r.default = o;
        },
        /* 10 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = ["error", "warn", "log", "info"], o = "warn";
          function l(f) {
            if (a.indexOf(f) <= a.indexOf(o)) {
              for (var h, c = arguments.length, s = Array(c > 1 ? c - 1 : 0), d = 1; d < c; d++)
                s[d - 1] = arguments[d];
              (h = console)[f].apply(h, s);
            }
          }
          function u(f) {
            return a.reduce(function(h, c) {
              return h[c] = l.bind(console, c, f), h;
            }, {});
          }
          l.level = u.level = function(f) {
            o = f;
          }, r.default = u;
        },
        /* 11 */
        /***/
        function(n, r, i) {
          var a = Array.prototype.slice, o = i(52), l = i(53), u = n.exports = function(s, d, y) {
            return y || (y = {}), s === d ? !0 : s instanceof Date && d instanceof Date ? s.getTime() === d.getTime() : !s || !d || typeof s != "object" && typeof d != "object" ? y.strict ? s === d : s == d : c(s, d, y);
          };
          function f(s) {
            return s == null;
          }
          function h(s) {
            return !(!s || typeof s != "object" || typeof s.length != "number" || typeof s.copy != "function" || typeof s.slice != "function" || s.length > 0 && typeof s[0] != "number");
          }
          function c(s, d, y) {
            var m, b;
            if (f(s) || f(d) || s.prototype !== d.prototype)
              return !1;
            if (l(s))
              return l(d) ? (s = a.call(s), d = a.call(d), u(s, d, y)) : !1;
            if (h(s)) {
              if (!h(d) || s.length !== d.length)
                return !1;
              for (m = 0; m < s.length; m++)
                if (s[m] !== d[m])
                  return !1;
              return !0;
            }
            try {
              var v = o(s), g = o(d);
            } catch {
              return !1;
            }
            if (v.length != g.length)
              return !1;
            for (v.sort(), g.sort(), m = v.length - 1; m >= 0; m--)
              if (v[m] != g[m])
                return !1;
            for (m = v.length - 1; m >= 0; m--)
              if (b = v[m], !u(s[b], d[b], y))
                return !1;
            return typeof s == typeof d;
          }
        },
        /* 12 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var a = i(1), o = (
            /** @class */
            function() {
              function l(u, f, h) {
                h === void 0 && (h = {}), this.attrName = u, this.keyName = f;
                var c = a.Scope.TYPE & a.Scope.ATTRIBUTE;
                h.scope != null ? this.scope = h.scope & a.Scope.LEVEL | c : this.scope = a.Scope.ATTRIBUTE, h.whitelist != null && (this.whitelist = h.whitelist);
              }
              return l.keys = function(u) {
                return [].map.call(u.attributes, function(f) {
                  return f.name;
                });
              }, l.prototype.add = function(u, f) {
                return this.canAdd(u, f) ? (u.setAttribute(this.keyName, f), !0) : !1;
              }, l.prototype.canAdd = function(u, f) {
                var h = a.query(u, a.Scope.BLOT & (this.scope | a.Scope.TYPE));
                return h == null ? !1 : this.whitelist == null ? !0 : typeof f == "string" ? this.whitelist.indexOf(f.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(f) > -1;
              }, l.prototype.remove = function(u) {
                u.removeAttribute(this.keyName);
              }, l.prototype.value = function(u) {
                var f = u.getAttribute(this.keyName);
                return this.canAdd(u, f) && f ? f : "";
              }, l;
            }()
          );
          r.default = o;
        },
        /* 13 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.Code = void 0;
          var a = function() {
            function k(j, S) {
              var O = [], N = !0, T = !1, C = void 0;
              try {
                for (var D = j[Symbol.iterator](), H; !(N = (H = D.next()).done) && (O.push(H.value), !(S && O.length === S)); N = !0)
                  ;
              } catch (U) {
                T = !0, C = U;
              } finally {
                try {
                  !N && D.return && D.return();
                } finally {
                  if (T)
                    throw C;
                }
              }
              return O;
            }
            return function(j, S) {
              if (Array.isArray(j))
                return j;
              if (Symbol.iterator in Object(j))
                return k(j, S);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function k(j, S) {
              for (var O = 0; O < S.length; O++) {
                var N = S[O];
                N.enumerable = N.enumerable || !1, N.configurable = !0, "value" in N && (N.writable = !0), Object.defineProperty(j, N.key, N);
              }
            }
            return function(j, S, O) {
              return S && k(j.prototype, S), O && k(j, O), j;
            };
          }(), l = function k(j, S, O) {
            j === null && (j = Function.prototype);
            var N = Object.getOwnPropertyDescriptor(j, S);
            if (N === void 0) {
              var T = Object.getPrototypeOf(j);
              return T === null ? void 0 : k(T, S, O);
            } else {
              if ("value" in N)
                return N.value;
              var C = N.get;
              return C === void 0 ? void 0 : C.call(O);
            }
          }, u = i(2), f = g(u), h = i(0), c = g(h), s = i(4), d = g(s), y = i(6), m = g(y), b = i(7), v = g(b);
          function g(k) {
            return k && k.__esModule ? k : { default: k };
          }
          function w(k, j) {
            if (!(k instanceof j))
              throw new TypeError("Cannot call a class as a function");
          }
          function p(k, j) {
            if (!k)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return j && (typeof j == "object" || typeof j == "function") ? j : k;
          }
          function x(k, j) {
            if (typeof j != "function" && j !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof j);
            k.prototype = Object.create(j && j.prototype, { constructor: { value: k, enumerable: !1, writable: !0, configurable: !0 } }), j && (Object.setPrototypeOf ? Object.setPrototypeOf(k, j) : k.__proto__ = j);
          }
          var _ = function(k) {
            x(j, k);
            function j() {
              return w(this, j), p(this, (j.__proto__ || Object.getPrototypeOf(j)).apply(this, arguments));
            }
            return j;
          }(m.default);
          _.blotName = "code", _.tagName = "CODE";
          var E = function(k) {
            x(j, k);
            function j() {
              return w(this, j), p(this, (j.__proto__ || Object.getPrototypeOf(j)).apply(this, arguments));
            }
            return o(j, [{
              key: "delta",
              value: function() {
                var O = this, N = this.domNode.textContent;
                return N.endsWith(`
`) && (N = N.slice(0, -1)), N.split(`
`).reduce(function(T, C) {
                  return T.insert(C).insert(`
`, O.formats());
                }, new f.default());
              }
            }, {
              key: "format",
              value: function(O, N) {
                if (!(O === this.statics.blotName && N)) {
                  var T = this.descendant(v.default, this.length() - 1), C = a(T, 1), D = C[0];
                  D != null && D.deleteAt(D.length() - 1, 1), l(j.prototype.__proto__ || Object.getPrototypeOf(j.prototype), "format", this).call(this, O, N);
                }
              }
            }, {
              key: "formatAt",
              value: function(O, N, T, C) {
                if (N !== 0 && !(c.default.query(T, c.default.Scope.BLOCK) == null || T === this.statics.blotName && C === this.statics.formats(this.domNode))) {
                  var D = this.newlineIndex(O);
                  if (!(D < 0 || D >= O + N)) {
                    var H = this.newlineIndex(O, !0) + 1, U = D - H + 1, K = this.isolate(H, U), q = K.next;
                    K.format(T, C), q instanceof j && q.formatAt(0, O - H + N - U, T, C);
                  }
                }
              }
            }, {
              key: "insertAt",
              value: function(O, N, T) {
                if (T == null) {
                  var C = this.descendant(v.default, O), D = a(C, 2), H = D[0], U = D[1];
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
                var T = this.domNode.textContent.slice(O).indexOf(`
`);
                return T > -1 ? O + T : -1;
              }
            }, {
              key: "optimize",
              value: function(O) {
                this.domNode.textContent.endsWith(`
`) || this.appendChild(c.default.create("text", `
`)), l(j.prototype.__proto__ || Object.getPrototypeOf(j.prototype), "optimize", this).call(this, O);
                var N = this.next;
                N != null && N.prev === this && N.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === N.statics.formats(N.domNode) && (N.optimize(O), N.moveChildren(this), N.remove());
              }
            }, {
              key: "replace",
              value: function(O) {
                l(j.prototype.__proto__ || Object.getPrototypeOf(j.prototype), "replace", this).call(this, O), [].slice.call(this.domNode.querySelectorAll("*")).forEach(function(N) {
                  var T = c.default.find(N);
                  T == null ? N.parentNode.removeChild(N) : T instanceof c.default.Embed ? T.remove() : T.unwrap();
                });
              }
            }], [{
              key: "create",
              value: function(O) {
                var N = l(j.__proto__ || Object.getPrototypeOf(j), "create", this).call(this, O);
                return N.setAttribute("spellcheck", !1), N;
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), j;
          }(d.default);
          E.blotName = "code-block", E.tagName = "PRE", E.TAB = "  ", r.Code = _, r.default = E;
        },
        /* 14 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(q) {
            return typeof q;
          } : function(q) {
            return q && typeof Symbol == "function" && q.constructor === Symbol && q !== Symbol.prototype ? "symbol" : typeof q;
          }, o = function() {
            function q(P, A) {
              var M = [], R = !0, z = !1, B = void 0;
              try {
                for (var I = P[Symbol.iterator](), $; !(R = ($ = I.next()).done) && (M.push($.value), !(A && M.length === A)); R = !0)
                  ;
              } catch (W) {
                z = !0, B = W;
              } finally {
                try {
                  !R && I.return && I.return();
                } finally {
                  if (z)
                    throw B;
                }
              }
              return M;
            }
            return function(P, A) {
              if (Array.isArray(P))
                return P;
              if (Symbol.iterator in Object(P))
                return q(P, A);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), l = function() {
            function q(P, A) {
              for (var M = 0; M < A.length; M++) {
                var R = A[M];
                R.enumerable = R.enumerable || !1, R.configurable = !0, "value" in R && (R.writable = !0), Object.defineProperty(P, R.key, R);
              }
            }
            return function(P, A, M) {
              return A && q(P.prototype, A), M && q(P, M), P;
            };
          }(), u = i(2), f = N(u), h = i(20), c = N(h), s = i(0), d = N(s), y = i(13), m = N(y), b = i(24), v = N(b), g = i(4), w = N(g), p = i(16), x = N(p), _ = i(21), E = N(_), k = i(11), j = N(k), S = i(3), O = N(S);
          function N(q) {
            return q && q.__esModule ? q : { default: q };
          }
          function T(q, P, A) {
            return P in q ? Object.defineProperty(q, P, { value: A, enumerable: !0, configurable: !0, writable: !0 }) : q[P] = A, q;
          }
          function C(q, P) {
            if (!(q instanceof P))
              throw new TypeError("Cannot call a class as a function");
          }
          var D = /^[ -~]*$/, H = function() {
            function q(P) {
              C(this, q), this.scroll = P, this.delta = this.getDelta();
            }
            return l(q, [{
              key: "applyDelta",
              value: function(A) {
                var M = this, R = !1;
                this.scroll.update();
                var z = this.scroll.length();
                return this.scroll.batchStart(), A = K(A), A.reduce(function(B, I) {
                  var $ = I.retain || I.delete || I.insert.length || 1, W = I.attributes || {};
                  if (I.insert != null) {
                    if (typeof I.insert == "string") {
                      var Y = I.insert;
                      Y.endsWith(`
`) && R && (R = !1, Y = Y.slice(0, -1)), B >= z && !Y.endsWith(`
`) && (R = !0), M.scroll.insertAt(B, Y);
                      var V = M.scroll.line(B), ee = o(V, 2), Z = ee[0], le = ee[1], ce = (0, O.default)({}, (0, g.bubbleFormats)(Z));
                      if (Z instanceof w.default) {
                        var he = Z.descendant(d.default.Leaf, le), Ae = o(he, 1), Oe = Ae[0];
                        ce = (0, O.default)(ce, (0, g.bubbleFormats)(Oe));
                      }
                      W = c.default.attributes.diff(ce, W) || {};
                    } else if (a(I.insert) === "object") {
                      var G = Object.keys(I.insert)[0];
                      if (G == null)
                        return B;
                      M.scroll.insertAt(B, G, I.insert[G]);
                    }
                    z += $;
                  }
                  return Object.keys(W).forEach(function(Q) {
                    M.scroll.formatAt(B, $, Q, W[Q]);
                  }), B + $;
                }, 0), A.reduce(function(B, I) {
                  return typeof I.delete == "number" ? (M.scroll.deleteAt(B, I.delete), B) : B + (I.retain || I.insert.length || 1);
                }, 0), this.scroll.batchEnd(), this.update(A);
              }
            }, {
              key: "deleteText",
              value: function(A, M) {
                return this.scroll.deleteAt(A, M), this.update(new f.default().retain(A).delete(M));
              }
            }, {
              key: "formatLine",
              value: function(A, M) {
                var R = this, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return this.scroll.update(), Object.keys(z).forEach(function(B) {
                  if (!(R.scroll.whitelist != null && !R.scroll.whitelist[B])) {
                    var I = R.scroll.lines(A, Math.max(M, 1)), $ = M;
                    I.forEach(function(W) {
                      var Y = W.length();
                      if (!(W instanceof m.default))
                        W.format(B, z[B]);
                      else {
                        var V = A - W.offset(R.scroll), ee = W.newlineIndex(V + $) - V + 1;
                        W.formatAt(V, ee, B, z[B]);
                      }
                      $ -= Y;
                    });
                  }
                }), this.scroll.optimize(), this.update(new f.default().retain(A).retain(M, (0, E.default)(z)));
              }
            }, {
              key: "formatText",
              value: function(A, M) {
                var R = this, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return Object.keys(z).forEach(function(B) {
                  R.scroll.formatAt(A, M, B, z[B]);
                }), this.update(new f.default().retain(A).retain(M, (0, E.default)(z)));
              }
            }, {
              key: "getContents",
              value: function(A, M) {
                return this.delta.slice(A, A + M);
              }
            }, {
              key: "getDelta",
              value: function() {
                return this.scroll.lines().reduce(function(A, M) {
                  return A.concat(M.delta());
                }, new f.default());
              }
            }, {
              key: "getFormat",
              value: function(A) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, R = [], z = [];
                M === 0 ? this.scroll.path(A).forEach(function(I) {
                  var $ = o(I, 1), W = $[0];
                  W instanceof w.default ? R.push(W) : W instanceof d.default.Leaf && z.push(W);
                }) : (R = this.scroll.lines(A, M), z = this.scroll.descendants(d.default.Leaf, A, M));
                var B = [R, z].map(function(I) {
                  if (I.length === 0)
                    return {};
                  for (var $ = (0, g.bubbleFormats)(I.shift()); Object.keys($).length > 0; ) {
                    var W = I.shift();
                    if (W == null)
                      return $;
                    $ = U((0, g.bubbleFormats)(W), $);
                  }
                  return $;
                });
                return O.default.apply(O.default, B);
              }
            }, {
              key: "getText",
              value: function(A, M) {
                return this.getContents(A, M).filter(function(R) {
                  return typeof R.insert == "string";
                }).map(function(R) {
                  return R.insert;
                }).join("");
              }
            }, {
              key: "insertEmbed",
              value: function(A, M, R) {
                return this.scroll.insertAt(A, M, R), this.update(new f.default().retain(A).insert(T({}, M, R)));
              }
            }, {
              key: "insertText",
              value: function(A, M) {
                var R = this, z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                return M = M.replace(/\r\n/g, `
`).replace(/\r/g, `
`), this.scroll.insertAt(A, M), Object.keys(z).forEach(function(B) {
                  R.scroll.formatAt(A, M.length, B, z[B]);
                }), this.update(new f.default().retain(A).insert(M, (0, E.default)(z)));
              }
            }, {
              key: "isBlank",
              value: function() {
                if (this.scroll.children.length == 0)
                  return !0;
                if (this.scroll.children.length > 1)
                  return !1;
                var A = this.scroll.children.head;
                return A.statics.blotName !== w.default.blotName || A.children.length > 1 ? !1 : A.children.head instanceof x.default;
              }
            }, {
              key: "removeFormat",
              value: function(A, M) {
                var R = this.getText(A, M), z = this.scroll.line(A + M), B = o(z, 2), I = B[0], $ = B[1], W = 0, Y = new f.default();
                I != null && (I instanceof m.default ? W = I.newlineIndex($) - $ + 1 : W = I.length() - $, Y = I.delta().slice($, $ + W - 1).insert(`
`));
                var V = this.getContents(A, M + W), ee = V.diff(new f.default().insert(R).concat(Y)), Z = new f.default().retain(A).concat(ee);
                return this.applyDelta(Z);
              }
            }, {
              key: "update",
              value: function(A) {
                var M = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [], R = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : void 0, z = this.delta;
                if (M.length === 1 && M[0].type === "characterData" && M[0].target.data.match(D) && d.default.find(M[0].target)) {
                  var B = d.default.find(M[0].target), I = (0, g.bubbleFormats)(B), $ = B.offset(this.scroll), W = M[0].oldValue.replace(v.default.CONTENTS, ""), Y = new f.default().insert(W), V = new f.default().insert(B.value()), ee = new f.default().retain($).concat(Y.diff(V, R));
                  A = ee.reduce(function(Z, le) {
                    return le.insert ? Z.insert(le.insert, I) : Z.push(le);
                  }, new f.default()), this.delta = z.compose(A);
                } else
                  this.delta = this.getDelta(), (!A || !(0, j.default)(z.compose(A), this.delta)) && (A = z.diff(this.delta, R));
                return A;
              }
            }]), q;
          }();
          function U(q, P) {
            return Object.keys(P).reduce(function(A, M) {
              return q[M] == null || (P[M] === q[M] ? A[M] = P[M] : Array.isArray(P[M]) ? P[M].indexOf(q[M]) < 0 && (A[M] = P[M].concat([q[M]])) : A[M] = [P[M], q[M]]), A;
            }, {});
          }
          function K(q) {
            return q.reduce(function(P, A) {
              if (A.insert === 1) {
                var M = (0, E.default)(A.attributes);
                return delete M.image, P.insert({ image: A.attributes.image }, M);
              }
              if (A.attributes != null && (A.attributes.list === !0 || A.attributes.bullet === !0) && (A = (0, E.default)(A), A.attributes.list ? A.attributes.list = "ordered" : (A.attributes.list = "bullet", delete A.attributes.bullet)), typeof A.insert == "string") {
                var R = A.insert.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
                return P.insert(R, A.attributes);
              }
              return P.push(A);
            }, new f.default());
          }
          r.default = H;
        },
        /* 15 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.Range = void 0;
          var a = function() {
            function k(j, S) {
              var O = [], N = !0, T = !1, C = void 0;
              try {
                for (var D = j[Symbol.iterator](), H; !(N = (H = D.next()).done) && (O.push(H.value), !(S && O.length === S)); N = !0)
                  ;
              } catch (U) {
                T = !0, C = U;
              } finally {
                try {
                  !N && D.return && D.return();
                } finally {
                  if (T)
                    throw C;
                }
              }
              return O;
            }
            return function(j, S) {
              if (Array.isArray(j))
                return j;
              if (Symbol.iterator in Object(j))
                return k(j, S);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function k(j, S) {
              for (var O = 0; O < S.length; O++) {
                var N = S[O];
                N.enumerable = N.enumerable || !1, N.configurable = !0, "value" in N && (N.writable = !0), Object.defineProperty(j, N.key, N);
              }
            }
            return function(j, S, O) {
              return S && k(j.prototype, S), O && k(j, O), j;
            };
          }(), l = i(0), u = v(l), f = i(21), h = v(f), c = i(11), s = v(c), d = i(8), y = v(d), m = i(10), b = v(m);
          function v(k) {
            return k && k.__esModule ? k : { default: k };
          }
          function g(k) {
            if (Array.isArray(k)) {
              for (var j = 0, S = Array(k.length); j < k.length; j++)
                S[j] = k[j];
              return S;
            } else
              return Array.from(k);
          }
          function w(k, j) {
            if (!(k instanceof j))
              throw new TypeError("Cannot call a class as a function");
          }
          var p = (0, b.default)("quill:selection"), x = function k(j) {
            var S = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            w(this, k), this.index = j, this.length = S;
          }, _ = function() {
            function k(j, S) {
              var O = this;
              w(this, k), this.emitter = S, this.scroll = j, this.composing = !1, this.mouseDown = !1, this.root = this.scroll.domNode, this.cursor = u.default.create("cursor", this), this.lastRange = this.savedRange = new x(0, 0), this.handleComposition(), this.handleDragging(), this.emitter.listenDOM("selectionchange", document, function() {
                O.mouseDown || setTimeout(O.update.bind(O, y.default.sources.USER), 1);
              }), this.emitter.on(y.default.events.EDITOR_CHANGE, function(N, T) {
                N === y.default.events.TEXT_CHANGE && T.length() > 0 && O.update(y.default.sources.SILENT);
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
              }), this.emitter.on(y.default.events.SCROLL_OPTIMIZE, function(N, T) {
                if (T.range) {
                  var C = T.range, D = C.startNode, H = C.startOffset, U = C.endNode, K = C.endOffset;
                  O.setNativeRange(D, H, U, K);
                }
              }), this.update(y.default.sources.SILENT);
            }
            return o(k, [{
              key: "handleComposition",
              value: function() {
                var S = this;
                this.root.addEventListener("compositionstart", function() {
                  S.composing = !0;
                }), this.root.addEventListener("compositionend", function() {
                  if (S.composing = !1, S.cursor.parent) {
                    var O = S.cursor.restore();
                    if (!O)
                      return;
                    setTimeout(function() {
                      S.setNativeRange(O.startNode, O.startOffset, O.endNode, O.endOffset);
                    }, 1);
                  }
                });
              }
            }, {
              key: "handleDragging",
              value: function() {
                var S = this;
                this.emitter.listenDOM("mousedown", document.body, function() {
                  S.mouseDown = !0;
                }), this.emitter.listenDOM("mouseup", document.body, function() {
                  S.mouseDown = !1, S.update(y.default.sources.USER);
                });
              }
            }, {
              key: "focus",
              value: function() {
                this.hasFocus() || (this.root.focus(), this.setRange(this.savedRange));
              }
            }, {
              key: "format",
              value: function(S, O) {
                if (!(this.scroll.whitelist != null && !this.scroll.whitelist[S])) {
                  this.scroll.update();
                  var N = this.getNativeRange();
                  if (!(N == null || !N.native.collapsed || u.default.query(S, u.default.Scope.BLOCK))) {
                    if (N.start.node !== this.cursor.textNode) {
                      var T = u.default.find(N.start.node, !1);
                      if (T == null)
                        return;
                      if (T instanceof u.default.Leaf) {
                        var C = T.split(N.start.offset);
                        T.parent.insertBefore(this.cursor, C);
                      } else
                        T.insertBefore(this.cursor, N.start.node);
                      this.cursor.attach();
                    }
                    this.cursor.format(S, O), this.scroll.optimize(), this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length), this.update();
                  }
                }
              }
            }, {
              key: "getBounds",
              value: function(S) {
                var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, N = this.scroll.length();
                S = Math.min(S, N - 1), O = Math.min(S + O, N - 1) - S;
                var T = void 0, C = this.scroll.leaf(S), D = a(C, 2), H = D[0], U = D[1];
                if (H == null)
                  return null;
                var K = H.position(U, !0), q = a(K, 2);
                T = q[0], U = q[1];
                var P = document.createRange();
                if (O > 0) {
                  P.setStart(T, U);
                  var A = this.scroll.leaf(S + O), M = a(A, 2);
                  if (H = M[0], U = M[1], H == null)
                    return null;
                  var R = H.position(U, !0), z = a(R, 2);
                  return T = z[0], U = z[1], P.setEnd(T, U), P.getBoundingClientRect();
                } else {
                  var B = "left", I = void 0;
                  return T instanceof Text ? (U < T.data.length ? (P.setStart(T, U), P.setEnd(T, U + 1)) : (P.setStart(T, U - 1), P.setEnd(T, U), B = "right"), I = P.getBoundingClientRect()) : (I = H.domNode.getBoundingClientRect(), U > 0 && (B = "right")), {
                    bottom: I.top + I.height,
                    height: I.height,
                    left: I[B],
                    right: I[B],
                    top: I.top,
                    width: 0
                  };
                }
              }
            }, {
              key: "getNativeRange",
              value: function() {
                var S = document.getSelection();
                if (S == null || S.rangeCount <= 0)
                  return null;
                var O = S.getRangeAt(0);
                if (O == null)
                  return null;
                var N = this.normalizeNative(O);
                return p.info("getNativeRange", N), N;
              }
            }, {
              key: "getRange",
              value: function() {
                var S = this.getNativeRange();
                if (S == null)
                  return [null, null];
                var O = this.normalizedToRange(S);
                return [O, S];
              }
            }, {
              key: "hasFocus",
              value: function() {
                return document.activeElement === this.root;
              }
            }, {
              key: "normalizedToRange",
              value: function(S) {
                var O = this, N = [[S.start.node, S.start.offset]];
                S.native.collapsed || N.push([S.end.node, S.end.offset]);
                var T = N.map(function(H) {
                  var U = a(H, 2), K = U[0], q = U[1], P = u.default.find(K, !0), A = P.offset(O.scroll);
                  return q === 0 ? A : P instanceof u.default.Container ? A + P.length() : A + P.index(K, q);
                }), C = Math.min(Math.max.apply(Math, g(T)), this.scroll.length() - 1), D = Math.min.apply(Math, [C].concat(g(T)));
                return new x(D, C - D);
              }
            }, {
              key: "normalizeNative",
              value: function(S) {
                if (!E(this.root, S.startContainer) || !S.collapsed && !E(this.root, S.endContainer))
                  return null;
                var O = {
                  start: { node: S.startContainer, offset: S.startOffset },
                  end: { node: S.endContainer, offset: S.endOffset },
                  native: S
                };
                return [O.start, O.end].forEach(function(N) {
                  for (var T = N.node, C = N.offset; !(T instanceof Text) && T.childNodes.length > 0; )
                    if (T.childNodes.length > C)
                      T = T.childNodes[C], C = 0;
                    else if (T.childNodes.length === C)
                      T = T.lastChild, C = T instanceof Text ? T.data.length : T.childNodes.length + 1;
                    else
                      break;
                  N.node = T, N.offset = C;
                }), O;
              }
            }, {
              key: "rangeToNative",
              value: function(S) {
                var O = this, N = S.collapsed ? [S.index] : [S.index, S.index + S.length], T = [], C = this.scroll.length();
                return N.forEach(function(D, H) {
                  D = Math.min(C - 1, D);
                  var U = void 0, K = O.scroll.leaf(D), q = a(K, 2), P = q[0], A = q[1], M = P.position(A, H !== 0), R = a(M, 2);
                  U = R[0], A = R[1], T.push(U, A);
                }), T.length < 2 && (T = T.concat(T)), T;
              }
            }, {
              key: "scrollIntoView",
              value: function(S) {
                var O = this.lastRange;
                if (O != null) {
                  var N = this.getBounds(O.index, O.length);
                  if (N != null) {
                    var T = this.scroll.length() - 1, C = this.scroll.line(Math.min(O.index, T)), D = a(C, 1), H = D[0], U = H;
                    if (O.length > 0) {
                      var K = this.scroll.line(Math.min(O.index + O.length, T)), q = a(K, 1);
                      U = q[0];
                    }
                    if (!(H == null || U == null)) {
                      var P = S.getBoundingClientRect();
                      N.top < P.top ? S.scrollTop -= P.top - N.top : N.bottom > P.bottom && (S.scrollTop += N.bottom - P.bottom);
                    }
                  }
                }
              }
            }, {
              key: "setNativeRange",
              value: function(S, O) {
                var N = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : S, T = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : O, C = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !1;
                if (p.info("setNativeRange", S, O, N, T), !(S != null && (this.root.parentNode == null || S.parentNode == null || N.parentNode == null))) {
                  var D = document.getSelection();
                  if (D != null)
                    if (S != null) {
                      this.hasFocus() || this.root.focus();
                      var H = (this.getNativeRange() || {}).native;
                      if (H == null || C || S !== H.startContainer || O !== H.startOffset || N !== H.endContainer || T !== H.endOffset) {
                        S.tagName == "BR" && (O = [].indexOf.call(S.parentNode.childNodes, S), S = S.parentNode), N.tagName == "BR" && (T = [].indexOf.call(N.parentNode.childNodes, N), N = N.parentNode);
                        var U = document.createRange();
                        U.setStart(S, O), U.setEnd(N, T), D.removeAllRanges(), D.addRange(U);
                      }
                    } else
                      D.removeAllRanges(), this.root.blur(), document.body.focus();
                }
              }
            }, {
              key: "setRange",
              value: function(S) {
                var O = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, N = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : y.default.sources.API;
                if (typeof O == "string" && (N = O, O = !1), p.info("setRange", S), S != null) {
                  var T = this.rangeToNative(S);
                  this.setNativeRange.apply(this, g(T).concat([O]));
                } else
                  this.setNativeRange(null);
                this.update(N);
              }
            }, {
              key: "update",
              value: function() {
                var S = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : y.default.sources.USER, O = this.lastRange, N = this.getRange(), T = a(N, 2), C = T[0], D = T[1];
                if (this.lastRange = C, this.lastRange != null && (this.savedRange = this.lastRange), !(0, s.default)(O, this.lastRange)) {
                  var H;
                  !this.composing && D != null && D.native.collapsed && D.start.node !== this.cursor.textNode && this.cursor.restore();
                  var U = [y.default.events.SELECTION_CHANGE, (0, h.default)(this.lastRange), (0, h.default)(O), S];
                  if ((H = this.emitter).emit.apply(H, [y.default.events.EDITOR_CHANGE].concat(U)), S !== y.default.sources.SILENT) {
                    var K;
                    (K = this.emitter).emit.apply(K, U);
                  }
                }
              }
            }]), k;
          }();
          function E(k, j) {
            try {
              j.parentNode;
            } catch {
              return !1;
            }
            return j instanceof Text && (j = j.parentNode), k.contains(j);
          }
          r.Range = x, r.default = _;
        },
        /* 16 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(m, b) {
              for (var v = 0; v < b.length; v++) {
                var g = b[v];
                g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(m, g.key, g);
              }
            }
            return function(m, b, v) {
              return b && y(m.prototype, b), v && y(m, v), m;
            };
          }(), o = function y(m, b, v) {
            m === null && (m = Function.prototype);
            var g = Object.getOwnPropertyDescriptor(m, b);
            if (g === void 0) {
              var w = Object.getPrototypeOf(m);
              return w === null ? void 0 : y(w, b, v);
            } else {
              if ("value" in g)
                return g.value;
              var p = g.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, l = i(0), u = f(l);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function h(y, m) {
            if (!(y instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, m) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : y;
          }
          function s(y, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            y.prototype = Object.create(m && m.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(y, m) : y.__proto__ = m);
          }
          var d = function(y) {
            s(m, y);
            function m() {
              return h(this, m), c(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return a(m, [{
              key: "insertInto",
              value: function(v, g) {
                v.children.length === 0 ? o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "insertInto", this).call(this, v, g) : this.remove();
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
            }]), m;
          }(u.default.Embed);
          d.blotName = "break", d.tagName = "BR", r.default = d;
        },
        /* 17 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, d) {
              s.__proto__ = d;
            } || function(s, d) {
              for (var y in d)
                d.hasOwnProperty(y) && (s[y] = d[y]);
            };
            return function(s, d) {
              c(s, d);
              function y() {
                this.constructor = s;
              }
              s.prototype = d === null ? Object.create(d) : (y.prototype = d.prototype, new y());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(44), l = i(30), u = i(1), f = (
            /** @class */
            function(c) {
              a(s, c);
              function s(d) {
                var y = c.call(this, d) || this;
                return y.build(), y;
              }
              return s.prototype.appendChild = function(d) {
                this.insertBefore(d);
              }, s.prototype.attach = function() {
                c.prototype.attach.call(this), this.children.forEach(function(d) {
                  d.attach();
                });
              }, s.prototype.build = function() {
                var d = this;
                this.children = new o.default(), [].slice.call(this.domNode.childNodes).reverse().forEach(function(y) {
                  try {
                    var m = h(y);
                    d.insertBefore(m, d.children.head || void 0);
                  } catch (b) {
                    if (b instanceof u.ParchmentError)
                      return;
                    throw b;
                  }
                });
              }, s.prototype.deleteAt = function(d, y) {
                if (d === 0 && y === this.length())
                  return this.remove();
                this.children.forEachAt(d, y, function(m, b, v) {
                  m.deleteAt(b, v);
                });
              }, s.prototype.descendant = function(d, y) {
                var m = this.children.find(y), b = m[0], v = m[1];
                return d.blotName == null && d(b) || d.blotName != null && b instanceof d ? [b, v] : b instanceof s ? b.descendant(d, v) : [null, -1];
              }, s.prototype.descendants = function(d, y, m) {
                y === void 0 && (y = 0), m === void 0 && (m = Number.MAX_VALUE);
                var b = [], v = m;
                return this.children.forEachAt(y, m, function(g, w, p) {
                  (d.blotName == null && d(g) || d.blotName != null && g instanceof d) && b.push(g), g instanceof s && (b = b.concat(g.descendants(d, w, v))), v -= p;
                }), b;
              }, s.prototype.detach = function() {
                this.children.forEach(function(d) {
                  d.detach();
                }), c.prototype.detach.call(this);
              }, s.prototype.formatAt = function(d, y, m, b) {
                this.children.forEachAt(d, y, function(v, g, w) {
                  v.formatAt(g, w, m, b);
                });
              }, s.prototype.insertAt = function(d, y, m) {
                var b = this.children.find(d), v = b[0], g = b[1];
                if (v)
                  v.insertAt(g, y, m);
                else {
                  var w = m == null ? u.create("text", y) : u.create(y, m);
                  this.appendChild(w);
                }
              }, s.prototype.insertBefore = function(d, y) {
                if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function(m) {
                  return d instanceof m;
                }))
                  throw new u.ParchmentError("Cannot insert " + d.statics.blotName + " into " + this.statics.blotName);
                d.insertInto(this, y);
              }, s.prototype.length = function() {
                return this.children.reduce(function(d, y) {
                  return d + y.length();
                }, 0);
              }, s.prototype.moveChildren = function(d, y) {
                this.children.forEach(function(m) {
                  d.insertBefore(m, y);
                });
              }, s.prototype.optimize = function(d) {
                if (c.prototype.optimize.call(this, d), this.children.length === 0)
                  if (this.statics.defaultChild != null) {
                    var y = u.create(this.statics.defaultChild);
                    this.appendChild(y), y.optimize(d);
                  } else
                    this.remove();
              }, s.prototype.path = function(d, y) {
                y === void 0 && (y = !1);
                var m = this.children.find(d, y), b = m[0], v = m[1], g = [[this, d]];
                return b instanceof s ? g.concat(b.path(v, y)) : (b != null && g.push([b, v]), g);
              }, s.prototype.removeChild = function(d) {
                this.children.remove(d);
              }, s.prototype.replace = function(d) {
                d instanceof s && d.moveChildren(this), c.prototype.replace.call(this, d);
              }, s.prototype.split = function(d, y) {
                if (y === void 0 && (y = !1), !y) {
                  if (d === 0)
                    return this;
                  if (d === this.length())
                    return this.next;
                }
                var m = this.clone();
                return this.parent.insertBefore(m, this.next), this.children.forEachAt(d, this.length(), function(b, v, g) {
                  b = b.split(v, y), m.appendChild(b);
                }), m;
              }, s.prototype.unwrap = function() {
                this.moveChildren(this.parent, this.next), this.remove();
              }, s.prototype.update = function(d, y) {
                var m = this, b = [], v = [];
                d.forEach(function(g) {
                  g.target === m.domNode && g.type === "childList" && (b.push.apply(b, g.addedNodes), v.push.apply(v, g.removedNodes));
                }), v.forEach(function(g) {
                  if (!(g.parentNode != null && // @ts-ignore
                  g.tagName !== "IFRAME" && document.body.compareDocumentPosition(g) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
                    var w = u.find(g);
                    w != null && (w.domNode.parentNode == null || w.domNode.parentNode === m.domNode) && w.detach();
                  }
                }), b.filter(function(g) {
                  return g.parentNode == m.domNode;
                }).sort(function(g, w) {
                  return g === w ? 0 : g.compareDocumentPosition(w) & Node.DOCUMENT_POSITION_FOLLOWING ? 1 : -1;
                }).forEach(function(g) {
                  var w = null;
                  g.nextSibling != null && (w = u.find(g.nextSibling));
                  var p = h(g);
                  (p.next != w || p.next == null) && (p.parent != null && p.parent.removeChild(m), m.insertBefore(p, w || void 0));
                });
              }, s;
            }(l.default)
          );
          function h(c) {
            var s = u.find(c);
            if (s == null)
              try {
                s = u.create(c);
              } catch {
                s = u.create(u.Scope.INLINE), [].slice.call(c.childNodes).forEach(function(y) {
                  s.domNode.appendChild(y);
                }), c.parentNode && c.parentNode.replaceChild(s.domNode, c), s.attach();
              }
            return s;
          }
          r.default = f;
        },
        /* 18 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, d) {
              s.__proto__ = d;
            } || function(s, d) {
              for (var y in d)
                d.hasOwnProperty(y) && (s[y] = d[y]);
            };
            return function(s, d) {
              c(s, d);
              function y() {
                this.constructor = s;
              }
              s.prototype = d === null ? Object.create(d) : (y.prototype = d.prototype, new y());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(12), l = i(31), u = i(17), f = i(1), h = (
            /** @class */
            function(c) {
              a(s, c);
              function s(d) {
                var y = c.call(this, d) || this;
                return y.attributes = new l.default(y.domNode), y;
              }
              return s.formats = function(d) {
                if (typeof this.tagName == "string")
                  return !0;
                if (Array.isArray(this.tagName))
                  return d.tagName.toLowerCase();
              }, s.prototype.format = function(d, y) {
                var m = f.query(d);
                m instanceof o.default ? this.attributes.attribute(m, y) : y && m != null && (d !== this.statics.blotName || this.formats()[d] !== y) && this.replaceWith(d, y);
              }, s.prototype.formats = function() {
                var d = this.attributes.values(), y = this.statics.formats(this.domNode);
                return y != null && (d[this.statics.blotName] = y), d;
              }, s.prototype.replaceWith = function(d, y) {
                var m = c.prototype.replaceWith.call(this, d, y);
                return this.attributes.copy(m), m;
              }, s.prototype.update = function(d, y) {
                var m = this;
                c.prototype.update.call(this, d, y), d.some(function(b) {
                  return b.target === m.domNode && b.type === "attributes";
                }) && this.attributes.build();
              }, s.prototype.wrap = function(d, y) {
                var m = c.prototype.wrap.call(this, d, y);
                return m instanceof s && m.statics.scope === this.statics.scope && this.attributes.move(m), m;
              }, s;
            }(u.default)
          );
          r.default = h;
        },
        /* 19 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, c) {
              h.__proto__ = c;
            } || function(h, c) {
              for (var s in c)
                c.hasOwnProperty(s) && (h[s] = c[s]);
            };
            return function(h, c) {
              f(h, c);
              function s() {
                this.constructor = h;
              }
              h.prototype = c === null ? Object.create(c) : (s.prototype = c.prototype, new s());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(30), l = i(1), u = (
            /** @class */
            function(f) {
              a(h, f);
              function h() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return h.value = function(c) {
                return !0;
              }, h.prototype.index = function(c, s) {
                return this.domNode === c || this.domNode.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_CONTAINED_BY ? Math.min(s, 1) : -1;
              }, h.prototype.position = function(c, s) {
                var d = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
                return c > 0 && (d += 1), [this.parent.domNode, d];
              }, h.prototype.value = function() {
                var c;
                return c = {}, c[this.statics.blotName] = this.statics.value(this.domNode) || !0, c;
              }, h.scope = l.Scope.INLINE_BLOT, h;
            }(o.default)
          );
          r.default = u;
        },
        /* 20 */
        /***/
        function(n, r, i) {
          var a = i(11), o = i(3), l = {
            attributes: {
              compose: function(f, h, c) {
                typeof f != "object" && (f = {}), typeof h != "object" && (h = {});
                var s = o(!0, {}, h);
                c || (s = Object.keys(s).reduce(function(y, m) {
                  return s[m] != null && (y[m] = s[m]), y;
                }, {}));
                for (var d in f)
                  f[d] !== void 0 && h[d] === void 0 && (s[d] = f[d]);
                return Object.keys(s).length > 0 ? s : void 0;
              },
              diff: function(f, h) {
                typeof f != "object" && (f = {}), typeof h != "object" && (h = {});
                var c = Object.keys(f).concat(Object.keys(h)).reduce(function(s, d) {
                  return a(f[d], h[d]) || (s[d] = h[d] === void 0 ? null : h[d]), s;
                }, {});
                return Object.keys(c).length > 0 ? c : void 0;
              },
              transform: function(f, h, c) {
                if (typeof f != "object")
                  return h;
                if (typeof h == "object") {
                  if (!c)
                    return h;
                  var s = Object.keys(h).reduce(function(d, y) {
                    return f[y] === void 0 && (d[y] = h[y]), d;
                  }, {});
                  return Object.keys(s).length > 0 ? s : void 0;
                }
              }
            },
            iterator: function(f) {
              return new u(f);
            },
            length: function(f) {
              return typeof f.delete == "number" ? f.delete : typeof f.retain == "number" ? f.retain : typeof f.insert == "string" ? f.insert.length : 1;
            }
          };
          function u(f) {
            this.ops = f, this.index = 0, this.offset = 0;
          }
          u.prototype.hasNext = function() {
            return this.peekLength() < 1 / 0;
          }, u.prototype.next = function(f) {
            f || (f = 1 / 0);
            var h = this.ops[this.index];
            if (h) {
              var c = this.offset, s = l.length(h);
              if (f >= s - c ? (f = s - c, this.index += 1, this.offset = 0) : this.offset += f, typeof h.delete == "number")
                return { delete: f };
              var d = {};
              return h.attributes && (d.attributes = h.attributes), typeof h.retain == "number" ? d.retain = f : typeof h.insert == "string" ? d.insert = h.insert.substr(c, f) : d.insert = h.insert, d;
            } else
              return { retain: 1 / 0 };
          }, u.prototype.peek = function() {
            return this.ops[this.index];
          }, u.prototype.peekLength = function() {
            return this.ops[this.index] ? l.length(this.ops[this.index]) - this.offset : 1 / 0;
          }, u.prototype.peekType = function() {
            return this.ops[this.index] ? typeof this.ops[this.index].delete == "number" ? "delete" : typeof this.ops[this.index].retain == "number" ? "retain" : "insert" : "retain";
          }, u.prototype.rest = function() {
            if (this.hasNext()) {
              if (this.offset === 0)
                return this.ops.slice(this.index);
              var f = this.offset, h = this.index, c = this.next(), s = this.ops.slice(this.index);
              return this.offset = f, this.index = h, [c].concat(s);
            } else
              return [];
          }, n.exports = l;
        },
        /* 21 */
        /***/
        function(n, r) {
          var i = function() {
            function a(m, b) {
              return b != null && m instanceof b;
            }
            var o;
            try {
              o = Map;
            } catch {
              o = function() {
              };
            }
            var l;
            try {
              l = Set;
            } catch {
              l = function() {
              };
            }
            var u;
            try {
              u = Promise;
            } catch {
              u = function() {
              };
            }
            function f(m, b, v, g, w) {
              typeof b == "object" && (v = b.depth, g = b.prototype, w = b.includeNonEnumerable, b = b.circular);
              var p = [], x = [], _ = typeof Buffer < "u";
              typeof b > "u" && (b = !0), typeof v > "u" && (v = 1 / 0);
              function E(k, j) {
                if (k === null)
                  return null;
                if (j === 0)
                  return k;
                var S, O;
                if (typeof k != "object")
                  return k;
                if (a(k, o))
                  S = new o();
                else if (a(k, l))
                  S = new l();
                else if (a(k, u))
                  S = new u(function(P, A) {
                    k.then(function(M) {
                      P(E(M, j - 1));
                    }, function(M) {
                      A(E(M, j - 1));
                    });
                  });
                else if (f.__isArray(k))
                  S = [];
                else if (f.__isRegExp(k))
                  S = new RegExp(k.source, y(k)), k.lastIndex && (S.lastIndex = k.lastIndex);
                else if (f.__isDate(k))
                  S = new Date(k.getTime());
                else {
                  if (_ && Buffer.isBuffer(k))
                    return Buffer.allocUnsafe ? S = Buffer.allocUnsafe(k.length) : S = new Buffer(k.length), k.copy(S), S;
                  a(k, Error) ? S = Object.create(k) : typeof g > "u" ? (O = Object.getPrototypeOf(k), S = Object.create(O)) : (S = Object.create(g), O = g);
                }
                if (b) {
                  var N = p.indexOf(k);
                  if (N != -1)
                    return x[N];
                  p.push(k), x.push(S);
                }
                a(k, o) && k.forEach(function(P, A) {
                  var M = E(A, j - 1), R = E(P, j - 1);
                  S.set(M, R);
                }), a(k, l) && k.forEach(function(P) {
                  var A = E(P, j - 1);
                  S.add(A);
                });
                for (var T in k) {
                  var C;
                  O && (C = Object.getOwnPropertyDescriptor(O, T)), !(C && C.set == null) && (S[T] = E(k[T], j - 1));
                }
                if (Object.getOwnPropertySymbols)
                  for (var D = Object.getOwnPropertySymbols(k), T = 0; T < D.length; T++) {
                    var H = D[T], U = Object.getOwnPropertyDescriptor(k, H);
                    U && !U.enumerable && !w || (S[H] = E(k[H], j - 1), U.enumerable || Object.defineProperty(S, H, {
                      enumerable: !1
                    }));
                  }
                if (w)
                  for (var K = Object.getOwnPropertyNames(k), T = 0; T < K.length; T++) {
                    var q = K[T], U = Object.getOwnPropertyDescriptor(k, q);
                    U && U.enumerable || (S[q] = E(k[q], j - 1), Object.defineProperty(S, q, {
                      enumerable: !1
                    }));
                  }
                return S;
              }
              return E(m, v);
            }
            f.clonePrototype = function(b) {
              if (b === null)
                return null;
              var v = function() {
              };
              return v.prototype = b, new v();
            };
            function h(m) {
              return Object.prototype.toString.call(m);
            }
            f.__objToStr = h;
            function c(m) {
              return typeof m == "object" && h(m) === "[object Date]";
            }
            f.__isDate = c;
            function s(m) {
              return typeof m == "object" && h(m) === "[object Array]";
            }
            f.__isArray = s;
            function d(m) {
              return typeof m == "object" && h(m) === "[object RegExp]";
            }
            f.__isRegExp = d;
            function y(m) {
              var b = "";
              return m.global && (b += "g"), m.ignoreCase && (b += "i"), m.multiline && (b += "m"), b;
            }
            return f.__getRegExpFlags = y, f;
          }();
          typeof n == "object" && n.exports && (n.exports = i);
        },
        /* 22 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function S(O, N) {
              var T = [], C = !0, D = !1, H = void 0;
              try {
                for (var U = O[Symbol.iterator](), K; !(C = (K = U.next()).done) && (T.push(K.value), !(N && T.length === N)); C = !0)
                  ;
              } catch (q) {
                D = !0, H = q;
              } finally {
                try {
                  !C && U.return && U.return();
                } finally {
                  if (D)
                    throw H;
                }
              }
              return T;
            }
            return function(O, N) {
              if (Array.isArray(O))
                return O;
              if (Symbol.iterator in Object(O))
                return S(O, N);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function S(O, N) {
              for (var T = 0; T < N.length; T++) {
                var C = N[T];
                C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(O, C.key, C);
              }
            }
            return function(O, N, T) {
              return N && S(O.prototype, N), T && S(O, T), O;
            };
          }(), l = function S(O, N, T) {
            O === null && (O = Function.prototype);
            var C = Object.getOwnPropertyDescriptor(O, N);
            if (C === void 0) {
              var D = Object.getPrototypeOf(O);
              return D === null ? void 0 : S(D, N, T);
            } else {
              if ("value" in C)
                return C.value;
              var H = C.get;
              return H === void 0 ? void 0 : H.call(T);
            }
          }, u = i(0), f = p(u), h = i(8), c = p(h), s = i(4), d = p(s), y = i(16), m = p(y), b = i(13), v = p(b), g = i(25), w = p(g);
          function p(S) {
            return S && S.__esModule ? S : { default: S };
          }
          function x(S, O) {
            if (!(S instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function _(S, O) {
            if (!S)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return O && (typeof O == "object" || typeof O == "function") ? O : S;
          }
          function E(S, O) {
            if (typeof O != "function" && O !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            S.prototype = Object.create(O && O.prototype, { constructor: { value: S, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(S, O) : S.__proto__ = O);
          }
          function k(S) {
            return S instanceof d.default || S instanceof s.BlockEmbed;
          }
          var j = function(S) {
            E(O, S);
            function O(N, T) {
              x(this, O);
              var C = _(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, N));
              return C.emitter = T.emitter, Array.isArray(T.whitelist) && (C.whitelist = T.whitelist.reduce(function(D, H) {
                return D[H] = !0, D;
              }, {})), C.domNode.addEventListener("DOMNodeInserted", function() {
              }), C.optimize(), C.enable(), C;
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
              value: function(T, C) {
                var D = this.line(T), H = a(D, 2), U = H[0], K = H[1], q = this.line(T + C), P = a(q, 1), A = P[0];
                if (l(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "deleteAt", this).call(this, T, C), A != null && U !== A && K > 0) {
                  if (U instanceof s.BlockEmbed || A instanceof s.BlockEmbed) {
                    this.optimize();
                    return;
                  }
                  if (U instanceof v.default) {
                    var M = U.newlineIndex(U.length(), !0);
                    if (M > -1 && (U = U.split(M + 1), U === A)) {
                      this.optimize();
                      return;
                    }
                  } else if (A instanceof v.default) {
                    var R = A.newlineIndex(0);
                    R > -1 && A.split(R + 1);
                  }
                  var z = A.children.head instanceof m.default ? null : A.children.head;
                  U.moveChildren(A, z), U.remove();
                }
                this.optimize();
              }
            }, {
              key: "enable",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !0;
                this.domNode.setAttribute("contenteditable", T);
              }
            }, {
              key: "formatAt",
              value: function(T, C, D, H) {
                this.whitelist != null && !this.whitelist[D] || (l(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "formatAt", this).call(this, T, C, D, H), this.optimize());
              }
            }, {
              key: "insertAt",
              value: function(T, C, D) {
                if (!(D != null && this.whitelist != null && !this.whitelist[C])) {
                  if (T >= this.length())
                    if (D == null || f.default.query(C, f.default.Scope.BLOCK) == null) {
                      var H = f.default.create(this.statics.defaultChild);
                      this.appendChild(H), D == null && C.endsWith(`
`) && (C = C.slice(0, -1)), H.insertAt(0, C, D);
                    } else {
                      var U = f.default.create(C, D);
                      this.appendChild(U);
                    }
                  else
                    l(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertAt", this).call(this, T, C, D);
                  this.optimize();
                }
              }
            }, {
              key: "insertBefore",
              value: function(T, C) {
                if (T.statics.scope === f.default.Scope.INLINE_BLOT) {
                  var D = f.default.create(this.statics.defaultChild);
                  D.appendChild(T), T = D;
                }
                l(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "insertBefore", this).call(this, T, C);
              }
            }, {
              key: "leaf",
              value: function(T) {
                return this.path(T).pop() || [null, -1];
              }
            }, {
              key: "line",
              value: function(T) {
                return T === this.length() ? this.line(T - 1) : this.descendant(k, T);
              }
            }, {
              key: "lines",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0, C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Number.MAX_VALUE, D = function H(U, K, q) {
                  var P = [], A = q;
                  return U.children.forEachAt(K, q, function(M, R, z) {
                    k(M) ? P.push(M) : M instanceof f.default.Container && (P = P.concat(H(M, R, A))), A -= z;
                  }), P;
                };
                return D(this, T, C);
              }
            }, {
              key: "optimize",
              value: function() {
                var T = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                this.batch !== !0 && (l(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "optimize", this).call(this, T, C), T.length > 0 && this.emitter.emit(c.default.events.SCROLL_OPTIMIZE, T, C));
              }
            }, {
              key: "path",
              value: function(T) {
                return l(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "path", this).call(this, T).slice(1);
              }
            }, {
              key: "update",
              value: function(T) {
                if (this.batch !== !0) {
                  var C = c.default.sources.USER;
                  typeof T == "string" && (C = T), Array.isArray(T) || (T = this.observer.takeRecords()), T.length > 0 && this.emitter.emit(c.default.events.SCROLL_BEFORE_UPDATE, C, T), l(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "update", this).call(this, T.concat([])), T.length > 0 && this.emitter.emit(c.default.events.SCROLL_UPDATE, C, T);
                }
              }
            }]), O;
          }(f.default.Scroll);
          j.blotName = "scroll", j.className = "ql-editor", j.tagName = "DIV", j.defaultChild = "block", j.allowedChildren = [d.default, s.BlockEmbed, w.default], r.default = j;
        },
        /* 23 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.SHORTKEY = r.default = void 0;
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(I) {
            return typeof I;
          } : function(I) {
            return I && typeof Symbol == "function" && I.constructor === Symbol && I !== Symbol.prototype ? "symbol" : typeof I;
          }, o = function() {
            function I($, W) {
              var Y = [], V = !0, ee = !1, Z = void 0;
              try {
                for (var le = $[Symbol.iterator](), ce; !(V = (ce = le.next()).done) && (Y.push(ce.value), !(W && Y.length === W)); V = !0)
                  ;
              } catch (he) {
                ee = !0, Z = he;
              } finally {
                try {
                  !V && le.return && le.return();
                } finally {
                  if (ee)
                    throw Z;
                }
              }
              return Y;
            }
            return function($, W) {
              if (Array.isArray($))
                return $;
              if (Symbol.iterator in Object($))
                return I($, W);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), l = function() {
            function I($, W) {
              for (var Y = 0; Y < W.length; Y++) {
                var V = W[Y];
                V.enumerable = V.enumerable || !1, V.configurable = !0, "value" in V && (V.writable = !0), Object.defineProperty($, V.key, V);
              }
            }
            return function($, W, Y) {
              return W && I($.prototype, W), Y && I($, Y), $;
            };
          }(), u = i(21), f = S(u), h = i(11), c = S(h), s = i(3), d = S(s), y = i(2), m = S(y), b = i(20), v = S(b), g = i(0), w = S(g), p = i(5), x = S(p), _ = i(10), E = S(_), k = i(9), j = S(k);
          function S(I) {
            return I && I.__esModule ? I : { default: I };
          }
          function O(I, $, W) {
            return $ in I ? Object.defineProperty(I, $, { value: W, enumerable: !0, configurable: !0, writable: !0 }) : I[$] = W, I;
          }
          function N(I, $) {
            if (!(I instanceof $))
              throw new TypeError("Cannot call a class as a function");
          }
          function T(I, $) {
            if (!I)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return $ && (typeof $ == "object" || typeof $ == "function") ? $ : I;
          }
          function C(I, $) {
            if (typeof $ != "function" && $ !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof $);
            I.prototype = Object.create($ && $.prototype, { constructor: { value: I, enumerable: !1, writable: !0, configurable: !0 } }), $ && (Object.setPrototypeOf ? Object.setPrototypeOf(I, $) : I.__proto__ = $);
          }
          var D = (0, E.default)("quill:keyboard"), H = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey", U = function(I) {
            C($, I), l($, null, [{
              key: "match",
              value: function(Y, V) {
                return V = B(V), ["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function(ee) {
                  return !!V[ee] !== Y[ee] && V[ee] !== null;
                }) ? !1 : V.key === (Y.which || Y.keyCode);
              }
            }]);
            function $(W, Y) {
              N(this, $);
              var V = T(this, ($.__proto__ || Object.getPrototypeOf($)).call(this, W, Y));
              return V.bindings = {}, Object.keys(V.options.bindings).forEach(function(ee) {
                ee === "list autofill" && W.scroll.whitelist != null && !W.scroll.whitelist.list || V.options.bindings[ee] && V.addBinding(V.options.bindings[ee]);
              }), V.addBinding({ key: $.keys.ENTER, shiftKey: null }, M), V.addBinding({ key: $.keys.ENTER, metaKey: null, ctrlKey: null, altKey: null }, function() {
              }), /Firefox/i.test(navigator.userAgent) ? (V.addBinding({ key: $.keys.BACKSPACE }, { collapsed: !0 }, q), V.addBinding({ key: $.keys.DELETE }, { collapsed: !0 }, P)) : (V.addBinding({ key: $.keys.BACKSPACE }, { collapsed: !0, prefix: /^.?$/ }, q), V.addBinding({ key: $.keys.DELETE }, { collapsed: !0, suffix: /^.?$/ }, P)), V.addBinding({ key: $.keys.BACKSPACE }, { collapsed: !1 }, A), V.addBinding({ key: $.keys.DELETE }, { collapsed: !1 }, A), V.addBinding({ key: $.keys.BACKSPACE, altKey: null, ctrlKey: null, metaKey: null, shiftKey: null }, { collapsed: !0, offset: 0 }, q), V.listen(), V;
            }
            return l($, [{
              key: "addBinding",
              value: function(Y) {
                var V = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, ee = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, Z = B(Y);
                if (Z == null || Z.key == null)
                  return D.warn("Attempted to add invalid keyboard binding", Z);
                typeof V == "function" && (V = { handler: V }), typeof ee == "function" && (ee = { handler: ee }), Z = (0, d.default)(Z, V, ee), this.bindings[Z.key] = this.bindings[Z.key] || [], this.bindings[Z.key].push(Z);
              }
            }, {
              key: "listen",
              value: function() {
                var Y = this;
                this.quill.root.addEventListener("keydown", function(V) {
                  if (!V.defaultPrevented) {
                    var ee = V.which || V.keyCode, Z = (Y.bindings[ee] || []).filter(function(xe) {
                      return $.match(V, xe);
                    });
                    if (Z.length !== 0) {
                      var le = Y.quill.getSelection();
                      if (!(le == null || !Y.quill.hasFocus())) {
                        var ce = Y.quill.getLine(le.index), he = o(ce, 2), Ae = he[0], Oe = he[1], G = Y.quill.getLeaf(le.index), Q = o(G, 2), re = Q[0], ie = Q[1], J = le.length === 0 ? [re, ie] : Y.quill.getLeaf(le.index + le.length), de = o(J, 2), X = de[0], ne = de[1], ge = re instanceof w.default.Text ? re.value().slice(0, ie) : "", ye = X instanceof w.default.Text ? X.value().slice(ne) : "", pe = {
                          collapsed: le.length === 0,
                          empty: le.length === 0 && Ae.length() <= 1,
                          format: Y.quill.getFormat(le),
                          offset: Oe,
                          prefix: ge,
                          suffix: ye
                        }, rt = Z.some(function(xe) {
                          if (xe.collapsed != null && xe.collapsed !== pe.collapsed || xe.empty != null && xe.empty !== pe.empty || xe.offset != null && xe.offset !== pe.offset)
                            return !1;
                          if (Array.isArray(xe.format)) {
                            if (xe.format.every(function(He) {
                              return pe.format[He] == null;
                            }))
                              return !1;
                          } else if (a(xe.format) === "object" && !Object.keys(xe.format).every(function(He) {
                            return xe.format[He] === !0 ? pe.format[He] != null : xe.format[He] === !1 ? pe.format[He] == null : (0, c.default)(xe.format[He], pe.format[He]);
                          }))
                            return !1;
                          return xe.prefix != null && !xe.prefix.test(pe.prefix) || xe.suffix != null && !xe.suffix.test(pe.suffix) ? !1 : xe.handler.call(Y, le, pe) !== !0;
                        });
                        rt && V.preventDefault();
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
              bold: z("bold"),
              italic: z("italic"),
              underline: z("underline"),
              indent: {
                // highlight tab or tab at beginning of list, indent or blockquote
                key: U.keys.TAB,
                format: ["blockquote", "indent", "list"],
                handler: function($, W) {
                  if (W.collapsed && W.offset !== 0)
                    return !0;
                  this.quill.format("indent", "+1", x.default.sources.USER);
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
                  this.quill.format("indent", "-1", x.default.sources.USER);
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
                  W.format.indent != null ? this.quill.format("indent", "-1", x.default.sources.USER) : W.format.list != null && this.quill.format("list", !1, x.default.sources.USER);
                }
              },
              "indent code-block": R(!0),
              "outdent code-block": R(!1),
              "remove tab": {
                key: U.keys.TAB,
                shiftKey: !0,
                collapsed: !0,
                prefix: /\t$/,
                handler: function($) {
                  this.quill.deleteText($.index - 1, 1, x.default.sources.USER);
                }
              },
              tab: {
                key: U.keys.TAB,
                handler: function($) {
                  this.quill.history.cutoff();
                  var W = new m.default().retain($.index).delete($.length).insert("	");
                  this.quill.updateContents(W, x.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection($.index + 1, x.default.sources.SILENT);
                }
              },
              "list empty enter": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: ["list"],
                empty: !0,
                handler: function($, W) {
                  this.quill.format("list", !1, x.default.sources.USER), W.format.indent && this.quill.format("indent", !1, x.default.sources.USER);
                }
              },
              "checklist enter": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: { list: "checked" },
                handler: function($) {
                  var W = this.quill.getLine($.index), Y = o(W, 2), V = Y[0], ee = Y[1], Z = (0, d.default)({}, V.formats(), { list: "checked" }), le = new m.default().retain($.index).insert(`
`, Z).retain(V.length() - ee - 1).retain(1, { list: "unchecked" });
                  this.quill.updateContents(le, x.default.sources.USER), this.quill.setSelection($.index + 1, x.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "header enter": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: ["header"],
                suffix: /^$/,
                handler: function($, W) {
                  var Y = this.quill.getLine($.index), V = o(Y, 2), ee = V[0], Z = V[1], le = new m.default().retain($.index).insert(`
`, W.format).retain(ee.length() - Z - 1).retain(1, { header: null });
                  this.quill.updateContents(le, x.default.sources.USER), this.quill.setSelection($.index + 1, x.default.sources.SILENT), this.quill.scrollIntoView();
                }
              },
              "list autofill": {
                key: " ",
                collapsed: !0,
                format: { list: !1 },
                prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                handler: function($, W) {
                  var Y = W.prefix.length, V = this.quill.getLine($.index), ee = o(V, 2), Z = ee[0], le = ee[1];
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
                  this.quill.insertText($.index, " ", x.default.sources.USER), this.quill.history.cutoff();
                  var he = new m.default().retain($.index - le).delete(Y + 1).retain(Z.length() - 2 - le).retain(1, { list: ce });
                  this.quill.updateContents(he, x.default.sources.USER), this.quill.history.cutoff(), this.quill.setSelection($.index - Y, x.default.sources.SILENT);
                }
              },
              "code exit": {
                key: U.keys.ENTER,
                collapsed: !0,
                format: ["code-block"],
                prefix: /\n\n$/,
                suffix: /^\s+$/,
                handler: function($) {
                  var W = this.quill.getLine($.index), Y = o(W, 2), V = Y[0], ee = Y[1], Z = new m.default().retain($.index + V.length() - ee - 2).retain(1, { "code-block": null }).delete(1);
                  this.quill.updateContents(Z, x.default.sources.USER);
                }
              },
              "embed left": K(U.keys.LEFT, !1),
              "embed left shift": K(U.keys.LEFT, !0),
              "embed right": K(U.keys.RIGHT, !1),
              "embed right shift": K(U.keys.RIGHT, !0)
            }
          };
          function K(I, $) {
            var W, Y = I === U.keys.LEFT ? "prefix" : "suffix";
            return W = {
              key: I,
              shiftKey: $,
              altKey: null
            }, O(W, Y, /^$/), O(W, "handler", function(ee) {
              var Z = ee.index;
              I === U.keys.RIGHT && (Z += ee.length + 1);
              var le = this.quill.getLeaf(Z), ce = o(le, 1), he = ce[0];
              return he instanceof w.default.Embed ? (I === U.keys.LEFT ? $ ? this.quill.setSelection(ee.index - 1, ee.length + 1, x.default.sources.USER) : this.quill.setSelection(ee.index - 1, x.default.sources.USER) : $ ? this.quill.setSelection(ee.index, ee.length + 1, x.default.sources.USER) : this.quill.setSelection(ee.index + ee.length + 1, x.default.sources.USER), !1) : !0;
            }), W;
          }
          function q(I, $) {
            if (!(I.index === 0 || this.quill.getLength() <= 1)) {
              var W = this.quill.getLine(I.index), Y = o(W, 1), V = Y[0], ee = {};
              if ($.offset === 0) {
                var Z = this.quill.getLine(I.index - 1), le = o(Z, 1), ce = le[0];
                if (ce != null && ce.length() > 1) {
                  var he = V.formats(), Ae = this.quill.getFormat(I.index - 1, 1);
                  ee = v.default.attributes.diff(he, Ae) || {};
                }
              }
              var Oe = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test($.prefix) ? 2 : 1;
              this.quill.deleteText(I.index - Oe, Oe, x.default.sources.USER), Object.keys(ee).length > 0 && this.quill.formatLine(I.index - Oe, Oe, ee, x.default.sources.USER), this.quill.focus();
            }
          }
          function P(I, $) {
            var W = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test($.suffix) ? 2 : 1;
            if (!(I.index >= this.quill.getLength() - W)) {
              var Y = {}, V = 0, ee = this.quill.getLine(I.index), Z = o(ee, 1), le = Z[0];
              if ($.offset >= le.length() - 1) {
                var ce = this.quill.getLine(I.index + 1), he = o(ce, 1), Ae = he[0];
                if (Ae) {
                  var Oe = le.formats(), G = this.quill.getFormat(I.index, 1);
                  Y = v.default.attributes.diff(Oe, G) || {}, V = Ae.length();
                }
              }
              this.quill.deleteText(I.index, W, x.default.sources.USER), Object.keys(Y).length > 0 && this.quill.formatLine(I.index + V - 1, W, Y, x.default.sources.USER);
            }
          }
          function A(I) {
            var $ = this.quill.getLines(I), W = {};
            if ($.length > 1) {
              var Y = $[0].formats(), V = $[$.length - 1].formats();
              W = v.default.attributes.diff(V, Y) || {};
            }
            this.quill.deleteText(I, x.default.sources.USER), Object.keys(W).length > 0 && this.quill.formatLine(I.index, 1, W, x.default.sources.USER), this.quill.setSelection(I.index, x.default.sources.SILENT), this.quill.focus();
          }
          function M(I, $) {
            var W = this;
            I.length > 0 && this.quill.scroll.deleteAt(I.index, I.length);
            var Y = Object.keys($.format).reduce(function(V, ee) {
              return w.default.query(ee, w.default.Scope.BLOCK) && !Array.isArray($.format[ee]) && (V[ee] = $.format[ee]), V;
            }, {});
            this.quill.insertText(I.index, `
`, Y, x.default.sources.USER), this.quill.setSelection(I.index + 1, x.default.sources.SILENT), this.quill.focus(), Object.keys($.format).forEach(function(V) {
              Y[V] == null && (Array.isArray($.format[V]) || V !== "link" && W.quill.format(V, $.format[V], x.default.sources.USER));
            });
          }
          function R(I) {
            return {
              key: U.keys.TAB,
              shiftKey: !I,
              format: { "code-block": !0 },
              handler: function(W) {
                var Y = w.default.query("code-block"), V = W.index, ee = W.length, Z = this.quill.scroll.descendant(Y, V), le = o(Z, 2), ce = le[0], he = le[1];
                if (ce != null) {
                  var Ae = this.quill.getIndex(ce), Oe = ce.newlineIndex(he, !0) + 1, G = ce.newlineIndex(Ae + he + ee), Q = ce.domNode.textContent.slice(Oe, G).split(`
`);
                  he = 0, Q.forEach(function(re, ie) {
                    I ? (ce.insertAt(Oe + he, Y.TAB), he += Y.TAB.length, ie === 0 ? V += Y.TAB.length : ee += Y.TAB.length) : re.startsWith(Y.TAB) && (ce.deleteAt(Oe + he, Y.TAB.length), he -= Y.TAB.length, ie === 0 ? V -= Y.TAB.length : ee -= Y.TAB.length), he += re.length + 1;
                  }), this.quill.update(x.default.sources.USER), this.quill.setSelection(V, ee, x.default.sources.SILENT);
                }
              }
            };
          }
          function z(I) {
            return {
              key: I[0].toUpperCase(),
              shortKey: !0,
              handler: function(W, Y) {
                this.quill.format(I, !Y.format[I], x.default.sources.USER);
              }
            };
          }
          function B(I) {
            if (typeof I == "string" || typeof I == "number")
              return B({ key: I });
            if ((typeof I > "u" ? "undefined" : a(I)) === "object" && (I = (0, f.default)(I, !1)), typeof I.key == "string")
              if (U.keys[I.key.toUpperCase()] != null)
                I.key = U.keys[I.key.toUpperCase()];
              else if (I.key.length === 1)
                I.key = I.key.toUpperCase().charCodeAt(0);
              else
                return null;
            return I.shortKey && (I[H] = I.shortKey, delete I.shortKey), I;
          }
          r.default = U, r.SHORTKEY = H;
        },
        /* 24 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function v(g, w) {
              var p = [], x = !0, _ = !1, E = void 0;
              try {
                for (var k = g[Symbol.iterator](), j; !(x = (j = k.next()).done) && (p.push(j.value), !(w && p.length === w)); x = !0)
                  ;
              } catch (S) {
                _ = !0, E = S;
              } finally {
                try {
                  !x && k.return && k.return();
                } finally {
                  if (_)
                    throw E;
                }
              }
              return p;
            }
            return function(g, w) {
              if (Array.isArray(g))
                return g;
              if (Symbol.iterator in Object(g))
                return v(g, w);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function v(g, w, p) {
            g === null && (g = Function.prototype);
            var x = Object.getOwnPropertyDescriptor(g, w);
            if (x === void 0) {
              var _ = Object.getPrototypeOf(g);
              return _ === null ? void 0 : v(_, w, p);
            } else {
              if ("value" in x)
                return x.value;
              var E = x.get;
              return E === void 0 ? void 0 : E.call(p);
            }
          }, l = function() {
            function v(g, w) {
              for (var p = 0; p < w.length; p++) {
                var x = w[p];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(g, x.key, x);
              }
            }
            return function(g, w, p) {
              return w && v(g.prototype, w), p && v(g, p), g;
            };
          }(), u = i(0), f = s(u), h = i(7), c = s(h);
          function s(v) {
            return v && v.__esModule ? v : { default: v };
          }
          function d(v, g) {
            if (!(v instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(v, g) {
            if (!v)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : v;
          }
          function m(v, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            v.prototype = Object.create(g && g.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(v, g) : v.__proto__ = g);
          }
          var b = function(v) {
            m(g, v), l(g, null, [{
              key: "value",
              value: function() {
              }
            }]);
            function g(w, p) {
              d(this, g);
              var x = y(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, w));
              return x.selection = p, x.textNode = document.createTextNode(g.CONTENTS), x.domNode.appendChild(x.textNode), x._length = 0, x;
            }
            return l(g, [{
              key: "detach",
              value: function() {
                this.parent != null && this.parent.removeChild(this);
              }
            }, {
              key: "format",
              value: function(p, x) {
                if (this._length !== 0)
                  return o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "format", this).call(this, p, x);
                for (var _ = this, E = 0; _ != null && _.statics.scope !== f.default.Scope.BLOCK_BLOT; )
                  E += _.offset(_.parent), _ = _.parent;
                _ != null && (this._length = g.CONTENTS.length, _.optimize(), _.formatAt(E, g.CONTENTS.length, p, x), this._length = 0);
              }
            }, {
              key: "index",
              value: function(p, x) {
                return p === this.textNode ? 0 : o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "index", this).call(this, p, x);
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
                o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "remove", this).call(this), this.parent = null;
              }
            }, {
              key: "restore",
              value: function() {
                if (!(this.selection.composing || this.parent == null)) {
                  var p = this.textNode, x = this.selection.getNativeRange(), _ = void 0, E = void 0, k = void 0;
                  if (x != null && x.start.node === p && x.end.node === p) {
                    var j = [p, x.start.offset, x.end.offset];
                    _ = j[0], E = j[1], k = j[2];
                  }
                  for (; this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode; )
                    this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
                  if (this.textNode.data !== g.CONTENTS) {
                    var S = this.textNode.data.split(g.CONTENTS).join("");
                    this.next instanceof c.default ? (_ = this.next.domNode, this.next.insertAt(0, S), this.textNode.data = g.CONTENTS) : (this.textNode.data = S, this.parent.insertBefore(f.default.create(this.textNode), this), this.textNode = document.createTextNode(g.CONTENTS), this.domNode.appendChild(this.textNode));
                  }
                  if (this.remove(), E != null) {
                    var O = [E, k].map(function(T) {
                      return Math.max(0, Math.min(_.data.length, T - 1));
                    }), N = a(O, 2);
                    return E = N[0], k = N[1], {
                      startNode: _,
                      startOffset: E,
                      endNode: _,
                      endOffset: k
                    };
                  }
                }
              }
            }, {
              key: "update",
              value: function(p, x) {
                var _ = this;
                if (p.some(function(k) {
                  return k.type === "characterData" && k.target === _.textNode;
                })) {
                  var E = this.restore();
                  E && (x.range = E);
                }
              }
            }, {
              key: "value",
              value: function() {
                return "";
              }
            }]), g;
          }(f.default.Embed);
          b.blotName = "cursor", b.className = "ql-cursor", b.tagName = "span", b.CONTENTS = "\uFEFF", r.default = b;
        },
        /* 25 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(0), o = f(a), l = i(4), u = f(l);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function h(y, m) {
            if (!(y instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, m) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : y;
          }
          function s(y, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            y.prototype = Object.create(m && m.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(y, m) : y.__proto__ = m);
          }
          var d = function(y) {
            s(m, y);
            function m() {
              return h(this, m), c(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return m;
          }(o.default.Container);
          d.allowedChildren = [u.default, l.BlockEmbed, d], r.default = d;
        },
        /* 26 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.ColorStyle = r.ColorClass = r.ColorAttributor = void 0;
          var a = function() {
            function b(v, g) {
              for (var w = 0; w < g.length; w++) {
                var p = g[w];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, g, w) {
              return g && b(v.prototype, g), w && b(v, w), v;
            };
          }(), o = function b(v, g, w) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, g);
            if (p === void 0) {
              var x = Object.getPrototypeOf(v);
              return x === null ? void 0 : b(x, g, w);
            } else {
              if ("value" in p)
                return p.value;
              var _ = p.get;
              return _ === void 0 ? void 0 : _.call(w);
            }
          }, l = i(0), u = f(l);
          function f(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function h(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function s(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var d = function(b) {
            s(v, b);
            function v() {
              return h(this, v), c(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "value",
              value: function(w) {
                var p = o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "value", this).call(this, w);
                return p.startsWith("rgb(") ? (p = p.replace(/^[^\d]+/, "").replace(/[^\d]+$/, ""), "#" + p.split(",").map(function(x) {
                  return ("00" + parseInt(x).toString(16)).slice(-2);
                }).join("")) : p;
              }
            }]), v;
          }(u.default.Attributor.Style), y = new u.default.Attributor.Class("color", "ql-color", {
            scope: u.default.Scope.INLINE
          }), m = new d("color", "color", {
            scope: u.default.Scope.INLINE
          });
          r.ColorAttributor = d, r.ColorClass = y, r.ColorStyle = m;
        },
        /* 27 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.sanitize = r.default = void 0;
          var a = function() {
            function m(b, v) {
              for (var g = 0; g < v.length; g++) {
                var w = v[g];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(b, w.key, w);
              }
            }
            return function(b, v, g) {
              return v && m(b.prototype, v), g && m(b, g), b;
            };
          }(), o = function m(b, v, g) {
            b === null && (b = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(b, v);
            if (w === void 0) {
              var p = Object.getPrototypeOf(b);
              return p === null ? void 0 : m(p, v, g);
            } else {
              if ("value" in w)
                return w.value;
              var x = w.get;
              return x === void 0 ? void 0 : x.call(g);
            }
          }, l = i(6), u = f(l);
          function f(m) {
            return m && m.__esModule ? m : { default: m };
          }
          function h(m, b) {
            if (!(m instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(m, b) {
            if (!m)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return b && (typeof b == "object" || typeof b == "function") ? b : m;
          }
          function s(m, b) {
            if (typeof b != "function" && b !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof b);
            m.prototype = Object.create(b && b.prototype, { constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(m, b) : m.__proto__ = b);
          }
          var d = function(m) {
            s(b, m);
            function b() {
              return h(this, b), c(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments));
            }
            return a(b, [{
              key: "format",
              value: function(g, w) {
                if (g !== this.statics.blotName || !w)
                  return o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "format", this).call(this, g, w);
                w = this.constructor.sanitize(w), this.domNode.setAttribute("href", w);
              }
            }], [{
              key: "create",
              value: function(g) {
                var w = o(b.__proto__ || Object.getPrototypeOf(b), "create", this).call(this, g);
                return g = this.sanitize(g), w.setAttribute("href", g), w.setAttribute("rel", "noopener noreferrer"), w.setAttribute("target", "_blank"), w;
              }
            }, {
              key: "formats",
              value: function(g) {
                return g.getAttribute("href");
              }
            }, {
              key: "sanitize",
              value: function(g) {
                return y(g, this.PROTOCOL_WHITELIST) ? g : this.SANITIZED_URL;
              }
            }]), b;
          }(u.default);
          d.blotName = "link", d.tagName = "A", d.SANITIZED_URL = "about:blank", d.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
          function y(m, b) {
            var v = document.createElement("a");
            v.href = m;
            var g = v.href.slice(0, v.href.indexOf(":"));
            return b.indexOf(g) > -1;
          }
          r.default = d, r.sanitize = y;
        },
        /* 28 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(b) {
            return typeof b;
          } : function(b) {
            return b && typeof Symbol == "function" && b.constructor === Symbol && b !== Symbol.prototype ? "symbol" : typeof b;
          }, o = function() {
            function b(v, g) {
              for (var w = 0; w < g.length; w++) {
                var p = g[w];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, g, w) {
              return g && b(v.prototype, g), w && b(v, w), v;
            };
          }(), l = i(23), u = c(l), f = i(107), h = c(f);
          function c(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function s(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          var d = 0;
          function y(b, v) {
            b.setAttribute(v, b.getAttribute(v) !== "true");
          }
          var m = function() {
            function b(v) {
              var g = this;
              s(this, b), this.select = v, this.container = document.createElement("span"), this.buildPicker(), this.select.style.display = "none", this.select.parentNode.insertBefore(this.container, this.select), this.label.addEventListener("mousedown", function() {
                g.togglePicker();
              }), this.label.addEventListener("keydown", function(w) {
                switch (w.keyCode) {
                  case u.default.keys.ENTER:
                    g.togglePicker();
                    break;
                  case u.default.keys.ESCAPE:
                    g.escape(), w.preventDefault();
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
              value: function(g) {
                var w = this, p = document.createElement("span");
                return p.tabIndex = "0", p.setAttribute("role", "button"), p.classList.add("ql-picker-item"), g.hasAttribute("value") && p.setAttribute("data-value", g.getAttribute("value")), g.textContent && p.setAttribute("data-label", g.textContent), p.addEventListener("click", function() {
                  w.selectItem(p, !0);
                }), p.addEventListener("keydown", function(x) {
                  switch (x.keyCode) {
                    case u.default.keys.ENTER:
                      w.selectItem(p, !0), x.preventDefault();
                      break;
                    case u.default.keys.ESCAPE:
                      w.escape(), x.preventDefault();
                      break;
                  }
                }), p;
              }
            }, {
              key: "buildLabel",
              value: function() {
                var g = document.createElement("span");
                return g.classList.add("ql-picker-label"), g.innerHTML = h.default, g.tabIndex = "0", g.setAttribute("role", "button"), g.setAttribute("aria-expanded", "false"), this.container.appendChild(g), g;
              }
            }, {
              key: "buildOptions",
              value: function() {
                var g = this, w = document.createElement("span");
                w.classList.add("ql-picker-options"), w.setAttribute("aria-hidden", "true"), w.tabIndex = "-1", w.id = "ql-picker-options-" + d, d += 1, this.label.setAttribute("aria-controls", w.id), this.options = w, [].slice.call(this.select.options).forEach(function(p) {
                  var x = g.buildItem(p);
                  w.appendChild(x), p.selected === !0 && g.selectItem(x);
                }), this.container.appendChild(w);
              }
            }, {
              key: "buildPicker",
              value: function() {
                var g = this;
                [].slice.call(this.select.attributes).forEach(function(w) {
                  g.container.setAttribute(w.name, w.value);
                }), this.container.classList.add("ql-picker"), this.label = this.buildLabel(), this.buildOptions();
              }
            }, {
              key: "escape",
              value: function() {
                var g = this;
                this.close(), setTimeout(function() {
                  return g.label.focus();
                }, 1);
              }
            }, {
              key: "close",
              value: function() {
                this.container.classList.remove("ql-expanded"), this.label.setAttribute("aria-expanded", "false"), this.options.setAttribute("aria-hidden", "true");
              }
            }, {
              key: "selectItem",
              value: function(g) {
                var w = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1, p = this.container.querySelector(".ql-selected");
                if (g !== p && (p != null && p.classList.remove("ql-selected"), g != null && (g.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(g.parentNode.children, g), g.hasAttribute("data-value") ? this.label.setAttribute("data-value", g.getAttribute("data-value")) : this.label.removeAttribute("data-value"), g.hasAttribute("data-label") ? this.label.setAttribute("data-label", g.getAttribute("data-label")) : this.label.removeAttribute("data-label"), w))) {
                  if (typeof Event == "function")
                    this.select.dispatchEvent(new Event("change"));
                  else if ((typeof Event > "u" ? "undefined" : a(Event)) === "object") {
                    var x = document.createEvent("Event");
                    x.initEvent("change", !0, !0), this.select.dispatchEvent(x);
                  }
                  this.close();
                }
              }
            }, {
              key: "update",
              value: function() {
                var g = void 0;
                if (this.select.selectedIndex > -1) {
                  var w = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
                  g = this.select.options[this.select.selectedIndex], this.selectItem(w);
                } else
                  this.selectItem(null);
                var p = g != null && g !== this.select.querySelector("option[selected]");
                this.label.classList.toggle("ql-active", p);
              }
            }]), b;
          }();
          r.default = m;
        },
        /* 29 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(0), o = D(a), l = i(5), u = D(l), f = i(4), h = D(f), c = i(16), s = D(c), d = i(25), y = D(d), m = i(24), b = D(m), v = i(35), g = D(v), w = i(6), p = D(w), x = i(22), _ = D(x), E = i(7), k = D(E), j = i(55), S = D(j), O = i(42), N = D(O), T = i(23), C = D(T);
          function D(H) {
            return H && H.__esModule ? H : { default: H };
          }
          u.default.register({
            "blots/block": h.default,
            "blots/block/embed": f.BlockEmbed,
            "blots/break": s.default,
            "blots/container": y.default,
            "blots/cursor": b.default,
            "blots/embed": g.default,
            "blots/inline": p.default,
            "blots/scroll": _.default,
            "blots/text": k.default,
            "modules/clipboard": S.default,
            "modules/history": N.default,
            "modules/keyboard": C.default
          }), o.default.register(h.default, s.default, b.default, p.default, _.default, k.default), r.default = u.default;
        },
        /* 30 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var a = i(1), o = (
            /** @class */
            function() {
              function l(u) {
                this.domNode = u, this.domNode[a.DATA_KEY] = { blot: this };
              }
              return Object.defineProperty(l.prototype, "statics", {
                // Hack for accessing inherited static methods
                get: function() {
                  return this.constructor;
                },
                enumerable: !0,
                configurable: !0
              }), l.create = function(u) {
                if (this.tagName == null)
                  throw new a.ParchmentError("Blot definition missing tagName");
                var f;
                return Array.isArray(this.tagName) ? (typeof u == "string" && (u = u.toUpperCase(), parseInt(u).toString() === u && (u = parseInt(u))), typeof u == "number" ? f = document.createElement(this.tagName[u - 1]) : this.tagName.indexOf(u) > -1 ? f = document.createElement(u) : f = document.createElement(this.tagName[0])) : f = document.createElement(this.tagName), this.className && f.classList.add(this.className), f;
              }, l.prototype.attach = function() {
                this.parent != null && (this.scroll = this.parent.scroll);
              }, l.prototype.clone = function() {
                var u = this.domNode.cloneNode(!1);
                return a.create(u);
              }, l.prototype.detach = function() {
                this.parent != null && this.parent.removeChild(this), delete this.domNode[a.DATA_KEY];
              }, l.prototype.deleteAt = function(u, f) {
                var h = this.isolate(u, f);
                h.remove();
              }, l.prototype.formatAt = function(u, f, h, c) {
                var s = this.isolate(u, f);
                if (a.query(h, a.Scope.BLOT) != null && c)
                  s.wrap(h, c);
                else if (a.query(h, a.Scope.ATTRIBUTE) != null) {
                  var d = a.create(this.statics.scope);
                  s.wrap(d), d.format(h, c);
                }
              }, l.prototype.insertAt = function(u, f, h) {
                var c = h == null ? a.create("text", f) : a.create(f, h), s = this.split(u);
                this.parent.insertBefore(c, s);
              }, l.prototype.insertInto = function(u, f) {
                f === void 0 && (f = null), this.parent != null && this.parent.children.remove(this);
                var h = null;
                u.children.insertBefore(this, f), f != null && (h = f.domNode), (this.domNode.parentNode != u.domNode || this.domNode.nextSibling != h) && u.domNode.insertBefore(this.domNode, h), this.parent = u, this.attach();
              }, l.prototype.isolate = function(u, f) {
                var h = this.split(u);
                return h.split(f), h;
              }, l.prototype.length = function() {
                return 1;
              }, l.prototype.offset = function(u) {
                return u === void 0 && (u = this.parent), this.parent == null || this == u ? 0 : this.parent.children.offset(this) + this.parent.offset(u);
              }, l.prototype.optimize = function(u) {
                this.domNode[a.DATA_KEY] != null && delete this.domNode[a.DATA_KEY].mutations;
              }, l.prototype.remove = function() {
                this.domNode.parentNode != null && this.domNode.parentNode.removeChild(this.domNode), this.detach();
              }, l.prototype.replace = function(u) {
                u.parent != null && (u.parent.insertBefore(this, u.next), u.remove());
              }, l.prototype.replaceWith = function(u, f) {
                var h = typeof u == "string" ? a.create(u, f) : u;
                return h.replace(this), h;
              }, l.prototype.split = function(u, f) {
                return u === 0 ? this : this.next;
              }, l.prototype.update = function(u, f) {
              }, l.prototype.wrap = function(u, f) {
                var h = typeof u == "string" ? a.create(u, f) : u;
                return this.parent != null && this.parent.insertBefore(h, this.next), h.appendChild(this), h;
              }, l.blotName = "abstract", l;
            }()
          );
          r.default = o;
        },
        /* 31 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var a = i(12), o = i(32), l = i(33), u = i(1), f = (
            /** @class */
            function() {
              function h(c) {
                this.attributes = {}, this.domNode = c, this.build();
              }
              return h.prototype.attribute = function(c, s) {
                s ? c.add(this.domNode, s) && (c.value(this.domNode) != null ? this.attributes[c.attrName] = c : delete this.attributes[c.attrName]) : (c.remove(this.domNode), delete this.attributes[c.attrName]);
              }, h.prototype.build = function() {
                var c = this;
                this.attributes = {};
                var s = a.default.keys(this.domNode), d = o.default.keys(this.domNode), y = l.default.keys(this.domNode);
                s.concat(d).concat(y).forEach(function(m) {
                  var b = u.query(m, u.Scope.ATTRIBUTE);
                  b instanceof a.default && (c.attributes[b.attrName] = b);
                });
              }, h.prototype.copy = function(c) {
                var s = this;
                Object.keys(this.attributes).forEach(function(d) {
                  var y = s.attributes[d].value(s.domNode);
                  c.format(d, y);
                });
              }, h.prototype.move = function(c) {
                var s = this;
                this.copy(c), Object.keys(this.attributes).forEach(function(d) {
                  s.attributes[d].remove(s.domNode);
                }), this.attributes = {};
              }, h.prototype.values = function() {
                var c = this;
                return Object.keys(this.attributes).reduce(function(s, d) {
                  return s[d] = c.attributes[d].value(c.domNode), s;
                }, {});
              }, h;
            }()
          );
          r.default = f;
        },
        /* 32 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, c) {
              h.__proto__ = c;
            } || function(h, c) {
              for (var s in c)
                c.hasOwnProperty(s) && (h[s] = c[s]);
            };
            return function(h, c) {
              f(h, c);
              function s() {
                this.constructor = h;
              }
              h.prototype = c === null ? Object.create(c) : (s.prototype = c.prototype, new s());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(12);
          function l(f, h) {
            var c = f.getAttribute("class") || "";
            return c.split(/\s+/).filter(function(s) {
              return s.indexOf(h + "-") === 0;
            });
          }
          var u = (
            /** @class */
            function(f) {
              a(h, f);
              function h() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return h.keys = function(c) {
                return (c.getAttribute("class") || "").split(/\s+/).map(function(s) {
                  return s.split("-").slice(0, -1).join("-");
                });
              }, h.prototype.add = function(c, s) {
                return this.canAdd(c, s) ? (this.remove(c), c.classList.add(this.keyName + "-" + s), !0) : !1;
              }, h.prototype.remove = function(c) {
                var s = l(c, this.keyName);
                s.forEach(function(d) {
                  c.classList.remove(d);
                }), c.classList.length === 0 && c.removeAttribute("class");
              }, h.prototype.value = function(c) {
                var s = l(c, this.keyName)[0] || "", d = s.slice(this.keyName.length + 1);
                return this.canAdd(c, d) ? d : "";
              }, h;
            }(o.default)
          );
          r.default = u;
        },
        /* 33 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, c) {
              h.__proto__ = c;
            } || function(h, c) {
              for (var s in c)
                c.hasOwnProperty(s) && (h[s] = c[s]);
            };
            return function(h, c) {
              f(h, c);
              function s() {
                this.constructor = h;
              }
              h.prototype = c === null ? Object.create(c) : (s.prototype = c.prototype, new s());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(12);
          function l(f) {
            var h = f.split("-"), c = h.slice(1).map(function(s) {
              return s[0].toUpperCase() + s.slice(1);
            }).join("");
            return h[0] + c;
          }
          var u = (
            /** @class */
            function(f) {
              a(h, f);
              function h() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return h.keys = function(c) {
                return (c.getAttribute("style") || "").split(";").map(function(s) {
                  var d = s.split(":");
                  return d[0].trim();
                });
              }, h.prototype.add = function(c, s) {
                return this.canAdd(c, s) ? (c.style[l(this.keyName)] = s, !0) : !1;
              }, h.prototype.remove = function(c) {
                c.style[l(this.keyName)] = "", c.getAttribute("style") || c.removeAttribute("style");
              }, h.prototype.value = function(c) {
                var s = c.style[l(this.keyName)];
                return this.canAdd(c, s) ? s : "";
              }, h;
            }(o.default)
          );
          r.default = u;
        },
        /* 34 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function u(f, h) {
              for (var c = 0; c < h.length; c++) {
                var s = h[c];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(f, s.key, s);
              }
            }
            return function(f, h, c) {
              return h && u(f.prototype, h), c && u(f, c), f;
            };
          }();
          function o(u, f) {
            if (!(u instanceof f))
              throw new TypeError("Cannot call a class as a function");
          }
          var l = function() {
            function u(f, h) {
              o(this, u), this.quill = f, this.options = h, this.modules = {};
            }
            return a(u, [{
              key: "init",
              value: function() {
                var h = this;
                Object.keys(this.options.modules).forEach(function(c) {
                  h.modules[c] == null && h.addModule(c);
                });
              }
            }, {
              key: "addModule",
              value: function(h) {
                var c = this.quill.constructor.import("modules/" + h);
                return this.modules[h] = new c(this.quill, this.options.modules[h] || {}), this.modules[h];
              }
            }]), u;
          }();
          l.DEFAULTS = {
            modules: {}
          }, l.themes = {
            default: l
          }, r.default = l;
        },
        /* 35 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function v(g, w) {
              for (var p = 0; p < w.length; p++) {
                var x = w[p];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(g, x.key, x);
              }
            }
            return function(g, w, p) {
              return w && v(g.prototype, w), p && v(g, p), g;
            };
          }(), o = function v(g, w, p) {
            g === null && (g = Function.prototype);
            var x = Object.getOwnPropertyDescriptor(g, w);
            if (x === void 0) {
              var _ = Object.getPrototypeOf(g);
              return _ === null ? void 0 : v(_, w, p);
            } else {
              if ("value" in x)
                return x.value;
              var E = x.get;
              return E === void 0 ? void 0 : E.call(p);
            }
          }, l = i(0), u = c(l), f = i(7), h = c(f);
          function c(v) {
            return v && v.__esModule ? v : { default: v };
          }
          function s(v, g) {
            if (!(v instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function d(v, g) {
            if (!v)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : v;
          }
          function y(v, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            v.prototype = Object.create(g && g.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(v, g) : v.__proto__ = g);
          }
          var m = "\uFEFF", b = function(v) {
            y(g, v);
            function g(w) {
              s(this, g);
              var p = d(this, (g.__proto__ || Object.getPrototypeOf(g)).call(this, w));
              return p.contentNode = document.createElement("span"), p.contentNode.setAttribute("contenteditable", !1), [].slice.call(p.domNode.childNodes).forEach(function(x) {
                p.contentNode.appendChild(x);
              }), p.leftGuard = document.createTextNode(m), p.rightGuard = document.createTextNode(m), p.domNode.appendChild(p.leftGuard), p.domNode.appendChild(p.contentNode), p.domNode.appendChild(p.rightGuard), p;
            }
            return a(g, [{
              key: "index",
              value: function(p, x) {
                return p === this.leftGuard ? 0 : p === this.rightGuard ? 1 : o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "index", this).call(this, p, x);
              }
            }, {
              key: "restore",
              value: function(p) {
                var x = void 0, _ = void 0, E = p.data.split(m).join("");
                if (p === this.leftGuard)
                  if (this.prev instanceof h.default) {
                    var k = this.prev.length();
                    this.prev.insertAt(k, E), x = {
                      startNode: this.prev.domNode,
                      startOffset: k + E.length
                    };
                  } else
                    _ = document.createTextNode(E), this.parent.insertBefore(u.default.create(_), this), x = {
                      startNode: _,
                      startOffset: E.length
                    };
                else
                  p === this.rightGuard && (this.next instanceof h.default ? (this.next.insertAt(0, E), x = {
                    startNode: this.next.domNode,
                    startOffset: E.length
                  }) : (_ = document.createTextNode(E), this.parent.insertBefore(u.default.create(_), this.next), x = {
                    startNode: _,
                    startOffset: E.length
                  }));
                return p.data = m, x;
              }
            }, {
              key: "update",
              value: function(p, x) {
                var _ = this;
                p.forEach(function(E) {
                  if (E.type === "characterData" && (E.target === _.leftGuard || E.target === _.rightGuard)) {
                    var k = _.restore(E.target);
                    k && (x.range = k);
                  }
                });
              }
            }]), g;
          }(u.default.Embed);
          r.default = b;
        },
        /* 36 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.AlignStyle = r.AlignClass = r.AlignAttribute = void 0;
          var a = i(0), o = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          var u = {
            scope: o.default.Scope.BLOCK,
            whitelist: ["right", "center", "justify"]
          }, f = new o.default.Attributor.Attribute("align", "align", u), h = new o.default.Attributor.Class("align", "ql-align", u), c = new o.default.Attributor.Style("align", "text-align", u);
          r.AlignAttribute = f, r.AlignClass = h, r.AlignStyle = c;
        },
        /* 37 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.BackgroundStyle = r.BackgroundClass = void 0;
          var a = i(0), o = u(a), l = i(26);
          function u(c) {
            return c && c.__esModule ? c : { default: c };
          }
          var f = new o.default.Attributor.Class("background", "ql-bg", {
            scope: o.default.Scope.INLINE
          }), h = new l.ColorAttributor("background", "background-color", {
            scope: o.default.Scope.INLINE
          });
          r.BackgroundClass = f, r.BackgroundStyle = h;
        },
        /* 38 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.DirectionStyle = r.DirectionClass = r.DirectionAttribute = void 0;
          var a = i(0), o = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          var u = {
            scope: o.default.Scope.BLOCK,
            whitelist: ["rtl"]
          }, f = new o.default.Attributor.Attribute("direction", "dir", u), h = new o.default.Attributor.Class("direction", "ql-direction", u), c = new o.default.Attributor.Style("direction", "direction", u);
          r.DirectionAttribute = f, r.DirectionClass = h, r.DirectionStyle = c;
        },
        /* 39 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.FontClass = r.FontStyle = void 0;
          var a = function() {
            function v(g, w) {
              for (var p = 0; p < w.length; p++) {
                var x = w[p];
                x.enumerable = x.enumerable || !1, x.configurable = !0, "value" in x && (x.writable = !0), Object.defineProperty(g, x.key, x);
              }
            }
            return function(g, w, p) {
              return w && v(g.prototype, w), p && v(g, p), g;
            };
          }(), o = function v(g, w, p) {
            g === null && (g = Function.prototype);
            var x = Object.getOwnPropertyDescriptor(g, w);
            if (x === void 0) {
              var _ = Object.getPrototypeOf(g);
              return _ === null ? void 0 : v(_, w, p);
            } else {
              if ("value" in x)
                return x.value;
              var E = x.get;
              return E === void 0 ? void 0 : E.call(p);
            }
          }, l = i(0), u = f(l);
          function f(v) {
            return v && v.__esModule ? v : { default: v };
          }
          function h(v, g) {
            if (!(v instanceof g))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(v, g) {
            if (!v)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return g && (typeof g == "object" || typeof g == "function") ? g : v;
          }
          function s(v, g) {
            if (typeof g != "function" && g !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof g);
            v.prototype = Object.create(g && g.prototype, { constructor: { value: v, enumerable: !1, writable: !0, configurable: !0 } }), g && (Object.setPrototypeOf ? Object.setPrototypeOf(v, g) : v.__proto__ = g);
          }
          var d = {
            scope: u.default.Scope.INLINE,
            whitelist: ["serif", "monospace"]
          }, y = new u.default.Attributor.Class("font", "ql-font", d), m = function(v) {
            s(g, v);
            function g() {
              return h(this, g), c(this, (g.__proto__ || Object.getPrototypeOf(g)).apply(this, arguments));
            }
            return a(g, [{
              key: "value",
              value: function(p) {
                return o(g.prototype.__proto__ || Object.getPrototypeOf(g.prototype), "value", this).call(this, p).replace(/["']/g, "");
              }
            }]), g;
          }(u.default.Attributor.Style), b = new m("font", "font-family", d);
          r.FontStyle = b, r.FontClass = y;
        },
        /* 40 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.SizeStyle = r.SizeClass = void 0;
          var a = i(0), o = l(a);
          function l(h) {
            return h && h.__esModule ? h : { default: h };
          }
          var u = new o.default.Attributor.Class("size", "ql-size", {
            scope: o.default.Scope.INLINE,
            whitelist: ["small", "large", "huge"]
          }), f = new o.default.Attributor.Style("size", "font-size", {
            scope: o.default.Scope.INLINE,
            whitelist: ["10px", "18px", "32px"]
          });
          r.SizeClass = u, r.SizeStyle = f;
        },
        /* 41 */
        /***/
        function(n, r, i) {
          n.exports = {
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
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.getLastChangeIndex = r.default = void 0;
          var a = function() {
            function w(p, x) {
              for (var _ = 0; _ < x.length; _++) {
                var E = x[_];
                E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(p, E.key, E);
              }
            }
            return function(p, x, _) {
              return x && w(p.prototype, x), _ && w(p, _), p;
            };
          }(), o = i(0), l = s(o), u = i(5), f = s(u), h = i(9), c = s(h);
          function s(w) {
            return w && w.__esModule ? w : { default: w };
          }
          function d(w, p) {
            if (!(w instanceof p))
              throw new TypeError("Cannot call a class as a function");
          }
          function y(w, p) {
            if (!w)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return p && (typeof p == "object" || typeof p == "function") ? p : w;
          }
          function m(w, p) {
            if (typeof p != "function" && p !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof p);
            w.prototype = Object.create(p && p.prototype, { constructor: { value: w, enumerable: !1, writable: !0, configurable: !0 } }), p && (Object.setPrototypeOf ? Object.setPrototypeOf(w, p) : w.__proto__ = p);
          }
          var b = function(w) {
            m(p, w);
            function p(x, _) {
              d(this, p);
              var E = y(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this, x, _));
              return E.lastRecorded = 0, E.ignoreChange = !1, E.clear(), E.quill.on(f.default.events.EDITOR_CHANGE, function(k, j, S, O) {
                k !== f.default.events.TEXT_CHANGE || E.ignoreChange || (!E.options.userOnly || O === f.default.sources.USER ? E.record(j, S) : E.transform(j));
              }), E.quill.keyboard.addBinding({ key: "Z", shortKey: !0 }, E.undo.bind(E)), E.quill.keyboard.addBinding({ key: "Z", shortKey: !0, shiftKey: !0 }, E.redo.bind(E)), /Win/i.test(navigator.platform) && E.quill.keyboard.addBinding({ key: "Y", shortKey: !0 }, E.redo.bind(E)), E;
            }
            return a(p, [{
              key: "change",
              value: function(_, E) {
                if (this.stack[_].length !== 0) {
                  var k = this.stack[_].pop();
                  this.stack[E].push(k), this.lastRecorded = 0, this.ignoreChange = !0, this.quill.updateContents(k[_], f.default.sources.USER), this.ignoreChange = !1;
                  var j = g(k[_]);
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
              value: function(_, E) {
                if (_.ops.length !== 0) {
                  this.stack.redo = [];
                  var k = this.quill.getContents().diff(E), j = Date.now();
                  if (this.lastRecorded + this.options.delay > j && this.stack.undo.length > 0) {
                    var S = this.stack.undo.pop();
                    k = k.compose(S.undo), _ = S.redo.compose(_);
                  } else
                    this.lastRecorded = j;
                  this.stack.undo.push({
                    redo: _,
                    undo: k
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
              value: function(_) {
                this.stack.undo.forEach(function(E) {
                  E.undo = _.transform(E.undo, !0), E.redo = _.transform(E.redo, !0);
                }), this.stack.redo.forEach(function(E) {
                  E.undo = _.transform(E.undo, !0), E.redo = _.transform(E.redo, !0);
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
          function v(w) {
            var p = w.ops[w.ops.length - 1];
            return p == null ? !1 : p.insert != null ? typeof p.insert == "string" && p.insert.endsWith(`
`) : p.attributes != null ? Object.keys(p.attributes).some(function(x) {
              return l.default.query(x, l.default.Scope.BLOCK) != null;
            }) : !1;
          }
          function g(w) {
            var p = w.reduce(function(_, E) {
              return _ += E.delete || 0, _;
            }, 0), x = w.length() - p;
            return v(w) && (x -= 1), x;
          }
          r.default = b, r.getLastChangeIndex = g;
        },
        /* 43 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.BaseTooltip = void 0;
          var a = function() {
            function M(R, z) {
              for (var B = 0; B < z.length; B++) {
                var I = z[B];
                I.enumerable = I.enumerable || !1, I.configurable = !0, "value" in I && (I.writable = !0), Object.defineProperty(R, I.key, I);
              }
            }
            return function(R, z, B) {
              return z && M(R.prototype, z), B && M(R, B), R;
            };
          }(), o = function M(R, z, B) {
            R === null && (R = Function.prototype);
            var I = Object.getOwnPropertyDescriptor(R, z);
            if (I === void 0) {
              var $ = Object.getPrototypeOf(R);
              return $ === null ? void 0 : M($, z, B);
            } else {
              if ("value" in I)
                return I.value;
              var W = I.get;
              return W === void 0 ? void 0 : W.call(B);
            }
          }, l = i(3), u = j(l), f = i(2), h = j(f), c = i(8), s = j(c), d = i(23), y = j(d), m = i(34), b = j(m), v = i(59), g = j(v), w = i(60), p = j(w), x = i(28), _ = j(x), E = i(61), k = j(E);
          function j(M) {
            return M && M.__esModule ? M : { default: M };
          }
          function S(M, R) {
            if (!(M instanceof R))
              throw new TypeError("Cannot call a class as a function");
          }
          function O(M, R) {
            if (!M)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return R && (typeof R == "object" || typeof R == "function") ? R : M;
          }
          function N(M, R) {
            if (typeof R != "function" && R !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof R);
            M.prototype = Object.create(R && R.prototype, { constructor: { value: M, enumerable: !1, writable: !0, configurable: !0 } }), R && (Object.setPrototypeOf ? Object.setPrototypeOf(M, R) : M.__proto__ = R);
          }
          var T = [!1, "center", "right", "justify"], C = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"], D = [!1, "serif", "monospace"], H = ["1", "2", "3", !1], U = ["small", !1, "large", "huge"], K = function(M) {
            N(R, M);
            function R(z, B) {
              S(this, R);
              var I = O(this, (R.__proto__ || Object.getPrototypeOf(R)).call(this, z, B)), $ = function W(Y) {
                if (!document.body.contains(z.root))
                  return document.body.removeEventListener("click", W);
                I.tooltip != null && !I.tooltip.root.contains(Y.target) && document.activeElement !== I.tooltip.textbox && !I.quill.hasFocus() && I.tooltip.hide(), I.pickers != null && I.pickers.forEach(function(V) {
                  V.container.contains(Y.target) || V.close();
                });
              };
              return z.emitter.listenDOM("click", document.body, $), I;
            }
            return a(R, [{
              key: "addModule",
              value: function(B) {
                var I = o(R.prototype.__proto__ || Object.getPrototypeOf(R.prototype), "addModule", this).call(this, B);
                return B === "toolbar" && this.extendToolbar(I), I;
              }
            }, {
              key: "buildButtons",
              value: function(B, I) {
                B.forEach(function($) {
                  var W = $.getAttribute("class") || "";
                  W.split(/\s+/).forEach(function(Y) {
                    if (Y.startsWith("ql-") && (Y = Y.slice(3), I[Y] != null))
                      if (Y === "direction")
                        $.innerHTML = I[Y][""] + I[Y].rtl;
                      else if (typeof I[Y] == "string")
                        $.innerHTML = I[Y];
                      else {
                        var V = $.value || "";
                        V != null && I[Y][V] && ($.innerHTML = I[Y][V]);
                      }
                  });
                });
              }
            }, {
              key: "buildPickers",
              value: function(B, I) {
                var $ = this;
                this.pickers = B.map(function(Y) {
                  if (Y.classList.contains("ql-align"))
                    return Y.querySelector("option") == null && A(Y, T), new p.default(Y, I.align);
                  if (Y.classList.contains("ql-background") || Y.classList.contains("ql-color")) {
                    var V = Y.classList.contains("ql-background") ? "background" : "color";
                    return Y.querySelector("option") == null && A(Y, C, V === "background" ? "#ffffff" : "#000000"), new g.default(Y, I[V]);
                  } else
                    return Y.querySelector("option") == null && (Y.classList.contains("ql-font") ? A(Y, D) : Y.classList.contains("ql-header") ? A(Y, H) : Y.classList.contains("ql-size") && A(Y, U)), new _.default(Y);
                });
                var W = function() {
                  $.pickers.forEach(function(V) {
                    V.update();
                  });
                };
                this.quill.on(s.default.events.EDITOR_CHANGE, W);
              }
            }]), R;
          }(b.default);
          K.DEFAULTS = (0, u.default)(!0, {}, b.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  formula: function() {
                    this.quill.theme.tooltip.edit("formula");
                  },
                  image: function() {
                    var R = this, z = this.container.querySelector("input.ql-image[type=file]");
                    z == null && (z = document.createElement("input"), z.setAttribute("type", "file"), z.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon"), z.classList.add("ql-image"), z.addEventListener("change", function() {
                      if (z.files != null && z.files[0] != null) {
                        var B = new FileReader();
                        B.onload = function(I) {
                          var $ = R.quill.getSelection(!0);
                          R.quill.updateContents(new h.default().retain($.index).delete($.length).insert({ image: I.target.result }), s.default.sources.USER), R.quill.setSelection($.index + 1, s.default.sources.SILENT), z.value = "";
                        }, B.readAsDataURL(z.files[0]);
                      }
                    }), this.container.appendChild(z)), z.click();
                  },
                  video: function() {
                    this.quill.theme.tooltip.edit("video");
                  }
                }
              }
            }
          });
          var q = function(M) {
            N(R, M);
            function R(z, B) {
              S(this, R);
              var I = O(this, (R.__proto__ || Object.getPrototypeOf(R)).call(this, z, B));
              return I.textbox = I.root.querySelector('input[type="text"]'), I.listen(), I;
            }
            return a(R, [{
              key: "listen",
              value: function() {
                var B = this;
                this.textbox.addEventListener("keydown", function(I) {
                  y.default.match(I, "enter") ? (B.save(), I.preventDefault()) : y.default.match(I, "escape") && (B.cancel(), I.preventDefault());
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
                var B = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "link", I = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
                this.root.classList.remove("ql-hidden"), this.root.classList.add("ql-editing"), I != null ? this.textbox.value = I : B !== this.root.getAttribute("data-mode") && (this.textbox.value = ""), this.position(this.quill.getBounds(this.quill.selection.savedRange)), this.textbox.select(), this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + B) || ""), this.root.setAttribute("data-mode", B);
              }
            }, {
              key: "restoreFocus",
              value: function() {
                var B = this.quill.scrollingContainer.scrollTop;
                this.quill.focus(), this.quill.scrollingContainer.scrollTop = B;
              }
            }, {
              key: "save",
              value: function() {
                var B = this.textbox.value;
                switch (this.root.getAttribute("data-mode")) {
                  case "link": {
                    var I = this.quill.root.scrollTop;
                    this.linkRange ? (this.quill.formatText(this.linkRange, "link", B, s.default.sources.USER), delete this.linkRange) : (this.restoreFocus(), this.quill.format("link", B, s.default.sources.USER)), this.quill.root.scrollTop = I;
                    break;
                  }
                  case "video":
                    B = P(B);
                  case "formula": {
                    if (!B)
                      break;
                    var $ = this.quill.getSelection(!0);
                    if ($ != null) {
                      var W = $.index + $.length;
                      this.quill.insertEmbed(W, this.root.getAttribute("data-mode"), B, s.default.sources.USER), this.root.getAttribute("data-mode") === "formula" && this.quill.insertText(W + 1, " ", s.default.sources.USER), this.quill.setSelection(W + 2, s.default.sources.USER);
                    }
                    break;
                  }
                }
                this.textbox.value = "", this.hide();
              }
            }]), R;
          }(k.default);
          function P(M) {
            var R = M.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || M.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
            return R ? (R[1] || "https") + "://www.youtube.com/embed/" + R[2] + "?showinfo=0" : (R = M.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) ? (R[1] || "https") + "://player.vimeo.com/video/" + R[2] + "/" : M;
          }
          function A(M, R) {
            var z = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !1;
            R.forEach(function(B) {
              var I = document.createElement("option");
              B === z ? I.setAttribute("selected", "selected") : I.setAttribute("value", B), M.appendChild(I);
            });
          }
          r.BaseTooltip = q, r.default = K;
        },
        /* 44 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", { value: !0 });
          var a = (
            /** @class */
            function() {
              function o() {
                this.head = this.tail = null, this.length = 0;
              }
              return o.prototype.append = function() {
                for (var l = [], u = 0; u < arguments.length; u++)
                  l[u] = arguments[u];
                this.insertBefore(l[0], null), l.length > 1 && this.append.apply(this, l.slice(1));
              }, o.prototype.contains = function(l) {
                for (var u, f = this.iterator(); u = f(); )
                  if (u === l)
                    return !0;
                return !1;
              }, o.prototype.insertBefore = function(l, u) {
                l && (l.next = u, u != null ? (l.prev = u.prev, u.prev != null && (u.prev.next = l), u.prev = l, u === this.head && (this.head = l)) : this.tail != null ? (this.tail.next = l, l.prev = this.tail, this.tail = l) : (l.prev = null, this.head = this.tail = l), this.length += 1);
              }, o.prototype.offset = function(l) {
                for (var u = 0, f = this.head; f != null; ) {
                  if (f === l)
                    return u;
                  u += f.length(), f = f.next;
                }
                return -1;
              }, o.prototype.remove = function(l) {
                this.contains(l) && (l.prev != null && (l.prev.next = l.next), l.next != null && (l.next.prev = l.prev), l === this.head && (this.head = l.next), l === this.tail && (this.tail = l.prev), this.length -= 1);
              }, o.prototype.iterator = function(l) {
                return l === void 0 && (l = this.head), function() {
                  var u = l;
                  return l != null && (l = l.next), u;
                };
              }, o.prototype.find = function(l, u) {
                u === void 0 && (u = !1);
                for (var f, h = this.iterator(); f = h(); ) {
                  var c = f.length();
                  if (l < c || u && l === c && (f.next == null || f.next.length() !== 0))
                    return [f, l];
                  l -= c;
                }
                return [null, 0];
              }, o.prototype.forEach = function(l) {
                for (var u, f = this.iterator(); u = f(); )
                  l(u);
              }, o.prototype.forEachAt = function(l, u, f) {
                if (!(u <= 0))
                  for (var h = this.find(l), c = h[0], s = h[1], d, y = l - s, m = this.iterator(c); (d = m()) && y < l + u; ) {
                    var b = d.length();
                    l > y ? f(d, l - y, Math.min(u, y + b - l)) : f(d, 0, Math.min(b, l + u - y)), y += b;
                  }
              }, o.prototype.map = function(l) {
                return this.reduce(function(u, f) {
                  return u.push(l(f)), u;
                }, []);
              }, o.prototype.reduce = function(l, u) {
                for (var f, h = this.iterator(); f = h(); )
                  u = l(u, f);
                return u;
              }, o;
            }()
          );
          r.default = a;
        },
        /* 45 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(s, d) {
              s.__proto__ = d;
            } || function(s, d) {
              for (var y in d)
                d.hasOwnProperty(y) && (s[y] = d[y]);
            };
            return function(s, d) {
              c(s, d);
              function y() {
                this.constructor = s;
              }
              s.prototype = d === null ? Object.create(d) : (y.prototype = d.prototype, new y());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(17), l = i(1), u = {
            attributes: !0,
            characterData: !0,
            characterDataOldValue: !0,
            childList: !0,
            subtree: !0
          }, f = 100, h = (
            /** @class */
            function(c) {
              a(s, c);
              function s(d) {
                var y = c.call(this, d) || this;
                return y.scroll = y, y.observer = new MutationObserver(function(m) {
                  y.update(m);
                }), y.observer.observe(y.domNode, u), y.attach(), y;
              }
              return s.prototype.detach = function() {
                c.prototype.detach.call(this), this.observer.disconnect();
              }, s.prototype.deleteAt = function(d, y) {
                this.update(), d === 0 && y === this.length() ? this.children.forEach(function(m) {
                  m.remove();
                }) : c.prototype.deleteAt.call(this, d, y);
              }, s.prototype.formatAt = function(d, y, m, b) {
                this.update(), c.prototype.formatAt.call(this, d, y, m, b);
              }, s.prototype.insertAt = function(d, y, m) {
                this.update(), c.prototype.insertAt.call(this, d, y, m);
              }, s.prototype.optimize = function(d, y) {
                var m = this;
                d === void 0 && (d = []), y === void 0 && (y = {}), c.prototype.optimize.call(this, y);
                for (var b = [].slice.call(this.observer.takeRecords()); b.length > 0; )
                  d.push(b.pop());
                for (var v = function(x, _) {
                  _ === void 0 && (_ = !0), !(x == null || x === m) && x.domNode.parentNode != null && (x.domNode[l.DATA_KEY].mutations == null && (x.domNode[l.DATA_KEY].mutations = []), _ && v(x.parent));
                }, g = function(x) {
                  // @ts-ignore
                  x.domNode[l.DATA_KEY] == null || // @ts-ignore
                  x.domNode[l.DATA_KEY].mutations == null || (x instanceof o.default && x.children.forEach(g), x.optimize(y));
                }, w = d, p = 0; w.length > 0; p += 1) {
                  if (p >= f)
                    throw new Error("[Parchment] Maximum optimize iterations reached");
                  for (w.forEach(function(x) {
                    var _ = l.find(x.target, !0);
                    _ != null && (_.domNode === x.target && (x.type === "childList" ? (v(l.find(x.previousSibling, !1)), [].forEach.call(x.addedNodes, function(E) {
                      var k = l.find(E, !1);
                      v(k, !1), k instanceof o.default && k.children.forEach(function(j) {
                        v(j, !1);
                      });
                    })) : x.type === "attributes" && v(_.prev)), v(_));
                  }), this.children.forEach(g), w = [].slice.call(this.observer.takeRecords()), b = w.slice(); b.length > 0; )
                    d.push(b.pop());
                }
              }, s.prototype.update = function(d, y) {
                var m = this;
                y === void 0 && (y = {}), d = d || this.observer.takeRecords(), d.map(function(b) {
                  var v = l.find(b.target, !0);
                  return v == null ? null : v.domNode[l.DATA_KEY].mutations == null ? (v.domNode[l.DATA_KEY].mutations = [b], v) : (v.domNode[l.DATA_KEY].mutations.push(b), null);
                }).forEach(function(b) {
                  b == null || b === m || //@ts-ignore
                  b.domNode[l.DATA_KEY] == null || b.update(b.domNode[l.DATA_KEY].mutations || [], y);
                }), this.domNode[l.DATA_KEY].mutations != null && c.prototype.update.call(this, this.domNode[l.DATA_KEY].mutations, y), this.optimize(d, y);
              }, s.blotName = "scroll", s.defaultChild = "block", s.scope = l.Scope.BLOCK_BLOT, s.tagName = "DIV", s;
            }(o.default)
          );
          r.default = h;
        },
        /* 46 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var h = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(c, s) {
              c.__proto__ = s;
            } || function(c, s) {
              for (var d in s)
                s.hasOwnProperty(d) && (c[d] = s[d]);
            };
            return function(c, s) {
              h(c, s);
              function d() {
                this.constructor = c;
              }
              c.prototype = s === null ? Object.create(s) : (d.prototype = s.prototype, new d());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(18), l = i(1);
          function u(h, c) {
            if (Object.keys(h).length !== Object.keys(c).length)
              return !1;
            for (var s in h)
              if (h[s] !== c[s])
                return !1;
            return !0;
          }
          var f = (
            /** @class */
            function(h) {
              a(c, h);
              function c() {
                return h !== null && h.apply(this, arguments) || this;
              }
              return c.formats = function(s) {
                if (s.tagName !== c.tagName)
                  return h.formats.call(this, s);
              }, c.prototype.format = function(s, d) {
                var y = this;
                s === this.statics.blotName && !d ? (this.children.forEach(function(m) {
                  m instanceof o.default || (m = m.wrap(c.blotName, !0)), y.attributes.copy(m);
                }), this.unwrap()) : h.prototype.format.call(this, s, d);
              }, c.prototype.formatAt = function(s, d, y, m) {
                if (this.formats()[y] != null || l.query(y, l.Scope.ATTRIBUTE)) {
                  var b = this.isolate(s, d);
                  b.format(y, m);
                } else
                  h.prototype.formatAt.call(this, s, d, y, m);
              }, c.prototype.optimize = function(s) {
                h.prototype.optimize.call(this, s);
                var d = this.formats();
                if (Object.keys(d).length === 0)
                  return this.unwrap();
                var y = this.next;
                y instanceof c && y.prev === this && u(d, y.formats()) && (y.moveChildren(this), y.remove());
              }, c.blotName = "inline", c.scope = l.Scope.INLINE_BLOT, c.tagName = "SPAN", c;
            }(o.default)
          );
          r.default = f;
        },
        /* 47 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, c) {
              h.__proto__ = c;
            } || function(h, c) {
              for (var s in c)
                c.hasOwnProperty(s) && (h[s] = c[s]);
            };
            return function(h, c) {
              f(h, c);
              function s() {
                this.constructor = h;
              }
              h.prototype = c === null ? Object.create(c) : (s.prototype = c.prototype, new s());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(18), l = i(1), u = (
            /** @class */
            function(f) {
              a(h, f);
              function h() {
                return f !== null && f.apply(this, arguments) || this;
              }
              return h.formats = function(c) {
                var s = l.query(h.blotName).tagName;
                if (c.tagName !== s)
                  return f.formats.call(this, c);
              }, h.prototype.format = function(c, s) {
                l.query(c, l.Scope.BLOCK) != null && (c === this.statics.blotName && !s ? this.replaceWith(h.blotName) : f.prototype.format.call(this, c, s));
              }, h.prototype.formatAt = function(c, s, d, y) {
                l.query(d, l.Scope.BLOCK) != null ? this.format(d, y) : f.prototype.formatAt.call(this, c, s, d, y);
              }, h.prototype.insertAt = function(c, s, d) {
                if (d == null || l.query(s, l.Scope.INLINE) != null)
                  f.prototype.insertAt.call(this, c, s, d);
                else {
                  var y = this.split(c), m = l.create(s, d);
                  y.parent.insertBefore(m, y);
                }
              }, h.prototype.update = function(c, s) {
                navigator.userAgent.match(/Trident/) ? this.build() : f.prototype.update.call(this, c, s);
              }, h.blotName = "block", h.scope = l.Scope.BLOCK_BLOT, h.tagName = "P", h;
            }(o.default)
          );
          r.default = u;
        },
        /* 48 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var u = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(f, h) {
              f.__proto__ = h;
            } || function(f, h) {
              for (var c in h)
                h.hasOwnProperty(c) && (f[c] = h[c]);
            };
            return function(f, h) {
              u(f, h);
              function c() {
                this.constructor = f;
              }
              f.prototype = h === null ? Object.create(h) : (c.prototype = h.prototype, new c());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(19), l = (
            /** @class */
            function(u) {
              a(f, u);
              function f() {
                return u !== null && u.apply(this, arguments) || this;
              }
              return f.formats = function(h) {
              }, f.prototype.format = function(h, c) {
                u.prototype.formatAt.call(this, 0, this.length(), h, c);
              }, f.prototype.formatAt = function(h, c, s, d) {
                h === 0 && c === this.length() ? this.format(s, d) : u.prototype.formatAt.call(this, h, c, s, d);
              }, f.prototype.formats = function() {
                return this.statics.formats(this.domNode);
              }, f;
            }(o.default)
          );
          r.default = l;
        },
        /* 49 */
        /***/
        function(n, r, i) {
          var a = this && this.__extends || function() {
            var f = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(h, c) {
              h.__proto__ = c;
            } || function(h, c) {
              for (var s in c)
                c.hasOwnProperty(s) && (h[s] = c[s]);
            };
            return function(h, c) {
              f(h, c);
              function s() {
                this.constructor = h;
              }
              h.prototype = c === null ? Object.create(c) : (s.prototype = c.prototype, new s());
            };
          }();
          Object.defineProperty(r, "__esModule", { value: !0 });
          var o = i(19), l = i(1), u = (
            /** @class */
            function(f) {
              a(h, f);
              function h(c) {
                var s = f.call(this, c) || this;
                return s.text = s.statics.value(s.domNode), s;
              }
              return h.create = function(c) {
                return document.createTextNode(c);
              }, h.value = function(c) {
                var s = c.data;
                return s.normalize && (s = s.normalize()), s;
              }, h.prototype.deleteAt = function(c, s) {
                this.domNode.data = this.text = this.text.slice(0, c) + this.text.slice(c + s);
              }, h.prototype.index = function(c, s) {
                return this.domNode === c ? s : -1;
              }, h.prototype.insertAt = function(c, s, d) {
                d == null ? (this.text = this.text.slice(0, c) + s + this.text.slice(c), this.domNode.data = this.text) : f.prototype.insertAt.call(this, c, s, d);
              }, h.prototype.length = function() {
                return this.text.length;
              }, h.prototype.optimize = function(c) {
                f.prototype.optimize.call(this, c), this.text = this.statics.value(this.domNode), this.text.length === 0 ? this.remove() : this.next instanceof h && this.next.prev === this && (this.insertAt(this.length(), this.next.value()), this.next.remove());
              }, h.prototype.position = function(c, s) {
                return [this.domNode, c];
              }, h.prototype.split = function(c, s) {
                if (s === void 0 && (s = !1), !s) {
                  if (c === 0)
                    return this;
                  if (c === this.length())
                    return this.next;
                }
                var d = l.create(this.domNode.splitText(c));
                return this.parent.insertBefore(d, this.next), this.text = this.statics.value(this.domNode), d;
              }, h.prototype.update = function(c, s) {
                var d = this;
                c.some(function(y) {
                  return y.type === "characterData" && y.target === d.domNode;
                }) && (this.text = this.statics.value(this.domNode));
              }, h.prototype.value = function() {
                return this.text;
              }, h.blotName = "text", h.scope = l.Scope.INLINE_BLOT, h;
            }(o.default)
          );
          r.default = u;
        },
        /* 50 */
        /***/
        function(n, r, i) {
          var a = document.createElement("div");
          if (a.classList.toggle("test-class", !1), a.classList.contains("test-class")) {
            var o = DOMTokenList.prototype.toggle;
            DOMTokenList.prototype.toggle = function(l, u) {
              return arguments.length > 1 && !this.contains(l) == !u ? u : o.call(this, l);
            };
          }
          String.prototype.startsWith || (String.prototype.startsWith = function(l, u) {
            return u = u || 0, this.substr(u, l.length) === l;
          }), String.prototype.endsWith || (String.prototype.endsWith = function(l, u) {
            var f = this.toString();
            (typeof u != "number" || !isFinite(u) || Math.floor(u) !== u || u > f.length) && (u = f.length), u -= l.length;
            var h = f.indexOf(l, u);
            return h !== -1 && h === u;
          }), Array.prototype.find || Object.defineProperty(Array.prototype, "find", {
            value: function(u) {
              if (this === null)
                throw new TypeError("Array.prototype.find called on null or undefined");
              if (typeof u != "function")
                throw new TypeError("predicate must be a function");
              for (var f = Object(this), h = f.length >>> 0, c = arguments[1], s, d = 0; d < h; d++)
                if (s = f[d], u.call(c, s, d, f))
                  return s;
            }
          }), document.addEventListener("DOMContentLoaded", function() {
            document.execCommand("enableObjectResizing", !1, !1), document.execCommand("autoUrlDetect", !1, !1);
          });
        },
        /* 51 */
        /***/
        function(n, r) {
          var i = -1, a = 1, o = 0;
          function l(p, x, _) {
            if (p == x)
              return p ? [[o, p]] : [];
            (_ < 0 || p.length < _) && (_ = null);
            var E = c(p, x), k = p.substring(0, E);
            p = p.substring(E), x = x.substring(E), E = s(p, x);
            var j = p.substring(p.length - E);
            p = p.substring(0, p.length - E), x = x.substring(0, x.length - E);
            var S = u(p, x);
            return k && S.unshift([o, k]), j && S.push([o, j]), y(S), _ != null && (S = v(S, _)), S = g(S), S;
          }
          function u(p, x) {
            var _;
            if (!p)
              return [[a, x]];
            if (!x)
              return [[i, p]];
            var E = p.length > x.length ? p : x, k = p.length > x.length ? x : p, j = E.indexOf(k);
            if (j != -1)
              return _ = [
                [a, E.substring(0, j)],
                [o, k],
                [a, E.substring(j + k.length)]
              ], p.length > x.length && (_[0][0] = _[2][0] = i), _;
            if (k.length == 1)
              return [[i, p], [a, x]];
            var S = d(p, x);
            if (S) {
              var O = S[0], N = S[1], T = S[2], C = S[3], D = S[4], H = l(O, T), U = l(N, C);
              return H.concat([[o, D]], U);
            }
            return f(p, x);
          }
          function f(p, x) {
            for (var _ = p.length, E = x.length, k = Math.ceil((_ + E) / 2), j = k, S = 2 * k, O = new Array(S), N = new Array(S), T = 0; T < S; T++)
              O[T] = -1, N[T] = -1;
            O[j + 1] = 0, N[j + 1] = 0;
            for (var C = _ - E, D = C % 2 != 0, H = 0, U = 0, K = 0, q = 0, P = 0; P < k; P++) {
              for (var A = -P + H; A <= P - U; A += 2) {
                var M = j + A, R;
                A == -P || A != P && O[M - 1] < O[M + 1] ? R = O[M + 1] : R = O[M - 1] + 1;
                for (var z = R - A; R < _ && z < E && p.charAt(R) == x.charAt(z); )
                  R++, z++;
                if (O[M] = R, R > _)
                  U += 2;
                else if (z > E)
                  H += 2;
                else if (D) {
                  var B = j + C - A;
                  if (B >= 0 && B < S && N[B] != -1) {
                    var I = _ - N[B];
                    if (R >= I)
                      return h(p, x, R, z);
                  }
                }
              }
              for (var $ = -P + K; $ <= P - q; $ += 2) {
                var B = j + $, I;
                $ == -P || $ != P && N[B - 1] < N[B + 1] ? I = N[B + 1] : I = N[B - 1] + 1;
                for (var W = I - $; I < _ && W < E && p.charAt(_ - I - 1) == x.charAt(E - W - 1); )
                  I++, W++;
                if (N[B] = I, I > _)
                  q += 2;
                else if (W > E)
                  K += 2;
                else if (!D) {
                  var M = j + C - $;
                  if (M >= 0 && M < S && O[M] != -1) {
                    var R = O[M], z = j + R - M;
                    if (I = _ - I, R >= I)
                      return h(p, x, R, z);
                  }
                }
              }
            }
            return [[i, p], [a, x]];
          }
          function h(p, x, _, E) {
            var k = p.substring(0, _), j = x.substring(0, E), S = p.substring(_), O = x.substring(E), N = l(k, j), T = l(S, O);
            return N.concat(T);
          }
          function c(p, x) {
            if (!p || !x || p.charAt(0) != x.charAt(0))
              return 0;
            for (var _ = 0, E = Math.min(p.length, x.length), k = E, j = 0; _ < k; )
              p.substring(j, k) == x.substring(j, k) ? (_ = k, j = _) : E = k, k = Math.floor((E - _) / 2 + _);
            return k;
          }
          function s(p, x) {
            if (!p || !x || p.charAt(p.length - 1) != x.charAt(x.length - 1))
              return 0;
            for (var _ = 0, E = Math.min(p.length, x.length), k = E, j = 0; _ < k; )
              p.substring(p.length - k, p.length - j) == x.substring(x.length - k, x.length - j) ? (_ = k, j = _) : E = k, k = Math.floor((E - _) / 2 + _);
            return k;
          }
          function d(p, x) {
            var _ = p.length > x.length ? p : x, E = p.length > x.length ? x : p;
            if (_.length < 4 || E.length * 2 < _.length)
              return null;
            function k(U, K, q) {
              for (var P = U.substring(q, q + Math.floor(U.length / 4)), A = -1, M = "", R, z, B, I; (A = K.indexOf(P, A + 1)) != -1; ) {
                var $ = c(
                  U.substring(q),
                  K.substring(A)
                ), W = s(
                  U.substring(0, q),
                  K.substring(0, A)
                );
                M.length < W + $ && (M = K.substring(A - W, A) + K.substring(A, A + $), R = U.substring(0, q - W), z = U.substring(q + $), B = K.substring(0, A - W), I = K.substring(A + $));
              }
              return M.length * 2 >= U.length ? [
                R,
                z,
                B,
                I,
                M
              ] : null;
            }
            var j = k(
              _,
              E,
              Math.ceil(_.length / 4)
            ), S = k(
              _,
              E,
              Math.ceil(_.length / 2)
            ), O;
            if (!j && !S)
              return null;
            S ? j ? O = j[4].length > S[4].length ? j : S : O = S : O = j;
            var N, T, C, D;
            p.length > x.length ? (N = O[0], T = O[1], C = O[2], D = O[3]) : (C = O[0], D = O[1], N = O[2], T = O[3]);
            var H = O[4];
            return [N, T, C, D, H];
          }
          function y(p) {
            p.push([o, ""]);
            for (var x = 0, _ = 0, E = 0, k = "", j = "", S; x < p.length; )
              switch (p[x][0]) {
                case a:
                  E++, j += p[x][1], x++;
                  break;
                case i:
                  _++, k += p[x][1], x++;
                  break;
                case o:
                  _ + E > 1 ? (_ !== 0 && E !== 0 && (S = c(j, k), S !== 0 && (x - _ - E > 0 && p[x - _ - E - 1][0] == o ? p[x - _ - E - 1][1] += j.substring(0, S) : (p.splice(0, 0, [
                    o,
                    j.substring(0, S)
                  ]), x++), j = j.substring(S), k = k.substring(S)), S = s(j, k), S !== 0 && (p[x][1] = j.substring(j.length - S) + p[x][1], j = j.substring(0, j.length - S), k = k.substring(0, k.length - S))), _ === 0 ? p.splice(
                    x - E,
                    _ + E,
                    [a, j]
                  ) : E === 0 ? p.splice(
                    x - _,
                    _ + E,
                    [i, k]
                  ) : p.splice(
                    x - _ - E,
                    _ + E,
                    [i, k],
                    [a, j]
                  ), x = x - _ - E + (_ ? 1 : 0) + (E ? 1 : 0) + 1) : x !== 0 && p[x - 1][0] == o ? (p[x - 1][1] += p[x][1], p.splice(x, 1)) : x++, E = 0, _ = 0, k = "", j = "";
                  break;
              }
            p[p.length - 1][1] === "" && p.pop();
            var O = !1;
            for (x = 1; x < p.length - 1; )
              p[x - 1][0] == o && p[x + 1][0] == o && (p[x][1].substring(p[x][1].length - p[x - 1][1].length) == p[x - 1][1] ? (p[x][1] = p[x - 1][1] + p[x][1].substring(0, p[x][1].length - p[x - 1][1].length), p[x + 1][1] = p[x - 1][1] + p[x + 1][1], p.splice(x - 1, 1), O = !0) : p[x][1].substring(0, p[x + 1][1].length) == p[x + 1][1] && (p[x - 1][1] += p[x + 1][1], p[x][1] = p[x][1].substring(p[x + 1][1].length) + p[x + 1][1], p.splice(x + 1, 1), O = !0)), x++;
            O && y(p);
          }
          var m = l;
          m.INSERT = a, m.DELETE = i, m.EQUAL = o, n.exports = m;
          function b(p, x) {
            if (x === 0)
              return [o, p];
            for (var _ = 0, E = 0; E < p.length; E++) {
              var k = p[E];
              if (k[0] === i || k[0] === o) {
                var j = _ + k[1].length;
                if (x === j)
                  return [E + 1, p];
                if (x < j) {
                  p = p.slice();
                  var S = x - _, O = [k[0], k[1].slice(0, S)], N = [k[0], k[1].slice(S)];
                  return p.splice(E, 1, O, N), [E + 1, p];
                } else
                  _ = j;
              }
            }
            throw new Error("cursor_pos is out of bounds!");
          }
          function v(p, x) {
            var _ = b(p, x), E = _[1], k = _[0], j = E[k], S = E[k + 1];
            if (j == null)
              return p;
            if (j[0] !== o)
              return p;
            if (S != null && j[1] + S[1] === S[1] + j[1])
              return E.splice(k, 2, S, j), w(E, k, 2);
            if (S != null && S[1].indexOf(j[1]) === 0) {
              E.splice(k, 2, [S[0], j[1]], [0, j[1]]);
              var O = S[1].slice(j[1].length);
              return O.length > 0 && E.splice(k + 2, 0, [S[0], O]), w(E, k, 3);
            } else
              return p;
          }
          function g(p) {
            for (var x = !1, _ = function(S) {
              return S.charCodeAt(0) >= 56320 && S.charCodeAt(0) <= 57343;
            }, E = function(S) {
              return S.charCodeAt(S.length - 1) >= 55296 && S.charCodeAt(S.length - 1) <= 56319;
            }, k = 2; k < p.length; k += 1)
              p[k - 2][0] === o && E(p[k - 2][1]) && p[k - 1][0] === i && _(p[k - 1][1]) && p[k][0] === a && _(p[k][1]) && (x = !0, p[k - 1][1] = p[k - 2][1].slice(-1) + p[k - 1][1], p[k][1] = p[k - 2][1].slice(-1) + p[k][1], p[k - 2][1] = p[k - 2][1].slice(0, -1));
            if (!x)
              return p;
            for (var j = [], k = 0; k < p.length; k += 1)
              p[k][1].length > 0 && j.push(p[k]);
            return j;
          }
          function w(p, x, _) {
            for (var E = x + _ - 1; E >= 0 && E >= x - 1; E--)
              if (E + 1 < p.length) {
                var k = p[E], j = p[E + 1];
                k[0] === j[1] && p.splice(E, 2, [k[0], k[1] + j[1]]);
              }
            return p;
          }
        },
        /* 52 */
        /***/
        function(n, r) {
          r = n.exports = typeof Object.keys == "function" ? Object.keys : i, r.shim = i;
          function i(a) {
            var o = [];
            for (var l in a)
              o.push(l);
            return o;
          }
        },
        /* 53 */
        /***/
        function(n, r) {
          var i = function() {
            return Object.prototype.toString.call(arguments);
          }() == "[object Arguments]";
          r = n.exports = i ? a : o, r.supported = a;
          function a(l) {
            return Object.prototype.toString.call(l) == "[object Arguments]";
          }
          r.unsupported = o;
          function o(l) {
            return l && typeof l == "object" && typeof l.length == "number" && Object.prototype.hasOwnProperty.call(l, "callee") && !Object.prototype.propertyIsEnumerable.call(l, "callee") || !1;
          }
        },
        /* 54 */
        /***/
        function(n, r) {
          var i = Object.prototype.hasOwnProperty, a = "~";
          function o() {
          }
          Object.create && (o.prototype = /* @__PURE__ */ Object.create(null), new o().__proto__ || (a = !1));
          function l(f, h, c) {
            this.fn = f, this.context = h, this.once = c || !1;
          }
          function u() {
            this._events = new o(), this._eventsCount = 0;
          }
          u.prototype.eventNames = function() {
            var h = [], c, s;
            if (this._eventsCount === 0)
              return h;
            for (s in c = this._events)
              i.call(c, s) && h.push(a ? s.slice(1) : s);
            return Object.getOwnPropertySymbols ? h.concat(Object.getOwnPropertySymbols(c)) : h;
          }, u.prototype.listeners = function(h, c) {
            var s = a ? a + h : h, d = this._events[s];
            if (c)
              return !!d;
            if (!d)
              return [];
            if (d.fn)
              return [d.fn];
            for (var y = 0, m = d.length, b = new Array(m); y < m; y++)
              b[y] = d[y].fn;
            return b;
          }, u.prototype.emit = function(h, c, s, d, y, m) {
            var b = a ? a + h : h;
            if (!this._events[b])
              return !1;
            var v = this._events[b], g = arguments.length, w, p;
            if (v.fn) {
              switch (v.once && this.removeListener(h, v.fn, void 0, !0), g) {
                case 1:
                  return v.fn.call(v.context), !0;
                case 2:
                  return v.fn.call(v.context, c), !0;
                case 3:
                  return v.fn.call(v.context, c, s), !0;
                case 4:
                  return v.fn.call(v.context, c, s, d), !0;
                case 5:
                  return v.fn.call(v.context, c, s, d, y), !0;
                case 6:
                  return v.fn.call(v.context, c, s, d, y, m), !0;
              }
              for (p = 1, w = new Array(g - 1); p < g; p++)
                w[p - 1] = arguments[p];
              v.fn.apply(v.context, w);
            } else {
              var x = v.length, _;
              for (p = 0; p < x; p++)
                switch (v[p].once && this.removeListener(h, v[p].fn, void 0, !0), g) {
                  case 1:
                    v[p].fn.call(v[p].context);
                    break;
                  case 2:
                    v[p].fn.call(v[p].context, c);
                    break;
                  case 3:
                    v[p].fn.call(v[p].context, c, s);
                    break;
                  case 4:
                    v[p].fn.call(v[p].context, c, s, d);
                    break;
                  default:
                    if (!w)
                      for (_ = 1, w = new Array(g - 1); _ < g; _++)
                        w[_ - 1] = arguments[_];
                    v[p].fn.apply(v[p].context, w);
                }
            }
            return !0;
          }, u.prototype.on = function(h, c, s) {
            var d = new l(c, s || this), y = a ? a + h : h;
            return this._events[y] ? this._events[y].fn ? this._events[y] = [this._events[y], d] : this._events[y].push(d) : (this._events[y] = d, this._eventsCount++), this;
          }, u.prototype.once = function(h, c, s) {
            var d = new l(c, s || this, !0), y = a ? a + h : h;
            return this._events[y] ? this._events[y].fn ? this._events[y] = [this._events[y], d] : this._events[y].push(d) : (this._events[y] = d, this._eventsCount++), this;
          }, u.prototype.removeListener = function(h, c, s, d) {
            var y = a ? a + h : h;
            if (!this._events[y])
              return this;
            if (!c)
              return --this._eventsCount === 0 ? this._events = new o() : delete this._events[y], this;
            var m = this._events[y];
            if (m.fn)
              m.fn === c && (!d || m.once) && (!s || m.context === s) && (--this._eventsCount === 0 ? this._events = new o() : delete this._events[y]);
            else {
              for (var b = 0, v = [], g = m.length; b < g; b++)
                (m[b].fn !== c || d && !m[b].once || s && m[b].context !== s) && v.push(m[b]);
              v.length ? this._events[y] = v.length === 1 ? v[0] : v : --this._eventsCount === 0 ? this._events = new o() : delete this._events[y];
            }
            return this;
          }, u.prototype.removeAllListeners = function(h) {
            var c;
            return h ? (c = a ? a + h : h, this._events[c] && (--this._eventsCount === 0 ? this._events = new o() : delete this._events[c])) : (this._events = new o(), this._eventsCount = 0), this;
          }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prototype.setMaxListeners = function() {
            return this;
          }, u.prefixed = a, u.EventEmitter = u, typeof n < "u" && (n.exports = u);
        },
        /* 55 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.matchText = r.matchSpacing = r.matchNewline = r.matchBlot = r.matchAttributor = r.default = void 0;
          var a = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(G) {
            return typeof G;
          } : function(G) {
            return G && typeof Symbol == "function" && G.constructor === Symbol && G !== Symbol.prototype ? "symbol" : typeof G;
          }, o = function() {
            function G(Q, re) {
              var ie = [], J = !0, de = !1, X = void 0;
              try {
                for (var ne = Q[Symbol.iterator](), ge; !(J = (ge = ne.next()).done) && (ie.push(ge.value), !(re && ie.length === re)); J = !0)
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
              return ie;
            }
            return function(Q, re) {
              if (Array.isArray(Q))
                return Q;
              if (Symbol.iterator in Object(Q))
                return G(Q, re);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), l = function() {
            function G(Q, re) {
              for (var ie = 0; ie < re.length; ie++) {
                var J = re[ie];
                J.enumerable = J.enumerable || !1, J.configurable = !0, "value" in J && (J.writable = !0), Object.defineProperty(Q, J.key, J);
              }
            }
            return function(Q, re, ie) {
              return re && G(Q.prototype, re), ie && G(Q, ie), Q;
            };
          }(), u = i(3), f = N(u), h = i(2), c = N(h), s = i(0), d = N(s), y = i(5), m = N(y), b = i(10), v = N(b), g = i(9), w = N(g), p = i(36), x = i(37), _ = i(13), E = N(_), k = i(26), j = i(38), S = i(39), O = i(40);
          function N(G) {
            return G && G.__esModule ? G : { default: G };
          }
          function T(G, Q, re) {
            return Q in G ? Object.defineProperty(G, Q, { value: re, enumerable: !0, configurable: !0, writable: !0 }) : G[Q] = re, G;
          }
          function C(G, Q) {
            if (!(G instanceof Q))
              throw new TypeError("Cannot call a class as a function");
          }
          function D(G, Q) {
            if (!G)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return Q && (typeof Q == "object" || typeof Q == "function") ? Q : G;
          }
          function H(G, Q) {
            if (typeof Q != "function" && Q !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof Q);
            G.prototype = Object.create(Q && Q.prototype, { constructor: { value: G, enumerable: !1, writable: !0, configurable: !0 } }), Q && (Object.setPrototypeOf ? Object.setPrototypeOf(G, Q) : G.__proto__ = Q);
          }
          var U = (0, v.default)("quill:clipboard"), K = "__ql-matcher", q = [[Node.TEXT_NODE, Oe], [Node.TEXT_NODE, ce], ["br", ee], [Node.ELEMENT_NODE, ce], [Node.ELEMENT_NODE, V], [Node.ELEMENT_NODE, he], [Node.ELEMENT_NODE, Y], [Node.ELEMENT_NODE, Ae], ["li", le], ["b", W.bind(W, "bold")], ["i", W.bind(W, "italic")], ["style", Z]], P = [p.AlignAttribute, j.DirectionAttribute].reduce(function(G, Q) {
            return G[Q.keyName] = Q, G;
          }, {}), A = [p.AlignStyle, x.BackgroundStyle, k.ColorStyle, j.DirectionStyle, S.FontStyle, O.SizeStyle].reduce(function(G, Q) {
            return G[Q.keyName] = Q, G;
          }, {}), M = function(G) {
            H(Q, G);
            function Q(re, ie) {
              C(this, Q);
              var J = D(this, (Q.__proto__ || Object.getPrototypeOf(Q)).call(this, re, ie));
              return J.quill.root.addEventListener("paste", J.onPaste.bind(J)), J.container = J.quill.addContainer("ql-clipboard"), J.container.setAttribute("contenteditable", !0), J.container.setAttribute("tabindex", -1), J.matchers = [], q.concat(J.options.matchers).forEach(function(de) {
                var X = o(de, 2), ne = X[0], ge = X[1];
                !ie.matchVisual && ge === he || J.addMatcher(ne, ge);
              }), J;
            }
            return l(Q, [{
              key: "addMatcher",
              value: function(ie, J) {
                this.matchers.push([ie, J]);
              }
            }, {
              key: "convert",
              value: function(ie) {
                if (typeof ie == "string")
                  return this.container.innerHTML = ie.replace(/\>\r?\n +\</g, "><"), this.convert();
                var J = this.quill.getFormat(this.quill.selection.savedRange.index);
                if (J[E.default.blotName]) {
                  var de = this.container.innerText;
                  return this.container.innerHTML = "", new c.default().insert(de, T({}, E.default.blotName, J[E.default.blotName]));
                }
                var X = this.prepareMatching(), ne = o(X, 2), ge = ne[0], ye = ne[1], pe = $(this.container, ge, ye);
                return B(pe, `
`) && pe.ops[pe.ops.length - 1].attributes == null && (pe = pe.compose(new c.default().retain(pe.length() - 1).delete(1))), U.log("convert", this.container.innerHTML, pe), this.container.innerHTML = "", pe;
              }
            }, {
              key: "dangerouslyPasteHTML",
              value: function(ie, J) {
                var de = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : m.default.sources.API;
                if (typeof ie == "string")
                  this.quill.setContents(this.convert(ie), J), this.quill.setSelection(0, m.default.sources.SILENT);
                else {
                  var X = this.convert(J);
                  this.quill.updateContents(new c.default().retain(ie).concat(X), de), this.quill.setSelection(ie + X.length(), m.default.sources.SILENT);
                }
              }
            }, {
              key: "onPaste",
              value: function(ie) {
                var J = this;
                if (!(ie.defaultPrevented || !this.quill.isEnabled())) {
                  var de = this.quill.getSelection(), X = new c.default().retain(de.index), ne = this.quill.scrollingContainer.scrollTop;
                  this.container.focus(), this.quill.selection.update(m.default.sources.SILENT), setTimeout(function() {
                    X = X.concat(J.convert()).delete(de.length), J.quill.updateContents(X, m.default.sources.USER), J.quill.setSelection(X.length() - de.length, m.default.sources.SILENT), J.quill.scrollingContainer.scrollTop = ne, J.quill.focus();
                  }, 1);
                }
              }
            }, {
              key: "prepareMatching",
              value: function() {
                var ie = this, J = [], de = [];
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
                      [].forEach.call(ie.container.querySelectorAll(ge), function(pe) {
                        pe[K] = pe[K] || [], pe[K].push(ye);
                      });
                      break;
                  }
                }), [J, de];
              }
            }]), Q;
          }(w.default);
          M.DEFAULTS = {
            matchers: [],
            matchVisual: !0
          };
          function R(G, Q, re) {
            return (typeof Q > "u" ? "undefined" : a(Q)) === "object" ? Object.keys(Q).reduce(function(ie, J) {
              return R(ie, J, Q[J]);
            }, G) : G.reduce(function(ie, J) {
              return J.attributes && J.attributes[Q] ? ie.push(J) : ie.insert(J.insert, (0, f.default)({}, T({}, Q, re), J.attributes));
            }, new c.default());
          }
          function z(G) {
            if (G.nodeType !== Node.ELEMENT_NODE)
              return {};
            var Q = "__ql-computed-style";
            return G[Q] || (G[Q] = window.getComputedStyle(G));
          }
          function B(G, Q) {
            for (var re = "", ie = G.ops.length - 1; ie >= 0 && re.length < Q.length; --ie) {
              var J = G.ops[ie];
              if (typeof J.insert != "string")
                break;
              re = J.insert + re;
            }
            return re.slice(-1 * Q.length) === Q;
          }
          function I(G) {
            if (G.childNodes.length === 0)
              return !1;
            var Q = z(G);
            return ["block", "list-item"].indexOf(Q.display) > -1;
          }
          function $(G, Q, re) {
            return G.nodeType === G.TEXT_NODE ? re.reduce(function(ie, J) {
              return J(G, ie);
            }, new c.default()) : G.nodeType === G.ELEMENT_NODE ? [].reduce.call(G.childNodes || [], function(ie, J) {
              var de = $(J, Q, re);
              return J.nodeType === G.ELEMENT_NODE && (de = Q.reduce(function(X, ne) {
                return ne(J, X);
              }, de), de = (J[K] || []).reduce(function(X, ne) {
                return ne(J, X);
              }, de)), ie.concat(de);
            }, new c.default()) : new c.default();
          }
          function W(G, Q, re) {
            return R(re, G, !0);
          }
          function Y(G, Q) {
            var re = d.default.Attributor.Attribute.keys(G), ie = d.default.Attributor.Class.keys(G), J = d.default.Attributor.Style.keys(G), de = {};
            return re.concat(ie).concat(J).forEach(function(X) {
              var ne = d.default.query(X, d.default.Scope.ATTRIBUTE);
              ne != null && (de[ne.attrName] = ne.value(G), de[ne.attrName]) || (ne = P[X], ne != null && (ne.attrName === X || ne.keyName === X) && (de[ne.attrName] = ne.value(G) || void 0), ne = A[X], ne != null && (ne.attrName === X || ne.keyName === X) && (ne = A[X], de[ne.attrName] = ne.value(G) || void 0));
            }), Object.keys(de).length > 0 && (Q = R(Q, de)), Q;
          }
          function V(G, Q) {
            var re = d.default.query(G);
            if (re == null)
              return Q;
            if (re.prototype instanceof d.default.Embed) {
              var ie = {}, J = re.value(G);
              J != null && (ie[re.blotName] = J, Q = new c.default().insert(ie, re.formats(G)));
            } else
              typeof re.formats == "function" && (Q = R(Q, re.blotName, re.formats(G)));
            return Q;
          }
          function ee(G, Q) {
            return B(Q, `
`) || Q.insert(`
`), Q;
          }
          function Z() {
            return new c.default();
          }
          function le(G, Q) {
            var re = d.default.query(G);
            if (re == null || re.blotName !== "list-item" || !B(Q, `
`))
              return Q;
            for (var ie = -1, J = G.parentNode; !J.classList.contains("ql-clipboard"); )
              (d.default.query(J) || {}).blotName === "list" && (ie += 1), J = J.parentNode;
            return ie <= 0 ? Q : Q.compose(new c.default().retain(Q.length() - 1).retain(1, { indent: ie }));
          }
          function ce(G, Q) {
            return B(Q, `
`) || (I(G) || Q.length() > 0 && G.nextSibling && I(G.nextSibling)) && Q.insert(`
`), Q;
          }
          function he(G, Q) {
            if (I(G) && G.nextElementSibling != null && !B(Q, `

`)) {
              var re = G.offsetHeight + parseFloat(z(G).marginTop) + parseFloat(z(G).marginBottom);
              G.nextElementSibling.offsetTop > G.offsetTop + re * 1.5 && Q.insert(`
`);
            }
            return Q;
          }
          function Ae(G, Q) {
            var re = {}, ie = G.style || {};
            return ie.fontStyle && z(G).fontStyle === "italic" && (re.italic = !0), ie.fontWeight && (z(G).fontWeight.startsWith("bold") || parseInt(z(G).fontWeight) >= 700) && (re.bold = !0), Object.keys(re).length > 0 && (Q = R(Q, re)), parseFloat(ie.textIndent || 0) > 0 && (Q = new c.default().insert("	").concat(Q)), Q;
          }
          function Oe(G, Q) {
            var re = G.data;
            if (G.parentNode.tagName === "O:P")
              return Q.insert(re.trim());
            if (re.trim().length === 0 && G.parentNode.classList.contains("ql-clipboard"))
              return Q;
            if (!z(G.parentNode).whiteSpace.startsWith("pre")) {
              var ie = function(de, X) {
                return X = X.replace(/[^\u00a0]/g, ""), X.length < 1 && de ? " " : X;
              };
              re = re.replace(/\r\n/g, " ").replace(/\n/g, " "), re = re.replace(/\s\s+/g, ie.bind(ie, !0)), (G.previousSibling == null && I(G.parentNode) || G.previousSibling != null && I(G.previousSibling)) && (re = re.replace(/^\s+/, ie.bind(ie, !1))), (G.nextSibling == null && I(G.parentNode) || G.nextSibling != null && I(G.nextSibling)) && (re = re.replace(/\s+$/, ie.bind(ie, !1)));
            }
            return Q.insert(re);
          }
          r.default = M, r.matchAttributor = Y, r.matchBlot = V, r.matchNewline = ce, r.matchSpacing = he, r.matchText = Oe;
        },
        /* 56 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(m, b) {
              for (var v = 0; v < b.length; v++) {
                var g = b[v];
                g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(m, g.key, g);
              }
            }
            return function(m, b, v) {
              return b && y(m.prototype, b), v && y(m, v), m;
            };
          }(), o = function y(m, b, v) {
            m === null && (m = Function.prototype);
            var g = Object.getOwnPropertyDescriptor(m, b);
            if (g === void 0) {
              var w = Object.getPrototypeOf(m);
              return w === null ? void 0 : y(w, b, v);
            } else {
              if ("value" in g)
                return g.value;
              var p = g.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, l = i(6), u = f(l);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function h(y, m) {
            if (!(y instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, m) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : y;
          }
          function s(y, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            y.prototype = Object.create(m && m.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(y, m) : y.__proto__ = m);
          }
          var d = function(y) {
            s(m, y);
            function m() {
              return h(this, m), c(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return a(m, [{
              key: "optimize",
              value: function(v) {
                o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "optimize", this).call(this, v), this.domNode.tagName !== this.statics.tagName[0] && this.replaceWith(this.statics.blotName);
              }
            }], [{
              key: "create",
              value: function() {
                return o(m.__proto__ || Object.getPrototypeOf(m), "create", this).call(this);
              }
            }, {
              key: "formats",
              value: function() {
                return !0;
              }
            }]), m;
          }(u.default);
          d.blotName = "bold", d.tagName = ["STRONG", "B"], r.default = d;
        },
        /* 57 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.addControls = r.default = void 0;
          var a = function() {
            function O(N, T) {
              var C = [], D = !0, H = !1, U = void 0;
              try {
                for (var K = N[Symbol.iterator](), q; !(D = (q = K.next()).done) && (C.push(q.value), !(T && C.length === T)); D = !0)
                  ;
              } catch (P) {
                H = !0, U = P;
              } finally {
                try {
                  !D && K.return && K.return();
                } finally {
                  if (H)
                    throw U;
                }
              }
              return C;
            }
            return function(N, T) {
              if (Array.isArray(N))
                return N;
              if (Symbol.iterator in Object(N))
                return O(N, T);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function() {
            function O(N, T) {
              for (var C = 0; C < T.length; C++) {
                var D = T[C];
                D.enumerable = D.enumerable || !1, D.configurable = !0, "value" in D && (D.writable = !0), Object.defineProperty(N, D.key, D);
              }
            }
            return function(N, T, C) {
              return T && O(N.prototype, T), C && O(N, C), N;
            };
          }(), l = i(2), u = v(l), f = i(0), h = v(f), c = i(5), s = v(c), d = i(10), y = v(d), m = i(9), b = v(m);
          function v(O) {
            return O && O.__esModule ? O : { default: O };
          }
          function g(O, N, T) {
            return N in O ? Object.defineProperty(O, N, { value: T, enumerable: !0, configurable: !0, writable: !0 }) : O[N] = T, O;
          }
          function w(O, N) {
            if (!(O instanceof N))
              throw new TypeError("Cannot call a class as a function");
          }
          function p(O, N) {
            if (!O)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return N && (typeof N == "object" || typeof N == "function") ? N : O;
          }
          function x(O, N) {
            if (typeof N != "function" && N !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof N);
            O.prototype = Object.create(N && N.prototype, { constructor: { value: O, enumerable: !1, writable: !0, configurable: !0 } }), N && (Object.setPrototypeOf ? Object.setPrototypeOf(O, N) : O.__proto__ = N);
          }
          var _ = (0, y.default)("quill:toolbar"), E = function(O) {
            x(N, O);
            function N(T, C) {
              w(this, N);
              var D = p(this, (N.__proto__ || Object.getPrototypeOf(N)).call(this, T, C));
              if (Array.isArray(D.options.container)) {
                var H = document.createElement("div");
                j(H, D.options.container), T.container.parentNode.insertBefore(H, T.container), D.container = H;
              } else
                typeof D.options.container == "string" ? D.container = document.querySelector(D.options.container) : D.container = D.options.container;
              if (!(D.container instanceof HTMLElement)) {
                var U;
                return U = _.error("Container required for toolbar", D.options), p(D, U);
              }
              return D.container.classList.add("ql-toolbar"), D.controls = [], D.handlers = {}, Object.keys(D.options.handlers).forEach(function(K) {
                D.addHandler(K, D.options.handlers[K]);
              }), [].forEach.call(D.container.querySelectorAll("button, select"), function(K) {
                D.attach(K);
              }), D.quill.on(s.default.events.EDITOR_CHANGE, function(K, q) {
                K === s.default.events.SELECTION_CHANGE && D.update(q);
              }), D.quill.on(s.default.events.SCROLL_OPTIMIZE, function() {
                var K = D.quill.selection.getRange(), q = a(K, 1), P = q[0];
                D.update(P);
              }), D;
            }
            return o(N, [{
              key: "addHandler",
              value: function(C, D) {
                this.handlers[C] = D;
              }
            }, {
              key: "attach",
              value: function(C) {
                var D = this, H = [].find.call(C.classList, function(K) {
                  return K.indexOf("ql-") === 0;
                });
                if (H) {
                  if (H = H.slice(3), C.tagName === "BUTTON" && C.setAttribute("type", "button"), this.handlers[H] == null) {
                    if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[H] == null) {
                      _.warn("ignoring attaching to disabled format", H, C);
                      return;
                    }
                    if (h.default.query(H) == null) {
                      _.warn("ignoring attaching to nonexistent format", H, C);
                      return;
                    }
                  }
                  var U = C.tagName === "SELECT" ? "change" : "click";
                  C.addEventListener(U, function(K) {
                    var q = void 0;
                    if (C.tagName === "SELECT") {
                      if (C.selectedIndex < 0)
                        return;
                      var P = C.options[C.selectedIndex];
                      P.hasAttribute("selected") ? q = !1 : q = P.value || !1;
                    } else
                      C.classList.contains("ql-active") ? q = !1 : q = C.value || !C.hasAttribute("value"), K.preventDefault();
                    D.quill.focus();
                    var A = D.quill.selection.getRange(), M = a(A, 1), R = M[0];
                    if (D.handlers[H] != null)
                      D.handlers[H].call(D, q);
                    else if (h.default.query(H).prototype instanceof h.default.Embed) {
                      if (q = prompt("Enter " + H), !q)
                        return;
                      D.quill.updateContents(new u.default().retain(R.index).delete(R.length).insert(g({}, H, q)), s.default.sources.USER);
                    } else
                      D.quill.format(H, q, s.default.sources.USER);
                    D.update(R);
                  }), this.controls.push([H, C]);
                }
              }
            }, {
              key: "update",
              value: function(C) {
                var D = C == null ? {} : this.quill.getFormat(C);
                this.controls.forEach(function(H) {
                  var U = a(H, 2), K = U[0], q = U[1];
                  if (q.tagName === "SELECT") {
                    var P = void 0;
                    if (C == null)
                      P = null;
                    else if (D[K] == null)
                      P = q.querySelector("option[selected]");
                    else if (!Array.isArray(D[K])) {
                      var A = D[K];
                      typeof A == "string" && (A = A.replace(/\"/g, '\\"')), P = q.querySelector('option[value="' + A + '"]');
                    }
                    P == null ? (q.value = "", q.selectedIndex = -1) : P.selected = !0;
                  } else if (C == null)
                    q.classList.remove("ql-active");
                  else if (q.hasAttribute("value")) {
                    var M = D[K] === q.getAttribute("value") || D[K] != null && D[K].toString() === q.getAttribute("value") || D[K] == null && !q.getAttribute("value");
                    q.classList.toggle("ql-active", M);
                  } else
                    q.classList.toggle("ql-active", D[K] != null);
                });
              }
            }]), N;
          }(b.default);
          E.DEFAULTS = {};
          function k(O, N, T) {
            var C = document.createElement("button");
            C.setAttribute("type", "button"), C.classList.add("ql-" + N), T != null && (C.value = T), O.appendChild(C);
          }
          function j(O, N) {
            Array.isArray(N[0]) || (N = [N]), N.forEach(function(T) {
              var C = document.createElement("span");
              C.classList.add("ql-formats"), T.forEach(function(D) {
                if (typeof D == "string")
                  k(C, D);
                else {
                  var H = Object.keys(D)[0], U = D[H];
                  Array.isArray(U) ? S(C, H, U) : k(C, H, U);
                }
              }), O.appendChild(C);
            });
          }
          function S(O, N, T) {
            var C = document.createElement("select");
            C.classList.add("ql-" + N), T.forEach(function(D) {
              var H = document.createElement("option");
              D !== !1 ? H.setAttribute("value", D) : H.setAttribute("selected", "selected"), C.appendChild(H);
            }), O.appendChild(C);
          }
          E.DEFAULTS = {
            container: null,
            handlers: {
              clean: function() {
                var N = this, T = this.quill.getSelection();
                if (T != null)
                  if (T.length == 0) {
                    var C = this.quill.getFormat();
                    Object.keys(C).forEach(function(D) {
                      h.default.query(D, h.default.Scope.INLINE) != null && N.quill.format(D, !1);
                    });
                  } else
                    this.quill.removeFormat(T, s.default.sources.USER);
              },
              direction: function(N) {
                var T = this.quill.getFormat().align;
                N === "rtl" && T == null ? this.quill.format("align", "right", s.default.sources.USER) : !N && T === "right" && this.quill.format("align", !1, s.default.sources.USER), this.quill.format("direction", N, s.default.sources.USER);
              },
              indent: function(N) {
                var T = this.quill.getSelection(), C = this.quill.getFormat(T), D = parseInt(C.indent || 0);
                if (N === "+1" || N === "-1") {
                  var H = N === "+1" ? 1 : -1;
                  C.direction === "rtl" && (H *= -1), this.quill.format("indent", D + H, s.default.sources.USER);
                }
              },
              link: function(N) {
                N === !0 && (N = prompt("Enter link URL:")), this.quill.format("link", N, s.default.sources.USER);
              },
              list: function(N) {
                var T = this.quill.getSelection(), C = this.quill.getFormat(T);
                N === "check" ? C.list === "checked" || C.list === "unchecked" ? this.quill.format("list", !1, s.default.sources.USER) : this.quill.format("list", "unchecked", s.default.sources.USER) : this.quill.format("list", N, s.default.sources.USER);
              }
            }
          }, r.default = E, r.addControls = j;
        },
        /* 58 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>';
        },
        /* 59 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(m, b) {
              for (var v = 0; v < b.length; v++) {
                var g = b[v];
                g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(m, g.key, g);
              }
            }
            return function(m, b, v) {
              return b && y(m.prototype, b), v && y(m, v), m;
            };
          }(), o = function y(m, b, v) {
            m === null && (m = Function.prototype);
            var g = Object.getOwnPropertyDescriptor(m, b);
            if (g === void 0) {
              var w = Object.getPrototypeOf(m);
              return w === null ? void 0 : y(w, b, v);
            } else {
              if ("value" in g)
                return g.value;
              var p = g.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, l = i(28), u = f(l);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function h(y, m) {
            if (!(y instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, m) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : y;
          }
          function s(y, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            y.prototype = Object.create(m && m.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(y, m) : y.__proto__ = m);
          }
          var d = function(y) {
            s(m, y);
            function m(b, v) {
              h(this, m);
              var g = c(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, b));
              return g.label.innerHTML = v, g.container.classList.add("ql-color-picker"), [].slice.call(g.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function(w) {
                w.classList.add("ql-primary");
              }), g;
            }
            return a(m, [{
              key: "buildItem",
              value: function(v) {
                var g = o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "buildItem", this).call(this, v);
                return g.style.backgroundColor = v.getAttribute("value") || "", g;
              }
            }, {
              key: "selectItem",
              value: function(v, g) {
                o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "selectItem", this).call(this, v, g);
                var w = this.label.querySelector(".ql-color-label"), p = v && v.getAttribute("data-value") || "";
                w && (w.tagName === "line" ? w.style.stroke = p : w.style.fill = p);
              }
            }]), m;
          }(u.default);
          r.default = d;
        },
        /* 60 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(m, b) {
              for (var v = 0; v < b.length; v++) {
                var g = b[v];
                g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(m, g.key, g);
              }
            }
            return function(m, b, v) {
              return b && y(m.prototype, b), v && y(m, v), m;
            };
          }(), o = function y(m, b, v) {
            m === null && (m = Function.prototype);
            var g = Object.getOwnPropertyDescriptor(m, b);
            if (g === void 0) {
              var w = Object.getPrototypeOf(m);
              return w === null ? void 0 : y(w, b, v);
            } else {
              if ("value" in g)
                return g.value;
              var p = g.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, l = i(28), u = f(l);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function h(y, m) {
            if (!(y instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, m) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : y;
          }
          function s(y, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            y.prototype = Object.create(m && m.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(y, m) : y.__proto__ = m);
          }
          var d = function(y) {
            s(m, y);
            function m(b, v) {
              h(this, m);
              var g = c(this, (m.__proto__ || Object.getPrototypeOf(m)).call(this, b));
              return g.container.classList.add("ql-icon-picker"), [].forEach.call(g.container.querySelectorAll(".ql-picker-item"), function(w) {
                w.innerHTML = v[w.getAttribute("data-value") || ""];
              }), g.defaultItem = g.container.querySelector(".ql-selected"), g.selectItem(g.defaultItem), g;
            }
            return a(m, [{
              key: "selectItem",
              value: function(v, g) {
                o(m.prototype.__proto__ || Object.getPrototypeOf(m.prototype), "selectItem", this).call(this, v, g), v = v || this.defaultItem, this.label.innerHTML = v.innerHTML;
              }
            }]), m;
          }(u.default);
          r.default = d;
        },
        /* 61 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function u(f, h) {
              for (var c = 0; c < h.length; c++) {
                var s = h[c];
                s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(f, s.key, s);
              }
            }
            return function(f, h, c) {
              return h && u(f.prototype, h), c && u(f, c), f;
            };
          }();
          function o(u, f) {
            if (!(u instanceof f))
              throw new TypeError("Cannot call a class as a function");
          }
          var l = function() {
            function u(f, h) {
              var c = this;
              o(this, u), this.quill = f, this.boundsContainer = h || document.body, this.root = f.addContainer("ql-tooltip"), this.root.innerHTML = this.constructor.TEMPLATE, this.quill.root === this.quill.scrollingContainer && this.quill.root.addEventListener("scroll", function() {
                c.root.style.marginTop = -1 * c.quill.root.scrollTop + "px";
              }), this.hide();
            }
            return a(u, [{
              key: "hide",
              value: function() {
                this.root.classList.add("ql-hidden");
              }
            }, {
              key: "position",
              value: function(h) {
                var c = h.left + h.width / 2 - this.root.offsetWidth / 2, s = h.bottom + this.quill.root.scrollTop;
                this.root.style.left = c + "px", this.root.style.top = s + "px", this.root.classList.remove("ql-flip");
                var d = this.boundsContainer.getBoundingClientRect(), y = this.root.getBoundingClientRect(), m = 0;
                if (y.right > d.right && (m = d.right - y.right, this.root.style.left = c + m + "px"), y.left < d.left && (m = d.left - y.left, this.root.style.left = c + m + "px"), y.bottom > d.bottom) {
                  var b = y.bottom - y.top, v = h.bottom - h.top + b;
                  this.root.style.top = s - v + "px", this.root.classList.add("ql-flip");
                }
                return m;
              }
            }, {
              key: "show",
              value: function() {
                this.root.classList.remove("ql-editing"), this.root.classList.remove("ql-hidden");
              }
            }]), u;
          }();
          r.default = l;
        },
        /* 62 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function S(O, N) {
              var T = [], C = !0, D = !1, H = void 0;
              try {
                for (var U = O[Symbol.iterator](), K; !(C = (K = U.next()).done) && (T.push(K.value), !(N && T.length === N)); C = !0)
                  ;
              } catch (q) {
                D = !0, H = q;
              } finally {
                try {
                  !C && U.return && U.return();
                } finally {
                  if (D)
                    throw H;
                }
              }
              return T;
            }
            return function(O, N) {
              if (Array.isArray(O))
                return O;
              if (Symbol.iterator in Object(O))
                return S(O, N);
              throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
          }(), o = function S(O, N, T) {
            O === null && (O = Function.prototype);
            var C = Object.getOwnPropertyDescriptor(O, N);
            if (C === void 0) {
              var D = Object.getPrototypeOf(O);
              return D === null ? void 0 : S(D, N, T);
            } else {
              if ("value" in C)
                return C.value;
              var H = C.get;
              return H === void 0 ? void 0 : H.call(T);
            }
          }, l = function() {
            function S(O, N) {
              for (var T = 0; T < N.length; T++) {
                var C = N[T];
                C.enumerable = C.enumerable || !1, C.configurable = !0, "value" in C && (C.writable = !0), Object.defineProperty(O, C.key, C);
              }
            }
            return function(O, N, T) {
              return N && S(O.prototype, N), T && S(O, T), O;
            };
          }(), u = i(3), f = w(u), h = i(8), c = w(h), s = i(43), d = w(s), y = i(27), m = w(y), b = i(15), v = i(41), g = w(v);
          function w(S) {
            return S && S.__esModule ? S : { default: S };
          }
          function p(S, O) {
            if (!(S instanceof O))
              throw new TypeError("Cannot call a class as a function");
          }
          function x(S, O) {
            if (!S)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return O && (typeof O == "object" || typeof O == "function") ? O : S;
          }
          function _(S, O) {
            if (typeof O != "function" && O !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof O);
            S.prototype = Object.create(O && O.prototype, { constructor: { value: S, enumerable: !1, writable: !0, configurable: !0 } }), O && (Object.setPrototypeOf ? Object.setPrototypeOf(S, O) : S.__proto__ = O);
          }
          var E = [[{ header: ["1", "2", "3", !1] }], ["bold", "italic", "underline", "link"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]], k = function(S) {
            _(O, S);
            function O(N, T) {
              p(this, O), T.modules.toolbar != null && T.modules.toolbar.container == null && (T.modules.toolbar.container = E);
              var C = x(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, N, T));
              return C.quill.container.classList.add("ql-snow"), C;
            }
            return l(O, [{
              key: "extendToolbar",
              value: function(T) {
                T.container.classList.add("ql-snow"), this.buildButtons([].slice.call(T.container.querySelectorAll("button")), g.default), this.buildPickers([].slice.call(T.container.querySelectorAll("select")), g.default), this.tooltip = new j(this.quill, this.options.bounds), T.container.querySelector(".ql-link") && this.quill.keyboard.addBinding({ key: "K", shortKey: !0 }, function(C, D) {
                  T.handlers.link.call(T, !D.format.link);
                });
              }
            }]), O;
          }(d.default);
          k.DEFAULTS = (0, f.default)(!0, {}, d.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(O) {
                    if (O) {
                      var N = this.quill.getSelection();
                      if (N == null || N.length == 0)
                        return;
                      var T = this.quill.getText(N);
                      /^\S+@\S+\.\S+$/.test(T) && T.indexOf("mailto:") !== 0 && (T = "mailto:" + T);
                      var C = this.quill.theme.tooltip;
                      C.edit("link", T);
                    } else
                      this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var j = function(S) {
            _(O, S);
            function O(N, T) {
              p(this, O);
              var C = x(this, (O.__proto__ || Object.getPrototypeOf(O)).call(this, N, T));
              return C.preview = C.root.querySelector("a.ql-preview"), C;
            }
            return l(O, [{
              key: "listen",
              value: function() {
                var T = this;
                o(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "listen", this).call(this), this.root.querySelector("a.ql-action").addEventListener("click", function(C) {
                  T.root.classList.contains("ql-editing") ? T.save() : T.edit("link", T.preview.textContent), C.preventDefault();
                }), this.root.querySelector("a.ql-remove").addEventListener("click", function(C) {
                  if (T.linkRange != null) {
                    var D = T.linkRange;
                    T.restoreFocus(), T.quill.formatText(D, "link", !1, c.default.sources.USER), delete T.linkRange;
                  }
                  C.preventDefault(), T.hide();
                }), this.quill.on(c.default.events.SELECTION_CHANGE, function(C, D, H) {
                  if (C != null) {
                    if (C.length === 0 && H === c.default.sources.USER) {
                      var U = T.quill.scroll.descendant(m.default, C.index), K = a(U, 2), q = K[0], P = K[1];
                      if (q != null) {
                        T.linkRange = new b.Range(C.index - P, q.length());
                        var A = m.default.formats(q.domNode);
                        T.preview.textContent = A, T.preview.setAttribute("href", A), T.show(), T.position(T.quill.getBounds(T.linkRange));
                        return;
                      }
                    } else
                      delete T.linkRange;
                    T.hide();
                  }
                });
              }
            }, {
              key: "show",
              value: function() {
                o(O.prototype.__proto__ || Object.getPrototypeOf(O.prototype), "show", this).call(this), this.root.removeAttribute("data-mode");
              }
            }]), O;
          }(s.BaseTooltip);
          j.TEMPLATE = ['<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-action"></a>', '<a class="ql-remove"></a>'].join(""), r.default = k;
        },
        /* 63 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(29), o = J(a), l = i(36), u = i(38), f = i(64), h = i(65), c = J(h), s = i(66), d = J(s), y = i(67), m = J(y), b = i(37), v = i(26), g = i(39), w = i(40), p = i(56), x = J(p), _ = i(68), E = J(_), k = i(27), j = J(k), S = i(69), O = J(S), N = i(70), T = J(N), C = i(71), D = J(C), H = i(72), U = J(H), K = i(73), q = J(K), P = i(13), A = J(P), M = i(74), R = J(M), z = i(75), B = J(z), I = i(57), $ = J(I), W = i(41), Y = J(W), V = i(28), ee = J(V), Z = i(59), le = J(Z), ce = i(60), he = J(ce), Ae = i(61), Oe = J(Ae), G = i(108), Q = J(G), re = i(62), ie = J(re);
          function J(de) {
            return de && de.__esModule ? de : { default: de };
          }
          o.default.register({
            "attributors/attribute/direction": u.DirectionAttribute,
            "attributors/class/align": l.AlignClass,
            "attributors/class/background": b.BackgroundClass,
            "attributors/class/color": v.ColorClass,
            "attributors/class/direction": u.DirectionClass,
            "attributors/class/font": g.FontClass,
            "attributors/class/size": w.SizeClass,
            "attributors/style/align": l.AlignStyle,
            "attributors/style/background": b.BackgroundStyle,
            "attributors/style/color": v.ColorStyle,
            "attributors/style/direction": u.DirectionStyle,
            "attributors/style/font": g.FontStyle,
            "attributors/style/size": w.SizeStyle
          }, !0), o.default.register({
            "formats/align": l.AlignClass,
            "formats/direction": u.DirectionClass,
            "formats/indent": f.IndentClass,
            "formats/background": b.BackgroundStyle,
            "formats/color": v.ColorStyle,
            "formats/font": g.FontClass,
            "formats/size": w.SizeClass,
            "formats/blockquote": c.default,
            "formats/code-block": A.default,
            "formats/header": d.default,
            "formats/list": m.default,
            "formats/bold": x.default,
            "formats/code": P.Code,
            "formats/italic": E.default,
            "formats/link": j.default,
            "formats/script": O.default,
            "formats/strike": T.default,
            "formats/underline": D.default,
            "formats/image": U.default,
            "formats/video": q.default,
            "formats/list/item": y.ListItem,
            "modules/formula": R.default,
            "modules/syntax": B.default,
            "modules/toolbar": $.default,
            "themes/bubble": Q.default,
            "themes/snow": ie.default,
            "ui/icons": Y.default,
            "ui/picker": ee.default,
            "ui/icon-picker": he.default,
            "ui/color-picker": le.default,
            "ui/tooltip": Oe.default
          }, !0), r.default = o.default;
        },
        /* 64 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.IndentClass = void 0;
          var a = function() {
            function m(b, v) {
              for (var g = 0; g < v.length; g++) {
                var w = v[g];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), Object.defineProperty(b, w.key, w);
              }
            }
            return function(b, v, g) {
              return v && m(b.prototype, v), g && m(b, g), b;
            };
          }(), o = function m(b, v, g) {
            b === null && (b = Function.prototype);
            var w = Object.getOwnPropertyDescriptor(b, v);
            if (w === void 0) {
              var p = Object.getPrototypeOf(b);
              return p === null ? void 0 : m(p, v, g);
            } else {
              if ("value" in w)
                return w.value;
              var x = w.get;
              return x === void 0 ? void 0 : x.call(g);
            }
          }, l = i(0), u = f(l);
          function f(m) {
            return m && m.__esModule ? m : { default: m };
          }
          function h(m, b) {
            if (!(m instanceof b))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(m, b) {
            if (!m)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return b && (typeof b == "object" || typeof b == "function") ? b : m;
          }
          function s(m, b) {
            if (typeof b != "function" && b !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof b);
            m.prototype = Object.create(b && b.prototype, { constructor: { value: m, enumerable: !1, writable: !0, configurable: !0 } }), b && (Object.setPrototypeOf ? Object.setPrototypeOf(m, b) : m.__proto__ = b);
          }
          var d = function(m) {
            s(b, m);
            function b() {
              return h(this, b), c(this, (b.__proto__ || Object.getPrototypeOf(b)).apply(this, arguments));
            }
            return a(b, [{
              key: "add",
              value: function(g, w) {
                if (w === "+1" || w === "-1") {
                  var p = this.value(g) || 0;
                  w = w === "+1" ? p + 1 : p - 1;
                }
                return w === 0 ? (this.remove(g), !0) : o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "add", this).call(this, g, w);
              }
            }, {
              key: "canAdd",
              value: function(g, w) {
                return o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "canAdd", this).call(this, g, w) || o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "canAdd", this).call(this, g, parseInt(w));
              }
            }, {
              key: "value",
              value: function(g) {
                return parseInt(o(b.prototype.__proto__ || Object.getPrototypeOf(b.prototype), "value", this).call(this, g)) || void 0;
              }
            }]), b;
          }(u.default.Attributor.Class), y = new d("indent", "ql-indent", {
            scope: u.default.Scope.BLOCK,
            whitelist: [1, 2, 3, 4, 5, 6, 7, 8]
          });
          r.IndentClass = y;
        },
        /* 65 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(4), o = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          function u(s, d) {
            if (!(s instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(s, d) {
            if (!s)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : s;
          }
          function h(s, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            s.prototype = Object.create(d && d.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(s, d) : s.__proto__ = d);
          }
          var c = function(s) {
            h(d, s);
            function d() {
              return u(this, d), f(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
            }
            return d;
          }(o.default);
          c.blotName = "blockquote", c.tagName = "blockquote", r.default = c;
        },
        /* 66 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function d(y, m) {
              for (var b = 0; b < m.length; b++) {
                var v = m[b];
                v.enumerable = v.enumerable || !1, v.configurable = !0, "value" in v && (v.writable = !0), Object.defineProperty(y, v.key, v);
              }
            }
            return function(y, m, b) {
              return m && d(y.prototype, m), b && d(y, b), y;
            };
          }(), o = i(4), l = u(o);
          function u(d) {
            return d && d.__esModule ? d : { default: d };
          }
          function f(d, y) {
            if (!(d instanceof y))
              throw new TypeError("Cannot call a class as a function");
          }
          function h(d, y) {
            if (!d)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return y && (typeof y == "object" || typeof y == "function") ? y : d;
          }
          function c(d, y) {
            if (typeof y != "function" && y !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof y);
            d.prototype = Object.create(y && y.prototype, { constructor: { value: d, enumerable: !1, writable: !0, configurable: !0 } }), y && (Object.setPrototypeOf ? Object.setPrototypeOf(d, y) : d.__proto__ = y);
          }
          var s = function(d) {
            c(y, d);
            function y() {
              return f(this, y), h(this, (y.__proto__ || Object.getPrototypeOf(y)).apply(this, arguments));
            }
            return a(y, null, [{
              key: "formats",
              value: function(b) {
                return this.tagName.indexOf(b.tagName) + 1;
              }
            }]), y;
          }(l.default);
          s.blotName = "header", s.tagName = ["H1", "H2", "H3", "H4", "H5", "H6"], r.default = s;
        },
        /* 67 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.ListItem = void 0;
          var a = function() {
            function p(x, _) {
              for (var E = 0; E < _.length; E++) {
                var k = _[E];
                k.enumerable = k.enumerable || !1, k.configurable = !0, "value" in k && (k.writable = !0), Object.defineProperty(x, k.key, k);
              }
            }
            return function(x, _, E) {
              return _ && p(x.prototype, _), E && p(x, E), x;
            };
          }(), o = function p(x, _, E) {
            x === null && (x = Function.prototype);
            var k = Object.getOwnPropertyDescriptor(x, _);
            if (k === void 0) {
              var j = Object.getPrototypeOf(x);
              return j === null ? void 0 : p(j, _, E);
            } else {
              if ("value" in k)
                return k.value;
              var S = k.get;
              return S === void 0 ? void 0 : S.call(E);
            }
          }, l = i(0), u = d(l), f = i(4), h = d(f), c = i(25), s = d(c);
          function d(p) {
            return p && p.__esModule ? p : { default: p };
          }
          function y(p, x, _) {
            return x in p ? Object.defineProperty(p, x, { value: _, enumerable: !0, configurable: !0, writable: !0 }) : p[x] = _, p;
          }
          function m(p, x) {
            if (!(p instanceof x))
              throw new TypeError("Cannot call a class as a function");
          }
          function b(p, x) {
            if (!p)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return x && (typeof x == "object" || typeof x == "function") ? x : p;
          }
          function v(p, x) {
            if (typeof x != "function" && x !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof x);
            p.prototype = Object.create(x && x.prototype, { constructor: { value: p, enumerable: !1, writable: !0, configurable: !0 } }), x && (Object.setPrototypeOf ? Object.setPrototypeOf(p, x) : p.__proto__ = x);
          }
          var g = function(p) {
            v(x, p);
            function x() {
              return m(this, x), b(this, (x.__proto__ || Object.getPrototypeOf(x)).apply(this, arguments));
            }
            return a(x, [{
              key: "format",
              value: function(E, k) {
                E === w.blotName && !k ? this.replaceWith(u.default.create(this.statics.scope)) : o(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "format", this).call(this, E, k);
              }
            }, {
              key: "remove",
              value: function() {
                this.prev == null && this.next == null ? this.parent.remove() : o(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "remove", this).call(this);
              }
            }, {
              key: "replaceWith",
              value: function(E, k) {
                return this.parent.isolate(this.offset(this.parent), this.length()), E === this.parent.statics.blotName ? (this.parent.replaceWith(E, k), this) : (this.parent.unwrap(), o(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "replaceWith", this).call(this, E, k));
              }
            }], [{
              key: "formats",
              value: function(E) {
                return E.tagName === this.tagName ? void 0 : o(x.__proto__ || Object.getPrototypeOf(x), "formats", this).call(this, E);
              }
            }]), x;
          }(h.default);
          g.blotName = "list-item", g.tagName = "LI";
          var w = function(p) {
            v(x, p), a(x, null, [{
              key: "create",
              value: function(E) {
                var k = E === "ordered" ? "OL" : "UL", j = o(x.__proto__ || Object.getPrototypeOf(x), "create", this).call(this, k);
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
            function x(_) {
              m(this, x);
              var E = b(this, (x.__proto__ || Object.getPrototypeOf(x)).call(this, _)), k = function(S) {
                if (S.target.parentNode === _) {
                  var O = E.statics.formats(_), N = u.default.find(S.target);
                  O === "checked" ? N.format("list", "unchecked") : O === "unchecked" && N.format("list", "checked");
                }
              };
              return _.addEventListener("touchstart", k), _.addEventListener("mousedown", k), E;
            }
            return a(x, [{
              key: "format",
              value: function(E, k) {
                this.children.length > 0 && this.children.tail.format(E, k);
              }
            }, {
              key: "formats",
              value: function() {
                return y({}, this.statics.blotName, this.statics.formats(this.domNode));
              }
            }, {
              key: "insertBefore",
              value: function(E, k) {
                if (E instanceof g)
                  o(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "insertBefore", this).call(this, E, k);
                else {
                  var j = k == null ? this.length() : k.offset(this), S = this.split(j);
                  S.parent.insertBefore(E, S);
                }
              }
            }, {
              key: "optimize",
              value: function(E) {
                o(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "optimize", this).call(this, E);
                var k = this.next;
                k != null && k.prev === this && k.statics.blotName === this.statics.blotName && k.domNode.tagName === this.domNode.tagName && k.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked") && (k.moveChildren(this), k.remove());
              }
            }, {
              key: "replace",
              value: function(E) {
                if (E.statics.blotName !== this.statics.blotName) {
                  var k = u.default.create(this.statics.defaultChild);
                  E.moveChildren(k), this.appendChild(k);
                }
                o(x.prototype.__proto__ || Object.getPrototypeOf(x.prototype), "replace", this).call(this, E);
              }
            }]), x;
          }(s.default);
          w.blotName = "list", w.scope = u.default.Scope.BLOCK_BLOT, w.tagName = ["OL", "UL"], w.defaultChild = "list-item", w.allowedChildren = [g], r.ListItem = g, r.default = w;
        },
        /* 68 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(56), o = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          function u(s, d) {
            if (!(s instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(s, d) {
            if (!s)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : s;
          }
          function h(s, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            s.prototype = Object.create(d && d.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(s, d) : s.__proto__ = d);
          }
          var c = function(s) {
            h(d, s);
            function d() {
              return u(this, d), f(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
            }
            return d;
          }(o.default);
          c.blotName = "italic", c.tagName = ["EM", "I"], r.default = c;
        },
        /* 69 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function y(m, b) {
              for (var v = 0; v < b.length; v++) {
                var g = b[v];
                g.enumerable = g.enumerable || !1, g.configurable = !0, "value" in g && (g.writable = !0), Object.defineProperty(m, g.key, g);
              }
            }
            return function(m, b, v) {
              return b && y(m.prototype, b), v && y(m, v), m;
            };
          }(), o = function y(m, b, v) {
            m === null && (m = Function.prototype);
            var g = Object.getOwnPropertyDescriptor(m, b);
            if (g === void 0) {
              var w = Object.getPrototypeOf(m);
              return w === null ? void 0 : y(w, b, v);
            } else {
              if ("value" in g)
                return g.value;
              var p = g.get;
              return p === void 0 ? void 0 : p.call(v);
            }
          }, l = i(6), u = f(l);
          function f(y) {
            return y && y.__esModule ? y : { default: y };
          }
          function h(y, m) {
            if (!(y instanceof m))
              throw new TypeError("Cannot call a class as a function");
          }
          function c(y, m) {
            if (!y)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return m && (typeof m == "object" || typeof m == "function") ? m : y;
          }
          function s(y, m) {
            if (typeof m != "function" && m !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof m);
            y.prototype = Object.create(m && m.prototype, { constructor: { value: y, enumerable: !1, writable: !0, configurable: !0 } }), m && (Object.setPrototypeOf ? Object.setPrototypeOf(y, m) : y.__proto__ = m);
          }
          var d = function(y) {
            s(m, y);
            function m() {
              return h(this, m), c(this, (m.__proto__ || Object.getPrototypeOf(m)).apply(this, arguments));
            }
            return a(m, null, [{
              key: "create",
              value: function(v) {
                return v === "super" ? document.createElement("sup") : v === "sub" ? document.createElement("sub") : o(m.__proto__ || Object.getPrototypeOf(m), "create", this).call(this, v);
              }
            }, {
              key: "formats",
              value: function(v) {
                if (v.tagName === "SUB")
                  return "sub";
                if (v.tagName === "SUP")
                  return "super";
              }
            }]), m;
          }(u.default);
          d.blotName = "script", d.tagName = ["SUB", "SUP"], r.default = d;
        },
        /* 70 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(6), o = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          function u(s, d) {
            if (!(s instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(s, d) {
            if (!s)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : s;
          }
          function h(s, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            s.prototype = Object.create(d && d.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(s, d) : s.__proto__ = d);
          }
          var c = function(s) {
            h(d, s);
            function d() {
              return u(this, d), f(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
            }
            return d;
          }(o.default);
          c.blotName = "strike", c.tagName = "S", r.default = c;
        },
        /* 71 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = i(6), o = l(a);
          function l(s) {
            return s && s.__esModule ? s : { default: s };
          }
          function u(s, d) {
            if (!(s instanceof d))
              throw new TypeError("Cannot call a class as a function");
          }
          function f(s, d) {
            if (!s)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return d && (typeof d == "object" || typeof d == "function") ? d : s;
          }
          function h(s, d) {
            if (typeof d != "function" && d !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof d);
            s.prototype = Object.create(d && d.prototype, { constructor: { value: s, enumerable: !1, writable: !0, configurable: !0 } }), d && (Object.setPrototypeOf ? Object.setPrototypeOf(s, d) : s.__proto__ = d);
          }
          var c = function(s) {
            h(d, s);
            function d() {
              return u(this, d), f(this, (d.__proto__ || Object.getPrototypeOf(d)).apply(this, arguments));
            }
            return d;
          }(o.default);
          c.blotName = "underline", c.tagName = "U", r.default = c;
        },
        /* 72 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function b(v, g) {
              for (var w = 0; w < g.length; w++) {
                var p = g[w];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, g, w) {
              return g && b(v.prototype, g), w && b(v, w), v;
            };
          }(), o = function b(v, g, w) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, g);
            if (p === void 0) {
              var x = Object.getPrototypeOf(v);
              return x === null ? void 0 : b(x, g, w);
            } else {
              if ("value" in p)
                return p.value;
              var _ = p.get;
              return _ === void 0 ? void 0 : _.call(w);
            }
          }, l = i(0), u = h(l), f = i(27);
          function h(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function c(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function s(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function d(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var y = ["alt", "height", "width"], m = function(b) {
            d(v, b);
            function v() {
              return c(this, v), s(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "format",
              value: function(w, p) {
                y.indexOf(w) > -1 ? p ? this.domNode.setAttribute(w, p) : this.domNode.removeAttribute(w) : o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "format", this).call(this, w, p);
              }
            }], [{
              key: "create",
              value: function(w) {
                var p = o(v.__proto__ || Object.getPrototypeOf(v), "create", this).call(this, w);
                return typeof w == "string" && p.setAttribute("src", this.sanitize(w)), p;
              }
            }, {
              key: "formats",
              value: function(w) {
                return y.reduce(function(p, x) {
                  return w.hasAttribute(x) && (p[x] = w.getAttribute(x)), p;
                }, {});
              }
            }, {
              key: "match",
              value: function(w) {
                return /\.(jpe?g|gif|png)$/.test(w) || /^data:image\/.+;base64/.test(w);
              }
            }, {
              key: "sanitize",
              value: function(w) {
                return (0, f.sanitize)(w, ["http", "https", "data"]) ? w : "//:0";
              }
            }, {
              key: "value",
              value: function(w) {
                return w.getAttribute("src");
              }
            }]), v;
          }(u.default.Embed);
          m.blotName = "image", m.tagName = "IMG", r.default = m;
        },
        /* 73 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          });
          var a = function() {
            function b(v, g) {
              for (var w = 0; w < g.length; w++) {
                var p = g[w];
                p.enumerable = p.enumerable || !1, p.configurable = !0, "value" in p && (p.writable = !0), Object.defineProperty(v, p.key, p);
              }
            }
            return function(v, g, w) {
              return g && b(v.prototype, g), w && b(v, w), v;
            };
          }(), o = function b(v, g, w) {
            v === null && (v = Function.prototype);
            var p = Object.getOwnPropertyDescriptor(v, g);
            if (p === void 0) {
              var x = Object.getPrototypeOf(v);
              return x === null ? void 0 : b(x, g, w);
            } else {
              if ("value" in p)
                return p.value;
              var _ = p.get;
              return _ === void 0 ? void 0 : _.call(w);
            }
          }, l = i(4), u = i(27), f = h(u);
          function h(b) {
            return b && b.__esModule ? b : { default: b };
          }
          function c(b, v) {
            if (!(b instanceof v))
              throw new TypeError("Cannot call a class as a function");
          }
          function s(b, v) {
            if (!b)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return v && (typeof v == "object" || typeof v == "function") ? v : b;
          }
          function d(b, v) {
            if (typeof v != "function" && v !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof v);
            b.prototype = Object.create(v && v.prototype, { constructor: { value: b, enumerable: !1, writable: !0, configurable: !0 } }), v && (Object.setPrototypeOf ? Object.setPrototypeOf(b, v) : b.__proto__ = v);
          }
          var y = ["height", "width"], m = function(b) {
            d(v, b);
            function v() {
              return c(this, v), s(this, (v.__proto__ || Object.getPrototypeOf(v)).apply(this, arguments));
            }
            return a(v, [{
              key: "format",
              value: function(w, p) {
                y.indexOf(w) > -1 ? p ? this.domNode.setAttribute(w, p) : this.domNode.removeAttribute(w) : o(v.prototype.__proto__ || Object.getPrototypeOf(v.prototype), "format", this).call(this, w, p);
              }
            }], [{
              key: "create",
              value: function(w) {
                var p = o(v.__proto__ || Object.getPrototypeOf(v), "create", this).call(this, w);
                return p.setAttribute("frameborder", "0"), p.setAttribute("allowfullscreen", !0), p.setAttribute("src", this.sanitize(w)), p;
              }
            }, {
              key: "formats",
              value: function(w) {
                return y.reduce(function(p, x) {
                  return w.hasAttribute(x) && (p[x] = w.getAttribute(x)), p;
                }, {});
              }
            }, {
              key: "sanitize",
              value: function(w) {
                return f.default.sanitize(w);
              }
            }, {
              key: "value",
              value: function(w) {
                return w.getAttribute("src");
              }
            }]), v;
          }(l.BlockEmbed);
          m.blotName = "video", m.className = "ql-video", m.tagName = "IFRAME", r.default = m;
        },
        /* 74 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.FormulaBlot = void 0;
          var a = function() {
            function w(p, x) {
              for (var _ = 0; _ < x.length; _++) {
                var E = x[_];
                E.enumerable = E.enumerable || !1, E.configurable = !0, "value" in E && (E.writable = !0), Object.defineProperty(p, E.key, E);
              }
            }
            return function(p, x, _) {
              return x && w(p.prototype, x), _ && w(p, _), p;
            };
          }(), o = function w(p, x, _) {
            p === null && (p = Function.prototype);
            var E = Object.getOwnPropertyDescriptor(p, x);
            if (E === void 0) {
              var k = Object.getPrototypeOf(p);
              return k === null ? void 0 : w(k, x, _);
            } else {
              if ("value" in E)
                return E.value;
              var j = E.get;
              return j === void 0 ? void 0 : j.call(_);
            }
          }, l = i(35), u = d(l), f = i(5), h = d(f), c = i(9), s = d(c);
          function d(w) {
            return w && w.__esModule ? w : { default: w };
          }
          function y(w, p) {
            if (!(w instanceof p))
              throw new TypeError("Cannot call a class as a function");
          }
          function m(w, p) {
            if (!w)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return p && (typeof p == "object" || typeof p == "function") ? p : w;
          }
          function b(w, p) {
            if (typeof p != "function" && p !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof p);
            w.prototype = Object.create(p && p.prototype, { constructor: { value: w, enumerable: !1, writable: !0, configurable: !0 } }), p && (Object.setPrototypeOf ? Object.setPrototypeOf(w, p) : w.__proto__ = p);
          }
          var v = function(w) {
            b(p, w);
            function p() {
              return y(this, p), m(this, (p.__proto__ || Object.getPrototypeOf(p)).apply(this, arguments));
            }
            return a(p, null, [{
              key: "create",
              value: function(_) {
                var E = o(p.__proto__ || Object.getPrototypeOf(p), "create", this).call(this, _);
                return typeof _ == "string" && (window.katex.render(_, E, {
                  throwOnError: !1,
                  errorColor: "#f00"
                }), E.setAttribute("data-value", _)), E;
              }
            }, {
              key: "value",
              value: function(_) {
                return _.getAttribute("data-value");
              }
            }]), p;
          }(u.default);
          v.blotName = "formula", v.className = "ql-formula", v.tagName = "SPAN";
          var g = function(w) {
            b(p, w), a(p, null, [{
              key: "register",
              value: function() {
                h.default.register(v, !0);
              }
            }]);
            function p() {
              y(this, p);
              var x = m(this, (p.__proto__ || Object.getPrototypeOf(p)).call(this));
              if (window.katex == null)
                throw new Error("Formula module requires KaTeX.");
              return x;
            }
            return p;
          }(s.default);
          r.FormulaBlot = v, r.default = g;
        },
        /* 75 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.CodeToken = r.CodeBlock = void 0;
          var a = function() {
            function _(E, k) {
              for (var j = 0; j < k.length; j++) {
                var S = k[j];
                S.enumerable = S.enumerable || !1, S.configurable = !0, "value" in S && (S.writable = !0), Object.defineProperty(E, S.key, S);
              }
            }
            return function(E, k, j) {
              return k && _(E.prototype, k), j && _(E, j), E;
            };
          }(), o = function _(E, k, j) {
            E === null && (E = Function.prototype);
            var S = Object.getOwnPropertyDescriptor(E, k);
            if (S === void 0) {
              var O = Object.getPrototypeOf(E);
              return O === null ? void 0 : _(O, k, j);
            } else {
              if ("value" in S)
                return S.value;
              var N = S.get;
              return N === void 0 ? void 0 : N.call(j);
            }
          }, l = i(0), u = m(l), f = i(5), h = m(f), c = i(9), s = m(c), d = i(13), y = m(d);
          function m(_) {
            return _ && _.__esModule ? _ : { default: _ };
          }
          function b(_, E) {
            if (!(_ instanceof E))
              throw new TypeError("Cannot call a class as a function");
          }
          function v(_, E) {
            if (!_)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return E && (typeof E == "object" || typeof E == "function") ? E : _;
          }
          function g(_, E) {
            if (typeof E != "function" && E !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof E);
            _.prototype = Object.create(E && E.prototype, { constructor: { value: _, enumerable: !1, writable: !0, configurable: !0 } }), E && (Object.setPrototypeOf ? Object.setPrototypeOf(_, E) : _.__proto__ = E);
          }
          var w = function(_) {
            g(E, _);
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
                var S = this.domNode.textContent;
                this.cachedText !== S && ((S.trim().length > 0 || this.cachedText == null) && (this.domNode.innerHTML = j(S), this.domNode.normalize(), this.attach()), this.cachedText = S);
              }
            }]), E;
          }(y.default);
          w.className = "ql-syntax";
          var p = new u.default.Attributor.Class("token", "hljs", {
            scope: u.default.Scope.INLINE
          }), x = function(_) {
            g(E, _), a(E, null, [{
              key: "register",
              value: function() {
                h.default.register(p, !0), h.default.register(w, !0);
              }
            }]);
            function E(k, j) {
              b(this, E);
              var S = v(this, (E.__proto__ || Object.getPrototypeOf(E)).call(this, k, j));
              if (typeof S.options.highlight != "function")
                throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
              var O = null;
              return S.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
                clearTimeout(O), O = setTimeout(function() {
                  S.highlight(), O = null;
                }, S.options.interval);
              }), S.highlight(), S;
            }
            return a(E, [{
              key: "highlight",
              value: function() {
                var j = this;
                if (!this.quill.selection.composing) {
                  this.quill.update(h.default.sources.USER);
                  var S = this.quill.getSelection();
                  this.quill.scroll.descendants(w).forEach(function(O) {
                    O.highlight(j.options.highlight);
                  }), this.quill.update(h.default.sources.SILENT), S != null && this.quill.setSelection(S, h.default.sources.SILENT);
                }
              }
            }]), E;
          }(s.default);
          x.DEFAULTS = {
            highlight: function() {
              return window.hljs == null ? null : function(_) {
                var E = window.hljs.highlightAuto(_);
                return E.value;
              };
            }(),
            interval: 1e3
          }, r.CodeBlock = w, r.CodeToken = p, r.default = x;
        },
        /* 76 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 77 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>';
        },
        /* 78 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>';
        },
        /* 79 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>';
        },
        /* 80 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>';
        },
        /* 81 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>';
        },
        /* 82 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>';
        },
        /* 83 */
        /***/
        function(n, r) {
          n.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>';
        },
        /* 84 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>';
        },
        /* 85 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>';
        },
        /* 86 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>';
        },
        /* 87 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 88 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 89 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>';
        },
        /* 90 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>';
        },
        /* 91 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>';
        },
        /* 92 */
        /***/
        function(n, r) {
          n.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>';
        },
        /* 93 */
        /***/
        function(n, r) {
          n.exports = '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>';
        },
        /* 94 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>';
        },
        /* 95 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>';
        },
        /* 96 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>';
        },
        /* 97 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>';
        },
        /* 98 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>';
        },
        /* 99 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>';
        },
        /* 100 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>';
        },
        /* 101 */
        /***/
        function(n, r) {
          n.exports = '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>';
        },
        /* 102 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>';
        },
        /* 103 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>';
        },
        /* 104 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>';
        },
        /* 105 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>';
        },
        /* 106 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>';
        },
        /* 107 */
        /***/
        function(n, r) {
          n.exports = '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>';
        },
        /* 108 */
        /***/
        function(n, r, i) {
          Object.defineProperty(r, "__esModule", {
            value: !0
          }), r.default = r.BubbleTooltip = void 0;
          var a = function E(k, j, S) {
            k === null && (k = Function.prototype);
            var O = Object.getOwnPropertyDescriptor(k, j);
            if (O === void 0) {
              var N = Object.getPrototypeOf(k);
              return N === null ? void 0 : E(N, j, S);
            } else {
              if ("value" in O)
                return O.value;
              var T = O.get;
              return T === void 0 ? void 0 : T.call(S);
            }
          }, o = function() {
            function E(k, j) {
              for (var S = 0; S < j.length; S++) {
                var O = j[S];
                O.enumerable = O.enumerable || !1, O.configurable = !0, "value" in O && (O.writable = !0), Object.defineProperty(k, O.key, O);
              }
            }
            return function(k, j, S) {
              return j && E(k.prototype, j), S && E(k, S), k;
            };
          }(), l = i(3), u = b(l), f = i(8), h = b(f), c = i(43), s = b(c), d = i(15), y = i(41), m = b(y);
          function b(E) {
            return E && E.__esModule ? E : { default: E };
          }
          function v(E, k) {
            if (!(E instanceof k))
              throw new TypeError("Cannot call a class as a function");
          }
          function g(E, k) {
            if (!E)
              throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return k && (typeof k == "object" || typeof k == "function") ? k : E;
          }
          function w(E, k) {
            if (typeof k != "function" && k !== null)
              throw new TypeError("Super expression must either be null or a function, not " + typeof k);
            E.prototype = Object.create(k && k.prototype, { constructor: { value: E, enumerable: !1, writable: !0, configurable: !0 } }), k && (Object.setPrototypeOf ? Object.setPrototypeOf(E, k) : E.__proto__ = k);
          }
          var p = [["bold", "italic", "link"], [{ header: 1 }, { header: 2 }, "blockquote"]], x = function(E) {
            w(k, E);
            function k(j, S) {
              v(this, k), S.modules.toolbar != null && S.modules.toolbar.container == null && (S.modules.toolbar.container = p);
              var O = g(this, (k.__proto__ || Object.getPrototypeOf(k)).call(this, j, S));
              return O.quill.container.classList.add("ql-bubble"), O;
            }
            return o(k, [{
              key: "extendToolbar",
              value: function(S) {
                this.tooltip = new _(this.quill, this.options.bounds), this.tooltip.root.appendChild(S.container), this.buildButtons([].slice.call(S.container.querySelectorAll("button")), m.default), this.buildPickers([].slice.call(S.container.querySelectorAll("select")), m.default);
              }
            }]), k;
          }(s.default);
          x.DEFAULTS = (0, u.default)(!0, {}, s.default.DEFAULTS, {
            modules: {
              toolbar: {
                handlers: {
                  link: function(k) {
                    k ? this.quill.theme.tooltip.edit() : this.quill.format("link", !1);
                  }
                }
              }
            }
          });
          var _ = function(E) {
            w(k, E);
            function k(j, S) {
              v(this, k);
              var O = g(this, (k.__proto__ || Object.getPrototypeOf(k)).call(this, j, S));
              return O.quill.on(h.default.events.EDITOR_CHANGE, function(N, T, C, D) {
                if (N === h.default.events.SELECTION_CHANGE)
                  if (T != null && T.length > 0 && D === h.default.sources.USER) {
                    O.show(), O.root.style.left = "0px", O.root.style.width = "", O.root.style.width = O.root.offsetWidth + "px";
                    var H = O.quill.getLines(T.index, T.length);
                    if (H.length === 1)
                      O.position(O.quill.getBounds(T));
                    else {
                      var U = H[H.length - 1], K = O.quill.getIndex(U), q = Math.min(U.length() - 1, T.index + T.length - K), P = O.quill.getBounds(new d.Range(K, q));
                      O.position(P);
                    }
                  } else
                    document.activeElement !== O.textbox && O.quill.hasFocus() && O.hide();
              }), O;
            }
            return o(k, [{
              key: "listen",
              value: function() {
                var S = this;
                a(k.prototype.__proto__ || Object.getPrototypeOf(k.prototype), "listen", this).call(this), this.root.querySelector(".ql-close").addEventListener("click", function() {
                  S.root.classList.remove("ql-editing");
                }), this.quill.on(h.default.events.SCROLL_OPTIMIZE, function() {
                  setTimeout(function() {
                    if (!S.root.classList.contains("ql-hidden")) {
                      var O = S.quill.getSelection();
                      O != null && S.position(S.quill.getBounds(O));
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
              value: function(S) {
                var O = a(k.prototype.__proto__ || Object.getPrototypeOf(k.prototype), "position", this).call(this, S), N = this.root.querySelector(".ql-tooltip-arrow");
                if (N.style.marginLeft = "", O === 0)
                  return O;
                N.style.marginLeft = -1 * O - N.offsetWidth / 2 + "px";
              }
            }]), k;
          }(c.BaseTooltip);
          _.TEMPLATE = ['<span class="ql-tooltip-arrow"></span>', '<div class="ql-tooltip-editor">', '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">', '<a class="ql-close"></a>', "</div>"].join(""), r.BubbleTooltip = _, r.default = x;
        },
        /* 109 */
        /***/
        function(n, r, i) {
          n.exports = i(63);
        }
        /******/
      ]).default
    );
  });
})(Zc);
var dw = Zc.exports, hw = tt && tt.__extends || function() {
  var e = function(t, n) {
    return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(r, i) {
      r.__proto__ = i;
    } || function(r, i) {
      for (var a in i)
        i.hasOwnProperty(a) && (r[a] = i[a]);
    }, e(t, n);
  };
  return function(t, n) {
    e(t, n);
    function r() {
      this.constructor = t;
    }
    t.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}(), Qr = tt && tt.__assign || function() {
  return Qr = Object.assign || function(e) {
    for (var t, n = 1, r = arguments.length; n < r; n++) {
      t = arguments[n];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, Qr.apply(this, arguments);
}, pw = tt && tt.__spreadArrays || function() {
  for (var e = 0, t = 0, n = arguments.length; t < n; t++)
    e += arguments[t].length;
  for (var r = Array(e), i = 0, t = 0; t < n; t++)
    for (var a = arguments[t], o = 0, l = a.length; o < l; o++, i++)
      r[i] = a[o];
  return r;
}, xi = tt && tt.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
}, ft = xi(Ue), vw = xi(Xr), Mn = xi(fw), Jl = xi(dw), gw = (
  /** @class */
  function(e) {
    hw(t, e);
    function t(n) {
      var r = e.call(this, n) || this;
      r.dirtyProps = [
        "modules",
        "formats",
        "bounds",
        "theme",
        "children"
      ], r.cleanProps = [
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
      ], r.state = {
        generation: 0
      }, r.selection = null, r.onEditorChange = function(a, o, l, u) {
        var f, h, c, s;
        a === "text-change" ? (h = (f = r).onEditorChangeText) === null || h === void 0 || h.call(f, r.editor.root.innerHTML, o, u, r.unprivilegedEditor) : a === "selection-change" && ((s = (c = r).onEditorChangeSelection) === null || s === void 0 || s.call(c, o, u, r.unprivilegedEditor));
      };
      var i = r.isControlled() ? n.value : n.defaultValue;
      return r.value = i ?? "", r;
    }
    return t.prototype.validateProps = function(n) {
      var r;
      if (ft.default.Children.count(n.children) > 1)
        throw new Error("The Quill editing area can only be composed of a single React element.");
      if (ft.default.Children.count(n.children)) {
        var i = ft.default.Children.only(n.children);
        if (((r = i) === null || r === void 0 ? void 0 : r.type) === "textarea")
          throw new Error("Quill does not support editing on a <textarea>. Use a <div> instead.");
      }
      if (this.lastDeltaChangeSet && n.value === this.lastDeltaChangeSet)
        throw new Error("You are passing the `delta` object from the `onChange` event back as `value`. You most probably want `editor.getContents()` instead. See: https://github.com/zenoamaro/react-quill#using-deltas");
    }, t.prototype.shouldComponentUpdate = function(n, r) {
      var i = this, a;
      if (this.validateProps(n), !this.editor || this.state.generation !== r.generation)
        return !0;
      if ("value" in n) {
        var o = this.getEditorContents(), l = (a = n.value, a ?? "");
        this.isEqualValue(l, o) || this.setEditorContents(this.editor, l);
      }
      return n.readOnly !== this.props.readOnly && this.setEditorReadOnly(this.editor, n.readOnly), pw(this.cleanProps, this.dirtyProps).some(function(u) {
        return !Mn.default(n[u], i.props[u]);
      });
    }, t.prototype.shouldComponentRegenerate = function(n) {
      var r = this;
      return this.dirtyProps.some(function(i) {
        return !Mn.default(n[i], r.props[i]);
      });
    }, t.prototype.componentDidMount = function() {
      this.instantiateEditor(), this.setEditorContents(this.editor, this.getEditorContents());
    }, t.prototype.componentWillUnmount = function() {
      this.destroyEditor();
    }, t.prototype.componentDidUpdate = function(n, r) {
      var i = this;
      if (this.editor && this.shouldComponentRegenerate(n)) {
        var a = this.editor.getContents(), o = this.editor.getSelection();
        this.regenerationSnapshot = { delta: a, selection: o }, this.setState({ generation: this.state.generation + 1 }), this.destroyEditor();
      }
      if (this.state.generation !== r.generation) {
        var l = this.regenerationSnapshot, a = l.delta, u = l.selection;
        delete this.regenerationSnapshot, this.instantiateEditor();
        var f = this.editor;
        f.setContents(a), eu(function() {
          return i.setEditorSelection(f, u);
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
    }, t.prototype.createEditor = function(n, r) {
      var i = new Jl.default(n, r);
      return r.tabIndex != null && this.setEditorTabIndex(i, r.tabIndex), this.hookEditor(i), i;
    }, t.prototype.hookEditor = function(n) {
      this.unprivilegedEditor = this.makeUnprivilegedEditor(n), n.on("editor-change", this.onEditorChange);
    }, t.prototype.unhookEditor = function(n) {
      n.off("editor-change", this.onEditorChange);
    }, t.prototype.getEditorContents = function() {
      return this.value;
    }, t.prototype.getEditorSelection = function() {
      return this.selection;
    }, t.prototype.isDelta = function(n) {
      return n && n.ops;
    }, t.prototype.isEqualValue = function(n, r) {
      return this.isDelta(n) && this.isDelta(r) ? Mn.default(n.ops, r.ops) : Mn.default(n, r);
    }, t.prototype.setEditorContents = function(n, r) {
      var i = this;
      this.value = r;
      var a = this.getEditorSelection();
      typeof r == "string" ? n.setContents(n.clipboard.convert(r)) : n.setContents(r), eu(function() {
        return i.setEditorSelection(n, a);
      });
    }, t.prototype.setEditorSelection = function(n, r) {
      if (this.selection = r, r) {
        var i = n.getLength();
        r.index = Math.max(0, Math.min(r.index, i - 1)), r.length = Math.max(0, Math.min(r.length, i - 1 - r.index)), n.setSelection(r);
      }
    }, t.prototype.setEditorTabIndex = function(n, r) {
      var i, a;
      !((a = (i = n) === null || i === void 0 ? void 0 : i.scroll) === null || a === void 0) && a.domNode && (n.scroll.domNode.tabIndex = r);
    }, t.prototype.setEditorReadOnly = function(n, r) {
      r ? n.disable() : n.enable();
    }, t.prototype.makeUnprivilegedEditor = function(n) {
      var r = n;
      return {
        getHTML: function() {
          return r.root.innerHTML;
        },
        getLength: r.getLength.bind(r),
        getText: r.getText.bind(r),
        getContents: r.getContents.bind(r),
        getSelection: r.getSelection.bind(r),
        getBounds: r.getBounds.bind(r)
      };
    }, t.prototype.getEditingArea = function() {
      if (!this.editingArea)
        throw new Error("Instantiating on missing editing area");
      var n = vw.default.findDOMNode(this.editingArea);
      if (!n)
        throw new Error("Cannot find element for editing area");
      if (n.nodeType === 3)
        throw new Error("Editing area cannot be a text node");
      return n;
    }, t.prototype.renderEditingArea = function() {
      var n = this, r = this.props, i = r.children, a = r.preserveWhitespace, o = this.state.generation, l = {
        key: o,
        ref: function(u) {
          n.editingArea = u;
        }
      };
      return ft.default.Children.count(i) ? ft.default.cloneElement(ft.default.Children.only(i), l) : a ? ft.default.createElement("pre", Qr({}, l)) : ft.default.createElement("div", Qr({}, l));
    }, t.prototype.render = function() {
      var n;
      return ft.default.createElement("div", { id: this.props.id, style: this.props.style, key: this.state.generation, className: "quill " + (n = this.props.className, n ?? ""), onKeyPress: this.props.onKeyPress, onKeyDown: this.props.onKeyDown, onKeyUp: this.props.onKeyUp }, this.renderEditingArea());
    }, t.prototype.onEditorChangeText = function(n, r, i, a) {
      var o, l;
      if (this.editor) {
        var u = this.isDelta(this.value) ? a.getContents() : a.getHTML();
        u !== this.getEditorContents() && (this.lastDeltaChangeSet = r, this.value = u, (l = (o = this.props).onChange) === null || l === void 0 || l.call(o, n, r, i, a));
      }
    }, t.prototype.onEditorChangeSelection = function(n, r, i) {
      var a, o, l, u, f, h;
      if (this.editor) {
        var c = this.getEditorSelection(), s = !c && n, d = c && !n;
        Mn.default(n, c) || (this.selection = n, (o = (a = this.props).onChangeSelection) === null || o === void 0 || o.call(a, n, r, i), s ? (u = (l = this.props).onFocus) === null || u === void 0 || u.call(l, n, r, i) : d && ((h = (f = this.props).onBlur) === null || h === void 0 || h.call(f, c, r, i)));
      }
    }, t.prototype.focus = function() {
      this.editor && this.editor.focus();
    }, t.prototype.blur = function() {
      this.editor && (this.selection = null, this.editor.blur());
    }, t.displayName = "React Quill", t.Quill = Jl.default, t.defaultProps = {
      theme: "snow",
      modules: {},
      readOnly: !1
    }, t;
  }(ft.default.Component)
);
function eu(e) {
  Promise.resolve().then(e);
}
var mw = gw;
const yw = /* @__PURE__ */ au(mw), bw = [
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
], xw = ({ toolbarClassName: e }) => /* @__PURE__ */ L.jsxs("div", { id: "toolbar", className: e, children: [
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
] }), Gw = ({
  label: e,
  id: t,
  value: n,
  onChange: r,
  placeholder: i,
  disabled: a,
  reference: o,
  error: l,
  className: u,
  toolbarClassName: f = ""
}) => {
  const h = (c, s) => {
    r && c === "user" && r(s.getHTML());
  };
  return /* @__PURE__ */ L.jsxs(L.Fragment, { children: [
    e && /* @__PURE__ */ L.jsx("label", { htmlFor: t, className: "block mb-1 text-left text-xs font-medium", children: e }),
    /* @__PURE__ */ L.jsx(xw, { toolbarClassName: f }),
    /* @__PURE__ */ L.jsx(
      yw,
      {
        modules: { toolbar: `.${f}` },
        ref: o,
        id: t,
        value: n,
        defaultValue: n,
        theme: "snow",
        onChange: h,
        placeholder: i,
        readOnly: a,
        className: u,
        formats: bw
      }
    ),
    l && /* @__PURE__ */ L.jsx("div", { className: "text-red text-xxs", children: l.message })
  ] });
};
export {
  _w as BannerResponsive,
  $w as BasicToast,
  Nw as BottomText,
  El as Button,
  Hw as ButtonCardMain,
  mv as ButtonDanger,
  Sw as ButtonMain,
  gv as ButtonSecondary,
  Lw as Card,
  Aw as Container,
  kw as CoverBackground,
  Mw as DataGrid,
  Tw as FormTitle,
  zw as Header,
  jw as Input,
  Uw as InputFile,
  Cw as Loader,
  Fw as Menu,
  Yw as Modal,
  Vw as ModalSwal,
  Ww as NoDataInfo,
  Iw as PageTitle,
  Rw as Pagination,
  Yv as PopoverMenu,
  Pw as PoweredText,
  Gw as RichEditor,
  qw as SectionHeader,
  uc as Select,
  Bw as SidePanel,
  Kw as Switch,
  Dw as ToastContainer,
  Kv as UiList,
  Ew as configureI18n,
  Ze as i18n
};
