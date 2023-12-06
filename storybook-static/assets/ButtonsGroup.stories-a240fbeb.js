import{j as t}from"./jsx-runtime-ffb262ed.js";import{R as p}from"./index.es-d2f9e92b.js";import{r as d}from"./index-76fb7be0.js";import"./index-8d47fad6.js";import"./_commonjsHelpers-de833af9.js";const s=({options:e=[],className:i=""})=>(d.useEffect(()=>{p.rebuild()},[e]),t.jsx("div",{className:`w-full flex flex-row ${i}`,children:e.map((o,a)=>t.jsx("div",{"data-tip":o.label,onClick:()=>o.onClick(),className:`
              leading-none
              flex-1 
              text-center 
              hover:shadow-inner 
              hover:opacity-80
              transition-all ease-in-out duration-200
              cursor-pointer 
              py-2 
              ${a===0?"rounded-l-2xl":""}
              ${a===e.length-1?"rounded-r-2xl":""}
              ${a!==0&&a!==e.length-1?"border-r border-l":""} 
              ${o.className?o.className:""}
            `,children:o.icon},a))}));try{s.displayName="ButtonsGroup",s.__docgenInfo={description:"",displayName:"ButtonsGroup",props:{options:{defaultValue:{value:"[]"},description:"",name:"options",required:!1,type:{name:"any[]"}},className:{defaultValue:{value:""},description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const b={title:"ButtonsGroup",component:s},u=e=>t.jsx(s,{...e}),r=u.bind({});r.args={options:[{label:"Option 1",onClick:()=>console.log("Option 1 clicked"),icon:"🌟",className:"bg-green"},{label:"Option 2",onClick:()=>console.log("Option 2 clicked"),icon:"🚀",className:"bg-red"},{label:"Option 3",onClick:()=>console.log("Option 3 clicked"),icon:"🎉",className:"bg-main"}],className:"my-custom-class"};var l,n,c;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:"args => <ButtonsGroup {...args} />",...(c=(n=r.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const _=["Default"];export{r as Default,_ as __namedExportsOrder,b as default};
