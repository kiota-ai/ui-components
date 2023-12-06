import{j as o}from"./jsx-runtime-ffb262ed.js";import{u as a}from"./useRecorder-90eb9225.js";import"./index-76fb7be0.js";import"./_commonjsHelpers-de833af9.js";const u={title:"useRecorder",argTypes:{isRecording:{control:"boolean"}}},p=()=>{const[i,d,s,c]=a();return o.jsxs("div",{style:{textAlign:"center",padding:"20px"},children:[o.jsxs("p",{style:{fontSize:"1.2em",marginBottom:"10px"},children:["Audio URL: ",i]}),o.jsxs("p",{style:{fontSize:"1.2em",marginBottom:"20px"},children:["Is Recording: ",d?"Yes":"No"]}),o.jsx("button",{style:{padding:"10px",fontSize:"1em",backgroundColor:"#4CAF50",color:"white",border:"none",borderRadius:"5px",marginRight:"10px"},onClick:s,children:"Start Recording"}),o.jsx("button",{style:{padding:"10px",fontSize:"1em",backgroundColor:"#f44336",color:"white",border:"none",borderRadius:"5px"},onClick:c,children:"Stop Recording"})]})},n=p.bind({});n.args={};var e,r,t;n.parameters={...n.parameters,docs:{...(e=n.parameters)==null?void 0:e.docs,source:{originalSource:`() => {
  const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  return <div style={{
    textAlign: 'center',
    padding: '20px'
  }}>
      <p style={{
      fontSize: '1.2em',
      marginBottom: '10px'
    }}>Audio URL: {audioURL}</p>
      <p style={{
      fontSize: '1.2em',
      marginBottom: '20px'
    }}>Is Recording: {isRecording ? 'Yes' : 'No'}</p>
      <button style={{
      padding: '10px',
      fontSize: '1em',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      marginRight: '10px'
    }} onClick={startRecording}>
        Start Recording
      </button>
      <button style={{
      padding: '10px',
      fontSize: '1em',
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      borderRadius: '5px'
    }} onClick={stopRecording}>
        Stop Recording
      </button>
    </div>;
}`,...(t=(r=n.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};const x=["BasicUseRecorder"];export{n as BasicUseRecorder,x as __namedExportsOrder,u as default};
