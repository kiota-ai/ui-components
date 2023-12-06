import{j as e}from"./jsx-runtime-ffb262ed.js";import{U as M}from"./UiList-8a182156.js";import{G as l}from"./iconBase-1d38e9b4.js";import{a as N}from"./index.esm-82a08284.js";import{u as _}from"./useTranslation-00555890.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./tslib.es6-b7af3ea6.js";function C(t){return l({tag:"svg",attr:{version:"1.2",baseProfile:"tiny",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M17.414 6.586c-.78-.781-2.048-.781-2.828 0l-2.586 2.586-2.586-2.586c-.78-.781-2.048-.781-2.828 0-.781.781-.781 2.047 0 2.828l2.585 2.586-2.585 2.586c-.781.781-.781 2.047 0 2.828.39.391.902.586 1.414.586s1.024-.195 1.414-.586l2.586-2.586 2.586 2.586c.39.391.902.586 1.414.586s1.024-.195 1.414-.586c.781-.781.781-2.047 0-2.828l-2.585-2.586 2.585-2.586c.781-.781.781-2.047 0-2.828z"}}]})(t)}const o=({sections:t,onClick:i,activePath:a,logoUrl:c,logoAltUrl:u,activeMenu:g,onClickOpenMenu:d})=>{const{t:x}=_(),v=c||"https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg",j=u||"https://prod-platforms-resources.s3.eu-west-1.amazonaws.com/65135f4568465b647b01a9e2/f5cb8211-934c-44c2-aed8-e507e6ceec56.png",k=r=>{i(r.url)},w=r=>{const n=r.split("/"),m=a.split("/");return n.length<2||m.length<2?!1:a===r||a.startsWith(r+"/")?!0:n[1]===m[1]},b=()=>{localStorage.clear(),i("/")},y=()=>t.map((r,n)=>e.jsx("div",{id:`sidebar-menu-item-${n+1}`,className:"flex justify-center text-right w-full",children:e.jsxs("div",{onClick:()=>k(r),className:`flex items-center w-full  
              h-9 my-2 ml-6 lg:ml-2 px-2 
              rounded-l-2xl cursor-pointer text-center 
              hover:bg-white hover:text-main hover:shadow-none ${w(r.url)?"bg-white text-main":"text-white"}
              `,children:[e.jsx("div",{className:"w-8 flex justify-between text-center",children:r.icon}),e.jsx("div",{className:"text-sm font-medium hidden lg:block",children:x(r.title)})]})},n));return e.jsxs("div",{className:`fixed top-0 bg-main h-screen w-20 lg:w-52 z-20 ${g?"block":"hidden sm:block"}`,children:[e.jsxs("div",{className:"menu-logo-container",children:[e.jsx("div",{className:"mt-4 px-4 flex justify-center items-center hidden lg:flex",children:e.jsx("img",{src:v,alt:"Kiota Logo",className:"object-cover w-full h-full"})}),e.jsx("div",{className:"h-12 mt-5 p-2 flex justify-center items-center block sm:hidden",children:e.jsx(C,{onClick:()=>d?d():{},className:"cursor-pointer w-8 h-8 text-white"})}),e.jsx("div",{className:"h-12 mt-5 p-2 flex justify-center items-center hidden sm:flex lg:hidden",children:e.jsx("img",{src:j,alt:"kiota",className:"object-cover w-full"})})]}),e.jsxs("div",{className:"h-full-menu flex flex-col justify-between",children:[e.jsx(M,{className:"mt-4 lg:mt-8",children:y()}),e.jsx("div",{className:"block sm:hidden  flex items-center w-full h-9 my-2 ml-6 lg:ml-2 px-2 rounded-l-2xl cursor-pointer text-center hover:bg-white hover:text-main hover:shadow-none text-white",children:e.jsx(N,{onClick:()=>b(),className:"cursor-pointer w-6 h-5"})})]})]})};try{o.displayName="Menu",o.__docgenInfo={description:"",displayName:"Menu",props:{sections:{defaultValue:null,description:"",name:"sections",required:!0,type:{name:"any[]"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"any"}},onClickOpenMenu:{defaultValue:null,description:"",name:"onClickOpenMenu",required:!1,type:{name:"any"}},activePath:{defaultValue:null,description:"",name:"activePath",required:!0,type:{name:"any"}},logoUrl:{defaultValue:null,description:"",name:"logoUrl",required:!0,type:{name:"string"}},logoAltUrl:{defaultValue:null,description:"",name:"logoAltUrl",required:!0,type:{name:"string"}},activeMenu:{defaultValue:null,description:"",name:"activeMenu",required:!1,type:{name:"boolean"}}}}}catch{}function L(t){return l({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}},{tag:"polyline",attr:{points:"9 22 9 12 15 12 15 22"}}]})(t)}function V(t){return l({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"3"}},{tag:"path",attr:{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"}}]})(t)}function z(t){return l({tag:"svg",attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"}},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"}}]})(t)}const W={title:"Menu",component:o},q=t=>e.jsx(o,{...t}),s=q.bind({});s.args={sections:[{title:"Home",url:"/home",icon:e.jsx(L,{})},{title:"Settings",url:"/settings",icon:e.jsx(V,{})},{title:"Profile",url:"/profile",icon:e.jsx(z,{})}],onClick:t=>console.log("Clicked:",t),onClickOpenMenu:()=>console.log("Open Menu Clicked"),activePath:"/home",logoUrl:"https://kiota-public-resources.s3.amazonaws.com/logo_sidebar_000.svg",logoAltUrl:"https://prod-platforms-resources.s3.eu-west-1.amazonaws.com/65135f4568465b647b01a9e2/f5cb8211-934c-44c2-aed8-e507e6ceec56.png",activeMenu:!0};var p,h,f;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:"args => <Menu {...args} />",...(f=(h=s.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const F=["DefaultMenu"];export{s as DefaultMenu,F as __namedExportsOrder,W as default};