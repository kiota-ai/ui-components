import{j as e}from"./jsx-runtime-ffb262ed.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const t=({reference:a,error:n,label:l,placeholder:c,rows:m=4,required:o=!1,className:s="cursor-pointer transition-all duration-200 outline-none hover:border-main hover:outline-none focus:outline-none focus:shadow-focus active:outline-none resize-none",labelClassName:p="font-medium",...f})=>e.jsxs("div",{className:s,children:[e.jsxs("label",{htmlFor:l,className:`block mb-1 text-left text-xs  text-black flex ${p}`,children:[l," ",o&&e.jsx("span",{className:"text-red inline-block mx-1",children:"*"})]}),e.jsx("textarea",{...a,...f,rows:m,placeholder:c,required:o,className:`border border-gray-lines bg-white w-full h-auto py-3 px-7 text-left text-xs font-normal rounded-lg placeholder-gray ${s}`}),n&&e.jsx("div",{className:"text-red relative text-xs",children:n.message})]});try{t.displayName="TextArea",t.__docgenInfo={description:"",displayName:"TextArea",props:{reference:{defaultValue:null,description:"",name:"reference",required:!1,type:{name:"RefObject<any>"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"any"}},label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!0,type:{name:"string"}},rows:{defaultValue:{value:"4"},description:"",name:"rows",required:!1,type:{name:"number"}},required:{defaultValue:{value:"false"},description:"",name:"required",required:!1,type:{name:"boolean"}},className:{defaultValue:{value:"cursor-pointer transition-all duration-200 outline-none hover:border-main hover:outline-none focus:outline-none focus:shadow-focus active:outline-none resize-none"},description:"",name:"className",required:!1,type:{name:"string"}},labelClassName:{defaultValue:{value:"font-medium"},description:"",name:"labelClassName",required:!1,type:{name:"string"}}}}}catch{}const g={title:"TextArea",component:t},x=a=>e.jsx(t,{...a}),r=x.bind({});r.args={error:null,label:"Description",placeholder:"Enter your description here...",rows:4,required:!1,className:"your-custom-class",labelClassName:"font-medium"};var i,u,d;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:"args => <TextArea {...args} />",...(d=(u=r.parameters)==null?void 0:u.docs)==null?void 0:d.source}}};const v=["Default"];export{r as Default,v as __namedExportsOrder,g as default};
