import{j as d}from"./jsx-runtime-ffb262ed.js";import{r as s}from"./index-76fb7be0.js";import{B as L}from"./Button-83eba740.js";import{R as Z}from"./index-d3ea75b5.js";import{c as H}from"./index.esm-2d6aa1b6.js";import{u as ee}from"./useTranslation-00555890.js";const te=""+new URL("cross_blue-0d458a4a.svg",import.meta.url).href,ae=""+new URL("tick_blue-547e014b.svg",import.meta.url).href;/**
 * @remix-run/router v1.13.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function q(){return q=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},q.apply(this,arguments)}var P;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(P||(P={}));function g(e,t){if(e===!1||e===null||typeof e>"u")throw new Error(t)}function E(e){let{pathname:t="/",search:a="",hash:n=""}=e;return a&&a!=="?"&&(t+=a.charAt(0)==="?"?a:"?"+a),n&&n!=="#"&&(t+=n.charAt(0)==="#"?n:"#"+n),t}function B(e){let t={};if(e){let a=e.indexOf("#");a>=0&&(t.hash=e.substr(a),e=e.substr(0,a));let n=e.indexOf("?");n>=0&&(t.search=e.substr(n),e=e.substr(0,n)),e&&(t.pathname=e)}return t}var k;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(k||(k={}));function ne(e,t){if(t==="/")return e;if(!e.toLowerCase().startsWith(t.toLowerCase()))return null;let a=t.endsWith("/")?t.length-1:t.length,n=e.charAt(a);return n&&n!=="/"?null:e.slice(a)||"/"}function re(e,t){t===void 0&&(t="/");let{pathname:a,search:n="",hash:r=""}=typeof e=="string"?B(e):e;return{pathname:a?a.startsWith("/")?a:ie(a,t):t,search:le(n),hash:se(r)}}function ie(e,t){let a=t.replace(/\/+$/,"").split("/");return e.split("/").forEach(r=>{r===".."?a.length>1&&a.pop():r!=="."&&a.push(r)}),a.length>1?a.join("/"):"/"}function U(e,t,a,n){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+t+"` field ["+JSON.stringify(n)+"].  Please separate it out to the ")+("`to."+a+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function F(e){return e.filter((t,a)=>a===0||t.route.path&&t.route.path.length>0)}function A(e,t,a,n){n===void 0&&(n=!1);let r;typeof e=="string"?r=B(e):(r=q({},e),g(!r.pathname||!r.pathname.includes("?"),U("?","pathname","search",r)),g(!r.pathname||!r.pathname.includes("#"),U("#","pathname","hash",r)),g(!r.search||!r.search.includes("#"),U("#","search","hash",r)));let i=e===""||r.pathname==="",l=i?"/":r.pathname,c;if(l==null)c=a;else if(n){let f=t[t.length-1].replace(/^\//,"").split("/");if(l.startsWith("..")){let h=l.split("/");for(;h[0]==="..";)h.shift(),f.pop();r.pathname=h.join("/")}c="/"+f.join("/")}else{let f=t.length-1;if(l.startsWith("..")){let h=l.split("/");for(;h[0]==="..";)h.shift(),f-=1;r.pathname=h.join("/")}c=f>=0?t[f]:"/"}let u=re(r,c),o=l&&l!=="/"&&l.endsWith("/"),p=(i||l===".")&&a.endsWith("/");return!u.pathname.endsWith("/")&&(o||p)&&(u.pathname+="/"),u}const J=e=>e.join("/").replace(/\/\/+/g,"/"),le=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,se=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e,z=["post","put","patch","delete"];new Set(z);const oe=["get",...z];new Set(oe);/**
 * React Router v6.20.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function V(){return V=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},V.apply(this,arguments)}const K=s.createContext(null),C=s.createContext(null),G=s.createContext(null),j=s.createContext({outlet:null,matches:[],isDataRoute:!1});function ue(e,t){let{relative:a}=t===void 0?{}:t;_()||g(!1);let{basename:n,navigator:r}=s.useContext(C),{hash:i,pathname:l,search:c}=D(e,{relative:a}),u=l;return n!=="/"&&(u=l==="/"?n:J([n,l])),r.createHref({pathname:u,search:c,hash:i})}function _(){return s.useContext(G)!=null}function O(){return _()||g(!1),s.useContext(G).location}function X(e){s.useContext(C).static||s.useLayoutEffect(e)}function de(){let{isDataRoute:e}=s.useContext(j);return e?me():ce()}function ce(){_()||g(!1);let e=s.useContext(K),{basename:t,navigator:a}=s.useContext(C),{matches:n}=s.useContext(j),{pathname:r}=O(),i=JSON.stringify(F(n).map(u=>u.pathnameBase)),l=s.useRef(!1);return X(()=>{l.current=!0}),s.useCallback(function(u,o){if(o===void 0&&(o={}),!l.current)return;if(typeof u=="number"){a.go(u);return}let p=A(u,JSON.parse(i),r,o.relative==="path");e==null&&t!=="/"&&(p.pathname=p.pathname==="/"?t:J([t,p.pathname])),(o.replace?a.replace:a.push)(p,o.state,o)},[t,a,i,r,e])}function D(e,t){let{relative:a}=t===void 0?{}:t,{matches:n}=s.useContext(j),{pathname:r}=O(),i=JSON.stringify(F(n).map(l=>l.pathnameBase));return s.useMemo(()=>A(e,JSON.parse(i),r,a==="path"),[e,i,r,a])}var Q=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Q||{}),Y=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Y||{});function fe(e){let t=s.useContext(K);return t||g(!1),t}function he(e){let t=s.useContext(j);return t||g(!1),t}function pe(e){let t=he(),a=t.matches[t.matches.length-1];return a.route.id||g(!1),a.route.id}function me(){let{router:e}=fe(Q.UseNavigateStable),t=pe(Y.UseNavigateStable),a=s.useRef(!1);return X(()=>{a.current=!0}),s.useCallback(function(r,i){i===void 0&&(i={}),a.current&&(typeof r=="number"?e.navigate(r):e.navigate(r,V({fromRouteId:t},i)))},[e,t])}new Promise(()=>{});/**
 * React Router DOM v6.20.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function R(){return R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},R.apply(this,arguments)}function ge(e,t){if(e==null)return{};var a={},n=Object.keys(e),r,i;for(i=0;i<n.length;i++)r=n[i],!(t.indexOf(r)>=0)&&(a[r]=e[r]);return a}function ve(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function xe(e,t){return e.button===0&&(!t||t==="_self")&&!ve(e)}const ye=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","unstable_viewTransition"],be=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",we=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Ce=s.forwardRef(function(t,a){let{onClick:n,relative:r,reloadDocument:i,replace:l,state:c,target:u,to:o,preventScrollReset:p,unstable_viewTransition:f}=t,h=ge(t,ye),{basename:y}=s.useContext(C),b,v=!1;if(typeof o=="string"&&we.test(o)&&(b=o,be))try{let m=new URL(window.location.href),x=o.startsWith("//")?new URL(m.protocol+o):new URL(o),M=ne(x.pathname,y);x.origin===m.origin&&M!=null?o=M+x.search+x.hash:v=!0}catch{}let N=ue(o,{relative:r}),w=je(o,{replace:l,state:c,target:u,preventScrollReset:p,relative:r,unstable_viewTransition:f});function S(m){n&&n(m),m.defaultPrevented||w(m)}return s.createElement("a",R({},h,{href:b||N,onClick:v||i?n:S,ref:a,target:u}))});var $;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})($||($={}));var W;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(W||(W={}));function je(e,t){let{target:a,replace:n,state:r,preventScrollReset:i,relative:l,unstable_viewTransition:c}=t===void 0?{}:t,u=de(),o=O(),p=D(e,{relative:l});return s.useCallback(f=>{if(xe(f,a)){f.preventDefault();let h=n!==void 0?n:E(o)===E(p);u(e,{replace:h,state:r,preventScrollReset:i,relative:l,unstable_viewTransition:c})}},[o,u,p,n,r,a,e,i,l,c])}const I=({children:e,onClose:t,showCloseModal:a,showModal:n,setShowModal:r,width:i="full",height:l="auto",paddingBottom:c="8",paddingTop:u="10",px:o="8",fixedWidth:p,closeOnClickOutside:f=!1})=>{const h=s.useRef(null),y=b=>{const{current:v}=h;f&&v&&!v.contains(b.target)&&(t&&t(),r&&r(!1))};return s.useEffect(()=>(document.addEventListener("mousedown",y),()=>{document.removeEventListener("mousedown",y)}),[f]),n?Z.createPortal(d.jsx("div",{className:"h-full w-full | top-0 left-0 bottom-0 fixed z-50 | bg-gray-opacity | flex justify-center items-center",children:d.jsx("div",{ref:h,className:`${p} relative`,children:d.jsxs("div",{className:`max-h-screen rounded-2xl shadow-md px-${o} pb-${c} pt-${u} w-${i} h-${l} sm:m-0 bg-white`,children:[d.jsx("div",{className:"relative top-4 right-4 | flex justify-end",children:a&&d.jsx("button",{type:"button",onClick:t,className:"p-2 rounded-full  absolute -top-9 -right-8  border border-border-buttons-secondary",children:d.jsx(H,{className:"block w-6 text-2xl text-text-buttons-secondary"})})}),e]})})}),document.body):null},T=({title:e,titleColor:t="blue-dark",text:a,textMargin:n="4",textWidth:r="medium",onClick:i,img:l=ae,bgColor:c="white",textColor:u="blue-dark",width:o="96",widtMovile:p="80",height:f="96",heightMovile:h="80",padding:y="4",exit:b=!1,link:v=null,showIcon:N=!0,action:w=!1,actionText:S=""})=>{const m=()=>{},{t:x}=ee();return d.jsx("div",{className:"h-full w-full | top-0 left-0 absolute z-50 | bg-gray-opacity | flex justify-center items-center",children:d.jsxs("div",{className:`bg-${c} rounded-lg shadow-md | w-${p} h-${h} sm:w-${o} sm:h-${f} p-${y}`,children:[d.jsx("div",{className:"relative top-0 right-0 | flex justify-end | cursor-pointer",children:i&&d.jsx("button",{type:"button",onClick:i,className:"shadow-hover hover:shadow-inner p-2 rounded-2xl bg-transparence-blue",children:d.jsx("img",{src:te,alt:"Close icon",className:"block w-4"})})}),d.jsxs("div",{className:"w-full h-full p-8 | flex flex-col justify-center items-center",children:[N&&d.jsx("img",{src:l,alt:"Tic icon",className:"w-16"}),e&&d.jsx("h3",{className:`text-center text-lg font-medium mb-1 mt-6 text-${t}`,children:e}),d.jsx("p",{className:`text-${u} text-center text-sm font-${r} mt-${n}`,children:a}),v&&d.jsxs("div",{className:"flex text-xs text-gray mt-4",children:[x("kiota_express_requirements")," ",d.jsx(Ce,{to:v,className:"underline",children:x("here")})]}),b&&d.jsx(L,{text:x("exit"),width:"auto",onClick:m,textColor:"blue-dark",shadow:"none"}),w&&d.jsx(L,{text:S,width:"auto",onClick:()=>w(),textColor:"blue-dark",shadow:"none"})]})]})})};try{I.displayName="Modal",I.__docgenInfo={description:"",displayName:"Modal",props:{onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},showCloseModal:{defaultValue:null,description:"",name:"showCloseModal",required:!1,type:{name:"boolean"}},showModal:{defaultValue:null,description:"",name:"showModal",required:!0,type:{name:"boolean"}},setShowModal:{defaultValue:null,description:"",name:"setShowModal",required:!1,type:{name:"Dispatch<SetStateAction<boolean>>"}},width:{defaultValue:{value:"96"},description:"",name:"width",required:!1,type:{name:"string"}},height:{defaultValue:{value:"96"},description:"",name:"height",required:!1,type:{name:"string"}},paddingBottom:{defaultValue:{value:"8"},description:"",name:"paddingBottom",required:!1,type:{name:"string"}},paddingTop:{defaultValue:{value:"10"},description:"",name:"paddingTop",required:!1,type:{name:"string"}},px:{defaultValue:{value:"8"},description:"",name:"px",required:!1,type:{name:"string"}},fixedWidth:{defaultValue:null,description:"",name:"fixedWidth",required:!1,type:{name:"string"}},closeOnClickOutside:{defaultValue:{value:"false"},description:"",name:"closeOnClickOutside",required:!1,type:{name:"boolean"}}}}}catch{}try{T.displayName="ModalSwal",T.__docgenInfo={description:"",displayName:"ModalSwal",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},titleColor:{defaultValue:{value:"blue-dark"},description:"",name:"titleColor",required:!1,type:{name:"string"}},text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},textMargin:{defaultValue:{value:"4"},description:"",name:"textMargin",required:!1,type:{name:"string"}},textWidth:{defaultValue:{value:"medium"},description:"",name:"textWidth",required:!1,type:{name:"string"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"() => void"}},img:{defaultValue:null,description:"",name:"img",required:!1,type:{name:"string"}},bgColor:{defaultValue:{value:"white"},description:"",name:"bgColor",required:!1,type:{name:"string"}},textColor:{defaultValue:{value:"blue-dark"},description:"",name:"textColor",required:!1,type:{name:"string"}},width:{defaultValue:{value:"96"},description:"",name:"width",required:!1,type:{name:"string"}},widtMovile:{defaultValue:{value:"80"},description:"",name:"widtMovile",required:!1,type:{name:"string"}},height:{defaultValue:{value:"96"},description:"",name:"height",required:!1,type:{name:"string"}},heightMovile:{defaultValue:{value:"80"},description:"",name:"heightMovile",required:!1,type:{name:"string"}},padding:{defaultValue:{value:"4"},description:"",name:"padding",required:!1,type:{name:"string"}},exit:{defaultValue:{value:"false"},description:"",name:"exit",required:!1,type:{name:"boolean"}},link:{defaultValue:{value:"null"},description:"",name:"link",required:!1,type:{name:"string | null"}},showIcon:{defaultValue:{value:"true"},description:"",name:"showIcon",required:!1,type:{name:"boolean"}},action:{defaultValue:{value:"false"},description:"",name:"action",required:!1,type:{name:"any"}},actionText:{defaultValue:{value:""},description:"",name:"actionText",required:!1,type:{name:"string"}}}}}catch{}export{I as M,T as a};