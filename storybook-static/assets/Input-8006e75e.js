import{j as g}from"./jsx-runtime-ffb262ed.js";import{P as p}from"./index-8d47fad6.js";import{R as $e,r as yn}from"./index-76fb7be0.js";import{p as xn,q as wn}from"./index.esm-2d6aa1b6.js";function me(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function u(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?me(Object(n),!0).forEach(function(a){_(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):me(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Ot(t){"@babel/helpers - typeof";return Ot=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ot(t)}function kn(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function de(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function An(t,e,n){return e&&de(t.prototype,e),n&&de(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function _(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function Zt(t,e){return _n(t)||Pn(t,e)||Ye(t,e)||En()}function ct(t){return On(t)||Sn(t)||Ye(t)||Nn()}function On(t){if(Array.isArray(t))return zt(t)}function _n(t){if(Array.isArray(t))return t}function Sn(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Pn(t,e){var n=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(n!=null){var a=[],r=!0,i=!1,o,s;try{for(n=n.call(t);!(r=(o=n.next()).done)&&(a.push(o.value),!(e&&a.length===e));r=!0);}catch(f){i=!0,s=f}finally{try{!r&&n.return!=null&&n.return()}finally{if(i)throw s}}return a}}function Ye(t,e){if(t){if(typeof t=="string")return zt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return zt(t,e)}}function zt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function Nn(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function En(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var ve=function(){},te={},Ue={},We=null,qe={mark:ve,measure:ve};try{typeof window<"u"&&(te=window),typeof document<"u"&&(Ue=document),typeof MutationObserver<"u"&&(We=MutationObserver),typeof performance<"u"&&(qe=performance)}catch{}var In=te.navigator||{},pe=In.userAgent,be=pe===void 0?"":pe,Y=te,y=Ue,ge=We,dt=qe;Y.document;var F=!!y.documentElement&&!!y.head&&typeof y.addEventListener=="function"&&typeof y.createElement=="function",He=~be.indexOf("MSIE")||~be.indexOf("Trident/"),vt,pt,bt,gt,ht,L="___FONT_AWESOME___",Dt=16,Ve="fa",Xe="svg-inline--fa",G="data-fa-i2svg",$t="data-fa-pseudo-element",Cn="data-fa-pseudo-element-pending",ee="data-prefix",ne="data-icon",he="fontawesome-i2svg",Tn="async",jn=["HTML","HEAD","STYLE","SCRIPT"],Ge=function(){try{return!0}catch{return!1}}(),h="classic",x="sharp",ae=[h,x];function ut(t){return new Proxy(t,{get:function(n,a){return a in n?n[a]:n[h]}})}var it=ut((vt={},_(vt,h,{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit",fakd:"kit","fa-kit":"kit","fa-kit-duotone":"kit"}),_(vt,x,{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"}),vt)),ot=ut((pt={},_(pt,h,{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"}),_(pt,x,{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"}),pt)),st=ut((bt={},_(bt,h,{fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"}),_(bt,x,{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"}),bt)),Ln=ut((gt={},_(gt,h,{"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"}),_(gt,x,{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"}),gt)),Mn=/fa(s|r|l|t|d|b|k|ss|sr|sl|st)?[\-\ ]/,Be="fa-layers-text",Rn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp|Kit)?.*/i,Fn=ut((ht={},_(ht,h,{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"}),_(ht,x,{900:"fass",400:"fasr",300:"fasl",100:"fast"}),ht)),Ke=[1,2,3,4,5,6,7,8,9,10],zn=Ke.concat([11,12,13,14,15,16,17,18,19,20]),Dn=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],V={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},ft=new Set;Object.keys(ot[h]).map(ft.add.bind(ft));Object.keys(ot[x]).map(ft.add.bind(ft));var $n=[].concat(ae,ct(ft),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",V.GROUP,V.SWAP_OPACITY,V.PRIMARY,V.SECONDARY]).concat(Ke.map(function(t){return"".concat(t,"x")})).concat(zn.map(function(t){return"w-".concat(t)})),at=Y.FontAwesomeConfig||{};function Yn(t){var e=y.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function Un(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(y&&typeof y.querySelector=="function"){var Wn=[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];Wn.forEach(function(t){var e=Zt(t,2),n=e[0],a=e[1],r=Un(Yn(n));r!=null&&(at[a]=r)})}var Qe={styleDefault:"solid",familyDefault:"classic",cssPrefix:Ve,replacementClass:Xe,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};at.familyPrefix&&(at.cssPrefix=at.familyPrefix);var tt=u(u({},Qe),at);tt.autoReplaceSvg||(tt.observeMutations=!1);var d={};Object.keys(Qe).forEach(function(t){Object.defineProperty(d,t,{enumerable:!0,set:function(n){tt[t]=n,rt.forEach(function(a){return a(d)})},get:function(){return tt[t]}})});Object.defineProperty(d,"familyPrefix",{enumerable:!0,set:function(e){tt.cssPrefix=e,rt.forEach(function(n){return n(d)})},get:function(){return tt.cssPrefix}});Y.FontAwesomeConfig=d;var rt=[];function qn(t){return rt.push(t),function(){rt.splice(rt.indexOf(t),1)}}var D=Dt,j={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Hn(t){if(!(!t||!F)){var e=y.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=y.head.childNodes,a=null,r=n.length-1;r>-1;r--){var i=n[r],o=(i.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(o)>-1&&(a=i)}return y.head.insertBefore(e,a),t}}var Vn="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function lt(){for(var t=12,e="";t-- >0;)e+=Vn[Math.random()*62|0];return e}function et(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function re(t){return t.classList?et(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(e){return e})}function Je(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Xn(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,'="').concat(Je(t[n]),'" ')},"").trim()}function Nt(t){return Object.keys(t||{}).reduce(function(e,n){return e+"".concat(n,": ").concat(t[n].trim(),";")},"")}function ie(t){return t.size!==j.size||t.x!==j.x||t.y!==j.y||t.rotate!==j.rotate||t.flipX||t.flipY}function Gn(t){var e=t.transform,n=t.containerWidth,a=t.iconWidth,r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(e.x*32,", ").concat(e.y*32,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),f={transform:"".concat(i," ").concat(o," ").concat(s)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:f,path:c}}function Bn(t){var e=t.transform,n=t.width,a=n===void 0?Dt:n,r=t.height,i=r===void 0?Dt:r,o=t.startCentered,s=o===void 0?!1:o,f="";return s&&He?f+="translate(".concat(e.x/D-a/2,"em, ").concat(e.y/D-i/2,"em) "):s?f+="translate(calc(-50% + ".concat(e.x/D,"em), calc(-50% + ").concat(e.y/D,"em)) "):f+="translate(".concat(e.x/D,"em, ").concat(e.y/D,"em) "),f+="scale(".concat(e.size/D*(e.flipX?-1:1),", ").concat(e.size/D*(e.flipY?-1:1),") "),f+="rotate(".concat(e.rotate,"deg) "),f}var Kn=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
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
}`;function Ze(){var t=Ve,e=Xe,n=d.cssPrefix,a=d.replacementClass,r=Kn;if(n!==t||a!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(s,".".concat(a))}return r}var ye=!1;function jt(){d.autoAddCss&&!ye&&(Hn(Ze()),ye=!0)}var Qn={mixout:function(){return{dom:{css:Ze,insertCss:jt}}},hooks:function(){return{beforeDOMElementCreation:function(){jt()},beforeI2svg:function(){jt()}}}},M=Y||{};M[L]||(M[L]={});M[L].styles||(M[L].styles={});M[L].hooks||(M[L].hooks={});M[L].shims||(M[L].shims=[]);var T=M[L],tn=[],Jn=function t(){y.removeEventListener("DOMContentLoaded",t),_t=1,tn.map(function(e){return e()})},_t=!1;F&&(_t=(y.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(y.readyState),_t||y.addEventListener("DOMContentLoaded",Jn));function Zn(t){F&&(_t?setTimeout(t,0):tn.push(t))}function mt(t){var e=t.tag,n=t.attributes,a=n===void 0?{}:n,r=t.children,i=r===void 0?[]:r;return typeof t=="string"?Je(t):"<".concat(e," ").concat(Xn(a),">").concat(i.map(mt).join(""),"</").concat(e,">")}function xe(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var ta=function(e,n){return function(a,r,i,o){return e.call(n,a,r,i,o)}},Lt=function(e,n,a,r){var i=Object.keys(e),o=i.length,s=r!==void 0?ta(n,r):n,f,c,l;for(a===void 0?(f=1,l=e[i[0]]):(f=0,l=a);f<o;f++)c=i[f],l=s(l,e[c],c,e);return l};function ea(t){for(var e=[],n=0,a=t.length;n<a;){var r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){var i=t.charCodeAt(n++);(i&64512)==56320?e.push(((r&1023)<<10)+(i&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Yt(t){var e=ea(t);return e.length===1?e[0].toString(16):null}function na(t,e){var n=t.length,a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function we(t){return Object.keys(t).reduce(function(e,n){var a=t[n],r=!!a.icon;return r?e[a.iconName]=a.icon:e[n]=a,e},{})}function Ut(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=n.skipHooks,r=a===void 0?!1:a,i=we(e);typeof T.hooks.addPack=="function"&&!r?T.hooks.addPack(t,we(e)):T.styles[t]=u(u({},T.styles[t]||{}),i),t==="fas"&&Ut("fa",e)}var yt,xt,wt,K=T.styles,aa=T.shims,ra=(yt={},_(yt,h,Object.values(st[h])),_(yt,x,Object.values(st[x])),yt),oe=null,en={},nn={},an={},rn={},on={},ia=(xt={},_(xt,h,Object.keys(it[h])),_(xt,x,Object.keys(it[x])),xt);function oa(t){return~$n.indexOf(t)}function sa(t,e){var n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!oa(r)?r:null}var sn=function(){var e=function(i){return Lt(K,function(o,s,f){return o[f]=Lt(s,i,{}),o},{})};en=e(function(r,i,o){if(i[3]&&(r[i[3]]=o),i[2]){var s=i[2].filter(function(f){return typeof f=="number"});s.forEach(function(f){r[f.toString(16)]=o})}return r}),nn=e(function(r,i,o){if(r[o]=o,i[2]){var s=i[2].filter(function(f){return typeof f=="string"});s.forEach(function(f){r[f]=o})}return r}),on=e(function(r,i,o){var s=i[2];return r[o]=o,s.forEach(function(f){r[f]=o}),r});var n="far"in K||d.autoFetchSvg,a=Lt(aa,function(r,i){var o=i[0],s=i[1],f=i[2];return s==="far"&&!n&&(s="fas"),typeof o=="string"&&(r.names[o]={prefix:s,iconName:f}),typeof o=="number"&&(r.unicodes[o.toString(16)]={prefix:s,iconName:f}),r},{names:{},unicodes:{}});an=a.names,rn=a.unicodes,oe=Et(d.styleDefault,{family:d.familyDefault})};qn(function(t){oe=Et(t.styleDefault,{family:d.familyDefault})});sn();function se(t,e){return(en[t]||{})[e]}function fa(t,e){return(nn[t]||{})[e]}function X(t,e){return(on[t]||{})[e]}function fn(t){return an[t]||{prefix:null,iconName:null}}function la(t){var e=rn[t],n=se("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function U(){return oe}var fe=function(){return{prefix:null,iconName:null,rest:[]}};function Et(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.family,a=n===void 0?h:n,r=it[a][t],i=ot[a][t]||ot[a][r],o=t in T.styles?t:null;return i||o||null}var ke=(wt={},_(wt,h,Object.keys(st[h])),_(wt,x,Object.keys(st[x])),wt);function It(t){var e,n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.skipLookups,r=a===void 0?!1:a,i=(e={},_(e,h,"".concat(d.cssPrefix,"-").concat(h)),_(e,x,"".concat(d.cssPrefix,"-").concat(x)),e),o=null,s=h;(t.includes(i[h])||t.some(function(c){return ke[h].includes(c)}))&&(s=h),(t.includes(i[x])||t.some(function(c){return ke[x].includes(c)}))&&(s=x);var f=t.reduce(function(c,l){var m=sa(d.cssPrefix,l);if(K[l]?(l=ra[s].includes(l)?Ln[s][l]:l,o=l,c.prefix=l):ia[s].indexOf(l)>-1?(o=l,c.prefix=Et(l,{family:s})):m?c.iconName=m:l!==d.replacementClass&&l!==i[h]&&l!==i[x]&&c.rest.push(l),!r&&c.prefix&&c.iconName){var v=o==="fa"?fn(c.iconName):{},b=X(c.prefix,c.iconName);v.prefix&&(o=null),c.iconName=v.iconName||b||c.iconName,c.prefix=v.prefix||c.prefix,c.prefix==="far"&&!K.far&&K.fas&&!d.autoFetchSvg&&(c.prefix="fas")}return c},fe());return(t.includes("fa-brands")||t.includes("fab"))&&(f.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(f.prefix="fad"),!f.prefix&&s===x&&(K.fass||d.autoFetchSvg)&&(f.prefix="fass",f.iconName=X(f.prefix,f.iconName)||f.iconName),(f.prefix==="fa"||o==="fa")&&(f.prefix=U()||"fas"),f}var ca=function(){function t(){kn(this,t),this.definitions={}}return An(t,[{key:"add",value:function(){for(var n=this,a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];var o=r.reduce(this._pullDefinitions,{});Object.keys(o).forEach(function(s){n.definitions[s]=u(u({},n.definitions[s]||{}),o[s]),Ut(s,o[s]);var f=st[h][s];f&&Ut(f,o[s]),sn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(n,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(i){var o=r[i],s=o.prefix,f=o.iconName,c=o.icon,l=c[2];n[s]||(n[s]={}),l.length>0&&l.forEach(function(m){typeof m=="string"&&(n[s][m]=c)}),n[s][f]=c}),n}}]),t}(),Ae=[],Q={},Z={},ua=Object.keys(Z);function ma(t,e){var n=e.mixoutsTo;return Ae=t,Q={},Object.keys(Z).forEach(function(a){ua.indexOf(a)===-1&&delete Z[a]}),Ae.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(o){typeof r[o]=="function"&&(n[o]=r[o]),Ot(r[o])==="object"&&Object.keys(r[o]).forEach(function(s){n[o]||(n[o]={}),n[o][s]=r[o][s]})}),a.hooks){var i=a.hooks();Object.keys(i).forEach(function(o){Q[o]||(Q[o]=[]),Q[o].push(i[o])})}a.provides&&a.provides(Z)}),n}function Wt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];var i=Q[t]||[];return i.forEach(function(o){e=o.apply(null,[e].concat(a))}),e}function B(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];var r=Q[t]||[];r.forEach(function(i){i.apply(null,n)})}function R(){var t=arguments[0],e=Array.prototype.slice.call(arguments,1);return Z[t]?Z[t].apply(null,e):void 0}function qt(t){t.prefix==="fa"&&(t.prefix="fas");var e=t.iconName,n=t.prefix||U();if(e)return e=X(n,e)||e,xe(ln.definitions,n,e)||xe(T.styles,n,e)}var ln=new ca,da=function(){d.autoReplaceSvg=!1,d.observeMutations=!1,B("noAuto")},va={i2svg:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return F?(B("beforeI2svg",e),R("pseudoElements2svg",e),R("i2svg",e)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot;d.autoReplaceSvg===!1&&(d.autoReplaceSvg=!0),d.observeMutations=!0,Zn(function(){ba({autoReplaceSvgRoot:n}),B("watch",e)})}},pa={icon:function(e){if(e===null)return null;if(Ot(e)==="object"&&e.prefix&&e.iconName)return{prefix:e.prefix,iconName:X(e.prefix,e.iconName)||e.iconName};if(Array.isArray(e)&&e.length===2){var n=e[1].indexOf("fa-")===0?e[1].slice(3):e[1],a=Et(e[0]);return{prefix:a,iconName:X(a,n)||n}}if(typeof e=="string"&&(e.indexOf("".concat(d.cssPrefix,"-"))>-1||e.match(Mn))){var r=It(e.split(" "),{skipLookups:!0});return{prefix:r.prefix||U(),iconName:X(r.prefix,r.iconName)||r.iconName}}if(typeof e=="string"){var i=U();return{prefix:i,iconName:X(i,e)||e}}}},C={noAuto:da,config:d,dom:va,parse:pa,library:ln,findIconDefinition:qt,toHtml:mt},ba=function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},n=e.autoReplaceSvgRoot,a=n===void 0?y:n;(Object.keys(T.styles).length>0||d.autoFetchSvg)&&F&&d.autoReplaceSvg&&C.dom.i2svg({node:a})};function Ct(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(a){return mt(a)})}}),Object.defineProperty(t,"node",{get:function(){if(F){var a=y.createElement("div");return a.innerHTML=t.html,a.children}}}),t}function ga(t){var e=t.children,n=t.main,a=t.mask,r=t.attributes,i=t.styles,o=t.transform;if(ie(o)&&n.found&&!a.found){var s=n.width,f=n.height,c={x:s/f/2,y:.5};r.style=Nt(u(u({},i),{},{"transform-origin":"".concat(c.x+o.x/16,"em ").concat(c.y+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}function ha(t){var e=t.prefix,n=t.iconName,a=t.children,r=t.attributes,i=t.symbol,o=i===!0?"".concat(e,"-").concat(d.cssPrefix,"-").concat(n):i;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:u(u({},r),{},{id:o}),children:a}]}]}function le(t){var e=t.icons,n=e.main,a=e.mask,r=t.prefix,i=t.iconName,o=t.transform,s=t.symbol,f=t.title,c=t.maskId,l=t.titleId,m=t.extra,v=t.watchable,b=v===void 0?!1:v,A=a.found?a:n,P=A.width,w=A.height,N=r==="fak",k=[d.replacementClass,i?"".concat(d.cssPrefix,"-").concat(i):""].filter(function(z){return m.classes.indexOf(z)===-1}).filter(function(z){return z!==""||!!z}).concat(m.classes).join(" "),O={children:[],attributes:u(u({},m.attributes),{},{"data-prefix":r,"data-icon":i,class:k,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(P," ").concat(w)})},I=N&&!~m.classes.indexOf("fa-fw")?{width:"".concat(P/w*16*.0625,"em")}:{};b&&(O.attributes[G]=""),f&&(O.children.push({tag:"title",attributes:{id:O.attributes["aria-labelledby"]||"title-".concat(l||lt())},children:[f]}),delete O.attributes.title);var S=u(u({},O),{},{prefix:r,iconName:i,main:n,mask:a,maskId:c,transform:o,symbol:s,styles:u(u({},I),m.styles)}),q=a.found&&n.found?R("generateAbstractMask",S)||{children:[],attributes:{}}:R("generateAbstractIcon",S)||{children:[],attributes:{}},H=q.children,Tt=q.attributes;return S.children=H,S.attributes=Tt,s?ha(S):ga(S)}function Oe(t){var e=t.content,n=t.width,a=t.height,r=t.transform,i=t.title,o=t.extra,s=t.watchable,f=s===void 0?!1:s,c=u(u(u({},o.attributes),i?{title:i}:{}),{},{class:o.classes.join(" ")});f&&(c[G]="");var l=u({},o.styles);ie(r)&&(l.transform=Bn({transform:r,startCentered:!0,width:n,height:a}),l["-webkit-transform"]=l.transform);var m=Nt(l);m.length>0&&(c.style=m);var v=[];return v.push({tag:"span",attributes:c,children:[e]}),i&&v.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),v}function ya(t){var e=t.content,n=t.title,a=t.extra,r=u(u(u({},a.attributes),n?{title:n}:{}),{},{class:a.classes.join(" ")}),i=Nt(a.styles);i.length>0&&(r.style=i);var o=[];return o.push({tag:"span",attributes:r,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}var Mt=T.styles;function Ht(t){var e=t[0],n=t[1],a=t.slice(4),r=Zt(a,1),i=r[0],o=null;return Array.isArray(i)?o={tag:"g",attributes:{class:"".concat(d.cssPrefix,"-").concat(V.GROUP)},children:[{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(V.SECONDARY),fill:"currentColor",d:i[0]}},{tag:"path",attributes:{class:"".concat(d.cssPrefix,"-").concat(V.PRIMARY),fill:"currentColor",d:i[1]}}]}:o={tag:"path",attributes:{fill:"currentColor",d:i}},{found:!0,width:e,height:n,icon:o}}var xa={found:!1,width:512,height:512};function wa(t,e){!Ge&&!d.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Vt(t,e){var n=e;return e==="fa"&&d.styleDefault!==null&&(e=U()),new Promise(function(a,r){if(R("missingIconAbstract"),n==="fa"){var i=fn(t)||{};t=i.iconName||t,e=i.prefix||e}if(t&&e&&Mt[e]&&Mt[e][t]){var o=Mt[e][t];return a(Ht(o))}wa(t,e),a(u(u({},xa),{},{icon:d.showMissingIcons&&t?R("missingIconAbstract")||{}:{}}))})}var _e=function(){},Xt=d.measurePerformance&&dt&&dt.mark&&dt.measure?dt:{mark:_e,measure:_e},nt='FA "6.5.1"',ka=function(e){return Xt.mark("".concat(nt," ").concat(e," begins")),function(){return cn(e)}},cn=function(e){Xt.mark("".concat(nt," ").concat(e," ends")),Xt.measure("".concat(nt," ").concat(e),"".concat(nt," ").concat(e," begins"),"".concat(nt," ").concat(e," ends"))},ce={begin:ka,end:cn},kt=function(){};function Se(t){var e=t.getAttribute?t.getAttribute(G):null;return typeof e=="string"}function Aa(t){var e=t.getAttribute?t.getAttribute(ee):null,n=t.getAttribute?t.getAttribute(ne):null;return e&&n}function Oa(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(d.replacementClass)}function _a(){if(d.autoReplaceSvg===!0)return At.replace;var t=At[d.autoReplaceSvg];return t||At.replace}function Sa(t){return y.createElementNS("http://www.w3.org/2000/svg",t)}function Pa(t){return y.createElement(t)}function un(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.ceFn,a=n===void 0?t.tag==="svg"?Sa:Pa:n;if(typeof t=="string")return y.createTextNode(t);var r=a(t.tag);Object.keys(t.attributes||[]).forEach(function(o){r.setAttribute(o,t.attributes[o])});var i=t.children||[];return i.forEach(function(o){r.appendChild(un(o,{ceFn:a}))}),r}function Na(t){var e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}var At={replace:function(e){var n=e[0];if(n.parentNode)if(e[1].forEach(function(r){n.parentNode.insertBefore(un(r),n)}),n.getAttribute(G)===null&&d.keepOriginalSource){var a=y.createComment(Na(n));n.parentNode.replaceChild(a,n)}else n.remove()},nest:function(e){var n=e[0],a=e[1];if(~re(n).indexOf(d.replacementClass))return At.replace(e);var r=new RegExp("".concat(d.cssPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var i=a[0].attributes.class.split(" ").reduce(function(s,f){return f===d.replacementClass||f.match(r)?s.toSvg.push(f):s.toNode.push(f),s},{toNode:[],toSvg:[]});a[0].attributes.class=i.toSvg.join(" "),i.toNode.length===0?n.removeAttribute("class"):n.setAttribute("class",i.toNode.join(" "))}var o=a.map(function(s){return mt(s)}).join(`
`);n.setAttribute(G,""),n.innerHTML=o}};function Pe(t){t()}function mn(t,e){var n=typeof e=="function"?e:kt;if(t.length===0)n();else{var a=Pe;d.mutateApproach===Tn&&(a=Y.requestAnimationFrame||Pe),a(function(){var r=_a(),i=ce.begin("mutate");t.map(r),i(),n()})}}var ue=!1;function dn(){ue=!0}function Gt(){ue=!1}var St=null;function Ne(t){if(ge&&d.observeMutations){var e=t.treeCallback,n=e===void 0?kt:e,a=t.nodeCallback,r=a===void 0?kt:a,i=t.pseudoElementsCallback,o=i===void 0?kt:i,s=t.observeMutationsRoot,f=s===void 0?y:s;St=new ge(function(c){if(!ue){var l=U();et(c).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!Se(m.addedNodes[0])&&(d.searchPseudoElements&&o(m.target),n(m.target)),m.type==="attributes"&&m.target.parentNode&&d.searchPseudoElements&&o(m.target.parentNode),m.type==="attributes"&&Se(m.target)&&~Dn.indexOf(m.attributeName))if(m.attributeName==="class"&&Aa(m.target)){var v=It(re(m.target)),b=v.prefix,A=v.iconName;m.target.setAttribute(ee,b||l),A&&m.target.setAttribute(ne,A)}else Oa(m.target)&&r(m.target)})}}),F&&St.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function Ea(){St&&St.disconnect()}function Ia(t){var e=t.getAttribute("style"),n=[];return e&&(n=e.split(";").reduce(function(a,r){var i=r.split(":"),o=i[0],s=i.slice(1);return o&&s.length>0&&(a[o]=s.join(":").trim()),a},{})),n}function Ca(t){var e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"",r=It(re(t));return r.prefix||(r.prefix=U()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=fa(r.prefix,t.innerText)||se(r.prefix,Yt(t.innerText))),!r.iconName&&d.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function Ta(t){var e=et(t.attributes).reduce(function(r,i){return r.name!=="class"&&r.name!=="style"&&(r[i.name]=i.value),r},{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return d.autoA11y&&(n?e["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(a||lt()):(e["aria-hidden"]="true",e.focusable="false")),e}function ja(){return{iconName:null,title:null,titleId:null,prefix:null,transform:j,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function Ee(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},n=Ca(t),a=n.iconName,r=n.prefix,i=n.rest,o=Ta(t),s=Wt("parseNodeAttributes",{},t),f=e.styleParser?Ia(t):[];return u({iconName:a,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:j,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:i,styles:f,attributes:o}},s)}var La=T.styles;function vn(t){var e=d.autoReplaceSvg==="nest"?Ee(t,{styleParser:!1}):Ee(t);return~e.extra.classes.indexOf(Be)?R("generateLayersText",t,e):R("generateSvgReplacementMutation",t,e)}var W=new Set;ae.map(function(t){W.add("fa-".concat(t))});Object.keys(it[h]).map(W.add.bind(W));Object.keys(it[x]).map(W.add.bind(W));W=ct(W);function Ie(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!F)return Promise.resolve();var n=y.documentElement.classList,a=function(m){return n.add("".concat(he,"-").concat(m))},r=function(m){return n.remove("".concat(he,"-").concat(m))},i=d.autoFetchSvg?W:ae.map(function(l){return"fa-".concat(l)}).concat(Object.keys(La));i.includes("fa")||i.push("fa");var o=[".".concat(Be,":not([").concat(G,"])")].concat(i.map(function(l){return".".concat(l,":not([").concat(G,"])")})).join(", ");if(o.length===0)return Promise.resolve();var s=[];try{s=et(t.querySelectorAll(o))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var f=ce.begin("onTree"),c=s.reduce(function(l,m){try{var v=vn(m);v&&l.push(v)}catch(b){Ge||b.name==="MissingIcon"&&console.error(b)}return l},[]);return new Promise(function(l,m){Promise.all(c).then(function(v){mn(v,function(){a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),f(),l()})}).catch(function(v){f(),m(v)})})}function Ma(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;vn(t).then(function(n){n&&mn([n],e)})}function Ra(t){return function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(e||{}).icon?e:qt(e||{}),r=n.mask;return r&&(r=(r||{}).icon?r:qt(r||{})),t(a,u(u({},n),{},{mask:r}))}}var Fa=function(e){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=n.transform,r=a===void 0?j:a,i=n.symbol,o=i===void 0?!1:i,s=n.mask,f=s===void 0?null:s,c=n.maskId,l=c===void 0?null:c,m=n.title,v=m===void 0?null:m,b=n.titleId,A=b===void 0?null:b,P=n.classes,w=P===void 0?[]:P,N=n.attributes,k=N===void 0?{}:N,O=n.styles,I=O===void 0?{}:O;if(e){var S=e.prefix,q=e.iconName,H=e.icon;return Ct(u({type:"icon"},e),function(){return B("beforeDOMElementCreation",{iconDefinition:e,params:n}),d.autoA11y&&(v?k["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(A||lt()):(k["aria-hidden"]="true",k.focusable="false")),le({icons:{main:Ht(H),mask:f?Ht(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:S,iconName:q,transform:u(u({},j),r),symbol:o,title:v,maskId:l,titleId:A,extra:{attributes:k,styles:I,classes:w}})})}},za={mixout:function(){return{icon:Ra(Fa)}},hooks:function(){return{mutationObserverCallbacks:function(n){return n.treeCallback=Ie,n.nodeCallback=Ma,n}}},provides:function(e){e.i2svg=function(n){var a=n.node,r=a===void 0?y:a,i=n.callback,o=i===void 0?function(){}:i;return Ie(r,o)},e.generateSvgReplacementMutation=function(n,a){var r=a.iconName,i=a.title,o=a.titleId,s=a.prefix,f=a.transform,c=a.symbol,l=a.mask,m=a.maskId,v=a.extra;return new Promise(function(b,A){Promise.all([Vt(r,s),l.iconName?Vt(l.iconName,l.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(P){var w=Zt(P,2),N=w[0],k=w[1];b([n,le({icons:{main:N,mask:k},prefix:s,iconName:r,transform:f,symbol:c,maskId:m,title:i,titleId:o,extra:v,watchable:!0})])}).catch(A)})},e.generateAbstractIcon=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.transform,s=n.styles,f=Nt(s);f.length>0&&(r.style=f);var c;return ie(o)&&(c=R("generateAbstractTransformGrouping",{main:i,transform:o,containerWidth:i.width,iconWidth:i.width})),a.push(c||i.icon),{children:a,attributes:r}}}},Da={mixout:function(){return{layer:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,i=r===void 0?[]:r;return Ct({type:"layer"},function(){B("beforeDOMElementCreation",{assembler:n,params:a});var o=[];return n(function(s){Array.isArray(s)?s.map(function(f){o=o.concat(f.abstract)}):o=o.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(d.cssPrefix,"-layers")].concat(ct(i)).join(" ")},children:o}]})}}}},$a={mixout:function(){return{counter:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,i=r===void 0?null:r,o=a.classes,s=o===void 0?[]:o,f=a.attributes,c=f===void 0?{}:f,l=a.styles,m=l===void 0?{}:l;return Ct({type:"counter",content:n},function(){return B("beforeDOMElementCreation",{content:n,params:a}),ya({content:n.toString(),title:i,extra:{attributes:c,styles:m,classes:["".concat(d.cssPrefix,"-layers-counter")].concat(ct(s))}})})}}}},Ya={mixout:function(){return{text:function(n){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,i=r===void 0?j:r,o=a.title,s=o===void 0?null:o,f=a.classes,c=f===void 0?[]:f,l=a.attributes,m=l===void 0?{}:l,v=a.styles,b=v===void 0?{}:v;return Ct({type:"text",content:n},function(){return B("beforeDOMElementCreation",{content:n,params:a}),Oe({content:n,transform:u(u({},j),i),title:s,extra:{attributes:m,styles:b,classes:["".concat(d.cssPrefix,"-layers-text")].concat(ct(c))}})})}}},provides:function(e){e.generateLayersText=function(n,a){var r=a.title,i=a.transform,o=a.extra,s=null,f=null;if(He){var c=parseInt(getComputedStyle(n).fontSize,10),l=n.getBoundingClientRect();s=l.width/c,f=l.height/c}return d.autoA11y&&!r&&(o.attributes["aria-hidden"]="true"),Promise.resolve([n,Oe({content:n.innerHTML,width:s,height:f,transform:i,title:r,extra:o,watchable:!0})])}}},Ua=new RegExp('"',"ug"),Ce=[1105920,1112319];function Wa(t){var e=t.replace(Ua,""),n=na(e,0),a=n>=Ce[0]&&n<=Ce[1],r=e.length===2?e[0]===e[1]:!1;return{value:Yt(r?e[0]:e),isSecondary:a||r}}function Te(t,e){var n="".concat(Cn).concat(e.replace(":","-"));return new Promise(function(a,r){if(t.getAttribute(n)!==null)return a();var i=et(t.children),o=i.filter(function(H){return H.getAttribute($t)===e})[0],s=Y.getComputedStyle(t,e),f=s.getPropertyValue("font-family").match(Rn),c=s.getPropertyValue("font-weight"),l=s.getPropertyValue("content");if(o&&!f)return t.removeChild(o),a();if(f&&l!=="none"&&l!==""){var m=s.getPropertyValue("content"),v=~["Sharp"].indexOf(f[2])?x:h,b=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(f[2])?ot[v][f[2].toLowerCase()]:Fn[v][c],A=Wa(m),P=A.value,w=A.isSecondary,N=f[0].startsWith("FontAwesome"),k=se(b,P),O=k;if(N){var I=la(P);I.iconName&&I.prefix&&(k=I.iconName,b=I.prefix)}if(k&&!w&&(!o||o.getAttribute(ee)!==b||o.getAttribute(ne)!==O)){t.setAttribute(n,O),o&&t.removeChild(o);var S=ja(),q=S.extra;q.attributes[$t]=e,Vt(k,b).then(function(H){var Tt=le(u(u({},S),{},{icons:{main:H,mask:fe()},prefix:b,iconName:O,extra:q,watchable:!0})),z=y.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(z,t.firstChild):t.appendChild(z),z.outerHTML=Tt.map(function(hn){return mt(hn)}).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function qa(t){return Promise.all([Te(t,"::before"),Te(t,"::after")])}function Ha(t){return t.parentNode!==document.head&&!~jn.indexOf(t.tagName.toUpperCase())&&!t.getAttribute($t)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function je(t){if(F)return new Promise(function(e,n){var a=et(t.querySelectorAll("*")).filter(Ha).map(qa),r=ce.begin("searchPseudoElements");dn(),Promise.all(a).then(function(){r(),Gt(),e()}).catch(function(){r(),Gt(),n()})})}var Va={hooks:function(){return{mutationObserverCallbacks:function(n){return n.pseudoElementsCallback=je,n}}},provides:function(e){e.pseudoElements2svg=function(n){var a=n.node,r=a===void 0?y:a;d.searchPseudoElements&&je(r)}}},Le=!1,Xa={mixout:function(){return{dom:{unwatch:function(){dn(),Le=!0}}}},hooks:function(){return{bootstrap:function(){Ne(Wt("mutationObserverCallbacks",{}))},noAuto:function(){Ea()},watch:function(n){var a=n.observeMutationsRoot;Le?Gt():Ne(Wt("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},Me=function(e){var n={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return e.toLowerCase().split(" ").reduce(function(a,r){var i=r.toLowerCase().split("-"),o=i[0],s=i.slice(1).join("-");if(o&&s==="h")return a.flipX=!0,a;if(o&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(o){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},n)},Ga={mixout:function(){return{parse:{transform:function(n){return Me(n)}}}},hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-transform");return r&&(n.transform=Me(r)),n}}},provides:function(e){e.generateAbstractTransformGrouping=function(n){var a=n.main,r=n.transform,i=n.containerWidth,o=n.iconWidth,s={transform:"translate(".concat(i/2," 256)")},f="translate(".concat(r.x*32,", ").concat(r.y*32,") "),c="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),l="rotate(".concat(r.rotate," 0 0)"),m={transform:"".concat(f," ").concat(c," ").concat(l)},v={transform:"translate(".concat(o/2*-1," -256)")},b={outer:s,inner:m,path:v};return{tag:"g",attributes:u({},b.outer),children:[{tag:"g",attributes:u({},b.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:u(u({},a.icon.attributes),b.path)}]}]}}}},Rt={x:0,y:0,width:"100%",height:"100%"};function Re(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Ba(t){return t.tag==="g"?t.children:[t]}var Ka={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-mask"),i=r?It(r.split(" ").map(function(o){return o.trim()})):fe();return i.prefix||(i.prefix=U()),n.mask=i,n.maskId=a.getAttribute("data-fa-mask-id"),n}}},provides:function(e){e.generateAbstractMask=function(n){var a=n.children,r=n.attributes,i=n.main,o=n.mask,s=n.maskId,f=n.transform,c=i.width,l=i.icon,m=o.width,v=o.icon,b=Gn({transform:f,containerWidth:m,iconWidth:c}),A={tag:"rect",attributes:u(u({},Rt),{},{fill:"white"})},P=l.children?{children:l.children.map(Re)}:{},w={tag:"g",attributes:u({},b.inner),children:[Re(u({tag:l.tag,attributes:u(u({},l.attributes),b.path)},P))]},N={tag:"g",attributes:u({},b.outer),children:[w]},k="mask-".concat(s||lt()),O="clip-".concat(s||lt()),I={tag:"mask",attributes:u(u({},Rt),{},{id:k,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[A,N]},S={tag:"defs",children:[{tag:"clipPath",attributes:{id:O},children:Ba(v)},I]};return a.push(S,{tag:"rect",attributes:u({fill:"currentColor","clip-path":"url(#".concat(O,")"),mask:"url(#".concat(k,")")},Rt)}),{children:a,attributes:r}}}},Qa={provides:function(e){var n=!1;Y.matchMedia&&(n=Y.matchMedia("(prefers-reduced-motion: reduce)").matches),e.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},i={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:u(u({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var o=u(u({},i),{},{attributeName:"opacity"}),s={tag:"circle",attributes:u(u({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return n||s.children.push({tag:"animate",attributes:u(u({},i),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:u(u({},o),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:u(u({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:n?[]:[{tag:"animate",attributes:u(u({},o),{},{values:"1;0;0;0;0;1;"})}]}),n||a.push({tag:"path",attributes:u(u({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:u(u({},o),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},Ja={hooks:function(){return{parseNodeAttributes:function(n,a){var r=a.getAttribute("data-fa-symbol"),i=r===null?!1:r===""?!0:r;return n.symbol=i,n}}}},Za=[Qn,za,Da,$a,Ya,Va,Xa,Ga,Ka,Qa,Ja];ma(Za,{mixoutsTo:C});C.noAuto;C.config;C.library;C.dom;var Bt=C.parse;C.findIconDefinition;C.toHtml;var tr=C.icon;C.layer;C.text;C.counter;function Fe(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function $(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Fe(Object(n),!0).forEach(function(a){J(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Fe(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function Pt(t){"@babel/helpers - typeof";return Pt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Pt(t)}function J(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function er(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,i;for(i=0;i<a.length;i++)r=a[i],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function nr(t,e){if(t==null)return{};var n=er(t,e),a,r;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);for(r=0;r<i.length;r++)a=i[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Kt(t){return ar(t)||rr(t)||ir(t)||or()}function ar(t){if(Array.isArray(t))return Qt(t)}function rr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ir(t,e){if(t){if(typeof t=="string")return Qt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Qt(t,e)}}function Qt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function or(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function sr(t){var e,n=t.beat,a=t.fade,r=t.beatFade,i=t.bounce,o=t.shake,s=t.flash,f=t.spin,c=t.spinPulse,l=t.spinReverse,m=t.pulse,v=t.fixedWidth,b=t.inverse,A=t.border,P=t.listItem,w=t.flip,N=t.size,k=t.rotation,O=t.pull,I=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":i,"fa-shake":o,"fa-flash":s,"fa-spin":f,"fa-spin-reverse":l,"fa-spin-pulse":c,"fa-pulse":m,"fa-fw":v,"fa-inverse":b,"fa-border":A,"fa-li":P,"fa-flip":w===!0,"fa-flip-horizontal":w==="horizontal"||w==="both","fa-flip-vertical":w==="vertical"||w==="both"},J(e,"fa-".concat(N),typeof N<"u"&&N!==null),J(e,"fa-rotate-".concat(k),typeof k<"u"&&k!==null&&k!==0),J(e,"fa-pull-".concat(O),typeof O<"u"&&O!==null),J(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(I).map(function(S){return I[S]?S:null}).filter(function(S){return S})}function fr(t){return t=t-0,t===t}function pn(t){return fr(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var lr=["style"];function cr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function ur(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=pn(n.slice(0,a)),i=n.slice(a+1).trim();return r.startsWith("webkit")?e[cr(r)]=i:e[r]=i,e},{})}function bn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(f){return bn(t,f)}),r=Object.keys(e.attributes||{}).reduce(function(f,c){var l=e.attributes[c];switch(c){case"class":f.attrs.className=l,delete e.attributes.class;break;case"style":f.attrs.style=ur(l);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?f.attrs[c.toLowerCase()]=l:f.attrs[pn(c)]=l}return f},{attrs:{}}),i=n.style,o=i===void 0?{}:i,s=nr(n,lr);return r.attrs.style=$($({},r.attrs.style),o),t.apply(void 0,[e.tag,$($({},r.attrs),s)].concat(Kt(a)))}var gn=!1;try{gn=!0}catch{}function mr(){if(!gn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function ze(t){if(t&&Pt(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Bt.icon)return Bt.icon(t);if(t===null)return null;if(t&&Pt(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function Ft(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?J({},t,e):{}}var E=$e.forwardRef(function(t,e){var n=t.icon,a=t.mask,r=t.symbol,i=t.className,o=t.title,s=t.titleId,f=t.maskId,c=ze(n),l=Ft("classes",[].concat(Kt(sr(t)),Kt(i.split(" ")))),m=Ft("transform",typeof t.transform=="string"?Bt.transform(t.transform):t.transform),v=Ft("mask",ze(a)),b=tr(c,$($($($({},l),m),v),{},{symbol:r,title:o,titleId:s,maskId:f}));if(!b)return mr("Could not find icon",c),null;var A=b.abstract,P={ref:e};return Object.keys(t).forEach(function(w){E.defaultProps.hasOwnProperty(w)||(P[w]=t[w])}),dr(A[0],P)});E.displayName="FontAwesomeIcon";E.propTypes={beat:p.bool,border:p.bool,beatFade:p.bool,bounce:p.bool,className:p.string,fade:p.bool,flash:p.bool,mask:p.oneOfType([p.object,p.array,p.string]),maskId:p.string,fixedWidth:p.bool,inverse:p.bool,flip:p.oneOf([!0,!1,"horizontal","vertical","both"]),icon:p.oneOfType([p.object,p.array,p.string]),listItem:p.bool,pull:p.oneOf(["right","left"]),pulse:p.bool,rotation:p.oneOf([0,90,180,270]),shake:p.bool,size:p.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:p.bool,spinPulse:p.bool,spinReverse:p.bool,symbol:p.oneOfType([p.bool,p.string]),title:p.string,titleId:p.string,transform:p.oneOfType([p.string,p.object]),swapOpacity:p.bool};E.defaultProps={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1};var dr=bn.bind(null,$e.createElement);const Jt=({errors:t})=>{var n,a,r,i,o,s,f,c,l;let e="";return(t.password_register&&t.password_register.types||t.new_password&&t.new_password.types)&&(t.password_register&&((a=(n=t==null?void 0:t.password_register)==null?void 0:n.types)!=null&&a.matches)?e=e+t.password_register.types.matches:t.new_password&&((i=(r=t==null?void 0:t.new_password)==null?void 0:r.types)!=null&&i.matches)&&(e=e+t.new_password.types.matches),t.password_register&&((s=(o=t==null?void 0:t.password_register)==null?void 0:o.types)!=null&&s.min)?e=e+t.password_register.types.min:t.new_password&&((c=(f=t==null?void 0:t.new_password)==null?void 0:f.types)!=null&&c.min)&&(e=e+((l=t==null?void 0:t.new_password.types)==null?void 0:l.min))),g.jsxs("div",{className:"text-xs mb-4 mt-4",children:["t('password_req')",g.jsxs("ul",{className:"ml-2",children:[g.jsxs("li",{children:[e&&!e.includes("t('password_length')")?g.jsx(E,{className:"mr-1 text-blue-light",icon:"check"}):g.jsx(E,{className:"mr-1 text-red",icon:"check"}),"t('password_req_min_char')"," "]}),g.jsxs("li",{children:[e&&!e.includes("t('password_req_uppercase')")?g.jsx(E,{className:"mr-1 text-blue-light",icon:"check"}):g.jsx(E,{className:"mr-1 text-red",icon:"check"}),"t('password_req_uppercase')"," "]}),g.jsxs("li",{children:[e&&!e.includes("t('password_req_lowercase')")?g.jsx(E,{className:"mr-1 text-blue-light",icon:"check"}):g.jsx(E,{className:"mr-1 text-red",icon:"check"}),"t('password_req_lowercase')"," "]}),g.jsxs("li",{children:[e&&!e.includes("t('password_req_number')")?g.jsx(E,{className:"mr-1 text-blue-light",icon:"check"}):g.jsx(E,{className:"mr-1 text-red",icon:"check"}),"t('password_req_number')"," "]}),g.jsxs("li",{children:[e&&!e.includes("t('password_req_special_char')")?g.jsx(E,{className:"mr-1 text-blue-light",icon:"check"}):g.jsx(E,{className:"mr-1 text-red",icon:"check"}),"t('password_req_special_char'): ^ $ * . [ ] { } ( ) ? \" ! @ # % & , > < ' : ; _ ~  ` \\ |"]})]})]})};try{Jt.displayName="PasswordRequirements",Jt.__docgenInfo={description:"",displayName:"PasswordRequirements",props:{errors:{defaultValue:null,description:"",name:"errors",required:!0,type:{name:"Errors"}}}}}catch{}const De=({reference:t,error:e,label:n,placeholder:a,type:r,maxLength:i=255,required:o=!1,className:s="shadow-soft-white  bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-2xl placeholder-gray cursor-pointer transition-all duration-200",labelClassName:f="font-medium",...c})=>{const[l,m]=yn.useState(r||"text");return g.jsxs("div",{className:"w-full",children:[n&&g.jsxs("label",{htmlFor:n,className:`block mb-1 text-left text-xs flex ${f}`,children:[n," ",o&&g.jsx("span",{className:"text-red inline-block mx-1",children:"*"})]}),g.jsx("input",{...t,...c,type:l,maxLength:i,placeholder:a,required:o,className:`border border-gray-lines focus:border-main bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-2xl placeholder-gray cursor-pointer transition-all duration-200 outline-none hover:border-main ${s}`}),r==="password"&&g.jsxs("div",{className:"relative flex justify-end mr-4 bottom-9 md:bottom-12",children:[l==="password"&&g.jsx(xn,{onClick:()=>m("text"),className:"cursor-pointer text-main text-sm z-20"}),l!=="password"&&g.jsx(wn,{onClick:()=>m("password"),className:"cursor-pointer text-main text-sm z-20"})]}),e&&((e==null?void 0:e.password_register)||(e==null?void 0:e.new_password))&&g.jsx(Jt,{errors:e}),e&&g.jsx("div",{className:"text-red relative left-2 -top-3 text-xxs text-left",children:e.message})]})};try{De.displayName="Input",De.__docgenInfo={description:"",displayName:"Input",props:{reference:{defaultValue:null,description:"",name:"reference",required:!0,type:{name:"Ref<HTMLInputElement>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"any"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!1,type:{name:"string"}},type:{defaultValue:null,description:"",name:"type",required:!0,type:{name:"string"}},maxLength:{defaultValue:{value:"255"},description:"",name:"maxLength",required:!1,type:{name:"number"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:"shadow-soft-white  bg-input w-full py-3 px-7 mb-2 sm:mb-5 relative z-10 text-left text-xs font-normal rounded-2xl placeholder-gray cursor-pointer transition-all duration-200"},description:"",name:"className",required:!1,type:{name:"string"}},labelClassName:{defaultValue:{value:"font-medium"},description:"",name:"labelClassName",required:!1,type:{name:"string"}}}}}catch{}export{De as I};
