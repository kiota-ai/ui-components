import{c as z}from"./nivo-colors.es-6a419262.js";import{p as en,c as G,s as j,h as rn,e as g,t as sn,a as K,m as k,b as un,f as t,g as an,i as ln,j as on}from"./viridis-86f79054.js";import{p as tn}from"./line-d3dcc640.js";function fn(l){return l.innerRadius}function cn(l){return l.outerRadius}function gn(l){return l.startAngle}function yn(l){return l.endAngle}function mn(l){return l&&l.padAngle}function pn(l,x,D,q,h,v,B,r){var s=D-l,n=q-x,m=B-h,i=r-v,u=i*s-m*n;if(!(u*u<g))return u=(m*(x-v)-i*(l-h))/u,[l+u*s,x+u*n]}function V(l,x,D,q,h,v,B){var r=l-D,s=x-q,n=(B?v:-v)/K(r*r+s*s),m=n*s,i=-n*r,u=l+m,f=x+i,c=D+m,E=q+i,o=(u+c)/2,I=(f+E)/2,p=c-u,y=E-f,A=p*p+y*y,M=h-v,P=u*E-c*f,O=(y<0?-1:1)*K(on(0,M*M*A-P*P)),S=(P*y-p*O)/A,d=(-P*p-y*O)/A,R=(P*y+p*O)/A,T=(-P*p+y*O)/A,e=S-o,a=d-I,C=R-o,F=T-I;return e*e+a*a>C*C+F*F&&(S=R,d=T),{cx:S,cy:d,x01:-m,y01:-i,x11:S*(h/M-1),y11:d*(h/M-1)}}function vn(){var l=fn,x=cn,D=z(0),q=null,h=gn,v=yn,B=mn,r=null;function s(){var n,m,i=+l.apply(this,arguments),u=+x.apply(this,arguments),f=h.apply(this,arguments)-rn,c=v.apply(this,arguments)-rn,E=un(c-f),o=c>f;if(r||(r=n=tn()),u<i&&(m=u,u=i,i=m),!(u>g))r.moveTo(0,0);else if(E>sn-g)r.moveTo(u*G(f),u*j(f)),r.arc(0,0,u,f,c,!o),i>g&&(r.moveTo(i*G(c),i*j(c)),r.arc(0,0,i,c,f,o));else{var I=f,p=c,y=f,A=c,M=E,P=E,O=B.apply(this,arguments)/2,S=O>g&&(q?+q.apply(this,arguments):K(i*i+u*u)),d=k(un(u-i)/2,+D.apply(this,arguments)),R=d,T=d,e,a;if(S>g){var C=an(S/i*j(O)),F=an(S/u*j(O));(M-=C*2)>g?(C*=o?1:-1,y+=C,A-=C):(M=0,y=A=(f+c)/2),(P-=F*2)>g?(F*=o?1:-1,I+=F,p-=F):(P=0,I=p=(f+c)/2)}var H=u*G(I),J=u*j(I),L=i*G(A),N=i*j(A);if(d>g){var Q=u*G(p),U=u*j(p),W=i*G(y),X=i*j(y),w;if(E<en&&(w=pn(H,J,W,X,Q,U,L,N))){var Y=H-w[0],Z=J-w[1],$=Q-w[0],b=U-w[1],_=1/j(ln((Y*$+Z*b)/(K(Y*Y+Z*Z)*K($*$+b*b)))/2),nn=K(w[0]*w[0]+w[1]*w[1]);R=k(d,(i-nn)/(_-1)),T=k(d,(u-nn)/(_+1))}}P>g?T>g?(e=V(W,X,H,J,u,T,o),a=V(Q,U,L,N,u,T,o),r.moveTo(e.cx+e.x01,e.cy+e.y01),T<d?r.arc(e.cx,e.cy,T,t(e.y01,e.x01),t(a.y01,a.x01),!o):(r.arc(e.cx,e.cy,T,t(e.y01,e.x01),t(e.y11,e.x11),!o),r.arc(0,0,u,t(e.cy+e.y11,e.cx+e.x11),t(a.cy+a.y11,a.cx+a.x11),!o),r.arc(a.cx,a.cy,T,t(a.y11,a.x11),t(a.y01,a.x01),!o))):(r.moveTo(H,J),r.arc(0,0,u,I,p,!o)):r.moveTo(H,J),!(i>g)||!(M>g)?r.lineTo(L,N):R>g?(e=V(L,N,Q,U,i,-R,o),a=V(H,J,W,X,i,-R,o),r.lineTo(e.cx+e.x01,e.cy+e.y01),R<d?r.arc(e.cx,e.cy,R,t(e.y01,e.x01),t(a.y01,a.x01),!o):(r.arc(e.cx,e.cy,R,t(e.y01,e.x01),t(e.y11,e.x11),!o),r.arc(0,0,i,t(e.cy+e.y11,e.cx+e.x11),t(a.cy+a.y11,a.cx+a.x11),o),r.arc(a.cx,a.cy,R,t(a.y11,a.x11),t(a.y01,a.x01),!o))):r.arc(0,0,i,A,y,o)}if(r.closePath(),n)return r=null,n+""||null}return s.centroid=function(){var n=(+l.apply(this,arguments)+ +x.apply(this,arguments))/2,m=(+h.apply(this,arguments)+ +v.apply(this,arguments))/2-en/2;return[G(m)*n,j(m)*n]},s.innerRadius=function(n){return arguments.length?(l=typeof n=="function"?n:z(+n),s):l},s.outerRadius=function(n){return arguments.length?(x=typeof n=="function"?n:z(+n),s):x},s.cornerRadius=function(n){return arguments.length?(D=typeof n=="function"?n:z(+n),s):D},s.padRadius=function(n){return arguments.length?(q=n==null?null:typeof n=="function"?n:z(+n),s):q},s.startAngle=function(n){return arguments.length?(h=typeof n=="function"?n:z(+n),s):h},s.endAngle=function(n){return arguments.length?(v=typeof n=="function"?n:z(+n),s):v},s.padAngle=function(n){return arguments.length?(B=typeof n=="function"?n:z(+n),s):B},s.context=function(n){return arguments.length?(r=n??null,s):r},s}export{vn as M};
