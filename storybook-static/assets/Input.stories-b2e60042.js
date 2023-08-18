import{j as l}from"./jsx-runtime-4ca860c5.js";import{r as q}from"./index-61bf1805.js";import"./_commonjsHelpers-de833af9.js";const o=({label:s,placeholder:y,value:V,onChange:u,onInput:c})=>{const[_,p]=q.useState(V),b=n=>{const e=n.target.value;p(e),u&&u(e)},P=n=>{const e=n.target.value;p(e),c&&c(e)},j={color:"red"};return l.jsxs("div",{children:[l.jsx("label",{htmlFor:"textInput",children:s}),l.jsx("input",{id:"textInput",type:"text",placeholder:y,value:_,onChange:b,onInput:P,style:j})]})};try{o.displayName="TextInput",o.__docgenInfo={description:"",displayName:"TextInput",props:{label:{defaultValue:null,description:"",name:"label",required:!0,type:{name:"string"}},placeholder:{defaultValue:null,description:"",name:"placeholder",required:!0,type:{name:"string"}},value:{defaultValue:null,description:"",name:"value",required:!0,type:{name:"string"}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((event: unknown) => void)"}},onInput:{defaultValue:null,description:"",name:"onInput",required:!1,type:{name:"((event: unknown) => void)"}}}}}catch{}const L={component:o,title:"TextInput",tags:["autodocs"],argTypes:{onChange:{action:"OnChangeValue"}}},a={args:{value:"Value"}},r={args:{value:"",placeholder:"Placeholder"}},t={args:{...a.args,placeholder:"Placeholder",label:"Label"}};var d,i,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    value: 'Value'
  }
}`,...(m=(i=a.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var g,h,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    value: '',
    placeholder: 'Placeholder'
  }
}`,...(f=(h=r.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var x,v,I;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    placeholder: 'Placeholder',
    label: 'Label'
  }
}`,...(I=(v=t.parameters)==null?void 0:v.docs)==null?void 0:I.source}}};const S=["Default","Placeholder","Label"];export{a as Default,t as Label,r as Placeholder,S as __namedExportsOrder,L as default};
//# sourceMappingURL=Input.stories-b2e60042.js.map
