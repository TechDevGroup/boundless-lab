import{m as Ju}from"./rng-BKYMqjzS.js";import{C as de,a as Li,h as Qu}from"./palette-DlZOkp1f.js";import{i as $c,d as th,D as eh,e as ll}from"./liveConfig-bpvqK4Tq.js";const cn={tick:1/60,maxFrame:.25,collision:{maxStep:.2,maxSubsteps:96,iterations:4,skin:.01},avatar:{radius:.45,speed:5.6,runSpeed:8.4,accel:26,decel:34,turnRate:14},companion:{radius:.4,speed:5.9,catchupSpeed:8.8,accel:26,decel:34,turnRate:12},facing:{minSpeed:.5,tau:.07},route:{reach:.45,arriveTol:.35,margin:.06,cornerFloor:.4,cornerLook:1.4,stuckTime:.9,stuckGain:.3,pullMargin:.1,pullStep:.35,pullLook:7,blendTime:.35,cornerMargin:.3,cornerPush:1,cornerRing:12,cornerStep:.1,cornerTurn:.2,doorCentreWidth:3.6,doorTol:.25,doorBudget:1.2,doorLead:.7,doorTurn:1,tidyLine:.12,tidySpike:1.9,tidyShort:.8,look:.9,lookSpeed:.22,lookMax:2.2,passRadius:1},follow:{distance:3.4,lateral:1.6,start:5.2,stop:3.6,catchup:10,doorClear:2.2,doorWidth:3.6,wallClear:.3,reslot:.5,blinkDistance:42,lead:.9,replanDist:1.8,reslotMax:1.4,farScale:12,searchStep:150,searchMax:12e3,retry:1.5,slotBudget:260},patrol:{dwell:1.2,maxWaypoints:12},react:{dwell:1.5,face:1.2,giveUp:14},separation:{gap:.15,push:4.5},recovery:{window:5},triggers:{maxRules:32,maxFiresPerTick:4,repeat:2,maxSignals:32},noise:{run:9,runEvery:.6},events:{max:512}},Fr=(i,t,e)=>i<t?t:i>e?e:i;function qs(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const o=i[s][0],a=i[s][1],l=i[r][0],c=i[r][1];a>e!=c>e&&t<(l-o)*(e-a)/(c-a)+o&&(n=!n)}return n}const Us=(i,t,e,n,s,r)=>(e-i)*(r-t)-(n-t)*(s-i);function Hs(i,t){let e=(t-i)%(Math.PI*2);return e>Math.PI?e-=Math.PI*2:e<=-Math.PI&&(e+=Math.PI*2),e}function nh(i,t,e){const n=Hs(i,t);return Math.abs(n)<=e?t:i+Math.sign(n)*e}function Qr(i,t,e,n,s,r){const o=s-e,a=r-n,l=o*o+a*a,c=l>0?Fr(((i-e)*o+(t-n)*a)/l,0,1):0;return Math.hypot(i-(e+c*o),t-(n+c*a))}const ih=cn;class cl{constructor(t,e,n){this.id=t,this.x=n.x,this.z=n.z,this.heading=0,this.vx=0,this.vz=0,this.speed=0,this.radius=e.radius,this.cell=n.cell,this.moving=!1,this.controlled=!1,this.touching=!1,this.sliver=!1,this.px=n.x,this.pz=n.z,this.pheading=0,this.spec=e,this.accel=e.accel,this.decel=e.decel,this.world=null,this._route=null,this._want={x:0,z:0},this._blocked=0,this._blockedFired=!1,this._aim=null,this._face=null}step(t,e,n,s,r){const o=s-this.vx,a=r-this.vz,l=Math.hypot(o,a),c=Math.hypot(s,r),u=Math.hypot(this.vx,this.vz),p=(c>=u-1e-6?this.accel:this.decel)*n;l<=p?(this.vx=s,this.vz=r):(this.vx+=o/l*p,this.vz+=a/l*p),this._want.x=s,this._want.z=r;const{maxStep:h,maxSubsteps:f}=ih.collision,m=Math.hypot(this.vx,this.vz)*n,_=Math.min(f,Math.max(1,Math.ceil(m/Math.min(h,this.radius*.4)))),g=n/_,d={x:0,z:0},M=[];let y=!1,x=0;e.substeps+=_;for(let b=0;b<_;b++){const P=this.x,S=this.z,v=t.cell(this.cell);if(!v){this.vx=0,this.vz=0;break}d.x=P+this.vx*g,d.z=S+this.vz*g,M.length=0;const A=t.resolve(d,this.radius,t.near(v),M),N=t.locate(d.x,d.z,this.cell);if(!N||t.blocked(N,d.x,d.z)){e.violations++,this.vx=0,this.vz=0,y=!0;continue}if(this.x=d.x,this.z=d.z,this.sliver=N.solid,N.solid||(this.cell=N.id),A){y=!0,e.contacts++;for(let k=0;k<M.length;k+=2){const $=this.vx*M[k]+this.vz*M[k+1];$<0&&(this.vx-=$*M[k],this.vz-=$*M[k+1])}}x+=Math.hypot(this.x-P,this.z-S)}this.touching=y,this.speed=Math.hypot(this.vx,this.vz),this.moving=this.speed>.15;const w=Math.hypot(s,r),E=n>0?x/n:0;w>1&&E<w*.3?this._blocked+=n:(this._blocked=0,this._blockedFired=!1)}face(t,e,n=0){const s=this.spec.turnRate*t;if(!(n>0)){this.heading=nh(this.heading,e,s);return}const r=Hs(this.heading,e),o=Math.min(s,Math.abs(r)*(1-Math.exp(-t/n)));this.heading+=Math.sign(r)*o}teleport(t){this.x=t.x,this.z=t.z,this.cell=t.cell,this.px=t.x,this.pz=t.z,this.pheading=this.heading,this.vx=this.vz=this.speed=0,this.moving=!1,this._route=null}pub(){return{id:this.id,x:this.x,z:this.z,heading:this.heading,vx:this.vx,vz:this.vz,speed:this.speed,radius:this.radius,cell:this.cell,moving:this.moving,controlled:this.controlled,touching:this.touching,sliver:this.sliver,prev:{x:this.px,z:this.pz,heading:this.pheading}}}}const to=.03,sh=.6,ul=1.2,rh=2;class oh{constructor(t){this.nav=t,this.infos=new Map,this.nears=new Map,this.solids=new Map,this.doorLists=new Map,this.doorNears=new Map,this.usables=new Map}cell(t){const e=this.nav;return(e.cell?e.cell(t):e.cells[t])??null}live(t){return this.cell(t)!==null}purge(){var t;for(const e of[this.infos,this.nears,this.solids,this.doorLists,this.doorNears,this.usables])(t=e==null?void 0:e.clear)==null||t.call(e)}gateLocked(t){var n,s;const e=this.nav;return e.gateLocked?!!e.gateLocked(t):!!((s=(n=e.gates)==null?void 0:n[t])!=null&&s.locked)}locate(t,e,n){if(n!=null){const s=this.cell(n);if(s&&qs(s.poly,t,e))return s;if(s)for(const r of s.neighbors){const o=this.cell(r.id);if(o&&qs(o.poly,t,e))return o}}return this.nav.cellAt(t,e)??null}blocked(t,e,n){return t.solid?t.cut?qs(t.cut.poly,e,n):!0:!1}solidWalls(t){let e=this.solids.get(t.id);if(e)return e;const n=t.cut?t.cut.poly:t.poly,s=n.length;let r=0;for(let u=0;u<s;u++){const p=n[u],h=n[(u+1)%s];r+=p[0]*h[1]-h[0]*p[1]}const o=r>=0?1:-1,a=[];let l=!1;for(const u of t.neighbors){const p=this.cell(u.id);p?p.solid&&a.push(p.poly):l=!0}const c=(u,p)=>{for(const h of a)for(let f=0;f<h.length;f++){const m=h[f],_=h[(f+1)%h.length];if(Qr(u,p,m[0],m[1],_[0],_[1])<to)return!0}return!1};e=[];for(let u=0;u<s;u++){const p=n[u],h=n[(u+1)%s],f=h[0]-p[0],m=h[1]-p[1],_=Math.hypot(f,m);_<1e-6||c((p[0]+h[0])/2,(p[1]+h[1])/2)||e.push({ax:p[0],az:p[1],bx:h[0],bz:h[1],nx:o*m/_,nz:-o*f/_,gate:void 0})}return l||this.solids.set(t.id,e),e}info(t){let e=this.infos.get(t.id);if(e)return e;const n=t.poly,s=n.length,r=[];for(let h=0;h<s;h++){const f=n[h],m=n[(h+1)%s],_=m[0]-f[0],g=m[1]-f[1],d=Math.hypot(_,g);if(d<1e-6)continue;let M=-g/d,y=_/d;(t.cx-f[0])*M+(t.cz-f[1])*y<0&&(M=-M,y=-y),r.push({ax:f[0],az:f[1],bx:m[0],bz:m[1],dx:_/d,dz:g/d,L:d,nx:M,nz:y,open:!1,gate:null})}const o=new Array(t.neighbors.length).fill(null),a=[],l=(h,f)=>{let m=null,_=1/0;for(const g of r){const d=(h[0]-g.ax)*g.dx+(h[1]-g.az)*g.dz;if(d<-f||d>g.L+f)continue;const M=Math.abs((h[0]-g.ax)*-g.dz+(h[1]-g.az)*g.dx);M<_&&(_=M,m={e:g,t:d})}return m&&_<=f?m:null};let c=!1;t.neighbors.forEach((h,f)=>{const m=this.cell(h.id);if(!m){c=!0;return}if(m.solid){const _=l(h.mid,to);_&&(_.e.solidBacked=!0);return}if(h.gate===void 0){const _=l(h.mid,to);if(!_){a.push(f);return}_.e.open=!0;const g=_.e;o[f]={x0:g.ax,z0:g.az,x1:g.bx,z1:g.bz,w:g.L,gate:void 0}}else{const _=l(h.mid,sh);if(!_){a.push(f);return}const g=_.e,d=(h.len??2.4)/2,M=Math.max(0,_.t-d),y=Math.min(g.L,_.t+d);(g.gate??(g.gate=[])).push({k:f,t0:M,t1:y,id:h.gate}),o[f]={x0:g.ax+g.dx*M,z0:g.az+g.dz*M,x1:g.ax+g.dx*y,z1:g.az+g.dz*y,w:Math.max(0,y-M),gate:h.gate,merged:!1}}});const u=[],p=(h,f,m,_)=>{m-f<1e-4||u.push({ax:h.ax+h.dx*f,az:h.az+h.dz*f,bx:h.ax+h.dx*m,bz:h.az+h.dz*m,nx:h.nx,nz:h.nz,gate:_})};for(const h of r)if(!(h.open||h.solidBacked))if(h.gate){const f=h.gate.slice().sort((_,g)=>_.t0-g.t0);let m=0;for(const _ of f)p(h,m,_.t0,void 0),p(h,_.t0,_.t1,_.id),m=Math.max(m,_.t1);p(h,m,h.L,void 0)}else p(h,0,h.L,void 0);return e={walls:u,portals:o,unmatched:a,edges:r},c||this.infos.set(t.id,e),e}portal(t,e){const n=this.info(t).portals[e];if(!n)return null;if(n.gate!==void 0&&!n.merged){n.merged=!0;const s=t.neighbors[e],r=this.cell(s.id);if(!r)return null;const o=this.info(r),a=r.neighbors.findIndex(x=>x.gate===s.gate&&x.id===t.id),l=a>=0?o.portals[a]:null;if(!l)return n.w=0,n;const c=n.x1-n.x0,u=n.z1-n.z0,p=Math.hypot(c,u)||1,h=c/p,f=u/p,m=(l.x0-n.x0)*h+(l.z0-n.z0)*f,_=(l.x1-n.x0)*h+(l.z1-n.z0)*f,g=Math.max(0,Math.min(m,_)),d=Math.min(p,Math.max(m,_)),M=n.x0,y=n.z0;n.x0=M+h*g,n.z0=y+f*g,n.x1=M+h*Math.max(g,d),n.z1=y+f*Math.max(g,d),n.w=Math.max(0,d-g)}return n}near(t){let e=this.nears.get(t.id);if(e)return e;const n=new Set([t.id]),s=[t];let r=[t],o=!1;for(let a=0;a<rh;a++){const l=[];for(const c of r)for(const u of c.neighbors){if(n.has(u.id))continue;n.add(u.id);const p=this.cell(u.id);if(!p){o=!0;continue}s.push(p),l.push(p)}r=l}e=[];for(const a of s)for(const l of a.solid?this.solidWalls(a):this.info(a).walls)e.push(l);return o||this.nears.set(t.id,e),e}resolve(t,e,n,s){const{iterations:r,skin:o}=cn.collision,a=e+o;let l=0;for(let c=0;c<r;c++){let u=!1;for(const p of n){if(p.gate!==void 0&&!this.gateLocked(p.gate))continue;const h=p.bx-p.ax,f=p.bz-p.az,m=h*h+f*f,_=m>0?Math.min(1,Math.max(0,((t.x-p.ax)*h+(t.z-p.az)*f)/m)):0,g=p.ax+_*h,d=p.az+_*f,M=t.x-g,y=t.z-d,x=M*M+y*y,w=(t.x-p.ax)*p.nx+(t.z-p.az)*p.nz;if(x>=a*a||w<0&&_>0&&_<1)continue;const E=Math.sqrt(x);let b,P,S;E>1e-9?(b=M/E,P=y/E,S=a-E):(b=p.nx,P=p.nz,S=a),t.x+=b*S,t.z+=P*S,u=!0,l++,s&&s.push(b,P)}if(!u)break}return l}wallDist(t,e,n,s=!1){let r=1/0;for(const o of this.near(n)){if(o.gate!==void 0&&(s||!this.gateLocked(o.gate)))continue;const a=Qr(t,e,o.ax,o.az,o.bx,o.bz);a<r&&(r=a)}return r}openNear(t,e,n){let s=null,r=1/0;for(const o of t.neighbors){const a=this.cell(o.id);if(!a||a.solid)continue;let l=qs(a.poly,e,n)?0:1/0;if(l!==0)for(let c=0;c<a.poly.length;c++){const u=a.poly[c],p=a.poly[(c+1)%a.poly.length];l=Math.min(l,Qr(e,n,u[0],u[1],p[0],p[1]))}(l<r-1e-9||Math.abs(l-r)<=1e-9&&s&&a.id<s.id)&&(r=l,s=a)}return s}walkClear(t,e,n,s,r,o,a=!1){const l=r+cn.route.pullMargin,c=r-.005,u=Math.hypot(n-t,s-e),p=Math.max(1,Math.ceil(u/cn.route.pullStep));let h=o;for(let f=0;f<=p;f++){const m=f/p,_=t+(n-t)*m,g=e+(s-e)*m,d=this.locate(_,g,h);if(!d||this.blocked(d,_,g))return!1;h=d.id;const M=m*u<.6||(1-m)*u<.6;if(this.wallDist(_,g,d,a)<(M?c:l))return!1}return!0}settle(t,e,n,s=0){const r=[[0,0]];for(const o of[.6,1.2,2,3,4.5])for(let a=0;a<8;a++){const l=a/8*Math.PI*2+o;r.push([Math.cos(l)*o,Math.sin(l)*o])}for(const[o,a]of r){const l={x:t+o,z:e+a};let c=this.locate(l.x,l.z);if(!(!c||c.solid)&&(this.resolve(l,n+s,this.near(c),null),c=this.locate(l.x,l.z,c.id),!(!c||c.solid)&&this.wallDist(l.x,l.z,c)>=n-.02))return{x:l.x,z:l.z,cell:c.id}}return null}usable(t,e,n){const s=e+"@"+n;let r=this.usables.get(t.id);if(r||this.usables.set(t.id,r=new Map),r.has(s))return r.get(s);let o=null;const a=this.portal(t,e);if(a&&a.w>0){const l=n+cn.route.margin,c=Math.max(4,Math.min(40,Math.ceil(a.w/.15))),u=a.x1-a.x0,p=a.z1-a.z0;let h=null,f=null;for(let m=0;m<=c;m++){const _=m/c,g=a.x0+u*_,d=a.z0+p*_;this.wallDist(g,d,t,!0)>=l?(f?f.e=m:f={s:m,e:m},(!h||f.e-f.s>h.e-h.s)&&(h=f)):f=null}h&&(o={x0:a.x0+u*h.s/c,z0:a.z0+p*h.s/c,x1:a.x0+u*h.e/c,z1:a.z0+p*h.e/c,w:Math.hypot(u,p)*(h.e-h.s)/c,gate:a.gate})}return r.set(s,o),o}passable(t,e,n){return!!this.usable(t,e,n)}doorsOf(t){let e=this.doorLists.get(t.id);if(e)return e;if(e=[],t.solid)return this.doorLists.set(t.id,e),e;const n=this.info(t),s=(r,o)=>this.wallDist(r,o,t,!0)<ul;return t.neighbors.forEach((r,o)=>{const a=n.portals[o];if(!a)return;const l=(a.x0+a.x1)/2,c=(a.z0+a.z1)/2;a.gate!==void 0?e.push({x:r.mid[0],z:r.mid[1]}):a.w<cn.follow.doorWidth&&s(a.x0,a.z0)&&s(a.x1,a.z1)&&e.push({x:l,z:c})}),t.neighbors.every(r=>this.cell(r.id))&&this.doorLists.set(t.id,e),e}isDoor(t,e){const n=this.info(t).portals[e];if(!n)return!1;if(n.gate!==void 0)return!0;if(n.w>=cn.route.doorCentreWidth)return!1;const s=(r,o)=>this.wallDist(r,o,t,!0)<ul;return s(n.x0,n.z0)&&s(n.x1,n.z1)}doorsNear(t){let e=this.doorNears.get(t.id);if(e)return e;e=this.doorsOf(t).slice();for(const n of t.neighbors){const s=this.cell(n.id);if(s&&!s.solid)for(const r of this.doorsOf(s))e.push(r)}return t.neighbors.every(n=>this.cell(n.id))&&this.doorNears.set(t.id,e),e}inDoorway(t,e,n,s){for(const r of this.doorsNear(n))if(Math.hypot(r.x-t,r.z-e)<s)return!0;return!1}}const hl=new WeakMap;function ah(i){let t=hl.get(i);return t||(t=new oh(i),hl.set(i,t)),t}class lh{constructor(t,e,n,{passable:s=null}={}){if(this.get=t.cell?o=>t.cell(o):o=>t.cells[o],this.locked=t.gateLocked?o=>!!t.gateLocked(o):o=>{var a,l;return!!((l=(a=t.gates)==null?void 0:a[o])!=null&&l.locked)},this.passable=s,this.fromId=e,this.toId=n,this.goal=this.get(n),this.expanded=0,this.state="running",this.res=null,this.g=new Map([[e,0]]),this.prev=new Map,this.closed=new Set,this.heap=[],this.bestId=e,this.bestH=1/0,!this.goal||this.goal.solid){this.state="fail";return}if(e===n){this.state="done",this.res={cells:[e],length:0};return}const r=this.get(e);if(!r){this.state="fail";return}this._push([this._h(r),e])}_h(t){return Math.hypot(t.cx-this.goal.cx,t.cz-this.goal.cz)}_less(t,e){return t[0]<e[0]||t[0]===e[0]&&t[1]<e[1]}_push(t){const e=this.heap;e.push(t);let n=e.length-1;for(;n>0;){const s=n-1>>1;if(!this._less(e[n],e[s]))break;[e[n],e[s]]=[e[s],e[n]],n=s}}_pop(){const t=this.heap,e=t[0],n=t.pop();if(t.length){t[0]=n;let s=0;for(;;){const r=2*s+1,o=r+1;let a=s;if(r<t.length&&this._less(t[r],t[a])&&(a=r),o<t.length&&this._less(t[o],t[a])&&(a=o),a===s)break;[t[s],t[a]]=[t[a],t[s]],s=a}}return e}_chain(t){const e=[];for(let n=t;n!==void 0;n=this.prev.get(n))e.push(n);return e.reverse(),{cells:e,length:this.g.get(t)}}step(t=1/0){if(this.state!=="running")return this.state;const{g:e,prev:n,closed:s,heap:r,get:o,locked:a,passable:l}=this;let c=t;for(;r.length&&c>0;){const[,u]=this._pop();if(s.has(u))continue;if(u===this.toId)return this.state=!e.has(u)||!n.has(u)?"fail":"done",this.state==="done"&&(this.res=this._chain(u)),this.state;s.add(u),this.expanded++,c--;const p=o(u);if(!p)continue;const h=this._h(p);h<this.bestH&&(this.bestH=h,this.bestId=u);for(let f=0;f<p.neighbors.length;f++){const m=p.neighbors[f];if(s.has(m.id)||m.gate!==void 0&&a(m.gate))continue;const _=o(m.id);if(!_||_.solid||l&&!l(p,f,_))continue;const g=Math.hypot(p.cx-m.mid[0],p.cz-m.mid[1])+Math.hypot(m.mid[0]-_.cx,m.mid[1]-_.cz),d=e.get(u)+g;d<(e.get(m.id)??1/0)&&(e.set(m.id,d),n.set(m.id,u),this._push([d+this._h(_),m.id]))}}return r.length||(this.state="fail"),this.state}result(){return this.res}partial(){return this.bestId===this.fromId?null:this._chain(this.bestId)}}function ch(i,t,{look:e=6}={}){if(i.length<=2)return i.slice();const n=[i[0]];let s=0;for(;s<i.length-1;){let r=Math.min(i.length-1,s+e);for(;r>s+1&&!t(i[s],i[r]);)r--;n.push(i[r]),s=r}return n}const Nn=cn;function uh(i,t,e){const n=t.concat([{lx:e.x,lz:e.z,rx:e.x,rz:e.z}]),s=[];let r=i.x,o=i.z,a=r,l=o,c=r,u=o,p=0,h=0,f=n.length*4+16;for(let d=0;d<n.length&&f-- >0;d++){const M=n[d];if(Us(r,o,c,u,M.rx,M.rz)>=0)if(r===c&&o===u||Us(r,o,a,l,M.rx,M.rz)<0)c=M.rx,u=M.rz,h=d;else{s.push({x:a,z:l}),r=a,o=l;const y=p;a=c=r,l=u=o,p=h=y,d=y;continue}if(Us(r,o,a,l,M.lx,M.lz)<=0)if(r===a&&o===l||Us(r,o,c,u,M.lx,M.lz)>0)a=M.lx,l=M.lz,p=d;else{s.push({x:c,z:u}),r=c,o=u;const y=h;a=c=r,l=u=o,p=h=y,d=y;continue}}s.push({x:e.x,z:e.z});const m=[];let _=i.x,g=i.z;for(const d of s)Math.hypot(d.x-_,d.z-g)<1e-6||(m.push(d),_=d.x,g=d.z);return m.length||m.push({x:e.x,z:e.z}),m}function ko(i,t,e,n){const s=i.locate(e.x,e.z);if(!s)return{ok:!1,reason:"outside"};if(s.solid)return{ok:!1,reason:"solid"};const r=i.settle(e.x,e.z,n);if(!r)return{ok:!1,reason:"cramped"};let o=i.locate(t.x,t.z,t.cell)??i.cell(t.cell);if(!o)return{ok:!1,reason:"unloaded"};if(o.solid&&(o=i.openNear(o,t.x,t.z)),!o)return{ok:!1,reason:"unreachable"};const a=new lh(i.nav,o.id,r.cell,{passable:(l,c)=>i.passable(l,c,n)});return{ok:!0,search:a,goal:r,finish:(l=a.result())=>{if(!l)return{ok:!1,reason:"unreachable"};let c=r;if(l.cells[l.cells.length-1]!==r.cell){const u=i.cell(l.cells[l.cells.length-1]);if(c=u&&i.settle(u.cx,u.cz,n),!c)return{ok:!1,reason:"unreachable"}}return hh(i,t,c,o,l,n)}}}function xn(i,t,e,n,{maxExpand:s=1/0}={}){const r=ko(i,t,e,n);return r.ok?r.search.step(s)==="done"?r.finish():{ok:!1,reason:"unreachable"}:r}function hh(i,t,e,n,s,r){var M;const o=Nn.route,a=[],l=[];for(let y=0;y+1<s.cells.length;y++){const x=i.cell(s.cells[y]);if(!x)return{ok:!1,reason:"unloaded"};let w=null,E=!1;if(x.neighbors.forEach((N,k)=>{if(N.id!==s.cells[y+1])return;const $=i.usable(x,k,r);$&&(!w||$.w>w.w)&&(w=$,E=i.isDoor(x,k))}),!w)return{ok:!1,reason:"unloaded"};const b={x:w.x0,z:w.z0},P={x:w.x1,z:w.z1},S=(w.x0+w.x1)/2,v=(w.z0+w.z1)/2,A=Us(x.cx,x.cz,S,v,b.x,b.z);if(a.push(A>=0?{lx:b.x,lz:b.z,rx:P.x,rz:P.z}:{lx:P.x,lz:P.z,rx:b.x,rz:b.z}),E){const N=w.gate!==void 0?((M=i.nav.gates)==null?void 0:M[w.gate])??null:null;l.push({x0:w.x0,z0:w.z0,x1:w.x1,z1:w.z1,w:w.w,n:(N==null?void 0:N.normal)??null})}}const c=uh(t,a,e),u=[{x:t.x,z:t.z},...c],p=(y,x)=>i.walkClear(y.x,y.z,x.x,x.z,r,n.id),h=ch(u,p,{look:o.pullLook});let f=0;for(let y=1;y<u.length;y++)f+=Math.hypot(u[y].x-u[y-1].x,u[y].z-u[y-1].z);dh(i,h,l,r,p),gh(i,h,r,p),mh(h,p);const m=h.slice(1).map(y=>({x:y.x,z:y.z}));let _=0,g=t.x,d=t.z;for(const y of m)_+=Math.hypot(y.x-g,y.z-d),g=y.x,d=y.z;return{ok:!0,pts:m,cells:s.cells,goal:e,length:_,tautLength:f,rawLength:s.length}}function fh(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=s-e,c=r-n,u=o*c-a*l;if(Math.abs(u)<1e-9)return-1;const p=((e-i.x)*c-(n-i.z)*l)/u,h=((e-i.x)*a-(n-i.z)*o)/u;return p>=0&&p<=1&&h>=0&&h<=1?h:-1}function dh(i,t,e,n,s){const r=Nn.route;for(const o of e)for(let a=0;a+1<t.length;a++){const l=t[a],c=t[a+1],u=fh(l,c,o.x0,o.z0,o.x1,o.z1);if(u<0)continue;const p=(o.x0+o.x1)/2,h=(o.z0+o.z1)/2;if(Math.abs(u-.5)*o.w<r.doorTol||ph(i,l,c,o.x0+(o.x1-o.x0)*u,o.z0+(o.z1-o.z0)*u,n+r.cornerMargin,r.doorLead))break;let f=-(o.z1-o.z0),m=o.x1-o.x0;o.n&&(f=o.n[0],m=o.n[1]);const _=Math.hypot(f,m)||1;f/=_,m/=_,f*(c.x-l.x)+m*(c.z-l.z)<0&&(f=-f,m=-m);const g=n+r.cornerMargin,d=Math.min(.5,g/Math.max(o.w,1e-6)),M=Math.max(d,Math.min(1-d,u)),y=[{x:p,z:h}];Math.abs(M-u)<1e-9&&Math.abs(u-.5)*o.w>=r.doorTol?y.push({x:o.x0+(o.x1-o.x0)*u,z:o.z0+(o.z1-o.z0)*u}):Math.abs(M-.5)>1e-9&&y.push({x:o.x0+(o.x1-o.x0)*M,z:o.z0+(o.z1-o.z0)*M});const x=[];for(const w of y)for(const E of[r.doorLead,r.doorLead*.5,0]){const b={x:w.x,z:w.z,pin:!0};x.push(E>0?[{x:w.x-f*E,z:w.z-m*E,pin:!0},b,{x:w.x+f*E,z:w.z+m*E,pin:!0}]:[b])}for(const w of x){let E=!0,b=l,P=-Math.hypot(c.x-l.x,c.z-l.z),S=null;for(const v of[...w,c]){if(!s(b,v)){E=!1;break}P+=Math.hypot(v.x-b.x,v.z-b.z);const A=Math.atan2(v.x-b.x,v.z-b.z);if(w.length>1&&S!==null&&Math.abs(Hs(S,A))>r.doorTurn){E=!1;break}S=A,b=v}if(E&&P<=r.doorBudget){t.splice(a+1,0,...w);break}}break}}function ph(i,t,e,n,s,r,o){const a=e.x-t.x,l=e.z-t.z,c=Math.hypot(a,l);if(c<1e-6)return!0;const u=a/c,p=l/c,h=(n-t.x)*u+(s-t.z)*p;for(let f=Math.max(0,h-o);f<=Math.min(c,h+o)+1e-9;f+=.25){const m=t.x+u*f,_=t.z+p*f,g=i.locate(m,_);if(g&&i.wallDist(m,_,g)<r)return!1}return!0}function mh(i,t){const e=Nn.route;let n=!0;for(let s=0;n&&s<4;s++){n=!1;for(let r=1;r+1<i.length;r++){const o=i[r-1],a=i[r],l=i[r+1],c=l.x-o.x,u=l.z-o.z,p=c*c+u*u,h=Math.hypot(a.x-o.x,a.z-o.z),f=Math.hypot(l.x-a.x,l.z-a.z);let m=!1;if(p<1e-12)m=!0;else{const _=Fr(((a.x-o.x)*c+(a.z-o.z)*u)/p,0,1);(Math.hypot(a.x-(o.x+_*c),a.z-(o.z+_*u))<=e.tidyLine||Math.min(h,f)<e.tidyShort&&Math.abs(Hs(Math.atan2(a.x-o.x,a.z-o.z),Math.atan2(l.x-a.x,l.z-a.z)))>e.tidySpike)&&(m=!0)}m&&(p<1e-12||t(o,l))&&(i.splice(r,1),r--,n=!0)}}}function gh(i,t,e,n){const s=Nn.route,r=e+s.cornerMargin,o=Math.cos(s.cornerTurn);for(let a=1;a+1<t.length;a++){const l=t[a-1],c=t[a],u=t[a+1];if(c.pin)continue;const p=Math.hypot(c.x-l.x,c.z-l.z),h=Math.hypot(u.x-c.x,u.z-c.z);if(p<1e-6||h<1e-6)continue;const f=(c.x-l.x)/p,m=(c.z-l.z)/p,_=(u.x-c.x)/h,g=(u.z-c.z)/h;if(f*_+m*g>o)continue;const d=i.locate(c.x,c.z);if(!d)continue;const M=i.wallDist(c.x,c.z,d);if(M>=r)continue;let y=f-_,x=m-g;const w=Math.hypot(y,x),E=[];w>1e-6&&E.push([y/w,x/w]);for(let v=0;v<s.cornerRing;v++){const A=v/s.cornerRing*Math.PI*2;E.push([Math.cos(A),Math.sin(A)])}const b=p+h;let P=null,S=M;for(let v=s.cornerStep;v<=s.cornerPush+1e-9&&!(P&&S>=r);v+=s.cornerStep){let A=null,N=1/0,k=0;for(const[$,Q]of E){const K={x:c.x+$*v,z:c.z+Q*v},O=i.locate(K.x,K.z,d.id);if(!O||O.solid||i.blocked(O,K.x,K.z))continue;const H=i.wallDist(K.x,K.z,O);if(H<=S+1e-6)continue;const ot=Math.hypot(K.x-l.x,K.z-l.z)+Math.hypot(u.x-K.x,u.z-K.z)-b,st=H>=r;A&&(A.meets&&!st||A.meets===st&&(st?ot>=N:H<=k))||!n(l,K)||!n(K,u)||(A={q:K,meets:st},N=ot,k=H)}A&&(P=A.q,S=k)}P&&(t[a]=P)}}function Jn(i,t=null){const e={pts:i.pts,i:0,goal:i.goal,bestRem:1/0,stuck:0,age:0,blend:null,p0:t?{x:t.x,z:t.z}:null};return t&&t.speed>.5&&(e.blend={vx:t.vx,vz:t.vz}),e}function Or(i,t,e,n,{arrive:s=!0,cap:r=1/0,chase:o=null}={}){const{reach:a,arriveTol:l,cornerFloor:c,cornerLook:u,stuckTime:p,stuckGain:h}=Nn.route,f=t.pts;for(t.age+=n;t.i<f.length;){const v=f[t.i],A=Math.hypot(v.x-i.x,v.z-i.z),N=t.i===f.length-1;if(A<=(N?l:a)){t.i++;continue}if(!N&&A<=Nn.route.passRadius){const k=t.i>0?f[t.i-1]:t.p0;if(k){const $=v.x-k.x,Q=v.z-k.z,K=$*$+Q*Q;if(K>1e-9&&((i.x-k.x)*$+(i.z-k.z)*Q)/K>=1){t.i++;continue}}}break}if(t.i>=f.length)return{vx:0,vz:0,done:!0,stuck:!1};const m=f[t.i],_=m.x-i.x,g=m.z-i.z,d=Math.hypot(_,g)||1e-9;let M=d;for(let v=t.i;v+1<f.length;v++)M+=Math.hypot(f[v+1].x-f[v].x,f[v+1].z-f[v].z);const y=i.decel;let x=Math.min(e,r);if(s&&(x=Math.min(x,Math.sqrt(2*y*.8*Math.max(0,M-l*.4))+.6)),o&&(x=Math.min(x,o.base+o.gain*M)),t.i<f.length-1&&d<u+i.speed*.15){const v=f[t.i+1],A=v.x-m.x,N=v.z-m.z,k=Math.hypot(A,N)||1,$=_/d*(A/k)+g/d*(N/k),Q=e*Fr(c+(1-c)*Math.max(0,$),c,1);x=Math.min(x,Math.sqrt(Q*Q+2*y*.8*d))}M<t.bestRem-h?(t.bestRem=M,t.stuck=0):x>1&&(t.stuck+=n);const w=t.stuck>p;let E=_/d,b=g/d;if(t.i<f.length-1&&!(o!=null&&o.noLook)){const v=Nn.route,A=Fr(v.look+v.lookSpeed*i.speed,v.look,v.lookMax);if(d<A){let N=A-d,k=m.x,$=m.z;for(let K=t.i;K+1<f.length&&N>0;K++){const O=f[K+1],H=Math.hypot(O.x-f[K].x,O.z-f[K].z),ot=H>1e-9?Math.min(1,N/H):1;k=f[K].x+(O.x-f[K].x)*ot,$=f[K].z+(O.z-f[K].z)*ot,N-=H}const Q=i.world;for(const K of[1,.6,.3,0]){const O=m.x+(k-m.x)*K,H=m.z+($-m.z)*K;if(K>0&&Q&&!Q.walkClear(i.x,i.z,O,H,i.radius,i.cell))continue;const ot=Math.hypot(O-i.x,H-i.z);ot>1e-6&&(E=(O-i.x)/ot,b=(H-i.z)/ot);break}}}let P=E*x,S=b*x;if(t.blend&&t.age<Nn.route.blendTime){const v=t.age/Nn.route.blendTime,A=v*v*(3-2*v);P=t.blend.vx+(P-t.blend.vx)*A,S=t.blend.vz+(S-t.blend.vz)*A}return{vx:P,vz:S,done:!1,stuck:w}}const Ie=cn,_e={vx:0,vz:0},Ys=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z),pn=i=>({x:i.x,z:i.z});class _h{constructor(t,e,n){this.G=t,this.body=e,this.mode="follow",this.order={type:"follow"},this.react=null,this.saved=null,this.patrol=null,this.side=t.rng()<.5?-1:1,this.lead={x:0,z:1},this.chasing=!1,this.slot=null,this.slotTimer=0,this.farTime=0,this.search=null,this.viaCentre=!1,this.stuckLog=[],this.goalCap=1/0,this.arrivedEmitted=!1}command(t){const e=this.G;if(!t||typeof t!="object")return this._reject(t,"bad-order");if(this.body.controlled)return this._reject(t,"controlled");const n=this._apply(t);return n.ok?(this.react=null,this.saved=null,e.emit("order-accepted","companion",{order:this._summary(t)}),{ok:!0}):this._reject(t,n.reason,n)}_summary(t){const e={type:t.type};return t.point&&(e.point=pn(t.point)),t.waypoints&&(e.waypoints=t.waypoints.length),e}_reject(t,e,n={}){return this.G.emit("order-rejected","companion",{order:t&&t.type?this._summary(t):null,reason:e,...n.index!==void 0?{index:n.index}:{}}),{ok:!1,reason:e}}_apply(t){const{world:e}=this.G,n=this.body;switch(t.type){case"follow":return this._set("follow",{type:"follow"}),{ok:!0};case"hold":return this._set("hold",{type:"hold"}),{ok:!0};case"goto":{if(!Ys(t.point))return{ok:!1,reason:"bad-point"};const s=xn(e,n,t.point,n.radius);return s.ok?(this._set("goto",{type:"goto",point:pn(s.goal)}),n._route=Jn(s,n),this.arrivedEmitted=!1,{ok:!0}):{ok:!1,reason:s.reason}}case"patrol":{const s=t.waypoints;if(!Array.isArray(s)||!s.length||s.length>Ie.patrol.maxWaypoints)return{ok:!1,reason:"bad-waypoints"};const r=[];for(let a=0;a<s.length;a++){if(!Ys(s[a]))return{ok:!1,reason:"bad-waypoint",index:a};const l=e.locate(s[a].x,s[a].z);if(!l)return{ok:!1,reason:"outside",index:a};if(l.solid)return{ok:!1,reason:"solid",index:a};const c=e.settle(s[a].x,s[a].z,n.radius);if(!c)return{ok:!1,reason:"cramped",index:a};r.push({x:c.x,z:c.z})}const o=xn(e,n,r[0],n.radius);return o.ok?(this._set("patrol",{type:"patrol",waypoints:r.map(pn),loop:t.loop!==!1}),this.patrol={pts:r,loop:t.loop!==!1,dwell:Number.isFinite(t.dwell)?t.dwell:Ie.patrol.dwell,idx:0,dir:1,wait:0,fails:0},n._route=Jn(o,n),{ok:!0}):{ok:!1,reason:o.reason,index:0}}default:return{ok:!1,reason:"unknown-order"}}}_set(t,e){this.mode=t,this.order=e,this.body._route=null,this.slot=null,this.slotIdeal=null,this.slotTimer=0,this.chasing=!1,t!=="patrol"&&(this.patrol=null)}reactTo(t,e){const n=this.G,s=this.body;if(s.controlled)return!1;const r=()=>{this.mode!=="react"&&(this.saved={mode:this.mode,order:this.order,patrol:this.patrol?{...this.patrol}:null})};switch(t.type){case"goto":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;if(!Ys(o))return!1;const a=xn(n.world,s,o,s.radius);return a.ok?(r(),this.mode="react",this.react={kind:"goto",point:pn(a.goal),giveUp:n.t+Ie.react.giveUp,dwell:Number.isFinite(t.dwell)?t.dwell:Ie.react.dwell,arrivedAt:null},s._route=Jn(a,s),!0):(n.emit("order-rejected","companion",{order:{type:"goto",point:pn(o)},reason:a.reason,source:"trigger"}),!1)}case"face":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;return Ys(o)?(r(),this.mode="react",s._route=null,this.react={kind:"face",until:n.t+Ie.react.face,heading:Math.atan2(o.x-s.x,o.z-s.z)},!0):!1}case"hold":case"follow":case"patrol":{if(t.for>0){r();const a=this.saved;return this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type}).ok?(this.saved=a,this.react={kind:"mode",until:n.t+t.for},this.mode="react",this.reactInner=t.type,!0):(this.saved=null,this.mode==="react"&&(this.mode=a.mode),!1)}const o=this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type});return o.ok?(this.react=null,this.saved=null,!0):(n.emit("order-rejected","companion",{order:{type:t.type},reason:o.reason,source:"trigger"}),!1)}default:return!1}}_restore(){const t=this.saved;if(this.react=null,this.saved=null,this.reactInner=null,this.body._route=null,!t){this.mode="follow",this.order={type:"follow"};return}this.mode=t.mode,this.order=t.order,this.patrol=t.patrol,this.slot=null,this.slotTimer=0,this.G.emit("order-accepted","companion",{order:{type:t.order.type},source:"react-end"})}setControlled(t){const e=this.body;e.controlled=t,e._route=null,this.react=null,this.saved=null,this.patrol=null,t?(this.mode="direct",this.order={type:"direct"}):(this.mode="hold",this.order={type:"hold"}),this.chasing=!1,this.slot=null,this.slotTimer=0}think(t){if(this.body.controlled)return _e;switch(this.mode){case"hold":return this._hold(t);case"goto":return this._goto(t);case"patrol":return this._patrol(t);case"react":return this._react(t);default:return this._follow(t)}}_hold(){this.body._route=null;const t=this.G.bodies.avatar;return Math.hypot(t.x-this.body.x,t.z-this.body.z)<9&&(this.body._face=Math.atan2(t.x-this.body.x,t.z-this.body.z)),_e}_drive(t,e){const n=this.body,s=Or(n,n._route,n.spec.speed,t,e);return s.done?(n._route=null,{vx:0,vz:0,done:!0}):s.stuck?(this._stuck(),{vx:0,vz:0,stuck:!0}):s}_goto(t){const e=this.body;if(!e._route){const s=xn(this.G.world,e,this.order.point,e.radius);if(!s.ok)return this.G.emit("order-rejected","companion",{order:{type:"goto"},reason:s.reason,source:"replan"}),this._set("hold",{type:"hold"}),_e;e._route=Jn(s,e)}const n=this._drive(t);return n.done?(this.G.emit("companion-arrived","companion",{mode:"goto",point:pn(this.order.point)}),this.mode="hold",this.order={type:"hold",arrivedAt:pn(this.order.point)},_e):n}_patrol(t){const e=this.patrol,n=this.body,s=this.G;if(!e)return this._set("hold",{type:"hold"}),_e;if(e.wait>0)return e.wait-=t,_e;if(!n._route){const o=xn(s.world,n,e.pts[e.idx],n.radius);if(!o.ok)return++e.fails>=e.pts.length?(s.emit("order-rejected","companion",{order:{type:"patrol"},reason:"patrol-unreachable",source:"replan"}),this._set("hold",{type:"hold"}),_e):(this._advance(),_e);e.fails=0,n._route=Jn(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"patrol",index:e.idx,point:pn(e.pts[e.idx])}),e.wait=e.dwell,this._advance(),_e):r}_advance(){const t=this.patrol,e=t.pts.length;e!==1&&(t.loop?t.idx=(t.idx+1)%e:(t.idx+=t.dir,t.idx>=e?(t.dir=-1,t.idx=e-2):t.idx<0&&(t.dir=1,t.idx=1)))}_react(t){const e=this.react,n=this.body,s=this.G;if(!e)return this._restore(),_e;if(e.kind==="face")return n._face=e.heading,s.t>=e.until&&this._restore(),_e;if(e.kind==="mode"){if(s.t>=e.until)return this._restore(),_e;this.mode=this.reactInner;const o=this.think(t);return this.mode!==this.reactInner&&(this.reactInner="hold"),this.mode="react",o}if(e.arrivedAt!==null)return s.t-e.arrivedAt>=e.dwell&&this._restore(),_e;if(s.t>e.giveUp)return this._restore(),_e;if(!n._route){const o=xn(s.world,n,e.point,n.radius);if(!o.ok)return this._restore(),_e;n._route=Jn(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"react",point:pn(e.point)}),e.arrivedAt=s.t,_e):r}_follow(t){const e=this.G,n=this.body,s=Ie.follow,r=e.world,o=e.bodies.avatar,a=o.x-n.x,l=o.z-n.z,c=Math.hypot(a,l);if(o.speed>.8){const m=Math.min(1,6*t),_=this.lead.x+(o.vx/o.speed-this.lead.x)*m,g=this.lead.z+(o.vz/o.speed-this.lead.z)*m,d=Math.hypot(_,g)||1;this.lead={x:_/d,z:g/d}}this.farTime=c>s.blinkDistance?this.farTime+t:0,this.search&&this._stepSearch(o);const u=r.cell(n.cell),p=c>1.6&&r.inDoorway(n.x,n.z,u,s.doorClear*.7);if(!this.chasing&&(c>s.start||p)&&(this.chasing=!0,this.slotTimer=0),this.slotTimer-=t,this.chasing&&this.slotTimer<=0&&!this.search&&(!n._route||this._stale(o,c))){this.slotTimer=s.reslot;const m=this._chooseSlot(o,c);m?this._adopt(m):this._beginSearch(o)}if(!this.chasing)return n._route=null,n._face=Math.atan2(a,l),_e;if(!n._route)return _e;const h=c>s.catchup,f=Or(n,n._route,h?n.spec.catchupSpeed:n.spec.speed,t,{arrive:!1,chase:{base:Math.min(o.speed*1.05,n.spec.speed)+.5,gain:3}});return f.done?(n._route=null,c<s.stop&&o.speed<.5&&(this.chasing=!1,e.emit("companion-arrived","companion",{mode:"follow",point:pn(this.slot??n)})),_e):f.stuck?(this._stuck(),_e):f}_predict(t){const e=Ie.follow,n=this.G.world;if(t.speed<.8)return{x:t.x,z:t.z};const s=t.x+t.vx*e.lead,r=t.z+t.vz*e.lead;return n.walkClear(t.x,t.z,s,r,this.body.radius,t.cell)?{x:s,z:r}:{x:t.x,z:t.z}}_ideal(t){const e=Ie.follow,n=this.lead.x,s=this.lead.z;return{x:t.x-n*e.distance+-s*e.lateral*this.side,z:t.z-s*e.distance+n*e.lateral*this.side}}_stale(t,e=0){const n=Ie.follow,s=this.body._route;if(!s||!this.slotIdeal)return!0;const r=this._ideal(this._predict(t));return Math.hypot(r.x-this.slotIdeal.x,r.z-this.slotIdeal.z)>n.replanDist*Math.max(1,e/n.farScale)?!0:s.age>n.reslotMax&&t.speed>.5}_chooseSlot(t,e){const n=this.G,s=this.body,r=Ie.follow,o=n.world,a=this.lead.x,l=this.lead.z,c=-l,u=a,p=this._predict(t);this.slotIdeal=this._ideal(p);const h=[],f=(x,w,E)=>h.push({x:p.x+x,z:p.z+w,tag:E}),m=-a*r.distance,_=-l*r.distance;f(m+c*r.lateral*this.side,_+u*r.lateral*this.side),f(m-c*r.lateral*this.side,_-u*r.lateral*this.side,"mirror"),f(m,_);const g=h[0],d=[];for(const x of[1.1,2.2,3.4])for(let w=0;w<8;w++){const E=w/8*Math.PI*2;d.push({x:g.x+Math.cos(E)*x,z:g.z+Math.sin(E)*x,tag:"ring"})}d.sort((x,w)=>Math.hypot(x.x-g.x,x.z-g.z)-Math.hypot(w.x-g.x,w.z-g.z)),h.push(...d);let M=0;for(const x of h){const w=o.locate(x.x,x.z);if(!w||w.solid||o.wallDist(x.x,x.z,w)<s.radius+r.wallClear||o.inDoorway(x.x,x.z,w,r.doorClear))continue;const E=Math.hypot(x.x-t.x,x.z-t.z);if(E<t.radius+s.radius+.8||E>r.start-.8)continue;if(++M>3)break;const b=xn(o,s,x,s.radius,{maxExpand:r.slotBudget});if(b.ok&&Math.hypot(b.goal.x-x.x,b.goal.z-x.z)<1.5)return x.tag==="mirror"&&(this.side=-this.side),b}const y=xn(o,s,{x:t.x,z:t.z},s.radius,{maxExpand:r.slotBudget*5});return y.ok?this._stopShort(y,t,r.distance*.8):null}_adopt(t){const e=this.body,n=this.G,s=n.world;if(this.viaCentre){this.viaCentre=!1;const r=s.cell(e.cell),o=r&&s.settle(r.cx,r.cz,e.radius);o&&s.walkClear(e.x,e.z,o.x,o.z,e.radius,r.id)&&(t={...t,pts:[{x:o.x,z:o.z},...t.pts]})}this.slot=t.goal,e._route=Jn(t,e),n.stats.replans++}_beginSearch(t){const e=this.G,n=this.body,s=Ie.follow,r=this._predict(t);this.slotIdeal=this._ideal(r);let o=ko(e.world,n,r,n.radius);if(o.ok||(o=ko(e.world,n,{x:t.x,z:t.z},n.radius)),!o.ok){this.slotTimer=s.retry;return}this.search={sp:o,leader:{x:t.x,z:t.z}}}_stepSearch(t){this.G;const e=Ie.follow;this.body;const n=this.search,s=n.sp.search;let r=s.step(e.searchStep);if(r==="running"&&s.expanded>e.searchMax&&(r="fail"),r==="running")return;this.search=null;let o=null;if(r==="done")o=n.sp.finish();else{const a=s.partial();a&&a.cells.length>1&&(o=n.sp.finish(a)),this.slotTimer=Math.max(this.slotTimer,e.retry)}o&&o.ok&&this._adopt(Math.hypot(o.goal.x-t.x,o.goal.z-t.z)<1.5?this._stopShort(o,t,e.distance*.8):o)}_stopShort(t,e,n){const s=t.pts;let r=this.body.x,o=this.body.z;for(let a=0;a<s.length;a++){const l=s[a];if(Math.hypot(l.x-e.x,l.z-e.z)<n){let c=0,u=1;for(let f=0;f<14;f++){const m=(c+u)/2;Math.hypot(r+(l.x-r)*m-e.x,o+(l.z-o)*m-e.z)<n?u=m:c=m}const p={x:r+(l.x-r)*c,z:o+(l.z-o)*c},h=s.slice(0,a);return h.push(p),{...t,pts:h,goal:{...t.goal,x:p.x,z:p.z}}}r=l.x,o=l.z}return t}_stuck(){const t=this.G,e=this.body,n=this.stuckLog;for(n.push(t.t);n.length&&t.t-n[0]>Ie.recovery.window;)n.shift();const s=n.length;if(e._route=null,this.slotTimer=0,s===1){t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z});return}if(s===2){const r=t.world.cell(e.cell);t.world.settle(r.cx,r.cz,e.radius)&&(this.viaCentre=!0),t.emit("companion-stuck-recovered","companion",{method:"detour",x:e.x,z:e.z});return}n.length=0,this.mode==="follow"?t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z}):(t.emit("companion-stuck-recovered","companion",{method:"skip",x:e.x,z:e.z}),this.mode==="patrol"?this._advance():this.mode==="goto"?this._set("hold",{type:"hold"}):this.mode==="react"&&this._restore())}_blink(t){const e=this.G,n=this.body,s=e.bodies.avatar,r=e.world.settle(s.x-this.lead.x*Ie.follow.distance,s.z-this.lead.z*Ie.follow.distance,n.radius,Ie.follow.wallClear)??e.world.settle(s.x,s.z,n.radius);r&&(n.teleport(r),this.farTime=0,this.chasing=!1,e.stats.blinks++,e.emit("companion-stuck-recovered","companion",{method:"resync",why:t,x:n.x,z:n.z}))}}const $s=cn.triggers,xh=new Set(["enter-cell","avatar-distance","noise","sighted","interval","avatar-stopped"]),vh=new Set(["goto","hold","follow","patrol","face","emit"]),fl=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z);function Mh(i){if(!i||typeof i!="object")return"not-an-object";const t=i.when,e=i.do;return!t||!xh.has(t.type)?"bad-when":!e||!vh.has(e.type)?"bad-do":t.type==="enter-cell"&&!(Array.isArray(t.cells)&&t.cells.length)&&t.sector===void 0?"enter-cell-needs-cells-or-sector":t.type==="avatar-distance"&&!(Number.isFinite(t.lt)||Number.isFinite(t.gt))?"avatar-distance-needs-lt-or-gt":t.type==="noise"&&!(t.radius>0)?"noise-needs-radius":t.type==="interval"&&!(t.every>0)?"interval-needs-every":t.type==="avatar-stopped"&&!(t.for>0)?"avatar-stopped-needs-for":(e.type==="goto"||e.type==="face")&&!fl(e.point)&&e.point!=="source"?"action-needs-point":e.type==="patrol"&&!(Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(fl))?"patrol-needs-waypoints":e.type==="emit"&&(typeof e.event!="string"||!e.event)?"emit-needs-event":e.point==="source"&&t.type!=="noise"&&t.type!=="sighted"?"source-needs-noise-or-sighted":null}class yh{constructor(){this.rules=[],this.state=new Map,this.signals=[],this.auto=0}set(t,e){const n=[],s=[],r=[],o=new Map;for(const a of Array.isArray(t)?t:[]){const l=(a==null?void 0:a.id)??`rule-${++this.auto}`,c=r.length>=$s.maxRules?"too-many-rules":Mh(a);if(c){s.push({id:l,reason:c});continue}const u={id:l,when:a.when,do:a.do,repeat:a.repeat?a.repeat===!0?$s.repeat:Number(a.repeat):0,once:!!a.once,enabled:a.enabled!==!1},p=JSON.stringify(u.when),h=this.state.get(l);o.set(l,h&&h.key===p?h:{key:p,fired:0,last:-1/0,was:null,latched:!1,nextAt:e+(u.when.every??0),done:!1,stopped:0}),r.push(u),n.push(l)}return this.rules=r,this.state=o,{accepted:n,rejected:s}}signal(t){this.signals.length<$s.maxSignals&&this.signals.push(t)}describe(){return this.rules.map(t=>{const e=this.state.get(t.id);return{id:t.id,type:t.when.type,enabled:t.enabled,fired:e.fired,last:Number.isFinite(e.last)?e.last:null,active:!!e.was||e.latched}})}tick(t){const e=[],{t:n,dt:s}=t,r=Math.hypot(t.avatar.x-t.companion.x,t.avatar.z-t.companion.z),o=t.avatar.speed<.1,a=this.signals;this.signals=[];for(const l of this.rules){if(e.length>=$s.maxFiresPerTick)break;const c=this.state.get(l.id),u=l.when;let p=!1,h=null,f=null;switch(u.type){case"enter-cell":{const m=t.cellChange;if(m){const _=g=>u.cells?u.cells.includes(g.id):u.sector!==void 0&&t.sectorOf(g)===u.sector;p=!_(m.from)&&_(m.to)}break}case"avatar-distance":f=Number.isFinite(u.lt)?r<u.lt:r>u.gt;break;case"avatar-stopped":c.stopped=o?c.stopped+s:0,f=c.stopped>=u.for;break;case"interval":n>=c.nextAt&&(p=!0,c.nextAt=n+u.every);break;case"noise":for(const m of a){if(m.type!=="noise")continue;if(Math.hypot(m.x-t.companion.x,m.z-t.companion.z)<=Math.min(u.radius,m.radius??1/0)){p=!0,h=m;break}}break;case"sighted":for(const m of a)if(m.type==="sighted"&&(u.target===void 0||u.target===m.target)){p=!0,h=m;break}break}if(f!==null)if(c.was===null)c.was=f;else{const m=f&&!c.was,_=l.repeat>0&&f&&c.was&&n-c.last>=l.repeat;p=m||_,c.was=f}!l.enabled||c.done||p&&(c.fired++,c.last=n,l.once&&(c.done=!0),e.push({rule:l,signal:h}))}return e}}const Ae=cn,Re=i=>Math.round(i*1e3)/1e3;function mx(i,{spawnCell:t,seed:e=1,tuning:n={}}={}){const s=ah(i),r=Ju(e),o={ticks:0,substeps:0,contacts:0,violations:0,blinks:0,replans:0},a=[];let l=0,c=0,u=0;const p={world:s,rng:r,stats:o,bodies:null,get t(){return l},emit(V,gt,mt){a.push({t:Re(l),type:V,actor:gt,...mt}),a.length>Ae.events.max&&a.shift()}},h=V=>V==null?null:typeof V=="object"?V:s.cell(V);let f=h(t)??h(i.startCell);if((!f||f.solid)&&(f=(f==null?void 0:f.neighbors.map(V=>s.cell(V.id)).find(V=>!V.solid))??null),!f)throw new Error("createActors: no open spawn cell");const m={...Ae.avatar,...n.avatar},_={...Ae.companion,...n.companion},g=s.settle(f.cx,f.cz,m.radius,.2);if(!g)throw new Error("createActors: spawn cell has no room");const d=new cl("avatar",m,g);let M=null;for(const[V,gt]of[[-1.7,1.2],[1.7,1.2],[-1.7,-1.2],[1.7,-1.2],[0,2.6],[0,-2.6],[3.2,0],[-3.2,0]]){const mt=s.settle(g.x+V,g.z+gt,_.radius,.1);if(mt&&Math.hypot(mt.x-g.x,mt.z-g.z)>=m.radius+_.radius+.4){M=mt;break}}if(!M)throw new Error("createActors: no room for the companion");const y=new cl("companion",_,M);d.world=y.world=s,p.bodies={avatar:d,companion:y},d.controlled=!0,d.mode="direct",y.mode="follow";const x=new _h(p,y,e),w=new yh,E=V=>p.bodies[V];let b={ax:0,az:0,run:!1,aim:null,stop:!1};const P={avatar:null,companion:null};let S=d.cell,v=k(s.cell(d.cell)),A=0;const N=Math.atan2(y.x-d.x,y.z-d.z);d.heading=d.pheading=N,y.heading=y.pheading=N+Math.PI;function k(V){var gt,mt;return V.sector??((mt=(gt=i.sectorAt)==null?void 0:gt.call(i,V.cx,V.cz))==null?void 0:mt.id)}const $=()=>d.controlled?d:y;function Q(V,gt,mt,{quiet:Et=!1}={}){const Ut=Yt=>(Et||p.emit("order-rejected",V.id,{order:{type:"moveTo",point:{x:gt,z:mt}},reason:Yt}),{ok:!1,reason:Yt});if(!Number.isFinite(gt)||!Number.isFinite(mt))return Ut("bad-point");const Y=xn(s,V,{x:gt,z:mt},V.radius);return Y.ok?(V._route=Jn(Y,V),V._replans=0,Et||p.emit("order-accepted",V.id,{order:{type:"moveTo",point:{x:Re(Y.goal.x),z:Re(Y.goal.z)}}}),{ok:!0,target:{x:Y.goal.x,z:Y.goal.z},length:Y.length}):Ut(Y.reason)}function K(V,gt){if(d.controlled&&(b.ax||b.az)){const mt=xn(s,d,{x:V,z:gt},d.radius);return mt.ok?(P.avatar={x:V,z:gt},p.emit("order-accepted","avatar",{order:{type:"moveTo",point:{x:V,z:gt}},deferred:!0}),{ok:!0,deferred:!0}):(p.emit("order-rejected","avatar",{order:{type:"moveTo",point:{x:V,z:gt}},reason:mt.reason}),{ok:!1,reason:mt.reason})}return Q(d,V,gt)}function O(V){const gt=x.command(V);return y.mode=x.mode,gt}function H(V){if(V!=="avatar"&&V!=="companion")return{ok:!1,reason:"unknown-actor"};if(E(V).controlled)return{ok:!0,unchanged:!0};const mt=$();return mt._route=null,P.avatar=P.companion=null,mt===d?(d.controlled=!1,d.mode="hold",x.setControlled(!0)):(x.setControlled(!1),d.controlled=!0,d.mode="direct"),y.mode=x.mode,p.emit("control-changed",V,{from:mt.id}),{ok:!0}}function ot(V){const gt=w.set(V,l);for(const mt of gt.rejected)p.emit("order-rejected","companion",{rule:mt.id,reason:mt.reason});return gt}function st(V,gt){const mt=V.spec,Et=b.ax!==0||b.az!==0,Ut=b.run?mt.runSpeed??mt.catchupSpeed??mt.speed:mt.speed;if(Et)return V._route=null,{vx:b.ax*Ut,vz:b.az*Ut};const Y=P[V.id];if(Y&&(P[V.id]=null,Q(V,Y.x,Y.z,{quiet:!0})),b.stop)return V._route=null,{vx:0,vz:0};if(!V._route)return{vx:0,vz:0};const Yt=Or(V,V._route,Ut,gt);if(Yt.done){const wt=V._route.goal;return V._route=null,p.emit(`${V.id}-arrived`,V.id,{mode:"moveTo",point:{x:Re(wt.x),z:Re(wt.z)}}),{vx:0,vz:0}}if(Yt.stuck){const wt=V._route.goal;return V._replans=(V._replans??0)+1,V._replans<=1?Q(V,wt.x,wt.z,{quiet:!0}):(V._route=null,p.emit("avatar-blocked",V.id,{x:Re(V.x),z:Re(V.z),reason:"stuck"})),{vx:0,vz:0}}return Yt}function vt(V,gt,mt){const Et=V.x-gt.x,Ut=V.z-gt.z,Y=Math.hypot(Et,Ut),Yt=V.radius+gt.radius+Ae.separation.gap;if(Y>=Yt)return;const wt=Y>1e-6?Et/Y:1,xt=Y>1e-6?Ut/Y:0,yt=Ae.separation.push*(1-Y/Yt);mt.vx+=wt*yt,mt.vz+=xt*yt}function St(V,gt){let mt=null,Et=0;V.controlled&&b.aim?mt=Math.atan2(b.aim.x-V.x,b.aim.z-V.z):V.speed>Ae.facing.minSpeed?(mt=Math.hypot(V._want.x,V._want.z)>.5?Math.atan2(V._want.x,V._want.z):Math.atan2(V.vx,V.vz),Et=Ae.facing.tau):V._face!=null&&(mt=V._face),V._face=null,mt!==null&&Number.isFinite(mt)&&V.face(gt,mt,Et)}function Pt(V){l+=V,o.ticks++,u++;for(const wt of[d,y])wt.px=wt.x,wt.pz=wt.z,wt.pheading=wt.heading;b.run&&$().speed>1?(A+=V,A>=Ae.noise.runEvery&&(A=0,w.signal({type:"noise",x:$().x,z:$().z,radius:Ae.noise.run,source:$().id}))):A=0;const gt=s.live(d.cell),mt=s.live(y.cell);let Et={vx:0,vz:0};gt&&(Et=d.controlled?st(d,V):d._route?lt(d,V):Et,!d.controlled&&mt&&vt(d,y,Et)),d.step(s,o,V,Et.vx,Et.vz),St(d,V);let Ut;mt?y.controlled?Ut=st(y,V):!gt&&x.mode==="follow"?Ut={vx:0,vz:0}:(Ut=x.think(V),Ut={vx:Ut.vx,vz:Ut.vz},gt&&vt(y,d,Ut)):Ut={vx:0,vz:0},y.step(s,o,V,Ut.vx,Ut.vz),St(y,V),y.mode=x.mode;let Y=null;if(d.cell!==S){const wt=s.cell(S),xt=s.cell(d.cell);p.emit("avatar-entered-cell","avatar",{cell:d.cell,from:S});const yt=xt?k(xt):void 0;yt!==void 0&&yt!==v&&(p.emit("avatar-entered-sector","avatar",{sector:yt,from:v}),v=yt),Y={from:wt,to:xt},S=d.cell}for(const wt of[d,y])wt._blocked>.3&&!wt._blockedFired&&wt.controlled&&(wt._blockedFired=!0,p.emit("avatar-blocked",wt.id,{x:Re(wt.x),z:Re(wt.z)}));const Yt=w.tick({t:l,dt:V,avatar:d,companion:y,cellChange:Y,sectorOf:k});for(const wt of Yt){const xt=wt.rule.do,yt=y.controlled&&xt.type!=="emit";p.emit("trigger-fired","companion",{rule:wt.rule.id,when:wt.rule.when.type,...wt.signal?{at:{x:Re(wt.signal.x),z:Re(wt.signal.z)}}:{},...yt?{ignored:"controlled"}:{}}),xt.type==="emit"?p.emit(String(xt.event),"companion",{rule:wt.rule.id}):yt||x.reactTo(xt,wt.signal)}y.mode=x.mode}function lt(V,gt){const mt=Or(V,V._route,V.spec.speed,gt);if(mt.done){const Et=V._route.goal;return V._route=null,p.emit(`${V.id}-arrived`,V.id,{mode:"moveTo",point:{x:Re(Et.x),z:Re(Et.z)}}),{vx:0,vz:0}}return mt.stuck?(V._route=null,p.emit("avatar-blocked",V.id,{x:Re(V.x),z:Re(V.z),reason:"stuck"}),{vx:0,vz:0}):mt}function Mt(V,gt={}){var Yt,wt;if(!(V>0))return;V=Math.min(V,Ae.maxFrame);let mt=Number((Yt=gt.axis)==null?void 0:Yt.x)||0,Et=Number((wt=gt.axis)==null?void 0:wt.z)||0;const Ut=Math.hypot(mt,Et);if(Ut<.05?mt=Et=0:Ut>1&&(mt/=Ut,Et/=Ut),b={ax:mt,az:Et,run:!!gt.run,aim:gt.aim&&Number.isFinite(gt.aim.x)&&Number.isFinite(gt.aim.z)?gt.aim:null,stop:!!gt.stop},gt.moveTo){const xt=$();xt===d?K(gt.moveTo.x,gt.moveTo.z):mt||Et?P[xt.id]={x:gt.moveTo.x,z:gt.moveTo.z}:Q(xt,gt.moveTo.x,gt.moveTo.z)}c+=V;let Y=Math.floor(c/Ae.tick+1e-9);for(c-=Y*Ae.tick,c<0&&(c=0);Y-- >0;)Pt(Ae.tick)}function Tt(V,gt=c/Ae.tick){const mt=E(V);if(!mt)return null;const Et=Math.min(1,Math.max(0,gt)),Ut=Hs(mt.pheading,mt.heading);return{x:mt.px+(mt.x-mt.px)*Et,z:mt.pz+(mt.z-mt.pz)*Et,heading:mt.pheading+Ut*Et,vx:mt.vx,vz:mt.vz,speed:mt.speed,moving:mt.moving}}function pt(V){const gt=V.pub();return gt.mode=V.mode,gt.moving=V.moving,gt.render=Tt(V.id),gt}return{avatar:d,companion:y,update:Mt,pose:Tt,get alpha(){return c/Ae.tick},tickLength:Ae.tick,commandAvatarTo:K,commandCompanion:O,possess:H,setStandingOrders:ot,signal(V){return!V||!Number.isFinite(V.x)||!Number.isFinite(V.z)||V.type!=="noise"&&V.type!=="sighted"?!1:(w.signal({...V}),!0)},drainEvents(){const V=a.slice();return a.length=0,V},snapshot(){const V=pt(y);return V.order=x.order,V.react=x.react?{...x.react}:null,x.mode==="follow"&&(V.follow={state:x.chasing?"heading":"formed",planning:!!x.search}),x.mode==="patrol"&&x.patrol&&(V.patrol={index:x.patrol.idx,loop:x.patrol.loop,count:x.patrol.pts.length}),{t:Re(l),tick:u,alpha:Re(c/Ae.tick),controlled:$().id,avatar:pt(d),companion:JSON.parse(JSON.stringify(V)),rules:w.describe(),stats:{...o}}},path(V){const gt=V==="avatar"?d:V==="companion"?y:null,mt=gt==null?void 0:gt._route;return mt?mt.pts.slice(mt.i).map(Et=>({x:Et.x,z:Et.z})):[]},world:s,get time(){return l},get controlledId(){return $().id}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Da="170",Sh=0,dl=1,bh=2,jc=1,Eh=2,In=3,oi=0,qe=1,ge=2,On=0,ts=1,Ge=2,pl=3,ml=4,wh=5,vi=100,Th=101,Ah=102,Rh=103,Ch=104,Ph=200,Lh=201,Dh=202,Ih=203,Go=204,Ho=205,Uh=206,zh=207,Nh=208,Fh=209,Oh=210,Bh=211,kh=212,Gh=213,Hh=214,Vo=0,Wo=1,Xo=2,ss=3,qo=4,Yo=5,$o=6,jo=7,Ia=0,Vh=1,Wh=2,ri=0,Kc=1,Zc=2,Jc=3,Qc=4,Xh=5,tu=6,eu=7,nu=300,rs=301,os=302,Ko=303,Zo=304,Xr=306,Br=1e3,yi=1001,Jo=1002,Je=1003,qh=1004,js=1005,hn=1006,eo=1007,Si=1008,En=1009,iu=1010,su=1011,Bs=1012,Ua=1013,Ti=1014,yn=1015,bn=1016,za=1017,Na=1018,as=1020,ru=35902,ou=1021,au=1022,fn=1023,lu=1024,cu=1025,es=1026,ls=1027,qr=1028,Fa=1029,uu=1030,Oa=1031,Ba=1033,Pr=33776,Lr=33777,Dr=33778,Ir=33779,Qo=35840,ta=35841,ea=35842,na=35843,ia=36196,sa=37492,ra=37496,oa=37808,aa=37809,la=37810,ca=37811,ua=37812,ha=37813,fa=37814,da=37815,pa=37816,ma=37817,ga=37818,_a=37819,xa=37820,va=37821,Ur=36492,Ma=36494,ya=36495,hu=36283,Sa=36284,ba=36285,Ea=36286,Yh=3200,$h=3201,fu=0,jh=1,ei="",Ke="srgb",hs="srgb-linear",Yr="linear",oe="srgb",Di=7680,gl=519,Kh=512,Zh=513,Jh=514,du=515,Qh=516,tf=517,ef=518,nf=519,wa=35044,_l=35048,xl="300 es",Fn=2e3,kr=2001;class fs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Ue=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let vl=1234567;const ns=Math.PI/180,ks=180/Math.PI;function Bn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ue[i&255]+Ue[i>>8&255]+Ue[i>>16&255]+Ue[i>>24&255]+"-"+Ue[t&255]+Ue[t>>8&255]+"-"+Ue[t>>16&15|64]+Ue[t>>24&255]+"-"+Ue[e&63|128]+Ue[e>>8&255]+"-"+Ue[e>>16&255]+Ue[e>>24&255]+Ue[n&255]+Ue[n>>8&255]+Ue[n>>16&255]+Ue[n>>24&255]).toLowerCase()}function Ne(i,t,e){return Math.max(t,Math.min(e,i))}function ka(i,t){return(i%t+t)%t}function sf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function rf(i,t,e){return i!==t?(e-i)/(t-i):0}function Fs(i,t,e){return(1-e)*i+e*t}function of(i,t,e,n){return Fs(i,t,1-Math.exp(-e*n))}function af(i,t=1){return t-Math.abs(ka(i,t*2)-t)}function lf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function cf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function uf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function hf(i,t){return i+Math.random()*(t-i)}function ff(i){return i*(.5-Math.random())}function df(i){i!==void 0&&(vl=i);let t=vl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function pf(i){return i*ns}function mf(i){return i*ks}function gf(i){return(i&i-1)===0&&i!==0}function _f(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function xf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vf(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),u=o((t+n)/2),p=r((t-n)/2),h=o((t-n)/2),f=r((n-t)/2),m=o((n-t)/2);switch(s){case"XYX":i.set(a*u,l*p,l*h,a*c);break;case"YZY":i.set(l*h,a*u,l*p,a*c);break;case"ZXZ":i.set(l*p,l*h,a*u,a*c);break;case"XZX":i.set(a*u,l*m,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*m,a*c);break;case"ZYZ":i.set(l*m,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function un(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ae(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Un={DEG2RAD:ns,RAD2DEG:ks,generateUUID:Bn,clamp:Ne,euclideanModulo:ka,mapLinear:sf,inverseLerp:rf,lerp:Fs,damp:of,pingpong:af,smoothstep:lf,smootherstep:cf,randInt:uf,randFloat:hf,randFloatSpread:ff,seededRandom:df,degToRad:pf,radToDeg:mf,isPowerOfTwo:gf,ceilPowerOfTwo:_f,floorPowerOfTwo:xf,setQuaternionFromProperEuler:vf,normalize:ae,denormalize:un};class Vt{constructor(t=0,e=0){Vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jt{constructor(t,e,n,s,r,o,a,l,c){jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],p=n[7],h=n[2],f=n[5],m=n[8],_=s[0],g=s[3],d=s[6],M=s[1],y=s[4],x=s[7],w=s[2],E=s[5],b=s[8];return r[0]=o*_+a*M+l*w,r[3]=o*g+a*y+l*E,r[6]=o*d+a*x+l*b,r[1]=c*_+u*M+p*w,r[4]=c*g+u*y+p*E,r[7]=c*d+u*x+p*b,r[2]=h*_+f*M+m*w,r[5]=h*g+f*y+m*E,r[8]=h*d+f*x+m*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],p=u*o-a*c,h=a*l-u*r,f=c*r-o*l,m=e*p+n*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=p*_,t[1]=(s*c-u*n)*_,t[2]=(a*n-s*o)*_,t[3]=h*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(no.makeScale(t,e)),this}rotate(t){return this.premultiply(no.makeRotation(-t)),this}translate(t,e){return this.premultiply(no.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const no=new jt;function pu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Mf(){const i=Gr("canvas");return i.style.display="block",i}const Ml={};function zs(i){i in Ml||(Ml[i]=!0,console.warn(i))}function yf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Sf(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function bf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const te={enabled:!0,workingColorSpace:hs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===oe&&(i.r=kn(i.r),i.g=kn(i.g),i.b=kn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===oe&&(i.r=is(i.r),i.g=is(i.g),i.b=is(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ei?Yr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function kn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function is(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const yl=[.64,.33,.3,.6,.15,.06],Sl=[.2126,.7152,.0722],bl=[.3127,.329],El=new jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),wl=new jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);te.define({[hs]:{primaries:yl,whitePoint:bl,transfer:Yr,toXYZ:El,fromXYZ:wl,luminanceCoefficients:Sl,workingColorSpaceConfig:{unpackColorSpace:Ke},outputColorSpaceConfig:{drawingBufferColorSpace:Ke}},[Ke]:{primaries:yl,whitePoint:bl,transfer:oe,toXYZ:El,fromXYZ:wl,luminanceCoefficients:Sl,outputColorSpaceConfig:{drawingBufferColorSpace:Ke}}});let Ii;class Ef{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ii===void 0&&(Ii=Gr("canvas")),Ii.width=t.width,Ii.height=t.height;const n=Ii.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ii}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Gr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=kn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(kn(e[n]/255)*255):e[n]=kn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let wf=0;class mu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:wf++}),this.uuid=Bn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(io(s[o].image)):r.push(io(s[o]))}else r=io(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function io(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ef.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Tf=0;class Fe extends fs{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,n=yi,s=yi,r=hn,o=Si,a=fn,l=En,c=Fe.DEFAULT_ANISOTROPY,u=ei){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Tf++}),this.uuid=Bn(),this.name="",this.source=new mu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Br:t.x=t.x-Math.floor(t.x);break;case yi:t.x=t.x<0?0:1;break;case Jo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Br:t.y=t.y-Math.floor(t.y);break;case yi:t.y=t.y<0?0:1;break;case Jo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=nu;Fe.DEFAULT_ANISOTROPY=1;class ee{constructor(t=0,e=0,n=0,s=1){ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],p=l[8],h=l[1],f=l[5],m=l[9],_=l[2],g=l[6],d=l[10];if(Math.abs(u-h)<.01&&Math.abs(p-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,x=(f+1)/2,w=(d+1)/2,E=(u+h)/4,b=(p+_)/4,P=(m+g)/4;return y>x&&y>w?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=E/n,r=b/n):x>w?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=P/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=b/r,s=P/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(p-_)*(p-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(p-_)/M,this.z=(h-u)/M,this.w=Math.acos((c+f+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Af extends fs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ee(0,0,t,e),this.scissorTest=!1,this.viewport=new ee(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Fe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new mu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class sn extends Af{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gu extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Rf extends Fe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Je,this.minFilter=Je,this.wrapR=yi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ai{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],p=n[s+3];const h=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=p;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(p!==_||l!==h||c!==f||u!==m){let g=1-a;const d=l*h+c*f+u*m+p*_,M=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const w=Math.sqrt(y),E=Math.atan2(w,d*M);g=Math.sin(g*E)/w,a=Math.sin(a*E)/w}const x=a*M;if(l=l*g+h*x,c=c*g+f*x,u=u*g+m*x,p=p*g+_*x,g===1-a){const w=1/Math.sqrt(l*l+c*c+u*u+p*p);l*=w,c*=w,u*=w,p*=w}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],p=r[o],h=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+u*p+l*f-c*h,t[e+1]=l*m+u*h+c*p-a*f,t[e+2]=c*m+u*f+a*h-l*p,t[e+3]=u*m-a*p-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),p=a(r/2),h=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=h*u*p+c*f*m,this._y=c*f*p-h*u*m,this._z=c*u*m+h*f*p,this._w=c*u*p-h*f*m;break;case"YXZ":this._x=h*u*p+c*f*m,this._y=c*f*p-h*u*m,this._z=c*u*m-h*f*p,this._w=c*u*p+h*f*m;break;case"ZXY":this._x=h*u*p-c*f*m,this._y=c*f*p+h*u*m,this._z=c*u*m+h*f*p,this._w=c*u*p-h*f*m;break;case"ZYX":this._x=h*u*p-c*f*m,this._y=c*f*p+h*u*m,this._z=c*u*m-h*f*p,this._w=c*u*p+h*f*m;break;case"YZX":this._x=h*u*p+c*f*m,this._y=c*f*p+h*u*m,this._z=c*u*m-h*f*p,this._w=c*u*p-h*f*m;break;case"XZY":this._x=h*u*p-c*f*m,this._y=c*f*p-h*u*m,this._z=c*u*m+h*f*p,this._w=c*u*p+h*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],p=e[10],h=n+a+p;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>p){const f=2*Math.sqrt(1+n-a-p);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>p){const f=2*Math.sqrt(1+a-n-p);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+p-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ne(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),p=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*p+this._w*h,this._x=n*p+this._x*h,this._y=s*p+this._y*h,this._z=r*p+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class j{constructor(t=0,e=0,n=0){j.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Tl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Tl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),u=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+l*c+o*p-a*u,this.y=n+l*u+a*c-r*p,this.z=s+l*p+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return so.copy(this).projectOnVector(t),this.sub(so)}reflect(t){return this.sub(so.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ne(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const so=new j,Tl=new Ai;class Tn{constructor(t=new j(1/0,1/0,1/0),e=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,on):on.fromBufferAttribute(r,o),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(t.matrixWorld),this.union(Ks)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(vs),Zs.subVectors(this.max,vs),Ui.subVectors(t.a,vs),zi.subVectors(t.b,vs),Ni.subVectors(t.c,vs),Wn.subVectors(zi,Ui),Xn.subVectors(Ni,zi),ui.subVectors(Ui,Ni);let e=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-ui.z,ui.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,ui.z,0,-ui.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-ui.y,ui.x,0];return!ro(e,Ui,zi,Ni,Zs)||(e=[1,0,0,0,1,0,0,0,1],!ro(e,Ui,zi,Ni,Zs))?!1:(Js.crossVectors(Wn,Xn),e=[Js.x,Js.y,Js.z],ro(e,Ui,zi,Ni,Zs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Rn=[new j,new j,new j,new j,new j,new j,new j,new j],on=new j,Ks=new Tn,Ui=new j,zi=new j,Ni=new j,Wn=new j,Xn=new j,ui=new j,vs=new j,Zs=new j,Js=new j,hi=new j;function ro(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){hi.fromArray(i,r);const a=s.x*Math.abs(hi.x)+s.y*Math.abs(hi.y)+s.z*Math.abs(hi.z),l=t.dot(hi),c=e.dot(hi),u=n.dot(hi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Cf=new Tn,Ms=new j,oo=new j;class li{constructor(t=new j,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Cf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ms.subVectors(t,this.center);const e=Ms.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Ms,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(oo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ms.copy(t.center).add(oo)),this.expandByPoint(Ms.copy(t.center).sub(oo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cn=new j,ao=new j,Qs=new j,qn=new j,lo=new j,tr=new j,co=new j;class Ga{constructor(t=new j,e=new j(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ao.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(ao);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Qs),a=qn.dot(this.direction),l=-qn.dot(Qs),c=qn.lengthSq(),u=Math.abs(1-o*o);let p,h,f,m;if(u>0)if(p=o*l-a,h=o*a-l,m=r*u,p>=0)if(h>=-m)if(h<=m){const _=1/u;p*=_,h*=_,f=p*(p+o*h+2*a)+h*(o*p+h+2*l)+c}else h=r,p=Math.max(0,-(o*h+a)),f=-p*p+h*(h+2*l)+c;else h=-r,p=Math.max(0,-(o*h+a)),f=-p*p+h*(h+2*l)+c;else h<=-m?(p=Math.max(0,-(-o*r+a)),h=p>0?-r:Math.min(Math.max(-r,-l),r),f=-p*p+h*(h+2*l)+c):h<=m?(p=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(p=Math.max(0,-(o*r+a)),h=p>0?r:Math.min(Math.max(-r,-l),r),f=-p*p+h*(h+2*l)+c);else h=o>0?-r:r,p=Math.max(0,-(o*h+a)),f=-p*p+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(ao).addScaledVector(Qs,h),f}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);const n=Cn.dot(this.direction),s=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return c>=0?(n=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(n=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-h.z)*p,l=(t.max.z-h.z)*p):(a=(t.max.z-h.z)*p,l=(t.min.z-h.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,s,r){lo.subVectors(e,t),tr.subVectors(n,t),co.crossVectors(lo,tr);let o=this.direction.dot(co),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,t);const l=a*this.direction.dot(tr.crossVectors(qn,tr));if(l<0)return null;const c=a*this.direction.dot(lo.cross(qn));if(c<0||l+c>o)return null;const u=-a*qn.dot(co);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ne{constructor(t,e,n,s,r,o,a,l,c,u,p,h,f,m,_,g){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,u,p,h,f,m,_,g)}set(t,e,n,s,r,o,a,l,c,u,p,h,f,m,_,g){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=p,d[14]=h,d[3]=f,d[7]=m,d[11]=_,d[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Fi.setFromMatrixColumn(t,0).length(),r=1/Fi.setFromMatrixColumn(t,1).length(),o=1/Fi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){const h=o*u,f=o*p,m=a*u,_=a*p;e[0]=l*u,e[4]=-l*p,e[8]=c,e[1]=f+m*c,e[5]=h-_*c,e[9]=-a*l,e[2]=_-h*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){const h=l*u,f=l*p,m=c*u,_=c*p;e[0]=h+_*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*p,e[5]=o*u,e[9]=-a,e[2]=f*a-m,e[6]=_+h*a,e[10]=o*l}else if(t.order==="ZXY"){const h=l*u,f=l*p,m=c*u,_=c*p;e[0]=h-_*a,e[4]=-o*p,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*u,e[9]=_-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const h=o*u,f=o*p,m=a*u,_=a*p;e[0]=l*u,e[4]=m*c-f,e[8]=h*c+_,e[1]=l*p,e[5]=_*c+h,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const h=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*u,e[4]=_-h*p,e[8]=m*p+f,e[1]=p,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*p+m,e[10]=h-_*p}else if(t.order==="XZY"){const h=o*l,f=o*c,m=a*l,_=a*c;e[0]=l*u,e[4]=-p,e[8]=c*u,e[1]=h*p+_,e[5]=o*u,e[9]=f*p-m,e[2]=m*p-f,e[6]=a*u,e[10]=_*p+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pf,t,Lf)}lookAt(t,e,n){const s=this.elements;return $e.subVectors(t,e),$e.lengthSq()===0&&($e.z=1),$e.normalize(),Yn.crossVectors(n,$e),Yn.lengthSq()===0&&(Math.abs(n.z)===1?$e.x+=1e-4:$e.z+=1e-4,$e.normalize(),Yn.crossVectors(n,$e)),Yn.normalize(),er.crossVectors($e,Yn),s[0]=Yn.x,s[4]=er.x,s[8]=$e.x,s[1]=Yn.y,s[5]=er.y,s[9]=$e.y,s[2]=Yn.z,s[6]=er.z,s[10]=$e.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],p=n[5],h=n[9],f=n[13],m=n[2],_=n[6],g=n[10],d=n[14],M=n[3],y=n[7],x=n[11],w=n[15],E=s[0],b=s[4],P=s[8],S=s[12],v=s[1],A=s[5],N=s[9],k=s[13],$=s[2],Q=s[6],K=s[10],O=s[14],H=s[3],ot=s[7],st=s[11],vt=s[15];return r[0]=o*E+a*v+l*$+c*H,r[4]=o*b+a*A+l*Q+c*ot,r[8]=o*P+a*N+l*K+c*st,r[12]=o*S+a*k+l*O+c*vt,r[1]=u*E+p*v+h*$+f*H,r[5]=u*b+p*A+h*Q+f*ot,r[9]=u*P+p*N+h*K+f*st,r[13]=u*S+p*k+h*O+f*vt,r[2]=m*E+_*v+g*$+d*H,r[6]=m*b+_*A+g*Q+d*ot,r[10]=m*P+_*N+g*K+d*st,r[14]=m*S+_*k+g*O+d*vt,r[3]=M*E+y*v+x*$+w*H,r[7]=M*b+y*A+x*Q+w*ot,r[11]=M*P+y*N+x*K+w*st,r[15]=M*S+y*k+x*O+w*vt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],p=t[6],h=t[10],f=t[14],m=t[3],_=t[7],g=t[11],d=t[15];return m*(+r*l*p-s*c*p-r*a*h+n*c*h+s*a*f-n*l*f)+_*(+e*l*f-e*c*h+r*o*h-s*o*f+s*c*u-r*l*u)+g*(+e*c*p-e*a*f-r*o*p+n*o*f+r*a*u-n*c*u)+d*(-s*a*u-e*l*p+e*a*h+s*o*p-n*o*h+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],p=t[9],h=t[10],f=t[11],m=t[12],_=t[13],g=t[14],d=t[15],M=p*g*c-_*h*c+_*l*f-a*g*f-p*l*d+a*h*d,y=m*h*c-u*g*c-m*l*f+o*g*f+u*l*d-o*h*d,x=u*_*c-m*p*c+m*a*f-o*_*f-u*a*d+o*p*d,w=m*p*l-u*_*l-m*a*h+o*_*h+u*a*g-o*p*g,E=e*M+n*y+s*x+r*w;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/E;return t[0]=M*b,t[1]=(_*h*r-p*g*r-_*s*f+n*g*f+p*s*d-n*h*d)*b,t[2]=(a*g*r-_*l*r+_*s*c-n*g*c-a*s*d+n*l*d)*b,t[3]=(p*l*r-a*h*r-p*s*c+n*h*c+a*s*f-n*l*f)*b,t[4]=y*b,t[5]=(u*g*r-m*h*r+m*s*f-e*g*f-u*s*d+e*h*d)*b,t[6]=(m*l*r-o*g*r-m*s*c+e*g*c+o*s*d-e*l*d)*b,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*f+e*l*f)*b,t[8]=x*b,t[9]=(m*p*r-u*_*r-m*n*f+e*_*f+u*n*d-e*p*d)*b,t[10]=(o*_*r-m*a*r+m*n*c-e*_*c-o*n*d+e*a*d)*b,t[11]=(u*a*r-o*p*r-u*n*c+e*p*c+o*n*f-e*a*f)*b,t[12]=w*b,t[13]=(u*_*s-m*p*s+m*n*h-e*_*h-u*n*g+e*p*g)*b,t[14]=(m*a*s-o*_*s-m*n*l+e*_*l+o*n*g-e*a*g)*b,t[15]=(o*p*s-u*a*s+u*n*l-e*p*l-o*n*h+e*a*h)*b,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,p=a+a,h=r*c,f=r*u,m=r*p,_=o*u,g=o*p,d=a*p,M=l*c,y=l*u,x=l*p,w=n.x,E=n.y,b=n.z;return s[0]=(1-(_+d))*w,s[1]=(f+x)*w,s[2]=(m-y)*w,s[3]=0,s[4]=(f-x)*E,s[5]=(1-(h+d))*E,s[6]=(g+M)*E,s[7]=0,s[8]=(m+y)*b,s[9]=(g-M)*b,s[10]=(1-(h+_))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Fi.set(s[0],s[1],s[2]).length();const o=Fi.set(s[4],s[5],s[6]).length(),a=Fi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],an.copy(this);const c=1/r,u=1/o,p=1/a;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=u,an.elements[5]*=u,an.elements[6]*=u,an.elements[8]*=p,an.elements[9]*=p,an.elements[10]*=p,e.setFromRotationMatrix(an),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Fn){const l=this.elements,c=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),h=(n+s)/(n-s);let f,m;if(a===Fn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===kr)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Fn){const l=this.elements,c=1/(e-t),u=1/(n-s),p=1/(o-r),h=(e+t)*c,f=(n+s)*u;let m,_;if(a===Fn)m=(o+r)*p,_=-2*p;else if(a===kr)m=r*p,_=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Fi=new j,an=new ne,Pf=new j(0,0,0),Lf=new j(1,1,1),Yn=new j,er=new j,$e=new j,Al=new ne,Rl=new Ai;class wn{constructor(t=0,e=0,n=0,s=wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],p=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ne(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Al.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Al,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Rl.setFromEuler(this),this.setFromQuaternion(Rl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wn.DEFAULT_ORDER="XYZ";class Ha{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Df=0;const Cl=new j,Oi=new Ai,Pn=new ne,nr=new j,ys=new j,If=new j,Uf=new Ai,Pl=new j(1,0,0),Ll=new j(0,1,0),Dl=new j(0,0,1),Il={type:"added"},zf={type:"removed"},Bi={type:"childadded",child:null},uo={type:"childremoved",child:null};class Te extends fs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Df++}),this.uuid=Bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Te.DEFAULT_UP.clone();const t=new j,e=new wn,n=new Ai,s=new j(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ne},normalMatrix:{value:new jt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Te.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ha,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(t,e){return Oi.setFromAxisAngle(t,e),this.quaternion.premultiply(Oi),this}rotateX(t){return this.rotateOnAxis(Pl,t)}rotateY(t){return this.rotateOnAxis(Ll,t)}rotateZ(t){return this.rotateOnAxis(Dl,t)}translateOnAxis(t,e){return Cl.copy(t).applyQuaternion(this.quaternion),this.position.add(Cl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Pl,t)}translateY(t){return this.translateOnAxis(Ll,t)}translateZ(t){return this.translateOnAxis(Dl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?nr.copy(t):nr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(ys,nr,this.up):Pn.lookAt(nr,ys,this.up),this.quaternion.setFromRotationMatrix(Pn),s&&(Pn.extractRotation(s.matrixWorld),Oi.setFromRotationMatrix(Pn),this.quaternion.premultiply(Oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Il),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(zf),uo.child=t,this.dispatchEvent(uo),uo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Il),Bi.child=t,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,t,If),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,Uf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),p=o(t.shapes),h=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Te.DEFAULT_UP=new j(0,1,0);Te.DEFAULT_MATRIX_AUTO_UPDATE=!0;Te.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ln=new j,Ln=new j,ho=new j,Dn=new j,ki=new j,Gi=new j,Ul=new j,fo=new j,po=new j,mo=new j,go=new ee,_o=new ee,xo=new ee;class en{constructor(t=new j,e=new j,n=new j){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),ln.subVectors(t,e),s.cross(ln);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){ln.subVectors(s,e),Ln.subVectors(n,e),ho.subVectors(t,e);const o=ln.dot(ln),a=ln.dot(Ln),l=ln.dot(ho),c=Ln.dot(Ln),u=Ln.dot(ho),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;const h=1/p,f=(c*l-a*u)*h,m=(o*u-a*l)*h;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(o,Dn.y),l.addScaledVector(a,Dn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return go.setScalar(0),_o.setScalar(0),xo.setScalar(0),go.fromBufferAttribute(t,e),_o.fromBufferAttribute(t,n),xo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(go,r.x),o.addScaledVector(_o,r.y),o.addScaledVector(xo,r.z),o}static isFrontFacing(t,e,n,s){return ln.subVectors(n,e),Ln.subVectors(t,e),ln.cross(Ln).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ln.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),ln.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return en.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return en.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return en.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return en.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return en.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;ki.subVectors(s,n),Gi.subVectors(r,n),fo.subVectors(t,n);const l=ki.dot(fo),c=Gi.dot(fo);if(l<=0&&c<=0)return e.copy(n);po.subVectors(t,s);const u=ki.dot(po),p=Gi.dot(po);if(u>=0&&p<=u)return e.copy(s);const h=l*p-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(ki,o);mo.subVectors(t,r);const f=ki.dot(mo),m=Gi.dot(mo);if(m>=0&&f<=m)return e.copy(r);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Gi,a);const g=u*m-f*p;if(g<=0&&p-u>=0&&f-m>=0)return Ul.subVectors(r,s),a=(p-u)/(p-u+(f-m)),e.copy(s).addScaledVector(Ul,a);const d=1/(g+_+h);return o=_*d,a=h*d,e.copy(n).addScaledVector(ki,o).addScaledVector(Gi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _u={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$n={h:0,s:0,l:0},ir={h:0,s:0,l:0};function vo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=n,te.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=te.workingColorSpace){if(t=ka(t,1),e=Ne(e,0,1),n=Ne(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=vo(o,r,t+1/3),this.g=vo(o,r,t),this.b=vo(o,r,t-1/3)}return te.toWorkingColorSpace(this,s),this}setStyle(t,e=Ke){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ke){const n=_u[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=kn(t.r),this.g=kn(t.g),this.b=kn(t.b),this}copyLinearToSRGB(t){return this.r=is(t.r),this.g=is(t.g),this.b=is(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ke){return te.fromWorkingColorSpace(ze.copy(this),t),Math.round(Ne(ze.r*255,0,255))*65536+Math.round(Ne(ze.g*255,0,255))*256+Math.round(Ne(ze.b*255,0,255))}getHexString(t=Ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.fromWorkingColorSpace(ze.copy(this),e);const n=ze.r,s=ze.g,r=ze.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const p=o-a;switch(c=u<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.fromWorkingColorSpace(ze.copy(this),e),t.r=ze.r,t.g=ze.g,t.b=ze.b,t}getStyle(t=Ke){te.fromWorkingColorSpace(ze.copy(this),t);const e=ze.r,n=ze.g,s=ze.b;return t!==Ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL($n),this.setHSL($n.h+t,$n.s+e,$n.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL($n),t.getHSL(ir);const n=Fs($n.h,ir.h,e),s=Fs($n.s,ir.s,e),r=Fs($n.l,ir.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ze=new kt;kt.NAMES=_u;let Nf=0;class ds extends fs{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Nf++}),this.uuid=Bn(),this.name="",this.blending=ts,this.side=oi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Go,this.blendDst=Ho,this.blendEquation=vi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=gl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(n.blending=this.blending),this.side!==oi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Go&&(n.blendSrc=this.blendSrc),this.blendDst!==Ho&&(n.blendDst=this.blendDst),this.blendEquation!==vi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ss&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==gl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class ye extends ds{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const xe=new j,sr=new Vt;class Me{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=wa,this.updateRanges=[],this.gpuType=yn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)sr.fromBufferAttribute(this,e),sr.applyMatrix3(t),this.setXY(e,sr.x,sr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix3(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyMatrix4(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.applyNormalMatrix(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xe.fromBufferAttribute(this,e),xe.transformDirection(t),this.setXYZ(e,xe.x,xe.y,xe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=un(e,this.array)),e}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=un(e,this.array)),e}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=un(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=un(e,this.array)),e}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wa&&(t.usage=this.usage),t}}class xu extends Me{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class vu extends Me{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends Me{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Ff=0;const tn=new ne,Mo=new Te,Hi=new j,je=new Tn,Ss=new Tn,we=new j;class le extends fs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Bn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(pu(t)?vu:xu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return tn.makeRotationFromQuaternion(t),this.applyMatrix4(tn),this}rotateX(t){return tn.makeRotationX(t),this.applyMatrix4(tn),this}rotateY(t){return tn.makeRotationY(t),this.applyMatrix4(tn),this}rotateZ(t){return tn.makeRotationZ(t),this.applyMatrix4(tn),this}translate(t,e,n){return tn.makeTranslation(t,e,n),this.applyMatrix4(tn),this}scale(t,e,n){return tn.makeScale(t,e,n),this.applyMatrix4(tn),this}lookAt(t){return Mo.lookAt(t),Mo.updateMatrix(),this.applyMatrix4(Mo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zt(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(we.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(we),we.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(we)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(t){const n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ss.setFromBufferAttribute(a),this.morphTargetsRelative?(we.addVectors(je.min,Ss.min),je.expandByPoint(we),we.addVectors(je.max,Ss.max),je.expandByPoint(we)):(je.expandByPoint(Ss.min),je.expandByPoint(Ss.max))}je.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)we.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(we));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)we.fromBufferAttribute(a,c),l&&(Hi.fromBufferAttribute(t,c),we.add(Hi)),s=Math.max(s,n.distanceToSquared(we))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new j,l[P]=new j;const c=new j,u=new j,p=new j,h=new Vt,f=new Vt,m=new Vt,_=new j,g=new j;function d(P,S,v){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,S),p.fromBufferAttribute(n,v),h.fromBufferAttribute(r,P),f.fromBufferAttribute(r,S),m.fromBufferAttribute(r,v),u.sub(c),p.sub(c),f.sub(h),m.sub(h);const A=1/(f.x*m.y-m.x*f.y);isFinite(A)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(p,-f.y).multiplyScalar(A),g.copy(p).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(A),a[P].add(_),a[S].add(_),a[v].add(_),l[P].add(g),l[S].add(g),l[v].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let P=0,S=M.length;P<S;++P){const v=M[P],A=v.start,N=v.count;for(let k=A,$=A+N;k<$;k+=3)d(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const y=new j,x=new j,w=new j,E=new j;function b(P){w.fromBufferAttribute(s,P),E.copy(w);const S=a[P];y.copy(S),y.sub(w.multiplyScalar(w.dot(S))).normalize(),x.crossVectors(E,S);const A=x.dot(l[P])<0?-1:1;o.setXYZW(P,y.x,y.y,y.z,A)}for(let P=0,S=M.length;P<S;++P){const v=M[P],A=v.start,N=v.count;for(let k=A,$=A+N;k<$;k+=3)b(t.getX(k+0)),b(t.getX(k+1)),b(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const s=new j,r=new j,o=new j,a=new j,l=new j,c=new j,u=new j,p=new j;if(t)for(let h=0,f=t.count;h<f;h+=3){const m=t.getX(h+0),_=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)we.fromBufferAttribute(t,e),we.normalize(),t.setXYZ(e,we.x,we.y,we.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,p=a.normalized,h=new c.constructor(l.length*u);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*u;for(let d=0;d<u;d++)h[m++]=c[f++]}return new Me(h,u,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new le,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,p=c.length;u<p;u++){const h=c[u],f=t(h,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let p=0,h=c.length;p<h;p++){const f=c[p];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],p=r[c];for(let h=0,f=p.length;h<f;h++)u.push(p[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const zl=new ne,fi=new Ga,rr=new li,Nl=new j,or=new j,ar=new j,lr=new j,yo=new j,cr=new j,Fl=new j,ur=new j;class qt extends Te{constructor(t=new le,e=new ye){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],p=r[l];u!==0&&(yo.fromBufferAttribute(p,t),o?cr.addScaledVector(yo,u):cr.addScaledVector(yo.sub(e),u))}e.add(cr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),rr.copy(n.boundingSphere),rr.applyMatrix4(r),fi.copy(t.ray).recast(t.near),!(rr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(rr,Nl)===null||fi.origin.distanceToSquared(Nl)>(t.far-t.near)**2))&&(zl.copy(r).invert(),fi.copy(t.ray).applyMatrix4(zl),!(n.boundingBox!==null&&fi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,fi)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],d=o[g.materialIndex],M=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=M,w=y;x<w;x+=3){const E=a.getX(x),b=a.getX(x+1),P=a.getX(x+2);s=hr(this,d,t,n,c,u,p,E,b,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,d=_;g<d;g+=3){const M=a.getX(g),y=a.getX(g+1),x=a.getX(g+2);s=hr(this,o,t,n,c,u,p,M,y,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],d=o[g.materialIndex],M=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let x=M,w=y;x<w;x+=3){const E=x,b=x+1,P=x+2;s=hr(this,d,t,n,c,u,p,E,b,P),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,d=_;g<d;g+=3){const M=g,y=g+1,x=g+2;s=hr(this,o,t,n,c,u,p,M,y,x),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Of(i,t,e,n,s,r,o,a){let l;if(t.side===qe?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===oi,a),l===null)return null;ur.copy(a),ur.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ur);return c<e.near||c>e.far?null:{distance:c,point:ur.clone(),object:i}}function hr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,or),i.getVertexPosition(l,ar),i.getVertexPosition(c,lr);const u=Of(i,t,e,n,or,ar,lr,Fl);if(u){const p=new j;en.getBarycoord(Fl,or,ar,lr,p),s&&(u.uv=en.getInterpolatedAttribute(s,a,l,c,p,new Vt)),r&&(u.uv1=en.getInterpolatedAttribute(r,a,l,c,p,new Vt)),o&&(u.normal=en.getInterpolatedAttribute(o,a,l,c,p,new j),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new j,materialIndex:0};en.getNormal(or,ar,lr,h.normal),u.face=h,u.barycoord=p}return u}class Sn extends le{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],p=[];let h=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(p,2));function m(_,g,d,M,y,x,w,E,b,P,S){const v=x/b,A=w/P,N=x/2,k=w/2,$=E/2,Q=b+1,K=P+1;let O=0,H=0;const ot=new j;for(let st=0;st<K;st++){const vt=st*A-k;for(let St=0;St<Q;St++){const Pt=St*v-N;ot[_]=Pt*M,ot[g]=vt*y,ot[d]=$,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[g]=0,ot[d]=E>0?1:-1,u.push(ot.x,ot.y,ot.z),p.push(St/b),p.push(1-st/P),O+=1}}for(let st=0;st<P;st++)for(let vt=0;vt<b;vt++){const St=h+vt+Q*st,Pt=h+vt+Q*(st+1),lt=h+(vt+1)+Q*(st+1),Mt=h+(vt+1)+Q*st;l.push(St,Pt,Mt),l.push(Pt,lt,Mt),H+=6}a.addGroup(f,H,S),f+=H,h+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function cs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Be(i){const t={};for(let e=0;e<i.length;e++){const n=cs(i[e]);for(const s in n)t[s]=n[s]}return t}function Bf(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Mu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const ai={clone:cs,merge:Be};var kf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Se extends ds{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=kf,this.fragmentShader=Gf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=cs(t.uniforms),this.uniformsGroups=Bf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class yu extends Te{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=Fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const jn=new j,Ol=new Vt,Bl=new Vt;class Ze extends yu{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ns*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ks*2*Math.atan(Math.tan(ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){jn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(jn.x,jn.y).multiplyScalar(-t/jn.z),jn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(jn.x,jn.y).multiplyScalar(-t/jn.z)}getViewSize(t,e){return this.getViewBounds(t,Ol,Bl),e.subVectors(Bl,Ol)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ns*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Vi=-90,Wi=1;class Hf extends Te{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ze(Vi,Wi,t,e);s.layers=this.layers,this.add(s);const r=new Ze(Vi,Wi,t,e);r.layers=this.layers,this.add(r);const o=new Ze(Vi,Wi,t,e);o.layers=this.layers,this.add(o);const a=new Ze(Vi,Wi,t,e);a.layers=this.layers,this.add(a);const l=new Ze(Vi,Wi,t,e);l.layers=this.layers,this.add(l);const c=new Ze(Vi,Wi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===kr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,p=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(p,h,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Su extends Fe{constructor(t,e,n,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:rs,super(t,e,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Vf extends sn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Su(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:hn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Sn(5,5,5),r=new Se({name:"CubemapFromEquirect",uniforms:cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:On});r.uniforms.tEquirect.value=e;const o=new qt(s,r),a=e.minFilter;return e.minFilter===Si&&(e.minFilter=hn),new Hf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const So=new j,Wf=new j,Xf=new jt;class ti{constructor(t=new j(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=So.subVectors(n,e).cross(Wf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(So),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Xf.getNormalMatrix(t),s=this.coplanarPoint(So).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const di=new li,fr=new j;class Va{constructor(t=new ti,e=new ti,n=new ti,s=new ti,r=new ti,o=new ti){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Fn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],p=s[6],h=s[7],f=s[8],m=s[9],_=s[10],g=s[11],d=s[12],M=s[13],y=s[14],x=s[15];if(n[0].setComponents(l-r,h-c,g-f,x-d).normalize(),n[1].setComponents(l+r,h+c,g+f,x+d).normalize(),n[2].setComponents(l+o,h+u,g+m,x+M).normalize(),n[3].setComponents(l-o,h-u,g-m,x-M).normalize(),n[4].setComponents(l-a,h-p,g-_,x-y).normalize(),e===Fn)n[5].setComponents(l+a,h+p,g+_,x+y).normalize();else if(e===kr)n[5].setComponents(a,p,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),di.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),di.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(di)}intersectsSprite(t){return di.center.set(0,0,0),di.radius=.7071067811865476,di.applyMatrix4(t.matrixWorld),this.intersectsSphere(di)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(fr.x=s.normal.x>0?t.max.x:t.min.x,fr.y=s.normal.y>0?t.max.y:t.min.y,fr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function bu(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function qf(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,p=c.byteLength,h=i.createBuffer();i.bindBuffer(l,h),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,c){const u=l.array,p=l.updateRanges;if(i.bindBuffer(c,a),p.length===0)i.bufferSubData(c,0,u);else{p.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<p.length;f++){const m=p[h],_=p[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++h,p[h]=_)}p.length=h+1;for(let f=0,m=p.length;f<m;f++){const _=p[f];i.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class ps extends le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,p=t/a,h=e/l,f=[],m=[],_=[],g=[];for(let d=0;d<u;d++){const M=d*h-o;for(let y=0;y<c;y++){const x=y*p-r;m.push(x,-M,0),_.push(0,0,1),g.push(y/a),g.push(1-d/l)}}for(let d=0;d<l;d++)for(let M=0;M<a;M++){const y=M+c*d,x=M+c*(d+1),w=M+1+c*(d+1),E=M+1+c*d;f.push(y,x,E),f.push(x,w,E)}this.setIndex(f),this.setAttribute("position",new Zt(m,3)),this.setAttribute("normal",new Zt(_,3)),this.setAttribute("uv",new Zt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ps(t.width,t.height,t.widthSegments,t.heightSegments)}}var Yf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$f=`#ifdef USE_ALPHAHASH
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
#endif`,jf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Kf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qf=`#ifdef USE_AOMAP
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
#endif`,td=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ed=`#ifdef USE_BATCHING
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
#endif`,nd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,od=`#ifdef USE_IRIDESCENCE
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
#endif`,ad=`#ifdef USE_BUMPMAP
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
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ud=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,pd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,md=`#if defined( USE_COLOR_ALPHA )
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
#endif`,gd=`#define PI 3.141592653589793
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
} // validated`,_d=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xd=`vec3 transformedNormal = objectNormal;
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
#endif`,vd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Md=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bd="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ed=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wd=`#ifdef USE_ENVMAP
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
#endif`,Td=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ad=`#ifdef USE_ENVMAP
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
#endif`,Rd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cd=`#ifdef USE_ENVMAP
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
#endif`,Pd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ld=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Id=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ud=`#ifdef USE_GRADIENTMAP
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
}`,zd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Od=`uniform bool receiveShadow;
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
#endif`,Bd=`#ifdef USE_ENVMAP
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
#endif`,kd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Gd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Hd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wd=`PhysicalMaterial material;
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
#endif`,Xd=`struct PhysicalMaterial {
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
}`,qd=`
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
#endif`,Yd=`#if defined( RE_IndirectDiffuse )
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
#endif`,$d=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Kd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Qd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,tp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ep=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,np=`#if defined( USE_POINTS_UV )
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
#endif`,ip=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,ap=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lp=`#ifdef USE_MORPHTARGETS
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
#endif`,cp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,mp=`#ifdef USE_NORMALMAP
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
#endif`,gp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,_p=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,xp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,vp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,yp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Sp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ep=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ap=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Lp=`float getShadowMask() {
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
}`,Dp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ip=`#ifdef USE_SKINNING
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
#endif`,Up=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zp=`#ifdef USE_SKINNING
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
#endif`,Np=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Fp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Op=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Bp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,kp=`#ifdef USE_TRANSMISSION
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
#endif`,Gp=`#ifdef USE_TRANSMISSION
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
#endif`,Hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const qp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Yp=`uniform sampler2D t2D;
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
}`,$p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`#include <common>
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
}`,Qp=`#if DEPTH_PACKING == 3200
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
}`,tm=`#define DISTANCE
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
}`,em=`#define DISTANCE
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
}`,nm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sm=`uniform float scale;
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
}`,rm=`uniform vec3 diffuse;
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
}`,om=`#include <common>
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
}`,am=`uniform vec3 diffuse;
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
}`,lm=`#define LAMBERT
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
}`,cm=`#define LAMBERT
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
}`,um=`#define MATCAP
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
}`,hm=`#define MATCAP
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
}`,fm=`#define NORMAL
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
}`,dm=`#define NORMAL
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
}`,pm=`#define PHONG
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
}`,mm=`#define PHONG
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
}`,gm=`#define STANDARD
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
}`,_m=`#define STANDARD
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
}`,xm=`#define TOON
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
}`,vm=`#define TOON
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
}`,Mm=`uniform float size;
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
}`,ym=`uniform vec3 diffuse;
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
}`,Sm=`#include <common>
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
}`,bm=`uniform vec3 color;
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
}`,Em=`uniform float rotation;
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
}`,wm=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:Yf,alphahash_pars_fragment:$f,alphamap_fragment:jf,alphamap_pars_fragment:Kf,alphatest_fragment:Zf,alphatest_pars_fragment:Jf,aomap_fragment:Qf,aomap_pars_fragment:td,batching_pars_vertex:ed,batching_vertex:nd,begin_vertex:id,beginnormal_vertex:sd,bsdfs:rd,iridescence_fragment:od,bumpmap_pars_fragment:ad,clipping_planes_fragment:ld,clipping_planes_pars_fragment:cd,clipping_planes_pars_vertex:ud,clipping_planes_vertex:hd,color_fragment:fd,color_pars_fragment:dd,color_pars_vertex:pd,color_vertex:md,common:gd,cube_uv_reflection_fragment:_d,defaultnormal_vertex:xd,displacementmap_pars_vertex:vd,displacementmap_vertex:Md,emissivemap_fragment:yd,emissivemap_pars_fragment:Sd,colorspace_fragment:bd,colorspace_pars_fragment:Ed,envmap_fragment:wd,envmap_common_pars_fragment:Td,envmap_pars_fragment:Ad,envmap_pars_vertex:Rd,envmap_physical_pars_fragment:Bd,envmap_vertex:Cd,fog_vertex:Pd,fog_pars_vertex:Ld,fog_fragment:Dd,fog_pars_fragment:Id,gradientmap_pars_fragment:Ud,lightmap_pars_fragment:zd,lights_lambert_fragment:Nd,lights_lambert_pars_fragment:Fd,lights_pars_begin:Od,lights_toon_fragment:kd,lights_toon_pars_fragment:Gd,lights_phong_fragment:Hd,lights_phong_pars_fragment:Vd,lights_physical_fragment:Wd,lights_physical_pars_fragment:Xd,lights_fragment_begin:qd,lights_fragment_maps:Yd,lights_fragment_end:$d,logdepthbuf_fragment:jd,logdepthbuf_pars_fragment:Kd,logdepthbuf_pars_vertex:Zd,logdepthbuf_vertex:Jd,map_fragment:Qd,map_pars_fragment:tp,map_particle_fragment:ep,map_particle_pars_fragment:np,metalnessmap_fragment:ip,metalnessmap_pars_fragment:sp,morphinstance_vertex:rp,morphcolor_vertex:op,morphnormal_vertex:ap,morphtarget_pars_vertex:lp,morphtarget_vertex:cp,normal_fragment_begin:up,normal_fragment_maps:hp,normal_pars_fragment:fp,normal_pars_vertex:dp,normal_vertex:pp,normalmap_pars_fragment:mp,clearcoat_normal_fragment_begin:gp,clearcoat_normal_fragment_maps:_p,clearcoat_pars_fragment:xp,iridescence_pars_fragment:vp,opaque_fragment:Mp,packing:yp,premultiplied_alpha_fragment:Sp,project_vertex:bp,dithering_fragment:Ep,dithering_pars_fragment:wp,roughnessmap_fragment:Tp,roughnessmap_pars_fragment:Ap,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Cp,shadowmap_vertex:Pp,shadowmask_pars_fragment:Lp,skinbase_vertex:Dp,skinning_pars_vertex:Ip,skinning_vertex:Up,skinnormal_vertex:zp,specularmap_fragment:Np,specularmap_pars_fragment:Fp,tonemapping_fragment:Op,tonemapping_pars_fragment:Bp,transmission_fragment:kp,transmission_pars_fragment:Gp,uv_pars_fragment:Hp,uv_pars_vertex:Vp,uv_vertex:Wp,worldpos_vertex:Xp,background_vert:qp,background_frag:Yp,backgroundCube_vert:$p,backgroundCube_frag:jp,cube_vert:Kp,cube_frag:Zp,depth_vert:Jp,depth_frag:Qp,distanceRGBA_vert:tm,distanceRGBA_frag:em,equirect_vert:nm,equirect_frag:im,linedashed_vert:sm,linedashed_frag:rm,meshbasic_vert:om,meshbasic_frag:am,meshlambert_vert:lm,meshlambert_frag:cm,meshmatcap_vert:um,meshmatcap_frag:hm,meshnormal_vert:fm,meshnormal_frag:dm,meshphong_vert:pm,meshphong_frag:mm,meshphysical_vert:gm,meshphysical_frag:_m,meshtoon_vert:xm,meshtoon_frag:vm,points_vert:Mm,points_frag:ym,shadow_vert:Sm,shadow_frag:bm,sprite_vert:Em,sprite_frag:wm},Lt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new jt}},envmap:{envMap:{value:null},envMapRotation:{value:new jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new jt},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0},uvTransform:{value:new jt}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new jt},alphaMap:{value:null},alphaMapTransform:{value:new jt},alphaTest:{value:0}}},Xe={basic:{uniforms:Be([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:Be([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:Be([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:Be([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:Be([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:Be([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:Be([Lt.points,Lt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:Be([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:Be([Lt.common,Lt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:Be([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:Be([Lt.sprite,Lt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new jt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:Be([Lt.common,Lt.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:Be([Lt.lights,Lt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};Xe.physical={uniforms:Be([Xe.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new jt},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new jt},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new jt},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new jt},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new jt},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new jt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const dr={r:0,b:0,g:0},pi=new wn,Tm=new ne;function Am(i,t,e,n,s,r,o){const a=new kt(0);let l=r===!0?0:1,c,u,p=null,h=0,f=null;function m(M){let y=M.isScene===!0?M.background:null;return y&&y.isTexture&&(y=(M.backgroundBlurriness>0?e:t).get(y)),y}function _(M){let y=!1;const x=m(M);x===null?d(a,l):x&&x.isColor&&(d(x,1),y=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(M,y){const x=m(y);x&&(x.isCubeTexture||x.mapping===Xr)?(u===void 0&&(u=new qt(new Sn(1,1,1),new Se({name:"BackgroundCubeMaterial",uniforms:cs(Xe.backgroundCube.uniforms),vertexShader:Xe.backgroundCube.vertexShader,fragmentShader:Xe.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(w,E,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),pi.copy(y.backgroundRotation),pi.x*=-1,pi.y*=-1,pi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(pi.y*=-1,pi.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Tm.makeRotationFromEuler(pi)),u.material.toneMapped=te.getTransfer(x.colorSpace)!==oe,(p!==x||h!==x.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,p=x,h=x.version,f=i.toneMapping),u.layers.enableAll(),M.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new qt(new ps(2,2),new Se({name:"BackgroundMaterial",uniforms:cs(Xe.background.uniforms),vertexShader:Xe.background.vertexShader,fragmentShader:Xe.background.fragmentShader,side:oi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=te.getTransfer(x.colorSpace)!==oe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(p!==x||h!==x.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,p=x,h=x.version,f=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function d(M,y){M.getRGB(dr,Mu(i)),n.buffers.color.setClear(dr.r,dr.g,dr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(M,y=1){a.set(M),l=y,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,d(a,l)},render:_,addToRenderList:g}}function Rm(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=h(null);let r=s,o=!1;function a(v,A,N,k,$){let Q=!1;const K=p(k,N,A);r!==K&&(r=K,c(r.object)),Q=f(v,k,N,$),Q&&m(v,k,N,$),$!==null&&t.update($,i.ELEMENT_ARRAY_BUFFER),(Q||o)&&(o=!1,x(v,A,N,k),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get($).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function u(v){return i.deleteVertexArray(v)}function p(v,A,N){const k=N.wireframe===!0;let $=n[v.id];$===void 0&&($={},n[v.id]=$);let Q=$[A.id];Q===void 0&&(Q={},$[A.id]=Q);let K=Q[k];return K===void 0&&(K=h(l()),Q[k]=K),K}function h(v){const A=[],N=[],k=[];for(let $=0;$<e;$++)A[$]=0,N[$]=0,k[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:N,attributeDivisors:k,object:v,attributes:{},index:null}}function f(v,A,N,k){const $=r.attributes,Q=A.attributes;let K=0;const O=N.getAttributes();for(const H in O)if(O[H].location>=0){const st=$[H];let vt=Q[H];if(vt===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(vt=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(vt=v.instanceColor)),st===void 0||st.attribute!==vt||vt&&st.data!==vt.data)return!0;K++}return r.attributesNum!==K||r.index!==k}function m(v,A,N,k){const $={},Q=A.attributes;let K=0;const O=N.getAttributes();for(const H in O)if(O[H].location>=0){let st=Q[H];st===void 0&&(H==="instanceMatrix"&&v.instanceMatrix&&(st=v.instanceMatrix),H==="instanceColor"&&v.instanceColor&&(st=v.instanceColor));const vt={};vt.attribute=st,st&&st.data&&(vt.data=st.data),$[H]=vt,K++}r.attributes=$,r.attributesNum=K,r.index=k}function _(){const v=r.newAttributes;for(let A=0,N=v.length;A<N;A++)v[A]=0}function g(v){d(v,0)}function d(v,A){const N=r.newAttributes,k=r.enabledAttributes,$=r.attributeDivisors;N[v]=1,k[v]===0&&(i.enableVertexAttribArray(v),k[v]=1),$[v]!==A&&(i.vertexAttribDivisor(v,A),$[v]=A)}function M(){const v=r.newAttributes,A=r.enabledAttributes;for(let N=0,k=A.length;N<k;N++)A[N]!==v[N]&&(i.disableVertexAttribArray(N),A[N]=0)}function y(v,A,N,k,$,Q,K){K===!0?i.vertexAttribIPointer(v,A,N,$,Q):i.vertexAttribPointer(v,A,N,k,$,Q)}function x(v,A,N,k){_();const $=k.attributes,Q=N.getAttributes(),K=A.defaultAttributeValues;for(const O in Q){const H=Q[O];if(H.location>=0){let ot=$[O];if(ot===void 0&&(O==="instanceMatrix"&&v.instanceMatrix&&(ot=v.instanceMatrix),O==="instanceColor"&&v.instanceColor&&(ot=v.instanceColor)),ot!==void 0){const st=ot.normalized,vt=ot.itemSize,St=t.get(ot);if(St===void 0)continue;const Pt=St.buffer,lt=St.type,Mt=St.bytesPerElement,Tt=lt===i.INT||lt===i.UNSIGNED_INT||ot.gpuType===Ua;if(ot.isInterleavedBufferAttribute){const pt=ot.data,Ct=pt.stride,V=ot.offset;if(pt.isInstancedInterleavedBuffer){for(let gt=0;gt<H.locationSize;gt++)d(H.location+gt,pt.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let gt=0;gt<H.locationSize;gt++)g(H.location+gt);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let gt=0;gt<H.locationSize;gt++)y(H.location+gt,vt/H.locationSize,lt,st,Ct*Mt,(V+vt/H.locationSize*gt)*Mt,Tt)}else{if(ot.isInstancedBufferAttribute){for(let pt=0;pt<H.locationSize;pt++)d(H.location+pt,ot.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let pt=0;pt<H.locationSize;pt++)g(H.location+pt);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let pt=0;pt<H.locationSize;pt++)y(H.location+pt,vt/H.locationSize,lt,st,vt*Mt,vt/H.locationSize*pt*Mt,Tt)}}else if(K!==void 0){const st=K[O];if(st!==void 0)switch(st.length){case 2:i.vertexAttrib2fv(H.location,st);break;case 3:i.vertexAttrib3fv(H.location,st);break;case 4:i.vertexAttrib4fv(H.location,st);break;default:i.vertexAttrib1fv(H.location,st)}}}}M()}function w(){P();for(const v in n){const A=n[v];for(const N in A){const k=A[N];for(const $ in k)u(k[$].object),delete k[$];delete A[N]}delete n[v]}}function E(v){if(n[v.id]===void 0)return;const A=n[v.id];for(const N in A){const k=A[N];for(const $ in k)u(k[$].object),delete k[$];delete A[N]}delete n[v.id]}function b(v){for(const A in n){const N=n[A];if(N[v.id]===void 0)continue;const k=N[v.id];for(const $ in k)u(k[$].object),delete k[$];delete N[v.id]}}function P(){S(),o=!0,r!==s&&(r=s,c(r.object))}function S(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:S,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function Cm(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,p){p!==0&&(i.drawArraysInstanced(n,c,u,p),e.update(u,n,p))}function a(c,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,p);let f=0;for(let m=0;m<p;m++)f+=u[m];e.update(f,n,1)}function l(c,u,p,h){if(p===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)o(c[m],u[m],h[m]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,p);let m=0;for(let _=0;_<p;_++)m+=u[_]*h[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Pm(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==fn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const P=b===bn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==En&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==yn&&!P)}function l(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const p=e.logarithmicDepthBuffer===!0,h=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=m>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:p,reverseDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:d,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:w,maxSamples:E}}function Lm(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new ti,a=new jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,h){const f=p.length!==0||h||n!==0||s;return s=h,n=p.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,h){e=u(p,h,0)},this.setState=function(p,h,f){const m=p.clippingPlanes,_=p.clipIntersection,g=p.clipShadows,d=i.get(p);if(!s||m===null||m.length===0||r&&!g)r?u(null):c();else{const M=r?0:n,y=M*4;let x=d.clippingState||null;l.value=x,x=u(m,h,y,f);for(let w=0;w!==y;++w)x[w]=e[w];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,h,f,m){const _=p!==null?p.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const d=f+_*4,M=h.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<d)&&(g=new Float32Array(d));for(let y=0,x=f;y!==_;++y,x+=4)o.copy(p[y]).applyMatrix4(M,a),o.normal.toArray(g,x),g[x+3]=o.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function Dm(i){let t=new WeakMap;function e(o,a){return a===Ko?o.mapping=rs:a===Zo&&(o.mapping=os),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ko||a===Zo)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vf(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Wa extends yu{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ji=4,kl=[.125,.215,.35,.446,.526,.582],Mi=20,bo=new Wa,Gl=new kt;let Eo=null,wo=0,To=0,Ao=!1;const xi=(1+Math.sqrt(5))/2,Xi=1/xi,Hl=[new j(-xi,Xi,0),new j(xi,Xi,0),new j(-Xi,0,xi),new j(Xi,0,xi),new j(0,xi,-Xi),new j(0,xi,Xi),new j(-1,1,-1),new j(1,1,-1),new j(-1,1,1),new j(1,1,1)];class Vl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Eo=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ql(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Eo,wo,To),this._renderer.xr.enabled=Ao,t.scissorTest=!1,pr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rs||t.mapping===os?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Eo=this._renderer.getRenderTarget(),wo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),Ao=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:hn,minFilter:hn,generateMipmaps:!1,type:bn,format:fn,colorSpace:hs,depthBuffer:!1},s=Wl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Wl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Im(r)),this._blurMaterial=Um(r,t,e)}return s}_compileMaterial(t){const e=new qt(this._lodPlanes[0],t);this._renderer.compile(e,bo)}_sceneToCubeUV(t,e,n,s){const a=new Ze(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,h=u.toneMapping;u.getClearColor(Gl),u.toneMapping=ri,u.autoClear=!1;const f=new ye({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),m=new qt(new Sn,f);let _=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,_=!0):(f.color.copy(Gl),_=!0);for(let d=0;d<6;d++){const M=d%3;M===0?(a.up.set(0,l[d],0),a.lookAt(c[d],0,0)):M===1?(a.up.set(0,0,l[d]),a.lookAt(0,c[d],0)):(a.up.set(0,l[d],0),a.lookAt(0,0,c[d]));const y=this._cubeSize;pr(s,M*y,d>2?y:0,y,y),u.setRenderTarget(s),_&&u.render(m,a),u.render(t,a)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=h,u.autoClear=p,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===rs||t.mapping===os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=ql()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new qt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;pr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,bo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hl[(s-r-1)%Hl.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,p=new qt(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Mi-1),_=r/m,g=isFinite(r)?1+Math.floor(u*_):Mi;g>Mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Mi}`);const d=[];let M=0;for(let b=0;b<Mi;++b){const P=b/_,S=Math.exp(-P*P/2);d.push(S),b===0?M+=S:b<g&&(M+=2*S)}for(let b=0;b<d.length;b++)d[b]=d[b]/M;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=d,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:y}=this;h.dTheta.value=m,h.mipInt.value=y-n;const x=this._sizeLods[s],w=3*x*(s>y-Ji?s-y+Ji:0),E=4*(this._cubeSize-x);pr(e,w,E,3*x,2*x),l.setRenderTarget(e),l.render(p,bo)}}function Im(i){const t=[],e=[],n=[];let s=i;const r=i-Ji+1+kl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Ji?l=kl[o-i+Ji-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,p=1+c,h=[u,u,p,u,p,p,u,u,p,p,u,p],f=6,m=6,_=3,g=2,d=1,M=new Float32Array(_*m*f),y=new Float32Array(g*m*f),x=new Float32Array(d*m*f);for(let E=0;E<f;E++){const b=E%3*2/3-1,P=E>2?0:-1,S=[b,P,0,b+2/3,P,0,b+2/3,P+1,0,b,P,0,b+2/3,P+1,0,b,P+1,0];M.set(S,_*m*E),y.set(h,g*m*E);const v=[E,E,E,E,E,E];x.set(v,d*m*E)}const w=new le;w.setAttribute("position",new Me(M,_)),w.setAttribute("uv",new Me(y,g)),w.setAttribute("faceIndex",new Me(x,d)),t.push(w),s>Ji&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Wl(i,t,e){const n=new sn(i,t,e);return n.texture.mapping=Xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function pr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Um(i,t,e){const n=new Float32Array(Mi),s=new j(0,1,0);return new Se({name:"SphericalGaussianBlur",defines:{n:Mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Xa(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function Xl(){return new Se({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Xa(),fragmentShader:`

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
		`,blending:On,depthTest:!1,depthWrite:!1})}function ql(){return new Se({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Xa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:On,depthTest:!1,depthWrite:!1})}function Xa(){return`

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
	`}function zm(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ko||l===Zo,u=l===rs||l===os;if(c||u){let p=t.get(a);const h=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return e===null&&(e=new Vl(i)),p=c?e.fromEquirectangular(a,p):e.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),p.texture;if(p!==void 0)return p.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Vl(i)),p=c?e.fromEquirectangular(a):e.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Nm(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&zs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Fm(i,t,e,n){const s={},r=new WeakMap;function o(p){const h=p.target;h.index!==null&&t.remove(h.index);for(const m in h.attributes)t.remove(h.attributes[m]);for(const m in h.morphAttributes){const _=h.morphAttributes[m];for(let g=0,d=_.length;g<d;g++)t.remove(_[g])}h.removeEventListener("dispose",o),delete s[h.id];const f=r.get(h);f&&(t.remove(f),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(p,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(p){const h=p.attributes;for(const m in h)t.update(h[m],i.ARRAY_BUFFER);const f=p.morphAttributes;for(const m in f){const _=f[m];for(let g=0,d=_.length;g<d;g++)t.update(_[g],i.ARRAY_BUFFER)}}function c(p){const h=[],f=p.index,m=p.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let y=0,x=M.length;y<x;y+=3){const w=M[y+0],E=M[y+1],b=M[y+2];h.push(w,E,E,b,b,w)}}else if(m!==void 0){const M=m.array;_=m.version;for(let y=0,x=M.length/3-1;y<x;y+=3){const w=y+0,E=y+1,b=y+2;h.push(w,E,E,b,b,w)}}else return;const g=new(pu(h)?vu:xu)(h,1);g.version=_;const d=r.get(p);d&&t.remove(d),r.set(p,g)}function u(p){const h=r.get(p);if(h){const f=p.index;f!==null&&h.version<f.version&&c(p)}else c(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:u}}function Om(i,t,e){let n;function s(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,f){i.drawElements(n,f,r,h*o),e.update(f,n,1)}function c(h,f,m){m!==0&&(i.drawElementsInstanced(n,f,r,h*o,m),e.update(f,n,m))}function u(h,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,h,0,m);let g=0;for(let d=0;d<m;d++)g+=f[d];e.update(g,n,1)}function p(h,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let d=0;d<h.length;d++)c(h[d]/o,f[d],_[d]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,h,0,_,0,m);let d=0;for(let M=0;M<m;M++)d+=f[M]*_[M];e.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=p}function Bm(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function km(i,t,e){const n=new WeakMap,s=new ee;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==p){let S=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",S)};h!==void 0&&h.texture.dispose();const f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],d=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let y=0;f===!0&&(y=1),m===!0&&(y=2),_===!0&&(y=3);let x=a.attributes.position.count*y,w=1;x>t.maxTextureSize&&(w=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);const E=new Float32Array(x*w*4*p),b=new gu(E,x,w,p);b.type=yn,b.needsUpdate=!0;const P=y*4;for(let v=0;v<p;v++){const A=g[v],N=d[v],k=M[v],$=x*w*4*v;for(let Q=0;Q<A.count;Q++){const K=Q*P;f===!0&&(s.fromBufferAttribute(A,Q),E[$+K+0]=s.x,E[$+K+1]=s.y,E[$+K+2]=s.z,E[$+K+3]=0),m===!0&&(s.fromBufferAttribute(N,Q),E[$+K+4]=s.x,E[$+K+5]=s.y,E[$+K+6]=s.z,E[$+K+7]=0),_===!0&&(s.fromBufferAttribute(k,Q),E[$+K+8]=s.x,E[$+K+9]=s.y,E[$+K+10]=s.z,E[$+K+11]=k.itemSize===4?s.w:1)}}h={count:p,texture:b,size:new Vt(x,w)},n.set(a,h),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const m=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",m),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",h.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}return{update:r}}function Gm(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,p=t.get(l,u);if(s.get(p)!==c&&(t.update(p),s.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return p}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class qa extends Fe{constructor(t,e,n,s,r,o,a,l,c,u=es){if(u!==es&&u!==ls)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===es&&(n=Ti),n===void 0&&u===ls&&(n=as),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Je,this.minFilter=l!==void 0?l:Je,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Eu=new Fe,Yl=new qa(1,1),wu=new gu,Tu=new Rf,Au=new Su,$l=[],jl=[],Kl=new Float32Array(16),Zl=new Float32Array(9),Jl=new Float32Array(4);function ms(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=$l[s];if(r===void 0&&(r=new Float32Array(s),$l[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function be(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ee(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function $r(i,t){let e=jl[t];e===void 0&&(e=new Int32Array(t),jl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Hm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Vm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2fv(this.addr,t),Ee(e,t)}}function Wm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(be(e,t))return;i.uniform3fv(this.addr,t),Ee(e,t)}}function Xm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4fv(this.addr,t),Ee(e,t)}}function qm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;Jl.set(n),i.uniformMatrix2fv(this.addr,!1,Jl),Ee(e,n)}}function Ym(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;Zl.set(n),i.uniformMatrix3fv(this.addr,!1,Zl),Ee(e,n)}}function $m(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(be(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(be(e,n))return;Kl.set(n),i.uniformMatrix4fv(this.addr,!1,Kl),Ee(e,n)}}function jm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Km(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2iv(this.addr,t),Ee(e,t)}}function Zm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3iv(this.addr,t),Ee(e,t)}}function Jm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4iv(this.addr,t),Ee(e,t)}}function Qm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(be(e,t))return;i.uniform2uiv(this.addr,t),Ee(e,t)}}function eg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(be(e,t))return;i.uniform3uiv(this.addr,t),Ee(e,t)}}function ng(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(be(e,t))return;i.uniform4uiv(this.addr,t),Ee(e,t)}}function ig(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Yl.compareFunction=du,r=Yl):r=Eu,e.setTexture2D(t||r,s)}function sg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Tu,s)}function rg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Au,s)}function og(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wu,s)}function ag(i){switch(i){case 5126:return Hm;case 35664:return Vm;case 35665:return Wm;case 35666:return Xm;case 35674:return qm;case 35675:return Ym;case 35676:return $m;case 5124:case 35670:return jm;case 35667:case 35671:return Km;case 35668:case 35672:return Zm;case 35669:case 35673:return Jm;case 5125:return Qm;case 36294:return tg;case 36295:return eg;case 36296:return ng;case 35678:case 36198:case 36298:case 36306:case 35682:return ig;case 35679:case 36299:case 36307:return sg;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return og}}function lg(i,t){i.uniform1fv(this.addr,t)}function cg(i,t){const e=ms(t,this.size,2);i.uniform2fv(this.addr,e)}function ug(i,t){const e=ms(t,this.size,3);i.uniform3fv(this.addr,e)}function hg(i,t){const e=ms(t,this.size,4);i.uniform4fv(this.addr,e)}function fg(i,t){const e=ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function dg(i,t){const e=ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function pg(i,t){const e=ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function mg(i,t){i.uniform1iv(this.addr,t)}function gg(i,t){i.uniform2iv(this.addr,t)}function _g(i,t){i.uniform3iv(this.addr,t)}function xg(i,t){i.uniform4iv(this.addr,t)}function vg(i,t){i.uniform1uiv(this.addr,t)}function Mg(i,t){i.uniform2uiv(this.addr,t)}function yg(i,t){i.uniform3uiv(this.addr,t)}function Sg(i,t){i.uniform4uiv(this.addr,t)}function bg(i,t,e){const n=this.cache,s=t.length,r=$r(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Eu,r[o])}function Eg(i,t,e){const n=this.cache,s=t.length,r=$r(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Tu,r[o])}function wg(i,t,e){const n=this.cache,s=t.length,r=$r(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Au,r[o])}function Tg(i,t,e){const n=this.cache,s=t.length,r=$r(e,s);be(n,r)||(i.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||wu,r[o])}function Ag(i){switch(i){case 5126:return lg;case 35664:return cg;case 35665:return ug;case 35666:return hg;case 35674:return fg;case 35675:return dg;case 35676:return pg;case 5124:case 35670:return mg;case 35667:case 35671:return gg;case 35668:case 35672:return _g;case 35669:case 35673:return xg;case 5125:return vg;case 36294:return Mg;case 36295:return yg;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return bg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return wg;case 36289:case 36303:case 36311:case 36292:return Tg}}class Rg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ag(e.type)}}class Cg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ag(e.type)}}class Pg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const Ro=/(\w+)(\])?(\[|\.)?/g;function Ql(i,t){i.seq.push(t),i.map[t.id]=t}function Lg(i,t,e){const n=i.name,s=n.length;for(Ro.lastIndex=0;;){const r=Ro.exec(n),o=Ro.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Ql(e,c===void 0?new Rg(a,i,t):new Cg(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new Pg(a),Ql(e,p)),e=p}}}class zr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Lg(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function tc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Dg=37297;let Ig=0;function Ug(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const ec=new jt;function zg(i){te._getMatrix(ec,te.workingColorSpace,i);const t=`mat3( ${ec.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(i)){case Yr:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function nc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Ug(i.getShaderSource(t),o)}else return s}function Ng(i,t){const e=zg(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Fg(i,t){let e;switch(t){case Kc:e="Linear";break;case Zc:e="Reinhard";break;case Jc:e="Cineon";break;case Qc:e="ACESFilmic";break;case tu:e="AgX";break;case eu:e="Neutral";break;case Xh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const mr=new j;function Og(){te.getLuminanceCoefficients(mr);const i=mr.x.toFixed(4),t=mr.y.toFixed(4),e=mr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ns).join(`
`)}function kg(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gg(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ns(i){return i!==""}function ic(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Hg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ta(i){return i.replace(Hg,Wg)}const Vg=new Map;function Wg(i,t){let e=Kt[t];if(e===void 0){const n=Vg.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ta(e)}const Xg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rc(i){return i.replace(Xg,qg)}function qg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function oc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function Yg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===jc?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Eh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===In&&(t="SHADOWMAP_TYPE_VSM"),t}function $g(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case rs:case os:t="ENVMAP_TYPE_CUBE";break;case Xr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function jg(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case os:t="ENVMAP_MODE_REFRACTION";break}return t}function Kg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ia:t="ENVMAP_BLENDING_MULTIPLY";break;case Vh:t="ENVMAP_BLENDING_MIX";break;case Wh:t="ENVMAP_BLENDING_ADD";break}return t}function Zg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Jg(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Yg(e),c=$g(e),u=jg(e),p=Kg(e),h=Zg(e),f=Bg(e),m=kg(r),_=s.createProgram();let g,d,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ns).join(`
`),g.length>0&&(g+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(Ns).join(`
`),d.length>0&&(d+=`
`)):(g=[oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),d=[oc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ri?"#define TONE_MAPPING":"",e.toneMapping!==ri?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ri?Fg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,Ng("linearToOutputTexel",e.outputColorSpace),Og(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ns).join(`
`)),o=Ta(o),o=ic(o,e),o=sc(o,e),a=Ta(a),a=ic(a,e),a=sc(a,e),o=rc(o),a=rc(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,d=["#define varying in",e.glslVersion===xl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===xl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=M+g+o,x=M+d+a,w=tc(s,s.VERTEX_SHADER,y),E=tc(s,s.FRAGMENT_SHADER,x);s.attachShader(_,w),s.attachShader(_,E),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(A){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_).trim(),k=s.getShaderInfoLog(w).trim(),$=s.getShaderInfoLog(E).trim();let Q=!0,K=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(Q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,w,E);else{const O=nc(s,w,"vertex"),H=nc(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+N+`
`+O+`
`+H)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(k===""||$==="")&&(K=!1);K&&(A.diagnostics={runnable:Q,programLog:N,vertexShader:{log:k,prefix:g},fragmentShader:{log:$,prefix:d}})}s.deleteShader(w),s.deleteShader(E),P=new zr(s,_),S=Gg(s,_)}let P;this.getUniforms=function(){return P===void 0&&b(this),P};let S;this.getAttributes=function(){return S===void 0&&b(this),S};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,Dg)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ig++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=E,this}let Qg=0;class t0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new e0(t),e.set(t,n)),n}}class e0{constructor(t){this.id=Qg++,this.code=t,this.usedTimes=0}}function n0(i,t,e,n,s,r,o){const a=new Ha,l=new t0,c=new Set,u=[],p=s.logarithmicDepthBuffer,h=s.vertexTextures;let f=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(S){return c.add(S),S===0?"uv":`uv${S}`}function g(S,v,A,N,k){const $=N.fog,Q=k.geometry,K=S.isMeshStandardMaterial?N.environment:null,O=(S.isMeshStandardMaterial?e:t).get(S.envMap||K),H=O&&O.mapping===Xr?O.image.height:null,ot=m[S.type];S.precision!==null&&(f=s.getMaxPrecision(S.precision),f!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",f,"instead."));const st=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,vt=st!==void 0?st.length:0;let St=0;Q.morphAttributes.position!==void 0&&(St=1),Q.morphAttributes.normal!==void 0&&(St=2),Q.morphAttributes.color!==void 0&&(St=3);let Pt,lt,Mt,Tt;if(ot){const Ht=Xe[ot];Pt=Ht.vertexShader,lt=Ht.fragmentShader}else Pt=S.vertexShader,lt=S.fragmentShader,l.update(S),Mt=l.getVertexShaderID(S),Tt=l.getFragmentShaderID(S);const pt=i.getRenderTarget(),Ct=i.state.buffers.depth.getReversed(),V=k.isInstancedMesh===!0,gt=k.isBatchedMesh===!0,mt=!!S.map,Et=!!S.matcap,Ut=!!O,Y=!!S.aoMap,Yt=!!S.lightMap,wt=!!S.bumpMap,xt=!!S.normalMap,yt=!!S.displacementMap,Nt=!!S.emissiveMap,Dt=!!S.metalnessMap,z=!!S.roughnessMap,R=S.anisotropy>0,T=S.clearcoat>0,U=S.dispersion>0,W=S.iridescence>0,B=S.sheen>0,_t=S.transmission>0,at=R&&!!S.anisotropyMap,dt=T&&!!S.clearcoatMap,bt=T&&!!S.clearcoatNormalMap,I=T&&!!S.clearcoatRoughnessMap,G=W&&!!S.iridescenceMap,J=W&&!!S.iridescenceThicknessMap,et=B&&!!S.sheenColorMap,F=B&&!!S.sheenRoughnessMap,C=!!S.specularMap,X=!!S.specularColorMap,nt=!!S.specularIntensityMap,D=_t&&!!S.transmissionMap,tt=_t&&!!S.thicknessMap,q=!!S.gradientMap,Z=!!S.alphaMap,ft=S.alphaTest>0,ct=!!S.alphaHash,At=!!S.extensions;let zt=ri;S.toneMapped&&(pt===null||pt.isXRRenderTarget===!0)&&(zt=i.toneMapping);const Wt={shaderID:ot,shaderType:S.type,shaderName:S.name,vertexShader:Pt,fragmentShader:lt,defines:S.defines,customVertexShaderID:Mt,customFragmentShaderID:Tt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:f,batching:gt,batchingColor:gt&&k._colorsTexture!==null,instancing:V,instancingColor:V&&k.instanceColor!==null,instancingMorph:V&&k.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:pt===null?i.outputColorSpace:pt.isXRRenderTarget===!0?pt.texture.colorSpace:hs,alphaToCoverage:!!S.alphaToCoverage,map:mt,matcap:Et,envMap:Ut,envMapMode:Ut&&O.mapping,envMapCubeUVHeight:H,aoMap:Y,lightMap:Yt,bumpMap:wt,normalMap:xt,displacementMap:h&&yt,emissiveMap:Nt,normalMapObjectSpace:xt&&S.normalMapType===jh,normalMapTangentSpace:xt&&S.normalMapType===fu,metalnessMap:Dt,roughnessMap:z,anisotropy:R,anisotropyMap:at,clearcoat:T,clearcoatMap:dt,clearcoatNormalMap:bt,clearcoatRoughnessMap:I,dispersion:U,iridescence:W,iridescenceMap:G,iridescenceThicknessMap:J,sheen:B,sheenColorMap:et,sheenRoughnessMap:F,specularMap:C,specularColorMap:X,specularIntensityMap:nt,transmission:_t,transmissionMap:D,thicknessMap:tt,gradientMap:q,opaque:S.transparent===!1&&S.blending===ts&&S.alphaToCoverage===!1,alphaMap:Z,alphaTest:ft,alphaHash:ct,combine:S.combine,mapUv:mt&&_(S.map.channel),aoMapUv:Y&&_(S.aoMap.channel),lightMapUv:Yt&&_(S.lightMap.channel),bumpMapUv:wt&&_(S.bumpMap.channel),normalMapUv:xt&&_(S.normalMap.channel),displacementMapUv:yt&&_(S.displacementMap.channel),emissiveMapUv:Nt&&_(S.emissiveMap.channel),metalnessMapUv:Dt&&_(S.metalnessMap.channel),roughnessMapUv:z&&_(S.roughnessMap.channel),anisotropyMapUv:at&&_(S.anisotropyMap.channel),clearcoatMapUv:dt&&_(S.clearcoatMap.channel),clearcoatNormalMapUv:bt&&_(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:I&&_(S.clearcoatRoughnessMap.channel),iridescenceMapUv:G&&_(S.iridescenceMap.channel),iridescenceThicknessMapUv:J&&_(S.iridescenceThicknessMap.channel),sheenColorMapUv:et&&_(S.sheenColorMap.channel),sheenRoughnessMapUv:F&&_(S.sheenRoughnessMap.channel),specularMapUv:C&&_(S.specularMap.channel),specularColorMapUv:X&&_(S.specularColorMap.channel),specularIntensityMapUv:nt&&_(S.specularIntensityMap.channel),transmissionMapUv:D&&_(S.transmissionMap.channel),thicknessMapUv:tt&&_(S.thicknessMap.channel),alphaMapUv:Z&&_(S.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(xt||R),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!Q.attributes.uv&&(mt||Z),fog:!!$,useFog:S.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:Ct,skinning:k.isSkinnedMesh===!0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:St,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:zt,decodeVideoTexture:mt&&S.map.isVideoTexture===!0&&te.getTransfer(S.map.colorSpace)===oe,decodeVideoTextureEmissive:Nt&&S.emissiveMap.isVideoTexture===!0&&te.getTransfer(S.emissiveMap.colorSpace)===oe,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===ge,flipSided:S.side===qe,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:At&&S.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(At&&S.extensions.multiDraw===!0||gt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return Wt.vertexUv1s=c.has(1),Wt.vertexUv2s=c.has(2),Wt.vertexUv3s=c.has(3),c.clear(),Wt}function d(S){const v=[];if(S.shaderID?v.push(S.shaderID):(v.push(S.customVertexShaderID),v.push(S.customFragmentShaderID)),S.defines!==void 0)for(const A in S.defines)v.push(A),v.push(S.defines[A]);return S.isRawShaderMaterial===!1&&(M(v,S),y(v,S),v.push(i.outputColorSpace)),v.push(S.customProgramCacheKey),v.join()}function M(S,v){S.push(v.precision),S.push(v.outputColorSpace),S.push(v.envMapMode),S.push(v.envMapCubeUVHeight),S.push(v.mapUv),S.push(v.alphaMapUv),S.push(v.lightMapUv),S.push(v.aoMapUv),S.push(v.bumpMapUv),S.push(v.normalMapUv),S.push(v.displacementMapUv),S.push(v.emissiveMapUv),S.push(v.metalnessMapUv),S.push(v.roughnessMapUv),S.push(v.anisotropyMapUv),S.push(v.clearcoatMapUv),S.push(v.clearcoatNormalMapUv),S.push(v.clearcoatRoughnessMapUv),S.push(v.iridescenceMapUv),S.push(v.iridescenceThicknessMapUv),S.push(v.sheenColorMapUv),S.push(v.sheenRoughnessMapUv),S.push(v.specularMapUv),S.push(v.specularColorMapUv),S.push(v.specularIntensityMapUv),S.push(v.transmissionMapUv),S.push(v.thicknessMapUv),S.push(v.combine),S.push(v.fogExp2),S.push(v.sizeAttenuation),S.push(v.morphTargetsCount),S.push(v.morphAttributeCount),S.push(v.numDirLights),S.push(v.numPointLights),S.push(v.numSpotLights),S.push(v.numSpotLightMaps),S.push(v.numHemiLights),S.push(v.numRectAreaLights),S.push(v.numDirLightShadows),S.push(v.numPointLightShadows),S.push(v.numSpotLightShadows),S.push(v.numSpotLightShadowsWithMaps),S.push(v.numLightProbes),S.push(v.shadowMapType),S.push(v.toneMapping),S.push(v.numClippingPlanes),S.push(v.numClipIntersection),S.push(v.depthPacking)}function y(S,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),S.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reverseDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),S.push(a.mask)}function x(S){const v=m[S.type];let A;if(v){const N=Xe[v];A=ai.clone(N.uniforms)}else A=S.uniforms;return A}function w(S,v){let A;for(let N=0,k=u.length;N<k;N++){const $=u[N];if($.cacheKey===v){A=$,++A.usedTimes;break}}return A===void 0&&(A=new Jg(i,v,S,r),u.push(A)),A}function E(S){if(--S.usedTimes===0){const v=u.indexOf(S);u[v]=u[u.length-1],u.pop(),S.destroy()}}function b(S){l.remove(S)}function P(){l.dispose()}return{getParameters:g,getProgramCacheKey:d,getUniforms:x,acquireProgram:w,releaseProgram:E,releaseShaderCache:b,programs:u,dispose:P}}function i0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function s0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function ac(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function lc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p,h,f,m,_,g){let d=i[t];return d===void 0?(d={id:p.id,object:p,geometry:h,material:f,groupOrder:m,renderOrder:p.renderOrder,z:_,group:g},i[t]=d):(d.id=p.id,d.object=p,d.geometry=h,d.material=f,d.groupOrder=m,d.renderOrder=p.renderOrder,d.z=_,d.group=g),t++,d}function a(p,h,f,m,_,g){const d=o(p,h,f,m,_,g);f.transmission>0?n.push(d):f.transparent===!0?s.push(d):e.push(d)}function l(p,h,f,m,_,g){const d=o(p,h,f,m,_,g);f.transmission>0?n.unshift(d):f.transparent===!0?s.unshift(d):e.unshift(d)}function c(p,h){e.length>1&&e.sort(p||s0),n.length>1&&n.sort(h||ac),s.length>1&&s.sort(h||ac)}function u(){for(let p=t,h=i.length;p<h;p++){const f=i[p];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function r0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new lc,i.set(n,[o])):s>=r.length?(o=new lc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function o0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new j,color:new kt};break;case"SpotLight":e={position:new j,direction:new j,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new j,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new j,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new j,halfWidth:new j,halfHeight:new j};break}return i[t.id]=e,e}}}function a0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let l0=0;function c0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function u0(i){const t=new o0,e=a0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new j);const s=new j,r=new ne,o=new ne;function a(c){let u=0,p=0,h=0;for(let S=0;S<9;S++)n.probe[S].set(0,0,0);let f=0,m=0,_=0,g=0,d=0,M=0,y=0,x=0,w=0,E=0,b=0;c.sort(c0);for(let S=0,v=c.length;S<v;S++){const A=c[S],N=A.color,k=A.intensity,$=A.distance,Q=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=N.r*k,p+=N.g*k,h+=N.b*k;else if(A.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(A.sh.coefficients[K],k);b++}else if(A.isDirectionalLight){const K=t.get(A);if(K.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const O=A.shadow,H=e.get(A);H.shadowIntensity=O.intensity,H.shadowBias=O.bias,H.shadowNormalBias=O.normalBias,H.shadowRadius=O.radius,H.shadowMapSize=O.mapSize,n.directionalShadow[f]=H,n.directionalShadowMap[f]=Q,n.directionalShadowMatrix[f]=A.shadow.matrix,M++}n.directional[f]=K,f++}else if(A.isSpotLight){const K=t.get(A);K.position.setFromMatrixPosition(A.matrixWorld),K.color.copy(N).multiplyScalar(k),K.distance=$,K.coneCos=Math.cos(A.angle),K.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),K.decay=A.decay,n.spot[_]=K;const O=A.shadow;if(A.map&&(n.spotLightMap[w]=A.map,w++,O.updateMatrices(A),A.castShadow&&E++),n.spotLightMatrix[_]=O.matrix,A.castShadow){const H=e.get(A);H.shadowIntensity=O.intensity,H.shadowBias=O.bias,H.shadowNormalBias=O.normalBias,H.shadowRadius=O.radius,H.shadowMapSize=O.mapSize,n.spotShadow[_]=H,n.spotShadowMap[_]=Q,x++}_++}else if(A.isRectAreaLight){const K=t.get(A);K.color.copy(N).multiplyScalar(k),K.halfWidth.set(A.width*.5,0,0),K.halfHeight.set(0,A.height*.5,0),n.rectArea[g]=K,g++}else if(A.isPointLight){const K=t.get(A);if(K.color.copy(A.color).multiplyScalar(A.intensity),K.distance=A.distance,K.decay=A.decay,A.castShadow){const O=A.shadow,H=e.get(A);H.shadowIntensity=O.intensity,H.shadowBias=O.bias,H.shadowNormalBias=O.normalBias,H.shadowRadius=O.radius,H.shadowMapSize=O.mapSize,H.shadowCameraNear=O.camera.near,H.shadowCameraFar=O.camera.far,n.pointShadow[m]=H,n.pointShadowMap[m]=Q,n.pointShadowMatrix[m]=A.shadow.matrix,y++}n.point[m]=K,m++}else if(A.isHemisphereLight){const K=t.get(A);K.skyColor.copy(A.color).multiplyScalar(k),K.groundColor.copy(A.groundColor).multiplyScalar(k),n.hemi[d]=K,d++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Lt.LTC_FLOAT_1,n.rectAreaLTC2=Lt.LTC_FLOAT_2):(n.rectAreaLTC1=Lt.LTC_HALF_1,n.rectAreaLTC2=Lt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=h;const P=n.hash;(P.directionalLength!==f||P.pointLength!==m||P.spotLength!==_||P.rectAreaLength!==g||P.hemiLength!==d||P.numDirectionalShadows!==M||P.numPointShadows!==y||P.numSpotShadows!==x||P.numSpotMaps!==w||P.numLightProbes!==b)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=d,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+w-E,n.spotLightMap.length=w,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=b,P.directionalLength=f,P.pointLength=m,P.spotLength=_,P.rectAreaLength=g,P.hemiLength=d,P.numDirectionalShadows=M,P.numPointShadows=y,P.numSpotShadows=x,P.numSpotMaps=w,P.numLightProbes=b,n.version=l0++)}function l(c,u){let p=0,h=0,f=0,m=0,_=0;const g=u.matrixWorldInverse;for(let d=0,M=c.length;d<M;d++){const y=c[d];if(y.isDirectionalLight){const x=n.directional[p];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),p++}else if(y.isSpotLight){const x=n.spot[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(g),f++}else if(y.isRectAreaLight){const x=n.rectArea[m];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(y.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(y.isPointLight){const x=n.point[h];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(g),h++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:l,state:n}}function cc(i){const t=new u0(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function h0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new cc(i),t.set(s,[a])):r>=o.length?(a=new cc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class f0 extends ds{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Yh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class d0 extends ds{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const p0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,m0=`uniform sampler2D shadow_pass;
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
}`;function g0(i,t,e){let n=new Va;const s=new Vt,r=new Vt,o=new ee,a=new f0({depthPacking:$h}),l=new d0,c={},u=e.maxTextureSize,p={[oi]:qe,[qe]:oi,[ge]:ge},h=new Se({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:p0,fragmentShader:m0}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const m=new le;m.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new qt(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=jc;let d=this.type;this.render=function(E,b,P){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;const S=i.getRenderTarget(),v=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),N=i.state;N.setBlending(On),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const k=d!==In&&this.type===In,$=d===In&&this.type!==In;for(let Q=0,K=E.length;Q<K;Q++){const O=E[Q],H=O.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",O,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ot=H.getFrameExtents();if(s.multiply(ot),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ot.x),s.x=r.x*ot.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ot.y),s.y=r.y*ot.y,H.mapSize.y=r.y)),H.map===null||k===!0||$===!0){const vt=this.type!==In?{minFilter:Je,magFilter:Je}:{};H.map!==null&&H.map.dispose(),H.map=new sn(s.x,s.y,vt),H.map.texture.name=O.name+".shadowMap",H.camera.updateProjectionMatrix()}i.setRenderTarget(H.map),i.clear();const st=H.getViewportCount();for(let vt=0;vt<st;vt++){const St=H.getViewport(vt);o.set(r.x*St.x,r.y*St.y,r.x*St.z,r.y*St.w),N.viewport(o),H.updateMatrices(O,vt),n=H.getFrustum(),x(b,P,H.camera,O,this.type)}H.isPointLightShadow!==!0&&this.type===In&&M(H,P),H.needsUpdate=!1}d=this.type,g.needsUpdate=!1,i.setRenderTarget(S,v,A)};function M(E,b){const P=t.update(_);h.defines.VSM_SAMPLES!==E.blurSamples&&(h.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new sn(s.x,s.y)),h.uniforms.shadow_pass.value=E.map.texture,h.uniforms.resolution.value=E.mapSize,h.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(b,null,P,h,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(b,null,P,f,_,null)}function y(E,b,P,S){let v=null;const A=P.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(A!==void 0)v=A;else if(v=P.isPointLight===!0?l:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const N=v.uuid,k=b.uuid;let $=c[N];$===void 0&&($={},c[N]=$);let Q=$[k];Q===void 0&&(Q=v.clone(),$[k]=Q,b.addEventListener("dispose",w)),v=Q}if(v.visible=b.visible,v.wireframe=b.wireframe,S===In?v.side=b.shadowSide!==null?b.shadowSide:b.side:v.side=b.shadowSide!==null?b.shadowSide:p[b.side],v.alphaMap=b.alphaMap,v.alphaTest=b.alphaTest,v.map=b.map,v.clipShadows=b.clipShadows,v.clippingPlanes=b.clippingPlanes,v.clipIntersection=b.clipIntersection,v.displacementMap=b.displacementMap,v.displacementScale=b.displacementScale,v.displacementBias=b.displacementBias,v.wireframeLinewidth=b.wireframeLinewidth,v.linewidth=b.linewidth,P.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const N=i.properties.get(v);N.light=P}return v}function x(E,b,P,S,v){if(E.visible===!1)return;if(E.layers.test(b.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&v===In)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,E.matrixWorld);const k=t.update(E),$=E.material;if(Array.isArray($)){const Q=k.groups;for(let K=0,O=Q.length;K<O;K++){const H=Q[K],ot=$[H.materialIndex];if(ot&&ot.visible){const st=y(E,ot,S,v);E.onBeforeShadow(i,E,b,P,k,st,H),i.renderBufferDirect(P,null,k,st,E,H),E.onAfterShadow(i,E,b,P,k,st,H)}}}else if($.visible){const Q=y(E,$,S,v);E.onBeforeShadow(i,E,b,P,k,Q,null),i.renderBufferDirect(P,null,k,Q,E,null),E.onAfterShadow(i,E,b,P,k,Q,null)}}const N=E.children;for(let k=0,$=N.length;k<$;k++)x(N[k],b,P,S,v)}function w(E){E.target.removeEventListener("dispose",w);for(const P in c){const S=c[P],v=E.target.uuid;v in S&&(S[v].dispose(),delete S[v])}}}const _0={[Vo]:Wo,[Xo]:$o,[qo]:jo,[ss]:Yo,[Wo]:Vo,[$o]:Xo,[jo]:qo,[Yo]:ss};function x0(i,t){function e(){let D=!1;const tt=new ee;let q=null;const Z=new ee(0,0,0,0);return{setMask:function(ft){q!==ft&&!D&&(i.colorMask(ft,ft,ft,ft),q=ft)},setLocked:function(ft){D=ft},setClear:function(ft,ct,At,zt,Wt){Wt===!0&&(ft*=zt,ct*=zt,At*=zt),tt.set(ft,ct,At,zt),Z.equals(tt)===!1&&(i.clearColor(ft,ct,At,zt),Z.copy(tt))},reset:function(){D=!1,q=null,Z.set(-1,0,0,0)}}}function n(){let D=!1,tt=!1,q=null,Z=null,ft=null;return{setReversed:function(ct){if(tt!==ct){const At=t.get("EXT_clip_control");tt?At.clipControlEXT(At.LOWER_LEFT_EXT,At.ZERO_TO_ONE_EXT):At.clipControlEXT(At.LOWER_LEFT_EXT,At.NEGATIVE_ONE_TO_ONE_EXT);const zt=ft;ft=null,this.setClear(zt)}tt=ct},getReversed:function(){return tt},setTest:function(ct){ct?pt(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(ct){q!==ct&&!D&&(i.depthMask(ct),q=ct)},setFunc:function(ct){if(tt&&(ct=_0[ct]),Z!==ct){switch(ct){case Vo:i.depthFunc(i.NEVER);break;case Wo:i.depthFunc(i.ALWAYS);break;case Xo:i.depthFunc(i.LESS);break;case ss:i.depthFunc(i.LEQUAL);break;case qo:i.depthFunc(i.EQUAL);break;case Yo:i.depthFunc(i.GEQUAL);break;case $o:i.depthFunc(i.GREATER);break;case jo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ct}},setLocked:function(ct){D=ct},setClear:function(ct){ft!==ct&&(tt&&(ct=1-ct),i.clearDepth(ct),ft=ct)},reset:function(){D=!1,q=null,Z=null,ft=null,tt=!1}}}function s(){let D=!1,tt=null,q=null,Z=null,ft=null,ct=null,At=null,zt=null,Wt=null;return{setTest:function(Ht){D||(Ht?pt(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(Ht){tt!==Ht&&!D&&(i.stencilMask(Ht),tt=Ht)},setFunc:function(Ht,ce,pe){(q!==Ht||Z!==ce||ft!==pe)&&(i.stencilFunc(Ht,ce,pe),q=Ht,Z=ce,ft=pe)},setOp:function(Ht,ce,pe){(ct!==Ht||At!==ce||zt!==pe)&&(i.stencilOp(Ht,ce,pe),ct=Ht,At=ce,zt=pe)},setLocked:function(Ht){D=Ht},setClear:function(Ht){Wt!==Ht&&(i.clearStencil(Ht),Wt=Ht)},reset:function(){D=!1,tt=null,q=null,Z=null,ft=null,ct=null,At=null,zt=null,Wt=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},p={},h=new WeakMap,f=[],m=null,_=!1,g=null,d=null,M=null,y=null,x=null,w=null,E=null,b=new kt(0,0,0),P=0,S=!1,v=null,A=null,N=null,k=null,$=null;const Q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let K=!1,O=0;const H=i.getParameter(i.VERSION);H.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(H)[1]),K=O>=1):H.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),K=O>=2);let ot=null,st={};const vt=i.getParameter(i.SCISSOR_BOX),St=i.getParameter(i.VIEWPORT),Pt=new ee().fromArray(vt),lt=new ee().fromArray(St);function Mt(D,tt,q,Z){const ft=new Uint8Array(4),ct=i.createTexture();i.bindTexture(D,ct),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let At=0;At<q;At++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(tt,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,ft):i.texImage2D(tt+At,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ft);return ct}const Tt={};Tt[i.TEXTURE_2D]=Mt(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=Mt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[i.TEXTURE_2D_ARRAY]=Mt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=Mt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),pt(i.DEPTH_TEST),o.setFunc(ss),wt(!1),xt(dl),pt(i.CULL_FACE),Y(On);function pt(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function Ct(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function V(D,tt){return p[D]!==tt?(i.bindFramebuffer(D,tt),p[D]=tt,D===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=tt),D===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=tt),!0):!1}function gt(D,tt){let q=f,Z=!1;if(D){q=h.get(tt),q===void 0&&(q=[],h.set(tt,q));const ft=D.textures;if(q.length!==ft.length||q[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,At=ft.length;ct<At;ct++)q[ct]=i.COLOR_ATTACHMENT0+ct;q.length=ft.length,Z=!0}}else q[0]!==i.BACK&&(q[0]=i.BACK,Z=!0);Z&&i.drawBuffers(q)}function mt(D){return m!==D?(i.useProgram(D),m=D,!0):!1}const Et={[vi]:i.FUNC_ADD,[Th]:i.FUNC_SUBTRACT,[Ah]:i.FUNC_REVERSE_SUBTRACT};Et[Rh]=i.MIN,Et[Ch]=i.MAX;const Ut={[Ph]:i.ZERO,[Lh]:i.ONE,[Dh]:i.SRC_COLOR,[Go]:i.SRC_ALPHA,[Oh]:i.SRC_ALPHA_SATURATE,[Nh]:i.DST_COLOR,[Uh]:i.DST_ALPHA,[Ih]:i.ONE_MINUS_SRC_COLOR,[Ho]:i.ONE_MINUS_SRC_ALPHA,[Fh]:i.ONE_MINUS_DST_COLOR,[zh]:i.ONE_MINUS_DST_ALPHA,[Bh]:i.CONSTANT_COLOR,[kh]:i.ONE_MINUS_CONSTANT_COLOR,[Gh]:i.CONSTANT_ALPHA,[Hh]:i.ONE_MINUS_CONSTANT_ALPHA};function Y(D,tt,q,Z,ft,ct,At,zt,Wt,Ht){if(D===On){_===!0&&(Ct(i.BLEND),_=!1);return}if(_===!1&&(pt(i.BLEND),_=!0),D!==wh){if(D!==g||Ht!==S){if((d!==vi||x!==vi)&&(i.blendEquation(i.FUNC_ADD),d=vi,x=vi),Ht)switch(D){case ts:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ge:i.blendFunc(i.ONE,i.ONE);break;case pl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ml:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ts:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ge:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case pl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ml:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,y=null,w=null,E=null,b.set(0,0,0),P=0,g=D,S=Ht}return}ft=ft||tt,ct=ct||q,At=At||Z,(tt!==d||ft!==x)&&(i.blendEquationSeparate(Et[tt],Et[ft]),d=tt,x=ft),(q!==M||Z!==y||ct!==w||At!==E)&&(i.blendFuncSeparate(Ut[q],Ut[Z],Ut[ct],Ut[At]),M=q,y=Z,w=ct,E=At),(zt.equals(b)===!1||Wt!==P)&&(i.blendColor(zt.r,zt.g,zt.b,Wt),b.copy(zt),P=Wt),g=D,S=!1}function Yt(D,tt){D.side===ge?Ct(i.CULL_FACE):pt(i.CULL_FACE);let q=D.side===qe;tt&&(q=!q),wt(q),D.blending===ts&&D.transparent===!1?Y(On):Y(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);const Z=D.stencilWrite;a.setTest(Z),Z&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Nt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?pt(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function wt(D){v!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),v=D)}function xt(D){D!==Sh?(pt(i.CULL_FACE),D!==A&&(D===dl?i.cullFace(i.BACK):D===bh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),A=D}function yt(D){D!==N&&(K&&i.lineWidth(D),N=D)}function Nt(D,tt,q){D?(pt(i.POLYGON_OFFSET_FILL),(k!==tt||$!==q)&&(i.polygonOffset(tt,q),k=tt,$=q)):Ct(i.POLYGON_OFFSET_FILL)}function Dt(D){D?pt(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function z(D){D===void 0&&(D=i.TEXTURE0+Q-1),ot!==D&&(i.activeTexture(D),ot=D)}function R(D,tt,q){q===void 0&&(ot===null?q=i.TEXTURE0+Q-1:q=ot);let Z=st[q];Z===void 0&&(Z={type:void 0,texture:void 0},st[q]=Z),(Z.type!==D||Z.texture!==tt)&&(ot!==q&&(i.activeTexture(q),ot=q),i.bindTexture(D,tt||Tt[D]),Z.type=D,Z.texture=tt)}function T(){const D=st[ot];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function U(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function W(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function B(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _t(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function at(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function dt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function I(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function G(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(D){Pt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),Pt.copy(D))}function F(D){lt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),lt.copy(D))}function C(D,tt){let q=c.get(tt);q===void 0&&(q=new WeakMap,c.set(tt,q));let Z=q.get(D);Z===void 0&&(Z=i.getUniformBlockIndex(tt,D.name),q.set(D,Z))}function X(D,tt){const Z=c.get(tt).get(D);l.get(tt)!==Z&&(i.uniformBlockBinding(tt,Z,D.__bindingPointIndex),l.set(tt,Z))}function nt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ot=null,st={},p={},h=new WeakMap,f=[],m=null,_=!1,g=null,d=null,M=null,y=null,x=null,w=null,E=null,b=new kt(0,0,0),P=0,S=!1,v=null,A=null,N=null,k=null,$=null,Pt.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:pt,disable:Ct,bindFramebuffer:V,drawBuffers:gt,useProgram:mt,setBlending:Y,setMaterial:Yt,setFlipSided:wt,setCullFace:xt,setLineWidth:yt,setPolygonOffset:Nt,setScissorTest:Dt,activeTexture:z,bindTexture:R,unbindTexture:T,compressedTexImage2D:U,compressedTexImage3D:W,texImage2D:G,texImage3D:J,updateUBOMapping:C,uniformBlockBinding:X,texStorage2D:bt,texStorage3D:I,texSubImage2D:B,texSubImage3D:_t,compressedTexSubImage2D:at,compressedTexSubImage3D:dt,scissor:et,viewport:F,reset:nt}}function uc(i,t,e,n){const s=v0(n);switch(e){case ou:return i*t;case lu:return i*t;case cu:return i*t*2;case qr:return i*t/s.components*s.byteLength;case Fa:return i*t/s.components*s.byteLength;case uu:return i*t*2/s.components*s.byteLength;case Oa:return i*t*2/s.components*s.byteLength;case au:return i*t*3/s.components*s.byteLength;case fn:return i*t*4/s.components*s.byteLength;case Ba:return i*t*4/s.components*s.byteLength;case Pr:case Lr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Dr:case Ir:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ta:case na:return Math.max(i,16)*Math.max(t,8)/4;case Qo:case ea:return Math.max(i,8)*Math.max(t,8)/2;case ia:case sa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case aa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case la:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ca:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case ua:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case ha:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case fa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case da:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case pa:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case ma:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ga:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case _a:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case xa:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case va:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ur:case Ma:case ya:return Math.ceil(i/4)*Math.ceil(t/4)*16;case hu:case Sa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case ba:case Ea:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function v0(i){switch(i){case En:case iu:return{byteLength:1,components:1};case Bs:case su:case bn:return{byteLength:2,components:1};case za:case Na:return{byteLength:2,components:4};case Ti:case Ua:case yn:return{byteLength:4,components:1};case ru:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function M0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Vt,u=new WeakMap;let p;const h=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(z,R){return f?new OffscreenCanvas(z,R):Gr("canvas")}function _(z,R,T){let U=1;const W=Dt(z);if((W.width>T||W.height>T)&&(U=T/Math.max(W.width,W.height)),U<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const B=Math.floor(U*W.width),_t=Math.floor(U*W.height);p===void 0&&(p=m(B,_t));const at=R?m(B,_t):p;return at.width=B,at.height=_t,at.getContext("2d").drawImage(z,0,0,B,_t),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+W.width+"x"+W.height+") to ("+B+"x"+_t+")."),at}else return"data"in z&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+W.width+"x"+W.height+")."),z;return z}function g(z){return z.generateMipmaps}function d(z){i.generateMipmap(z)}function M(z){return z.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?i.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(z,R,T,U,W=!1){if(z!==null){if(i[z]!==void 0)return i[z];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let B=R;if(R===i.RED&&(T===i.FLOAT&&(B=i.R32F),T===i.HALF_FLOAT&&(B=i.R16F),T===i.UNSIGNED_BYTE&&(B=i.R8)),R===i.RED_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.R8UI),T===i.UNSIGNED_SHORT&&(B=i.R16UI),T===i.UNSIGNED_INT&&(B=i.R32UI),T===i.BYTE&&(B=i.R8I),T===i.SHORT&&(B=i.R16I),T===i.INT&&(B=i.R32I)),R===i.RG&&(T===i.FLOAT&&(B=i.RG32F),T===i.HALF_FLOAT&&(B=i.RG16F),T===i.UNSIGNED_BYTE&&(B=i.RG8)),R===i.RG_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.RG8UI),T===i.UNSIGNED_SHORT&&(B=i.RG16UI),T===i.UNSIGNED_INT&&(B=i.RG32UI),T===i.BYTE&&(B=i.RG8I),T===i.SHORT&&(B=i.RG16I),T===i.INT&&(B=i.RG32I)),R===i.RGB_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.RGB8UI),T===i.UNSIGNED_SHORT&&(B=i.RGB16UI),T===i.UNSIGNED_INT&&(B=i.RGB32UI),T===i.BYTE&&(B=i.RGB8I),T===i.SHORT&&(B=i.RGB16I),T===i.INT&&(B=i.RGB32I)),R===i.RGBA_INTEGER&&(T===i.UNSIGNED_BYTE&&(B=i.RGBA8UI),T===i.UNSIGNED_SHORT&&(B=i.RGBA16UI),T===i.UNSIGNED_INT&&(B=i.RGBA32UI),T===i.BYTE&&(B=i.RGBA8I),T===i.SHORT&&(B=i.RGBA16I),T===i.INT&&(B=i.RGBA32I)),R===i.RGB&&T===i.UNSIGNED_INT_5_9_9_9_REV&&(B=i.RGB9_E5),R===i.RGBA){const _t=W?Yr:te.getTransfer(U);T===i.FLOAT&&(B=i.RGBA32F),T===i.HALF_FLOAT&&(B=i.RGBA16F),T===i.UNSIGNED_BYTE&&(B=_t===oe?i.SRGB8_ALPHA8:i.RGBA8),T===i.UNSIGNED_SHORT_4_4_4_4&&(B=i.RGBA4),T===i.UNSIGNED_SHORT_5_5_5_1&&(B=i.RGB5_A1)}return(B===i.R16F||B===i.R32F||B===i.RG16F||B===i.RG32F||B===i.RGBA16F||B===i.RGBA32F)&&t.get("EXT_color_buffer_float"),B}function x(z,R){let T;return z?R===null||R===Ti||R===as?T=i.DEPTH24_STENCIL8:R===yn?T=i.DEPTH32F_STENCIL8:R===Bs&&(T=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===Ti||R===as?T=i.DEPTH_COMPONENT24:R===yn?T=i.DEPTH_COMPONENT32F:R===Bs&&(T=i.DEPTH_COMPONENT16),T}function w(z,R){return g(z)===!0||z.isFramebufferTexture&&z.minFilter!==Je&&z.minFilter!==hn?Math.log2(Math.max(R.width,R.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?R.mipmaps.length:1}function E(z){const R=z.target;R.removeEventListener("dispose",E),P(R),R.isVideoTexture&&u.delete(R)}function b(z){const R=z.target;R.removeEventListener("dispose",b),v(R)}function P(z){const R=n.get(z);if(R.__webglInit===void 0)return;const T=z.source,U=h.get(T);if(U){const W=U[R.__cacheKey];W.usedTimes--,W.usedTimes===0&&S(z),Object.keys(U).length===0&&h.delete(T)}n.remove(z)}function S(z){const R=n.get(z);i.deleteTexture(R.__webglTexture);const T=z.source,U=h.get(T);delete U[R.__cacheKey],o.memory.textures--}function v(z){const R=n.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),n.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(R.__webglFramebuffer[U]))for(let W=0;W<R.__webglFramebuffer[U].length;W++)i.deleteFramebuffer(R.__webglFramebuffer[U][W]);else i.deleteFramebuffer(R.__webglFramebuffer[U]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[U])}else{if(Array.isArray(R.__webglFramebuffer))for(let U=0;U<R.__webglFramebuffer.length;U++)i.deleteFramebuffer(R.__webglFramebuffer[U]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let U=0;U<R.__webglColorRenderbuffer.length;U++)R.__webglColorRenderbuffer[U]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[U]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const T=z.textures;for(let U=0,W=T.length;U<W;U++){const B=n.get(T[U]);B.__webglTexture&&(i.deleteTexture(B.__webglTexture),o.memory.textures--),n.remove(T[U])}n.remove(z)}let A=0;function N(){A=0}function k(){const z=A;return z>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+z+" texture units while this GPU supports only "+s.maxTextures),A+=1,z}function $(z){const R=[];return R.push(z.wrapS),R.push(z.wrapT),R.push(z.wrapR||0),R.push(z.magFilter),R.push(z.minFilter),R.push(z.anisotropy),R.push(z.internalFormat),R.push(z.format),R.push(z.type),R.push(z.generateMipmaps),R.push(z.premultiplyAlpha),R.push(z.flipY),R.push(z.unpackAlignment),R.push(z.colorSpace),R.join()}function Q(z,R){const T=n.get(z);if(z.isVideoTexture&&yt(z),z.isRenderTargetTexture===!1&&z.version>0&&T.__version!==z.version){const U=z.image;if(U===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{lt(T,z,R);return}}e.bindTexture(i.TEXTURE_2D,T.__webglTexture,i.TEXTURE0+R)}function K(z,R){const T=n.get(z);if(z.version>0&&T.__version!==z.version){lt(T,z,R);return}e.bindTexture(i.TEXTURE_2D_ARRAY,T.__webglTexture,i.TEXTURE0+R)}function O(z,R){const T=n.get(z);if(z.version>0&&T.__version!==z.version){lt(T,z,R);return}e.bindTexture(i.TEXTURE_3D,T.__webglTexture,i.TEXTURE0+R)}function H(z,R){const T=n.get(z);if(z.version>0&&T.__version!==z.version){Mt(T,z,R);return}e.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+R)}const ot={[Br]:i.REPEAT,[yi]:i.CLAMP_TO_EDGE,[Jo]:i.MIRRORED_REPEAT},st={[Je]:i.NEAREST,[qh]:i.NEAREST_MIPMAP_NEAREST,[js]:i.NEAREST_MIPMAP_LINEAR,[hn]:i.LINEAR,[eo]:i.LINEAR_MIPMAP_NEAREST,[Si]:i.LINEAR_MIPMAP_LINEAR},vt={[Kh]:i.NEVER,[nf]:i.ALWAYS,[Zh]:i.LESS,[du]:i.LEQUAL,[Jh]:i.EQUAL,[ef]:i.GEQUAL,[Qh]:i.GREATER,[tf]:i.NOTEQUAL};function St(z,R){if(R.type===yn&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===hn||R.magFilter===eo||R.magFilter===js||R.magFilter===Si||R.minFilter===hn||R.minFilter===eo||R.minFilter===js||R.minFilter===Si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(z,i.TEXTURE_WRAP_S,ot[R.wrapS]),i.texParameteri(z,i.TEXTURE_WRAP_T,ot[R.wrapT]),(z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY)&&i.texParameteri(z,i.TEXTURE_WRAP_R,ot[R.wrapR]),i.texParameteri(z,i.TEXTURE_MAG_FILTER,st[R.magFilter]),i.texParameteri(z,i.TEXTURE_MIN_FILTER,st[R.minFilter]),R.compareFunction&&(i.texParameteri(z,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(z,i.TEXTURE_COMPARE_FUNC,vt[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===Je||R.minFilter!==js&&R.minFilter!==Si||R.type===yn&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const T=t.get("EXT_texture_filter_anisotropic");i.texParameterf(z,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function Pt(z,R){let T=!1;z.__webglInit===void 0&&(z.__webglInit=!0,R.addEventListener("dispose",E));const U=R.source;let W=h.get(U);W===void 0&&(W={},h.set(U,W));const B=$(R);if(B!==z.__cacheKey){W[B]===void 0&&(W[B]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,T=!0),W[B].usedTimes++;const _t=W[z.__cacheKey];_t!==void 0&&(W[z.__cacheKey].usedTimes--,_t.usedTimes===0&&S(R)),z.__cacheKey=B,z.__webglTexture=W[B].texture}return T}function lt(z,R,T){let U=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(U=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(U=i.TEXTURE_3D);const W=Pt(z,R),B=R.source;e.bindTexture(U,z.__webglTexture,i.TEXTURE0+T);const _t=n.get(B);if(B.version!==_t.__version||W===!0){e.activeTexture(i.TEXTURE0+T);const at=te.getPrimaries(te.workingColorSpace),dt=R.colorSpace===ei?null:te.getPrimaries(R.colorSpace),bt=R.colorSpace===ei||at===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);let I=_(R.image,!1,s.maxTextureSize);I=Nt(R,I);const G=r.convert(R.format,R.colorSpace),J=r.convert(R.type);let et=y(R.internalFormat,G,J,R.colorSpace,R.isVideoTexture);St(U,R);let F;const C=R.mipmaps,X=R.isVideoTexture!==!0,nt=_t.__version===void 0||W===!0,D=B.dataReady,tt=w(R,I);if(R.isDepthTexture)et=x(R.format===ls,R.type),nt&&(X?e.texStorage2D(i.TEXTURE_2D,1,et,I.width,I.height):e.texImage2D(i.TEXTURE_2D,0,et,I.width,I.height,0,G,J,null));else if(R.isDataTexture)if(C.length>0){X&&nt&&e.texStorage2D(i.TEXTURE_2D,tt,et,C[0].width,C[0].height);for(let q=0,Z=C.length;q<Z;q++)F=C[q],X?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,F.width,F.height,G,J,F.data):e.texImage2D(i.TEXTURE_2D,q,et,F.width,F.height,0,G,J,F.data);R.generateMipmaps=!1}else X?(nt&&e.texStorage2D(i.TEXTURE_2D,tt,et,I.width,I.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,I.width,I.height,G,J,I.data)):e.texImage2D(i.TEXTURE_2D,0,et,I.width,I.height,0,G,J,I.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){X&&nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,tt,et,C[0].width,C[0].height,I.depth);for(let q=0,Z=C.length;q<Z;q++)if(F=C[q],R.format!==fn)if(G!==null)if(X){if(D)if(R.layerUpdates.size>0){const ft=uc(F.width,F.height,R.format,R.type);for(const ct of R.layerUpdates){const At=F.data.subarray(ct*ft/F.data.BYTES_PER_ELEMENT,(ct+1)*ft/F.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,ct,F.width,F.height,1,G,At)}R.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,F.width,F.height,I.depth,G,F.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,q,et,F.width,F.height,I.depth,0,F.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else X?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,q,0,0,0,F.width,F.height,I.depth,G,J,F.data):e.texImage3D(i.TEXTURE_2D_ARRAY,q,et,F.width,F.height,I.depth,0,G,J,F.data)}else{X&&nt&&e.texStorage2D(i.TEXTURE_2D,tt,et,C[0].width,C[0].height);for(let q=0,Z=C.length;q<Z;q++)F=C[q],R.format!==fn?G!==null?X?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,q,0,0,F.width,F.height,G,F.data):e.compressedTexImage2D(i.TEXTURE_2D,q,et,F.width,F.height,0,F.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):X?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,F.width,F.height,G,J,F.data):e.texImage2D(i.TEXTURE_2D,q,et,F.width,F.height,0,G,J,F.data)}else if(R.isDataArrayTexture)if(X){if(nt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,tt,et,I.width,I.height,I.depth),D)if(R.layerUpdates.size>0){const q=uc(I.width,I.height,R.format,R.type);for(const Z of R.layerUpdates){const ft=I.data.subarray(Z*q/I.data.BYTES_PER_ELEMENT,(Z+1)*q/I.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,I.width,I.height,1,G,J,ft)}R.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,I.width,I.height,I.depth,G,J,I.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,et,I.width,I.height,I.depth,0,G,J,I.data);else if(R.isData3DTexture)X?(nt&&e.texStorage3D(i.TEXTURE_3D,tt,et,I.width,I.height,I.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,I.width,I.height,I.depth,G,J,I.data)):e.texImage3D(i.TEXTURE_3D,0,et,I.width,I.height,I.depth,0,G,J,I.data);else if(R.isFramebufferTexture){if(nt)if(X)e.texStorage2D(i.TEXTURE_2D,tt,et,I.width,I.height);else{let q=I.width,Z=I.height;for(let ft=0;ft<tt;ft++)e.texImage2D(i.TEXTURE_2D,ft,et,q,Z,0,G,J,null),q>>=1,Z>>=1}}else if(C.length>0){if(X&&nt){const q=Dt(C[0]);e.texStorage2D(i.TEXTURE_2D,tt,et,q.width,q.height)}for(let q=0,Z=C.length;q<Z;q++)F=C[q],X?D&&e.texSubImage2D(i.TEXTURE_2D,q,0,0,G,J,F):e.texImage2D(i.TEXTURE_2D,q,et,G,J,F);R.generateMipmaps=!1}else if(X){if(nt){const q=Dt(I);e.texStorage2D(i.TEXTURE_2D,tt,et,q.width,q.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,G,J,I)}else e.texImage2D(i.TEXTURE_2D,0,et,G,J,I);g(R)&&d(U),_t.__version=B.version,R.onUpdate&&R.onUpdate(R)}z.__version=R.version}function Mt(z,R,T){if(R.image.length!==6)return;const U=Pt(z,R),W=R.source;e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+T);const B=n.get(W);if(W.version!==B.__version||U===!0){e.activeTexture(i.TEXTURE0+T);const _t=te.getPrimaries(te.workingColorSpace),at=R.colorSpace===ei?null:te.getPrimaries(R.colorSpace),dt=R.colorSpace===ei||_t===at?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,dt);const bt=R.isCompressedTexture||R.image[0].isCompressedTexture,I=R.image[0]&&R.image[0].isDataTexture,G=[];for(let Z=0;Z<6;Z++)!bt&&!I?G[Z]=_(R.image[Z],!0,s.maxCubemapSize):G[Z]=I?R.image[Z].image:R.image[Z],G[Z]=Nt(R,G[Z]);const J=G[0],et=r.convert(R.format,R.colorSpace),F=r.convert(R.type),C=y(R.internalFormat,et,F,R.colorSpace),X=R.isVideoTexture!==!0,nt=B.__version===void 0||U===!0,D=W.dataReady;let tt=w(R,J);St(i.TEXTURE_CUBE_MAP,R);let q;if(bt){X&&nt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,tt,C,J.width,J.height);for(let Z=0;Z<6;Z++){q=G[Z].mipmaps;for(let ft=0;ft<q.length;ft++){const ct=q[ft];R.format!==fn?et!==null?X?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,0,0,ct.width,ct.height,et,ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,C,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,0,0,ct.width,ct.height,et,F,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft,C,ct.width,ct.height,0,et,F,ct.data)}}}else{if(q=R.mipmaps,X&&nt){q.length>0&&tt++;const Z=Dt(G[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,tt,C,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(I){X?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,G[Z].width,G[Z].height,et,F,G[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,C,G[Z].width,G[Z].height,0,et,F,G[Z].data);for(let ft=0;ft<q.length;ft++){const At=q[ft].image[Z].image;X?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,0,0,At.width,At.height,et,F,At.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,C,At.width,At.height,0,et,F,At.data)}}else{X?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,et,F,G[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,C,et,F,G[Z]);for(let ft=0;ft<q.length;ft++){const ct=q[ft];X?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,0,0,et,F,ct.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ft+1,C,et,F,ct.image[Z])}}}g(R)&&d(i.TEXTURE_CUBE_MAP),B.__version=W.version,R.onUpdate&&R.onUpdate(R)}z.__version=R.version}function Tt(z,R,T,U,W,B){const _t=r.convert(T.format,T.colorSpace),at=r.convert(T.type),dt=y(T.internalFormat,_t,at,T.colorSpace),bt=n.get(R),I=n.get(T);if(I.__renderTarget=R,!bt.__hasExternalTextures){const G=Math.max(1,R.width>>B),J=Math.max(1,R.height>>B);W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?e.texImage3D(W,B,dt,G,J,R.depth,0,_t,at,null):e.texImage2D(W,B,dt,G,J,0,_t,at,null)}e.bindFramebuffer(i.FRAMEBUFFER,z),xt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,U,W,I.__webglTexture,0,wt(R)):(W===i.TEXTURE_2D||W>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&W<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,U,W,I.__webglTexture,B),e.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(z,R,T){if(i.bindRenderbuffer(i.RENDERBUFFER,z),R.depthBuffer){const U=R.depthTexture,W=U&&U.isDepthTexture?U.type:null,B=x(R.stencilBuffer,W),_t=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,at=wt(R);xt(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,B,R.width,R.height):T?i.renderbufferStorageMultisample(i.RENDERBUFFER,at,B,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,B,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_t,i.RENDERBUFFER,z)}else{const U=R.textures;for(let W=0;W<U.length;W++){const B=U[W],_t=r.convert(B.format,B.colorSpace),at=r.convert(B.type),dt=y(B.internalFormat,_t,at,B.colorSpace),bt=wt(R);T&&xt(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,bt,dt,R.width,R.height):xt(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,bt,dt,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,dt,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ct(z,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,z),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const U=n.get(R.depthTexture);U.__renderTarget=R,(!U.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),Q(R.depthTexture,0);const W=U.__webglTexture,B=wt(R);if(R.depthTexture.format===es)xt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,W,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,W,0);else if(R.depthTexture.format===ls)xt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,W,0,B):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,W,0);else throw new Error("Unknown depthTexture format")}function V(z){const R=n.get(z),T=z.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==z.depthTexture){const U=z.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),U){const W=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,U.removeEventListener("dispose",W)};U.addEventListener("dispose",W),R.__depthDisposeCallback=W}R.__boundDepthTexture=U}if(z.depthTexture&&!R.__autoAllocateDepthBuffer){if(T)throw new Error("target.depthTexture not supported in Cube render targets");Ct(R.__webglFramebuffer,z)}else if(T){R.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[U]),R.__webglDepthbuffer[U]===void 0)R.__webglDepthbuffer[U]=i.createRenderbuffer(),pt(R.__webglDepthbuffer[U],z,!1);else{const W=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=R.__webglDepthbuffer[U];i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,W,i.RENDERBUFFER,B)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),pt(R.__webglDepthbuffer,z,!1);else{const U=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,W)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function gt(z,R,T){const U=n.get(z);R!==void 0&&Tt(U.__webglFramebuffer,z,z.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),T!==void 0&&V(z)}function mt(z){const R=z.texture,T=n.get(z),U=n.get(R);z.addEventListener("dispose",b);const W=z.textures,B=z.isWebGLCubeRenderTarget===!0,_t=W.length>1;if(_t||(U.__webglTexture===void 0&&(U.__webglTexture=i.createTexture()),U.__version=R.version,o.memory.textures++),B){T.__webglFramebuffer=[];for(let at=0;at<6;at++)if(R.mipmaps&&R.mipmaps.length>0){T.__webglFramebuffer[at]=[];for(let dt=0;dt<R.mipmaps.length;dt++)T.__webglFramebuffer[at][dt]=i.createFramebuffer()}else T.__webglFramebuffer[at]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){T.__webglFramebuffer=[];for(let at=0;at<R.mipmaps.length;at++)T.__webglFramebuffer[at]=i.createFramebuffer()}else T.__webglFramebuffer=i.createFramebuffer();if(_t)for(let at=0,dt=W.length;at<dt;at++){const bt=n.get(W[at]);bt.__webglTexture===void 0&&(bt.__webglTexture=i.createTexture(),o.memory.textures++)}if(z.samples>0&&xt(z)===!1){T.__webglMultisampledFramebuffer=i.createFramebuffer(),T.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let at=0;at<W.length;at++){const dt=W[at];T.__webglColorRenderbuffer[at]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,T.__webglColorRenderbuffer[at]);const bt=r.convert(dt.format,dt.colorSpace),I=r.convert(dt.type),G=y(dt.internalFormat,bt,I,dt.colorSpace,z.isXRRenderTarget===!0),J=wt(z);i.renderbufferStorageMultisample(i.RENDERBUFFER,J,G,z.width,z.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+at,i.RENDERBUFFER,T.__webglColorRenderbuffer[at])}i.bindRenderbuffer(i.RENDERBUFFER,null),z.depthBuffer&&(T.__webglDepthRenderbuffer=i.createRenderbuffer(),pt(T.__webglDepthRenderbuffer,z,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(B){e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture),St(i.TEXTURE_CUBE_MAP,R);for(let at=0;at<6;at++)if(R.mipmaps&&R.mipmaps.length>0)for(let dt=0;dt<R.mipmaps.length;dt++)Tt(T.__webglFramebuffer[at][dt],z,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,dt);else Tt(T.__webglFramebuffer[at],z,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+at,0);g(R)&&d(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(_t){for(let at=0,dt=W.length;at<dt;at++){const bt=W[at],I=n.get(bt);e.bindTexture(i.TEXTURE_2D,I.__webglTexture),St(i.TEXTURE_2D,bt),Tt(T.__webglFramebuffer,z,bt,i.COLOR_ATTACHMENT0+at,i.TEXTURE_2D,0),g(bt)&&d(i.TEXTURE_2D)}e.unbindTexture()}else{let at=i.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(at=z.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(at,U.__webglTexture),St(at,R),R.mipmaps&&R.mipmaps.length>0)for(let dt=0;dt<R.mipmaps.length;dt++)Tt(T.__webglFramebuffer[dt],z,R,i.COLOR_ATTACHMENT0,at,dt);else Tt(T.__webglFramebuffer,z,R,i.COLOR_ATTACHMENT0,at,0);g(R)&&d(at),e.unbindTexture()}z.depthBuffer&&V(z)}function Et(z){const R=z.textures;for(let T=0,U=R.length;T<U;T++){const W=R[T];if(g(W)){const B=M(z),_t=n.get(W).__webglTexture;e.bindTexture(B,_t),d(B),e.unbindTexture()}}}const Ut=[],Y=[];function Yt(z){if(z.samples>0){if(xt(z)===!1){const R=z.textures,T=z.width,U=z.height;let W=i.COLOR_BUFFER_BIT;const B=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=n.get(z),at=R.length>1;if(at)for(let dt=0;dt<R.length;dt++)e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let dt=0;dt<R.length;dt++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(W|=i.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(W|=i.STENCIL_BUFFER_BIT)),at){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_t.__webglColorRenderbuffer[dt]);const bt=n.get(R[dt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,bt,0)}i.blitFramebuffer(0,0,T,U,0,0,T,U,W,i.NEAREST),l===!0&&(Ut.length=0,Y.length=0,Ut.push(i.COLOR_ATTACHMENT0+dt),z.depthBuffer&&z.resolveDepthBuffer===!1&&(Ut.push(B),Y.push(B),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Y)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ut))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),at)for(let dt=0;dt<R.length;dt++){e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,_t.__webglColorRenderbuffer[dt]);const bt=n.get(R[dt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,_t.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,bt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.resolveDepthBuffer===!1&&l){const R=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function wt(z){return Math.min(s.maxSamples,z.samples)}function xt(z){const R=n.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function yt(z){const R=o.render.frame;u.get(z)!==R&&(u.set(z,R),z.update())}function Nt(z,R){const T=z.colorSpace,U=z.format,W=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||T!==hs&&T!==ei&&(te.getTransfer(T)===oe?(U!==fn||W!==En)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",T)),R}function Dt(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(c.width=z.naturalWidth||z.width,c.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(c.width=z.displayWidth,c.height=z.displayHeight):(c.width=z.width,c.height=z.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=N,this.setTexture2D=Q,this.setTexture2DArray=K,this.setTexture3D=O,this.setTextureCube=H,this.rebindTextures=gt,this.setupRenderTarget=mt,this.updateRenderTargetMipmap=Et,this.updateMultisampleRenderTarget=Yt,this.setupDepthRenderbuffer=V,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=xt}function y0(i,t){function e(n,s=ei){let r;const o=te.getTransfer(s);if(n===En)return i.UNSIGNED_BYTE;if(n===za)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Na)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ru)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===iu)return i.BYTE;if(n===su)return i.SHORT;if(n===Bs)return i.UNSIGNED_SHORT;if(n===Ua)return i.INT;if(n===Ti)return i.UNSIGNED_INT;if(n===yn)return i.FLOAT;if(n===bn)return i.HALF_FLOAT;if(n===ou)return i.ALPHA;if(n===au)return i.RGB;if(n===fn)return i.RGBA;if(n===lu)return i.LUMINANCE;if(n===cu)return i.LUMINANCE_ALPHA;if(n===es)return i.DEPTH_COMPONENT;if(n===ls)return i.DEPTH_STENCIL;if(n===qr)return i.RED;if(n===Fa)return i.RED_INTEGER;if(n===uu)return i.RG;if(n===Oa)return i.RG_INTEGER;if(n===Ba)return i.RGBA_INTEGER;if(n===Pr||n===Lr||n===Dr||n===Ir)if(o===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Pr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Pr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Qo||n===ta||n===ea||n===na)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ta)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===na)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ia||n===sa||n===ra)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ia||n===sa)return o===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ra)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===oa||n===aa||n===la||n===ca||n===ua||n===ha||n===fa||n===da||n===pa||n===ma||n===ga||n===_a||n===xa||n===va)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===oa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===aa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===la)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ca)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ua)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ha)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===fa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===da)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===pa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ma)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ga)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===_a)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xa)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===va)return o===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ur||n===Ma||n===ya)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ur)return o===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ma)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ya)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hu||n===Sa||n===ba||n===Ea)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ur)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Sa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ba)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ea)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===as?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class S0 extends Ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Ve extends Te{constructor(){super(),this.isGroup=!0,this.type="Group"}}const b0={type:"move"};class Co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ve,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ve,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ve,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),d=this._getHandJoint(c,_);g!==null&&(d.matrix.fromArray(g.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=g.radius),d.visible=g!==null}const u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],h=u.position.distanceTo(p.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(b0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Ve;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const E0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,w0=`
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

}`;class T0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Fe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Se({vertexShader:E0,fragmentShader:w0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new qt(new ps(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class A0 extends fs{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,p=null,h=null,f=null,m=null;const _=new T0,g=e.getContextAttributes();let d=null,M=null;const y=[],x=[],w=new Vt;let E=null;const b=new Ze;b.viewport=new ee;const P=new Ze;P.viewport=new ee;const S=[b,P],v=new S0;let A=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(lt){let Mt=y[lt];return Mt===void 0&&(Mt=new Co,y[lt]=Mt),Mt.getTargetRaySpace()},this.getControllerGrip=function(lt){let Mt=y[lt];return Mt===void 0&&(Mt=new Co,y[lt]=Mt),Mt.getGripSpace()},this.getHand=function(lt){let Mt=y[lt];return Mt===void 0&&(Mt=new Co,y[lt]=Mt),Mt.getHandSpace()};function k(lt){const Mt=x.indexOf(lt.inputSource);if(Mt===-1)return;const Tt=y[Mt];Tt!==void 0&&(Tt.update(lt.inputSource,lt.frame,c||o),Tt.dispatchEvent({type:lt.type,data:lt.inputSource}))}function $(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",Q);for(let lt=0;lt<y.length;lt++){const Mt=x[lt];Mt!==null&&(x[lt]=null,y[lt].disconnect(Mt))}A=null,N=null,_.reset(),t.setRenderTarget(d),f=null,h=null,p=null,s=null,M=null,Pt.stop(),n.isPresenting=!1,t.setPixelRatio(E),t.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(lt){r=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(lt){a=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(lt){c=lt},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return p},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(lt){if(s=lt,s!==null){if(d=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",$),s.addEventListener("inputsourceschange",Q),g.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(w),s.renderState.layers===void 0){const Mt={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,Mt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),M=new sn(f.framebufferWidth,f.framebufferHeight,{format:fn,type:En,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let Mt=null,Tt=null,pt=null;g.depth&&(pt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Mt=g.stencil?ls:es,Tt=g.stencil?as:Ti);const Ct={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};p=new XRWebGLBinding(s,e),h=p.createProjectionLayer(Ct),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),M=new sn(h.textureWidth,h.textureHeight,{format:fn,type:En,depthTexture:new qa(h.textureWidth,h.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,Mt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Pt.setContext(s),Pt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function Q(lt){for(let Mt=0;Mt<lt.removed.length;Mt++){const Tt=lt.removed[Mt],pt=x.indexOf(Tt);pt>=0&&(x[pt]=null,y[pt].disconnect(Tt))}for(let Mt=0;Mt<lt.added.length;Mt++){const Tt=lt.added[Mt];let pt=x.indexOf(Tt);if(pt===-1){for(let V=0;V<y.length;V++)if(V>=x.length){x.push(Tt),pt=V;break}else if(x[V]===null){x[V]=Tt,pt=V;break}if(pt===-1)break}const Ct=y[pt];Ct&&Ct.connect(Tt)}}const K=new j,O=new j;function H(lt,Mt,Tt){K.setFromMatrixPosition(Mt.matrixWorld),O.setFromMatrixPosition(Tt.matrixWorld);const pt=K.distanceTo(O),Ct=Mt.projectionMatrix.elements,V=Tt.projectionMatrix.elements,gt=Ct[14]/(Ct[10]-1),mt=Ct[14]/(Ct[10]+1),Et=(Ct[9]+1)/Ct[5],Ut=(Ct[9]-1)/Ct[5],Y=(Ct[8]-1)/Ct[0],Yt=(V[8]+1)/V[0],wt=gt*Y,xt=gt*Yt,yt=pt/(-Y+Yt),Nt=yt*-Y;if(Mt.matrixWorld.decompose(lt.position,lt.quaternion,lt.scale),lt.translateX(Nt),lt.translateZ(yt),lt.matrixWorld.compose(lt.position,lt.quaternion,lt.scale),lt.matrixWorldInverse.copy(lt.matrixWorld).invert(),Ct[10]===-1)lt.projectionMatrix.copy(Mt.projectionMatrix),lt.projectionMatrixInverse.copy(Mt.projectionMatrixInverse);else{const Dt=gt+yt,z=mt+yt,R=wt-Nt,T=xt+(pt-Nt),U=Et*mt/z*Dt,W=Ut*mt/z*Dt;lt.projectionMatrix.makePerspective(R,T,U,W,Dt,z),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert()}}function ot(lt,Mt){Mt===null?lt.matrixWorld.copy(lt.matrix):lt.matrixWorld.multiplyMatrices(Mt.matrixWorld,lt.matrix),lt.matrixWorldInverse.copy(lt.matrixWorld).invert()}this.updateCamera=function(lt){if(s===null)return;let Mt=lt.near,Tt=lt.far;_.texture!==null&&(_.depthNear>0&&(Mt=_.depthNear),_.depthFar>0&&(Tt=_.depthFar)),v.near=P.near=b.near=Mt,v.far=P.far=b.far=Tt,(A!==v.near||N!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),A=v.near,N=v.far),b.layers.mask=lt.layers.mask|2,P.layers.mask=lt.layers.mask|4,v.layers.mask=b.layers.mask|P.layers.mask;const pt=lt.parent,Ct=v.cameras;ot(v,pt);for(let V=0;V<Ct.length;V++)ot(Ct[V],pt);Ct.length===2?H(v,b,P):v.projectionMatrix.copy(b.projectionMatrix),st(lt,v,pt)};function st(lt,Mt,Tt){Tt===null?lt.matrix.copy(Mt.matrixWorld):(lt.matrix.copy(Tt.matrixWorld),lt.matrix.invert(),lt.matrix.multiply(Mt.matrixWorld)),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.updateMatrixWorld(!0),lt.projectionMatrix.copy(Mt.projectionMatrix),lt.projectionMatrixInverse.copy(Mt.projectionMatrixInverse),lt.isPerspectiveCamera&&(lt.fov=ks*2*Math.atan(1/lt.projectionMatrix.elements[5]),lt.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(lt){l=lt,h!==null&&(h.fixedFoveation=lt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=lt)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let vt=null;function St(lt,Mt){if(u=Mt.getViewerPose(c||o),m=Mt,u!==null){const Tt=u.views;f!==null&&(t.setRenderTargetFramebuffer(M,f.framebuffer),t.setRenderTarget(M));let pt=!1;Tt.length!==v.cameras.length&&(v.cameras.length=0,pt=!0);for(let V=0;V<Tt.length;V++){const gt=Tt[V];let mt=null;if(f!==null)mt=f.getViewport(gt);else{const Ut=p.getViewSubImage(h,gt);mt=Ut.viewport,V===0&&(t.setRenderTargetTextures(M,Ut.colorTexture,h.ignoreDepthValues?void 0:Ut.depthStencilTexture),t.setRenderTarget(M))}let Et=S[V];Et===void 0&&(Et=new Ze,Et.layers.enable(V),Et.viewport=new ee,S[V]=Et),Et.matrix.fromArray(gt.transform.matrix),Et.matrix.decompose(Et.position,Et.quaternion,Et.scale),Et.projectionMatrix.fromArray(gt.projectionMatrix),Et.projectionMatrixInverse.copy(Et.projectionMatrix).invert(),Et.viewport.set(mt.x,mt.y,mt.width,mt.height),V===0&&(v.matrix.copy(Et.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),pt===!0&&v.cameras.push(Et)}const Ct=s.enabledFeatures;if(Ct&&Ct.includes("depth-sensing")){const V=p.getDepthInformation(Tt[0]);V&&V.isValid&&V.texture&&_.init(t,V,s.renderState)}}for(let Tt=0;Tt<y.length;Tt++){const pt=x[Tt],Ct=y[Tt];pt!==null&&Ct!==void 0&&Ct.update(pt,Mt,c||o)}vt&&vt(lt,Mt),Mt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Mt}),m=null}const Pt=new bu;Pt.setAnimationLoop(St),this.setAnimationLoop=function(lt){vt=lt},this.dispose=function(){}}}const mi=new wn,R0=new ne;function C0(i,t){function e(g,d){g.matrixAutoUpdate===!0&&g.updateMatrix(),d.value.copy(g.matrix)}function n(g,d){d.color.getRGB(g.fogColor.value,Mu(i)),d.isFog?(g.fogNear.value=d.near,g.fogFar.value=d.far):d.isFogExp2&&(g.fogDensity.value=d.density)}function s(g,d,M,y,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(g,d):d.isMeshToonMaterial?(r(g,d),p(g,d)):d.isMeshPhongMaterial?(r(g,d),u(g,d)):d.isMeshStandardMaterial?(r(g,d),h(g,d),d.isMeshPhysicalMaterial&&f(g,d,x)):d.isMeshMatcapMaterial?(r(g,d),m(g,d)):d.isMeshDepthMaterial?r(g,d):d.isMeshDistanceMaterial?(r(g,d),_(g,d)):d.isMeshNormalMaterial?r(g,d):d.isLineBasicMaterial?(o(g,d),d.isLineDashedMaterial&&a(g,d)):d.isPointsMaterial?l(g,d,M,y):d.isSpriteMaterial?c(g,d):d.isShadowMaterial?(g.color.value.copy(d.color),g.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(g,d){g.opacity.value=d.opacity,d.color&&g.diffuse.value.copy(d.color),d.emissive&&g.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.bumpMap&&(g.bumpMap.value=d.bumpMap,e(d.bumpMap,g.bumpMapTransform),g.bumpScale.value=d.bumpScale,d.side===qe&&(g.bumpScale.value*=-1)),d.normalMap&&(g.normalMap.value=d.normalMap,e(d.normalMap,g.normalMapTransform),g.normalScale.value.copy(d.normalScale),d.side===qe&&g.normalScale.value.negate()),d.displacementMap&&(g.displacementMap.value=d.displacementMap,e(d.displacementMap,g.displacementMapTransform),g.displacementScale.value=d.displacementScale,g.displacementBias.value=d.displacementBias),d.emissiveMap&&(g.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,g.emissiveMapTransform)),d.specularMap&&(g.specularMap.value=d.specularMap,e(d.specularMap,g.specularMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest);const M=t.get(d),y=M.envMap,x=M.envMapRotation;y&&(g.envMap.value=y,mi.copy(x),mi.x*=-1,mi.y*=-1,mi.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),g.envMapRotation.value.setFromMatrix4(R0.makeRotationFromEuler(mi)),g.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=d.reflectivity,g.ior.value=d.ior,g.refractionRatio.value=d.refractionRatio),d.lightMap&&(g.lightMap.value=d.lightMap,g.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,g.lightMapTransform)),d.aoMap&&(g.aoMap.value=d.aoMap,g.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,g.aoMapTransform))}function o(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform))}function a(g,d){g.dashSize.value=d.dashSize,g.totalSize.value=d.dashSize+d.gapSize,g.scale.value=d.scale}function l(g,d,M,y){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.size.value=d.size*M,g.scale.value=y*.5,d.map&&(g.map.value=d.map,e(d.map,g.uvTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function c(g,d){g.diffuse.value.copy(d.color),g.opacity.value=d.opacity,g.rotation.value=d.rotation,d.map&&(g.map.value=d.map,e(d.map,g.mapTransform)),d.alphaMap&&(g.alphaMap.value=d.alphaMap,e(d.alphaMap,g.alphaMapTransform)),d.alphaTest>0&&(g.alphaTest.value=d.alphaTest)}function u(g,d){g.specular.value.copy(d.specular),g.shininess.value=Math.max(d.shininess,1e-4)}function p(g,d){d.gradientMap&&(g.gradientMap.value=d.gradientMap)}function h(g,d){g.metalness.value=d.metalness,d.metalnessMap&&(g.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,g.metalnessMapTransform)),g.roughness.value=d.roughness,d.roughnessMap&&(g.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,g.roughnessMapTransform)),d.envMap&&(g.envMapIntensity.value=d.envMapIntensity)}function f(g,d,M){g.ior.value=d.ior,d.sheen>0&&(g.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),g.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(g.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,g.sheenColorMapTransform)),d.sheenRoughnessMap&&(g.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,g.sheenRoughnessMapTransform))),d.clearcoat>0&&(g.clearcoat.value=d.clearcoat,g.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(g.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,g.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(g.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===qe&&g.clearcoatNormalScale.value.negate())),d.dispersion>0&&(g.dispersion.value=d.dispersion),d.iridescence>0&&(g.iridescence.value=d.iridescence,g.iridescenceIOR.value=d.iridescenceIOR,g.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(g.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,g.iridescenceMapTransform)),d.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),d.transmission>0&&(g.transmission.value=d.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(g.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,g.transmissionMapTransform)),g.thickness.value=d.thickness,d.thicknessMap&&(g.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=d.attenuationDistance,g.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(g.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(g.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=d.specularIntensity,g.specularColor.value.copy(d.specularColor),d.specularColorMap&&(g.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,g.specularColorMapTransform)),d.specularIntensityMap&&(g.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,d){d.matcap&&(g.matcap.value=d.matcap)}function _(g,d){const M=t.get(d).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function P0(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const x=y.program;n.uniformBlockBinding(M,x)}function c(M,y){let x=s[M.id];x===void 0&&(m(M),x=u(M),s[M.id]=x,M.addEventListener("dispose",g));const w=y.program;n.updateUBOMapping(M,w);const E=t.render.frame;r[M.id]!==E&&(h(M),r[M.id]=E)}function u(M){const y=p();M.__bindingPointIndex=y;const x=i.createBuffer(),w=M.__size,E=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,w,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function p(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(M){const y=s[M.id],x=M.uniforms,w=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let E=0,b=x.length;E<b;E++){const P=Array.isArray(x[E])?x[E]:[x[E]];for(let S=0,v=P.length;S<v;S++){const A=P[S];if(f(A,E,S,w)===!0){const N=A.__offset,k=Array.isArray(A.value)?A.value:[A.value];let $=0;for(let Q=0;Q<k.length;Q++){const K=k[Q],O=_(K);typeof K=="number"||typeof K=="boolean"?(A.__data[0]=K,i.bufferSubData(i.UNIFORM_BUFFER,N+$,A.__data)):K.isMatrix3?(A.__data[0]=K.elements[0],A.__data[1]=K.elements[1],A.__data[2]=K.elements[2],A.__data[3]=0,A.__data[4]=K.elements[3],A.__data[5]=K.elements[4],A.__data[6]=K.elements[5],A.__data[7]=0,A.__data[8]=K.elements[6],A.__data[9]=K.elements[7],A.__data[10]=K.elements[8],A.__data[11]=0):(K.toArray(A.__data,$),$+=O.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(M,y,x,w){const E=M.value,b=y+"_"+x;if(w[b]===void 0)return typeof E=="number"||typeof E=="boolean"?w[b]=E:w[b]=E.clone(),!0;{const P=w[b];if(typeof E=="number"||typeof E=="boolean"){if(P!==E)return w[b]=E,!0}else if(P.equals(E)===!1)return P.copy(E),!0}return!1}function m(M){const y=M.uniforms;let x=0;const w=16;for(let b=0,P=y.length;b<P;b++){const S=Array.isArray(y[b])?y[b]:[y[b]];for(let v=0,A=S.length;v<A;v++){const N=S[v],k=Array.isArray(N.value)?N.value:[N.value];for(let $=0,Q=k.length;$<Q;$++){const K=k[$],O=_(K),H=x%w,ot=H%O.boundary,st=H+ot;x+=ot,st!==0&&w-st<O.storage&&(x+=w-st),N.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=x,x+=O.storage}}}const E=x%w;return E>0&&(x+=w-E),M.__size=x,M.__cache={},this}function _(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function g(M){const y=M.target;y.removeEventListener("dispose",g);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class L0{constructor(t={}){const{canvas:e=Mf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,d=null;const M=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ke,this.toneMapping=ri,this.toneMappingExposure=1;const x=this;let w=!1,E=0,b=0,P=null,S=-1,v=null;const A=new ee,N=new ee;let k=null;const $=new kt(0);let Q=0,K=e.width,O=e.height,H=1,ot=null,st=null;const vt=new ee(0,0,K,O),St=new ee(0,0,K,O);let Pt=!1;const lt=new Va;let Mt=!1,Tt=!1;const pt=new ne,Ct=new ne,V=new j,gt=new ee,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Et=!1;function Ut(){return P===null?H:1}let Y=n;function Yt(L,it){return e.getContext(L,it)}try{const L={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Da}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",ft,!1),e.addEventListener("webglcontextcreationerror",ct,!1),Y===null){const it="webgl2";if(Y=Yt(it,L),Y===null)throw Yt(it)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let wt,xt,yt,Nt,Dt,z,R,T,U,W,B,_t,at,dt,bt,I,G,J,et,F,C,X,nt,D;function tt(){wt=new Nm(Y),wt.init(),X=new y0(Y,wt),xt=new Pm(Y,wt,t,X),yt=new x0(Y,wt),xt.reverseDepthBuffer&&h&&yt.buffers.depth.setReversed(!0),Nt=new Bm(Y),Dt=new i0,z=new M0(Y,wt,yt,Dt,xt,X,Nt),R=new Dm(x),T=new zm(x),U=new qf(Y),nt=new Rm(Y,U),W=new Fm(Y,U,Nt,nt),B=new Gm(Y,W,U,Nt),et=new km(Y,xt,z),I=new Lm(Dt),_t=new n0(x,R,T,wt,xt,nt,I),at=new C0(x,Dt),dt=new r0,bt=new h0(wt),J=new Am(x,R,T,yt,B,f,l),G=new g0(x,B,xt),D=new P0(Y,Nt,xt,yt),F=new Cm(Y,wt,Nt),C=new Om(Y,wt,Nt),Nt.programs=_t.programs,x.capabilities=xt,x.extensions=wt,x.properties=Dt,x.renderLists=dt,x.shadowMap=G,x.state=yt,x.info=Nt}tt();const q=new A0(x,Y);this.xr=q,this.getContext=function(){return Y},this.getContextAttributes=function(){return Y.getContextAttributes()},this.forceContextLoss=function(){const L=wt.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=wt.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(L){L!==void 0&&(H=L,this.setSize(K,O,!1))},this.getSize=function(L){return L.set(K,O)},this.setSize=function(L,it,ut=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}K=L,O=it,e.width=Math.floor(L*H),e.height=Math.floor(it*H),ut===!0&&(e.style.width=L+"px",e.style.height=it+"px"),this.setViewport(0,0,L,it)},this.getDrawingBufferSize=function(L){return L.set(K*H,O*H).floor()},this.setDrawingBufferSize=function(L,it,ut){K=L,O=it,H=ut,e.width=Math.floor(L*ut),e.height=Math.floor(it*ut),this.setViewport(0,0,L,it)},this.getCurrentViewport=function(L){return L.copy(A)},this.getViewport=function(L){return L.copy(vt)},this.setViewport=function(L,it,ut,ht){L.isVector4?vt.set(L.x,L.y,L.z,L.w):vt.set(L,it,ut,ht),yt.viewport(A.copy(vt).multiplyScalar(H).round())},this.getScissor=function(L){return L.copy(St)},this.setScissor=function(L,it,ut,ht){L.isVector4?St.set(L.x,L.y,L.z,L.w):St.set(L,it,ut,ht),yt.scissor(N.copy(St).multiplyScalar(H).round())},this.getScissorTest=function(){return Pt},this.setScissorTest=function(L){yt.setScissorTest(Pt=L)},this.setOpaqueSort=function(L){ot=L},this.setTransparentSort=function(L){st=L},this.getClearColor=function(L){return L.copy(J.getClearColor())},this.setClearColor=function(){J.setClearColor.apply(J,arguments)},this.getClearAlpha=function(){return J.getClearAlpha()},this.setClearAlpha=function(){J.setClearAlpha.apply(J,arguments)},this.clear=function(L=!0,it=!0,ut=!0){let ht=0;if(L){let rt=!1;if(P!==null){const Rt=P.texture.format;rt=Rt===Ba||Rt===Oa||Rt===Fa}if(rt){const Rt=P.texture.type,It=Rt===En||Rt===Ti||Rt===Bs||Rt===as||Rt===za||Rt===Na,Ft=J.getClearColor(),Ot=J.getClearAlpha(),Xt=Ft.r,$t=Ft.g,Bt=Ft.b;It?(m[0]=Xt,m[1]=$t,m[2]=Bt,m[3]=Ot,Y.clearBufferuiv(Y.COLOR,0,m)):(_[0]=Xt,_[1]=$t,_[2]=Bt,_[3]=Ot,Y.clearBufferiv(Y.COLOR,0,_))}else ht|=Y.COLOR_BUFFER_BIT}it&&(ht|=Y.DEPTH_BUFFER_BIT),ut&&(ht|=Y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Y.clear(ht)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",ft,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),dt.dispose(),bt.dispose(),Dt.dispose(),R.dispose(),T.dispose(),B.dispose(),nt.dispose(),D.dispose(),_t.dispose(),q.dispose(),q.removeEventListener("sessionstart",Ci),q.removeEventListener("sessionend",el),ci.stop()};function Z(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function ft(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const L=Nt.autoReset,it=G.enabled,ut=G.autoUpdate,ht=G.needsUpdate,rt=G.type;tt(),Nt.autoReset=L,G.enabled=it,G.autoUpdate=ut,G.needsUpdate=ht,G.type=rt}function ct(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function At(L){const it=L.target;it.removeEventListener("dispose",At),zt(it)}function zt(L){Wt(L),Dt.remove(L)}function Wt(L){const it=Dt.get(L).programs;it!==void 0&&(it.forEach(function(ut){_t.releaseProgram(ut)}),L.isShaderMaterial&&_t.releaseShaderCache(L))}this.renderBufferDirect=function(L,it,ut,ht,rt,Rt){it===null&&(it=mt);const It=rt.isMesh&&rt.matrixWorld.determinant()<0,Ft=ju(L,it,ut,ht,rt);yt.setMaterial(ht,It);let Ot=ut.index,Xt=1;if(ht.wireframe===!0){if(Ot=W.getWireframeAttribute(ut),Ot===void 0)return;Xt=2}const $t=ut.drawRange,Bt=ut.attributes.position;let ie=$t.start*Xt,ue=($t.start+$t.count)*Xt;Rt!==null&&(ie=Math.max(ie,Rt.start*Xt),ue=Math.min(ue,(Rt.start+Rt.count)*Xt)),Ot!==null?(ie=Math.max(ie,0),ue=Math.min(ue,Ot.count)):Bt!=null&&(ie=Math.max(ie,0),ue=Math.min(ue,Bt.count));const he=ue-ie;if(he<0||he===1/0)return;nt.setup(rt,ht,Ft,ut,Ot);let We,se=F;if(Ot!==null&&(We=U.get(Ot),se=C,se.setIndex(We)),rt.isMesh)ht.wireframe===!0?(yt.setLineWidth(ht.wireframeLinewidth*Ut()),se.setMode(Y.LINES)):se.setMode(Y.TRIANGLES);else if(rt.isLine){let Gt=ht.linewidth;Gt===void 0&&(Gt=1),yt.setLineWidth(Gt*Ut()),rt.isLineSegments?se.setMode(Y.LINES):rt.isLineLoop?se.setMode(Y.LINE_LOOP):se.setMode(Y.LINE_STRIP)}else rt.isPoints?se.setMode(Y.POINTS):rt.isSprite&&se.setMode(Y.TRIANGLES);if(rt.isBatchedMesh)if(rt._multiDrawInstances!==null)se.renderMultiDrawInstances(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount,rt._multiDrawInstances);else if(wt.get("WEBGL_multi_draw"))se.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else{const Gt=rt._multiDrawStarts,An=rt._multiDrawCounts,re=rt._multiDrawCount,rn=Ot?U.get(Ot).bytesPerElement:1,Pi=Dt.get(ht).currentProgram.getUniforms();for(let Ye=0;Ye<re;Ye++)Pi.setValue(Y,"_gl_DrawID",Ye),se.render(Gt[Ye]/rn,An[Ye])}else if(rt.isInstancedMesh)se.renderInstances(ie,he,rt.count);else if(ut.isInstancedBufferGeometry){const Gt=ut._maxInstanceCount!==void 0?ut._maxInstanceCount:1/0,An=Math.min(ut.instanceCount,Gt);se.renderInstances(ie,he,An)}else se.render(ie,he)};function Ht(L,it,ut){L.transparent===!0&&L.side===ge&&L.forceSinglePass===!1?(L.side=qe,L.needsUpdate=!0,Xs(L,it,ut),L.side=oi,L.needsUpdate=!0,Xs(L,it,ut),L.side=ge):Xs(L,it,ut)}this.compile=function(L,it,ut=null){ut===null&&(ut=L),d=bt.get(ut),d.init(it),y.push(d),ut.traverseVisible(function(rt){rt.isLight&&rt.layers.test(it.layers)&&(d.pushLight(rt),rt.castShadow&&d.pushShadow(rt))}),L!==ut&&L.traverseVisible(function(rt){rt.isLight&&rt.layers.test(it.layers)&&(d.pushLight(rt),rt.castShadow&&d.pushShadow(rt))}),d.setupLights();const ht=new Set;return L.traverse(function(rt){if(!(rt.isMesh||rt.isPoints||rt.isLine||rt.isSprite))return;const Rt=rt.material;if(Rt)if(Array.isArray(Rt))for(let It=0;It<Rt.length;It++){const Ft=Rt[It];Ht(Ft,ut,rt),ht.add(Ft)}else Ht(Rt,ut,rt),ht.add(Rt)}),y.pop(),d=null,ht},this.compileAsync=function(L,it,ut=null){const ht=this.compile(L,it,ut);return new Promise(rt=>{function Rt(){if(ht.forEach(function(It){Dt.get(It).currentProgram.isReady()&&ht.delete(It)}),ht.size===0){rt(L);return}setTimeout(Rt,10)}wt.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let ce=null;function pe(L){ce&&ce(L)}function Ci(){ci.stop()}function el(){ci.start()}const ci=new bu;ci.setAnimationLoop(pe),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(L){ce=L,q.setAnimationLoop(L),L===null?ci.stop():ci.start()},q.addEventListener("sessionstart",Ci),q.addEventListener("sessionend",el),this.render=function(L,it){if(it!==void 0&&it.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;if(L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),it.parent===null&&it.matrixWorldAutoUpdate===!0&&it.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(it),it=q.getCamera()),L.isScene===!0&&L.onBeforeRender(x,L,it,P),d=bt.get(L,y.length),d.init(it),y.push(d),Ct.multiplyMatrices(it.projectionMatrix,it.matrixWorldInverse),lt.setFromProjectionMatrix(Ct),Tt=this.localClippingEnabled,Mt=I.init(this.clippingPlanes,Tt),g=dt.get(L,M.length),g.init(),M.push(g),q.enabled===!0&&q.isPresenting===!0){const Rt=x.xr.getDepthSensingMesh();Rt!==null&&Jr(Rt,it,-1/0,x.sortObjects)}Jr(L,it,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(ot,st),Et=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,Et&&J.addToRenderList(g,L),this.info.render.frame++,Mt===!0&&I.beginShadows();const ut=d.state.shadowsArray;G.render(ut,L,it),Mt===!0&&I.endShadows(),this.info.autoReset===!0&&this.info.reset();const ht=g.opaque,rt=g.transmissive;if(d.setupLights(),it.isArrayCamera){const Rt=it.cameras;if(rt.length>0)for(let It=0,Ft=Rt.length;It<Ft;It++){const Ot=Rt[It];il(ht,rt,L,Ot)}Et&&J.render(L);for(let It=0,Ft=Rt.length;It<Ft;It++){const Ot=Rt[It];nl(g,L,Ot,Ot.viewport)}}else rt.length>0&&il(ht,rt,L,it),Et&&J.render(L),nl(g,L,it);P!==null&&(z.updateMultisampleRenderTarget(P),z.updateRenderTargetMipmap(P)),L.isScene===!0&&L.onAfterRender(x,L,it),nt.resetDefaultState(),S=-1,v=null,y.pop(),y.length>0?(d=y[y.length-1],Mt===!0&&I.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Jr(L,it,ut,ht){if(L.visible===!1)return;if(L.layers.test(it.layers)){if(L.isGroup)ut=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(it);else if(L.isLight)d.pushLight(L),L.castShadow&&d.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||lt.intersectsSprite(L)){ht&&gt.setFromMatrixPosition(L.matrixWorld).applyMatrix4(Ct);const It=B.update(L),Ft=L.material;Ft.visible&&g.push(L,It,Ft,ut,gt.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||lt.intersectsObject(L))){const It=B.update(L),Ft=L.material;if(ht&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),gt.copy(L.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),gt.copy(It.boundingSphere.center)),gt.applyMatrix4(L.matrixWorld).applyMatrix4(Ct)),Array.isArray(Ft)){const Ot=It.groups;for(let Xt=0,$t=Ot.length;Xt<$t;Xt++){const Bt=Ot[Xt],ie=Ft[Bt.materialIndex];ie&&ie.visible&&g.push(L,It,ie,ut,gt.z,Bt)}}else Ft.visible&&g.push(L,It,Ft,ut,gt.z,null)}}const Rt=L.children;for(let It=0,Ft=Rt.length;It<Ft;It++)Jr(Rt[It],it,ut,ht)}function nl(L,it,ut,ht){const rt=L.opaque,Rt=L.transmissive,It=L.transparent;d.setupLightsView(ut),Mt===!0&&I.setGlobalState(x.clippingPlanes,ut),ht&&yt.viewport(A.copy(ht)),rt.length>0&&Ws(rt,it,ut),Rt.length>0&&Ws(Rt,it,ut),It.length>0&&Ws(It,it,ut),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function il(L,it,ut,ht){if((ut.isScene===!0?ut.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[ht.id]===void 0&&(d.state.transmissionRenderTarget[ht.id]=new sn(1,1,{generateMipmaps:!0,type:wt.has("EXT_color_buffer_half_float")||wt.has("EXT_color_buffer_float")?bn:En,minFilter:Si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const Rt=d.state.transmissionRenderTarget[ht.id],It=ht.viewport||A;Rt.setSize(It.z,It.w);const Ft=x.getRenderTarget();x.setRenderTarget(Rt),x.getClearColor($),Q=x.getClearAlpha(),Q<1&&x.setClearColor(16777215,.5),x.clear(),Et&&J.render(ut);const Ot=x.toneMapping;x.toneMapping=ri;const Xt=ht.viewport;if(ht.viewport!==void 0&&(ht.viewport=void 0),d.setupLightsView(ht),Mt===!0&&I.setGlobalState(x.clippingPlanes,ht),Ws(L,ut,ht),z.updateMultisampleRenderTarget(Rt),z.updateRenderTargetMipmap(Rt),wt.has("WEBGL_multisampled_render_to_texture")===!1){let $t=!1;for(let Bt=0,ie=it.length;Bt<ie;Bt++){const ue=it[Bt],he=ue.object,We=ue.geometry,se=ue.material,Gt=ue.group;if(se.side===ge&&he.layers.test(ht.layers)){const An=se.side;se.side=qe,se.needsUpdate=!0,sl(he,ut,ht,We,se,Gt),se.side=An,se.needsUpdate=!0,$t=!0}}$t===!0&&(z.updateMultisampleRenderTarget(Rt),z.updateRenderTargetMipmap(Rt))}x.setRenderTarget(Ft),x.setClearColor($,Q),Xt!==void 0&&(ht.viewport=Xt),x.toneMapping=Ot}function Ws(L,it,ut){const ht=it.isScene===!0?it.overrideMaterial:null;for(let rt=0,Rt=L.length;rt<Rt;rt++){const It=L[rt],Ft=It.object,Ot=It.geometry,Xt=ht===null?It.material:ht,$t=It.group;Ft.layers.test(ut.layers)&&sl(Ft,it,ut,Ot,Xt,$t)}}function sl(L,it,ut,ht,rt,Rt){L.onBeforeRender(x,it,ut,ht,rt,Rt),L.modelViewMatrix.multiplyMatrices(ut.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),rt.onBeforeRender(x,it,ut,ht,L,Rt),rt.transparent===!0&&rt.side===ge&&rt.forceSinglePass===!1?(rt.side=qe,rt.needsUpdate=!0,x.renderBufferDirect(ut,it,ht,rt,L,Rt),rt.side=oi,rt.needsUpdate=!0,x.renderBufferDirect(ut,it,ht,rt,L,Rt),rt.side=ge):x.renderBufferDirect(ut,it,ht,rt,L,Rt),L.onAfterRender(x,it,ut,ht,rt,Rt)}function Xs(L,it,ut){it.isScene!==!0&&(it=mt);const ht=Dt.get(L),rt=d.state.lights,Rt=d.state.shadowsArray,It=rt.state.version,Ft=_t.getParameters(L,rt.state,Rt,it,ut),Ot=_t.getProgramCacheKey(Ft);let Xt=ht.programs;ht.environment=L.isMeshStandardMaterial?it.environment:null,ht.fog=it.fog,ht.envMap=(L.isMeshStandardMaterial?T:R).get(L.envMap||ht.environment),ht.envMapRotation=ht.environment!==null&&L.envMap===null?it.environmentRotation:L.envMapRotation,Xt===void 0&&(L.addEventListener("dispose",At),Xt=new Map,ht.programs=Xt);let $t=Xt.get(Ot);if($t!==void 0){if(ht.currentProgram===$t&&ht.lightsStateVersion===It)return ol(L,Ft),$t}else Ft.uniforms=_t.getUniforms(L),L.onBeforeCompile(Ft,x),$t=_t.acquireProgram(Ft,Ot),Xt.set(Ot,$t),ht.uniforms=Ft.uniforms;const Bt=ht.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Bt.clippingPlanes=I.uniform),ol(L,Ft),ht.needsLights=Zu(L),ht.lightsStateVersion=It,ht.needsLights&&(Bt.ambientLightColor.value=rt.state.ambient,Bt.lightProbe.value=rt.state.probe,Bt.directionalLights.value=rt.state.directional,Bt.directionalLightShadows.value=rt.state.directionalShadow,Bt.spotLights.value=rt.state.spot,Bt.spotLightShadows.value=rt.state.spotShadow,Bt.rectAreaLights.value=rt.state.rectArea,Bt.ltc_1.value=rt.state.rectAreaLTC1,Bt.ltc_2.value=rt.state.rectAreaLTC2,Bt.pointLights.value=rt.state.point,Bt.pointLightShadows.value=rt.state.pointShadow,Bt.hemisphereLights.value=rt.state.hemi,Bt.directionalShadowMap.value=rt.state.directionalShadowMap,Bt.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,Bt.spotShadowMap.value=rt.state.spotShadowMap,Bt.spotLightMatrix.value=rt.state.spotLightMatrix,Bt.spotLightMap.value=rt.state.spotLightMap,Bt.pointShadowMap.value=rt.state.pointShadowMap,Bt.pointShadowMatrix.value=rt.state.pointShadowMatrix),ht.currentProgram=$t,ht.uniformsList=null,$t}function rl(L){if(L.uniformsList===null){const it=L.currentProgram.getUniforms();L.uniformsList=zr.seqWithValue(it.seq,L.uniforms)}return L.uniformsList}function ol(L,it){const ut=Dt.get(L);ut.outputColorSpace=it.outputColorSpace,ut.batching=it.batching,ut.batchingColor=it.batchingColor,ut.instancing=it.instancing,ut.instancingColor=it.instancingColor,ut.instancingMorph=it.instancingMorph,ut.skinning=it.skinning,ut.morphTargets=it.morphTargets,ut.morphNormals=it.morphNormals,ut.morphColors=it.morphColors,ut.morphTargetsCount=it.morphTargetsCount,ut.numClippingPlanes=it.numClippingPlanes,ut.numIntersection=it.numClipIntersection,ut.vertexAlphas=it.vertexAlphas,ut.vertexTangents=it.vertexTangents,ut.toneMapping=it.toneMapping}function ju(L,it,ut,ht,rt){it.isScene!==!0&&(it=mt),z.resetTextureUnits();const Rt=it.fog,It=ht.isMeshStandardMaterial?it.environment:null,Ft=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:hs,Ot=(ht.isMeshStandardMaterial?T:R).get(ht.envMap||It),Xt=ht.vertexColors===!0&&!!ut.attributes.color&&ut.attributes.color.itemSize===4,$t=!!ut.attributes.tangent&&(!!ht.normalMap||ht.anisotropy>0),Bt=!!ut.morphAttributes.position,ie=!!ut.morphAttributes.normal,ue=!!ut.morphAttributes.color;let he=ri;ht.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(he=x.toneMapping);const We=ut.morphAttributes.position||ut.morphAttributes.normal||ut.morphAttributes.color,se=We!==void 0?We.length:0,Gt=Dt.get(ht),An=d.state.lights;if(Mt===!0&&(Tt===!0||L!==v)){const Qe=L===v&&ht.id===S;I.setState(ht,L,Qe)}let re=!1;ht.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==An.state.version||Gt.outputColorSpace!==Ft||rt.isBatchedMesh&&Gt.batching===!1||!rt.isBatchedMesh&&Gt.batching===!0||rt.isBatchedMesh&&Gt.batchingColor===!0&&rt.colorTexture===null||rt.isBatchedMesh&&Gt.batchingColor===!1&&rt.colorTexture!==null||rt.isInstancedMesh&&Gt.instancing===!1||!rt.isInstancedMesh&&Gt.instancing===!0||rt.isSkinnedMesh&&Gt.skinning===!1||!rt.isSkinnedMesh&&Gt.skinning===!0||rt.isInstancedMesh&&Gt.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&Gt.instancingColor===!1&&rt.instanceColor!==null||rt.isInstancedMesh&&Gt.instancingMorph===!0&&rt.morphTexture===null||rt.isInstancedMesh&&Gt.instancingMorph===!1&&rt.morphTexture!==null||Gt.envMap!==Ot||ht.fog===!0&&Gt.fog!==Rt||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==I.numPlanes||Gt.numIntersection!==I.numIntersection)||Gt.vertexAlphas!==Xt||Gt.vertexTangents!==$t||Gt.morphTargets!==Bt||Gt.morphNormals!==ie||Gt.morphColors!==ue||Gt.toneMapping!==he||Gt.morphTargetsCount!==se)&&(re=!0):(re=!0,Gt.__version=ht.version);let rn=Gt.currentProgram;re===!0&&(rn=Xs(ht,it,rt));let Pi=!1,Ye=!1,_s=!1;const fe=rn.getUniforms(),dn=Gt.uniforms;if(yt.useProgram(rn.program)&&(Pi=!0,Ye=!0,_s=!0),ht.id!==S&&(S=ht.id,Ye=!0),Pi||v!==L){yt.buffers.depth.getReversed()?(pt.copy(L.projectionMatrix),Sf(pt),bf(pt),fe.setValue(Y,"projectionMatrix",pt)):fe.setValue(Y,"projectionMatrix",L.projectionMatrix),fe.setValue(Y,"viewMatrix",L.matrixWorldInverse);const Hn=fe.map.cameraPosition;Hn!==void 0&&Hn.setValue(Y,V.setFromMatrixPosition(L.matrixWorld)),xt.logarithmicDepthBuffer&&fe.setValue(Y,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(ht.isMeshPhongMaterial||ht.isMeshToonMaterial||ht.isMeshLambertMaterial||ht.isMeshBasicMaterial||ht.isMeshStandardMaterial||ht.isShaderMaterial)&&fe.setValue(Y,"isOrthographic",L.isOrthographicCamera===!0),v!==L&&(v=L,Ye=!0,_s=!0)}if(rt.isSkinnedMesh){fe.setOptional(Y,rt,"bindMatrix"),fe.setOptional(Y,rt,"bindMatrixInverse");const Qe=rt.skeleton;Qe&&(Qe.boneTexture===null&&Qe.computeBoneTexture(),fe.setValue(Y,"boneTexture",Qe.boneTexture,z))}rt.isBatchedMesh&&(fe.setOptional(Y,rt,"batchingTexture"),fe.setValue(Y,"batchingTexture",rt._matricesTexture,z),fe.setOptional(Y,rt,"batchingIdTexture"),fe.setValue(Y,"batchingIdTexture",rt._indirectTexture,z),fe.setOptional(Y,rt,"batchingColorTexture"),rt._colorsTexture!==null&&fe.setValue(Y,"batchingColorTexture",rt._colorsTexture,z));const xs=ut.morphAttributes;if((xs.position!==void 0||xs.normal!==void 0||xs.color!==void 0)&&et.update(rt,ut,rn),(Ye||Gt.receiveShadow!==rt.receiveShadow)&&(Gt.receiveShadow=rt.receiveShadow,fe.setValue(Y,"receiveShadow",rt.receiveShadow)),ht.isMeshGouraudMaterial&&ht.envMap!==null&&(dn.envMap.value=Ot,dn.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),ht.isMeshStandardMaterial&&ht.envMap===null&&it.environment!==null&&(dn.envMapIntensity.value=it.environmentIntensity),Ye&&(fe.setValue(Y,"toneMappingExposure",x.toneMappingExposure),Gt.needsLights&&Ku(dn,_s),Rt&&ht.fog===!0&&at.refreshFogUniforms(dn,Rt),at.refreshMaterialUniforms(dn,ht,H,O,d.state.transmissionRenderTarget[L.id]),zr.upload(Y,rl(Gt),dn,z)),ht.isShaderMaterial&&ht.uniformsNeedUpdate===!0&&(zr.upload(Y,rl(Gt),dn,z),ht.uniformsNeedUpdate=!1),ht.isSpriteMaterial&&fe.setValue(Y,"center",rt.center),fe.setValue(Y,"modelViewMatrix",rt.modelViewMatrix),fe.setValue(Y,"normalMatrix",rt.normalMatrix),fe.setValue(Y,"modelMatrix",rt.matrixWorld),ht.isShaderMaterial||ht.isRawShaderMaterial){const Qe=ht.uniformsGroups;for(let Hn=0,Vn=Qe.length;Hn<Vn;Hn++){const al=Qe[Hn];D.update(al,rn),D.bind(al,rn)}}return rn}function Ku(L,it){L.ambientLightColor.needsUpdate=it,L.lightProbe.needsUpdate=it,L.directionalLights.needsUpdate=it,L.directionalLightShadows.needsUpdate=it,L.pointLights.needsUpdate=it,L.pointLightShadows.needsUpdate=it,L.spotLights.needsUpdate=it,L.spotLightShadows.needsUpdate=it,L.rectAreaLights.needsUpdate=it,L.hemisphereLights.needsUpdate=it}function Zu(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(L,it,ut){Dt.get(L.texture).__webglTexture=it,Dt.get(L.depthTexture).__webglTexture=ut;const ht=Dt.get(L);ht.__hasExternalTextures=!0,ht.__autoAllocateDepthBuffer=ut===void 0,ht.__autoAllocateDepthBuffer||wt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ht.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(L,it){const ut=Dt.get(L);ut.__webglFramebuffer=it,ut.__useDefaultFramebuffer=it===void 0},this.setRenderTarget=function(L,it=0,ut=0){P=L,E=it,b=ut;let ht=!0,rt=null,Rt=!1,It=!1;if(L){const Ot=Dt.get(L);if(Ot.__useDefaultFramebuffer!==void 0)yt.bindFramebuffer(Y.FRAMEBUFFER,null),ht=!1;else if(Ot.__webglFramebuffer===void 0)z.setupRenderTarget(L);else if(Ot.__hasExternalTextures)z.rebindTextures(L,Dt.get(L.texture).__webglTexture,Dt.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){const Bt=L.depthTexture;if(Ot.__boundDepthTexture!==Bt){if(Bt!==null&&Dt.has(Bt)&&(L.width!==Bt.image.width||L.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(L)}}const Xt=L.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(It=!0);const $t=Dt.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray($t[it])?rt=$t[it][ut]:rt=$t[it],Rt=!0):L.samples>0&&z.useMultisampledRTT(L)===!1?rt=Dt.get(L).__webglMultisampledFramebuffer:Array.isArray($t)?rt=$t[ut]:rt=$t,A.copy(L.viewport),N.copy(L.scissor),k=L.scissorTest}else A.copy(vt).multiplyScalar(H).floor(),N.copy(St).multiplyScalar(H).floor(),k=Pt;if(yt.bindFramebuffer(Y.FRAMEBUFFER,rt)&&ht&&yt.drawBuffers(L,rt),yt.viewport(A),yt.scissor(N),yt.setScissorTest(k),Rt){const Ot=Dt.get(L.texture);Y.framebufferTexture2D(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Y.TEXTURE_CUBE_MAP_POSITIVE_X+it,Ot.__webglTexture,ut)}else if(It){const Ot=Dt.get(L.texture),Xt=it||0;Y.framebufferTextureLayer(Y.FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Ot.__webglTexture,ut||0,Xt)}S=-1},this.readRenderTargetPixels=function(L,it,ut,ht,rt,Rt,It){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ft=Dt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&It!==void 0&&(Ft=Ft[It]),Ft){yt.bindFramebuffer(Y.FRAMEBUFFER,Ft);try{const Ot=L.texture,Xt=Ot.format,$t=Ot.type;if(!xt.textureFormatReadable(Xt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!xt.textureTypeReadable($t)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}it>=0&&it<=L.width-ht&&ut>=0&&ut<=L.height-rt&&Y.readPixels(it,ut,ht,rt,X.convert(Xt),X.convert($t),Rt)}finally{const Ot=P!==null?Dt.get(P).__webglFramebuffer:null;yt.bindFramebuffer(Y.FRAMEBUFFER,Ot)}}},this.readRenderTargetPixelsAsync=async function(L,it,ut,ht,rt,Rt,It){if(!(L&&L.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ft=Dt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&It!==void 0&&(Ft=Ft[It]),Ft){const Ot=L.texture,Xt=Ot.format,$t=Ot.type;if(!xt.textureFormatReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!xt.textureTypeReadable($t))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(it>=0&&it<=L.width-ht&&ut>=0&&ut<=L.height-rt){yt.bindFramebuffer(Y.FRAMEBUFFER,Ft);const Bt=Y.createBuffer();Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Bt),Y.bufferData(Y.PIXEL_PACK_BUFFER,Rt.byteLength,Y.STREAM_READ),Y.readPixels(it,ut,ht,rt,X.convert(Xt),X.convert($t),0);const ie=P!==null?Dt.get(P).__webglFramebuffer:null;yt.bindFramebuffer(Y.FRAMEBUFFER,ie);const ue=Y.fenceSync(Y.SYNC_GPU_COMMANDS_COMPLETE,0);return Y.flush(),await yf(Y,ue,4),Y.bindBuffer(Y.PIXEL_PACK_BUFFER,Bt),Y.getBufferSubData(Y.PIXEL_PACK_BUFFER,0,Rt),Y.deleteBuffer(Bt),Y.deleteSync(ue),Rt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(L,it=null,ut=0){L.isTexture!==!0&&(zs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),it=arguments[0]||null,L=arguments[1]);const ht=Math.pow(2,-ut),rt=Math.floor(L.image.width*ht),Rt=Math.floor(L.image.height*ht),It=it!==null?it.x:0,Ft=it!==null?it.y:0;z.setTexture2D(L,0),Y.copyTexSubImage2D(Y.TEXTURE_2D,ut,0,0,It,Ft,rt,Rt),yt.unbindTexture()},this.copyTextureToTexture=function(L,it,ut=null,ht=null,rt=0){L.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture function signature has changed."),ht=arguments[0]||null,L=arguments[1],it=arguments[2],rt=arguments[3]||0,ut=null);let Rt,It,Ft,Ot,Xt,$t,Bt,ie,ue;const he=L.isCompressedTexture?L.mipmaps[rt]:L.image;ut!==null?(Rt=ut.max.x-ut.min.x,It=ut.max.y-ut.min.y,Ft=ut.isBox3?ut.max.z-ut.min.z:1,Ot=ut.min.x,Xt=ut.min.y,$t=ut.isBox3?ut.min.z:0):(Rt=he.width,It=he.height,Ft=he.depth||1,Ot=0,Xt=0,$t=0),ht!==null?(Bt=ht.x,ie=ht.y,ue=ht.z):(Bt=0,ie=0,ue=0);const We=X.convert(it.format),se=X.convert(it.type);let Gt;it.isData3DTexture?(z.setTexture3D(it,0),Gt=Y.TEXTURE_3D):it.isDataArrayTexture||it.isCompressedArrayTexture?(z.setTexture2DArray(it,0),Gt=Y.TEXTURE_2D_ARRAY):(z.setTexture2D(it,0),Gt=Y.TEXTURE_2D),Y.pixelStorei(Y.UNPACK_FLIP_Y_WEBGL,it.flipY),Y.pixelStorei(Y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,it.premultiplyAlpha),Y.pixelStorei(Y.UNPACK_ALIGNMENT,it.unpackAlignment);const An=Y.getParameter(Y.UNPACK_ROW_LENGTH),re=Y.getParameter(Y.UNPACK_IMAGE_HEIGHT),rn=Y.getParameter(Y.UNPACK_SKIP_PIXELS),Pi=Y.getParameter(Y.UNPACK_SKIP_ROWS),Ye=Y.getParameter(Y.UNPACK_SKIP_IMAGES);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,he.width),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,he.height),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,Ot),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,Xt),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,$t);const _s=L.isDataArrayTexture||L.isData3DTexture,fe=it.isDataArrayTexture||it.isData3DTexture;if(L.isRenderTargetTexture||L.isDepthTexture){const dn=Dt.get(L),xs=Dt.get(it),Qe=Dt.get(dn.__renderTarget),Hn=Dt.get(xs.__renderTarget);yt.bindFramebuffer(Y.READ_FRAMEBUFFER,Qe.__webglFramebuffer),yt.bindFramebuffer(Y.DRAW_FRAMEBUFFER,Hn.__webglFramebuffer);for(let Vn=0;Vn<Ft;Vn++)_s&&Y.framebufferTextureLayer(Y.READ_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Dt.get(L).__webglTexture,rt,$t+Vn),L.isDepthTexture?(fe&&Y.framebufferTextureLayer(Y.DRAW_FRAMEBUFFER,Y.COLOR_ATTACHMENT0,Dt.get(it).__webglTexture,rt,ue+Vn),Y.blitFramebuffer(Ot,Xt,Rt,It,Bt,ie,Rt,It,Y.DEPTH_BUFFER_BIT,Y.NEAREST)):fe?Y.copyTexSubImage3D(Gt,rt,Bt,ie,ue+Vn,Ot,Xt,Rt,It):Y.copyTexSubImage2D(Gt,rt,Bt,ie,ue+Vn,Ot,Xt,Rt,It);yt.bindFramebuffer(Y.READ_FRAMEBUFFER,null),yt.bindFramebuffer(Y.DRAW_FRAMEBUFFER,null)}else fe?L.isDataTexture||L.isData3DTexture?Y.texSubImage3D(Gt,rt,Bt,ie,ue,Rt,It,Ft,We,se,he.data):it.isCompressedArrayTexture?Y.compressedTexSubImage3D(Gt,rt,Bt,ie,ue,Rt,It,Ft,We,he.data):Y.texSubImage3D(Gt,rt,Bt,ie,ue,Rt,It,Ft,We,se,he):L.isDataTexture?Y.texSubImage2D(Y.TEXTURE_2D,rt,Bt,ie,Rt,It,We,se,he.data):L.isCompressedTexture?Y.compressedTexSubImage2D(Y.TEXTURE_2D,rt,Bt,ie,he.width,he.height,We,he.data):Y.texSubImage2D(Y.TEXTURE_2D,rt,Bt,ie,Rt,It,We,se,he);Y.pixelStorei(Y.UNPACK_ROW_LENGTH,An),Y.pixelStorei(Y.UNPACK_IMAGE_HEIGHT,re),Y.pixelStorei(Y.UNPACK_SKIP_PIXELS,rn),Y.pixelStorei(Y.UNPACK_SKIP_ROWS,Pi),Y.pixelStorei(Y.UNPACK_SKIP_IMAGES,Ye),rt===0&&it.generateMipmaps&&Y.generateMipmap(Gt),yt.unbindTexture()},this.copyTextureToTexture3D=function(L,it,ut=null,ht=null,rt=0){return L.isTexture!==!0&&(zs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ut=arguments[0]||null,ht=arguments[1]||null,L=arguments[2],it=arguments[3],rt=arguments[4]||0),zs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(L,it,ut,ht,rt)},this.initRenderTarget=function(L){Dt.get(L).__webglFramebuffer===void 0&&z.setupRenderTarget(L)},this.initTexture=function(L){L.isCubeTexture?z.setTextureCube(L,0):L.isData3DTexture?z.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?z.setTexture2DArray(L,0):z.setTexture2D(L,0),yt.unbindTexture()},this.resetState=function(){E=0,b=0,P=null,yt.reset(),nt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}class Ya{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new kt(t),this.near=e,this.far=n}clone(){return new Ya(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class D0 extends Te{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wn,this.environmentIntensity=1,this.environmentRotation=new wn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class I0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=wa,this.updateRanges=[],this.version=0,this.uuid=Bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Oe=new j;class ni{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=un(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ae(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ae(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=un(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=un(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=un(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=un(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ae(e,this.array),n=ae(n,this.array),s=ae(s,this.array),r=ae(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ni(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ru extends Fe{constructor(t=null,e=1,n=1,s,r,o,a,l,c=Je,u=Je,p,h){super(null,o,a,l,c,u,s,r,p,h),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class hc extends Me{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const qi=new ne,fc=new ne,gr=[],dc=new Tn,U0=new ne,bs=new qt,Es=new li;class z0 extends qt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new hc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,U0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Tn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qi),dc.copy(t.boundingBox).applyMatrix4(qi),this.boundingBox.union(dc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new li),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,qi),Es.copy(t.boundingSphere).applyMatrix4(qi),this.boundingSphere.union(Es)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(bs.geometry=this.geometry,bs.material=this.material,bs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Es.copy(this.boundingSphere),Es.applyMatrix4(n),t.ray.intersectsSphere(Es)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,qi),fc.multiplyMatrices(n,qi),bs.matrixWorld=fc,bs.raycast(t,gr);for(let o=0,a=gr.length;o<a;o++){const l=gr[o];l.instanceId=r,l.object=this,e.push(l)}gr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new hc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ru(new Float32Array(s*this.count),s,this.count,qr,yn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class N0 extends ds{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const pc=new ne,Aa=new Ga,_r=new li,xr=new j;class F0 extends Te{constructor(t=new le,e=new N0){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_r.copy(n.boundingSphere),_r.applyMatrix4(s),_r.radius+=r,t.ray.intersectsSphere(_r)===!1)return;pc.copy(s).invert(),Aa.copy(t.ray).applyMatrix4(pc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,p=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=h,_=f;m<_;m++){const g=c.getX(m);xr.fromBufferAttribute(p,g),mc(xr,g,l,s,t,e,this)}}else{const h=Math.max(0,o.start),f=Math.min(p.count,o.start+o.count);for(let m=h,_=f;m<_;m++)xr.fromBufferAttribute(p,m),mc(xr,m,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function mc(i,t,e,n,s,r,o){const a=Aa.distanceSqToPoint(i);if(a<e){const l=new j;Aa.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Cu extends Fe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class $a extends le{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new j,u=new Vt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let p=0,h=3;p<=e;p++,h+=3){const f=n+p/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,l.push(u.x,u.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(a,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $a(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class gs extends le{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],p=[],h=[],f=[];let m=0;const _=[],g=n/2;let d=0;M(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new Zt(p,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(f,2));function M(){const x=new j,w=new j;let E=0;const b=(e-t)/n;for(let P=0;P<=r;P++){const S=[],v=P/r,A=v*(e-t)+t;for(let N=0;N<=s;N++){const k=N/s,$=k*l+a,Q=Math.sin($),K=Math.cos($);w.x=A*Q,w.y=-v*n+g,w.z=A*K,p.push(w.x,w.y,w.z),x.set(Q,b,K).normalize(),h.push(x.x,x.y,x.z),f.push(k,1-v),S.push(m++)}_.push(S)}for(let P=0;P<s;P++)for(let S=0;S<r;S++){const v=_[S][P],A=_[S+1][P],N=_[S+1][P+1],k=_[S][P+1];(t>0||S!==0)&&(u.push(v,A,k),E+=3),(e>0||S!==r-1)&&(u.push(A,N,k),E+=3)}c.addGroup(d,E,0),d+=E}function y(x){const w=m,E=new Vt,b=new j;let P=0;const S=x===!0?t:e,v=x===!0?1:-1;for(let N=1;N<=s;N++)p.push(0,g*v,0),h.push(0,v,0),f.push(.5,.5),m++;const A=m;for(let N=0;N<=s;N++){const $=N/s*l+a,Q=Math.cos($),K=Math.sin($);b.x=S*K,b.y=g*v,b.z=S*Q,p.push(b.x,b.y,b.z),h.push(0,v,0),E.x=Q*.5+.5,E.y=K*.5*v+.5,f.push(E.x,E.y),m++}for(let N=0;N<s;N++){const k=w+N,$=A+N;x===!0?u.push($,$+1,k):u.push($+1,$,k),P+=3}c.addGroup(d,P,x===!0?1:2),d+=P}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ja extends gs{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ja(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class jr extends le{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(M){const y=new j,x=new j,w=new j;for(let E=0;E<e.length;E+=3)f(e[E+0],y),f(e[E+1],x),f(e[E+2],w),l(y,x,w,M)}function l(M,y,x,w){const E=w+1,b=[];for(let P=0;P<=E;P++){b[P]=[];const S=M.clone().lerp(x,P/E),v=y.clone().lerp(x,P/E),A=E-P;for(let N=0;N<=A;N++)N===0&&P===E?b[P][N]=S:b[P][N]=S.clone().lerp(v,N/A)}for(let P=0;P<E;P++)for(let S=0;S<2*(E-P)-1;S++){const v=Math.floor(S/2);S%2===0?(h(b[P][v+1]),h(b[P+1][v]),h(b[P][v])):(h(b[P][v+1]),h(b[P+1][v+1]),h(b[P+1][v]))}}function c(M){const y=new j;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(M),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function u(){const M=new j;for(let y=0;y<r.length;y+=3){M.x=r[y+0],M.y=r[y+1],M.z=r[y+2];const x=g(M)/2/Math.PI+.5,w=d(M)/Math.PI+.5;o.push(x,1-w)}m(),p()}function p(){for(let M=0;M<o.length;M+=6){const y=o[M+0],x=o[M+2],w=o[M+4],E=Math.max(y,x,w),b=Math.min(y,x,w);E>.9&&b<.1&&(y<.2&&(o[M+0]+=1),x<.2&&(o[M+2]+=1),w<.2&&(o[M+4]+=1))}}function h(M){r.push(M.x,M.y,M.z)}function f(M,y){const x=M*3;y.x=t[x+0],y.y=t[x+1],y.z=t[x+2]}function m(){const M=new j,y=new j,x=new j,w=new j,E=new Vt,b=new Vt,P=new Vt;for(let S=0,v=0;S<r.length;S+=9,v+=6){M.set(r[S+0],r[S+1],r[S+2]),y.set(r[S+3],r[S+4],r[S+5]),x.set(r[S+6],r[S+7],r[S+8]),E.set(o[v+0],o[v+1]),b.set(o[v+2],o[v+3]),P.set(o[v+4],o[v+5]),w.copy(M).add(y).add(x).divideScalar(3);const A=g(w);_(E,v+0,M,A),_(b,v+2,y,A),_(P,v+4,x,A)}}function _(M,y,x,w){w<0&&M.x===1&&(o[y]=M.x-1),x.x===0&&x.z===0&&(o[y]=w/2/Math.PI+.5)}function g(M){return Math.atan2(M.z,-M.x)}function d(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jr(t.vertices,t.indices,t.radius,t.details)}}const vr=new j,Mr=new j,Po=new j,yr=new en;class O0 extends le{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ns*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],p=new Array(3),h={},f=[];for(let m=0;m<l;m+=3){o?(c[0]=o.getX(m),c[1]=o.getX(m+1),c[2]=o.getX(m+2)):(c[0]=m,c[1]=m+1,c[2]=m+2);const{a:_,b:g,c:d}=yr;if(_.fromBufferAttribute(a,c[0]),g.fromBufferAttribute(a,c[1]),d.fromBufferAttribute(a,c[2]),yr.getNormal(Po),p[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,p[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,p[2]=`${Math.round(d.x*s)},${Math.round(d.y*s)},${Math.round(d.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let M=0;M<3;M++){const y=(M+1)%3,x=p[M],w=p[y],E=yr[u[M]],b=yr[u[y]],P=`${x}_${w}`,S=`${w}_${x}`;S in h&&h[S]?(Po.dot(h[S].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(b.x,b.y,b.z)),h[S]=null):P in h||(h[P]={index0:c[M],index1:c[y],normal:Po.clone()})}}for(const m in h)if(h[m]){const{index0:_,index1:g}=h[m];vr.fromBufferAttribute(a,_),Mr.fromBufferAttribute(a,g),f.push(vr.x,vr.y,vr.z),f.push(Mr.x,Mr.y,Mr.z)}this.setAttribute("position",new Zt(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Ei extends jr{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ei(t.radius,t.detail)}}class Gn extends le{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let p=t;const h=(e-t)/s,f=new j,m=new Vt;for(let _=0;_<=s;_++){for(let g=0;g<=n;g++){const d=r+g/n*o;f.x=p*Math.cos(d),f.y=p*Math.sin(d),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,u.push(m.x,m.y)}p+=h}for(let _=0;_<s;_++){const g=_*(n+1);for(let d=0;d<n;d++){const M=d+g,y=M,x=M+n+1,w=M+n+2,E=M+1;a.push(y,x,E),a.push(x,w,E)}}this.setIndex(a),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gn(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ka extends jr{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ka(t.radius,t.detail)}}class Za extends le{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new j,p=new j,h=new j;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){const _=m/s*r,g=f/n*Math.PI*2;p.x=(t+e*Math.cos(g))*Math.cos(_),p.y=(t+e*Math.cos(g))*Math.sin(_),p.z=e*Math.sin(g),a.push(p.x,p.y,p.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(p,u).normalize(),l.push(h.x,h.y,h.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){const _=(s+1)*f+m-1,g=(s+1)*(f-1)+m-1,d=(s+1)*(f-1)+m,M=(s+1)*f+m;o.push(_,g,M),o.push(g,d,M)}this.setIndex(o),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Za(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class B0 extends le{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,s=new j,r=new j;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const p=l[c],h=p.start,f=p.count;for(let m=h,_=h+f;m<_;m+=3)for(let g=0;g<3;g++){const d=a.getX(m+g),M=a.getX(m+(g+1)%3);s.fromBufferAttribute(o,d),r.fromBufferAttribute(o,M),gc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,p=3*a+(c+1)%3;s.fromBufferAttribute(o,u),r.fromBufferAttribute(o,p),gc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new Zt(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function gc(i,t,e){const n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(s)===!0?!1:(e.add(n),e.add(s),!0)}class k0 extends Se{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Ra extends ds{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=fu,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wn,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ja extends Te{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class G0 extends Ja{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Lo=new ne,_c=new j,xc=new j;class Pu{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Va,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new ee(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;_c.setFromMatrixPosition(t.matrixWorld),e.position.copy(_c),xc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(xc),e.updateMatrixWorld(),Lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Lo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const vc=new ne,ws=new j,Do=new j;class H0 extends Pu{constructor(){super(new Ze(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Vt(4,2),this._viewportCount=6,this._viewports=[new ee(2,1,1,1),new ee(0,1,1,1),new ee(3,1,1,1),new ee(1,1,1,1),new ee(3,0,1,1),new ee(1,0,1,1)],this._cubeDirections=[new j(1,0,0),new j(-1,0,0),new j(0,0,1),new j(0,0,-1),new j(0,1,0),new j(0,-1,0)],this._cubeUps=[new j(0,1,0),new j(0,1,0),new j(0,1,0),new j(0,1,0),new j(0,0,1),new j(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ws.setFromMatrixPosition(t.matrixWorld),n.position.copy(ws),Do.copy(n.position),Do.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Do),n.updateMatrixWorld(),s.makeTranslation(-ws.x,-ws.y,-ws.z),vc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vc)}}class V0 extends Ja{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new H0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class W0 extends Pu{constructor(){super(new Wa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mc extends Ja{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Te.DEFAULT_UP),this.updateMatrix(),this.target=new Te,this.shadow=new W0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class X0 extends le{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Lu{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=yc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=yc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function yc(){return performance.now()}class Ca extends I0{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const Sc=new ne;class bc{constructor(t,e,n=0,s=1/0){this.ray=new Ga(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Ha,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Sc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Sc),this}intersectObject(t,e=!0,n=[]){return Pa(t,this,n,e),n.sort(Ec),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)Pa(t[s],this,n,e);return n.sort(Ec),n}}function Ec(i,t){return i.distance-t.distance}function Pa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)Pa(r[o],t,e,!0)}}const wc=new j,Sr=new j;class q0{constructor(t=new j,e=new j){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){wc.subVectors(t,this.start),Sr.subVectors(this.end,this.start);const n=Sr.dot(Sr);let r=Sr.dot(wc)/n;return e&&(r=Ne(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Da}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Da);const Du={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ri{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Y0=new Wa(-1,1,1,-1,0,1);class $0 extends le{constructor(){super(),this.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Zt([0,2,0,0,2,0],2))}}const j0=new $0;class Kr{constructor(t){this._mesh=new qt(j0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Y0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class K0 extends Ri{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Se?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ai.clone(t.uniforms),this.material=new Se({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Kr(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Tc extends Ri{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Z0 extends Ri{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class J0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Vt);this._width=n.width,this._height=n.height,e=new sn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:bn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new K0(Du),this.copyPass.material.blending=On,this.clock=new Lu}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Tc!==void 0&&(o instanceof Tc?n=!0:o instanceof Z0&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Vt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Q0 extends Ri{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new kt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const t_={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new kt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class us extends Ri{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Vt(t.x,t.y):new Vt(256,256),this.clearColor=new kt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new sn(r,o,{type:bn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let p=0;p<this.nMips;p++){const h=new sn(r,o,{type:bn});h.texture.name="UnrealBloomPass.h"+p,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const f=new sn(r,o,{type:bn});f.texture.name="UnrealBloomPass.v"+p,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=t_;this.highPassUniforms=ai.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Se({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let p=0;p<this.nMips;p++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[p])),this.separableBlurMaterials[p].uniforms.invSize.value=new Vt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1),new j(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=Du;this.copyUniforms=ai.clone(u.uniforms),this.blendMaterial=new Se({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Ge,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new kt,this.oldClearAlpha=1,this.basic=new ye,this.fsQuad=new Kr(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Vt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=us.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=us.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Se({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Vt(.5,.5)},direction:{value:new Vt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Se({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}us.BlurDirectionX=new Vt(1,0);us.BlurDirectionY=new Vt(0,1);const e_={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class n_ extends Ri{constructor(){super();const t=e_;this.uniforms=ai.clone(t.uniforms),this.material=new k0({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Kr(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},te.getTransfer(this._outputColorSpace)===oe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Kc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Zc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Jc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Qc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===tu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===eu&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const i_=512,s_=2,r_=.42;class o_ extends Ri{constructor(t){super(),this.camera=t,this.needsSwap=!0,this.mat=new Se({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tMask:{value:null},uProjInv:{value:new ne},uCam:{value:new ne},uW0:{value:new Vt},uBg:{value:new kt(de.background)},uGhost:{value:r_},uOn:{value:1},uShroud:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse, tDepth, tMask; uniform mat4 uProjInv, uCam; uniform vec2 uW0; uniform vec3 uBg; uniform float uGhost, uOn, uShroud;
        varying vec2 vUv;
        const float RES = ${i_.toFixed(1)}; const float K = ${s_.toFixed(1)};
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
        }`,depthTest:!1,depthWrite:!1}),this.quad=new Kr(this.mat)}setMask(t){this.mat.uniforms.tMask.value=t}setWindow(t,e){this.mat.uniforms.uW0.value.set(t,e)}setShroud(t){this.mat.uniforms.uShroud.value=t}setEnabled(t){this.mat.uniforms.uOn.value=t?1:0,this.enabled=!!t}render(t,e,n){const s=this.mat.uniforms;s.tDiffuse.value=n.texture,s.tDepth.value=n.depthTexture,this.camera.updateMatrixWorld(),s.uProjInv.value.copy(this.camera.projectionMatrixInverse),s.uCam.value.copy(this.camera.matrixWorld),t.setRenderTarget(this.renderToScreen?null:e),this.quad.render(t)}dispose(){this.mat.dispose(),this.quad.dispose()}}const Ac=new Tn,br=new j;class Zr extends X0{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new Zt(t,3)),this.setAttribute("uv",new Zt(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Ca(e,6,1);return this.setAttribute("instanceStart",new ni(n,3,0)),this.setAttribute("instanceEnd",new ni(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Ca(e,6,1);return this.setAttribute("instanceColorStart",new ni(n,3,0)),this.setAttribute("instanceColorEnd",new ni(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new B0(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Ac.setFromBufferAttribute(e),this.boundingBox.union(Ac))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new li),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)br.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(br)),br.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(br));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}Lt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Vt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Xe.line={uniforms:ai.merge([Lt.common,Lt.fog,Lt.line]),vertexShader:`
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
		`};class Vs extends Se{static get type(){return"LineMaterial"}constructor(t){super({uniforms:ai.clone(Xe.line.uniforms),vertexShader:Xe.line.vertexShader,fragmentShader:Xe.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Io=new ee,Rc=new j,Cc=new j,Ce=new ee,Pe=new ee,mn=new ee,Uo=new j,zo=new ne,De=new q0,Pc=new j,Er=new Tn,wr=new li,gn=new ee;let Mn,wi;function Lc(i,t,e){return gn.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),gn.multiplyScalar(1/gn.w),gn.x=wi/e.width,gn.y=wi/e.height,gn.applyMatrix4(i.projectionMatrixInverse),gn.multiplyScalar(1/gn.w),Math.abs(Math.max(gn.x,gn.y))}function a_(i,t){const e=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,s.count);for(let a=0,l=o;a<l;a++){De.start.fromBufferAttribute(s,a),De.end.fromBufferAttribute(r,a),De.applyMatrix4(e);const c=new j,u=new j;Mn.distanceSqToSegment(De.start,De.end,u,c),u.distanceTo(c)<wi*.5&&t.push({point:u,pointOnLine:c,distance:Mn.origin.distanceTo(u),object:i,face:null,faceIndex:a,uv:null,uv1:null})}}function l_(i,t,e){const n=t.projectionMatrix,r=i.material.resolution,o=i.matrixWorld,a=i.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),p=-t.near;Mn.at(1,mn),mn.w=1,mn.applyMatrix4(t.matrixWorldInverse),mn.applyMatrix4(n),mn.multiplyScalar(1/mn.w),mn.x*=r.x/2,mn.y*=r.y/2,mn.z=0,Uo.copy(mn),zo.multiplyMatrices(t.matrixWorldInverse,o);for(let h=0,f=u;h<f;h++){if(Ce.fromBufferAttribute(l,h),Pe.fromBufferAttribute(c,h),Ce.w=1,Pe.w=1,Ce.applyMatrix4(zo),Pe.applyMatrix4(zo),Ce.z>p&&Pe.z>p)continue;if(Ce.z>p){const y=Ce.z-Pe.z,x=(Ce.z-p)/y;Ce.lerp(Pe,x)}else if(Pe.z>p){const y=Pe.z-Ce.z,x=(Pe.z-p)/y;Pe.lerp(Ce,x)}Ce.applyMatrix4(n),Pe.applyMatrix4(n),Ce.multiplyScalar(1/Ce.w),Pe.multiplyScalar(1/Pe.w),Ce.x*=r.x/2,Ce.y*=r.y/2,Pe.x*=r.x/2,Pe.y*=r.y/2,De.start.copy(Ce),De.start.z=0,De.end.copy(Pe),De.end.z=0;const _=De.closestPointToPointParameter(Uo,!0);De.at(_,Pc);const g=Un.lerp(Ce.z,Pe.z,_),d=g>=-1&&g<=1,M=Uo.distanceTo(Pc)<wi*.5;if(d&&M){De.start.fromBufferAttribute(l,h),De.end.fromBufferAttribute(c,h),De.start.applyMatrix4(o),De.end.applyMatrix4(o);const y=new j,x=new j;Mn.distanceSqToSegment(De.start,De.end,x,y),e.push({point:x,pointOnLine:y,distance:Mn.origin.distanceTo(x),object:i,face:null,faceIndex:h,uv:null,uv1:null})}}}class Qa extends qt{constructor(t=new Zr,e=new Vs({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)Rc.fromBufferAttribute(e,o),Cc.fromBufferAttribute(n,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+Rc.distanceTo(Cc);const r=new Ca(s,2,1);return t.setAttribute("instanceDistanceStart",new ni(r,1,0)),t.setAttribute("instanceDistanceEnd",new ni(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,s=t.camera;s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Mn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;wi=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),wr.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=wi*.5;else{const p=Math.max(s.near,wr.distanceToPoint(Mn.origin));c=Lc(s,p,l.resolution)}if(wr.radius+=c,Mn.intersectsSphere(wr)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Er.copy(a.boundingBox).applyMatrix4(o);let u;if(n)u=wi*.5;else{const p=Math.max(s.near,Er.distanceToPoint(Mn.origin));u=Lc(s,p,l.resolution)}Er.expandByScalar(u),Mn.intersectsBox(Er)!==!1&&(n?a_(this,e):l_(this,s,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Io),this.material.uniforms.resolution.value.set(Io.z,Io.w))}}const c_=.38,u_=4.4,No=3,Kn=3.2,Hr=i=>.05+i*.18,ke=i=>i?Hr(i.clearance):.05,zn=.05+3*.18+u_,h_=i=>i.solid?zn:Hr(i.clearance),f_=zn,Jt={FLOOR:0,TILES:1,SOLIDS:2,BORDERS:3,FOOT:4,CREST:5,SECTOR:6,GLOW:20,CURTAIN:21,BEAM:22,GATE_LIGHT:23,TRAIL:25,HL_FILL:30,HL_OUTLINE:31,MARKERS:32,CURSOR:33,MOTES:40};function Iu(i){return i.depthTest=!0,i.depthWrite=!1,i.polygonOffset=!0,i.polygonOffsetFactor=-2,i.polygonOffsetUnits=-2,i}function He(i,{depthTest:t=!0,offset:e=-1}={}){return i.transparent=!0,i.depthWrite=!1,i.depthTest=t,e&&!i.polygonOffset&&(i.polygonOffset=!0,i.polygonOffsetFactor=e,i.polygonOffsetUnits=e),i}let Ts=null;function d_(){if(Ts)return Ts;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.6,"rgba(255,255,255,0.14)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Ts=new Cu(i),Ts.colorSpace=Ke,Ts}const Vr=4;function p_(){const i={value:Array.from({length:Vr},()=>new ee(0,0,0,0))},t=new j;return{uniform:i,update(e,n){for(let s=0;s<Vr;s++){const r=n[s];if(!r||!(r.r>0)){i.value[s].set(0,0,0,0);continue}t.set(r.x,r.y,r.z).applyMatrix4(e.matrixWorldInverse),i.value[s].set(t.x,t.y,t.z,r.r)}}}}const Uu=`
uniform vec4 uCut[${Vr}];
uniform float uMinVis;
varying vec3 vCutPos;
float cutVisibility(vec3 vp) {
  float vis = 1.0;
  for (int i = 0; i < ${Vr}; i++) {
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
`,zu="{ float cv = mix(uMinVis, 1.0, cutVisibility(vCutPos)); if (cv < cutDither()) discard; }";function m_(i,t,{minVis:e=.08,stripes:n=!1}={}){return i.onBeforeCompile=s=>{s.uniforms.uCut=t.uniform,s.uniforms.uMinVis={value:e},s.vertexShader=s.vertexShader.replace("void main() {",`varying vec3 vCutPos;
varying float vWY;
void main() {`).replace("#include <project_vertex>",`#include <project_vertex>
vCutPos = mvPosition.xyz;
vWY = transformed.y;`),s.fragmentShader=s.fragmentShader.replace("void main() {",`varying float vWY;
${Uu}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${zu}`),n&&(s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float sy = abs(fract(vWY * 0.45) - 0.5);
         diffuseColor.rgb *= 1.0 + 1.1 * smoothstep(0.06, 0.0, sy);`))},i.customProgramCacheKey=()=>`solid-cut-${n}`,i}function g_(i,t,{minVis:e=.22}={}){return i.uniforms.uCut=t.uniform,i.uniforms.uMinVis={value:e},i.vertexShader=i.vertexShader.replace("void main() {",`varying vec3 vCutPos;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
vCutPos = ( position.y < 0.5 ? start : end ).xyz;`),i.fragmentShader=i.fragmentShader.replace("void main() {",`${Uu}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${zu}`),i.needsUpdate=!0,i}const Nu=.005;function Fu(i,t=Nu){return i.uniforms.uPull={value:1-t},i.vertexShader=i.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
start.xyz *= uPull; end.xyz *= uPull;`),i.needsUpdate=!0,i}function Ou(i,t=Nu){const e=i.onBeforeCompile;return i.onBeforeCompile=(n,s)=>{e==null||e(n,s),n.uniforms.uPull={value:1-t},n.vertexShader=n.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("#include <project_vertex>",`
        vec4 mvPosition = vec4( transformed, 1.0 );
        mvPosition = modelViewMatrix * mvPosition;
        mvPosition.xyz *= uPull;
        gl_Position = projectionMatrix * mvPosition;`)},i.customProgramCacheKey=()=>"pull",i}function Bu(i,t,{dashed:e=!1}={}){const n=new Zr;n.setPositions(new Float32Array(t*6));const s=new Qa(n,i);e&&s.computeLineDistances();const r=n.attributes.instanceStart.data,o=e?n.attributes.instanceDistanceStart.data:null;return n.instanceCount=0,s.frustumCulled=!1,s.visible=!1,{line:s,set(a){const l=Math.min(Math.floor(a.length/6),t);for(let c=0;c<l*6;c++)r.array[c]=a[c];if(r.needsUpdate=!0,o){let c=0;for(let u=0;u<l;u++){const p=u*6,h=Math.hypot(a[p+3]-a[p],a[p+4]-a[p+1],a[p+5]-a[p+2]);o.array[u*2]=c,o.array[u*2+1]=c+h,c+=h}o.needsUpdate=!0}n.instanceCount=l,s.visible=l>0}}}function Dc(i){const t=[],e=[],n=new ne,s=new Ai,r=new j(1,1,1),o=new kt;for(const l of i){const c=new Sn(l.w,l.h,l.d).toNonIndexed();s.setFromAxisAngle(new j(0,1,0),l.rot??0),n.compose(new j(l.x,l.y,l.z),s,r),c.applyMatrix4(n),o.set(l.color).multiplyScalar(l.k??1);const u=c.getAttribute("position");for(let p=0;p<u.count;p++)t.push(u.getX(p),u.getY(p),u.getZ(p)),e.push(o.r,o.g,o.b);c.dispose()}const a=new le;return a.setAttribute("position",new Zt(t,3)),a.setAttribute("color",new Zt(e,3)),a}const La=i=>{var t;return((t=i.cut)==null?void 0:t.poly)??i.poly},Ic=160;function ku({group:i,lineMats:t}){const e=({hex:n,fill:s,width:r,pulse:o})=>{const a=new le,l=new Float32Array(Ic*9);a.setAttribute("position",new Me(l,3)),a.setDrawRange(0,0);const c=Ou(He(new ye({color:new kt(n),opacity:s,transparent:!0,side:ge,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))),u=new qt(a,c);u.renderOrder=Jt.HL_FILL,u.frustumCulled=!1,u.visible=!1;const p=Fu(He(new Vs({color:new kt(n).multiplyScalar(1.8),linewidth:r,worldUnits:!1,transparent:!0})));t.push(p);const h=Bu(p,320),f=h.line;f.renderOrder=Jt.HL_OUTLINE,i.add(u,f);let m=null,_=s;return{get cell(){return m},set(g,{blocked:d=!1}={}){if(!g){m=null,u.visible=f.visible=!1;return}m=g;const M=new kt(d?de.blocked:n);c.color.copy(M),p.color.copy(M).multiplyScalar(1.8);const y=g.solid?La(g):g.poly,x=y.length,w=ke(g),E=[],b=[],P=(v,A,N)=>b.push(...v,...A,...N);if(g.solid){const v=zn;for(let A=0;A<x;A++){const N=y[A],k=y[(A+1)%x];P([g.cx,v+.03,g.cz],[N[0],v+.03,N[1]],[k[0],v+.03,k[1]]),P([N[0],w,N[1]],[k[0],w,k[1]],[k[0],v,k[1]]),P([N[0],w,N[1]],[k[0],v,k[1]],[N[0],v,N[1]]),E.push(N[0],v+.05,N[1],k[0],v+.05,k[1]),E.push(N[0],w+.06,N[1],k[0],w+.06,k[1]),E.push(N[0],w+.06,N[1],N[0],v+.05,N[1])}}else{const v=w+.03,A=w+.06;for(let N=0;N<x;N++){const k=y[N],$=y[(N+1)%x];P([g.cx,v,g.cz],[k[0],v,k[1]],[$[0],v,$[1]]),E.push(k[0],A,k[1],$[0],A,$[1])}}const S=Math.min(b.length/9,Ic);l.set(b.slice(0,S*9)),a.getAttribute("position").needsUpdate=!0,a.setDrawRange(0,S*3),h.set(E),u.visible=f.visible=!0,_=d?Math.max(s,.3):s},tick(g){m&&o?c.opacity=_*(.78+.22*Math.sin(g*4.5)):c.opacity=_}}};return{hover:e({hex:de.hover,fill:.26,width:2.6,pulse:!0}),select:e({hex:de.select,fill:.3,width:3.6,pulse:!1})}}function Gu(i){const t=new Se({fog:!0,uniforms:ai.merge([Lt.fog,{uBase:{value:new kt(de.floor)},uFocus:{value:new Vt(0,0)}}]),vertexShader:`#include <fog_pars_vertex>
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
      }`}),e=new qt(new ps(900,900),t);return e.rotation.x=-Math.PI/2,e.position.y=-.05,e.renderOrder=Jt.FLOOR,i.add(e),{floor:e,floorMat:t}}const Fo=new WeakMap,Uc=i=>`${Math.round(i[0]*20)},${Math.round(i[1]*20)}`;function __(i){var n;if((n=i.sectorEdges)!=null&&n.length)return i.sectorEdges;if(Fo.has(i))return Fo.get(i);const t=new Map;for(const s of i.cells){const r=s.poly.length;for(let o=0;o<r;o++){const a=s.poly[o],l=s.poly[(o+1)%r],c=Uc(a),u=Uc(l),p=c<u?`${c}|${u}`:`${u}|${c}`,h=t.get(p);h?h.sb=s.sector:t.set(p,{a,b:l,sa:s.sector,sb:null})}}const e=[];for(const s of t.values())s.sb===null?e.push({a:s.a,b:s.b,sa:s.sa,sb:-1}):s.sb!==s.sa&&e.push(s);return Fo.set(i,e),e}function x_(i,t){var s,r;const e=((s=i.sectors[t.sa])==null?void 0:s.clearance)??0,n=t.sb>=0?((r=i.sectors[t.sb])==null?void 0:r.clearance)??0:0;return Math.max(e,n)}const zc=i=>`${Math.round(i[0]*1e6)},${Math.round(i[1]*1e6)}`,bi=(i,t)=>$c(i,t);function v_(i,t){var m;const e=(m=i.span)!=null&&m.length?i.span.flatMap(_=>[_.a,_.b]):[i.edge.a,i.edge.b];let n=e[0],s=e[e.length-1],r=-1;for(let _=0;_<e.length;_++)for(let g=_+1;g<e.length;g++){const d=(e[_][0]-e[g][0])**2+(e[_][1]-e[g][1])**2;d>r&&(r=d,n=e[_],s=e[g])}const o=Math.sqrt(r)||i.len,a=(s[0]-n[0])/o,l=(s[1]-n[1])/o,c=[(n[0]+s[0])/2,(n[1]+s[1])/2];let u=-l,p=a;const h=t(i.a),f=t(i.b);return(f.cx-h.cx)*u+(f.cz-h.cz)*p<0&&(u=-u,p=-p),{s:n,e:s,mid:c,len:o,ax:a,az:l,nx:u,nz:p}}function M_(i){const t=new Set;for(const e of i)if(!e.locked)for(const n of e.span??[])t.add(bi(n.a,n.b));return t}function y_(i,t=[]){const e=M_(i);for(const n of t)if(!n.locked)for(const s of n.edges)e.add(bi(s.a,s.b));return e}const S_=(i,t)=>!!(i.open||i.gap||t.has(bi(i.a,i.b))),ii=Object.freeze({minLen:.3,flat:.002,same:1e-4,endTol:1e-5}),si=(i,t)=>Math.hypot(i[0]-t[0],i[1]-t[1]),As=i=>`${Math.round(i[0]*1e7)},${Math.round(i[1]*1e7)}`,b_=(i,t)=>{const e=`${Math.round(i[0]/ii.same)},${Math.round(i[1]/ii.same)}`,n=`${Math.round(t[0]/ii.same)},${Math.round(t[1]/ii.same)}`;return e<n?`${e}|${n}`:`${n}|${e}`};function Oo(i,t,e){const n=si(t,e);return n<1e-9?si(i,t):Math.abs((e[0]-t[0])*(t[1]-i[1])-(t[0]-i[0])*(e[1]-t[1]))/n}function E_(i,t,e=ii.minLen,n=ii.flat){let s=[];for(const h of i)(!s.length||si(h,s[s.length-1])>1e-6)&&s.push(h);t&&s.length>1&&si(s[0],s[s.length-1])<=1e-6&&s.pop();const r=t?3:2,o={merged:0,fused:0},a=()=>s.length,l=h=>(h-1+a())%a(),c=h=>(h+1)%a(),u=h=>t||h>0&&h<a()-1;for(let h=0;h<4096&&a()>=r;h++){let f=-1;for(let m=0;m<a()&&f<0;m++){if(!u(m))continue;const _=s[l(m)],g=s[c(m)],d=s[m],M=(g[0]-_[0])*(d[0]-_[0])+(g[1]-_[1])*(d[1]-_[1]);Oo(d,_,g)<n&&M>0&&M<(g[0]-_[0])**2+(g[1]-_[1])**2&&(f=m,o.merged++)}if(f<0){let m=-1,_=e;const g=t?a():a()-1;for(let d=0;d<g;d++){const M=si(s[d],s[c(d)]);M<_&&(_=M,m=d)}if(m>=0){const d=m,M=c(m),y=[];if(u(d)&&y.push([Oo(s[d],s[l(d)],s[M]),d]),u(M)&&y.push([Oo(s[M],s[d],s[c(M)]),M]),!y.length)return null;y.sort((x,w)=>x[0]-w[0]),f=y[0][1],o.fused++}}if(f<0)break;s=s.filter((m,_)=>_!==f)}if(a()<r)return null;let p=0;for(let h=0;h<(t?a():a()-1);h++)p+=si(s[h],s[c(h)]);return p<e?null:Object.assign(s,{stats:o})}function w_(i){const t=new Map;i.forEach((r,o)=>{for(const a of[r.a,r.b]){const l=As(a);t.has(l)||t.set(l,[]),t.get(l).push(o)}});const e=new Uint8Array(i.length),n=[],s=(r,o)=>{const a=[r];let l=As(r),c=o;for(;;){e[c]=1;const u=i[c],p=As(u.a)===l?u.b:u.a;a.push(p),l=As(p);const h=t.get(l).filter(f=>!e[f]);if(t.get(l).length!==2||!h.length)break;c=h[0]}return a};for(const[r,o]of t)if(o.length!==2){for(const a of o)if(!e[a]){const l=i[a];n.push({pts:s(As(l.a)===r?l.a:l.b,a),closed:!1})}}for(let r=0;r<i.length;r++)e[r]||n.push({pts:s(i[r].a,r),closed:!0});return n}function T_(i,t=null,e=null){const n=[],s=[],r=new Set,o={chains:0,merged:0,fused:0,duplicate:0};let a=i.sectorLines;if(!a){const l=(i.sectorEdges??[]).filter(u=>!(e&&t&&e(u,t))),c=new Map;for(const u of l){const p=`${u.sa}|${u.sb}`;c.has(p)||c.set(p,{sa:u.sa,sb:u.sb,edges:[]}),c.get(p).edges.push(u)}a=[];for(const u of c.values())for(const p of w_(u.edges))a.push({...p,sa:u.sa,sb:u.sb,caps:p.closed?[]:["junction","junction"]})}for(const l of a){const c=E_(l.pts,!!l.closed);if(!c){o.chains++;continue}o.merged+=c.stats.merged,o.fused+=c.stats.fused;const u={pts:[...c],closed:!!l.closed,sa:l.sa,sb:l.sb,caps:l.caps??[],fence:!!l.fence},p=u.closed?c.length:c.length-1,h=[];for(let f=0;f<p;f++){const m=c[f],_=c[(f+1)%c.length],g=b_(m,_);if(r.has(g)){o.duplicate++;continue}r.add(g),h.push({a:m,b:_,sa:l.sa,sb:l.sb})}h.length&&(n.push(u),s.push(...h))}return{runs:n,segments:s,dropped:o}}function A_(i,t){for(const e of i){if(e.closed||e.sa!==t.sa||e.sb!==t.sb)continue;const n=[e.pts[0],e.pts[e.pts.length-1]];for(const[s,r]of n.entries())if(e.caps[s]!=="junction"&&(si(r,t.start)<ii.endTol||si(r,t.end)<ii.endTol))return!0}return!1}function R_(i,t,e,n){const s=n?i.filter(n):i;if(!t)return s;const r=new Map;for(const o of t)o.kind!=="gap"&&r.set(`${o.sa}|${o.sb}|${o.slot}`,o);return s.filter(o=>{if(o.locked)return!0;const a=r.get(`${o.sa}|${o.sb}|${o.slot}`);return!!a&&A_(e,a)})}function Hu(i,{cut:t,chunk:e=null}){var et,F;const n=new Ve,s=e?e.lineMats:[],r=[],o=new kt,a=(C,X)=>{if(!e)return X();let nt=e.shared.get(C);return nt||e.shared.set(C,nt=X()),nt},l=C=>i.cellById?i.cellById(C):i.cells[C],c=new Set(i.cells),u=new Map(i.gates.map(C=>[C,v_(C,l)])),p=new Map;for(const C of i.edgeCells??i.cells){const X=C.poly.length;for(let nt=0;nt<X;nt++){const D=C.poly[nt],tt=C.poly[(nt+1)%X],q=bi(D,tt),Z=p.get(q)??{a:D,b:tt,cells:[],bandMax:0,solid:0};Z.cells.push(C),Z.bandMax=Math.max(Z.bandMax,C.clearance),C.solid&&Z.solid++,p.set(q,Z)}}const h=y_(i.gates,i.sectorOpenings),f=e?null:Gu(n).floorMat,m=[],_=new Map;for(const C of i.edgeCells??i.cells){if(!C.solid)continue;const X=La(C),nt=X.length;for(let D=0;D<nt;D++){const tt=X[D],q=X[(D+1)%nt],Z=p.get(bi(tt,q));if(Z&&Z.solid>1)continue;const ft=q[0]-tt[0],ct=q[1]-tt[1],At=Math.hypot(ft,ct);if(At<1e-4)continue;let zt=ct/At,Wt=-ft/At;((tt[0]+q[0])/2-C.cx)*zt+((tt[1]+q[1])/2-C.cz)*Wt<0&&(zt=-zt,Wt=-Wt);const Ht=Z==null?void 0:Z.cells.find(pe=>pe!==C&&!pe.solid),ce={c:C,a:tt,b:q,nx:zt,nz:Wt,y0:ke(Ht??C),na:null,nb:null};c.has(C)&&m.push(ce);for(const pe of[tt,q]){const Ci=zc(pe);(_.get(Ci)??_.set(Ci,[]).get(Ci)).push([zt,Wt])}}}const g=(C,X,nt)=>{let D=0,tt=0;for(const[Z,ft]of _.get(zc(C)))Z*X+ft*nt>.6&&(D+=Z,tt+=ft);const q=Math.hypot(D,tt)||1;return[D/q,tt/q]};for(const C of m)C.na=g(C.a,C.nx,C.nz),C.nb=g(C.b,C.nx,C.nz);const d=[],M=[],y=[],x=[],w=[],E=[],b=[],P=[],S=(C,X,nt,D,tt,q,Z)=>{C.push(nt,D,tt),X.push(q.r*Z,q.g*Z,q.b*Z)},v=new Map;for(const C of m)(v.get(C.c.id)??v.set(C.c.id,[]).get(C.c.id)).push(C);for(const C of i.cells){const X=ke(C),nt=new kt(Li[C.clearance]),D=Qu(C.id);if(C.solid){if((F=(et=C.cut)==null?void 0:et.open)!=null&&F.length){const ct=d.length/3;for(const At of C.cut.open){let zt=0,Wt=0;for(const Ht of At)zt+=Ht[0],Wt+=Ht[1];zt/=At.length,Wt/=At.length;for(let Ht=0;Ht<At.length;Ht++){const ce=At[Ht],pe=At[(Ht+1)%At.length];S(d,M,zt,X,Wt,nt,.16),S(d,M,ce[0],X,ce[1],nt,.08),S(d,M,pe[0],X,pe[1],nt,.08)}}P[C.id]={start:ct,count:d.length/3-ct}}const tt=La(C),q=tt.length,Z=y.length/3,ft=(ct,At,zt)=>{S(y,x,ct,zn,At,nt,zt),w.push(0,1,0)};for(let ct=0;ct<q;ct++){const At=tt[ct],zt=tt[(ct+1)%q];ft(C.cx,C.cz,.05+.03*D),ft(At[0],At[1],.1),ft(zt[0],zt[1],.1)}for(const ct of v.get(C.id)??[]){const At=(zt,Wt,Ht,ce)=>{S(y,x,zt[0],Ht,zt[1],nt,ce),w.push(Wt[0],0,Wt[1])};At(ct.a,ct.na,ct.y0,.62),At(ct.b,ct.nb,ct.y0,.62),At(ct.b,ct.nb,zn,.16),At(ct.a,ct.na,ct.y0,.62),At(ct.b,ct.nb,zn,.16),At(ct.a,ct.na,zn,.16)}b[C.id]={start:Z,count:y.length/3-Z}}else{const tt=C.poly.length,q=Math.max(.5,1-c_/Math.max(C.radius,1)),Z=C.poly.map(([zt,Wt])=>[C.cx+(zt-C.cx)*q,C.cz+(Wt-C.cz)*q]),ft=.2+.1*D,ct=.07+.05*D,At=d.length/3;for(let zt=0;zt<tt;zt++){const Wt=Z[zt],Ht=Z[(zt+1)%tt];S(d,M,C.cx,X,C.cz,nt,ft),S(d,M,Wt[0],X,Wt[1],nt,ct),S(d,M,Ht[0],X,Ht[1],nt,ct)}E[C.id]={start:At,count:d.length/3-At}}}const A=Float32Array.from(M),N=Float32Array.from(x),k=(C,X,nt,D,tt)=>{const q=new le;q.setAttribute("position",new Zt(C,3)),q.setAttribute("color",new Zt(X,3)),nt?q.setAttribute("normal",new Zt(nt,3)):q.computeVertexNormals();const Z=new qt(q,D);return Z.renderOrder=tt,n.add(Z),Z},$=new Array(d.length).fill(0).map((C,X)=>X%3===1?1:0),Q=k(d,M,$,a("tiles",()=>new Ra({vertexColors:!0,side:ge,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),Jt.TILES),K=y.length?k(y,x,w,a("walls",()=>m_(new Ra({vertexColors:!0,side:ge,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),t,{minVis:.07,stripes:!0})),Jt.SOLIDS):null,O=(C,X,nt,D,{cutaway:tt=!1,minVis:q=.25}={})=>{if(!C.length)return null;const Z=new Zr;Z.setPositions(C),Z.setColors(X);const ft=a(`line${nt}|${tt}|${q}`,()=>{const At=Iu(new Vs({vertexColors:!0,linewidth:nt,worldUnits:!1,fog:!0}));return tt&&g_(At,t,{minVis:q}),s.push(At),At}),ct=new Qa(Z,ft);return ct.renderOrder=D,ct.frustumCulled=!1,n.add(ct),ct},H=(C,X,nt,D,tt,q,Z)=>{C.push(nt[0],tt,nt[1],D[0],q,D[1]),X.push(Z.r,Z.g,Z.b,Z.r,Z.g,Z.b)},ot=__(i),st=new Set(ot.map(C=>bi(C.a,C.b))),vt=[],St=[];for(const C of p.values()){if(C.solid||C.cells.length<2||C.cells[0].sector!==C.cells[1].sector||!c.has(C.cells[0])||st.has(bi(C.a,C.b)))continue;o.set(Li[C.bandMax]).multiplyScalar(.9);const X=Hr(C.bandMax)+.02;H(vt,St,C.a,C.b,X,X,o)}const Pt=[],lt=[],Mt=[],Tt=[];for(const C of m){const X=C.c.clearance;o.set(Li[X]).multiplyScalar(1.7),H(Pt,lt,C.a,C.b,zn+.02,zn+.02,o),o.set(Li[X]).multiplyScalar(1),H(Mt,Tt,C.a,C.b,C.y0+.03,C.y0+.03,o)}const pt=[],Ct=[],V=[],gt=[],mt=[],Et=T_(i,h,S_);for(const C of Et.segments){const X=x_(i,C),nt=Hr(X)+.06;o.set(Li[X]);const D=o.clone(),tt=C.a,q=C.b;H(V,gt,tt,q,nt,nt,o.clone().multiplyScalar(1.9)),H(pt,Ct,tt,q,nt+No,nt+No,o.clone().multiplyScalar(1.5)),mt.push({a:tt,b:q,base:nt,col:D})}if(O(vt,St,1.1,Jt.BORDERS),O(Mt,Tt,1.5,Jt.FOOT),O(Pt,lt,2.8,Jt.CREST,{cutaway:!0,minVis:.3}),O(V,gt,3.4,Jt.SECTOR),O(pt,Ct,2,Jt.SECTOR,{cutaway:!0,minVis:.3}),mt.length){const C=[],X=[];for(const tt of mt){const{a:q,b:Z,base:ft,col:ct}=tt,At=ft+No,zt=(Wt,Ht,ce)=>{C.push(Wt[0],Ht,Wt[1]),X.push(ct.r,ct.g,ct.b,ce)};zt(q,ft,.34),zt(Z,ft,.34),zt(Z,At,0),zt(q,ft,.34),zt(Z,At,0),zt(q,At,0)}const nt=new le;nt.setAttribute("position",new Zt(C,3)),nt.setAttribute("color",new Zt(X,4));const D=new qt(nt,a("curtain",()=>He(new ye({vertexColors:!0,transparent:!0,blending:Ge,side:ge,toneMapped:!1}))));D.renderOrder=Jt.CURTAIN,D.frustumCulled=!1,n.add(D)}const Ut=[],Y=[],Yt=[],wt=(C,X,nt,D,tt,q,Z)=>{Ut.push(C,X,nt),Y.push(D.r,D.g,D.b,tt),Yt.push(q,Z)},xt=(C,X,nt,D,tt,q,Z)=>{wt(C-nt,tt,X-D,q,Z,0,0),wt(C+nt,tt,X-D,q,Z,1,0),wt(C+nt,tt,X+D,q,Z,1,1),wt(C-nt,tt,X-D,q,Z,0,0),wt(C+nt,tt,X+D,q,Z,1,1),wt(C-nt,tt,X+D,q,Z,0,1)},yt=1.7;for(const C of m){const X=C.y0+.04;o.set(Li[C.c.clearance]);const nt=[C.a[0]+C.na[0]*yt,C.a[1]+C.na[1]*yt],D=[C.b[0]+C.nb[0]*yt,C.b[1]+C.nb[1]*yt];wt(C.a[0],X,C.a[1],o,.42,.5,.5),wt(C.b[0],X,C.b[1],o,.42,.5,.5),wt(D[0],X,D[1],o,0,.5,.5),wt(C.a[0],X,C.a[1],o,.42,.5,.5),wt(D[0],X,D[1],o,0,.5,.5),wt(nt[0],X,nt[1],o,0,.5,.5)}const Nt=(C,X,nt,D)=>xt(C.cx,C.cz,nt,nt,ke(C)+.045,new kt(X),D),Dt=R_(i.gates,i.sectorOpenings,Et.runs,i.drawsGate);for(const C of Dt){if(C.soft&&!C.locked)continue;const X=l(C.a);xt(u.get(C).mid[0],u.get(C).mid[1],4.2,4.2,ke(X)+.045,new kt(C.locked?de.gateLocked:de.gateOpen),C.locked?.6:.38)}for(const C of i.cells)C.cache&&Nt(C,C.payload?16751162:8256767,C.payload?5:2.6,C.payload?.5:.28);const z=i.beacons??[[i.startCell,de.ally,0,2.4,.5],[i.pivotCell,10509567,7,2.2,.5],[i.vaultCell,16742938,14,3,.6]];for(const[C,X,,nt,D]of z)Nt(C,X,nt*2.6,D*.5);{const C=new le;C.setAttribute("position",new Zt(Ut,3)),C.setAttribute("color",new Zt(Y,4)),C.setAttribute("uv",new Zt(Yt,2));const X=new qt(C,a("glow",()=>He(new ye({map:d_(),vertexColors:!0,transparent:!0,blending:Ge,side:ge,toneMapped:!1}))));X.renderOrder=Jt.GLOW,X.frustumCulled=!1,n.add(X)}const R=C=>{const{mid:X,len:nt,ax:D,az:tt}=u.get(C),q=ke(l(C.a)),Z=nt/2,ft=Math.atan2(-tt,D);return[{x:X[0]+D*Z,y:q+Kn/2,z:X[1]+tt*Z,w:.34,h:Kn,d:.34,color:16777215},{x:X[0]-D*Z,y:q+Kn/2,z:X[1]-tt*Z,w:.34,h:Kn,d:.34,color:16777215},{x:X[0],y:q+Kn,z:X[1],w:nt+.34,h:.26,d:.26,rot:ft,color:16777215}]},T=(C,X)=>He(new ye({color:new kt(C).multiplyScalar(X),toneMapped:!1,blending:Ge,transparent:!0})),U=[],W=[];for(const C of Dt)(C.locked||!C.soft)&&(C.locked?W:U).push(...R(C));if(U.length){const C=new qt(Dc(U),T(de.gateOpen,.85));C.material.vertexColors=!0,C.renderOrder=Jt.GATE_LIGHT,C.frustumCulled=!1,n.add(C)}if(W.length){const C=new qt(Dc(W),T(de.gateLocked,1.7));C.material.vertexColors=!0,C.renderOrder=Jt.GATE_LIGHT,C.frustumCulled=!1,n.add(C),r.push(X=>{const nt=.7+.5*Math.sin(X*3);C.material.color.set(de.gateLocked).multiplyScalar(1.7*nt)});for(const X of Dt.filter(nt=>nt.locked)){const{mid:nt,len:D,ax:tt,az:q}=u.get(X),Z=ke(l(X.a)),ft=D/2,ct=[nt[0]-tt*ft,Z,nt[1]-q*ft,nt[0]+tt*ft,Z,nt[1]+q*ft,nt[0]+tt*ft,Z+Kn,nt[1]+q*ft,nt[0]-tt*ft,Z,nt[1]-q*ft,nt[0]+tt*ft,Z+Kn,nt[1]+q*ft,nt[0]-tt*ft,Z+Kn,nt[1]-q*ft],At=new le;At.setAttribute("position",new Zt(ct,3));const zt=He(new ye({color:de.gateLocked,opacity:.25,transparent:!0,blending:Ge,side:ge,toneMapped:!1})),Wt=new qt(At,zt);Wt.renderOrder=Jt.CURTAIN,Wt.frustumCulled=!1,n.add(Wt),r.push(Ht=>{zt.opacity=.18+.12*Math.sin(Ht*3)})}}const B=(C,X,nt,D)=>{const tt=new kt(X).multiplyScalar(.95),q=ke(C),Z=nt>0?new qt(new gs(.06,.16,nt,12,1,!0),He(new ye({color:tt,transparent:!0,opacity:.32,blending:Ge,toneMapped:!1,side:ge}))):null;Z&&(Z.position.set(C.cx,q+nt/2,C.cz),Z.renderOrder=Jt.BEAM,n.add(Z));const ft=new qt(new Gn(D*.9,D,48),He(new ye({color:tt,side:ge,transparent:!0,opacity:.45,blending:Ge,toneMapped:!1})));ft.rotation.x=-Math.PI/2,ft.position.set(C.cx,q+.08,C.cz),ft.renderOrder=Jt.BEAM,n.add(ft),r.push(ct=>{ft.scale.setScalar(1+.06*Math.sin(ct*2+C.id))})};for(const[C,X,nt,D]of z)B(C,X,nt,D);const _t=i.cells.filter(C=>C.cache);let at=null;if(_t.length){at=new z0(new Ei(.75),new ye({toneMapped:!1}),_t.length),at.renderOrder=Jt.SOLIDS,at.frustumCulled=!1,_t.forEach((q,Z)=>at.setColorAt(Z,new kt(q.payload?16751162:8256767).multiplyScalar(1.25))),n.add(at);const C=new ne,X=new Ai,nt=new j(0,1,0),D=new j,tt=new j;r.push(q=>{_t.forEach((Z,ft)=>{const ct=Z.payload?1.8:.7+Math.min(Z.cache,300)/600;D.set(Z.cx,ke(Z)+1.2+.25*Math.sin(q*1.6+Z.id),Z.cz),X.setFromAxisAngle(nt,q*.8+Z.id),C.compose(D,X,tt.set(ct,ct,ct)),at.setMatrixAt(ft,C)}),at.instanceMatrix.needsUpdate=!0})}const{hover:dt,select:bt}=e?{hover:null,select:null}:ku({group:n,lineMats:s}),I=Q.geometry.getAttribute("color"),G=K==null?void 0:K.geometry.getAttribute("color");function J(C){for(const X of i.cells){const nt=C(X),D=X.solid?b[X.id]:E[X.id],tt=X.solid?G:I,q=X.solid?N:A;for(let Z=D.start*3;Z<(D.start+D.count)*3;Z++)tt.array[Z]=q[Z]*nt}for(const X of i.cells){const nt=P[X.id];if(!nt)continue;const D=C(X);for(let tt=nt.start*3;tt<(nt.start+nt.count)*3;tt++)I.array[tt]=A[tt]*D}I.needsUpdate=!0,G&&(G.needsUpdate=!0)}return{group:n,hover:dt,select:bt,setBrightness:J,lineMats:s,floorMat:f,tiles:Q,walls:K,glass:Et,gates:Dt,update(C){for(const X of r)X(C);dt==null||dt.tick(C),bt==null||bt.tick(C)},setFocus(C,X){f==null||f.uniforms.uFocus.value.set(C,X)},resize(C,X){for(const nt of s)nt.resolution.set(C,X)},dispose(){n.traverse(C=>{C.geometry&&C.geometry.dispose()})}}}const Vu="boundless.settings.v1",gx=Object.freeze({controls:"Controls",display:"Display",dev:"Dev"}),tl=Object.freeze([{key:"invertYaw",group:"controls",type:"toggle",def:!0,label:"Invert horizontal rotation",hint:"Middle-drag left / right"},{key:"invertPitch",group:"controls",type:"toggle",def:!0,label:"Invert tilt",hint:"Middle-drag up / down"},{key:"sensitivity",group:"controls",type:"range",def:1,min:.3,max:2.5,step:.05,digits:2,unit:"x",label:"Rotation sensitivity"},{key:"glow",group:"display",type:"range",def:.38,min:0,max:1,step:.02,digits:2,off:0,label:"Glow"},{key:"cutaway",group:"display",type:"toggle",def:!0,label:"Cut-away near actors",hint:"See through walls around you"},{key:"sightRadius",group:"dev",type:"range",def:36,min:8,max:90,step:1,digits:0,unit:" u",label:"Fog lit range",hint:"Flood distance plus line of sight; the default camera shows about 27 units"},{key:"sightSoft",group:"dev",type:"range",def:.25,min:.05,max:.7,step:.01,digits:2,label:"Fog edge softness",hint:"Share of the range that ramps lit to ghost"},{key:"ghostFade",group:"dev",type:"range",def:1.2,min:.2,max:8,step:.1,digits:1,unit:" s",label:"Ghost fade time",hint:"Lit to ghost after sight is lost"},{key:"revealRate",group:"dev",type:"range",def:6,min:1,max:30,step:.5,digits:1,unit:"/s",label:"Reveal speed",hint:"How fast a texel brightens into sight"},{key:"revealStep",group:"dev",type:"range",def:.5,min:.1,max:3,step:.05,digits:2,unit:" u",label:"Reveal step",hint:"Distance moved per sight re-solve (sub-cell exposure)"},{key:"shroud",group:"dev",type:"range",def:1,min:0,max:1,step:.05,digits:2,label:"Shroud darkness",hint:"1 hides unseen ground, 0 shows it"},{key:"atmosphere",group:"dev",type:"range",def:1,min:0,max:2,step:.05,digits:2,off:0,label:"Atmosphere density",hint:"Depth haze and drifting motes"},{key:"bloomRadius",group:"dev",type:"range",def:.32,min:0,max:1,step:.02,digits:2,label:"Glow radius"},{key:"bloomThreshold",group:"dev",type:"range",def:.85,min:0,max:1.5,step:.01,digits:2,label:"Glow threshold"},{key:"camDist",group:"dev",type:"range",def:19,min:9,max:70,step:1,digits:0,unit:" u",label:"Camera distance",hint:"Chase view home distance (wheel still zooms)"},{key:"camPitch",group:"dev",type:"range",def:58,min:35,max:88,step:1,digits:0,unit:" deg",label:"Camera pitch",hint:"Chase view home tilt"},{key:"fov",group:"dev",type:"range",def:50,min:5,max:90,step:1,digits:0,unit:" deg",label:"Field of view",hint:"The camera dollies back as it narrows, so the framing holds (5 is a long lens)"},{key:"meshRings",group:"dev",type:"range",def:2,min:1,max:4,step:1,digits:0,label:"Stream prefetch",hint:"Sector rings built around you"}]),C_=tl.filter(i=>i.type==="range"),P_=tl.filter(i=>i.type==="toggle"),nn=Object.freeze(Object.fromEntries(tl.map(i=>[i.key,i.def]))),Tr=Object.freeze(Object.fromEntries(C_.map(i=>[i.key,[i.min,i.max,i.step]]))),L_=P_.map(i=>i.key),D_=(i,t,e)=>Math.min(e,Math.max(t,i));function _x(i,t){return i.type==="toggle"?t?"on":"off":i.off!==void 0&&t<=i.off+1e-9?"off":`${Number(t).toFixed(i.digits??0)}${i.unit??""}`}function Wr(i){const t={...nn};if(!i||typeof i!="object")return t;for(const e of L_)typeof i[e]=="boolean"&&(t[e]=i[e]);for(const e of Object.keys(Tr)){const n=Number(i[e]);i[e]!==null&&i[e]!==""&&Number.isFinite(n)&&(t[e]=D_(Tr[e][2]===1?Math.round(n):n,Tr[e][0],Tr[e][1]))}return t}function I_(i=globalThis.localStorage){try{const t=i==null?void 0:i.getItem(Vu);return Wr(t?JSON.parse(t):null)}catch{return{...nn}}}function Nc(i,t=globalThis.localStorage){try{return t==null||t.setItem(Vu,JSON.stringify(Wr(i))),!0}catch{return!1}}function U_(i,t,e){const n=i.sensitivity;return{dyaw:t*.006*n*(i.invertYaw?-1:1),dpitch:e*.004*n*(i.invertPitch?-1:1)}}function xx(i=globalThis.localStorage){let t=I_(i);const e=new Set,n=()=>{for(const s of e)s(t)};return{get:()=>t,set(s){return t=Wr({...t,...s}),Nc(t,i),n(),t},reset(s){const r=s===void 0?null:[].concat(s);return t=r?Wr({...t,...Object.fromEntries(r.filter(o=>o in nn).map(o=>[o,nn[o]]))}):{...nn},Nc(t,i),n(),t},subscribe(s){return e.add(s),s(t),()=>e.delete(s)}}}const Le=Math.PI/180,me={overview:{pitch:72,dist:150,fov:42,minD:28,maxD:260,near:1,far:1400},chase:{pitch:58,dist:19,fov:50,minD:9,maxD:70,near:.5,far:600,lookHeight:1},pitchMin:35,pitchMax:88,yawRate:1.9,pitchRate:38,ease:9,followEase:7,fovMin:5,maxPhys:1500};class z_{constructor(t,e,n,{embedded:s=!1,mode:r="overview"}={}){this.camera=t,this.dom=e,this.bounds=n,this.embedded=s,this.mode=r,this.target=new j,this.goal=new j,this.yaw=this.yawGoal=0,this.pitch=this.pitchGoal=72*Le,this.dist=this.distGoal=150,this.followHeading=!1,this.heading=0,this.keys=new Set,this.settings={...nn},this.plane=new ti(new j(0,1,0),0),this.ray=new bc,this.drag=null,this.lastMid=0,this.onChange=null,this._off=[],this._bind(),this.setMode(r,{keepTarget:!1})}get P(){if(this.mode!=="chase")return me[this.mode];const t=this.settings,e=this._chase;return(!e||e.dist!==t.camDist||e.pitch!==t.camPitch)&&(this._chase={...me.chase,dist:t.camDist,pitch:t.camPitch}),this._chase}get fovDeg(){return this.mode==="chase"?this.settings.fov:me[this.mode].fov}get dolly(){const t=this.mode==="chase"?nn.fov:me[this.mode].fov,e=Un.clamp(this.fovDeg,me.fovMin,179);return Math.tan(t*Le/2)/Math.tan(e*Le/2)}get physDist(){return Math.min(this.dist*this.dolly,me.maxPhys)}get yawDeg(){return this.yaw/Le}get pitchDeg(){return this.pitch/Le}setMode(t,{keepTarget:e=!0}={}){this.mode=t;const n=me[t];this.pitch=this.pitchGoal=n.pitch*Le,this.dist=this.distGoal=n.dist,this.camera.fov=t==="chase"?this.settings.fov:n.fov,this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),e||this.target.copy(this.goal),this.apply(),this._changed()}_changed(){var t;(t=this.onChange)==null||t.call(this,this)}applySettings(t){const e=this.settings;this.settings={...this.settings,...t},this.mode==="chase"&&(this.settings.camDist!==e.camDist&&(this.distGoal=Un.clamp(this.settings.camDist,this.P.minD,this.P.maxD)),this.settings.camPitch!==e.camPitch&&(this.pitchGoal=this.settings.camPitch*Le)),this.apply()}rotate(t){this.yawGoal+=t,this._changed()}setYawDeg(t){this.yawGoal=t*Le,this._changed()}setPitchDeg(t){this.pitchGoal=Un.clamp(t,me.pitchMin,me.pitchMax)*Le,this._changed()}tilt(t){this.setPitchDeg(this.pitchGoal/Le+t)}zoomBy(t){this.distGoal=Un.clamp(this.distGoal*t,this.P.minD,this.P.maxD),this._changed()}northUp(){this.yawGoal=Math.round(this.yawGoal/(2*Math.PI))*2*Math.PI,this._changed()}reset(){this.northUp(),this.pitchGoal=this.P.pitch*Le,this.distGoal=this.P.dist,this.followHeading=!1,this._changed()}forward(t=new Vt){return t.set(-Math.sin(this.yaw),-Math.cos(this.yaw))}right(t=new Vt){return t.set(Math.cos(this.yaw),-Math.sin(this.yaw))}toWorldAxis(t,e,n={x:0,z:0}){const s=Math.sin(this.yaw),r=Math.cos(this.yaw);return n.x=t*r-e*s,n.z=-t*s-e*r,n}groundAt(t,e,n=new j){this.ray=this.ray??new bc;const s=this.dom.getBoundingClientRect(),r=new Vt((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1);return this.ray.setFromCamera(r,this.camera),this.ray.ray.intersectPlane(this.plane,n)?n:null}rayAt(t,e){const n=this.dom.getBoundingClientRect(),s=new Vt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);return this.ray.setFromCamera(s,this.camera),this.ray.ray}_on(t,e,n,s){t.addEventListener(e,n,s),this._off.push(()=>t.removeEventListener(e,n,s))}_bind(){const t=this.dom,e=this.embedded?t:window,n=r=>this.embedded?!0:r.target===document.body,s=/^(Arrow|KeyW|KeyA|KeyS|KeyD|KeyQ|KeyE|KeyR|KeyF|Home)/;this._on(e,"keydown",r=>{!n(r)||r.ctrlKey||r.metaKey||r.altKey||(this.keys.add(r.code),r.code==="Home"&&this.reset(),r.code==="KeyV"&&this.mode==="chase"&&(this.followHeading=!this.followHeading,this._changed()),this.embedded&&s.test(r.code)&&r.preventDefault())}),this._on(e,"keyup",r=>this.keys.delete(r.code)),this._on(window,"blur",()=>this.keys.clear()),this._on(t,"blur",()=>this.keys.clear()),this._on(t,"wheel",r=>{if(this.embedded&&!r.ctrlKey&&document.activeElement!==t)return;if(r.preventDefault(),r.shiftKey){this.tilt(-Math.sign(r.deltaY)*3);return}const o=Math.exp(r.deltaY*.0012);if(this.mode==="overview"){const a=this.groundAt(r.clientX,r.clientY);this.dist=this.distGoal=Un.clamp(this.distGoal*o,this.P.minD,this.P.maxD),this.apply();const l=this.groundAt(r.clientX,r.clientY);a&&l&&(this.goal.add(a.sub(l)),this._clamp(this.goal),this.target.copy(this.goal),this.apply()),this._changed()}else this.zoomBy(o)},{passive:!1}),this._on(t,"pointerdown",r=>{if(r.button!==1)return;r.preventDefault(),t.setPointerCapture(r.pointerId);const o=performance.now();if(o-this.lastMid<350){this.reset(),this.lastMid=0;return}this.lastMid=o,this.drag={x:r.clientX,y:r.clientY,pan:r.shiftKey&&this.mode==="overview",last:this.groundAt(r.clientX,r.clientY)}}),this._on(t,"pointermove",r=>{const o=this.drag;if(!o)return;if(o.pan){const p=this.groundAt(r.clientX,r.clientY);if(!p||!o.last)return;this.goal.add(o.last.clone().sub(p)),this._clamp(this.goal),this.target.copy(this.goal),this.apply(),o.last=this.groundAt(r.clientX,r.clientY);return}const a=r.clientX-o.x,l=r.clientY-o.y;o.x=r.clientX,o.y=r.clientY;const{dyaw:c,dpitch:u}=U_(this.settings,a,l);this.yawGoal+=c,this.pitchGoal=Un.clamp(this.pitchGoal+u,me.pitchMin*Le,me.pitchMax*Le),this._changed()}),this._on(t,"pointerup",()=>{this.drag=null}),this._on(t,"auxclick",r=>r.preventDefault())}dispose(){for(const t of this._off)t();this._off=[],this.keys.clear()}_clamp(t){const e=this.bounds,n=14;t.x=Un.clamp(t.x,e.x0-n,e.x1+n),t.z=Un.clamp(t.z,e.z0-n,e.z1+n)}focus(t,e,n){this.goal.set(t,0,e),this._clamp(this.goal),this.target.copy(this.goal),n&&(this.dist=this.distGoal=n),this.apply()}follow(t,e,n){this.goal.set(t,0,e),this.heading=n}update(t){const e=this.keys,n=o=>e.has(o);let s=!1;if(n("KeyQ")&&(this.yawGoal-=me.yawRate*t,s=!0),n("KeyE")&&(this.yawGoal+=me.yawRate*t,s=!0),n("KeyR")&&(this.pitchGoal=Math.min(me.pitchMax*Le,this.pitchGoal+me.pitchRate*Le*t),s=!0),n("KeyF")&&(this.pitchGoal=Math.max(me.pitchMin*Le,this.pitchGoal-me.pitchRate*Le*t),s=!0),s&&this._changed(),this.mode==="overview"){let o=0,a=0;if((n("KeyW")||n("ArrowUp"))&&(a+=1),(n("KeyS")||n("ArrowDown"))&&(a-=1),(n("KeyA")||n("ArrowLeft"))&&(o-=1),(n("KeyD")||n("ArrowRight"))&&(o+=1),o||a){const l=Math.hypot(o,a),c=this.dist*.9*(n("ShiftLeft")?2:1),u=this.toWorldAxis(o/l,a/l);this.goal.x+=u.x*c*t,this.goal.z+=u.z*c*t,this._clamp(this.goal)}this.target.copy(this.goal)}else{if(this.followHeading){let o=this.heading+Math.PI;o+=Math.round((this.yawGoal-o)/(2*Math.PI))*2*Math.PI,this.yawGoal+=(o-this.yawGoal)*(1-Math.exp(-t*2.2))}this.target.lerp(this.goal,1-Math.exp(-t*me.followEase))}const r=1-Math.exp(-t*me.ease);this.yaw+=(this.yawGoal-this.yaw)*r,this.pitch+=(this.pitchGoal-this.pitch)*r,this.dist+=(this.distGoal-this.dist)*r,this.apply()}apply(){const t=this.physDist,e=me[this.mode],n=Math.max(1,t/Math.max(this.dist,1e-6)),s=this.fovDeg,r=e.near*n,o=e.far+t;(this.camera.fov!==s||this.camera.near!==r||this.camera.far!==o)&&(this.camera.fov=s,this.camera.near=r,this.camera.far=o,this.camera.updateProjectionMatrix());const a=Math.cos(this.pitch),l=Math.sin(this.pitch),c=this.mode==="chase"?me.chase.lookHeight:0;this.camera.position.set(this.target.x+Math.sin(this.yaw)*a*t,c+l*t,this.target.z+Math.cos(this.yaw)*a*t),this.camera.lookAt(this.target.x,c,this.target.z),this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert()}}function N_(i){i.fog=new Ya(de.background,1e5,100001);const t=new G0(13626111,1714746,Math.PI*1),e=new Mc(10476799,1.5);e.position.set(-.5,.8,.35);const n=new Mc(16751200,.5);n.position.set(.6,.35,-.7),i.add(t,e,n);const s=520,r=new Float32Array(s*4);for(let u=0;u<s;u++)r[u*4]=Math.random(),r[u*4+1]=Math.random(),r[u*4+2]=Math.random(),r[u*4+3]=Math.random();const o=new le;o.setAttribute("position",new Me(new Float32Array(s*3),3)),o.setAttribute("aSeed",new Me(r,4));const a=He(new Se({transparent:!0,blending:Ge,depthTest:!0,depthWrite:!1,uniforms:{uTime:{value:0},uCenter:{value:new j},uBox:{value:new j(70,14,70)},uScale:{value:400},uFade:{value:1}},vertexShader:`
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
      }`})),l=new F0(o,a);l.frustumCulled=!1,l.renderOrder=Jt.MOTES,i.add(l);let c=1;return{motes:l,setDensity(u){c=u,a.uniforms.uFade.value=Math.min(1,u)},get density(){return c},update(u,p,h,f){const m=p.mode==="chase";if(l.visible=m&&c>.001,m){const _=p.physDist;i.fog.near=_*.95,i.fog.far=c>.001?_+34/c:1e5,c<=.001&&(i.fog.near=99999),a.uniforms.uTime.value=h,a.uniforms.uCenter.value.set(p.target.x,0,p.target.z),a.uniforms.uScale.value=f/(2*Math.tan(u.fov*Math.PI/360))}else i.fog.near=1e5,i.fog.far=100001}}}function F_({scene:i,addLineMaterial:t}){const e=new Ve;i.add(e);const n=(g,d=.9)=>Ou(He(new ye({color:new kt(g).multiplyScalar(1.5),transparent:!0,opacity:d,side:ge,blending:Ge,toneMapped:!1}))),s=n(de.hover,.85),r=new Ve,o=new qt(new Gn(.55,.68,40),s);o.rotation.x=-Math.PI/2,o.renderOrder=Jt.CURSOR,r.add(o);for(let g=0;g<4;g++){const d=new qt(new ps(.1,.38),s);d.rotation.x=-Math.PI/2;const M=g*Math.PI/2;d.position.set(Math.cos(M)*.95,0,Math.sin(M)*.95),d.rotation.z=M+Math.PI/2,d.renderOrder=Jt.CURSOR,r.add(d)}r.visible=!1,e.add(r);const a=n(de.select,.95),l=new Ve,c=new qt(new Gn(.7,.85,40),a);c.rotation.x=-Math.PI/2,c.renderOrder=Jt.MARKERS;const u=new qt(new Gn(.7,.8,40),a.clone());u.rotation.x=-Math.PI/2,u.renderOrder=Jt.MARKERS;const p=new qt(new gs(.035,.035,2.2,6,1,!0),He(new ye({color:new kt(de.select).multiplyScalar(1.4),transparent:!0,opacity:.7,blending:Ge,toneMapped:!1})));p.position.y=1.1,p.renderOrder=Jt.MARKERS;const h=new qt(new Ei(.22),new ye({color:new kt(de.select).multiplyScalar(1.6),toneMapped:!1}));h.position.y=2.3,h.renderOrder=Jt.MARKERS,l.add(c,u,p,h),l.visible=!1,e.add(l);const f=Fu(He(new Vs({color:new kt(de.ally).multiplyScalar(1.3),linewidth:2.4,worldUnits:!1,dashed:!0,dashSize:.55,gapSize:.4,transparent:!0,opacity:.9})));t(f);const m=Bu(f,96,{dashed:!0}),_=m.line;return _.renderOrder=Jt.MARKERS,e.add(_),{group:e,showCursor(g,d,M,y){r.visible=!0,r.position.set(g,d+.1,M),s.color.set(y?de.blocked:de.hover).multiplyScalar(1.5)},hideCursor(){r.visible=!1},setTarget(g,d,M,y){l.visible=!0,l.position.set(g,d+.1,M),y&&a.color.set(y).multiplyScalar(1.5)},clearTarget(){l.visible=!1},get targetPos(){return l.visible?l.position:null},setPath(g,d=.12,M=de.ally){if(!g||g.length<2){_.visible=!1;return}f.color.set(M).multiplyScalar(1.3);const y=[];for(let x=0;x<g.length-1;x++)y.push(g[x].x,d,g[x].z,g[x+1].x,d,g[x+1].z);m.set(y)},update(g){r.rotation.y=g*.8;const d=g*1.6%1;c.scale.setScalar(1+.9*(1-d)),c.material.opacity=.95*d,u.scale.setScalar(1+.2*Math.sin(g*4)),h.rotation.y=g*2,h.position.y=2.3+.12*Math.sin(g*3),f.dashOffset=-g*.6}}}function Wu(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new le;let c=0;for(let u=0;u<i.length;++u){const p=i[u];let h=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in p.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(p.attributes[f]),h++}if(h!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in p.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(p.morphAttributes[f])}if(t){let f;if(e)f=p.index.count;else if(p.attributes.position!==void 0)f=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(e){let u=0;const p=[];for(let h=0;h<i.length;++h){const f=i[h].index;for(let m=0;m<f.count;++m)p.push(f.getX(m)+u);u+=i[h].attributes.position.count}l.setIndex(p)}for(const u in r){const p=Fc(r[u]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,p)}for(const u in o){const p=o[u][0].length;if(p===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let h=0;h<p;++h){const f=[];for(let _=0;_<o[u].length;++_)f.push(o[u][_][h]);const m=Fc(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(m)}}return l}function Fc(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const u=i[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Me(o,e,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const p=l/e;for(let h=0,f=u.count;h<f;h++)for(let m=0;m<e;m++){const _=u.getComponent(h,m);a.setComponent(h+p,m,_)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Rs=new kt(de.ally),Cs=new kt(de.companion);let Ar=null;function O_(){if(Ar)return Ar;const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.55,"rgba(0,0,0,0.35)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Ar=new Cu(i),Ar}const gi=30;function B_(i,t){const e=new Float32Array(gi*2*3),n=new Float32Array(gi*2*4),s=[];for(let c=0;c<gi-1;c++){const u=c*2;s.push(u,u+1,u+2,u+1,u+3,u+2)}const r=new le;r.setAttribute("position",new Me(e,3)),r.setAttribute("color",new Me(n,4)),r.setIndex(s);const o=new qt(r,He(new ye({vertexColors:!0,transparent:!0,blending:Ge,side:ge,toneMapped:!1})));o.frustumCulled=!1,o.renderOrder=Jt.TRAIL;const a=[];let l=0;return{mesh:o,reset(c,u,p){a.length=0;for(let h=0;h<gi;h++)a.push([c,u,p])},update(c,u,p,h,f){for(l+=c,a.length||this.reset(u,p,h);l>=.028;)l-=.028,a.unshift([u,p,h]),a.length=gi;a[0]=[u,p,h];for(let m=0;m<gi;m++){const _=a[m],g=1-m/(gi-1),d=t*g;e.set([_[0],_[1],_[2],_[0],_[1]+d,_[2]],m*6);const M=Math.pow(g,1.4)*f;n.set([i.r*1.6,i.g*1.6,i.b*1.6,M,i.r*1.6,i.g*1.6,i.b*1.6,0],m*8)}r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}}}function k_(i,t,e=!1){const n=new Ve,s=c=>He(new ye({color:i.clone().multiplyScalar(1.5),transparent:!0,opacity:c,side:ge,blending:Ge,toneMapped:!1})),r=new qt(new Gn(t*.88,t,48),s(.85)),o=new qt(new Gn(.01,t*.88,48),s(.07)),a=Wu([0,1,2,3].map(c=>new Gn(t*1.28,t*1.4,10,1,c*Math.PI/2+.2,Math.PI/2-.5))),l=new qt(a,s(.95));for(const c of[r,o,l])c.rotation.x=-Math.PI/2,c.renderOrder=Jt.GLOW+1,n.add(c);return{group:n,ctrl:l,base:r,inner:o}}function G_({scene:i,map:t,addLineMaterial:e}){const n=new Ve;i.add(n);const s={},r=(h,f,m)=>{const _=Iu(new Vs({color:f.clone().multiplyScalar(1.7),linewidth:m,worldUnits:!1,fog:!0}));e(_);const g=new Qa(new Zr().fromEdgesGeometry(new O0(h,25)),_);return g.renderOrder=Jt.CREST,g},o=h=>new Ra({color:h,flatShading:!0}),a=(h,f)=>new ye({color:h.clone().multiplyScalar(f),toneMapped:!1});function l(){const h=new Ve,f=[new gs(.2,.31,1.05,6).translate(0,.62,0),new Sn(.82,.2,.36).translate(0,1.28,0),new Sn(.22,.5,.2).translate(.2,0+.25,0),new Sn(.22,.5,.2).translate(-.2,.25,0)].map(w=>w.index?w.toNonIndexed():w),m=Wu(f.map(w=>(w.deleteAttribute("uv"),w))),_=new qt(m,o(398880));_.renderOrder=Jt.SOLIDS;const g=r(m,Rs,1.8),d=new qt(new Ei(.22).scale(1,1.25,1),a(Rs,2));d.position.y=1.7,d.renderOrder=Jt.SOLIDS;const M=new qt(new ja(.11,.38,4),a(Rs,2.4));M.rotation.x=Math.PI/2,M.position.set(0,1.7,.3),M.renderOrder=Jt.SOLIDS;const y=new qt(new Sn(.16,.2,.05),a(Rs,2.2));y.position.set(0,1,.31),y.renderOrder=Jt.SOLIDS;const x=new Ve;return x.add(_,g,d,M,y),h.add(x),{group:h,lean:x}}function c(){const h=new Ve,f=new Za(.46,.065,5,6),m=new qt(f,a(Cs,1.7));m.rotation.x=Math.PI/2,m.renderOrder=Jt.SOLIDS;const _=new qt(new Ei(.26),o(727558));_.renderOrder=Jt.SOLIDS;const g=r(_.geometry,Cs,1.6),d=new qt(new Ei(.13),a(Cs,2.6));d.renderOrder=Jt.SOLIDS;const M=[0,1].map(y=>{const x=new qt(new Ka(.09),a(Cs,2.2));return x.renderOrder=Jt.SOLIDS,h.add(x),x});return h.add(m,_,g,d),{group:h,ring:m,shell:_,sats:M}}function u(h,f,m,_,g,d,M){const y=f(),x=new Ve;x.add(y.group);const w=new qt(new $a(_*1.9,24),new ye({map:O_(),transparent:!0,depthWrite:!1,toneMapped:!1}));w.rotation.x=-Math.PI/2,w.renderOrder=Jt.GLOW-1;const E=k_(m,_),b=B_(m,g),P=new V0(m.clone().lerp(new kt(16777215),.25),d,M,2);n.add(x,w,E.group,b.mesh,P),s[h]={id:h,model:y,group:x,shadow:w,rings:E,trail:b,light:P,y:.05,init:!1}}u("avatar",l,Rs,.55,.95,9,16),u("companion",c,Cs,.4,.5,4.5,11);const p=[];return{group:n,sync(h,f,m){p.length=0;for(const _ of["avatar","companion"]){const g=h[_],d=s[_];if(!g||!d)continue;const M=g.render??g,y=M.x,x=M.z,w=M.heading,E=g.cell!=null?t.cells[g.cell]:null,b=ke(E);d.y=d.init?d.y+(b-d.y)*Math.min(1,m*14):b;const P=_==="companion"?1.35+.08*Math.sin(f*2.2):0,S=d.y;d.group.position.set(y,S+P,x),d.group.rotation.y=w,d.shadow.position.set(y,S+.035,x),d.rings.group.position.set(y,S+.09,x),d.rings.ctrl.visible=!!g.controlled,d.rings.ctrl.rotation.z=f*1.4,d.rings.base.material.opacity=g.controlled?.95:.55,d.light.position.set(y,S+(_==="avatar"?3.1:2.4),x),_==="avatar"?(d.model.lean.rotation.x=Math.min(.28,(M.speed??0)*.03),d.model.lean.position.y=Math.abs(Math.sin(f*11))*Math.min(.06,(M.speed??0)*.008)):(d.model.ring.rotation.z=f*1.2,d.model.shell.rotation.y=f*1.8,d.model.sats.forEach((v,A)=>{const N=f*2.6+A*Math.PI;v.position.set(Math.cos(N)*.62,.05*Math.sin(f*5+A),Math.sin(N)*.62),v.rotation.set(f*3,f*2,0)})),d.init||(d.trail.reset(y,S+.1,x),d.init=!0),d.trail.update(m,y,S+.1+(_==="companion"?.7:0),x,M.moving??g.moving?.85:.5),p.push({id:_,x:y,y:S+1,z:x,r:_==="avatar"?3:2})}},centres(){return p},dispose(){i.remove(n)}}}function H_(i,t,{size:e=64,corner:n="bottom-right",offset:s=16}={}){const r=document.createElement("div");r.setAttribute("role","img"),r.setAttribute("aria-label","Compass: click to put north up"),r.title="Compass (click: north up, Home: reset view)";const o={"bottom-right":`right:${s}px;bottom:${s}px`,"top-left":`left:${s}px;top:${s}px`,"bottom-left":`left:${s}px;bottom:${s}px`}[n];r.style.cssText=`position:absolute;${o};width:${e}px;height:${e}px;border-radius:50%;cursor:pointer;
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
    </svg>`;const a=r.querySelector(".dial");r.addEventListener("click",c=>{c.stopPropagation(),t.northUp()}),r.addEventListener("pointerdown",c=>c.stopPropagation()),i.appendChild(r);let l=NaN;return{el:r,update(){const c=t.yawDeg;Math.abs(c-l)<.05||(l=c,a.setAttribute("transform",`rotate(${c.toFixed(2)})`))},dispose(){r.remove()}}}const V_=.38;function vx({canvas:i,map:t,embedded:e=!1,focus:n,glow:s=V_,mode:r="overview",compass:o=!0,makeBoard:a,fog:l=!1,onHover:c,onSelect:u}){const p=new L0({canvas:i,antialias:!0});p.setPixelRatio(Math.min(devicePixelRatio,2)),p.setClearColor(de.background);const h=new D0,f=new Ze(42,1,1,1200),m=new z_(f,i,t.bounds,{embedded:e,mode:r}),_=n??{x:t.startCell.cx,z:t.startCell.cz,dist:void 0};m.focus(_.x,_.z,r==="overview"?_.dist??150:void 0);const g=p_(),d=a?a({map:t,cut:g}):Hu(t,{cut:g});h.add(d.group);const M=N_(h),y={w:1,h:1},x=xt=>{d.lineMats.push(xt),xt.resolution.set(y.w,y.h)},w=F_({scene:h,addLineMaterial:x});let E=null;const b=new sn(1,1,{type:bn,samples:4});l&&(b.depthTexture=new qa(1,1));const P=new J0(p,b);P.addPass(new Q0(h,f));const S=l?new o_(f):null;S&&P.addPass(S);const v=new us(new Vt(1,1),s,.32,.85);P.addPass(v),P.addPass(new n_);const A=o?H_(e?i.parentElement:document.body,m,e?{corner:"bottom-right",size:58,offset:12}:{corner:"bottom-right",size:72,offset:18}):null;A&&!e&&(A.el.style.position="fixed");function N(){const xt=e?i.parentElement:null,yt=xt?xt.clientWidth:innerWidth,Nt=xt?xt.clientHeight:innerHeight;!yt||!Nt||(y.w=yt,y.h=Nt,p.setSize(yt,Nt,!1),P.setSize(yt,Nt),f.aspect=yt/Nt,f.updateProjectionMatrix(),d.resize(yt,Nt))}const k=e?new ResizeObserver(N):null;k==null||k.observe(i.parentElement),e||addEventListener("resize",N),N();const $={hover:[],select:[],frame:[]},Q=(xt,...yt)=>{for(const Nt of $[xt])Nt(...yt)},K=(xt,yt)=>($[xt].push(yt),()=>{$[xt]=$[xt].filter(Nt=>Nt!==yt)});c&&K("hover",c),u&&K("select",u);const O=new j;function H(xt,yt){const Nt=m.rayAt(xt,yt),Dt=Nt.origin,z=Nt.direction;if(z.y>-1e-4)return null;const R=Math.max(0,(f_-Dt.y)/z.y),T=(0-Dt.y)/z.y,U=44;for(let B=0;B<=U;B++){const _t=R+(T-R)*B/U;O.copy(z).multiplyScalar(_t).add(Dt);const at=t.cellAt(O.x,O.z);if(at&&at.solid&&O.y<=h_(at))return{point:O.clone(),cell:at,solid:!0}}O.copy(z).multiplyScalar(T).add(Dt);const W=t.cellAt(O.x,O.z);return{point:O.clone(),cell:W,solid:!!(W!=null&&W.solid)}}const ot={x:0,y:0,inside:!1};let st=null,vt=!1,St=null;function Pt(){if(!ot.inside){St=null,st&&(st=null,d.hover.set(null),Q("hover",null,null)),w.hideCursor();return}const xt=H(ot.x,ot.y);St=xt;const yt=(xt==null?void 0:xt.cell)??null,Nt=!yt||yt.solid;(yt!==st||Nt!==vt)&&(st=yt,vt=Nt,d.hover.set(yt,{blocked:Nt}),Q("hover",yt,xt)),xt&&yt&&!yt.solid?w.showCursor(xt.point.x,ke(yt),xt.point.z,!1):w.hideCursor()}const lt=xt=>{ot.x=xt.clientX,ot.y=xt.clientY,ot.inside=!0},Mt=()=>{ot.inside=!1},Tt=xt=>{const yt=H(xt.clientX,xt.clientY),Nt=(yt==null?void 0:yt.cell)??null;Q("select",Nt,yt)},pt=xt=>xt.preventDefault();i.addEventListener("pointermove",lt),i.addEventListener("pointerleave",Mt),i.addEventListener("click",Tt),e||i.addEventListener("contextmenu",pt);const Ct=K("select",xt=>{wt.handlesSelect||d.select.set(xt)}),V=new Lu;let gt=0,mt=!1;const Et=[];let Ut=!0;const Y={n:0,sum:0,max:0,last:0};function Yt(){if(!mt)return;const xt=performance.now(),yt=Math.min(V.getDelta(),.1),Nt=V.elapsedTime;if(Q("frame",yt,Nt),m.update(yt),Pt(),d.update(Nt),w.update(Nt),d.setFocus(m.target.x,m.target.z),M.update(f,m,Nt,p.domElement.height),Et.length=0,E)for(const R of E.centres())Et.push(R);const Dt=w.targetPos;Dt&&Et.push({x:Dt.x,y:Dt.y+.6,z:Dt.z,r:1.9}),St!=null&&St.cell&&!St.solid&&Et.push({x:St.point.x,y:ke(St.cell)+.6,z:St.point.z,r:1.7}),g.update(f,m.mode==="chase"&&Ut?Et:[]),A==null||A.update(),P.render();const z=performance.now()-xt;Y.last=z,Y.sum+=z,Y.n++,Y.max=Math.max(Y.max,z),gt=requestAnimationFrame(Yt)}const wt={renderer:p,camera:f,rig:m,board:d,composer:P,map:t,bloom:v,markers:w,scene:h,cut:g,pointer:ot,fogPass:S,handlesSelect:!1,on:K,pick:H,repick:Pt,addLineMaterial:x,compass:A,get actorsView(){return E},get lastPick(){return St},ensureActorsView(){return E??(E=G_({scene:h,map:t,addLineMaterial:x}))},setMode(xt,yt){yt&&m.goal.set(yt.x,0,yt.z),m.setMode(xt),xt==="overview"&&yt&&m.focus(yt.x,yt.z,150)},setGlow(xt,yt,Nt){v.strength=xt,v.enabled=xt>.001,yt!==void 0&&(v.radius=yt),Nt!==void 0&&(v.threshold=Nt)},applySettings(xt){m.applySettings(xt),this.setGlow(xt.glow,xt.bloomRadius,xt.bloomThreshold),M.setDensity(xt.atmosphere??1),S==null||S.setShroud(xt.shroud??1),Ut=xt.cutaway},start(){mt||(mt=!0,V.getDelta(),Yt())},stop(){mt=!1,cancelAnimationFrame(gt)},takeFrameStats(){const xt={...Y,mean:Y.sum/Math.max(1,Y.n)};return Y.n=Y.sum=Y.max=0,xt},measureScene(){p.info.reset(),p.setRenderTarget(null),p.render(h,f);const xt=p.info.render;return{calls:xt.calls,triangles:xt.triangles,lines:xt.lines,points:xt.points,geometries:p.info.memory.geometries,textures:p.info.memory.textures}},dispose(){mt=!1,cancelAnimationFrame(gt),k==null||k.disconnect(),e||removeEventListener("resize",N),i.removeEventListener("pointermove",lt),i.removeEventListener("pointerleave",Mt),i.removeEventListener("click",Tt),i.removeEventListener("contextmenu",pt),Ct(),m.dispose(),A==null||A.dispose(),P.dispose(),p.dispose(),p.forceContextLoss()}};return wt}function Mx({stage:i,actors:t,canvas:e,embedded:n=!1,onStatus:s}){const r=i.rig,o=i.ensureActorsView();i.handlesSelect=!0;let a=null,l=null,c=0,u="avatar",p=!1;const h=()=>t.snapshot()[u],f=()=>s==null?void 0:s({controlled:u,companionMode:t.snapshot().companion.mode,camera:r.mode,followHeading:r.followHeading}),m=i.on("select",(b,P)=>{!P||!P.point||(a={x:P.point.x,z:P.point.z,cell:b??null})}),_=n?e:window,g=b=>n?!0:b.target===document.body,d=b=>{if(!(!g(b)||b.ctrlKey||b.metaKey||b.altKey||b.repeat)){if(b.code==="Tab"&&(b.preventDefault(),u=u==="avatar"?"companion":"avatar",t.possess(u),y(),f()),b.code==="KeyT"){const P=t.snapshot().companion.mode;t.commandCompanion({type:P==="follow"?"hold":"follow"}),f()}b.code==="KeyX"&&(y(),a=null),b.code==="KeyO"&&M(),b.code==="KeyV"&&queueMicrotask(f)}};_.addEventListener("keydown",d);function M(){const b=h();i.setMode(r.mode==="chase"?"overview":"chase",{x:b.x,z:b.z}),f()}function y(){l=null,i.markers.clearTarget(),i.board.select.set(null)}const x={axis:{x:0,z:0},moveTo:null,stop:!1,aim:null,run:!1},w=b=>({sx:(b.has("KeyD")||b.has("ArrowRight")?1:0)-(b.has("KeyA")||b.has("ArrowLeft")?1:0),sy:(b.has("KeyW")||b.has("ArrowUp")?1:0)-(b.has("KeyS")||b.has("ArrowDown")?1:0)}),E=i.on("frame",(b,P)=>{const S=r.keys;if(x.axis.x=x.axis.z=0,r.mode==="chase"){const{sx:Q,sy:K}=w(S);if(Q||K){const O=Math.hypot(Q,K);r.toWorldAxis(Q/O,K/O,x.axis),y()}}x.run=S.has("ShiftLeft")||S.has("ShiftRight");const v=i.lastPick;if(x.aim=v&&!v.solid?{x:v.point.x,z:v.point.z}:null,x.moveTo=null,a){const Q=a;a=null;const O=!Q.cell||Q.cell.solid?{ok:!1}:t.commandAvatarTo(Q.x,Q.z);(O==null?void 0:O.ok)===!1?(c=.5,i.board.select.set(Q.cell,{blocked:!0}),i.markers.clearTarget(),l=null):(l={x:Q.x,z:Q.z,cell:Q.cell},i.board.select.set(Q.cell),i.markers.setTarget(Q.x,ke(Q.cell),Q.z))}c>0&&(c-=b,c<=0&&!l&&i.board.select.set(null)),p||t.update(b,x);const A=t.snapshot();u=A.controlled??u,o.sync(A,P,b);const N=A[u],k=N.render??N;r.mode==="chase"&&r.follow(k.x,k.z,k.heading);const $=t.path(u);$.length?i.markers.setPath([{x:N.x,z:N.z},...$],ke(i.map.cells[N.cell])+.12):(i.markers.setPath([]),l&&c<=0&&y())});return f(),{actors:t,toggleView:M,status:f,setPaused(b){p=!!b},get paused(){return p},get controlled(){return u},dispose(){m(),E(),_.removeEventListener("keydown",d)}}}const Rr=1e7,W_=(i,t)=>Math.max(Math.abs(i[0]-t[0]),Math.abs(i[1]-t[1]));function yx(i,{world:t,worldOptions:e,start:n=[0,0]}={}){const s=t??th(i,e),{field:r,coarse:o}=s,a=[],l=new Map,c=[],u=new Map,p=[],h=new Set,f={navMs:0,navN:0,cutMs:0,cutN:0,maxMs:0},m=(w,E)=>`${w},${E}`,_={seed:i,world:s,tileset:s,sectors:a,cells:c,gates:p,terrain:s.cfg,contours:[],sectorEdges:[],cuts:[],bounds:{x0:-Rr,z0:-Rr,x1:Rr,z1:Rr},stats:f};_.cell=w=>Number.isInteger(w)?c[w]??null:null,_.cellById=_.cell,_.gateLocked=w=>{var E;return!!((E=p[w])!=null&&E.locked)};function g(w,E){const b=performance.now(),P=E(),S=performance.now()-b;return f[`${w}Ms`]+=S,f[`${w}N`]++,f.maxMs=Math.max(f.maxMs,S),P}function d(w,E){for(const b of w.nav.portals){if(b.q[0]!==E.u||b.q[1]!==E.v)continue;const P=`${w.key}>${E.key}#${b.slot}`;if(h.has(P))continue;h.add(P);const S=c[w.base+b.cell],v=c[u.get(`${b.partner[0]},${b.partner[1]}`)];if(!S||!v)continue;const A=Math.abs(b.edge.a[0]-b.edge.b[0]),N=Math.abs(b.edge.a[1]-b.edge.b[1]),k=b.span.reduce((O,H)=>O+H.len,0),$=[b.span.reduce((O,H)=>O+H.mid[0]*H.len,0)/k,b.span.reduce((O,H)=>O+H.mid[1]*H.len,0)/k],Q={id:p.length,a:S.id,b:v.id,sa:w.id,sb:E.id,mid:$,len:k,horiz:N>=A,slot:b.slot,locked:b.locked,edge:b.edge,span:b.span,faces:b.faces,soft:b.soft,cells:[],kind:b.kind,visible:b.visible,axis:b.axis,normal:b.normal},K=[...b.span].sort((O,H)=>(H.mid===b.edge.mid?1:0)-(O.mid===b.edge.mid?1:0));for(const O of K){const H=c[w.base+O.cell],ot=c[u.get(`${O.partner[0]},${O.partner[1]}`)];!H||!ot||H.neighbors.some(st=>st.id===ot.id)||(H.neighbors.push({id:ot.id,mid:O.mid,len:O.len,gate:Q.id}),ot.neighbors.push({id:H.id,mid:O.mid,len:O.len,gate:Q.id}),Q.cells.push([H.id,ot.id]))}p.push(Q),w.gates.push(Q),E.gates.push(Q)}}function M(w,E){const b=m(w,E);let P=l.get(b);if(P)return P;const S=g("nav",()=>s.nav(w,E));P={id:a.length,u:w,v:E,key:b,clearance:S.info.clearance,name:b,base:c.length,cellIds:[],nav:S,gates:[],cut:!1,kind:"",render:null,rect:null},a.push(P),l.set(b,P);let v=1/0,A=1/0,N=-1/0,k=-1/0;for(const $ of S.cells){for(const[K,O]of $.poly)v=Math.min(v,K),A=Math.min(A,O),N=Math.max(N,K),k=Math.max(k,O);const Q={id:c.length,sector:P.id,clearance:P.clearance,local:$.local,solid:S.solid[$.local],poly:$.poly,cx:$.cx,cz:$.cz,area:$.area,radius:$.radius,sides:$.sides,i:$.i,j:$.j,neighbors:[],cache:0};c.push(Q),u.set(`${$.i},${$.j}`,Q.id),P.cellIds.push(Q.id)}P.rect={x0:v,z0:A,x1:N,z1:k};for(const $ of S.cells)for(const Q of $.nbl){if(Q.j<$.local)continue;const K=c[P.base+$.local],O=c[P.base+Q.j];K.neighbors.push({id:O.id,mid:Q.mid,len:Q.len}),O.neighbors.push({id:K.id,mid:Q.mid,len:Q.len})}for(const $ of Object.values(eh)){const Q=l.get(m(w+$[0],E+$[1]));Q&&(ll([P.u,P.v],[Q.u,Q.v])<=0?d(P,Q):d(Q,P))}return P}function y(w,E){if(!s.cfg.borders.openCross)return;const b=new Set(E.gapEdges);for(const P of w.nav.cells)if(!w.nav.solid[P.local])for(const S of P.ext){const v=l.get(m(S.u,S.v));if(!v||ll([w.u,w.v],[v.u,v.v])>0)continue;const A=o.border([w.u,w.v],[v.u,v.v]).mode;if(A!=="open"&&A!=="wall"||A==="wall"&&!b.has($c(S.a,S.b)))continue;const N=u.get(`${S.i},${S.j}`);if(N===void 0||c[N].solid)continue;const k=c[w.base+P.local],$=c[N];k.neighbors.some(Q=>Q.id===$.id)||(k.neighbors.push({id:$.id,mid:S.mid,len:S.len,open:!0}),$.neighbors.push({id:k.id,mid:S.mid,len:S.len,open:!0}))}}function x(w){if(w.cut)return w;for(let E=-1;E<=1;E++)for(let b=-1;b<=1;b++)(E||b)&&M(w.u+E,w.v+b);return g("cut",()=>{const E=s.render(w.u,w.v);for(const v of E.cuts??[]){const A=c[w.base+v.local];A.cut={poly:v.poly,open:v.open},_.cuts.push({cell:A.id,poly:v.poly,open:v.open})}const b=v=>M(v.u,v.v).base+v.local,P=s.detail(w.u,w.v);w.kind=P.kind;for(const v of P.caches){const A=c[w.base+v.cell];!A.role&&!A.solid&&(A.cache=v.amount)}const S=v=>v?M(v[0],v[1]).id:-1;w.render={contours:E.contours.map(v=>({a:v.a,b:v.b,solid:b(v.solid),open:b(v.open),...v.sliver?{sliver:!0}:{}})),sectorEdges:E.sectorEdges.map(v=>({a:v.a,b:v.b,sa:w.id,sb:S(v.sb),...v.sliver?{sliver:!0}:{},...v.open?{open:!0}:{},...v.gap?{gap:!0}:{}})),borderLines:E.borderLines.map(v=>({...v,sa:w.id,sb:S(v.sb)})),openings:E.openings.map(v=>({...v,sa:w.id,sb:S(v.sb)})),gapEdges:E.gapEdges},y(w,E)}),w.cut=!0,w}_.cellAt=(w,E)=>{const[b,P]=r.cellAtPoint(w,E);let S=u.get(`${b},${P}`);if(S===void 0){const[v,A]=r.sectorOf(b,P);M(v,A),S=u.get(`${b},${P}`)}return S===void 0?null:c[S]},_.sectorAt=(w,E)=>{const b=_.cellAt(w,E);return b?a[b.sector]:null},_.sectorIndexAt=(w,E)=>r.sectorOf(...r.cellAtPoint(w,E)),_.sector=M,_.prepare=x,_.has=(w,E)=>l.get(m(w,E)),_.chunkView=w=>{const E=[];for(let S=-1;S<=1;S++)for(let v=-1;v<=1;v++){const A=l.get(m(w.u+S,w.v+v));if(A)for(const N of A.cellIds)E.push(c[N])}const b=w.cellIds.map(S=>c[S]),P=_.startCell;return{cells:b,edgeCells:E,gates:w.gates,drawsGate:S=>S.sa===w.id,sectors:a,cellById:_.cell,sectorEdges:w.render.sectorEdges,contours:w.render.contours,sectorLines:w.render.borderLines,sectorOpenings:w.render.openings,gapEdges:w.render.gapEdges,startCell:P,beacons:P&&P.sector===w.id?[[P,8256767,0,2.4,.5]]:[]}};{const w=x(M(n[0],n[1])),E=w.nav.cells[w.nav.seedLocal??0];let b=null,P=1/0;for(const S of w.cellIds){const v=c[S];if(v.solid)continue;const A=Math.hypot(v.cx-E.cx,v.cz-E.cz)-v.radius*.5;A<P&&(P=A,b=v)}b.role="start",_.startCell=b}return _.coarse=o,_.ringDist=W_,_}function X_({centre:i,rings:t}){const e=[],n=new Set,s=(o,a,l,c)=>{const u=`${o}${a},${l}`;n.has(u)||(n.add(u),e.push({kind:o,u:a,v:l,level:c}))},r=o=>{const a=[];for(let l=-o;l<=o;l++)for(let c=-o;c<=o;c++)Math.max(Math.abs(l),Math.abs(c))===o&&a.push([i[0]+l,i[1]+c]);return a};for(let o=0;o<=t;o++){for(const[a,l]of r(o+2))s("nav",a,l,o);for(const[a,l]of r(o+1))s("cut",a,l,o);for(const[a,l]of r(o))s("mesh",a,l,o)}return{work:e,keep:o=>o<=t+1}}function Sx({map:i,cut:t,meshR:e=2,budgetMs:n=5,onChunk:s,policy:r=X_}){let o=e;const a=new Ve,l=[],c=new Map,{floor:u,floorMat:p}=Gu(a),{hover:h,select:f}=ku({group:a,lineMats:l}),m=new Map;let _=null,g=[],d={w:1,h:1};const M={chunksBuilt:0,chunksDropped:0,buildMs:0,maxItemMs:0,lastFrameMs:0,queued:0},y=S=>Math.max(Math.abs(S.u-_[0]),Math.abs(S.v-_[1]));function x(){const{work:S,keep:v}=r({centre:_,rings:o});g=S,M.queued=g.length;for(const[A,N]of m)v(y(i.sectors[A]))||(a.remove(N.board.group),N.board.dispose(),m.delete(A),M.chunksDropped++)}function w(S){const v=i.sector(S.u,S.v);if(S.kind==="nav")return;if(S.kind==="cut"){i.prepare(v);return}if(m.has(v.id))return;i.prepare(v);const A=i.chunkView(v),N=Hu(A,{cut:t,chunk:{shared:c,lineMats:l}});N.group.traverse(k=>{(k.isMesh&&!k.isInstancedMesh||k.isLineSegments2)&&(k.frustumCulled=!0)});for(const k of l)k.resolution.set(d.w,d.h);a.add(N.group),m.set(v.id,{board:N,ring:y(v)}),M.chunksBuilt++,s==null||s(v,N)}function E(S=n){const v=performance.now();for(;g.length;){const A=g.shift(),N=performance.now();w(A);const k=performance.now()-N;if(M.buildMs+=k,M.maxItemMs=Math.max(M.maxItemMs,k),performance.now()-v>S)break}M.queued=g.length,M.lastFrameMs=performance.now()-v}function b(S,v){const[A,N]=i.sectorIndexAt(S,v);_&&_[0]===A&&_[1]===N||(_=[A,N],x())}const P=[];return{group:a,hover:h,select:f,lineMats:l,floorMat:p,map:i,stats:M,chunks:m,settle(S,v,A=o){for(b(S,v);g.length&&g[0].level<=A;)w(g.shift());M.queued=g.length},drain(){E(1e9)},pump:E,setRings(S){S=Math.max(1,Math.round(S)),S!==o&&(o=S,_&&x())},get rings(){return o},setFocus(S,v){u.position.set(S,-.05,v),p.uniforms.uFocus.value.set(S,v),b(S,v)},update(S){E();for(const v of m.values())v.board.update(S);h.tick(S),f.tick(S);for(const v of P)v(S)},resize(S,v){d={w:S,h:v};for(const A of l)A.resolution.set(S,v)},get centre(){return _},dispose(){for(const S of m.values())S.board.dispose();m.clear()}}}class Xu{constructor(t){this.a=[],this.cmp=t}get size(){return this.a.length}peek(){return this.a[0]}push(t){const e=this.a,n=this.cmp;let s=e.length;for(e.push(t);s>0;){const r=s-1>>1;if(n(e[s],e[r])>=0)break;[e[s],e[r]]=[e[r],e[s]],s=r}}pop(){const t=this.a,e=this.cmp,n=t[0],s=t.pop();if(t.length){t[0]=s;let r=0;for(;;){const o=2*r+1,a=o+1;let l=r;if(o<t.length&&e(t[o],t[l])<0&&(l=o),a<t.length&&e(t[a],t[l])<0&&(l=a),l===r)break;[t[r],t[l]]=[t[l],t[r]],r=l}}return n}}const Os=(i,t)=>{var e;return(i.cell?i.cell(t):(e=i.cells)==null?void 0:e[t])??null},Bo=(i,t)=>{var e,n;return i.gateLocked?!!i.gateLocked(t):!!((n=(e=i.gates)==null?void 0:e[t])!=null&&n.locked)};function q_(){const i=new Map;let t=0;function e(m,_=!0){let g=i.get(m);return!g&&_&&(g={key:m,bits:new Uint8Array(16),n:0},i.set(m,g)),g}const n=(m,_)=>!!m&&_>>3<m.bits.length&&(m.bits[_>>3]&1<<(_&7))!==0;function s(m,_){const g=_>>3;if(g>=m.bits.length){let M=m.bits.length;for(;M<=g;)M*=2;const y=new Uint8Array(M);y.set(m.bits),m.bits=y}const d=1<<(_&7);return m.bits[g]&d?!1:(m.bits[g]|=d,m.n++,t++,!0)}function r(m){const _=[];if(!m)return _;for(let g=0;g<m.bits.length;g++){const d=m.bits[g];if(d)for(let M=0;M<8;M++)d&1<<M&&_.push(g*8+M)}return _}const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=new Map([...o].map((m,_)=>[m,_]));function l(m){let _="";for(let g=0;g<m.length;g+=3){const d=m[g],M=m[g+1]??0,y=m[g+2]??0;_+=o[d>>2]+o[(d&3)<<4|M>>4]+(g+1<m.length?o[(M&15)<<2|y>>6]:"=")+(g+2<m.length?o[y&63]:"=")}return _}function c(m){const _=Math.floor(m.length*3/4)-(m.endsWith("==")?2:m.endsWith("=")?1:0),g=new Uint8Array(_);let d=0;for(let M=0;M<m.length;M+=4){const y=a.get(m[M]),x=a.get(m[M+1]),w=m[M+2]==="="?0:a.get(m[M+2]),E=m[M+3]==="="?0:a.get(m[M+3]);d<_&&(g[d++]=y<<2|x>>4),d<_&&(g[d++]=(x&15)<<4|w>>2),d<_&&(g[d++]=(w&3)<<6|E)}return g}function u(m=null){const _={};for(const g of[...i.keys()].sort()){const d=i.get(g);let M=d.bits.length;for(;M>0&&d.bits[M-1]===0;)M--;M&&(_[g]=l(d.bits.subarray(0,M)))}return{format:"boundless-fog-memory",version:1,world:m,chunks:_}}function p(m){if(!m||m.format!=="boundless-fog-memory"||m.version!==1||typeof m.chunks!="object")throw new Error("not a fog memory");i.clear();for(const _ of Object.keys(m.chunks).sort()){const g=c(m.chunks[_]),d=Math.max(16,g.length),M={key:_,bits:new Uint8Array(d),n:0};M.bits.set(g);for(let y=0;y<M.bits.length;y++){let x=M.bits[y];for(;x;)M.n+=x&1,x>>=1}i.set(_,M)}return t++,[...i.keys()]}function h(){let m=0,_=0;for(const g of i.values())m+=g.n,_+=g.bits.length;return{chunks:i.size,cells:m,bytes:_}}return{chunk:e,test:n,set:s,locals:r,serialise:u,restore:p,stats:h,clear:()=>{i.clear(),t++},chunks:i,get version(){return t}}}const Oc=1e-5,Yi=32,Qi=i=>Math.round(i*200);function Y_(i,t,e,n,s=null){const r=i.cellAt(t,e);if(!r||s&&s(r))return{start:null,cells:[]};const o=new Map,a=h=>{let f=o.get(h);return f===void 0&&(f=Os(i,h),o.set(h,f)),f},l=new Set([r.id]),c=[],u=[r.id],p=h=>{if(!(!h||l.has(h.id)||Math.hypot(h.cx-t,h.cz-e)>n+(h.radius??3))){if(s&&s(h)){l.add(h.id);return}l.add(h.id),u.push(h.id)}};for(let h=0;h<u.length;h++){const f=a(u[h]);if(!f)continue;c.push(f);for(const _ of f.neighbors)p(a(_.id));const m=f.poly;if(!(!m||m.length<3||!f.neighbors.some(_=>_.mid)))for(let _=0;_<m.length;_++){const g=m[_],d=m[(_+1)%m.length],M=(g[0]+d[0])/2,y=(g[1]+d[1])/2;if(Math.hypot(M-t,y-e)>n+1)continue;const x=d[0]-g[0],w=d[1]-g[1],E=x*x+w*w||1;let b=!1;for(const S of f.neighbors){if(!S.mid)continue;const v=((S.mid[0]-g[0])*x+(S.mid[1]-g[1])*w)/E;if(!(v<-.01||v>1.01)&&Math.hypot(g[0]+v*x-S.mid[0],g[1]+v*w-S.mid[1])<.1){b=!0;break}}if(b)continue;const P=Math.hypot(M-f.cx,y-f.cz)||1;p(i.cellAt(M+(M-f.cx)/P*.25,y+(y-f.cz)/P*.25))}}return{start:r,cells:c}}function $_(i){const t=new Map,e=[];for(const n of i){if(!n.solid||!n.poly||n.poly.length<3)continue;const s=n.poly;for(let r=0;r<s.length;r++){const o=s[r],a=s[(r+1)%s.length],l=`${Qi(o[0])},${Qi(o[1])}`,c=`${Qi(a[0])},${Qi(a[1])}`,u=l<c?`${l}|${c}`:`${c}|${l}`,p=t.get(u);p===void 0?(t.set(u,e.length),e.push([o[0],o[1],a[0],a[1],n.cx,n.cz])):p>=0&&(e[p]=null,t.set(u,-1))}}return e.filter(Boolean)}function j_(i,t,e,n,s){const r=s[2]-s[0],o=s[3]-s[1],a=e*o-n*r;if(Math.abs(a)<1e-12)return 1/0;const l=s[0]-i,c=s[1]-t,u=(l*o-c*r)/a,p=(l*n-c*e)/a;return u>1e-9&&p>=-1e-9&&p<=1+1e-9?u:1/0}function K_(i,t,e,n){const s=e/Math.cos(Math.PI/Yi),r=[];for(const h of n){const f=(h[0]+h[2])/2,m=(h[1]+h[3])/2;if((i-f)*(f-h[4])+(t-m)*(m-h[5])<=0)continue;const _=h[2]-h[0],g=h[3]-h[1],d=_*_+g*g||1,M=Math.max(0,Math.min(1,((i-h[0])*_+(t-h[1])*g)/d));Math.hypot(h[0]+M*_-i,h[1]+M*g-t)<=e+1e-6&&r.push(h)}const o=r.slice();for(let h=0;h<Yi;h++){const f=h/Yi*Math.PI*2,m=(h+1)/Yi*Math.PI*2;o.push([i+s*Math.cos(f),t+s*Math.sin(f),i+s*Math.cos(m),t+s*Math.sin(m)])}const a=[],l=new Set;for(const h of r)for(let f=0;f<4;f+=2){const m=`${Qi(h[f])},${Qi(h[f+1])}`;if(l.has(m))continue;l.add(m);const _=Math.atan2(h[f+1]-t,h[f]-i);a.push(_-Oc,_,_+Oc)}for(let h=0;h<Yi;h++)a.push((h+.5)/Yi*Math.PI*2-Math.PI);a.sort((h,f)=>h-f);const c=[],u=[];let p=-1/0;for(const h of a){if(h-p<1e-9)continue;p=h;const f=Math.cos(h),m=Math.sin(h);let _=1/0;for(const g of o){const d=j_(i,t,f,m,g);d<_&&(_=d)}_<1/0&&(c.push([i+f*_,t+m*_]),u.push(h))}return{pts:c,ang:Float64Array.from(u),ox:i,oz:t}}function Bc(i,t,e){const{pts:n,ang:s,ox:r,oz:o}=i,a=n.length;if(a<3)return!1;const l=Math.atan2(e-o,t-r);let c=0,u=a;for(;c<u;){const _=c+u>>1;s[_]<=l?c=_+1:u=_}const p=(c-1+a)%a,h=(p+1)%a,f=n[p],m=n[h];return(m[0]-f[0])*(e-f[1])-(m[1]-f[1])*(t-f[0])>=-1e-9}function Z_(i){let t=1/0,e=1/0,n=-1/0,s=-1/0;for(const[r,o]of i)r<t&&(t=r),r>n&&(n=r),o<e&&(e=o),o>s&&(s=o);return{x0:t,z0:e,x1:n,z1:s}}function J_(i,t,e){const n=[],s=i.poly??[];if(!i.solid){n.push([i.cx,i.cz]);for(const[o,a]of s)n.push([i.cx+(o-i.cx)*.75,i.cz+(a-i.cz)*.75]);return n}const r=(o,a)=>{const l=Math.hypot(t-o,e-a)||1;return[o+(t-o)/l*.06,a+(e-a)/l*.06]};for(let o=0;o<s.length;o++){const a=s[o],l=s[(o+1)%s.length];n.push(r((a[0]+l[0])/2,(a[1]+l[1])/2),r(a[0],a[1]))}return n}const vn=0,Qn=1,Cr=2,Ps=2,Ls=4194304,Ds=256,Q_={radius:22,moveEps:.5,pingTtl:6,pingMinStrength:.15,maxEvents:2e3,weight:1,falloff:.35,exploreLevel:.04,trackLevels:!1,worldId:void 0,keyOf:void 0,idOf:void 0},tx=i=>i*i*(3-2*i);function ex(i,t={}){const e={...Q_,...t},n=q_();let s=0,r=0;const o=[],a=new Map;let l=0;function c(I){let G=a.get(I);return G||(G={idx:o.length,key:I,ch:n.chunk(I,!1),unloaded:!1,kind:-1,n:0},o.push(G),a.set(I,G)),G}const u=new Map,p=new Map;function h(I){var et;if(e.keyOf){const F=e.keyOf(I)[0];return c(F)}if(I.sector!==void 0&&typeof I.local=="number"){let F=u.get(I.sector);if(!F){const C=(et=i.sectors)==null?void 0:et[I.sector];F=c(C&&typeof C.u=="number"?`${C.u},${C.v}`:`s${I.sector}`),u.set(I.sector,F)}return F}const G=Math.floor(I.id/Ds);let J=p.get(G);return J||(J=c(`k${G}`),p.set(G,J)),J}const f=I=>e.keyOf?e.keyOf(I)[1]:I.sector!==void 0&&typeof I.local=="number"?I.local:(I.id%Ds+Ds)%Ds;let m=new Map,_=-1;function g(I){const G=i.sectors;if(!G)return null;if(G.length!==_){m=new Map;for(const J of G)typeof J.u=="number"&&m.set(`${J.u},${J.v}`,J);_=G.length}return m.get(I)??null}function d(I){if(I.kind===-1){const J=/^k(-?\d+)$/.exec(I.key);J?(I.kind=1,I.n=+J[1]):I.kind=0}if(I.kind===1)return I.n*Ds;const G=g(I.key);return G?G.base:null}function M(I,G){if(e.idOf)return e.idOf(I.key,G);const J=d(I);return J===null?null:J+G}let y=256;const x={id:new Float64Array(y),info:new Int32Array(y),local:new Int32Array(y),flags:new Uint8Array(y),seen:new Uint8Array(y),level:new Uint8Array(y),until:new Float64Array(y),n:0},w=new Map,E=[];let b=0;function P(I){let G=w.get(I.id);if(G===void 0){if(E.length)G=E.pop();else{if(x.n===y){y*=2;const J=(et,F)=>{const C=new et(y);return C.set(F),C};x.id=J(Float64Array,x.id),x.info=J(Int32Array,x.info),x.local=J(Int32Array,x.local),x.flags=J(Uint8Array,x.flags),x.seen=J(Uint8Array,x.seen),x.level=J(Uint8Array,x.level),x.until=J(Float64Array,x.until)}G=x.n++}x.id[G]=I.id,x.info[G]=h(I).idx,x.local[G]=f(I),x.flags[G]=0,x.seen[G]=0,x.level[G]=0,x.until[G]=0,w.set(I.id,G),b++}return G}function S(I){w.delete(x.id[I]),x.id[I]=NaN,x.seen[I]=0,x.flags[I]=0,x.level[I]=0,x.until[I]=0,E.push(I),b--}const v=I=>{const G=o[x.info[I]].ch;return!!G&&n.test(G,x.local[I])},A=I=>x.seen[I]>0?Cr:v(I)||x.flags[I]&Ps&&x.until[I]>s?Qn:vn,N=I=>x.info[I]*Ls+x.local[I],k=(I,G)=>{const J=w.get(I);if(J!==void 0)return A(J);const et=o[Math.floor(G/Ls)];return et.ch&&n.test(et.ch,G-et.idx*Ls)?Qn:vn},$=new Map,Q=new Map;let K=[];const O=(I,G)=>{K.push({type:I,...G}),K.length>e.maxEvents&&(K=K.slice(-Math.floor(e.maxEvents*.75)))},H=new Map,ot=new Xu((I,G)=>I.until-G.until),st={updates:0,recomputes:0,cellsRead:0,lastMs:0},vt=I=>{let G=0;for(const J of H.values()){const et=J.cells.get(I);et!==void 0&&et>G&&(G=et)}return G};function St(I){const G=x.seen[I]>0?vt(I):0;e.trackLevels&&G>>4!==x.level[I]>>4&&Q.set(x.id[I],N(I)),x.level[I]=G}function Pt(I){x.seen[I]===0&&!(x.flags[I]&Ps)&&S(I)}const lt=()=>Math.max(1,Math.ceil(e.exploreLevel*255));function Mt(I){const G=l?D=>h(D).unloaded:null,{cells:J,start:et}=Y_(i,I.x,I.z,I.radius,G);st.recomputes++,st.cellsRead+=J.length;const F=new Map;let C=null;if(et&&!et.solid){C=K_(I.x,I.z,I.radius,$_(J));const D=Z_(C.pts),tt=I.radius,q=Math.max(1e-6,e.falloff*tt),Z=lt();for(const ft of J){const ct=Math.hypot(ft.cx-I.x,ft.cz-I.z);if(ct>tt+(ft.radius??3)+1)continue;const At=Math.max(1,typeof e.weight=="function"?e.weight(ft,I):e.weight),zt=Math.min(1,Math.max(0,(tt-Math.max(0,ct-.5*(ft.radius??3))*At)/q)),Wt=Math.round(255*tx(zt));if(Wt<Z)continue;let Ht=!1;for(const[ce,pe]of J_(ft,I.x,I.z))if(!(ce<D.x0||ce>D.x1||pe<D.z0||pe>D.z1)&&Bc(C,ce,pe)){Ht=!0;break}Ht&&F.set(P(ft),Wt)}I.box=D}else I.box=null,et&&F.set(P(et),255);const X=[];for(const D of F.keys()){if(I.cells.has(D))continue;const tt=A(D);x.seen[D]++,tt!==Cr&&$.set(x.id[D],N(D));const q=o[x.info[D]];q.ch||(q.ch=n.chunk(q.key)),n.set(q.ch,x.local[D])&&X.push(x.id[D])}const nt=[];for(const D of I.cells.keys())F.has(D)||(x.seen[D]--,x.seen[D]===0&&$.set(x.id[D],N(D)),nt.push(D));I.cells=F;for(const D of F.keys())St(D);for(const D of nt)St(D),Pt(D);I.poly=C,I.ax=I.x,I.az=I.z,r++,X.length&&O("revealed",{t:s,cells:X,by:I.id,source:"vision"})}function Tt(I,G=s){const J=performance.now();s=G,st.updates++;let et=0;const F=K.length,C=new Set;for(const nt of I){C.add(nt.id);const D=nt.radius??e.radius;let tt=H.get(nt.id);tt||(tt={id:nt.id,x:nt.x,z:nt.z,radius:D,cells:new Map,poly:null,box:null,ax:NaN,az:NaN},H.set(nt.id,tt)),tt.x=nt.x,tt.z=nt.z,D!==tt.radius&&(tt.radius=D,tt.ax=NaN),Math.hypot(tt.x-tt.ax,tt.z-tt.az)<e.moveEps||(Mt(tt),et++)}for(const[nt,D]of H)if(!C.has(nt)){H.delete(nt);for(const tt of D.cells.keys())x.seen[tt]--,x.seen[tt]===0&&$.set(x.id[tt],N(tt)),St(tt),Pt(tt);r++}V(G),st.lastMs=performance.now()-J;let X=0;for(let nt=F;nt<K.length;nt++)K[nt].type==="revealed"&&(X+=K[nt].cells.length);return{recomputed:et,revealed:X}}function pt(I,{ttl:G=e.pingTtl,t:J=s}={}){const et=[];for(const F of I){const C=Os(i,F);if(!C||l&&h(C).unloaded)continue;const X=P(C),nt=A(X);x.flags[X]|=Ps;const D=J+G;D>x.until[X]&&(x.until[X]=D,ot.push({until:D,i:X,id:F})),nt===vn&&($.set(F,N(X)),et.push(F))}return et.length&&(r++,O("revealed",{t:J,cells:et,by:"scan",source:"scan"})),et.length}function Ct(I,G={}){const J=G.minStrength??e.pingMinStrength,et=[];for(const F of I)F.type==="cell-reached"&&!F.dead&&F.strength>=J&&!(F.generation>0)&&et.push(F.cell);return et.length?pt(et,{ttl:G.ttl,t:s}):0}function V(I=s){for(s=I;ot.size&&ot.peek().until<=I;){const{until:G,i:J,id:et}=ot.pop();x.id[J]!==et||x.until[J]>G||!(x.flags[J]&Ps)||(x.flags[J]&=~Ps,A(J)===vn&&($.set(et,N(J)),r++),Pt(J))}}const gt=I=>{const G=w.get(I.id);if(G!==void 0)return A(G);const J=h(I);return J.ch&&n.test(J.ch,f(I))?Qn:vn};function mt(I){const G=w.get(I);if(G!==void 0)return A(G);const J=Os(i,I);return J?gt(J):vn}function Et(I){const G=Os(i,I);if(!G)return!1;const J=h(G);return!!J.ch&&n.test(J.ch,f(G))}const Ut=I=>{const G=w.get(I);return G===void 0?0:x.level[G]};function Y(I,G){const J=a.get(I);if(!J||!J.ch||!n.test(J.ch,G))return vn;if(!J.unloaded){const et=M(J,G),F=et===null?void 0:w.get(et);if(F!==void 0&&x.seen[F]>0)return Cr}return Qn}const Yt=(I,G)=>{const J=a.get(I);return!!J&&!!J.ch&&n.test(J.ch,G)},wt=I=>[h(I).key,f(I)];function xt(I,G){for(const J of H.values())if(!(!J.box||I<J.box.x0||I>J.box.x1||G<J.box.z0||G>J.box.z1)&&J.poly&&Bc(J.poly,I,G))return!0;return!1}function yt(I,G,J="dynamic"){if(J==="dynamic")return xt(I,G);const et=i.cellAt(I,G);if(!et)return!1;if(J==="static"){const F=h(et);return!!F.ch&&n.test(F.ch,f(et))}return gt(et)>=Qn}function Nt(I){const G=[];for(const et of I){const F=c(et);F.unloaded||(F.unloaded=!0,l++,G.push(et))}if(!G.length)return 0;const J=new Set(G.map(et=>a.get(et).idx));for(let et=0;et<x.n;et++)if(!(x.id[et]!==x.id[et]||!J.has(x.info[et]))){for(const F of H.values())F.cells.delete(et);S(et)}for(const et of H.values())et.ax=NaN;return r++,O("unloaded",{t:s,keys:G}),G.length}function Dt(I){const G=[];for(const J of I){const et=a.get(J);if(!(!et||!et.unloaded)&&(et.unloaded=!1,l--,G.push(J),!!et.ch))for(const F of n.locals(et.ch)){const C=M(et,F);C!==null&&$.set(C,et.idx*Ls+F)}}if(!G.length)return 0;for(const J of H.values())J.ax=NaN;return r++,O("loaded",{t:s,keys:G}),G.length}const z=I=>{const G=a.get(I);return!G||!G.unloaded},R=()=>e.worldId??i.seed??null;function T(){return n.serialise(R())}function U(I,{ignoreWorld:G=!1}={}){const J=typeof I=="string"?JSON.parse(I):I,et=R();if(!G&&et!==null&&J&&J.world!==null&&J.world!==void 0&&J.world!==et)throw new Error(`fog memory is for world ${J.world}, not ${et}`);n.restore(J);for(const F of n.chunks.keys())c(F);for(const F of o)F.ch=n.chunk(F.key,!1),F.unloaded=!1;l=0;for(const F of w.values())x.id[F]=NaN;w.clear(),E.length=0,x.n=0,b=0;for(const F of H.values())F.cells=new Map,F.poly=null,F.box=null,F.ax=NaN;return $.clear(),Q.clear(),r++,O("restored",{t:s,chunks:n.stats().chunks,cells:n.stats().cells}),n.stats()}function W(){V(s);let I=0;for(const X of o)X.ch&&!X.unloaded&&(I+=X.ch.n);const G=b+I,J=new Float64Array(G),et=new Uint8Array(G),F=new Uint8Array(G);let C=0;for(let X=0;X<x.n;X++)x.id[X]===x.id[X]&&(J[C]=x.id[X],et[C]=A(X),F[C]=x.level[X],C++);for(const X of o)if(!(!X.ch||X.unloaded))for(const nt of n.locals(X.ch)){const D=M(X,nt);D===null||w.has(D)||(J[C]=D,et[C]=Qn,C++)}return{t:s,version:r,count:C,cell:C===G?J:J.slice(0,C),state:C===G?et:et.slice(0,C),level:C===G?F:F.slice(0,C)}}function B(){V(s);const I=new Float64Array($.size),G=new Uint8Array($.size),J=new Uint8Array($.size);let et=0;for(const[F,C]of $){if(o[Math.floor(C/Ls)].unloaded)continue;const X=w.get(F);I[et]=F,G[et]=k(F,C),J[et]=X===void 0?0:x.level[X],et++}return $.clear(),{count:et,cell:et===I.length?I:I.slice(0,et),state:et===I.length?G:G.slice(0,et),level:et===I.length?J:J.slice(0,et)}}function _t(){const I=Q.size,G=new Float64Array(I),J=new Uint8Array(I);let et=0;for(const F of Q.keys()){const C=w.get(F);G[et]=F,J[et]=C===void 0?0:x.level[C],et++}return Q.clear(),{count:I,cell:G,level:J}}function at(){const I=[];for(const G of o){if(!G.ch||!G.ch.n)continue;const J=n.locals(G.ch);!G.unloaded&&M(G,J[0])!==null||I.push({key:G.key,count:J.length,locals:Int32Array.from(J)})}return I}function dt(I){const G=H.get(I);if(!G||!G.poly)return new Float32Array(0);const J=new Float32Array(G.poly.pts.length*2);return G.poly.pts.forEach(([et,F],C)=>{J[2*C]=et,J[2*C+1]=F}),J}return{update:Tt,remember:pt,noteScanEvents:Ct,tick:V,visibility:mt,isExplored:Et,canSee:xt,canShow:yt,snapshot:W,drainChanges:B,vision:dt,drainEvents:()=>{const I=K;return K=[],I},levelAt:Ut,drainLevels:_t,visibilityKey:Y,isExploredKey:Yt,keyOfCell:wt,unload:Nt,load:Dt,isLoaded:z,ghosts:at,serialise:T,serialize:T,restore:U,get version(){return r},get time(){return s},get memory(){return{...n.stats(),active:b}},get stats(){return{...st,tracked:b,viewers:H.size,explored:n.stats().cells}},config:e,UNSEEN:vn,REMEMBERED:Qn,VISIBLE:Cr}}const ve=2,Qt=512,Zn=.42,nx=.62,kc=32,ix=i=>i*i*(3-2*i),_n=i=>(i%Qt+Qt)%Qt;function bx({map:i,options:t={},stage:e=null}){const n={radius:t.radius??nn.sightRadius,up:nn.revealRate,down:(1-Zn)/nn.ghostFade,hold:1.8,bump:0},s=ex(i,{moveEps:nn.revealStep,falloff:nn.sightSoft,...t,radius:n.radius}),r=O=>i.cell?i.cell(O):i.cells[O],o=new Float32Array(Qt*Qt),a=new Float32Array(Qt*Qt),l=new Float32Array(Qt*Qt),c=new Float32Array(Qt*Qt),u=new Uint8Array(Qt*Qt),p=new Ru(u,Qt,Qt,qr,En);p.magFilter=p.minFilter=hn,p.wrapS=p.wrapT=Br,p.generateMipmaps=!1,p.needsUpdate=!0;let h=0,f=0,m=!1,_=!0;const g=[],d=new Map;let M=-1,y=0;const x={rasters:0,texelsRastered:0,easeTexels:0,slides:0,refilled:0,lastMs:0,maxUp:0,maxDown:0};function w(O,H,ot){const st=O.length?Array.isArray(O[0])?O.length:O.length/2:0;if(st<3)return;const vt=!Array.isArray(O[0]),St=new Float64Array(st),Pt=new Float64Array(st);let lt=1/0,Mt=-1/0;for(let V=0;V<st;V++)St[V]=(vt?O[2*V]:O[V][0])*ve,Pt[V]=(vt?O[2*V+1]:O[V][1])*ve,Pt[V]<lt&&(lt=Pt[V]),Pt[V]>Mt&&(Mt=Pt[V]);let Tt=Math.floor(lt),pt=Math.ceil(Mt);ot&&(Tt=Math.max(Tt,ot.z0),pt=Math.min(pt,ot.z1-1));const Ct=[];for(let V=Tt;V<=pt;V++){const gt=V+.5;Ct.length=0;for(let mt=0,Et=st-1;mt<st;Et=mt++)Pt[mt]>gt!=Pt[Et]>gt&&Ct.push(St[mt]+(gt-Pt[mt])*(St[Et]-St[mt])/(Pt[Et]-Pt[mt]));Ct.sort((mt,Et)=>mt-Et);for(let mt=0;mt+1<Ct.length;mt+=2){let Et=Math.ceil(Ct[mt]-.5),Ut=Math.floor(Ct[mt+1]-.5);ot&&(Et=Math.max(Et,ot.x0),Ut=Math.min(Ut,ot.x1-1));const Y=_n(V)*Qt;for(let Yt=Et;Yt<=Ut;Yt++)H(Y+_n(Yt),(Yt+.5)/ve,gt/ve)}}}const E=(O,H=2)=>{let ot=1/0,st=1/0,vt=-1/0,St=-1/0;for(let Pt=0;Pt<O.length;Pt+=2)O[Pt]<ot&&(ot=O[Pt]),O[Pt]>vt&&(vt=O[Pt]),O[Pt+1]<st&&(st=O[Pt+1]),O[Pt+1]>St&&(St=O[Pt+1]);return{x0:Math.floor(ot*ve)-H,z0:Math.floor(st*ve)-H,x1:Math.ceil(vt*ve)+H,z1:Math.ceil(St*ve)+H}},b=(O,H)=>O?H?{x0:Math.min(O.x0,H.x0),z0:Math.min(O.z0,H.z0),x1:Math.max(O.x1,H.x1),z1:Math.max(O.z1,H.z1)}:O:H,P=O=>{g.push({...O,until:y+n.hold})};function S(O){for(let H=O.z0;H<O.z1;H++){const ot=_n(H)*Qt;for(let st=O.x0;st<O.x1;st++){const vt=ot+_n(st);o[vt]=a[vt]=l[vt]=c[vt]=0,u[vt]=0}}}function v(O){const H=s.snapshot();let ot=0;for(let st=0;st<H.count;st++){if(H.state[st]===vn)continue;const vt=r(H.cell[st]);if(!vt)continue;const St=vt.poly;let Pt=1/0,lt=1/0,Mt=-1/0,Tt=-1/0;for(const pt of St)pt[0]<Pt&&(Pt=pt[0]),pt[0]>Mt&&(Mt=pt[0]),pt[1]<lt&&(lt=pt[1]),pt[1]>Tt&&(Tt=pt[1]);for(const pt of O)Mt*ve<pt.x0||Pt*ve>pt.x1||Tt*ve<pt.z0||lt*ve>pt.z1||(w(St,Ct=>{a[Ct]<Zn&&(a[Ct]=Zn,c[Ct]=Zn,u[Ct]=Math.round(Zn*255))},pt),ot++)}x.refilled+=ot}function A(O,H){const ot=Math.floor(O*ve)-Qt/2,st=Math.floor(H*ve)-Qt/2;if(m&&Math.abs(ot-h)<kc&&Math.abs(st-f)<kc)return!1;const vt=[];!m||Math.abs(ot-h)>=Qt||Math.abs(st-f)>=Qt?vt.push({x0:ot,z0:st,x1:ot+Qt,z1:st+Qt}):(ot>h?vt.push({x0:h+Qt,z0:st,x1:ot+Qt,z1:st+Qt}):ot<h&&vt.push({x0:ot,z0:st,x1:h,z1:st+Qt}),st>f?vt.push({x0:ot,z0:f+Qt,x1:ot+Qt,z1:st+Qt}):st<f&&vt.push({x0:ot,z0:st,x1:ot+Qt,z1:f}));for(const St of vt)S(St);return h=ot,f=st,m=!0,v(vt),x.slides++,p.needsUpdate=!0,!0}function N(O){const H=performance.now();let ot=null;for(const st of O){const vt=s.vision(st.id),St=vt.length?E(vt):null,Pt=d.get(st.id)??null;ot=b(ot,b(St,Pt)),d.set(st.id,St),st.pts=vt}for(const st of[...d.keys()])O.some(vt=>vt.id===st)||(ot=b(ot,d.get(st)),d.delete(st));if(ot){for(let st=ot.z0;st<ot.z1;st++){const vt=_n(st)*Qt;for(let St=ot.x0;St<ot.x1;St++)o[vt+_n(St)]=0}for(const st of O){if(!st.pts.length)continue;const vt=st.radius??s.config.radius,St=Math.max(1e-6,s.config.falloff*vt);let Pt=0;w(st.pts,(lt,Mt,Tt)=>{const pt=Math.hypot(Mt-st.x,Tt-st.z),Ct=ix(Math.min(1,Math.max(0,(vt-pt)/St)));Ct>o[lt]&&(o[lt]=Ct);const V=Ct<Zn?Ct:Zn;V>a[lt]&&(a[lt]=V),Pt++},ot),x.texelsRastered+=Pt}x.rasters++,P(ot),x.lastRaster=performance.now()-H}}function k(){const O=s.drainChanges();for(let H=0;H<O.count;H++){const ot=r(O.cell[H]);if(!ot)continue;const st=O.state[H]===Qn&&!s.isExplored(O.cell[H]),vt=O.state[H]===vn;if(!st&&!vt)continue;const St=st?nx:0;let Pt=1/0,lt=1/0,Mt=-1/0,Tt=-1/0;for(const pt of ot.poly)pt[0]<Pt&&(Pt=pt[0]),pt[0]>Mt&&(Mt=pt[0]),pt[1]<lt&&(lt=pt[1]),pt[1]>Tt&&(Tt=pt[1]);w(ot.poly,pt=>{l[pt]=St}),P({x0:Math.floor(Pt*ve)-1,z0:Math.floor(lt*ve)-1,x1:Math.ceil(Mt*ve)+1,z1:Math.ceil(Tt*ve)+1})}}function $(O){let H=null;for(let lt=g.length-1;lt>=0;lt--)g[lt].until<y?g.splice(lt,1):H=b(H,g[lt]);if(!H)return;const ot=n.up*O,st=n.down*O;let vt=0,St=0,Pt=0;for(let lt=H.z0;lt<H.z1;lt++){const Mt=_n(lt)*Qt;for(let Tt=H.x0;Tt<H.x1;Tt++){const pt=Mt+_n(Tt);let Ct=o[pt];a[pt]>Ct&&(Ct=a[pt]),l[pt]>Ct&&(Ct=l[pt]);const V=c[pt];if(Ct===V)continue;const gt=Ct>V?Math.min(Ct,V+ot):Math.max(Ct,V-st);c[pt]=gt;const mt=Math.round(gt*255);mt!==u[pt]&&(u[pt]=mt,vt++),gt>V?gt-V>St&&(St=gt-V):V-gt>Pt&&(Pt=V-gt)}}x.easeTexels=(H.x1-H.x0)*(H.z1-H.z0),x.maxUp=St,x.maxDown=Pt,vt&&(p.needsUpdate=!0)}const Q={fog:s,mask:p,stats:x,get enabled(){return _},setEnabled(O){_=!!O,K==null||K.setEnabled(_)},configure(O={}){return O.sightRadius!==void 0&&O.sightRadius!==n.radius&&(n.radius=O.sightRadius,s.config.radius=O.sightRadius),O.sightSoft!==void 0&&O.sightSoft!==s.config.falloff&&(s.config.falloff=O.sightSoft,n.bump++),O.revealStep!==void 0&&(s.config.moveEps=O.revealStep),O.revealRate!==void 0&&(n.up=O.revealRate),O.ghostFade!==void 0&&(n.down=(1-Zn)/Math.max(.05,O.ghostFade),n.hold=Math.max(1.8,O.ghostFade*1.4+.5)),{...n}},get tuning(){return{...n,falloff:s.config.falloff,moveEps:s.config.moveEps}},update(O,H,ot=1/60){O=O.map(St=>({...St,radius:(St.radius??n.radius)+n.bump*1e-5}));const st=performance.now();if(y+=ot,x.maxUp=x.maxDown=0,!O.length)return;const vt=A(O[0].x,O[0].z);s.update(O,H),(vt||s.version!==M)&&(N(O.map(St=>({...St}))),M=s.version),k(),$(ot),K==null||K.setWindow(h,f),x.lastMs=performance.now()-st,x.sightMs=s.stats.lastMs},settle(){for(let O=0;O<c.length;O++){const H=Math.max(o[O],a[O],l[O]);c[O]=H,u[O]=Math.round(H*255)}g.length=0,p.needsUpdate=!0},noteScan(O){return O.length?s.noteScanEvents(O):0},level(O,H){const ot=Math.floor(O*ve),st=Math.floor(H*ve);return ot<h||ot>=h+Qt||st<f||st>=f+Qt?0:c[_n(st)*Qt+_n(ot)]},shows(O,H,ot="dynamic"){const st=Q.level(O,H);return ot==="dynamic"?st>.5:st>.05},canShow:(O,H,ot="dynamic")=>s.canShow(O,H,ot),dispose(){p.dispose()}};let K=null;return e!=null&&e.fogPass&&(K=e.fogPass,K.setMask(p)),Q}const Gc={ping:{start:.4,build:1.6,hold:1,burn:2.2},sweep:{start:.3,build:5,hold:3,burn:5},echo:{start:.7,build:.5,hold:0,burn:2.6}},Hc={ping:{speed:14,power:1,env:"ping"},sweep:{speed:9,power:1,env:"sweep"}},_i={active:{power:1,clarity:1,loudness:1,glimpseRadius:0},passive:{power:.45,clarity:.6,loudness:.2,glimpseRadius:2}},Vc={default:300,device:150,adversary:355,decoy:45,unknown:300},Gs={echo:{reveal:"on-arrival",playback:1,traceFloor:.05,scrambleJitter:1.2},floor:.03,hearFloor:.04,maxCells:2500,maxEchoes:16,maxGeneration:2,maxTime:1/0,maxWorkPerAdvance:2e4,echoKeep:64,lookahead:0,maxEvents:4e3,maskMaxCells:400,scrambleHops:3,ringRise:.5,ringTau:2.2},qu=i=>i<=0?0:i>=1?1:i*i*(3-2*i);function Is(i,t){return t<0?0:t<i.build?i.start+(1-i.start)*qu(t/i.build):t<i.build+i.hold?1:Math.exp(-(t-i.build-i.hold)/i.burn)}function sx(i,t,e){return t>e?i.build+i.hold+i.burn*Math.log(t/e):t*i.start>=e?i.build:0}function Nr(i,t,e=Gs){if(t<0)return 0;const n=e.ringRise>0?qu(t/e.ringRise):1;return i*n*Math.exp(-Math.max(0,t-e.ringRise)/e.ringTau)}const Wc=(i,t,e)=>{let n=0,s=t;for(;n<s;){const r=n+s>>1;i[r]<e?n=r+1:s=r}return n};function rx(i,t,e=Gs){const n=e.ringRise+e.ringTau*Math.log(300);return[Wc(i.arrival,i.count,t-n),Wc(i.arrival,i.count,t+1e-9)]}function ox(i,t,e,n=Gs){const[s,r]=rx(i,t,n);for(let o=s;o<r;o++)e[o]=Nr(i.strength[o],t-i.arrival[o],n);return[s,r]}function Ki(i,t){return i==="absorb"?Math.pow(t,1.4):i==="scramble"?.5*t:.3*t}function $i(i,...t){let e=2166136261^i>>>0;const n=t.join("|");for(let s=0;s<n.length;s++)e^=n.charCodeAt(s),e=Math.imul(e,16777619);return e^=e>>>15,e=Math.imul(e,739982445),e^=e>>>12,e=Math.imul(e,695872825),e^=e>>>15,(e>>>0)/4294967296}const ji=(i,t,e)=>i<t?t:i>e?e:i,Xc=Object.freeze({transmission:1,scramble:null,spoofs:[],masks:[]});function ax({nav:i,getCell:t,cfg:e,now:n}){const s=new Map,r=new Map;let o=0;function a(f,m){if(m<f.createdAt||m>=f.expiresAt)return 0;const _=f.expiresAt-m;return _>=f.fade?f.opacity:f.opacity*(_/f.fade)}function l(f){if(f==null)return null;if(typeof f=="object"){const _=i.cellAt(f.x,f.z);return _?{id:_.id,x:f.x,z:f.z}:null}const m=t(f);return m?{id:m.id,x:m.cx,z:m.cz}:null}function c(f){const m=l(f.center);if(!m)return[];const _=f.radius??12,g=f.shape??"disc",d=f.heading??0,M=(f.arc??Math.PI/2)/2,y=b=>{const P=b.cx-m.x,S=b.cz-m.z,v=Math.hypot(P,S);if(v>_)return!1;if(g==="ring")return v>=_*.55;if(g==="cone"){if(v<1e-9)return!0;let A=Math.atan2(S,P)-d;return A=Math.atan2(Math.sin(A),Math.cos(A)),Math.abs(A)<=M}return!0},x=[],w=new Set([m.id]),E=[m.id];for(let b=0;b<E.length;b++){const P=t(E[b]);if(!(!P||P.solid)){if(y(P)&&x.push(P.id),x.length>=e.maskMaxCells)break;for(const S of P.neighbors){if(w.has(S.id))continue;const v=t(S.id);!v||v.solid||Math.hypot(v.cx-m.x,v.cz-m.z)>_+6||(w.add(S.id),E.push(S.id))}}}return x}function u(f={},m=n()){var E,b,P,S,v;const _=f.mode??"absorb";if(!["absorb","scramble","spoof"].includes(_))throw new Error(`unknown mask mode ${_}`);const g=f.cells?[...f.cells]:c(f),d=[];for(const A of g){const N=t(A);N&&!N.solid&&d.push(N.id)}if(!d.length)return null;let M=d[0];const y=f.center!=null?l(f.center):null;if(y){let A=1/0;for(const N of d){const k=t(N),$=Math.hypot(k.cx-y.x,k.cz-y.z);$<A&&(A=$,M=N)}}const x=f.duration??8,w={id:`mask-${++o}`,mode:_,opacity:Math.min(1,Math.max(0,f.opacity??.8)),createdAt:m,expiresAt:m+x,duration:x,fade:Math.min(x,f.fade??Math.min(1.5,x*.25)),shape:f.shape??(f.cells?"cells":"disc"),center:y?{x:y.x,z:y.z}:null,radius:f.radius??null,cells:new Set(d),anchor:M,owner:f.owner??null,spoof:_==="spoof"?{id:((E=f.spoof)==null?void 0:E.id)??`spoof-${o}`,kind:((b=f.spoof)==null?void 0:b.kind)??"device",signature:((P=f.spoof)==null?void 0:P.signature)??.8,strengthResponse:((S=f.spoof)==null?void 0:S.strengthResponse)??1,cell:((v=f.spoof)==null?void 0:v.cell)??M}:null};s.set(w.id,w);for(const A of w.cells){const N=r.get(A);N?N.push(w):r.set(A,[w])}return w}function p(f){s.delete(f.id);for(const m of f.cells){const _=r.get(m);if(!_)continue;const g=_.indexOf(f);g>=0&&_.splice(g,1),_.length||r.delete(m)}}function h(f,m){const _=r.get(f);if(!_)return Xc;let g=1,d=null,M=0,y=null,x=null;for(const w of _){const E=a(w,m);E<=0||((x??(x=[])).push(w),w.mode==="absorb"?g*=1-E:w.mode==="scramble"?(g*=1-.1*E,E>M&&(M=E,d=w)):(y??(y=[])).push(w))}return x?{transmission:g,scramble:d,scrambleOpacity:M,spoofs:y??[],masks:x}:Xc}return{create:u,remove:p,effects:h,opacityAt:a,get:f=>s.get(f)??null,all:()=>[...s.values()],isMasked:(f,m=n())=>h(f,m).masks.length>0,tell:(f,m=n())=>Ki(f.mode,a(f,m))}}const Zi=(i,t)=>typeof i=="number"&&typeof t=="number"?i-t:String(i)<String(t)?-1:String(i)>String(t)?1:0,lx=(i,t)=>i.t-t.t||i.k-t.k||i.w-t.w||Zi(i.c,t.c)||t.m-i.m||i.seq-t.seq,qc=Object.freeze({transmission:1,scramble:null,scrambleOpacity:0,spoofs:[],masks:[]});function cx(i,t={}){const e={...Gs,...t,echo:{...Gs.echo,...t.echo??{}}};e.echo.reveal!=="on-arrival"&&e.echo.reveal!=="live"&&(e.echo.reveal="on-arrival");const n=t.seed??1,s=t.sources??(()=>null);let r=0,o=0;const a=new Map,l=T=>{let U=a.get(T);return U===void 0&&(U=Os(i,T),a.set(T,U)),U},c={cells:0,pops:0,pushes:0,sourceCalls:0,echoes:0,heard:0,navCells:0,droppedEvents:0,notices:0},u=new Xu(lx),p=[],h=[],f=new Map;let m=[],_=0,g=0;const d=new Map,M=[],y=[];let x=0,w=1024;const E={n:0,version:0,cell:new Float64Array(w),arrival:new Float64Array(w),strength:new Float32Array(w),gen:new Uint8Array(w),wave:new Int32Array(w),speed:new Float32Array(w),flags:new Uint8Array(w)},b=new Map;function P(){w*=2;for(const[T,U]of[["cell",Float64Array],["arrival",Float64Array],["strength",Float32Array],["gen",Uint8Array],["wave",Int32Array],["speed",Float32Array],["flags",Uint8Array]]){const W=new U(w);W.set(E[T]),E[T]=W}}function S(T,U,W,B,_t,at){E.n===w&&P();const dt=E.n++;E.cell[dt]=typeof U=="number"?U:NaN,E.arrival[dt]=W,E.strength[dt]=B,E.gen[dt]=T.gen,E.wave[dt]=T.id,E.speed[dt]=T.speed,E.flags[dt]=(_t?1:0)|(at?2:0);const bt=b.get(U);return bt?bt.push(dt):b.set(U,[dt]),E.version++,dt}const v=(T=3)=>e.ringRise+e.ringTau*Math.log(Math.max(1.0001,T/.01)),A=ax({nav:i,getCell:l,cfg:e,now:()=>r});function N(T,U,W=!1){if(m.push(W?{type:T,...U,hidden:!0}:{type:T,...U}),m.length>e.maxEvents){const B=[];let _t=m.length-Math.floor(e.maxEvents*.75);for(const at of m)_t>0&&at.type==="cell-reached"?(_t--,c.droppedEvents++):B.push(at);m=B}}function k(T,U){const W=U.env,B={id:p.length+1,pingId:T.id,gen:U.gen,parent:U.parent??null,origin:U.origin,t0:U.t0,power:U.power,env:W,speed:T.speed,sourceId:U.sourceId??`ping:${T.id}`,claim:U.claim??null,life:sx(W,U.power,e.floor),settled:new Map,best:new Map,touched:new Set,heardBy:new Set,pending:0,cells:0,burned:!1,cut:null,done:!1,cancelled:!1,wanted:null};if(U.gen>0){B.wanted=new Set(["origin"]);for(const _t of f.values())for(const at of _t)B.wanted.add(at.id);M.push(B)}return p.push(B),_++,$(B,U.t0,U.origin,1,!0),B}function $(T,U,W,B,_t){u.push({t:U,k:1,w:T.id,c:W,m:B,o:_t,seq:++o}),T.pending++,c.pushes++}function Q(T,U){if(T.done)return;T.done=!0;const W=d.get(T.id);W&&(W.endT=U),_--,N("wave-exhausted",{t:U,waveId:T.id,pingId:T.pingId,generation:T.gen,sourceId:T.sourceId,cells:T.cells,reason:T.cut??(T.burned?"burnout":"frontier-empty")},T.gen>0)}function K(T,U,W){const B=[];let _t=T;for(let at=0;at<U;at++){const dt=l(_t),bt=[];for(const I of dt.neighbors){if(I.gate!==void 0&&Bo(i,I.gate))continue;const G=l(I.id);G&&!G.solid&&bt.push(I.id)}if(!bt.length)break;bt.sort(Zi),_t=bt[Math.floor($i(n,"walk",W,at)*bt.length)],B.push(_t)}return B}function O(T,U,W,B,_t,at,dt,bt,I=1){const G=ji(B.signature??.7,0,1),J=ji(B.strengthResponse??1,0,3),et=_t*J*G*dt.transmission;if(U.echoed.has(B.id))return;let F=null;U.echoes>=e.maxEchoes?F="echo-cap":U.cells>=e.maxCells?F="budget-cells":et<e.floor&&(F=dt.transmission<.5?"masked":"too-faint");const C={t:at,waveId:T.id,pingId:U.id,cell:W,id:B.id,kind:B.kind??"unknown",strength:_t,echoStrength:F?0:et,echo:!F,reason:F,spoofed:!!bt};if(N("identifier-hit",C,!0),F)return;U.echoed.add(B.id),U.echoes++,c.echoes++;let X=W,nt=G,D=1,tt=!1,q=null;if(dt.scramble&&!bt){const Wt=dt.scrambleOpacity,Ht=`${T.id}:${B.id}:${dt.scramble.id}`,ce=ji(1+Math.round(Wt*(e.scrambleHops-1)*(.4+.6*$i(n,"hops",Ht))),1,e.scrambleHops);q=K(W,ce,Ht),(!q.length||q[q.length-1]===W)&&(q=K(W,1,`${Ht}:b`)),X=q.length?q[q.length-1]:W,nt=ji(G+($i(n,"sig",T.id,B.id)-.5)*1.6*Wt,0,1),D=ji(1-.9*Wt,0,1),tt=!0}let Z=I<1?Ki("absorb",1-I):0;for(const Wt of dt.masks)Z=Math.max(Z,Ki(Wt.mode,A.opacityAt(Wt,at)));bt&&(Z=Math.max(Z,Ki("spoof",.8)));const ft=B.kind??"unknown",ct={echoId:++g,id:B.id,kind:ft,hue:B.hue??Vc[ft]??Vc.default,signature:nt,quality:D,garbled:tt,spoofed:!!bt,reorder:tt?1-D:0,trueCell:W,trueSignature:G,level:Z},At=k(U,{gen:T.gen+1,parent:T.id,origin:X,t0:at,power:et,env:Gc.echo,sourceId:B.id,claim:ct}),zt={sourceId:ct.id,kind:ct.kind,cell:X,emitTime:at,pingId:U.id,returnTime:null,endT:null,wave:At,claim:ct,e0:et,truth:{cell:W,garbled:ct.garbled,spoofed:ct.spoofed}};d.set(At.id,zt),N("echo-started",{t:at,waveId:At.id,parent:T.id,pingId:U.id,generation:At.gen,id:B.id,kind:ct.kind,cell:X,trueCell:W,strength:et,garbled:tt,spoofed:!!bt},!0)}const H=T=>T<=0?0:T>=1?1:T*T*(3-2*T);function ot(T,U,W,B,_t){const at=T.speed,dt=e.echo.playback,bt=(W.t-T.t0)*at,I=Math.max(W.carry,1e-9),G=[];let J=!1;for(const[X,nt]of T.settled){if(nt.dead||nt.t>W.t+1e-9)continue;const D=B*Math.min(1,I/Math.max(nt.carry,1e-9));if(D<e.echo.traceFloor&&nt!==W){J=!0;continue}G.push({id:X,dist:(nt.t-T.t0)*at,q:Math.min(1.5,D)})}G.sort((X,nt)=>nt.dist-X.dist||Zi(X.id,nt.id));const et=G.length,F={hue:U.hue,kind:U.kind,sourceId:U.id,clarity:B,speed:at,rate:dt,R:bt,latchTime:_t,count:et,cut:J,sourceCell:T.origin,cell:new Float64Array(et),dist:new Float32Array(et),arrival:new Float64Array(et),strength:new Float32Array(et),endTime:_t},C=U.reorder*e.echo.scrambleJitter;for(let X=0;X<et;X++){const nt=G[X];F.cell[X]=nt.id,F.dist[X]=nt.dist,F.strength[X]=nt.q,F.arrival[X]=_t+(bt-nt.dist)/(at*dt)}if(C>0&&et>2){const X=F.arrival[et-1];for(let ft=0;ft<et;ft++){const ct=($i(n,"jit",U.echoId,F.cell[ft])-.5)*2*C;F.arrival[ft]=Math.min(X,Math.max(_t,F.arrival[ft]+ct))}const nt=Array.from({length:et},(ft,ct)=>ct).sort((ft,ct)=>F.arrival[ft]-F.arrival[ct]||ft-ct),D=new Float64Array(et),tt=new Float32Array(et),q=new Float64Array(et),Z=new Float32Array(et);nt.forEach((ft,ct)=>{D[ct]=F.cell[ft],tt[ct]=F.dist[ft],q[ct]=F.arrival[ft],Z[ct]=F.strength[ft]}),Object.assign(F,{cell:D,dist:tt,arrival:q,strength:Z})}return F.endTime=et?F.arrival[et-1]:_t,F}function st(T,U){const W=[];for(const[at,dt]of T.settled)!dt.dead&&dt.t<=U&&W.push({id:at,t:dt.t,s:dt.strength});W.sort((at,dt)=>at.t-dt.t||Zi(at.id,dt.id));const B=W.length,_t={speed:T.speed,emitTime:T.t0,count:B,cell:new Float64Array(B),arrival:new Float64Array(B),strength:new Float32Array(B)};return W.forEach((at,dt)=>{_t.cell[dt]=at.id,_t.arrival[dt]=at.t,_t.strength[dt]=at.s}),_t}function vt(T,U){const W=T.claim,B=h[T.pingId-1],_t=_i[B.mode]??_i.active,at=W.quality*_t.clarity*H(T.e0/.3);return{echoId:W.echoId,latched:!1,listener:"origin",pingId:B.id,sourceId:W.id,kind:W.kind,hue:W.hue,signature:W.signature,cell:T.cell,pingT0:B.t0,emitTime:T.emitTime,returnTime:null,delay:null,estDistance:null,strength:T.e0,clarity:at,mode:B.mode,glimpse:{cell:T.cell,radius:Math.round((1-at)*3)+_t.glimpseRadius,stale:0},replay:null,forward:st(T.wave,U),tell:{suspicious:!1}}}function St(T,U,W,B,_t,at){const dt=W.id;if(T.heardBy.has(dt))return;T.heardBy.add(dt),c.heard++;const bt=T.claim,I=_i[U.mode]??_i.active,G=at-U.t0,J=bt.quality*I.clarity*H(_t/.3),et=W.id==="origin"?bt.echoId:`${bt.echoId}:${W.id}`,F=T.settled.get(B),C=ot(T,bt,F,J,at);let X=bt.level,nt=F,D=0;for(;nt&&nt.parent!=null&&D++<200;){const At=A.effects(nt.parent,at);for(const zt of At.masks)X=Math.max(X,Ki(zt.mode,A.opacityAt(zt,at)));nt=T.settled.get(nt.parent)}const tt={echoId:et,latched:!0,listener:W.id,listenerCell:B,pingId:U.id,sourceId:bt.id,kind:bt.kind,hue:bt.hue,signature:bt.signature,cell:T.origin,pingT0:U.t0,emitTime:T.t0,returnTime:at,delay:G,estDistance:G*U.speed/2,strength:_t,clarity:J,mode:U.mode,glimpse:{cell:T.origin,radius:Math.round((1-J)*3)+I.glimpseRadius,stale:at-T.t0},replay:C,field:C,R:C.R,speed:C.speed,latchTime:at,tell:{suspicious:$i(n,"tell",et)<X},truth:{cell:bt.trueCell,signature:bt.trueSignature,garbled:bt.garbled,spoofed:bt.spoofed,quality:bt.quality,tellLevel:X}};y.push(tt);const q=d.get(T.id);q&&(q.returnTime=at);const{truth:Z,replay:ft,...ct}=tt;N("echo-heard",{t:at,waveId:T.id,generation:T.gen,...ct,replay:C,id:bt.id,truth:Z}),T.wanted.delete(dt),T.wanted.size===0&&!T.done&&(T.cancelled=!0,T.cut="heard",Q(T,at))}function Pt(T,U){const W=h[T.pingId-1],B=U.t,_t=l(U.c);if(!_t||_t.solid)return;const at=B-T.t0;if(at>T.life){T.burned=!0;return}if(at>e.maxTime){T.cut??(T.cut="budget-time");return}const dt=T.settled.get(U.c);if(dt&&!dt.dead)return;const bt=U.o?qc:A.effects(U.c,B),I=U.m*bt.transmission,G=T.power*Is(T.env,at)*I,J=G>=e.floor||at<T.env.build+T.env.hold&&T.power*I>=e.floor;let et=dt;if(et){if(!J){et.up=!1;return}et.slot>=0&&(E.flags[et.slot]|=4,E.strength[et.slot]=0),et.dead=!1,et.t=B,et.strength=G,et.carry=I,et.parent=U.p??et.parent,T.gen===0&&(et.slot=S(T,U.c,B,G,!1,bt.masks.length>0))}else{if(W.cells>=e.maxCells){T.cut??(T.cut="budget-cells");return}W.cells++,c.cells++,T.cells++,et={t:B,strength:G,carry:I,dead:!J,up:!1,parent:U.p??null,slot:T.gen===0?S(T,U.c,B,G,!J,bt.masks.length>0):-1},T.settled.set(U.c,et)}N("cell-reached",{t:B,waveId:T.id,cell:U.c,strength:G,generation:T.gen,dead:!J,masked:bt.masks.length>0},T.gen>0);for(const F of bt.masks){if(T.touched.has(F.id)||(T.touched.add(F.id),F.owner!=null&&F.owner===W.owner))continue;const C=Ki(F.mode,A.opacityAt(F,B)),X=C*ji(.5+U.m*T.power*Is(T.env,at),0,1);$i(n,"notice",T.id,F.id)<X&&(c.notices++,N("mask-noticed",{t:B,maskId:F.id,mode:F.mode,cell:U.c,waveId:T.id,pingId:W.id,detectability:C,by:W.owner},T.gen>0))}if(J){if(T.claim&&T.gen>=1&&G>=e.hearFloor){U.c===W.hearer.cell&&St(T,W,W.hearer,U.c,G,B);const F=f.get(U.c);if(F)for(const C of F)St(T,W,C,U.c,G,B)}if(T.gen<e.maxGeneration){const F=s(U.c);if(c.sourceCalls++,F)for(const C of F)O(T,W,U.c,C,G,B,bt,!1,I);for(const C of bt.spoofs)C.spoof.cell!==U.c||W.spoofed.has(C.id)||(W.spoofed.add(C.id),O(T,W,U.c,C.spoof,G,B,qc,!0,I))}for(const F of _t.neighbors){if(F.gate!==void 0&&Bo(i,F.gate))continue;const C=l(F.id);if(!C||C.solid)continue;const X=T.settled.get(F.id);if(X&&!X.dead)continue;const nt=B+Math.hypot(_t.cx-C.cx,_t.cz-C.cz)/T.speed,D=nt-T.t0;if(D>T.life){T.burned=!0;continue}if(D>e.maxTime){T.cut??(T.cut="budget-time");continue}if(X){if(X.up)continue;X.up=!0}else{const tt=T.best.get(F.id);if(tt!==void 0&&tt<=nt)continue;T.best.set(F.id,nt)}u.push({t:nt,k:1,w:T.id,c:F.id,m:I,o:!1,p:U.c,seq:++o}),T.pending++,c.pushes++}}}function lt(T){if(c.pops++,T.k===0){A.remove(T.mask),N("mask-expired",{t:T.t,maskId:T.mask.id});return}const U=p[T.w-1];U.pending--,!U.cancelled&&(Pt(U,T),U.pending===0&&Q(U,T.t))}function Mt(T,{budgetMs:U=0}={}){const W=r+Math.max(0,T),B=W+e.lookahead,_t=U>0?performance.now():0;let at=0,dt=!1;for(;u.size&&u.peek().t<=B;){if(at>=e.maxWorkPerAdvance){dt=!0;break}if(U>0&&(at&63)===63&&performance.now()-_t>=U){dt=!0;break}const bt=u.pop();at++,x=Math.max(x,bt.t),lt(bt)}return r=dt?Math.max(r,Math.min(W,x)):W,Tt(),dt||(x=Math.max(x,B)),{t:r,work:at,behind:dt,active:_,solvedUntil:x}}function Tt(){for(const[T,U]of d)U.endT!=null&&U.endT<=r&&d.delete(T)}function pt(T,U={}){var G;let W=T;T&&typeof T=="object"&&(W=(G=i.cellAt(T.x,T.z))==null?void 0:G.id);const B=W==null?null:l(W);if(!B||B.solid)return null;const _t=U.kind??"ping",at=Hc[_t]??Hc.ping,dt=_i[U.mode]?U.mode:"active",bt={id:h.length+1,kind:_t,mode:dt,origin:B.id,t0:r,owner:U.owner??null,speed:U.speed??at.speed,echoed:new Set,spoofed:new Set,cells:0,echoes:0,hearer:{id:"origin",cell:B.id}};h.push(bt);const I=k(bt,{gen:0,origin:B.id,t0:r,power:(U.power??at.power)*_i[dt].power,env:Gc[at.env]});return N("wave-started",{t:r,waveId:I.id,pingId:bt.id,kind:_t,mode:dt,loudness:_i[dt].loudness,cell:B.id,speed:bt.speed,power:I.power,lifespan:I.life,owner:bt.owner}),bt.id}const Ct=T=>{var B;let U=T;T&&typeof T=="object"&&(U=(B=i.cellAt(T.x,T.z))==null?void 0:B.id);const W=U==null?null:l(U);return W&&!W.solid?W.id:null};function V(T,U){for(const W of M){if(U!=null&&W.pingId!==U||W.heardBy.has(T.id)||!W.wanted.has(T.id))continue;const B=W.settled.get(T.cell);!B||B.dead||B.t>r||B.strength<e.hearFloor||St(W,h[W.pingId-1],T,T.cell,B.strength,r)}}function gt(T,U=null){const W=Ct(T);if(W==null)return!1;for(const B of h)U!=null&&B.id!==U||B.hearer.cell===W||(B.hearer.cell=W,V(B.hearer,B.id));return!0}function mt(T,U){const W=Ct(U);if(W==null)return!1;let B=null;for(const _t of f.values())for(const at of _t)at.id===T&&(B=at);return!B||B.cell===W?!!B:(Y(T),B.cell=W,Ut(B),V(B,null),!0)}function Et(T){const U=A.create(T,r);return U?(Number.isFinite(U.expiresAt)&&u.push({t:U.expiresAt,k:0,w:0,c:U.id,m:0,o:!1,mask:U,seq:++o}),N("mask-created",{t:r,maskId:U.id,mode:U.mode,opacity:U.opacity,cells:U.cells.size,duration:U.duration,detectability:A.tell(U),anchor:U.anchor,owner:U.owner}),U):null}function Ut(T){const U=f.get(T.cell);U?U.push(T):f.set(T.cell,[T])}function Y(T){for(const[U,W]of f){const B=W.filter(_t=>_t.id!==T);B.length?f.set(U,B):f.delete(U)}}(t.listeners??[]).forEach(Ut);function Yt({maxSeconds:T=120,step:U=.5}={}){let W=0;for(;_>0&&W<T;)Mt(U),W+=U;return r}function wt({minMagnitude:T=0,debug:U=!1}={}){c.navCells=a.size;const W=new Map;for(const F of p)if(!(F.gen>0&&!U))for(const[C,X]of F.settled){const nt=r-X.t;if(nt<0)continue;const D=Nr(X.strength,nt,e),tt=W.get(C);tt&&(tt.waves++,D<tt.magnitude||D===tt.magnitude&&F.gen>=tt.generation)||W.set(C,{id:C,arrival:X.t,strength:X.strength,magnitude:D,age:nt,generation:F.gen,sourceId:F.sourceId,waveId:F.id,pingId:F.pingId,dist:(X.t-F.t0)*F.speed,dead:X.dead,masked:!1,waves:tt?tt.waves:1})}const B=[];for(const F of W.values())F.magnitude<T||(F.masked=A.isMasked(F.id,r),B.push(F));B.sort((F,C)=>Zi(F.id,C.id));const _t=new Map;for(const F of u.a){if(F.k!==1)continue;const C=_t.get(F.w);C?C.add(F.c):_t.set(F.w,new Set([F.c]))}const at=[],dt=[];for(const F of p){if(F.gen>0&&!U)continue;const C=r-F.t0,X={waveId:F.id,pingId:F.pingId,generation:F.gen,sourceId:F.sourceId,origin:F.origin,t0:F.t0,age:C,radius:C*F.speed,strength:F.power*Is(F.env,C),power:F.power,cells:F.cells,done:F.done,reason:F.done?F.cut??(F.burned?"burnout":"frontier-empty"):null};dt.push(X),F.done||at.push({...X,frontier:[..._t.get(F.id)??[]].sort(Zi)})}const bt=e.echo.reveal==="live",I=[];for(const F of y){if(F.returnTime>r)continue;const C={...F,age:r-F.returnTime};U||delete C.truth,I.push(C)}if(bt)for(const F of d.values())F.emitTime>r||F.returnTime!=null&&F.returnTime<=r||I.push({...vt(F,r),age:r-F.emitTime,...U?{truth:F.truth}:{}});const G=I.slice(-e.echoKeep),J={...c};U||(delete J.echoes,delete J.heard);const et={t:r,outgoing:{cells:B,fronts:at},echoes:G,cells:B,fronts:at,waves:dt,masks:A.all().map(F=>({id:F.id,mode:F.mode,opacity:A.opacityAt(F,r),baseOpacity:F.opacity,remaining:Math.max(0,F.expiresAt-r),cells:[...F.cells],anchor:F.anchor,detectability:A.tell(F,r),owner:F.owner,shape:F.shape})),stats:J};return U&&(et.hiddenEchoes=[...d.values()].filter(F=>F.returnTime==null||F.returnTime>r)),et}function xt({all:T=!1}={}){const U=[],W=[];for(const B of m)if(B.t>r)W.push(B);else if(T)U.push(B);else if(!B.hidden)if(B.truth){const{truth:_t,...at}=B;U.push(at)}else U.push(B);return m=W,U}function yt(){const T=E.n;return{count:T,version:E.version,cell:E.cell.subarray(0,T),arrival:E.arrival.subarray(0,T),strength:E.strength.subarray(0,T),generation:E.gen.subarray(0,T),wave:E.wave.subarray(0,T),speed:E.speed.subarray(0,T),flags:E.flags.subarray(0,T)}}const Nt=T=>{let U=0,W=E.n;for(;U<W;){const B=U+W>>1;E.arrival[B]<T?U=B+1:W=B}return U};function Dt(T,U=.5,W=3){const B=e.lookahead;return[Nt(T-v(W)-B),Nt(T+U+1e-9)]}function z(T,U,W=.5){const[B,_t]=Dt(U,W);for(let at=B;at<_t;at++)T[at]=E.flags[at]&5?0:Nr(E.strength[at],U-E.arrival[at],e);return[B,_t]}function R(T,U,W){const B=i.cellAt(T,U);if(!B||B.solid)return{intensity:0,cell:B?B.id:null,arrival:1/0};const _t=l(B.id),at=[_t.id];for(const G of _t.neighbors){if(G.gate!==void 0&&Bo(i,G.gate))continue;const J=l(G.id);J&&!J.solid&&at.push(G.id)}const dt=new Map;for(const G of at){const J=b.get(G);if(!J)continue;const et=l(G),F=Math.hypot(T-et.cx,U-et.cz);for(const C of J){if(E.flags[C]&5)continue;const X=E.arrival[C]+F/E.speed[C],nt=dt.get(E.wave[C]);(!nt||X<nt.a)&&dt.set(E.wave[C],{a:X,i:C})}}let bt=0,I=1/0;for(const[G,{a:J,i:et}]of dt){J<I&&(I=J);const F=p[G-1],C=Nr(E.strength[et]*(Is(F.env,J-F.t0)/Is(F.env,E.arrival[et]-F.t0)),W-J,e);C>bt&&(bt=C)}return{intensity:bt,cell:_t.id,arrival:I}}return{advance:Mt,runUntilIdle:Yt,ping:pt,createMask:Et,removeMask:T=>{const U=A.get(T);U&&(A.remove(U),N("mask-expired",{t:r,maskId:T}))},isMasked:T=>A.isMasked(T,r),maskAt:T=>A.effects(T,r).masks.map(W=>({id:W.id,mode:W.mode,opacity:A.opacityAt(W,r)})),maskTell:T=>{const U=A.get(T);return U?A.tell(U,r):0},addListener:Ut,removeListener:Y,moveOrigin:gt,moveListener:mt,snapshot:wt,drainEvents:xt,field:yt,activeRange:Dt,intensityRange:z,sampleAt:R,get solvedUntil(){return x},get time(){return r},get active(){return _},get stats(){return c.navCells=a.size,{...c}},config:e}}const Yu=1400,$u=9,Yc=Yu*$u*3;function ux(i,t,e){const n=t*Math.min(e,1-e),s=r=>{const o=(r+i/30)%12;return e-n*Math.max(-1,Math.min(o-3,9-o,1))};return[s(0),s(8),s(4)]}const hx=[[.25,.95,1],[.9,.9,1],[.9,.9,1]];function Ex({scene:i,map:t,seed:e=1,sources:n,options:s={}}){const r=cx(t,{seed:e,sources:n,...s}),o=w=>t.cell?t.cell(w):t.cells[w],a=new Float32Array(Yc*3),l=new Float32Array(Yc*3),c=new le;c.setAttribute("position",new Me(a,3).setUsage(_l)),c.setAttribute("color",new Me(l,3).setUsage(_l)),c.setDrawRange(0,0);const u=new qt(c,He(new ye({vertexColors:!0,transparent:!0,blending:Ge,side:ge,toneMapped:!1,depthTest:!1}),{depthTest:!1}));u.material.depthTest=!1,u.renderOrder=9100,u.frustumCulled=!1,u.name="scan",i.add(u);let p=0,h=0,f=new Float32Array(1024),m=new Float32Array(1024),_=-1,g=[],d=0,M=-1e9;const y={cells:0,lastMs:0,field:0,pings:0};function x(w,E,b){if(h>=Yu||b<.015)return;const P=w.poly,S=Math.min(P.length,$u),v=ke(w)+.07,A=w.cx,N=w.cz;for(let k=0;k<S;k++){const $=P[k],Q=P[(k+1)%P.length],K=A+($[0]-A)*.94,O=N+($[1]-N)*.94,H=A+(Q[0]-A)*.94,ot=N+(Q[1]-N)*.94,st=p*3;a[st]=A,a[st+1]=v,a[st+2]=N,a[st+3]=K,a[st+4]=v,a[st+5]=O,a[st+6]=H,a[st+7]=v,a[st+8]=ot;const vt=b,St=b*.45;l[st]=E[0]*vt,l[st+1]=E[1]*vt,l[st+2]=E[2]*vt,l[st+3]=E[0]*St,l[st+4]=E[1]*St,l[st+5]=E[2]*St,l[st+6]=E[0]*St,l[st+7]=E[1]*St,l[st+8]=E[2]*St,p+=3}h++}return{sim:r,mesh:u,stats:y,ping(w,E,b={}){const P=r.ping({x:w,z:E},b);return P!=null&&(M=r.time,y.pings++,d=0),P},step(w,E=3){return r.advance(w,{budgetMs:E}),r.drainEvents()},update(){const w=performance.now(),E=r.time;p=0,h=0;const b=r.field();if(y.field=b.count,b.count&&E-M<40){(_!==b.version||f.length<b.count)&&(f=new Float32Array(Math.max(b.count*2,1024)),_=b.version);const[P,S]=r.intensityRange(f,E);for(let v=P;v<S;v++){if(b.flags[v]&5)continue;const A=f[v];if(A<.02)continue;const N=o(b.cell[v]);N&&!N.solid&&x(N,hx[Math.min(2,b.generation[v])],Math.min(1.1,A)*.9)}E>=d&&(d=E+.25,g=r.snapshot().echoes.filter(v=>v.replay&&v.replay.count));for(const v of g){const A=v.replay;m.length<A.count&&(m=new Float32Array(A.count*2));const[N,k]=ox(A,E,m),$=ux(A.hue,.95,.6);for(let Q=N;Q<k;Q++){const K=m[Q];if(K<.02)continue;const O=o(A.cell[Q]);O&&!O.solid&&x(O,$,Math.min(1.1,K)*.95)}if(E>A.endTime){const Q=Math.max(0,Math.min(1,(A.endTime+7-E)/3)),K=o(v.glimpse.cell);K&&Q>0&&x(K,$,.9*Q)}}}c.setDrawRange(0,p),c.attributes.position.needsUpdate=!0,c.attributes.color.needsUpdate=!0,u.visible=p>0,y.cells=h,y.lastMs=performance.now()-w},dispose(){i.remove(u),c.dispose(),u.material.dispose()}}}export{nn as D,gx as G,Tr as R,tl as S,vx as a,Sx as b,yx as c,mx as d,xx as e,_x as f,Mx as g,bx as h,Ex as i};
