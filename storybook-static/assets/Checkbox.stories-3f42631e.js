import{j as a}from"./jsx-runtime-ffb262ed.js";import{T as F}from"./Tooltip-d88ee0bf.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";import"./index.es-d2f9e92b.js";import"./index-8d47fad6.js";const t=({name:e,id:c,reference:V,label:_,error:i,checked:d,onChange:j,onClick:w,value:v,disabled:N,help:E,dataFor:T,children:S,width:D="full"})=>a.jsxs("div",{className:`flex flex-col | w-${D} | my-2 mx-0`,children:[a.jsxs("div",{children:[a.jsx("input",{...V,className:`form-checkbox rounded-sm cursor-pointer hover:shadow-inner bg-main border border-gray-lines text-main ${d?"shadow-inner":"shadow-soft-white"}`,type:"checkbox",name:e,id:c,checked:d,onChange:j,onClick:w,value:v,disabled:N}),a.jsxs("label",{className:"ml-2 mb-0 text-xs cursor-pointer",htmlFor:c,children:[_," ",E&&a.jsx(F,{dataFor:T,children:S})]})]}),i&&a.jsx("div",{className:"text-red -top-3 left-2 text-xxs",children:i.message})]});try{t.displayName="Checkbox",t.__docgenInfo={description:"",displayName:"Checkbox",props:{name:{defaultValue:null,description:"",name:"name",required:!1,type:{name:"string"}},id:{defaultValue:null,description:"",name:"id",required:!1,type:{name:"string"}},reference:{defaultValue:null,description:"",name:"reference",required:!1,type:{name:"Ref<HTMLInputElement>"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},error:{defaultValue:null,description:"",name:"error",required:!1,type:{name:"any"}},checked:{defaultValue:null,description:"",name:"checked",required:!1,type:{name:"boolean"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"any"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"any"}},value:{defaultValue:null,description:"",name:"value",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},help:{defaultValue:null,description:"",name:"help",required:!1,type:{name:"string"}},dataFor:{defaultValue:null,description:"",name:"dataFor",required:!1,type:{name:"string"}},width:{defaultValue:{value:"full"},description:"",name:"width",required:!1,type:{name:"string"}}}}}catch{}const L={title:"Checkbox",component:t},n=e=>a.jsx(t,{...e}),r=n.bind({});r.args={label:"Check me",checked:!1,onChange:e=>console.log("Checked:",e.target.checked)};const s=n.bind({});s.args={label:"Checked",checked:!0,onChange:e=>console.log("Checked:",e.target.checked)};const o=n.bind({});o.args={label:"Disabled",checked:!1,disabled:!0};const l=n.bind({});l.args={label:"Checkbox with error",checked:!1,error:{message:"This checkbox has an error."}};var u,m,p;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:"args => <Checkbox {...args} />",...(p=(m=r.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var h,b,f;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:"args => <Checkbox {...args} />",...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var x,g,k;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:"args => <Checkbox {...args} />",...(k=(g=o.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var C,y,q;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:"args => <Checkbox {...args} />",...(q=(y=l.parameters)==null?void 0:y.docs)==null?void 0:q.source}}};const M=["BasicCheckbox","CheckedCheckbox","DisabledCheckbox","CheckboxWithError"];export{r as BasicCheckbox,l as CheckboxWithError,s as CheckedCheckbox,o as DisabledCheckbox,M as __namedExportsOrder,L as default};
