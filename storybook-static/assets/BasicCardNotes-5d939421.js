import{j as e}from"./jsx-runtime-ffb262ed.js";import{h as m}from"./moment-fbc5633a.js";import{o,F as c,b as d,p as x}from"./index.esm-2d6aa1b6.js";import{T as p}from"./index.esm-82a08284.js";import{G as i}from"./iconBase-1d38e9b4.js";import{B as h}from"./ButtonDanger-afb43e95.js";import{B as u}from"./ButtonCardMain-a48690d3.js";import{C as f}from"./Card-f1b0fc83.js";import{u as g}from"./useTranslation-00555890.js";function y(a){return i({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"}}]})(a)}function j(a){return i({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"}},{tag:"path",attr:{d:"M12 15c1.66 0 2.99-1.34 2.99-3L15 6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 15 6.7 12H5c0 3.42 2.72 6.23 6 6.72V22h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"}}]})(a)}const l=({deleteNote:a,note:t,getNote:n})=>{var r;const{t:s}=g();return e.jsx(f,{title:"",children:e.jsxs("div",{className:"flex flex-col justify-between items-between p-2",children:[e.jsx("div",{className:"text-left leading-none flex flex-col justify-center items-start h-full px-1",children:e.jsxs("div",{className:"text-lg h-auto break-all mb-1",children:[t.type==="audio"&&e.jsx(j,{className:"inline mb-1 text-lg text-main mr-1"}),t.type==="text"&&e.jsx(y,{className:"inline mb-1 text-lg text-main mr-1"}),t.type==="draw"&&e.jsx(p,{className:"inline mb-1 text-lg text-main mr-1"}),t.title]})}),t.type==="text"&&t.content.length>2&&e.jsx("div",{className:"text-sm ml-1 mb-2 line-clamp-2 w-full",dangerouslySetInnerHTML:{__html:t.content}}),e.jsx("div",{className:"flex w-full justify-between items-center border-t border-gray-lines px-1 pt-1",children:e.jsxs("span",{className:"text-xxxs text-gray",children:[e.jsx(o,{className:"inline-block mr-1"}),m(t.createdAt).format("YYYY-MM-DD")]})}),e.jsx("div",{className:"flex w-full border-t border-gray-lines px-1 pt-1",children:e.jsxs("span",{className:"text-xxxs text-gray",children:[e.jsx(c,{className:"inline-block mr-1"}),((r=t.user)==null?void 0:r.name)||(t==null?void 0:t.shared_deal_person_name)||s("no_data")]})}),e.jsxs("div",{className:"flex justify-end border-t border-separator pt-2 mt-4",children:[a&&e.jsx(h,{type:"button",onClick:()=>a(t._id),iconComponent:e.jsx(d,{className:"inline-block w-5 h-4 mr-1"}),marginRight:"2",text:s("delete")}),e.jsx(u,{type:"button",text:s("see"),onClick:()=>n(t._id),iconComponent:e.jsx(x,{className:"inline-block w-5 h-4 mr-1"})})]})]})})};try{l.displayName="BasicCardNotes",l.__docgenInfo={description:"",displayName:"BasicCardNotes",props:{deleteNote:{defaultValue:null,description:"",name:"deleteNote",required:!0,type:{name:"any"}},note:{defaultValue:null,description:"",name:"note",required:!0,type:{name:"any"}},getNote:{defaultValue:null,description:"",name:"getNote",required:!0,type:{name:"any"}}}}}catch{}export{l as B};