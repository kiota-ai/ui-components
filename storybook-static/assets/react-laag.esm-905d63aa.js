import{r as g}from"./index-76fb7be0.js";import{r as qe}from"./index-d3ea75b5.js";function we(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function ae(e,n,r){return n&&we(e.prototype,n),r&&we(e,r),e}function H(){return H=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},H.apply(this,arguments)}function Je(e,n){e.prototype=Object.create(n.prototype),e.prototype.constructor=e,fe(e,n)}function fe(e,n){return fe=Object.setPrototypeOf||function(t,i){return t.__proto__=i,t},fe(e,n)}function Qe(e,n){if(e==null)return{};var r={},t=Object.keys(e),i,o;for(o=0;o<t.length;o++)i=t[o],!(n.indexOf(i)>=0)&&(r[i]=e[i]);return r}function et(e,n){if(e){if(typeof e=="string")return Ce(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return Ce(e,n)}}function Ce(e,n){(n==null||n>e.length)&&(n=e.length);for(var r=0,t=new Array(n);r<n;r++)t[r]=e[r];return t}function U(e,n){var r=typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(r)return(r=r.call(e)).next.bind(r);if(Array.isArray(e)||(r=et(e))||n&&e&&typeof e.length=="number"){r&&(e=r);var t=0;return function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Se(e){var n=g.useRef(null);function r(t){!t||t===n.current||(n.current=t,e(t))}return r}function tt(e){var n=g.useRef(e);return g.useMemo(function(){function r(i){typeof i=="function"?n.current=i(n.current):n.current=i}function t(){return n.current}return[t,r]},[])}function rt(){var e=g.useRef([]);return g.useMemo(function(){function n(){return e.current.length>0}function r(){for(var i=U(e.current),o;!(o=i()).done;){var a=o.value;a()}e.current=[]}function t(i){e.current.push(i)}return{hasEventSubscriptions:n,removeAllEventSubscriptions:r,addEventSubscription:t}},[])}var ue=typeof window<"u"?g.useLayoutEffect:g.useEffect;function nt(e,n){var r=g.useRef(e);return n?(r.current=e,r):(r.current=null,r)}function K(e){return parseFloat(e.replace("px",""))}function ce(e,n,r){return e<n?n:e>r?r:e}function Oe(e){return e!=null}function Pe(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return function(t){for(var i=U(n),o;!(o=i()).done;){var a=o.value;a&&(typeof a=="function"?a(t):a.current=t)}}}function it(e,n){if(!(typeof e>"u"))return n||e.ResizeObserver}function je(e,n){var r=[];if(!e||!n||e===document.body)return r;var t=n.getComputedStyle(e),i=t.overflow,o=t.overflowX,a=t.overflowY;return[i,o,a].some(function(s){return["auto","scroll"].includes(s)})&&r.push(e),[].concat(r,je(e.parentElement,n))}function Q(e){return"react-laag: Could not find a valid reference for the "+e+` element. There might be 2 causes:
   - Make sure that the 'ref' is set correctly on the `+e+` element when isOpen: true. Also make sure your component forwards the ref with "forwardRef()".
   - Make sure that you are actually rendering the `+e+" when the isOpen prop is set to true"}function ot(e){var n=e.enabled,r=e.onChange,t=e.environment,i=e.ResizeObserverPolyfill,o=e.overflowContainer,a=e.triggerOption,s=it(t,i);g.useEffect(function(){},[s]);var u=g.useRef(null),l=!!a,c=tt({scrollContainers:[],trigger:null,layer:null}),f=c[0],p=c[1],v=rt(),d=v.hasEventSubscriptions,h=v.addEventSubscription,y=v.removeAllEventSubscriptions,m=g.useCallback(function(){var w=f(),E=w.layer,O=w.trigger,$=w.scrollContainers,R=$[0];if(!E)throw new Error(Q("layer"));if(!O&&!l)throw new Error(Q("trigger"));var N={top:0,left:0};if(R){var A=R.scrollLeft,W=R.scrollTop;N={top:W,left:A}}else{var z=t.scrollX,x=t.scrollY;N={top:x,left:z}}var G={left:0,top:0};if(R){var D=t.getComputedStyle(R),Z=D.borderLeftWidth,X=D.borderTopWidth;G={left:K(Z)||0,top:K(X)||0}}r({layer:E,trigger:O,scrollContainers:$,arrow:u.current},N,G)},[f,r,t,u,l]),T=g.useCallback(function(){var w=f(),E=w.trigger,O=w.layer,$=w.scrollContainers;if(!O)throw new Error(Q("layer"));if(!E&&!l)throw new Error(Q("trigger"));if(s){for(var R=!1,N=function(){if(!R){R=!0;return}m()},A=new s(N),W=0,z=[E,O,document.body];W<z.length;W++){var x=z[W];x&&A.observe(x)}h(function(){for(var F=0,Y=[E,O,document.body];F<Y.length;F++){var q=Y[F];q&&A.unobserve(q)}A.disconnect()})}for(var G=[t].concat($),D=function(){var Y=X.value;Y.addEventListener("scroll",m),h(function(){return Y.removeEventListener("scroll",m)})},Z=U(G),X;!(X=Z()).done;)D()},[f,h,m,t,s,l]),L=g.useCallback(function(b,w){n&&b&&b!==w&&(y(),T(),m())},[y,T,m,n]),k=Se(g.useCallback(function(b){var w=f(),E=w.layer;p(function(O){return H({},O,{layer:b})}),L(E,b)},[f,p,L])),S=g.useCallback(function(w){var E=je(w,t),O=E[0];if(O){var $=t.getComputedStyle(O).position,R=["relative","absolute","fixed"].includes($)||o;R||(O.style.position="relative")}return E},[t,o]),B=Se(g.useCallback(function(b){var w=S(b),E=f(),O=E.trigger;p(function($){return H({},$,{trigger:b,scrollContainers:w})}),L(O,b)},[f,p,L,S])),j=a==null||a.getParent==null?void 0:a.getParent();return ue(function(){j&&p(function(b){return H({},b,{scrollContainers:S(j)})})},[j,p,S]),ue(function(){return n&&(d()||T()),function(){d()&&y()}},[n,d,T,y]),ue(function(){n&&m()}),{triggerRef:B,layerRef:k,arrowRef:u,closestScrollContainer:f().scrollContainers[0]||null}}var $e=g.createContext({});function at(e){var n=e.children,r=e.registrations,t=g.useCallback(function(o){return r.current.add(o),function(){return r.current.delete(o)}},[r]);return g.createElement($e.Provider,{value:t},n)}function st(e,n){for(var r=U(e),t;!(t=r()).done;){var i=t.value.shouldCloseWhenClickedOutside;if(!i(n))return!1}return!0}function lt(e){var n=e.isOpen,r=e.onOutsideClick,t=e.onParentClose,i=g.useRef(null),o=g.useRef(null),a=g.useRef(new Set),s=g.useContext($e),u=g.useCallback(function(c){var f=c.target,p=i.current&&i.current.contains(f),v=o.current&&o.current.contains(f),d=st(a.current,c);return v&&d&&a.current.forEach(function(h){var y=h.closeChild;return y()}),!p&&!v&&d},[i,o,a]);return g.useEffect(function(){if(typeof s=="function")return s({shouldCloseWhenClickedOutside:u,closeChild:function(){t&&t()}})},[s,u,t,a]),g.useEffect(function(){var l=typeof s=="function",c=!n||!r||l;if(c)return;function f(p){u(p)&&r()}return document.addEventListener("click",f,!0),function(){return document.removeEventListener("click",f,!0)}},[n,r,u,s]),g.useEffect(function(){n||a.current.forEach(function(l){var c=l.closeChild;return c()})},[n]),{closeOnOutsideClickRefs:{trigger:i,layer:o},registrations:a}}var ut=["bottom-start","bottom-end","bottom-center","top-start","top-center","top-end","left-end","left-center","left-start","right-end","right-center","right-start","center"],ft={top:"bottom",left:"right",bottom:"top",right:"left",center:"center"},ct=function(){function e(r,t,i,o,a,s,u,l,c){this.prop=void 0,this.opposite=void 0,this.isHorizontal=void 0,this.sizeProp=void 0,this.oppositeSizeProp=void 0,this.cssProp=void 0,this.oppositeCssProp=void 0,this.isCenter=void 0,this.isPush=void 0,this.prop=r,this.opposite=t,this.isHorizontal=i,this.sizeProp=o,this.oppositeSizeProp=a,this.cssProp=s,this.oppositeCssProp=u,this.isCenter=l,this.isPush=c}var n=e.prototype;return n.factor=function(t){return t*(this.isPush?1:-1)},n.isOppositeDirection=function(t){return this.isHorizontal!==t.isHorizontal},e}();function V(e,n){n===void 0&&(n=!0);var r=["left","right"].includes(e);return new ct(e,n?V(ft[e],!1):null,r,r?"width":"height",r?"height":"width",r?"left":"top",r?"top":"left",e==="center",!["right","bottom"].includes(e))}var P={top:V("top"),bottom:V("bottom"),left:V("left"),right:V("right")},C=H({},P,{center:V("center")}),ee=["top","left","bottom","right"],de=function(){function e(n){return this.top=void 0,this.left=void 0,this.right=void 0,this.bottom=void 0,Object.assign(this,n)}return e.mergeSmallestSides=function(r){var t=r[0],i=r.slice(1);if(!t)throw new Error("Please provide at least 1 bounds objects in order to merge");for(var o=Object.fromEntries(ee.map(function(p){return[p,t[p]]})),a=U(i),s;!(s=a()).done;)for(var u=s.value,l=U(ee),c;!(c=l()).done;){var f=c.value;o[f]=Math.min(o[f],u[f])}return new e(o)},ae(e,[{key:"allSidesArePositive",get:function(){var r=this;return ee.every(function(t){return r[t]>=0})}},{key:"negativeSides",get:function(){var r=this;return Object.fromEntries(ee.filter(function(t){return r[t]<0}).map(function(t){return[t,r[t]]}))}}]),e}();function Ee(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return n.reduce(function(t,i){return t+(i?K(i):0)},0)}function pe(e){var n=e.top,r=e.left,t=e.right,i=e.bottom,o=e.width,a=e.height;return{top:n,left:r,right:t,bottom:i,width:o,height:a}}var pt={top:0,left:0,right:0,bottom:0,width:0,height:0},I=function(){e.create=function(t){return new e(t)},e.fromElement=function(t,i){i===void 0&&(i={});var o=i,a=o.withTransform,s=a===void 0?!0:a,u=o.environment,l=u===void 0?window:u,c=o.withScrollbars,f=c===void 0?!0:c,p=pe(t.getBoundingClientRect()),v=new e(p);if(!s){var d=l.getComputedStyle(t),h=d.width,y=d.height,m=d.boxSizing,T=d.borderLeft,L=d.borderRight,k=d.borderTop,S=d.borderBottom,B=d.paddingLeft,j=d.paddingRight,b=d.paddingTop,w=d.paddingBottom,E=m==="border-box"?K(h):Ee(h,T,L,B,j),O=m==="border-box"?K(y):Ee(y,k,S,b,w);v=new e(H({},v,{width:E,height:O}))}if(!f){var $=v.width-t.clientWidth,R=v.height-t.clientHeight;return v.substract({right:$,bottom:R})}return v},e.empty=function(){return new e},e.fromWindow=function(t){var i,o=(i=t==null?void 0:t.document.scrollingElement)!=null?i:t==null?void 0:t.document.documentElement,a=o??{},s=a.clientWidth,u=s===void 0?0:s,l=a.clientHeight,c=l===void 0?0:l;return new e({width:u,height:c,right:u,bottom:c})};function e(r){return r===void 0&&(r={}),this.top=void 0,this.left=void 0,this.right=void 0,this.bottom=void 0,this.width=void 0,this.height=void 0,Object.assign(this,pt,r)}var n=e.prototype;return n.toObject=function(){return pe(this)},n.merge=function(t){var i=this.toObject();return new e(H({},i,typeof t=="function"?t(i):t))},n.substract=function(t){for(var i=this.toObject(),o=Object.entries(t),a=0,s=o;a<s.length;a++){var u=s[a],l=u[0],c=u[1];if(l in P){var f=P[l];i[l]+=f.factor(c),i[f.isHorizontal?"width":"height"]-=c}else i[l]-=c||0}return new e(i)},n.offsetsTo=function(t){return new de({top:t.top-this.top,bottom:this.bottom-t.bottom,left:t.left-this.left,right:this.right-t.right})},n.mapSides=function(t){for(var i=this.toObject(),o=Object.values(P),a=0,s=o;a<s.length;a++){var u=s[a];i[u.prop]=t(u,i[u.prop])}return new e(i)},ae(e,[{key:"surface",get:function(){return this.width*this.height}}]),e}(),xe=function(){function e(r,t,i,o,a){this.primary=void 0,this.secondary=void 0,this.offsets=void 0,this.subjectsBounds=void 0,this._cachedLayerBounds=null,this._cachedContainerOffsets=null,this.primary=r,this.secondary=t,this.offsets=a,this.setSubjectsBounds(i,o)}var n=e.prototype;return n.setSubjectsBounds=function(t,i){if(!i){this.subjectsBounds=t;return}var o=typeof i=="function"?i(this.primary.prop):i;this.subjectsBounds=t.merge({layer:H({},t.layer,o)})},n.getLayerBounds=function(t){if(t===void 0&&(t=0),this._cachedLayerBounds&&t===0)return this._cachedLayerBounds;var i=this.primary,o=this.secondary,a=this.subjectsBounds,s=a.trigger,u=a.layer,l=a.arrow,c=i.isHorizontal,f=i.oppositeCssProp,p=i.oppositeSizeProp,v=i.prop,d=i.opposite,h=I.empty();h[d.prop]=s[v]-i.factor(this.offsets.trigger),h[v]=h[d.prop]-i.factor(u[i.sizeProp]);var y=this.offsets.arrow*2,m=s[f]-(u[p]-l[p])+y,T=s[f]+(s[p]-l[p])-y;if(o.isPush||(m+=u[p],T+=u[p]),o.isCenter){var L=(c?P.top:P.left).prop,k=(c?P.bottom:P.right).prop;h[L]=ce(s[L]+s[p]/2-u[p]/2+t,m,T),h[k]=h[L]+u[p]}else{var S=o,B=s[S.prop],j=B<m?m-B:B>T?T-B:0;h[S.prop]=ce(B+t+j,m,T),h[S.opposite.prop]=h[S.prop]+o.factor(u[p])}h.width=h.right-h.left,h.height=h.bottom-h.top;var b=I.create(h);return t===0&&(this._cachedLayerBounds=b),b},n.getLayerCollisionBounds=function(){var t=this.offsets.container;return this.getLayerBounds().mapSides(function(i,o){return o-=i.factor(t)}).merge(function(i){var o=i.width,a=i.height;return{width:o+t*2,height:a+t*2}})},n.getContainerOffsets=function(t){if(this._cachedContainerOffsets&&!t)return this._cachedContainerOffsets;var i=this.subjectsBounds.merge({layer:t||this.getLayerCollisionBounds()}),o=de.mergeSmallestSides(i.layerOffsetsToScrollContainers);return t||(this._cachedContainerOffsets=o),o},ae(e,[{key:"type",get:function(){return this.primary.prop+"-"+(this.secondary.prop==="center"?"center":["bottom","right"].includes(this.secondary.prop)?"end":"start")}},{key:"triggerIsBigger",get:function(){var t=this.secondary.isHorizontal,i=this.subjectsBounds,o=i.triggerHasBiggerWidth,a=i.triggerHasBiggerHeight;return t&&o||!t&&a}},{key:"fitsContainer",get:function(){return this.getContainerOffsets().allSidesArePositive}},{key:"visibleSurface",get:function(){var t=this.getLayerBounds(),i=this.getContainerOffsets(t),o=i.negativeSides;for(var a in o)o[a]=-o[a];return t.substract(o).surface}},{key:"secondaryOffsetSide",get:function(){var t,i,o=this,a=this.getContainerOffsets(),s=(t=(i=Object.entries(a.negativeSides).map(function(l){var c=l[0],f=l[1];return[P[c],f]}).filter(function(l){var c=l[0];return o.primary.isOppositeDirection(c)}).sort(function(l,c){var f=l[1],p=c[1];return p-f}))==null?void 0:i[0])!=null?t:[],u=s[0];return u||null}}]),e}(),Te=function(e){Je(n,e);function n(){return e.apply(this,arguments)||this}var r=n.prototype;return r.getLayerBounds=function(){var i=this.subjectsBounds,o=i.trigger,a=i.layer,s=I.empty();return s.top=o.top+o.height/2-a.height/2,s.bottom=s.top+a.height,s.left=o.left+o.width/2-a.width/2,s.right=s.left+a.width,s.width=s.right-s.left,s.height=s.bottom-s.top,s},n}(xe);function dt(e,n,r){var t=e.layer,i=e.trigger,o=e.arrow,a=n.primary.oppositeSizeProp,s=n.primary.isHorizontal?["top","bottom"]:["left","right"],u=s[0],l=s[1],c=t[u]+t[a]/2-i[u]-o[a]/2-r,f=t[l]-t[a]/2-i[l]+o[a]/2+r;return(c<0?-c:0)+(f>0?-f:0)}var Be={position:"absolute",willChange:"top, left",left:null,right:null,top:null,bottom:null};function vt(e,n,r){var t;if(n.primary.isCenter)return Be;var i=e.layer,o=e.trigger,a=e.arrow,s=n.primary.oppositeSizeProp,u=o[s]>i[s],l=r+a[s]/2,c=i[s]-a[s]/2-r,f=dt(e,n,r),p=n.primary.prop,v=n.primary.oppositeCssProp,d=u?i[s]/2+f:o[v]+o[s]/2-i[v];return H({},Be,(t={},t[p]="100%",t[v]=ce(d,l,c),t))}var Le=function(){function e(r,t,i){this.placements=void 0,this.config=void 0,this.subjectsBounds=void 0,this.placements=r,this.config=t,this.subjectsBounds=i}e.getSidesFromPlacementType=function(t){var i=t.split("-"),o=i[0],a=i[1],s=P[o],u;return a==="center"?u=C.center:s.isHorizontal?u=a==="start"?C.top:C.bottom:u=a==="start"?C.left:C.right,[s,u]},e.create=function(t,i){var o={arrow:i.arrowOffset,container:i.containerOffset,trigger:i.triggerOffset};function a(s){s===void 0&&(s=i.placement);var u=e.getSidesFromPlacementType(s),l=u[0],c=u[1],f=P[l.isHorizontal?i.preferY:i.preferX],p=!l.isHorizontal&&t.triggerHasBiggerWidth||l.isHorizontal&&t.triggerHasBiggerHeight;function v(h,y){return new xe(h,y,t,i.layerDimensions,o)}var d=[];return d[0]=v(l,c),d[1]=v(l,c.isCenter?f:C.center),d[2]=v(l,C[(c.opposite.isCenter?f.opposite:c.opposite).prop]),d[3]=v(f,p?l:C[l.opposite.prop]),d[4]=v(f,C.center),d[5]=v(f,p?C[l.opposite.prop]:l),d[6]=v(P[f.opposite.prop],p?l:C[l.opposite.prop]),d[7]=v(P[f.opposite.prop],C.center),d[8]=v(P[f.opposite.prop],p?C[l.opposite.prop]:l),d[9]=v(P[l.opposite.prop],c),d[10]=v(P[l.opposite.prop],c.isCenter?f:C.center),d[11]=v(P[l.opposite.prop],C[(c.opposite.isCenter?f.opposite:c.opposite).prop]),d=d.filter(function(h){return h.type===i.placement||i.possiblePlacements.includes(h.type)}),d}return i.placement==="center"?new e([new Te(C.center,C.center,t,i.layerDimensions,o)].concat(a(i.preferY+"-"+i.preferX)),i,t):new e(a(),i,t)};var n=e.prototype;return n.filterPlacementsBySide=function(t){return this.placements.filter(function(i){return i.primary===t})},n.findFirstPlacementThatFits=function(){return this.placements.find(function(t){return t.fitsContainer})},n.placementWithBiggestVisibleSurface=function(){var t=this.placements.map(function(o){return{placement:o,surface:o.visibleSurface}}).sort(function(o,a){return a.surface-o.surface}),i=t[0].placement;return i},n.findSuitablePlacement=function(){return this.config.auto?this.findFirstPlacementThatFits()||this.placementWithBiggestVisibleSurface():this.placements[0]},n.getSecondaryOffset=function(t){var i=this.config,o=i.auto,a=i.snap;if(!o||a||t instanceof Te)return 0;var s=this.filterPlacementsBySide(t.primary),u=s.indexOf(t)===0;if(u&&t.fitsContainer)return 0;var l=s.find(function(h){return!h.fitsContainer});if(!l)return 0;var c=l.secondaryOffsetSide;if(!c)return 0;var f=t.getContainerOffsets(),p=t.secondary,v;t.triggerIsBigger||l===t?v=c.isPush?-1:1:v=p===C.left||[C.top,C.center].includes(p)&&c.isPush?-1:1;var d=f[c.prop];return d*v},n.getStyles=function(t,i,o,a){var s={willChange:"top, left, width, height"},u=vt(this.subjectsBounds.merge({layer:t}),i,this.config.arrowOffset),l=this.config.overflowContainer?H({},s,{position:"fixed",top:t.top,left:t.left}):H({},s,{position:"absolute",top:t.top-this.subjectsBounds.parent.top+o.top-a.top,left:t.left-this.subjectsBounds.parent.left+o.left-a.left});return{arrow:u,layer:l}},n.getHasDisappeared=function(t){var i=this.config.overflowContainer?this.subjectsBounds.trigger:t,o=de.mergeSmallestSides(this.subjectsBounds.offsetsToScrollContainers(i,!0)),a=Object.entries(o.negativeSides),s=a.some(function(u){var l=u[0],c=u[1],f=P[l];return c<=-i[f.sizeProp]});return s?"full":o.allSidesArePositive?null:"partial"},n.result=function(t,i){var o=this.findSuitablePlacement(),a=this.getSecondaryOffset(o),s=o.getLayerBounds(a),u=this.getStyles(s,o,t,i),l=o.primary.prop;return{styles:u,layerSide:l,placement:o,layerBounds:s,hasDisappeared:this.getHasDisappeared(s)}},e}(),ht=function(){function e(r,t){this.overflowContainer=void 0,this.trigger=void 0,this.layer=void 0,this.arrow=void 0,this.parent=void 0,this.window=void 0,this.scrollContainers=void 0,this.overflowContainer=t,Object.assign(this,r)}e.create=function(t,i,o,a,s,u,l,c){var f=I.fromWindow(t);return new e({layer:I.fromElement(i,{environment:t,withTransform:!1}),trigger:c?I.create(pe(c())):I.fromElement(o),arrow:s?I.fromElement(s):I.empty(),parent:a?I.fromElement(a):f,window:f,scrollContainers:[f].concat(u.map(function(p){return I.fromElement(p,{withScrollbars:!1})}))},l)};var n=e.prototype;return n.merge=function(t){return new e(H({},this,t),this.overflowContainer)},n.offsetsToScrollContainers=function(t,i){i===void 0&&(i=!1);var o=this.overflowContainer&&!i?[this.window]:this.scrollContainers;return o.map(function(a){return a.offsetsTo(t)})},ae(e,[{key:"layerOffsetsToScrollContainers",get:function(){return this.offsetsToScrollContainers(this.layer)}},{key:"triggerHasBiggerWidth",get:function(){return this.trigger.width>this.layer.width}},{key:"triggerHasBiggerHeight",get:function(){return this.trigger.height>this.layer.height}}]),e}(),Re=null,M={auto:!1,arrowOffset:0,containerOffset:10,triggerOffset:0,overflowContainer:!0,placement:"top-center",possiblePlacements:ut,preferX:"right",preferY:"bottom",snap:!1,container:void 0,trigger:void 0};function Pt(e){var n,r=e.isOpen,t=r===void 0?!1:r,i=e.overflowContainer,o=i===void 0?M.overflowContainer:i,a=e.environment,s=a===void 0?typeof window<"u"?window:void 0:a,u=e.ResizeObserver,l=e.placement,c=l===void 0?M.placement:l,f=e.possiblePlacements,p=f===void 0?M.possiblePlacements:f,v=e.preferX,d=v===void 0?M.preferX:v,h=e.preferY,y=h===void 0?M.preferY:h,m=e.auto,T=m===void 0?M.auto:m,L=e.snap,k=L===void 0?M.snap:L,S=e.triggerOffset,B=S===void 0?M.triggerOffset:S,j=e.containerOffset,b=j===void 0?M.containerOffset:j,w=e.arrowOffset,E=w===void 0?M.arrowOffset:w,O=e.container,$=O===void 0?M.container:O,R=e.layerDimensions,N=R===void 0?null:R,A=e.onDisappear,W=e.onOutsideClick,z=e.onParentClose,x=e.trigger,G=g.useState(function(){return{layerSide:c==="center"?"center":Le.getSidesFromPlacementType(c)[0].prop,styles:{layer:{position:o?"fixed":"absolute",top:0,left:0},arrow:{position:"absolute",top:0,left:0}}}}),D=G[0],Z=G[1],X=g.useRef(null),F=nt(D,t),Y=g.useRef({cancelled:!1});g.useEffect(function(){return function(){Y.current.cancelled=!0}},[]);var q=g.useCallback(function(_,Ne,We){var Ge=_.arrow,Xe=_.layer,ye=_.scrollContainers,ze=_.trigger,_e=ye[0],Ve=ht.create(s,Xe,ze,_e,Ge,ye,o,x==null?void 0:x.getBounds),Ue={placement:c,possiblePlacements:p,auto:T,layerDimensions:N,arrowOffset:E,containerOffset:b,triggerOffset:B,preferX:d,preferY:y,snap:k,overflowContainer:o},se=Le.create(Ve,Ue).result(Ne,We),me=se.hasDisappeared,Ze=se.layerSide,Ke=se.styles,le={layerSide:Ze,styles:Ke};if(!F.current||gt(F.current,le)){F.current=le,Y.current.cancelled=!0;var be={cancelled:!1};Y.current=be,Promise.resolve().then(function(){be.cancelled||Z(le)})}Oe(me)&&Oe(A)&&A(me)},[E,T,b,s,N,A,o,c,p,d,y,k,B,F,x]),J=ot({ResizeObserverPolyfill:u,environment:s,enabled:t,overflowContainer:o,onChange:q,triggerOption:x}),Me=J.triggerRef,Ie=J.layerRef,De=J.arrowRef,ve=J.closestScrollContainer,he=lt({isOpen:t,onOutsideClick:W,onParentClose:z}),ge=he.closeOnOutsideClickRefs,Fe=he.registrations,Ae={triggerProps:x?{}:{ref:Pe(Me,ge.trigger,X)},layerProps:{ref:Pe(Ie,ge.layer),style:D.styles.layer},arrowProps:{ref:De,style:D.styles.arrow,layerSide:D.layerSide},layerSide:D.layerSide,triggerBounds:t?x?x.getBounds():(n=X.current)==null?void 0:n.getBoundingClientRect():null,renderLayer:function(_){return typeof document<"u"?qe.createPortal(g.createElement(at,{registrations:Fe,children:_}),o||!ve?yt($):ve):null}};return Ae}function gt(e,n){if(e.layerSide!==n.layerSide)return!0;for(var r=["position","top","left","right","bottom"],t=0,i=r;t<i.length;t++){var o=i[t];if(e.styles.layer[o]!==n.styles.layer[o]||e.styles.arrow[o]!==n.styles.arrow[o])return!0}return!1}var He="layers";function yt(e){var n;if(typeof e=="function"){if(n=e(),!n||!(n instanceof HTMLElement))throw new Error("react-laag: You've passed a function to the 'container' prop, but it returned no valid HTMLElement")}else if(e instanceof HTMLElement)n=e;else if(typeof e=="string"){if(n=document.getElementById(e),!n)throw new Error("react-laag: You've passed element with id '"+e+"' to the 'container' prop, but it returned no valid HTMLElement")}else{if(Re instanceof HTMLElement)return Re;n=document.getElementById(He),n||(n=document.createElement("div"),n.id=He,n.style.cssText=`
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
      `,document.body.appendChild(n))}return n}var mt=["size","angle","borderWidth","borderColor","roundness","backgroundColor","layerSide","style"],te="left",re="top",ne="bottom",ie="right";function oe(e,n){return Math.tan(e*(Math.PI/180))*n}function bt(e,n,r,t){var i,o=(i={},i[ne]="0 "+-t+" "+n+" "+e,i[re]="0 0 "+n+" "+(e+t),i[ie]=-t+" 0 "+e+" "+n,i[te]="0 0 "+(e+t)+" "+n,i);return o[r.prop]}function wt(e,n,r,t,i){var o,a,s,u=t/10*e*2,l=(o={},o[ne]=[0,e],o[re]=[0,0],o[ie]=[e,n],o[te]=[0,n],o)[r.prop].join(" "),c=r.isHorizontal?"V 0":"H "+n,f=n/2,p=n/2+oe(i,e/8),v=e/8,d=(a={},a[ne]=["C",p,v,f+u,0,f,0],a[re]=["C",p,e-v,f+u,e,f,e],a[ie]=["C",v,n-p,0,f-u,0,f],a[te]=["C",e-v,n-p,e,f-u,e,f],a)[r.prop].join(" "),h=n/2-oe(i,e/8),y=e/8,m=(s={},s[ne]=["C",f-u,0,h,y,l],s[re]=["C",f-u,e,h,e-y,l],s[ie]=["C",0,f+u,y,n-h,l],s[te]=["C",e,f+u,e-y,n-h,l],s)[r.prop].join(" ");return["M",l,c,d,m].join(" ")}function Ct(e,n,r,t,i){var o=oe(i,r),a=t.isPush?[0,r]:[e,e-r],s=a[0],u=a[1];return t.isHorizontal?["M",s,r,"V",n-r,"L",u,n-r-o,"V",o+r,"Z"].join(" "):["M",r,s,"H",n-r,"L",n-r-o,u,"H",o+r,"Z"].join(" ")}var Et=g.forwardRef(function(n,r){var t=n.size,i=t===void 0?8:t,o=n.angle,a=o===void 0?45:o,s=n.borderWidth,u=s===void 0?0:s,l=n.borderColor,c=l===void 0?"black":l,f=n.roundness,p=f===void 0?0:f,v=n.backgroundColor,d=v===void 0?"white":v,h=n.layerSide,y=h===void 0?"top":h,m=n.style,T=m===void 0?{}:m,L=Qe(n,mt);if(y==="center")return null;var k=P[y],S=i,B=oe(a,i)*2,j=Math.max(S,B);return g.createElement("svg",H({ref:r},L,{style:H({},T,{transform:"translate"+(k.isHorizontal?"Y":"X")+"(-50%)"}),width:j,height:j,preserveAspectRatio:k.isPush?"xMinYMin":"xMaxYMax",viewBox:bt(S,B,k,u)}),g.createElement("path",{fill:d,strokeWidth:u,stroke:c,d:wt(S,B,k,p,a)}),g.createElement("path",{fill:d,d:Ct(S,B,u,k,a)}))}),ke;(function(e){e[e.ENTERING=0]="ENTERING",e[e.LEAVING=1]="LEAVING",e[e.IDLE=2]="IDLE"})(ke||(ke={}));export{Et as A,Pt as u};