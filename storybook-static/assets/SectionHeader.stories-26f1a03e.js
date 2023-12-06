import{j as a}from"./jsx-runtime-ffb262ed.js";import{R as U,r as f}from"./index-76fb7be0.js";import{r as ee,s as te}from"./index.esm-2d6aa1b6.js";import{S as re}from"./Select-01d1fa18.js";import{u as oe}from"./useTranslation-00555890.js";import"./_commonjsHelpers-de833af9.js";import"./iconBase-1d38e9b4.js";const S=({onClick:s,bgColor:o="transparence-blue",width:r="9",height:e="9",shadow:t,shadowHover:n,icon:i,iconWidth:l="5",alt:c,marginY:h})=>a.jsx("button",{onClick:s,className:`w-${r} h-${e} mx-1 my-${h} | 
        bg-${o} rounded-2xl | 
        flex justify-center items-center | 
        cursor-pointer outline-none transition-all duration-500 ease-in-out shadow-${t} | 
        hover:shadow-${n} hover:outline-none`,children:a.jsx("img",{src:i,alt:c,className:`h-${l} w-auto`})});try{S.displayName="IconContainer",S.__docgenInfo={description:"",displayName:"IconContainer",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}},bgColor:{defaultValue:{value:"transparence-blue"},description:"",name:"bgColor",required:!1,type:{name:"string"}},width:{defaultValue:{value:"9"},description:"",name:"width",required:!1,type:{name:"string"}},height:{defaultValue:{value:"9"},description:"",name:"height",required:!1,type:{name:"string"}},shadow:{defaultValue:null,description:"",name:"shadow",required:!1,type:{name:"string"}},shadowHover:{defaultValue:null,description:"",name:"shadowHover",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"string"}},iconWidth:{defaultValue:{value:"5"},description:"",name:"iconWidth",required:!1,type:{name:"string"}},alt:{defaultValue:null,description:"",name:"alt",required:!1,type:{name:"string"}},marginY:{defaultValue:null,description:"",name:"marginY",required:!1,type:{name:"string"}}}}}catch{}const ne=""+new URL("filter-8556920e.svg",import.meta.url).href,se=""+new URL("plus-f48bfc45.svg",import.meta.url).href,ie=""+new URL("Upload-e2d33808.svg",import.meta.url).href;/*! *****************************************************************************
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
***************************************************************************** */var I=function(s,o){return(I=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var t in e)e.hasOwnProperty(t)&&(r[t]=e[t])})(s,o)},ae,x,le=(function(s){/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/(function(){var o={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var i=typeof n;if(i==="string"||i==="number")e.push(n);else if(Array.isArray(n)&&n.length){var l=r.apply(null,n);l&&e.push(l)}else if(i==="object")for(var c in n)o.call(n,c)&&n[c]&&e.push(c)}}return e.join(" ")}s.exports?(r.default=r,s.exports=r):window.classNames=r})()}(x={path:ae,exports:{},require:function(s,o){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(o==null&&x.path)}},x.exports),x.exports);function _(s,o,r){var e,t,n,i,l;function c(){var d=Date.now()-i;d<o&&d>=0?e=setTimeout(c,o-d):(e=null,r||(l=s.apply(n,t),n=t=null))}o==null&&(o=100);var h=function(){n=this,t=arguments,i=Date.now();var d=r&&!e;return e||(e=setTimeout(c,o)),d&&(l=s.apply(n,t),n=t=null),l};return h.clear=function(){e&&(clearTimeout(e),e=null)},h.flush=function(){e&&(l=s.apply(n,t),n=t=null,clearTimeout(e),e=null)},h}_.debounce=_;var ce=_;(function(s,o){o===void 0&&(o={});var r=o.insertAt;if(s&&typeof document<"u"){var e=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",r==="top"&&e.firstChild?e.insertBefore(t,e.firstChild):e.appendChild(t),t.styleSheet?t.styleSheet.cssText=s:t.appendChild(document.createTextNode(s))}})(`.indiana-scroll-container {
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
`);var M,ue=(M="indiana-scroll-container",function(s,o){if(!s)return M;var r;typeof s=="string"?r=s:o=s;var e=M;return r&&(e+="__"+r),e+(o?Object.keys(o).reduce(function(t,n){var i=o[n];return i&&(t+=" "+(typeof i=="boolean"?e+"--"+n:e+"--"+n+"_"+i)),t},""):"")}),de=function(s){function o(r){var e=s.call(this,r)||this;return e.onEndScroll=function(){e.scrolling=!1,!e.pressed&&e.started&&e.processEnd()},e.onScroll=function(t){var n=e.container.current;n.scrollLeft===e.scrollLeft&&n.scrollTop===e.scrollTop||(e.scrolling=!0,e.processScroll(t),e.onEndScroll())},e.onTouchStart=function(t){var n=e.props.nativeMobileScroll;if(e.isDraggable(t.target))if(e.internal=!0,n&&e.scrolling)e.pressed=!0;else{var i=t.touches[0];e.processClick(t,i.clientX,i.clientY),!n&&e.props.stopPropagation&&t.stopPropagation()}},e.onTouchEnd=function(t){var n=e.props.nativeMobileScroll;e.pressed&&(!e.started||e.scrolling&&n?e.pressed=!1:e.processEnd(),e.forceUpdate())},e.onTouchMove=function(t){var n=e.props.nativeMobileScroll;if(e.pressed&&(!n||!e.isMobile)){var i=t.touches[0];i&&e.processMove(t,i.clientX,i.clientY),t.preventDefault(),e.props.stopPropagation&&t.stopPropagation()}},e.onMouseDown=function(t){e.isDraggable(t.target)&&e.isScrollable()&&(e.internal=!0,e.props.buttons.indexOf(t.button)!==-1&&(e.processClick(t,t.clientX,t.clientY),t.preventDefault(),e.props.stopPropagation&&t.stopPropagation()))},e.onMouseMove=function(t){e.pressed&&(e.processMove(t,t.clientX,t.clientY),t.preventDefault(),e.props.stopPropagation&&t.stopPropagation())},e.onMouseUp=function(t){e.pressed&&(e.started?e.processEnd():(e.internal=!1,e.pressed=!1,e.forceUpdate(),e.props.onClick&&e.props.onClick(t)),t.preventDefault(),e.props.stopPropagation&&t.stopPropagation())},e.container=U.createRef(),e.onEndScroll=ce(e.onEndScroll,300),e.scrolling=!1,e.started=!1,e.pressed=!1,e.internal=!1,e.getRef=e.getRef.bind(e),e}return function(r,e){function t(){this.constructor=r}I(r,e),r.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}(o,s),o.prototype.componentDidMount=function(){var r=this.props.nativeMobileScroll,e=this.container.current;window.addEventListener("mouseup",this.onMouseUp),window.addEventListener("mousemove",this.onMouseMove),window.addEventListener("touchmove",this.onTouchMove,{passive:!1}),window.addEventListener("touchend",this.onTouchEnd),e.addEventListener("touchstart",this.onTouchStart,{passive:!1}),e.addEventListener("mousedown",this.onMouseDown,{passive:!1}),r&&(this.isMobile=this.isMobileDevice(),this.isMobile&&this.forceUpdate())},o.prototype.componentWillUnmount=function(){window.removeEventListener("mouseup",this.onMouseUp),window.removeEventListener("mousemove",this.onMouseMove),window.removeEventListener("touchmove",this.onTouchMove),window.removeEventListener("touchend",this.onTouchEnd)},o.prototype.getElement=function(){return this.container.current},o.prototype.isMobileDevice=function(){return window.orientation!==void 0||navigator.userAgent.indexOf("IEMobile")!==-1},o.prototype.isDraggable=function(r){var e=this.props.ignoreElements;if(e){var t=r.closest(e);return t===null||t.contains(this.getElement())}return!0},o.prototype.isScrollable=function(){var r=this.container.current;return r&&(r.scrollWidth>r.clientWidth||r.scrollHeight>r.clientHeight)},o.prototype.processClick=function(r,e,t){var n=this.container.current;this.scrollLeft=n.scrollLeft,this.scrollTop=n.scrollTop,this.clientX=e,this.clientY=t,this.pressed=!0},o.prototype.processStart=function(r){r===void 0&&(r=!0);var e=this.props.onStartScroll;this.started=!0,r&&document.body.classList.add("indiana-dragging"),e&&e({external:!this.internal}),this.forceUpdate()},o.prototype.processScroll=function(r){if(this.started){var e=this.props.onScroll;e&&e({external:!this.internal})}else this.processStart(!1)},o.prototype.processMove=function(r,e,t){var n=this.props,i=n.horizontal,l=n.vertical,c=n.activationDistance,h=n.onScroll,d=this.container.current;this.started?(i&&(d.scrollLeft-=e-this.clientX),l&&(d.scrollTop-=t-this.clientY),h&&h({external:!this.internal}),this.clientX=e,this.clientY=t,this.scrollLeft=d.scrollLeft,this.scrollTop=d.scrollTop):(i&&Math.abs(e-this.clientX)>c||l&&Math.abs(t-this.clientY)>c)&&(this.clientX=e,this.clientY=t,this.processStart())},o.prototype.processEnd=function(){var r=this.props.onEndScroll;this.container.current&&r&&r({external:!this.internal}),this.pressed=!1,this.started=!1,this.scrolling=!1,this.internal=!1,document.body.classList.remove("indiana-dragging"),this.forceUpdate()},o.prototype.getRef=function(r){[this.container,this.props.innerRef].forEach(function(e){e&&(typeof e=="function"?e(r):e.current=r)})},o.prototype.render=function(){var r=this.props,e=r.children,t=r.draggingClassName,n=r.className,i=r.style,l=r.hideScrollbars,c=r.component;return U.createElement(c,{className:le(n,this.pressed&&t,ue({dragging:this.pressed,"hide-scrollbars":l,"native-scroll":this.isMobile})),style:i,ref:this.getRef,onScroll:this.onScroll},e)},o.defaultProps={nativeMobileScroll:!0,hideScrollbars:!0,activationDistance:10,vertical:!0,horizontal:!0,stopPropagation:!1,style:{},component:"div",buttons:[0]},o}(f.PureComponent);const E=({sectionTitles:s=[],sectionKeys:o=[],sortItems:r=[],setShowFilters:e,setShowAdd:t,setShowUpload:n,section:i,sort:l,setSection:c=null,setSort:h,showFilters:d=!1,showAdd:q=!1,showSort:C=!1,showUpload:N=!1,className:z=""})=>{const{t:V}=oe(),g=f.useRef(),u=f.useRef(),w=f.useRef(),[G,L]=f.useState(!1),[J,W]=f.useState(!1),[H,Q]=f.useState(0),Z=()=>{if(!w||!w.current||!o||!o.length)return 0;let p=0;const m=w.current.querySelectorAll("button");for(let T=0;T<m.length;T++)p+=m[T].offsetWidth+18;return p},K=p=>{c&&c(o[p])},k=()=>{u.current.scrollLeft>30?W(!0):W(!1),u.current.offsetWidth-u.current.scrollLeft>30?L(!0):L(!1)},R=(p,m)=>{p==="left"?u.current.scrollLeft-=m:u.current.scrollLeft+=m};return f.useEffect(()=>{Q(Z())},[o,s,w]),f.useEffect(()=>(u!=null&&u.current&&u.current.addEventListener("scroll",k),()=>{u!=null&&u.current&&u.current.removeEventListener("scroll",k)}),[u]),f.useEffect(()=>{g!=null&&g.current&&H>g.current.offsetWidth&&L(!0)},[g,w,u]),a.jsxs("div",{className:`flex relative w-full px-4 mt-2 border-b border-border-section-header ${z}`,children:[a.jsxs("div",{className:"flex-1 max-w-full",children:[G&&a.jsx("div",{className:"flex justify-end items-center h-full top-0 right-0 w-24 absolute bg-gradient-to-l from-white to-transparent z-10",children:a.jsx(ee,{className:"text-main cursor-pointer",onClick:()=>R("right",50)})}),J&&a.jsx("div",{className:"flex justify-start items-center h-full top-0 left-0 w-24 absolute bg-gradient-to-r from-white to-transparent z-10",children:a.jsx(te,{className:"text-main cursor-pointer",onClick:()=>R("left",50)})}),a.jsx("div",{className:"flex max-w-full",ref:g,children:a.jsx(de,{className:"cursor-grab active:cursor-grabbing w-full",horizontal:!0,hideScrollbars:!0,innerRef:u,children:a.jsx("div",{ref:w,className:"min-w-full",style:{width:H},children:s.map((p,m)=>a.jsx("button",{onClick:()=>K(m),className:`select-none text-sm mr-4 outline-none focus:outline-none ${i===o[m]?"text-text-section-header-active-item font-semibold":"text-gray font-medium"}`,children:p},p))})})})]}),(d||q||C||N)&&a.jsxs("div",{className:"flex",children:[C&&a.jsx(re,{isClearable:!1,placeholder:V("sort_by"),sort:"true",initialValues:[{id:l,value:V(`sort_${l}`)}],items:r,onSelect:p=>{h(String(p[0].id))}}),d&&a.jsx("span",{className:"inline-block relative -top-1",children:a.jsx(S,{width:"8",height:"8",shadow:"hover",shadowHover:"inner",iconWidth:"4",icon:ne,onClick:()=>e(!0)})}),q&&a.jsx(S,{width:"8",height:"8",shadow:"hover",shadowHover:"inner",iconWidth:"4",icon:se,onClick:()=>t(!0)}),N&&a.jsx(S,{width:"8",height:"8",shadow:"hover",shadowHover:"inner",iconWidth:"5",icon:ie,onClick:()=>n(!0)})]})]})};try{E.displayName="SectionHeader",E.__docgenInfo={description:"",displayName:"SectionHeader",props:{sectionTitles:{defaultValue:{value:"[]"},description:"",name:"sectionTitles",required:!1,type:{name:"string[]"}},sectionKeys:{defaultValue:{value:"[]"},description:"",name:"sectionKeys",required:!1,type:{name:"string[]"}},sortItems:{defaultValue:{value:"[]"},description:"",name:"sortItems",required:!1,type:{name:"any[]"}},setShowFilters:{defaultValue:null,description:"",name:"setShowFilters",required:!0,type:{name:"(show: boolean) => void"}},setShowAdd:{defaultValue:null,description:"",name:"setShowAdd",required:!0,type:{name:"(show: boolean) => void"}},setShowUpload:{defaultValue:null,description:"",name:"setShowUpload",required:!0,type:{name:"(show: boolean) => void"}},section:{defaultValue:null,description:"",name:"section",required:!0,type:{name:"string"}},sort:{defaultValue:null,description:"",name:"sort",required:!0,type:{name:"string"}},setSection:{defaultValue:{value:"null"},description:"",name:"setSection",required:!1,type:{name:"((section: string) => void | null)"}},setSort:{defaultValue:null,description:"",name:"setSort",required:!0,type:{name:"(sort: string) => void"}},showFilters:{defaultValue:{value:"false"},description:"",name:"showFilters",required:!1,type:{name:"boolean"}},showAdd:{defaultValue:{value:"false"},description:"",name:"showAdd",required:!1,type:{name:"boolean"}},showSort:{defaultValue:{value:"false"},description:"",name:"showSort",required:!1,type:{name:"boolean"}},showUpload:{defaultValue:{value:"false"},description:"",name:"showUpload",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const ye={title:"SectionHeader",component:E},j=s=>a.jsx(E,{...s}),v=j.bind({});v.args={sectionTitles:["Section 1","Section 2","Section 3"],sectionKeys:["section1","section2","section3"],setShowFilters:()=>{},setShowAdd:()=>{},setShowUpload:()=>{},section:"section1",sort:"date",setSort:()=>{}};const y=j.bind({});y.args={...v.args,showFilters:!0,showAdd:!0,showSort:!0,showUpload:!0};const b=j.bind({});b.args={...v.args,sectionTitles:["Long Section Title 1","Long Section Title 2","Long Section Title 3"]};var A,D,P;v.parameters={...v.parameters,docs:{...(A=v.parameters)==null?void 0:A.docs,source:{originalSource:"args => <SectionHeader {...args} />",...(P=(D=v.parameters)==null?void 0:D.docs)==null?void 0:P.source}}};var Y,$,O;y.parameters={...y.parameters,docs:{...(Y=y.parameters)==null?void 0:Y.docs,source:{originalSource:"args => <SectionHeader {...args} />",...(O=($=y.parameters)==null?void 0:$.docs)==null?void 0:O.source}}};var X,B,F;b.parameters={...b.parameters,docs:{...(X=b.parameters)==null?void 0:X.docs,source:{originalSource:"args => <SectionHeader {...args} />",...(F=(B=b.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};const be=["BasicSectionHeader","SectionHeaderWithActions","SectionHeaderWithLongTitles"];export{v as BasicSectionHeader,y as SectionHeaderWithActions,b as SectionHeaderWithLongTitles,be as __namedExportsOrder,ye as default};
