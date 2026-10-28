import{m as Bh}from"./rng-BKYMqjzS.js";import{C as xe,a as Mi,h as Gh}from"./palette-DlZOkp1f.js";import{e as zu,d as nn,R as di,f as Hh,h as Vh,i as Wh,D as Xh,j as kl}from"./client-W2xtaGAf.js";const vn={tick:1/60,maxFrame:.25,collision:{maxStep:.2,maxSubsteps:96,iterations:4,skin:.01},avatar:{radius:.45,speed:5.6,runSpeed:8.4,accel:26,decel:34,turnRate:14},companion:{radius:.4,speed:5.9,catchupSpeed:8.8,accel:26,decel:34,turnRate:12},facing:{minSpeed:.5,tau:.07},route:{reach:.45,arriveTol:.35,margin:.06,cornerFloor:.4,cornerLook:1.4,stuckTime:.9,stuckGain:.3,pullMargin:.1,pullStep:.35,pullLook:7,blendTime:.35,cornerMargin:.3,cornerPush:1,cornerRing:12,cornerStep:.1,cornerTurn:.2,doorCentreWidth:3.6,doorTol:.25,doorBudget:1.2,doorLead:.7,doorTurn:1,tidyLine:.12,tidySpike:1.9,tidyShort:.8,smooth:{passes:6,arc:1.25,hookTurn:.9,maxTurn:1.15,round:1,legShare:.45,minLeg:.7,outward:[0,.2,.4,.6],minGain:.1,lenSlack:.02,clearSlack:.02},look:.9,lookSpeed:.22,lookMax:2.2,passRadius:1},follow:{distance:3.4,lateral:1.6,start:5.2,stop:3.6,catchup:10,doorClear:2.2,doorWidth:3.6,wallClear:.3,reslot:.5,blinkDistance:42,lead:.9,replanDist:1.8,reslotMax:1.4,farScale:12,searchStep:150,searchMax:12e3,retry:1.5,slotBudget:260},patrol:{dwell:1.2,maxWaypoints:12},react:{dwell:1.5,face:1.2,giveUp:14},separation:{gap:.15,push:4.5},recovery:{window:5},triggers:{maxRules:32,maxFiresPerTick:4,repeat:2,maxSignals:32},noise:{run:9,runEvery:.6},events:{max:512}},er=(i,t,e)=>i<t?t:i>e?e:i;function or(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const o=i[s][0],a=i[s][1],l=i[r][0],c=i[r][1];a>e!=c>e&&t<(l-o)*(e-a)/(c-a)+o&&(n=!n)}return n}const $s=(i,t,e,n,s,r)=>(e-i)*(r-t)-(n-t)*(s-i);function bs(i,t){let e=(t-i)%(Math.PI*2);return e>Math.PI?e-=Math.PI*2:e<=-Math.PI&&(e+=Math.PI*2),e}function qh(i,t,e){const n=bs(i,t);return Math.abs(n)<=e?t:i+Math.sign(n)*e}function vo(i,t,e,n,s,r){const o=s-e,a=r-n,l=o*o+a*a,c=l>0?er(((i-e)*o+(t-n)*a)/l,0,1):0;return Math.hypot(i-(e+c*o),t-(n+c*a))}const Yh=vn;class Bl{constructor(t,e,n){this.id=t,this.x=n.x,this.z=n.z,this.heading=0,this.vx=0,this.vz=0,this.speed=0,this.radius=e.radius,this.cell=n.cell,this.moving=!1,this.controlled=!1,this.touching=!1,this.sliver=!1,this.px=n.x,this.pz=n.z,this.pheading=0,this.spec=e,this.accel=e.accel,this.decel=e.decel,this.world=null,this._route=null,this._want={x:0,z:0},this._blocked=0,this._blockedFired=!1,this._aim=null,this._face=null}step(t,e,n,s,r){const o=s-this.vx,a=r-this.vz,l=Math.hypot(o,a),c=Math.hypot(s,r),u=Math.hypot(this.vx,this.vz),d=(c>=u-1e-6?this.accel:this.decel)*n;l<=d?(this.vx=s,this.vz=r):(this.vx+=o/l*d,this.vz+=a/l*d),this._want.x=s,this._want.z=r;const{maxStep:f,maxSubsteps:h}=Yh.collision,m=Math.hypot(this.vx,this.vz)*n,x=Math.min(h,Math.max(1,Math.ceil(m/Math.min(f,this.radius*.4)))),g=n/x,p={x:0,z:0},b=[];let M=!1,v=0;e.substeps+=x;for(let S=0;S<x;S++){const E=this.x,w=this.z,y=t.cell(this.cell);if(!y){this.vx=0,this.vz=0;break}p.x=E+this.vx*g,p.z=w+this.vz*g,b.length=0;const R=t.resolve(p,this.radius,t.near(y),b),F=t.locate(p.x,p.z,this.cell);if(!F||t.blocked(F,p.x,p.z)){e.violations++,this.vx=0,this.vz=0,M=!0;continue}if(this.x=p.x,this.z=p.z,this.sliver=F.solid,F.solid||(this.cell=F.id),R){M=!0,e.contacts++;for(let B=0;B<b.length;B+=2){const Y=this.vx*b[B]+this.vz*b[B+1];Y<0&&(this.vx-=Y*b[B],this.vz-=Y*b[B+1])}}v+=Math.hypot(this.x-E,this.z-w)}this.touching=M,this.speed=Math.hypot(this.vx,this.vz),this.moving=this.speed>.15;const T=Math.hypot(s,r),_=n>0?v/n:0;T>1&&_<T*.3?this._blocked+=n:(this._blocked=0,this._blockedFired=!1)}face(t,e,n=0){const s=this.spec.turnRate*t;if(!(n>0)){this.heading=qh(this.heading,e,s);return}const r=bs(this.heading,e),o=Math.min(s,Math.abs(r)*(1-Math.exp(-t/n)));this.heading+=Math.sign(r)*o}teleport(t){this.x=t.x,this.z=t.z,this.cell=t.cell,this.px=t.x,this.pz=t.z,this.pheading=this.heading,this.vx=this.vz=this.speed=0,this.moving=!1,this._route=null}pub(){return{id:this.id,x:this.x,z:this.z,heading:this.heading,vx:this.vx,vz:this.vz,speed:this.speed,radius:this.radius,cell:this.cell,moving:this.moving,controlled:this.controlled,touching:this.touching,sliver:this.sliver,prev:{x:this.px,z:this.pz,heading:this.pheading}}}}const _o=.03,$h=.6,Gl=1.2,jh=2;class Kh{constructor(t){this.nav=t,this.infos=new Map,this.nears=new Map,this.solids=new Map,this.doorLists=new Map,this.doorNears=new Map,this.usables=new Map}cell(t){const e=this.nav;return(e.cell?e.cell(t):e.cells[t])??null}live(t){return this.cell(t)!==null}purge(){var t;for(const e of[this.infos,this.nears,this.solids,this.doorLists,this.doorNears,this.usables])(t=e==null?void 0:e.clear)==null||t.call(e)}gateLocked(t){var n,s;const e=this.nav;return e.gateLocked?!!e.gateLocked(t):!!((s=(n=e.gates)==null?void 0:n[t])!=null&&s.locked)}locate(t,e,n){if(n!=null){const s=this.cell(n);if(s&&or(s.poly,t,e))return s;if(s)for(const r of s.neighbors){const o=this.cell(r.id);if(o&&or(o.poly,t,e))return o}}return this.nav.cellAt(t,e)??null}blocked(t,e,n){return t.solid?t.cut?or(t.cut.poly,e,n):!0:!1}solidWalls(t){let e=this.solids.get(t.id);if(e)return e;const n=t.cut?t.cut.poly:t.poly,s=n.length;let r=0;for(let u=0;u<s;u++){const d=n[u],f=n[(u+1)%s];r+=d[0]*f[1]-f[0]*d[1]}const o=r>=0?1:-1,a=[];let l=!1;for(const u of t.neighbors){const d=this.cell(u.id);d?d.solid&&a.push(d.poly):l=!0}const c=(u,d)=>{for(const f of a)for(let h=0;h<f.length;h++){const m=f[h],x=f[(h+1)%f.length];if(vo(u,d,m[0],m[1],x[0],x[1])<_o)return!0}return!1};e=[];for(let u=0;u<s;u++){const d=n[u],f=n[(u+1)%s],h=f[0]-d[0],m=f[1]-d[1],x=Math.hypot(h,m);x<1e-6||c((d[0]+f[0])/2,(d[1]+f[1])/2)||e.push({ax:d[0],az:d[1],bx:f[0],bz:f[1],nx:o*m/x,nz:-o*h/x,gate:void 0})}return l||this.solids.set(t.id,e),e}info(t){let e=this.infos.get(t.id);if(e)return e;const n=t.poly,s=n.length,r=[];for(let f=0;f<s;f++){const h=n[f],m=n[(f+1)%s],x=m[0]-h[0],g=m[1]-h[1],p=Math.hypot(x,g);if(p<1e-6)continue;let b=-g/p,M=x/p;(t.cx-h[0])*b+(t.cz-h[1])*M<0&&(b=-b,M=-M),r.push({ax:h[0],az:h[1],bx:m[0],bz:m[1],dx:x/p,dz:g/p,L:p,nx:b,nz:M,open:!1,gate:null})}const o=new Array(t.neighbors.length).fill(null),a=[],l=(f,h)=>{let m=null,x=1/0;for(const g of r){const p=(f[0]-g.ax)*g.dx+(f[1]-g.az)*g.dz;if(p<-h||p>g.L+h)continue;const b=Math.abs((f[0]-g.ax)*-g.dz+(f[1]-g.az)*g.dx);b<x&&(x=b,m={e:g,t:p})}return m&&x<=h?m:null};let c=!1;t.neighbors.forEach((f,h)=>{const m=this.cell(f.id);if(!m){c=!0;return}if(m.solid){const x=l(f.mid,_o);x&&(x.e.solidBacked=!0);return}if(f.gate===void 0){const x=l(f.mid,_o);if(!x){a.push(h);return}x.e.open=!0;const g=x.e;o[h]={x0:g.ax,z0:g.az,x1:g.bx,z1:g.bz,w:g.L,gate:void 0}}else{const x=l(f.mid,$h);if(!x){a.push(h);return}const g=x.e,p=(f.len??2.4)/2,b=Math.max(0,x.t-p),M=Math.min(g.L,x.t+p);(g.gate??(g.gate=[])).push({k:h,t0:b,t1:M,id:f.gate}),o[h]={x0:g.ax+g.dx*b,z0:g.az+g.dz*b,x1:g.ax+g.dx*M,z1:g.az+g.dz*M,w:Math.max(0,M-b),gate:f.gate,merged:!1}}});const u=[],d=(f,h,m,x)=>{m-h<1e-4||u.push({ax:f.ax+f.dx*h,az:f.az+f.dz*h,bx:f.ax+f.dx*m,bz:f.az+f.dz*m,nx:f.nx,nz:f.nz,gate:x})};for(const f of r)if(!(f.open||f.solidBacked))if(f.gate){const h=f.gate.slice().sort((x,g)=>x.t0-g.t0);let m=0;for(const x of h)d(f,m,x.t0,void 0),d(f,x.t0,x.t1,x.id),m=Math.max(m,x.t1);d(f,m,f.L,void 0)}else d(f,0,f.L,void 0);return e={walls:u,portals:o,unmatched:a,edges:r},c||this.infos.set(t.id,e),e}portal(t,e){const n=this.info(t).portals[e];if(!n)return null;if(n.gate!==void 0&&!n.merged){n.merged=!0;const s=t.neighbors[e],r=this.cell(s.id);if(!r)return null;const o=this.info(r),a=r.neighbors.findIndex(v=>v.gate===s.gate&&v.id===t.id),l=a>=0?o.portals[a]:null;if(!l)return n.w=0,n;const c=n.x1-n.x0,u=n.z1-n.z0,d=Math.hypot(c,u)||1,f=c/d,h=u/d,m=(l.x0-n.x0)*f+(l.z0-n.z0)*h,x=(l.x1-n.x0)*f+(l.z1-n.z0)*h,g=Math.max(0,Math.min(m,x)),p=Math.min(d,Math.max(m,x)),b=n.x0,M=n.z0;n.x0=b+f*g,n.z0=M+h*g,n.x1=b+f*Math.max(g,p),n.z1=M+h*Math.max(g,p),n.w=Math.max(0,p-g)}return n}near(t){let e=this.nears.get(t.id);if(e)return e;const n=new Set([t.id]),s=[t];let r=[t],o=!1;for(let a=0;a<jh;a++){const l=[];for(const c of r)for(const u of c.neighbors){if(n.has(u.id))continue;n.add(u.id);const d=this.cell(u.id);if(!d){o=!0;continue}s.push(d),l.push(d)}r=l}e=[];for(const a of s)for(const l of a.solid?this.solidWalls(a):this.info(a).walls)e.push(l);return o||this.nears.set(t.id,e),e}resolve(t,e,n,s){const{iterations:r,skin:o}=vn.collision,a=e+o;let l=0;for(let c=0;c<r;c++){let u=!1;for(const d of n){if(d.gate!==void 0&&!this.gateLocked(d.gate))continue;const f=d.bx-d.ax,h=d.bz-d.az,m=f*f+h*h,x=m>0?Math.min(1,Math.max(0,((t.x-d.ax)*f+(t.z-d.az)*h)/m)):0,g=d.ax+x*f,p=d.az+x*h,b=t.x-g,M=t.z-p,v=b*b+M*M,T=(t.x-d.ax)*d.nx+(t.z-d.az)*d.nz;if(v>=a*a||T<0&&x>0&&x<1)continue;const _=Math.sqrt(v);let S,E,w;_>1e-9?(S=b/_,E=M/_,w=a-_):(S=d.nx,E=d.nz,w=a),t.x+=S*w,t.z+=E*w,u=!0,l++,s&&s.push(S,E)}if(!u)break}return l}wallDist(t,e,n,s=!1){let r=1/0;for(const o of this.near(n)){if(o.gate!==void 0&&(s||!this.gateLocked(o.gate)))continue;const a=vo(t,e,o.ax,o.az,o.bx,o.bz);a<r&&(r=a)}return r}openNear(t,e,n){let s=null,r=1/0;for(const o of t.neighbors){const a=this.cell(o.id);if(!a||a.solid)continue;let l=or(a.poly,e,n)?0:1/0;if(l!==0)for(let c=0;c<a.poly.length;c++){const u=a.poly[c],d=a.poly[(c+1)%a.poly.length];l=Math.min(l,vo(e,n,u[0],u[1],d[0],d[1]))}(l<r-1e-9||Math.abs(l-r)<=1e-9&&s&&a.id<s.id)&&(r=l,s=a)}return s}walkClear(t,e,n,s,r,o,a=!1){const l=r+vn.route.pullMargin,c=r-.005,u=Math.hypot(n-t,s-e),d=Math.max(1,Math.ceil(u/vn.route.pullStep));let f=o;for(let h=0;h<=d;h++){const m=h/d,x=t+(n-t)*m,g=e+(s-e)*m,p=this.locate(x,g,f);if(!p||this.blocked(p,x,g))return!1;f=p.id;const b=m*u<.6||(1-m)*u<.6;if(this.wallDist(x,g,p,a)<(b?c:l))return!1}return!0}settle(t,e,n,s=0){const r=[[0,0]];for(const o of[.6,1.2,2,3,4.5])for(let a=0;a<8;a++){const l=a/8*Math.PI*2+o;r.push([Math.cos(l)*o,Math.sin(l)*o])}for(const[o,a]of r){const l={x:t+o,z:e+a};let c=this.locate(l.x,l.z);if(!(!c||c.solid)&&(this.resolve(l,n+s,this.near(c),null),c=this.locate(l.x,l.z,c.id),!(!c||c.solid)&&this.wallDist(l.x,l.z,c)>=n-.02))return{x:l.x,z:l.z,cell:c.id}}return null}usable(t,e,n){const s=e+"@"+n;let r=this.usables.get(t.id);if(r||this.usables.set(t.id,r=new Map),r.has(s))return r.get(s);let o=null;const a=this.portal(t,e);if(a&&a.w>0){const l=n+vn.route.margin,c=Math.max(4,Math.min(40,Math.ceil(a.w/.15))),u=a.x1-a.x0,d=a.z1-a.z0;let f=null,h=null;for(let m=0;m<=c;m++){const x=m/c,g=a.x0+u*x,p=a.z0+d*x;this.wallDist(g,p,t,!0)>=l?(h?h.e=m:h={s:m,e:m},(!f||h.e-h.s>f.e-f.s)&&(f=h)):h=null}f&&(o={x0:a.x0+u*f.s/c,z0:a.z0+d*f.s/c,x1:a.x0+u*f.e/c,z1:a.z0+d*f.e/c,w:Math.hypot(u,d)*(f.e-f.s)/c,gate:a.gate})}return r.set(s,o),o}passable(t,e,n){return!!this.usable(t,e,n)}doorsOf(t){let e=this.doorLists.get(t.id);if(e)return e;if(e=[],t.solid)return this.doorLists.set(t.id,e),e;const n=this.info(t),s=(r,o)=>this.wallDist(r,o,t,!0)<Gl;return t.neighbors.forEach((r,o)=>{const a=n.portals[o];if(!a)return;const l=(a.x0+a.x1)/2,c=(a.z0+a.z1)/2;a.gate!==void 0?e.push({x:r.mid[0],z:r.mid[1]}):a.w<vn.follow.doorWidth&&s(a.x0,a.z0)&&s(a.x1,a.z1)&&e.push({x:l,z:c})}),t.neighbors.every(r=>this.cell(r.id))&&this.doorLists.set(t.id,e),e}isDoor(t,e){const n=this.info(t).portals[e];if(!n)return!1;if(n.gate!==void 0)return!0;if(n.w>=vn.route.doorCentreWidth)return!1;const s=(r,o)=>this.wallDist(r,o,t,!0)<Gl;return s(n.x0,n.z0)&&s(n.x1,n.z1)}doorsNear(t){let e=this.doorNears.get(t.id);if(e)return e;e=this.doorsOf(t).slice();for(const n of t.neighbors){const s=this.cell(n.id);if(s&&!s.solid)for(const r of this.doorsOf(s))e.push(r)}return t.neighbors.every(n=>this.cell(n.id))&&this.doorNears.set(t.id,e),e}inDoorway(t,e,n,s){for(const r of this.doorsNear(n))if(Math.hypot(r.x-t,r.z-e)<s)return!0;return!1}}const Hl=new WeakMap;function Zh(i){let t=Hl.get(i);return t||(t=new Kh(i),Hl.set(i,t)),t}class Jh{constructor(t,e,n,{passable:s=null}={}){if(this.get=t.cell?o=>t.cell(o):o=>t.cells[o],this.locked=t.gateLocked?o=>!!t.gateLocked(o):o=>{var a,l;return!!((l=(a=t.gates)==null?void 0:a[o])!=null&&l.locked)},this.passable=s,this.fromId=e,this.toId=n,this.goal=this.get(n),this.expanded=0,this.state="running",this.res=null,this.g=new Map([[e,0]]),this.prev=new Map,this.closed=new Set,this.heap=[],this.bestId=e,this.bestH=1/0,!this.goal||this.goal.solid){this.state="fail";return}if(e===n){this.state="done",this.res={cells:[e],length:0};return}const r=this.get(e);if(!r){this.state="fail";return}this._push([this._h(r),e])}_h(t){return Math.hypot(t.cx-this.goal.cx,t.cz-this.goal.cz)}_less(t,e){return t[0]<e[0]||t[0]===e[0]&&t[1]<e[1]}_push(t){const e=this.heap;e.push(t);let n=e.length-1;for(;n>0;){const s=n-1>>1;if(!this._less(e[n],e[s]))break;[e[n],e[s]]=[e[s],e[n]],n=s}}_pop(){const t=this.heap,e=t[0],n=t.pop();if(t.length){t[0]=n;let s=0;for(;;){const r=2*s+1,o=r+1;let a=s;if(r<t.length&&this._less(t[r],t[a])&&(a=r),o<t.length&&this._less(t[o],t[a])&&(a=o),a===s)break;[t[s],t[a]]=[t[a],t[s]],s=a}}return e}_chain(t){const e=[];for(let n=t;n!==void 0;n=this.prev.get(n))e.push(n);return e.reverse(),{cells:e,length:this.g.get(t)}}step(t=1/0){if(this.state!=="running")return this.state;const{g:e,prev:n,closed:s,heap:r,get:o,locked:a,passable:l}=this;let c=t;for(;r.length&&c>0;){const[,u]=this._pop();if(s.has(u))continue;if(u===this.toId)return this.state=!e.has(u)||!n.has(u)?"fail":"done",this.state==="done"&&(this.res=this._chain(u)),this.state;s.add(u),this.expanded++,c--;const d=o(u);if(!d)continue;const f=this._h(d);f<this.bestH&&(this.bestH=f,this.bestId=u);for(let h=0;h<d.neighbors.length;h++){const m=d.neighbors[h];if(s.has(m.id)||m.gate!==void 0&&a(m.gate))continue;const x=o(m.id);if(!x||x.solid||l&&!l(d,h,x))continue;const g=Math.hypot(d.cx-m.mid[0],d.cz-m.mid[1])+Math.hypot(m.mid[0]-x.cx,m.mid[1]-x.cz),p=e.get(u)+g;p<(e.get(m.id)??1/0)&&(e.set(m.id,p),n.set(m.id,u),this._push([p+this._h(x),m.id]))}}return r.length||(this.state="fail"),this.state}result(){return this.res}partial(){return this.bestId===this.fromId?null:this._chain(this.bestId)}}function Qh(i,t,{look:e=6}={}){if(i.length<=2)return i.slice();const n=[i[0]];let s=0;for(;s<i.length-1;){let r=Math.min(i.length-1,s+e);for(;r>s+1&&!t(i[s],i[r]);)r--;n.push(i[r]),s=r}return n}const je=vn;function tf(i,t,e){const n=t.concat([{lx:e.x,lz:e.z,rx:e.x,rz:e.z}]),s=[];let r=i.x,o=i.z,a=r,l=o,c=r,u=o,d=0,f=0,h=n.length*4+16;for(let p=0;p<n.length&&h-- >0;p++){const b=n[p];if($s(r,o,c,u,b.rx,b.rz)>=0)if(r===c&&o===u||$s(r,o,a,l,b.rx,b.rz)<0)c=b.rx,u=b.rz,f=p;else{s.push({x:a,z:l}),r=a,o=l;const M=d;a=c=r,l=u=o,d=f=M,p=M;continue}if($s(r,o,a,l,b.lx,b.lz)<=0)if(r===a&&o===l||$s(r,o,c,u,b.lx,b.lz)>0)a=b.lx,l=b.lz,d=p;else{s.push({x:c,z:u}),r=c,o=u;const M=f;a=c=r,l=u=o,d=f=M,p=M;continue}}s.push({x:e.x,z:e.z});const m=[];let x=i.x,g=i.z;for(const p of s)Math.hypot(p.x-x,p.z-g)<1e-6||(m.push(p),x=p.x,g=p.z);return m.length||m.push({x:e.x,z:e.z}),m}function ua(i,t,e,n){const s=i.locate(e.x,e.z);if(!s)return{ok:!1,reason:"outside"};if(s.solid)return{ok:!1,reason:"solid"};const r=i.settle(e.x,e.z,n);if(!r)return{ok:!1,reason:"cramped"};let o=i.locate(t.x,t.z,t.cell)??i.cell(t.cell);if(!o)return{ok:!1,reason:"unloaded"};if(o.solid&&(o=i.openNear(o,t.x,t.z)),!o)return{ok:!1,reason:"unreachable"};const a=new Jh(i.nav,o.id,r.cell,{passable:(l,c)=>i.passable(l,c,n)});return{ok:!0,search:a,goal:r,finish:(l=a.result())=>{if(!l)return{ok:!1,reason:"unreachable"};let c=r;if(l.cells[l.cells.length-1]!==r.cell){const u=i.cell(l.cells[l.cells.length-1]);if(c=u&&i.settle(u.cx,u.cz,n),!c)return{ok:!1,reason:"unreachable"}}return ef(i,t,c,o,l,n)}}}function Rn(i,t,e,n,{maxExpand:s=1/0}={}){const r=ua(i,t,e,n);return r.ok?r.search.step(s)==="done"?r.finish():{ok:!1,reason:"unreachable"}:r}function ef(i,t,e,n,s,r){var M;const o=je.route,a=[],l=[];for(let v=0;v+1<s.cells.length;v++){const T=i.cell(s.cells[v]);if(!T)return{ok:!1,reason:"unloaded"};let _=null,S=!1;if(T.neighbors.forEach((B,Y)=>{if(B.id!==s.cells[v+1])return;const Z=i.usable(T,Y,r);Z&&(!_||Z.w>_.w)&&(_=Z,S=i.isDoor(T,Y))}),!_)return{ok:!1,reason:"unloaded"};const E={x:_.x0,z:_.z0},w={x:_.x1,z:_.z1},y=(_.x0+_.x1)/2,R=(_.z0+_.z1)/2,F=$s(T.cx,T.cz,y,R,E.x,E.z);if(a.push(F>=0?{lx:E.x,lz:E.z,rx:w.x,rz:w.z}:{lx:w.x,lz:w.z,rx:E.x,rz:E.z}),S){const B=_.gate!==void 0?((M=i.nav.gates)==null?void 0:M[_.gate])??null:null;l.push({x0:_.x0,z0:_.z0,x1:_.x1,z1:_.z1,w:_.w,n:(B==null?void 0:B.normal)??null})}}const c=tf(t,a,e),u=[{x:t.x,z:t.z},...c],d=(v,T)=>i.walkClear(v.x,v.z,T.x,T.z,r,n.id),f=Qh(u,d,{look:o.pullLook});let h=0;for(let v=1;v<u.length;v++)h+=Math.hypot(u[v].x-u[v-1].x,u[v].z-u[v-1].z);sf(i,f,l,r,d),af(i,f,r,d),of(f,d),nf(i,f,l,r,d);const m=f.slice(1).map(v=>({x:v.x,z:v.z})),x=f.slice(1).map(v=>jr());let g=0,p=t.x,b=t.z;for(const v of m)g+=Math.hypot(v.x-p,v.z-b),p=v.x,b=v.z;return{ok:!0,pts:m,fixed:x,cells:s.cells,goal:e,length:g,tautLength:h,rawLength:s.length}}function jr(i,t){return!1}function yo(i){const t=new Array(i.length).fill(0);for(let e=1;e+1<i.length;e++){const n=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z),s=Math.hypot(i[e+1].x-i[e].x,i[e+1].z-i[e].z);n<1e-9||s<1e-9||(t[e]=Math.abs(bs(Math.atan2(i[e].x-i[e-1].x,i[e].z-i[e-1].z),Math.atan2(i[e+1].x-i[e].x,i[e+1].z-i[e].z))))}return t}const Vl=i=>{let t=0;for(let e=1;e<i.length;e++)t+=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z);return t};function Wl(i,t){let e=1/0;for(let n=0;n<t.length;n++){const s=n===0?0:Math.max(1,Math.ceil(Math.hypot(t[n].x-t[n-1].x,t[n].z-t[n-1].z)/.3));for(let r=n===0?0:1;r<=s;r++){const o=s?r/s:0,a=n===0?t[0].x:t[n-1].x+(t[n].x-t[n-1].x)*o,l=n===0?t[0].z:t[n-1].z+(t[n].z-t[n-1].z)*o,c=i.locate(a,l);if(!c||c.solid)return 0;e=Math.min(e,i.wallDist(a,l,c))}}return e}function nf(i,t,e,n,s){const r=je.route.smooth;if(t.length<3)return;const o=n+je.route.cornerMargin,a=(x,g)=>{const p=[];for(let b=1;b<g.length;b++){const M=Uu(g[b-1],g[b],x.x0,x.z0,x.x1,x.z1);M>=0&&!p.some(v=>Math.abs(v-M)*x.w<.05)&&p.push(M)}return p},l=je.route.cornerMargin*.8+n,c=t.map(x=>({x:x.x,z:x.z})),u=x=>{for(const g of e){const p=a(g,c),b=a(g,x);if(p.length!==b.length)return!1;if(!p.length)continue;const M=Math.min(...p.map(v=>Math.abs(v-.5)*g.w));for(const v of b){const T=Math.abs(v-.5)*g.w;if(M<=je.route.doorTol+.05){if(T<=je.route.doorTol+.05)continue;return!1}if(T<=M+.02)continue;const _=g.x0+(g.x1-g.x0)*v,S=g.z0+(g.z1-g.z0)*v,E=i.locate(_,S);if(!E||i.wallDist(_,S,E)<l)return!1}}return!0},d=(x,g,p)=>{const b=t[x-1],M=t[x+g];for(let H=x;H<x+g;H++)if(jr(t[H]))return!1;const v=t.slice(x-1,x+g+1),T=[b,...p,M];if(Vl(T)>Vl(v)+r.lenSlack)return!1;for(let H=1;H<T.length;H++)if(!s(T[H-1],T[H]))return!1;if(!u([...t.slice(0,x),...p,...t.slice(x+g)]))return!1;const _=Math.max(0,x-2),S=Math.min(t.length,x+g+2),E=yo(t.slice(_,S)),w=yo([...t.slice(_,x),...p,...t.slice(x+g,S)]);let y=0,R=0;for(let H=0;H<g;H++)y=Math.max(y,E[x-_+H]);for(let H=0;H<p.length;H++)R=Math.max(R,w[x-_+H]);const F=y-r.minGain;if(R>F)return!1;const B=x-1-_,Y=x+g-_,Z=x+p.length-_;return B>=0&&w[B]>Math.max(E[B],F)||w[Z]>Math.max(E[Y]??0,F)||Wl(i,T)<Math.min(o,Wl(i,v))-r.clearSlack?!1:(t.splice(x,g,...p),!0)},f=x=>{const g=t[x-1],p=t[x],b=t[x+1],M=Math.hypot(p.x-g.x,p.z-g.z),v=Math.hypot(b.x-p.x,b.z-p.z),T=(p.x-g.x)/M,_=(p.z-g.z)/M,S=(b.x-p.x)/v,E=(b.z-p.z)/v,w=Math.min(r.round,r.legShare*M,M-r.minLeg),y=Math.min(r.round,r.legShare*v,v-r.minLeg);let R=T-S,F=_-E;const B=Math.hypot(R,F)||1;R/=B,F/=B;for(const Y of[1,.7,.5]){const Z=w*Y,H=y*Y;if(!(Z<.15||H<.15))for(const V of r.outward){const k={x:p.x-T*Z+R*V,z:p.z-_*Z+F*V},tt={x:p.x+S*H+R*V,z:p.z+E*H+F*V};if(!(Math.hypot(tt.x-k.x,tt.z-k.z)<r.minLeg)&&d(x,1,[k,tt]))return!0}}return!1};let h=8*t.length+16,m=!1;for(let x=0;x<r.passes;x++){let g=!1;for(let p=1;p+1<t.length&&h>0;p++){h--;const b=t[p-1],M=t[p],v=t[p+1];if(jr())continue;const T=Math.hypot(M.x-b.x,M.z-b.z),_=Math.hypot(v.x-M.x,v.z-M.z);if(T<1e-9||_<1e-9)continue;const S=yo([b,M,v])[1];let E=!1;if(S>r.hookTurn&&Math.min(T,_)<r.arc){if(E=d(p,1,[]),!E&&_<r.arc&&p+2<t.length){const w=t[p+1];E=d(p,2,[])||d(p,2,[{x:(M.x+w.x)/2,z:(M.z+w.z)/2}])}if(!E&&T<r.arc&&p>=2){const w=t[p-1];E=d(p-1,2,[])||d(p-1,2,[{x:(M.x+w.x)/2,z:(M.z+w.z)/2}])}}!E&&S>r.maxTurn&&(E=f(p)),E&&(g=!0,p=Math.max(0,p-3))}if(!g||(m=!0,h<=0))break}if(m)for(let x=1;x+1<t.length;x++){const g=t[x-1],p=t[x],b=t[x+1],M=b.x-g.x,v=b.z-g.z,T=M*M+v*v;if(T<1e-12||jr())continue;const _=er(((p.x-g.x)*M+(p.z-g.z)*v)/T,0,1);Math.hypot(p.x-(g.x+_*M),p.z-(g.z+_*v))>je.route.tidyLine||!s(g,b)||u([...t.slice(0,x),...t.slice(x+1)])&&(t.splice(x,1),x--)}}function Uu(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=s-e,c=r-n,u=o*c-a*l;if(Math.abs(u)<1e-9)return-1;const d=((e-i.x)*c-(n-i.z)*l)/u,f=((e-i.x)*a-(n-i.z)*o)/u;return d>=0&&d<=1&&f>=0&&f<=1?f:-1}function sf(i,t,e,n,s){const r=je.route;for(const o of e)for(let a=0;a+1<t.length;a++){const l=t[a],c=t[a+1],u=Uu(l,c,o.x0,o.z0,o.x1,o.z1);if(u<0)continue;const d=(o.x0+o.x1)/2,f=(o.z0+o.z1)/2;if(Math.abs(u-.5)*o.w<r.doorTol||rf(i,l,c,o.x0+(o.x1-o.x0)*u,o.z0+(o.z1-o.z0)*u,n+r.cornerMargin,r.doorLead))break;let h=-(o.z1-o.z0),m=o.x1-o.x0;o.n&&(h=o.n[0],m=o.n[1]);const x=Math.hypot(h,m)||1;h/=x,m/=x,h*(c.x-l.x)+m*(c.z-l.z)<0&&(h=-h,m=-m);const g=n+r.cornerMargin,p=Math.min(.5,g/Math.max(o.w,1e-6)),b=Math.max(p,Math.min(1-p,u)),M=[{x:d,z:f}];Math.abs(b-u)<1e-9&&Math.abs(u-.5)*o.w>=r.doorTol?M.push({x:o.x0+(o.x1-o.x0)*u,z:o.z0+(o.z1-o.z0)*u}):Math.abs(b-.5)>1e-9&&M.push({x:o.x0+(o.x1-o.x0)*b,z:o.z0+(o.z1-o.z0)*b});const v=[];for(const T of M)for(const _ of[r.doorLead,r.doorLead*.5,0]){const S={x:T.x,z:T.z,pin:!0};v.push(_>0?[{x:T.x-h*_,z:T.z-m*_,pin:!0},S,{x:T.x+h*_,z:T.z+m*_,pin:!0}]:[S])}for(const T of v){let _=!0,S=l,E=-Math.hypot(c.x-l.x,c.z-l.z),w=null;for(const y of[...T,c]){if(!s(S,y)){_=!1;break}E+=Math.hypot(y.x-S.x,y.z-S.z);const R=Math.atan2(y.x-S.x,y.z-S.z);if(T.length>1&&w!==null&&Math.abs(bs(w,R))>r.doorTurn){_=!1;break}w=R,S=y}if(_&&E<=r.doorBudget){t.splice(a+1,0,...T);break}}break}}function rf(i,t,e,n,s,r,o){const a=e.x-t.x,l=e.z-t.z,c=Math.hypot(a,l);if(c<1e-6)return!0;const u=a/c,d=l/c,f=(n-t.x)*u+(s-t.z)*d;for(let h=Math.max(0,f-o);h<=Math.min(c,f+o)+1e-9;h+=.25){const m=t.x+u*h,x=t.z+d*h,g=i.locate(m,x);if(g&&i.wallDist(m,x,g)<r)return!1}return!0}function of(i,t){const e=je.route;let n=!0;for(let s=0;n&&s<4;s++){n=!1;for(let r=1;r+1<i.length;r++){const o=i[r-1],a=i[r],l=i[r+1],c=l.x-o.x,u=l.z-o.z,d=c*c+u*u,f=Math.hypot(a.x-o.x,a.z-o.z),h=Math.hypot(l.x-a.x,l.z-a.z);let m=!1;if(d<1e-12)m=!0;else{const x=er(((a.x-o.x)*c+(a.z-o.z)*u)/d,0,1);(Math.hypot(a.x-(o.x+x*c),a.z-(o.z+x*u))<=e.tidyLine||Math.min(f,h)<e.tidyShort&&Math.abs(bs(Math.atan2(a.x-o.x,a.z-o.z),Math.atan2(l.x-a.x,l.z-a.z)))>e.tidySpike)&&(m=!0)}m&&(d<1e-12||t(o,l))&&(i.splice(r,1),r--,n=!0)}}}function af(i,t,e,n){const s=je.route,r=e+s.cornerMargin,o=Math.cos(s.cornerTurn);for(let a=1;a+1<t.length;a++){const l=t[a-1],c=t[a],u=t[a+1];if(c.pin)continue;const d=Math.hypot(c.x-l.x,c.z-l.z),f=Math.hypot(u.x-c.x,u.z-c.z);if(d<1e-6||f<1e-6)continue;const h=(c.x-l.x)/d,m=(c.z-l.z)/d,x=(u.x-c.x)/f,g=(u.z-c.z)/f;if(h*x+m*g>o)continue;const p=i.locate(c.x,c.z);if(!p)continue;const b=i.wallDist(c.x,c.z,p);if(b>=r)continue;let M=h-x,v=m-g;const T=Math.hypot(M,v),_=[];T>1e-6&&_.push([M/T,v/T]);for(let y=0;y<s.cornerRing;y++){const R=y/s.cornerRing*Math.PI*2;_.push([Math.cos(R),Math.sin(R)])}const S=d+f;let E=null,w=b;for(let y=s.cornerStep;y<=s.cornerPush+1e-9&&!(E&&w>=r);y+=s.cornerStep){let R=null,F=1/0,B=0;for(const[Y,Z]of _){const H={x:c.x+Y*y,z:c.z+Z*y},V=i.locate(H.x,H.z,p.id);if(!V||V.solid||i.blocked(V,H.x,H.z))continue;const k=i.wallDist(H.x,H.z,V);if(k<=w+1e-6)continue;const tt=Math.hypot(H.x-l.x,H.z-l.z)+Math.hypot(u.x-H.x,u.z-H.z)-S,ut=k>=r;R&&(R.meets&&!ut||R.meets===ut&&(ut?tt>=F:k<=B))||!n(l,H)||!n(H,u)||(R={q:H,meets:ut},F=tt,B=k)}R&&(E=R.q,w=B)}E&&(t[a]=E)}}function ci(i,t=null){const e={pts:i.pts,i:0,goal:i.goal,bestRem:1/0,stuck:0,age:0,blend:null,p0:t?{x:t.x,z:t.z}:null};return t&&t.speed>.5&&(e.blend={vx:t.vx,vz:t.vz}),e}function no(i,t,e,n,{arrive:s=!0,cap:r=1/0,chase:o=null}={}){const{reach:a,arriveTol:l,cornerFloor:c,cornerLook:u,stuckTime:d,stuckGain:f}=je.route,h=t.pts;for(t.age+=n;t.i<h.length;){const y=h[t.i],R=Math.hypot(y.x-i.x,y.z-i.z),F=t.i===h.length-1;if(R<=(F?l:a)){t.i++;continue}if(!F&&R<=je.route.passRadius){const B=t.i>0?h[t.i-1]:t.p0;if(B){const Y=y.x-B.x,Z=y.z-B.z,H=Y*Y+Z*Z;if(H>1e-9&&((i.x-B.x)*Y+(i.z-B.z)*Z)/H>=1){t.i++;continue}}}break}if(t.i>=h.length)return{vx:0,vz:0,done:!0,stuck:!1};const m=h[t.i],x=m.x-i.x,g=m.z-i.z,p=Math.hypot(x,g)||1e-9;let b=p;for(let y=t.i;y+1<h.length;y++)b+=Math.hypot(h[y+1].x-h[y].x,h[y+1].z-h[y].z);const M=i.decel;let v=Math.min(e,r);if(s&&(v=Math.min(v,Math.sqrt(2*M*.8*Math.max(0,b-l*.4))+.6)),o&&(v=Math.min(v,o.base+o.gain*b)),t.i<h.length-1&&p<u+i.speed*.15){const y=h[t.i+1],R=y.x-m.x,F=y.z-m.z,B=Math.hypot(R,F)||1,Y=x/p*(R/B)+g/p*(F/B),Z=e*er(c+(1-c)*Math.max(0,Y),c,1);v=Math.min(v,Math.sqrt(Z*Z+2*M*.8*p))}b<t.bestRem-f?(t.bestRem=b,t.stuck=0):v>1&&(t.stuck+=n);const T=t.stuck>d;let _=x/p,S=g/p;if(t.i<h.length-1&&!(o!=null&&o.noLook)){const y=je.route,R=er(y.look+y.lookSpeed*i.speed,y.look,y.lookMax);if(p<R){let F=R-p,B=m.x,Y=m.z;for(let H=t.i;H+1<h.length&&F>0;H++){const V=h[H+1],k=Math.hypot(V.x-h[H].x,V.z-h[H].z),tt=k>1e-9?Math.min(1,F/k):1;B=h[H].x+(V.x-h[H].x)*tt,Y=h[H].z+(V.z-h[H].z)*tt,F-=k}const Z=i.world;for(const H of[1,.6,.3,0]){const V=m.x+(B-m.x)*H,k=m.z+(Y-m.z)*H;if(H>0&&Z&&!Z.walkClear(i.x,i.z,V,k,i.radius,i.cell))continue;const tt=Math.hypot(V-i.x,k-i.z);tt>1e-6&&(_=(V-i.x)/tt,S=(k-i.z)/tt);break}}}let E=_*v,w=S*v;if(t.blend&&t.age<je.route.blendTime){const y=t.age/je.route.blendTime,R=y*y*(3-2*y);E=t.blend.vx+(E-t.blend.vx)*R,w=t.blend.vz+(w-t.blend.vz)*R}return{vx:E,vz:w,done:!1,stuck:T}}const Be=vn,be={vx:0,vz:0},ar=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z),wn=i=>({x:i.x,z:i.z});class lf{constructor(t,e,n){this.G=t,this.body=e,this.mode="follow",this.order={type:"follow"},this.react=null,this.saved=null,this.patrol=null,this.side=t.rng()<.5?-1:1,this.lead={x:0,z:1},this.chasing=!1,this.slot=null,this.slotTimer=0,this.farTime=0,this.search=null,this.viaCentre=!1,this.stuckLog=[],this.goalCap=1/0,this.arrivedEmitted=!1}command(t){const e=this.G;if(!t||typeof t!="object")return this._reject(t,"bad-order");if(this.body.controlled)return this._reject(t,"controlled");const n=this._apply(t);return n.ok?(this.react=null,this.saved=null,e.emit("order-accepted","companion",{order:this._summary(t)}),{ok:!0}):this._reject(t,n.reason,n)}_summary(t){const e={type:t.type};return t.point&&(e.point=wn(t.point)),t.waypoints&&(e.waypoints=t.waypoints.length),e}_reject(t,e,n={}){return this.G.emit("order-rejected","companion",{order:t&&t.type?this._summary(t):null,reason:e,...n.index!==void 0?{index:n.index}:{}}),{ok:!1,reason:e}}_apply(t){const{world:e}=this.G,n=this.body;switch(t.type){case"follow":return this._set("follow",{type:"follow"}),{ok:!0};case"hold":return this._set("hold",{type:"hold"}),{ok:!0};case"goto":{if(!ar(t.point))return{ok:!1,reason:"bad-point"};const s=Rn(e,n,t.point,n.radius);return s.ok?(this._set("goto",{type:"goto",point:wn(s.goal)}),n._route=ci(s,n),this.arrivedEmitted=!1,{ok:!0}):{ok:!1,reason:s.reason}}case"patrol":{const s=t.waypoints;if(!Array.isArray(s)||!s.length||s.length>Be.patrol.maxWaypoints)return{ok:!1,reason:"bad-waypoints"};const r=[];for(let a=0;a<s.length;a++){if(!ar(s[a]))return{ok:!1,reason:"bad-waypoint",index:a};const l=e.locate(s[a].x,s[a].z);if(!l)return{ok:!1,reason:"outside",index:a};if(l.solid)return{ok:!1,reason:"solid",index:a};const c=e.settle(s[a].x,s[a].z,n.radius);if(!c)return{ok:!1,reason:"cramped",index:a};r.push({x:c.x,z:c.z})}const o=Rn(e,n,r[0],n.radius);return o.ok?(this._set("patrol",{type:"patrol",waypoints:r.map(wn),loop:t.loop!==!1}),this.patrol={pts:r,loop:t.loop!==!1,dwell:Number.isFinite(t.dwell)?t.dwell:Be.patrol.dwell,idx:0,dir:1,wait:0,fails:0},n._route=ci(o,n),{ok:!0}):{ok:!1,reason:o.reason,index:0}}default:return{ok:!1,reason:"unknown-order"}}}_set(t,e){this.mode=t,this.order=e,this.body._route=null,this.slot=null,this.slotIdeal=null,this.slotTimer=0,this.chasing=!1,t!=="patrol"&&(this.patrol=null)}reactTo(t,e){const n=this.G,s=this.body;if(s.controlled)return!1;const r=()=>{this.mode!=="react"&&(this.saved={mode:this.mode,order:this.order,patrol:this.patrol?{...this.patrol}:null})};switch(t.type){case"goto":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;if(!ar(o))return!1;const a=Rn(n.world,s,o,s.radius);return a.ok?(r(),this.mode="react",this.react={kind:"goto",point:wn(a.goal),giveUp:n.t+Be.react.giveUp,dwell:Number.isFinite(t.dwell)?t.dwell:Be.react.dwell,arrivedAt:null},s._route=ci(a,s),!0):(n.emit("order-rejected","companion",{order:{type:"goto",point:wn(o)},reason:a.reason,source:"trigger"}),!1)}case"face":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;return ar(o)?(r(),this.mode="react",s._route=null,this.react={kind:"face",until:n.t+Be.react.face,heading:Math.atan2(o.x-s.x,o.z-s.z)},!0):!1}case"hold":case"follow":case"patrol":{if(t.for>0){r();const a=this.saved;return this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type}).ok?(this.saved=a,this.react={kind:"mode",until:n.t+t.for},this.mode="react",this.reactInner=t.type,!0):(this.saved=null,this.mode==="react"&&(this.mode=a.mode),!1)}const o=this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type});return o.ok?(this.react=null,this.saved=null,!0):(n.emit("order-rejected","companion",{order:{type:t.type},reason:o.reason,source:"trigger"}),!1)}default:return!1}}_restore(){const t=this.saved;if(this.react=null,this.saved=null,this.reactInner=null,this.body._route=null,!t){this.mode="follow",this.order={type:"follow"};return}this.mode=t.mode,this.order=t.order,this.patrol=t.patrol,this.slot=null,this.slotTimer=0,this.G.emit("order-accepted","companion",{order:{type:t.order.type},source:"react-end"})}setControlled(t){const e=this.body;e.controlled=t,e._route=null,this.react=null,this.saved=null,this.patrol=null,t?(this.mode="direct",this.order={type:"direct"}):(this.mode="hold",this.order={type:"hold"}),this.chasing=!1,this.slot=null,this.slotTimer=0}think(t){if(this.body.controlled)return be;switch(this.mode){case"hold":return this._hold(t);case"goto":return this._goto(t);case"patrol":return this._patrol(t);case"react":return this._react(t);default:return this._follow(t)}}_hold(){this.body._route=null;const t=this.G.bodies.avatar;return Math.hypot(t.x-this.body.x,t.z-this.body.z)<9&&(this.body._face=Math.atan2(t.x-this.body.x,t.z-this.body.z)),be}_drive(t,e){const n=this.body,s=no(n,n._route,n.spec.speed,t,e);return s.done?(n._route=null,{vx:0,vz:0,done:!0}):s.stuck?(this._stuck(),{vx:0,vz:0,stuck:!0}):s}_goto(t){const e=this.body;if(!e._route){const s=Rn(this.G.world,e,this.order.point,e.radius);if(!s.ok)return this.G.emit("order-rejected","companion",{order:{type:"goto"},reason:s.reason,source:"replan"}),this._set("hold",{type:"hold"}),be;e._route=ci(s,e)}const n=this._drive(t);return n.done?(this.G.emit("companion-arrived","companion",{mode:"goto",point:wn(this.order.point)}),this.mode="hold",this.order={type:"hold",arrivedAt:wn(this.order.point)},be):n}_patrol(t){const e=this.patrol,n=this.body,s=this.G;if(!e)return this._set("hold",{type:"hold"}),be;if(e.wait>0)return e.wait-=t,be;if(!n._route){const o=Rn(s.world,n,e.pts[e.idx],n.radius);if(!o.ok)return++e.fails>=e.pts.length?(s.emit("order-rejected","companion",{order:{type:"patrol"},reason:"patrol-unreachable",source:"replan"}),this._set("hold",{type:"hold"}),be):(this._advance(),be);e.fails=0,n._route=ci(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"patrol",index:e.idx,point:wn(e.pts[e.idx])}),e.wait=e.dwell,this._advance(),be):r}_advance(){const t=this.patrol,e=t.pts.length;e!==1&&(t.loop?t.idx=(t.idx+1)%e:(t.idx+=t.dir,t.idx>=e?(t.dir=-1,t.idx=e-2):t.idx<0&&(t.dir=1,t.idx=1)))}_react(t){const e=this.react,n=this.body,s=this.G;if(!e)return this._restore(),be;if(e.kind==="face")return n._face=e.heading,s.t>=e.until&&this._restore(),be;if(e.kind==="mode"){if(s.t>=e.until)return this._restore(),be;this.mode=this.reactInner;const o=this.think(t);return this.mode!==this.reactInner&&(this.reactInner="hold"),this.mode="react",o}if(e.arrivedAt!==null)return s.t-e.arrivedAt>=e.dwell&&this._restore(),be;if(s.t>e.giveUp)return this._restore(),be;if(!n._route){const o=Rn(s.world,n,e.point,n.radius);if(!o.ok)return this._restore(),be;n._route=ci(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"react",point:wn(e.point)}),e.arrivedAt=s.t,be):r}_follow(t){const e=this.G,n=this.body,s=Be.follow,r=e.world,o=e.bodies.avatar,a=o.x-n.x,l=o.z-n.z,c=Math.hypot(a,l);if(o.speed>.8){const m=Math.min(1,6*t),x=this.lead.x+(o.vx/o.speed-this.lead.x)*m,g=this.lead.z+(o.vz/o.speed-this.lead.z)*m,p=Math.hypot(x,g)||1;this.lead={x:x/p,z:g/p}}this.farTime=c>s.blinkDistance?this.farTime+t:0,this.search&&this._stepSearch(o);const u=r.cell(n.cell),d=c>1.6&&r.inDoorway(n.x,n.z,u,s.doorClear*.7);if(!this.chasing&&(c>s.start||d)&&(this.chasing=!0,this.slotTimer=0),this.slotTimer-=t,this.chasing&&this.slotTimer<=0&&!this.search&&(!n._route||this._stale(o,c))){this.slotTimer=s.reslot;const m=this._chooseSlot(o,c);m?this._adopt(m):this._beginSearch(o)}if(!this.chasing)return n._route=null,n._face=Math.atan2(a,l),be;if(!n._route)return be;const f=c>s.catchup,h=no(n,n._route,f?n.spec.catchupSpeed:n.spec.speed,t,{arrive:!1,chase:{base:Math.min(o.speed*1.05,n.spec.speed)+.5,gain:3}});return h.done?(n._route=null,c<s.stop&&o.speed<.5&&(this.chasing=!1,e.emit("companion-arrived","companion",{mode:"follow",point:wn(this.slot??n)})),be):h.stuck?(this._stuck(),be):h}_predict(t){const e=Be.follow,n=this.G.world;if(t.speed<.8)return{x:t.x,z:t.z};const s=t.x+t.vx*e.lead,r=t.z+t.vz*e.lead;return n.walkClear(t.x,t.z,s,r,this.body.radius,t.cell)?{x:s,z:r}:{x:t.x,z:t.z}}_ideal(t){const e=Be.follow,n=this.lead.x,s=this.lead.z;return{x:t.x-n*e.distance+-s*e.lateral*this.side,z:t.z-s*e.distance+n*e.lateral*this.side}}_stale(t,e=0){const n=Be.follow,s=this.body._route;if(!s||!this.slotIdeal)return!0;const r=this._ideal(this._predict(t));return Math.hypot(r.x-this.slotIdeal.x,r.z-this.slotIdeal.z)>n.replanDist*Math.max(1,e/n.farScale)?!0:s.age>n.reslotMax&&t.speed>.5}_chooseSlot(t,e){const n=this.G,s=this.body,r=Be.follow,o=n.world,a=this.lead.x,l=this.lead.z,c=-l,u=a,d=this._predict(t);this.slotIdeal=this._ideal(d);const f=[],h=(v,T,_)=>f.push({x:d.x+v,z:d.z+T,tag:_}),m=-a*r.distance,x=-l*r.distance;h(m+c*r.lateral*this.side,x+u*r.lateral*this.side),h(m-c*r.lateral*this.side,x-u*r.lateral*this.side,"mirror"),h(m,x);const g=f[0],p=[];for(const v of[1.1,2.2,3.4])for(let T=0;T<8;T++){const _=T/8*Math.PI*2;p.push({x:g.x+Math.cos(_)*v,z:g.z+Math.sin(_)*v,tag:"ring"})}p.sort((v,T)=>Math.hypot(v.x-g.x,v.z-g.z)-Math.hypot(T.x-g.x,T.z-g.z)),f.push(...p);let b=0;for(const v of f){const T=o.locate(v.x,v.z);if(!T||T.solid||o.wallDist(v.x,v.z,T)<s.radius+r.wallClear||o.inDoorway(v.x,v.z,T,r.doorClear))continue;const _=Math.hypot(v.x-t.x,v.z-t.z);if(_<t.radius+s.radius+.8||_>r.start-.8)continue;if(++b>3)break;const S=Rn(o,s,v,s.radius,{maxExpand:r.slotBudget});if(S.ok&&Math.hypot(S.goal.x-v.x,S.goal.z-v.z)<1.5)return v.tag==="mirror"&&(this.side=-this.side),S}const M=Rn(o,s,{x:t.x,z:t.z},s.radius,{maxExpand:r.slotBudget*5});return M.ok?this._stopShort(M,t,r.distance*.8):null}_adopt(t){const e=this.body,n=this.G,s=n.world;if(this.viaCentre){this.viaCentre=!1;const r=s.cell(e.cell),o=r&&s.settle(r.cx,r.cz,e.radius);o&&s.walkClear(e.x,e.z,o.x,o.z,e.radius,r.id)&&(t={...t,pts:[{x:o.x,z:o.z},...t.pts]})}this.slot=t.goal,e._route=ci(t,e),n.stats.replans++}_beginSearch(t){const e=this.G,n=this.body,s=Be.follow,r=this._predict(t);this.slotIdeal=this._ideal(r);let o=ua(e.world,n,r,n.radius);if(o.ok||(o=ua(e.world,n,{x:t.x,z:t.z},n.radius)),!o.ok){this.slotTimer=s.retry;return}this.search={sp:o,leader:{x:t.x,z:t.z}}}_stepSearch(t){this.G;const e=Be.follow;this.body;const n=this.search,s=n.sp.search;let r=s.step(e.searchStep);if(r==="running"&&s.expanded>e.searchMax&&(r="fail"),r==="running")return;this.search=null;let o=null;if(r==="done")o=n.sp.finish();else{const a=s.partial();a&&a.cells.length>1&&(o=n.sp.finish(a)),this.slotTimer=Math.max(this.slotTimer,e.retry)}o&&o.ok&&this._adopt(Math.hypot(o.goal.x-t.x,o.goal.z-t.z)<1.5?this._stopShort(o,t,e.distance*.8):o)}_stopShort(t,e,n){const s=t.pts;let r=this.body.x,o=this.body.z;for(let a=0;a<s.length;a++){const l=s[a];if(Math.hypot(l.x-e.x,l.z-e.z)<n){let c=0,u=1;for(let h=0;h<14;h++){const m=(c+u)/2;Math.hypot(r+(l.x-r)*m-e.x,o+(l.z-o)*m-e.z)<n?u=m:c=m}const d={x:r+(l.x-r)*c,z:o+(l.z-o)*c},f=s.slice(0,a);return f.push(d),{...t,pts:f,goal:{...t.goal,x:d.x,z:d.z}}}r=l.x,o=l.z}return t}_stuck(){const t=this.G,e=this.body,n=this.stuckLog;for(n.push(t.t);n.length&&t.t-n[0]>Be.recovery.window;)n.shift();const s=n.length;if(e._route=null,this.slotTimer=0,s===1){t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z});return}if(s===2){const r=t.world.cell(e.cell);t.world.settle(r.cx,r.cz,e.radius)&&(this.viaCentre=!0),t.emit("companion-stuck-recovered","companion",{method:"detour",x:e.x,z:e.z});return}n.length=0,this.mode==="follow"?t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z}):(t.emit("companion-stuck-recovered","companion",{method:"skip",x:e.x,z:e.z}),this.mode==="patrol"?this._advance():this.mode==="goto"?this._set("hold",{type:"hold"}):this.mode==="react"&&this._restore())}_blink(t){const e=this.G,n=this.body,s=e.bodies.avatar,r=e.world.settle(s.x-this.lead.x*Be.follow.distance,s.z-this.lead.z*Be.follow.distance,n.radius,Be.follow.wallClear)??e.world.settle(s.x,s.z,n.radius);r&&(n.teleport(r),this.farTime=0,this.chasing=!1,e.stats.blinks++,e.emit("companion-stuck-recovered","companion",{method:"resync",why:t,x:n.x,z:n.z}))}}const lr=vn.triggers,cf=new Set(["enter-cell","avatar-distance","noise","sighted","interval","avatar-stopped"]),uf=new Set(["goto","hold","follow","patrol","face","emit"]),Xl=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z);function hf(i){if(!i||typeof i!="object")return"not-an-object";const t=i.when,e=i.do;return!t||!cf.has(t.type)?"bad-when":!e||!uf.has(e.type)?"bad-do":t.type==="enter-cell"&&!(Array.isArray(t.cells)&&t.cells.length)&&t.sector===void 0?"enter-cell-needs-cells-or-sector":t.type==="avatar-distance"&&!(Number.isFinite(t.lt)||Number.isFinite(t.gt))?"avatar-distance-needs-lt-or-gt":t.type==="noise"&&!(t.radius>0)?"noise-needs-radius":t.type==="interval"&&!(t.every>0)?"interval-needs-every":t.type==="avatar-stopped"&&!(t.for>0)?"avatar-stopped-needs-for":(e.type==="goto"||e.type==="face")&&!Xl(e.point)&&e.point!=="source"?"action-needs-point":e.type==="patrol"&&!(Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(Xl))?"patrol-needs-waypoints":e.type==="emit"&&(typeof e.event!="string"||!e.event)?"emit-needs-event":e.point==="source"&&t.type!=="noise"&&t.type!=="sighted"?"source-needs-noise-or-sighted":null}class ff{constructor(){this.rules=[],this.state=new Map,this.signals=[],this.auto=0}set(t,e){const n=[],s=[],r=[],o=new Map;for(const a of Array.isArray(t)?t:[]){const l=(a==null?void 0:a.id)??`rule-${++this.auto}`,c=r.length>=lr.maxRules?"too-many-rules":hf(a);if(c){s.push({id:l,reason:c});continue}const u={id:l,when:a.when,do:a.do,repeat:a.repeat?a.repeat===!0?lr.repeat:Number(a.repeat):0,once:!!a.once,enabled:a.enabled!==!1},d=JSON.stringify(u.when),f=this.state.get(l);o.set(l,f&&f.key===d?f:{key:d,fired:0,last:-1/0,was:null,latched:!1,nextAt:e+(u.when.every??0),done:!1,stopped:0}),r.push(u),n.push(l)}return this.rules=r,this.state=o,{accepted:n,rejected:s}}signal(t){this.signals.length<lr.maxSignals&&this.signals.push(t)}describe(){return this.rules.map(t=>{const e=this.state.get(t.id);return{id:t.id,type:t.when.type,enabled:t.enabled,fired:e.fired,last:Number.isFinite(e.last)?e.last:null,active:!!e.was||e.latched}})}tick(t){const e=[],{t:n,dt:s}=t,r=Math.hypot(t.avatar.x-t.companion.x,t.avatar.z-t.companion.z),o=t.avatar.speed<.1,a=this.signals;this.signals=[];for(const l of this.rules){if(e.length>=lr.maxFiresPerTick)break;const c=this.state.get(l.id),u=l.when;let d=!1,f=null,h=null;switch(u.type){case"enter-cell":{const m=t.cellChange;if(m){const x=g=>u.cells?u.cells.includes(g.id):u.sector!==void 0&&t.sectorOf(g)===u.sector;d=!x(m.from)&&x(m.to)}break}case"avatar-distance":h=Number.isFinite(u.lt)?r<u.lt:r>u.gt;break;case"avatar-stopped":c.stopped=o?c.stopped+s:0,h=c.stopped>=u.for;break;case"interval":n>=c.nextAt&&(d=!0,c.nextAt=n+u.every);break;case"noise":for(const m of a){if(m.type!=="noise")continue;if(Math.hypot(m.x-t.companion.x,m.z-t.companion.z)<=Math.min(u.radius,m.radius??1/0)){d=!0,f=m;break}}break;case"sighted":for(const m of a)if(m.type==="sighted"&&(u.target===void 0||u.target===m.target)){d=!0,f=m;break}break}if(h!==null)if(c.was===null)c.was=h;else{const m=h&&!c.was,x=l.repeat>0&&h&&c.was&&n-c.last>=l.repeat;d=m||x,c.was=h}!l.enabled||c.done||d&&(c.fired++,c.last=n,l.once&&(c.done=!0),e.push({rule:l,signal:f}))}return e}}const Ie=vn,ze=i=>Math.round(i*1e3)/1e3;function df(i,{spawnCell:t,seed:e=1,tuning:n={}}={}){const s=Zh(i),r=Bh(e),o={ticks:0,substeps:0,contacts:0,violations:0,blinks:0,replans:0},a=[];let l=0,c=0,u=0;const d={world:s,rng:r,stats:o,bodies:null,get t(){return l},emit(L,W,it){a.push({t:ze(l),type:L,actor:W,...it}),a.length>Ie.events.max&&a.shift()}},f=L=>L==null?null:typeof L=="object"?L:s.cell(L);let h=f(t)??f(i.startCell);if((!h||h.solid)&&(h=(h==null?void 0:h.neighbors.map(L=>s.cell(L.id)).find(L=>!L.solid))??null),!h)throw new Error("createActors: no open spawn cell");const m={...Ie.avatar,...n.avatar},x={...Ie.companion,...n.companion},g=s.settle(h.cx,h.cz,m.radius,.2);if(!g)throw new Error("createActors: spawn cell has no room");const p=new Bl("avatar",m,g);let b=null;for(const[L,W]of[[-1.7,1.2],[1.7,1.2],[-1.7,-1.2],[1.7,-1.2],[0,2.6],[0,-2.6],[3.2,0],[-3.2,0]]){const it=s.settle(g.x+L,g.z+W,x.radius,.1);if(it&&Math.hypot(it.x-g.x,it.z-g.z)>=m.radius+x.radius+.4){b=it;break}}if(!b)throw new Error("createActors: no room for the companion");const M=new Bl("companion",x,b);p.world=M.world=s,d.bodies={avatar:p,companion:M},p.controlled=!0,p.mode="direct",M.mode="follow";const v=new lf(d,M,e),T=new ff,_=L=>d.bodies[L];let S={ax:0,az:0,run:!1,aim:null,stop:!1};const E={avatar:null,companion:null};let w=p.cell,y=B(s.cell(p.cell)),R=0;const F=Math.atan2(M.x-p.x,M.z-p.z);p.heading=p.pheading=F,M.heading=M.pheading=F+Math.PI;function B(L){var W,it;return L.sector??((it=(W=i.sectorAt)==null?void 0:W.call(i,L.cx,L.cz))==null?void 0:it.id)}const Y=()=>p.controlled?p:M;function Z(L,W,it,{quiet:nt=!1}={}){const K=Et=>(nt||d.emit("order-rejected",L.id,{order:{type:"moveTo",point:{x:W,z:it}},reason:Et}),{ok:!1,reason:Et});if(!Number.isFinite(W)||!Number.isFinite(it))return K("bad-point");const U=Rn(s,L,{x:W,z:it},L.radius);return U.ok?(L._route=ci(U,L),L._replans=0,nt||d.emit("order-accepted",L.id,{order:{type:"moveTo",point:{x:ze(U.goal.x),z:ze(U.goal.z)}}}),{ok:!0,target:{x:U.goal.x,z:U.goal.z},length:U.length}):K(U.reason)}function H(L,W){if(p.controlled&&(S.ax||S.az)){const it=Rn(s,p,{x:L,z:W},p.radius);return it.ok?(E.avatar={x:L,z:W},d.emit("order-accepted","avatar",{order:{type:"moveTo",point:{x:L,z:W}},deferred:!0}),{ok:!0,deferred:!0}):(d.emit("order-rejected","avatar",{order:{type:"moveTo",point:{x:L,z:W}},reason:it.reason}),{ok:!1,reason:it.reason})}return Z(p,L,W)}function V(L){const W=v.command(L);return M.mode=v.mode,W}function k(L){if(L!=="avatar"&&L!=="companion")return{ok:!1,reason:"unknown-actor"};if(_(L).controlled)return{ok:!0,unchanged:!0};const it=Y();return it._route=null,E.avatar=E.companion=null,it===p?(p.controlled=!1,p.mode="hold",v.setControlled(!0)):(v.setControlled(!1),p.controlled=!0,p.mode="direct"),M.mode=v.mode,d.emit("control-changed",L,{from:it.id}),{ok:!0}}function tt(L){const W=T.set(L,l);for(const it of W.rejected)d.emit("order-rejected","companion",{rule:it.id,reason:it.reason});return W}function ut(L,W){const it=L.spec,nt=S.ax!==0||S.az!==0,K=S.run?it.runSpeed??it.catchupSpeed??it.speed:it.speed;if(nt)return L._route=null,{vx:S.ax*K,vz:S.az*K};const U=E[L.id];if(U&&(E[L.id]=null,Z(L,U.x,U.z,{quiet:!0})),S.stop)return L._route=null,{vx:0,vz:0};if(!L._route)return{vx:0,vz:0};const Et=no(L,L._route,K,W);if(Et.done){const dt=L._route.goal;return L._route=null,d.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:ze(dt.x),z:ze(dt.z)}}),{vx:0,vz:0}}if(Et.stuck){const dt=L._route.goal;return L._replans=(L._replans??0)+1,L._replans<=1?Z(L,dt.x,dt.z,{quiet:!0}):(L._route=null,d.emit("avatar-blocked",L.id,{x:ze(L.x),z:ze(L.z),reason:"stuck"})),{vx:0,vz:0}}return Et}function rt(L,W,it){const nt=L.x-W.x,K=L.z-W.z,U=Math.hypot(nt,K),Et=L.radius+W.radius+Ie.separation.gap;if(U>=Et)return;const dt=U>1e-6?nt/U:1,St=U>1e-6?K/U:0,yt=Ie.separation.push*(1-U/Et);it.vx+=dt*yt,it.vz+=St*yt}function At(L,W){let it=null,nt=0;L.controlled&&S.aim?it=Math.atan2(S.aim.x-L.x,S.aim.z-L.z):L.speed>Ie.facing.minSpeed?(it=Math.hypot(L._want.x,L._want.z)>.5?Math.atan2(L._want.x,L._want.z):Math.atan2(L.vx,L.vz),nt=Ie.facing.tau):L._face!=null&&(it=L._face),L._face=null,it!==null&&Number.isFinite(it)&&L.face(W,it,nt)}function Ct(L){l+=L,o.ticks++,u++;for(const dt of[p,M])dt.px=dt.x,dt.pz=dt.z,dt.pheading=dt.heading;S.run&&Y().speed>1?(R+=L,R>=Ie.noise.runEvery&&(R=0,T.signal({type:"noise",x:Y().x,z:Y().z,radius:Ie.noise.run,source:Y().id}))):R=0;const W=s.live(p.cell),it=s.live(M.cell);let nt={vx:0,vz:0};W&&(nt=p.controlled?ut(p,L):p._route?lt(p,L):nt,!p.controlled&&it&&rt(p,M,nt)),p.step(s,o,L,nt.vx,nt.vz),At(p,L);let K;it?M.controlled?K=ut(M,L):!W&&v.mode==="follow"?K={vx:0,vz:0}:(K=v.think(L),K={vx:K.vx,vz:K.vz},W&&rt(M,p,K)):K={vx:0,vz:0},M.step(s,o,L,K.vx,K.vz),At(M,L),M.mode=v.mode;let U=null;if(p.cell!==w){const dt=s.cell(w),St=s.cell(p.cell);d.emit("avatar-entered-cell","avatar",{cell:p.cell,from:w});const yt=St?B(St):void 0;yt!==void 0&&yt!==y&&(d.emit("avatar-entered-sector","avatar",{sector:yt,from:y}),y=yt),U={from:dt,to:St},w=p.cell}for(const dt of[p,M])dt._blocked>.3&&!dt._blockedFired&&dt.controlled&&(dt._blockedFired=!0,d.emit("avatar-blocked",dt.id,{x:ze(dt.x),z:ze(dt.z)}));const Et=T.tick({t:l,dt:L,avatar:p,companion:M,cellChange:U,sectorOf:B});for(const dt of Et){const St=dt.rule.do,yt=M.controlled&&St.type!=="emit";d.emit("trigger-fired","companion",{rule:dt.rule.id,when:dt.rule.when.type,...dt.signal?{at:{x:ze(dt.signal.x),z:ze(dt.signal.z)}}:{},...yt?{ignored:"controlled"}:{}}),St.type==="emit"?d.emit(String(St.event),"companion",{rule:dt.rule.id}):yt||v.reactTo(St,dt.signal)}M.mode=v.mode}function lt(L,W){const it=no(L,L._route,L.spec.speed,W);if(it.done){const nt=L._route.goal;return L._route=null,d.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:ze(nt.x),z:ze(nt.z)}}),{vx:0,vz:0}}return it.stuck?(L._route=null,d.emit("avatar-blocked",L.id,{x:ze(L.x),z:ze(L.z),reason:"stuck"}),{vx:0,vz:0}):it}function wt(L,W={}){var Et,dt;if(!(L>0))return;L=Math.min(L,Ie.maxFrame);let it=Number((Et=W.axis)==null?void 0:Et.x)||0,nt=Number((dt=W.axis)==null?void 0:dt.z)||0;const K=Math.hypot(it,nt);if(K<.05?it=nt=0:K>1&&(it/=K,nt/=K),S={ax:it,az:nt,run:!!W.run,aim:W.aim&&Number.isFinite(W.aim.x)&&Number.isFinite(W.aim.z)?W.aim:null,stop:!!W.stop},W.moveTo){const St=Y();St===p?H(W.moveTo.x,W.moveTo.z):it||nt?E[St.id]={x:W.moveTo.x,z:W.moveTo.z}:Z(St,W.moveTo.x,W.moveTo.z)}c+=L;let U=Math.floor(c/Ie.tick+1e-9);for(c-=U*Ie.tick,c<0&&(c=0);U-- >0;)Ct(Ie.tick)}function zt(L,W=c/Ie.tick){const it=_(L);if(!it)return null;const nt=Math.min(1,Math.max(0,W)),K=bs(it.pheading,it.heading);return{x:it.px+(it.x-it.px)*nt,z:it.pz+(it.z-it.pz)*nt,heading:it.pheading+K*nt,vx:it.vx,vz:it.vz,speed:it.speed,moving:it.moving}}function xt(L){const W=L.pub();return W.mode=L.mode,W.moving=L.moving,W.render=zt(L.id),W}return{avatar:p,companion:M,update:wt,pose:zt,get alpha(){return c/Ie.tick},tickLength:Ie.tick,commandAvatarTo:H,commandCompanion:V,possess:k,setStandingOrders:tt,signal(L){return!L||!Number.isFinite(L.x)||!Number.isFinite(L.z)||L.type!=="noise"&&L.type!=="sighted"?!1:(T.signal({...L}),!0)},drainEvents(){const L=a.slice();return a.length=0,L},snapshot(){const L=xt(M);return L.order=v.order,L.react=v.react?{...v.react}:null,v.mode==="follow"&&(L.follow={state:v.chasing?"heading":"formed",planning:!!v.search}),v.mode==="patrol"&&v.patrol&&(L.patrol={index:v.patrol.idx,loop:v.patrol.loop,count:v.patrol.pts.length}),{t:ze(l),tick:u,alpha:ze(c/Ie.tick),controlled:Y().id,avatar:xt(p),companion:JSON.parse(JSON.stringify(L)),rules:T.describe(),stats:{...o}}},path(L){const W=L==="avatar"?p:L==="companion"?M:null,it=W==null?void 0:W._route;return it?it.pts.slice(it.i).map(nt=>({x:nt.x,z:nt.z})):[]},world:s,get time(){return l},get controlledId(){return Y().id}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const al="170",pf=0,ql=1,mf=2,Nu=1,gf=2,Vn=3,vi=0,Je=1,ye=2,$n=0,hs=1,ke=2,Yl=3,$l=4,xf=5,Di=100,vf=101,_f=102,yf=103,Mf=104,Sf=200,bf=201,wf=202,Ef=203,ha=204,fa=205,Tf=206,Af=207,Rf=208,Cf=209,Pf=210,Lf=211,Df=212,If=213,zf=214,da=0,pa=1,ma=2,ms=3,ga=4,xa=5,va=6,_a=7,ll=0,Uf=1,Nf=2,xi=0,Fu=1,Ou=2,ku=3,Bu=4,Ff=5,Gu=6,Hu=7,Vu=300,gs=301,xs=302,ya=303,Ma=304,ao=306,io=1e3,zi=1001,Sa=1002,on=1003,Of=1004,cr=1005,yn=1006,Mo=1007,Ui=1008,zn=1009,Wu=1010,Xu=1011,nr=1012,cl=1013,Oi=1014,Ln=1015,In=1016,ul=1017,hl=1018,vs=1020,qu=35902,Yu=1021,$u=1022,Mn=1023,ju=1024,Ku=1025,fs=1026,_s=1027,lo=1028,fl=1029,Zu=1030,dl=1031,pl=1033,Kr=33776,Zr=33777,Jr=33778,Qr=33779,ba=35840,wa=35841,Ea=35842,Ta=35843,Aa=36196,Ra=37492,Ca=37496,Pa=37808,La=37809,Da=37810,Ia=37811,za=37812,Ua=37813,Na=37814,Fa=37815,Oa=37816,ka=37817,Ba=37818,Ga=37819,Ha=37820,Va=37821,to=36492,Wa=36494,Xa=36495,Ju=36283,qa=36284,Ya=36285,$a=36286,kf=3200,Bf=3201,Qu=0,Gf=1,fi="",sn="srgb",ws="srgb-linear",co="linear",fe="srgb",Hi=7680,jl=519,Hf=512,Vf=513,Wf=514,th=515,Xf=516,qf=517,Yf=518,$f=519,ja=35044,Ka=35048,Kl="300 es",qn=2e3,so=2001;class Es{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Zl=1234567;const ds=Math.PI/180,ir=180/Math.PI;function jn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ge[i&255]+Ge[i>>8&255]+Ge[i>>16&255]+Ge[i>>24&255]+"-"+Ge[t&255]+Ge[t>>8&255]+"-"+Ge[t>>16&15|64]+Ge[t>>24&255]+"-"+Ge[e&63|128]+Ge[e>>8&255]+"-"+Ge[e>>16&255]+Ge[e>>24&255]+Ge[n&255]+Ge[n>>8&255]+Ge[n>>16&255]+Ge[n>>24&255]).toLowerCase()}function We(i,t,e){return Math.max(t,Math.min(e,i))}function ml(i,t){return(i%t+t)%t}function jf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Kf(i,t,e){return i!==t?(e-i)/(t-i):0}function Zs(i,t,e){return(1-e)*i+e*t}function Zf(i,t,e,n){return Zs(i,t,1-Math.exp(-e*n))}function Jf(i,t=1){return t-Math.abs(ml(i,t*2)-t)}function Qf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function td(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function ed(i,t){return i+Math.floor(Math.random()*(t-i+1))}function nd(i,t){return i+Math.random()*(t-i)}function id(i){return i*(.5-Math.random())}function sd(i){i!==void 0&&(Zl=i);let t=Zl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function rd(i){return i*ds}function od(i){return i*ir}function ad(i){return(i&i-1)===0&&i!==0}function ld(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function cd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function ud(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),u=o((t+n)/2),d=r((t-n)/2),f=o((t-n)/2),h=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*u,l*d,l*f,a*c);break;case"YZY":i.set(l*f,a*u,l*d,a*c);break;case"ZXZ":i.set(l*d,l*f,a*u,a*c);break;case"XZX":i.set(a*u,l*m,l*h,a*c);break;case"YXY":i.set(l*h,a*u,l*m,a*c);break;case"ZYZ":i.set(l*m,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function _n(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function de(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Wn={DEG2RAD:ds,RAD2DEG:ir,generateUUID:jn,clamp:We,euclideanModulo:ml,mapLinear:jf,inverseLerp:Kf,lerp:Zs,damp:Zf,pingpong:Jf,smoothstep:Qf,smootherstep:td,randInt:ed,randFloat:nd,randFloatSpread:id,seededRandom:sd,degToRad:rd,radToDeg:od,isPowerOfTwo:ad,ceilPowerOfTwo:ld,floorPowerOfTwo:cd,setQuaternionFromProperEuler:ud,normalize:de,denormalize:_n};class Yt{constructor(t=0,e=0){Yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(We(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(t,e,n,s,r,o,a,l,c){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],m=n[8],x=s[0],g=s[3],p=s[6],b=s[1],M=s[4],v=s[7],T=s[2],_=s[5],S=s[8];return r[0]=o*x+a*b+l*T,r[3]=o*g+a*M+l*_,r[6]=o*p+a*v+l*S,r[1]=c*x+u*b+d*T,r[4]=c*g+u*M+d*_,r[7]=c*p+u*v+d*S,r[2]=f*x+h*b+m*T,r[5]=f*g+h*M+m*_,r[8]=f*p+h*v+m*S,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*o-a*c,f=a*l-u*r,h=c*r-o*l,m=e*d+n*f+s*h;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/m;return t[0]=d*x,t[1]=(s*c-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=f*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=h*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(So.makeScale(t,e)),this}rotate(t){return this.premultiply(So.makeRotation(-t)),this}translate(t,e){return this.premultiply(So.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const So=new Qt;function eh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ro(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function hd(){const i=ro("canvas");return i.style.display="block",i}const Jl={};function js(i){i in Jl||(Jl[i]=!0,console.warn(i))}function fd(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function dd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function pd(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const re={enabled:!0,workingColorSpace:ws,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===fe&&(i.r=Kn(i.r),i.g=Kn(i.g),i.b=Kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===fe&&(i.r=ps(i.r),i.g=ps(i.g),i.b=ps(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===fi?co:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Ql=[.64,.33,.3,.6,.15,.06],tc=[.2126,.7152,.0722],ec=[.3127,.329],nc=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ic=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);re.define({[ws]:{primaries:Ql,whitePoint:ec,transfer:co,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:tc,workingColorSpaceConfig:{unpackColorSpace:sn},outputColorSpaceConfig:{drawingBufferColorSpace:sn}},[sn]:{primaries:Ql,whitePoint:ec,transfer:fe,toXYZ:nc,fromXYZ:ic,luminanceCoefficients:tc,outputColorSpaceConfig:{drawingBufferColorSpace:sn}}});let Vi;class md{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Vi===void 0&&(Vi=ro("canvas")),Vi.width=t.width,Vi.height=t.height;const n=Vi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Vi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ro("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Kn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Kn(e[n]/255)*255):e[n]=Kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let gd=0;class nh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=jn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(bo(s[o].image)):r.push(bo(s[o]))}else r=bo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function bo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?md.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xd=0;class qe extends Es{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,n=zi,s=zi,r=yn,o=Ui,a=Mn,l=zn,c=qe.DEFAULT_ANISOTROPY,u=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xd++}),this.uuid=jn(),this.name="",this.source=new nh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Vu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case io:t.x=t.x-Math.floor(t.x);break;case zi:t.x=t.x<0?0:1;break;case Sa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case io:t.y=t.y-Math.floor(t.y);break;case zi:t.y=t.y<0?0:1;break;case Sa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=Vu;qe.DEFAULT_ANISOTROPY=1;class oe{constructor(t=0,e=0,n=0,s=1){oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],m=l[9],x=l[2],g=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-x)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+x)<.1&&Math.abs(m+g)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,v=(h+1)/2,T=(p+1)/2,_=(u+f)/4,S=(d+x)/4,E=(m+g)/4;return M>v&&M>T?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=_/n,r=S/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=_/s,r=E/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=S/r,s=E/r),this.set(n,s,r,e),this}let b=Math.sqrt((g-m)*(g-m)+(d-x)*(d-x)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(d-x)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vd extends Es{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new oe(0,0,t,e),this.scissorTest=!1,this.viewport=new oe(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new qe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new nh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fn extends vd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ih extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class _d extends qe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=on,this.minFilter=on,this.wrapR=zi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ki{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const f=r[o+0],h=r[o+1],m=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=f,t[e+1]=h,t[e+2]=m,t[e+3]=x;return}if(d!==x||l!==f||c!==h||u!==m){let g=1-a;const p=l*f+c*h+u*m+d*x,b=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const T=Math.sqrt(M),_=Math.atan2(T,p*b);g=Math.sin(g*_)/T,a=Math.sin(a*_)/T}const v=a*b;if(l=l*g+f*v,c=c*g+h*v,u=u*g+m*v,d=d*g+x*v,g===1-a){const T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[o],f=r[o+1],h=r[o+2],m=r[o+3];return t[e]=a*m+u*d+l*h-c*f,t[e+1]=l*m+u*f+c*d-a*h,t[e+2]=c*m+u*h+a*f-l*d,t[e+3]=u*m-a*d-l*f-c*h,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),d=a(r/2),f=l(n/2),h=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=f*u*d+c*h*m,this._y=c*h*d-f*u*m,this._z=c*u*m+f*h*d,this._w=c*u*d-f*h*m;break;case"YXZ":this._x=f*u*d+c*h*m,this._y=c*h*d-f*u*m,this._z=c*u*m-f*h*d,this._w=c*u*d+f*h*m;break;case"ZXY":this._x=f*u*d-c*h*m,this._y=c*h*d+f*u*m,this._z=c*u*m+f*h*d,this._w=c*u*d-f*h*m;break;case"ZYX":this._x=f*u*d-c*h*m,this._y=c*h*d+f*u*m,this._z=c*u*m-f*h*d,this._w=c*u*d+f*h*m;break;case"YZX":this._x=f*u*d+c*h*m,this._y=c*h*d+f*u*m,this._z=c*u*m-f*h*d,this._w=c*u*d-f*h*m;break;case"XZY":this._x=f*u*d-c*h*m,this._y=c*h*d-f*u*m,this._z=c*u*m+f*h*d,this._w=c*u*d+f*h*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(o-s)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(r-c)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(We(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-e;return this._w=h*o+e*this._w,this._x=h*n+e*this._x,this._y=h*s+e*this._y,this._z=h*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(t=0,e=0,n=0){Q.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(sc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(sc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return wo.copy(this).projectOnVector(t),this.sub(wo)}reflect(t){return this.sub(wo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(We(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wo=new Q,sc=new ki;class Nn{constructor(t=new Q(1/0,1/0,1/0),e=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,mn):mn.fromBufferAttribute(r,o),mn.applyMatrix4(t.matrixWorld),this.expandByPoint(mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ur.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ur.copy(n.boundingBox)),ur.applyMatrix4(t.matrixWorld),this.union(ur)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,mn),mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Is),hr.subVectors(this.max,Is),Wi.subVectors(t.a,Is),Xi.subVectors(t.b,Is),qi.subVectors(t.c,Is),ei.subVectors(Xi,Wi),ni.subVectors(qi,Xi),Si.subVectors(Wi,qi);let e=[0,-ei.z,ei.y,0,-ni.z,ni.y,0,-Si.z,Si.y,ei.z,0,-ei.x,ni.z,0,-ni.x,Si.z,0,-Si.x,-ei.y,ei.x,0,-ni.y,ni.x,0,-Si.y,Si.x,0];return!Eo(e,Wi,Xi,qi,hr)||(e=[1,0,0,0,1,0,0,0,1],!Eo(e,Wi,Xi,qi,hr))?!1:(fr.crossVectors(ei,ni),e=[fr.x,fr.y,fr.z],Eo(e,Wi,Xi,qi,hr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const On=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],mn=new Q,ur=new Nn,Wi=new Q,Xi=new Q,qi=new Q,ei=new Q,ni=new Q,Si=new Q,Is=new Q,hr=new Q,fr=new Q,bi=new Q;function Eo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){bi.fromArray(i,r);const a=s.x*Math.abs(bi.x)+s.y*Math.abs(bi.y)+s.z*Math.abs(bi.z),l=t.dot(bi),c=e.dot(bi),u=n.dot(bi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const yd=new Nn,zs=new Q,To=new Q;class yi{constructor(t=new Q,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zs.subVectors(t,this.center);const e=zs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(zs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(To.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zs.copy(t.center).add(To)),this.expandByPoint(zs.copy(t.center).sub(To))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const kn=new Q,Ao=new Q,dr=new Q,ii=new Q,Ro=new Q,pr=new Q,Co=new Q;class gl{constructor(t=new Q,e=new Q(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(kn.copy(this.origin).addScaledVector(this.direction,e),kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ao.copy(t).add(e).multiplyScalar(.5),dr.copy(e).sub(t).normalize(),ii.copy(this.origin).sub(Ao);const r=t.distanceTo(e)*.5,o=-this.direction.dot(dr),a=ii.dot(this.direction),l=-ii.dot(dr),c=ii.lengthSq(),u=Math.abs(1-o*o);let d,f,h,m;if(u>0)if(d=o*l-a,f=o*a-l,m=r*u,d>=0)if(f>=-m)if(f<=m){const x=1/u;d*=x,f*=x,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-m?(d=Math.max(0,-(-o*r+a)),f=d>0?-r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c):f<=m?(d=0,f=Math.min(Math.max(-r,-l),r),h=f*(f+2*l)+c):(d=Math.max(0,-(o*r+a)),f=d>0?r:Math.min(Math.max(-r,-l),r),h=-d*d+f*(f+2*l)+c);else f=o>0?-r:r,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ao).addScaledVector(dr,f),h}intersectSphere(t,e){kn.subVectors(t.center,this.origin);const n=kn.dot(this.direction),s=kn.dot(kn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(n=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-f.z)*d,l=(t.max.z-f.z)*d):(a=(t.max.z-f.z)*d,l=(t.min.z-f.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,kn)!==null}intersectTriangle(t,e,n,s,r){Ro.subVectors(e,t),pr.subVectors(n,t),Co.crossVectors(Ro,pr);let o=this.direction.dot(Co),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ii.subVectors(this.origin,t);const l=a*this.direction.dot(pr.crossVectors(ii,pr));if(l<0)return null;const c=a*this.direction.dot(Ro.cross(ii));if(c<0||l+c>o)return null;const u=-a*ii.dot(Co);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ae{constructor(t,e,n,s,r,o,a,l,c,u,d,f,h,m,x,g){ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,u,d,f,h,m,x,g)}set(t,e,n,s,r,o,a,l,c,u,d,f,h,m,x,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=m,p[11]=x,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Yi.setFromMatrixColumn(t,0).length(),r=1/Yi.setFromMatrixColumn(t,1).length(),o=1/Yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const f=o*u,h=o*d,m=a*u,x=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=h+m*c,e[5]=f-x*c,e[9]=-a*l,e[2]=x-f*c,e[6]=m+h*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,h=l*d,m=c*u,x=c*d;e[0]=f+x*a,e[4]=m*a-h,e[8]=o*c,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=h*a-m,e[6]=x+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,h=l*d,m=c*u,x=c*d;e[0]=f-x*a,e[4]=-o*d,e[8]=m+h*a,e[1]=h+m*a,e[5]=o*u,e[9]=x-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,h=o*d,m=a*u,x=a*d;e[0]=l*u,e[4]=m*c-h,e[8]=f*c+x,e[1]=l*d,e[5]=x*c+f,e[9]=h*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,h=o*c,m=a*l,x=a*c;e[0]=l*u,e[4]=x-f*d,e[8]=m*d+h,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=h*d+m,e[10]=f-x*d}else if(t.order==="XZY"){const f=o*l,h=o*c,m=a*l,x=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=f*d+x,e[5]=o*u,e[9]=h*d-m,e[2]=m*d-h,e[6]=a*u,e[10]=x*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Md,t,Sd)}lookAt(t,e,n){const s=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),si.crossVectors(n,tn),si.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),si.crossVectors(n,tn)),si.normalize(),mr.crossVectors(tn,si),s[0]=si.x,s[4]=mr.x,s[8]=tn.x,s[1]=si.y,s[5]=mr.y,s[9]=tn.y,s[2]=si.z,s[6]=mr.z,s[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],m=n[2],x=n[6],g=n[10],p=n[14],b=n[3],M=n[7],v=n[11],T=n[15],_=s[0],S=s[4],E=s[8],w=s[12],y=s[1],R=s[5],F=s[9],B=s[13],Y=s[2],Z=s[6],H=s[10],V=s[14],k=s[3],tt=s[7],ut=s[11],rt=s[15];return r[0]=o*_+a*y+l*Y+c*k,r[4]=o*S+a*R+l*Z+c*tt,r[8]=o*E+a*F+l*H+c*ut,r[12]=o*w+a*B+l*V+c*rt,r[1]=u*_+d*y+f*Y+h*k,r[5]=u*S+d*R+f*Z+h*tt,r[9]=u*E+d*F+f*H+h*ut,r[13]=u*w+d*B+f*V+h*rt,r[2]=m*_+x*y+g*Y+p*k,r[6]=m*S+x*R+g*Z+p*tt,r[10]=m*E+x*F+g*H+p*ut,r[14]=m*w+x*B+g*V+p*rt,r[3]=b*_+M*y+v*Y+T*k,r[7]=b*S+M*R+v*Z+T*tt,r[11]=b*E+M*F+v*H+T*ut,r[15]=b*w+M*B+v*V+T*rt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],f=t[10],h=t[14],m=t[3],x=t[7],g=t[11],p=t[15];return m*(+r*l*d-s*c*d-r*a*f+n*c*f+s*a*h-n*l*h)+x*(+e*l*h-e*c*f+r*o*f-s*o*h+s*c*u-r*l*u)+g*(+e*c*d-e*a*h-r*o*d+n*o*h+r*a*u-n*c*u)+p*(-s*a*u-e*l*d+e*a*f+s*o*d-n*o*f+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],f=t[10],h=t[11],m=t[12],x=t[13],g=t[14],p=t[15],b=d*g*c-x*f*c+x*l*h-a*g*h-d*l*p+a*f*p,M=m*f*c-u*g*c-m*l*h+o*g*h+u*l*p-o*f*p,v=u*x*c-m*d*c+m*a*h-o*x*h-u*a*p+o*d*p,T=m*d*l-u*x*l-m*a*f+o*x*f+u*a*g-o*d*g,_=e*b+n*M+s*v+r*T;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/_;return t[0]=b*S,t[1]=(x*f*r-d*g*r-x*s*h+n*g*h+d*s*p-n*f*p)*S,t[2]=(a*g*r-x*l*r+x*s*c-n*g*c-a*s*p+n*l*p)*S,t[3]=(d*l*r-a*f*r-d*s*c+n*f*c+a*s*h-n*l*h)*S,t[4]=M*S,t[5]=(u*g*r-m*f*r+m*s*h-e*g*h-u*s*p+e*f*p)*S,t[6]=(m*l*r-o*g*r-m*s*c+e*g*c+o*s*p-e*l*p)*S,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*h+e*l*h)*S,t[8]=v*S,t[9]=(m*d*r-u*x*r-m*n*h+e*x*h+u*n*p-e*d*p)*S,t[10]=(o*x*r-m*a*r+m*n*c-e*x*c-o*n*p+e*a*p)*S,t[11]=(u*a*r-o*d*r-u*n*c+e*d*c+o*n*h-e*a*h)*S,t[12]=T*S,t[13]=(u*x*s-m*d*s+m*n*f-e*x*f-u*n*g+e*d*g)*S,t[14]=(m*a*s-o*x*s-m*n*l+e*x*l+o*n*g-e*a*g)*S,t[15]=(o*d*s-u*a*s+u*n*l-e*d*l-o*n*f+e*a*f)*S,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,d=a+a,f=r*c,h=r*u,m=r*d,x=o*u,g=o*d,p=a*d,b=l*c,M=l*u,v=l*d,T=n.x,_=n.y,S=n.z;return s[0]=(1-(x+p))*T,s[1]=(h+v)*T,s[2]=(m-M)*T,s[3]=0,s[4]=(h-v)*_,s[5]=(1-(f+p))*_,s[6]=(g+b)*_,s[7]=0,s[8]=(m+M)*S,s[9]=(g-b)*S,s[10]=(1-(f+x))*S,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Yi.set(s[0],s[1],s[2]).length();const o=Yi.set(s[4],s[5],s[6]).length(),a=Yi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],gn.copy(this);const c=1/r,u=1/o,d=1/a;return gn.elements[0]*=c,gn.elements[1]*=c,gn.elements[2]*=c,gn.elements[4]*=u,gn.elements[5]*=u,gn.elements[6]*=u,gn.elements[8]*=d,gn.elements[9]*=d,gn.elements[10]*=d,e.setFromRotationMatrix(gn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=qn){const l=this.elements,c=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s);let h,m;if(a===qn)h=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===so)h=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=qn){const l=this.elements,c=1/(e-t),u=1/(n-s),d=1/(o-r),f=(e+t)*c,h=(n+s)*u;let m,x;if(a===qn)m=(o+r)*d,x=-2*d;else if(a===so)m=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=x,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Yi=new Q,gn=new ae,Md=new Q(0,0,0),Sd=new Q(1,1,1),si=new Q,mr=new Q,tn=new Q,rc=new ae,oc=new ki;class Un{constructor(t=0,e=0,n=0,s=Un.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],f=s[6],h=s[10];switch(e){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return rc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(rc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oc.setFromEuler(this),this.setFromQuaternion(oc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Un.DEFAULT_ORDER="XYZ";class xl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let bd=0;const ac=new Q,$i=new ki,Bn=new ae,gr=new Q,Us=new Q,wd=new Q,Ed=new ki,lc=new Q(1,0,0),cc=new Q(0,1,0),uc=new Q(0,0,1),hc={type:"added"},Td={type:"removed"},ji={type:"childadded",child:null},Po={type:"childremoved",child:null};class De extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=De.DEFAULT_UP.clone();const t=new Q,e=new Un,n=new ki,s=new Q(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ae},normalMatrix:{value:new Qt}}),this.matrix=new ae,this.matrixWorld=new ae,this.matrixAutoUpdate=De.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(lc,t)}rotateY(t){return this.rotateOnAxis(cc,t)}rotateZ(t){return this.rotateOnAxis(uc,t)}translateOnAxis(t,e){return ac.copy(t).applyQuaternion(this.quaternion),this.position.add(ac.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(lc,t)}translateY(t){return this.translateOnAxis(cc,t)}translateZ(t){return this.translateOnAxis(uc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?gr.copy(t):gr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Us.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Us,gr,this.up):Bn.lookAt(gr,Us,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),$i.setFromRotationMatrix(Bn),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(hc),ji.child=t,this.dispatchEvent(ji),ji.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Td),Po.child=t,this.dispatchEvent(Po),Po.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(hc),ji.child=t,this.dispatchEvent(ji),ji.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,t,wd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Us,Ed,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),d=o(t.shapes),f=o(t.skeletons),h=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}De.DEFAULT_UP=new Q(0,1,0);De.DEFAULT_MATRIX_AUTO_UPDATE=!0;De.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const xn=new Q,Gn=new Q,Lo=new Q,Hn=new Q,Ki=new Q,Zi=new Q,fc=new Q,Do=new Q,Io=new Q,zo=new Q,Uo=new oe,No=new oe,Fo=new oe;class un{constructor(t=new Q,e=new Q,n=new Q){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),xn.subVectors(t,e),s.cross(xn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){xn.subVectors(s,e),Gn.subVectors(n,e),Lo.subVectors(t,e);const o=xn.dot(xn),a=xn.dot(Gn),l=xn.dot(Lo),c=Gn.dot(Gn),u=Gn.dot(Lo),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,m=(o*u-a*l)*f;return r.set(1-h-m,m,h)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Uo.setScalar(0),No.setScalar(0),Fo.setScalar(0),Uo.fromBufferAttribute(t,e),No.fromBufferAttribute(t,n),Fo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Uo,r.x),o.addScaledVector(No,r.y),o.addScaledVector(Fo,r.z),o}static isFrontFacing(t,e,n,s){return xn.subVectors(n,e),Gn.subVectors(t,e),xn.cross(Gn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return xn.subVectors(this.c,this.b),Gn.subVectors(this.a,this.b),xn.cross(Gn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return un.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return un.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return un.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return un.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return un.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;Ki.subVectors(s,n),Zi.subVectors(r,n),Do.subVectors(t,n);const l=Ki.dot(Do),c=Zi.dot(Do);if(l<=0&&c<=0)return e.copy(n);Io.subVectors(t,s);const u=Ki.dot(Io),d=Zi.dot(Io);if(u>=0&&d<=u)return e.copy(s);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(Ki,o);zo.subVectors(t,r);const h=Ki.dot(zo),m=Zi.dot(zo);if(m>=0&&h<=m)return e.copy(r);const x=h*c-l*m;if(x<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Zi,a);const g=u*m-h*d;if(g<=0&&d-u>=0&&h-m>=0)return fc.subVectors(r,s),a=(d-u)/(d-u+(h-m)),e.copy(s).addScaledVector(fc,a);const p=1/(g+x+f);return o=x*p,a=f*p,e.copy(n).addScaledVector(Ki,o).addScaledVector(Zi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const sh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ri={h:0,s:0,l:0},xr={h:0,s:0,l:0};function Oo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Ht{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=sn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=re.workingColorSpace){if(t=ml(t,1),e=We(e,0,1),n=We(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Oo(o,r,t+1/3),this.g=Oo(o,r,t),this.b=Oo(o,r,t-1/3)}return re.toWorkingColorSpace(this,s),this}setStyle(t,e=sn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=sn){const n=sh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Kn(t.r),this.g=Kn(t.g),this.b=Kn(t.b),this}copyLinearToSRGB(t){return this.r=ps(t.r),this.g=ps(t.g),this.b=ps(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=sn){return re.fromWorkingColorSpace(He.copy(this),t),Math.round(We(He.r*255,0,255))*65536+Math.round(We(He.g*255,0,255))*256+Math.round(We(He.b*255,0,255))}getHexString(t=sn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(He.copy(this),e);const n=He.r,s=He.g,r=He.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=sn){re.fromWorkingColorSpace(He.copy(this),t);const e=He.r,n=He.g,s=He.b;return t!==sn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ri),this.setHSL(ri.h+t,ri.s+e,ri.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ri),t.getHSL(xr);const n=Zs(ri.h,xr.h,e),s=Zs(ri.s,xr.s,e),r=Zs(ri.l,xr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new Ht;Ht.NAMES=sh;let Ad=0;class Ts extends Es{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=jn(),this.name="",this.blending=hs,this.side=vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ha,this.blendDst=fa,this.blendEquation=Di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=jl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hi,this.stencilZFail=Hi,this.stencilZPass=Hi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(n.blending=this.blending),this.side!==vi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ha&&(n.blendSrc=this.blendSrc),this.blendDst!==fa&&(n.blendDst=this.blendDst),this.blendEquation!==Di&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ms&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==jl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Hi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Hi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Hi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Te extends Ts{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new Q,vr=new Yt;class Me{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ja,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)vr.fromBufferAttribute(this,e),vr.applyMatrix3(t),this.setXY(e,vr.x,vr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=_n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=_n(e,this.array)),e}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=_n(e,this.array)),e}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=_n(e,this.array)),e}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=_n(e,this.array)),e}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ja&&(t.usage=this.usage),t}}class rh extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class oh extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ne extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Rd=0;const ln=new ae,ko=new De,Ji=new Q,en=new Nn,Ns=new Nn,Pe=new Q;class pe extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(eh(t)?oh:rh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return ko.lookAt(t),ko.updateMatrix(),this.applyMatrix4(ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ne(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];en.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ns.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(en.min,Ns.min),en.expandByPoint(Pe),Pe.addVectors(en.max,Ns.max),en.expandByPoint(Pe)):(en.expandByPoint(Ns.min),en.expandByPoint(Ns.max))}en.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Pe.fromBufferAttribute(a,c),l&&(Ji.fromBufferAttribute(t,c),Pe.add(Ji)),s=Math.max(s,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new Q,l[E]=new Q;const c=new Q,u=new Q,d=new Q,f=new Yt,h=new Yt,m=new Yt,x=new Q,g=new Q;function p(E,w,y){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),f.fromBufferAttribute(r,E),h.fromBufferAttribute(r,w),m.fromBufferAttribute(r,y),u.sub(c),d.sub(c),h.sub(f),m.sub(f);const R=1/(h.x*m.y-m.x*h.y);isFinite(R)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(d,-h.y).multiplyScalar(R),g.copy(d).multiplyScalar(h.x).addScaledVector(u,-m.x).multiplyScalar(R),a[E].add(x),a[w].add(x),a[y].add(x),l[E].add(g),l[w].add(g),l[y].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let E=0,w=b.length;E<w;++E){const y=b[E],R=y.start,F=y.count;for(let B=R,Y=R+F;B<Y;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const M=new Q,v=new Q,T=new Q,_=new Q;function S(E){T.fromBufferAttribute(s,E),_.copy(T);const w=a[E];M.copy(w),M.sub(T.multiplyScalar(T.dot(w))).normalize(),v.crossVectors(_,w);const R=v.dot(l[E])<0?-1:1;o.setXYZW(E,M.x,M.y,M.z,R)}for(let E=0,w=b.length;E<w;++E){const y=b[E],R=y.start,F=y.count;for(let B=R,Y=R+F;B<Y;B+=3)S(t.getX(B+0)),S(t.getX(B+1)),S(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const s=new Q,r=new Q,o=new Q,a=new Q,l=new Q,c=new Q,u=new Q,d=new Q;if(t)for(let f=0,h=t.count;f<h;f+=3){const m=t.getX(f+0),x=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,g),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let f=0,h=e.count;f<h;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,m=0;for(let x=0,g=l.length;x<g;x++){a.isInterleavedBufferAttribute?h=l[x]*a.data.stride+a.offset:h=l[x]*u;for(let p=0;p<u;p++)f[m++]=c[h++]}return new Me(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=t(f,n);l.push(h)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],d=r[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dc=new ae,wi=new gl,_r=new yi,pc=new Q,yr=new Q,Mr=new Q,Sr=new Q,Bo=new Q,br=new Q,mc=new Q,wr=new Q;class jt extends De{constructor(t=new pe,e=new Te){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){br.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(Bo.fromBufferAttribute(d,t),o?br.addScaledVector(Bo,u):br.addScaledVector(Bo.sub(e),u))}e.add(br)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(r),wi.copy(t.ray).recast(t.near),!(_r.containsPoint(wi.origin)===!1&&(wi.intersectSphere(_r,pc)===null||wi.origin.distanceToSquared(pc)>(t.far-t.near)**2))&&(dc.copy(r).invert(),wi.copy(t.ray).applyMatrix4(dc),!(n.boundingBox!==null&&wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,wi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=o[g.materialIndex],b=Math.max(g.start,h.start),M=Math.min(a.count,Math.min(g.start+g.count,h.start+h.count));for(let v=b,T=M;v<T;v+=3){const _=a.getX(v),S=a.getX(v+1),E=a.getX(v+2);s=Er(this,p,t,n,c,u,d,_,S,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,h.start),x=Math.min(a.count,h.start+h.count);for(let g=m,p=x;g<p;g+=3){const b=a.getX(g),M=a.getX(g+1),v=a.getX(g+2);s=Er(this,o,t,n,c,u,d,b,M,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,x=f.length;m<x;m++){const g=f[m],p=o[g.materialIndex],b=Math.max(g.start,h.start),M=Math.min(l.count,Math.min(g.start+g.count,h.start+h.count));for(let v=b,T=M;v<T;v+=3){const _=v,S=v+1,E=v+2;s=Er(this,p,t,n,c,u,d,_,S,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let g=m,p=x;g<p;g+=3){const b=g,M=g+1,v=g+2;s=Er(this,o,t,n,c,u,d,b,M,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Cd(i,t,e,n,s,r,o,a){let l;if(t.side===Je?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===vi,a),l===null)return null;wr.copy(a),wr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(wr);return c<e.near||c>e.far?null:{distance:c,point:wr.clone(),object:i}}function Er(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,yr),i.getVertexPosition(l,Mr),i.getVertexPosition(c,Sr);const u=Cd(i,t,e,n,yr,Mr,Sr,mc);if(u){const d=new Q;un.getBarycoord(mc,yr,Mr,Sr,d),s&&(u.uv=un.getInterpolatedAttribute(s,a,l,c,d,new Yt)),r&&(u.uv1=un.getInterpolatedAttribute(r,a,l,c,d,new Yt)),o&&(u.normal=un.getInterpolatedAttribute(o,a,l,c,d,new Q),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new Q,materialIndex:0};un.getNormal(yr,Mr,Sr,f.normal),u.face=f,u.barycoord=d}return u}class Dn extends pe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(u,3)),this.setAttribute("uv",new ne(d,2));function m(x,g,p,b,M,v,T,_,S,E,w){const y=v/S,R=T/E,F=v/2,B=T/2,Y=_/2,Z=S+1,H=E+1;let V=0,k=0;const tt=new Q;for(let ut=0;ut<H;ut++){const rt=ut*R-B;for(let At=0;At<Z;At++){const Ct=At*y-F;tt[x]=Ct*b,tt[g]=rt*M,tt[p]=Y,c.push(tt.x,tt.y,tt.z),tt[x]=0,tt[g]=0,tt[p]=_>0?1:-1,u.push(tt.x,tt.y,tt.z),d.push(At/S),d.push(1-ut/E),V+=1}}for(let ut=0;ut<E;ut++)for(let rt=0;rt<S;rt++){const At=f+rt+Z*ut,Ct=f+rt+Z*(ut+1),lt=f+(rt+1)+Z*(ut+1),wt=f+(rt+1)+Z*ut;l.push(At,Ct,wt),l.push(Ct,lt,wt),k+=6}a.addGroup(h,k,w),h+=k,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Dn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ys(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function $e(i){const t={};for(let e=0;e<i.length;e++){const n=ys(i[e]);for(const s in n)t[s]=n[s]}return t}function Pd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function ah(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const _i={clone:ys,merge:$e};var Ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ae extends Ts{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ld,this.fragmentShader=Dd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ys(t.uniforms),this.uniformsGroups=Pd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class lh extends De{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ae,this.projectionMatrix=new ae,this.projectionMatrixInverse=new ae,this.coordinateSystem=qn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const oi=new Q,gc=new Yt,xc=new Yt;class rn extends lh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ds*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ir*2*Math.atan(Math.tan(ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(oi.x,oi.y).multiplyScalar(-t/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-t/oi.z)}getViewSize(t,e){return this.getViewBounds(t,gc,xc),e.subVectors(xc,gc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ds*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Qi=-90,ts=1;class Id extends De{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new rn(Qi,ts,t,e);s.layers=this.layers,this.add(s);const r=new rn(Qi,ts,t,e);r.layers=this.layers,this.add(r);const o=new rn(Qi,ts,t,e);o.layers=this.layers,this.add(o);const a=new rn(Qi,ts,t,e);a.layers=this.layers,this.add(a);const l=new rn(Qi,ts,t,e);l.layers=this.layers,this.add(l);const c=new rn(Qi,ts,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===qn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===so)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),h=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,f,h),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class ch extends qe{constructor(t,e,n,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:gs,super(t,e,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class zd extends fn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ch(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:yn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Dn(5,5,5),r=new Ae({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Je,blending:$n});r.uniforms.tEquirect.value=e;const o=new jt(s,r),a=e.minFilter;return e.minFilter===Ui&&(e.minFilter=yn),new Id(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Go=new Q,Ud=new Q,Nd=new Qt;class hi{constructor(t=new Q(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Go.subVectors(n,e).cross(Ud.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Go),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Nd.getNormalMatrix(t),s=this.coplanarPoint(Go).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new yi,Tr=new Q;class vl{constructor(t=new hi,e=new hi,n=new hi,s=new hi,r=new hi,o=new hi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=qn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],f=s[7],h=s[8],m=s[9],x=s[10],g=s[11],p=s[12],b=s[13],M=s[14],v=s[15];if(n[0].setComponents(l-r,f-c,g-h,v-p).normalize(),n[1].setComponents(l+r,f+c,g+h,v+p).normalize(),n[2].setComponents(l+o,f+u,g+m,v+b).normalize(),n[3].setComponents(l-o,f-u,g-m,v-b).normalize(),n[4].setComponents(l-a,f-d,g-x,v-M).normalize(),e===qn)n[5].setComponents(l+a,f+d,g+x,v+M).normalize();else if(e===so)n[5].setComponents(a,d,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){return Ei.center.set(0,0,0),Ei.radius=.7071067811865476,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Tr.x=s.normal.x>0?t.max.x:t.min.x,Tr.y=s.normal.y>0?t.max.y:t.min.y,Tr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function uh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Fd(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((h,m)=>h.start-m.start);let f=0;for(let h=1;h<d.length;h++){const m=d[f],x=d[h];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++f,d[f]=x)}d.length=f+1;for(let h=0,m=d.length;h<m;h++){const x=d[h];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class As extends pe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,d=t/a,f=e/l,h=[],m=[],x=[],g=[];for(let p=0;p<u;p++){const b=p*f-o;for(let M=0;M<c;M++){const v=M*d-r;m.push(v,-b,0),x.push(0,0,1),g.push(M/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const M=b+c*p,v=b+c*(p+1),T=b+1+c*(p+1),_=b+1+c*p;h.push(M,v,_),h.push(v,T,_)}this.setIndex(h),this.setAttribute("position",new ne(m,3)),this.setAttribute("normal",new ne(x,3)),this.setAttribute("uv",new ne(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new As(t.width,t.height,t.widthSegments,t.heightSegments)}}var Od=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,kd=`#ifdef USE_ALPHAHASH
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
#endif`,Bd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Wd=`#ifdef USE_AOMAP
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
#endif`,Xd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,qd=`#ifdef USE_BATCHING
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
#endif`,Yd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$d=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,jd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Kd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Zd=`#ifdef USE_IRIDESCENCE
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
#endif`,Jd=`#ifdef USE_BUMPMAP
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
#endif`,Qd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,tp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ep=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,np=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ip=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,sp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,rp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,op=`#if defined( USE_COLOR_ALPHA )
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
#endif`,ap=`#define PI 3.141592653589793
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
} // validated`,lp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cp=`vec3 transformedNormal = objectNormal;
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
#endif`,up=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,fp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pp="gl_FragColor = linearToOutputTexel( gl_FragColor );",mp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gp=`#ifdef USE_ENVMAP
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
#endif`,xp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,vp=`#ifdef USE_ENVMAP
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
#endif`,_p=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yp=`#ifdef USE_ENVMAP
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
#endif`,Mp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Sp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ep=`#ifdef USE_GRADIENTMAP
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
}`,Tp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ap=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cp=`uniform bool receiveShadow;
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
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ip=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Up=`PhysicalMaterial material;
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
#endif`,Np=`struct PhysicalMaterial {
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
}`,Fp=`
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
#endif`,Op=`#if defined( RE_IndirectDiffuse )
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
#endif`,kp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bp=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hp=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,qp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yp=`#if defined( USE_POINTS_UV )
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
#endif`,$p=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zp=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qp=`#ifdef USE_MORPHTARGETS
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
#endif`,tm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,em=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,im=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,om=`#ifdef USE_NORMALMAP
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
#endif`,am=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,um=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,xm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_m=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ym=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Mm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Sm=`float getShadowMask() {
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
}`,bm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,wm=`#ifdef USE_SKINNING
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
#endif`,Em=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tm=`#ifdef USE_SKINNING
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
#endif`,Am=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lm=`#ifdef USE_TRANSMISSION
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
#endif`,Dm=`#ifdef USE_TRANSMISSION
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
#endif`,Im=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Um=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Om=`uniform sampler2D t2D;
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
}`,km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vm=`#include <common>
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
}`,Wm=`#if DEPTH_PACKING == 3200
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
}`,Xm=`#define DISTANCE
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
}`,qm=`#define DISTANCE
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
}`,Ym=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$m=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`uniform float scale;
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
}`,Km=`uniform vec3 diffuse;
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
}`,Zm=`#include <common>
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
}`,Jm=`uniform vec3 diffuse;
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
}`,Qm=`#define LAMBERT
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
}`,tg=`#define LAMBERT
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
}`,eg=`#define MATCAP
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
}`,ng=`#define MATCAP
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
}`,ig=`#define NORMAL
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
}`,sg=`#define NORMAL
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
}`,rg=`#define PHONG
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
}`,og=`#define PHONG
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
}`,ag=`#define STANDARD
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
}`,lg=`#define STANDARD
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
}`,cg=`#define TOON
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
}`,ug=`#define TOON
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
}`,hg=`uniform float size;
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
}`,fg=`uniform vec3 diffuse;
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
}`,dg=`#include <common>
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
}`,pg=`uniform vec3 color;
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
}`,mg=`uniform float rotation;
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
}`,gg=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:Od,alphahash_pars_fragment:kd,alphamap_fragment:Bd,alphamap_pars_fragment:Gd,alphatest_fragment:Hd,alphatest_pars_fragment:Vd,aomap_fragment:Wd,aomap_pars_fragment:Xd,batching_pars_vertex:qd,batching_vertex:Yd,begin_vertex:$d,beginnormal_vertex:jd,bsdfs:Kd,iridescence_fragment:Zd,bumpmap_pars_fragment:Jd,clipping_planes_fragment:Qd,clipping_planes_pars_fragment:tp,clipping_planes_pars_vertex:ep,clipping_planes_vertex:np,color_fragment:ip,color_pars_fragment:sp,color_pars_vertex:rp,color_vertex:op,common:ap,cube_uv_reflection_fragment:lp,defaultnormal_vertex:cp,displacementmap_pars_vertex:up,displacementmap_vertex:hp,emissivemap_fragment:fp,emissivemap_pars_fragment:dp,colorspace_fragment:pp,colorspace_pars_fragment:mp,envmap_fragment:gp,envmap_common_pars_fragment:xp,envmap_pars_fragment:vp,envmap_pars_vertex:_p,envmap_physical_pars_fragment:Pp,envmap_vertex:yp,fog_vertex:Mp,fog_pars_vertex:Sp,fog_fragment:bp,fog_pars_fragment:wp,gradientmap_pars_fragment:Ep,lightmap_pars_fragment:Tp,lights_lambert_fragment:Ap,lights_lambert_pars_fragment:Rp,lights_pars_begin:Cp,lights_toon_fragment:Lp,lights_toon_pars_fragment:Dp,lights_phong_fragment:Ip,lights_phong_pars_fragment:zp,lights_physical_fragment:Up,lights_physical_pars_fragment:Np,lights_fragment_begin:Fp,lights_fragment_maps:Op,lights_fragment_end:kp,logdepthbuf_fragment:Bp,logdepthbuf_pars_fragment:Gp,logdepthbuf_pars_vertex:Hp,logdepthbuf_vertex:Vp,map_fragment:Wp,map_pars_fragment:Xp,map_particle_fragment:qp,map_particle_pars_fragment:Yp,metalnessmap_fragment:$p,metalnessmap_pars_fragment:jp,morphinstance_vertex:Kp,morphcolor_vertex:Zp,morphnormal_vertex:Jp,morphtarget_pars_vertex:Qp,morphtarget_vertex:tm,normal_fragment_begin:em,normal_fragment_maps:nm,normal_pars_fragment:im,normal_pars_vertex:sm,normal_vertex:rm,normalmap_pars_fragment:om,clearcoat_normal_fragment_begin:am,clearcoat_normal_fragment_maps:lm,clearcoat_pars_fragment:cm,iridescence_pars_fragment:um,opaque_fragment:hm,packing:fm,premultiplied_alpha_fragment:dm,project_vertex:pm,dithering_fragment:mm,dithering_pars_fragment:gm,roughnessmap_fragment:xm,roughnessmap_pars_fragment:vm,shadowmap_pars_fragment:_m,shadowmap_pars_vertex:ym,shadowmap_vertex:Mm,shadowmask_pars_fragment:Sm,skinbase_vertex:bm,skinning_pars_vertex:wm,skinning_vertex:Em,skinnormal_vertex:Tm,specularmap_fragment:Am,specularmap_pars_fragment:Rm,tonemapping_fragment:Cm,tonemapping_pars_fragment:Pm,transmission_fragment:Lm,transmission_pars_fragment:Dm,uv_pars_fragment:Im,uv_pars_vertex:zm,uv_vertex:Um,worldpos_vertex:Nm,background_vert:Fm,background_frag:Om,backgroundCube_vert:km,backgroundCube_frag:Bm,cube_vert:Gm,cube_frag:Hm,depth_vert:Vm,depth_frag:Wm,distanceRGBA_vert:Xm,distanceRGBA_frag:qm,equirect_vert:Ym,equirect_frag:$m,linedashed_vert:jm,linedashed_frag:Km,meshbasic_vert:Zm,meshbasic_frag:Jm,meshlambert_vert:Qm,meshlambert_frag:tg,meshmatcap_vert:eg,meshmatcap_frag:ng,meshnormal_vert:ig,meshnormal_frag:sg,meshphong_vert:rg,meshphong_frag:og,meshphysical_vert:ag,meshphysical_frag:lg,meshtoon_vert:cg,meshtoon_frag:ug,points_vert:hg,points_frag:fg,shadow_vert:dg,shadow_frag:pg,sprite_vert:mg,sprite_frag:gg},Ft={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},Ze={basic:{uniforms:$e([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:$e([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:$e([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:$e([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:$e([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new Ht(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:$e([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:$e([Ft.points,Ft.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:$e([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:$e([Ft.common,Ft.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:$e([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:$e([Ft.sprite,Ft.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:$e([Ft.common,Ft.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:$e([Ft.lights,Ft.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};Ze.physical={uniforms:$e([Ze.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const Ar={r:0,b:0,g:0},Ti=new Un,xg=new ae;function vg(i,t,e,n,s,r,o){const a=new Ht(0);let l=r===!0?0:1,c,u,d=null,f=0,h=null;function m(b){let M=b.isScene===!0?b.background:null;return M&&M.isTexture&&(M=(b.backgroundBlurriness>0?e:t).get(M)),M}function x(b){let M=!1;const v=m(b);v===null?p(a,l):v&&v.isColor&&(p(v,1),M=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,M){const v=m(M);v&&(v.isCubeTexture||v.mapping===ao)?(u===void 0&&(u=new jt(new Dn(1,1,1),new Ae({name:"BackgroundCubeMaterial",uniforms:ys(Ze.backgroundCube.uniforms),vertexShader:Ze.backgroundCube.vertexShader,fragmentShader:Ze.backgroundCube.fragmentShader,side:Je,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,_,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Ti.copy(M.backgroundRotation),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(xg.makeRotationFromEuler(Ti)),u.material.toneMapped=re.getTransfer(v.colorSpace)!==fe,(d!==v||f!==v.version||h!==i.toneMapping)&&(u.material.needsUpdate=!0,d=v,f=v.version,h=i.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new jt(new As(2,2),new Ae({name:"BackgroundMaterial",uniforms:ys(Ze.background.uniforms),vertexShader:Ze.background.vertexShader,fragmentShader:Ze.background.fragmentShader,side:vi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=re.getTransfer(v.colorSpace)!==fe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||f!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,f=v.version,h=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,M){b.getRGB(Ar,ah(i)),n.buffers.color.setClear(Ar.r,Ar.g,Ar.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(b,M=1){a.set(b),l=M,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(a,l)},render:x,addToRenderList:g}}function _g(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,R,F,B,Y){let Z=!1;const H=d(B,F,R);r!==H&&(r=H,c(r.object)),Z=h(y,B,F,Y),Z&&m(y,B,F,Y),Y!==null&&t.update(Y,i.ELEMENT_ARRAY_BUFFER),(Z||o)&&(o=!1,v(y,R,F,B),Y!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function d(y,R,F){const B=F.wireframe===!0;let Y=n[y.id];Y===void 0&&(Y={},n[y.id]=Y);let Z=Y[R.id];Z===void 0&&(Z={},Y[R.id]=Z);let H=Z[B];return H===void 0&&(H=f(l()),Z[B]=H),H}function f(y){const R=[],F=[],B=[];for(let Y=0;Y<e;Y++)R[Y]=0,F[Y]=0,B[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:F,attributeDivisors:B,object:y,attributes:{},index:null}}function h(y,R,F,B){const Y=r.attributes,Z=R.attributes;let H=0;const V=F.getAttributes();for(const k in V)if(V[k].location>=0){const ut=Y[k];let rt=Z[k];if(rt===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(rt=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(rt=y.instanceColor)),ut===void 0||ut.attribute!==rt||rt&&ut.data!==rt.data)return!0;H++}return r.attributesNum!==H||r.index!==B}function m(y,R,F,B){const Y={},Z=R.attributes;let H=0;const V=F.getAttributes();for(const k in V)if(V[k].location>=0){let ut=Z[k];ut===void 0&&(k==="instanceMatrix"&&y.instanceMatrix&&(ut=y.instanceMatrix),k==="instanceColor"&&y.instanceColor&&(ut=y.instanceColor));const rt={};rt.attribute=ut,ut&&ut.data&&(rt.data=ut.data),Y[k]=rt,H++}r.attributes=Y,r.attributesNum=H,r.index=B}function x(){const y=r.newAttributes;for(let R=0,F=y.length;R<F;R++)y[R]=0}function g(y){p(y,0)}function p(y,R){const F=r.newAttributes,B=r.enabledAttributes,Y=r.attributeDivisors;F[y]=1,B[y]===0&&(i.enableVertexAttribArray(y),B[y]=1),Y[y]!==R&&(i.vertexAttribDivisor(y,R),Y[y]=R)}function b(){const y=r.newAttributes,R=r.enabledAttributes;for(let F=0,B=R.length;F<B;F++)R[F]!==y[F]&&(i.disableVertexAttribArray(F),R[F]=0)}function M(y,R,F,B,Y,Z,H){H===!0?i.vertexAttribIPointer(y,R,F,Y,Z):i.vertexAttribPointer(y,R,F,B,Y,Z)}function v(y,R,F,B){x();const Y=B.attributes,Z=F.getAttributes(),H=R.defaultAttributeValues;for(const V in Z){const k=Z[V];if(k.location>=0){let tt=Y[V];if(tt===void 0&&(V==="instanceMatrix"&&y.instanceMatrix&&(tt=y.instanceMatrix),V==="instanceColor"&&y.instanceColor&&(tt=y.instanceColor)),tt!==void 0){const ut=tt.normalized,rt=tt.itemSize,At=t.get(tt);if(At===void 0)continue;const Ct=At.buffer,lt=At.type,wt=At.bytesPerElement,zt=lt===i.INT||lt===i.UNSIGNED_INT||tt.gpuType===cl;if(tt.isInterleavedBufferAttribute){const xt=tt.data,Ut=xt.stride,L=tt.offset;if(xt.isInstancedInterleavedBuffer){for(let W=0;W<k.locationSize;W++)p(k.location+W,xt.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=xt.meshPerAttribute*xt.count)}else for(let W=0;W<k.locationSize;W++)g(k.location+W);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let W=0;W<k.locationSize;W++)M(k.location+W,rt/k.locationSize,lt,ut,Ut*wt,(L+rt/k.locationSize*W)*wt,zt)}else{if(tt.isInstancedBufferAttribute){for(let xt=0;xt<k.locationSize;xt++)p(k.location+xt,tt.meshPerAttribute);y.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let xt=0;xt<k.locationSize;xt++)g(k.location+xt);i.bindBuffer(i.ARRAY_BUFFER,Ct);for(let xt=0;xt<k.locationSize;xt++)M(k.location+xt,rt/k.locationSize,lt,ut,rt*wt,rt/k.locationSize*xt*wt,zt)}}else if(H!==void 0){const ut=H[V];if(ut!==void 0)switch(ut.length){case 2:i.vertexAttrib2fv(k.location,ut);break;case 3:i.vertexAttrib3fv(k.location,ut);break;case 4:i.vertexAttrib4fv(k.location,ut);break;default:i.vertexAttrib1fv(k.location,ut)}}}}b()}function T(){E();for(const y in n){const R=n[y];for(const F in R){const B=R[F];for(const Y in B)u(B[Y].object),delete B[Y];delete R[F]}delete n[y]}}function _(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const F in R){const B=R[F];for(const Y in B)u(B[Y].object),delete B[Y];delete R[F]}delete n[y.id]}function S(y){for(const R in n){const F=n[R];if(F[y.id]===void 0)continue;const B=F[y.id];for(const Y in B)u(B[Y].object),delete B[Y];delete F[y.id]}}function E(){w(),o=!0,r!==s&&(r=s,c(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:w,dispose:T,releaseStatesOfGeometry:_,releaseStatesOfProgram:S,initAttributes:x,enableAttribute:g,disableUnusedAttributes:b}}function yg(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),e.update(u,n,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let m=0;m<d;m++)h+=u[m];e.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let m=0;m<c.length;m++)o(c[m],u[m],f[m]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let m=0;for(let x=0;x<d;x++)m+=u[x]*f[x];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Mg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(S){return!(S!==Mn&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const E=S===In&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==zn&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==Ln&&!E)}function l(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,_=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:T,maxSamples:_}}function Sg(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new hi,a=new Qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||s;return s=f,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=u(d,f,0)},this.setState=function(d,f,h){const m=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,p=i.get(d);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{const b=r?0:n,M=b*4;let v=p.clippingState||null;l.value=v,v=u(m,f,M,h);for(let T=0;T!==M;++T)v[T]=e[T];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,f,h,m){const x=d!==null?d.length:0;let g=null;if(x!==0){if(g=l.value,m!==!0||g===null){const p=h+x*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let M=0,v=h;M!==x;++M,v+=4)o.copy(d[M]).applyMatrix4(b,a),o.normal.toArray(g,v),g[v+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function bg(i){let t=new WeakMap;function e(o,a){return a===ya?o.mapping=gs:a===Ma&&(o.mapping=xs),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ya||a===Ma)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new zd(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class _l extends lh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ls=4,vc=[.125,.215,.35,.446,.526,.582],Ii=20,Ho=new _l,_c=new Ht;let Vo=null,Wo=0,Xo=0,qo=!1;const Li=(1+Math.sqrt(5))/2,es=1/Li,yc=[new Q(-Li,es,0),new Q(Li,es,0),new Q(-es,0,Li),new Q(es,0,Li),new Q(0,Li,-es),new Q(0,Li,es),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)];class Mc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Vo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Vo,Wo,Xo),this._renderer.xr.enabled=qo,t.scissorTest=!1,Rr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===gs||t.mapping===xs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Vo=this._renderer.getRenderTarget(),Wo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),qo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:yn,minFilter:yn,generateMipmaps:!1,type:In,format:Mn,colorSpace:ws,depthBuffer:!1},s=Sc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wg(r)),this._blurMaterial=Eg(r,t,e)}return s}_compileMaterial(t){const e=new jt(this._lodPlanes[0],t);this._renderer.compile(e,Ho)}_sceneToCubeUV(t,e,n,s){const a=new rn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(_c),u.toneMapping=xi,u.autoClear=!1;const h=new Te({name:"PMREM.Background",side:Je,depthWrite:!1,depthTest:!1}),m=new jt(new Dn,h);let x=!1;const g=t.background;g?g.isColor&&(h.color.copy(g),t.background=null,x=!0):(h.color.copy(_c),x=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):b===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const M=this._cubeSize;Rr(s,b*M,p>2?M:0,M,M),u.setRenderTarget(s),x&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===gs||t.mapping===xs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=wc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Rr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Ho)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=yc[(s-r-1)%yc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new jt(this._lodPlanes[s],c),f=c.uniforms,h=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*Ii-1),x=r/m,g=isFinite(r)?1+Math.floor(u*x):Ii;g>Ii&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Ii}`);const p=[];let b=0;for(let S=0;S<Ii;++S){const E=S/x,w=Math.exp(-E*E/2);p.push(w),S===0?b+=w:S<g&&(b+=2*w)}for(let S=0;S<p.length;S++)p[S]=p[S]/b;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:M}=this;f.dTheta.value=m,f.mipInt.value=M-n;const v=this._sizeLods[s],T=3*v*(s>M-ls?s-M+ls:0),_=4*(this._cubeSize-v);Rr(e,T,_,3*v,2*v),l.setRenderTarget(e),l.render(d,Ho)}}function wg(i){const t=[],e=[],n=[];let s=i;const r=i-ls+1+vc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ls?l=vc[o-i+ls-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,m=6,x=3,g=2,p=1,b=new Float32Array(x*m*h),M=new Float32Array(g*m*h),v=new Float32Array(p*m*h);for(let _=0;_<h;_++){const S=_%3*2/3-1,E=_>2?0:-1,w=[S,E,0,S+2/3,E,0,S+2/3,E+1,0,S,E,0,S+2/3,E+1,0,S,E+1,0];b.set(w,x*m*_),M.set(f,g*m*_);const y=[_,_,_,_,_,_];v.set(y,p*m*_)}const T=new pe;T.setAttribute("position",new Me(b,x)),T.setAttribute("uv",new Me(M,g)),T.setAttribute("faceIndex",new Me(v,p)),t.push(T),s>ls&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Sc(i,t,e){const n=new fn(i,t,e);return n.texture.mapping=ao,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Eg(i,t,e){const n=new Float32Array(Ii),s=new Q(0,1,0);return new Ae({name:"SphericalGaussianBlur",defines:{n:Ii,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:yl(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function bc(){return new Ae({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yl(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function wc(){return new Ae({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function yl(){return`

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
	`}function Tg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ya||l===Ma,u=l===gs||l===xs;if(c||u){let d=t.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Mc(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&s(h)?(e===null&&(e=new Mc(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Ag(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&js("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Rg(i,t,e,n){const s={},r=new WeakMap;function o(d){const f=d.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);for(const m in f.morphAttributes){const x=f.morphAttributes[m];for(let g=0,p=x.length;g<p;g++)t.remove(x[g])}f.removeEventListener("dispose",o),delete s[f.id];const h=r.get(f);h&&(t.remove(h),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(d,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(d){const f=d.attributes;for(const m in f)t.update(f[m],i.ARRAY_BUFFER);const h=d.morphAttributes;for(const m in h){const x=h[m];for(let g=0,p=x.length;g<p;g++)t.update(x[g],i.ARRAY_BUFFER)}}function c(d){const f=[],h=d.index,m=d.attributes.position;let x=0;if(h!==null){const b=h.array;x=h.version;for(let M=0,v=b.length;M<v;M+=3){const T=b[M+0],_=b[M+1],S=b[M+2];f.push(T,_,_,S,S,T)}}else if(m!==void 0){const b=m.array;x=m.version;for(let M=0,v=b.length/3-1;M<v;M+=3){const T=M+0,_=M+1,S=M+2;f.push(T,_,_,S,S,T)}}else return;const g=new(eh(f)?oh:rh)(f,1);g.version=x;const p=r.get(d);p&&t.remove(p),r.set(d,g)}function u(d){const f=r.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Cg(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,h){i.drawElements(n,h,r,f*o),e.update(h,n,1)}function c(f,h,m){m!==0&&(i.drawElementsInstanced(n,h,r,f*o,m),e.update(h,n,m))}function u(f,h,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=h[p];e.update(g,n,1)}function d(f,h,m,x){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],x[p]);else{g.multiDrawElementsInstancedWEBGL(n,h,0,r,f,0,x,0,m);let p=0;for(let b=0;b<m;b++)p+=h[b]*x[b];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Pg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Lg(i,t,e){const n=new WeakMap,s=new oe;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let w=function(){S.dispose(),n.delete(a),a.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();const h=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let M=0;h===!0&&(M=1),m===!0&&(M=2),x===!0&&(M=3);let v=a.attributes.position.count*M,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const _=new Float32Array(v*T*4*d),S=new ih(_,v,T,d);S.type=Ln,S.needsUpdate=!0;const E=M*4;for(let y=0;y<d;y++){const R=g[y],F=p[y],B=b[y],Y=v*T*4*y;for(let Z=0;Z<R.count;Z++){const H=Z*E;h===!0&&(s.fromBufferAttribute(R,Z),_[Y+H+0]=s.x,_[Y+H+1]=s.y,_[Y+H+2]=s.z,_[Y+H+3]=0),m===!0&&(s.fromBufferAttribute(F,Z),_[Y+H+4]=s.x,_[Y+H+5]=s.y,_[Y+H+6]=s.z,_[Y+H+7]=0),x===!0&&(s.fromBufferAttribute(B,Z),_[Y+H+8]=s.x,_[Y+H+9]=s.y,_[Y+H+10]=s.z,_[Y+H+11]=B.itemSize===4?s.w:1)}}f={count:d,texture:S,size:new Yt(v,T)},n.set(a,f),a.addEventListener("dispose",w)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let h=0;for(let x=0;x<c.length;x++)h+=c[x];const m=a.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Dg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Ml extends qe{constructor(t,e,n,s,r,o,a,l,c,u=fs){if(u!==fs&&u!==_s)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===fs&&(n=Oi),n===void 0&&u===_s&&(n=vs),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:on,this.minFilter=l!==void 0?l:on,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const hh=new qe,Ec=new Ml(1,1),fh=new ih,dh=new _d,ph=new ch,Tc=[],Ac=[],Rc=new Float32Array(16),Cc=new Float32Array(9),Pc=new Float32Array(4);function Rs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Tc[s];if(r===void 0&&(r=new Float32Array(s),Tc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Re(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ce(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function uo(i,t){let e=Ac[t];e===void 0&&(e=new Int32Array(t),Ac[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Ig(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function zg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2fv(this.addr,t),Ce(e,t)}}function Ug(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;i.uniform3fv(this.addr,t),Ce(e,t)}}function Ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4fv(this.addr,t),Ce(e,t)}}function Fg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Pc.set(n),i.uniformMatrix2fv(this.addr,!1,Pc),Ce(e,n)}}function Og(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Cc.set(n),i.uniformMatrix3fv(this.addr,!1,Cc),Ce(e,n)}}function kg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ce(e,t)}else{if(Re(e,n))return;Rc.set(n),i.uniformMatrix4fv(this.addr,!1,Rc),Ce(e,n)}}function Bg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Gg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2iv(this.addr,t),Ce(e,t)}}function Hg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3iv(this.addr,t),Ce(e,t)}}function Vg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4iv(this.addr,t),Ce(e,t)}}function Wg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Xg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;i.uniform2uiv(this.addr,t),Ce(e,t)}}function qg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;i.uniform3uiv(this.addr,t),Ce(e,t)}}function Yg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;i.uniform4uiv(this.addr,t),Ce(e,t)}}function $g(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ec.compareFunction=th,r=Ec):r=hh,e.setTexture2D(t||r,s)}function jg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||dh,s)}function Kg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||ph,s)}function Zg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||fh,s)}function Jg(i){switch(i){case 5126:return Ig;case 35664:return zg;case 35665:return Ug;case 35666:return Ng;case 35674:return Fg;case 35675:return Og;case 35676:return kg;case 5124:case 35670:return Bg;case 35667:case 35671:return Gg;case 35668:case 35672:return Hg;case 35669:case 35673:return Vg;case 5125:return Wg;case 36294:return Xg;case 36295:return qg;case 36296:return Yg;case 35678:case 36198:case 36298:case 36306:case 35682:return $g;case 35679:case 36299:case 36307:return jg;case 35680:case 36300:case 36308:case 36293:return Kg;case 36289:case 36303:case 36311:case 36292:return Zg}}function Qg(i,t){i.uniform1fv(this.addr,t)}function t0(i,t){const e=Rs(t,this.size,2);i.uniform2fv(this.addr,e)}function e0(i,t){const e=Rs(t,this.size,3);i.uniform3fv(this.addr,e)}function n0(i,t){const e=Rs(t,this.size,4);i.uniform4fv(this.addr,e)}function i0(i,t){const e=Rs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function s0(i,t){const e=Rs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function r0(i,t){const e=Rs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function o0(i,t){i.uniform1iv(this.addr,t)}function a0(i,t){i.uniform2iv(this.addr,t)}function l0(i,t){i.uniform3iv(this.addr,t)}function c0(i,t){i.uniform4iv(this.addr,t)}function u0(i,t){i.uniform1uiv(this.addr,t)}function h0(i,t){i.uniform2uiv(this.addr,t)}function f0(i,t){i.uniform3uiv(this.addr,t)}function d0(i,t){i.uniform4uiv(this.addr,t)}function p0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||hh,r[o])}function m0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||dh,r[o])}function g0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||ph,r[o])}function x0(i,t,e){const n=this.cache,s=t.length,r=uo(e,s);Re(n,r)||(i.uniform1iv(this.addr,r),Ce(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||fh,r[o])}function v0(i){switch(i){case 5126:return Qg;case 35664:return t0;case 35665:return e0;case 35666:return n0;case 35674:return i0;case 35675:return s0;case 35676:return r0;case 5124:case 35670:return o0;case 35667:case 35671:return a0;case 35668:case 35672:return l0;case 35669:case 35673:return c0;case 5125:return u0;case 36294:return h0;case 36295:return f0;case 36296:return d0;case 35678:case 36198:case 36298:case 36306:case 35682:return p0;case 35679:case 36299:case 36307:return m0;case 35680:case 36300:case 36308:case 36293:return g0;case 36289:case 36303:case 36311:case 36292:return x0}}class _0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Jg(e.type)}}class y0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=v0(e.type)}}class M0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Yo=/(\w+)(\])?(\[|\.)?/g;function Lc(i,t){i.seq.push(t),i.map[t.id]=t}function S0(i,t,e){const n=i.name,s=n.length;for(Yo.lastIndex=0;;){const r=Yo.exec(n),o=Yo.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Lc(e,c===void 0?new _0(a,i,t):new y0(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new M0(a),Lc(e,d)),e=d}}}class eo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);S0(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Dc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const b0=37297;let w0=0;function E0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Ic=new Qt;function T0(i){re._getMatrix(Ic,re.workingColorSpace,i);const t=`mat3( ${Ic.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(i)){case co:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function zc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+E0(i.getShaderSource(t),o)}else return s}function A0(i,t){const e=T0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function R0(i,t){let e;switch(t){case Fu:e="Linear";break;case Ou:e="Reinhard";break;case ku:e="Cineon";break;case Bu:e="ACESFilmic";break;case Gu:e="AgX";break;case Hu:e="Neutral";break;case Ff:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Cr=new Q;function C0(){re.getLuminanceCoefficients(Cr);const i=Cr.x.toFixed(4),t=Cr.y.toFixed(4),e=Cr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function P0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function L0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function D0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ks(i){return i!==""}function Uc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const I0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Za(i){return i.replace(I0,U0)}const z0=new Map;function U0(i,t){let e=te[t];if(e===void 0){const n=z0.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Za(e)}const N0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fc(i){return i.replace(N0,F0)}function F0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Oc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function O0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Nu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===gf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Vn&&(t="SHADOWMAP_TYPE_VSM"),t}function k0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case gs:case xs:t="ENVMAP_TYPE_CUBE";break;case ao:t="ENVMAP_TYPE_CUBE_UV";break}return t}function B0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case xs:t="ENVMAP_MODE_REFRACTION";break}return t}function G0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ll:t="ENVMAP_BLENDING_MULTIPLY";break;case Uf:t="ENVMAP_BLENDING_MIX";break;case Nf:t="ENVMAP_BLENDING_ADD";break}return t}function H0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function V0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=O0(e),c=k0(e),u=B0(e),d=G0(e),f=H0(e),h=P0(e),m=L0(r),x=s.createProgram();let g,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ks).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ks).join(`
`),p.length>0&&(p+=`
`)):(g=[Oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),p=[Oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xi?"#define TONE_MAPPING":"",e.toneMapping!==xi?te.tonemapping_pars_fragment:"",e.toneMapping!==xi?R0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,A0("linearToOutputTexel",e.outputColorSpace),C0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ks).join(`
`)),o=Za(o),o=Uc(o,e),o=Nc(o,e),a=Za(a),a=Uc(a,e),a=Nc(a,e),o=Fc(o),a=Fc(a),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=b+g+o,v=b+p+a,T=Dc(s,s.VERTEX_SHADER,M),_=Dc(s,s.FRAGMENT_SHADER,v);s.attachShader(x,T),s.attachShader(x,_),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function S(R){if(i.debug.checkShaderErrors){const F=s.getProgramInfoLog(x).trim(),B=s.getShaderInfoLog(T).trim(),Y=s.getShaderInfoLog(_).trim();let Z=!0,H=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Z=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,_);else{const V=zc(s,T,"vertex"),k=zc(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+F+`
`+V+`
`+k)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(B===""||Y==="")&&(H=!1);H&&(R.diagnostics={runnable:Z,programLog:F,vertexShader:{log:B,prefix:g},fragmentShader:{log:Y,prefix:p}})}s.deleteShader(T),s.deleteShader(_),E=new eo(s,x),w=D0(s,x)}let E;this.getUniforms=function(){return E===void 0&&S(this),E};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,b0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=w0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=_,this}let W0=0;class X0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new q0(t),e.set(t,n)),n}}class q0{constructor(t){this.id=W0++,this.code=t,this.usedTimes=0}}function Y0(i,t,e,n,s,r,o){const a=new xl,l=new X0,c=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures;let h=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,y,R,F,B){const Y=F.fog,Z=B.geometry,H=w.isMeshStandardMaterial?F.environment:null,V=(w.isMeshStandardMaterial?e:t).get(w.envMap||H),k=V&&V.mapping===ao?V.image.height:null,tt=m[w.type];w.precision!==null&&(h=s.getMaxPrecision(w.precision),h!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const ut=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,rt=ut!==void 0?ut.length:0;let At=0;Z.morphAttributes.position!==void 0&&(At=1),Z.morphAttributes.normal!==void 0&&(At=2),Z.morphAttributes.color!==void 0&&(At=3);let Ct,lt,wt,zt;if(tt){const Rt=Ze[tt];Ct=Rt.vertexShader,lt=Rt.fragmentShader}else Ct=w.vertexShader,lt=w.fragmentShader,l.update(w),wt=l.getVertexShaderID(w),zt=l.getFragmentShaderID(w);const xt=i.getRenderTarget(),Ut=i.state.buffers.depth.getReversed(),L=B.isInstancedMesh===!0,W=B.isBatchedMesh===!0,it=!!w.map,nt=!!w.matcap,K=!!V,U=!!w.aoMap,Et=!!w.lightMap,dt=!!w.bumpMap,St=!!w.normalMap,yt=!!w.displacementMap,Ot=!!w.emissiveMap,st=!!w.metalnessMap,D=!!w.roughnessMap,A=w.anisotropy>0,C=w.clearcoat>0,z=w.dispersion>0,q=w.iridescence>0,G=w.sheen>0,Tt=w.transmission>0,ft=A&&!!w.anisotropyMap,_t=C&&!!w.clearcoatMap,It=C&&!!w.clearcoatNormalMap,Mt=C&&!!w.clearcoatRoughnessMap,O=q&&!!w.iridescenceMap,$=q&&!!w.iridescenceThicknessMap,j=G&&!!w.sheenColorMap,N=G&&!!w.sheenRoughnessMap,ht=!!w.specularMap,vt=!!w.specularColorMap,Lt=!!w.specularIntensityMap,X=Tt&&!!w.transmissionMap,gt=Tt&&!!w.thicknessMap,ct=!!w.gradientMap,P=!!w.alphaMap,J=w.alphaTest>0,et=!!w.alphaHash,bt=!!w.extensions;let Dt=xi;w.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(Dt=i.toneMapping);const Pt={shaderID:tt,shaderType:w.type,shaderName:w.name,vertexShader:Ct,fragmentShader:lt,defines:w.defines,customVertexShaderID:wt,customFragmentShaderID:zt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:W,batchingColor:W&&B._colorsTexture!==null,instancing:L,instancingColor:L&&B.instanceColor!==null,instancingMorph:L&&B.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:xt===null?i.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:ws,alphaToCoverage:!!w.alphaToCoverage,map:it,matcap:nt,envMap:K,envMapMode:K&&V.mapping,envMapCubeUVHeight:k,aoMap:U,lightMap:Et,bumpMap:dt,normalMap:St,displacementMap:f&&yt,emissiveMap:Ot,normalMapObjectSpace:St&&w.normalMapType===Gf,normalMapTangentSpace:St&&w.normalMapType===Qu,metalnessMap:st,roughnessMap:D,anisotropy:A,anisotropyMap:ft,clearcoat:C,clearcoatMap:_t,clearcoatNormalMap:It,clearcoatRoughnessMap:Mt,dispersion:z,iridescence:q,iridescenceMap:O,iridescenceThicknessMap:$,sheen:G,sheenColorMap:j,sheenRoughnessMap:N,specularMap:ht,specularColorMap:vt,specularIntensityMap:Lt,transmission:Tt,transmissionMap:X,thicknessMap:gt,gradientMap:ct,opaque:w.transparent===!1&&w.blending===hs&&w.alphaToCoverage===!1,alphaMap:P,alphaTest:J,alphaHash:et,combine:w.combine,mapUv:it&&x(w.map.channel),aoMapUv:U&&x(w.aoMap.channel),lightMapUv:Et&&x(w.lightMap.channel),bumpMapUv:dt&&x(w.bumpMap.channel),normalMapUv:St&&x(w.normalMap.channel),displacementMapUv:yt&&x(w.displacementMap.channel),emissiveMapUv:Ot&&x(w.emissiveMap.channel),metalnessMapUv:st&&x(w.metalnessMap.channel),roughnessMapUv:D&&x(w.roughnessMap.channel),anisotropyMapUv:ft&&x(w.anisotropyMap.channel),clearcoatMapUv:_t&&x(w.clearcoatMap.channel),clearcoatNormalMapUv:It&&x(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Mt&&x(w.clearcoatRoughnessMap.channel),iridescenceMapUv:O&&x(w.iridescenceMap.channel),iridescenceThicknessMapUv:$&&x(w.iridescenceThicknessMap.channel),sheenColorMapUv:j&&x(w.sheenColorMap.channel),sheenRoughnessMapUv:N&&x(w.sheenRoughnessMap.channel),specularMapUv:ht&&x(w.specularMap.channel),specularColorMapUv:vt&&x(w.specularColorMap.channel),specularIntensityMapUv:Lt&&x(w.specularIntensityMap.channel),transmissionMapUv:X&&x(w.transmissionMap.channel),thicknessMapUv:gt&&x(w.thicknessMap.channel),alphaMapUv:P&&x(w.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(St||A),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!Z.attributes.uv&&(it||P),fog:!!Y,useFog:w.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Ut,skinning:B.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:rt,morphTextureStride:At,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Dt,decodeVideoTexture:it&&w.map.isVideoTexture===!0&&re.getTransfer(w.map.colorSpace)===fe,decodeVideoTextureEmissive:Ot&&w.emissiveMap.isVideoTexture===!0&&re.getTransfer(w.emissiveMap.colorSpace)===fe,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===ye,flipSided:w.side===Je,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:bt&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&w.extensions.multiDraw===!0||W)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Pt.vertexUv1s=c.has(1),Pt.vertexUv2s=c.has(2),Pt.vertexUv3s=c.has(3),c.clear(),Pt}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const R in w.defines)y.push(R),y.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(b(y,w),M(y,w),y.push(i.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function b(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function M(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const y=m[w.type];let R;if(y){const F=Ze[y];R=_i.clone(F.uniforms)}else R=w.uniforms;return R}function T(w,y){let R;for(let F=0,B=u.length;F<B;F++){const Y=u[F];if(Y.cacheKey===y){R=Y,++R.usedTimes;break}}return R===void 0&&(R=new V0(i,y,w,r),u.push(R)),R}function _(w){if(--w.usedTimes===0){const y=u.indexOf(w);u[y]=u[u.length-1],u.pop(),w.destroy()}}function S(w){l.remove(w)}function E(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:_,releaseShaderCache:S,programs:u,dispose:E}}function $0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function j0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function kc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Bc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,f,h,m,x,g){let p=i[t];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:m,renderOrder:d.renderOrder,z:x,group:g},i[t]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=m,p.renderOrder=d.renderOrder,p.z=x,p.group=g),t++,p}function a(d,f,h,m,x,g){const p=o(d,f,h,m,x,g);h.transmission>0?n.push(p):h.transparent===!0?s.push(p):e.push(p)}function l(d,f,h,m,x,g){const p=o(d,f,h,m,x,g);h.transmission>0?n.unshift(p):h.transparent===!0?s.unshift(p):e.unshift(p)}function c(d,f){e.length>1&&e.sort(d||j0),n.length>1&&n.sort(f||kc),s.length>1&&s.sort(f||kc)}function u(){for(let d=t,f=i.length;d<f;d++){const h=i[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function K0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Bc,i.set(n,[o])):s>=r.length?(o=new Bc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function Z0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Q,color:new Ht};break;case"SpotLight":e={position:new Q,direction:new Q,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Q,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Q,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":e={color:new Ht,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return i[t.id]=e,e}}}function J0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let Q0=0;function tx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function ex(i){const t=new Z0,e=J0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Q);const s=new Q,r=new ae,o=new ae;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,m=0,x=0,g=0,p=0,b=0,M=0,v=0,T=0,_=0,S=0;c.sort(tx);for(let w=0,y=c.length;w<y;w++){const R=c[w],F=R.color,B=R.intensity,Y=R.distance,Z=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=F.r*B,d+=F.g*B,f+=F.b*B;else if(R.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(R.sh.coefficients[H],B);S++}else if(R.isDirectionalLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const V=R.shadow,k=e.get(R);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,n.directionalShadow[h]=k,n.directionalShadowMap[h]=Z,n.directionalShadowMatrix[h]=R.shadow.matrix,b++}n.directional[h]=H,h++}else if(R.isSpotLight){const H=t.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(F).multiplyScalar(B),H.distance=Y,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,n.spot[x]=H;const V=R.shadow;if(R.map&&(n.spotLightMap[T]=R.map,T++,V.updateMatrices(R),R.castShadow&&_++),n.spotLightMatrix[x]=V.matrix,R.castShadow){const k=e.get(R);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,n.spotShadow[x]=k,n.spotShadowMap[x]=Z,v++}x++}else if(R.isRectAreaLight){const H=t.get(R);H.color.copy(F).multiplyScalar(B),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=H,g++}else if(R.isPointLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const V=R.shadow,k=e.get(R);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,k.shadowCameraNear=V.camera.near,k.shadowCameraFar=V.camera.far,n.pointShadow[m]=k,n.pointShadowMap[m]=Z,n.pointShadowMatrix[m]=R.shadow.matrix,M++}n.point[m]=H,m++}else if(R.isHemisphereLight){const H=t.get(R);H.skyColor.copy(R.color).multiplyScalar(B),H.groundColor.copy(R.groundColor).multiplyScalar(B),n.hemi[p]=H,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ft.LTC_FLOAT_1,n.rectAreaLTC2=Ft.LTC_FLOAT_2):(n.rectAreaLTC1=Ft.LTC_HALF_1,n.rectAreaLTC2=Ft.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==h||E.pointLength!==m||E.spotLength!==x||E.rectAreaLength!==g||E.hemiLength!==p||E.numDirectionalShadows!==b||E.numPointShadows!==M||E.numSpotShadows!==v||E.numSpotMaps!==T||E.numLightProbes!==S)&&(n.directional.length=h,n.spot.length=x,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+T-_,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=S,E.directionalLength=h,E.pointLength=m,E.spotLength=x,E.rectAreaLength=g,E.hemiLength=p,E.numDirectionalShadows=b,E.numPointShadows=M,E.numSpotShadows=v,E.numSpotMaps=T,E.numLightProbes=S,n.version=Q0++)}function l(c,u){let d=0,f=0,h=0,m=0,x=0;const g=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const M=c[p];if(M.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(M.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),h++}else if(M.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(M.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(M.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(g),f++}else if(M.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(g),x++}}}return{setup:a,setupView:l,state:n}}function Gc(i){const t=new ex(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function nx(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Gc(i),t.set(s,[a])):r>=o.length?(a=new Gc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class ix extends Ts{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=kf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class sx extends Ts{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const rx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ox=`uniform sampler2D shadow_pass;
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
}`;function ax(i,t,e){let n=new vl;const s=new Yt,r=new Yt,o=new oe,a=new ix({depthPacking:Bf}),l=new sx,c={},u=e.maxTextureSize,d={[vi]:Je,[Je]:vi,[ye]:ye},f=new Ae({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:rx,fragmentShader:ox}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const m=new pe;m.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new jt(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Nu;let p=this.type;this.render=function(_,S,E){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||_.length===0)return;const w=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),F=i.state;F.setBlending($n),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const B=p!==Vn&&this.type===Vn,Y=p===Vn&&this.type!==Vn;for(let Z=0,H=_.length;Z<H;Z++){const V=_[Z],k=V.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const tt=k.getFrameExtents();if(s.multiply(tt),r.copy(k.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/tt.x),s.x=r.x*tt.x,k.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/tt.y),s.y=r.y*tt.y,k.mapSize.y=r.y)),k.map===null||B===!0||Y===!0){const rt=this.type!==Vn?{minFilter:on,magFilter:on}:{};k.map!==null&&k.map.dispose(),k.map=new fn(s.x,s.y,rt),k.map.texture.name=V.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const ut=k.getViewportCount();for(let rt=0;rt<ut;rt++){const At=k.getViewport(rt);o.set(r.x*At.x,r.y*At.y,r.x*At.z,r.y*At.w),F.viewport(o),k.updateMatrices(V,rt),n=k.getFrustum(),v(S,E,k.camera,V,this.type)}k.isPointLightShadow!==!0&&this.type===Vn&&b(k,E),k.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(w,y,R)};function b(_,S){const E=t.update(x);f.defines.VSM_SAMPLES!==_.blurSamples&&(f.defines.VSM_SAMPLES=_.blurSamples,h.defines.VSM_SAMPLES=_.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new fn(s.x,s.y)),f.uniforms.shadow_pass.value=_.map.texture,f.uniforms.resolution.value=_.mapSize,f.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(S,null,E,f,x,null),h.uniforms.shadow_pass.value=_.mapPass.texture,h.uniforms.resolution.value=_.mapSize,h.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(S,null,E,h,x,null)}function M(_,S,E,w){let y=null;const R=E.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(R!==void 0)y=R;else if(y=E.isPointLight===!0?l:a,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0){const F=y.uuid,B=S.uuid;let Y=c[F];Y===void 0&&(Y={},c[F]=Y);let Z=Y[B];Z===void 0&&(Z=y.clone(),Y[B]=Z,S.addEventListener("dispose",T)),y=Z}if(y.visible=S.visible,y.wireframe=S.wireframe,w===Vn?y.side=S.shadowSide!==null?S.shadowSide:S.side:y.side=S.shadowSide!==null?S.shadowSide:d[S.side],y.alphaMap=S.alphaMap,y.alphaTest=S.alphaTest,y.map=S.map,y.clipShadows=S.clipShadows,y.clippingPlanes=S.clippingPlanes,y.clipIntersection=S.clipIntersection,y.displacementMap=S.displacementMap,y.displacementScale=S.displacementScale,y.displacementBias=S.displacementBias,y.wireframeLinewidth=S.wireframeLinewidth,y.linewidth=S.linewidth,E.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const F=i.properties.get(y);F.light=E}return y}function v(_,S,E,w,y){if(_.visible===!1)return;if(_.layers.test(S.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&y===Vn)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,_.matrixWorld);const B=t.update(_),Y=_.material;if(Array.isArray(Y)){const Z=B.groups;for(let H=0,V=Z.length;H<V;H++){const k=Z[H],tt=Y[k.materialIndex];if(tt&&tt.visible){const ut=M(_,tt,w,y);_.onBeforeShadow(i,_,S,E,B,ut,k),i.renderBufferDirect(E,null,B,ut,_,k),_.onAfterShadow(i,_,S,E,B,ut,k)}}}else if(Y.visible){const Z=M(_,Y,w,y);_.onBeforeShadow(i,_,S,E,B,Z,null),i.renderBufferDirect(E,null,B,Z,_,null),_.onAfterShadow(i,_,S,E,B,Z,null)}}const F=_.children;for(let B=0,Y=F.length;B<Y;B++)v(F[B],S,E,w,y)}function T(_){_.target.removeEventListener("dispose",T);for(const E in c){const w=c[E],y=_.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const lx={[da]:pa,[ma]:va,[ga]:_a,[ms]:xa,[pa]:da,[va]:ma,[_a]:ga,[xa]:ms};function cx(i,t){function e(){let X=!1;const gt=new oe;let ct=null;const P=new oe(0,0,0,0);return{setMask:function(J){ct!==J&&!X&&(i.colorMask(J,J,J,J),ct=J)},setLocked:function(J){X=J},setClear:function(J,et,bt,Dt,Pt){Pt===!0&&(J*=Dt,et*=Dt,bt*=Dt),gt.set(J,et,bt,Dt),P.equals(gt)===!1&&(i.clearColor(J,et,bt,Dt),P.copy(gt))},reset:function(){X=!1,ct=null,P.set(-1,0,0,0)}}}function n(){let X=!1,gt=!1,ct=null,P=null,J=null;return{setReversed:function(et){if(gt!==et){const bt=t.get("EXT_clip_control");gt?bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.ZERO_TO_ONE_EXT):bt.clipControlEXT(bt.LOWER_LEFT_EXT,bt.NEGATIVE_ONE_TO_ONE_EXT);const Dt=J;J=null,this.setClear(Dt)}gt=et},getReversed:function(){return gt},setTest:function(et){et?xt(i.DEPTH_TEST):Ut(i.DEPTH_TEST)},setMask:function(et){ct!==et&&!X&&(i.depthMask(et),ct=et)},setFunc:function(et){if(gt&&(et=lx[et]),P!==et){switch(et){case da:i.depthFunc(i.NEVER);break;case pa:i.depthFunc(i.ALWAYS);break;case ma:i.depthFunc(i.LESS);break;case ms:i.depthFunc(i.LEQUAL);break;case ga:i.depthFunc(i.EQUAL);break;case xa:i.depthFunc(i.GEQUAL);break;case va:i.depthFunc(i.GREATER);break;case _a:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}P=et}},setLocked:function(et){X=et},setClear:function(et){J!==et&&(gt&&(et=1-et),i.clearDepth(et),J=et)},reset:function(){X=!1,ct=null,P=null,J=null,gt=!1}}}function s(){let X=!1,gt=null,ct=null,P=null,J=null,et=null,bt=null,Dt=null,Pt=null;return{setTest:function(Rt){X||(Rt?xt(i.STENCIL_TEST):Ut(i.STENCIL_TEST))},setMask:function(Rt){gt!==Rt&&!X&&(i.stencilMask(Rt),gt=Rt)},setFunc:function(Rt,Bt,Gt){(ct!==Rt||P!==Bt||J!==Gt)&&(i.stencilFunc(Rt,Bt,Gt),ct=Rt,P=Bt,J=Gt)},setOp:function(Rt,Bt,Gt){(et!==Rt||bt!==Bt||Dt!==Gt)&&(i.stencilOp(Rt,Bt,Gt),et=Rt,bt=Bt,Dt=Gt)},setLocked:function(Rt){X=Rt},setClear:function(Rt){Pt!==Rt&&(i.clearStencil(Rt),Pt=Rt)},reset:function(){X=!1,gt=null,ct=null,P=null,J=null,et=null,bt=null,Dt=null,Pt=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],m=null,x=!1,g=null,p=null,b=null,M=null,v=null,T=null,_=null,S=new Ht(0,0,0),E=0,w=!1,y=null,R=null,F=null,B=null,Y=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,V=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(k)[1]),H=V>=1):k.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),H=V>=2);let tt=null,ut={};const rt=i.getParameter(i.SCISSOR_BOX),At=i.getParameter(i.VIEWPORT),Ct=new oe().fromArray(rt),lt=new oe().fromArray(At);function wt(X,gt,ct,P){const J=new Uint8Array(4),et=i.createTexture();i.bindTexture(X,et),i.texParameteri(X,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(X,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let bt=0;bt<ct;bt++)X===i.TEXTURE_3D||X===i.TEXTURE_2D_ARRAY?i.texImage3D(gt,0,i.RGBA,1,1,P,0,i.RGBA,i.UNSIGNED_BYTE,J):i.texImage2D(gt+bt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,J);return et}const zt={};zt[i.TEXTURE_2D]=wt(i.TEXTURE_2D,i.TEXTURE_2D,1),zt[i.TEXTURE_CUBE_MAP]=wt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),zt[i.TEXTURE_2D_ARRAY]=wt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),zt[i.TEXTURE_3D]=wt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),xt(i.DEPTH_TEST),o.setFunc(ms),dt(!1),St(ql),xt(i.CULL_FACE),U($n);function xt(X){u[X]!==!0&&(i.enable(X),u[X]=!0)}function Ut(X){u[X]!==!1&&(i.disable(X),u[X]=!1)}function L(X,gt){return d[X]!==gt?(i.bindFramebuffer(X,gt),d[X]=gt,X===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=gt),X===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=gt),!0):!1}function W(X,gt){let ct=h,P=!1;if(X){ct=f.get(gt),ct===void 0&&(ct=[],f.set(gt,ct));const J=X.textures;if(ct.length!==J.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let et=0,bt=J.length;et<bt;et++)ct[et]=i.COLOR_ATTACHMENT0+et;ct.length=J.length,P=!0}}else ct[0]!==i.BACK&&(ct[0]=i.BACK,P=!0);P&&i.drawBuffers(ct)}function it(X){return m!==X?(i.useProgram(X),m=X,!0):!1}const nt={[Di]:i.FUNC_ADD,[vf]:i.FUNC_SUBTRACT,[_f]:i.FUNC_REVERSE_SUBTRACT};nt[yf]=i.MIN,nt[Mf]=i.MAX;const K={[Sf]:i.ZERO,[bf]:i.ONE,[wf]:i.SRC_COLOR,[ha]:i.SRC_ALPHA,[Pf]:i.SRC_ALPHA_SATURATE,[Rf]:i.DST_COLOR,[Tf]:i.DST_ALPHA,[Ef]:i.ONE_MINUS_SRC_COLOR,[fa]:i.ONE_MINUS_SRC_ALPHA,[Cf]:i.ONE_MINUS_DST_COLOR,[Af]:i.ONE_MINUS_DST_ALPHA,[Lf]:i.CONSTANT_COLOR,[Df]:i.ONE_MINUS_CONSTANT_COLOR,[If]:i.CONSTANT_ALPHA,[zf]:i.ONE_MINUS_CONSTANT_ALPHA};function U(X,gt,ct,P,J,et,bt,Dt,Pt,Rt){if(X===$n){x===!0&&(Ut(i.BLEND),x=!1);return}if(x===!1&&(xt(i.BLEND),x=!0),X!==xf){if(X!==g||Rt!==w){if((p!==Di||v!==Di)&&(i.blendEquation(i.FUNC_ADD),p=Di,v=Di),Rt)switch(X){case hs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ke:i.blendFunc(i.ONE,i.ONE);break;case Yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}else switch(X){case hs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ke:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Yl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $l:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",X);break}b=null,M=null,T=null,_=null,S.set(0,0,0),E=0,g=X,w=Rt}return}J=J||gt,et=et||ct,bt=bt||P,(gt!==p||J!==v)&&(i.blendEquationSeparate(nt[gt],nt[J]),p=gt,v=J),(ct!==b||P!==M||et!==T||bt!==_)&&(i.blendFuncSeparate(K[ct],K[P],K[et],K[bt]),b=ct,M=P,T=et,_=bt),(Dt.equals(S)===!1||Pt!==E)&&(i.blendColor(Dt.r,Dt.g,Dt.b,Pt),S.copy(Dt),E=Pt),g=X,w=!1}function Et(X,gt){X.side===ye?Ut(i.CULL_FACE):xt(i.CULL_FACE);let ct=X.side===Je;gt&&(ct=!ct),dt(ct),X.blending===hs&&X.transparent===!1?U($n):U(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),o.setFunc(X.depthFunc),o.setTest(X.depthTest),o.setMask(X.depthWrite),r.setMask(X.colorWrite);const P=X.stencilWrite;a.setTest(P),P&&(a.setMask(X.stencilWriteMask),a.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),a.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),Ot(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?xt(i.SAMPLE_ALPHA_TO_COVERAGE):Ut(i.SAMPLE_ALPHA_TO_COVERAGE)}function dt(X){y!==X&&(X?i.frontFace(i.CW):i.frontFace(i.CCW),y=X)}function St(X){X!==pf?(xt(i.CULL_FACE),X!==R&&(X===ql?i.cullFace(i.BACK):X===mf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ut(i.CULL_FACE),R=X}function yt(X){X!==F&&(H&&i.lineWidth(X),F=X)}function Ot(X,gt,ct){X?(xt(i.POLYGON_OFFSET_FILL),(B!==gt||Y!==ct)&&(i.polygonOffset(gt,ct),B=gt,Y=ct)):Ut(i.POLYGON_OFFSET_FILL)}function st(X){X?xt(i.SCISSOR_TEST):Ut(i.SCISSOR_TEST)}function D(X){X===void 0&&(X=i.TEXTURE0+Z-1),tt!==X&&(i.activeTexture(X),tt=X)}function A(X,gt,ct){ct===void 0&&(tt===null?ct=i.TEXTURE0+Z-1:ct=tt);let P=ut[ct];P===void 0&&(P={type:void 0,texture:void 0},ut[ct]=P),(P.type!==X||P.texture!==gt)&&(tt!==ct&&(i.activeTexture(ct),tt=ct),i.bindTexture(X,gt||zt[X]),P.type=X,P.texture=gt)}function C(){const X=ut[tt];X!==void 0&&X.type!==void 0&&(i.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function z(){try{i.compressedTexImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function q(){try{i.compressedTexImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function G(){try{i.texSubImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Tt(){try{i.texSubImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function ft(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function _t(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function It(){try{i.texStorage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function Mt(){try{i.texStorage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function O(){try{i.texImage2D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function $(){try{i.texImage3D.apply(i,arguments)}catch(X){console.error("THREE.WebGLState:",X)}}function j(X){Ct.equals(X)===!1&&(i.scissor(X.x,X.y,X.z,X.w),Ct.copy(X))}function N(X){lt.equals(X)===!1&&(i.viewport(X.x,X.y,X.z,X.w),lt.copy(X))}function ht(X,gt){let ct=c.get(gt);ct===void 0&&(ct=new WeakMap,c.set(gt,ct));let P=ct.get(X);P===void 0&&(P=i.getUniformBlockIndex(gt,X.name),ct.set(X,P))}function vt(X,gt){const P=c.get(gt).get(X);l.get(gt)!==P&&(i.uniformBlockBinding(gt,P,X.__bindingPointIndex),l.set(gt,P))}function Lt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},tt=null,ut={},d={},f=new WeakMap,h=[],m=null,x=!1,g=null,p=null,b=null,M=null,v=null,T=null,_=null,S=new Ht(0,0,0),E=0,w=!1,y=null,R=null,F=null,B=null,Y=null,Ct.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:xt,disable:Ut,bindFramebuffer:L,drawBuffers:W,useProgram:it,setBlending:U,setMaterial:Et,setFlipSided:dt,setCullFace:St,setLineWidth:yt,setPolygonOffset:Ot,setScissorTest:st,activeTexture:D,bindTexture:A,unbindTexture:C,compressedTexImage2D:z,compressedTexImage3D:q,texImage2D:O,texImage3D:$,updateUBOMapping:ht,uniformBlockBinding:vt,texStorage2D:It,texStorage3D:Mt,texSubImage2D:G,texSubImage3D:Tt,compressedTexSubImage2D:ft,compressedTexSubImage3D:_t,scissor:j,viewport:N,reset:Lt}}function Hc(i,t,e,n){const s=ux(n);switch(e){case Yu:return i*t;case ju:return i*t;case Ku:return i*t*2;case lo:return i*t/s.components*s.byteLength;case fl:return i*t/s.components*s.byteLength;case Zu:return i*t*2/s.components*s.byteLength;case dl:return i*t*2/s.components*s.byteLength;case $u:return i*t*3/s.components*s.byteLength;case Mn:return i*t*4/s.components*s.byteLength;case pl:return i*t*4/s.components*s.byteLength;case Kr:case Zr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Jr:case Qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wa:case Ta:return Math.max(i,16)*Math.max(t,8)/4;case ba:case Ea:return Math.max(i,8)*Math.max(t,8)/2;case Aa:case Ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ca:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Pa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case La:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Da:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case za:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Na:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ka:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ha:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case to:case Wa:case Xa:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ju:case qa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Ya:case $a:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function ux(i){switch(i){case zn:case Wu:return{byteLength:1,components:1};case nr:case Xu:case In:return{byteLength:2,components:1};case ul:case hl:return{byteLength:2,components:4};case Oi:case cl:case Ln:return{byteLength:4,components:1};case qu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function hx(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Yt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(D,A){return h?new OffscreenCanvas(D,A):ro("canvas")}function x(D,A,C){let z=1;const q=st(D);if((q.width>C||q.height>C)&&(z=C/Math.max(q.width,q.height)),z<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const G=Math.floor(z*q.width),Tt=Math.floor(z*q.height);d===void 0&&(d=m(G,Tt));const ft=A?m(G,Tt):d;return ft.width=G,ft.height=Tt,ft.getContext("2d").drawImage(D,0,0,G,Tt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+G+"x"+Tt+")."),ft}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),D;return D}function g(D){return D.generateMipmaps}function p(D){i.generateMipmap(D)}function b(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(D,A,C,z,q=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let G=A;if(A===i.RED&&(C===i.FLOAT&&(G=i.R32F),C===i.HALF_FLOAT&&(G=i.R16F),C===i.UNSIGNED_BYTE&&(G=i.R8)),A===i.RED_INTEGER&&(C===i.UNSIGNED_BYTE&&(G=i.R8UI),C===i.UNSIGNED_SHORT&&(G=i.R16UI),C===i.UNSIGNED_INT&&(G=i.R32UI),C===i.BYTE&&(G=i.R8I),C===i.SHORT&&(G=i.R16I),C===i.INT&&(G=i.R32I)),A===i.RG&&(C===i.FLOAT&&(G=i.RG32F),C===i.HALF_FLOAT&&(G=i.RG16F),C===i.UNSIGNED_BYTE&&(G=i.RG8)),A===i.RG_INTEGER&&(C===i.UNSIGNED_BYTE&&(G=i.RG8UI),C===i.UNSIGNED_SHORT&&(G=i.RG16UI),C===i.UNSIGNED_INT&&(G=i.RG32UI),C===i.BYTE&&(G=i.RG8I),C===i.SHORT&&(G=i.RG16I),C===i.INT&&(G=i.RG32I)),A===i.RGB_INTEGER&&(C===i.UNSIGNED_BYTE&&(G=i.RGB8UI),C===i.UNSIGNED_SHORT&&(G=i.RGB16UI),C===i.UNSIGNED_INT&&(G=i.RGB32UI),C===i.BYTE&&(G=i.RGB8I),C===i.SHORT&&(G=i.RGB16I),C===i.INT&&(G=i.RGB32I)),A===i.RGBA_INTEGER&&(C===i.UNSIGNED_BYTE&&(G=i.RGBA8UI),C===i.UNSIGNED_SHORT&&(G=i.RGBA16UI),C===i.UNSIGNED_INT&&(G=i.RGBA32UI),C===i.BYTE&&(G=i.RGBA8I),C===i.SHORT&&(G=i.RGBA16I),C===i.INT&&(G=i.RGBA32I)),A===i.RGB&&C===i.UNSIGNED_INT_5_9_9_9_REV&&(G=i.RGB9_E5),A===i.RGBA){const Tt=q?co:re.getTransfer(z);C===i.FLOAT&&(G=i.RGBA32F),C===i.HALF_FLOAT&&(G=i.RGBA16F),C===i.UNSIGNED_BYTE&&(G=Tt===fe?i.SRGB8_ALPHA8:i.RGBA8),C===i.UNSIGNED_SHORT_4_4_4_4&&(G=i.RGBA4),C===i.UNSIGNED_SHORT_5_5_5_1&&(G=i.RGB5_A1)}return(G===i.R16F||G===i.R32F||G===i.RG16F||G===i.RG32F||G===i.RGBA16F||G===i.RGBA32F)&&t.get("EXT_color_buffer_float"),G}function v(D,A){let C;return D?A===null||A===Oi||A===vs?C=i.DEPTH24_STENCIL8:A===Ln?C=i.DEPTH32F_STENCIL8:A===nr&&(C=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Oi||A===vs?C=i.DEPTH_COMPONENT24:A===Ln?C=i.DEPTH_COMPONENT32F:A===nr&&(C=i.DEPTH_COMPONENT16),C}function T(D,A){return g(D)===!0||D.isFramebufferTexture&&D.minFilter!==on&&D.minFilter!==yn?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function _(D){const A=D.target;A.removeEventListener("dispose",_),E(A),A.isVideoTexture&&u.delete(A)}function S(D){const A=D.target;A.removeEventListener("dispose",S),y(A)}function E(D){const A=n.get(D);if(A.__webglInit===void 0)return;const C=D.source,z=f.get(C);if(z){const q=z[A.__cacheKey];q.usedTimes--,q.usedTimes===0&&w(D),Object.keys(z).length===0&&f.delete(C)}n.remove(D)}function w(D){const A=n.get(D);i.deleteTexture(A.__webglTexture);const C=D.source,z=f.get(C);delete z[A.__cacheKey],o.memory.textures--}function y(D){const A=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(A.__webglFramebuffer[z]))for(let q=0;q<A.__webglFramebuffer[z].length;q++)i.deleteFramebuffer(A.__webglFramebuffer[z][q]);else i.deleteFramebuffer(A.__webglFramebuffer[z]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[z])}else{if(Array.isArray(A.__webglFramebuffer))for(let z=0;z<A.__webglFramebuffer.length;z++)i.deleteFramebuffer(A.__webglFramebuffer[z]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let z=0;z<A.__webglColorRenderbuffer.length;z++)A.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[z]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const C=D.textures;for(let z=0,q=C.length;z<q;z++){const G=n.get(C[z]);G.__webglTexture&&(i.deleteTexture(G.__webglTexture),o.memory.textures--),n.remove(C[z])}n.remove(D)}let R=0;function F(){R=0}function B(){const D=R;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),R+=1,D}function Y(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function Z(D,A){const C=n.get(D);if(D.isVideoTexture&&yt(D),D.isRenderTargetTexture===!1&&D.version>0&&C.__version!==D.version){const z=D.image;if(z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{lt(C,D,A);return}}e.bindTexture(i.TEXTURE_2D,C.__webglTexture,i.TEXTURE0+A)}function H(D,A){const C=n.get(D);if(D.version>0&&C.__version!==D.version){lt(C,D,A);return}e.bindTexture(i.TEXTURE_2D_ARRAY,C.__webglTexture,i.TEXTURE0+A)}function V(D,A){const C=n.get(D);if(D.version>0&&C.__version!==D.version){lt(C,D,A);return}e.bindTexture(i.TEXTURE_3D,C.__webglTexture,i.TEXTURE0+A)}function k(D,A){const C=n.get(D);if(D.version>0&&C.__version!==D.version){wt(C,D,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+A)}const tt={[io]:i.REPEAT,[zi]:i.CLAMP_TO_EDGE,[Sa]:i.MIRRORED_REPEAT},ut={[on]:i.NEAREST,[Of]:i.NEAREST_MIPMAP_NEAREST,[cr]:i.NEAREST_MIPMAP_LINEAR,[yn]:i.LINEAR,[Mo]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},rt={[Hf]:i.NEVER,[$f]:i.ALWAYS,[Vf]:i.LESS,[th]:i.LEQUAL,[Wf]:i.EQUAL,[Yf]:i.GEQUAL,[Xf]:i.GREATER,[qf]:i.NOTEQUAL};function At(D,A){if(A.type===Ln&&t.has("OES_texture_float_linear")===!1&&(A.magFilter===yn||A.magFilter===Mo||A.magFilter===cr||A.magFilter===Ui||A.minFilter===yn||A.minFilter===Mo||A.minFilter===cr||A.minFilter===Ui)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,tt[A.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,tt[A.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,tt[A.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,ut[A.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,ut[A.minFilter]),A.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,rt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===on||A.minFilter!==cr&&A.minFilter!==Ui||A.type===Ln&&t.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const C=t.get("EXT_texture_filter_anisotropic");i.texParameterf(D,C.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function Ct(D,A){let C=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",_));const z=A.source;let q=f.get(z);q===void 0&&(q={},f.set(z,q));const G=Y(A);if(G!==D.__cacheKey){q[G]===void 0&&(q[G]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,C=!0),q[G].usedTimes++;const Tt=q[D.__cacheKey];Tt!==void 0&&(q[D.__cacheKey].usedTimes--,Tt.usedTimes===0&&w(A)),D.__cacheKey=G,D.__webglTexture=q[G].texture}return C}function lt(D,A,C){let z=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(z=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(z=i.TEXTURE_3D);const q=Ct(D,A),G=A.source;e.bindTexture(z,D.__webglTexture,i.TEXTURE0+C);const Tt=n.get(G);if(G.version!==Tt.__version||q===!0){e.activeTexture(i.TEXTURE0+C);const ft=re.getPrimaries(re.workingColorSpace),_t=A.colorSpace===fi?null:re.getPrimaries(A.colorSpace),It=A.colorSpace===fi||ft===_t?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let Mt=x(A.image,!1,s.maxTextureSize);Mt=Ot(A,Mt);const O=r.convert(A.format,A.colorSpace),$=r.convert(A.type);let j=M(A.internalFormat,O,$,A.colorSpace,A.isVideoTexture);At(z,A);let N;const ht=A.mipmaps,vt=A.isVideoTexture!==!0,Lt=Tt.__version===void 0||q===!0,X=G.dataReady,gt=T(A,Mt);if(A.isDepthTexture)j=v(A.format===_s,A.type),Lt&&(vt?e.texStorage2D(i.TEXTURE_2D,1,j,Mt.width,Mt.height):e.texImage2D(i.TEXTURE_2D,0,j,Mt.width,Mt.height,0,O,$,null));else if(A.isDataTexture)if(ht.length>0){vt&&Lt&&e.texStorage2D(i.TEXTURE_2D,gt,j,ht[0].width,ht[0].height);for(let ct=0,P=ht.length;ct<P;ct++)N=ht[ct],vt?X&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,N.width,N.height,O,$,N.data):e.texImage2D(i.TEXTURE_2D,ct,j,N.width,N.height,0,O,$,N.data);A.generateMipmaps=!1}else vt?(Lt&&e.texStorage2D(i.TEXTURE_2D,gt,j,Mt.width,Mt.height),X&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Mt.width,Mt.height,O,$,Mt.data)):e.texImage2D(i.TEXTURE_2D,0,j,Mt.width,Mt.height,0,O,$,Mt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){vt&&Lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,j,ht[0].width,ht[0].height,Mt.depth);for(let ct=0,P=ht.length;ct<P;ct++)if(N=ht[ct],A.format!==Mn)if(O!==null)if(vt){if(X)if(A.layerUpdates.size>0){const J=Hc(N.width,N.height,A.format,A.type);for(const et of A.layerUpdates){const bt=N.data.subarray(et*J/N.data.BYTES_PER_ELEMENT,(et+1)*J/N.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,et,N.width,N.height,1,O,bt)}A.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,N.width,N.height,Mt.depth,O,N.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,j,N.width,N.height,Mt.depth,0,N.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else vt?X&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,N.width,N.height,Mt.depth,O,$,N.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,j,N.width,N.height,Mt.depth,0,O,$,N.data)}else{vt&&Lt&&e.texStorage2D(i.TEXTURE_2D,gt,j,ht[0].width,ht[0].height);for(let ct=0,P=ht.length;ct<P;ct++)N=ht[ct],A.format!==Mn?O!==null?vt?X&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,N.width,N.height,O,N.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,j,N.width,N.height,0,N.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):vt?X&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,N.width,N.height,O,$,N.data):e.texImage2D(i.TEXTURE_2D,ct,j,N.width,N.height,0,O,$,N.data)}else if(A.isDataArrayTexture)if(vt){if(Lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,gt,j,Mt.width,Mt.height,Mt.depth),X)if(A.layerUpdates.size>0){const ct=Hc(Mt.width,Mt.height,A.format,A.type);for(const P of A.layerUpdates){const J=Mt.data.subarray(P*ct/Mt.data.BYTES_PER_ELEMENT,(P+1)*ct/Mt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,P,Mt.width,Mt.height,1,O,$,J)}A.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,O,$,Mt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,j,Mt.width,Mt.height,Mt.depth,0,O,$,Mt.data);else if(A.isData3DTexture)vt?(Lt&&e.texStorage3D(i.TEXTURE_3D,gt,j,Mt.width,Mt.height,Mt.depth),X&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,O,$,Mt.data)):e.texImage3D(i.TEXTURE_3D,0,j,Mt.width,Mt.height,Mt.depth,0,O,$,Mt.data);else if(A.isFramebufferTexture){if(Lt)if(vt)e.texStorage2D(i.TEXTURE_2D,gt,j,Mt.width,Mt.height);else{let ct=Mt.width,P=Mt.height;for(let J=0;J<gt;J++)e.texImage2D(i.TEXTURE_2D,J,j,ct,P,0,O,$,null),ct>>=1,P>>=1}}else if(ht.length>0){if(vt&&Lt){const ct=st(ht[0]);e.texStorage2D(i.TEXTURE_2D,gt,j,ct.width,ct.height)}for(let ct=0,P=ht.length;ct<P;ct++)N=ht[ct],vt?X&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,O,$,N):e.texImage2D(i.TEXTURE_2D,ct,j,O,$,N);A.generateMipmaps=!1}else if(vt){if(Lt){const ct=st(Mt);e.texStorage2D(i.TEXTURE_2D,gt,j,ct.width,ct.height)}X&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,O,$,Mt)}else e.texImage2D(i.TEXTURE_2D,0,j,O,$,Mt);g(A)&&p(z),Tt.__version=G.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function wt(D,A,C){if(A.image.length!==6)return;const z=Ct(D,A),q=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+C);const G=n.get(q);if(q.version!==G.__version||z===!0){e.activeTexture(i.TEXTURE0+C);const Tt=re.getPrimaries(re.workingColorSpace),ft=A.colorSpace===fi?null:re.getPrimaries(A.colorSpace),_t=A.colorSpace===fi||Tt===ft?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_t);const It=A.isCompressedTexture||A.image[0].isCompressedTexture,Mt=A.image[0]&&A.image[0].isDataTexture,O=[];for(let P=0;P<6;P++)!It&&!Mt?O[P]=x(A.image[P],!0,s.maxCubemapSize):O[P]=Mt?A.image[P].image:A.image[P],O[P]=Ot(A,O[P]);const $=O[0],j=r.convert(A.format,A.colorSpace),N=r.convert(A.type),ht=M(A.internalFormat,j,N,A.colorSpace),vt=A.isVideoTexture!==!0,Lt=G.__version===void 0||z===!0,X=q.dataReady;let gt=T(A,$);At(i.TEXTURE_CUBE_MAP,A);let ct;if(It){vt&&Lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,ht,$.width,$.height);for(let P=0;P<6;P++){ct=O[P].mipmaps;for(let J=0;J<ct.length;J++){const et=ct[J];A.format!==Mn?j!==null?vt?X&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,0,0,et.width,et.height,j,et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,ht,et.width,et.height,0,et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):vt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,0,0,et.width,et.height,j,N,et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J,ht,et.width,et.height,0,j,N,et.data)}}}else{if(ct=A.mipmaps,vt&&Lt){ct.length>0&&gt++;const P=st(O[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,gt,ht,P.width,P.height)}for(let P=0;P<6;P++)if(Mt){vt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,0,0,O[P].width,O[P].height,j,N,O[P].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,ht,O[P].width,O[P].height,0,j,N,O[P].data);for(let J=0;J<ct.length;J++){const bt=ct[J].image[P].image;vt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,0,0,bt.width,bt.height,j,N,bt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,ht,bt.width,bt.height,0,j,N,bt.data)}}else{vt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,0,0,j,N,O[P]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,0,ht,j,N,O[P]);for(let J=0;J<ct.length;J++){const et=ct[J];vt?X&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,0,0,j,N,et.image[P]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+P,J+1,ht,j,N,et.image[P])}}}g(A)&&p(i.TEXTURE_CUBE_MAP),G.__version=q.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function zt(D,A,C,z,q,G){const Tt=r.convert(C.format,C.colorSpace),ft=r.convert(C.type),_t=M(C.internalFormat,Tt,ft,C.colorSpace),It=n.get(A),Mt=n.get(C);if(Mt.__renderTarget=A,!It.__hasExternalTextures){const O=Math.max(1,A.width>>G),$=Math.max(1,A.height>>G);q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?e.texImage3D(q,G,_t,O,$,A.depth,0,Tt,ft,null):e.texImage2D(q,G,_t,O,$,0,Tt,ft,null)}e.bindFramebuffer(i.FRAMEBUFFER,D),St(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,z,q,Mt.__webglTexture,0,dt(A)):(q===i.TEXTURE_2D||q>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,z,q,Mt.__webglTexture,G),e.bindFramebuffer(i.FRAMEBUFFER,null)}function xt(D,A,C){if(i.bindRenderbuffer(i.RENDERBUFFER,D),A.depthBuffer){const z=A.depthTexture,q=z&&z.isDepthTexture?z.type:null,G=v(A.stencilBuffer,q),Tt=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ft=dt(A);St(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ft,G,A.width,A.height):C?i.renderbufferStorageMultisample(i.RENDERBUFFER,ft,G,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,G,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Tt,i.RENDERBUFFER,D)}else{const z=A.textures;for(let q=0;q<z.length;q++){const G=z[q],Tt=r.convert(G.format,G.colorSpace),ft=r.convert(G.type),_t=M(G.internalFormat,Tt,ft,G.colorSpace),It=dt(A);C&&St(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,_t,A.width,A.height):St(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,_t,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,_t,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ut(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const z=n.get(A.depthTexture);z.__renderTarget=A,(!z.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),Z(A.depthTexture,0);const q=z.__webglTexture,G=dt(A);if(A.depthTexture.format===fs)St(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,q,0);else if(A.depthTexture.format===_s)St(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0,G):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,q,0);else throw new Error("Unknown depthTexture format")}function L(D){const A=n.get(D),C=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const z=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),z){const q=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,z.removeEventListener("dispose",q)};z.addEventListener("dispose",q),A.__depthDisposeCallback=q}A.__boundDepthTexture=z}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(C)throw new Error("target.depthTexture not supported in Cube render targets");Ut(A.__webglFramebuffer,D)}else if(C){A.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[z]),A.__webglDepthbuffer[z]===void 0)A.__webglDepthbuffer[z]=i.createRenderbuffer(),xt(A.__webglDepthbuffer[z],D,!1);else{const q=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,G=A.__webglDepthbuffer[z];i.bindRenderbuffer(i.RENDERBUFFER,G),i.framebufferRenderbuffer(i.FRAMEBUFFER,q,i.RENDERBUFFER,G)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),xt(A.__webglDepthbuffer,D,!1);else{const z=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,z,i.RENDERBUFFER,q)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function W(D,A,C){const z=n.get(D);A!==void 0&&zt(z.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),C!==void 0&&L(D)}function it(D){const A=D.texture,C=n.get(D),z=n.get(A);D.addEventListener("dispose",S);const q=D.textures,G=D.isWebGLCubeRenderTarget===!0,Tt=q.length>1;if(Tt||(z.__webglTexture===void 0&&(z.__webglTexture=i.createTexture()),z.__version=A.version,o.memory.textures++),G){C.__webglFramebuffer=[];for(let ft=0;ft<6;ft++)if(A.mipmaps&&A.mipmaps.length>0){C.__webglFramebuffer[ft]=[];for(let _t=0;_t<A.mipmaps.length;_t++)C.__webglFramebuffer[ft][_t]=i.createFramebuffer()}else C.__webglFramebuffer[ft]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){C.__webglFramebuffer=[];for(let ft=0;ft<A.mipmaps.length;ft++)C.__webglFramebuffer[ft]=i.createFramebuffer()}else C.__webglFramebuffer=i.createFramebuffer();if(Tt)for(let ft=0,_t=q.length;ft<_t;ft++){const It=n.get(q[ft]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&St(D)===!1){C.__webglMultisampledFramebuffer=i.createFramebuffer(),C.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,C.__webglMultisampledFramebuffer);for(let ft=0;ft<q.length;ft++){const _t=q[ft];C.__webglColorRenderbuffer[ft]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,C.__webglColorRenderbuffer[ft]);const It=r.convert(_t.format,_t.colorSpace),Mt=r.convert(_t.type),O=M(_t.internalFormat,It,Mt,_t.colorSpace,D.isXRRenderTarget===!0),$=dt(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,$,O,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ft,i.RENDERBUFFER,C.__webglColorRenderbuffer[ft])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(C.__webglDepthRenderbuffer=i.createRenderbuffer(),xt(C.__webglDepthRenderbuffer,D,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(G){e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture),At(i.TEXTURE_CUBE_MAP,A);for(let ft=0;ft<6;ft++)if(A.mipmaps&&A.mipmaps.length>0)for(let _t=0;_t<A.mipmaps.length;_t++)zt(C.__webglFramebuffer[ft][_t],D,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,_t);else zt(C.__webglFramebuffer[ft],D,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ft,0);g(A)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Tt){for(let ft=0,_t=q.length;ft<_t;ft++){const It=q[ft],Mt=n.get(It);e.bindTexture(i.TEXTURE_2D,Mt.__webglTexture),At(i.TEXTURE_2D,It),zt(C.__webglFramebuffer,D,It,i.COLOR_ATTACHMENT0+ft,i.TEXTURE_2D,0),g(It)&&p(i.TEXTURE_2D)}e.unbindTexture()}else{let ft=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ft=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ft,z.__webglTexture),At(ft,A),A.mipmaps&&A.mipmaps.length>0)for(let _t=0;_t<A.mipmaps.length;_t++)zt(C.__webglFramebuffer[_t],D,A,i.COLOR_ATTACHMENT0,ft,_t);else zt(C.__webglFramebuffer,D,A,i.COLOR_ATTACHMENT0,ft,0);g(A)&&p(ft),e.unbindTexture()}D.depthBuffer&&L(D)}function nt(D){const A=D.textures;for(let C=0,z=A.length;C<z;C++){const q=A[C];if(g(q)){const G=b(D),Tt=n.get(q).__webglTexture;e.bindTexture(G,Tt),p(G),e.unbindTexture()}}}const K=[],U=[];function Et(D){if(D.samples>0){if(St(D)===!1){const A=D.textures,C=D.width,z=D.height;let q=i.COLOR_BUFFER_BIT;const G=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Tt=n.get(D),ft=A.length>1;if(ft)for(let _t=0;_t<A.length;_t++)e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglFramebuffer);for(let _t=0;_t<A.length;_t++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(q|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(q|=i.STENCIL_BUFFER_BIT)),ft){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[_t]);const It=n.get(A[_t]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,It,0)}i.blitFramebuffer(0,0,C,z,0,0,C,z,q,i.NEAREST),l===!0&&(K.length=0,U.length=0,K.push(i.COLOR_ATTACHMENT0+_t),D.depthBuffer&&D.resolveDepthBuffer===!1&&(K.push(G),U.push(G),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,U)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,K))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ft)for(let _t=0;_t<A.length;_t++){e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.RENDERBUFFER,Tt.__webglColorRenderbuffer[_t]);const It=n.get(A[_t]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Tt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+_t,i.TEXTURE_2D,It,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Tt.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const A=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function dt(D){return Math.min(s.maxSamples,D.samples)}function St(D){const A=n.get(D);return D.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function yt(D){const A=o.render.frame;u.get(D)!==A&&(u.set(D,A),D.update())}function Ot(D,A){const C=D.colorSpace,z=D.format,q=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||C!==ws&&C!==fi&&(re.getTransfer(C)===fe?(z!==Mn||q!==zn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",C)),A}function st(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=F,this.setTexture2D=Z,this.setTexture2DArray=H,this.setTexture3D=V,this.setTextureCube=k,this.rebindTextures=W,this.setupRenderTarget=it,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=Et,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=zt,this.useMultisampledRTT=St}function fx(i,t){function e(n,s=fi){let r;const o=re.getTransfer(s);if(n===zn)return i.UNSIGNED_BYTE;if(n===ul)return i.UNSIGNED_SHORT_4_4_4_4;if(n===hl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===qu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Wu)return i.BYTE;if(n===Xu)return i.SHORT;if(n===nr)return i.UNSIGNED_SHORT;if(n===cl)return i.INT;if(n===Oi)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===In)return i.HALF_FLOAT;if(n===Yu)return i.ALPHA;if(n===$u)return i.RGB;if(n===Mn)return i.RGBA;if(n===ju)return i.LUMINANCE;if(n===Ku)return i.LUMINANCE_ALPHA;if(n===fs)return i.DEPTH_COMPONENT;if(n===_s)return i.DEPTH_STENCIL;if(n===lo)return i.RED;if(n===fl)return i.RED_INTEGER;if(n===Zu)return i.RG;if(n===dl)return i.RG_INTEGER;if(n===pl)return i.RGBA_INTEGER;if(n===Kr||n===Zr||n===Jr||n===Qr)if(o===fe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Kr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Kr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Zr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ba||n===wa||n===Ea||n===Ta)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ba)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ta)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Aa||n===Ra||n===Ca)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Aa||n===Ra)return o===fe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ca)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Pa||n===La||n===Da||n===Ia||n===za||n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba||n===Ga||n===Ha||n===Va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Pa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===La)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Da)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ia)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===za)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ua)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Na)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Oa)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ka)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ba)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ga)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ha)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Va)return o===fe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===to||n===Wa||n===Xa)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===to)return o===fe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ju||n===qa||n===Ya||n===$a)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===to)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ya)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$a)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===vs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class dx extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Xe extends De{constructor(){super(),this.isGroup=!0,this.type="Group"}}const px={type:"move"};class $o{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Xe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Xe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Xe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const g=e.getJointPose(x,n),p=this._getHandJoint(c,x);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,m=.005;c.inputState.pinching&&f>h+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=h-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(px)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Xe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const mx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,gx=`
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

}`;class xx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new qe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ae({vertexShader:mx,fragmentShader:gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new jt(new As(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class vx extends Es{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,m=null;const x=new xx,g=e.getContextAttributes();let p=null,b=null;const M=[],v=[],T=new Yt;let _=null;const S=new rn;S.viewport=new oe;const E=new rn;E.viewport=new oe;const w=[S,E],y=new dx;let R=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(lt){let wt=M[lt];return wt===void 0&&(wt=new $o,M[lt]=wt),wt.getTargetRaySpace()},this.getControllerGrip=function(lt){let wt=M[lt];return wt===void 0&&(wt=new $o,M[lt]=wt),wt.getGripSpace()},this.getHand=function(lt){let wt=M[lt];return wt===void 0&&(wt=new $o,M[lt]=wt),wt.getHandSpace()};function B(lt){const wt=v.indexOf(lt.inputSource);if(wt===-1)return;const zt=M[wt];zt!==void 0&&(zt.update(lt.inputSource,lt.frame,c||o),zt.dispatchEvent({type:lt.type,data:lt.inputSource}))}function Y(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",Z);for(let lt=0;lt<M.length;lt++){const wt=v[lt];wt!==null&&(v[lt]=null,M[lt].disconnect(wt))}R=null,F=null,x.reset(),t.setRenderTarget(p),h=null,f=null,d=null,s=null,b=null,Ct.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(lt){r=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(lt){a=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(lt){c=lt},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(lt){if(s=lt,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",Z),g.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const wt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,e,wt),s.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),b=new fn(h.framebufferWidth,h.framebufferHeight,{format:Mn,type:zn,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let wt=null,zt=null,xt=null;g.depth&&(xt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,wt=g.stencil?_s:fs,zt=g.stencil?vs:Oi);const Ut={colorFormat:e.RGBA8,depthFormat:xt,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(Ut),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new fn(f.textureWidth,f.textureHeight,{format:Mn,type:zn,depthTexture:new Ml(f.textureWidth,f.textureHeight,zt,void 0,void 0,void 0,void 0,void 0,void 0,wt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Ct.setContext(s),Ct.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function Z(lt){for(let wt=0;wt<lt.removed.length;wt++){const zt=lt.removed[wt],xt=v.indexOf(zt);xt>=0&&(v[xt]=null,M[xt].disconnect(zt))}for(let wt=0;wt<lt.added.length;wt++){const zt=lt.added[wt];let xt=v.indexOf(zt);if(xt===-1){for(let L=0;L<M.length;L++)if(L>=v.length){v.push(zt),xt=L;break}else if(v[L]===null){v[L]=zt,xt=L;break}if(xt===-1)break}const Ut=M[xt];Ut&&Ut.connect(zt)}}const H=new Q,V=new Q;function k(lt,wt,zt){H.setFromMatrixPosition(wt.matrixWorld),V.setFromMatrixPosition(zt.matrixWorld);const xt=H.distanceTo(V),Ut=wt.projectionMatrix.elements,L=zt.projectionMatrix.elements,W=Ut[14]/(Ut[10]-1),it=Ut[14]/(Ut[10]+1),nt=(Ut[9]+1)/Ut[5],K=(Ut[9]-1)/Ut[5],U=(Ut[8]-1)/Ut[0],Et=(L[8]+1)/L[0],dt=W*U,St=W*Et,yt=xt/(-U+Et),Ot=yt*-U;if(wt.matrixWorld.decompose(lt.position,lt.quaternion,lt.scale),lt.translateX(Ot),lt.translateZ(yt),lt.matrixWorld.compose(lt.position,lt.quaternion,lt.scale),lt.matrixWorldInverse.copy(lt.matrixWorld).invert(),Ut[10]===-1)lt.projectionMatrix.copy(wt.projectionMatrix),lt.projectionMatrixInverse.copy(wt.projectionMatrixInverse);else{const st=W+yt,D=it+yt,A=dt-Ot,C=St+(xt-Ot),z=nt*it/D*st,q=K*it/D*st;lt.projectionMatrix.makePerspective(A,C,z,q,st,D),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert()}}function tt(lt,wt){wt===null?lt.matrixWorld.copy(lt.matrix):lt.matrixWorld.multiplyMatrices(wt.matrixWorld,lt.matrix),lt.matrixWorldInverse.copy(lt.matrixWorld).invert()}this.updateCamera=function(lt){if(s===null)return;let wt=lt.near,zt=lt.far;x.texture!==null&&(x.depthNear>0&&(wt=x.depthNear),x.depthFar>0&&(zt=x.depthFar)),y.near=E.near=S.near=wt,y.far=E.far=S.far=zt,(R!==y.near||F!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),R=y.near,F=y.far),S.layers.mask=lt.layers.mask|2,E.layers.mask=lt.layers.mask|4,y.layers.mask=S.layers.mask|E.layers.mask;const xt=lt.parent,Ut=y.cameras;tt(y,xt);for(let L=0;L<Ut.length;L++)tt(Ut[L],xt);Ut.length===2?k(y,S,E):y.projectionMatrix.copy(S.projectionMatrix),ut(lt,y,xt)};function ut(lt,wt,zt){zt===null?lt.matrix.copy(wt.matrixWorld):(lt.matrix.copy(zt.matrixWorld),lt.matrix.invert(),lt.matrix.multiply(wt.matrixWorld)),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.updateMatrixWorld(!0),lt.projectionMatrix.copy(wt.projectionMatrix),lt.projectionMatrixInverse.copy(wt.projectionMatrixInverse),lt.isPerspectiveCamera&&(lt.fov=ir*2*Math.atan(1/lt.projectionMatrix.elements[5]),lt.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(lt){l=lt,f!==null&&(f.fixedFoveation=lt),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=lt)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let rt=null;function At(lt,wt){if(u=wt.getViewerPose(c||o),m=wt,u!==null){const zt=u.views;h!==null&&(t.setRenderTargetFramebuffer(b,h.framebuffer),t.setRenderTarget(b));let xt=!1;zt.length!==y.cameras.length&&(y.cameras.length=0,xt=!0);for(let L=0;L<zt.length;L++){const W=zt[L];let it=null;if(h!==null)it=h.getViewport(W);else{const K=d.getViewSubImage(f,W);it=K.viewport,L===0&&(t.setRenderTargetTextures(b,K.colorTexture,f.ignoreDepthValues?void 0:K.depthStencilTexture),t.setRenderTarget(b))}let nt=w[L];nt===void 0&&(nt=new rn,nt.layers.enable(L),nt.viewport=new oe,w[L]=nt),nt.matrix.fromArray(W.transform.matrix),nt.matrix.decompose(nt.position,nt.quaternion,nt.scale),nt.projectionMatrix.fromArray(W.projectionMatrix),nt.projectionMatrixInverse.copy(nt.projectionMatrix).invert(),nt.viewport.set(it.x,it.y,it.width,it.height),L===0&&(y.matrix.copy(nt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),xt===!0&&y.cameras.push(nt)}const Ut=s.enabledFeatures;if(Ut&&Ut.includes("depth-sensing")){const L=d.getDepthInformation(zt[0]);L&&L.isValid&&L.texture&&x.init(t,L,s.renderState)}}for(let zt=0;zt<M.length;zt++){const xt=v[zt],Ut=M[zt];xt!==null&&Ut!==void 0&&Ut.update(xt,wt,c||o)}rt&&rt(lt,wt),wt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:wt}),m=null}const Ct=new uh;Ct.setAnimationLoop(At),this.setAnimationLoop=function(lt){rt=lt},this.dispose=function(){}}}const Ai=new Un,_x=new ae;function yx(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,ah(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,b,M,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&h(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),x(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,b,M):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Je&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Je&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const b=t.get(p),M=b.envMap,v=b.envMapRotation;M&&(g.envMap.value=M,Ai.copy(v),Ai.x*=-1,Ai.y*=-1,Ai.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ai.y*=-1,Ai.z*=-1),g.envMapRotation.value.setFromMatrix4(_x.makeRotationFromEuler(Ai)),g.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,b,M){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=M*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function h(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Je&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function x(g,p){const b=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Mx(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){const v=M.program;n.uniformBlockBinding(b,v)}function c(b,M){let v=s[b.id];v===void 0&&(m(b),v=u(b),s[b.id]=v,b.addEventListener("dispose",g));const T=M.program;n.updateUBOMapping(b,T);const _=t.render.frame;r[b.id]!==_&&(f(b),r[b.id]=_)}function u(b){const M=d();b.__bindingPointIndex=M;const v=i.createBuffer(),T=b.__size,_=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,T,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const M=s[b.id],v=b.uniforms,T=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let _=0,S=v.length;_<S;_++){const E=Array.isArray(v[_])?v[_]:[v[_]];for(let w=0,y=E.length;w<y;w++){const R=E[w];if(h(R,_,w,T)===!0){const F=R.__offset,B=Array.isArray(R.value)?R.value:[R.value];let Y=0;for(let Z=0;Z<B.length;Z++){const H=B[Z],V=x(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,i.bufferSubData(i.UNIFORM_BUFFER,F+Y,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):(H.toArray(R.__data,Y),Y+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,F,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(b,M,v,T){const _=b.value,S=M+"_"+v;if(T[S]===void 0)return typeof _=="number"||typeof _=="boolean"?T[S]=_:T[S]=_.clone(),!0;{const E=T[S];if(typeof _=="number"||typeof _=="boolean"){if(E!==_)return T[S]=_,!0}else if(E.equals(_)===!1)return E.copy(_),!0}return!1}function m(b){const M=b.uniforms;let v=0;const T=16;for(let S=0,E=M.length;S<E;S++){const w=Array.isArray(M[S])?M[S]:[M[S]];for(let y=0,R=w.length;y<R;y++){const F=w[y],B=Array.isArray(F.value)?F.value:[F.value];for(let Y=0,Z=B.length;Y<Z;Y++){const H=B[Y],V=x(H),k=v%T,tt=k%V.boundary,ut=k+tt;v+=tt,ut!==0&&T-ut<V.storage&&(v+=T-ut),F.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=V.storage}}}const _=v%T;return _>0&&(v+=T-_),b.__size=v,b.__cache={},this}function x(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function g(b){const M=b.target;M.removeEventListener("dispose",g);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const b in s)i.deleteBuffer(s[b]);o=[],s={},r={}}return{bind:l,update:c,dispose:p}}class Sx{constructor(t={}){const{canvas:e=hd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const m=new Uint32Array(4),x=new Int32Array(4);let g=null,p=null;const b=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=sn,this.toneMapping=xi,this.toneMappingExposure=1;const v=this;let T=!1,_=0,S=0,E=null,w=-1,y=null;const R=new oe,F=new oe;let B=null;const Y=new Ht(0);let Z=0,H=e.width,V=e.height,k=1,tt=null,ut=null;const rt=new oe(0,0,H,V),At=new oe(0,0,H,V);let Ct=!1;const lt=new vl;let wt=!1,zt=!1;const xt=new ae,Ut=new ae,L=new Q,W=new oe,it={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let nt=!1;function K(){return E===null?k:1}let U=n;function Et(I,ot){return e.getContext(I,ot)}try{const I={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${al}`),e.addEventListener("webglcontextlost",P,!1),e.addEventListener("webglcontextrestored",J,!1),e.addEventListener("webglcontextcreationerror",et,!1),U===null){const ot="webgl2";if(U=Et(ot,I),U===null)throw Et(ot)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let dt,St,yt,Ot,st,D,A,C,z,q,G,Tt,ft,_t,It,Mt,O,$,j,N,ht,vt,Lt,X;function gt(){dt=new Ag(U),dt.init(),vt=new fx(U,dt),St=new Mg(U,dt,t,vt),yt=new cx(U,dt),St.reverseDepthBuffer&&f&&yt.buffers.depth.setReversed(!0),Ot=new Pg(U),st=new $0,D=new hx(U,dt,yt,st,St,vt,Ot),A=new bg(v),C=new Tg(v),z=new Fd(U),Lt=new _g(U,z),q=new Rg(U,z,Ot,Lt),G=new Dg(U,q,z,Ot),j=new Lg(U,St,D),Mt=new Sg(st),Tt=new Y0(v,A,C,dt,St,Lt,Mt),ft=new yx(v,st),_t=new K0,It=new nx(dt),$=new vg(v,A,C,yt,G,h,l),O=new ax(v,G,St),X=new Mx(U,Ot,St,yt),N=new yg(U,dt,Ot),ht=new Cg(U,dt,Ot),Ot.programs=Tt.programs,v.capabilities=St,v.extensions=dt,v.properties=st,v.renderLists=_t,v.shadowMap=O,v.state=yt,v.info=Ot}gt();const ct=new vx(v,U);this.xr=ct,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const I=dt.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=dt.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(I){I!==void 0&&(k=I,this.setSize(H,V,!1))},this.getSize=function(I){return I.set(H,V)},this.setSize=function(I,ot,pt=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=I,V=ot,e.width=Math.floor(I*k),e.height=Math.floor(ot*k),pt===!0&&(e.style.width=I+"px",e.style.height=ot+"px"),this.setViewport(0,0,I,ot)},this.getDrawingBufferSize=function(I){return I.set(H*k,V*k).floor()},this.setDrawingBufferSize=function(I,ot,pt){H=I,V=ot,k=pt,e.width=Math.floor(I*pt),e.height=Math.floor(ot*pt),this.setViewport(0,0,I,ot)},this.getCurrentViewport=function(I){return I.copy(R)},this.getViewport=function(I){return I.copy(rt)},this.setViewport=function(I,ot,pt,mt){I.isVector4?rt.set(I.x,I.y,I.z,I.w):rt.set(I,ot,pt,mt),yt.viewport(R.copy(rt).multiplyScalar(k).round())},this.getScissor=function(I){return I.copy(At)},this.setScissor=function(I,ot,pt,mt){I.isVector4?At.set(I.x,I.y,I.z,I.w):At.set(I,ot,pt,mt),yt.scissor(F.copy(At).multiplyScalar(k).round())},this.getScissorTest=function(){return Ct},this.setScissorTest=function(I){yt.setScissorTest(Ct=I)},this.setOpaqueSort=function(I){tt=I},this.setTransparentSort=function(I){ut=I},this.getClearColor=function(I){return I.copy($.getClearColor())},this.setClearColor=function(){$.setClearColor.apply($,arguments)},this.getClearAlpha=function(){return $.getClearAlpha()},this.setClearAlpha=function(){$.setClearAlpha.apply($,arguments)},this.clear=function(I=!0,ot=!0,pt=!0){let mt=0;if(I){let at=!1;if(E!==null){const Nt=E.texture.format;at=Nt===pl||Nt===dl||Nt===fl}if(at){const Nt=E.texture.type,kt=Nt===zn||Nt===Oi||Nt===nr||Nt===vs||Nt===ul||Nt===hl,Vt=$.getClearColor(),Wt=$.getClearAlpha(),Kt=Vt.r,Jt=Vt.g,Xt=Vt.b;kt?(m[0]=Kt,m[1]=Jt,m[2]=Xt,m[3]=Wt,U.clearBufferuiv(U.COLOR,0,m)):(x[0]=Kt,x[1]=Jt,x[2]=Xt,x[3]=Wt,U.clearBufferiv(U.COLOR,0,x))}else mt|=U.COLOR_BUFFER_BIT}ot&&(mt|=U.DEPTH_BUFFER_BIT),pt&&(mt|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(mt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",P,!1),e.removeEventListener("webglcontextrestored",J,!1),e.removeEventListener("webglcontextcreationerror",et,!1),_t.dispose(),It.dispose(),st.dispose(),A.dispose(),C.dispose(),G.dispose(),Lt.dispose(),X.dispose(),Tt.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",$t),ct.removeEventListener("sessionend",Zt),se.stop()};function P(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function J(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const I=Ot.autoReset,ot=O.enabled,pt=O.autoUpdate,mt=O.needsUpdate,at=O.type;gt(),Ot.autoReset=I,O.enabled=ot,O.autoUpdate=pt,O.needsUpdate=mt,O.type=at}function et(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function bt(I){const ot=I.target;ot.removeEventListener("dispose",bt),Dt(ot)}function Dt(I){Pt(I),st.remove(I)}function Pt(I){const ot=st.get(I).programs;ot!==void 0&&(ot.forEach(function(pt){Tt.releaseProgram(pt)}),I.isShaderMaterial&&Tt.releaseShaderCache(I))}this.renderBufferDirect=function(I,ot,pt,mt,at,Nt){ot===null&&(ot=it);const kt=at.isMesh&&at.matrixWorld.determinant()<0,Vt=Fh(I,ot,pt,mt,at);yt.setMaterial(mt,kt);let Wt=pt.index,Kt=1;if(mt.wireframe===!0){if(Wt=q.getWireframeAttribute(pt),Wt===void 0)return;Kt=2}const Jt=pt.drawRange,Xt=pt.attributes.position;let le=Jt.start*Kt,ge=(Jt.start+Jt.count)*Kt;Nt!==null&&(le=Math.max(le,Nt.start*Kt),ge=Math.min(ge,(Nt.start+Nt.count)*Kt)),Wt!==null?(le=Math.max(le,0),ge=Math.min(ge,Wt.count)):Xt!=null&&(le=Math.max(le,0),ge=Math.min(ge,Xt.count));const ve=ge-le;if(ve<0||ve===1/0)return;Lt.setup(at,mt,Vt,pt,Wt);let Ke,ue=N;if(Wt!==null&&(Ke=z.get(Wt),ue=ht,ue.setIndex(Ke)),at.isMesh)mt.wireframe===!0?(yt.setLineWidth(mt.wireframeLinewidth*K()),ue.setMode(U.LINES)):ue.setMode(U.TRIANGLES);else if(at.isLine){let qt=mt.linewidth;qt===void 0&&(qt=1),yt.setLineWidth(qt*K()),at.isLineSegments?ue.setMode(U.LINES):at.isLineLoop?ue.setMode(U.LINE_LOOP):ue.setMode(U.LINE_STRIP)}else at.isPoints?ue.setMode(U.POINTS):at.isSprite&&ue.setMode(U.TRIANGLES);if(at.isBatchedMesh)if(at._multiDrawInstances!==null)ue.renderMultiDrawInstances(at._multiDrawStarts,at._multiDrawCounts,at._multiDrawCount,at._multiDrawInstances);else if(dt.get("WEBGL_multi_draw"))ue.renderMultiDraw(at._multiDrawStarts,at._multiDrawCounts,at._multiDrawCount);else{const qt=at._multiDrawStarts,Fn=at._multiDrawCounts,he=at._multiDrawCount,pn=Wt?z.get(Wt).bytesPerElement:1,Gi=st.get(mt).currentProgram.getUniforms();for(let Qe=0;Qe<he;Qe++)Gi.setValue(U,"_gl_DrawID",Qe),ue.render(qt[Qe]/pn,Fn[Qe])}else if(at.isInstancedMesh)ue.renderInstances(le,ve,at.count);else if(pt.isInstancedBufferGeometry){const qt=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,Fn=Math.min(pt.instanceCount,qt);ue.renderInstances(le,ve,Fn)}else ue.render(le,ve)};function Rt(I,ot,pt){I.transparent===!0&&I.side===ye&&I.forceSinglePass===!1?(I.side=Je,I.needsUpdate=!0,rr(I,ot,pt),I.side=vi,I.needsUpdate=!0,rr(I,ot,pt),I.side=ye):rr(I,ot,pt)}this.compile=function(I,ot,pt=null){pt===null&&(pt=I),p=It.get(pt),p.init(ot),M.push(p),pt.traverseVisible(function(at){at.isLight&&at.layers.test(ot.layers)&&(p.pushLight(at),at.castShadow&&p.pushShadow(at))}),I!==pt&&I.traverseVisible(function(at){at.isLight&&at.layers.test(ot.layers)&&(p.pushLight(at),at.castShadow&&p.pushShadow(at))}),p.setupLights();const mt=new Set;return I.traverse(function(at){if(!(at.isMesh||at.isPoints||at.isLine||at.isSprite))return;const Nt=at.material;if(Nt)if(Array.isArray(Nt))for(let kt=0;kt<Nt.length;kt++){const Vt=Nt[kt];Rt(Vt,pt,at),mt.add(Vt)}else Rt(Nt,pt,at),mt.add(Nt)}),M.pop(),p=null,mt},this.compileAsync=function(I,ot,pt=null){const mt=this.compile(I,ot,pt);return new Promise(at=>{function Nt(){if(mt.forEach(function(kt){st.get(kt).currentProgram.isReady()&&mt.delete(kt)}),mt.size===0){at(I);return}setTimeout(Nt,10)}dt.get("KHR_parallel_shader_compile")!==null?Nt():setTimeout(Nt,10)})};let Bt=null;function Gt(I){Bt&&Bt(I)}function $t(){se.stop()}function Zt(){se.start()}const se=new uh;se.setAnimationLoop(Gt),typeof self<"u"&&se.setContext(self),this.setAnimationLoop=function(I){Bt=I,ct.setAnimationLoop(I),I===null?se.stop():se.start()},ct.addEventListener("sessionstart",$t),ct.addEventListener("sessionend",Zt),this.render=function(I,ot){if(ot!==void 0&&ot.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ot.parent===null&&ot.matrixWorldAutoUpdate===!0&&ot.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(ot),ot=ct.getCamera()),I.isScene===!0&&I.onBeforeRender(v,I,ot,E),p=It.get(I,M.length),p.init(ot),M.push(p),Ut.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),lt.setFromProjectionMatrix(Ut),zt=this.localClippingEnabled,wt=Mt.init(this.clippingPlanes,zt),g=_t.get(I,b.length),g.init(),b.push(g),ct.enabled===!0&&ct.isPresenting===!0){const Nt=v.xr.getDepthSensingMesh();Nt!==null&&me(Nt,ot,-1/0,v.sortObjects)}me(I,ot,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(tt,ut),nt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,nt&&$.addToRenderList(g,I),this.info.render.frame++,wt===!0&&Mt.beginShadows();const pt=p.state.shadowsArray;O.render(pt,I,ot),wt===!0&&Mt.endShadows(),this.info.autoReset===!0&&this.info.reset();const mt=g.opaque,at=g.transmissive;if(p.setupLights(),ot.isArrayCamera){const Nt=ot.cameras;if(at.length>0)for(let kt=0,Vt=Nt.length;kt<Vt;kt++){const Wt=Nt[kt];Sn(mt,at,I,Wt)}nt&&$.render(I);for(let kt=0,Vt=Nt.length;kt<Vt;kt++){const Wt=Nt[kt];dn(g,I,Wt,Wt.viewport)}}else at.length>0&&Sn(mt,at,I,ot),nt&&$.render(I),dn(g,I,ot);E!==null&&(D.updateMultisampleRenderTarget(E),D.updateRenderTargetMipmap(E)),I.isScene===!0&&I.onAfterRender(v,I,ot),Lt.resetDefaultState(),w=-1,y=null,M.pop(),M.length>0?(p=M[M.length-1],wt===!0&&Mt.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function me(I,ot,pt,mt){if(I.visible===!1)return;if(I.layers.test(ot.layers)){if(I.isGroup)pt=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(ot);else if(I.isLight)p.pushLight(I),I.castShadow&&p.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||lt.intersectsSprite(I)){mt&&W.setFromMatrixPosition(I.matrixWorld).applyMatrix4(Ut);const kt=G.update(I),Vt=I.material;Vt.visible&&g.push(I,kt,Vt,pt,W.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||lt.intersectsObject(I))){const kt=G.update(I),Vt=I.material;if(mt&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),W.copy(I.boundingSphere.center)):(kt.boundingSphere===null&&kt.computeBoundingSphere(),W.copy(kt.boundingSphere.center)),W.applyMatrix4(I.matrixWorld).applyMatrix4(Ut)),Array.isArray(Vt)){const Wt=kt.groups;for(let Kt=0,Jt=Wt.length;Kt<Jt;Kt++){const Xt=Wt[Kt],le=Vt[Xt.materialIndex];le&&le.visible&&g.push(I,kt,le,pt,W.z,Xt)}}else Vt.visible&&g.push(I,kt,Vt,pt,W.z,null)}}const Nt=I.children;for(let kt=0,Vt=Nt.length;kt<Vt;kt++)me(Nt[kt],ot,pt,mt)}function dn(I,ot,pt,mt){const at=I.opaque,Nt=I.transmissive,kt=I.transparent;p.setupLightsView(pt),wt===!0&&Mt.setGlobalState(v.clippingPlanes,pt),mt&&yt.viewport(R.copy(mt)),at.length>0&&Jn(at,ot,pt),Nt.length>0&&Jn(Nt,ot,pt),kt.length>0&&Jn(kt,ot,pt),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Sn(I,ot,pt,mt){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[mt.id]===void 0&&(p.state.transmissionRenderTarget[mt.id]=new fn(1,1,{generateMipmaps:!0,type:dt.has("EXT_color_buffer_half_float")||dt.has("EXT_color_buffer_float")?In:zn,minFilter:Ui,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:re.workingColorSpace}));const Nt=p.state.transmissionRenderTarget[mt.id],kt=mt.viewport||R;Nt.setSize(kt.z,kt.w);const Vt=v.getRenderTarget();v.setRenderTarget(Nt),v.getClearColor(Y),Z=v.getClearAlpha(),Z<1&&v.setClearColor(16777215,.5),v.clear(),nt&&$.render(pt);const Wt=v.toneMapping;v.toneMapping=xi;const Kt=mt.viewport;if(mt.viewport!==void 0&&(mt.viewport=void 0),p.setupLightsView(mt),wt===!0&&Mt.setGlobalState(v.clippingPlanes,mt),Jn(I,pt,mt),D.updateMultisampleRenderTarget(Nt),D.updateRenderTargetMipmap(Nt),dt.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let Xt=0,le=ot.length;Xt<le;Xt++){const ge=ot[Xt],ve=ge.object,Ke=ge.geometry,ue=ge.material,qt=ge.group;if(ue.side===ye&&ve.layers.test(mt.layers)){const Fn=ue.side;ue.side=Je,ue.needsUpdate=!0,Ul(ve,pt,mt,Ke,ue,qt),ue.side=Fn,ue.needsUpdate=!0,Jt=!0}}Jt===!0&&(D.updateMultisampleRenderTarget(Nt),D.updateRenderTargetMipmap(Nt))}v.setRenderTarget(Vt),v.setClearColor(Y,Z),Kt!==void 0&&(mt.viewport=Kt),v.toneMapping=Wt}function Jn(I,ot,pt){const mt=ot.isScene===!0?ot.overrideMaterial:null;for(let at=0,Nt=I.length;at<Nt;at++){const kt=I[at],Vt=kt.object,Wt=kt.geometry,Kt=mt===null?kt.material:mt,Jt=kt.group;Vt.layers.test(pt.layers)&&Ul(Vt,ot,pt,Wt,Kt,Jt)}}function Ul(I,ot,pt,mt,at,Nt){I.onBeforeRender(v,ot,pt,mt,at,Nt),I.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),at.onBeforeRender(v,ot,pt,mt,I,Nt),at.transparent===!0&&at.side===ye&&at.forceSinglePass===!1?(at.side=Je,at.needsUpdate=!0,v.renderBufferDirect(pt,ot,mt,at,I,Nt),at.side=vi,at.needsUpdate=!0,v.renderBufferDirect(pt,ot,mt,at,I,Nt),at.side=ye):v.renderBufferDirect(pt,ot,mt,at,I,Nt),I.onAfterRender(v,ot,pt,mt,at,Nt)}function rr(I,ot,pt){ot.isScene!==!0&&(ot=it);const mt=st.get(I),at=p.state.lights,Nt=p.state.shadowsArray,kt=at.state.version,Vt=Tt.getParameters(I,at.state,Nt,ot,pt),Wt=Tt.getProgramCacheKey(Vt);let Kt=mt.programs;mt.environment=I.isMeshStandardMaterial?ot.environment:null,mt.fog=ot.fog,mt.envMap=(I.isMeshStandardMaterial?C:A).get(I.envMap||mt.environment),mt.envMapRotation=mt.environment!==null&&I.envMap===null?ot.environmentRotation:I.envMapRotation,Kt===void 0&&(I.addEventListener("dispose",bt),Kt=new Map,mt.programs=Kt);let Jt=Kt.get(Wt);if(Jt!==void 0){if(mt.currentProgram===Jt&&mt.lightsStateVersion===kt)return Fl(I,Vt),Jt}else Vt.uniforms=Tt.getUniforms(I),I.onBeforeCompile(Vt,v),Jt=Tt.acquireProgram(Vt,Wt),Kt.set(Wt,Jt),mt.uniforms=Vt.uniforms;const Xt=mt.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(Xt.clippingPlanes=Mt.uniform),Fl(I,Vt),mt.needsLights=kh(I),mt.lightsStateVersion=kt,mt.needsLights&&(Xt.ambientLightColor.value=at.state.ambient,Xt.lightProbe.value=at.state.probe,Xt.directionalLights.value=at.state.directional,Xt.directionalLightShadows.value=at.state.directionalShadow,Xt.spotLights.value=at.state.spot,Xt.spotLightShadows.value=at.state.spotShadow,Xt.rectAreaLights.value=at.state.rectArea,Xt.ltc_1.value=at.state.rectAreaLTC1,Xt.ltc_2.value=at.state.rectAreaLTC2,Xt.pointLights.value=at.state.point,Xt.pointLightShadows.value=at.state.pointShadow,Xt.hemisphereLights.value=at.state.hemi,Xt.directionalShadowMap.value=at.state.directionalShadowMap,Xt.directionalShadowMatrix.value=at.state.directionalShadowMatrix,Xt.spotShadowMap.value=at.state.spotShadowMap,Xt.spotLightMatrix.value=at.state.spotLightMatrix,Xt.spotLightMap.value=at.state.spotLightMap,Xt.pointShadowMap.value=at.state.pointShadowMap,Xt.pointShadowMatrix.value=at.state.pointShadowMatrix),mt.currentProgram=Jt,mt.uniformsList=null,Jt}function Nl(I){if(I.uniformsList===null){const ot=I.currentProgram.getUniforms();I.uniformsList=eo.seqWithValue(ot.seq,I.uniforms)}return I.uniformsList}function Fl(I,ot){const pt=st.get(I);pt.outputColorSpace=ot.outputColorSpace,pt.batching=ot.batching,pt.batchingColor=ot.batchingColor,pt.instancing=ot.instancing,pt.instancingColor=ot.instancingColor,pt.instancingMorph=ot.instancingMorph,pt.skinning=ot.skinning,pt.morphTargets=ot.morphTargets,pt.morphNormals=ot.morphNormals,pt.morphColors=ot.morphColors,pt.morphTargetsCount=ot.morphTargetsCount,pt.numClippingPlanes=ot.numClippingPlanes,pt.numIntersection=ot.numClipIntersection,pt.vertexAlphas=ot.vertexAlphas,pt.vertexTangents=ot.vertexTangents,pt.toneMapping=ot.toneMapping}function Fh(I,ot,pt,mt,at){ot.isScene!==!0&&(ot=it),D.resetTextureUnits();const Nt=ot.fog,kt=mt.isMeshStandardMaterial?ot.environment:null,Vt=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ws,Wt=(mt.isMeshStandardMaterial?C:A).get(mt.envMap||kt),Kt=mt.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,Jt=!!pt.attributes.tangent&&(!!mt.normalMap||mt.anisotropy>0),Xt=!!pt.morphAttributes.position,le=!!pt.morphAttributes.normal,ge=!!pt.morphAttributes.color;let ve=xi;mt.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(ve=v.toneMapping);const Ke=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,ue=Ke!==void 0?Ke.length:0,qt=st.get(mt),Fn=p.state.lights;if(wt===!0&&(zt===!0||I!==y)){const an=I===y&&mt.id===w;Mt.setState(mt,I,an)}let he=!1;mt.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==Fn.state.version||qt.outputColorSpace!==Vt||at.isBatchedMesh&&qt.batching===!1||!at.isBatchedMesh&&qt.batching===!0||at.isBatchedMesh&&qt.batchingColor===!0&&at.colorTexture===null||at.isBatchedMesh&&qt.batchingColor===!1&&at.colorTexture!==null||at.isInstancedMesh&&qt.instancing===!1||!at.isInstancedMesh&&qt.instancing===!0||at.isSkinnedMesh&&qt.skinning===!1||!at.isSkinnedMesh&&qt.skinning===!0||at.isInstancedMesh&&qt.instancingColor===!0&&at.instanceColor===null||at.isInstancedMesh&&qt.instancingColor===!1&&at.instanceColor!==null||at.isInstancedMesh&&qt.instancingMorph===!0&&at.morphTexture===null||at.isInstancedMesh&&qt.instancingMorph===!1&&at.morphTexture!==null||qt.envMap!==Wt||mt.fog===!0&&qt.fog!==Nt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==Mt.numPlanes||qt.numIntersection!==Mt.numIntersection)||qt.vertexAlphas!==Kt||qt.vertexTangents!==Jt||qt.morphTargets!==Xt||qt.morphNormals!==le||qt.morphColors!==ge||qt.toneMapping!==ve||qt.morphTargetsCount!==ue)&&(he=!0):(he=!0,qt.__version=mt.version);let pn=qt.currentProgram;he===!0&&(pn=rr(mt,ot,at));let Gi=!1,Qe=!1,Ls=!1;const _e=pn.getUniforms(),bn=qt.uniforms;if(yt.useProgram(pn.program)&&(Gi=!0,Qe=!0,Ls=!0),mt.id!==w&&(w=mt.id,Qe=!0),Gi||y!==I){yt.buffers.depth.getReversed()?(xt.copy(I.projectionMatrix),dd(xt),pd(xt),_e.setValue(U,"projectionMatrix",xt)):_e.setValue(U,"projectionMatrix",I.projectionMatrix),_e.setValue(U,"viewMatrix",I.matrixWorldInverse);const Qn=_e.map.cameraPosition;Qn!==void 0&&Qn.setValue(U,L.setFromMatrixPosition(I.matrixWorld)),St.logarithmicDepthBuffer&&_e.setValue(U,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),(mt.isMeshPhongMaterial||mt.isMeshToonMaterial||mt.isMeshLambertMaterial||mt.isMeshBasicMaterial||mt.isMeshStandardMaterial||mt.isShaderMaterial)&&_e.setValue(U,"isOrthographic",I.isOrthographicCamera===!0),y!==I&&(y=I,Qe=!0,Ls=!0)}if(at.isSkinnedMesh){_e.setOptional(U,at,"bindMatrix"),_e.setOptional(U,at,"bindMatrixInverse");const an=at.skeleton;an&&(an.boneTexture===null&&an.computeBoneTexture(),_e.setValue(U,"boneTexture",an.boneTexture,D))}at.isBatchedMesh&&(_e.setOptional(U,at,"batchingTexture"),_e.setValue(U,"batchingTexture",at._matricesTexture,D),_e.setOptional(U,at,"batchingIdTexture"),_e.setValue(U,"batchingIdTexture",at._indirectTexture,D),_e.setOptional(U,at,"batchingColorTexture"),at._colorsTexture!==null&&_e.setValue(U,"batchingColorTexture",at._colorsTexture,D));const Ds=pt.morphAttributes;if((Ds.position!==void 0||Ds.normal!==void 0||Ds.color!==void 0)&&j.update(at,pt,pn),(Qe||qt.receiveShadow!==at.receiveShadow)&&(qt.receiveShadow=at.receiveShadow,_e.setValue(U,"receiveShadow",at.receiveShadow)),mt.isMeshGouraudMaterial&&mt.envMap!==null&&(bn.envMap.value=Wt,bn.flipEnvMap.value=Wt.isCubeTexture&&Wt.isRenderTargetTexture===!1?-1:1),mt.isMeshStandardMaterial&&mt.envMap===null&&ot.environment!==null&&(bn.envMapIntensity.value=ot.environmentIntensity),Qe&&(_e.setValue(U,"toneMappingExposure",v.toneMappingExposure),qt.needsLights&&Oh(bn,Ls),Nt&&mt.fog===!0&&ft.refreshFogUniforms(bn,Nt),ft.refreshMaterialUniforms(bn,mt,k,V,p.state.transmissionRenderTarget[I.id]),eo.upload(U,Nl(qt),bn,D)),mt.isShaderMaterial&&mt.uniformsNeedUpdate===!0&&(eo.upload(U,Nl(qt),bn,D),mt.uniformsNeedUpdate=!1),mt.isSpriteMaterial&&_e.setValue(U,"center",at.center),_e.setValue(U,"modelViewMatrix",at.modelViewMatrix),_e.setValue(U,"normalMatrix",at.normalMatrix),_e.setValue(U,"modelMatrix",at.matrixWorld),mt.isShaderMaterial||mt.isRawShaderMaterial){const an=mt.uniformsGroups;for(let Qn=0,ti=an.length;Qn<ti;Qn++){const Ol=an[Qn];X.update(Ol,pn),X.bind(Ol,pn)}}return pn}function Oh(I,ot){I.ambientLightColor.needsUpdate=ot,I.lightProbe.needsUpdate=ot,I.directionalLights.needsUpdate=ot,I.directionalLightShadows.needsUpdate=ot,I.pointLights.needsUpdate=ot,I.pointLightShadows.needsUpdate=ot,I.spotLights.needsUpdate=ot,I.spotLightShadows.needsUpdate=ot,I.rectAreaLights.needsUpdate=ot,I.hemisphereLights.needsUpdate=ot}function kh(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(I,ot,pt){st.get(I.texture).__webglTexture=ot,st.get(I.depthTexture).__webglTexture=pt;const mt=st.get(I);mt.__hasExternalTextures=!0,mt.__autoAllocateDepthBuffer=pt===void 0,mt.__autoAllocateDepthBuffer||dt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),mt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(I,ot){const pt=st.get(I);pt.__webglFramebuffer=ot,pt.__useDefaultFramebuffer=ot===void 0},this.setRenderTarget=function(I,ot=0,pt=0){E=I,_=ot,S=pt;let mt=!0,at=null,Nt=!1,kt=!1;if(I){const Wt=st.get(I);if(Wt.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(U.FRAMEBUFFER,null),mt=!1;else if(Wt.__webglFramebuffer===void 0)D.setupRenderTarget(I);else if(Wt.__hasExternalTextures)D.rebindTextures(I,st.get(I.texture).__webglTexture,st.get(I.depthTexture).__webglTexture);else if(I.depthBuffer){const Xt=I.depthTexture;if(Wt.__boundDepthTexture!==Xt){if(Xt!==null&&st.has(Xt)&&(I.width!==Xt.image.width||I.height!==Xt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(I)}}const Kt=I.texture;(Kt.isData3DTexture||Kt.isDataArrayTexture||Kt.isCompressedArrayTexture)&&(kt=!0);const Jt=st.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Jt[ot])?at=Jt[ot][pt]:at=Jt[ot],Nt=!0):I.samples>0&&D.useMultisampledRTT(I)===!1?at=st.get(I).__webglMultisampledFramebuffer:Array.isArray(Jt)?at=Jt[pt]:at=Jt,R.copy(I.viewport),F.copy(I.scissor),B=I.scissorTest}else R.copy(rt).multiplyScalar(k).floor(),F.copy(At).multiplyScalar(k).floor(),B=Ct;if(yt.bindFramebuffer(U.FRAMEBUFFER,at)&&mt&&yt.drawBuffers(I,at),yt.viewport(R),yt.scissor(F),yt.setScissorTest(B),Nt){const Wt=st.get(I.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Wt.__webglTexture,pt)}else if(kt){const Wt=st.get(I.texture),Kt=ot||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Wt.__webglTexture,pt||0,Kt)}w=-1},this.readRenderTargetPixels=function(I,ot,pt,mt,at,Nt,kt){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Vt=st.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&kt!==void 0&&(Vt=Vt[kt]),Vt){yt.bindFramebuffer(U.FRAMEBUFFER,Vt);try{const Wt=I.texture,Kt=Wt.format,Jt=Wt.type;if(!St.textureFormatReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!St.textureTypeReadable(Jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ot>=0&&ot<=I.width-mt&&pt>=0&&pt<=I.height-at&&U.readPixels(ot,pt,mt,at,vt.convert(Kt),vt.convert(Jt),Nt)}finally{const Wt=E!==null?st.get(E).__webglFramebuffer:null;yt.bindFramebuffer(U.FRAMEBUFFER,Wt)}}},this.readRenderTargetPixelsAsync=async function(I,ot,pt,mt,at,Nt,kt){if(!(I&&I.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Vt=st.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&kt!==void 0&&(Vt=Vt[kt]),Vt){const Wt=I.texture,Kt=Wt.format,Jt=Wt.type;if(!St.textureFormatReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!St.textureTypeReadable(Jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(ot>=0&&ot<=I.width-mt&&pt>=0&&pt<=I.height-at){yt.bindFramebuffer(U.FRAMEBUFFER,Vt);const Xt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Xt),U.bufferData(U.PIXEL_PACK_BUFFER,Nt.byteLength,U.STREAM_READ),U.readPixels(ot,pt,mt,at,vt.convert(Kt),vt.convert(Jt),0);const le=E!==null?st.get(E).__webglFramebuffer:null;yt.bindFramebuffer(U.FRAMEBUFFER,le);const ge=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await fd(U,ge,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Xt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Nt),U.deleteBuffer(Xt),U.deleteSync(ge),Nt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(I,ot=null,pt=0){I.isTexture!==!0&&(js("WebGLRenderer: copyFramebufferToTexture function signature has changed."),ot=arguments[0]||null,I=arguments[1]);const mt=Math.pow(2,-pt),at=Math.floor(I.image.width*mt),Nt=Math.floor(I.image.height*mt),kt=ot!==null?ot.x:0,Vt=ot!==null?ot.y:0;D.setTexture2D(I,0),U.copyTexSubImage2D(U.TEXTURE_2D,pt,0,0,kt,Vt,at,Nt),yt.unbindTexture()},this.copyTextureToTexture=function(I,ot,pt=null,mt=null,at=0){I.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture function signature has changed."),mt=arguments[0]||null,I=arguments[1],ot=arguments[2],at=arguments[3]||0,pt=null);let Nt,kt,Vt,Wt,Kt,Jt,Xt,le,ge;const ve=I.isCompressedTexture?I.mipmaps[at]:I.image;pt!==null?(Nt=pt.max.x-pt.min.x,kt=pt.max.y-pt.min.y,Vt=pt.isBox3?pt.max.z-pt.min.z:1,Wt=pt.min.x,Kt=pt.min.y,Jt=pt.isBox3?pt.min.z:0):(Nt=ve.width,kt=ve.height,Vt=ve.depth||1,Wt=0,Kt=0,Jt=0),mt!==null?(Xt=mt.x,le=mt.y,ge=mt.z):(Xt=0,le=0,ge=0);const Ke=vt.convert(ot.format),ue=vt.convert(ot.type);let qt;ot.isData3DTexture?(D.setTexture3D(ot,0),qt=U.TEXTURE_3D):ot.isDataArrayTexture||ot.isCompressedArrayTexture?(D.setTexture2DArray(ot,0),qt=U.TEXTURE_2D_ARRAY):(D.setTexture2D(ot,0),qt=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,ot.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ot.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,ot.unpackAlignment);const Fn=U.getParameter(U.UNPACK_ROW_LENGTH),he=U.getParameter(U.UNPACK_IMAGE_HEIGHT),pn=U.getParameter(U.UNPACK_SKIP_PIXELS),Gi=U.getParameter(U.UNPACK_SKIP_ROWS),Qe=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ve.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ve.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Wt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Kt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Jt);const Ls=I.isDataArrayTexture||I.isData3DTexture,_e=ot.isDataArrayTexture||ot.isData3DTexture;if(I.isRenderTargetTexture||I.isDepthTexture){const bn=st.get(I),Ds=st.get(ot),an=st.get(bn.__renderTarget),Qn=st.get(Ds.__renderTarget);yt.bindFramebuffer(U.READ_FRAMEBUFFER,an.__webglFramebuffer),yt.bindFramebuffer(U.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let ti=0;ti<Vt;ti++)Ls&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,st.get(I).__webglTexture,at,Jt+ti),I.isDepthTexture?(_e&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,st.get(ot).__webglTexture,at,ge+ti),U.blitFramebuffer(Wt,Kt,Nt,kt,Xt,le,Nt,kt,U.DEPTH_BUFFER_BIT,U.NEAREST)):_e?U.copyTexSubImage3D(qt,at,Xt,le,ge+ti,Wt,Kt,Nt,kt):U.copyTexSubImage2D(qt,at,Xt,le,ge+ti,Wt,Kt,Nt,kt);yt.bindFramebuffer(U.READ_FRAMEBUFFER,null),yt.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else _e?I.isDataTexture||I.isData3DTexture?U.texSubImage3D(qt,at,Xt,le,ge,Nt,kt,Vt,Ke,ue,ve.data):ot.isCompressedArrayTexture?U.compressedTexSubImage3D(qt,at,Xt,le,ge,Nt,kt,Vt,Ke,ve.data):U.texSubImage3D(qt,at,Xt,le,ge,Nt,kt,Vt,Ke,ue,ve):I.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,at,Xt,le,Nt,kt,Ke,ue,ve.data):I.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,at,Xt,le,ve.width,ve.height,Ke,ve.data):U.texSubImage2D(U.TEXTURE_2D,at,Xt,le,Nt,kt,Ke,ue,ve);U.pixelStorei(U.UNPACK_ROW_LENGTH,Fn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,he),U.pixelStorei(U.UNPACK_SKIP_PIXELS,pn),U.pixelStorei(U.UNPACK_SKIP_ROWS,Gi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Qe),at===0&&ot.generateMipmaps&&U.generateMipmap(qt),yt.unbindTexture()},this.copyTextureToTexture3D=function(I,ot,pt=null,mt=null,at=0){return I.isTexture!==!0&&(js("WebGLRenderer: copyTextureToTexture3D function signature has changed."),pt=arguments[0]||null,mt=arguments[1]||null,I=arguments[2],ot=arguments[3],at=arguments[4]||0),js('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(I,ot,pt,mt,at)},this.initRenderTarget=function(I){st.get(I).__webglFramebuffer===void 0&&D.setupRenderTarget(I)},this.initTexture=function(I){I.isCubeTexture?D.setTextureCube(I,0):I.isData3DTexture?D.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?D.setTexture2DArray(I,0):D.setTexture2D(I,0),yt.unbindTexture()},this.resetState=function(){_=0,S=0,E=null,yt.reset(),Lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return qn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}}class Sl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=e,this.far=n}clone(){return new Sl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class bx extends De{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Un,this.environmentIntensity=1,this.environmentRotation=new Un,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class wx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ja,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ye=new Q;class pi{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyMatrix4(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.applyNormalMatrix(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ye.fromBufferAttribute(this,e),Ye.transformDirection(t),this.setXYZ(e,Ye.x,Ye.y,Ye.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=_n(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=de(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=de(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=_n(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=_n(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=_n(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=_n(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=de(e,this.array),n=de(n,this.array),s=de(s,this.array),r=de(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new pi(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class mh extends qe{constructor(t=null,e=1,n=1,s,r,o,a,l,c=on,u=on,d,f){super(null,o,a,l,c,u,s,r,d,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Js extends Me{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ns=new ae,Vc=new ae,Pr=[],Wc=new Nn,Ex=new ae,Fs=new jt,Os=new yi;class Tx extends jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Js(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ex)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Nn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),Wc.copy(t.boundingBox).applyMatrix4(ns),this.boundingBox.union(Wc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new yi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ns),Os.copy(t.boundingSphere).applyMatrix4(ns),this.boundingSphere.union(Os)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Fs.geometry=this.geometry,Fs.material=this.material,Fs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Os.copy(this.boundingSphere),Os.applyMatrix4(n),t.ray.intersectsSphere(Os)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ns),Vc.multiplyMatrices(n,ns),Fs.matrixWorld=Vc,Fs.raycast(t,Pr);for(let o=0,a=Pr.length;o<a;o++){const l=Pr[o];l.instanceId=r,l.object=this,e.push(l)}Pr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Js(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new mh(new Float32Array(s*this.count),s,this.count,lo,Ln));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Ax extends Ts{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Xc=new ae,Ja=new gl,Lr=new yi,Dr=new Q;class Rx extends De{constructor(t=new pe,e=new Ax){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lr.copy(n.boundingSphere),Lr.applyMatrix4(s),Lr.radius+=r,t.ray.intersectsSphere(Lr)===!1)return;Xc.copy(s).invert(),Ja.copy(t.ray).applyMatrix4(Xc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let m=f,x=h;m<x;m++){const g=c.getX(m);Dr.fromBufferAttribute(d,g),qc(Dr,g,l,s,t,e,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let m=f,x=h;m<x;m++)Dr.fromBufferAttribute(d,m),qc(Dr,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function qc(i,t,e,n,s,r,o){const a=Ja.distanceSqToPoint(i);if(a<e){const l=new Q;Ja.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class gh extends qe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bl extends pe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new Q,u=new Yt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=e;d++,f+=3){const h=n+d/e*s;c.x=t*Math.cos(h),c.y=t*Math.sin(h),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/t+1)/2,u.y=(o[f+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(a,3)),this.setAttribute("uv",new ne(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Cs extends pe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],f=[],h=[];let m=0;const x=[],g=n/2;let p=0;b(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new ne(d,3)),this.setAttribute("normal",new ne(f,3)),this.setAttribute("uv",new ne(h,2));function b(){const v=new Q,T=new Q;let _=0;const S=(e-t)/n;for(let E=0;E<=r;E++){const w=[],y=E/r,R=y*(e-t)+t;for(let F=0;F<=s;F++){const B=F/s,Y=B*l+a,Z=Math.sin(Y),H=Math.cos(Y);T.x=R*Z,T.y=-y*n+g,T.z=R*H,d.push(T.x,T.y,T.z),v.set(Z,S,H).normalize(),f.push(v.x,v.y,v.z),h.push(B,1-y),w.push(m++)}x.push(w)}for(let E=0;E<s;E++)for(let w=0;w<r;w++){const y=x[w][E],R=x[w+1][E],F=x[w+1][E+1],B=x[w][E+1];(t>0||w!==0)&&(u.push(y,R,B),_+=3),(e>0||w!==r-1)&&(u.push(R,F,B),_+=3)}c.addGroup(p,_,0),p+=_}function M(v){const T=m,_=new Yt,S=new Q;let E=0;const w=v===!0?t:e,y=v===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,g*y,0),f.push(0,y,0),h.push(.5,.5),m++;const R=m;for(let F=0;F<=s;F++){const Y=F/s*l+a,Z=Math.cos(Y),H=Math.sin(Y);S.x=w*H,S.y=g*y,S.z=w*Z,d.push(S.x,S.y,S.z),f.push(0,y,0),_.x=Z*.5+.5,_.y=H*.5*y+.5,h.push(_.x,_.y),m++}for(let F=0;F<s;F++){const B=T+F,Y=R+F;v===!0?u.push(Y,Y+1,B):u.push(Y+1,Y,B),E+=3}c.addGroup(p,E,v===!0?1:2),p+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class wl extends Cs{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new wl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ho extends pe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(b){const M=new Q,v=new Q,T=new Q;for(let _=0;_<e.length;_+=3)h(e[_+0],M),h(e[_+1],v),h(e[_+2],T),l(M,v,T,b)}function l(b,M,v,T){const _=T+1,S=[];for(let E=0;E<=_;E++){S[E]=[];const w=b.clone().lerp(v,E/_),y=M.clone().lerp(v,E/_),R=_-E;for(let F=0;F<=R;F++)F===0&&E===_?S[E][F]=w:S[E][F]=w.clone().lerp(y,F/R)}for(let E=0;E<_;E++)for(let w=0;w<2*(_-E)-1;w++){const y=Math.floor(w/2);w%2===0?(f(S[E][y+1]),f(S[E+1][y]),f(S[E][y])):(f(S[E][y+1]),f(S[E+1][y+1]),f(S[E+1][y]))}}function c(b){const M=new Q;for(let v=0;v<r.length;v+=3)M.x=r[v+0],M.y=r[v+1],M.z=r[v+2],M.normalize().multiplyScalar(b),r[v+0]=M.x,r[v+1]=M.y,r[v+2]=M.z}function u(){const b=new Q;for(let M=0;M<r.length;M+=3){b.x=r[M+0],b.y=r[M+1],b.z=r[M+2];const v=g(b)/2/Math.PI+.5,T=p(b)/Math.PI+.5;o.push(v,1-T)}m(),d()}function d(){for(let b=0;b<o.length;b+=6){const M=o[b+0],v=o[b+2],T=o[b+4],_=Math.max(M,v,T),S=Math.min(M,v,T);_>.9&&S<.1&&(M<.2&&(o[b+0]+=1),v<.2&&(o[b+2]+=1),T<.2&&(o[b+4]+=1))}}function f(b){r.push(b.x,b.y,b.z)}function h(b,M){const v=b*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function m(){const b=new Q,M=new Q,v=new Q,T=new Q,_=new Yt,S=new Yt,E=new Yt;for(let w=0,y=0;w<r.length;w+=9,y+=6){b.set(r[w+0],r[w+1],r[w+2]),M.set(r[w+3],r[w+4],r[w+5]),v.set(r[w+6],r[w+7],r[w+8]),_.set(o[y+0],o[y+1]),S.set(o[y+2],o[y+3]),E.set(o[y+4],o[y+5]),T.copy(b).add(M).add(v).divideScalar(3);const R=g(T);x(_,y+0,b,R),x(S,y+2,M,R),x(E,y+4,v,R)}}function x(b,M,v,T){T<0&&b.x===1&&(o[M]=b.x-1),v.x===0&&v.z===0&&(o[M]=T/2/Math.PI+.5)}function g(b){return Math.atan2(b.z,-b.x)}function p(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ho(t.vertices,t.indices,t.radius,t.details)}}const Ir=new Q,zr=new Q,jo=new Q,Ur=new un;class Cx extends pe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ds*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),f={},h=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:x,b:g,c:p}=Ur;if(x.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Ur.getNormal(jo),d[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,d[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let b=0;b<3;b++){const M=(b+1)%3,v=d[b],T=d[M],_=Ur[u[b]],S=Ur[u[M]],E=`${v}_${T}`,w=`${T}_${v}`;w in f&&f[w]?(jo.dot(f[w].normal)<=r&&(h.push(_.x,_.y,_.z),h.push(S.x,S.y,S.z)),f[w]=null):E in f||(f[E]={index0:c[b],index1:c[M],normal:jo.clone()})}}for(const m in f)if(f[m]){const{index0:x,index1:g}=f[m];Ir.fromBufferAttribute(a,x),zr.fromBufferAttribute(a,g),h.push(Ir.x,Ir.y,Ir.z),h.push(zr.x,zr.y,zr.z)}this.setAttribute("position",new ne(h,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class mi extends ho{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mi(t.radius,t.detail)}}class Zn extends pe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let d=t;const f=(e-t)/s,h=new Q,m=new Yt;for(let x=0;x<=s;x++){for(let g=0;g<=n;g++){const p=r+g/n*o;h.x=d*Math.cos(p),h.y=d*Math.sin(p),l.push(h.x,h.y,h.z),c.push(0,0,1),m.x=(h.x/e+1)/2,m.y=(h.y/e+1)/2,u.push(m.x,m.y)}d+=f}for(let x=0;x<s;x++){const g=x*(n+1);for(let p=0;p<n;p++){const b=p+g,M=b,v=b+n+1,T=b+n+2,_=b+1;a.push(M,v,_),a.push(v,T,_)}}this.setIndex(a),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(c,3)),this.setAttribute("uv",new ne(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Zn(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class El extends ho{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new El(t.radius,t.detail)}}class Tl extends pe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new Q,d=new Q,f=new Q;for(let h=0;h<=n;h++)for(let m=0;m<=s;m++){const x=m/s*r,g=h/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(x),d.y=(t+e*Math.cos(g))*Math.sin(x),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),f.subVectors(d,u).normalize(),l.push(f.x,f.y,f.z),c.push(m/s),c.push(h/n)}for(let h=1;h<=n;h++)for(let m=1;m<=s;m++){const x=(s+1)*h+m-1,g=(s+1)*(h-1)+m-1,p=(s+1)*(h-1)+m,b=(s+1)*h+m;o.push(x,g,b),o.push(g,p,b)}this.setIndex(o),this.setAttribute("position",new ne(a,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Tl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Px extends pe{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,s=new Q,r=new Q;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const d=l[c],f=d.start,h=d.count;for(let m=f,x=f+h;m<x;m+=3)for(let g=0;g<3;g++){const p=a.getX(m+g),b=a.getX(m+(g+1)%3);s.fromBufferAttribute(o,p),r.fromBufferAttribute(o,b),Yc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,d=3*a+(c+1)%3;s.fromBufferAttribute(o,u),r.fromBufferAttribute(o,d),Yc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new ne(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Yc(i,t,e){const n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(s)===!0?!1:(e.add(n),e.add(s),!0)}class Lx extends Ae{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Qa extends Ts{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Qu,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Un,this.combine=ll,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Al extends De{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Dx extends Al{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Ko=new ae,$c=new Q,jc=new Q;class xh{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Yt(512,512),this.map=null,this.mapPass=null,this.matrix=new ae,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vl,this._frameExtents=new Yt(1,1),this._viewportCount=1,this._viewports=[new oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;$c.setFromMatrixPosition(t.matrixWorld),e.position.copy($c),jc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(jc),e.updateMatrixWorld(),Ko.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ko),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ko)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Kc=new ae,ks=new Q,Zo=new Q;class Ix extends xh{constructor(){super(new rn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Yt(4,2),this._viewportCount=6,this._viewports=[new oe(2,1,1,1),new oe(0,1,1,1),new oe(3,1,1,1),new oe(1,1,1,1),new oe(3,0,1,1),new oe(1,0,1,1)],this._cubeDirections=[new Q(1,0,0),new Q(-1,0,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,1,0),new Q(0,-1,0)],this._cubeUps=[new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,0,1),new Q(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ks.setFromMatrixPosition(t.matrixWorld),n.position.copy(ks),Zo.copy(n.position),Zo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Zo),n.updateMatrixWorld(),s.makeTranslation(-ks.x,-ks.y,-ks.z),Kc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Kc)}}class zx extends Al{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Ix}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ux extends xh{constructor(){super(new _l(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zc extends Al{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(De.DEFAULT_UP),this.updateMatrix(),this.target=new De,this.shadow=new Ux}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class vh extends pe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class _h{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Jc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Jc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Jc(){return performance.now()}class tl extends wx{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Qc=new ae;class tu{constructor(t,e,n=0,s=1/0){this.ray=new gl(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new xl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Qc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qc),this}intersectObject(t,e=!0,n=[]){return el(t,this,n,e),n.sort(eu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)el(t[s],this,n,e);return n.sort(eu),n}}function eu(i,t){return i.distance-t.distance}function el(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)el(r[o],t,e,!0)}}const nu=new Q,Nr=new Q;class Nx{constructor(t=new Q,e=new Q){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){nu.subVectors(t,this.start),Nr.subVectors(this.end,this.start);const n=Nr.dot(Nr);let r=Nr.dot(nu)/n;return e&&(r=We(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:al}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=al);const yh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Bi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Fx=new _l(-1,1,1,-1,0,1);class Ox extends pe{constructor(){super(),this.setAttribute("position",new ne([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ne([0,2,0,0,2,0],2))}}const kx=new Ox;class fo{constructor(t){this._mesh=new jt(kx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Fx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Bx extends Bi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ae?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=_i.clone(t.uniforms),this.material=new Ae({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new fo(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class iu extends Bi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Gx extends Bi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Hx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Yt);this._width=n.width,this._height=n.height,e=new fn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:In}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Bx(yh),this.copyPass.material.blending=$n,this.clock=new _h}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}iu!==void 0&&(o instanceof iu?n=!0:o instanceof Gx&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Yt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Vx extends Bi{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ht}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const Wx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ht(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ms extends Bi{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Yt(t.x,t.y):new Yt(256,256),this.clearColor=new Ht(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new fn(r,o,{type:In}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const f=new fn(r,o,{type:In});f.texture.name="UnrealBloomPass.h"+d,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const h=new fn(r,o,{type:In});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),o=Math.round(o/2)}const a=Wx;this.highPassUniforms=_i.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ae({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new Yt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=yh;this.copyUniforms=_i.clone(u.uniforms),this.blendMaterial=new Ae({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:ke,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ht,this.oldClearAlpha=1,this.basic=new Te,this.fsQuad=new fo(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Yt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ms.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ms.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ae({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Yt(.5,.5)},direction:{value:new Yt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Ae({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Ms.BlurDirectionX=new Yt(1,0);Ms.BlurDirectionY=new Yt(0,1);const Xx={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class qx extends Bi{constructor(){super();const t=Xx;this.uniforms=_i.clone(t.uniforms),this.material=new Lx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new fo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},re.getTransfer(this._outputColorSpace)===fe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Fu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ou?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ku?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Bu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Gu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Hu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Yx=512,$x=2,jx=.42;class Kx extends Bi{constructor(t){super(),this.camera=t,this.needsSwap=!0,this.mat=new Ae({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tMask:{value:null},uProjInv:{value:new ae},uCam:{value:new ae},uW0:{value:new Yt},uBg:{value:new Ht(xe.background)},uGhost:{value:jx},uOn:{value:1},uShroud:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse, tDepth, tMask; uniform mat4 uProjInv, uCam; uniform vec2 uW0; uniform vec3 uBg; uniform float uGhost, uOn, uShroud;
        varying vec2 vUv;
        const float RES = ${Yx.toFixed(1)}; const float K = ${$x.toFixed(1)};
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
        }`,depthTest:!1,depthWrite:!1}),this.quad=new fo(this.mat)}setMask(t){this.mat.uniforms.tMask.value=t}setWindow(t,e){this.mat.uniforms.uW0.value.set(t,e)}setShroud(t){this.mat.uniforms.uShroud.value=t}setEnabled(t){this.mat.uniforms.uOn.value=t?1:0,this.enabled=!!t}render(t,e,n){const s=this.mat.uniforms;s.tDiffuse.value=n.texture,s.tDepth.value=n.depthTexture,this.camera.updateMatrixWorld(),s.uProjInv.value.copy(this.camera.projectionMatrixInverse),s.uCam.value.copy(this.camera.matrixWorld),t.setRenderTarget(this.renderToScreen?null:e),this.quad.render(t)}dispose(){this.mat.dispose(),this.quad.dispose()}}const su=new Nn,Fr=new Q;class po extends vh{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new ne(t,3)),this.setAttribute("uv",new ne(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new tl(e,6,1);return this.setAttribute("instanceStart",new pi(n,3,0)),this.setAttribute("instanceEnd",new pi(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new tl(e,6,1);return this.setAttribute("instanceColorStart",new pi(n,3,0)),this.setAttribute("instanceColorEnd",new pi(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Px(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Nn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),su.setFromBufferAttribute(e),this.boundingBox.union(su))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new yi),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Fr.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Fr)),Fr.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Fr));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}Ft.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Yt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ze.line={uniforms:_i.merge([Ft.common,Ft.fog,Ft.line]),vertexShader:`
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
		`};class mo extends Ae{static get type(){return"LineMaterial"}constructor(t){super({uniforms:_i.clone(Ze.line.uniforms),vertexShader:Ze.line.vertexShader,fragmentShader:Ze.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Jo=new oe,ru=new Q,ou=new Q,Ue=new oe,Ne=new oe,En=new oe,Qo=new Q,ta=new ae,Fe=new Nx,au=new Q,Or=new Nn,kr=new yi,Tn=new oe;let Pn,Fi;function lu(i,t,e){return Tn.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),Tn.multiplyScalar(1/Tn.w),Tn.x=Fi/e.width,Tn.y=Fi/e.height,Tn.applyMatrix4(i.projectionMatrixInverse),Tn.multiplyScalar(1/Tn.w),Math.abs(Math.max(Tn.x,Tn.y))}function Zx(i,t){const e=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,s.count);for(let a=0,l=o;a<l;a++){Fe.start.fromBufferAttribute(s,a),Fe.end.fromBufferAttribute(r,a),Fe.applyMatrix4(e);const c=new Q,u=new Q;Pn.distanceSqToSegment(Fe.start,Fe.end,u,c),u.distanceTo(c)<Fi*.5&&t.push({point:u,pointOnLine:c,distance:Pn.origin.distanceTo(u),object:i,face:null,faceIndex:a,uv:null,uv1:null})}}function Jx(i,t,e){const n=t.projectionMatrix,r=i.material.resolution,o=i.matrixWorld,a=i.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),d=-t.near;Pn.at(1,En),En.w=1,En.applyMatrix4(t.matrixWorldInverse),En.applyMatrix4(n),En.multiplyScalar(1/En.w),En.x*=r.x/2,En.y*=r.y/2,En.z=0,Qo.copy(En),ta.multiplyMatrices(t.matrixWorldInverse,o);for(let f=0,h=u;f<h;f++){if(Ue.fromBufferAttribute(l,f),Ne.fromBufferAttribute(c,f),Ue.w=1,Ne.w=1,Ue.applyMatrix4(ta),Ne.applyMatrix4(ta),Ue.z>d&&Ne.z>d)continue;if(Ue.z>d){const M=Ue.z-Ne.z,v=(Ue.z-d)/M;Ue.lerp(Ne,v)}else if(Ne.z>d){const M=Ne.z-Ue.z,v=(Ne.z-d)/M;Ne.lerp(Ue,v)}Ue.applyMatrix4(n),Ne.applyMatrix4(n),Ue.multiplyScalar(1/Ue.w),Ne.multiplyScalar(1/Ne.w),Ue.x*=r.x/2,Ue.y*=r.y/2,Ne.x*=r.x/2,Ne.y*=r.y/2,Fe.start.copy(Ue),Fe.start.z=0,Fe.end.copy(Ne),Fe.end.z=0;const x=Fe.closestPointToPointParameter(Qo,!0);Fe.at(x,au);const g=Wn.lerp(Ue.z,Ne.z,x),p=g>=-1&&g<=1,b=Qo.distanceTo(au)<Fi*.5;if(p&&b){Fe.start.fromBufferAttribute(l,f),Fe.end.fromBufferAttribute(c,f),Fe.start.applyMatrix4(o),Fe.end.applyMatrix4(o);const M=new Q,v=new Q;Pn.distanceSqToSegment(Fe.start,Fe.end,v,M),e.push({point:v,pointOnLine:M,distance:Pn.origin.distanceTo(v),object:i,face:null,faceIndex:f,uv:null,uv1:null})}}}class Rl extends jt{constructor(t=new po,e=new mo({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)ru.fromBufferAttribute(e,o),ou.fromBufferAttribute(n,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+ru.distanceTo(ou);const r=new tl(s,2,1);return t.setAttribute("instanceDistanceStart",new pi(r,1,0)),t.setAttribute("instanceDistanceEnd",new pi(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,s=t.camera;s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Pn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Fi=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),kr.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=Fi*.5;else{const d=Math.max(s.near,kr.distanceToPoint(Pn.origin));c=lu(s,d,l.resolution)}if(kr.radius+=c,Pn.intersectsSphere(kr)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Or.copy(a.boundingBox).applyMatrix4(o);let u;if(n)u=Fi*.5;else{const d=Math.max(s.near,Or.distanceToPoint(Pn.origin));u=lu(s,d,l.resolution)}Or.expandByScalar(u),Pn.intersectsBox(Or)!==!1&&(n?Zx(this,e):Jx(this,s,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Jo),this.material.uniforms.resolution.value.set(Jo.z,Jo.w))}}const Qx=.38,tv=4.4,Br=3,ai=3.2,Qs=i=>.05+i*.18,Oe=i=>i?Qs(i.clearance):.05,Xn=.05+3*.18+tv,ev=i=>i.solid?Xn:Qs(i.clearance),nv=Xn,ee={FLOOR:0,TILES:1,SOLIDS:2,BORDERS:3,FOOT:4,CREST:5,SECTOR:6,GLOW:20,CURTAIN:21,BEAM:22,GATE_LIGHT:23,TRAIL:25,HL_FILL:30,HL_OUTLINE:31,MARKERS:32,CURSOR:33,MOTES:40};function Mh(i){return i.depthTest=!0,i.depthWrite=!1,i.polygonOffset=!0,i.polygonOffsetFactor=-2,i.polygonOffsetUnits=-2,i}function Ve(i,{depthTest:t=!0,offset:e=-1}={}){return i.transparent=!0,i.depthWrite=!1,i.depthTest=t,e&&!i.polygonOffset&&(i.polygonOffset=!0,i.polygonOffsetFactor=e,i.polygonOffsetUnits=e),i}let Bs=null;function iv(){if(Bs)return Bs;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.6,"rgba(255,255,255,0.14)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Bs=new gh(i),Bs.colorSpace=sn,Bs}const oo=4;function sv(){const i={value:Array.from({length:oo},()=>new oe(0,0,0,0))},t=new Q;return{uniform:i,update(e,n){for(let s=0;s<oo;s++){const r=n[s];if(!r||!(r.r>0)){i.value[s].set(0,0,0,0);continue}t.set(r.x,r.y,r.z).applyMatrix4(e.matrixWorldInverse),i.value[s].set(t.x,t.y,t.z,r.r)}}}}const Sh=`
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
`,bh="{ float cv = mix(uMinVis, 1.0, cutVisibility(vCutPos)); if (cv < cutDither()) discard; }";function rv(i,t,{minVis:e=.08,stripes:n=!1}={}){return i.onBeforeCompile=s=>{s.uniforms.uCut=t.uniform,s.uniforms.uMinVis={value:e},s.vertexShader=s.vertexShader.replace("void main() {",`varying vec3 vCutPos;
varying float vWY;
void main() {`).replace("#include <project_vertex>",`#include <project_vertex>
vCutPos = mvPosition.xyz;
vWY = transformed.y;`),s.fragmentShader=s.fragmentShader.replace("void main() {",`varying float vWY;
${Sh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${bh}`),n&&(s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float sy = abs(fract(vWY * 0.45) - 0.5);
         diffuseColor.rgb *= 1.0 + 1.1 * smoothstep(0.06, 0.0, sy);`))},i.customProgramCacheKey=()=>`solid-cut-${n}`,i}function ov(i,t,{minVis:e=.22}={}){return i.uniforms.uCut=t.uniform,i.uniforms.uMinVis={value:e},i.vertexShader=i.vertexShader.replace("void main() {",`varying vec3 vCutPos;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
vCutPos = ( position.y < 0.5 ? start : end ).xyz;`),i.fragmentShader=i.fragmentShader.replace("void main() {",`${Sh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${bh}`),i.needsUpdate=!0,i}const wh=.005;function av(i,t=wh){return i.uniforms.uPull={value:1-t},i.vertexShader=i.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
start.xyz *= uPull; end.xyz *= uPull;`),i.needsUpdate=!0,i}function Eh(i,t=wh){const e=i.onBeforeCompile;return i.onBeforeCompile=(n,s)=>{e==null||e(n,s),n.uniforms.uPull={value:1-t},n.vertexShader=n.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("#include <project_vertex>",`
        vec4 mvPosition = vec4( transformed, 1.0 );
        mvPosition = modelViewMatrix * mvPosition;
        mvPosition.xyz *= uPull;
        gl_Position = projectionMatrix * mvPosition;`)},i.customProgramCacheKey=()=>"pull",i}function lv(i,t,{dashed:e=!1}={}){const n=new po;n.setPositions(new Float32Array(t*6));const s=new Rl(n,i);e&&s.computeLineDistances();const r=n.attributes.instanceStart.data,o=e?n.attributes.instanceDistanceStart.data:null;return n.instanceCount=0,s.frustumCulled=!1,s.visible=!1,{line:s,set(a){const l=Math.min(Math.floor(a.length/6),t);for(let c=0;c<l*6;c++)r.array[c]=a[c];if(r.needsUpdate=!0,o){let c=0;for(let u=0;u<l;u++){const d=u*6,f=Math.hypot(a[d+3]-a[d],a[d+4]-a[d+1],a[d+5]-a[d+2]);o.array[u*2]=c,o.array[u*2+1]=c+f,c+=f}o.needsUpdate=!0}n.instanceCount=l,s.visible=l>0}}}function ea(i){const t=[],e=[],n=new ae,s=new ki,r=new Q(1,1,1),o=new Ht;for(const l of i){const c=new Dn(l.w,l.h,l.d).toNonIndexed();s.setFromAxisAngle(new Q(0,1,0),l.rot??0),n.compose(new Q(l.x,l.y,l.z),s,r),c.applyMatrix4(n),o.set(l.color).multiplyScalar(l.k??1);const u=c.getAttribute("position");for(let d=0;d<u.count;d++)t.push(u.getX(d),u.getY(d),u.getZ(d)),e.push(o.r,o.g,o.b);c.dispose()}const a=new pe;return a.setAttribute("position",new ne(t,3)),a.setAttribute("color",new ne(e,3)),a}const nl=i=>{var t;return((t=i.cut)==null?void 0:t.poly)??i.poly},cu=160;function Th({group:i,lineMats:t}){const e=({hex:n,fill:s,width:r,pulse:o})=>{const a=new pe,l=new Float32Array(cu*9);a.setAttribute("position",new Me(l,3)),a.setDrawRange(0,0);const c=Eh(Ve(new Te({color:new Ht(n),opacity:s,transparent:!0,side:ye,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))),u=new jt(a,c);u.renderOrder=ee.HL_FILL,u.frustumCulled=!1,u.visible=!1;const d=av(Ve(new mo({color:new Ht(n).multiplyScalar(1.8),linewidth:r,worldUnits:!1,transparent:!0})));t.push(d);const f=lv(d,320),h=f.line;h.renderOrder=ee.HL_OUTLINE,i.add(u,h);let m=null,x=s;return{get cell(){return m},set(g,{blocked:p=!1}={}){if(!g){m=null,u.visible=h.visible=!1;return}m=g;const b=new Ht(p?xe.blocked:n);c.color.copy(b),d.color.copy(b).multiplyScalar(1.8);const M=g.solid?nl(g):g.poly,v=M.length,T=Oe(g),_=[],S=[],E=(y,R,F)=>S.push(...y,...R,...F);if(g.solid){const y=Xn;for(let R=0;R<v;R++){const F=M[R],B=M[(R+1)%v];E([g.cx,y+.03,g.cz],[F[0],y+.03,F[1]],[B[0],y+.03,B[1]]),E([F[0],T,F[1]],[B[0],T,B[1]],[B[0],y,B[1]]),E([F[0],T,F[1]],[B[0],y,B[1]],[F[0],y,F[1]]),_.push(F[0],y+.05,F[1],B[0],y+.05,B[1]),_.push(F[0],T+.06,F[1],B[0],T+.06,B[1]),_.push(F[0],T+.06,F[1],F[0],y+.05,F[1])}}else{const y=T+.03,R=T+.06;for(let F=0;F<v;F++){const B=M[F],Y=M[(F+1)%v];E([g.cx,y,g.cz],[B[0],y,B[1]],[Y[0],y,Y[1]]),_.push(B[0],R,B[1],Y[0],R,Y[1])}}const w=Math.min(S.length/9,cu);l.set(S.slice(0,w*9)),a.getAttribute("position").needsUpdate=!0,a.setDrawRange(0,w*3),f.set(_),u.visible=h.visible=!0,x=p?Math.max(s,.3):s},tick(g){m&&o?c.opacity=x*(.78+.22*Math.sin(g*4.5)):c.opacity=x}}};return{hover:e({hex:xe.hover,fill:.26,width:2.6,pulse:!0}),select:e({hex:xe.select,fill:.3,width:3.6,pulse:!1})}}function Ah(i){const t=new Ae({fog:!0,uniforms:_i.merge([Ft.fog,{uBase:{value:new Ht(xe.floor)},uFocus:{value:new Yt(0,0)}}]),vertexShader:`#include <fog_pars_vertex>
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
      }`}),e=new jt(new As(900,900),t);return e.rotation.x=-Math.PI/2,e.position.y=-.05,e.renderOrder=ee.FLOOR,i.add(e),{floor:e,floorMat:t}}const na=new WeakMap,uu=i=>`${Math.round(i[0]*20)},${Math.round(i[1]*20)}`;function cv(i){var n;if((n=i.sectorEdges)!=null&&n.length)return i.sectorEdges;if(na.has(i))return na.get(i);const t=new Map;for(const s of i.cells){const r=s.poly.length;for(let o=0;o<r;o++){const a=s.poly[o],l=s.poly[(o+1)%r],c=uu(a),u=uu(l),d=c<u?`${c}|${u}`:`${u}|${c}`,f=t.get(d);f?f.sb=s.sector:t.set(d,{a,b:l,sa:s.sector,sb:null})}}const e=[];for(const s of t.values())s.sb===null?e.push({a:s.a,b:s.b,sa:s.sa,sb:-1}):s.sb!==s.sa&&e.push(s);return na.set(i,e),e}function hu(i,t){var s,r;const e=((s=i.sectors[t.sa])==null?void 0:s.clearance)??0,n=t.sb>=0?((r=i.sectors[t.sb])==null?void 0:r.clearance)??0:0;return Math.max(e,n)}const fu=i=>`${Math.round(i[0]*1e6)},${Math.round(i[1]*1e6)}`,Ni=(i,t)=>zu(i,t);function uv(i,t){var m;const e=(m=i.span)!=null&&m.length?i.span.flatMap(x=>[x.a,x.b]):[i.edge.a,i.edge.b];let n=e[0],s=e[e.length-1],r=-1;for(let x=0;x<e.length;x++)for(let g=x+1;g<e.length;g++){const p=(e[x][0]-e[g][0])**2+(e[x][1]-e[g][1])**2;p>r&&(r=p,n=e[x],s=e[g])}const o=Math.sqrt(r)||i.len,a=(s[0]-n[0])/o,l=(s[1]-n[1])/o,c=[(n[0]+s[0])/2,(n[1]+s[1])/2];let u=-l,d=a;const f=t(i.a),h=t(i.b);return(h.cx-f.cx)*u+(h.cz-f.cz)*d<0&&(u=-u,d=-d),{s:n,e:s,mid:c,len:o,ax:a,az:l,nx:u,nz:d}}function hv(i){const t=new Set;for(const e of i)if(!e.locked)for(const n of e.span??[])t.add(Ni(n.a,n.b));return t}function fv(i,t=[]){const e=hv(i);for(const n of t)if(!n.locked)for(const s of n.edges)e.add(Ni(s.a,s.b));return e}const dv=(i,t)=>!!(i.open||i.gap||t.has(Ni(i.a,i.b))),gi=Object.freeze({minLen:.3,flat:.002,same:1e-4,endTol:1e-5}),Yn=(i,t)=>Math.hypot(i[0]-t[0],i[1]-t[1]),Gs=i=>`${Math.round(i[0]*1e7)},${Math.round(i[1]*1e7)}`,pv=(i,t)=>{const e=`${Math.round(i[0]/gi.same)},${Math.round(i[1]/gi.same)}`,n=`${Math.round(t[0]/gi.same)},${Math.round(t[1]/gi.same)}`;return e<n?`${e}|${n}`:`${n}|${e}`};function ia(i,t,e){const n=Yn(t,e);return n<1e-9?Yn(i,t):Math.abs((e[0]-t[0])*(t[1]-i[1])-(t[0]-i[0])*(e[1]-t[1]))/n}function mv(i,t,e=gi.minLen,n=gi.flat){let s=[];for(const f of i)(!s.length||Yn(f,s[s.length-1])>1e-6)&&s.push(f);t&&s.length>1&&Yn(s[0],s[s.length-1])<=1e-6&&s.pop();const r=t?3:2,o={merged:0,fused:0},a=()=>s.length,l=f=>(f-1+a())%a(),c=f=>(f+1)%a(),u=f=>t||f>0&&f<a()-1;for(let f=0;f<4096&&a()>=r;f++){let h=-1;for(let m=0;m<a()&&h<0;m++){if(!u(m))continue;const x=s[l(m)],g=s[c(m)],p=s[m],b=(g[0]-x[0])*(p[0]-x[0])+(g[1]-x[1])*(p[1]-x[1]);ia(p,x,g)<n&&b>0&&b<(g[0]-x[0])**2+(g[1]-x[1])**2&&(h=m,o.merged++)}if(h<0){let m=-1,x=e;const g=t?a():a()-1;for(let p=0;p<g;p++){const b=Yn(s[p],s[c(p)]);b<x&&(x=b,m=p)}if(m>=0){const p=m,b=c(m),M=[];if(u(p)&&M.push([ia(s[p],s[l(p)],s[b]),p]),u(b)&&M.push([ia(s[b],s[p],s[c(b)]),b]),!M.length)return null;M.sort((v,T)=>v[0]-T[0]),h=M[0][1],o.fused++}}if(h<0)break;s=s.filter((m,x)=>x!==h)}if(a()<r)return null;let d=0;for(let f=0;f<(t?a():a()-1);f++)d+=Yn(s[f],s[c(f)]);return d<e?null:Object.assign(s,{stats:o})}function gv(i){const t=new Map;i.forEach((r,o)=>{for(const a of[r.a,r.b]){const l=Gs(a);t.has(l)||t.set(l,[]),t.get(l).push(o)}});const e=new Uint8Array(i.length),n=[],s=(r,o)=>{const a=[r];let l=Gs(r),c=o;for(;;){e[c]=1;const u=i[c],d=Gs(u.a)===l?u.b:u.a;a.push(d),l=Gs(d);const f=t.get(l).filter(h=>!e[h]);if(t.get(l).length!==2||!f.length)break;c=f[0]}return a};for(const[r,o]of t)if(o.length!==2){for(const a of o)if(!e[a]){const l=i[a];n.push({pts:s(Gs(l.a)===r?l.a:l.b,a),closed:!1})}}for(let r=0;r<i.length;r++)e[r]||n.push({pts:s(i[r].a,r),closed:!0});return n}function xv(i,t=null,e=null){const n=[],s=[],r=new Set,o={chains:0,merged:0,fused:0,duplicate:0};let a=i.sectorLines;if(!a){const l=(i.sectorEdges??[]).filter(u=>!(e&&t&&e(u,t))),c=new Map;for(const u of l){const d=`${u.sa}|${u.sb}`;c.has(d)||c.set(d,{sa:u.sa,sb:u.sb,edges:[]}),c.get(d).edges.push(u)}a=[];for(const u of c.values())for(const d of gv(u.edges))a.push({...d,sa:u.sa,sb:u.sb,caps:d.closed?[]:["junction","junction"]})}for(const l of a){const c=mv(l.pts,!!l.closed);if(!c){o.chains++;continue}o.merged+=c.stats.merged,o.fused+=c.stats.fused;const u={pts:[...c],closed:!!l.closed,sa:l.sa,sb:l.sb,caps:l.caps??[],fence:!!l.fence},d=u.closed?c.length:c.length-1,f=[];for(let h=0;h<d;h++){const m=c[h],x=c[(h+1)%c.length],g=pv(m,x);if(r.has(g)){o.duplicate++;continue}r.add(g),f.push({a:m,b:x,sa:l.sa,sb:l.sb})}f.length&&(n.push(u),s.push(...f))}return{runs:n,segments:s,dropped:o}}function vv(i,t){for(const e of i){if(e.closed||e.sa!==t.sa||e.sb!==t.sb)continue;const n=[e.pts[0],e.pts[e.pts.length-1]];for(const[s,r]of n.entries())if(e.caps[s]!=="junction"&&(Yn(r,t.start)<gi.endTol||Yn(r,t.end)<gi.endTol))return!0}return!1}function _v(i,t,e,n){const s=n?i.filter(n):i;if(!t)return s;const r=new Map;for(const o of t)o.kind!=="gap"&&r.set(`${o.sa}|${o.sb}|${o.slot}`,o);return s.filter(o=>{if(o.locked)return!0;const a=r.get(`${o.sa}|${o.sb}|${o.slot}`);return!!a&&vv(e,a)})}const du=Object.freeze({spacing:5,minGap:1.2});function yv(i,t={}){const e=t.spacing??du.spacing,n=t.minGap??du.minGap,s=[];return i.forEach((r,o)=>{if(!r.fence)return;const a=r.closed?[...r.pts,r.pts[0]]:r.pts,l=[0];for(let h=1;h<a.length;h++)l.push(l[h-1]+Yn(a[h-1],a[h]));const c=l[l.length-1];if(!(c>0))return;const u=h=>{let m=1;for(;m<l.length-1&&l[m]<h;)m++;const x=(h-l[m-1])/(l[m]-l[m-1]||1);return[a[m-1][0]+(a[m][0]-a[m-1][0])*x,a[m-1][1]+(a[m][1]-a[m-1][1])*x]},d=Math.max(1,Math.round(c/e)),f=h=>!r.closed&&r.caps[h]==="opening";for(let h=0;h<=d&&!(r.closed&&h===d);h++){const m=!r.closed&&(h===0||h===d);if(m&&!f(h===0?0:1))continue;const x=h/d*c;!m&&!r.closed&&(x<n&&f(0)||c-x<n&&f(1))||s.push({p:u(x),kind:m?"end":"mid",run:o,at:x})}}),s}const go=.38,Mv=1.8,pu=Object.freeze({glow:.65,curtain:.8}),Sv=i=>i>.001?Math.min(Mv,i/go):0;function mu(i,t,e){if(!i)return;const n=Sv(e);i.opacity=Math.min(1,t*n),i.visible=n>0}const bv=8;function Rh(i,{cut:t,chunk:e=null},n=()=>performance.now()){const s={deadline:1/0,now:n,n:0},r=Ev(i,{cut:t,chunk:e},s),o={board:null,done:!1,run(a=1/0){if(o.done)return!0;s.deadline=a;const l=r.next();return s.deadline=1/0,l.done&&(o.done=!0,o.board=l.value),o.done}};return o}function wv(i,t){const e=Rh(i,t);return e.run(1/0),e.board}function*Ev(i,{cut:t,chunk:e},n){var gt,ct;const s=()=>n.deadline===1/0||++n.n<bv?!1:(n.n=0,n.now()>=n.deadline),r=new Xe,o=e?e.lineMats:[],a=[],l=new Ht,c=(e==null?void 0:e.glowRef)??{v:go},u=[],d=(P,J)=>{u.push([P,J]),mu(P,J,c.v)},f=(P,J)=>{if(!e)return J();let et=e.shared.get(P);return et||e.shared.set(P,et=J()),et},h=P=>i.cellById?i.cellById(P):i.cells[P],m=new Set(i.cells);let x=(e==null?void 0:e.shows)??null;const g=new Map(i.gates.map(P=>[P,uv(P,h)])),p=new Map;for(const P of i.edgeCells??i.cells){s()&&(yield);const J=P.poly.length;for(let et=0;et<J;et++){const bt=P.poly[et],Dt=P.poly[(et+1)%J],Pt=Ni(bt,Dt),Rt=p.get(Pt)??{a:bt,b:Dt,cells:[],bandMax:0,solid:0};Rt.cells.push(P),Rt.bandMax=Math.max(Rt.bandMax,P.clearance),P.solid&&Rt.solid++,p.set(Pt,Rt)}}const b=fv(i.gates,i.sectorOpenings),M=e?null:Ah(r).floorMat,v=[],T=new Map;for(const P of i.edgeCells??i.cells){if(s()&&(yield),!P.solid)continue;const J=nl(P),et=J.length;for(let bt=0;bt<et;bt++){const Dt=J[bt],Pt=J[(bt+1)%et],Rt=p.get(Ni(Dt,Pt));if(Rt&&Rt.solid>1)continue;const Bt=Pt[0]-Dt[0],Gt=Pt[1]-Dt[1],$t=Math.hypot(Bt,Gt);if($t<1e-4)continue;let Zt=Gt/$t,se=-Bt/$t;((Dt[0]+Pt[0])/2-P.cx)*Zt+((Dt[1]+Pt[1])/2-P.cz)*se<0&&(Zt=-Zt,se=-se);const me=Rt==null?void 0:Rt.cells.find(Sn=>Sn!==P&&!Sn.solid),dn={c:P,a:Dt,b:Pt,nx:Zt,nz:se,y0:Oe(me??P),na:null,nb:null};m.has(P)&&v.push(dn);for(const Sn of[Dt,Pt]){const Jn=fu(Sn);(T.get(Jn)??T.set(Jn,[]).get(Jn)).push([Zt,se])}}}const _=(P,J,et)=>{let bt=0,Dt=0;for(const[Rt,Bt]of T.get(fu(P)))Rt*J+Bt*et>.6&&(bt+=Rt,Dt+=Bt);const Pt=Math.hypot(bt,Dt)||1;return[bt/Pt,Dt/Pt]};for(const P of v)s()&&(yield),P.na=_(P.a,P.nx,P.nz),P.nb=_(P.b,P.nx,P.nz);const S=[],E=[],w=[],y=[],R=[],F=[],B=[],Y=[],Z=(P,J,et,bt,Dt,Pt,Rt)=>{P.push(et,bt,Dt),J.push(Pt.r*Rt,Pt.g*Rt,Pt.b*Rt)},H=new Map;for(const P of v)(H.get(P.c.id)??H.set(P.c.id,[]).get(P.c.id)).push(P);for(const P of i.cells){s()&&(yield);const J=Oe(P),et=new Ht(Mi[P.clearance]),bt=Gh(P.id);if(P.solid){if((ct=(gt=P.cut)==null?void 0:gt.open)!=null&&ct.length){const Gt=S.length/3;for(const $t of P.cut.open){let Zt=0,se=0;for(const me of $t)Zt+=me[0],se+=me[1];Zt/=$t.length,se/=$t.length;for(let me=0;me<$t.length;me++){const dn=$t[me],Sn=$t[(me+1)%$t.length];Z(S,E,Zt,J,se,et,.16),Z(S,E,dn[0],J,dn[1],et,.08),Z(S,E,Sn[0],J,Sn[1],et,.08)}}Y[P.id]={start:Gt,count:S.length/3-Gt}}const Dt=nl(P),Pt=Dt.length,Rt=w.length/3,Bt=(Gt,$t,Zt)=>{Z(w,y,Gt,Xn,$t,et,Zt),R.push(0,1,0)};for(let Gt=0;Gt<Pt;Gt++){const $t=Dt[Gt],Zt=Dt[(Gt+1)%Pt];Bt(P.cx,P.cz,.05+.03*bt),Bt($t[0],$t[1],.1),Bt(Zt[0],Zt[1],.1)}for(const Gt of H.get(P.id)??[]){const $t=(Zt,se,me,dn)=>{Z(w,y,Zt[0],me,Zt[1],et,dn),R.push(se[0],0,se[1])};$t(Gt.a,Gt.na,Gt.y0,.62),$t(Gt.b,Gt.nb,Gt.y0,.62),$t(Gt.b,Gt.nb,Xn,.16),$t(Gt.a,Gt.na,Gt.y0,.62),$t(Gt.b,Gt.nb,Xn,.16),$t(Gt.a,Gt.na,Xn,.16)}B[P.id]={start:Rt,count:w.length/3-Rt}}else{const Dt=P.poly.length,Pt=Math.max(.5,1-Qx/Math.max(P.radius,1)),Rt=P.poly.map(([Zt,se])=>[P.cx+(Zt-P.cx)*Pt,P.cz+(se-P.cz)*Pt]),Bt=.2+.1*bt,Gt=.07+.05*bt,$t=S.length/3;for(let Zt=0;Zt<Dt;Zt++){const se=Rt[Zt],me=Rt[(Zt+1)%Dt];Z(S,E,P.cx,J,P.cz,et,Bt),Z(S,E,se[0],J,se[1],et,Gt),Z(S,E,me[0],J,me[1],et,Gt)}F[P.id]={start:$t,count:S.length/3-$t}}}const V=Float32Array.from(E),k=Float32Array.from(y),tt=(P,J,et,bt,Dt)=>{const Pt=new pe;Pt.setAttribute("position",new ne(P,3)),Pt.setAttribute("color",new ne(J,3)),et?Pt.setAttribute("normal",new ne(et,3)):Pt.computeVertexNormals();const Rt=new jt(Pt,bt);return Rt.renderOrder=Dt,r.add(Rt),Rt},ut=new Array(S.length).fill(0).map((P,J)=>J%3===1?1:0),rt=tt(S,E,ut,f("tiles",()=>new Qa({vertexColors:!0,side:ye,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),ee.TILES),At=w.length?tt(w,y,R,f("walls",()=>rv(new Qa({vertexColors:!0,side:ye,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),t,{minVis:.07,stripes:!0})),ee.SOLIDS):null,Ct=(P,J,et,bt,{cutaway:Dt=!1,minVis:Pt=.25}={})=>{if(!P.length)return null;const Rt=new po;Rt.setPositions(P),Rt.setColors(J);const Bt=f(`line${et}|${Dt}|${Pt}`,()=>{const $t=Mh(new mo({vertexColors:!0,linewidth:et,worldUnits:!1,fog:!0}));return Dt&&ov($t,t,{minVis:Pt}),o.push($t),$t}),Gt=new Rl(Rt,Bt);return Gt.renderOrder=bt,Gt.frustumCulled=!1,r.add(Gt),Gt},lt=(P,J,et,bt,Dt,Pt,Rt)=>{P.push(et[0],Dt,et[1],bt[0],Pt,bt[1]),J.push(Rt.r,Rt.g,Rt.b,Rt.r,Rt.g,Rt.b)},wt=cv(i),zt=new Set(wt.map(P=>Ni(P.a,P.b))),xt=[],Ut=[];for(const P of p.values()){if(s()&&(yield),P.solid||P.cells.length<2||P.cells[0].sector!==P.cells[1].sector||!m.has(P.cells[0])||zt.has(Ni(P.a,P.b)))continue;l.set(Mi[P.bandMax]).multiplyScalar(.9);const J=Qs(P.bandMax)+.02;lt(xt,Ut,P.a,P.b,J,J,l)}const L=[],W=[],it=[],nt=[];for(const P of v){s()&&(yield);const J=P.c.clearance;l.set(Mi[J]).multiplyScalar(1.7),lt(L,W,P.a,P.b,Xn+.02,Xn+.02,l),l.set(Mi[J]).multiplyScalar(1),lt(it,nt,P.a,P.b,P.y0+.03,P.y0+.03,l)}const K=[],U=[],Et=[],dt=[],St=[],yt=xv(i,b,dv);for(const P of yt.segments){s()&&(yield);const J=hu(i,P),et=Qs(J)+.06;l.set(Mi[J]);const bt=l.clone(),Dt=P.a,Pt=P.b;lt(Et,dt,Dt,Pt,et,et,l.clone().multiplyScalar(1.9)),lt(K,U,Dt,Pt,et+Br,et+Br,l.clone().multiplyScalar(1.5)),St.push({a:Dt,b:Pt,base:et,col:bt})}if(Ct(xt,Ut,1.1,ee.BORDERS),Ct(it,nt,1.5,ee.FOOT),Ct(L,W,2.8,ee.CREST,{cutaway:!0,minVis:.3}),Ct(Et,dt,3.4,ee.SECTOR),Ct(K,U,2,ee.SECTOR,{cutaway:!0,minVis:.3}),St.length){const P=[],J=[];for(const Dt of St){s()&&(yield);const{a:Pt,b:Rt,base:Bt,col:Gt}=Dt,$t=Bt+Br,Zt=(se,me,dn)=>{P.push(se[0],me,se[1]),J.push(Gt.r,Gt.g,Gt.b,dn)};Zt(Pt,Bt,.34),Zt(Rt,Bt,.34),Zt(Rt,$t,0),Zt(Pt,Bt,.34),Zt(Rt,$t,0),Zt(Pt,$t,0)}const et=new pe;et.setAttribute("position",new ne(P,3)),et.setAttribute("color",new ne(J,4));const bt=new jt(et,f("curtain",()=>Ve(new Te({vertexColors:!0,transparent:!0,blending:ke,side:ye,toneMapped:!1}))));d(bt.material,pu.curtain),bt.renderOrder=ee.CURTAIN,bt.frustumCulled=!1,r.add(bt)}{const P=[];for(const J of yv(yt.runs)){s()&&(yield);const et=yt.runs[J.run],bt=hu(i,et),Dt=Qs(bt)+.06,Pt=J.kind==="end",Rt=Br+(Pt?.9:.35),Bt=Pt?.4:.22;l.set(Mi[bt]),P.push({x:J.p[0],y:Dt+Rt/2,z:J.p[1],w:Bt,h:Rt,d:Bt,color:l.getHex(),k:Pt?1.8:1.3}),Pt&&P.push({x:J.p[0],y:Dt+Rt+.12,z:J.p[1],w:.5,h:.5,d:.5,rot:Math.PI/4,color:16777215,k:1.2})}if(P.length){const J=new jt(ea(P),f("fencePosts",()=>{const et=Ve(new Te({toneMapped:!1,blending:ke,transparent:!0}));return et.vertexColors=!0,et}));J.renderOrder=ee.GATE_LIGHT,J.frustumCulled=!1,r.add(J)}}const Ot=[],st=[],D=[],A=(P,J,et,bt,Dt,Pt,Rt)=>{Ot.push(P,J,et),st.push(bt.r,bt.g,bt.b,Dt),D.push(Pt,Rt)},C=(P,J,et,bt,Dt,Pt,Rt)=>{A(P-et,Dt,J-bt,Pt,Rt,0,0),A(P+et,Dt,J-bt,Pt,Rt,1,0),A(P+et,Dt,J+bt,Pt,Rt,1,1),A(P-et,Dt,J-bt,Pt,Rt,0,0),A(P+et,Dt,J+bt,Pt,Rt,1,1),A(P-et,Dt,J+bt,Pt,Rt,0,1)},z=1.7;for(const P of v){s()&&(yield);const J=P.y0+.04;l.set(Mi[P.c.clearance]);const et=[P.a[0]+P.na[0]*z,P.a[1]+P.na[1]*z],bt=[P.b[0]+P.nb[0]*z,P.b[1]+P.nb[1]*z];A(P.a[0],J,P.a[1],l,.42,.5,.5),A(P.b[0],J,P.b[1],l,.42,.5,.5),A(bt[0],J,bt[1],l,0,.5,.5),A(P.a[0],J,P.a[1],l,.42,.5,.5),A(bt[0],J,bt[1],l,0,.5,.5),A(et[0],J,et[1],l,0,.5,.5)}const q=(P,J,et,bt)=>C(P.cx,P.cz,et,et,Oe(P)+.045,new Ht(J),bt),G=_v(i.gates,i.sectorOpenings,yt.runs,i.drawsGate);for(const P of G){if(P.soft&&!P.locked)continue;const J=h(P.a);C(g.get(P).mid[0],g.get(P).mid[1],4.2,4.2,Oe(J)+.045,new Ht(P.locked?xe.gateLocked:xe.gateOpen),P.locked?.6:.38)}for(const P of i.cells)s()&&(yield),P.cache&&q(P,P.payload?16751162:8256767,P.payload?5:2.6,P.payload?.5:.28);const Tt=i.beacons??[[i.startCell,xe.ally,0,2.4,.5],[i.pivotCell,10509567,7,2.2,.5],[i.vaultCell,16742938,14,3,.6]];for(const[P,J,,et,bt]of Tt)q(P,J,et*2.6,bt*.5);{const P=new pe;P.setAttribute("position",new ne(Ot,3)),P.setAttribute("color",new ne(st,4)),P.setAttribute("uv",new ne(D,2));const J=new jt(P,f("glow",()=>Ve(new Te({map:iv(),vertexColors:!0,transparent:!0,blending:ke,side:ye,toneMapped:!1}))));d(J.material,pu.glow),J.renderOrder=ee.GLOW,J.frustumCulled=!1,r.add(J)}const ft=P=>{const{mid:J,len:et,ax:bt,az:Dt}=g.get(P),Pt=Oe(h(P.a)),Rt=et/2,Bt=Math.atan2(-Dt,bt);return[{x:J[0]+bt*Rt,y:Pt+ai/2,z:J[1]+Dt*Rt,w:.34,h:ai,d:.34,color:16777215},{x:J[0]-bt*Rt,y:Pt+ai/2,z:J[1]-Dt*Rt,w:.34,h:ai,d:.34,color:16777215},{x:J[0],y:Pt+ai,z:J[1],w:et+.34,h:.26,d:.26,rot:Bt,color:16777215}]},_t=(P,J)=>Ve(new Te({color:new Ht(P).multiplyScalar(J),toneMapped:!1,blending:ke,transparent:!0})),It=[],Mt=[];for(const P of G)(P.locked||!P.soft)&&(P.locked?Mt:It).push(...ft(P));if(It.length){const P=new jt(ea(It),_t(xe.gateOpen,.85));P.material.vertexColors=!0,P.renderOrder=ee.GATE_LIGHT,P.frustumCulled=!1,r.add(P)}if(Mt.length){const P=new jt(ea(Mt),_t(xe.gateLocked,1.7));P.material.vertexColors=!0,P.renderOrder=ee.GATE_LIGHT,P.frustumCulled=!1,r.add(P),a.push(J=>{const et=.7+.5*Math.sin(J*3);P.material.color.set(xe.gateLocked).multiplyScalar(1.7*et)});for(const J of G.filter(et=>et.locked)){const{mid:et,len:bt,ax:Dt,az:Pt}=g.get(J),Rt=Oe(h(J.a)),Bt=bt/2,Gt=[et[0]-Dt*Bt,Rt,et[1]-Pt*Bt,et[0]+Dt*Bt,Rt,et[1]+Pt*Bt,et[0]+Dt*Bt,Rt+ai,et[1]+Pt*Bt,et[0]-Dt*Bt,Rt,et[1]-Pt*Bt,et[0]+Dt*Bt,Rt+ai,et[1]+Pt*Bt,et[0]-Dt*Bt,Rt+ai,et[1]-Pt*Bt],$t=new pe;$t.setAttribute("position",new ne(Gt,3));const Zt=Ve(new Te({color:xe.gateLocked,opacity:.25,transparent:!0,blending:ke,side:ye,toneMapped:!1})),se=new jt($t,Zt);se.renderOrder=ee.CURTAIN,se.frustumCulled=!1,r.add(se),a.push(me=>{Zt.opacity=.18+.12*Math.sin(me*3)})}}const O=(P,J,et,bt)=>{const Dt=new Ht(J).multiplyScalar(.95),Pt=Oe(P),Rt=et>0?new jt(new Cs(.06,.16,et,12,1,!0),Ve(new Te({color:Dt,transparent:!0,opacity:.32,blending:ke,toneMapped:!1,side:ye}))):null;Rt&&(Rt.position.set(P.cx,Pt+et/2,P.cz),Rt.renderOrder=ee.BEAM,r.add(Rt));const Bt=new jt(new Zn(bt*.9,bt,48),Ve(new Te({color:Dt,side:ye,transparent:!0,opacity:.45,blending:ke,toneMapped:!1})));Bt.rotation.x=-Math.PI/2,Bt.position.set(P.cx,Pt+.08,P.cz),Bt.renderOrder=ee.BEAM,r.add(Bt),a.push(Gt=>{Bt.scale.setScalar(1+.06*Math.sin(Gt*2+P.id))})};for(const[P,J,et,bt]of Tt)O(P,J,et,bt);const $=i.cells.filter(P=>P.cache);let j=null;if($.length){j=new Tx(new mi(.75),new Te({toneMapped:!1}),$.length),j.renderOrder=ee.SOLIDS,j.frustumCulled=!1,$.forEach((Bt,Gt)=>j.setColorAt(Gt,new Ht(Bt.payload?16751162:8256767).multiplyScalar(1.25))),r.add(j);const P=new ae,J=new ki,et=new Q(0,1,0),bt=new Q,Dt=new Q,Pt=new Float32Array($.length).fill(1);let Rt=0;a.push(Bt=>{const Gt=Math.min(.1,Math.max(0,Bt-Rt));Rt=Bt,$.forEach(($t,Zt)=>{const se=!x||x($t.cx,$t.cz,"dynamic");Pt[Zt]=se?Math.min(1,Pt[Zt]+Gt*5):Math.max(0,Pt[Zt]-Gt*5);const me=Pt[Zt]*($t.payload?1.8:.7+Math.min($t.cache,300)/600);bt.set($t.cx,Oe($t)+1.2+.25*Math.sin(Bt*1.6+$t.id),$t.cz),J.setFromAxisAngle(et,Bt*.8+$t.id),P.compose(bt,J,Dt.set(me,me,me)),j.setMatrixAt(Zt,P)}),j.instanceMatrix.needsUpdate=!0})}const{hover:N,select:ht}=e?{hover:null,select:null}:Th({group:r,lineMats:o}),vt=rt.geometry.getAttribute("color"),Lt=At==null?void 0:At.geometry.getAttribute("color");function X(P){for(const J of i.cells){const et=P(J),bt=J.solid?B[J.id]:F[J.id],Dt=J.solid?Lt:vt,Pt=J.solid?k:V;for(let Rt=bt.start*3;Rt<(bt.start+bt.count)*3;Rt++)Dt.array[Rt]=Pt[Rt]*et}for(const J of i.cells){const et=Y[J.id];if(!et)continue;const bt=P(J);for(let Dt=et.start*3;Dt<(et.start+et.count)*3;Dt++)vt.array[Dt]=V[Dt]*bt}vt.needsUpdate=!0,Lt&&(Lt.needsUpdate=!0)}return{group:r,hover:N,select:ht,setBrightness:X,lineMats:o,floorMat:M,tiles:rt,walls:At,glass:yt,gates:G,pickables:j,update(P){for(const J of a)J(P);N==null||N.tick(P),ht==null||ht.tick(P)},setFocus(P,J){M==null||M.uniforms.uFocus.value.set(P,J)},setShows(P){x=P},setGlowLevel(P){c.v=P;for(const[J,et]of u)mu(J,et,P)},resize(P,J){for(const et of o)et.resolution.set(P,J)},dispose(){r.traverse(P=>{P.geometry&&P.geometry.dispose()})}}}const ce=(i,t,e,n,s,r={})=>({id:i,group:t,label:e,codes:n,help:s,...r}),Ps=Object.freeze([ce("moveUp","move","Move up",["KeyW","ArrowUp"],"Away from the camera"),ce("moveLeft","move","Move left",["KeyA","ArrowLeft"],"Left of the camera"),ce("moveDown","move","Move down",["KeyS","ArrowDown"],"Toward the camera"),ce("moveRight","move","Move right",["KeyD","ArrowRight"],"Right of the camera"),ce("run","move","Run",["ShiftLeft","ShiftRight"],"Hold to run"),ce("stop","move","Stop",["KeyX"],"Cancel the click-to-move order"),ce("weapon","skill","Weapon",["KeyF"],"Use the equipped weapon at the cursor"),ce("skill1","skill","Skill 1",["KeyQ"],"Skill slot 1, aimed at the cursor"),ce("skill2","skill","Skill 2",["KeyE"],"Skill slot 2, aimed at the cursor"),ce("skill3","skill","Skill 3",["KeyR"],"Skill slot 3, aimed at the cursor"),ce("skill4","skill","Skill 4",["KeyT"],"Skill slot 4, aimed at the cursor"),ce("device1","skill","Device 1",["Digit1"],"Place the device in slot 1 at the cursor"),ce("device2","skill","Device 2",["Digit2"],"Place the device in slot 2 at the cursor"),ce("device3","skill","Device 3",["Digit3"],"Place the device in slot 3 at the cursor"),ce("directive1","skill","Order 1",["Digit4"],"Companion directive 1, aimed at the cursor"),ce("directive2","skill","Order 2",["Digit5"],"Companion directive 2, aimed at the cursor"),ce("mode","skill","Mode",["KeyM"],"Cycle your equipped modes"),ce("ping","scan","Scan ping",["KeyC"],"Send a scan wave from your position"),ce("possess","companion","Possess",["Tab"],"Swap control to the other actor"),ce("companionHold","companion","Follow / hold",["KeyG"],"Companion follows you, or holds where it stands"),ce("camLeft","camera","Rotate left",["BracketLeft"],"Turn the view"),ce("camRight","camera","Rotate right",["BracketRight"],"Turn the view"),ce("camTiltUp","camera","Tilt up",["PageUp","Equal"],"Look more from above"),ce("camTiltDown","camera","Tilt down",["PageDown","Minus"],"Look more along the ground"),ce("camBehind","camera","Behind heading",["KeyV"],"The camera sits behind the way you face"),ce("camReset","camera","Reset view",["Home"],"Back to the home distance and tilt"),ce("overview","camera","Overview",["KeyO"],"Switch between chase and overview"),ce("help","system","Help",["KeyH","Slash"],"Open this guide (the game pauses)"),ce("settings","system","Settings",["Escape"],"Open the settings (the game pauses)",{fixed:!0}),ce("glow","system","Glow level",["KeyB"],"Cycle the glow"),ce("newSeed","system","New seed",["KeyN"],"Reload with a new world")]);Object.freeze(Ps.map(i=>i.id));const Cl=new Map(Ps.map(i=>[i.id,i])),xo=i=>Cl.get(i)??null;function Pl(i){const t={};if(!i||typeof i!="object")return t;for(const[e,n]of Object.entries(i)){const s=Cl.get(e);if(!s||s.fixed||!Array.isArray(n))continue;const r=n.filter(o=>typeof o=="string"&&/^[A-Za-z0-9]{1,24}$/.test(o));r.length&&(t[e]=[...new Set(r)])}return t}function Ch(i=null){const t=i&&typeof i=="object"?i:{};return Object.fromEntries(Ps.map(e=>[e.id,Array.isArray(t[e.id])&&t[e.id].length&&!e.fixed?t[e.id]:e.codes]))}const Ss=(i,t)=>Ch(t)[i]??[];function Ll(i,t=null){const e=Ch(t);for(const n of Ps)if(e[n.id].includes(i))return n.id;return null}const Tv=i=>i.key==="?"?"Slash":i.code,cs=(i,t,e)=>Ss(t,e).some(n=>i.has(n));function Ph(i,t){return{sx:(cs(i,"moveRight",t)?1:0)-(cs(i,"moveLeft",t)?1:0),sy:(cs(i,"moveUp",t)?1:0)-(cs(i,"moveDown",t)?1:0)}}const gu={Escape:"Esc",Slash:"?",BracketLeft:"[",BracketRight:"]",PageUp:"PgUp",PageDown:"PgDn",Equal:"=",Minus:"-",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Space:"Space",Comma:",",Period:"."};function il(i){return gu[i]?gu[i]:/^Key[A-Z]$/.test(i)?i.slice(3):/^Digit\d$/.test(i)?i.slice(5):i}function q_(i,t,e=99){const n=[];for(const s of Ss(i,t)){const r=il(s);n.includes(r)||n.push(r)}return n.slice(0,e).join(" / ")}const Av=["ControlLeft","ControlRight","AltLeft","AltRight","MetaLeft","MetaRight","OSLeft","OSRight"],Rv=["F5","F11","F12"],Cv=Ps.flatMap(i=>i.fixed?i.codes:[]);function Pv(i){if(typeof i!="string"||!/^[A-Za-z0-9]{1,24}$/.test(i)||i==="Unidentified")return"That key has no fixed code";const t=Ps.find(e=>e.fixed&&e.codes.includes(i));return t?`${il(i)} is fixed to ${t.label}`:Av.includes(i)?"Ctrl, Alt and Meta are not bindable":Rv.includes(i)?`${il(i)} belongs to the browser`:null}const Lv=(i,t)=>i.length===t.length&&i.every((e,n)=>e===t[n]),Gr=(i,t)=>Lv(t,xo(i).codes)?null:t,Y_=(i,t=null)=>Array.isArray(t==null?void 0:t[i]);function $_(i=null,t=null){const e=i&&typeof i=="object"?i:{},n=t?[t]:Object.keys(e);return Object.fromEntries(n.filter(s=>Array.isArray(e[s])).map(s=>[s,null]))}function Dv(i,t,e,n){const s=xo(t);if(!s||s.fixed)return{kind:"refused",reason:"That key cannot be changed"};const r=Ss(t,i);if(!Number.isInteger(e)||e<0||e>=r.length)return{kind:"refused",reason:"No such key"};const o=Pv(n);if(o)return{kind:"refused",reason:o};const a=r[e];if(n===a)return{kind:"set",changes:{}};const l=r.map((h,m)=>m===e?n:h),c=Ll(n,i);if(c===null)return{kind:"set",changes:{[t]:Gr(t,l)}};if(c===t){const h=r.indexOf(n);return{kind:"set",changes:{[t]:Gr(t,r.map((m,x)=>x===e?n:x===h?a:m))}}}const u=Ss(c,i),d=u.indexOf(n),f=u.map((h,m)=>m===d?a:h);return{kind:"conflict",owner:c,ownerIndex:d,swap:{[t]:Gr(t,l),[c]:Gr(c,f)}}}function j_(i,t,e=null){const n={state:null,apply:null,handled:!1};if(t.type==="start"){const r=xo(t.id),o=r&&!r.fixed?Ss(t.id,e).length:0;return!Number.isInteger(t.index)||t.index<0||t.index>=o?n:{state:{phase:"listen",id:t.id,index:t.index,note:""},apply:null,handled:!0}}if(t.type==="cancel")return{state:null,apply:null,handled:i!==null};if(t.type==="swap")return(i==null?void 0:i.phase)==="conflict"?{state:null,apply:i.swap,handled:!0}:{state:i,apply:null,handled:!1};if(t.type!=="key"||!i)return n;if(Cv.includes(t.code))return{state:null,apply:null,handled:!0};if(t.repeat||i.phase==="conflict")return{state:i,apply:null,handled:!0};if(t.mods)return{state:{...i,note:"Ctrl, Alt and Meta are not bindable"},apply:null,handled:!0};const s=Dv(e,i.id,i.index,t.code);return s.kind==="refused"?{state:{...i,note:s.reason},apply:null,handled:!0}:s.kind==="set"?{state:null,apply:Object.keys(s.changes).length?s.changes:null,handled:!0}:{state:{phase:"conflict",id:i.id,index:i.index,code:t.code,owner:s.owner,ownerIndex:s.ownerIndex,swap:s.swap,note:""},apply:null,handled:!0}}function Iv(i=()=>null){const t=new Map;return{bind(e,n){if(!Cl.has(e))throw new Error(`unknown action ${e}`);const s=t.get(e)??new Set;return s.add(n),t.set(e,s),()=>s.delete(n)},handle(e){const n=Ll(Tv(e),i()),s=n&&t.get(n);if(!s||!s.size)return!1;for(const r of[...s])r(n,e);return!0},has(e){var n;return(((n=t.get(e))==null?void 0:n.size)??0)>0}}}const Dl="boundless.settings.v1",K_=Object.freeze({controls:"Controls",display:"Display",dev:"Dev"});function zv(){const i=(t,e)=>({key:t,group:"dev",type:"range",def:di[t].value,min:di[t].min,max:di[t].max,step:.5,digits:1,unit:" u",label:e,hint:di[t].doc});return[i("navRadius","Stream: NAV radius"),i("renderRadius","Stream: mesh radius"),i("thickness","Stream: hysteresis band"),{...i("aheadBias","Stream: look-ahead"),off:0}]}function Uv(){const i={poolSize:"Load: workers",batch:"Load: sectors per job",inflight:"Load: jobs in flight",adoptMs:"Load: adopt budget",adoptMax:"Load: sectors adopted a frame"};return Object.keys(nn).map(t=>{const e=nn[t],n=[e.value,e.min,e.max].every(Number.isInteger);return{key:t,group:"dev",type:"range",def:e.value,min:e.min,max:e.max,step:n?1:.5,digits:n?0:1,unit:` ${e.unit}`,label:i[t],hint:e.doc,...t==="poolSize"?{off:0}:{}}})}const Il=Object.freeze([{key:"invertYaw",group:"controls",type:"toggle",def:!0,label:"Invert horizontal rotation",hint:"Middle-drag left / right"},{key:"invertPitch",group:"controls",type:"toggle",def:!0,label:"Invert tilt",hint:"Middle-drag up / down"},{key:"sensitivity",group:"controls",type:"range",def:1,min:.3,max:2.5,step:.05,digits:2,unit:"x",label:"Rotation sensitivity"},{key:"glow",group:"display",type:"range",def:.38,min:0,max:1,step:.02,digits:2,off:0,label:"Glow"},{key:"cutaway",group:"display",type:"toggle",def:!0,label:"Cut-away near actors",hint:"See through walls around you"},{key:"sightRadius",group:"dev",type:"range",def:36,min:8,max:90,step:1,digits:0,unit:" u",label:"Fog lit range",hint:"Flood distance plus line of sight; the default camera shows about 27 units"},{key:"sightSoft",group:"dev",type:"range",def:.25,min:.05,max:.7,step:.01,digits:2,label:"Fog edge softness",hint:"Share of the range that ramps lit to ghost"},{key:"ghostFade",group:"dev",type:"range",def:1.2,min:.2,max:8,step:.1,digits:1,unit:" s",label:"Ghost fade time",hint:"Lit to ghost after sight is lost"},{key:"revealRate",group:"dev",type:"range",def:6,min:1,max:30,step:.5,digits:1,unit:"/s",label:"Reveal speed",hint:"How fast a texel brightens into sight"},{key:"revealStep",group:"dev",type:"range",def:.5,min:.1,max:3,step:.05,digits:2,unit:" u",label:"Reveal step",hint:"Distance moved per sight re-solve (sub-cell exposure)"},{key:"shroud",group:"dev",type:"range",def:1,min:0,max:1,step:.05,digits:2,label:"Shroud darkness",hint:"1 hides unseen ground, 0 shows it"},{key:"atmosphere",group:"dev",type:"range",def:1,min:0,max:2,step:.05,digits:2,off:0,label:"Atmosphere density",hint:"Depth haze and drifting motes"},{key:"bloomRadius",group:"dev",type:"range",def:.32,min:0,max:1,step:.02,digits:2,label:"Glow radius"},{key:"bloomThreshold",group:"dev",type:"range",def:.85,min:0,max:1.5,step:.01,digits:2,label:"Glow threshold"},{key:"pathDensity",group:"dev",type:"range",def:1.5,min:.3,max:3,step:.05,digits:2,unit:"/u",label:"Path chevron density",hint:"Chevrons per world unit along a route (uniform pitch)"},{key:"pathSize",group:"dev",type:"range",def:.8,min:.3,max:1.6,step:.02,digits:2,unit:" u",label:"Path chevron size",hint:"Arm length of one chevron"},{key:"pathGlow",group:"dev",type:"range",def:.95,min:.1,max:2,step:.05,digits:2,label:"Path chevron glow",hint:"Brightness; the default stays under the bloom threshold"},{key:"pathAngle",group:"dev",type:"range",def:124,min:70,max:170,step:1,digits:0,unit:" deg",label:"Path chevron angle",hint:"Total opening of the chevron: larger is flatter and less acute"},{key:"pingCooldown",group:"dev",type:"range",def:0,min:0,max:30,step:.1,digits:1,unit:" s",off:0,label:"Ping cooldown",hint:"Seconds of world time between scan pings; off is unlimited (waves may overlap freely)"},{key:"pingMaxWaves",group:"dev",type:"range",def:16,min:1,max:40,step:1,digits:0,label:"Max concurrent waves",hint:"A ping is refused while this many waves are still on the board; the front budget is shared between them"},{key:"scanBand",group:"dev",type:"range",def:3.2,min:.5,max:12,step:.1,digits:1,unit:" u",label:"Scan front width",hint:"Width of the luminous band behind the edge of a scan wave"},{key:"camDist",group:"dev",type:"range",def:19,min:9,max:70,step:1,digits:0,unit:" u",label:"Camera distance",hint:"Chase view home distance (wheel still zooms)"},{key:"camPitch",group:"dev",type:"range",def:58,min:35,max:88,step:1,digits:0,unit:" deg",label:"Camera pitch",hint:"Chase view home tilt"},{key:"fov",group:"dev",type:"range",def:50,min:5,max:90,step:1,digits:0,unit:" deg",label:"Field of view",hint:"The camera dollies back as it narrows, so the framing holds (5 is a long lens)"},...zv(),...Uv()]),Nv=Il.filter(i=>i.type==="range"),Fv=Il.filter(i=>i.type==="toggle"),hn=Object.freeze(Object.fromEntries(Il.map(i=>[i.key,i.def]))),Hr=Object.freeze(Object.fromEntries(Nv.map(i=>[i.key,[i.min,i.max,i.step]]))),Ov=Fv.map(i=>i.key),kv=(i,t,e)=>Math.min(e,Math.max(t,i));function Z_(i,t){return i.type==="toggle"?t?"on":"off":i.off!==void 0&&t<=i.off+1e-9?"off":`${Number(t).toFixed(i.digits??0)}${i.unit??""}`}function sr(i){const t={...hn};if(!i||typeof i!="object")return t;for(const e of Ov)typeof i[e]=="boolean"&&(t[e]=i[e]);for(const e of Object.keys(Hr)){const n=Number(i[e]);i[e]!==null&&i[e]!==""&&Number.isFinite(n)&&(t[e]=kv(Hr[e][2]===1?Math.round(n):n,Hr[e][0],Hr[e][1]))}return t}function Bv(i=globalThis.localStorage){try{const t=i==null?void 0:i.getItem(Dl);return sr(t?JSON.parse(t):null)}catch{return{...hn}}}function Gv(i=globalThis.localStorage){var t;try{const e=i==null?void 0:i.getItem(Dl);return Pl(e?(t=JSON.parse(e))==null?void 0:t.keys:null)}catch{return{}}}function Hv(i,t=globalThis.localStorage,e=null){try{const n=Pl(e);return t==null||t.setItem(Dl,JSON.stringify(Object.keys(n).length?{...sr(i),keys:n}:sr(i))),!0}catch{return!1}}function sl(i,t,e){const n=i.sensitivity;return{dyaw:t*.006*n*(i.invertYaw?-1:1),dpitch:e*.004*n*(i.invertPitch?-1:1)}}function Vv(i=globalThis.localStorage){let t=Bv(i),e=Gv(i);const n=new Set,s=()=>{for(const o of n)o(t)},r=()=>Hv(t,i,e);return{get:()=>t,keys:()=>e,set(o){return t=sr({...t,...o}),r(),s(),t},setKeys(o){const a={...e};for(const[l,c]of Object.entries(o??{}))c===null?delete a[l]:a[l]=c;return e=Pl(a),r(),s(),e},reset(o){const a=o===void 0?null:[].concat(o);return t=a?sr({...t,...Object.fromEntries(a.filter(l=>l in hn).map(l=>[l,hn[l]]))}):{...hn},a||(e={}),r(),s(),t},subscribe(o){return n.add(o),o(t),()=>n.delete(o)}}}const zl=Object.freeze({slop:12,longS:.45,doubleS:.32,doubleDist:36,pinch:.06,twist:.12,pan:14,pressSlop:24}),sa=Math.PI*2,Lh=i=>((i+Math.PI)%sa+sa)%sa-Math.PI,rl=(i,t,e,n)=>Math.hypot(e-i,n-t);function xu(i,t){return{d:Math.hypot(t.x-i.x,t.y-i.y),ang:Math.atan2(t.y-i.y,t.x-i.x),mx:(i.x+t.x)/2,my:(i.y+t.y)/2}}function Wv(i,t,e=zl){const n={zoom:i.d>0&&t.d>0?Math.abs(Math.log(t.d/i.d))/e.pinch:0,twist:Math.abs(Lh(t.ang-i.ang))/e.twist,horizontal:Math.abs(t.mx-i.mx)/e.pan,vertical:Math.abs(t.my-i.my)/e.pan};let s=null,r=0;for(const o of Object.keys(n))n[o]>r&&(r=n[o],s=o);return r>=1?s:null}const Xv=Object.freeze({zoom:"zoom",twist:"rotate",horizontal:"rotate",vertical:"tilt"});function qv(i,t,e,n){const s={zoom:1,yaw:0,pitch:0};if(e==="zoom")i.d>0&&t.d>0&&(s.zoom=i.d/t.d);else if(e==="rotate"){const r=n.invertYaw?-1:1;s.yaw=Lh(t.ang-i.ang)*(n.sensitivity??1)*r+sl(n,t.mx-i.mx,0).dyaw}else e==="tilt"&&(s.pitch=sl(n,0,t.my-i.my).dpitch);return s}function Yv(i=zl){const t=new Map;let e=null;const n=()=>{for(const s of t.values())if(s.peek)return!0;return!1};return{down(s,r,o,a){if(t.set(s,{x0:r,y0:o,x:r,y:o,t0:a,moved:!1,multi:!1,peek:!1}),t.size>1)for(const l of t.values())l.multi=!0;return[]},move(s,r,o){const a=t.get(s);return a?(a.x=r,a.y=o,!a.moved&&rl(a.x0,a.y0,r,o)>i.slop&&(a.moved=!0),a.moved&&a.peek?(a.peek=!1,[{type:"peek-end",x:r,y:o,swallow:!1}]):[]):[]},tick(s){const r=[];for(const o of t.values())!o.moved&&!o.multi&&!o.peek&&s-o.t0>=i.longS&&(o.peek=!0,r.push({type:"peek",x:o.x,y:o.y}));return r},up(s,r,o,a){const l=t.get(s);if(!l)return[];t.delete(s),r!==void 0&&(l.x=r,l.y=o);const c=a-l.t0>=i.longS;if(l.peek&&c)return[{type:"peek-end",x:l.x,y:l.y,swallow:!0}];const u=l.peek?[{type:"peek-end",x:l.x,y:l.y,swallow:!1}]:[];return l.moved||l.multi?u:c?[{type:"peek",x:l.x,y:l.y},{type:"peek-end",x:l.x,y:l.y,swallow:!0}]:e&&a-e.t<=i.doubleS&&rl(e.x,e.y,l.x,l.y)<=i.doubleDist?(e=null,[...u,{type:"double",x:l.x,y:l.y,swallow:!0}]):(e={x:l.x,y:l.y,t:a},[...u,{type:"tap",x:l.x,y:l.y}])},cancel(s){const r=t.get(s);return r?(t.delete(s),r.peek?[{type:"peek-end",x:r.x,y:r.y,swallow:!1}]:[]):[]},get active(){return t.size},get peeking(){return n()}}}function J_(i=zl){let t=null;return{down(e,n,s,r){return t={id:e,x0:n,y0:s,t0:r,held:!1,cancelled:!1},!0},move(e,n,s){return!t||t.id!==e||t.cancelled?[]:rl(t.x0,t.y0,n,s)<=i.pressSlop?[]:(t.cancelled=!0,t.held?[{type:"end"}]:[])},tick(e){return!t||t.held||t.cancelled||e-t.t0<i.longS?[]:(t.held=!0,[{type:"hold"}])},up(e,n){if(!t||t.id!==e)return[];const s=t;return t=null,s.cancelled?s.held?[{type:"end"}]:[]:(n===void 0?s.held:n-s.t0>=i.longS)?s.held?[{type:"end"}]:[]:s.held?[{type:"end"},{type:"fire"}]:[{type:"fire"}]},cancel(e){if(!t||t.id!==e)return[];const n=t;return t=null,n.held?[{type:"end"}]:[]},get pressing(){return t?t.id:null}}}const Le=Math.PI/180,Se={overview:{pitch:72,dist:150,fov:42,minD:28,maxD:600,near:1,far:1400},chase:{pitch:58,dist:19,fov:50,minD:9,maxD:70,near:.5,far:600,lookHeight:1},pitchMin:35,pitchMax:88,yawRate:1.9,pitchRate:38,ease:9,followEase:7,fovMin:5,maxPhys:1500};class $v{constructor(t,e,n,{embedded:s=!1,mode:r="overview"}={}){this.camera=t,this.dom=e,this.bounds=n,this.embedded=s,this.mode=r,this.target=new Q,this.goal=new Q,this.yaw=this.yawGoal=0,this.pitch=this.pitchGoal=72*Le,this.dist=this.distGoal=150,this.followHeading=!1,this.heading=0,this.keys=new Set,this.getKeys=()=>null,this.settings={...hn},this.plane=new hi(new Q(0,1,0),0),this.ray=new tu,this.drag=null,this.lastMid=0,this.onChange=null,this.analog={x:0,y:0,mag:0,run:!1},this.claimed=new Set,this.touches=new Map,this.pinch=null,this._off=[],this._bind(),this.setMode(r,{keepTarget:!1})}get P(){if(this.mode!=="chase")return Se[this.mode];const t=this.settings,e=this._chase;return(!e||e.dist!==t.camDist||e.pitch!==t.camPitch)&&(this._chase={...Se.chase,dist:t.camDist,pitch:t.camPitch}),this._chase}get fovDeg(){return this.mode==="chase"?this.settings.fov:Se[this.mode].fov}get dolly(){const t=this.mode==="chase"?hn.fov:Se[this.mode].fov,e=Wn.clamp(this.fovDeg,Se.fovMin,179);return Math.tan(t*Le/2)/Math.tan(e*Le/2)}get physDist(){return Math.min(this.dist*this.dolly,Se.maxPhys)}get yawDeg(){return this.yaw/Le}get pitchDeg(){return this.pitch/Le}setMode(t,{keepTarget:e=!0}={}){this.mode=t;const n=Se[t];this.pitch=this.pitchGoal=n.pitch*Le,this.dist=this.distGoal=n.dist,this.camera.fov=t==="chase"?this.settings.fov:n.fov,this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),e||this.target.copy(this.goal),this.apply(),this._changed()}_changed(){var t;(t=this.onChange)==null||t.call(this,this)}bindKeys(t){this.getKeys=t}applySettings(t){const e=this.settings;this.settings={...this.settings,...t},this.mode==="chase"&&(this.settings.camDist!==e.camDist&&(this.distGoal=Wn.clamp(this.settings.camDist,this.P.minD,this.P.maxD)),this.settings.camPitch!==e.camPitch&&(this.pitchGoal=this.settings.camPitch*Le)),this.apply()}rotate(t){this.yawGoal+=t,this._changed()}setYawDeg(t){this.yawGoal=t*Le,this._changed()}setPitchDeg(t){this.pitchGoal=Wn.clamp(t,Se.pitchMin,Se.pitchMax)*Le,this._changed()}tilt(t){this.setPitchDeg(this.pitchGoal/Le+t)}zoomBy(t){this.distGoal=Wn.clamp(this.distGoal*t,this.P.minD,this.P.maxD),this._changed()}northUp(){this.yawGoal=Math.round(this.yawGoal/(2*Math.PI))*2*Math.PI,this._changed()}reset(){this.northUp(),this.pitchGoal=this.P.pitch*Le,this.distGoal=this.P.dist,this.followHeading=!1,this._changed()}forward(t=new Yt){return t.set(-Math.sin(this.yaw),-Math.cos(this.yaw))}right(t=new Yt){return t.set(Math.cos(this.yaw),-Math.sin(this.yaw))}toWorldAxis(t,e,n={x:0,z:0}){const s=Math.sin(this.yaw),r=Math.cos(this.yaw);return n.x=t*r-e*s,n.z=-t*s-e*r,n}groundAt(t,e,n=new Q){this.ray=this.ray??new tu;const s=this.dom.getBoundingClientRect(),r=new Yt((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1);return this.ray.setFromCamera(r,this.camera),this.ray.ray.intersectPlane(this.plane,n)?n:null}rayAt(t,e){const n=this.dom.getBoundingClientRect(),s=new Yt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);return this.ray.setFromCamera(s,this.camera),this.ray.ray}_on(t,e,n,s){t.addEventListener(e,n,s),this._off.push(()=>t.removeEventListener(e,n,s))}_bind(){const t=this.dom,e=this.embedded?t:window,n=s=>this.embedded?!0:s.target===document.body;this._on(e,"keydown",s=>{var o;if(!n(s)||s.ctrlKey||s.metaKey||s.altKey)return;this.keys.add(s.code);const r=Ll(s.code,this.getKeys());r==="camReset"&&this.reset(),r==="camBehind"&&this.mode==="chase"&&(this.followHeading=!this.followHeading,this._changed()),this.embedded&&["move","camera"].includes((o=xo(r))==null?void 0:o.group)&&s.preventDefault()}),this._on(e,"keyup",s=>this.keys.delete(s.code)),this._on(window,"blur",()=>this.keys.clear()),this._on(t,"blur",()=>this.keys.clear()),this._on(t,"wheel",s=>{if(this.embedded&&!s.ctrlKey&&document.activeElement!==t)return;if(s.preventDefault(),s.shiftKey){this.tilt(-Math.sign(s.deltaY)*3);return}const r=Math.exp(s.deltaY*.0012);if(this.mode==="overview"){const o=this.groundAt(s.clientX,s.clientY);this.dist=this.distGoal=Wn.clamp(this.distGoal*r,this.P.minD,this.P.maxD),this.apply();const a=this.groundAt(s.clientX,s.clientY);o&&a&&(this.goal.add(o.sub(a)),this._clamp(this.goal),this.target.copy(this.goal),this.apply()),this._changed()}else this.zoomBy(r)},{passive:!1}),this._on(t,"pointerdown",s=>{if(s.button!==1)return;s.preventDefault(),t.setPointerCapture(s.pointerId);const r=performance.now();if(r-this.lastMid<350){this.reset(),this.lastMid=0;return}this.lastMid=r,this.drag={x:s.clientX,y:s.clientY,pan:s.shiftKey&&this.mode==="overview",last:this.groundAt(s.clientX,s.clientY)}}),this._on(t,"pointermove",s=>{const r=this.drag;if(!r)return;if(r.pan){const u=this.groundAt(s.clientX,s.clientY);if(!u||!r.last)return;this.goal.add(r.last.clone().sub(u)),this._clamp(this.goal),this.target.copy(this.goal),this.apply(),r.last=this.groundAt(s.clientX,s.clientY);return}const o=s.clientX-r.x,a=s.clientY-r.y;r.x=s.clientX,r.y=s.clientY;const{dyaw:l,dpitch:c}=sl(this.settings,o,a);this.yawGoal+=l,this.pitchGoal=Wn.clamp(this.pitchGoal+c,Se.pitchMin*Le,Se.pitchMax*Le),this._changed()}),this._on(t,"pointerup",()=>{this.drag=null}),this._on(t,"auxclick",s=>s.preventDefault()),this._on(t,"pointerdown",s=>this._touchDown(s)),this._on(t,"pointermove",s=>this._touchMove(s)),this._on(t,"pointerup",s=>this._touchUp(s)),this._on(t,"pointercancel",s=>this._touchUp(s))}claim(t){this.claimed.add(t),this.touches.delete(t),this.pinch&&(t===this.pinch.a||t===this.pinch.b)&&(this.pinch=null)}release(t){this.claimed.delete(t)}setAnalog(t=0,e=0,n=!1){const s=Math.hypot(t,e),r=s>1?1/s:1;this.analog={x:t*r,y:e*r,mag:Math.min(1,s),run:!!n&&s>0}}_touchDown(t){if(!(t.pointerType!=="touch"||this.claimed.has(t.pointerId))&&(this.touches.set(t.pointerId,{x:t.clientX,y:t.clientY}),!this.pinch&&this.touches.size>=2)){const[e,n]=[...this.touches.keys()],s=xu(this.touches.get(e),this.touches.get(n));this.pinch={a:e,b:n,start:s,prev:s,mode:null}}}_touchMove(t){if(t.pointerType!=="touch")return;const e=this.touches.get(t.pointerId);if(!e)return;e.x=t.clientX,e.y=t.clientY;const n=this.pinch;if(!n||t.pointerId!==n.a&&t.pointerId!==n.b)return;const s=xu(this.touches.get(n.a),this.touches.get(n.b));if(!n.mode){const o=Wv(n.start,s);if(!o)return;n.mode=Xv[o]}const r=qv(n.prev,s,n.mode,this.settings);n.prev=s,r.zoom!==1&&this.zoomBy(r.zoom),r.yaw&&this.rotate(r.yaw),r.pitch&&this.tilt(r.pitch/Le)}_touchUp(t){t.pointerType==="touch"&&(this.touches.delete(t.pointerId),this.pinch&&(t.pointerId===this.pinch.a||t.pointerId===this.pinch.b)&&(this.pinch=null))}dispose(){for(const t of this._off)t();this._off=[],this.keys.clear()}_clamp(t){const e=this.bounds,n=14;t.x=Wn.clamp(t.x,e.x0-n,e.x1+n),t.z=Wn.clamp(t.z,e.z0-n,e.z1+n)}focus(t,e,n){this.goal.set(t,0,e),this._clamp(this.goal),this.target.copy(this.goal),n&&(this.dist=this.distGoal=n),this.apply()}follow(t,e,n){this.goal.set(t,0,e),this.heading=n}update(t){const e=this.keys,n=this.getKeys(),s=a=>cs(e,a,n);let r=!1;if(s("camLeft")&&(this.yawGoal-=Se.yawRate*t,r=!0),s("camRight")&&(this.yawGoal+=Se.yawRate*t,r=!0),s("camTiltUp")&&(this.pitchGoal=Math.min(Se.pitchMax*Le,this.pitchGoal+Se.pitchRate*Le*t),r=!0),s("camTiltDown")&&(this.pitchGoal=Math.max(Se.pitchMin*Le,this.pitchGoal-Se.pitchRate*Le*t),r=!0),r&&this._changed(),this.mode==="overview"){const{sx:a,sy:l}=Ph(e,n),c=this.analog,u=a+c.x,d=l+c.y;if(u||d){const f=Math.hypot(u,d),h=this.dist*.9*(s("run")||c.run?2:1)*Math.min(1,f),m=this.toWorldAxis(u/f,d/f);this.goal.x+=m.x*h*t,this.goal.z+=m.z*h*t,this._clamp(this.goal)}this.target.copy(this.goal)}else{if(this.followHeading){let a=this.heading+Math.PI;a+=Math.round((this.yawGoal-a)/(2*Math.PI))*2*Math.PI,this.yawGoal+=(a-this.yawGoal)*(1-Math.exp(-t*2.2))}this.target.lerp(this.goal,1-Math.exp(-t*Se.followEase))}const o=1-Math.exp(-t*Se.ease);this.yaw+=(this.yawGoal-this.yaw)*o,this.pitch+=(this.pitchGoal-this.pitch)*o,this.dist+=(this.distGoal-this.dist)*o,this.apply()}apply(){const t=this.physDist,e=Se[this.mode],n=Math.max(1,t/Math.max(this.dist,1e-6)),s=this.fovDeg,r=e.near*n,o=e.far+t;(this.camera.fov!==s||this.camera.near!==r||this.camera.far!==o)&&(this.camera.fov=s,this.camera.near=r,this.camera.far=o,this.camera.updateProjectionMatrix());const a=Math.cos(this.pitch),l=Math.sin(this.pitch),c=this.mode==="chase"?Se.chase.lookHeight:0;this.camera.position.set(this.target.x+Math.sin(this.yaw)*a*t,c+l*t,this.target.z+Math.cos(this.yaw)*a*t),this.camera.lookAt(this.target.x,c,this.target.z),this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert()}}function jv(i){i.fog=new Sl(xe.background,1e5,100001);const t=new Dx(13626111,1714746,Math.PI*1),e=new Zc(10476799,1.5);e.position.set(-.5,.8,.35);const n=new Zc(16751200,.5);n.position.set(.6,.35,-.7),i.add(t,e,n);const s=520,r=new Float32Array(s*4);for(let u=0;u<s;u++)r[u*4]=Math.random(),r[u*4+1]=Math.random(),r[u*4+2]=Math.random(),r[u*4+3]=Math.random();const o=new pe;o.setAttribute("position",new Me(new Float32Array(s*3),3)),o.setAttribute("aSeed",new Me(r,4));const a=Ve(new Ae({transparent:!0,blending:ke,depthTest:!0,depthWrite:!1,uniforms:{uTime:{value:0},uCenter:{value:new Q},uBox:{value:new Q(70,14,70)},uScale:{value:400},uFade:{value:1}},vertexShader:`
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
      }`})),l=new Rx(o,a);l.frustumCulled=!1,l.renderOrder=ee.MOTES,i.add(l);let c=1;return{motes:l,setDensity(u){c=u,a.uniforms.uFade.value=Math.min(1,u)},get density(){return c},update(u,d,f,h){const m=d.mode==="chase";if(l.visible=m&&c>.001,m){const x=d.physDist;i.fog.near=x*.95,i.fog.far=c>.001?x+34/c:1e5,c<=.001&&(i.fog.near=99999),a.uniforms.uTime.value=f,a.uniforms.uCenter.value.set(d.target.x,0,d.target.z),a.uniforms.uScale.value=h/(2*Math.tan(u.fov*Math.PI/360))}else i.fog.near=1e5,i.fog.far=100001}}}const Vr=700,vu=.7,Kv=2.4,Zv=1.1,Jv=1.4,Qv=`
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
`,t_=`
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
`;function e_(){const i=new vh,t=[],e=[];for(const n of[-1,1]){const s=t.length/3;t.push(n,0,0,n,0,1,n,1,0,n,1,1),e.push(s,s+1,s+2,s+2,s+1,s+3)}return i.setAttribute("position",new Me(new Float32Array(t.length),3)),i.setAttribute("aGlyph",new Me(new Float32Array(t),3)),i.setIndex(e),i}const Wr=Object.freeze({density:1.5,size:.8,glow:.95,angle:124});function Dh({parent:i,color:t=xe.ally,behind:e=0}={}){const n={density:Wr.density,size:Wr.size,glow:Wr.glow,angle:Wr.angle},s=e_();s.instanceCount=0;const r=Ve(new Ae({uniforms:{uPhase:{value:0},uPitch:{value:1},uSize:{value:.7},uAngle:{value:2.1},uThick:{value:.14},uY:{value:.12},uHead:{value:0},uTotal:{value:0},uBehind:{value:e},uFadeIn:{value:Zv},uFadeEnd:{value:Jv},uColor:{value:new Ht(t)},uGlow:{value:n.glow}},vertexShader:Qv,fragmentShader:t_,blending:ke,side:ye,toneMapped:!1})),o=new jt(s,r);o.frustumCulled=!1,o.renderOrder=ee.MARKERS,o.visible=!1,i==null||i.add(o);const a=new Js(new Float32Array(Vr*4),4),l=new Js(new Float32Array(Vr*4),4),c=new Js(new Float32Array(Vr),1);for(const T of[a,l,c])T.setUsage(Ka);s.setAttribute("iP",a),s.setAttribute("iT",l),s.setAttribute("iA",c);let u=null,d=null,f=0,h=.12,m=!1;const x={builds:0,glyphs:0,lastMs:0},g=T=>{T=Math.max(0,Math.min(f,T));let _=0,S=d.length-1;for(;S-_>1;){const y=_+S>>1;d[y]<=T?_=y:S=y}const E=d[S]-d[_],w=E>1e-9?(T-d[_])/E:0;return{x:u[_].x+(u[S].x-u[_].x)*w,z:u[_].z+(u[S].z-u[_].z)*w}},p=T=>{const _=g(T-vu),S=g(T+vu),E=S.x-_.x,w=S.z-_.z,y=Math.hypot(E,w);return y>1e-6?[E/y,w/y]:[1,0]};function b(){if(m=!1,!u||u.length<2){s.instanceCount=0,o.visible=!1;return}const T=performance.now();d=[0];for(let E=1;E<u.length;E++)d.push(d[E-1]+Math.hypot(u[E].x-u[E-1].x,u[E].z-u[E-1].z));f=d[d.length-1];const _=1/n.density,S=Math.min(Vr,Math.floor(f/_));for(let E=0;E<S;E++){const w=S-1-E,y=f-(w+.5)*_,R=y+_,F=g(y),B=g(R),Y=p(y),Z=p(R);a.setXYZW(E,F.x,F.z,B.x,B.z),l.setXYZW(E,Y[0],Y[1],Z[0],Z[1]),c.setX(E,y)}a.needsUpdate=l.needsUpdate=c.needsUpdate=!0,r.uniforms.uPitch.value=_,r.uniforms.uTotal.value=f,r.uniforms.uY.value=h,s.instanceCount=S,o.visible=S>0,x.builds++,x.glyphs=S,x.lastMs=performance.now()-T}const M=(T,_)=>T&&_&&T.length===_.length&&T.every((S,E)=>Math.abs(S.x-_[E].x)<1e-6&&Math.abs(S.z-_[E].z)<1e-6),v={mesh:o,stats:x,look:n,follow(T,_=.12){if(!T||T.length<2){v.clear();return}const S=T.slice(1),E=u&&u.length>1?u[1]:null;let w=!u||!M(S,u.slice(1))||_!==h||m;if(!w&&E){const y=u[0],R=u[1],F=R.x-y.x,B=R.z-y.z,Y=Math.hypot(F,B)||1;Math.abs((T[0].x-y.x)*B-(T[0].z-y.z)*F)/Y>1.2&&(w=!0)}if(w&&(u=T.map(y=>({x:y.x,z:y.z})),h=_,b()),u){const y=u[0],R=u[1],F=R.x-y.x,B=R.z-y.z,Y=Math.hypot(F,B)||1,Z=Math.max(0,Math.min(Y,((T[0].x-y.x)*F+(T[0].z-y.z)*B)/Y));r.uniforms.uHead.value=Z}},set(T,_=.09){M(T,u)&&_===h&&!m||(u=T&&T.length>1?T.map(S=>({x:S.x,z:S.z})):null,h=_,b())},setHead(T){r.uniforms.uHead.value=T},arcOf(T){return(d==null?void 0:d[T])??0},get total(){return f},setColor(T){Array.isArray(T)?r.uniforms.uColor.value.setRGB(T[0],T[1],T[2]):r.uniforms.uColor.value.set(T)},clear(){u=null,s.instanceCount=0,o.visible=!1},configure(T={}){const _=Number.isFinite(T.pathDensity)?T.pathDensity:n.density;Math.abs(_-n.density)>1e-9&&(n.density=_,m=!0,u&&b()),Number.isFinite(T.pathSize)&&(n.size=T.pathSize),Number.isFinite(T.pathGlow)&&(n.glow=T.pathGlow),Number.isFinite(T.pathAngle)&&(n.angle=T.pathAngle),r.uniforms.uSize.value=n.size,r.uniforms.uThick.value=Math.max(.08,n.size*.26),r.uniforms.uGlow.value=n.glow,r.uniforms.uAngle.value=n.angle*Math.PI/180},update(T){r.uniforms.uPhase.value=T*Kv/(1/n.density)%1},dispose(){i==null||i.remove(o),s.dispose(),r.dispose()}};return v.configure({}),v}function n_({scene:i,addLineMaterial:t}){const e=new Xe;i.add(e);const n=(m,x=.9)=>Eh(Ve(new Te({color:new Ht(m).multiplyScalar(1.5),transparent:!0,opacity:x,side:ye,blending:ke,toneMapped:!1}))),s=n(xe.hover,.85),r=new Xe,o=new jt(new Zn(.55,.68,40),s);o.rotation.x=-Math.PI/2,o.renderOrder=ee.CURSOR,r.add(o);for(let m=0;m<4;m++){const x=new jt(new As(.1,.38),s);x.rotation.x=-Math.PI/2;const g=m*Math.PI/2;x.position.set(Math.cos(g)*.95,0,Math.sin(g)*.95),x.rotation.z=g+Math.PI/2,x.renderOrder=ee.CURSOR,r.add(x)}r.visible=!1,e.add(r);const a=n(xe.select,.95),l=new Xe,c=new jt(new Zn(.7,.85,40),a);c.rotation.x=-Math.PI/2,c.renderOrder=ee.MARKERS;const u=new jt(new Zn(.7,.8,40),a.clone());u.rotation.x=-Math.PI/2,u.renderOrder=ee.MARKERS;const d=new jt(new Cs(.035,.035,2.2,6,1,!0),Ve(new Te({color:new Ht(xe.select).multiplyScalar(1.4),transparent:!0,opacity:.7,blending:ke,toneMapped:!1})));d.position.y=1.1,d.renderOrder=ee.MARKERS;const f=new jt(new mi(.22),new Te({color:new Ht(xe.select).multiplyScalar(1.6),toneMapped:!1}));f.position.y=2.3,f.renderOrder=ee.MARKERS,l.add(c,u,d,f),l.visible=!1,e.add(l);const h=Dh({parent:e,color:xe.ally});return{group:e,showCursor(m,x,g,p){r.visible=!0,r.position.set(m,x+.1,g),s.color.set(p?xe.blocked:xe.hover).multiplyScalar(1.5)},hideCursor(){r.visible=!1},setTarget(m,x,g,p){l.visible=!0,l.position.set(m,x+.1,g),p&&a.color.set(p).multiplyScalar(1.5)},clearTarget(){l.visible=!1},get targetPos(){return l.visible?l.position:null},setPath(m,x=.12,g=xe.ally){if(!m||m.length<2){h.clear();return}h.setColor(g),h.follow(m,x)},chevrons:h,update(m){r.rotation.y=m*.8;const x=m*1.6%1;c.scale.setScalar(1+.9*(1-x)),c.material.opacity=.95*x,u.scale.setScalar(1+.2*Math.sin(m*4)),f.rotation.y=m*2,f.position.y=2.3+.12*Math.sin(m*3),h.update(m)}}}function Ih(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new pe;let c=0;for(let u=0;u<i.length;++u){const d=i[u];let f=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(d.attributes[h]),f++}if(f!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[h]===void 0&&(o[h]=[]),o[h].push(d.morphAttributes[h])}if(t){let h;if(e)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,h,u),c+=h}}if(e){let u=0;const d=[];for(let f=0;f<i.length;++f){const h=i[f].index;for(let m=0;m<h.count;++m)d.push(h.getX(m)+u);u+=i[f].attributes.position.count}l.setIndex(d)}for(const u in r){const d=_u(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(const u in o){const d=o[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let f=0;f<d;++f){const h=[];for(let x=0;x<o[u].length;++x)h.push(o[u][x][f]);const m=_u(h);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(m)}}return l}function _u(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const u=i[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Me(o,e,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const d=l/e;for(let f=0,h=u.count;f<h;f++)for(let m=0;m<e;m++){const x=u.getComponent(f,m);a.setComponent(f+d,m,x)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Hs=new Ht(xe.ally),Vs=new Ht(xe.companion);let Xr=null;function i_(){if(Xr)return Xr;const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.55,"rgba(0,0,0,0.35)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Xr=new gh(i),Xr}const Ri=30;function s_(i,t){const e=new Float32Array(Ri*2*3),n=new Float32Array(Ri*2*4),s=[];for(let c=0;c<Ri-1;c++){const u=c*2;s.push(u,u+1,u+2,u+1,u+3,u+2)}const r=new pe;r.setAttribute("position",new Me(e,3)),r.setAttribute("color",new Me(n,4)),r.setIndex(s);const o=new jt(r,Ve(new Te({vertexColors:!0,transparent:!0,blending:ke,side:ye,toneMapped:!1})));o.frustumCulled=!1,o.renderOrder=ee.TRAIL;const a=[];let l=0;return{mesh:o,reset(c,u,d){a.length=0;for(let f=0;f<Ri;f++)a.push([c,u,d])},update(c,u,d,f,h){for(l+=c,a.length||this.reset(u,d,f);l>=.028;)l-=.028,a.unshift([u,d,f]),a.length=Ri;a[0]=[u,d,f];for(let m=0;m<Ri;m++){const x=a[m],g=1-m/(Ri-1),p=t*g;e.set([x[0],x[1],x[2],x[0],x[1]+p,x[2]],m*6);const b=Math.pow(g,1.4)*h;n.set([i.r*1.6,i.g*1.6,i.b*1.6,b,i.r*1.6,i.g*1.6,i.b*1.6,0],m*8)}r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}}}function yu(i,t,e=!1){const n=new Xe,s=c=>Ve(new Te({color:i.clone().multiplyScalar(1.5),transparent:!0,opacity:c,side:ye,blending:ke,toneMapped:!1})),r=new jt(new Zn(t*.88,t,48),s(.85)),o=new jt(new Zn(.01,t*.88,48),s(.07)),a=Ih([0,1,2,3].map(c=>new Zn(t*1.28,t*1.4,10,1,c*Math.PI/2+.2,Math.PI/2-.5))),l=new jt(a,s(.95));for(const c of[r,o,l])c.rotation.x=-Math.PI/2,c.renderOrder=ee.GLOW+1,n.add(c);return{group:n,ctrl:l,base:r,inner:o}}function r_({scene:i,map:t,addLineMaterial:e}){const n=new Xe;i.add(n);const s={},r=(g,p,b)=>{const M=Mh(new mo({color:p.clone().multiplyScalar(1.7),linewidth:b,worldUnits:!1,fog:!0}));e(M);const v=new Rl(new po().fromEdgesGeometry(new Cx(g,25)),M);return v.renderOrder=ee.CREST,v},o=g=>new Qa({color:g,flatShading:!0}),a=(g,p)=>new Te({color:g.clone().multiplyScalar(p),toneMapped:!1});function l(){const g=new Xe,p=[new Cs(.2,.31,1.05,6).translate(0,.62,0),new Dn(.82,.2,.36).translate(0,1.28,0),new Dn(.22,.5,.2).translate(.2,0+.25,0),new Dn(.22,.5,.2).translate(-.2,.25,0)].map(w=>w.index?w.toNonIndexed():w),b=Ih(p.map(w=>(w.deleteAttribute("uv"),w))),M=new jt(b,o(398880));M.renderOrder=ee.SOLIDS;const v=r(b,Hs,1.8),T=new jt(new mi(.22).scale(1,1.25,1),a(Hs,2));T.position.y=1.7,T.renderOrder=ee.SOLIDS;const _=new jt(new wl(.11,.38,4),a(Hs,2.4));_.rotation.x=Math.PI/2,_.position.set(0,1.7,.3),_.renderOrder=ee.SOLIDS;const S=new jt(new Dn(.16,.2,.05),a(Hs,2.2));S.position.set(0,1,.31),S.renderOrder=ee.SOLIDS;const E=new Xe;return E.add(M,v,T,_,S),g.add(E),{group:g,lean:E}}function c(){const g=new Xe,p=new Tl(.46,.065,5,6),b=new jt(p,a(Vs,1.7));b.rotation.x=Math.PI/2,b.renderOrder=ee.SOLIDS;const M=new jt(new mi(.26),o(727558));M.renderOrder=ee.SOLIDS;const v=r(M.geometry,Vs,1.6),T=new jt(new mi(.13),a(Vs,2.6));T.renderOrder=ee.SOLIDS;const _=[0,1].map(S=>{const E=new jt(new El(.09),a(Vs,2.2));return E.renderOrder=ee.SOLIDS,g.add(E),E});return g.add(b,M,v,T),{group:g,ring:b,shell:M,sats:_}}function u(g,p,b,M,v,T,_){const S=p(),E=new Xe;E.add(S.group);const w=new jt(new bl(M*1.9,24),new Te({map:i_(),transparent:!0,depthWrite:!1,toneMapped:!1}));w.rotation.x=-Math.PI/2,w.renderOrder=ee.GLOW-1;const y=yu(b,M),R=s_(b,v),F=new zx(b.clone().lerp(new Ht(16777215),.25),T,_,2);n.add(E,w,y.group,R.mesh,F),s[g]={id:g,model:S,group:E,shadow:w,rings:y,trail:R,light:F,y:.05,init:!1}}u("avatar",l,Hs,.55,.95,9,16),u("companion",c,Vs,.4,.5,4.5,11);const d=new Map,f=new mi(.34).scale(1,1.5,1);function h(g){let p=d.get(g);if(p)return p;const b=new Ht(xe.hostile),M=new Xe,v=new jt(f,a(b,1.9));v.position.y=.9,v.renderOrder=ee.SOLIDS;const T=yu(b,.4);return M.add(v,T.group),M.visible=!1,n.add(M),d.set(g,p={id:g,group:M,vis:0,y:.05,init:!1}),p}const m=["avatar","companion"],x=[];return{group:n,contacts:d,sync(g,p,b,M=null){x.length=0;const v=new Set;for(const T of g.others??[]){const _=h(T.id);v.add(T.id);const S=T.render??T,E=!M||M(S.x,S.z,"dynamic");_.vis=E?Math.min(1,_.vis+b*6):Math.max(0,_.vis-b*6),_.group.visible=_.vis>.02;const w=T.cell!=null?t.cells[T.cell]:null,y=Oe(w);_.y=_.init?_.y+(y-_.y)*Math.min(1,b*14):y,_.init=!0,_.group.position.set(S.x,_.y,S.z),_.group.rotation.y=S.heading??0,_.group.scale.setScalar(.3+.7*_.vis)}for(const[T,_]of d)v.has(T)||(_.group.visible=!1,_.vis=0);for(const T of m){const _=g[T],S=s[T];if(!_||!S)continue;const E=_.render??_,w=E.x,y=E.z,R=E.heading,F=_.cell!=null?t.cells[_.cell]:null,B=Oe(F);S.y=S.init?S.y+(B-S.y)*Math.min(1,b*14):B;const Y=T==="companion"?1.35+.08*Math.sin(p*2.2):0,Z=S.y;S.group.position.set(w,Z+Y,y),S.group.rotation.y=R,S.shadow.position.set(w,Z+.035,y),S.rings.group.position.set(w,Z+.09,y),S.rings.ctrl.visible=!!_.controlled,S.rings.ctrl.rotation.z=p*1.4,S.rings.base.material.opacity=_.controlled?.95:.55,S.light.position.set(w,Z+(T==="avatar"?3.1:2.4),y),T==="avatar"?(S.model.lean.rotation.x=Math.min(.28,(E.speed??0)*.03),S.model.lean.position.y=Math.abs(Math.sin(p*11))*Math.min(.06,(E.speed??0)*.008)):(S.model.ring.rotation.z=p*1.2,S.model.shell.rotation.y=p*1.8,S.model.sats.forEach((H,V)=>{const k=p*2.6+V*Math.PI;H.position.set(Math.cos(k)*.62,.05*Math.sin(p*5+V),Math.sin(k)*.62),H.rotation.set(p*3,p*2,0)})),S.init||(S.trail.reset(w,Z+.1,y),S.init=!0),S.trail.update(b,w,Z+.1+(T==="companion"?.7:0),y,E.moving??_.moving?.85:.5),x.push({id:T,x:w,y:Z+1,z:y,r:T==="avatar"?3:2})}},centres(){return x},dispose(){i.remove(n),f.dispose()}}}function o_(i,t,{size:e=64,corner:n="bottom-right",offset:s=16}={}){const r=document.createElement("div");r.setAttribute("role","img"),r.setAttribute("aria-label","Compass: click to put north up"),r.title="Compass (click: north up, Home: reset view)";const o={"bottom-right":`right:${s}px;bottom:${s}px`,"top-left":`left:${s}px;top:${s}px`,"bottom-left":`left:${s}px;bottom:${s}px`}[n];r.style.cssText=`position:absolute;${o};width:${e}px;height:${e}px;border-radius:50%;cursor:pointer;
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
    </svg>`;const a=r.querySelector(".dial");r.addEventListener("click",c=>{c.stopPropagation(),t.northUp()}),r.addEventListener("pointerdown",c=>c.stopPropagation()),i.appendChild(r);let l=NaN;return{el:r,update(){const c=t.yawDeg;Math.abs(c-l)<.05||(l=c,a.setAttribute("transform",`rotate(${c.toFixed(2)})`))},dispose(){r.remove()}}}const a_=go;function l_({canvas:i,map:t,embedded:e=!1,focus:n,glow:s=a_,mode:r="overview",compass:o=!0,makeBoard:a,fog:l=!1,onHover:c,onSelect:u}){var Ot;const d=new Sx({canvas:i,antialias:!0});d.setPixelRatio(Math.min(devicePixelRatio,2)),d.setClearColor(xe.background);const f=new bx,h=new rn(42,1,1,1200),m=new $v(h,i,t.bounds,{embedded:e,mode:r}),x=n??{x:t.startCell.cx,z:t.startCell.cz,dist:void 0};m.focus(x.x,x.z,r==="overview"?x.dist??150:void 0);const g=sv(),p=a?a({map:t,cut:g}):wv(t,{cut:g});(Ot=p.setGlowLevel)==null||Ot.call(p,s),f.add(p.group);const b=jv(f),M={w:1,h:1},v=st=>{p.lineMats.push(st),st.resolution.set(M.w,M.h)},T=n_({scene:f,addLineMaterial:v});let _=null;const S=new fn(1,1,{type:In,samples:4});l&&(S.depthTexture=new Ml(1,1));const E=new Hx(d,S);E.addPass(new Vx(f,h));const w=l?new Kx(h):null;w&&E.addPass(w);const y=new Ms(new Yt(1,1),s,.32,.85);E.addPass(y),E.addPass(new qx);const R=o?o_(e?i.parentElement:document.body,m,e?{corner:"bottom-right",size:58,offset:12}:{corner:"bottom-right",size:72,offset:18}):null;R&&!e&&(R.el.style.position="fixed");function F(){const st=e?i.parentElement:null,D=st?st.clientWidth:innerWidth,A=st?st.clientHeight:innerHeight;!D||!A||(M.w=D,M.h=A,d.setSize(D,A,!1),E.setSize(D,A),h.aspect=D/A,h.updateProjectionMatrix(),p.resize(D,A))}const B=e?new ResizeObserver(F):null;B==null||B.observe(i.parentElement),e||addEventListener("resize",F),F();const Y={hover:[],select:[],frame:[]},Z=(st,...D)=>{for(const A of Y[st])A(...D)},H=(st,D)=>(Y[st].push(D),()=>{Y[st]=Y[st].filter(A=>A!==D)});c&&H("hover",c),u&&H("select",u);const V=new Q;function k(st,D){const A=m.rayAt(st,D),C=A.origin,z=A.direction;if(z.y>-1e-4)return null;const q=Math.max(0,(nv-C.y)/z.y),G=(0-C.y)/z.y,Tt=44;for(let _t=0;_t<=Tt;_t++){const It=q+(G-q)*_t/Tt;V.copy(z).multiplyScalar(It).add(C);const Mt=t.cellAt(V.x,V.z);if(Mt&&Mt.solid&&V.y<=ev(Mt))return{point:V.clone(),cell:Mt,solid:!0}}V.copy(z).multiplyScalar(G).add(C);const ft=t.cellAt(V.x,V.z);return{point:V.clone(),cell:ft,solid:!!(ft!=null&&ft.solid)}}let tt=null;const ut=st=>!tt||!st||tt(st.point.x,st.point.z),rt={x:0,y:0,inside:!1};let At=null,Ct=!1,lt=null;function wt(){if(!rt.inside){lt=null,At&&(At=null,p.hover.set(null),Z("hover",null,null)),T.hideCursor();return}const st=k(rt.x,rt.y);st&&(st.known=ut(st)),lt=st;const D=st&&st.known?st.cell??null:null,A=!D||D.solid;(D!==At||A!==Ct)&&(At=D,Ct=A,p.hover.set(D,{blocked:A}),Z("hover",D,st)),st&&D&&st.known&&!D.solid?T.showCursor(st.point.x,Oe(D),st.point.z,!1):T.hideCursor()}const zt=st=>{rt.x=st.clientX,rt.y=st.clientY,rt.inside=!0},xt=()=>{rt.inside=!1},Ut=st=>{const D=k(st.clientX,st.clientY);D&&(D.known=ut(D));const A=D&&D.known?D.cell??null:null;Z("select",A,D)},L=st=>st.preventDefault();i.addEventListener("pointermove",zt),i.addEventListener("pointerleave",xt),i.addEventListener("click",Ut),e||i.addEventListener("contextmenu",L);const W=H("select",st=>{yt.handlesSelect||p.select.set(st)}),it=new _h;let nt=0,K=!1;const U=[];let Et=!0;const dt={n:0,sum:0,max:0,last:0};function St(){if(!K)return;const st=performance.now(),D=Math.min(it.getDelta(),.1),A=it.elapsedTime;if(Z("frame",D,A),m.update(D),wt(),p.update(A),T.update(A),p.setFocus(m.target.x,m.target.z),b.update(h,m,A,d.domElement.height),U.length=0,_)for(const q of _.centres())U.push(q);const C=T.targetPos;C&&U.push({x:C.x,y:C.y+.6,z:C.z,r:1.9}),lt!=null&&lt.cell&&lt.known&&!lt.solid&&U.push({x:lt.point.x,y:Oe(lt.cell)+.6,z:lt.point.z,r:1.7}),g.update(h,m.mode==="chase"&&Et?U:[]),R==null||R.update(),E.render();const z=performance.now()-st;dt.last=z,dt.sum+=z,dt.n++,dt.max=Math.max(dt.max,z),nt=requestAnimationFrame(St)}const yt={renderer:d,camera:h,rig:m,board:p,composer:E,map:t,bloom:y,markers:T,scene:f,cut:g,pointer:rt,fogPass:w,handlesSelect:!1,on:H,pick:k,repick:wt,addLineMaterial:v,compass:R,get actorsView(){return _},get lastPick(){return lt},setKnowledge(st){tt=st},ensureActorsView(){return _??(_=r_({scene:f,map:t,addLineMaterial:v}))},setMode(st,D){D&&m.goal.set(D.x,0,D.z),m.setMode(st),st==="overview"&&D&&m.focus(D.x,D.z,150)},setGlow(st,D,A){var C;y.strength=st,y.enabled=st>.001,(C=p.setGlowLevel)==null||C.call(p,st),D!==void 0&&(y.radius=D),A!==void 0&&(y.threshold=A)},applySettings(st){m.applySettings(st),this.setGlow(st.glow,st.bloomRadius,st.bloomThreshold),b.setDensity(st.atmosphere??1),w==null||w.setShroud(st.shroud??1),T.chevrons.configure(st),Et=st.cutaway},start(){K||(K=!0,it.getDelta(),St())},stop(){K=!1,cancelAnimationFrame(nt)},takeFrameStats(){const st={...dt,mean:dt.sum/Math.max(1,dt.n)};return dt.n=dt.sum=dt.max=0,st},measureScene(){d.info.reset(),d.setRenderTarget(null),d.render(f,h);const st=d.info.render;return{calls:st.calls,triangles:st.triangles,lines:st.lines,points:st.points,geometries:d.info.memory.geometries,textures:d.info.memory.textures}},dispose(){K=!1,cancelAnimationFrame(nt),B==null||B.disconnect(),e||removeEventListener("resize",F),i.removeEventListener("pointermove",zt),i.removeEventListener("pointerleave",xt),i.removeEventListener("click",Ut),i.removeEventListener("contextmenu",L),W(),m.dispose(),R==null||R.dispose(),E.dispose(),d.dispose(),d.forceContextLoss()}};return yt}function c_({stage:i,actors:t,canvas:e,embedded:n=!1,onStatus:s,shows:r=null,keys:o=()=>null}){const a=i.rig,l=i.ensureActorsView();i.handlesSelect=!0;let c=null,u=null,d=0,f="avatar",h=!1;const m=!n,x=Yv();let g=null,p=null,b=0;const M=()=>t.snapshot()[f],v=()=>s==null?void 0:s({controlled:f,companionMode:t.snapshot().companion.mode,camera:a.mode,followHeading:a.followHeading}),T=i.on("select",(rt,At)=>{if(b>0){b=0;return}!At||!At.point||(c={x:At.point.x,z:At.point.z,cell:rt??null,known:At.known!==!1})}),_=()=>{if(a.reset(),a.mode==="overview"){const rt=M();a.focus(rt.x,rt.z)}},S=rt=>{for(const At of rt)At.type==="tap"?g={x:At.x,y:At.y}:At.type==="double"?(g={x:At.x,y:At.y},b=.6,_()):At.type==="peek"?p={x:At.x,y:At.y}:At.type==="peek-end"&&(p=null,At.swallow&&(b=.6))},E=rt=>(Number.isFinite(rt.timeStamp)?rt.timeStamp:performance.now())/1e3,w=rt=>{rt.pointerType==="touch"&&S(x.down(rt.pointerId,rt.clientX,rt.clientY,E(rt)))},y=rt=>{rt.pointerType==="touch"&&S(x.move(rt.pointerId,rt.clientX,rt.clientY))},R=rt=>{rt.pointerType==="touch"&&S(x.up(rt.pointerId,rt.clientX,rt.clientY,E(rt)))},F=rt=>{rt.pointerType==="touch"&&S(x.cancel(rt.pointerId))};m&&(e.addEventListener("pointerdown",w),e.addEventListener("pointermove",y),e.addEventListener("pointerup",R),e.addEventListener("pointercancel",F));const B=n?e:window,Y=rt=>n?!0:rt.target===document.body,Z=Iv(o),H=rt=>{!Y(rt)||rt.ctrlKey||rt.metaKey||rt.altKey||rt.repeat||Z.handle(rt)&&rt.code==="Tab"&&rt.preventDefault()};B.addEventListener("keydown",H),Z.bind("possess",()=>{f=f==="avatar"?"companion":"avatar",t.possess(f),k(),v()}),Z.bind("companionHold",()=>{const rt=t.snapshot().companion.mode;t.commandCompanion({type:rt==="follow"?"hold":"follow"}),v()}),Z.bind("stop",()=>{k(),c=null}),Z.bind("overview",()=>V()),Z.bind("camBehind",()=>queueMicrotask(v));function V(){const rt=M();i.setMode(a.mode==="chase"?"overview":"chase",{x:rt.x,z:rt.z}),v()}function k(){u=null,i.markers.clearTarget(),i.board.select.set(null)}const tt={axis:{x:0,z:0},moveTo:null,stop:!1,aim:null,run:!1},ut=i.on("frame",(rt,At)=>{b>0&&(b=Math.max(0,b-rt)),S(x.tick(performance.now()/1e3));const Ct=p??g;m&&Ct&&i.pointer&&(i.pointer.x=Ct.x,i.pointer.y=Ct.y,i.pointer.inside=!0);const lt=a.keys,wt=a.analog??null;tt.axis.x=tt.axis.z=0;let zt=!1;if(a.mode==="chase"){const{sx:nt,sy:K}=Ph(lt,o());if(nt||K){const U=Math.hypot(nt,K);a.toWorldAxis(nt/U,K/U,tt.axis),k()}else wt&&wt.mag>0&&(a.toWorldAxis(wt.x,wt.y,tt.axis),k(),zt=!0)}tt.run=cs(lt,"run",o())||zt&&wt.run;const xt=i.lastPick;if(tt.aim=!zt&&xt&&xt.known!==!1&&!xt.solid?{x:xt.point.x,z:xt.point.z}:null,tt.moveTo=null,c){const nt=c;c=null;const U=nt.known&&(!nt.cell||nt.cell.solid)?{ok:!1}:t.commandAvatarTo(nt.x,nt.z);(U==null?void 0:U.ok)===!1&&!nt.known?u=null:(U==null?void 0:U.ok)===!1?(d=.5,i.board.select.set(nt.cell,{blocked:!0}),i.markers.clearTarget(),u=null):(u={x:nt.x,z:nt.z,cell:nt.cell},i.board.select.set(nt.known?nt.cell:null),i.markers.setTarget(nt.x,Oe(nt.known?nt.cell:null),nt.z))}d>0&&(d-=rt,d<=0&&!u&&i.board.select.set(null)),h||t.update(rt,tt);const Ut=t.snapshot();f=Ut.controlled??f,l.sync(Ut,At,rt,r);const L=Ut[f],W=L.render??L;a.mode==="chase"&&a.follow(W.x,W.z,W.heading);const it=t.path(f);it.length?i.markers.setPath([{x:L.x,z:L.z},...it],Oe(i.map.cells[L.cell])+.12):(i.markers.setPath([]),u&&d<=0&&k())});return v(),{actors:t,toggleView:V,status:v,bind:Z.bind,press(rt){const At=Ss(rt,o())[0];return At?Z.handle({code:At}):!1},setMoveVector(rt,At,Ct=!1){var lt;(lt=a.setAnalog)==null||lt.call(a,rt,At,Ct)},setPaused(rt){h=!!rt},get paused(){return h},get peeking(){return!!p},get controlled(){return f},dispose(){T(),ut(),B.removeEventListener("keydown",H),m&&(e.removeEventListener("pointerdown",w),e.removeEventListener("pointermove",y),e.removeEventListener("pointerup",R),e.removeEventListener("pointercancel",F))}}}const cn=(i,t)=>`${i},${t}`,qr={nav:1,render:2};function u_(i){const t=i.opts??{};return!!t.level&&!t.coarse&&!t.kindOf&&!t.cache&&!t.onLoad&&!t.onUnload}function h_({world:i,pool:t=null,config:e={},now:n=()=>performance.now()}){var p,b;const s={poolSize:nn.poolSize.value,batch:nn.batch.value,inflight:nn.inflight.value,adoptMs:nn.adoptMs.value,adoptMax:nn.adoptMax.value,...e},r={seed:i.seed,terrain:(p=i.opts)==null?void 0:p.terrain,field:(b=i.opts)==null?void 0:b.field},o=new Map,a=new Set,l=new Set,c=[];let u=0,d=0,f=!1;const h={jobs:0,sectors:0,adopted:0,adoptMs:0,maxAdoptMs:0,errors:0,queued:0,inflight:0,ready:0},m=M=>M.tier==="render"?i.has("render",M.u,M.v)&&i.has("detail",M.u,M.v):i.has("nav",M.u,M.v),x=()=>!!t&&!f&&s.poolSize>0;function g(){if(x())for(;u<s.inflight;){const M=[];for(const S of o.values())a.has(cn(S.u,S.v))||l.has(cn(S.u,S.v))||M.push(S);if(!M.length)break;M.sort((S,E)=>S.d-E.d);const v=M.slice(0,s.batch),T=v.map(S=>[S.u,S.v,S.tier]);for(const S of v)a.add(cn(S.u,S.v));u++,h.jobs++;const _=d;t.call("sectorTiers",{...r,items:T}).then(S=>{if(_===d){u--;for(const E of S.list)a.delete(cn(E.u,E.v)),l.add(cn(E.u,E.v)),c.push(E);h.sectors+=S.list.length,g()}},()=>{if(_===d){u--,h.errors++,f=!0;for(const S of v)a.delete(cn(S.u,S.v));o.clear(),a.clear(),l.clear()}})}}return{stats:h,cfg:s,get active(){return x()},want(M){const v=new Map;for(const T of M){const _=cn(T.u,T.v),S=v.get(_);S?(qr[T.tier]>qr[S.tier]&&(S.tier=T.tier),S.d=Math.min(S.d,T.d)):v.set(_,{u:T.u,v:T.v,tier:T.tier,d:T.d})}for(const[T,_]of v)m(_)&&v.delete(T);for(const T of[...a,...l])!v.has(T)&&o.has(T)&&v.set(T,o.get(T));o.clear();for(const[T,_]of v)o.set(T,_);h.queued=o.size-a.size-l.size,g()},pending(M,v,T="nav"){if(!x())return!1;const _=cn(M,v);if(c.some(E=>E.u===M&&E.v===v))return!0;const S=o.get(_);return!!S&&qr[S.tier]>=qr[T]},adopt(M=s.adoptMs){if(!c.length)return h.ready=0,0;const v=n();c.sort((S,E)=>{var w,y;return(((w=o.get(cn(S.u,S.v)))==null?void 0:w.d)??1e9)-(((y=o.get(cn(E.u,E.v)))==null?void 0:y.d)??1e9)});let T=0;for(;c.length&&T<s.adoptMax;){const S=c.shift();if(i.adopt("nav",S.u,S.v,S.nav),S.render&&i.adopt("render",S.u,S.v,S.render),S.detail&&i.adopt("detail",S.u,S.v,S.detail),o.delete(cn(S.u,S.v)),l.delete(cn(S.u,S.v)),T++,n()-v>M)break}const _=n()-v;return h.adopted+=T,h.adoptMs+=_,h.maxAdoptMs=Math.max(h.maxAdoptMs,_),h.ready=c.length,T},configure(M={}){for(const v of Object.keys(nn))Number.isFinite(M[v])&&(s[v]=Math.min(nn[v].max,Math.max(nn[v].min,M[v])))},setPool(M){t=M,d++,u=0,a.clear(),l.clear(),c.length=0,o.clear(),f=!1},idle(){return u===0&&!c.length}}}const f_=2,ra=30;function d_({world:i,focus:t,heading:e,opts:n,loaded:s}){const r=i.ringPlan(t,{...n,loaded:s,maxLoad:1/0,maxUnload:1/0,ahead:e&&n.aheadBias>0?{dir:e,bias:n.aheadBias}:void 0});return{steps:r.steps.filter(o=>o.tier==="nav"||o.tier==="render"),drop:[...r.drop.render,...r.unload],ready:r.ready,plan:r}}function p_({map:i,cut:t,budgetMs:e=5,maxLoad:n=1/0,onChunk:s,policy:r=d_,ring:o={},pool:a,load:l={},now:c=()=>performance.now()}){const u={navRadius:di.navRadius.value,renderRadius:di.renderRadius.value,thickness:di.thickness.value,aheadBias:di.aheadBias.value,...o},d={ms:e,items:n},f=i.world,h=Object.fromEntries(Object.keys(nn).map(K=>[K,nn[K].value]));Object.assign(h,l);let m=null;const x=()=>{if(m==null||m.terminate(),m=null,!u_(f)||typeof Worker>"u"||!(h.poolSize>0))return null;try{m=Hh({spawn:Vh,size:Math.round(h.poolSize)})}catch{m=null}return m},g=h_({world:f,pool:a??x(),config:h});let p=!1;const b=new Xe,M=[],v=new Map,T={v:go},{floor:_,floorMat:S}=Ah(b),{hover:E,select:w}=Th({group:b,lineMats:M}),y=new Map,R=new Map;let F=null,B=null,Y=null,Z=!0,H=null,V=null;const k=(K,U,Et)=>V?V(K,U,Et):!0;let tt=[],ut={w:1,h:1};const rt=new Float64Array(ra);let At=0;const Ct={chunksBuilt:0,chunksDropped:0,buildMs:0,maxItemMs:0,lastFrameMs:0,queued:0,slices:0,plans:0,planMs:0,planMsAvg:0,planMsTotal:0,ready:!1};function lt(K){const U=[],Et=dt=>f.coarse.inBounds(dt.u,dt.v);for(const dt of K){if(dt.tier==="nav"){U.push({u:dt.u,v:dt.v,tier:"nav",d:dt.d});continue}U.push({u:dt.u,v:dt.v,tier:"render",d:dt.d});for(const St of f.sectorGeo(dt.u,dt.v).nbrs)if(Et(St)){U.push({u:St.u,v:St.v,tier:"render",d:dt.d+.01});for(const yt of f.sectorGeo(St.u,St.v).nbrs)Et(yt)&&U.push({u:yt.u,v:yt.v,tier:"nav",d:dt.d+.02})}}return U}function wt(){const K=c();if(Z=!1,B){const st=F.x-B.x,D=F.z-B.z,A=Math.hypot(st,D);if(A>.5){const C=st/A,z=D/A;Y=Y?{x:Y.x*.5+C*.5,z:Y.z*.5+z*.5}:{x:C,z}}}B={x:F.x,z:F.z};const U={nav:i.sectors.map(st=>st.key),render:[...y.keys()].map(st=>i.sectors[st].key)},Et=r({world:f,focus:F,heading:Y,opts:u,loaded:U});H=Et.plan??Et,tt=Et.steps.map(st=>({kind:st.tier==="nav"?"nav":"mesh",u:st.u,v:st.v,d:st.d}));for(const[st,D]of Et.drop){const A=i.has(st,D);if(!A)continue;R.delete(A.id);const C=y.get(A.id);C&&(b.remove(C.board.group),C.board.dispose(),y.delete(A.id),Ct.chunksDropped++)}const dt=new Set(Et.steps.filter(st=>st.tier==="render").map(st=>`${st.u},${st.v}`));for(const[st,D]of R)dt.has(D.key)||R.delete(st);g.active&&g.want(lt(Et.steps)),Ct.queued=tt.length,Ct.ready=!!Et.ready,Ct.plans++;const St=c()-K;Ct.planMs=St,Ct.planMsTotal+=St,rt[At%ra]=St,At++;const yt=Math.min(At,ra);let Ot=0;for(let st=0;st<yt;st++)Ot+=rt[st];Ct.planMsAvg=Ot/yt}const zt=(K,U,Et)=>!p&&g.pending(K,U,Et);function xt(K,U){if(zt(K.u,K.v,K.kind==="nav"?"nav":"render"))return"defer";const Et=i.sector(K.u,K.v);if(K.kind==="nav"||y.has(Et.id))return;let dt=R.get(Et.id);if(!dt){for(const Ot of f.sectorGeo(Et.u,Et.v).nbrs){if(!f.coarse.inBounds(Ot.u,Ot.v))continue;if(zt(Ot.u,Ot.v,"render"))return"defer";const st=i.sector(Ot.u,Ot.v);if(!st.cut){for(const D of f.sectorGeo(st.u,st.v).nbrs)if(f.coarse.inBounds(D.u,D.v)&&zt(D.u,D.v,"nav"))return"defer";i.prepare(st),tt.unshift(K);return}}i.prepare(Et);const yt=i.chunkView(Et);dt={key:Et.key,d:K.d,assembly:Rh(yt,{cut:t,chunk:{shared:v,lineMats:M,shows:k,glowRef:T}},c)},R.set(Et.id,dt)}if(Ct.slices++,!dt.assembly.run(U))return"more";R.delete(Et.id);const St=dt.assembly.board;St.group.traverse(yt=>{(yt.isMesh&&!yt.isInstancedMesh||yt.isLineSegments2)&&(yt.frustumCulled=!0)});for(const yt of M)yt.resolution.set(ut.w,ut.h);b.add(St.group),y.set(Et.id,{board:St,d:dt.d}),Ct.chunksBuilt++,s==null||s(Et,St)}function Ut(K=d.ms,U=d.items){const Et=c();g.active&&g.adopt();const dt=Et+K,St=[];let yt=0;for(;tt.length&&yt<U;){const Ot=tt.shift(),st=c(),D=xt(Ot,dt);if(D==="defer"){St.push(Ot);continue}const A=c()-st;if(Ct.buildMs+=A,Ct.maxItemMs=Math.max(Ct.maxItemMs,A),D==="more"){tt.unshift(Ot);break}if(yt++,c()>dt)break}St.length&&tt.unshift(...St),Ct.queued=tt.length,Ct.lastFrameMs=c()-Et}const L=K=>{const U=p;p=!0;try{return K()}finally{p=U}};function W(K,U){F={x:K,z:U},(Z||!B||Math.hypot(K-B.x,U-B.z)>f_)&&wt()}function it(K={}){const U={...g.cfg};g.configure(K),!Object.keys(nn).every(Et=>g.cfg[Et]===U[Et])&&(!a&&g.cfg.poolSize!==U.poolSize&&(h.poolSize=g.cfg.poolSize,g.setPool(x())),F&&(Z=!0,wt()))}const nt=[];return{group:b,hover:E,select:w,lineMats:M,floorMat:S,map:i,stats:Ct,chunks:y,settle(K,U,Et=u.renderRadius){W(K,U);const dt=tt.filter(St=>St.d<=Et);tt=tt.filter(St=>St.d>Et),L(()=>{for(;dt.length;)for(tt.unshift(...dt.splice(0));tt.length&&tt[0].d<=Et;)xt(tt.shift(),1/0)}),Ct.queued=tt.length},drain(){L(()=>Ut(1e9,1/0))},pump:Ut,loader:g,get load(){return{...g.cfg}},configureLoad:it,get budget(){return{budgetMs:d.ms,maxLoad:d.items}},configure(K){let U=!1;for(const Et of Object.keys(u))Number.isFinite(K==null?void 0:K[Et])&&K[Et]!==u[Et]&&(u[Et]=K[Et],U=!0);Number.isFinite(K==null?void 0:K.budgetMs)&&K.budgetMs>=0&&(d.ms=K.budgetMs),(K==null?void 0:K.maxLoad)===1/0?d.items=1/0:Number.isFinite(K==null?void 0:K.maxLoad)&&K.maxLoad>=1&&(d.items=Math.floor(K.maxLoad)),U&&(Z=!0,F&&wt()),it(K)},get ring(){return{...u}},get lastPlan(){return H},setFocus(K,U){_.position.set(K,-.05,U),S.uniforms.uFocus.value.set(K,U),W(K,U)},update(K){Ut();for(const U of y.values())U.board.update(K);E.tick(K),w.tick(K);for(const U of nt)U(K)},resize(K,U){ut={w:K,h:U};for(const Et of M)Et.resolution.set(K,U)},setShows(K){V=K},setGlowLevel(K){T.v=K;for(const U of y.values())U.board.setGlowLevel(K)},get focus(){return F},dispose(){for(const K of y.values())K.board.dispose();y.clear(),R.clear(),m==null||m.terminate(),m=null}}}class zh{constructor(t){this.a=[],this.cmp=t}get size(){return this.a.length}peek(){return this.a[0]}push(t){const e=this.a,n=this.cmp;let s=e.length;for(e.push(t);s>0;){const r=s-1>>1;if(n(e[s],e[r])>=0)break;[e[s],e[r]]=[e[r],e[s]],s=r}}pop(){const t=this.a,e=this.cmp,n=t[0],s=t.pop();if(t.length){t[0]=s;let r=0;for(;;){const o=2*r+1,a=o+1;let l=r;if(o<t.length&&e(t[o],t[l])<0&&(l=o),a<t.length&&e(t[a],t[l])<0&&(l=a),l===r)break;[t[r],t[l]]=[t[l],t[r]],r=l}}return n}}const tr=(i,t)=>{var e;return(i.cell?i.cell(t):(e=i.cells)==null?void 0:e[t])??null},oa=(i,t)=>{var e,n;return i.gateLocked?!!i.gateLocked(t):!!((n=(e=i.gates)==null?void 0:e[t])!=null&&n.locked)};function m_(){const i=new Map;let t=0;function e(m,x=!0){let g=i.get(m);return!g&&x&&(g={key:m,bits:new Uint8Array(16),n:0},i.set(m,g)),g}const n=(m,x)=>!!m&&x>>3<m.bits.length&&(m.bits[x>>3]&1<<(x&7))!==0;function s(m,x){const g=x>>3;if(g>=m.bits.length){let b=m.bits.length;for(;b<=g;)b*=2;const M=new Uint8Array(b);M.set(m.bits),m.bits=M}const p=1<<(x&7);return m.bits[g]&p?!1:(m.bits[g]|=p,m.n++,t++,!0)}function r(m){const x=[];if(!m)return x;for(let g=0;g<m.bits.length;g++){const p=m.bits[g];if(p)for(let b=0;b<8;b++)p&1<<b&&x.push(g*8+b)}return x}const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=new Map([...o].map((m,x)=>[m,x]));function l(m){let x="";for(let g=0;g<m.length;g+=3){const p=m[g],b=m[g+1]??0,M=m[g+2]??0;x+=o[p>>2]+o[(p&3)<<4|b>>4]+(g+1<m.length?o[(b&15)<<2|M>>6]:"=")+(g+2<m.length?o[M&63]:"=")}return x}function c(m){const x=Math.floor(m.length*3/4)-(m.endsWith("==")?2:m.endsWith("=")?1:0),g=new Uint8Array(x);let p=0;for(let b=0;b<m.length;b+=4){const M=a.get(m[b]),v=a.get(m[b+1]),T=m[b+2]==="="?0:a.get(m[b+2]),_=m[b+3]==="="?0:a.get(m[b+3]);p<x&&(g[p++]=M<<2|v>>4),p<x&&(g[p++]=(v&15)<<4|T>>2),p<x&&(g[p++]=(T&3)<<6|_)}return g}function u(m=null){const x={};for(const g of[...i.keys()].sort()){const p=i.get(g);let b=p.bits.length;for(;b>0&&p.bits[b-1]===0;)b--;b&&(x[g]=l(p.bits.subarray(0,b)))}return{format:"boundless-fog-memory",version:1,world:m,chunks:x}}function d(m){if(!m||m.format!=="boundless-fog-memory"||m.version!==1||typeof m.chunks!="object")throw new Error("not a fog memory");i.clear();for(const x of Object.keys(m.chunks).sort()){const g=c(m.chunks[x]),p=Math.max(16,g.length),b={key:x,bits:new Uint8Array(p),n:0};b.bits.set(g);for(let M=0;M<b.bits.length;M++){let v=b.bits[M];for(;v;)b.n+=v&1,v>>=1}i.set(x,b)}return t++,[...i.keys()]}function f(){let m=0,x=0;for(const g of i.values())m+=g.n,x+=g.bits.length;return{chunks:i.size,cells:m,bytes:x}}return{chunk:e,test:n,set:s,locals:r,serialise:u,restore:d,stats:f,clear:()=>{i.clear(),t++},chunks:i,get version(){return t}}}const Mu=1e-5,is=32,us=i=>Math.round(i*200);function g_(i,t,e,n,s=null){const r=i.cellAt(t,e);if(!r||s&&s(r))return{start:null,cells:[]};const o=new Map,a=f=>{let h=o.get(f);return h===void 0&&(h=tr(i,f),o.set(f,h)),h},l=new Set([r.id]),c=[],u=[r.id],d=f=>{if(!(!f||l.has(f.id)||Math.hypot(f.cx-t,f.cz-e)>n+(f.radius??3))){if(s&&s(f)){l.add(f.id);return}l.add(f.id),u.push(f.id)}};for(let f=0;f<u.length;f++){const h=a(u[f]);if(!h)continue;c.push(h);for(const x of h.neighbors)d(a(x.id));const m=h.poly;if(!(!m||m.length<3||!h.neighbors.some(x=>x.mid)))for(let x=0;x<m.length;x++){const g=m[x],p=m[(x+1)%m.length],b=(g[0]+p[0])/2,M=(g[1]+p[1])/2;if(Math.hypot(b-t,M-e)>n+1)continue;const v=p[0]-g[0],T=p[1]-g[1],_=v*v+T*T||1;let S=!1;for(const w of h.neighbors){if(!w.mid)continue;const y=((w.mid[0]-g[0])*v+(w.mid[1]-g[1])*T)/_;if(!(y<-.01||y>1.01)&&Math.hypot(g[0]+y*v-w.mid[0],g[1]+y*T-w.mid[1])<.1){S=!0;break}}if(S)continue;const E=Math.hypot(b-h.cx,M-h.cz)||1;d(i.cellAt(b+(b-h.cx)/E*.25,M+(M-h.cz)/E*.25))}}return{start:r,cells:c}}function x_(i){const t=new Map,e=[];for(const n of i){if(!n.solid||!n.poly||n.poly.length<3)continue;const s=n.poly;for(let r=0;r<s.length;r++){const o=s[r],a=s[(r+1)%s.length],l=`${us(o[0])},${us(o[1])}`,c=`${us(a[0])},${us(a[1])}`,u=l<c?`${l}|${c}`:`${c}|${l}`,d=t.get(u);d===void 0?(t.set(u,e.length),e.push([o[0],o[1],a[0],a[1],n.cx,n.cz])):d>=0&&(e[d]=null,t.set(u,-1))}}return e.filter(Boolean)}function v_(i,t,e,n,s){const r=s[2]-s[0],o=s[3]-s[1],a=e*o-n*r;if(Math.abs(a)<1e-12)return 1/0;const l=s[0]-i,c=s[1]-t,u=(l*o-c*r)/a,d=(l*n-c*e)/a;return u>1e-9&&d>=-1e-9&&d<=1+1e-9?u:1/0}function __(i,t,e,n){const s=e/Math.cos(Math.PI/is),r=[];for(const f of n){const h=(f[0]+f[2])/2,m=(f[1]+f[3])/2;if((i-h)*(h-f[4])+(t-m)*(m-f[5])<=0)continue;const x=f[2]-f[0],g=f[3]-f[1],p=x*x+g*g||1,b=Math.max(0,Math.min(1,((i-f[0])*x+(t-f[1])*g)/p));Math.hypot(f[0]+b*x-i,f[1]+b*g-t)<=e+1e-6&&r.push(f)}const o=r.slice();for(let f=0;f<is;f++){const h=f/is*Math.PI*2,m=(f+1)/is*Math.PI*2;o.push([i+s*Math.cos(h),t+s*Math.sin(h),i+s*Math.cos(m),t+s*Math.sin(m)])}const a=[],l=new Set;for(const f of r)for(let h=0;h<4;h+=2){const m=`${us(f[h])},${us(f[h+1])}`;if(l.has(m))continue;l.add(m);const x=Math.atan2(f[h+1]-t,f[h]-i);a.push(x-Mu,x,x+Mu)}for(let f=0;f<is;f++)a.push((f+.5)/is*Math.PI*2-Math.PI);a.sort((f,h)=>f-h);const c=[],u=[];let d=-1/0;for(const f of a){if(f-d<1e-9)continue;d=f;const h=Math.cos(f),m=Math.sin(f);let x=1/0;for(const g of o){const p=v_(i,t,h,m,g);p<x&&(x=p)}x<1/0&&(c.push([i+h*x,t+m*x]),u.push(f))}return{pts:c,ang:Float64Array.from(u),ox:i,oz:t}}function Su(i,t,e){const{pts:n,ang:s,ox:r,oz:o}=i,a=n.length;if(a<3)return!1;const l=Math.atan2(e-o,t-r);let c=0,u=a;for(;c<u;){const x=c+u>>1;s[x]<=l?c=x+1:u=x}const d=(c-1+a)%a,f=(d+1)%a,h=n[d],m=n[f];return(m[0]-h[0])*(e-h[1])-(m[1]-h[1])*(t-h[0])>=-1e-9}function y_(i){let t=1/0,e=1/0,n=-1/0,s=-1/0;for(const[r,o]of i)r<t&&(t=r),r>n&&(n=r),o<e&&(e=o),o>s&&(s=o);return{x0:t,z0:e,x1:n,z1:s}}function M_(i,t,e){const n=[],s=i.poly??[];if(!i.solid){n.push([i.cx,i.cz]);for(const[o,a]of s)n.push([i.cx+(o-i.cx)*.75,i.cz+(a-i.cz)*.75]);return n}const r=(o,a)=>{const l=Math.hypot(t-o,e-a)||1;return[o+(t-o)/l*.06,a+(e-a)/l*.06]};for(let o=0;o<s.length;o++){const a=s[o],l=s[(o+1)%s.length];n.push(r((a[0]+l[0])/2,(a[1]+l[1])/2),r(a[0],a[1]))}return n}const Cn=0,ui=1,Yr=2,Ws=2,Xs=4194304,qs=256,S_={radius:22,moveEps:.5,pingTtl:6,pingMinStrength:.15,maxEvents:2e3,weight:1,falloff:.35,exploreLevel:.04,trackLevels:!1,worldId:void 0,keyOf:void 0,idOf:void 0},b_=i=>i*i*(3-2*i);function w_(i,t={}){const e={...S_,...t},n=m_();let s=0,r=0;const o=[],a=new Map;let l=0;function c(O){let $=a.get(O);return $||($={idx:o.length,key:O,ch:n.chunk(O,!1),unloaded:!1,kind:-1,n:0},o.push($),a.set(O,$)),$}const u=new Map,d=new Map;function f(O){var N;if(e.keyOf){const ht=e.keyOf(O)[0];return c(ht)}if(O.sector!==void 0&&typeof O.local=="number"){let ht=u.get(O.sector);if(!ht){const vt=(N=i.sectors)==null?void 0:N[O.sector];ht=c(vt&&typeof vt.u=="number"?`${vt.u},${vt.v}`:`s${O.sector}`),u.set(O.sector,ht)}return ht}const $=Math.floor(O.id/qs);let j=d.get($);return j||(j=c(`k${$}`),d.set($,j)),j}const h=O=>e.keyOf?e.keyOf(O)[1]:O.sector!==void 0&&typeof O.local=="number"?O.local:(O.id%qs+qs)%qs;let m=new Map,x=-1;function g(O){const $=i.sectors;if(!$)return null;if($.length!==x){m=new Map;for(const j of $)typeof j.u=="number"&&m.set(`${j.u},${j.v}`,j);x=$.length}return m.get(O)??null}function p(O){if(O.kind===-1){const j=/^k(-?\d+)$/.exec(O.key);j?(O.kind=1,O.n=+j[1]):O.kind=0}if(O.kind===1)return O.n*qs;const $=g(O.key);return $?$.base:null}function b(O,$){if(e.idOf)return e.idOf(O.key,$);const j=p(O);return j===null?null:j+$}let M=256;const v={id:new Float64Array(M),info:new Int32Array(M),local:new Int32Array(M),flags:new Uint8Array(M),seen:new Uint8Array(M),level:new Uint8Array(M),until:new Float64Array(M),n:0},T=new Map,_=[];let S=0;function E(O){let $=T.get(O.id);if($===void 0){if(_.length)$=_.pop();else{if(v.n===M){M*=2;const j=(N,ht)=>{const vt=new N(M);return vt.set(ht),vt};v.id=j(Float64Array,v.id),v.info=j(Int32Array,v.info),v.local=j(Int32Array,v.local),v.flags=j(Uint8Array,v.flags),v.seen=j(Uint8Array,v.seen),v.level=j(Uint8Array,v.level),v.until=j(Float64Array,v.until)}$=v.n++}v.id[$]=O.id,v.info[$]=f(O).idx,v.local[$]=h(O),v.flags[$]=0,v.seen[$]=0,v.level[$]=0,v.until[$]=0,T.set(O.id,$),S++}return $}function w(O){T.delete(v.id[O]),v.id[O]=NaN,v.seen[O]=0,v.flags[O]=0,v.level[O]=0,v.until[O]=0,_.push(O),S--}const y=O=>{const $=o[v.info[O]].ch;return!!$&&n.test($,v.local[O])},R=O=>v.seen[O]>0?Yr:y(O)||v.flags[O]&Ws&&v.until[O]>s?ui:Cn,F=O=>v.info[O]*Xs+v.local[O],B=(O,$)=>{const j=T.get(O);if(j!==void 0)return R(j);const N=o[Math.floor($/Xs)];return N.ch&&n.test(N.ch,$-N.idx*Xs)?ui:Cn},Y=new Map,Z=new Map;let H=[];const V=(O,$)=>{H.push({type:O,...$}),H.length>e.maxEvents&&(H=H.slice(-Math.floor(e.maxEvents*.75)))},k=new Map,tt=new zh((O,$)=>O.until-$.until),ut={updates:0,recomputes:0,cellsRead:0,lastMs:0},rt=O=>{let $=0;for(const j of k.values()){const N=j.cells.get(O);N!==void 0&&N>$&&($=N)}return $};function At(O){const $=v.seen[O]>0?rt(O):0;e.trackLevels&&$>>4!==v.level[O]>>4&&Z.set(v.id[O],F(O)),v.level[O]=$}function Ct(O){v.seen[O]===0&&!(v.flags[O]&Ws)&&w(O)}const lt=()=>Math.max(1,Math.ceil(e.exploreLevel*255));function wt(O){const $=l?gt=>f(gt).unloaded:null,{cells:j,start:N}=g_(i,O.x,O.z,O.radius,$);ut.recomputes++,ut.cellsRead+=j.length;const ht=new Map;let vt=null;if(N&&!N.solid){vt=__(O.x,O.z,O.radius,x_(j));const gt=y_(vt.pts),ct=O.radius,P=Math.max(1e-6,e.falloff*ct),J=lt();for(const et of j){const bt=Math.hypot(et.cx-O.x,et.cz-O.z);if(bt>ct+(et.radius??3)+1)continue;const Dt=Math.max(1,typeof e.weight=="function"?e.weight(et,O):e.weight),Pt=Math.min(1,Math.max(0,(ct-Math.max(0,bt-.5*(et.radius??3))*Dt)/P)),Rt=Math.round(255*b_(Pt));if(Rt<J)continue;let Bt=!1;for(const[Gt,$t]of M_(et,O.x,O.z))if(!(Gt<gt.x0||Gt>gt.x1||$t<gt.z0||$t>gt.z1)&&Su(vt,Gt,$t)){Bt=!0;break}Bt&&ht.set(E(et),Rt)}O.box=gt}else O.box=null,N&&ht.set(E(N),255);const Lt=[];for(const gt of ht.keys()){if(O.cells.has(gt))continue;const ct=R(gt);v.seen[gt]++,ct!==Yr&&Y.set(v.id[gt],F(gt));const P=o[v.info[gt]];P.ch||(P.ch=n.chunk(P.key)),n.set(P.ch,v.local[gt])&&Lt.push(v.id[gt])}const X=[];for(const gt of O.cells.keys())ht.has(gt)||(v.seen[gt]--,v.seen[gt]===0&&Y.set(v.id[gt],F(gt)),X.push(gt));O.cells=ht;for(const gt of ht.keys())At(gt);for(const gt of X)At(gt),Ct(gt);O.poly=vt,O.ax=O.x,O.az=O.z,r++,Lt.length&&V("revealed",{t:s,cells:Lt,by:O.id,source:"vision"})}function zt(O,$=s){const j=performance.now();s=$,ut.updates++;let N=0;const ht=H.length,vt=new Set;for(const X of O){vt.add(X.id);const gt=X.radius??e.radius;let ct=k.get(X.id);ct||(ct={id:X.id,x:X.x,z:X.z,radius:gt,own:X.radius!==void 0,cells:new Map,poly:null,box:null,ax:NaN,az:NaN},k.set(X.id,ct)),ct.own=X.radius!==void 0,ct.x=X.x,ct.z=X.z,gt!==ct.radius&&(ct.radius=gt,ct.ax=NaN),Math.hypot(ct.x-ct.ax,ct.z-ct.az)<e.moveEps||(wt(ct),N++)}for(const[X,gt]of k)if(!vt.has(X)){k.delete(X);for(const ct of gt.cells.keys())v.seen[ct]--,v.seen[ct]===0&&Y.set(v.id[ct],F(ct)),At(ct),Ct(ct);r++}W($),ut.lastMs=performance.now()-j;let Lt=0;for(let X=ht;X<H.length;X++)H[X].type==="revealed"&&(Lt+=H[X].cells.length);return{recomputed:N,revealed:Lt}}function xt(){let O=0;for(const $ of k.values())$.own||($.radius=e.radius),wt($),O++;return{recomputed:O}}function Ut(O,{ttl:$=e.pingTtl,t:j=s}={}){const N=[];for(const ht of O){const vt=tr(i,ht);if(!vt||l&&f(vt).unloaded)continue;const Lt=E(vt),X=R(Lt);v.flags[Lt]|=Ws;const gt=j+$;gt>v.until[Lt]&&(v.until[Lt]=gt,tt.push({until:gt,i:Lt,id:ht})),X===Cn&&(Y.set(ht,F(Lt)),N.push(ht))}return N.length&&(r++,V("revealed",{t:j,cells:N,by:"scan",source:"scan"})),N.length}function L(O,$={}){const j=$.minStrength??e.pingMinStrength,N=[];for(const ht of O)ht.type==="cell-reached"&&!ht.dead&&ht.strength>=j&&!(ht.generation>0)&&N.push(ht.cell);return N.length?Ut(N,{ttl:$.ttl,t:s}):0}function W(O=s){for(s=O;tt.size&&tt.peek().until<=O;){const{until:$,i:j,id:N}=tt.pop();v.id[j]!==N||v.until[j]>$||!(v.flags[j]&Ws)||(v.flags[j]&=~Ws,R(j)===Cn&&(Y.set(N,F(j)),r++),Ct(j))}}const it=O=>{const $=T.get(O.id);if($!==void 0)return R($);const j=f(O);return j.ch&&n.test(j.ch,h(O))?ui:Cn};function nt(O){const $=T.get(O);if($!==void 0)return R($);const j=tr(i,O);return j?it(j):Cn}function K(O){const $=tr(i,O);if(!$)return!1;const j=f($);return!!j.ch&&n.test(j.ch,h($))}const U=O=>{const $=T.get(O);return $===void 0?0:v.level[$]};function Et(O,$){const j=a.get(O);if(!j||!j.ch||!n.test(j.ch,$))return Cn;if(!j.unloaded){const N=b(j,$),ht=N===null?void 0:T.get(N);if(ht!==void 0&&v.seen[ht]>0)return Yr}return ui}const dt=(O,$)=>{const j=a.get(O);return!!j&&!!j.ch&&n.test(j.ch,$)},St=O=>[f(O).key,h(O)];function yt(O,$){for(const j of k.values())if(!(!j.box||O<j.box.x0||O>j.box.x1||$<j.box.z0||$>j.box.z1)&&j.poly&&Su(j.poly,O,$))return!0;return!1}function Ot(O,$,j="dynamic"){if(j==="dynamic")return yt(O,$);const N=i.cellAt(O,$);if(!N)return!1;if(j==="static"){const ht=f(N);return!!ht.ch&&n.test(ht.ch,h(N))}return it(N)>=ui}function st(O){const $=[];for(const N of O){const ht=c(N);ht.unloaded||(ht.unloaded=!0,l++,$.push(N))}if(!$.length)return 0;const j=new Set($.map(N=>a.get(N).idx));for(let N=0;N<v.n;N++)if(!(v.id[N]!==v.id[N]||!j.has(v.info[N]))){for(const ht of k.values())ht.cells.delete(N);w(N)}for(const N of k.values())N.ax=NaN;return r++,V("unloaded",{t:s,keys:$}),$.length}function D(O){const $=[];for(const j of O){const N=a.get(j);if(!(!N||!N.unloaded)&&(N.unloaded=!1,l--,$.push(j),!!N.ch))for(const ht of n.locals(N.ch)){const vt=b(N,ht);vt!==null&&Y.set(vt,N.idx*Xs+ht)}}if(!$.length)return 0;for(const j of k.values())j.ax=NaN;return r++,V("loaded",{t:s,keys:$}),$.length}const A=O=>{const $=a.get(O);return!$||!$.unloaded},C=()=>e.worldId??i.seed??null;function z(){return n.serialise(C())}function q(O,{ignoreWorld:$=!1}={}){const j=typeof O=="string"?JSON.parse(O):O,N=C();if(!$&&N!==null&&j&&j.world!==null&&j.world!==void 0&&j.world!==N)throw new Error(`fog memory is for world ${j.world}, not ${N}`);n.restore(j);for(const ht of n.chunks.keys())c(ht);for(const ht of o)ht.ch=n.chunk(ht.key,!1),ht.unloaded=!1;l=0;for(const ht of T.values())v.id[ht]=NaN;T.clear(),_.length=0,v.n=0,S=0;for(const ht of k.values())ht.cells=new Map,ht.poly=null,ht.box=null,ht.ax=NaN;return Y.clear(),Z.clear(),r++,V("restored",{t:s,chunks:n.stats().chunks,cells:n.stats().cells}),n.stats()}function G(){W(s);let O=0;for(const Lt of o)Lt.ch&&!Lt.unloaded&&(O+=Lt.ch.n);const $=S+O,j=new Float64Array($),N=new Uint8Array($),ht=new Uint8Array($);let vt=0;for(let Lt=0;Lt<v.n;Lt++)v.id[Lt]===v.id[Lt]&&(j[vt]=v.id[Lt],N[vt]=R(Lt),ht[vt]=v.level[Lt],vt++);for(const Lt of o)if(!(!Lt.ch||Lt.unloaded))for(const X of n.locals(Lt.ch)){const gt=b(Lt,X);gt===null||T.has(gt)||(j[vt]=gt,N[vt]=ui,vt++)}return{t:s,version:r,count:vt,cell:vt===$?j:j.slice(0,vt),state:vt===$?N:N.slice(0,vt),level:vt===$?ht:ht.slice(0,vt)}}function Tt(){W(s);const O=new Float64Array(Y.size),$=new Uint8Array(Y.size),j=new Uint8Array(Y.size);let N=0;for(const[ht,vt]of Y){if(o[Math.floor(vt/Xs)].unloaded)continue;const Lt=T.get(ht);O[N]=ht,$[N]=B(ht,vt),j[N]=Lt===void 0?0:v.level[Lt],N++}return Y.clear(),{count:N,cell:N===O.length?O:O.slice(0,N),state:N===O.length?$:$.slice(0,N),level:N===O.length?j:j.slice(0,N)}}function ft(){const O=Z.size,$=new Float64Array(O),j=new Uint8Array(O);let N=0;for(const ht of Z.keys()){const vt=T.get(ht);$[N]=ht,j[N]=vt===void 0?0:v.level[vt],N++}return Z.clear(),{count:O,cell:$,level:j}}function _t(){const O=[];for(const $ of o){if(!$.ch||!$.ch.n)continue;const j=n.locals($.ch);!$.unloaded&&b($,j[0])!==null||O.push({key:$.key,count:j.length,locals:Int32Array.from(j)})}return O}function It(O){const $=k.get(O);if(!$||!$.poly)return new Float32Array(0);const j=new Float32Array($.poly.pts.length*2);return $.poly.pts.forEach(([N,ht],vt)=>{j[2*vt]=N,j[2*vt+1]=ht}),j}return{update:zt,invalidate:xt,remember:Ut,noteScanEvents:L,tick:W,visibility:nt,isExplored:K,canSee:yt,canShow:Ot,snapshot:G,drainChanges:Tt,vision:It,drainEvents:()=>{const O=H;return H=[],O},levelAt:U,drainLevels:ft,visibilityKey:Et,isExploredKey:dt,keyOfCell:St,unload:st,load:D,isLoaded:A,ghosts:_t,serialise:z,serialize:z,restore:q,get version(){return r},get time(){return s},get memory(){return{...n.stats(),active:S}},get stats(){return{...ut,tracked:S,viewers:k.size,explored:n.stats().cells}},config:e,UNSEEN:Cn,REMEMBERED:ui,VISIBLE:Yr}}const Ee=2,ie=512,li=.42,E_=.62,bu=32,T_=i=>i*i*(3-2*i),An=i=>(i%ie+ie)%ie;function A_({map:i,options:t={},stage:e=null}){const n={radius:t.radius??hn.sightRadius,up:hn.revealRate,down:(1-li)/hn.ghostFade,hold:1.8},s=w_(i,{moveEps:hn.revealStep,falloff:hn.sightSoft,...t,radius:n.radius}),r=V=>i.cell?i.cell(V):i.cells[V],o=new Float32Array(ie*ie),a=new Float32Array(ie*ie),l=new Float32Array(ie*ie),c=new Float32Array(ie*ie),u=new Uint8Array(ie*ie),d=new mh(u,ie,ie,lo,zn);d.magFilter=d.minFilter=yn,d.wrapS=d.wrapT=io,d.generateMipmaps=!1,d.needsUpdate=!0;let f=0,h=0,m=!1,x=!0;const g=[],p=new Map;let b=-1,M=0;const v={rasters:0,texelsRastered:0,easeTexels:0,slides:0,refilled:0,lastMs:0,maxUp:0,maxDown:0};function T(V,k,tt){const ut=V.length?Array.isArray(V[0])?V.length:V.length/2:0;if(ut<3)return;const rt=!Array.isArray(V[0]),At=new Float64Array(ut),Ct=new Float64Array(ut);let lt=1/0,wt=-1/0;for(let L=0;L<ut;L++)At[L]=(rt?V[2*L]:V[L][0])*Ee,Ct[L]=(rt?V[2*L+1]:V[L][1])*Ee,Ct[L]<lt&&(lt=Ct[L]),Ct[L]>wt&&(wt=Ct[L]);let zt=Math.floor(lt),xt=Math.ceil(wt);tt&&(zt=Math.max(zt,tt.z0),xt=Math.min(xt,tt.z1-1));const Ut=[];for(let L=zt;L<=xt;L++){const W=L+.5;Ut.length=0;for(let it=0,nt=ut-1;it<ut;nt=it++)Ct[it]>W!=Ct[nt]>W&&Ut.push(At[it]+(W-Ct[it])*(At[nt]-At[it])/(Ct[nt]-Ct[it]));Ut.sort((it,nt)=>it-nt);for(let it=0;it+1<Ut.length;it+=2){let nt=Math.ceil(Ut[it]-.5),K=Math.floor(Ut[it+1]-.5);tt&&(nt=Math.max(nt,tt.x0),K=Math.min(K,tt.x1-1));const U=An(L)*ie;for(let Et=nt;Et<=K;Et++)k(U+An(Et),(Et+.5)/Ee,W/Ee)}}}const _=(V,k=2)=>{let tt=1/0,ut=1/0,rt=-1/0,At=-1/0;for(let Ct=0;Ct<V.length;Ct+=2)V[Ct]<tt&&(tt=V[Ct]),V[Ct]>rt&&(rt=V[Ct]),V[Ct+1]<ut&&(ut=V[Ct+1]),V[Ct+1]>At&&(At=V[Ct+1]);return{x0:Math.floor(tt*Ee)-k,z0:Math.floor(ut*Ee)-k,x1:Math.ceil(rt*Ee)+k,z1:Math.ceil(At*Ee)+k}},S=(V,k)=>V?k?{x0:Math.min(V.x0,k.x0),z0:Math.min(V.z0,k.z0),x1:Math.max(V.x1,k.x1),z1:Math.max(V.z1,k.z1)}:V:k,E=V=>{g.push({...V,until:M+n.hold})};function w(V){for(let k=V.z0;k<V.z1;k++){const tt=An(k)*ie;for(let ut=V.x0;ut<V.x1;ut++){const rt=tt+An(ut);o[rt]=a[rt]=l[rt]=c[rt]=0,u[rt]=0}}}function y(V){const k=s.snapshot();let tt=0;for(let ut=0;ut<k.count;ut++){if(k.state[ut]===Cn)continue;const rt=r(k.cell[ut]);if(!rt)continue;const At=rt.poly;let Ct=1/0,lt=1/0,wt=-1/0,zt=-1/0;for(const xt of At)xt[0]<Ct&&(Ct=xt[0]),xt[0]>wt&&(wt=xt[0]),xt[1]<lt&&(lt=xt[1]),xt[1]>zt&&(zt=xt[1]);for(const xt of V)wt*Ee<xt.x0||Ct*Ee>xt.x1||zt*Ee<xt.z0||lt*Ee>xt.z1||(T(At,Ut=>{a[Ut]<li&&(a[Ut]=li,c[Ut]=li,u[Ut]=Math.round(li*255))},xt),tt++)}v.refilled+=tt}function R(V,k){const tt=Math.floor(V*Ee)-ie/2,ut=Math.floor(k*Ee)-ie/2;if(m&&Math.abs(tt-f)<bu&&Math.abs(ut-h)<bu)return!1;const rt=[];!m||Math.abs(tt-f)>=ie||Math.abs(ut-h)>=ie?rt.push({x0:tt,z0:ut,x1:tt+ie,z1:ut+ie}):(tt>f?rt.push({x0:f+ie,z0:ut,x1:tt+ie,z1:ut+ie}):tt<f&&rt.push({x0:tt,z0:ut,x1:f,z1:ut+ie}),ut>h?rt.push({x0:tt,z0:h+ie,x1:tt+ie,z1:ut+ie}):ut<h&&rt.push({x0:tt,z0:ut,x1:tt+ie,z1:h}));for(const At of rt)w(At);return f=tt,h=ut,m=!0,y(rt),v.slides++,d.needsUpdate=!0,!0}function F(V){const k=performance.now();let tt=null;for(const ut of V){const rt=s.vision(ut.id),At=rt.length?_(rt):null,Ct=p.get(ut.id)??null;tt=S(tt,S(At,Ct)),p.set(ut.id,At),ut.pts=rt}for(const ut of[...p.keys()])V.some(rt=>rt.id===ut)||(tt=S(tt,p.get(ut)),p.delete(ut));if(tt){for(let ut=tt.z0;ut<tt.z1;ut++){const rt=An(ut)*ie;for(let At=tt.x0;At<tt.x1;At++)o[rt+An(At)]=0}for(const ut of V){if(!ut.pts.length)continue;const rt=ut.radius??s.config.radius,At=Math.max(1e-6,s.config.falloff*rt);let Ct=0;T(ut.pts,(lt,wt,zt)=>{const xt=Math.hypot(wt-ut.x,zt-ut.z),Ut=T_(Math.min(1,Math.max(0,(rt-xt)/At)));Ut>o[lt]&&(o[lt]=Ut);const L=Ut<li?Ut:li;L>a[lt]&&(a[lt]=L),Ct++},tt),v.texelsRastered+=Ct}v.rasters++,E(tt),v.lastRaster=performance.now()-k}}function B(){const V=s.drainChanges();for(let k=0;k<V.count;k++){const tt=r(V.cell[k]);if(!tt)continue;const ut=V.state[k]===ui&&!s.isExplored(V.cell[k]),rt=V.state[k]===Cn;if(!ut&&!rt)continue;const At=ut?E_:0;let Ct=1/0,lt=1/0,wt=-1/0,zt=-1/0;for(const xt of tt.poly)xt[0]<Ct&&(Ct=xt[0]),xt[0]>wt&&(wt=xt[0]),xt[1]<lt&&(lt=xt[1]),xt[1]>zt&&(zt=xt[1]);T(tt.poly,xt=>{l[xt]=At}),E({x0:Math.floor(Ct*Ee)-1,z0:Math.floor(lt*Ee)-1,x1:Math.ceil(wt*Ee)+1,z1:Math.ceil(zt*Ee)+1})}}function Y(V){let k=null;for(let lt=g.length-1;lt>=0;lt--)g[lt].until<M?g.splice(lt,1):k=S(k,g[lt]);if(!k)return;const tt=n.up*V,ut=n.down*V;let rt=0,At=0,Ct=0;for(let lt=k.z0;lt<k.z1;lt++){const wt=An(lt)*ie;for(let zt=k.x0;zt<k.x1;zt++){const xt=wt+An(zt);let Ut=o[xt];a[xt]>Ut&&(Ut=a[xt]),l[xt]>Ut&&(Ut=l[xt]);const L=c[xt];if(Ut===L)continue;const W=Ut>L?Math.min(Ut,L+tt):Math.max(Ut,L-ut);c[xt]=W;const it=Math.round(W*255);it!==u[xt]&&(u[xt]=it,rt++),W>L?W-L>At&&(At=W-L):L-W>Ct&&(Ct=L-W)}}v.easeTexels=(k.x1-k.x0)*(k.z1-k.z0),v.maxUp=At,v.maxDown=Ct,rt&&(d.needsUpdate=!0)}const Z={fog:s,mask:d,stats:v,get enabled(){return x},setEnabled(V){x=!!V,H==null||H.setEnabled(x)},configure(V={}){let k=!1;return V.sightRadius!==void 0&&V.sightRadius!==n.radius&&(n.radius=V.sightRadius,s.config.radius=V.sightRadius,k=!0),V.sightSoft!==void 0&&V.sightSoft!==s.config.falloff&&(s.config.falloff=V.sightSoft,k=!0),k&&s.invalidate(),V.revealStep!==void 0&&(s.config.moveEps=V.revealStep),V.revealRate!==void 0&&(n.up=V.revealRate),V.ghostFade!==void 0&&(n.down=(1-li)/Math.max(.05,V.ghostFade),n.hold=Math.max(1.8,V.ghostFade*1.4+.5)),{...n}},get tuning(){return{...n,falloff:s.config.falloff,moveEps:s.config.moveEps}},update(V,k,tt=1/60){const ut=performance.now();if(M+=tt,v.maxUp=v.maxDown=0,!V.length)return;const rt=R(V[0].x,V[0].z);s.update(V,k),(rt||s.version!==b)&&(F(V.map(At=>({...At}))),b=s.version),B(),Y(tt),H==null||H.setWindow(f,h),v.lastMs=performance.now()-ut,v.sightMs=s.stats.lastMs},settle(){for(let V=0;V<c.length;V++){const k=Math.max(o[V],a[V],l[V]);c[V]=k,u[V]=Math.round(k*255)}g.length=0,d.needsUpdate=!0},noteScan(V){return V.length?s.noteScanEvents(V):0},level(V,k){const tt=Math.floor(V*Ee),ut=Math.floor(k*Ee);return tt<f||tt>=f+ie||ut<h||ut>=h+ie?0:c[An(ut)*ie+An(tt)]},shows(V,k,tt="dynamic"){const ut=Z.level(V,k);return tt==="dynamic"?ut>.5:ut>.05},canShow:(V,k,tt="dynamic")=>s.canShow(V,k,tt),knows(V,k){return Z.level(V,k)>.05||s.canShow(V,k,"static")},dispose(){d.dispose()}};let H=null;return e!=null&&e.fogPass&&(H=e.fogPass,H.setMask(d)),Z}const wu={ping:{start:.4,build:1.6,hold:1,burn:2.2},sweep:{start:.3,build:5,hold:3,burn:5},echo:{start:.7,build:.5,hold:0,burn:2.6}},Eu={ping:{speed:14,power:1,env:"ping"},sweep:{speed:9,power:1,env:"sweep"}},Ci={active:{power:1,clarity:1,loudness:1,glimpseRadius:0},passive:{power:.45,clarity:.6,loudness:.2,glimpseRadius:2}},Tu={default:300,device:150,adversary:355,decoy:45,unknown:300},ol={echo:{reveal:"on-arrival",playback:1,traceFloor:.05,scrambleJitter:1.2},floor:.03,hearFloor:.04,maxCells:2500,maxEchoes:16,maxGeneration:2,maxTime:1/0,maxWorkPerAdvance:2e4,echoKeep:64,lookahead:0,maxEvents:4e3,maskMaxCells:400,scrambleHops:3,ringRise:.5,ringTau:2.2},Uh=i=>i<=0?0:i>=1?1:i*i*(3-2*i);function Ys(i,t){return t<0?0:t<i.build?i.start+(1-i.start)*Uh(t/i.build):t<i.build+i.hold?1:Math.exp(-(t-i.build-i.hold)/i.burn)}function R_(i,t,e){return t>e?i.build+i.hold+i.burn*Math.log(t/e):t*i.start>=e?i.build:0}function aa(i,t,e=ol){if(t<0)return 0;const n=e.ringRise>0?Uh(t/e.ringRise):1;return i*n*Math.exp(-Math.max(0,t-e.ringRise)/e.ringTau)}function os(i,t){return i==="absorb"?Math.pow(t,1.4):i==="scramble"?.5*t:.3*t}function ss(i,...t){let e=2166136261^i>>>0;const n=t.join("|");for(let s=0;s<n.length;s++)e^=n.charCodeAt(s),e=Math.imul(e,16777619);return e^=e>>>15,e=Math.imul(e,739982445),e^=e>>>12,e=Math.imul(e,695872825),e^=e>>>15,(e>>>0)/4294967296}const rs=(i,t,e)=>i<t?t:i>e?e:i,Au=Object.freeze({transmission:1,scramble:null,spoofs:[],masks:[]});function C_({nav:i,getCell:t,cfg:e,now:n}){const s=new Map,r=new Map;let o=0;function a(h,m){if(m<h.createdAt||m>=h.expiresAt)return 0;const x=h.expiresAt-m;return x>=h.fade?h.opacity:h.opacity*(x/h.fade)}function l(h){if(h==null)return null;if(typeof h=="object"){const x=i.cellAt(h.x,h.z);return x?{id:x.id,x:h.x,z:h.z}:null}const m=t(h);return m?{id:m.id,x:m.cx,z:m.cz}:null}function c(h){const m=l(h.center);if(!m)return[];const x=h.radius??12,g=h.shape??"disc",p=h.heading??0,b=(h.arc??Math.PI/2)/2,M=S=>{const E=S.cx-m.x,w=S.cz-m.z,y=Math.hypot(E,w);if(y>x)return!1;if(g==="ring")return y>=x*.55;if(g==="cone"){if(y<1e-9)return!0;let R=Math.atan2(w,E)-p;return R=Math.atan2(Math.sin(R),Math.cos(R)),Math.abs(R)<=b}return!0},v=[],T=new Set([m.id]),_=[m.id];for(let S=0;S<_.length;S++){const E=t(_[S]);if(!(!E||E.solid)){if(M(E)&&v.push(E.id),v.length>=e.maskMaxCells)break;for(const w of E.neighbors){if(T.has(w.id))continue;const y=t(w.id);!y||y.solid||Math.hypot(y.cx-m.x,y.cz-m.z)>x+6||(T.add(w.id),_.push(w.id))}}}return v}function u(h={},m=n()){var _,S,E,w,y;const x=h.mode??"absorb";if(!["absorb","scramble","spoof"].includes(x))throw new Error(`unknown mask mode ${x}`);const g=h.cells?[...h.cells]:c(h),p=[];for(const R of g){const F=t(R);F&&!F.solid&&p.push(F.id)}if(!p.length)return null;let b=p[0];const M=h.center!=null?l(h.center):null;if(M){let R=1/0;for(const F of p){const B=t(F),Y=Math.hypot(B.cx-M.x,B.cz-M.z);Y<R&&(R=Y,b=F)}}const v=h.duration??8,T={id:`mask-${++o}`,mode:x,opacity:Math.min(1,Math.max(0,h.opacity??.8)),createdAt:m,expiresAt:m+v,duration:v,fade:Math.min(v,h.fade??Math.min(1.5,v*.25)),shape:h.shape??(h.cells?"cells":"disc"),center:M?{x:M.x,z:M.z}:null,radius:h.radius??null,cells:new Set(p),anchor:b,owner:h.owner??null,spoof:x==="spoof"?{id:((_=h.spoof)==null?void 0:_.id)??`spoof-${o}`,kind:((S=h.spoof)==null?void 0:S.kind)??"device",signature:((E=h.spoof)==null?void 0:E.signature)??.8,strengthResponse:((w=h.spoof)==null?void 0:w.strengthResponse)??1,cell:((y=h.spoof)==null?void 0:y.cell)??b}:null};s.set(T.id,T);for(const R of T.cells){const F=r.get(R);F?F.push(T):r.set(R,[T])}return T}function d(h){s.delete(h.id);for(const m of h.cells){const x=r.get(m);if(!x)continue;const g=x.indexOf(h);g>=0&&x.splice(g,1),x.length||r.delete(m)}}function f(h,m){const x=r.get(h);if(!x)return Au;let g=1,p=null,b=0,M=null,v=null;for(const T of x){const _=a(T,m);_<=0||((v??(v=[])).push(T),T.mode==="absorb"?g*=1-_:T.mode==="scramble"?(g*=1-.1*_,_>b&&(b=_,p=T)):(M??(M=[])).push(T))}return v?{transmission:g,scramble:p,scrambleOpacity:b,spoofs:M??[],masks:v}:Au}return{create:u,remove:d,effects:f,opacityAt:a,get:h=>s.get(h)??null,all:()=>[...s.values()],isMasked:(h,m=n())=>f(h,m).masks.length>0,tell:(h,m=n())=>os(h.mode,a(h,m))}}const as=(i,t)=>typeof i=="number"&&typeof t=="number"?i-t:String(i)<String(t)?-1:String(i)>String(t)?1:0,P_=(i,t)=>i.t-t.t||i.k-t.k||i.w-t.w||as(i.c,t.c)||t.m-i.m||i.seq-t.seq,Ru=Object.freeze({transmission:1,scramble:null,scrambleOpacity:0,spoofs:[],masks:[]});function L_(i,t={}){const e={...ol,...t,echo:{...ol.echo,...t.echo??{}}};e.echo.reveal!=="on-arrival"&&e.echo.reveal!=="live"&&(e.echo.reveal="on-arrival");const n=t.seed??1,s=t.sources??(()=>null);let r=0,o=0;const a=new Map,l=C=>{let z=a.get(C);return z===void 0&&(z=tr(i,C),a.set(C,z)),z},c={cells:0,pops:0,pushes:0,sourceCalls:0,echoes:0,heard:0,navCells:0,droppedEvents:0,notices:0},u=new zh(P_),d=[],f=[],h=new Map;let m=[],x=0,g=0;const p=new Map,b=[],M=[];let v=0,T=1024;const _={n:0,version:0,cell:new Float64Array(T),arrival:new Float64Array(T),strength:new Float32Array(T),gen:new Uint8Array(T),wave:new Int32Array(T),speed:new Float32Array(T),flags:new Uint8Array(T)},S=new Map;function E(){T*=2;for(const[C,z]of[["cell",Float64Array],["arrival",Float64Array],["strength",Float32Array],["gen",Uint8Array],["wave",Int32Array],["speed",Float32Array],["flags",Uint8Array]]){const q=new z(T);q.set(_[C]),_[C]=q}}function w(C,z,q,G,Tt,ft){_.n===T&&E();const _t=_.n++;_.cell[_t]=typeof z=="number"?z:NaN,_.arrival[_t]=q,_.strength[_t]=G,_.gen[_t]=C.gen,_.wave[_t]=C.id,_.speed[_t]=C.speed,_.flags[_t]=(Tt?1:0)|(ft?2:0);const It=S.get(z);return It?It.push(_t):S.set(z,[_t]),_.version++,_t}const y=(C=3)=>e.ringRise+e.ringTau*Math.log(Math.max(1.0001,C/.01)),R=C_({nav:i,getCell:l,cfg:e,now:()=>r});function F(C,z,q=!1){if(m.push(q?{type:C,...z,hidden:!0}:{type:C,...z}),m.length>e.maxEvents){const G=[];let Tt=m.length-Math.floor(e.maxEvents*.75);for(const ft of m)Tt>0&&ft.type==="cell-reached"?(Tt--,c.droppedEvents++):G.push(ft);m=G}}function B(C,z){const q=z.env,G={id:d.length+1,pingId:C.id,gen:z.gen,parent:z.parent??null,origin:z.origin,t0:z.t0,power:z.power,env:q,speed:C.speed,sourceId:z.sourceId??`ping:${C.id}`,claim:z.claim??null,life:R_(q,z.power,e.floor),settled:new Map,best:new Map,touched:new Set,heardBy:new Set,pending:0,cells:0,burned:!1,cut:null,done:!1,cancelled:!1,wanted:null};if(z.gen>0){G.wanted=new Set(["origin"]);for(const Tt of h.values())for(const ft of Tt)G.wanted.add(ft.id);b.push(G)}return d.push(G),x++,Y(G,z.t0,z.origin,1,!0),G}function Y(C,z,q,G,Tt){u.push({t:z,k:1,w:C.id,c:q,m:G,o:Tt,seq:++o}),C.pending++,c.pushes++}function Z(C,z){if(C.done)return;C.done=!0;const q=p.get(C.id);q&&(q.endT=z),x--,F("wave-exhausted",{t:z,waveId:C.id,pingId:C.pingId,generation:C.gen,sourceId:C.sourceId,cells:C.cells,reason:C.cut??(C.burned?"burnout":"frontier-empty")},C.gen>0)}function H(C,z,q){const G=[];let Tt=C;for(let ft=0;ft<z;ft++){const _t=l(Tt),It=[];for(const Mt of _t.neighbors){if(Mt.gate!==void 0&&oa(i,Mt.gate))continue;const O=l(Mt.id);O&&!O.solid&&It.push(Mt.id)}if(!It.length)break;It.sort(as),Tt=It[Math.floor(ss(n,"walk",q,ft)*It.length)],G.push(Tt)}return G}function V(C,z,q,G,Tt,ft,_t,It,Mt=1){const O=rs(G.signature??.7,0,1),$=rs(G.strengthResponse??1,0,3),j=Tt*$*O*_t.transmission;if(z.echoed.has(G.id))return;let N=null;z.echoes>=e.maxEchoes?N="echo-cap":z.cells>=e.maxCells?N="budget-cells":j<e.floor&&(N=_t.transmission<.5?"masked":"too-faint");const ht={t:ft,waveId:C.id,pingId:z.id,cell:q,id:G.id,kind:G.kind??"unknown",strength:Tt,echoStrength:N?0:j,echo:!N,reason:N,spoofed:!!It};if(F("identifier-hit",ht,!0),N)return;z.echoed.add(G.id),z.echoes++,c.echoes++;let vt=q,Lt=O,X=1,gt=!1,ct=null;if(_t.scramble&&!It){const Pt=_t.scrambleOpacity,Rt=`${C.id}:${G.id}:${_t.scramble.id}`,Bt=rs(1+Math.round(Pt*(e.scrambleHops-1)*(.4+.6*ss(n,"hops",Rt))),1,e.scrambleHops);ct=H(q,Bt,Rt),(!ct.length||ct[ct.length-1]===q)&&(ct=H(q,1,`${Rt}:b`)),vt=ct.length?ct[ct.length-1]:q,Lt=rs(O+(ss(n,"sig",C.id,G.id)-.5)*1.6*Pt,0,1),X=rs(1-.9*Pt,0,1),gt=!0}let P=Mt<1?os("absorb",1-Mt):0;for(const Pt of _t.masks)P=Math.max(P,os(Pt.mode,R.opacityAt(Pt,ft)));It&&(P=Math.max(P,os("spoof",.8)));const J=G.kind??"unknown",et={echoId:++g,id:G.id,kind:J,hue:G.hue??Tu[J]??Tu.default,signature:Lt,quality:X,garbled:gt,spoofed:!!It,reorder:gt?1-X:0,trueCell:q,trueSignature:O,level:P},bt=B(z,{gen:C.gen+1,parent:C.id,origin:vt,t0:ft,power:j,env:wu.echo,sourceId:G.id,claim:et}),Dt={sourceId:et.id,kind:et.kind,cell:vt,emitTime:ft,pingId:z.id,returnTime:null,endT:null,wave:bt,claim:et,e0:j,truth:{cell:q,garbled:et.garbled,spoofed:et.spoofed}};p.set(bt.id,Dt),F("echo-started",{t:ft,waveId:bt.id,parent:C.id,pingId:z.id,generation:bt.gen,id:G.id,kind:et.kind,cell:vt,trueCell:q,strength:j,garbled:gt,spoofed:!!It},!0)}const k=C=>C<=0?0:C>=1?1:C*C*(3-2*C);function tt(C,z,q,G,Tt){const ft=C.speed,_t=e.echo.playback,It=(q.t-C.t0)*ft,Mt=Math.max(q.carry,1e-9),O=[];let $=!1;for(const[vt,Lt]of C.settled){if(Lt.dead||Lt.t>q.t+1e-9)continue;const X=G*Math.min(1,Mt/Math.max(Lt.carry,1e-9));if(X<e.echo.traceFloor&&Lt!==q){$=!0;continue}O.push({id:vt,dist:(Lt.t-C.t0)*ft,q:Math.min(1.5,X)})}O.sort((vt,Lt)=>Lt.dist-vt.dist||as(vt.id,Lt.id));const j=O.length,N={hue:z.hue,kind:z.kind,sourceId:z.id,clarity:G,speed:ft,rate:_t,R:It,latchTime:Tt,count:j,cut:$,sourceCell:C.origin,cell:new Float64Array(j),dist:new Float32Array(j),arrival:new Float64Array(j),strength:new Float32Array(j),endTime:Tt},ht=z.reorder*e.echo.scrambleJitter;for(let vt=0;vt<j;vt++){const Lt=O[vt];N.cell[vt]=Lt.id,N.dist[vt]=Lt.dist,N.strength[vt]=Lt.q,N.arrival[vt]=Tt+(It-Lt.dist)/(ft*_t)}if(ht>0&&j>2){const vt=N.arrival[j-1];for(let J=0;J<j;J++){const et=(ss(n,"jit",z.echoId,N.cell[J])-.5)*2*ht;N.arrival[J]=Math.min(vt,Math.max(Tt,N.arrival[J]+et))}const Lt=Array.from({length:j},(J,et)=>et).sort((J,et)=>N.arrival[J]-N.arrival[et]||J-et),X=new Float64Array(j),gt=new Float32Array(j),ct=new Float64Array(j),P=new Float32Array(j);Lt.forEach((J,et)=>{X[et]=N.cell[J],gt[et]=N.dist[J],ct[et]=N.arrival[J],P[et]=N.strength[J]}),Object.assign(N,{cell:X,dist:gt,arrival:ct,strength:P})}return N.endTime=j?N.arrival[j-1]:Tt,N}function ut(C,z){const q=[];for(const[ft,_t]of C.settled)!_t.dead&&_t.t<=z&&q.push({id:ft,t:_t.t,s:_t.strength});q.sort((ft,_t)=>ft.t-_t.t||as(ft.id,_t.id));const G=q.length,Tt={speed:C.speed,emitTime:C.t0,count:G,cell:new Float64Array(G),arrival:new Float64Array(G),strength:new Float32Array(G)};return q.forEach((ft,_t)=>{Tt.cell[_t]=ft.id,Tt.arrival[_t]=ft.t,Tt.strength[_t]=ft.s}),Tt}function rt(C,z){const q=C.claim,G=f[C.pingId-1],Tt=Ci[G.mode]??Ci.active,ft=q.quality*Tt.clarity*k(C.e0/.3);return{echoId:q.echoId,latched:!1,listener:"origin",pingId:G.id,sourceId:q.id,kind:q.kind,hue:q.hue,signature:q.signature,cell:C.cell,pingT0:G.t0,emitTime:C.emitTime,returnTime:null,delay:null,estDistance:null,strength:C.e0,clarity:ft,mode:G.mode,glimpse:{cell:C.cell,radius:Math.round((1-ft)*3)+Tt.glimpseRadius,stale:0},replay:null,forward:ut(C.wave,z),tell:{suspicious:!1}}}function At(C,z,q,G,Tt,ft){const _t=q.id;if(C.heardBy.has(_t))return;C.heardBy.add(_t),c.heard++;const It=C.claim,Mt=Ci[z.mode]??Ci.active,O=ft-z.t0,$=It.quality*Mt.clarity*k(Tt/.3),j=q.id==="origin"?It.echoId:`${It.echoId}:${q.id}`,N=C.settled.get(G),ht=tt(C,It,N,$,ft);let vt=It.level,Lt=N,X=0;for(;Lt&&Lt.parent!=null&&X++<200;){const bt=R.effects(Lt.parent,ft);for(const Dt of bt.masks)vt=Math.max(vt,os(Dt.mode,R.opacityAt(Dt,ft)));Lt=C.settled.get(Lt.parent)}const gt={echoId:j,latched:!0,listener:q.id,listenerCell:G,pingId:z.id,sourceId:It.id,kind:It.kind,hue:It.hue,signature:It.signature,cell:C.origin,pingT0:z.t0,emitTime:C.t0,returnTime:ft,delay:O,estDistance:O*z.speed/2,strength:Tt,clarity:$,mode:z.mode,glimpse:{cell:C.origin,radius:Math.round((1-$)*3)+Mt.glimpseRadius,stale:ft-C.t0},replay:ht,field:ht,R:ht.R,speed:ht.speed,latchTime:ft,tell:{suspicious:ss(n,"tell",j)<vt},truth:{cell:It.trueCell,signature:It.trueSignature,garbled:It.garbled,spoofed:It.spoofed,quality:It.quality,tellLevel:vt}};M.push(gt);const ct=p.get(C.id);ct&&(ct.returnTime=ft);const{truth:P,replay:J,...et}=gt;F("echo-heard",{t:ft,waveId:C.id,generation:C.gen,...et,replay:ht,id:It.id,truth:P}),C.wanted.delete(_t),C.wanted.size===0&&!C.done&&(C.cancelled=!0,C.cut="heard",Z(C,ft))}function Ct(C,z){const q=f[C.pingId-1],G=z.t,Tt=l(z.c);if(!Tt||Tt.solid)return;const ft=G-C.t0;if(ft>C.life){C.burned=!0;return}if(ft>e.maxTime){C.cut??(C.cut="budget-time");return}const _t=C.settled.get(z.c);if(_t&&!_t.dead)return;const It=z.o?Ru:R.effects(z.c,G),Mt=z.m*It.transmission,O=C.power*Ys(C.env,ft)*Mt,$=O>=e.floor||ft<C.env.build+C.env.hold&&C.power*Mt>=e.floor;let j=_t;if(j){if(!$){j.up=!1;return}j.slot>=0&&(_.flags[j.slot]|=4,_.strength[j.slot]=0),j.dead=!1,j.t=G,j.strength=O,j.carry=Mt,j.parent=z.p??j.parent,C.gen===0&&(j.slot=w(C,z.c,G,O,!1,It.masks.length>0))}else{if(q.cells>=e.maxCells){C.cut??(C.cut="budget-cells");return}q.cells++,c.cells++,C.cells++,j={t:G,strength:O,carry:Mt,dead:!$,up:!1,parent:z.p??null,slot:C.gen===0?w(C,z.c,G,O,!$,It.masks.length>0):-1},C.settled.set(z.c,j)}F("cell-reached",{t:G,waveId:C.id,cell:z.c,strength:O,generation:C.gen,dead:!$,masked:It.masks.length>0},C.gen>0);for(const N of It.masks){if(C.touched.has(N.id)||(C.touched.add(N.id),N.owner!=null&&N.owner===q.owner))continue;const ht=os(N.mode,R.opacityAt(N,G)),vt=ht*rs(.5+z.m*C.power*Ys(C.env,ft),0,1);ss(n,"notice",C.id,N.id)<vt&&(c.notices++,F("mask-noticed",{t:G,maskId:N.id,mode:N.mode,cell:z.c,waveId:C.id,pingId:q.id,detectability:ht,by:q.owner},C.gen>0))}if($){if(C.claim&&C.gen>=1&&O>=e.hearFloor){z.c===q.hearer.cell&&At(C,q,q.hearer,z.c,O,G);const N=h.get(z.c);if(N)for(const ht of N)At(C,q,ht,z.c,O,G)}if(C.gen<e.maxGeneration){const N=s(z.c);if(c.sourceCalls++,N)for(const ht of N)V(C,q,z.c,ht,O,G,It,!1,Mt);for(const ht of It.spoofs)ht.spoof.cell!==z.c||q.spoofed.has(ht.id)||(q.spoofed.add(ht.id),V(C,q,z.c,ht.spoof,O,G,Ru,!0,Mt))}for(const N of Tt.neighbors){if(N.gate!==void 0&&oa(i,N.gate))continue;const ht=l(N.id);if(!ht||ht.solid)continue;const vt=C.settled.get(N.id);if(vt&&!vt.dead)continue;const Lt=G+Math.hypot(Tt.cx-ht.cx,Tt.cz-ht.cz)/C.speed,X=Lt-C.t0;if(X>C.life){C.burned=!0;continue}if(X>e.maxTime){C.cut??(C.cut="budget-time");continue}if(vt){if(vt.up)continue;vt.up=!0}else{const gt=C.best.get(N.id);if(gt!==void 0&&gt<=Lt)continue;C.best.set(N.id,Lt)}u.push({t:Lt,k:1,w:C.id,c:N.id,m:Mt,o:!1,p:z.c,seq:++o}),C.pending++,c.pushes++}}}function lt(C){if(c.pops++,C.k===0){R.remove(C.mask),F("mask-expired",{t:C.t,maskId:C.mask.id});return}const z=d[C.w-1];z.pending--,!z.cancelled&&(Ct(z,C),z.pending===0&&Z(z,C.t))}function wt(C,{budgetMs:z=0}={}){const q=r+Math.max(0,C),G=q+e.lookahead,Tt=z>0?performance.now():0;let ft=0,_t=!1;for(;u.size&&u.peek().t<=G;){if(ft>=e.maxWorkPerAdvance){_t=!0;break}if(z>0&&(ft&63)===63&&performance.now()-Tt>=z){_t=!0;break}const It=u.pop();ft++,v=Math.max(v,It.t),lt(It)}return r=_t?Math.max(r,Math.min(q,v)):q,zt(),_t||(v=Math.max(v,G)),{t:r,work:ft,behind:_t,active:x,solvedUntil:v}}function zt(){for(const[C,z]of p)z.endT!=null&&z.endT<=r&&p.delete(C)}function xt(C,z={}){var O;let q=C;C&&typeof C=="object"&&(q=(O=i.cellAt(C.x,C.z))==null?void 0:O.id);const G=q==null?null:l(q);if(!G||G.solid)return null;const Tt=z.kind??"ping",ft=Eu[Tt]??Eu.ping,_t=Ci[z.mode]?z.mode:"active",It={id:f.length+1,kind:Tt,mode:_t,origin:G.id,t0:r,owner:z.owner??null,speed:z.speed??ft.speed,echoed:new Set,spoofed:new Set,cells:0,echoes:0,hearer:{id:"origin",cell:G.id}};f.push(It);const Mt=B(It,{gen:0,origin:G.id,t0:r,power:(z.power??ft.power)*Ci[_t].power,env:wu[ft.env]});return F("wave-started",{t:r,waveId:Mt.id,pingId:It.id,kind:Tt,mode:_t,loudness:Ci[_t].loudness,cell:G.id,speed:It.speed,power:Mt.power,lifespan:Mt.life,owner:It.owner}),It.id}const Ut=C=>{var G;let z=C;C&&typeof C=="object"&&(z=(G=i.cellAt(C.x,C.z))==null?void 0:G.id);const q=z==null?null:l(z);return q&&!q.solid?q.id:null};function L(C,z){for(const q of b){if(z!=null&&q.pingId!==z||q.heardBy.has(C.id)||!q.wanted.has(C.id))continue;const G=q.settled.get(C.cell);!G||G.dead||G.t>r||G.strength<e.hearFloor||At(q,f[q.pingId-1],C,C.cell,G.strength,r)}}function W(C,z=null){const q=Ut(C);if(q==null)return!1;for(const G of f)z!=null&&G.id!==z||G.hearer.cell===q||(G.hearer.cell=q,L(G.hearer,G.id));return!0}function it(C,z){const q=Ut(z);if(q==null)return!1;let G=null;for(const Tt of h.values())for(const ft of Tt)ft.id===C&&(G=ft);return!G||G.cell===q?!!G:(U(C),G.cell=q,K(G),L(G,null),!0)}function nt(C){const z=R.create(C,r);return z?(Number.isFinite(z.expiresAt)&&u.push({t:z.expiresAt,k:0,w:0,c:z.id,m:0,o:!1,mask:z,seq:++o}),F("mask-created",{t:r,maskId:z.id,mode:z.mode,opacity:z.opacity,cells:z.cells.size,duration:z.duration,detectability:R.tell(z),anchor:z.anchor,owner:z.owner}),z):null}function K(C){const z=h.get(C.cell);z?z.push(C):h.set(C.cell,[C])}function U(C){for(const[z,q]of h){const G=q.filter(Tt=>Tt.id!==C);G.length?h.set(z,G):h.delete(z)}}(t.listeners??[]).forEach(K);function Et({maxSeconds:C=120,step:z=.5}={}){let q=0;for(;x>0&&q<C;)wt(z),q+=z;return r}function dt({minMagnitude:C=0,debug:z=!1}={}){c.navCells=a.size;const q=new Map;for(const N of d)if(!(N.gen>0&&!z))for(const[ht,vt]of N.settled){const Lt=r-vt.t;if(Lt<0)continue;const X=aa(vt.strength,Lt,e),gt=q.get(ht);gt&&(gt.waves++,X<gt.magnitude||X===gt.magnitude&&N.gen>=gt.generation)||q.set(ht,{id:ht,arrival:vt.t,strength:vt.strength,magnitude:X,age:Lt,generation:N.gen,sourceId:N.sourceId,waveId:N.id,pingId:N.pingId,dist:(vt.t-N.t0)*N.speed,dead:vt.dead,masked:!1,waves:gt?gt.waves:1})}const G=[];for(const N of q.values())N.magnitude<C||(N.masked=R.isMasked(N.id,r),G.push(N));G.sort((N,ht)=>as(N.id,ht.id));const Tt=new Map;for(const N of u.a){if(N.k!==1)continue;const ht=Tt.get(N.w);ht?ht.add(N.c):Tt.set(N.w,new Set([N.c]))}const ft=[],_t=[];for(const N of d){if(N.gen>0&&!z)continue;const ht=r-N.t0,vt={waveId:N.id,pingId:N.pingId,generation:N.gen,sourceId:N.sourceId,origin:N.origin,t0:N.t0,age:ht,radius:ht*N.speed,strength:N.power*Ys(N.env,ht),power:N.power,cells:N.cells,done:N.done,reason:N.done?N.cut??(N.burned?"burnout":"frontier-empty"):null};_t.push(vt),N.done||ft.push({...vt,frontier:[...Tt.get(N.id)??[]].sort(as)})}const It=e.echo.reveal==="live",Mt=[];for(const N of M){if(N.returnTime>r)continue;const ht={...N,age:r-N.returnTime};z||delete ht.truth,Mt.push(ht)}if(It)for(const N of p.values())N.emitTime>r||N.returnTime!=null&&N.returnTime<=r||Mt.push({...rt(N,r),age:r-N.emitTime,...z?{truth:N.truth}:{}});const O=Mt.slice(-e.echoKeep),$={...c};z||(delete $.echoes,delete $.heard);const j={t:r,outgoing:{cells:G,fronts:ft},echoes:O,cells:G,fronts:ft,waves:_t,masks:R.all().map(N=>({id:N.id,mode:N.mode,opacity:R.opacityAt(N,r),baseOpacity:N.opacity,remaining:Math.max(0,N.expiresAt-r),cells:[...N.cells],anchor:N.anchor,detectability:R.tell(N,r),owner:N.owner,shape:N.shape})),stats:$};return z&&(j.hiddenEchoes=[...p.values()].filter(N=>N.returnTime==null||N.returnTime>r)),j}function St({all:C=!1}={}){const z=[],q=[];for(const G of m)if(G.t>r)q.push(G);else if(C)z.push(G);else if(!G.hidden)if(G.truth){const{truth:Tt,...ft}=G;z.push(ft)}else z.push(G);return m=q,z}function yt(){const C=_.n;return{count:C,version:_.version,cell:_.cell.subarray(0,C),arrival:_.arrival.subarray(0,C),strength:_.strength.subarray(0,C),generation:_.gen.subarray(0,C),wave:_.wave.subarray(0,C),speed:_.speed.subarray(0,C),flags:_.flags.subarray(0,C)}}const Ot=C=>{let z=0,q=_.n;for(;z<q;){const G=z+q>>1;_.arrival[G]<C?z=G+1:q=G}return z};function st(C,z=.5,q=3){const G=e.lookahead;return[Ot(C-y(q)-G),Ot(C+z+1e-9)]}function D(C,z,q=.5){const[G,Tt]=st(z,q);for(let ft=G;ft<Tt;ft++)C[ft]=_.flags[ft]&5?0:aa(_.strength[ft],z-_.arrival[ft],e);return[G,Tt]}function A(C,z,q){const G=i.cellAt(C,z);if(!G||G.solid)return{intensity:0,cell:G?G.id:null,arrival:1/0};const Tt=l(G.id),ft=[Tt.id];for(const O of Tt.neighbors){if(O.gate!==void 0&&oa(i,O.gate))continue;const $=l(O.id);$&&!$.solid&&ft.push(O.id)}const _t=new Map;for(const O of ft){const $=S.get(O);if(!$)continue;const j=l(O),N=Math.hypot(C-j.cx,z-j.cz);for(const ht of $){if(_.flags[ht]&5)continue;const vt=_.arrival[ht]+N/_.speed[ht],Lt=_t.get(_.wave[ht]);(!Lt||vt<Lt.a)&&_t.set(_.wave[ht],{a:vt,i:ht})}}let It=0,Mt=1/0;for(const[O,{a:$,i:j}]of _t){$<Mt&&(Mt=$);const N=d[O-1],ht=aa(_.strength[j]*(Ys(N.env,$-N.t0)/Ys(N.env,_.arrival[j]-N.t0)),q-$,e);ht>It&&(It=ht)}return{intensity:It,cell:Tt.id,arrival:Mt}}return{advance:wt,runUntilIdle:Et,ping:xt,createMask:nt,removeMask:C=>{const z=R.get(C);z&&(R.remove(z),F("mask-expired",{t:r,maskId:C}))},isMasked:C=>R.isMasked(C,r),maskAt:C=>R.effects(C,r).masks.map(q=>({id:q.id,mode:q.mode,opacity:R.opacityAt(q,r)})),maskTell:C=>{const z=R.get(C);return z?R.tell(z,r):0},addListener:K,removeListener:U,moveOrigin:W,moveListener:it,snapshot:dt,drainEvents:St,field:yt,activeRange:st,intensityRange:D,sampleAt:A,get solvedUntil(){return v},get time(){return r},get active(){return x},get stats(){return c.navCells=a.size,{...c}},config:e}}const la=(i,t)=>Math.round(i*1e3)*2e8+Math.round(t*1e3);function D_(i){const t=new Map,e=new Map;function n(r,o,a){const l=new Map([[o,r]]);for(const u of r.neighbors){const d=i(u.id);d&&l.set(u.id,d)}if(a){const u=[...l.values()];for(const d of u)for(const f of d.neighbors){if(l.has(f.id))continue;const h=i(f.id);h&&l.set(f.id,h)}}const c=new Map;for(const[u,d]of l)for(const f of d.poly){const h=la(f[0],f[1]),m=c.get(h);m?m.includes(u)||m.push(u):c.set(h,[u])}return{near:l,at:c}}function s(r){const o=i(r);if(!o)return[];let{near:a,at:l}=n(o,r,!1);o.poly.some(u=>(l.get(la(u[0],u[1]))??[]).length<3)&&({near:a,at:l}=n(o,r,!0));const c=[];for(const u of o.poly){const d=l.get(la(u[0],u[1]));if(!d||d.length<3)continue;const f=d.length===3?d:d.map(h=>{const m=a.get(h);return{cid:h,a:Math.atan2(m.cz-u[1],m.cx-u[0])}}).sort((h,m)=>h.a-m.a).map(h=>h.cid);for(let h=1;h+1<f.length;h++){const m=[f[0],f[h],f[h+1]].sort((p,b)=>p-b),x=m.join("|");let g=t.get(x);g||t.set(x,g={ids:m,key:x}),c.includes(g)||c.push(g)}}return c}return{of(r){let o=e.get(r);return o||(o=s(r),o.length&&e.set(r,o)),o},get size(){return t.size},clear(){t.clear(),e.clear()}}}function Cu(i,{tris:t,cellOf:e,field:n,inside:s,speed:r=14,estimate:o=!0}){const a=new Set,l=[];for(const c of s)for(const u of t.of(c)){if(a.has(u))continue;a.add(u);const d=I_(u,i,e,n,r,o);d&&l.push(d)}return{chains:z_(l),segments:l.length,triangles:a.size}}function I_(i,t,e,n,s,r){const o=[];for(const _ of i.ids){const S=e(_);if(!S)return null;const E=!S.solid&&!n.blocked(_),w=E?n.value(_):void 0;o.push({id:_,c:S,open:E,v:w,k:E?n.strength(_):0,est:!1})}const a=o.filter(_=>_.open);if(a.length<2)return null;const l=a.filter(_=>_.v!==void 0);if(!l.length)return null;for(const _ of a){if(_.v!==void 0)continue;if(!r)return null;let S=1/0,E=0;for(const w of l){const y=w.v+Math.hypot(_.c.cx-w.c.cx,_.c.cz-w.c.cz)/s;y<S&&(S=y,E=w.k)}_.v=S,_.k=E,_.est=!0}const c=Math.max(...a.map(_=>_.v));for(const _ of o)_.open||(_.v=c,_.k=0);const u=o.map(_=>_.v<=t),d=u.filter(Boolean).length;if(d===0||d===3)return null;const f=[];for(let _=0;_<3;_++)for(let S=_+1;S<3;S++){if(u[_]===u[S])continue;const E=u[_]?o[_]:o[S],w=u[_]?o[S]:o[_];let y=(t-E.v)/(w.v-E.v);y=y<0?0:y>1?1:y,w.open||(y=Math.min(y,.5));const R=w.open?w.k:E.k;f.push({key:E.id<w.id?`${E.id}|${w.id}`:`${w.id}|${E.id}`,x:E.c.cx+(w.c.cx-E.c.cx)*y,z:E.c.cz+(w.c.cz-E.c.cz)*y,k:E.k+(R-E.k)*y,cell:E.id})}if(f.length!==2)return null;let h=0,m=0,x=0;for(let _=0;_<3;_++)u[_]&&(h+=o[_].c.cx,m+=o[_].c.cz,x++);h/=x,m/=x;const g=f[1].x-f[0].x,p=f[1].z-f[0].z,b=Math.hypot(g,p);let M=-p,v=g;b<1e-9&&(M=h-f[0].x,v=m-f[0].z);const T=Math.hypot(M,v)||1;return M/=T,v/=T,M*(h-f[0].x)+v*(m-f[0].z)<0&&(M=-M,v=-v),{a:f[0],b:f[1],nx:M,nz:v}}function z_(i){const t=new Map;i.forEach((l,c)=>{for(const u of[l.a,l.b]){let d=t.get(u.key);d||t.set(u.key,d=[]),d.push(c)}});const e=new Uint8Array(i.length),n=(l,c)=>l.a.key===c?l.b:l.a,s=(l,c)=>{for(const u of t.get(l)??[])if(!e[u]&&u!==c)return u;return-1},r=(l,c)=>{const u=[];let d=l,f=c;for(;;){const h=s(f,d);if(h<0)break;e[h]=1;const m=n(i[h],f);u.push({i:h,p:m}),f=m.key,d=h}return u},o=[],a=[...i.keys()].sort((l,c)=>t.get(i[l].a.key).length+t.get(i[l].b.key).length-(t.get(i[c].a.key).length+t.get(i[c].b.key).length));for(const l of a){if(e[l])continue;e[l]=1;const c=i[l],u=r(l,c.b.key),d=r(l,c.a.key),f=[],h=[];for(let p=d.length-1;p>=0;p--)f.push(d[p].p);f.push(c.a,c.b);for(const p of u)f.push(p.p);const m=[...d.map(p=>p.i).reverse(),l,...u.map(p=>p.i)];for(const p of m)h.push([i[p].nx,i[p].nz]);const x=f.length>3&&f[0].key===f[f.length-1].key;x&&f.pop();const g=f.map((p,b)=>{const M=h[Math.max(0,b-1)]??h[0],v=h[Math.min(h.length-1,b)]??h[0];let T=M[0]+v[0],_=M[1]+v[1];if(x&&b===0){const E=h[h.length-1];T=E[0]+h[0][0],_=E[1]+h[0][1]}const S=Math.hypot(T,_)||1;return{x:p.x,z:p.z,k:p.k,cell:p.cell,nx:T/S,nz:_/S}});o.push({pts:g,closed:x})}return o}function U_(i,t,e=80){const n=new Map,s=new Map;for(let c=0;c<i.count;c++)n.set(i.cell[c],i.dist[c]),s.set(i.cell[c],i.arrival[c]);let r=null,o=-1;for(const[c,u]of n)u>o&&(o=u,r=c);const a=[],l=new Set;for(let c=0;c<e&&r!=null&&!l.has(r);c++){l.add(r);const u=t(r);if(!u)break;a.push({x:u.cx,z:u.cz,t:s.get(r)});let d=null,f=n.get(r);for(const h of u.neighbors){const m=n.get(h.id);m!==void 0&&m<f&&(f=m,d=h.id)}r=d}return a}const Nh=3e3,N_=18,Pu=Nh*N_,ca=9,Lu=900,F_=2400,O_=120,Du=16,Iu=48,k_=.02;function B_(i,t,e){const n=t*Math.min(e,1-e),s=r=>{const o=(r+i/30)%12;return e-n*Math.max(-1,Math.min(o-3,9-o,1))};return[s(0),s(8),s(4)]}const G_=[.25,.95,1],Pi=[[-.1,0],[0,1],[.35,.4],[1,0]];function H_({scene:i,map:t,seed:e=1,sources:n,options:s={}}){const r=L_(t,{seed:e,sources:n,...s}),o=L=>t.cell?t.cell(L):t.cells[L],a=D_(o);let l=s.band??3.2;const c=s.waveBudgetMs??6,u={cooldown:s.cooldown??0,maxWaves:s.maxWaves??16},d=new Float32Array(Pu*3),f=new Float32Array(Pu*3),h=new pe;h.setAttribute("position",new Me(d,3).setUsage(Ka)),h.setAttribute("color",new Me(f,3).setUsage(Ka)),h.setDrawRange(0,0);const m=new jt(h,Ve(new Te({vertexColors:!0,transparent:!0,blending:ke,side:ye,toneMapped:!1,depthTest:!1}),{depthTest:!1}));m.material.depthTest=!1,m.renderOrder=9100,m.frustumCulled=!1,m.name="scan",i.add(m);let x=0,g=0;const p=new Map;let b=0,M=0,v=0,T=[],_=-1e9;const S=new WeakMap;let E=[];const w={frontMs:0,chains:0,segments:0,triangles:0,lastMs:0,field:0,pings:0,arrows:0,waves:0,stale:0,refused:0,fused:0};function y(L,W,it,nt,K,U,Et,dt){const St=x*3;d[St]=L[0],d[St+1]=Et,d[St+2]=L[1],d[St+3]=W[0],d[St+4]=Et,d[St+5]=W[1],d[St+6]=it[0],d[St+7]=Et,d[St+8]=it[1];for(let yt=0;yt<3;yt++){const Ot=yt===0?nt:yt===1?K:U;f[St+yt*3]=dt[0]*Ot,f[St+yt*3+1]=dt[1]*Ot,f[St+yt*3+2]=dt[2]*Ot}x+=3}function R(L,W,it,nt,K,U){if(g>=Nh)return;const Et=Oe(o(L.cell))+.07,dt=(St,yt)=>[St.x+St.nx*Pi[yt][0]*U,St.z+St.nz*Pi[yt][0]*U];for(let St=0;St+1<Pi.length;St++){const yt=dt(L,St),Ot=dt(L,St+1),st=dt(W,St),D=dt(W,St+1),A=nt*Pi[St][1],C=nt*Pi[St+1][1],z=K*Pi[St][1],q=K*Pi[St+1][1];y(yt,Ot,st,A,C,z,Et,it),y(st,Ot,D,z,C,q,Et,it)}g++}function F(L,W,it){const nt=L.pts.length;for(let K=0;K+1<nt+(L.closed?1:0);K++){const U=L.pts[K],Et=L.pts[(K+1)%nt];R(U,Et,W,Math.min(1.1,U.k)*it,Math.min(1.1,Et.k)*it,l)}}function B(L,W,it,nt,K,U,Et,dt){const St=it-L,yt=nt-W,Ot=Math.hypot(St,yt)||1,st=-yt/Ot*K*.5,D=St/Ot*K*.5,A=[L+st,W+D],C=[L-st,W-D],z=[it+st,nt+D],q=[it-st,nt-D];y(A,C,z,Et,Et,Et,dt,U),y(z,C,q,Et,Et,Et,dt,U)}function Y(L,W,it,nt){const K=Oe(L)+.07,U=18;for(let Et=0;Et<U;Et++){const dt=Et/U*Math.PI*2,St=(Et+1)/U*Math.PI*2;B(L.cx+Math.cos(dt)*W,L.cz+Math.sin(dt)*W,L.cx+Math.cos(St)*W,L.cz+Math.sin(St)*W,.28,it,nt,K)}}const Z=(L,W,it)=>{let nt=0,K=W;for(;nt<K;){const U=nt+K>>1;L[U]<it?nt=U+1:K=U}return nt},H=new Set;function V(L){L.count<b&&(p.clear(),H.clear(),b=0);for(let W=b;W<L.count;W++){if(L.generation[W]!==0)continue;const it=L.wave[W];if(H.has(it))continue;let nt=p.get(it);nt||(nt={id:it,slotOf:new Map,slots:[],speed:L.speed[W]||14,last:L.arrival[W],strength:0,stamp:-1,chains:[],segments:0},p.set(it,nt),M=Math.max(0,M-1));const K=L.cell[W],U=nt.slotOf.get(K);(U===void 0||L.flags[U]&5&&!(L.flags[W]&5))&&nt.slotOf.set(K,W),nt.slots.push(W),nt.last=L.arrival[W],L.flags[W]&5||(nt.strength=L.strength[W]*.9)}b=L.count}function k(L){for(const[W,it]of p){const nt=ca/it.speed,K=L-it.last;(K>2*nt+.5||it.strength<k_&&K>nt)&&(p.delete(W),H.add(W),w.fused++)}}const tt=(L,W,it)=>{let nt=0,K=L.length;for(;nt<K;){const U=nt+K>>1;W[L[U]]<it?nt=U+1:K=U}return nt};function ut(L,W,it,nt){const K=L.slotOf,U={value:Ot=>{const st=K.get(Ot);return st===void 0||W.flags[st]&5?void 0:W.arrival[st]},strength:Ot=>{const st=K.get(Ot);return st===void 0?0:W.strength[st]*.9},blocked:Ot=>{const st=K.get(Ot);return st!==void 0&&(W.flags[st]&5)!==0}},Et=L.speed,dt=tt(L.slots,W.arrival,it-ca/Et),St=tt(L.slots,W.arrival,it),yt=[];for(let Ot=St-1;Ot>=dt&&yt.length<nt;Ot--){const st=L.slots[Ot];W.flags[st]&5||yt.push(W.cell[st])}return Cu(it,{tris:a,cellOf:o,field:U,inside:yt,speed:Et,estimate:!0})}function rt(L={}){const W=L.cooldown??u.cooldown,it=L.maxWaves??u.maxWaves,nt=W>0?Math.max(0,W-(r.time-_)):0,K=p.size+M;return nt>1e-9?{ok:!1,reason:"cooldown",left:nt,active:K,max:it}:K>=it?{ok:!1,reason:"waves",left:0,active:K,max:it}:{ok:!0,reason:null,left:0,active:K,max:it}}function At(L){let W=S.get(L);if(!W){const it=new Map,nt=new Map;for(let K=0;K<L.count;K++)it.set(L.cell[K],L.arrival[K]),nt.set(L.cell[K],L.strength[K]);W={when:it,str:nt,path:null,arc:null,chev:null,rgb:B_(L.hue,.95,.6)},S.set(L,W)}return W}const Ct=new Set,lt=new Set;let wt=null;function zt(L,W){if(W.chev)return W.chev;if(W.path=U_(L,o),W.path.length<2)return null;W.arc=[0];for(let K=1;K<W.path.length;K++)W.arc.push(W.arc[K-1]+Math.hypot(W.path[K].x-W.path[K-1].x,W.path[K].z-W.path[K-1].z));const it=W.path[W.path.length-1].t-W.path[0].t,nt=it>0?W.arc[W.arc.length-1]/it*1.6:10;return W.chev=Dh({parent:i,color:W.rgb,behind:Math.max(2,nt)}),W.chev.configure(wt??{}),W.chev.set(W.path,.09),Ct.add(W),W.chev}function xt(L,W){const it=L.path;if(W<=it[0].t)return 0;for(let nt=1;nt<it.length;nt++)if(W<it[nt].t){const K=(W-it[nt-1].t)/Math.max(1e-6,it[nt].t-it[nt-1].t);return L.arc[nt-1]+(L.arc[nt]-L.arc[nt-1])*K}return L.arc[L.arc.length-1]}function Ut(L,W,it){const nt={value:dt=>W.when.get(dt),strength:dt=>(W.str.get(dt)??0)*.95,blocked:()=>!1},K=Z(L.arrival,L.count,it-ca/(L.speed||14)),U=Z(L.arrival,L.count,it),Et=[];for(let dt=U-1;dt>=K&&Et.length<Lu;dt--)Et.push(L.cell[dt]);return Cu(it,{tris:a,cellOf:o,field:nt,inside:Et,speed:L.speed||14,estimate:!1})}return{sim:r,mesh:m,stats:w,tris:a,configure(L){if(L&&Number.isFinite(L.scanBand)&&(l=L.scanBand),L&&Number.isFinite(L.pingCooldown)&&(u.cooldown=Math.max(0,L.pingCooldown)),L&&Number.isFinite(L.pingMaxWaves)&&(u.maxWaves=Math.max(1,Math.round(L.pingMaxWaves))),L){wt=L;for(const W of Ct)W.chev.configure(L)}},get band(){return l},get fronts(){return E},ping(L,W,it={}){if(!rt(it).ok)return w.refused++,null;const K=r.ping({x:L,z:W},it);return K!=null&&(_=r.time,w.pings++,M++),K},get pingState(){const L=rt();return{ready:L.ok,reason:L.reason,left:L.left,active:L.active,max:L.max,cooldown:u.cooldown}},step(L,W=3){r.advance(L,{budgetMs:W});const it=r.drainEvents();for(const nt of it)nt.type==="echo-heard"&&nt.replay&&nt.replay.count&&T.push(nt);return T.length>Iu&&T.splice(0,T.length-Iu),it},update(){const L=performance.now(),W=r.time;x=0,g=0,E=[],w.chains=0,w.segments=0,w.triangles=0,w.arrows=0,lt.clear();const it=r.field();w.field=it.count,a.size>6e4&&a.clear(),V(it),k(W),w.waves=p.size,w.stale=0;for(let nt=T.length-1;nt>=0;nt--)W>T[nt].replay.endTime+8&&T.splice(nt,1);if(w.frontMs=0,p.size){const nt=[...p.values()],K=Math.max(O_,Math.min(Lu,Math.floor(F_/nt.length))),U=nt.length>1?[...nt].sort((yt,Ot)=>yt.stamp-Ot.stamp):nt,Et=performance.now();let dt=0,St=0;for(const yt of U){if(yt.stamp>=0&&dt>0&&performance.now()-Et>=c){St++;continue}const Ot=ut(yt,it,W,K);yt.chains=Ot.chains,yt.segments=Ot.segments,yt.stamp=++v,dt++,w.triangles+=Ot.triangles}w.frontMs=performance.now()-Et,w.stale=St;for(const yt of nt)E.push({kind:"wave",wave:yt.id,chains:yt.chains});for(let yt=nt.length-1;yt>=0;yt--){for(const Ot of nt[yt].chains)F(Ot,G_,.9);w.chains+=nt[yt].chains.length,w.segments+=nt[yt].segments}}for(const nt of T.length>Du?T.slice(-Du):T){const K=nt.replay,U=At(K),Et=Ut(K,U,W);E.push({kind:"echo",chains:Et.chains});for(const dt of Et.chains)F(dt,U.rgb,.95);if(w.chains+=Et.chains.length,w.segments+=Et.segments,w.triangles+=Et.triangles,W>K.latchTime-.2&&W<K.endTime+5){const dt=zt(K,U);dt&&(dt.setHead(xt(U,W)),dt.update(W),lt.add(U),w.arrows+=dt.stats.glyphs)}if(W>K.endTime){const dt=Math.max(0,Math.min(1,(K.endTime+7-W)/3)),St=o(nt.glimpse.cell);St&&dt>0&&(Y(St,.8+(W-K.endTime)*.35,U.rgb,.9*dt),g+=6)}}for(const nt of Ct)lt.has(nt)||(nt.chev.dispose(),nt.chev=null,Ct.delete(nt));h.setDrawRange(0,x),h.attributes.position.needsUpdate=!0,h.attributes.color.needsUpdate=!0,m.visible=x>0,w.lastMs=performance.now()-L},dispose(){var L;for(const W of Ct)(L=W.chev)==null||L.dispose();Ct.clear(),i.remove(m),h.dispose(),m.material.dispose()}}}function Q_({canvas:i,map:t,seed:e=1,streamed:n=!0,fog:s=!0,mode:r="chase",embedded:o=!1,focus:a,storage:l,settings:c,onHover:u,onSelect:d,onStatus:f}){var v,T;const h=l_({canvas:i,map:t,mode:r,fog:s,embedded:o,focus:a,makeBoard:n?({map:_,cut:S})=>p_({map:_,cut:S}):void 0,onHover:u,onSelect:d});n&&h.board.settle(t.startCell.cx,t.startCell.cz,30);const m=df(t,{spawnCell:t.startCell,seed:e}),x=Vv(l);c&&x.set(c),h.rig.bindKeys(()=>x.keys()),x.subscribe(_=>h.applySettings(_));let g=null;const p=c_({stage:h,actors:m,canvas:h.renderer.domElement,embedded:o,shows:(_,S,E)=>g?g.shows(_,S,E):!0,onStatus:f,keys:()=>x.keys()});g=s?A_({map:t,stage:h}):null,g&&(h.setKnowledge((_,S)=>g.knows(_,S)),(T=(v=h.board).setShows)==null||T.call(v,(_,S,E)=>g.shows(_,S,E))),x.subscribe(_=>{var S,E;g==null||g.configure(_),(E=(S=h.board).configure)==null||E.call(S,_)});const b=H_({scene:h.scene,map:t,seed:e});x.subscribe(_=>b.configure(_)),h.on("frame",(_,S)=>{const E=m.snapshot(),w=y=>{const R=E[y],F=R.render??R;return{id:y,x:F.x,z:F.z}};if(g==null||g.update([w("avatar"),w("companion")],S,_),!p.paused){const y=b.step(_);y.length&&(g==null||g.noteScan(y))}b.update()});const M=()=>{const _=m.snapshot().avatar,S=_.render??_;return b.ping(S.x,S.z)};return p.bind("ping",M),{map:t,seed:e,streamed:n,stage:h,board:h.board,actors:m,settings:x,play:p,fogView:g,scanView:b,ping:M,dispose(){p.dispose(),b.dispose(),g==null||g.dispose(),h.dispose()}}}const $r=1e7;function ty(i,{world:t,worldOptions:e,start:n=[0,0]}={}){const s=t??Wh(i,e),{field:r,coarse:o}=s,a=[],l=new Map,c=[],u=new Map,d=[],f=new Set,h={navMs:0,navN:0,cutMs:0,cutN:0,maxMs:0},m=(_,S)=>`${_},${S}`,x={seed:i,world:s,tileset:s,sectors:a,cells:c,gates:d,terrain:s.cfg,contours:[],sectorEdges:[],cuts:[],bounds:{x0:-$r,z0:-$r,x1:$r,z1:$r},stats:h};x.cell=_=>Number.isInteger(_)?c[_]??null:null,x.cellById=x.cell,x.gateLocked=_=>{var S;return!!((S=d[_])!=null&&S.locked)};function g(_,S){const E=performance.now(),w=S(),y=performance.now()-E;return h[`${_}Ms`]+=y,h[`${_}N`]++,h.maxMs=Math.max(h.maxMs,y),w}function p(_,S){for(const E of _.nav.portals){if(E.q[0]!==S.u||E.q[1]!==S.v)continue;const w=`${_.key}>${S.key}#${E.slot}`;if(f.has(w))continue;f.add(w);const y=c[_.base+E.cell],R=c[u.get(`${E.partner[0]},${E.partner[1]}`)];if(!y||!R)continue;const F=Math.abs(E.edge.a[0]-E.edge.b[0]),B=Math.abs(E.edge.a[1]-E.edge.b[1]),Y=E.span.reduce((k,tt)=>k+tt.len,0),Z=[E.span.reduce((k,tt)=>k+tt.mid[0]*tt.len,0)/Y,E.span.reduce((k,tt)=>k+tt.mid[1]*tt.len,0)/Y],H={id:d.length,a:y.id,b:R.id,sa:_.id,sb:S.id,mid:Z,len:Y,horiz:B>=F,slot:E.slot,locked:E.locked,edge:E.edge,span:E.span,faces:E.faces,soft:E.soft,cells:[],kind:E.kind,visible:E.visible,axis:E.axis,normal:E.normal},V=[...E.span].sort((k,tt)=>(tt.mid===E.edge.mid?1:0)-(k.mid===E.edge.mid?1:0));for(const k of V){const tt=c[_.base+k.cell],ut=c[u.get(`${k.partner[0]},${k.partner[1]}`)];!tt||!ut||tt.neighbors.some(rt=>rt.id===ut.id)||(tt.neighbors.push({id:ut.id,mid:k.mid,len:k.len,gate:H.id}),ut.neighbors.push({id:tt.id,mid:k.mid,len:k.len,gate:H.id}),H.cells.push([tt.id,ut.id]))}d.push(H),_.gates.push(H),S.gates.push(H)}}function b(_,S){const E=m(_,S);let w=l.get(E);if(w)return w;const y=g("nav",()=>s.nav(_,S));w={id:a.length,u:_,v:S,key:E,clearance:y.info.clearance,name:E,base:c.length,cellIds:[],nav:y,gates:[],cut:!1,kind:"",render:null,rect:null},a.push(w),l.set(E,w);let R=1/0,F=1/0,B=-1/0,Y=-1/0;for(const Z of y.cells){for(const[V,k]of Z.poly)R=Math.min(R,V),F=Math.min(F,k),B=Math.max(B,V),Y=Math.max(Y,k);const H={id:c.length,sector:w.id,clearance:w.clearance,local:Z.local,solid:y.solid[Z.local],poly:Z.poly,cx:Z.cx,cz:Z.cz,area:Z.area,radius:Z.radius,sides:Z.sides,i:Z.i,j:Z.j,neighbors:[],cache:0};c.push(H),u.set(`${Z.i},${Z.j}`,H.id),w.cellIds.push(H.id)}w.rect={x0:R,z0:F,x1:B,z1:Y};for(const Z of y.cells)for(const H of Z.nbl){if(H.j<Z.local)continue;const V=c[w.base+Z.local],k=c[w.base+H.j];V.neighbors.push({id:k.id,mid:H.mid,len:H.len}),k.neighbors.push({id:V.id,mid:H.mid,len:H.len})}for(const Z of Object.values(Xh)){const H=l.get(m(_+Z[0],S+Z[1]));H&&(kl([w.u,w.v],[H.u,H.v])<=0?p(w,H):p(H,w))}return w}function M(_,S){if(!s.cfg.borders.openCross)return;const E=new Set(S.gapEdges);for(const w of _.nav.cells)if(!_.nav.solid[w.local])for(const y of w.ext){const R=l.get(m(y.u,y.v));if(!R||kl([_.u,_.v],[R.u,R.v])>0)continue;const F=o.border([_.u,_.v],[R.u,R.v]).mode;if(F!=="open"&&F!=="wall"||F==="wall"&&!E.has(zu(y.a,y.b)))continue;const B=u.get(`${y.i},${y.j}`);if(B===void 0||c[B].solid)continue;const Y=c[_.base+w.local],Z=c[B];Y.neighbors.some(H=>H.id===Z.id)||(Y.neighbors.push({id:Z.id,mid:y.mid,len:y.len,open:!0}),Z.neighbors.push({id:Y.id,mid:y.mid,len:y.len,open:!0}))}}const v=_=>s.sectorGeo(_.u,_.v).nbrs.filter(S=>o.inBounds(S.u,S.v));function T(_){if(_.cut)return _;for(const S of v(_))b(S.u,S.v);return g("cut",()=>{const S=s.render(_.u,_.v);for(const R of S.cuts??[]){const F=c[_.base+R.local];F.cut={poly:R.poly,open:R.open},x.cuts.push({cell:F.id,poly:R.poly,open:R.open})}const E=R=>b(R.u,R.v).base+R.local,w=s.detail(_.u,_.v);_.kind=w.kind;for(const R of w.caches){const F=c[_.base+R.cell];!F.role&&!F.solid&&(F.cache=R.amount)}const y=R=>R?b(R[0],R[1]).id:-1;_.render={contours:S.contours.map(R=>({a:R.a,b:R.b,solid:E(R.solid),open:E(R.open),...R.sliver?{sliver:!0}:{}})),sectorEdges:S.sectorEdges.map(R=>({a:R.a,b:R.b,sa:_.id,sb:y(R.sb),...R.sliver?{sliver:!0}:{},...R.open?{open:!0}:{},...R.gap?{gap:!0}:{}})),borderLines:S.borderLines.map(R=>({...R,sa:_.id,sb:y(R.sb)})),openings:S.openings.map(R=>({...R,sa:_.id,sb:y(R.sb)})),gapEdges:S.gapEdges},M(_,S)}),_.cut=!0,_}x.cellAt=(_,S)=>{const[E,w]=r.cellAtPoint(_,S);let y=u.get(`${E},${w}`);if(y===void 0){const[R,F]=r.sectorOf(E,w);b(R,F),y=u.get(`${E},${w}`)}return y===void 0?null:c[y]},x.sectorAt=(_,S)=>{const E=x.cellAt(_,S);return E?a[E.sector]:null},x.sectorIndexAt=(_,S)=>r.sectorOf(...r.cellAtPoint(_,S)),x.sector=b,x.prepare=T,x.has=(_,S)=>l.get(m(_,S)),x.chunkView=_=>{const S=[];for(const y of[_,...v(_).map(R=>l.get(m(R.u,R.v)))])if(y)for(const R of y.cellIds)S.push(c[R]);const E=_.cellIds.map(y=>c[y]),w=x.startCell;return{cells:E,edgeCells:S,gates:_.gates,drawsGate:y=>y.sa===_.id,sectors:a,cellById:x.cell,sectorEdges:_.render.sectorEdges,contours:_.render.contours,sectorLines:_.render.borderLines,sectorOpenings:_.render.openings,gapEdges:_.render.gapEdges,startCell:w,beacons:w&&w.sector===_.id?[[w,8256767,0,2.4,.5]]:[]}};{const _=T(b(n[0],n[1])),S=_.nav.cells[_.nav.seedLocal??0];let E=null,w=1/0;for(const y of _.cellIds){const R=c[y];if(R.solid)continue;const F=Math.hypot(R.cx-S.cx,R.cz-S.cz)-R.radius*.5;F<w&&(w=F,E=R)}E.role="start",x.startCell=E}return x.coarse=o,x}export{Ps as A,hn as D,K_ as G,Hr as R,Il as S,Ll as a,j_ as b,Tv as c,xo as d,Ch as e,Z_ as f,J_ as g,ty as h,Y_ as i,Q_ as j,il as k,q_ as l,xv as m,_v as n,vn as o,Vv as p,$_ as r};
