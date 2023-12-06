import{j as x}from"./jsx-runtime-ffb262ed.js";import{r as R}from"./index-76fb7be0.js";import{c as G,G as oe,E as ee,W as se,o as he,Z as ve,l as Y,n as D,e as Hn,J as Xn,H as Fn,B as Yn,b as qn,_ as Nn,w as _n,D as Jn,p as Zn,k as zn}from"./nivo-colors.es-6a419262.js";import{t as ge,n as pe,l as ne,k as q}from"./viridis-86f79054.js";import{m as Qn}from"./line-d3dcc640.js";import{M as Un}from"./arc-78d31a8a.js";import{X as Kn}from"./nivo-legends.es-8b85c3de.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./hasIn-bc1d64c1.js";import"./_baseIsEqual-83a59b7a.js";import"./isString-addf3cb0.js";import"./isEqual-f4967cc5.js";import"./index-d3ea75b5.js";import"./_basePickBy-65d675d2.js";function er(e,n){return n<e?-1:n>e?1:n>=e?0:NaN}function nr(e){return e}function rr(){var e=nr,n=er,r=null,t=G(0),o=G(ge),s=G(0);function a(i){var u,f=i.length,v,g,b=0,m=new Array(f),l=new Array(f),p=+t.apply(this,arguments),L=Math.min(ge,Math.max(-ge,o.apply(this,arguments)-p)),k,A=Math.min(Math.abs(L)/f,s.apply(this,arguments)),c=A*(L<0?-1:1),y;for(u=0;u<f;++u)(y=l[m[u]=u]=+e(i[u],u,i))>0&&(b+=y);for(n!=null?m.sort(function(h,M){return n(l[h],l[M])}):r!=null&&m.sort(function(h,M){return r(i[h],i[M])}),u=0,g=b?(L-f*c)/b:0;u<f;++u,p=k)v=m[u],y=l[v],k=p+(y>0?y*g:0)+c,l[v]={data:i[v],index:u,value:y,startAngle:p,endAngle:k,padAngle:A};return l}return a.value=function(i){return arguments.length?(e=typeof i=="function"?i:G(+i),a):e},a.sortValues=function(i){return arguments.length?(n=i,r=null,a):n},a.sort=function(i){return arguments.length?(r=i,n=null,a):r},a.startAngle=function(i){return arguments.length?(t=typeof i=="function"?i:G(+i),a):t},a.endAngle=function(i){return arguments.length?(o=typeof i=="function"?i:G(+i),a):o},a.padAngle=function(i){return arguments.length?(s=typeof i=="function"?i:G(+i),a):s},a}function C(){return C=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},C.apply(this,arguments)}var tr={pointerEvents:"none"},ar=function(e){var n=e.label,r=e.style,t=ee();return x.jsx(q.g,{transform:r.transform,opacity:r.progress,style:tr,children:x.jsx(q.text,{textAnchor:"middle",dominantBaseline:"central",style:C({},t.labels.text,{fill:r.textColor}),children:n})})},en=function(e){var n=e%(2*Math.PI);return n<0&&(n+=2*Math.PI),n},ir=function(e,n){return e.filter(function(r){return Math.abs(he(r.arc.endAngle-r.arc.startAngle))>=n})},or={startAngle:{enter:function(e){return C({},e,{endAngle:e.startAngle})},update:function(e){return e},leave:function(e){return C({},e,{startAngle:e.endAngle})}},middleAngle:{enter:function(e){var n=e.startAngle+(e.endAngle-e.startAngle)/2;return C({},e,{startAngle:n,endAngle:n})},update:function(e){return e},leave:function(e){var n=e.startAngle+(e.endAngle-e.startAngle)/2;return C({},e,{startAngle:n,endAngle:n})}},endAngle:{enter:function(e){return C({},e,{startAngle:e.endAngle})},update:function(e){return e},leave:function(e){return C({},e,{endAngle:e.startAngle})}},innerRadius:{enter:function(e){return C({},e,{outerRadius:e.innerRadius})},update:function(e){return e},leave:function(e){return C({},e,{innerRadius:e.outerRadius})}},centerRadius:{enter:function(e){var n=e.innerRadius+(e.outerRadius-e.innerRadius)/2;return C({},e,{innerRadius:n,outerRadius:n})},update:function(e){return e},leave:function(e){var n=e.innerRadius+(e.outerRadius-e.innerRadius)/2;return C({},e,{innerRadius:n,outerRadius:n})}},outerRadius:{enter:function(e){return C({},e,{innerRadius:e.outerRadius})},update:function(e){return e},leave:function(e){return C({},e,{outerRadius:e.innerRadius})}},pushIn:{enter:function(e){return C({},e,{innerRadius:e.innerRadius-e.outerRadius+e.innerRadius,outerRadius:e.innerRadius})},update:function(e){return e},leave:function(e){return C({},e,{innerRadius:e.outerRadius,outerRadius:e.outerRadius+e.outerRadius-e.innerRadius})}},pushOut:{enter:function(e){return C({},e,{innerRadius:e.outerRadius,outerRadius:e.outerRadius+e.outerRadius-e.innerRadius})},update:function(e){return e},leave:function(e){return C({},e,{innerRadius:e.innerRadius-e.outerRadius+e.innerRadius,outerRadius:e.innerRadius})}}},nn=function(e,n){return R.useMemo(function(){var r=or[e];return{enter:function(t){return C({progress:0},r.enter(t.arc),n?n.enter(t):{})},update:function(t){return C({progress:1},r.update(t.arc),n?n.update(t):{})},leave:function(t){return C({progress:0},r.leave(t.arc),n?n.leave(t):{})}}},[e,n])},sr=function(e,n){var r=Hn(e)-Math.PI/2,t=e.innerRadius+(e.outerRadius-e.innerRadius)*n;return Y(r,t)},ur=function(e){return function(n,r,t,o){return ne([n,r,t,o],function(s,a,i,u){var f=sr({startAngle:s,endAngle:a,innerRadius:i,outerRadius:u},e);return"translate("+f.x+","+f.y+")"})}},lr=function(e,n,r,t){n===void 0&&(n=.5),r===void 0&&(r="innerRadius");var o=ve(),s=o.animate,a=o.config,i=nn(r,t);return{transition:pe(e,{keys:function(u){return u.id},initial:i.update,from:i.enter,enter:i.update,update:i.update,leave:i.leave,config:a,immediate:!s}),interpolate:ur(n)}},dr=function(e){var n=e.center,r=e.data,t=e.transitionMode,o=e.label,s=e.radiusOffset,a=e.skipAngle,i=e.textColor,u=e.component,f=u===void 0?ar:u,v=oe(o),g=ee(),b=se(i,g),m=R.useMemo(function(){return r.filter(function(A){return Math.abs(he(A.arc.endAngle-A.arc.startAngle))>=a})},[r,a]),l=lr(m,s,t),p=l.transition,L=l.interpolate,k=f;return x.jsx("g",{transform:"translate("+n[0]+","+n[1]+")",children:p(function(A,c){return R.createElement(k,{key:c.id,datum:c,label:v(c),style:C({},A,{transform:L(A.startAngle,A.endAngle,A.innerRadius,A.outerRadius),textColor:b(c)})})})})},cr=function(e){var n=e.label,r=e.style,t=ee();return x.jsxs(q.g,{opacity:r.opacity,children:[x.jsx(q.path,{fill:"none",stroke:r.linkColor,strokeWidth:r.thickness,d:r.path}),x.jsx(q.text,{transform:r.textPosition,textAnchor:r.textAnchor,dominantBaseline:"central",style:C({},t.labels.text,{fill:r.textColor}),children:n})]})},fr=function(e){var n=en(e.startAngle+(e.endAngle-e.startAngle)/2-Math.PI/2);return n<Math.PI/2||n>1.5*Math.PI?"start":"end"},rn=function(e,n,r,t){var o,s,a=en(e.startAngle+(e.endAngle-e.startAngle)/2-Math.PI/2),i=Y(a,e.outerRadius+n),u=Y(a,e.outerRadius+n+r);return a<Math.PI/2||a>1.5*Math.PI?(o="after",s={x:u.x+t,y:u.y}):(o="before",s={x:u.x-t,y:u.y}),{side:o,points:[i,u,s]}},gr=Qn().x(function(e){return e.x}).y(function(e){return e.y}),hr=function(e,n,r,t,o,s,a){return ne([e,n,r,t,o,s,a],function(i,u,f,v,g,b,m){var l=rn({startAngle:i,endAngle:u,innerRadius:f,outerRadius:v},g,b,m).points;return gr(l)})},vr=function(e,n,r,t){return ne([e,n,r,t],function(o,s,a,i){return fr({startAngle:o,endAngle:s,innerRadius:a,outerRadius:i})})},pr=function(e,n,r,t,o,s,a,i){return ne([e,n,r,t,o,s,a,i],function(u,f,v,g,b,m,l,p){var L=rn({startAngle:u,endAngle:f,innerRadius:v,outerRadius:g},b,m,l),k=L.points,A=L.side,c=k[2];return A==="before"?c.x-=p:c.x+=p,"translate("+c.x+","+c.y+")"})},mr=function(e){var n=e.data,r=e.offset,t=r===void 0?0:r,o=e.diagonalLength,s=e.straightLength,a=e.skipAngle,i=a===void 0?0:a,u=e.textOffset,f=e.linkColor,v=e.textColor,g=ve(),b=g.animate,m=g.config,l=ee(),p=se(f,l),L=se(v,l),k=function(c,y){return R.useMemo(function(){return ir(c,y)},[c,y])}(n,i),A=function(c){var y=c.offset,h=c.diagonalLength,M=c.straightLength,W=c.textOffset,V=c.getLinkColor,S=c.getTextColor;return R.useMemo(function(){return{enter:function(O){return{startAngle:O.arc.startAngle,endAngle:O.arc.endAngle,innerRadius:O.arc.innerRadius,outerRadius:O.arc.outerRadius,offset:y,diagonalLength:0,straightLength:0,textOffset:W,linkColor:V(O),textColor:S(O),opacity:0}},update:function(O){return{startAngle:O.arc.startAngle,endAngle:O.arc.endAngle,innerRadius:O.arc.innerRadius,outerRadius:O.arc.outerRadius,offset:y,diagonalLength:h,straightLength:M,textOffset:W,linkColor:V(O),textColor:S(O),opacity:1}},leave:function(O){return{startAngle:O.arc.startAngle,endAngle:O.arc.endAngle,innerRadius:O.arc.innerRadius,outerRadius:O.arc.outerRadius,offset:y,diagonalLength:0,straightLength:0,textOffset:W,linkColor:V(O),textColor:S(O),opacity:0}}}},[h,M,W,V,S,y])}({offset:t,diagonalLength:o,straightLength:s,textOffset:u,getLinkColor:p,getTextColor:L});return{transition:pe(k,{keys:function(c){return c.id},initial:A.update,from:A.enter,enter:A.update,update:A.update,leave:A.leave,config:m,immediate:!b}),interpolateLink:hr,interpolateTextAnchor:vr,interpolateTextPosition:pr}},br=function(e){var n=e.center,r=e.data,t=e.label,o=e.skipAngle,s=e.offset,a=e.diagonalLength,i=e.straightLength,u=e.strokeWidth,f=e.textOffset,v=e.textColor,g=e.linkColor,b=e.component,m=b===void 0?cr:b,l=oe(t),p=mr({data:r,skipAngle:o,offset:s,diagonalLength:a,straightLength:i,textOffset:f,linkColor:g,textColor:v}),L=p.transition,k=p.interpolateLink,A=p.interpolateTextAnchor,c=p.interpolateTextPosition,y=m;return x.jsx("g",{transform:"translate("+n[0]+","+n[1]+")",children:L(function(h,M){return R.createElement(y,{key:M.id,datum:M,label:l(M),style:C({},h,{thickness:u,path:k(h.startAngle,h.endAngle,h.innerRadius,h.outerRadius,h.offset,h.diagonalLength,h.straightLength),textAnchor:A(h.startAngle,h.endAngle,h.innerRadius,h.outerRadius),textPosition:c(h.startAngle,h.endAngle,h.innerRadius,h.outerRadius,h.offset,h.diagonalLength,h.straightLength,h.textOffset)})})})})},Lr=function(e){var n=e.datum,r=e.style,t=e.onClick,o=e.onMouseEnter,s=e.onMouseMove,a=e.onMouseLeave,i=R.useCallback(function(g){return t==null?void 0:t(n,g)},[t,n]),u=R.useCallback(function(g){return o==null?void 0:o(n,g)},[o,n]),f=R.useCallback(function(g){return s==null?void 0:s(n,g)},[s,n]),v=R.useCallback(function(g){return a==null?void 0:a(n,g)},[a,n]);return x.jsx(q.path,{d:r.path,opacity:r.opacity,fill:n.fill||r.color,stroke:r.borderColor,strokeWidth:r.borderWidth,onClick:t?i:void 0,onMouseEnter:o?u:void 0,onMouseMove:s?f:void 0,onMouseLeave:a?v:void 0})},Ar=function(e,n,r,t,o){return ne([e,n,r,t],function(s,a,i,u){return o({startAngle:s,endAngle:a,innerRadius:Math.max(0,i),outerRadius:Math.max(0,u)})})},Rr=function(e,n,r){n===void 0&&(n="innerRadius");var t=ve(),o=t.animate,s=t.config,a=nn(n,r);return{transition:pe(e,{keys:function(i){return i.id},initial:a.update,from:a.enter,enter:a.update,update:a.update,leave:a.leave,config:s,immediate:!o}),interpolate:Ar}},xr=function(e){var n=e.center,r=e.data,t=e.arcGenerator,o=e.borderWidth,s=e.borderColor,a=e.onClick,i=e.onMouseEnter,u=e.onMouseMove,f=e.onMouseLeave,v=e.transitionMode,g=e.component,b=g===void 0?Lr:g,m=ee(),l=se(s,m),p=Rr(r,v,{enter:function(c){return{opacity:0,color:c.color,borderColor:l(c)}},update:function(c){return{opacity:1,color:c.color,borderColor:l(c)}},leave:function(c){return{opacity:0,color:c.color,borderColor:l(c)}}}),L=p.transition,k=p.interpolate,A=b;return x.jsx("g",{transform:"translate("+n[0]+","+n[1]+")",children:L(function(c,y){return R.createElement(A,{key:y.id,datum:y,style:C({},c,{borderWidth:o,path:k(c.startAngle,c.endAngle,c.innerRadius,c.outerRadius,t)}),onClick:a,onMouseEnter:i,onMouseMove:u,onMouseLeave:f})})})},kr=function(e,n,r,t,o,s){s===void 0&&(s=!0);var a=[],i=Y(D(t),r);a.push([i.x,i.y]);var u=Y(D(o),r);a.push([u.x,u.y]);for(var f=Math.round(Math.min(t,o));f<=Math.round(Math.max(t,o));f++)if(f%90==0){var v=Y(D(f),r);a.push([v.x,v.y])}a=a.map(function(L){var k=L[0],A=L[1];return[e+k,n+A]}),s&&a.push([e,n]);var g=a.map(function(L){return L[0]}),b=a.map(function(L){return L[1]}),m=Math.min.apply(Math,g),l=Math.max.apply(Math,g),p=Math.min.apply(Math,b);return{points:a,x:m,y:p,width:l-m,height:Math.max.apply(Math,b)-p}},yr=function(e){var n=e===void 0?{}:e,r=n.cornerRadius,t=r===void 0?0:r,o=n.padAngle,s=o===void 0?0:o;return R.useMemo(function(){return Un().innerRadius(function(a){return a.innerRadius}).outerRadius(function(a){return a.outerRadius}).cornerRadius(t).padAngle(s)},[t,s])};function E(){return E=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},E.apply(this,arguments)}function tn(e,n){if(e==null)return{};var r,t,o={},s=Object.keys(e);for(t=0;t<s.length;t++)r=s[t],n.indexOf(r)>=0||(o[r]=e[r]);return o}var He,Cr=function(e){var n=e.width,r=e.height,t=e.legends,o=e.data,s=e.toggleSerie;return x.jsx(x.Fragment,{children:t.map(function(a,i){var u;return x.jsx(Kn,E({},a,{containerWidth:n,containerHeight:r,data:(u=a.data)!=null?u:o,toggleSerie:a.toggleSerie?s:void 0}),i)})})},d={id:"id",value:"value",sortByValue:!1,innerRadius:0,padAngle:0,cornerRadius:0,layers:["arcs","arcLinkLabels","arcLabels","legends"],startAngle:0,endAngle:360,fit:!0,activeInnerRadiusOffset:0,activeOuterRadiusOffset:0,borderWidth:0,borderColor:{from:"color",modifiers:[["darker",1]]},enableArcLabels:!0,arcLabel:"formattedValue",arcLabelsSkipAngle:0,arcLabelsRadiusOffset:.5,arcLabelsTextColor:{theme:"labels.text.fill"},enableArcLinkLabels:!0,arcLinkLabel:"id",arcLinkLabelsSkipAngle:0,arcLinkLabelsOffset:0,arcLinkLabelsDiagonalLength:16,arcLinkLabelsStraightLength:24,arcLinkLabelsThickness:1,arcLinkLabelsTextOffset:6,arcLinkLabelsTextColor:{theme:"labels.text.fill"},arcLinkLabelsColor:{theme:"axis.ticks.line.stroke"},colors:{scheme:"nivo"},defs:[],fill:[],isInteractive:!0,animate:!0,motionConfig:"gentle",transitionMode:"innerRadius",tooltip:function(e){var n=e.datum;return x.jsx(_n,{id:n.id,value:n.formattedValue,enableChip:!0,color:n.color})},legends:[],role:"img",pixelRatio:typeof window<"u"&&(He=window.devicePixelRatio)!=null?He:1},Mr=["points"],Or=function(e){var n=e.data,r=e.id,t=r===void 0?d.id:r,o=e.value,s=o===void 0?d.value:o,a=e.valueFormat,i=e.colors,u=i===void 0?d.colors:i,f=oe(t),v=oe(s),g=Jn(a),b=Zn(u,"id");return R.useMemo(function(){return n.map(function(m){var l,p=f(m),L=v(m),k={id:p,label:(l=m.label)!=null?l:p,hidden:!1,value:L,formattedValue:g(L),data:m};return E({},k,{color:b(k)})})},[n,f,v,g,b])},jr=function(e){var n=e.data,r=e.startAngle,t=e.endAngle,o=e.innerRadius,s=e.outerRadius,a=e.padAngle,i=e.sortByValue,u=e.activeId,f=e.activeInnerRadiusOffset,v=e.activeOuterRadiusOffset,g=e.hiddenIds,b=R.useMemo(function(){var m=rr().value(function(l){return l.value}).startAngle(D(r)).endAngle(D(t)).padAngle(D(a));return i||m.sortValues(null),m},[r,t,a,i]);return R.useMemo(function(){var m=n.filter(function(l){return!g.includes(l.id)});return{dataWithArc:b(m).map(function(l){var p=Math.abs(l.endAngle-l.startAngle);return E({},l.data,{arc:{index:l.index,startAngle:l.startAngle,endAngle:l.endAngle,innerRadius:u===l.data.id?o-f:o,outerRadius:u===l.data.id?s+v:s,thickness:s-o,padAngle:l.padAngle,angle:p,angleDeg:he(p)}})}),legendData:n.map(function(l){return E({},l,{hidden:g.includes(l.id)})})}},[b,n,g,u,o,f,s,v])},Ir=function(e){var n=e.data,r=e.width,t=e.height,o=e.innerRadius,s=o===void 0?d.innerRadius:o,a=e.startAngle,i=a===void 0?d.startAngle:a,u=e.endAngle,f=u===void 0?d.endAngle:u,v=e.padAngle,g=v===void 0?d.padAngle:v,b=e.sortByValue,m=b===void 0?d.sortByValue:b,l=e.cornerRadius,p=l===void 0?d.cornerRadius:l,L=e.fit,k=L===void 0?d.fit:L,A=e.activeInnerRadiusOffset,c=A===void 0?d.activeInnerRadiusOffset:A,y=e.activeOuterRadiusOffset,h=y===void 0?d.activeOuterRadiusOffset:y,M=R.useState(null),W=M[0],V=M[1],S=R.useState([]),O=S[0],de=S[1],N=R.useMemo(function(){var B,I=Math.min(r,t)/2,H=I*Math.min(s,1),$=r/2,X=t/2;if(k){var _=kr($,X,I,i-90,f-90),fe=_.points,j=tn(_,Mr),P=Math.min(r/j.width,t/j.height),T={width:j.width*P,height:j.height*P};T.x=(r-T.width)/2,T.y=(t-T.height)/2,$=($-j.x)/j.width*j.width*P+T.x,X=(X-j.y)/j.height*j.height*P+T.y,B={box:j,ratio:P,points:fe},I*=P,H*=P}return{centerX:$,centerY:X,radius:I,innerRadius:H,debug:B}},[r,t,s,i,f,k,p]),ce=jr({data:n,startAngle:i,endAngle:f,innerRadius:N.innerRadius,outerRadius:N.radius,padAngle:g,sortByValue:m,activeId:W,activeInnerRadiusOffset:c,activeOuterRadiusOffset:h,hiddenIds:O}),re=R.useCallback(function(B){de(function(I){return I.indexOf(B)>-1?I.filter(function(H){return H!==B}):[].concat(I,[B])})},[]);return E({arcGenerator:yr({cornerRadius:p,padAngle:D(g)}),setActiveId:V,toggleSerie:re},ce,N)},Sr=function(e){var n=e.dataWithArc,r=e.arcGenerator,t=e.centerX,o=e.centerY,s=e.radius,a=e.innerRadius;return R.useMemo(function(){return{dataWithArc:n,arcGenerator:r,centerX:t,centerY:o,radius:s,innerRadius:a}},[n,r,t,o,s,a])},Wr=function(e){var n=e.center,r=e.data,t=e.arcGenerator,o=e.borderWidth,s=e.borderColor,a=e.isInteractive,i=e.onClick,u=e.onMouseEnter,f=e.onMouseMove,v=e.onMouseLeave,g=e.setActiveId,b=e.tooltip,m=e.transitionMode,l=zn(),p=l.showTooltipFromEvent,L=l.hideTooltip,k=R.useMemo(function(){if(a)return function(h,M){i==null||i(h,M)}},[a,i]),A=R.useMemo(function(){if(a)return function(h,M){p(R.createElement(b,{datum:h}),M),g(h.id),u==null||u(h,M)}},[a,p,g,u,b]),c=R.useMemo(function(){if(a)return function(h,M){p(R.createElement(b,{datum:h}),M),f==null||f(h,M)}},[a,p,f,b]),y=R.useMemo(function(){if(a)return function(h,M){L(),g(null),v==null||v(h,M)}},[a,L,g,v]);return x.jsx(xr,{center:n,data:r,arcGenerator:t,borderWidth:o,borderColor:s,transitionMode:m,onClick:k,onMouseEnter:A,onMouseMove:c,onMouseLeave:y})},Pr=["isInteractive","animate","motionConfig","theme","renderWrapper"],Tr=function(e){var n=e.data,r=e.id,t=r===void 0?d.id:r,o=e.value,s=o===void 0?d.value:o,a=e.valueFormat,i=e.sortByValue,u=i===void 0?d.sortByValue:i,f=e.layers,v=f===void 0?d.layers:f,g=e.startAngle,b=g===void 0?d.startAngle:g,m=e.endAngle,l=m===void 0?d.endAngle:m,p=e.padAngle,L=p===void 0?d.padAngle:p,k=e.fit,A=k===void 0?d.fit:k,c=e.innerRadius,y=c===void 0?d.innerRadius:c,h=e.cornerRadius,M=h===void 0?d.cornerRadius:h,W=e.activeInnerRadiusOffset,V=W===void 0?d.activeInnerRadiusOffset:W,S=e.activeOuterRadiusOffset,O=S===void 0?d.activeOuterRadiusOffset:S,de=e.width,N=e.height,ce=e.margin,re=e.colors,B=re===void 0?d.colors:re,I=e.borderWidth,H=I===void 0?d.borderWidth:I,$=e.borderColor,X=$===void 0?d.borderColor:$,_=e.enableArcLabels,fe=_===void 0?d.enableArcLabels:_,j=e.arcLabel,P=j===void 0?d.arcLabel:j,T=e.arcLabelsSkipAngle,an=T===void 0?d.arcLabelsSkipAngle:T,me=e.arcLabelsTextColor,on=me===void 0?d.arcLabelsTextColor:me,be=e.arcLabelsRadiusOffset,sn=be===void 0?d.arcLabelsRadiusOffset:be,un=e.arcLabelsComponent,Le=e.enableArcLinkLabels,ln=Le===void 0?d.enableArcLinkLabels:Le,Ae=e.arcLinkLabel,dn=Ae===void 0?d.arcLinkLabel:Ae,Re=e.arcLinkLabelsSkipAngle,cn=Re===void 0?d.arcLinkLabelsSkipAngle:Re,xe=e.arcLinkLabelsOffset,fn=xe===void 0?d.arcLinkLabelsOffset:xe,ke=e.arcLinkLabelsDiagonalLength,gn=ke===void 0?d.arcLinkLabelsDiagonalLength:ke,ye=e.arcLinkLabelsStraightLength,hn=ye===void 0?d.arcLinkLabelsStraightLength:ye,Ce=e.arcLinkLabelsThickness,vn=Ce===void 0?d.arcLinkLabelsThickness:Ce,Me=e.arcLinkLabelsTextOffset,pn=Me===void 0?d.arcLinkLabelsTextOffset:Me,Oe=e.arcLinkLabelsTextColor,mn=Oe===void 0?d.arcLinkLabelsTextColor:Oe,je=e.arcLinkLabelsColor,bn=je===void 0?d.arcLinkLabelsColor:je,Ln=e.arcLinkLabelComponent,Ie=e.defs,An=Ie===void 0?d.defs:Ie,Se=e.fill,Rn=Se===void 0?d.fill:Se,We=e.isInteractive,xn=We===void 0?d.isInteractive:We,kn=e.onClick,yn=e.onMouseEnter,Cn=e.onMouseMove,Mn=e.onMouseLeave,Pe=e.tooltip,On=Pe===void 0?d.tooltip:Pe,Te=e.transitionMode,we=Te===void 0?d.transitionMode:Te,Ee=e.legends,Ve=Ee===void 0?d.legends:Ee,Be=e.role,jn=Be===void 0?d.role:Be,J=Yn(de,N,ce),In=J.outerWidth,Sn=J.outerHeight,Wn=J.margin,$e=J.innerWidth,Ge=J.innerHeight,Pn=Or({data:n,id:t,value:s,valueFormat:a,colors:B}),w=Ir({data:Pn,width:$e,height:Ge,fit:A,innerRadius:y,startAngle:b,endAngle:l,padAngle:L,sortByValue:u,cornerRadius:M,activeInnerRadiusOffset:V,activeOuterRadiusOffset:O}),Z=w.dataWithArc,Tn=w.legendData,De=w.arcGenerator,te=w.centerX,ae=w.centerY,wn=w.radius,En=w.innerRadius,Vn=w.setActiveId,Bn=w.toggleSerie,$n=qn(An,Z,Rn),F={arcs:null,arcLinkLabels:null,arcLabels:null,legends:null};v.includes("arcs")&&(F.arcs=x.jsx(Wr,{center:[te,ae],data:Z,arcGenerator:De,borderWidth:H,borderColor:X,isInteractive:xn,onClick:kn,onMouseEnter:yn,onMouseMove:Cn,onMouseLeave:Mn,setActiveId:Vn,tooltip:On,transitionMode:we},"arcs")),ln&&v.includes("arcLinkLabels")&&(F.arcLinkLabels=x.jsx(br,{center:[te,ae],data:Z,label:dn,skipAngle:cn,offset:fn,diagonalLength:gn,straightLength:hn,strokeWidth:vn,textOffset:pn,textColor:mn,linkColor:bn,component:Ln},"arcLinkLabels")),fe&&v.includes("arcLabels")&&(F.arcLabels=x.jsx(dr,{center:[te,ae],data:Z,label:P,radiusOffset:sn,skipAngle:an,textColor:on,transitionMode:we,component:un},"arcLabels")),Ve.length>0&&v.includes("legends")&&(F.legends=x.jsx(Cr,{width:$e,height:Ge,data:Tn,legends:Ve,toggleSerie:Bn},"legends"));var Gn=Sr({dataWithArc:Z,arcGenerator:De,centerX:te,centerY:ae,radius:wn,innerRadius:En});return x.jsx(Nn,{width:In,height:Sn,margin:Wn,defs:$n,role:jn,children:v.map(function(ie,Dn){return F[ie]!==void 0?F[ie]:typeof ie=="function"?x.jsx(R.Fragment,{children:R.createElement(ie,Gn)},Dn):null})})},wr=function(e){var n=e.isInteractive,r=n===void 0?d.isInteractive:n,t=e.animate,o=t===void 0?d.animate:t,s=e.motionConfig,a=s===void 0?d.motionConfig:s,i=e.theme,u=e.renderWrapper,f=tn(e,Pr);return x.jsx(Fn,{animate:o,isInteractive:r,motionConfig:a,renderWrapper:u,theme:i,children:x.jsx(Tr,E({isInteractive:r},f))})},Er=function(e){return x.jsx(Xn,{children:function(n){var r=n.width,t=n.height;return x.jsx(wr,E({width:r,height:t},e))}})};const ue=({data:e=[],legend:n=!0,linkLabels:r=!0})=>x.jsx(Er,{data:e,margin:{top:40,right:80,bottom:80,left:80},innerRadius:.7,padAngle:.7,cornerRadius:3,activeOuterRadiusOffset:8,borderWidth:1,borderColor:{from:"color",modifiers:[["darker",.2]]},enableArcLinkLabels:r,arcLinkLabelsSkipAngle:10,arcLinkLabelsTextColor:"#333333",arcLinkLabelsThickness:2,arcLinkLabelsColor:{from:"color"},arcLabelsSkipAngle:5,arcLabelsTextColor:{from:"color",modifiers:[["darker",2]]},defs:[{id:"dots",type:"patternDots",background:"inherit",color:"rgba(255, 255, 255, 0.3)",size:4,padding:1,stagger:!0},{id:"lines",type:"patternLines",background:"inherit",color:"rgba(255, 255, 255, 0.3)",rotation:-45,lineWidth:6,spacing:10}],colors:["#c5dcfc","#c2bbf0","#ffb99c","#bee3db","#2991cf"],legends:n?[{anchor:"bottom",direction:"row",justify:!1,translateX:0,translateY:56,itemsSpacing:0,itemWidth:100,itemHeight:18,itemTextColor:"#999",itemDirection:"left-to-right",itemOpacity:1,symbolSize:18,symbolShape:"circle",effects:[{on:"hover",style:{itemTextColor:"#000"}}]}]:[]});try{ue.displayName="PieChart",ue.__docgenInfo={description:"",displayName:"PieChart",props:{data:{defaultValue:{value:"[]"},description:"",name:"data",required:!1,type:{name:"any[]"}},legend:{defaultValue:{value:"true"},description:"",name:"legend",required:!1,type:{name:"boolean"}},linkLabels:{defaultValue:{value:"true"},description:"",name:"linkLabels",required:!1,type:{name:"boolean"}}}}}catch{}const Qr={title:"PieChart",component:ue},le=e=>x.jsxs("div",{style:{height:"500px"},children:[x.jsx(ue,{...e}),";"]}),z=le.bind({});z.args={data:[{id:"slice1",label:"Slice 1",value:30},{id:"slice2",label:"Slice 2",value:40}],legend:!0,linkLabels:!0};const Q=le.bind({});Q.args={data:[{id:"slice1",label:"Slice 1",value:30},{id:"slice2",label:"Slice 2",value:40}],legend:!1,linkLabels:!0};const U=le.bind({});U.args={data:[{id:"slice1",label:"Slice 1",value:30},{id:"slice2",label:"Slice 2",value:40}],legend:!0,linkLabels:!1};const K=le.bind({});K.args={data:[{id:"slice1",label:"Slice 1",value:30},{id:"slice2",label:"Slice 2",value:40}],legend:!0,linkLabels:!0};var Xe,Fe,Ye;z.parameters={...z.parameters,docs:{...(Xe=z.parameters)==null?void 0:Xe.docs,source:{originalSource:`args => <div style={{
  height: '500px'
}}>
    <PieChart {...args} />;
  </div>`,...(Ye=(Fe=z.parameters)==null?void 0:Fe.docs)==null?void 0:Ye.source}}};var qe,Ne,_e;Q.parameters={...Q.parameters,docs:{...(qe=Q.parameters)==null?void 0:qe.docs,source:{originalSource:`args => <div style={{
  height: '500px'
}}>
    <PieChart {...args} />;
  </div>`,...(_e=(Ne=Q.parameters)==null?void 0:Ne.docs)==null?void 0:_e.source}}};var Je,Ze,ze;U.parameters={...U.parameters,docs:{...(Je=U.parameters)==null?void 0:Je.docs,source:{originalSource:`args => <div style={{
  height: '500px'
}}>
    <PieChart {...args} />;
  </div>`,...(ze=(Ze=U.parameters)==null?void 0:Ze.docs)==null?void 0:ze.source}}};var Qe,Ue,Ke;K.parameters={...K.parameters,docs:{...(Qe=K.parameters)==null?void 0:Qe.docs,source:{originalSource:`args => <div style={{
  height: '500px'
}}>
    <PieChart {...args} />;
  </div>`,...(Ke=(Ue=K.parameters)==null?void 0:Ue.docs)==null?void 0:Ke.source}}};const Ur=["BasicPieChart","PieChartWithoutLegend","PieChartWithoutLinkLabels","CustomStyledPieChart"];export{z as BasicPieChart,K as CustomStyledPieChart,Q as PieChartWithoutLegend,U as PieChartWithoutLinkLabels,Ur as __namedExportsOrder,Qr as default};