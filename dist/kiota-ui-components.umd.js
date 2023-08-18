(function(j,k){typeof exports=="object"&&typeof module<"u"?k(exports,require("react")):typeof define=="function"&&define.amd?define(["exports","react"],k):(j=typeof globalThis<"u"?globalThis:j||self,k(j.UiComponents={},j.React))})(this,function(j,k){"use strict";var G={exports:{}},W={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var se;function Fe(){if(se)return W;se=1;var T=k,E=Symbol.for("react.element"),O=Symbol.for("react.fragment"),h=Object.prototype.hasOwnProperty,R=T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,x={key:!0,ref:!0,__self:!0,__source:!0};function m(g,l,p){var s,b={},_=null,C=null;p!==void 0&&(_=""+p),l.key!==void 0&&(_=""+l.key),l.ref!==void 0&&(C=l.ref);for(s in l)h.call(l,s)&&!x.hasOwnProperty(s)&&(b[s]=l[s]);if(g&&g.defaultProps)for(s in l=g.defaultProps,l)b[s]===void 0&&(b[s]=l[s]);return{$$typeof:E,type:g,key:_,ref:C,props:b,_owner:R.current}}return W.Fragment=O,W.jsx=m,W.jsxs=m,W}var Y={};/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var le;function Ie(){return le||(le=1,process.env.NODE_ENV!=="production"&&function(){var T=k,E=Symbol.for("react.element"),O=Symbol.for("react.portal"),h=Symbol.for("react.fragment"),R=Symbol.for("react.strict_mode"),x=Symbol.for("react.profiler"),m=Symbol.for("react.provider"),g=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),s=Symbol.for("react.suspense_list"),b=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),C=Symbol.for("react.offscreen"),$=Symbol.iterator,F="@@iterator";function V(e){if(e===null||typeof e!="object")return null;var r=$&&e[$]||e[F];return typeof r=="function"?r:null}var w=T.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function d(e){{for(var r=arguments.length,t=new Array(r>1?r-1:0),n=1;n<r;n++)t[n-1]=arguments[n];H("error",e,t)}}function H(e,r,t){{var n=w.ReactDebugCurrentFrame,i=n.getStackAddendum();i!==""&&(r+="%s",t=t.concat([i]));var u=t.map(function(o){return String(o)});u.unshift("Warning: "+r),Function.prototype.apply.call(console[e],console,u)}}var K=!1,X=!1,Z=!1,Q=!1,Ne=!1,fe;fe=Symbol.for("react.module.reference");function Ve(e){return!!(typeof e=="string"||typeof e=="function"||e===h||e===x||Ne||e===R||e===p||e===s||Q||e===C||K||X||Z||typeof e=="object"&&e!==null&&(e.$$typeof===_||e.$$typeof===b||e.$$typeof===m||e.$$typeof===g||e.$$typeof===l||e.$$typeof===fe||e.getModuleId!==void 0))}function Le(e,r,t){var n=e.displayName;if(n)return n;var i=r.displayName||r.name||"";return i!==""?t+"("+i+")":t}function ce(e){return e.displayName||"Context"}function S(e){if(e==null)return null;if(typeof e.tag=="number"&&d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case h:return"Fragment";case O:return"Portal";case x:return"Profiler";case R:return"StrictMode";case p:return"Suspense";case s:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case g:var r=e;return ce(r)+".Consumer";case m:var t=e;return ce(t._context)+".Provider";case l:return Le(e,e.render,"ForwardRef");case b:var n=e.displayName||null;return n!==null?n:S(e.type)||"Memo";case _:{var i=e,u=i._payload,o=i._init;try{return S(o(u))}catch{return null}}}return null}var D=Object.assign,L=0,de,ve,pe,he,ge,be,me;function ye(){}ye.__reactDisabledLog=!0;function Me(){{if(L===0){de=console.log,ve=console.info,pe=console.warn,he=console.error,ge=console.group,be=console.groupCollapsed,me=console.groupEnd;var e={configurable:!0,enumerable:!0,value:ye,writable:!0};Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e})}L++}}function Ue(){{if(L--,L===0){var e={configurable:!0,enumerable:!0,writable:!0};Object.defineProperties(console,{log:D({},e,{value:de}),info:D({},e,{value:ve}),warn:D({},e,{value:pe}),error:D({},e,{value:he}),group:D({},e,{value:ge}),groupCollapsed:D({},e,{value:be}),groupEnd:D({},e,{value:me})})}L<0&&d("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}}var ee=w.ReactCurrentDispatcher,re;function U(e,r,t){{if(re===void 0)try{throw Error()}catch(i){var n=i.stack.trim().match(/\n( *(at )?)/);re=n&&n[1]||""}return`
`+re+e}}var te=!1,B;{var Be=typeof WeakMap=="function"?WeakMap:Map;B=new Be}function Ee(e,r){if(!e||te)return"";{var t=B.get(e);if(t!==void 0)return t}var n;te=!0;var i=Error.prepareStackTrace;Error.prepareStackTrace=void 0;var u;u=ee.current,ee.current=null,Me();try{if(r){var o=function(){throw Error()};if(Object.defineProperty(o.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(o,[])}catch(P){n=P}Reflect.construct(e,[],o)}else{try{o.call()}catch(P){n=P}e.call(o.prototype)}}else{try{throw Error()}catch(P){n=P}e()}}catch(P){if(P&&n&&typeof P.stack=="string"){for(var a=P.stack.split(`
`),v=n.stack.split(`
`),f=a.length-1,c=v.length-1;f>=1&&c>=0&&a[f]!==v[c];)c--;for(;f>=1&&c>=0;f--,c--)if(a[f]!==v[c]){if(f!==1||c!==1)do if(f--,c--,c<0||a[f]!==v[c]){var y=`
`+a[f].replace(" at new "," at ");return e.displayName&&y.includes("<anonymous>")&&(y=y.replace("<anonymous>",e.displayName)),typeof e=="function"&&B.set(e,y),y}while(f>=1&&c>=0);break}}}finally{te=!1,ee.current=u,Ue(),Error.prepareStackTrace=i}var A=e?e.displayName||e.name:"",De=A?U(A):"";return typeof e=="function"&&B.set(e,De),De}function ze(e,r,t){return Ee(e,!1)}function Je(e){var r=e.prototype;return!!(r&&r.isReactComponent)}function z(e,r,t){if(e==null)return"";if(typeof e=="function")return Ee(e,Je(e));if(typeof e=="string")return U(e);switch(e){case p:return U("Suspense");case s:return U("SuspenseList")}if(typeof e=="object")switch(e.$$typeof){case l:return ze(e.render);case b:return z(e.type,r,t);case _:{var n=e,i=n._payload,u=n._init;try{return z(u(i),r,t)}catch{}}}return""}var J=Object.prototype.hasOwnProperty,Re={},_e=w.ReactDebugCurrentFrame;function q(e){if(e){var r=e._owner,t=z(e.type,e._source,r?r.type:null);_e.setExtraStackFrame(t)}else _e.setExtraStackFrame(null)}function qe(e,r,t,n,i){{var u=Function.call.bind(J);for(var o in e)if(u(e,o)){var a=void 0;try{if(typeof e[o]!="function"){var v=Error((n||"React class")+": "+t+" type `"+o+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[o]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw v.name="Invariant Violation",v}a=e[o](r,o,n,t,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(f){a=f}a&&!(a instanceof Error)&&(q(i),d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",n||"React class",t,o,typeof a),q(null)),a instanceof Error&&!(a.message in Re)&&(Re[a.message]=!0,q(i),d("Failed %s type: %s",t,a.message),q(null))}}}var Ge=Array.isArray;function ne(e){return Ge(e)}function He(e){{var r=typeof Symbol=="function"&&Symbol.toStringTag,t=r&&e[Symbol.toStringTag]||e.constructor.name||"Object";return t}}function Ke(e){try{return Te(e),!1}catch{return!0}}function Te(e){return""+e}function xe(e){if(Ke(e))return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",He(e)),Te(e)}var M=w.ReactCurrentOwner,Xe={key:!0,ref:!0,__self:!0,__source:!0},Ce,we,ae;ae={};function Ze(e){if(J.call(e,"ref")){var r=Object.getOwnPropertyDescriptor(e,"ref").get;if(r&&r.isReactWarning)return!1}return e.ref!==void 0}function Qe(e){if(J.call(e,"key")){var r=Object.getOwnPropertyDescriptor(e,"key").get;if(r&&r.isReactWarning)return!1}return e.key!==void 0}function er(e,r){if(typeof e.ref=="string"&&M.current&&r&&M.current.stateNode!==r){var t=S(M.current.type);ae[t]||(d('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',S(M.current.type),e.ref),ae[t]=!0)}}function rr(e,r){{var t=function(){Ce||(Ce=!0,d("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"key",{get:t,configurable:!0})}}function tr(e,r){{var t=function(){we||(we=!0,d("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",r))};t.isReactWarning=!0,Object.defineProperty(e,"ref",{get:t,configurable:!0})}}var nr=function(e,r,t,n,i,u,o){var a={$$typeof:E,type:e,key:r,ref:t,props:o,_owner:u};return a._store={},Object.defineProperty(a._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(a,"_self",{configurable:!1,enumerable:!1,writable:!1,value:n}),Object.defineProperty(a,"_source",{configurable:!1,enumerable:!1,writable:!1,value:i}),Object.freeze&&(Object.freeze(a.props),Object.freeze(a)),a};function ar(e,r,t,n,i){{var u,o={},a=null,v=null;t!==void 0&&(xe(t),a=""+t),Qe(r)&&(xe(r.key),a=""+r.key),Ze(r)&&(v=r.ref,er(r,i));for(u in r)J.call(r,u)&&!Xe.hasOwnProperty(u)&&(o[u]=r[u]);if(e&&e.defaultProps){var f=e.defaultProps;for(u in f)o[u]===void 0&&(o[u]=f[u])}if(a||v){var c=typeof e=="function"?e.displayName||e.name||"Unknown":e;a&&rr(o,c),v&&tr(o,c)}return nr(e,a,v,i,n,M.current,o)}}var oe=w.ReactCurrentOwner,Oe=w.ReactDebugCurrentFrame;function I(e){if(e){var r=e._owner,t=z(e.type,e._source,r?r.type:null);Oe.setExtraStackFrame(t)}else Oe.setExtraStackFrame(null)}var ie;ie=!1;function ue(e){return typeof e=="object"&&e!==null&&e.$$typeof===E}function Se(){{if(oe.current){var e=S(oe.current.type);if(e)return`

Check the render method of \``+e+"`."}return""}}function or(e){{if(e!==void 0){var r=e.fileName.replace(/^.*[\\\/]/,""),t=e.lineNumber;return`

Check your code at `+r+":"+t+"."}return""}}var Pe={};function ir(e){{var r=Se();if(!r){var t=typeof e=="string"?e:e.displayName||e.name;t&&(r=`

Check the top-level render call using <`+t+">.")}return r}}function je(e,r){{if(!e._store||e._store.validated||e.key!=null)return;e._store.validated=!0;var t=ir(r);if(Pe[t])return;Pe[t]=!0;var n="";e&&e._owner&&e._owner!==oe.current&&(n=" It was passed a child from "+S(e._owner.type)+"."),I(e),d('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',t,n),I(null)}}function ke(e,r){{if(typeof e!="object")return;if(ne(e))for(var t=0;t<e.length;t++){var n=e[t];ue(n)&&je(n,r)}else if(ue(e))e._store&&(e._store.validated=!0);else if(e){var i=V(e);if(typeof i=="function"&&i!==e.entries)for(var u=i.call(e),o;!(o=u.next()).done;)ue(o.value)&&je(o.value,r)}}}function ur(e){{var r=e.type;if(r==null||typeof r=="string")return;var t;if(typeof r=="function")t=r.propTypes;else if(typeof r=="object"&&(r.$$typeof===l||r.$$typeof===b))t=r.propTypes;else return;if(t){var n=S(r);qe(t,e.props,"prop",n,e)}else if(r.PropTypes!==void 0&&!ie){ie=!0;var i=S(r);d("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",i||"Unknown")}typeof r.getDefaultProps=="function"&&!r.getDefaultProps.isReactClassApproved&&d("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function sr(e){{for(var r=Object.keys(e.props),t=0;t<r.length;t++){var n=r[t];if(n!=="children"&&n!=="key"){I(e),d("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",n),I(null);break}}e.ref!==null&&(I(e),d("Invalid attribute `ref` supplied to `React.Fragment`."),I(null))}}function $e(e,r,t,n,i,u){{var o=Ve(e);if(!o){var a="";(e===void 0||typeof e=="object"&&e!==null&&Object.keys(e).length===0)&&(a+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var v=or(i);v?a+=v:a+=Se();var f;e===null?f="null":ne(e)?f="array":e!==void 0&&e.$$typeof===E?(f="<"+(S(e.type)||"Unknown")+" />",a=" Did you accidentally export a JSX literal instead of a component?"):f=typeof e,d("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",f,a)}var c=ar(e,r,t,i,u);if(c==null)return c;if(o){var y=r.children;if(y!==void 0)if(n)if(ne(y)){for(var A=0;A<y.length;A++)ke(y[A],e);Object.freeze&&Object.freeze(y)}else d("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");else ke(y,e)}return e===h?sr(c):ur(c),c}}function lr(e,r,t){return $e(e,r,t,!0)}function fr(e,r,t){return $e(e,r,t,!1)}var cr=fr,dr=lr;Y.Fragment=h,Y.jsx=cr,Y.jsxs=dr}()),Y}process.env.NODE_ENV==="production"?G.exports=Fe():G.exports=Ie();var N=G.exports;const Ae=({label:T,placeholder:E,value:O,onChange:h,onInput:R})=>{const[x,m]=k.useState(O),g=p=>{const s=p.target.value;m(s),h&&h(s)},l=p=>{const s=p.target.value;m(s),R&&R(s)};return N.jsxs("div",{children:[N.jsx("label",{htmlFor:"textInput",children:T}),N.jsx("input",{id:"textInput",type:"text",placeholder:E,value:x,onChange:g,onInput:l})]})},We=({textAlign:T,width:E,verticalMargin:O,marginRight:h,marginLeft:R,vertical:x,horizontal:m,textSize:g,weight:l,textColor:p,textColorHover:s,bgColor:b,bgHoverColor:_,borderColor:C,shadow:$,className:F})=>{const V=T==="center"?"text-center":T==="right"?"text-right":"text-left",w=C?`border border-${C}`:"";return`${V} block w-${E} my-${O} mr-${h} ml-${R} py-${x} px-${m} text-${g} font-${l} text-${p} placeholder-gray bg-${b} rounded-2xl shadow-${$} cursor-pointer transition-all duration-500 ease-in-out hover:bg-${_} hover:border-${C} hover:text-${s} hover:shadow-hover focus:outline-none hover:shadow-inner ${w} ${F}`},vr="",Ye=T=>{const{onClick:E,type:O,width:h="full",verticalMargin:R="5",vertical:x="2.5",horizontal:m="7",marginRight:g="0",marginLeft:l="0",bgColor:p="transparence-blue",textColor:s="blue-dark",bgHoverColor:b,borderColor:_,textColorHover:C,icon:$,iconComponent:F,text:V,disabled:w,textSize:d="sm",weight:H="semibold",shadow:K="soft-white",iconWidth:X="auto",textAlign:Z="center",className:Q=""}=T;return N.jsxs("button",{onClick:E,type:O,disabled:w,className:We({textAlign:Z,width:h,verticalMargin:R,marginRight:g,marginLeft:l,vertical:x,horizontal:m,textSize:d,weight:H,textColor:s,textColorHover:C,bgColor:p,bgHoverColor:b,borderColor:_,shadow:K,className:Q}),children:[$&&N.jsx("img",{src:$,alt:"Icon",className:`inline | mr-2 | w-${X} `}),F&&F,V]})},pr="";j.Button=Ye,j.TextInput=Ae,Object.defineProperty(j,Symbol.toStringTag,{value:"Module"})});
