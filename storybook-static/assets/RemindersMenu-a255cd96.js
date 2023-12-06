import{j as r}from"./jsx-runtime-ffb262ed.js";import{G as _}from"./iconBase-1d38e9b4.js";import{R as b}from"./index.es-d2f9e92b.js";import{r as c}from"./index-76fb7be0.js";import{u as w,A as N}from"./react-laag.esm-905d63aa.js";import{h as m,i as k,j as C,e as $,k as v}from"./index.esm-2d6aa1b6.js";import{A as F}from"./index-5c24f9bc.js";import{h as M}from"./moment-fbc5633a.js";import{a as R}from"./index.esm-66b5f0b2.js";import{u as A}from"./useTranslation-00555890.js";function O(a){return _({tag:"svg",attr:{fill:"none",viewBox:"0 0 24 24",strokeWidth:"2",stroke:"currentColor","aria-hidden":"true"},child:[{tag:"path",attr:{strokeLinecap:"round",strokeLinejoin:"round",d:"M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"}}]})(a)}const u=({onClick:a,reminders:i,totalReminders:o})=>{const{t}=A(),[l,d]=c.useState(!1);c.useEffect(()=>{b.rebuild()},[]);const p=(e,n,s=!1)=>e.reminder_type==="call"?r.jsx(k,{"data-tip":n(e.reminder_type),className:`inline ${s?"w-4 h-4":"w-6 h-6"} mr-1`}):e.reminder_type==="meeting"?r.jsx(C,{"data-tip":n(e.reminder_type),className:`inline ${s?"w-4 h-4":"w-6 h-6"} mr-1`}):e.reminder_type==="task"?r.jsx($,{"data-tip":n(e.reminder_type),className:`inline ${s?"w-4 h-4":"w-6 h-6"} mr-1`}):e.reminder_type==="deadline"?r.jsx(R,{"data-tip":n(e.reminder_type),className:`inline ${s?"w-4 h-4":"w-6 h-6"} mr-1`}):e.reminder_type==="email"?r.jsx(v,{"data-tip":n(e.reminder_type),className:`inline ${s?"w-4 h-4":"w-6 h-6"} mr-1`}):r.jsx(O,{"data-tip":n(e.reminder_type),className:`inline ${s?"w-4 h-4":"w-6 h-6"} mr-1`}),h=e=>{a(e)},f=()=>o?[...i,{title:o-i.length?`${t("go_to_reminders")} (+${o-i.length})`:`${t("go_to_reminders")}`,icon:r.jsx(m,{}),url:"/reminders"}]:[{title:t("reminders_not_found_today")},{title:t("go_to_reminders"),icon:r.jsx(m,{}),url:"/reminders"}],{renderLayer:x,triggerProps:y,layerProps:j,arrowProps:g}=w({isOpen:l,onOutsideClick:()=>d(!1),onDisappear:()=>d(!1),overflowContainer:!0,auto:!0,placement:"bottom-center",triggerOffset:12,containerOffset:16,arrowOffset:16});return r.jsxs("div",{children:[r.jsxs("button",{id:"reminders-button",...y,onClick:()=>d(!l),className:"flex justify-center items-center bg-bg-buttons-secondary border border-border-buttons-secondary focus:outline-none custom-circle hover:shadow-inner shadow-soft-white w-8 h-8 rounded-full ml-2",children:[r.jsx(m,{className:"text-text-buttons-secondary w-3"}),o>0&&r.jsx("span",{className:"inline-block w-1.5 h-1.5 bg-red -mr-1.5 mb-2 rounded-full"})]}),l&&x(r.jsxs("ul",{...j,className:"mt-2 px-2 py-2 z-30 | shadow-hover border bg-white rounded-2xl border-border-buttons-secondary",children:[f().map((e,n)=>r.jsxs("li",{onClick:e.reminder?()=>{}:()=>h(e.url),className:`px-2 py-2 flex text-main items-center ${!e.reminder&&"cursor-pointer"} ${e.reminder&&"border-b border-gray-lines"} text-sm text-gray`,children:[!e.reminder&&r.jsxs(r.Fragment,{children:[r.jsx("span",{className:"mr-2 text-main",children:e.icon}),r.jsx("span",{className:"hover:font-bold",children:t(e.title)})]}),e.reminder&&r.jsxs(r.Fragment,{children:[e.reminder_type&&r.jsx("span",{className:"mr-2 text-main",children:p(e,t)}),r.jsxs("div",{className:"flex flex-col",children:[r.jsxs("div",{children:[r.jsx(F,{src:e.deal.logo,size:"15",round:!0,color:"#e0e6f2",fgColor:"#4d70b3",alt:t("logo"),className:"mr-2"}),r.jsx("span",{className:"text-sm",children:e.deal.name})]}),r.jsx("div",{children:r.jsx("span",{className:"text-xs",children:`${t(e.reminder)} (${M(e.date).format("HH:MM")})`})})]})]})]},n)),r.jsx(N,{...g,borderColor:"#61D8BD",borderWidth:1,className:"w-5"})]}))]})};try{u.displayName="RemindersMenu",u.__docgenInfo={description:"",displayName:"RemindersMenu",props:{onClick:{defaultValue:null,description:"",name:"onClick",required:!0,type:{name:"any"}},reminders:{defaultValue:null,description:"",name:"reminders",required:!0,type:{name:"any[]"}},totalReminders:{defaultValue:null,description:"",name:"totalReminders",required:!0,type:{name:"any"}}}}}catch{}export{u as R};