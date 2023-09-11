import{j as b}from"./jsx-runtime-4ca860c5.js";/* empty css              */import"./index-61bf1805.js";import"./_commonjsHelpers-de833af9.js";const z=({textAlign:e,width:l,verticalMargin:i,marginRight:o,marginLeft:s,vertical:u,horizontal:d,textSize:c,weight:m,textColor:p,textColorHover:f,bgColor:g,bgHoverColor:h,borderColor:t,shadow:r,className:n})=>{const y=e==="center"?"text-center":e==="right"?"text-right":"text-left",x=t?`border border-${t}`:"";return`${y} block w-${l} my-${i} mr-${o} ml-${s} py-${u} px-${d} text-${c} font-${m} text-${p} placeholder-gray bg-${g} rounded-2xl shadow-${r} cursor-pointer transition-all duration-500 ease-in-out hover:bg-${h} hover:border-${t} hover:text-${f} hover:shadow-hover focus:outline-none hover:shadow-inner ${x} ${n}`},v=e=>{const{onClick:l,type:i,width:o="full",verticalMargin:s="5",vertical:u="2.5",horizontal:d="7",marginRight:c="0",marginLeft:m="0",bgColor:p="transparence-blue",textColor:f="blue-dark",bgHoverColor:g,borderColor:h,textColorHover:t,icon:r,iconComponent:n,text:y,disabled:x,textSize:$="sm",weight:w="semibold",shadow:_="soft-white",iconWidth:k="auto",textAlign:B="center",className:N=""}=e;return b.jsxs("button",{onClick:l,type:i,disabled:x,className:z({textAlign:B,width:o,verticalMargin:s,marginRight:c,marginLeft:m,vertical:u,horizontal:d,textSize:$,weight:w,textColor:f,textColorHover:t,bgColor:p,bgHoverColor:g,borderColor:h,shadow:_,className:N}),children:[r&&b.jsx("img",{src:r,alt:"Icon",className:`inline | mr-2 | w-${k} `}),n&&n,y]})};try{v.displayName="Button",v.__docgenInfo={description:"",displayName:"Button",props:{text:{defaultValue:null,description:"",name:"text",required:!0,type:{name:"string"}},onClick:{defaultValue:null,description:"",name:"onClick",required:!1,type:{name:"(() => void)"}},type:{defaultValue:null,description:"",name:"type",required:!1,type:{name:"enum",value:[{value:'"button"'},{value:'"submit"'},{value:'"reset"'}]}},width:{defaultValue:null,description:"",name:"width",required:!1,type:{name:"string"}},verticalMargin:{defaultValue:null,description:"",name:"verticalMargin",required:!1,type:{name:"string"}},vertical:{defaultValue:null,description:"",name:"vertical",required:!1,type:{name:"string"}},horizontal:{defaultValue:null,description:"",name:"horizontal",required:!1,type:{name:"string"}},marginRight:{defaultValue:null,description:"",name:"marginRight",required:!1,type:{name:"string"}},marginLeft:{defaultValue:null,description:"",name:"marginLeft",required:!1,type:{name:"string"}},bgColor:{defaultValue:null,description:"",name:"bgColor",required:!1,type:{name:"string"}},textColor:{defaultValue:null,description:"",name:"textColor",required:!1,type:{name:"string"}},bgHoverColor:{defaultValue:null,description:"",name:"bgHoverColor",required:!1,type:{name:"string"}},borderColor:{defaultValue:null,description:"",name:"borderColor",required:!1,type:{name:"string"}},textColorHover:{defaultValue:null,description:"",name:"textColorHover",required:!1,type:{name:"string"}},icon:{defaultValue:null,description:"",name:"icon",required:!1,type:{name:"string"}},iconComponent:{defaultValue:null,description:"",name:"iconComponent",required:!1,type:{name:"string"}},disabled:{defaultValue:null,description:"",name:"disabled",required:!1,type:{name:"boolean"}},textSize:{defaultValue:null,description:"",name:"textSize",required:!1,type:{name:"string"}},weight:{defaultValue:null,description:"",name:"weight",required:!1,type:{name:"string"}},shadow:{defaultValue:null,description:"",name:"shadow",required:!1,type:{name:"string"}},iconWidth:{defaultValue:null,description:"",name:"iconWidth",required:!1,type:{name:"string"}},textAlign:{defaultValue:null,description:"",name:"textAlign",required:!1,type:{name:"enum",value:[{value:'"center"'},{value:'"left"'},{value:'"right"'}]}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const A={component:v,title:"Button",tags:["autodocs"],argTypes:{onClick:{action:"onClickValue"}}},a={args:{text:"Button"}};var C,V,q;a.parameters={...a.parameters,docs:{...(C=a.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    text: 'Button'
  }
}`,...(q=(V=a.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const L=["Default"];export{a as Default,L as __namedExportsOrder,A as default};
//# sourceMappingURL=Button.stories-bde02f42.js.map
