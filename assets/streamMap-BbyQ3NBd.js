import{m as Zh}from"./rng-BKYMqjzS.js";import{I as Jh,f as Qh,g as tf}from"./session-CQ0HZyEY.js";import{C as Se,a as ef,h as nf}from"./palette-DlZOkp1f.js";import{e as Xu,d as dn,R as _i,f as sf,h as rf,i as of,D as af,j as ql}from"./client-DxCleCfI.js";const Rn={tick:1/60,maxFrame:.25,collision:{maxStep:.2,maxSubsteps:96,iterations:4,skin:.01},avatar:{radius:.45,speed:5.6,runSpeed:8.4,accel:26,decel:34,turnRate:14},companion:{radius:.4,speed:5.9,catchupSpeed:8.8,accel:26,decel:34,turnRate:12},facing:{minSpeed:.5,tau:.07},route:{reach:.45,arriveTol:.35,margin:.06,cornerFloor:.4,cornerLook:1.4,stuckTime:.9,stuckGain:.3,pullMargin:.1,pullStep:.35,pullLook:7,blendTime:.35,cornerMargin:.3,cornerPush:1,cornerRing:12,cornerStep:.1,cornerTurn:.2,doorCentreWidth:3.6,doorTol:.25,doorBudget:1.2,doorLead:.7,doorTurn:1,tidyLine:.12,tidySpike:1.9,tidyShort:.8,smooth:{passes:6,arc:1.25,hookTurn:.9,maxTurn:1.15,round:1,legShare:.45,minLeg:.7,outward:[0,.2,.4,.6],minGain:.1,lenSlack:.02,clearSlack:.02},look:.9,lookSpeed:.22,lookMax:2.2,passRadius:1},follow:{distance:3.4,lateral:1.6,start:5.2,stop:3.6,catchup:10,doorClear:2.2,doorWidth:3.6,wallClear:.3,reslot:.5,blinkDistance:42,lead:.9,replanDist:1.8,reslotMax:1.4,farScale:12,searchStep:150,searchMax:12e3,retry:1.5,slotBudget:260},patrol:{dwell:1.2,maxWaypoints:12},react:{dwell:1.5,face:1.2,giveUp:14},separation:{gap:.15,push:4.5},recovery:{window:5},triggers:{maxRules:32,maxFiresPerTick:4,repeat:2,maxSignals:32},noise:{run:9,runEvery:.6},events:{max:512}},lr=(i,t,e)=>i<t?t:i>e?e:i;function fr(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const o=i[s][0],a=i[s][1],l=i[r][0],c=i[r][1];a>e!=c>e&&t<(l-o)*(e-a)/(c-a)+o&&(n=!n)}return n}const er=(i,t,e,n,s,r)=>(e-i)*(r-t)-(n-t)*(s-i);function Rs(i,t){let e=(t-i)%(Math.PI*2);return e>Math.PI?e-=Math.PI*2:e<=-Math.PI&&(e+=Math.PI*2),e}function lf(i,t,e){const n=Rs(i,t);return Math.abs(n)<=e?t:i+Math.sign(n)*e}function To(i,t,e,n,s,r){const o=s-e,a=r-n,l=o*o+a*a,c=l>0?lr(((i-e)*o+(t-n)*a)/l,0,1):0;return Math.hypot(i-(e+c*o),t-(n+c*a))}const cf=Rn;class $l{constructor(t,e,n){this.id=t,this.x=n.x,this.z=n.z,this.heading=0,this.vx=0,this.vz=0,this.speed=0,this.radius=e.radius,this.cell=n.cell,this.moving=!1,this.controlled=!1,this.touching=!1,this.sliver=!1,this.px=n.x,this.pz=n.z,this.pheading=0,this.spec=e,this.accel=e.accel,this.decel=e.decel,this.world=null,this._route=null,this._want={x:0,z:0},this._blocked=0,this._blockedFired=!1,this._aim=null,this._face=null}step(t,e,n,s,r){const o=s-this.vx,a=r-this.vz,l=Math.hypot(o,a),c=Math.hypot(s,r),u=Math.hypot(this.vx,this.vz),p=(c>=u-1e-6?this.accel:this.decel)*n;l<=p?(this.vx=s,this.vz=r):(this.vx+=o/l*p,this.vz+=a/l*p),this._want.x=s,this._want.z=r;const{maxStep:d,maxSubsteps:f}=cf.collision,g=Math.hypot(this.vx,this.vz)*n,x=Math.min(f,Math.max(1,Math.ceil(g/Math.min(d,this.radius*.4)))),m=n/x,h={x:0,z:0},S=[];let M=!1,v=0;e.substeps+=x;for(let E=0;E<x;E++){const A=this.x,b=this.z,y=t.cell(this.cell);if(!y){this.vx=0,this.vz=0;break}h.x=A+this.vx*m,h.z=b+this.vz*m,S.length=0;const w=t.resolve(h,this.radius,t.near(y),S),P=t.locate(h.x,h.z,this.cell);if(!P||t.blocked(P,h.x,h.z)){e.violations++,this.vx=0,this.vz=0,M=!0;continue}if(this.x=h.x,this.z=h.z,this.sliver=P.solid,P.solid||(this.cell=P.id),w){M=!0,e.contacts++;for(let U=0;U<S.length;U+=2){const H=this.vx*S[U]+this.vz*S[U+1];H<0&&(this.vx-=H*S[U],this.vz-=H*S[U+1])}}v+=Math.hypot(this.x-A,this.z-b)}this.touching=M,this.speed=Math.hypot(this.vx,this.vz),this.moving=this.speed>.15;const T=Math.hypot(s,r),_=n>0?v/n:0;T>1&&_<T*.3?this._blocked+=n:(this._blocked=0,this._blockedFired=!1)}face(t,e,n=0){const s=this.spec.turnRate*t;if(!(n>0)){this.heading=lf(this.heading,e,s);return}const r=Rs(this.heading,e),o=Math.min(s,Math.abs(r)*(1-Math.exp(-t/n)));this.heading+=Math.sign(r)*o}teleport(t){this.x=t.x,this.z=t.z,this.cell=t.cell,this.px=t.x,this.pz=t.z,this.pheading=this.heading,this.vx=this.vz=this.speed=0,this.moving=!1,this._route=null}pub(){return{id:this.id,x:this.x,z:this.z,heading:this.heading,vx:this.vx,vz:this.vz,speed:this.speed,radius:this.radius,cell:this.cell,moving:this.moving,controlled:this.controlled,touching:this.touching,sliver:this.sliver,prev:{x:this.px,z:this.pz,heading:this.pheading}}}}const Ao=.03,uf=.6,Yl=1.2,hf=2;class ff{constructor(t){this.nav=t,this.infos=new Map,this.nears=new Map,this.solids=new Map,this.doorLists=new Map,this.doorNears=new Map,this.usables=new Map}cell(t){const e=this.nav;return(e.cell?e.cell(t):e.cells[t])??null}live(t){return this.cell(t)!==null}purge(){var t;for(const e of[this.infos,this.nears,this.solids,this.doorLists,this.doorNears,this.usables])(t=e==null?void 0:e.clear)==null||t.call(e)}gateLocked(t){var n,s;const e=this.nav;return e.gateLocked?!!e.gateLocked(t):!!((s=(n=e.gates)==null?void 0:n[t])!=null&&s.locked)}locate(t,e,n){if(n!=null){const s=this.cell(n);if(s&&fr(s.poly,t,e))return s;if(s)for(const r of s.neighbors){const o=this.cell(r.id);if(o&&fr(o.poly,t,e))return o}}return this.nav.cellAt(t,e)??null}blocked(t,e,n){return t.solid?t.cut?fr(t.cut.poly,e,n):!0:!1}solidWalls(t){let e=this.solids.get(t.id);if(e)return e;const n=t.cut?t.cut.poly:t.poly,s=n.length;let r=0;for(let u=0;u<s;u++){const p=n[u],d=n[(u+1)%s];r+=p[0]*d[1]-d[0]*p[1]}const o=r>=0?1:-1,a=[];let l=!1;for(const u of t.neighbors){const p=this.cell(u.id);p?p.solid&&a.push(p.poly):l=!0}const c=(u,p)=>{for(const d of a)for(let f=0;f<d.length;f++){const g=d[f],x=d[(f+1)%d.length];if(To(u,p,g[0],g[1],x[0],x[1])<Ao)return!0}return!1};e=[];for(let u=0;u<s;u++){const p=n[u],d=n[(u+1)%s],f=d[0]-p[0],g=d[1]-p[1],x=Math.hypot(f,g);x<1e-6||c((p[0]+d[0])/2,(p[1]+d[1])/2)||e.push({ax:p[0],az:p[1],bx:d[0],bz:d[1],nx:o*g/x,nz:-o*f/x,gate:void 0})}return l||this.solids.set(t.id,e),e}info(t){let e=this.infos.get(t.id);if(e)return e;const n=t.poly,s=n.length,r=[];for(let d=0;d<s;d++){const f=n[d],g=n[(d+1)%s],x=g[0]-f[0],m=g[1]-f[1],h=Math.hypot(x,m);if(h<1e-6)continue;let S=-m/h,M=x/h;(t.cx-f[0])*S+(t.cz-f[1])*M<0&&(S=-S,M=-M),r.push({ax:f[0],az:f[1],bx:g[0],bz:g[1],dx:x/h,dz:m/h,L:h,nx:S,nz:M,open:!1,gate:null})}const o=new Array(t.neighbors.length).fill(null),a=[],l=(d,f)=>{let g=null,x=1/0;for(const m of r){const h=(d[0]-m.ax)*m.dx+(d[1]-m.az)*m.dz;if(h<-f||h>m.L+f)continue;const S=Math.abs((d[0]-m.ax)*-m.dz+(d[1]-m.az)*m.dx);S<x&&(x=S,g={e:m,t:h})}return g&&x<=f?g:null};let c=!1;t.neighbors.forEach((d,f)=>{const g=this.cell(d.id);if(!g){c=!0;return}if(g.solid){const x=l(d.mid,Ao);x&&(x.e.solidBacked=!0);return}if(d.gate===void 0){const x=l(d.mid,Ao);if(!x){a.push(f);return}x.e.open=!0;const m=x.e;o[f]={x0:m.ax,z0:m.az,x1:m.bx,z1:m.bz,w:m.L,gate:void 0}}else{const x=l(d.mid,uf);if(!x){a.push(f);return}const m=x.e,h=(d.len??2.4)/2,S=Math.max(0,x.t-h),M=Math.min(m.L,x.t+h);(m.gate??(m.gate=[])).push({k:f,t0:S,t1:M,id:d.gate}),o[f]={x0:m.ax+m.dx*S,z0:m.az+m.dz*S,x1:m.ax+m.dx*M,z1:m.az+m.dz*M,w:Math.max(0,M-S),gate:d.gate,merged:!1}}});const u=[],p=(d,f,g,x)=>{g-f<1e-4||u.push({ax:d.ax+d.dx*f,az:d.az+d.dz*f,bx:d.ax+d.dx*g,bz:d.az+d.dz*g,nx:d.nx,nz:d.nz,gate:x})};for(const d of r)if(!(d.open||d.solidBacked))if(d.gate){const f=d.gate.slice().sort((x,m)=>x.t0-m.t0);let g=0;for(const x of f)p(d,g,x.t0,void 0),p(d,x.t0,x.t1,x.id),g=Math.max(g,x.t1);p(d,g,d.L,void 0)}else p(d,0,d.L,void 0);return e={walls:u,portals:o,unmatched:a,edges:r},c||this.infos.set(t.id,e),e}portal(t,e){const n=this.info(t).portals[e];if(!n)return null;if(n.gate!==void 0&&!n.merged){n.merged=!0;const s=t.neighbors[e],r=this.cell(s.id);if(!r)return null;const o=this.info(r),a=r.neighbors.findIndex(v=>v.gate===s.gate&&v.id===t.id),l=a>=0?o.portals[a]:null;if(!l)return n.w=0,n;const c=n.x1-n.x0,u=n.z1-n.z0,p=Math.hypot(c,u)||1,d=c/p,f=u/p,g=(l.x0-n.x0)*d+(l.z0-n.z0)*f,x=(l.x1-n.x0)*d+(l.z1-n.z0)*f,m=Math.max(0,Math.min(g,x)),h=Math.min(p,Math.max(g,x)),S=n.x0,M=n.z0;n.x0=S+d*m,n.z0=M+f*m,n.x1=S+d*Math.max(m,h),n.z1=M+f*Math.max(m,h),n.w=Math.max(0,h-m)}return n}near(t){let e=this.nears.get(t.id);if(e)return e;const n=new Set([t.id]),s=[t];let r=[t],o=!1;for(let a=0;a<hf;a++){const l=[];for(const c of r)for(const u of c.neighbors){if(n.has(u.id))continue;n.add(u.id);const p=this.cell(u.id);if(!p){o=!0;continue}s.push(p),l.push(p)}r=l}e=[];for(const a of s)for(const l of a.solid?this.solidWalls(a):this.info(a).walls)e.push(l);return o||this.nears.set(t.id,e),e}resolve(t,e,n,s){const{iterations:r,skin:o}=Rn.collision,a=e+o;let l=0;for(let c=0;c<r;c++){let u=!1;for(const p of n){if(p.gate!==void 0&&!this.gateLocked(p.gate))continue;const d=p.bx-p.ax,f=p.bz-p.az,g=d*d+f*f,x=g>0?Math.min(1,Math.max(0,((t.x-p.ax)*d+(t.z-p.az)*f)/g)):0,m=p.ax+x*d,h=p.az+x*f,S=t.x-m,M=t.z-h,v=S*S+M*M,T=(t.x-p.ax)*p.nx+(t.z-p.az)*p.nz;if(v>=a*a||T<0&&x>0&&x<1)continue;const _=Math.sqrt(v);let E,A,b;_>1e-9?(E=S/_,A=M/_,b=a-_):(E=p.nx,A=p.nz,b=a),t.x+=E*b,t.z+=A*b,u=!0,l++,s&&s.push(E,A)}if(!u)break}return l}wallDist(t,e,n,s=!1){let r=1/0;for(const o of this.near(n)){if(o.gate!==void 0&&(s||!this.gateLocked(o.gate)))continue;const a=To(t,e,o.ax,o.az,o.bx,o.bz);a<r&&(r=a)}return r}openNear(t,e,n){let s=null,r=1/0;for(const o of t.neighbors){const a=this.cell(o.id);if(!a||a.solid)continue;let l=fr(a.poly,e,n)?0:1/0;if(l!==0)for(let c=0;c<a.poly.length;c++){const u=a.poly[c],p=a.poly[(c+1)%a.poly.length];l=Math.min(l,To(e,n,u[0],u[1],p[0],p[1]))}(l<r-1e-9||Math.abs(l-r)<=1e-9&&s&&a.id<s.id)&&(r=l,s=a)}return s}walkClear(t,e,n,s,r,o,a=!1){const l=r+Rn.route.pullMargin,c=r-.005,u=Math.hypot(n-t,s-e),p=Math.max(1,Math.ceil(u/Rn.route.pullStep));let d=o;for(let f=0;f<=p;f++){const g=f/p,x=t+(n-t)*g,m=e+(s-e)*g,h=this.locate(x,m,d);if(!h||this.blocked(h,x,m))return!1;d=h.id;const S=g*u<.6||(1-g)*u<.6;if(this.wallDist(x,m,h,a)<(S?c:l))return!1}return!0}settle(t,e,n,s=0){const r=[[0,0]];for(const o of[.6,1.2,2,3,4.5])for(let a=0;a<8;a++){const l=a/8*Math.PI*2+o;r.push([Math.cos(l)*o,Math.sin(l)*o])}for(const[o,a]of r){const l={x:t+o,z:e+a};let c=this.locate(l.x,l.z);if(!(!c||c.solid)&&(this.resolve(l,n+s,this.near(c),null),c=this.locate(l.x,l.z,c.id),!(!c||c.solid)&&this.wallDist(l.x,l.z,c)>=n-.02))return{x:l.x,z:l.z,cell:c.id}}return null}usable(t,e,n){const s=e+"@"+n;let r=this.usables.get(t.id);if(r||this.usables.set(t.id,r=new Map),r.has(s))return r.get(s);let o=null;const a=this.portal(t,e);if(a&&a.w>0){const l=n+Rn.route.margin,c=Math.max(4,Math.min(40,Math.ceil(a.w/.15))),u=a.x1-a.x0,p=a.z1-a.z0;let d=null,f=null;for(let g=0;g<=c;g++){const x=g/c,m=a.x0+u*x,h=a.z0+p*x;this.wallDist(m,h,t,!0)>=l?(f?f.e=g:f={s:g,e:g},(!d||f.e-f.s>d.e-d.s)&&(d=f)):f=null}d&&(o={x0:a.x0+u*d.s/c,z0:a.z0+p*d.s/c,x1:a.x0+u*d.e/c,z1:a.z0+p*d.e/c,w:Math.hypot(u,p)*(d.e-d.s)/c,gate:a.gate})}return r.set(s,o),o}passable(t,e,n){return!!this.usable(t,e,n)}doorsOf(t){let e=this.doorLists.get(t.id);if(e)return e;if(e=[],t.solid)return this.doorLists.set(t.id,e),e;const n=this.info(t),s=(r,o)=>this.wallDist(r,o,t,!0)<Yl;return t.neighbors.forEach((r,o)=>{const a=n.portals[o];if(!a)return;const l=(a.x0+a.x1)/2,c=(a.z0+a.z1)/2;a.gate!==void 0?e.push({x:r.mid[0],z:r.mid[1]}):a.w<Rn.follow.doorWidth&&s(a.x0,a.z0)&&s(a.x1,a.z1)&&e.push({x:l,z:c})}),t.neighbors.every(r=>this.cell(r.id))&&this.doorLists.set(t.id,e),e}isDoor(t,e){const n=this.info(t).portals[e];if(!n)return!1;if(n.gate!==void 0)return!0;if(n.w>=Rn.route.doorCentreWidth)return!1;const s=(r,o)=>this.wallDist(r,o,t,!0)<Yl;return s(n.x0,n.z0)&&s(n.x1,n.z1)}doorsNear(t){let e=this.doorNears.get(t.id);if(e)return e;e=this.doorsOf(t).slice();for(const n of t.neighbors){const s=this.cell(n.id);if(s&&!s.solid)for(const r of this.doorsOf(s))e.push(r)}return t.neighbors.every(n=>this.cell(n.id))&&this.doorNears.set(t.id,e),e}inDoorway(t,e,n,s){for(const r of this.doorsNear(n))if(Math.hypot(r.x-t,r.z-e)<s)return!0;return!1}}const jl=new WeakMap;function df(i){let t=jl.get(i);return t||(t=new ff(i),jl.set(i,t)),t}class pf{constructor(t,e,n,{passable:s=null}={}){if(this.get=t.cell?o=>t.cell(o):o=>t.cells[o],this.locked=t.gateLocked?o=>!!t.gateLocked(o):o=>{var a,l;return!!((l=(a=t.gates)==null?void 0:a[o])!=null&&l.locked)},this.passable=s,this.fromId=e,this.toId=n,this.goal=this.get(n),this.expanded=0,this.state="running",this.res=null,this.g=new Map([[e,0]]),this.prev=new Map,this.closed=new Set,this.heap=[],this.bestId=e,this.bestH=1/0,!this.goal||this.goal.solid){this.state="fail";return}if(e===n){this.state="done",this.res={cells:[e],length:0};return}const r=this.get(e);if(!r){this.state="fail";return}this._push([this._h(r),e])}_h(t){return Math.hypot(t.cx-this.goal.cx,t.cz-this.goal.cz)}_less(t,e){return t[0]<e[0]||t[0]===e[0]&&t[1]<e[1]}_push(t){const e=this.heap;e.push(t);let n=e.length-1;for(;n>0;){const s=n-1>>1;if(!this._less(e[n],e[s]))break;[e[n],e[s]]=[e[s],e[n]],n=s}}_pop(){const t=this.heap,e=t[0],n=t.pop();if(t.length){t[0]=n;let s=0;for(;;){const r=2*s+1,o=r+1;let a=s;if(r<t.length&&this._less(t[r],t[a])&&(a=r),o<t.length&&this._less(t[o],t[a])&&(a=o),a===s)break;[t[s],t[a]]=[t[a],t[s]],s=a}}return e}_chain(t){const e=[];for(let n=t;n!==void 0;n=this.prev.get(n))e.push(n);return e.reverse(),{cells:e,length:this.g.get(t)}}step(t=1/0){if(this.state!=="running")return this.state;const{g:e,prev:n,closed:s,heap:r,get:o,locked:a,passable:l}=this;let c=t;for(;r.length&&c>0;){const[,u]=this._pop();if(s.has(u))continue;if(u===this.toId)return this.state=!e.has(u)||!n.has(u)?"fail":"done",this.state==="done"&&(this.res=this._chain(u)),this.state;s.add(u),this.expanded++,c--;const p=o(u);if(!p)continue;const d=this._h(p);d<this.bestH&&(this.bestH=d,this.bestId=u);for(let f=0;f<p.neighbors.length;f++){const g=p.neighbors[f];if(s.has(g.id)||g.gate!==void 0&&a(g.gate))continue;const x=o(g.id);if(!x||x.solid||l&&!l(p,f,x))continue;const m=Math.hypot(p.cx-g.mid[0],p.cz-g.mid[1])+Math.hypot(g.mid[0]-x.cx,g.mid[1]-x.cz),h=e.get(u)+m;h<(e.get(g.id)??1/0)&&(e.set(g.id,h),n.set(g.id,u),this._push([h+this._h(x),g.id]))}}return r.length||(this.state="fail"),this.state}result(){return this.res}partial(){return this.bestId===this.fromId?null:this._chain(this.bestId)}}function mf(i,t,{look:e=6}={}){if(i.length<=2)return i.slice();const n=[i[0]];let s=0;for(;s<i.length-1;){let r=Math.min(i.length-1,s+e);for(;r>s+1&&!t(i[s],i[r]);)r--;n.push(i[r]),s=r}return n}const rn=Rn;function gf(i,t,e){const n=t.concat([{lx:e.x,lz:e.z,rx:e.x,rz:e.z}]),s=[];let r=i.x,o=i.z,a=r,l=o,c=r,u=o,p=0,d=0,f=n.length*4+16;for(let h=0;h<n.length&&f-- >0;h++){const S=n[h];if(er(r,o,c,u,S.rx,S.rz)>=0)if(r===c&&o===u||er(r,o,a,l,S.rx,S.rz)<0)c=S.rx,u=S.rz,d=h;else{s.push({x:a,z:l}),r=a,o=l;const M=p;a=c=r,l=u=o,p=d=M,h=M;continue}if(er(r,o,a,l,S.lx,S.lz)<=0)if(r===a&&o===l||er(r,o,c,u,S.lx,S.lz)>0)a=S.lx,l=S.lz,p=h;else{s.push({x:c,z:u}),r=c,o=u;const M=d;a=c=r,l=u=o,p=d=M,h=M;continue}}s.push({x:e.x,z:e.z});const g=[];let x=i.x,m=i.z;for(const h of s)Math.hypot(h.x-x,h.z-m)<1e-6||(g.push(h),x=h.x,m=h.z);return g.length||g.push({x:e.x,z:e.z}),g}function _a(i,t,e,n){const s=i.locate(e.x,e.z);if(!s)return{ok:!1,reason:"outside"};if(s.solid)return{ok:!1,reason:"solid"};const r=i.settle(e.x,e.z,n);if(!r)return{ok:!1,reason:"cramped"};let o=i.locate(t.x,t.z,t.cell)??i.cell(t.cell);if(!o)return{ok:!1,reason:"unloaded"};if(o.solid&&(o=i.openNear(o,t.x,t.z)),!o)return{ok:!1,reason:"unreachable"};const a=new pf(i.nav,o.id,r.cell,{passable:(l,c)=>i.passable(l,c,n)});return{ok:!0,search:a,goal:r,finish:(l=a.result())=>{if(!l)return{ok:!1,reason:"unreachable"};let c=r;if(l.cells[l.cells.length-1]!==r.cell){const u=i.cell(l.cells[l.cells.length-1]);if(c=u&&i.settle(u.cx,u.cz,n),!c)return{ok:!1,reason:"unreachable"}}return xf(i,t,c,o,l,n)}}}function Fn(i,t,e,n,{maxExpand:s=1/0}={}){const r=_a(i,t,e,n);return r.ok?r.search.step(s)==="done"?r.finish():{ok:!1,reason:"unreachable"}:r}function xf(i,t,e,n,s,r){var M;const o=rn.route,a=[],l=[];for(let v=0;v+1<s.cells.length;v++){const T=i.cell(s.cells[v]);if(!T)return{ok:!1,reason:"unloaded"};let _=null,E=!1;if(T.neighbors.forEach((U,H)=>{if(U.id!==s.cells[v+1])return;const $=i.usable(T,H,r);$&&(!_||$.w>_.w)&&(_=$,E=i.isDoor(T,H))}),!_)return{ok:!1,reason:"unloaded"};const A={x:_.x0,z:_.z0},b={x:_.x1,z:_.z1},y=(_.x0+_.x1)/2,w=(_.z0+_.z1)/2,P=er(T.cx,T.cz,y,w,A.x,A.z);if(a.push(P>=0?{lx:A.x,lz:A.z,rx:b.x,rz:b.z}:{lx:b.x,lz:b.z,rx:A.x,rz:A.z}),E){const U=_.gate!==void 0?((M=i.nav.gates)==null?void 0:M[_.gate])??null:null;l.push({x0:_.x0,z0:_.z0,x1:_.x1,z1:_.z1,w:_.w,n:(U==null?void 0:U.normal)??null})}}const c=gf(t,a,e),u=[{x:t.x,z:t.z},...c],p=(v,T)=>i.walkClear(v.x,v.z,T.x,T.z,r,n.id),d=mf(u,p,{look:o.pullLook});let f=0;for(let v=1;v<u.length;v++)f+=Math.hypot(u[v].x-u[v-1].x,u[v].z-u[v-1].z);_f(i,d,l,r,p),Sf(i,d,r,p),Mf(d,p),vf(i,d,l,r,p);const g=d.slice(1).map(v=>({x:v.x,z:v.z})),x=d.slice(1).map(v=>no());let m=0,h=t.x,S=t.z;for(const v of g)m+=Math.hypot(v.x-h,v.z-S),h=v.x,S=v.z;return{ok:!0,pts:g,fixed:x,cells:s.cells,goal:e,length:m,tautLength:f,rawLength:s.length}}function no(i,t){return!1}function Ro(i){const t=new Array(i.length).fill(0);for(let e=1;e+1<i.length;e++){const n=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z),s=Math.hypot(i[e+1].x-i[e].x,i[e+1].z-i[e].z);n<1e-9||s<1e-9||(t[e]=Math.abs(Rs(Math.atan2(i[e].x-i[e-1].x,i[e].z-i[e-1].z),Math.atan2(i[e+1].x-i[e].x,i[e+1].z-i[e].z))))}return t}const Kl=i=>{let t=0;for(let e=1;e<i.length;e++)t+=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z);return t};function Zl(i,t){let e=1/0;for(let n=0;n<t.length;n++){const s=n===0?0:Math.max(1,Math.ceil(Math.hypot(t[n].x-t[n-1].x,t[n].z-t[n-1].z)/.3));for(let r=n===0?0:1;r<=s;r++){const o=s?r/s:0,a=n===0?t[0].x:t[n-1].x+(t[n].x-t[n-1].x)*o,l=n===0?t[0].z:t[n-1].z+(t[n].z-t[n-1].z)*o,c=i.locate(a,l);if(!c||c.solid)return 0;e=Math.min(e,i.wallDist(a,l,c))}}return e}function vf(i,t,e,n,s){const r=rn.route.smooth;if(t.length<3)return;const o=n+rn.route.cornerMargin,a=(x,m)=>{const h=[];for(let S=1;S<m.length;S++){const M=qu(m[S-1],m[S],x.x0,x.z0,x.x1,x.z1);M>=0&&!h.some(v=>Math.abs(v-M)*x.w<.05)&&h.push(M)}return h},l=rn.route.cornerMargin*.8+n,c=t.map(x=>({x:x.x,z:x.z})),u=x=>{for(const m of e){const h=a(m,c),S=a(m,x);if(h.length!==S.length)return!1;if(!h.length)continue;const M=Math.min(...h.map(v=>Math.abs(v-.5)*m.w));for(const v of S){const T=Math.abs(v-.5)*m.w;if(M<=rn.route.doorTol+.05){if(T<=rn.route.doorTol+.05)continue;return!1}if(T<=M+.02)continue;const _=m.x0+(m.x1-m.x0)*v,E=m.z0+(m.z1-m.z0)*v,A=i.locate(_,E);if(!A||i.wallDist(_,E,A)<l)return!1}}return!0},p=(x,m,h)=>{const S=t[x-1],M=t[x+m];for(let G=x;G<x+m;G++)if(no(t[G]))return!1;const v=t.slice(x-1,x+m+1),T=[S,...h,M];if(Kl(T)>Kl(v)+r.lenSlack)return!1;for(let G=1;G<T.length;G++)if(!s(T[G-1],T[G]))return!1;if(!u([...t.slice(0,x),...h,...t.slice(x+m)]))return!1;const _=Math.max(0,x-2),E=Math.min(t.length,x+m+2),A=Ro(t.slice(_,E)),b=Ro([...t.slice(_,x),...h,...t.slice(x+m,E)]);let y=0,w=0;for(let G=0;G<m;G++)y=Math.max(y,A[x-_+G]);for(let G=0;G<h.length;G++)w=Math.max(w,b[x-_+G]);const P=y-r.minGain;if(w>P)return!1;const U=x-1-_,H=x+m-_,$=x+h.length-_;return U>=0&&b[U]>Math.max(A[U],P)||b[$]>Math.max(A[H]??0,P)||Zl(i,T)<Math.min(o,Zl(i,v))-r.clearSlack?!1:(t.splice(x,m,...h),!0)},d=x=>{const m=t[x-1],h=t[x],S=t[x+1],M=Math.hypot(h.x-m.x,h.z-m.z),v=Math.hypot(S.x-h.x,S.z-h.z),T=(h.x-m.x)/M,_=(h.z-m.z)/M,E=(S.x-h.x)/v,A=(S.z-h.z)/v,b=Math.min(r.round,r.legShare*M,M-r.minLeg),y=Math.min(r.round,r.legShare*v,v-r.minLeg);let w=T-E,P=_-A;const U=Math.hypot(w,P)||1;w/=U,P/=U;for(const H of[1,.7,.5]){const $=b*H,G=y*H;if(!($<.15||G<.15))for(const B of r.outward){const N={x:h.x-T*$+w*B,z:h.z-_*$+P*B},Q={x:h.x+E*G+w*B,z:h.z+A*G+P*B};if(!(Math.hypot(Q.x-N.x,Q.z-N.z)<r.minLeg)&&p(x,1,[N,Q]))return!0}}return!1};let f=8*t.length+16,g=!1;for(let x=0;x<r.passes;x++){let m=!1;for(let h=1;h+1<t.length&&f>0;h++){f--;const S=t[h-1],M=t[h],v=t[h+1];if(no())continue;const T=Math.hypot(M.x-S.x,M.z-S.z),_=Math.hypot(v.x-M.x,v.z-M.z);if(T<1e-9||_<1e-9)continue;const E=Ro([S,M,v])[1];let A=!1;if(E>r.hookTurn&&Math.min(T,_)<r.arc){if(A=p(h,1,[]),!A&&_<r.arc&&h+2<t.length){const b=t[h+1];A=p(h,2,[])||p(h,2,[{x:(M.x+b.x)/2,z:(M.z+b.z)/2}])}if(!A&&T<r.arc&&h>=2){const b=t[h-1];A=p(h-1,2,[])||p(h-1,2,[{x:(M.x+b.x)/2,z:(M.z+b.z)/2}])}}!A&&E>r.maxTurn&&(A=d(h)),A&&(m=!0,h=Math.max(0,h-3))}if(!m||(g=!0,f<=0))break}if(g)for(let x=1;x+1<t.length;x++){const m=t[x-1],h=t[x],S=t[x+1],M=S.x-m.x,v=S.z-m.z,T=M*M+v*v;if(T<1e-12||no())continue;const _=lr(((h.x-m.x)*M+(h.z-m.z)*v)/T,0,1);Math.hypot(h.x-(m.x+_*M),h.z-(m.z+_*v))>rn.route.tidyLine||!s(m,S)||u([...t.slice(0,x),...t.slice(x+1)])&&(t.splice(x,1),x--)}}function qu(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=s-e,c=r-n,u=o*c-a*l;if(Math.abs(u)<1e-9)return-1;const p=((e-i.x)*c-(n-i.z)*l)/u,d=((e-i.x)*a-(n-i.z)*o)/u;return p>=0&&p<=1&&d>=0&&d<=1?d:-1}function _f(i,t,e,n,s){const r=rn.route;for(const o of e)for(let a=0;a+1<t.length;a++){const l=t[a],c=t[a+1],u=qu(l,c,o.x0,o.z0,o.x1,o.z1);if(u<0)continue;const p=(o.x0+o.x1)/2,d=(o.z0+o.z1)/2;if(Math.abs(u-.5)*o.w<r.doorTol||yf(i,l,c,o.x0+(o.x1-o.x0)*u,o.z0+(o.z1-o.z0)*u,n+r.cornerMargin,r.doorLead))break;let f=-(o.z1-o.z0),g=o.x1-o.x0;o.n&&(f=o.n[0],g=o.n[1]);const x=Math.hypot(f,g)||1;f/=x,g/=x,f*(c.x-l.x)+g*(c.z-l.z)<0&&(f=-f,g=-g);const m=n+r.cornerMargin,h=Math.min(.5,m/Math.max(o.w,1e-6)),S=Math.max(h,Math.min(1-h,u)),M=[{x:p,z:d}];Math.abs(S-u)<1e-9&&Math.abs(u-.5)*o.w>=r.doorTol?M.push({x:o.x0+(o.x1-o.x0)*u,z:o.z0+(o.z1-o.z0)*u}):Math.abs(S-.5)>1e-9&&M.push({x:o.x0+(o.x1-o.x0)*S,z:o.z0+(o.z1-o.z0)*S});const v=[];for(const T of M)for(const _ of[r.doorLead,r.doorLead*.5,0]){const E={x:T.x,z:T.z,pin:!0};v.push(_>0?[{x:T.x-f*_,z:T.z-g*_,pin:!0},E,{x:T.x+f*_,z:T.z+g*_,pin:!0}]:[E])}for(const T of v){let _=!0,E=l,A=-Math.hypot(c.x-l.x,c.z-l.z),b=null;for(const y of[...T,c]){if(!s(E,y)){_=!1;break}A+=Math.hypot(y.x-E.x,y.z-E.z);const w=Math.atan2(y.x-E.x,y.z-E.z);if(T.length>1&&b!==null&&Math.abs(Rs(b,w))>r.doorTurn){_=!1;break}b=w,E=y}if(_&&A<=r.doorBudget){t.splice(a+1,0,...T);break}}break}}function yf(i,t,e,n,s,r,o){const a=e.x-t.x,l=e.z-t.z,c=Math.hypot(a,l);if(c<1e-6)return!0;const u=a/c,p=l/c,d=(n-t.x)*u+(s-t.z)*p;for(let f=Math.max(0,d-o);f<=Math.min(c,d+o)+1e-9;f+=.25){const g=t.x+u*f,x=t.z+p*f,m=i.locate(g,x);if(m&&i.wallDist(g,x,m)<r)return!1}return!0}function Mf(i,t){const e=rn.route;let n=!0;for(let s=0;n&&s<4;s++){n=!1;for(let r=1;r+1<i.length;r++){const o=i[r-1],a=i[r],l=i[r+1],c=l.x-o.x,u=l.z-o.z,p=c*c+u*u,d=Math.hypot(a.x-o.x,a.z-o.z),f=Math.hypot(l.x-a.x,l.z-a.z);let g=!1;if(p<1e-12)g=!0;else{const x=lr(((a.x-o.x)*c+(a.z-o.z)*u)/p,0,1);(Math.hypot(a.x-(o.x+x*c),a.z-(o.z+x*u))<=e.tidyLine||Math.min(d,f)<e.tidyShort&&Math.abs(Rs(Math.atan2(a.x-o.x,a.z-o.z),Math.atan2(l.x-a.x,l.z-a.z)))>e.tidySpike)&&(g=!0)}g&&(p<1e-12||t(o,l))&&(i.splice(r,1),r--,n=!0)}}}function Sf(i,t,e,n){const s=rn.route,r=e+s.cornerMargin,o=Math.cos(s.cornerTurn);for(let a=1;a+1<t.length;a++){const l=t[a-1],c=t[a],u=t[a+1];if(c.pin)continue;const p=Math.hypot(c.x-l.x,c.z-l.z),d=Math.hypot(u.x-c.x,u.z-c.z);if(p<1e-6||d<1e-6)continue;const f=(c.x-l.x)/p,g=(c.z-l.z)/p,x=(u.x-c.x)/d,m=(u.z-c.z)/d;if(f*x+g*m>o)continue;const h=i.locate(c.x,c.z);if(!h)continue;const S=i.wallDist(c.x,c.z,h);if(S>=r)continue;let M=f-x,v=g-m;const T=Math.hypot(M,v),_=[];T>1e-6&&_.push([M/T,v/T]);for(let y=0;y<s.cornerRing;y++){const w=y/s.cornerRing*Math.PI*2;_.push([Math.cos(w),Math.sin(w)])}const E=p+d;let A=null,b=S;for(let y=s.cornerStep;y<=s.cornerPush+1e-9&&!(A&&b>=r);y+=s.cornerStep){let w=null,P=1/0,U=0;for(const[H,$]of _){const G={x:c.x+H*y,z:c.z+$*y},B=i.locate(G.x,G.z,h.id);if(!B||B.solid||i.blocked(B,G.x,G.z))continue;const N=i.wallDist(G.x,G.z,B);if(N<=b+1e-6)continue;const Q=Math.hypot(G.x-l.x,G.z-l.z)+Math.hypot(u.x-G.x,u.z-G.z)-E,st=N>=r;w&&(w.meets&&!st||w.meets===st&&(st?Q>=P:N<=U))||!n(l,G)||!n(G,u)||(w={q:G,meets:st},P=Q,U=N)}w&&(A=w.q,b=U)}A&&(t[a]=A)}}function mi(i,t=null){const e={pts:i.pts,i:0,goal:i.goal,bestRem:1/0,stuck:0,age:0,blend:null,p0:t?{x:t.x,z:t.z}:null};return t&&t.speed>.5&&(e.blend={vx:t.vx,vz:t.vz}),e}function co(i,t,e,n,{arrive:s=!0,cap:r=1/0,chase:o=null}={}){const{reach:a,arriveTol:l,cornerFloor:c,cornerLook:u,stuckTime:p,stuckGain:d}=rn.route,f=t.pts;for(t.age+=n;t.i<f.length;){const y=f[t.i],w=Math.hypot(y.x-i.x,y.z-i.z),P=t.i===f.length-1;if(w<=(P?l:a)){t.i++;continue}if(!P&&w<=rn.route.passRadius){const U=t.i>0?f[t.i-1]:t.p0;if(U){const H=y.x-U.x,$=y.z-U.z,G=H*H+$*$;if(G>1e-9&&((i.x-U.x)*H+(i.z-U.z)*$)/G>=1){t.i++;continue}}}break}if(t.i>=f.length)return{vx:0,vz:0,done:!0,stuck:!1};const g=f[t.i],x=g.x-i.x,m=g.z-i.z,h=Math.hypot(x,m)||1e-9;let S=h;for(let y=t.i;y+1<f.length;y++)S+=Math.hypot(f[y+1].x-f[y].x,f[y+1].z-f[y].z);const M=i.decel;let v=Math.min(e,r);if(s&&(v=Math.min(v,Math.sqrt(2*M*.8*Math.max(0,S-l*.4))+.6)),o&&(v=Math.min(v,o.base+o.gain*S)),t.i<f.length-1&&h<u+i.speed*.15){const y=f[t.i+1],w=y.x-g.x,P=y.z-g.z,U=Math.hypot(w,P)||1,H=x/h*(w/U)+m/h*(P/U),$=e*lr(c+(1-c)*Math.max(0,H),c,1);v=Math.min(v,Math.sqrt($*$+2*M*.8*h))}S<t.bestRem-d?(t.bestRem=S,t.stuck=0):v>1&&(t.stuck+=n);const T=t.stuck>p;let _=x/h,E=m/h;if(t.i<f.length-1&&!(o!=null&&o.noLook)){const y=rn.route,w=lr(y.look+y.lookSpeed*i.speed,y.look,y.lookMax);if(h<w){let P=w-h,U=g.x,H=g.z;for(let G=t.i;G+1<f.length&&P>0;G++){const B=f[G+1],N=Math.hypot(B.x-f[G].x,B.z-f[G].z),Q=N>1e-9?Math.min(1,P/N):1;U=f[G].x+(B.x-f[G].x)*Q,H=f[G].z+(B.z-f[G].z)*Q,P-=N}const $=i.world;for(const G of[1,.6,.3,0]){const B=g.x+(U-g.x)*G,N=g.z+(H-g.z)*G;if(G>0&&$&&!$.walkClear(i.x,i.z,B,N,i.radius,i.cell))continue;const Q=Math.hypot(B-i.x,N-i.z);Q>1e-6&&(_=(B-i.x)/Q,E=(N-i.z)/Q);break}}}let A=_*v,b=E*v;if(t.blend&&t.age<rn.route.blendTime){const y=t.age/rn.route.blendTime,w=y*y*(3-2*y);A=t.blend.vx+(A-t.blend.vx)*w,b=t.blend.vz+(b-t.blend.vz)*w}return{vx:A,vz:b,done:!1,stuck:T}}const Ze=Rn,Le={vx:0,vz:0},dr=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z),In=i=>({x:i.x,z:i.z});class bf{constructor(t,e,n){this.G=t,this.body=e,this.mode="follow",this.order={type:"follow"},this.react=null,this.saved=null,this.patrol=null,this.side=t.rng()<.5?-1:1,this.lead={x:0,z:1},this.chasing=!1,this.slot=null,this.slotTimer=0,this.farTime=0,this.search=null,this.viaCentre=!1,this.stuckLog=[],this.goalCap=1/0,this.arrivedEmitted=!1}command(t){const e=this.G;if(!t||typeof t!="object")return this._reject(t,"bad-order");if(this.body.controlled)return this._reject(t,"controlled");const n=this._apply(t);return n.ok?(this.react=null,this.saved=null,e.emit("order-accepted","companion",{order:this._summary(t)}),{ok:!0}):this._reject(t,n.reason,n)}_summary(t){const e={type:t.type};return t.point&&(e.point=In(t.point)),t.waypoints&&(e.waypoints=t.waypoints.length),e}_reject(t,e,n={}){return this.G.emit("order-rejected","companion",{order:t&&t.type?this._summary(t):null,reason:e,...n.index!==void 0?{index:n.index}:{}}),{ok:!1,reason:e}}_apply(t){const{world:e}=this.G,n=this.body;switch(t.type){case"follow":return this._set("follow",{type:"follow"}),{ok:!0};case"hold":return this._set("hold",{type:"hold"}),{ok:!0};case"goto":{if(!dr(t.point))return{ok:!1,reason:"bad-point"};const s=Fn(e,n,t.point,n.radius);return s.ok?(this._set("goto",{type:"goto",point:In(s.goal)}),n._route=mi(s,n),this.arrivedEmitted=!1,{ok:!0}):{ok:!1,reason:s.reason}}case"patrol":{const s=t.waypoints;if(!Array.isArray(s)||!s.length||s.length>Ze.patrol.maxWaypoints)return{ok:!1,reason:"bad-waypoints"};const r=[];for(let a=0;a<s.length;a++){if(!dr(s[a]))return{ok:!1,reason:"bad-waypoint",index:a};const l=e.locate(s[a].x,s[a].z);if(!l)return{ok:!1,reason:"outside",index:a};if(l.solid)return{ok:!1,reason:"solid",index:a};const c=e.settle(s[a].x,s[a].z,n.radius);if(!c)return{ok:!1,reason:"cramped",index:a};r.push({x:c.x,z:c.z})}const o=Fn(e,n,r[0],n.radius);return o.ok?(this._set("patrol",{type:"patrol",waypoints:r.map(In),loop:t.loop!==!1}),this.patrol={pts:r,loop:t.loop!==!1,dwell:Number.isFinite(t.dwell)?t.dwell:Ze.patrol.dwell,idx:0,dir:1,wait:0,fails:0},n._route=mi(o,n),{ok:!0}):{ok:!1,reason:o.reason,index:0}}default:return{ok:!1,reason:"unknown-order"}}}_set(t,e){this.mode=t,this.order=e,this.body._route=null,this.slot=null,this.slotIdeal=null,this.slotTimer=0,this.chasing=!1,t!=="patrol"&&(this.patrol=null)}reactTo(t,e){const n=this.G,s=this.body;if(s.controlled)return!1;const r=()=>{this.mode!=="react"&&(this.saved={mode:this.mode,order:this.order,patrol:this.patrol?{...this.patrol}:null})};switch(t.type){case"goto":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;if(!dr(o))return!1;const a=Fn(n.world,s,o,s.radius);return a.ok?(r(),this.mode="react",this.react={kind:"goto",point:In(a.goal),giveUp:n.t+Ze.react.giveUp,dwell:Number.isFinite(t.dwell)?t.dwell:Ze.react.dwell,arrivedAt:null},s._route=mi(a,s),!0):(n.emit("order-rejected","companion",{order:{type:"goto",point:In(o)},reason:a.reason,source:"trigger"}),!1)}case"face":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;return dr(o)?(r(),this.mode="react",s._route=null,this.react={kind:"face",until:n.t+Ze.react.face,heading:Math.atan2(o.x-s.x,o.z-s.z)},!0):!1}case"hold":case"follow":case"patrol":{if(t.for>0){r();const a=this.saved;return this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type}).ok?(this.saved=a,this.react={kind:"mode",until:n.t+t.for},this.mode="react",this.reactInner=t.type,!0):(this.saved=null,this.mode==="react"&&(this.mode=a.mode),!1)}const o=this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type});return o.ok?(this.react=null,this.saved=null,!0):(n.emit("order-rejected","companion",{order:{type:t.type},reason:o.reason,source:"trigger"}),!1)}default:return!1}}_restore(){const t=this.saved;if(this.react=null,this.saved=null,this.reactInner=null,this.body._route=null,!t){this.mode="follow",this.order={type:"follow"};return}this.mode=t.mode,this.order=t.order,this.patrol=t.patrol,this.slot=null,this.slotTimer=0,this.G.emit("order-accepted","companion",{order:{type:t.order.type},source:"react-end"})}setControlled(t){const e=this.body;e.controlled=t,e._route=null,this.react=null,this.saved=null,this.patrol=null,t?(this.mode="direct",this.order={type:"direct"}):(this.mode="hold",this.order={type:"hold"}),this.chasing=!1,this.slot=null,this.slotTimer=0}think(t){if(this.body.controlled)return Le;switch(this.mode){case"hold":return this._hold(t);case"goto":return this._goto(t);case"patrol":return this._patrol(t);case"react":return this._react(t);default:return this._follow(t)}}_hold(){this.body._route=null;const t=this.G.bodies.avatar;return Math.hypot(t.x-this.body.x,t.z-this.body.z)<9&&(this.body._face=Math.atan2(t.x-this.body.x,t.z-this.body.z)),Le}_drive(t,e){const n=this.body,s=co(n,n._route,n.spec.speed,t,e);return s.done?(n._route=null,{vx:0,vz:0,done:!0}):s.stuck?(this._stuck(),{vx:0,vz:0,stuck:!0}):s}_goto(t){const e=this.body;if(!e._route){const s=Fn(this.G.world,e,this.order.point,e.radius);if(!s.ok)return this.G.emit("order-rejected","companion",{order:{type:"goto"},reason:s.reason,source:"replan"}),this._set("hold",{type:"hold"}),Le;e._route=mi(s,e)}const n=this._drive(t);return n.done?(this.G.emit("companion-arrived","companion",{mode:"goto",point:In(this.order.point)}),this.mode="hold",this.order={type:"hold",arrivedAt:In(this.order.point)},Le):n}_patrol(t){const e=this.patrol,n=this.body,s=this.G;if(!e)return this._set("hold",{type:"hold"}),Le;if(e.wait>0)return e.wait-=t,Le;if(!n._route){const o=Fn(s.world,n,e.pts[e.idx],n.radius);if(!o.ok)return++e.fails>=e.pts.length?(s.emit("order-rejected","companion",{order:{type:"patrol"},reason:"patrol-unreachable",source:"replan"}),this._set("hold",{type:"hold"}),Le):(this._advance(),Le);e.fails=0,n._route=mi(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"patrol",index:e.idx,point:In(e.pts[e.idx])}),e.wait=e.dwell,this._advance(),Le):r}_advance(){const t=this.patrol,e=t.pts.length;e!==1&&(t.loop?t.idx=(t.idx+1)%e:(t.idx+=t.dir,t.idx>=e?(t.dir=-1,t.idx=e-2):t.idx<0&&(t.dir=1,t.idx=1)))}_react(t){const e=this.react,n=this.body,s=this.G;if(!e)return this._restore(),Le;if(e.kind==="face")return n._face=e.heading,s.t>=e.until&&this._restore(),Le;if(e.kind==="mode"){if(s.t>=e.until)return this._restore(),Le;this.mode=this.reactInner;const o=this.think(t);return this.mode!==this.reactInner&&(this.reactInner="hold"),this.mode="react",o}if(e.arrivedAt!==null)return s.t-e.arrivedAt>=e.dwell&&this._restore(),Le;if(s.t>e.giveUp)return this._restore(),Le;if(!n._route){const o=Fn(s.world,n,e.point,n.radius);if(!o.ok)return this._restore(),Le;n._route=mi(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"react",point:In(e.point)}),e.arrivedAt=s.t,Le):r}_follow(t){const e=this.G,n=this.body,s=Ze.follow,r=e.world,o=e.bodies.avatar,a=o.x-n.x,l=o.z-n.z,c=Math.hypot(a,l);if(o.speed>.8){const g=Math.min(1,6*t),x=this.lead.x+(o.vx/o.speed-this.lead.x)*g,m=this.lead.z+(o.vz/o.speed-this.lead.z)*g,h=Math.hypot(x,m)||1;this.lead={x:x/h,z:m/h}}this.farTime=c>s.blinkDistance?this.farTime+t:0,this.search&&this._stepSearch(o);const u=r.cell(n.cell),p=c>1.6&&r.inDoorway(n.x,n.z,u,s.doorClear*.7);if(!this.chasing&&(c>s.start||p)&&(this.chasing=!0,this.slotTimer=0),this.slotTimer-=t,this.chasing&&this.slotTimer<=0&&!this.search&&(!n._route||this._stale(o,c))){this.slotTimer=s.reslot;const g=this._chooseSlot(o,c);g?this._adopt(g):this._beginSearch(o)}if(!this.chasing)return n._route=null,n._face=Math.atan2(a,l),Le;if(!n._route)return Le;const d=c>s.catchup,f=co(n,n._route,d?n.spec.catchupSpeed:n.spec.speed,t,{arrive:!1,chase:{base:Math.min(o.speed*1.05,n.spec.speed)+.5,gain:3}});return f.done?(n._route=null,c<s.stop&&o.speed<.5&&(this.chasing=!1,e.emit("companion-arrived","companion",{mode:"follow",point:In(this.slot??n)})),Le):f.stuck?(this._stuck(),Le):f}_predict(t){const e=Ze.follow,n=this.G.world;if(t.speed<.8)return{x:t.x,z:t.z};const s=t.x+t.vx*e.lead,r=t.z+t.vz*e.lead;return n.walkClear(t.x,t.z,s,r,this.body.radius,t.cell)?{x:s,z:r}:{x:t.x,z:t.z}}_ideal(t){const e=Ze.follow,n=this.lead.x,s=this.lead.z;return{x:t.x-n*e.distance+-s*e.lateral*this.side,z:t.z-s*e.distance+n*e.lateral*this.side}}_stale(t,e=0){const n=Ze.follow,s=this.body._route;if(!s||!this.slotIdeal)return!0;const r=this._ideal(this._predict(t));return Math.hypot(r.x-this.slotIdeal.x,r.z-this.slotIdeal.z)>n.replanDist*Math.max(1,e/n.farScale)?!0:s.age>n.reslotMax&&t.speed>.5}_chooseSlot(t,e){const n=this.G,s=this.body,r=Ze.follow,o=n.world,a=this.lead.x,l=this.lead.z,c=-l,u=a,p=this._predict(t);this.slotIdeal=this._ideal(p);const d=[],f=(v,T,_)=>d.push({x:p.x+v,z:p.z+T,tag:_}),g=-a*r.distance,x=-l*r.distance;f(g+c*r.lateral*this.side,x+u*r.lateral*this.side),f(g-c*r.lateral*this.side,x-u*r.lateral*this.side,"mirror"),f(g,x);const m=d[0],h=[];for(const v of[1.1,2.2,3.4])for(let T=0;T<8;T++){const _=T/8*Math.PI*2;h.push({x:m.x+Math.cos(_)*v,z:m.z+Math.sin(_)*v,tag:"ring"})}h.sort((v,T)=>Math.hypot(v.x-m.x,v.z-m.z)-Math.hypot(T.x-m.x,T.z-m.z)),d.push(...h);let S=0;for(const v of d){const T=o.locate(v.x,v.z);if(!T||T.solid||o.wallDist(v.x,v.z,T)<s.radius+r.wallClear||o.inDoorway(v.x,v.z,T,r.doorClear))continue;const _=Math.hypot(v.x-t.x,v.z-t.z);if(_<t.radius+s.radius+.8||_>r.start-.8)continue;if(++S>3)break;const E=Fn(o,s,v,s.radius,{maxExpand:r.slotBudget});if(E.ok&&Math.hypot(E.goal.x-v.x,E.goal.z-v.z)<1.5)return v.tag==="mirror"&&(this.side=-this.side),E}const M=Fn(o,s,{x:t.x,z:t.z},s.radius,{maxExpand:r.slotBudget*5});return M.ok?this._stopShort(M,t,r.distance*.8):null}_adopt(t){const e=this.body,n=this.G,s=n.world;if(this.viaCentre){this.viaCentre=!1;const r=s.cell(e.cell),o=r&&s.settle(r.cx,r.cz,e.radius);o&&s.walkClear(e.x,e.z,o.x,o.z,e.radius,r.id)&&(t={...t,pts:[{x:o.x,z:o.z},...t.pts]})}this.slot=t.goal,e._route=mi(t,e),n.stats.replans++}_beginSearch(t){const e=this.G,n=this.body,s=Ze.follow,r=this._predict(t);this.slotIdeal=this._ideal(r);let o=_a(e.world,n,r,n.radius);if(o.ok||(o=_a(e.world,n,{x:t.x,z:t.z},n.radius)),!o.ok){this.slotTimer=s.retry;return}this.search={sp:o,leader:{x:t.x,z:t.z}}}_stepSearch(t){this.G;const e=Ze.follow;this.body;const n=this.search,s=n.sp.search;let r=s.step(e.searchStep);if(r==="running"&&s.expanded>e.searchMax&&(r="fail"),r==="running")return;this.search=null;let o=null;if(r==="done")o=n.sp.finish();else{const a=s.partial();a&&a.cells.length>1&&(o=n.sp.finish(a)),this.slotTimer=Math.max(this.slotTimer,e.retry)}o&&o.ok&&this._adopt(Math.hypot(o.goal.x-t.x,o.goal.z-t.z)<1.5?this._stopShort(o,t,e.distance*.8):o)}_stopShort(t,e,n){const s=t.pts;let r=this.body.x,o=this.body.z;for(let a=0;a<s.length;a++){const l=s[a];if(Math.hypot(l.x-e.x,l.z-e.z)<n){let c=0,u=1;for(let f=0;f<14;f++){const g=(c+u)/2;Math.hypot(r+(l.x-r)*g-e.x,o+(l.z-o)*g-e.z)<n?u=g:c=g}const p={x:r+(l.x-r)*c,z:o+(l.z-o)*c},d=s.slice(0,a);return d.push(p),{...t,pts:d,goal:{...t.goal,x:p.x,z:p.z}}}r=l.x,o=l.z}return t}_stuck(){const t=this.G,e=this.body,n=this.stuckLog;for(n.push(t.t);n.length&&t.t-n[0]>Ze.recovery.window;)n.shift();const s=n.length;if(e._route=null,this.slotTimer=0,s===1){t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z});return}if(s===2){const r=t.world.cell(e.cell);t.world.settle(r.cx,r.cz,e.radius)&&(this.viaCentre=!0),t.emit("companion-stuck-recovered","companion",{method:"detour",x:e.x,z:e.z});return}n.length=0,this.mode==="follow"?t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z}):(t.emit("companion-stuck-recovered","companion",{method:"skip",x:e.x,z:e.z}),this.mode==="patrol"?this._advance():this.mode==="goto"?this._set("hold",{type:"hold"}):this.mode==="react"&&this._restore())}_blink(t){const e=this.G,n=this.body,s=e.bodies.avatar,r=e.world.settle(s.x-this.lead.x*Ze.follow.distance,s.z-this.lead.z*Ze.follow.distance,n.radius,Ze.follow.wallClear)??e.world.settle(s.x,s.z,n.radius);r&&(n.teleport(r),this.farTime=0,this.chasing=!1,e.stats.blinks++,e.emit("companion-stuck-recovered","companion",{method:"resync",why:t,x:n.x,z:n.z}))}}const pr=Rn.triggers,wf=new Set(["enter-cell","avatar-distance","noise","sighted","interval","avatar-stopped"]),Ef=new Set(["goto","hold","follow","patrol","face","emit"]),Jl=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z);function Tf(i){if(!i||typeof i!="object")return"not-an-object";const t=i.when,e=i.do;return!t||!wf.has(t.type)?"bad-when":!e||!Ef.has(e.type)?"bad-do":t.type==="enter-cell"&&!(Array.isArray(t.cells)&&t.cells.length)&&t.sector===void 0?"enter-cell-needs-cells-or-sector":t.type==="avatar-distance"&&!(Number.isFinite(t.lt)||Number.isFinite(t.gt))?"avatar-distance-needs-lt-or-gt":t.type==="noise"&&!(t.radius>0)?"noise-needs-radius":t.type==="interval"&&!(t.every>0)?"interval-needs-every":t.type==="avatar-stopped"&&!(t.for>0)?"avatar-stopped-needs-for":(e.type==="goto"||e.type==="face")&&!Jl(e.point)&&e.point!=="source"?"action-needs-point":e.type==="patrol"&&!(Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(Jl))?"patrol-needs-waypoints":e.type==="emit"&&(typeof e.event!="string"||!e.event)?"emit-needs-event":e.point==="source"&&t.type!=="noise"&&t.type!=="sighted"?"source-needs-noise-or-sighted":null}class Af{constructor(){this.rules=[],this.state=new Map,this.signals=[],this.auto=0}set(t,e){const n=[],s=[],r=[],o=new Map;for(const a of Array.isArray(t)?t:[]){const l=(a==null?void 0:a.id)??`rule-${++this.auto}`,c=r.length>=pr.maxRules?"too-many-rules":Tf(a);if(c){s.push({id:l,reason:c});continue}const u={id:l,when:a.when,do:a.do,repeat:a.repeat?a.repeat===!0?pr.repeat:Number(a.repeat):0,once:!!a.once,enabled:a.enabled!==!1},p=JSON.stringify(u.when),d=this.state.get(l);o.set(l,d&&d.key===p?d:{key:p,fired:0,last:-1/0,was:null,latched:!1,nextAt:e+(u.when.every??0),done:!1,stopped:0}),r.push(u),n.push(l)}return this.rules=r,this.state=o,{accepted:n,rejected:s}}signal(t){this.signals.length<pr.maxSignals&&this.signals.push(t)}describe(){return this.rules.map(t=>{const e=this.state.get(t.id);return{id:t.id,type:t.when.type,enabled:t.enabled,fired:e.fired,last:Number.isFinite(e.last)?e.last:null,active:!!e.was||e.latched}})}tick(t){const e=[],{t:n,dt:s}=t,r=Math.hypot(t.avatar.x-t.companion.x,t.avatar.z-t.companion.z),o=t.avatar.speed<.1,a=this.signals;this.signals=[];for(const l of this.rules){if(e.length>=pr.maxFiresPerTick)break;const c=this.state.get(l.id),u=l.when;let p=!1,d=null,f=null;switch(u.type){case"enter-cell":{const g=t.cellChange;if(g){const x=m=>u.cells?u.cells.includes(m.id):u.sector!==void 0&&t.sectorOf(m)===u.sector;p=!x(g.from)&&x(g.to)}break}case"avatar-distance":f=Number.isFinite(u.lt)?r<u.lt:r>u.gt;break;case"avatar-stopped":c.stopped=o?c.stopped+s:0,f=c.stopped>=u.for;break;case"interval":n>=c.nextAt&&(p=!0,c.nextAt=n+u.every);break;case"noise":for(const g of a){if(g.type!=="noise")continue;if(Math.hypot(g.x-t.companion.x,g.z-t.companion.z)<=Math.min(u.radius,g.radius??1/0)){p=!0,d=g;break}}break;case"sighted":for(const g of a)if(g.type==="sighted"&&(u.target===void 0||u.target===g.target)){p=!0,d=g;break}break}if(f!==null)if(c.was===null)c.was=f;else{const g=f&&!c.was,x=l.repeat>0&&f&&c.was&&n-c.last>=l.repeat;p=g||x,c.was=f}!l.enabled||c.done||p&&(c.fired++,c.last=n,l.once&&(c.done=!0),e.push({rule:l,signal:d}))}return e}}const We=Rn,Xe=i=>Math.round(i*1e3)/1e3;function Rf(i,{spawnCell:t,seed:e=1,tuning:n={}}={}){const s=df(i),r=Zh(e),o={ticks:0,substeps:0,contacts:0,violations:0,blinks:0,replans:0},a=[];let l=0,c=0,u=0;const p={world:s,rng:r,stats:o,bodies:null,get t(){return l},emit(L,X,et){a.push({t:Xe(l),type:L,actor:X,...et}),a.length>We.events.max&&a.shift()}},d=L=>L==null?null:typeof L=="object"?L:s.cell(L);let f=d(t)??d(i.startCell);if((!f||f.solid)&&(f=(f==null?void 0:f.neighbors.map(L=>s.cell(L.id)).find(L=>!L.solid))??null),!f)throw new Error("createActors: no open spawn cell");const g={...We.avatar,...n.avatar},x={...We.companion,...n.companion},m=s.settle(f.cx,f.cz,g.radius,.2);if(!m)throw new Error("createActors: spawn cell has no room");const h=new $l("avatar",g,m);let S=null;for(const[L,X]of[[-1.7,1.2],[1.7,1.2],[-1.7,-1.2],[1.7,-1.2],[0,2.6],[0,-2.6],[3.2,0],[-3.2,0]]){const et=s.settle(m.x+L,m.z+X,x.radius,.1);if(et&&Math.hypot(et.x-m.x,et.z-m.z)>=g.radius+x.radius+.4){S=et;break}}if(!S)throw new Error("createActors: no room for the companion");const M=new $l("companion",x,S);h.world=M.world=s,p.bodies={avatar:h,companion:M},h.controlled=!0,h.mode="direct",M.mode="follow";const v=new bf(p,M,e),T=new Af,_=L=>p.bodies[L];let E={ax:0,az:0,run:!1,aim:null,stop:!1};const A={avatar:null,companion:null};let b=h.cell,y=U(s.cell(h.cell)),w=0;const P=Math.atan2(M.x-h.x,M.z-h.z);h.heading=h.pheading=P,M.heading=M.pheading=P+Math.PI;function U(L){var X,et;return L.sector??((et=(X=i.sectorAt)==null?void 0:X.call(i,L.cx,L.cz))==null?void 0:et.id)}const H=()=>h.controlled?h:M;function $(L,X,et,{quiet:tt=!1}={}){const dt=zt=>(tt||p.emit("order-rejected",L.id,{order:{type:"moveTo",point:{x:X,z:et}},reason:zt}),{ok:!1,reason:zt});if(!Number.isFinite(X)||!Number.isFinite(et))return dt("bad-point");const V=Fn(s,L,{x:X,z:et},L.radius);return V.ok?(L._route=mi(V,L),L._replans=0,tt||p.emit("order-accepted",L.id,{order:{type:"moveTo",point:{x:Xe(V.goal.x),z:Xe(V.goal.z)}}}),{ok:!0,target:{x:V.goal.x,z:V.goal.z},length:V.length}):dt(V.reason)}function G(L,X){if(h.controlled&&(E.ax||E.az)){const et=Fn(s,h,{x:L,z:X},h.radius);return et.ok?(A.avatar={x:L,z:X},p.emit("order-accepted","avatar",{order:{type:"moveTo",point:{x:L,z:X}},deferred:!0}),{ok:!0,deferred:!0}):(p.emit("order-rejected","avatar",{order:{type:"moveTo",point:{x:L,z:X}},reason:et.reason}),{ok:!1,reason:et.reason})}return $(h,L,X)}function B(L){const X=v.command(L);return M.mode=v.mode,X}function N(L){if(L!=="avatar"&&L!=="companion")return{ok:!1,reason:"unknown-actor"};if(_(L).controlled)return{ok:!0,unchanged:!0};const et=H();return et._route=null,A.avatar=A.companion=null,et===h?(h.controlled=!1,h.mode="hold",v.setControlled(!0)):(v.setControlled(!1),h.controlled=!0,h.mode="direct"),M.mode=v.mode,p.emit("control-changed",L,{from:et.id}),{ok:!0}}function Q(L){const X=T.set(L,l);for(const et of X.rejected)p.emit("order-rejected","companion",{rule:et.id,reason:et.reason});return X}function st(L,X){const et=L.spec,tt=E.ax!==0||E.az!==0,dt=E.run?et.runSpeed??et.catchupSpeed??et.speed:et.speed;if(tt)return L._route=null,{vx:E.ax*dt,vz:E.az*dt};const V=A[L.id];if(V&&(A[L.id]=null,$(L,V.x,V.z,{quiet:!0})),E.stop)return L._route=null,{vx:0,vz:0};if(!L._route)return{vx:0,vz:0};const zt=co(L,L._route,dt,X);if(zt.done){const vt=L._route.goal;return L._route=null,p.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:Xe(vt.x),z:Xe(vt.z)}}),{vx:0,vz:0}}if(zt.stuck){const vt=L._route.goal;return L._replans=(L._replans??0)+1,L._replans<=1?$(L,vt.x,vt.z,{quiet:!0}):(L._route=null,p.emit("avatar-blocked",L.id,{x:Xe(L.x),z:Xe(L.z),reason:"stuck"})),{vx:0,vz:0}}return zt}function Mt(L,X,et){const tt=L.x-X.x,dt=L.z-X.z,V=Math.hypot(tt,dt),zt=L.radius+X.radius+We.separation.gap;if(V>=zt)return;const vt=V>1e-6?tt/V:1,At=V>1e-6?dt/V:0,Ct=We.separation.push*(1-V/zt);et.vx+=vt*Ct,et.vz+=At*Ct}function Pt(L,X){let et=null,tt=0;L.controlled&&E.aim?et=Math.atan2(E.aim.x-L.x,E.aim.z-L.z):L.speed>We.facing.minSpeed?(et=Math.hypot(L._want.x,L._want.z)>.5?Math.atan2(L._want.x,L._want.z):Math.atan2(L.vx,L.vz),tt=We.facing.tau):L._face!=null&&(et=L._face),L._face=null,et!==null&&Number.isFinite(et)&&L.face(X,et,tt)}function Et(L){l+=L,o.ticks++,u++;for(const vt of[h,M])vt.px=vt.x,vt.pz=vt.z,vt.pheading=vt.heading;E.run&&H().speed>1?(w+=L,w>=We.noise.runEvery&&(w=0,T.signal({type:"noise",x:H().x,z:H().z,radius:We.noise.run,source:H().id}))):w=0;const X=s.live(h.cell),et=s.live(M.cell);let tt={vx:0,vz:0};X&&(tt=h.controlled?st(h,L):h._route?rt(h,L):tt,!h.controlled&&et&&Mt(h,M,tt)),h.step(s,o,L,tt.vx,tt.vz),Pt(h,L);let dt;et?M.controlled?dt=st(M,L):!X&&v.mode==="follow"?dt={vx:0,vz:0}:(dt=v.think(L),dt={vx:dt.vx,vz:dt.vz},X&&Mt(M,h,dt)):dt={vx:0,vz:0},M.step(s,o,L,dt.vx,dt.vz),Pt(M,L),M.mode=v.mode;let V=null;if(h.cell!==b){const vt=s.cell(b),At=s.cell(h.cell);p.emit("avatar-entered-cell","avatar",{cell:h.cell,from:b});const Ct=At?U(At):void 0;Ct!==void 0&&Ct!==y&&(p.emit("avatar-entered-sector","avatar",{sector:Ct,from:y}),y=Ct),V={from:vt,to:At},b=h.cell}for(const vt of[h,M])vt._blocked>.3&&!vt._blockedFired&&vt.controlled&&(vt._blockedFired=!0,p.emit("avatar-blocked",vt.id,{x:Xe(vt.x),z:Xe(vt.z)}));const zt=T.tick({t:l,dt:L,avatar:h,companion:M,cellChange:V,sectorOf:U});for(const vt of zt){const At=vt.rule.do,Ct=M.controlled&&At.type!=="emit";p.emit("trigger-fired","companion",{rule:vt.rule.id,when:vt.rule.when.type,...vt.signal?{at:{x:Xe(vt.signal.x),z:Xe(vt.signal.z)}}:{},...Ct?{ignored:"controlled"}:{}}),At.type==="emit"?p.emit(String(At.event),"companion",{rule:vt.rule.id}):Ct||v.reactTo(At,vt.signal)}M.mode=v.mode}function rt(L,X){const et=co(L,L._route,L.spec.speed,X);if(et.done){const tt=L._route.goal;return L._route=null,p.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:Xe(tt.x),z:Xe(tt.z)}}),{vx:0,vz:0}}return et.stuck?(L._route=null,p.emit("avatar-blocked",L.id,{x:Xe(L.x),z:Xe(L.z),reason:"stuck"}),{vx:0,vz:0}):et}function nt(L,X={}){var zt,vt;if(!(L>0))return;L=Math.min(L,We.maxFrame);let et=Number((zt=X.axis)==null?void 0:zt.x)||0,tt=Number((vt=X.axis)==null?void 0:vt.z)||0;const dt=Math.hypot(et,tt);if(dt<.05?et=tt=0:dt>1&&(et/=dt,tt/=dt),E={ax:et,az:tt,run:!!X.run,aim:X.aim&&Number.isFinite(X.aim.x)&&Number.isFinite(X.aim.z)?X.aim:null,stop:!!X.stop},X.moveTo){const At=H();At===h?G(X.moveTo.x,X.moveTo.z):et||tt?A[At.id]={x:X.moveTo.x,z:X.moveTo.z}:$(At,X.moveTo.x,X.moveTo.z)}c+=L;let V=Math.floor(c/We.tick+1e-9);for(c-=V*We.tick,c<0&&(c=0);V-- >0;)Et(We.tick)}function Tt(L,X=c/We.tick){const et=_(L);if(!et)return null;const tt=Math.min(1,Math.max(0,X)),dt=Rs(et.pheading,et.heading);return{x:et.px+(et.x-et.px)*tt,z:et.pz+(et.z-et.pz)*tt,heading:et.pheading+dt*tt,vx:et.vx,vz:et.vz,speed:et.speed,moving:et.moving}}function _t(L){const X=L.pub();return X.mode=L.mode,X.moving=L.moving,X.render=Tt(L.id),X}return{avatar:h,companion:M,update:nt,pose:Tt,get alpha(){return c/We.tick},tickLength:We.tick,commandAvatarTo:G,commandCompanion:B,possess:N,setStandingOrders:Q,signal(L){return!L||!Number.isFinite(L.x)||!Number.isFinite(L.z)||L.type!=="noise"&&L.type!=="sighted"?!1:(T.signal({...L}),!0)},drainEvents(){const L=a.slice();return a.length=0,L},snapshot(){const L=_t(M);return L.order=v.order,L.react=v.react?{...v.react}:null,v.mode==="follow"&&(L.follow={state:v.chasing?"heading":"formed",planning:!!v.search}),v.mode==="patrol"&&v.patrol&&(L.patrol={index:v.patrol.idx,loop:v.patrol.loop,count:v.patrol.pts.length}),{t:Xe(l),tick:u,alpha:Xe(c/We.tick),controlled:H().id,avatar:_t(h),companion:JSON.parse(JSON.stringify(L)),rules:T.describe(),stats:{...o}}},path(L){const X=L==="avatar"?h:L==="companion"?M:null,et=X==null?void 0:X._route;return et?et.pts.slice(et.i).map(tt=>({x:tt.x,z:tt.z})):[]},world:s,get time(){return l},get controlledId(){return H().id}}}function Ql({from:i,to:t,length:e,world:n,knows:s=()=>!0,step:r=.2}){const o=t.x-i.x,a=t.z-i.z,l=Math.sqrt(o*o+a*a),c=l>1e-9?o/l:0,u=l>1e-9?a/l:0,p=Math.max(0,e??0),d=Math.max(1,Math.ceil(p/r));let f={x:i.x,z:i.z},g=null;for(let x=1;x<=d;x++){const m=x*p/d,h=i.x+c*m,S=i.z+u*m;if(!s(h,S))return{stop:"sight",end:f,wall:null,hitDist:null};const M=n.locate(h,S,g);if(!M)return{stop:"sight",end:f,wall:null,hitDist:null};if(n.blocked(M,h,S))return{stop:"wall",end:f,wall:{x:h,z:S},hitDist:m};g=M.id,f={x:h,z:S}}return{stop:"range",end:f,wall:null,hitDist:null}}const Cf=.6,Pf=i=>Math.round(i*10)/10,$u={"scan-cast":{gate:(i,t,e)=>{const n=e.ports.pingState();return n.ready?null:n.reason??"cooldown"},run:(i,t)=>{const e=i.at??t.posOf(i.src.id),n=t.ports.ping(e.x,e.z,{mode:i.data.scanMode});return n==null?{ok:!1,reason:"in-wall"}:(t.scratch.lastPing={src:i.src.id,t:i.t,pingId:n,from:{x:e.x,z:e.z}},{ok:!0,kind:"pulse",pingId:n})}},reveal:{run:(i,t)=>{const e=t.scratch.lastPing;return!e||e.src!==i.src.id||e.t!==i.t?null:(t.limitPing(e.pingId,{from:e.from,to:{x:i.at.x,z:i.at.z},length:i.data.length??0,radius:i.data.radius}),t.state.add("hint",{from:e.from,to:{x:i.at.x,z:i.at.z},t0:i.t,until:i.t+i.data.duration}),{ok:!0,kind:"limit",pingId:e.pingId})}},marker:{gate:(i,t,e)=>{const{x:n,z:s}=t.at;if(!e.ports.knows(n,s))return"unknown-ground";const r=e.ports.world.locate(n,s);return r?e.ports.world.blocked(r,n,s)?"solid":null:"unknown-ground"},run:(i,t)=>{const{kind:e,radius:n}=i.data,s=i.at,r=t.state.markNear(e,s.x,s.z,n);if(r)return t.state.removeMark(r.id),{ok:!0,kind:"marker",action:"removed",text:"Marker taken down"};const o=t.ports.world.locate(s.x,s.z);return t.state.addMark({kind:e,x:o?o.cx:s.x,z:o?o.cz:s.z,cell:o?o.id:null}),{ok:!0,kind:"marker",action:"placed",text:"Marker placed"}}},move:{gate:(i,t,e)=>{const n=t.at.x-t.pos.x,s=t.at.z-t.pos.z,r=Math.sqrt(n*n+s*s),o=Ql({from:t.pos,to:t.at,length:r,world:e.ports.world,knows:e.ports.knows});return o.stop==="sight"?"unknown-ground":o.stop==="wall"?"no-route":null},run:(i,t)=>{const e=t.ports.move(i.src.id,i.data.to);return(e==null?void 0:e.ok)===!1?{ok:!1,reason:e.reason??"no-route"}:{ok:!0,kind:"move"}}},trace:{run:(i,t)=>{var c;const{item:e,length:n,to:s,family:r}=i.data,o=Ql({from:i.at,to:s,length:n,world:t.ports.world,knows:t.ports.knows}),a=((c=Jh[e])==null?void 0:c.label)??e;t.state.add("trace",{from:{x:i.at.x,z:i.at.z},to:o.end,wall:o.wall,family:r,t0:i.t,until:i.t+Cf});const l=o.stop==="wall"?`${a} struck a wall ${Pf(o.hitDist)} units out`:o.stop==="sight"?`${a} struck something beyond sight`:`${a} hit nothing in reach`;return{ok:!0,kind:"trace",stop:o.stop,text:l}}},"status-applied":{run:(i,t)=>i.data.status!=="shrouded"?null:(t.state.put("halo",i.data.targetId,{who:i.data.targetId,t0:i.t,until:i.t+i.data.duration}),{ok:!0,kind:"halo"})},"identifier-placed":{run:(i,t)=>{if(i.data.kind!=="decoy")return null;const e=i.data.duration==null?1/0:i.t+i.data.duration;return t.state.add("beacon",{at:{x:i.at.x,z:i.at.z},t0:i.t,until:e}),{ok:!0,kind:"beacon",text:"Decoy beacon planted (placeholder: the scan does not echo it yet)"}}},"device-deployed":{run:(i,t)=>i.data.defId!=="booster"?null:(t.state.put("beacon",i.data.instanceId,{at:{x:i.at.x,z:i.at.z},t0:i.t,until:1/0}),{ok:!0,kind:"device",text:"Scan booster planted"})},"device-triggered":{run:(i,t)=>(t.state.drop("beacon",i.data.instanceId),null)},"scan-boost":{run:(i,t)=>(t.scratch.boost={factor:i.data.factor,until:i.t+i.data.duration},{ok:!0,kind:"boost",text:`Scan booster armed: the next scan travels ${i.data.factor}x as far for ${i.data.duration} s`})},damage:{run:()=>null},impulse:{run:()=>null},disable:{run:()=>null},"scan-mask":{unwired:"has no world consumer yet"},jam:{unwired:"has no world consumer yet"},"zone-placed":{unwired:"has no world consumer yet"},"checkpoint-set":{unwired:"has no world consumer yet"},unlock:{unwired:"has no world consumer yet"}},Co=(i,t)=>typeof t=="string"&&Object.prototype.hasOwnProperty.call(i,t)?i[t]:void 0;function Lf({table:i=$u,env:t,warn:e=n=>console.warn(n)}){const n=new Set,s=(r,o)=>{n.has(r)||(n.add(r),e(`effects: '${r}' ${o}; ignored`))};return{types:()=>Object.keys(i),has:r=>Co(i,r)!==void 0,apply(r){const o=r==null?void 0:r.type,a=Co(i,o);return a?a.unwired?(s(o,a.unwired),null):a.run?a.run(r,t)??null:null:(s(String(o),"has no entry"),null)},gate(r,o){for(const a of(r==null?void 0:r.effects)??[]){const l=Co(i,a.type);if(!(l!=null&&l.gate))continue;const c=l.gate(a,o,t);if(c)return c}return null}}}const zf=16;function If({session:i,state:t,ports:e,table:n=$u,warn:s}){const r={},o=new Set,a=new Map,l=new Map,c=x=>{if(x&&(x.text||x.reason))for(const m of[...o])m(x)},p=Lf({table:n,env:{ports:e,state:t,scratch:r,posOf:x=>e.posOf(x),limitPing(x,m){if(a.size>=zf){const[h,S]=a.entries().next().value;for(const M of S.waves)l.delete(M);a.delete(h)}a.set(x,{...m,waves:new Set})}},warn:s}),d=Object.keys(n).map(x=>i.bus.on(x,m=>c(p.apply(m)))),f=({who:x,item:m,def:h,pos:S,aim:M})=>{if(!h)return null;const v=Qh(S,M??S,h.range??0);return p.gate(h,{who:x,item:m,def:h,pos:S,at:v})};i.gate=f;const g=(x,m)=>{const h=e.cellAt(x);if(!h)return!1;const S=m.from.x,M=m.from.z,v=m.to.x-S,T=m.to.z-M,_=Math.sqrt(v*v+T*T),E=_>1e-9?S+v/_*m.length:S,A=_>1e-9?M+T/_*m.length:M,b=E-S,y=A-M,w=b*b+y*y,P=w>0?Math.max(0,Math.min(1,((h.cx-S)*b+(h.cz-M)*y)/w)):0,U=h.cx-(S+b*P),H=h.cz-(M+y*P);return Math.sqrt(U*U+H*H)<=m.radius};return{state:t,dispatcher:p,onReport(x){return o.add(x),()=>o.delete(x)},boost(){const x=r.boost;return x&&i.vitals.t<x.until?x.factor:null},spendBoost(){r.boost=null},filterScan(x){if(!a.size)return x;const m=[];for(const h of x){if(h.type==="wave-started"&&a.has(h.pingId)&&(a.get(h.pingId).waves.add(h.waveId),l.set(h.waveId,h.pingId)),h.type==="cell-reached"&&l.has(h.waveId)){const S=a.get(l.get(h.waveId));if(!S||!g(h.cell,S))continue}m.push(h)}return m},dispose(){for(const x of d)x();d.length=0,i.gate===f&&(i.gate=null),o.clear(),a.clear(),l.clear(),r.boost=null}}}function Df(){let i=0;const t=[],e=[];return{marks:t,fx:e,addMark({kind:n,x:s,z:r,cell:o=null}){const a={id:++i,kind:n,x:s,z:r,cell:o};return t.push(a),a},markNear(n,s,r,o){let a=null,l=1/0;for(const c of t){if(c.kind!==n)continue;const u=Math.sqrt((c.x-s)*(c.x-s)+(c.z-r)*(c.z-r));u<=o&&u<l&&(a=c,l=u)}return a},removeMark(n){const s=t.findIndex(r=>r.id===n);return s<0?!1:(t.splice(s,1),!0)},add(n,s){const r={id:++i,kind:n,...s};return e.push(r),r},put(n,s,r){const o=e.find(a=>a.kind===n&&a.key===s);return o?Object.assign(o,r):this.add(n,{key:s,...r})},drop(n,s){for(let r=e.length-1;r>=0;r--)e[r].kind===n&&e[r].key===s&&e.splice(r,1)},prune(n){for(let s=e.length-1;s>=0;s--)e[s].until<=n&&e.splice(s,1)},clear(){t.length=0,e.length=0}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xl="170",Uf=0,tc=1,Nf=2,Yu=1,Ff=2,Zn=3,wi=0,cn=1,Ae=2,ni=0,gs=1,He=2,ec=3,nc=4,Of=5,Fi=100,kf=101,Bf=102,Gf=103,Hf=104,Vf=200,Wf=201,Xf=202,qf=203,ya=204,Ma=205,$f=206,Yf=207,jf=208,Kf=209,Zf=210,Jf=211,Qf=212,td=213,ed=214,Sa=0,ba=1,wa=2,ys=3,Ea=4,Ta=5,Aa=6,Ra=7,vl=0,nd=1,id=2,bi=0,ju=1,Ku=2,Zu=3,Ju=4,sd=5,Qu=6,th=7,eh=300,Ms=301,Ss=302,Ca=303,Pa=304,mo=306,uo=1e3,ki=1001,La=1002,gn=1003,rd=1004,mr=1005,Pn=1006,Po=1007,Bi=1008,Hn=1009,nh=1010,ih=1011,cr=1012,_l=1013,Hi=1014,Bn=1015,Gn=1016,yl=1017,Ml=1018,bs=1020,sh=35902,rh=1021,oh=1022,Ln=1023,ah=1024,lh=1025,xs=1026,ws=1027,go=1028,Sl=1029,ch=1030,bl=1031,wl=1033,io=33776,so=33777,ro=33778,oo=33779,za=35840,Ia=35841,Da=35842,Ua=35843,Na=36196,Fa=37492,Oa=37496,ka=37808,Ba=37809,Ga=37810,Ha=37811,Va=37812,Wa=37813,Xa=37814,qa=37815,$a=37816,Ya=37817,ja=37818,Ka=37819,Za=37820,Ja=37821,ao=36492,Qa=36494,tl=36495,uh=36283,el=36284,nl=36285,il=36286,od=3200,ad=3201,hh=0,ld=1,vi="",pn="srgb",Cs="srgb-linear",xo="linear",xe="srgb",$i=7680,ic=519,cd=512,ud=513,hd=514,fh=515,fd=516,dd=517,pd=518,md=519,sl=35044,rl=35048,sc="300 es",ti=2e3,ho=2001;class Ps{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Je=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let rc=1234567;const vs=Math.PI/180,ur=180/Math.PI;function ii(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Je[i&255]+Je[i>>8&255]+Je[i>>16&255]+Je[i>>24&255]+"-"+Je[t&255]+Je[t>>8&255]+"-"+Je[t>>16&15|64]+Je[t>>24&255]+"-"+Je[e&63|128]+Je[e>>8&255]+"-"+Je[e>>16&255]+Je[e>>24&255]+Je[n&255]+Je[n>>8&255]+Je[n>>16&255]+Je[n>>24&255]).toLowerCase()}function tn(i,t,e){return Math.max(t,Math.min(e,i))}function El(i,t){return(i%t+t)%t}function gd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function xd(i,t,e){return i!==t?(e-i)/(t-i):0}function sr(i,t,e){return(1-e)*i+e*t}function vd(i,t,e,n){return sr(i,t,1-Math.exp(-e*n))}function _d(i,t=1){return t-Math.abs(El(i,t*2)-t)}function yd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Md(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Sd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function bd(i,t){return i+Math.random()*(t-i)}function wd(i){return i*(.5-Math.random())}function Ed(i){i!==void 0&&(rc=i);let t=rc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Td(i){return i*vs}function Ad(i){return i*ur}function Rd(i){return(i&i-1)===0&&i!==0}function Cd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Pd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ld(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),u=o((t+n)/2),p=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*u,l*p,l*d,a*c);break;case"YZY":i.set(l*d,a*u,l*p,a*c);break;case"ZXZ":i.set(l*p,l*d,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*f,a*c);break;case"YXY":i.set(l*f,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*f,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Cn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ve(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Jn={DEG2RAD:vs,RAD2DEG:ur,generateUUID:ii,clamp:tn,euclideanModulo:El,mapLinear:gd,inverseLerp:xd,lerp:sr,damp:vd,pingpong:_d,smoothstep:yd,smootherstep:Md,randInt:Sd,randFloat:bd,randFloatSpread:wd,seededRandom:Ed,degToRad:Td,radToDeg:Ad,isPowerOfTwo:Rd,ceilPowerOfTwo:Cd,floorPowerOfTwo:Pd,setQuaternionFromProperEuler:Ld,normalize:ve,denormalize:Cn};class Kt{constructor(t=0,e=0){Kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(tn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ie{constructor(t,e,n,s,r,o,a,l,c){ie.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],p=n[7],d=n[2],f=n[5],g=n[8],x=s[0],m=s[3],h=s[6],S=s[1],M=s[4],v=s[7],T=s[2],_=s[5],E=s[8];return r[0]=o*x+a*S+l*T,r[3]=o*m+a*M+l*_,r[6]=o*h+a*v+l*E,r[1]=c*x+u*S+p*T,r[4]=c*m+u*M+p*_,r[7]=c*h+u*v+p*E,r[2]=d*x+f*S+g*T,r[5]=d*m+f*M+g*_,r[8]=d*h+f*v+g*E,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],p=u*o-a*c,d=a*l-u*r,f=c*r-o*l,g=e*p+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=p*x,t[1]=(s*c-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=d*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Lo.makeScale(t,e)),this}rotate(t){return this.premultiply(Lo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Lo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Lo=new ie;function dh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function fo(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zd(){const i=fo("canvas");return i.style.display="block",i}const oc={};function nr(i){i in oc||(oc[i]=!0,console.warn(i))}function Id(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Dd(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Ud(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const le={enabled:!0,workingColorSpace:Cs,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===xe&&(i.r=si(i.r),i.g=si(i.g),i.b=si(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===xe&&(i.r=_s(i.r),i.g=_s(i.g),i.b=_s(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===vi?xo:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function _s(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ac=[.64,.33,.3,.6,.15,.06],lc=[.2126,.7152,.0722],cc=[.3127,.329],uc=new ie().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hc=new ie().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);le.define({[Cs]:{primaries:ac,whitePoint:cc,transfer:xo,toXYZ:uc,fromXYZ:hc,luminanceCoefficients:lc,workingColorSpaceConfig:{unpackColorSpace:pn},outputColorSpaceConfig:{drawingBufferColorSpace:pn}},[pn]:{primaries:ac,whitePoint:cc,transfer:xe,toXYZ:uc,fromXYZ:hc,luminanceCoefficients:lc,outputColorSpaceConfig:{drawingBufferColorSpace:pn}}});let Yi;class Nd{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Yi===void 0&&(Yi=fo("canvas")),Yi.width=t.width,Yi.height=t.height;const n=Yi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Yi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=fo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=si(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Fd=0;class ph{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=ii(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(zo(s[o].image)):r.push(zo(s[o]))}else r=zo(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function zo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nd.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Od=0;class en extends Ps{constructor(t=en.DEFAULT_IMAGE,e=en.DEFAULT_MAPPING,n=ki,s=ki,r=Pn,o=Bi,a=Ln,l=Hn,c=en.DEFAULT_ANISOTROPY,u=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Od++}),this.uuid=ii(),this.name="",this.source=new ph(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Kt(0,0),this.repeat=new Kt(1,1),this.center=new Kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ie,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==eh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case uo:t.x=t.x-Math.floor(t.x);break;case ki:t.x=t.x<0?0:1;break;case La:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case uo:t.y=t.y-Math.floor(t.y);break;case ki:t.y=t.y<0?0:1;break;case La:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}en.DEFAULT_IMAGE=null;en.DEFAULT_MAPPING=eh;en.DEFAULT_ANISOTROPY=1;class ce{constructor(t=0,e=0,n=0,s=1){ce.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],p=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(p-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(p+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(c+1)/2,v=(f+1)/2,T=(h+1)/2,_=(u+d)/4,E=(p+x)/4,A=(g+m)/4;return M>v&&M>T?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=_/n,r=E/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=_/s,r=A/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=E/r,s=A/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(p-x)*(p-x)+(d-u)*(d-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(p-x)/S,this.z=(d-u)/S,this.w=Math.acos((c+f+h-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kd extends Ps{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ce(0,0,t,e),this.scissorTest=!1,this.viewport=new ce(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Pn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new en(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ph(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class bn extends kd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class mh extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bd extends en{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=gn,this.minFilter=gn,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vi{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],p=n[s+3];const d=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=p;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(p!==x||l!==d||c!==f||u!==g){let m=1-a;const h=l*d+c*f+u*g+p*x,S=h>=0?1:-1,M=1-h*h;if(M>Number.EPSILON){const T=Math.sqrt(M),_=Math.atan2(T,h*S);m=Math.sin(m*_)/T,a=Math.sin(a*_)/T}const v=a*S;if(l=l*m+d*v,c=c*m+f*v,u=u*m+g*v,p=p*m+x*v,m===1-a){const T=1/Math.sqrt(l*l+c*c+u*u+p*p);l*=T,c*=T,u*=T,p*=T}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=p}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],p=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*p+l*f-c*d,t[e+1]=l*g+u*d+c*p-a*f,t[e+2]=c*g+u*f+a*d-l*p,t[e+3]=u*g-a*p-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),p=a(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=d*u*p+c*f*g,this._y=c*f*p-d*u*g,this._z=c*u*g+d*f*p,this._w=c*u*p-d*f*g;break;case"YXZ":this._x=d*u*p+c*f*g,this._y=c*f*p-d*u*g,this._z=c*u*g-d*f*p,this._w=c*u*p+d*f*g;break;case"ZXY":this._x=d*u*p-c*f*g,this._y=c*f*p+d*u*g,this._z=c*u*g+d*f*p,this._w=c*u*p-d*f*g;break;case"ZYX":this._x=d*u*p-c*f*g,this._y=c*f*p+d*u*g,this._z=c*u*g-d*f*p,this._w=c*u*p+d*f*g;break;case"YZX":this._x=d*u*p+c*f*g,this._y=c*f*p+d*u*g,this._z=c*u*g-d*f*p,this._w=c*u*p-d*f*g;break;case"XZY":this._x=d*u*p-c*f*g,this._y=c*f*p-d*u*g,this._z=c*u*g+d*f*p,this._w=c*u*p+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],p=e[10],d=n+a+p;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>p){const f=2*Math.sqrt(1+n-a-p);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>p){const f=2*Math.sqrt(1+a-n-p);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{const f=2*Math.sqrt(1+p-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(tn(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),p=Math.sin((1-e)*u)/c,d=Math.sin(e*u)/c;return this._w=o*p+this._w*d,this._x=n*p+this._x*d,this._y=s*p+this._y*d,this._z=r*p+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class J{constructor(t=0,e=0,n=0){J.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),u=2*(a*e-r*s),p=2*(r*n-o*e);return this.x=e+l*c+o*p-a*u,this.y=n+l*u+a*c-r*p,this.z=s+l*p+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Io.copy(this).projectOnVector(t),this.sub(Io)}reflect(t){return this.sub(Io.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(tn(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Io=new J,fc=new Vi;class Wn{constructor(t=new J(1/0,1/0,1/0),e=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(En.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(En.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=En.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,En):En.fromBufferAttribute(r,o),En.applyMatrix4(t.matrixWorld),this.expandByPoint(En);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,En),En.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Os),xr.subVectors(this.max,Os),ji.subVectors(t.a,Os),Ki.subVectors(t.b,Os),Zi.subVectors(t.c,Os),ai.subVectors(Ki,ji),li.subVectors(Zi,Ki),Ai.subVectors(ji,Zi);let e=[0,-ai.z,ai.y,0,-li.z,li.y,0,-Ai.z,Ai.y,ai.z,0,-ai.x,li.z,0,-li.x,Ai.z,0,-Ai.x,-ai.y,ai.x,0,-li.y,li.x,0,-Ai.y,Ai.x,0];return!Do(e,ji,Ki,Zi,xr)||(e=[1,0,0,0,1,0,0,0,1],!Do(e,ji,Ki,Zi,xr))?!1:(vr.crossVectors(ai,li),e=[vr.x,vr.y,vr.z],Do(e,ji,Ki,Zi,xr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,En).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(En).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(qn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const qn=[new J,new J,new J,new J,new J,new J,new J,new J],En=new J,gr=new Wn,ji=new J,Ki=new J,Zi=new J,ai=new J,li=new J,Ai=new J,Os=new J,xr=new J,vr=new J,Ri=new J;function Do(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ri.fromArray(i,r);const a=s.x*Math.abs(Ri.x)+s.y*Math.abs(Ri.y)+s.z*Math.abs(Ri.z),l=t.dot(Ri),c=e.dot(Ri),u=n.dot(Ri);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Gd=new Wn,ks=new J,Uo=new J;class Ti{constructor(t=new J,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Gd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ks.subVectors(t,this.center);const e=ks.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ks,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ks.copy(t.center).add(Uo)),this.expandByPoint(ks.copy(t.center).sub(Uo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const $n=new J,No=new J,_r=new J,ci=new J,Fo=new J,yr=new J,Oo=new J;class Tl{constructor(t=new J,e=new J(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,$n)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=$n.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):($n.copy(this.origin).addScaledVector(this.direction,e),$n.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){No.copy(t).add(e).multiplyScalar(.5),_r.copy(e).sub(t).normalize(),ci.copy(this.origin).sub(No);const r=t.distanceTo(e)*.5,o=-this.direction.dot(_r),a=ci.dot(this.direction),l=-ci.dot(_r),c=ci.lengthSq(),u=Math.abs(1-o*o);let p,d,f,g;if(u>0)if(p=o*l-a,d=o*a-l,g=r*u,p>=0)if(d>=-g)if(d<=g){const x=1/u;p*=x,d*=x,f=p*(p+o*d+2*a)+d*(o*p+d+2*l)+c}else d=r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*l)+c;else d=-r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*l)+c;else d<=-g?(p=Math.max(0,-(-o*r+a)),d=p>0?-r:Math.min(Math.max(-r,-l),r),f=-p*p+d*(d+2*l)+c):d<=g?(p=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(p=Math.max(0,-(o*r+a)),d=p>0?r:Math.min(Math.max(-r,-l),r),f=-p*p+d*(d+2*l)+c);else d=o>0?-r:r,p=Math.max(0,-(o*d+a)),f=-p*p+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(No).addScaledVector(_r,d),f}intersectSphere(t,e){$n.subVectors(t.center,this.origin);const n=$n.dot(this.direction),s=$n.dot($n)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),u>=0?(r=(t.min.y-d.y)*u,o=(t.max.y-d.y)*u):(r=(t.max.y-d.y)*u,o=(t.min.y-d.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),p>=0?(a=(t.min.z-d.z)*p,l=(t.max.z-d.z)*p):(a=(t.max.z-d.z)*p,l=(t.min.z-d.z)*p),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,$n)!==null}intersectTriangle(t,e,n,s,r){Fo.subVectors(e,t),yr.subVectors(n,t),Oo.crossVectors(Fo,yr);let o=this.direction.dot(Oo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ci.subVectors(this.origin,t);const l=a*this.direction.dot(yr.crossVectors(ci,yr));if(l<0)return null;const c=a*this.direction.dot(Fo.cross(ci));if(c<0||l+c>o)return null;const u=-a*ci.dot(Oo);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class he{constructor(t,e,n,s,r,o,a,l,c,u,p,d,f,g,x,m){he.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,u,p,d,f,g,x,m)}set(t,e,n,s,r,o,a,l,c,u,p,d,f,g,x,m){const h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=p,h[14]=d,h[3]=f,h[7]=g,h[11]=x,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new he().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Ji.setFromMatrixColumn(t,0).length(),r=1/Ji.setFromMatrixColumn(t,1).length(),o=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),p=Math.sin(r);if(t.order==="XYZ"){const d=o*u,f=o*p,g=a*u,x=a*p;e[0]=l*u,e[4]=-l*p,e[8]=c,e[1]=f+g*c,e[5]=d-x*c,e[9]=-a*l,e[2]=x-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*u,f=l*p,g=c*u,x=c*p;e[0]=d+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*p,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=x+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*u,f=l*p,g=c*u,x=c*p;e[0]=d-x*a,e[4]=-o*p,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=x-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*u,f=o*p,g=a*u,x=a*p;e[0]=l*u,e[4]=g*c-f,e[8]=d*c+x,e[1]=l*p,e[5]=x*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=x-d*p,e[8]=g*p+f,e[1]=p,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*p+g,e[10]=d-x*p}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=-p,e[8]=c*u,e[1]=d*p+x,e[5]=o*u,e[9]=f*p-g,e[2]=g*p-f,e[6]=a*u,e[10]=x*p+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hd,t,Vd)}lookAt(t,e,n){const s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),ui.crossVectors(n,hn),ui.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),ui.crossVectors(n,hn)),ui.normalize(),Mr.crossVectors(hn,ui),s[0]=ui.x,s[4]=Mr.x,s[8]=hn.x,s[1]=ui.y,s[5]=Mr.y,s[9]=hn.y,s[2]=ui.z,s[6]=Mr.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],p=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],h=n[14],S=n[3],M=n[7],v=n[11],T=n[15],_=s[0],E=s[4],A=s[8],b=s[12],y=s[1],w=s[5],P=s[9],U=s[13],H=s[2],$=s[6],G=s[10],B=s[14],N=s[3],Q=s[7],st=s[11],Mt=s[15];return r[0]=o*_+a*y+l*H+c*N,r[4]=o*E+a*w+l*$+c*Q,r[8]=o*A+a*P+l*G+c*st,r[12]=o*b+a*U+l*B+c*Mt,r[1]=u*_+p*y+d*H+f*N,r[5]=u*E+p*w+d*$+f*Q,r[9]=u*A+p*P+d*G+f*st,r[13]=u*b+p*U+d*B+f*Mt,r[2]=g*_+x*y+m*H+h*N,r[6]=g*E+x*w+m*$+h*Q,r[10]=g*A+x*P+m*G+h*st,r[14]=g*b+x*U+m*B+h*Mt,r[3]=S*_+M*y+v*H+T*N,r[7]=S*E+M*w+v*$+T*Q,r[11]=S*A+M*P+v*G+T*st,r[15]=S*b+M*U+v*B+T*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],p=t[6],d=t[10],f=t[14],g=t[3],x=t[7],m=t[11],h=t[15];return g*(+r*l*p-s*c*p-r*a*d+n*c*d+s*a*f-n*l*f)+x*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*u-r*l*u)+m*(+e*c*p-e*a*f-r*o*p+n*o*f+r*a*u-n*c*u)+h*(-s*a*u-e*l*p+e*a*d+s*o*p-n*o*d+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],p=t[9],d=t[10],f=t[11],g=t[12],x=t[13],m=t[14],h=t[15],S=p*m*c-x*d*c+x*l*f-a*m*f-p*l*h+a*d*h,M=g*d*c-u*m*c-g*l*f+o*m*f+u*l*h-o*d*h,v=u*x*c-g*p*c+g*a*f-o*x*f-u*a*h+o*p*h,T=g*p*l-u*x*l-g*a*d+o*x*d+u*a*m-o*p*m,_=e*S+n*M+s*v+r*T;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/_;return t[0]=S*E,t[1]=(x*d*r-p*m*r-x*s*f+n*m*f+p*s*h-n*d*h)*E,t[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*h+n*l*h)*E,t[3]=(p*l*r-a*d*r-p*s*c+n*d*c+a*s*f-n*l*f)*E,t[4]=M*E,t[5]=(u*m*r-g*d*r+g*s*f-e*m*f-u*s*h+e*d*h)*E,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*h-e*l*h)*E,t[7]=(o*d*r-u*l*r+u*s*c-e*d*c-o*s*f+e*l*f)*E,t[8]=v*E,t[9]=(g*p*r-u*x*r-g*n*f+e*x*f+u*n*h-e*p*h)*E,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*h+e*a*h)*E,t[11]=(u*a*r-o*p*r-u*n*c+e*p*c+o*n*f-e*a*f)*E,t[12]=T*E,t[13]=(u*x*s-g*p*s+g*n*d-e*x*d-u*n*m+e*p*m)*E,t[14]=(g*a*s-o*x*s-g*n*l+e*x*l+o*n*m-e*a*m)*E,t[15]=(o*p*s-u*a*s+u*n*l-e*p*l-o*n*d+e*a*d)*E,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,p=a+a,d=r*c,f=r*u,g=r*p,x=o*u,m=o*p,h=a*p,S=l*c,M=l*u,v=l*p,T=n.x,_=n.y,E=n.z;return s[0]=(1-(x+h))*T,s[1]=(f+v)*T,s[2]=(g-M)*T,s[3]=0,s[4]=(f-v)*_,s[5]=(1-(d+h))*_,s[6]=(m+S)*_,s[7]=0,s[8]=(g+M)*E,s[9]=(m-S)*E,s[10]=(1-(d+x))*E,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Tn.copy(this);const c=1/r,u=1/o,p=1/a;return Tn.elements[0]*=c,Tn.elements[1]*=c,Tn.elements[2]*=c,Tn.elements[4]*=u,Tn.elements[5]*=u,Tn.elements[6]*=u,Tn.elements[8]*=p,Tn.elements[9]*=p,Tn.elements[10]*=p,e.setFromRotationMatrix(Tn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=ti){const l=this.elements,c=2*r/(e-t),u=2*r/(n-s),p=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(a===ti)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ho)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=p,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=ti){const l=this.elements,c=1/(e-t),u=1/(n-s),p=1/(o-r),d=(e+t)*c,f=(n+s)*u;let g,x;if(a===ti)g=(o+r)*p,x=-2*p;else if(a===ho)g=r*p,x=-1*p;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ji=new J,Tn=new he,Hd=new J(0,0,0),Vd=new J(1,1,1),ui=new J,Mr=new J,hn=new J,dc=new he,pc=new Vi;class Vn{constructor(t=0,e=0,n=0,s=Vn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],p=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(tn(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tn(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,r),this._z=0);break;case"ZXY":this._x=Math.asin(tn(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-p,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-tn(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(tn(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-tn(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return dc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(dc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return pc.setFromEuler(this),this.setFromQuaternion(pc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Vn.DEFAULT_ORDER="XYZ";class Al{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Wd=0;const mc=new J,Qi=new Vi,Yn=new he,Sr=new J,Bs=new J,Xd=new J,qd=new Vi,gc=new J(1,0,0),xc=new J(0,1,0),vc=new J(0,0,1),_c={type:"added"},$d={type:"removed"},ts={type:"childadded",child:null},ko={type:"childremoved",child:null};class Ve extends Ps{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wd++}),this.uuid=ii(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ve.DEFAULT_UP.clone();const t=new J,e=new Vn,n=new Vi,s=new J(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new he},normalMatrix:{value:new ie}}),this.matrix=new he,this.matrixWorld=new he,this.matrixAutoUpdate=Ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Al,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.premultiply(Qi),this}rotateX(t){return this.rotateOnAxis(gc,t)}rotateY(t){return this.rotateOnAxis(xc,t)}rotateZ(t){return this.rotateOnAxis(vc,t)}translateOnAxis(t,e){return mc.copy(t).applyQuaternion(this.quaternion),this.position.add(mc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(gc,t)}translateY(t){return this.translateOnAxis(xc,t)}translateZ(t){return this.translateOnAxis(vc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Yn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Sr.copy(t):Sr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Yn.lookAt(Bs,Sr,this.up):Yn.lookAt(Sr,Bs,this.up),this.quaternion.setFromRotationMatrix(Yn),s&&(Yn.extractRotation(s.matrixWorld),Qi.setFromRotationMatrix(Yn),this.quaternion.premultiply(Qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(_c),ts.child=t,this.dispatchEvent(ts),ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($d),ko.child=t,this.dispatchEvent(ko),ko.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Yn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Yn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Yn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(_c),ts.child=t,this.dispatchEvent(ts),ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,t,Xd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,qd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const p=l[c];r(t.shapes,p)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),p=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ve.DEFAULT_UP=new J(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const An=new J,jn=new J,Bo=new J,Kn=new J,es=new J,ns=new J,yc=new J,Go=new J,Ho=new J,Vo=new J,Wo=new ce,Xo=new ce,qo=new ce;class yn{constructor(t=new J,e=new J,n=new J){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),An.subVectors(t,e),s.cross(An);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){An.subVectors(s,e),jn.subVectors(n,e),Bo.subVectors(t,e);const o=An.dot(An),a=An.dot(jn),l=An.dot(Bo),c=jn.dot(jn),u=jn.dot(Bo),p=o*c-a*a;if(p===0)return r.set(0,0,0),null;const d=1/p,f=(c*l-a*u)*d,g=(o*u-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Kn)===null?!1:Kn.x>=0&&Kn.y>=0&&Kn.x+Kn.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Kn.x),l.addScaledVector(o,Kn.y),l.addScaledVector(a,Kn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Wo.setScalar(0),Xo.setScalar(0),qo.setScalar(0),Wo.fromBufferAttribute(t,e),Xo.fromBufferAttribute(t,n),qo.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Wo,r.x),o.addScaledVector(Xo,r.y),o.addScaledVector(qo,r.z),o}static isFrontFacing(t,e,n,s){return An.subVectors(n,e),jn.subVectors(t,e),An.cross(jn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return An.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),An.cross(jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return yn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return yn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return yn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return yn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return yn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;es.subVectors(s,n),ns.subVectors(r,n),Go.subVectors(t,n);const l=es.dot(Go),c=ns.dot(Go);if(l<=0&&c<=0)return e.copy(n);Ho.subVectors(t,s);const u=es.dot(Ho),p=ns.dot(Ho);if(u>=0&&p<=u)return e.copy(s);const d=l*p-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(es,o);Vo.subVectors(t,r);const f=es.dot(Vo),g=ns.dot(Vo);if(g>=0&&f<=g)return e.copy(r);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(ns,a);const m=u*g-f*p;if(m<=0&&p-u>=0&&f-g>=0)return yc.subVectors(r,s),a=(p-u)/(p-u+(f-g)),e.copy(s).addScaledVector(yc,a);const h=1/(m+x+d);return o=x*h,a=d*h,e.copy(n).addScaledVector(es,o).addScaledVector(ns,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const gh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hi={h:0,s:0,l:0},br={h:0,s:0,l:0};function $o(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=n,le.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=le.workingColorSpace){if(t=El(t,1),e=tn(e,0,1),n=tn(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=$o(o,r,t+1/3),this.g=$o(o,r,t),this.b=$o(o,r,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=pn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pn){const n=gh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pn){return le.fromWorkingColorSpace(Qe.copy(this),t),Math.round(tn(Qe.r*255,0,255))*65536+Math.round(tn(Qe.g*255,0,255))*256+Math.round(tn(Qe.b*255,0,255))}getHexString(t=pn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(Qe.copy(this),e);const n=Qe.r,s=Qe.g,r=Qe.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const p=o-a;switch(c=u<=.5?p/(o+a):p/(2-o-a),o){case n:l=(s-r)/p+(s<r?6:0);break;case s:l=(r-n)/p+2;break;case r:l=(n-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(Qe.copy(this),e),t.r=Qe.r,t.g=Qe.g,t.b=Qe.b,t}getStyle(t=pn){le.fromWorkingColorSpace(Qe.copy(this),t);const e=Qe.r,n=Qe.g,s=Qe.b;return t!==pn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(hi),this.setHSL(hi.h+t,hi.s+e,hi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(hi),t.getHSL(br);const n=sr(hi.h,br.h,e),s=sr(hi.s,br.s,e),r=sr(hi.l,br.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Qe=new Wt;Wt.NAMES=gh;let Yd=0;class Ls extends Ps{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=ii(),this.name="",this.blending=gs,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ya,this.blendDst=Ma,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Wt(0,0,0),this.blendAlpha=0,this.depthFunc=ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ic,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$i,this.stencilZFail=$i,this.stencilZPass=$i,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(n.blending=this.blending),this.side!==wi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ya&&(n.blendSrc=this.blendSrc),this.blendDst!==Ma&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ys&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ic&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$i&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$i&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$i&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Pe extends Ls{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ze=new J,wr=new Kt;class Te{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=sl,this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)wr.fromBufferAttribute(this,e),wr.applyMatrix3(t),this.setXY(e,wr.x,wr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ve(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Cn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Cn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Cn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Cn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ve(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array),s=ve(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array),s=ve(s,this.array),r=ve(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sl&&(t.usage=this.usage),t}}class xh extends Te{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class vh extends Te{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends Te{constructor(t,e,n){super(new Float32Array(t),e,n)}}let jd=0;const vn=new he,Yo=new Ve,is=new J,fn=new Wn,Gs=new Wn,ke=new J;class _e extends Ps{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jd++}),this.uuid=ii(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dh(t)?vh:xh)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ie().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return vn.makeRotationFromQuaternion(t),this.applyMatrix4(vn),this}rotateX(t){return vn.makeRotationX(t),this.applyMatrix4(vn),this}rotateY(t){return vn.makeRotationY(t),this.applyMatrix4(vn),this}rotateZ(t){return vn.makeRotationZ(t),this.applyMatrix4(vn),this}translate(t,e,n){return vn.makeTranslation(t,e,n),this.applyMatrix4(vn),this}scale(t,e,n){return vn.makeScale(t,e,n),this.applyMatrix4(vn),this}lookAt(t){return Yo.lookAt(t),Yo.updateMatrix(),this.applyMatrix4(Yo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new oe(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(ke.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(ke),ke.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(ke)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ti);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Gs.setFromBufferAttribute(a),this.morphTargetsRelative?(ke.addVectors(fn.min,Gs.min),fn.expandByPoint(ke),ke.addVectors(fn.max,Gs.max),fn.expandByPoint(ke)):(fn.expandByPoint(Gs.min),fn.expandByPoint(Gs.max))}fn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)ke.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ke));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)ke.fromBufferAttribute(a,c),l&&(is.fromBufferAttribute(t,c),ke.add(is)),s=Math.max(s,n.distanceToSquared(ke))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Te(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let A=0;A<n.count;A++)a[A]=new J,l[A]=new J;const c=new J,u=new J,p=new J,d=new Kt,f=new Kt,g=new Kt,x=new J,m=new J;function h(A,b,y){c.fromBufferAttribute(n,A),u.fromBufferAttribute(n,b),p.fromBufferAttribute(n,y),d.fromBufferAttribute(r,A),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,y),u.sub(c),p.sub(c),f.sub(d),g.sub(d);const w=1/(f.x*g.y-g.x*f.y);isFinite(w)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(p,-f.y).multiplyScalar(w),m.copy(p).multiplyScalar(f.x).addScaledVector(u,-g.x).multiplyScalar(w),a[A].add(x),a[b].add(x),a[y].add(x),l[A].add(m),l[b].add(m),l[y].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let A=0,b=S.length;A<b;++A){const y=S[A],w=y.start,P=y.count;for(let U=w,H=w+P;U<H;U+=3)h(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const M=new J,v=new J,T=new J,_=new J;function E(A){T.fromBufferAttribute(s,A),_.copy(T);const b=a[A];M.copy(b),M.sub(T.multiplyScalar(T.dot(b))).normalize(),v.crossVectors(_,b);const w=v.dot(l[A])<0?-1:1;o.setXYZW(A,M.x,M.y,M.z,w)}for(let A=0,b=S.length;A<b;++A){const y=S[A],w=y.start,P=y.count;for(let U=w,H=w+P;U<H;U+=3)E(t.getX(U+0)),E(t.getX(U+1)),E(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Te(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new J,r=new J,o=new J,a=new J,l=new J,c=new J,u=new J,p=new J;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),u.subVectors(o,r),p.subVectors(s,r),u.cross(p),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ke.fromBufferAttribute(t,e),ke.normalize(),t.setXYZ(e,ke.x,ke.y,ke.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,p=a.normalized,d=new c.constructor(l.length*u);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let h=0;h<u;h++)d[g++]=c[f++]}return new Te(d,u,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new _e,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,p=c.length;u<p;u++){const d=c[u],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let p=0,d=c.length;p<d;p++){const f=c[p];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],p=r[c];for(let d=0,f=p.length;d<f;d++)u.push(p[d].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Mc=new he,Ci=new Tl,Er=new Ti,Sc=new J,Tr=new J,Ar=new J,Rr=new J,jo=new J,Cr=new J,bc=new J,Pr=new J;class Jt extends Ve{constructor(t=new _e,e=new Pe){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){Cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],p=r[l];u!==0&&(jo.fromBufferAttribute(p,t),o?Cr.addScaledVector(jo,u):Cr.addScaledVector(jo.sub(e),u))}e.add(Cr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Er.copy(n.boundingSphere),Er.applyMatrix4(r),Ci.copy(t.ray).recast(t.near),!(Er.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(Er,Sc)===null||Ci.origin.distanceToSquared(Sc)>(t.far-t.near)**2))&&(Mc.copy(r).invert(),Ci.copy(t.ray).applyMatrix4(Mc),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ci)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,p=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],h=o[m.materialIndex],S=Math.max(m.start,f.start),M=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=S,T=M;v<T;v+=3){const _=a.getX(v),E=a.getX(v+1),A=a.getX(v+2);s=Lr(this,h,t,n,c,u,p,_,E,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,h=x;m<h;m+=3){const S=a.getX(m),M=a.getX(m+1),v=a.getX(m+2);s=Lr(this,o,t,n,c,u,p,S,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],h=o[m.materialIndex],S=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=S,T=M;v<T;v+=3){const _=v,E=v+1,A=v+2;s=Lr(this,h,t,n,c,u,p,_,E,A),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,h=x;m<h;m+=3){const S=m,M=m+1,v=m+2;s=Lr(this,o,t,n,c,u,p,S,M,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Kd(i,t,e,n,s,r,o,a){let l;if(t.side===cn?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===wi,a),l===null)return null;Pr.copy(a),Pr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Pr);return c<e.near||c>e.far?null:{distance:c,point:Pr.clone(),object:i}}function Lr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Tr),i.getVertexPosition(l,Ar),i.getVertexPosition(c,Rr);const u=Kd(i,t,e,n,Tr,Ar,Rr,bc);if(u){const p=new J;yn.getBarycoord(bc,Tr,Ar,Rr,p),s&&(u.uv=yn.getInterpolatedAttribute(s,a,l,c,p,new Kt)),r&&(u.uv1=yn.getInterpolatedAttribute(r,a,l,c,p,new Kt)),o&&(u.normal=yn.getInterpolatedAttribute(o,a,l,c,p,new J),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new J,materialIndex:0};yn.getNormal(Tr,Ar,Rr,d.normal),u.face=d,u.barycoord=p}return u}class Sn extends _e{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],p=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(u,3)),this.setAttribute("uv",new oe(p,2));function g(x,m,h,S,M,v,T,_,E,A,b){const y=v/E,w=T/A,P=v/2,U=T/2,H=_/2,$=E+1,G=A+1;let B=0,N=0;const Q=new J;for(let st=0;st<G;st++){const Mt=st*w-U;for(let Pt=0;Pt<$;Pt++){const Et=Pt*y-P;Q[x]=Et*S,Q[m]=Mt*M,Q[h]=H,c.push(Q.x,Q.y,Q.z),Q[x]=0,Q[m]=0,Q[h]=_>0?1:-1,u.push(Q.x,Q.y,Q.z),p.push(Pt/E),p.push(1-st/A),B+=1}}for(let st=0;st<A;st++)for(let Mt=0;Mt<E;Mt++){const Pt=d+Mt+$*st,Et=d+Mt+$*(st+1),rt=d+(Mt+1)+$*(st+1),nt=d+(Mt+1)+$*st;l.push(Pt,Et,nt),l.push(Et,rt,nt),N+=6}a.addGroup(f,N,b),f+=N,d+=B}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Es(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function sn(i){const t={};for(let e=0;e<i.length;e++){const n=Es(i[e]);for(const s in n)t[s]=n[s]}return t}function Zd(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function _h(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:le.workingColorSpace}const Ei={clone:Es,merge:sn};var Jd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Qd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class De extends Ls{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jd,this.fragmentShader=Qd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Es(t.uniforms),this.uniformsGroups=Zd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class yh extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new he,this.projectionMatrix=new he,this.projectionMatrixInverse=new he,this.coordinateSystem=ti}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const fi=new J,wc=new Kt,Ec=new Kt;class mn extends yh{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ur*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ur*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(fi.x,fi.y).multiplyScalar(-t/fi.z),fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(fi.x,fi.y).multiplyScalar(-t/fi.z)}getViewSize(t,e){return this.getViewBounds(t,wc,Ec),e.subVectors(Ec,wc)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(vs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ss=-90,rs=1;class tp extends Ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new mn(ss,rs,t,e);s.layers=this.layers,this.add(s);const r=new mn(ss,rs,t,e);r.layers=this.layers,this.add(r);const o=new mn(ss,rs,t,e);o.layers=this.layers,this.add(o);const a=new mn(ss,rs,t,e);a.layers=this.layers,this.add(a);const l=new mn(ss,rs,t,e);l.layers=this.layers,this.add(l);const c=new mn(ss,rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===ti)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ho)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,p=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(p,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Mh extends en{constructor(t,e,n,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Ms,super(t,e,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ep extends bn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Mh(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Pn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Sn(5,5,5),r=new De({name:"CubemapFromEquirect",uniforms:Es(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:cn,blending:ni});r.uniforms.tEquirect.value=e;const o=new Jt(s,r),a=e.minFilter;return e.minFilter===Bi&&(e.minFilter=Pn),new tp(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Ko=new J,np=new J,ip=new ie;class xi{constructor(t=new J(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Ko.subVectors(n,e).cross(np.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Ko),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||ip.getNormalMatrix(t),s=this.coplanarPoint(Ko).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pi=new Ti,zr=new J;class Rl{constructor(t=new xi,e=new xi,n=new xi,s=new xi,r=new xi,o=new xi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=ti){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],p=s[6],d=s[7],f=s[8],g=s[9],x=s[10],m=s[11],h=s[12],S=s[13],M=s[14],v=s[15];if(n[0].setComponents(l-r,d-c,m-f,v-h).normalize(),n[1].setComponents(l+r,d+c,m+f,v+h).normalize(),n[2].setComponents(l+o,d+u,m+g,v+S).normalize(),n[3].setComponents(l-o,d-u,m-g,v-S).normalize(),n[4].setComponents(l-a,d-p,m-x,v-M).normalize(),e===ti)n[5].setComponents(l+a,d+p,m+x,v+M).normalize();else if(e===ho)n[5].setComponents(a,p,x,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Pi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Pi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Pi)}intersectsSprite(t){return Pi.center.set(0,0,0),Pi.radius=.7071067811865476,Pi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Pi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(zr.x=s.normal.x>0?t.max.x:t.min.x,zr.y=s.normal.y>0?t.max.y:t.min.y,zr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Sh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function sp(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,p=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),a.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:p}}function n(a,l,c){const u=l.array,p=l.updateRanges;if(i.bindBuffer(c,a),p.length===0)i.bufferSubData(c,0,u);else{p.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<p.length;f++){const g=p[d],x=p[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,p[d]=x)}p.length=d+1;for(let f=0,g=p.length;f<g;f++){const x=p[f];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class zs extends _e{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,p=t/a,d=e/l,f=[],g=[],x=[],m=[];for(let h=0;h<u;h++){const S=h*d-o;for(let M=0;M<c;M++){const v=M*p-r;g.push(v,-S,0),x.push(0,0,1),m.push(M/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let S=0;S<a;S++){const M=S+c*h,v=S+c*(h+1),T=S+1+c*(h+1),_=S+1+c*h;f.push(M,v,_),f.push(v,T,_)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(x,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zs(t.width,t.height,t.widthSegments,t.heightSegments)}}var rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,op=`#ifdef USE_ALPHAHASH
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
#endif`,ap=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hp=`#ifdef USE_AOMAP
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
#endif`,fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dp=`#ifdef USE_BATCHING
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
#endif`,pp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vp=`#ifdef USE_IRIDESCENCE
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
#endif`,_p=`#ifdef USE_BUMPMAP
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
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Mp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ep=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Rp=`#define PI 3.141592653589793
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
} // validated`,Cp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Pp=`vec3 transformedNormal = objectNormal;
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
#endif`,Lp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ip=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Up="gl_FragColor = linearToOutputTexel( gl_FragColor );",Np=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Fp=`#ifdef USE_ENVMAP
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
#endif`,Op=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kp=`#ifdef USE_ENVMAP
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
#endif`,Bp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gp=`#ifdef USE_ENVMAP
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
#endif`,Hp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Wp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Xp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qp=`#ifdef USE_GRADIENTMAP
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
}`,$p=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Kp=`uniform bool receiveShadow;
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
#endif`,Zp=`#ifdef USE_ENVMAP
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
#endif`,Jp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Qp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nm=`PhysicalMaterial material;
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
#endif`,im=`struct PhysicalMaterial {
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
}`,sm=`
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
#endif`,rm=`#if defined( RE_IndirectDiffuse )
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
#endif`,om=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,am=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,pm=`#if defined( USE_POINTS_UV )
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
#endif`,mm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_m=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ym=`#ifdef USE_MORPHTARGETS
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
#endif`,Mm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Sm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Am=`#ifdef USE_NORMALMAP
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
#endif`,Rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Pm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Lm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Im=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Dm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Um=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Om=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vm=`float getShadowMask() {
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
}`,Wm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Xm=`#ifdef USE_SKINNING
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
#endif`,qm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$m=`#ifdef USE_SKINNING
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
#endif`,Ym=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Km=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jm=`#ifdef USE_TRANSMISSION
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
#endif`,Qm=`#ifdef USE_TRANSMISSION
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
#endif`,tg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ng=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ig=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,rg=`uniform sampler2D t2D;
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
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ag=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ug=`#include <common>
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
}`,hg=`#if DEPTH_PACKING == 3200
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
}`,fg=`#define DISTANCE
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
}`,dg=`#define DISTANCE
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
}`,pg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gg=`uniform float scale;
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
}`,xg=`uniform vec3 diffuse;
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
}`,vg=`#include <common>
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
}`,_g=`uniform vec3 diffuse;
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
}`,yg=`#define LAMBERT
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
}`,Mg=`#define LAMBERT
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
}`,Sg=`#define MATCAP
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
}`,bg=`#define MATCAP
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
}`,wg=`#define NORMAL
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
}`,Eg=`#define NORMAL
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
}`,Tg=`#define PHONG
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
}`,Ag=`#define PHONG
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
}`,Rg=`#define STANDARD
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
}`,Cg=`#define STANDARD
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
}`,Pg=`#define TOON
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
}`,Lg=`#define TOON
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
}`,zg=`uniform float size;
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
}`,Ig=`uniform vec3 diffuse;
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
}`,Dg=`#include <common>
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
}`,Ug=`uniform vec3 color;
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
}`,Ng=`uniform float rotation;
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
}`,Fg=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:rp,alphahash_pars_fragment:op,alphamap_fragment:ap,alphamap_pars_fragment:lp,alphatest_fragment:cp,alphatest_pars_fragment:up,aomap_fragment:hp,aomap_pars_fragment:fp,batching_pars_vertex:dp,batching_vertex:pp,begin_vertex:mp,beginnormal_vertex:gp,bsdfs:xp,iridescence_fragment:vp,bumpmap_pars_fragment:_p,clipping_planes_fragment:yp,clipping_planes_pars_fragment:Mp,clipping_planes_pars_vertex:Sp,clipping_planes_vertex:bp,color_fragment:wp,color_pars_fragment:Ep,color_pars_vertex:Tp,color_vertex:Ap,common:Rp,cube_uv_reflection_fragment:Cp,defaultnormal_vertex:Pp,displacementmap_pars_vertex:Lp,displacementmap_vertex:zp,emissivemap_fragment:Ip,emissivemap_pars_fragment:Dp,colorspace_fragment:Up,colorspace_pars_fragment:Np,envmap_fragment:Fp,envmap_common_pars_fragment:Op,envmap_pars_fragment:kp,envmap_pars_vertex:Bp,envmap_physical_pars_fragment:Zp,envmap_vertex:Gp,fog_vertex:Hp,fog_pars_vertex:Vp,fog_fragment:Wp,fog_pars_fragment:Xp,gradientmap_pars_fragment:qp,lightmap_pars_fragment:$p,lights_lambert_fragment:Yp,lights_lambert_pars_fragment:jp,lights_pars_begin:Kp,lights_toon_fragment:Jp,lights_toon_pars_fragment:Qp,lights_phong_fragment:tm,lights_phong_pars_fragment:em,lights_physical_fragment:nm,lights_physical_pars_fragment:im,lights_fragment_begin:sm,lights_fragment_maps:rm,lights_fragment_end:om,logdepthbuf_fragment:am,logdepthbuf_pars_fragment:lm,logdepthbuf_pars_vertex:cm,logdepthbuf_vertex:um,map_fragment:hm,map_pars_fragment:fm,map_particle_fragment:dm,map_particle_pars_fragment:pm,metalnessmap_fragment:mm,metalnessmap_pars_fragment:gm,morphinstance_vertex:xm,morphcolor_vertex:vm,morphnormal_vertex:_m,morphtarget_pars_vertex:ym,morphtarget_vertex:Mm,normal_fragment_begin:Sm,normal_fragment_maps:bm,normal_pars_fragment:wm,normal_pars_vertex:Em,normal_vertex:Tm,normalmap_pars_fragment:Am,clearcoat_normal_fragment_begin:Rm,clearcoat_normal_fragment_maps:Cm,clearcoat_pars_fragment:Pm,iridescence_pars_fragment:Lm,opaque_fragment:zm,packing:Im,premultiplied_alpha_fragment:Dm,project_vertex:Um,dithering_fragment:Nm,dithering_pars_fragment:Fm,roughnessmap_fragment:Om,roughnessmap_pars_fragment:km,shadowmap_pars_fragment:Bm,shadowmap_pars_vertex:Gm,shadowmap_vertex:Hm,shadowmask_pars_fragment:Vm,skinbase_vertex:Wm,skinning_pars_vertex:Xm,skinning_vertex:qm,skinnormal_vertex:$m,specularmap_fragment:Ym,specularmap_pars_fragment:jm,tonemapping_fragment:Km,tonemapping_pars_fragment:Zm,transmission_fragment:Jm,transmission_pars_fragment:Qm,uv_pars_fragment:tg,uv_pars_vertex:eg,uv_vertex:ng,worldpos_vertex:ig,background_vert:sg,background_frag:rg,backgroundCube_vert:og,backgroundCube_frag:ag,cube_vert:lg,cube_frag:cg,depth_vert:ug,depth_frag:hg,distanceRGBA_vert:fg,distanceRGBA_frag:dg,equirect_vert:pg,equirect_frag:mg,linedashed_vert:gg,linedashed_frag:xg,meshbasic_vert:vg,meshbasic_frag:_g,meshlambert_vert:yg,meshlambert_frag:Mg,meshmatcap_vert:Sg,meshmatcap_frag:bg,meshnormal_vert:wg,meshnormal_frag:Eg,meshphong_vert:Tg,meshphong_frag:Ag,meshphysical_vert:Rg,meshphysical_frag:Cg,meshtoon_vert:Pg,meshtoon_frag:Lg,points_vert:zg,points_frag:Ig,shadow_vert:Dg,shadow_frag:Ug,sprite_vert:Ng,sprite_frag:Fg},Gt={common:{diffuse:{value:new Wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ie}},envmap:{envMap:{value:null},envMapRotation:{value:new ie},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ie}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ie}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ie},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ie},normalScale:{value:new Kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ie},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ie}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ie}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ie}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0},uvTransform:{value:new ie}},sprite:{diffuse:{value:new Wt(16777215)},opacity:{value:1},center:{value:new Kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ie},alphaMap:{value:null},alphaMapTransform:{value:new ie},alphaTest:{value:0}}},ln={basic:{uniforms:sn([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:sn([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,Gt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:sn([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,Gt.lights,{emissive:{value:new Wt(0)},specular:{value:new Wt(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:sn([Gt.common,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.roughnessmap,Gt.metalnessmap,Gt.fog,Gt.lights,{emissive:{value:new Wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:sn([Gt.common,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.gradientmap,Gt.fog,Gt.lights,{emissive:{value:new Wt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:sn([Gt.common,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:sn([Gt.points,Gt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:sn([Gt.common,Gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:sn([Gt.common,Gt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:sn([Gt.common,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:sn([Gt.sprite,Gt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new ie},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ie}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:sn([Gt.common,Gt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:sn([Gt.lights,Gt.fog,{color:{value:new Wt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};ln.physical={uniforms:sn([ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ie},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ie},clearcoatNormalScale:{value:new Kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ie},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ie},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ie},sheen:{value:0},sheenColor:{value:new Wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ie},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ie},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ie},transmissionSamplerSize:{value:new Kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ie},attenuationDistance:{value:0},attenuationColor:{value:new Wt(0)},specularColor:{value:new Wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ie},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ie},anisotropyVector:{value:new Kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ie}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};const Ir={r:0,b:0,g:0},Li=new Vn,Og=new he;function kg(i,t,e,n,s,r,o){const a=new Wt(0);let l=r===!0?0:1,c,u,p=null,d=0,f=null;function g(S){let M=S.isScene===!0?S.background:null;return M&&M.isTexture&&(M=(S.backgroundBlurriness>0?e:t).get(M)),M}function x(S){let M=!1;const v=g(S);v===null?h(a,l):v&&v.isColor&&(h(v,1),M=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,M){const v=g(M);v&&(v.isCubeTexture||v.mapping===mo)?(u===void 0&&(u=new Jt(new Sn(1,1,1),new De({name:"BackgroundCubeMaterial",uniforms:Es(ln.backgroundCube.uniforms),vertexShader:ln.backgroundCube.vertexShader,fragmentShader:ln.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,_,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),Li.copy(M.backgroundRotation),Li.x*=-1,Li.y*=-1,Li.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Li.y*=-1,Li.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Og.makeRotationFromEuler(Li)),u.material.toneMapped=le.getTransfer(v.colorSpace)!==xe,(p!==v||d!==v.version||f!==i.toneMapping)&&(u.material.needsUpdate=!0,p=v,d=v.version,f=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Jt(new zs(2,2),new De({name:"BackgroundMaterial",uniforms:Es(ln.background.uniforms),vertexShader:ln.background.vertexShader,fragmentShader:ln.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=le.getTransfer(v.colorSpace)!==xe,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(p!==v||d!==v.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,p=v,d=v.version,f=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function h(S,M){S.getRGB(Ir,_h(i)),n.buffers.color.setClear(Ir.r,Ir.g,Ir.b,M,o)}return{getClearColor:function(){return a},setClearColor:function(S,M=1){a.set(S),l=M,h(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,h(a,l)},render:x,addToRenderList:m}}function Bg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,o=!1;function a(y,w,P,U,H){let $=!1;const G=p(U,P,w);r!==G&&(r=G,c(r.object)),$=f(y,U,P,H),$&&g(y,U,P,H),H!==null&&t.update(H,i.ELEMENT_ARRAY_BUFFER),($||o)&&(o=!1,v(y,w,P,U),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return i.createVertexArray()}function c(y){return i.bindVertexArray(y)}function u(y){return i.deleteVertexArray(y)}function p(y,w,P){const U=P.wireframe===!0;let H=n[y.id];H===void 0&&(H={},n[y.id]=H);let $=H[w.id];$===void 0&&($={},H[w.id]=$);let G=$[U];return G===void 0&&(G=d(l()),$[U]=G),G}function d(y){const w=[],P=[],U=[];for(let H=0;H<e;H++)w[H]=0,P[H]=0,U[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:P,attributeDivisors:U,object:y,attributes:{},index:null}}function f(y,w,P,U){const H=r.attributes,$=w.attributes;let G=0;const B=P.getAttributes();for(const N in B)if(B[N].location>=0){const st=H[N];let Mt=$[N];if(Mt===void 0&&(N==="instanceMatrix"&&y.instanceMatrix&&(Mt=y.instanceMatrix),N==="instanceColor"&&y.instanceColor&&(Mt=y.instanceColor)),st===void 0||st.attribute!==Mt||Mt&&st.data!==Mt.data)return!0;G++}return r.attributesNum!==G||r.index!==U}function g(y,w,P,U){const H={},$=w.attributes;let G=0;const B=P.getAttributes();for(const N in B)if(B[N].location>=0){let st=$[N];st===void 0&&(N==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),N==="instanceColor"&&y.instanceColor&&(st=y.instanceColor));const Mt={};Mt.attribute=st,st&&st.data&&(Mt.data=st.data),H[N]=Mt,G++}r.attributes=H,r.attributesNum=G,r.index=U}function x(){const y=r.newAttributes;for(let w=0,P=y.length;w<P;w++)y[w]=0}function m(y){h(y,0)}function h(y,w){const P=r.newAttributes,U=r.enabledAttributes,H=r.attributeDivisors;P[y]=1,U[y]===0&&(i.enableVertexAttribArray(y),U[y]=1),H[y]!==w&&(i.vertexAttribDivisor(y,w),H[y]=w)}function S(){const y=r.newAttributes,w=r.enabledAttributes;for(let P=0,U=w.length;P<U;P++)w[P]!==y[P]&&(i.disableVertexAttribArray(P),w[P]=0)}function M(y,w,P,U,H,$,G){G===!0?i.vertexAttribIPointer(y,w,P,H,$):i.vertexAttribPointer(y,w,P,U,H,$)}function v(y,w,P,U){x();const H=U.attributes,$=P.getAttributes(),G=w.defaultAttributeValues;for(const B in $){const N=$[B];if(N.location>=0){let Q=H[B];if(Q===void 0&&(B==="instanceMatrix"&&y.instanceMatrix&&(Q=y.instanceMatrix),B==="instanceColor"&&y.instanceColor&&(Q=y.instanceColor)),Q!==void 0){const st=Q.normalized,Mt=Q.itemSize,Pt=t.get(Q);if(Pt===void 0)continue;const Et=Pt.buffer,rt=Pt.type,nt=Pt.bytesPerElement,Tt=rt===i.INT||rt===i.UNSIGNED_INT||Q.gpuType===_l;if(Q.isInterleavedBufferAttribute){const _t=Q.data,Rt=_t.stride,L=Q.offset;if(_t.isInstancedInterleavedBuffer){for(let X=0;X<N.locationSize;X++)h(N.location+X,_t.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let X=0;X<N.locationSize;X++)m(N.location+X);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let X=0;X<N.locationSize;X++)M(N.location+X,Mt/N.locationSize,rt,st,Rt*nt,(L+Mt/N.locationSize*X)*nt,Tt)}else{if(Q.isInstancedBufferAttribute){for(let _t=0;_t<N.locationSize;_t++)h(N.location+_t,Q.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let _t=0;_t<N.locationSize;_t++)m(N.location+_t);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let _t=0;_t<N.locationSize;_t++)M(N.location+_t,Mt/N.locationSize,rt,st,Mt*nt,Mt/N.locationSize*_t*nt,Tt)}}else if(G!==void 0){const st=G[B];if(st!==void 0)switch(st.length){case 2:i.vertexAttrib2fv(N.location,st);break;case 3:i.vertexAttrib3fv(N.location,st);break;case 4:i.vertexAttrib4fv(N.location,st);break;default:i.vertexAttrib1fv(N.location,st)}}}}S()}function T(){A();for(const y in n){const w=n[y];for(const P in w){const U=w[P];for(const H in U)u(U[H].object),delete U[H];delete w[P]}delete n[y]}}function _(y){if(n[y.id]===void 0)return;const w=n[y.id];for(const P in w){const U=w[P];for(const H in U)u(U[H].object),delete U[H];delete w[P]}delete n[y.id]}function E(y){for(const w in n){const P=n[w];if(P[y.id]===void 0)continue;const U=P[y.id];for(const H in U)u(U[H].object),delete U[H];delete P[y.id]}}function A(){b(),o=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:A,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:_,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function Gg(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,p){p!==0&&(i.drawArraysInstanced(n,c,u,p),e.update(u,n,p))}function a(c,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,p);let f=0;for(let g=0;g<p;g++)f+=u[g];e.update(f,n,1)}function l(c,u,p,d){if(p===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],u[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,p);let g=0;for(let x=0;x<p;x++)g+=u[x]*d[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Hg(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(E){return!(E!==Ln&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const A=E===Gn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Hn&&n.convert(E)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Bn&&!A)}function l(E){if(E==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const p=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),M=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,_=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:p,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:v,vertexTextures:T,maxSamples:_}}function Vg(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new xi,a=new ie,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,d){const f=p.length!==0||d||n!==0||s;return s=d,n=p.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(p,d){e=u(p,d,0)},this.setState=function(p,d,f){const g=p.clippingPlanes,x=p.clipIntersection,m=p.clipShadows,h=i.get(p);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:n,M=S*4;let v=h.clippingState||null;l.value=v,v=u(g,d,M,f);for(let T=0;T!==M;++T)v[T]=e[T];h.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(p,d,f,g){const x=p!==null?p.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const h=f+x*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<h)&&(m=new Float32Array(h));for(let M=0,v=f;M!==x;++M,v+=4)o.copy(p[M]).applyMatrix4(S,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function Wg(i){let t=new WeakMap;function e(o,a){return a===Ca?o.mapping=Ms:a===Pa&&(o.mapping=Ss),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ca||a===Pa)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new ep(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Cl extends yh{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ds=4,Tc=[.125,.215,.35,.446,.526,.582],Oi=20,Zo=new Cl,Ac=new Wt;let Jo=null,Qo=0,ta=0,ea=!1;const Ni=(1+Math.sqrt(5))/2,os=1/Ni,Rc=[new J(-Ni,os,0),new J(Ni,os,0),new J(-os,0,Ni),new J(os,0,Ni),new J(0,Ni,-os),new J(0,Ni,os),new J(-1,1,-1),new J(1,1,-1),new J(-1,1,1),new J(1,1,1)];class Cc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=zc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Lc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Jo,Qo,ta),this._renderer.xr.enabled=ea,t.scissorTest=!1,Dr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ms||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Jo=this._renderer.getRenderTarget(),Qo=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),ea=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Pn,minFilter:Pn,generateMipmaps:!1,type:Gn,format:Ln,colorSpace:Cs,depthBuffer:!1},s=Pc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xg(r)),this._blurMaterial=qg(r,t,e)}return s}_compileMaterial(t){const e=new Jt(this._lodPlanes[0],t);this._renderer.compile(e,Zo)}_sceneToCubeUV(t,e,n,s){const a=new mn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,p=u.autoClear,d=u.toneMapping;u.getClearColor(Ac),u.toneMapping=bi,u.autoClear=!1;const f=new Pe({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1}),g=new Jt(new Sn,f);let x=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,x=!0):(f.color.copy(Ac),x=!0);for(let h=0;h<6;h++){const S=h%3;S===0?(a.up.set(0,l[h],0),a.lookAt(c[h],0,0)):S===1?(a.up.set(0,0,l[h]),a.lookAt(0,c[h],0)):(a.up.set(0,l[h],0),a.lookAt(0,0,c[h]));const M=this._cubeSize;Dr(s,S*M,h>2?M:0,M,M),u.setRenderTarget(s),x&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=p,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ms||t.mapping===Ss;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=zc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Lc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Jt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Dr(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,Zo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Rc[(s-r-1)%Rc.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,p=new Jt(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Oi-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Oi;m>Oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Oi}`);const h=[];let S=0;for(let E=0;E<Oi;++E){const A=E/x,b=Math.exp(-A*A/2);h.push(b),E===0?S+=b:E<m&&(S+=2*b)}for(let E=0;E<h.length;E++)h[E]=h[E]/S;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const v=this._sizeLods[s],T=3*v*(s>M-ds?s-M+ds:0),_=4*(this._cubeSize-v);Dr(e,T,_,3*v,2*v),l.setRenderTarget(e),l.render(p,Zo)}}function Xg(i){const t=[],e=[],n=[];let s=i;const r=i-ds+1+Tc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ds?l=Tc[o-i+ds-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,p=1+c,d=[u,u,p,u,p,p,u,u,p,p,u,p],f=6,g=6,x=3,m=2,h=1,S=new Float32Array(x*g*f),M=new Float32Array(m*g*f),v=new Float32Array(h*g*f);for(let _=0;_<f;_++){const E=_%3*2/3-1,A=_>2?0:-1,b=[E,A,0,E+2/3,A,0,E+2/3,A+1,0,E,A,0,E+2/3,A+1,0,E,A+1,0];S.set(b,x*g*_),M.set(d,m*g*_);const y=[_,_,_,_,_,_];v.set(y,h*g*_)}const T=new _e;T.setAttribute("position",new Te(S,x)),T.setAttribute("uv",new Te(M,m)),T.setAttribute("faceIndex",new Te(v,h)),t.push(T),s>ds&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Pc(i,t,e){const n=new bn(i,t,e);return n.texture.mapping=mo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Dr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function qg(i,t,e){const n=new Float32Array(Oi),s=new J(0,1,0);return new De({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Pl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Lc(){return new De({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pl(),fragmentShader:`

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
		`,blending:ni,depthTest:!1,depthWrite:!1})}function zc(){return new De({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ni,depthTest:!1,depthWrite:!1})}function Pl(){return`

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
	`}function $g(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Ca||l===Pa,u=l===Ms||l===Ss;if(c||u){let p=t.get(a);const d=p!==void 0?p.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Cc(i)),p=c?e.fromEquirectangular(a,p):e.fromCubemap(a,p),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),p.texture;if(p!==void 0)return p.texture;{const f=a.image;return c&&f&&f.height>0||u&&f&&s(f)?(e===null&&(e=new Cc(i)),p=c?e.fromEquirectangular(a):e.fromCubemap(a),p.texture.pmremVersion=a.pmremVersion,t.set(a,p),a.addEventListener("dispose",r),p.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Yg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&nr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function jg(i,t,e,n){const s={},r=new WeakMap;function o(p){const d=p.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const x=d.morphAttributes[g];for(let m=0,h=x.length;m<h;m++)t.remove(x[m])}d.removeEventListener("dispose",o),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(p,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(p){const d=p.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=p.morphAttributes;for(const g in f){const x=f[g];for(let m=0,h=x.length;m<h;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(p){const d=[],f=p.index,g=p.attributes.position;let x=0;if(f!==null){const S=f.array;x=f.version;for(let M=0,v=S.length;M<v;M+=3){const T=S[M+0],_=S[M+1],E=S[M+2];d.push(T,_,_,E,E,T)}}else if(g!==void 0){const S=g.array;x=g.version;for(let M=0,v=S.length/3-1;M<v;M+=3){const T=M+0,_=M+1,E=M+2;d.push(T,_,_,E,E,T)}}else return;const m=new(dh(d)?vh:xh)(d,1);m.version=x;const h=r.get(p);h&&t.remove(h),r.set(p,m)}function u(p){const d=r.get(p);if(d){const f=p.index;f!==null&&d.version<f.version&&c(p)}else c(p);return r.get(p)}return{get:a,update:l,getWireframeAttribute:u}}function Kg(i,t,e){let n;function s(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function u(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let h=0;h<g;h++)m+=f[h];e.update(m,n,1)}function p(d,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let h=0;h<d.length;h++)c(d[h]/o,f[h],x[h]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,x,0,g);let h=0;for(let S=0;S<g;S++)h+=f[S]*x[S];e.update(h,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=p}function Zg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Jg(i,t,e){const n=new WeakMap,s=new ce;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,p=u!==void 0?u.length:0;let d=n.get(a);if(d===void 0||d.count!==p){let b=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();const f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],h=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let M=0;f===!0&&(M=1),g===!0&&(M=2),x===!0&&(M=3);let v=a.attributes.position.count*M,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const _=new Float32Array(v*T*4*p),E=new mh(_,v,T,p);E.type=Bn,E.needsUpdate=!0;const A=M*4;for(let y=0;y<p;y++){const w=m[y],P=h[y],U=S[y],H=v*T*4*y;for(let $=0;$<w.count;$++){const G=$*A;f===!0&&(s.fromBufferAttribute(w,$),_[H+G+0]=s.x,_[H+G+1]=s.y,_[H+G+2]=s.z,_[H+G+3]=0),g===!0&&(s.fromBufferAttribute(P,$),_[H+G+4]=s.x,_[H+G+5]=s.y,_[H+G+6]=s.z,_[H+G+7]=0),x===!0&&(s.fromBufferAttribute(U,$),_[H+G+8]=s.x,_[H+G+9]=s.y,_[H+G+10]=s.z,_[H+G+11]=U.itemSize===4?s.w:1)}}d={count:p,texture:E,size:new Kt(v,T)},n.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];const g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function Qg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,p=t.get(l,u);if(s.get(p)!==c&&(t.update(p),s.set(p,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return p}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class Ll extends en{constructor(t,e,n,s,r,o,a,l,c,u=xs){if(u!==xs&&u!==ws)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===xs&&(n=Hi),n===void 0&&u===ws&&(n=bs),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:gn,this.minFilter=l!==void 0?l:gn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const bh=new en,Ic=new Ll(1,1),wh=new mh,Eh=new Bd,Th=new Mh,Dc=[],Uc=[],Nc=new Float32Array(16),Fc=new Float32Array(9),Oc=new Float32Array(4);function Is(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Dc[s];if(r===void 0&&(r=new Float32Array(s),Dc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Fe(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Oe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function vo(i,t){let e=Uc[t];e===void 0&&(e=new Int32Array(t),Uc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function t0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function e0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2fv(this.addr,t),Oe(e,t)}}function n0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;i.uniform3fv(this.addr,t),Oe(e,t)}}function i0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4fv(this.addr,t),Oe(e,t)}}function s0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Oc.set(n),i.uniformMatrix2fv(this.addr,!1,Oc),Oe(e,n)}}function r0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Fc.set(n),i.uniformMatrix3fv(this.addr,!1,Fc),Oe(e,n)}}function o0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Fe(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Fe(e,n))return;Nc.set(n),i.uniformMatrix4fv(this.addr,!1,Nc),Oe(e,n)}}function a0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function l0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2iv(this.addr,t),Oe(e,t)}}function c0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3iv(this.addr,t),Oe(e,t)}}function u0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4iv(this.addr,t),Oe(e,t)}}function h0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function f0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;i.uniform2uiv(this.addr,t),Oe(e,t)}}function d0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;i.uniform3uiv(this.addr,t),Oe(e,t)}}function p0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;i.uniform4uiv(this.addr,t),Oe(e,t)}}function m0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Ic.compareFunction=fh,r=Ic):r=bh,e.setTexture2D(t||r,s)}function g0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Eh,s)}function x0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Th,s)}function v0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||wh,s)}function _0(i){switch(i){case 5126:return t0;case 35664:return e0;case 35665:return n0;case 35666:return i0;case 35674:return s0;case 35675:return r0;case 35676:return o0;case 5124:case 35670:return a0;case 35667:case 35671:return l0;case 35668:case 35672:return c0;case 35669:case 35673:return u0;case 5125:return h0;case 36294:return f0;case 36295:return d0;case 36296:return p0;case 35678:case 36198:case 36298:case 36306:case 35682:return m0;case 35679:case 36299:case 36307:return g0;case 35680:case 36300:case 36308:case 36293:return x0;case 36289:case 36303:case 36311:case 36292:return v0}}function y0(i,t){i.uniform1fv(this.addr,t)}function M0(i,t){const e=Is(t,this.size,2);i.uniform2fv(this.addr,e)}function S0(i,t){const e=Is(t,this.size,3);i.uniform3fv(this.addr,e)}function b0(i,t){const e=Is(t,this.size,4);i.uniform4fv(this.addr,e)}function w0(i,t){const e=Is(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function E0(i,t){const e=Is(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function T0(i,t){const e=Is(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function A0(i,t){i.uniform1iv(this.addr,t)}function R0(i,t){i.uniform2iv(this.addr,t)}function C0(i,t){i.uniform3iv(this.addr,t)}function P0(i,t){i.uniform4iv(this.addr,t)}function L0(i,t){i.uniform1uiv(this.addr,t)}function z0(i,t){i.uniform2uiv(this.addr,t)}function I0(i,t){i.uniform3uiv(this.addr,t)}function D0(i,t){i.uniform4uiv(this.addr,t)}function U0(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||bh,r[o])}function N0(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Eh,r[o])}function F0(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Th,r[o])}function O0(i,t,e){const n=this.cache,s=t.length,r=vo(e,s);Fe(n,r)||(i.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||wh,r[o])}function k0(i){switch(i){case 5126:return y0;case 35664:return M0;case 35665:return S0;case 35666:return b0;case 35674:return w0;case 35675:return E0;case 35676:return T0;case 5124:case 35670:return A0;case 35667:case 35671:return R0;case 35668:case 35672:return C0;case 35669:case 35673:return P0;case 5125:return L0;case 36294:return z0;case 36295:return I0;case 36296:return D0;case 35678:case 36198:case 36298:case 36306:case 35682:return U0;case 35679:case 36299:case 36307:return N0;case 35680:case 36300:case 36308:case 36293:return F0;case 36289:case 36303:case 36311:case 36292:return O0}}class B0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=_0(e.type)}}class G0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=k0(e.type)}}class H0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const na=/(\w+)(\])?(\[|\.)?/g;function kc(i,t){i.seq.push(t),i.map[t.id]=t}function V0(i,t,e){const n=i.name,s=n.length;for(na.lastIndex=0;;){const r=na.exec(n),o=na.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){kc(e,c===void 0?new B0(a,i,t):new G0(a,i,t));break}else{let p=e.map[a];p===void 0&&(p=new H0(a),kc(e,p)),e=p}}}class lo{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);V0(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Bc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const W0=37297;let X0=0;function q0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Gc=new ie;function $0(i){le._getMatrix(Gc,le.workingColorSpace,i);const t=`mat3( ${Gc.elements.map(e=>e.toFixed(4))} )`;switch(le.getTransfer(i)){case xo:return[t,"LinearTransferOETF"];case xe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Hc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+q0(i.getShaderSource(t),o)}else return s}function Y0(i,t){const e=$0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function j0(i,t){let e;switch(t){case ju:e="Linear";break;case Ku:e="Reinhard";break;case Zu:e="Cineon";break;case Ju:e="ACESFilmic";break;case Qu:e="AgX";break;case th:e="Neutral";break;case sd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ur=new J;function K0(){le.getLuminanceCoefficients(Ur);const i=Ur.x.toFixed(4),t=Ur.y.toFixed(4),e=Ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Z0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ir).join(`
`)}function J0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Q0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ir(i){return i!==""}function Vc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const tx=/^[ \t]*#include +<([\w\d./]+)>/gm;function ol(i){return i.replace(tx,nx)}const ex=new Map;function nx(i,t){let e=se[t];if(e===void 0){const n=ex.get(t);if(n!==void 0)e=se[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ol(e)}const ix=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xc(i){return i.replace(ix,sx)}function sx(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function qc(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function rx(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Yu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Ff?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Zn&&(t="SHADOWMAP_TYPE_VSM"),t}function ox(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ms:case Ss:t="ENVMAP_TYPE_CUBE";break;case mo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ax(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ss:t="ENVMAP_MODE_REFRACTION";break}return t}function lx(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case vl:t="ENVMAP_BLENDING_MULTIPLY";break;case nd:t="ENVMAP_BLENDING_MIX";break;case id:t="ENVMAP_BLENDING_ADD";break}return t}function cx(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function ux(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=rx(e),c=ox(e),u=ax(e),p=lx(e),d=cx(e),f=Z0(e),g=J0(r),x=s.createProgram();let m,h,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ir).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ir).join(`
`),h.length>0&&(h+=`
`)):(m=[qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ir).join(`
`),h=[qc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+p:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==bi?"#define TONE_MAPPING":"",e.toneMapping!==bi?se.tonemapping_pars_fragment:"",e.toneMapping!==bi?j0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,Y0("linearToOutputTexel",e.outputColorSpace),K0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ir).join(`
`)),o=ol(o),o=Vc(o,e),o=Wc(o,e),a=ol(a),a=Vc(a,e),a=Wc(a,e),o=Xc(o),a=Xc(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",e.glslVersion===sc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===sc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const M=S+m+o,v=S+h+a,T=Bc(s,s.VERTEX_SHADER,M),_=Bc(s,s.FRAGMENT_SHADER,v);s.attachShader(x,T),s.attachShader(x,_),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(w){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(x).trim(),U=s.getShaderInfoLog(T).trim(),H=s.getShaderInfoLog(_).trim();let $=!0,G=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,_);else{const B=Hc(s,T,"vertex"),N=Hc(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+P+`
`+B+`
`+N)}else P!==""?console.warn("THREE.WebGLProgram: Program Info Log:",P):(U===""||H==="")&&(G=!1);G&&(w.diagnostics={runnable:$,programLog:P,vertexShader:{log:U,prefix:m},fragmentShader:{log:H,prefix:h}})}s.deleteShader(T),s.deleteShader(_),A=new lo(s,x),b=Q0(s,x)}let A;this.getUniforms=function(){return A===void 0&&E(this),A};let b;this.getAttributes=function(){return b===void 0&&E(this),b};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(x,W0)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=X0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=_,this}let hx=0;class fx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new dx(t),e.set(t,n)),n}}class dx{constructor(t){this.id=hx++,this.code=t,this.usedTimes=0}}function px(i,t,e,n,s,r,o){const a=new Al,l=new fx,c=new Set,u=[],p=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,y,w,P,U){const H=P.fog,$=U.geometry,G=b.isMeshStandardMaterial?P.environment:null,B=(b.isMeshStandardMaterial?e:t).get(b.envMap||G),N=B&&B.mapping===mo?B.image.height:null,Q=g[b.type];b.precision!==null&&(f=s.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));const st=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,Mt=st!==void 0?st.length:0;let Pt=0;$.morphAttributes.position!==void 0&&(Pt=1),$.morphAttributes.normal!==void 0&&(Pt=2),$.morphAttributes.color!==void 0&&(Pt=3);let Et,rt,nt,Tt;if(Q){const re=ln[Q];Et=re.vertexShader,rt=re.fragmentShader}else Et=b.vertexShader,rt=b.fragmentShader,l.update(b),nt=l.getVertexShaderID(b),Tt=l.getFragmentShaderID(b);const _t=i.getRenderTarget(),Rt=i.state.buffers.depth.getReversed(),L=U.isInstancedMesh===!0,X=U.isBatchedMesh===!0,et=!!b.map,tt=!!b.matcap,dt=!!B,V=!!b.aoMap,zt=!!b.lightMap,vt=!!b.bumpMap,At=!!b.normalMap,Ct=!!b.displacementMap,Vt=!!b.emissiveMap,ft=!!b.metalnessMap,I=!!b.roughnessMap,C=b.anisotropy>0,R=b.clearcoat>0,F=b.dispersion>0,K=b.iridescence>0,z=b.sheen>0,it=b.transmission>0,Z=C&&!!b.anisotropyMap,ht=R&&!!b.clearcoatMap,St=R&&!!b.clearcoatNormalMap,ut=R&&!!b.clearcoatRoughnessMap,k=K&&!!b.iridescenceMap,W=K&&!!b.iridescenceThicknessMap,q=z&&!!b.sheenColorMap,O=z&&!!b.sheenRoughnessMap,lt=!!b.specularMap,gt=!!b.specularColorMap,It=!!b.specularIntensityMap,j=it&&!!b.transmissionMap,xt=it&&!!b.thicknessMap,ct=!!b.gradientMap,bt=!!b.alphaMap,Dt=b.alphaTest>0,Lt=!!b.alphaHash,Yt=!!b.extensions;let ue=bi;b.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(ue=i.toneMapping);const ge={shaderID:Q,shaderType:b.type,shaderName:b.name,vertexShader:Et,fragmentShader:rt,defines:b.defines,customVertexShaderID:nt,customFragmentShaderID:Tt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:X,batchingColor:X&&U._colorsTexture!==null,instancing:L,instancingColor:L&&U.instanceColor!==null,instancingMorph:L&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:_t===null?i.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:Cs,alphaToCoverage:!!b.alphaToCoverage,map:et,matcap:tt,envMap:dt,envMapMode:dt&&B.mapping,envMapCubeUVHeight:N,aoMap:V,lightMap:zt,bumpMap:vt,normalMap:At,displacementMap:d&&Ct,emissiveMap:Vt,normalMapObjectSpace:At&&b.normalMapType===ld,normalMapTangentSpace:At&&b.normalMapType===hh,metalnessMap:ft,roughnessMap:I,anisotropy:C,anisotropyMap:Z,clearcoat:R,clearcoatMap:ht,clearcoatNormalMap:St,clearcoatRoughnessMap:ut,dispersion:F,iridescence:K,iridescenceMap:k,iridescenceThicknessMap:W,sheen:z,sheenColorMap:q,sheenRoughnessMap:O,specularMap:lt,specularColorMap:gt,specularIntensityMap:It,transmission:it,transmissionMap:j,thicknessMap:xt,gradientMap:ct,opaque:b.transparent===!1&&b.blending===gs&&b.alphaToCoverage===!1,alphaMap:bt,alphaTest:Dt,alphaHash:Lt,combine:b.combine,mapUv:et&&x(b.map.channel),aoMapUv:V&&x(b.aoMap.channel),lightMapUv:zt&&x(b.lightMap.channel),bumpMapUv:vt&&x(b.bumpMap.channel),normalMapUv:At&&x(b.normalMap.channel),displacementMapUv:Ct&&x(b.displacementMap.channel),emissiveMapUv:Vt&&x(b.emissiveMap.channel),metalnessMapUv:ft&&x(b.metalnessMap.channel),roughnessMapUv:I&&x(b.roughnessMap.channel),anisotropyMapUv:Z&&x(b.anisotropyMap.channel),clearcoatMapUv:ht&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:St&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ut&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:k&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:W&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:q&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:O&&x(b.sheenRoughnessMap.channel),specularMapUv:lt&&x(b.specularMap.channel),specularColorMapUv:gt&&x(b.specularColorMap.channel),specularIntensityMapUv:It&&x(b.specularIntensityMap.channel),transmissionMapUv:j&&x(b.transmissionMap.channel),thicknessMapUv:xt&&x(b.thicknessMap.channel),alphaMapUv:bt&&x(b.alphaMap.channel),vertexTangents:!!$.attributes.tangent&&(At||C),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!$.attributes.uv&&(et||bt),fog:!!H,useFog:b.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:Rt,skinning:U.isSkinnedMesh===!0,morphTargets:$.morphAttributes.position!==void 0,morphNormals:$.morphAttributes.normal!==void 0,morphColors:$.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:Pt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&w.length>0,shadowMapType:i.shadowMap.type,toneMapping:ue,decodeVideoTexture:et&&b.map.isVideoTexture===!0&&le.getTransfer(b.map.colorSpace)===xe,decodeVideoTextureEmissive:Vt&&b.emissiveMap.isVideoTexture===!0&&le.getTransfer(b.emissiveMap.colorSpace)===xe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ae,flipSided:b.side===cn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Yt&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Yt&&b.extensions.multiDraw===!0||X)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ge.vertexUv1s=c.has(1),ge.vertexUv2s=c.has(2),ge.vertexUv3s=c.has(3),c.clear(),ge}function h(b){const y=[];if(b.shaderID?y.push(b.shaderID):(y.push(b.customVertexShaderID),y.push(b.customFragmentShaderID)),b.defines!==void 0)for(const w in b.defines)y.push(w),y.push(b.defines[w]);return b.isRawShaderMaterial===!1&&(S(y,b),M(y,b),y.push(i.outputColorSpace)),y.push(b.customProgramCacheKey),y.join()}function S(b,y){b.push(y.precision),b.push(y.outputColorSpace),b.push(y.envMapMode),b.push(y.envMapCubeUVHeight),b.push(y.mapUv),b.push(y.alphaMapUv),b.push(y.lightMapUv),b.push(y.aoMapUv),b.push(y.bumpMapUv),b.push(y.normalMapUv),b.push(y.displacementMapUv),b.push(y.emissiveMapUv),b.push(y.metalnessMapUv),b.push(y.roughnessMapUv),b.push(y.anisotropyMapUv),b.push(y.clearcoatMapUv),b.push(y.clearcoatNormalMapUv),b.push(y.clearcoatRoughnessMapUv),b.push(y.iridescenceMapUv),b.push(y.iridescenceThicknessMapUv),b.push(y.sheenColorMapUv),b.push(y.sheenRoughnessMapUv),b.push(y.specularMapUv),b.push(y.specularColorMapUv),b.push(y.specularIntensityMapUv),b.push(y.transmissionMapUv),b.push(y.thicknessMapUv),b.push(y.combine),b.push(y.fogExp2),b.push(y.sizeAttenuation),b.push(y.morphTargetsCount),b.push(y.morphAttributeCount),b.push(y.numDirLights),b.push(y.numPointLights),b.push(y.numSpotLights),b.push(y.numSpotLightMaps),b.push(y.numHemiLights),b.push(y.numRectAreaLights),b.push(y.numDirLightShadows),b.push(y.numPointLightShadows),b.push(y.numSpotLightShadows),b.push(y.numSpotLightShadowsWithMaps),b.push(y.numLightProbes),b.push(y.shadowMapType),b.push(y.toneMapping),b.push(y.numClippingPlanes),b.push(y.numClipIntersection),b.push(y.depthPacking)}function M(b,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),b.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),b.push(a.mask)}function v(b){const y=g[b.type];let w;if(y){const P=ln[y];w=Ei.clone(P.uniforms)}else w=b.uniforms;return w}function T(b,y){let w;for(let P=0,U=u.length;P<U;P++){const H=u[P];if(H.cacheKey===y){w=H,++w.usedTimes;break}}return w===void 0&&(w=new ux(i,y,b,r),u.push(w)),w}function _(b){if(--b.usedTimes===0){const y=u.indexOf(b);u[y]=u[u.length-1],u.pop(),b.destroy()}}function E(b){l.remove(b)}function A(){l.dispose()}return{getParameters:m,getProgramCacheKey:h,getUniforms:v,acquireProgram:T,releaseProgram:_,releaseShaderCache:E,programs:u,dispose:A}}function mx(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function gx(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function $c(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Yc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(p,d,f,g,x,m){let h=i[t];return h===void 0?(h={id:p.id,object:p,geometry:d,material:f,groupOrder:g,renderOrder:p.renderOrder,z:x,group:m},i[t]=h):(h.id=p.id,h.object=p,h.geometry=d,h.material=f,h.groupOrder=g,h.renderOrder=p.renderOrder,h.z=x,h.group=m),t++,h}function a(p,d,f,g,x,m){const h=o(p,d,f,g,x,m);f.transmission>0?n.push(h):f.transparent===!0?s.push(h):e.push(h)}function l(p,d,f,g,x,m){const h=o(p,d,f,g,x,m);f.transmission>0?n.unshift(h):f.transparent===!0?s.unshift(h):e.unshift(h)}function c(p,d){e.length>1&&e.sort(p||gx),n.length>1&&n.sort(d||$c),s.length>1&&s.sort(d||$c)}function u(){for(let p=t,d=i.length;p<d;p++){const f=i[p];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function xx(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Yc,i.set(n,[o])):s>=r.length?(o=new Yc,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function vx(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new J,color:new Wt};break;case"SpotLight":e={position:new J,direction:new J,color:new Wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new J,color:new Wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new J,skyColor:new Wt,groundColor:new Wt};break;case"RectAreaLight":e={color:new Wt,position:new J,halfWidth:new J,halfHeight:new J};break}return i[t.id]=e,e}}}function _x(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let yx=0;function Mx(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Sx(i){const t=new vx,e=_x(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new J);const s=new J,r=new he,o=new he;function a(c){let u=0,p=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let f=0,g=0,x=0,m=0,h=0,S=0,M=0,v=0,T=0,_=0,E=0;c.sort(Mx);for(let b=0,y=c.length;b<y;b++){const w=c[b],P=w.color,U=w.intensity,H=w.distance,$=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)u+=P.r*U,p+=P.g*U,d+=P.b*U;else if(w.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(w.sh.coefficients[G],U);E++}else if(w.isDirectionalLight){const G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const B=w.shadow,N=e.get(w);N.shadowIntensity=B.intensity,N.shadowBias=B.bias,N.shadowNormalBias=B.normalBias,N.shadowRadius=B.radius,N.shadowMapSize=B.mapSize,n.directionalShadow[f]=N,n.directionalShadowMap[f]=$,n.directionalShadowMatrix[f]=w.shadow.matrix,S++}n.directional[f]=G,f++}else if(w.isSpotLight){const G=t.get(w);G.position.setFromMatrixPosition(w.matrixWorld),G.color.copy(P).multiplyScalar(U),G.distance=H,G.coneCos=Math.cos(w.angle),G.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),G.decay=w.decay,n.spot[x]=G;const B=w.shadow;if(w.map&&(n.spotLightMap[T]=w.map,T++,B.updateMatrices(w),w.castShadow&&_++),n.spotLightMatrix[x]=B.matrix,w.castShadow){const N=e.get(w);N.shadowIntensity=B.intensity,N.shadowBias=B.bias,N.shadowNormalBias=B.normalBias,N.shadowRadius=B.radius,N.shadowMapSize=B.mapSize,n.spotShadow[x]=N,n.spotShadowMap[x]=$,v++}x++}else if(w.isRectAreaLight){const G=t.get(w);G.color.copy(P).multiplyScalar(U),G.halfWidth.set(w.width*.5,0,0),G.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=G,m++}else if(w.isPointLight){const G=t.get(w);if(G.color.copy(w.color).multiplyScalar(w.intensity),G.distance=w.distance,G.decay=w.decay,w.castShadow){const B=w.shadow,N=e.get(w);N.shadowIntensity=B.intensity,N.shadowBias=B.bias,N.shadowNormalBias=B.normalBias,N.shadowRadius=B.radius,N.shadowMapSize=B.mapSize,N.shadowCameraNear=B.camera.near,N.shadowCameraFar=B.camera.far,n.pointShadow[g]=N,n.pointShadowMap[g]=$,n.pointShadowMatrix[g]=w.shadow.matrix,M++}n.point[g]=G,g++}else if(w.isHemisphereLight){const G=t.get(w);G.skyColor.copy(w.color).multiplyScalar(U),G.groundColor.copy(w.groundColor).multiplyScalar(U),n.hemi[h]=G,h++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Gt.LTC_FLOAT_1,n.rectAreaLTC2=Gt.LTC_FLOAT_2):(n.rectAreaLTC1=Gt.LTC_HALF_1,n.rectAreaLTC2=Gt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=p,n.ambient[2]=d;const A=n.hash;(A.directionalLength!==f||A.pointLength!==g||A.spotLength!==x||A.rectAreaLength!==m||A.hemiLength!==h||A.numDirectionalShadows!==S||A.numPointShadows!==M||A.numSpotShadows!==v||A.numSpotMaps!==T||A.numLightProbes!==E)&&(n.directional.length=f,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=v+T-_,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=E,A.directionalLength=f,A.pointLength=g,A.spotLength=x,A.rectAreaLength=m,A.hemiLength=h,A.numDirectionalShadows=S,A.numPointShadows=M,A.numSpotShadows=v,A.numSpotMaps=T,A.numLightProbes=E,n.version=yx++)}function l(c,u){let p=0,d=0,f=0,g=0,x=0;const m=u.matrixWorldInverse;for(let h=0,S=c.length;h<S;h++){const M=c[h];if(M.isDirectionalLight){const v=n.directional[p];v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),p++}else if(M.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(M.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(M.width*.5,0,0),v.halfHeight.set(0,M.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(M.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(M.matrixWorld),v.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(M.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function jc(i){const t=new Sx(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function bx(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new jc(i),t.set(s,[a])):r>=o.length?(a=new jc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class wx extends Ls{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=od,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Ex extends Ls{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Tx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ax=`uniform sampler2D shadow_pass;
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
}`;function Rx(i,t,e){let n=new Rl;const s=new Kt,r=new Kt,o=new ce,a=new wx({depthPacking:ad}),l=new Ex,c={},u=e.maxTextureSize,p={[wi]:cn,[cn]:wi,[Ae]:Ae},d=new De({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Kt},radius:{value:4}},vertexShader:Tx,fragmentShader:Ax}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new _e;g.setAttribute("position",new Te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Jt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yu;let h=this.type;this.render=function(_,E,A){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||_.length===0)return;const b=i.getRenderTarget(),y=i.getActiveCubeFace(),w=i.getActiveMipmapLevel(),P=i.state;P.setBlending(ni),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const U=h!==Zn&&this.type===Zn,H=h===Zn&&this.type!==Zn;for(let $=0,G=_.length;$<G;$++){const B=_[$],N=B.shadow;if(N===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const Q=N.getFrameExtents();if(s.multiply(Q),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,N.mapSize.y=r.y)),N.map===null||U===!0||H===!0){const Mt=this.type!==Zn?{minFilter:gn,magFilter:gn}:{};N.map!==null&&N.map.dispose(),N.map=new bn(s.x,s.y,Mt),N.map.texture.name=B.name+".shadowMap",N.camera.updateProjectionMatrix()}i.setRenderTarget(N.map),i.clear();const st=N.getViewportCount();for(let Mt=0;Mt<st;Mt++){const Pt=N.getViewport(Mt);o.set(r.x*Pt.x,r.y*Pt.y,r.x*Pt.z,r.y*Pt.w),P.viewport(o),N.updateMatrices(B,Mt),n=N.getFrustum(),v(E,A,N.camera,B,this.type)}N.isPointLightShadow!==!0&&this.type===Zn&&S(N,A),N.needsUpdate=!1}h=this.type,m.needsUpdate=!1,i.setRenderTarget(b,y,w)};function S(_,E){const A=t.update(x);d.defines.VSM_SAMPLES!==_.blurSamples&&(d.defines.VSM_SAMPLES=_.blurSamples,f.defines.VSM_SAMPLES=_.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new bn(s.x,s.y)),d.uniforms.shadow_pass.value=_.map.texture,d.uniforms.resolution.value=_.mapSize,d.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(E,null,A,d,x,null),f.uniforms.shadow_pass.value=_.mapPass.texture,f.uniforms.resolution.value=_.mapSize,f.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(E,null,A,f,x,null)}function M(_,E,A,b){let y=null;const w=A.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(w!==void 0)y=w;else if(y=A.isPointLight===!0?l:a,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const P=y.uuid,U=E.uuid;let H=c[P];H===void 0&&(H={},c[P]=H);let $=H[U];$===void 0&&($=y.clone(),H[U]=$,E.addEventListener("dispose",T)),y=$}if(y.visible=E.visible,y.wireframe=E.wireframe,b===Zn?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:p[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,A.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const P=i.properties.get(y);P.light=A}return y}function v(_,E,A,b,y){if(_.visible===!1)return;if(_.layers.test(E.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&y===Zn)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,_.matrixWorld);const U=t.update(_),H=_.material;if(Array.isArray(H)){const $=U.groups;for(let G=0,B=$.length;G<B;G++){const N=$[G],Q=H[N.materialIndex];if(Q&&Q.visible){const st=M(_,Q,b,y);_.onBeforeShadow(i,_,E,A,U,st,N),i.renderBufferDirect(A,null,U,st,_,N),_.onAfterShadow(i,_,E,A,U,st,N)}}}else if(H.visible){const $=M(_,H,b,y);_.onBeforeShadow(i,_,E,A,U,$,null),i.renderBufferDirect(A,null,U,$,_,null),_.onAfterShadow(i,_,E,A,U,$,null)}}const P=_.children;for(let U=0,H=P.length;U<H;U++)v(P[U],E,A,b,y)}function T(_){_.target.removeEventListener("dispose",T);for(const A in c){const b=c[A],y=_.target.uuid;y in b&&(b[y].dispose(),delete b[y])}}}const Cx={[Sa]:ba,[wa]:Aa,[Ea]:Ra,[ys]:Ta,[ba]:Sa,[Aa]:wa,[Ra]:Ea,[Ta]:ys};function Px(i,t){function e(){let j=!1;const xt=new ce;let ct=null;const bt=new ce(0,0,0,0);return{setMask:function(Dt){ct!==Dt&&!j&&(i.colorMask(Dt,Dt,Dt,Dt),ct=Dt)},setLocked:function(Dt){j=Dt},setClear:function(Dt,Lt,Yt,ue,ge){ge===!0&&(Dt*=ue,Lt*=ue,Yt*=ue),xt.set(Dt,Lt,Yt,ue),bt.equals(xt)===!1&&(i.clearColor(Dt,Lt,Yt,ue),bt.copy(xt))},reset:function(){j=!1,ct=null,bt.set(-1,0,0,0)}}}function n(){let j=!1,xt=!1,ct=null,bt=null,Dt=null;return{setReversed:function(Lt){if(xt!==Lt){const Yt=t.get("EXT_clip_control");xt?Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.ZERO_TO_ONE_EXT):Yt.clipControlEXT(Yt.LOWER_LEFT_EXT,Yt.NEGATIVE_ONE_TO_ONE_EXT);const ue=Dt;Dt=null,this.setClear(ue)}xt=Lt},getReversed:function(){return xt},setTest:function(Lt){Lt?_t(i.DEPTH_TEST):Rt(i.DEPTH_TEST)},setMask:function(Lt){ct!==Lt&&!j&&(i.depthMask(Lt),ct=Lt)},setFunc:function(Lt){if(xt&&(Lt=Cx[Lt]),bt!==Lt){switch(Lt){case Sa:i.depthFunc(i.NEVER);break;case ba:i.depthFunc(i.ALWAYS);break;case wa:i.depthFunc(i.LESS);break;case ys:i.depthFunc(i.LEQUAL);break;case Ea:i.depthFunc(i.EQUAL);break;case Ta:i.depthFunc(i.GEQUAL);break;case Aa:i.depthFunc(i.GREATER);break;case Ra:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}bt=Lt}},setLocked:function(Lt){j=Lt},setClear:function(Lt){Dt!==Lt&&(xt&&(Lt=1-Lt),i.clearDepth(Lt),Dt=Lt)},reset:function(){j=!1,ct=null,bt=null,Dt=null,xt=!1}}}function s(){let j=!1,xt=null,ct=null,bt=null,Dt=null,Lt=null,Yt=null,ue=null,ge=null;return{setTest:function(re){j||(re?_t(i.STENCIL_TEST):Rt(i.STENCIL_TEST))},setMask:function(re){xt!==re&&!j&&(i.stencilMask(re),xt=re)},setFunc:function(re,Ue,Ke){(ct!==re||bt!==Ue||Dt!==Ke)&&(i.stencilFunc(re,Ue,Ke),ct=re,bt=Ue,Dt=Ke)},setOp:function(re,Ue,Ke){(Lt!==re||Yt!==Ue||ue!==Ke)&&(i.stencilOp(re,Ue,Ke),Lt=re,Yt=Ue,ue=Ke)},setLocked:function(re){j=re},setClear:function(re){ge!==re&&(i.clearStencil(re),ge=re)},reset:function(){j=!1,xt=null,ct=null,bt=null,Dt=null,Lt=null,Yt=null,ue=null,ge=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},p={},d=new WeakMap,f=[],g=null,x=!1,m=null,h=null,S=null,M=null,v=null,T=null,_=null,E=new Wt(0,0,0),A=0,b=!1,y=null,w=null,P=null,U=null,H=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,B=0;const N=i.getParameter(i.VERSION);N.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(N)[1]),G=B>=1):N.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),G=B>=2);let Q=null,st={};const Mt=i.getParameter(i.SCISSOR_BOX),Pt=i.getParameter(i.VIEWPORT),Et=new ce().fromArray(Mt),rt=new ce().fromArray(Pt);function nt(j,xt,ct,bt){const Dt=new Uint8Array(4),Lt=i.createTexture();i.bindTexture(j,Lt),i.texParameteri(j,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(j,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Yt=0;Yt<ct;Yt++)j===i.TEXTURE_3D||j===i.TEXTURE_2D_ARRAY?i.texImage3D(xt,0,i.RGBA,1,1,bt,0,i.RGBA,i.UNSIGNED_BYTE,Dt):i.texImage2D(xt+Yt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Dt);return Lt}const Tt={};Tt[i.TEXTURE_2D]=nt(i.TEXTURE_2D,i.TEXTURE_2D,1),Tt[i.TEXTURE_CUBE_MAP]=nt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Tt[i.TEXTURE_2D_ARRAY]=nt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Tt[i.TEXTURE_3D]=nt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),_t(i.DEPTH_TEST),o.setFunc(ys),vt(!1),At(tc),_t(i.CULL_FACE),V(ni);function _t(j){u[j]!==!0&&(i.enable(j),u[j]=!0)}function Rt(j){u[j]!==!1&&(i.disable(j),u[j]=!1)}function L(j,xt){return p[j]!==xt?(i.bindFramebuffer(j,xt),p[j]=xt,j===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=xt),j===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=xt),!0):!1}function X(j,xt){let ct=f,bt=!1;if(j){ct=d.get(xt),ct===void 0&&(ct=[],d.set(xt,ct));const Dt=j.textures;if(ct.length!==Dt.length||ct[0]!==i.COLOR_ATTACHMENT0){for(let Lt=0,Yt=Dt.length;Lt<Yt;Lt++)ct[Lt]=i.COLOR_ATTACHMENT0+Lt;ct.length=Dt.length,bt=!0}}else ct[0]!==i.BACK&&(ct[0]=i.BACK,bt=!0);bt&&i.drawBuffers(ct)}function et(j){return g!==j?(i.useProgram(j),g=j,!0):!1}const tt={[Fi]:i.FUNC_ADD,[kf]:i.FUNC_SUBTRACT,[Bf]:i.FUNC_REVERSE_SUBTRACT};tt[Gf]=i.MIN,tt[Hf]=i.MAX;const dt={[Vf]:i.ZERO,[Wf]:i.ONE,[Xf]:i.SRC_COLOR,[ya]:i.SRC_ALPHA,[Zf]:i.SRC_ALPHA_SATURATE,[jf]:i.DST_COLOR,[$f]:i.DST_ALPHA,[qf]:i.ONE_MINUS_SRC_COLOR,[Ma]:i.ONE_MINUS_SRC_ALPHA,[Kf]:i.ONE_MINUS_DST_COLOR,[Yf]:i.ONE_MINUS_DST_ALPHA,[Jf]:i.CONSTANT_COLOR,[Qf]:i.ONE_MINUS_CONSTANT_COLOR,[td]:i.CONSTANT_ALPHA,[ed]:i.ONE_MINUS_CONSTANT_ALPHA};function V(j,xt,ct,bt,Dt,Lt,Yt,ue,ge,re){if(j===ni){x===!0&&(Rt(i.BLEND),x=!1);return}if(x===!1&&(_t(i.BLEND),x=!0),j!==Of){if(j!==m||re!==b){if((h!==Fi||v!==Fi)&&(i.blendEquation(i.FUNC_ADD),h=Fi,v=Fi),re)switch(j){case gs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case He:i.blendFunc(i.ONE,i.ONE);break;case ec:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}else switch(j){case gs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case He:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ec:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",j);break}S=null,M=null,T=null,_=null,E.set(0,0,0),A=0,m=j,b=re}return}Dt=Dt||xt,Lt=Lt||ct,Yt=Yt||bt,(xt!==h||Dt!==v)&&(i.blendEquationSeparate(tt[xt],tt[Dt]),h=xt,v=Dt),(ct!==S||bt!==M||Lt!==T||Yt!==_)&&(i.blendFuncSeparate(dt[ct],dt[bt],dt[Lt],dt[Yt]),S=ct,M=bt,T=Lt,_=Yt),(ue.equals(E)===!1||ge!==A)&&(i.blendColor(ue.r,ue.g,ue.b,ge),E.copy(ue),A=ge),m=j,b=!1}function zt(j,xt){j.side===Ae?Rt(i.CULL_FACE):_t(i.CULL_FACE);let ct=j.side===cn;xt&&(ct=!ct),vt(ct),j.blending===gs&&j.transparent===!1?V(ni):V(j.blending,j.blendEquation,j.blendSrc,j.blendDst,j.blendEquationAlpha,j.blendSrcAlpha,j.blendDstAlpha,j.blendColor,j.blendAlpha,j.premultipliedAlpha),o.setFunc(j.depthFunc),o.setTest(j.depthTest),o.setMask(j.depthWrite),r.setMask(j.colorWrite);const bt=j.stencilWrite;a.setTest(bt),bt&&(a.setMask(j.stencilWriteMask),a.setFunc(j.stencilFunc,j.stencilRef,j.stencilFuncMask),a.setOp(j.stencilFail,j.stencilZFail,j.stencilZPass)),Vt(j.polygonOffset,j.polygonOffsetFactor,j.polygonOffsetUnits),j.alphaToCoverage===!0?_t(i.SAMPLE_ALPHA_TO_COVERAGE):Rt(i.SAMPLE_ALPHA_TO_COVERAGE)}function vt(j){y!==j&&(j?i.frontFace(i.CW):i.frontFace(i.CCW),y=j)}function At(j){j!==Uf?(_t(i.CULL_FACE),j!==w&&(j===tc?i.cullFace(i.BACK):j===Nf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Rt(i.CULL_FACE),w=j}function Ct(j){j!==P&&(G&&i.lineWidth(j),P=j)}function Vt(j,xt,ct){j?(_t(i.POLYGON_OFFSET_FILL),(U!==xt||H!==ct)&&(i.polygonOffset(xt,ct),U=xt,H=ct)):Rt(i.POLYGON_OFFSET_FILL)}function ft(j){j?_t(i.SCISSOR_TEST):Rt(i.SCISSOR_TEST)}function I(j){j===void 0&&(j=i.TEXTURE0+$-1),Q!==j&&(i.activeTexture(j),Q=j)}function C(j,xt,ct){ct===void 0&&(Q===null?ct=i.TEXTURE0+$-1:ct=Q);let bt=st[ct];bt===void 0&&(bt={type:void 0,texture:void 0},st[ct]=bt),(bt.type!==j||bt.texture!==xt)&&(Q!==ct&&(i.activeTexture(ct),Q=ct),i.bindTexture(j,xt||Tt[j]),bt.type=j,bt.texture=xt)}function R(){const j=st[Q];j!==void 0&&j.type!==void 0&&(i.bindTexture(j.type,null),j.type=void 0,j.texture=void 0)}function F(){try{i.compressedTexImage2D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function K(){try{i.compressedTexImage3D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function z(){try{i.texSubImage2D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function it(){try{i.texSubImage3D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function Z(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ht(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function St(){try{i.texStorage2D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function ut(){try{i.texStorage3D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function k(){try{i.texImage2D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function W(){try{i.texImage3D.apply(i,arguments)}catch(j){console.error("THREE.WebGLState:",j)}}function q(j){Et.equals(j)===!1&&(i.scissor(j.x,j.y,j.z,j.w),Et.copy(j))}function O(j){rt.equals(j)===!1&&(i.viewport(j.x,j.y,j.z,j.w),rt.copy(j))}function lt(j,xt){let ct=c.get(xt);ct===void 0&&(ct=new WeakMap,c.set(xt,ct));let bt=ct.get(j);bt===void 0&&(bt=i.getUniformBlockIndex(xt,j.name),ct.set(j,bt))}function gt(j,xt){const bt=c.get(xt).get(j);l.get(xt)!==bt&&(i.uniformBlockBinding(xt,bt,j.__bindingPointIndex),l.set(xt,bt))}function It(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Q=null,st={},p={},d=new WeakMap,f=[],g=null,x=!1,m=null,h=null,S=null,M=null,v=null,T=null,_=null,E=new Wt(0,0,0),A=0,b=!1,y=null,w=null,P=null,U=null,H=null,Et.set(0,0,i.canvas.width,i.canvas.height),rt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:_t,disable:Rt,bindFramebuffer:L,drawBuffers:X,useProgram:et,setBlending:V,setMaterial:zt,setFlipSided:vt,setCullFace:At,setLineWidth:Ct,setPolygonOffset:Vt,setScissorTest:ft,activeTexture:I,bindTexture:C,unbindTexture:R,compressedTexImage2D:F,compressedTexImage3D:K,texImage2D:k,texImage3D:W,updateUBOMapping:lt,uniformBlockBinding:gt,texStorage2D:St,texStorage3D:ut,texSubImage2D:z,texSubImage3D:it,compressedTexSubImage2D:Z,compressedTexSubImage3D:ht,scissor:q,viewport:O,reset:It}}function Kc(i,t,e,n){const s=Lx(n);switch(e){case rh:return i*t;case ah:return i*t;case lh:return i*t*2;case go:return i*t/s.components*s.byteLength;case Sl:return i*t/s.components*s.byteLength;case ch:return i*t*2/s.components*s.byteLength;case bl:return i*t*2/s.components*s.byteLength;case oh:return i*t*3/s.components*s.byteLength;case Ln:return i*t*4/s.components*s.byteLength;case wl:return i*t*4/s.components*s.byteLength;case io:case so:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case ro:case oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ia:case Ua:return Math.max(i,16)*Math.max(t,8)/4;case za:case Da:return Math.max(i,8)*Math.max(t,8)/2;case Na:case Fa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ka:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ga:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Ha:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Va:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Wa:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Xa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case $a:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case ja:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Ka:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ja:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case ao:case Qa:case tl:return Math.ceil(i/4)*Math.ceil(t/4)*16;case uh:case el:return Math.ceil(i/4)*Math.ceil(t/4)*8;case nl:case il:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Lx(i){switch(i){case Hn:case nh:return{byteLength:1,components:1};case cr:case ih:case Gn:return{byteLength:2,components:1};case yl:case Ml:return{byteLength:2,components:4};case Hi:case _l:case Bn:return{byteLength:4,components:1};case sh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function zx(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Kt,u=new WeakMap;let p;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,C){return f?new OffscreenCanvas(I,C):fo("canvas")}function x(I,C,R){let F=1;const K=ft(I);if((K.width>R||K.height>R)&&(F=R/Math.max(K.width,K.height)),F<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const z=Math.floor(F*K.width),it=Math.floor(F*K.height);p===void 0&&(p=g(z,it));const Z=C?g(z,it):p;return Z.width=z,Z.height=it,Z.getContext("2d").drawImage(I,0,0,z,it),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+z+"x"+it+")."),Z}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),I;return I}function m(I){return I.generateMipmaps}function h(I){i.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function M(I,C,R,F,K=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let z=C;if(C===i.RED&&(R===i.FLOAT&&(z=i.R32F),R===i.HALF_FLOAT&&(z=i.R16F),R===i.UNSIGNED_BYTE&&(z=i.R8)),C===i.RED_INTEGER&&(R===i.UNSIGNED_BYTE&&(z=i.R8UI),R===i.UNSIGNED_SHORT&&(z=i.R16UI),R===i.UNSIGNED_INT&&(z=i.R32UI),R===i.BYTE&&(z=i.R8I),R===i.SHORT&&(z=i.R16I),R===i.INT&&(z=i.R32I)),C===i.RG&&(R===i.FLOAT&&(z=i.RG32F),R===i.HALF_FLOAT&&(z=i.RG16F),R===i.UNSIGNED_BYTE&&(z=i.RG8)),C===i.RG_INTEGER&&(R===i.UNSIGNED_BYTE&&(z=i.RG8UI),R===i.UNSIGNED_SHORT&&(z=i.RG16UI),R===i.UNSIGNED_INT&&(z=i.RG32UI),R===i.BYTE&&(z=i.RG8I),R===i.SHORT&&(z=i.RG16I),R===i.INT&&(z=i.RG32I)),C===i.RGB_INTEGER&&(R===i.UNSIGNED_BYTE&&(z=i.RGB8UI),R===i.UNSIGNED_SHORT&&(z=i.RGB16UI),R===i.UNSIGNED_INT&&(z=i.RGB32UI),R===i.BYTE&&(z=i.RGB8I),R===i.SHORT&&(z=i.RGB16I),R===i.INT&&(z=i.RGB32I)),C===i.RGBA_INTEGER&&(R===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),R===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),R===i.UNSIGNED_INT&&(z=i.RGBA32UI),R===i.BYTE&&(z=i.RGBA8I),R===i.SHORT&&(z=i.RGBA16I),R===i.INT&&(z=i.RGBA32I)),C===i.RGB&&R===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),C===i.RGBA){const it=K?xo:le.getTransfer(F);R===i.FLOAT&&(z=i.RGBA32F),R===i.HALF_FLOAT&&(z=i.RGBA16F),R===i.UNSIGNED_BYTE&&(z=it===xe?i.SRGB8_ALPHA8:i.RGBA8),R===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),R===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return(z===i.R16F||z===i.R32F||z===i.RG16F||z===i.RG32F||z===i.RGBA16F||z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),z}function v(I,C){let R;return I?C===null||C===Hi||C===bs?R=i.DEPTH24_STENCIL8:C===Bn?R=i.DEPTH32F_STENCIL8:C===cr&&(R=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Hi||C===bs?R=i.DEPTH_COMPONENT24:C===Bn?R=i.DEPTH_COMPONENT32F:C===cr&&(R=i.DEPTH_COMPONENT16),R}function T(I,C){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==gn&&I.minFilter!==Pn?Math.log2(Math.max(C.width,C.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?C.mipmaps.length:1}function _(I){const C=I.target;C.removeEventListener("dispose",_),A(C),C.isVideoTexture&&u.delete(C)}function E(I){const C=I.target;C.removeEventListener("dispose",E),y(C)}function A(I){const C=n.get(I);if(C.__webglInit===void 0)return;const R=I.source,F=d.get(R);if(F){const K=F[C.__cacheKey];K.usedTimes--,K.usedTimes===0&&b(I),Object.keys(F).length===0&&d.delete(R)}n.remove(I)}function b(I){const C=n.get(I);i.deleteTexture(C.__webglTexture);const R=I.source,F=d.get(R);delete F[C.__cacheKey],o.memory.textures--}function y(I){const C=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(C.__webglFramebuffer[F]))for(let K=0;K<C.__webglFramebuffer[F].length;K++)i.deleteFramebuffer(C.__webglFramebuffer[F][K]);else i.deleteFramebuffer(C.__webglFramebuffer[F]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[F])}else{if(Array.isArray(C.__webglFramebuffer))for(let F=0;F<C.__webglFramebuffer.length;F++)i.deleteFramebuffer(C.__webglFramebuffer[F]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let F=0;F<C.__webglColorRenderbuffer.length;F++)C.__webglColorRenderbuffer[F]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[F]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const R=I.textures;for(let F=0,K=R.length;F<K;F++){const z=n.get(R[F]);z.__webglTexture&&(i.deleteTexture(z.__webglTexture),o.memory.textures--),n.remove(R[F])}n.remove(I)}let w=0;function P(){w=0}function U(){const I=w;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),w+=1,I}function H(I){const C=[];return C.push(I.wrapS),C.push(I.wrapT),C.push(I.wrapR||0),C.push(I.magFilter),C.push(I.minFilter),C.push(I.anisotropy),C.push(I.internalFormat),C.push(I.format),C.push(I.type),C.push(I.generateMipmaps),C.push(I.premultiplyAlpha),C.push(I.flipY),C.push(I.unpackAlignment),C.push(I.colorSpace),C.join()}function $(I,C){const R=n.get(I);if(I.isVideoTexture&&Ct(I),I.isRenderTargetTexture===!1&&I.version>0&&R.__version!==I.version){const F=I.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{rt(R,I,C);return}}e.bindTexture(i.TEXTURE_2D,R.__webglTexture,i.TEXTURE0+C)}function G(I,C){const R=n.get(I);if(I.version>0&&R.__version!==I.version){rt(R,I,C);return}e.bindTexture(i.TEXTURE_2D_ARRAY,R.__webglTexture,i.TEXTURE0+C)}function B(I,C){const R=n.get(I);if(I.version>0&&R.__version!==I.version){rt(R,I,C);return}e.bindTexture(i.TEXTURE_3D,R.__webglTexture,i.TEXTURE0+C)}function N(I,C){const R=n.get(I);if(I.version>0&&R.__version!==I.version){nt(R,I,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+C)}const Q={[uo]:i.REPEAT,[ki]:i.CLAMP_TO_EDGE,[La]:i.MIRRORED_REPEAT},st={[gn]:i.NEAREST,[rd]:i.NEAREST_MIPMAP_NEAREST,[mr]:i.NEAREST_MIPMAP_LINEAR,[Pn]:i.LINEAR,[Po]:i.LINEAR_MIPMAP_NEAREST,[Bi]:i.LINEAR_MIPMAP_LINEAR},Mt={[cd]:i.NEVER,[md]:i.ALWAYS,[ud]:i.LESS,[fh]:i.LEQUAL,[hd]:i.EQUAL,[pd]:i.GEQUAL,[fd]:i.GREATER,[dd]:i.NOTEQUAL};function Pt(I,C){if(C.type===Bn&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===Pn||C.magFilter===Po||C.magFilter===mr||C.magFilter===Bi||C.minFilter===Pn||C.minFilter===Po||C.minFilter===mr||C.minFilter===Bi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,Q[C.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,Q[C.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,Q[C.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,st[C.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,st[C.minFilter]),C.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Mt[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===gn||C.minFilter!==mr&&C.minFilter!==Bi||C.type===Bn&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const R=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Et(I,C){let R=!1;I.__webglInit===void 0&&(I.__webglInit=!0,C.addEventListener("dispose",_));const F=C.source;let K=d.get(F);K===void 0&&(K={},d.set(F,K));const z=H(C);if(z!==I.__cacheKey){K[z]===void 0&&(K[z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,R=!0),K[z].usedTimes++;const it=K[I.__cacheKey];it!==void 0&&(K[I.__cacheKey].usedTimes--,it.usedTimes===0&&b(C)),I.__cacheKey=z,I.__webglTexture=K[z].texture}return R}function rt(I,C,R){let F=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(F=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(F=i.TEXTURE_3D);const K=Et(I,C),z=C.source;e.bindTexture(F,I.__webglTexture,i.TEXTURE0+R);const it=n.get(z);if(z.version!==it.__version||K===!0){e.activeTexture(i.TEXTURE0+R);const Z=le.getPrimaries(le.workingColorSpace),ht=C.colorSpace===vi?null:le.getPrimaries(C.colorSpace),St=C.colorSpace===vi||Z===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let ut=x(C.image,!1,s.maxTextureSize);ut=Vt(C,ut);const k=r.convert(C.format,C.colorSpace),W=r.convert(C.type);let q=M(C.internalFormat,k,W,C.colorSpace,C.isVideoTexture);Pt(F,C);let O;const lt=C.mipmaps,gt=C.isVideoTexture!==!0,It=it.__version===void 0||K===!0,j=z.dataReady,xt=T(C,ut);if(C.isDepthTexture)q=v(C.format===ws,C.type),It&&(gt?e.texStorage2D(i.TEXTURE_2D,1,q,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,q,ut.width,ut.height,0,k,W,null));else if(C.isDataTexture)if(lt.length>0){gt&&It&&e.texStorage2D(i.TEXTURE_2D,xt,q,lt[0].width,lt[0].height);for(let ct=0,bt=lt.length;ct<bt;ct++)O=lt[ct],gt?j&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,O.width,O.height,k,W,O.data):e.texImage2D(i.TEXTURE_2D,ct,q,O.width,O.height,0,k,W,O.data);C.generateMipmaps=!1}else gt?(It&&e.texStorage2D(i.TEXTURE_2D,xt,q,ut.width,ut.height),j&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,k,W,ut.data)):e.texImage2D(i.TEXTURE_2D,0,q,ut.width,ut.height,0,k,W,ut.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){gt&&It&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,q,lt[0].width,lt[0].height,ut.depth);for(let ct=0,bt=lt.length;ct<bt;ct++)if(O=lt[ct],C.format!==Ln)if(k!==null)if(gt){if(j)if(C.layerUpdates.size>0){const Dt=Kc(O.width,O.height,C.format,C.type);for(const Lt of C.layerUpdates){const Yt=O.data.subarray(Lt*Dt/O.data.BYTES_PER_ELEMENT,(Lt+1)*Dt/O.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,Lt,O.width,O.height,1,k,Yt)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,O.width,O.height,ut.depth,k,O.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ct,q,O.width,O.height,ut.depth,0,O.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?j&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ct,0,0,0,O.width,O.height,ut.depth,k,W,O.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ct,q,O.width,O.height,ut.depth,0,k,W,O.data)}else{gt&&It&&e.texStorage2D(i.TEXTURE_2D,xt,q,lt[0].width,lt[0].height);for(let ct=0,bt=lt.length;ct<bt;ct++)O=lt[ct],C.format!==Ln?k!==null?gt?j&&e.compressedTexSubImage2D(i.TEXTURE_2D,ct,0,0,O.width,O.height,k,O.data):e.compressedTexImage2D(i.TEXTURE_2D,ct,q,O.width,O.height,0,O.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?j&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,O.width,O.height,k,W,O.data):e.texImage2D(i.TEXTURE_2D,ct,q,O.width,O.height,0,k,W,O.data)}else if(C.isDataArrayTexture)if(gt){if(It&&e.texStorage3D(i.TEXTURE_2D_ARRAY,xt,q,ut.width,ut.height,ut.depth),j)if(C.layerUpdates.size>0){const ct=Kc(ut.width,ut.height,C.format,C.type);for(const bt of C.layerUpdates){const Dt=ut.data.subarray(bt*ct/ut.data.BYTES_PER_ELEMENT,(bt+1)*ct/ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,bt,ut.width,ut.height,1,k,W,Dt)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,k,W,ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,q,ut.width,ut.height,ut.depth,0,k,W,ut.data);else if(C.isData3DTexture)gt?(It&&e.texStorage3D(i.TEXTURE_3D,xt,q,ut.width,ut.height,ut.depth),j&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,k,W,ut.data)):e.texImage3D(i.TEXTURE_3D,0,q,ut.width,ut.height,ut.depth,0,k,W,ut.data);else if(C.isFramebufferTexture){if(It)if(gt)e.texStorage2D(i.TEXTURE_2D,xt,q,ut.width,ut.height);else{let ct=ut.width,bt=ut.height;for(let Dt=0;Dt<xt;Dt++)e.texImage2D(i.TEXTURE_2D,Dt,q,ct,bt,0,k,W,null),ct>>=1,bt>>=1}}else if(lt.length>0){if(gt&&It){const ct=ft(lt[0]);e.texStorage2D(i.TEXTURE_2D,xt,q,ct.width,ct.height)}for(let ct=0,bt=lt.length;ct<bt;ct++)O=lt[ct],gt?j&&e.texSubImage2D(i.TEXTURE_2D,ct,0,0,k,W,O):e.texImage2D(i.TEXTURE_2D,ct,q,k,W,O);C.generateMipmaps=!1}else if(gt){if(It){const ct=ft(ut);e.texStorage2D(i.TEXTURE_2D,xt,q,ct.width,ct.height)}j&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,k,W,ut)}else e.texImage2D(i.TEXTURE_2D,0,q,k,W,ut);m(C)&&h(F),it.__version=z.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function nt(I,C,R){if(C.image.length!==6)return;const F=Et(I,C),K=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+R);const z=n.get(K);if(K.version!==z.__version||F===!0){e.activeTexture(i.TEXTURE0+R);const it=le.getPrimaries(le.workingColorSpace),Z=C.colorSpace===vi?null:le.getPrimaries(C.colorSpace),ht=C.colorSpace===vi||it===Z?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const St=C.isCompressedTexture||C.image[0].isCompressedTexture,ut=C.image[0]&&C.image[0].isDataTexture,k=[];for(let bt=0;bt<6;bt++)!St&&!ut?k[bt]=x(C.image[bt],!0,s.maxCubemapSize):k[bt]=ut?C.image[bt].image:C.image[bt],k[bt]=Vt(C,k[bt]);const W=k[0],q=r.convert(C.format,C.colorSpace),O=r.convert(C.type),lt=M(C.internalFormat,q,O,C.colorSpace),gt=C.isVideoTexture!==!0,It=z.__version===void 0||F===!0,j=K.dataReady;let xt=T(C,W);Pt(i.TEXTURE_CUBE_MAP,C);let ct;if(St){gt&&It&&e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,lt,W.width,W.height);for(let bt=0;bt<6;bt++){ct=k[bt].mipmaps;for(let Dt=0;Dt<ct.length;Dt++){const Lt=ct[Dt];C.format!==Ln?q!==null?gt?j&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt,0,0,Lt.width,Lt.height,q,Lt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt,lt,Lt.width,Lt.height,0,Lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):gt?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt,0,0,Lt.width,Lt.height,q,O,Lt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt,lt,Lt.width,Lt.height,0,q,O,Lt.data)}}}else{if(ct=C.mipmaps,gt&&It){ct.length>0&&xt++;const bt=ft(k[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,xt,lt,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(ut){gt?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,k[bt].width,k[bt].height,q,O,k[bt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,lt,k[bt].width,k[bt].height,0,q,O,k[bt].data);for(let Dt=0;Dt<ct.length;Dt++){const Yt=ct[Dt].image[bt].image;gt?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt+1,0,0,Yt.width,Yt.height,q,O,Yt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt+1,lt,Yt.width,Yt.height,0,q,O,Yt.data)}}else{gt?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,q,O,k[bt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,lt,q,O,k[bt]);for(let Dt=0;Dt<ct.length;Dt++){const Lt=ct[Dt];gt?j&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt+1,0,0,q,O,Lt.image[bt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Dt+1,lt,q,O,Lt.image[bt])}}}m(C)&&h(i.TEXTURE_CUBE_MAP),z.__version=K.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function Tt(I,C,R,F,K,z){const it=r.convert(R.format,R.colorSpace),Z=r.convert(R.type),ht=M(R.internalFormat,it,Z,R.colorSpace),St=n.get(C),ut=n.get(R);if(ut.__renderTarget=C,!St.__hasExternalTextures){const k=Math.max(1,C.width>>z),W=Math.max(1,C.height>>z);K===i.TEXTURE_3D||K===i.TEXTURE_2D_ARRAY?e.texImage3D(K,z,ht,k,W,C.depth,0,it,Z,null):e.texImage2D(K,z,ht,k,W,0,it,Z,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),At(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,F,K,ut.__webglTexture,0,vt(C)):(K===i.TEXTURE_2D||K>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,F,K,ut.__webglTexture,z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function _t(I,C,R){if(i.bindRenderbuffer(i.RENDERBUFFER,I),C.depthBuffer){const F=C.depthTexture,K=F&&F.isDepthTexture?F.type:null,z=v(C.stencilBuffer,K),it=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=vt(C);At(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Z,z,C.width,C.height):R?i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,z,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,z,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,it,i.RENDERBUFFER,I)}else{const F=C.textures;for(let K=0;K<F.length;K++){const z=F[K],it=r.convert(z.format,z.colorSpace),Z=r.convert(z.type),ht=M(z.internalFormat,it,Z,z.colorSpace),St=vt(C);R&&At(C)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,St,ht,C.width,C.height):At(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,St,ht,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,ht,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Rt(I,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const F=n.get(C.depthTexture);F.__renderTarget=C,(!F.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),$(C.depthTexture,0);const K=F.__webglTexture,z=vt(C);if(C.depthTexture.format===xs)At(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(C.depthTexture.format===ws)At(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function L(I){const C=n.get(I),R=I.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==I.depthTexture){const F=I.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),F){const K=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,F.removeEventListener("dispose",K)};F.addEventListener("dispose",K),C.__depthDisposeCallback=K}C.__boundDepthTexture=F}if(I.depthTexture&&!C.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");Rt(C.__webglFramebuffer,I)}else if(R){C.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[F]),C.__webglDepthbuffer[F]===void 0)C.__webglDepthbuffer[F]=i.createRenderbuffer(),_t(C.__webglDepthbuffer[F],I,!1);else{const K=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=C.__webglDepthbuffer[F];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,z)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),_t(C.__webglDepthbuffer,I,!1);else{const F=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,F,i.RENDERBUFFER,K)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function X(I,C,R){const F=n.get(I);C!==void 0&&Tt(F.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),R!==void 0&&L(I)}function et(I){const C=I.texture,R=n.get(I),F=n.get(C);I.addEventListener("dispose",E);const K=I.textures,z=I.isWebGLCubeRenderTarget===!0,it=K.length>1;if(it||(F.__webglTexture===void 0&&(F.__webglTexture=i.createTexture()),F.__version=C.version,o.memory.textures++),z){R.__webglFramebuffer=[];for(let Z=0;Z<6;Z++)if(C.mipmaps&&C.mipmaps.length>0){R.__webglFramebuffer[Z]=[];for(let ht=0;ht<C.mipmaps.length;ht++)R.__webglFramebuffer[Z][ht]=i.createFramebuffer()}else R.__webglFramebuffer[Z]=i.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){R.__webglFramebuffer=[];for(let Z=0;Z<C.mipmaps.length;Z++)R.__webglFramebuffer[Z]=i.createFramebuffer()}else R.__webglFramebuffer=i.createFramebuffer();if(it)for(let Z=0,ht=K.length;Z<ht;Z++){const St=n.get(K[Z]);St.__webglTexture===void 0&&(St.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&At(I)===!1){R.__webglMultisampledFramebuffer=i.createFramebuffer(),R.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let Z=0;Z<K.length;Z++){const ht=K[Z];R.__webglColorRenderbuffer[Z]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,R.__webglColorRenderbuffer[Z]);const St=r.convert(ht.format,ht.colorSpace),ut=r.convert(ht.type),k=M(ht.internalFormat,St,ut,ht.colorSpace,I.isXRRenderTarget===!0),W=vt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,W,k,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Z,i.RENDERBUFFER,R.__webglColorRenderbuffer[Z])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(R.__webglDepthRenderbuffer=i.createRenderbuffer(),_t(R.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){e.bindTexture(i.TEXTURE_CUBE_MAP,F.__webglTexture),Pt(i.TEXTURE_CUBE_MAP,C);for(let Z=0;Z<6;Z++)if(C.mipmaps&&C.mipmaps.length>0)for(let ht=0;ht<C.mipmaps.length;ht++)Tt(R.__webglFramebuffer[Z][ht],I,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ht);else Tt(R.__webglFramebuffer[Z],I,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0);m(C)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(it){for(let Z=0,ht=K.length;Z<ht;Z++){const St=K[Z],ut=n.get(St);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),Pt(i.TEXTURE_2D,St),Tt(R.__webglFramebuffer,I,St,i.COLOR_ATTACHMENT0+Z,i.TEXTURE_2D,0),m(St)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let Z=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Z=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Z,F.__webglTexture),Pt(Z,C),C.mipmaps&&C.mipmaps.length>0)for(let ht=0;ht<C.mipmaps.length;ht++)Tt(R.__webglFramebuffer[ht],I,C,i.COLOR_ATTACHMENT0,Z,ht);else Tt(R.__webglFramebuffer,I,C,i.COLOR_ATTACHMENT0,Z,0);m(C)&&h(Z),e.unbindTexture()}I.depthBuffer&&L(I)}function tt(I){const C=I.textures;for(let R=0,F=C.length;R<F;R++){const K=C[R];if(m(K)){const z=S(I),it=n.get(K).__webglTexture;e.bindTexture(z,it),h(z),e.unbindTexture()}}}const dt=[],V=[];function zt(I){if(I.samples>0){if(At(I)===!1){const C=I.textures,R=I.width,F=I.height;let K=i.COLOR_BUFFER_BIT;const z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,it=n.get(I),Z=C.length>1;if(Z)for(let ht=0;ht<C.length;ht++)e.bindFramebuffer(i.FRAMEBUFFER,it.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,it.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,it.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,it.__webglFramebuffer);for(let ht=0;ht<C.length;ht++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(K|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(K|=i.STENCIL_BUFFER_BIT)),Z){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,it.__webglColorRenderbuffer[ht]);const St=n.get(C[ht]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,St,0)}i.blitFramebuffer(0,0,R,F,0,0,R,F,K,i.NEAREST),l===!0&&(dt.length=0,V.length=0,dt.push(i.COLOR_ATTACHMENT0+ht),I.depthBuffer&&I.resolveDepthBuffer===!1&&(dt.push(z),V.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,V)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,dt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Z)for(let ht=0;ht<C.length;ht++){e.bindFramebuffer(i.FRAMEBUFFER,it.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,it.__webglColorRenderbuffer[ht]);const St=n.get(C[ht]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,it.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.TEXTURE_2D,St,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,it.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const C=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function vt(I){return Math.min(s.maxSamples,I.samples)}function At(I){const C=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Ct(I){const C=o.render.frame;u.get(I)!==C&&(u.set(I,C),I.update())}function Vt(I,C){const R=I.colorSpace,F=I.format,K=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||R!==Cs&&R!==vi&&(le.getTransfer(R)===xe?(F!==Ln||K!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),C}function ft(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=P,this.setTexture2D=$,this.setTexture2DArray=G,this.setTexture3D=B,this.setTextureCube=N,this.rebindTextures=X,this.setupRenderTarget=et,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=Tt,this.useMultisampledRTT=At}function Ix(i,t){function e(n,s=vi){let r;const o=le.getTransfer(s);if(n===Hn)return i.UNSIGNED_BYTE;if(n===yl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ml)return i.UNSIGNED_SHORT_5_5_5_1;if(n===sh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===nh)return i.BYTE;if(n===ih)return i.SHORT;if(n===cr)return i.UNSIGNED_SHORT;if(n===_l)return i.INT;if(n===Hi)return i.UNSIGNED_INT;if(n===Bn)return i.FLOAT;if(n===Gn)return i.HALF_FLOAT;if(n===rh)return i.ALPHA;if(n===oh)return i.RGB;if(n===Ln)return i.RGBA;if(n===ah)return i.LUMINANCE;if(n===lh)return i.LUMINANCE_ALPHA;if(n===xs)return i.DEPTH_COMPONENT;if(n===ws)return i.DEPTH_STENCIL;if(n===go)return i.RED;if(n===Sl)return i.RED_INTEGER;if(n===ch)return i.RG;if(n===bl)return i.RG_INTEGER;if(n===wl)return i.RGBA_INTEGER;if(n===io||n===so||n===ro||n===oo)if(o===xe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===io)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===so)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===io)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===so)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ro)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===za||n===Ia||n===Da||n===Ua)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===za)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ia)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Da)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ua)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Na||n===Fa||n===Oa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Na||n===Fa)return o===xe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Oa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ka||n===Ba||n===Ga||n===Ha||n===Va||n===Wa||n===Xa||n===qa||n===$a||n===Ya||n===ja||n===Ka||n===Za||n===Ja)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ka)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ba)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ga)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ha)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Va)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Wa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qa)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$a)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ya)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ja)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ka)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Za)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ja)return o===xe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ao||n===Qa||n===tl)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ao)return o===xe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===tl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===uh||n===el||n===nl||n===il)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ao)return r.COMPRESSED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===nl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===il)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bs?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class Dx extends mn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Re extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ux={type:"move"};class ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),h=this._getHandJoint(c,x);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],d=u.position.distanceTo(p.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Ux)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Nx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Fx=`
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

}`;class Ox{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new en,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new De({vertexShader:Nx,fragmentShader:Fx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Jt(new zs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class kx extends Ps{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,p=null,d=null,f=null,g=null;const x=new Ox,m=e.getContextAttributes();let h=null,S=null;const M=[],v=[],T=new Kt;let _=null;const E=new mn;E.viewport=new ce;const A=new mn;A.viewport=new ce;const b=[E,A],y=new Dx;let w=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(rt){let nt=M[rt];return nt===void 0&&(nt=new ia,M[rt]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(rt){let nt=M[rt];return nt===void 0&&(nt=new ia,M[rt]=nt),nt.getGripSpace()},this.getHand=function(rt){let nt=M[rt];return nt===void 0&&(nt=new ia,M[rt]=nt),nt.getHandSpace()};function U(rt){const nt=v.indexOf(rt.inputSource);if(nt===-1)return;const Tt=M[nt];Tt!==void 0&&(Tt.update(rt.inputSource,rt.frame,c||o),Tt.dispatchEvent({type:rt.type,data:rt.inputSource}))}function H(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",$);for(let rt=0;rt<M.length;rt++){const nt=v[rt];nt!==null&&(v[rt]=null,M[rt].disconnect(nt))}w=null,P=null,x.reset(),t.setRenderTarget(h),f=null,d=null,p=null,s=null,S=null,Et.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(rt){r=rt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(rt){a=rt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(rt){c=rt},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(rt){if(s=rt,s!==null){if(h=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",H),s.addEventListener("inputsourceschange",$),m.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const nt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,nt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new bn(f.framebufferWidth,f.framebufferHeight,{format:Ln,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let nt=null,Tt=null,_t=null;m.depth&&(_t=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=m.stencil?ws:xs,Tt=m.stencil?bs:Hi);const Rt={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};p=new XRWebGLBinding(s,e),d=p.createProjectionLayer(Rt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new bn(d.textureWidth,d.textureHeight,{format:Ln,type:Hn,depthTexture:new Ll(d.textureWidth,d.textureHeight,Tt,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Et.setContext(s),Et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function $(rt){for(let nt=0;nt<rt.removed.length;nt++){const Tt=rt.removed[nt],_t=v.indexOf(Tt);_t>=0&&(v[_t]=null,M[_t].disconnect(Tt))}for(let nt=0;nt<rt.added.length;nt++){const Tt=rt.added[nt];let _t=v.indexOf(Tt);if(_t===-1){for(let L=0;L<M.length;L++)if(L>=v.length){v.push(Tt),_t=L;break}else if(v[L]===null){v[L]=Tt,_t=L;break}if(_t===-1)break}const Rt=M[_t];Rt&&Rt.connect(Tt)}}const G=new J,B=new J;function N(rt,nt,Tt){G.setFromMatrixPosition(nt.matrixWorld),B.setFromMatrixPosition(Tt.matrixWorld);const _t=G.distanceTo(B),Rt=nt.projectionMatrix.elements,L=Tt.projectionMatrix.elements,X=Rt[14]/(Rt[10]-1),et=Rt[14]/(Rt[10]+1),tt=(Rt[9]+1)/Rt[5],dt=(Rt[9]-1)/Rt[5],V=(Rt[8]-1)/Rt[0],zt=(L[8]+1)/L[0],vt=X*V,At=X*zt,Ct=_t/(-V+zt),Vt=Ct*-V;if(nt.matrixWorld.decompose(rt.position,rt.quaternion,rt.scale),rt.translateX(Vt),rt.translateZ(Ct),rt.matrixWorld.compose(rt.position,rt.quaternion,rt.scale),rt.matrixWorldInverse.copy(rt.matrixWorld).invert(),Rt[10]===-1)rt.projectionMatrix.copy(nt.projectionMatrix),rt.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const ft=X+Ct,I=et+Ct,C=vt-Vt,R=At+(_t-Vt),F=tt*et/I*ft,K=dt*et/I*ft;rt.projectionMatrix.makePerspective(C,R,F,K,ft,I),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert()}}function Q(rt,nt){nt===null?rt.matrixWorld.copy(rt.matrix):rt.matrixWorld.multiplyMatrices(nt.matrixWorld,rt.matrix),rt.matrixWorldInverse.copy(rt.matrixWorld).invert()}this.updateCamera=function(rt){if(s===null)return;let nt=rt.near,Tt=rt.far;x.texture!==null&&(x.depthNear>0&&(nt=x.depthNear),x.depthFar>0&&(Tt=x.depthFar)),y.near=A.near=E.near=nt,y.far=A.far=E.far=Tt,(w!==y.near||P!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),w=y.near,P=y.far),E.layers.mask=rt.layers.mask|2,A.layers.mask=rt.layers.mask|4,y.layers.mask=E.layers.mask|A.layers.mask;const _t=rt.parent,Rt=y.cameras;Q(y,_t);for(let L=0;L<Rt.length;L++)Q(Rt[L],_t);Rt.length===2?N(y,E,A):y.projectionMatrix.copy(E.projectionMatrix),st(rt,y,_t)};function st(rt,nt,Tt){Tt===null?rt.matrix.copy(nt.matrixWorld):(rt.matrix.copy(Tt.matrixWorld),rt.matrix.invert(),rt.matrix.multiply(nt.matrixWorld)),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.updateMatrixWorld(!0),rt.projectionMatrix.copy(nt.projectionMatrix),rt.projectionMatrixInverse.copy(nt.projectionMatrixInverse),rt.isPerspectiveCamera&&(rt.fov=ur*2*Math.atan(1/rt.projectionMatrix.elements[5]),rt.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(rt){l=rt,d!==null&&(d.fixedFoveation=rt),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=rt)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(y)};let Mt=null;function Pt(rt,nt){if(u=nt.getViewerPose(c||o),g=nt,u!==null){const Tt=u.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let _t=!1;Tt.length!==y.cameras.length&&(y.cameras.length=0,_t=!0);for(let L=0;L<Tt.length;L++){const X=Tt[L];let et=null;if(f!==null)et=f.getViewport(X);else{const dt=p.getViewSubImage(d,X);et=dt.viewport,L===0&&(t.setRenderTargetTextures(S,dt.colorTexture,d.ignoreDepthValues?void 0:dt.depthStencilTexture),t.setRenderTarget(S))}let tt=b[L];tt===void 0&&(tt=new mn,tt.layers.enable(L),tt.viewport=new ce,b[L]=tt),tt.matrix.fromArray(X.transform.matrix),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.projectionMatrix.fromArray(X.projectionMatrix),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert(),tt.viewport.set(et.x,et.y,et.width,et.height),L===0&&(y.matrix.copy(tt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),_t===!0&&y.cameras.push(tt)}const Rt=s.enabledFeatures;if(Rt&&Rt.includes("depth-sensing")){const L=p.getDepthInformation(Tt[0]);L&&L.isValid&&L.texture&&x.init(t,L,s.renderState)}}for(let Tt=0;Tt<M.length;Tt++){const _t=v[Tt],Rt=M[Tt];_t!==null&&Rt!==void 0&&Rt.update(_t,nt,c||o)}Mt&&Mt(rt,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),g=null}const Et=new Sh;Et.setAnimationLoop(Pt),this.setAnimationLoop=function(rt){Mt=rt},this.dispose=function(){}}}const zi=new Vn,Bx=new he;function Gx(i,t){function e(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function n(m,h){h.color.getRGB(m.fogColor.value,_h(i)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function s(m,h,S,M,v){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(m,h):h.isMeshToonMaterial?(r(m,h),p(m,h)):h.isMeshPhongMaterial?(r(m,h),u(m,h)):h.isMeshStandardMaterial?(r(m,h),d(m,h),h.isMeshPhysicalMaterial&&f(m,h,v)):h.isMeshMatcapMaterial?(r(m,h),g(m,h)):h.isMeshDepthMaterial?r(m,h):h.isMeshDistanceMaterial?(r(m,h),x(m,h)):h.isMeshNormalMaterial?r(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,S,M):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,e(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===cn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,e(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===cn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,e(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,e(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const S=t.get(h),M=S.envMap,v=S.envMapRotation;M&&(m.envMap.value=M,zi.copy(v),zi.x*=-1,zi.y*=-1,zi.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(zi.y*=-1,zi.z*=-1),m.envMapRotation.value.setFromMatrix4(Bx.makeRotationFromEuler(zi)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,S,M){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*S,m.scale.value=M*.5,h.map&&(m.map.value=h.map,e(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,e(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,e(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function p(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function f(m,h,S){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===cn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function x(m,h){const S=t.get(h).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Hx(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,M){const v=M.program;n.uniformBlockBinding(S,v)}function c(S,M){let v=s[S.id];v===void 0&&(g(S),v=u(S),s[S.id]=v,S.addEventListener("dispose",m));const T=M.program;n.updateUBOMapping(S,T);const _=t.render.frame;r[S.id]!==_&&(d(S),r[S.id]=_)}function u(S){const M=p();S.__bindingPointIndex=M;const v=i.createBuffer(),T=S.__size,_=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,T,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,v),v}function p(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const M=s[S.id],v=S.uniforms,T=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let _=0,E=v.length;_<E;_++){const A=Array.isArray(v[_])?v[_]:[v[_]];for(let b=0,y=A.length;b<y;b++){const w=A[b];if(f(w,_,b,T)===!0){const P=w.__offset,U=Array.isArray(w.value)?w.value:[w.value];let H=0;for(let $=0;$<U.length;$++){const G=U[$],B=x(G);typeof G=="number"||typeof G=="boolean"?(w.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,P+H,w.__data)):G.isMatrix3?(w.__data[0]=G.elements[0],w.__data[1]=G.elements[1],w.__data[2]=G.elements[2],w.__data[3]=0,w.__data[4]=G.elements[3],w.__data[5]=G.elements[4],w.__data[6]=G.elements[5],w.__data[7]=0,w.__data[8]=G.elements[6],w.__data[9]=G.elements[7],w.__data[10]=G.elements[8],w.__data[11]=0):(G.toArray(w.__data,H),H+=B.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,w.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,M,v,T){const _=S.value,E=M+"_"+v;if(T[E]===void 0)return typeof _=="number"||typeof _=="boolean"?T[E]=_:T[E]=_.clone(),!0;{const A=T[E];if(typeof _=="number"||typeof _=="boolean"){if(A!==_)return T[E]=_,!0}else if(A.equals(_)===!1)return A.copy(_),!0}return!1}function g(S){const M=S.uniforms;let v=0;const T=16;for(let E=0,A=M.length;E<A;E++){const b=Array.isArray(M[E])?M[E]:[M[E]];for(let y=0,w=b.length;y<w;y++){const P=b[y],U=Array.isArray(P.value)?P.value:[P.value];for(let H=0,$=U.length;H<$;H++){const G=U[H],B=x(G),N=v%T,Q=N%B.boundary,st=N+Q;v+=Q,st!==0&&T-st<B.storage&&(v+=T-st),P.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=v,v+=B.storage}}}const _=v%T;return _>0&&(v+=T-_),S.__size=v,S.__cache={},this}function x(S){const M={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(M.boundary=4,M.storage=4):S.isVector2?(M.boundary=8,M.storage=8):S.isVector3||S.isColor?(M.boundary=16,M.storage=12):S.isVector4?(M.boundary=16,M.storage=16):S.isMatrix3?(M.boundary=48,M.storage=48):S.isMatrix4?(M.boundary=64,M.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),M}function m(S){const M=S.target;M.removeEventListener("dispose",m);const v=o.indexOf(M.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function h(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:h}}class Vx{constructor(t={}){const{canvas:e=zd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,h=null;const S=[],M=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pn,this.toneMapping=bi,this.toneMappingExposure=1;const v=this;let T=!1,_=0,E=0,A=null,b=-1,y=null;const w=new ce,P=new ce;let U=null;const H=new Wt(0);let $=0,G=e.width,B=e.height,N=1,Q=null,st=null;const Mt=new ce(0,0,G,B),Pt=new ce(0,0,G,B);let Et=!1;const rt=new Rl;let nt=!1,Tt=!1;const _t=new he,Rt=new he,L=new J,X=new ce,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function dt(){return A===null?N:1}let V=n;function zt(D,ot){return e.getContext(D,ot)}try{const D={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xl}`),e.addEventListener("webglcontextlost",bt,!1),e.addEventListener("webglcontextrestored",Dt,!1),e.addEventListener("webglcontextcreationerror",Lt,!1),V===null){const ot="webgl2";if(V=zt(ot,D),V===null)throw zt(ot)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let vt,At,Ct,Vt,ft,I,C,R,F,K,z,it,Z,ht,St,ut,k,W,q,O,lt,gt,It,j;function xt(){vt=new Yg(V),vt.init(),gt=new Ix(V,vt),At=new Hg(V,vt,t,gt),Ct=new Px(V,vt),At.reverseDepthBuffer&&d&&Ct.buffers.depth.setReversed(!0),Vt=new Zg(V),ft=new mx,I=new zx(V,vt,Ct,ft,At,gt,Vt),C=new Wg(v),R=new $g(v),F=new sp(V),It=new Bg(V,F),K=new jg(V,F,Vt,It),z=new Qg(V,K,F,Vt),q=new Jg(V,At,I),ut=new Vg(ft),it=new px(v,C,R,vt,At,It,ut),Z=new Gx(v,ft),ht=new xx,St=new bx(vt),W=new kg(v,C,R,Ct,z,f,l),k=new Rx(v,z,At),j=new Hx(V,Vt,At,Ct),O=new Gg(V,vt,Vt),lt=new Kg(V,vt,Vt),Vt.programs=it.programs,v.capabilities=At,v.extensions=vt,v.properties=ft,v.renderLists=ht,v.shadowMap=k,v.state=Ct,v.info=Vt}xt();const ct=new kx(v,V);this.xr=ct,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const D=vt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=vt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return N},this.setPixelRatio=function(D){D!==void 0&&(N=D,this.setSize(G,B,!1))},this.getSize=function(D){return D.set(G,B)},this.setSize=function(D,ot,pt=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=D,B=ot,e.width=Math.floor(D*N),e.height=Math.floor(ot*N),pt===!0&&(e.style.width=D+"px",e.style.height=ot+"px"),this.setViewport(0,0,D,ot)},this.getDrawingBufferSize=function(D){return D.set(G*N,B*N).floor()},this.setDrawingBufferSize=function(D,ot,pt){G=D,B=ot,N=pt,e.width=Math.floor(D*pt),e.height=Math.floor(ot*pt),this.setViewport(0,0,D,ot)},this.getCurrentViewport=function(D){return D.copy(w)},this.getViewport=function(D){return D.copy(Mt)},this.setViewport=function(D,ot,pt,mt){D.isVector4?Mt.set(D.x,D.y,D.z,D.w):Mt.set(D,ot,pt,mt),Ct.viewport(w.copy(Mt).multiplyScalar(N).round())},this.getScissor=function(D){return D.copy(Pt)},this.setScissor=function(D,ot,pt,mt){D.isVector4?Pt.set(D.x,D.y,D.z,D.w):Pt.set(D,ot,pt,mt),Ct.scissor(P.copy(Pt).multiplyScalar(N).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(D){Ct.setScissorTest(Et=D)},this.setOpaqueSort=function(D){Q=D},this.setTransparentSort=function(D){st=D},this.getClearColor=function(D){return D.copy(W.getClearColor())},this.setClearColor=function(){W.setClearColor.apply(W,arguments)},this.getClearAlpha=function(){return W.getClearAlpha()},this.setClearAlpha=function(){W.setClearAlpha.apply(W,arguments)},this.clear=function(D=!0,ot=!0,pt=!0){let mt=0;if(D){let at=!1;if(A!==null){const kt=A.texture.format;at=kt===wl||kt===bl||kt===Sl}if(at){const kt=A.texture.type,Ht=kt===Hn||kt===Hi||kt===cr||kt===bs||kt===yl||kt===Ml,Xt=W.getClearColor(),qt=W.getClearAlpha(),ee=Xt.r,ne=Xt.g,$t=Xt.b;Ht?(g[0]=ee,g[1]=ne,g[2]=$t,g[3]=qt,V.clearBufferuiv(V.COLOR,0,g)):(x[0]=ee,x[1]=ne,x[2]=$t,x[3]=qt,V.clearBufferiv(V.COLOR,0,x))}else mt|=V.COLOR_BUFFER_BIT}ot&&(mt|=V.DEPTH_BUFFER_BIT),pt&&(mt|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(mt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",bt,!1),e.removeEventListener("webglcontextrestored",Dt,!1),e.removeEventListener("webglcontextcreationerror",Lt,!1),ht.dispose(),St.dispose(),ft.dispose(),C.dispose(),R.dispose(),z.dispose(),It.dispose(),j.dispose(),it.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",Y),ct.removeEventListener("sessionend",yt),wt.stop()};function bt(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Dt(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const D=Vt.autoReset,ot=k.enabled,pt=k.autoUpdate,mt=k.needsUpdate,at=k.type;xt(),Vt.autoReset=D,k.enabled=ot,k.autoUpdate=pt,k.needsUpdate=mt,k.type=at}function Lt(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Yt(D){const ot=D.target;ot.removeEventListener("dispose",Yt),ue(ot)}function ue(D){ge(D),ft.remove(D)}function ge(D){const ot=ft.get(D).programs;ot!==void 0&&(ot.forEach(function(pt){it.releaseProgram(pt)}),D.isShaderMaterial&&it.releaseShaderCache(D))}this.renderBufferDirect=function(D,ot,pt,mt,at,kt){ot===null&&(ot=et);const Ht=at.isMesh&&at.matrixWorld.determinant()<0,Xt=ye(D,ot,pt,mt,at);Ct.setMaterial(mt,Ht);let qt=pt.index,ee=1;if(mt.wireframe===!0){if(qt=K.getWireframeAttribute(pt),qt===void 0)return;ee=2}const ne=pt.drawRange,$t=pt.attributes.position;let fe=ne.start*ee,Me=(ne.start+ne.count)*ee;kt!==null&&(fe=Math.max(fe,kt.start*ee),Me=Math.min(Me,(kt.start+kt.count)*ee)),qt!==null?(fe=Math.max(fe,0),Me=Math.min(Me,qt.count)):$t!=null&&(fe=Math.max(fe,0),Me=Math.min(Me,$t.count));const we=Me-fe;if(we<0||we===1/0)return;It.setup(at,mt,Xt,pt,qt);let an,pe=O;if(qt!==null&&(an=F.get(qt),pe=lt,pe.setIndex(an)),at.isMesh)mt.wireframe===!0?(Ct.setLineWidth(mt.wireframeLinewidth*dt()),pe.setMode(V.LINES)):pe.setMode(V.TRIANGLES);else if(at.isLine){let jt=mt.linewidth;jt===void 0&&(jt=1),Ct.setLineWidth(jt*dt()),at.isLineSegments?pe.setMode(V.LINES):at.isLineLoop?pe.setMode(V.LINE_LOOP):pe.setMode(V.LINE_STRIP)}else at.isPoints?pe.setMode(V.POINTS):at.isSprite&&pe.setMode(V.TRIANGLES);if(at.isBatchedMesh)if(at._multiDrawInstances!==null)pe.renderMultiDrawInstances(at._multiDrawStarts,at._multiDrawCounts,at._multiDrawCount,at._multiDrawInstances);else if(vt.get("WEBGL_multi_draw"))pe.renderMultiDraw(at._multiDrawStarts,at._multiDrawCounts,at._multiDrawCount);else{const jt=at._multiDrawStarts,Xn=at._multiDrawCounts,me=at._multiDrawCount,wn=qt?F.get(qt).bytesPerElement:1,qi=ft.get(mt).currentProgram.getUniforms();for(let un=0;un<me;un++)qi.setValue(V,"_gl_DrawID",un),pe.render(jt[un]/wn,Xn[un])}else if(at.isInstancedMesh)pe.renderInstances(fe,we,at.count);else if(pt.isInstancedBufferGeometry){const jt=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,Xn=Math.min(pt.instanceCount,jt);pe.renderInstances(fe,we,Xn)}else pe.render(fe,we)};function re(D,ot,pt){D.transparent===!0&&D.side===Ae&&D.forceSinglePass===!1?(D.side=cn,D.needsUpdate=!0,Qt(D,ot,pt),D.side=wi,D.needsUpdate=!0,Qt(D,ot,pt),D.side=Ae):Qt(D,ot,pt)}this.compile=function(D,ot,pt=null){pt===null&&(pt=D),h=St.get(pt),h.init(ot),M.push(h),pt.traverseVisible(function(at){at.isLight&&at.layers.test(ot.layers)&&(h.pushLight(at),at.castShadow&&h.pushShadow(at))}),D!==pt&&D.traverseVisible(function(at){at.isLight&&at.layers.test(ot.layers)&&(h.pushLight(at),at.castShadow&&h.pushShadow(at))}),h.setupLights();const mt=new Set;return D.traverse(function(at){if(!(at.isMesh||at.isPoints||at.isLine||at.isSprite))return;const kt=at.material;if(kt)if(Array.isArray(kt))for(let Ht=0;Ht<kt.length;Ht++){const Xt=kt[Ht];re(Xt,pt,at),mt.add(Xt)}else re(kt,pt,at),mt.add(kt)}),M.pop(),h=null,mt},this.compileAsync=function(D,ot,pt=null){const mt=this.compile(D,ot,pt);return new Promise(at=>{function kt(){if(mt.forEach(function(Ht){ft.get(Ht).currentProgram.isReady()&&mt.delete(Ht)}),mt.size===0){at(D);return}setTimeout(kt,10)}vt.get("KHR_parallel_shader_compile")!==null?kt():setTimeout(kt,10)})};let Ue=null;function Ke(D){Ue&&Ue(D)}function Y(){wt.stop()}function yt(){wt.start()}const wt=new Sh;wt.setAnimationLoop(Ke),typeof self<"u"&&wt.setContext(self),this.setAnimationLoop=function(D){Ue=D,ct.setAnimationLoop(D),D===null?wt.stop():wt.start()},ct.addEventListener("sessionstart",Y),ct.addEventListener("sessionend",yt),this.render=function(D,ot){if(ot!==void 0&&ot.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ot.parent===null&&ot.matrixWorldAutoUpdate===!0&&ot.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(ot),ot=ct.getCamera()),D.isScene===!0&&D.onBeforeRender(v,D,ot,A),h=St.get(D,M.length),h.init(ot),M.push(h),Rt.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),rt.setFromProjectionMatrix(Rt),Tt=this.localClippingEnabled,nt=ut.init(this.clippingPlanes,Tt),m=ht.get(D,S.length),m.init(),S.push(m),ct.enabled===!0&&ct.isPresenting===!0){const kt=v.xr.getDepthSensingMesh();kt!==null&&Nt(kt,ot,-1/0,v.sortObjects)}Nt(D,ot,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Q,st),tt=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,tt&&W.addToRenderList(m,D),this.info.render.frame++,nt===!0&&ut.beginShadows();const pt=h.state.shadowsArray;k.render(pt,D,ot),nt===!0&&ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const mt=m.opaque,at=m.transmissive;if(h.setupLights(),ot.isArrayCamera){const kt=ot.cameras;if(at.length>0)for(let Ht=0,Xt=kt.length;Ht<Xt;Ht++){const qt=kt[Ht];Ut(mt,at,D,qt)}tt&&W.render(D);for(let Ht=0,Xt=kt.length;Ht<Xt;Ht++){const qt=kt[Ht];Bt(m,D,qt,qt.viewport)}}else at.length>0&&Ut(mt,at,D,ot),tt&&W.render(D),Bt(m,D,ot);A!==null&&(I.updateMultisampleRenderTarget(A),I.updateRenderTargetMipmap(A)),D.isScene===!0&&D.onAfterRender(v,D,ot),It.resetDefaultState(),b=-1,y=null,M.pop(),M.length>0?(h=M[M.length-1],nt===!0&&ut.setGlobalState(v.clippingPlanes,h.state.camera)):h=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function Nt(D,ot,pt,mt){if(D.visible===!1)return;if(D.layers.test(ot.layers)){if(D.isGroup)pt=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(ot);else if(D.isLight)h.pushLight(D),D.castShadow&&h.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||rt.intersectsSprite(D)){mt&&X.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Rt);const Ht=z.update(D),Xt=D.material;Xt.visible&&m.push(D,Ht,Xt,pt,X.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||rt.intersectsObject(D))){const Ht=z.update(D),Xt=D.material;if(mt&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),X.copy(D.boundingSphere.center)):(Ht.boundingSphere===null&&Ht.computeBoundingSphere(),X.copy(Ht.boundingSphere.center)),X.applyMatrix4(D.matrixWorld).applyMatrix4(Rt)),Array.isArray(Xt)){const qt=Ht.groups;for(let ee=0,ne=qt.length;ee<ne;ee++){const $t=qt[ee],fe=Xt[$t.materialIndex];fe&&fe.visible&&m.push(D,Ht,fe,pt,X.z,$t)}}else Xt.visible&&m.push(D,Ht,Xt,pt,X.z,null)}}const kt=D.children;for(let Ht=0,Xt=kt.length;Ht<Xt;Ht++)Nt(kt[Ht],ot,pt,mt)}function Bt(D,ot,pt,mt){const at=D.opaque,kt=D.transmissive,Ht=D.transparent;h.setupLightsView(pt),nt===!0&&ut.setGlobalState(v.clippingPlanes,pt),mt&&Ct.viewport(w.copy(mt)),at.length>0&&Ft(at,ot,pt),kt.length>0&&Ft(kt,ot,pt),Ht.length>0&&Ft(Ht,ot,pt),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function Ut(D,ot,pt,mt){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[mt.id]===void 0&&(h.state.transmissionRenderTarget[mt.id]=new bn(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float")?Gn:Hn,minFilter:Bi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:le.workingColorSpace}));const kt=h.state.transmissionRenderTarget[mt.id],Ht=mt.viewport||w;kt.setSize(Ht.z,Ht.w);const Xt=v.getRenderTarget();v.setRenderTarget(kt),v.getClearColor(H),$=v.getClearAlpha(),$<1&&v.setClearColor(16777215,.5),v.clear(),tt&&W.render(pt);const qt=v.toneMapping;v.toneMapping=bi;const ee=mt.viewport;if(mt.viewport!==void 0&&(mt.viewport=void 0),h.setupLightsView(mt),nt===!0&&ut.setGlobalState(v.clippingPlanes,mt),Ft(D,pt,mt),I.updateMultisampleRenderTarget(kt),I.updateRenderTargetMipmap(kt),vt.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let $t=0,fe=ot.length;$t<fe;$t++){const Me=ot[$t],we=Me.object,an=Me.geometry,pe=Me.material,jt=Me.group;if(pe.side===Ae&&we.layers.test(mt.layers)){const Xn=pe.side;pe.side=cn,pe.needsUpdate=!0,Ot(we,pt,mt,an,pe,jt),pe.side=Xn,pe.needsUpdate=!0,ne=!0}}ne===!0&&(I.updateMultisampleRenderTarget(kt),I.updateRenderTargetMipmap(kt))}v.setRenderTarget(Xt),v.setClearColor(H,$),ee!==void 0&&(mt.viewport=ee),v.toneMapping=qt}function Ft(D,ot,pt){const mt=ot.isScene===!0?ot.overrideMaterial:null;for(let at=0,kt=D.length;at<kt;at++){const Ht=D[at],Xt=Ht.object,qt=Ht.geometry,ee=mt===null?Ht.material:mt,ne=Ht.group;Xt.layers.test(pt.layers)&&Ot(Xt,ot,pt,qt,ee,ne)}}function Ot(D,ot,pt,mt,at,kt){D.onBeforeRender(v,ot,pt,mt,at,kt),D.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),at.onBeforeRender(v,ot,pt,mt,D,kt),at.transparent===!0&&at.side===Ae&&at.forceSinglePass===!1?(at.side=cn,at.needsUpdate=!0,v.renderBufferDirect(pt,ot,mt,at,D,kt),at.side=wi,at.needsUpdate=!0,v.renderBufferDirect(pt,ot,mt,at,D,kt),at.side=Ae):v.renderBufferDirect(pt,ot,mt,at,D,kt),D.onAfterRender(v,ot,pt,mt,at,kt)}function Qt(D,ot,pt){ot.isScene!==!0&&(ot=et);const mt=ft.get(D),at=h.state.lights,kt=h.state.shadowsArray,Ht=at.state.version,Xt=it.getParameters(D,at.state,kt,ot,pt),qt=it.getProgramCacheKey(Xt);let ee=mt.programs;mt.environment=D.isMeshStandardMaterial?ot.environment:null,mt.fog=ot.fog,mt.envMap=(D.isMeshStandardMaterial?R:C).get(D.envMap||mt.environment),mt.envMapRotation=mt.environment!==null&&D.envMap===null?ot.environmentRotation:D.envMapRotation,ee===void 0&&(D.addEventListener("dispose",Yt),ee=new Map,mt.programs=ee);let ne=ee.get(qt);if(ne!==void 0){if(mt.currentProgram===ne&&mt.lightsStateVersion===Ht)return be(D,Xt),ne}else Xt.uniforms=it.getUniforms(D),D.onBeforeCompile(Xt,v),ne=it.acquireProgram(Xt,qt),ee.set(qt,ne),mt.uniforms=Xt.uniforms;const $t=mt.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&($t.clippingPlanes=ut.uniform),be(D,Xt),mt.needsLights=Xi(D),mt.lightsStateVersion=Ht,mt.needsLights&&($t.ambientLightColor.value=at.state.ambient,$t.lightProbe.value=at.state.probe,$t.directionalLights.value=at.state.directional,$t.directionalLightShadows.value=at.state.directionalShadow,$t.spotLights.value=at.state.spot,$t.spotLightShadows.value=at.state.spotShadow,$t.rectAreaLights.value=at.state.rectArea,$t.ltc_1.value=at.state.rectAreaLTC1,$t.ltc_2.value=at.state.rectAreaLTC2,$t.pointLights.value=at.state.point,$t.pointLightShadows.value=at.state.pointShadow,$t.hemisphereLights.value=at.state.hemi,$t.directionalShadowMap.value=at.state.directionalShadowMap,$t.directionalShadowMatrix.value=at.state.directionalShadowMatrix,$t.spotShadowMap.value=at.state.spotShadowMap,$t.spotLightMatrix.value=at.state.spotLightMatrix,$t.spotLightMap.value=at.state.spotLightMap,$t.pointShadowMap.value=at.state.pointShadowMap,$t.pointShadowMatrix.value=at.state.pointShadowMatrix),mt.currentProgram=ne,mt.uniformsList=null,ne}function te(D){if(D.uniformsList===null){const ot=D.currentProgram.getUniforms();D.uniformsList=lo.seqWithValue(ot.seq,D.uniforms)}return D.uniformsList}function be(D,ot){const pt=ft.get(D);pt.outputColorSpace=ot.outputColorSpace,pt.batching=ot.batching,pt.batchingColor=ot.batchingColor,pt.instancing=ot.instancing,pt.instancingColor=ot.instancingColor,pt.instancingMorph=ot.instancingMorph,pt.skinning=ot.skinning,pt.morphTargets=ot.morphTargets,pt.morphNormals=ot.morphNormals,pt.morphColors=ot.morphColors,pt.morphTargetsCount=ot.morphTargetsCount,pt.numClippingPlanes=ot.numClippingPlanes,pt.numIntersection=ot.numClipIntersection,pt.vertexAlphas=ot.vertexAlphas,pt.vertexTangents=ot.vertexTangents,pt.toneMapping=ot.toneMapping}function ye(D,ot,pt,mt,at){ot.isScene!==!0&&(ot=et),I.resetTextureUnits();const kt=ot.fog,Ht=mt.isMeshStandardMaterial?ot.environment:null,Xt=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Cs,qt=(mt.isMeshStandardMaterial?R:C).get(mt.envMap||Ht),ee=mt.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,ne=!!pt.attributes.tangent&&(!!mt.normalMap||mt.anisotropy>0),$t=!!pt.morphAttributes.position,fe=!!pt.morphAttributes.normal,Me=!!pt.morphAttributes.color;let we=bi;mt.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(we=v.toneMapping);const an=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,pe=an!==void 0?an.length:0,jt=ft.get(mt),Xn=h.state.lights;if(nt===!0&&(Tt===!0||D!==y)){const xn=D===y&&mt.id===b;ut.setState(mt,D,xn)}let me=!1;mt.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==Xn.state.version||jt.outputColorSpace!==Xt||at.isBatchedMesh&&jt.batching===!1||!at.isBatchedMesh&&jt.batching===!0||at.isBatchedMesh&&jt.batchingColor===!0&&at.colorTexture===null||at.isBatchedMesh&&jt.batchingColor===!1&&at.colorTexture!==null||at.isInstancedMesh&&jt.instancing===!1||!at.isInstancedMesh&&jt.instancing===!0||at.isSkinnedMesh&&jt.skinning===!1||!at.isSkinnedMesh&&jt.skinning===!0||at.isInstancedMesh&&jt.instancingColor===!0&&at.instanceColor===null||at.isInstancedMesh&&jt.instancingColor===!1&&at.instanceColor!==null||at.isInstancedMesh&&jt.instancingMorph===!0&&at.morphTexture===null||at.isInstancedMesh&&jt.instancingMorph===!1&&at.morphTexture!==null||jt.envMap!==qt||mt.fog===!0&&jt.fog!==kt||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==ut.numPlanes||jt.numIntersection!==ut.numIntersection)||jt.vertexAlphas!==ee||jt.vertexTangents!==ne||jt.morphTargets!==$t||jt.morphNormals!==fe||jt.morphColors!==Me||jt.toneMapping!==we||jt.morphTargetsCount!==pe)&&(me=!0):(me=!0,jt.__version=mt.version);let wn=jt.currentProgram;me===!0&&(wn=Qt(mt,ot,at));let qi=!1,un=!1,Ns=!1;const Ee=wn.getUniforms(),zn=jt.uniforms;if(Ct.useProgram(wn.program)&&(qi=!0,un=!0,Ns=!0),mt.id!==b&&(b=mt.id,un=!0),qi||y!==D){Ct.buffers.depth.getReversed()?(_t.copy(D.projectionMatrix),Dd(_t),Ud(_t),Ee.setValue(V,"projectionMatrix",_t)):Ee.setValue(V,"projectionMatrix",D.projectionMatrix),Ee.setValue(V,"viewMatrix",D.matrixWorldInverse);const ri=Ee.map.cameraPosition;ri!==void 0&&ri.setValue(V,L.setFromMatrixPosition(D.matrixWorld)),At.logarithmicDepthBuffer&&Ee.setValue(V,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(mt.isMeshPhongMaterial||mt.isMeshToonMaterial||mt.isMeshLambertMaterial||mt.isMeshBasicMaterial||mt.isMeshStandardMaterial||mt.isShaderMaterial)&&Ee.setValue(V,"isOrthographic",D.isOrthographicCamera===!0),y!==D&&(y=D,un=!0,Ns=!0)}if(at.isSkinnedMesh){Ee.setOptional(V,at,"bindMatrix"),Ee.setOptional(V,at,"bindMatrixInverse");const xn=at.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),Ee.setValue(V,"boneTexture",xn.boneTexture,I))}at.isBatchedMesh&&(Ee.setOptional(V,at,"batchingTexture"),Ee.setValue(V,"batchingTexture",at._matricesTexture,I),Ee.setOptional(V,at,"batchingIdTexture"),Ee.setValue(V,"batchingIdTexture",at._indirectTexture,I),Ee.setOptional(V,at,"batchingColorTexture"),at._colorsTexture!==null&&Ee.setValue(V,"batchingColorTexture",at._colorsTexture,I));const Fs=pt.morphAttributes;if((Fs.position!==void 0||Fs.normal!==void 0||Fs.color!==void 0)&&q.update(at,pt,wn),(un||jt.receiveShadow!==at.receiveShadow)&&(jt.receiveShadow=at.receiveShadow,Ee.setValue(V,"receiveShadow",at.receiveShadow)),mt.isMeshGouraudMaterial&&mt.envMap!==null&&(zn.envMap.value=qt,zn.flipEnvMap.value=qt.isCubeTexture&&qt.isRenderTargetTexture===!1?-1:1),mt.isMeshStandardMaterial&&mt.envMap===null&&ot.environment!==null&&(zn.envMapIntensity.value=ot.environmentIntensity),un&&(Ee.setValue(V,"toneMappingExposure",v.toneMappingExposure),jt.needsLights&&Ne(zn,Ns),kt&&mt.fog===!0&&Z.refreshFogUniforms(zn,kt),Z.refreshMaterialUniforms(zn,mt,N,B,h.state.transmissionRenderTarget[D.id]),lo.upload(V,te(jt),zn,I)),mt.isShaderMaterial&&mt.uniformsNeedUpdate===!0&&(lo.upload(V,te(jt),zn,I),mt.uniformsNeedUpdate=!1),mt.isSpriteMaterial&&Ee.setValue(V,"center",at.center),Ee.setValue(V,"modelViewMatrix",at.modelViewMatrix),Ee.setValue(V,"normalMatrix",at.normalMatrix),Ee.setValue(V,"modelMatrix",at.matrixWorld),mt.isShaderMaterial||mt.isRawShaderMaterial){const xn=mt.uniformsGroups;for(let ri=0,oi=xn.length;ri<oi;ri++){const Xl=xn[ri];j.update(Xl,wn),j.bind(Xl,wn)}}return wn}function Ne(D,ot){D.ambientLightColor.needsUpdate=ot,D.lightProbe.needsUpdate=ot,D.directionalLights.needsUpdate=ot,D.directionalLightShadows.needsUpdate=ot,D.pointLights.needsUpdate=ot,D.pointLightShadows.needsUpdate=ot,D.spotLights.needsUpdate=ot,D.spotLightShadows.needsUpdate=ot,D.rectAreaLights.needsUpdate=ot,D.hemisphereLights.needsUpdate=ot}function Xi(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(D,ot,pt){ft.get(D.texture).__webglTexture=ot,ft.get(D.depthTexture).__webglTexture=pt;const mt=ft.get(D);mt.__hasExternalTextures=!0,mt.__autoAllocateDepthBuffer=pt===void 0,mt.__autoAllocateDepthBuffer||vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),mt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,ot){const pt=ft.get(D);pt.__webglFramebuffer=ot,pt.__useDefaultFramebuffer=ot===void 0},this.setRenderTarget=function(D,ot=0,pt=0){A=D,_=ot,E=pt;let mt=!0,at=null,kt=!1,Ht=!1;if(D){const qt=ft.get(D);if(qt.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(V.FRAMEBUFFER,null),mt=!1;else if(qt.__webglFramebuffer===void 0)I.setupRenderTarget(D);else if(qt.__hasExternalTextures)I.rebindTextures(D,ft.get(D.texture).__webglTexture,ft.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const $t=D.depthTexture;if(qt.__boundDepthTexture!==$t){if($t!==null&&ft.has($t)&&(D.width!==$t.image.width||D.height!==$t.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(D)}}const ee=D.texture;(ee.isData3DTexture||ee.isDataArrayTexture||ee.isCompressedArrayTexture)&&(Ht=!0);const ne=ft.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(ne[ot])?at=ne[ot][pt]:at=ne[ot],kt=!0):D.samples>0&&I.useMultisampledRTT(D)===!1?at=ft.get(D).__webglMultisampledFramebuffer:Array.isArray(ne)?at=ne[pt]:at=ne,w.copy(D.viewport),P.copy(D.scissor),U=D.scissorTest}else w.copy(Mt).multiplyScalar(N).floor(),P.copy(Pt).multiplyScalar(N).floor(),U=Et;if(Ct.bindFramebuffer(V.FRAMEBUFFER,at)&&mt&&Ct.drawBuffers(D,at),Ct.viewport(w),Ct.scissor(P),Ct.setScissorTest(U),kt){const qt=ft.get(D.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+ot,qt.__webglTexture,pt)}else if(Ht){const qt=ft.get(D.texture),ee=ot||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,qt.__webglTexture,pt||0,ee)}b=-1},this.readRenderTargetPixels=function(D,ot,pt,mt,at,kt,Ht){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Xt=ft.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ht!==void 0&&(Xt=Xt[Ht]),Xt){Ct.bindFramebuffer(V.FRAMEBUFFER,Xt);try{const qt=D.texture,ee=qt.format,ne=qt.type;if(!At.textureFormatReadable(ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!At.textureTypeReadable(ne)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ot>=0&&ot<=D.width-mt&&pt>=0&&pt<=D.height-at&&V.readPixels(ot,pt,mt,at,gt.convert(ee),gt.convert(ne),kt)}finally{const qt=A!==null?ft.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(V.FRAMEBUFFER,qt)}}},this.readRenderTargetPixelsAsync=async function(D,ot,pt,mt,at,kt,Ht){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Xt=ft.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ht!==void 0&&(Xt=Xt[Ht]),Xt){const qt=D.texture,ee=qt.format,ne=qt.type;if(!At.textureFormatReadable(ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!At.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(ot>=0&&ot<=D.width-mt&&pt>=0&&pt<=D.height-at){Ct.bindFramebuffer(V.FRAMEBUFFER,Xt);const $t=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,$t),V.bufferData(V.PIXEL_PACK_BUFFER,kt.byteLength,V.STREAM_READ),V.readPixels(ot,pt,mt,at,gt.convert(ee),gt.convert(ne),0);const fe=A!==null?ft.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(V.FRAMEBUFFER,fe);const Me=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Id(V,Me,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,$t),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,kt),V.deleteBuffer($t),V.deleteSync(Me),kt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,ot=null,pt=0){D.isTexture!==!0&&(nr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),ot=arguments[0]||null,D=arguments[1]);const mt=Math.pow(2,-pt),at=Math.floor(D.image.width*mt),kt=Math.floor(D.image.height*mt),Ht=ot!==null?ot.x:0,Xt=ot!==null?ot.y:0;I.setTexture2D(D,0),V.copyTexSubImage2D(V.TEXTURE_2D,pt,0,0,Ht,Xt,at,kt),Ct.unbindTexture()},this.copyTextureToTexture=function(D,ot,pt=null,mt=null,at=0){D.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture function signature has changed."),mt=arguments[0]||null,D=arguments[1],ot=arguments[2],at=arguments[3]||0,pt=null);let kt,Ht,Xt,qt,ee,ne,$t,fe,Me;const we=D.isCompressedTexture?D.mipmaps[at]:D.image;pt!==null?(kt=pt.max.x-pt.min.x,Ht=pt.max.y-pt.min.y,Xt=pt.isBox3?pt.max.z-pt.min.z:1,qt=pt.min.x,ee=pt.min.y,ne=pt.isBox3?pt.min.z:0):(kt=we.width,Ht=we.height,Xt=we.depth||1,qt=0,ee=0,ne=0),mt!==null?($t=mt.x,fe=mt.y,Me=mt.z):($t=0,fe=0,Me=0);const an=gt.convert(ot.format),pe=gt.convert(ot.type);let jt;ot.isData3DTexture?(I.setTexture3D(ot,0),jt=V.TEXTURE_3D):ot.isDataArrayTexture||ot.isCompressedArrayTexture?(I.setTexture2DArray(ot,0),jt=V.TEXTURE_2D_ARRAY):(I.setTexture2D(ot,0),jt=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,ot.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ot.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,ot.unpackAlignment);const Xn=V.getParameter(V.UNPACK_ROW_LENGTH),me=V.getParameter(V.UNPACK_IMAGE_HEIGHT),wn=V.getParameter(V.UNPACK_SKIP_PIXELS),qi=V.getParameter(V.UNPACK_SKIP_ROWS),un=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,we.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,we.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,qt),V.pixelStorei(V.UNPACK_SKIP_ROWS,ee),V.pixelStorei(V.UNPACK_SKIP_IMAGES,ne);const Ns=D.isDataArrayTexture||D.isData3DTexture,Ee=ot.isDataArrayTexture||ot.isData3DTexture;if(D.isRenderTargetTexture||D.isDepthTexture){const zn=ft.get(D),Fs=ft.get(ot),xn=ft.get(zn.__renderTarget),ri=ft.get(Fs.__renderTarget);Ct.bindFramebuffer(V.READ_FRAMEBUFFER,xn.__webglFramebuffer),Ct.bindFramebuffer(V.DRAW_FRAMEBUFFER,ri.__webglFramebuffer);for(let oi=0;oi<Xt;oi++)Ns&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ft.get(D).__webglTexture,at,ne+oi),D.isDepthTexture?(Ee&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ft.get(ot).__webglTexture,at,Me+oi),V.blitFramebuffer(qt,ee,kt,Ht,$t,fe,kt,Ht,V.DEPTH_BUFFER_BIT,V.NEAREST)):Ee?V.copyTexSubImage3D(jt,at,$t,fe,Me+oi,qt,ee,kt,Ht):V.copyTexSubImage2D(jt,at,$t,fe,Me+oi,qt,ee,kt,Ht);Ct.bindFramebuffer(V.READ_FRAMEBUFFER,null),Ct.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Ee?D.isDataTexture||D.isData3DTexture?V.texSubImage3D(jt,at,$t,fe,Me,kt,Ht,Xt,an,pe,we.data):ot.isCompressedArrayTexture?V.compressedTexSubImage3D(jt,at,$t,fe,Me,kt,Ht,Xt,an,we.data):V.texSubImage3D(jt,at,$t,fe,Me,kt,Ht,Xt,an,pe,we):D.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,at,$t,fe,kt,Ht,an,pe,we.data):D.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,at,$t,fe,we.width,we.height,an,we.data):V.texSubImage2D(V.TEXTURE_2D,at,$t,fe,kt,Ht,an,pe,we);V.pixelStorei(V.UNPACK_ROW_LENGTH,Xn),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,me),V.pixelStorei(V.UNPACK_SKIP_PIXELS,wn),V.pixelStorei(V.UNPACK_SKIP_ROWS,qi),V.pixelStorei(V.UNPACK_SKIP_IMAGES,un),at===0&&ot.generateMipmaps&&V.generateMipmap(jt),Ct.unbindTexture()},this.copyTextureToTexture3D=function(D,ot,pt=null,mt=null,at=0){return D.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),pt=arguments[0]||null,mt=arguments[1]||null,D=arguments[2],ot=arguments[3],at=arguments[4]||0),nr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(D,ot,pt,mt,at)},this.initRenderTarget=function(D){ft.get(D).__webglFramebuffer===void 0&&I.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?I.setTextureCube(D,0):D.isData3DTexture?I.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?I.setTexture2DArray(D,0):I.setTexture2D(D,0),Ct.unbindTexture()},this.resetState=function(){_=0,E=0,A=null,Ct.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ti}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=le._getDrawingBufferColorSpace(t),e.unpackColorSpace=le._getUnpackColorSpace()}}class zl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Wt(t),this.near=e,this.far=n}clone(){return new zl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Wx extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Vn,this.environmentIntensity=1,this.environmentRotation=new Vn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Xx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=sl,this.updateRanges=[],this.version=0,this.uuid=ii()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ii()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const nn=new J;class yi{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyMatrix4(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.applyNormalMatrix(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)nn.fromBufferAttribute(this,e),nn.transformDirection(t),this.setXYZ(e,nn.x,nn.y,nn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Cn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ve(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ve(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Cn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Cn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Cn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Cn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array),s=ve(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ve(e,this.array),n=ve(n,this.array),s=ve(s,this.array),r=ve(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new Te(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new yi(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ah extends en{constructor(t=null,e=1,n=1,s,r,o,a,l,c=gn,u=gn,p,d){super(null,o,a,l,c,u,s,r,p,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rr extends Te{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const as=new he,Zc=new he,Nr=[],Jc=new Wn,qx=new he,Hs=new Jt,Vs=new Ti;class $x extends Jt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new rr(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,qx)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Wn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),Jc.copy(t.boundingBox).applyMatrix4(as),this.boundingBox.union(Jc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ti),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,as),Vs.copy(t.boundingSphere).applyMatrix4(as),this.boundingSphere.union(Vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Hs.geometry=this.geometry,Hs.material=this.material,Hs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vs.copy(this.boundingSphere),Vs.applyMatrix4(n),t.ray.intersectsSphere(Vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,as),Zc.multiplyMatrices(n,as),Hs.matrixWorld=Zc,Hs.raycast(t,Nr);for(let o=0,a=Nr.length;o<a;o++){const l=Nr[o];l.instanceId=r,l.object=this,e.push(l)}Nr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new rr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ah(new Float32Array(s*this.count),s,this.count,go,Bn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Yx extends Ls{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Qc=new he,al=new Tl,Fr=new Ti,Or=new J;class jx extends Ve{constructor(t=new _e,e=new Yx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Fr.copy(n.boundingSphere),Fr.applyMatrix4(s),Fr.radius+=r,t.ray.intersectsSphere(Fr)===!1)return;Qc.copy(s).invert(),al.copy(t.ray).applyMatrix4(Qc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,p=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){const m=c.getX(g);Or.fromBufferAttribute(p,m),tu(Or,m,l,s,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(p.count,o.start+o.count);for(let g=d,x=f;g<x;g++)Or.fromBufferAttribute(p,g),tu(Or,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function tu(i,t,e,n,s,r,o){const a=al.distanceSqToPoint(i);if(a<e){const l=new J;al.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Rh extends en{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Il extends _e{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new J,u=new Kt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let p=0,d=3;p<=e;p++,d+=3){const f=n+p/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[d]/t+1)/2,u.y=(o[d+1]/t+1)/2,l.push(u.x,u.y)}for(let p=1;p<=e;p++)r.push(p,p+1,0);this.setIndex(r),this.setAttribute("position",new oe(o,3)),this.setAttribute("normal",new oe(a,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Il(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Ds extends _e{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],p=[],d=[],f=[];let g=0;const x=[],m=n/2;let h=0;S(),o===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new oe(p,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function S(){const v=new J,T=new J;let _=0;const E=(e-t)/n;for(let A=0;A<=r;A++){const b=[],y=A/r,w=y*(e-t)+t;for(let P=0;P<=s;P++){const U=P/s,H=U*l+a,$=Math.sin(H),G=Math.cos(H);T.x=w*$,T.y=-y*n+m,T.z=w*G,p.push(T.x,T.y,T.z),v.set($,E,G).normalize(),d.push(v.x,v.y,v.z),f.push(U,1-y),b.push(g++)}x.push(b)}for(let A=0;A<s;A++)for(let b=0;b<r;b++){const y=x[b][A],w=x[b+1][A],P=x[b+1][A+1],U=x[b][A+1];(t>0||b!==0)&&(u.push(y,w,U),_+=3),(e>0||b!==r-1)&&(u.push(w,P,U),_+=3)}c.addGroup(h,_,0),h+=_}function M(v){const T=g,_=new Kt,E=new J;let A=0;const b=v===!0?t:e,y=v===!0?1:-1;for(let P=1;P<=s;P++)p.push(0,m*y,0),d.push(0,y,0),f.push(.5,.5),g++;const w=g;for(let P=0;P<=s;P++){const H=P/s*l+a,$=Math.cos(H),G=Math.sin(H);E.x=b*G,E.y=m*y,E.z=b*$,p.push(E.x,E.y,E.z),d.push(0,y,0),_.x=$*.5+.5,_.y=G*.5*y+.5,f.push(_.x,_.y),g++}for(let P=0;P<s;P++){const U=T+P,H=w+P;v===!0?u.push(H,H+1,U):u.push(H+1,H,U),A+=3}c.addGroup(h,A,v===!0?1:2),h+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ds(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Dl extends Ds{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Dl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class _o extends _e{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new oe(r,3)),this.setAttribute("normal",new oe(r.slice(),3)),this.setAttribute("uv",new oe(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const M=new J,v=new J,T=new J;for(let _=0;_<e.length;_+=3)f(e[_+0],M),f(e[_+1],v),f(e[_+2],T),l(M,v,T,S)}function l(S,M,v,T){const _=T+1,E=[];for(let A=0;A<=_;A++){E[A]=[];const b=S.clone().lerp(v,A/_),y=M.clone().lerp(v,A/_),w=_-A;for(let P=0;P<=w;P++)P===0&&A===_?E[A][P]=b:E[A][P]=b.clone().lerp(y,P/w)}for(let A=0;A<_;A++)for(let b=0;b<2*(_-A)-1;b++){const y=Math.floor(b/2);b%2===0?(d(E[A][y+1]),d(E[A+1][y]),d(E[A][y])):(d(E[A][y+1]),d(E[A+1][y+1]),d(E[A+1][y]))}}function c(S){const M=new J;for(let v=0;v<r.length;v+=3)M.x=r[v+0],M.y=r[v+1],M.z=r[v+2],M.normalize().multiplyScalar(S),r[v+0]=M.x,r[v+1]=M.y,r[v+2]=M.z}function u(){const S=new J;for(let M=0;M<r.length;M+=3){S.x=r[M+0],S.y=r[M+1],S.z=r[M+2];const v=m(S)/2/Math.PI+.5,T=h(S)/Math.PI+.5;o.push(v,1-T)}g(),p()}function p(){for(let S=0;S<o.length;S+=6){const M=o[S+0],v=o[S+2],T=o[S+4],_=Math.max(M,v,T),E=Math.min(M,v,T);_>.9&&E<.1&&(M<.2&&(o[S+0]+=1),v<.2&&(o[S+2]+=1),T<.2&&(o[S+4]+=1))}}function d(S){r.push(S.x,S.y,S.z)}function f(S,M){const v=S*3;M.x=t[v+0],M.y=t[v+1],M.z=t[v+2]}function g(){const S=new J,M=new J,v=new J,T=new J,_=new Kt,E=new Kt,A=new Kt;for(let b=0,y=0;b<r.length;b+=9,y+=6){S.set(r[b+0],r[b+1],r[b+2]),M.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),_.set(o[y+0],o[y+1]),E.set(o[y+2],o[y+3]),A.set(o[y+4],o[y+5]),T.copy(S).add(M).add(v).divideScalar(3);const w=m(T);x(_,y+0,S,w),x(E,y+2,M,w),x(A,y+4,v,w)}}function x(S,M,v,T){T<0&&S.x===1&&(o[M]=S.x-1),v.x===0&&v.z===0&&(o[M]=T/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function h(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _o(t.vertices,t.indices,t.radius,t.details)}}const kr=new J,Br=new J,sa=new J,Gr=new yn;class Kx extends _e{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(vs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],p=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:h}=Gr;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),h.fromBufferAttribute(a,c[2]),Gr.getNormal(sa),p[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,p[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,p[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let S=0;S<3;S++){const M=(S+1)%3,v=p[S],T=p[M],_=Gr[u[S]],E=Gr[u[M]],A=`${v}_${T}`,b=`${T}_${v}`;b in d&&d[b]?(sa.dot(d[b].normal)<=r&&(f.push(_.x,_.y,_.z),f.push(E.x,E.y,E.z)),d[b]=null):A in d||(d[A]={index0:c[S],index1:c[M],normal:sa.clone()})}}for(const g in d)if(d[g]){const{index0:x,index1:m}=d[g];kr.fromBufferAttribute(a,x),Br.fromBufferAttribute(a,m),f.push(kr.x,kr.y,kr.z),f.push(Br.x,Br.y,Br.z)}this.setAttribute("position",new oe(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Mi extends _o{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Mi(t.radius,t.detail)}}class on extends _e{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let p=t;const d=(e-t)/s,f=new J,g=new Kt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const h=r+m/n*o;f.x=p*Math.cos(h),f.y=p*Math.sin(h),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,u.push(g.x,g.y)}p+=d}for(let x=0;x<s;x++){const m=x*(n+1);for(let h=0;h<n;h++){const S=h+m,M=S,v=S+n+1,T=S+n+2,_=S+1;a.push(M,v,_),a.push(v,T,_)}}this.setIndex(a),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(c,3)),this.setAttribute("uv",new oe(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new on(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Ul extends _o{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Ul(t.radius,t.detail)}}class Nl extends _e{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new J,p=new J,d=new J;for(let f=0;f<=n;f++)for(let g=0;g<=s;g++){const x=g/s*r,m=f/n*Math.PI*2;p.x=(t+e*Math.cos(m))*Math.cos(x),p.y=(t+e*Math.cos(m))*Math.sin(x),p.z=e*Math.sin(m),a.push(p.x,p.y,p.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),d.subVectors(p,u).normalize(),l.push(d.x,d.y,d.z),c.push(g/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=s;g++){const x=(s+1)*f+g-1,m=(s+1)*(f-1)+g-1,h=(s+1)*(f-1)+g,S=(s+1)*f+g;o.push(x,m,S),o.push(m,h,S)}this.setIndex(o),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Zx extends _e{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,s=new J,r=new J;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const p=l[c],d=p.start,f=p.count;for(let g=d,x=d+f;g<x;g+=3)for(let m=0;m<3;m++){const h=a.getX(g+m),S=a.getX(g+(m+1)%3);s.fromBufferAttribute(o,h),r.fromBufferAttribute(o,S),eu(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,p=3*a+(c+1)%3;s.fromBufferAttribute(o,u),r.fromBufferAttribute(o,p),eu(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new oe(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function eu(i,t,e){const n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(s)===!0?!1:(e.add(n),e.add(s),!0)}class Jx extends De{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class ll extends Ls{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hh,this.normalScale=new Kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Vn,this.combine=vl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fl extends Ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Wt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Qx extends Fl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ra=new he,nu=new J,iu=new J;class Ch{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Kt(512,512),this.map=null,this.mapPass=null,this.matrix=new he,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rl,this._frameExtents=new Kt(1,1),this._viewportCount=1,this._viewports=[new ce(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;nu.setFromMatrixPosition(t.matrixWorld),e.position.copy(nu),iu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(iu),e.updateMatrixWorld(),ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ra)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const su=new he,Ws=new J,oa=new J;class tv extends Ch{constructor(){super(new mn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Kt(4,2),this._viewportCount=6,this._viewports=[new ce(2,1,1,1),new ce(0,1,1,1),new ce(3,1,1,1),new ce(1,1,1,1),new ce(3,0,1,1),new ce(1,0,1,1)],this._cubeDirections=[new J(1,0,0),new J(-1,0,0),new J(0,0,1),new J(0,0,-1),new J(0,1,0),new J(0,-1,0)],this._cubeUps=[new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,1,0),new J(0,0,1),new J(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ws.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ws),oa.copy(n.position),oa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(oa),n.updateMatrixWorld(),s.makeTranslation(-Ws.x,-Ws.y,-Ws.z),su.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(su)}}class ev extends Fl{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new tv}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class nv extends Ch{constructor(){super(new Cl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ru extends Fl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.target=new Ve,this.shadow=new nv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ph extends _e{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class Lh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ou(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=ou();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function ou(){return performance.now()}class cl extends Xx{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const au=new he;class lu{constructor(t,e,n=0,s=1/0){this.ray=new Tl(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Al,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return au.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(au),this}intersectObject(t,e=!0,n=[]){return ul(t,this,n,e),n.sort(cu),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ul(t[s],this,n,e);return n.sort(cu),n}}function cu(i,t){return i.distance-t.distance}function ul(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)ul(r[o],t,e,!0)}}const uu=new J,Hr=new J;class iv{constructor(t=new J,e=new J){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){uu.subVectors(t,this.start),Hr.subVectors(this.end,this.start);const n=Hr.dot(Hr);let r=Hr.dot(uu)/n;return e&&(r=tn(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);const zh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Wi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const sv=new Cl(-1,1,1,-1,0,1);class rv extends _e{constructor(){super(),this.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new oe([0,2,0,0,2,0],2))}}const ov=new rv;class yo{constructor(t){this._mesh=new Jt(ov,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,sv)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class av extends Wi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof De?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Ei.clone(t.uniforms),this.material=new De({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new yo(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class hu extends Wi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class lv extends Wi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class cv{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Kt);this._width=n.width,this._height=n.height,e=new bn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Gn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new av(zh),this.copyPass.material.blending=ni,this.clock=new Lh}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}hu!==void 0&&(o instanceof hu?n=!0:o instanceof lv&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Kt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class uv extends Wi{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Wt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const hv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Wt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Ts extends Wi{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Kt(t.x,t.y):new Kt(256,256),this.clearColor=new Wt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new bn(r,o,{type:Gn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let p=0;p<this.nMips;p++){const d=new bn(r,o,{type:Gn});d.texture.name="UnrealBloomPass.h"+p,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new bn(r,o,{type:Gn});f.texture.name="UnrealBloomPass.v"+p,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=hv;this.highPassUniforms=Ei.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new De({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let p=0;p<this.nMips;p++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[p])),this.separableBlurMaterials[p].uniforms.invSize.value=new Kt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1),new J(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=zh;this.copyUniforms=Ei.clone(u.uniforms),this.blendMaterial=new De({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:He,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Wt,this.oldClearAlpha=1,this.basic=new Pe,this.fsQuad=new yo(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Kt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ts.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ts.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new De({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Kt(.5,.5)},direction:{value:new Kt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new De({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Ts.BlurDirectionX=new Kt(1,0);Ts.BlurDirectionY=new Kt(0,1);const fv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class dv extends Wi{constructor(){super();const t=fv;this.uniforms=Ei.clone(t.uniforms),this.material=new Jx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new yo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},le.getTransfer(this._outputColorSpace)===xe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===ju?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ku?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Zu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ju?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Qu?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===th&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const pv=512,mv=2,gv=.42;class xv extends Wi{constructor(t){super(),this.camera=t,this.needsSwap=!0,this.mat=new De({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tMask:{value:null},uProjInv:{value:new he},uCam:{value:new he},uW0:{value:new Kt},uBg:{value:new Wt(Se.background)},uGhost:{value:gv},uOn:{value:1},uShroud:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse, tDepth, tMask; uniform mat4 uProjInv, uCam; uniform vec2 uW0; uniform vec3 uBg; uniform float uGhost, uOn, uShroud;
        varying vec2 vUv;
        const float RES = ${pv.toFixed(1)}; const float K = ${mv.toFixed(1)};
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
        }`,depthTest:!1,depthWrite:!1}),this.quad=new yo(this.mat)}setMask(t){this.mat.uniforms.tMask.value=t}setWindow(t,e){this.mat.uniforms.uW0.value.set(t,e)}setShroud(t){this.mat.uniforms.uShroud.value=t}setEnabled(t){this.mat.uniforms.uOn.value=t?1:0,this.enabled=!!t}render(t,e,n){const s=this.mat.uniforms;s.tDiffuse.value=n.texture,s.tDepth.value=n.depthTexture,this.camera.updateMatrixWorld(),s.uProjInv.value.copy(this.camera.projectionMatrixInverse),s.uCam.value.copy(this.camera.matrixWorld),t.setRenderTarget(this.renderToScreen?null:e),this.quad.render(t)}dispose(){this.mat.dispose(),this.quad.dispose()}}const fu=new Wn,Vr=new J;class Mo extends Ph{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new oe(t,3)),this.setAttribute("uv",new oe(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new cl(e,6,1);return this.setAttribute("instanceStart",new yi(n,3,0)),this.setAttribute("instanceEnd",new yi(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new cl(e,6,1);return this.setAttribute("instanceColorStart",new yi(n,3,0)),this.setAttribute("instanceColorEnd",new yi(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Zx(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Wn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),fu.setFromBufferAttribute(e),this.boundingBox.union(fu))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ti),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Vr.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Vr)),Vr.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Vr));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}Gt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Kt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};ln.line={uniforms:Ei.merge([Gt.common,Gt.fog,Gt.line]),vertexShader:`
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
		`};class So extends De{static get type(){return"LineMaterial"}constructor(t){super({uniforms:Ei.clone(ln.line.uniforms),vertexShader:ln.line.vertexShader,fragmentShader:ln.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const aa=new ce,du=new J,pu=new J,qe=new ce,$e=new ce,Dn=new ce,la=new J,ca=new he,Ye=new iv,mu=new J,Wr=new Wn,Xr=new Ti,Un=new ce;let kn,Gi;function gu(i,t,e){return Un.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),Un.multiplyScalar(1/Un.w),Un.x=Gi/e.width,Un.y=Gi/e.height,Un.applyMatrix4(i.projectionMatrixInverse),Un.multiplyScalar(1/Un.w),Math.abs(Math.max(Un.x,Un.y))}function vv(i,t){const e=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,s.count);for(let a=0,l=o;a<l;a++){Ye.start.fromBufferAttribute(s,a),Ye.end.fromBufferAttribute(r,a),Ye.applyMatrix4(e);const c=new J,u=new J;kn.distanceSqToSegment(Ye.start,Ye.end,u,c),u.distanceTo(c)<Gi*.5&&t.push({point:u,pointOnLine:c,distance:kn.origin.distanceTo(u),object:i,face:null,faceIndex:a,uv:null,uv1:null})}}function _v(i,t,e){const n=t.projectionMatrix,r=i.material.resolution,o=i.matrixWorld,a=i.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),p=-t.near;kn.at(1,Dn),Dn.w=1,Dn.applyMatrix4(t.matrixWorldInverse),Dn.applyMatrix4(n),Dn.multiplyScalar(1/Dn.w),Dn.x*=r.x/2,Dn.y*=r.y/2,Dn.z=0,la.copy(Dn),ca.multiplyMatrices(t.matrixWorldInverse,o);for(let d=0,f=u;d<f;d++){if(qe.fromBufferAttribute(l,d),$e.fromBufferAttribute(c,d),qe.w=1,$e.w=1,qe.applyMatrix4(ca),$e.applyMatrix4(ca),qe.z>p&&$e.z>p)continue;if(qe.z>p){const M=qe.z-$e.z,v=(qe.z-p)/M;qe.lerp($e,v)}else if($e.z>p){const M=$e.z-qe.z,v=($e.z-p)/M;$e.lerp(qe,v)}qe.applyMatrix4(n),$e.applyMatrix4(n),qe.multiplyScalar(1/qe.w),$e.multiplyScalar(1/$e.w),qe.x*=r.x/2,qe.y*=r.y/2,$e.x*=r.x/2,$e.y*=r.y/2,Ye.start.copy(qe),Ye.start.z=0,Ye.end.copy($e),Ye.end.z=0;const x=Ye.closestPointToPointParameter(la,!0);Ye.at(x,mu);const m=Jn.lerp(qe.z,$e.z,x),h=m>=-1&&m<=1,S=la.distanceTo(mu)<Gi*.5;if(h&&S){Ye.start.fromBufferAttribute(l,d),Ye.end.fromBufferAttribute(c,d),Ye.start.applyMatrix4(o),Ye.end.applyMatrix4(o);const M=new J,v=new J;kn.distanceSqToSegment(Ye.start,Ye.end,v,M),e.push({point:v,pointOnLine:M,distance:kn.origin.distanceTo(v),object:i,face:null,faceIndex:d,uv:null,uv1:null})}}}class Ol extends Jt{constructor(t=new Mo,e=new So({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)du.fromBufferAttribute(e,o),pu.fromBufferAttribute(n,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+du.distanceTo(pu);const r=new cl(s,2,1);return t.setAttribute("instanceDistanceStart",new yi(r,1,0)),t.setAttribute("instanceDistanceEnd",new yi(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,s=t.camera;s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;kn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Gi=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Xr.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=Gi*.5;else{const p=Math.max(s.near,Xr.distanceToPoint(kn.origin));c=gu(s,p,l.resolution)}if(Xr.radius+=c,kn.intersectsSphere(Xr)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Wr.copy(a.boundingBox).applyMatrix4(o);let u;if(n)u=Gi*.5;else{const p=Math.max(s.near,Wr.distanceToPoint(kn.origin));u=gu(s,p,l.resolution)}Wr.expandByScalar(u),kn.intersectsBox(Wr)!==!1&&(n?vv(this,e):_v(this,s,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(aa),this.material.uniforms.resolution.value.set(aa.z,aa.w))}}const yv=.38,Mv=4.4,qr=3,di=3.2,or=i=>.05+i*.18,Ge=i=>i?or(i.clearance):.05,Qn=.05+3*.18+Mv,Sv=i=>i.solid?Qn:or(i.clearance),bv=Qn,Zt={FLOOR:0,TILES:1,SOLIDS:2,BORDERS:3,FOOT:4,CREST:5,SECTOR:6,GLOW:20,CURTAIN:21,BEAM:22,GATE_LIGHT:23,TRAIL:25,HL_FILL:30,HL_OUTLINE:31,MARKERS:32,CURSOR:33,MOTES:40};function Ih(i){return i.depthTest=!0,i.depthWrite=!1,i.polygonOffset=!0,i.polygonOffsetFactor=-2,i.polygonOffsetUnits=-2,i}function je(i,{depthTest:t=!0,offset:e=-1}={}){return i.transparent=!0,i.depthWrite=!1,i.depthTest=t,e&&!i.polygonOffset&&(i.polygonOffset=!0,i.polygonOffsetFactor=e,i.polygonOffsetUnits=e),i}let Xs=null;function wv(){if(Xs)return Xs;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.6,"rgba(255,255,255,0.14)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Xs=new Rh(i),Xs.colorSpace=pn,Xs}const po=4;function Ev(){const i={value:Array.from({length:po},()=>new ce(0,0,0,0))},t=new J;return{uniform:i,update(e,n){for(let s=0;s<po;s++){const r=n[s];if(!r||!(r.r>0)){i.value[s].set(0,0,0,0);continue}t.set(r.x,r.y,r.z).applyMatrix4(e.matrixWorldInverse),i.value[s].set(t.x,t.y,t.z,r.r)}}}}const Dh=`
uniform vec4 uCut[${po}];
uniform float uMinVis;
varying vec3 vCutPos;
float cutVisibility(vec3 vp) {
  float vis = 1.0;
  for (int i = 0; i < ${po}; i++) {
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
`,Uh="{ float cv = mix(uMinVis, 1.0, cutVisibility(vCutPos)); if (cv < cutDither()) discard; }";function Tv(i,t,{minVis:e=.08,stripes:n=!1}={}){return i.onBeforeCompile=s=>{s.uniforms.uCut=t.uniform,s.uniforms.uMinVis={value:e},s.vertexShader=s.vertexShader.replace("void main() {",`varying vec3 vCutPos;
varying float vWY;
void main() {`).replace("#include <project_vertex>",`#include <project_vertex>
vCutPos = mvPosition.xyz;
vWY = transformed.y;`),s.fragmentShader=s.fragmentShader.replace("void main() {",`varying float vWY;
${Dh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${Uh}`),n&&(s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float sy = abs(fract(vWY * 0.45) - 0.5);
         diffuseColor.rgb *= 1.0 + 1.1 * smoothstep(0.06, 0.0, sy);`))},i.customProgramCacheKey=()=>`solid-cut-${n}`,i}function Av(i,t,{minVis:e=.22}={}){return i.uniforms.uCut=t.uniform,i.uniforms.uMinVis={value:e},i.vertexShader=i.vertexShader.replace("void main() {",`varying vec3 vCutPos;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
vCutPos = ( position.y < 0.5 ? start : end ).xyz;`),i.fragmentShader=i.fragmentShader.replace("void main() {",`${Dh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${Uh}`),i.needsUpdate=!0,i}const Nh=.005;function Rv(i,t=Nh){return i.uniforms.uPull={value:1-t},i.vertexShader=i.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
start.xyz *= uPull; end.xyz *= uPull;`),i.needsUpdate=!0,i}function Fh(i,t=Nh){const e=i.onBeforeCompile;return i.onBeforeCompile=(n,s)=>{e==null||e(n,s),n.uniforms.uPull={value:1-t},n.vertexShader=n.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("#include <project_vertex>",`
        vec4 mvPosition = vec4( transformed, 1.0 );
        mvPosition = modelViewMatrix * mvPosition;
        mvPosition.xyz *= uPull;
        gl_Position = projectionMatrix * mvPosition;`)},i.customProgramCacheKey=()=>"pull",i}function Cv(i,t,{dashed:e=!1}={}){const n=new Mo;n.setPositions(new Float32Array(t*6));const s=new Ol(n,i);e&&s.computeLineDistances();const r=n.attributes.instanceStart.data,o=e?n.attributes.instanceDistanceStart.data:null;return n.instanceCount=0,s.frustumCulled=!1,s.visible=!1,{line:s,set(a){const l=Math.min(Math.floor(a.length/6),t);for(let c=0;c<l*6;c++)r.array[c]=a[c];if(r.needsUpdate=!0,o){let c=0;for(let u=0;u<l;u++){const p=u*6,d=Math.hypot(a[p+3]-a[p],a[p+4]-a[p+1],a[p+5]-a[p+2]);o.array[u*2]=c,o.array[u*2+1]=c+d,c+=d}o.needsUpdate=!0}n.instanceCount=l,s.visible=l>0}}}function ua(i){const t=[],e=[],n=new he,s=new Vi,r=new J(1,1,1),o=new Wt;for(const l of i){const c=new Sn(l.w,l.h,l.d).toNonIndexed();s.setFromAxisAngle(new J(0,1,0),l.rot??0),n.compose(new J(l.x,l.y,l.z),s,r),c.applyMatrix4(n),o.set(l.color).multiplyScalar(l.k??1);const u=c.getAttribute("position");for(let p=0;p<u.count;p++)t.push(u.getX(p),u.getY(p),u.getZ(p)),e.push(o.r,o.g,o.b);c.dispose()}const a=new _e;return a.setAttribute("position",new oe(t,3)),a.setAttribute("color",new oe(e,3)),a}const hl=i=>{var t;return((t=i.cut)==null?void 0:t.poly)??i.poly},xu=160;function Oh({group:i,lineMats:t}){const e=({hex:n,fill:s,width:r,pulse:o})=>{const a=new _e,l=new Float32Array(xu*9);a.setAttribute("position",new Te(l,3)),a.setDrawRange(0,0);const c=Fh(je(new Pe({color:new Wt(n),opacity:s,transparent:!0,side:Ae,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))),u=new Jt(a,c);u.renderOrder=Zt.HL_FILL,u.frustumCulled=!1,u.visible=!1;const p=Rv(je(new So({color:new Wt(n).multiplyScalar(1.8),linewidth:r,worldUnits:!1,transparent:!0})));t.push(p);const d=Cv(p,320),f=d.line;f.renderOrder=Zt.HL_OUTLINE,i.add(u,f);let g=null,x=s;return{get cell(){return g},set(m,{blocked:h=!1}={}){if(!m){g=null,u.visible=f.visible=!1;return}g=m;const S=new Wt(h?Se.blocked:n);c.color.copy(S),p.color.copy(S).multiplyScalar(1.8);const M=m.solid?hl(m):m.poly,v=M.length,T=Ge(m),_=[],E=[],A=(y,w,P)=>E.push(...y,...w,...P);if(m.solid){const y=Qn;for(let w=0;w<v;w++){const P=M[w],U=M[(w+1)%v];A([m.cx,y+.03,m.cz],[P[0],y+.03,P[1]],[U[0],y+.03,U[1]]),A([P[0],T,P[1]],[U[0],T,U[1]],[U[0],y,U[1]]),A([P[0],T,P[1]],[U[0],y,U[1]],[P[0],y,P[1]]),_.push(P[0],y+.05,P[1],U[0],y+.05,U[1]),_.push(P[0],T+.06,P[1],U[0],T+.06,U[1]),_.push(P[0],T+.06,P[1],P[0],y+.05,P[1])}}else{const y=T+.03,w=T+.06;for(let P=0;P<v;P++){const U=M[P],H=M[(P+1)%v];A([m.cx,y,m.cz],[U[0],y,U[1]],[H[0],y,H[1]]),_.push(U[0],w,U[1],H[0],w,H[1])}}const b=Math.min(E.length/9,xu);l.set(E.slice(0,b*9)),a.getAttribute("position").needsUpdate=!0,a.setDrawRange(0,b*3),d.set(_),u.visible=f.visible=!0,x=h?Math.max(s,.3):s},tick(m){g&&o?c.opacity=x*(.78+.22*Math.sin(m*4.5)):c.opacity=x}}};return{hover:e({hex:Se.hover,fill:.26,width:2.6,pulse:!0}),select:e({hex:Se.select,fill:.3,width:3.6,pulse:!1})}}function kh(i){const t=new De({fog:!0,uniforms:Ei.merge([Gt.fog,{uBase:{value:new Wt(Se.floor)},uFocus:{value:new Kt(0,0)}}]),vertexShader:`#include <fog_pars_vertex>
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
      }`}),e=new Jt(new zs(900,900),t);return e.rotation.x=-Math.PI/2,e.position.y=-.05,e.renderOrder=Zt.FLOOR,i.add(e),{floor:e,floorMat:t}}const ha=new WeakMap,vu=i=>`${Math.round(i[0]*20)},${Math.round(i[1]*20)}`;function Pv(i){var n;if((n=i.sectorEdges)!=null&&n.length)return i.sectorEdges;if(ha.has(i))return ha.get(i);const t=new Map;for(const s of i.cells){const r=s.poly.length;for(let o=0;o<r;o++){const a=s.poly[o],l=s.poly[(o+1)%r],c=vu(a),u=vu(l),p=c<u?`${c}|${u}`:`${u}|${c}`,d=t.get(p);d?d.sb=s.sector:t.set(p,{a,b:l,sa:s.sector,sb:null})}}const e=[];for(const s of t.values())s.sb===null?e.push({a:s.a,b:s.b,sa:s.sa,sb:-1}):s.sb!==s.sa&&e.push(s);return ha.set(i,e),e}function _u(i,t){var s,r;const e=((s=i.sectors[t.sa])==null?void 0:s.clearance)??0,n=t.sb>=0?((r=i.sectors[t.sb])==null?void 0:r.clearance)??0:0;return Math.max(e,n)}const yu=i=>`${Math.round(i[0]*1e6)},${Math.round(i[1]*1e6)}`,bo=(i,t)=>Xu(i,t);function Lv(i,t){var g;const e=(g=i.span)!=null&&g.length?i.span.flatMap(x=>[x.a,x.b]):[i.edge.a,i.edge.b];let n=e[0],s=e[e.length-1],r=-1;for(let x=0;x<e.length;x++)for(let m=x+1;m<e.length;m++){const h=(e[x][0]-e[m][0])**2+(e[x][1]-e[m][1])**2;h>r&&(r=h,n=e[x],s=e[m])}const o=Math.sqrt(r)||i.len,a=(s[0]-n[0])/o,l=(s[1]-n[1])/o,c=[(n[0]+s[0])/2,(n[1]+s[1])/2];let u=-l,p=a;const d=t(i.a),f=t(i.b);return(f.cx-d.cx)*u+(f.cz-d.cz)*p<0&&(u=-u,p=-p),{s:n,e:s,mid:c,len:o,ax:a,az:l,nx:u,nz:p}}function zv(i){const t=new Set;for(const e of i)if(!e.locked)for(const n of e.span??[])t.add(bo(n.a,n.b));return t}function Iv(i,t=[]){const e=zv(i);for(const n of t)if(!n.locked)for(const s of n.edges)e.add(bo(s.a,s.b));return e}const Si=Object.freeze({minLen:.3,flat:.002,same:1e-4,endTol:1e-5}),ei=(i,t)=>Math.hypot(i[0]-t[0],i[1]-t[1]),qs=i=>`${Math.round(i[0]*1e7)},${Math.round(i[1]*1e7)}`,Dv=(i,t)=>{const e=`${Math.round(i[0]/Si.same)},${Math.round(i[1]/Si.same)}`,n=`${Math.round(t[0]/Si.same)},${Math.round(t[1]/Si.same)}`;return e<n?`${e}|${n}`:`${n}|${e}`};function fa(i,t,e){const n=ei(t,e);return n<1e-9?ei(i,t):Math.abs((e[0]-t[0])*(t[1]-i[1])-(t[0]-i[0])*(e[1]-t[1]))/n}function Uv(i,t,e=Si.minLen,n=Si.flat){let s=[];for(const d of i)(!s.length||ei(d,s[s.length-1])>1e-6)&&s.push(d);t&&s.length>1&&ei(s[0],s[s.length-1])<=1e-6&&s.pop();const r=t?3:2,o={merged:0,fused:0},a=()=>s.length,l=d=>(d-1+a())%a(),c=d=>(d+1)%a(),u=d=>t||d>0&&d<a()-1;for(let d=0;d<4096&&a()>=r;d++){let f=-1;for(let g=0;g<a()&&f<0;g++){if(!u(g))continue;const x=s[l(g)],m=s[c(g)],h=s[g],S=(m[0]-x[0])*(h[0]-x[0])+(m[1]-x[1])*(h[1]-x[1]);fa(h,x,m)<n&&S>0&&S<(m[0]-x[0])**2+(m[1]-x[1])**2&&(f=g,o.merged++)}if(f<0){let g=-1,x=e;const m=t?a():a()-1;for(let h=0;h<m;h++){const S=ei(s[h],s[c(h)]);S<x&&(x=S,g=h)}if(g>=0){const h=g,S=c(g),M=[];if(u(h)&&M.push([fa(s[h],s[l(h)],s[S]),h]),u(S)&&M.push([fa(s[S],s[h],s[c(S)]),S]),!M.length)return null;M.sort((v,T)=>v[0]-T[0]),f=M[0][1],o.fused++}}if(f<0)break;s=s.filter((g,x)=>x!==f)}if(a()<r)return null;let p=0;for(let d=0;d<(t?a():a()-1);d++)p+=ei(s[d],s[c(d)]);return p<e?null:Object.assign(s,{stats:o})}function Nv(i){const t=new Map;i.forEach((r,o)=>{for(const a of[r.a,r.b]){const l=qs(a);t.has(l)||t.set(l,[]),t.get(l).push(o)}});const e=new Uint8Array(i.length),n=[],s=(r,o)=>{const a=[r];let l=qs(r),c=o;for(;;){e[c]=1;const u=i[c],p=qs(u.a)===l?u.b:u.a;a.push(p),l=qs(p);const d=t.get(l).filter(f=>!e[f]);if(t.get(l).length!==2||!d.length)break;c=d[0]}return a};for(const[r,o]of t)if(o.length!==2){for(const a of o)if(!e[a]){const l=i[a];n.push({pts:s(qs(l.a)===r?l.a:l.b,a),closed:!1})}}for(let r=0;r<i.length;r++)e[r]||n.push({pts:s(i[r].a,r),closed:!0});return n}function Fv(i,t=null,e=null){const n=[],s=[],r=new Set,o={chains:0,merged:0,fused:0,duplicate:0};let a=i.sectorLines;if(!a){const l=(i.sectorEdges??[]).filter(u=>!(e&&t&&e(u,t))),c=new Map;for(const u of l){const p=`${u.sa}|${u.sb}`;c.has(p)||c.set(p,{sa:u.sa,sb:u.sb,edges:[]}),c.get(p).edges.push(u)}a=[];for(const u of c.values())for(const p of Nv(u.edges))a.push({...p,sa:u.sa,sb:u.sb,caps:p.closed?[]:["junction","junction"]})}for(const l of a){const c=Uv(l.pts,!!l.closed);if(!c){o.chains++;continue}o.merged+=c.stats.merged,o.fused+=c.stats.fused;const u={pts:[...c],closed:!!l.closed,sa:l.sa,sb:l.sb,caps:l.caps??[],fence:!!l.fence},p=u.closed?c.length:c.length-1,d=[];for(let f=0;f<p;f++){const g=c[f],x=c[(f+1)%c.length],m=Dv(g,x);if(r.has(m)){o.duplicate++;continue}r.add(m),d.push({a:g,b:x,sa:l.sa,sb:l.sb})}d.length&&(n.push(u),s.push(...d))}return{runs:n,segments:s,dropped:o}}function Ov(i,t){for(const e of i){if(e.closed||e.sa!==t.sa||e.sb!==t.sb)continue;const n=[e.pts[0],e.pts[e.pts.length-1]];for(const[s,r]of n.entries())if(e.caps[s]!=="junction"&&(ei(r,t.start)<Si.endTol||ei(r,t.end)<Si.endTol))return!0}return!1}function kv(i,t,e,n){const s=n?i.filter(n):i;if(!t)return s;const r=new Map;for(const o of t)o.kind!=="gap"&&r.set(`${o.sa}|${o.sb}|${o.slot}`,o);return s.filter(o=>{if(o.locked)return!0;const a=r.get(`${o.sa}|${o.sb}|${o.slot}`);return!!a&&Ov(e,a)})}const Mu=Object.freeze({spacing:5,minGap:1.2});function Bv(i,t={}){const e=t.spacing??Mu.spacing,n=t.minGap??Mu.minGap,s=[];return i.forEach((r,o)=>{if(!r.fence)return;const a=r.closed?[...r.pts,r.pts[0]]:r.pts,l=[0];for(let f=1;f<a.length;f++)l.push(l[f-1]+ei(a[f-1],a[f]));const c=l[l.length-1];if(!(c>0))return;const u=f=>{let g=1;for(;g<l.length-1&&l[g]<f;)g++;const x=(f-l[g-1])/(l[g]-l[g-1]||1);return[a[g-1][0]+(a[g][0]-a[g-1][0])*x,a[g-1][1]+(a[g][1]-a[g-1][1])*x]},p=Math.max(1,Math.round(c/e)),d=f=>!r.closed&&r.caps[f]==="opening";for(let f=0;f<=p&&!(r.closed&&f===p);f++){const g=!r.closed&&(f===0||f===p);if(g&&!d(f===0?0:1))continue;const x=f/p*c;!g&&!r.closed&&(x<n&&d(0)||c-x<n&&d(1))||s.push({p:u(x),kind:g?"end":"mid",run:o,at:x})}}),s}const wo=.38,Gv=1.8,Su=Object.freeze({glow:.65,curtain:.8}),Bh=i=>i>.001?Math.min(Gv,i/wo):0;function bu(i,t,e){if(!i)return;const n=Bh(e);i.opacity=Math.min(1,t*n),i.visible=n>0}const Hv=8,Vv=8192,$s=new Map;function wu(i){let t=$s.get(i);if(t)return t;const e=i.length;t=new Array(e);for(let n=0;n<e;n++)t[n]=bo(i[n],i[(n+1)%e]);return $s.size>=Vv&&$s.delete($s.keys().next().value),$s.set(i,t),t}const Eu=new WeakMap;function Gh(i){let t=Eu.get(i);return t===void 0&&(t=bo(i.a,i.b),Eu.set(i,t)),t}const Wv=(i,t)=>!!(i.open||i.gap||t.has(Gh(i)));function Ys(i=2048){let t=new Float32Array(i*3),e=0;return{get count(){return e},put(n,s,r){if(3*e+3>t.length){const o=new Float32Array(t.length*2);o.set(t),t=o}t[3*e]=n,t[3*e+1]=s,t[3*e+2]=r,e++},take(){return t.slice(0,3*e)}}}function Hh(i,{cut:t,chunk:e=null},n=()=>performance.now()){const s={deadline:1/0,now:n,n:0},r=qv(i,{cut:t,chunk:e},s),o={board:null,done:!1,run(a=1/0){if(o.done)return!0;s.deadline=a;const l=r.next();return s.deadline=1/0,l.done&&(o.done=!0,o.board=l.value),o.done}};return o}function Xv(i,t){const e=Hh(i,t);return e.run(1/0),e.board}function*qv(i,{cut:t,chunk:e},n){var Ue,Ke;const s=()=>n.deadline===1/0||++n.n<Hv?!1:(n.n=0,n.now()>=n.deadline),r=new Re,o=e?e.lineMats:[],a=[],l=ef.map(Y=>new Wt(Y)),c=(e==null?void 0:e.glowRef)??{v:wo},u=[],p=(Y,yt)=>{u.push([Y,yt]),bu(Y,yt,c.v)},d=(Y,yt)=>{if(!e)return yt();let wt=e.shared.get(Y);return wt||e.shared.set(Y,wt=yt()),wt},f=Y=>i.cellById?i.cellById(Y):i.cells[Y],g=new Set(i.cells);let x=(e==null?void 0:e.shows)??null;const m=new Map(i.gates.map(Y=>[Y,Lv(Y,f)])),h=new Map;for(const Y of i.edgeCells??i.cells){s()&&(yield);const yt=Y.poly,wt=yt.length,Nt=wu(yt);for(let Bt=0;Bt<wt;Bt++){const Ut=Nt[Bt];let Ft=h.get(Ut);Ft||(Ft={a:yt[Bt],b:yt[(Bt+1)%wt],key:Ut,cells:[],bandMax:0,solid:0},h.set(Ut,Ft)),Ft.cells.push(Y),Ft.bandMax=Math.max(Ft.bandMax,Y.clearance),Y.solid&&Ft.solid++}}const S=Iv(i.gates,i.sectorOpenings),M=e?null:kh(r).floorMat,v=[],T=new Map,_=(Y,yt,wt)=>{let Nt=T.get(Y);Nt||T.set(Y,Nt=[]),Nt.push(yt,wt)};for(const Y of i.edgeCells??i.cells){if(s()&&(yield),!Y.solid)continue;const yt=hl(Y),wt=yt.length,Nt=wu(yt);for(let Bt=0;Bt<wt;Bt++){const Ut=yt[Bt],Ft=yt[(Bt+1)%wt],Ot=h.get(Nt[Bt]);if(Ot&&Ot.solid>1)continue;const Qt=Ft[0]-Ut[0],te=Ft[1]-Ut[1],be=Math.hypot(Qt,te);if(be<1e-4)continue;let ye=te/be,Ne=-Qt/be;((Ut[0]+Ft[0])/2-Y.cx)*ye+((Ut[1]+Ft[1])/2-Y.cz)*Ne<0&&(ye=-ye,Ne=-Ne);const Xi=Ot==null?void 0:Ot.cells.find(mt=>mt!==Y&&!mt.solid),D=yu(Ut),ot=yu(Ft),pt={c:Y,a:Ut,b:Ft,ka:D,kb:ot,nx:ye,nz:Ne,y0:Ge(Xi??Y),nax:0,naz:0,nbx:0,nbz:0};g.has(Y)&&v.push(pt),_(D,ye,Ne),_(ot,ye,Ne)}}const E={x:0,z:0},A=(Y,yt,wt)=>{let Nt=0,Bt=0;const Ut=T.get(Y);for(let Ot=0;Ot<Ut.length;Ot+=2){const Qt=Ut[Ot],te=Ut[Ot+1];Qt*yt+te*wt>.6&&(Nt+=Qt,Bt+=te)}const Ft=Math.hypot(Nt,Bt)||1;E.x=Nt/Ft,E.z=Bt/Ft};for(const Y of v)s()&&(yield),A(Y.ka,Y.nx,Y.nz),Y.nax=E.x,Y.naz=E.z,A(Y.kb,Y.nx,Y.nz),Y.nbx=E.x,Y.nbz=E.z;const b=Ys(),y=Ys(),w=Ys(),P=Ys(),U=Ys(),H=new Map,$=new Map,G=new Map,B=(Y,yt,wt,Nt,Bt,Ut,Ft)=>{Y.put(wt,Nt,Bt),yt.put(Ut.r*Ft,Ut.g*Ft,Ut.b*Ft)},N=new Map;for(const Y of v)(N.get(Y.c.id)??N.set(Y.c.id,[]).get(Y.c.id)).push(Y);const Q=(Y,yt,wt,Nt,Bt,Ut)=>{B(w,P,Y[0],Nt,Y[1],Ut,Bt),U.put(yt,0,wt)},st=(Y,yt,wt,Nt)=>{B(w,P,Y,Qn,yt,Nt,wt),U.put(0,1,0)};for(const Y of i.cells){s()&&(yield);const yt=Ge(Y),wt=l[Y.clearance],Nt=nf(Y.id);if(Y.solid){if((Ke=(Ue=Y.cut)==null?void 0:Ue.open)!=null&&Ke.length){const Ot=b.count;for(const Qt of Y.cut.open){let te=0,be=0;for(const ye of Qt)te+=ye[0],be+=ye[1];te/=Qt.length,be/=Qt.length;for(let ye=0;ye<Qt.length;ye++){const Ne=Qt[ye],Xi=Qt[(ye+1)%Qt.length];B(b,y,te,yt,be,wt,.16),B(b,y,Ne[0],yt,Ne[1],wt,.08),B(b,y,Xi[0],yt,Xi[1],wt,.08)}}G.set(Y.id,{start:Ot,count:b.count-Ot})}const Bt=hl(Y),Ut=Bt.length,Ft=w.count;for(let Ot=0;Ot<Ut;Ot++){const Qt=Bt[Ot],te=Bt[(Ot+1)%Ut];st(Y.cx,Y.cz,.05+.03*Nt,wt),st(Qt[0],Qt[1],.1,wt),st(te[0],te[1],.1,wt)}for(const Ot of N.get(Y.id)??[])Q(Ot.a,Ot.nax,Ot.naz,Ot.y0,.62,wt),Q(Ot.b,Ot.nbx,Ot.nbz,Ot.y0,.62,wt),Q(Ot.b,Ot.nbx,Ot.nbz,Qn,.16,wt),Q(Ot.a,Ot.nax,Ot.naz,Ot.y0,.62,wt),Q(Ot.b,Ot.nbx,Ot.nbz,Qn,.16,wt),Q(Ot.a,Ot.nax,Ot.naz,Qn,.16,wt);$.set(Y.id,{start:Ft,count:w.count-Ft})}else{const Bt=Y.poly.length,Ut=Math.max(.5,1-yv/Math.max(Y.radius,1)),Ft=.2+.1*Nt,Ot=.07+.05*Nt,Qt=b.count;for(let te=0;te<Bt;te++){const be=Y.poly[te],ye=Y.poly[(te+1)%Bt];B(b,y,Y.cx,yt,Y.cz,wt,Ft),B(b,y,Y.cx+(be[0]-Y.cx)*Ut,yt,Y.cz+(be[1]-Y.cz)*Ut,wt,Ot),B(b,y,Y.cx+(ye[0]-Y.cx)*Ut,yt,Y.cz+(ye[1]-Y.cz)*Ut,wt,Ot)}H.set(Y.id,{start:Qt,count:b.count-Qt})}}const Mt=b.take(),Pt=y.take(),Et=Pt.slice(),rt=w.take(),nt=P.take(),Tt=U.take(),_t=nt.slice(),Rt=(Y,yt,wt,Nt,Bt)=>{const Ut=new _e;Ut.setAttribute("position",new Te(Y,3)),Ut.setAttribute("color",new Te(yt,3)),wt?Ut.setAttribute("normal",new Te(wt,3)):Ut.computeVertexNormals();const Ft=new Jt(Ut,Nt);return Ft.renderOrder=Bt,r.add(Ft),Ft},L=new Float32Array(b.count*3);for(let Y=1;Y<L.length;Y+=3)L[Y]=1;const X=Rt(Mt,Pt,L,d("tiles",()=>new ll({vertexColors:!0,side:Ae,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),Zt.TILES),et=w.count?Rt(rt,nt,Tt,d("walls",()=>Tv(new ll({vertexColors:!0,side:Ae,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),t,{minVis:.07,stripes:!0})),Zt.SOLIDS):null,tt=(Y,yt,wt,Nt,{cutaway:Bt=!1,minVis:Ut=.25}={})=>{if(!Y.length)return null;const Ft=new Mo;Ft.setPositions(Y),Ft.setColors(yt);const Ot=d(`line${wt}|${Bt}|${Ut}`,()=>{const te=Ih(new So({vertexColors:!0,linewidth:wt,worldUnits:!1,fog:!0}));return Bt&&Av(te,t,{minVis:Ut}),o.push(te),te}),Qt=new Ol(Ft,Ot);return Qt.renderOrder=Nt,Qt.frustumCulled=!1,r.add(Qt),Qt},dt=(Y,yt,wt,Nt,Bt,Ut,Ft,Ot,Qt)=>{Y.push(wt[0],Bt,wt[1],Nt[0],Ut,Nt[1]),yt.push(Ft,Ot,Qt,Ft,Ot,Qt)},V=Pv(i),zt=new Set(V.map(Y=>Gh(Y))),vt=[],At=[];for(const Y of h.values()){if(s()&&(yield),Y.solid||Y.cells.length<2||Y.cells[0].sector!==Y.cells[1].sector||!g.has(Y.cells[0])||zt.has(Y.key))continue;const yt=l[Y.bandMax],wt=or(Y.bandMax)+.02;dt(vt,At,Y.a,Y.b,wt,wt,yt.r*.9,yt.g*.9,yt.b*.9)}const Ct=[],Vt=[],ft=[],I=[];for(const Y of v){s()&&(yield);const yt=l[Y.c.clearance];dt(Ct,Vt,Y.a,Y.b,Qn+.02,Qn+.02,yt.r*1.7,yt.g*1.7,yt.b*1.7),dt(ft,I,Y.a,Y.b,Y.y0+.03,Y.y0+.03,yt.r*1,yt.g*1,yt.b*1)}const C=[],R=[],F=[],K=[],z=[],it=Fv(i,S,Wv);for(const Y of it.segments){s()&&(yield);const yt=_u(i,Y),wt=or(yt)+.06,Nt=l[yt],Bt=Y.a,Ut=Y.b;dt(F,K,Bt,Ut,wt,wt,Nt.r*1.9,Nt.g*1.9,Nt.b*1.9),dt(C,R,Bt,Ut,wt+qr,wt+qr,Nt.r*1.5,Nt.g*1.5,Nt.b*1.5),z.push({a:Bt,b:Ut,base:wt,cr:Nt.r,cg:Nt.g,cb:Nt.b})}if(tt(vt,At,1.1,Zt.BORDERS),tt(ft,I,1.5,Zt.FOOT),tt(Ct,Vt,2.8,Zt.CREST,{cutaway:!0,minVis:.3}),tt(F,K,3.4,Zt.SECTOR),tt(C,R,2,Zt.SECTOR,{cutaway:!0,minVis:.3}),z.length){const Y=[],yt=[];for(const Bt of z){s()&&(yield);const{a:Ut,b:Ft,base:Ot}=Bt,Qt=Ot+qr,te=(be,ye,Ne)=>{Y.push(be[0],ye,be[1]),yt.push(Bt.cr,Bt.cg,Bt.cb,Ne)};te(Ut,Ot,.34),te(Ft,Ot,.34),te(Ft,Qt,0),te(Ut,Ot,.34),te(Ft,Qt,0),te(Ut,Qt,0)}const wt=new _e;wt.setAttribute("position",new oe(Y,3)),wt.setAttribute("color",new oe(yt,4));const Nt=new Jt(wt,d("curtain",()=>je(new Pe({vertexColors:!0,transparent:!0,blending:He,side:Ae,toneMapped:!1}))));p(Nt.material,Su.curtain),Nt.renderOrder=Zt.CURTAIN,Nt.frustumCulled=!1,r.add(Nt)}{const Y=[];for(const yt of Bv(it.runs)){s()&&(yield);const wt=it.runs[yt.run],Nt=_u(i,wt),Bt=or(Nt)+.06,Ut=yt.kind==="end",Ft=qr+(Ut?.9:.35),Ot=Ut?.4:.22;Y.push({x:yt.p[0],y:Bt+Ft/2,z:yt.p[1],w:Ot,h:Ft,d:Ot,color:l[Nt].getHex(),k:Ut?1.8:1.3}),Ut&&Y.push({x:yt.p[0],y:Bt+Ft+.12,z:yt.p[1],w:.5,h:.5,d:.5,rot:Math.PI/4,color:16777215,k:1.2})}if(Y.length){const yt=new Jt(ua(Y),d("fencePosts",()=>{const wt=je(new Pe({toneMapped:!1,blending:He,transparent:!0}));return wt.vertexColors=!0,wt}));yt.renderOrder=Zt.GATE_LIGHT,yt.frustumCulled=!1,r.add(yt)}}const Z=[],ht=[],St=[],ut=(Y,yt,wt,Nt,Bt,Ut,Ft)=>{Z.push(Y,yt,wt),ht.push(Nt.r,Nt.g,Nt.b,Bt),St.push(Ut,Ft)},k=(Y,yt,wt,Nt,Bt,Ut,Ft)=>{ut(Y-wt,Bt,yt-Nt,Ut,Ft,0,0),ut(Y+wt,Bt,yt-Nt,Ut,Ft,1,0),ut(Y+wt,Bt,yt+Nt,Ut,Ft,1,1),ut(Y-wt,Bt,yt-Nt,Ut,Ft,0,0),ut(Y+wt,Bt,yt+Nt,Ut,Ft,1,1),ut(Y-wt,Bt,yt+Nt,Ut,Ft,0,1)},W=1.7;for(const Y of v){s()&&(yield);const yt=Y.y0+.04,wt=l[Y.c.clearance],Nt=Y.a[0]+Y.nax*W,Bt=Y.a[1]+Y.naz*W,Ut=Y.b[0]+Y.nbx*W,Ft=Y.b[1]+Y.nbz*W;ut(Y.a[0],yt,Y.a[1],wt,.42,.5,.5),ut(Y.b[0],yt,Y.b[1],wt,.42,.5,.5),ut(Ut,yt,Ft,wt,0,.5,.5),ut(Y.a[0],yt,Y.a[1],wt,.42,.5,.5),ut(Ut,yt,Ft,wt,0,.5,.5),ut(Nt,yt,Bt,wt,0,.5,.5)}const q=(Y,yt,wt,Nt)=>k(Y.cx,Y.cz,wt,wt,Ge(Y)+.045,new Wt(yt),Nt),O=kv(i.gates,i.sectorOpenings,it.runs,i.drawsGate);for(const Y of O){if(Y.soft&&!Y.locked)continue;const yt=f(Y.a);k(m.get(Y).mid[0],m.get(Y).mid[1],4.2,4.2,Ge(yt)+.045,new Wt(Y.locked?Se.gateLocked:Se.gateOpen),Y.locked?.6:.38)}for(const Y of i.cells)s()&&(yield),Y.cache&&q(Y,Y.payload?16751162:8256767,Y.payload?5:2.6,Y.payload?.5:.28);const lt=i.beacons??[[i.startCell,Se.ally,0,2.4,.5],[i.pivotCell,10509567,7,2.2,.5],[i.vaultCell,16742938,14,3,.6]];for(const[Y,yt,,wt,Nt]of lt)q(Y,yt,wt*2.6,Nt*.5);{const Y=new _e;Y.setAttribute("position",new oe(Z,3)),Y.setAttribute("color",new oe(ht,4)),Y.setAttribute("uv",new oe(St,2));const yt=new Jt(Y,d("glow",()=>je(new Pe({map:wv(),vertexColors:!0,transparent:!0,blending:He,side:Ae,toneMapped:!1}))));p(yt.material,Su.glow),yt.renderOrder=Zt.GLOW,yt.frustumCulled=!1,r.add(yt)}const gt=Y=>{const{mid:yt,len:wt,ax:Nt,az:Bt}=m.get(Y),Ut=Ge(f(Y.a)),Ft=wt/2,Ot=Math.atan2(-Bt,Nt);return[{x:yt[0]+Nt*Ft,y:Ut+di/2,z:yt[1]+Bt*Ft,w:.34,h:di,d:.34,color:16777215},{x:yt[0]-Nt*Ft,y:Ut+di/2,z:yt[1]-Bt*Ft,w:.34,h:di,d:.34,color:16777215},{x:yt[0],y:Ut+di,z:yt[1],w:wt+.34,h:.26,d:.26,rot:Ot,color:16777215}]},It=(Y,yt)=>je(new Pe({color:new Wt(Y).multiplyScalar(yt),toneMapped:!1,blending:He,transparent:!0})),j=[],xt=[];for(const Y of O)(Y.locked||!Y.soft)&&(Y.locked?xt:j).push(...gt(Y));if(j.length){const Y=new Jt(ua(j),It(Se.gateOpen,.85));Y.material.vertexColors=!0,Y.renderOrder=Zt.GATE_LIGHT,Y.frustumCulled=!1,r.add(Y)}if(xt.length){const Y=new Jt(ua(xt),It(Se.gateLocked,1.7));Y.material.vertexColors=!0,Y.renderOrder=Zt.GATE_LIGHT,Y.frustumCulled=!1,r.add(Y),a.push(yt=>{const wt=.7+.5*Math.sin(yt*3);Y.material.color.set(Se.gateLocked).multiplyScalar(1.7*wt)});for(const yt of O.filter(wt=>wt.locked)){const{mid:wt,len:Nt,ax:Bt,az:Ut}=m.get(yt),Ft=Ge(f(yt.a)),Ot=Nt/2,Qt=[wt[0]-Bt*Ot,Ft,wt[1]-Ut*Ot,wt[0]+Bt*Ot,Ft,wt[1]+Ut*Ot,wt[0]+Bt*Ot,Ft+di,wt[1]+Ut*Ot,wt[0]-Bt*Ot,Ft,wt[1]-Ut*Ot,wt[0]+Bt*Ot,Ft+di,wt[1]+Ut*Ot,wt[0]-Bt*Ot,Ft+di,wt[1]-Ut*Ot],te=new _e;te.setAttribute("position",new oe(Qt,3));const be=je(new Pe({color:Se.gateLocked,opacity:.25,transparent:!0,blending:He,side:Ae,toneMapped:!1})),ye=new Jt(te,be);ye.renderOrder=Zt.CURTAIN,ye.frustumCulled=!1,r.add(ye),a.push(Ne=>{be.opacity=.18+.12*Math.sin(Ne*3)})}}const ct=(Y,yt,wt,Nt)=>{const Bt=new Wt(yt).multiplyScalar(.95),Ut=Ge(Y),Ft=wt>0?new Jt(new Ds(.06,.16,wt,12,1,!0),je(new Pe({color:Bt,transparent:!0,opacity:.32,blending:He,toneMapped:!1,side:Ae}))):null;Ft&&(Ft.position.set(Y.cx,Ut+wt/2,Y.cz),Ft.renderOrder=Zt.BEAM,r.add(Ft));const Ot=new Jt(new on(Nt*.9,Nt,48),je(new Pe({color:Bt,side:Ae,transparent:!0,opacity:.45,blending:He,toneMapped:!1})));Ot.rotation.x=-Math.PI/2,Ot.position.set(Y.cx,Ut+.08,Y.cz),Ot.renderOrder=Zt.BEAM,r.add(Ot),a.push(Qt=>{Ot.scale.setScalar(1+.06*Math.sin(Qt*2+Y.id))})};for(const[Y,yt,wt,Nt]of lt)ct(Y,yt,wt,Nt);const bt=i.cells.filter(Y=>Y.cache);let Dt=null;if(bt.length){Dt=new $x(new Mi(.75),new Pe({toneMapped:!1}),bt.length),Dt.renderOrder=Zt.SOLIDS,Dt.frustumCulled=!1,bt.forEach((Ot,Qt)=>Dt.setColorAt(Qt,new Wt(Ot.payload?16751162:8256767).multiplyScalar(1.25))),r.add(Dt);const Y=new he,yt=new Vi,wt=new J(0,1,0),Nt=new J,Bt=new J,Ut=new Float32Array(bt.length).fill(1);let Ft=0;a.push(Ot=>{const Qt=Math.min(.1,Math.max(0,Ot-Ft));Ft=Ot,bt.forEach((te,be)=>{const ye=!x||x(te.cx,te.cz,"dynamic");Ut[be]=ye?Math.min(1,Ut[be]+Qt*5):Math.max(0,Ut[be]-Qt*5);const Ne=Ut[be]*(te.payload?1.8:.7+Math.min(te.cache,300)/600);Nt.set(te.cx,Ge(te)+1.2+.25*Math.sin(Ot*1.6+te.id),te.cz),yt.setFromAxisAngle(wt,Ot*.8+te.id),Y.compose(Nt,yt,Bt.set(Ne,Ne,Ne)),Dt.setMatrixAt(be,Y)}),Dt.instanceMatrix.needsUpdate=!0})}const{hover:Lt,select:Yt}=e?{hover:null,select:null}:Oh({group:r,lineMats:o}),ue=X.geometry.getAttribute("color"),ge=et==null?void 0:et.geometry.getAttribute("color");function re(Y){for(const yt of i.cells){const wt=Y(yt),Nt=yt.solid?$.get(yt.id):H.get(yt.id),Bt=yt.solid?ge:ue,Ut=yt.solid?_t:Et;for(let Ft=Nt.start*3;Ft<(Nt.start+Nt.count)*3;Ft++)Bt.array[Ft]=Ut[Ft]*wt}for(const yt of i.cells){const wt=G.get(yt.id);if(!wt)continue;const Nt=Y(yt);for(let Bt=wt.start*3;Bt<(wt.start+wt.count)*3;Bt++)ue.array[Bt]=Et[Bt]*Nt}ue.needsUpdate=!0,ge&&(ge.needsUpdate=!0)}return{group:r,hover:Lt,select:Yt,setBrightness:re,lineMats:o,floorMat:M,tiles:X,walls:et,glass:it,gates:O,pickables:Dt,update(Y){for(const yt of a)yt(Y);Lt==null||Lt.tick(Y),Yt==null||Yt.tick(Y)},setFocus(Y,yt){M==null||M.uniforms.uFocus.value.set(Y,yt)},setShows(Y){x=Y},setGlowLevel(Y){c.v=Y;for(const[yt,wt]of u)bu(yt,wt,Y)},resize(Y,yt){for(const wt of o)wt.resolution.set(Y,yt)},dispose(){r.traverse(Y=>{Y.geometry&&Y.geometry.dispose()})}}}const de=(i,t,e,n,s,r={})=>({id:i,group:t,label:e,codes:n,help:s,...r}),Us=Object.freeze([de("moveUp","move","Move up",["KeyW","ArrowUp"],"Away from the camera"),de("moveLeft","move","Move left",["KeyA","ArrowLeft"],"Left of the camera"),de("moveDown","move","Move down",["KeyS","ArrowDown"],"Toward the camera"),de("moveRight","move","Move right",["KeyD","ArrowRight"],"Right of the camera"),de("run","move","Run",["ShiftLeft","ShiftRight"],"Hold to run"),de("stop","move","Stop",["KeyX"],"Cancel the click-to-move order"),de("weapon","skill","Weapon",["KeyF"],"Use the equipped weapon at the cursor"),de("skill1","skill","Skill 1",["KeyQ"],"Skill slot 1, aimed at the cursor"),de("skill2","skill","Skill 2",["KeyE"],"Skill slot 2, aimed at the cursor"),de("skill3","skill","Skill 3",["KeyR"],"Skill slot 3, aimed at the cursor"),de("skill4","skill","Skill 4",["KeyT"],"Skill slot 4, aimed at the cursor"),de("device1","skill","Device 1",["Digit1"],"Place the device in slot 1 at the cursor"),de("device2","skill","Device 2",["Digit2"],"Place the device in slot 2 at the cursor"),de("device3","skill","Device 3",["Digit3"],"Place the device in slot 3 at the cursor"),de("directive1","skill","Order 1",["Digit4"],"Companion directive 1, aimed at the cursor"),de("directive2","skill","Order 2",["Digit5"],"Companion directive 2, aimed at the cursor"),de("mode","skill","Mode",["KeyM"],"Cycle your equipped modes"),de("ping","scan","Scan ping",["KeyC"],"Send a scan wave from your position"),de("possess","companion","Possess",["Tab"],"Swap control to the other actor"),de("companionHold","companion","Follow / hold",["KeyG"],"Companion follows you, or holds where it stands"),de("camLeft","camera","Rotate left",["BracketLeft"],"Turn the view"),de("camRight","camera","Rotate right",["BracketRight"],"Turn the view"),de("camTiltUp","camera","Tilt up",["PageUp","Equal"],"Look more from above"),de("camTiltDown","camera","Tilt down",["PageDown","Minus"],"Look more along the ground"),de("camBehind","camera","Behind heading",["KeyV"],"The camera sits behind the way you face"),de("camReset","camera","Reset view",["Home"],"Back to the home distance and tilt"),de("overview","camera","Overview",["KeyO"],"Switch between chase and overview"),de("help","system","Help",["KeyH","Slash"],"Open this guide (the game pauses)"),de("settings","system","Settings",["Escape"],"Open the settings (the game pauses)",{fixed:!0}),de("glow","system","Glow level",["KeyB"],"Cycle the glow"),de("newSeed","system","New seed",["KeyN"],"Reload with a new world")]);Object.freeze(Us.map(i=>i.id));const kl=new Map(Us.map(i=>[i.id,i])),Eo=i=>kl.get(i)??null;function Bl(i){const t={};if(!i||typeof i!="object")return t;for(const[e,n]of Object.entries(i)){const s=kl.get(e);if(!s||s.fixed||!Array.isArray(n))continue;const r=n.filter(o=>typeof o=="string"&&/^[A-Za-z0-9]{1,24}$/.test(o));r.length&&(t[e]=[...new Set(r)])}return t}function Vh(i=null){const t=i&&typeof i=="object"?i:{};return Object.fromEntries(Us.map(e=>[e.id,Array.isArray(t[e.id])&&t[e.id].length&&!e.fixed?t[e.id]:e.codes]))}const As=(i,t)=>Vh(t)[i]??[];function Gl(i,t=null){const e=Vh(t);for(const n of Us)if(e[n.id].includes(i))return n.id;return null}const $v=i=>i.key==="?"?"Slash":i.code,ps=(i,t,e)=>As(t,e).some(n=>i.has(n));function Wh(i,t){return{sx:(ps(i,"moveRight",t)?1:0)-(ps(i,"moveLeft",t)?1:0),sy:(ps(i,"moveUp",t)?1:0)-(ps(i,"moveDown",t)?1:0)}}const Tu={Escape:"Esc",Slash:"?",BracketLeft:"[",BracketRight:"]",PageUp:"PgUp",PageDown:"PgDn",Equal:"=",Minus:"-",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Space:"Space",Comma:",",Period:"."};function fl(i){return Tu[i]?Tu[i]:/^Key[A-Z]$/.test(i)?i.slice(3):/^Digit\d$/.test(i)?i.slice(5):i}function my(i,t,e=99){const n=[];for(const s of As(i,t)){const r=fl(s);n.includes(r)||n.push(r)}return n.slice(0,e).join(" / ")}const Yv=["ControlLeft","ControlRight","AltLeft","AltRight","MetaLeft","MetaRight","OSLeft","OSRight"],jv=["F5","F11","F12"],Kv=Us.flatMap(i=>i.fixed?i.codes:[]);function Zv(i){if(typeof i!="string"||!/^[A-Za-z0-9]{1,24}$/.test(i)||i==="Unidentified")return"That key has no fixed code";const t=Us.find(e=>e.fixed&&e.codes.includes(i));return t?`${fl(i)} is fixed to ${t.label}`:Yv.includes(i)?"Ctrl, Alt and Meta are not bindable":jv.includes(i)?`${fl(i)} belongs to the browser`:null}const Jv=(i,t)=>i.length===t.length&&i.every((e,n)=>e===t[n]),$r=(i,t)=>Jv(t,Eo(i).codes)?null:t,gy=(i,t=null)=>Array.isArray(t==null?void 0:t[i]);function xy(i=null,t=null){const e=i&&typeof i=="object"?i:{},n=t?[t]:Object.keys(e);return Object.fromEntries(n.filter(s=>Array.isArray(e[s])).map(s=>[s,null]))}function Qv(i,t,e,n){const s=Eo(t);if(!s||s.fixed)return{kind:"refused",reason:"That key cannot be changed"};const r=As(t,i);if(!Number.isInteger(e)||e<0||e>=r.length)return{kind:"refused",reason:"No such key"};const o=Zv(n);if(o)return{kind:"refused",reason:o};const a=r[e];if(n===a)return{kind:"set",changes:{}};const l=r.map((f,g)=>g===e?n:f),c=Gl(n,i);if(c===null)return{kind:"set",changes:{[t]:$r(t,l)}};if(c===t){const f=r.indexOf(n);return{kind:"set",changes:{[t]:$r(t,r.map((g,x)=>x===e?n:x===f?a:g))}}}const u=As(c,i),p=u.indexOf(n),d=u.map((f,g)=>g===p?a:f);return{kind:"conflict",owner:c,ownerIndex:p,swap:{[t]:$r(t,l),[c]:$r(c,d)}}}function vy(i,t,e=null){const n={state:null,apply:null,handled:!1};if(t.type==="start"){const r=Eo(t.id),o=r&&!r.fixed?As(t.id,e).length:0;return!Number.isInteger(t.index)||t.index<0||t.index>=o?n:{state:{phase:"listen",id:t.id,index:t.index,note:""},apply:null,handled:!0}}if(t.type==="cancel")return{state:null,apply:null,handled:i!==null};if(t.type==="swap")return(i==null?void 0:i.phase)==="conflict"?{state:null,apply:i.swap,handled:!0}:{state:i,apply:null,handled:!1};if(t.type!=="key"||!i)return n;if(Kv.includes(t.code))return{state:null,apply:null,handled:!0};if(t.repeat||i.phase==="conflict")return{state:i,apply:null,handled:!0};if(t.mods)return{state:{...i,note:"Ctrl, Alt and Meta are not bindable"},apply:null,handled:!0};const s=Qv(e,i.id,i.index,t.code);return s.kind==="refused"?{state:{...i,note:s.reason},apply:null,handled:!0}:s.kind==="set"?{state:null,apply:Object.keys(s.changes).length?s.changes:null,handled:!0}:{state:{phase:"conflict",id:i.id,index:i.index,code:t.code,owner:s.owner,ownerIndex:s.ownerIndex,swap:s.swap,note:""},apply:null,handled:!0}}function t_(i=()=>null){const t=new Map;return{bind(e,n){if(!kl.has(e))throw new Error(`unknown action ${e}`);const s=t.get(e)??new Set;return s.add(n),t.set(e,s),()=>s.delete(n)},handle(e){const n=Gl($v(e),i()),s=n&&t.get(n);if(!s||!s.size)return!1;for(const r of[...s])r(n,e);return!0},has(e){var n;return(((n=t.get(e))==null?void 0:n.size)??0)>0}}}const Hl="boundless.settings.v1",_y=Object.freeze({controls:"Controls",display:"Display",dev:"Dev"});function e_(){const i=(t,e)=>({key:t,group:"dev",type:"range",def:_i[t].value,min:_i[t].min,max:_i[t].max,step:.5,digits:1,unit:" u",label:e,hint:_i[t].doc});return[i("navRadius","Stream: NAV radius"),i("renderRadius","Stream: mesh radius"),i("thickness","Stream: hysteresis band"),{...i("aheadBias","Stream: look-ahead"),off:0}]}function n_(){const i={poolSize:"Load: workers",batch:"Load: sectors per job",inflight:"Load: jobs in flight",adoptMs:"Load: adopt budget",adoptMax:"Load: sectors adopted a frame"};return Object.keys(dn).map(t=>{const e=dn[t],n=[e.value,e.min,e.max].every(Number.isInteger);return{key:t,group:"dev",type:"range",def:e.value,min:e.min,max:e.max,step:n?1:.5,digits:n?0:1,unit:` ${e.unit}`,label:i[t],hint:e.doc,...t==="poolSize"?{off:0}:{}}})}const Vl=Object.freeze([{key:"invertYaw",group:"controls",type:"toggle",def:!0,label:"Invert horizontal rotation",hint:"Middle-drag left / right"},{key:"invertPitch",group:"controls",type:"toggle",def:!0,label:"Invert tilt",hint:"Middle-drag up / down"},{key:"sensitivity",group:"controls",type:"range",def:1,min:.3,max:2.5,step:.05,digits:2,unit:"x",label:"Rotation sensitivity"},{key:"touchScale",group:"controls",type:"range",def:1,min:.8,max:1.4,step:.05,digits:2,unit:"x",label:"Touch: control size",hint:"Buttons, stick base, rocker and pad; they shrink together where the bottom row would overlap"},{key:"touchOpacity",group:"controls",type:"range",def:1,min:.3,max:1,step:.05,digits:2,label:"Touch: opacity",hint:"How solid the touch controls look"},{key:"touchLeft",group:"controls",type:"toggle",def:!1,label:"Touch: left-handed",hint:"The move zone on the right; the cluster, rocker and pad on the left"},{key:"touchLook",group:"controls",type:"range",def:1,min:.3,max:2.5,step:.05,digits:2,unit:"x",label:"Touch: look sensitivity",hint:"One-finger look drag, and the camera pad turn and tilt"},{key:"touchRocker",group:"controls",type:"toggle",def:!0,label:"Touch: zoom rocker",hint:"A slim zoom strip above the cluster: drag along it, or hold its ends"},{key:"touchPad",group:"controls",type:"toggle",def:!1,label:"Touch: camera pad",hint:"A 4-way pad above the cluster: left and right turn the view, up and down tilt it"},{key:"glow",group:"display",type:"range",def:.38,min:0,max:1,step:.02,digits:2,off:0,label:"Glow"},{key:"cutaway",group:"display",type:"toggle",def:!0,label:"Cut-away near actors",hint:"See through walls around you"},{key:"sightRadius",group:"dev",type:"range",def:36,min:8,max:90,step:1,digits:0,unit:" u",label:"Fog lit range",hint:"Flood distance plus line of sight; the default camera shows about 27 units"},{key:"sightSoft",group:"dev",type:"range",def:.25,min:.05,max:.7,step:.01,digits:2,label:"Fog edge softness",hint:"Share of the range that ramps lit to ghost"},{key:"ghostFade",group:"dev",type:"range",def:1.2,min:.2,max:8,step:.1,digits:1,unit:" s",label:"Ghost fade time",hint:"Lit to ghost after sight is lost"},{key:"revealRate",group:"dev",type:"range",def:6,min:1,max:30,step:.5,digits:1,unit:"/s",label:"Reveal speed",hint:"How fast a texel brightens into sight"},{key:"revealStep",group:"dev",type:"range",def:.5,min:.1,max:3,step:.05,digits:2,unit:" u",label:"Reveal step",hint:"Distance moved per sight re-solve (sub-cell exposure)"},{key:"shroud",group:"dev",type:"range",def:1,min:0,max:1,step:.05,digits:2,label:"Shroud darkness",hint:"1 hides unseen ground, 0 shows it"},{key:"atmosphere",group:"dev",type:"range",def:1,min:0,max:2,step:.05,digits:2,off:0,label:"Atmosphere density",hint:"Depth haze and drifting motes"},{key:"bloomRadius",group:"dev",type:"range",def:.32,min:0,max:1,step:.02,digits:2,label:"Glow radius"},{key:"bloomThreshold",group:"dev",type:"range",def:.85,min:0,max:1.5,step:.01,digits:2,label:"Glow threshold"},{key:"pathDensity",group:"dev",type:"range",def:1.5,min:.3,max:3,step:.05,digits:2,unit:"/u",label:"Path chevron density",hint:"Chevrons per world unit along a route (uniform pitch)"},{key:"pathSize",group:"dev",type:"range",def:.8,min:.3,max:1.6,step:.02,digits:2,unit:" u",label:"Path chevron size",hint:"Arm length of one chevron"},{key:"pathGlow",group:"dev",type:"range",def:.95,min:.1,max:2,step:.05,digits:2,label:"Path chevron glow",hint:"Brightness; the default stays under the bloom threshold"},{key:"pathAngle",group:"dev",type:"range",def:124,min:70,max:170,step:1,digits:0,unit:" deg",label:"Path chevron angle",hint:"Total opening of the chevron: larger is flatter and less acute"},{key:"pingCooldown",group:"dev",type:"range",def:0,min:0,max:30,step:.1,digits:1,unit:" s",off:0,label:"Ping cooldown",hint:"Seconds of world time between scan pings; off is unlimited (waves may overlap freely)"},{key:"pingMaxWaves",group:"dev",type:"range",def:16,min:1,max:40,step:1,digits:0,label:"Max concurrent waves",hint:"A ping is refused while this many waves are still on the board; the front budget is shared between them"},{key:"scanBand",group:"dev",type:"range",def:3.2,min:.5,max:12,step:.1,digits:1,unit:" u",label:"Scan front width",hint:"Width of the luminous band behind the edge of a scan wave"},{key:"camDist",group:"dev",type:"range",def:19,min:9,max:70,step:1,digits:0,unit:" u",label:"Camera distance",hint:"Chase view home distance (wheel still zooms)"},{key:"camPitch",group:"dev",type:"range",def:58,min:35,max:88,step:1,digits:0,unit:" deg",label:"Camera pitch",hint:"Chase view home tilt"},{key:"fov",group:"dev",type:"range",def:50,min:5,max:90,step:1,digits:0,unit:" deg",label:"Field of view",hint:"The camera dollies back as it narrows, so the framing holds (5 is a long lens)"},...e_(),...n_()]),i_=Vl.filter(i=>i.type==="range"),s_=Vl.filter(i=>i.type==="toggle"),Mn=Object.freeze(Object.fromEntries(Vl.map(i=>[i.key,i.def]))),Yr=Object.freeze(Object.fromEntries(i_.map(i=>[i.key,[i.min,i.max,i.step]]))),r_=s_.map(i=>i.key),o_=(i,t,e)=>Math.min(e,Math.max(t,i));function yy(i,t){return i.type==="toggle"?t?"on":"off":i.off!==void 0&&t<=i.off+1e-9?"off":`${Number(t).toFixed(i.digits??0)}${i.unit??""}`}function hr(i){const t={...Mn};if(!i||typeof i!="object")return t;for(const e of r_)typeof i[e]=="boolean"&&(t[e]=i[e]);for(const e of Object.keys(Yr)){const n=Number(i[e]);i[e]!==null&&i[e]!==""&&Number.isFinite(n)&&(t[e]=o_(Yr[e][2]===1?Math.round(n):n,Yr[e][0],Yr[e][1]))}return t}function a_(i=globalThis.localStorage){try{const t=i==null?void 0:i.getItem(Hl);return hr(t?JSON.parse(t):null)}catch{return{...Mn}}}function l_(i=globalThis.localStorage){var t;try{const e=i==null?void 0:i.getItem(Hl);return Bl(e?(t=JSON.parse(e))==null?void 0:t.keys:null)}catch{return{}}}function c_(i,t=globalThis.localStorage,e=null){try{const n=Bl(e);return t==null||t.setItem(Hl,JSON.stringify(Object.keys(n).length?{...hr(i),keys:n}:hr(i))),!0}catch{return!1}}function dl(i,t,e){const n=i.sensitivity;return{dyaw:t*.006*n*(i.invertYaw?-1:1),dpitch:e*.004*n*(i.invertPitch?-1:1)}}function u_(i=globalThis.localStorage){let t=a_(i),e=l_(i);const n=new Set,s=()=>{for(const o of n)o(t)},r=()=>c_(t,i,e);return{get:()=>t,keys:()=>e,set(o){return t=hr({...t,...o}),r(),s(),t},setKeys(o){const a={...e};for(const[l,c]of Object.entries(o??{}))c===null?delete a[l]:a[l]=c;return e=Bl(a),r(),s(),e},reset(o){const a=o===void 0?null:[].concat(o);return t=a?hr({...t,...Object.fromEntries(a.filter(l=>l in Mn).map(l=>[l,Mn[l]]))}):{...Mn},a||(e={}),r(),s(),t},subscribe(o){return n.add(o),o(t),()=>n.delete(o)}}}const Wl=Object.freeze({slop:10,longS:.45,doubleS:.32,doubleDist:36,pinch:.06,twist:.12,pan:14,pressSlop:24}),da=Math.PI*2,Xh=i=>((i+Math.PI)%da+da)%da-Math.PI,pl=(i,t,e,n)=>Math.hypot(e-i,n-t);function Au(i,t){return{d:Math.hypot(t.x-i.x,t.y-i.y),ang:Math.atan2(t.y-i.y,t.x-i.x),mx:(i.x+t.x)/2,my:(i.y+t.y)/2}}function h_(i,t,e=Wl){const n={zoom:i.d>0&&t.d>0?Math.abs(Math.log(t.d/i.d))/e.pinch:0,twist:Math.abs(Xh(t.ang-i.ang))/e.twist,horizontal:Math.abs(t.mx-i.mx)/e.pan,vertical:Math.abs(t.my-i.my)/e.pan};let s=null,r=0;for(const o of Object.keys(n))n[o]>r&&(r=n[o],s=o);return r>=1?s:null}const f_=Object.freeze({zoom:"zoom",twist:"rotate",horizontal:"rotate",vertical:"tilt"});function d_(i,t,e,n){const s={zoom:1,yaw:0,pitch:0};if(e==="zoom")i.d>0&&t.d>0&&(s.zoom=i.d/t.d);else if(e==="rotate"){const r=n.invertYaw?-1:1;s.yaw=Xh(t.ang-i.ang)*(n.sensitivity??1)*r+dl(n,t.mx-i.mx,0).dyaw}else e==="tilt"&&(s.pitch=dl(n,0,t.my-i.my).dpitch);return s}function p_(i=Wl){const t=new Map;let e=null;const n=()=>{for(const s of t.values())if(s.peek)return!0;return!1};return{down(s,r,o,a){if(t.set(s,{x0:r,y0:o,x:r,y:o,t0:a,moved:!1,multi:!1,peek:!1}),t.size>1)for(const l of t.values())l.multi=!0;return[]},move(s,r,o){const a=t.get(s);return a?(a.x=r,a.y=o,!a.moved&&pl(a.x0,a.y0,r,o)>i.slop&&(a.moved=!0),a.moved&&a.peek?(a.peek=!1,[{type:"peek-end",x:r,y:o,swallow:!1}]):[]):[]},tick(s){const r=[];for(const o of t.values())!o.moved&&!o.multi&&!o.peek&&s-o.t0>=i.longS&&(o.peek=!0,r.push({type:"peek",x:o.x,y:o.y}));return r},up(s,r,o,a){const l=t.get(s);if(!l)return[];t.delete(s),r!==void 0&&(l.x=r,l.y=o);const c=a-l.t0>=i.longS;if(l.peek&&c)return[{type:"peek-end",x:l.x,y:l.y,swallow:!0}];const u=l.peek?[{type:"peek-end",x:l.x,y:l.y,swallow:!1}]:[];return l.moved||l.multi?u:c?[{type:"peek",x:l.x,y:l.y},{type:"peek-end",x:l.x,y:l.y,swallow:!0}]:e&&a-e.t<=i.doubleS&&pl(e.x,e.y,l.x,l.y)<=i.doubleDist?(e=null,[...u,{type:"double",x:l.x,y:l.y,swallow:!0}]):(e={x:l.x,y:l.y,t:a},[...u,{type:"tap",x:l.x,y:l.y}])},cancel(s){const r=t.get(s);return r?(t.delete(s),r.peek?[{type:"peek-end",x:r.x,y:r.y,swallow:!1}]:[]):[]},get active(){return t.size},get peeking(){return n()}}}function My(i=Wl){let t=null;return{down(e,n,s,r){return t={id:e,x0:n,y0:s,t0:r,held:!1,cancelled:!1},!0},move(e,n,s){return!t||t.id!==e||t.cancelled?[]:pl(t.x0,t.y0,n,s)<=i.pressSlop?[]:(t.cancelled=!0,t.held?[{type:"end"}]:[])},tick(e){return!t||t.held||t.cancelled||e-t.t0<i.longS?[]:(t.held=!0,[{type:"hold"}])},up(e,n){if(!t||t.id!==e)return[];const s=t;return t=null,s.cancelled?s.held?[{type:"end"}]:[]:(n===void 0?s.held:n-s.t0>=i.longS)?s.held?[{type:"end"}]:[]:s.held?[{type:"end"},{type:"fire"}]:[{type:"fire"}]},cancel(e){if(!t||t.id!==e)return[];const n=t;return t=null,n.held?[{type:"end"}]:[]},get pressing(){return t?t.id:null}}}const Be=Math.PI/180,Ce={overview:{pitch:72,dist:150,fov:42,minD:28,maxD:600,near:1,far:1400},chase:{pitch:58,dist:19,fov:50,minD:9,maxD:70,near:.5,far:600,lookHeight:1},pitchMin:35,pitchMax:88,yawRate:1.9,pitchRate:38,ease:9,followEase:7,fovMin:5,maxPhys:1500};class m_{constructor(t,e,n,{embedded:s=!1,mode:r="overview"}={}){this.camera=t,this.dom=e,this.bounds=n,this.embedded=s,this.mode=r,this.target=new J,this.goal=new J,this.yaw=this.yawGoal=0,this.pitch=this.pitchGoal=72*Be,this.dist=this.distGoal=150,this.followHeading=!1,this.heading=0,this.keys=new Set,this.getKeys=()=>null,this.settings={...Mn},this.plane=new xi(new J(0,1,0),0),this.ray=new lu,this.drag=null,this.lastMid=0,this.onChange=null,this.analog={x:0,y:0,mag:0,run:!1},this.claimed=new Set,this.touches=new Map,this.pinch=null,this._off=[],this._bind(),this.setMode(r,{keepTarget:!1})}get P(){if(this.mode!=="chase")return Ce[this.mode];const t=this.settings,e=this._chase;return(!e||e.dist!==t.camDist||e.pitch!==t.camPitch)&&(this._chase={...Ce.chase,dist:t.camDist,pitch:t.camPitch}),this._chase}get fovDeg(){return this.mode==="chase"?this.settings.fov:Ce[this.mode].fov}get dolly(){const t=this.mode==="chase"?Mn.fov:Ce[this.mode].fov,e=Jn.clamp(this.fovDeg,Ce.fovMin,179);return Math.tan(t*Be/2)/Math.tan(e*Be/2)}get physDist(){return Math.min(this.dist*this.dolly,Ce.maxPhys)}get yawDeg(){return this.yaw/Be}get pitchDeg(){return this.pitch/Be}setMode(t,{keepTarget:e=!0}={}){this.mode=t;const n=Ce[t];this.pitch=this.pitchGoal=n.pitch*Be,this.dist=this.distGoal=n.dist,this.camera.fov=t==="chase"?this.settings.fov:n.fov,this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),e||this.target.copy(this.goal),this.apply(),this._changed()}_changed(){var t;(t=this.onChange)==null||t.call(this,this)}bindKeys(t){this.getKeys=t}applySettings(t){const e=this.settings;this.settings={...this.settings,...t},this.mode==="chase"&&(this.settings.camDist!==e.camDist&&(this.distGoal=Jn.clamp(this.settings.camDist,this.P.minD,this.P.maxD)),this.settings.camPitch!==e.camPitch&&(this.pitchGoal=this.settings.camPitch*Be)),this.apply()}rotate(t){this.yawGoal+=t,this._changed()}setYawDeg(t){this.yawGoal=t*Be,this._changed()}setPitchDeg(t){this.pitchGoal=Jn.clamp(t,Ce.pitchMin,Ce.pitchMax)*Be,this._changed()}tilt(t){this.setPitchDeg(this.pitchGoal/Be+t)}zoomBy(t){this.distGoal=Jn.clamp(this.distGoal*t,this.P.minD,this.P.maxD),this._changed()}northUp(){this.yawGoal=Math.round(this.yawGoal/(2*Math.PI))*2*Math.PI,this._changed()}reset(){this.northUp(),this.pitchGoal=this.P.pitch*Be,this.distGoal=this.P.dist,this.followHeading=!1,this._changed()}forward(t=new Kt){return t.set(-Math.sin(this.yaw),-Math.cos(this.yaw))}right(t=new Kt){return t.set(Math.cos(this.yaw),-Math.sin(this.yaw))}toWorldAxis(t,e,n={x:0,z:0}){const s=Math.sin(this.yaw),r=Math.cos(this.yaw);return n.x=t*r-e*s,n.z=-t*s-e*r,n}groundAt(t,e,n=new J){this.ray=this.ray??new lu;const s=this.dom.getBoundingClientRect(),r=new Kt((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1);return this.ray.setFromCamera(r,this.camera),this.ray.ray.intersectPlane(this.plane,n)?n:null}rayAt(t,e){const n=this.dom.getBoundingClientRect(),s=new Kt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);return this.ray.setFromCamera(s,this.camera),this.ray.ray}_on(t,e,n,s){t.addEventListener(e,n,s),this._off.push(()=>t.removeEventListener(e,n,s))}_bind(){const t=this.dom,e=this.embedded?t:window,n=s=>this.embedded?!0:s.target===document.body;this._on(e,"keydown",s=>{var o;if(!n(s)||s.ctrlKey||s.metaKey||s.altKey)return;this.keys.add(s.code);const r=Gl(s.code,this.getKeys());r==="camReset"&&this.reset(),r==="camBehind"&&this.mode==="chase"&&(this.followHeading=!this.followHeading,this._changed()),this.embedded&&["move","camera"].includes((o=Eo(r))==null?void 0:o.group)&&s.preventDefault()}),this._on(e,"keyup",s=>this.keys.delete(s.code)),this._on(window,"blur",()=>this.keys.clear()),this._on(t,"blur",()=>this.keys.clear()),this._on(t,"wheel",s=>{if(this.embedded&&!s.ctrlKey&&document.activeElement!==t)return;if(s.preventDefault(),s.shiftKey){this.tilt(-Math.sign(s.deltaY)*3);return}const r=Math.exp(s.deltaY*.0012);if(this.mode==="overview"){const o=this.groundAt(s.clientX,s.clientY);this.dist=this.distGoal=Jn.clamp(this.distGoal*r,this.P.minD,this.P.maxD),this.apply();const a=this.groundAt(s.clientX,s.clientY);o&&a&&(this.goal.add(o.sub(a)),this._clamp(this.goal),this.target.copy(this.goal),this.apply()),this._changed()}else this.zoomBy(r)},{passive:!1}),this._on(t,"pointerdown",s=>{if(s.button!==1)return;s.preventDefault(),t.setPointerCapture(s.pointerId);const r=performance.now();if(r-this.lastMid<350){this.reset(),this.lastMid=0;return}this.lastMid=r,this.drag={x:s.clientX,y:s.clientY,pan:s.shiftKey&&this.mode==="overview",last:this.groundAt(s.clientX,s.clientY)}}),this._on(t,"pointermove",s=>{const r=this.drag;if(!r)return;if(r.pan){const u=this.groundAt(s.clientX,s.clientY);if(!u||!r.last)return;this.goal.add(r.last.clone().sub(u)),this._clamp(this.goal),this.target.copy(this.goal),this.apply(),r.last=this.groundAt(s.clientX,s.clientY);return}const o=s.clientX-r.x,a=s.clientY-r.y;r.x=s.clientX,r.y=s.clientY;const{dyaw:l,dpitch:c}=dl(this.settings,o,a);this.yawGoal+=l,this.pitchGoal=Jn.clamp(this.pitchGoal+c,Ce.pitchMin*Be,Ce.pitchMax*Be),this._changed()}),this._on(t,"pointerup",()=>{this.drag=null}),this._on(t,"auxclick",s=>s.preventDefault()),this._on(t,"pointerdown",s=>this._touchDown(s)),this._on(t,"pointermove",s=>this._touchMove(s)),this._on(t,"pointerup",s=>this._touchUp(s)),this._on(t,"pointercancel",s=>this._touchUp(s))}claim(t){this.claimed.add(t),this.touches.delete(t),this.pinch&&(t===this.pinch.a||t===this.pinch.b)&&(this.pinch=null)}release(t){this.claimed.delete(t)}setAnalog(t=0,e=0,n=!1){const s=Math.hypot(t,e),r=s>1?1/s:1;this.analog={x:t*r,y:e*r,mag:Math.min(1,s),run:!!n&&s>0}}_touchDown(t){if(!(t.pointerType!=="touch"||this.claimed.has(t.pointerId))&&(this.touches.set(t.pointerId,{x:t.clientX,y:t.clientY}),!this.pinch&&this.touches.size>=2)){const[e,n]=[...this.touches.keys()],s=Au(this.touches.get(e),this.touches.get(n));this.pinch={a:e,b:n,start:s,prev:s,mode:null}}}_touchMove(t){if(t.pointerType!=="touch")return;const e=this.touches.get(t.pointerId);if(!e)return;e.x=t.clientX,e.y=t.clientY;const n=this.pinch;if(!n||t.pointerId!==n.a&&t.pointerId!==n.b)return;const s=Au(this.touches.get(n.a),this.touches.get(n.b));if(!n.mode){const o=h_(n.start,s);if(!o)return;n.mode=f_[o]}const r=d_(n.prev,s,n.mode,this.settings);n.prev=s,r.zoom!==1&&this.zoomBy(r.zoom),r.yaw&&this.rotate(r.yaw),r.pitch&&this.tilt(r.pitch/Be)}_touchUp(t){t.pointerType==="touch"&&(this.touches.delete(t.pointerId),this.pinch&&(t.pointerId===this.pinch.a||t.pointerId===this.pinch.b)&&(this.pinch=null))}dispose(){for(const t of this._off)t();this._off=[],this.keys.clear()}_clamp(t){const e=this.bounds,n=14;t.x=Jn.clamp(t.x,e.x0-n,e.x1+n),t.z=Jn.clamp(t.z,e.z0-n,e.z1+n)}focus(t,e,n){this.goal.set(t,0,e),this._clamp(this.goal),this.target.copy(this.goal),n&&(this.dist=this.distGoal=n),this.apply()}follow(t,e,n){this.goal.set(t,0,e),this.heading=n}update(t){const e=this.keys,n=this.getKeys(),s=a=>ps(e,a,n);let r=!1;if(s("camLeft")&&(this.yawGoal-=Ce.yawRate*t,r=!0),s("camRight")&&(this.yawGoal+=Ce.yawRate*t,r=!0),s("camTiltUp")&&(this.pitchGoal=Math.min(Ce.pitchMax*Be,this.pitchGoal+Ce.pitchRate*Be*t),r=!0),s("camTiltDown")&&(this.pitchGoal=Math.max(Ce.pitchMin*Be,this.pitchGoal-Ce.pitchRate*Be*t),r=!0),r&&this._changed(),this.mode==="overview"){const{sx:a,sy:l}=Wh(e,n),c=this.analog,u=a+c.x,p=l+c.y;if(u||p){const d=Math.hypot(u,p),f=this.dist*.9*(s("run")||c.run?2:1)*Math.min(1,d),g=this.toWorldAxis(u/d,p/d);this.goal.x+=g.x*f*t,this.goal.z+=g.z*f*t,this._clamp(this.goal)}this.target.copy(this.goal)}else{if(this.followHeading){let a=this.heading+Math.PI;a+=Math.round((this.yawGoal-a)/(2*Math.PI))*2*Math.PI,this.yawGoal+=(a-this.yawGoal)*(1-Math.exp(-t*2.2))}this.target.lerp(this.goal,1-Math.exp(-t*Ce.followEase))}const o=1-Math.exp(-t*Ce.ease);this.yaw+=(this.yawGoal-this.yaw)*o,this.pitch+=(this.pitchGoal-this.pitch)*o,this.dist+=(this.distGoal-this.dist)*o,this.apply()}apply(){const t=this.physDist,e=Ce[this.mode],n=Math.max(1,t/Math.max(this.dist,1e-6)),s=this.fovDeg,r=e.near*n,o=e.far+t;(this.camera.fov!==s||this.camera.near!==r||this.camera.far!==o)&&(this.camera.fov=s,this.camera.near=r,this.camera.far=o,this.camera.updateProjectionMatrix());const a=Math.cos(this.pitch),l=Math.sin(this.pitch),c=this.mode==="chase"?Ce.chase.lookHeight:0;this.camera.position.set(this.target.x+Math.sin(this.yaw)*a*t,c+l*t,this.target.z+Math.cos(this.yaw)*a*t),this.camera.lookAt(this.target.x,c,this.target.z),this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert()}}function g_(i){i.fog=new zl(Se.background,1e5,100001);const t=new Qx(13626111,1714746,Math.PI*1),e=new ru(10476799,1.5);e.position.set(-.5,.8,.35);const n=new ru(16751200,.5);n.position.set(.6,.35,-.7),i.add(t,e,n);const s=520,r=new Float32Array(s*4);for(let u=0;u<s;u++)r[u*4]=Math.random(),r[u*4+1]=Math.random(),r[u*4+2]=Math.random(),r[u*4+3]=Math.random();const o=new _e;o.setAttribute("position",new Te(new Float32Array(s*3),3)),o.setAttribute("aSeed",new Te(r,4));const a=je(new De({transparent:!0,blending:He,depthTest:!0,depthWrite:!1,uniforms:{uTime:{value:0},uCenter:{value:new J},uBox:{value:new J(70,14,70)},uScale:{value:400},uFade:{value:1}},vertexShader:`
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
      }`})),l=new jx(o,a);l.frustumCulled=!1,l.renderOrder=Zt.MOTES,i.add(l);let c=1;return{motes:l,setDensity(u){c=u,a.uniforms.uFade.value=Math.min(1,u)},get density(){return c},update(u,p,d,f){const g=p.mode==="chase";if(l.visible=g&&c>.001,g){const x=p.physDist;i.fog.near=x*.95,i.fog.far=c>.001?x+34/c:1e5,c<=.001&&(i.fog.near=99999),a.uniforms.uTime.value=d,a.uniforms.uCenter.value.set(p.target.x,0,p.target.z),a.uniforms.uScale.value=f/(2*Math.tan(u.fov*Math.PI/360))}else i.fog.near=1e5,i.fog.far=100001}}}const jr=700,Ru=.7,x_=2.4,v_=1.1,__=1.4,y_=`
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
`,M_=`
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
`;function S_(){const i=new Ph,t=[],e=[];for(const n of[-1,1]){const s=t.length/3;t.push(n,0,0,n,0,1,n,1,0,n,1,1),e.push(s,s+1,s+2,s+2,s+1,s+3)}return i.setAttribute("position",new Te(new Float32Array(t.length),3)),i.setAttribute("aGlyph",new Te(new Float32Array(t),3)),i.setIndex(e),i}const Kr=Object.freeze({density:1.5,size:.8,glow:.95,angle:124});function qh({parent:i,color:t=Se.ally,behind:e=0}={}){const n={density:Kr.density,size:Kr.size,glow:Kr.glow,angle:Kr.angle},s=S_();s.instanceCount=0;const r=je(new De({uniforms:{uPhase:{value:0},uPitch:{value:1},uSize:{value:.7},uAngle:{value:2.1},uThick:{value:.14},uY:{value:.12},uHead:{value:0},uTotal:{value:0},uBehind:{value:e},uFadeIn:{value:v_},uFadeEnd:{value:__},uColor:{value:new Wt(t)},uGlow:{value:n.glow}},vertexShader:y_,fragmentShader:M_,blending:He,side:Ae,toneMapped:!1})),o=new Jt(s,r);o.frustumCulled=!1,o.renderOrder=Zt.MARKERS,o.visible=!1,i==null||i.add(o);const a=new rr(new Float32Array(jr*4),4),l=new rr(new Float32Array(jr*4),4),c=new rr(new Float32Array(jr),1);for(const T of[a,l,c])T.setUsage(rl);s.setAttribute("iP",a),s.setAttribute("iT",l),s.setAttribute("iA",c);let u=null,p=null,d=0,f=.12,g=!1;const x={builds:0,glyphs:0,lastMs:0},m=T=>{T=Math.max(0,Math.min(d,T));let _=0,E=p.length-1;for(;E-_>1;){const y=_+E>>1;p[y]<=T?_=y:E=y}const A=p[E]-p[_],b=A>1e-9?(T-p[_])/A:0;return{x:u[_].x+(u[E].x-u[_].x)*b,z:u[_].z+(u[E].z-u[_].z)*b}},h=T=>{const _=m(T-Ru),E=m(T+Ru),A=E.x-_.x,b=E.z-_.z,y=Math.hypot(A,b);return y>1e-6?[A/y,b/y]:[1,0]};function S(){if(g=!1,!u||u.length<2){s.instanceCount=0,o.visible=!1;return}const T=performance.now();p=[0];for(let A=1;A<u.length;A++)p.push(p[A-1]+Math.hypot(u[A].x-u[A-1].x,u[A].z-u[A-1].z));d=p[p.length-1];const _=1/n.density,E=Math.min(jr,Math.floor(d/_));for(let A=0;A<E;A++){const b=E-1-A,y=d-(b+.5)*_,w=y+_,P=m(y),U=m(w),H=h(y),$=h(w);a.setXYZW(A,P.x,P.z,U.x,U.z),l.setXYZW(A,H[0],H[1],$[0],$[1]),c.setX(A,y)}a.needsUpdate=l.needsUpdate=c.needsUpdate=!0,r.uniforms.uPitch.value=_,r.uniforms.uTotal.value=d,r.uniforms.uY.value=f,s.instanceCount=E,o.visible=E>0,x.builds++,x.glyphs=E,x.lastMs=performance.now()-T}const M=(T,_)=>T&&_&&T.length===_.length&&T.every((E,A)=>Math.abs(E.x-_[A].x)<1e-6&&Math.abs(E.z-_[A].z)<1e-6),v={mesh:o,stats:x,look:n,follow(T,_=.12){if(!T||T.length<2){v.clear();return}const E=T.slice(1),A=u&&u.length>1?u[1]:null;let b=!u||!M(E,u.slice(1))||_!==f||g;if(!b&&A){const y=u[0],w=u[1],P=w.x-y.x,U=w.z-y.z,H=Math.hypot(P,U)||1;Math.abs((T[0].x-y.x)*U-(T[0].z-y.z)*P)/H>1.2&&(b=!0)}if(b&&(u=T.map(y=>({x:y.x,z:y.z})),f=_,S()),u){const y=u[0],w=u[1],P=w.x-y.x,U=w.z-y.z,H=Math.hypot(P,U)||1,$=Math.max(0,Math.min(H,((T[0].x-y.x)*P+(T[0].z-y.z)*U)/H));r.uniforms.uHead.value=$}},set(T,_=.09){M(T,u)&&_===f&&!g||(u=T&&T.length>1?T.map(E=>({x:E.x,z:E.z})):null,f=_,S())},setHead(T){r.uniforms.uHead.value=T},arcOf(T){return(p==null?void 0:p[T])??0},get total(){return d},setColor(T){Array.isArray(T)?r.uniforms.uColor.value.setRGB(T[0],T[1],T[2]):r.uniforms.uColor.value.set(T)},clear(){u=null,s.instanceCount=0,o.visible=!1},configure(T={}){const _=Number.isFinite(T.pathDensity)?T.pathDensity:n.density;Math.abs(_-n.density)>1e-9&&(n.density=_,g=!0,u&&S()),Number.isFinite(T.pathSize)&&(n.size=T.pathSize),Number.isFinite(T.pathGlow)&&(n.glow=T.pathGlow),Number.isFinite(T.pathAngle)&&(n.angle=T.pathAngle),r.uniforms.uSize.value=n.size,r.uniforms.uThick.value=Math.max(.08,n.size*.26),r.uniforms.uGlow.value=n.glow,r.uniforms.uAngle.value=n.angle*Math.PI/180},update(T){r.uniforms.uPhase.value=T*x_/(1/n.density)%1},dispose(){i==null||i.remove(o),s.dispose(),r.dispose()}};return v.configure({}),v}function b_({scene:i,addLineMaterial:t}){const e=new Re;i.add(e);const n=(g,x=.9)=>Fh(je(new Pe({color:new Wt(g).multiplyScalar(1.5),transparent:!0,opacity:x,side:Ae,blending:He,toneMapped:!1}))),s=n(Se.hover,.85),r=new Re,o=new Jt(new on(.55,.68,40),s);o.rotation.x=-Math.PI/2,o.renderOrder=Zt.CURSOR,r.add(o);for(let g=0;g<4;g++){const x=new Jt(new zs(.1,.38),s);x.rotation.x=-Math.PI/2;const m=g*Math.PI/2;x.position.set(Math.cos(m)*.95,0,Math.sin(m)*.95),x.rotation.z=m+Math.PI/2,x.renderOrder=Zt.CURSOR,r.add(x)}r.visible=!1,e.add(r);const a=n(Se.select,.95),l=new Re,c=new Jt(new on(.7,.85,40),a);c.rotation.x=-Math.PI/2,c.renderOrder=Zt.MARKERS;const u=new Jt(new on(.7,.8,40),a.clone());u.rotation.x=-Math.PI/2,u.renderOrder=Zt.MARKERS;const p=new Jt(new Ds(.035,.035,2.2,6,1,!0),je(new Pe({color:new Wt(Se.select).multiplyScalar(1.4),transparent:!0,opacity:.7,blending:He,toneMapped:!1})));p.position.y=1.1,p.renderOrder=Zt.MARKERS;const d=new Jt(new Mi(.22),new Pe({color:new Wt(Se.select).multiplyScalar(1.6),toneMapped:!1}));d.position.y=2.3,d.renderOrder=Zt.MARKERS,l.add(c,u,p,d),l.visible=!1,e.add(l);const f=qh({parent:e,color:Se.ally});return{group:e,showCursor(g,x,m,h){r.visible=!0,r.position.set(g,x+.1,m),s.color.set(h?Se.blocked:Se.hover).multiplyScalar(1.5)},hideCursor(){r.visible=!1},setTarget(g,x,m,h){l.visible=!0,l.position.set(g,x+.1,m),h&&a.color.set(h).multiplyScalar(1.5)},clearTarget(){l.visible=!1},get targetPos(){return l.visible?l.position:null},setPath(g,x=.12,m=Se.ally){if(!g||g.length<2){f.clear();return}f.setColor(m),f.follow(g,x)},chevrons:f,update(g){r.rotation.y=g*.8;const x=g*1.6%1;c.scale.setScalar(1+.9*(1-x)),c.material.opacity=.95*x,u.scale.setScalar(1+.2*Math.sin(g*4)),d.rotation.y=g*2,d.position.y=2.3+.12*Math.sin(g*3),f.update(g)}}}function $h(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new _e;let c=0;for(let u=0;u<i.length;++u){const p=i[u];let d=0;if(e!==(p.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in p.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(p.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==p.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in p.morphAttributes){if(!s.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(p.morphAttributes[f])}if(t){let f;if(e)f=p.index.count;else if(p.attributes.position!==void 0)f=p.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,u),c+=f}}if(e){let u=0;const p=[];for(let d=0;d<i.length;++d){const f=i[d].index;for(let g=0;g<f.count;++g)p.push(f.getX(g)+u);u+=i[d].attributes.position.count}l.setIndex(p)}for(const u in r){const p=Cu(r[u]);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,p)}for(const u in o){const p=o[u][0].length;if(p===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let d=0;d<p;++d){const f=[];for(let x=0;x<o[u].length;++x)f.push(o[u][x][d]);const g=Cu(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function Cu(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const u=i[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new Te(o,e,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const p=l/e;for(let d=0,f=u.count;d<f;d++)for(let g=0;g<e;g++){const x=u.getComponent(d,g);a.setComponent(d+p,g,x)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const js=new Wt(Se.ally),Ks=new Wt(Se.companion);let Zr=null;function w_(){if(Zr)return Zr;const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.55,"rgba(0,0,0,0.35)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Zr=new Rh(i),Zr}const Ii=30;function E_(i,t){const e=new Float32Array(Ii*2*3),n=new Float32Array(Ii*2*4),s=[];for(let c=0;c<Ii-1;c++){const u=c*2;s.push(u,u+1,u+2,u+1,u+3,u+2)}const r=new _e;r.setAttribute("position",new Te(e,3)),r.setAttribute("color",new Te(n,4)),r.setIndex(s);const o=new Jt(r,je(new Pe({vertexColors:!0,transparent:!0,blending:He,side:Ae,toneMapped:!1})));o.frustumCulled=!1,o.renderOrder=Zt.TRAIL;const a=[];let l=0;return{mesh:o,reset(c,u,p){a.length=0;for(let d=0;d<Ii;d++)a.push([c,u,p])},update(c,u,p,d,f){for(l+=c,a.length||this.reset(u,p,d);l>=.028;)l-=.028,a.unshift([u,p,d]),a.length=Ii;a[0]=[u,p,d];for(let g=0;g<Ii;g++){const x=a[g],m=1-g/(Ii-1),h=t*m;e.set([x[0],x[1],x[2],x[0],x[1]+h,x[2]],g*6);const S=Math.pow(m,1.4)*f;n.set([i.r*1.6,i.g*1.6,i.b*1.6,S,i.r*1.6,i.g*1.6,i.b*1.6,0],g*8)}r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}}}function Pu(i,t,e=!1){const n=new Re,s=c=>je(new Pe({color:i.clone().multiplyScalar(1.5),transparent:!0,opacity:c,side:Ae,blending:He,toneMapped:!1})),r=new Jt(new on(t*.88,t,48),s(.85)),o=new Jt(new on(.01,t*.88,48),s(.07)),a=$h([0,1,2,3].map(c=>new on(t*1.28,t*1.4,10,1,c*Math.PI/2+.2,Math.PI/2-.5))),l=new Jt(a,s(.95));for(const c of[r,o,l])c.rotation.x=-Math.PI/2,c.renderOrder=Zt.GLOW+1,n.add(c);return{group:n,ctrl:l,base:r,inner:o}}function T_({scene:i,map:t,addLineMaterial:e}){const n=new Re;i.add(n);const s={},r=(m,h,S)=>{const M=Ih(new So({color:h.clone().multiplyScalar(1.7),linewidth:S,worldUnits:!1,fog:!0}));e(M);const v=new Ol(new Mo().fromEdgesGeometry(new Kx(m,25)),M);return v.renderOrder=Zt.CREST,v},o=m=>new ll({color:m,flatShading:!0}),a=(m,h)=>new Pe({color:m.clone().multiplyScalar(h),toneMapped:!1});function l(){const m=new Re,h=[new Ds(.2,.31,1.05,6).translate(0,.62,0),new Sn(.82,.2,.36).translate(0,1.28,0),new Sn(.22,.5,.2).translate(.2,0+.25,0),new Sn(.22,.5,.2).translate(-.2,.25,0)].map(b=>b.index?b.toNonIndexed():b),S=$h(h.map(b=>(b.deleteAttribute("uv"),b))),M=new Jt(S,o(398880));M.renderOrder=Zt.SOLIDS;const v=r(S,js,1.8),T=new Jt(new Mi(.22).scale(1,1.25,1),a(js,2));T.position.y=1.7,T.renderOrder=Zt.SOLIDS;const _=new Jt(new Dl(.11,.38,4),a(js,2.4));_.rotation.x=Math.PI/2,_.position.set(0,1.7,.3),_.renderOrder=Zt.SOLIDS;const E=new Jt(new Sn(.16,.2,.05),a(js,2.2));E.position.set(0,1,.31),E.renderOrder=Zt.SOLIDS;const A=new Re;return A.add(M,v,T,_,E),m.add(A),{group:m,lean:A}}function c(){const m=new Re,h=new Nl(.46,.065,5,6),S=new Jt(h,a(Ks,1.7));S.rotation.x=Math.PI/2,S.renderOrder=Zt.SOLIDS;const M=new Jt(new Mi(.26),o(727558));M.renderOrder=Zt.SOLIDS;const v=r(M.geometry,Ks,1.6),T=new Jt(new Mi(.13),a(Ks,2.6));T.renderOrder=Zt.SOLIDS;const _=[0,1].map(E=>{const A=new Jt(new Ul(.09),a(Ks,2.2));return A.renderOrder=Zt.SOLIDS,m.add(A),A});return m.add(S,M,v,T),{group:m,ring:S,shell:M,sats:_}}function u(m,h,S,M,v,T,_){const E=h(),A=new Re;A.add(E.group);const b=new Jt(new Il(M*1.9,24),new Pe({map:w_(),transparent:!0,depthWrite:!1,toneMapped:!1}));b.rotation.x=-Math.PI/2,b.renderOrder=Zt.GLOW-1;const y=Pu(S,M),w=E_(S,v),P=new ev(S.clone().lerp(new Wt(16777215),.25),T,_,2);n.add(A,b,y.group,w.mesh,P),s[m]={id:m,model:E,group:A,shadow:b,rings:y,trail:w,light:P,y:.05,init:!1}}u("avatar",l,js,.55,.95,9,16),u("companion",c,Ks,.4,.5,4.5,11);const p=new Map,d=new Mi(.34).scale(1,1.5,1);function f(m){let h=p.get(m);if(h)return h;const S=new Wt(Se.hostile),M=new Re,v=new Jt(d,a(S,1.9));v.position.y=.9,v.renderOrder=Zt.SOLIDS;const T=Pu(S,.4);return M.add(v,T.group),M.visible=!1,n.add(M),p.set(m,h={id:m,group:M,vis:0,y:.05,init:!1}),h}const g=["avatar","companion"],x=[];return{group:n,contacts:p,sync(m,h,S,M=null){x.length=0;const v=new Set;for(const T of m.others??[]){const _=f(T.id);v.add(T.id);const E=T.render??T,A=!M||M(E.x,E.z,"dynamic");_.vis=A?Math.min(1,_.vis+S*6):Math.max(0,_.vis-S*6),_.group.visible=_.vis>.02;const b=T.cell!=null?t.cells[T.cell]:null,y=Ge(b);_.y=_.init?_.y+(y-_.y)*Math.min(1,S*14):y,_.init=!0,_.group.position.set(E.x,_.y,E.z),_.group.rotation.y=E.heading??0,_.group.scale.setScalar(.3+.7*_.vis)}for(const[T,_]of p)v.has(T)||(_.group.visible=!1,_.vis=0);for(const T of g){const _=m[T],E=s[T];if(!_||!E)continue;const A=_.render??_,b=A.x,y=A.z,w=A.heading,P=_.cell!=null?t.cells[_.cell]:null,U=Ge(P);E.y=E.init?E.y+(U-E.y)*Math.min(1,S*14):U;const H=T==="companion"?1.35+.08*Math.sin(h*2.2):0,$=E.y;E.group.position.set(b,$+H,y),E.group.rotation.y=w,E.shadow.position.set(b,$+.035,y),E.rings.group.position.set(b,$+.09,y),E.rings.ctrl.visible=!!_.controlled,E.rings.ctrl.rotation.z=h*1.4,E.rings.base.material.opacity=_.controlled?.95:.55,E.light.position.set(b,$+(T==="avatar"?3.1:2.4),y),T==="avatar"?(E.model.lean.rotation.x=Math.min(.28,(A.speed??0)*.03),E.model.lean.position.y=Math.abs(Math.sin(h*11))*Math.min(.06,(A.speed??0)*.008)):(E.model.ring.rotation.z=h*1.2,E.model.shell.rotation.y=h*1.8,E.model.sats.forEach((G,B)=>{const N=h*2.6+B*Math.PI;G.position.set(Math.cos(N)*.62,.05*Math.sin(h*5+B),Math.sin(N)*.62),G.rotation.set(h*3,h*2,0)})),E.init||(E.trail.reset(b,$+.1,y),E.init=!0),E.trail.update(S,b,$+.1+(T==="companion"?.7:0),y,A.moving??_.moving?.85:.5),x.push({id:T,x:b,y:$+1,z:y,r:T==="avatar"?3:2})}},centres(){return x},dispose(){i.remove(n),d.dispose()}}}function A_(i,t,{size:e=64,corner:n="bottom-right",offset:s=16}={}){const r=document.createElement("div");r.setAttribute("role","img"),r.setAttribute("aria-label","Compass: click to put north up"),r.title="Compass (click: north up, Home: reset view)";const o={"bottom-right":`right:${s}px;bottom:${s}px`,"top-left":`left:${s}px;top:${s}px`,"bottom-left":`left:${s}px;bottom:${s}px`}[n];r.style.cssText=`position:absolute;${o};width:${e}px;height:${e}px;border-radius:50%;cursor:pointer;
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
    </svg>`;const a=r.querySelector(".dial");r.addEventListener("click",c=>{c.stopPropagation(),t.northUp()}),r.addEventListener("pointerdown",c=>c.stopPropagation()),i.appendChild(r);let l=NaN;return{el:r,update(){const c=t.yawDeg;Math.abs(c-l)<.05||(l=c,a.setAttribute("transform",`rotate(${c.toFixed(2)})`))},dispose(){r.remove()}}}const R_=wo;function C_({canvas:i,map:t,embedded:e=!1,focus:n,glow:s=R_,mode:r="overview",compass:o=!0,makeBoard:a,fog:l=!1,onHover:c,onSelect:u}){var Vt;const p=new Vx({canvas:i,antialias:!0});p.setPixelRatio(Math.min(devicePixelRatio,2)),p.setClearColor(Se.background);const d=new Wx,f=new mn(42,1,1,1200),g=new m_(f,i,t.bounds,{embedded:e,mode:r}),x=n??{x:t.startCell.cx,z:t.startCell.cz,dist:void 0};g.focus(x.x,x.z,r==="overview"?x.dist??150:void 0);const m=Ev(),h=a?a({map:t,cut:m}):Xv(t,{cut:m});(Vt=h.setGlowLevel)==null||Vt.call(h,s),d.add(h.group);const S=g_(d),M={w:1,h:1},v=ft=>{h.lineMats.push(ft),ft.resolution.set(M.w,M.h)},T=b_({scene:d,addLineMaterial:v});let _=null;const E=new bn(1,1,{type:Gn,samples:4});l&&(E.depthTexture=new Ll(1,1));const A=new cv(p,E);A.addPass(new uv(d,f));const b=l?new xv(f):null;b&&A.addPass(b);const y=new Ts(new Kt(1,1),s,.32,.85);A.addPass(y),A.addPass(new dv);const w=o?A_(e?i.parentElement:document.body,g,e?{corner:"bottom-right",size:58,offset:12}:{corner:"bottom-right",size:72,offset:18}):null;w&&!e&&(w.el.style.position="fixed");function P(){const ft=e?i.parentElement:null,I=ft?ft.clientWidth:innerWidth,C=ft?ft.clientHeight:innerHeight;!I||!C||(M.w=I,M.h=C,p.setSize(I,C,!1),A.setSize(I,C),f.aspect=I/C,f.updateProjectionMatrix(),h.resize(I,C))}const U=e?new ResizeObserver(P):null;U==null||U.observe(i.parentElement),e||addEventListener("resize",P),P();const H={hover:[],select:[],frame:[]},$=(ft,...I)=>{for(const C of H[ft])C(...I)},G=(ft,I)=>(H[ft].push(I),()=>{H[ft]=H[ft].filter(C=>C!==I)});c&&G("hover",c),u&&G("select",u);const B=new J;function N(ft,I){const C=g.rayAt(ft,I),R=C.origin,F=C.direction;if(F.y>-1e-4)return null;const K=Math.max(0,(bv-R.y)/F.y),z=(0-R.y)/F.y,it=44;for(let ht=0;ht<=it;ht++){const St=K+(z-K)*ht/it;B.copy(F).multiplyScalar(St).add(R);const ut=t.cellAt(B.x,B.z);if(ut&&ut.solid&&B.y<=Sv(ut))return{point:B.clone(),cell:ut,solid:!0}}B.copy(F).multiplyScalar(z).add(R);const Z=t.cellAt(B.x,B.z);return{point:B.clone(),cell:Z,solid:!!(Z!=null&&Z.solid)}}let Q=null;const st=ft=>!Q||!ft||Q(ft.point.x,ft.point.z),Mt={x:0,y:0,inside:!1};let Pt=null,Et=!1,rt=null;function nt(){if(!Mt.inside){rt=null,Pt&&(Pt=null,h.hover.set(null),$("hover",null,null)),T.hideCursor();return}const ft=N(Mt.x,Mt.y);ft&&(ft.known=st(ft)),rt=ft;const I=ft&&ft.known?ft.cell??null:null,C=!I||I.solid;(I!==Pt||C!==Et)&&(Pt=I,Et=C,h.hover.set(I,{blocked:C}),$("hover",I,ft)),ft&&I&&ft.known&&!I.solid?T.showCursor(ft.point.x,Ge(I),ft.point.z,!1):T.hideCursor()}const Tt=ft=>{Mt.x=ft.clientX,Mt.y=ft.clientY,Mt.inside=!0},_t=()=>{Mt.inside=!1},Rt=ft=>{const I=N(ft.clientX,ft.clientY);I&&(I.known=st(I));const C=I&&I.known?I.cell??null:null;$("select",C,I)},L=ft=>ft.preventDefault();i.addEventListener("pointermove",Tt),i.addEventListener("pointerleave",_t),i.addEventListener("click",Rt),e||i.addEventListener("contextmenu",L);const X=G("select",ft=>{Ct.handlesSelect||h.select.set(ft)}),et=new Lh;let tt=0,dt=!1;const V=[];let zt=!0;const vt={n:0,sum:0,max:0,last:0};function At(){if(!dt)return;const ft=performance.now(),I=Math.min(et.getDelta(),.1),C=et.elapsedTime;if($("frame",I,C),g.update(I),nt(),h.update(C),T.update(C),h.setFocus(g.target.x,g.target.z),S.update(f,g,C,p.domElement.height),V.length=0,_)for(const K of _.centres())V.push(K);const R=T.targetPos;R&&V.push({x:R.x,y:R.y+.6,z:R.z,r:1.9}),rt!=null&&rt.cell&&rt.known&&!rt.solid&&V.push({x:rt.point.x,y:Ge(rt.cell)+.6,z:rt.point.z,r:1.7}),m.update(f,g.mode==="chase"&&zt?V:[]),w==null||w.update(),A.render();const F=performance.now()-ft;vt.last=F,vt.sum+=F,vt.n++,vt.max=Math.max(vt.max,F),tt=requestAnimationFrame(At)}const Ct={renderer:p,camera:f,rig:g,board:h,composer:A,map:t,bloom:y,markers:T,scene:d,cut:m,pointer:Mt,fogPass:b,handlesSelect:!1,on:G,pick:N,repick:nt,addLineMaterial:v,compass:w,get actorsView(){return _},get lastPick(){return rt},setKnowledge(ft){Q=ft},ensureActorsView(){return _??(_=T_({scene:d,map:t,addLineMaterial:v}))},setMode(ft,I){I&&g.goal.set(I.x,0,I.z),g.setMode(ft),ft==="overview"&&I&&g.focus(I.x,I.z,150)},setGlow(ft,I,C){var R;y.strength=ft,y.enabled=ft>.001,(R=h.setGlowLevel)==null||R.call(h,ft),I!==void 0&&(y.radius=I),C!==void 0&&(y.threshold=C)},applySettings(ft){g.applySettings(ft),this.setGlow(ft.glow,ft.bloomRadius,ft.bloomThreshold),S.setDensity(ft.atmosphere??1),b==null||b.setShroud(ft.shroud??1),T.chevrons.configure(ft),zt=ft.cutaway},start(){dt||(dt=!0,et.getDelta(),At())},stop(){dt=!1,cancelAnimationFrame(tt)},takeFrameStats(){const ft={...vt,mean:vt.sum/Math.max(1,vt.n)};return vt.n=vt.sum=vt.max=0,ft},measureScene(){p.info.reset(),p.setRenderTarget(null),p.render(d,f);const ft=p.info.render;return{calls:ft.calls,triangles:ft.triangles,lines:ft.lines,points:ft.points,geometries:p.info.memory.geometries,textures:p.info.memory.textures}},dispose(){dt=!1,cancelAnimationFrame(tt),U==null||U.disconnect(),e||removeEventListener("resize",P),i.removeEventListener("pointermove",Tt),i.removeEventListener("pointerleave",_t),i.removeEventListener("click",Rt),i.removeEventListener("contextmenu",L),X(),g.dispose(),w==null||w.dispose(),A.dispose(),p.dispose(),p.forceContextLoss()}};return Ct}function P_({stage:i,actors:t,canvas:e,embedded:n=!1,onStatus:s,shows:r=null,keys:o=()=>null}){const a=i.rig,l=i.ensureActorsView();i.handlesSelect=!0;let c=null,u=null,p=0,d="avatar",f=!1;const g=!n,x=p_();let m=!1,h=null,S=!1,M=null,v=0;const T=()=>t.snapshot()[d],_=()=>s==null?void 0:s({controlled:d,companionMode:t.snapshot().companion.mode,camera:a.mode,followHeading:a.followHeading}),E=i.on("select",(nt,Tt)=>{if(v>0){v=0,S=!1;return}S&&(S=!1,h=Tt&&Tt.point?Tt:null),!(!Tt||!Tt.point)&&(c={x:Tt.point.x,z:Tt.point.z,cell:nt??null,known:Tt.known!==!1})}),A=()=>{if(a.reset(),a.mode==="overview"){const nt=T();a.focus(nt.x,nt.z)}},b=nt=>{for(const Tt of nt)Tt.type==="tap"?S=!0:Tt.type==="double"?(S=!1,v=.6,A()):Tt.type==="peek"?M={x:Tt.x,y:Tt.y}:Tt.type==="peek-end"&&(M=null,Tt.swallow&&(v=.6))},y=nt=>(Number.isFinite(nt.timeStamp)?nt.timeStamp:performance.now())/1e3,w=nt=>{nt.pointerType==="touch"&&(m=!0,b(x.down(nt.pointerId,nt.clientX,nt.clientY,y(nt))))},P=nt=>{nt.pointerType==="touch"&&(m=!0,b(x.move(nt.pointerId,nt.clientX,nt.clientY)))},U=nt=>{nt.pointerType==="touch"&&b(x.up(nt.pointerId,nt.clientX,nt.clientY,y(nt)))},H=nt=>{nt.pointerType==="touch"&&b(x.cancel(nt.pointerId))},$=nt=>{nt.pointerType==="mouse"&&(m=!1)};g&&(e.addEventListener("pointerdown",w),e.addEventListener("pointermove",P),e.addEventListener("pointermove",$),e.addEventListener("pointerup",U),e.addEventListener("pointercancel",H));const G=n?e:window,B=nt=>n?!0:nt.target===document.body,N=t_(o),Q=nt=>{!B(nt)||nt.ctrlKey||nt.metaKey||nt.altKey||nt.repeat||N.handle(nt)&&nt.code==="Tab"&&nt.preventDefault()};G.addEventListener("keydown",Q),N.bind("possess",()=>{d=d==="avatar"?"companion":"avatar",t.possess(d),Mt(),_()}),N.bind("companionHold",()=>{const nt=t.snapshot().companion.mode;t.commandCompanion({type:nt==="follow"?"hold":"follow"}),_()}),N.bind("stop",()=>{Mt(),c=null}),N.bind("overview",()=>st()),N.bind("camBehind",()=>queueMicrotask(_));function st(){const nt=T();i.setMode(a.mode==="chase"?"overview":"chase",{x:nt.x,z:nt.z}),_()}function Mt(){u=null,i.markers.clearTarget(),i.board.select.set(null)}function Pt(){c=null,p=0,Mt()}const Et={axis:{x:0,z:0},moveTo:null,stop:!1,aim:null,run:!1},rt=i.on("frame",(nt,Tt)=>{v>0&&(v=Math.max(0,v-nt)),b(x.tick(performance.now()/1e3)),g&&i.pointer&&(M?(i.pointer.x=M.x,i.pointer.y=M.y,i.pointer.inside=!0):m&&(i.pointer.inside=!1));const _t=a.keys,Rt=a.analog??null;Et.axis.x=Et.axis.z=0;let L=!1;if(a.mode==="chase"){const{sx:zt,sy:vt}=Wh(_t,o());if(zt||vt){const At=Math.hypot(zt,vt);a.toWorldAxis(zt/At,vt/At,Et.axis),Pt()}else Rt&&Rt.mag>0&&(a.toWorldAxis(Rt.x,Rt.y,Et.axis),Pt(),L=!0)}Et.run=ps(_t,"run",o())||L&&Rt.run;const X=i.lastPick;if(Et.aim=!L&&X&&X.known!==!1&&!X.solid?{x:X.point.x,z:X.point.z}:null,Et.moveTo=null,c){const zt=c;c=null;const At=zt.known&&(!zt.cell||zt.cell.solid)?{ok:!1}:t.commandAvatarTo(zt.x,zt.z);(At==null?void 0:At.ok)===!1&&!zt.known?u=null:(At==null?void 0:At.ok)===!1?(p=.5,i.board.select.set(zt.cell,{blocked:!0}),i.markers.clearTarget(),u=null):(u={x:zt.x,z:zt.z,cell:zt.cell},i.board.select.set(zt.known?zt.cell:null),i.markers.setTarget(zt.x,Ge(zt.known?zt.cell:null),zt.z))}p>0&&(p-=nt,p<=0&&!u&&i.board.select.set(null)),f||t.update(nt,Et);const et=t.snapshot();d=et.controlled??d,l.sync(et,Tt,nt,r);const tt=et[d],dt=tt.render??tt;a.mode==="chase"&&a.follow(dt.x,dt.z,dt.heading);const V=t.path(d);V.length?i.markers.setPath([{x:tt.x,z:tt.z},...V],Ge(i.map.cells[tt.cell])+.12):(i.markers.setPath([]),u&&p<=0&&Mt())});return _(),{actors:t,toggleView:st,status:_,bind:N.bind,aimPick(){return m&&h?h:i.lastPick},clearRoute:Pt,press(nt){const Tt=As(nt,o())[0];return Tt?N.handle({code:Tt}):!1},setMoveVector(nt,Tt,_t=!1){var Rt;(Rt=a.setAnalog)==null||Rt.call(a,nt,Tt,_t)},setPaused(nt){f=!!nt},get paused(){return f},get peeking(){return!!M},get controlled(){return d},dispose(){E(),rt(),G.removeEventListener("keydown",Q),g&&(e.removeEventListener("pointerdown",w),e.removeEventListener("pointermove",P),e.removeEventListener("pointerup",U),e.removeEventListener("pointercancel",H))}}}const _n=(i,t)=>`${i},${t}`,Jr={geo:0,nav:1,render:2};function L_(i){const t=i.opts??{};return!!t.level&&!t.coarse&&!t.kindOf&&!t.cache&&!t.onLoad&&!t.onUnload}function z_({world:i,pool:t=null,config:e={},now:n=()=>performance.now()}){var h,S;const s={poolSize:dn.poolSize.value,batch:dn.batch.value,inflight:dn.inflight.value,adoptMs:dn.adoptMs.value,adoptMax:dn.adoptMax.value,...e},r={seed:i.seed,terrain:(h=i.opts)==null?void 0:h.terrain,field:(S=i.opts)==null?void 0:S.field},o=new Map,a=new Set,l=new Set,c=[];let u=0,p=0,d=!1;const f={jobs:0,sectors:0,adopted:0,adoptMs:0,maxAdoptMs:0,errors:0,queued:0,inflight:0,ready:0},g=M=>(M.tier==="geo"||(M.tier==="render"?i.has("render",M.u,M.v)&&i.has("detail",M.u,M.v):i.has("nav",M.u,M.v)))&&i.geoKnown(M.u,M.v),x=()=>!!t&&!d&&s.poolSize>0;function m(){if(x())for(;u<s.inflight;){const M=[];for(const E of o.values())a.has(_n(E.u,E.v))||l.has(_n(E.u,E.v))||M.push(E);if(!M.length)break;M.sort((E,A)=>E.d-A.d);const v=M.slice(0,s.batch),T=v.map(E=>[E.u,E.v,E.tier]);for(const E of v)a.add(_n(E.u,E.v));u++,f.jobs++;const _=p;t.call("sectorTiers",{...r,items:T}).then(E=>{if(_===p){u--;for(const A of E.list)a.delete(_n(A.u,A.v)),l.add(_n(A.u,A.v)),c.push(A);f.sectors+=E.list.length,m()}},()=>{if(_===p){u--,f.errors++,d=!0;for(const E of v)a.delete(_n(E.u,E.v));o.clear(),a.clear(),l.clear()}})}}return{stats:f,cfg:s,get active(){return x()},want(M){const v=new Map;for(const T of M){const _=_n(T.u,T.v),E=v.get(_);E?(Jr[T.tier]>Jr[E.tier]&&(E.tier=T.tier),E.d=Math.min(E.d,T.d)):v.set(_,{u:T.u,v:T.v,tier:T.tier,d:T.d})}for(const[T,_]of v)g(_)&&v.delete(T);for(const T of[...a,...l])!v.has(T)&&o.has(T)&&v.set(T,o.get(T));o.clear();for(const[T,_]of v)o.set(T,_);f.queued=o.size-a.size-l.size,m()},pending(M,v,T="nav"){if(!x())return!1;const _=_n(M,v);if(c.some(A=>A.u===M&&A.v===v))return!0;const E=o.get(_);return!!E&&Jr[E.tier]>=Jr[T]},adopt(M=s.adoptMs){if(!c.length)return f.ready=0,0;const v=n();c.sort((E,A)=>{var b,y;return(((b=o.get(_n(E.u,E.v)))==null?void 0:b.d)??1e9)-(((y=o.get(_n(A.u,A.v)))==null?void 0:y.d)??1e9)});let T=0;for(;c.length&&T<s.adoptMax;){const E=c.shift();if(E.geo&&i.adoptGeo(E.u,E.v,E.geo),E.nav&&i.adopt("nav",E.u,E.v,E.nav),E.render&&i.adopt("render",E.u,E.v,E.render),E.detail&&i.adopt("detail",E.u,E.v,E.detail),o.delete(_n(E.u,E.v)),l.delete(_n(E.u,E.v)),T++,n()-v>M)break}const _=n()-v;return f.adopted+=T,f.adoptMs+=_,f.maxAdoptMs=Math.max(f.maxAdoptMs,_),f.ready=c.length,T},configure(M={}){for(const v of Object.keys(dn))Number.isFinite(M[v])&&(s[v]=Math.min(dn[v].max,Math.max(dn[v].min,M[v])))},setPool(M){t=M,p++,u=0,a.clear(),l.clear(),c.length=0,o.clear(),d=!1},idle(){return u===0&&!c.length}}}const I_=2,pa=30;function D_({world:i,focus:t,heading:e,opts:n,loaded:s,geo:r="build"}){const o=i.ringPlan(t,{...n,loaded:s,geo:r,maxLoad:1/0,maxUnload:1/0,ahead:e&&n.aheadBias>0?{dir:e,bias:n.aheadBias}:void 0});return{steps:o.steps.filter(a=>a.tier==="nav"||a.tier==="render"),drop:[...o.drop.render,...o.unload],ready:o.ready,plan:o,missing:o.missing,complete:o.complete}}function U_({map:i,cut:t,budgetMs:e=5,maxLoad:n=1/0,onChunk:s,policy:r=D_,ring:o={},pool:a,load:l={},now:c=()=>performance.now()}){const u={navRadius:_i.navRadius.value,renderRadius:_i.renderRadius.value,thickness:_i.thickness.value,aheadBias:_i.aheadBias.value,...o},p={ms:e,items:n},d=i.world,f=Object.fromEntries(Object.keys(dn).map(z=>[z,dn[z].value]));Object.assign(f,l);let g=null;const x=()=>{if(g==null||g.terminate(),g=null,!L_(d)||typeof Worker>"u"||!(f.poolSize>0))return null;try{g=sf({spawn:rf,size:Math.round(f.poolSize)})}catch{g=null}return g},m=z_({world:d,pool:a??x(),config:f});let h=!1;const S=new Re,M=[],v=new Map,T={v:wo},{floor:_,floorMat:E}=kh(S),{hover:A,select:b}=Oh({group:S,lineMats:M}),y=new Map,w=new Set,P=new Set;let U=0;const H=new Map;let $=null,G=null,B=null,N=!0,Q=null,st=!1,Mt=-1;const Pt=new Map,Et=new Map;let rt=[],nt=null,Tt=null;const _t=(z,it,Z)=>Tt?Tt(z,it,Z):!0;let Rt=[],L={w:1,h:1};const X=new Float64Array(pa);let et=0;const tt={chunksBuilt:0,chunksDropped:0,buildMs:0,geoMs:0,geoBuilt:0,maxItemMs:0,lastFrameMs:0,queued:0,slices:0,plans:0,incompletePlans:0,planMs:0,planMsAvg:0,planMsTotal:0,ready:!1};function dt(z){const it=[],Z=St=>d.coarse.inBounds(St.u,St.v),ht=(St,ut)=>d.geoKnown(St,ut)?d.sectorGeo(St,ut).nbrs:null;for(const St of z){if(St.tier==="nav"){it.push({u:St.u,v:St.v,tier:"nav",d:St.d});continue}it.push({u:St.u,v:St.v,tier:"render",d:St.d});for(const ut of ht(St.u,St.v)??[])if(Z(ut)){it.push({u:ut.u,v:ut.v,tier:"render",d:St.d+.01});for(const k of ht(ut.u,ut.v)??[])Z(k)&&it.push({u:k.u,v:k.v,tier:"nav",d:St.d+.02})}}return it}function V(){const z=new Map;for(const[it,Z]of Et)d.geoKnown(Z.u,Z.v)?Et.delete(it):z.set(it,Z);for(const[it,Z]of Pt)!z.has(it)&&!d.geoKnown(Z.u,Z.v)&&z.set(it,Z);return[...z.values()].sort((it,Z)=>it.d-Z.d||it.u-Z.u||it.v-Z.v)}const zt=()=>$?N?!0:st?d.geoSeq()!==Mt&&V().length===0?!0:!m.active&&!rt.length&&!nt&&V().length>0:!1:!1;function vt(){const z=c();if(N=!1,G){const W=$.x-G.x,q=$.z-G.z,O=Math.hypot(W,q);if(O>.5){const lt=W/O,gt=q/O;B=B?{x:B.x*.5+lt*.5,z:B.z*.5+gt*.5}:{x:lt,z:gt}}}for(G={x:$.x,z:$.z};U<i.sectors.length;U++)w.add(i.sectors[U].key);const it=r({world:d,focus:$,heading:B,opts:u,loaded:{nav:w,render:P},geo:h?"build":"defer"});Q=it.plan??it,st=it.complete===!1,Mt=d.geoSeq(),Pt.clear();for(const W of it.missing??[])Pt.set(`${W.u},${W.v}`,W);st&&tt.incompletePlans++;const ht=V();if(m.active){const W=dt(it.steps);for(const q of ht)W.push({u:q.u,v:q.v,tier:"geo",d:q.d});m.want(W),rt=[]}else rt=ht;if(!st){Rt=it.steps.map(q=>({kind:q.tier==="nav"?"nav":"mesh",u:q.u,v:q.v,d:q.d}));for(const[q,O]of it.drop){const lt=i.has(q,O);if(!lt)continue;H.delete(lt.id);const gt=y.get(lt.id);gt&&(S.remove(gt.board.group),gt.board.dispose(),y.delete(lt.id),P.delete(lt.key),tt.chunksDropped++)}const W=new Set(it.steps.filter(q=>q.tier==="render").map(q=>`${q.u},${q.v}`));for(const[q,O]of H)W.has(O.key)||H.delete(q)}tt.queued=Rt.length+rt.length+(nt?1:0),tt.ready=!!it.ready,tt.plans++;const St=c()-z;tt.planMs=St,tt.planMsTotal+=St,X[et%pa]=St,et++;const ut=Math.min(et,pa);let k=0;for(let W=0;W<ut;W++)k+=X[W];tt.planMsAvg=k/ut}const At=(z,it,Z)=>!h&&m.pending(z,it,Z);function Ct(z,it,Z){if(d.geoKnown(z,it))return!1;if(h)return d.sectorGeo(z,it),!1;const ht=`${z},${it}`;return Et.has(ht)||(Et.set(ht,{u:z,v:it,d:Z}),N=!0),!0}function Vt(z,it){if(At(z.u,z.v,z.kind==="nav"?"nav":"render"))return"defer";const Z=i.sector(z.u,z.v);if(z.kind==="nav"||y.has(Z.id))return;let ht=H.get(Z.id);if(!ht){if(Ct(Z.u,Z.v,z.d))return"defer";const ut=d.sectorGeo(Z.u,Z.v).nbrs;for(const W of ut)if(d.coarse.inBounds(W.u,W.v)&&Ct(W.u,W.v,z.d))return"defer";for(const W of ut){if(!d.coarse.inBounds(W.u,W.v))continue;if(At(W.u,W.v,"render"))return"defer";const q=i.sector(W.u,W.v);if(!q.cut){for(const O of d.sectorGeo(q.u,q.v).nbrs)if(d.coarse.inBounds(O.u,O.v)&&At(O.u,O.v,"nav"))return"defer";i.prepare(q),Rt.unshift(z);return}}i.prepare(Z);const k=i.chunkView(Z);ht={key:Z.key,d:z.d,assembly:Hh(k,{cut:t,chunk:{shared:v,lineMats:M,shows:_t,glowRef:T}},c)},H.set(Z.id,ht)}if(tt.slices++,!ht.assembly.run(it))return"more";H.delete(Z.id);const St=ht.assembly.board;St.group.traverse(ut=>{(ut.isMesh&&!ut.isInstancedMesh||ut.isLineSegments2)&&(ut.frustumCulled=!0)});for(const ut of M)ut.resolution.set(L.w,L.h);S.add(St.group),y.set(Z.id,{board:St,d:ht.d}),P.add(Z.key),tt.chunksBuilt++,s==null||s(Z,St)}function ft(){if(!nt){for(;rt.length&&d.geoKnown(rt[0].u,rt[0].v);)rt.shift();if(!rt.length)return;const z=rt.shift();nt={u:z.u,v:z.v,job:d.geoJob(z.u,z.v)}}nt.job.step()&&(nt=null,tt.geoBuilt++)}function I(z=p.ms,it=p.items){const Z=c();m.active&&m.adopt();const ht=Z+z;let St=[],ut=0;const k=()=>{zt()&&(vt(),st||(St=[]))};for(;k(),!(ut>=it);){if(nt||rt.length){const W=c();ft();const q=c()-W;tt.buildMs+=q,tt.geoMs+=q,tt.maxItemMs=Math.max(tt.maxItemMs,q),ut++}else if(Rt.length){const W=Rt.shift(),q=c(),O=Vt(W,ht);if(O==="defer"){St.push(W);continue}const lt=c()-q;if(tt.buildMs+=lt,tt.maxItemMs=Math.max(tt.maxItemMs,lt),O==="more"){Rt.unshift(W);break}ut++}else break;if(c()>ht)break}k(),St.length&&Rt.unshift(...St),tt.queued=Rt.length+rt.length+(nt?1:0),tt.lastFrameMs=c()-Z}const C=z=>{const it=h;h=!0;try{return z()}finally{h=it}};function R(z,it){$={x:z,z:it},(N||!G||Math.hypot(z-G.x,it-G.z)>I_)&&vt()}function F(z={}){const it={...m.cfg};m.configure(z),!Object.keys(dn).every(Z=>m.cfg[Z]===it[Z])&&(!a&&m.cfg.poolSize!==it.poolSize&&(f.poolSize=m.cfg.poolSize,m.setPool(x())),$&&(N=!0,vt()))}const K=[];return{group:S,hover:A,select:b,lineMats:M,floorMat:E,map:i,stats:tt,chunks:y,settle(z,it,Z=u.renderRadius){C(()=>R(z,it));const ht=Rt.filter(St=>St.d<=Z);Rt=Rt.filter(St=>St.d>Z),C(()=>{for(;ht.length;)for(Rt.unshift(...ht.splice(0));Rt.length&&Rt[0].d<=Z;)Vt(Rt.shift(),1/0)}),tt.queued=Rt.length+rt.length+(nt?1:0)},drain(){C(()=>{N=!0;for(let z=0;z<1e6&&(Rt.length||rt.length||nt||zt());z++)I(1e9,1/0)})},pump:I,loader:m,get load(){return{...m.cfg}},configureLoad:F,get budget(){return{budgetMs:p.ms,maxLoad:p.items}},configure(z){let it=!1;for(const Z of Object.keys(u))Number.isFinite(z==null?void 0:z[Z])&&z[Z]!==u[Z]&&(u[Z]=z[Z],it=!0);Number.isFinite(z==null?void 0:z.budgetMs)&&z.budgetMs>=0&&(p.ms=z.budgetMs),(z==null?void 0:z.maxLoad)===1/0?p.items=1/0:Number.isFinite(z==null?void 0:z.maxLoad)&&z.maxLoad>=1&&(p.items=Math.floor(z.maxLoad)),it&&(N=!0,$&&vt()),F(z)},get ring(){return{...u}},get lastPlan(){return Q},setFocus(z,it){_.position.set(z,-.05,it),E.uniforms.uFocus.value.set(z,it),R(z,it)},update(z){I();for(const it of y.values())it.board.update(z);A.tick(z),b.tick(z);for(const it of K)it(z)},resize(z,it){L={w:z,h:it};for(const Z of M)Z.resolution.set(z,it)},setShows(z){Tt=z},setGlowLevel(z){T.v=z;for(const it of y.values())it.board.setGlowLevel(z)},get focus(){return $},dispose(){for(const z of y.values())z.board.dispose();y.clear(),P.clear(),H.clear(),rt=[],nt=null,Et.clear(),Pt.clear(),g==null||g.terminate(),g=null}}}class Yh{constructor(t){this.a=[],this.cmp=t}get size(){return this.a.length}peek(){return this.a[0]}push(t){const e=this.a,n=this.cmp;let s=e.length;for(e.push(t);s>0;){const r=s-1>>1;if(n(e[s],e[r])>=0)break;[e[s],e[r]]=[e[r],e[s]],s=r}}pop(){const t=this.a,e=this.cmp,n=t[0],s=t.pop();if(t.length){t[0]=s;let r=0;for(;;){const o=2*r+1,a=o+1;let l=r;if(o<t.length&&e(t[o],t[l])<0&&(l=o),a<t.length&&e(t[a],t[l])<0&&(l=a),l===r)break;[t[r],t[l]]=[t[l],t[r]],r=l}}return n}}const ar=(i,t)=>{var e;return(i.cell?i.cell(t):(e=i.cells)==null?void 0:e[t])??null},ma=(i,t)=>{var e,n;return i.gateLocked?!!i.gateLocked(t):!!((n=(e=i.gates)==null?void 0:e[t])!=null&&n.locked)};function N_(){const i=new Map;let t=0;function e(g,x=!0){let m=i.get(g);return!m&&x&&(m={key:g,bits:new Uint8Array(16),n:0},i.set(g,m)),m}const n=(g,x)=>!!g&&x>>3<g.bits.length&&(g.bits[x>>3]&1<<(x&7))!==0;function s(g,x){const m=x>>3;if(m>=g.bits.length){let S=g.bits.length;for(;S<=m;)S*=2;const M=new Uint8Array(S);M.set(g.bits),g.bits=M}const h=1<<(x&7);return g.bits[m]&h?!1:(g.bits[m]|=h,g.n++,t++,!0)}function r(g){const x=[];if(!g)return x;for(let m=0;m<g.bits.length;m++){const h=g.bits[m];if(h)for(let S=0;S<8;S++)h&1<<S&&x.push(m*8+S)}return x}const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=new Map([...o].map((g,x)=>[g,x]));function l(g){let x="";for(let m=0;m<g.length;m+=3){const h=g[m],S=g[m+1]??0,M=g[m+2]??0;x+=o[h>>2]+o[(h&3)<<4|S>>4]+(m+1<g.length?o[(S&15)<<2|M>>6]:"=")+(m+2<g.length?o[M&63]:"=")}return x}function c(g){const x=Math.floor(g.length*3/4)-(g.endsWith("==")?2:g.endsWith("=")?1:0),m=new Uint8Array(x);let h=0;for(let S=0;S<g.length;S+=4){const M=a.get(g[S]),v=a.get(g[S+1]),T=g[S+2]==="="?0:a.get(g[S+2]),_=g[S+3]==="="?0:a.get(g[S+3]);h<x&&(m[h++]=M<<2|v>>4),h<x&&(m[h++]=(v&15)<<4|T>>2),h<x&&(m[h++]=(T&3)<<6|_)}return m}function u(g=null){const x={};for(const m of[...i.keys()].sort()){const h=i.get(m);let S=h.bits.length;for(;S>0&&h.bits[S-1]===0;)S--;S&&(x[m]=l(h.bits.subarray(0,S)))}return{format:"boundless-fog-memory",version:1,world:g,chunks:x}}function p(g){if(!g||g.format!=="boundless-fog-memory"||g.version!==1||typeof g.chunks!="object")throw new Error("not a fog memory");i.clear();for(const x of Object.keys(g.chunks).sort()){const m=c(g.chunks[x]),h=Math.max(16,m.length),S={key:x,bits:new Uint8Array(h),n:0};S.bits.set(m);for(let M=0;M<S.bits.length;M++){let v=S.bits[M];for(;v;)S.n+=v&1,v>>=1}i.set(x,S)}return t++,[...i.keys()]}function d(){let g=0,x=0;for(const m of i.values())g+=m.n,x+=m.bits.length;return{chunks:i.size,cells:g,bytes:x}}return{chunk:e,test:n,set:s,locals:r,serialise:u,restore:p,stats:d,clear:()=>{i.clear(),t++},chunks:i,get version(){return t}}}const Lu=1e-5,ls=32,ms=i=>Math.round(i*200);function F_(i,t,e,n,s=null){const r=i.cellAt(t,e);if(!r||s&&s(r))return{start:null,cells:[]};const o=new Map,a=d=>{let f=o.get(d);return f===void 0&&(f=ar(i,d),o.set(d,f)),f},l=new Set([r.id]),c=[],u=[r.id],p=d=>{if(!(!d||l.has(d.id)||Math.hypot(d.cx-t,d.cz-e)>n+(d.radius??3))){if(s&&s(d)){l.add(d.id);return}l.add(d.id),u.push(d.id)}};for(let d=0;d<u.length;d++){const f=a(u[d]);if(!f)continue;c.push(f);for(const x of f.neighbors)p(a(x.id));const g=f.poly;if(!(!g||g.length<3||!f.neighbors.some(x=>x.mid)))for(let x=0;x<g.length;x++){const m=g[x],h=g[(x+1)%g.length],S=(m[0]+h[0])/2,M=(m[1]+h[1])/2;if(Math.hypot(S-t,M-e)>n+1)continue;const v=h[0]-m[0],T=h[1]-m[1],_=v*v+T*T||1;let E=!1;for(const b of f.neighbors){if(!b.mid)continue;const y=((b.mid[0]-m[0])*v+(b.mid[1]-m[1])*T)/_;if(!(y<-.01||y>1.01)&&Math.hypot(m[0]+y*v-b.mid[0],m[1]+y*T-b.mid[1])<.1){E=!0;break}}if(E)continue;const A=Math.hypot(S-f.cx,M-f.cz)||1;p(i.cellAt(S+(S-f.cx)/A*.25,M+(M-f.cz)/A*.25))}}return{start:r,cells:c}}function O_(i){const t=new Map,e=[];for(const n of i){if(!n.solid||!n.poly||n.poly.length<3)continue;const s=n.poly;for(let r=0;r<s.length;r++){const o=s[r],a=s[(r+1)%s.length],l=`${ms(o[0])},${ms(o[1])}`,c=`${ms(a[0])},${ms(a[1])}`,u=l<c?`${l}|${c}`:`${c}|${l}`,p=t.get(u);p===void 0?(t.set(u,e.length),e.push([o[0],o[1],a[0],a[1],n.cx,n.cz])):p>=0&&(e[p]=null,t.set(u,-1))}}return e.filter(Boolean)}function k_(i,t,e,n,s){const r=s[2]-s[0],o=s[3]-s[1],a=e*o-n*r;if(Math.abs(a)<1e-12)return 1/0;const l=s[0]-i,c=s[1]-t,u=(l*o-c*r)/a,p=(l*n-c*e)/a;return u>1e-9&&p>=-1e-9&&p<=1+1e-9?u:1/0}function B_(i,t,e,n){const s=e/Math.cos(Math.PI/ls),r=[];for(const d of n){const f=(d[0]+d[2])/2,g=(d[1]+d[3])/2;if((i-f)*(f-d[4])+(t-g)*(g-d[5])<=0)continue;const x=d[2]-d[0],m=d[3]-d[1],h=x*x+m*m||1,S=Math.max(0,Math.min(1,((i-d[0])*x+(t-d[1])*m)/h));Math.hypot(d[0]+S*x-i,d[1]+S*m-t)<=e+1e-6&&r.push(d)}const o=r.slice();for(let d=0;d<ls;d++){const f=d/ls*Math.PI*2,g=(d+1)/ls*Math.PI*2;o.push([i+s*Math.cos(f),t+s*Math.sin(f),i+s*Math.cos(g),t+s*Math.sin(g)])}const a=[],l=new Set;for(const d of r)for(let f=0;f<4;f+=2){const g=`${ms(d[f])},${ms(d[f+1])}`;if(l.has(g))continue;l.add(g);const x=Math.atan2(d[f+1]-t,d[f]-i);a.push(x-Lu,x,x+Lu)}for(let d=0;d<ls;d++)a.push((d+.5)/ls*Math.PI*2-Math.PI);a.sort((d,f)=>d-f);const c=[],u=[];let p=-1/0;for(const d of a){if(d-p<1e-9)continue;p=d;const f=Math.cos(d),g=Math.sin(d);let x=1/0;for(const m of o){const h=k_(i,t,f,g,m);h<x&&(x=h)}x<1/0&&(c.push([i+f*x,t+g*x]),u.push(d))}return{pts:c,ang:Float64Array.from(u),ox:i,oz:t}}function zu(i,t,e){const{pts:n,ang:s,ox:r,oz:o}=i,a=n.length;if(a<3)return!1;const l=Math.atan2(e-o,t-r);let c=0,u=a;for(;c<u;){const x=c+u>>1;s[x]<=l?c=x+1:u=x}const p=(c-1+a)%a,d=(p+1)%a,f=n[p],g=n[d];return(g[0]-f[0])*(e-f[1])-(g[1]-f[1])*(t-f[0])>=-1e-9}function G_(i){let t=1/0,e=1/0,n=-1/0,s=-1/0;for(const[r,o]of i)r<t&&(t=r),r>n&&(n=r),o<e&&(e=o),o>s&&(s=o);return{x0:t,z0:e,x1:n,z1:s}}function H_(i,t,e){const n=[],s=i.poly??[];if(!i.solid){n.push([i.cx,i.cz]);for(const[o,a]of s)n.push([i.cx+(o-i.cx)*.75,i.cz+(a-i.cz)*.75]);return n}const r=(o,a)=>{const l=Math.hypot(t-o,e-a)||1;return[o+(t-o)/l*.06,a+(e-a)/l*.06]};for(let o=0;o<s.length;o++){const a=s[o],l=s[(o+1)%s.length];n.push(r((a[0]+l[0])/2,(a[1]+l[1])/2),r(a[0],a[1]))}return n}const On=0,gi=1,Qr=2,Zs=2,Js=4194304,Qs=256,V_={radius:22,moveEps:.5,pingTtl:6,pingMinStrength:.15,maxEvents:2e3,weight:1,falloff:.35,exploreLevel:.04,trackLevels:!1,worldId:void 0,keyOf:void 0,idOf:void 0},W_=i=>i*i*(3-2*i);function X_(i,t={}){const e={...V_,...t},n=N_();let s=0,r=0;const o=[],a=new Map;let l=0;function c(k){let W=a.get(k);return W||(W={idx:o.length,key:k,ch:n.chunk(k,!1),unloaded:!1,kind:-1,n:0},o.push(W),a.set(k,W)),W}const u=new Map,p=new Map;function d(k){var O;if(e.keyOf){const lt=e.keyOf(k)[0];return c(lt)}if(k.sector!==void 0&&typeof k.local=="number"){let lt=u.get(k.sector);if(!lt){const gt=(O=i.sectors)==null?void 0:O[k.sector];lt=c(gt&&typeof gt.u=="number"?`${gt.u},${gt.v}`:`s${k.sector}`),u.set(k.sector,lt)}return lt}const W=Math.floor(k.id/Qs);let q=p.get(W);return q||(q=c(`k${W}`),p.set(W,q)),q}const f=k=>e.keyOf?e.keyOf(k)[1]:k.sector!==void 0&&typeof k.local=="number"?k.local:(k.id%Qs+Qs)%Qs;let g=new Map,x=-1;function m(k){const W=i.sectors;if(!W)return null;if(W.length!==x){g=new Map;for(const q of W)typeof q.u=="number"&&g.set(`${q.u},${q.v}`,q);x=W.length}return g.get(k)??null}function h(k){if(k.kind===-1){const q=/^k(-?\d+)$/.exec(k.key);q?(k.kind=1,k.n=+q[1]):k.kind=0}if(k.kind===1)return k.n*Qs;const W=m(k.key);return W?W.base:null}function S(k,W){if(e.idOf)return e.idOf(k.key,W);const q=h(k);return q===null?null:q+W}let M=256;const v={id:new Float64Array(M),info:new Int32Array(M),local:new Int32Array(M),flags:new Uint8Array(M),seen:new Uint8Array(M),level:new Uint8Array(M),until:new Float64Array(M),n:0},T=new Map,_=[];let E=0;function A(k){let W=T.get(k.id);if(W===void 0){if(_.length)W=_.pop();else{if(v.n===M){M*=2;const q=(O,lt)=>{const gt=new O(M);return gt.set(lt),gt};v.id=q(Float64Array,v.id),v.info=q(Int32Array,v.info),v.local=q(Int32Array,v.local),v.flags=q(Uint8Array,v.flags),v.seen=q(Uint8Array,v.seen),v.level=q(Uint8Array,v.level),v.until=q(Float64Array,v.until)}W=v.n++}v.id[W]=k.id,v.info[W]=d(k).idx,v.local[W]=f(k),v.flags[W]=0,v.seen[W]=0,v.level[W]=0,v.until[W]=0,T.set(k.id,W),E++}return W}function b(k){T.delete(v.id[k]),v.id[k]=NaN,v.seen[k]=0,v.flags[k]=0,v.level[k]=0,v.until[k]=0,_.push(k),E--}const y=k=>{const W=o[v.info[k]].ch;return!!W&&n.test(W,v.local[k])},w=k=>v.seen[k]>0?Qr:y(k)||v.flags[k]&Zs&&v.until[k]>s?gi:On,P=k=>v.info[k]*Js+v.local[k],U=(k,W)=>{const q=T.get(k);if(q!==void 0)return w(q);const O=o[Math.floor(W/Js)];return O.ch&&n.test(O.ch,W-O.idx*Js)?gi:On},H=new Map,$=new Map;let G=[];const B=(k,W)=>{G.push({type:k,...W}),G.length>e.maxEvents&&(G=G.slice(-Math.floor(e.maxEvents*.75)))},N=new Map,Q=new Yh((k,W)=>k.until-W.until),st={updates:0,recomputes:0,cellsRead:0,lastMs:0},Mt=k=>{let W=0;for(const q of N.values()){const O=q.cells.get(k);O!==void 0&&O>W&&(W=O)}return W};function Pt(k){const W=v.seen[k]>0?Mt(k):0;e.trackLevels&&W>>4!==v.level[k]>>4&&$.set(v.id[k],P(k)),v.level[k]=W}function Et(k){v.seen[k]===0&&!(v.flags[k]&Zs)&&b(k)}const rt=()=>Math.max(1,Math.ceil(e.exploreLevel*255));function nt(k){const W=l?xt=>d(xt).unloaded:null,{cells:q,start:O}=F_(i,k.x,k.z,k.radius,W);st.recomputes++,st.cellsRead+=q.length;const lt=new Map;let gt=null;if(O&&!O.solid){gt=B_(k.x,k.z,k.radius,O_(q));const xt=G_(gt.pts),ct=k.radius,bt=Math.max(1e-6,e.falloff*ct),Dt=rt();for(const Lt of q){const Yt=Math.hypot(Lt.cx-k.x,Lt.cz-k.z);if(Yt>ct+(Lt.radius??3)+1)continue;const ue=Math.max(1,typeof e.weight=="function"?e.weight(Lt,k):e.weight),ge=Math.min(1,Math.max(0,(ct-Math.max(0,Yt-.5*(Lt.radius??3))*ue)/bt)),re=Math.round(255*W_(ge));if(re<Dt)continue;let Ue=!1;for(const[Ke,Y]of H_(Lt,k.x,k.z))if(!(Ke<xt.x0||Ke>xt.x1||Y<xt.z0||Y>xt.z1)&&zu(gt,Ke,Y)){Ue=!0;break}Ue&&lt.set(A(Lt),re)}k.box=xt}else k.box=null,O&&lt.set(A(O),255);const It=[];for(const xt of lt.keys()){if(k.cells.has(xt))continue;const ct=w(xt);v.seen[xt]++,ct!==Qr&&H.set(v.id[xt],P(xt));const bt=o[v.info[xt]];bt.ch||(bt.ch=n.chunk(bt.key)),n.set(bt.ch,v.local[xt])&&It.push(v.id[xt])}const j=[];for(const xt of k.cells.keys())lt.has(xt)||(v.seen[xt]--,v.seen[xt]===0&&H.set(v.id[xt],P(xt)),j.push(xt));k.cells=lt;for(const xt of lt.keys())Pt(xt);for(const xt of j)Pt(xt),Et(xt);k.poly=gt,k.ax=k.x,k.az=k.z,r++,It.length&&B("revealed",{t:s,cells:It,by:k.id,source:"vision"})}function Tt(k,W=s){const q=performance.now();s=W,st.updates++;let O=0;const lt=G.length,gt=new Set;for(const j of k){gt.add(j.id);const xt=j.radius??e.radius;let ct=N.get(j.id);ct||(ct={id:j.id,x:j.x,z:j.z,radius:xt,own:j.radius!==void 0,cells:new Map,poly:null,box:null,ax:NaN,az:NaN},N.set(j.id,ct)),ct.own=j.radius!==void 0,ct.x=j.x,ct.z=j.z,xt!==ct.radius&&(ct.radius=xt,ct.ax=NaN),Math.hypot(ct.x-ct.ax,ct.z-ct.az)<e.moveEps||(nt(ct),O++)}for(const[j,xt]of N)if(!gt.has(j)){N.delete(j);for(const ct of xt.cells.keys())v.seen[ct]--,v.seen[ct]===0&&H.set(v.id[ct],P(ct)),Pt(ct),Et(ct);r++}X(W),st.lastMs=performance.now()-q;let It=0;for(let j=lt;j<G.length;j++)G[j].type==="revealed"&&(It+=G[j].cells.length);return{recomputed:O,revealed:It}}function _t(){let k=0;for(const W of N.values())W.own||(W.radius=e.radius),nt(W),k++;return{recomputed:k}}function Rt(k,{ttl:W=e.pingTtl,t:q=s}={}){const O=[];for(const lt of k){const gt=ar(i,lt);if(!gt||l&&d(gt).unloaded)continue;const It=A(gt),j=w(It);v.flags[It]|=Zs;const xt=q+W;xt>v.until[It]&&(v.until[It]=xt,Q.push({until:xt,i:It,id:lt})),j===On&&(H.set(lt,P(It)),O.push(lt))}return O.length&&(r++,B("revealed",{t:q,cells:O,by:"scan",source:"scan"})),O.length}function L(k,W={}){const q=W.minStrength??e.pingMinStrength,O=[];for(const lt of k)lt.type==="cell-reached"&&!lt.dead&&lt.strength>=q&&!(lt.generation>0)&&O.push(lt.cell);return O.length?Rt(O,{ttl:W.ttl,t:s}):0}function X(k=s){for(s=k;Q.size&&Q.peek().until<=k;){const{until:W,i:q,id:O}=Q.pop();v.id[q]!==O||v.until[q]>W||!(v.flags[q]&Zs)||(v.flags[q]&=~Zs,w(q)===On&&(H.set(O,P(q)),r++),Et(q))}}const et=k=>{const W=T.get(k.id);if(W!==void 0)return w(W);const q=d(k);return q.ch&&n.test(q.ch,f(k))?gi:On};function tt(k){const W=T.get(k);if(W!==void 0)return w(W);const q=ar(i,k);return q?et(q):On}function dt(k){const W=ar(i,k);if(!W)return!1;const q=d(W);return!!q.ch&&n.test(q.ch,f(W))}const V=k=>{const W=T.get(k);return W===void 0?0:v.level[W]};function zt(k,W){const q=a.get(k);if(!q||!q.ch||!n.test(q.ch,W))return On;if(!q.unloaded){const O=S(q,W),lt=O===null?void 0:T.get(O);if(lt!==void 0&&v.seen[lt]>0)return Qr}return gi}const vt=(k,W)=>{const q=a.get(k);return!!q&&!!q.ch&&n.test(q.ch,W)},At=k=>[d(k).key,f(k)];function Ct(k,W){for(const q of N.values())if(!(!q.box||k<q.box.x0||k>q.box.x1||W<q.box.z0||W>q.box.z1)&&q.poly&&zu(q.poly,k,W))return!0;return!1}function Vt(k,W,q="dynamic"){if(q==="dynamic")return Ct(k,W);const O=i.cellAt(k,W);if(!O)return!1;if(q==="static"){const lt=d(O);return!!lt.ch&&n.test(lt.ch,f(O))}return et(O)>=gi}function ft(k){const W=[];for(const O of k){const lt=c(O);lt.unloaded||(lt.unloaded=!0,l++,W.push(O))}if(!W.length)return 0;const q=new Set(W.map(O=>a.get(O).idx));for(let O=0;O<v.n;O++)if(!(v.id[O]!==v.id[O]||!q.has(v.info[O]))){for(const lt of N.values())lt.cells.delete(O);b(O)}for(const O of N.values())O.ax=NaN;return r++,B("unloaded",{t:s,keys:W}),W.length}function I(k){const W=[];for(const q of k){const O=a.get(q);if(!(!O||!O.unloaded)&&(O.unloaded=!1,l--,W.push(q),!!O.ch))for(const lt of n.locals(O.ch)){const gt=S(O,lt);gt!==null&&H.set(gt,O.idx*Js+lt)}}if(!W.length)return 0;for(const q of N.values())q.ax=NaN;return r++,B("loaded",{t:s,keys:W}),W.length}const C=k=>{const W=a.get(k);return!W||!W.unloaded},R=()=>e.worldId??i.seed??null;function F(){return n.serialise(R())}function K(k,{ignoreWorld:W=!1}={}){const q=typeof k=="string"?JSON.parse(k):k,O=R();if(!W&&O!==null&&q&&q.world!==null&&q.world!==void 0&&q.world!==O)throw new Error(`fog memory is for world ${q.world}, not ${O}`);n.restore(q);for(const lt of n.chunks.keys())c(lt);for(const lt of o)lt.ch=n.chunk(lt.key,!1),lt.unloaded=!1;l=0;for(const lt of T.values())v.id[lt]=NaN;T.clear(),_.length=0,v.n=0,E=0;for(const lt of N.values())lt.cells=new Map,lt.poly=null,lt.box=null,lt.ax=NaN;return H.clear(),$.clear(),r++,B("restored",{t:s,chunks:n.stats().chunks,cells:n.stats().cells}),n.stats()}function z(){X(s);let k=0;for(const It of o)It.ch&&!It.unloaded&&(k+=It.ch.n);const W=E+k,q=new Float64Array(W),O=new Uint8Array(W),lt=new Uint8Array(W);let gt=0;for(let It=0;It<v.n;It++)v.id[It]===v.id[It]&&(q[gt]=v.id[It],O[gt]=w(It),lt[gt]=v.level[It],gt++);for(const It of o)if(!(!It.ch||It.unloaded))for(const j of n.locals(It.ch)){const xt=S(It,j);xt===null||T.has(xt)||(q[gt]=xt,O[gt]=gi,gt++)}return{t:s,version:r,count:gt,cell:gt===W?q:q.slice(0,gt),state:gt===W?O:O.slice(0,gt),level:gt===W?lt:lt.slice(0,gt)}}function it(){X(s);const k=new Float64Array(H.size),W=new Uint8Array(H.size),q=new Uint8Array(H.size);let O=0;for(const[lt,gt]of H){if(o[Math.floor(gt/Js)].unloaded)continue;const It=T.get(lt);k[O]=lt,W[O]=U(lt,gt),q[O]=It===void 0?0:v.level[It],O++}return H.clear(),{count:O,cell:O===k.length?k:k.slice(0,O),state:O===k.length?W:W.slice(0,O),level:O===k.length?q:q.slice(0,O)}}function Z(){const k=$.size,W=new Float64Array(k),q=new Uint8Array(k);let O=0;for(const lt of $.keys()){const gt=T.get(lt);W[O]=lt,q[O]=gt===void 0?0:v.level[gt],O++}return $.clear(),{count:k,cell:W,level:q}}function ht(){const k=[];for(const W of o){if(!W.ch||!W.ch.n)continue;const q=n.locals(W.ch);!W.unloaded&&S(W,q[0])!==null||k.push({key:W.key,count:q.length,locals:Int32Array.from(q)})}return k}function St(k){const W=N.get(k);if(!W||!W.poly)return new Float32Array(0);const q=new Float32Array(W.poly.pts.length*2);return W.poly.pts.forEach(([O,lt],gt)=>{q[2*gt]=O,q[2*gt+1]=lt}),q}return{update:Tt,invalidate:_t,remember:Rt,noteScanEvents:L,tick:X,visibility:tt,isExplored:dt,canSee:Ct,canShow:Vt,snapshot:z,drainChanges:it,vision:St,drainEvents:()=>{const k=G;return G=[],k},levelAt:V,drainLevels:Z,visibilityKey:zt,isExploredKey:vt,keyOfCell:At,unload:ft,load:I,isLoaded:C,ghosts:ht,serialise:F,serialize:F,restore:K,get version(){return r},get time(){return s},get memory(){return{...n.stats(),active:E}},get stats(){return{...st,tracked:E,viewers:N.size,explored:n.stats().cells}},config:e,UNSEEN:On,REMEMBERED:gi,VISIBLE:Qr}}const Ie=2,ae=512,pi=.42,q_=.62,Iu=32,$_=i=>i*i*(3-2*i),Nn=i=>(i%ae+ae)%ae;function Y_({map:i,options:t={},stage:e=null}){const n={radius:t.radius??Mn.sightRadius,up:Mn.revealRate,down:(1-pi)/Mn.ghostFade,hold:1.8},s=X_(i,{moveEps:Mn.revealStep,falloff:Mn.sightSoft,...t,radius:n.radius}),r=B=>i.cell?i.cell(B):i.cells[B],o=new Float32Array(ae*ae),a=new Float32Array(ae*ae),l=new Float32Array(ae*ae),c=new Float32Array(ae*ae),u=new Uint8Array(ae*ae),p=new Ah(u,ae,ae,go,Hn);p.magFilter=p.minFilter=Pn,p.wrapS=p.wrapT=uo,p.generateMipmaps=!1,p.needsUpdate=!0;let d=0,f=0,g=!1,x=!0;const m=[],h=new Map;let S=-1,M=0;const v={rasters:0,texelsRastered:0,easeTexels:0,slides:0,refilled:0,lastMs:0,maxUp:0,maxDown:0};function T(B,N,Q){const st=B.length?Array.isArray(B[0])?B.length:B.length/2:0;if(st<3)return;const Mt=!Array.isArray(B[0]),Pt=new Float64Array(st),Et=new Float64Array(st);let rt=1/0,nt=-1/0;for(let L=0;L<st;L++)Pt[L]=(Mt?B[2*L]:B[L][0])*Ie,Et[L]=(Mt?B[2*L+1]:B[L][1])*Ie,Et[L]<rt&&(rt=Et[L]),Et[L]>nt&&(nt=Et[L]);let Tt=Math.floor(rt),_t=Math.ceil(nt);Q&&(Tt=Math.max(Tt,Q.z0),_t=Math.min(_t,Q.z1-1));const Rt=[];for(let L=Tt;L<=_t;L++){const X=L+.5;Rt.length=0;for(let et=0,tt=st-1;et<st;tt=et++)Et[et]>X!=Et[tt]>X&&Rt.push(Pt[et]+(X-Et[et])*(Pt[tt]-Pt[et])/(Et[tt]-Et[et]));Rt.sort((et,tt)=>et-tt);for(let et=0;et+1<Rt.length;et+=2){let tt=Math.ceil(Rt[et]-.5),dt=Math.floor(Rt[et+1]-.5);Q&&(tt=Math.max(tt,Q.x0),dt=Math.min(dt,Q.x1-1));const V=Nn(L)*ae;for(let zt=tt;zt<=dt;zt++)N(V+Nn(zt),(zt+.5)/Ie,X/Ie)}}}const _=(B,N=2)=>{let Q=1/0,st=1/0,Mt=-1/0,Pt=-1/0;for(let Et=0;Et<B.length;Et+=2)B[Et]<Q&&(Q=B[Et]),B[Et]>Mt&&(Mt=B[Et]),B[Et+1]<st&&(st=B[Et+1]),B[Et+1]>Pt&&(Pt=B[Et+1]);return{x0:Math.floor(Q*Ie)-N,z0:Math.floor(st*Ie)-N,x1:Math.ceil(Mt*Ie)+N,z1:Math.ceil(Pt*Ie)+N}},E=(B,N)=>B?N?{x0:Math.min(B.x0,N.x0),z0:Math.min(B.z0,N.z0),x1:Math.max(B.x1,N.x1),z1:Math.max(B.z1,N.z1)}:B:N,A=B=>{m.push({...B,until:M+n.hold})};function b(B){for(let N=B.z0;N<B.z1;N++){const Q=Nn(N)*ae;for(let st=B.x0;st<B.x1;st++){const Mt=Q+Nn(st);o[Mt]=a[Mt]=l[Mt]=c[Mt]=0,u[Mt]=0}}}function y(B){const N=s.snapshot();let Q=0;for(let st=0;st<N.count;st++){if(N.state[st]===On)continue;const Mt=r(N.cell[st]);if(!Mt)continue;const Pt=Mt.poly;let Et=1/0,rt=1/0,nt=-1/0,Tt=-1/0;for(const _t of Pt)_t[0]<Et&&(Et=_t[0]),_t[0]>nt&&(nt=_t[0]),_t[1]<rt&&(rt=_t[1]),_t[1]>Tt&&(Tt=_t[1]);for(const _t of B)nt*Ie<_t.x0||Et*Ie>_t.x1||Tt*Ie<_t.z0||rt*Ie>_t.z1||(T(Pt,Rt=>{a[Rt]<pi&&(a[Rt]=pi,c[Rt]=pi,u[Rt]=Math.round(pi*255))},_t),Q++)}v.refilled+=Q}function w(B,N){const Q=Math.floor(B*Ie)-ae/2,st=Math.floor(N*Ie)-ae/2;if(g&&Math.abs(Q-d)<Iu&&Math.abs(st-f)<Iu)return!1;const Mt=[];!g||Math.abs(Q-d)>=ae||Math.abs(st-f)>=ae?Mt.push({x0:Q,z0:st,x1:Q+ae,z1:st+ae}):(Q>d?Mt.push({x0:d+ae,z0:st,x1:Q+ae,z1:st+ae}):Q<d&&Mt.push({x0:Q,z0:st,x1:d,z1:st+ae}),st>f?Mt.push({x0:Q,z0:f+ae,x1:Q+ae,z1:st+ae}):st<f&&Mt.push({x0:Q,z0:st,x1:Q+ae,z1:f}));for(const Pt of Mt)b(Pt);return d=Q,f=st,g=!0,y(Mt),v.slides++,p.needsUpdate=!0,!0}function P(B){const N=performance.now();let Q=null;for(const st of B){const Mt=s.vision(st.id),Pt=Mt.length?_(Mt):null,Et=h.get(st.id)??null;Q=E(Q,E(Pt,Et)),h.set(st.id,Pt),st.pts=Mt}for(const st of[...h.keys()])B.some(Mt=>Mt.id===st)||(Q=E(Q,h.get(st)),h.delete(st));if(Q){for(let st=Q.z0;st<Q.z1;st++){const Mt=Nn(st)*ae;for(let Pt=Q.x0;Pt<Q.x1;Pt++)o[Mt+Nn(Pt)]=0}for(const st of B){if(!st.pts.length)continue;const Mt=st.radius??s.config.radius,Pt=Math.max(1e-6,s.config.falloff*Mt);let Et=0;T(st.pts,(rt,nt,Tt)=>{const _t=Math.hypot(nt-st.x,Tt-st.z),Rt=$_(Math.min(1,Math.max(0,(Mt-_t)/Pt)));Rt>o[rt]&&(o[rt]=Rt);const L=Rt<pi?Rt:pi;L>a[rt]&&(a[rt]=L),Et++},Q),v.texelsRastered+=Et}v.rasters++,A(Q),v.lastRaster=performance.now()-N}}function U(){const B=s.drainChanges();for(let N=0;N<B.count;N++){const Q=r(B.cell[N]);if(!Q)continue;const st=B.state[N]===gi&&!s.isExplored(B.cell[N]),Mt=B.state[N]===On;if(!st&&!Mt)continue;const Pt=st?q_:0;let Et=1/0,rt=1/0,nt=-1/0,Tt=-1/0;for(const _t of Q.poly)_t[0]<Et&&(Et=_t[0]),_t[0]>nt&&(nt=_t[0]),_t[1]<rt&&(rt=_t[1]),_t[1]>Tt&&(Tt=_t[1]);T(Q.poly,_t=>{l[_t]=Pt}),A({x0:Math.floor(Et*Ie)-1,z0:Math.floor(rt*Ie)-1,x1:Math.ceil(nt*Ie)+1,z1:Math.ceil(Tt*Ie)+1})}}function H(B){let N=null;for(let rt=m.length-1;rt>=0;rt--)m[rt].until<M?m.splice(rt,1):N=E(N,m[rt]);if(!N)return;const Q=n.up*B,st=n.down*B;let Mt=0,Pt=0,Et=0;for(let rt=N.z0;rt<N.z1;rt++){const nt=Nn(rt)*ae;for(let Tt=N.x0;Tt<N.x1;Tt++){const _t=nt+Nn(Tt);let Rt=o[_t];a[_t]>Rt&&(Rt=a[_t]),l[_t]>Rt&&(Rt=l[_t]);const L=c[_t];if(Rt===L)continue;const X=Rt>L?Math.min(Rt,L+Q):Math.max(Rt,L-st);c[_t]=X;const et=Math.round(X*255);et!==u[_t]&&(u[_t]=et,Mt++),X>L?X-L>Pt&&(Pt=X-L):L-X>Et&&(Et=L-X)}}v.easeTexels=(N.x1-N.x0)*(N.z1-N.z0),v.maxUp=Pt,v.maxDown=Et,Mt&&(p.needsUpdate=!0)}const $={fog:s,mask:p,stats:v,get enabled(){return x},setEnabled(B){x=!!B,G==null||G.setEnabled(x)},configure(B={}){let N=!1;return B.sightRadius!==void 0&&B.sightRadius!==n.radius&&(n.radius=B.sightRadius,s.config.radius=B.sightRadius,N=!0),B.sightSoft!==void 0&&B.sightSoft!==s.config.falloff&&(s.config.falloff=B.sightSoft,N=!0),N&&s.invalidate(),B.revealStep!==void 0&&(s.config.moveEps=B.revealStep),B.revealRate!==void 0&&(n.up=B.revealRate),B.ghostFade!==void 0&&(n.down=(1-pi)/Math.max(.05,B.ghostFade),n.hold=Math.max(1.8,B.ghostFade*1.4+.5)),{...n}},get tuning(){return{...n,falloff:s.config.falloff,moveEps:s.config.moveEps}},update(B,N,Q=1/60){const st=performance.now();if(M+=Q,v.maxUp=v.maxDown=0,!B.length)return;const Mt=w(B[0].x,B[0].z);s.update(B,N),(Mt||s.version!==S)&&(P(B.map(Pt=>({...Pt}))),S=s.version),U(),H(Q),G==null||G.setWindow(d,f),v.lastMs=performance.now()-st,v.sightMs=s.stats.lastMs},settle(){for(let B=0;B<c.length;B++){const N=Math.max(o[B],a[B],l[B]);c[B]=N,u[B]=Math.round(N*255)}m.length=0,p.needsUpdate=!0},noteScan(B){return B.length?s.noteScanEvents(B):0},level(B,N){const Q=Math.floor(B*Ie),st=Math.floor(N*Ie);return Q<d||Q>=d+ae||st<f||st>=f+ae?0:c[Nn(st)*ae+Nn(Q)]},shows(B,N,Q="dynamic"){const st=$.level(B,N);return Q==="dynamic"?st>.5:st>.05},canShow:(B,N,Q="dynamic")=>s.canShow(B,N,Q),knows(B,N){return $.level(B,N)>.05||s.canShow(B,N,"static")},dispose(){p.dispose()}};let G=null;return e!=null&&e.fogPass&&(G=e.fogPass,G.setMask(p)),$}const Du={ping:{start:.4,build:1.6,hold:1,burn:2.2},sweep:{start:.3,build:5,hold:3,burn:5},echo:{start:.7,build:.5,hold:0,burn:2.6}},ml={ping:{speed:14,power:1,env:"ping"},sweep:{speed:9,power:1,env:"sweep"}},Di={active:{power:1,clarity:1,loudness:1,glimpseRadius:0},passive:{power:.45,clarity:.6,loudness:.2,glimpseRadius:2}},Uu={default:300,device:150,adversary:355,decoy:45,unknown:300},gl={echo:{reveal:"on-arrival",playback:1,traceFloor:.05,scrambleJitter:1.2},floor:.03,hearFloor:.04,maxCells:2500,maxEchoes:16,maxGeneration:2,maxTime:1/0,maxWorkPerAdvance:2e4,echoKeep:64,lookahead:0,maxEvents:4e3,maskMaxCells:400,scrambleHops:3,ringRise:.5,ringTau:2.2},jh=i=>i<=0?0:i>=1?1:i*i*(3-2*i);function tr(i,t){return t<0?0:t<i.build?i.start+(1-i.start)*jh(t/i.build):t<i.build+i.hold?1:Math.exp(-(t-i.build-i.hold)/i.burn)}function j_(i,t,e){return t>e?i.build+i.hold+i.burn*Math.log(t/e):t*i.start>=e?i.build:0}function ga(i,t,e=gl){if(t<0)return 0;const n=e.ringRise>0?jh(t/e.ringRise):1;return i*n*Math.exp(-Math.max(0,t-e.ringRise)/e.ringTau)}function hs(i,t){return i==="absorb"?Math.pow(t,1.4):i==="scramble"?.5*t:.3*t}function cs(i,...t){let e=2166136261^i>>>0;const n=t.join("|");for(let s=0;s<n.length;s++)e^=n.charCodeAt(s),e=Math.imul(e,16777619);return e^=e>>>15,e=Math.imul(e,739982445),e^=e>>>12,e=Math.imul(e,695872825),e^=e>>>15,(e>>>0)/4294967296}const us=(i,t,e)=>i<t?t:i>e?e:i,Nu=Object.freeze({transmission:1,scramble:null,spoofs:[],masks:[]});function K_({nav:i,getCell:t,cfg:e,now:n}){const s=new Map,r=new Map;let o=0;function a(f,g){if(g<f.createdAt||g>=f.expiresAt)return 0;const x=f.expiresAt-g;return x>=f.fade?f.opacity:f.opacity*(x/f.fade)}function l(f){if(f==null)return null;if(typeof f=="object"){const x=i.cellAt(f.x,f.z);return x?{id:x.id,x:f.x,z:f.z}:null}const g=t(f);return g?{id:g.id,x:g.cx,z:g.cz}:null}function c(f){const g=l(f.center);if(!g)return[];const x=f.radius??12,m=f.shape??"disc",h=f.heading??0,S=(f.arc??Math.PI/2)/2,M=E=>{const A=E.cx-g.x,b=E.cz-g.z,y=Math.hypot(A,b);if(y>x)return!1;if(m==="ring")return y>=x*.55;if(m==="cone"){if(y<1e-9)return!0;let w=Math.atan2(b,A)-h;return w=Math.atan2(Math.sin(w),Math.cos(w)),Math.abs(w)<=S}return!0},v=[],T=new Set([g.id]),_=[g.id];for(let E=0;E<_.length;E++){const A=t(_[E]);if(!(!A||A.solid)){if(M(A)&&v.push(A.id),v.length>=e.maskMaxCells)break;for(const b of A.neighbors){if(T.has(b.id))continue;const y=t(b.id);!y||y.solid||Math.hypot(y.cx-g.x,y.cz-g.z)>x+6||(T.add(b.id),_.push(b.id))}}}return v}function u(f={},g=n()){var _,E,A,b,y;const x=f.mode??"absorb";if(!["absorb","scramble","spoof"].includes(x))throw new Error(`unknown mask mode ${x}`);const m=f.cells?[...f.cells]:c(f),h=[];for(const w of m){const P=t(w);P&&!P.solid&&h.push(P.id)}if(!h.length)return null;let S=h[0];const M=f.center!=null?l(f.center):null;if(M){let w=1/0;for(const P of h){const U=t(P),H=Math.hypot(U.cx-M.x,U.cz-M.z);H<w&&(w=H,S=P)}}const v=f.duration??8,T={id:`mask-${++o}`,mode:x,opacity:Math.min(1,Math.max(0,f.opacity??.8)),createdAt:g,expiresAt:g+v,duration:v,fade:Math.min(v,f.fade??Math.min(1.5,v*.25)),shape:f.shape??(f.cells?"cells":"disc"),center:M?{x:M.x,z:M.z}:null,radius:f.radius??null,cells:new Set(h),anchor:S,owner:f.owner??null,spoof:x==="spoof"?{id:((_=f.spoof)==null?void 0:_.id)??`spoof-${o}`,kind:((E=f.spoof)==null?void 0:E.kind)??"device",signature:((A=f.spoof)==null?void 0:A.signature)??.8,strengthResponse:((b=f.spoof)==null?void 0:b.strengthResponse)??1,cell:((y=f.spoof)==null?void 0:y.cell)??S}:null};s.set(T.id,T);for(const w of T.cells){const P=r.get(w);P?P.push(T):r.set(w,[T])}return T}function p(f){s.delete(f.id);for(const g of f.cells){const x=r.get(g);if(!x)continue;const m=x.indexOf(f);m>=0&&x.splice(m,1),x.length||r.delete(g)}}function d(f,g){const x=r.get(f);if(!x)return Nu;let m=1,h=null,S=0,M=null,v=null;for(const T of x){const _=a(T,g);_<=0||((v??(v=[])).push(T),T.mode==="absorb"?m*=1-_:T.mode==="scramble"?(m*=1-.1*_,_>S&&(S=_,h=T)):(M??(M=[])).push(T))}return v?{transmission:m,scramble:h,scrambleOpacity:S,spoofs:M??[],masks:v}:Nu}return{create:u,remove:p,effects:d,opacityAt:a,get:f=>s.get(f)??null,all:()=>[...s.values()],isMasked:(f,g=n())=>d(f,g).masks.length>0,tell:(f,g=n())=>hs(f.mode,a(f,g))}}const fs=(i,t)=>typeof i=="number"&&typeof t=="number"?i-t:String(i)<String(t)?-1:String(i)>String(t)?1:0,Z_=(i,t)=>i.t-t.t||i.k-t.k||i.w-t.w||fs(i.c,t.c)||t.m-i.m||i.seq-t.seq,Fu=Object.freeze({transmission:1,scramble:null,scrambleOpacity:0,spoofs:[],masks:[]});function J_(i,t={}){const e={...gl,...t,echo:{...gl.echo,...t.echo??{}}};e.echo.reveal!=="on-arrival"&&e.echo.reveal!=="live"&&(e.echo.reveal="on-arrival");const n=t.seed??1,s=t.sources??(()=>null);let r=0,o=0;const a=new Map,l=R=>{let F=a.get(R);return F===void 0&&(F=ar(i,R),a.set(R,F)),F},c={cells:0,pops:0,pushes:0,sourceCalls:0,echoes:0,heard:0,navCells:0,droppedEvents:0,notices:0},u=new Yh(Z_),p=[],d=[],f=new Map;let g=[],x=0,m=0;const h=new Map,S=[],M=[];let v=0,T=1024;const _={n:0,version:0,cell:new Float64Array(T),arrival:new Float64Array(T),strength:new Float32Array(T),gen:new Uint8Array(T),wave:new Int32Array(T),speed:new Float32Array(T),flags:new Uint8Array(T)},E=new Map;function A(){T*=2;for(const[R,F]of[["cell",Float64Array],["arrival",Float64Array],["strength",Float32Array],["gen",Uint8Array],["wave",Int32Array],["speed",Float32Array],["flags",Uint8Array]]){const K=new F(T);K.set(_[R]),_[R]=K}}function b(R,F,K,z,it,Z){_.n===T&&A();const ht=_.n++;_.cell[ht]=typeof F=="number"?F:NaN,_.arrival[ht]=K,_.strength[ht]=z,_.gen[ht]=R.gen,_.wave[ht]=R.id,_.speed[ht]=R.speed,_.flags[ht]=(it?1:0)|(Z?2:0);const St=E.get(F);return St?St.push(ht):E.set(F,[ht]),_.version++,ht}const y=(R=3)=>e.ringRise+e.ringTau*Math.log(Math.max(1.0001,R/.01)),w=K_({nav:i,getCell:l,cfg:e,now:()=>r});function P(R,F,K=!1){if(g.push(K?{type:R,...F,hidden:!0}:{type:R,...F}),g.length>e.maxEvents){const z=[];let it=g.length-Math.floor(e.maxEvents*.75);for(const Z of g)it>0&&Z.type==="cell-reached"?(it--,c.droppedEvents++):z.push(Z);g=z}}function U(R,F){const K=F.env,z={id:p.length+1,pingId:R.id,gen:F.gen,parent:F.parent??null,origin:F.origin,t0:F.t0,power:F.power,env:K,speed:R.speed,sourceId:F.sourceId??`ping:${R.id}`,claim:F.claim??null,life:j_(K,F.power,e.floor),settled:new Map,best:new Map,touched:new Set,heardBy:new Set,pending:0,cells:0,burned:!1,cut:null,done:!1,cancelled:!1,wanted:null};if(F.gen>0){z.wanted=new Set(["origin"]);for(const it of f.values())for(const Z of it)z.wanted.add(Z.id);S.push(z)}return p.push(z),x++,H(z,F.t0,F.origin,1,!0),z}function H(R,F,K,z,it){u.push({t:F,k:1,w:R.id,c:K,m:z,o:it,seq:++o}),R.pending++,c.pushes++}function $(R,F){if(R.done)return;R.done=!0;const K=h.get(R.id);K&&(K.endT=F),x--,P("wave-exhausted",{t:F,waveId:R.id,pingId:R.pingId,generation:R.gen,sourceId:R.sourceId,cells:R.cells,reason:R.cut??(R.burned?"burnout":"frontier-empty")},R.gen>0)}function G(R,F,K){const z=[];let it=R;for(let Z=0;Z<F;Z++){const ht=l(it),St=[];for(const ut of ht.neighbors){if(ut.gate!==void 0&&ma(i,ut.gate))continue;const k=l(ut.id);k&&!k.solid&&St.push(ut.id)}if(!St.length)break;St.sort(fs),it=St[Math.floor(cs(n,"walk",K,Z)*St.length)],z.push(it)}return z}function B(R,F,K,z,it,Z,ht,St,ut=1){const k=us(z.signature??.7,0,1),W=us(z.strengthResponse??1,0,3),q=it*W*k*ht.transmission;if(F.echoed.has(z.id))return;let O=null;F.echoes>=e.maxEchoes?O="echo-cap":F.cells>=e.maxCells?O="budget-cells":q<e.floor&&(O=ht.transmission<.5?"masked":"too-faint");const lt={t:Z,waveId:R.id,pingId:F.id,cell:K,id:z.id,kind:z.kind??"unknown",strength:it,echoStrength:O?0:q,echo:!O,reason:O,spoofed:!!St};if(P("identifier-hit",lt,!0),O)return;F.echoed.add(z.id),F.echoes++,c.echoes++;let gt=K,It=k,j=1,xt=!1,ct=null;if(ht.scramble&&!St){const ge=ht.scrambleOpacity,re=`${R.id}:${z.id}:${ht.scramble.id}`,Ue=us(1+Math.round(ge*(e.scrambleHops-1)*(.4+.6*cs(n,"hops",re))),1,e.scrambleHops);ct=G(K,Ue,re),(!ct.length||ct[ct.length-1]===K)&&(ct=G(K,1,`${re}:b`)),gt=ct.length?ct[ct.length-1]:K,It=us(k+(cs(n,"sig",R.id,z.id)-.5)*1.6*ge,0,1),j=us(1-.9*ge,0,1),xt=!0}let bt=ut<1?hs("absorb",1-ut):0;for(const ge of ht.masks)bt=Math.max(bt,hs(ge.mode,w.opacityAt(ge,Z)));St&&(bt=Math.max(bt,hs("spoof",.8)));const Dt=z.kind??"unknown",Lt={echoId:++m,id:z.id,kind:Dt,hue:z.hue??Uu[Dt]??Uu.default,signature:It,quality:j,garbled:xt,spoofed:!!St,reorder:xt?1-j:0,trueCell:K,trueSignature:k,level:bt},Yt=U(F,{gen:R.gen+1,parent:R.id,origin:gt,t0:Z,power:q,env:Du.echo,sourceId:z.id,claim:Lt}),ue={sourceId:Lt.id,kind:Lt.kind,cell:gt,emitTime:Z,pingId:F.id,returnTime:null,endT:null,wave:Yt,claim:Lt,e0:q,truth:{cell:K,garbled:Lt.garbled,spoofed:Lt.spoofed}};h.set(Yt.id,ue),P("echo-started",{t:Z,waveId:Yt.id,parent:R.id,pingId:F.id,generation:Yt.gen,id:z.id,kind:Lt.kind,cell:gt,trueCell:K,strength:q,garbled:xt,spoofed:!!St},!0)}const N=R=>R<=0?0:R>=1?1:R*R*(3-2*R);function Q(R,F,K,z,it){const Z=R.speed,ht=e.echo.playback,St=(K.t-R.t0)*Z,ut=Math.max(K.carry,1e-9),k=[];let W=!1;for(const[gt,It]of R.settled){if(It.dead||It.t>K.t+1e-9)continue;const j=z*Math.min(1,ut/Math.max(It.carry,1e-9));if(j<e.echo.traceFloor&&It!==K){W=!0;continue}k.push({id:gt,dist:(It.t-R.t0)*Z,q:Math.min(1.5,j)})}k.sort((gt,It)=>It.dist-gt.dist||fs(gt.id,It.id));const q=k.length,O={hue:F.hue,kind:F.kind,sourceId:F.id,clarity:z,speed:Z,rate:ht,R:St,latchTime:it,count:q,cut:W,sourceCell:R.origin,cell:new Float64Array(q),dist:new Float32Array(q),arrival:new Float64Array(q),strength:new Float32Array(q),endTime:it},lt=F.reorder*e.echo.scrambleJitter;for(let gt=0;gt<q;gt++){const It=k[gt];O.cell[gt]=It.id,O.dist[gt]=It.dist,O.strength[gt]=It.q,O.arrival[gt]=it+(St-It.dist)/(Z*ht)}if(lt>0&&q>2){const gt=O.arrival[q-1];for(let Dt=0;Dt<q;Dt++){const Lt=(cs(n,"jit",F.echoId,O.cell[Dt])-.5)*2*lt;O.arrival[Dt]=Math.min(gt,Math.max(it,O.arrival[Dt]+Lt))}const It=Array.from({length:q},(Dt,Lt)=>Lt).sort((Dt,Lt)=>O.arrival[Dt]-O.arrival[Lt]||Dt-Lt),j=new Float64Array(q),xt=new Float32Array(q),ct=new Float64Array(q),bt=new Float32Array(q);It.forEach((Dt,Lt)=>{j[Lt]=O.cell[Dt],xt[Lt]=O.dist[Dt],ct[Lt]=O.arrival[Dt],bt[Lt]=O.strength[Dt]}),Object.assign(O,{cell:j,dist:xt,arrival:ct,strength:bt})}return O.endTime=q?O.arrival[q-1]:it,O}function st(R,F){const K=[];for(const[Z,ht]of R.settled)!ht.dead&&ht.t<=F&&K.push({id:Z,t:ht.t,s:ht.strength});K.sort((Z,ht)=>Z.t-ht.t||fs(Z.id,ht.id));const z=K.length,it={speed:R.speed,emitTime:R.t0,count:z,cell:new Float64Array(z),arrival:new Float64Array(z),strength:new Float32Array(z)};return K.forEach((Z,ht)=>{it.cell[ht]=Z.id,it.arrival[ht]=Z.t,it.strength[ht]=Z.s}),it}function Mt(R,F){const K=R.claim,z=d[R.pingId-1],it=Di[z.mode]??Di.active,Z=K.quality*it.clarity*N(R.e0/.3);return{echoId:K.echoId,latched:!1,listener:"origin",pingId:z.id,sourceId:K.id,kind:K.kind,hue:K.hue,signature:K.signature,cell:R.cell,pingT0:z.t0,emitTime:R.emitTime,returnTime:null,delay:null,estDistance:null,strength:R.e0,clarity:Z,mode:z.mode,glimpse:{cell:R.cell,radius:Math.round((1-Z)*3)+it.glimpseRadius,stale:0},replay:null,forward:st(R.wave,F),tell:{suspicious:!1}}}function Pt(R,F,K,z,it,Z){const ht=K.id;if(R.heardBy.has(ht))return;R.heardBy.add(ht),c.heard++;const St=R.claim,ut=Di[F.mode]??Di.active,k=Z-F.t0,W=St.quality*ut.clarity*N(it/.3),q=K.id==="origin"?St.echoId:`${St.echoId}:${K.id}`,O=R.settled.get(z),lt=Q(R,St,O,W,Z);let gt=St.level,It=O,j=0;for(;It&&It.parent!=null&&j++<200;){const Yt=w.effects(It.parent,Z);for(const ue of Yt.masks)gt=Math.max(gt,hs(ue.mode,w.opacityAt(ue,Z)));It=R.settled.get(It.parent)}const xt={echoId:q,latched:!0,listener:K.id,listenerCell:z,pingId:F.id,sourceId:St.id,kind:St.kind,hue:St.hue,signature:St.signature,cell:R.origin,pingT0:F.t0,emitTime:R.t0,returnTime:Z,delay:k,estDistance:k*F.speed/2,strength:it,clarity:W,mode:F.mode,glimpse:{cell:R.origin,radius:Math.round((1-W)*3)+ut.glimpseRadius,stale:Z-R.t0},replay:lt,field:lt,R:lt.R,speed:lt.speed,latchTime:Z,tell:{suspicious:cs(n,"tell",q)<gt},truth:{cell:St.trueCell,signature:St.trueSignature,garbled:St.garbled,spoofed:St.spoofed,quality:St.quality,tellLevel:gt}};M.push(xt);const ct=h.get(R.id);ct&&(ct.returnTime=Z);const{truth:bt,replay:Dt,...Lt}=xt;P("echo-heard",{t:Z,waveId:R.id,generation:R.gen,...Lt,replay:lt,id:St.id,truth:bt}),R.wanted.delete(ht),R.wanted.size===0&&!R.done&&(R.cancelled=!0,R.cut="heard",$(R,Z))}function Et(R,F){const K=d[R.pingId-1],z=F.t,it=l(F.c);if(!it||it.solid)return;const Z=z-R.t0;if(Z>R.life){R.burned=!0;return}if(Z>e.maxTime){R.cut??(R.cut="budget-time");return}const ht=R.settled.get(F.c);if(ht&&!ht.dead)return;const St=F.o?Fu:w.effects(F.c,z),ut=F.m*St.transmission,k=R.power*tr(R.env,Z)*ut,W=k>=e.floor||Z<R.env.build+R.env.hold&&R.power*ut>=e.floor;let q=ht;if(q){if(!W){q.up=!1;return}q.slot>=0&&(_.flags[q.slot]|=4,_.strength[q.slot]=0),q.dead=!1,q.t=z,q.strength=k,q.carry=ut,q.parent=F.p??q.parent,R.gen===0&&(q.slot=b(R,F.c,z,k,!1,St.masks.length>0))}else{if(K.cells>=e.maxCells){R.cut??(R.cut="budget-cells");return}K.cells++,c.cells++,R.cells++,q={t:z,strength:k,carry:ut,dead:!W,up:!1,parent:F.p??null,slot:R.gen===0?b(R,F.c,z,k,!W,St.masks.length>0):-1},R.settled.set(F.c,q)}P("cell-reached",{t:z,waveId:R.id,cell:F.c,strength:k,generation:R.gen,dead:!W,masked:St.masks.length>0},R.gen>0);for(const O of St.masks){if(R.touched.has(O.id)||(R.touched.add(O.id),O.owner!=null&&O.owner===K.owner))continue;const lt=hs(O.mode,w.opacityAt(O,z)),gt=lt*us(.5+F.m*R.power*tr(R.env,Z),0,1);cs(n,"notice",R.id,O.id)<gt&&(c.notices++,P("mask-noticed",{t:z,maskId:O.id,mode:O.mode,cell:F.c,waveId:R.id,pingId:K.id,detectability:lt,by:K.owner},R.gen>0))}if(W){if(R.claim&&R.gen>=1&&k>=e.hearFloor){F.c===K.hearer.cell&&Pt(R,K,K.hearer,F.c,k,z);const O=f.get(F.c);if(O)for(const lt of O)Pt(R,K,lt,F.c,k,z)}if(R.gen<e.maxGeneration){const O=s(F.c);if(c.sourceCalls++,O)for(const lt of O)B(R,K,F.c,lt,k,z,St,!1,ut);for(const lt of St.spoofs)lt.spoof.cell!==F.c||K.spoofed.has(lt.id)||(K.spoofed.add(lt.id),B(R,K,F.c,lt.spoof,k,z,Fu,!0,ut))}for(const O of it.neighbors){if(O.gate!==void 0&&ma(i,O.gate))continue;const lt=l(O.id);if(!lt||lt.solid)continue;const gt=R.settled.get(O.id);if(gt&&!gt.dead)continue;const It=z+Math.hypot(it.cx-lt.cx,it.cz-lt.cz)/R.speed,j=It-R.t0;if(j>R.life){R.burned=!0;continue}if(j>e.maxTime){R.cut??(R.cut="budget-time");continue}if(gt){if(gt.up)continue;gt.up=!0}else{const xt=R.best.get(O.id);if(xt!==void 0&&xt<=It)continue;R.best.set(O.id,It)}u.push({t:It,k:1,w:R.id,c:O.id,m:ut,o:!1,p:F.c,seq:++o}),R.pending++,c.pushes++}}}function rt(R){if(c.pops++,R.k===0){w.remove(R.mask),P("mask-expired",{t:R.t,maskId:R.mask.id});return}const F=p[R.w-1];F.pending--,!F.cancelled&&(Et(F,R),F.pending===0&&$(F,R.t))}function nt(R,{budgetMs:F=0}={}){const K=r+Math.max(0,R),z=K+e.lookahead,it=F>0?performance.now():0;let Z=0,ht=!1;for(;u.size&&u.peek().t<=z;){if(Z>=e.maxWorkPerAdvance){ht=!0;break}if(F>0&&(Z&63)===63&&performance.now()-it>=F){ht=!0;break}const St=u.pop();Z++,v=Math.max(v,St.t),rt(St)}return r=ht?Math.max(r,Math.min(K,v)):K,Tt(),ht||(v=Math.max(v,z)),{t:r,work:Z,behind:ht,active:x,solvedUntil:v}}function Tt(){for(const[R,F]of h)F.endT!=null&&F.endT<=r&&h.delete(R)}function _t(R,F={}){var k;let K=R;R&&typeof R=="object"&&(K=(k=i.cellAt(R.x,R.z))==null?void 0:k.id);const z=K==null?null:l(K);if(!z||z.solid)return null;const it=F.kind??"ping",Z=ml[it]??ml.ping,ht=Di[F.mode]?F.mode:"active",St={id:d.length+1,kind:it,mode:ht,origin:z.id,t0:r,owner:F.owner??null,speed:F.speed??Z.speed,echoed:new Set,spoofed:new Set,cells:0,echoes:0,hearer:{id:"origin",cell:z.id}};d.push(St);const ut=U(St,{gen:0,origin:z.id,t0:r,power:(F.power??Z.power)*Di[ht].power,env:Du[Z.env]});return P("wave-started",{t:r,waveId:ut.id,pingId:St.id,kind:it,mode:ht,loudness:Di[ht].loudness,cell:z.id,speed:St.speed,power:ut.power,lifespan:ut.life,owner:St.owner}),St.id}const Rt=R=>{var z;let F=R;R&&typeof R=="object"&&(F=(z=i.cellAt(R.x,R.z))==null?void 0:z.id);const K=F==null?null:l(F);return K&&!K.solid?K.id:null};function L(R,F){for(const K of S){if(F!=null&&K.pingId!==F||K.heardBy.has(R.id)||!K.wanted.has(R.id))continue;const z=K.settled.get(R.cell);!z||z.dead||z.t>r||z.strength<e.hearFloor||Pt(K,d[K.pingId-1],R,R.cell,z.strength,r)}}function X(R,F=null){const K=Rt(R);if(K==null)return!1;for(const z of d)F!=null&&z.id!==F||z.hearer.cell===K||(z.hearer.cell=K,L(z.hearer,z.id));return!0}function et(R,F){const K=Rt(F);if(K==null)return!1;let z=null;for(const it of f.values())for(const Z of it)Z.id===R&&(z=Z);return!z||z.cell===K?!!z:(V(R),z.cell=K,dt(z),L(z,null),!0)}function tt(R){const F=w.create(R,r);return F?(Number.isFinite(F.expiresAt)&&u.push({t:F.expiresAt,k:0,w:0,c:F.id,m:0,o:!1,mask:F,seq:++o}),P("mask-created",{t:r,maskId:F.id,mode:F.mode,opacity:F.opacity,cells:F.cells.size,duration:F.duration,detectability:w.tell(F),anchor:F.anchor,owner:F.owner}),F):null}function dt(R){const F=f.get(R.cell);F?F.push(R):f.set(R.cell,[R])}function V(R){for(const[F,K]of f){const z=K.filter(it=>it.id!==R);z.length?f.set(F,z):f.delete(F)}}(t.listeners??[]).forEach(dt);function zt({maxSeconds:R=120,step:F=.5}={}){let K=0;for(;x>0&&K<R;)nt(F),K+=F;return r}function vt({minMagnitude:R=0,debug:F=!1}={}){c.navCells=a.size;const K=new Map;for(const O of p)if(!(O.gen>0&&!F))for(const[lt,gt]of O.settled){const It=r-gt.t;if(It<0)continue;const j=ga(gt.strength,It,e),xt=K.get(lt);xt&&(xt.waves++,j<xt.magnitude||j===xt.magnitude&&O.gen>=xt.generation)||K.set(lt,{id:lt,arrival:gt.t,strength:gt.strength,magnitude:j,age:It,generation:O.gen,sourceId:O.sourceId,waveId:O.id,pingId:O.pingId,dist:(gt.t-O.t0)*O.speed,dead:gt.dead,masked:!1,waves:xt?xt.waves:1})}const z=[];for(const O of K.values())O.magnitude<R||(O.masked=w.isMasked(O.id,r),z.push(O));z.sort((O,lt)=>fs(O.id,lt.id));const it=new Map;for(const O of u.a){if(O.k!==1)continue;const lt=it.get(O.w);lt?lt.add(O.c):it.set(O.w,new Set([O.c]))}const Z=[],ht=[];for(const O of p){if(O.gen>0&&!F)continue;const lt=r-O.t0,gt={waveId:O.id,pingId:O.pingId,generation:O.gen,sourceId:O.sourceId,origin:O.origin,t0:O.t0,age:lt,radius:lt*O.speed,strength:O.power*tr(O.env,lt),power:O.power,cells:O.cells,done:O.done,reason:O.done?O.cut??(O.burned?"burnout":"frontier-empty"):null};ht.push(gt),O.done||Z.push({...gt,frontier:[...it.get(O.id)??[]].sort(fs)})}const St=e.echo.reveal==="live",ut=[];for(const O of M){if(O.returnTime>r)continue;const lt={...O,age:r-O.returnTime};F||delete lt.truth,ut.push(lt)}if(St)for(const O of h.values())O.emitTime>r||O.returnTime!=null&&O.returnTime<=r||ut.push({...Mt(O,r),age:r-O.emitTime,...F?{truth:O.truth}:{}});const k=ut.slice(-e.echoKeep),W={...c};F||(delete W.echoes,delete W.heard);const q={t:r,outgoing:{cells:z,fronts:Z},echoes:k,cells:z,fronts:Z,waves:ht,masks:w.all().map(O=>({id:O.id,mode:O.mode,opacity:w.opacityAt(O,r),baseOpacity:O.opacity,remaining:Math.max(0,O.expiresAt-r),cells:[...O.cells],anchor:O.anchor,detectability:w.tell(O,r),owner:O.owner,shape:O.shape})),stats:W};return F&&(q.hiddenEchoes=[...h.values()].filter(O=>O.returnTime==null||O.returnTime>r)),q}function At({all:R=!1}={}){const F=[],K=[];for(const z of g)if(z.t>r)K.push(z);else if(R)F.push(z);else if(!z.hidden)if(z.truth){const{truth:it,...Z}=z;F.push(Z)}else F.push(z);return g=K,F}function Ct(){const R=_.n;return{count:R,version:_.version,cell:_.cell.subarray(0,R),arrival:_.arrival.subarray(0,R),strength:_.strength.subarray(0,R),generation:_.gen.subarray(0,R),wave:_.wave.subarray(0,R),speed:_.speed.subarray(0,R),flags:_.flags.subarray(0,R)}}const Vt=R=>{let F=0,K=_.n;for(;F<K;){const z=F+K>>1;_.arrival[z]<R?F=z+1:K=z}return F};function ft(R,F=.5,K=3){const z=e.lookahead;return[Vt(R-y(K)-z),Vt(R+F+1e-9)]}function I(R,F,K=.5){const[z,it]=ft(F,K);for(let Z=z;Z<it;Z++)R[Z]=_.flags[Z]&5?0:ga(_.strength[Z],F-_.arrival[Z],e);return[z,it]}function C(R,F,K){const z=i.cellAt(R,F);if(!z||z.solid)return{intensity:0,cell:z?z.id:null,arrival:1/0};const it=l(z.id),Z=[it.id];for(const k of it.neighbors){if(k.gate!==void 0&&ma(i,k.gate))continue;const W=l(k.id);W&&!W.solid&&Z.push(k.id)}const ht=new Map;for(const k of Z){const W=E.get(k);if(!W)continue;const q=l(k),O=Math.hypot(R-q.cx,F-q.cz);for(const lt of W){if(_.flags[lt]&5)continue;const gt=_.arrival[lt]+O/_.speed[lt],It=ht.get(_.wave[lt]);(!It||gt<It.a)&&ht.set(_.wave[lt],{a:gt,i:lt})}}let St=0,ut=1/0;for(const[k,{a:W,i:q}]of ht){W<ut&&(ut=W);const O=p[k-1],lt=ga(_.strength[q]*(tr(O.env,W-O.t0)/tr(O.env,_.arrival[q]-O.t0)),K-W,e);lt>St&&(St=lt)}return{intensity:St,cell:it.id,arrival:ut}}return{advance:nt,runUntilIdle:zt,ping:_t,createMask:tt,removeMask:R=>{const F=w.get(R);F&&(w.remove(F),P("mask-expired",{t:r,maskId:R}))},isMasked:R=>w.isMasked(R,r),maskAt:R=>w.effects(R,r).masks.map(K=>({id:K.id,mode:K.mode,opacity:w.opacityAt(K,r)})),maskTell:R=>{const F=w.get(R);return F?w.tell(F,r):0},addListener:dt,removeListener:V,moveOrigin:X,moveListener:et,snapshot:vt,drainEvents:At,field:Ct,activeRange:ft,intensityRange:I,sampleAt:C,get solvedUntil(){return v},get time(){return r},get active(){return x},get stats(){return c.navCells=a.size,{...c}},config:e}}const xa=(i,t)=>Math.round(i*1e3)*2e8+Math.round(t*1e3);function Q_(i){const t=new Map,e=new Map;function n(r,o,a){const l=new Map([[o,r]]);for(const u of r.neighbors){const p=i(u.id);p&&l.set(u.id,p)}if(a){const u=[...l.values()];for(const p of u)for(const d of p.neighbors){if(l.has(d.id))continue;const f=i(d.id);f&&l.set(d.id,f)}}const c=new Map;for(const[u,p]of l)for(const d of p.poly){const f=xa(d[0],d[1]),g=c.get(f);g?g.includes(u)||g.push(u):c.set(f,[u])}return{near:l,at:c}}function s(r){const o=i(r);if(!o)return[];let{near:a,at:l}=n(o,r,!1);o.poly.some(u=>(l.get(xa(u[0],u[1]))??[]).length<3)&&({near:a,at:l}=n(o,r,!0));const c=[];for(const u of o.poly){const p=l.get(xa(u[0],u[1]));if(!p||p.length<3)continue;const d=p.length===3?p:p.map(f=>{const g=a.get(f);return{cid:f,a:Math.atan2(g.cz-u[1],g.cx-u[0])}}).sort((f,g)=>f.a-g.a).map(f=>f.cid);for(let f=1;f+1<d.length;f++){const g=[d[0],d[f],d[f+1]].sort((h,S)=>h-S),x=g.join("|");let m=t.get(x);m||t.set(x,m={ids:g,key:x}),c.includes(m)||c.push(m)}}return c}return{of(r){let o=e.get(r);return o||(o=s(r),o.length&&e.set(r,o)),o},get size(){return t.size},clear(){t.clear(),e.clear()}}}function Ou(i,{tris:t,cellOf:e,field:n,inside:s,speed:r=14,estimate:o=!0}){const a=new Set,l=[];for(const c of s)for(const u of t.of(c)){if(a.has(u))continue;a.add(u);const p=ty(u,i,e,n,r,o);p&&l.push(p)}return{chains:ey(l),segments:l.length,triangles:a.size}}function ty(i,t,e,n,s,r){const o=[];for(const _ of i.ids){const E=e(_);if(!E)return null;const A=!E.solid&&!n.blocked(_),b=A?n.value(_):void 0;o.push({id:_,c:E,open:A,v:b,k:A?n.strength(_):0,est:!1})}const a=o.filter(_=>_.open);if(a.length<2)return null;const l=a.filter(_=>_.v!==void 0);if(!l.length)return null;for(const _ of a){if(_.v!==void 0)continue;if(!r)return null;let E=1/0,A=0;for(const b of l){const y=b.v+Math.hypot(_.c.cx-b.c.cx,_.c.cz-b.c.cz)/s;y<E&&(E=y,A=b.k)}_.v=E,_.k=A,_.est=!0}const c=Math.max(...a.map(_=>_.v));for(const _ of o)_.open||(_.v=c,_.k=0);const u=o.map(_=>_.v<=t),p=u.filter(Boolean).length;if(p===0||p===3)return null;const d=[];for(let _=0;_<3;_++)for(let E=_+1;E<3;E++){if(u[_]===u[E])continue;const A=u[_]?o[_]:o[E],b=u[_]?o[E]:o[_];let y=(t-A.v)/(b.v-A.v);y=y<0?0:y>1?1:y,b.open||(y=Math.min(y,.5));const w=b.open?b.k:A.k;d.push({key:A.id<b.id?`${A.id}|${b.id}`:`${b.id}|${A.id}`,x:A.c.cx+(b.c.cx-A.c.cx)*y,z:A.c.cz+(b.c.cz-A.c.cz)*y,k:A.k+(w-A.k)*y,cell:A.id})}if(d.length!==2)return null;let f=0,g=0,x=0;for(let _=0;_<3;_++)u[_]&&(f+=o[_].c.cx,g+=o[_].c.cz,x++);f/=x,g/=x;const m=d[1].x-d[0].x,h=d[1].z-d[0].z,S=Math.hypot(m,h);let M=-h,v=m;S<1e-9&&(M=f-d[0].x,v=g-d[0].z);const T=Math.hypot(M,v)||1;return M/=T,v/=T,M*(f-d[0].x)+v*(g-d[0].z)<0&&(M=-M,v=-v),{a:d[0],b:d[1],nx:M,nz:v}}function ey(i){const t=new Map;i.forEach((l,c)=>{for(const u of[l.a,l.b]){let p=t.get(u.key);p||t.set(u.key,p=[]),p.push(c)}});const e=new Uint8Array(i.length),n=(l,c)=>l.a.key===c?l.b:l.a,s=(l,c)=>{for(const u of t.get(l)??[])if(!e[u]&&u!==c)return u;return-1},r=(l,c)=>{const u=[];let p=l,d=c;for(;;){const f=s(d,p);if(f<0)break;e[f]=1;const g=n(i[f],d);u.push({i:f,p:g}),d=g.key,p=f}return u},o=[],a=[...i.keys()].sort((l,c)=>t.get(i[l].a.key).length+t.get(i[l].b.key).length-(t.get(i[c].a.key).length+t.get(i[c].b.key).length));for(const l of a){if(e[l])continue;e[l]=1;const c=i[l],u=r(l,c.b.key),p=r(l,c.a.key),d=[],f=[];for(let h=p.length-1;h>=0;h--)d.push(p[h].p);d.push(c.a,c.b);for(const h of u)d.push(h.p);const g=[...p.map(h=>h.i).reverse(),l,...u.map(h=>h.i)];for(const h of g)f.push([i[h].nx,i[h].nz]);const x=d.length>3&&d[0].key===d[d.length-1].key;x&&d.pop();const m=d.map((h,S)=>{const M=f[Math.max(0,S-1)]??f[0],v=f[Math.min(f.length-1,S)]??f[0];let T=M[0]+v[0],_=M[1]+v[1];if(x&&S===0){const A=f[f.length-1];T=A[0]+f[0][0],_=A[1]+f[0][1]}const E=Math.hypot(T,_)||1;return{x:h.x,z:h.z,k:h.k,cell:h.cell,nx:T/E,nz:_/E}});o.push({pts:m,closed:x})}return o}function ny(i,t,e=80){const n=new Map,s=new Map;for(let c=0;c<i.count;c++)n.set(i.cell[c],i.dist[c]),s.set(i.cell[c],i.arrival[c]);let r=null,o=-1;for(const[c,u]of n)u>o&&(o=u,r=c);const a=[],l=new Set;for(let c=0;c<e&&r!=null&&!l.has(r);c++){l.add(r);const u=t(r);if(!u)break;a.push({x:u.cx,z:u.cz,t:s.get(r)});let p=null,d=n.get(r);for(const f of u.neighbors){const g=n.get(f.id);g!==void 0&&g<d&&(d=g,p=f.id)}r=p}return a}const Kh=3e3,iy=18,ku=Kh*iy,va=9,Bu=900,sy=2400,ry=120,Gu=16,Hu=48,oy=.02;function ay(i,t,e){const n=t*Math.min(e,1-e),s=r=>{const o=(r+i/30)%12;return e-n*Math.max(-1,Math.min(o-3,9-o,1))};return[s(0),s(8),s(4)]}const ly=[.25,.95,1],Ui=[[-.1,0],[0,1],[.35,.4],[1,0]];function cy({scene:i,map:t,seed:e=1,sources:n,options:s={}}){const r=J_(t,{seed:e,sources:n,...s}),o=L=>t.cell?t.cell(L):t.cells[L],a=Q_(o);let l=s.band??3.2;const c=s.waveBudgetMs??6,u={cooldown:s.cooldown??0,maxWaves:s.maxWaves??16},p=new Float32Array(ku*3),d=new Float32Array(ku*3),f=new _e;f.setAttribute("position",new Te(p,3).setUsage(rl)),f.setAttribute("color",new Te(d,3).setUsage(rl)),f.setDrawRange(0,0);const g=new Jt(f,je(new Pe({vertexColors:!0,transparent:!0,blending:He,side:Ae,toneMapped:!1,depthTest:!1}),{depthTest:!1}));g.material.depthTest=!1,g.renderOrder=9100,g.frustumCulled=!1,g.name="scan",i.add(g);let x=0,m=0;const h=new Map;let S=0,M=0,v=0,T=[],_=-1e9;const E=new WeakMap;let A=[];const b={frontMs:0,chains:0,segments:0,triangles:0,lastMs:0,field:0,pings:0,arrows:0,waves:0,stale:0,refused:0,fused:0};function y(L,X,et,tt,dt,V,zt,vt){const At=x*3;p[At]=L[0],p[At+1]=zt,p[At+2]=L[1],p[At+3]=X[0],p[At+4]=zt,p[At+5]=X[1],p[At+6]=et[0],p[At+7]=zt,p[At+8]=et[1];for(let Ct=0;Ct<3;Ct++){const Vt=Ct===0?tt:Ct===1?dt:V;d[At+Ct*3]=vt[0]*Vt,d[At+Ct*3+1]=vt[1]*Vt,d[At+Ct*3+2]=vt[2]*Vt}x+=3}function w(L,X,et,tt,dt,V){if(m>=Kh)return;const zt=Ge(o(L.cell))+.07,vt=(At,Ct)=>[At.x+At.nx*Ui[Ct][0]*V,At.z+At.nz*Ui[Ct][0]*V];for(let At=0;At+1<Ui.length;At++){const Ct=vt(L,At),Vt=vt(L,At+1),ft=vt(X,At),I=vt(X,At+1),C=tt*Ui[At][1],R=tt*Ui[At+1][1],F=dt*Ui[At][1],K=dt*Ui[At+1][1];y(Ct,Vt,ft,C,R,F,zt,et),y(ft,Vt,I,F,R,K,zt,et)}m++}function P(L,X,et){const tt=L.pts.length;for(let dt=0;dt+1<tt+(L.closed?1:0);dt++){const V=L.pts[dt],zt=L.pts[(dt+1)%tt];w(V,zt,X,Math.min(1.1,V.k)*et,Math.min(1.1,zt.k)*et,l)}}function U(L,X,et,tt,dt,V,zt,vt){const At=et-L,Ct=tt-X,Vt=Math.hypot(At,Ct)||1,ft=-Ct/Vt*dt*.5,I=At/Vt*dt*.5,C=[L+ft,X+I],R=[L-ft,X-I],F=[et+ft,tt+I],K=[et-ft,tt-I];y(C,R,F,zt,zt,zt,vt,V),y(F,R,K,zt,zt,zt,vt,V)}function H(L,X,et,tt){const dt=Ge(L)+.07,V=18;for(let zt=0;zt<V;zt++){const vt=zt/V*Math.PI*2,At=(zt+1)/V*Math.PI*2;U(L.cx+Math.cos(vt)*X,L.cz+Math.sin(vt)*X,L.cx+Math.cos(At)*X,L.cz+Math.sin(At)*X,.28,et,tt,dt)}}const $=(L,X,et)=>{let tt=0,dt=X;for(;tt<dt;){const V=tt+dt>>1;L[V]<et?tt=V+1:dt=V}return tt},G=new Set;function B(L){L.count<S&&(h.clear(),G.clear(),S=0);for(let X=S;X<L.count;X++){if(L.generation[X]!==0)continue;const et=L.wave[X];if(G.has(et))continue;let tt=h.get(et);tt||(tt={id:et,slotOf:new Map,slots:[],speed:L.speed[X]||14,last:L.arrival[X],strength:0,stamp:-1,chains:[],segments:0},h.set(et,tt),M=Math.max(0,M-1));const dt=L.cell[X],V=tt.slotOf.get(dt);(V===void 0||L.flags[V]&5&&!(L.flags[X]&5))&&tt.slotOf.set(dt,X),tt.slots.push(X),tt.last=L.arrival[X],L.flags[X]&5||(tt.strength=L.strength[X]*.9)}S=L.count}function N(L){for(const[X,et]of h){const tt=va/et.speed,dt=L-et.last;(dt>2*tt+.5||et.strength<oy&&dt>tt)&&(h.delete(X),G.add(X),b.fused++)}}const Q=(L,X,et)=>{let tt=0,dt=L.length;for(;tt<dt;){const V=tt+dt>>1;X[L[V]]<et?tt=V+1:dt=V}return tt};function st(L,X,et,tt){const dt=L.slotOf,V={value:Vt=>{const ft=dt.get(Vt);return ft===void 0||X.flags[ft]&5?void 0:X.arrival[ft]},strength:Vt=>{const ft=dt.get(Vt);return ft===void 0?0:X.strength[ft]*.9},blocked:Vt=>{const ft=dt.get(Vt);return ft!==void 0&&(X.flags[ft]&5)!==0}},zt=L.speed,vt=Q(L.slots,X.arrival,et-va/zt),At=Q(L.slots,X.arrival,et),Ct=[];for(let Vt=At-1;Vt>=vt&&Ct.length<tt;Vt--){const ft=L.slots[Vt];X.flags[ft]&5||Ct.push(X.cell[ft])}return Ou(et,{tris:a,cellOf:o,field:V,inside:Ct,speed:zt,estimate:!0})}function Mt(L={}){const X=L.cooldown??u.cooldown,et=L.maxWaves??u.maxWaves,tt=X>0?Math.max(0,X-(r.time-_)):0,dt=h.size+M;return tt>1e-9?{ok:!1,reason:"cooldown",left:tt,active:dt,max:et}:dt>=et?{ok:!1,reason:"waves",left:0,active:dt,max:et}:{ok:!0,reason:null,left:0,active:dt,max:et}}function Pt(L){let X=E.get(L);if(!X){const et=new Map,tt=new Map;for(let dt=0;dt<L.count;dt++)et.set(L.cell[dt],L.arrival[dt]),tt.set(L.cell[dt],L.strength[dt]);X={when:et,str:tt,path:null,arc:null,chev:null,rgb:ay(L.hue,.95,.6)},E.set(L,X)}return X}const Et=new Set,rt=new Set;let nt=null;function Tt(L,X){if(X.chev)return X.chev;if(X.path=ny(L,o),X.path.length<2)return null;X.arc=[0];for(let dt=1;dt<X.path.length;dt++)X.arc.push(X.arc[dt-1]+Math.hypot(X.path[dt].x-X.path[dt-1].x,X.path[dt].z-X.path[dt-1].z));const et=X.path[X.path.length-1].t-X.path[0].t,tt=et>0?X.arc[X.arc.length-1]/et*1.6:10;return X.chev=qh({parent:i,color:X.rgb,behind:Math.max(2,tt)}),X.chev.configure(nt??{}),X.chev.set(X.path,.09),Et.add(X),X.chev}function _t(L,X){const et=L.path;if(X<=et[0].t)return 0;for(let tt=1;tt<et.length;tt++)if(X<et[tt].t){const dt=(X-et[tt-1].t)/Math.max(1e-6,et[tt].t-et[tt-1].t);return L.arc[tt-1]+(L.arc[tt]-L.arc[tt-1])*dt}return L.arc[L.arc.length-1]}function Rt(L,X,et){const tt={value:vt=>X.when.get(vt),strength:vt=>(X.str.get(vt)??0)*.95,blocked:()=>!1},dt=$(L.arrival,L.count,et-va/(L.speed||14)),V=$(L.arrival,L.count,et),zt=[];for(let vt=V-1;vt>=dt&&zt.length<Bu;vt--)zt.push(L.cell[vt]);return Ou(et,{tris:a,cellOf:o,field:tt,inside:zt,speed:L.speed||14,estimate:!1})}return{sim:r,mesh:g,stats:b,tris:a,configure(L){if(L&&Number.isFinite(L.scanBand)&&(l=L.scanBand),L&&Number.isFinite(L.pingCooldown)&&(u.cooldown=Math.max(0,L.pingCooldown)),L&&Number.isFinite(L.pingMaxWaves)&&(u.maxWaves=Math.max(1,Math.round(L.pingMaxWaves))),L){nt=L;for(const X of Et)X.chev.configure(L)}},get band(){return l},get fronts(){return A},ping(L,X,et={}){if(!Mt(et).ok)return b.refused++,null;const dt=r.ping({x:L,z:X},et);return dt!=null&&(_=r.time,b.pings++,M++),dt},get pingState(){const L=Mt();return{ready:L.ok,reason:L.reason,left:L.left,active:L.active,max:L.max,cooldown:u.cooldown}},step(L,X=3){r.advance(L,{budgetMs:X});const et=r.drainEvents();for(const tt of et)tt.type==="echo-heard"&&tt.replay&&tt.replay.count&&T.push(tt);return T.length>Hu&&T.splice(0,T.length-Hu),et},update(){const L=performance.now(),X=r.time;x=0,m=0,A=[],b.chains=0,b.segments=0,b.triangles=0,b.arrows=0,rt.clear();const et=r.field();b.field=et.count,a.size>6e4&&a.clear(),B(et),N(X),b.waves=h.size,b.stale=0;for(let tt=T.length-1;tt>=0;tt--)X>T[tt].replay.endTime+8&&T.splice(tt,1);if(b.frontMs=0,h.size){const tt=[...h.values()],dt=Math.max(ry,Math.min(Bu,Math.floor(sy/tt.length))),V=tt.length>1?[...tt].sort((Ct,Vt)=>Ct.stamp-Vt.stamp):tt,zt=performance.now();let vt=0,At=0;for(const Ct of V){if(Ct.stamp>=0&&vt>0&&performance.now()-zt>=c){At++;continue}const Vt=st(Ct,et,X,dt);Ct.chains=Vt.chains,Ct.segments=Vt.segments,Ct.stamp=++v,vt++,b.triangles+=Vt.triangles}b.frontMs=performance.now()-zt,b.stale=At;for(const Ct of tt)A.push({kind:"wave",wave:Ct.id,chains:Ct.chains});for(let Ct=tt.length-1;Ct>=0;Ct--){for(const Vt of tt[Ct].chains)P(Vt,ly,.9);b.chains+=tt[Ct].chains.length,b.segments+=tt[Ct].segments}}for(const tt of T.length>Gu?T.slice(-Gu):T){const dt=tt.replay,V=Pt(dt),zt=Rt(dt,V,X);A.push({kind:"echo",chains:zt.chains});for(const vt of zt.chains)P(vt,V.rgb,.95);if(b.chains+=zt.chains.length,b.segments+=zt.segments,b.triangles+=zt.triangles,X>dt.latchTime-.2&&X<dt.endTime+5){const vt=Tt(dt,V);vt&&(vt.setHead(_t(V,X)),vt.update(X),rt.add(V),b.arrows+=vt.stats.glyphs)}if(X>dt.endTime){const vt=Math.max(0,Math.min(1,(dt.endTime+7-X)/3)),At=o(tt.glimpse.cell);At&&vt>0&&(H(At,.8+(X-dt.endTime)*.35,V.rgb,.9*vt),m+=6)}}for(const tt of Et)rt.has(tt)||(tt.chev.dispose(),tt.chev=null,Et.delete(tt));f.setDrawRange(0,x),f.attributes.position.needsUpdate=!0,f.attributes.color.needsUpdate=!0,g.visible=x>0,b.lastMs=performance.now()-L},dispose(){var L;for(const X of Et)(L=X.chev)==null||L.dispose();Et.clear(),i.remove(g),f.dispose(),g.material.dispose()}}}const Vu=.9,to=1.9,Wu=i=>i<.4?1:Math.max(0,(1-i)/.6);function uy({scene:i,state:t,now:e=()=>0,heightAt:n=()=>.05,avatarAt:s=()=>null}){const r=new Re;r.name="effects",i.add(r);let o=.38;const a=new Map,l=[new on(.7,.8,32),new Sn(.06,2.4,.06),new on(.95,1.05,48),new on(1.1,1.5,48),new on(1,1.4,32),new on(.36,.44,24),new on(.6,.78,24),new Sn(.04,to,.04)],[c,u,p,d,f,g,x,m]=l,h={trace:8382975,hint:10482687,halo:10149887,beacon:12577535,mark:16773280,hit:16777215},S={trace:.95,hint:.6,halo:.7,beacon:.7,mark:.95,hit:.95,post:.45},M={trace:.5,hint:.35,halo:.35,beacon:.3,mark:.35};function v(w,P=!1){const U=je(new Pe({color:new Wt(h[w]).multiplyScalar(1.5),transparent:!0,opacity:1,side:Ae,blending:He,toneMapped:!1}),{depthTest:!0});return U.depthWrite=!1,U.userData.decor=P,U}function T(w,P){const U=Bh(o),H=Math.max(0,Math.min(1,P));for(const{m:$,base:G,decor:B}of w){const N=Math.min(1,G*H*(B?U:1));$.opacity=N,$.visible=N>0}}const _=(w,P,U)=>{const H=new Jt(w,P);return H.renderOrder=U,H.frustumCulled=!1,H};function E(w,P,U,H){const $=P.x-w.x,G=P.z-w.z,B=Math.sqrt($*$+G*G);if(B<1e-4)return null;const N=-G/B*(U/2),Q=$/B*(U/2),st=new _e;return st.setAttribute("position",new oe([w.x+N,H,w.z+Q,w.x-N,H,w.z-Q,P.x-N,H,P.z-Q,P.x+N,H,P.z+Q],3)),st.setIndex([0,1,2,0,2,3]),st}const A={trace(w){const P=new Re,U=[],H=[],$=w.to.x-w.from.x,G=w.to.z-w.from.z,B=Math.sqrt($*$+G*G),N=B>1e-9?$/B:0,Q=B>1e-9?G/B:0,st=Math.min(Vu,B*.5),Mt=n(w.from.x,w.from.z)+.12,Pt={x:w.from.x+N*st,z:w.from.z+Q*st};if(B-st>.05){const Et=E(Pt,w.to,.34,Mt),rt=E(Pt,w.to,.08,Mt+.005);if(Et){const nt=v("trace",!0);H.push({m:nt,base:M.trace,decor:!0}),U.push(Et),P.add(_(Et,nt,Zt.TRAIL))}if(rt){const nt=v("trace");H.push({m:nt,base:S.trace}),U.push(rt),P.add(_(rt,nt,Zt.TRAIL))}}if(w.wall){const Et=-Q*.3,rt=N*.3,nt=w.wall,Tt=E({x:nt.x-Et,z:nt.z-rt},{x:nt.x+Et,z:nt.z+rt},.1,Mt+.01);if(Tt){const _t=v("hit");H.push({m:_t,base:S.hit}),U.push(Tt),P.add(_(Tt,_t,Zt.TRAIL))}}return{obj:P,mats:H,geos:U,fade:Et=>Wu((Et-w.t0)/(w.until-w.t0))}},hint(w){const P=new Re,U=[],H=[],$=n(w.from.x,w.from.z)+.1,G=w.to.x-w.from.x,B=w.to.z-w.from.z,N=Math.sqrt(G*G+B*B),Q=Math.min(Vu,N*.5),st=N>1e-9?{x:w.from.x+G/N*Q,z:w.from.z+B/N*Q}:w.from,Mt=E(st,w.to,.5,$),Pt=E(st,w.to,.1,$+.005);if(Mt){const Et=v("hint",!0);H.push({m:Et,base:M.hint,decor:!0}),U.push(Mt),P.add(_(Mt,Et,Zt.TRAIL))}if(Pt){const Et=v("hint");H.push({m:Et,base:S.hint}),U.push(Pt),P.add(_(Pt,Et,Zt.TRAIL))}return{obj:P,mats:H,geos:U,fade:Et=>Wu((Et-w.t0)/(w.until-w.t0)),pulse:Et=>.75+.25*Math.sin((Et-w.t0)*9)}},halo(w){const P=v("halo"),U=v("halo",!0),H=new Re,$=_(p,P,Zt.BEAM),G=_(d,U,Zt.BEAM);return $.rotation.x=G.rotation.x=-Math.PI/2,H.add($,G),{obj:H,mats:[{m:P,base:S.halo},{m:U,base:M.halo,decor:!0}],geos:[],fade:B=>Math.min(1,(w.until-B)/1),follow:()=>s(w.who)}},beacon(w){const P=v("beacon"),U=v("beacon"),H=v("beacon",!0),$=new Re,G=n(w.at.x,w.at.z),B=_(c,P,Zt.BEAM);B.rotation.x=-Math.PI/2,B.position.set(w.at.x,G+.1,w.at.z);const N=_(f,H,Zt.BEAM);N.rotation.x=-Math.PI/2,N.position.set(w.at.x,G+.09,w.at.z);const Q=_(u,U,Zt.BEAM);return Q.position.set(w.at.x,G+1.3,w.at.z),$.add(B,N,Q),{obj:$,mats:[{m:P,base:S.beacon},{m:U,base:S.post},{m:H,base:M.beacon,decor:!0}],geos:[],fade:st=>Number.isFinite(w.until)?Math.min(1,(w.until-st)/1):1}},mark(w){const P=v("mark"),U=v("mark"),H=v("mark",!0),$=new Re,G=n(w.x,w.z),B=_(g,P,Zt.MARKERS);B.rotation.x=-Math.PI/2,B.position.set(w.x,G+to,w.z);const N=_(x,H,Zt.MARKERS);N.rotation.x=-Math.PI/2,N.position.set(w.x,G+to-.02,w.z);const Q=_(m,U,Zt.MARKERS);return Q.position.set(w.x,G+to/2,w.z),$.add(B,N,Q),{obj:$,mats:[{m:P,base:S.mark},{m:U,base:S.post},{m:H,base:M.mark,decor:!0}],geos:[],fade:()=>1}}};function b(w,P){const U=A[w](P);if(!U)throw new Error(`effectsView: no view for '${w}'`);return r.add(U.obj),U}function y(w){r.remove(w.obj);for(const{m:P}of w.mats)P.dispose();for(const P of w.geos)P.dispose()}return{group:r,get count(){return a.size},setGlow(w){Number.isFinite(w)&&(o=w)},update(){const w=e();t.prune(w);const P=new Set,U=(H,$,G)=>{const B=`${H}:${$}`;P.add(B);let N=a.get(B);if(N||(N=b(H,G),a.set(B,N)),N.follow){const st=N.follow();st&&N.obj.position.set(st.x,n(st.x,st.z)+.12,st.z)}let Q=N.fade(w);N.pulse&&(Q*=N.pulse(w)),T(N.mats,Q)};for(const H of t.marks)U("mark",H.id,H);for(const H of t.fx)U(H.kind,H.id,H);for(const[H,$]of a)P.has(H)||(y($),a.delete(H))},dispose(){for(const w of a.values())y(w);a.clear();for(const w of l)w.dispose();i.remove(r)}}}function Sy({canvas:i,map:t,seed:e=1,streamed:n=!0,fog:s=!0,mode:r="chase",embedded:o=!1,focus:a,storage:l,settings:c,onHover:u,onSelect:p,onStatus:d}){var b,y;const f=C_({canvas:i,map:t,mode:r,fog:s,embedded:o,focus:a,makeBoard:n?({map:w,cut:P})=>U_({map:w,cut:P}):void 0,onHover:u,onSelect:p});n&&f.board.settle(t.startCell.cx,t.startCell.cz,30);const g=Rf(t,{spawnCell:t.startCell,seed:e}),x=tf({seed:e}),m=u_(l);c&&m.set(c),f.rig.bindKeys(()=>m.keys()),m.subscribe(w=>f.applySettings(w));let h=null;const S=P_({stage:f,actors:g,canvas:f.renderer.domElement,embedded:o,shows:(w,P,U)=>h?h.shows(w,P,U):!0,onStatus:d,keys:()=>m.keys()});h=s?Y_({map:t,stage:f}):null,h&&(f.setKnowledge((w,P)=>h.knows(w,P)),(y=(b=f.board).setShows)==null||y.call(b,(w,P,U)=>h.shows(w,P,U))),m.subscribe(w=>{var P,U;h==null||h.configure(w),(U=(P=f.board).configure)==null||U.call(P,w)});const M=cy({scene:f.scene,map:t,seed:e});m.subscribe(w=>M.configure(w));const v=Df(),T=If({session:x,state:v,ports:{world:g.world,knows:(w,P)=>h?h.knows(w,P):!0,pingState:()=>M.pingState,ping:(w,P,U)=>E(w,P,U),move:(w,P)=>w==="avatar"?g.commandAvatarTo(P.x,P.z):{ok:!1,reason:"no-route"},posOf:w=>{const P=g.snapshot()[w],U=P.render??P;return{x:U.x,z:U.z}},cellAt:w=>(t.cell?t.cell(w):t.cells[w])??null}}),_=uy({scene:f.scene,state:v,now:()=>x.vitals.t,heightAt:(w,P)=>Ge(g.world.locate(w,P)),avatarAt:w=>{const P=g.snapshot()[w],U=(P==null?void 0:P.render)??P;return U?{x:U.x,z:U.z}:null}});m.subscribe(w=>_.setGlow(w.glow)),f.on("frame",(w,P)=>{const U=g.snapshot(),H=$=>{const G=U[$],B=G.render??G;return{id:$,x:B.x,z:B.z}};if(h==null||h.update([H("avatar"),H("companion")],P,w),!S.paused){const $=M.step(w);$.length&&(h==null||h.noteScan(T.filterScan($)))}M.update(),_.update()});function E(w,P,U={}){const H=T.boost(),$=M.ping(w,P,H?{...U,speed:ml.ping.speed*H}:U);return $!=null&&H&&T.spendBoost(),$}const A=()=>{const w=g.snapshot().avatar,P=w.render??w;return E(P.x,P.z)};return S.bind("ping",A),{map:t,seed:e,streamed:n,stage:f,board:f.board,actors:g,settings:m,play:S,fogView:h,scanView:M,session:x,effects:T,ping:A,dispose(){S.dispose(),T.dispose(),_.dispose(),x.dispose(),M.dispose(),h==null||h.dispose(),f.dispose()}}}const eo=1e7;function by(i,{world:t,worldOptions:e,start:n=[0,0]}={}){const s=t??of(i,e),{field:r,coarse:o}=s,a=[],l=new Map,c=[],u=new Map,p=[],d=new Set,f={navMs:0,navN:0,cutMs:0,cutN:0,maxMs:0},g=(_,E)=>`${_},${E}`,x={seed:i,world:s,tileset:s,sectors:a,cells:c,gates:p,terrain:s.cfg,contours:[],sectorEdges:[],cuts:[],bounds:{x0:-eo,z0:-eo,x1:eo,z1:eo},stats:f};x.cell=_=>Number.isInteger(_)?c[_]??null:null,x.cellById=x.cell,x.gateLocked=_=>{var E;return!!((E=p[_])!=null&&E.locked)};function m(_,E){const A=performance.now(),b=E(),y=performance.now()-A;return f[`${_}Ms`]+=y,f[`${_}N`]++,f.maxMs=Math.max(f.maxMs,y),b}function h(_,E){for(const A of _.nav.portals){if(A.q[0]!==E.u||A.q[1]!==E.v)continue;const b=`${_.key}>${E.key}#${A.slot}`;if(d.has(b))continue;d.add(b);const y=c[_.base+A.cell],w=c[u.get(`${A.partner[0]},${A.partner[1]}`)];if(!y||!w)continue;const P=Math.abs(A.edge.a[0]-A.edge.b[0]),U=Math.abs(A.edge.a[1]-A.edge.b[1]),H=A.span.reduce((N,Q)=>N+Q.len,0),$=[A.span.reduce((N,Q)=>N+Q.mid[0]*Q.len,0)/H,A.span.reduce((N,Q)=>N+Q.mid[1]*Q.len,0)/H],G={id:p.length,a:y.id,b:w.id,sa:_.id,sb:E.id,mid:$,len:H,horiz:U>=P,slot:A.slot,locked:A.locked,edge:A.edge,span:A.span,faces:A.faces,soft:A.soft,cells:[],kind:A.kind,visible:A.visible,axis:A.axis,normal:A.normal},B=[...A.span].sort((N,Q)=>(Q.mid===A.edge.mid?1:0)-(N.mid===A.edge.mid?1:0));for(const N of B){const Q=c[_.base+N.cell],st=c[u.get(`${N.partner[0]},${N.partner[1]}`)];!Q||!st||Q.neighbors.some(Mt=>Mt.id===st.id)||(Q.neighbors.push({id:st.id,mid:N.mid,len:N.len,gate:G.id}),st.neighbors.push({id:Q.id,mid:N.mid,len:N.len,gate:G.id}),G.cells.push([Q.id,st.id]))}p.push(G),_.gates.push(G),E.gates.push(G)}}function S(_,E){const A=g(_,E);let b=l.get(A);if(b)return b;const y=m("nav",()=>s.nav(_,E));b={id:a.length,u:_,v:E,key:A,clearance:y.info.clearance,name:A,base:c.length,cellIds:[],nav:y,gates:[],cut:!1,kind:"",render:null,rect:null},a.push(b),l.set(A,b);let w=1/0,P=1/0,U=-1/0,H=-1/0;for(const $ of y.cells){for(const[B,N]of $.poly)w=Math.min(w,B),P=Math.min(P,N),U=Math.max(U,B),H=Math.max(H,N);const G={id:c.length,sector:b.id,clearance:b.clearance,local:$.local,solid:y.solid[$.local],poly:$.poly,cx:$.cx,cz:$.cz,area:$.area,radius:$.radius,sides:$.sides,i:$.i,j:$.j,neighbors:[],cache:0};c.push(G),u.set(`${$.i},${$.j}`,G.id),b.cellIds.push(G.id)}b.rect={x0:w,z0:P,x1:U,z1:H};for(const $ of y.cells)for(const G of $.nbl){if(G.j<$.local)continue;const B=c[b.base+$.local],N=c[b.base+G.j];B.neighbors.push({id:N.id,mid:G.mid,len:G.len}),N.neighbors.push({id:B.id,mid:G.mid,len:G.len})}for(const $ of Object.values(af)){const G=l.get(g(_+$[0],E+$[1]));G&&(ql([b.u,b.v],[G.u,G.v])<=0?h(b,G):h(G,b))}return b}function M(_,E){if(!s.cfg.borders.openCross)return;const A=new Set(E.gapEdges);for(const b of _.nav.cells)if(!_.nav.solid[b.local])for(const y of b.ext){const w=l.get(g(y.u,y.v));if(!w||ql([_.u,_.v],[w.u,w.v])>0)continue;const P=o.border([_.u,_.v],[w.u,w.v]).mode;if(P!=="open"&&P!=="wall"||P==="wall"&&!A.has(Xu(y.a,y.b)))continue;const U=u.get(`${y.i},${y.j}`);if(U===void 0||c[U].solid)continue;const H=c[_.base+b.local],$=c[U];H.neighbors.some(G=>G.id===$.id)||(H.neighbors.push({id:$.id,mid:y.mid,len:y.len,open:!0}),$.neighbors.push({id:H.id,mid:y.mid,len:y.len,open:!0}))}}const v=_=>s.sectorGeo(_.u,_.v).nbrs.filter(E=>o.inBounds(E.u,E.v));function T(_){if(_.cut)return _;for(const E of v(_))S(E.u,E.v);return m("cut",()=>{const E=s.render(_.u,_.v);for(const w of E.cuts??[]){const P=c[_.base+w.local];P.cut={poly:w.poly,open:w.open},x.cuts.push({cell:P.id,poly:w.poly,open:w.open})}const A=w=>S(w.u,w.v).base+w.local,b=s.detail(_.u,_.v);_.kind=b.kind;for(const w of b.caches){const P=c[_.base+w.cell];!P.role&&!P.solid&&(P.cache=w.amount)}const y=w=>w?S(w[0],w[1]).id:-1;_.render={contours:E.contours.map(w=>({a:w.a,b:w.b,solid:A(w.solid),open:A(w.open),...w.sliver?{sliver:!0}:{}})),sectorEdges:E.sectorEdges.map(w=>({a:w.a,b:w.b,sa:_.id,sb:y(w.sb),...w.sliver?{sliver:!0}:{},...w.open?{open:!0}:{},...w.gap?{gap:!0}:{}})),borderLines:E.borderLines.map(w=>({...w,sa:_.id,sb:y(w.sb)})),openings:E.openings.map(w=>({...w,sa:_.id,sb:y(w.sb)})),gapEdges:E.gapEdges},M(_,E)}),_.cut=!0,_}x.cellAt=(_,E)=>{const[A,b]=r.cellAtPoint(_,E);let y=u.get(`${A},${b}`);if(y===void 0){const[w,P]=r.sectorOf(A,b);S(w,P),y=u.get(`${A},${b}`)}return y===void 0?null:c[y]},x.sectorAt=(_,E)=>{const A=x.cellAt(_,E);return A?a[A.sector]:null},x.sectorIndexAt=(_,E)=>r.sectorOf(...r.cellAtPoint(_,E)),x.sector=S,x.prepare=T,x.has=(_,E)=>l.get(g(_,E)),x.chunkView=_=>{const E=[];for(const y of[_,...v(_).map(w=>l.get(g(w.u,w.v)))])if(y)for(const w of y.cellIds)E.push(c[w]);const A=_.cellIds.map(y=>c[y]),b=x.startCell;return{cells:A,edgeCells:E,gates:_.gates,drawsGate:y=>y.sa===_.id,sectors:a,cellById:x.cell,sectorEdges:_.render.sectorEdges,contours:_.render.contours,sectorLines:_.render.borderLines,sectorOpenings:_.render.openings,gapEdges:_.render.gapEdges,startCell:b,beacons:b&&b.sector===_.id?[[b,8256767,0,2.4,.5]]:[]}};{const _=T(S(n[0],n[1])),E=_.nav.cells[_.nav.seedLocal??0];let A=null,b=1/0;for(const y of _.cellIds){const w=c[y];if(w.solid)continue;const P=Math.hypot(w.cx-E.cx,w.cz-E.cz)-w.radius*.5;P<b&&(b=P,A=w)}A.role="start",x.startCell=A}return x.coarse=o,x}export{Us as A,Mn as D,_y as G,Yr as R,Vl as S,Wl as T,Gl as a,vy as b,$v as c,Eo as d,Vh as e,yy as f,dl as g,pl as h,gy as i,My as j,fl as k,my as l,by as m,Sy as n,Fv as o,kv as p,Rn as q,xy as r,u_ as s};
