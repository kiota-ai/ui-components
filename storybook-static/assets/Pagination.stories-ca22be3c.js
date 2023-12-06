import{j as n}from"./jsx-runtime-ffb262ed.js";import{r as d}from"./index-76fb7be0.js";import{S as E}from"./Select-01d1fa18.js";import{u as W}from"./useTranslation-00555890.js";import"./_commonjsHelpers-de833af9.js";import"./index.esm-2d6aa1b6.js";import"./iconBase-1d38e9b4.js";const p=({showRowsPerPage:a=!1,currentPage:t,setCurrentPage:i,perPage:u,setPerPage:P,pages:r,maxPaginationNumbers:R,paginateOptions:k=[10,25,50]})=>{const{t:c}=W(),[$,f]=d.useState([1,2,3,4,5]),D=e=>t-Math.floor(e/2)<=0||r<e?0:t+Math.floor(e/2)>=r?r-e:t-Math.floor(e/2),m=e=>{e==="next"&&t<r-1?i(t+1):e==="prev"&&t>=0&&i(t-1)};return d.useEffect(()=>{const e=R||5,h=r<e?r:e,b=D(h)+1,j=[];for(let g=b;g<b+h;g++)j.push(g);return f(j),()=>{f([])}},[r,t]),n.jsxs("div",{className:"relative top-0 left-0 pb-3 pt-6 flex items-center justify-between rounded-b-2xl lg:static w-auto",children:[n.jsxs("div",{className:"flex-1 flex justify-between sm:hidden",children:[n.jsx("button",{disabled:t===0,onClick:()=>m("prev"),className:`
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t===0?"opacity-50 cursor-not-allowed":""}
              `,children:n.jsx("span",{children:c("previous")})}),n.jsx("button",{disabled:t===r-1,onClick:()=>m("next"),className:`
            bg-transparence-blue hover:shadow-inner ml-4  
            inline-flex items-center p-2 rounded-xl text-main
            text-sm font-medium cursor-pointer outline-none focus:outline-none
            ${t===r-1?"opacity-50 cursor-not-allowed":""}
          `,children:n.jsx("span",{children:c("next")})})]}),n.jsxs("div",{className:`hidden sm:flex-1 sm:flex sm:items-center ${a?"sm:justify-between":"sm:justify-end"}`,children:[a&&n.jsx("div",{className:"flex justify-center items-center",children:n.jsx(E,{items:k.map(e=>({id:e,value:e})),initialValues:[{id:u,value:u}],onSelect:P,isClearable:!1,className:"mt-4"})}),n.jsxs("nav",{className:"relative z-0 inline-flex rounded-md shadow-sm","aria-label":"Pagination",children:[n.jsx("button",{disabled:t===0,onClick:()=>m("prev"),className:`
                bg-transparence-blue hover:shadow-inner mr-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t===0?"opacity-50 cursor-not-allowed":""}
              `,children:n.jsx("span",{children:c("previous")})}),$.map(e=>n.jsxs("span",{children:[t+1===e&&n.jsx("button",{className:"mx-1 px-4 py-2 text-sm font-medium rounded-xl shadow-inner hover:shadow-inner bg-main text-white",children:e}),t+1!==e&&n.jsx("button",{onClick:()=>i(e-1),className:"mx-1 px-4 py-2 text-sm font-medium text-main rounded-xl bg-transparence-blue hover:text-mainhover:shadow-inner",children:e})]},e)),n.jsx("button",{disabled:t===r-1,onClick:()=>m("next"),className:`
                bg-transparence-blue hover:shadow-inner ml-4  
                inline-flex items-center p-2 rounded-xl text-main
                text-sm font-medium cursor-pointer outline-none focus:outline-none
                ${t===r-1?"opacity-50 cursor-not-allowed":""}
              `,children:n.jsx("span",{children:c("next")})})]})]})]})};try{p.displayName="Pagination",p.__docgenInfo={description:"",displayName:"Pagination",props:{showRowsPerPage:{defaultValue:{value:"false"},description:"",name:"showRowsPerPage",required:!1,type:{name:"boolean"}},currentPage:{defaultValue:null,description:"",name:"currentPage",required:!0,type:{name:"number"}},setCurrentPage:{defaultValue:null,description:"",name:"setCurrentPage",required:!0,type:{name:"Dispatch<SetStateAction<number>>"}},perPage:{defaultValue:null,description:"",name:"perPage",required:!0,type:{name:"number"}},setPerPage:{defaultValue:null,description:"",name:"setPerPage",required:!0,type:{name:"Dispatch<SetStateAction<number>>"}},pages:{defaultValue:null,description:"",name:"pages",required:!0,type:{name:"number"}},maxPaginationNumbers:{defaultValue:null,description:"",name:"maxPaginationNumbers",required:!0,type:{name:"number"}},paginateOptions:{defaultValue:{value:"[10, 25, 50]"},description:"",name:"paginateOptions",required:!1,type:{name:"number[]"}}}}}catch{}const F={title:"Pagination",component:p},x=a=>{const[t,i]=d.useState(a.currentPage),[u,P]=d.useState(a.perPage);return n.jsx(p,{...a,currentPage:t,setCurrentPage:i,perPage:u,setPerPage:P})},s=x.bind({});s.args={showRowsPerPage:!1,currentPage:0,setCurrentPage:()=>{},perPage:10,setPerPage:()=>{},pages:5,maxPaginationNumbers:5};const o=x.bind({});o.args={...s.args,showRowsPerPage:!0};const l=x.bind({});l.args={...s.args,maxPaginationNumbers:7};var w,v,y;s.parameters={...s.parameters,docs:{...(w=s.parameters)==null?void 0:w.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const [perPage, setPerPage] = useState(args.perPage);
  return <Pagination {...args} currentPage={currentPage} setCurrentPage={setCurrentPage} perPage={perPage} setPerPage={setPerPage} />;
}`,...(y=(v=s.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var C,S,N;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const [perPage, setPerPage] = useState(args.perPage);
  return <Pagination {...args} currentPage={currentPage} setCurrentPage={setCurrentPage} perPage={perPage} setPerPage={setPerPage} />;
}`,...(N=(S=o.parameters)==null?void 0:S.docs)==null?void 0:N.source}}};var _,V,q;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`args => {
  const [currentPage, setCurrentPage] = useState(args.currentPage);
  const [perPage, setPerPage] = useState(args.perPage);
  return <Pagination {...args} currentPage={currentPage} setCurrentPage={setCurrentPage} perPage={perPage} setPerPage={setPerPage} />;
}`,...(q=(V=l.parameters)==null?void 0:V.docs)==null?void 0:q.source}}};const G=["Default","WithRowsPerPage","WithCustomPagination"];export{s as Default,l as WithCustomPagination,o as WithRowsPerPage,G as __namedExportsOrder,F as default};
