import{j as n}from"./jsx-runtime-ffb262ed.js";import{g as _}from"./_commonjsHelpers-de833af9.js";import{T as R}from"./Tooltip-d88ee0bf.js";import{r as c}from"./index-76fb7be0.js";import"./index.es-d2f9e92b.js";import"./index-8d47fad6.js";var P={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(t){(function(){var a={}.hasOwnProperty;function r(){for(var e=[],s=0;s<arguments.length;s++){var i=arguments[s];if(i){var o=typeof i;if(o==="string"||o==="number")e.push(i);else if(Array.isArray(i)){if(i.length){var l=r.apply(null,i);l&&e.push(l)}}else if(o==="object"){if(i.toString!==Object.prototype.toString&&!i.toString.toString().includes("[native code]")){e.push(i.toString());continue}for(var u in i)a.call(i,u)&&i[u]&&e.push(u)}}}return e.join(" ")}t.exports?(r.default=r,t.exports=r):window.classNames=r})()})(P);var O=P.exports;const E=_(O);/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */var p=function(t,a){return p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var s in e)e.hasOwnProperty(s)&&(r[s]=e[s])},p(t,a)};function N(t,a){p(t,a);function r(){this.constructor=t}t.prototype=a===null?Object.create(a):(r.prototype=a.prototype,new r)}var m=function(){return m=Object.assign||function(a){for(var r,e=1,s=arguments.length;e<s;e++){r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(a[i]=r[i])}return a},m.apply(this,arguments)};function V(t,a){var r={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&a.indexOf(e)<0&&(r[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,e=Object.getOwnPropertySymbols(t);s<e.length;s++)a.indexOf(e[s])<0&&(r[e[s]]=t[e[s]]);return r}var W=100,S=100,v=50,f=50,x=50;function C(t){var a=t.className,r=t.counterClockwise,e=t.dashRatio,s=t.pathRadius,i=t.strokeWidth,o=t.style;return c.createElement("path",{className:a,style:Object.assign({},o,B({pathRadius:s,dashRatio:e,counterClockwise:r})),d:I({pathRadius:s,counterClockwise:r}),strokeWidth:i,fillOpacity:0})}function I(t){var a=t.pathRadius,r=t.counterClockwise,e=a,s=r?1:0;return`
      M `+f+","+x+`
      m 0,-`+e+`
      a `+e+","+e+" "+s+" 1 1 0,"+2*e+`
      a `+e+","+e+" "+s+" 1 1 0,-"+2*e+`
    `}function B(t){var a=t.counterClockwise,r=t.dashRatio,e=t.pathRadius,s=Math.PI*2*e,i=(1-r)*s;return{strokeDasharray:s+"px "+s+"px",strokeDashoffset:(a?-i:i)+"px"}}var T=function(t){N(a,t);function a(){return t!==null&&t.apply(this,arguments)||this}return a.prototype.getBackgroundPadding=function(){return this.props.background?this.props.backgroundPadding:0},a.prototype.getPathRadius=function(){return v-this.props.strokeWidth/2-this.getBackgroundPadding()},a.prototype.getPathRatio=function(){var r=this.props,e=r.value,s=r.minValue,i=r.maxValue,o=Math.min(Math.max(e,s),i);return(o-s)/(i-s)},a.prototype.render=function(){var r=this.props,e=r.circleRatio,s=r.className,i=r.classes,o=r.counterClockwise,l=r.styles,u=r.strokeWidth,g=r.text,y=this.getPathRadius(),j=this.getPathRatio();return c.createElement("svg",{className:i.root+" "+s,style:l.root,viewBox:"0 0 "+W+" "+S,"data-test-id":"CircularProgressbar"},this.props.background?c.createElement("circle",{className:i.background,style:l.background,cx:f,cy:x,r:v}):null,c.createElement(C,{className:i.trail,counterClockwise:o,dashRatio:e,pathRadius:y,strokeWidth:u,style:l.trail}),c.createElement(C,{className:i.path,counterClockwise:o,dashRatio:j*e,pathRadius:y,strokeWidth:u,style:l.path}),g?c.createElement("text",{className:i.text,style:l.text,x:f,y:x},g):null)},a.defaultProps={background:!1,backgroundPadding:0,circleRatio:1,classes:{root:"CircularProgressbar",trail:"CircularProgressbar-trail",path:"CircularProgressbar-path",text:"CircularProgressbar-text",background:"CircularProgressbar-background"},counterClockwise:!1,className:"",maxValue:100,minValue:0,strokeWidth:8,styles:{root:{},trail:{},path:{},text:{},background:{}},text:""},a}(c.Component);function D(t){t.children;var a=V(t,["children"]);return c.createElement("div",{"data-test-id":"CircularProgressbarWithChildren"},c.createElement("div",{style:{position:"relative",width:"100%",height:"100%"}},c.createElement(T,m({},a)),t.children?c.createElement("div",{"data-test-id":"CircularProgressbarWithChildren__children",style:{position:"absolute",width:"100%",height:"100%",marginTop:"-100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}},t.children):null))}const h=({width:t="30",value:a="25.30",valueText:r="SI",title:e,fontSize:s="4xl",monoColor:i=!1,maxValue:o=100,tooltip:l})=>n.jsx(n.Fragment,{children:n.jsxs("div",{className:"text-center",children:[n.jsx("div",{className:"shadow-soft-white rounded-full",children:n.jsx(D,{maxValue:o,strokeWidth:t,value:a,styles:{text:{fontSize:"10px",fill:"black"},trail:{strokeWidth:2,strokeLinecap:"round",transform:"rotate(0.25turn)",transformOrigin:"center center",stroke:"#d6d6d6"},path:{stroke:i?"#4D70B3":a>=0&&a<=24?"rgba(190, 218, 255)":a>=25&&a<=49?"rgba(161, 190, 255)":a>=50&&a<=74?"rgba(133, 163, 235)":a>=75&&a<=99?"rgba(105, 137, 207)":"#4D70B3",strokeWidth:2,strokeLinecap:"round",filter:"drop-shadow(1px 3px 2px rgba(0, 0, 0, 0.4))"}},children:n.jsx("div",{className:"flex flex-col items-center",children:n.jsx("span",{className:E(`text-${s} font-semibold`),children:r})})})}),e&&!l&&n.jsx("div",{className:"text-sm font-semibold mt-4",children:e}),e&&l&&n.jsxs("div",{className:"text-sm font-semibold mt-4 flex w-full justify-center",children:[n.jsx("div",{children:e}),n.jsx("div",{className:"flex items-center",children:n.jsx(R,{dataFor:e,children:n.jsx(n.Fragment,{children:n.jsx("p",{className:"text-black font-bold",children:l})})})})]})]})});try{h.displayName="CircularChard",h.__docgenInfo={description:"",displayName:"CircularChard",props:{width:{defaultValue:{value:"30"},description:"",name:"width",required:!1,type:{name:"any"}},value:{defaultValue:{value:"25.30"},description:"",name:"value",required:!1,type:{name:"any"}},valueText:{defaultValue:{value:"SI"},description:"",name:"valueText",required:!1,type:{name:"any"}},fontSize:{defaultValue:{value:"4xl"},description:"",name:"fontSize",required:!1,type:{name:"any"}},monoColor:{defaultValue:{value:"false"},description:"",name:"monoColor",required:!1,type:{name:"any"}},maxValue:{defaultValue:{value:"100"},description:"",name:"maxValue",required:!1,type:{name:"any"}},title:{defaultValue:null,description:"",name:"title",required:!1,type:{name:"any"}},tooltip:{defaultValue:null,description:"",name:"tooltip",required:!1,type:{name:"any"}}}}}catch{}const M={title:"CircularChart",component:h},q=t=>n.jsx("div",{style:{height:"500px",width:"500px"},children:n.jsx(h,{...t})}),d=q.bind({});d.args={width:"30",value:"25.30",valueText:"SI",title:"Basic Circular Chart",fontSize:"4xl",monoColor:!1,maxValue:100,tooltip:"This is a tooltip for the circular chart."};var b,k,w;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`args => <div style={{
  height: '500px',
  width: '500px'
}}>
    <CircularChard {...args} />
  </div>`,...(w=(k=d.parameters)==null?void 0:k.docs)==null?void 0:w.source}}};const G=["BasicCircularChart"];export{d as BasicCircularChart,G as __namedExportsOrder,M as default};
