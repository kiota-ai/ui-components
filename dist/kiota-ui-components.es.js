import $e, { useState as ur } from "react";
var oe = { exports: {} }, Y = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var je;
function sr() {
  if (je)
    return Y;
  je = 1;
  var x = $e, E = Symbol.for("react.element"), O = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, R = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, T = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(g, l, p) {
    var s, b = {}, _ = null, w = null;
    p !== void 0 && (_ = "" + p), l.key !== void 0 && (_ = "" + l.key), l.ref !== void 0 && (w = l.ref);
    for (s in l)
      h.call(l, s) && !T.hasOwnProperty(s) && (b[s] = l[s]);
    if (g && g.defaultProps)
      for (s in l = g.defaultProps, l)
        b[s] === void 0 && (b[s] = l[s]);
    return { $$typeof: E, type: g, key: _, ref: w, props: b, _owner: R.current };
  }
  return Y.Fragment = O, Y.jsx = m, Y.jsxs = m, Y;
}
var N = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ke;
function lr() {
  return ke || (ke = 1, process.env.NODE_ENV !== "production" && function() {
    var x = $e, E = Symbol.for("react.element"), O = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), T = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), g = Symbol.for("react.context"), l = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), s = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), w = Symbol.for("react.offscreen"), j = Symbol.iterator, $ = "@@iterator";
    function I(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = j && e[j] || e[$];
      return typeof r == "function" ? r : null;
    }
    var C = x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function d(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        z("error", e, t);
      }
    }
    function z(e, r, t) {
      {
        var n = C.ReactDebugCurrentFrame, i = n.getStackAddendum();
        i !== "" && (r += "%s", t = t.concat([i]));
        var u = t.map(function(o) {
          return String(o);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var J = !1, G = !1, H = !1, K = !1, De = !1, ie;
    ie = Symbol.for("react.module.reference");
    function Fe(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === h || e === T || De || e === R || e === p || e === s || K || e === w || J || G || H || typeof e == "object" && e !== null && (e.$$typeof === _ || e.$$typeof === b || e.$$typeof === m || e.$$typeof === g || e.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === ie || e.getModuleId !== void 0));
    }
    function Ie(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var i = r.displayName || r.name || "";
      return i !== "" ? t + "(" + i + ")" : t;
    }
    function ue(e) {
      return e.displayName || "Context";
    }
    function S(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case h:
          return "Fragment";
        case O:
          return "Portal";
        case T:
          return "Profiler";
        case R:
          return "StrictMode";
        case p:
          return "Suspense";
        case s:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            var r = e;
            return ue(r) + ".Consumer";
          case m:
            var t = e;
            return ue(t._context) + ".Provider";
          case l:
            return Ie(e, e.render, "ForwardRef");
          case b:
            var n = e.displayName || null;
            return n !== null ? n : S(e.type) || "Memo";
          case _: {
            var i = e, u = i._payload, o = i._init;
            try {
              return S(o(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var k = Object.assign, A = 0, se, le, ce, fe, de, ve, pe;
    function he() {
    }
    he.__reactDisabledLog = !0;
    function Ae() {
      {
        if (A === 0) {
          se = console.log, le = console.info, ce = console.warn, fe = console.error, de = console.group, ve = console.groupCollapsed, pe = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: he,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        A++;
      }
    }
    function We() {
      {
        if (A--, A === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: k({}, e, {
              value: se
            }),
            info: k({}, e, {
              value: le
            }),
            warn: k({}, e, {
              value: ce
            }),
            error: k({}, e, {
              value: fe
            }),
            group: k({}, e, {
              value: de
            }),
            groupCollapsed: k({}, e, {
              value: ve
            }),
            groupEnd: k({}, e, {
              value: pe
            })
          });
        }
        A < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var X = C.ReactCurrentDispatcher, Z;
    function L(e, r, t) {
      {
        if (Z === void 0)
          try {
            throw Error();
          } catch (i) {
            var n = i.stack.trim().match(/\n( *(at )?)/);
            Z = n && n[1] || "";
          }
        return `
` + Z + e;
      }
    }
    var Q = !1, M;
    {
      var Ye = typeof WeakMap == "function" ? WeakMap : Map;
      M = new Ye();
    }
    function ge(e, r) {
      if (!e || Q)
        return "";
      {
        var t = M.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      Q = !0;
      var i = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = X.current, X.current = null, Ae();
      try {
        if (r) {
          var o = function() {
            throw Error();
          };
          if (Object.defineProperty(o.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(o, []);
            } catch (P) {
              n = P;
            }
            Reflect.construct(e, [], o);
          } else {
            try {
              o.call();
            } catch (P) {
              n = P;
            }
            e.call(o.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (P) {
            n = P;
          }
          e();
        }
      } catch (P) {
        if (P && n && typeof P.stack == "string") {
          for (var a = P.stack.split(`
`), v = n.stack.split(`
`), c = a.length - 1, f = v.length - 1; c >= 1 && f >= 0 && a[c] !== v[f]; )
            f--;
          for (; c >= 1 && f >= 0; c--, f--)
            if (a[c] !== v[f]) {
              if (c !== 1 || f !== 1)
                do
                  if (c--, f--, f < 0 || a[c] !== v[f]) {
                    var y = `
` + a[c].replace(" at new ", " at ");
                    return e.displayName && y.includes("<anonymous>") && (y = y.replace("<anonymous>", e.displayName)), typeof e == "function" && M.set(e, y), y;
                  }
                while (c >= 1 && f >= 0);
              break;
            }
        }
      } finally {
        Q = !1, X.current = u, We(), Error.prepareStackTrace = i;
      }
      var F = e ? e.displayName || e.name : "", Pe = F ? L(F) : "";
      return typeof e == "function" && M.set(e, Pe), Pe;
    }
    function Ne(e, r, t) {
      return ge(e, !1);
    }
    function Ve(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function U(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ge(e, Ve(e));
      if (typeof e == "string")
        return L(e);
      switch (e) {
        case p:
          return L("Suspense");
        case s:
          return L("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case l:
            return Ne(e.render);
          case b:
            return U(e.type, r, t);
          case _: {
            var n = e, i = n._payload, u = n._init;
            try {
              return U(u(i), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var B = Object.prototype.hasOwnProperty, be = {}, me = C.ReactDebugCurrentFrame;
    function q(e) {
      if (e) {
        var r = e._owner, t = U(e.type, e._source, r ? r.type : null);
        me.setExtraStackFrame(t);
      } else
        me.setExtraStackFrame(null);
    }
    function Le(e, r, t, n, i) {
      {
        var u = Function.call.bind(B);
        for (var o in e)
          if (u(e, o)) {
            var a = void 0;
            try {
              if (typeof e[o] != "function") {
                var v = Error((n || "React class") + ": " + t + " type `" + o + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[o] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              a = e[o](r, o, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (c) {
              a = c;
            }
            a && !(a instanceof Error) && (q(i), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, o, typeof a), q(null)), a instanceof Error && !(a.message in be) && (be[a.message] = !0, q(i), d("Failed %s type: %s", t, a.message), q(null));
          }
      }
    }
    var Me = Array.isArray;
    function ee(e) {
      return Me(e);
    }
    function Ue(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Be(e) {
      try {
        return ye(e), !1;
      } catch {
        return !0;
      }
    }
    function ye(e) {
      return "" + e;
    }
    function Ee(e) {
      if (Be(e))
        return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ue(e)), ye(e);
    }
    var W = C.ReactCurrentOwner, qe = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Re, _e, re;
    re = {};
    function ze(e) {
      if (B.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function Je(e) {
      if (B.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Ge(e, r) {
      if (typeof e.ref == "string" && W.current && r && W.current.stateNode !== r) {
        var t = S(W.current.type);
        re[t] || (d('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', S(W.current.type), e.ref), re[t] = !0);
      }
    }
    function He(e, r) {
      {
        var t = function() {
          Re || (Re = !0, d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function Ke(e, r) {
      {
        var t = function() {
          _e || (_e = !0, d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var Xe = function(e, r, t, n, i, u, o) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: E,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: o,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: i
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function Ze(e, r, t, n, i) {
      {
        var u, o = {}, a = null, v = null;
        t !== void 0 && (Ee(t), a = "" + t), Je(r) && (Ee(r.key), a = "" + r.key), ze(r) && (v = r.ref, Ge(r, i));
        for (u in r)
          B.call(r, u) && !qe.hasOwnProperty(u) && (o[u] = r[u]);
        if (e && e.defaultProps) {
          var c = e.defaultProps;
          for (u in c)
            o[u] === void 0 && (o[u] = c[u]);
        }
        if (a || v) {
          var f = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && He(o, f), v && Ke(o, f);
        }
        return Xe(e, a, v, i, n, W.current, o);
      }
    }
    var te = C.ReactCurrentOwner, xe = C.ReactDebugCurrentFrame;
    function D(e) {
      if (e) {
        var r = e._owner, t = U(e.type, e._source, r ? r.type : null);
        xe.setExtraStackFrame(t);
      } else
        xe.setExtraStackFrame(null);
    }
    var ne;
    ne = !1;
    function ae(e) {
      return typeof e == "object" && e !== null && e.$$typeof === E;
    }
    function Te() {
      {
        if (te.current) {
          var e = S(te.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function Qe(e) {
      {
        if (e !== void 0) {
          var r = e.fileName.replace(/^.*[\\\/]/, ""), t = e.lineNumber;
          return `

Check your code at ` + r + ":" + t + ".";
        }
        return "";
      }
    }
    var we = {};
    function er(e) {
      {
        var r = Te();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function Ce(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = er(r);
        if (we[t])
          return;
        we[t] = !0;
        var n = "";
        e && e._owner && e._owner !== te.current && (n = " It was passed a child from " + S(e._owner.type) + "."), D(e), d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), D(null);
      }
    }
    function Oe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (ee(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            ae(n) && Ce(n, r);
          }
        else if (ae(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var i = I(e);
          if (typeof i == "function" && i !== e.entries)
            for (var u = i.call(e), o; !(o = u.next()).done; )
              ae(o.value) && Ce(o.value, r);
        }
      }
    }
    function rr(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === l || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === b))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = S(r);
          Le(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !ne) {
          ne = !0;
          var i = S(r);
          d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", i || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function tr(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            D(e), d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), D(null);
            break;
          }
        }
        e.ref !== null && (D(e), d("Invalid attribute `ref` supplied to `React.Fragment`."), D(null));
      }
    }
    function Se(e, r, t, n, i, u) {
      {
        var o = Fe(e);
        if (!o) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var v = Qe(i);
          v ? a += v : a += Te();
          var c;
          e === null ? c = "null" : ee(e) ? c = "array" : e !== void 0 && e.$$typeof === E ? (c = "<" + (S(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : c = typeof e, d("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", c, a);
        }
        var f = Ze(e, r, t, i, u);
        if (f == null)
          return f;
        if (o) {
          var y = r.children;
          if (y !== void 0)
            if (n)
              if (ee(y)) {
                for (var F = 0; F < y.length; F++)
                  Oe(y[F], e);
                Object.freeze && Object.freeze(y);
              } else
                d("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Oe(y, e);
        }
        return e === h ? tr(f) : rr(f), f;
      }
    }
    function nr(e, r, t) {
      return Se(e, r, t, !0);
    }
    function ar(e, r, t) {
      return Se(e, r, t, !1);
    }
    var or = ar, ir = nr;
    N.Fragment = h, N.jsx = or, N.jsxs = ir;
  }()), N;
}
process.env.NODE_ENV === "production" ? oe.exports = sr() : oe.exports = lr();
var V = oe.exports;
const dr = ({ label: x, placeholder: E, value: O, onChange: h, onInput: R }) => {
  const [T, m] = ur(O), g = (p) => {
    const s = p.target.value;
    m(s), h && h(s);
  }, l = (p) => {
    const s = p.target.value;
    m(s), R && R(s);
  };
  return /* @__PURE__ */ V.jsxs("div", { children: [
    /* @__PURE__ */ V.jsx("label", { htmlFor: "textInput", children: x }),
    /* @__PURE__ */ V.jsx(
      "input",
      {
        id: "textInput",
        type: "text",
        placeholder: E,
        value: T,
        onChange: g,
        onInput: l
      }
    )
  ] });
}, cr = ({
  textAlign: x,
  width: E,
  verticalMargin: O,
  marginRight: h,
  marginLeft: R,
  vertical: T,
  horizontal: m,
  textSize: g,
  weight: l,
  textColor: p,
  textColorHover: s,
  bgColor: b,
  bgHoverColor: _,
  borderColor: w,
  shadow: j,
  className: $
}) => {
  const I = x === "center" ? "text-center" : x === "right" ? "text-right" : "text-left", C = w ? `border border-${w}` : "";
  return `${I} block w-${E} my-${O} mr-${h} ml-${R} py-${T} px-${m} text-${g} font-${l} text-${p} placeholder-gray bg-${b} rounded-2xl shadow-${j} cursor-pointer transition-all duration-500 ease-in-out hover:bg-${_} hover:border-${w} hover:text-${s} hover:shadow-hover focus:outline-none hover:shadow-inner ${C} ${$}`;
};
const vr = (x) => {
  const {
    onClick: E,
    type: O,
    width: h = "full",
    verticalMargin: R = "5",
    vertical: T = "2.5",
    horizontal: m = "7",
    marginRight: g = "0",
    marginLeft: l = "0",
    bgColor: p = "transparence-blue",
    textColor: s = "blue-dark",
    bgHoverColor: b,
    borderColor: _,
    textColorHover: w,
    icon: j,
    iconComponent: $,
    text: I,
    disabled: C,
    textSize: d = "sm",
    weight: z = "semibold",
    shadow: J = "soft-white",
    iconWidth: G = "auto",
    textAlign: H = "center",
    className: K = ""
  } = x;
  return /* @__PURE__ */ V.jsxs(
    "button",
    {
      onClick: E,
      type: O,
      disabled: C,
      className: cr({
        textAlign: H,
        width: h,
        verticalMargin: R,
        marginRight: g,
        marginLeft: l,
        vertical: T,
        horizontal: m,
        textSize: d,
        weight: z,
        textColor: s,
        textColorHover: w,
        bgColor: p,
        bgHoverColor: b,
        borderColor: _,
        shadow: J,
        className: K
      }),
      children: [
        j && /* @__PURE__ */ V.jsx("img", { src: j, alt: "Icon", className: `inline | mr-2 | w-${G} ` }),
        $ && $,
        I
      ]
    }
  );
};
export {
  vr as Button,
  dr as TextInput
};
