import{j as e}from"./jsx-runtime-ffb262ed.js";import{u as y}from"./react-laag.esm-905d63aa.js";import{r as b}from"./index-76fb7be0.js";import{D as i}from"./points_gray-8b4aa473.js";import{u as j}from"./useTranslation-00555890.js";import"./index-d3ea75b5.js";import"./_commonjsHelpers-de833af9.js";const s=({items:r,methods:p})=>{const[t,a]=b.useState(!1),{t:u}=j();function n(){a(!1)}const{renderLayer:f,triggerProps:x,layerProps:g}=y({isOpen:t,onOutsideClick:n,onDisappear:n,overflowContainer:!0,auto:!0,placement:"bottom-start",triggerOffset:12,containerOffset:16,arrowOffset:16});return e.jsxs(e.Fragment,{children:[e.jsx("button",{...x,onClick:()=>a(!t),className:"focus:outline-none border border-border-buttons-secondary rounded-full",children:t?e.jsx("img",{src:i,alt:"Arrow up",className:"w-4 h-4 mb-2"}):e.jsx("img",{src:i,alt:"Arrow down",className:"w-4 h-4 mb-2"})}),f(e.jsx("div",{children:t&&e.jsx("ul",{...g,className:"pl-2 py-1 | bg-white shadow-hover rounded-2xl | text-gray text-xxs | w-auto border border-border-buttons-secondary",children:r&&r.map((l,h)=>e.jsx("li",{onClick:()=>p[l](),className:"px-2 py-1 flex cursor-pointer hover:text-main hover:font-bold text-main",children:e.jsx("span",{children:u(l)})},h))})}))]})};try{s.displayName="PopoverTrelloList",s.__docgenInfo={description:"",displayName:"PopoverTrelloList",props:{methods:{defaultValue:null,description:"",name:"methods",required:!0,type:{name:"any"}},items:{defaultValue:null,description:"",name:"items",required:!0,type:{name:"any[]"}}}}}catch{}const N={title:"PopoverTrelloList",component:s},v=r=>e.jsx(s,{...r}),o=v.bind({});o.args={items:["Item 1","Item 2","Item 3"],methods:{"Item 1":()=>console.log("Clicked on Item 1"),"Item 2":()=>console.log("Clicked on Item 2"),"Item 3":()=>console.log("Clicked on Item 3")}};var c,m,d;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:"args => <PopoverTrelloList {...args} />",...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const O=["Default"];export{o as Default,O as __namedExportsOrder,N as default};
