import{m as Wh}from"./rng-BKYMqjzS.js";import{I as Xh,f as qh,g as $h}from"./session-B-zki_M3.js";import{C as xe,a as Mi,h as Yh}from"./palette-DlZOkp1f.js";import{e as Nu,d as nn,R as di,f as jh,h as Kh,i as Zh,D as Jh,j as Bl}from"./client-Ktz2ME4j.js";const _n={tick:1/60,maxFrame:.25,collision:{maxStep:.2,maxSubsteps:96,iterations:4,skin:.01},avatar:{radius:.45,speed:5.6,runSpeed:8.4,accel:26,decel:34,turnRate:14},companion:{radius:.4,speed:5.9,catchupSpeed:8.8,accel:26,decel:34,turnRate:12},facing:{minSpeed:.5,tau:.07},route:{reach:.45,arriveTol:.35,margin:.06,cornerFloor:.4,cornerLook:1.4,stuckTime:.9,stuckGain:.3,pullMargin:.1,pullStep:.35,pullLook:7,blendTime:.35,cornerMargin:.3,cornerPush:1,cornerRing:12,cornerStep:.1,cornerTurn:.2,doorCentreWidth:3.6,doorTol:.25,doorBudget:1.2,doorLead:.7,doorTurn:1,tidyLine:.12,tidySpike:1.9,tidyShort:.8,smooth:{passes:6,arc:1.25,hookTurn:.9,maxTurn:1.15,round:1,legShare:.45,minLeg:.7,outward:[0,.2,.4,.6],minGain:.1,lenSlack:.02,clearSlack:.02},look:.9,lookSpeed:.22,lookMax:2.2,passRadius:1},follow:{distance:3.4,lateral:1.6,start:5.2,stop:3.6,catchup:10,doorClear:2.2,doorWidth:3.6,wallClear:.3,reslot:.5,blinkDistance:42,lead:.9,replanDist:1.8,reslotMax:1.4,farScale:12,searchStep:150,searchMax:12e3,retry:1.5,slotBudget:260},patrol:{dwell:1.2,maxWaypoints:12},react:{dwell:1.5,face:1.2,giveUp:14},separation:{gap:.15,push:4.5},recovery:{window:5},triggers:{maxRules:32,maxFiresPerTick:4,repeat:2,maxSignals:32},noise:{run:9,runEvery:.6},events:{max:512}},er=(i,t,e)=>i<t?t:i>e?e:i;function or(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const o=i[s][0],a=i[s][1],l=i[r][0],c=i[r][1];a>e!=c>e&&t<(l-o)*(e-a)/(c-a)+o&&(n=!n)}return n}const Ys=(i,t,e,n,s,r)=>(e-i)*(r-t)-(n-t)*(s-i);function ws(i,t){let e=(t-i)%(Math.PI*2);return e>Math.PI?e-=Math.PI*2:e<=-Math.PI&&(e+=Math.PI*2),e}function Qh(i,t,e){const n=ws(i,t);return Math.abs(n)<=e?t:i+Math.sign(n)*e}function vo(i,t,e,n,s,r){const o=s-e,a=r-n,l=o*o+a*a,c=l>0?er(((i-e)*o+(t-n)*a)/l,0,1):0;return Math.hypot(i-(e+c*o),t-(n+c*a))}const tf=_n;class Gl{constructor(t,e,n){this.id=t,this.x=n.x,this.z=n.z,this.heading=0,this.vx=0,this.vz=0,this.speed=0,this.radius=e.radius,this.cell=n.cell,this.moving=!1,this.controlled=!1,this.touching=!1,this.sliver=!1,this.px=n.x,this.pz=n.z,this.pheading=0,this.spec=e,this.accel=e.accel,this.decel=e.decel,this.world=null,this._route=null,this._want={x:0,z:0},this._blocked=0,this._blockedFired=!1,this._aim=null,this._face=null}step(t,e,n,s,r){const o=s-this.vx,a=r-this.vz,l=Math.hypot(o,a),c=Math.hypot(s,r),u=Math.hypot(this.vx,this.vz),p=(c>=u-1e-6?this.accel:this.decel)*n;l<=p?(this.vx=s,this.vz=r):(this.vx+=o/l*p,this.vz+=a/l*p),this._want.x=s,this._want.z=r;const{maxStep:d,maxSubsteps:f}=tf.collision,g=Math.hypot(this.vx,this.vz)*n,x=Math.min(f,Math.max(1,Math.ceil(g/Math.min(d,this.radius*.4)))),m=n/x,h={x:0,z:0},b=[];let S=!1,v=0;e.substeps+=x;for(let E=0;E<x;E++){const w=this.x,M=this.z,_=t.cell(this.cell);if(!_){this.vx=0,this.vz=0;break}h.x=w+this.vx*m,h.z=M+this.vz*m,b.length=0;const T=t.resolve(h,this.radius,t.near(_),b),D=t.locate(h.x,h.z,this.cell);if(!D||t.blocked(D,h.x,h.z)){e.violations++,this.vx=0,this.vz=0,S=!0;continue}if(this.x=h.x,this.z=h.z,this.sliver=D.solid,D.solid||(this.cell=D.id),T){S=!0,e.contacts++;for(let k=0;k<b.length;k+=2){const V=this.vx*b[k]+this.vz*b[k+1];V<0&&(this.vx-=V*b[k],this.vz-=V*b[k+1])}}v+=Math.hypot(this.x-w,this.z-M)}this.touching=S,this.speed=Math.hypot(this.vx,this.vz),this.moving=this.speed>.15;const A=Math.hypot(s,r),y=n>0?v/n:0;A>1&&y<A*.3?this._blocked+=n:(this._blocked=0,this._blockedFired=!1)}face(t,e,n=0){const s=this.spec.turnRate*t;if(!(n>0)){this.heading=Qh(this.heading,e,s);return}const r=ws(this.heading,e),o=Math.min(s,Math.abs(r)*(1-Math.exp(-t/n)));this.heading+=Math.sign(r)*o}teleport(t){this.x=t.x,this.z=t.z,this.cell=t.cell,this.px=t.x,this.pz=t.z,this.pheading=this.heading,this.vx=this.vz=this.speed=0,this.moving=!1,this._route=null}pub(){return{id:this.id,x:this.x,z:this.z,heading:this.heading,vx:this.vx,vz:this.vz,speed:this.speed,radius:this.radius,cell:this.cell,moving:this.moving,controlled:this.controlled,touching:this.touching,sliver:this.sliver,prev:{x:this.px,z:this.pz,heading:this.pheading}}}}const _o=.03,ef=.6,Hl=1.2,nf=2;class sf{constructor(t){this.nav=t,this.infos=new Map,this.nears=new Map,this.solids=new Map,this.doorLists=new Map,this.doorNears=new Map,this.usables=new Map}cell(t){const e=this.nav;return(e.cell?e.cell(t):e.cells[t])??null}live(t){return this.cell(t)!==null}purge(){var t;for(const e of[this.infos,this.nears,this.solids,this.doorLists,this.doorNears,this.usables])(t=e==null?void 0:e.clear)==null||t.call(e)}gateLocked(t){var n,s;const e=this.nav;return e.gateLocked?!!e.gateLocked(t):!!((s=(n=e.gates)==null?void 0:n[t])!=null&&s.locked)}locate(t,e,n){if(n!=null){const s=this.cell(n);if(s&&or(s.poly,t,e))return s;if(s)for(const r of s.neighbors){const o=this.cell(r.id);if(o&&or(o.poly,t,e))return o}}return this.nav.cellAt(t,e)??null}blocked(t,e,n){return t.solid?t.cut?or(t.cut.poly,e,n):!0:!1}solidWalls(t){let e=this.solids.get(t.id);if(e)return e;const n=t.cut?t.cut.poly:t.poly,s=n.length;let r=0;for(let u=0;u<s;u++){const p=n[u],d=n[(u+1)%s];r+=p[0]*d[1]-d[0]*p[1]}const o=r>=0?1:-1,a=[];let l=!1;for(const u of t.neighbors){const p=this.cell(u.id);p?p.solid&&a.push(p.poly):l=!0}const c=(u,p)=>{for(const d of a)for(let f=0;f<d.length;f++){const g=d[f],x=d[(f+1)%d.length];if(vo(u,p,g[0],g[1],x[0],x[1])<_o)return!0}return!1};e=[];for(let u=0;u<s;u++){const p=n[u],d=n[(u+1)%s],f=d[0]-p[0],g=d[1]-p[1],x=Math.hypot(f,g);x<1e-6||c((p[0]+d[0])/2,(p[1]+d[1])/2)||e.push({ax:p[0],az:p[1],bx:d[0],bz:d[1],nx:o*g/x,nz:-o*f/x,gate:void 0})}return l||this.solids.set(t.id,e),e}info(t){let e=this.infos.get(t.id);if(e)return e;const n=t.poly,s=n.length,r=[];for(let d=0;d<s;d++){const f=n[d],g=n[(d+1)%s],x=g[0]-f[0],m=g[1]-f[1],h=Math.hypot(x,m);if(h<1e-6)continue;let b=-m/h,S=x/h;(t.cx-f[0])*b+(t.cz-f[1])*S<0&&(b=-b,S=-S),r.push({ax:f[0],az:f[1],bx:g[0],bz:g[1],dx:x/h,dz:m/h,L:h,nx:b,nz:S,open:!1,gate:null})}const o=new Array(t.neighbors.length).fill(null),a=[],l=(d,f)=>{let g=null,x=1/0;for(const m of r){const h=(d[0]-m.ax)*m.dx+(d[1]-m.az)*m.dz;if(h<-f||h>m.L+f)continue;const b=Math.abs((d[0]-m.ax)*-m.dz+(d[1]-m.az)*m.dx);b<x&&(x=b,g={e:m,t:h})}return g&&x<=f?g:null};let c=!1;t.neighbors.forEach((d,f)=>{const g=this.cell(d.id);if(!g){c=!0;return}if(g.solid){const x=l(d.mid,_o);x&&(x.e.solidBacked=!0);return}if(d.gate===void 0){const x=l(d.mid,_o);if(!x){a.push(f);return}x.e.open=!0;const m=x.e;o[f]={x0:m.ax,z0:m.az,x1:m.bx,z1:m.bz,w:m.L,gate:void 0}}else{const x=l(d.mid,ef);if(!x){a.push(f);return}const m=x.e,h=(d.len??2.4)/2,b=Math.max(0,x.t-h),S=Math.min(m.L,x.t+h);(m.gate??(m.gate=[])).push({k:f,t0:b,t1:S,id:d.gate}),o[f]={x0:m.ax+m.dx*b,z0:m.az+m.dz*b,x1:m.ax+m.dx*S,z1:m.az+m.dz*S,w:Math.max(0,S-b),gate:d.gate,merged:!1}}});const u=[],p=(d,f,g,x)=>{g-f<1e-4||u.push({ax:d.ax+d.dx*f,az:d.az+d.dz*f,bx:d.ax+d.dx*g,bz:d.az+d.dz*g,nx:d.nx,nz:d.nz,gate:x})};for(const d of r)if(!(d.open||d.solidBacked))if(d.gate){const f=d.gate.slice().sort((x,m)=>x.t0-m.t0);let g=0;for(const x of f)p(d,g,x.t0,void 0),p(d,x.t0,x.t1,x.id),g=Math.max(g,x.t1);p(d,g,d.L,void 0)}else p(d,0,d.L,void 0);return e={walls:u,portals:o,unmatched:a,edges:r},c||this.infos.set(t.id,e),e}portal(t,e){const n=this.info(t).portals[e];if(!n)return null;if(n.gate!==void 0&&!n.merged){n.merged=!0;const s=t.neighbors[e],r=this.cell(s.id);if(!r)return null;const o=this.info(r),a=r.neighbors.findIndex(v=>v.gate===s.gate&&v.id===t.id),l=a>=0?o.portals[a]:null;if(!l)return n.w=0,n;const c=n.x1-n.x0,u=n.z1-n.z0,p=Math.hypot(c,u)||1,d=c/p,f=u/p,g=(l.x0-n.x0)*d+(l.z0-n.z0)*f,x=(l.x1-n.x0)*d+(l.z1-n.z0)*f,m=Math.max(0,Math.min(g,x)),h=Math.min(p,Math.max(g,x)),b=n.x0,S=n.z0;n.x0=b+d*m,n.z0=S+f*m,n.x1=b+d*Math.max(m,h),n.z1=S+f*Math.max(m,h),n.w=Math.max(0,h-m)}return n}near(t){let e=this.nears.get(t.id);if(e)return e;const n=new Set([t.id]),s=[t];let r=[t],o=!1;for(let a=0;a<nf;a++){const l=[];for(const c of r)for(const u of c.neighbors){if(n.has(u.id))continue;n.add(u.id);const p=this.cell(u.id);if(!p){o=!0;continue}s.push(p),l.push(p)}r=l}e=[];for(const a of s)for(const l of a.solid?this.solidWalls(a):this.info(a).walls)e.push(l);return o||this.nears.set(t.id,e),e}resolve(t,e,n,s){const{iterations:r,skin:o}=_n.collision,a=e+o;let l=0;for(let c=0;c<r;c++){let u=!1;for(const p of n){if(p.gate!==void 0&&!this.gateLocked(p.gate))continue;const d=p.bx-p.ax,f=p.bz-p.az,g=d*d+f*f,x=g>0?Math.min(1,Math.max(0,((t.x-p.ax)*d+(t.z-p.az)*f)/g)):0,m=p.ax+x*d,h=p.az+x*f,b=t.x-m,S=t.z-h,v=b*b+S*S,A=(t.x-p.ax)*p.nx+(t.z-p.az)*p.nz;if(v>=a*a||A<0&&x>0&&x<1)continue;const y=Math.sqrt(v);let E,w,M;y>1e-9?(E=b/y,w=S/y,M=a-y):(E=p.nx,w=p.nz,M=a),t.x+=E*M,t.z+=w*M,u=!0,l++,s&&s.push(E,w)}if(!u)break}return l}wallDist(t,e,n,s=!1){let r=1/0;for(const o of this.near(n)){if(o.gate!==void 0&&(s||!this.gateLocked(o.gate)))continue;const a=vo(t,e,o.ax,o.az,o.bx,o.bz);a<r&&(r=a)}return r}openNear(t,e,n){let s=null,r=1/0;for(const o of t.neighbors){const a=this.cell(o.id);if(!a||a.solid)continue;let l=or(a.poly,e,n)?0:1/0;if(l!==0)for(let c=0;c<a.poly.length;c++){const u=a.poly[c],p=a.poly[(c+1)%a.poly.length];l=Math.min(l,vo(e,n,u[0],u[1],p[0],p[1]))}(l<r-1e-9||Math.abs(l-r)<=1e-9&&s&&a.id<s.id)&&(r=l,s=a)}return s}walkClear(t,e,n,s,r,o,a=!1){const l=r+_n.route.pullMargin,c=r-.005,u=Math.hypot(n-t,s-e),p=Math.max(1,Math.ceil(u/_n.route.pullStep));let d=o;for(let f=0;f<=p;f++){const g=f/p,x=t+(n-t)*g,m=e+(s-e)*g,h=this.locate(x,m,d);if(!h||this.blocked(h,x,m))return!1;d=h.id;const b=g*u<.6||(1-g)*u<.6;if(this.wallDist(x,m,h,a)<(b?c:l))return!1}return!0}settle(t,e,n,s=0){const r=[[0,0]];for(const o of[.6,1.2,2,3,4.5])for(let a=0;a<8;a++){const l=a/8*Math.PI*2+o;r.push([Math.cos(l)*o,Math.sin(l)*o])}for(const[o,a]of r){const l={x:t+o,z:e+a};let c=this.locate(l.x,l.z);if(!(!c||c.solid)&&(this.resolve(l,n+s,this.near(c),null),c=this.locate(l.x,l.z,c.id),!(!c||c.solid)&&this.wallDist(l.x,l.z,c)>=n-.02))return{x:l.x,z:l.z,cell:c.id}}return null}usable(t,e,n){const s=e+"@"+n;let r=this.usables.get(t.id);if(r||this.usables.set(t.id,r=new Map),r.has(s))return r.get(s);let o=null;const a=this.portal(t,e);if(a&&a.w>0){const l=n+_n.route.margin,c=Math.max(4,Math.min(40,Math.ceil(a.w/.15))),u=a.x1-a.x0,p=a.z1-a.z0;let d=null,f=null;for(let g=0;g<=c;g++){const x=g/c,m=a.x0+u*x,h=a.z0+p*x;this.wallDist(m,h,t,!0)>=l?(f?f.e=g:f={s:g,e:g},(!d||f.e-f.s>d.e-d.s)&&(d=f)):f=null}d&&(o={x0:a.x0+u*d.s/c,z0:a.z0+p*d.s/c,x1:a.x0+u*d.e/c,z1:a.z0+p*d.e/c,w:Math.hypot(u,p)*(d.e-d.s)/c,gate:a.gate})}return r.set(s,o),o}passable(t,e,n){return!!this.usable(t,e,n)}doorsOf(t){let e=this.doorLists.get(t.id);if(e)return e;if(e=[],t.solid)return this.doorLists.set(t.id,e),e;const n=this.info(t),s=(r,o)=>this.wallDist(r,o,t,!0)<Hl;return t.neighbors.forEach((r,o)=>{const a=n.portals[o];if(!a)return;const l=(a.x0+a.x1)/2,c=(a.z0+a.z1)/2;a.gate!==void 0?e.push({x:r.mid[0],z:r.mid[1]}):a.w<_n.follow.doorWidth&&s(a.x0,a.z0)&&s(a.x1,a.z1)&&e.push({x:l,z:c})}),t.neighbors.every(r=>this.cell(r.id))&&this.doorLists.set(t.id,e),e}isDoor(t,e){const n=this.info(t).portals[e];if(!n)return!1;if(n.gate!==void 0)return!0;if(n.w>=_n.route.doorCentreWidth)return!1;const s=(r,o)=>this.wallDist(r,o,t,!0)<Hl;return s(n.x0,n.z0)&&s(n.x1,n.z1)}doorsNear(t){let e=this.doorNears.get(t.id);if(e)return e;e=this.doorsOf(t).slice();for(const n of t.neighbors){const s=this.cell(n.id);if(s&&!s.solid)for(const r of this.doorsOf(s))e.push(r)}return t.neighbors.every(n=>this.cell(n.id))&&this.doorNears.set(t.id,e),e}inDoorway(t,e,n,s){for(const r of this.doorsNear(n))if(Math.hypot(r.x-t,r.z-e)<s)return!0;return!1}}const Vl=new WeakMap;function rf(i){let t=Vl.get(i);return t||(t=new sf(i),Vl.set(i,t)),t}class of{constructor(t,e,n,{passable:s=null}={}){if(this.get=t.cell?o=>t.cell(o):o=>t.cells[o],this.locked=t.gateLocked?o=>!!t.gateLocked(o):o=>{var a,l;return!!((l=(a=t.gates)==null?void 0:a[o])!=null&&l.locked)},this.passable=s,this.fromId=e,this.toId=n,this.goal=this.get(n),this.expanded=0,this.state="running",this.res=null,this.g=new Map([[e,0]]),this.prev=new Map,this.closed=new Set,this.heap=[],this.bestId=e,this.bestH=1/0,!this.goal||this.goal.solid){this.state="fail";return}if(e===n){this.state="done",this.res={cells:[e],length:0};return}const r=this.get(e);if(!r){this.state="fail";return}this._push([this._h(r),e])}_h(t){return Math.hypot(t.cx-this.goal.cx,t.cz-this.goal.cz)}_less(t,e){return t[0]<e[0]||t[0]===e[0]&&t[1]<e[1]}_push(t){const e=this.heap;e.push(t);let n=e.length-1;for(;n>0;){const s=n-1>>1;if(!this._less(e[n],e[s]))break;[e[n],e[s]]=[e[s],e[n]],n=s}}_pop(){const t=this.heap,e=t[0],n=t.pop();if(t.length){t[0]=n;let s=0;for(;;){const r=2*s+1,o=r+1;let a=s;if(r<t.length&&this._less(t[r],t[a])&&(a=r),o<t.length&&this._less(t[o],t[a])&&(a=o),a===s)break;[t[s],t[a]]=[t[a],t[s]],s=a}}return e}_chain(t){const e=[];for(let n=t;n!==void 0;n=this.prev.get(n))e.push(n);return e.reverse(),{cells:e,length:this.g.get(t)}}step(t=1/0){if(this.state!=="running")return this.state;const{g:e,prev:n,closed:s,heap:r,get:o,locked:a,passable:l}=this;let c=t;for(;r.length&&c>0;){const[,u]=this._pop();if(s.has(u))continue;if(u===this.toId)return this.state=!e.has(u)||!n.has(u)?"fail":"done",this.state==="done"&&(this.res=this._chain(u)),this.state;s.add(u),this.expanded++,c--;const p=o(u);if(!p)continue;const d=this._h(p);d<this.bestH&&(this.bestH=d,this.bestId=u);for(let f=0;f<p.neighbors.length;f++){const g=p.neighbors[f];if(s.has(g.id)||g.gate!==void 0&&a(g.gate))continue;const x=o(g.id);if(!x||x.solid||l&&!l(p,f,x))continue;const m=Math.hypot(p.cx-g.mid[0],p.cz-g.mid[1])+Math.hypot(g.mid[0]-x.cx,g.mid[1]-x.cz),h=e.get(u)+m;h<(e.get(g.id)??1/0)&&(e.set(g.id,h),n.set(g.id,u),this._push([h+this._h(x),g.id]))}}return r.length||(this.state="fail"),this.state}result(){return this.res}partial(){return this.bestId===this.fromId?null:this._chain(this.bestId)}}function af(i,t,{look:e=6}={}){if(i.length<=2)return i.slice();const n=[i[0]];let s=0;for(;s<i.length-1;){let r=Math.min(i.length-1,s+e);for(;r>s+1&&!t(i[s],i[r]);)r--;n.push(i[r]),s=r}return n}const je=_n;function lf(i,t,e){const n=t.concat([{lx:e.x,lz:e.z,rx:e.x,rz:e.z}]),s=[];let r=i.x,o=i.z,a=r,l=o,c=r,u=o,p=0,d=0,f=n.length*4+16;for(let h=0;h<n.length&&f-- >0;h++){const b=n[h];if(Ys(r,o,c,u,b.rx,b.rz)>=0)if(r===c&&o===u||Ys(r,o,a,l,b.rx,b.rz)<0)c=b.rx,u=b.rz,d=h;else{s.push({x:a,z:l}),r=a,o=l;const S=p;a=c=r,l=u=o,p=d=S,h=S;continue}if(Ys(r,o,a,l,b.lx,b.lz)<=0)if(r===a&&o===l||Ys(r,o,c,u,b.lx,b.lz)>0)a=b.lx,l=b.lz,p=h;else{s.push({x:c,z:u}),r=c,o=u;const S=d;a=c=r,l=u=o,p=d=S,h=S;continue}}s.push({x:e.x,z:e.z});const g=[];let x=i.x,m=i.z;for(const h of s)Math.hypot(h.x-x,h.z-m)<1e-6||(g.push(h),x=h.x,m=h.z);return g.length||g.push({x:e.x,z:e.z}),g}function ha(i,t,e,n){const s=i.locate(e.x,e.z);if(!s)return{ok:!1,reason:"outside"};if(s.solid)return{ok:!1,reason:"solid"};const r=i.settle(e.x,e.z,n);if(!r)return{ok:!1,reason:"cramped"};let o=i.locate(t.x,t.z,t.cell)??i.cell(t.cell);if(!o)return{ok:!1,reason:"unloaded"};if(o.solid&&(o=i.openNear(o,t.x,t.z)),!o)return{ok:!1,reason:"unreachable"};const a=new of(i.nav,o.id,r.cell,{passable:(l,c)=>i.passable(l,c,n)});return{ok:!0,search:a,goal:r,finish:(l=a.result())=>{if(!l)return{ok:!1,reason:"unreachable"};let c=r;if(l.cells[l.cells.length-1]!==r.cell){const u=i.cell(l.cells[l.cells.length-1]);if(c=u&&i.settle(u.cx,u.cz,n),!c)return{ok:!1,reason:"unreachable"}}return cf(i,t,c,o,l,n)}}}function Pn(i,t,e,n,{maxExpand:s=1/0}={}){const r=ha(i,t,e,n);return r.ok?r.search.step(s)==="done"?r.finish():{ok:!1,reason:"unreachable"}:r}function cf(i,t,e,n,s,r){var S;const o=je.route,a=[],l=[];for(let v=0;v+1<s.cells.length;v++){const A=i.cell(s.cells[v]);if(!A)return{ok:!1,reason:"unloaded"};let y=null,E=!1;if(A.neighbors.forEach((k,V)=>{if(k.id!==s.cells[v+1])return;const X=i.usable(A,V,r);X&&(!y||X.w>y.w)&&(y=X,E=i.isDoor(A,V))}),!y)return{ok:!1,reason:"unloaded"};const w={x:y.x0,z:y.z0},M={x:y.x1,z:y.z1},_=(y.x0+y.x1)/2,T=(y.z0+y.z1)/2,D=Ys(A.cx,A.cz,_,T,w.x,w.z);if(a.push(D>=0?{lx:w.x,lz:w.z,rx:M.x,rz:M.z}:{lx:M.x,lz:M.z,rx:w.x,rz:w.z}),E){const k=y.gate!==void 0?((S=i.nav.gates)==null?void 0:S[y.gate])??null:null;l.push({x0:y.x0,z0:y.z0,x1:y.x1,z1:y.z1,w:y.w,n:(k==null?void 0:k.normal)??null})}}const c=lf(t,a,e),u=[{x:t.x,z:t.z},...c],p=(v,A)=>i.walkClear(v.x,v.z,A.x,A.z,r,n.id),d=af(u,p,{look:o.pullLook});let f=0;for(let v=1;v<u.length;v++)f+=Math.hypot(u[v].x-u[v-1].x,u[v].z-u[v-1].z);hf(i,d,l,r,p),pf(i,d,r,p),df(d,p),uf(i,d,l,r,p);const g=d.slice(1).map(v=>({x:v.x,z:v.z})),x=d.slice(1).map(v=>jr());let m=0,h=t.x,b=t.z;for(const v of g)m+=Math.hypot(v.x-h,v.z-b),h=v.x,b=v.z;return{ok:!0,pts:g,fixed:x,cells:s.cells,goal:e,length:m,tautLength:f,rawLength:s.length}}function jr(i,t){return!1}function yo(i){const t=new Array(i.length).fill(0);for(let e=1;e+1<i.length;e++){const n=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z),s=Math.hypot(i[e+1].x-i[e].x,i[e+1].z-i[e].z);n<1e-9||s<1e-9||(t[e]=Math.abs(ws(Math.atan2(i[e].x-i[e-1].x,i[e].z-i[e-1].z),Math.atan2(i[e+1].x-i[e].x,i[e+1].z-i[e].z))))}return t}const Wl=i=>{let t=0;for(let e=1;e<i.length;e++)t+=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z);return t};function Xl(i,t){let e=1/0;for(let n=0;n<t.length;n++){const s=n===0?0:Math.max(1,Math.ceil(Math.hypot(t[n].x-t[n-1].x,t[n].z-t[n-1].z)/.3));for(let r=n===0?0:1;r<=s;r++){const o=s?r/s:0,a=n===0?t[0].x:t[n-1].x+(t[n].x-t[n-1].x)*o,l=n===0?t[0].z:t[n-1].z+(t[n].z-t[n-1].z)*o,c=i.locate(a,l);if(!c||c.solid)return 0;e=Math.min(e,i.wallDist(a,l,c))}}return e}function uf(i,t,e,n,s){const r=je.route.smooth;if(t.length<3)return;const o=n+je.route.cornerMargin,a=(x,m)=>{const h=[];for(let b=1;b<m.length;b++){const S=Fu(m[b-1],m[b],x.x0,x.z0,x.x1,x.z1);S>=0&&!h.some(v=>Math.abs(v-S)*x.w<.05)&&h.push(S)}return h},l=je.route.cornerMargin*.8+n,c=t.map(x=>({x:x.x,z:x.z})),u=x=>{for(const m of e){const h=a(m,c),b=a(m,x);if(h.length!==b.length)return!1;if(!h.length)continue;const S=Math.min(...h.map(v=>Math.abs(v-.5)*m.w));for(const v of b){const A=Math.abs(v-.5)*m.w;if(S<=je.route.doorTol+.05){if(A<=je.route.doorTol+.05)continue;return!1}if(A<=S+.02)continue;const y=m.x0+(m.x1-m.x0)*v,E=m.z0+(m.z1-m.z0)*v,w=i.locate(y,E);if(!w||i.wallDist(y,E,w)<l)return!1}}return!0},p=(x,m,h)=>{const b=t[x-1],S=t[x+m];for(let G=x;G<x+m;G++)if(jr(t[G]))return!1;const v=t.slice(x-1,x+m+1),A=[b,...h,S];if(Wl(A)>Wl(v)+r.lenSlack)return!1;for(let G=1;G<A.length;G++)if(!s(A[G-1],A[G]))return!1;if(!u([...t.slice(0,x),...h,...t.slice(x+m)]))return!1;const y=Math.max(0,x-2),E=Math.min(t.length,x+m+2),w=yo(t.slice(y,E)),M=yo([...t.slice(y,x),...h,...t.slice(x+m,E)]);let _=0,T=0;for(let G=0;G<m;G++)_=Math.max(_,w[x-y+G]);for(let G=0;G<h.length;G++)T=Math.max(T,M[x-y+G]);const D=_-r.minGain;if(T>D)return!1;const k=x-1-y,V=x+m-y,X=x+h.length-y;return k>=0&&M[k]>Math.max(w[k],D)||M[X]>Math.max(w[V]??0,D)||Xl(i,A)<Math.min(o,Xl(i,v))-r.clearSlack?!1:(t.splice(x,m,...h),!0)},d=x=>{const m=t[x-1],h=t[x],b=t[x+1],S=Math.hypot(h.x-m.x,h.z-m.z),v=Math.hypot(b.x-h.x,b.z-h.z),A=(h.x-m.x)/S,y=(h.z-m.z)/S,E=(b.x-h.x)/v,w=(b.z-h.z)/v,M=Math.min(r.round,r.legShare*S,S-r.minLeg),_=Math.min(r.round,r.legShare*v,v-r.minLeg);let T=A-E,D=y-w;const k=Math.hypot(T,D)||1;T/=k,D/=k;for(const V of[1,.7,.5]){const X=M*V,G=_*V;if(!(X<.15||G<.15))for(const H of r.outward){const B={x:h.x-A*X+T*H,z:h.z-y*X+D*H},tt={x:h.x+E*G+T*H,z:h.z+w*G+D*H};if(!(Math.hypot(tt.x-B.x,tt.z-B.z)<r.minLeg)&&p(x,1,[B,tt]))return!0}}return!1};let f=8*t.length+16,g=!1;for(let x=0;x<r.passes;x++){let m=!1;for(let h=1;h+1<t.length&&f>0;h++){f--;const b=t[h-1],S=t[h],v=t[h+1];if(jr())continue;const A=Math.hypot(S.x-b.x,S.z-b.z),y=Math.hypot(v.x-S.x,v.z-S.z);if(A<1e-9||y<1e-9)continue;const E=yo([b,S,v])[1];let w=!1;if(E>r.hookTurn&&Math.min(A,y)<r.arc){if(w=p(h,1,[]),!w&&y<r.arc&&h+2<t.length){const M=t[h+1];w=p(h,2,[])||p(h,2,[{x:(S.x+M.x)/2,z:(S.z+M.z)/2}])}if(!w&&A<r.arc&&h>=2){const M=t[h-1];w=p(h-1,2,[])||p(h-1,2,[{x:(S.x+M.x)/2,z:(S.z+M.z)/2}])}}!w&&E>r.maxTurn&&(w=d(h)),w&&(m=!0,h=Math.max(0,h-3))}if(!m||(g=!0,f<=0))break}if(g)for(let x=1;x+1<t.length;x++){const m=t[x-1],h=t[x],b=t[x+1],S=b.x-m.x,v=b.z-m.z,A=S*S+v*v;if(A<1e-12||jr())continue;const y=er(((h.x-m.x)*S+(h.z-m.z)*v)/A,0,1);Math.hypot(h.x-(m.x+y*S),h.z-(m.z+y*v))>je.route.tidyLine||!s(m,b)||u([...t.slice(0,x),...t.slice(x+1)])&&(t.splice(x,1),x--)}}function Fu(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=s-e,c=r-n,u=o*c-a*l;if(Math.abs(u)<1e-9)return-1;const p=((e-i.x)*c-(n-i.z)*l)/u,d=((e-i.x)*a-(n-i.z)*o)/u;return p>=0&&p<=1&&d>=0&&d<=1?d:-1}function hf(i,t,e,n,s){const r=je.route;for(const o of e)for(let a=0;a+1<t.length;a++){const l=t[a],c=t[a+1],u=Fu(l,c,o.x0,o.z0,o.x1,o.z1);if(u<0)continue;const p=(o.x0+o.x1)/2,d=(o.z0+o.z1)/2;if(Math.abs(u-.5)*o.w<r.doorTol||ff(i,l,c,o.x0+(o.x1-o.x0)*u,o.z0+(o.z1-o.z0)*u,n+r.cornerMargin,r.doorLead))break;let f=-(o.z1-o.z0),g=o.x1-o.x0;o.n&&(f=o.n[0],g=o.n[1]);const x=Math.hypot(f,g)||1;f/=x,g/=x,f*(c.x-l.x)+g*(c.z-l.z)<0&&(f=-f,g=-g);const m=n+r.cornerMargin,h=Math.min(.5,m/Math.max(o.w,1e-6)),b=Math.max(h,Math.min(1-h,u)),S=[{x:p,z:d}];Math.abs(b-u)<1e-9&&Math.abs(u-.5)*o.w>=r.doorTol?S.push({x:o.x0+(o.x1-o.x0)*u,z:o.z0+(o.z1-o.z0)*u}):Math.abs(b-.5)>1e-9&&S.push({x:o.x0+(o.x1-o.x0)*b,z:o.z0+(o.z1-o.z0)*b});const v=[];for(const A of S)for(const y of[r.doorLead,r.doorLead*.5,0]){const E={x:A.x,z:A.z,pin:!0};v.push(y>0?[{x:A.x-f*y,z:A.z-g*y,pin:!0},E,{x:A.x+f*y,z:A.z+g*y,pin:!0}]:[E])}for(const A of v){let y=!0,E=l,w=-Math.hypot(c.x-l.x,c.z-l.z),M=null;for(const _ of[...A,c]){if(!s(E,_)){y=!1;break}w+=Math.hypot(_.x-E.x,_.z-E.z);const T=Math.atan2(_.x-E.x,_.z-E.z);if(A.length>1&&M!==null&&Math.abs(ws(M,T))>r.doorTurn){y=!1;break}M=T,E=_}if(y&&w<=r.doorBudget){t.splice(a+1,0,...A);break}}break}}function ff(i,t,e,n,s,r,o){const a=e.x-t.x,l=e.z-t.z,c=Math.hypot(a,l);if(c<1e-6)return!0;const u=a/c,p=l/c,d=(n-t.x)*u+(s-t.z)*p;for(let f=Math.max(0,d-o);f<=Math.min(c,d+o)+1e-9;f+=.25){const g=t.x+u*f,x=t.z+p*f,m=i.locate(g,x);if(m&&i.wallDist(g,x,m)<r)return!1}return!0}function df(i,t){const e=je.route;let n=!0;for(let s=0;n&&s<4;s++){n=!1;for(let r=1;r+1<i.length;r++){const o=i[r-1],a=i[r],l=i[r+1],c=l.x-o.x,u=l.z-o.z,p=c*c+u*u,d=Math.hypot(a.x-o.x,a.z-o.z),f=Math.hypot(l.x-a.x,l.z-a.z);let g=!1;if(p<1e-12)g=!0;else{const x=er(((a.x-o.x)*c+(a.z-o.z)*u)/p,0,1);(Math.hypot(a.x-(o.x+x*c),a.z-(o.z+x*u))<=e.tidyLine||Math.min(d,f)<e.tidyShort&&Math.abs(ws(Math.atan2(a.x-o.x,a.z-o.z),Math.atan2(l.x-a.x,l.z-a.z)))>e.tidySpike)&&(g=!0)}g&&(p<1e-12||t(o,l))&&(i.splice(r,1),r--,n=!0)}}}function pf(i,t,e,n){const s=je.route,r=e+s.cornerMargin,o=Math.cos(s.cornerTurn);for(let a=1;a+1<t.length;a++){const l=t[a-1],c=t[a],u=t[a+1];if(c.pin)continue;const p=Math.hypot(c.x-l.x,c.z-l.z),d=Math.hypot(u.x-c.x,u.z-c.z);if(p<1e-6||d<1e-6)continue;const f=(c.x-l.x)/p,g=(c.z-l.z)/p,x=(u.x-c.x)/d,m=(u.z-c.z)/d;if(f*x+g*m>o)continue;const h=i.locate(c.x,c.z);if(!h)continue;const b=i.wallDist(c.x,c.z,h);if(b>=r)continue;let S=f-x,v=g-m;const A=Math.hypot(S,v),y=[];A>1e-6&&y.push([S/A,v/A]);for(let _=0;_<s.cornerRing;_++){const T=_/s.cornerRing*Math.PI*2;y.push([Math.cos(T),Math.sin(T)])}const E=p+d;let w=null,M=b;for(let _=s.cornerStep;_<=s.cornerPush+1e-9&&!(w&&M>=r);_+=s.cornerStep){let T=null,D=1/0,k=0;for(const[V,X]of y){const G={x:c.x+V*_,z:c.z+X*_},H=i.locate(G.x,G.z,h.id);if(!H||H.solid||i.blocked(H,G.x,G.z))continue;const B=i.wallDist(G.x,G.z,H);if(B<=M+1e-6)continue;const tt=Math.hypot(G.x-l.x,G.z-l.z)+Math.hypot(u.x-G.x,u.z-G.z)-E,ut=B>=r;T&&(T.meets&&!ut||T.meets===ut&&(ut?tt>=D:B<=k))||!n(l,G)||!n(G,u)||(T={q:G,meets:ut},D=tt,k=B)}T&&(w=T.q,M=k)}w&&(t[a]=w)}}function ci(i,t=null){const e={pts:i.pts,i:0,goal:i.goal,bestRem:1/0,stuck:0,age:0,blend:null,p0:t?{x:t.x,z:t.z}:null};return t&&t.speed>.5&&(e.blend={vx:t.vx,vz:t.vz}),e}function no(i,t,e,n,{arrive:s=!0,cap:r=1/0,chase:o=null}={}){const{reach:a,arriveTol:l,cornerFloor:c,cornerLook:u,stuckTime:p,stuckGain:d}=je.route,f=t.pts;for(t.age+=n;t.i<f.length;){const _=f[t.i],T=Math.hypot(_.x-i.x,_.z-i.z),D=t.i===f.length-1;if(T<=(D?l:a)){t.i++;continue}if(!D&&T<=je.route.passRadius){const k=t.i>0?f[t.i-1]:t.p0;if(k){const V=_.x-k.x,X=_.z-k.z,G=V*V+X*X;if(G>1e-9&&((i.x-k.x)*V+(i.z-k.z)*X)/G>=1){t.i++;continue}}}break}if(t.i>=f.length)return{vx:0,vz:0,done:!0,stuck:!1};const g=f[t.i],x=g.x-i.x,m=g.z-i.z,h=Math.hypot(x,m)||1e-9;let b=h;for(let _=t.i;_+1<f.length;_++)b+=Math.hypot(f[_+1].x-f[_].x,f[_+1].z-f[_].z);const S=i.decel;let v=Math.min(e,r);if(s&&(v=Math.min(v,Math.sqrt(2*S*.8*Math.max(0,b-l*.4))+.6)),o&&(v=Math.min(v,o.base+o.gain*b)),t.i<f.length-1&&h<u+i.speed*.15){const _=f[t.i+1],T=_.x-g.x,D=_.z-g.z,k=Math.hypot(T,D)||1,V=x/h*(T/k)+m/h*(D/k),X=e*er(c+(1-c)*Math.max(0,V),c,1);v=Math.min(v,Math.sqrt(X*X+2*S*.8*h))}b<t.bestRem-d?(t.bestRem=b,t.stuck=0):v>1&&(t.stuck+=n);const A=t.stuck>p;let y=x/h,E=m/h;if(t.i<f.length-1&&!(o!=null&&o.noLook)){const _=je.route,T=er(_.look+_.lookSpeed*i.speed,_.look,_.lookMax);if(h<T){let D=T-h,k=g.x,V=g.z;for(let G=t.i;G+1<f.length&&D>0;G++){const H=f[G+1],B=Math.hypot(H.x-f[G].x,H.z-f[G].z),tt=B>1e-9?Math.min(1,D/B):1;k=f[G].x+(H.x-f[G].x)*tt,V=f[G].z+(H.z-f[G].z)*tt,D-=B}const X=i.world;for(const G of[1,.6,.3,0]){const H=g.x+(k-g.x)*G,B=g.z+(V-g.z)*G;if(G>0&&X&&!X.walkClear(i.x,i.z,H,B,i.radius,i.cell))continue;const tt=Math.hypot(H-i.x,B-i.z);tt>1e-6&&(y=(H-i.x)/tt,E=(B-i.z)/tt);break}}}let w=y*v,M=E*v;if(t.blend&&t.age<je.route.blendTime){const _=t.age/je.route.blendTime,T=_*_*(3-2*_);w=t.blend.vx+(w-t.blend.vx)*T,M=t.blend.vz+(M-t.blend.vz)*T}return{vx:w,vz:M,done:!1,stuck:A}}const He=_n,Ee={vx:0,vz:0},ar=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z),Tn=i=>({x:i.x,z:i.z});class mf{constructor(t,e,n){this.G=t,this.body=e,this.mode="follow",this.order={type:"follow"},this.react=null,this.saved=null,this.patrol=null,this.side=t.rng()<.5?-1:1,this.lead={x:0,z:1},this.chasing=!1,this.slot=null,this.slotTimer=0,this.farTime=0,this.search=null,this.viaCentre=!1,this.stuckLog=[],this.goalCap=1/0,this.arrivedEmitted=!1}command(t){const e=this.G;if(!t||typeof t!="object")return this._reject(t,"bad-order");if(this.body.controlled)return this._reject(t,"controlled");const n=this._apply(t);return n.ok?(this.react=null,this.saved=null,e.emit("order-accepted","companion",{order:this._summary(t)}),{ok:!0}):this._reject(t,n.reason,n)}_summary(t){const e={type:t.type};return t.point&&(e.point=Tn(t.point)),t.waypoints&&(e.waypoints=t.waypoints.length),e}_reject(t,e,n={}){return this.G.emit("order-rejected","companion",{order:t&&t.type?this._summary(t):null,reason:e,...n.index!==void 0?{index:n.index}:{}}),{ok:!1,reason:e}}_apply(t){const{world:e}=this.G,n=this.body;switch(t.type){case"follow":return this._set("follow",{type:"follow"}),{ok:!0};case"hold":return this._set("hold",{type:"hold"}),{ok:!0};case"goto":{if(!ar(t.point))return{ok:!1,reason:"bad-point"};const s=Pn(e,n,t.point,n.radius);return s.ok?(this._set("goto",{type:"goto",point:Tn(s.goal)}),n._route=ci(s,n),this.arrivedEmitted=!1,{ok:!0}):{ok:!1,reason:s.reason}}case"patrol":{const s=t.waypoints;if(!Array.isArray(s)||!s.length||s.length>He.patrol.maxWaypoints)return{ok:!1,reason:"bad-waypoints"};const r=[];for(let a=0;a<s.length;a++){if(!ar(s[a]))return{ok:!1,reason:"bad-waypoint",index:a};const l=e.locate(s[a].x,s[a].z);if(!l)return{ok:!1,reason:"outside",index:a};if(l.solid)return{ok:!1,reason:"solid",index:a};const c=e.settle(s[a].x,s[a].z,n.radius);if(!c)return{ok:!1,reason:"cramped",index:a};r.push({x:c.x,z:c.z})}const o=Pn(e,n,r[0],n.radius);return o.ok?(this._set("patrol",{type:"patrol",waypoints:r.map(Tn),loop:t.loop!==!1}),this.patrol={pts:r,loop:t.loop!==!1,dwell:Number.isFinite(t.dwell)?t.dwell:He.patrol.dwell,idx:0,dir:1,wait:0,fails:0},n._route=ci(o,n),{ok:!0}):{ok:!1,reason:o.reason,index:0}}default:return{ok:!1,reason:"unknown-order"}}}_set(t,e){this.mode=t,this.order=e,this.body._route=null,this.slot=null,this.slotIdeal=null,this.slotTimer=0,this.chasing=!1,t!=="patrol"&&(this.patrol=null)}reactTo(t,e){const n=this.G,s=this.body;if(s.controlled)return!1;const r=()=>{this.mode!=="react"&&(this.saved={mode:this.mode,order:this.order,patrol:this.patrol?{...this.patrol}:null})};switch(t.type){case"goto":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;if(!ar(o))return!1;const a=Pn(n.world,s,o,s.radius);return a.ok?(r(),this.mode="react",this.react={kind:"goto",point:Tn(a.goal),giveUp:n.t+He.react.giveUp,dwell:Number.isFinite(t.dwell)?t.dwell:He.react.dwell,arrivedAt:null},s._route=ci(a,s),!0):(n.emit("order-rejected","companion",{order:{type:"goto",point:Tn(o)},reason:a.reason,source:"trigger"}),!1)}case"face":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;return ar(o)?(r(),this.mode="react",s._route=null,this.react={kind:"face",until:n.t+He.react.face,heading:Math.atan2(o.x-s.x,o.z-s.z)},!0):!1}case"hold":case"follow":case"patrol":{if(t.for>0){r();const a=this.saved;return this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type}).ok?(this.saved=a,this.react={kind:"mode",until:n.t+t.for},this.mode="react",this.reactInner=t.type,!0):(this.saved=null,this.mode==="react"&&(this.mode=a.mode),!1)}const o=this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type});return o.ok?(this.react=null,this.saved=null,!0):(n.emit("order-rejected","companion",{order:{type:t.type},reason:o.reason,source:"trigger"}),!1)}default:return!1}}_restore(){const t=this.saved;if(this.react=null,this.saved=null,this.reactInner=null,this.body._route=null,!t){this.mode="follow",this.order={type:"follow"};return}this.mode=t.mode,this.order=t.order,this.patrol=t.patrol,this.slot=null,this.slotTimer=0,this.G.emit("order-accepted","companion",{order:{type:t.order.type},source:"react-end"})}setControlled(t){const e=this.body;e.controlled=t,e._route=null,this.react=null,this.saved=null,this.patrol=null,t?(this.mode="direct",this.order={type:"direct"}):(this.mode="hold",this.order={type:"hold"}),this.chasing=!1,this.slot=null,this.slotTimer=0}think(t){if(this.body.controlled)return Ee;switch(this.mode){case"hold":return this._hold(t);case"goto":return this._goto(t);case"patrol":return this._patrol(t);case"react":return this._react(t);default:return this._follow(t)}}_hold(){this.body._route=null;const t=this.G.bodies.avatar;return Math.hypot(t.x-this.body.x,t.z-this.body.z)<9&&(this.body._face=Math.atan2(t.x-this.body.x,t.z-this.body.z)),Ee}_drive(t,e){const n=this.body,s=no(n,n._route,n.spec.speed,t,e);return s.done?(n._route=null,{vx:0,vz:0,done:!0}):s.stuck?(this._stuck(),{vx:0,vz:0,stuck:!0}):s}_goto(t){const e=this.body;if(!e._route){const s=Pn(this.G.world,e,this.order.point,e.radius);if(!s.ok)return this.G.emit("order-rejected","companion",{order:{type:"goto"},reason:s.reason,source:"replan"}),this._set("hold",{type:"hold"}),Ee;e._route=ci(s,e)}const n=this._drive(t);return n.done?(this.G.emit("companion-arrived","companion",{mode:"goto",point:Tn(this.order.point)}),this.mode="hold",this.order={type:"hold",arrivedAt:Tn(this.order.point)},Ee):n}_patrol(t){const e=this.patrol,n=this.body,s=this.G;if(!e)return this._set("hold",{type:"hold"}),Ee;if(e.wait>0)return e.wait-=t,Ee;if(!n._route){const o=Pn(s.world,n,e.pts[e.idx],n.radius);if(!o.ok)return++e.fails>=e.pts.length?(s.emit("order-rejected","companion",{order:{type:"patrol"},reason:"patrol-unreachable",source:"replan"}),this._set("hold",{type:"hold"}),Ee):(this._advance(),Ee);e.fails=0,n._route=ci(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"patrol",index:e.idx,point:Tn(e.pts[e.idx])}),e.wait=e.dwell,this._advance(),Ee):r}_advance(){const t=this.patrol,e=t.pts.length;e!==1&&(t.loop?t.idx=(t.idx+1)%e:(t.idx+=t.dir,t.idx>=e?(t.dir=-1,t.idx=e-2):t.idx<0&&(t.dir=1,t.idx=1)))}_react(t){const e=this.react,n=this.body,s=this.G;if(!e)return this._restore(),Ee;if(e.kind==="face")return n._face=e.heading,s.t>=e.until&&this._restore(),Ee;if(e.kind==="mode"){if(s.t>=e.until)return this._restore(),Ee;this.mode=this.reactInner;const o=this.think(t);return this.mode!==this.reactInner&&(this.reactInner="hold"),this.mode="react",o}if(e.arrivedAt!==null)return s.t-e.arrivedAt>=e.dwell&&this._restore(),Ee;if(s.t>e.giveUp)return this._restore(),Ee;if(!n._route){const o=Pn(s.world,n,e.point,n.radius);if(!o.ok)return this._restore(),Ee;n._route=ci(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"react",point:Tn(e.point)}),e.arrivedAt=s.t,Ee):r}_follow(t){const e=this.G,n=this.body,s=He.follow,r=e.world,o=e.bodies.avatar,a=o.x-n.x,l=o.z-n.z,c=Math.hypot(a,l);if(o.speed>.8){const g=Math.min(1,6*t),x=this.lead.x+(o.vx/o.speed-this.lead.x)*g,m=this.lead.z+(o.vz/o.speed-this.lead.z)*g,h=Math.hypot(x,m)||1;this.lead={x:x/h,z:m/h}}this.farTime=c>s.blinkDistance?this.farTime+t:0,this.search&&this._stepSearch(o);const u=r.cell(n.cell),p=c>1.6&&r.inDoorway(n.x,n.z,u,s.doorClear*.7);if(!this.chasing&&(c>s.start||p)&&(this.chasing=!0,this.slotTimer=0),this.slotTimer-=t,this.chasing&&this.slotTimer<=0&&!this.search&&(!n._route||this._stale(o,c))){this.slotTimer=s.reslot;const g=this._chooseSlot(o,c);g?this._adopt(g):this._beginSearch(o)}if(!this.chasing)return n._route=null,n._face=Math.atan2(a,l),Ee;if(!n._route)return Ee;const d=c>s.catchup,f=no(n,n._route,d?n.spec.catchupSpeed:n.spec.speed,t,{arrive:!1,chase:{base:Math.min(o.speed*1.05,n.spec.speed)+.5,gain:3}});return f.done?(n._route=null,c<s.stop&&o.speed<.5&&(this.chasing=!1,e.emit("companion-arrived","companion",{mode:"follow",point:Tn(this.slot??n)})),Ee):f.stuck?(this._stuck(),Ee):f}_predict(t){const e=He.follow,n=this.G.world;if(t.speed<.8)return{x:t.x,z:t.z};const s=t.x+t.vx*e.lead,r=t.z+t.vz*e.lead;return n.walkClear(t.x,t.z,s,r,this.body.radius,t.cell)?{x:s,z:r}:{x:t.x,z:t.z}}_ideal(t){const e=He.follow,n=this.lead.x,s=this.lead.z;return{x:t.x-n*e.distance+-s*e.lateral*this.side,z:t.z-s*e.distance+n*e.lateral*this.side}}_stale(t,e=0){const n=He.follow,s=this.body._route;if(!s||!this.slotIdeal)return!0;const r=this._ideal(this._predict(t));return Math.hypot(r.x-this.slotIdeal.x,r.z-this.slotIdeal.z)>n.replanDist*Math.max(1,e/n.farScale)?!0:s.age>n.reslotMax&&t.speed>.5}_chooseSlot(t,e){const n=this.G,s=this.body,r=He.follow,o=n.world,a=this.lead.x,l=this.lead.z,c=-l,u=a,p=this._predict(t);this.slotIdeal=this._ideal(p);const d=[],f=(v,A,y)=>d.push({x:p.x+v,z:p.z+A,tag:y}),g=-a*r.distance,x=-l*r.distance;f(g+c*r.lateral*this.side,x+u*r.lateral*this.side),f(g-c*r.lateral*this.side,x-u*r.lateral*this.side,"mirror"),f(g,x);const m=d[0],h=[];for(const v of[1.1,2.2,3.4])for(let A=0;A<8;A++){const y=A/8*Math.PI*2;h.push({x:m.x+Math.cos(y)*v,z:m.z+Math.sin(y)*v,tag:"ring"})}h.sort((v,A)=>Math.hypot(v.x-m.x,v.z-m.z)-Math.hypot(A.x-m.x,A.z-m.z)),d.push(...h);let b=0;for(const v of d){const A=o.locate(v.x,v.z);if(!A||A.solid||o.wallDist(v.x,v.z,A)<s.radius+r.wallClear||o.inDoorway(v.x,v.z,A,r.doorClear))continue;const y=Math.hypot(v.x-t.x,v.z-t.z);if(y<t.radius+s.radius+.8||y>r.start-.8)continue;if(++b>3)break;const E=Pn(o,s,v,s.radius,{maxExpand:r.slotBudget});if(E.ok&&Math.hypot(E.goal.x-v.x,E.goal.z-v.z)<1.5)return v.tag==="mirror"&&(this.side=-this.side),E}const S=Pn(o,s,{x:t.x,z:t.z},s.radius,{maxExpand:r.slotBudget*5});return S.ok?this._stopShort(S,t,r.distance*.8):null}_adopt(t){const e=this.body,n=this.G,s=n.world;if(this.viaCentre){this.viaCentre=!1;const r=s.cell(e.cell),o=r&&s.settle(r.cx,r.cz,e.radius);o&&s.walkClear(e.x,e.z,o.x,o.z,e.radius,r.id)&&(t={...t,pts:[{x:o.x,z:o.z},...t.pts]})}this.slot=t.goal,e._route=ci(t,e),n.stats.replans++}_beginSearch(t){const e=this.G,n=this.body,s=He.follow,r=this._predict(t);this.slotIdeal=this._ideal(r);let o=ha(e.world,n,r,n.radius);if(o.ok||(o=ha(e.world,n,{x:t.x,z:t.z},n.radius)),!o.ok){this.slotTimer=s.retry;return}this.search={sp:o,leader:{x:t.x,z:t.z}}}_stepSearch(t){this.G;const e=He.follow;this.body;const n=this.search,s=n.sp.search;let r=s.step(e.searchStep);if(r==="running"&&s.expanded>e.searchMax&&(r="fail"),r==="running")return;this.search=null;let o=null;if(r==="done")o=n.sp.finish();else{const a=s.partial();a&&a.cells.length>1&&(o=n.sp.finish(a)),this.slotTimer=Math.max(this.slotTimer,e.retry)}o&&o.ok&&this._adopt(Math.hypot(o.goal.x-t.x,o.goal.z-t.z)<1.5?this._stopShort(o,t,e.distance*.8):o)}_stopShort(t,e,n){const s=t.pts;let r=this.body.x,o=this.body.z;for(let a=0;a<s.length;a++){const l=s[a];if(Math.hypot(l.x-e.x,l.z-e.z)<n){let c=0,u=1;for(let f=0;f<14;f++){const g=(c+u)/2;Math.hypot(r+(l.x-r)*g-e.x,o+(l.z-o)*g-e.z)<n?u=g:c=g}const p={x:r+(l.x-r)*c,z:o+(l.z-o)*c},d=s.slice(0,a);return d.push(p),{...t,pts:d,goal:{...t.goal,x:p.x,z:p.z}}}r=l.x,o=l.z}return t}_stuck(){const t=this.G,e=this.body,n=this.stuckLog;for(n.push(t.t);n.length&&t.t-n[0]>He.recovery.window;)n.shift();const s=n.length;if(e._route=null,this.slotTimer=0,s===1){t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z});return}if(s===2){const r=t.world.cell(e.cell);t.world.settle(r.cx,r.cz,e.radius)&&(this.viaCentre=!0),t.emit("companion-stuck-recovered","companion",{method:"detour",x:e.x,z:e.z});return}n.length=0,this.mode==="follow"?t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z}):(t.emit("companion-stuck-recovered","companion",{method:"skip",x:e.x,z:e.z}),this.mode==="patrol"?this._advance():this.mode==="goto"?this._set("hold",{type:"hold"}):this.mode==="react"&&this._restore())}_blink(t){const e=this.G,n=this.body,s=e.bodies.avatar,r=e.world.settle(s.x-this.lead.x*He.follow.distance,s.z-this.lead.z*He.follow.distance,n.radius,He.follow.wallClear)??e.world.settle(s.x,s.z,n.radius);r&&(n.teleport(r),this.farTime=0,this.chasing=!1,e.stats.blinks++,e.emit("companion-stuck-recovered","companion",{method:"resync",why:t,x:n.x,z:n.z}))}}const lr=_n.triggers,gf=new Set(["enter-cell","avatar-distance","noise","sighted","interval","avatar-stopped"]),xf=new Set(["goto","hold","follow","patrol","face","emit"]),ql=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z);function vf(i){if(!i||typeof i!="object")return"not-an-object";const t=i.when,e=i.do;return!t||!gf.has(t.type)?"bad-when":!e||!xf.has(e.type)?"bad-do":t.type==="enter-cell"&&!(Array.isArray(t.cells)&&t.cells.length)&&t.sector===void 0?"enter-cell-needs-cells-or-sector":t.type==="avatar-distance"&&!(Number.isFinite(t.lt)||Number.isFinite(t.gt))?"avatar-distance-needs-lt-or-gt":t.type==="noise"&&!(t.radius>0)?"noise-needs-radius":t.type==="interval"&&!(t.every>0)?"interval-needs-every":t.type==="avatar-stopped"&&!(t.for>0)?"avatar-stopped-needs-for":(e.type==="goto"||e.type==="face")&&!ql(e.point)&&e.point!=="source"?"action-needs-point":e.type==="patrol"&&!(Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(ql))?"patrol-needs-waypoints":e.type==="emit"&&(typeof e.event!="string"||!e.event)?"emit-needs-event":e.point==="source"&&t.type!=="noise"&&t.type!=="sighted"?"source-needs-noise-or-sighted":null}class _f{constructor(){this.rules=[],this.state=new Map,this.signals=[],this.auto=0}set(t,e){const n=[],s=[],r=[],o=new Map;for(const a of Array.isArray(t)?t:[]){const l=(a==null?void 0:a.id)??`rule-${++this.auto}`,c=r.length>=lr.maxRules?"too-many-rules":vf(a);if(c){s.push({id:l,reason:c});continue}const u={id:l,when:a.when,do:a.do,repeat:a.repeat?a.repeat===!0?lr.repeat:Number(a.repeat):0,once:!!a.once,enabled:a.enabled!==!1},p=JSON.stringify(u.when),d=this.state.get(l);o.set(l,d&&d.key===p?d:{key:p,fired:0,last:-1/0,was:null,latched:!1,nextAt:e+(u.when.every??0),done:!1,stopped:0}),r.push(u),n.push(l)}return this.rules=r,this.state=o,{accepted:n,rejected:s}}signal(t){this.signals.length<lr.maxSignals&&this.signals.push(t)}describe(){return this.rules.map(t=>{const e=this.state.get(t.id);return{id:t.id,type:t.when.type,enabled:t.enabled,fired:e.fired,last:Number.isFinite(e.last)?e.last:null,active:!!e.was||e.latched}})}tick(t){const e=[],{t:n,dt:s}=t,r=Math.hypot(t.avatar.x-t.companion.x,t.avatar.z-t.companion.z),o=t.avatar.speed<.1,a=this.signals;this.signals=[];for(const l of this.rules){if(e.length>=lr.maxFiresPerTick)break;const c=this.state.get(l.id),u=l.when;let p=!1,d=null,f=null;switch(u.type){case"enter-cell":{const g=t.cellChange;if(g){const x=m=>u.cells?u.cells.includes(m.id):u.sector!==void 0&&t.sectorOf(m)===u.sector;p=!x(g.from)&&x(g.to)}break}case"avatar-distance":f=Number.isFinite(u.lt)?r<u.lt:r>u.gt;break;case"avatar-stopped":c.stopped=o?c.stopped+s:0,f=c.stopped>=u.for;break;case"interval":n>=c.nextAt&&(p=!0,c.nextAt=n+u.every);break;case"noise":for(const g of a){if(g.type!=="noise")continue;if(Math.hypot(g.x-t.companion.x,g.z-t.companion.z)<=Math.min(u.radius,g.radius??1/0)){p=!0,d=g;break}}break;case"sighted":for(const g of a)if(g.type==="sighted"&&(u.target===void 0||u.target===g.target)){p=!0,d=g;break}break}if(f!==null)if(c.was===null)c.was=f;else{const g=f&&!c.was,x=l.repeat>0&&f&&c.was&&n-c.last>=l.repeat;p=g||x,c.was=f}!l.enabled||c.done||p&&(c.fired++,c.last=n,l.once&&(c.done=!0),e.push({rule:l,signal:d}))}return e}}const Ne=_n,Fe=i=>Math.round(i*1e3)/1e3;function yf(i,{spawnCell:t,seed:e=1,tuning:n={}}={}){const s=rf(i),r=Wh(e),o={ticks:0,substeps:0,contacts:0,violations:0,blinks:0,replans:0},a=[];let l=0,c=0,u=0;const p={world:s,rng:r,stats:o,bodies:null,get t(){return l},emit(L,q,it){a.push({t:Fe(l),type:L,actor:q,...it}),a.length>Ne.events.max&&a.shift()}},d=L=>L==null?null:typeof L=="object"?L:s.cell(L);let f=d(t)??d(i.startCell);if((!f||f.solid)&&(f=(f==null?void 0:f.neighbors.map(L=>s.cell(L.id)).find(L=>!L.solid))??null),!f)throw new Error("createActors: no open spawn cell");const g={...Ne.avatar,...n.avatar},x={...Ne.companion,...n.companion},m=s.settle(f.cx,f.cz,g.radius,.2);if(!m)throw new Error("createActors: spawn cell has no room");const h=new Gl("avatar",g,m);let b=null;for(const[L,q]of[[-1.7,1.2],[1.7,1.2],[-1.7,-1.2],[1.7,-1.2],[0,2.6],[0,-2.6],[3.2,0],[-3.2,0]]){const it=s.settle(m.x+L,m.z+q,x.radius,.1);if(it&&Math.hypot(it.x-m.x,it.z-m.z)>=g.radius+x.radius+.4){b=it;break}}if(!b)throw new Error("createActors: no room for the companion");const S=new Gl("companion",x,b);h.world=S.world=s,p.bodies={avatar:h,companion:S},h.controlled=!0,h.mode="direct",S.mode="follow";const v=new mf(p,S,e),A=new _f,y=L=>p.bodies[L];let E={ax:0,az:0,run:!1,aim:null,stop:!1};const w={avatar:null,companion:null};let M=h.cell,_=k(s.cell(h.cell)),T=0;const D=Math.atan2(S.x-h.x,S.z-h.z);h.heading=h.pheading=D,S.heading=S.pheading=D+Math.PI;function k(L){var q,it;return L.sector??((it=(q=i.sectorAt)==null?void 0:q.call(i,L.cx,L.cz))==null?void 0:it.id)}const V=()=>h.controlled?h:S;function X(L,q,it,{quiet:nt=!1}={}){const Z=Et=>(nt||p.emit("order-rejected",L.id,{order:{type:"moveTo",point:{x:q,z:it}},reason:Et}),{ok:!1,reason:Et});if(!Number.isFinite(q)||!Number.isFinite(it))return Z("bad-point");const N=Pn(s,L,{x:q,z:it},L.radius);return N.ok?(L._route=ci(N,L),L._replans=0,nt||p.emit("order-accepted",L.id,{order:{type:"moveTo",point:{x:Fe(N.goal.x),z:Fe(N.goal.z)}}}),{ok:!0,target:{x:N.goal.x,z:N.goal.z},length:N.length}):Z(N.reason)}function G(L,q){if(h.controlled&&(E.ax||E.az)){const it=Pn(s,h,{x:L,z:q},h.radius);return it.ok?(w.avatar={x:L,z:q},p.emit("order-accepted","avatar",{order:{type:"moveTo",point:{x:L,z:q}},deferred:!0}),{ok:!0,deferred:!0}):(p.emit("order-rejected","avatar",{order:{type:"moveTo",point:{x:L,z:q}},reason:it.reason}),{ok:!1,reason:it.reason})}return X(h,L,q)}function H(L){const q=v.command(L);return S.mode=v.mode,q}function B(L){if(L!=="avatar"&&L!=="companion")return{ok:!1,reason:"unknown-actor"};if(y(L).controlled)return{ok:!0,unchanged:!0};const it=V();return it._route=null,w.avatar=w.companion=null,it===h?(h.controlled=!1,h.mode="hold",v.setControlled(!0)):(v.setControlled(!1),h.controlled=!0,h.mode="direct"),S.mode=v.mode,p.emit("control-changed",L,{from:it.id}),{ok:!0}}function tt(L){const q=A.set(L,l);for(const it of q.rejected)p.emit("order-rejected","companion",{rule:it.id,reason:it.reason});return q}function ut(L,q){const it=L.spec,nt=E.ax!==0||E.az!==0,Z=E.run?it.runSpeed??it.catchupSpeed??it.speed:it.speed;if(nt)return L._route=null,{vx:E.ax*Z,vz:E.az*Z};const N=w[L.id];if(N&&(w[L.id]=null,X(L,N.x,N.z,{quiet:!0})),E.stop)return L._route=null,{vx:0,vz:0};if(!L._route)return{vx:0,vz:0};const Et=no(L,L._route,Z,q);if(Et.done){const dt=L._route.goal;return L._route=null,p.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:Fe(dt.x),z:Fe(dt.z)}}),{vx:0,vz:0}}if(Et.stuck){const dt=L._route.goal;return L._replans=(L._replans??0)+1,L._replans<=1?X(L,dt.x,dt.z,{quiet:!0}):(L._route=null,p.emit("avatar-blocked",L.id,{x:Fe(L.x),z:Fe(L.z),reason:"stuck"})),{vx:0,vz:0}}return Et}function rt(L,q,it){const nt=L.x-q.x,Z=L.z-q.z,N=Math.hypot(nt,Z),Et=L.radius+q.radius+Ne.separation.gap;if(N>=Et)return;const dt=N>1e-6?nt/N:1,St=N>1e-6?Z/N:0,yt=Ne.separation.push*(1-N/Et);it.vx+=dt*yt,it.vz+=St*yt}function At(L,q){let it=null,nt=0;L.controlled&&E.aim?it=Math.atan2(E.aim.x-L.x,E.aim.z-L.z):L.speed>Ne.facing.minSpeed?(it=Math.hypot(L._want.x,L._want.z)>.5?Math.atan2(L._want.x,L._want.z):Math.atan2(L.vx,L.vz),nt=Ne.facing.tau):L._face!=null&&(it=L._face),L._face=null,it!==null&&Number.isFinite(it)&&L.face(q,it,nt)}function Ct(L){l+=L,o.ticks++,u++;for(const dt of[h,S])dt.px=dt.x,dt.pz=dt.z,dt.pheading=dt.heading;E.run&&V().speed>1?(T+=L,T>=Ne.noise.runEvery&&(T=0,A.signal({type:"noise",x:V().x,z:V().z,radius:Ne.noise.run,source:V().id}))):T=0;const q=s.live(h.cell),it=s.live(S.cell);let nt={vx:0,vz:0};q&&(nt=h.controlled?ut(h,L):h._route?lt(h,L):nt,!h.controlled&&it&&rt(h,S,nt)),h.step(s,o,L,nt.vx,nt.vz),At(h,L);let Z;it?S.controlled?Z=ut(S,L):!q&&v.mode==="follow"?Z={vx:0,vz:0}:(Z=v.think(L),Z={vx:Z.vx,vz:Z.vz},q&&rt(S,h,Z)):Z={vx:0,vz:0},S.step(s,o,L,Z.vx,Z.vz),At(S,L),S.mode=v.mode;let N=null;if(h.cell!==M){const dt=s.cell(M),St=s.cell(h.cell);p.emit("avatar-entered-cell","avatar",{cell:h.cell,from:M});const yt=St?k(St):void 0;yt!==void 0&&yt!==_&&(p.emit("avatar-entered-sector","avatar",{sector:yt,from:_}),_=yt),N={from:dt,to:St},M=h.cell}for(const dt of[h,S])dt._blocked>.3&&!dt._blockedFired&&dt.controlled&&(dt._blockedFired=!0,p.emit("avatar-blocked",dt.id,{x:Fe(dt.x),z:Fe(dt.z)}));const Et=A.tick({t:l,dt:L,avatar:h,companion:S,cellChange:N,sectorOf:k});for(const dt of Et){const St=dt.rule.do,yt=S.controlled&&St.type!=="emit";p.emit("trigger-fired","companion",{rule:dt.rule.id,when:dt.rule.when.type,...dt.signal?{at:{x:Fe(dt.signal.x),z:Fe(dt.signal.z)}}:{},...yt?{ignored:"controlled"}:{}}),St.type==="emit"?p.emit(String(St.event),"companion",{rule:dt.rule.id}):yt||v.reactTo(St,dt.signal)}S.mode=v.mode}function lt(L,q){const it=no(L,L._route,L.spec.speed,q);if(it.done){const nt=L._route.goal;return L._route=null,p.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:Fe(nt.x),z:Fe(nt.z)}}),{vx:0,vz:0}}return it.stuck?(L._route=null,p.emit("avatar-blocked",L.id,{x:Fe(L.x),z:Fe(L.z),reason:"stuck"}),{vx:0,vz:0}):it}function wt(L,q={}){var Et,dt;if(!(L>0))return;L=Math.min(L,Ne.maxFrame);let it=Number((Et=q.axis)==null?void 0:Et.x)||0,nt=Number((dt=q.axis)==null?void 0:dt.z)||0;const Z=Math.hypot(it,nt);if(Z<.05?it=nt=0:Z>1&&(it/=Z,nt/=Z),E={ax:it,az:nt,run:!!q.run,aim:q.aim&&Number.isFinite(q.aim.x)&&Number.isFinite(q.aim.z)?q.aim:null,stop:!!q.stop},q.moveTo){const St=V();St===h?G(q.moveTo.x,q.moveTo.z):it||nt?w[St.id]={x:q.moveTo.x,z:q.moveTo.z}:X(St,q.moveTo.x,q.moveTo.z)}c+=L;let N=Math.floor(c/Ne.tick+1e-9);for(c-=N*Ne.tick,c<0&&(c=0);N-- >0;)Ct(Ne.tick)}function zt(L,q=c/Ne.tick){const it=y(L);if(!it)return null;const nt=Math.min(1,Math.max(0,q)),Z=ws(it.pheading,it.heading);return{x:it.px+(it.x-it.px)*nt,z:it.pz+(it.z-it.pz)*nt,heading:it.pheading+Z*nt,vx:it.vx,vz:it.vz,speed:it.speed,moving:it.moving}}function xt(L){const q=L.pub();return q.mode=L.mode,q.moving=L.moving,q.render=zt(L.id),q}return{avatar:h,companion:S,update:wt,pose:zt,get alpha(){return c/Ne.tick},tickLength:Ne.tick,commandAvatarTo:G,commandCompanion:H,possess:B,setStandingOrders:tt,signal(L){return!L||!Number.isFinite(L.x)||!Number.isFinite(L.z)||L.type!=="noise"&&L.type!=="sighted"?!1:(A.signal({...L}),!0)},drainEvents(){const L=a.slice();return a.length=0,L},snapshot(){const L=xt(S);return L.order=v.order,L.react=v.react?{...v.react}:null,v.mode==="follow"&&(L.follow={state:v.chasing?"heading":"formed",planning:!!v.search}),v.mode==="patrol"&&v.patrol&&(L.patrol={index:v.patrol.idx,loop:v.patrol.loop,count:v.patrol.pts.length}),{t:Fe(l),tick:u,alpha:Fe(c/Ne.tick),controlled:V().id,avatar:xt(h),companion:JSON.parse(JSON.stringify(L)),rules:A.describe(),stats:{...o}}},path(L){const q=L==="avatar"?h:L==="companion"?S:null,it=q==null?void 0:q._route;return it?it.pts.slice(it.i).map(nt=>({x:nt.x,z:nt.z})):[]},world:s,get time(){return l},get controlledId(){return V().id}}}function $l({from:i,to:t,length:e,world:n,knows:s=()=>!0,step:r=.2}){const o=t.x-i.x,a=t.z-i.z,l=Math.hypot(o,a),c=l>1e-9?o/l:0,u=l>1e-9?a/l:0,p=Math.max(0,e??0),d=Math.max(1,Math.ceil(p/r));let f={x:i.x,z:i.z},g=null;for(let x=1;x<=d;x++){const m=x*p/d,h=i.x+c*m,b=i.z+u*m;if(!s(h,b))return{stop:"sight",end:f,wall:null,hitDist:null};const S=n.locate(h,b,g);if(!S)return{stop:"sight",end:f,wall:null,hitDist:null};if(n.blocked(S,h,b))return{stop:"wall",end:f,wall:{x:h,z:b},hitDist:m};g=S.id,f={x:h,z:b}}return{stop:"range",end:f,wall:null,hitDist:null}}const Mf=.45,Sf=i=>Math.round(i*10)/10,Ou={"scan-cast":{gate:(i,t,e)=>{const n=e.ports.pingState();return n.ready?null:n.reason??"cooldown"},run:(i,t)=>{const e=i.at??t.posOf(i.src.id),n=t.ports.ping(e.x,e.z,{mode:i.data.scanMode});return n==null?{ok:!1,reason:"in-wall"}:(t.scratch.lastPing={src:i.src.id,t:i.t,pingId:n,from:{x:e.x,z:e.z}},{ok:!0,kind:"pulse",pingId:n})}},reveal:{run:(i,t)=>{const e=t.scratch.lastPing;return!e||e.src!==i.src.id||e.t!==i.t?null:(t.limitPing(e.pingId,{from:e.from,to:{x:i.at.x,z:i.at.z},length:i.data.length??0,radius:i.data.radius}),t.state.add("hint",{from:e.from,to:{x:i.at.x,z:i.at.z},t0:i.t,until:i.t+i.data.duration}),{ok:!0,kind:"limit",pingId:e.pingId})}},marker:{gate:(i,t,e)=>{const{x:n,z:s}=t.at;if(!e.ports.knows(n,s))return"unknown-ground";const r=e.ports.world.locate(n,s);return r?e.ports.world.blocked(r,n,s)?"solid":null:"unknown-ground"},run:(i,t)=>{const{kind:e,radius:n}=i.data,s=i.at,r=t.state.markNear(e,s.x,s.z,n);if(r)return t.state.removeMark(r.id),{ok:!0,kind:"marker",action:"removed",text:"Marker taken down"};const o=t.ports.world.locate(s.x,s.z);return t.state.addMark({kind:e,x:o?o.cx:s.x,z:o?o.cz:s.z,cell:o?o.id:null}),{ok:!0,kind:"marker",action:"placed",text:"Marker placed"}}},move:{gate:(i,t,e)=>{const n=Math.hypot(t.at.x-t.pos.x,t.at.z-t.pos.z),s=$l({from:t.pos,to:t.at,length:n,world:e.ports.world,knows:e.ports.knows});return s.stop==="sight"?"unknown-ground":s.stop==="wall"?"no-route":null},run:(i,t)=>{const e=t.ports.move(i.src.id,i.data.to);return(e==null?void 0:e.ok)===!1?{ok:!1,reason:e.reason??"no-route"}:{ok:!0,kind:"move"}}},trace:{run:(i,t)=>{var c;const{item:e,length:n,to:s,family:r}=i.data,o=$l({from:i.at,to:s,length:n,world:t.ports.world,knows:t.ports.knows}),a=((c=Xh[e])==null?void 0:c.label)??e;t.state.add("trace",{from:{x:i.at.x,z:i.at.z},to:o.end,wall:o.wall,family:r,t0:i.t,until:i.t+Mf});const l=o.stop==="wall"?`${a} struck a wall ${Sf(o.hitDist)} units out`:o.stop==="sight"?`${a} struck something beyond sight`:`${a} hit nothing in reach`;return{ok:!0,kind:"trace",stop:o.stop,text:l}}},"status-applied":{run:(i,t)=>i.data.status!=="shrouded"?null:(t.state.put("halo",i.data.targetId,{who:i.data.targetId,t0:i.t,until:i.t+i.data.duration}),{ok:!0,kind:"halo"})},"identifier-placed":{run:(i,t)=>{if(i.data.kind!=="decoy")return null;const e=i.data.duration==null?1/0:i.t+i.data.duration;return t.state.add("beacon",{at:{x:i.at.x,z:i.at.z},t0:i.t,until:e}),{ok:!0,kind:"beacon",text:"Decoy beacon planted (placeholder: the scan does not echo it yet)"}}},damage:{run:()=>null},impulse:{run:()=>null},disable:{run:()=>null},"scan-mask":{unwired:"has no world consumer yet"},jam:{unwired:"has no world consumer yet"},"zone-placed":{unwired:"has no world consumer yet"},"checkpoint-set":{unwired:"has no world consumer yet"},unlock:{unwired:"has no world consumer yet"}},Mo=(i,t)=>typeof t=="string"&&Object.prototype.hasOwnProperty.call(i,t)?i[t]:void 0;function bf({table:i=Ou,env:t,warn:e=n=>console.warn(n)}){const n=new Set,s=(r,o)=>{n.has(r)||(n.add(r),e(`effects: '${r}' ${o}; ignored`))};return{types:()=>Object.keys(i),has:r=>Mo(i,r)!==void 0,apply(r){const o=r==null?void 0:r.type,a=Mo(i,o);return a?a.unwired?(s(o,a.unwired),null):a.run?a.run(r,t)??null:null:(s(String(o),"has no entry"),null)},gate(r,o){for(const a of(r==null?void 0:r.effects)??[]){const l=Mo(i,a.type);if(!(l!=null&&l.gate))continue;const c=l.gate(a,o,t);if(c)return c}return null}}}const wf=16;function Ef({session:i,state:t,ports:e,table:n=Ou,warn:s}){const r={},o=new Set,a=new Map,l=new Map,c=x=>{if(x&&(x.text||x.reason))for(const m of[...o])m(x)},p=bf({table:n,env:{ports:e,state:t,scratch:r,posOf:x=>e.posOf(x),limitPing(x,m){if(a.size>=wf){const[h,b]=a.entries().next().value;for(const S of b.waves)l.delete(S);a.delete(h)}a.set(x,{...m,waves:new Set})}},warn:s}),d=Object.keys(n).map(x=>i.bus.on(x,m=>c(p.apply(m)))),f=({who:x,item:m,def:h,pos:b,aim:S})=>{if(!h)return null;const v=qh(b,S??b,h.range??0);return p.gate(h,{who:x,item:m,def:h,pos:b,at:v})};i.gate=f;const g=(x,m)=>{const h=e.cellAt(x);if(!h)return!1;const b=m.from.x,S=m.from.z,v=m.to.x-b,A=m.to.z-S,y=Math.hypot(v,A),E=y>1e-9?b+v/y*m.length:b,w=y>1e-9?S+A/y*m.length:S,M=E-b,_=w-S,T=M*M+_*_,D=T>0?Math.max(0,Math.min(1,((h.cx-b)*M+(h.cz-S)*_)/T)):0;return Math.hypot(h.cx-(b+M*D),h.cz-(S+_*D))<=m.radius};return{state:t,dispatcher:p,onReport(x){return o.add(x),()=>o.delete(x)},filterScan(x){if(!a.size)return x;const m=[];for(const h of x){if(h.type==="wave-started"&&a.has(h.pingId)&&(a.get(h.pingId).waves.add(h.waveId),l.set(h.waveId,h.pingId)),h.type==="cell-reached"&&l.has(h.waveId)){const b=a.get(l.get(h.waveId));if(!b||!g(h.cell,b))continue}m.push(h)}return m},dispose(){for(const x of d)x();d.length=0,i.gate===f&&(i.gate=null),o.clear(),a.clear(),l.clear()}}}function Tf(){let i=0;const t=[],e=[];return{marks:t,fx:e,addMark({kind:n,x:s,z:r,cell:o=null}){const a={id:++i,kind:n,x:s,z:r,cell:o};return t.push(a),a},markNear(n,s,r,o){let a=null,l=1/0;for(const c of t){if(c.kind!==n)continue;const u=Math.hypot(c.x-s,c.z-r);u<=o&&u<l&&(a=c,l=u)}return a},removeMark(n){const s=t.findIndex(r=>r.id===n);return s<0?!1:(t.splice(s,1),!0)},add(n,s){const r={id:++i,kind:n,...s};return e.push(r),r},put(n,s,r){const o=e.find(a=>a.kind===n&&a.key===s);return o?Object.assign(o,r):this.add(n,{key:s,...r})},prune(n){for(let s=e.length-1;s>=0;s--)e[s].until<=n&&e.splice(s,1)},clear(){t.length=0,e.length=0}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ll="170",Af=0,Yl=1,Rf=2,ku=1,Cf=2,Wn=3,vi=0,Je=1,ye=2,jn=0,fs=1,ze=2,jl=3,Kl=4,Pf=5,Ii=100,Lf=101,If=102,Df=103,zf=104,Uf=200,Nf=201,Ff=202,Of=203,fa=204,da=205,kf=206,Bf=207,Gf=208,Hf=209,Vf=210,Wf=211,Xf=212,qf=213,$f=214,pa=0,ma=1,ga=2,gs=3,xa=4,va=5,_a=6,ya=7,cl=0,Yf=1,jf=2,xi=0,Bu=1,Gu=2,Hu=3,Vu=4,Kf=5,Wu=6,Xu=7,qu=300,xs=301,vs=302,Ma=303,Sa=304,ao=306,io=1e3,zi=1001,ba=1002,an=1003,Zf=1004,cr=1005,Mn=1006,So=1007,Ui=1008,Un=1009,$u=1010,Yu=1011,nr=1012,ul=1013,Oi=1014,Dn=1015,zn=1016,hl=1017,fl=1018,_s=1020,ju=35902,Ku=1021,Zu=1022,Sn=1023,Ju=1024,Qu=1025,ds=1026,ys=1027,lo=1028,dl=1029,th=1030,pl=1031,ml=1033,Kr=33776,Zr=33777,Jr=33778,Qr=33779,wa=35840,Ea=35841,Ta=35842,Aa=35843,Ra=36196,Ca=37492,Pa=37496,La=37808,Ia=37809,Da=37810,za=37811,Ua=37812,Na=37813,Fa=37814,Oa=37815,ka=37816,Ba=37817,Ga=37818,Ha=37819,Va=37820,Wa=37821,to=36492,Xa=36494,qa=36495,eh=36283,$a=36284,Ya=36285,ja=36286,Jf=3200,Qf=3201,nh=0,td=1,fi="",sn="srgb",Es="srgb-linear",co="linear",fe="srgb",Vi=7680,Zl=519,ed=512,nd=513,id=514,ih=515,sd=516,rd=517,od=518,ad=519,Ka=35044,Za=35048,Jl="300 es",$n=2e3,so=2001;class Ts{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ql=1234567;const ps=Math.PI/180,ir=180/Math.PI;function Kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ve[i&255]+Ve[i>>8&255]+Ve[i>>16&255]+Ve[i>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]).toLowerCase()}function Xe(i,t,e){return Math.max(t,Math.min(e,i))}function gl(i,t){return(i%t+t)%t}function ld(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function cd(i,t,e){return i!==t?(e-i)/(t-i):0}function Zs(i,t,e){return(1-e)*i+e*t}function ud(i,t,e,n){return Zs(i,t,1-Math.exp(-e*n))}function hd(i,t=1){return t-Math.abs(gl(i,t*2)-t)}function fd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function dd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function pd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function md(i,t){return i+Math.random()*(t-i)}function gd(i){return i*(.5-Math.random())}function xd(i){i!==void 0&&(Ql=i);let t=Ql+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function vd(i){return i*ps}function _d(i){return i*ir}function yd(i){return(i&i-1)===0&&i!==0}function Md(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Sd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function bd(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),u=o((t+n)/2),p=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*u,l*p,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*p,a*c);break;case"ZXZ":i.set(l*p,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function yn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function de(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Xn={DEG2RAD:ps,RAD2DEG:ir,generateUUID:Kn,clamp:Xe,euclideanModulo:gl,mapLinear:ld,inverseLerp:cd,lerp:Zs,damp:ud,pingpong:hd,smoothstep:fd,smootherstep:dd,randInt:pd,randFloat:md,randFloatSpread:gd,seededRandom:xd,degToRad:vd,radToDeg:_d,isPowerOfTwo:yd,ceilPowerOfTwo:Md,floorPowerOfTwo:Sd,setQuaternionFromProperEuler:bd,normalize:de,denormalize:yn};class $t{constructor(t=0,e=0){$t.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class te{constructor(t,e,n,s,r,o,a,l,c){te.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],p=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],h=s[6],b=s[1],S=s[4],v=s[7],A=s[2],y=s[5],E=s[8];return r[0]=o*x+a*b+l*A,r[3]=o*m+a*S+l*y,r[6]=o*h+a*v+l*E,r[1]=c*x+u*b+p*A,r[4]=c*m+u*S+p*y,r[7]=c*h+u*v+p*E,r[2]=d*x+f*b+g*A,r[5]=d*m+f*S+g*y,r[8]=d*h+f*v+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],p=u*o-a*c,d=a*l-u*r,f=c*r-o*l,g=e*p+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=p*x,t[1]=(s*c-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(bo.makeScale(t,e)),this}rotate(t){return this.premultiply(bo.makeRotation(-t)),this}translate(t,e){return this.premultiply(bo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const bo=new te;function sh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function wd(){const i=ro("canvas");return i.style.display="block",i}const tc={};function js(i){i in tc||(tc[i]=!0,console.warn(i))}function Ed(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Td(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ad(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const re={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===fe&&(i.r=Zn(i.r),i.g=Zn(i.g),i.b=Zn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===fe&&(i.r=ms(i.r),i.g=ms(i.g),i.b=ms(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fi?co:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Zn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ms(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ec=[.64,.33,.3,.6,.15,.06],nc=[.2126,.7152,.0722],ic=[.3127,.329],sc=new te().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rc=new te().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);re.define({[Es]:{primaries:ec,whitePoint:ic,transfer:co,toXYZ:sc,fromXYZ:rc,luminanceCoefficients:nc,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:ec,whitePoint:ic,transfer:fe,toXYZ:sc,fromXYZ:rc,luminanceCoefficients:nc,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}});let Wi;class Rd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Wi===void 0&&(Wi=ro("canvas")),Wi.width=t.width,Wi.height=t.height;const n=Wi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Wi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ro("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Zn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Zn(e[n]/255)*255):e[n]=Zn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Cd=0;class rh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Cd++}),this.uuid=Kn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(wo(s[o].image)):r.push(wo(s[o]))}else r=wo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function wo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Rd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Pd=0;class qe extends Ts{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,n=zi,s=zi,r=Mn,o=Ui,a=Sn,l=Un,c=qe.DEFAULT_ANISOTROPY,u=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Pd++}),this.uuid=Kn(),this.name="",this.source=new rh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new $t(0,0),this.repeat=new $t(1,1),this.center=new $t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case io:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case ba:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case io:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case ba:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=qu;qe.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,s=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],p=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(p-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(p+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(c+1)/2,v=(f+1)/2,A=(h+1)/2,y=(u+d)/4,E=(p+x)/4,w=(g+m)/4;return S>v&&S>A?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=y/n,r=E/n):v>A?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=y/s,r=w/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=E/r,s=w/r),this.set(n,s,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(p-x)*(p-x)+(d-u)*(d-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(p-x)/b,this.z=(d-u)/b,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ld extends Ts{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Mn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new qe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new rh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends Ld{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class oh extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Id extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=an,this.minFilter=an,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ki{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],p=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=p;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(p!==x||l!==d||c!==f||u!==g){let m=1-a;const h=l*d+c*f+u*g+p*x,b=h>=0?1:-1,S=1-h*h;if(S>Number.EPSILON){const A=Math.sqrt(S),y=Math.atan2(A,h*b);m=Math.sin(m*y)/A,a=Math.sin(a*y)/A}const v=a*b;if(l=l*m+d*v,c=c*m+f*v,u=u*m+g*v,p=p*m+x*v,m===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+p*p);l*=A,c*=A,u*=A,p*=A}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],p=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*p+l*f-c*d,t[e+1]=l*g+u*d+c*p-a*f,t[e+2]=c*g+u*f+a*d-l*p,t[e+3]=u*g-a*p-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),p=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*u*p+c*f*g,this._y=c*f*p-d*u*g,this._z=c*u*g+d*f*p,this._w=c*u*p-d*f*g;break;case"YXZ":this._x=d*u*p+c*f*g,this._y=c*f*p-d*u*g,this._z=c*u*g-d*f*p,this._w=c*u*p+d*f*g;break;case"ZXY":this._x=d*u*p-c*f*g,this._y=c*f*p+d*u*g,this._z=c*u*g+d*f*p,this._w=c*u*p-d*f*g;break;case"ZYX":this._x=d*u*p-c*f*g,this._y=c*f*p+d*u*g,this._z=c*u*g-d*f*p,this._w=c*u*p+d*f*g;break;case"YZX":this._x=d*u*p+c*f*g,this._y=c*f*p+d*u*g,this._z=c*u*g-d*f*p,this._w=c*u*p-d*f*g;break;case"XZY":this._x=d*u*p-c*f*g,this._y=c*f*p-d*u*g,this._z=c*u*g+d*f*p,this._w=c*u*p+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],p=e[10],d=n+a+p;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>p){const f=2*Math.sqrt(1+n-a-p);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>p){const f=2*Math.sqrt(1+a-n-p);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+p-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),p=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=o*p+this._w*d,this._x=n*p+this._x*d,this._y=s*p+this._y*d,this._z=r*p+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(t=0,e=0,n=0){Q.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(oc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(oc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),u=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+l*c+o*p-a*u,this.y=n+l*u+a*c-r*p,this.z=s+l*p+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Eo.copy(this).projectOnVector(t),this.sub(Eo)}reflect(t){return this.sub(Eo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Xe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Eo=new Q,oc=new ki;class Fn{constructor(t=new Q(1/0,1/0,1/0),e=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(gn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(gn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=gn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,gn):gn.fromBufferAttribute(r,o),gn.applyMatrix4(t.matrixWorld),this.expandByPoint(gn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ur.copy(n.boundingBox)),ur.applyMatrix4(t.matrixWorld),this.union(ur)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,gn),gn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ds),hr.subVectors(this.max,Ds),Xi.subVectors(t.a,Ds),qi.subVectors(t.b,Ds),$i.subVectors(t.c,Ds),ei.subVectors(qi,Xi),ni.subVectors($i,qi),Si.subVectors(Xi,$i);let e=[0,-ei.z,ei.y,0,-ni.z,ni.y,0,-Si.z,Si.y,ei.z,0,-ei.x,ni.z,0,-ni.x,Si.z,0,-Si.x,-ei.y,ei.x,0,-ni.y,ni.x,0,-Si.y,Si.x,0];return!To(e,Xi,qi,$i,hr)||(e=[1,0,0,0,1,0,0,0,1],!To(e,Xi,qi,$i,hr))?!1:(fr.crossVectors(ei,ni),e=[fr.x,fr.y,fr.z],To(e,Xi,qi,$i,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,gn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(gn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const kn=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],gn=new Q,ur=new Fn,Xi=new Q,qi=new Q,$i=new Q,ei=new Q,ni=new Q,Si=new Q,Ds=new Q,hr=new Q,fr=new Q,bi=new Q;function To(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){bi.fromArray(i,r);const a=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=t.dot(bi),c=e.dot(bi),u=n.dot(bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Dd=new Fn,zs=new Q,Ao=new Q;class yi{constructor(t=new Q,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Dd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zs.subVectors(t,this.center);const e=zs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(zs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ao.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zs.copy(t.center).add(Ao)),this.expandByPoint(zs.copy(t.center).sub(Ao))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new Q,Ro=new Q,dr=new Q,ii=new Q,Co=new Q,pr=new Q,Po=new Q;class xl{constructor(t=new Q,e=new Q(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Bn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Bn.copy(this.origin).addScaledVector(this.direction,e),Bn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ro.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),ii.copy(this.origin).sub(Ro);const r=t.distanceTo(e)*.5,o=-this.direction.dot(dr),a=ii.dot(this.direction),l=-ii.dot(dr),c=ii.lengthSq(),u=Math.abs(1-o*o);let p,d,f,g;if(u>0)if(p=o*l-a,d=o*a-l,g=r*u,p>=0)if(d>=-g)if(d<=g){const x=1/u;p*=x,d*=x,f=p*(p+o*d+2*a)+d*(o*p+d+2*l)+c}else d=r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*l)+c;else d=-r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*l)+c;else d<=-g?(p=Math.max(0,-(-o*r+a)),d=p>0?-r:Math.min(Math.max(-r,-l),r),f=-p*p+d*(d+2*l)+c):d<=g?(p=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(p=Math.max(0,-(o*r+a)),d=p>0?r:Math.min(Math.max(-r,-l),r),f=-p*p+d*(d+2*l)+c);else d=o>0?-r:r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(Ro).addScaledVector(dr,d),f}intersectSphere(t,e){Bn.subVectors(t.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-d.z)*p,l=(t.max.z-d.z)*p):(a=(t.max.z-d.z)*p,l=(t.min.z-d.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Bn)!==null}intersectTriangle(t,e,n,s,r){Co.subVectors(e,t),pr.subVectors(n,t),Po.crossVectors(Co,pr);let o=this.direction.dot(Po),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ii.subVectors(this.origin,t);const l=a*this.direction.dot(pr.crossVectors(ii,pr));if(l<0)return null;const c=a*this.direction.dot(Co.cross(ii));if(c<0||l+c>o)return null;const u=-a*ii.dot(Po);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,n,s,r,o,a,l,c,u,p,d,f,g,x,m){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,u,p,d,f,g,x,m)}set(t,e,n,s,r,o,a,l,c,u,p,d,f,g,x,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=p,h[14]=d,h[3]=f,h[7]=g,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Yi.setFromMatrixColumn(t,0).length(),r=1/Yi.setFromMatrixColumn(t,1).length(),o=1/Yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){const d=o*u,f=o*p,g=a*u,x=a*p;e[0]=l*u,e[4]=-l*p,e[8]=c,e[1]=f+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*u,f=l*p,g=c*u,x=c*p;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*p,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*u,f=l*p,g=c*u,x=c*p;e[0]=d-x*a,e[4]=-o*p,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*u,f=o*p,g=a*u,x=a*p;e[0]=l*u,e[4]=g*c-f,e[8]=d*c+x,e[1]=l*p,e[5]=x*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=x-d*p,e[8]=g*p+f,e[1]=p,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*p+g,e[10]=d-x*p}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=-p,e[8]=c*u,e[1]=d*p+x,e[5]=o*u,e[9]=f*p-g,e[2]=g*p-f,e[6]=a*u,e[10]=x*p+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(zd,t,Ud)}lookAt(t,e,n){const s=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),si.crossVectors(n,tn),si.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),si.crossVectors(n,tn)),si.normalize(),mr.crossVectors(tn,si),s[0]=si.x,s[4]=mr.x,s[8]=tn.x,s[1]=si.y,s[5]=mr.y,s[9]=tn.y,s[2]=si.z,s[6]=mr.z,s[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],p=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],h=n[14],b=n[3],S=n[7],v=n[11],A=n[15],y=s[0],E=s[4],w=s[8],M=s[12],_=s[1],T=s[5],D=s[9],k=s[13],V=s[2],X=s[6],G=s[10],H=s[14],B=s[3],tt=s[7],ut=s[11],rt=s[15];return r[0]=o*y+a*_+l*V+c*B,r[4]=o*E+a*T+l*X+c*tt,r[8]=o*w+a*D+l*G+c*ut,r[12]=o*M+a*k+l*H+c*rt,r[1]=u*y+p*_+d*V+f*B,r[5]=u*E+p*T+d*X+f*tt,r[9]=u*w+p*D+d*G+f*ut,r[13]=u*M+p*k+d*H+f*rt,r[2]=g*y+x*_+m*V+h*B,r[6]=g*E+x*T+m*X+h*tt,r[10]=g*w+x*D+m*G+h*ut,r[14]=g*M+x*k+m*H+h*rt,r[3]=b*y+S*_+v*V+A*B,r[7]=b*E+S*T+v*X+A*tt,r[11]=b*w+S*D+v*G+A*ut,r[15]=b*M+S*k+v*H+A*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],p=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],h=t[15];return g*(+r*l*p-s*c*p-r*a*d+n*c*d+s*a*f-n*l*f)+x*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*u-r*l*u)+m*(+e*c*p-e*a*f-r*o*p+n*o*f+r*a*u-n*c*u)+h*(-s*a*u-e*l*p+e*a*d+s*o*p-n*o*d+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],p=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],h=t[15],b=p*m*c-x*d*c+x*l*f-a*m*f-p*l*h+a*d*h,S=g*d*c-u*m*c-g*l*f+o*m*f+u*l*h-o*d*h,v=u*x*c-g*p*c+g*a*f-o*x*f-u*a*h+o*p*h,A=g*p*l-u*x*l-g*a*d+o*x*d+u*a*m-o*p*m,y=e*b+n*S+s*v+r*A;if(y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/y;return t[0]=b*E,t[1]=(x*d*r-p*m*r-x*s*f+n*m*f+p*s*h-n*d*h)*E,t[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*h+n*l*h)*E,t[3]=(p*l*r-a*d*r-p*s*c+n*d*c+a*s*f-n*l*f)*E,t[4]=S*E,t[5]=(u*m*r-g*d*r+g*s*f-e*m*f-u*s*h+e*d*h)*E,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*h-e*l*h)*E,t[7]=(o*d*r-u*l*r+u*s*c-e*d*c-o*s*f+e*l*f)*E,t[8]=v*E,t[9]=(g*p*r-u*x*r-g*n*f+e*x*f+u*n*h-e*p*h)*E,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*h+e*a*h)*E,t[11]=(u*a*r-o*p*r-u*n*c+e*p*c+o*n*f-e*a*f)*E,t[12]=A*E,t[13]=(u*x*s-g*p*s+g*n*d-e*x*d-u*n*m+e*p*m)*E,t[14]=(g*a*s-o*x*s-g*n*l+e*x*l+o*n*m-e*a*m)*E,t[15]=(o*p*s-u*a*s+u*n*l-e*p*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,p=a+a,d=r*c,f=r*u,g=r*p,x=o*u,m=o*p,h=a*p,b=l*c,S=l*u,v=l*p,A=n.x,y=n.y,E=n.z;return s[0]=(1-(x+h))*A,s[1]=(f+v)*A,s[2]=(g-S)*A,s[3]=0,s[4]=(f-v)*y,s[5]=(1-(d+h))*y,s[6]=(m+b)*y,s[7]=0,s[8]=(g+S)*E,s[9]=(m-b)*E,s[10]=(1-(d+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Yi.set(s[0],s[1],s[2]).length();const o=Yi.set(s[4],s[5],s[6]).length(),a=Yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],xn.copy(this);const c=1/r,u=1/o,p=1/a;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=u,xn.elements[5]*=u,xn.elements[6]*=u,xn.elements[8]*=p,xn.elements[9]*=p,xn.elements[10]*=p,e.setFromRotationMatrix(xn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=$n){const l=this.elements,c=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===$n)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===so)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=$n){const l=this.elements,c=1/(e-t),u=1/(n-s),p=1/(o-r),d=(e+t)*c,f=(n+s)*u;let g,x;if(a===$n)g=(o+r)*p,x=-2*p;else if(a===so)g=r*p,x=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Yi=new Q,xn=new ae,zd=new Q(0,0,0),Ud=new Q(1,1,1),si=new Q,mr=new Q,tn=new Q,ac=new ae,lc=new ki;class Nn{constructor(t=0,e=0,n=0,s=Nn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],p=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ac.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ac,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return lc.setFromEuler(this),this.setFromQuaternion(lc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nn.DEFAULT_ORDER="XYZ";class vl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Nd=0;const cc=new Q,ji=new ki,Gn=new ae,gr=new Q,Us=new Q,Fd=new Q,Od=new ki,uc=new Q(1,0,0),hc=new Q(0,1,0),fc=new Q(0,0,1),dc={type:"added"},kd={type:"removed"},Ki={type:"childadded",child:null},Lo={type:"childremoved",child:null};class Ue extends Ts{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=Kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ue.DEFAULT_UP.clone();const t=new Q,e=new Nn,n=new ki,s=new Q(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new te}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=Ue.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ji.setFromAxisAngle(t,e),this.quaternion.multiply(ji),this}rotateOnWorldAxis(t,e){return ji.setFromAxisAngle(t,e),this.quaternion.premultiply(ji),this}rotateX(t){return this.rotateOnAxis(uc,t)}rotateY(t){return this.rotateOnAxis(hc,t)}rotateZ(t){return this.rotateOnAxis(fc,t)}translateOnAxis(t,e){return cc.copy(t).applyQuaternion(this.quaternion),this.position.add(cc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(uc,t)}translateY(t){return this.translateOnAxis(hc,t)}translateZ(t){return this.translateOnAxis(fc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Gn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?gr.copy(t):gr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gn.lookAt(Us,gr,this.up):Gn.lookAt(gr,Us,this.up),this.quaternion.setFromRotationMatrix(Gn),s&&(Gn.extractRotation(s.matrixWorld),ji.setFromRotationMatrix(Gn),this.quaternion.premultiply(ji.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(dc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(kd),Lo.child=t,this.dispatchEvent(Lo),Lo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Gn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Gn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Gn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(dc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,t,Fd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,Od,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),p=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ue.DEFAULT_UP=new Q(0,1,0);Ue.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ue.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new Q,Hn=new Q,Io=new Q,Vn=new Q,Zi=new Q,Ji=new Q,pc=new Q,Do=new Q,zo=new Q,Uo=new Q,No=new oe,Fo=new oe,Oo=new oe;class hn{constructor(t=new Q,e=new Q,n=new Q){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),vn.subVectors(t,e),s.cross(vn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){vn.subVectors(s,e),Hn.subVectors(n,e),Io.subVectors(t,e);const o=vn.dot(vn),a=vn.dot(Hn),l=vn.dot(Io),c=Hn.dot(Hn),u=Hn.dot(Io),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;const d=1/p,f=(c*l-a*u)*d,g=(o*u-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Vn)===null?!1:Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Vn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Vn.x),l.addScaledVector(o,Vn.y),l.addScaledVector(a,Vn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return No.setScalar(0),Fo.setScalar(0),Oo.setScalar(0),No.fromBufferAttribute(t,e),Fo.fromBufferAttribute(t,n),Oo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(No,r.x),o.addScaledVector(Fo,r.y),o.addScaledVector(Oo,r.z),o}static isFrontFacing(t,e,n,s){return vn.subVectors(n,e),Hn.subVectors(t,e),vn.cross(Hn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return vn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),vn.cross(Hn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Zi.subVectors(s,n),Ji.subVectors(r,n),Do.subVectors(t,n);const l=Zi.dot(Do),c=Ji.dot(Do);if(l<=0&&c<=0)return e.copy(n);zo.subVectors(t,s);const u=Zi.dot(zo),p=Ji.dot(zo);if(u>=0&&p<=u)return e.copy(s);const d=l*p-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Zi,o);Uo.subVectors(t,r);const f=Zi.dot(Uo),g=Ji.dot(Uo);if(g>=0&&f<=g)return e.copy(r);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Ji,a);const m=u*g-f*p;if(m<=0&&p-u>=0&&f-g>=0)return pc.subVectors(r,s),a=(p-u)/(p-u+(f-g)),e.copy(s).addScaledVector(pc,a);const h=1/(m+x+d);return o=x*h,a=d*h,e.copy(n).addScaledVector(Zi,o).addScaledVector(Ji,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const ah={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},xr={h:0,s:0,l:0};function ko(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=gl(t,1),e=Xe(e,0,1),n=Xe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ko(o,r,t+1/3),this.g=ko(o,r,t),this.b=ko(o,r,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=sn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){const n=ah[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=ms(t.r),this.g=ms(t.g),this.b=ms(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return re.fromWorkingColorSpace(We.copy(this),t),Math.round(Xe(We.r*255,0,255))*65536+Math.round(Xe(We.g*255,0,255))*256+Math.round(Xe(We.b*255,0,255))}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(We.copy(this),e);const n=We.r,s=We.g,r=We.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const p=o-a;switch(c=u<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=sn){re.fromWorkingColorSpace(We.copy(this),t);const e=We.r,n=We.g,s=We.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(xr);const n=Zs(ri.h,xr.h,e),s=Zs(ri.s,xr.s,e),r=Zs(ri.l,xr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const We=new Ht;Ht.NAMES=ah;let Bd=0;class As extends Ts{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=Kn(),this.name="",this.blending=fs,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fa,this.blendDst=da,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fa&&(n.blendSrc=this.blendSrc),this.blendDst!==da&&(n.blendDst=this.blendDst),this.blendEquation!==Ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==gs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class be extends As{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new Q,vr=new $t;class Me{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ka,this.updateRanges=[],this.gpuType=Dn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)vr.fromBufferAttribute(this,e),vr.applyMatrix3(t),this.setXY(e,vr.x,vr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=yn(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=yn(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=yn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=yn(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ka&&(t.usage=this.usage),t}}class lh extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ch extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ne extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Gd=0;const cn=new ae,Bo=new Ue,Qi=new Q,en=new Fn,Ns=new Fn,Le=new Q;class pe extends Ts{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=Kn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(sh(t)?ch:lh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new te().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return cn.makeRotationFromQuaternion(t),this.applyMatrix4(cn),this}rotateX(t){return cn.makeRotationX(t),this.applyMatrix4(cn),this}rotateY(t){return cn.makeRotationY(t),this.applyMatrix4(cn),this}rotateZ(t){return cn.makeRotationZ(t),this.applyMatrix4(cn),this}translate(t,e,n){return cn.makeTranslation(t,e,n),this.applyMatrix4(cn),this}scale(t,e,n){return cn.makeScale(t,e,n),this.applyMatrix4(cn),this}lookAt(t){return Bo.lookAt(t),Bo.updateMatrix(),this.applyMatrix4(Bo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ne(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Le.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Le),Le.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Le)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ns.setFromBufferAttribute(a),this.morphTargetsRelative?(Le.addVectors(en.min,Ns.min),en.expandByPoint(Le),Le.addVectors(en.max,Ns.max),en.expandByPoint(Le)):(en.expandByPoint(Ns.min),en.expandByPoint(Ns.max))}en.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Le.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Le));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Le.fromBufferAttribute(a,c),l&&(Qi.fromBufferAttribute(t,c),Le.add(Qi)),s=Math.max(s,n.distanceToSquared(Le))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let w=0;w<n.count;w++)a[w]=new Q,l[w]=new Q;const c=new Q,u=new Q,p=new Q,d=new $t,f=new $t,g=new $t,x=new Q,m=new Q;function h(w,M,_){c.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),p.fromBufferAttribute(n,_),d.fromBufferAttribute(r,w),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,_),u.sub(c),p.sub(c),f.sub(d),g.sub(d);const T=1/(f.x*g.y-g.x*f.y);isFinite(T)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(p,-f.y).multiplyScalar(T),m.copy(p).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(T),a[w].add(x),a[M].add(x),a[_].add(x),l[w].add(m),l[M].add(m),l[_].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let w=0,M=b.length;w<M;++w){const _=b[w],T=_.start,D=_.count;for(let k=T,V=T+D;k<V;k+=3)h(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const S=new Q,v=new Q,A=new Q,y=new Q;function E(w){A.fromBufferAttribute(s,w),y.copy(A);const M=a[w];S.copy(M),S.sub(A.multiplyScalar(A.dot(M))).normalize(),v.crossVectors(y,M);const T=v.dot(l[w])<0?-1:1;o.setXYZW(w,S.x,S.y,S.z,T)}for(let w=0,M=b.length;w<M;++w){const _=b[w],T=_.start,D=_.count;for(let k=T,V=T+D;k<V;k+=3)E(t.getX(k+0)),E(t.getX(k+1)),E(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new Q,r=new Q,o=new Q,a=new Q,l=new Q,c=new Q,u=new Q,p=new Q;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Le.fromBufferAttribute(t,e),Le.normalize(),t.setXYZ(e,Le.x,Le.y,Le.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,p=a.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let h=0;h<u;h++)d[g++]=c[f++]}return new Me(d,u,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,p=c.length;u<p;u++){const d=c[u],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let p=0,d=c.length;p<d;p++){const f=c[p];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],p=r[c];for(let d=0,f=p.length;d<f;d++)u.push(p[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const mc=new ae,wi=new xl,_r=new yi,gc=new Q,yr=new Q,Mr=new Q,Sr=new Q,Go=new Q,br=new Q,xc=new Q,wr=new Q;class Kt extends Ue{constructor(t=new pe,e=new be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],p=r[l];u!==0&&(Go.fromBufferAttribute(p,t),o?br.addScaledVector(Go,u):br.addScaledVector(Go.sub(e),u))}e.add(br)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),wi.copy(t.ray).recast(t.near),!(_r.containsPoint(wi.origin)===!1&&(wi.intersectSphere(_r,gc)===null||wi.origin.distanceToSquared(gc)>(t.far-t.near)**2))&&(mc.copy(r).invert(),wi.copy(t.ray).applyMatrix4(mc),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,wi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],h=o[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,A=S;v<A;v+=3){const y=a.getX(v),E=a.getX(v+1),w=a.getX(v+2);s=Er(this,h,t,n,c,u,p,y,E,w),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,h=x;m<h;m+=3){const b=a.getX(m),S=a.getX(m+1),v=a.getX(m+2);s=Er(this,o,t,n,c,u,p,b,S,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],h=o[m.materialIndex],b=Math.max(m.start,f.start),S=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=b,A=S;v<A;v+=3){const y=v,E=v+1,w=v+2;s=Er(this,h,t,n,c,u,p,y,E,w),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,h=x;m<h;m+=3){const b=m,S=m+1,v=m+2;s=Er(this,o,t,n,c,u,p,b,S,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Hd(i,t,e,n,s,r,o,a){let l;if(t.side===Je?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===vi,a),l===null)return null;wr.copy(a),wr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(wr);return c<e.near||c>e.far?null:{distance:c,point:wr.clone(),object:i}}function Er(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,yr),i.getVertexPosition(l,Mr),i.getVertexPosition(c,Sr);const u=Hd(i,t,e,n,yr,Mr,Sr,xc);if(u){const p=new Q;hn.getBarycoord(xc,yr,Mr,Sr,p),s&&(u.uv=hn.getInterpolatedAttribute(s,a,l,c,p,new $t)),r&&(u.uv1=hn.getInterpolatedAttribute(r,a,l,c,p,new $t)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,l,c,p,new Q),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new Q,materialIndex:0};hn.getNormal(yr,Mr,Sr,d.normal),u.face=d,u.barycoord=p}return u}class bn extends pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],p=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(u,3)),this.setAttribute("uv",new ne(p,2));function g(x,m,h,b,S,v,A,y,E,w,M){const _=v/E,T=A/w,D=v/2,k=A/2,V=y/2,X=E+1,G=w+1;let H=0,B=0;const tt=new Q;for(let ut=0;ut<G;ut++){const rt=ut*T-k;for(let At=0;At<X;At++){const Ct=At*_-D;tt[x]=Ct*b,tt[m]=rt*S,tt[h]=V,c.push(tt.x,tt.y,tt.z),tt[x]=0,tt[m]=0,tt[h]=y>0?1:-1,u.push(tt.x,tt.y,tt.z),p.push(At/E),p.push(1-ut/w),H+=1}}for(let ut=0;ut<w;ut++)for(let rt=0;rt<E;rt++){const At=d+rt+X*ut,Ct=d+rt+X*(ut+1),lt=d+(rt+1)+X*(ut+1),wt=d+(rt+1)+X*ut;l.push(At,Ct,wt),l.push(Ct,lt,wt),B+=6}a.addGroup(f,B,M),f+=B,d+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ms(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ye(i){const t={};for(let e=0;e<i.length;e++){const n=Ms(i[e]);for(const s in n)t[s]=n[s]}return t}function Vd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function uh(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const _i={clone:Ms,merge:Ye};var Wd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Xd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Re extends As{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Wd,this.fragmentShader=Xd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ms(t.uniforms),this.uniformsGroups=Vd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class hh extends Ue{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=$n}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const oi=new Q,vc=new $t,_c=new $t;class rn extends hh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(oi.x,oi.y).multiplyScalar(-t/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-t/oi.z)}getViewSize(t,e){return this.getViewBounds(t,vc,_c),e.subVectors(_c,vc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ps*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ts=-90,es=1;class qd extends Ue{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(ts,es,t,e);s.layers=this.layers,this.add(s);const r=new rn(ts,es,t,e);r.layers=this.layers,this.add(r);const o=new rn(ts,es,t,e);o.layers=this.layers,this.add(o);const a=new rn(ts,es,t,e);a.layers=this.layers,this.add(a);const l=new rn(ts,es,t,e);l.layers=this.layers,this.add(l);const c=new rn(ts,es,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===$n)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===so)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,p=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(p,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class fh extends qe{constructor(t,e,n,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:xs,super(t,e,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class $d extends dn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new fh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Mn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new bn(5,5,5),r=new Re({name:"CubemapFromEquirect",uniforms:Ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:jn});r.uniforms.tEquirect.value=e;const o=new Kt(s,r),a=e.minFilter;return e.minFilter===Ui&&(e.minFilter=Mn),new qd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Ho=new Q,Yd=new Q,jd=new te;class hi{constructor(t=new Q(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ho.subVectors(n,e).cross(Yd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ho),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||jd.getNormalMatrix(t),s=this.coplanarPoint(Ho).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new yi,Tr=new Q;class _l{constructor(t=new hi,e=new hi,n=new hi,s=new hi,r=new hi,o=new hi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=$n){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],p=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],h=s[12],b=s[13],S=s[14],v=s[15];if(n[0].setComponents(l-r,d-c,m-f,v-h).normalize(),n[1].setComponents(l+r,d+c,m+f,v+h).normalize(),n[2].setComponents(l+o,d+u,m+g,v+b).normalize(),n[3].setComponents(l-o,d-u,m-g,v-b).normalize(),n[4].setComponents(l-a,d-p,m-x,v-S).normalize(),e===$n)n[5].setComponents(l+a,d+p,m+x,v+S).normalize();else if(e===so)n[5].setComponents(a,p,x,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){return Ei.center.set(0,0,0),Ei.radius=.7071067811865476,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Tr.x=s.normal.x>0?t.max.x:t.min.x,Tr.y=s.normal.y>0?t.max.y:t.min.y,Tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function dh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Kd(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,p=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,c){const u=l.array,p=l.updateRanges;if(i.bindBuffer(c,a),p.length===0)i.bufferSubData(c,0,u);else{p.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<p.length;f++){const g=p[d],x=p[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,p[d]=x)}p.length=d+1;for(let f=0,g=p.length;f<g;f++){const x=p[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Bi extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,p=t/a,d=e/l,f=[],g=[],x=[],m=[];for(let h=0;h<u;h++){const b=h*d-o;for(let S=0;S<c;S++){const v=S*p-r;g.push(v,-b,0),x.push(0,0,1),m.push(S/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let b=0;b<a;b++){const S=b+c*h,v=b+c*(h+1),A=b+1+c*(h+1),y=b+1+c*h;f.push(S,v,y),f.push(v,A,y)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(x,3)),this.setAttribute("uv",new ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bi(t.width,t.height,t.widthSegments,t.heightSegments)}}var Zd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Qd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,tp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ep=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,np=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ip=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,sp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,op=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ap=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,up=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,hp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,fp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,vp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,yp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Mp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Sp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,bp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ep=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ap="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Cp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Lp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ip=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Dp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Up=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Np=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Fp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Op=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,kp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Bp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Hp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Vp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Wp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,qp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$p=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yp=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,jp=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kp=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Jp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Qp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,em=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,nm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,im=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,sm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,om=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,lm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,um=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,hm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,fm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,dm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,pm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,mm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,gm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,_m=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ym=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Em=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Tm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Am=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Pm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Lm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Im=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Dm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Um=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Nm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Om=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,km=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Bm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Gm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Hm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vm=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Xm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ym=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,jm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Km=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Zm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ng=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ig=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,sg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,rg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,cg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ug=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,hg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,mg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,xg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,vg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_g=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Mg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Eg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Tg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ag=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Rg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ee={alphahash_fragment:Zd,alphahash_pars_fragment:Jd,alphamap_fragment:Qd,alphamap_pars_fragment:tp,alphatest_fragment:ep,alphatest_pars_fragment:np,aomap_fragment:ip,aomap_pars_fragment:sp,batching_pars_vertex:rp,batching_vertex:op,begin_vertex:ap,beginnormal_vertex:lp,bsdfs:cp,iridescence_fragment:up,bumpmap_pars_fragment:hp,clipping_planes_fragment:fp,clipping_planes_pars_fragment:dp,clipping_planes_pars_vertex:pp,clipping_planes_vertex:mp,color_fragment:gp,color_pars_fragment:xp,color_pars_vertex:vp,color_vertex:_p,common:yp,cube_uv_reflection_fragment:Mp,defaultnormal_vertex:Sp,displacementmap_pars_vertex:bp,displacementmap_vertex:wp,emissivemap_fragment:Ep,emissivemap_pars_fragment:Tp,colorspace_fragment:Ap,colorspace_pars_fragment:Rp,envmap_fragment:Cp,envmap_common_pars_fragment:Pp,envmap_pars_fragment:Lp,envmap_pars_vertex:Ip,envmap_physical_pars_fragment:Vp,envmap_vertex:Dp,fog_vertex:zp,fog_pars_vertex:Up,fog_fragment:Np,fog_pars_fragment:Fp,gradientmap_pars_fragment:Op,lightmap_pars_fragment:kp,lights_lambert_fragment:Bp,lights_lambert_pars_fragment:Gp,lights_pars_begin:Hp,lights_toon_fragment:Wp,lights_toon_pars_fragment:Xp,lights_phong_fragment:qp,lights_phong_pars_fragment:$p,lights_physical_fragment:Yp,lights_physical_pars_fragment:jp,lights_fragment_begin:Kp,lights_fragment_maps:Zp,lights_fragment_end:Jp,logdepthbuf_fragment:Qp,logdepthbuf_pars_fragment:tm,logdepthbuf_pars_vertex:em,logdepthbuf_vertex:nm,map_fragment:im,map_pars_fragment:sm,map_particle_fragment:rm,map_particle_pars_fragment:om,metalnessmap_fragment:am,metalnessmap_pars_fragment:lm,morphinstance_vertex:cm,morphcolor_vertex:um,morphnormal_vertex:hm,morphtarget_pars_vertex:fm,morphtarget_vertex:dm,normal_fragment_begin:pm,normal_fragment_maps:mm,normal_pars_fragment:gm,normal_pars_vertex:xm,normal_vertex:vm,normalmap_pars_fragment:_m,clearcoat_normal_fragment_begin:ym,clearcoat_normal_fragment_maps:Mm,clearcoat_pars_fragment:Sm,iridescence_pars_fragment:bm,opaque_fragment:wm,packing:Em,premultiplied_alpha_fragment:Tm,project_vertex:Am,dithering_fragment:Rm,dithering_pars_fragment:Cm,roughnessmap_fragment:Pm,roughnessmap_pars_fragment:Lm,shadowmap_pars_fragment:Im,shadowmap_pars_vertex:Dm,shadowmap_vertex:zm,shadowmask_pars_fragment:Um,skinbase_vertex:Nm,skinning_pars_vertex:Fm,skinning_vertex:Om,skinnormal_vertex:km,specularmap_fragment:Bm,specularmap_pars_fragment:Gm,tonemapping_fragment:Hm,tonemapping_pars_fragment:Vm,transmission_fragment:Wm,transmission_pars_fragment:Xm,uv_pars_fragment:qm,uv_pars_vertex:$m,uv_vertex:Ym,worldpos_vertex:jm,background_vert:Km,background_frag:Zm,backgroundCube_vert:Jm,backgroundCube_frag:Qm,cube_vert:tg,cube_frag:eg,depth_vert:ng,depth_frag:ig,distanceRGBA_vert:sg,distanceRGBA_frag:rg,equirect_vert:og,equirect_frag:ag,linedashed_vert:lg,linedashed_frag:cg,meshbasic_vert:ug,meshbasic_frag:hg,meshlambert_vert:fg,meshlambert_frag:dg,meshmatcap_vert:pg,meshmatcap_frag:mg,meshnormal_vert:gg,meshnormal_frag:xg,meshphong_vert:vg,meshphong_frag:_g,meshphysical_vert:yg,meshphysical_frag:Mg,meshtoon_vert:Sg,meshtoon_frag:bg,points_vert:wg,points_frag:Eg,shadow_vert:Tg,shadow_frag:Ag,sprite_vert:Rg,sprite_frag:Cg},Ft={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},envMapRotation:{value:new te},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new $t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new $t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},Ze={basic:{uniforms:Ye([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:ee.meshbasic_vert,fragmentShader:ee.meshbasic_frag},lambert:{uniforms:Ye([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)}}]),vertexShader:ee.meshlambert_vert,fragmentShader:ee.meshlambert_frag},phong:{uniforms:Ye([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:ee.meshphong_vert,fragmentShader:ee.meshphong_frag},standard:{uniforms:Ye([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag},toon:{uniforms:Ye([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)}}]),vertexShader:ee.meshtoon_vert,fragmentShader:ee.meshtoon_frag},matcap:{uniforms:Ye([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:ee.meshmatcap_vert,fragmentShader:ee.meshmatcap_frag},points:{uniforms:Ye([Ft.points,Ft.fog]),vertexShader:ee.points_vert,fragmentShader:ee.points_frag},dashed:{uniforms:Ye([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ee.linedashed_vert,fragmentShader:ee.linedashed_frag},depth:{uniforms:Ye([Ft.common,Ft.displacementmap]),vertexShader:ee.depth_vert,fragmentShader:ee.depth_frag},normal:{uniforms:Ye([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:ee.meshnormal_vert,fragmentShader:ee.meshnormal_frag},sprite:{uniforms:Ye([Ft.sprite,Ft.fog]),vertexShader:ee.sprite_vert,fragmentShader:ee.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ee.background_vert,fragmentShader:ee.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new te}},vertexShader:ee.backgroundCube_vert,fragmentShader:ee.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ee.cube_vert,fragmentShader:ee.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ee.equirect_vert,fragmentShader:ee.equirect_frag},distanceRGBA:{uniforms:Ye([Ft.common,Ft.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ee.distanceRGBA_vert,fragmentShader:ee.distanceRGBA_frag},shadow:{uniforms:Ye([Ft.lights,Ft.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:ee.shadow_vert,fragmentShader:ee.shadow_frag}};Ze.physical={uniforms:Ye([Ze.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new $t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new $t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new $t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:ee.meshphysical_vert,fragmentShader:ee.meshphysical_frag};const Ar={r:0,b:0,g:0},Ti=new Nn,Pg=new ae;function Lg(i,t,e,n,s,r,o){const a=new Ht(0);let l=r===!0?0:1,c,u,p=null,d=0,f=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function x(b){let S=!1;const v=g(b);v===null?h(a,l):v&&v.isColor&&(h(v,1),S=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,S){const v=g(S);v&&(v.isCubeTexture||v.mapping===ao)?(u===void 0&&(u=new Kt(new bn(1,1,1),new Re({name:"BackgroundCubeMaterial",uniforms:Ms(Ze.backgroundCube.uniforms),vertexShader:Ze.backgroundCube.vertexShader,fragmentShader:Ze.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(A,y,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ti.copy(S.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Pg.makeRotationFromEuler(Ti)),u.material.toneMapped=re.getTransfer(v.colorSpace)!==fe,(p!==v||d!==v.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,p=v,d=v.version,f=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Kt(new Bi(2,2),new Re({name:"BackgroundMaterial",uniforms:Ms(Ze.background.uniforms),vertexShader:Ze.background.vertexShader,fragmentShader:Ze.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=re.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(p!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,p=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function h(b,S){b.getRGB(Ar,uh(i)),n.buffers.color.setClear(Ar.r,Ar.g,Ar.b,S,o)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),l=S,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,h(a,l)},render:x,addToRenderList:m}}function Ig(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(_,T,D,k,V){let X=!1;const G=p(k,D,T);r!==G&&(r=G,c(r.object)),X=f(_,k,D,V),X&&g(_,k,D,V),V!==null&&t.update(V,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(_,T,D,k),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return i.createVertexArray()}function c(_){return i.bindVertexArray(_)}function u(_){return i.deleteVertexArray(_)}function p(_,T,D){const k=D.wireframe===!0;let V=n[_.id];V===void 0&&(V={},n[_.id]=V);let X=V[T.id];X===void 0&&(X={},V[T.id]=X);let G=X[k];return G===void 0&&(G=d(l()),X[k]=G),G}function d(_){const T=[],D=[],k=[];for(let V=0;V<e;V++)T[V]=0,D[V]=0,k[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:T,enabledAttributes:D,attributeDivisors:k,object:_,attributes:{},index:null}}function f(_,T,D,k){const V=r.attributes,X=T.attributes;let G=0;const H=D.getAttributes();for(const B in H)if(H[B].location>=0){const ut=V[B];let rt=X[B];if(rt===void 0&&(B==="instanceMatrix"&&_.instanceMatrix&&(rt=_.instanceMatrix),B==="instanceColor"&&_.instanceColor&&(rt=_.instanceColor)),ut===void 0||ut.attribute!==rt||rt&&ut.data!==rt.data)return!0;G++}return r.attributesNum!==G||r.index!==k}function g(_,T,D,k){const V={},X=T.attributes;let G=0;const H=D.getAttributes();for(const B in H)if(H[B].location>=0){let ut=X[B];ut===void 0&&(B==="instanceMatrix"&&_.instanceMatrix&&(ut=_.instanceMatrix),B==="instanceColor"&&_.instanceColor&&(ut=_.instanceColor));const rt={};rt.attribute=ut,ut&&ut.data&&(rt.data=ut.data),V[B]=rt,G++}r.attributes=V,r.attributesNum=G,r.index=k}function x(){const _=r.newAttributes;for(let T=0,D=_.length;T<D;T++)_[T]=0}function m(_){h(_,0)}function h(_,T){const D=r.newAttributes,k=r.enabledAttributes,V=r.attributeDivisors;D[_]=1,k[_]===0&&(i.enableVertexAttribArray(_),k[_]=1),V[_]!==T&&(i.vertexAttribDivisor(_,T),V[_]=T)}function b(){const _=r.newAttributes,T=r.enabledAttributes;for(let D=0,k=T.length;D<k;D++)T[D]!==_[D]&&(i.disableVertexAttribArray(D),T[D]=0)}function S(_,T,D,k,V,X,G){G===!0?i.vertexAttribIPointer(_,T,D,V,X):i.vertexAttribPointer(_,T,D,k,V,X)}function v(_,T,D,k){x();const V=k.attributes,X=D.getAttributes(),G=T.defaultAttributeValues;for(const H in X){const B=X[H];if(B.location>=0){let tt=V[H];if(tt===void 0&&(H==="instanceMatrix"&&_.instanceMatrix&&(tt=_.instanceMatrix),H==="instanceColor"&&_.instanceColor&&(tt=_.instanceColor)),tt!==void 0){const ut=tt.normalized,rt=tt.itemSize,At=t.get(tt);if(At===void 0)continue;const Ct=At.buffer,lt=At.type,wt=At.bytesPerElement,zt=lt===i.INT||lt===i.UNSIGNED_INT||tt.gpuType===ul;if(tt.isInterleavedBufferAttribute){const xt=tt.data,Ut=xt.stride,L=tt.offset;if(xt.isInstancedInterleavedBuffer){for(let q=0;q<B.locationSize;q++)h(B.location+q,xt.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let q=0;q<B.locationSize;q++)m(B.location+q);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let q=0;q<B.locationSize;q++)S(B.location+q,rt/B.locationSize,lt,ut,Ut*wt,(L+rt/B.locationSize*q)*wt,zt)}else{if(tt.isInstancedBufferAttribute){for(let xt=0;xt<B.locationSize;xt++)h(B.location+xt,tt.meshPerAttribute);_.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let xt=0;xt<B.locationSize;xt++)m(B.location+xt);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let xt=0;xt<B.locationSize;xt++)S(B.location+xt,rt/B.locationSize,lt,ut,rt*wt,rt/B.locationSize*xt*wt,zt)}}else if(G!==void 0){const ut=G[H];if(ut!==void 0)switch(ut.length){case 2:i.vertexAttrib2fv(B.location,ut);break;case 3:i.vertexAttrib3fv(B.location,ut);break;case 4:i.vertexAttrib4fv(B.location,ut);break;default:i.vertexAttrib1fv(B.location,ut)}}}}b()}function A(){w();for(const _ in n){const T=n[_];for(const D in T){const k=T[D];for(const V in k)u(k[V].object),delete k[V];delete T[D]}delete n[_]}}function y(_){if(n[_.id]===void 0)return;const T=n[_.id];for(const D in T){const k=T[D];for(const V in k)u(k[V].object),delete k[V];delete T[D]}delete n[_.id]}function E(_){for(const T in n){const D=n[T];if(D[_.id]===void 0)continue;const k=D[_.id];for(const V in k)u(k[V].object),delete k[V];delete D[_.id]}}function w(){M(),o=!0,r!==s&&(r=s,c(r.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:w,resetDefaultState:M,dispose:A,releaseStatesOfGeometry:y,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:m,disableUnusedAttributes:b}}function Dg(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,p){p!==0&&(i.drawArraysInstanced(n,c,u,p),e.update(u,n,p))}function a(c,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,p);let f=0;for(let g=0;g<p;g++)f+=u[g];e.update(f,n,1)}function l(c,u,p,d){if(p===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,p);let g=0;for(let x=0;x<p;x++)g+=u[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function zg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==Sn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const w=E===zn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Un&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Dn&&!w)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const p=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,y=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:p,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:b,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:A,maxSamples:y}}function Ug(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new hi,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){const f=p.length!==0||d||n!==0||s;return s=d,n=p.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,d){e=u(p,d,0)},this.setState=function(p,d,f){const g=p.clippingPlanes,x=p.clipIntersection,m=p.clipShadows,h=i.get(p);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const b=r?0:n,S=b*4;let v=h.clippingState||null;l.value=v,v=u(g,d,S,f);for(let A=0;A!==S;++A)v[A]=e[A];h.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,d,f,g){const x=p!==null?p.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const h=f+x*4,b=d.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<h)&&(m=new Float32Array(h));for(let S=0,v=f;S!==x;++S,v+=4)o.copy(p[S]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Ng(i){let t=new WeakMap;function e(o,a){return a===Ma?o.mapping=xs:a===Sa&&(o.mapping=vs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ma||a===Sa)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new $d(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class yl extends hh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const cs=4,yc=[.125,.215,.35,.446,.526,.582],Di=20,Vo=new yl,Mc=new Ht;let Wo=null,Xo=0,qo=0,$o=!1;const Li=(1+Math.sqrt(5))/2,ns=1/Li,Sc=[new Q(-Li,ns,0),new Q(Li,ns,0),new Q(-ns,0,Li),new Q(ns,0,Li),new Q(0,Li,-ns),new Q(0,Li,ns),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)];class bc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wo,Xo,qo),this._renderer.xr.enabled=$o,t.scissorTest=!1,Rr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xs||t.mapping===vs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wo=this._renderer.getRenderTarget(),Xo=this._renderer.getActiveCubeFace(),qo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Mn,minFilter:Mn,generateMipmaps:!1,type:zn,format:Sn,colorSpace:Es,depthBuffer:!1},s=wc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Fg(r)),this._blurMaterial=Og(r,t,e)}return s}_compileMaterial(t){const e=new Kt(this._lodPlanes[0],t);this._renderer.compile(e,Vo)}_sceneToCubeUV(t,e,n,s){const a=new rn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,d=u.toneMapping;u.getClearColor(Mc),u.toneMapping=xi,u.autoClear=!1;const f=new be({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),g=new Kt(new bn,f);let x=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Mc),x=!0);for(let h=0;h<6;h++){const b=h%3;b===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):b===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));const S=this._cubeSize;Rr(s,b*S,h>2?S:0,S,S),u.setRenderTarget(s),x&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=p,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===xs||t.mapping===vs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ec());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Kt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Rr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Vo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Sc[(s-r-1)%Sc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,p=new Kt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Di-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Di;m>Di&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const h=[];let b=0;for(let E=0;E<Di;++E){const w=E/x,M=Math.exp(-w*w/2);h.push(M),E===0?b+=M:E<m&&(b+=2*M)}for(let E=0;E<h.length;E++)h[E]=h[E]/b;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-n;const v=this._sizeLods[s],A=3*v*(s>S-cs?s-S+cs:0),y=4*(this._cubeSize-v);Rr(e,A,y,3*v,2*v),l.setRenderTarget(e),l.render(p,Vo)}}function Fg(i){const t=[],e=[],n=[];let s=i;const r=i-cs+1+yc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-cs?l=yc[o-i+cs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,p=1+c,d=[u,u,p,u,p,p,u,u,p,p,u,p],f=6,g=6,x=3,m=2,h=1,b=new Float32Array(x*g*f),S=new Float32Array(m*g*f),v=new Float32Array(h*g*f);for(let y=0;y<f;y++){const E=y%3*2/3-1,w=y>2?0:-1,M=[E,w,0,E+2/3,w,0,E+2/3,w+1,0,E,w,0,E+2/3,w+1,0,E,w+1,0];b.set(M,x*g*y),S.set(d,m*g*y);const _=[y,y,y,y,y,y];v.set(_,h*g*y)}const A=new pe;A.setAttribute("position",new Me(b,x)),A.setAttribute("uv",new Me(S,m)),A.setAttribute("faceIndex",new Me(v,h)),t.push(A),s>cs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function wc(i,t,e){const n=new dn(i,t,e);return n.texture.mapping=ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Og(i,t,e){const n=new Float32Array(Di),s=new Q(0,1,0);return new Re({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ec(){return new Re({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Tc(){return new Re({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ml(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:jn,depthTest:!1,depthWrite:!1})}function Ml(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function kg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ma||l===Sa,u=l===xs||l===vs;if(c||u){let p=t.get(a);const d=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new bc(i)),p=c?e.fromEquirectangular(a,p):e.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),p.texture;if(p!==void 0)return p.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new bc(i)),p=c?e.fromEquirectangular(a):e.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Bg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&js("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Gg(i,t,e,n){const s={},r=new WeakMap;function o(p){const d=p.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const x=d.morphAttributes[g];for(let m=0,h=x.length;m<h;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(p,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(p){const d=p.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=p.morphAttributes;for(const g in f){const x=f[g];for(let m=0,h=x.length;m<h;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(p){const d=[],f=p.index,g=p.attributes.position;let x=0;if(f!==null){const b=f.array;x=f.version;for(let S=0,v=b.length;S<v;S+=3){const A=b[S+0],y=b[S+1],E=b[S+2];d.push(A,y,y,E,E,A)}}else if(g!==void 0){const b=g.array;x=g.version;for(let S=0,v=b.length/3-1;S<v;S+=3){const A=S+0,y=S+1,E=S+2;d.push(A,y,y,E,E,A)}}else return;const m=new(sh(d)?ch:lh)(d,1);m.version=x;const h=r.get(p);h&&t.remove(h),r.set(p,m)}function u(p){const d=r.get(p);if(d){const f=p.index;f!==null&&d.version<f.version&&c(p)}else c(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:u}}function Hg(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let h=0;h<g;h++)m+=f[h];e.update(m,n,1)}function p(d,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<d.length;h++)c(d[h]/o,f[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let h=0;for(let b=0;b<g;b++)h+=f[b]*x[b];e.update(h,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=p}function Vg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Wg(i,t,e){const n=new WeakMap,s=new oe;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==p){let M=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let S=0;f===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let v=a.attributes.position.count*S,A=1;v>t.maxTextureSize&&(A=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const y=new Float32Array(v*A*4*p),E=new oh(y,v,A,p);E.type=Dn,E.needsUpdate=!0;const w=S*4;for(let _=0;_<p;_++){const T=m[_],D=h[_],k=b[_],V=v*A*4*_;for(let X=0;X<T.count;X++){const G=X*w;f===!0&&(s.fromBufferAttribute(T,X),y[V+G+0]=s.x,y[V+G+1]=s.y,y[V+G+2]=s.z,y[V+G+3]=0),g===!0&&(s.fromBufferAttribute(D,X),y[V+G+4]=s.x,y[V+G+5]=s.y,y[V+G+6]=s.z,y[V+G+7]=0),x===!0&&(s.fromBufferAttribute(k,X),y[V+G+8]=s.x,y[V+G+9]=s.y,y[V+G+10]=s.z,y[V+G+11]=k.itemSize===4?s.w:1)}}d={count:p,texture:E,size:new $t(v,A)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Xg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,p=t.get(l,u);if(s.get(p)!==c&&(t.update(p),s.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return p}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Sl extends qe{constructor(t,e,n,s,r,o,a,l,c,u=ds){if(u!==ds&&u!==ys)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ds&&(n=Oi),n===void 0&&u===ys&&(n=_s),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:an,this.minFilter=l!==void 0?l:an,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const ph=new qe,Ac=new Sl(1,1),mh=new oh,gh=new Id,xh=new fh,Rc=[],Cc=[],Pc=new Float32Array(16),Lc=new Float32Array(9),Ic=new Float32Array(4);function Rs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Rc[s];if(r===void 0&&(r=new Float32Array(s),Rc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ce(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Pe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function uo(i,t){let e=Cc[t];e===void 0&&(e=new Int32Array(t),Cc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function qg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function $g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2fv(this.addr,t),Pe(e,t)}}function Yg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ce(e,t))return;i.uniform3fv(this.addr,t),Pe(e,t)}}function jg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4fv(this.addr,t),Pe(e,t)}}function Kg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Ic.set(n),i.uniformMatrix2fv(this.addr,!1,Ic),Pe(e,n)}}function Zg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Lc.set(n),i.uniformMatrix3fv(this.addr,!1,Lc),Pe(e,n)}}function Jg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ce(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Ce(e,n))return;Pc.set(n),i.uniformMatrix4fv(this.addr,!1,Pc),Pe(e,n)}}function Qg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function t0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2iv(this.addr,t),Pe(e,t)}}function e0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3iv(this.addr,t),Pe(e,t)}}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4iv(this.addr,t),Pe(e,t)}}function i0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function s0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ce(e,t))return;i.uniform2uiv(this.addr,t),Pe(e,t)}}function r0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ce(e,t))return;i.uniform3uiv(this.addr,t),Pe(e,t)}}function o0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ce(e,t))return;i.uniform4uiv(this.addr,t),Pe(e,t)}}function a0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ac.compareFunction=ih,r=Ac):r=ph,e.setTexture2D(t||r,s)}function l0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||gh,s)}function c0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||xh,s)}function u0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||mh,s)}function h0(i){switch(i){case 5126:return qg;case 35664:return $g;case 35665:return Yg;case 35666:return jg;case 35674:return Kg;case 35675:return Zg;case 35676:return Jg;case 5124:case 35670:return Qg;case 35667:case 35671:return t0;case 35668:case 35672:return e0;case 35669:case 35673:return n0;case 5125:return i0;case 36294:return s0;case 36295:return r0;case 36296:return o0;case 35678:case 36198:case 36298:case 36306:case 35682:return a0;case 35679:case 36299:case 36307:return l0;case 35680:case 36300:case 36308:case 36293:return c0;case 36289:case 36303:case 36311:case 36292:return u0}}function f0(i,t){i.uniform1fv(this.addr,t)}function d0(i,t){const e=Rs(t,this.size,2);i.uniform2fv(this.addr,e)}function p0(i,t){const e=Rs(t,this.size,3);i.uniform3fv(this.addr,e)}function m0(i,t){const e=Rs(t,this.size,4);i.uniform4fv(this.addr,e)}function g0(i,t){const e=Rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function x0(i,t){const e=Rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function v0(i,t){const e=Rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function _0(i,t){i.uniform1iv(this.addr,t)}function y0(i,t){i.uniform2iv(this.addr,t)}function M0(i,t){i.uniform3iv(this.addr,t)}function S0(i,t){i.uniform4iv(this.addr,t)}function b0(i,t){i.uniform1uiv(this.addr,t)}function w0(i,t){i.uniform2uiv(this.addr,t)}function E0(i,t){i.uniform3uiv(this.addr,t)}function T0(i,t){i.uniform4uiv(this.addr,t)}function A0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||ph,r[o])}function R0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||gh,r[o])}function C0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||xh,r[o])}function P0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Ce(n,r)||(i.uniform1iv(this.addr,r),Pe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||mh,r[o])}function L0(i){switch(i){case 5126:return f0;case 35664:return d0;case 35665:return p0;case 35666:return m0;case 35674:return g0;case 35675:return x0;case 35676:return v0;case 5124:case 35670:return _0;case 35667:case 35671:return y0;case 35668:case 35672:return M0;case 35669:case 35673:return S0;case 5125:return b0;case 36294:return w0;case 36295:return E0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return A0;case 35679:case 36299:case 36307:return R0;case 35680:case 36300:case 36308:case 36293:return C0;case 36289:case 36303:case 36311:case 36292:return P0}}class I0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=h0(e.type)}}class D0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=L0(e.type)}}class z0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Yo=/(\w+)(\])?(\[|\.)?/g;function Dc(i,t){i.seq.push(t),i.map[t.id]=t}function U0(i,t,e){const n=i.name,s=n.length;for(Yo.lastIndex=0;;){const r=Yo.exec(n),o=Yo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Dc(e,c===void 0?new I0(a,i,t):new D0(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new z0(a),Dc(e,p)),e=p}}}class eo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);U0(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function zc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const N0=37297;let F0=0;function O0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Uc=new te;function k0(i){re._getMatrix(Uc,re.workingColorSpace,i);const t=`mat3( ${Uc.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case co:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Nc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+O0(i.getShaderSource(t),o)}else return s}function B0(i,t){const e=k0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function G0(i,t){let e;switch(t){case Bu:e="Linear";break;case Gu:e="Reinhard";break;case Hu:e="Cineon";break;case Vu:e="ACESFilmic";break;case Wu:e="AgX";break;case Xu:e="Neutral";break;case Kf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Cr=new Q;function H0(){re.getLuminanceCoefficients(Cr);const i=Cr.x.toFixed(4),t=Cr.y.toFixed(4),e=Cr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function V0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function W0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function X0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ks(i){return i!==""}function Fc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Oc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const q0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ja(i){return i.replace(q0,Y0)}const $0=new Map;function Y0(i,t){let e=ee[t];if(e===void 0){const n=$0.get(t);if(n!==void 0)e=ee[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ja(e)}const j0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kc(i){return i.replace(j0,K0)}function K0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bc(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Z0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===ku?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Cf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(t="SHADOWMAP_TYPE_VSM"),t}function J0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case xs:case vs:t="ENVMAP_TYPE_CUBE";break;case ao:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Q0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case vs:t="ENVMAP_MODE_REFRACTION";break}return t}function tx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case cl:t="ENVMAP_BLENDING_MULTIPLY";break;case Yf:t="ENVMAP_BLENDING_MIX";break;case jf:t="ENVMAP_BLENDING_ADD";break}return t}function ex(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function nx(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Z0(e),c=J0(e),u=Q0(e),p=tx(e),d=ex(e),f=V0(e),g=W0(r),x=s.createProgram();let m,h,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ks).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ks).join(`
`),h.length>0&&(h+=`
`)):(m=[Bc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),h=[Bc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?ee.tonemapping_pars_fragment:"",e.toneMapping!==xi?G0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ee.colorspace_pars_fragment,B0("linearToOutputTexel",e.outputColorSpace),H0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ks).join(`
`)),o=Ja(o),o=Fc(o,e),o=Oc(o,e),a=Ja(a),a=Fc(a,e),a=Oc(a,e),o=kc(o),a=kc(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===Jl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Jl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=b+m+o,v=b+h+a,A=zc(s,s.VERTEX_SHADER,S),y=zc(s,s.FRAGMENT_SHADER,v);s.attachShader(x,A),s.attachShader(x,y),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(T){if(i.debug.checkShaderErrors){const D=s.getProgramInfoLog(x).trim(),k=s.getShaderInfoLog(A).trim(),V=s.getShaderInfoLog(y).trim();let X=!0,G=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,A,y);else{const H=Nc(s,A,"vertex"),B=Nc(s,y,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+T.name+`
Material Type: `+T.type+`

Program Info Log: `+D+`
`+H+`
`+B)}else D!==""?console.warn("THREE.WebGLProgram: Program Info Log:",D):(k===""||V==="")&&(G=!1);G&&(T.diagnostics={runnable:X,programLog:D,vertexShader:{log:k,prefix:m},fragmentShader:{log:V,prefix:h}})}s.deleteShader(A),s.deleteShader(y),w=new eo(s,x),M=X0(s,x)}let w;this.getUniforms=function(){return w===void 0&&E(this),w};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let _=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return _===!1&&(_=s.getProgramParameter(x,N0)),_},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=F0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=A,this.fragmentShader=y,this}let ix=0;class sx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new rx(t),e.set(t,n)),n}}class rx{constructor(t){this.id=ix++,this.code=t,this.usedTimes=0}}function ox(i,t,e,n,s,r,o){const a=new vl,l=new sx,c=new Set,u=[],p=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return c.add(M),M===0?"uv":`uv${M}`}function m(M,_,T,D,k){const V=D.fog,X=k.geometry,G=M.isMeshStandardMaterial?D.environment:null,H=(M.isMeshStandardMaterial?e:t).get(M.envMap||G),B=H&&H.mapping===ao?H.image.height:null,tt=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const ut=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,rt=ut!==void 0?ut.length:0;let At=0;X.morphAttributes.position!==void 0&&(At=1),X.morphAttributes.normal!==void 0&&(At=2),X.morphAttributes.color!==void 0&&(At=3);let Ct,lt,wt,zt;if(tt){const Rt=Ze[tt];Ct=Rt.vertexShader,lt=Rt.fragmentShader}else Ct=M.vertexShader,lt=M.fragmentShader,l.update(M),wt=l.getVertexShaderID(M),zt=l.getFragmentShaderID(M);const xt=i.getRenderTarget(),Ut=i.state.buffers.depth.getReversed(),L=k.isInstancedMesh===!0,q=k.isBatchedMesh===!0,it=!!M.map,nt=!!M.matcap,Z=!!H,N=!!M.aoMap,Et=!!M.lightMap,dt=!!M.bumpMap,St=!!M.normalMap,yt=!!M.displacementMap,Ot=!!M.emissiveMap,st=!!M.metalnessMap,I=!!M.roughnessMap,R=M.anisotropy>0,C=M.clearcoat>0,U=M.dispersion>0,Y=M.iridescence>0,W=M.sheen>0,Tt=M.transmission>0,ft=R&&!!M.anisotropyMap,_t=C&&!!M.clearcoatMap,Dt=C&&!!M.clearcoatNormalMap,Mt=C&&!!M.clearcoatRoughnessMap,O=Y&&!!M.iridescenceMap,j=Y&&!!M.iridescenceThicknessMap,K=W&&!!M.sheenColorMap,F=W&&!!M.sheenRoughnessMap,ht=!!M.specularMap,vt=!!M.specularColorMap,Lt=!!M.specularIntensityMap,$=Tt&&!!M.transmissionMap,gt=Tt&&!!M.thicknessMap,ct=!!M.gradientMap,P=!!M.alphaMap,J=M.alphaTest>0,et=!!M.alphaHash,bt=!!M.extensions;let It=xi;M.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(It=i.toneMapping);const Pt={shaderID:tt,shaderType:M.type,shaderName:M.name,vertexShader:Ct,fragmentShader:lt,defines:M.defines,customVertexShaderID:wt,customFragmentShaderID:zt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:q,batchingColor:q&&k._colorsTexture!==null,instancing:L,instancingColor:L&&k.instanceColor!==null,instancingMorph:L&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:xt===null?i.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:Es,alphaToCoverage:!!M.alphaToCoverage,map:it,matcap:nt,envMap:Z,envMapMode:Z&&H.mapping,envMapCubeUVHeight:B,aoMap:N,lightMap:Et,bumpMap:dt,normalMap:St,displacementMap:d&&yt,emissiveMap:Ot,normalMapObjectSpace:St&&M.normalMapType===td,normalMapTangentSpace:St&&M.normalMapType===nh,metalnessMap:st,roughnessMap:I,anisotropy:R,anisotropyMap:ft,clearcoat:C,clearcoatMap:_t,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Mt,dispersion:U,iridescence:Y,iridescenceMap:O,iridescenceThicknessMap:j,sheen:W,sheenColorMap:K,sheenRoughnessMap:F,specularMap:ht,specularColorMap:vt,specularIntensityMap:Lt,transmission:Tt,transmissionMap:$,thicknessMap:gt,gradientMap:ct,opaque:M.transparent===!1&&M.blending===fs&&M.alphaToCoverage===!1,alphaMap:P,alphaTest:J,alphaHash:et,combine:M.combine,mapUv:it&&x(M.map.channel),aoMapUv:N&&x(M.aoMap.channel),lightMapUv:Et&&x(M.lightMap.channel),bumpMapUv:dt&&x(M.bumpMap.channel),normalMapUv:St&&x(M.normalMap.channel),displacementMapUv:yt&&x(M.displacementMap.channel),emissiveMapUv:Ot&&x(M.emissiveMap.channel),metalnessMapUv:st&&x(M.metalnessMap.channel),roughnessMapUv:I&&x(M.roughnessMap.channel),anisotropyMapUv:ft&&x(M.anisotropyMap.channel),clearcoatMapUv:_t&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:O&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:j&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:K&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:F&&x(M.sheenRoughnessMap.channel),specularMapUv:ht&&x(M.specularMap.channel),specularColorMapUv:vt&&x(M.specularColorMap.channel),specularIntensityMapUv:Lt&&x(M.specularIntensityMap.channel),transmissionMapUv:$&&x(M.transmissionMap.channel),thicknessMapUv:gt&&x(M.thicknessMap.channel),alphaMapUv:P&&x(M.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(St||R),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!X.attributes.uv&&(it||P),fog:!!V,useFog:M.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:Ut,skinning:k.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:At,numDirLights:_.directional.length,numPointLights:_.point.length,numSpotLights:_.spot.length,numSpotLightMaps:_.spotLightMap.length,numRectAreaLights:_.rectArea.length,numHemiLights:_.hemi.length,numDirLightShadows:_.directionalShadowMap.length,numPointLightShadows:_.pointShadowMap.length,numSpotLightShadows:_.spotShadowMap.length,numSpotLightShadowsWithMaps:_.numSpotLightShadowsWithMaps,numLightProbes:_.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:i.shadowMap.enabled&&T.length>0,shadowMapType:i.shadowMap.type,toneMapping:It,decodeVideoTexture:it&&M.map.isVideoTexture===!0&&re.getTransfer(M.map.colorSpace)===fe,decodeVideoTextureEmissive:Ot&&M.emissiveMap.isVideoTexture===!0&&re.getTransfer(M.emissiveMap.colorSpace)===fe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ye,flipSided:M.side===Je,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:bt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&M.extensions.multiDraw===!0||q)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Pt.vertexUv1s=c.has(1),Pt.vertexUv2s=c.has(2),Pt.vertexUv3s=c.has(3),c.clear(),Pt}function h(M){const _=[];if(M.shaderID?_.push(M.shaderID):(_.push(M.customVertexShaderID),_.push(M.customFragmentShaderID)),M.defines!==void 0)for(const T in M.defines)_.push(T),_.push(M.defines[T]);return M.isRawShaderMaterial===!1&&(b(_,M),S(_,M),_.push(i.outputColorSpace)),_.push(M.customProgramCacheKey),_.join()}function b(M,_){M.push(_.precision),M.push(_.outputColorSpace),M.push(_.envMapMode),M.push(_.envMapCubeUVHeight),M.push(_.mapUv),M.push(_.alphaMapUv),M.push(_.lightMapUv),M.push(_.aoMapUv),M.push(_.bumpMapUv),M.push(_.normalMapUv),M.push(_.displacementMapUv),M.push(_.emissiveMapUv),M.push(_.metalnessMapUv),M.push(_.roughnessMapUv),M.push(_.anisotropyMapUv),M.push(_.clearcoatMapUv),M.push(_.clearcoatNormalMapUv),M.push(_.clearcoatRoughnessMapUv),M.push(_.iridescenceMapUv),M.push(_.iridescenceThicknessMapUv),M.push(_.sheenColorMapUv),M.push(_.sheenRoughnessMapUv),M.push(_.specularMapUv),M.push(_.specularColorMapUv),M.push(_.specularIntensityMapUv),M.push(_.transmissionMapUv),M.push(_.thicknessMapUv),M.push(_.combine),M.push(_.fogExp2),M.push(_.sizeAttenuation),M.push(_.morphTargetsCount),M.push(_.morphAttributeCount),M.push(_.numDirLights),M.push(_.numPointLights),M.push(_.numSpotLights),M.push(_.numSpotLightMaps),M.push(_.numHemiLights),M.push(_.numRectAreaLights),M.push(_.numDirLightShadows),M.push(_.numPointLightShadows),M.push(_.numSpotLightShadows),M.push(_.numSpotLightShadowsWithMaps),M.push(_.numLightProbes),M.push(_.shadowMapType),M.push(_.toneMapping),M.push(_.numClippingPlanes),M.push(_.numClipIntersection),M.push(_.depthPacking)}function S(M,_){a.disableAll(),_.supportsVertexTextures&&a.enable(0),_.instancing&&a.enable(1),_.instancingColor&&a.enable(2),_.instancingMorph&&a.enable(3),_.matcap&&a.enable(4),_.envMap&&a.enable(5),_.normalMapObjectSpace&&a.enable(6),_.normalMapTangentSpace&&a.enable(7),_.clearcoat&&a.enable(8),_.iridescence&&a.enable(9),_.alphaTest&&a.enable(10),_.vertexColors&&a.enable(11),_.vertexAlphas&&a.enable(12),_.vertexUv1s&&a.enable(13),_.vertexUv2s&&a.enable(14),_.vertexUv3s&&a.enable(15),_.vertexTangents&&a.enable(16),_.anisotropy&&a.enable(17),_.alphaHash&&a.enable(18),_.batching&&a.enable(19),_.dispersion&&a.enable(20),_.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),_.fog&&a.enable(0),_.useFog&&a.enable(1),_.flatShading&&a.enable(2),_.logarithmicDepthBuffer&&a.enable(3),_.reverseDepthBuffer&&a.enable(4),_.skinning&&a.enable(5),_.morphTargets&&a.enable(6),_.morphNormals&&a.enable(7),_.morphColors&&a.enable(8),_.premultipliedAlpha&&a.enable(9),_.shadowMapEnabled&&a.enable(10),_.doubleSided&&a.enable(11),_.flipSided&&a.enable(12),_.useDepthPacking&&a.enable(13),_.dithering&&a.enable(14),_.transmission&&a.enable(15),_.sheen&&a.enable(16),_.opaque&&a.enable(17),_.pointsUvs&&a.enable(18),_.decodeVideoTexture&&a.enable(19),_.decodeVideoTextureEmissive&&a.enable(20),_.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const _=g[M.type];let T;if(_){const D=Ze[_];T=_i.clone(D.uniforms)}else T=M.uniforms;return T}function A(M,_){let T;for(let D=0,k=u.length;D<k;D++){const V=u[D];if(V.cacheKey===_){T=V,++T.usedTimes;break}}return T===void 0&&(T=new nx(i,_,M,r),u.push(T)),T}function y(M){if(--M.usedTimes===0){const _=u.indexOf(M);u[_]=u[u.length-1],u.pop(),M.destroy()}}function E(M){l.remove(M)}function w(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:A,releaseProgram:y,releaseShaderCache:E,programs:u,dispose:w}}function ax(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function lx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Gc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Hc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p,d,f,g,x,m){let h=i[t];return h===void 0?(h={id:p.id,object:p,geometry:d,material:f,groupOrder:g,renderOrder:p.renderOrder,z:x,group:m},i[t]=h):(h.id=p.id,h.object=p,h.geometry=d,h.material=f,h.groupOrder=g,h.renderOrder=p.renderOrder,h.z=x,h.group=m),t++,h}function a(p,d,f,g,x,m){const h=o(p,d,f,g,x,m);f.transmission>0?n.push(h):f.transparent===!0?s.push(h):e.push(h)}function l(p,d,f,g,x,m){const h=o(p,d,f,g,x,m);f.transmission>0?n.unshift(h):f.transparent===!0?s.unshift(h):e.unshift(h)}function c(p,d){e.length>1&&e.sort(p||lx),n.length>1&&n.sort(d||Gc),s.length>1&&s.sort(d||Gc)}function u(){for(let p=t,d=i.length;p<d;p++){const f=i[p];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function cx(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Hc,i.set(n,[o])):s>=r.length?(o=new Hc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function ux(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Q,color:new Ht};break;case"SpotLight":e={position:new Q,direction:new Q,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Q,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Q,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return i[t.id]=e,e}}}function hx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $t,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let fx=0;function dx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function px(i){const t=new ux,e=hx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Q);const s=new Q,r=new ae,o=new ae;function a(c){let u=0,p=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,x=0,m=0,h=0,b=0,S=0,v=0,A=0,y=0,E=0;c.sort(dx);for(let M=0,_=c.length;M<_;M++){const T=c[M],D=T.color,k=T.intensity,V=T.distance,X=T.shadow&&T.shadow.map?T.shadow.map.texture:null;if(T.isAmbientLight)u+=D.r*k,p+=D.g*k,d+=D.b*k;else if(T.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(T.sh.coefficients[G],k);E++}else if(T.isDirectionalLight){const G=t.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),T.castShadow){const H=T.shadow,B=e.get(T);B.shadowIntensity=H.intensity,B.shadowBias=H.bias,B.shadowNormalBias=H.normalBias,B.shadowRadius=H.radius,B.shadowMapSize=H.mapSize,n.directionalShadow[f]=B,n.directionalShadowMap[f]=X,n.directionalShadowMatrix[f]=T.shadow.matrix,b++}n.directional[f]=G,f++}else if(T.isSpotLight){const G=t.get(T);G.position.setFromMatrixPosition(T.matrixWorld),G.color.copy(D).multiplyScalar(k),G.distance=V,G.coneCos=Math.cos(T.angle),G.penumbraCos=Math.cos(T.angle*(1-T.penumbra)),G.decay=T.decay,n.spot[x]=G;const H=T.shadow;if(T.map&&(n.spotLightMap[A]=T.map,A++,H.updateMatrices(T),T.castShadow&&y++),n.spotLightMatrix[x]=H.matrix,T.castShadow){const B=e.get(T);B.shadowIntensity=H.intensity,B.shadowBias=H.bias,B.shadowNormalBias=H.normalBias,B.shadowRadius=H.radius,B.shadowMapSize=H.mapSize,n.spotShadow[x]=B,n.spotShadowMap[x]=X,v++}x++}else if(T.isRectAreaLight){const G=t.get(T);G.color.copy(D).multiplyScalar(k),G.halfWidth.set(T.width*.5,0,0),G.halfHeight.set(0,T.height*.5,0),n.rectArea[m]=G,m++}else if(T.isPointLight){const G=t.get(T);if(G.color.copy(T.color).multiplyScalar(T.intensity),G.distance=T.distance,G.decay=T.decay,T.castShadow){const H=T.shadow,B=e.get(T);B.shadowIntensity=H.intensity,B.shadowBias=H.bias,B.shadowNormalBias=H.normalBias,B.shadowRadius=H.radius,B.shadowMapSize=H.mapSize,B.shadowCameraNear=H.camera.near,B.shadowCameraFar=H.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=T.shadow.matrix,S++}n.point[g]=G,g++}else if(T.isHemisphereLight){const G=t.get(T);G.skyColor.copy(T.color).multiplyScalar(k),G.groundColor.copy(T.groundColor).multiplyScalar(k),n.hemi[h]=G,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ft.LTC_FLOAT_1,n.rectAreaLTC2=Ft.LTC_FLOAT_2):(n.rectAreaLTC1=Ft.LTC_HALF_1,n.rectAreaLTC2=Ft.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=d;const w=n.hash;(w.directionalLength!==f||w.pointLength!==g||w.spotLength!==x||w.rectAreaLength!==m||w.hemiLength!==h||w.numDirectionalShadows!==b||w.numPointShadows!==S||w.numSpotShadows!==v||w.numSpotMaps!==A||w.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+A-y,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=E,w.directionalLength=f,w.pointLength=g,w.spotLength=x,w.rectAreaLength=m,w.hemiLength=h,w.numDirectionalShadows=b,w.numPointShadows=S,w.numSpotShadows=v,w.numSpotMaps=A,w.numLightProbes=E,n.version=fx++)}function l(c,u){let p=0,d=0,f=0,g=0,x=0;const m=u.matrixWorldInverse;for(let h=0,b=c.length;h<b;h++){const S=c[h];if(S.isDirectionalLight){const v=n.directional[p];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(S.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(S.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(S.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function Vc(i){const t=new px(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function mx(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Vc(i),t.set(s,[a])):r>=o.length?(a=new Vc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class gx extends As{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Jf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class xx extends As{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const vx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_x=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function yx(i,t,e){let n=new _l;const s=new $t,r=new $t,o=new oe,a=new gx({depthPacking:Qf}),l=new xx,c={},u=e.maxTextureSize,p={[vi]:Je,[Je]:vi,[ye]:ye},d=new Re({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $t},radius:{value:4}},vertexShader:vx,fragmentShader:_x}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new pe;g.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Kt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ku;let h=this.type;this.render=function(y,E,w){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const M=i.getRenderTarget(),_=i.getActiveCubeFace(),T=i.getActiveMipmapLevel(),D=i.state;D.setBlending(jn),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const k=h!==Wn&&this.type===Wn,V=h===Wn&&this.type!==Wn;for(let X=0,G=y.length;X<G;X++){const H=y[X],B=H.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const tt=B.getFrameExtents();if(s.multiply(tt),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/tt.x),s.x=r.x*tt.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/tt.y),s.y=r.y*tt.y,B.mapSize.y=r.y)),B.map===null||k===!0||V===!0){const rt=this.type!==Wn?{minFilter:an,magFilter:an}:{};B.map!==null&&B.map.dispose(),B.map=new dn(s.x,s.y,rt),B.map.texture.name=H.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const ut=B.getViewportCount();for(let rt=0;rt<ut;rt++){const At=B.getViewport(rt);o.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),D.viewport(o),B.updateMatrices(H,rt),n=B.getFrustum(),v(E,w,B.camera,H,this.type)}B.isPointLightShadow!==!0&&this.type===Wn&&b(B,w),B.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(M,_,T)};function b(y,E){const w=t.update(x);d.defines.VSM_SAMPLES!==y.blurSamples&&(d.defines.VSM_SAMPLES=y.blurSamples,f.defines.VSM_SAMPLES=y.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new dn(s.x,s.y)),d.uniforms.shadow_pass.value=y.map.texture,d.uniforms.resolution.value=y.mapSize,d.uniforms.radius.value=y.radius,i.setRenderTarget(y.mapPass),i.clear(),i.renderBufferDirect(E,null,w,d,x,null),f.uniforms.shadow_pass.value=y.mapPass.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,i.setRenderTarget(y.map),i.clear(),i.renderBufferDirect(E,null,w,f,x,null)}function S(y,E,w,M){let _=null;const T=w.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(T!==void 0)_=T;else if(_=w.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const D=_.uuid,k=E.uuid;let V=c[D];V===void 0&&(V={},c[D]=V);let X=V[k];X===void 0&&(X=_.clone(),V[k]=X,E.addEventListener("dispose",A)),_=X}if(_.visible=E.visible,_.wireframe=E.wireframe,M===Wn?_.side=E.shadowSide!==null?E.shadowSide:E.side:_.side=E.shadowSide!==null?E.shadowSide:p[E.side],_.alphaMap=E.alphaMap,_.alphaTest=E.alphaTest,_.map=E.map,_.clipShadows=E.clipShadows,_.clippingPlanes=E.clippingPlanes,_.clipIntersection=E.clipIntersection,_.displacementMap=E.displacementMap,_.displacementScale=E.displacementScale,_.displacementBias=E.displacementBias,_.wireframeLinewidth=E.wireframeLinewidth,_.linewidth=E.linewidth,w.isPointLight===!0&&_.isMeshDistanceMaterial===!0){const D=i.properties.get(_);D.light=w}return _}function v(y,E,w,M,_){if(y.visible===!1)return;if(y.layers.test(E.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&_===Wn)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(w.matrixWorldInverse,y.matrixWorld);const k=t.update(y),V=y.material;if(Array.isArray(V)){const X=k.groups;for(let G=0,H=X.length;G<H;G++){const B=X[G],tt=V[B.materialIndex];if(tt&&tt.visible){const ut=S(y,tt,M,_);y.onBeforeShadow(i,y,E,w,k,ut,B),i.renderBufferDirect(w,null,k,ut,y,B),y.onAfterShadow(i,y,E,w,k,ut,B)}}}else if(V.visible){const X=S(y,V,M,_);y.onBeforeShadow(i,y,E,w,k,X,null),i.renderBufferDirect(w,null,k,X,y,null),y.onAfterShadow(i,y,E,w,k,X,null)}}const D=y.children;for(let k=0,V=D.length;k<V;k++)v(D[k],E,w,M,_)}function A(y){y.target.removeEventListener("dispose",A);for(const w in c){const M=c[w],_=y.target.uuid;_ in M&&(M[_].dispose(),delete M[_])}}}const Mx={[pa]:ma,[ga]:_a,[xa]:ya,[gs]:va,[ma]:pa,[_a]:ga,[ya]:xa,[va]:gs};function Sx(i,t){function e(){let $=!1;const gt=new oe;let ct=null;const P=new oe(0,0,0,0);return{setMask:function(J){ct!==J&&!$&&(i.colorMask(J,J,J,J),ct=J)},setLocked:function(J){$=J},setClear:function(J,et,bt,It,Pt){Pt===!0&&(J*=It,et*=It,bt*=It),gt.set(J,et,bt,It),P.equals(gt)===!1&&(i.clearColor(J,et,bt,It),P.copy(gt))},reset:function(){$=!1,ct=null,P.set(-1,0,0,0)}}}function n(){let $=!1,gt=!1,ct=null,P=null,J=null;return{setReversed:function(et){if(gt!==et){const bt=t.get("EXT_clip_control");gt?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT);const It=J;J=null,this.setClear(It)}gt=et},getReversed:function(){return gt},setTest:function(et){et?xt(i.DEPTH_TEST):Ut(i.DEPTH_TEST)},setMask:function(et){ct!==et&&!$&&(i.depthMask(et),ct=et)},setFunc:function(et){if(gt&&(et=Mx[et]),P!==et){switch(et){case pa:i.depthFunc(i.NEVER);break;case ma:i.depthFunc(i.ALWAYS);break;case ga:i.depthFunc(i.LESS);break;case gs:i.depthFunc(i.LEQUAL);break;case xa:i.depthFunc(i.EQUAL);break;case va:i.depthFunc(i.GEQUAL);break;case _a:i.depthFunc(i.GREATER);break;case ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}P=et}},setLocked:function(et){$=et},setClear:function(et){J!==et&&(gt&&(et=1-et),i.clearDepth(et),J=et)},reset:function(){$=!1,ct=null,P=null,J=null,gt=!1}}}function s(){let $=!1,gt=null,ct=null,P=null,J=null,et=null,bt=null,It=null,Pt=null;return{setTest:function(Rt){$||(Rt?xt(i.STENCIL_TEST):Ut(i.STENCIL_TEST))},setMask:function(Rt){gt!==Rt&&!$&&(i.stencilMask(Rt),gt=Rt)},setFunc:function(Rt,Bt,Gt){(ct!==Rt||P!==Bt||J!==Gt)&&(i.stencilFunc(Rt,Bt,Gt),ct=Rt,P=Bt,J=Gt)},setOp:function(Rt,Bt,Gt){(et!==Rt||bt!==Bt||It!==Gt)&&(i.stencilOp(Rt,Bt,Gt),et=Rt,bt=Bt,It=Gt)},setLocked:function(Rt){$=Rt},setClear:function(Rt){Pt!==Rt&&(i.clearStencil(Rt),Pt=Rt)},reset:function(){$=!1,gt=null,ct=null,P=null,J=null,et=null,bt=null,It=null,Pt=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},p={},d=new WeakMap,f=[],g=null,x=!1,m=null,h=null,b=null,S=null,v=null,A=null,y=null,E=new Ht(0,0,0),w=0,M=!1,_=null,T=null,D=null,k=null,V=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,H=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(B)[1]),G=H>=1):B.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),G=H>=2);let tt=null,ut={};const rt=i.getParameter(i.SCISSOR_BOX),At=i.getParameter(i.VIEWPORT),Ct=new oe().fromArray(rt),lt=new oe().fromArray(At);function wt($,gt,ct,P){const J=new Uint8Array(4),et=i.createTexture();i.bindTexture($,et),i.texParameteri($,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri($,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<ct;bt++)$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?i.texImage3D(gt,0,i.RGBA,1,1,P,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(gt+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return et}const zt={};zt[i.TEXTURE_2D]=wt(i.TEXTURE_2D,i.TEXTURE_2D,1),zt[i.TEXTURE_CUBE_MAP]=wt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),zt[i.TEXTURE_2D_ARRAY]=wt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),zt[i.TEXTURE_3D]=wt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),xt(i.DEPTH_TEST),o.setFunc(gs),dt(!1),St(Yl),xt(i.CULL_FACE),N(jn);function xt($){u[$]!==!0&&(i.enable($),u[$]=!0)}function Ut($){u[$]!==!1&&(i.disable($),u[$]=!1)}function L($,gt){return p[$]!==gt?(i.bindFramebuffer($,gt),p[$]=gt,$===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=gt),$===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=gt),!0):!1}function q($,gt){let ct=f,P=!1;if($){ct=d.get(gt),ct===void 0&&(ct=[],d.set(gt,ct));const J=$.textures;if(ct.length!==J.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let et=0,bt=J.length;et<bt;et++)ct[et]=i.COLOR_ATTACHMENT0+et;ct.length=J.length,P=!0}}else ct[0]!==i.BACK&&(ct[0]=i.BACK,P=!0);P&&i.drawBuffers(ct)}function it($){return g!==$?(i.useProgram($),g=$,!0):!1}const nt={[Ii]:i.FUNC_ADD,[Lf]:i.FUNC_SUBTRACT,[If]:i.FUNC_REVERSE_SUBTRACT};nt[Df]=i.MIN,nt[zf]=i.MAX;const Z={[Uf]:i.ZERO,[Nf]:i.ONE,[Ff]:i.SRC_COLOR,[fa]:i.SRC_ALPHA,[Vf]:i.SRC_ALPHA_SATURATE,[Gf]:i.DST_COLOR,[kf]:i.DST_ALPHA,[Of]:i.ONE_MINUS_SRC_COLOR,[da]:i.ONE_MINUS_SRC_ALPHA,[Hf]:i.ONE_MINUS_DST_COLOR,[Bf]:i.ONE_MINUS_DST_ALPHA,[Wf]:i.CONSTANT_COLOR,[Xf]:i.ONE_MINUS_CONSTANT_COLOR,[qf]:i.CONSTANT_ALPHA,[$f]:i.ONE_MINUS_CONSTANT_ALPHA};function N($,gt,ct,P,J,et,bt,It,Pt,Rt){if($===jn){x===!0&&(Ut(i.BLEND),x=!1);return}if(x===!1&&(xt(i.BLEND),x=!0),$!==Pf){if($!==m||Rt!==M){if((h!==Ii||v!==Ii)&&(i.blendEquation(i.FUNC_ADD),h=Ii,v=Ii),Rt)switch($){case fs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ze:i.blendFunc(i.ONE,i.ONE);break;case jl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case fs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ze:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case jl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}b=null,S=null,A=null,y=null,E.set(0,0,0),w=0,m=$,M=Rt}return}J=J||gt,et=et||ct,bt=bt||P,(gt!==h||J!==v)&&(i.blendEquationSeparate(nt[gt],nt[J]),h=gt,v=J),(ct!==b||P!==S||et!==A||bt!==y)&&(i.blendFuncSeparate(Z[ct],Z[P],Z[et],Z[bt]),b=ct,S=P,A=et,y=bt),(It.equals(E)===!1||Pt!==w)&&(i.blendColor(It.r,It.g,It.b,Pt),E.copy(It),w=Pt),m=$,M=!1}function Et($,gt){$.side===ye?Ut(i.CULL_FACE):xt(i.CULL_FACE);let ct=$.side===Je;gt&&(ct=!ct),dt(ct),$.blending===fs&&$.transparent===!1?N(jn):N($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),o.setFunc($.depthFunc),o.setTest($.depthTest),o.setMask($.depthWrite),r.setMask($.colorWrite);const P=$.stencilWrite;a.setTest(P),P&&(a.setMask($.stencilWriteMask),a.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),a.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),Ot($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?xt(i.SAMPLE_ALPHA_TO_COVERAGE):Ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function dt($){_!==$&&($?i.frontFace(i.CW):i.frontFace(i.CCW),_=$)}function St($){$!==Af?(xt(i.CULL_FACE),$!==T&&($===Yl?i.cullFace(i.BACK):$===Rf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ut(i.CULL_FACE),T=$}function yt($){$!==D&&(G&&i.lineWidth($),D=$)}function Ot($,gt,ct){$?(xt(i.POLYGON_OFFSET_FILL),(k!==gt||V!==ct)&&(i.polygonOffset(gt,ct),k=gt,V=ct)):Ut(i.POLYGON_OFFSET_FILL)}function st($){$?xt(i.SCISSOR_TEST):Ut(i.SCISSOR_TEST)}function I($){$===void 0&&($=i.TEXTURE0+X-1),tt!==$&&(i.activeTexture($),tt=$)}function R($,gt,ct){ct===void 0&&(tt===null?ct=i.TEXTURE0+X-1:ct=tt);let P=ut[ct];P===void 0&&(P={type:void 0,texture:void 0},ut[ct]=P),(P.type!==$||P.texture!==gt)&&(tt!==ct&&(i.activeTexture(ct),tt=ct),i.bindTexture($,gt||zt[$]),P.type=$,P.texture=gt)}function C(){const $=ut[tt];$!==void 0&&$.type!==void 0&&(i.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function U(){try{i.compressedTexImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Y(){try{i.compressedTexImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function W(){try{i.texSubImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ft(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function _t(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Dt(){try{i.texStorage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Mt(){try{i.texStorage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function O(){try{i.texImage2D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function j(){try{i.texImage3D.apply(i,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function K($){Ct.equals($)===!1&&(i.scissor($.x,$.y,$.z,$.w),Ct.copy($))}function F($){lt.equals($)===!1&&(i.viewport($.x,$.y,$.z,$.w),lt.copy($))}function ht($,gt){let ct=c.get(gt);ct===void 0&&(ct=new WeakMap,c.set(gt,ct));let P=ct.get($);P===void 0&&(P=i.getUniformBlockIndex(gt,$.name),ct.set($,P))}function vt($,gt){const P=c.get(gt).get($);l.get(gt)!==P&&(i.uniformBlockBinding(gt,P,$.__bindingPointIndex),l.set(gt,P))}function Lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},tt=null,ut={},p={},d=new WeakMap,f=[],g=null,x=!1,m=null,h=null,b=null,S=null,v=null,A=null,y=null,E=new Ht(0,0,0),w=0,M=!1,_=null,T=null,D=null,k=null,V=null,Ct.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:xt,disable:Ut,bindFramebuffer:L,drawBuffers:q,useProgram:it,setBlending:N,setMaterial:Et,setFlipSided:dt,setCullFace:St,setLineWidth:yt,setPolygonOffset:Ot,setScissorTest:st,activeTexture:I,bindTexture:R,unbindTexture:C,compressedTexImage2D:U,compressedTexImage3D:Y,texImage2D:O,texImage3D:j,updateUBOMapping:ht,uniformBlockBinding:vt,texStorage2D:Dt,texStorage3D:Mt,texSubImage2D:W,texSubImage3D:Tt,compressedTexSubImage2D:ft,compressedTexSubImage3D:_t,scissor:K,viewport:F,reset:Lt}}function Wc(i,t,e,n){const s=bx(n);switch(e){case Ku:return i*t;case Ju:return i*t;case Qu:return i*t*2;case lo:return i*t/s.components*s.byteLength;case dl:return i*t/s.components*s.byteLength;case th:return i*t*2/s.components*s.byteLength;case pl:return i*t*2/s.components*s.byteLength;case Zu:return i*t*3/s.components*s.byteLength;case Sn:return i*t*4/s.components*s.byteLength;case ml:return i*t*4/s.components*s.byteLength;case Kr:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Jr:case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ea:case Aa:return Math.max(i,16)*Math.max(t,8)/4;case wa:case Ta:return Math.max(i,8)*Math.max(t,8)/2;case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Pa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case La:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Da:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Na:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case ka:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Wa:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case to:case Xa:case qa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case eh:case $a:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ya:case ja:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function bx(i){switch(i){case Un:case $u:return{byteLength:1,components:1};case nr:case Yu:case zn:return{byteLength:2,components:1};case hl:case fl:return{byteLength:2,components:4};case Oi:case ul:case Dn:return{byteLength:4,components:1};case ju:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function wx(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $t,u=new WeakMap;let p;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,R){return f?new OffscreenCanvas(I,R):ro("canvas")}function x(I,R,C){let U=1;const Y=st(I);if((Y.width>C||Y.height>C)&&(U=C/Math.max(Y.width,Y.height)),U<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const W=Math.floor(U*Y.width),Tt=Math.floor(U*Y.height);p===void 0&&(p=g(W,Tt));const ft=R?g(W,Tt):p;return ft.width=W,ft.height=Tt,ft.getContext("2d").drawImage(I,0,0,W,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Y.width+"x"+Y.height+") to ("+W+"x"+Tt+")."),ft}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Y.width+"x"+Y.height+")."),I;return I}function m(I){return I.generateMipmaps}function h(I){i.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(I,R,C,U,Y=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let W=R;if(R===i.RED&&(C===i.FLOAT&&(W=i.R32F),C===i.HALF_FLOAT&&(W=i.R16F),C===i.UNSIGNED_BYTE&&(W=i.R8)),R===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(W=i.R8UI),C===i.UNSIGNED_SHORT&&(W=i.R16UI),C===i.UNSIGNED_INT&&(W=i.R32UI),C===i.BYTE&&(W=i.R8I),C===i.SHORT&&(W=i.R16I),C===i.INT&&(W=i.R32I)),R===i.RG&&(C===i.FLOAT&&(W=i.RG32F),C===i.HALF_FLOAT&&(W=i.RG16F),C===i.UNSIGNED_BYTE&&(W=i.RG8)),R===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(W=i.RG8UI),C===i.UNSIGNED_SHORT&&(W=i.RG16UI),C===i.UNSIGNED_INT&&(W=i.RG32UI),C===i.BYTE&&(W=i.RG8I),C===i.SHORT&&(W=i.RG16I),C===i.INT&&(W=i.RG32I)),R===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(W=i.RGB8UI),C===i.UNSIGNED_SHORT&&(W=i.RGB16UI),C===i.UNSIGNED_INT&&(W=i.RGB32UI),C===i.BYTE&&(W=i.RGB8I),C===i.SHORT&&(W=i.RGB16I),C===i.INT&&(W=i.RGB32I)),R===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),C===i.UNSIGNED_INT&&(W=i.RGBA32UI),C===i.BYTE&&(W=i.RGBA8I),C===i.SHORT&&(W=i.RGBA16I),C===i.INT&&(W=i.RGBA32I)),R===i.RGB&&C===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),R===i.RGBA){const Tt=Y?co:re.getTransfer(U);C===i.FLOAT&&(W=i.RGBA32F),C===i.HALF_FLOAT&&(W=i.RGBA16F),C===i.UNSIGNED_BYTE&&(W=Tt===fe?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function v(I,R){let C;return I?R===null||R===Oi||R===_s?C=i.DEPTH24_STENCIL8:R===Dn?C=i.DEPTH32F_STENCIL8:R===nr&&(C=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Oi||R===_s?C=i.DEPTH_COMPONENT24:R===Dn?C=i.DEPTH_COMPONENT32F:R===nr&&(C=i.DEPTH_COMPONENT16),C}function A(I,R){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==an&&I.minFilter!==Mn?Math.log2(Math.max(R.width,R.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?R.mipmaps.length:1}function y(I){const R=I.target;R.removeEventListener("dispose",y),w(R),R.isVideoTexture&&u.delete(R)}function E(I){const R=I.target;R.removeEventListener("dispose",E),_(R)}function w(I){const R=n.get(I);if(R.__webglInit===void 0)return;const C=I.source,U=d.get(C);if(U){const Y=U[R.__cacheKey];Y.usedTimes--,Y.usedTimes===0&&M(I),Object.keys(U).length===0&&d.delete(C)}n.remove(I)}function M(I){const R=n.get(I);i.deleteTexture(R.__webglTexture);const C=I.source,U=d.get(C);delete U[R.__cacheKey],o.memory.textures--}function _(I){const R=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(R.__webglFramebuffer[U]))for(let Y=0;Y<R.__webglFramebuffer[U].length;Y++)i.deleteFramebuffer(R.__webglFramebuffer[U][Y]);else i.deleteFramebuffer(R.__webglFramebuffer[U]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[U])}else{if(Array.isArray(R.__webglFramebuffer))for(let U=0;U<R.__webglFramebuffer.length;U++)i.deleteFramebuffer(R.__webglFramebuffer[U]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let U=0;U<R.__webglColorRenderbuffer.length;U++)R.__webglColorRenderbuffer[U]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[U]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const C=I.textures;for(let U=0,Y=C.length;U<Y;U++){const W=n.get(C[U]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),o.memory.textures--),n.remove(C[U])}n.remove(I)}let T=0;function D(){T=0}function k(){const I=T;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),T+=1,I}function V(I){const R=[];return R.push(I.wrapS),R.push(I.wrapT),R.push(I.wrapR||0),R.push(I.magFilter),R.push(I.minFilter),R.push(I.anisotropy),R.push(I.internalFormat),R.push(I.format),R.push(I.type),R.push(I.generateMipmaps),R.push(I.premultiplyAlpha),R.push(I.flipY),R.push(I.unpackAlignment),R.push(I.colorSpace),R.join()}function X(I,R){const C=n.get(I);if(I.isVideoTexture&&yt(I),I.isRenderTargetTexture===!1&&I.version>0&&C.__version!==I.version){const U=I.image;if(U===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{lt(C,I,R);return}}e.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+R)}function G(I,R){const C=n.get(I);if(I.version>0&&C.__version!==I.version){lt(C,I,R);return}e.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+R)}function H(I,R){const C=n.get(I);if(I.version>0&&C.__version!==I.version){lt(C,I,R);return}e.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+R)}function B(I,R){const C=n.get(I);if(I.version>0&&C.__version!==I.version){wt(C,I,R);return}e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+R)}const tt={[io]:i.REPEAT,[zi]:i.CLAMP_TO_EDGE,[ba]:i.MIRRORED_REPEAT},ut={[an]:i.NEAREST,[Zf]:i.NEAREST_MIPMAP_NEAREST,[cr]:i.NEAREST_MIPMAP_LINEAR,[Mn]:i.LINEAR,[So]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},rt={[ed]:i.NEVER,[ad]:i.ALWAYS,[nd]:i.LESS,[ih]:i.LEQUAL,[id]:i.EQUAL,[od]:i.GEQUAL,[sd]:i.GREATER,[rd]:i.NOTEQUAL};function At(I,R){if(R.type===Dn&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===Mn||R.magFilter===So||R.magFilter===cr||R.magFilter===Ui||R.minFilter===Mn||R.minFilter===So||R.minFilter===cr||R.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,tt[R.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,tt[R.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,tt[R.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,ut[R.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,ut[R.minFilter]),R.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,rt[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===an||R.minFilter!==cr&&R.minFilter!==Ui||R.type===Dn&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const C=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function Ct(I,R){let C=!1;I.__webglInit===void 0&&(I.__webglInit=!0,R.addEventListener("dispose",y));const U=R.source;let Y=d.get(U);Y===void 0&&(Y={},d.set(U,Y));const W=V(R);if(W!==I.__cacheKey){Y[W]===void 0&&(Y[W]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,C=!0),Y[W].usedTimes++;const Tt=Y[I.__cacheKey];Tt!==void 0&&(Y[I.__cacheKey].usedTimes--,Tt.usedTimes===0&&M(R)),I.__cacheKey=W,I.__webglTexture=Y[W].texture}return C}function lt(I,R,C){let U=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(U=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(U=i.TEXTURE_3D);const Y=Ct(I,R),W=R.source;e.bindTexture(U,I.__webglTexture,i.TEXTURE0+C);const Tt=n.get(W);if(W.version!==Tt.__version||Y===!0){e.activeTexture(i.TEXTURE0+C);const ft=re.getPrimaries(re.workingColorSpace),_t=R.colorSpace===fi?null:re.getPrimaries(R.colorSpace),Dt=R.colorSpace===fi||ft===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Mt=x(R.image,!1,s.maxTextureSize);Mt=Ot(R,Mt);const O=r.convert(R.format,R.colorSpace),j=r.convert(R.type);let K=S(R.internalFormat,O,j,R.colorSpace,R.isVideoTexture);At(U,R);let F;const ht=R.mipmaps,vt=R.isVideoTexture!==!0,Lt=Tt.__version===void 0||Y===!0,$=W.dataReady,gt=A(R,Mt);if(R.isDepthTexture)K=v(R.format===ys,R.type),Lt&&(vt?e.texStorage2D(i.TEXTURE_2D,1,K,Mt.width,Mt.height):e.texImage2D(i.TEXTURE_2D,0,K,Mt.width,Mt.height,0,O,j,null));else if(R.isDataTexture)if(ht.length>0){vt&&Lt&&e.texStorage2D(i.TEXTURE_2D,gt,K,ht[0].width,ht[0].height);for(let ct=0,P=ht.length;ct<P;ct++)F=ht[ct],vt?$&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,F.width,F.height,O,j,F.data):e.texImage2D(i.TEXTURE_2D,ct,K,F.width,F.height,0,O,j,F.data);R.generateMipmaps=!1}else vt?(Lt&&e.texStorage2D(i.TEXTURE_2D,gt,K,Mt.width,Mt.height),$&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt.width,Mt.height,O,j,Mt.data)):e.texImage2D(i.TEXTURE_2D,0,K,Mt.width,Mt.height,0,O,j,Mt.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){vt&&Lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,K,ht[0].width,ht[0].height,Mt.depth);for(let ct=0,P=ht.length;ct<P;ct++)if(F=ht[ct],R.format!==Sn)if(O!==null)if(vt){if($)if(R.layerUpdates.size>0){const J=Wc(F.width,F.height,R.format,R.type);for(const et of R.layerUpdates){const bt=F.data.subarray(et*J/F.data.BYTES_PER_ELEMENT,(et+1)*J/F.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,et,F.width,F.height,1,O,bt)}R.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,F.width,F.height,Mt.depth,O,F.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,K,F.width,F.height,Mt.depth,0,F.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else vt?$&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,F.width,F.height,Mt.depth,O,j,F.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,K,F.width,F.height,Mt.depth,0,O,j,F.data)}else{vt&&Lt&&e.texStorage2D(i.TEXTURE_2D,gt,K,ht[0].width,ht[0].height);for(let ct=0,P=ht.length;ct<P;ct++)F=ht[ct],R.format!==Sn?O!==null?vt?$&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,F.width,F.height,O,F.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,K,F.width,F.height,0,F.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):vt?$&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,F.width,F.height,O,j,F.data):e.texImage2D(i.TEXTURE_2D,ct,K,F.width,F.height,0,O,j,F.data)}else if(R.isDataArrayTexture)if(vt){if(Lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,K,Mt.width,Mt.height,Mt.depth),$)if(R.layerUpdates.size>0){const ct=Wc(Mt.width,Mt.height,R.format,R.type);for(const P of R.layerUpdates){const J=Mt.data.subarray(P*ct/Mt.data.BYTES_PER_ELEMENT,(P+1)*ct/Mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,P,Mt.width,Mt.height,1,O,j,J)}R.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,O,j,Mt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,K,Mt.width,Mt.height,Mt.depth,0,O,j,Mt.data);else if(R.isData3DTexture)vt?(Lt&&e.texStorage3D(i.TEXTURE_3D,gt,K,Mt.width,Mt.height,Mt.depth),$&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,O,j,Mt.data)):e.texImage3D(i.TEXTURE_3D,0,K,Mt.width,Mt.height,Mt.depth,0,O,j,Mt.data);else if(R.isFramebufferTexture){if(Lt)if(vt)e.texStorage2D(i.TEXTURE_2D,gt,K,Mt.width,Mt.height);else{let ct=Mt.width,P=Mt.height;for(let J=0;J<gt;J++)e.texImage2D(i.TEXTURE_2D,J,K,ct,P,0,O,j,null),ct>>=1,P>>=1}}else if(ht.length>0){if(vt&&Lt){const ct=st(ht[0]);e.texStorage2D(i.TEXTURE_2D,gt,K,ct.width,ct.height)}for(let ct=0,P=ht.length;ct<P;ct++)F=ht[ct],vt?$&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,O,j,F):e.texImage2D(i.TEXTURE_2D,ct,K,O,j,F);R.generateMipmaps=!1}else if(vt){if(Lt){const ct=st(Mt);e.texStorage2D(i.TEXTURE_2D,gt,K,ct.width,ct.height)}$&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,O,j,Mt)}else e.texImage2D(i.TEXTURE_2D,0,K,O,j,Mt);m(R)&&h(U),Tt.__version=W.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function wt(I,R,C){if(R.image.length!==6)return;const U=Ct(I,R),Y=R.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+C);const W=n.get(Y);if(Y.version!==W.__version||U===!0){e.activeTexture(i.TEXTURE0+C);const Tt=re.getPrimaries(re.workingColorSpace),ft=R.colorSpace===fi?null:re.getPrimaries(R.colorSpace),_t=R.colorSpace===fi||Tt===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const Dt=R.isCompressedTexture||R.image[0].isCompressedTexture,Mt=R.image[0]&&R.image[0].isDataTexture,O=[];for(let P=0;P<6;P++)!Dt&&!Mt?O[P]=x(R.image[P],!0,s.maxCubemapSize):O[P]=Mt?R.image[P].image:R.image[P],O[P]=Ot(R,O[P]);const j=O[0],K=r.convert(R.format,R.colorSpace),F=r.convert(R.type),ht=S(R.internalFormat,K,F,R.colorSpace),vt=R.isVideoTexture!==!0,Lt=W.__version===void 0||U===!0,$=Y.dataReady;let gt=A(R,j);At(i.TEXTURE_CUBE_MAP,R);let ct;if(Dt){vt&&Lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,ht,j.width,j.height);for(let P=0;P<6;P++){ct=O[P].mipmaps;for(let J=0;J<ct.length;J++){const et=ct[J];R.format!==Sn?K!==null?vt?$&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,0,0,et.width,et.height,K,et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,ht,et.width,et.height,0,et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):vt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,0,0,et.width,et.height,K,F,et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,ht,et.width,et.height,0,K,F,et.data)}}}else{if(ct=R.mipmaps,vt&&Lt){ct.length>0&&gt++;const P=st(O[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,ht,P.width,P.height)}for(let P=0;P<6;P++)if(Mt){vt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,0,0,O[P].width,O[P].height,K,F,O[P].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,ht,O[P].width,O[P].height,0,K,F,O[P].data);for(let J=0;J<ct.length;J++){const bt=ct[J].image[P].image;vt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,0,0,bt.width,bt.height,K,F,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,ht,bt.width,bt.height,0,K,F,bt.data)}}else{vt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,0,0,K,F,O[P]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,ht,K,F,O[P]);for(let J=0;J<ct.length;J++){const et=ct[J];vt?$&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,0,0,K,F,et.image[P]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,ht,K,F,et.image[P])}}}m(R)&&h(i.TEXTURE_CUBE_MAP),W.__version=Y.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function zt(I,R,C,U,Y,W){const Tt=r.convert(C.format,C.colorSpace),ft=r.convert(C.type),_t=S(C.internalFormat,Tt,ft,C.colorSpace),Dt=n.get(R),Mt=n.get(C);if(Mt.__renderTarget=R,!Dt.__hasExternalTextures){const O=Math.max(1,R.width>>W),j=Math.max(1,R.height>>W);Y===i.TEXTURE_3D||Y===i.TEXTURE_2D_ARRAY?e.texImage3D(Y,W,_t,O,j,R.depth,0,Tt,ft,null):e.texImage2D(Y,W,_t,O,j,0,Tt,ft,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),St(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,U,Y,Mt.__webglTexture,0,dt(R)):(Y===i.TEXTURE_2D||Y>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Y<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,U,Y,Mt.__webglTexture,W),e.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(I,R,C){if(i.bindRenderbuffer(i.RENDERBUFFER,I),R.depthBuffer){const U=R.depthTexture,Y=U&&U.isDepthTexture?U.type:null,W=v(R.stencilBuffer,Y),Tt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=dt(R);St(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft,W,R.width,R.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,ft,W,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,W,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,I)}else{const U=R.textures;for(let Y=0;Y<U.length;Y++){const W=U[Y],Tt=r.convert(W.format,W.colorSpace),ft=r.convert(W.type),_t=S(W.internalFormat,Tt,ft,W.colorSpace),Dt=dt(R);C&&St(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Dt,_t,R.width,R.height):St(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Dt,_t,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,_t,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(I,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const U=n.get(R.depthTexture);U.__renderTarget=R,(!U.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),X(R.depthTexture,0);const Y=U.__webglTexture,W=dt(R);if(R.depthTexture.format===ds)St(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(R.depthTexture.format===ys)St(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function L(I){const R=n.get(I),C=I.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==I.depthTexture){const U=I.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),U){const Y=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,U.removeEventListener("dispose",Y)};U.addEventListener("dispose",Y),R.__depthDisposeCallback=Y}R.__boundDepthTexture=U}if(I.depthTexture&&!R.__autoAllocateDepthBuffer){if(C)throw new Error("target.depthTexture not supported in Cube render targets");Ut(R.__webglFramebuffer,I)}else if(C){R.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[U]),R.__webglDepthbuffer[U]===void 0)R.__webglDepthbuffer[U]=i.createRenderbuffer(),xt(R.__webglDepthbuffer[U],I,!1);else{const Y=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=R.__webglDepthbuffer[U];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,W)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),xt(R.__webglDepthbuffer,I,!1);else{const U=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Y=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Y),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,Y)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function q(I,R,C){const U=n.get(I);R!==void 0&&zt(U.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&L(I)}function it(I){const R=I.texture,C=n.get(I),U=n.get(R);I.addEventListener("dispose",E);const Y=I.textures,W=I.isWebGLCubeRenderTarget===!0,Tt=Y.length>1;if(Tt||(U.__webglTexture===void 0&&(U.__webglTexture=i.createTexture()),U.__version=R.version,o.memory.textures++),W){C.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(R.mipmaps&&R.mipmaps.length>0){C.__webglFramebuffer[ft]=[];for(let _t=0;_t<R.mipmaps.length;_t++)C.__webglFramebuffer[ft][_t]=i.createFramebuffer()}else C.__webglFramebuffer[ft]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){C.__webglFramebuffer=[];for(let ft=0;ft<R.mipmaps.length;ft++)C.__webglFramebuffer[ft]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let ft=0,_t=Y.length;ft<_t;ft++){const Dt=n.get(Y[ft]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&St(I)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let ft=0;ft<Y.length;ft++){const _t=Y[ft];C.__webglColorRenderbuffer[ft]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[ft]);const Dt=r.convert(_t.format,_t.colorSpace),Mt=r.convert(_t.type),O=S(_t.internalFormat,Dt,Mt,_t.colorSpace,I.isXRRenderTarget===!0),j=dt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,j,O,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,C.__webglColorRenderbuffer[ft])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),xt(C.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture),At(i.TEXTURE_CUBE_MAP,R);for(let ft=0;ft<6;ft++)if(R.mipmaps&&R.mipmaps.length>0)for(let _t=0;_t<R.mipmaps.length;_t++)zt(C.__webglFramebuffer[ft][_t],I,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,_t);else zt(C.__webglFramebuffer[ft],I,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);m(R)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ft=0,_t=Y.length;ft<_t;ft++){const Dt=Y[ft],Mt=n.get(Dt);e.bindTexture(i.TEXTURE_2D,Mt.__webglTexture),At(i.TEXTURE_2D,Dt),zt(C.__webglFramebuffer,I,Dt,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,0),m(Dt)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let ft=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ft=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,U.__webglTexture),At(ft,R),R.mipmaps&&R.mipmaps.length>0)for(let _t=0;_t<R.mipmaps.length;_t++)zt(C.__webglFramebuffer[_t],I,R,i.COLOR_ATTACHMENT0,ft,_t);else zt(C.__webglFramebuffer,I,R,i.COLOR_ATTACHMENT0,ft,0);m(R)&&h(ft),e.unbindTexture()}I.depthBuffer&&L(I)}function nt(I){const R=I.textures;for(let C=0,U=R.length;C<U;C++){const Y=R[C];if(m(Y)){const W=b(I),Tt=n.get(Y).__webglTexture;e.bindTexture(W,Tt),h(W),e.unbindTexture()}}}const Z=[],N=[];function Et(I){if(I.samples>0){if(St(I)===!1){const R=I.textures,C=I.width,U=I.height;let Y=i.COLOR_BUFFER_BIT;const W=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(I),ft=R.length>1;if(ft)for(let _t=0;_t<R.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let _t=0;_t<R.length;_t++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(Y|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(Y|=i.STENCIL_BUFFER_BIT)),ft){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[_t]);const Dt=n.get(R[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Dt,0)}i.blitFramebuffer(0,0,C,U,0,0,C,U,Y,i.NEAREST),l===!0&&(Z.length=0,N.length=0,Z.push(i.COLOR_ATTACHMENT0+_t),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Z.push(W),N.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,N)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Z))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ft)for(let _t=0;_t<R.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[_t]);const Dt=n.get(R[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,Dt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const R=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function dt(I){return Math.min(s.maxSamples,I.samples)}function St(I){const R=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function yt(I){const R=o.render.frame;u.get(I)!==R&&(u.set(I,R),I.update())}function Ot(I,R){const C=I.colorSpace,U=I.format,Y=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||C!==Es&&C!==fi&&(re.getTransfer(C)===fe?(U!==Sn||Y!==Un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",C)),R}function st(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=D,this.setTexture2D=X,this.setTexture2DArray=G,this.setTexture3D=H,this.setTextureCube=B,this.rebindTextures=q,this.setupRenderTarget=it,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=zt,this.useMultisampledRTT=St}function Ex(i,t){function e(n,s=fi){let r;const o=re.getTransfer(s);if(n===Un)return i.UNSIGNED_BYTE;if(n===hl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===fl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ju)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===$u)return i.BYTE;if(n===Yu)return i.SHORT;if(n===nr)return i.UNSIGNED_SHORT;if(n===ul)return i.INT;if(n===Oi)return i.UNSIGNED_INT;if(n===Dn)return i.FLOAT;if(n===zn)return i.HALF_FLOAT;if(n===Ku)return i.ALPHA;if(n===Zu)return i.RGB;if(n===Sn)return i.RGBA;if(n===Ju)return i.LUMINANCE;if(n===Qu)return i.LUMINANCE_ALPHA;if(n===ds)return i.DEPTH_COMPONENT;if(n===ys)return i.DEPTH_STENCIL;if(n===lo)return i.RED;if(n===dl)return i.RED_INTEGER;if(n===th)return i.RG;if(n===pl)return i.RG_INTEGER;if(n===ml)return i.RGBA_INTEGER;if(n===Kr||n===Zr||n===Jr||n===Qr)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wa||n===Ea||n===Ta||n===Aa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Aa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ra||n===Ca||n===Pa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ra||n===Ca)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Pa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===La||n===Ia||n===Da||n===za||n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba||n===Ga||n===Ha||n===Va||n===Wa)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===La)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ia)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Da)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===za)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ua)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Na)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Fa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Oa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ka)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ba)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ga)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ha)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Va)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Wa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===to||n===Xa||n===qa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===to)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Xa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===qa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===eh||n===$a||n===Ya||n===ja)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===to)return r.COMPRESSED_RED_RGTC1_EXT;if(n===$a)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ja)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Tx extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class we extends Ue{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ax={type:"move"};class jo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new we,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new we,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new we,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=u.position.distanceTo(p.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ax)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new we;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Rx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Cx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Px{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Re({vertexShader:Rx,fragmentShader:Cx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Kt(new Bi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Lx extends Ts{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,p=null,d=null,f=null,g=null;const x=new Px,m=e.getContextAttributes();let h=null,b=null;const S=[],v=[],A=new $t;let y=null;const E=new rn;E.viewport=new oe;const w=new rn;w.viewport=new oe;const M=[E,w],_=new Tx;let T=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(lt){let wt=S[lt];return wt===void 0&&(wt=new jo,S[lt]=wt),wt.getTargetRaySpace()},this.getControllerGrip=function(lt){let wt=S[lt];return wt===void 0&&(wt=new jo,S[lt]=wt),wt.getGripSpace()},this.getHand=function(lt){let wt=S[lt];return wt===void 0&&(wt=new jo,S[lt]=wt),wt.getHandSpace()};function k(lt){const wt=v.indexOf(lt.inputSource);if(wt===-1)return;const zt=S[wt];zt!==void 0&&(zt.update(lt.inputSource,lt.frame,c||o),zt.dispatchEvent({type:lt.type,data:lt.inputSource}))}function V(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",X);for(let lt=0;lt<S.length;lt++){const wt=v[lt];wt!==null&&(v[lt]=null,S[lt].disconnect(wt))}T=null,D=null,x.reset(),t.setRenderTarget(h),f=null,d=null,p=null,s=null,b=null,Ct.stop(),n.isPresenting=!1,t.setPixelRatio(y),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(lt){r=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(lt){a=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(lt){c=lt},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(lt){if(s=lt,s!==null){if(h=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",V),s.addEventListener("inputsourceschange",X),m.xrCompatible!==!0&&await e.makeXRCompatible(),y=t.getPixelRatio(),t.getSize(A),s.renderState.layers===void 0){const wt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new dn(f.framebufferWidth,f.framebufferHeight,{format:Sn,type:Un,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let wt=null,zt=null,xt=null;m.depth&&(xt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=m.stencil?ys:ds,zt=m.stencil?_s:Oi);const Ut={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};p=new XRWebGLBinding(s,e),d=p.createProjectionLayer(Ut),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new dn(d.textureWidth,d.textureHeight,{format:Sn,type:Un,depthTexture:new Sl(d.textureWidth,d.textureHeight,zt,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ct.setContext(s),Ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function X(lt){for(let wt=0;wt<lt.removed.length;wt++){const zt=lt.removed[wt],xt=v.indexOf(zt);xt>=0&&(v[xt]=null,S[xt].disconnect(zt))}for(let wt=0;wt<lt.added.length;wt++){const zt=lt.added[wt];let xt=v.indexOf(zt);if(xt===-1){for(let L=0;L<S.length;L++)if(L>=v.length){v.push(zt),xt=L;break}else if(v[L]===null){v[L]=zt,xt=L;break}if(xt===-1)break}const Ut=S[xt];Ut&&Ut.connect(zt)}}const G=new Q,H=new Q;function B(lt,wt,zt){G.setFromMatrixPosition(wt.matrixWorld),H.setFromMatrixPosition(zt.matrixWorld);const xt=G.distanceTo(H),Ut=wt.projectionMatrix.elements,L=zt.projectionMatrix.elements,q=Ut[14]/(Ut[10]-1),it=Ut[14]/(Ut[10]+1),nt=(Ut[9]+1)/Ut[5],Z=(Ut[9]-1)/Ut[5],N=(Ut[8]-1)/Ut[0],Et=(L[8]+1)/L[0],dt=q*N,St=q*Et,yt=xt/(-N+Et),Ot=yt*-N;if(wt.matrixWorld.decompose(lt.position,lt.quaternion,lt.scale),lt.translateX(Ot),lt.translateZ(yt),lt.matrixWorld.compose(lt.position,lt.quaternion,lt.scale),lt.matrixWorldInverse.copy(lt.matrixWorld).invert(),Ut[10]===-1)lt.projectionMatrix.copy(wt.projectionMatrix),lt.projectionMatrixInverse.copy(wt.projectionMatrixInverse);else{const st=q+yt,I=it+yt,R=dt-Ot,C=St+(xt-Ot),U=nt*it/I*st,Y=Z*it/I*st;lt.projectionMatrix.makePerspective(R,C,U,Y,st,I),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert()}}function tt(lt,wt){wt===null?lt.matrixWorld.copy(lt.matrix):lt.matrixWorld.multiplyMatrices(wt.matrixWorld,lt.matrix),lt.matrixWorldInverse.copy(lt.matrixWorld).invert()}this.updateCamera=function(lt){if(s===null)return;let wt=lt.near,zt=lt.far;x.texture!==null&&(x.depthNear>0&&(wt=x.depthNear),x.depthFar>0&&(zt=x.depthFar)),_.near=w.near=E.near=wt,_.far=w.far=E.far=zt,(T!==_.near||D!==_.far)&&(s.updateRenderState({depthNear:_.near,depthFar:_.far}),T=_.near,D=_.far),E.layers.mask=lt.layers.mask|2,w.layers.mask=lt.layers.mask|4,_.layers.mask=E.layers.mask|w.layers.mask;const xt=lt.parent,Ut=_.cameras;tt(_,xt);for(let L=0;L<Ut.length;L++)tt(Ut[L],xt);Ut.length===2?B(_,E,w):_.projectionMatrix.copy(E.projectionMatrix),ut(lt,_,xt)};function ut(lt,wt,zt){zt===null?lt.matrix.copy(wt.matrixWorld):(lt.matrix.copy(zt.matrixWorld),lt.matrix.invert(),lt.matrix.multiply(wt.matrixWorld)),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.updateMatrixWorld(!0),lt.projectionMatrix.copy(wt.projectionMatrix),lt.projectionMatrixInverse.copy(wt.projectionMatrixInverse),lt.isPerspectiveCamera&&(lt.fov=ir*2*Math.atan(1/lt.projectionMatrix.elements[5]),lt.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(lt){l=lt,d!==null&&(d.fixedFoveation=lt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=lt)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(_)};let rt=null;function At(lt,wt){if(u=wt.getViewerPose(c||o),g=wt,u!==null){const zt=u.views;f!==null&&(t.setRenderTargetFramebuffer(b,f.framebuffer),t.setRenderTarget(b));let xt=!1;zt.length!==_.cameras.length&&(_.cameras.length=0,xt=!0);for(let L=0;L<zt.length;L++){const q=zt[L];let it=null;if(f!==null)it=f.getViewport(q);else{const Z=p.getViewSubImage(d,q);it=Z.viewport,L===0&&(t.setRenderTargetTextures(b,Z.colorTexture,d.ignoreDepthValues?void 0:Z.depthStencilTexture),t.setRenderTarget(b))}let nt=M[L];nt===void 0&&(nt=new rn,nt.layers.enable(L),nt.viewport=new oe,M[L]=nt),nt.matrix.fromArray(q.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(q.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(it.x,it.y,it.width,it.height),L===0&&(_.matrix.copy(nt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),xt===!0&&_.cameras.push(nt)}const Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const L=p.getDepthInformation(zt[0]);L&&L.isValid&&L.texture&&x.init(t,L,s.renderState)}}for(let zt=0;zt<S.length;zt++){const xt=v[zt],Ut=S[zt];xt!==null&&Ut!==void 0&&Ut.update(xt,wt,c||o)}rt&&rt(lt,wt),wt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:wt}),g=null}const Ct=new dh;Ct.setAnimationLoop(At),this.setAnimationLoop=function(lt){rt=lt},this.dispose=function(){}}}const Ai=new Nn,Ix=new ae;function Dx(i,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,uh(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,b,S,v){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(m,h):h.isMeshToonMaterial?(r(m,h),p(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h)):h.isMeshStandardMaterial?(r(m,h),d(m,h),h.isMeshPhysicalMaterial&&f(m,h,v)):h.isMeshMatcapMaterial?(r(m,h),g(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),x(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,b,S):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===Je&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===Je&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const b=t.get(h),S=b.envMap,v=b.envMapRotation;S&&(m.envMap.value=S,Ai.copy(v),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),m.envMapRotation.value.setFromMatrix4(Ix.makeRotationFromEuler(Ai)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,b,S){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*b,m.scale.value=S*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function p(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function f(m,h,b){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Je&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const b=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function zx(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,S){const v=S.program;n.uniformBlockBinding(b,v)}function c(b,S){let v=s[b.id];v===void 0&&(g(b),v=u(b),s[b.id]=v,b.addEventListener("dispose",m));const A=S.program;n.updateUBOMapping(b,A);const y=t.render.frame;r[b.id]!==y&&(d(b),r[b.id]=y)}function u(b){const S=p();b.__bindingPointIndex=S;const v=i.createBuffer(),A=b.__size,y=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,A,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function p(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const S=s[b.id],v=b.uniforms,A=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let y=0,E=v.length;y<E;y++){const w=Array.isArray(v[y])?v[y]:[v[y]];for(let M=0,_=w.length;M<_;M++){const T=w[M];if(f(T,y,M,A)===!0){const D=T.__offset,k=Array.isArray(T.value)?T.value:[T.value];let V=0;for(let X=0;X<k.length;X++){const G=k[X],H=x(G);typeof G=="number"||typeof G=="boolean"?(T.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,D+V,T.__data)):G.isMatrix3?(T.__data[0]=G.elements[0],T.__data[1]=G.elements[1],T.__data[2]=G.elements[2],T.__data[3]=0,T.__data[4]=G.elements[3],T.__data[5]=G.elements[4],T.__data[6]=G.elements[5],T.__data[7]=0,T.__data[8]=G.elements[6],T.__data[9]=G.elements[7],T.__data[10]=G.elements[8],T.__data[11]=0):(G.toArray(T.__data,V),V+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,D,T.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,S,v,A){const y=b.value,E=S+"_"+v;if(A[E]===void 0)return typeof y=="number"||typeof y=="boolean"?A[E]=y:A[E]=y.clone(),!0;{const w=A[E];if(typeof y=="number"||typeof y=="boolean"){if(w!==y)return A[E]=y,!0}else if(w.equals(y)===!1)return w.copy(y),!0}return!1}function g(b){const S=b.uniforms;let v=0;const A=16;for(let E=0,w=S.length;E<w;E++){const M=Array.isArray(S[E])?S[E]:[S[E]];for(let _=0,T=M.length;_<T;_++){const D=M[_],k=Array.isArray(D.value)?D.value:[D.value];for(let V=0,X=k.length;V<X;V++){const G=k[V],H=x(G),B=v%A,tt=B%H.boundary,ut=B+tt;v+=tt,ut!==0&&A-ut<H.storage&&(v+=A-ut),D.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=v,v+=H.storage}}}const y=v%A;return y>0&&(v+=A-y),b.__size=v,b.__cache={},this}function x(b){const S={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function h(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:h}}class Ux{constructor(t={}){const{canvas:e=wd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,h=null;const b=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=sn,this.toneMapping=xi,this.toneMappingExposure=1;const v=this;let A=!1,y=0,E=0,w=null,M=-1,_=null;const T=new oe,D=new oe;let k=null;const V=new Ht(0);let X=0,G=e.width,H=e.height,B=1,tt=null,ut=null;const rt=new oe(0,0,G,H),At=new oe(0,0,G,H);let Ct=!1;const lt=new _l;let wt=!1,zt=!1;const xt=new ae,Ut=new ae,L=new Q,q=new oe,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function Z(){return w===null?B:1}let N=n;function Et(z,ot){return e.getContext(z,ot)}try{const z={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ll}`),e.addEventListener("webglcontextlost",P,!1),e.addEventListener("webglcontextrestored",J,!1),e.addEventListener("webglcontextcreationerror",et,!1),N===null){const ot="webgl2";if(N=Et(ot,z),N===null)throw Et(ot)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(z){throw console.error("THREE.WebGLRenderer: "+z.message),z}let dt,St,yt,Ot,st,I,R,C,U,Y,W,Tt,ft,_t,Dt,Mt,O,j,K,F,ht,vt,Lt,$;function gt(){dt=new Bg(N),dt.init(),vt=new Ex(N,dt),St=new zg(N,dt,t,vt),yt=new Sx(N,dt),St.reverseDepthBuffer&&d&&yt.buffers.depth.setReversed(!0),Ot=new Vg(N),st=new ax,I=new wx(N,dt,yt,st,St,vt,Ot),R=new Ng(v),C=new kg(v),U=new Kd(N),Lt=new Ig(N,U),Y=new Gg(N,U,Ot,Lt),W=new Xg(N,Y,U,Ot),K=new Wg(N,St,I),Mt=new Ug(st),Tt=new ox(v,R,C,dt,St,Lt,Mt),ft=new Dx(v,st),_t=new cx,Dt=new mx(dt),j=new Lg(v,R,C,yt,W,f,l),O=new yx(v,W,St),$=new zx(N,Ot,St,yt),F=new Dg(N,dt,Ot),ht=new Hg(N,dt,Ot),Ot.programs=Tt.programs,v.capabilities=St,v.extensions=dt,v.properties=st,v.renderLists=_t,v.shadowMap=O,v.state=yt,v.info=Ot}gt();const ct=new Lx(v,N);this.xr=ct,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const z=dt.get("WEBGL_lose_context");z&&z.loseContext()},this.forceContextRestore=function(){const z=dt.get("WEBGL_lose_context");z&&z.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(z){z!==void 0&&(B=z,this.setSize(G,H,!1))},this.getSize=function(z){return z.set(G,H)},this.setSize=function(z,ot,pt=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=z,H=ot,e.width=Math.floor(z*B),e.height=Math.floor(ot*B),pt===!0&&(e.style.width=z+"px",e.style.height=ot+"px"),this.setViewport(0,0,z,ot)},this.getDrawingBufferSize=function(z){return z.set(G*B,H*B).floor()},this.setDrawingBufferSize=function(z,ot,pt){G=z,H=ot,B=pt,e.width=Math.floor(z*pt),e.height=Math.floor(ot*pt),this.setViewport(0,0,z,ot)},this.getCurrentViewport=function(z){return z.copy(T)},this.getViewport=function(z){return z.copy(rt)},this.setViewport=function(z,ot,pt,mt){z.isVector4?rt.set(z.x,z.y,z.z,z.w):rt.set(z,ot,pt,mt),yt.viewport(T.copy(rt).multiplyScalar(B).round())},this.getScissor=function(z){return z.copy(At)},this.setScissor=function(z,ot,pt,mt){z.isVector4?At.set(z.x,z.y,z.z,z.w):At.set(z,ot,pt,mt),yt.scissor(D.copy(At).multiplyScalar(B).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(z){yt.setScissorTest(Ct=z)},this.setOpaqueSort=function(z){tt=z},this.setTransparentSort=function(z){ut=z},this.getClearColor=function(z){return z.copy(j.getClearColor())},this.setClearColor=function(){j.setClearColor.apply(j,arguments)},this.getClearAlpha=function(){return j.getClearAlpha()},this.setClearAlpha=function(){j.setClearAlpha.apply(j,arguments)},this.clear=function(z=!0,ot=!0,pt=!0){let mt=0;if(z){let at=!1;if(w!==null){const Nt=w.texture.format;at=Nt===ml||Nt===pl||Nt===dl}if(at){const Nt=w.texture.type,kt=Nt===Un||Nt===Oi||Nt===nr||Nt===_s||Nt===hl||Nt===fl,Vt=j.getClearColor(),Wt=j.getClearAlpha(),Zt=Vt.r,Qt=Vt.g,Xt=Vt.b;kt?(g[0]=Zt,g[1]=Qt,g[2]=Xt,g[3]=Wt,N.clearBufferuiv(N.COLOR,0,g)):(x[0]=Zt,x[1]=Qt,x[2]=Xt,x[3]=Wt,N.clearBufferiv(N.COLOR,0,x))}else mt|=N.COLOR_BUFFER_BIT}ot&&(mt|=N.DEPTH_BUFFER_BIT),pt&&(mt|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(mt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",P,!1),e.removeEventListener("webglcontextrestored",J,!1),e.removeEventListener("webglcontextcreationerror",et,!1),_t.dispose(),Dt.dispose(),st.dispose(),R.dispose(),C.dispose(),W.dispose(),Lt.dispose(),$.dispose(),Tt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Yt),ct.removeEventListener("sessionend",Jt),se.stop()};function P(z){z.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function J(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const z=Ot.autoReset,ot=O.enabled,pt=O.autoUpdate,mt=O.needsUpdate,at=O.type;gt(),Ot.autoReset=z,O.enabled=ot,O.autoUpdate=pt,O.needsUpdate=mt,O.type=at}function et(z){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",z.statusMessage)}function bt(z){const ot=z.target;ot.removeEventListener("dispose",bt),It(ot)}function It(z){Pt(z),st.remove(z)}function Pt(z){const ot=st.get(z).programs;ot!==void 0&&(ot.forEach(function(pt){Tt.releaseProgram(pt)}),z.isShaderMaterial&&Tt.releaseShaderCache(z))}this.renderBufferDirect=function(z,ot,pt,mt,at,Nt){ot===null&&(ot=it);const kt=at.isMesh&&at.matrixWorld.determinant()<0,Vt=Gh(z,ot,pt,mt,at);yt.setMaterial(mt,kt);let Wt=pt.index,Zt=1;if(mt.wireframe===!0){if(Wt=Y.getWireframeAttribute(pt),Wt===void 0)return;Zt=2}const Qt=pt.drawRange,Xt=pt.attributes.position;let le=Qt.start*Zt,ge=(Qt.start+Qt.count)*Zt;Nt!==null&&(le=Math.max(le,Nt.start*Zt),ge=Math.min(ge,(Nt.start+Nt.count)*Zt)),Wt!==null?(le=Math.max(le,0),ge=Math.min(ge,Wt.count)):Xt!=null&&(le=Math.max(le,0),ge=Math.min(ge,Xt.count));const ve=ge-le;if(ve<0||ve===1/0)return;Lt.setup(at,mt,Vt,pt,Wt);let Ke,ue=F;if(Wt!==null&&(Ke=U.get(Wt),ue=ht,ue.setIndex(Ke)),at.isMesh)mt.wireframe===!0?(yt.setLineWidth(mt.wireframeLinewidth*Z()),ue.setMode(N.LINES)):ue.setMode(N.TRIANGLES);else if(at.isLine){let qt=mt.linewidth;qt===void 0&&(qt=1),yt.setLineWidth(qt*Z()),at.isLineSegments?ue.setMode(N.LINES):at.isLineLoop?ue.setMode(N.LINE_LOOP):ue.setMode(N.LINE_STRIP)}else at.isPoints?ue.setMode(N.POINTS):at.isSprite&&ue.setMode(N.TRIANGLES);if(at.isBatchedMesh)if(at._multiDrawInstances!==null)ue.renderMultiDrawInstances(at._multiDrawStarts,at._multiDrawCounts,at._multiDrawCount,at._multiDrawInstances);else if(dt.get("WEBGL_multi_draw"))ue.renderMultiDraw(at._multiDrawStarts,at._multiDrawCounts,at._multiDrawCount);else{const qt=at._multiDrawStarts,On=at._multiDrawCounts,he=at._multiDrawCount,mn=Wt?U.get(Wt).bytesPerElement:1,Hi=st.get(mt).currentProgram.getUniforms();for(let Qe=0;Qe<he;Qe++)Hi.setValue(N,"_gl_DrawID",Qe),ue.render(qt[Qe]/mn,On[Qe])}else if(at.isInstancedMesh)ue.renderInstances(le,ve,at.count);else if(pt.isInstancedBufferGeometry){const qt=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,On=Math.min(pt.instanceCount,qt);ue.renderInstances(le,ve,On)}else ue.render(le,ve)};function Rt(z,ot,pt){z.transparent===!0&&z.side===ye&&z.forceSinglePass===!1?(z.side=Je,z.needsUpdate=!0,rr(z,ot,pt),z.side=vi,z.needsUpdate=!0,rr(z,ot,pt),z.side=ye):rr(z,ot,pt)}this.compile=function(z,ot,pt=null){pt===null&&(pt=z),h=Dt.get(pt),h.init(ot),S.push(h),pt.traverseVisible(function(at){at.isLight&&at.layers.test(ot.layers)&&(h.pushLight(at),at.castShadow&&h.pushShadow(at))}),z!==pt&&z.traverseVisible(function(at){at.isLight&&at.layers.test(ot.layers)&&(h.pushLight(at),at.castShadow&&h.pushShadow(at))}),h.setupLights();const mt=new Set;return z.traverse(function(at){if(!(at.isMesh||at.isPoints||at.isLine||at.isSprite))return;const Nt=at.material;if(Nt)if(Array.isArray(Nt))for(let kt=0;kt<Nt.length;kt++){const Vt=Nt[kt];Rt(Vt,pt,at),mt.add(Vt)}else Rt(Nt,pt,at),mt.add(Nt)}),S.pop(),h=null,mt},this.compileAsync=function(z,ot,pt=null){const mt=this.compile(z,ot,pt);return new Promise(at=>{function Nt(){if(mt.forEach(function(kt){st.get(kt).currentProgram.isReady()&&mt.delete(kt)}),mt.size===0){at(z);return}setTimeout(Nt,10)}dt.get("KHR_parallel_shader_compile")!==null?Nt():setTimeout(Nt,10)})};let Bt=null;function Gt(z){Bt&&Bt(z)}function Yt(){se.stop()}function Jt(){se.start()}const se=new dh;se.setAnimationLoop(Gt),typeof self<"u"&&se.setContext(self),this.setAnimationLoop=function(z){Bt=z,ct.setAnimationLoop(z),z===null?se.stop():se.start()},ct.addEventListener("sessionstart",Yt),ct.addEventListener("sessionend",Jt),this.render=function(z,ot){if(ot!==void 0&&ot.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ot.parent===null&&ot.matrixWorldAutoUpdate===!0&&ot.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(ot),ot=ct.getCamera()),z.isScene===!0&&z.onBeforeRender(v,z,ot,w),h=Dt.get(z,S.length),h.init(ot),S.push(h),Ut.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),lt.setFromProjectionMatrix(Ut),zt=this.localClippingEnabled,wt=Mt.init(this.clippingPlanes,zt),m=_t.get(z,b.length),m.init(),b.push(m),ct.enabled===!0&&ct.isPresenting===!0){const Nt=v.xr.getDepthSensingMesh();Nt!==null&&me(Nt,ot,-1/0,v.sortObjects)}me(z,ot,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(tt,ut),nt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,nt&&j.addToRenderList(m,z),this.info.render.frame++,wt===!0&&Mt.beginShadows();const pt=h.state.shadowsArray;O.render(pt,z,ot),wt===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const mt=m.opaque,at=m.transmissive;if(h.setupLights(),ot.isArrayCamera){const Nt=ot.cameras;if(at.length>0)for(let kt=0,Vt=Nt.length;kt<Vt;kt++){const Wt=Nt[kt];wn(mt,at,z,Wt)}nt&&j.render(z);for(let kt=0,Vt=Nt.length;kt<Vt;kt++){const Wt=Nt[kt];pn(m,z,Wt,Wt.viewport)}}else at.length>0&&wn(mt,at,z,ot),nt&&j.render(z),pn(m,z,ot);w!==null&&(I.updateMultisampleRenderTarget(w),I.updateRenderTargetMipmap(w)),z.isScene===!0&&z.onAfterRender(v,z,ot),Lt.resetDefaultState(),M=-1,_=null,S.pop(),S.length>0?(h=S[S.length-1],wt===!0&&Mt.setGlobalState(v.clippingPlanes,h.state.camera)):h=null,b.pop(),b.length>0?m=b[b.length-1]:m=null};function me(z,ot,pt,mt){if(z.visible===!1)return;if(z.layers.test(ot.layers)){if(z.isGroup)pt=z.renderOrder;else if(z.isLOD)z.autoUpdate===!0&&z.update(ot);else if(z.isLight)h.pushLight(z),z.castShadow&&h.pushShadow(z);else if(z.isSprite){if(!z.frustumCulled||lt.intersectsSprite(z)){mt&&q.setFromMatrixPosition(z.matrixWorld).applyMatrix4(Ut);const kt=W.update(z),Vt=z.material;Vt.visible&&m.push(z,kt,Vt,pt,q.z,null)}}else if((z.isMesh||z.isLine||z.isPoints)&&(!z.frustumCulled||lt.intersectsObject(z))){const kt=W.update(z),Vt=z.material;if(mt&&(z.boundingSphere!==void 0?(z.boundingSphere===null&&z.computeBoundingSphere(),q.copy(z.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),q.copy(kt.boundingSphere.center)),q.applyMatrix4(z.matrixWorld).applyMatrix4(Ut)),Array.isArray(Vt)){const Wt=kt.groups;for(let Zt=0,Qt=Wt.length;Zt<Qt;Zt++){const Xt=Wt[Zt],le=Vt[Xt.materialIndex];le&&le.visible&&m.push(z,kt,le,pt,q.z,Xt)}}else Vt.visible&&m.push(z,kt,Vt,pt,q.z,null)}}const Nt=z.children;for(let kt=0,Vt=Nt.length;kt<Vt;kt++)me(Nt[kt],ot,pt,mt)}function pn(z,ot,pt,mt){const at=z.opaque,Nt=z.transmissive,kt=z.transparent;h.setupLightsView(pt),wt===!0&&Mt.setGlobalState(v.clippingPlanes,pt),mt&&yt.viewport(T.copy(mt)),at.length>0&&Jn(at,ot,pt),Nt.length>0&&Jn(Nt,ot,pt),kt.length>0&&Jn(kt,ot,pt),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function wn(z,ot,pt,mt){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[mt.id]===void 0&&(h.state.transmissionRenderTarget[mt.id]=new dn(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float")?zn:Un,minFilter:Ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const Nt=h.state.transmissionRenderTarget[mt.id],kt=mt.viewport||T;Nt.setSize(kt.z,kt.w);const Vt=v.getRenderTarget();v.setRenderTarget(Nt),v.getClearColor(V),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),nt&&j.render(pt);const Wt=v.toneMapping;v.toneMapping=xi;const Zt=mt.viewport;if(mt.viewport!==void 0&&(mt.viewport=void 0),h.setupLightsView(mt),wt===!0&&Mt.setGlobalState(v.clippingPlanes,mt),Jn(z,pt,mt),I.updateMultisampleRenderTarget(Nt),I.updateRenderTargetMipmap(Nt),dt.has("WEBGL_multisampled_render_to_texture")===!1){let Qt=!1;for(let Xt=0,le=ot.length;Xt<le;Xt++){const ge=ot[Xt],ve=ge.object,Ke=ge.geometry,ue=ge.material,qt=ge.group;if(ue.side===ye&&ve.layers.test(mt.layers)){const On=ue.side;ue.side=Je,ue.needsUpdate=!0,Nl(ve,pt,mt,Ke,ue,qt),ue.side=On,ue.needsUpdate=!0,Qt=!0}}Qt===!0&&(I.updateMultisampleRenderTarget(Nt),I.updateRenderTargetMipmap(Nt))}v.setRenderTarget(Vt),v.setClearColor(V,X),Zt!==void 0&&(mt.viewport=Zt),v.toneMapping=Wt}function Jn(z,ot,pt){const mt=ot.isScene===!0?ot.overrideMaterial:null;for(let at=0,Nt=z.length;at<Nt;at++){const kt=z[at],Vt=kt.object,Wt=kt.geometry,Zt=mt===null?kt.material:mt,Qt=kt.group;Vt.layers.test(pt.layers)&&Nl(Vt,ot,pt,Wt,Zt,Qt)}}function Nl(z,ot,pt,mt,at,Nt){z.onBeforeRender(v,ot,pt,mt,at,Nt),z.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,z.matrixWorld),z.normalMatrix.getNormalMatrix(z.modelViewMatrix),at.onBeforeRender(v,ot,pt,mt,z,Nt),at.transparent===!0&&at.side===ye&&at.forceSinglePass===!1?(at.side=Je,at.needsUpdate=!0,v.renderBufferDirect(pt,ot,mt,at,z,Nt),at.side=vi,at.needsUpdate=!0,v.renderBufferDirect(pt,ot,mt,at,z,Nt),at.side=ye):v.renderBufferDirect(pt,ot,mt,at,z,Nt),z.onAfterRender(v,ot,pt,mt,at,Nt)}function rr(z,ot,pt){ot.isScene!==!0&&(ot=it);const mt=st.get(z),at=h.state.lights,Nt=h.state.shadowsArray,kt=at.state.version,Vt=Tt.getParameters(z,at.state,Nt,ot,pt),Wt=Tt.getProgramCacheKey(Vt);let Zt=mt.programs;mt.environment=z.isMeshStandardMaterial?ot.environment:null,mt.fog=ot.fog,mt.envMap=(z.isMeshStandardMaterial?C:R).get(z.envMap||mt.environment),mt.envMapRotation=mt.environment!==null&&z.envMap===null?ot.environmentRotation:z.envMapRotation,Zt===void 0&&(z.addEventListener("dispose",bt),Zt=new Map,mt.programs=Zt);let Qt=Zt.get(Wt);if(Qt!==void 0){if(mt.currentProgram===Qt&&mt.lightsStateVersion===kt)return Ol(z,Vt),Qt}else Vt.uniforms=Tt.getUniforms(z),z.onBeforeCompile(Vt,v),Qt=Tt.acquireProgram(Vt,Wt),Zt.set(Wt,Qt),mt.uniforms=Vt.uniforms;const Xt=mt.uniforms;return(!z.isShaderMaterial&&!z.isRawShaderMaterial||z.clipping===!0)&&(Xt.clippingPlanes=Mt.uniform),Ol(z,Vt),mt.needsLights=Vh(z),mt.lightsStateVersion=kt,mt.needsLights&&(Xt.ambientLightColor.value=at.state.ambient,Xt.lightProbe.value=at.state.probe,Xt.directionalLights.value=at.state.directional,Xt.directionalLightShadows.value=at.state.directionalShadow,Xt.spotLights.value=at.state.spot,Xt.spotLightShadows.value=at.state.spotShadow,Xt.rectAreaLights.value=at.state.rectArea,Xt.ltc_1.value=at.state.rectAreaLTC1,Xt.ltc_2.value=at.state.rectAreaLTC2,Xt.pointLights.value=at.state.point,Xt.pointLightShadows.value=at.state.pointShadow,Xt.hemisphereLights.value=at.state.hemi,Xt.directionalShadowMap.value=at.state.directionalShadowMap,Xt.directionalShadowMatrix.value=at.state.directionalShadowMatrix,Xt.spotShadowMap.value=at.state.spotShadowMap,Xt.spotLightMatrix.value=at.state.spotLightMatrix,Xt.spotLightMap.value=at.state.spotLightMap,Xt.pointShadowMap.value=at.state.pointShadowMap,Xt.pointShadowMatrix.value=at.state.pointShadowMatrix),mt.currentProgram=Qt,mt.uniformsList=null,Qt}function Fl(z){if(z.uniformsList===null){const ot=z.currentProgram.getUniforms();z.uniformsList=eo.seqWithValue(ot.seq,z.uniforms)}return z.uniformsList}function Ol(z,ot){const pt=st.get(z);pt.outputColorSpace=ot.outputColorSpace,pt.batching=ot.batching,pt.batchingColor=ot.batchingColor,pt.instancing=ot.instancing,pt.instancingColor=ot.instancingColor,pt.instancingMorph=ot.instancingMorph,pt.skinning=ot.skinning,pt.morphTargets=ot.morphTargets,pt.morphNormals=ot.morphNormals,pt.morphColors=ot.morphColors,pt.morphTargetsCount=ot.morphTargetsCount,pt.numClippingPlanes=ot.numClippingPlanes,pt.numIntersection=ot.numClipIntersection,pt.vertexAlphas=ot.vertexAlphas,pt.vertexTangents=ot.vertexTangents,pt.toneMapping=ot.toneMapping}function Gh(z,ot,pt,mt,at){ot.isScene!==!0&&(ot=it),I.resetTextureUnits();const Nt=ot.fog,kt=mt.isMeshStandardMaterial?ot.environment:null,Vt=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Es,Wt=(mt.isMeshStandardMaterial?C:R).get(mt.envMap||kt),Zt=mt.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,Qt=!!pt.attributes.tangent&&(!!mt.normalMap||mt.anisotropy>0),Xt=!!pt.morphAttributes.position,le=!!pt.morphAttributes.normal,ge=!!pt.morphAttributes.color;let ve=xi;mt.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(ve=v.toneMapping);const Ke=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,ue=Ke!==void 0?Ke.length:0,qt=st.get(mt),On=h.state.lights;if(wt===!0&&(zt===!0||z!==_)){const ln=z===_&&mt.id===M;Mt.setState(mt,z,ln)}let he=!1;mt.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==On.state.version||qt.outputColorSpace!==Vt||at.isBatchedMesh&&qt.batching===!1||!at.isBatchedMesh&&qt.batching===!0||at.isBatchedMesh&&qt.batchingColor===!0&&at.colorTexture===null||at.isBatchedMesh&&qt.batchingColor===!1&&at.colorTexture!==null||at.isInstancedMesh&&qt.instancing===!1||!at.isInstancedMesh&&qt.instancing===!0||at.isSkinnedMesh&&qt.skinning===!1||!at.isSkinnedMesh&&qt.skinning===!0||at.isInstancedMesh&&qt.instancingColor===!0&&at.instanceColor===null||at.isInstancedMesh&&qt.instancingColor===!1&&at.instanceColor!==null||at.isInstancedMesh&&qt.instancingMorph===!0&&at.morphTexture===null||at.isInstancedMesh&&qt.instancingMorph===!1&&at.morphTexture!==null||qt.envMap!==Wt||mt.fog===!0&&qt.fog!==Nt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==Mt.numPlanes||qt.numIntersection!==Mt.numIntersection)||qt.vertexAlphas!==Zt||qt.vertexTangents!==Qt||qt.morphTargets!==Xt||qt.morphNormals!==le||qt.morphColors!==ge||qt.toneMapping!==ve||qt.morphTargetsCount!==ue)&&(he=!0):(he=!0,qt.__version=mt.version);let mn=qt.currentProgram;he===!0&&(mn=rr(mt,ot,at));let Hi=!1,Qe=!1,Ls=!1;const _e=mn.getUniforms(),En=qt.uniforms;if(yt.useProgram(mn.program)&&(Hi=!0,Qe=!0,Ls=!0),mt.id!==M&&(M=mt.id,Qe=!0),Hi||_!==z){yt.buffers.depth.getReversed()?(xt.copy(z.projectionMatrix),Td(xt),Ad(xt),_e.setValue(N,"projectionMatrix",xt)):_e.setValue(N,"projectionMatrix",z.projectionMatrix),_e.setValue(N,"viewMatrix",z.matrixWorldInverse);const Qn=_e.map.cameraPosition;Qn!==void 0&&Qn.setValue(N,L.setFromMatrixPosition(z.matrixWorld)),St.logarithmicDepthBuffer&&_e.setValue(N,"logDepthBufFC",2/(Math.log(z.far+1)/Math.LN2)),(mt.isMeshPhongMaterial||mt.isMeshToonMaterial||mt.isMeshLambertMaterial||mt.isMeshBasicMaterial||mt.isMeshStandardMaterial||mt.isShaderMaterial)&&_e.setValue(N,"isOrthographic",z.isOrthographicCamera===!0),_!==z&&(_=z,Qe=!0,Ls=!0)}if(at.isSkinnedMesh){_e.setOptional(N,at,"bindMatrix"),_e.setOptional(N,at,"bindMatrixInverse");const ln=at.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),_e.setValue(N,"boneTexture",ln.boneTexture,I))}at.isBatchedMesh&&(_e.setOptional(N,at,"batchingTexture"),_e.setValue(N,"batchingTexture",at._matricesTexture,I),_e.setOptional(N,at,"batchingIdTexture"),_e.setValue(N,"batchingIdTexture",at._indirectTexture,I),_e.setOptional(N,at,"batchingColorTexture"),at._colorsTexture!==null&&_e.setValue(N,"batchingColorTexture",at._colorsTexture,I));const Is=pt.morphAttributes;if((Is.position!==void 0||Is.normal!==void 0||Is.color!==void 0)&&K.update(at,pt,mn),(Qe||qt.receiveShadow!==at.receiveShadow)&&(qt.receiveShadow=at.receiveShadow,_e.setValue(N,"receiveShadow",at.receiveShadow)),mt.isMeshGouraudMaterial&&mt.envMap!==null&&(En.envMap.value=Wt,En.flipEnvMap.value=Wt.isCubeTexture&&Wt.isRenderTargetTexture===!1?-1:1),mt.isMeshStandardMaterial&&mt.envMap===null&&ot.environment!==null&&(En.envMapIntensity.value=ot.environmentIntensity),Qe&&(_e.setValue(N,"toneMappingExposure",v.toneMappingExposure),qt.needsLights&&Hh(En,Ls),Nt&&mt.fog===!0&&ft.refreshFogUniforms(En,Nt),ft.refreshMaterialUniforms(En,mt,B,H,h.state.transmissionRenderTarget[z.id]),eo.upload(N,Fl(qt),En,I)),mt.isShaderMaterial&&mt.uniformsNeedUpdate===!0&&(eo.upload(N,Fl(qt),En,I),mt.uniformsNeedUpdate=!1),mt.isSpriteMaterial&&_e.setValue(N,"center",at.center),_e.setValue(N,"modelViewMatrix",at.modelViewMatrix),_e.setValue(N,"normalMatrix",at.normalMatrix),_e.setValue(N,"modelMatrix",at.matrixWorld),mt.isShaderMaterial||mt.isRawShaderMaterial){const ln=mt.uniformsGroups;for(let Qn=0,ti=ln.length;Qn<ti;Qn++){const kl=ln[Qn];$.update(kl,mn),$.bind(kl,mn)}}return mn}function Hh(z,ot){z.ambientLightColor.needsUpdate=ot,z.lightProbe.needsUpdate=ot,z.directionalLights.needsUpdate=ot,z.directionalLightShadows.needsUpdate=ot,z.pointLights.needsUpdate=ot,z.pointLightShadows.needsUpdate=ot,z.spotLights.needsUpdate=ot,z.spotLightShadows.needsUpdate=ot,z.rectAreaLights.needsUpdate=ot,z.hemisphereLights.needsUpdate=ot}function Vh(z){return z.isMeshLambertMaterial||z.isMeshToonMaterial||z.isMeshPhongMaterial||z.isMeshStandardMaterial||z.isShadowMaterial||z.isShaderMaterial&&z.lights===!0}this.getActiveCubeFace=function(){return y},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(z,ot,pt){st.get(z.texture).__webglTexture=ot,st.get(z.depthTexture).__webglTexture=pt;const mt=st.get(z);mt.__hasExternalTextures=!0,mt.__autoAllocateDepthBuffer=pt===void 0,mt.__autoAllocateDepthBuffer||dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),mt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(z,ot){const pt=st.get(z);pt.__webglFramebuffer=ot,pt.__useDefaultFramebuffer=ot===void 0},this.setRenderTarget=function(z,ot=0,pt=0){w=z,y=ot,E=pt;let mt=!0,at=null,Nt=!1,kt=!1;if(z){const Wt=st.get(z);if(Wt.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(N.FRAMEBUFFER,null),mt=!1;else if(Wt.__webglFramebuffer===void 0)I.setupRenderTarget(z);else if(Wt.__hasExternalTextures)I.rebindTextures(z,st.get(z.texture).__webglTexture,st.get(z.depthTexture).__webglTexture);else if(z.depthBuffer){const Xt=z.depthTexture;if(Wt.__boundDepthTexture!==Xt){if(Xt!==null&&st.has(Xt)&&(z.width!==Xt.image.width||z.height!==Xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(z)}}const Zt=z.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(kt=!0);const Qt=st.get(z).__webglFramebuffer;z.isWebGLCubeRenderTarget?(Array.isArray(Qt[ot])?at=Qt[ot][pt]:at=Qt[ot],Nt=!0):z.samples>0&&I.useMultisampledRTT(z)===!1?at=st.get(z).__webglMultisampledFramebuffer:Array.isArray(Qt)?at=Qt[pt]:at=Qt,T.copy(z.viewport),D.copy(z.scissor),k=z.scissorTest}else T.copy(rt).multiplyScalar(B).floor(),D.copy(At).multiplyScalar(B).floor(),k=Ct;if(yt.bindFramebuffer(N.FRAMEBUFFER,at)&&mt&&yt.drawBuffers(z,at),yt.viewport(T),yt.scissor(D),yt.setScissorTest(k),Nt){const Wt=st.get(z.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Wt.__webglTexture,pt)}else if(kt){const Wt=st.get(z.texture),Zt=ot||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,Wt.__webglTexture,pt||0,Zt)}M=-1},this.readRenderTargetPixels=function(z,ot,pt,mt,at,Nt,kt){if(!(z&&z.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Vt=st.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&kt!==void 0&&(Vt=Vt[kt]),Vt){yt.bindFramebuffer(N.FRAMEBUFFER,Vt);try{const Wt=z.texture,Zt=Wt.format,Qt=Wt.type;if(!St.textureFormatReadable(Zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ot>=0&&ot<=z.width-mt&&pt>=0&&pt<=z.height-at&&N.readPixels(ot,pt,mt,at,vt.convert(Zt),vt.convert(Qt),Nt)}finally{const Wt=w!==null?st.get(w).__webglFramebuffer:null;yt.bindFramebuffer(N.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(z,ot,pt,mt,at,Nt,kt){if(!(z&&z.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Vt=st.get(z).__webglFramebuffer;if(z.isWebGLCubeRenderTarget&&kt!==void 0&&(Vt=Vt[kt]),Vt){const Wt=z.texture,Zt=Wt.format,Qt=Wt.type;if(!St.textureFormatReadable(Zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(ot>=0&&ot<=z.width-mt&&pt>=0&&pt<=z.height-at){yt.bindFramebuffer(N.FRAMEBUFFER,Vt);const Xt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Xt),N.bufferData(N.PIXEL_PACK_BUFFER,Nt.byteLength,N.STREAM_READ),N.readPixels(ot,pt,mt,at,vt.convert(Zt),vt.convert(Qt),0);const le=w!==null?st.get(w).__webglFramebuffer:null;yt.bindFramebuffer(N.FRAMEBUFFER,le);const ge=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Ed(N,ge,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Xt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,Nt),N.deleteBuffer(Xt),N.deleteSync(ge),Nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(z,ot=null,pt=0){z.isTexture!==!0&&(js("WebGLRenderer: copyFramebufferToTexture function signature has changed."),ot=arguments[0]||null,z=arguments[1]);const mt=Math.pow(2,-pt),at=Math.floor(z.image.width*mt),Nt=Math.floor(z.image.height*mt),kt=ot!==null?ot.x:0,Vt=ot!==null?ot.y:0;I.setTexture2D(z,0),N.copyTexSubImage2D(N.TEXTURE_2D,pt,0,0,kt,Vt,at,Nt),yt.unbindTexture()},this.copyTextureToTexture=function(z,ot,pt=null,mt=null,at=0){z.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture function signature has changed."),mt=arguments[0]||null,z=arguments[1],ot=arguments[2],at=arguments[3]||0,pt=null);let Nt,kt,Vt,Wt,Zt,Qt,Xt,le,ge;const ve=z.isCompressedTexture?z.mipmaps[at]:z.image;pt!==null?(Nt=pt.max.x-pt.min.x,kt=pt.max.y-pt.min.y,Vt=pt.isBox3?pt.max.z-pt.min.z:1,Wt=pt.min.x,Zt=pt.min.y,Qt=pt.isBox3?pt.min.z:0):(Nt=ve.width,kt=ve.height,Vt=ve.depth||1,Wt=0,Zt=0,Qt=0),mt!==null?(Xt=mt.x,le=mt.y,ge=mt.z):(Xt=0,le=0,ge=0);const Ke=vt.convert(ot.format),ue=vt.convert(ot.type);let qt;ot.isData3DTexture?(I.setTexture3D(ot,0),qt=N.TEXTURE_3D):ot.isDataArrayTexture||ot.isCompressedArrayTexture?(I.setTexture2DArray(ot,0),qt=N.TEXTURE_2D_ARRAY):(I.setTexture2D(ot,0),qt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,ot.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ot.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,ot.unpackAlignment);const On=N.getParameter(N.UNPACK_ROW_LENGTH),he=N.getParameter(N.UNPACK_IMAGE_HEIGHT),mn=N.getParameter(N.UNPACK_SKIP_PIXELS),Hi=N.getParameter(N.UNPACK_SKIP_ROWS),Qe=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,ve.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ve.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Wt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Zt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Qt);const Ls=z.isDataArrayTexture||z.isData3DTexture,_e=ot.isDataArrayTexture||ot.isData3DTexture;if(z.isRenderTargetTexture||z.isDepthTexture){const En=st.get(z),Is=st.get(ot),ln=st.get(En.__renderTarget),Qn=st.get(Is.__renderTarget);yt.bindFramebuffer(N.READ_FRAMEBUFFER,ln.__webglFramebuffer),yt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let ti=0;ti<Vt;ti++)Ls&&N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,st.get(z).__webglTexture,at,Qt+ti),z.isDepthTexture?(_e&&N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,st.get(ot).__webglTexture,at,ge+ti),N.blitFramebuffer(Wt,Zt,Nt,kt,Xt,le,Nt,kt,N.DEPTH_BUFFER_BIT,N.NEAREST)):_e?N.copyTexSubImage3D(qt,at,Xt,le,ge+ti,Wt,Zt,Nt,kt):N.copyTexSubImage2D(qt,at,Xt,le,ge+ti,Wt,Zt,Nt,kt);yt.bindFramebuffer(N.READ_FRAMEBUFFER,null),yt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else _e?z.isDataTexture||z.isData3DTexture?N.texSubImage3D(qt,at,Xt,le,ge,Nt,kt,Vt,Ke,ue,ve.data):ot.isCompressedArrayTexture?N.compressedTexSubImage3D(qt,at,Xt,le,ge,Nt,kt,Vt,Ke,ve.data):N.texSubImage3D(qt,at,Xt,le,ge,Nt,kt,Vt,Ke,ue,ve):z.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,at,Xt,le,Nt,kt,Ke,ue,ve.data):z.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,at,Xt,le,ve.width,ve.height,Ke,ve.data):N.texSubImage2D(N.TEXTURE_2D,at,Xt,le,Nt,kt,Ke,ue,ve);N.pixelStorei(N.UNPACK_ROW_LENGTH,On),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,he),N.pixelStorei(N.UNPACK_SKIP_PIXELS,mn),N.pixelStorei(N.UNPACK_SKIP_ROWS,Hi),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Qe),at===0&&ot.generateMipmaps&&N.generateMipmap(qt),yt.unbindTexture()},this.copyTextureToTexture3D=function(z,ot,pt=null,mt=null,at=0){return z.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture3D function signature has changed."),pt=arguments[0]||null,mt=arguments[1]||null,z=arguments[2],ot=arguments[3],at=arguments[4]||0),js('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(z,ot,pt,mt,at)},this.initRenderTarget=function(z){st.get(z).__webglFramebuffer===void 0&&I.setupRenderTarget(z)},this.initTexture=function(z){z.isCubeTexture?I.setTextureCube(z,0):z.isData3DTexture?I.setTexture3D(z,0):z.isDataArrayTexture||z.isCompressedArrayTexture?I.setTexture2DArray(z,0):I.setTexture2D(z,0),yt.unbindTexture()},this.resetState=function(){y=0,E=0,w=null,yt.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return $n}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}class bl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=n}clone(){return new bl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Nx extends Ue{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nn,this.environmentIntensity=1,this.environmentRotation=new Nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Fx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ka,this.updateRanges=[],this.version=0,this.uuid=Kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const $e=new Q;class pi{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=yn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=yn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=yn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=yn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=yn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new pi(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class vh extends qe{constructor(t=null,e=1,n=1,s,r,o,a,l,c=an,u=an,p,d){super(null,o,a,l,c,u,s,r,p,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Js extends Me{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const is=new ae,Xc=new ae,Pr=[],qc=new Fn,Ox=new ae,Fs=new Kt,Os=new yi;class kx extends Kt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Js(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ox)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Fn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),qc.copy(t.boundingBox).applyMatrix4(is),this.boundingBox.union(qc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new yi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,is),Os.copy(t.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Os)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Fs.geometry=this.geometry,Fs.material=this.material,Fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Os.copy(this.boundingSphere),Os.applyMatrix4(n),t.ray.intersectsSphere(Os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,is),Xc.multiplyMatrices(n,is),Fs.matrixWorld=Xc,Fs.raycast(t,Pr);for(let o=0,a=Pr.length;o<a;o++){const l=Pr[o];l.instanceId=r,l.object=this,e.push(l)}Pr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Js(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new vh(new Float32Array(s*this.count),s,this.count,lo,Dn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Bx extends As{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const $c=new ae,Qa=new xl,Lr=new yi,Ir=new Q;class Gx extends Ue{constructor(t=new pe,e=new Bx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(s),Lr.radius+=r,t.ray.intersectsSphere(Lr)===!1)return;$c.copy(s).invert(),Qa.copy(t.ray).applyMatrix4($c);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,p=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){const m=c.getX(g);Ir.fromBufferAttribute(p,m),Yc(Ir,m,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(p.count,o.start+o.count);for(let g=d,x=f;g<x;g++)Ir.fromBufferAttribute(p,g),Yc(Ir,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Yc(i,t,e,n,s,r,o){const a=Qa.distanceSqToPoint(i);if(a<e){const l=new Q;Qa.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class _h extends qe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class wl extends pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new Q,u=new $t;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let p=0,d=3;p<=e;p++,d+=3){const f=n+p/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,l.push(u.x,u.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(a,3)),this.setAttribute("uv",new ne(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new wl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Cs extends pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],p=[],d=[],f=[];let g=0;const x=[],m=n/2;let h=0;b(),o===!1&&(t>0&&S(!0),e>0&&S(!1)),this.setIndex(u),this.setAttribute("position",new ne(p,3)),this.setAttribute("normal",new ne(d,3)),this.setAttribute("uv",new ne(f,2));function b(){const v=new Q,A=new Q;let y=0;const E=(e-t)/n;for(let w=0;w<=r;w++){const M=[],_=w/r,T=_*(e-t)+t;for(let D=0;D<=s;D++){const k=D/s,V=k*l+a,X=Math.sin(V),G=Math.cos(V);A.x=T*X,A.y=-_*n+m,A.z=T*G,p.push(A.x,A.y,A.z),v.set(X,E,G).normalize(),d.push(v.x,v.y,v.z),f.push(k,1-_),M.push(g++)}x.push(M)}for(let w=0;w<s;w++)for(let M=0;M<r;M++){const _=x[M][w],T=x[M+1][w],D=x[M+1][w+1],k=x[M][w+1];(t>0||M!==0)&&(u.push(_,T,k),y+=3),(e>0||M!==r-1)&&(u.push(T,D,k),y+=3)}c.addGroup(h,y,0),h+=y}function S(v){const A=g,y=new $t,E=new Q;let w=0;const M=v===!0?t:e,_=v===!0?1:-1;for(let D=1;D<=s;D++)p.push(0,m*_,0),d.push(0,_,0),f.push(.5,.5),g++;const T=g;for(let D=0;D<=s;D++){const V=D/s*l+a,X=Math.cos(V),G=Math.sin(V);E.x=M*G,E.y=m*_,E.z=M*X,p.push(E.x,E.y,E.z),d.push(0,_,0),y.x=X*.5+.5,y.y=G*.5*_+.5,f.push(y.x,y.y),g++}for(let D=0;D<s;D++){const k=A+D,V=T+D;v===!0?u.push(V,V+1,k):u.push(V+1,V,k),w+=3}c.addGroup(h,w,v===!0?1:2),h+=w}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class El extends Cs{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new El(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ho extends pe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const S=new Q,v=new Q,A=new Q;for(let y=0;y<e.length;y+=3)f(e[y+0],S),f(e[y+1],v),f(e[y+2],A),l(S,v,A,b)}function l(b,S,v,A){const y=A+1,E=[];for(let w=0;w<=y;w++){E[w]=[];const M=b.clone().lerp(v,w/y),_=S.clone().lerp(v,w/y),T=y-w;for(let D=0;D<=T;D++)D===0&&w===y?E[w][D]=M:E[w][D]=M.clone().lerp(_,D/T)}for(let w=0;w<y;w++)for(let M=0;M<2*(y-w)-1;M++){const _=Math.floor(M/2);M%2===0?(d(E[w][_+1]),d(E[w+1][_]),d(E[w][_])):(d(E[w][_+1]),d(E[w+1][_+1]),d(E[w+1][_]))}}function c(b){const S=new Q;for(let v=0;v<r.length;v+=3)S.x=r[v+0],S.y=r[v+1],S.z=r[v+2],S.normalize().multiplyScalar(b),r[v+0]=S.x,r[v+1]=S.y,r[v+2]=S.z}function u(){const b=new Q;for(let S=0;S<r.length;S+=3){b.x=r[S+0],b.y=r[S+1],b.z=r[S+2];const v=m(b)/2/Math.PI+.5,A=h(b)/Math.PI+.5;o.push(v,1-A)}g(),p()}function p(){for(let b=0;b<o.length;b+=6){const S=o[b+0],v=o[b+2],A=o[b+4],y=Math.max(S,v,A),E=Math.min(S,v,A);y>.9&&E<.1&&(S<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),A<.2&&(o[b+4]+=1))}}function d(b){r.push(b.x,b.y,b.z)}function f(b,S){const v=b*3;S.x=t[v+0],S.y=t[v+1],S.z=t[v+2]}function g(){const b=new Q,S=new Q,v=new Q,A=new Q,y=new $t,E=new $t,w=new $t;for(let M=0,_=0;M<r.length;M+=9,_+=6){b.set(r[M+0],r[M+1],r[M+2]),S.set(r[M+3],r[M+4],r[M+5]),v.set(r[M+6],r[M+7],r[M+8]),y.set(o[_+0],o[_+1]),E.set(o[_+2],o[_+3]),w.set(o[_+4],o[_+5]),A.copy(b).add(S).add(v).divideScalar(3);const T=m(A);x(y,_+0,b,T),x(E,_+2,S,T),x(w,_+4,v,T)}}function x(b,S,v,A){A<0&&b.x===1&&(o[S]=b.x-1),v.x===0&&v.z===0&&(o[S]=A/2/Math.PI+.5)}function m(b){return Math.atan2(b.z,-b.x)}function h(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ho(t.vertices,t.indices,t.radius,t.details)}}const Dr=new Q,zr=new Q,Ko=new Q,Ur=new hn;class Hx extends pe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ps*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],p=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:h}=Ur;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),h.fromBufferAttribute(a,c[2]),Ur.getNormal(Ko),p[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,p[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,p[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let b=0;b<3;b++){const S=(b+1)%3,v=p[b],A=p[S],y=Ur[u[b]],E=Ur[u[S]],w=`${v}_${A}`,M=`${A}_${v}`;M in d&&d[M]?(Ko.dot(d[M].normal)<=r&&(f.push(y.x,y.y,y.z),f.push(E.x,E.y,E.z)),d[M]=null):w in d||(d[w]={index0:c[b],index1:c[S],normal:Ko.clone()})}}for(const g in d)if(d[g]){const{index0:x,index1:m}=d[g];Dr.fromBufferAttribute(a,x),zr.fromBufferAttribute(a,m),f.push(Dr.x,Dr.y,Dr.z),f.push(zr.x,zr.y,zr.z)}this.setAttribute("position",new ne(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class mi extends ho{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mi(t.radius,t.detail)}}class on extends pe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let p=t;const d=(e-t)/s,f=new Q,g=new $t;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const h=r+m/n*o;f.x=p*Math.cos(h),f.y=p*Math.sin(h),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}p+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let h=0;h<n;h++){const b=h+m,S=b,v=b+n+1,A=b+n+2,y=b+1;a.push(S,v,y),a.push(v,A,y)}}this.setIndex(a),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(c,3)),this.setAttribute("uv",new ne(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new on(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Tl extends ho{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Tl(t.radius,t.detail)}}class Al extends pe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new Q,p=new Q,d=new Q;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const x=g/s*r,m=f/n*Math.PI*2;p.x=(t+e*Math.cos(m))*Math.cos(x),p.y=(t+e*Math.cos(m))*Math.sin(x),p.z=e*Math.sin(m),a.push(p.x,p.y,p.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,h=(s+1)*(f-1)+g,b=(s+1)*f+g;o.push(x,m,b),o.push(m,h,b)}this.setIndex(o),this.setAttribute("position",new ne(a,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Al(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Vx extends pe{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,s=new Q,r=new Q;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const p=l[c],d=p.start,f=p.count;for(let g=d,x=d+f;g<x;g+=3)for(let m=0;m<3;m++){const h=a.getX(g+m),b=a.getX(g+(m+1)%3);s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,b),jc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,p=3*a+(c+1)%3;s.fromBufferAttribute(o,u),r.fromBufferAttribute(o,p),jc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new ne(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function jc(i,t,e){const n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(s)===!0?!1:(e.add(n),e.add(s),!0)}class Wx extends Re{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class tl extends As{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nh,this.normalScale=new $t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nn,this.combine=cl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Rl extends Ue{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Xx extends Rl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Zo=new ae,Kc=new Q,Zc=new Q;class yh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $t(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new _l,this._frameExtents=new $t(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Kc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Kc),Zc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Zc),e.updateMatrixWorld(),Zo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Jc=new ae,ks=new Q,Jo=new Q;class qx extends yh{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new $t(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new Q(1,0,0),new Q(-1,0,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,1,0),new Q(0,-1,0)],this._cubeUps=[new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,0,1),new Q(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ks.setFromMatrixPosition(t.matrixWorld),n.position.copy(ks),Jo.copy(n.position),Jo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Jo),n.updateMatrixWorld(),s.makeTranslation(-ks.x,-ks.y,-ks.z),Jc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jc)}}class $x extends Rl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new qx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Yx extends yh{constructor(){super(new yl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qc extends Rl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ue.DEFAULT_UP),this.updateMatrix(),this.target=new Ue,this.shadow=new Yx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Mh extends pe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Sh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=tu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=tu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function tu(){return performance.now()}class el extends Fx{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const eu=new ae;class nu{constructor(t,e,n=0,s=1/0){this.ray=new xl(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new vl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return eu.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(eu),this}intersectObject(t,e=!0,n=[]){return nl(t,this,n,e),n.sort(iu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)nl(t[s],this,n,e);return n.sort(iu),n}}function iu(i,t){return i.distance-t.distance}function nl(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)nl(r[o],t,e,!0)}}const su=new Q,Nr=new Q;class jx{constructor(t=new Q,e=new Q){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){su.subVectors(t,this.start),Nr.subVectors(this.end,this.start);const n=Nr.dot(Nr);let r=Nr.dot(su)/n;return e&&(r=Xe(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ll}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ll);const bh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Gi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Kx=new yl(-1,1,1,-1,0,1);class Zx extends pe{constructor(){super(),this.setAttribute("position",new ne([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ne([0,2,0,0,2,0],2))}}const Jx=new Zx;class fo{constructor(t){this._mesh=new Kt(Jx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Kx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Qx extends Gi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Re?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=_i.clone(t.uniforms),this.material=new Re({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new fo(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class ru extends Gi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class tv extends Gi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class ev{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new $t);this._width=n.width,this._height=n.height,e=new dn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:zn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Qx(bh),this.copyPass.material.blending=jn,this.clock=new Sh}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}ru!==void 0&&(o instanceof ru?n=!0:o instanceof tv&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new $t);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class nv extends Gi{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ht}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const iv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ht(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ss extends Gi{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new $t(t.x,t.y):new $t(256,256),this.clearColor=new Ht(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new dn(r,o,{type:zn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let p=0;p<this.nMips;p++){const d=new dn(r,o,{type:zn});d.texture.name="UnrealBloomPass.h"+p,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new dn(r,o,{type:zn});f.texture.name="UnrealBloomPass.v"+p,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=iv;this.highPassUniforms=_i.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Re({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let p=0;p<this.nMips;p++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[p])),this.separableBlurMaterials[p].uniforms.invSize.value=new $t(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=bh;this.copyUniforms=_i.clone(u.uniforms),this.blendMaterial=new Re({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:ze,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ht,this.oldClearAlpha=1,this.basic=new be,this.fsQuad=new fo(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new $t(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ss.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ss.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Re({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new $t(.5,.5)},direction:{value:new $t(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new Re({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ss.BlurDirectionX=new $t(1,0);Ss.BlurDirectionY=new $t(0,1);const sv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class rv extends Gi{constructor(){super();const t=sv;this.uniforms=_i.clone(t.uniforms),this.material=new Wx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new fo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},re.getTransfer(this._outputColorSpace)===fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Bu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Gu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Hu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Vu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Wu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Xu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const ov=512,av=2,lv=.42;class cv extends Gi{constructor(t){super(),this.camera=t,this.needsSwap=!0,this.mat=new Re({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tMask:{value:null},uProjInv:{value:new ae},uCam:{value:new ae},uW0:{value:new $t},uBg:{value:new Ht(xe.background)},uGhost:{value:lv},uOn:{value:1},uShroud:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse, tDepth, tMask; uniform mat4 uProjInv, uCam; uniform vec2 uW0; uniform vec3 uBg; uniform float uGhost, uOn, uShroud;
        varying vec2 vUv;
        const float RES = ${ov.toFixed(1)}; const float K = ${av.toFixed(1)};
        float at(vec2 w){
          vec2 t = w * K;
          vec2 r = t - uW0;
          float inside = step(2.0, r.x) * step(r.x, RES - 2.0) * step(2.0, r.y) * step(r.y, RES - 2.0);
          return texture2D(tMask, t / RES).r * inside;
        }
        void main(){
          vec4 src = texture2D(tDiffuse, vUv);
          float d = texture2D(tDepth, vUv).x;
          if (uOn < 0.5 || d >= 0.99999) { gl_FragColor = src; return; }
          vec4 v = uProjInv * vec4(vUv * 2.0 - 1.0, d * 2.0 - 1.0, 1.0);
          vec3 w = (uCam * vec4(v.xyz / v.w, 1.0)).xyz;
          float r = 0.95 * smoothstep(0.25, 1.4, w.y);
          float m = at(w.xz);
          if (r > 0.0) m = max(m, max(max(at(w.xz + vec2(r, 0.0)), at(w.xz - vec2(r, 0.0))), max(at(w.xz + vec2(0.0, r)), at(w.xz - vec2(0.0, r)))));
          float a = mix(1.0 - uShroud, 1.0, smoothstep(0.0, uGhost, m));   // uShroud 1: unseen ground is hidden; 0: drawn
          float k = mix(0.5, 1.0, smoothstep(uGhost, 1.0, m));
          gl_FragColor = vec4(mix(uBg, src.rgb * k, a), src.a);
        }`,depthTest:!1,depthWrite:!1}),this.quad=new fo(this.mat)}setMask(t){this.mat.uniforms.tMask.value=t}setWindow(t,e){this.mat.uniforms.uW0.value.set(t,e)}setShroud(t){this.mat.uniforms.uShroud.value=t}setEnabled(t){this.mat.uniforms.uOn.value=t?1:0,this.enabled=!!t}render(t,e,n){const s=this.mat.uniforms;s.tDiffuse.value=n.texture,s.tDepth.value=n.depthTexture,this.camera.updateMatrixWorld(),s.uProjInv.value.copy(this.camera.projectionMatrixInverse),s.uCam.value.copy(this.camera.matrixWorld),t.setRenderTarget(this.renderToScreen?null:e),this.quad.render(t)}dispose(){this.mat.dispose(),this.quad.dispose()}}const ou=new Fn,Fr=new Q;class po extends Mh{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ne(t,3)),this.setAttribute("uv",new ne(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new el(e,6,1);return this.setAttribute("instanceStart",new pi(n,3,0)),this.setAttribute("instanceEnd",new pi(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new el(e,6,1);return this.setAttribute("instanceColorStart",new pi(n,3,0)),this.setAttribute("instanceColorEnd",new pi(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Vx(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ou.setFromBufferAttribute(e),this.boundingBox.union(ou))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Fr.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Fr)),Fr.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Fr));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}Ft.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new $t(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ze.line={uniforms:_i.merge([Ft.common,Ft.fog,Ft.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class mo extends Re{static get type(){return"LineMaterial"}constructor(t){super({uniforms:_i.clone(Ze.line.uniforms),vertexShader:Ze.line.vertexShader,fragmentShader:Ze.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Qo=new oe,au=new Q,lu=new Q,Oe=new oe,ke=new oe,An=new oe,ta=new Q,ea=new ae,Be=new jx,cu=new Q,Or=new Fn,kr=new yi,Rn=new oe;let In,Fi;function uu(i,t,e){return Rn.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),Rn.multiplyScalar(1/Rn.w),Rn.x=Fi/e.width,Rn.y=Fi/e.height,Rn.applyMatrix4(i.projectionMatrixInverse),Rn.multiplyScalar(1/Rn.w),Math.abs(Math.max(Rn.x,Rn.y))}function uv(i,t){const e=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,s.count);for(let a=0,l=o;a<l;a++){Be.start.fromBufferAttribute(s,a),Be.end.fromBufferAttribute(r,a),Be.applyMatrix4(e);const c=new Q,u=new Q;In.distanceSqToSegment(Be.start,Be.end,u,c),u.distanceTo(c)<Fi*.5&&t.push({point:u,pointOnLine:c,distance:In.origin.distanceTo(u),object:i,face:null,faceIndex:a,uv:null,uv1:null})}}function hv(i,t,e){const n=t.projectionMatrix,r=i.material.resolution,o=i.matrixWorld,a=i.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),p=-t.near;In.at(1,An),An.w=1,An.applyMatrix4(t.matrixWorldInverse),An.applyMatrix4(n),An.multiplyScalar(1/An.w),An.x*=r.x/2,An.y*=r.y/2,An.z=0,ta.copy(An),ea.multiplyMatrices(t.matrixWorldInverse,o);for(let d=0,f=u;d<f;d++){if(Oe.fromBufferAttribute(l,d),ke.fromBufferAttribute(c,d),Oe.w=1,ke.w=1,Oe.applyMatrix4(ea),ke.applyMatrix4(ea),Oe.z>p&&ke.z>p)continue;if(Oe.z>p){const S=Oe.z-ke.z,v=(Oe.z-p)/S;Oe.lerp(ke,v)}else if(ke.z>p){const S=ke.z-Oe.z,v=(ke.z-p)/S;ke.lerp(Oe,v)}Oe.applyMatrix4(n),ke.applyMatrix4(n),Oe.multiplyScalar(1/Oe.w),ke.multiplyScalar(1/ke.w),Oe.x*=r.x/2,Oe.y*=r.y/2,ke.x*=r.x/2,ke.y*=r.y/2,Be.start.copy(Oe),Be.start.z=0,Be.end.copy(ke),Be.end.z=0;const x=Be.closestPointToPointParameter(ta,!0);Be.at(x,cu);const m=Xn.lerp(Oe.z,ke.z,x),h=m>=-1&&m<=1,b=ta.distanceTo(cu)<Fi*.5;if(h&&b){Be.start.fromBufferAttribute(l,d),Be.end.fromBufferAttribute(c,d),Be.start.applyMatrix4(o),Be.end.applyMatrix4(o);const S=new Q,v=new Q;In.distanceSqToSegment(Be.start,Be.end,v,S),e.push({point:v,pointOnLine:S,distance:In.origin.distanceTo(v),object:i,face:null,faceIndex:d,uv:null,uv1:null})}}}class Cl extends Kt{constructor(t=new po,e=new mo({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)au.fromBufferAttribute(e,o),lu.fromBufferAttribute(n,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+au.distanceTo(lu);const r=new el(s,2,1);return t.setAttribute("instanceDistanceStart",new pi(r,1,0)),t.setAttribute("instanceDistanceEnd",new pi(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,s=t.camera;s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;In=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Fi=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),kr.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=Fi*.5;else{const p=Math.max(s.near,kr.distanceToPoint(In.origin));c=uu(s,p,l.resolution)}if(kr.radius+=c,In.intersectsSphere(kr)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Or.copy(a.boundingBox).applyMatrix4(o);let u;if(n)u=Fi*.5;else{const p=Math.max(s.near,Or.distanceToPoint(In.origin));u=uu(s,p,l.resolution)}Or.expandByScalar(u),In.intersectsBox(Or)!==!1&&(n?uv(this,e):hv(this,s,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Qo),this.material.uniforms.resolution.value.set(Qo.z,Qo.w))}}const fv=.38,dv=4.4,Br=3,ai=3.2,Qs=i=>.05+i*.18,De=i=>i?Qs(i.clearance):.05,qn=.05+3*.18+dv,pv=i=>i.solid?qn:Qs(i.clearance),mv=qn,jt={FLOOR:0,TILES:1,SOLIDS:2,BORDERS:3,FOOT:4,CREST:5,SECTOR:6,GLOW:20,CURTAIN:21,BEAM:22,GATE_LIGHT:23,TRAIL:25,HL_FILL:30,HL_OUTLINE:31,MARKERS:32,CURSOR:33,MOTES:40};function wh(i){return i.depthTest=!0,i.depthWrite=!1,i.polygonOffset=!0,i.polygonOffsetFactor=-2,i.polygonOffsetUnits=-2,i}function Ge(i,{depthTest:t=!0,offset:e=-1}={}){return i.transparent=!0,i.depthWrite=!1,i.depthTest=t,e&&!i.polygonOffset&&(i.polygonOffset=!0,i.polygonOffsetFactor=e,i.polygonOffsetUnits=e),i}let Bs=null;function gv(){if(Bs)return Bs;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.6,"rgba(255,255,255,0.14)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Bs=new _h(i),Bs.colorSpace=sn,Bs}const oo=4;function xv(){const i={value:Array.from({length:oo},()=>new oe(0,0,0,0))},t=new Q;return{uniform:i,update(e,n){for(let s=0;s<oo;s++){const r=n[s];if(!r||!(r.r>0)){i.value[s].set(0,0,0,0);continue}t.set(r.x,r.y,r.z).applyMatrix4(e.matrixWorldInverse),i.value[s].set(t.x,t.y,t.z,r.r)}}}}const Eh=`
uniform vec4 uCut[${oo}];
uniform float uMinVis;
varying vec3 vCutPos;
float cutVisibility(vec3 vp) {
  float vis = 1.0;
  for (int i = 0; i < ${oo}; i++) {
    vec4 c = uCut[i];
    if (c.w > 0.0 && vp.z > c.z + 0.45) {
      vec2 lat = vp.xy * (c.z / vp.z) - c.xy;
      vis = min(vis, smoothstep(c.w * 0.5, c.w, length(lat)));
    }
  }
  return vis;
}
float cutDither() {
  return fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
}
`,Th="{ float cv = mix(uMinVis, 1.0, cutVisibility(vCutPos)); if (cv < cutDither()) discard; }";function vv(i,t,{minVis:e=.08,stripes:n=!1}={}){return i.onBeforeCompile=s=>{s.uniforms.uCut=t.uniform,s.uniforms.uMinVis={value:e},s.vertexShader=s.vertexShader.replace("void main() {",`varying vec3 vCutPos;
varying float vWY;
void main() {`).replace("#include <project_vertex>",`#include <project_vertex>
vCutPos = mvPosition.xyz;
vWY = transformed.y;`),s.fragmentShader=s.fragmentShader.replace("void main() {",`varying float vWY;
${Eh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${Th}`),n&&(s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float sy = abs(fract(vWY * 0.45) - 0.5);
         diffuseColor.rgb *= 1.0 + 1.1 * smoothstep(0.06, 0.0, sy);`))},i.customProgramCacheKey=()=>`solid-cut-${n}`,i}function _v(i,t,{minVis:e=.22}={}){return i.uniforms.uCut=t.uniform,i.uniforms.uMinVis={value:e},i.vertexShader=i.vertexShader.replace("void main() {",`varying vec3 vCutPos;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
vCutPos = ( position.y < 0.5 ? start : end ).xyz;`),i.fragmentShader=i.fragmentShader.replace("void main() {",`${Eh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${Th}`),i.needsUpdate=!0,i}const Ah=.005;function yv(i,t=Ah){return i.uniforms.uPull={value:1-t},i.vertexShader=i.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
start.xyz *= uPull; end.xyz *= uPull;`),i.needsUpdate=!0,i}function Rh(i,t=Ah){const e=i.onBeforeCompile;return i.onBeforeCompile=(n,s)=>{e==null||e(n,s),n.uniforms.uPull={value:1-t},n.vertexShader=n.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("#include <project_vertex>",`
        vec4 mvPosition = vec4( transformed, 1.0 );
        mvPosition = modelViewMatrix * mvPosition;
        mvPosition.xyz *= uPull;
        gl_Position = projectionMatrix * mvPosition;`)},i.customProgramCacheKey=()=>"pull",i}function Mv(i,t,{dashed:e=!1}={}){const n=new po;n.setPositions(new Float32Array(t*6));const s=new Cl(n,i);e&&s.computeLineDistances();const r=n.attributes.instanceStart.data,o=e?n.attributes.instanceDistanceStart.data:null;return n.instanceCount=0,s.frustumCulled=!1,s.visible=!1,{line:s,set(a){const l=Math.min(Math.floor(a.length/6),t);for(let c=0;c<l*6;c++)r.array[c]=a[c];if(r.needsUpdate=!0,o){let c=0;for(let u=0;u<l;u++){const p=u*6,d=Math.hypot(a[p+3]-a[p],a[p+4]-a[p+1],a[p+5]-a[p+2]);o.array[u*2]=c,o.array[u*2+1]=c+d,c+=d}o.needsUpdate=!0}n.instanceCount=l,s.visible=l>0}}}function na(i){const t=[],e=[],n=new ae,s=new ki,r=new Q(1,1,1),o=new Ht;for(const l of i){const c=new bn(l.w,l.h,l.d).toNonIndexed();s.setFromAxisAngle(new Q(0,1,0),l.rot??0),n.compose(new Q(l.x,l.y,l.z),s,r),c.applyMatrix4(n),o.set(l.color).multiplyScalar(l.k??1);const u=c.getAttribute("position");for(let p=0;p<u.count;p++)t.push(u.getX(p),u.getY(p),u.getZ(p)),e.push(o.r,o.g,o.b);c.dispose()}const a=new pe;return a.setAttribute("position",new ne(t,3)),a.setAttribute("color",new ne(e,3)),a}const il=i=>{var t;return((t=i.cut)==null?void 0:t.poly)??i.poly},hu=160;function Ch({group:i,lineMats:t}){const e=({hex:n,fill:s,width:r,pulse:o})=>{const a=new pe,l=new Float32Array(hu*9);a.setAttribute("position",new Me(l,3)),a.setDrawRange(0,0);const c=Rh(Ge(new be({color:new Ht(n),opacity:s,transparent:!0,side:ye,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))),u=new Kt(a,c);u.renderOrder=jt.HL_FILL,u.frustumCulled=!1,u.visible=!1;const p=yv(Ge(new mo({color:new Ht(n).multiplyScalar(1.8),linewidth:r,worldUnits:!1,transparent:!0})));t.push(p);const d=Mv(p,320),f=d.line;f.renderOrder=jt.HL_OUTLINE,i.add(u,f);let g=null,x=s;return{get cell(){return g},set(m,{blocked:h=!1}={}){if(!m){g=null,u.visible=f.visible=!1;return}g=m;const b=new Ht(h?xe.blocked:n);c.color.copy(b),p.color.copy(b).multiplyScalar(1.8);const S=m.solid?il(m):m.poly,v=S.length,A=De(m),y=[],E=[],w=(_,T,D)=>E.push(..._,...T,...D);if(m.solid){const _=qn;for(let T=0;T<v;T++){const D=S[T],k=S[(T+1)%v];w([m.cx,_+.03,m.cz],[D[0],_+.03,D[1]],[k[0],_+.03,k[1]]),w([D[0],A,D[1]],[k[0],A,k[1]],[k[0],_,k[1]]),w([D[0],A,D[1]],[k[0],_,k[1]],[D[0],_,D[1]]),y.push(D[0],_+.05,D[1],k[0],_+.05,k[1]),y.push(D[0],A+.06,D[1],k[0],A+.06,k[1]),y.push(D[0],A+.06,D[1],D[0],_+.05,D[1])}}else{const _=A+.03,T=A+.06;for(let D=0;D<v;D++){const k=S[D],V=S[(D+1)%v];w([m.cx,_,m.cz],[k[0],_,k[1]],[V[0],_,V[1]]),y.push(k[0],T,k[1],V[0],T,V[1])}}const M=Math.min(E.length/9,hu);l.set(E.slice(0,M*9)),a.getAttribute("position").needsUpdate=!0,a.setDrawRange(0,M*3),d.set(y),u.visible=f.visible=!0,x=h?Math.max(s,.3):s},tick(m){g&&o?c.opacity=x*(.78+.22*Math.sin(m*4.5)):c.opacity=x}}};return{hover:e({hex:xe.hover,fill:.26,width:2.6,pulse:!0}),select:e({hex:xe.select,fill:.3,width:3.6,pulse:!1})}}function Ph(i){const t=new Re({fog:!0,uniforms:_i.merge([Ft.fog,{uBase:{value:new Ht(xe.floor)},uFocus:{value:new $t(0,0)}}]),vertexShader:`#include <fog_pars_vertex>
      varying vec3 vW;
      void main() {
        vec4 w = modelMatrix * vec4(position, 1.0);
        vW = w.xyz;
        vec4 mvPosition = viewMatrix * w;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,fragmentShader:`#include <fog_pars_fragment>
      varying vec3 vW; uniform vec3 uBase; uniform vec2 uFocus;
      float line(float v, float w) { float d = abs(fract(v - 0.5) - 0.5) / fwidth(v); return 1.0 - min(d / w, 1.0); }
      void main() {
        vec2 p = vW.xz;
        float g = max(line(p.x / 4.0, 0.9), line(p.y / 4.0, 0.9)) * 0.10;
        float big = max(line(p.x / 22.0, 1.2), line(p.y / 22.0, 1.2)) * 0.22;
        float d = length(p - uFocus);
        float pool = exp(-d * d / 640.0);
        vec3 c = uBase + (vec3(0.02, 0.10, 0.16) * g + vec3(0.03, 0.16, 0.26) * big) * (0.45 + 0.9 * pool);
        c += vec3(0.006, 0.03, 0.05) * pool;
        gl_FragColor = vec4(c, 1.0);
        #include <fog_fragment>
      }`}),e=new Kt(new Bi(900,900),t);return e.rotation.x=-Math.PI/2,e.position.y=-.05,e.renderOrder=jt.FLOOR,i.add(e),{floor:e,floorMat:t}}const ia=new WeakMap,fu=i=>`${Math.round(i[0]*20)},${Math.round(i[1]*20)}`;function Sv(i){var n;if((n=i.sectorEdges)!=null&&n.length)return i.sectorEdges;if(ia.has(i))return ia.get(i);const t=new Map;for(const s of i.cells){const r=s.poly.length;for(let o=0;o<r;o++){const a=s.poly[o],l=s.poly[(o+1)%r],c=fu(a),u=fu(l),p=c<u?`${c}|${u}`:`${u}|${c}`,d=t.get(p);d?d.sb=s.sector:t.set(p,{a,b:l,sa:s.sector,sb:null})}}const e=[];for(const s of t.values())s.sb===null?e.push({a:s.a,b:s.b,sa:s.sa,sb:-1}):s.sb!==s.sa&&e.push(s);return ia.set(i,e),e}function du(i,t){var s,r;const e=((s=i.sectors[t.sa])==null?void 0:s.clearance)??0,n=t.sb>=0?((r=i.sectors[t.sb])==null?void 0:r.clearance)??0:0;return Math.max(e,n)}const pu=i=>`${Math.round(i[0]*1e6)},${Math.round(i[1]*1e6)}`,Ni=(i,t)=>Nu(i,t);function bv(i,t){var g;const e=(g=i.span)!=null&&g.length?i.span.flatMap(x=>[x.a,x.b]):[i.edge.a,i.edge.b];let n=e[0],s=e[e.length-1],r=-1;for(let x=0;x<e.length;x++)for(let m=x+1;m<e.length;m++){const h=(e[x][0]-e[m][0])**2+(e[x][1]-e[m][1])**2;h>r&&(r=h,n=e[x],s=e[m])}const o=Math.sqrt(r)||i.len,a=(s[0]-n[0])/o,l=(s[1]-n[1])/o,c=[(n[0]+s[0])/2,(n[1]+s[1])/2];let u=-l,p=a;const d=t(i.a),f=t(i.b);return(f.cx-d.cx)*u+(f.cz-d.cz)*p<0&&(u=-u,p=-p),{s:n,e:s,mid:c,len:o,ax:a,az:l,nx:u,nz:p}}function wv(i){const t=new Set;for(const e of i)if(!e.locked)for(const n of e.span??[])t.add(Ni(n.a,n.b));return t}function Ev(i,t=[]){const e=wv(i);for(const n of t)if(!n.locked)for(const s of n.edges)e.add(Ni(s.a,s.b));return e}const Tv=(i,t)=>!!(i.open||i.gap||t.has(Ni(i.a,i.b))),gi=Object.freeze({minLen:.3,flat:.002,same:1e-4,endTol:1e-5}),Yn=(i,t)=>Math.hypot(i[0]-t[0],i[1]-t[1]),Gs=i=>`${Math.round(i[0]*1e7)},${Math.round(i[1]*1e7)}`,Av=(i,t)=>{const e=`${Math.round(i[0]/gi.same)},${Math.round(i[1]/gi.same)}`,n=`${Math.round(t[0]/gi.same)},${Math.round(t[1]/gi.same)}`;return e<n?`${e}|${n}`:`${n}|${e}`};function sa(i,t,e){const n=Yn(t,e);return n<1e-9?Yn(i,t):Math.abs((e[0]-t[0])*(t[1]-i[1])-(t[0]-i[0])*(e[1]-t[1]))/n}function Rv(i,t,e=gi.minLen,n=gi.flat){let s=[];for(const d of i)(!s.length||Yn(d,s[s.length-1])>1e-6)&&s.push(d);t&&s.length>1&&Yn(s[0],s[s.length-1])<=1e-6&&s.pop();const r=t?3:2,o={merged:0,fused:0},a=()=>s.length,l=d=>(d-1+a())%a(),c=d=>(d+1)%a(),u=d=>t||d>0&&d<a()-1;for(let d=0;d<4096&&a()>=r;d++){let f=-1;for(let g=0;g<a()&&f<0;g++){if(!u(g))continue;const x=s[l(g)],m=s[c(g)],h=s[g],b=(m[0]-x[0])*(h[0]-x[0])+(m[1]-x[1])*(h[1]-x[1]);sa(h,x,m)<n&&b>0&&b<(m[0]-x[0])**2+(m[1]-x[1])**2&&(f=g,o.merged++)}if(f<0){let g=-1,x=e;const m=t?a():a()-1;for(let h=0;h<m;h++){const b=Yn(s[h],s[c(h)]);b<x&&(x=b,g=h)}if(g>=0){const h=g,b=c(g),S=[];if(u(h)&&S.push([sa(s[h],s[l(h)],s[b]),h]),u(b)&&S.push([sa(s[b],s[h],s[c(b)]),b]),!S.length)return null;S.sort((v,A)=>v[0]-A[0]),f=S[0][1],o.fused++}}if(f<0)break;s=s.filter((g,x)=>x!==f)}if(a()<r)return null;let p=0;for(let d=0;d<(t?a():a()-1);d++)p+=Yn(s[d],s[c(d)]);return p<e?null:Object.assign(s,{stats:o})}function Cv(i){const t=new Map;i.forEach((r,o)=>{for(const a of[r.a,r.b]){const l=Gs(a);t.has(l)||t.set(l,[]),t.get(l).push(o)}});const e=new Uint8Array(i.length),n=[],s=(r,o)=>{const a=[r];let l=Gs(r),c=o;for(;;){e[c]=1;const u=i[c],p=Gs(u.a)===l?u.b:u.a;a.push(p),l=Gs(p);const d=t.get(l).filter(f=>!e[f]);if(t.get(l).length!==2||!d.length)break;c=d[0]}return a};for(const[r,o]of t)if(o.length!==2){for(const a of o)if(!e[a]){const l=i[a];n.push({pts:s(Gs(l.a)===r?l.a:l.b,a),closed:!1})}}for(let r=0;r<i.length;r++)e[r]||n.push({pts:s(i[r].a,r),closed:!0});return n}function Pv(i,t=null,e=null){const n=[],s=[],r=new Set,o={chains:0,merged:0,fused:0,duplicate:0};let a=i.sectorLines;if(!a){const l=(i.sectorEdges??[]).filter(u=>!(e&&t&&e(u,t))),c=new Map;for(const u of l){const p=`${u.sa}|${u.sb}`;c.has(p)||c.set(p,{sa:u.sa,sb:u.sb,edges:[]}),c.get(p).edges.push(u)}a=[];for(const u of c.values())for(const p of Cv(u.edges))a.push({...p,sa:u.sa,sb:u.sb,caps:p.closed?[]:["junction","junction"]})}for(const l of a){const c=Rv(l.pts,!!l.closed);if(!c){o.chains++;continue}o.merged+=c.stats.merged,o.fused+=c.stats.fused;const u={pts:[...c],closed:!!l.closed,sa:l.sa,sb:l.sb,caps:l.caps??[],fence:!!l.fence},p=u.closed?c.length:c.length-1,d=[];for(let f=0;f<p;f++){const g=c[f],x=c[(f+1)%c.length],m=Av(g,x);if(r.has(m)){o.duplicate++;continue}r.add(m),d.push({a:g,b:x,sa:l.sa,sb:l.sb})}d.length&&(n.push(u),s.push(...d))}return{runs:n,segments:s,dropped:o}}function Lv(i,t){for(const e of i){if(e.closed||e.sa!==t.sa||e.sb!==t.sb)continue;const n=[e.pts[0],e.pts[e.pts.length-1]];for(const[s,r]of n.entries())if(e.caps[s]!=="junction"&&(Yn(r,t.start)<gi.endTol||Yn(r,t.end)<gi.endTol))return!0}return!1}function Iv(i,t,e,n){const s=n?i.filter(n):i;if(!t)return s;const r=new Map;for(const o of t)o.kind!=="gap"&&r.set(`${o.sa}|${o.sb}|${o.slot}`,o);return s.filter(o=>{if(o.locked)return!0;const a=r.get(`${o.sa}|${o.sb}|${o.slot}`);return!!a&&Lv(e,a)})}const mu=Object.freeze({spacing:5,minGap:1.2});function Dv(i,t={}){const e=t.spacing??mu.spacing,n=t.minGap??mu.minGap,s=[];return i.forEach((r,o)=>{if(!r.fence)return;const a=r.closed?[...r.pts,r.pts[0]]:r.pts,l=[0];for(let f=1;f<a.length;f++)l.push(l[f-1]+Yn(a[f-1],a[f]));const c=l[l.length-1];if(!(c>0))return;const u=f=>{let g=1;for(;g<l.length-1&&l[g]<f;)g++;const x=(f-l[g-1])/(l[g]-l[g-1]||1);return[a[g-1][0]+(a[g][0]-a[g-1][0])*x,a[g-1][1]+(a[g][1]-a[g-1][1])*x]},p=Math.max(1,Math.round(c/e)),d=f=>!r.closed&&r.caps[f]==="opening";for(let f=0;f<=p&&!(r.closed&&f===p);f++){const g=!r.closed&&(f===0||f===p);if(g&&!d(f===0?0:1))continue;const x=f/p*c;!g&&!r.closed&&(x<n&&d(0)||c-x<n&&d(1))||s.push({p:u(x),kind:g?"end":"mid",run:o,at:x})}}),s}const go=.38,zv=1.8,gu=Object.freeze({glow:.65,curtain:.8}),Lh=i=>i>.001?Math.min(zv,i/go):0;function xu(i,t,e){if(!i)return;const n=Lh(e);i.opacity=Math.min(1,t*n),i.visible=n>0}const Uv=8;function Ih(i,{cut:t,chunk:e=null},n=()=>performance.now()){const s={deadline:1/0,now:n,n:0},r=Fv(i,{cut:t,chunk:e},s),o={board:null,done:!1,run(a=1/0){if(o.done)return!0;s.deadline=a;const l=r.next();return s.deadline=1/0,l.done&&(o.done=!0,o.board=l.value),o.done}};return o}function Nv(i,t){const e=Ih(i,t);return e.run(1/0),e.board}function*Fv(i,{cut:t,chunk:e},n){var gt,ct;const s=()=>n.deadline===1/0||++n.n<Uv?!1:(n.n=0,n.now()>=n.deadline),r=new we,o=e?e.lineMats:[],a=[],l=new Ht,c=(e==null?void 0:e.glowRef)??{v:go},u=[],p=(P,J)=>{u.push([P,J]),xu(P,J,c.v)},d=(P,J)=>{if(!e)return J();let et=e.shared.get(P);return et||e.shared.set(P,et=J()),et},f=P=>i.cellById?i.cellById(P):i.cells[P],g=new Set(i.cells);let x=(e==null?void 0:e.shows)??null;const m=new Map(i.gates.map(P=>[P,bv(P,f)])),h=new Map;for(const P of i.edgeCells??i.cells){s()&&(yield);const J=P.poly.length;for(let et=0;et<J;et++){const bt=P.poly[et],It=P.poly[(et+1)%J],Pt=Ni(bt,It),Rt=h.get(Pt)??{a:bt,b:It,cells:[],bandMax:0,solid:0};Rt.cells.push(P),Rt.bandMax=Math.max(Rt.bandMax,P.clearance),P.solid&&Rt.solid++,h.set(Pt,Rt)}}const b=Ev(i.gates,i.sectorOpenings),S=e?null:Ph(r).floorMat,v=[],A=new Map;for(const P of i.edgeCells??i.cells){if(s()&&(yield),!P.solid)continue;const J=il(P),et=J.length;for(let bt=0;bt<et;bt++){const It=J[bt],Pt=J[(bt+1)%et],Rt=h.get(Ni(It,Pt));if(Rt&&Rt.solid>1)continue;const Bt=Pt[0]-It[0],Gt=Pt[1]-It[1],Yt=Math.hypot(Bt,Gt);if(Yt<1e-4)continue;let Jt=Gt/Yt,se=-Bt/Yt;((It[0]+Pt[0])/2-P.cx)*Jt+((It[1]+Pt[1])/2-P.cz)*se<0&&(Jt=-Jt,se=-se);const me=Rt==null?void 0:Rt.cells.find(wn=>wn!==P&&!wn.solid),pn={c:P,a:It,b:Pt,nx:Jt,nz:se,y0:De(me??P),na:null,nb:null};g.has(P)&&v.push(pn);for(const wn of[It,Pt]){const Jn=pu(wn);(A.get(Jn)??A.set(Jn,[]).get(Jn)).push([Jt,se])}}}const y=(P,J,et)=>{let bt=0,It=0;for(const[Rt,Bt]of A.get(pu(P)))Rt*J+Bt*et>.6&&(bt+=Rt,It+=Bt);const Pt=Math.hypot(bt,It)||1;return[bt/Pt,It/Pt]};for(const P of v)s()&&(yield),P.na=y(P.a,P.nx,P.nz),P.nb=y(P.b,P.nx,P.nz);const E=[],w=[],M=[],_=[],T=[],D=[],k=[],V=[],X=(P,J,et,bt,It,Pt,Rt)=>{P.push(et,bt,It),J.push(Pt.r*Rt,Pt.g*Rt,Pt.b*Rt)},G=new Map;for(const P of v)(G.get(P.c.id)??G.set(P.c.id,[]).get(P.c.id)).push(P);for(const P of i.cells){s()&&(yield);const J=De(P),et=new Ht(Mi[P.clearance]),bt=Yh(P.id);if(P.solid){if((ct=(gt=P.cut)==null?void 0:gt.open)!=null&&ct.length){const Gt=E.length/3;for(const Yt of P.cut.open){let Jt=0,se=0;for(const me of Yt)Jt+=me[0],se+=me[1];Jt/=Yt.length,se/=Yt.length;for(let me=0;me<Yt.length;me++){const pn=Yt[me],wn=Yt[(me+1)%Yt.length];X(E,w,Jt,J,se,et,.16),X(E,w,pn[0],J,pn[1],et,.08),X(E,w,wn[0],J,wn[1],et,.08)}}V[P.id]={start:Gt,count:E.length/3-Gt}}const It=il(P),Pt=It.length,Rt=M.length/3,Bt=(Gt,Yt,Jt)=>{X(M,_,Gt,qn,Yt,et,Jt),T.push(0,1,0)};for(let Gt=0;Gt<Pt;Gt++){const Yt=It[Gt],Jt=It[(Gt+1)%Pt];Bt(P.cx,P.cz,.05+.03*bt),Bt(Yt[0],Yt[1],.1),Bt(Jt[0],Jt[1],.1)}for(const Gt of G.get(P.id)??[]){const Yt=(Jt,se,me,pn)=>{X(M,_,Jt[0],me,Jt[1],et,pn),T.push(se[0],0,se[1])};Yt(Gt.a,Gt.na,Gt.y0,.62),Yt(Gt.b,Gt.nb,Gt.y0,.62),Yt(Gt.b,Gt.nb,qn,.16),Yt(Gt.a,Gt.na,Gt.y0,.62),Yt(Gt.b,Gt.nb,qn,.16),Yt(Gt.a,Gt.na,qn,.16)}k[P.id]={start:Rt,count:M.length/3-Rt}}else{const It=P.poly.length,Pt=Math.max(.5,1-fv/Math.max(P.radius,1)),Rt=P.poly.map(([Jt,se])=>[P.cx+(Jt-P.cx)*Pt,P.cz+(se-P.cz)*Pt]),Bt=.2+.1*bt,Gt=.07+.05*bt,Yt=E.length/3;for(let Jt=0;Jt<It;Jt++){const se=Rt[Jt],me=Rt[(Jt+1)%It];X(E,w,P.cx,J,P.cz,et,Bt),X(E,w,se[0],J,se[1],et,Gt),X(E,w,me[0],J,me[1],et,Gt)}D[P.id]={start:Yt,count:E.length/3-Yt}}}const H=Float32Array.from(w),B=Float32Array.from(_),tt=(P,J,et,bt,It)=>{const Pt=new pe;Pt.setAttribute("position",new ne(P,3)),Pt.setAttribute("color",new ne(J,3)),et?Pt.setAttribute("normal",new ne(et,3)):Pt.computeVertexNormals();const Rt=new Kt(Pt,bt);return Rt.renderOrder=It,r.add(Rt),Rt},ut=new Array(E.length).fill(0).map((P,J)=>J%3===1?1:0),rt=tt(E,w,ut,d("tiles",()=>new tl({vertexColors:!0,side:ye,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),jt.TILES),At=M.length?tt(M,_,T,d("walls",()=>vv(new tl({vertexColors:!0,side:ye,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),t,{minVis:.07,stripes:!0})),jt.SOLIDS):null,Ct=(P,J,et,bt,{cutaway:It=!1,minVis:Pt=.25}={})=>{if(!P.length)return null;const Rt=new po;Rt.setPositions(P),Rt.setColors(J);const Bt=d(`line${et}|${It}|${Pt}`,()=>{const Yt=wh(new mo({vertexColors:!0,linewidth:et,worldUnits:!1,fog:!0}));return It&&_v(Yt,t,{minVis:Pt}),o.push(Yt),Yt}),Gt=new Cl(Rt,Bt);return Gt.renderOrder=bt,Gt.frustumCulled=!1,r.add(Gt),Gt},lt=(P,J,et,bt,It,Pt,Rt)=>{P.push(et[0],It,et[1],bt[0],Pt,bt[1]),J.push(Rt.r,Rt.g,Rt.b,Rt.r,Rt.g,Rt.b)},wt=Sv(i),zt=new Set(wt.map(P=>Ni(P.a,P.b))),xt=[],Ut=[];for(const P of h.values()){if(s()&&(yield),P.solid||P.cells.length<2||P.cells[0].sector!==P.cells[1].sector||!g.has(P.cells[0])||zt.has(Ni(P.a,P.b)))continue;l.set(Mi[P.bandMax]).multiplyScalar(.9);const J=Qs(P.bandMax)+.02;lt(xt,Ut,P.a,P.b,J,J,l)}const L=[],q=[],it=[],nt=[];for(const P of v){s()&&(yield);const J=P.c.clearance;l.set(Mi[J]).multiplyScalar(1.7),lt(L,q,P.a,P.b,qn+.02,qn+.02,l),l.set(Mi[J]).multiplyScalar(1),lt(it,nt,P.a,P.b,P.y0+.03,P.y0+.03,l)}const Z=[],N=[],Et=[],dt=[],St=[],yt=Pv(i,b,Tv);for(const P of yt.segments){s()&&(yield);const J=du(i,P),et=Qs(J)+.06;l.set(Mi[J]);const bt=l.clone(),It=P.a,Pt=P.b;lt(Et,dt,It,Pt,et,et,l.clone().multiplyScalar(1.9)),lt(Z,N,It,Pt,et+Br,et+Br,l.clone().multiplyScalar(1.5)),St.push({a:It,b:Pt,base:et,col:bt})}if(Ct(xt,Ut,1.1,jt.BORDERS),Ct(it,nt,1.5,jt.FOOT),Ct(L,q,2.8,jt.CREST,{cutaway:!0,minVis:.3}),Ct(Et,dt,3.4,jt.SECTOR),Ct(Z,N,2,jt.SECTOR,{cutaway:!0,minVis:.3}),St.length){const P=[],J=[];for(const It of St){s()&&(yield);const{a:Pt,b:Rt,base:Bt,col:Gt}=It,Yt=Bt+Br,Jt=(se,me,pn)=>{P.push(se[0],me,se[1]),J.push(Gt.r,Gt.g,Gt.b,pn)};Jt(Pt,Bt,.34),Jt(Rt,Bt,.34),Jt(Rt,Yt,0),Jt(Pt,Bt,.34),Jt(Rt,Yt,0),Jt(Pt,Yt,0)}const et=new pe;et.setAttribute("position",new ne(P,3)),et.setAttribute("color",new ne(J,4));const bt=new Kt(et,d("curtain",()=>Ge(new be({vertexColors:!0,transparent:!0,blending:ze,side:ye,toneMapped:!1}))));p(bt.material,gu.curtain),bt.renderOrder=jt.CURTAIN,bt.frustumCulled=!1,r.add(bt)}{const P=[];for(const J of Dv(yt.runs)){s()&&(yield);const et=yt.runs[J.run],bt=du(i,et),It=Qs(bt)+.06,Pt=J.kind==="end",Rt=Br+(Pt?.9:.35),Bt=Pt?.4:.22;l.set(Mi[bt]),P.push({x:J.p[0],y:It+Rt/2,z:J.p[1],w:Bt,h:Rt,d:Bt,color:l.getHex(),k:Pt?1.8:1.3}),Pt&&P.push({x:J.p[0],y:It+Rt+.12,z:J.p[1],w:.5,h:.5,d:.5,rot:Math.PI/4,color:16777215,k:1.2})}if(P.length){const J=new Kt(na(P),d("fencePosts",()=>{const et=Ge(new be({toneMapped:!1,blending:ze,transparent:!0}));return et.vertexColors=!0,et}));J.renderOrder=jt.GATE_LIGHT,J.frustumCulled=!1,r.add(J)}}const Ot=[],st=[],I=[],R=(P,J,et,bt,It,Pt,Rt)=>{Ot.push(P,J,et),st.push(bt.r,bt.g,bt.b,It),I.push(Pt,Rt)},C=(P,J,et,bt,It,Pt,Rt)=>{R(P-et,It,J-bt,Pt,Rt,0,0),R(P+et,It,J-bt,Pt,Rt,1,0),R(P+et,It,J+bt,Pt,Rt,1,1),R(P-et,It,J-bt,Pt,Rt,0,0),R(P+et,It,J+bt,Pt,Rt,1,1),R(P-et,It,J+bt,Pt,Rt,0,1)},U=1.7;for(const P of v){s()&&(yield);const J=P.y0+.04;l.set(Mi[P.c.clearance]);const et=[P.a[0]+P.na[0]*U,P.a[1]+P.na[1]*U],bt=[P.b[0]+P.nb[0]*U,P.b[1]+P.nb[1]*U];R(P.a[0],J,P.a[1],l,.42,.5,.5),R(P.b[0],J,P.b[1],l,.42,.5,.5),R(bt[0],J,bt[1],l,0,.5,.5),R(P.a[0],J,P.a[1],l,.42,.5,.5),R(bt[0],J,bt[1],l,0,.5,.5),R(et[0],J,et[1],l,0,.5,.5)}const Y=(P,J,et,bt)=>C(P.cx,P.cz,et,et,De(P)+.045,new Ht(J),bt),W=Iv(i.gates,i.sectorOpenings,yt.runs,i.drawsGate);for(const P of W){if(P.soft&&!P.locked)continue;const J=f(P.a);C(m.get(P).mid[0],m.get(P).mid[1],4.2,4.2,De(J)+.045,new Ht(P.locked?xe.gateLocked:xe.gateOpen),P.locked?.6:.38)}for(const P of i.cells)s()&&(yield),P.cache&&Y(P,P.payload?16751162:8256767,P.payload?5:2.6,P.payload?.5:.28);const Tt=i.beacons??[[i.startCell,xe.ally,0,2.4,.5],[i.pivotCell,10509567,7,2.2,.5],[i.vaultCell,16742938,14,3,.6]];for(const[P,J,,et,bt]of Tt)Y(P,J,et*2.6,bt*.5);{const P=new pe;P.setAttribute("position",new ne(Ot,3)),P.setAttribute("color",new ne(st,4)),P.setAttribute("uv",new ne(I,2));const J=new Kt(P,d("glow",()=>Ge(new be({map:gv(),vertexColors:!0,transparent:!0,blending:ze,side:ye,toneMapped:!1}))));p(J.material,gu.glow),J.renderOrder=jt.GLOW,J.frustumCulled=!1,r.add(J)}const ft=P=>{const{mid:J,len:et,ax:bt,az:It}=m.get(P),Pt=De(f(P.a)),Rt=et/2,Bt=Math.atan2(-It,bt);return[{x:J[0]+bt*Rt,y:Pt+ai/2,z:J[1]+It*Rt,w:.34,h:ai,d:.34,color:16777215},{x:J[0]-bt*Rt,y:Pt+ai/2,z:J[1]-It*Rt,w:.34,h:ai,d:.34,color:16777215},{x:J[0],y:Pt+ai,z:J[1],w:et+.34,h:.26,d:.26,rot:Bt,color:16777215}]},_t=(P,J)=>Ge(new be({color:new Ht(P).multiplyScalar(J),toneMapped:!1,blending:ze,transparent:!0})),Dt=[],Mt=[];for(const P of W)(P.locked||!P.soft)&&(P.locked?Mt:Dt).push(...ft(P));if(Dt.length){const P=new Kt(na(Dt),_t(xe.gateOpen,.85));P.material.vertexColors=!0,P.renderOrder=jt.GATE_LIGHT,P.frustumCulled=!1,r.add(P)}if(Mt.length){const P=new Kt(na(Mt),_t(xe.gateLocked,1.7));P.material.vertexColors=!0,P.renderOrder=jt.GATE_LIGHT,P.frustumCulled=!1,r.add(P),a.push(J=>{const et=.7+.5*Math.sin(J*3);P.material.color.set(xe.gateLocked).multiplyScalar(1.7*et)});for(const J of W.filter(et=>et.locked)){const{mid:et,len:bt,ax:It,az:Pt}=m.get(J),Rt=De(f(J.a)),Bt=bt/2,Gt=[et[0]-It*Bt,Rt,et[1]-Pt*Bt,et[0]+It*Bt,Rt,et[1]+Pt*Bt,et[0]+It*Bt,Rt+ai,et[1]+Pt*Bt,et[0]-It*Bt,Rt,et[1]-Pt*Bt,et[0]+It*Bt,Rt+ai,et[1]+Pt*Bt,et[0]-It*Bt,Rt+ai,et[1]-Pt*Bt],Yt=new pe;Yt.setAttribute("position",new ne(Gt,3));const Jt=Ge(new be({color:xe.gateLocked,opacity:.25,transparent:!0,blending:ze,side:ye,toneMapped:!1})),se=new Kt(Yt,Jt);se.renderOrder=jt.CURTAIN,se.frustumCulled=!1,r.add(se),a.push(me=>{Jt.opacity=.18+.12*Math.sin(me*3)})}}const O=(P,J,et,bt)=>{const It=new Ht(J).multiplyScalar(.95),Pt=De(P),Rt=et>0?new Kt(new Cs(.06,.16,et,12,1,!0),Ge(new be({color:It,transparent:!0,opacity:.32,blending:ze,toneMapped:!1,side:ye}))):null;Rt&&(Rt.position.set(P.cx,Pt+et/2,P.cz),Rt.renderOrder=jt.BEAM,r.add(Rt));const Bt=new Kt(new on(bt*.9,bt,48),Ge(new be({color:It,side:ye,transparent:!0,opacity:.45,blending:ze,toneMapped:!1})));Bt.rotation.x=-Math.PI/2,Bt.position.set(P.cx,Pt+.08,P.cz),Bt.renderOrder=jt.BEAM,r.add(Bt),a.push(Gt=>{Bt.scale.setScalar(1+.06*Math.sin(Gt*2+P.id))})};for(const[P,J,et,bt]of Tt)O(P,J,et,bt);const j=i.cells.filter(P=>P.cache);let K=null;if(j.length){K=new kx(new mi(.75),new be({toneMapped:!1}),j.length),K.renderOrder=jt.SOLIDS,K.frustumCulled=!1,j.forEach((Bt,Gt)=>K.setColorAt(Gt,new Ht(Bt.payload?16751162:8256767).multiplyScalar(1.25))),r.add(K);const P=new ae,J=new ki,et=new Q(0,1,0),bt=new Q,It=new Q,Pt=new Float32Array(j.length).fill(1);let Rt=0;a.push(Bt=>{const Gt=Math.min(.1,Math.max(0,Bt-Rt));Rt=Bt,j.forEach((Yt,Jt)=>{const se=!x||x(Yt.cx,Yt.cz,"dynamic");Pt[Jt]=se?Math.min(1,Pt[Jt]+Gt*5):Math.max(0,Pt[Jt]-Gt*5);const me=Pt[Jt]*(Yt.payload?1.8:.7+Math.min(Yt.cache,300)/600);bt.set(Yt.cx,De(Yt)+1.2+.25*Math.sin(Bt*1.6+Yt.id),Yt.cz),J.setFromAxisAngle(et,Bt*.8+Yt.id),P.compose(bt,J,It.set(me,me,me)),K.setMatrixAt(Jt,P)}),K.instanceMatrix.needsUpdate=!0})}const{hover:F,select:ht}=e?{hover:null,select:null}:Ch({group:r,lineMats:o}),vt=rt.geometry.getAttribute("color"),Lt=At==null?void 0:At.geometry.getAttribute("color");function $(P){for(const J of i.cells){const et=P(J),bt=J.solid?k[J.id]:D[J.id],It=J.solid?Lt:vt,Pt=J.solid?B:H;for(let Rt=bt.start*3;Rt<(bt.start+bt.count)*3;Rt++)It.array[Rt]=Pt[Rt]*et}for(const J of i.cells){const et=V[J.id];if(!et)continue;const bt=P(J);for(let It=et.start*3;It<(et.start+et.count)*3;It++)vt.array[It]=H[It]*bt}vt.needsUpdate=!0,Lt&&(Lt.needsUpdate=!0)}return{group:r,hover:F,select:ht,setBrightness:$,lineMats:o,floorMat:S,tiles:rt,walls:At,glass:yt,gates:W,pickables:K,update(P){for(const J of a)J(P);F==null||F.tick(P),ht==null||ht.tick(P)},setFocus(P,J){S==null||S.uniforms.uFocus.value.set(P,J)},setShows(P){x=P},setGlowLevel(P){c.v=P;for(const[J,et]of u)xu(J,et,P)},resize(P,J){for(const et of o)et.resolution.set(P,J)},dispose(){r.traverse(P=>{P.geometry&&P.geometry.dispose()})}}}const ce=(i,t,e,n,s,r={})=>({id:i,group:t,label:e,codes:n,help:s,...r}),Ps=Object.freeze([ce("moveUp","move","Move up",["KeyW","ArrowUp"],"Away from the camera"),ce("moveLeft","move","Move left",["KeyA","ArrowLeft"],"Left of the camera"),ce("moveDown","move","Move down",["KeyS","ArrowDown"],"Toward the camera"),ce("moveRight","move","Move right",["KeyD","ArrowRight"],"Right of the camera"),ce("run","move","Run",["ShiftLeft","ShiftRight"],"Hold to run"),ce("stop","move","Stop",["KeyX"],"Cancel the click-to-move order"),ce("weapon","skill","Weapon",["KeyF"],"Use the equipped weapon at the cursor"),ce("skill1","skill","Skill 1",["KeyQ"],"Skill slot 1, aimed at the cursor"),ce("skill2","skill","Skill 2",["KeyE"],"Skill slot 2, aimed at the cursor"),ce("skill3","skill","Skill 3",["KeyR"],"Skill slot 3, aimed at the cursor"),ce("skill4","skill","Skill 4",["KeyT"],"Skill slot 4, aimed at the cursor"),ce("device1","skill","Device 1",["Digit1"],"Place the device in slot 1 at the cursor"),ce("device2","skill","Device 2",["Digit2"],"Place the device in slot 2 at the cursor"),ce("device3","skill","Device 3",["Digit3"],"Place the device in slot 3 at the cursor"),ce("directive1","skill","Order 1",["Digit4"],"Companion directive 1, aimed at the cursor"),ce("directive2","skill","Order 2",["Digit5"],"Companion directive 2, aimed at the cursor"),ce("mode","skill","Mode",["KeyM"],"Cycle your equipped modes"),ce("ping","scan","Scan ping",["KeyC"],"Send a scan wave from your position"),ce("possess","companion","Possess",["Tab"],"Swap control to the other actor"),ce("companionHold","companion","Follow / hold",["KeyG"],"Companion follows you, or holds where it stands"),ce("camLeft","camera","Rotate left",["BracketLeft"],"Turn the view"),ce("camRight","camera","Rotate right",["BracketRight"],"Turn the view"),ce("camTiltUp","camera","Tilt up",["PageUp","Equal"],"Look more from above"),ce("camTiltDown","camera","Tilt down",["PageDown","Minus"],"Look more along the ground"),ce("camBehind","camera","Behind heading",["KeyV"],"The camera sits behind the way you face"),ce("camReset","camera","Reset view",["Home"],"Back to the home distance and tilt"),ce("overview","camera","Overview",["KeyO"],"Switch between chase and overview"),ce("help","system","Help",["KeyH","Slash"],"Open this guide (the game pauses)"),ce("settings","system","Settings",["Escape"],"Open the settings (the game pauses)",{fixed:!0}),ce("glow","system","Glow level",["KeyB"],"Cycle the glow"),ce("newSeed","system","New seed",["KeyN"],"Reload with a new world")]);Object.freeze(Ps.map(i=>i.id));const Pl=new Map(Ps.map(i=>[i.id,i])),xo=i=>Pl.get(i)??null;function Ll(i){const t={};if(!i||typeof i!="object")return t;for(const[e,n]of Object.entries(i)){const s=Pl.get(e);if(!s||s.fixed||!Array.isArray(n))continue;const r=n.filter(o=>typeof o=="string"&&/^[A-Za-z0-9]{1,24}$/.test(o));r.length&&(t[e]=[...new Set(r)])}return t}function Dh(i=null){const t=i&&typeof i=="object"?i:{};return Object.fromEntries(Ps.map(e=>[e.id,Array.isArray(t[e.id])&&t[e.id].length&&!e.fixed?t[e.id]:e.codes]))}const bs=(i,t)=>Dh(t)[i]??[];function Il(i,t=null){const e=Dh(t);for(const n of Ps)if(e[n.id].includes(i))return n.id;return null}const Ov=i=>i.key==="?"?"Slash":i.code,us=(i,t,e)=>bs(t,e).some(n=>i.has(n));function zh(i,t){return{sx:(us(i,"moveRight",t)?1:0)-(us(i,"moveLeft",t)?1:0),sy:(us(i,"moveUp",t)?1:0)-(us(i,"moveDown",t)?1:0)}}const vu={Escape:"Esc",Slash:"?",BracketLeft:"[",BracketRight:"]",PageUp:"PgUp",PageDown:"PgDn",Equal:"=",Minus:"-",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Space:"Space",Comma:",",Period:"."};function sl(i){return vu[i]?vu[i]:/^Key[A-Z]$/.test(i)?i.slice(3):/^Digit\d$/.test(i)?i.slice(5):i}function oy(i,t,e=99){const n=[];for(const s of bs(i,t)){const r=sl(s);n.includes(r)||n.push(r)}return n.slice(0,e).join(" / ")}const kv=["ControlLeft","ControlRight","AltLeft","AltRight","MetaLeft","MetaRight","OSLeft","OSRight"],Bv=["F5","F11","F12"],Gv=Ps.flatMap(i=>i.fixed?i.codes:[]);function Hv(i){if(typeof i!="string"||!/^[A-Za-z0-9]{1,24}$/.test(i)||i==="Unidentified")return"That key has no fixed code";const t=Ps.find(e=>e.fixed&&e.codes.includes(i));return t?`${sl(i)} is fixed to ${t.label}`:kv.includes(i)?"Ctrl, Alt and Meta are not bindable":Bv.includes(i)?`${sl(i)} belongs to the browser`:null}const Vv=(i,t)=>i.length===t.length&&i.every((e,n)=>e===t[n]),Gr=(i,t)=>Vv(t,xo(i).codes)?null:t,ay=(i,t=null)=>Array.isArray(t==null?void 0:t[i]);function ly(i=null,t=null){const e=i&&typeof i=="object"?i:{},n=t?[t]:Object.keys(e);return Object.fromEntries(n.filter(s=>Array.isArray(e[s])).map(s=>[s,null]))}function Wv(i,t,e,n){const s=xo(t);if(!s||s.fixed)return{kind:"refused",reason:"That key cannot be changed"};const r=bs(t,i);if(!Number.isInteger(e)||e<0||e>=r.length)return{kind:"refused",reason:"No such key"};const o=Hv(n);if(o)return{kind:"refused",reason:o};const a=r[e];if(n===a)return{kind:"set",changes:{}};const l=r.map((f,g)=>g===e?n:f),c=Il(n,i);if(c===null)return{kind:"set",changes:{[t]:Gr(t,l)}};if(c===t){const f=r.indexOf(n);return{kind:"set",changes:{[t]:Gr(t,r.map((g,x)=>x===e?n:x===f?a:g))}}}const u=bs(c,i),p=u.indexOf(n),d=u.map((f,g)=>g===p?a:f);return{kind:"conflict",owner:c,ownerIndex:p,swap:{[t]:Gr(t,l),[c]:Gr(c,d)}}}function cy(i,t,e=null){const n={state:null,apply:null,handled:!1};if(t.type==="start"){const r=xo(t.id),o=r&&!r.fixed?bs(t.id,e).length:0;return!Number.isInteger(t.index)||t.index<0||t.index>=o?n:{state:{phase:"listen",id:t.id,index:t.index,note:""},apply:null,handled:!0}}if(t.type==="cancel")return{state:null,apply:null,handled:i!==null};if(t.type==="swap")return(i==null?void 0:i.phase)==="conflict"?{state:null,apply:i.swap,handled:!0}:{state:i,apply:null,handled:!1};if(t.type!=="key"||!i)return n;if(Gv.includes(t.code))return{state:null,apply:null,handled:!0};if(t.repeat||i.phase==="conflict")return{state:i,apply:null,handled:!0};if(t.mods)return{state:{...i,note:"Ctrl, Alt and Meta are not bindable"},apply:null,handled:!0};const s=Wv(e,i.id,i.index,t.code);return s.kind==="refused"?{state:{...i,note:s.reason},apply:null,handled:!0}:s.kind==="set"?{state:null,apply:Object.keys(s.changes).length?s.changes:null,handled:!0}:{state:{phase:"conflict",id:i.id,index:i.index,code:t.code,owner:s.owner,ownerIndex:s.ownerIndex,swap:s.swap,note:""},apply:null,handled:!0}}function Xv(i=()=>null){const t=new Map;return{bind(e,n){if(!Pl.has(e))throw new Error(`unknown action ${e}`);const s=t.get(e)??new Set;return s.add(n),t.set(e,s),()=>s.delete(n)},handle(e){const n=Il(Ov(e),i()),s=n&&t.get(n);if(!s||!s.size)return!1;for(const r of[...s])r(n,e);return!0},has(e){var n;return(((n=t.get(e))==null?void 0:n.size)??0)>0}}}const Dl="boundless.settings.v1",uy=Object.freeze({controls:"Controls",display:"Display",dev:"Dev"});function qv(){const i=(t,e)=>({key:t,group:"dev",type:"range",def:di[t].value,min:di[t].min,max:di[t].max,step:.5,digits:1,unit:" u",label:e,hint:di[t].doc});return[i("navRadius","Stream: NAV radius"),i("renderRadius","Stream: mesh radius"),i("thickness","Stream: hysteresis band"),{...i("aheadBias","Stream: look-ahead"),off:0}]}function $v(){const i={poolSize:"Load: workers",batch:"Load: sectors per job",inflight:"Load: jobs in flight",adoptMs:"Load: adopt budget",adoptMax:"Load: sectors adopted a frame"};return Object.keys(nn).map(t=>{const e=nn[t],n=[e.value,e.min,e.max].every(Number.isInteger);return{key:t,group:"dev",type:"range",def:e.value,min:e.min,max:e.max,step:n?1:.5,digits:n?0:1,unit:` ${e.unit}`,label:i[t],hint:e.doc,...t==="poolSize"?{off:0}:{}}})}const zl=Object.freeze([{key:"invertYaw",group:"controls",type:"toggle",def:!0,label:"Invert horizontal rotation",hint:"Middle-drag left / right"},{key:"invertPitch",group:"controls",type:"toggle",def:!0,label:"Invert tilt",hint:"Middle-drag up / down"},{key:"sensitivity",group:"controls",type:"range",def:1,min:.3,max:2.5,step:.05,digits:2,unit:"x",label:"Rotation sensitivity"},{key:"glow",group:"display",type:"range",def:.38,min:0,max:1,step:.02,digits:2,off:0,label:"Glow"},{key:"cutaway",group:"display",type:"toggle",def:!0,label:"Cut-away near actors",hint:"See through walls around you"},{key:"sightRadius",group:"dev",type:"range",def:36,min:8,max:90,step:1,digits:0,unit:" u",label:"Fog lit range",hint:"Flood distance plus line of sight; the default camera shows about 27 units"},{key:"sightSoft",group:"dev",type:"range",def:.25,min:.05,max:.7,step:.01,digits:2,label:"Fog edge softness",hint:"Share of the range that ramps lit to ghost"},{key:"ghostFade",group:"dev",type:"range",def:1.2,min:.2,max:8,step:.1,digits:1,unit:" s",label:"Ghost fade time",hint:"Lit to ghost after sight is lost"},{key:"revealRate",group:"dev",type:"range",def:6,min:1,max:30,step:.5,digits:1,unit:"/s",label:"Reveal speed",hint:"How fast a texel brightens into sight"},{key:"revealStep",group:"dev",type:"range",def:.5,min:.1,max:3,step:.05,digits:2,unit:" u",label:"Reveal step",hint:"Distance moved per sight re-solve (sub-cell exposure)"},{key:"shroud",group:"dev",type:"range",def:1,min:0,max:1,step:.05,digits:2,label:"Shroud darkness",hint:"1 hides unseen ground, 0 shows it"},{key:"atmosphere",group:"dev",type:"range",def:1,min:0,max:2,step:.05,digits:2,off:0,label:"Atmosphere density",hint:"Depth haze and drifting motes"},{key:"bloomRadius",group:"dev",type:"range",def:.32,min:0,max:1,step:.02,digits:2,label:"Glow radius"},{key:"bloomThreshold",group:"dev",type:"range",def:.85,min:0,max:1.5,step:.01,digits:2,label:"Glow threshold"},{key:"pathDensity",group:"dev",type:"range",def:1.5,min:.3,max:3,step:.05,digits:2,unit:"/u",label:"Path chevron density",hint:"Chevrons per world unit along a route (uniform pitch)"},{key:"pathSize",group:"dev",type:"range",def:.8,min:.3,max:1.6,step:.02,digits:2,unit:" u",label:"Path chevron size",hint:"Arm length of one chevron"},{key:"pathGlow",group:"dev",type:"range",def:.95,min:.1,max:2,step:.05,digits:2,label:"Path chevron glow",hint:"Brightness; the default stays under the bloom threshold"},{key:"pathAngle",group:"dev",type:"range",def:124,min:70,max:170,step:1,digits:0,unit:" deg",label:"Path chevron angle",hint:"Total opening of the chevron: larger is flatter and less acute"},{key:"pingCooldown",group:"dev",type:"range",def:0,min:0,max:30,step:.1,digits:1,unit:" s",off:0,label:"Ping cooldown",hint:"Seconds of world time between scan pings; off is unlimited (waves may overlap freely)"},{key:"pingMaxWaves",group:"dev",type:"range",def:16,min:1,max:40,step:1,digits:0,label:"Max concurrent waves",hint:"A ping is refused while this many waves are still on the board; the front budget is shared between them"},{key:"scanBand",group:"dev",type:"range",def:3.2,min:.5,max:12,step:.1,digits:1,unit:" u",label:"Scan front width",hint:"Width of the luminous band behind the edge of a scan wave"},{key:"camDist",group:"dev",type:"range",def:19,min:9,max:70,step:1,digits:0,unit:" u",label:"Camera distance",hint:"Chase view home distance (wheel still zooms)"},{key:"camPitch",group:"dev",type:"range",def:58,min:35,max:88,step:1,digits:0,unit:" deg",label:"Camera pitch",hint:"Chase view home tilt"},{key:"fov",group:"dev",type:"range",def:50,min:5,max:90,step:1,digits:0,unit:" deg",label:"Field of view",hint:"The camera dollies back as it narrows, so the framing holds (5 is a long lens)"},...qv(),...$v()]),Yv=zl.filter(i=>i.type==="range"),jv=zl.filter(i=>i.type==="toggle"),fn=Object.freeze(Object.fromEntries(zl.map(i=>[i.key,i.def]))),Hr=Object.freeze(Object.fromEntries(Yv.map(i=>[i.key,[i.min,i.max,i.step]]))),Kv=jv.map(i=>i.key),Zv=(i,t,e)=>Math.min(e,Math.max(t,i));function hy(i,t){return i.type==="toggle"?t?"on":"off":i.off!==void 0&&t<=i.off+1e-9?"off":`${Number(t).toFixed(i.digits??0)}${i.unit??""}`}function sr(i){const t={...fn};if(!i||typeof i!="object")return t;for(const e of Kv)typeof i[e]=="boolean"&&(t[e]=i[e]);for(const e of Object.keys(Hr)){const n=Number(i[e]);i[e]!==null&&i[e]!==""&&Number.isFinite(n)&&(t[e]=Zv(Hr[e][2]===1?Math.round(n):n,Hr[e][0],Hr[e][1]))}return t}function Jv(i=globalThis.localStorage){try{const t=i==null?void 0:i.getItem(Dl);return sr(t?JSON.parse(t):null)}catch{return{...fn}}}function Qv(i=globalThis.localStorage){var t;try{const e=i==null?void 0:i.getItem(Dl);return Ll(e?(t=JSON.parse(e))==null?void 0:t.keys:null)}catch{return{}}}function t_(i,t=globalThis.localStorage,e=null){try{const n=Ll(e);return t==null||t.setItem(Dl,JSON.stringify(Object.keys(n).length?{...sr(i),keys:n}:sr(i))),!0}catch{return!1}}function rl(i,t,e){const n=i.sensitivity;return{dyaw:t*.006*n*(i.invertYaw?-1:1),dpitch:e*.004*n*(i.invertPitch?-1:1)}}function e_(i=globalThis.localStorage){let t=Jv(i),e=Qv(i);const n=new Set,s=()=>{for(const o of n)o(t)},r=()=>t_(t,i,e);return{get:()=>t,keys:()=>e,set(o){return t=sr({...t,...o}),r(),s(),t},setKeys(o){const a={...e};for(const[l,c]of Object.entries(o??{}))c===null?delete a[l]:a[l]=c;return e=Ll(a),r(),s(),e},reset(o){const a=o===void 0?null:[].concat(o);return t=a?sr({...t,...Object.fromEntries(a.filter(l=>l in fn).map(l=>[l,fn[l]]))}):{...fn},a||(e={}),r(),s(),t},subscribe(o){return n.add(o),o(t),()=>n.delete(o)}}}const Ul=Object.freeze({slop:12,longS:.45,doubleS:.32,doubleDist:36,pinch:.06,twist:.12,pan:14,pressSlop:24}),ra=Math.PI*2,Uh=i=>((i+Math.PI)%ra+ra)%ra-Math.PI,ol=(i,t,e,n)=>Math.hypot(e-i,n-t);function _u(i,t){return{d:Math.hypot(t.x-i.x,t.y-i.y),ang:Math.atan2(t.y-i.y,t.x-i.x),mx:(i.x+t.x)/2,my:(i.y+t.y)/2}}function n_(i,t,e=Ul){const n={zoom:i.d>0&&t.d>0?Math.abs(Math.log(t.d/i.d))/e.pinch:0,twist:Math.abs(Uh(t.ang-i.ang))/e.twist,horizontal:Math.abs(t.mx-i.mx)/e.pan,vertical:Math.abs(t.my-i.my)/e.pan};let s=null,r=0;for(const o of Object.keys(n))n[o]>r&&(r=n[o],s=o);return r>=1?s:null}const i_=Object.freeze({zoom:"zoom",twist:"rotate",horizontal:"rotate",vertical:"tilt"});function s_(i,t,e,n){const s={zoom:1,yaw:0,pitch:0};if(e==="zoom")i.d>0&&t.d>0&&(s.zoom=i.d/t.d);else if(e==="rotate"){const r=n.invertYaw?-1:1;s.yaw=Uh(t.ang-i.ang)*(n.sensitivity??1)*r+rl(n,t.mx-i.mx,0).dyaw}else e==="tilt"&&(s.pitch=rl(n,0,t.my-i.my).dpitch);return s}function r_(i=Ul){const t=new Map;let e=null;const n=()=>{for(const s of t.values())if(s.peek)return!0;return!1};return{down(s,r,o,a){if(t.set(s,{x0:r,y0:o,x:r,y:o,t0:a,moved:!1,multi:!1,peek:!1}),t.size>1)for(const l of t.values())l.multi=!0;return[]},move(s,r,o){const a=t.get(s);return a?(a.x=r,a.y=o,!a.moved&&ol(a.x0,a.y0,r,o)>i.slop&&(a.moved=!0),a.moved&&a.peek?(a.peek=!1,[{type:"peek-end",x:r,y:o,swallow:!1}]):[]):[]},tick(s){const r=[];for(const o of t.values())!o.moved&&!o.multi&&!o.peek&&s-o.t0>=i.longS&&(o.peek=!0,r.push({type:"peek",x:o.x,y:o.y}));return r},up(s,r,o,a){const l=t.get(s);if(!l)return[];t.delete(s),r!==void 0&&(l.x=r,l.y=o);const c=a-l.t0>=i.longS;if(l.peek&&c)return[{type:"peek-end",x:l.x,y:l.y,swallow:!0}];const u=l.peek?[{type:"peek-end",x:l.x,y:l.y,swallow:!1}]:[];return l.moved||l.multi?u:c?[{type:"peek",x:l.x,y:l.y},{type:"peek-end",x:l.x,y:l.y,swallow:!0}]:e&&a-e.t<=i.doubleS&&ol(e.x,e.y,l.x,l.y)<=i.doubleDist?(e=null,[...u,{type:"double",x:l.x,y:l.y,swallow:!0}]):(e={x:l.x,y:l.y,t:a},[...u,{type:"tap",x:l.x,y:l.y}])},cancel(s){const r=t.get(s);return r?(t.delete(s),r.peek?[{type:"peek-end",x:r.x,y:r.y,swallow:!1}]:[]):[]},get active(){return t.size},get peeking(){return n()}}}function fy(i=Ul){let t=null;return{down(e,n,s,r){return t={id:e,x0:n,y0:s,t0:r,held:!1,cancelled:!1},!0},move(e,n,s){return!t||t.id!==e||t.cancelled?[]:ol(t.x0,t.y0,n,s)<=i.pressSlop?[]:(t.cancelled=!0,t.held?[{type:"end"}]:[])},tick(e){return!t||t.held||t.cancelled||e-t.t0<i.longS?[]:(t.held=!0,[{type:"hold"}])},up(e,n){if(!t||t.id!==e)return[];const s=t;return t=null,s.cancelled?s.held?[{type:"end"}]:[]:(n===void 0?s.held:n-s.t0>=i.longS)?s.held?[{type:"end"}]:[]:s.held?[{type:"end"},{type:"fire"}]:[{type:"fire"}]},cancel(e){if(!t||t.id!==e)return[];const n=t;return t=null,n.held?[{type:"end"}]:[]},get pressing(){return t?t.id:null}}}const Ie=Math.PI/180,Se={overview:{pitch:72,dist:150,fov:42,minD:28,maxD:600,near:1,far:1400},chase:{pitch:58,dist:19,fov:50,minD:9,maxD:70,near:.5,far:600,lookHeight:1},pitchMin:35,pitchMax:88,yawRate:1.9,pitchRate:38,ease:9,followEase:7,fovMin:5,maxPhys:1500};class o_{constructor(t,e,n,{embedded:s=!1,mode:r="overview"}={}){this.camera=t,this.dom=e,this.bounds=n,this.embedded=s,this.mode=r,this.target=new Q,this.goal=new Q,this.yaw=this.yawGoal=0,this.pitch=this.pitchGoal=72*Ie,this.dist=this.distGoal=150,this.followHeading=!1,this.heading=0,this.keys=new Set,this.getKeys=()=>null,this.settings={...fn},this.plane=new hi(new Q(0,1,0),0),this.ray=new nu,this.drag=null,this.lastMid=0,this.onChange=null,this.analog={x:0,y:0,mag:0,run:!1},this.claimed=new Set,this.touches=new Map,this.pinch=null,this._off=[],this._bind(),this.setMode(r,{keepTarget:!1})}get P(){if(this.mode!=="chase")return Se[this.mode];const t=this.settings,e=this._chase;return(!e||e.dist!==t.camDist||e.pitch!==t.camPitch)&&(this._chase={...Se.chase,dist:t.camDist,pitch:t.camPitch}),this._chase}get fovDeg(){return this.mode==="chase"?this.settings.fov:Se[this.mode].fov}get dolly(){const t=this.mode==="chase"?fn.fov:Se[this.mode].fov,e=Xn.clamp(this.fovDeg,Se.fovMin,179);return Math.tan(t*Ie/2)/Math.tan(e*Ie/2)}get physDist(){return Math.min(this.dist*this.dolly,Se.maxPhys)}get yawDeg(){return this.yaw/Ie}get pitchDeg(){return this.pitch/Ie}setMode(t,{keepTarget:e=!0}={}){this.mode=t;const n=Se[t];this.pitch=this.pitchGoal=n.pitch*Ie,this.dist=this.distGoal=n.dist,this.camera.fov=t==="chase"?this.settings.fov:n.fov,this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),e||this.target.copy(this.goal),this.apply(),this._changed()}_changed(){var t;(t=this.onChange)==null||t.call(this,this)}bindKeys(t){this.getKeys=t}applySettings(t){const e=this.settings;this.settings={...this.settings,...t},this.mode==="chase"&&(this.settings.camDist!==e.camDist&&(this.distGoal=Xn.clamp(this.settings.camDist,this.P.minD,this.P.maxD)),this.settings.camPitch!==e.camPitch&&(this.pitchGoal=this.settings.camPitch*Ie)),this.apply()}rotate(t){this.yawGoal+=t,this._changed()}setYawDeg(t){this.yawGoal=t*Ie,this._changed()}setPitchDeg(t){this.pitchGoal=Xn.clamp(t,Se.pitchMin,Se.pitchMax)*Ie,this._changed()}tilt(t){this.setPitchDeg(this.pitchGoal/Ie+t)}zoomBy(t){this.distGoal=Xn.clamp(this.distGoal*t,this.P.minD,this.P.maxD),this._changed()}northUp(){this.yawGoal=Math.round(this.yawGoal/(2*Math.PI))*2*Math.PI,this._changed()}reset(){this.northUp(),this.pitchGoal=this.P.pitch*Ie,this.distGoal=this.P.dist,this.followHeading=!1,this._changed()}forward(t=new $t){return t.set(-Math.sin(this.yaw),-Math.cos(this.yaw))}right(t=new $t){return t.set(Math.cos(this.yaw),-Math.sin(this.yaw))}toWorldAxis(t,e,n={x:0,z:0}){const s=Math.sin(this.yaw),r=Math.cos(this.yaw);return n.x=t*r-e*s,n.z=-t*s-e*r,n}groundAt(t,e,n=new Q){this.ray=this.ray??new nu;const s=this.dom.getBoundingClientRect(),r=new $t((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1);return this.ray.setFromCamera(r,this.camera),this.ray.ray.intersectPlane(this.plane,n)?n:null}rayAt(t,e){const n=this.dom.getBoundingClientRect(),s=new $t((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);return this.ray.setFromCamera(s,this.camera),this.ray.ray}_on(t,e,n,s){t.addEventListener(e,n,s),this._off.push(()=>t.removeEventListener(e,n,s))}_bind(){const t=this.dom,e=this.embedded?t:window,n=s=>this.embedded?!0:s.target===document.body;this._on(e,"keydown",s=>{var o;if(!n(s)||s.ctrlKey||s.metaKey||s.altKey)return;this.keys.add(s.code);const r=Il(s.code,this.getKeys());r==="camReset"&&this.reset(),r==="camBehind"&&this.mode==="chase"&&(this.followHeading=!this.followHeading,this._changed()),this.embedded&&["move","camera"].includes((o=xo(r))==null?void 0:o.group)&&s.preventDefault()}),this._on(e,"keyup",s=>this.keys.delete(s.code)),this._on(window,"blur",()=>this.keys.clear()),this._on(t,"blur",()=>this.keys.clear()),this._on(t,"wheel",s=>{if(this.embedded&&!s.ctrlKey&&document.activeElement!==t)return;if(s.preventDefault(),s.shiftKey){this.tilt(-Math.sign(s.deltaY)*3);return}const r=Math.exp(s.deltaY*.0012);if(this.mode==="overview"){const o=this.groundAt(s.clientX,s.clientY);this.dist=this.distGoal=Xn.clamp(this.distGoal*r,this.P.minD,this.P.maxD),this.apply();const a=this.groundAt(s.clientX,s.clientY);o&&a&&(this.goal.add(o.sub(a)),this._clamp(this.goal),this.target.copy(this.goal),this.apply()),this._changed()}else this.zoomBy(r)},{passive:!1}),this._on(t,"pointerdown",s=>{if(s.button!==1)return;s.preventDefault(),t.setPointerCapture(s.pointerId);const r=performance.now();if(r-this.lastMid<350){this.reset(),this.lastMid=0;return}this.lastMid=r,this.drag={x:s.clientX,y:s.clientY,pan:s.shiftKey&&this.mode==="overview",last:this.groundAt(s.clientX,s.clientY)}}),this._on(t,"pointermove",s=>{const r=this.drag;if(!r)return;if(r.pan){const u=this.groundAt(s.clientX,s.clientY);if(!u||!r.last)return;this.goal.add(r.last.clone().sub(u)),this._clamp(this.goal),this.target.copy(this.goal),this.apply(),r.last=this.groundAt(s.clientX,s.clientY);return}const o=s.clientX-r.x,a=s.clientY-r.y;r.x=s.clientX,r.y=s.clientY;const{dyaw:l,dpitch:c}=rl(this.settings,o,a);this.yawGoal+=l,this.pitchGoal=Xn.clamp(this.pitchGoal+c,Se.pitchMin*Ie,Se.pitchMax*Ie),this._changed()}),this._on(t,"pointerup",()=>{this.drag=null}),this._on(t,"auxclick",s=>s.preventDefault()),this._on(t,"pointerdown",s=>this._touchDown(s)),this._on(t,"pointermove",s=>this._touchMove(s)),this._on(t,"pointerup",s=>this._touchUp(s)),this._on(t,"pointercancel",s=>this._touchUp(s))}claim(t){this.claimed.add(t),this.touches.delete(t),this.pinch&&(t===this.pinch.a||t===this.pinch.b)&&(this.pinch=null)}release(t){this.claimed.delete(t)}setAnalog(t=0,e=0,n=!1){const s=Math.hypot(t,e),r=s>1?1/s:1;this.analog={x:t*r,y:e*r,mag:Math.min(1,s),run:!!n&&s>0}}_touchDown(t){if(!(t.pointerType!=="touch"||this.claimed.has(t.pointerId))&&(this.touches.set(t.pointerId,{x:t.clientX,y:t.clientY}),!this.pinch&&this.touches.size>=2)){const[e,n]=[...this.touches.keys()],s=_u(this.touches.get(e),this.touches.get(n));this.pinch={a:e,b:n,start:s,prev:s,mode:null}}}_touchMove(t){if(t.pointerType!=="touch")return;const e=this.touches.get(t.pointerId);if(!e)return;e.x=t.clientX,e.y=t.clientY;const n=this.pinch;if(!n||t.pointerId!==n.a&&t.pointerId!==n.b)return;const s=_u(this.touches.get(n.a),this.touches.get(n.b));if(!n.mode){const o=n_(n.start,s);if(!o)return;n.mode=i_[o]}const r=s_(n.prev,s,n.mode,this.settings);n.prev=s,r.zoom!==1&&this.zoomBy(r.zoom),r.yaw&&this.rotate(r.yaw),r.pitch&&this.tilt(r.pitch/Ie)}_touchUp(t){t.pointerType==="touch"&&(this.touches.delete(t.pointerId),this.pinch&&(t.pointerId===this.pinch.a||t.pointerId===this.pinch.b)&&(this.pinch=null))}dispose(){for(const t of this._off)t();this._off=[],this.keys.clear()}_clamp(t){const e=this.bounds,n=14;t.x=Xn.clamp(t.x,e.x0-n,e.x1+n),t.z=Xn.clamp(t.z,e.z0-n,e.z1+n)}focus(t,e,n){this.goal.set(t,0,e),this._clamp(this.goal),this.target.copy(this.goal),n&&(this.dist=this.distGoal=n),this.apply()}follow(t,e,n){this.goal.set(t,0,e),this.heading=n}update(t){const e=this.keys,n=this.getKeys(),s=a=>us(e,a,n);let r=!1;if(s("camLeft")&&(this.yawGoal-=Se.yawRate*t,r=!0),s("camRight")&&(this.yawGoal+=Se.yawRate*t,r=!0),s("camTiltUp")&&(this.pitchGoal=Math.min(Se.pitchMax*Ie,this.pitchGoal+Se.pitchRate*Ie*t),r=!0),s("camTiltDown")&&(this.pitchGoal=Math.max(Se.pitchMin*Ie,this.pitchGoal-Se.pitchRate*Ie*t),r=!0),r&&this._changed(),this.mode==="overview"){const{sx:a,sy:l}=zh(e,n),c=this.analog,u=a+c.x,p=l+c.y;if(u||p){const d=Math.hypot(u,p),f=this.dist*.9*(s("run")||c.run?2:1)*Math.min(1,d),g=this.toWorldAxis(u/d,p/d);this.goal.x+=g.x*f*t,this.goal.z+=g.z*f*t,this._clamp(this.goal)}this.target.copy(this.goal)}else{if(this.followHeading){let a=this.heading+Math.PI;a+=Math.round((this.yawGoal-a)/(2*Math.PI))*2*Math.PI,this.yawGoal+=(a-this.yawGoal)*(1-Math.exp(-t*2.2))}this.target.lerp(this.goal,1-Math.exp(-t*Se.followEase))}const o=1-Math.exp(-t*Se.ease);this.yaw+=(this.yawGoal-this.yaw)*o,this.pitch+=(this.pitchGoal-this.pitch)*o,this.dist+=(this.distGoal-this.dist)*o,this.apply()}apply(){const t=this.physDist,e=Se[this.mode],n=Math.max(1,t/Math.max(this.dist,1e-6)),s=this.fovDeg,r=e.near*n,o=e.far+t;(this.camera.fov!==s||this.camera.near!==r||this.camera.far!==o)&&(this.camera.fov=s,this.camera.near=r,this.camera.far=o,this.camera.updateProjectionMatrix());const a=Math.cos(this.pitch),l=Math.sin(this.pitch),c=this.mode==="chase"?Se.chase.lookHeight:0;this.camera.position.set(this.target.x+Math.sin(this.yaw)*a*t,c+l*t,this.target.z+Math.cos(this.yaw)*a*t),this.camera.lookAt(this.target.x,c,this.target.z),this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert()}}function a_(i){i.fog=new bl(xe.background,1e5,100001);const t=new Xx(13626111,1714746,Math.PI*1),e=new Qc(10476799,1.5);e.position.set(-.5,.8,.35);const n=new Qc(16751200,.5);n.position.set(.6,.35,-.7),i.add(t,e,n);const s=520,r=new Float32Array(s*4);for(let u=0;u<s;u++)r[u*4]=Math.random(),r[u*4+1]=Math.random(),r[u*4+2]=Math.random(),r[u*4+3]=Math.random();const o=new pe;o.setAttribute("position",new Me(new Float32Array(s*3),3)),o.setAttribute("aSeed",new Me(r,4));const a=Ge(new Re({transparent:!0,blending:ze,depthTest:!0,depthWrite:!1,uniforms:{uTime:{value:0},uCenter:{value:new Q},uBox:{value:new Q(70,14,70)},uScale:{value:400},uFade:{value:1}},vertexShader:`
      attribute vec4 aSeed; uniform float uTime; uniform vec3 uCenter; uniform vec3 uBox; uniform float uScale;
      varying float vA; varying float vT;
      void main() {
        vec3 drift = vec3(0.25 * (aSeed.x - 0.5), 0.18 + 0.2 * aSeed.y, 0.25 * (aSeed.z - 0.5));
        vec3 p = aSeed.xyz * uBox + drift * uTime * 1.6;
        p = mod(p - uCenter + uBox * 0.5, uBox) - uBox * 0.5;
        p.x += sin(uTime * 0.4 + aSeed.w * 40.0) * 0.4;
        vec3 w = p + uCenter;
        w.y = mod(w.y + uBox.y * 0.5, uBox.y) + 0.2;
        vec4 mv = viewMatrix * vec4(w, 1.0);
        gl_Position = projectionMatrix * mv;
        float edge = 1.0 - smoothstep(0.35, 0.5, length(p.xz / uBox.xz));
        vA = edge * (0.35 + 0.65 * aSeed.w);
        vT = aSeed.w;
        gl_PointSize = clamp(uScale * (0.05 + 0.07 * aSeed.w) / max(-mv.z, 0.5), 1.0, 6.0);
      }`,fragmentShader:`
      uniform float uFade; varying float vA; varying float vT;
      void main() {
        vec2 q = gl_PointCoord - 0.5;
        float d = length(q);
        float a = smoothstep(0.5, 0.0, d) * vA * uFade;
        vec3 c = mix(vec3(0.35, 0.9, 1.0), vec3(1.0, 0.75, 0.5), step(0.85, vT));
        gl_FragColor = vec4(c * 0.75, a);
      }`})),l=new Gx(o,a);l.frustumCulled=!1,l.renderOrder=jt.MOTES,i.add(l);let c=1;return{motes:l,setDensity(u){c=u,a.uniforms.uFade.value=Math.min(1,u)},get density(){return c},update(u,p,d,f){const g=p.mode==="chase";if(l.visible=g&&c>.001,g){const x=p.physDist;i.fog.near=x*.95,i.fog.far=c>.001?x+34/c:1e5,c<=.001&&(i.fog.near=99999),a.uniforms.uTime.value=d,a.uniforms.uCenter.value.set(p.target.x,0,p.target.z),a.uniforms.uScale.value=f/(2*Math.tan(u.fov*Math.PI/360))}else i.fog.near=1e5,i.fog.far=100001}}}const Vr=700,yu=.7,l_=2.4,c_=1.1,u_=1.4,h_=`
  attribute vec3 aGlyph;                 // x: arm side (-1, +1)   y: along the arm (0 apex .. 1 tip)   z: across the arm (0 back edge .. 1 front edge)
  attribute vec4 iP;                     // this glyph's position (xz) and the next slot's (zw)
  attribute vec4 iT;                     // tangent here (xy) and at the next slot (zw)
  attribute float iA;                    // arc length from the start of the route
  uniform float uPhase, uPitch, uSize, uAngle, uThick, uY, uHead, uTotal, uBehind, uFadeIn, uFadeEnd;
  varying vec3 vG;
  varying float vAlpha;
  void main() {
    vec2 pos = mix(iP.xy, iP.zw, uPhase);
    vec2 t = mix(iT.xy, iT.zw, uPhase);
    t = t / max(length(t), 1e-4);
    vec2 n = vec2(-t.y, t.x);
    float h = uAngle * 0.5;
    vec2 arm = -t * cos(h) + n * aGlyph.x * sin(h);          // from the apex, back and out
    vec2 apex = pos + t * (uSize * cos(h) * 0.5);
    vec2 p = vec2(-arm.y, arm.x);
    if (dot(p, t) < 0.0) p = -p;                              // toward the leading side
    vec2 w = apex + arm * (uSize * aGlyph.y) + p * ((aGlyph.z - 0.5) * uThick);
    float a = iA + uPhase * uPitch;
    float ahead = a - uHead;
    float fadeHead = ahead >= 0.0 ? smoothstep(0.0, uFadeIn, ahead) : (uBehind > 0.0 ? exp(ahead / uBehind) : 0.0);
    vAlpha = fadeHead * smoothstep(0.0, uFadeEnd, uTotal - a) * smoothstep(0.0, uPitch, a + uPitch);
    vG = aGlyph;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(w.x, uY, w.y, 1.0);
  }
`,f_=`
  uniform vec3 uColor;
  uniform float uGlow;
  varying vec3 vG;
  varying float vAlpha;
  void main() {
    float across = smoothstep(0.0, 0.35, vG.z);
    float lead = mix(0.35, 1.0, vG.z);                        // the leading edge is the bright one
    float tail = 1.0 - 0.8 * vG.y;                            // the arms fade out toward their tips
    float tip = 1.0 - smoothstep(0.82, 1.0, vG.y);
    float k = vAlpha * across * lead * tail * tip * uGlow;
    if (k < 0.004) discard;
    gl_FragColor = vec4(uColor * k, 1.0);                     // additive: colour carries the fade
  }
`;function d_(){const i=new Mh,t=[],e=[];for(const n of[-1,1]){const s=t.length/3;t.push(n,0,0,n,0,1,n,1,0,n,1,1),e.push(s,s+1,s+2,s+2,s+1,s+3)}return i.setAttribute("position",new Me(new Float32Array(t.length),3)),i.setAttribute("aGlyph",new Me(new Float32Array(t),3)),i.setIndex(e),i}const Wr=Object.freeze({density:1.5,size:.8,glow:.95,angle:124});function Nh({parent:i,color:t=xe.ally,behind:e=0}={}){const n={density:Wr.density,size:Wr.size,glow:Wr.glow,angle:Wr.angle},s=d_();s.instanceCount=0;const r=Ge(new Re({uniforms:{uPhase:{value:0},uPitch:{value:1},uSize:{value:.7},uAngle:{value:2.1},uThick:{value:.14},uY:{value:.12},uHead:{value:0},uTotal:{value:0},uBehind:{value:e},uFadeIn:{value:c_},uFadeEnd:{value:u_},uColor:{value:new Ht(t)},uGlow:{value:n.glow}},vertexShader:h_,fragmentShader:f_,blending:ze,side:ye,toneMapped:!1})),o=new Kt(s,r);o.frustumCulled=!1,o.renderOrder=jt.MARKERS,o.visible=!1,i==null||i.add(o);const a=new Js(new Float32Array(Vr*4),4),l=new Js(new Float32Array(Vr*4),4),c=new Js(new Float32Array(Vr),1);for(const A of[a,l,c])A.setUsage(Za);s.setAttribute("iP",a),s.setAttribute("iT",l),s.setAttribute("iA",c);let u=null,p=null,d=0,f=.12,g=!1;const x={builds:0,glyphs:0,lastMs:0},m=A=>{A=Math.max(0,Math.min(d,A));let y=0,E=p.length-1;for(;E-y>1;){const _=y+E>>1;p[_]<=A?y=_:E=_}const w=p[E]-p[y],M=w>1e-9?(A-p[y])/w:0;return{x:u[y].x+(u[E].x-u[y].x)*M,z:u[y].z+(u[E].z-u[y].z)*M}},h=A=>{const y=m(A-yu),E=m(A+yu),w=E.x-y.x,M=E.z-y.z,_=Math.hypot(w,M);return _>1e-6?[w/_,M/_]:[1,0]};function b(){if(g=!1,!u||u.length<2){s.instanceCount=0,o.visible=!1;return}const A=performance.now();p=[0];for(let w=1;w<u.length;w++)p.push(p[w-1]+Math.hypot(u[w].x-u[w-1].x,u[w].z-u[w-1].z));d=p[p.length-1];const y=1/n.density,E=Math.min(Vr,Math.floor(d/y));for(let w=0;w<E;w++){const M=E-1-w,_=d-(M+.5)*y,T=_+y,D=m(_),k=m(T),V=h(_),X=h(T);a.setXYZW(w,D.x,D.z,k.x,k.z),l.setXYZW(w,V[0],V[1],X[0],X[1]),c.setX(w,_)}a.needsUpdate=l.needsUpdate=c.needsUpdate=!0,r.uniforms.uPitch.value=y,r.uniforms.uTotal.value=d,r.uniforms.uY.value=f,s.instanceCount=E,o.visible=E>0,x.builds++,x.glyphs=E,x.lastMs=performance.now()-A}const S=(A,y)=>A&&y&&A.length===y.length&&A.every((E,w)=>Math.abs(E.x-y[w].x)<1e-6&&Math.abs(E.z-y[w].z)<1e-6),v={mesh:o,stats:x,look:n,follow(A,y=.12){if(!A||A.length<2){v.clear();return}const E=A.slice(1),w=u&&u.length>1?u[1]:null;let M=!u||!S(E,u.slice(1))||y!==f||g;if(!M&&w){const _=u[0],T=u[1],D=T.x-_.x,k=T.z-_.z,V=Math.hypot(D,k)||1;Math.abs((A[0].x-_.x)*k-(A[0].z-_.z)*D)/V>1.2&&(M=!0)}if(M&&(u=A.map(_=>({x:_.x,z:_.z})),f=y,b()),u){const _=u[0],T=u[1],D=T.x-_.x,k=T.z-_.z,V=Math.hypot(D,k)||1,X=Math.max(0,Math.min(V,((A[0].x-_.x)*D+(A[0].z-_.z)*k)/V));r.uniforms.uHead.value=X}},set(A,y=.09){S(A,u)&&y===f&&!g||(u=A&&A.length>1?A.map(E=>({x:E.x,z:E.z})):null,f=y,b())},setHead(A){r.uniforms.uHead.value=A},arcOf(A){return(p==null?void 0:p[A])??0},get total(){return d},setColor(A){Array.isArray(A)?r.uniforms.uColor.value.setRGB(A[0],A[1],A[2]):r.uniforms.uColor.value.set(A)},clear(){u=null,s.instanceCount=0,o.visible=!1},configure(A={}){const y=Number.isFinite(A.pathDensity)?A.pathDensity:n.density;Math.abs(y-n.density)>1e-9&&(n.density=y,g=!0,u&&b()),Number.isFinite(A.pathSize)&&(n.size=A.pathSize),Number.isFinite(A.pathGlow)&&(n.glow=A.pathGlow),Number.isFinite(A.pathAngle)&&(n.angle=A.pathAngle),r.uniforms.uSize.value=n.size,r.uniforms.uThick.value=Math.max(.08,n.size*.26),r.uniforms.uGlow.value=n.glow,r.uniforms.uAngle.value=n.angle*Math.PI/180},update(A){r.uniforms.uPhase.value=A*l_/(1/n.density)%1},dispose(){i==null||i.remove(o),s.dispose(),r.dispose()}};return v.configure({}),v}function p_({scene:i,addLineMaterial:t}){const e=new we;i.add(e);const n=(g,x=.9)=>Rh(Ge(new be({color:new Ht(g).multiplyScalar(1.5),transparent:!0,opacity:x,side:ye,blending:ze,toneMapped:!1}))),s=n(xe.hover,.85),r=new we,o=new Kt(new on(.55,.68,40),s);o.rotation.x=-Math.PI/2,o.renderOrder=jt.CURSOR,r.add(o);for(let g=0;g<4;g++){const x=new Kt(new Bi(.1,.38),s);x.rotation.x=-Math.PI/2;const m=g*Math.PI/2;x.position.set(Math.cos(m)*.95,0,Math.sin(m)*.95),x.rotation.z=m+Math.PI/2,x.renderOrder=jt.CURSOR,r.add(x)}r.visible=!1,e.add(r);const a=n(xe.select,.95),l=new we,c=new Kt(new on(.7,.85,40),a);c.rotation.x=-Math.PI/2,c.renderOrder=jt.MARKERS;const u=new Kt(new on(.7,.8,40),a.clone());u.rotation.x=-Math.PI/2,u.renderOrder=jt.MARKERS;const p=new Kt(new Cs(.035,.035,2.2,6,1,!0),Ge(new be({color:new Ht(xe.select).multiplyScalar(1.4),transparent:!0,opacity:.7,blending:ze,toneMapped:!1})));p.position.y=1.1,p.renderOrder=jt.MARKERS;const d=new Kt(new mi(.22),new be({color:new Ht(xe.select).multiplyScalar(1.6),toneMapped:!1}));d.position.y=2.3,d.renderOrder=jt.MARKERS,l.add(c,u,p,d),l.visible=!1,e.add(l);const f=Nh({parent:e,color:xe.ally});return{group:e,showCursor(g,x,m,h){r.visible=!0,r.position.set(g,x+.1,m),s.color.set(h?xe.blocked:xe.hover).multiplyScalar(1.5)},hideCursor(){r.visible=!1},setTarget(g,x,m,h){l.visible=!0,l.position.set(g,x+.1,m),h&&a.color.set(h).multiplyScalar(1.5)},clearTarget(){l.visible=!1},get targetPos(){return l.visible?l.position:null},setPath(g,x=.12,m=xe.ally){if(!g||g.length<2){f.clear();return}f.setColor(m),f.follow(g,x)},chevrons:f,update(g){r.rotation.y=g*.8;const x=g*1.6%1;c.scale.setScalar(1+.9*(1-x)),c.material.opacity=.95*x,u.scale.setScalar(1+.2*Math.sin(g*4)),d.rotation.y=g*2,d.position.y=2.3+.12*Math.sin(g*3),f.update(g)}}}function Fh(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new pe;let c=0;for(let u=0;u<i.length;++u){const p=i[u];let d=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in p.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(p.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in p.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(p.morphAttributes[f])}if(t){let f;if(e)f=p.index.count;else if(p.attributes.position!==void 0)f=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(e){let u=0;const p=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)p.push(f.getX(g)+u);u+=i[d].attributes.position.count}l.setIndex(p)}for(const u in r){const p=Mu(r[u]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,p)}for(const u in o){const p=o[u][0].length;if(p===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<p;++d){const f=[];for(let x=0;x<o[u].length;++x)f.push(o[u][x][d]);const g=Mu(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function Mu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const u=i[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Me(o,e,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const p=l/e;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<e;g++){const x=u.getComponent(d,g);a.setComponent(d+p,g,x)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Hs=new Ht(xe.ally),Vs=new Ht(xe.companion);let Xr=null;function m_(){if(Xr)return Xr;const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.55,"rgba(0,0,0,0.35)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Xr=new _h(i),Xr}const Ri=30;function g_(i,t){const e=new Float32Array(Ri*2*3),n=new Float32Array(Ri*2*4),s=[];for(let c=0;c<Ri-1;c++){const u=c*2;s.push(u,u+1,u+2,u+1,u+3,u+2)}const r=new pe;r.setAttribute("position",new Me(e,3)),r.setAttribute("color",new Me(n,4)),r.setIndex(s);const o=new Kt(r,Ge(new be({vertexColors:!0,transparent:!0,blending:ze,side:ye,toneMapped:!1})));o.frustumCulled=!1,o.renderOrder=jt.TRAIL;const a=[];let l=0;return{mesh:o,reset(c,u,p){a.length=0;for(let d=0;d<Ri;d++)a.push([c,u,p])},update(c,u,p,d,f){for(l+=c,a.length||this.reset(u,p,d);l>=.028;)l-=.028,a.unshift([u,p,d]),a.length=Ri;a[0]=[u,p,d];for(let g=0;g<Ri;g++){const x=a[g],m=1-g/(Ri-1),h=t*m;e.set([x[0],x[1],x[2],x[0],x[1]+h,x[2]],g*6);const b=Math.pow(m,1.4)*f;n.set([i.r*1.6,i.g*1.6,i.b*1.6,b,i.r*1.6,i.g*1.6,i.b*1.6,0],g*8)}r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}}}function Su(i,t,e=!1){const n=new we,s=c=>Ge(new be({color:i.clone().multiplyScalar(1.5),transparent:!0,opacity:c,side:ye,blending:ze,toneMapped:!1})),r=new Kt(new on(t*.88,t,48),s(.85)),o=new Kt(new on(.01,t*.88,48),s(.07)),a=Fh([0,1,2,3].map(c=>new on(t*1.28,t*1.4,10,1,c*Math.PI/2+.2,Math.PI/2-.5))),l=new Kt(a,s(.95));for(const c of[r,o,l])c.rotation.x=-Math.PI/2,c.renderOrder=jt.GLOW+1,n.add(c);return{group:n,ctrl:l,base:r,inner:o}}function x_({scene:i,map:t,addLineMaterial:e}){const n=new we;i.add(n);const s={},r=(m,h,b)=>{const S=wh(new mo({color:h.clone().multiplyScalar(1.7),linewidth:b,worldUnits:!1,fog:!0}));e(S);const v=new Cl(new po().fromEdgesGeometry(new Hx(m,25)),S);return v.renderOrder=jt.CREST,v},o=m=>new tl({color:m,flatShading:!0}),a=(m,h)=>new be({color:m.clone().multiplyScalar(h),toneMapped:!1});function l(){const m=new we,h=[new Cs(.2,.31,1.05,6).translate(0,.62,0),new bn(.82,.2,.36).translate(0,1.28,0),new bn(.22,.5,.2).translate(.2,0+.25,0),new bn(.22,.5,.2).translate(-.2,.25,0)].map(M=>M.index?M.toNonIndexed():M),b=Fh(h.map(M=>(M.deleteAttribute("uv"),M))),S=new Kt(b,o(398880));S.renderOrder=jt.SOLIDS;const v=r(b,Hs,1.8),A=new Kt(new mi(.22).scale(1,1.25,1),a(Hs,2));A.position.y=1.7,A.renderOrder=jt.SOLIDS;const y=new Kt(new El(.11,.38,4),a(Hs,2.4));y.rotation.x=Math.PI/2,y.position.set(0,1.7,.3),y.renderOrder=jt.SOLIDS;const E=new Kt(new bn(.16,.2,.05),a(Hs,2.2));E.position.set(0,1,.31),E.renderOrder=jt.SOLIDS;const w=new we;return w.add(S,v,A,y,E),m.add(w),{group:m,lean:w}}function c(){const m=new we,h=new Al(.46,.065,5,6),b=new Kt(h,a(Vs,1.7));b.rotation.x=Math.PI/2,b.renderOrder=jt.SOLIDS;const S=new Kt(new mi(.26),o(727558));S.renderOrder=jt.SOLIDS;const v=r(S.geometry,Vs,1.6),A=new Kt(new mi(.13),a(Vs,2.6));A.renderOrder=jt.SOLIDS;const y=[0,1].map(E=>{const w=new Kt(new Tl(.09),a(Vs,2.2));return w.renderOrder=jt.SOLIDS,m.add(w),w});return m.add(b,S,v,A),{group:m,ring:b,shell:S,sats:y}}function u(m,h,b,S,v,A,y){const E=h(),w=new we;w.add(E.group);const M=new Kt(new wl(S*1.9,24),new be({map:m_(),transparent:!0,depthWrite:!1,toneMapped:!1}));M.rotation.x=-Math.PI/2,M.renderOrder=jt.GLOW-1;const _=Su(b,S),T=g_(b,v),D=new $x(b.clone().lerp(new Ht(16777215),.25),A,y,2);n.add(w,M,_.group,T.mesh,D),s[m]={id:m,model:E,group:w,shadow:M,rings:_,trail:T,light:D,y:.05,init:!1}}u("avatar",l,Hs,.55,.95,9,16),u("companion",c,Vs,.4,.5,4.5,11);const p=new Map,d=new mi(.34).scale(1,1.5,1);function f(m){let h=p.get(m);if(h)return h;const b=new Ht(xe.hostile),S=new we,v=new Kt(d,a(b,1.9));v.position.y=.9,v.renderOrder=jt.SOLIDS;const A=Su(b,.4);return S.add(v,A.group),S.visible=!1,n.add(S),p.set(m,h={id:m,group:S,vis:0,y:.05,init:!1}),h}const g=["avatar","companion"],x=[];return{group:n,contacts:p,sync(m,h,b,S=null){x.length=0;const v=new Set;for(const A of m.others??[]){const y=f(A.id);v.add(A.id);const E=A.render??A,w=!S||S(E.x,E.z,"dynamic");y.vis=w?Math.min(1,y.vis+b*6):Math.max(0,y.vis-b*6),y.group.visible=y.vis>.02;const M=A.cell!=null?t.cells[A.cell]:null,_=De(M);y.y=y.init?y.y+(_-y.y)*Math.min(1,b*14):_,y.init=!0,y.group.position.set(E.x,y.y,E.z),y.group.rotation.y=E.heading??0,y.group.scale.setScalar(.3+.7*y.vis)}for(const[A,y]of p)v.has(A)||(y.group.visible=!1,y.vis=0);for(const A of g){const y=m[A],E=s[A];if(!y||!E)continue;const w=y.render??y,M=w.x,_=w.z,T=w.heading,D=y.cell!=null?t.cells[y.cell]:null,k=De(D);E.y=E.init?E.y+(k-E.y)*Math.min(1,b*14):k;const V=A==="companion"?1.35+.08*Math.sin(h*2.2):0,X=E.y;E.group.position.set(M,X+V,_),E.group.rotation.y=T,E.shadow.position.set(M,X+.035,_),E.rings.group.position.set(M,X+.09,_),E.rings.ctrl.visible=!!y.controlled,E.rings.ctrl.rotation.z=h*1.4,E.rings.base.material.opacity=y.controlled?.95:.55,E.light.position.set(M,X+(A==="avatar"?3.1:2.4),_),A==="avatar"?(E.model.lean.rotation.x=Math.min(.28,(w.speed??0)*.03),E.model.lean.position.y=Math.abs(Math.sin(h*11))*Math.min(.06,(w.speed??0)*.008)):(E.model.ring.rotation.z=h*1.2,E.model.shell.rotation.y=h*1.8,E.model.sats.forEach((G,H)=>{const B=h*2.6+H*Math.PI;G.position.set(Math.cos(B)*.62,.05*Math.sin(h*5+H),Math.sin(B)*.62),G.rotation.set(h*3,h*2,0)})),E.init||(E.trail.reset(M,X+.1,_),E.init=!0),E.trail.update(b,M,X+.1+(A==="companion"?.7:0),_,w.moving??y.moving?.85:.5),x.push({id:A,x:M,y:X+1,z:_,r:A==="avatar"?3:2})}},centres(){return x},dispose(){i.remove(n),d.dispose()}}}function v_(i,t,{size:e=64,corner:n="bottom-right",offset:s=16}={}){const r=document.createElement("div");r.setAttribute("role","img"),r.setAttribute("aria-label","Compass: click to put north up"),r.title="Compass (click: north up, Home: reset view)";const o={"bottom-right":`right:${s}px;bottom:${s}px`,"top-left":`left:${s}px;top:${s}px`,"bottom-left":`left:${s}px;bottom:${s}px`}[n];r.style.cssText=`position:absolute;${o};width:${e}px;height:${e}px;border-radius:50%;cursor:pointer;
    border:1px solid rgba(25,230,255,0.4);background:rgba(3,8,16,0.6);box-shadow:0 0 14px rgba(25,230,255,0.15);z-index:5;
    user-select:none;touch-action:none;`,r.innerHTML=`
    <svg viewBox="-50 -50 100 100" width="${e}" height="${e}" style="display:block;overflow:visible">
      <circle r="44" fill="none" stroke="rgba(95,141,163,0.45)" stroke-width="1.5"/>
      <g class="dial">
        <path d="M0,-40 L7,-6 L0,-12 L-7,-6 Z" fill="#ff7a1a" stroke="#ffb06a" stroke-width="1"/>
        <path d="M0,40 L5,8 L0,13 L-5,8 Z" fill="rgba(95,141,163,0.55)"/>
        <text y="-44" x="0" text-anchor="middle" dominant-baseline="auto" font-size="17" font-weight="700" fill="#ffb06a" font-family="Segoe UI,system-ui,sans-serif" transform="translate(0,-4)">N</text>
        <line x1="-40" x2="-30" y1="0" y2="0" stroke="rgba(95,141,163,0.7)" stroke-width="2"/>
        <line x1="30" x2="40" y1="0" y2="0" stroke="rgba(95,141,163,0.7)" stroke-width="2"/>
      </g>
      <circle r="3" fill="#bfefff"/>
    </svg>`;const a=r.querySelector(".dial");r.addEventListener("click",c=>{c.stopPropagation(),t.northUp()}),r.addEventListener("pointerdown",c=>c.stopPropagation()),i.appendChild(r);let l=NaN;return{el:r,update(){const c=t.yawDeg;Math.abs(c-l)<.05||(l=c,a.setAttribute("transform",`rotate(${c.toFixed(2)})`))},dispose(){r.remove()}}}const __=go;function y_({canvas:i,map:t,embedded:e=!1,focus:n,glow:s=__,mode:r="overview",compass:o=!0,makeBoard:a,fog:l=!1,onHover:c,onSelect:u}){var Ot;const p=new Ux({canvas:i,antialias:!0});p.setPixelRatio(Math.min(devicePixelRatio,2)),p.setClearColor(xe.background);const d=new Nx,f=new rn(42,1,1,1200),g=new o_(f,i,t.bounds,{embedded:e,mode:r}),x=n??{x:t.startCell.cx,z:t.startCell.cz,dist:void 0};g.focus(x.x,x.z,r==="overview"?x.dist??150:void 0);const m=xv(),h=a?a({map:t,cut:m}):Nv(t,{cut:m});(Ot=h.setGlowLevel)==null||Ot.call(h,s),d.add(h.group);const b=a_(d),S={w:1,h:1},v=st=>{h.lineMats.push(st),st.resolution.set(S.w,S.h)},A=p_({scene:d,addLineMaterial:v});let y=null;const E=new dn(1,1,{type:zn,samples:4});l&&(E.depthTexture=new Sl(1,1));const w=new ev(p,E);w.addPass(new nv(d,f));const M=l?new cv(f):null;M&&w.addPass(M);const _=new Ss(new $t(1,1),s,.32,.85);w.addPass(_),w.addPass(new rv);const T=o?v_(e?i.parentElement:document.body,g,e?{corner:"bottom-right",size:58,offset:12}:{corner:"bottom-right",size:72,offset:18}):null;T&&!e&&(T.el.style.position="fixed");function D(){const st=e?i.parentElement:null,I=st?st.clientWidth:innerWidth,R=st?st.clientHeight:innerHeight;!I||!R||(S.w=I,S.h=R,p.setSize(I,R,!1),w.setSize(I,R),f.aspect=I/R,f.updateProjectionMatrix(),h.resize(I,R))}const k=e?new ResizeObserver(D):null;k==null||k.observe(i.parentElement),e||addEventListener("resize",D),D();const V={hover:[],select:[],frame:[]},X=(st,...I)=>{for(const R of V[st])R(...I)},G=(st,I)=>(V[st].push(I),()=>{V[st]=V[st].filter(R=>R!==I)});c&&G("hover",c),u&&G("select",u);const H=new Q;function B(st,I){const R=g.rayAt(st,I),C=R.origin,U=R.direction;if(U.y>-1e-4)return null;const Y=Math.max(0,(mv-C.y)/U.y),W=(0-C.y)/U.y,Tt=44;for(let _t=0;_t<=Tt;_t++){const Dt=Y+(W-Y)*_t/Tt;H.copy(U).multiplyScalar(Dt).add(C);const Mt=t.cellAt(H.x,H.z);if(Mt&&Mt.solid&&H.y<=pv(Mt))return{point:H.clone(),cell:Mt,solid:!0}}H.copy(U).multiplyScalar(W).add(C);const ft=t.cellAt(H.x,H.z);return{point:H.clone(),cell:ft,solid:!!(ft!=null&&ft.solid)}}let tt=null;const ut=st=>!tt||!st||tt(st.point.x,st.point.z),rt={x:0,y:0,inside:!1};let At=null,Ct=!1,lt=null;function wt(){if(!rt.inside){lt=null,At&&(At=null,h.hover.set(null),X("hover",null,null)),A.hideCursor();return}const st=B(rt.x,rt.y);st&&(st.known=ut(st)),lt=st;const I=st&&st.known?st.cell??null:null,R=!I||I.solid;(I!==At||R!==Ct)&&(At=I,Ct=R,h.hover.set(I,{blocked:R}),X("hover",I,st)),st&&I&&st.known&&!I.solid?A.showCursor(st.point.x,De(I),st.point.z,!1):A.hideCursor()}const zt=st=>{rt.x=st.clientX,rt.y=st.clientY,rt.inside=!0},xt=()=>{rt.inside=!1},Ut=st=>{const I=B(st.clientX,st.clientY);I&&(I.known=ut(I));const R=I&&I.known?I.cell??null:null;X("select",R,I)},L=st=>st.preventDefault();i.addEventListener("pointermove",zt),i.addEventListener("pointerleave",xt),i.addEventListener("click",Ut),e||i.addEventListener("contextmenu",L);const q=G("select",st=>{yt.handlesSelect||h.select.set(st)}),it=new Sh;let nt=0,Z=!1;const N=[];let Et=!0;const dt={n:0,sum:0,max:0,last:0};function St(){if(!Z)return;const st=performance.now(),I=Math.min(it.getDelta(),.1),R=it.elapsedTime;if(X("frame",I,R),g.update(I),wt(),h.update(R),A.update(R),h.setFocus(g.target.x,g.target.z),b.update(f,g,R,p.domElement.height),N.length=0,y)for(const Y of y.centres())N.push(Y);const C=A.targetPos;C&&N.push({x:C.x,y:C.y+.6,z:C.z,r:1.9}),lt!=null&&lt.cell&&lt.known&&!lt.solid&&N.push({x:lt.point.x,y:De(lt.cell)+.6,z:lt.point.z,r:1.7}),m.update(f,g.mode==="chase"&&Et?N:[]),T==null||T.update(),w.render();const U=performance.now()-st;dt.last=U,dt.sum+=U,dt.n++,dt.max=Math.max(dt.max,U),nt=requestAnimationFrame(St)}const yt={renderer:p,camera:f,rig:g,board:h,composer:w,map:t,bloom:_,markers:A,scene:d,cut:m,pointer:rt,fogPass:M,handlesSelect:!1,on:G,pick:B,repick:wt,addLineMaterial:v,compass:T,get actorsView(){return y},get lastPick(){return lt},setKnowledge(st){tt=st},ensureActorsView(){return y??(y=x_({scene:d,map:t,addLineMaterial:v}))},setMode(st,I){I&&g.goal.set(I.x,0,I.z),g.setMode(st),st==="overview"&&I&&g.focus(I.x,I.z,150)},setGlow(st,I,R){var C;_.strength=st,_.enabled=st>.001,(C=h.setGlowLevel)==null||C.call(h,st),I!==void 0&&(_.radius=I),R!==void 0&&(_.threshold=R)},applySettings(st){g.applySettings(st),this.setGlow(st.glow,st.bloomRadius,st.bloomThreshold),b.setDensity(st.atmosphere??1),M==null||M.setShroud(st.shroud??1),A.chevrons.configure(st),Et=st.cutaway},start(){Z||(Z=!0,it.getDelta(),St())},stop(){Z=!1,cancelAnimationFrame(nt)},takeFrameStats(){const st={...dt,mean:dt.sum/Math.max(1,dt.n)};return dt.n=dt.sum=dt.max=0,st},measureScene(){p.info.reset(),p.setRenderTarget(null),p.render(d,f);const st=p.info.render;return{calls:st.calls,triangles:st.triangles,lines:st.lines,points:st.points,geometries:p.info.memory.geometries,textures:p.info.memory.textures}},dispose(){Z=!1,cancelAnimationFrame(nt),k==null||k.disconnect(),e||removeEventListener("resize",D),i.removeEventListener("pointermove",zt),i.removeEventListener("pointerleave",xt),i.removeEventListener("click",Ut),i.removeEventListener("contextmenu",L),q(),g.dispose(),T==null||T.dispose(),w.dispose(),p.dispose(),p.forceContextLoss()}};return yt}function M_({stage:i,actors:t,canvas:e,embedded:n=!1,onStatus:s,shows:r=null,keys:o=()=>null}){const a=i.rig,l=i.ensureActorsView();i.handlesSelect=!0;let c=null,u=null,p=0,d="avatar",f=!1;const g=!n,x=r_();let m=null,h=null,b=0;const S=()=>t.snapshot()[d],v=()=>s==null?void 0:s({controlled:d,companionMode:t.snapshot().companion.mode,camera:a.mode,followHeading:a.followHeading}),A=i.on("select",(rt,At)=>{if(b>0){b=0;return}!At||!At.point||(c={x:At.point.x,z:At.point.z,cell:rt??null,known:At.known!==!1})}),y=()=>{if(a.reset(),a.mode==="overview"){const rt=S();a.focus(rt.x,rt.z)}},E=rt=>{for(const At of rt)At.type==="tap"?m={x:At.x,y:At.y}:At.type==="double"?(m={x:At.x,y:At.y},b=.6,y()):At.type==="peek"?h={x:At.x,y:At.y}:At.type==="peek-end"&&(h=null,At.swallow&&(b=.6))},w=rt=>(Number.isFinite(rt.timeStamp)?rt.timeStamp:performance.now())/1e3,M=rt=>{rt.pointerType==="touch"&&E(x.down(rt.pointerId,rt.clientX,rt.clientY,w(rt)))},_=rt=>{rt.pointerType==="touch"&&E(x.move(rt.pointerId,rt.clientX,rt.clientY))},T=rt=>{rt.pointerType==="touch"&&E(x.up(rt.pointerId,rt.clientX,rt.clientY,w(rt)))},D=rt=>{rt.pointerType==="touch"&&E(x.cancel(rt.pointerId))};g&&(e.addEventListener("pointerdown",M),e.addEventListener("pointermove",_),e.addEventListener("pointerup",T),e.addEventListener("pointercancel",D));const k=n?e:window,V=rt=>n?!0:rt.target===document.body,X=Xv(o),G=rt=>{!V(rt)||rt.ctrlKey||rt.metaKey||rt.altKey||rt.repeat||X.handle(rt)&&rt.code==="Tab"&&rt.preventDefault()};k.addEventListener("keydown",G),X.bind("possess",()=>{d=d==="avatar"?"companion":"avatar",t.possess(d),B(),v()}),X.bind("companionHold",()=>{const rt=t.snapshot().companion.mode;t.commandCompanion({type:rt==="follow"?"hold":"follow"}),v()}),X.bind("stop",()=>{B(),c=null}),X.bind("overview",()=>H()),X.bind("camBehind",()=>queueMicrotask(v));function H(){const rt=S();i.setMode(a.mode==="chase"?"overview":"chase",{x:rt.x,z:rt.z}),v()}function B(){u=null,i.markers.clearTarget(),i.board.select.set(null)}const tt={axis:{x:0,z:0},moveTo:null,stop:!1,aim:null,run:!1},ut=i.on("frame",(rt,At)=>{b>0&&(b=Math.max(0,b-rt)),E(x.tick(performance.now()/1e3));const Ct=h??m;g&&Ct&&i.pointer&&(i.pointer.x=Ct.x,i.pointer.y=Ct.y,i.pointer.inside=!0);const lt=a.keys,wt=a.analog??null;tt.axis.x=tt.axis.z=0;let zt=!1;if(a.mode==="chase"){const{sx:nt,sy:Z}=zh(lt,o());if(nt||Z){const N=Math.hypot(nt,Z);a.toWorldAxis(nt/N,Z/N,tt.axis),B()}else wt&&wt.mag>0&&(a.toWorldAxis(wt.x,wt.y,tt.axis),B(),zt=!0)}tt.run=us(lt,"run",o())||zt&&wt.run;const xt=i.lastPick;if(tt.aim=!zt&&xt&&xt.known!==!1&&!xt.solid?{x:xt.point.x,z:xt.point.z}:null,tt.moveTo=null,c){const nt=c;c=null;const N=nt.known&&(!nt.cell||nt.cell.solid)?{ok:!1}:t.commandAvatarTo(nt.x,nt.z);(N==null?void 0:N.ok)===!1&&!nt.known?u=null:(N==null?void 0:N.ok)===!1?(p=.5,i.board.select.set(nt.cell,{blocked:!0}),i.markers.clearTarget(),u=null):(u={x:nt.x,z:nt.z,cell:nt.cell},i.board.select.set(nt.known?nt.cell:null),i.markers.setTarget(nt.x,De(nt.known?nt.cell:null),nt.z))}p>0&&(p-=rt,p<=0&&!u&&i.board.select.set(null)),f||t.update(rt,tt);const Ut=t.snapshot();d=Ut.controlled??d,l.sync(Ut,At,rt,r);const L=Ut[d],q=L.render??L;a.mode==="chase"&&a.follow(q.x,q.z,q.heading);const it=t.path(d);it.length?i.markers.setPath([{x:L.x,z:L.z},...it],De(i.map.cells[L.cell])+.12):(i.markers.setPath([]),u&&p<=0&&B())});return v(),{actors:t,toggleView:H,status:v,bind:X.bind,press(rt){const At=bs(rt,o())[0];return At?X.handle({code:At}):!1},setMoveVector(rt,At,Ct=!1){var lt;(lt=a.setAnalog)==null||lt.call(a,rt,At,Ct)},setPaused(rt){f=!!rt},get paused(){return f},get peeking(){return!!h},get controlled(){return d},dispose(){A(),ut(),k.removeEventListener("keydown",G),g&&(e.removeEventListener("pointerdown",M),e.removeEventListener("pointermove",_),e.removeEventListener("pointerup",T),e.removeEventListener("pointercancel",D))}}}const un=(i,t)=>`${i},${t}`,qr={nav:1,render:2};function S_(i){const t=i.opts??{};return!!t.level&&!t.coarse&&!t.kindOf&&!t.cache&&!t.onLoad&&!t.onUnload}function b_({world:i,pool:t=null,config:e={},now:n=()=>performance.now()}){var h,b;const s={poolSize:nn.poolSize.value,batch:nn.batch.value,inflight:nn.inflight.value,adoptMs:nn.adoptMs.value,adoptMax:nn.adoptMax.value,...e},r={seed:i.seed,terrain:(h=i.opts)==null?void 0:h.terrain,field:(b=i.opts)==null?void 0:b.field},o=new Map,a=new Set,l=new Set,c=[];let u=0,p=0,d=!1;const f={jobs:0,sectors:0,adopted:0,adoptMs:0,maxAdoptMs:0,errors:0,queued:0,inflight:0,ready:0},g=S=>S.tier==="render"?i.has("render",S.u,S.v)&&i.has("detail",S.u,S.v):i.has("nav",S.u,S.v),x=()=>!!t&&!d&&s.poolSize>0;function m(){if(x())for(;u<s.inflight;){const S=[];for(const E of o.values())a.has(un(E.u,E.v))||l.has(un(E.u,E.v))||S.push(E);if(!S.length)break;S.sort((E,w)=>E.d-w.d);const v=S.slice(0,s.batch),A=v.map(E=>[E.u,E.v,E.tier]);for(const E of v)a.add(un(E.u,E.v));u++,f.jobs++;const y=p;t.call("sectorTiers",{...r,items:A}).then(E=>{if(y===p){u--;for(const w of E.list)a.delete(un(w.u,w.v)),l.add(un(w.u,w.v)),c.push(w);f.sectors+=E.list.length,m()}},()=>{if(y===p){u--,f.errors++,d=!0;for(const E of v)a.delete(un(E.u,E.v));o.clear(),a.clear(),l.clear()}})}}return{stats:f,cfg:s,get active(){return x()},want(S){const v=new Map;for(const A of S){const y=un(A.u,A.v),E=v.get(y);E?(qr[A.tier]>qr[E.tier]&&(E.tier=A.tier),E.d=Math.min(E.d,A.d)):v.set(y,{u:A.u,v:A.v,tier:A.tier,d:A.d})}for(const[A,y]of v)g(y)&&v.delete(A);for(const A of[...a,...l])!v.has(A)&&o.has(A)&&v.set(A,o.get(A));o.clear();for(const[A,y]of v)o.set(A,y);f.queued=o.size-a.size-l.size,m()},pending(S,v,A="nav"){if(!x())return!1;const y=un(S,v);if(c.some(w=>w.u===S&&w.v===v))return!0;const E=o.get(y);return!!E&&qr[E.tier]>=qr[A]},adopt(S=s.adoptMs){if(!c.length)return f.ready=0,0;const v=n();c.sort((E,w)=>{var M,_;return(((M=o.get(un(E.u,E.v)))==null?void 0:M.d)??1e9)-(((_=o.get(un(w.u,w.v)))==null?void 0:_.d)??1e9)});let A=0;for(;c.length&&A<s.adoptMax;){const E=c.shift();if(i.adopt("nav",E.u,E.v,E.nav),E.render&&i.adopt("render",E.u,E.v,E.render),E.detail&&i.adopt("detail",E.u,E.v,E.detail),o.delete(un(E.u,E.v)),l.delete(un(E.u,E.v)),A++,n()-v>S)break}const y=n()-v;return f.adopted+=A,f.adoptMs+=y,f.maxAdoptMs=Math.max(f.maxAdoptMs,y),f.ready=c.length,A},configure(S={}){for(const v of Object.keys(nn))Number.isFinite(S[v])&&(s[v]=Math.min(nn[v].max,Math.max(nn[v].min,S[v])))},setPool(S){t=S,p++,u=0,a.clear(),l.clear(),c.length=0,o.clear(),d=!1},idle(){return u===0&&!c.length}}}const w_=2,oa=30;function E_({world:i,focus:t,heading:e,opts:n,loaded:s}){const r=i.ringPlan(t,{...n,loaded:s,maxLoad:1/0,maxUnload:1/0,ahead:e&&n.aheadBias>0?{dir:e,bias:n.aheadBias}:void 0});return{steps:r.steps.filter(o=>o.tier==="nav"||o.tier==="render"),drop:[...r.drop.render,...r.unload],ready:r.ready,plan:r}}function T_({map:i,cut:t,budgetMs:e=5,maxLoad:n=1/0,onChunk:s,policy:r=E_,ring:o={},pool:a,load:l={},now:c=()=>performance.now()}){const u={navRadius:di.navRadius.value,renderRadius:di.renderRadius.value,thickness:di.thickness.value,aheadBias:di.aheadBias.value,...o},p={ms:e,items:n},d=i.world,f=Object.fromEntries(Object.keys(nn).map(Z=>[Z,nn[Z].value]));Object.assign(f,l);let g=null;const x=()=>{if(g==null||g.terminate(),g=null,!S_(d)||typeof Worker>"u"||!(f.poolSize>0))return null;try{g=jh({spawn:Kh,size:Math.round(f.poolSize)})}catch{g=null}return g},m=b_({world:d,pool:a??x(),config:f});let h=!1;const b=new we,S=[],v=new Map,A={v:go},{floor:y,floorMat:E}=Ph(b),{hover:w,select:M}=Ch({group:b,lineMats:S}),_=new Map,T=new Map;let D=null,k=null,V=null,X=!0,G=null,H=null;const B=(Z,N,Et)=>H?H(Z,N,Et):!0;let tt=[],ut={w:1,h:1};const rt=new Float64Array(oa);let At=0;const Ct={chunksBuilt:0,chunksDropped:0,buildMs:0,maxItemMs:0,lastFrameMs:0,queued:0,slices:0,plans:0,planMs:0,planMsAvg:0,planMsTotal:0,ready:!1};function lt(Z){const N=[],Et=dt=>d.coarse.inBounds(dt.u,dt.v);for(const dt of Z){if(dt.tier==="nav"){N.push({u:dt.u,v:dt.v,tier:"nav",d:dt.d});continue}N.push({u:dt.u,v:dt.v,tier:"render",d:dt.d});for(const St of d.sectorGeo(dt.u,dt.v).nbrs)if(Et(St)){N.push({u:St.u,v:St.v,tier:"render",d:dt.d+.01});for(const yt of d.sectorGeo(St.u,St.v).nbrs)Et(yt)&&N.push({u:yt.u,v:yt.v,tier:"nav",d:dt.d+.02})}}return N}function wt(){const Z=c();if(X=!1,k){const st=D.x-k.x,I=D.z-k.z,R=Math.hypot(st,I);if(R>.5){const C=st/R,U=I/R;V=V?{x:V.x*.5+C*.5,z:V.z*.5+U*.5}:{x:C,z:U}}}k={x:D.x,z:D.z};const N={nav:i.sectors.map(st=>st.key),render:[..._.keys()].map(st=>i.sectors[st].key)},Et=r({world:d,focus:D,heading:V,opts:u,loaded:N});G=Et.plan??Et,tt=Et.steps.map(st=>({kind:st.tier==="nav"?"nav":"mesh",u:st.u,v:st.v,d:st.d}));for(const[st,I]of Et.drop){const R=i.has(st,I);if(!R)continue;T.delete(R.id);const C=_.get(R.id);C&&(b.remove(C.board.group),C.board.dispose(),_.delete(R.id),Ct.chunksDropped++)}const dt=new Set(Et.steps.filter(st=>st.tier==="render").map(st=>`${st.u},${st.v}`));for(const[st,I]of T)dt.has(I.key)||T.delete(st);m.active&&m.want(lt(Et.steps)),Ct.queued=tt.length,Ct.ready=!!Et.ready,Ct.plans++;const St=c()-Z;Ct.planMs=St,Ct.planMsTotal+=St,rt[At%oa]=St,At++;const yt=Math.min(At,oa);let Ot=0;for(let st=0;st<yt;st++)Ot+=rt[st];Ct.planMsAvg=Ot/yt}const zt=(Z,N,Et)=>!h&&m.pending(Z,N,Et);function xt(Z,N){if(zt(Z.u,Z.v,Z.kind==="nav"?"nav":"render"))return"defer";const Et=i.sector(Z.u,Z.v);if(Z.kind==="nav"||_.has(Et.id))return;let dt=T.get(Et.id);if(!dt){for(const Ot of d.sectorGeo(Et.u,Et.v).nbrs){if(!d.coarse.inBounds(Ot.u,Ot.v))continue;if(zt(Ot.u,Ot.v,"render"))return"defer";const st=i.sector(Ot.u,Ot.v);if(!st.cut){for(const I of d.sectorGeo(st.u,st.v).nbrs)if(d.coarse.inBounds(I.u,I.v)&&zt(I.u,I.v,"nav"))return"defer";i.prepare(st),tt.unshift(Z);return}}i.prepare(Et);const yt=i.chunkView(Et);dt={key:Et.key,d:Z.d,assembly:Ih(yt,{cut:t,chunk:{shared:v,lineMats:S,shows:B,glowRef:A}},c)},T.set(Et.id,dt)}if(Ct.slices++,!dt.assembly.run(N))return"more";T.delete(Et.id);const St=dt.assembly.board;St.group.traverse(yt=>{(yt.isMesh&&!yt.isInstancedMesh||yt.isLineSegments2)&&(yt.frustumCulled=!0)});for(const yt of S)yt.resolution.set(ut.w,ut.h);b.add(St.group),_.set(Et.id,{board:St,d:dt.d}),Ct.chunksBuilt++,s==null||s(Et,St)}function Ut(Z=p.ms,N=p.items){const Et=c();m.active&&m.adopt();const dt=Et+Z,St=[];let yt=0;for(;tt.length&&yt<N;){const Ot=tt.shift(),st=c(),I=xt(Ot,dt);if(I==="defer"){St.push(Ot);continue}const R=c()-st;if(Ct.buildMs+=R,Ct.maxItemMs=Math.max(Ct.maxItemMs,R),I==="more"){tt.unshift(Ot);break}if(yt++,c()>dt)break}St.length&&tt.unshift(...St),Ct.queued=tt.length,Ct.lastFrameMs=c()-Et}const L=Z=>{const N=h;h=!0;try{return Z()}finally{h=N}};function q(Z,N){D={x:Z,z:N},(X||!k||Math.hypot(Z-k.x,N-k.z)>w_)&&wt()}function it(Z={}){const N={...m.cfg};m.configure(Z),!Object.keys(nn).every(Et=>m.cfg[Et]===N[Et])&&(!a&&m.cfg.poolSize!==N.poolSize&&(f.poolSize=m.cfg.poolSize,m.setPool(x())),D&&(X=!0,wt()))}const nt=[];return{group:b,hover:w,select:M,lineMats:S,floorMat:E,map:i,stats:Ct,chunks:_,settle(Z,N,Et=u.renderRadius){q(Z,N);const dt=tt.filter(St=>St.d<=Et);tt=tt.filter(St=>St.d>Et),L(()=>{for(;dt.length;)for(tt.unshift(...dt.splice(0));tt.length&&tt[0].d<=Et;)xt(tt.shift(),1/0)}),Ct.queued=tt.length},drain(){L(()=>Ut(1e9,1/0))},pump:Ut,loader:m,get load(){return{...m.cfg}},configureLoad:it,get budget(){return{budgetMs:p.ms,maxLoad:p.items}},configure(Z){let N=!1;for(const Et of Object.keys(u))Number.isFinite(Z==null?void 0:Z[Et])&&Z[Et]!==u[Et]&&(u[Et]=Z[Et],N=!0);Number.isFinite(Z==null?void 0:Z.budgetMs)&&Z.budgetMs>=0&&(p.ms=Z.budgetMs),(Z==null?void 0:Z.maxLoad)===1/0?p.items=1/0:Number.isFinite(Z==null?void 0:Z.maxLoad)&&Z.maxLoad>=1&&(p.items=Math.floor(Z.maxLoad)),N&&(X=!0,D&&wt()),it(Z)},get ring(){return{...u}},get lastPlan(){return G},setFocus(Z,N){y.position.set(Z,-.05,N),E.uniforms.uFocus.value.set(Z,N),q(Z,N)},update(Z){Ut();for(const N of _.values())N.board.update(Z);w.tick(Z),M.tick(Z);for(const N of nt)N(Z)},resize(Z,N){ut={w:Z,h:N};for(const Et of S)Et.resolution.set(Z,N)},setShows(Z){H=Z},setGlowLevel(Z){A.v=Z;for(const N of _.values())N.board.setGlowLevel(Z)},get focus(){return D},dispose(){for(const Z of _.values())Z.board.dispose();_.clear(),T.clear(),g==null||g.terminate(),g=null}}}class Oh{constructor(t){this.a=[],this.cmp=t}get size(){return this.a.length}peek(){return this.a[0]}push(t){const e=this.a,n=this.cmp;let s=e.length;for(e.push(t);s>0;){const r=s-1>>1;if(n(e[s],e[r])>=0)break;[e[s],e[r]]=[e[r],e[s]],s=r}}pop(){const t=this.a,e=this.cmp,n=t[0],s=t.pop();if(t.length){t[0]=s;let r=0;for(;;){const o=2*r+1,a=o+1;let l=r;if(o<t.length&&e(t[o],t[l])<0&&(l=o),a<t.length&&e(t[a],t[l])<0&&(l=a),l===r)break;[t[r],t[l]]=[t[l],t[r]],r=l}}return n}}const tr=(i,t)=>{var e;return(i.cell?i.cell(t):(e=i.cells)==null?void 0:e[t])??null},aa=(i,t)=>{var e,n;return i.gateLocked?!!i.gateLocked(t):!!((n=(e=i.gates)==null?void 0:e[t])!=null&&n.locked)};function A_(){const i=new Map;let t=0;function e(g,x=!0){let m=i.get(g);return!m&&x&&(m={key:g,bits:new Uint8Array(16),n:0},i.set(g,m)),m}const n=(g,x)=>!!g&&x>>3<g.bits.length&&(g.bits[x>>3]&1<<(x&7))!==0;function s(g,x){const m=x>>3;if(m>=g.bits.length){let b=g.bits.length;for(;b<=m;)b*=2;const S=new Uint8Array(b);S.set(g.bits),g.bits=S}const h=1<<(x&7);return g.bits[m]&h?!1:(g.bits[m]|=h,g.n++,t++,!0)}function r(g){const x=[];if(!g)return x;for(let m=0;m<g.bits.length;m++){const h=g.bits[m];if(h)for(let b=0;b<8;b++)h&1<<b&&x.push(m*8+b)}return x}const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=new Map([...o].map((g,x)=>[g,x]));function l(g){let x="";for(let m=0;m<g.length;m+=3){const h=g[m],b=g[m+1]??0,S=g[m+2]??0;x+=o[h>>2]+o[(h&3)<<4|b>>4]+(m+1<g.length?o[(b&15)<<2|S>>6]:"=")+(m+2<g.length?o[S&63]:"=")}return x}function c(g){const x=Math.floor(g.length*3/4)-(g.endsWith("==")?2:g.endsWith("=")?1:0),m=new Uint8Array(x);let h=0;for(let b=0;b<g.length;b+=4){const S=a.get(g[b]),v=a.get(g[b+1]),A=g[b+2]==="="?0:a.get(g[b+2]),y=g[b+3]==="="?0:a.get(g[b+3]);h<x&&(m[h++]=S<<2|v>>4),h<x&&(m[h++]=(v&15)<<4|A>>2),h<x&&(m[h++]=(A&3)<<6|y)}return m}function u(g=null){const x={};for(const m of[...i.keys()].sort()){const h=i.get(m);let b=h.bits.length;for(;b>0&&h.bits[b-1]===0;)b--;b&&(x[m]=l(h.bits.subarray(0,b)))}return{format:"boundless-fog-memory",version:1,world:g,chunks:x}}function p(g){if(!g||g.format!=="boundless-fog-memory"||g.version!==1||typeof g.chunks!="object")throw new Error("not a fog memory");i.clear();for(const x of Object.keys(g.chunks).sort()){const m=c(g.chunks[x]),h=Math.max(16,m.length),b={key:x,bits:new Uint8Array(h),n:0};b.bits.set(m);for(let S=0;S<b.bits.length;S++){let v=b.bits[S];for(;v;)b.n+=v&1,v>>=1}i.set(x,b)}return t++,[...i.keys()]}function d(){let g=0,x=0;for(const m of i.values())g+=m.n,x+=m.bits.length;return{chunks:i.size,cells:g,bytes:x}}return{chunk:e,test:n,set:s,locals:r,serialise:u,restore:p,stats:d,clear:()=>{i.clear(),t++},chunks:i,get version(){return t}}}const bu=1e-5,ss=32,hs=i=>Math.round(i*200);function R_(i,t,e,n,s=null){const r=i.cellAt(t,e);if(!r||s&&s(r))return{start:null,cells:[]};const o=new Map,a=d=>{let f=o.get(d);return f===void 0&&(f=tr(i,d),o.set(d,f)),f},l=new Set([r.id]),c=[],u=[r.id],p=d=>{if(!(!d||l.has(d.id)||Math.hypot(d.cx-t,d.cz-e)>n+(d.radius??3))){if(s&&s(d)){l.add(d.id);return}l.add(d.id),u.push(d.id)}};for(let d=0;d<u.length;d++){const f=a(u[d]);if(!f)continue;c.push(f);for(const x of f.neighbors)p(a(x.id));const g=f.poly;if(!(!g||g.length<3||!f.neighbors.some(x=>x.mid)))for(let x=0;x<g.length;x++){const m=g[x],h=g[(x+1)%g.length],b=(m[0]+h[0])/2,S=(m[1]+h[1])/2;if(Math.hypot(b-t,S-e)>n+1)continue;const v=h[0]-m[0],A=h[1]-m[1],y=v*v+A*A||1;let E=!1;for(const M of f.neighbors){if(!M.mid)continue;const _=((M.mid[0]-m[0])*v+(M.mid[1]-m[1])*A)/y;if(!(_<-.01||_>1.01)&&Math.hypot(m[0]+_*v-M.mid[0],m[1]+_*A-M.mid[1])<.1){E=!0;break}}if(E)continue;const w=Math.hypot(b-f.cx,S-f.cz)||1;p(i.cellAt(b+(b-f.cx)/w*.25,S+(S-f.cz)/w*.25))}}return{start:r,cells:c}}function C_(i){const t=new Map,e=[];for(const n of i){if(!n.solid||!n.poly||n.poly.length<3)continue;const s=n.poly;for(let r=0;r<s.length;r++){const o=s[r],a=s[(r+1)%s.length],l=`${hs(o[0])},${hs(o[1])}`,c=`${hs(a[0])},${hs(a[1])}`,u=l<c?`${l}|${c}`:`${c}|${l}`,p=t.get(u);p===void 0?(t.set(u,e.length),e.push([o[0],o[1],a[0],a[1],n.cx,n.cz])):p>=0&&(e[p]=null,t.set(u,-1))}}return e.filter(Boolean)}function P_(i,t,e,n,s){const r=s[2]-s[0],o=s[3]-s[1],a=e*o-n*r;if(Math.abs(a)<1e-12)return 1/0;const l=s[0]-i,c=s[1]-t,u=(l*o-c*r)/a,p=(l*n-c*e)/a;return u>1e-9&&p>=-1e-9&&p<=1+1e-9?u:1/0}function L_(i,t,e,n){const s=e/Math.cos(Math.PI/ss),r=[];for(const d of n){const f=(d[0]+d[2])/2,g=(d[1]+d[3])/2;if((i-f)*(f-d[4])+(t-g)*(g-d[5])<=0)continue;const x=d[2]-d[0],m=d[3]-d[1],h=x*x+m*m||1,b=Math.max(0,Math.min(1,((i-d[0])*x+(t-d[1])*m)/h));Math.hypot(d[0]+b*x-i,d[1]+b*m-t)<=e+1e-6&&r.push(d)}const o=r.slice();for(let d=0;d<ss;d++){const f=d/ss*Math.PI*2,g=(d+1)/ss*Math.PI*2;o.push([i+s*Math.cos(f),t+s*Math.sin(f),i+s*Math.cos(g),t+s*Math.sin(g)])}const a=[],l=new Set;for(const d of r)for(let f=0;f<4;f+=2){const g=`${hs(d[f])},${hs(d[f+1])}`;if(l.has(g))continue;l.add(g);const x=Math.atan2(d[f+1]-t,d[f]-i);a.push(x-bu,x,x+bu)}for(let d=0;d<ss;d++)a.push((d+.5)/ss*Math.PI*2-Math.PI);a.sort((d,f)=>d-f);const c=[],u=[];let p=-1/0;for(const d of a){if(d-p<1e-9)continue;p=d;const f=Math.cos(d),g=Math.sin(d);let x=1/0;for(const m of o){const h=P_(i,t,f,g,m);h<x&&(x=h)}x<1/0&&(c.push([i+f*x,t+g*x]),u.push(d))}return{pts:c,ang:Float64Array.from(u),ox:i,oz:t}}function wu(i,t,e){const{pts:n,ang:s,ox:r,oz:o}=i,a=n.length;if(a<3)return!1;const l=Math.atan2(e-o,t-r);let c=0,u=a;for(;c<u;){const x=c+u>>1;s[x]<=l?c=x+1:u=x}const p=(c-1+a)%a,d=(p+1)%a,f=n[p],g=n[d];return(g[0]-f[0])*(e-f[1])-(g[1]-f[1])*(t-f[0])>=-1e-9}function I_(i){let t=1/0,e=1/0,n=-1/0,s=-1/0;for(const[r,o]of i)r<t&&(t=r),r>n&&(n=r),o<e&&(e=o),o>s&&(s=o);return{x0:t,z0:e,x1:n,z1:s}}function D_(i,t,e){const n=[],s=i.poly??[];if(!i.solid){n.push([i.cx,i.cz]);for(const[o,a]of s)n.push([i.cx+(o-i.cx)*.75,i.cz+(a-i.cz)*.75]);return n}const r=(o,a)=>{const l=Math.hypot(t-o,e-a)||1;return[o+(t-o)/l*.06,a+(e-a)/l*.06]};for(let o=0;o<s.length;o++){const a=s[o],l=s[(o+1)%s.length];n.push(r((a[0]+l[0])/2,(a[1]+l[1])/2),r(a[0],a[1]))}return n}const Ln=0,ui=1,$r=2,Ws=2,Xs=4194304,qs=256,z_={radius:22,moveEps:.5,pingTtl:6,pingMinStrength:.15,maxEvents:2e3,weight:1,falloff:.35,exploreLevel:.04,trackLevels:!1,worldId:void 0,keyOf:void 0,idOf:void 0},U_=i=>i*i*(3-2*i);function N_(i,t={}){const e={...z_,...t},n=A_();let s=0,r=0;const o=[],a=new Map;let l=0;function c(O){let j=a.get(O);return j||(j={idx:o.length,key:O,ch:n.chunk(O,!1),unloaded:!1,kind:-1,n:0},o.push(j),a.set(O,j)),j}const u=new Map,p=new Map;function d(O){var F;if(e.keyOf){const ht=e.keyOf(O)[0];return c(ht)}if(O.sector!==void 0&&typeof O.local=="number"){let ht=u.get(O.sector);if(!ht){const vt=(F=i.sectors)==null?void 0:F[O.sector];ht=c(vt&&typeof vt.u=="number"?`${vt.u},${vt.v}`:`s${O.sector}`),u.set(O.sector,ht)}return ht}const j=Math.floor(O.id/qs);let K=p.get(j);return K||(K=c(`k${j}`),p.set(j,K)),K}const f=O=>e.keyOf?e.keyOf(O)[1]:O.sector!==void 0&&typeof O.local=="number"?O.local:(O.id%qs+qs)%qs;let g=new Map,x=-1;function m(O){const j=i.sectors;if(!j)return null;if(j.length!==x){g=new Map;for(const K of j)typeof K.u=="number"&&g.set(`${K.u},${K.v}`,K);x=j.length}return g.get(O)??null}function h(O){if(O.kind===-1){const K=/^k(-?\d+)$/.exec(O.key);K?(O.kind=1,O.n=+K[1]):O.kind=0}if(O.kind===1)return O.n*qs;const j=m(O.key);return j?j.base:null}function b(O,j){if(e.idOf)return e.idOf(O.key,j);const K=h(O);return K===null?null:K+j}let S=256;const v={id:new Float64Array(S),info:new Int32Array(S),local:new Int32Array(S),flags:new Uint8Array(S),seen:new Uint8Array(S),level:new Uint8Array(S),until:new Float64Array(S),n:0},A=new Map,y=[];let E=0;function w(O){let j=A.get(O.id);if(j===void 0){if(y.length)j=y.pop();else{if(v.n===S){S*=2;const K=(F,ht)=>{const vt=new F(S);return vt.set(ht),vt};v.id=K(Float64Array,v.id),v.info=K(Int32Array,v.info),v.local=K(Int32Array,v.local),v.flags=K(Uint8Array,v.flags),v.seen=K(Uint8Array,v.seen),v.level=K(Uint8Array,v.level),v.until=K(Float64Array,v.until)}j=v.n++}v.id[j]=O.id,v.info[j]=d(O).idx,v.local[j]=f(O),v.flags[j]=0,v.seen[j]=0,v.level[j]=0,v.until[j]=0,A.set(O.id,j),E++}return j}function M(O){A.delete(v.id[O]),v.id[O]=NaN,v.seen[O]=0,v.flags[O]=0,v.level[O]=0,v.until[O]=0,y.push(O),E--}const _=O=>{const j=o[v.info[O]].ch;return!!j&&n.test(j,v.local[O])},T=O=>v.seen[O]>0?$r:_(O)||v.flags[O]&Ws&&v.until[O]>s?ui:Ln,D=O=>v.info[O]*Xs+v.local[O],k=(O,j)=>{const K=A.get(O);if(K!==void 0)return T(K);const F=o[Math.floor(j/Xs)];return F.ch&&n.test(F.ch,j-F.idx*Xs)?ui:Ln},V=new Map,X=new Map;let G=[];const H=(O,j)=>{G.push({type:O,...j}),G.length>e.maxEvents&&(G=G.slice(-Math.floor(e.maxEvents*.75)))},B=new Map,tt=new Oh((O,j)=>O.until-j.until),ut={updates:0,recomputes:0,cellsRead:0,lastMs:0},rt=O=>{let j=0;for(const K of B.values()){const F=K.cells.get(O);F!==void 0&&F>j&&(j=F)}return j};function At(O){const j=v.seen[O]>0?rt(O):0;e.trackLevels&&j>>4!==v.level[O]>>4&&X.set(v.id[O],D(O)),v.level[O]=j}function Ct(O){v.seen[O]===0&&!(v.flags[O]&Ws)&&M(O)}const lt=()=>Math.max(1,Math.ceil(e.exploreLevel*255));function wt(O){const j=l?gt=>d(gt).unloaded:null,{cells:K,start:F}=R_(i,O.x,O.z,O.radius,j);ut.recomputes++,ut.cellsRead+=K.length;const ht=new Map;let vt=null;if(F&&!F.solid){vt=L_(O.x,O.z,O.radius,C_(K));const gt=I_(vt.pts),ct=O.radius,P=Math.max(1e-6,e.falloff*ct),J=lt();for(const et of K){const bt=Math.hypot(et.cx-O.x,et.cz-O.z);if(bt>ct+(et.radius??3)+1)continue;const It=Math.max(1,typeof e.weight=="function"?e.weight(et,O):e.weight),Pt=Math.min(1,Math.max(0,(ct-Math.max(0,bt-.5*(et.radius??3))*It)/P)),Rt=Math.round(255*U_(Pt));if(Rt<J)continue;let Bt=!1;for(const[Gt,Yt]of D_(et,O.x,O.z))if(!(Gt<gt.x0||Gt>gt.x1||Yt<gt.z0||Yt>gt.z1)&&wu(vt,Gt,Yt)){Bt=!0;break}Bt&&ht.set(w(et),Rt)}O.box=gt}else O.box=null,F&&ht.set(w(F),255);const Lt=[];for(const gt of ht.keys()){if(O.cells.has(gt))continue;const ct=T(gt);v.seen[gt]++,ct!==$r&&V.set(v.id[gt],D(gt));const P=o[v.info[gt]];P.ch||(P.ch=n.chunk(P.key)),n.set(P.ch,v.local[gt])&&Lt.push(v.id[gt])}const $=[];for(const gt of O.cells.keys())ht.has(gt)||(v.seen[gt]--,v.seen[gt]===0&&V.set(v.id[gt],D(gt)),$.push(gt));O.cells=ht;for(const gt of ht.keys())At(gt);for(const gt of $)At(gt),Ct(gt);O.poly=vt,O.ax=O.x,O.az=O.z,r++,Lt.length&&H("revealed",{t:s,cells:Lt,by:O.id,source:"vision"})}function zt(O,j=s){const K=performance.now();s=j,ut.updates++;let F=0;const ht=G.length,vt=new Set;for(const $ of O){vt.add($.id);const gt=$.radius??e.radius;let ct=B.get($.id);ct||(ct={id:$.id,x:$.x,z:$.z,radius:gt,own:$.radius!==void 0,cells:new Map,poly:null,box:null,ax:NaN,az:NaN},B.set($.id,ct)),ct.own=$.radius!==void 0,ct.x=$.x,ct.z=$.z,gt!==ct.radius&&(ct.radius=gt,ct.ax=NaN),Math.hypot(ct.x-ct.ax,ct.z-ct.az)<e.moveEps||(wt(ct),F++)}for(const[$,gt]of B)if(!vt.has($)){B.delete($);for(const ct of gt.cells.keys())v.seen[ct]--,v.seen[ct]===0&&V.set(v.id[ct],D(ct)),At(ct),Ct(ct);r++}q(j),ut.lastMs=performance.now()-K;let Lt=0;for(let $=ht;$<G.length;$++)G[$].type==="revealed"&&(Lt+=G[$].cells.length);return{recomputed:F,revealed:Lt}}function xt(){let O=0;for(const j of B.values())j.own||(j.radius=e.radius),wt(j),O++;return{recomputed:O}}function Ut(O,{ttl:j=e.pingTtl,t:K=s}={}){const F=[];for(const ht of O){const vt=tr(i,ht);if(!vt||l&&d(vt).unloaded)continue;const Lt=w(vt),$=T(Lt);v.flags[Lt]|=Ws;const gt=K+j;gt>v.until[Lt]&&(v.until[Lt]=gt,tt.push({until:gt,i:Lt,id:ht})),$===Ln&&(V.set(ht,D(Lt)),F.push(ht))}return F.length&&(r++,H("revealed",{t:K,cells:F,by:"scan",source:"scan"})),F.length}function L(O,j={}){const K=j.minStrength??e.pingMinStrength,F=[];for(const ht of O)ht.type==="cell-reached"&&!ht.dead&&ht.strength>=K&&!(ht.generation>0)&&F.push(ht.cell);return F.length?Ut(F,{ttl:j.ttl,t:s}):0}function q(O=s){for(s=O;tt.size&&tt.peek().until<=O;){const{until:j,i:K,id:F}=tt.pop();v.id[K]!==F||v.until[K]>j||!(v.flags[K]&Ws)||(v.flags[K]&=~Ws,T(K)===Ln&&(V.set(F,D(K)),r++),Ct(K))}}const it=O=>{const j=A.get(O.id);if(j!==void 0)return T(j);const K=d(O);return K.ch&&n.test(K.ch,f(O))?ui:Ln};function nt(O){const j=A.get(O);if(j!==void 0)return T(j);const K=tr(i,O);return K?it(K):Ln}function Z(O){const j=tr(i,O);if(!j)return!1;const K=d(j);return!!K.ch&&n.test(K.ch,f(j))}const N=O=>{const j=A.get(O);return j===void 0?0:v.level[j]};function Et(O,j){const K=a.get(O);if(!K||!K.ch||!n.test(K.ch,j))return Ln;if(!K.unloaded){const F=b(K,j),ht=F===null?void 0:A.get(F);if(ht!==void 0&&v.seen[ht]>0)return $r}return ui}const dt=(O,j)=>{const K=a.get(O);return!!K&&!!K.ch&&n.test(K.ch,j)},St=O=>[d(O).key,f(O)];function yt(O,j){for(const K of B.values())if(!(!K.box||O<K.box.x0||O>K.box.x1||j<K.box.z0||j>K.box.z1)&&K.poly&&wu(K.poly,O,j))return!0;return!1}function Ot(O,j,K="dynamic"){if(K==="dynamic")return yt(O,j);const F=i.cellAt(O,j);if(!F)return!1;if(K==="static"){const ht=d(F);return!!ht.ch&&n.test(ht.ch,f(F))}return it(F)>=ui}function st(O){const j=[];for(const F of O){const ht=c(F);ht.unloaded||(ht.unloaded=!0,l++,j.push(F))}if(!j.length)return 0;const K=new Set(j.map(F=>a.get(F).idx));for(let F=0;F<v.n;F++)if(!(v.id[F]!==v.id[F]||!K.has(v.info[F]))){for(const ht of B.values())ht.cells.delete(F);M(F)}for(const F of B.values())F.ax=NaN;return r++,H("unloaded",{t:s,keys:j}),j.length}function I(O){const j=[];for(const K of O){const F=a.get(K);if(!(!F||!F.unloaded)&&(F.unloaded=!1,l--,j.push(K),!!F.ch))for(const ht of n.locals(F.ch)){const vt=b(F,ht);vt!==null&&V.set(vt,F.idx*Xs+ht)}}if(!j.length)return 0;for(const K of B.values())K.ax=NaN;return r++,H("loaded",{t:s,keys:j}),j.length}const R=O=>{const j=a.get(O);return!j||!j.unloaded},C=()=>e.worldId??i.seed??null;function U(){return n.serialise(C())}function Y(O,{ignoreWorld:j=!1}={}){const K=typeof O=="string"?JSON.parse(O):O,F=C();if(!j&&F!==null&&K&&K.world!==null&&K.world!==void 0&&K.world!==F)throw new Error(`fog memory is for world ${K.world}, not ${F}`);n.restore(K);for(const ht of n.chunks.keys())c(ht);for(const ht of o)ht.ch=n.chunk(ht.key,!1),ht.unloaded=!1;l=0;for(const ht of A.values())v.id[ht]=NaN;A.clear(),y.length=0,v.n=0,E=0;for(const ht of B.values())ht.cells=new Map,ht.poly=null,ht.box=null,ht.ax=NaN;return V.clear(),X.clear(),r++,H("restored",{t:s,chunks:n.stats().chunks,cells:n.stats().cells}),n.stats()}function W(){q(s);let O=0;for(const Lt of o)Lt.ch&&!Lt.unloaded&&(O+=Lt.ch.n);const j=E+O,K=new Float64Array(j),F=new Uint8Array(j),ht=new Uint8Array(j);let vt=0;for(let Lt=0;Lt<v.n;Lt++)v.id[Lt]===v.id[Lt]&&(K[vt]=v.id[Lt],F[vt]=T(Lt),ht[vt]=v.level[Lt],vt++);for(const Lt of o)if(!(!Lt.ch||Lt.unloaded))for(const $ of n.locals(Lt.ch)){const gt=b(Lt,$);gt===null||A.has(gt)||(K[vt]=gt,F[vt]=ui,vt++)}return{t:s,version:r,count:vt,cell:vt===j?K:K.slice(0,vt),state:vt===j?F:F.slice(0,vt),level:vt===j?ht:ht.slice(0,vt)}}function Tt(){q(s);const O=new Float64Array(V.size),j=new Uint8Array(V.size),K=new Uint8Array(V.size);let F=0;for(const[ht,vt]of V){if(o[Math.floor(vt/Xs)].unloaded)continue;const Lt=A.get(ht);O[F]=ht,j[F]=k(ht,vt),K[F]=Lt===void 0?0:v.level[Lt],F++}return V.clear(),{count:F,cell:F===O.length?O:O.slice(0,F),state:F===O.length?j:j.slice(0,F),level:F===O.length?K:K.slice(0,F)}}function ft(){const O=X.size,j=new Float64Array(O),K=new Uint8Array(O);let F=0;for(const ht of X.keys()){const vt=A.get(ht);j[F]=ht,K[F]=vt===void 0?0:v.level[vt],F++}return X.clear(),{count:O,cell:j,level:K}}function _t(){const O=[];for(const j of o){if(!j.ch||!j.ch.n)continue;const K=n.locals(j.ch);!j.unloaded&&b(j,K[0])!==null||O.push({key:j.key,count:K.length,locals:Int32Array.from(K)})}return O}function Dt(O){const j=B.get(O);if(!j||!j.poly)return new Float32Array(0);const K=new Float32Array(j.poly.pts.length*2);return j.poly.pts.forEach(([F,ht],vt)=>{K[2*vt]=F,K[2*vt+1]=ht}),K}return{update:zt,invalidate:xt,remember:Ut,noteScanEvents:L,tick:q,visibility:nt,isExplored:Z,canSee:yt,canShow:Ot,snapshot:W,drainChanges:Tt,vision:Dt,drainEvents:()=>{const O=G;return G=[],O},levelAt:N,drainLevels:ft,visibilityKey:Et,isExploredKey:dt,keyOfCell:St,unload:st,load:I,isLoaded:R,ghosts:_t,serialise:U,serialize:U,restore:Y,get version(){return r},get time(){return s},get memory(){return{...n.stats(),active:E}},get stats(){return{...ut,tracked:E,viewers:B.size,explored:n.stats().cells}},config:e,UNSEEN:Ln,REMEMBERED:ui,VISIBLE:$r}}const Ae=2,ie=512,li=.42,F_=.62,Eu=32,O_=i=>i*i*(3-2*i),Cn=i=>(i%ie+ie)%ie;function k_({map:i,options:t={},stage:e=null}){const n={radius:t.radius??fn.sightRadius,up:fn.revealRate,down:(1-li)/fn.ghostFade,hold:1.8},s=N_(i,{moveEps:fn.revealStep,falloff:fn.sightSoft,...t,radius:n.radius}),r=H=>i.cell?i.cell(H):i.cells[H],o=new Float32Array(ie*ie),a=new Float32Array(ie*ie),l=new Float32Array(ie*ie),c=new Float32Array(ie*ie),u=new Uint8Array(ie*ie),p=new vh(u,ie,ie,lo,Un);p.magFilter=p.minFilter=Mn,p.wrapS=p.wrapT=io,p.generateMipmaps=!1,p.needsUpdate=!0;let d=0,f=0,g=!1,x=!0;const m=[],h=new Map;let b=-1,S=0;const v={rasters:0,texelsRastered:0,easeTexels:0,slides:0,refilled:0,lastMs:0,maxUp:0,maxDown:0};function A(H,B,tt){const ut=H.length?Array.isArray(H[0])?H.length:H.length/2:0;if(ut<3)return;const rt=!Array.isArray(H[0]),At=new Float64Array(ut),Ct=new Float64Array(ut);let lt=1/0,wt=-1/0;for(let L=0;L<ut;L++)At[L]=(rt?H[2*L]:H[L][0])*Ae,Ct[L]=(rt?H[2*L+1]:H[L][1])*Ae,Ct[L]<lt&&(lt=Ct[L]),Ct[L]>wt&&(wt=Ct[L]);let zt=Math.floor(lt),xt=Math.ceil(wt);tt&&(zt=Math.max(zt,tt.z0),xt=Math.min(xt,tt.z1-1));const Ut=[];for(let L=zt;L<=xt;L++){const q=L+.5;Ut.length=0;for(let it=0,nt=ut-1;it<ut;nt=it++)Ct[it]>q!=Ct[nt]>q&&Ut.push(At[it]+(q-Ct[it])*(At[nt]-At[it])/(Ct[nt]-Ct[it]));Ut.sort((it,nt)=>it-nt);for(let it=0;it+1<Ut.length;it+=2){let nt=Math.ceil(Ut[it]-.5),Z=Math.floor(Ut[it+1]-.5);tt&&(nt=Math.max(nt,tt.x0),Z=Math.min(Z,tt.x1-1));const N=Cn(L)*ie;for(let Et=nt;Et<=Z;Et++)B(N+Cn(Et),(Et+.5)/Ae,q/Ae)}}}const y=(H,B=2)=>{let tt=1/0,ut=1/0,rt=-1/0,At=-1/0;for(let Ct=0;Ct<H.length;Ct+=2)H[Ct]<tt&&(tt=H[Ct]),H[Ct]>rt&&(rt=H[Ct]),H[Ct+1]<ut&&(ut=H[Ct+1]),H[Ct+1]>At&&(At=H[Ct+1]);return{x0:Math.floor(tt*Ae)-B,z0:Math.floor(ut*Ae)-B,x1:Math.ceil(rt*Ae)+B,z1:Math.ceil(At*Ae)+B}},E=(H,B)=>H?B?{x0:Math.min(H.x0,B.x0),z0:Math.min(H.z0,B.z0),x1:Math.max(H.x1,B.x1),z1:Math.max(H.z1,B.z1)}:H:B,w=H=>{m.push({...H,until:S+n.hold})};function M(H){for(let B=H.z0;B<H.z1;B++){const tt=Cn(B)*ie;for(let ut=H.x0;ut<H.x1;ut++){const rt=tt+Cn(ut);o[rt]=a[rt]=l[rt]=c[rt]=0,u[rt]=0}}}function _(H){const B=s.snapshot();let tt=0;for(let ut=0;ut<B.count;ut++){if(B.state[ut]===Ln)continue;const rt=r(B.cell[ut]);if(!rt)continue;const At=rt.poly;let Ct=1/0,lt=1/0,wt=-1/0,zt=-1/0;for(const xt of At)xt[0]<Ct&&(Ct=xt[0]),xt[0]>wt&&(wt=xt[0]),xt[1]<lt&&(lt=xt[1]),xt[1]>zt&&(zt=xt[1]);for(const xt of H)wt*Ae<xt.x0||Ct*Ae>xt.x1||zt*Ae<xt.z0||lt*Ae>xt.z1||(A(At,Ut=>{a[Ut]<li&&(a[Ut]=li,c[Ut]=li,u[Ut]=Math.round(li*255))},xt),tt++)}v.refilled+=tt}function T(H,B){const tt=Math.floor(H*Ae)-ie/2,ut=Math.floor(B*Ae)-ie/2;if(g&&Math.abs(tt-d)<Eu&&Math.abs(ut-f)<Eu)return!1;const rt=[];!g||Math.abs(tt-d)>=ie||Math.abs(ut-f)>=ie?rt.push({x0:tt,z0:ut,x1:tt+ie,z1:ut+ie}):(tt>d?rt.push({x0:d+ie,z0:ut,x1:tt+ie,z1:ut+ie}):tt<d&&rt.push({x0:tt,z0:ut,x1:d,z1:ut+ie}),ut>f?rt.push({x0:tt,z0:f+ie,x1:tt+ie,z1:ut+ie}):ut<f&&rt.push({x0:tt,z0:ut,x1:tt+ie,z1:f}));for(const At of rt)M(At);return d=tt,f=ut,g=!0,_(rt),v.slides++,p.needsUpdate=!0,!0}function D(H){const B=performance.now();let tt=null;for(const ut of H){const rt=s.vision(ut.id),At=rt.length?y(rt):null,Ct=h.get(ut.id)??null;tt=E(tt,E(At,Ct)),h.set(ut.id,At),ut.pts=rt}for(const ut of[...h.keys()])H.some(rt=>rt.id===ut)||(tt=E(tt,h.get(ut)),h.delete(ut));if(tt){for(let ut=tt.z0;ut<tt.z1;ut++){const rt=Cn(ut)*ie;for(let At=tt.x0;At<tt.x1;At++)o[rt+Cn(At)]=0}for(const ut of H){if(!ut.pts.length)continue;const rt=ut.radius??s.config.radius,At=Math.max(1e-6,s.config.falloff*rt);let Ct=0;A(ut.pts,(lt,wt,zt)=>{const xt=Math.hypot(wt-ut.x,zt-ut.z),Ut=O_(Math.min(1,Math.max(0,(rt-xt)/At)));Ut>o[lt]&&(o[lt]=Ut);const L=Ut<li?Ut:li;L>a[lt]&&(a[lt]=L),Ct++},tt),v.texelsRastered+=Ct}v.rasters++,w(tt),v.lastRaster=performance.now()-B}}function k(){const H=s.drainChanges();for(let B=0;B<H.count;B++){const tt=r(H.cell[B]);if(!tt)continue;const ut=H.state[B]===ui&&!s.isExplored(H.cell[B]),rt=H.state[B]===Ln;if(!ut&&!rt)continue;const At=ut?F_:0;let Ct=1/0,lt=1/0,wt=-1/0,zt=-1/0;for(const xt of tt.poly)xt[0]<Ct&&(Ct=xt[0]),xt[0]>wt&&(wt=xt[0]),xt[1]<lt&&(lt=xt[1]),xt[1]>zt&&(zt=xt[1]);A(tt.poly,xt=>{l[xt]=At}),w({x0:Math.floor(Ct*Ae)-1,z0:Math.floor(lt*Ae)-1,x1:Math.ceil(wt*Ae)+1,z1:Math.ceil(zt*Ae)+1})}}function V(H){let B=null;for(let lt=m.length-1;lt>=0;lt--)m[lt].until<S?m.splice(lt,1):B=E(B,m[lt]);if(!B)return;const tt=n.up*H,ut=n.down*H;let rt=0,At=0,Ct=0;for(let lt=B.z0;lt<B.z1;lt++){const wt=Cn(lt)*ie;for(let zt=B.x0;zt<B.x1;zt++){const xt=wt+Cn(zt);let Ut=o[xt];a[xt]>Ut&&(Ut=a[xt]),l[xt]>Ut&&(Ut=l[xt]);const L=c[xt];if(Ut===L)continue;const q=Ut>L?Math.min(Ut,L+tt):Math.max(Ut,L-ut);c[xt]=q;const it=Math.round(q*255);it!==u[xt]&&(u[xt]=it,rt++),q>L?q-L>At&&(At=q-L):L-q>Ct&&(Ct=L-q)}}v.easeTexels=(B.x1-B.x0)*(B.z1-B.z0),v.maxUp=At,v.maxDown=Ct,rt&&(p.needsUpdate=!0)}const X={fog:s,mask:p,stats:v,get enabled(){return x},setEnabled(H){x=!!H,G==null||G.setEnabled(x)},configure(H={}){let B=!1;return H.sightRadius!==void 0&&H.sightRadius!==n.radius&&(n.radius=H.sightRadius,s.config.radius=H.sightRadius,B=!0),H.sightSoft!==void 0&&H.sightSoft!==s.config.falloff&&(s.config.falloff=H.sightSoft,B=!0),B&&s.invalidate(),H.revealStep!==void 0&&(s.config.moveEps=H.revealStep),H.revealRate!==void 0&&(n.up=H.revealRate),H.ghostFade!==void 0&&(n.down=(1-li)/Math.max(.05,H.ghostFade),n.hold=Math.max(1.8,H.ghostFade*1.4+.5)),{...n}},get tuning(){return{...n,falloff:s.config.falloff,moveEps:s.config.moveEps}},update(H,B,tt=1/60){const ut=performance.now();if(S+=tt,v.maxUp=v.maxDown=0,!H.length)return;const rt=T(H[0].x,H[0].z);s.update(H,B),(rt||s.version!==b)&&(D(H.map(At=>({...At}))),b=s.version),k(),V(tt),G==null||G.setWindow(d,f),v.lastMs=performance.now()-ut,v.sightMs=s.stats.lastMs},settle(){for(let H=0;H<c.length;H++){const B=Math.max(o[H],a[H],l[H]);c[H]=B,u[H]=Math.round(B*255)}m.length=0,p.needsUpdate=!0},noteScan(H){return H.length?s.noteScanEvents(H):0},level(H,B){const tt=Math.floor(H*Ae),ut=Math.floor(B*Ae);return tt<d||tt>=d+ie||ut<f||ut>=f+ie?0:c[Cn(ut)*ie+Cn(tt)]},shows(H,B,tt="dynamic"){const ut=X.level(H,B);return tt==="dynamic"?ut>.5:ut>.05},canShow:(H,B,tt="dynamic")=>s.canShow(H,B,tt),knows(H,B){return X.level(H,B)>.05||s.canShow(H,B,"static")},dispose(){p.dispose()}};let G=null;return e!=null&&e.fogPass&&(G=e.fogPass,G.setMask(p)),X}const Tu={ping:{start:.4,build:1.6,hold:1,burn:2.2},sweep:{start:.3,build:5,hold:3,burn:5},echo:{start:.7,build:.5,hold:0,burn:2.6}},Au={ping:{speed:14,power:1,env:"ping"},sweep:{speed:9,power:1,env:"sweep"}},Ci={active:{power:1,clarity:1,loudness:1,glimpseRadius:0},passive:{power:.45,clarity:.6,loudness:.2,glimpseRadius:2}},Ru={default:300,device:150,adversary:355,decoy:45,unknown:300},al={echo:{reveal:"on-arrival",playback:1,traceFloor:.05,scrambleJitter:1.2},floor:.03,hearFloor:.04,maxCells:2500,maxEchoes:16,maxGeneration:2,maxTime:1/0,maxWorkPerAdvance:2e4,echoKeep:64,lookahead:0,maxEvents:4e3,maskMaxCells:400,scrambleHops:3,ringRise:.5,ringTau:2.2},kh=i=>i<=0?0:i>=1?1:i*i*(3-2*i);function $s(i,t){return t<0?0:t<i.build?i.start+(1-i.start)*kh(t/i.build):t<i.build+i.hold?1:Math.exp(-(t-i.build-i.hold)/i.burn)}function B_(i,t,e){return t>e?i.build+i.hold+i.burn*Math.log(t/e):t*i.start>=e?i.build:0}function la(i,t,e=al){if(t<0)return 0;const n=e.ringRise>0?kh(t/e.ringRise):1;return i*n*Math.exp(-Math.max(0,t-e.ringRise)/e.ringTau)}function as(i,t){return i==="absorb"?Math.pow(t,1.4):i==="scramble"?.5*t:.3*t}function rs(i,...t){let e=2166136261^i>>>0;const n=t.join("|");for(let s=0;s<n.length;s++)e^=n.charCodeAt(s),e=Math.imul(e,16777619);return e^=e>>>15,e=Math.imul(e,739982445),e^=e>>>12,e=Math.imul(e,695872825),e^=e>>>15,(e>>>0)/4294967296}const os=(i,t,e)=>i<t?t:i>e?e:i,Cu=Object.freeze({transmission:1,scramble:null,spoofs:[],masks:[]});function G_({nav:i,getCell:t,cfg:e,now:n}){const s=new Map,r=new Map;let o=0;function a(f,g){if(g<f.createdAt||g>=f.expiresAt)return 0;const x=f.expiresAt-g;return x>=f.fade?f.opacity:f.opacity*(x/f.fade)}function l(f){if(f==null)return null;if(typeof f=="object"){const x=i.cellAt(f.x,f.z);return x?{id:x.id,x:f.x,z:f.z}:null}const g=t(f);return g?{id:g.id,x:g.cx,z:g.cz}:null}function c(f){const g=l(f.center);if(!g)return[];const x=f.radius??12,m=f.shape??"disc",h=f.heading??0,b=(f.arc??Math.PI/2)/2,S=E=>{const w=E.cx-g.x,M=E.cz-g.z,_=Math.hypot(w,M);if(_>x)return!1;if(m==="ring")return _>=x*.55;if(m==="cone"){if(_<1e-9)return!0;let T=Math.atan2(M,w)-h;return T=Math.atan2(Math.sin(T),Math.cos(T)),Math.abs(T)<=b}return!0},v=[],A=new Set([g.id]),y=[g.id];for(let E=0;E<y.length;E++){const w=t(y[E]);if(!(!w||w.solid)){if(S(w)&&v.push(w.id),v.length>=e.maskMaxCells)break;for(const M of w.neighbors){if(A.has(M.id))continue;const _=t(M.id);!_||_.solid||Math.hypot(_.cx-g.x,_.cz-g.z)>x+6||(A.add(M.id),y.push(M.id))}}}return v}function u(f={},g=n()){var y,E,w,M,_;const x=f.mode??"absorb";if(!["absorb","scramble","spoof"].includes(x))throw new Error(`unknown mask mode ${x}`);const m=f.cells?[...f.cells]:c(f),h=[];for(const T of m){const D=t(T);D&&!D.solid&&h.push(D.id)}if(!h.length)return null;let b=h[0];const S=f.center!=null?l(f.center):null;if(S){let T=1/0;for(const D of h){const k=t(D),V=Math.hypot(k.cx-S.x,k.cz-S.z);V<T&&(T=V,b=D)}}const v=f.duration??8,A={id:`mask-${++o}`,mode:x,opacity:Math.min(1,Math.max(0,f.opacity??.8)),createdAt:g,expiresAt:g+v,duration:v,fade:Math.min(v,f.fade??Math.min(1.5,v*.25)),shape:f.shape??(f.cells?"cells":"disc"),center:S?{x:S.x,z:S.z}:null,radius:f.radius??null,cells:new Set(h),anchor:b,owner:f.owner??null,spoof:x==="spoof"?{id:((y=f.spoof)==null?void 0:y.id)??`spoof-${o}`,kind:((E=f.spoof)==null?void 0:E.kind)??"device",signature:((w=f.spoof)==null?void 0:w.signature)??.8,strengthResponse:((M=f.spoof)==null?void 0:M.strengthResponse)??1,cell:((_=f.spoof)==null?void 0:_.cell)??b}:null};s.set(A.id,A);for(const T of A.cells){const D=r.get(T);D?D.push(A):r.set(T,[A])}return A}function p(f){s.delete(f.id);for(const g of f.cells){const x=r.get(g);if(!x)continue;const m=x.indexOf(f);m>=0&&x.splice(m,1),x.length||r.delete(g)}}function d(f,g){const x=r.get(f);if(!x)return Cu;let m=1,h=null,b=0,S=null,v=null;for(const A of x){const y=a(A,g);y<=0||((v??(v=[])).push(A),A.mode==="absorb"?m*=1-y:A.mode==="scramble"?(m*=1-.1*y,y>b&&(b=y,h=A)):(S??(S=[])).push(A))}return v?{transmission:m,scramble:h,scrambleOpacity:b,spoofs:S??[],masks:v}:Cu}return{create:u,remove:p,effects:d,opacityAt:a,get:f=>s.get(f)??null,all:()=>[...s.values()],isMasked:(f,g=n())=>d(f,g).masks.length>0,tell:(f,g=n())=>as(f.mode,a(f,g))}}const ls=(i,t)=>typeof i=="number"&&typeof t=="number"?i-t:String(i)<String(t)?-1:String(i)>String(t)?1:0,H_=(i,t)=>i.t-t.t||i.k-t.k||i.w-t.w||ls(i.c,t.c)||t.m-i.m||i.seq-t.seq,Pu=Object.freeze({transmission:1,scramble:null,scrambleOpacity:0,spoofs:[],masks:[]});function V_(i,t={}){const e={...al,...t,echo:{...al.echo,...t.echo??{}}};e.echo.reveal!=="on-arrival"&&e.echo.reveal!=="live"&&(e.echo.reveal="on-arrival");const n=t.seed??1,s=t.sources??(()=>null);let r=0,o=0;const a=new Map,l=C=>{let U=a.get(C);return U===void 0&&(U=tr(i,C),a.set(C,U)),U},c={cells:0,pops:0,pushes:0,sourceCalls:0,echoes:0,heard:0,navCells:0,droppedEvents:0,notices:0},u=new Oh(H_),p=[],d=[],f=new Map;let g=[],x=0,m=0;const h=new Map,b=[],S=[];let v=0,A=1024;const y={n:0,version:0,cell:new Float64Array(A),arrival:new Float64Array(A),strength:new Float32Array(A),gen:new Uint8Array(A),wave:new Int32Array(A),speed:new Float32Array(A),flags:new Uint8Array(A)},E=new Map;function w(){A*=2;for(const[C,U]of[["cell",Float64Array],["arrival",Float64Array],["strength",Float32Array],["gen",Uint8Array],["wave",Int32Array],["speed",Float32Array],["flags",Uint8Array]]){const Y=new U(A);Y.set(y[C]),y[C]=Y}}function M(C,U,Y,W,Tt,ft){y.n===A&&w();const _t=y.n++;y.cell[_t]=typeof U=="number"?U:NaN,y.arrival[_t]=Y,y.strength[_t]=W,y.gen[_t]=C.gen,y.wave[_t]=C.id,y.speed[_t]=C.speed,y.flags[_t]=(Tt?1:0)|(ft?2:0);const Dt=E.get(U);return Dt?Dt.push(_t):E.set(U,[_t]),y.version++,_t}const _=(C=3)=>e.ringRise+e.ringTau*Math.log(Math.max(1.0001,C/.01)),T=G_({nav:i,getCell:l,cfg:e,now:()=>r});function D(C,U,Y=!1){if(g.push(Y?{type:C,...U,hidden:!0}:{type:C,...U}),g.length>e.maxEvents){const W=[];let Tt=g.length-Math.floor(e.maxEvents*.75);for(const ft of g)Tt>0&&ft.type==="cell-reached"?(Tt--,c.droppedEvents++):W.push(ft);g=W}}function k(C,U){const Y=U.env,W={id:p.length+1,pingId:C.id,gen:U.gen,parent:U.parent??null,origin:U.origin,t0:U.t0,power:U.power,env:Y,speed:C.speed,sourceId:U.sourceId??`ping:${C.id}`,claim:U.claim??null,life:B_(Y,U.power,e.floor),settled:new Map,best:new Map,touched:new Set,heardBy:new Set,pending:0,cells:0,burned:!1,cut:null,done:!1,cancelled:!1,wanted:null};if(U.gen>0){W.wanted=new Set(["origin"]);for(const Tt of f.values())for(const ft of Tt)W.wanted.add(ft.id);b.push(W)}return p.push(W),x++,V(W,U.t0,U.origin,1,!0),W}function V(C,U,Y,W,Tt){u.push({t:U,k:1,w:C.id,c:Y,m:W,o:Tt,seq:++o}),C.pending++,c.pushes++}function X(C,U){if(C.done)return;C.done=!0;const Y=h.get(C.id);Y&&(Y.endT=U),x--,D("wave-exhausted",{t:U,waveId:C.id,pingId:C.pingId,generation:C.gen,sourceId:C.sourceId,cells:C.cells,reason:C.cut??(C.burned?"burnout":"frontier-empty")},C.gen>0)}function G(C,U,Y){const W=[];let Tt=C;for(let ft=0;ft<U;ft++){const _t=l(Tt),Dt=[];for(const Mt of _t.neighbors){if(Mt.gate!==void 0&&aa(i,Mt.gate))continue;const O=l(Mt.id);O&&!O.solid&&Dt.push(Mt.id)}if(!Dt.length)break;Dt.sort(ls),Tt=Dt[Math.floor(rs(n,"walk",Y,ft)*Dt.length)],W.push(Tt)}return W}function H(C,U,Y,W,Tt,ft,_t,Dt,Mt=1){const O=os(W.signature??.7,0,1),j=os(W.strengthResponse??1,0,3),K=Tt*j*O*_t.transmission;if(U.echoed.has(W.id))return;let F=null;U.echoes>=e.maxEchoes?F="echo-cap":U.cells>=e.maxCells?F="budget-cells":K<e.floor&&(F=_t.transmission<.5?"masked":"too-faint");const ht={t:ft,waveId:C.id,pingId:U.id,cell:Y,id:W.id,kind:W.kind??"unknown",strength:Tt,echoStrength:F?0:K,echo:!F,reason:F,spoofed:!!Dt};if(D("identifier-hit",ht,!0),F)return;U.echoed.add(W.id),U.echoes++,c.echoes++;let vt=Y,Lt=O,$=1,gt=!1,ct=null;if(_t.scramble&&!Dt){const Pt=_t.scrambleOpacity,Rt=`${C.id}:${W.id}:${_t.scramble.id}`,Bt=os(1+Math.round(Pt*(e.scrambleHops-1)*(.4+.6*rs(n,"hops",Rt))),1,e.scrambleHops);ct=G(Y,Bt,Rt),(!ct.length||ct[ct.length-1]===Y)&&(ct=G(Y,1,`${Rt}:b`)),vt=ct.length?ct[ct.length-1]:Y,Lt=os(O+(rs(n,"sig",C.id,W.id)-.5)*1.6*Pt,0,1),$=os(1-.9*Pt,0,1),gt=!0}let P=Mt<1?as("absorb",1-Mt):0;for(const Pt of _t.masks)P=Math.max(P,as(Pt.mode,T.opacityAt(Pt,ft)));Dt&&(P=Math.max(P,as("spoof",.8)));const J=W.kind??"unknown",et={echoId:++m,id:W.id,kind:J,hue:W.hue??Ru[J]??Ru.default,signature:Lt,quality:$,garbled:gt,spoofed:!!Dt,reorder:gt?1-$:0,trueCell:Y,trueSignature:O,level:P},bt=k(U,{gen:C.gen+1,parent:C.id,origin:vt,t0:ft,power:K,env:Tu.echo,sourceId:W.id,claim:et}),It={sourceId:et.id,kind:et.kind,cell:vt,emitTime:ft,pingId:U.id,returnTime:null,endT:null,wave:bt,claim:et,e0:K,truth:{cell:Y,garbled:et.garbled,spoofed:et.spoofed}};h.set(bt.id,It),D("echo-started",{t:ft,waveId:bt.id,parent:C.id,pingId:U.id,generation:bt.gen,id:W.id,kind:et.kind,cell:vt,trueCell:Y,strength:K,garbled:gt,spoofed:!!Dt},!0)}const B=C=>C<=0?0:C>=1?1:C*C*(3-2*C);function tt(C,U,Y,W,Tt){const ft=C.speed,_t=e.echo.playback,Dt=(Y.t-C.t0)*ft,Mt=Math.max(Y.carry,1e-9),O=[];let j=!1;for(const[vt,Lt]of C.settled){if(Lt.dead||Lt.t>Y.t+1e-9)continue;const $=W*Math.min(1,Mt/Math.max(Lt.carry,1e-9));if($<e.echo.traceFloor&&Lt!==Y){j=!0;continue}O.push({id:vt,dist:(Lt.t-C.t0)*ft,q:Math.min(1.5,$)})}O.sort((vt,Lt)=>Lt.dist-vt.dist||ls(vt.id,Lt.id));const K=O.length,F={hue:U.hue,kind:U.kind,sourceId:U.id,clarity:W,speed:ft,rate:_t,R:Dt,latchTime:Tt,count:K,cut:j,sourceCell:C.origin,cell:new Float64Array(K),dist:new Float32Array(K),arrival:new Float64Array(K),strength:new Float32Array(K),endTime:Tt},ht=U.reorder*e.echo.scrambleJitter;for(let vt=0;vt<K;vt++){const Lt=O[vt];F.cell[vt]=Lt.id,F.dist[vt]=Lt.dist,F.strength[vt]=Lt.q,F.arrival[vt]=Tt+(Dt-Lt.dist)/(ft*_t)}if(ht>0&&K>2){const vt=F.arrival[K-1];for(let J=0;J<K;J++){const et=(rs(n,"jit",U.echoId,F.cell[J])-.5)*2*ht;F.arrival[J]=Math.min(vt,Math.max(Tt,F.arrival[J]+et))}const Lt=Array.from({length:K},(J,et)=>et).sort((J,et)=>F.arrival[J]-F.arrival[et]||J-et),$=new Float64Array(K),gt=new Float32Array(K),ct=new Float64Array(K),P=new Float32Array(K);Lt.forEach((J,et)=>{$[et]=F.cell[J],gt[et]=F.dist[J],ct[et]=F.arrival[J],P[et]=F.strength[J]}),Object.assign(F,{cell:$,dist:gt,arrival:ct,strength:P})}return F.endTime=K?F.arrival[K-1]:Tt,F}function ut(C,U){const Y=[];for(const[ft,_t]of C.settled)!_t.dead&&_t.t<=U&&Y.push({id:ft,t:_t.t,s:_t.strength});Y.sort((ft,_t)=>ft.t-_t.t||ls(ft.id,_t.id));const W=Y.length,Tt={speed:C.speed,emitTime:C.t0,count:W,cell:new Float64Array(W),arrival:new Float64Array(W),strength:new Float32Array(W)};return Y.forEach((ft,_t)=>{Tt.cell[_t]=ft.id,Tt.arrival[_t]=ft.t,Tt.strength[_t]=ft.s}),Tt}function rt(C,U){const Y=C.claim,W=d[C.pingId-1],Tt=Ci[W.mode]??Ci.active,ft=Y.quality*Tt.clarity*B(C.e0/.3);return{echoId:Y.echoId,latched:!1,listener:"origin",pingId:W.id,sourceId:Y.id,kind:Y.kind,hue:Y.hue,signature:Y.signature,cell:C.cell,pingT0:W.t0,emitTime:C.emitTime,returnTime:null,delay:null,estDistance:null,strength:C.e0,clarity:ft,mode:W.mode,glimpse:{cell:C.cell,radius:Math.round((1-ft)*3)+Tt.glimpseRadius,stale:0},replay:null,forward:ut(C.wave,U),tell:{suspicious:!1}}}function At(C,U,Y,W,Tt,ft){const _t=Y.id;if(C.heardBy.has(_t))return;C.heardBy.add(_t),c.heard++;const Dt=C.claim,Mt=Ci[U.mode]??Ci.active,O=ft-U.t0,j=Dt.quality*Mt.clarity*B(Tt/.3),K=Y.id==="origin"?Dt.echoId:`${Dt.echoId}:${Y.id}`,F=C.settled.get(W),ht=tt(C,Dt,F,j,ft);let vt=Dt.level,Lt=F,$=0;for(;Lt&&Lt.parent!=null&&$++<200;){const bt=T.effects(Lt.parent,ft);for(const It of bt.masks)vt=Math.max(vt,as(It.mode,T.opacityAt(It,ft)));Lt=C.settled.get(Lt.parent)}const gt={echoId:K,latched:!0,listener:Y.id,listenerCell:W,pingId:U.id,sourceId:Dt.id,kind:Dt.kind,hue:Dt.hue,signature:Dt.signature,cell:C.origin,pingT0:U.t0,emitTime:C.t0,returnTime:ft,delay:O,estDistance:O*U.speed/2,strength:Tt,clarity:j,mode:U.mode,glimpse:{cell:C.origin,radius:Math.round((1-j)*3)+Mt.glimpseRadius,stale:ft-C.t0},replay:ht,field:ht,R:ht.R,speed:ht.speed,latchTime:ft,tell:{suspicious:rs(n,"tell",K)<vt},truth:{cell:Dt.trueCell,signature:Dt.trueSignature,garbled:Dt.garbled,spoofed:Dt.spoofed,quality:Dt.quality,tellLevel:vt}};S.push(gt);const ct=h.get(C.id);ct&&(ct.returnTime=ft);const{truth:P,replay:J,...et}=gt;D("echo-heard",{t:ft,waveId:C.id,generation:C.gen,...et,replay:ht,id:Dt.id,truth:P}),C.wanted.delete(_t),C.wanted.size===0&&!C.done&&(C.cancelled=!0,C.cut="heard",X(C,ft))}function Ct(C,U){const Y=d[C.pingId-1],W=U.t,Tt=l(U.c);if(!Tt||Tt.solid)return;const ft=W-C.t0;if(ft>C.life){C.burned=!0;return}if(ft>e.maxTime){C.cut??(C.cut="budget-time");return}const _t=C.settled.get(U.c);if(_t&&!_t.dead)return;const Dt=U.o?Pu:T.effects(U.c,W),Mt=U.m*Dt.transmission,O=C.power*$s(C.env,ft)*Mt,j=O>=e.floor||ft<C.env.build+C.env.hold&&C.power*Mt>=e.floor;let K=_t;if(K){if(!j){K.up=!1;return}K.slot>=0&&(y.flags[K.slot]|=4,y.strength[K.slot]=0),K.dead=!1,K.t=W,K.strength=O,K.carry=Mt,K.parent=U.p??K.parent,C.gen===0&&(K.slot=M(C,U.c,W,O,!1,Dt.masks.length>0))}else{if(Y.cells>=e.maxCells){C.cut??(C.cut="budget-cells");return}Y.cells++,c.cells++,C.cells++,K={t:W,strength:O,carry:Mt,dead:!j,up:!1,parent:U.p??null,slot:C.gen===0?M(C,U.c,W,O,!j,Dt.masks.length>0):-1},C.settled.set(U.c,K)}D("cell-reached",{t:W,waveId:C.id,cell:U.c,strength:O,generation:C.gen,dead:!j,masked:Dt.masks.length>0},C.gen>0);for(const F of Dt.masks){if(C.touched.has(F.id)||(C.touched.add(F.id),F.owner!=null&&F.owner===Y.owner))continue;const ht=as(F.mode,T.opacityAt(F,W)),vt=ht*os(.5+U.m*C.power*$s(C.env,ft),0,1);rs(n,"notice",C.id,F.id)<vt&&(c.notices++,D("mask-noticed",{t:W,maskId:F.id,mode:F.mode,cell:U.c,waveId:C.id,pingId:Y.id,detectability:ht,by:Y.owner},C.gen>0))}if(j){if(C.claim&&C.gen>=1&&O>=e.hearFloor){U.c===Y.hearer.cell&&At(C,Y,Y.hearer,U.c,O,W);const F=f.get(U.c);if(F)for(const ht of F)At(C,Y,ht,U.c,O,W)}if(C.gen<e.maxGeneration){const F=s(U.c);if(c.sourceCalls++,F)for(const ht of F)H(C,Y,U.c,ht,O,W,Dt,!1,Mt);for(const ht of Dt.spoofs)ht.spoof.cell!==U.c||Y.spoofed.has(ht.id)||(Y.spoofed.add(ht.id),H(C,Y,U.c,ht.spoof,O,W,Pu,!0,Mt))}for(const F of Tt.neighbors){if(F.gate!==void 0&&aa(i,F.gate))continue;const ht=l(F.id);if(!ht||ht.solid)continue;const vt=C.settled.get(F.id);if(vt&&!vt.dead)continue;const Lt=W+Math.hypot(Tt.cx-ht.cx,Tt.cz-ht.cz)/C.speed,$=Lt-C.t0;if($>C.life){C.burned=!0;continue}if($>e.maxTime){C.cut??(C.cut="budget-time");continue}if(vt){if(vt.up)continue;vt.up=!0}else{const gt=C.best.get(F.id);if(gt!==void 0&&gt<=Lt)continue;C.best.set(F.id,Lt)}u.push({t:Lt,k:1,w:C.id,c:F.id,m:Mt,o:!1,p:U.c,seq:++o}),C.pending++,c.pushes++}}}function lt(C){if(c.pops++,C.k===0){T.remove(C.mask),D("mask-expired",{t:C.t,maskId:C.mask.id});return}const U=p[C.w-1];U.pending--,!U.cancelled&&(Ct(U,C),U.pending===0&&X(U,C.t))}function wt(C,{budgetMs:U=0}={}){const Y=r+Math.max(0,C),W=Y+e.lookahead,Tt=U>0?performance.now():0;let ft=0,_t=!1;for(;u.size&&u.peek().t<=W;){if(ft>=e.maxWorkPerAdvance){_t=!0;break}if(U>0&&(ft&63)===63&&performance.now()-Tt>=U){_t=!0;break}const Dt=u.pop();ft++,v=Math.max(v,Dt.t),lt(Dt)}return r=_t?Math.max(r,Math.min(Y,v)):Y,zt(),_t||(v=Math.max(v,W)),{t:r,work:ft,behind:_t,active:x,solvedUntil:v}}function zt(){for(const[C,U]of h)U.endT!=null&&U.endT<=r&&h.delete(C)}function xt(C,U={}){var O;let Y=C;C&&typeof C=="object"&&(Y=(O=i.cellAt(C.x,C.z))==null?void 0:O.id);const W=Y==null?null:l(Y);if(!W||W.solid)return null;const Tt=U.kind??"ping",ft=Au[Tt]??Au.ping,_t=Ci[U.mode]?U.mode:"active",Dt={id:d.length+1,kind:Tt,mode:_t,origin:W.id,t0:r,owner:U.owner??null,speed:U.speed??ft.speed,echoed:new Set,spoofed:new Set,cells:0,echoes:0,hearer:{id:"origin",cell:W.id}};d.push(Dt);const Mt=k(Dt,{gen:0,origin:W.id,t0:r,power:(U.power??ft.power)*Ci[_t].power,env:Tu[ft.env]});return D("wave-started",{t:r,waveId:Mt.id,pingId:Dt.id,kind:Tt,mode:_t,loudness:Ci[_t].loudness,cell:W.id,speed:Dt.speed,power:Mt.power,lifespan:Mt.life,owner:Dt.owner}),Dt.id}const Ut=C=>{var W;let U=C;C&&typeof C=="object"&&(U=(W=i.cellAt(C.x,C.z))==null?void 0:W.id);const Y=U==null?null:l(U);return Y&&!Y.solid?Y.id:null};function L(C,U){for(const Y of b){if(U!=null&&Y.pingId!==U||Y.heardBy.has(C.id)||!Y.wanted.has(C.id))continue;const W=Y.settled.get(C.cell);!W||W.dead||W.t>r||W.strength<e.hearFloor||At(Y,d[Y.pingId-1],C,C.cell,W.strength,r)}}function q(C,U=null){const Y=Ut(C);if(Y==null)return!1;for(const W of d)U!=null&&W.id!==U||W.hearer.cell===Y||(W.hearer.cell=Y,L(W.hearer,W.id));return!0}function it(C,U){const Y=Ut(U);if(Y==null)return!1;let W=null;for(const Tt of f.values())for(const ft of Tt)ft.id===C&&(W=ft);return!W||W.cell===Y?!!W:(N(C),W.cell=Y,Z(W),L(W,null),!0)}function nt(C){const U=T.create(C,r);return U?(Number.isFinite(U.expiresAt)&&u.push({t:U.expiresAt,k:0,w:0,c:U.id,m:0,o:!1,mask:U,seq:++o}),D("mask-created",{t:r,maskId:U.id,mode:U.mode,opacity:U.opacity,cells:U.cells.size,duration:U.duration,detectability:T.tell(U),anchor:U.anchor,owner:U.owner}),U):null}function Z(C){const U=f.get(C.cell);U?U.push(C):f.set(C.cell,[C])}function N(C){for(const[U,Y]of f){const W=Y.filter(Tt=>Tt.id!==C);W.length?f.set(U,W):f.delete(U)}}(t.listeners??[]).forEach(Z);function Et({maxSeconds:C=120,step:U=.5}={}){let Y=0;for(;x>0&&Y<C;)wt(U),Y+=U;return r}function dt({minMagnitude:C=0,debug:U=!1}={}){c.navCells=a.size;const Y=new Map;for(const F of p)if(!(F.gen>0&&!U))for(const[ht,vt]of F.settled){const Lt=r-vt.t;if(Lt<0)continue;const $=la(vt.strength,Lt,e),gt=Y.get(ht);gt&&(gt.waves++,$<gt.magnitude||$===gt.magnitude&&F.gen>=gt.generation)||Y.set(ht,{id:ht,arrival:vt.t,strength:vt.strength,magnitude:$,age:Lt,generation:F.gen,sourceId:F.sourceId,waveId:F.id,pingId:F.pingId,dist:(vt.t-F.t0)*F.speed,dead:vt.dead,masked:!1,waves:gt?gt.waves:1})}const W=[];for(const F of Y.values())F.magnitude<C||(F.masked=T.isMasked(F.id,r),W.push(F));W.sort((F,ht)=>ls(F.id,ht.id));const Tt=new Map;for(const F of u.a){if(F.k!==1)continue;const ht=Tt.get(F.w);ht?ht.add(F.c):Tt.set(F.w,new Set([F.c]))}const ft=[],_t=[];for(const F of p){if(F.gen>0&&!U)continue;const ht=r-F.t0,vt={waveId:F.id,pingId:F.pingId,generation:F.gen,sourceId:F.sourceId,origin:F.origin,t0:F.t0,age:ht,radius:ht*F.speed,strength:F.power*$s(F.env,ht),power:F.power,cells:F.cells,done:F.done,reason:F.done?F.cut??(F.burned?"burnout":"frontier-empty"):null};_t.push(vt),F.done||ft.push({...vt,frontier:[...Tt.get(F.id)??[]].sort(ls)})}const Dt=e.echo.reveal==="live",Mt=[];for(const F of S){if(F.returnTime>r)continue;const ht={...F,age:r-F.returnTime};U||delete ht.truth,Mt.push(ht)}if(Dt)for(const F of h.values())F.emitTime>r||F.returnTime!=null&&F.returnTime<=r||Mt.push({...rt(F,r),age:r-F.emitTime,...U?{truth:F.truth}:{}});const O=Mt.slice(-e.echoKeep),j={...c};U||(delete j.echoes,delete j.heard);const K={t:r,outgoing:{cells:W,fronts:ft},echoes:O,cells:W,fronts:ft,waves:_t,masks:T.all().map(F=>({id:F.id,mode:F.mode,opacity:T.opacityAt(F,r),baseOpacity:F.opacity,remaining:Math.max(0,F.expiresAt-r),cells:[...F.cells],anchor:F.anchor,detectability:T.tell(F,r),owner:F.owner,shape:F.shape})),stats:j};return U&&(K.hiddenEchoes=[...h.values()].filter(F=>F.returnTime==null||F.returnTime>r)),K}function St({all:C=!1}={}){const U=[],Y=[];for(const W of g)if(W.t>r)Y.push(W);else if(C)U.push(W);else if(!W.hidden)if(W.truth){const{truth:Tt,...ft}=W;U.push(ft)}else U.push(W);return g=Y,U}function yt(){const C=y.n;return{count:C,version:y.version,cell:y.cell.subarray(0,C),arrival:y.arrival.subarray(0,C),strength:y.strength.subarray(0,C),generation:y.gen.subarray(0,C),wave:y.wave.subarray(0,C),speed:y.speed.subarray(0,C),flags:y.flags.subarray(0,C)}}const Ot=C=>{let U=0,Y=y.n;for(;U<Y;){const W=U+Y>>1;y.arrival[W]<C?U=W+1:Y=W}return U};function st(C,U=.5,Y=3){const W=e.lookahead;return[Ot(C-_(Y)-W),Ot(C+U+1e-9)]}function I(C,U,Y=.5){const[W,Tt]=st(U,Y);for(let ft=W;ft<Tt;ft++)C[ft]=y.flags[ft]&5?0:la(y.strength[ft],U-y.arrival[ft],e);return[W,Tt]}function R(C,U,Y){const W=i.cellAt(C,U);if(!W||W.solid)return{intensity:0,cell:W?W.id:null,arrival:1/0};const Tt=l(W.id),ft=[Tt.id];for(const O of Tt.neighbors){if(O.gate!==void 0&&aa(i,O.gate))continue;const j=l(O.id);j&&!j.solid&&ft.push(O.id)}const _t=new Map;for(const O of ft){const j=E.get(O);if(!j)continue;const K=l(O),F=Math.hypot(C-K.cx,U-K.cz);for(const ht of j){if(y.flags[ht]&5)continue;const vt=y.arrival[ht]+F/y.speed[ht],Lt=_t.get(y.wave[ht]);(!Lt||vt<Lt.a)&&_t.set(y.wave[ht],{a:vt,i:ht})}}let Dt=0,Mt=1/0;for(const[O,{a:j,i:K}]of _t){j<Mt&&(Mt=j);const F=p[O-1],ht=la(y.strength[K]*($s(F.env,j-F.t0)/$s(F.env,y.arrival[K]-F.t0)),Y-j,e);ht>Dt&&(Dt=ht)}return{intensity:Dt,cell:Tt.id,arrival:Mt}}return{advance:wt,runUntilIdle:Et,ping:xt,createMask:nt,removeMask:C=>{const U=T.get(C);U&&(T.remove(U),D("mask-expired",{t:r,maskId:C}))},isMasked:C=>T.isMasked(C,r),maskAt:C=>T.effects(C,r).masks.map(Y=>({id:Y.id,mode:Y.mode,opacity:T.opacityAt(Y,r)})),maskTell:C=>{const U=T.get(C);return U?T.tell(U,r):0},addListener:Z,removeListener:N,moveOrigin:q,moveListener:it,snapshot:dt,drainEvents:St,field:yt,activeRange:st,intensityRange:I,sampleAt:R,get solvedUntil(){return v},get time(){return r},get active(){return x},get stats(){return c.navCells=a.size,{...c}},config:e}}const ca=(i,t)=>Math.round(i*1e3)*2e8+Math.round(t*1e3);function W_(i){const t=new Map,e=new Map;function n(r,o,a){const l=new Map([[o,r]]);for(const u of r.neighbors){const p=i(u.id);p&&l.set(u.id,p)}if(a){const u=[...l.values()];for(const p of u)for(const d of p.neighbors){if(l.has(d.id))continue;const f=i(d.id);f&&l.set(d.id,f)}}const c=new Map;for(const[u,p]of l)for(const d of p.poly){const f=ca(d[0],d[1]),g=c.get(f);g?g.includes(u)||g.push(u):c.set(f,[u])}return{near:l,at:c}}function s(r){const o=i(r);if(!o)return[];let{near:a,at:l}=n(o,r,!1);o.poly.some(u=>(l.get(ca(u[0],u[1]))??[]).length<3)&&({near:a,at:l}=n(o,r,!0));const c=[];for(const u of o.poly){const p=l.get(ca(u[0],u[1]));if(!p||p.length<3)continue;const d=p.length===3?p:p.map(f=>{const g=a.get(f);return{cid:f,a:Math.atan2(g.cz-u[1],g.cx-u[0])}}).sort((f,g)=>f.a-g.a).map(f=>f.cid);for(let f=1;f+1<d.length;f++){const g=[d[0],d[f],d[f+1]].sort((h,b)=>h-b),x=g.join("|");let m=t.get(x);m||t.set(x,m={ids:g,key:x}),c.includes(m)||c.push(m)}}return c}return{of(r){let o=e.get(r);return o||(o=s(r),o.length&&e.set(r,o)),o},get size(){return t.size},clear(){t.clear(),e.clear()}}}function Lu(i,{tris:t,cellOf:e,field:n,inside:s,speed:r=14,estimate:o=!0}){const a=new Set,l=[];for(const c of s)for(const u of t.of(c)){if(a.has(u))continue;a.add(u);const p=X_(u,i,e,n,r,o);p&&l.push(p)}return{chains:q_(l),segments:l.length,triangles:a.size}}function X_(i,t,e,n,s,r){const o=[];for(const y of i.ids){const E=e(y);if(!E)return null;const w=!E.solid&&!n.blocked(y),M=w?n.value(y):void 0;o.push({id:y,c:E,open:w,v:M,k:w?n.strength(y):0,est:!1})}const a=o.filter(y=>y.open);if(a.length<2)return null;const l=a.filter(y=>y.v!==void 0);if(!l.length)return null;for(const y of a){if(y.v!==void 0)continue;if(!r)return null;let E=1/0,w=0;for(const M of l){const _=M.v+Math.hypot(y.c.cx-M.c.cx,y.c.cz-M.c.cz)/s;_<E&&(E=_,w=M.k)}y.v=E,y.k=w,y.est=!0}const c=Math.max(...a.map(y=>y.v));for(const y of o)y.open||(y.v=c,y.k=0);const u=o.map(y=>y.v<=t),p=u.filter(Boolean).length;if(p===0||p===3)return null;const d=[];for(let y=0;y<3;y++)for(let E=y+1;E<3;E++){if(u[y]===u[E])continue;const w=u[y]?o[y]:o[E],M=u[y]?o[E]:o[y];let _=(t-w.v)/(M.v-w.v);_=_<0?0:_>1?1:_,M.open||(_=Math.min(_,.5));const T=M.open?M.k:w.k;d.push({key:w.id<M.id?`${w.id}|${M.id}`:`${M.id}|${w.id}`,x:w.c.cx+(M.c.cx-w.c.cx)*_,z:w.c.cz+(M.c.cz-w.c.cz)*_,k:w.k+(T-w.k)*_,cell:w.id})}if(d.length!==2)return null;let f=0,g=0,x=0;for(let y=0;y<3;y++)u[y]&&(f+=o[y].c.cx,g+=o[y].c.cz,x++);f/=x,g/=x;const m=d[1].x-d[0].x,h=d[1].z-d[0].z,b=Math.hypot(m,h);let S=-h,v=m;b<1e-9&&(S=f-d[0].x,v=g-d[0].z);const A=Math.hypot(S,v)||1;return S/=A,v/=A,S*(f-d[0].x)+v*(g-d[0].z)<0&&(S=-S,v=-v),{a:d[0],b:d[1],nx:S,nz:v}}function q_(i){const t=new Map;i.forEach((l,c)=>{for(const u of[l.a,l.b]){let p=t.get(u.key);p||t.set(u.key,p=[]),p.push(c)}});const e=new Uint8Array(i.length),n=(l,c)=>l.a.key===c?l.b:l.a,s=(l,c)=>{for(const u of t.get(l)??[])if(!e[u]&&u!==c)return u;return-1},r=(l,c)=>{const u=[];let p=l,d=c;for(;;){const f=s(d,p);if(f<0)break;e[f]=1;const g=n(i[f],d);u.push({i:f,p:g}),d=g.key,p=f}return u},o=[],a=[...i.keys()].sort((l,c)=>t.get(i[l].a.key).length+t.get(i[l].b.key).length-(t.get(i[c].a.key).length+t.get(i[c].b.key).length));for(const l of a){if(e[l])continue;e[l]=1;const c=i[l],u=r(l,c.b.key),p=r(l,c.a.key),d=[],f=[];for(let h=p.length-1;h>=0;h--)d.push(p[h].p);d.push(c.a,c.b);for(const h of u)d.push(h.p);const g=[...p.map(h=>h.i).reverse(),l,...u.map(h=>h.i)];for(const h of g)f.push([i[h].nx,i[h].nz]);const x=d.length>3&&d[0].key===d[d.length-1].key;x&&d.pop();const m=d.map((h,b)=>{const S=f[Math.max(0,b-1)]??f[0],v=f[Math.min(f.length-1,b)]??f[0];let A=S[0]+v[0],y=S[1]+v[1];if(x&&b===0){const w=f[f.length-1];A=w[0]+f[0][0],y=w[1]+f[0][1]}const E=Math.hypot(A,y)||1;return{x:h.x,z:h.z,k:h.k,cell:h.cell,nx:A/E,nz:y/E}});o.push({pts:m,closed:x})}return o}function $_(i,t,e=80){const n=new Map,s=new Map;for(let c=0;c<i.count;c++)n.set(i.cell[c],i.dist[c]),s.set(i.cell[c],i.arrival[c]);let r=null,o=-1;for(const[c,u]of n)u>o&&(o=u,r=c);const a=[],l=new Set;for(let c=0;c<e&&r!=null&&!l.has(r);c++){l.add(r);const u=t(r);if(!u)break;a.push({x:u.cx,z:u.cz,t:s.get(r)});let p=null,d=n.get(r);for(const f of u.neighbors){const g=n.get(f.id);g!==void 0&&g<d&&(d=g,p=f.id)}r=p}return a}const Bh=3e3,Y_=18,Iu=Bh*Y_,ua=9,Du=900,j_=2400,K_=120,zu=16,Uu=48,Z_=.02;function J_(i,t,e){const n=t*Math.min(e,1-e),s=r=>{const o=(r+i/30)%12;return e-n*Math.max(-1,Math.min(o-3,9-o,1))};return[s(0),s(8),s(4)]}const Q_=[.25,.95,1],Pi=[[-.1,0],[0,1],[.35,.4],[1,0]];function ty({scene:i,map:t,seed:e=1,sources:n,options:s={}}){const r=V_(t,{seed:e,sources:n,...s}),o=L=>t.cell?t.cell(L):t.cells[L],a=W_(o);let l=s.band??3.2;const c=s.waveBudgetMs??6,u={cooldown:s.cooldown??0,maxWaves:s.maxWaves??16},p=new Float32Array(Iu*3),d=new Float32Array(Iu*3),f=new pe;f.setAttribute("position",new Me(p,3).setUsage(Za)),f.setAttribute("color",new Me(d,3).setUsage(Za)),f.setDrawRange(0,0);const g=new Kt(f,Ge(new be({vertexColors:!0,transparent:!0,blending:ze,side:ye,toneMapped:!1,depthTest:!1}),{depthTest:!1}));g.material.depthTest=!1,g.renderOrder=9100,g.frustumCulled=!1,g.name="scan",i.add(g);let x=0,m=0;const h=new Map;let b=0,S=0,v=0,A=[],y=-1e9;const E=new WeakMap;let w=[];const M={frontMs:0,chains:0,segments:0,triangles:0,lastMs:0,field:0,pings:0,arrows:0,waves:0,stale:0,refused:0,fused:0};function _(L,q,it,nt,Z,N,Et,dt){const St=x*3;p[St]=L[0],p[St+1]=Et,p[St+2]=L[1],p[St+3]=q[0],p[St+4]=Et,p[St+5]=q[1],p[St+6]=it[0],p[St+7]=Et,p[St+8]=it[1];for(let yt=0;yt<3;yt++){const Ot=yt===0?nt:yt===1?Z:N;d[St+yt*3]=dt[0]*Ot,d[St+yt*3+1]=dt[1]*Ot,d[St+yt*3+2]=dt[2]*Ot}x+=3}function T(L,q,it,nt,Z,N){if(m>=Bh)return;const Et=De(o(L.cell))+.07,dt=(St,yt)=>[St.x+St.nx*Pi[yt][0]*N,St.z+St.nz*Pi[yt][0]*N];for(let St=0;St+1<Pi.length;St++){const yt=dt(L,St),Ot=dt(L,St+1),st=dt(q,St),I=dt(q,St+1),R=nt*Pi[St][1],C=nt*Pi[St+1][1],U=Z*Pi[St][1],Y=Z*Pi[St+1][1];_(yt,Ot,st,R,C,U,Et,it),_(st,Ot,I,U,C,Y,Et,it)}m++}function D(L,q,it){const nt=L.pts.length;for(let Z=0;Z+1<nt+(L.closed?1:0);Z++){const N=L.pts[Z],Et=L.pts[(Z+1)%nt];T(N,Et,q,Math.min(1.1,N.k)*it,Math.min(1.1,Et.k)*it,l)}}function k(L,q,it,nt,Z,N,Et,dt){const St=it-L,yt=nt-q,Ot=Math.hypot(St,yt)||1,st=-yt/Ot*Z*.5,I=St/Ot*Z*.5,R=[L+st,q+I],C=[L-st,q-I],U=[it+st,nt+I],Y=[it-st,nt-I];_(R,C,U,Et,Et,Et,dt,N),_(U,C,Y,Et,Et,Et,dt,N)}function V(L,q,it,nt){const Z=De(L)+.07,N=18;for(let Et=0;Et<N;Et++){const dt=Et/N*Math.PI*2,St=(Et+1)/N*Math.PI*2;k(L.cx+Math.cos(dt)*q,L.cz+Math.sin(dt)*q,L.cx+Math.cos(St)*q,L.cz+Math.sin(St)*q,.28,it,nt,Z)}}const X=(L,q,it)=>{let nt=0,Z=q;for(;nt<Z;){const N=nt+Z>>1;L[N]<it?nt=N+1:Z=N}return nt},G=new Set;function H(L){L.count<b&&(h.clear(),G.clear(),b=0);for(let q=b;q<L.count;q++){if(L.generation[q]!==0)continue;const it=L.wave[q];if(G.has(it))continue;let nt=h.get(it);nt||(nt={id:it,slotOf:new Map,slots:[],speed:L.speed[q]||14,last:L.arrival[q],strength:0,stamp:-1,chains:[],segments:0},h.set(it,nt),S=Math.max(0,S-1));const Z=L.cell[q],N=nt.slotOf.get(Z);(N===void 0||L.flags[N]&5&&!(L.flags[q]&5))&&nt.slotOf.set(Z,q),nt.slots.push(q),nt.last=L.arrival[q],L.flags[q]&5||(nt.strength=L.strength[q]*.9)}b=L.count}function B(L){for(const[q,it]of h){const nt=ua/it.speed,Z=L-it.last;(Z>2*nt+.5||it.strength<Z_&&Z>nt)&&(h.delete(q),G.add(q),M.fused++)}}const tt=(L,q,it)=>{let nt=0,Z=L.length;for(;nt<Z;){const N=nt+Z>>1;q[L[N]]<it?nt=N+1:Z=N}return nt};function ut(L,q,it,nt){const Z=L.slotOf,N={value:Ot=>{const st=Z.get(Ot);return st===void 0||q.flags[st]&5?void 0:q.arrival[st]},strength:Ot=>{const st=Z.get(Ot);return st===void 0?0:q.strength[st]*.9},blocked:Ot=>{const st=Z.get(Ot);return st!==void 0&&(q.flags[st]&5)!==0}},Et=L.speed,dt=tt(L.slots,q.arrival,it-ua/Et),St=tt(L.slots,q.arrival,it),yt=[];for(let Ot=St-1;Ot>=dt&&yt.length<nt;Ot--){const st=L.slots[Ot];q.flags[st]&5||yt.push(q.cell[st])}return Lu(it,{tris:a,cellOf:o,field:N,inside:yt,speed:Et,estimate:!0})}function rt(L={}){const q=L.cooldown??u.cooldown,it=L.maxWaves??u.maxWaves,nt=q>0?Math.max(0,q-(r.time-y)):0,Z=h.size+S;return nt>1e-9?{ok:!1,reason:"cooldown",left:nt,active:Z,max:it}:Z>=it?{ok:!1,reason:"waves",left:0,active:Z,max:it}:{ok:!0,reason:null,left:0,active:Z,max:it}}function At(L){let q=E.get(L);if(!q){const it=new Map,nt=new Map;for(let Z=0;Z<L.count;Z++)it.set(L.cell[Z],L.arrival[Z]),nt.set(L.cell[Z],L.strength[Z]);q={when:it,str:nt,path:null,arc:null,chev:null,rgb:J_(L.hue,.95,.6)},E.set(L,q)}return q}const Ct=new Set,lt=new Set;let wt=null;function zt(L,q){if(q.chev)return q.chev;if(q.path=$_(L,o),q.path.length<2)return null;q.arc=[0];for(let Z=1;Z<q.path.length;Z++)q.arc.push(q.arc[Z-1]+Math.hypot(q.path[Z].x-q.path[Z-1].x,q.path[Z].z-q.path[Z-1].z));const it=q.path[q.path.length-1].t-q.path[0].t,nt=it>0?q.arc[q.arc.length-1]/it*1.6:10;return q.chev=Nh({parent:i,color:q.rgb,behind:Math.max(2,nt)}),q.chev.configure(wt??{}),q.chev.set(q.path,.09),Ct.add(q),q.chev}function xt(L,q){const it=L.path;if(q<=it[0].t)return 0;for(let nt=1;nt<it.length;nt++)if(q<it[nt].t){const Z=(q-it[nt-1].t)/Math.max(1e-6,it[nt].t-it[nt-1].t);return L.arc[nt-1]+(L.arc[nt]-L.arc[nt-1])*Z}return L.arc[L.arc.length-1]}function Ut(L,q,it){const nt={value:dt=>q.when.get(dt),strength:dt=>(q.str.get(dt)??0)*.95,blocked:()=>!1},Z=X(L.arrival,L.count,it-ua/(L.speed||14)),N=X(L.arrival,L.count,it),Et=[];for(let dt=N-1;dt>=Z&&Et.length<Du;dt--)Et.push(L.cell[dt]);return Lu(it,{tris:a,cellOf:o,field:nt,inside:Et,speed:L.speed||14,estimate:!1})}return{sim:r,mesh:g,stats:M,tris:a,configure(L){if(L&&Number.isFinite(L.scanBand)&&(l=L.scanBand),L&&Number.isFinite(L.pingCooldown)&&(u.cooldown=Math.max(0,L.pingCooldown)),L&&Number.isFinite(L.pingMaxWaves)&&(u.maxWaves=Math.max(1,Math.round(L.pingMaxWaves))),L){wt=L;for(const q of Ct)q.chev.configure(L)}},get band(){return l},get fronts(){return w},ping(L,q,it={}){if(!rt(it).ok)return M.refused++,null;const Z=r.ping({x:L,z:q},it);return Z!=null&&(y=r.time,M.pings++,S++),Z},get pingState(){const L=rt();return{ready:L.ok,reason:L.reason,left:L.left,active:L.active,max:L.max,cooldown:u.cooldown}},step(L,q=3){r.advance(L,{budgetMs:q});const it=r.drainEvents();for(const nt of it)nt.type==="echo-heard"&&nt.replay&&nt.replay.count&&A.push(nt);return A.length>Uu&&A.splice(0,A.length-Uu),it},update(){const L=performance.now(),q=r.time;x=0,m=0,w=[],M.chains=0,M.segments=0,M.triangles=0,M.arrows=0,lt.clear();const it=r.field();M.field=it.count,a.size>6e4&&a.clear(),H(it),B(q),M.waves=h.size,M.stale=0;for(let nt=A.length-1;nt>=0;nt--)q>A[nt].replay.endTime+8&&A.splice(nt,1);if(M.frontMs=0,h.size){const nt=[...h.values()],Z=Math.max(K_,Math.min(Du,Math.floor(j_/nt.length))),N=nt.length>1?[...nt].sort((yt,Ot)=>yt.stamp-Ot.stamp):nt,Et=performance.now();let dt=0,St=0;for(const yt of N){if(yt.stamp>=0&&dt>0&&performance.now()-Et>=c){St++;continue}const Ot=ut(yt,it,q,Z);yt.chains=Ot.chains,yt.segments=Ot.segments,yt.stamp=++v,dt++,M.triangles+=Ot.triangles}M.frontMs=performance.now()-Et,M.stale=St;for(const yt of nt)w.push({kind:"wave",wave:yt.id,chains:yt.chains});for(let yt=nt.length-1;yt>=0;yt--){for(const Ot of nt[yt].chains)D(Ot,Q_,.9);M.chains+=nt[yt].chains.length,M.segments+=nt[yt].segments}}for(const nt of A.length>zu?A.slice(-zu):A){const Z=nt.replay,N=At(Z),Et=Ut(Z,N,q);w.push({kind:"echo",chains:Et.chains});for(const dt of Et.chains)D(dt,N.rgb,.95);if(M.chains+=Et.chains.length,M.segments+=Et.segments,M.triangles+=Et.triangles,q>Z.latchTime-.2&&q<Z.endTime+5){const dt=zt(Z,N);dt&&(dt.setHead(xt(N,q)),dt.update(q),lt.add(N),M.arrows+=dt.stats.glyphs)}if(q>Z.endTime){const dt=Math.max(0,Math.min(1,(Z.endTime+7-q)/3)),St=o(nt.glimpse.cell);St&&dt>0&&(V(St,.8+(q-Z.endTime)*.35,N.rgb,.9*dt),m+=6)}}for(const nt of Ct)lt.has(nt)||(nt.chev.dispose(),nt.chev=null,Ct.delete(nt));f.setDrawRange(0,x),f.attributes.position.needsUpdate=!0,f.attributes.color.needsUpdate=!0,g.visible=x>0,M.lastMs=performance.now()-L},dispose(){var L;for(const q of Ct)(L=q.chev)==null||L.dispose();Ct.clear(),i.remove(g),f.dispose(),g.material.dispose()}}}function ey({scene:i,state:t,now:e=()=>0,heightAt:n=()=>.05,avatarAt:s=()=>null}){const r=new we;r.name="effects",i.add(r);let o=.38;const a=new Map,l=[new on(.5,.62,36),new Bi(.12,.42),new on(.95,1.05,48),new on(.7,.8,32),new bn(.06,2.4,.06),new on(.18,.26,20)],[c,u,p,d,f,g]=l,x={trace:8382975,hint:10482687,halo:10149887,beacon:12577535,mark:16773280,hit:16777215},m={trace:.95,hint:.6,halo:.6,beacon:.7,mark:.9,hit:.9};function h(w){const M=Ge(new be({color:new Ht(x[w]).multiplyScalar(1.5),transparent:!0,opacity:m[w],side:ye,blending:ze,toneMapped:!1}),{depthTest:!0});return M.depthWrite=!1,M}function b(w,M){const _=Lh(o)*Math.max(0,Math.min(1,M));for(const{m:T,base:D}of w)T.opacity=Math.min(1,D*_),T.visible=_>0}function S(w,M,_){const T=new Kt(w,M);return T.renderOrder=_,T.frustumCulled=!1,T}function v(w,M,_,T){const D=M.x-w.x,k=M.z-w.z,V=Math.hypot(D,k);if(V<1e-4)return null;const X=-k/V*(_/2),G=D/V*(_/2),H=new pe;return H.setAttribute("position",new ne([w.x+X,T,w.z+G,w.x-X,T,w.z-G,M.x-X,T,M.z-G,M.x+X,T,M.z+G],3)),H.setIndex([0,1,2,0,2,3]),H}const A={trace(w){const M=n(w.from.x,w.from.z)+.12,_=new we,T=[],D=[],k=v(w.from,w.to,.2,M),V=v(w.from,w.to,.05,M+.005);if(k){const X=h("trace");D.push({m:X,base:m.trace*.55}),T.push(k),_.add(S(k,X,jt.TRAIL))}if(V){const X=h("trace");D.push({m:X,base:m.trace}),T.push(V),_.add(S(V,X,jt.TRAIL))}if(w.wall){const X=h("hit");D.push({m:X,base:m.hit});const G=S(g,X,jt.TRAIL);G.rotation.x=-Math.PI/2,G.position.set(w.wall.x,n(w.wall.x,w.wall.z)+.14,w.wall.z),_.add(G)}return{obj:_,mats:D,geos:T,fade:X=>1-(X-w.t0)/(w.until-w.t0)}},hint(w){const M=n(w.from.x,w.from.z)+.1,_=new we,T=[],D=[],k=v(w.from,w.to,.5,M);if(k){const V=h("hint");D.push({m:V,base:m.hint}),T.push(k),_.add(S(k,V,jt.TRAIL))}return{obj:_,mats:D,geos:T,fade:V=>1-(V-w.t0)/(w.until-w.t0),pulse:V=>.7+.3*Math.sin((V-w.t0)*9)}},halo(w){const M=h("halo"),_=S(p,M,jt.BEAM);return _.rotation.x=-Math.PI/2,{obj:_,mats:[{m:M,base:m.halo}],geos:[],fade:T=>Math.min(1,(w.until-T)/1),follow:()=>s(w.who)}},beacon(w){const M=h("beacon"),_=h("beacon"),T=new we,D=S(d,M,jt.BEAM);D.rotation.x=-Math.PI/2;const k=n(w.at.x,w.at.z);D.position.set(w.at.x,k+.1,w.at.z);const V=S(f,_,jt.BEAM);return V.position.set(w.at.x,k+1.3,w.at.z),T.add(D,V),{obj:T,mats:[{m:M,base:m.beacon},{m:_,base:m.beacon*.6}],geos:[],fade:X=>Number.isFinite(w.until)?Math.min(1,(w.until-X)/1):1}},mark(w){const M=h("mark"),_=new we,T=S(c,M,jt.MARKERS);T.rotation.x=-Math.PI/2,_.add(T);for(let D=0;D<4;D++){const k=S(u,M,jt.MARKERS);k.rotation.x=-Math.PI/2;const V=D*Math.PI/2;k.position.set(Math.cos(V)*.85,0,Math.sin(V)*.85),k.rotation.z=V+Math.PI/2,_.add(k)}return _.position.set(w.x,n(w.x,w.z)+.11,w.z),{obj:_,mats:[{m:M,base:m.mark}],geos:[],fade:()=>1}}};function y(w,M){const _=A[w](M);if(!_)throw new Error(`effectsView: no view for '${w}'`);return r.add(_.obj),_}function E(w){r.remove(w.obj);for(const{m:M}of w.mats)M.dispose();for(const M of w.geos)M.dispose()}return{group:r,get count(){return a.size},setGlow(w){Number.isFinite(w)&&(o=w)},update(){const w=e();t.prune(w);const M=new Set,_=(T,D,k)=>{const V=`${T}:${D}`;M.add(V);let X=a.get(V);if(X||(X=y(T,k),a.set(V,X)),X.follow){const H=X.follow();H&&X.obj.position.set(H.x,n(H.x,H.z)+.12,H.z)}let G=X.fade(w);X.pulse&&(G*=X.pulse(w)),b(X.mats,G)};for(const T of t.marks)_("mark",T.id,T);for(const T of t.fx)_(T.kind,T.id,T);for(const[T,D]of a)M.has(T)||(E(D),a.delete(T))},dispose(){for(const w of a.values())E(w);a.clear();for(const w of l)w.dispose();i.remove(r)}}}function dy({canvas:i,map:t,seed:e=1,streamed:n=!0,fog:s=!0,mode:r="chase",embedded:o=!1,focus:a,storage:l,settings:c,onHover:u,onSelect:p,onStatus:d}){var w,M;const f=y_({canvas:i,map:t,mode:r,fog:s,embedded:o,focus:a,makeBoard:n?({map:_,cut:T})=>T_({map:_,cut:T}):void 0,onHover:u,onSelect:p});n&&f.board.settle(t.startCell.cx,t.startCell.cz,30);const g=yf(t,{spawnCell:t.startCell,seed:e}),x=$h({seed:e}),m=e_(l);c&&m.set(c),f.rig.bindKeys(()=>m.keys()),m.subscribe(_=>f.applySettings(_));let h=null;const b=M_({stage:f,actors:g,canvas:f.renderer.domElement,embedded:o,shows:(_,T,D)=>h?h.shows(_,T,D):!0,onStatus:d,keys:()=>m.keys()});h=s?k_({map:t,stage:f}):null,h&&(f.setKnowledge((_,T)=>h.knows(_,T)),(M=(w=f.board).setShows)==null||M.call(w,(_,T,D)=>h.shows(_,T,D))),m.subscribe(_=>{var T,D;h==null||h.configure(_),(D=(T=f.board).configure)==null||D.call(T,_)});const S=ty({scene:f.scene,map:t,seed:e});m.subscribe(_=>S.configure(_));const v=Tf(),A=Ef({session:x,state:v,ports:{world:g.world,knows:(_,T)=>h?h.knows(_,T):!0,pingState:()=>S.pingState,ping:(_,T,D)=>S.ping(_,T,D),move:(_,T)=>_==="avatar"?g.commandAvatarTo(T.x,T.z):{ok:!1,reason:"no-route"},posOf:_=>{const T=g.snapshot()[_],D=T.render??T;return{x:D.x,z:D.z}},cellAt:_=>(t.cell?t.cell(_):t.cells[_])??null}}),y=ey({scene:f.scene,state:v,now:()=>x.vitals.t,heightAt:(_,T)=>De(g.world.locate(_,T)),avatarAt:_=>{const T=g.snapshot()[_],D=(T==null?void 0:T.render)??T;return D?{x:D.x,z:D.z}:null}});m.subscribe(_=>y.setGlow(_.glow)),f.on("frame",(_,T)=>{const D=g.snapshot(),k=V=>{const X=D[V],G=X.render??X;return{id:V,x:G.x,z:G.z}};if(h==null||h.update([k("avatar"),k("companion")],T,_),!b.paused){const V=S.step(_);V.length&&(h==null||h.noteScan(A.filterScan(V)))}S.update(),y.update()});const E=()=>{const _=g.snapshot().avatar,T=_.render??_;return S.ping(T.x,T.z)};return b.bind("ping",E),{map:t,seed:e,streamed:n,stage:f,board:f.board,actors:g,settings:m,play:b,fogView:h,scanView:S,session:x,effects:A,ping:E,dispose(){b.dispose(),A.dispose(),y.dispose(),x.dispose(),S.dispose(),h==null||h.dispose(),f.dispose()}}}const Yr=1e7;function py(i,{world:t,worldOptions:e,start:n=[0,0]}={}){const s=t??Zh(i,e),{field:r,coarse:o}=s,a=[],l=new Map,c=[],u=new Map,p=[],d=new Set,f={navMs:0,navN:0,cutMs:0,cutN:0,maxMs:0},g=(y,E)=>`${y},${E}`,x={seed:i,world:s,tileset:s,sectors:a,cells:c,gates:p,terrain:s.cfg,contours:[],sectorEdges:[],cuts:[],bounds:{x0:-Yr,z0:-Yr,x1:Yr,z1:Yr},stats:f};x.cell=y=>Number.isInteger(y)?c[y]??null:null,x.cellById=x.cell,x.gateLocked=y=>{var E;return!!((E=p[y])!=null&&E.locked)};function m(y,E){const w=performance.now(),M=E(),_=performance.now()-w;return f[`${y}Ms`]+=_,f[`${y}N`]++,f.maxMs=Math.max(f.maxMs,_),M}function h(y,E){for(const w of y.nav.portals){if(w.q[0]!==E.u||w.q[1]!==E.v)continue;const M=`${y.key}>${E.key}#${w.slot}`;if(d.has(M))continue;d.add(M);const _=c[y.base+w.cell],T=c[u.get(`${w.partner[0]},${w.partner[1]}`)];if(!_||!T)continue;const D=Math.abs(w.edge.a[0]-w.edge.b[0]),k=Math.abs(w.edge.a[1]-w.edge.b[1]),V=w.span.reduce((B,tt)=>B+tt.len,0),X=[w.span.reduce((B,tt)=>B+tt.mid[0]*tt.len,0)/V,w.span.reduce((B,tt)=>B+tt.mid[1]*tt.len,0)/V],G={id:p.length,a:_.id,b:T.id,sa:y.id,sb:E.id,mid:X,len:V,horiz:k>=D,slot:w.slot,locked:w.locked,edge:w.edge,span:w.span,faces:w.faces,soft:w.soft,cells:[],kind:w.kind,visible:w.visible,axis:w.axis,normal:w.normal},H=[...w.span].sort((B,tt)=>(tt.mid===w.edge.mid?1:0)-(B.mid===w.edge.mid?1:0));for(const B of H){const tt=c[y.base+B.cell],ut=c[u.get(`${B.partner[0]},${B.partner[1]}`)];!tt||!ut||tt.neighbors.some(rt=>rt.id===ut.id)||(tt.neighbors.push({id:ut.id,mid:B.mid,len:B.len,gate:G.id}),ut.neighbors.push({id:tt.id,mid:B.mid,len:B.len,gate:G.id}),G.cells.push([tt.id,ut.id]))}p.push(G),y.gates.push(G),E.gates.push(G)}}function b(y,E){const w=g(y,E);let M=l.get(w);if(M)return M;const _=m("nav",()=>s.nav(y,E));M={id:a.length,u:y,v:E,key:w,clearance:_.info.clearance,name:w,base:c.length,cellIds:[],nav:_,gates:[],cut:!1,kind:"",render:null,rect:null},a.push(M),l.set(w,M);let T=1/0,D=1/0,k=-1/0,V=-1/0;for(const X of _.cells){for(const[H,B]of X.poly)T=Math.min(T,H),D=Math.min(D,B),k=Math.max(k,H),V=Math.max(V,B);const G={id:c.length,sector:M.id,clearance:M.clearance,local:X.local,solid:_.solid[X.local],poly:X.poly,cx:X.cx,cz:X.cz,area:X.area,radius:X.radius,sides:X.sides,i:X.i,j:X.j,neighbors:[],cache:0};c.push(G),u.set(`${X.i},${X.j}`,G.id),M.cellIds.push(G.id)}M.rect={x0:T,z0:D,x1:k,z1:V};for(const X of _.cells)for(const G of X.nbl){if(G.j<X.local)continue;const H=c[M.base+X.local],B=c[M.base+G.j];H.neighbors.push({id:B.id,mid:G.mid,len:G.len}),B.neighbors.push({id:H.id,mid:G.mid,len:G.len})}for(const X of Object.values(Jh)){const G=l.get(g(y+X[0],E+X[1]));G&&(Bl([M.u,M.v],[G.u,G.v])<=0?h(M,G):h(G,M))}return M}function S(y,E){if(!s.cfg.borders.openCross)return;const w=new Set(E.gapEdges);for(const M of y.nav.cells)if(!y.nav.solid[M.local])for(const _ of M.ext){const T=l.get(g(_.u,_.v));if(!T||Bl([y.u,y.v],[T.u,T.v])>0)continue;const D=o.border([y.u,y.v],[T.u,T.v]).mode;if(D!=="open"&&D!=="wall"||D==="wall"&&!w.has(Nu(_.a,_.b)))continue;const k=u.get(`${_.i},${_.j}`);if(k===void 0||c[k].solid)continue;const V=c[y.base+M.local],X=c[k];V.neighbors.some(G=>G.id===X.id)||(V.neighbors.push({id:X.id,mid:_.mid,len:_.len,open:!0}),X.neighbors.push({id:V.id,mid:_.mid,len:_.len,open:!0}))}}const v=y=>s.sectorGeo(y.u,y.v).nbrs.filter(E=>o.inBounds(E.u,E.v));function A(y){if(y.cut)return y;for(const E of v(y))b(E.u,E.v);return m("cut",()=>{const E=s.render(y.u,y.v);for(const T of E.cuts??[]){const D=c[y.base+T.local];D.cut={poly:T.poly,open:T.open},x.cuts.push({cell:D.id,poly:T.poly,open:T.open})}const w=T=>b(T.u,T.v).base+T.local,M=s.detail(y.u,y.v);y.kind=M.kind;for(const T of M.caches){const D=c[y.base+T.cell];!D.role&&!D.solid&&(D.cache=T.amount)}const _=T=>T?b(T[0],T[1]).id:-1;y.render={contours:E.contours.map(T=>({a:T.a,b:T.b,solid:w(T.solid),open:w(T.open),...T.sliver?{sliver:!0}:{}})),sectorEdges:E.sectorEdges.map(T=>({a:T.a,b:T.b,sa:y.id,sb:_(T.sb),...T.sliver?{sliver:!0}:{},...T.open?{open:!0}:{},...T.gap?{gap:!0}:{}})),borderLines:E.borderLines.map(T=>({...T,sa:y.id,sb:_(T.sb)})),openings:E.openings.map(T=>({...T,sa:y.id,sb:_(T.sb)})),gapEdges:E.gapEdges},S(y,E)}),y.cut=!0,y}x.cellAt=(y,E)=>{const[w,M]=r.cellAtPoint(y,E);let _=u.get(`${w},${M}`);if(_===void 0){const[T,D]=r.sectorOf(w,M);b(T,D),_=u.get(`${w},${M}`)}return _===void 0?null:c[_]},x.sectorAt=(y,E)=>{const w=x.cellAt(y,E);return w?a[w.sector]:null},x.sectorIndexAt=(y,E)=>r.sectorOf(...r.cellAtPoint(y,E)),x.sector=b,x.prepare=A,x.has=(y,E)=>l.get(g(y,E)),x.chunkView=y=>{const E=[];for(const _ of[y,...v(y).map(T=>l.get(g(T.u,T.v)))])if(_)for(const T of _.cellIds)E.push(c[T]);const w=y.cellIds.map(_=>c[_]),M=x.startCell;return{cells:w,edgeCells:E,gates:y.gates,drawsGate:_=>_.sa===y.id,sectors:a,cellById:x.cell,sectorEdges:y.render.sectorEdges,contours:y.render.contours,sectorLines:y.render.borderLines,sectorOpenings:y.render.openings,gapEdges:y.render.gapEdges,startCell:M,beacons:M&&M.sector===y.id?[[M,8256767,0,2.4,.5]]:[]}};{const y=A(b(n[0],n[1])),E=y.nav.cells[y.nav.seedLocal??0];let w=null,M=1/0;for(const _ of y.cellIds){const T=c[_];if(T.solid)continue;const D=Math.hypot(T.cx-E.cx,T.cz-E.cz)-T.radius*.5;D<M&&(M=D,w=T)}w.role="start",x.startCell=w}return x.coarse=o,x}export{Ps as A,fn as D,uy as G,Hr as R,zl as S,Il as a,cy as b,Ov as c,xo as d,Dh as e,hy as f,fy as g,py as h,ay as i,dy as j,sl as k,oy as l,Pv as m,Iv as n,_n as o,e_ as p,ly as r};
