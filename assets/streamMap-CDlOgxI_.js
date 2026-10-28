import{m as Ah}from"./rng-BKYMqjzS.js";import{C as pe,a as gi,h as Rh}from"./palette-DlZOkp1f.js";import{i as Mu,R as li,d as Ch,D as Ph,e as Tl}from"./liveConfig-DDfv6sir.js";const mn={tick:1/60,maxFrame:.25,collision:{maxStep:.2,maxSubsteps:96,iterations:4,skin:.01},avatar:{radius:.45,speed:5.6,runSpeed:8.4,accel:26,decel:34,turnRate:14},companion:{radius:.4,speed:5.9,catchupSpeed:8.8,accel:26,decel:34,turnRate:12},facing:{minSpeed:.5,tau:.07},route:{reach:.45,arriveTol:.35,margin:.06,cornerFloor:.4,cornerLook:1.4,stuckTime:.9,stuckGain:.3,pullMargin:.1,pullStep:.35,pullLook:7,blendTime:.35,cornerMargin:.3,cornerPush:1,cornerRing:12,cornerStep:.1,cornerTurn:.2,doorCentreWidth:3.6,doorTol:.25,doorBudget:1.2,doorLead:.7,doorTurn:1,tidyLine:.12,tidySpike:1.9,tidyShort:.8,smooth:{passes:6,arc:1.25,hookTurn:.9,maxTurn:1.15,round:1,legShare:.45,minLeg:.7,outward:[0,.2,.4,.6],minGain:.1,lenSlack:.02,clearSlack:.02},look:.9,lookSpeed:.22,lookMax:2.2,passRadius:1},follow:{distance:3.4,lateral:1.6,start:5.2,stop:3.6,catchup:10,doorClear:2.2,doorWidth:3.6,wallClear:.3,reslot:.5,blinkDistance:42,lead:.9,replanDist:1.8,reslotMax:1.4,farScale:12,searchStep:150,searchMax:12e3,retry:1.5,slotBudget:260},patrol:{dwell:1.2,maxWaypoints:12},react:{dwell:1.5,face:1.2,giveUp:14},separation:{gap:.15,push:4.5},recovery:{window:5},triggers:{maxRules:32,maxFiresPerTick:4,repeat:2,maxSignals:32},noise:{run:9,runEvery:.6},events:{max:512}},js=(i,t,e)=>i<t?t:i>e?e:i;function er(i,t,e){let n=!1;for(let s=0,r=i.length-1;s<i.length;r=s++){const o=i[s][0],a=i[s][1],l=i[r][0],c=i[r][1];a>e!=c>e&&t<(l-o)*(e-a)/(c-a)+o&&(n=!n)}return n}const Hs=(i,t,e,n,s,r)=>(e-i)*(r-t)-(n-t)*(s-i);function vs(i,t){let e=(t-i)%(Math.PI*2);return e>Math.PI?e-=Math.PI*2:e<=-Math.PI&&(e+=Math.PI*2),e}function Lh(i,t,e){const n=vs(i,t);return Math.abs(n)<=e?t:i+Math.sign(n)*e}function uo(i,t,e,n,s,r){const o=s-e,a=r-n,l=o*o+a*a,c=l>0?js(((i-e)*o+(t-n)*a)/l,0,1):0;return Math.hypot(i-(e+c*o),t-(n+c*a))}const Dh=mn;class Al{constructor(t,e,n){this.id=t,this.x=n.x,this.z=n.z,this.heading=0,this.vx=0,this.vz=0,this.speed=0,this.radius=e.radius,this.cell=n.cell,this.moving=!1,this.controlled=!1,this.touching=!1,this.sliver=!1,this.px=n.x,this.pz=n.z,this.pheading=0,this.spec=e,this.accel=e.accel,this.decel=e.decel,this.world=null,this._route=null,this._want={x:0,z:0},this._blocked=0,this._blockedFired=!1,this._aim=null,this._face=null}step(t,e,n,s,r){const o=s-this.vx,a=r-this.vz,l=Math.hypot(o,a),c=Math.hypot(s,r),u=Math.hypot(this.vx,this.vz),d=(c>=u-1e-6?this.accel:this.decel)*n;l<=d?(this.vx=s,this.vz=r):(this.vx+=o/l*d,this.vz+=a/l*d),this._want.x=s,this._want.z=r;const{maxStep:p,maxSubsteps:h}=Dh.collision,g=Math.hypot(this.vx,this.vz)*n,x=Math.min(h,Math.max(1,Math.ceil(g/Math.min(p,this.radius*.4)))),m=n/x,f={x:0,z:0},S=[];let b=!1,v=0;e.substeps+=x;for(let w=0;w<x;w++){const E=this.x,y=this.z,M=t.cell(this.cell);if(!M){this.vx=0,this.vz=0;break}f.x=E+this.vx*m,f.z=y+this.vz*m,S.length=0;const A=t.resolve(f,this.radius,t.near(M),S),G=t.locate(f.x,f.z,this.cell);if(!G||t.blocked(G,f.x,f.z)){e.violations++,this.vx=0,this.vz=0,b=!0;continue}if(this.x=f.x,this.z=f.z,this.sliver=G.solid,G.solid||(this.cell=G.id),A){b=!0,e.contacts++;for(let H=0;H<S.length;H+=2){const j=this.vx*S[H]+this.vz*S[H+1];j<0&&(this.vx-=j*S[H],this.vz-=j*S[H+1])}}v+=Math.hypot(this.x-E,this.z-y)}this.touching=b,this.speed=Math.hypot(this.vx,this.vz),this.moving=this.speed>.15;const T=Math.hypot(s,r),_=n>0?v/n:0;T>1&&_<T*.3?this._blocked+=n:(this._blocked=0,this._blockedFired=!1)}face(t,e,n=0){const s=this.spec.turnRate*t;if(!(n>0)){this.heading=Lh(this.heading,e,s);return}const r=vs(this.heading,e),o=Math.min(s,Math.abs(r)*(1-Math.exp(-t/n)));this.heading+=Math.sign(r)*o}teleport(t){this.x=t.x,this.z=t.z,this.cell=t.cell,this.px=t.x,this.pz=t.z,this.pheading=this.heading,this.vx=this.vz=this.speed=0,this.moving=!1,this._route=null}pub(){return{id:this.id,x:this.x,z:this.z,heading:this.heading,vx:this.vx,vz:this.vz,speed:this.speed,radius:this.radius,cell:this.cell,moving:this.moving,controlled:this.controlled,touching:this.touching,sliver:this.sliver,prev:{x:this.px,z:this.pz,heading:this.pheading}}}}const ho=.03,Ih=.6,Rl=1.2,Uh=2;class zh{constructor(t){this.nav=t,this.infos=new Map,this.nears=new Map,this.solids=new Map,this.doorLists=new Map,this.doorNears=new Map,this.usables=new Map}cell(t){const e=this.nav;return(e.cell?e.cell(t):e.cells[t])??null}live(t){return this.cell(t)!==null}purge(){var t;for(const e of[this.infos,this.nears,this.solids,this.doorLists,this.doorNears,this.usables])(t=e==null?void 0:e.clear)==null||t.call(e)}gateLocked(t){var n,s;const e=this.nav;return e.gateLocked?!!e.gateLocked(t):!!((s=(n=e.gates)==null?void 0:n[t])!=null&&s.locked)}locate(t,e,n){if(n!=null){const s=this.cell(n);if(s&&er(s.poly,t,e))return s;if(s)for(const r of s.neighbors){const o=this.cell(r.id);if(o&&er(o.poly,t,e))return o}}return this.nav.cellAt(t,e)??null}blocked(t,e,n){return t.solid?t.cut?er(t.cut.poly,e,n):!0:!1}solidWalls(t){let e=this.solids.get(t.id);if(e)return e;const n=t.cut?t.cut.poly:t.poly,s=n.length;let r=0;for(let u=0;u<s;u++){const d=n[u],p=n[(u+1)%s];r+=d[0]*p[1]-p[0]*d[1]}const o=r>=0?1:-1,a=[];let l=!1;for(const u of t.neighbors){const d=this.cell(u.id);d?d.solid&&a.push(d.poly):l=!0}const c=(u,d)=>{for(const p of a)for(let h=0;h<p.length;h++){const g=p[h],x=p[(h+1)%p.length];if(uo(u,d,g[0],g[1],x[0],x[1])<ho)return!0}return!1};e=[];for(let u=0;u<s;u++){const d=n[u],p=n[(u+1)%s],h=p[0]-d[0],g=p[1]-d[1],x=Math.hypot(h,g);x<1e-6||c((d[0]+p[0])/2,(d[1]+p[1])/2)||e.push({ax:d[0],az:d[1],bx:p[0],bz:p[1],nx:o*g/x,nz:-o*h/x,gate:void 0})}return l||this.solids.set(t.id,e),e}info(t){let e=this.infos.get(t.id);if(e)return e;const n=t.poly,s=n.length,r=[];for(let p=0;p<s;p++){const h=n[p],g=n[(p+1)%s],x=g[0]-h[0],m=g[1]-h[1],f=Math.hypot(x,m);if(f<1e-6)continue;let S=-m/f,b=x/f;(t.cx-h[0])*S+(t.cz-h[1])*b<0&&(S=-S,b=-b),r.push({ax:h[0],az:h[1],bx:g[0],bz:g[1],dx:x/f,dz:m/f,L:f,nx:S,nz:b,open:!1,gate:null})}const o=new Array(t.neighbors.length).fill(null),a=[],l=(p,h)=>{let g=null,x=1/0;for(const m of r){const f=(p[0]-m.ax)*m.dx+(p[1]-m.az)*m.dz;if(f<-h||f>m.L+h)continue;const S=Math.abs((p[0]-m.ax)*-m.dz+(p[1]-m.az)*m.dx);S<x&&(x=S,g={e:m,t:f})}return g&&x<=h?g:null};let c=!1;t.neighbors.forEach((p,h)=>{const g=this.cell(p.id);if(!g){c=!0;return}if(g.solid){const x=l(p.mid,ho);x&&(x.e.solidBacked=!0);return}if(p.gate===void 0){const x=l(p.mid,ho);if(!x){a.push(h);return}x.e.open=!0;const m=x.e;o[h]={x0:m.ax,z0:m.az,x1:m.bx,z1:m.bz,w:m.L,gate:void 0}}else{const x=l(p.mid,Ih);if(!x){a.push(h);return}const m=x.e,f=(p.len??2.4)/2,S=Math.max(0,x.t-f),b=Math.min(m.L,x.t+f);(m.gate??(m.gate=[])).push({k:h,t0:S,t1:b,id:p.gate}),o[h]={x0:m.ax+m.dx*S,z0:m.az+m.dz*S,x1:m.ax+m.dx*b,z1:m.az+m.dz*b,w:Math.max(0,b-S),gate:p.gate,merged:!1}}});const u=[],d=(p,h,g,x)=>{g-h<1e-4||u.push({ax:p.ax+p.dx*h,az:p.az+p.dz*h,bx:p.ax+p.dx*g,bz:p.az+p.dz*g,nx:p.nx,nz:p.nz,gate:x})};for(const p of r)if(!(p.open||p.solidBacked))if(p.gate){const h=p.gate.slice().sort((x,m)=>x.t0-m.t0);let g=0;for(const x of h)d(p,g,x.t0,void 0),d(p,x.t0,x.t1,x.id),g=Math.max(g,x.t1);d(p,g,p.L,void 0)}else d(p,0,p.L,void 0);return e={walls:u,portals:o,unmatched:a,edges:r},c||this.infos.set(t.id,e),e}portal(t,e){const n=this.info(t).portals[e];if(!n)return null;if(n.gate!==void 0&&!n.merged){n.merged=!0;const s=t.neighbors[e],r=this.cell(s.id);if(!r)return null;const o=this.info(r),a=r.neighbors.findIndex(v=>v.gate===s.gate&&v.id===t.id),l=a>=0?o.portals[a]:null;if(!l)return n.w=0,n;const c=n.x1-n.x0,u=n.z1-n.z0,d=Math.hypot(c,u)||1,p=c/d,h=u/d,g=(l.x0-n.x0)*p+(l.z0-n.z0)*h,x=(l.x1-n.x0)*p+(l.z1-n.z0)*h,m=Math.max(0,Math.min(g,x)),f=Math.min(d,Math.max(g,x)),S=n.x0,b=n.z0;n.x0=S+p*m,n.z0=b+h*m,n.x1=S+p*Math.max(m,f),n.z1=b+h*Math.max(m,f),n.w=Math.max(0,f-m)}return n}near(t){let e=this.nears.get(t.id);if(e)return e;const n=new Set([t.id]),s=[t];let r=[t],o=!1;for(let a=0;a<Uh;a++){const l=[];for(const c of r)for(const u of c.neighbors){if(n.has(u.id))continue;n.add(u.id);const d=this.cell(u.id);if(!d){o=!0;continue}s.push(d),l.push(d)}r=l}e=[];for(const a of s)for(const l of a.solid?this.solidWalls(a):this.info(a).walls)e.push(l);return o||this.nears.set(t.id,e),e}resolve(t,e,n,s){const{iterations:r,skin:o}=mn.collision,a=e+o;let l=0;for(let c=0;c<r;c++){let u=!1;for(const d of n){if(d.gate!==void 0&&!this.gateLocked(d.gate))continue;const p=d.bx-d.ax,h=d.bz-d.az,g=p*p+h*h,x=g>0?Math.min(1,Math.max(0,((t.x-d.ax)*p+(t.z-d.az)*h)/g)):0,m=d.ax+x*p,f=d.az+x*h,S=t.x-m,b=t.z-f,v=S*S+b*b,T=(t.x-d.ax)*d.nx+(t.z-d.az)*d.nz;if(v>=a*a||T<0&&x>0&&x<1)continue;const _=Math.sqrt(v);let w,E,y;_>1e-9?(w=S/_,E=b/_,y=a-_):(w=d.nx,E=d.nz,y=a),t.x+=w*y,t.z+=E*y,u=!0,l++,s&&s.push(w,E)}if(!u)break}return l}wallDist(t,e,n,s=!1){let r=1/0;for(const o of this.near(n)){if(o.gate!==void 0&&(s||!this.gateLocked(o.gate)))continue;const a=uo(t,e,o.ax,o.az,o.bx,o.bz);a<r&&(r=a)}return r}openNear(t,e,n){let s=null,r=1/0;for(const o of t.neighbors){const a=this.cell(o.id);if(!a||a.solid)continue;let l=er(a.poly,e,n)?0:1/0;if(l!==0)for(let c=0;c<a.poly.length;c++){const u=a.poly[c],d=a.poly[(c+1)%a.poly.length];l=Math.min(l,uo(e,n,u[0],u[1],d[0],d[1]))}(l<r-1e-9||Math.abs(l-r)<=1e-9&&s&&a.id<s.id)&&(r=l,s=a)}return s}walkClear(t,e,n,s,r,o,a=!1){const l=r+mn.route.pullMargin,c=r-.005,u=Math.hypot(n-t,s-e),d=Math.max(1,Math.ceil(u/mn.route.pullStep));let p=o;for(let h=0;h<=d;h++){const g=h/d,x=t+(n-t)*g,m=e+(s-e)*g,f=this.locate(x,m,p);if(!f||this.blocked(f,x,m))return!1;p=f.id;const S=g*u<.6||(1-g)*u<.6;if(this.wallDist(x,m,f,a)<(S?c:l))return!1}return!0}settle(t,e,n,s=0){const r=[[0,0]];for(const o of[.6,1.2,2,3,4.5])for(let a=0;a<8;a++){const l=a/8*Math.PI*2+o;r.push([Math.cos(l)*o,Math.sin(l)*o])}for(const[o,a]of r){const l={x:t+o,z:e+a};let c=this.locate(l.x,l.z);if(!(!c||c.solid)&&(this.resolve(l,n+s,this.near(c),null),c=this.locate(l.x,l.z,c.id),!(!c||c.solid)&&this.wallDist(l.x,l.z,c)>=n-.02))return{x:l.x,z:l.z,cell:c.id}}return null}usable(t,e,n){const s=e+"@"+n;let r=this.usables.get(t.id);if(r||this.usables.set(t.id,r=new Map),r.has(s))return r.get(s);let o=null;const a=this.portal(t,e);if(a&&a.w>0){const l=n+mn.route.margin,c=Math.max(4,Math.min(40,Math.ceil(a.w/.15))),u=a.x1-a.x0,d=a.z1-a.z0;let p=null,h=null;for(let g=0;g<=c;g++){const x=g/c,m=a.x0+u*x,f=a.z0+d*x;this.wallDist(m,f,t,!0)>=l?(h?h.e=g:h={s:g,e:g},(!p||h.e-h.s>p.e-p.s)&&(p=h)):h=null}p&&(o={x0:a.x0+u*p.s/c,z0:a.z0+d*p.s/c,x1:a.x0+u*p.e/c,z1:a.z0+d*p.e/c,w:Math.hypot(u,d)*(p.e-p.s)/c,gate:a.gate})}return r.set(s,o),o}passable(t,e,n){return!!this.usable(t,e,n)}doorsOf(t){let e=this.doorLists.get(t.id);if(e)return e;if(e=[],t.solid)return this.doorLists.set(t.id,e),e;const n=this.info(t),s=(r,o)=>this.wallDist(r,o,t,!0)<Rl;return t.neighbors.forEach((r,o)=>{const a=n.portals[o];if(!a)return;const l=(a.x0+a.x1)/2,c=(a.z0+a.z1)/2;a.gate!==void 0?e.push({x:r.mid[0],z:r.mid[1]}):a.w<mn.follow.doorWidth&&s(a.x0,a.z0)&&s(a.x1,a.z1)&&e.push({x:l,z:c})}),t.neighbors.every(r=>this.cell(r.id))&&this.doorLists.set(t.id,e),e}isDoor(t,e){const n=this.info(t).portals[e];if(!n)return!1;if(n.gate!==void 0)return!0;if(n.w>=mn.route.doorCentreWidth)return!1;const s=(r,o)=>this.wallDist(r,o,t,!0)<Rl;return s(n.x0,n.z0)&&s(n.x1,n.z1)}doorsNear(t){let e=this.doorNears.get(t.id);if(e)return e;e=this.doorsOf(t).slice();for(const n of t.neighbors){const s=this.cell(n.id);if(s&&!s.solid)for(const r of this.doorsOf(s))e.push(r)}return t.neighbors.every(n=>this.cell(n.id))&&this.doorNears.set(t.id,e),e}inDoorway(t,e,n,s){for(const r of this.doorsNear(n))if(Math.hypot(r.x-t,r.z-e)<s)return!0;return!1}}const Cl=new WeakMap;function Nh(i){let t=Cl.get(i);return t||(t=new zh(i),Cl.set(i,t)),t}class Fh{constructor(t,e,n,{passable:s=null}={}){if(this.get=t.cell?o=>t.cell(o):o=>t.cells[o],this.locked=t.gateLocked?o=>!!t.gateLocked(o):o=>{var a,l;return!!((l=(a=t.gates)==null?void 0:a[o])!=null&&l.locked)},this.passable=s,this.fromId=e,this.toId=n,this.goal=this.get(n),this.expanded=0,this.state="running",this.res=null,this.g=new Map([[e,0]]),this.prev=new Map,this.closed=new Set,this.heap=[],this.bestId=e,this.bestH=1/0,!this.goal||this.goal.solid){this.state="fail";return}if(e===n){this.state="done",this.res={cells:[e],length:0};return}const r=this.get(e);if(!r){this.state="fail";return}this._push([this._h(r),e])}_h(t){return Math.hypot(t.cx-this.goal.cx,t.cz-this.goal.cz)}_less(t,e){return t[0]<e[0]||t[0]===e[0]&&t[1]<e[1]}_push(t){const e=this.heap;e.push(t);let n=e.length-1;for(;n>0;){const s=n-1>>1;if(!this._less(e[n],e[s]))break;[e[n],e[s]]=[e[s],e[n]],n=s}}_pop(){const t=this.heap,e=t[0],n=t.pop();if(t.length){t[0]=n;let s=0;for(;;){const r=2*s+1,o=r+1;let a=s;if(r<t.length&&this._less(t[r],t[a])&&(a=r),o<t.length&&this._less(t[o],t[a])&&(a=o),a===s)break;[t[s],t[a]]=[t[a],t[s]],s=a}}return e}_chain(t){const e=[];for(let n=t;n!==void 0;n=this.prev.get(n))e.push(n);return e.reverse(),{cells:e,length:this.g.get(t)}}step(t=1/0){if(this.state!=="running")return this.state;const{g:e,prev:n,closed:s,heap:r,get:o,locked:a,passable:l}=this;let c=t;for(;r.length&&c>0;){const[,u]=this._pop();if(s.has(u))continue;if(u===this.toId)return this.state=!e.has(u)||!n.has(u)?"fail":"done",this.state==="done"&&(this.res=this._chain(u)),this.state;s.add(u),this.expanded++,c--;const d=o(u);if(!d)continue;const p=this._h(d);p<this.bestH&&(this.bestH=p,this.bestId=u);for(let h=0;h<d.neighbors.length;h++){const g=d.neighbors[h];if(s.has(g.id)||g.gate!==void 0&&a(g.gate))continue;const x=o(g.id);if(!x||x.solid||l&&!l(d,h,x))continue;const m=Math.hypot(d.cx-g.mid[0],d.cz-g.mid[1])+Math.hypot(g.mid[0]-x.cx,g.mid[1]-x.cz),f=e.get(u)+m;f<(e.get(g.id)??1/0)&&(e.set(g.id,f),n.set(g.id,u),this._push([f+this._h(x),g.id]))}}return r.length||(this.state="fail"),this.state}result(){return this.res}partial(){return this.bestId===this.fromId?null:this._chain(this.bestId)}}function Oh(i,t,{look:e=6}={}){if(i.length<=2)return i.slice();const n=[i[0]];let s=0;for(;s<i.length-1;){let r=Math.min(i.length-1,s+e);for(;r>s+1&&!t(i[s],i[r]);)r--;n.push(i[r]),s=r}return n}const $e=mn;function Bh(i,t,e){const n=t.concat([{lx:e.x,lz:e.z,rx:e.x,rz:e.z}]),s=[];let r=i.x,o=i.z,a=r,l=o,c=r,u=o,d=0,p=0,h=n.length*4+16;for(let f=0;f<n.length&&h-- >0;f++){const S=n[f];if(Hs(r,o,c,u,S.rx,S.rz)>=0)if(r===c&&o===u||Hs(r,o,a,l,S.rx,S.rz)<0)c=S.rx,u=S.rz,p=f;else{s.push({x:a,z:l}),r=a,o=l;const b=d;a=c=r,l=u=o,d=p=b,f=b;continue}if(Hs(r,o,a,l,S.lx,S.lz)<=0)if(r===a&&o===l||Hs(r,o,c,u,S.lx,S.lz)>0)a=S.lx,l=S.lz,d=f;else{s.push({x:c,z:u}),r=c,o=u;const b=p;a=c=r,l=u=o,d=p=b,f=b;continue}}s.push({x:e.x,z:e.z});const g=[];let x=i.x,m=i.z;for(const f of s)Math.hypot(f.x-x,f.z-m)<1e-6||(g.push(f),x=f.x,m=f.z);return g.length||g.push({x:e.x,z:e.z}),g}function ea(i,t,e,n){const s=i.locate(e.x,e.z);if(!s)return{ok:!1,reason:"outside"};if(s.solid)return{ok:!1,reason:"solid"};const r=i.settle(e.x,e.z,n);if(!r)return{ok:!1,reason:"cramped"};let o=i.locate(t.x,t.z,t.cell)??i.cell(t.cell);if(!o)return{ok:!1,reason:"unloaded"};if(o.solid&&(o=i.openNear(o,t.x,t.z)),!o)return{ok:!1,reason:"unreachable"};const a=new Fh(i.nav,o.id,r.cell,{passable:(l,c)=>i.passable(l,c,n)});return{ok:!0,search:a,goal:r,finish:(l=a.result())=>{if(!l)return{ok:!1,reason:"unreachable"};let c=r;if(l.cells[l.cells.length-1]!==r.cell){const u=i.cell(l.cells[l.cells.length-1]);if(c=u&&i.settle(u.cx,u.cz,n),!c)return{ok:!1,reason:"unreachable"}}return kh(i,t,c,o,l,n)}}}function wn(i,t,e,n,{maxExpand:s=1/0}={}){const r=ea(i,t,e,n);return r.ok?r.search.step(s)==="done"?r.finish():{ok:!1,reason:"unreachable"}:r}function kh(i,t,e,n,s,r){var b;const o=$e.route,a=[],l=[];for(let v=0;v+1<s.cells.length;v++){const T=i.cell(s.cells[v]);if(!T)return{ok:!1,reason:"unloaded"};let _=null,w=!1;if(T.neighbors.forEach((H,j)=>{if(H.id!==s.cells[v+1])return;const tt=i.usable(T,j,r);tt&&(!_||tt.w>_.w)&&(_=tt,w=i.isDoor(T,j))}),!_)return{ok:!1,reason:"unloaded"};const E={x:_.x0,z:_.z0},y={x:_.x1,z:_.z1},M=(_.x0+_.x1)/2,A=(_.z0+_.z1)/2,G=Hs(T.cx,T.cz,M,A,E.x,E.z);if(a.push(G>=0?{lx:E.x,lz:E.z,rx:y.x,rz:y.z}:{lx:y.x,lz:y.z,rx:E.x,rz:E.z}),w){const H=_.gate!==void 0?((b=i.nav.gates)==null?void 0:b[_.gate])??null:null;l.push({x0:_.x0,z0:_.z0,x1:_.x1,z1:_.z1,w:_.w,n:(H==null?void 0:H.normal)??null})}}const c=Bh(t,a,e),u=[{x:t.x,z:t.z},...c],d=(v,T)=>i.walkClear(v.x,v.z,T.x,T.z,r,n.id),p=Oh(u,d,{look:o.pullLook});let h=0;for(let v=1;v<u.length;v++)h+=Math.hypot(u[v].x-u[v-1].x,u[v].z-u[v-1].z);Hh(i,p,l,r,d),Xh(i,p,r,d),Wh(p,d),Gh(i,p,l,r,d);const g=p.slice(1).map(v=>({x:v.x,z:v.z})),x=p.slice(1).map(v=>Hr());let m=0,f=t.x,S=t.z;for(const v of g)m+=Math.hypot(v.x-f,v.z-S),f=v.x,S=v.z;return{ok:!0,pts:g,fixed:x,cells:s.cells,goal:e,length:m,tautLength:h,rawLength:s.length}}function Hr(i,t){return!1}function fo(i){const t=new Array(i.length).fill(0);for(let e=1;e+1<i.length;e++){const n=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z),s=Math.hypot(i[e+1].x-i[e].x,i[e+1].z-i[e].z);n<1e-9||s<1e-9||(t[e]=Math.abs(vs(Math.atan2(i[e].x-i[e-1].x,i[e].z-i[e-1].z),Math.atan2(i[e+1].x-i[e].x,i[e+1].z-i[e].z))))}return t}const Pl=i=>{let t=0;for(let e=1;e<i.length;e++)t+=Math.hypot(i[e].x-i[e-1].x,i[e].z-i[e-1].z);return t};function Ll(i,t){let e=1/0;for(let n=0;n<t.length;n++){const s=n===0?0:Math.max(1,Math.ceil(Math.hypot(t[n].x-t[n-1].x,t[n].z-t[n-1].z)/.3));for(let r=n===0?0:1;r<=s;r++){const o=s?r/s:0,a=n===0?t[0].x:t[n-1].x+(t[n].x-t[n-1].x)*o,l=n===0?t[0].z:t[n-1].z+(t[n].z-t[n-1].z)*o,c=i.locate(a,l);if(!c||c.solid)return 0;e=Math.min(e,i.wallDist(a,l,c))}}return e}function Gh(i,t,e,n,s){const r=$e.route.smooth;if(t.length<3)return;const o=n+$e.route.cornerMargin,a=(x,m)=>{const f=[];for(let S=1;S<m.length;S++){const b=yu(m[S-1],m[S],x.x0,x.z0,x.x1,x.z1);b>=0&&!f.some(v=>Math.abs(v-b)*x.w<.05)&&f.push(b)}return f},l=$e.route.cornerMargin*.8+n,c=t.map(x=>({x:x.x,z:x.z})),u=x=>{for(const m of e){const f=a(m,c),S=a(m,x);if(f.length!==S.length)return!1;if(!f.length)continue;const b=Math.min(...f.map(v=>Math.abs(v-.5)*m.w));for(const v of S){const T=Math.abs(v-.5)*m.w;if(b<=$e.route.doorTol+.05){if(T<=$e.route.doorTol+.05)continue;return!1}if(T<=b+.02)continue;const _=m.x0+(m.x1-m.x0)*v,w=m.z0+(m.z1-m.z0)*v,E=i.locate(_,w);if(!E||i.wallDist(_,w,E)<l)return!1}}return!0},d=(x,m,f)=>{const S=t[x-1],b=t[x+m];for(let k=x;k<x+m;k++)if(Hr(t[k]))return!1;const v=t.slice(x-1,x+m+1),T=[S,...f,b];if(Pl(T)>Pl(v)+r.lenSlack)return!1;for(let k=1;k<T.length;k++)if(!s(T[k-1],T[k]))return!1;if(!u([...t.slice(0,x),...f,...t.slice(x+m)]))return!1;const _=Math.max(0,x-2),w=Math.min(t.length,x+m+2),E=fo(t.slice(_,w)),y=fo([...t.slice(_,x),...f,...t.slice(x+m,w)]);let M=0,A=0;for(let k=0;k<m;k++)M=Math.max(M,E[x-_+k]);for(let k=0;k<f.length;k++)A=Math.max(A,y[x-_+k]);const G=M-r.minGain;if(A>G)return!1;const H=x-1-_,j=x+m-_,tt=x+f.length-_;return H>=0&&y[H]>Math.max(E[H],G)||y[tt]>Math.max(E[j]??0,G)||Ll(i,T)<Math.min(o,Ll(i,v))-r.clearSlack?!1:(t.splice(x,m,...f),!0)},p=x=>{const m=t[x-1],f=t[x],S=t[x+1],b=Math.hypot(f.x-m.x,f.z-m.z),v=Math.hypot(S.x-f.x,S.z-f.z),T=(f.x-m.x)/b,_=(f.z-m.z)/b,w=(S.x-f.x)/v,E=(S.z-f.z)/v,y=Math.min(r.round,r.legShare*b,b-r.minLeg),M=Math.min(r.round,r.legShare*v,v-r.minLeg);let A=T-w,G=_-E;const H=Math.hypot(A,G)||1;A/=H,G/=H;for(const j of[1,.7,.5]){const tt=y*j,k=M*j;if(!(tt<.15||k<.15))for(const z of r.outward){const B={x:f.x-T*tt+A*z,z:f.z-_*tt+G*z},Z={x:f.x+w*k+A*z,z:f.z+E*k+G*z};if(!(Math.hypot(Z.x-B.x,Z.z-B.z)<r.minLeg)&&d(x,1,[B,Z]))return!0}}return!1};let h=8*t.length+16,g=!1;for(let x=0;x<r.passes;x++){let m=!1;for(let f=1;f+1<t.length&&h>0;f++){h--;const S=t[f-1],b=t[f],v=t[f+1];if(Hr())continue;const T=Math.hypot(b.x-S.x,b.z-S.z),_=Math.hypot(v.x-b.x,v.z-b.z);if(T<1e-9||_<1e-9)continue;const w=fo([S,b,v])[1];let E=!1;if(w>r.hookTurn&&Math.min(T,_)<r.arc){if(E=d(f,1,[]),!E&&_<r.arc&&f+2<t.length){const y=t[f+1];E=d(f,2,[])||d(f,2,[{x:(b.x+y.x)/2,z:(b.z+y.z)/2}])}if(!E&&T<r.arc&&f>=2){const y=t[f-1];E=d(f-1,2,[])||d(f-1,2,[{x:(b.x+y.x)/2,z:(b.z+y.z)/2}])}}!E&&w>r.maxTurn&&(E=p(f)),E&&(m=!0,f=Math.max(0,f-3))}if(!m||(g=!0,h<=0))break}if(g)for(let x=1;x+1<t.length;x++){const m=t[x-1],f=t[x],S=t[x+1],b=S.x-m.x,v=S.z-m.z,T=b*b+v*v;if(T<1e-12||Hr())continue;const _=js(((f.x-m.x)*b+(f.z-m.z)*v)/T,0,1);Math.hypot(f.x-(m.x+_*b),f.z-(m.z+_*v))>$e.route.tidyLine||!s(m,S)||u([...t.slice(0,x),...t.slice(x+1)])&&(t.splice(x,1),x--)}}function yu(i,t,e,n,s,r){const o=t.x-i.x,a=t.z-i.z,l=s-e,c=r-n,u=o*c-a*l;if(Math.abs(u)<1e-9)return-1;const d=((e-i.x)*c-(n-i.z)*l)/u,p=((e-i.x)*a-(n-i.z)*o)/u;return d>=0&&d<=1&&p>=0&&p<=1?p:-1}function Hh(i,t,e,n,s){const r=$e.route;for(const o of e)for(let a=0;a+1<t.length;a++){const l=t[a],c=t[a+1],u=yu(l,c,o.x0,o.z0,o.x1,o.z1);if(u<0)continue;const d=(o.x0+o.x1)/2,p=(o.z0+o.z1)/2;if(Math.abs(u-.5)*o.w<r.doorTol||Vh(i,l,c,o.x0+(o.x1-o.x0)*u,o.z0+(o.z1-o.z0)*u,n+r.cornerMargin,r.doorLead))break;let h=-(o.z1-o.z0),g=o.x1-o.x0;o.n&&(h=o.n[0],g=o.n[1]);const x=Math.hypot(h,g)||1;h/=x,g/=x,h*(c.x-l.x)+g*(c.z-l.z)<0&&(h=-h,g=-g);const m=n+r.cornerMargin,f=Math.min(.5,m/Math.max(o.w,1e-6)),S=Math.max(f,Math.min(1-f,u)),b=[{x:d,z:p}];Math.abs(S-u)<1e-9&&Math.abs(u-.5)*o.w>=r.doorTol?b.push({x:o.x0+(o.x1-o.x0)*u,z:o.z0+(o.z1-o.z0)*u}):Math.abs(S-.5)>1e-9&&b.push({x:o.x0+(o.x1-o.x0)*S,z:o.z0+(o.z1-o.z0)*S});const v=[];for(const T of b)for(const _ of[r.doorLead,r.doorLead*.5,0]){const w={x:T.x,z:T.z,pin:!0};v.push(_>0?[{x:T.x-h*_,z:T.z-g*_,pin:!0},w,{x:T.x+h*_,z:T.z+g*_,pin:!0}]:[w])}for(const T of v){let _=!0,w=l,E=-Math.hypot(c.x-l.x,c.z-l.z),y=null;for(const M of[...T,c]){if(!s(w,M)){_=!1;break}E+=Math.hypot(M.x-w.x,M.z-w.z);const A=Math.atan2(M.x-w.x,M.z-w.z);if(T.length>1&&y!==null&&Math.abs(vs(y,A))>r.doorTurn){_=!1;break}y=A,w=M}if(_&&E<=r.doorBudget){t.splice(a+1,0,...T);break}}break}}function Vh(i,t,e,n,s,r,o){const a=e.x-t.x,l=e.z-t.z,c=Math.hypot(a,l);if(c<1e-6)return!0;const u=a/c,d=l/c,p=(n-t.x)*u+(s-t.z)*d;for(let h=Math.max(0,p-o);h<=Math.min(c,p+o)+1e-9;h+=.25){const g=t.x+u*h,x=t.z+d*h,m=i.locate(g,x);if(m&&i.wallDist(g,x,m)<r)return!1}return!0}function Wh(i,t){const e=$e.route;let n=!0;for(let s=0;n&&s<4;s++){n=!1;for(let r=1;r+1<i.length;r++){const o=i[r-1],a=i[r],l=i[r+1],c=l.x-o.x,u=l.z-o.z,d=c*c+u*u,p=Math.hypot(a.x-o.x,a.z-o.z),h=Math.hypot(l.x-a.x,l.z-a.z);let g=!1;if(d<1e-12)g=!0;else{const x=js(((a.x-o.x)*c+(a.z-o.z)*u)/d,0,1);(Math.hypot(a.x-(o.x+x*c),a.z-(o.z+x*u))<=e.tidyLine||Math.min(p,h)<e.tidyShort&&Math.abs(vs(Math.atan2(a.x-o.x,a.z-o.z),Math.atan2(l.x-a.x,l.z-a.z)))>e.tidySpike)&&(g=!0)}g&&(d<1e-12||t(o,l))&&(i.splice(r,1),r--,n=!0)}}}function Xh(i,t,e,n){const s=$e.route,r=e+s.cornerMargin,o=Math.cos(s.cornerTurn);for(let a=1;a+1<t.length;a++){const l=t[a-1],c=t[a],u=t[a+1];if(c.pin)continue;const d=Math.hypot(c.x-l.x,c.z-l.z),p=Math.hypot(u.x-c.x,u.z-c.z);if(d<1e-6||p<1e-6)continue;const h=(c.x-l.x)/d,g=(c.z-l.z)/d,x=(u.x-c.x)/p,m=(u.z-c.z)/p;if(h*x+g*m>o)continue;const f=i.locate(c.x,c.z);if(!f)continue;const S=i.wallDist(c.x,c.z,f);if(S>=r)continue;let b=h-x,v=g-m;const T=Math.hypot(b,v),_=[];T>1e-6&&_.push([b/T,v/T]);for(let M=0;M<s.cornerRing;M++){const A=M/s.cornerRing*Math.PI*2;_.push([Math.cos(A),Math.sin(A)])}const w=d+p;let E=null,y=S;for(let M=s.cornerStep;M<=s.cornerPush+1e-9&&!(E&&y>=r);M+=s.cornerStep){let A=null,G=1/0,H=0;for(const[j,tt]of _){const k={x:c.x+j*M,z:c.z+tt*M},z=i.locate(k.x,k.z,f.id);if(!z||z.solid||i.blocked(z,k.x,k.z))continue;const B=i.wallDist(k.x,k.z,z);if(B<=y+1e-6)continue;const Z=Math.hypot(k.x-l.x,k.z-l.z)+Math.hypot(u.x-k.x,u.z-k.z)-w,nt=B>=r;A&&(A.meets&&!nt||A.meets===nt&&(nt?Z>=G:B<=H))||!n(l,k)||!n(k,u)||(A={q:k,meets:nt},G=Z,H=B)}A&&(E=A.q,y=H)}E&&(t[a]=E)}}function si(i,t=null){const e={pts:i.pts,i:0,goal:i.goal,bestRem:1/0,stuck:0,age:0,blend:null,p0:t?{x:t.x,z:t.z}:null};return t&&t.speed>.5&&(e.blend={vx:t.vx,vz:t.vz}),e}function jr(i,t,e,n,{arrive:s=!0,cap:r=1/0,chase:o=null}={}){const{reach:a,arriveTol:l,cornerFloor:c,cornerLook:u,stuckTime:d,stuckGain:p}=$e.route,h=t.pts;for(t.age+=n;t.i<h.length;){const M=h[t.i],A=Math.hypot(M.x-i.x,M.z-i.z),G=t.i===h.length-1;if(A<=(G?l:a)){t.i++;continue}if(!G&&A<=$e.route.passRadius){const H=t.i>0?h[t.i-1]:t.p0;if(H){const j=M.x-H.x,tt=M.z-H.z,k=j*j+tt*tt;if(k>1e-9&&((i.x-H.x)*j+(i.z-H.z)*tt)/k>=1){t.i++;continue}}}break}if(t.i>=h.length)return{vx:0,vz:0,done:!0,stuck:!1};const g=h[t.i],x=g.x-i.x,m=g.z-i.z,f=Math.hypot(x,m)||1e-9;let S=f;for(let M=t.i;M+1<h.length;M++)S+=Math.hypot(h[M+1].x-h[M].x,h[M+1].z-h[M].z);const b=i.decel;let v=Math.min(e,r);if(s&&(v=Math.min(v,Math.sqrt(2*b*.8*Math.max(0,S-l*.4))+.6)),o&&(v=Math.min(v,o.base+o.gain*S)),t.i<h.length-1&&f<u+i.speed*.15){const M=h[t.i+1],A=M.x-g.x,G=M.z-g.z,H=Math.hypot(A,G)||1,j=x/f*(A/H)+m/f*(G/H),tt=e*js(c+(1-c)*Math.max(0,j),c,1);v=Math.min(v,Math.sqrt(tt*tt+2*b*.8*f))}S<t.bestRem-p?(t.bestRem=S,t.stuck=0):v>1&&(t.stuck+=n);const T=t.stuck>d;let _=x/f,w=m/f;if(t.i<h.length-1&&!(o!=null&&o.noLook)){const M=$e.route,A=js(M.look+M.lookSpeed*i.speed,M.look,M.lookMax);if(f<A){let G=A-f,H=g.x,j=g.z;for(let k=t.i;k+1<h.length&&G>0;k++){const z=h[k+1],B=Math.hypot(z.x-h[k].x,z.z-h[k].z),Z=B>1e-9?Math.min(1,G/B):1;H=h[k].x+(z.x-h[k].x)*Z,j=h[k].z+(z.z-h[k].z)*Z,G-=B}const tt=i.world;for(const k of[1,.6,.3,0]){const z=g.x+(H-g.x)*k,B=g.z+(j-g.z)*k;if(k>0&&tt&&!tt.walkClear(i.x,i.z,z,B,i.radius,i.cell))continue;const Z=Math.hypot(z-i.x,B-i.z);Z>1e-6&&(_=(z-i.x)/Z,w=(B-i.z)/Z);break}}}let E=_*v,y=w*v;if(t.blend&&t.age<$e.route.blendTime){const M=t.age/$e.route.blendTime,A=M*M*(3-2*M);E=t.blend.vx+(E-t.blend.vx)*A,y=t.blend.vz+(y-t.blend.vz)*A}return{vx:E,vz:y,done:!1,stuck:T}}const Be=mn,ye={vx:0,vz:0},nr=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z),Mn=i=>({x:i.x,z:i.z});class qh{constructor(t,e,n){this.G=t,this.body=e,this.mode="follow",this.order={type:"follow"},this.react=null,this.saved=null,this.patrol=null,this.side=t.rng()<.5?-1:1,this.lead={x:0,z:1},this.chasing=!1,this.slot=null,this.slotTimer=0,this.farTime=0,this.search=null,this.viaCentre=!1,this.stuckLog=[],this.goalCap=1/0,this.arrivedEmitted=!1}command(t){const e=this.G;if(!t||typeof t!="object")return this._reject(t,"bad-order");if(this.body.controlled)return this._reject(t,"controlled");const n=this._apply(t);return n.ok?(this.react=null,this.saved=null,e.emit("order-accepted","companion",{order:this._summary(t)}),{ok:!0}):this._reject(t,n.reason,n)}_summary(t){const e={type:t.type};return t.point&&(e.point=Mn(t.point)),t.waypoints&&(e.waypoints=t.waypoints.length),e}_reject(t,e,n={}){return this.G.emit("order-rejected","companion",{order:t&&t.type?this._summary(t):null,reason:e,...n.index!==void 0?{index:n.index}:{}}),{ok:!1,reason:e}}_apply(t){const{world:e}=this.G,n=this.body;switch(t.type){case"follow":return this._set("follow",{type:"follow"}),{ok:!0};case"hold":return this._set("hold",{type:"hold"}),{ok:!0};case"goto":{if(!nr(t.point))return{ok:!1,reason:"bad-point"};const s=wn(e,n,t.point,n.radius);return s.ok?(this._set("goto",{type:"goto",point:Mn(s.goal)}),n._route=si(s,n),this.arrivedEmitted=!1,{ok:!0}):{ok:!1,reason:s.reason}}case"patrol":{const s=t.waypoints;if(!Array.isArray(s)||!s.length||s.length>Be.patrol.maxWaypoints)return{ok:!1,reason:"bad-waypoints"};const r=[];for(let a=0;a<s.length;a++){if(!nr(s[a]))return{ok:!1,reason:"bad-waypoint",index:a};const l=e.locate(s[a].x,s[a].z);if(!l)return{ok:!1,reason:"outside",index:a};if(l.solid)return{ok:!1,reason:"solid",index:a};const c=e.settle(s[a].x,s[a].z,n.radius);if(!c)return{ok:!1,reason:"cramped",index:a};r.push({x:c.x,z:c.z})}const o=wn(e,n,r[0],n.radius);return o.ok?(this._set("patrol",{type:"patrol",waypoints:r.map(Mn),loop:t.loop!==!1}),this.patrol={pts:r,loop:t.loop!==!1,dwell:Number.isFinite(t.dwell)?t.dwell:Be.patrol.dwell,idx:0,dir:1,wait:0,fails:0},n._route=si(o,n),{ok:!0}):{ok:!1,reason:o.reason,index:0}}default:return{ok:!1,reason:"unknown-order"}}}_set(t,e){this.mode=t,this.order=e,this.body._route=null,this.slot=null,this.slotIdeal=null,this.slotTimer=0,this.chasing=!1,t!=="patrol"&&(this.patrol=null)}reactTo(t,e){const n=this.G,s=this.body;if(s.controlled)return!1;const r=()=>{this.mode!=="react"&&(this.saved={mode:this.mode,order:this.order,patrol:this.patrol?{...this.patrol}:null})};switch(t.type){case"goto":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;if(!nr(o))return!1;const a=wn(n.world,s,o,s.radius);return a.ok?(r(),this.mode="react",this.react={kind:"goto",point:Mn(a.goal),giveUp:n.t+Be.react.giveUp,dwell:Number.isFinite(t.dwell)?t.dwell:Be.react.dwell,arrivedAt:null},s._route=si(a,s),!0):(n.emit("order-rejected","companion",{order:{type:"goto",point:Mn(o)},reason:a.reason,source:"trigger"}),!1)}case"face":{const o=t.point==="source"?e&&{x:e.x,z:e.z}:t.point;return nr(o)?(r(),this.mode="react",s._route=null,this.react={kind:"face",until:n.t+Be.react.face,heading:Math.atan2(o.x-s.x,o.z-s.z)},!0):!1}case"hold":case"follow":case"patrol":{if(t.for>0){r();const a=this.saved;return this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type}).ok?(this.saved=a,this.react={kind:"mode",until:n.t+t.for},this.mode="react",this.reactInner=t.type,!0):(this.saved=null,this.mode==="react"&&(this.mode=a.mode),!1)}const o=this._apply(t.type==="patrol"?{type:"patrol",waypoints:t.waypoints}:{type:t.type});return o.ok?(this.react=null,this.saved=null,!0):(n.emit("order-rejected","companion",{order:{type:t.type},reason:o.reason,source:"trigger"}),!1)}default:return!1}}_restore(){const t=this.saved;if(this.react=null,this.saved=null,this.reactInner=null,this.body._route=null,!t){this.mode="follow",this.order={type:"follow"};return}this.mode=t.mode,this.order=t.order,this.patrol=t.patrol,this.slot=null,this.slotTimer=0,this.G.emit("order-accepted","companion",{order:{type:t.order.type},source:"react-end"})}setControlled(t){const e=this.body;e.controlled=t,e._route=null,this.react=null,this.saved=null,this.patrol=null,t?(this.mode="direct",this.order={type:"direct"}):(this.mode="hold",this.order={type:"hold"}),this.chasing=!1,this.slot=null,this.slotTimer=0}think(t){if(this.body.controlled)return ye;switch(this.mode){case"hold":return this._hold(t);case"goto":return this._goto(t);case"patrol":return this._patrol(t);case"react":return this._react(t);default:return this._follow(t)}}_hold(){this.body._route=null;const t=this.G.bodies.avatar;return Math.hypot(t.x-this.body.x,t.z-this.body.z)<9&&(this.body._face=Math.atan2(t.x-this.body.x,t.z-this.body.z)),ye}_drive(t,e){const n=this.body,s=jr(n,n._route,n.spec.speed,t,e);return s.done?(n._route=null,{vx:0,vz:0,done:!0}):s.stuck?(this._stuck(),{vx:0,vz:0,stuck:!0}):s}_goto(t){const e=this.body;if(!e._route){const s=wn(this.G.world,e,this.order.point,e.radius);if(!s.ok)return this.G.emit("order-rejected","companion",{order:{type:"goto"},reason:s.reason,source:"replan"}),this._set("hold",{type:"hold"}),ye;e._route=si(s,e)}const n=this._drive(t);return n.done?(this.G.emit("companion-arrived","companion",{mode:"goto",point:Mn(this.order.point)}),this.mode="hold",this.order={type:"hold",arrivedAt:Mn(this.order.point)},ye):n}_patrol(t){const e=this.patrol,n=this.body,s=this.G;if(!e)return this._set("hold",{type:"hold"}),ye;if(e.wait>0)return e.wait-=t,ye;if(!n._route){const o=wn(s.world,n,e.pts[e.idx],n.radius);if(!o.ok)return++e.fails>=e.pts.length?(s.emit("order-rejected","companion",{order:{type:"patrol"},reason:"patrol-unreachable",source:"replan"}),this._set("hold",{type:"hold"}),ye):(this._advance(),ye);e.fails=0,n._route=si(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"patrol",index:e.idx,point:Mn(e.pts[e.idx])}),e.wait=e.dwell,this._advance(),ye):r}_advance(){const t=this.patrol,e=t.pts.length;e!==1&&(t.loop?t.idx=(t.idx+1)%e:(t.idx+=t.dir,t.idx>=e?(t.dir=-1,t.idx=e-2):t.idx<0&&(t.dir=1,t.idx=1)))}_react(t){const e=this.react,n=this.body,s=this.G;if(!e)return this._restore(),ye;if(e.kind==="face")return n._face=e.heading,s.t>=e.until&&this._restore(),ye;if(e.kind==="mode"){if(s.t>=e.until)return this._restore(),ye;this.mode=this.reactInner;const o=this.think(t);return this.mode!==this.reactInner&&(this.reactInner="hold"),this.mode="react",o}if(e.arrivedAt!==null)return s.t-e.arrivedAt>=e.dwell&&this._restore(),ye;if(s.t>e.giveUp)return this._restore(),ye;if(!n._route){const o=wn(s.world,n,e.point,n.radius);if(!o.ok)return this._restore(),ye;n._route=si(o,n)}const r=this._drive(t);return r.done?(s.emit("companion-arrived","companion",{mode:"react",point:Mn(e.point)}),e.arrivedAt=s.t,ye):r}_follow(t){const e=this.G,n=this.body,s=Be.follow,r=e.world,o=e.bodies.avatar,a=o.x-n.x,l=o.z-n.z,c=Math.hypot(a,l);if(o.speed>.8){const g=Math.min(1,6*t),x=this.lead.x+(o.vx/o.speed-this.lead.x)*g,m=this.lead.z+(o.vz/o.speed-this.lead.z)*g,f=Math.hypot(x,m)||1;this.lead={x:x/f,z:m/f}}this.farTime=c>s.blinkDistance?this.farTime+t:0,this.search&&this._stepSearch(o);const u=r.cell(n.cell),d=c>1.6&&r.inDoorway(n.x,n.z,u,s.doorClear*.7);if(!this.chasing&&(c>s.start||d)&&(this.chasing=!0,this.slotTimer=0),this.slotTimer-=t,this.chasing&&this.slotTimer<=0&&!this.search&&(!n._route||this._stale(o,c))){this.slotTimer=s.reslot;const g=this._chooseSlot(o,c);g?this._adopt(g):this._beginSearch(o)}if(!this.chasing)return n._route=null,n._face=Math.atan2(a,l),ye;if(!n._route)return ye;const p=c>s.catchup,h=jr(n,n._route,p?n.spec.catchupSpeed:n.spec.speed,t,{arrive:!1,chase:{base:Math.min(o.speed*1.05,n.spec.speed)+.5,gain:3}});return h.done?(n._route=null,c<s.stop&&o.speed<.5&&(this.chasing=!1,e.emit("companion-arrived","companion",{mode:"follow",point:Mn(this.slot??n)})),ye):h.stuck?(this._stuck(),ye):h}_predict(t){const e=Be.follow,n=this.G.world;if(t.speed<.8)return{x:t.x,z:t.z};const s=t.x+t.vx*e.lead,r=t.z+t.vz*e.lead;return n.walkClear(t.x,t.z,s,r,this.body.radius,t.cell)?{x:s,z:r}:{x:t.x,z:t.z}}_ideal(t){const e=Be.follow,n=this.lead.x,s=this.lead.z;return{x:t.x-n*e.distance+-s*e.lateral*this.side,z:t.z-s*e.distance+n*e.lateral*this.side}}_stale(t,e=0){const n=Be.follow,s=this.body._route;if(!s||!this.slotIdeal)return!0;const r=this._ideal(this._predict(t));return Math.hypot(r.x-this.slotIdeal.x,r.z-this.slotIdeal.z)>n.replanDist*Math.max(1,e/n.farScale)?!0:s.age>n.reslotMax&&t.speed>.5}_chooseSlot(t,e){const n=this.G,s=this.body,r=Be.follow,o=n.world,a=this.lead.x,l=this.lead.z,c=-l,u=a,d=this._predict(t);this.slotIdeal=this._ideal(d);const p=[],h=(v,T,_)=>p.push({x:d.x+v,z:d.z+T,tag:_}),g=-a*r.distance,x=-l*r.distance;h(g+c*r.lateral*this.side,x+u*r.lateral*this.side),h(g-c*r.lateral*this.side,x-u*r.lateral*this.side,"mirror"),h(g,x);const m=p[0],f=[];for(const v of[1.1,2.2,3.4])for(let T=0;T<8;T++){const _=T/8*Math.PI*2;f.push({x:m.x+Math.cos(_)*v,z:m.z+Math.sin(_)*v,tag:"ring"})}f.sort((v,T)=>Math.hypot(v.x-m.x,v.z-m.z)-Math.hypot(T.x-m.x,T.z-m.z)),p.push(...f);let S=0;for(const v of p){const T=o.locate(v.x,v.z);if(!T||T.solid||o.wallDist(v.x,v.z,T)<s.radius+r.wallClear||o.inDoorway(v.x,v.z,T,r.doorClear))continue;const _=Math.hypot(v.x-t.x,v.z-t.z);if(_<t.radius+s.radius+.8||_>r.start-.8)continue;if(++S>3)break;const w=wn(o,s,v,s.radius,{maxExpand:r.slotBudget});if(w.ok&&Math.hypot(w.goal.x-v.x,w.goal.z-v.z)<1.5)return v.tag==="mirror"&&(this.side=-this.side),w}const b=wn(o,s,{x:t.x,z:t.z},s.radius,{maxExpand:r.slotBudget*5});return b.ok?this._stopShort(b,t,r.distance*.8):null}_adopt(t){const e=this.body,n=this.G,s=n.world;if(this.viaCentre){this.viaCentre=!1;const r=s.cell(e.cell),o=r&&s.settle(r.cx,r.cz,e.radius);o&&s.walkClear(e.x,e.z,o.x,o.z,e.radius,r.id)&&(t={...t,pts:[{x:o.x,z:o.z},...t.pts]})}this.slot=t.goal,e._route=si(t,e),n.stats.replans++}_beginSearch(t){const e=this.G,n=this.body,s=Be.follow,r=this._predict(t);this.slotIdeal=this._ideal(r);let o=ea(e.world,n,r,n.radius);if(o.ok||(o=ea(e.world,n,{x:t.x,z:t.z},n.radius)),!o.ok){this.slotTimer=s.retry;return}this.search={sp:o,leader:{x:t.x,z:t.z}}}_stepSearch(t){this.G;const e=Be.follow;this.body;const n=this.search,s=n.sp.search;let r=s.step(e.searchStep);if(r==="running"&&s.expanded>e.searchMax&&(r="fail"),r==="running")return;this.search=null;let o=null;if(r==="done")o=n.sp.finish();else{const a=s.partial();a&&a.cells.length>1&&(o=n.sp.finish(a)),this.slotTimer=Math.max(this.slotTimer,e.retry)}o&&o.ok&&this._adopt(Math.hypot(o.goal.x-t.x,o.goal.z-t.z)<1.5?this._stopShort(o,t,e.distance*.8):o)}_stopShort(t,e,n){const s=t.pts;let r=this.body.x,o=this.body.z;for(let a=0;a<s.length;a++){const l=s[a];if(Math.hypot(l.x-e.x,l.z-e.z)<n){let c=0,u=1;for(let h=0;h<14;h++){const g=(c+u)/2;Math.hypot(r+(l.x-r)*g-e.x,o+(l.z-o)*g-e.z)<n?u=g:c=g}const d={x:r+(l.x-r)*c,z:o+(l.z-o)*c},p=s.slice(0,a);return p.push(d),{...t,pts:p,goal:{...t.goal,x:d.x,z:d.z}}}r=l.x,o=l.z}return t}_stuck(){const t=this.G,e=this.body,n=this.stuckLog;for(n.push(t.t);n.length&&t.t-n[0]>Be.recovery.window;)n.shift();const s=n.length;if(e._route=null,this.slotTimer=0,s===1){t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z});return}if(s===2){const r=t.world.cell(e.cell);t.world.settle(r.cx,r.cz,e.radius)&&(this.viaCentre=!0),t.emit("companion-stuck-recovered","companion",{method:"detour",x:e.x,z:e.z});return}n.length=0,this.mode==="follow"?t.emit("companion-stuck-recovered","companion",{method:"repath",x:e.x,z:e.z}):(t.emit("companion-stuck-recovered","companion",{method:"skip",x:e.x,z:e.z}),this.mode==="patrol"?this._advance():this.mode==="goto"?this._set("hold",{type:"hold"}):this.mode==="react"&&this._restore())}_blink(t){const e=this.G,n=this.body,s=e.bodies.avatar,r=e.world.settle(s.x-this.lead.x*Be.follow.distance,s.z-this.lead.z*Be.follow.distance,n.radius,Be.follow.wallClear)??e.world.settle(s.x,s.z,n.radius);r&&(n.teleport(r),this.farTime=0,this.chasing=!1,e.stats.blinks++,e.emit("companion-stuck-recovered","companion",{method:"resync",why:t,x:n.x,z:n.z}))}}const ir=mn.triggers,Yh=new Set(["enter-cell","avatar-distance","noise","sighted","interval","avatar-stopped"]),$h=new Set(["goto","hold","follow","patrol","face","emit"]),Dl=i=>i&&Number.isFinite(i.x)&&Number.isFinite(i.z);function jh(i){if(!i||typeof i!="object")return"not-an-object";const t=i.when,e=i.do;return!t||!Yh.has(t.type)?"bad-when":!e||!$h.has(e.type)?"bad-do":t.type==="enter-cell"&&!(Array.isArray(t.cells)&&t.cells.length)&&t.sector===void 0?"enter-cell-needs-cells-or-sector":t.type==="avatar-distance"&&!(Number.isFinite(t.lt)||Number.isFinite(t.gt))?"avatar-distance-needs-lt-or-gt":t.type==="noise"&&!(t.radius>0)?"noise-needs-radius":t.type==="interval"&&!(t.every>0)?"interval-needs-every":t.type==="avatar-stopped"&&!(t.for>0)?"avatar-stopped-needs-for":(e.type==="goto"||e.type==="face")&&!Dl(e.point)&&e.point!=="source"?"action-needs-point":e.type==="patrol"&&!(Array.isArray(e.waypoints)&&e.waypoints.length&&e.waypoints.every(Dl))?"patrol-needs-waypoints":e.type==="emit"&&(typeof e.event!="string"||!e.event)?"emit-needs-event":e.point==="source"&&t.type!=="noise"&&t.type!=="sighted"?"source-needs-noise-or-sighted":null}class Kh{constructor(){this.rules=[],this.state=new Map,this.signals=[],this.auto=0}set(t,e){const n=[],s=[],r=[],o=new Map;for(const a of Array.isArray(t)?t:[]){const l=(a==null?void 0:a.id)??`rule-${++this.auto}`,c=r.length>=ir.maxRules?"too-many-rules":jh(a);if(c){s.push({id:l,reason:c});continue}const u={id:l,when:a.when,do:a.do,repeat:a.repeat?a.repeat===!0?ir.repeat:Number(a.repeat):0,once:!!a.once,enabled:a.enabled!==!1},d=JSON.stringify(u.when),p=this.state.get(l);o.set(l,p&&p.key===d?p:{key:d,fired:0,last:-1/0,was:null,latched:!1,nextAt:e+(u.when.every??0),done:!1,stopped:0}),r.push(u),n.push(l)}return this.rules=r,this.state=o,{accepted:n,rejected:s}}signal(t){this.signals.length<ir.maxSignals&&this.signals.push(t)}describe(){return this.rules.map(t=>{const e=this.state.get(t.id);return{id:t.id,type:t.when.type,enabled:t.enabled,fired:e.fired,last:Number.isFinite(e.last)?e.last:null,active:!!e.was||e.latched}})}tick(t){const e=[],{t:n,dt:s}=t,r=Math.hypot(t.avatar.x-t.companion.x,t.avatar.z-t.companion.z),o=t.avatar.speed<.1,a=this.signals;this.signals=[];for(const l of this.rules){if(e.length>=ir.maxFiresPerTick)break;const c=this.state.get(l.id),u=l.when;let d=!1,p=null,h=null;switch(u.type){case"enter-cell":{const g=t.cellChange;if(g){const x=m=>u.cells?u.cells.includes(m.id):u.sector!==void 0&&t.sectorOf(m)===u.sector;d=!x(g.from)&&x(g.to)}break}case"avatar-distance":h=Number.isFinite(u.lt)?r<u.lt:r>u.gt;break;case"avatar-stopped":c.stopped=o?c.stopped+s:0,h=c.stopped>=u.for;break;case"interval":n>=c.nextAt&&(d=!0,c.nextAt=n+u.every);break;case"noise":for(const g of a){if(g.type!=="noise")continue;if(Math.hypot(g.x-t.companion.x,g.z-t.companion.z)<=Math.min(u.radius,g.radius??1/0)){d=!0,p=g;break}}break;case"sighted":for(const g of a)if(g.type==="sighted"&&(u.target===void 0||u.target===g.target)){d=!0,p=g;break}break}if(h!==null)if(c.was===null)c.was=h;else{const g=h&&!c.was,x=l.repeat>0&&h&&c.was&&n-c.last>=l.repeat;d=g||x,c.was=h}!l.enabled||c.done||d&&(c.fired++,c.last=n,l.once&&(c.done=!0),e.push({rule:l,signal:p}))}return e}}const Pe=mn,Le=i=>Math.round(i*1e3)/1e3;function Zh(i,{spawnCell:t,seed:e=1,tuning:n={}}={}){const s=Nh(i),r=Ah(e),o={ticks:0,substeps:0,contacts:0,violations:0,blinks:0,replans:0},a=[];let l=0,c=0,u=0;const d={world:s,rng:r,stats:o,bodies:null,get t(){return l},emit(L,X,et){a.push({t:Le(l),type:L,actor:X,...et}),a.length>Pe.events.max&&a.shift()}},p=L=>L==null?null:typeof L=="object"?L:s.cell(L);let h=p(t)??p(i.startCell);if((!h||h.solid)&&(h=(h==null?void 0:h.neighbors.map(L=>s.cell(L.id)).find(L=>!L.solid))??null),!h)throw new Error("createActors: no open spawn cell");const g={...Pe.avatar,...n.avatar},x={...Pe.companion,...n.companion},m=s.settle(h.cx,h.cz,g.radius,.2);if(!m)throw new Error("createActors: spawn cell has no room");const f=new Al("avatar",g,m);let S=null;for(const[L,X]of[[-1.7,1.2],[1.7,1.2],[-1.7,-1.2],[1.7,-1.2],[0,2.6],[0,-2.6],[3.2,0],[-3.2,0]]){const et=s.settle(m.x+L,m.z+X,x.radius,.1);if(et&&Math.hypot(et.x-m.x,et.z-m.z)>=g.radius+x.radius+.4){S=et;break}}if(!S)throw new Error("createActors: no room for the companion");const b=new Al("companion",x,S);f.world=b.world=s,d.bodies={avatar:f,companion:b},f.controlled=!0,f.mode="direct",b.mode="follow";const v=new qh(d,b,e),T=new Kh,_=L=>d.bodies[L];let w={ax:0,az:0,run:!1,aim:null,stop:!1};const E={avatar:null,companion:null};let y=f.cell,M=H(s.cell(f.cell)),A=0;const G=Math.atan2(b.x-f.x,b.z-f.z);f.heading=f.pheading=G,b.heading=b.pheading=G+Math.PI;function H(L){var X,et;return L.sector??((et=(X=i.sectorAt)==null?void 0:X.call(i,L.cx,L.cz))==null?void 0:et.id)}const j=()=>f.controlled?f:b;function tt(L,X,et,{quiet:st=!1}={}){const pt=zt=>(st||d.emit("order-rejected",L.id,{order:{type:"moveTo",point:{x:X,z:et}},reason:zt}),{ok:!1,reason:zt});if(!Number.isFinite(X)||!Number.isFinite(et))return pt("bad-point");const V=wn(s,L,{x:X,z:et},L.radius);return V.ok?(L._route=si(V,L),L._replans=0,st||d.emit("order-accepted",L.id,{order:{type:"moveTo",point:{x:Le(V.goal.x),z:Le(V.goal.z)}}}),{ok:!0,target:{x:V.goal.x,z:V.goal.z},length:V.length}):pt(V.reason)}function k(L,X){if(f.controlled&&(w.ax||w.az)){const et=wn(s,f,{x:L,z:X},f.radius);return et.ok?(E.avatar={x:L,z:X},d.emit("order-accepted","avatar",{order:{type:"moveTo",point:{x:L,z:X}},deferred:!0}),{ok:!0,deferred:!0}):(d.emit("order-rejected","avatar",{order:{type:"moveTo",point:{x:L,z:X}},reason:et.reason}),{ok:!1,reason:et.reason})}return tt(f,L,X)}function z(L){const X=v.command(L);return b.mode=v.mode,X}function B(L){if(L!=="avatar"&&L!=="companion")return{ok:!1,reason:"unknown-actor"};if(_(L).controlled)return{ok:!0,unchanged:!0};const et=j();return et._route=null,E.avatar=E.companion=null,et===f?(f.controlled=!1,f.mode="hold",v.setControlled(!0)):(v.setControlled(!1),f.controlled=!0,f.mode="direct"),b.mode=v.mode,d.emit("control-changed",L,{from:et.id}),{ok:!0}}function Z(L){const X=T.set(L,l);for(const et of X.rejected)d.emit("order-rejected","companion",{rule:et.id,reason:et.reason});return X}function nt(L,X){const et=L.spec,st=w.ax!==0||w.az!==0,pt=w.run?et.runSpeed??et.catchupSpeed??et.speed:et.speed;if(st)return L._route=null,{vx:w.ax*pt,vz:w.az*pt};const V=E[L.id];if(V&&(E[L.id]=null,tt(L,V.x,V.z,{quiet:!0})),w.stop)return L._route=null,{vx:0,vz:0};if(!L._route)return{vx:0,vz:0};const zt=jr(L,L._route,pt,X);if(zt.done){const vt=L._route.goal;return L._route=null,d.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:Le(vt.x),z:Le(vt.z)}}),{vx:0,vz:0}}if(zt.stuck){const vt=L._route.goal;return L._replans=(L._replans??0)+1,L._replans<=1?tt(L,vt.x,vt.z,{quiet:!0}):(L._route=null,d.emit("avatar-blocked",L.id,{x:Le(L.x),z:Le(L.z),reason:"stuck"})),{vx:0,vz:0}}return zt}function xt(L,X,et){const st=L.x-X.x,pt=L.z-X.z,V=Math.hypot(st,pt),zt=L.radius+X.radius+Pe.separation.gap;if(V>=zt)return;const vt=V>1e-6?st/V:1,Tt=V>1e-6?pt/V:0,Et=Pe.separation.push*(1-V/zt);et.vx+=vt*Et,et.vz+=Tt*Et}function Rt(L,X){let et=null,st=0;L.controlled&&w.aim?et=Math.atan2(w.aim.x-L.x,w.aim.z-L.z):L.speed>Pe.facing.minSpeed?(et=Math.hypot(L._want.x,L._want.z)>.5?Math.atan2(L._want.x,L._want.z):Math.atan2(L.vx,L.vz),st=Pe.facing.tau):L._face!=null&&(et=L._face),L._face=null,et!==null&&Number.isFinite(et)&&L.face(X,et,st)}function Lt(L){l+=L,o.ticks++,u++;for(const vt of[f,b])vt.px=vt.x,vt.pz=vt.z,vt.pheading=vt.heading;w.run&&j().speed>1?(A+=L,A>=Pe.noise.runEvery&&(A=0,T.signal({type:"noise",x:j().x,z:j().z,radius:Pe.noise.run,source:j().id}))):A=0;const X=s.live(f.cell),et=s.live(b.cell);let st={vx:0,vz:0};X&&(st=f.controlled?nt(f,L):f._route?lt(f,L):st,!f.controlled&&et&&xt(f,b,st)),f.step(s,o,L,st.vx,st.vz),Rt(f,L);let pt;et?b.controlled?pt=nt(b,L):!X&&v.mode==="follow"?pt={vx:0,vz:0}:(pt=v.think(L),pt={vx:pt.vx,vz:pt.vz},X&&xt(b,f,pt)):pt={vx:0,vz:0},b.step(s,o,L,pt.vx,pt.vz),Rt(b,L),b.mode=v.mode;let V=null;if(f.cell!==y){const vt=s.cell(y),Tt=s.cell(f.cell);d.emit("avatar-entered-cell","avatar",{cell:f.cell,from:y});const Et=Tt?H(Tt):void 0;Et!==void 0&&Et!==M&&(d.emit("avatar-entered-sector","avatar",{sector:Et,from:M}),M=Et),V={from:vt,to:Tt},y=f.cell}for(const vt of[f,b])vt._blocked>.3&&!vt._blockedFired&&vt.controlled&&(vt._blockedFired=!0,d.emit("avatar-blocked",vt.id,{x:Le(vt.x),z:Le(vt.z)}));const zt=T.tick({t:l,dt:L,avatar:f,companion:b,cellChange:V,sectorOf:H});for(const vt of zt){const Tt=vt.rule.do,Et=b.controlled&&Tt.type!=="emit";d.emit("trigger-fired","companion",{rule:vt.rule.id,when:vt.rule.when.type,...vt.signal?{at:{x:Le(vt.signal.x),z:Le(vt.signal.z)}}:{},...Et?{ignored:"controlled"}:{}}),Tt.type==="emit"?d.emit(String(Tt.event),"companion",{rule:vt.rule.id}):Et||v.reactTo(Tt,vt.signal)}b.mode=v.mode}function lt(L,X){const et=jr(L,L._route,L.spec.speed,X);if(et.done){const st=L._route.goal;return L._route=null,d.emit(`${L.id}-arrived`,L.id,{mode:"moveTo",point:{x:Le(st.x),z:Le(st.z)}}),{vx:0,vz:0}}return et.stuck?(L._route=null,d.emit("avatar-blocked",L.id,{x:Le(L.x),z:Le(L.z),reason:"stuck"}),{vx:0,vz:0}):et}function bt(L,X={}){var zt,vt;if(!(L>0))return;L=Math.min(L,Pe.maxFrame);let et=Number((zt=X.axis)==null?void 0:zt.x)||0,st=Number((vt=X.axis)==null?void 0:vt.z)||0;const pt=Math.hypot(et,st);if(pt<.05?et=st=0:pt>1&&(et/=pt,st/=pt),w={ax:et,az:st,run:!!X.run,aim:X.aim&&Number.isFinite(X.aim.x)&&Number.isFinite(X.aim.z)?X.aim:null,stop:!!X.stop},X.moveTo){const Tt=j();Tt===f?k(X.moveTo.x,X.moveTo.z):et||st?E[Tt.id]={x:X.moveTo.x,z:X.moveTo.z}:tt(Tt,X.moveTo.x,X.moveTo.z)}c+=L;let V=Math.floor(c/Pe.tick+1e-9);for(c-=V*Pe.tick,c<0&&(c=0);V-- >0;)Lt(Pe.tick)}function Pt(L,X=c/Pe.tick){const et=_(L);if(!et)return null;const st=Math.min(1,Math.max(0,X)),pt=vs(et.pheading,et.heading);return{x:et.px+(et.x-et.px)*st,z:et.pz+(et.z-et.pz)*st,heading:et.pheading+pt*st,vx:et.vx,vz:et.vz,speed:et.speed,moving:et.moving}}function yt(L){const X=L.pub();return X.mode=L.mode,X.moving=L.moving,X.render=Pt(L.id),X}return{avatar:f,companion:b,update:bt,pose:Pt,get alpha(){return c/Pe.tick},tickLength:Pe.tick,commandAvatarTo:k,commandCompanion:z,possess:B,setStandingOrders:Z,signal(L){return!L||!Number.isFinite(L.x)||!Number.isFinite(L.z)||L.type!=="noise"&&L.type!=="sighted"?!1:(T.signal({...L}),!0)},drainEvents(){const L=a.slice();return a.length=0,L},snapshot(){const L=yt(b);return L.order=v.order,L.react=v.react?{...v.react}:null,v.mode==="follow"&&(L.follow={state:v.chasing?"heading":"formed",planning:!!v.search}),v.mode==="patrol"&&v.patrol&&(L.patrol={index:v.patrol.idx,loop:v.patrol.loop,count:v.patrol.pts.length}),{t:Le(l),tick:u,alpha:Le(c/Pe.tick),controlled:j().id,avatar:yt(f),companion:JSON.parse(JSON.stringify(L)),rules:T.describe(),stats:{...o}}},path(L){const X=L==="avatar"?f:L==="companion"?b:null,et=X==null?void 0:X._route;return et?et.pts.slice(et.i).map(st=>({x:st.x,z:st.z})):[]},world:s,get time(){return l},get controlledId(){return j().id}}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ja="170",Jh=0,Il=1,Qh=2,Su=1,tf=2,Bn=3,di=0,Ze=1,ve=2,Wn=0,as=1,Fe=2,Ul=3,zl=4,ef=5,Ai=100,nf=101,sf=102,rf=103,of=104,af=200,lf=201,cf=202,uf=203,na=204,ia=205,hf=206,ff=207,df=208,pf=209,mf=210,gf=211,xf=212,vf=213,_f=214,sa=0,ra=1,oa=2,hs=3,aa=4,la=5,ca=6,ua=7,Ka=0,Mf=1,yf=2,fi=0,bu=1,wu=2,Eu=3,Tu=4,Sf=5,Au=6,Ru=7,Cu=300,fs=301,ds=302,ha=303,fa=304,to=306,Kr=1e3,Ci=1001,da=1002,sn=1003,bf=1004,sr=1005,xn=1006,po=1007,Pi=1008,Pn=1009,Pu=1010,Lu=1011,Ks=1012,Za=1013,Ii=1014,An=1015,Cn=1016,Ja=1017,Qa=1018,ps=1020,Du=35902,Iu=1021,Uu=1022,vn=1023,zu=1024,Nu=1025,ls=1026,ms=1027,eo=1028,tl=1029,Fu=1030,el=1031,nl=1033,Vr=33776,Wr=33777,Xr=33778,qr=33779,pa=35840,ma=35841,ga=35842,xa=35843,va=36196,_a=37492,Ma=37496,ya=37808,Sa=37809,ba=37810,wa=37811,Ea=37812,Ta=37813,Aa=37814,Ra=37815,Ca=37816,Pa=37817,La=37818,Da=37819,Ia=37820,Ua=37821,Yr=36492,za=36494,Na=36495,Ou=36283,Fa=36284,Oa=36285,Ba=36286,wf=3200,Ef=3201,Bu=0,Tf=1,ai="",en="srgb",_s="srgb-linear",no="linear",ue="srgb",Oi=7680,Nl=519,Af=512,Rf=513,Cf=514,ku=515,Pf=516,Lf=517,Df=518,If=519,ka=35044,Ga=35048,Fl="300 es",Hn=2e3,Zr=2001;class Ms{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ol=1234567;const cs=Math.PI/180,Zs=180/Math.PI;function Xn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ke[i&255]+ke[i>>8&255]+ke[i>>16&255]+ke[i>>24&255]+"-"+ke[t&255]+ke[t>>8&255]+"-"+ke[t>>16&15|64]+ke[t>>24&255]+"-"+ke[e&63|128]+ke[e>>8&255]+"-"+ke[e>>16&255]+ke[e>>24&255]+ke[n&255]+ke[n>>8&255]+ke[n>>16&255]+ke[n>>24&255]).toLowerCase()}function Ve(i,t,e){return Math.max(t,Math.min(e,i))}function il(i,t){return(i%t+t)%t}function Uf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function zf(i,t,e){return i!==t?(e-i)/(t-i):0}function Xs(i,t,e){return(1-e)*i+e*t}function Nf(i,t,e,n){return Xs(i,t,1-Math.exp(-e*n))}function Ff(i,t=1){return t-Math.abs(il(i,t*2)-t)}function Of(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Bf(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function kf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function Gf(i,t){return i+Math.random()*(t-i)}function Hf(i){return i*(.5-Math.random())}function Vf(i){i!==void 0&&(Ol=i);let t=Ol+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Wf(i){return i*cs}function Xf(i){return i*Zs}function qf(i){return(i&i-1)===0&&i!==0}function Yf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function $f(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function jf(i,t,e,n,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),u=o((t+n)/2),d=r((t-n)/2),p=o((t-n)/2),h=r((n-t)/2),g=o((n-t)/2);switch(s){case"XYX":i.set(a*u,l*d,l*p,a*c);break;case"YZY":i.set(l*p,a*u,l*d,a*c);break;case"ZXZ":i.set(l*d,l*p,a*u,a*c);break;case"XZX":i.set(a*u,l*g,l*h,a*c);break;case"YXY":i.set(l*h,a*u,l*g,a*c);break;case"ZYZ":i.set(l*g,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function gn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function he(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const kn={DEG2RAD:cs,RAD2DEG:Zs,generateUUID:Xn,clamp:Ve,euclideanModulo:il,mapLinear:Uf,inverseLerp:zf,lerp:Xs,damp:Nf,pingpong:Ff,smoothstep:Of,smootherstep:Bf,randInt:kf,randFloat:Gf,randFloatSpread:Hf,seededRandom:Vf,degToRad:Wf,radToDeg:Xf,isPowerOfTwo:qf,ceilPowerOfTwo:Yf,floorPowerOfTwo:$f,setQuaternionFromProperEuler:jf,normalize:he,denormalize:gn};class qt{constructor(t=0,e=0){qt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,s,r,o,a,l,c){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],p=n[2],h=n[5],g=n[8],x=s[0],m=s[3],f=s[6],S=s[1],b=s[4],v=s[7],T=s[2],_=s[5],w=s[8];return r[0]=o*x+a*S+l*T,r[3]=o*m+a*b+l*_,r[6]=o*f+a*v+l*w,r[1]=c*x+u*S+d*T,r[4]=c*m+u*b+d*_,r[7]=c*f+u*v+d*w,r[2]=p*x+h*S+g*T,r[5]=p*m+h*b+g*_,r[8]=p*f+h*v+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-n*r*u+n*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*o-a*c,p=a*l-u*r,h=c*r-o*l,g=e*d+n*p+s*h;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*c-u*n)*x,t[2]=(a*n-s*o)*x,t[3]=p*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=h*x,t[7]=(n*l-c*e)*x,t[8]=(o*e-n*r)*x,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(mo.makeScale(t,e)),this}rotate(t){return this.premultiply(mo.makeRotation(-t)),this}translate(t,e){return this.premultiply(mo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const mo=new Zt;function Gu(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Jr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Kf(){const i=Jr("canvas");return i.style.display="block",i}const Bl={};function Vs(i){i in Bl||(Bl[i]=!0,console.warn(i))}function Zf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Jf(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Qf(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const ne={enabled:!0,workingColorSpace:_s,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===ue&&(i.r=qn(i.r),i.g=qn(i.g),i.b=qn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===ue&&(i.r=us(i.r),i.g=us(i.g),i.b=us(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ai?no:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function qn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function us(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const kl=[.64,.33,.3,.6,.15,.06],Gl=[.2126,.7152,.0722],Hl=[.3127,.329],Vl=new Zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Wl=new Zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);ne.define({[_s]:{primaries:kl,whitePoint:Hl,transfer:no,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:Gl,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:kl,whitePoint:Hl,transfer:ue,toXYZ:Vl,fromXYZ:Wl,luminanceCoefficients:Gl,outputColorSpaceConfig:{drawingBufferColorSpace:en}}});let Bi;class td{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Bi===void 0&&(Bi=Jr("canvas")),Bi.width=t.width,Bi.height=t.height;const n=Bi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Bi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Jr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=qn(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(qn(e[n]/255)*255):e[n]=qn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ed=0;class Hu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=Xn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(go(s[o].image)):r.push(go(s[o]))}else r=go(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function go(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?td.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let nd=0;class Xe extends Ms{constructor(t=Xe.DEFAULT_IMAGE,e=Xe.DEFAULT_MAPPING,n=Ci,s=Ci,r=xn,o=Pi,a=vn,l=Pn,c=Xe.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=Xn(),this.name="",this.source=new Hu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new qt(0,0),this.repeat=new qt(1,1),this.center=new qt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Cu)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Kr:t.x=t.x-Math.floor(t.x);break;case Ci:t.x=t.x<0?0:1;break;case da:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Kr:t.y=t.y-Math.floor(t.y);break;case Ci:t.y=t.y<0?0:1;break;case da:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Xe.DEFAULT_IMAGE=null;Xe.DEFAULT_MAPPING=Cu;Xe.DEFAULT_ANISOTROPY=1;class ie{constructor(t=0,e=0,n=0,s=1){ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],u=l[4],d=l[8],p=l[1],h=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(u-p)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+p)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+h+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,v=(h+1)/2,T=(f+1)/2,_=(u+p)/4,w=(d+x)/4,E=(g+m)/4;return b>v&&b>T?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=_/n,r=w/n):v>T?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=_/s,r=E/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=w/r,s=E/r),this.set(n,s,r,e),this}let S=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(p-u)*(p-u));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-x)/S,this.z=(p-u)/S,this.w=Math.acos((c+h+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class id extends Ms{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ie(0,0,t,e),this.scissorTest=!1,this.viewport=new ie(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Xe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Hu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class cn extends id{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Vu extends Xe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sd extends Xe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ui{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],u=n[s+2],d=n[s+3];const p=r[o+0],h=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=p,t[e+1]=h,t[e+2]=g,t[e+3]=x;return}if(d!==x||l!==p||c!==h||u!==g){let m=1-a;const f=l*p+c*h+u*g+d*x,S=f>=0?1:-1,b=1-f*f;if(b>Number.EPSILON){const T=Math.sqrt(b),_=Math.atan2(T,f*S);m=Math.sin(m*_)/T,a=Math.sin(a*_)/T}const v=a*S;if(l=l*m+p*v,c=c*m+h*v,u=u*m+g*v,d=d*m+x*v,m===1-a){const T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],l=n[s+1],c=n[s+2],u=n[s+3],d=r[o],p=r[o+1],h=r[o+2],g=r[o+3];return t[e]=a*g+u*d+l*h-c*p,t[e+1]=l*g+u*p+c*d-a*h,t[e+2]=c*g+u*h+a*p-l*d,t[e+3]=u*g-a*d-l*p-c*h,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(s/2),d=a(r/2),p=l(n/2),h=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=p*u*d+c*h*g,this._y=c*h*d-p*u*g,this._z=c*u*g+p*h*d,this._w=c*u*d-p*h*g;break;case"YXZ":this._x=p*u*d+c*h*g,this._y=c*h*d-p*u*g,this._z=c*u*g-p*h*d,this._w=c*u*d+p*h*g;break;case"ZXY":this._x=p*u*d-c*h*g,this._y=c*h*d+p*u*g,this._z=c*u*g+p*h*d,this._w=c*u*d-p*h*g;break;case"ZYX":this._x=p*u*d-c*h*g,this._y=c*h*d+p*u*g,this._z=c*u*g-p*h*d,this._w=c*u*d+p*h*g;break;case"YZX":this._x=p*u*d+c*h*g,this._y=c*h*d+p*u*g,this._z=c*u*g-p*h*d,this._w=c*u*d-p*h*g;break;case"XZY":this._x=p*u*d-c*h*g,this._y=c*h*d-p*u*g,this._z=c*u*g+p*h*d,this._w=c*u*d+p*h*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],p=n+a+d;if(p>0){const h=.5/Math.sqrt(p+1);this._w=.25/h,this._x=(u-l)*h,this._y=(r-c)*h,this._z=(o-s)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(s+o)/h,this._z=(r+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(r-c)/h,this._x=(s+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-s)/h,this._x=(r+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ve(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=n*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-s*a,this._w=o*u-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-e;return this._w=h*o+e*this._w,this._x=h*n+e*this._x,this._y=h*s+e*this._y,this._z=h*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,p=Math.sin(e*u)/c;return this._w=o*d+this._w*p,this._x=n*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Q{constructor(t=0,e=0,n=0){Q.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Xl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Xl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),u=2*(a*e-r*s),d=2*(r*n-o*e);return this.x=e+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return xo.copy(this).projectOnVector(t),this.sub(xo)}reflect(t){return this.sub(xo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ve(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xo=new Q,Xl=new Ui;class Dn{constructor(t=new Q(1/0,1/0,1/0),e=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(fn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(fn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=fn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,fn):fn.fromBufferAttribute(r,o),fn.applyMatrix4(t.matrixWorld),this.expandByPoint(fn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),rr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(t.matrixWorld),this.union(rr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,fn),fn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),or.subVectors(this.max,As),ki.subVectors(t.a,As),Gi.subVectors(t.b,As),Hi.subVectors(t.c,As),Kn.subVectors(Gi,ki),Zn.subVectors(Hi,Gi),xi.subVectors(ki,Hi);let e=[0,-Kn.z,Kn.y,0,-Zn.z,Zn.y,0,-xi.z,xi.y,Kn.z,0,-Kn.x,Zn.z,0,-Zn.x,xi.z,0,-xi.x,-Kn.y,Kn.x,0,-Zn.y,Zn.x,0,-xi.y,xi.x,0];return!vo(e,ki,Gi,Hi,or)||(e=[1,0,0,0,1,0,0,0,1],!vo(e,ki,Gi,Hi,or))?!1:(ar.crossVectors(Kn,Zn),e=[ar.x,ar.y,ar.z],vo(e,ki,Gi,Hi,or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Un=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],fn=new Q,rr=new Dn,ki=new Q,Gi=new Q,Hi=new Q,Kn=new Q,Zn=new Q,xi=new Q,As=new Q,or=new Q,ar=new Q,vi=new Q;function vo(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){vi.fromArray(i,r);const a=s.x*Math.abs(vi.x)+s.y*Math.abs(vi.y)+s.z*Math.abs(vi.z),l=t.dot(vi),c=e.dot(vi),u=n.dot(vi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const rd=new Dn,Rs=new Q,_o=new Q;class mi{constructor(t=new Q,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):rd.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);const e=Rs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(_o.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(_o)),this.expandByPoint(Rs.copy(t.center).sub(_o))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const zn=new Q,Mo=new Q,lr=new Q,Jn=new Q,yo=new Q,cr=new Q,So=new Q;class sl{constructor(t=new Q,e=new Q(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(zn.copy(this.origin).addScaledVector(this.direction,e),zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Mo.copy(t).add(e).multiplyScalar(.5),lr.copy(e).sub(t).normalize(),Jn.copy(this.origin).sub(Mo);const r=t.distanceTo(e)*.5,o=-this.direction.dot(lr),a=Jn.dot(this.direction),l=-Jn.dot(lr),c=Jn.lengthSq(),u=Math.abs(1-o*o);let d,p,h,g;if(u>0)if(d=o*l-a,p=o*a-l,g=r*u,d>=0)if(p>=-g)if(p<=g){const x=1/u;d*=x,p*=x,h=d*(d+o*p+2*a)+p*(o*d+p+2*l)+c}else p=r,d=Math.max(0,-(o*p+a)),h=-d*d+p*(p+2*l)+c;else p=-r,d=Math.max(0,-(o*p+a)),h=-d*d+p*(p+2*l)+c;else p<=-g?(d=Math.max(0,-(-o*r+a)),p=d>0?-r:Math.min(Math.max(-r,-l),r),h=-d*d+p*(p+2*l)+c):p<=g?(d=0,p=Math.min(Math.max(-r,-l),r),h=p*(p+2*l)+c):(d=Math.max(0,-(o*r+a)),p=d>0?r:Math.min(Math.max(-r,-l),r),h=-d*d+p*(p+2*l)+c);else p=o>0?-r:r,d=Math.max(0,-(o*p+a)),h=-d*d+p*(p+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Mo).addScaledVector(lr,p),h}intersectSphere(t,e){zn.subVectors(t.center,this.origin);const n=zn.dot(this.direction),s=zn.dot(zn)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,p=this.origin;return c>=0?(n=(t.min.x-p.x)*c,s=(t.max.x-p.x)*c):(n=(t.max.x-p.x)*c,s=(t.min.x-p.x)*c),u>=0?(r=(t.min.y-p.y)*u,o=(t.max.y-p.y)*u):(r=(t.max.y-p.y)*u,o=(t.min.y-p.y)*u),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-p.z)*d,l=(t.max.z-p.z)*d):(a=(t.max.z-p.z)*d,l=(t.min.z-p.z)*d),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,zn)!==null}intersectTriangle(t,e,n,s,r){yo.subVectors(e,t),cr.subVectors(n,t),So.crossVectors(yo,cr);let o=this.direction.dot(So),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Jn.subVectors(this.origin,t);const l=a*this.direction.dot(cr.crossVectors(Jn,cr));if(l<0)return null;const c=a*this.direction.dot(yo.cross(Jn));if(c<0||l+c>o)return null;const u=-a*Jn.dot(So);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class re{constructor(t,e,n,s,r,o,a,l,c,u,d,p,h,g,x,m){re.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,u,d,p,h,g,x,m)}set(t,e,n,s,r,o,a,l,c,u,d,p,h,g,x,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=l,f[2]=c,f[6]=u,f[10]=d,f[14]=p,f[3]=h,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new re().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/Vi.setFromMatrixColumn(t,0).length(),r=1/Vi.setFromMatrixColumn(t,1).length(),o=1/Vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const p=o*u,h=o*d,g=a*u,x=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=h+g*c,e[5]=p-x*c,e[9]=-a*l,e[2]=x-p*c,e[6]=g+h*c,e[10]=o*l}else if(t.order==="YXZ"){const p=l*u,h=l*d,g=c*u,x=c*d;e[0]=p+x*a,e[4]=g*a-h,e[8]=o*c,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=h*a-g,e[6]=x+p*a,e[10]=o*l}else if(t.order==="ZXY"){const p=l*u,h=l*d,g=c*u,x=c*d;e[0]=p-x*a,e[4]=-o*d,e[8]=g+h*a,e[1]=h+g*a,e[5]=o*u,e[9]=x-p*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const p=o*u,h=o*d,g=a*u,x=a*d;e[0]=l*u,e[4]=g*c-h,e[8]=p*c+x,e[1]=l*d,e[5]=x*c+p,e[9]=h*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const p=o*l,h=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=x-p*d,e[8]=g*d+h,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=h*d+g,e[10]=p-x*d}else if(t.order==="XZY"){const p=o*l,h=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=p*d+x,e[5]=o*u,e[9]=h*d-g,e[2]=g*d-h,e[6]=a*u,e[10]=x*d+p}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(od,t,ad)}lookAt(t,e,n){const s=this.elements;return Qe.subVectors(t,e),Qe.lengthSq()===0&&(Qe.z=1),Qe.normalize(),Qn.crossVectors(n,Qe),Qn.lengthSq()===0&&(Math.abs(n.z)===1?Qe.x+=1e-4:Qe.z+=1e-4,Qe.normalize(),Qn.crossVectors(n,Qe)),Qn.normalize(),ur.crossVectors(Qe,Qn),s[0]=Qn.x,s[4]=ur.x,s[8]=Qe.x,s[1]=Qn.y,s[5]=ur.y,s[9]=Qe.y,s[2]=Qn.z,s[6]=ur.z,s[10]=Qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],p=n[9],h=n[13],g=n[2],x=n[6],m=n[10],f=n[14],S=n[3],b=n[7],v=n[11],T=n[15],_=s[0],w=s[4],E=s[8],y=s[12],M=s[1],A=s[5],G=s[9],H=s[13],j=s[2],tt=s[6],k=s[10],z=s[14],B=s[3],Z=s[7],nt=s[11],xt=s[15];return r[0]=o*_+a*M+l*j+c*B,r[4]=o*w+a*A+l*tt+c*Z,r[8]=o*E+a*G+l*k+c*nt,r[12]=o*y+a*H+l*z+c*xt,r[1]=u*_+d*M+p*j+h*B,r[5]=u*w+d*A+p*tt+h*Z,r[9]=u*E+d*G+p*k+h*nt,r[13]=u*y+d*H+p*z+h*xt,r[2]=g*_+x*M+m*j+f*B,r[6]=g*w+x*A+m*tt+f*Z,r[10]=g*E+x*G+m*k+f*nt,r[14]=g*y+x*H+m*z+f*xt,r[3]=S*_+b*M+v*j+T*B,r[7]=S*w+b*A+v*tt+T*Z,r[11]=S*E+b*G+v*k+T*nt,r[15]=S*y+b*H+v*z+T*xt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],p=t[10],h=t[14],g=t[3],x=t[7],m=t[11],f=t[15];return g*(+r*l*d-s*c*d-r*a*p+n*c*p+s*a*h-n*l*h)+x*(+e*l*h-e*c*p+r*o*p-s*o*h+s*c*u-r*l*u)+m*(+e*c*d-e*a*h-r*o*d+n*o*h+r*a*u-n*c*u)+f*(-s*a*u-e*l*d+e*a*p+s*o*d-n*o*p+n*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],p=t[10],h=t[11],g=t[12],x=t[13],m=t[14],f=t[15],S=d*m*c-x*p*c+x*l*h-a*m*h-d*l*f+a*p*f,b=g*p*c-u*m*c-g*l*h+o*m*h+u*l*f-o*p*f,v=u*x*c-g*d*c+g*a*h-o*x*h-u*a*f+o*d*f,T=g*d*l-u*x*l-g*a*p+o*x*p+u*a*m-o*d*m,_=e*S+n*b+s*v+r*T;if(_===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/_;return t[0]=S*w,t[1]=(x*p*r-d*m*r-x*s*h+n*m*h+d*s*f-n*p*f)*w,t[2]=(a*m*r-x*l*r+x*s*c-n*m*c-a*s*f+n*l*f)*w,t[3]=(d*l*r-a*p*r-d*s*c+n*p*c+a*s*h-n*l*h)*w,t[4]=b*w,t[5]=(u*m*r-g*p*r+g*s*h-e*m*h-u*s*f+e*p*f)*w,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*f-e*l*f)*w,t[7]=(o*p*r-u*l*r+u*s*c-e*p*c-o*s*h+e*l*h)*w,t[8]=v*w,t[9]=(g*d*r-u*x*r-g*n*h+e*x*h+u*n*f-e*d*f)*w,t[10]=(o*x*r-g*a*r+g*n*c-e*x*c-o*n*f+e*a*f)*w,t[11]=(u*a*r-o*d*r-u*n*c+e*d*c+o*n*h-e*a*h)*w,t[12]=T*w,t[13]=(u*x*s-g*d*s+g*n*p-e*x*p-u*n*m+e*d*m)*w,t[14]=(g*a*s-o*x*s-g*n*l+e*x*l+o*n*m-e*a*m)*w,t[15]=(o*d*s-u*a*s+u*n*l-e*d*l-o*n*p+e*a*p)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+n,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,d=a+a,p=r*c,h=r*u,g=r*d,x=o*u,m=o*d,f=a*d,S=l*c,b=l*u,v=l*d,T=n.x,_=n.y,w=n.z;return s[0]=(1-(x+f))*T,s[1]=(h+v)*T,s[2]=(g-b)*T,s[3]=0,s[4]=(h-v)*_,s[5]=(1-(p+f))*_,s[6]=(m+S)*_,s[7]=0,s[8]=(g+b)*w,s[9]=(m-S)*w,s[10]=(1-(p+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=Vi.set(s[0],s[1],s[2]).length();const o=Vi.set(s[4],s[5],s[6]).length(),a=Vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],dn.copy(this);const c=1/r,u=1/o,d=1/a;return dn.elements[0]*=c,dn.elements[1]*=c,dn.elements[2]*=c,dn.elements[4]*=u,dn.elements[5]*=u,dn.elements[6]*=u,dn.elements[8]*=d,dn.elements[9]*=d,dn.elements[10]*=d,e.setFromRotationMatrix(dn),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Hn){const l=this.elements,c=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),p=(n+s)/(n-s);let h,g;if(a===Hn)h=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Zr)h=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Hn){const l=this.elements,c=1/(e-t),u=1/(n-s),d=1/(o-r),p=(e+t)*c,h=(n+s)*u;let g,x;if(a===Hn)g=(o+r)*d,x=-2*d;else if(a===Zr)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-p,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Vi=new Q,dn=new re,od=new Q(0,0,0),ad=new Q(1,1,1),Qn=new Q,ur=new Q,Qe=new Q,ql=new re,Yl=new Ui;class Ln{constructor(t=0,e=0,n=0,s=Ln.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],p=s[6],h=s[10];switch(e){case"XYZ":this._y=Math.asin(Ve(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ve(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ve(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ve(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,h),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ve(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Ve(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ql.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ql,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Yl.setFromEuler(this),this.setFromQuaternion(Yl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ln.DEFAULT_ORDER="XYZ";class rl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ld=0;const $l=new Q,Wi=new Ui,Nn=new re,hr=new Q,Cs=new Q,cd=new Q,ud=new Ui,jl=new Q(1,0,0),Kl=new Q(0,1,0),Zl=new Q(0,0,1),Jl={type:"added"},hd={type:"removed"},Xi={type:"childadded",child:null},bo={type:"childremoved",child:null};class Ce extends Ms{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new Q,e=new Ln,n=new Ui,s=new Q(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new re},normalMatrix:{value:new Zt}}),this.matrix=new re,this.matrixWorld=new re,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.multiply(Wi),this}rotateOnWorldAxis(t,e){return Wi.setFromAxisAngle(t,e),this.quaternion.premultiply(Wi),this}rotateX(t){return this.rotateOnAxis(jl,t)}rotateY(t){return this.rotateOnAxis(Kl,t)}rotateZ(t){return this.rotateOnAxis(Zl,t)}translateOnAxis(t,e){return $l.copy(t).applyQuaternion(this.quaternion),this.position.add($l.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(jl,t)}translateY(t){return this.translateOnAxis(Kl,t)}translateZ(t){return this.translateOnAxis(Zl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Nn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?hr.copy(t):hr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nn.lookAt(Cs,hr,this.up):Nn.lookAt(hr,Cs,this.up),this.quaternion.setFromRotationMatrix(Nn),s&&(Nn.extractRotation(s.matrixWorld),Wi.setFromRotationMatrix(Nn),this.quaternion.premultiply(Wi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Jl),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(hd),bo.child=t,this.dispatchEvent(bo),bo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Nn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Nn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Nn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Jl),Xi.child=t,this.dispatchEvent(Xi),Xi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,t,cd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,ud,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),d=o(t.shapes),p=o(t.skeletons),h=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),h.length>0&&(n.animations=h),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ce.DEFAULT_UP=new Q(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new Q,Fn=new Q,wo=new Q,On=new Q,qi=new Q,Yi=new Q,Ql=new Q,Eo=new Q,To=new Q,Ao=new Q,Ro=new ie,Co=new ie,Po=new ie;class an{constructor(t=new Q,e=new Q,n=new Q){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),pn.subVectors(t,e),s.cross(pn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){pn.subVectors(s,e),Fn.subVectors(n,e),wo.subVectors(t,e);const o=pn.dot(pn),a=pn.dot(Fn),l=pn.dot(wo),c=Fn.dot(Fn),u=Fn.dot(wo),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const p=1/d,h=(c*l-a*u)*p,g=(o*u-a*l)*p;return r.set(1-h-g,g,h)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,On)===null?!1:On.x>=0&&On.y>=0&&On.x+On.y<=1}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,On)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,On.x),l.addScaledVector(o,On.y),l.addScaledVector(a,On.z),l)}static getInterpolatedAttribute(t,e,n,s,r,o){return Ro.setScalar(0),Co.setScalar(0),Po.setScalar(0),Ro.fromBufferAttribute(t,e),Co.fromBufferAttribute(t,n),Po.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ro,r.x),o.addScaledVector(Co,r.y),o.addScaledVector(Po,r.z),o}static isFrontFacing(t,e,n,s){return pn.subVectors(n,e),Fn.subVectors(t,e),pn.cross(Fn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),pn.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return an.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return an.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return an.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return an.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return an.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;qi.subVectors(s,n),Yi.subVectors(r,n),Eo.subVectors(t,n);const l=qi.dot(Eo),c=Yi.dot(Eo);if(l<=0&&c<=0)return e.copy(n);To.subVectors(t,s);const u=qi.dot(To),d=Yi.dot(To);if(u>=0&&d<=u)return e.copy(s);const p=l*d-u*c;if(p<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(n).addScaledVector(qi,o);Ao.subVectors(t,r);const h=qi.dot(Ao),g=Yi.dot(Ao);if(g>=0&&h<=g)return e.copy(r);const x=h*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Yi,a);const m=u*g-h*d;if(m<=0&&d-u>=0&&h-g>=0)return Ql.subVectors(r,s),a=(d-u)/(d-u+(h-g)),e.copy(s).addScaledVector(Ql,a);const f=1/(m+x+p);return o=x*f,a=p*f,e.copy(n).addScaledVector(qi,o).addScaledVector(Yi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Wu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},fr={h:0,s:0,l:0};function Lo(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Gt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=en){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ne.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ne.workingColorSpace){return this.r=t,this.g=e,this.b=n,ne.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ne.workingColorSpace){if(t=il(t,1),e=Ve(e,0,1),n=Ve(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Lo(o,r,t+1/3),this.g=Lo(o,r,t),this.b=Lo(o,r,t-1/3)}return ne.toWorkingColorSpace(this,s),this}setStyle(t,e=en){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=en){const n=Wu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=qn(t.r),this.g=qn(t.g),this.b=qn(t.b),this}copyLinearToSRGB(t){return this.r=us(t.r),this.g=us(t.g),this.b=us(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=en){return ne.fromWorkingColorSpace(Ge.copy(this),t),Math.round(Ve(Ge.r*255,0,255))*65536+Math.round(Ve(Ge.g*255,0,255))*256+Math.round(Ve(Ge.b*255,0,255))}getHexString(t=en){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ne.workingColorSpace){ne.fromWorkingColorSpace(Ge.copy(this),e);const n=Ge.r,s=Ge.g,r=Ge.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-n)/d+2;break;case r:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=ne.workingColorSpace){return ne.fromWorkingColorSpace(Ge.copy(this),e),t.r=Ge.r,t.g=Ge.g,t.b=Ge.b,t}getStyle(t=en){ne.fromWorkingColorSpace(Ge.copy(this),t);const e=Ge.r,n=Ge.g,s=Ge.b;return t!==en?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ti),this.setHSL(ti.h+t,ti.s+e,ti.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ti),t.getHSL(fr);const n=Xs(ti.h,fr.h,e),s=Xs(ti.s,fr.s,e),r=Xs(ti.l,fr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ge=new Gt;Gt.NAMES=Wu;let fd=0;class ys extends Ms{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Xn(),this.name="",this.blending=as,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=na,this.blendDst=ia,this.blendEquation=Ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Gt(0,0,0),this.blendAlpha=0,this.depthFunc=hs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oi,this.stencilZFail=Oi,this.stencilZPass=Oi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==as&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==na&&(n.blendSrc=this.blendSrc),this.blendDst!==ia&&(n.blendDst=this.blendDst),this.blendEquation!==Ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==hs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class we extends ys{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Ka,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new Q,dr=new qt;class _e{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ka,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)dr.fromBufferAttribute(this,e),dr.applyMatrix3(t),this.setXY(e,dr.x,dr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=gn(e,this.array)),e}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=gn(e,this.array)),e}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=gn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=gn(e,this.array)),e}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array),r=he(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ka&&(t.usage=this.usage),t}}class Xu extends _e{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class qu extends _e{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class te extends _e{constructor(t,e,n){super(new Float32Array(t),e,n)}}let dd=0;const on=new re,Do=new Ce,$i=new Q,tn=new Dn,Ps=new Dn,Re=new Q;class fe extends Ms{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Gu(t)?qu:Xu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return Do.lookAt(t),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($i).negate(),this.translate($i.x,$i.y,$i.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new te(n,3))}else{for(let n=0,s=e.count;n<s;n++){const r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(t){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Ps.setFromBufferAttribute(a),this.morphTargetsRelative?(Re.addVectors(tn.min,Ps.min),tn.expandByPoint(Re),Re.addVectors(tn.max,Ps.max),tn.expandByPoint(Re)):(tn.expandByPoint(Ps.min),tn.expandByPoint(Ps.max))}tn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Re.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Re));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Re.fromBufferAttribute(a,c),l&&($i.fromBufferAttribute(t,c),Re.add($i)),s=Math.max(s,n.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _e(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new Q,l[E]=new Q;const c=new Q,u=new Q,d=new Q,p=new qt,h=new qt,g=new qt,x=new Q,m=new Q;function f(E,y,M){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,M),p.fromBufferAttribute(r,E),h.fromBufferAttribute(r,y),g.fromBufferAttribute(r,M),u.sub(c),d.sub(c),h.sub(p),g.sub(p);const A=1/(h.x*g.y-g.x*h.y);isFinite(A)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-h.y).multiplyScalar(A),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-g.x).multiplyScalar(A),a[E].add(x),a[y].add(x),a[M].add(x),l[E].add(m),l[y].add(m),l[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let E=0,y=S.length;E<y;++E){const M=S[E],A=M.start,G=M.count;for(let H=A,j=A+G;H<j;H+=3)f(t.getX(H+0),t.getX(H+1),t.getX(H+2))}const b=new Q,v=new Q,T=new Q,_=new Q;function w(E){T.fromBufferAttribute(s,E),_.copy(T);const y=a[E];b.copy(y),b.sub(T.multiplyScalar(T.dot(y))).normalize(),v.crossVectors(_,y);const A=v.dot(l[E])<0?-1:1;o.setXYZW(E,b.x,b.y,b.z,A)}for(let E=0,y=S.length;E<y;++E){const M=S[E],A=M.start,G=M.count;for(let H=A,j=A+G;H<j;H+=3)w(t.getX(H+0)),w(t.getX(H+1)),w(t.getX(H+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new _e(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let p=0,h=n.count;p<h;p++)n.setXYZ(p,0,0,0);const s=new Q,r=new Q,o=new Q,a=new Q,l=new Q,c=new Q,u=new Q,d=new Q;if(t)for(let p=0,h=t.count;p<h;p+=3){const g=t.getX(p+0),x=t.getX(p+1),m=t.getX(p+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,m),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let p=0,h=e.count;p<h;p+=3)s.fromBufferAttribute(e,p+0),r.fromBufferAttribute(e,p+1),o.fromBufferAttribute(e,p+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),n.setXYZ(p+0,u.x,u.y,u.z),n.setXYZ(p+1,u.x,u.y,u.z),n.setXYZ(p+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,d=a.normalized,p=new c.constructor(l.length*u);let h=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?h=l[x]*a.data.stride+a.offset:h=l[x]*u;for(let f=0;f<u;f++)p[g++]=c[h++]}return new _e(p,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new fe,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const p=c[u],h=t(p,n);l.push(h)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,p=c.length;d<p;d++){const h=c[d];u.push(h.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],d=r[c];for(let p=0,h=d.length;p<h;p++)u.push(d[p].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const tc=new re,_i=new sl,pr=new mi,ec=new Q,mr=new Q,gr=new Q,xr=new Q,Io=new Q,vr=new Q,nc=new Q,_r=new Q;class $t extends Ce{constructor(t=new fe,e=new we){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){vr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(Io.fromBufferAttribute(d,t),o?vr.addScaledVector(Io,u):vr.addScaledVector(Io.sub(e),u))}e.add(vr)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(r),_i.copy(t.ray).recast(t.near),!(pr.containsPoint(_i.origin)===!1&&(_i.intersectSphere(pr,ec)===null||_i.origin.distanceToSquared(ec)>(t.far-t.near)**2))&&(tc.copy(r).invert(),_i.copy(t.ray).applyMatrix4(tc),!(n.boundingBox!==null&&_i.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,_i)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,p=r.groups,h=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){const m=p[g],f=o[m.materialIndex],S=Math.max(m.start,h.start),b=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=S,T=b;v<T;v+=3){const _=a.getX(v),w=a.getX(v+1),E=a.getX(v+2);s=Mr(this,f,t,n,c,u,d,_,w,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,h.start),x=Math.min(a.count,h.start+h.count);for(let m=g,f=x;m<f;m+=3){const S=a.getX(m),b=a.getX(m+1),v=a.getX(m+2);s=Mr(this,o,t,n,c,u,d,S,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=p.length;g<x;g++){const m=p[g],f=o[m.materialIndex],S=Math.max(m.start,h.start),b=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=S,T=b;v<T;v+=3){const _=v,w=v+1,E=v+2;s=Mr(this,f,t,n,c,u,d,_,w,E),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,h.start),x=Math.min(l.count,h.start+h.count);for(let m=g,f=x;m<f;m+=3){const S=m,b=m+1,v=m+2;s=Mr(this,o,t,n,c,u,d,S,b,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function pd(i,t,e,n,s,r,o,a){let l;if(t.side===Ze?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===di,a),l===null)return null;_r.copy(a),_r.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(_r);return c<e.near||c>e.far?null:{distance:c,point:_r.clone(),object:i}}function Mr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,mr),i.getVertexPosition(l,gr),i.getVertexPosition(c,xr);const u=pd(i,t,e,n,mr,gr,xr,nc);if(u){const d=new Q;an.getBarycoord(nc,mr,gr,xr,d),s&&(u.uv=an.getInterpolatedAttribute(s,a,l,c,d,new qt)),r&&(u.uv1=an.getInterpolatedAttribute(r,a,l,c,d,new qt)),o&&(u.normal=an.getInterpolatedAttribute(o,a,l,c,d,new Q),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const p={a,b:l,c,normal:new Q,materialIndex:0};an.getNormal(mr,gr,xr,p.normal),u.face=p,u.barycoord=d}return u}class Rn extends fe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let p=0,h=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,s,o,2),g("x","z","y",1,-1,t,n,-e,s,o,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new te(c,3)),this.setAttribute("normal",new te(u,3)),this.setAttribute("uv",new te(d,2));function g(x,m,f,S,b,v,T,_,w,E,y){const M=v/w,A=T/E,G=v/2,H=T/2,j=_/2,tt=w+1,k=E+1;let z=0,B=0;const Z=new Q;for(let nt=0;nt<k;nt++){const xt=nt*A-H;for(let Rt=0;Rt<tt;Rt++){const Lt=Rt*M-G;Z[x]=Lt*S,Z[m]=xt*b,Z[f]=j,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[m]=0,Z[f]=_>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(Rt/w),d.push(1-nt/E),z+=1}}for(let nt=0;nt<E;nt++)for(let xt=0;xt<w;xt++){const Rt=p+xt+tt*nt,Lt=p+xt+tt*(nt+1),lt=p+(xt+1)+tt*(nt+1),bt=p+(xt+1)+tt*nt;l.push(Rt,Lt,bt),l.push(Lt,lt,bt),B+=6}a.addGroup(h,B,y),h+=B,p+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function gs(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ye(i){const t={};for(let e=0;e<i.length;e++){const n=gs(i[e]);for(const s in n)t[s]=n[s]}return t}function md(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Yu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ne.workingColorSpace}const pi={clone:gs,merge:Ye};var gd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ee extends ys{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gd,this.fragmentShader=xd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gs(t.uniforms),this.uniformsGroups=md(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class $u extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new re,this.projectionMatrix=new re,this.projectionMatrixInverse=new re,this.coordinateSystem=Hn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ei=new Q,ic=new qt,sc=new qt;class nn extends $u{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Zs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(cs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Zs*2*Math.atan(Math.tan(cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){ei.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ei.x,ei.y).multiplyScalar(-t/ei.z),ei.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ei.x,ei.y).multiplyScalar(-t/ei.z)}getViewSize(t,e){return this.getViewBounds(t,ic,sc),e.subVectors(sc,ic)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(cs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ji=-90,Ki=1;class vd extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new nn(ji,Ki,t,e);s.layers=this.layers,this.add(s);const r=new nn(ji,Ki,t,e);r.layers=this.layers,this.add(r);const o=new nn(ji,Ki,t,e);o.layers=this.layers,this.add(o);const a=new nn(ji,Ki,t,e);a.layers=this.layers,this.add(a);const l=new nn(ji,Ki,t,e);l.layers=this.layers,this.add(l);const c=new nn(ji,Ki,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===Hn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Zr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=t.getRenderTarget(),p=t.getActiveCubeFace(),h=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=x,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,p,h),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ju extends Xe{constructor(t,e,n,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:fs,super(t,e,n,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _d extends cn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ju(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:xn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Rn(5,5,5),r=new Ee({name:"CubemapFromEquirect",uniforms:gs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ze,blending:Wn});r.uniforms.tEquirect.value=e;const o=new $t(s,r),a=e.minFilter;return e.minFilter===Pi&&(e.minFilter=xn),new vd(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}const Uo=new Q,Md=new Q,yd=new Zt;class oi{constructor(t=new Q(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Uo.subVectors(n,e).cross(Md.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Uo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yd.getNormalMatrix(t),s=this.coplanarPoint(Uo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new mi,yr=new Q;class ol{constructor(t=new oi,e=new oi,n=new oi,s=new oi,r=new oi,o=new oi){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Hn){const n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],p=s[7],h=s[8],g=s[9],x=s[10],m=s[11],f=s[12],S=s[13],b=s[14],v=s[15];if(n[0].setComponents(l-r,p-c,m-h,v-f).normalize(),n[1].setComponents(l+r,p+c,m+h,v+f).normalize(),n[2].setComponents(l+o,p+u,m+g,v+S).normalize(),n[3].setComponents(l-o,p-u,m-g,v-S).normalize(),n[4].setComponents(l-a,p-d,m-x,v-b).normalize(),e===Hn)n[5].setComponents(l+a,p+d,m+x,v+b).normalize();else if(e===Zr)n[5].setComponents(a,d,x,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(t){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(yr.x=s.normal.x>0?t.max.x:t.min.x,yr.y=s.normal.y>0?t.max.y:t.min.y,yr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(yr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ku(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Sd(i){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,d=c.byteLength,p=i.createBuffer();i.bindBuffer(l,p),i.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=i.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=i.HALF_FLOAT:h=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=i.SHORT;else if(c instanceof Uint32Array)h=i.UNSIGNED_INT;else if(c instanceof Int32Array)h=i.INT;else if(c instanceof Int8Array)h=i.BYTE;else if(c instanceof Uint8Array)h=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:p,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((h,g)=>h.start-g.start);let p=0;for(let h=1;h<d.length;h++){const g=d[p],x=d[h];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++p,d[p]=x)}d.length=p+1;for(let h=0,g=d.length;h<g;h++){const x=d[h];i.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}class Ss extends fe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,u=l+1,d=t/a,p=e/l,h=[],g=[],x=[],m=[];for(let f=0;f<u;f++){const S=f*p-o;for(let b=0;b<c;b++){const v=b*d-r;g.push(v,-S,0),x.push(0,0,1),m.push(b/a),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let S=0;S<a;S++){const b=S+c*f,v=S+c*(f+1),T=S+1+c*(f+1),_=S+1+c*f;h.push(b,v,_),h.push(v,T,_)}this.setIndex(h),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(x,3)),this.setAttribute("uv",new te(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ss(t.width,t.height,t.widthSegments,t.heightSegments)}}var bd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wd=`#ifdef USE_ALPHAHASH
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
#endif`,Ed=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Td=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ad=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cd=`#ifdef USE_AOMAP
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
#endif`,Pd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Ld=`#ifdef USE_BATCHING
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
#endif`,Dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Id=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ud=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nd=`#ifdef USE_IRIDESCENCE
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
#endif`,Fd=`#ifdef USE_BUMPMAP
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
#endif`,Od=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Xd=`#if defined( USE_COLOR_ALPHA )
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
#endif`,qd=`#define PI 3.141592653589793
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
} // validated`,Yd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,$d=`vec3 transformedNormal = objectNormal;
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
#endif`,jd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qd="gl_FragColor = linearToOutputTexel( gl_FragColor );",tp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ep=`#ifdef USE_ENVMAP
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
#endif`,np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ip=`#ifdef USE_ENVMAP
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
#endif`,sp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,rp=`#ifdef USE_ENVMAP
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
#endif`,op=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ap=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,up=`#ifdef USE_GRADIENTMAP
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
}`,hp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pp=`uniform bool receiveShadow;
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
#endif`,mp=`#ifdef USE_ENVMAP
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
#endif`,gp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,_p=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Mp=`PhysicalMaterial material;
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
#endif`,yp=`struct PhysicalMaterial {
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
}`,Sp=`
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
#endif`,bp=`#if defined( RE_IndirectDiffuse )
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
#endif`,wp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ep=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tp=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ap=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rp=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dp=`#if defined( USE_POINTS_UV )
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
#endif`,Ip=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Up=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zp=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Np=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Fp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Op=`#ifdef USE_MORPHTARGETS
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
#endif`,Bp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,kp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Gp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Xp=`#ifdef USE_NORMALMAP
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
#endif`,qp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,$p=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Zp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Jp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Qp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,em=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,im=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,om=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,am=`float getShadowMask() {
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
}`,lm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cm=`#ifdef USE_SKINNING
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
#endif`,um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,hm=`#ifdef USE_SKINNING
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
#endif`,fm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,dm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,gm=`#ifdef USE_TRANSMISSION
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
#endif`,xm=`#ifdef USE_TRANSMISSION
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
#endif`,vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Mm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ym=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bm=`uniform sampler2D t2D;
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
}`,wm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Em=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Tm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Am=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rm=`#include <common>
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
}`,Cm=`#if DEPTH_PACKING == 3200
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
}`,Pm=`#define DISTANCE
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
}`,Lm=`#define DISTANCE
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
}`,Dm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Im=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Um=`uniform float scale;
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
}`,zm=`uniform vec3 diffuse;
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
}`,Nm=`#include <common>
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
}`,Fm=`uniform vec3 diffuse;
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
}`,Om=`#define LAMBERT
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
}`,Bm=`#define LAMBERT
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
}`,km=`#define MATCAP
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
}`,Gm=`#define MATCAP
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
}`,Hm=`#define NORMAL
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
}`,Vm=`#define NORMAL
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
}`,Wm=`#define PHONG
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
}`,Xm=`#define PHONG
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
}`,qm=`#define STANDARD
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
}`,Ym=`#define STANDARD
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
}`,$m=`#define TOON
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
}`,jm=`#define TOON
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
}`,Km=`uniform float size;
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
}`,Zm=`uniform vec3 diffuse;
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
}`,Jm=`#include <common>
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
}`,Qm=`uniform vec3 color;
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
}`,tg=`uniform float rotation;
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
}`,eg=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:bd,alphahash_pars_fragment:wd,alphamap_fragment:Ed,alphamap_pars_fragment:Td,alphatest_fragment:Ad,alphatest_pars_fragment:Rd,aomap_fragment:Cd,aomap_pars_fragment:Pd,batching_pars_vertex:Ld,batching_vertex:Dd,begin_vertex:Id,beginnormal_vertex:Ud,bsdfs:zd,iridescence_fragment:Nd,bumpmap_pars_fragment:Fd,clipping_planes_fragment:Od,clipping_planes_pars_fragment:Bd,clipping_planes_pars_vertex:kd,clipping_planes_vertex:Gd,color_fragment:Hd,color_pars_fragment:Vd,color_pars_vertex:Wd,color_vertex:Xd,common:qd,cube_uv_reflection_fragment:Yd,defaultnormal_vertex:$d,displacementmap_pars_vertex:jd,displacementmap_vertex:Kd,emissivemap_fragment:Zd,emissivemap_pars_fragment:Jd,colorspace_fragment:Qd,colorspace_pars_fragment:tp,envmap_fragment:ep,envmap_common_pars_fragment:np,envmap_pars_fragment:ip,envmap_pars_vertex:sp,envmap_physical_pars_fragment:mp,envmap_vertex:rp,fog_vertex:op,fog_pars_vertex:ap,fog_fragment:lp,fog_pars_fragment:cp,gradientmap_pars_fragment:up,lightmap_pars_fragment:hp,lights_lambert_fragment:fp,lights_lambert_pars_fragment:dp,lights_pars_begin:pp,lights_toon_fragment:gp,lights_toon_pars_fragment:xp,lights_phong_fragment:vp,lights_phong_pars_fragment:_p,lights_physical_fragment:Mp,lights_physical_pars_fragment:yp,lights_fragment_begin:Sp,lights_fragment_maps:bp,lights_fragment_end:wp,logdepthbuf_fragment:Ep,logdepthbuf_pars_fragment:Tp,logdepthbuf_pars_vertex:Ap,logdepthbuf_vertex:Rp,map_fragment:Cp,map_pars_fragment:Pp,map_particle_fragment:Lp,map_particle_pars_fragment:Dp,metalnessmap_fragment:Ip,metalnessmap_pars_fragment:Up,morphinstance_vertex:zp,morphcolor_vertex:Np,morphnormal_vertex:Fp,morphtarget_pars_vertex:Op,morphtarget_vertex:Bp,normal_fragment_begin:kp,normal_fragment_maps:Gp,normal_pars_fragment:Hp,normal_pars_vertex:Vp,normal_vertex:Wp,normalmap_pars_fragment:Xp,clearcoat_normal_fragment_begin:qp,clearcoat_normal_fragment_maps:Yp,clearcoat_pars_fragment:$p,iridescence_pars_fragment:jp,opaque_fragment:Kp,packing:Zp,premultiplied_alpha_fragment:Jp,project_vertex:Qp,dithering_fragment:tm,dithering_pars_fragment:em,roughnessmap_fragment:nm,roughnessmap_pars_fragment:im,shadowmap_pars_fragment:sm,shadowmap_pars_vertex:rm,shadowmap_vertex:om,shadowmask_pars_fragment:am,skinbase_vertex:lm,skinning_pars_vertex:cm,skinning_vertex:um,skinnormal_vertex:hm,specularmap_fragment:fm,specularmap_pars_fragment:dm,tonemapping_fragment:pm,tonemapping_pars_fragment:mm,transmission_fragment:gm,transmission_pars_fragment:xm,uv_pars_fragment:vm,uv_pars_vertex:_m,uv_vertex:Mm,worldpos_vertex:ym,background_vert:Sm,background_frag:bm,backgroundCube_vert:wm,backgroundCube_frag:Em,cube_vert:Tm,cube_frag:Am,depth_vert:Rm,depth_frag:Cm,distanceRGBA_vert:Pm,distanceRGBA_frag:Lm,equirect_vert:Dm,equirect_frag:Im,linedashed_vert:Um,linedashed_frag:zm,meshbasic_vert:Nm,meshbasic_frag:Fm,meshlambert_vert:Om,meshlambert_frag:Bm,meshmatcap_vert:km,meshmatcap_frag:Gm,meshnormal_vert:Hm,meshnormal_frag:Vm,meshphong_vert:Wm,meshphong_frag:Xm,meshphysical_vert:qm,meshphysical_frag:Ym,meshtoon_vert:$m,meshtoon_frag:jm,points_vert:Km,points_frag:Zm,shadow_vert:Jm,shadow_frag:Qm,sprite_vert:tg,sprite_frag:eg},Nt={common:{diffuse:{value:new Gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},envMapRotation:{value:new Zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new qt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new Gt(16777215)},opacity:{value:1},center:{value:new qt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},Ke={basic:{uniforms:Ye([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ye([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ye([Nt.common,Nt.specularmap,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,Nt.lights,{emissive:{value:new Gt(0)},specular:{value:new Gt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ye([Nt.common,Nt.envmap,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.roughnessmap,Nt.metalnessmap,Nt.fog,Nt.lights,{emissive:{value:new Gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ye([Nt.common,Nt.aomap,Nt.lightmap,Nt.emissivemap,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.gradientmap,Nt.fog,Nt.lights,{emissive:{value:new Gt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ye([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,Nt.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ye([Nt.points,Nt.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ye([Nt.common,Nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ye([Nt.common,Nt.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ye([Nt.common,Nt.bumpmap,Nt.normalmap,Nt.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ye([Nt.sprite,Nt.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Zt}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ye([Nt.common,Nt.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ye([Nt.lights,Nt.fog,{color:{value:new Gt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};Ke.physical={uniforms:Ye([Ke.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new qt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new Gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new qt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new Gt(0)},specularColor:{value:new Gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new qt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Sr={r:0,b:0,g:0},yi=new Ln,ng=new re;function ig(i,t,e,n,s,r,o){const a=new Gt(0);let l=r===!0?0:1,c,u,d=null,p=0,h=null;function g(S){let b=S.isScene===!0?S.background:null;return b&&b.isTexture&&(b=(S.backgroundBlurriness>0?e:t).get(b)),b}function x(S){let b=!1;const v=g(S);v===null?f(a,l):v&&v.isColor&&(f(v,1),b=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(S,b){const v=g(b);v&&(v.isCubeTexture||v.mapping===to)?(u===void 0&&(u=new $t(new Rn(1,1,1),new Ee({name:"BackgroundCubeMaterial",uniforms:gs(Ke.backgroundCube.uniforms),vertexShader:Ke.backgroundCube.vertexShader,fragmentShader:Ke.backgroundCube.fragmentShader,side:Ze,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,_,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),yi.copy(b.backgroundRotation),yi.x*=-1,yi.y*=-1,yi.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(yi.y*=-1,yi.z*=-1),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ng.makeRotationFromEuler(yi)),u.material.toneMapped=ne.getTransfer(v.colorSpace)!==ue,(d!==v||p!==v.version||h!==i.toneMapping)&&(u.material.needsUpdate=!0,d=v,p=v.version,h=i.toneMapping),u.layers.enableAll(),S.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new $t(new Ss(2,2),new Ee({name:"BackgroundMaterial",uniforms:gs(Ke.background.uniforms),vertexShader:Ke.background.vertexShader,fragmentShader:Ke.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=ne.getTransfer(v.colorSpace)!==ue,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(d!==v||p!==v.version||h!==i.toneMapping)&&(c.material.needsUpdate=!0,d=v,p=v.version,h=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function f(S,b){S.getRGB(Sr,Yu(i)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,b,o)}return{getClearColor:function(){return a},setClearColor:function(S,b=1){a.set(S),l=b,f(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(a,l)},render:x,addToRenderList:m}}function sg(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(M,A,G,H,j){let tt=!1;const k=d(H,G,A);r!==k&&(r=k,c(r.object)),tt=h(M,H,G,j),tt&&g(M,H,G,j),j!==null&&t.update(j,i.ELEMENT_ARRAY_BUFFER),(tt||o)&&(o=!1,v(M,A,G,H),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function l(){return i.createVertexArray()}function c(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function d(M,A,G){const H=G.wireframe===!0;let j=n[M.id];j===void 0&&(j={},n[M.id]=j);let tt=j[A.id];tt===void 0&&(tt={},j[A.id]=tt);let k=tt[H];return k===void 0&&(k=p(l()),tt[H]=k),k}function p(M){const A=[],G=[],H=[];for(let j=0;j<e;j++)A[j]=0,G[j]=0,H[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:G,attributeDivisors:H,object:M,attributes:{},index:null}}function h(M,A,G,H){const j=r.attributes,tt=A.attributes;let k=0;const z=G.getAttributes();for(const B in z)if(z[B].location>=0){const nt=j[B];let xt=tt[B];if(xt===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(xt=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(xt=M.instanceColor)),nt===void 0||nt.attribute!==xt||xt&&nt.data!==xt.data)return!0;k++}return r.attributesNum!==k||r.index!==H}function g(M,A,G,H){const j={},tt=A.attributes;let k=0;const z=G.getAttributes();for(const B in z)if(z[B].location>=0){let nt=tt[B];nt===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(nt=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(nt=M.instanceColor));const xt={};xt.attribute=nt,nt&&nt.data&&(xt.data=nt.data),j[B]=xt,k++}r.attributes=j,r.attributesNum=k,r.index=H}function x(){const M=r.newAttributes;for(let A=0,G=M.length;A<G;A++)M[A]=0}function m(M){f(M,0)}function f(M,A){const G=r.newAttributes,H=r.enabledAttributes,j=r.attributeDivisors;G[M]=1,H[M]===0&&(i.enableVertexAttribArray(M),H[M]=1),j[M]!==A&&(i.vertexAttribDivisor(M,A),j[M]=A)}function S(){const M=r.newAttributes,A=r.enabledAttributes;for(let G=0,H=A.length;G<H;G++)A[G]!==M[G]&&(i.disableVertexAttribArray(G),A[G]=0)}function b(M,A,G,H,j,tt,k){k===!0?i.vertexAttribIPointer(M,A,G,j,tt):i.vertexAttribPointer(M,A,G,H,j,tt)}function v(M,A,G,H){x();const j=H.attributes,tt=G.getAttributes(),k=A.defaultAttributeValues;for(const z in tt){const B=tt[z];if(B.location>=0){let Z=j[z];if(Z===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),Z!==void 0){const nt=Z.normalized,xt=Z.itemSize,Rt=t.get(Z);if(Rt===void 0)continue;const Lt=Rt.buffer,lt=Rt.type,bt=Rt.bytesPerElement,Pt=lt===i.INT||lt===i.UNSIGNED_INT||Z.gpuType===Za;if(Z.isInterleavedBufferAttribute){const yt=Z.data,Dt=yt.stride,L=Z.offset;if(yt.isInstancedInterleavedBuffer){for(let X=0;X<B.locationSize;X++)f(B.location+X,yt.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=yt.meshPerAttribute*yt.count)}else for(let X=0;X<B.locationSize;X++)m(B.location+X);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let X=0;X<B.locationSize;X++)b(B.location+X,xt/B.locationSize,lt,nt,Dt*bt,(L+xt/B.locationSize*X)*bt,Pt)}else{if(Z.isInstancedBufferAttribute){for(let yt=0;yt<B.locationSize;yt++)f(B.location+yt,Z.meshPerAttribute);M.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let yt=0;yt<B.locationSize;yt++)m(B.location+yt);i.bindBuffer(i.ARRAY_BUFFER,Lt);for(let yt=0;yt<B.locationSize;yt++)b(B.location+yt,xt/B.locationSize,lt,nt,xt*bt,xt/B.locationSize*yt*bt,Pt)}}else if(k!==void 0){const nt=k[z];if(nt!==void 0)switch(nt.length){case 2:i.vertexAttrib2fv(B.location,nt);break;case 3:i.vertexAttrib3fv(B.location,nt);break;case 4:i.vertexAttrib4fv(B.location,nt);break;default:i.vertexAttrib1fv(B.location,nt)}}}}S()}function T(){E();for(const M in n){const A=n[M];for(const G in A){const H=A[G];for(const j in H)u(H[j].object),delete H[j];delete A[G]}delete n[M]}}function _(M){if(n[M.id]===void 0)return;const A=n[M.id];for(const G in A){const H=A[G];for(const j in H)u(H[j].object),delete H[j];delete A[G]}delete n[M.id]}function w(M){for(const A in n){const G=n[A];if(G[M.id]===void 0)continue;const H=G[M.id];for(const j in H)u(H[j].object),delete H[j];delete G[M.id]}}function E(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:E,resetDefaultState:y,dispose:T,releaseStatesOfGeometry:_,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:m,disableUnusedAttributes:S}}function rg(i,t,e){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),e.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),e.update(u,n,d))}function a(c,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let g=0;g<d;g++)h+=u[g];e.update(h,n,1)}function l(c,u,d,p){if(d===0)return;const h=t.get("WEBGL_multi_draw");if(h===null)for(let g=0;g<c.length;g++)o(c[g],u[g],p[g]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,p,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x]*p[x];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function og(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(w){return!(w!==vn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const E=w===Cn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Pn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==An&&!E)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=e.logarithmicDepthBuffer===!0,p=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,_=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:h,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:S,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:T,maxSamples:_}}function ag(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new oi,a=new Zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const h=d.length!==0||p||n!==0||s;return s=p,n=d.length,h},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){e=u(d,p,0)},this.setState=function(d,p,h){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const S=r?0:n,b=S*4;let v=f.clippingState||null;l.value=v,v=u(g,p,b,h);for(let T=0;T!==b;++T)v[T]=e[T];f.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,p,h,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const f=h+x*4,S=p.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<f)&&(m=new Float32Array(f));for(let b=0,v=h;b!==x;++b,v+=4)o.copy(d[b]).applyMatrix4(S,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}function lg(i){let t=new WeakMap;function e(o,a){return a===ha?o.mapping=fs:a===fa&&(o.mapping=ds),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ha||a===fa)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new _d(l.height);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class al extends $u{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ss=4,rc=[.125,.215,.35,.446,.526,.582],Ri=20,zo=new al,oc=new Gt;let No=null,Fo=0,Oo=0,Bo=!1;const Ti=(1+Math.sqrt(5))/2,Zi=1/Ti,ac=[new Q(-Ti,Zi,0),new Q(Ti,Zi,0),new Q(-Zi,0,Ti),new Q(Zi,0,Ti),new Q(0,Ti,-Zi),new Q(0,Ti,Zi),new Q(-1,1,-1),new Q(1,1,-1),new Q(-1,1,1),new Q(1,1,1)];class lc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){No=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(No,Fo,Oo),this._renderer.xr.enabled=Bo,t.scissorTest=!1,br(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===fs||t.mapping===ds?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),No=this._renderer.getRenderTarget(),Fo=this._renderer.getActiveCubeFace(),Oo=this._renderer.getActiveMipmapLevel(),Bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:xn,minFilter:xn,generateMipmaps:!1,type:Cn,format:vn,colorSpace:_s,depthBuffer:!1},s=cc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cg(r)),this._blurMaterial=ug(r,t,e)}return s}_compileMaterial(t){const e=new $t(this._lodPlanes[0],t);this._renderer.compile(e,zo)}_sceneToCubeUV(t,e,n,s){const a=new nn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,p=u.toneMapping;u.getClearColor(oc),u.toneMapping=fi,u.autoClear=!1;const h=new we({name:"PMREM.Background",side:Ze,depthWrite:!1,depthTest:!1}),g=new $t(new Rn,h);let x=!1;const m=t.background;m?m.isColor&&(h.color.copy(m),t.background=null,x=!0):(h.color.copy(oc),x=!0);for(let f=0;f<6;f++){const S=f%3;S===0?(a.up.set(0,l[f],0),a.lookAt(c[f],0,0)):S===1?(a.up.set(0,0,l[f]),a.lookAt(0,c[f],0)):(a.up.set(0,l[f],0),a.lookAt(0,0,c[f]));const b=this._cubeSize;br(s,S*b,f>2?b:0,b,b),u.setRenderTarget(s),x&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=p,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===fs||t.mapping===ds;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uc());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new $t(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;br(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,zo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=ac[(s-r-1)%ac.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new $t(this._lodPlanes[s],c),p=c.uniforms,h=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*h):2*Math.PI/(2*Ri-1),x=r/g,m=isFinite(r)?1+Math.floor(u*x):Ri;m>Ri&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ri}`);const f=[];let S=0;for(let w=0;w<Ri;++w){const E=w/x,y=Math.exp(-E*E/2);f.push(y),w===0?S+=y:w<m&&(S+=2*y)}for(let w=0;w<f.length;w++)f[w]=f[w]/S;p.envMap.value=t.texture,p.samples.value=m,p.weights.value=f,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:b}=this;p.dTheta.value=g,p.mipInt.value=b-n;const v=this._sizeLods[s],T=3*v*(s>b-ss?s-b+ss:0),_=4*(this._cubeSize-v);br(e,T,_,3*v,2*v),l.setRenderTarget(e),l.render(d,zo)}}function cg(i){const t=[],e=[],n=[];let s=i;const r=i-ss+1+rc.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>i-ss?l=rc[o-i+ss-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,p=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,g=6,x=3,m=2,f=1,S=new Float32Array(x*g*h),b=new Float32Array(m*g*h),v=new Float32Array(f*g*h);for(let _=0;_<h;_++){const w=_%3*2/3-1,E=_>2?0:-1,y=[w,E,0,w+2/3,E,0,w+2/3,E+1,0,w,E,0,w+2/3,E+1,0,w,E+1,0];S.set(y,x*g*_),b.set(p,m*g*_);const M=[_,_,_,_,_,_];v.set(M,f*g*_)}const T=new fe;T.setAttribute("position",new _e(S,x)),T.setAttribute("uv",new _e(b,m)),T.setAttribute("faceIndex",new _e(v,f)),t.push(T),s>ss&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function cc(i,t,e){const n=new cn(i,t,e);return n.texture.mapping=to,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function br(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function ug(i,t,e){const n=new Float32Array(Ri),s=new Q(0,1,0);return new Ee({name:"SphericalGaussianBlur",defines:{n:Ri,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ll(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function uc(){return new Ee({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ll(),fragmentShader:`

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
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function hc(){return new Ee({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function ll(){return`

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
	`}function hg(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===ha||l===fa,u=l===fs||l===ds;if(c||u){let d=t.get(a);const p=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return e===null&&(e=new lc(i)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&s(h)?(e===null&&(e=new lc(i)),d=c?e.fromEquirectangular(a):e.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,t.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function fg(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Vs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function dg(i,t,e,n){const s={},r=new WeakMap;function o(d){const p=d.target;p.index!==null&&t.remove(p.index);for(const g in p.attributes)t.remove(p.attributes[g]);for(const g in p.morphAttributes){const x=p.morphAttributes[g];for(let m=0,f=x.length;m<f;m++)t.remove(x[m])}p.removeEventListener("dispose",o),delete s[p.id];const h=r.get(p);h&&(t.remove(h),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function a(d,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,e.memory.geometries++),p}function l(d){const p=d.attributes;for(const g in p)t.update(p[g],i.ARRAY_BUFFER);const h=d.morphAttributes;for(const g in h){const x=h[g];for(let m=0,f=x.length;m<f;m++)t.update(x[m],i.ARRAY_BUFFER)}}function c(d){const p=[],h=d.index,g=d.attributes.position;let x=0;if(h!==null){const S=h.array;x=h.version;for(let b=0,v=S.length;b<v;b+=3){const T=S[b+0],_=S[b+1],w=S[b+2];p.push(T,_,_,w,w,T)}}else if(g!==void 0){const S=g.array;x=g.version;for(let b=0,v=S.length/3-1;b<v;b+=3){const T=b+0,_=b+1,w=b+2;p.push(T,_,_,w,w,T)}}else return;const m=new(Gu(p)?qu:Xu)(p,1);m.version=x;const f=r.get(d);f&&t.remove(f),r.set(d,m)}function u(d){const p=r.get(d);if(p){const h=d.index;h!==null&&p.version<h.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function pg(i,t,e){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function l(p,h){i.drawElements(n,h,r,p*o),e.update(h,n,1)}function c(p,h,g){g!==0&&(i.drawElementsInstanced(n,h,r,p*o,g),e.update(h,n,g))}function u(p,h,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,r,p,0,g);let m=0;for(let f=0;f<g;f++)m+=h[f];e.update(m,n,1)}function d(p,h,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<p.length;f++)c(p[f]/o,h[f],x[f]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,r,p,0,x,0,g);let f=0;for(let S=0;S<g;S++)f+=h[S]*x[S];e.update(f,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function mg(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function gg(i,t,e){const n=new WeakMap,s=new ie;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let p=n.get(a);if(p===void 0||p.count!==d){let y=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",y)};p!==void 0&&p.texture.dispose();const h=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],f=a.morphAttributes.normal||[],S=a.morphAttributes.color||[];let b=0;h===!0&&(b=1),g===!0&&(b=2),x===!0&&(b=3);let v=a.attributes.position.count*b,T=1;v>t.maxTextureSize&&(T=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const _=new Float32Array(v*T*4*d),w=new Vu(_,v,T,d);w.type=An,w.needsUpdate=!0;const E=b*4;for(let M=0;M<d;M++){const A=m[M],G=f[M],H=S[M],j=v*T*4*M;for(let tt=0;tt<A.count;tt++){const k=tt*E;h===!0&&(s.fromBufferAttribute(A,tt),_[j+k+0]=s.x,_[j+k+1]=s.y,_[j+k+2]=s.z,_[j+k+3]=0),g===!0&&(s.fromBufferAttribute(G,tt),_[j+k+4]=s.x,_[j+k+5]=s.y,_[j+k+6]=s.z,_[j+k+7]=0),x===!0&&(s.fromBufferAttribute(H,tt),_[j+k+8]=s.x,_[j+k+9]=s.y,_[j+k+10]=s.z,_[j+k+11]=H.itemSize===4?s.w:1)}}p={count:d,texture:w,size:new qt(v,T)},n.set(a,p),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let h=0;for(let x=0;x<c.length;x++)h+=c[x];const g=a.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function xg(i,t,e,n){let s=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const p=l.skeleton;s.get(p)!==c&&(p.update(),s.set(p,c))}return d}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}class cl extends Xe{constructor(t,e,n,s,r,o,a,l,c,u=ls){if(u!==ls&&u!==ms)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ls&&(n=Ii),n===void 0&&u===ms&&(n=ps),super(null,s,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:sn,this.minFilter=l!==void 0?l:sn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Zu=new Xe,fc=new cl(1,1),Ju=new Vu,Qu=new sd,th=new ju,dc=[],pc=[],mc=new Float32Array(16),gc=new Float32Array(9),xc=new Float32Array(4);function bs(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=dc[s];if(r===void 0&&(r=new Float32Array(s),dc[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Te(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ae(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function io(i,t){let e=pc[t];e===void 0&&(e=new Int32Array(t),pc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function vg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function _g(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2fv(this.addr,t),Ae(e,t)}}function Mg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;i.uniform3fv(this.addr,t),Ae(e,t)}}function yg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4fv(this.addr,t),Ae(e,t)}}function Sg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;xc.set(n),i.uniformMatrix2fv(this.addr,!1,xc),Ae(e,n)}}function bg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;gc.set(n),i.uniformMatrix3fv(this.addr,!1,gc),Ae(e,n)}}function wg(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;mc.set(n),i.uniformMatrix4fv(this.addr,!1,mc),Ae(e,n)}}function Eg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Tg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2iv(this.addr,t),Ae(e,t)}}function Ag(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3iv(this.addr,t),Ae(e,t)}}function Rg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4iv(this.addr,t),Ae(e,t)}}function Cg(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Pg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;i.uniform2uiv(this.addr,t),Ae(e,t)}}function Lg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;i.uniform3uiv(this.addr,t),Ae(e,t)}}function Dg(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;i.uniform4uiv(this.addr,t),Ae(e,t)}}function Ig(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(fc.compareFunction=ku,r=fc):r=Zu,e.setTexture2D(t||r,s)}function Ug(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Qu,s)}function zg(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||th,s)}function Ng(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ju,s)}function Fg(i){switch(i){case 5126:return vg;case 35664:return _g;case 35665:return Mg;case 35666:return yg;case 35674:return Sg;case 35675:return bg;case 35676:return wg;case 5124:case 35670:return Eg;case 35667:case 35671:return Tg;case 35668:case 35672:return Ag;case 35669:case 35673:return Rg;case 5125:return Cg;case 36294:return Pg;case 36295:return Lg;case 36296:return Dg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ig;case 35679:case 36299:case 36307:return Ug;case 35680:case 36300:case 36308:case 36293:return zg;case 36289:case 36303:case 36311:case 36292:return Ng}}function Og(i,t){i.uniform1fv(this.addr,t)}function Bg(i,t){const e=bs(t,this.size,2);i.uniform2fv(this.addr,e)}function kg(i,t){const e=bs(t,this.size,3);i.uniform3fv(this.addr,e)}function Gg(i,t){const e=bs(t,this.size,4);i.uniform4fv(this.addr,e)}function Hg(i,t){const e=bs(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Vg(i,t){const e=bs(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Wg(i,t){const e=bs(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Xg(i,t){i.uniform1iv(this.addr,t)}function qg(i,t){i.uniform2iv(this.addr,t)}function Yg(i,t){i.uniform3iv(this.addr,t)}function $g(i,t){i.uniform4iv(this.addr,t)}function jg(i,t){i.uniform1uiv(this.addr,t)}function Kg(i,t){i.uniform2uiv(this.addr,t)}function Zg(i,t){i.uniform3uiv(this.addr,t)}function Jg(i,t){i.uniform4uiv(this.addr,t)}function Qg(i,t,e){const n=this.cache,s=t.length,r=io(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Zu,r[o])}function t0(i,t,e){const n=this.cache,s=t.length,r=io(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Qu,r[o])}function e0(i,t,e){const n=this.cache,s=t.length,r=io(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||th,r[o])}function n0(i,t,e){const n=this.cache,s=t.length,r=io(e,s);Te(n,r)||(i.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ju,r[o])}function i0(i){switch(i){case 5126:return Og;case 35664:return Bg;case 35665:return kg;case 35666:return Gg;case 35674:return Hg;case 35675:return Vg;case 35676:return Wg;case 5124:case 35670:return Xg;case 35667:case 35671:return qg;case 35668:case 35672:return Yg;case 35669:case 35673:return $g;case 5125:return jg;case 36294:return Kg;case 36295:return Zg;case 36296:return Jg;case 35678:case 36198:case 36298:case 36306:case 35682:return Qg;case 35679:case 36299:case 36307:return t0;case 35680:case 36300:case 36308:case 36293:return e0;case 36289:case 36303:case 36311:case 36292:return n0}}class s0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Fg(e.type)}}class r0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=i0(e.type)}}class o0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const ko=/(\w+)(\])?(\[|\.)?/g;function vc(i,t){i.seq.push(t),i.map[t.id]=t}function a0(i,t,e){const n=i.name,s=n.length;for(ko.lastIndex=0;;){const r=ko.exec(n),o=ko.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){vc(e,c===void 0?new s0(a,i,t):new r0(a,i,t));break}else{let d=e.map[a];d===void 0&&(d=new o0(a),vc(e,d)),e=d}}}class $r{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);a0(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function _c(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const l0=37297;let c0=0;function u0(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Mc=new Zt;function h0(i){ne._getMatrix(Mc,ne.workingColorSpace,i);const t=`mat3( ${Mc.elements.map(e=>e.toFixed(4))} )`;switch(ne.getTransfer(i)){case no:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function yc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+u0(i.getShaderSource(t),o)}else return s}function f0(i,t){const e=h0(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function d0(i,t){let e;switch(t){case bu:e="Linear";break;case wu:e="Reinhard";break;case Eu:e="Cineon";break;case Tu:e="ACESFilmic";break;case Au:e="AgX";break;case Ru:e="Neutral";break;case Sf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const wr=new Q;function p0(){ne.getLuminanceCoefficients(wr);const i=wr.x.toFixed(4),t=wr.y.toFixed(4),e=wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m0(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ws).join(`
`)}function g0(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function x0(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function Ws(i){return i!==""}function Sc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function bc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const v0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(i){return i.replace(v0,M0)}const _0=new Map;function M0(i,t){let e=Jt[t];if(e===void 0){const n=_0.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ha(e)}const y0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(i){return i.replace(y0,S0)}function S0(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ec(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function b0(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Su?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===tf?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Bn&&(t="SHADOWMAP_TYPE_VSM"),t}function w0(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case fs:case ds:t="ENVMAP_TYPE_CUBE";break;case to:t="ENVMAP_TYPE_CUBE_UV";break}return t}function E0(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ds:t="ENVMAP_MODE_REFRACTION";break}return t}function T0(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Ka:t="ENVMAP_BLENDING_MULTIPLY";break;case Mf:t="ENVMAP_BLENDING_MIX";break;case yf:t="ENVMAP_BLENDING_ADD";break}return t}function A0(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function R0(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=b0(e),c=w0(e),u=E0(e),d=T0(e),p=A0(e),h=m0(e),g=g0(r),x=s.createProgram();let m,f,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ws).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ws).join(`
`),f.length>0&&(f+=`
`)):(m=[Ec(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),f=[Ec(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==fi?"#define TONE_MAPPING":"",e.toneMapping!==fi?Jt.tonemapping_pars_fragment:"",e.toneMapping!==fi?d0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,f0("linearToOutputTexel",e.outputColorSpace),p0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ws).join(`
`)),o=Ha(o),o=Sc(o,e),o=bc(o,e),a=Ha(a),a=Sc(a,e),a=bc(a,e),o=wc(o),a=wc(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const b=S+m+o,v=S+f+a,T=_c(s,s.VERTEX_SHADER,b),_=_c(s,s.FRAGMENT_SHADER,v);s.attachShader(x,T),s.attachShader(x,_),e.index0AttributeName!==void 0?s.bindAttribLocation(x,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(A){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(x).trim(),H=s.getShaderInfoLog(T).trim(),j=s.getShaderInfoLog(_).trim();let tt=!0,k=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(tt=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,x,T,_);else{const z=yc(s,T,"vertex"),B=yc(s,_,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+G+`
`+z+`
`+B)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(H===""||j==="")&&(k=!1);k&&(A.diagnostics={runnable:tt,programLog:G,vertexShader:{log:H,prefix:m},fragmentShader:{log:j,prefix:f}})}s.deleteShader(T),s.deleteShader(_),E=new $r(s,x),y=x0(s,x)}let E;this.getUniforms=function(){return E===void 0&&w(this),E};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,l0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=c0++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=T,this.fragmentShader=_,this}let C0=0;class P0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new L0(t),e.set(t,n)),n}}class L0{constructor(t){this.id=C0++,this.code=t,this.usedTimes=0}}function D0(i,t,e,n,s,r,o){const a=new rl,l=new P0,c=new Set,u=[],d=s.logarithmicDepthBuffer,p=s.vertexTextures;let h=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,M,A,G,H){const j=G.fog,tt=H.geometry,k=y.isMeshStandardMaterial?G.environment:null,z=(y.isMeshStandardMaterial?e:t).get(y.envMap||k),B=z&&z.mapping===to?z.image.height:null,Z=g[y.type];y.precision!==null&&(h=s.getMaxPrecision(y.precision),h!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const nt=tt.morphAttributes.position||tt.morphAttributes.normal||tt.morphAttributes.color,xt=nt!==void 0?nt.length:0;let Rt=0;tt.morphAttributes.position!==void 0&&(Rt=1),tt.morphAttributes.normal!==void 0&&(Rt=2),tt.morphAttributes.color!==void 0&&(Rt=3);let Lt,lt,bt,Pt;if(Z){const It=Ke[Z];Lt=It.vertexShader,lt=It.fragmentShader}else Lt=y.vertexShader,lt=y.fragmentShader,l.update(y),bt=l.getVertexShaderID(y),Pt=l.getFragmentShaderID(y);const yt=i.getRenderTarget(),Dt=i.state.buffers.depth.getReversed(),L=H.isInstancedMesh===!0,X=H.isBatchedMesh===!0,et=!!y.map,st=!!y.matcap,pt=!!z,V=!!y.aoMap,zt=!!y.lightMap,vt=!!y.bumpMap,Tt=!!y.normalMap,Et=!!y.displacementMap,Bt=!!y.emissiveMap,ht=!!y.metalnessMap,I=!!y.roughnessMap,C=y.anisotropy>0,R=y.clearcoat>0,U=y.dispersion>0,$=y.iridescence>0,W=y.sheen>0,St=y.transmission>0,ct=C&&!!y.anisotropyMap,mt=R&&!!y.clearcoatMap,Ct=R&&!!y.clearcoatNormalMap,_t=R&&!!y.clearcoatRoughnessMap,O=$&&!!y.iridescenceMap,K=$&&!!y.iridescenceThicknessMap,J=W&&!!y.sheenColorMap,F=W&&!!y.sheenRoughnessMap,ut=!!y.specularMap,gt=!!y.specularColorMap,At=!!y.specularIntensityMap,q=St&&!!y.transmissionMap,P=St&&!!y.thicknessMap,N=!!y.gradientMap,Y=!!y.alphaMap,at=y.alphaTest>0,ot=!!y.alphaHash,Mt=!!y.extensions;let wt=fi;y.toneMapped&&(yt===null||yt.isXRRenderTarget===!0)&&(wt=i.toneMapping);const Ft={shaderID:Z,shaderType:y.type,shaderName:y.name,vertexShader:Lt,fragmentShader:lt,defines:y.defines,customVertexShaderID:bt,customFragmentShaderID:Pt,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:X,batchingColor:X&&H._colorsTexture!==null,instancing:L,instancingColor:L&&H.instanceColor!==null,instancingMorph:L&&H.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:yt===null?i.outputColorSpace:yt.isXRRenderTarget===!0?yt.texture.colorSpace:_s,alphaToCoverage:!!y.alphaToCoverage,map:et,matcap:st,envMap:pt,envMapMode:pt&&z.mapping,envMapCubeUVHeight:B,aoMap:V,lightMap:zt,bumpMap:vt,normalMap:Tt,displacementMap:p&&Et,emissiveMap:Bt,normalMapObjectSpace:Tt&&y.normalMapType===Tf,normalMapTangentSpace:Tt&&y.normalMapType===Bu,metalnessMap:ht,roughnessMap:I,anisotropy:C,anisotropyMap:ct,clearcoat:R,clearcoatMap:mt,clearcoatNormalMap:Ct,clearcoatRoughnessMap:_t,dispersion:U,iridescence:$,iridescenceMap:O,iridescenceThicknessMap:K,sheen:W,sheenColorMap:J,sheenRoughnessMap:F,specularMap:ut,specularColorMap:gt,specularIntensityMap:At,transmission:St,transmissionMap:q,thicknessMap:P,gradientMap:N,opaque:y.transparent===!1&&y.blending===as&&y.alphaToCoverage===!1,alphaMap:Y,alphaTest:at,alphaHash:ot,combine:y.combine,mapUv:et&&x(y.map.channel),aoMapUv:V&&x(y.aoMap.channel),lightMapUv:zt&&x(y.lightMap.channel),bumpMapUv:vt&&x(y.bumpMap.channel),normalMapUv:Tt&&x(y.normalMap.channel),displacementMapUv:Et&&x(y.displacementMap.channel),emissiveMapUv:Bt&&x(y.emissiveMap.channel),metalnessMapUv:ht&&x(y.metalnessMap.channel),roughnessMapUv:I&&x(y.roughnessMap.channel),anisotropyMapUv:ct&&x(y.anisotropyMap.channel),clearcoatMapUv:mt&&x(y.clearcoatMap.channel),clearcoatNormalMapUv:Ct&&x(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_t&&x(y.clearcoatRoughnessMap.channel),iridescenceMapUv:O&&x(y.iridescenceMap.channel),iridescenceThicknessMapUv:K&&x(y.iridescenceThicknessMap.channel),sheenColorMapUv:J&&x(y.sheenColorMap.channel),sheenRoughnessMapUv:F&&x(y.sheenRoughnessMap.channel),specularMapUv:ut&&x(y.specularMap.channel),specularColorMapUv:gt&&x(y.specularColorMap.channel),specularIntensityMapUv:At&&x(y.specularIntensityMap.channel),transmissionMapUv:q&&x(y.transmissionMap.channel),thicknessMapUv:P&&x(y.thicknessMap.channel),alphaMapUv:Y&&x(y.alphaMap.channel),vertexTangents:!!tt.attributes.tangent&&(Tt||C),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!tt.attributes.color&&tt.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!tt.attributes.uv&&(et||Y),fog:!!j,useFog:y.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Dt,skinning:H.isSkinnedMesh===!0,morphTargets:tt.morphAttributes.position!==void 0,morphNormals:tt.morphAttributes.normal!==void 0,morphColors:tt.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:Rt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:wt,decodeVideoTexture:et&&y.map.isVideoTexture===!0&&ne.getTransfer(y.map.colorSpace)===ue,decodeVideoTextureEmissive:Bt&&y.emissiveMap.isVideoTexture===!0&&ne.getTransfer(y.emissiveMap.colorSpace)===ue,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ve,flipSided:y.side===Ze,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Mt&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Mt&&y.extensions.multiDraw===!0||X)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ft.vertexUv1s=c.has(1),Ft.vertexUv2s=c.has(2),Ft.vertexUv3s=c.has(3),c.clear(),Ft}function f(y){const M=[];if(y.shaderID?M.push(y.shaderID):(M.push(y.customVertexShaderID),M.push(y.customFragmentShaderID)),y.defines!==void 0)for(const A in y.defines)M.push(A),M.push(y.defines[A]);return y.isRawShaderMaterial===!1&&(S(M,y),b(M,y),M.push(i.outputColorSpace)),M.push(y.customProgramCacheKey),M.join()}function S(y,M){y.push(M.precision),y.push(M.outputColorSpace),y.push(M.envMapMode),y.push(M.envMapCubeUVHeight),y.push(M.mapUv),y.push(M.alphaMapUv),y.push(M.lightMapUv),y.push(M.aoMapUv),y.push(M.bumpMapUv),y.push(M.normalMapUv),y.push(M.displacementMapUv),y.push(M.emissiveMapUv),y.push(M.metalnessMapUv),y.push(M.roughnessMapUv),y.push(M.anisotropyMapUv),y.push(M.clearcoatMapUv),y.push(M.clearcoatNormalMapUv),y.push(M.clearcoatRoughnessMapUv),y.push(M.iridescenceMapUv),y.push(M.iridescenceThicknessMapUv),y.push(M.sheenColorMapUv),y.push(M.sheenRoughnessMapUv),y.push(M.specularMapUv),y.push(M.specularColorMapUv),y.push(M.specularIntensityMapUv),y.push(M.transmissionMapUv),y.push(M.thicknessMapUv),y.push(M.combine),y.push(M.fogExp2),y.push(M.sizeAttenuation),y.push(M.morphTargetsCount),y.push(M.morphAttributeCount),y.push(M.numDirLights),y.push(M.numPointLights),y.push(M.numSpotLights),y.push(M.numSpotLightMaps),y.push(M.numHemiLights),y.push(M.numRectAreaLights),y.push(M.numDirLightShadows),y.push(M.numPointLightShadows),y.push(M.numSpotLightShadows),y.push(M.numSpotLightShadowsWithMaps),y.push(M.numLightProbes),y.push(M.shadowMapType),y.push(M.toneMapping),y.push(M.numClippingPlanes),y.push(M.numClipIntersection),y.push(M.depthPacking)}function b(y,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),y.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const M=g[y.type];let A;if(M){const G=Ke[M];A=pi.clone(G.uniforms)}else A=y.uniforms;return A}function T(y,M){let A;for(let G=0,H=u.length;G<H;G++){const j=u[G];if(j.cacheKey===M){A=j,++A.usedTimes;break}}return A===void 0&&(A=new R0(i,M,y,r),u.push(A)),A}function _(y){if(--y.usedTimes===0){const M=u.indexOf(y);u[M]=u[u.length-1],u.pop(),y.destroy()}}function w(y){l.remove(y)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:v,acquireProgram:T,releaseProgram:_,releaseShaderCache:w,programs:u,dispose:E}}function I0(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,l){i.get(o)[a]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function U0(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Tc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ac(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(d,p,h,g,x,m){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:p,material:h,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},i[t]=f):(f.id=d.id,f.object=d,f.geometry=p,f.material=h,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=x,f.group=m),t++,f}function a(d,p,h,g,x,m){const f=o(d,p,h,g,x,m);h.transmission>0?n.push(f):h.transparent===!0?s.push(f):e.push(f)}function l(d,p,h,g,x,m){const f=o(d,p,h,g,x,m);h.transmission>0?n.unshift(f):h.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,p){e.length>1&&e.sort(d||U0),n.length>1&&n.sort(p||Tc),s.length>1&&s.sort(p||Tc)}function u(){for(let d=t,p=i.length;d<p;d++){const h=i[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function z0(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ac,i.set(n,[o])):s>=r.length?(o=new Ac,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function N0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new Q,color:new Gt};break;case"SpotLight":e={position:new Q,direction:new Q,color:new Gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new Q,color:new Gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new Q,skyColor:new Gt,groundColor:new Gt};break;case"RectAreaLight":e={color:new Gt,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return i[t.id]=e,e}}}function F0(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let O0=0;function B0(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function k0(i){const t=new N0,e=F0(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Q);const s=new Q,r=new re,o=new re;function a(c){let u=0,d=0,p=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let h=0,g=0,x=0,m=0,f=0,S=0,b=0,v=0,T=0,_=0,w=0;c.sort(B0);for(let y=0,M=c.length;y<M;y++){const A=c[y],G=A.color,H=A.intensity,j=A.distance,tt=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=G.r*H,d+=G.g*H,p+=G.b*H;else if(A.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(A.sh.coefficients[k],H);w++}else if(A.isDirectionalLight){const k=t.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const z=A.shadow,B=e.get(A);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,n.directionalShadow[h]=B,n.directionalShadowMap[h]=tt,n.directionalShadowMatrix[h]=A.shadow.matrix,S++}n.directional[h]=k,h++}else if(A.isSpotLight){const k=t.get(A);k.position.setFromMatrixPosition(A.matrixWorld),k.color.copy(G).multiplyScalar(H),k.distance=j,k.coneCos=Math.cos(A.angle),k.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),k.decay=A.decay,n.spot[x]=k;const z=A.shadow;if(A.map&&(n.spotLightMap[T]=A.map,T++,z.updateMatrices(A),A.castShadow&&_++),n.spotLightMatrix[x]=z.matrix,A.castShadow){const B=e.get(A);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,n.spotShadow[x]=B,n.spotShadowMap[x]=tt,v++}x++}else if(A.isRectAreaLight){const k=t.get(A);k.color.copy(G).multiplyScalar(H),k.halfWidth.set(A.width*.5,0,0),k.halfHeight.set(0,A.height*.5,0),n.rectArea[m]=k,m++}else if(A.isPointLight){const k=t.get(A);if(k.color.copy(A.color).multiplyScalar(A.intensity),k.distance=A.distance,k.decay=A.decay,A.castShadow){const z=A.shadow,B=e.get(A);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,B.shadowCameraNear=z.camera.near,B.shadowCameraFar=z.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=tt,n.pointShadowMatrix[g]=A.shadow.matrix,b++}n.point[g]=k,g++}else if(A.isHemisphereLight){const k=t.get(A);k.skyColor.copy(A.color).multiplyScalar(H),k.groundColor.copy(A.groundColor).multiplyScalar(H),n.hemi[f]=k,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Nt.LTC_FLOAT_1,n.rectAreaLTC2=Nt.LTC_FLOAT_2):(n.rectAreaLTC1=Nt.LTC_HALF_1,n.rectAreaLTC2=Nt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=p;const E=n.hash;(E.directionalLength!==h||E.pointLength!==g||E.spotLength!==x||E.rectAreaLength!==m||E.hemiLength!==f||E.numDirectionalShadows!==S||E.numPointShadows!==b||E.numSpotShadows!==v||E.numSpotMaps!==T||E.numLightProbes!==w)&&(n.directional.length=h,n.spot.length=x,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+T-_,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=_,n.numLightProbes=w,E.directionalLength=h,E.pointLength=g,E.spotLength=x,E.rectAreaLength=m,E.hemiLength=f,E.numDirectionalShadows=S,E.numPointShadows=b,E.numSpotShadows=v,E.numSpotMaps=T,E.numLightProbes=w,n.version=O0++)}function l(c,u){let d=0,p=0,h=0,g=0,x=0;const m=u.matrixWorldInverse;for(let f=0,S=c.length;f<S;f++){const b=c[f];if(b.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),d++}else if(b.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(m),h++}else if(b.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const v=n.point[p];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(m),p++}else if(b.isHemisphereLight){const v=n.hemi[x];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:n}}function Rc(i){const t=new k0(i),e=[],n=[];function s(u){c.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function o(u){n.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function G0(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Rc(i),t.set(s,[a])):r>=o.length?(a=new Rc(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class H0 extends ys{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class V0 extends ys{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const W0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X0=`uniform sampler2D shadow_pass;
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
}`;function q0(i,t,e){let n=new ol;const s=new qt,r=new qt,o=new ie,a=new H0({depthPacking:Ef}),l=new V0,c={},u=e.maxTextureSize,d={[di]:Ze,[Ze]:di,[ve]:ve},p=new Ee({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qt},radius:{value:4}},vertexShader:W0,fragmentShader:X0}),h=p.clone();h.defines.HORIZONTAL_PASS=1;const g=new fe;g.setAttribute("position",new _e(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new $t(g,p),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Su;let f=this.type;this.render=function(_,w,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||_.length===0)return;const y=i.getRenderTarget(),M=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),G=i.state;G.setBlending(Wn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const H=f!==Bn&&this.type===Bn,j=f===Bn&&this.type!==Bn;for(let tt=0,k=_.length;tt<k;tt++){const z=_[tt],B=z.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const Z=B.getFrameExtents();if(s.multiply(Z),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,B.mapSize.y=r.y)),B.map===null||H===!0||j===!0){const xt=this.type!==Bn?{minFilter:sn,magFilter:sn}:{};B.map!==null&&B.map.dispose(),B.map=new cn(s.x,s.y,xt),B.map.texture.name=z.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const nt=B.getViewportCount();for(let xt=0;xt<nt;xt++){const Rt=B.getViewport(xt);o.set(r.x*Rt.x,r.y*Rt.y,r.x*Rt.z,r.y*Rt.w),G.viewport(o),B.updateMatrices(z,xt),n=B.getFrustum(),v(w,E,B.camera,z,this.type)}B.isPointLightShadow!==!0&&this.type===Bn&&S(B,E),B.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(y,M,A)};function S(_,w){const E=t.update(x);p.defines.VSM_SAMPLES!==_.blurSamples&&(p.defines.VSM_SAMPLES=_.blurSamples,h.defines.VSM_SAMPLES=_.blurSamples,p.needsUpdate=!0,h.needsUpdate=!0),_.mapPass===null&&(_.mapPass=new cn(s.x,s.y)),p.uniforms.shadow_pass.value=_.map.texture,p.uniforms.resolution.value=_.mapSize,p.uniforms.radius.value=_.radius,i.setRenderTarget(_.mapPass),i.clear(),i.renderBufferDirect(w,null,E,p,x,null),h.uniforms.shadow_pass.value=_.mapPass.texture,h.uniforms.resolution.value=_.mapSize,h.uniforms.radius.value=_.radius,i.setRenderTarget(_.map),i.clear(),i.renderBufferDirect(w,null,E,h,x,null)}function b(_,w,E,y){let M=null;const A=E.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(A!==void 0)M=A;else if(M=E.isPointLight===!0?l:a,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const G=M.uuid,H=w.uuid;let j=c[G];j===void 0&&(j={},c[G]=j);let tt=j[H];tt===void 0&&(tt=M.clone(),j[H]=tt,w.addEventListener("dispose",T)),M=tt}if(M.visible=w.visible,M.wireframe=w.wireframe,y===Bn?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:d[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,E.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const G=i.properties.get(M);G.light=E}return M}function v(_,w,E,y,M){if(_.visible===!1)return;if(_.layers.test(w.layers)&&(_.isMesh||_.isLine||_.isPoints)&&(_.castShadow||_.receiveShadow&&M===Bn)&&(!_.frustumCulled||n.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,_.matrixWorld);const H=t.update(_),j=_.material;if(Array.isArray(j)){const tt=H.groups;for(let k=0,z=tt.length;k<z;k++){const B=tt[k],Z=j[B.materialIndex];if(Z&&Z.visible){const nt=b(_,Z,y,M);_.onBeforeShadow(i,_,w,E,H,nt,B),i.renderBufferDirect(E,null,H,nt,_,B),_.onAfterShadow(i,_,w,E,H,nt,B)}}}else if(j.visible){const tt=b(_,j,y,M);_.onBeforeShadow(i,_,w,E,H,tt,null),i.renderBufferDirect(E,null,H,tt,_,null),_.onAfterShadow(i,_,w,E,H,tt,null)}}const G=_.children;for(let H=0,j=G.length;H<j;H++)v(G[H],w,E,y,M)}function T(_){_.target.removeEventListener("dispose",T);for(const E in c){const y=c[E],M=_.target.uuid;M in y&&(y[M].dispose(),delete y[M])}}}const Y0={[sa]:ra,[oa]:ca,[aa]:ua,[hs]:la,[ra]:sa,[ca]:oa,[ua]:aa,[la]:hs};function $0(i,t){function e(){let q=!1;const P=new ie;let N=null;const Y=new ie(0,0,0,0);return{setMask:function(at){N!==at&&!q&&(i.colorMask(at,at,at,at),N=at)},setLocked:function(at){q=at},setClear:function(at,ot,Mt,wt,Ft){Ft===!0&&(at*=wt,ot*=wt,Mt*=wt),P.set(at,ot,Mt,wt),Y.equals(P)===!1&&(i.clearColor(at,ot,Mt,wt),Y.copy(P))},reset:function(){q=!1,N=null,Y.set(-1,0,0,0)}}}function n(){let q=!1,P=!1,N=null,Y=null,at=null;return{setReversed:function(ot){if(P!==ot){const Mt=t.get("EXT_clip_control");P?Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.ZERO_TO_ONE_EXT):Mt.clipControlEXT(Mt.LOWER_LEFT_EXT,Mt.NEGATIVE_ONE_TO_ONE_EXT);const wt=at;at=null,this.setClear(wt)}P=ot},getReversed:function(){return P},setTest:function(ot){ot?yt(i.DEPTH_TEST):Dt(i.DEPTH_TEST)},setMask:function(ot){N!==ot&&!q&&(i.depthMask(ot),N=ot)},setFunc:function(ot){if(P&&(ot=Y0[ot]),Y!==ot){switch(ot){case sa:i.depthFunc(i.NEVER);break;case ra:i.depthFunc(i.ALWAYS);break;case oa:i.depthFunc(i.LESS);break;case hs:i.depthFunc(i.LEQUAL);break;case aa:i.depthFunc(i.EQUAL);break;case la:i.depthFunc(i.GEQUAL);break;case ca:i.depthFunc(i.GREATER);break;case ua:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Y=ot}},setLocked:function(ot){q=ot},setClear:function(ot){at!==ot&&(P&&(ot=1-ot),i.clearDepth(ot),at=ot)},reset:function(){q=!1,N=null,Y=null,at=null,P=!1}}}function s(){let q=!1,P=null,N=null,Y=null,at=null,ot=null,Mt=null,wt=null,Ft=null;return{setTest:function(It){q||(It?yt(i.STENCIL_TEST):Dt(i.STENCIL_TEST))},setMask:function(It){P!==It&&!q&&(i.stencilMask(It),P=It)},setFunc:function(It,kt,Yt){(N!==It||Y!==kt||at!==Yt)&&(i.stencilFunc(It,kt,Yt),N=It,Y=kt,at=Yt)},setOp:function(It,kt,Yt){(ot!==It||Mt!==kt||wt!==Yt)&&(i.stencilOp(It,kt,Yt),ot=It,Mt=kt,wt=Yt)},setLocked:function(It){q=It},setClear:function(It){Ft!==It&&(i.clearStencil(It),Ft=It)},reset:function(){q=!1,P=null,N=null,Y=null,at=null,ot=null,Mt=null,wt=null,Ft=null}}}const r=new e,o=new n,a=new s,l=new WeakMap,c=new WeakMap;let u={},d={},p=new WeakMap,h=[],g=null,x=!1,m=null,f=null,S=null,b=null,v=null,T=null,_=null,w=new Gt(0,0,0),E=0,y=!1,M=null,A=null,G=null,H=null,j=null;const tt=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,z=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(B)[1]),k=z>=1):B.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),k=z>=2);let Z=null,nt={};const xt=i.getParameter(i.SCISSOR_BOX),Rt=i.getParameter(i.VIEWPORT),Lt=new ie().fromArray(xt),lt=new ie().fromArray(Rt);function bt(q,P,N,Y){const at=new Uint8Array(4),ot=i.createTexture();i.bindTexture(q,ot),i.texParameteri(q,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(q,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Mt=0;Mt<N;Mt++)q===i.TEXTURE_3D||q===i.TEXTURE_2D_ARRAY?i.texImage3D(P,0,i.RGBA,1,1,Y,0,i.RGBA,i.UNSIGNED_BYTE,at):i.texImage2D(P+Mt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,at);return ot}const Pt={};Pt[i.TEXTURE_2D]=bt(i.TEXTURE_2D,i.TEXTURE_2D,1),Pt[i.TEXTURE_CUBE_MAP]=bt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pt[i.TEXTURE_2D_ARRAY]=bt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pt[i.TEXTURE_3D]=bt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),yt(i.DEPTH_TEST),o.setFunc(hs),vt(!1),Tt(Il),yt(i.CULL_FACE),V(Wn);function yt(q){u[q]!==!0&&(i.enable(q),u[q]=!0)}function Dt(q){u[q]!==!1&&(i.disable(q),u[q]=!1)}function L(q,P){return d[q]!==P?(i.bindFramebuffer(q,P),d[q]=P,q===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=P),q===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=P),!0):!1}function X(q,P){let N=h,Y=!1;if(q){N=p.get(P),N===void 0&&(N=[],p.set(P,N));const at=q.textures;if(N.length!==at.length||N[0]!==i.COLOR_ATTACHMENT0){for(let ot=0,Mt=at.length;ot<Mt;ot++)N[ot]=i.COLOR_ATTACHMENT0+ot;N.length=at.length,Y=!0}}else N[0]!==i.BACK&&(N[0]=i.BACK,Y=!0);Y&&i.drawBuffers(N)}function et(q){return g!==q?(i.useProgram(q),g=q,!0):!1}const st={[Ai]:i.FUNC_ADD,[nf]:i.FUNC_SUBTRACT,[sf]:i.FUNC_REVERSE_SUBTRACT};st[rf]=i.MIN,st[of]=i.MAX;const pt={[af]:i.ZERO,[lf]:i.ONE,[cf]:i.SRC_COLOR,[na]:i.SRC_ALPHA,[mf]:i.SRC_ALPHA_SATURATE,[df]:i.DST_COLOR,[hf]:i.DST_ALPHA,[uf]:i.ONE_MINUS_SRC_COLOR,[ia]:i.ONE_MINUS_SRC_ALPHA,[pf]:i.ONE_MINUS_DST_COLOR,[ff]:i.ONE_MINUS_DST_ALPHA,[gf]:i.CONSTANT_COLOR,[xf]:i.ONE_MINUS_CONSTANT_COLOR,[vf]:i.CONSTANT_ALPHA,[_f]:i.ONE_MINUS_CONSTANT_ALPHA};function V(q,P,N,Y,at,ot,Mt,wt,Ft,It){if(q===Wn){x===!0&&(Dt(i.BLEND),x=!1);return}if(x===!1&&(yt(i.BLEND),x=!0),q!==ef){if(q!==m||It!==y){if((f!==Ai||v!==Ai)&&(i.blendEquation(i.FUNC_ADD),f=Ai,v=Ai),It)switch(q){case as:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fe:i.blendFunc(i.ONE,i.ONE);break;case Ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}else switch(q){case as:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Fe:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Ul:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case zl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",q);break}S=null,b=null,T=null,_=null,w.set(0,0,0),E=0,m=q,y=It}return}at=at||P,ot=ot||N,Mt=Mt||Y,(P!==f||at!==v)&&(i.blendEquationSeparate(st[P],st[at]),f=P,v=at),(N!==S||Y!==b||ot!==T||Mt!==_)&&(i.blendFuncSeparate(pt[N],pt[Y],pt[ot],pt[Mt]),S=N,b=Y,T=ot,_=Mt),(wt.equals(w)===!1||Ft!==E)&&(i.blendColor(wt.r,wt.g,wt.b,Ft),w.copy(wt),E=Ft),m=q,y=!1}function zt(q,P){q.side===ve?Dt(i.CULL_FACE):yt(i.CULL_FACE);let N=q.side===Ze;P&&(N=!N),vt(N),q.blending===as&&q.transparent===!1?V(Wn):V(q.blending,q.blendEquation,q.blendSrc,q.blendDst,q.blendEquationAlpha,q.blendSrcAlpha,q.blendDstAlpha,q.blendColor,q.blendAlpha,q.premultipliedAlpha),o.setFunc(q.depthFunc),o.setTest(q.depthTest),o.setMask(q.depthWrite),r.setMask(q.colorWrite);const Y=q.stencilWrite;a.setTest(Y),Y&&(a.setMask(q.stencilWriteMask),a.setFunc(q.stencilFunc,q.stencilRef,q.stencilFuncMask),a.setOp(q.stencilFail,q.stencilZFail,q.stencilZPass)),Bt(q.polygonOffset,q.polygonOffsetFactor,q.polygonOffsetUnits),q.alphaToCoverage===!0?yt(i.SAMPLE_ALPHA_TO_COVERAGE):Dt(i.SAMPLE_ALPHA_TO_COVERAGE)}function vt(q){M!==q&&(q?i.frontFace(i.CW):i.frontFace(i.CCW),M=q)}function Tt(q){q!==Jh?(yt(i.CULL_FACE),q!==A&&(q===Il?i.cullFace(i.BACK):q===Qh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Dt(i.CULL_FACE),A=q}function Et(q){q!==G&&(k&&i.lineWidth(q),G=q)}function Bt(q,P,N){q?(yt(i.POLYGON_OFFSET_FILL),(H!==P||j!==N)&&(i.polygonOffset(P,N),H=P,j=N)):Dt(i.POLYGON_OFFSET_FILL)}function ht(q){q?yt(i.SCISSOR_TEST):Dt(i.SCISSOR_TEST)}function I(q){q===void 0&&(q=i.TEXTURE0+tt-1),Z!==q&&(i.activeTexture(q),Z=q)}function C(q,P,N){N===void 0&&(Z===null?N=i.TEXTURE0+tt-1:N=Z);let Y=nt[N];Y===void 0&&(Y={type:void 0,texture:void 0},nt[N]=Y),(Y.type!==q||Y.texture!==P)&&(Z!==N&&(i.activeTexture(N),Z=N),i.bindTexture(q,P||Pt[q]),Y.type=q,Y.texture=P)}function R(){const q=nt[Z];q!==void 0&&q.type!==void 0&&(i.bindTexture(q.type,null),q.type=void 0,q.texture=void 0)}function U(){try{i.compressedTexImage2D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function $(){try{i.compressedTexImage3D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function W(){try{i.texSubImage2D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function St(){try{i.texSubImage3D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function ct(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function Ct(){try{i.texStorage2D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function _t(){try{i.texStorage3D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function O(){try{i.texImage2D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function K(){try{i.texImage3D.apply(i,arguments)}catch(q){console.error("THREE.WebGLState:",q)}}function J(q){Lt.equals(q)===!1&&(i.scissor(q.x,q.y,q.z,q.w),Lt.copy(q))}function F(q){lt.equals(q)===!1&&(i.viewport(q.x,q.y,q.z,q.w),lt.copy(q))}function ut(q,P){let N=c.get(P);N===void 0&&(N=new WeakMap,c.set(P,N));let Y=N.get(q);Y===void 0&&(Y=i.getUniformBlockIndex(P,q.name),N.set(q,Y))}function gt(q,P){const Y=c.get(P).get(q);l.get(P)!==Y&&(i.uniformBlockBinding(P,Y,q.__bindingPointIndex),l.set(P,Y))}function At(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},Z=null,nt={},d={},p=new WeakMap,h=[],g=null,x=!1,m=null,f=null,S=null,b=null,v=null,T=null,_=null,w=new Gt(0,0,0),E=0,y=!1,M=null,A=null,G=null,H=null,j=null,Lt.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:yt,disable:Dt,bindFramebuffer:L,drawBuffers:X,useProgram:et,setBlending:V,setMaterial:zt,setFlipSided:vt,setCullFace:Tt,setLineWidth:Et,setPolygonOffset:Bt,setScissorTest:ht,activeTexture:I,bindTexture:C,unbindTexture:R,compressedTexImage2D:U,compressedTexImage3D:$,texImage2D:O,texImage3D:K,updateUBOMapping:ut,uniformBlockBinding:gt,texStorage2D:Ct,texStorage3D:_t,texSubImage2D:W,texSubImage3D:St,compressedTexSubImage2D:ct,compressedTexSubImage3D:mt,scissor:J,viewport:F,reset:At}}function Cc(i,t,e,n){const s=j0(n);switch(e){case Iu:return i*t;case zu:return i*t;case Nu:return i*t*2;case eo:return i*t/s.components*s.byteLength;case tl:return i*t/s.components*s.byteLength;case Fu:return i*t*2/s.components*s.byteLength;case el:return i*t*2/s.components*s.byteLength;case Uu:return i*t*3/s.components*s.byteLength;case vn:return i*t*4/s.components*s.byteLength;case nl:return i*t*4/s.components*s.byteLength;case Vr:case Wr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Xr:case qr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ma:case xa:return Math.max(i,16)*Math.max(t,8)/4;case pa:case ga:return Math.max(i,8)*Math.max(t,8)/2;case va:case _a:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ma:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ya:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Sa:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ba:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case wa:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ea:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ta:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Aa:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ra:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ca:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case La:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Da:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Ia:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Ua:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Yr:case za:case Na:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ou:case Fa:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Oa:case Ba:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function j0(i){switch(i){case Pn:case Pu:return{byteLength:1,components:1};case Ks:case Lu:case Cn:return{byteLength:2,components:1};case Ja:case Qa:return{byteLength:2,components:4};case Ii:case Za:case An:return{byteLength:4,components:1};case Du:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function K0(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new qt,u=new WeakMap;let d;const p=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,C){return h?new OffscreenCanvas(I,C):Jr("canvas")}function x(I,C,R){let U=1;const $=ht(I);if(($.width>R||$.height>R)&&(U=R/Math.max($.width,$.height)),U<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const W=Math.floor(U*$.width),St=Math.floor(U*$.height);d===void 0&&(d=g(W,St));const ct=C?g(W,St):d;return ct.width=W,ct.height=St,ct.getContext("2d").drawImage(I,0,0,W,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+W+"x"+St+")."),ct}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),I;return I}function m(I){return I.generateMipmaps}function f(I){i.generateMipmap(I)}function S(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(I,C,R,U,$=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let W=C;if(C===i.RED&&(R===i.FLOAT&&(W=i.R32F),R===i.HALF_FLOAT&&(W=i.R16F),R===i.UNSIGNED_BYTE&&(W=i.R8)),C===i.RED_INTEGER&&(R===i.UNSIGNED_BYTE&&(W=i.R8UI),R===i.UNSIGNED_SHORT&&(W=i.R16UI),R===i.UNSIGNED_INT&&(W=i.R32UI),R===i.BYTE&&(W=i.R8I),R===i.SHORT&&(W=i.R16I),R===i.INT&&(W=i.R32I)),C===i.RG&&(R===i.FLOAT&&(W=i.RG32F),R===i.HALF_FLOAT&&(W=i.RG16F),R===i.UNSIGNED_BYTE&&(W=i.RG8)),C===i.RG_INTEGER&&(R===i.UNSIGNED_BYTE&&(W=i.RG8UI),R===i.UNSIGNED_SHORT&&(W=i.RG16UI),R===i.UNSIGNED_INT&&(W=i.RG32UI),R===i.BYTE&&(W=i.RG8I),R===i.SHORT&&(W=i.RG16I),R===i.INT&&(W=i.RG32I)),C===i.RGB_INTEGER&&(R===i.UNSIGNED_BYTE&&(W=i.RGB8UI),R===i.UNSIGNED_SHORT&&(W=i.RGB16UI),R===i.UNSIGNED_INT&&(W=i.RGB32UI),R===i.BYTE&&(W=i.RGB8I),R===i.SHORT&&(W=i.RGB16I),R===i.INT&&(W=i.RGB32I)),C===i.RGBA_INTEGER&&(R===i.UNSIGNED_BYTE&&(W=i.RGBA8UI),R===i.UNSIGNED_SHORT&&(W=i.RGBA16UI),R===i.UNSIGNED_INT&&(W=i.RGBA32UI),R===i.BYTE&&(W=i.RGBA8I),R===i.SHORT&&(W=i.RGBA16I),R===i.INT&&(W=i.RGBA32I)),C===i.RGB&&R===i.UNSIGNED_INT_5_9_9_9_REV&&(W=i.RGB9_E5),C===i.RGBA){const St=$?no:ne.getTransfer(U);R===i.FLOAT&&(W=i.RGBA32F),R===i.HALF_FLOAT&&(W=i.RGBA16F),R===i.UNSIGNED_BYTE&&(W=St===ue?i.SRGB8_ALPHA8:i.RGBA8),R===i.UNSIGNED_SHORT_4_4_4_4&&(W=i.RGBA4),R===i.UNSIGNED_SHORT_5_5_5_1&&(W=i.RGB5_A1)}return(W===i.R16F||W===i.R32F||W===i.RG16F||W===i.RG32F||W===i.RGBA16F||W===i.RGBA32F)&&t.get("EXT_color_buffer_float"),W}function v(I,C){let R;return I?C===null||C===Ii||C===ps?R=i.DEPTH24_STENCIL8:C===An?R=i.DEPTH32F_STENCIL8:C===Ks&&(R=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===Ii||C===ps?R=i.DEPTH_COMPONENT24:C===An?R=i.DEPTH_COMPONENT32F:C===Ks&&(R=i.DEPTH_COMPONENT16),R}function T(I,C){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==sn&&I.minFilter!==xn?Math.log2(Math.max(C.width,C.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?C.mipmaps.length:1}function _(I){const C=I.target;C.removeEventListener("dispose",_),E(C),C.isVideoTexture&&u.delete(C)}function w(I){const C=I.target;C.removeEventListener("dispose",w),M(C)}function E(I){const C=n.get(I);if(C.__webglInit===void 0)return;const R=I.source,U=p.get(R);if(U){const $=U[C.__cacheKey];$.usedTimes--,$.usedTimes===0&&y(I),Object.keys(U).length===0&&p.delete(R)}n.remove(I)}function y(I){const C=n.get(I);i.deleteTexture(C.__webglTexture);const R=I.source,U=p.get(R);delete U[C.__cacheKey],o.memory.textures--}function M(I){const C=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let U=0;U<6;U++){if(Array.isArray(C.__webglFramebuffer[U]))for(let $=0;$<C.__webglFramebuffer[U].length;$++)i.deleteFramebuffer(C.__webglFramebuffer[U][$]);else i.deleteFramebuffer(C.__webglFramebuffer[U]);C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer[U])}else{if(Array.isArray(C.__webglFramebuffer))for(let U=0;U<C.__webglFramebuffer.length;U++)i.deleteFramebuffer(C.__webglFramebuffer[U]);else i.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&i.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&i.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let U=0;U<C.__webglColorRenderbuffer.length;U++)C.__webglColorRenderbuffer[U]&&i.deleteRenderbuffer(C.__webglColorRenderbuffer[U]);C.__webglDepthRenderbuffer&&i.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const R=I.textures;for(let U=0,$=R.length;U<$;U++){const W=n.get(R[U]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),o.memory.textures--),n.remove(R[U])}n.remove(I)}let A=0;function G(){A=0}function H(){const I=A;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),A+=1,I}function j(I){const C=[];return C.push(I.wrapS),C.push(I.wrapT),C.push(I.wrapR||0),C.push(I.magFilter),C.push(I.minFilter),C.push(I.anisotropy),C.push(I.internalFormat),C.push(I.format),C.push(I.type),C.push(I.generateMipmaps),C.push(I.premultiplyAlpha),C.push(I.flipY),C.push(I.unpackAlignment),C.push(I.colorSpace),C.join()}function tt(I,C){const R=n.get(I);if(I.isVideoTexture&&Et(I),I.isRenderTargetTexture===!1&&I.version>0&&R.__version!==I.version){const U=I.image;if(U===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(U.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{lt(R,I,C);return}}e.bindTexture(i.TEXTURE_2D,R.__webglTexture,i.TEXTURE0+C)}function k(I,C){const R=n.get(I);if(I.version>0&&R.__version!==I.version){lt(R,I,C);return}e.bindTexture(i.TEXTURE_2D_ARRAY,R.__webglTexture,i.TEXTURE0+C)}function z(I,C){const R=n.get(I);if(I.version>0&&R.__version!==I.version){lt(R,I,C);return}e.bindTexture(i.TEXTURE_3D,R.__webglTexture,i.TEXTURE0+C)}function B(I,C){const R=n.get(I);if(I.version>0&&R.__version!==I.version){bt(R,I,C);return}e.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+C)}const Z={[Kr]:i.REPEAT,[Ci]:i.CLAMP_TO_EDGE,[da]:i.MIRRORED_REPEAT},nt={[sn]:i.NEAREST,[bf]:i.NEAREST_MIPMAP_NEAREST,[sr]:i.NEAREST_MIPMAP_LINEAR,[xn]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[Pi]:i.LINEAR_MIPMAP_LINEAR},xt={[Af]:i.NEVER,[If]:i.ALWAYS,[Rf]:i.LESS,[ku]:i.LEQUAL,[Cf]:i.EQUAL,[Df]:i.GEQUAL,[Pf]:i.GREATER,[Lf]:i.NOTEQUAL};function Rt(I,C){if(C.type===An&&t.has("OES_texture_float_linear")===!1&&(C.magFilter===xn||C.magFilter===po||C.magFilter===sr||C.magFilter===Pi||C.minFilter===xn||C.minFilter===po||C.minFilter===sr||C.minFilter===Pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,Z[C.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,Z[C.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,Z[C.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,nt[C.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,nt[C.minFilter]),C.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,xt[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===sn||C.minFilter!==sr&&C.minFilter!==Pi||C.type===An&&t.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const R=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,R.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Lt(I,C){let R=!1;I.__webglInit===void 0&&(I.__webglInit=!0,C.addEventListener("dispose",_));const U=C.source;let $=p.get(U);$===void 0&&($={},p.set(U,$));const W=j(C);if(W!==I.__cacheKey){$[W]===void 0&&($[W]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,R=!0),$[W].usedTimes++;const St=$[I.__cacheKey];St!==void 0&&($[I.__cacheKey].usedTimes--,St.usedTimes===0&&y(C)),I.__cacheKey=W,I.__webglTexture=$[W].texture}return R}function lt(I,C,R){let U=i.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(U=i.TEXTURE_2D_ARRAY),C.isData3DTexture&&(U=i.TEXTURE_3D);const $=Lt(I,C),W=C.source;e.bindTexture(U,I.__webglTexture,i.TEXTURE0+R);const St=n.get(W);if(W.version!==St.__version||$===!0){e.activeTexture(i.TEXTURE0+R);const ct=ne.getPrimaries(ne.workingColorSpace),mt=C.colorSpace===ai?null:ne.getPrimaries(C.colorSpace),Ct=C.colorSpace===ai||ct===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let _t=x(C.image,!1,s.maxTextureSize);_t=Bt(C,_t);const O=r.convert(C.format,C.colorSpace),K=r.convert(C.type);let J=b(C.internalFormat,O,K,C.colorSpace,C.isVideoTexture);Rt(U,C);let F;const ut=C.mipmaps,gt=C.isVideoTexture!==!0,At=St.__version===void 0||$===!0,q=W.dataReady,P=T(C,_t);if(C.isDepthTexture)J=v(C.format===ms,C.type),At&&(gt?e.texStorage2D(i.TEXTURE_2D,1,J,_t.width,_t.height):e.texImage2D(i.TEXTURE_2D,0,J,_t.width,_t.height,0,O,K,null));else if(C.isDataTexture)if(ut.length>0){gt&&At&&e.texStorage2D(i.TEXTURE_2D,P,J,ut[0].width,ut[0].height);for(let N=0,Y=ut.length;N<Y;N++)F=ut[N],gt?q&&e.texSubImage2D(i.TEXTURE_2D,N,0,0,F.width,F.height,O,K,F.data):e.texImage2D(i.TEXTURE_2D,N,J,F.width,F.height,0,O,K,F.data);C.generateMipmaps=!1}else gt?(At&&e.texStorage2D(i.TEXTURE_2D,P,J,_t.width,_t.height),q&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,_t.width,_t.height,O,K,_t.data)):e.texImage2D(i.TEXTURE_2D,0,J,_t.width,_t.height,0,O,K,_t.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){gt&&At&&e.texStorage3D(i.TEXTURE_2D_ARRAY,P,J,ut[0].width,ut[0].height,_t.depth);for(let N=0,Y=ut.length;N<Y;N++)if(F=ut[N],C.format!==vn)if(O!==null)if(gt){if(q)if(C.layerUpdates.size>0){const at=Cc(F.width,F.height,C.format,C.type);for(const ot of C.layerUpdates){const Mt=F.data.subarray(ot*at/F.data.BYTES_PER_ELEMENT,(ot+1)*at/F.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,N,0,0,ot,F.width,F.height,1,O,Mt)}C.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,N,0,0,0,F.width,F.height,_t.depth,O,F.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,N,J,F.width,F.height,_t.depth,0,F.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else gt?q&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,N,0,0,0,F.width,F.height,_t.depth,O,K,F.data):e.texImage3D(i.TEXTURE_2D_ARRAY,N,J,F.width,F.height,_t.depth,0,O,K,F.data)}else{gt&&At&&e.texStorage2D(i.TEXTURE_2D,P,J,ut[0].width,ut[0].height);for(let N=0,Y=ut.length;N<Y;N++)F=ut[N],C.format!==vn?O!==null?gt?q&&e.compressedTexSubImage2D(i.TEXTURE_2D,N,0,0,F.width,F.height,O,F.data):e.compressedTexImage2D(i.TEXTURE_2D,N,J,F.width,F.height,0,F.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):gt?q&&e.texSubImage2D(i.TEXTURE_2D,N,0,0,F.width,F.height,O,K,F.data):e.texImage2D(i.TEXTURE_2D,N,J,F.width,F.height,0,O,K,F.data)}else if(C.isDataArrayTexture)if(gt){if(At&&e.texStorage3D(i.TEXTURE_2D_ARRAY,P,J,_t.width,_t.height,_t.depth),q)if(C.layerUpdates.size>0){const N=Cc(_t.width,_t.height,C.format,C.type);for(const Y of C.layerUpdates){const at=_t.data.subarray(Y*N/_t.data.BYTES_PER_ELEMENT,(Y+1)*N/_t.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Y,_t.width,_t.height,1,O,K,at)}C.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,O,K,_t.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,J,_t.width,_t.height,_t.depth,0,O,K,_t.data);else if(C.isData3DTexture)gt?(At&&e.texStorage3D(i.TEXTURE_3D,P,J,_t.width,_t.height,_t.depth),q&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,O,K,_t.data)):e.texImage3D(i.TEXTURE_3D,0,J,_t.width,_t.height,_t.depth,0,O,K,_t.data);else if(C.isFramebufferTexture){if(At)if(gt)e.texStorage2D(i.TEXTURE_2D,P,J,_t.width,_t.height);else{let N=_t.width,Y=_t.height;for(let at=0;at<P;at++)e.texImage2D(i.TEXTURE_2D,at,J,N,Y,0,O,K,null),N>>=1,Y>>=1}}else if(ut.length>0){if(gt&&At){const N=ht(ut[0]);e.texStorage2D(i.TEXTURE_2D,P,J,N.width,N.height)}for(let N=0,Y=ut.length;N<Y;N++)F=ut[N],gt?q&&e.texSubImage2D(i.TEXTURE_2D,N,0,0,O,K,F):e.texImage2D(i.TEXTURE_2D,N,J,O,K,F);C.generateMipmaps=!1}else if(gt){if(At){const N=ht(_t);e.texStorage2D(i.TEXTURE_2D,P,J,N.width,N.height)}q&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,O,K,_t)}else e.texImage2D(i.TEXTURE_2D,0,J,O,K,_t);m(C)&&f(U),St.__version=W.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function bt(I,C,R){if(C.image.length!==6)return;const U=Lt(I,C),$=C.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+R);const W=n.get($);if($.version!==W.__version||U===!0){e.activeTexture(i.TEXTURE0+R);const St=ne.getPrimaries(ne.workingColorSpace),ct=C.colorSpace===ai?null:ne.getPrimaries(C.colorSpace),mt=C.colorSpace===ai||St===ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,C.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,C.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const Ct=C.isCompressedTexture||C.image[0].isCompressedTexture,_t=C.image[0]&&C.image[0].isDataTexture,O=[];for(let Y=0;Y<6;Y++)!Ct&&!_t?O[Y]=x(C.image[Y],!0,s.maxCubemapSize):O[Y]=_t?C.image[Y].image:C.image[Y],O[Y]=Bt(C,O[Y]);const K=O[0],J=r.convert(C.format,C.colorSpace),F=r.convert(C.type),ut=b(C.internalFormat,J,F,C.colorSpace),gt=C.isVideoTexture!==!0,At=W.__version===void 0||U===!0,q=$.dataReady;let P=T(C,K);Rt(i.TEXTURE_CUBE_MAP,C);let N;if(Ct){gt&&At&&e.texStorage2D(i.TEXTURE_CUBE_MAP,P,ut,K.width,K.height);for(let Y=0;Y<6;Y++){N=O[Y].mipmaps;for(let at=0;at<N.length;at++){const ot=N[at];C.format!==vn?J!==null?gt?q&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at,0,0,ot.width,ot.height,J,ot.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at,ut,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):gt?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at,0,0,ot.width,ot.height,J,F,ot.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at,ut,ot.width,ot.height,0,J,F,ot.data)}}}else{if(N=C.mipmaps,gt&&At){N.length>0&&P++;const Y=ht(O[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,P,ut,Y.width,Y.height)}for(let Y=0;Y<6;Y++)if(_t){gt?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,O[Y].width,O[Y].height,J,F,O[Y].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ut,O[Y].width,O[Y].height,0,J,F,O[Y].data);for(let at=0;at<N.length;at++){const Mt=N[at].image[Y].image;gt?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at+1,0,0,Mt.width,Mt.height,J,F,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at+1,ut,Mt.width,Mt.height,0,J,F,Mt.data)}}else{gt?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,0,0,J,F,O[Y]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0,ut,J,F,O[Y]);for(let at=0;at<N.length;at++){const ot=N[at];gt?q&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at+1,0,0,J,F,ot.image[Y]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Y,at+1,ut,J,F,ot.image[Y])}}}m(C)&&f(i.TEXTURE_CUBE_MAP),W.__version=$.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function Pt(I,C,R,U,$,W){const St=r.convert(R.format,R.colorSpace),ct=r.convert(R.type),mt=b(R.internalFormat,St,ct,R.colorSpace),Ct=n.get(C),_t=n.get(R);if(_t.__renderTarget=C,!Ct.__hasExternalTextures){const O=Math.max(1,C.width>>W),K=Math.max(1,C.height>>W);$===i.TEXTURE_3D||$===i.TEXTURE_2D_ARRAY?e.texImage3D($,W,mt,O,K,C.depth,0,St,ct,null):e.texImage2D($,W,mt,O,K,0,St,ct,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),Tt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,U,$,_t.__webglTexture,0,vt(C)):($===i.TEXTURE_2D||$>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,U,$,_t.__webglTexture,W),e.bindFramebuffer(i.FRAMEBUFFER,null)}function yt(I,C,R){if(i.bindRenderbuffer(i.RENDERBUFFER,I),C.depthBuffer){const U=C.depthTexture,$=U&&U.isDepthTexture?U.type:null,W=v(C.stencilBuffer,$),St=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ct=vt(C);Tt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,W,C.width,C.height):R?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,W,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,W,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,St,i.RENDERBUFFER,I)}else{const U=C.textures;for(let $=0;$<U.length;$++){const W=U[$],St=r.convert(W.format,W.colorSpace),ct=r.convert(W.type),mt=b(W.internalFormat,St,ct,W.colorSpace),Ct=vt(C);R&&Tt(C)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ct,mt,C.width,C.height):Tt(C)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ct,mt,C.width,C.height):i.renderbufferStorage(i.RENDERBUFFER,mt,C.width,C.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Dt(I,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const U=n.get(C.depthTexture);U.__renderTarget=C,(!U.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),tt(C.depthTexture,0);const $=U.__webglTexture,W=vt(C);if(C.depthTexture.format===ls)Tt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,$,0);else if(C.depthTexture.format===ms)Tt(C)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0,W):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,$,0);else throw new Error("Unknown depthTexture format")}function L(I){const C=n.get(I),R=I.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==I.depthTexture){const U=I.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),U){const $=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,U.removeEventListener("dispose",$)};U.addEventListener("dispose",$),C.__depthDisposeCallback=$}C.__boundDepthTexture=U}if(I.depthTexture&&!C.__autoAllocateDepthBuffer){if(R)throw new Error("target.depthTexture not supported in Cube render targets");Dt(C.__webglFramebuffer,I)}else if(R){C.__webglDepthbuffer=[];for(let U=0;U<6;U++)if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer[U]),C.__webglDepthbuffer[U]===void 0)C.__webglDepthbuffer[U]=i.createRenderbuffer(),yt(C.__webglDepthbuffer[U],I,!1);else{const $=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=C.__webglDepthbuffer[U];i.bindRenderbuffer(i.RENDERBUFFER,W),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,W)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=i.createRenderbuffer(),yt(C.__webglDepthbuffer,I,!1);else{const U=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=C.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,U,i.RENDERBUFFER,$)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function X(I,C,R){const U=n.get(I);C!==void 0&&Pt(U.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),R!==void 0&&L(I)}function et(I){const C=I.texture,R=n.get(I),U=n.get(C);I.addEventListener("dispose",w);const $=I.textures,W=I.isWebGLCubeRenderTarget===!0,St=$.length>1;if(St||(U.__webglTexture===void 0&&(U.__webglTexture=i.createTexture()),U.__version=C.version,o.memory.textures++),W){R.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(C.mipmaps&&C.mipmaps.length>0){R.__webglFramebuffer[ct]=[];for(let mt=0;mt<C.mipmaps.length;mt++)R.__webglFramebuffer[ct][mt]=i.createFramebuffer()}else R.__webglFramebuffer[ct]=i.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){R.__webglFramebuffer=[];for(let ct=0;ct<C.mipmaps.length;ct++)R.__webglFramebuffer[ct]=i.createFramebuffer()}else R.__webglFramebuffer=i.createFramebuffer();if(St)for(let ct=0,mt=$.length;ct<mt;ct++){const Ct=n.get($[ct]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&Tt(I)===!1){R.__webglMultisampledFramebuffer=i.createFramebuffer(),R.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,R.__webglMultisampledFramebuffer);for(let ct=0;ct<$.length;ct++){const mt=$[ct];R.__webglColorRenderbuffer[ct]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,R.__webglColorRenderbuffer[ct]);const Ct=r.convert(mt.format,mt.colorSpace),_t=r.convert(mt.type),O=b(mt.internalFormat,Ct,_t,mt.colorSpace,I.isXRRenderTarget===!0),K=vt(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,K,O,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ct,i.RENDERBUFFER,R.__webglColorRenderbuffer[ct])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(R.__webglDepthRenderbuffer=i.createRenderbuffer(),yt(R.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(W){e.bindTexture(i.TEXTURE_CUBE_MAP,U.__webglTexture),Rt(i.TEXTURE_CUBE_MAP,C);for(let ct=0;ct<6;ct++)if(C.mipmaps&&C.mipmaps.length>0)for(let mt=0;mt<C.mipmaps.length;mt++)Pt(R.__webglFramebuffer[ct][mt],I,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,mt);else Pt(R.__webglFramebuffer[ct],I,C,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(C)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(St){for(let ct=0,mt=$.length;ct<mt;ct++){const Ct=$[ct],_t=n.get(Ct);e.bindTexture(i.TEXTURE_2D,_t.__webglTexture),Rt(i.TEXTURE_2D,Ct),Pt(R.__webglFramebuffer,I,Ct,i.COLOR_ATTACHMENT0+ct,i.TEXTURE_2D,0),m(Ct)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let ct=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ct=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ct,U.__webglTexture),Rt(ct,C),C.mipmaps&&C.mipmaps.length>0)for(let mt=0;mt<C.mipmaps.length;mt++)Pt(R.__webglFramebuffer[mt],I,C,i.COLOR_ATTACHMENT0,ct,mt);else Pt(R.__webglFramebuffer,I,C,i.COLOR_ATTACHMENT0,ct,0);m(C)&&f(ct),e.unbindTexture()}I.depthBuffer&&L(I)}function st(I){const C=I.textures;for(let R=0,U=C.length;R<U;R++){const $=C[R];if(m($)){const W=S(I),St=n.get($).__webglTexture;e.bindTexture(W,St),f(W),e.unbindTexture()}}}const pt=[],V=[];function zt(I){if(I.samples>0){if(Tt(I)===!1){const C=I.textures,R=I.width,U=I.height;let $=i.COLOR_BUFFER_BIT;const W=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,St=n.get(I),ct=C.length>1;if(ct)for(let mt=0;mt<C.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let mt=0;mt<C.length;mt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&($|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&($|=i.STENCIL_BUFFER_BIT)),ct){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,St.__webglColorRenderbuffer[mt]);const Ct=n.get(C[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ct,0)}i.blitFramebuffer(0,0,R,U,0,0,R,U,$,i.NEAREST),l===!0&&(pt.length=0,V.length=0,pt.push(i.COLOR_ATTACHMENT0+mt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(pt.push(W),V.push(W),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,V)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,pt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ct)for(let mt=0;mt<C.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,St.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,St.__webglColorRenderbuffer[mt]);const Ct=n.get(C[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,St.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,Ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const C=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[C])}}}function vt(I){return Math.min(s.maxSamples,I.samples)}function Tt(I){const C=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Et(I){const C=o.render.frame;u.get(I)!==C&&(u.set(I,C),I.update())}function Bt(I,C){const R=I.colorSpace,U=I.format,$=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||R!==_s&&R!==ai&&(ne.getTransfer(R)===ue?(U!==vn||$!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",R)),C}function ht(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=G,this.setTexture2D=tt,this.setTexture2DArray=k,this.setTexture3D=z,this.setTextureCube=B,this.rebindTextures=X,this.setupRenderTarget=et,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=zt,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=Pt,this.useMultisampledRTT=Tt}function Z0(i,t){function e(n,s=ai){let r;const o=ne.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===Ja)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Qa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Du)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Pu)return i.BYTE;if(n===Lu)return i.SHORT;if(n===Ks)return i.UNSIGNED_SHORT;if(n===Za)return i.INT;if(n===Ii)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===Cn)return i.HALF_FLOAT;if(n===Iu)return i.ALPHA;if(n===Uu)return i.RGB;if(n===vn)return i.RGBA;if(n===zu)return i.LUMINANCE;if(n===Nu)return i.LUMINANCE_ALPHA;if(n===ls)return i.DEPTH_COMPONENT;if(n===ms)return i.DEPTH_STENCIL;if(n===eo)return i.RED;if(n===tl)return i.RED_INTEGER;if(n===Fu)return i.RG;if(n===el)return i.RG_INTEGER;if(n===nl)return i.RGBA_INTEGER;if(n===Vr||n===Wr||n===Xr||n===qr)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Xr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===qr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===pa||n===ma||n===ga||n===xa)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===pa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ma)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ga)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===va||n===_a||n===Ma)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===va||n===_a)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ma)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ya||n===Sa||n===ba||n===wa||n===Ea||n===Ta||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ya)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Sa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ba)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===wa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ea)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ta)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Aa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ra)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ca)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Pa)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===La)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Da)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ia)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ua)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Yr||n===za||n===Na)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Yr)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Na)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ou||n===Fa||n===Oa||n===Ba)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Yr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Fa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Oa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ba)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ps?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class J0 extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class We extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Q0={type:"move"};class Go{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new We,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new We,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new We,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const x of t.hand.values()){const m=e.getJointPose(x,n),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],p=u.position.distanceTo(d.position),h=.02,g=.005;c.inputState.pinching&&p>h+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&p<=h-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Q0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new We;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const tx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ex=`
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

}`;class nx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Xe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ee({vertexShader:tx,fragmentShader:ex,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new $t(new Ss(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ix extends Ms{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,p=null,h=null,g=null;const x=new nx,m=e.getContextAttributes();let f=null,S=null;const b=[],v=[],T=new qt;let _=null;const w=new nn;w.viewport=new ie;const E=new nn;E.viewport=new ie;const y=[w,E],M=new J0;let A=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(lt){let bt=b[lt];return bt===void 0&&(bt=new Go,b[lt]=bt),bt.getTargetRaySpace()},this.getControllerGrip=function(lt){let bt=b[lt];return bt===void 0&&(bt=new Go,b[lt]=bt),bt.getGripSpace()},this.getHand=function(lt){let bt=b[lt];return bt===void 0&&(bt=new Go,b[lt]=bt),bt.getHandSpace()};function H(lt){const bt=v.indexOf(lt.inputSource);if(bt===-1)return;const Pt=b[bt];Pt!==void 0&&(Pt.update(lt.inputSource,lt.frame,c||o),Pt.dispatchEvent({type:lt.type,data:lt.inputSource}))}function j(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",j),s.removeEventListener("inputsourceschange",tt);for(let lt=0;lt<b.length;lt++){const bt=v[lt];bt!==null&&(v[lt]=null,b[lt].disconnect(bt))}A=null,G=null,x.reset(),t.setRenderTarget(f),h=null,p=null,d=null,s=null,S=null,Lt.stop(),n.isPresenting=!1,t.setPixelRatio(_),t.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(lt){r=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(lt){a=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(lt){c=lt},this.getBaseLayer=function(){return p!==null?p:h},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(lt){if(s=lt,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",j),s.addEventListener("inputsourceschange",tt),m.xrCompatible!==!0&&await e.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(T),s.renderState.layers===void 0){const bt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};h=new XRWebGLLayer(s,e,bt),s.updateRenderState({baseLayer:h}),t.setPixelRatio(1),t.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new cn(h.framebufferWidth,h.framebufferHeight,{format:vn,type:Pn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let bt=null,Pt=null,yt=null;m.depth&&(yt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,bt=m.stencil?ms:ls,Pt=m.stencil?ps:Ii);const Dt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:r};d=new XRWebGLBinding(s,e),p=d.createProjectionLayer(Dt),s.updateRenderState({layers:[p]}),t.setPixelRatio(1),t.setSize(p.textureWidth,p.textureHeight,!1),S=new cn(p.textureWidth,p.textureHeight,{format:vn,type:Pn,depthTexture:new cl(p.textureWidth,p.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,bt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Lt.setContext(s),Lt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function tt(lt){for(let bt=0;bt<lt.removed.length;bt++){const Pt=lt.removed[bt],yt=v.indexOf(Pt);yt>=0&&(v[yt]=null,b[yt].disconnect(Pt))}for(let bt=0;bt<lt.added.length;bt++){const Pt=lt.added[bt];let yt=v.indexOf(Pt);if(yt===-1){for(let L=0;L<b.length;L++)if(L>=v.length){v.push(Pt),yt=L;break}else if(v[L]===null){v[L]=Pt,yt=L;break}if(yt===-1)break}const Dt=b[yt];Dt&&Dt.connect(Pt)}}const k=new Q,z=new Q;function B(lt,bt,Pt){k.setFromMatrixPosition(bt.matrixWorld),z.setFromMatrixPosition(Pt.matrixWorld);const yt=k.distanceTo(z),Dt=bt.projectionMatrix.elements,L=Pt.projectionMatrix.elements,X=Dt[14]/(Dt[10]-1),et=Dt[14]/(Dt[10]+1),st=(Dt[9]+1)/Dt[5],pt=(Dt[9]-1)/Dt[5],V=(Dt[8]-1)/Dt[0],zt=(L[8]+1)/L[0],vt=X*V,Tt=X*zt,Et=yt/(-V+zt),Bt=Et*-V;if(bt.matrixWorld.decompose(lt.position,lt.quaternion,lt.scale),lt.translateX(Bt),lt.translateZ(Et),lt.matrixWorld.compose(lt.position,lt.quaternion,lt.scale),lt.matrixWorldInverse.copy(lt.matrixWorld).invert(),Dt[10]===-1)lt.projectionMatrix.copy(bt.projectionMatrix),lt.projectionMatrixInverse.copy(bt.projectionMatrixInverse);else{const ht=X+Et,I=et+Et,C=vt-Bt,R=Tt+(yt-Bt),U=st*et/I*ht,$=pt*et/I*ht;lt.projectionMatrix.makePerspective(C,R,U,$,ht,I),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert()}}function Z(lt,bt){bt===null?lt.matrixWorld.copy(lt.matrix):lt.matrixWorld.multiplyMatrices(bt.matrixWorld,lt.matrix),lt.matrixWorldInverse.copy(lt.matrixWorld).invert()}this.updateCamera=function(lt){if(s===null)return;let bt=lt.near,Pt=lt.far;x.texture!==null&&(x.depthNear>0&&(bt=x.depthNear),x.depthFar>0&&(Pt=x.depthFar)),M.near=E.near=w.near=bt,M.far=E.far=w.far=Pt,(A!==M.near||G!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),A=M.near,G=M.far),w.layers.mask=lt.layers.mask|2,E.layers.mask=lt.layers.mask|4,M.layers.mask=w.layers.mask|E.layers.mask;const yt=lt.parent,Dt=M.cameras;Z(M,yt);for(let L=0;L<Dt.length;L++)Z(Dt[L],yt);Dt.length===2?B(M,w,E):M.projectionMatrix.copy(w.projectionMatrix),nt(lt,M,yt)};function nt(lt,bt,Pt){Pt===null?lt.matrix.copy(bt.matrixWorld):(lt.matrix.copy(Pt.matrixWorld),lt.matrix.invert(),lt.matrix.multiply(bt.matrixWorld)),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.updateMatrixWorld(!0),lt.projectionMatrix.copy(bt.projectionMatrix),lt.projectionMatrixInverse.copy(bt.projectionMatrixInverse),lt.isPerspectiveCamera&&(lt.fov=Zs*2*Math.atan(1/lt.projectionMatrix.elements[5]),lt.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&h===null))return l},this.setFoveation=function(lt){l=lt,p!==null&&(p.fixedFoveation=lt),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=lt)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let xt=null;function Rt(lt,bt){if(u=bt.getViewerPose(c||o),g=bt,u!==null){const Pt=u.views;h!==null&&(t.setRenderTargetFramebuffer(S,h.framebuffer),t.setRenderTarget(S));let yt=!1;Pt.length!==M.cameras.length&&(M.cameras.length=0,yt=!0);for(let L=0;L<Pt.length;L++){const X=Pt[L];let et=null;if(h!==null)et=h.getViewport(X);else{const pt=d.getViewSubImage(p,X);et=pt.viewport,L===0&&(t.setRenderTargetTextures(S,pt.colorTexture,p.ignoreDepthValues?void 0:pt.depthStencilTexture),t.setRenderTarget(S))}let st=y[L];st===void 0&&(st=new nn,st.layers.enable(L),st.viewport=new ie,y[L]=st),st.matrix.fromArray(X.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(X.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(et.x,et.y,et.width,et.height),L===0&&(M.matrix.copy(st.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),yt===!0&&M.cameras.push(st)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")){const L=d.getDepthInformation(Pt[0]);L&&L.isValid&&L.texture&&x.init(t,L,s.renderState)}}for(let Pt=0;Pt<b.length;Pt++){const yt=v[Pt],Dt=b[Pt];yt!==null&&Dt!==void 0&&Dt.update(yt,bt,c||o)}xt&&xt(lt,bt),bt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:bt}),g=null}const Lt=new Ku;Lt.setAnimationLoop(Rt),this.setAnimationLoop=function(lt){xt=lt},this.dispose=function(){}}}const Si=new Ln,sx=new re;function rx(i,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Yu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,S,b,v){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),p(m,f),f.isMeshPhysicalMaterial&&h(m,f,v)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?l(m,f,S,b):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Ze&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Ze&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const S=t.get(f),b=S.envMap,v=S.envMapRotation;b&&(m.envMap.value=b,Si.copy(v),Si.x*=-1,Si.y*=-1,Si.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Si.y*=-1,Si.z*=-1),m.envMapRotation.value.setFromMatrix4(sx.makeRotationFromEuler(Si)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,S,b){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*S,m.scale.value=b*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function p(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function h(m,f,S){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ze&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){const S=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ox(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,b){const v=b.program;n.uniformBlockBinding(S,v)}function c(S,b){let v=s[S.id];v===void 0&&(g(S),v=u(S),s[S.id]=v,S.addEventListener("dispose",m));const T=b.program;n.updateUBOMapping(S,T);const _=t.render.frame;r[S.id]!==_&&(p(S),r[S.id]=_)}function u(S){const b=d();S.__bindingPointIndex=b;const v=i.createBuffer(),T=S.__size,_=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,T,_),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,v),v}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(S){const b=s[S.id],v=S.uniforms,T=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let _=0,w=v.length;_<w;_++){const E=Array.isArray(v[_])?v[_]:[v[_]];for(let y=0,M=E.length;y<M;y++){const A=E[y];if(h(A,_,y,T)===!0){const G=A.__offset,H=Array.isArray(A.value)?A.value:[A.value];let j=0;for(let tt=0;tt<H.length;tt++){const k=H[tt],z=x(k);typeof k=="number"||typeof k=="boolean"?(A.__data[0]=k,i.bufferSubData(i.UNIFORM_BUFFER,G+j,A.__data)):k.isMatrix3?(A.__data[0]=k.elements[0],A.__data[1]=k.elements[1],A.__data[2]=k.elements[2],A.__data[3]=0,A.__data[4]=k.elements[3],A.__data[5]=k.elements[4],A.__data[6]=k.elements[5],A.__data[7]=0,A.__data[8]=k.elements[6],A.__data[9]=k.elements[7],A.__data[10]=k.elements[8],A.__data[11]=0):(k.toArray(A.__data,j),j+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(S,b,v,T){const _=S.value,w=b+"_"+v;if(T[w]===void 0)return typeof _=="number"||typeof _=="boolean"?T[w]=_:T[w]=_.clone(),!0;{const E=T[w];if(typeof _=="number"||typeof _=="boolean"){if(E!==_)return T[w]=_,!0}else if(E.equals(_)===!1)return E.copy(_),!0}return!1}function g(S){const b=S.uniforms;let v=0;const T=16;for(let w=0,E=b.length;w<E;w++){const y=Array.isArray(b[w])?b[w]:[b[w]];for(let M=0,A=y.length;M<A;M++){const G=y[M],H=Array.isArray(G.value)?G.value:[G.value];for(let j=0,tt=H.length;j<tt;j++){const k=H[j],z=x(k),B=v%T,Z=B%z.boundary,nt=B+Z;v+=Z,nt!==0&&T-nt<z.storage&&(v+=T-nt),G.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=v,v+=z.storage}}}const _=v%T;return _>0&&(v+=T-_),S.__size=v,S.__cache={},this}function x(S){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=48,b.storage=48):S.isMatrix4?(b.boundary=64,b.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),b}function m(S){const b=S.target;b.removeEventListener("dispose",m);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function f(){for(const S in s)i.deleteBuffer(s[S]);o=[],s={},r={}}return{bind:l,update:c,dispose:f}}class ax{constructor(t={}){const{canvas:e=Kf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:p=!1}=t;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,f=null;const S=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=en,this.toneMapping=fi,this.toneMappingExposure=1;const v=this;let T=!1,_=0,w=0,E=null,y=-1,M=null;const A=new ie,G=new ie;let H=null;const j=new Gt(0);let tt=0,k=e.width,z=e.height,B=1,Z=null,nt=null;const xt=new ie(0,0,k,z),Rt=new ie(0,0,k,z);let Lt=!1;const lt=new ol;let bt=!1,Pt=!1;const yt=new re,Dt=new re,L=new Q,X=new ie,et={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function pt(){return E===null?B:1}let V=n;function zt(D,it){return e.getContext(D,it)}try{const D={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ja}`),e.addEventListener("webglcontextlost",Y,!1),e.addEventListener("webglcontextrestored",at,!1),e.addEventListener("webglcontextcreationerror",ot,!1),V===null){const it="webgl2";if(V=zt(it,D),V===null)throw zt(it)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let vt,Tt,Et,Bt,ht,I,C,R,U,$,W,St,ct,mt,Ct,_t,O,K,J,F,ut,gt,At,q;function P(){vt=new fg(V),vt.init(),gt=new Z0(V,vt),Tt=new og(V,vt,t,gt),Et=new $0(V,vt),Tt.reverseDepthBuffer&&p&&Et.buffers.depth.setReversed(!0),Bt=new mg(V),ht=new I0,I=new K0(V,vt,Et,ht,Tt,gt,Bt),C=new lg(v),R=new hg(v),U=new Sd(V),At=new sg(V,U),$=new dg(V,U,Bt,At),W=new xg(V,$,U,Bt),J=new gg(V,Tt,I),_t=new ag(ht),St=new D0(v,C,R,vt,Tt,At,_t),ct=new rx(v,ht),mt=new z0,Ct=new G0(vt),K=new ig(v,C,R,Et,W,h,l),O=new q0(v,W,Tt),q=new ox(V,Bt,Tt,Et),F=new rg(V,vt,Bt),ut=new pg(V,vt,Bt),Bt.programs=St.programs,v.capabilities=Tt,v.extensions=vt,v.properties=ht,v.renderLists=mt,v.shadowMap=O,v.state=Et,v.info=Bt}P();const N=new ix(v,V);this.xr=N,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const D=vt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=vt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(D){D!==void 0&&(B=D,this.setSize(k,z,!1))},this.getSize=function(D){return D.set(k,z)},this.setSize=function(D,it,ft=!0){if(N.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=D,z=it,e.width=Math.floor(D*B),e.height=Math.floor(it*B),ft===!0&&(e.style.width=D+"px",e.style.height=it+"px"),this.setViewport(0,0,D,it)},this.getDrawingBufferSize=function(D){return D.set(k*B,z*B).floor()},this.setDrawingBufferSize=function(D,it,ft){k=D,z=it,B=ft,e.width=Math.floor(D*ft),e.height=Math.floor(it*ft),this.setViewport(0,0,D,it)},this.getCurrentViewport=function(D){return D.copy(A)},this.getViewport=function(D){return D.copy(xt)},this.setViewport=function(D,it,ft,dt){D.isVector4?xt.set(D.x,D.y,D.z,D.w):xt.set(D,it,ft,dt),Et.viewport(A.copy(xt).multiplyScalar(B).round())},this.getScissor=function(D){return D.copy(Rt)},this.setScissor=function(D,it,ft,dt){D.isVector4?Rt.set(D.x,D.y,D.z,D.w):Rt.set(D,it,ft,dt),Et.scissor(G.copy(Rt).multiplyScalar(B).round())},this.getScissorTest=function(){return Lt},this.setScissorTest=function(D){Et.setScissorTest(Lt=D)},this.setOpaqueSort=function(D){Z=D},this.setTransparentSort=function(D){nt=D},this.getClearColor=function(D){return D.copy(K.getClearColor())},this.setClearColor=function(){K.setClearColor.apply(K,arguments)},this.getClearAlpha=function(){return K.getClearAlpha()},this.setClearAlpha=function(){K.setClearAlpha.apply(K,arguments)},this.clear=function(D=!0,it=!0,ft=!0){let dt=0;if(D){let rt=!1;if(E!==null){const Ut=E.texture.format;rt=Ut===nl||Ut===el||Ut===tl}if(rt){const Ut=E.texture.type,Ot=Ut===Pn||Ut===Ii||Ut===Ks||Ut===ps||Ut===Ja||Ut===Qa,Ht=K.getClearColor(),Vt=K.getClearAlpha(),jt=Ht.r,Kt=Ht.g,Wt=Ht.b;Ot?(g[0]=jt,g[1]=Kt,g[2]=Wt,g[3]=Vt,V.clearBufferuiv(V.COLOR,0,g)):(x[0]=jt,x[1]=Kt,x[2]=Wt,x[3]=Vt,V.clearBufferiv(V.COLOR,0,x))}else dt|=V.COLOR_BUFFER_BIT}it&&(dt|=V.DEPTH_BUFFER_BIT),ft&&(dt|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(dt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Y,!1),e.removeEventListener("webglcontextrestored",at,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),mt.dispose(),Ct.dispose(),ht.dispose(),C.dispose(),R.dispose(),W.dispose(),At.dispose(),q.dispose(),St.dispose(),N.dispose(),N.removeEventListener("sessionstart",se),N.removeEventListener("sessionend",me),Oe.stop()};function Y(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function at(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const D=Bt.autoReset,it=O.enabled,ft=O.autoUpdate,dt=O.needsUpdate,rt=O.type;P(),Bt.autoReset=D,O.enabled=it,O.autoUpdate=ft,O.needsUpdate=dt,O.type=rt}function ot(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function Mt(D){const it=D.target;it.removeEventListener("dispose",Mt),wt(it)}function wt(D){Ft(D),ht.remove(D)}function Ft(D){const it=ht.get(D).programs;it!==void 0&&(it.forEach(function(ft){St.releaseProgram(ft)}),D.isShaderMaterial&&St.releaseShaderCache(D))}this.renderBufferDirect=function(D,it,ft,dt,rt,Ut){it===null&&(it=et);const Ot=rt.isMesh&&rt.matrixWorld.determinant()<0,Ht=wh(D,it,ft,dt,rt);Et.setMaterial(dt,Ot);let Vt=ft.index,jt=1;if(dt.wireframe===!0){if(Vt=$.getWireframeAttribute(ft),Vt===void 0)return;jt=2}const Kt=ft.drawRange,Wt=ft.attributes.position;let oe=Kt.start*jt,de=(Kt.start+Kt.count)*jt;Ut!==null&&(oe=Math.max(oe,Ut.start*jt),de=Math.min(de,(Ut.start+Ut.count)*jt)),Vt!==null?(oe=Math.max(oe,0),de=Math.min(de,Vt.count)):Wt!=null&&(oe=Math.max(oe,0),de=Math.min(de,Wt.count));const ge=de-oe;if(ge<0||ge===1/0)return;At.setup(rt,dt,Ht,ft,Vt);let je,le=F;if(Vt!==null&&(je=U.get(Vt),le=ut,le.setIndex(je)),rt.isMesh)dt.wireframe===!0?(Et.setLineWidth(dt.wireframeLinewidth*pt()),le.setMode(V.LINES)):le.setMode(V.TRIANGLES);else if(rt.isLine){let Xt=dt.linewidth;Xt===void 0&&(Xt=1),Et.setLineWidth(Xt*pt()),rt.isLineSegments?le.setMode(V.LINES):rt.isLineLoop?le.setMode(V.LINE_LOOP):le.setMode(V.LINE_STRIP)}else rt.isPoints?le.setMode(V.POINTS):rt.isSprite&&le.setMode(V.TRIANGLES);if(rt.isBatchedMesh)if(rt._multiDrawInstances!==null)le.renderMultiDrawInstances(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount,rt._multiDrawInstances);else if(vt.get("WEBGL_multi_draw"))le.renderMultiDraw(rt._multiDrawStarts,rt._multiDrawCounts,rt._multiDrawCount);else{const Xt=rt._multiDrawStarts,In=rt._multiDrawCounts,ce=rt._multiDrawCount,hn=Vt?U.get(Vt).bytesPerElement:1,Fi=ht.get(dt).currentProgram.getUniforms();for(let Je=0;Je<ce;Je++)Fi.setValue(V,"_gl_DrawID",Je),le.render(Xt[Je]/hn,In[Je])}else if(rt.isInstancedMesh)le.renderInstances(oe,ge,rt.count);else if(ft.isInstancedBufferGeometry){const Xt=ft._maxInstanceCount!==void 0?ft._maxInstanceCount:1/0,In=Math.min(ft.instanceCount,Xt);le.renderInstances(oe,ge,In)}else le.render(oe,ge)};function It(D,it,ft){D.transparent===!0&&D.side===ve&&D.forceSinglePass===!1?(D.side=Ze,D.needsUpdate=!0,tr(D,it,ft),D.side=di,D.needsUpdate=!0,tr(D,it,ft),D.side=ve):tr(D,it,ft)}this.compile=function(D,it,ft=null){ft===null&&(ft=D),f=Ct.get(ft),f.init(it),b.push(f),ft.traverseVisible(function(rt){rt.isLight&&rt.layers.test(it.layers)&&(f.pushLight(rt),rt.castShadow&&f.pushShadow(rt))}),D!==ft&&D.traverseVisible(function(rt){rt.isLight&&rt.layers.test(it.layers)&&(f.pushLight(rt),rt.castShadow&&f.pushShadow(rt))}),f.setupLights();const dt=new Set;return D.traverse(function(rt){if(!(rt.isMesh||rt.isPoints||rt.isLine||rt.isSprite))return;const Ut=rt.material;if(Ut)if(Array.isArray(Ut))for(let Ot=0;Ot<Ut.length;Ot++){const Ht=Ut[Ot];It(Ht,ft,rt),dt.add(Ht)}else It(Ut,ft,rt),dt.add(Ut)}),b.pop(),f=null,dt},this.compileAsync=function(D,it,ft=null){const dt=this.compile(D,it,ft);return new Promise(rt=>{function Ut(){if(dt.forEach(function(Ot){ht.get(Ot).currentProgram.isReady()&&dt.delete(Ot)}),dt.size===0){rt(D);return}setTimeout(Ut,10)}vt.get("KHR_parallel_shader_compile")!==null?Ut():setTimeout(Ut,10)})};let kt=null;function Yt(D){kt&&kt(D)}function se(){Oe.stop()}function me(){Oe.start()}const Oe=new Ku;Oe.setAnimationLoop(Yt),typeof self<"u"&&Oe.setContext(self),this.setAnimationLoop=function(D){kt=D,N.setAnimationLoop(D),D===null?Oe.stop():Oe.start()},N.addEventListener("sessionstart",se),N.addEventListener("sessionend",me),this.render=function(D,it){if(it!==void 0&&it.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),it.parent===null&&it.matrixWorldAutoUpdate===!0&&it.updateMatrixWorld(),N.enabled===!0&&N.isPresenting===!0&&(N.cameraAutoUpdate===!0&&N.updateCamera(it),it=N.getCamera()),D.isScene===!0&&D.onBeforeRender(v,D,it,E),f=Ct.get(D,b.length),f.init(it),b.push(f),Dt.multiplyMatrices(it.projectionMatrix,it.matrixWorldInverse),lt.setFromProjectionMatrix(Dt),Pt=this.localClippingEnabled,bt=_t.init(this.clippingPlanes,Pt),m=mt.get(D,S.length),m.init(),S.push(m),N.enabled===!0&&N.isPresenting===!0){const Ut=v.xr.getDepthSensingMesh();Ut!==null&&un(Ut,it,-1/0,v.sortObjects)}un(D,it,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(Z,nt),st=N.enabled===!1||N.isPresenting===!1||N.hasDepthSensing()===!1,st&&K.addToRenderList(m,D),this.info.render.frame++,bt===!0&&_t.beginShadows();const ft=f.state.shadowsArray;O.render(ft,D,it),bt===!0&&_t.endShadows(),this.info.autoReset===!0&&this.info.reset();const dt=m.opaque,rt=m.transmissive;if(f.setupLights(),it.isArrayCamera){const Ut=it.cameras;if(rt.length>0)for(let Ot=0,Ht=Ut.length;Ot<Ht;Ot++){const Vt=Ut[Ot];yl(dt,rt,D,Vt)}st&&K.render(D);for(let Ot=0,Ht=Ut.length;Ot<Ht;Ot++){const Vt=Ut[Ot];Ni(m,D,Vt,Vt.viewport)}}else rt.length>0&&yl(dt,rt,D,it),st&&K.render(D),Ni(m,D,it);E!==null&&(I.updateMultisampleRenderTarget(E),I.updateRenderTargetMipmap(E)),D.isScene===!0&&D.onAfterRender(v,D,it),At.resetDefaultState(),y=-1,M=null,b.pop(),b.length>0?(f=b[b.length-1],bt===!0&&_t.setGlobalState(v.clippingPlanes,f.state.camera)):f=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function un(D,it,ft,dt){if(D.visible===!1)return;if(D.layers.test(it.layers)){if(D.isGroup)ft=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(it);else if(D.isLight)f.pushLight(D),D.castShadow&&f.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||lt.intersectsSprite(D)){dt&&X.setFromMatrixPosition(D.matrixWorld).applyMatrix4(Dt);const Ot=W.update(D),Ht=D.material;Ht.visible&&m.push(D,Ot,Ht,ft,X.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||lt.intersectsObject(D))){const Ot=W.update(D),Ht=D.material;if(dt&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),X.copy(D.boundingSphere.center)):(Ot.boundingSphere===null&&Ot.computeBoundingSphere(),X.copy(Ot.boundingSphere.center)),X.applyMatrix4(D.matrixWorld).applyMatrix4(Dt)),Array.isArray(Ht)){const Vt=Ot.groups;for(let jt=0,Kt=Vt.length;jt<Kt;jt++){const Wt=Vt[jt],oe=Ht[Wt.materialIndex];oe&&oe.visible&&m.push(D,Ot,oe,ft,X.z,Wt)}}else Ht.visible&&m.push(D,Ot,Ht,ft,X.z,null)}}const Ut=D.children;for(let Ot=0,Ht=Ut.length;Ot<Ht;Ot++)un(Ut[Ot],it,ft,dt)}function Ni(D,it,ft,dt){const rt=D.opaque,Ut=D.transmissive,Ot=D.transparent;f.setupLightsView(ft),bt===!0&&_t.setGlobalState(v.clippingPlanes,ft),dt&&Et.viewport(A.copy(dt)),rt.length>0&&Qs(rt,it,ft),Ut.length>0&&Qs(Ut,it,ft),Ot.length>0&&Qs(Ot,it,ft),Et.buffers.depth.setTest(!0),Et.buffers.depth.setMask(!0),Et.buffers.color.setMask(!0),Et.setPolygonOffset(!1)}function yl(D,it,ft,dt){if((ft.isScene===!0?ft.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[dt.id]===void 0&&(f.state.transmissionRenderTarget[dt.id]=new cn(1,1,{generateMipmaps:!0,type:vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float")?Cn:Pn,minFilter:Pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ne.workingColorSpace}));const Ut=f.state.transmissionRenderTarget[dt.id],Ot=dt.viewport||A;Ut.setSize(Ot.z,Ot.w);const Ht=v.getRenderTarget();v.setRenderTarget(Ut),v.getClearColor(j),tt=v.getClearAlpha(),tt<1&&v.setClearColor(16777215,.5),v.clear(),st&&K.render(ft);const Vt=v.toneMapping;v.toneMapping=fi;const jt=dt.viewport;if(dt.viewport!==void 0&&(dt.viewport=void 0),f.setupLightsView(dt),bt===!0&&_t.setGlobalState(v.clippingPlanes,dt),Qs(D,ft,dt),I.updateMultisampleRenderTarget(Ut),I.updateRenderTargetMipmap(Ut),vt.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Wt=0,oe=it.length;Wt<oe;Wt++){const de=it[Wt],ge=de.object,je=de.geometry,le=de.material,Xt=de.group;if(le.side===ve&&ge.layers.test(dt.layers)){const In=le.side;le.side=Ze,le.needsUpdate=!0,Sl(ge,ft,dt,je,le,Xt),le.side=In,le.needsUpdate=!0,Kt=!0}}Kt===!0&&(I.updateMultisampleRenderTarget(Ut),I.updateRenderTargetMipmap(Ut))}v.setRenderTarget(Ht),v.setClearColor(j,tt),jt!==void 0&&(dt.viewport=jt),v.toneMapping=Vt}function Qs(D,it,ft){const dt=it.isScene===!0?it.overrideMaterial:null;for(let rt=0,Ut=D.length;rt<Ut;rt++){const Ot=D[rt],Ht=Ot.object,Vt=Ot.geometry,jt=dt===null?Ot.material:dt,Kt=Ot.group;Ht.layers.test(ft.layers)&&Sl(Ht,it,ft,Vt,jt,Kt)}}function Sl(D,it,ft,dt,rt,Ut){D.onBeforeRender(v,it,ft,dt,rt,Ut),D.modelViewMatrix.multiplyMatrices(ft.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),rt.onBeforeRender(v,it,ft,dt,D,Ut),rt.transparent===!0&&rt.side===ve&&rt.forceSinglePass===!1?(rt.side=Ze,rt.needsUpdate=!0,v.renderBufferDirect(ft,it,dt,rt,D,Ut),rt.side=di,rt.needsUpdate=!0,v.renderBufferDirect(ft,it,dt,rt,D,Ut),rt.side=ve):v.renderBufferDirect(ft,it,dt,rt,D,Ut),D.onAfterRender(v,it,ft,dt,rt,Ut)}function tr(D,it,ft){it.isScene!==!0&&(it=et);const dt=ht.get(D),rt=f.state.lights,Ut=f.state.shadowsArray,Ot=rt.state.version,Ht=St.getParameters(D,rt.state,Ut,it,ft),Vt=St.getProgramCacheKey(Ht);let jt=dt.programs;dt.environment=D.isMeshStandardMaterial?it.environment:null,dt.fog=it.fog,dt.envMap=(D.isMeshStandardMaterial?R:C).get(D.envMap||dt.environment),dt.envMapRotation=dt.environment!==null&&D.envMap===null?it.environmentRotation:D.envMapRotation,jt===void 0&&(D.addEventListener("dispose",Mt),jt=new Map,dt.programs=jt);let Kt=jt.get(Vt);if(Kt!==void 0){if(dt.currentProgram===Kt&&dt.lightsStateVersion===Ot)return wl(D,Ht),Kt}else Ht.uniforms=St.getUniforms(D),D.onBeforeCompile(Ht,v),Kt=St.acquireProgram(Ht,Vt),jt.set(Vt,Kt),dt.uniforms=Ht.uniforms;const Wt=dt.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Wt.clippingPlanes=_t.uniform),wl(D,Ht),dt.needsLights=Th(D),dt.lightsStateVersion=Ot,dt.needsLights&&(Wt.ambientLightColor.value=rt.state.ambient,Wt.lightProbe.value=rt.state.probe,Wt.directionalLights.value=rt.state.directional,Wt.directionalLightShadows.value=rt.state.directionalShadow,Wt.spotLights.value=rt.state.spot,Wt.spotLightShadows.value=rt.state.spotShadow,Wt.rectAreaLights.value=rt.state.rectArea,Wt.ltc_1.value=rt.state.rectAreaLTC1,Wt.ltc_2.value=rt.state.rectAreaLTC2,Wt.pointLights.value=rt.state.point,Wt.pointLightShadows.value=rt.state.pointShadow,Wt.hemisphereLights.value=rt.state.hemi,Wt.directionalShadowMap.value=rt.state.directionalShadowMap,Wt.directionalShadowMatrix.value=rt.state.directionalShadowMatrix,Wt.spotShadowMap.value=rt.state.spotShadowMap,Wt.spotLightMatrix.value=rt.state.spotLightMatrix,Wt.spotLightMap.value=rt.state.spotLightMap,Wt.pointShadowMap.value=rt.state.pointShadowMap,Wt.pointShadowMatrix.value=rt.state.pointShadowMatrix),dt.currentProgram=Kt,dt.uniformsList=null,Kt}function bl(D){if(D.uniformsList===null){const it=D.currentProgram.getUniforms();D.uniformsList=$r.seqWithValue(it.seq,D.uniforms)}return D.uniformsList}function wl(D,it){const ft=ht.get(D);ft.outputColorSpace=it.outputColorSpace,ft.batching=it.batching,ft.batchingColor=it.batchingColor,ft.instancing=it.instancing,ft.instancingColor=it.instancingColor,ft.instancingMorph=it.instancingMorph,ft.skinning=it.skinning,ft.morphTargets=it.morphTargets,ft.morphNormals=it.morphNormals,ft.morphColors=it.morphColors,ft.morphTargetsCount=it.morphTargetsCount,ft.numClippingPlanes=it.numClippingPlanes,ft.numIntersection=it.numClipIntersection,ft.vertexAlphas=it.vertexAlphas,ft.vertexTangents=it.vertexTangents,ft.toneMapping=it.toneMapping}function wh(D,it,ft,dt,rt){it.isScene!==!0&&(it=et),I.resetTextureUnits();const Ut=it.fog,Ot=dt.isMeshStandardMaterial?it.environment:null,Ht=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:_s,Vt=(dt.isMeshStandardMaterial?R:C).get(dt.envMap||Ot),jt=dt.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,Kt=!!ft.attributes.tangent&&(!!dt.normalMap||dt.anisotropy>0),Wt=!!ft.morphAttributes.position,oe=!!ft.morphAttributes.normal,de=!!ft.morphAttributes.color;let ge=fi;dt.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(ge=v.toneMapping);const je=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,le=je!==void 0?je.length:0,Xt=ht.get(dt),In=f.state.lights;if(bt===!0&&(Pt===!0||D!==M)){const rn=D===M&&dt.id===y;_t.setState(dt,D,rn)}let ce=!1;dt.version===Xt.__version?(Xt.needsLights&&Xt.lightsStateVersion!==In.state.version||Xt.outputColorSpace!==Ht||rt.isBatchedMesh&&Xt.batching===!1||!rt.isBatchedMesh&&Xt.batching===!0||rt.isBatchedMesh&&Xt.batchingColor===!0&&rt.colorTexture===null||rt.isBatchedMesh&&Xt.batchingColor===!1&&rt.colorTexture!==null||rt.isInstancedMesh&&Xt.instancing===!1||!rt.isInstancedMesh&&Xt.instancing===!0||rt.isSkinnedMesh&&Xt.skinning===!1||!rt.isSkinnedMesh&&Xt.skinning===!0||rt.isInstancedMesh&&Xt.instancingColor===!0&&rt.instanceColor===null||rt.isInstancedMesh&&Xt.instancingColor===!1&&rt.instanceColor!==null||rt.isInstancedMesh&&Xt.instancingMorph===!0&&rt.morphTexture===null||rt.isInstancedMesh&&Xt.instancingMorph===!1&&rt.morphTexture!==null||Xt.envMap!==Vt||dt.fog===!0&&Xt.fog!==Ut||Xt.numClippingPlanes!==void 0&&(Xt.numClippingPlanes!==_t.numPlanes||Xt.numIntersection!==_t.numIntersection)||Xt.vertexAlphas!==jt||Xt.vertexTangents!==Kt||Xt.morphTargets!==Wt||Xt.morphNormals!==oe||Xt.morphColors!==de||Xt.toneMapping!==ge||Xt.morphTargetsCount!==le)&&(ce=!0):(ce=!0,Xt.__version=dt.version);let hn=Xt.currentProgram;ce===!0&&(hn=tr(dt,it,rt));let Fi=!1,Je=!1,Es=!1;const xe=hn.getUniforms(),_n=Xt.uniforms;if(Et.useProgram(hn.program)&&(Fi=!0,Je=!0,Es=!0),dt.id!==y&&(y=dt.id,Je=!0),Fi||M!==D){Et.buffers.depth.getReversed()?(yt.copy(D.projectionMatrix),Jf(yt),Qf(yt),xe.setValue(V,"projectionMatrix",yt)):xe.setValue(V,"projectionMatrix",D.projectionMatrix),xe.setValue(V,"viewMatrix",D.matrixWorldInverse);const $n=xe.map.cameraPosition;$n!==void 0&&$n.setValue(V,L.setFromMatrixPosition(D.matrixWorld)),Tt.logarithmicDepthBuffer&&xe.setValue(V,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),(dt.isMeshPhongMaterial||dt.isMeshToonMaterial||dt.isMeshLambertMaterial||dt.isMeshBasicMaterial||dt.isMeshStandardMaterial||dt.isShaderMaterial)&&xe.setValue(V,"isOrthographic",D.isOrthographicCamera===!0),M!==D&&(M=D,Je=!0,Es=!0)}if(rt.isSkinnedMesh){xe.setOptional(V,rt,"bindMatrix"),xe.setOptional(V,rt,"bindMatrixInverse");const rn=rt.skeleton;rn&&(rn.boneTexture===null&&rn.computeBoneTexture(),xe.setValue(V,"boneTexture",rn.boneTexture,I))}rt.isBatchedMesh&&(xe.setOptional(V,rt,"batchingTexture"),xe.setValue(V,"batchingTexture",rt._matricesTexture,I),xe.setOptional(V,rt,"batchingIdTexture"),xe.setValue(V,"batchingIdTexture",rt._indirectTexture,I),xe.setOptional(V,rt,"batchingColorTexture"),rt._colorsTexture!==null&&xe.setValue(V,"batchingColorTexture",rt._colorsTexture,I));const Ts=ft.morphAttributes;if((Ts.position!==void 0||Ts.normal!==void 0||Ts.color!==void 0)&&J.update(rt,ft,hn),(Je||Xt.receiveShadow!==rt.receiveShadow)&&(Xt.receiveShadow=rt.receiveShadow,xe.setValue(V,"receiveShadow",rt.receiveShadow)),dt.isMeshGouraudMaterial&&dt.envMap!==null&&(_n.envMap.value=Vt,_n.flipEnvMap.value=Vt.isCubeTexture&&Vt.isRenderTargetTexture===!1?-1:1),dt.isMeshStandardMaterial&&dt.envMap===null&&it.environment!==null&&(_n.envMapIntensity.value=it.environmentIntensity),Je&&(xe.setValue(V,"toneMappingExposure",v.toneMappingExposure),Xt.needsLights&&Eh(_n,Es),Ut&&dt.fog===!0&&ct.refreshFogUniforms(_n,Ut),ct.refreshMaterialUniforms(_n,dt,B,z,f.state.transmissionRenderTarget[D.id]),$r.upload(V,bl(Xt),_n,I)),dt.isShaderMaterial&&dt.uniformsNeedUpdate===!0&&($r.upload(V,bl(Xt),_n,I),dt.uniformsNeedUpdate=!1),dt.isSpriteMaterial&&xe.setValue(V,"center",rt.center),xe.setValue(V,"modelViewMatrix",rt.modelViewMatrix),xe.setValue(V,"normalMatrix",rt.normalMatrix),xe.setValue(V,"modelMatrix",rt.matrixWorld),dt.isShaderMaterial||dt.isRawShaderMaterial){const rn=dt.uniformsGroups;for(let $n=0,jn=rn.length;$n<jn;$n++){const El=rn[$n];q.update(El,hn),q.bind(El,hn)}}return hn}function Eh(D,it){D.ambientLightColor.needsUpdate=it,D.lightProbe.needsUpdate=it,D.directionalLights.needsUpdate=it,D.directionalLightShadows.needsUpdate=it,D.pointLights.needsUpdate=it,D.pointLightShadows.needsUpdate=it,D.spotLights.needsUpdate=it,D.spotLightShadows.needsUpdate=it,D.rectAreaLights.needsUpdate=it,D.hemisphereLights.needsUpdate=it}function Th(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return _},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(D,it,ft){ht.get(D.texture).__webglTexture=it,ht.get(D.depthTexture).__webglTexture=ft;const dt=ht.get(D);dt.__hasExternalTextures=!0,dt.__autoAllocateDepthBuffer=ft===void 0,dt.__autoAllocateDepthBuffer||vt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),dt.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(D,it){const ft=ht.get(D);ft.__webglFramebuffer=it,ft.__useDefaultFramebuffer=it===void 0},this.setRenderTarget=function(D,it=0,ft=0){E=D,_=it,w=ft;let dt=!0,rt=null,Ut=!1,Ot=!1;if(D){const Vt=ht.get(D);if(Vt.__useDefaultFramebuffer!==void 0)Et.bindFramebuffer(V.FRAMEBUFFER,null),dt=!1;else if(Vt.__webglFramebuffer===void 0)I.setupRenderTarget(D);else if(Vt.__hasExternalTextures)I.rebindTextures(D,ht.get(D.texture).__webglTexture,ht.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const Wt=D.depthTexture;if(Vt.__boundDepthTexture!==Wt){if(Wt!==null&&ht.has(Wt)&&(D.width!==Wt.image.width||D.height!==Wt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(D)}}const jt=D.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(Ot=!0);const Kt=ht.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Kt[it])?rt=Kt[it][ft]:rt=Kt[it],Ut=!0):D.samples>0&&I.useMultisampledRTT(D)===!1?rt=ht.get(D).__webglMultisampledFramebuffer:Array.isArray(Kt)?rt=Kt[ft]:rt=Kt,A.copy(D.viewport),G.copy(D.scissor),H=D.scissorTest}else A.copy(xt).multiplyScalar(B).floor(),G.copy(Rt).multiplyScalar(B).floor(),H=Lt;if(Et.bindFramebuffer(V.FRAMEBUFFER,rt)&&dt&&Et.drawBuffers(D,rt),Et.viewport(A),Et.scissor(G),Et.setScissorTest(H),Ut){const Vt=ht.get(D.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+it,Vt.__webglTexture,ft)}else if(Ot){const Vt=ht.get(D.texture),jt=it||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Vt.__webglTexture,ft||0,jt)}y=-1},this.readRenderTargetPixels=function(D,it,ft,dt,rt,Ut,Ot){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ht=ht.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ot!==void 0&&(Ht=Ht[Ot]),Ht){Et.bindFramebuffer(V.FRAMEBUFFER,Ht);try{const Vt=D.texture,jt=Vt.format,Kt=Vt.type;if(!Tt.textureFormatReadable(jt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Tt.textureTypeReadable(Kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}it>=0&&it<=D.width-dt&&ft>=0&&ft<=D.height-rt&&V.readPixels(it,ft,dt,rt,gt.convert(jt),gt.convert(Kt),Ut)}finally{const Vt=E!==null?ht.get(E).__webglFramebuffer:null;Et.bindFramebuffer(V.FRAMEBUFFER,Vt)}}},this.readRenderTargetPixelsAsync=async function(D,it,ft,dt,rt,Ut,Ot){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ht=ht.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&Ot!==void 0&&(Ht=Ht[Ot]),Ht){const Vt=D.texture,jt=Vt.format,Kt=Vt.type;if(!Tt.textureFormatReadable(jt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Tt.textureTypeReadable(Kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(it>=0&&it<=D.width-dt&&ft>=0&&ft<=D.height-rt){Et.bindFramebuffer(V.FRAMEBUFFER,Ht);const Wt=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Wt),V.bufferData(V.PIXEL_PACK_BUFFER,Ut.byteLength,V.STREAM_READ),V.readPixels(it,ft,dt,rt,gt.convert(jt),gt.convert(Kt),0);const oe=E!==null?ht.get(E).__webglFramebuffer:null;Et.bindFramebuffer(V.FRAMEBUFFER,oe);const de=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Zf(V,de,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Wt),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Ut),V.deleteBuffer(Wt),V.deleteSync(de),Ut}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(D,it=null,ft=0){D.isTexture!==!0&&(Vs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),it=arguments[0]||null,D=arguments[1]);const dt=Math.pow(2,-ft),rt=Math.floor(D.image.width*dt),Ut=Math.floor(D.image.height*dt),Ot=it!==null?it.x:0,Ht=it!==null?it.y:0;I.setTexture2D(D,0),V.copyTexSubImage2D(V.TEXTURE_2D,ft,0,0,Ot,Ht,rt,Ut),Et.unbindTexture()},this.copyTextureToTexture=function(D,it,ft=null,dt=null,rt=0){D.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture function signature has changed."),dt=arguments[0]||null,D=arguments[1],it=arguments[2],rt=arguments[3]||0,ft=null);let Ut,Ot,Ht,Vt,jt,Kt,Wt,oe,de;const ge=D.isCompressedTexture?D.mipmaps[rt]:D.image;ft!==null?(Ut=ft.max.x-ft.min.x,Ot=ft.max.y-ft.min.y,Ht=ft.isBox3?ft.max.z-ft.min.z:1,Vt=ft.min.x,jt=ft.min.y,Kt=ft.isBox3?ft.min.z:0):(Ut=ge.width,Ot=ge.height,Ht=ge.depth||1,Vt=0,jt=0,Kt=0),dt!==null?(Wt=dt.x,oe=dt.y,de=dt.z):(Wt=0,oe=0,de=0);const je=gt.convert(it.format),le=gt.convert(it.type);let Xt;it.isData3DTexture?(I.setTexture3D(it,0),Xt=V.TEXTURE_3D):it.isDataArrayTexture||it.isCompressedArrayTexture?(I.setTexture2DArray(it,0),Xt=V.TEXTURE_2D_ARRAY):(I.setTexture2D(it,0),Xt=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,it.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,it.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,it.unpackAlignment);const In=V.getParameter(V.UNPACK_ROW_LENGTH),ce=V.getParameter(V.UNPACK_IMAGE_HEIGHT),hn=V.getParameter(V.UNPACK_SKIP_PIXELS),Fi=V.getParameter(V.UNPACK_SKIP_ROWS),Je=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,ge.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ge.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Vt),V.pixelStorei(V.UNPACK_SKIP_ROWS,jt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Kt);const Es=D.isDataArrayTexture||D.isData3DTexture,xe=it.isDataArrayTexture||it.isData3DTexture;if(D.isRenderTargetTexture||D.isDepthTexture){const _n=ht.get(D),Ts=ht.get(it),rn=ht.get(_n.__renderTarget),$n=ht.get(Ts.__renderTarget);Et.bindFramebuffer(V.READ_FRAMEBUFFER,rn.__webglFramebuffer),Et.bindFramebuffer(V.DRAW_FRAMEBUFFER,$n.__webglFramebuffer);for(let jn=0;jn<Ht;jn++)Es&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ht.get(D).__webglTexture,rt,Kt+jn),D.isDepthTexture?(xe&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,ht.get(it).__webglTexture,rt,de+jn),V.blitFramebuffer(Vt,jt,Ut,Ot,Wt,oe,Ut,Ot,V.DEPTH_BUFFER_BIT,V.NEAREST)):xe?V.copyTexSubImage3D(Xt,rt,Wt,oe,de+jn,Vt,jt,Ut,Ot):V.copyTexSubImage2D(Xt,rt,Wt,oe,de+jn,Vt,jt,Ut,Ot);Et.bindFramebuffer(V.READ_FRAMEBUFFER,null),Et.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else xe?D.isDataTexture||D.isData3DTexture?V.texSubImage3D(Xt,rt,Wt,oe,de,Ut,Ot,Ht,je,le,ge.data):it.isCompressedArrayTexture?V.compressedTexSubImage3D(Xt,rt,Wt,oe,de,Ut,Ot,Ht,je,ge.data):V.texSubImage3D(Xt,rt,Wt,oe,de,Ut,Ot,Ht,je,le,ge):D.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,rt,Wt,oe,Ut,Ot,je,le,ge.data):D.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,rt,Wt,oe,ge.width,ge.height,je,ge.data):V.texSubImage2D(V.TEXTURE_2D,rt,Wt,oe,Ut,Ot,je,le,ge);V.pixelStorei(V.UNPACK_ROW_LENGTH,In),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ce),V.pixelStorei(V.UNPACK_SKIP_PIXELS,hn),V.pixelStorei(V.UNPACK_SKIP_ROWS,Fi),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Je),rt===0&&it.generateMipmaps&&V.generateMipmap(Xt),Et.unbindTexture()},this.copyTextureToTexture3D=function(D,it,ft=null,dt=null,rt=0){return D.isTexture!==!0&&(Vs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),ft=arguments[0]||null,dt=arguments[1]||null,D=arguments[2],it=arguments[3],rt=arguments[4]||0),Vs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(D,it,ft,dt,rt)},this.initRenderTarget=function(D){ht.get(D).__webglFramebuffer===void 0&&I.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?I.setTextureCube(D,0):D.isData3DTexture?I.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?I.setTexture2DArray(D,0):I.setTexture2D(D,0),Et.unbindTexture()},this.resetState=function(){_=0,w=0,E=null,Et.reset(),At.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=ne._getDrawingBufferColorSpace(t),e.unpackColorSpace=ne._getUnpackColorSpace()}}class ul{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Gt(t),this.near=e,this.far=n}clone(){return new ul(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class lx extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class cx{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=ka,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const qe=new Q;class ci{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyMatrix4(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.applyNormalMatrix(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)qe.fromBufferAttribute(this,e),qe.transformDirection(t),this.setXYZ(e,qe.x,qe.y,qe.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=gn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=he(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=he(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=gn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=gn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=gn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=gn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=he(e,this.array),n=he(n,this.array),s=he(s,this.array),r=he(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new _e(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ci(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class eh extends Xe{constructor(t=null,e=1,n=1,s,r,o,a,l,c=sn,u=sn,d,p){super(null,o,a,l,c,u,s,r,d,p),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qs extends _e{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ji=new re,Pc=new re,Er=[],Lc=new Dn,ux=new re,Ls=new $t,Ds=new mi;class hx extends $t{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new qs(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,ux)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Dn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),Lc.copy(t.boundingBox).applyMatrix4(Ji),this.boundingBox.union(Lc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new mi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ji),Ds.copy(t.boundingSphere).applyMatrix4(Ji),this.boundingSphere.union(Ds)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ls.geometry=this.geometry,Ls.material=this.material,Ls.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ds.copy(this.boundingSphere),Ds.applyMatrix4(n),t.ray.intersectsSphere(Ds)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ji),Pc.multiplyMatrices(n,Ji),Ls.matrixWorld=Pc,Ls.raycast(t,Er);for(let o=0,a=Er.length;o<a;o++){const l=Er[o];l.instanceId=r,l.object=this,e.push(l)}Er.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new qs(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new eh(new Float32Array(s*this.count),s,this.count,eo,An));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=s*t;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class fx extends ys{static get type(){return"PointsMaterial"}constructor(t){super(),this.isPointsMaterial=!0,this.color=new Gt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Dc=new re,Va=new sl,Tr=new mi,Ar=new Q;class dx extends Ce{constructor(t=new fe,e=new fx){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Tr.copy(n.boundingSphere),Tr.applyMatrix4(s),Tr.radius+=r,t.ray.intersectsSphere(Tr)===!1)return;Dc.copy(s).invert(),Va.copy(t.ray).applyMatrix4(Dc);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const p=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let g=p,x=h;g<x;g++){const m=c.getX(g);Ar.fromBufferAttribute(d,m),Ic(Ar,m,l,s,t,e,this)}}else{const p=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let g=p,x=h;g<x;g++)Ar.fromBufferAttribute(d,g),Ic(Ar,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ic(i,t,e,n,s,r,o){const a=Va.distanceSqToPoint(i);if(a<e){const l=new Q;Va.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class nh extends Xe{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class hl extends fe{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new Q,u=new qt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,p=3;d<=e;d++,p+=3){const h=n+d/e*s;c.x=t*Math.cos(h),c.y=t*Math.sin(h),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[p]/t+1)/2,u.y=(o[p+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new te(o,3)),this.setAttribute("normal",new te(a,3)),this.setAttribute("uv",new te(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ws extends fe{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],d=[],p=[],h=[];let g=0;const x=[],m=n/2;let f=0;S(),o===!1&&(t>0&&b(!0),e>0&&b(!1)),this.setIndex(u),this.setAttribute("position",new te(d,3)),this.setAttribute("normal",new te(p,3)),this.setAttribute("uv",new te(h,2));function S(){const v=new Q,T=new Q;let _=0;const w=(e-t)/n;for(let E=0;E<=r;E++){const y=[],M=E/r,A=M*(e-t)+t;for(let G=0;G<=s;G++){const H=G/s,j=H*l+a,tt=Math.sin(j),k=Math.cos(j);T.x=A*tt,T.y=-M*n+m,T.z=A*k,d.push(T.x,T.y,T.z),v.set(tt,w,k).normalize(),p.push(v.x,v.y,v.z),h.push(H,1-M),y.push(g++)}x.push(y)}for(let E=0;E<s;E++)for(let y=0;y<r;y++){const M=x[y][E],A=x[y+1][E],G=x[y+1][E+1],H=x[y][E+1];(t>0||y!==0)&&(u.push(M,A,H),_+=3),(e>0||y!==r-1)&&(u.push(A,G,H),_+=3)}c.addGroup(f,_,0),f+=_}function b(v){const T=g,_=new qt,w=new Q;let E=0;const y=v===!0?t:e,M=v===!0?1:-1;for(let G=1;G<=s;G++)d.push(0,m*M,0),p.push(0,M,0),h.push(.5,.5),g++;const A=g;for(let G=0;G<=s;G++){const j=G/s*l+a,tt=Math.cos(j),k=Math.sin(j);w.x=y*k,w.y=m*M,w.z=y*tt,d.push(w.x,w.y,w.z),p.push(0,M,0),_.x=tt*.5+.5,_.y=k*.5*M+.5,h.push(_.x,_.y),g++}for(let G=0;G<s;G++){const H=T+G,j=A+G;v===!0?u.push(j,j+1,H):u.push(j+1,j,H),E+=3}c.addGroup(f,E,v===!0?1:2),f+=E}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ws(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class fl extends ws{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new fl(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class so extends fe{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],o=[];a(s),c(n),u(),this.setAttribute("position",new te(r,3)),this.setAttribute("normal",new te(r.slice(),3)),this.setAttribute("uv",new te(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(S){const b=new Q,v=new Q,T=new Q;for(let _=0;_<e.length;_+=3)h(e[_+0],b),h(e[_+1],v),h(e[_+2],T),l(b,v,T,S)}function l(S,b,v,T){const _=T+1,w=[];for(let E=0;E<=_;E++){w[E]=[];const y=S.clone().lerp(v,E/_),M=b.clone().lerp(v,E/_),A=_-E;for(let G=0;G<=A;G++)G===0&&E===_?w[E][G]=y:w[E][G]=y.clone().lerp(M,G/A)}for(let E=0;E<_;E++)for(let y=0;y<2*(_-E)-1;y++){const M=Math.floor(y/2);y%2===0?(p(w[E][M+1]),p(w[E+1][M]),p(w[E][M])):(p(w[E][M+1]),p(w[E+1][M+1]),p(w[E+1][M]))}}function c(S){const b=new Q;for(let v=0;v<r.length;v+=3)b.x=r[v+0],b.y=r[v+1],b.z=r[v+2],b.normalize().multiplyScalar(S),r[v+0]=b.x,r[v+1]=b.y,r[v+2]=b.z}function u(){const S=new Q;for(let b=0;b<r.length;b+=3){S.x=r[b+0],S.y=r[b+1],S.z=r[b+2];const v=m(S)/2/Math.PI+.5,T=f(S)/Math.PI+.5;o.push(v,1-T)}g(),d()}function d(){for(let S=0;S<o.length;S+=6){const b=o[S+0],v=o[S+2],T=o[S+4],_=Math.max(b,v,T),w=Math.min(b,v,T);_>.9&&w<.1&&(b<.2&&(o[S+0]+=1),v<.2&&(o[S+2]+=1),T<.2&&(o[S+4]+=1))}}function p(S){r.push(S.x,S.y,S.z)}function h(S,b){const v=S*3;b.x=t[v+0],b.y=t[v+1],b.z=t[v+2]}function g(){const S=new Q,b=new Q,v=new Q,T=new Q,_=new qt,w=new qt,E=new qt;for(let y=0,M=0;y<r.length;y+=9,M+=6){S.set(r[y+0],r[y+1],r[y+2]),b.set(r[y+3],r[y+4],r[y+5]),v.set(r[y+6],r[y+7],r[y+8]),_.set(o[M+0],o[M+1]),w.set(o[M+2],o[M+3]),E.set(o[M+4],o[M+5]),T.copy(S).add(b).add(v).divideScalar(3);const A=m(T);x(_,M+0,S,A),x(w,M+2,b,A),x(E,M+4,v,A)}}function x(S,b,v,T){T<0&&S.x===1&&(o[b]=S.x-1),v.x===0&&v.z===0&&(o[b]=T/2/Math.PI+.5)}function m(S){return Math.atan2(S.z,-S.x)}function f(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new so(t.vertices,t.indices,t.radius,t.details)}}const Rr=new Q,Cr=new Q,Ho=new Q,Pr=new an;class px extends fe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(cs*e),o=t.getIndex(),a=t.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],u=["a","b","c"],d=new Array(3),p={},h=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:x,b:m,c:f}=Pr;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),f.fromBufferAttribute(a,c[2]),Pr.getNormal(Ho),d[0]=`${Math.round(x.x*s)},${Math.round(x.y*s)},${Math.round(x.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){const b=(S+1)%3,v=d[S],T=d[b],_=Pr[u[S]],w=Pr[u[b]],E=`${v}_${T}`,y=`${T}_${v}`;y in p&&p[y]?(Ho.dot(p[y].normal)<=r&&(h.push(_.x,_.y,_.z),h.push(w.x,w.y,w.z)),p[y]=null):E in p||(p[E]={index0:c[S],index1:c[b],normal:Ho.clone()})}}for(const g in p)if(p[g]){const{index0:x,index1:m}=p[g];Rr.fromBufferAttribute(a,x),Cr.fromBufferAttribute(a,m),h.push(Rr.x,Rr.y,Rr.z),h.push(Cr.x,Cr.y,Cr.z)}this.setAttribute("position",new te(h,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class ui extends so{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ui(t.radius,t.detail)}}class Yn extends fe{constructor(t=.5,e=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],c=[],u=[];let d=t;const p=(e-t)/s,h=new Q,g=new qt;for(let x=0;x<=s;x++){for(let m=0;m<=n;m++){const f=r+m/n*o;h.x=d*Math.cos(f),h.y=d*Math.sin(f),l.push(h.x,h.y,h.z),c.push(0,0,1),g.x=(h.x/e+1)/2,g.y=(h.y/e+1)/2,u.push(g.x,g.y)}d+=p}for(let x=0;x<s;x++){const m=x*(n+1);for(let f=0;f<n;f++){const S=f+m,b=S,v=S+n+1,T=S+n+2,_=S+1;a.push(b,v,_),a.push(v,T,_)}}this.setIndex(a),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(c,3)),this.setAttribute("uv",new te(u,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yn(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class dl extends so{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],s=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,s,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new dl(t.radius,t.detail)}}class pl extends fe{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],l=[],c=[],u=new Q,d=new Q,p=new Q;for(let h=0;h<=n;h++)for(let g=0;g<=s;g++){const x=g/s*r,m=h/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(x),d.y=(t+e*Math.cos(m))*Math.sin(x),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),p.subVectors(d,u).normalize(),l.push(p.x,p.y,p.z),c.push(g/s),c.push(h/n)}for(let h=1;h<=n;h++)for(let g=1;g<=s;g++){const x=(s+1)*h+g-1,m=(s+1)*(h-1)+g-1,f=(s+1)*(h-1)+g,S=(s+1)*h+g;o.push(x,m,S),o.push(m,f,S)}this.setIndex(o),this.setAttribute("position",new te(a,3)),this.setAttribute("normal",new te(l,3)),this.setAttribute("uv",new te(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pl(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class mx extends fe{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){const e=[],n=new Set,s=new Q,r=new Q;if(t.index!==null){const o=t.attributes.position,a=t.index;let l=t.groups;l.length===0&&(l=[{start:0,count:a.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){const d=l[c],p=d.start,h=d.count;for(let g=p,x=p+h;g<x;g+=3)for(let m=0;m<3;m++){const f=a.getX(g+m),S=a.getX(g+(m+1)%3);s.fromBufferAttribute(o,f),r.fromBufferAttribute(o,S),Uc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}}else{const o=t.attributes.position;for(let a=0,l=o.count/3;a<l;a++)for(let c=0;c<3;c++){const u=3*a+c,d=3*a+(c+1)%3;s.fromBufferAttribute(o,u),r.fromBufferAttribute(o,d),Uc(s,r,n)===!0&&(e.push(s.x,s.y,s.z),e.push(r.x,r.y,r.z))}}this.setAttribute("position",new te(e,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}function Uc(i,t,e){const n=`${i.x},${i.y},${i.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${i.x},${i.y},${i.z}`;return e.has(n)===!0||e.has(s)===!0?!1:(e.add(n),e.add(s),!0)}class gx extends Ee{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Wa extends ys{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new Gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Bu,this.normalScale=new qt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Ka,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ml extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class xx extends ml{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Vo=new re,zc=new Q,Nc=new Q;class ih{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qt(512,512),this.map=null,this.mapPass=null,this.matrix=new re,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ol,this._frameExtents=new qt(1,1),this._viewportCount=1,this._viewports=[new ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;zc.setFromMatrixPosition(t.matrixWorld),e.position.copy(zc),Nc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Nc),e.updateMatrixWorld(),Vo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Vo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Fc=new re,Is=new Q,Wo=new Q;class vx extends ih{constructor(){super(new nn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new qt(4,2),this._viewportCount=6,this._viewports=[new ie(2,1,1,1),new ie(0,1,1,1),new ie(3,1,1,1),new ie(1,1,1,1),new ie(3,0,1,1),new ie(1,0,1,1)],this._cubeDirections=[new Q(1,0,0),new Q(-1,0,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,1,0),new Q(0,-1,0)],this._cubeUps=[new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,1,0),new Q(0,0,1),new Q(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Is.setFromMatrixPosition(t.matrixWorld),n.position.copy(Is),Wo.copy(n.position),Wo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Wo),n.updateMatrixWorld(),s.makeTranslation(-Is.x,-Is.y,-Is.z),Fc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fc)}}class _x extends ml{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new vx}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Mx extends ih{constructor(){super(new al(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Oc extends ml{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new Mx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class sh extends fe{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class rh{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Bc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Bc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Bc(){return performance.now()}class Xa extends cx{constructor(t,e,n=1){super(t,e),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}clone(t){const e=super.clone(t);return e.meshPerAttribute=this.meshPerAttribute,e}toJSON(t){const e=super.toJSON(t);return e.isInstancedInterleavedBuffer=!0,e.meshPerAttribute=this.meshPerAttribute,e}}const kc=new re;class Gc{constructor(t,e,n=0,s=1/0){this.ray=new sl(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new rl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return kc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(kc),this}intersectObject(t,e=!0,n=[]){return qa(t,this,n,e),n.sort(Hc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)qa(t[s],this,n,e);return n.sort(Hc),n}}function Hc(i,t){return i.distance-t.distance}function qa(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let o=0,a=r.length;o<a;o++)qa(r[o],t,e,!0)}}const Vc=new Q,Lr=new Q;class yx{constructor(t=new Q,e=new Q){this.start=t,this.end=e}set(t,e){return this.start.copy(t),this.end.copy(e),this}copy(t){return this.start.copy(t.start),this.end.copy(t.end),this}getCenter(t){return t.addVectors(this.start,this.end).multiplyScalar(.5)}delta(t){return t.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(t,e){return this.delta(e).multiplyScalar(t).add(this.start)}closestPointToPointParameter(t,e){Vc.subVectors(t,this.start),Lr.subVectors(this.end,this.start);const n=Lr.dot(Lr);let r=Lr.dot(Vc)/n;return e&&(r=Ve(r,0,1)),r}closestPointToPoint(t,e,n){const s=this.closestPointToPointParameter(t,e);return this.delta(n).multiplyScalar(s).add(this.start)}applyMatrix4(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this}equals(t){return t.start.equals(this.start)&&t.end.equals(this.end)}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);const oh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class zi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Sx=new al(-1,1,1,-1,0,1);class bx extends fe{constructor(){super(),this.setAttribute("position",new te([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new te([0,2,0,0,2,0],2))}}const wx=new bx;class ro{constructor(t){this._mesh=new $t(wx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Sx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Ex extends zi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ee?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=pi.clone(t.uniforms),this.material=new Ee({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new ro(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Wc extends zi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}}class Tx extends zi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Ax{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new qt);this._width=n.width,this._height=n.height,e=new cn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Cn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Ex(oh),this.copyPass.material.blending=Wn,this.clock=new rh}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,r=this.passes.length;s<r;s++){const o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Wc!==void 0&&(o instanceof Wc?n=!0:o instanceof Tx&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new qt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Rx extends zi{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Gt}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}}const Cx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Gt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class xs extends zi{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new qt(t.x,t.y):new qt(256,256),this.clearColor=new Gt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new cn(r,o,{type:Cn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const p=new cn(r,o,{type:Cn});p.texture.name="UnrealBloomPass.h"+d,p.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(p);const h=new cn(r,o,{type:Cn});h.texture.name="UnrealBloomPass.v"+d,h.texture.generateMipmaps=!1,this.renderTargetsVertical.push(h),r=Math.round(r/2),o=Math.round(o/2)}const a=Cx;this.highPassUniforms=pi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ee({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new qt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1),new Q(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const u=oh;this.copyUniforms=pi.clone(u.uniforms),this.blendMaterial=new Ee({uniforms:this.copyUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader,blending:Fe,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Gt,this.oldClearAlpha=1,this.basic=new we,this.fsQuad=new ro(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new qt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=xs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=xs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Ee({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new qt(.5,.5)},direction:{value:new qt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Ee({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}xs.BlurDirectionX=new qt(1,0);xs.BlurDirectionY=new qt(0,1);const Px={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Lx extends zi{constructor(){super();const t=Px;this.uniforms=pi.clone(t.uniforms),this.material=new gx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new ro(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},ne.getTransfer(this._outputColorSpace)===ue&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===bu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===wu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Eu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Tu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Au?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ru&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Dx=512,Ix=2,Ux=.42;class zx extends zi{constructor(t){super(),this.camera=t,this.needsSwap=!0,this.mat=new Ee({uniforms:{tDiffuse:{value:null},tDepth:{value:null},tMask:{value:null},uProjInv:{value:new re},uCam:{value:new re},uW0:{value:new qt},uBg:{value:new Gt(pe.background)},uGhost:{value:Ux},uOn:{value:1},uShroud:{value:1}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }",fragmentShader:`
        uniform sampler2D tDiffuse, tDepth, tMask; uniform mat4 uProjInv, uCam; uniform vec2 uW0; uniform vec3 uBg; uniform float uGhost, uOn, uShroud;
        varying vec2 vUv;
        const float RES = ${Dx.toFixed(1)}; const float K = ${Ix.toFixed(1)};
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
        }`,depthTest:!1,depthWrite:!1}),this.quad=new ro(this.mat)}setMask(t){this.mat.uniforms.tMask.value=t}setWindow(t,e){this.mat.uniforms.uW0.value.set(t,e)}setShroud(t){this.mat.uniforms.uShroud.value=t}setEnabled(t){this.mat.uniforms.uOn.value=t?1:0,this.enabled=!!t}render(t,e,n){const s=this.mat.uniforms;s.tDiffuse.value=n.texture,s.tDepth.value=n.depthTexture,this.camera.updateMatrixWorld(),s.uProjInv.value.copy(this.camera.projectionMatrixInverse),s.uCam.value.copy(this.camera.matrixWorld),t.setRenderTarget(this.renderToScreen?null:e),this.quad.render(t)}dispose(){this.mat.dispose(),this.quad.dispose()}}const Xc=new Dn,Dr=new Q;class oo extends sh{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],e=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],n=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(n),this.setAttribute("position",new te(t,3)),this.setAttribute("uv",new te(e,2))}applyMatrix4(t){const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;return e!==void 0&&(e.applyMatrix4(t),n.applyMatrix4(t),e.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Xa(e,6,1);return this.setAttribute("instanceStart",new ci(n,3,0)),this.setAttribute("instanceEnd",new ci(n,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let e;t instanceof Float32Array?e=t:Array.isArray(t)&&(e=new Float32Array(t));const n=new Xa(e,6,1);return this.setAttribute("instanceColorStart",new ci(n,3,0)),this.setAttribute("instanceColorEnd",new ci(n,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new mx(t.geometry)),this}fromLineSegments(t){const e=t.geometry;return this.setPositions(e.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dn);const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;t!==void 0&&e!==void 0&&(this.boundingBox.setFromBufferAttribute(t),Xc.setFromBufferAttribute(e),this.boundingBox.union(Xc))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mi),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,e=this.attributes.instanceEnd;if(t!==void 0&&e!==void 0){const n=this.boundingSphere.center;this.boundingBox.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Dr.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Dr)),Dr.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Dr));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}Nt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new qt(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ke.line={uniforms:pi.merge([Nt.common,Nt.fog,Nt.line]),vertexShader:`
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
		`};class ao extends Ee{static get type(){return"LineMaterial"}constructor(t){super({uniforms:pi.clone(Ke.line.uniforms),vertexShader:Ke.line.vertexShader,fragmentShader:Ke.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Xo=new ie,qc=new Q,Yc=new Q,De=new ie,Ie=new ie,yn=new ie,qo=new Q,Yo=new re,ze=new yx,$c=new Q,Ir=new Dn,Ur=new mi,Sn=new ie;let Tn,Di;function jc(i,t,e){return Sn.set(0,0,-t,1).applyMatrix4(i.projectionMatrix),Sn.multiplyScalar(1/Sn.w),Sn.x=Di/e.width,Sn.y=Di/e.height,Sn.applyMatrix4(i.projectionMatrixInverse),Sn.multiplyScalar(1/Sn.w),Math.abs(Math.max(Sn.x,Sn.y))}function Nx(i,t){const e=i.matrixWorld,n=i.geometry,s=n.attributes.instanceStart,r=n.attributes.instanceEnd,o=Math.min(n.instanceCount,s.count);for(let a=0,l=o;a<l;a++){ze.start.fromBufferAttribute(s,a),ze.end.fromBufferAttribute(r,a),ze.applyMatrix4(e);const c=new Q,u=new Q;Tn.distanceSqToSegment(ze.start,ze.end,u,c),u.distanceTo(c)<Di*.5&&t.push({point:u,pointOnLine:c,distance:Tn.origin.distanceTo(u),object:i,face:null,faceIndex:a,uv:null,uv1:null})}}function Fx(i,t,e){const n=t.projectionMatrix,r=i.material.resolution,o=i.matrixWorld,a=i.geometry,l=a.attributes.instanceStart,c=a.attributes.instanceEnd,u=Math.min(a.instanceCount,l.count),d=-t.near;Tn.at(1,yn),yn.w=1,yn.applyMatrix4(t.matrixWorldInverse),yn.applyMatrix4(n),yn.multiplyScalar(1/yn.w),yn.x*=r.x/2,yn.y*=r.y/2,yn.z=0,qo.copy(yn),Yo.multiplyMatrices(t.matrixWorldInverse,o);for(let p=0,h=u;p<h;p++){if(De.fromBufferAttribute(l,p),Ie.fromBufferAttribute(c,p),De.w=1,Ie.w=1,De.applyMatrix4(Yo),Ie.applyMatrix4(Yo),De.z>d&&Ie.z>d)continue;if(De.z>d){const b=De.z-Ie.z,v=(De.z-d)/b;De.lerp(Ie,v)}else if(Ie.z>d){const b=Ie.z-De.z,v=(Ie.z-d)/b;Ie.lerp(De,v)}De.applyMatrix4(n),Ie.applyMatrix4(n),De.multiplyScalar(1/De.w),Ie.multiplyScalar(1/Ie.w),De.x*=r.x/2,De.y*=r.y/2,Ie.x*=r.x/2,Ie.y*=r.y/2,ze.start.copy(De),ze.start.z=0,ze.end.copy(Ie),ze.end.z=0;const x=ze.closestPointToPointParameter(qo,!0);ze.at(x,$c);const m=kn.lerp(De.z,Ie.z,x),f=m>=-1&&m<=1,S=qo.distanceTo($c)<Di*.5;if(f&&S){ze.start.fromBufferAttribute(l,p),ze.end.fromBufferAttribute(c,p),ze.start.applyMatrix4(o),ze.end.applyMatrix4(o);const b=new Q,v=new Q;Tn.distanceSqToSegment(ze.start,ze.end,v,b),e.push({point:v,pointOnLine:b,distance:Tn.origin.distanceTo(v),object:i,face:null,faceIndex:p,uv:null,uv1:null})}}}class gl extends $t{constructor(t=new oo,e=new ao({color:Math.random()*16777215})){super(t,e),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,e=t.attributes.instanceStart,n=t.attributes.instanceEnd,s=new Float32Array(2*e.count);for(let o=0,a=0,l=e.count;o<l;o++,a+=2)qc.fromBufferAttribute(e,o),Yc.fromBufferAttribute(n,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+qc.distanceTo(Yc);const r=new Xa(s,2,1);return t.setAttribute("instanceDistanceStart",new ci(r,1,0)),t.setAttribute("instanceDistanceEnd",new ci(r,1,1)),this}raycast(t,e){const n=this.material.worldUnits,s=t.camera;s===null&&!n&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;Tn=t.ray;const o=this.matrixWorld,a=this.geometry,l=this.material;Di=l.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Ur.copy(a.boundingSphere).applyMatrix4(o);let c;if(n)c=Di*.5;else{const d=Math.max(s.near,Ur.distanceToPoint(Tn.origin));c=jc(s,d,l.resolution)}if(Ur.radius+=c,Tn.intersectsSphere(Ur)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Ir.copy(a.boundingBox).applyMatrix4(o);let u;if(n)u=Di*.5;else{const d=Math.max(s.near,Ir.distanceToPoint(Tn.origin));u=jc(s,d,l.resolution)}Ir.expandByScalar(u),Tn.intersectsBox(Ir)!==!1&&(n?Nx(this,e):Fx(this,s,e))}onBeforeRender(t){const e=this.material.uniforms;e&&e.resolution&&(t.getViewport(Xo),this.material.uniforms.resolution.value.set(Xo.z,Xo.w))}}const Ox=.38,Bx=4.4,zr=3,ni=3.2,Ys=i=>.05+i*.18,Ne=i=>i?Ys(i.clearance):.05,Gn=.05+3*.18+Bx,kx=i=>i.solid?Gn:Ys(i.clearance),Gx=Gn,Qt={FLOOR:0,TILES:1,SOLIDS:2,BORDERS:3,FOOT:4,CREST:5,SECTOR:6,GLOW:20,CURTAIN:21,BEAM:22,GATE_LIGHT:23,TRAIL:25,HL_FILL:30,HL_OUTLINE:31,MARKERS:32,CURSOR:33,MOTES:40};function ah(i){return i.depthTest=!0,i.depthWrite=!1,i.polygonOffset=!0,i.polygonOffsetFactor=-2,i.polygonOffsetUnits=-2,i}function He(i,{depthTest:t=!0,offset:e=-1}={}){return i.transparent=!0,i.depthWrite=!1,i.depthTest=t,e&&!i.polygonOffset&&(i.polygonOffset=!0,i.polygonOffsetFactor=e,i.polygonOffsetUnits=e),i}let Us=null;function Hx(){if(Us)return Us;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.55)"),e.addColorStop(.6,"rgba(255,255,255,0.14)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Us=new nh(i),Us.colorSpace=en,Us}const Qr=4;function Vx(){const i={value:Array.from({length:Qr},()=>new ie(0,0,0,0))},t=new Q;return{uniform:i,update(e,n){for(let s=0;s<Qr;s++){const r=n[s];if(!r||!(r.r>0)){i.value[s].set(0,0,0,0);continue}t.set(r.x,r.y,r.z).applyMatrix4(e.matrixWorldInverse),i.value[s].set(t.x,t.y,t.z,r.r)}}}}const lh=`
uniform vec4 uCut[${Qr}];
uniform float uMinVis;
varying vec3 vCutPos;
float cutVisibility(vec3 vp) {
  float vis = 1.0;
  for (int i = 0; i < ${Qr}; i++) {
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
`,ch="{ float cv = mix(uMinVis, 1.0, cutVisibility(vCutPos)); if (cv < cutDither()) discard; }";function Wx(i,t,{minVis:e=.08,stripes:n=!1}={}){return i.onBeforeCompile=s=>{s.uniforms.uCut=t.uniform,s.uniforms.uMinVis={value:e},s.vertexShader=s.vertexShader.replace("void main() {",`varying vec3 vCutPos;
varying float vWY;
void main() {`).replace("#include <project_vertex>",`#include <project_vertex>
vCutPos = mvPosition.xyz;
vWY = transformed.y;`),s.fragmentShader=s.fragmentShader.replace("void main() {",`varying float vWY;
${lh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${ch}`),n&&(s.fragmentShader=s.fragmentShader.replace("#include <color_fragment>",`#include <color_fragment>
         float sy = abs(fract(vWY * 0.45) - 0.5);
         diffuseColor.rgb *= 1.0 + 1.1 * smoothstep(0.06, 0.0, sy);`))},i.customProgramCacheKey=()=>`solid-cut-${n}`,i}function Xx(i,t,{minVis:e=.22}={}){return i.uniforms.uCut=t.uniform,i.uniforms.uMinVis={value:e},i.vertexShader=i.vertexShader.replace("void main() {",`varying vec3 vCutPos;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
vCutPos = ( position.y < 0.5 ? start : end ).xyz;`),i.fragmentShader=i.fragmentShader.replace("void main() {",`${lh}
void main() {`).replace("#include <clipping_planes_fragment>",`#include <clipping_planes_fragment>
${ch}`),i.needsUpdate=!0,i}const uh=.005;function qx(i,t=uh){return i.uniforms.uPull={value:1-t},i.vertexShader=i.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );",`vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );
start.xyz *= uPull; end.xyz *= uPull;`),i.needsUpdate=!0,i}function hh(i,t=uh){const e=i.onBeforeCompile;return i.onBeforeCompile=(n,s)=>{e==null||e(n,s),n.uniforms.uPull={value:1-t},n.vertexShader=n.vertexShader.replace("void main() {",`uniform float uPull;
void main() {`).replace("#include <project_vertex>",`
        vec4 mvPosition = vec4( transformed, 1.0 );
        mvPosition = modelViewMatrix * mvPosition;
        mvPosition.xyz *= uPull;
        gl_Position = projectionMatrix * mvPosition;`)},i.customProgramCacheKey=()=>"pull",i}function Yx(i,t,{dashed:e=!1}={}){const n=new oo;n.setPositions(new Float32Array(t*6));const s=new gl(n,i);e&&s.computeLineDistances();const r=n.attributes.instanceStart.data,o=e?n.attributes.instanceDistanceStart.data:null;return n.instanceCount=0,s.frustumCulled=!1,s.visible=!1,{line:s,set(a){const l=Math.min(Math.floor(a.length/6),t);for(let c=0;c<l*6;c++)r.array[c]=a[c];if(r.needsUpdate=!0,o){let c=0;for(let u=0;u<l;u++){const d=u*6,p=Math.hypot(a[d+3]-a[d],a[d+4]-a[d+1],a[d+5]-a[d+2]);o.array[u*2]=c,o.array[u*2+1]=c+p,c+=p}o.needsUpdate=!0}n.instanceCount=l,s.visible=l>0}}}function $o(i){const t=[],e=[],n=new re,s=new Ui,r=new Q(1,1,1),o=new Gt;for(const l of i){const c=new Rn(l.w,l.h,l.d).toNonIndexed();s.setFromAxisAngle(new Q(0,1,0),l.rot??0),n.compose(new Q(l.x,l.y,l.z),s,r),c.applyMatrix4(n),o.set(l.color).multiplyScalar(l.k??1);const u=c.getAttribute("position");for(let d=0;d<u.count;d++)t.push(u.getX(d),u.getY(d),u.getZ(d)),e.push(o.r,o.g,o.b);c.dispose()}const a=new fe;return a.setAttribute("position",new te(t,3)),a.setAttribute("color",new te(e,3)),a}const Ya=i=>{var t;return((t=i.cut)==null?void 0:t.poly)??i.poly},Kc=160;function fh({group:i,lineMats:t}){const e=({hex:n,fill:s,width:r,pulse:o})=>{const a=new fe,l=new Float32Array(Kc*9);a.setAttribute("position",new _e(l,3)),a.setDrawRange(0,0);const c=hh(He(new we({color:new Gt(n),opacity:s,transparent:!0,side:ve,toneMapped:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}))),u=new $t(a,c);u.renderOrder=Qt.HL_FILL,u.frustumCulled=!1,u.visible=!1;const d=qx(He(new ao({color:new Gt(n).multiplyScalar(1.8),linewidth:r,worldUnits:!1,transparent:!0})));t.push(d);const p=Yx(d,320),h=p.line;h.renderOrder=Qt.HL_OUTLINE,i.add(u,h);let g=null,x=s;return{get cell(){return g},set(m,{blocked:f=!1}={}){if(!m){g=null,u.visible=h.visible=!1;return}g=m;const S=new Gt(f?pe.blocked:n);c.color.copy(S),d.color.copy(S).multiplyScalar(1.8);const b=m.solid?Ya(m):m.poly,v=b.length,T=Ne(m),_=[],w=[],E=(M,A,G)=>w.push(...M,...A,...G);if(m.solid){const M=Gn;for(let A=0;A<v;A++){const G=b[A],H=b[(A+1)%v];E([m.cx,M+.03,m.cz],[G[0],M+.03,G[1]],[H[0],M+.03,H[1]]),E([G[0],T,G[1]],[H[0],T,H[1]],[H[0],M,H[1]]),E([G[0],T,G[1]],[H[0],M,H[1]],[G[0],M,G[1]]),_.push(G[0],M+.05,G[1],H[0],M+.05,H[1]),_.push(G[0],T+.06,G[1],H[0],T+.06,H[1]),_.push(G[0],T+.06,G[1],G[0],M+.05,G[1])}}else{const M=T+.03,A=T+.06;for(let G=0;G<v;G++){const H=b[G],j=b[(G+1)%v];E([m.cx,M,m.cz],[H[0],M,H[1]],[j[0],M,j[1]]),_.push(H[0],A,H[1],j[0],A,j[1])}}const y=Math.min(w.length/9,Kc);l.set(w.slice(0,y*9)),a.getAttribute("position").needsUpdate=!0,a.setDrawRange(0,y*3),p.set(_),u.visible=h.visible=!0,x=f?Math.max(s,.3):s},tick(m){g&&o?c.opacity=x*(.78+.22*Math.sin(m*4.5)):c.opacity=x}}};return{hover:e({hex:pe.hover,fill:.26,width:2.6,pulse:!0}),select:e({hex:pe.select,fill:.3,width:3.6,pulse:!1})}}function dh(i){const t=new Ee({fog:!0,uniforms:pi.merge([Nt.fog,{uBase:{value:new Gt(pe.floor)},uFocus:{value:new qt(0,0)}}]),vertexShader:`#include <fog_pars_vertex>
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
      }`}),e=new $t(new Ss(900,900),t);return e.rotation.x=-Math.PI/2,e.position.y=-.05,e.renderOrder=Qt.FLOOR,i.add(e),{floor:e,floorMat:t}}const jo=new WeakMap,Zc=i=>`${Math.round(i[0]*20)},${Math.round(i[1]*20)}`;function $x(i){var n;if((n=i.sectorEdges)!=null&&n.length)return i.sectorEdges;if(jo.has(i))return jo.get(i);const t=new Map;for(const s of i.cells){const r=s.poly.length;for(let o=0;o<r;o++){const a=s.poly[o],l=s.poly[(o+1)%r],c=Zc(a),u=Zc(l),d=c<u?`${c}|${u}`:`${u}|${c}`,p=t.get(d);p?p.sb=s.sector:t.set(d,{a,b:l,sa:s.sector,sb:null})}}const e=[];for(const s of t.values())s.sb===null?e.push({a:s.a,b:s.b,sa:s.sa,sb:-1}):s.sb!==s.sa&&e.push(s);return jo.set(i,e),e}function Jc(i,t){var s,r;const e=((s=i.sectors[t.sa])==null?void 0:s.clearance)??0,n=t.sb>=0?((r=i.sectors[t.sb])==null?void 0:r.clearance)??0:0;return Math.max(e,n)}const Qc=i=>`${Math.round(i[0]*1e6)},${Math.round(i[1]*1e6)}`,Li=(i,t)=>Mu(i,t);function jx(i,t){var g;const e=(g=i.span)!=null&&g.length?i.span.flatMap(x=>[x.a,x.b]):[i.edge.a,i.edge.b];let n=e[0],s=e[e.length-1],r=-1;for(let x=0;x<e.length;x++)for(let m=x+1;m<e.length;m++){const f=(e[x][0]-e[m][0])**2+(e[x][1]-e[m][1])**2;f>r&&(r=f,n=e[x],s=e[m])}const o=Math.sqrt(r)||i.len,a=(s[0]-n[0])/o,l=(s[1]-n[1])/o,c=[(n[0]+s[0])/2,(n[1]+s[1])/2];let u=-l,d=a;const p=t(i.a),h=t(i.b);return(h.cx-p.cx)*u+(h.cz-p.cz)*d<0&&(u=-u,d=-d),{s:n,e:s,mid:c,len:o,ax:a,az:l,nx:u,nz:d}}function Kx(i){const t=new Set;for(const e of i)if(!e.locked)for(const n of e.span??[])t.add(Li(n.a,n.b));return t}function Zx(i,t=[]){const e=Kx(i);for(const n of t)if(!n.locked)for(const s of n.edges)e.add(Li(s.a,s.b));return e}const Jx=(i,t)=>!!(i.open||i.gap||t.has(Li(i.a,i.b))),hi=Object.freeze({minLen:.3,flat:.002,same:1e-4,endTol:1e-5}),Vn=(i,t)=>Math.hypot(i[0]-t[0],i[1]-t[1]),zs=i=>`${Math.round(i[0]*1e7)},${Math.round(i[1]*1e7)}`,Qx=(i,t)=>{const e=`${Math.round(i[0]/hi.same)},${Math.round(i[1]/hi.same)}`,n=`${Math.round(t[0]/hi.same)},${Math.round(t[1]/hi.same)}`;return e<n?`${e}|${n}`:`${n}|${e}`};function Ko(i,t,e){const n=Vn(t,e);return n<1e-9?Vn(i,t):Math.abs((e[0]-t[0])*(t[1]-i[1])-(t[0]-i[0])*(e[1]-t[1]))/n}function tv(i,t,e=hi.minLen,n=hi.flat){let s=[];for(const p of i)(!s.length||Vn(p,s[s.length-1])>1e-6)&&s.push(p);t&&s.length>1&&Vn(s[0],s[s.length-1])<=1e-6&&s.pop();const r=t?3:2,o={merged:0,fused:0},a=()=>s.length,l=p=>(p-1+a())%a(),c=p=>(p+1)%a(),u=p=>t||p>0&&p<a()-1;for(let p=0;p<4096&&a()>=r;p++){let h=-1;for(let g=0;g<a()&&h<0;g++){if(!u(g))continue;const x=s[l(g)],m=s[c(g)],f=s[g],S=(m[0]-x[0])*(f[0]-x[0])+(m[1]-x[1])*(f[1]-x[1]);Ko(f,x,m)<n&&S>0&&S<(m[0]-x[0])**2+(m[1]-x[1])**2&&(h=g,o.merged++)}if(h<0){let g=-1,x=e;const m=t?a():a()-1;for(let f=0;f<m;f++){const S=Vn(s[f],s[c(f)]);S<x&&(x=S,g=f)}if(g>=0){const f=g,S=c(g),b=[];if(u(f)&&b.push([Ko(s[f],s[l(f)],s[S]),f]),u(S)&&b.push([Ko(s[S],s[f],s[c(S)]),S]),!b.length)return null;b.sort((v,T)=>v[0]-T[0]),h=b[0][1],o.fused++}}if(h<0)break;s=s.filter((g,x)=>x!==h)}if(a()<r)return null;let d=0;for(let p=0;p<(t?a():a()-1);p++)d+=Vn(s[p],s[c(p)]);return d<e?null:Object.assign(s,{stats:o})}function ev(i){const t=new Map;i.forEach((r,o)=>{for(const a of[r.a,r.b]){const l=zs(a);t.has(l)||t.set(l,[]),t.get(l).push(o)}});const e=new Uint8Array(i.length),n=[],s=(r,o)=>{const a=[r];let l=zs(r),c=o;for(;;){e[c]=1;const u=i[c],d=zs(u.a)===l?u.b:u.a;a.push(d),l=zs(d);const p=t.get(l).filter(h=>!e[h]);if(t.get(l).length!==2||!p.length)break;c=p[0]}return a};for(const[r,o]of t)if(o.length!==2){for(const a of o)if(!e[a]){const l=i[a];n.push({pts:s(zs(l.a)===r?l.a:l.b,a),closed:!1})}}for(let r=0;r<i.length;r++)e[r]||n.push({pts:s(i[r].a,r),closed:!0});return n}function nv(i,t=null,e=null){const n=[],s=[],r=new Set,o={chains:0,merged:0,fused:0,duplicate:0};let a=i.sectorLines;if(!a){const l=(i.sectorEdges??[]).filter(u=>!(e&&t&&e(u,t))),c=new Map;for(const u of l){const d=`${u.sa}|${u.sb}`;c.has(d)||c.set(d,{sa:u.sa,sb:u.sb,edges:[]}),c.get(d).edges.push(u)}a=[];for(const u of c.values())for(const d of ev(u.edges))a.push({...d,sa:u.sa,sb:u.sb,caps:d.closed?[]:["junction","junction"]})}for(const l of a){const c=tv(l.pts,!!l.closed);if(!c){o.chains++;continue}o.merged+=c.stats.merged,o.fused+=c.stats.fused;const u={pts:[...c],closed:!!l.closed,sa:l.sa,sb:l.sb,caps:l.caps??[],fence:!!l.fence},d=u.closed?c.length:c.length-1,p=[];for(let h=0;h<d;h++){const g=c[h],x=c[(h+1)%c.length],m=Qx(g,x);if(r.has(m)){o.duplicate++;continue}r.add(m),p.push({a:g,b:x,sa:l.sa,sb:l.sb})}p.length&&(n.push(u),s.push(...p))}return{runs:n,segments:s,dropped:o}}function iv(i,t){for(const e of i){if(e.closed||e.sa!==t.sa||e.sb!==t.sb)continue;const n=[e.pts[0],e.pts[e.pts.length-1]];for(const[s,r]of n.entries())if(e.caps[s]!=="junction"&&(Vn(r,t.start)<hi.endTol||Vn(r,t.end)<hi.endTol))return!0}return!1}function sv(i,t,e,n){const s=n?i.filter(n):i;if(!t)return s;const r=new Map;for(const o of t)o.kind!=="gap"&&r.set(`${o.sa}|${o.sb}|${o.slot}`,o);return s.filter(o=>{if(o.locked)return!0;const a=r.get(`${o.sa}|${o.sb}|${o.slot}`);return!!a&&iv(e,a)})}const tu=Object.freeze({spacing:5,minGap:1.2});function rv(i,t={}){const e=t.spacing??tu.spacing,n=t.minGap??tu.minGap,s=[];return i.forEach((r,o)=>{if(!r.fence)return;const a=r.closed?[...r.pts,r.pts[0]]:r.pts,l=[0];for(let h=1;h<a.length;h++)l.push(l[h-1]+Vn(a[h-1],a[h]));const c=l[l.length-1];if(!(c>0))return;const u=h=>{let g=1;for(;g<l.length-1&&l[g]<h;)g++;const x=(h-l[g-1])/(l[g]-l[g-1]||1);return[a[g-1][0]+(a[g][0]-a[g-1][0])*x,a[g-1][1]+(a[g][1]-a[g-1][1])*x]},d=Math.max(1,Math.round(c/e)),p=h=>!r.closed&&r.caps[h]==="opening";for(let h=0;h<=d&&!(r.closed&&h===d);h++){const g=!r.closed&&(h===0||h===d);if(g&&!p(h===0?0:1))continue;const x=h/d*c;!g&&!r.closed&&(x<n&&p(0)||c-x<n&&p(1))||s.push({p:u(x),kind:g?"end":"mid",run:o,at:x})}}),s}const lo=.38,ov=1.8,eu=Object.freeze({glow:.65,curtain:.8}),av=i=>i>.001?Math.min(ov,i/lo):0;function nu(i,t,e){if(!i)return;const n=av(e);i.opacity=Math.min(1,t*n),i.visible=n>0}function ph(i,{cut:t,chunk:e=null}){var At,q;const n=new We,s=e?e.lineMats:[],r=[],o=new Gt,a=(e==null?void 0:e.glowRef)??{v:lo},l=[],c=(P,N)=>{l.push([P,N]),nu(P,N,a.v)},u=(P,N)=>{if(!e)return N();let Y=e.shared.get(P);return Y||e.shared.set(P,Y=N()),Y},d=P=>i.cellById?i.cellById(P):i.cells[P],p=new Set(i.cells);let h=(e==null?void 0:e.shows)??null;const g=new Map(i.gates.map(P=>[P,jx(P,d)])),x=new Map;for(const P of i.edgeCells??i.cells){const N=P.poly.length;for(let Y=0;Y<N;Y++){const at=P.poly[Y],ot=P.poly[(Y+1)%N],Mt=Li(at,ot),wt=x.get(Mt)??{a:at,b:ot,cells:[],bandMax:0,solid:0};wt.cells.push(P),wt.bandMax=Math.max(wt.bandMax,P.clearance),P.solid&&wt.solid++,x.set(Mt,wt)}}const m=Zx(i.gates,i.sectorOpenings),f=e?null:dh(n).floorMat,S=[],b=new Map;for(const P of i.edgeCells??i.cells){if(!P.solid)continue;const N=Ya(P),Y=N.length;for(let at=0;at<Y;at++){const ot=N[at],Mt=N[(at+1)%Y],wt=x.get(Li(ot,Mt));if(wt&&wt.solid>1)continue;const Ft=Mt[0]-ot[0],It=Mt[1]-ot[1],kt=Math.hypot(Ft,It);if(kt<1e-4)continue;let Yt=It/kt,se=-Ft/kt;((ot[0]+Mt[0])/2-P.cx)*Yt+((ot[1]+Mt[1])/2-P.cz)*se<0&&(Yt=-Yt,se=-se);const me=wt==null?void 0:wt.cells.find(un=>un!==P&&!un.solid),Oe={c:P,a:ot,b:Mt,nx:Yt,nz:se,y0:Ne(me??P),na:null,nb:null};p.has(P)&&S.push(Oe);for(const un of[ot,Mt]){const Ni=Qc(un);(b.get(Ni)??b.set(Ni,[]).get(Ni)).push([Yt,se])}}}const v=(P,N,Y)=>{let at=0,ot=0;for(const[wt,Ft]of b.get(Qc(P)))wt*N+Ft*Y>.6&&(at+=wt,ot+=Ft);const Mt=Math.hypot(at,ot)||1;return[at/Mt,ot/Mt]};for(const P of S)P.na=v(P.a,P.nx,P.nz),P.nb=v(P.b,P.nx,P.nz);const T=[],_=[],w=[],E=[],y=[],M=[],A=[],G=[],H=(P,N,Y,at,ot,Mt,wt)=>{P.push(Y,at,ot),N.push(Mt.r*wt,Mt.g*wt,Mt.b*wt)},j=new Map;for(const P of S)(j.get(P.c.id)??j.set(P.c.id,[]).get(P.c.id)).push(P);for(const P of i.cells){const N=Ne(P),Y=new Gt(gi[P.clearance]),at=Rh(P.id);if(P.solid){if((q=(At=P.cut)==null?void 0:At.open)!=null&&q.length){const It=T.length/3;for(const kt of P.cut.open){let Yt=0,se=0;for(const me of kt)Yt+=me[0],se+=me[1];Yt/=kt.length,se/=kt.length;for(let me=0;me<kt.length;me++){const Oe=kt[me],un=kt[(me+1)%kt.length];H(T,_,Yt,N,se,Y,.16),H(T,_,Oe[0],N,Oe[1],Y,.08),H(T,_,un[0],N,un[1],Y,.08)}}G[P.id]={start:It,count:T.length/3-It}}const ot=Ya(P),Mt=ot.length,wt=w.length/3,Ft=(It,kt,Yt)=>{H(w,E,It,Gn,kt,Y,Yt),y.push(0,1,0)};for(let It=0;It<Mt;It++){const kt=ot[It],Yt=ot[(It+1)%Mt];Ft(P.cx,P.cz,.05+.03*at),Ft(kt[0],kt[1],.1),Ft(Yt[0],Yt[1],.1)}for(const It of j.get(P.id)??[]){const kt=(Yt,se,me,Oe)=>{H(w,E,Yt[0],me,Yt[1],Y,Oe),y.push(se[0],0,se[1])};kt(It.a,It.na,It.y0,.62),kt(It.b,It.nb,It.y0,.62),kt(It.b,It.nb,Gn,.16),kt(It.a,It.na,It.y0,.62),kt(It.b,It.nb,Gn,.16),kt(It.a,It.na,Gn,.16)}A[P.id]={start:wt,count:w.length/3-wt}}else{const ot=P.poly.length,Mt=Math.max(.5,1-Ox/Math.max(P.radius,1)),wt=P.poly.map(([Yt,se])=>[P.cx+(Yt-P.cx)*Mt,P.cz+(se-P.cz)*Mt]),Ft=.2+.1*at,It=.07+.05*at,kt=T.length/3;for(let Yt=0;Yt<ot;Yt++){const se=wt[Yt],me=wt[(Yt+1)%ot];H(T,_,P.cx,N,P.cz,Y,Ft),H(T,_,se[0],N,se[1],Y,It),H(T,_,me[0],N,me[1],Y,It)}M[P.id]={start:kt,count:T.length/3-kt}}}const tt=Float32Array.from(_),k=Float32Array.from(E),z=(P,N,Y,at,ot)=>{const Mt=new fe;Mt.setAttribute("position",new te(P,3)),Mt.setAttribute("color",new te(N,3)),Y?Mt.setAttribute("normal",new te(Y,3)):Mt.computeVertexNormals();const wt=new $t(Mt,at);return wt.renderOrder=ot,n.add(wt),wt},B=new Array(T.length).fill(0).map((P,N)=>N%3===1?1:0),Z=z(T,_,B,u("tiles",()=>new Wa({vertexColors:!0,side:ve,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})),Qt.TILES),nt=w.length?z(w,E,y,u("walls",()=>Wx(new Wa({vertexColors:!0,side:ve,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1}),t,{minVis:.07,stripes:!0})),Qt.SOLIDS):null,xt=(P,N,Y,at,{cutaway:ot=!1,minVis:Mt=.25}={})=>{if(!P.length)return null;const wt=new oo;wt.setPositions(P),wt.setColors(N);const Ft=u(`line${Y}|${ot}|${Mt}`,()=>{const kt=ah(new ao({vertexColors:!0,linewidth:Y,worldUnits:!1,fog:!0}));return ot&&Xx(kt,t,{minVis:Mt}),s.push(kt),kt}),It=new gl(wt,Ft);return It.renderOrder=at,It.frustumCulled=!1,n.add(It),It},Rt=(P,N,Y,at,ot,Mt,wt)=>{P.push(Y[0],ot,Y[1],at[0],Mt,at[1]),N.push(wt.r,wt.g,wt.b,wt.r,wt.g,wt.b)},Lt=$x(i),lt=new Set(Lt.map(P=>Li(P.a,P.b))),bt=[],Pt=[];for(const P of x.values()){if(P.solid||P.cells.length<2||P.cells[0].sector!==P.cells[1].sector||!p.has(P.cells[0])||lt.has(Li(P.a,P.b)))continue;o.set(gi[P.bandMax]).multiplyScalar(.9);const N=Ys(P.bandMax)+.02;Rt(bt,Pt,P.a,P.b,N,N,o)}const yt=[],Dt=[],L=[],X=[];for(const P of S){const N=P.c.clearance;o.set(gi[N]).multiplyScalar(1.7),Rt(yt,Dt,P.a,P.b,Gn+.02,Gn+.02,o),o.set(gi[N]).multiplyScalar(1),Rt(L,X,P.a,P.b,P.y0+.03,P.y0+.03,o)}const et=[],st=[],pt=[],V=[],zt=[],vt=nv(i,m,Jx);for(const P of vt.segments){const N=Jc(i,P),Y=Ys(N)+.06;o.set(gi[N]);const at=o.clone(),ot=P.a,Mt=P.b;Rt(pt,V,ot,Mt,Y,Y,o.clone().multiplyScalar(1.9)),Rt(et,st,ot,Mt,Y+zr,Y+zr,o.clone().multiplyScalar(1.5)),zt.push({a:ot,b:Mt,base:Y,col:at})}if(xt(bt,Pt,1.1,Qt.BORDERS),xt(L,X,1.5,Qt.FOOT),xt(yt,Dt,2.8,Qt.CREST,{cutaway:!0,minVis:.3}),xt(pt,V,3.4,Qt.SECTOR),xt(et,st,2,Qt.SECTOR,{cutaway:!0,minVis:.3}),zt.length){const P=[],N=[];for(const ot of zt){const{a:Mt,b:wt,base:Ft,col:It}=ot,kt=Ft+zr,Yt=(se,me,Oe)=>{P.push(se[0],me,se[1]),N.push(It.r,It.g,It.b,Oe)};Yt(Mt,Ft,.34),Yt(wt,Ft,.34),Yt(wt,kt,0),Yt(Mt,Ft,.34),Yt(wt,kt,0),Yt(Mt,kt,0)}const Y=new fe;Y.setAttribute("position",new te(P,3)),Y.setAttribute("color",new te(N,4));const at=new $t(Y,u("curtain",()=>He(new we({vertexColors:!0,transparent:!0,blending:Fe,side:ve,toneMapped:!1}))));c(at.material,eu.curtain),at.renderOrder=Qt.CURTAIN,at.frustumCulled=!1,n.add(at)}{const P=[];for(const N of rv(vt.runs)){const Y=vt.runs[N.run],at=Jc(i,Y),ot=Ys(at)+.06,Mt=N.kind==="end",wt=zr+(Mt?.9:.35),Ft=Mt?.4:.22;o.set(gi[at]),P.push({x:N.p[0],y:ot+wt/2,z:N.p[1],w:Ft,h:wt,d:Ft,color:o.getHex(),k:Mt?1.8:1.3}),Mt&&P.push({x:N.p[0],y:ot+wt+.12,z:N.p[1],w:.5,h:.5,d:.5,rot:Math.PI/4,color:16777215,k:1.2})}if(P.length){const N=new $t($o(P),u("fencePosts",()=>{const Y=He(new we({toneMapped:!1,blending:Fe,transparent:!0}));return Y.vertexColors=!0,Y}));N.renderOrder=Qt.GATE_LIGHT,N.frustumCulled=!1,n.add(N)}}const Tt=[],Et=[],Bt=[],ht=(P,N,Y,at,ot,Mt,wt)=>{Tt.push(P,N,Y),Et.push(at.r,at.g,at.b,ot),Bt.push(Mt,wt)},I=(P,N,Y,at,ot,Mt,wt)=>{ht(P-Y,ot,N-at,Mt,wt,0,0),ht(P+Y,ot,N-at,Mt,wt,1,0),ht(P+Y,ot,N+at,Mt,wt,1,1),ht(P-Y,ot,N-at,Mt,wt,0,0),ht(P+Y,ot,N+at,Mt,wt,1,1),ht(P-Y,ot,N+at,Mt,wt,0,1)},C=1.7;for(const P of S){const N=P.y0+.04;o.set(gi[P.c.clearance]);const Y=[P.a[0]+P.na[0]*C,P.a[1]+P.na[1]*C],at=[P.b[0]+P.nb[0]*C,P.b[1]+P.nb[1]*C];ht(P.a[0],N,P.a[1],o,.42,.5,.5),ht(P.b[0],N,P.b[1],o,.42,.5,.5),ht(at[0],N,at[1],o,0,.5,.5),ht(P.a[0],N,P.a[1],o,.42,.5,.5),ht(at[0],N,at[1],o,0,.5,.5),ht(Y[0],N,Y[1],o,0,.5,.5)}const R=(P,N,Y,at)=>I(P.cx,P.cz,Y,Y,Ne(P)+.045,new Gt(N),at),U=sv(i.gates,i.sectorOpenings,vt.runs,i.drawsGate);for(const P of U){if(P.soft&&!P.locked)continue;const N=d(P.a);I(g.get(P).mid[0],g.get(P).mid[1],4.2,4.2,Ne(N)+.045,new Gt(P.locked?pe.gateLocked:pe.gateOpen),P.locked?.6:.38)}for(const P of i.cells)P.cache&&R(P,P.payload?16751162:8256767,P.payload?5:2.6,P.payload?.5:.28);const $=i.beacons??[[i.startCell,pe.ally,0,2.4,.5],[i.pivotCell,10509567,7,2.2,.5],[i.vaultCell,16742938,14,3,.6]];for(const[P,N,,Y,at]of $)R(P,N,Y*2.6,at*.5);{const P=new fe;P.setAttribute("position",new te(Tt,3)),P.setAttribute("color",new te(Et,4)),P.setAttribute("uv",new te(Bt,2));const N=new $t(P,u("glow",()=>He(new we({map:Hx(),vertexColors:!0,transparent:!0,blending:Fe,side:ve,toneMapped:!1}))));c(N.material,eu.glow),N.renderOrder=Qt.GLOW,N.frustumCulled=!1,n.add(N)}const W=P=>{const{mid:N,len:Y,ax:at,az:ot}=g.get(P),Mt=Ne(d(P.a)),wt=Y/2,Ft=Math.atan2(-ot,at);return[{x:N[0]+at*wt,y:Mt+ni/2,z:N[1]+ot*wt,w:.34,h:ni,d:.34,color:16777215},{x:N[0]-at*wt,y:Mt+ni/2,z:N[1]-ot*wt,w:.34,h:ni,d:.34,color:16777215},{x:N[0],y:Mt+ni,z:N[1],w:Y+.34,h:.26,d:.26,rot:Ft,color:16777215}]},St=(P,N)=>He(new we({color:new Gt(P).multiplyScalar(N),toneMapped:!1,blending:Fe,transparent:!0})),ct=[],mt=[];for(const P of U)(P.locked||!P.soft)&&(P.locked?mt:ct).push(...W(P));if(ct.length){const P=new $t($o(ct),St(pe.gateOpen,.85));P.material.vertexColors=!0,P.renderOrder=Qt.GATE_LIGHT,P.frustumCulled=!1,n.add(P)}if(mt.length){const P=new $t($o(mt),St(pe.gateLocked,1.7));P.material.vertexColors=!0,P.renderOrder=Qt.GATE_LIGHT,P.frustumCulled=!1,n.add(P),r.push(N=>{const Y=.7+.5*Math.sin(N*3);P.material.color.set(pe.gateLocked).multiplyScalar(1.7*Y)});for(const N of U.filter(Y=>Y.locked)){const{mid:Y,len:at,ax:ot,az:Mt}=g.get(N),wt=Ne(d(N.a)),Ft=at/2,It=[Y[0]-ot*Ft,wt,Y[1]-Mt*Ft,Y[0]+ot*Ft,wt,Y[1]+Mt*Ft,Y[0]+ot*Ft,wt+ni,Y[1]+Mt*Ft,Y[0]-ot*Ft,wt,Y[1]-Mt*Ft,Y[0]+ot*Ft,wt+ni,Y[1]+Mt*Ft,Y[0]-ot*Ft,wt+ni,Y[1]-Mt*Ft],kt=new fe;kt.setAttribute("position",new te(It,3));const Yt=He(new we({color:pe.gateLocked,opacity:.25,transparent:!0,blending:Fe,side:ve,toneMapped:!1})),se=new $t(kt,Yt);se.renderOrder=Qt.CURTAIN,se.frustumCulled=!1,n.add(se),r.push(me=>{Yt.opacity=.18+.12*Math.sin(me*3)})}}const Ct=(P,N,Y,at)=>{const ot=new Gt(N).multiplyScalar(.95),Mt=Ne(P),wt=Y>0?new $t(new ws(.06,.16,Y,12,1,!0),He(new we({color:ot,transparent:!0,opacity:.32,blending:Fe,toneMapped:!1,side:ve}))):null;wt&&(wt.position.set(P.cx,Mt+Y/2,P.cz),wt.renderOrder=Qt.BEAM,n.add(wt));const Ft=new $t(new Yn(at*.9,at,48),He(new we({color:ot,side:ve,transparent:!0,opacity:.45,blending:Fe,toneMapped:!1})));Ft.rotation.x=-Math.PI/2,Ft.position.set(P.cx,Mt+.08,P.cz),Ft.renderOrder=Qt.BEAM,n.add(Ft),r.push(It=>{Ft.scale.setScalar(1+.06*Math.sin(It*2+P.id))})};for(const[P,N,Y,at]of $)Ct(P,N,Y,at);const _t=i.cells.filter(P=>P.cache);let O=null;if(_t.length){O=new hx(new ui(.75),new we({toneMapped:!1}),_t.length),O.renderOrder=Qt.SOLIDS,O.frustumCulled=!1,_t.forEach((Ft,It)=>O.setColorAt(It,new Gt(Ft.payload?16751162:8256767).multiplyScalar(1.25))),n.add(O);const P=new re,N=new Ui,Y=new Q(0,1,0),at=new Q,ot=new Q,Mt=new Float32Array(_t.length).fill(1);let wt=0;r.push(Ft=>{const It=Math.min(.1,Math.max(0,Ft-wt));wt=Ft,_t.forEach((kt,Yt)=>{const se=!h||h(kt.cx,kt.cz,"dynamic");Mt[Yt]=se?Math.min(1,Mt[Yt]+It*5):Math.max(0,Mt[Yt]-It*5);const me=Mt[Yt]*(kt.payload?1.8:.7+Math.min(kt.cache,300)/600);at.set(kt.cx,Ne(kt)+1.2+.25*Math.sin(Ft*1.6+kt.id),kt.cz),N.setFromAxisAngle(Y,Ft*.8+kt.id),P.compose(at,N,ot.set(me,me,me)),O.setMatrixAt(Yt,P)}),O.instanceMatrix.needsUpdate=!0})}const{hover:K,select:J}=e?{hover:null,select:null}:fh({group:n,lineMats:s}),F=Z.geometry.getAttribute("color"),ut=nt==null?void 0:nt.geometry.getAttribute("color");function gt(P){for(const N of i.cells){const Y=P(N),at=N.solid?A[N.id]:M[N.id],ot=N.solid?ut:F,Mt=N.solid?k:tt;for(let wt=at.start*3;wt<(at.start+at.count)*3;wt++)ot.array[wt]=Mt[wt]*Y}for(const N of i.cells){const Y=G[N.id];if(!Y)continue;const at=P(N);for(let ot=Y.start*3;ot<(Y.start+Y.count)*3;ot++)F.array[ot]=tt[ot]*at}F.needsUpdate=!0,ut&&(ut.needsUpdate=!0)}return{group:n,hover:K,select:J,setBrightness:gt,lineMats:s,floorMat:f,tiles:Z,walls:nt,glass:vt,gates:U,pickables:O,update(P){for(const N of r)N(P);K==null||K.tick(P),J==null||J.tick(P)},setFocus(P,N){f==null||f.uniforms.uFocus.value.set(P,N)},setShows(P){h=P},setGlowLevel(P){a.v=P;for(const[N,Y]of l)nu(N,Y,P)},resize(P,N){for(const Y of s)Y.resolution.set(P,N)},dispose(){n.traverse(P=>{P.geometry&&P.geometry.dispose()})}}}const ae=(i,t,e,n,s,r={})=>({id:i,group:t,label:e,codes:n,help:s,...r}),co=Object.freeze([ae("moveUp","move","Move up",["KeyW","ArrowUp"],"Away from the camera"),ae("moveLeft","move","Move left",["KeyA","ArrowLeft"],"Left of the camera"),ae("moveDown","move","Move down",["KeyS","ArrowDown"],"Toward the camera"),ae("moveRight","move","Move right",["KeyD","ArrowRight"],"Right of the camera"),ae("run","move","Run",["ShiftLeft","ShiftRight"],"Hold to run"),ae("stop","move","Stop",["KeyX"],"Cancel the click-to-move order"),ae("weapon","skill","Weapon",["KeyF"],"Use the equipped weapon at the cursor"),ae("skill1","skill","Skill 1",["KeyQ"],"Skill slot 1, aimed at the cursor"),ae("skill2","skill","Skill 2",["KeyE"],"Skill slot 2, aimed at the cursor"),ae("skill3","skill","Skill 3",["KeyR"],"Skill slot 3, aimed at the cursor"),ae("skill4","skill","Skill 4",["KeyT"],"Skill slot 4, aimed at the cursor"),ae("device1","skill","Device 1",["Digit1"],"Place the device in slot 1 at the cursor"),ae("device2","skill","Device 2",["Digit2"],"Place the device in slot 2 at the cursor"),ae("device3","skill","Device 3",["Digit3"],"Place the device in slot 3 at the cursor"),ae("directive1","skill","Order 1",["Digit4"],"Companion directive 1, aimed at the cursor"),ae("directive2","skill","Order 2",["Digit5"],"Companion directive 2, aimed at the cursor"),ae("mode","skill","Mode",["KeyM"],"Cycle your equipped modes"),ae("ping","scan","Scan ping",["KeyC"],"Send a scan wave from your position"),ae("possess","companion","Possess",["Tab"],"Swap control to the other actor"),ae("companionHold","companion","Follow / hold",["KeyG"],"Companion follows you, or holds where it stands"),ae("camLeft","camera","Rotate left",["BracketLeft"],"Turn the view"),ae("camRight","camera","Rotate right",["BracketRight"],"Turn the view"),ae("camTiltUp","camera","Tilt up",["PageUp","Equal"],"Look more from above"),ae("camTiltDown","camera","Tilt down",["PageDown","Minus"],"Look more along the ground"),ae("camBehind","camera","Behind heading",["KeyV"],"The camera sits behind the way you face"),ae("camReset","camera","Reset view",["Home"],"Back to the home distance and tilt"),ae("overview","camera","Overview",["KeyO"],"Switch between chase and overview"),ae("help","system","Help",["KeyH","Slash"],"Open this guide (the game pauses)"),ae("settings","system","Settings",["Escape"],"Open the settings (the game pauses)",{fixed:!0}),ae("glow","system","Glow level",["KeyB"],"Cycle the glow"),ae("newSeed","system","New seed",["KeyN"],"Reload with a new world")]);Object.freeze(co.map(i=>i.id));const xl=new Map(co.map(i=>[i.id,i])),lv=i=>xl.get(i)??null;function vl(i){const t={};if(!i||typeof i!="object")return t;for(const[e,n]of Object.entries(i)){const s=xl.get(e);if(!s||s.fixed||!Array.isArray(n))continue;const r=n.filter(o=>typeof o=="string"&&/^[A-Za-z0-9]{1,24}$/.test(o));r.length&&(t[e]=[...new Set(r)])}return t}function mh(i=null){const t=i&&typeof i=="object"?i:{};return Object.fromEntries(co.map(e=>[e.id,Array.isArray(t[e.id])&&t[e.id].length&&!e.fixed?t[e.id]:e.codes]))}const gh=(i,t)=>mh(t)[i]??[];function xh(i,t=null){const e=mh(t);for(const n of co)if(e[n.id].includes(i))return n.id;return null}const cv=i=>i.key==="?"?"Slash":i.code,rs=(i,t,e)=>gh(t,e).some(n=>i.has(n));function vh(i,t){return{sx:(rs(i,"moveRight",t)?1:0)-(rs(i,"moveLeft",t)?1:0),sy:(rs(i,"moveUp",t)?1:0)-(rs(i,"moveDown",t)?1:0)}}const iu={Escape:"Esc",Slash:"?",BracketLeft:"[",BracketRight:"]",PageUp:"PgUp",PageDown:"PgDn",Equal:"=",Minus:"-",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",ShiftLeft:"Shift",ShiftRight:"Shift",Space:"Space",Comma:",",Period:"."};function uv(i){return iu[i]?iu[i]:/^Key[A-Z]$/.test(i)?i.slice(3):/^Digit\d$/.test(i)?i.slice(5):i}function v_(i,t,e=99){const n=[];for(const s of gh(i,t)){const r=uv(s);n.includes(r)||n.push(r)}return n.slice(0,e).join(" / ")}function hv(i=()=>null){const t=new Map;return{bind(e,n){if(!xl.has(e))throw new Error(`unknown action ${e}`);const s=t.get(e)??new Set;return s.add(n),t.set(e,s),()=>s.delete(n)},handle(e){const n=xh(cv(e),i()),s=n&&t.get(n);if(!s||!s.size)return!1;for(const r of[...s])r(n,e);return!0},has(e){var n;return(((n=t.get(e))==null?void 0:n.size)??0)>0}}}const _l="boundless.settings.v1",__=Object.freeze({controls:"Controls",display:"Display",dev:"Dev"});function fv(){const i=(t,e)=>({key:t,group:"dev",type:"range",def:li[t].value,min:li[t].min,max:li[t].max,step:.5,digits:1,unit:" u",label:e,hint:li[t].doc});return[i("navRadius","Stream: NAV radius"),i("renderRadius","Stream: mesh radius"),i("thickness","Stream: hysteresis band"),{...i("aheadBias","Stream: look-ahead"),off:0}]}const Ml=Object.freeze([{key:"invertYaw",group:"controls",type:"toggle",def:!0,label:"Invert horizontal rotation",hint:"Middle-drag left / right"},{key:"invertPitch",group:"controls",type:"toggle",def:!0,label:"Invert tilt",hint:"Middle-drag up / down"},{key:"sensitivity",group:"controls",type:"range",def:1,min:.3,max:2.5,step:.05,digits:2,unit:"x",label:"Rotation sensitivity"},{key:"glow",group:"display",type:"range",def:.38,min:0,max:1,step:.02,digits:2,off:0,label:"Glow"},{key:"cutaway",group:"display",type:"toggle",def:!0,label:"Cut-away near actors",hint:"See through walls around you"},{key:"sightRadius",group:"dev",type:"range",def:36,min:8,max:90,step:1,digits:0,unit:" u",label:"Fog lit range",hint:"Flood distance plus line of sight; the default camera shows about 27 units"},{key:"sightSoft",group:"dev",type:"range",def:.25,min:.05,max:.7,step:.01,digits:2,label:"Fog edge softness",hint:"Share of the range that ramps lit to ghost"},{key:"ghostFade",group:"dev",type:"range",def:1.2,min:.2,max:8,step:.1,digits:1,unit:" s",label:"Ghost fade time",hint:"Lit to ghost after sight is lost"},{key:"revealRate",group:"dev",type:"range",def:6,min:1,max:30,step:.5,digits:1,unit:"/s",label:"Reveal speed",hint:"How fast a texel brightens into sight"},{key:"revealStep",group:"dev",type:"range",def:.5,min:.1,max:3,step:.05,digits:2,unit:" u",label:"Reveal step",hint:"Distance moved per sight re-solve (sub-cell exposure)"},{key:"shroud",group:"dev",type:"range",def:1,min:0,max:1,step:.05,digits:2,label:"Shroud darkness",hint:"1 hides unseen ground, 0 shows it"},{key:"atmosphere",group:"dev",type:"range",def:1,min:0,max:2,step:.05,digits:2,off:0,label:"Atmosphere density",hint:"Depth haze and drifting motes"},{key:"bloomRadius",group:"dev",type:"range",def:.32,min:0,max:1,step:.02,digits:2,label:"Glow radius"},{key:"bloomThreshold",group:"dev",type:"range",def:.85,min:0,max:1.5,step:.01,digits:2,label:"Glow threshold"},{key:"pathDensity",group:"dev",type:"range",def:1.5,min:.3,max:3,step:.05,digits:2,unit:"/u",label:"Path chevron density",hint:"Chevrons per world unit along a route (uniform pitch)"},{key:"pathSize",group:"dev",type:"range",def:.8,min:.3,max:1.6,step:.02,digits:2,unit:" u",label:"Path chevron size",hint:"Arm length of one chevron"},{key:"pathGlow",group:"dev",type:"range",def:.95,min:.1,max:2,step:.05,digits:2,label:"Path chevron glow",hint:"Brightness; the default stays under the bloom threshold"},{key:"pathAngle",group:"dev",type:"range",def:124,min:70,max:170,step:1,digits:0,unit:" deg",label:"Path chevron angle",hint:"Total opening of the chevron: larger is flatter and less acute"},{key:"pingCooldown",group:"dev",type:"range",def:0,min:0,max:30,step:.1,digits:1,unit:" s",off:0,label:"Ping cooldown",hint:"Seconds of world time between scan pings; off is unlimited (waves may overlap freely)"},{key:"pingMaxWaves",group:"dev",type:"range",def:16,min:1,max:40,step:1,digits:0,label:"Max concurrent waves",hint:"A ping is refused while this many waves are still on the board; the front budget is shared between them"},{key:"scanBand",group:"dev",type:"range",def:3.2,min:.5,max:12,step:.1,digits:1,unit:" u",label:"Scan front width",hint:"Width of the luminous band behind the edge of a scan wave"},{key:"camDist",group:"dev",type:"range",def:19,min:9,max:70,step:1,digits:0,unit:" u",label:"Camera distance",hint:"Chase view home distance (wheel still zooms)"},{key:"camPitch",group:"dev",type:"range",def:58,min:35,max:88,step:1,digits:0,unit:" deg",label:"Camera pitch",hint:"Chase view home tilt"},{key:"fov",group:"dev",type:"range",def:50,min:5,max:90,step:1,digits:0,unit:" deg",label:"Field of view",hint:"The camera dollies back as it narrows, so the framing holds (5 is a long lens)"},...fv()]),dv=Ml.filter(i=>i.type==="range"),pv=Ml.filter(i=>i.type==="toggle"),ln=Object.freeze(Object.fromEntries(Ml.map(i=>[i.key,i.def]))),Nr=Object.freeze(Object.fromEntries(dv.map(i=>[i.key,[i.min,i.max,i.step]]))),mv=pv.map(i=>i.key),gv=(i,t,e)=>Math.min(e,Math.max(t,i));function M_(i,t){return i.type==="toggle"?t?"on":"off":i.off!==void 0&&t<=i.off+1e-9?"off":`${Number(t).toFixed(i.digits??0)}${i.unit??""}`}function Js(i){const t={...ln};if(!i||typeof i!="object")return t;for(const e of mv)typeof i[e]=="boolean"&&(t[e]=i[e]);for(const e of Object.keys(Nr)){const n=Number(i[e]);i[e]!==null&&i[e]!==""&&Number.isFinite(n)&&(t[e]=gv(Nr[e][2]===1?Math.round(n):n,Nr[e][0],Nr[e][1]))}return t}function xv(i=globalThis.localStorage){try{const t=i==null?void 0:i.getItem(_l);return Js(t?JSON.parse(t):null)}catch{return{...ln}}}function vv(i=globalThis.localStorage){var t;try{const e=i==null?void 0:i.getItem(_l);return vl(e?(t=JSON.parse(e))==null?void 0:t.keys:null)}catch{return{}}}function _v(i,t=globalThis.localStorage,e=null){try{const n=vl(e);return t==null||t.setItem(_l,JSON.stringify(Object.keys(n).length?{...Js(i),keys:n}:Js(i))),!0}catch{return!1}}function Mv(i,t,e){const n=i.sensitivity;return{dyaw:t*.006*n*(i.invertYaw?-1:1),dpitch:e*.004*n*(i.invertPitch?-1:1)}}function yv(i=globalThis.localStorage){let t=xv(i),e=vv(i);const n=new Set,s=()=>{for(const o of n)o(t)},r=()=>_v(t,i,e);return{get:()=>t,keys:()=>e,set(o){return t=Js({...t,...o}),r(),s(),t},setKeys(o){const a={...e};for(const[l,c]of Object.entries(o??{}))c===null?delete a[l]:a[l]=c;return e=vl(a),r(),s(),e},reset(o){const a=o===void 0?null:[].concat(o);return t=a?Js({...t,...Object.fromEntries(a.filter(l=>l in ln).map(l=>[l,ln[l]]))}):{...ln},a||(e={}),r(),s(),t},subscribe(o){return n.add(o),o(t),()=>n.delete(o)}}}const Ue=Math.PI/180,Me={overview:{pitch:72,dist:150,fov:42,minD:28,maxD:260,near:1,far:1400},chase:{pitch:58,dist:19,fov:50,minD:9,maxD:70,near:.5,far:600,lookHeight:1},pitchMin:35,pitchMax:88,yawRate:1.9,pitchRate:38,ease:9,followEase:7,fovMin:5,maxPhys:1500};class Sv{constructor(t,e,n,{embedded:s=!1,mode:r="overview"}={}){this.camera=t,this.dom=e,this.bounds=n,this.embedded=s,this.mode=r,this.target=new Q,this.goal=new Q,this.yaw=this.yawGoal=0,this.pitch=this.pitchGoal=72*Ue,this.dist=this.distGoal=150,this.followHeading=!1,this.heading=0,this.keys=new Set,this.getKeys=()=>null,this.settings={...ln},this.plane=new oi(new Q(0,1,0),0),this.ray=new Gc,this.drag=null,this.lastMid=0,this.onChange=null,this._off=[],this._bind(),this.setMode(r,{keepTarget:!1})}get P(){if(this.mode!=="chase")return Me[this.mode];const t=this.settings,e=this._chase;return(!e||e.dist!==t.camDist||e.pitch!==t.camPitch)&&(this._chase={...Me.chase,dist:t.camDist,pitch:t.camPitch}),this._chase}get fovDeg(){return this.mode==="chase"?this.settings.fov:Me[this.mode].fov}get dolly(){const t=this.mode==="chase"?ln.fov:Me[this.mode].fov,e=kn.clamp(this.fovDeg,Me.fovMin,179);return Math.tan(t*Ue/2)/Math.tan(e*Ue/2)}get physDist(){return Math.min(this.dist*this.dolly,Me.maxPhys)}get yawDeg(){return this.yaw/Ue}get pitchDeg(){return this.pitch/Ue}setMode(t,{keepTarget:e=!0}={}){this.mode=t;const n=Me[t];this.pitch=this.pitchGoal=n.pitch*Ue,this.dist=this.distGoal=n.dist,this.camera.fov=t==="chase"?this.settings.fov:n.fov,this.camera.near=n.near,this.camera.far=n.far,this.camera.updateProjectionMatrix(),e||this.target.copy(this.goal),this.apply(),this._changed()}_changed(){var t;(t=this.onChange)==null||t.call(this,this)}bindKeys(t){this.getKeys=t}applySettings(t){const e=this.settings;this.settings={...this.settings,...t},this.mode==="chase"&&(this.settings.camDist!==e.camDist&&(this.distGoal=kn.clamp(this.settings.camDist,this.P.minD,this.P.maxD)),this.settings.camPitch!==e.camPitch&&(this.pitchGoal=this.settings.camPitch*Ue)),this.apply()}rotate(t){this.yawGoal+=t,this._changed()}setYawDeg(t){this.yawGoal=t*Ue,this._changed()}setPitchDeg(t){this.pitchGoal=kn.clamp(t,Me.pitchMin,Me.pitchMax)*Ue,this._changed()}tilt(t){this.setPitchDeg(this.pitchGoal/Ue+t)}zoomBy(t){this.distGoal=kn.clamp(this.distGoal*t,this.P.minD,this.P.maxD),this._changed()}northUp(){this.yawGoal=Math.round(this.yawGoal/(2*Math.PI))*2*Math.PI,this._changed()}reset(){this.northUp(),this.pitchGoal=this.P.pitch*Ue,this.distGoal=this.P.dist,this.followHeading=!1,this._changed()}forward(t=new qt){return t.set(-Math.sin(this.yaw),-Math.cos(this.yaw))}right(t=new qt){return t.set(Math.cos(this.yaw),-Math.sin(this.yaw))}toWorldAxis(t,e,n={x:0,z:0}){const s=Math.sin(this.yaw),r=Math.cos(this.yaw);return n.x=t*r-e*s,n.z=-t*s-e*r,n}groundAt(t,e,n=new Q){this.ray=this.ray??new Gc;const s=this.dom.getBoundingClientRect(),r=new qt((t-s.left)/s.width*2-1,-((e-s.top)/s.height)*2+1);return this.ray.setFromCamera(r,this.camera),this.ray.ray.intersectPlane(this.plane,n)?n:null}rayAt(t,e){const n=this.dom.getBoundingClientRect(),s=new qt((t-n.left)/n.width*2-1,-((e-n.top)/n.height)*2+1);return this.ray.setFromCamera(s,this.camera),this.ray.ray}_on(t,e,n,s){t.addEventListener(e,n,s),this._off.push(()=>t.removeEventListener(e,n,s))}_bind(){const t=this.dom,e=this.embedded?t:window,n=s=>this.embedded?!0:s.target===document.body;this._on(e,"keydown",s=>{var o;if(!n(s)||s.ctrlKey||s.metaKey||s.altKey)return;this.keys.add(s.code);const r=xh(s.code,this.getKeys());r==="camReset"&&this.reset(),r==="camBehind"&&this.mode==="chase"&&(this.followHeading=!this.followHeading,this._changed()),this.embedded&&["move","camera"].includes((o=lv(r))==null?void 0:o.group)&&s.preventDefault()}),this._on(e,"keyup",s=>this.keys.delete(s.code)),this._on(window,"blur",()=>this.keys.clear()),this._on(t,"blur",()=>this.keys.clear()),this._on(t,"wheel",s=>{if(this.embedded&&!s.ctrlKey&&document.activeElement!==t)return;if(s.preventDefault(),s.shiftKey){this.tilt(-Math.sign(s.deltaY)*3);return}const r=Math.exp(s.deltaY*.0012);if(this.mode==="overview"){const o=this.groundAt(s.clientX,s.clientY);this.dist=this.distGoal=kn.clamp(this.distGoal*r,this.P.minD,this.P.maxD),this.apply();const a=this.groundAt(s.clientX,s.clientY);o&&a&&(this.goal.add(o.sub(a)),this._clamp(this.goal),this.target.copy(this.goal),this.apply()),this._changed()}else this.zoomBy(r)},{passive:!1}),this._on(t,"pointerdown",s=>{if(s.button!==1)return;s.preventDefault(),t.setPointerCapture(s.pointerId);const r=performance.now();if(r-this.lastMid<350){this.reset(),this.lastMid=0;return}this.lastMid=r,this.drag={x:s.clientX,y:s.clientY,pan:s.shiftKey&&this.mode==="overview",last:this.groundAt(s.clientX,s.clientY)}}),this._on(t,"pointermove",s=>{const r=this.drag;if(!r)return;if(r.pan){const u=this.groundAt(s.clientX,s.clientY);if(!u||!r.last)return;this.goal.add(r.last.clone().sub(u)),this._clamp(this.goal),this.target.copy(this.goal),this.apply(),r.last=this.groundAt(s.clientX,s.clientY);return}const o=s.clientX-r.x,a=s.clientY-r.y;r.x=s.clientX,r.y=s.clientY;const{dyaw:l,dpitch:c}=Mv(this.settings,o,a);this.yawGoal+=l,this.pitchGoal=kn.clamp(this.pitchGoal+c,Me.pitchMin*Ue,Me.pitchMax*Ue),this._changed()}),this._on(t,"pointerup",()=>{this.drag=null}),this._on(t,"auxclick",s=>s.preventDefault())}dispose(){for(const t of this._off)t();this._off=[],this.keys.clear()}_clamp(t){const e=this.bounds,n=14;t.x=kn.clamp(t.x,e.x0-n,e.x1+n),t.z=kn.clamp(t.z,e.z0-n,e.z1+n)}focus(t,e,n){this.goal.set(t,0,e),this._clamp(this.goal),this.target.copy(this.goal),n&&(this.dist=this.distGoal=n),this.apply()}follow(t,e,n){this.goal.set(t,0,e),this.heading=n}update(t){const e=this.keys,n=this.getKeys(),s=a=>rs(e,a,n);let r=!1;if(s("camLeft")&&(this.yawGoal-=Me.yawRate*t,r=!0),s("camRight")&&(this.yawGoal+=Me.yawRate*t,r=!0),s("camTiltUp")&&(this.pitchGoal=Math.min(Me.pitchMax*Ue,this.pitchGoal+Me.pitchRate*Ue*t),r=!0),s("camTiltDown")&&(this.pitchGoal=Math.max(Me.pitchMin*Ue,this.pitchGoal-Me.pitchRate*Ue*t),r=!0),r&&this._changed(),this.mode==="overview"){const{sx:a,sy:l}=vh(e,n);if(a||l){const c=Math.hypot(a,l),u=this.dist*.9*(s("run")?2:1),d=this.toWorldAxis(a/c,l/c);this.goal.x+=d.x*u*t,this.goal.z+=d.z*u*t,this._clamp(this.goal)}this.target.copy(this.goal)}else{if(this.followHeading){let a=this.heading+Math.PI;a+=Math.round((this.yawGoal-a)/(2*Math.PI))*2*Math.PI,this.yawGoal+=(a-this.yawGoal)*(1-Math.exp(-t*2.2))}this.target.lerp(this.goal,1-Math.exp(-t*Me.followEase))}const o=1-Math.exp(-t*Me.ease);this.yaw+=(this.yawGoal-this.yaw)*o,this.pitch+=(this.pitchGoal-this.pitch)*o,this.dist+=(this.distGoal-this.dist)*o,this.apply()}apply(){const t=this.physDist,e=Me[this.mode],n=Math.max(1,t/Math.max(this.dist,1e-6)),s=this.fovDeg,r=e.near*n,o=e.far+t;(this.camera.fov!==s||this.camera.near!==r||this.camera.far!==o)&&(this.camera.fov=s,this.camera.near=r,this.camera.far=o,this.camera.updateProjectionMatrix());const a=Math.cos(this.pitch),l=Math.sin(this.pitch),c=this.mode==="chase"?Me.chase.lookHeight:0;this.camera.position.set(this.target.x+Math.sin(this.yaw)*a*t,c+l*t,this.target.z+Math.cos(this.yaw)*a*t),this.camera.lookAt(this.target.x,c,this.target.z),this.camera.updateMatrixWorld(),this.camera.matrixWorldInverse.copy(this.camera.matrixWorld).invert()}}function bv(i){i.fog=new ul(pe.background,1e5,100001);const t=new xx(13626111,1714746,Math.PI*1),e=new Oc(10476799,1.5);e.position.set(-.5,.8,.35);const n=new Oc(16751200,.5);n.position.set(.6,.35,-.7),i.add(t,e,n);const s=520,r=new Float32Array(s*4);for(let u=0;u<s;u++)r[u*4]=Math.random(),r[u*4+1]=Math.random(),r[u*4+2]=Math.random(),r[u*4+3]=Math.random();const o=new fe;o.setAttribute("position",new _e(new Float32Array(s*3),3)),o.setAttribute("aSeed",new _e(r,4));const a=He(new Ee({transparent:!0,blending:Fe,depthTest:!0,depthWrite:!1,uniforms:{uTime:{value:0},uCenter:{value:new Q},uBox:{value:new Q(70,14,70)},uScale:{value:400},uFade:{value:1}},vertexShader:`
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
      }`})),l=new dx(o,a);l.frustumCulled=!1,l.renderOrder=Qt.MOTES,i.add(l);let c=1;return{motes:l,setDensity(u){c=u,a.uniforms.uFade.value=Math.min(1,u)},get density(){return c},update(u,d,p,h){const g=d.mode==="chase";if(l.visible=g&&c>.001,g){const x=d.physDist;i.fog.near=x*.95,i.fog.far=c>.001?x+34/c:1e5,c<=.001&&(i.fog.near=99999),a.uniforms.uTime.value=p,a.uniforms.uCenter.value.set(d.target.x,0,d.target.z),a.uniforms.uScale.value=h/(2*Math.tan(u.fov*Math.PI/360))}else i.fog.near=1e5,i.fog.far=100001}}}const Fr=700,su=.7,wv=2.4,Ev=1.1,Tv=1.4,Av=`
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
`,Rv=`
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
`;function Cv(){const i=new sh,t=[],e=[];for(const n of[-1,1]){const s=t.length/3;t.push(n,0,0,n,0,1,n,1,0,n,1,1),e.push(s,s+1,s+2,s+2,s+1,s+3)}return i.setAttribute("position",new _e(new Float32Array(t.length),3)),i.setAttribute("aGlyph",new _e(new Float32Array(t),3)),i.setIndex(e),i}const Or=Object.freeze({density:1.5,size:.8,glow:.95,angle:124});function _h({parent:i,color:t=pe.ally,behind:e=0}={}){const n={density:Or.density,size:Or.size,glow:Or.glow,angle:Or.angle},s=Cv();s.instanceCount=0;const r=He(new Ee({uniforms:{uPhase:{value:0},uPitch:{value:1},uSize:{value:.7},uAngle:{value:2.1},uThick:{value:.14},uY:{value:.12},uHead:{value:0},uTotal:{value:0},uBehind:{value:e},uFadeIn:{value:Ev},uFadeEnd:{value:Tv},uColor:{value:new Gt(t)},uGlow:{value:n.glow}},vertexShader:Av,fragmentShader:Rv,blending:Fe,side:ve,toneMapped:!1})),o=new $t(s,r);o.frustumCulled=!1,o.renderOrder=Qt.MARKERS,o.visible=!1,i==null||i.add(o);const a=new qs(new Float32Array(Fr*4),4),l=new qs(new Float32Array(Fr*4),4),c=new qs(new Float32Array(Fr),1);for(const T of[a,l,c])T.setUsage(Ga);s.setAttribute("iP",a),s.setAttribute("iT",l),s.setAttribute("iA",c);let u=null,d=null,p=0,h=.12,g=!1;const x={builds:0,glyphs:0,lastMs:0},m=T=>{T=Math.max(0,Math.min(p,T));let _=0,w=d.length-1;for(;w-_>1;){const M=_+w>>1;d[M]<=T?_=M:w=M}const E=d[w]-d[_],y=E>1e-9?(T-d[_])/E:0;return{x:u[_].x+(u[w].x-u[_].x)*y,z:u[_].z+(u[w].z-u[_].z)*y}},f=T=>{const _=m(T-su),w=m(T+su),E=w.x-_.x,y=w.z-_.z,M=Math.hypot(E,y);return M>1e-6?[E/M,y/M]:[1,0]};function S(){if(g=!1,!u||u.length<2){s.instanceCount=0,o.visible=!1;return}const T=performance.now();d=[0];for(let E=1;E<u.length;E++)d.push(d[E-1]+Math.hypot(u[E].x-u[E-1].x,u[E].z-u[E-1].z));p=d[d.length-1];const _=1/n.density,w=Math.min(Fr,Math.floor(p/_));for(let E=0;E<w;E++){const y=w-1-E,M=p-(y+.5)*_,A=M+_,G=m(M),H=m(A),j=f(M),tt=f(A);a.setXYZW(E,G.x,G.z,H.x,H.z),l.setXYZW(E,j[0],j[1],tt[0],tt[1]),c.setX(E,M)}a.needsUpdate=l.needsUpdate=c.needsUpdate=!0,r.uniforms.uPitch.value=_,r.uniforms.uTotal.value=p,r.uniforms.uY.value=h,s.instanceCount=w,o.visible=w>0,x.builds++,x.glyphs=w,x.lastMs=performance.now()-T}const b=(T,_)=>T&&_&&T.length===_.length&&T.every((w,E)=>Math.abs(w.x-_[E].x)<1e-6&&Math.abs(w.z-_[E].z)<1e-6),v={mesh:o,stats:x,look:n,follow(T,_=.12){if(!T||T.length<2){v.clear();return}const w=T.slice(1),E=u&&u.length>1?u[1]:null;let y=!u||!b(w,u.slice(1))||_!==h||g;if(!y&&E){const M=u[0],A=u[1],G=A.x-M.x,H=A.z-M.z,j=Math.hypot(G,H)||1;Math.abs((T[0].x-M.x)*H-(T[0].z-M.z)*G)/j>1.2&&(y=!0)}if(y&&(u=T.map(M=>({x:M.x,z:M.z})),h=_,S()),u){const M=u[0],A=u[1],G=A.x-M.x,H=A.z-M.z,j=Math.hypot(G,H)||1,tt=Math.max(0,Math.min(j,((T[0].x-M.x)*G+(T[0].z-M.z)*H)/j));r.uniforms.uHead.value=tt}},set(T,_=.09){b(T,u)&&_===h&&!g||(u=T&&T.length>1?T.map(w=>({x:w.x,z:w.z})):null,h=_,S())},setHead(T){r.uniforms.uHead.value=T},arcOf(T){return(d==null?void 0:d[T])??0},get total(){return p},setColor(T){Array.isArray(T)?r.uniforms.uColor.value.setRGB(T[0],T[1],T[2]):r.uniforms.uColor.value.set(T)},clear(){u=null,s.instanceCount=0,o.visible=!1},configure(T={}){const _=Number.isFinite(T.pathDensity)?T.pathDensity:n.density;Math.abs(_-n.density)>1e-9&&(n.density=_,g=!0,u&&S()),Number.isFinite(T.pathSize)&&(n.size=T.pathSize),Number.isFinite(T.pathGlow)&&(n.glow=T.pathGlow),Number.isFinite(T.pathAngle)&&(n.angle=T.pathAngle),r.uniforms.uSize.value=n.size,r.uniforms.uThick.value=Math.max(.08,n.size*.26),r.uniforms.uGlow.value=n.glow,r.uniforms.uAngle.value=n.angle*Math.PI/180},update(T){r.uniforms.uPhase.value=T*wv/(1/n.density)%1},dispose(){i==null||i.remove(o),s.dispose(),r.dispose()}};return v.configure({}),v}function Pv({scene:i,addLineMaterial:t}){const e=new We;i.add(e);const n=(g,x=.9)=>hh(He(new we({color:new Gt(g).multiplyScalar(1.5),transparent:!0,opacity:x,side:ve,blending:Fe,toneMapped:!1}))),s=n(pe.hover,.85),r=new We,o=new $t(new Yn(.55,.68,40),s);o.rotation.x=-Math.PI/2,o.renderOrder=Qt.CURSOR,r.add(o);for(let g=0;g<4;g++){const x=new $t(new Ss(.1,.38),s);x.rotation.x=-Math.PI/2;const m=g*Math.PI/2;x.position.set(Math.cos(m)*.95,0,Math.sin(m)*.95),x.rotation.z=m+Math.PI/2,x.renderOrder=Qt.CURSOR,r.add(x)}r.visible=!1,e.add(r);const a=n(pe.select,.95),l=new We,c=new $t(new Yn(.7,.85,40),a);c.rotation.x=-Math.PI/2,c.renderOrder=Qt.MARKERS;const u=new $t(new Yn(.7,.8,40),a.clone());u.rotation.x=-Math.PI/2,u.renderOrder=Qt.MARKERS;const d=new $t(new ws(.035,.035,2.2,6,1,!0),He(new we({color:new Gt(pe.select).multiplyScalar(1.4),transparent:!0,opacity:.7,blending:Fe,toneMapped:!1})));d.position.y=1.1,d.renderOrder=Qt.MARKERS;const p=new $t(new ui(.22),new we({color:new Gt(pe.select).multiplyScalar(1.6),toneMapped:!1}));p.position.y=2.3,p.renderOrder=Qt.MARKERS,l.add(c,u,d,p),l.visible=!1,e.add(l);const h=_h({parent:e,color:pe.ally});return{group:e,showCursor(g,x,m,f){r.visible=!0,r.position.set(g,x+.1,m),s.color.set(f?pe.blocked:pe.hover).multiplyScalar(1.5)},hideCursor(){r.visible=!1},setTarget(g,x,m,f){l.visible=!0,l.position.set(g,x+.1,m),f&&a.color.set(f).multiplyScalar(1.5)},clearTarget(){l.visible=!1},get targetPos(){return l.visible?l.position:null},setPath(g,x=.12,m=pe.ally){if(!g||g.length<2){h.clear();return}h.setColor(m),h.follow(g,x)},chevrons:h,update(g){r.rotation.y=g*.8;const x=g*1.6%1;c.scale.setScalar(1+.9*(1-x)),c.material.opacity=.95*x,u.scale.setScalar(1+.2*Math.sin(g*4)),p.rotation.y=g*2,p.position.y=2.3+.12*Math.sin(g*3),h.update(g)}}}function Mh(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},o={},a=i[0].morphTargetsRelative,l=new fe;let c=0;for(let u=0;u<i.length;++u){const d=i[u];let p=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const h in d.attributes){if(!n.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+'. All geometries must have compatible attributes; make sure "'+h+'" attribute exists among all geometries, or in none of them.'),null;r[h]===void 0&&(r[h]=[]),r[h].push(d.attributes[h]),p++}if(p!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const h in d.morphAttributes){if(!s.has(h))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+".  .morphAttributes must be consistent throughout all geometries."),null;o[h]===void 0&&(o[h]=[]),o[h].push(d.morphAttributes[h])}if(t){let h;if(e)h=d.index.count;else if(d.attributes.position!==void 0)h=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+u+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,h,u),c+=h}}if(e){let u=0;const d=[];for(let p=0;p<i.length;++p){const h=i[p].index;for(let g=0;g<h.count;++g)d.push(h.getX(g)+u);u+=i[p].attributes.position.count}l.setIndex(d)}for(const u in r){const d=ru(r[u]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" attribute."),null;l.setAttribute(u,d)}for(const u in o){const d=o[u][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[u]=[];for(let p=0;p<d;++p){const h=[];for(let x=0;x<o[u].length;++x)h.push(o[u][x][p]);const g=ru(h);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+u+" morphAttribute."),null;l.morphAttributes[u].push(g)}}return l}function ru(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const u=i[c];if(t===void 0&&(t=u.array.constructor),t!==u.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=u.itemSize),e!==u.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=u.normalized),n!==u.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=u.gpuType),s!==u.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=u.count*e}const o=new t(r),a=new _e(o,e,n);let l=0;for(let c=0;c<i.length;++c){const u=i[c];if(u.isInterleavedBufferAttribute){const d=l/e;for(let p=0,h=u.count;p<h;p++)for(let g=0;g<e;g++){const x=u.getComponent(p,g);a.setComponent(p+d,g,x)}}else o.set(u.array,l);l+=u.count*e}return s!==void 0&&(a.gpuType=s),a}const Ns=new Gt(pe.ally),Fs=new Gt(pe.companion);let Br=null;function Lv(){if(Br)return Br;const i=document.createElement("canvas");i.width=i.height=64;const t=i.getContext("2d"),e=t.createRadialGradient(32,32,0,32,32,32);return e.addColorStop(0,"rgba(0,0,0,0.75)"),e.addColorStop(.55,"rgba(0,0,0,0.35)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,64,64),Br=new nh(i),Br}const bi=30;function Dv(i,t){const e=new Float32Array(bi*2*3),n=new Float32Array(bi*2*4),s=[];for(let c=0;c<bi-1;c++){const u=c*2;s.push(u,u+1,u+2,u+1,u+3,u+2)}const r=new fe;r.setAttribute("position",new _e(e,3)),r.setAttribute("color",new _e(n,4)),r.setIndex(s);const o=new $t(r,He(new we({vertexColors:!0,transparent:!0,blending:Fe,side:ve,toneMapped:!1})));o.frustumCulled=!1,o.renderOrder=Qt.TRAIL;const a=[];let l=0;return{mesh:o,reset(c,u,d){a.length=0;for(let p=0;p<bi;p++)a.push([c,u,d])},update(c,u,d,p,h){for(l+=c,a.length||this.reset(u,d,p);l>=.028;)l-=.028,a.unshift([u,d,p]),a.length=bi;a[0]=[u,d,p];for(let g=0;g<bi;g++){const x=a[g],m=1-g/(bi-1),f=t*m;e.set([x[0],x[1],x[2],x[0],x[1]+f,x[2]],g*6);const S=Math.pow(m,1.4)*h;n.set([i.r*1.6,i.g*1.6,i.b*1.6,S,i.r*1.6,i.g*1.6,i.b*1.6,0],g*8)}r.getAttribute("position").needsUpdate=!0,r.getAttribute("color").needsUpdate=!0}}}function ou(i,t,e=!1){const n=new We,s=c=>He(new we({color:i.clone().multiplyScalar(1.5),transparent:!0,opacity:c,side:ve,blending:Fe,toneMapped:!1})),r=new $t(new Yn(t*.88,t,48),s(.85)),o=new $t(new Yn(.01,t*.88,48),s(.07)),a=Mh([0,1,2,3].map(c=>new Yn(t*1.28,t*1.4,10,1,c*Math.PI/2+.2,Math.PI/2-.5))),l=new $t(a,s(.95));for(const c of[r,o,l])c.rotation.x=-Math.PI/2,c.renderOrder=Qt.GLOW+1,n.add(c);return{group:n,ctrl:l,base:r,inner:o}}function Iv({scene:i,map:t,addLineMaterial:e}){const n=new We;i.add(n);const s={},r=(m,f,S)=>{const b=ah(new ao({color:f.clone().multiplyScalar(1.7),linewidth:S,worldUnits:!1,fog:!0}));e(b);const v=new gl(new oo().fromEdgesGeometry(new px(m,25)),b);return v.renderOrder=Qt.CREST,v},o=m=>new Wa({color:m,flatShading:!0}),a=(m,f)=>new we({color:m.clone().multiplyScalar(f),toneMapped:!1});function l(){const m=new We,f=[new ws(.2,.31,1.05,6).translate(0,.62,0),new Rn(.82,.2,.36).translate(0,1.28,0),new Rn(.22,.5,.2).translate(.2,0+.25,0),new Rn(.22,.5,.2).translate(-.2,.25,0)].map(y=>y.index?y.toNonIndexed():y),S=Mh(f.map(y=>(y.deleteAttribute("uv"),y))),b=new $t(S,o(398880));b.renderOrder=Qt.SOLIDS;const v=r(S,Ns,1.8),T=new $t(new ui(.22).scale(1,1.25,1),a(Ns,2));T.position.y=1.7,T.renderOrder=Qt.SOLIDS;const _=new $t(new fl(.11,.38,4),a(Ns,2.4));_.rotation.x=Math.PI/2,_.position.set(0,1.7,.3),_.renderOrder=Qt.SOLIDS;const w=new $t(new Rn(.16,.2,.05),a(Ns,2.2));w.position.set(0,1,.31),w.renderOrder=Qt.SOLIDS;const E=new We;return E.add(b,v,T,_,w),m.add(E),{group:m,lean:E}}function c(){const m=new We,f=new pl(.46,.065,5,6),S=new $t(f,a(Fs,1.7));S.rotation.x=Math.PI/2,S.renderOrder=Qt.SOLIDS;const b=new $t(new ui(.26),o(727558));b.renderOrder=Qt.SOLIDS;const v=r(b.geometry,Fs,1.6),T=new $t(new ui(.13),a(Fs,2.6));T.renderOrder=Qt.SOLIDS;const _=[0,1].map(w=>{const E=new $t(new dl(.09),a(Fs,2.2));return E.renderOrder=Qt.SOLIDS,m.add(E),E});return m.add(S,b,v,T),{group:m,ring:S,shell:b,sats:_}}function u(m,f,S,b,v,T,_){const w=f(),E=new We;E.add(w.group);const y=new $t(new hl(b*1.9,24),new we({map:Lv(),transparent:!0,depthWrite:!1,toneMapped:!1}));y.rotation.x=-Math.PI/2,y.renderOrder=Qt.GLOW-1;const M=ou(S,b),A=Dv(S,v),G=new _x(S.clone().lerp(new Gt(16777215),.25),T,_,2);n.add(E,y,M.group,A.mesh,G),s[m]={id:m,model:w,group:E,shadow:y,rings:M,trail:A,light:G,y:.05,init:!1}}u("avatar",l,Ns,.55,.95,9,16),u("companion",c,Fs,.4,.5,4.5,11);const d=new Map,p=new ui(.34).scale(1,1.5,1);function h(m){let f=d.get(m);if(f)return f;const S=new Gt(pe.hostile),b=new We,v=new $t(p,a(S,1.9));v.position.y=.9,v.renderOrder=Qt.SOLIDS;const T=ou(S,.4);return b.add(v,T.group),b.visible=!1,n.add(b),d.set(m,f={id:m,group:b,vis:0,y:.05,init:!1}),f}const g=["avatar","companion"],x=[];return{group:n,contacts:d,sync(m,f,S,b=null){x.length=0;const v=new Set;for(const T of m.others??[]){const _=h(T.id);v.add(T.id);const w=T.render??T,E=!b||b(w.x,w.z,"dynamic");_.vis=E?Math.min(1,_.vis+S*6):Math.max(0,_.vis-S*6),_.group.visible=_.vis>.02;const y=T.cell!=null?t.cells[T.cell]:null,M=Ne(y);_.y=_.init?_.y+(M-_.y)*Math.min(1,S*14):M,_.init=!0,_.group.position.set(w.x,_.y,w.z),_.group.rotation.y=w.heading??0,_.group.scale.setScalar(.3+.7*_.vis)}for(const[T,_]of d)v.has(T)||(_.group.visible=!1,_.vis=0);for(const T of g){const _=m[T],w=s[T];if(!_||!w)continue;const E=_.render??_,y=E.x,M=E.z,A=E.heading,G=_.cell!=null?t.cells[_.cell]:null,H=Ne(G);w.y=w.init?w.y+(H-w.y)*Math.min(1,S*14):H;const j=T==="companion"?1.35+.08*Math.sin(f*2.2):0,tt=w.y;w.group.position.set(y,tt+j,M),w.group.rotation.y=A,w.shadow.position.set(y,tt+.035,M),w.rings.group.position.set(y,tt+.09,M),w.rings.ctrl.visible=!!_.controlled,w.rings.ctrl.rotation.z=f*1.4,w.rings.base.material.opacity=_.controlled?.95:.55,w.light.position.set(y,tt+(T==="avatar"?3.1:2.4),M),T==="avatar"?(w.model.lean.rotation.x=Math.min(.28,(E.speed??0)*.03),w.model.lean.position.y=Math.abs(Math.sin(f*11))*Math.min(.06,(E.speed??0)*.008)):(w.model.ring.rotation.z=f*1.2,w.model.shell.rotation.y=f*1.8,w.model.sats.forEach((k,z)=>{const B=f*2.6+z*Math.PI;k.position.set(Math.cos(B)*.62,.05*Math.sin(f*5+z),Math.sin(B)*.62),k.rotation.set(f*3,f*2,0)})),w.init||(w.trail.reset(y,tt+.1,M),w.init=!0),w.trail.update(S,y,tt+.1+(T==="companion"?.7:0),M,E.moving??_.moving?.85:.5),x.push({id:T,x:y,y:tt+1,z:M,r:T==="avatar"?3:2})}},centres(){return x},dispose(){i.remove(n),p.dispose()}}}function Uv(i,t,{size:e=64,corner:n="bottom-right",offset:s=16}={}){const r=document.createElement("div");r.setAttribute("role","img"),r.setAttribute("aria-label","Compass: click to put north up"),r.title="Compass (click: north up, Home: reset view)";const o={"bottom-right":`right:${s}px;bottom:${s}px`,"top-left":`left:${s}px;top:${s}px`,"bottom-left":`left:${s}px;bottom:${s}px`}[n];r.style.cssText=`position:absolute;${o};width:${e}px;height:${e}px;border-radius:50%;cursor:pointer;
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
    </svg>`;const a=r.querySelector(".dial");r.addEventListener("click",c=>{c.stopPropagation(),t.northUp()}),r.addEventListener("pointerdown",c=>c.stopPropagation()),i.appendChild(r);let l=NaN;return{el:r,update(){const c=t.yawDeg;Math.abs(c-l)<.05||(l=c,a.setAttribute("transform",`rotate(${c.toFixed(2)})`))},dispose(){r.remove()}}}const zv=lo;function Nv({canvas:i,map:t,embedded:e=!1,focus:n,glow:s=zv,mode:r="overview",compass:o=!0,makeBoard:a,fog:l=!1,onHover:c,onSelect:u}){var Bt;const d=new ax({canvas:i,antialias:!0});d.setPixelRatio(Math.min(devicePixelRatio,2)),d.setClearColor(pe.background);const p=new lx,h=new nn(42,1,1,1200),g=new Sv(h,i,t.bounds,{embedded:e,mode:r}),x=n??{x:t.startCell.cx,z:t.startCell.cz,dist:void 0};g.focus(x.x,x.z,r==="overview"?x.dist??150:void 0);const m=Vx(),f=a?a({map:t,cut:m}):ph(t,{cut:m});(Bt=f.setGlowLevel)==null||Bt.call(f,s),p.add(f.group);const S=bv(p),b={w:1,h:1},v=ht=>{f.lineMats.push(ht),ht.resolution.set(b.w,b.h)},T=Pv({scene:p,addLineMaterial:v});let _=null;const w=new cn(1,1,{type:Cn,samples:4});l&&(w.depthTexture=new cl(1,1));const E=new Ax(d,w);E.addPass(new Rx(p,h));const y=l?new zx(h):null;y&&E.addPass(y);const M=new xs(new qt(1,1),s,.32,.85);E.addPass(M),E.addPass(new Lx);const A=o?Uv(e?i.parentElement:document.body,g,e?{corner:"bottom-right",size:58,offset:12}:{corner:"bottom-right",size:72,offset:18}):null;A&&!e&&(A.el.style.position="fixed");function G(){const ht=e?i.parentElement:null,I=ht?ht.clientWidth:innerWidth,C=ht?ht.clientHeight:innerHeight;!I||!C||(b.w=I,b.h=C,d.setSize(I,C,!1),E.setSize(I,C),h.aspect=I/C,h.updateProjectionMatrix(),f.resize(I,C))}const H=e?new ResizeObserver(G):null;H==null||H.observe(i.parentElement),e||addEventListener("resize",G),G();const j={hover:[],select:[],frame:[]},tt=(ht,...I)=>{for(const C of j[ht])C(...I)},k=(ht,I)=>(j[ht].push(I),()=>{j[ht]=j[ht].filter(C=>C!==I)});c&&k("hover",c),u&&k("select",u);const z=new Q;function B(ht,I){const C=g.rayAt(ht,I),R=C.origin,U=C.direction;if(U.y>-1e-4)return null;const $=Math.max(0,(Gx-R.y)/U.y),W=(0-R.y)/U.y,St=44;for(let mt=0;mt<=St;mt++){const Ct=$+(W-$)*mt/St;z.copy(U).multiplyScalar(Ct).add(R);const _t=t.cellAt(z.x,z.z);if(_t&&_t.solid&&z.y<=kx(_t))return{point:z.clone(),cell:_t,solid:!0}}z.copy(U).multiplyScalar(W).add(R);const ct=t.cellAt(z.x,z.z);return{point:z.clone(),cell:ct,solid:!!(ct!=null&&ct.solid)}}let Z=null;const nt=ht=>!Z||!ht||Z(ht.point.x,ht.point.z),xt={x:0,y:0,inside:!1};let Rt=null,Lt=!1,lt=null;function bt(){if(!xt.inside){lt=null,Rt&&(Rt=null,f.hover.set(null),tt("hover",null,null)),T.hideCursor();return}const ht=B(xt.x,xt.y);ht&&(ht.known=nt(ht)),lt=ht;const I=ht&&ht.known?ht.cell??null:null,C=!I||I.solid;(I!==Rt||C!==Lt)&&(Rt=I,Lt=C,f.hover.set(I,{blocked:C}),tt("hover",I,ht)),ht&&I&&ht.known&&!I.solid?T.showCursor(ht.point.x,Ne(I),ht.point.z,!1):T.hideCursor()}const Pt=ht=>{xt.x=ht.clientX,xt.y=ht.clientY,xt.inside=!0},yt=()=>{xt.inside=!1},Dt=ht=>{const I=B(ht.clientX,ht.clientY);I&&(I.known=nt(I));const C=I&&I.known?I.cell??null:null;tt("select",C,I)},L=ht=>ht.preventDefault();i.addEventListener("pointermove",Pt),i.addEventListener("pointerleave",yt),i.addEventListener("click",Dt),e||i.addEventListener("contextmenu",L);const X=k("select",ht=>{Et.handlesSelect||f.select.set(ht)}),et=new rh;let st=0,pt=!1;const V=[];let zt=!0;const vt={n:0,sum:0,max:0,last:0};function Tt(){if(!pt)return;const ht=performance.now(),I=Math.min(et.getDelta(),.1),C=et.elapsedTime;if(tt("frame",I,C),g.update(I),bt(),f.update(C),T.update(C),f.setFocus(g.target.x,g.target.z),S.update(h,g,C,d.domElement.height),V.length=0,_)for(const $ of _.centres())V.push($);const R=T.targetPos;R&&V.push({x:R.x,y:R.y+.6,z:R.z,r:1.9}),lt!=null&&lt.cell&&lt.known&&!lt.solid&&V.push({x:lt.point.x,y:Ne(lt.cell)+.6,z:lt.point.z,r:1.7}),m.update(h,g.mode==="chase"&&zt?V:[]),A==null||A.update(),E.render();const U=performance.now()-ht;vt.last=U,vt.sum+=U,vt.n++,vt.max=Math.max(vt.max,U),st=requestAnimationFrame(Tt)}const Et={renderer:d,camera:h,rig:g,board:f,composer:E,map:t,bloom:M,markers:T,scene:p,cut:m,pointer:xt,fogPass:y,handlesSelect:!1,on:k,pick:B,repick:bt,addLineMaterial:v,compass:A,get actorsView(){return _},get lastPick(){return lt},setKnowledge(ht){Z=ht},ensureActorsView(){return _??(_=Iv({scene:p,map:t,addLineMaterial:v}))},setMode(ht,I){I&&g.goal.set(I.x,0,I.z),g.setMode(ht),ht==="overview"&&I&&g.focus(I.x,I.z,150)},setGlow(ht,I,C){var R;M.strength=ht,M.enabled=ht>.001,(R=f.setGlowLevel)==null||R.call(f,ht),I!==void 0&&(M.radius=I),C!==void 0&&(M.threshold=C)},applySettings(ht){g.applySettings(ht),this.setGlow(ht.glow,ht.bloomRadius,ht.bloomThreshold),S.setDensity(ht.atmosphere??1),y==null||y.setShroud(ht.shroud??1),T.chevrons.configure(ht),zt=ht.cutaway},start(){pt||(pt=!0,et.getDelta(),Tt())},stop(){pt=!1,cancelAnimationFrame(st)},takeFrameStats(){const ht={...vt,mean:vt.sum/Math.max(1,vt.n)};return vt.n=vt.sum=vt.max=0,ht},measureScene(){d.info.reset(),d.setRenderTarget(null),d.render(p,h);const ht=d.info.render;return{calls:ht.calls,triangles:ht.triangles,lines:ht.lines,points:ht.points,geometries:d.info.memory.geometries,textures:d.info.memory.textures}},dispose(){pt=!1,cancelAnimationFrame(st),H==null||H.disconnect(),e||removeEventListener("resize",G),i.removeEventListener("pointermove",Pt),i.removeEventListener("pointerleave",yt),i.removeEventListener("click",Dt),i.removeEventListener("contextmenu",L),X(),g.dispose(),A==null||A.dispose(),E.dispose(),d.dispose(),d.forceContextLoss()}};return Et}function Fv({stage:i,actors:t,canvas:e,embedded:n=!1,onStatus:s,shows:r=null,keys:o=()=>null}){const a=i.rig,l=i.ensureActorsView();i.handlesSelect=!0;let c=null,u=null,d=0,p="avatar",h=!1;const g=()=>t.snapshot()[p],x=()=>s==null?void 0:s({controlled:p,companionMode:t.snapshot().companion.mode,camera:a.mode,followHeading:a.followHeading}),m=i.on("select",(y,M)=>{!M||!M.point||(c={x:M.point.x,z:M.point.z,cell:y??null,known:M.known!==!1})}),f=n?e:window,S=y=>n?!0:y.target===document.body,b=hv(o),v=y=>{!S(y)||y.ctrlKey||y.metaKey||y.altKey||y.repeat||b.handle(y)&&y.code==="Tab"&&y.preventDefault()};f.addEventListener("keydown",v),b.bind("possess",()=>{p=p==="avatar"?"companion":"avatar",t.possess(p),_(),x()}),b.bind("companionHold",()=>{const y=t.snapshot().companion.mode;t.commandCompanion({type:y==="follow"?"hold":"follow"}),x()}),b.bind("stop",()=>{_(),c=null}),b.bind("overview",()=>T()),b.bind("camBehind",()=>queueMicrotask(x));function T(){const y=g();i.setMode(a.mode==="chase"?"overview":"chase",{x:y.x,z:y.z}),x()}function _(){u=null,i.markers.clearTarget(),i.board.select.set(null)}const w={axis:{x:0,z:0},moveTo:null,stop:!1,aim:null,run:!1},E=i.on("frame",(y,M)=>{const A=a.keys;if(w.axis.x=w.axis.z=0,a.mode==="chase"){const{sx:z,sy:B}=vh(A,o());if(z||B){const Z=Math.hypot(z,B);a.toWorldAxis(z/Z,B/Z,w.axis),_()}}w.run=rs(A,"run",o());const G=i.lastPick;if(w.aim=G&&G.known!==!1&&!G.solid?{x:G.point.x,z:G.point.z}:null,w.moveTo=null,c){const z=c;c=null;const Z=z.known&&(!z.cell||z.cell.solid)?{ok:!1}:t.commandAvatarTo(z.x,z.z);(Z==null?void 0:Z.ok)===!1&&!z.known?u=null:(Z==null?void 0:Z.ok)===!1?(d=.5,i.board.select.set(z.cell,{blocked:!0}),i.markers.clearTarget(),u=null):(u={x:z.x,z:z.z,cell:z.cell},i.board.select.set(z.known?z.cell:null),i.markers.setTarget(z.x,Ne(z.known?z.cell:null),z.z))}d>0&&(d-=y,d<=0&&!u&&i.board.select.set(null)),h||t.update(y,w);const H=t.snapshot();p=H.controlled??p,l.sync(H,M,y,r);const j=H[p],tt=j.render??j;a.mode==="chase"&&a.follow(tt.x,tt.z,tt.heading);const k=t.path(p);k.length?i.markers.setPath([{x:j.x,z:j.z},...k],Ne(i.map.cells[j.cell])+.12):(i.markers.setPath([]),u&&d<=0&&_())});return x(),{actors:t,toggleView:T,status:x,bind:b.bind,setPaused(y){h=!!y},get paused(){return h},get controlled(){return p},dispose(){m(),E(),f.removeEventListener("keydown",v)}}}const Ov=2;function Bv({world:i,focus:t,heading:e,opts:n,loaded:s}){const r=i.ringPlan(t,{...n,loaded:s,maxLoad:1/0,maxUnload:1/0,ahead:e&&n.aheadBias>0?{dir:e,bias:n.aheadBias}:void 0});return{steps:r.steps.filter(o=>o.tier==="nav"||o.tier==="render"),drop:[...r.drop.render,...r.unload],ready:r.ready,plan:r}}function kv({map:i,cut:t,budgetMs:e=5,onChunk:n,policy:s=Bv,ring:r={}}){const o={navRadius:li.navRadius.value,renderRadius:li.renderRadius.value,thickness:li.thickness.value,aheadBias:li.aheadBias.value,...r},a=i.world,l=new We,c=[],u=new Map,d={v:lo},{floor:p,floorMat:h}=dh(l),{hover:g,select:x}=fh({group:l,lineMats:c}),m=new Map;let f=null,S=null,b=null,v=!0,T=null,_=null;const w=(k,z,B)=>_?_(k,z,B):!0;let E=[],y={w:1,h:1};const M={chunksBuilt:0,chunksDropped:0,buildMs:0,maxItemMs:0,lastFrameMs:0,queued:0,plans:0,planMs:0,ready:!1};function A(){const k=performance.now();if(v=!1,S){const Z=f.x-S.x,nt=f.z-S.z,xt=Math.hypot(Z,nt);if(xt>.5){const Rt=Z/xt,Lt=nt/xt;b=b?{x:b.x*.5+Rt*.5,z:b.z*.5+Lt*.5}:{x:Rt,z:Lt}}}S={x:f.x,z:f.z};const z={nav:i.sectors.map(Z=>Z.key),render:[...m.keys()].map(Z=>i.sectors[Z].key)},B=s({world:a,focus:f,heading:b,opts:o,loaded:z});T=B.plan??B,E=B.steps.map(Z=>({kind:Z.tier==="nav"?"nav":"mesh",u:Z.u,v:Z.v,d:Z.d}));for(const[Z,nt]of B.drop){const xt=i.has(Z,nt),Rt=xt&&m.get(xt.id);Rt&&(l.remove(Rt.board.group),Rt.board.dispose(),m.delete(xt.id),M.chunksDropped++)}M.queued=E.length,M.ready=!!B.ready,M.plans++,M.planMs+=performance.now()-k}function G(k){const z=i.sector(k.u,k.v);if(k.kind==="nav"||m.has(z.id))return;for(const nt of a.sectorGeo(z.u,z.v).nbrs){if(!a.coarse.inBounds(nt.u,nt.v))continue;const xt=i.sector(nt.u,nt.v);if(!xt.cut){i.prepare(xt),E.unshift(k);return}}i.prepare(z);const B=i.chunkView(z),Z=ph(B,{cut:t,chunk:{shared:u,lineMats:c,shows:w,glowRef:d}});Z.group.traverse(nt=>{(nt.isMesh&&!nt.isInstancedMesh||nt.isLineSegments2)&&(nt.frustumCulled=!0)});for(const nt of c)nt.resolution.set(y.w,y.h);l.add(Z.group),m.set(z.id,{board:Z,d:k.d}),M.chunksBuilt++,n==null||n(z,Z)}function H(k=e){const z=performance.now();for(;E.length;){const B=E.shift(),Z=performance.now();G(B);const nt=performance.now()-Z;if(M.buildMs+=nt,M.maxItemMs=Math.max(M.maxItemMs,nt),performance.now()-z>k)break}M.queued=E.length,M.lastFrameMs=performance.now()-z}function j(k,z){f={x:k,z},(v||!S||Math.hypot(k-S.x,z-S.z)>Ov)&&A()}const tt=[];return{group:l,hover:g,select:x,lineMats:c,floorMat:h,map:i,stats:M,chunks:m,settle(k,z,B=o.renderRadius){j(k,z);const Z=E.filter(nt=>nt.d<=B);for(E=E.filter(nt=>nt.d>B);Z.length;)for(E.unshift(...Z.splice(0));E.length&&E[0].d<=B;)G(E.shift());M.queued=E.length},drain(){H(1e9)},pump:H,configure(k){let z=!1;for(const B of Object.keys(o))Number.isFinite(k==null?void 0:k[B])&&k[B]!==o[B]&&(o[B]=k[B],z=!0);z&&(v=!0,f&&A())},get ring(){return{...o}},get lastPlan(){return T},setFocus(k,z){p.position.set(k,-.05,z),h.uniforms.uFocus.value.set(k,z),j(k,z)},update(k){H();for(const z of m.values())z.board.update(k);g.tick(k),x.tick(k);for(const z of tt)z(k)},resize(k,z){y={w:k,h:z};for(const B of c)B.resolution.set(k,z)},setShows(k){_=k},setGlowLevel(k){d.v=k;for(const z of m.values())z.board.setGlowLevel(k)},get focus(){return f},dispose(){for(const k of m.values())k.board.dispose();m.clear()}}}class yh{constructor(t){this.a=[],this.cmp=t}get size(){return this.a.length}peek(){return this.a[0]}push(t){const e=this.a,n=this.cmp;let s=e.length;for(e.push(t);s>0;){const r=s-1>>1;if(n(e[s],e[r])>=0)break;[e[s],e[r]]=[e[r],e[s]],s=r}}pop(){const t=this.a,e=this.cmp,n=t[0],s=t.pop();if(t.length){t[0]=s;let r=0;for(;;){const o=2*r+1,a=o+1;let l=r;if(o<t.length&&e(t[o],t[l])<0&&(l=o),a<t.length&&e(t[a],t[l])<0&&(l=a),l===r)break;[t[r],t[l]]=[t[l],t[r]],r=l}}return n}}const $s=(i,t)=>{var e;return(i.cell?i.cell(t):(e=i.cells)==null?void 0:e[t])??null},Zo=(i,t)=>{var e,n;return i.gateLocked?!!i.gateLocked(t):!!((n=(e=i.gates)==null?void 0:e[t])!=null&&n.locked)};function Gv(){const i=new Map;let t=0;function e(g,x=!0){let m=i.get(g);return!m&&x&&(m={key:g,bits:new Uint8Array(16),n:0},i.set(g,m)),m}const n=(g,x)=>!!g&&x>>3<g.bits.length&&(g.bits[x>>3]&1<<(x&7))!==0;function s(g,x){const m=x>>3;if(m>=g.bits.length){let S=g.bits.length;for(;S<=m;)S*=2;const b=new Uint8Array(S);b.set(g.bits),g.bits=b}const f=1<<(x&7);return g.bits[m]&f?!1:(g.bits[m]|=f,g.n++,t++,!0)}function r(g){const x=[];if(!g)return x;for(let m=0;m<g.bits.length;m++){const f=g.bits[m];if(f)for(let S=0;S<8;S++)f&1<<S&&x.push(m*8+S)}return x}const o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=new Map([...o].map((g,x)=>[g,x]));function l(g){let x="";for(let m=0;m<g.length;m+=3){const f=g[m],S=g[m+1]??0,b=g[m+2]??0;x+=o[f>>2]+o[(f&3)<<4|S>>4]+(m+1<g.length?o[(S&15)<<2|b>>6]:"=")+(m+2<g.length?o[b&63]:"=")}return x}function c(g){const x=Math.floor(g.length*3/4)-(g.endsWith("==")?2:g.endsWith("=")?1:0),m=new Uint8Array(x);let f=0;for(let S=0;S<g.length;S+=4){const b=a.get(g[S]),v=a.get(g[S+1]),T=g[S+2]==="="?0:a.get(g[S+2]),_=g[S+3]==="="?0:a.get(g[S+3]);f<x&&(m[f++]=b<<2|v>>4),f<x&&(m[f++]=(v&15)<<4|T>>2),f<x&&(m[f++]=(T&3)<<6|_)}return m}function u(g=null){const x={};for(const m of[...i.keys()].sort()){const f=i.get(m);let S=f.bits.length;for(;S>0&&f.bits[S-1]===0;)S--;S&&(x[m]=l(f.bits.subarray(0,S)))}return{format:"boundless-fog-memory",version:1,world:g,chunks:x}}function d(g){if(!g||g.format!=="boundless-fog-memory"||g.version!==1||typeof g.chunks!="object")throw new Error("not a fog memory");i.clear();for(const x of Object.keys(g.chunks).sort()){const m=c(g.chunks[x]),f=Math.max(16,m.length),S={key:x,bits:new Uint8Array(f),n:0};S.bits.set(m);for(let b=0;b<S.bits.length;b++){let v=S.bits[b];for(;v;)S.n+=v&1,v>>=1}i.set(x,S)}return t++,[...i.keys()]}function p(){let g=0,x=0;for(const m of i.values())g+=m.n,x+=m.bits.length;return{chunks:i.size,cells:g,bytes:x}}return{chunk:e,test:n,set:s,locals:r,serialise:u,restore:d,stats:p,clear:()=>{i.clear(),t++},chunks:i,get version(){return t}}}const au=1e-5,Qi=32,os=i=>Math.round(i*200);function Hv(i,t,e,n,s=null){const r=i.cellAt(t,e);if(!r||s&&s(r))return{start:null,cells:[]};const o=new Map,a=p=>{let h=o.get(p);return h===void 0&&(h=$s(i,p),o.set(p,h)),h},l=new Set([r.id]),c=[],u=[r.id],d=p=>{if(!(!p||l.has(p.id)||Math.hypot(p.cx-t,p.cz-e)>n+(p.radius??3))){if(s&&s(p)){l.add(p.id);return}l.add(p.id),u.push(p.id)}};for(let p=0;p<u.length;p++){const h=a(u[p]);if(!h)continue;c.push(h);for(const x of h.neighbors)d(a(x.id));const g=h.poly;if(!(!g||g.length<3||!h.neighbors.some(x=>x.mid)))for(let x=0;x<g.length;x++){const m=g[x],f=g[(x+1)%g.length],S=(m[0]+f[0])/2,b=(m[1]+f[1])/2;if(Math.hypot(S-t,b-e)>n+1)continue;const v=f[0]-m[0],T=f[1]-m[1],_=v*v+T*T||1;let w=!1;for(const y of h.neighbors){if(!y.mid)continue;const M=((y.mid[0]-m[0])*v+(y.mid[1]-m[1])*T)/_;if(!(M<-.01||M>1.01)&&Math.hypot(m[0]+M*v-y.mid[0],m[1]+M*T-y.mid[1])<.1){w=!0;break}}if(w)continue;const E=Math.hypot(S-h.cx,b-h.cz)||1;d(i.cellAt(S+(S-h.cx)/E*.25,b+(b-h.cz)/E*.25))}}return{start:r,cells:c}}function Vv(i){const t=new Map,e=[];for(const n of i){if(!n.solid||!n.poly||n.poly.length<3)continue;const s=n.poly;for(let r=0;r<s.length;r++){const o=s[r],a=s[(r+1)%s.length],l=`${os(o[0])},${os(o[1])}`,c=`${os(a[0])},${os(a[1])}`,u=l<c?`${l}|${c}`:`${c}|${l}`,d=t.get(u);d===void 0?(t.set(u,e.length),e.push([o[0],o[1],a[0],a[1],n.cx,n.cz])):d>=0&&(e[d]=null,t.set(u,-1))}}return e.filter(Boolean)}function Wv(i,t,e,n,s){const r=s[2]-s[0],o=s[3]-s[1],a=e*o-n*r;if(Math.abs(a)<1e-12)return 1/0;const l=s[0]-i,c=s[1]-t,u=(l*o-c*r)/a,d=(l*n-c*e)/a;return u>1e-9&&d>=-1e-9&&d<=1+1e-9?u:1/0}function Xv(i,t,e,n){const s=e/Math.cos(Math.PI/Qi),r=[];for(const p of n){const h=(p[0]+p[2])/2,g=(p[1]+p[3])/2;if((i-h)*(h-p[4])+(t-g)*(g-p[5])<=0)continue;const x=p[2]-p[0],m=p[3]-p[1],f=x*x+m*m||1,S=Math.max(0,Math.min(1,((i-p[0])*x+(t-p[1])*m)/f));Math.hypot(p[0]+S*x-i,p[1]+S*m-t)<=e+1e-6&&r.push(p)}const o=r.slice();for(let p=0;p<Qi;p++){const h=p/Qi*Math.PI*2,g=(p+1)/Qi*Math.PI*2;o.push([i+s*Math.cos(h),t+s*Math.sin(h),i+s*Math.cos(g),t+s*Math.sin(g)])}const a=[],l=new Set;for(const p of r)for(let h=0;h<4;h+=2){const g=`${os(p[h])},${os(p[h+1])}`;if(l.has(g))continue;l.add(g);const x=Math.atan2(p[h+1]-t,p[h]-i);a.push(x-au,x,x+au)}for(let p=0;p<Qi;p++)a.push((p+.5)/Qi*Math.PI*2-Math.PI);a.sort((p,h)=>p-h);const c=[],u=[];let d=-1/0;for(const p of a){if(p-d<1e-9)continue;d=p;const h=Math.cos(p),g=Math.sin(p);let x=1/0;for(const m of o){const f=Wv(i,t,h,g,m);f<x&&(x=f)}x<1/0&&(c.push([i+h*x,t+g*x]),u.push(p))}return{pts:c,ang:Float64Array.from(u),ox:i,oz:t}}function lu(i,t,e){const{pts:n,ang:s,ox:r,oz:o}=i,a=n.length;if(a<3)return!1;const l=Math.atan2(e-o,t-r);let c=0,u=a;for(;c<u;){const x=c+u>>1;s[x]<=l?c=x+1:u=x}const d=(c-1+a)%a,p=(d+1)%a,h=n[d],g=n[p];return(g[0]-h[0])*(e-h[1])-(g[1]-h[1])*(t-h[0])>=-1e-9}function qv(i){let t=1/0,e=1/0,n=-1/0,s=-1/0;for(const[r,o]of i)r<t&&(t=r),r>n&&(n=r),o<e&&(e=o),o>s&&(s=o);return{x0:t,z0:e,x1:n,z1:s}}function Yv(i,t,e){const n=[],s=i.poly??[];if(!i.solid){n.push([i.cx,i.cz]);for(const[o,a]of s)n.push([i.cx+(o-i.cx)*.75,i.cz+(a-i.cz)*.75]);return n}const r=(o,a)=>{const l=Math.hypot(t-o,e-a)||1;return[o+(t-o)/l*.06,a+(e-a)/l*.06]};for(let o=0;o<s.length;o++){const a=s[o],l=s[(o+1)%s.length];n.push(r((a[0]+l[0])/2,(a[1]+l[1])/2),r(a[0],a[1]))}return n}const En=0,ri=1,kr=2,Os=2,Bs=4194304,ks=256,$v={radius:22,moveEps:.5,pingTtl:6,pingMinStrength:.15,maxEvents:2e3,weight:1,falloff:.35,exploreLevel:.04,trackLevels:!1,worldId:void 0,keyOf:void 0,idOf:void 0},jv=i=>i*i*(3-2*i);function Kv(i,t={}){const e={...$v,...t},n=Gv();let s=0,r=0;const o=[],a=new Map;let l=0;function c(O){let K=a.get(O);return K||(K={idx:o.length,key:O,ch:n.chunk(O,!1),unloaded:!1,kind:-1,n:0},o.push(K),a.set(O,K)),K}const u=new Map,d=new Map;function p(O){var F;if(e.keyOf){const ut=e.keyOf(O)[0];return c(ut)}if(O.sector!==void 0&&typeof O.local=="number"){let ut=u.get(O.sector);if(!ut){const gt=(F=i.sectors)==null?void 0:F[O.sector];ut=c(gt&&typeof gt.u=="number"?`${gt.u},${gt.v}`:`s${O.sector}`),u.set(O.sector,ut)}return ut}const K=Math.floor(O.id/ks);let J=d.get(K);return J||(J=c(`k${K}`),d.set(K,J)),J}const h=O=>e.keyOf?e.keyOf(O)[1]:O.sector!==void 0&&typeof O.local=="number"?O.local:(O.id%ks+ks)%ks;let g=new Map,x=-1;function m(O){const K=i.sectors;if(!K)return null;if(K.length!==x){g=new Map;for(const J of K)typeof J.u=="number"&&g.set(`${J.u},${J.v}`,J);x=K.length}return g.get(O)??null}function f(O){if(O.kind===-1){const J=/^k(-?\d+)$/.exec(O.key);J?(O.kind=1,O.n=+J[1]):O.kind=0}if(O.kind===1)return O.n*ks;const K=m(O.key);return K?K.base:null}function S(O,K){if(e.idOf)return e.idOf(O.key,K);const J=f(O);return J===null?null:J+K}let b=256;const v={id:new Float64Array(b),info:new Int32Array(b),local:new Int32Array(b),flags:new Uint8Array(b),seen:new Uint8Array(b),level:new Uint8Array(b),until:new Float64Array(b),n:0},T=new Map,_=[];let w=0;function E(O){let K=T.get(O.id);if(K===void 0){if(_.length)K=_.pop();else{if(v.n===b){b*=2;const J=(F,ut)=>{const gt=new F(b);return gt.set(ut),gt};v.id=J(Float64Array,v.id),v.info=J(Int32Array,v.info),v.local=J(Int32Array,v.local),v.flags=J(Uint8Array,v.flags),v.seen=J(Uint8Array,v.seen),v.level=J(Uint8Array,v.level),v.until=J(Float64Array,v.until)}K=v.n++}v.id[K]=O.id,v.info[K]=p(O).idx,v.local[K]=h(O),v.flags[K]=0,v.seen[K]=0,v.level[K]=0,v.until[K]=0,T.set(O.id,K),w++}return K}function y(O){T.delete(v.id[O]),v.id[O]=NaN,v.seen[O]=0,v.flags[O]=0,v.level[O]=0,v.until[O]=0,_.push(O),w--}const M=O=>{const K=o[v.info[O]].ch;return!!K&&n.test(K,v.local[O])},A=O=>v.seen[O]>0?kr:M(O)||v.flags[O]&Os&&v.until[O]>s?ri:En,G=O=>v.info[O]*Bs+v.local[O],H=(O,K)=>{const J=T.get(O);if(J!==void 0)return A(J);const F=o[Math.floor(K/Bs)];return F.ch&&n.test(F.ch,K-F.idx*Bs)?ri:En},j=new Map,tt=new Map;let k=[];const z=(O,K)=>{k.push({type:O,...K}),k.length>e.maxEvents&&(k=k.slice(-Math.floor(e.maxEvents*.75)))},B=new Map,Z=new yh((O,K)=>O.until-K.until),nt={updates:0,recomputes:0,cellsRead:0,lastMs:0},xt=O=>{let K=0;for(const J of B.values()){const F=J.cells.get(O);F!==void 0&&F>K&&(K=F)}return K};function Rt(O){const K=v.seen[O]>0?xt(O):0;e.trackLevels&&K>>4!==v.level[O]>>4&&tt.set(v.id[O],G(O)),v.level[O]=K}function Lt(O){v.seen[O]===0&&!(v.flags[O]&Os)&&y(O)}const lt=()=>Math.max(1,Math.ceil(e.exploreLevel*255));function bt(O){const K=l?P=>p(P).unloaded:null,{cells:J,start:F}=Hv(i,O.x,O.z,O.radius,K);nt.recomputes++,nt.cellsRead+=J.length;const ut=new Map;let gt=null;if(F&&!F.solid){gt=Xv(O.x,O.z,O.radius,Vv(J));const P=qv(gt.pts),N=O.radius,Y=Math.max(1e-6,e.falloff*N),at=lt();for(const ot of J){const Mt=Math.hypot(ot.cx-O.x,ot.cz-O.z);if(Mt>N+(ot.radius??3)+1)continue;const wt=Math.max(1,typeof e.weight=="function"?e.weight(ot,O):e.weight),Ft=Math.min(1,Math.max(0,(N-Math.max(0,Mt-.5*(ot.radius??3))*wt)/Y)),It=Math.round(255*jv(Ft));if(It<at)continue;let kt=!1;for(const[Yt,se]of Yv(ot,O.x,O.z))if(!(Yt<P.x0||Yt>P.x1||se<P.z0||se>P.z1)&&lu(gt,Yt,se)){kt=!0;break}kt&&ut.set(E(ot),It)}O.box=P}else O.box=null,F&&ut.set(E(F),255);const At=[];for(const P of ut.keys()){if(O.cells.has(P))continue;const N=A(P);v.seen[P]++,N!==kr&&j.set(v.id[P],G(P));const Y=o[v.info[P]];Y.ch||(Y.ch=n.chunk(Y.key)),n.set(Y.ch,v.local[P])&&At.push(v.id[P])}const q=[];for(const P of O.cells.keys())ut.has(P)||(v.seen[P]--,v.seen[P]===0&&j.set(v.id[P],G(P)),q.push(P));O.cells=ut;for(const P of ut.keys())Rt(P);for(const P of q)Rt(P),Lt(P);O.poly=gt,O.ax=O.x,O.az=O.z,r++,At.length&&z("revealed",{t:s,cells:At,by:O.id,source:"vision"})}function Pt(O,K=s){const J=performance.now();s=K,nt.updates++;let F=0;const ut=k.length,gt=new Set;for(const q of O){gt.add(q.id);const P=q.radius??e.radius;let N=B.get(q.id);N||(N={id:q.id,x:q.x,z:q.z,radius:P,own:q.radius!==void 0,cells:new Map,poly:null,box:null,ax:NaN,az:NaN},B.set(q.id,N)),N.own=q.radius!==void 0,N.x=q.x,N.z=q.z,P!==N.radius&&(N.radius=P,N.ax=NaN),Math.hypot(N.x-N.ax,N.z-N.az)<e.moveEps||(bt(N),F++)}for(const[q,P]of B)if(!gt.has(q)){B.delete(q);for(const N of P.cells.keys())v.seen[N]--,v.seen[N]===0&&j.set(v.id[N],G(N)),Rt(N),Lt(N);r++}X(K),nt.lastMs=performance.now()-J;let At=0;for(let q=ut;q<k.length;q++)k[q].type==="revealed"&&(At+=k[q].cells.length);return{recomputed:F,revealed:At}}function yt(){let O=0;for(const K of B.values())K.own||(K.radius=e.radius),bt(K),O++;return{recomputed:O}}function Dt(O,{ttl:K=e.pingTtl,t:J=s}={}){const F=[];for(const ut of O){const gt=$s(i,ut);if(!gt||l&&p(gt).unloaded)continue;const At=E(gt),q=A(At);v.flags[At]|=Os;const P=J+K;P>v.until[At]&&(v.until[At]=P,Z.push({until:P,i:At,id:ut})),q===En&&(j.set(ut,G(At)),F.push(ut))}return F.length&&(r++,z("revealed",{t:J,cells:F,by:"scan",source:"scan"})),F.length}function L(O,K={}){const J=K.minStrength??e.pingMinStrength,F=[];for(const ut of O)ut.type==="cell-reached"&&!ut.dead&&ut.strength>=J&&!(ut.generation>0)&&F.push(ut.cell);return F.length?Dt(F,{ttl:K.ttl,t:s}):0}function X(O=s){for(s=O;Z.size&&Z.peek().until<=O;){const{until:K,i:J,id:F}=Z.pop();v.id[J]!==F||v.until[J]>K||!(v.flags[J]&Os)||(v.flags[J]&=~Os,A(J)===En&&(j.set(F,G(J)),r++),Lt(J))}}const et=O=>{const K=T.get(O.id);if(K!==void 0)return A(K);const J=p(O);return J.ch&&n.test(J.ch,h(O))?ri:En};function st(O){const K=T.get(O);if(K!==void 0)return A(K);const J=$s(i,O);return J?et(J):En}function pt(O){const K=$s(i,O);if(!K)return!1;const J=p(K);return!!J.ch&&n.test(J.ch,h(K))}const V=O=>{const K=T.get(O);return K===void 0?0:v.level[K]};function zt(O,K){const J=a.get(O);if(!J||!J.ch||!n.test(J.ch,K))return En;if(!J.unloaded){const F=S(J,K),ut=F===null?void 0:T.get(F);if(ut!==void 0&&v.seen[ut]>0)return kr}return ri}const vt=(O,K)=>{const J=a.get(O);return!!J&&!!J.ch&&n.test(J.ch,K)},Tt=O=>[p(O).key,h(O)];function Et(O,K){for(const J of B.values())if(!(!J.box||O<J.box.x0||O>J.box.x1||K<J.box.z0||K>J.box.z1)&&J.poly&&lu(J.poly,O,K))return!0;return!1}function Bt(O,K,J="dynamic"){if(J==="dynamic")return Et(O,K);const F=i.cellAt(O,K);if(!F)return!1;if(J==="static"){const ut=p(F);return!!ut.ch&&n.test(ut.ch,h(F))}return et(F)>=ri}function ht(O){const K=[];for(const F of O){const ut=c(F);ut.unloaded||(ut.unloaded=!0,l++,K.push(F))}if(!K.length)return 0;const J=new Set(K.map(F=>a.get(F).idx));for(let F=0;F<v.n;F++)if(!(v.id[F]!==v.id[F]||!J.has(v.info[F]))){for(const ut of B.values())ut.cells.delete(F);y(F)}for(const F of B.values())F.ax=NaN;return r++,z("unloaded",{t:s,keys:K}),K.length}function I(O){const K=[];for(const J of O){const F=a.get(J);if(!(!F||!F.unloaded)&&(F.unloaded=!1,l--,K.push(J),!!F.ch))for(const ut of n.locals(F.ch)){const gt=S(F,ut);gt!==null&&j.set(gt,F.idx*Bs+ut)}}if(!K.length)return 0;for(const J of B.values())J.ax=NaN;return r++,z("loaded",{t:s,keys:K}),K.length}const C=O=>{const K=a.get(O);return!K||!K.unloaded},R=()=>e.worldId??i.seed??null;function U(){return n.serialise(R())}function $(O,{ignoreWorld:K=!1}={}){const J=typeof O=="string"?JSON.parse(O):O,F=R();if(!K&&F!==null&&J&&J.world!==null&&J.world!==void 0&&J.world!==F)throw new Error(`fog memory is for world ${J.world}, not ${F}`);n.restore(J);for(const ut of n.chunks.keys())c(ut);for(const ut of o)ut.ch=n.chunk(ut.key,!1),ut.unloaded=!1;l=0;for(const ut of T.values())v.id[ut]=NaN;T.clear(),_.length=0,v.n=0,w=0;for(const ut of B.values())ut.cells=new Map,ut.poly=null,ut.box=null,ut.ax=NaN;return j.clear(),tt.clear(),r++,z("restored",{t:s,chunks:n.stats().chunks,cells:n.stats().cells}),n.stats()}function W(){X(s);let O=0;for(const At of o)At.ch&&!At.unloaded&&(O+=At.ch.n);const K=w+O,J=new Float64Array(K),F=new Uint8Array(K),ut=new Uint8Array(K);let gt=0;for(let At=0;At<v.n;At++)v.id[At]===v.id[At]&&(J[gt]=v.id[At],F[gt]=A(At),ut[gt]=v.level[At],gt++);for(const At of o)if(!(!At.ch||At.unloaded))for(const q of n.locals(At.ch)){const P=S(At,q);P===null||T.has(P)||(J[gt]=P,F[gt]=ri,gt++)}return{t:s,version:r,count:gt,cell:gt===K?J:J.slice(0,gt),state:gt===K?F:F.slice(0,gt),level:gt===K?ut:ut.slice(0,gt)}}function St(){X(s);const O=new Float64Array(j.size),K=new Uint8Array(j.size),J=new Uint8Array(j.size);let F=0;for(const[ut,gt]of j){if(o[Math.floor(gt/Bs)].unloaded)continue;const At=T.get(ut);O[F]=ut,K[F]=H(ut,gt),J[F]=At===void 0?0:v.level[At],F++}return j.clear(),{count:F,cell:F===O.length?O:O.slice(0,F),state:F===O.length?K:K.slice(0,F),level:F===O.length?J:J.slice(0,F)}}function ct(){const O=tt.size,K=new Float64Array(O),J=new Uint8Array(O);let F=0;for(const ut of tt.keys()){const gt=T.get(ut);K[F]=ut,J[F]=gt===void 0?0:v.level[gt],F++}return tt.clear(),{count:O,cell:K,level:J}}function mt(){const O=[];for(const K of o){if(!K.ch||!K.ch.n)continue;const J=n.locals(K.ch);!K.unloaded&&S(K,J[0])!==null||O.push({key:K.key,count:J.length,locals:Int32Array.from(J)})}return O}function Ct(O){const K=B.get(O);if(!K||!K.poly)return new Float32Array(0);const J=new Float32Array(K.poly.pts.length*2);return K.poly.pts.forEach(([F,ut],gt)=>{J[2*gt]=F,J[2*gt+1]=ut}),J}return{update:Pt,invalidate:yt,remember:Dt,noteScanEvents:L,tick:X,visibility:st,isExplored:pt,canSee:Et,canShow:Bt,snapshot:W,drainChanges:St,vision:Ct,drainEvents:()=>{const O=k;return k=[],O},levelAt:V,drainLevels:ct,visibilityKey:zt,isExploredKey:vt,keyOfCell:Tt,unload:ht,load:I,isLoaded:C,ghosts:mt,serialise:U,serialize:U,restore:$,get version(){return r},get time(){return s},get memory(){return{...n.stats(),active:w}},get stats(){return{...nt,tracked:w,viewers:B.size,explored:n.stats().cells}},config:e,UNSEEN:En,REMEMBERED:ri,VISIBLE:kr}}const be=2,ee=512,ii=.42,Zv=.62,cu=32,Jv=i=>i*i*(3-2*i),bn=i=>(i%ee+ee)%ee;function Qv({map:i,options:t={},stage:e=null}){const n={radius:t.radius??ln.sightRadius,up:ln.revealRate,down:(1-ii)/ln.ghostFade,hold:1.8},s=Kv(i,{moveEps:ln.revealStep,falloff:ln.sightSoft,...t,radius:n.radius}),r=z=>i.cell?i.cell(z):i.cells[z],o=new Float32Array(ee*ee),a=new Float32Array(ee*ee),l=new Float32Array(ee*ee),c=new Float32Array(ee*ee),u=new Uint8Array(ee*ee),d=new eh(u,ee,ee,eo,Pn);d.magFilter=d.minFilter=xn,d.wrapS=d.wrapT=Kr,d.generateMipmaps=!1,d.needsUpdate=!0;let p=0,h=0,g=!1,x=!0;const m=[],f=new Map;let S=-1,b=0;const v={rasters:0,texelsRastered:0,easeTexels:0,slides:0,refilled:0,lastMs:0,maxUp:0,maxDown:0};function T(z,B,Z){const nt=z.length?Array.isArray(z[0])?z.length:z.length/2:0;if(nt<3)return;const xt=!Array.isArray(z[0]),Rt=new Float64Array(nt),Lt=new Float64Array(nt);let lt=1/0,bt=-1/0;for(let L=0;L<nt;L++)Rt[L]=(xt?z[2*L]:z[L][0])*be,Lt[L]=(xt?z[2*L+1]:z[L][1])*be,Lt[L]<lt&&(lt=Lt[L]),Lt[L]>bt&&(bt=Lt[L]);let Pt=Math.floor(lt),yt=Math.ceil(bt);Z&&(Pt=Math.max(Pt,Z.z0),yt=Math.min(yt,Z.z1-1));const Dt=[];for(let L=Pt;L<=yt;L++){const X=L+.5;Dt.length=0;for(let et=0,st=nt-1;et<nt;st=et++)Lt[et]>X!=Lt[st]>X&&Dt.push(Rt[et]+(X-Lt[et])*(Rt[st]-Rt[et])/(Lt[st]-Lt[et]));Dt.sort((et,st)=>et-st);for(let et=0;et+1<Dt.length;et+=2){let st=Math.ceil(Dt[et]-.5),pt=Math.floor(Dt[et+1]-.5);Z&&(st=Math.max(st,Z.x0),pt=Math.min(pt,Z.x1-1));const V=bn(L)*ee;for(let zt=st;zt<=pt;zt++)B(V+bn(zt),(zt+.5)/be,X/be)}}}const _=(z,B=2)=>{let Z=1/0,nt=1/0,xt=-1/0,Rt=-1/0;for(let Lt=0;Lt<z.length;Lt+=2)z[Lt]<Z&&(Z=z[Lt]),z[Lt]>xt&&(xt=z[Lt]),z[Lt+1]<nt&&(nt=z[Lt+1]),z[Lt+1]>Rt&&(Rt=z[Lt+1]);return{x0:Math.floor(Z*be)-B,z0:Math.floor(nt*be)-B,x1:Math.ceil(xt*be)+B,z1:Math.ceil(Rt*be)+B}},w=(z,B)=>z?B?{x0:Math.min(z.x0,B.x0),z0:Math.min(z.z0,B.z0),x1:Math.max(z.x1,B.x1),z1:Math.max(z.z1,B.z1)}:z:B,E=z=>{m.push({...z,until:b+n.hold})};function y(z){for(let B=z.z0;B<z.z1;B++){const Z=bn(B)*ee;for(let nt=z.x0;nt<z.x1;nt++){const xt=Z+bn(nt);o[xt]=a[xt]=l[xt]=c[xt]=0,u[xt]=0}}}function M(z){const B=s.snapshot();let Z=0;for(let nt=0;nt<B.count;nt++){if(B.state[nt]===En)continue;const xt=r(B.cell[nt]);if(!xt)continue;const Rt=xt.poly;let Lt=1/0,lt=1/0,bt=-1/0,Pt=-1/0;for(const yt of Rt)yt[0]<Lt&&(Lt=yt[0]),yt[0]>bt&&(bt=yt[0]),yt[1]<lt&&(lt=yt[1]),yt[1]>Pt&&(Pt=yt[1]);for(const yt of z)bt*be<yt.x0||Lt*be>yt.x1||Pt*be<yt.z0||lt*be>yt.z1||(T(Rt,Dt=>{a[Dt]<ii&&(a[Dt]=ii,c[Dt]=ii,u[Dt]=Math.round(ii*255))},yt),Z++)}v.refilled+=Z}function A(z,B){const Z=Math.floor(z*be)-ee/2,nt=Math.floor(B*be)-ee/2;if(g&&Math.abs(Z-p)<cu&&Math.abs(nt-h)<cu)return!1;const xt=[];!g||Math.abs(Z-p)>=ee||Math.abs(nt-h)>=ee?xt.push({x0:Z,z0:nt,x1:Z+ee,z1:nt+ee}):(Z>p?xt.push({x0:p+ee,z0:nt,x1:Z+ee,z1:nt+ee}):Z<p&&xt.push({x0:Z,z0:nt,x1:p,z1:nt+ee}),nt>h?xt.push({x0:Z,z0:h+ee,x1:Z+ee,z1:nt+ee}):nt<h&&xt.push({x0:Z,z0:nt,x1:Z+ee,z1:h}));for(const Rt of xt)y(Rt);return p=Z,h=nt,g=!0,M(xt),v.slides++,d.needsUpdate=!0,!0}function G(z){const B=performance.now();let Z=null;for(const nt of z){const xt=s.vision(nt.id),Rt=xt.length?_(xt):null,Lt=f.get(nt.id)??null;Z=w(Z,w(Rt,Lt)),f.set(nt.id,Rt),nt.pts=xt}for(const nt of[...f.keys()])z.some(xt=>xt.id===nt)||(Z=w(Z,f.get(nt)),f.delete(nt));if(Z){for(let nt=Z.z0;nt<Z.z1;nt++){const xt=bn(nt)*ee;for(let Rt=Z.x0;Rt<Z.x1;Rt++)o[xt+bn(Rt)]=0}for(const nt of z){if(!nt.pts.length)continue;const xt=nt.radius??s.config.radius,Rt=Math.max(1e-6,s.config.falloff*xt);let Lt=0;T(nt.pts,(lt,bt,Pt)=>{const yt=Math.hypot(bt-nt.x,Pt-nt.z),Dt=Jv(Math.min(1,Math.max(0,(xt-yt)/Rt)));Dt>o[lt]&&(o[lt]=Dt);const L=Dt<ii?Dt:ii;L>a[lt]&&(a[lt]=L),Lt++},Z),v.texelsRastered+=Lt}v.rasters++,E(Z),v.lastRaster=performance.now()-B}}function H(){const z=s.drainChanges();for(let B=0;B<z.count;B++){const Z=r(z.cell[B]);if(!Z)continue;const nt=z.state[B]===ri&&!s.isExplored(z.cell[B]),xt=z.state[B]===En;if(!nt&&!xt)continue;const Rt=nt?Zv:0;let Lt=1/0,lt=1/0,bt=-1/0,Pt=-1/0;for(const yt of Z.poly)yt[0]<Lt&&(Lt=yt[0]),yt[0]>bt&&(bt=yt[0]),yt[1]<lt&&(lt=yt[1]),yt[1]>Pt&&(Pt=yt[1]);T(Z.poly,yt=>{l[yt]=Rt}),E({x0:Math.floor(Lt*be)-1,z0:Math.floor(lt*be)-1,x1:Math.ceil(bt*be)+1,z1:Math.ceil(Pt*be)+1})}}function j(z){let B=null;for(let lt=m.length-1;lt>=0;lt--)m[lt].until<b?m.splice(lt,1):B=w(B,m[lt]);if(!B)return;const Z=n.up*z,nt=n.down*z;let xt=0,Rt=0,Lt=0;for(let lt=B.z0;lt<B.z1;lt++){const bt=bn(lt)*ee;for(let Pt=B.x0;Pt<B.x1;Pt++){const yt=bt+bn(Pt);let Dt=o[yt];a[yt]>Dt&&(Dt=a[yt]),l[yt]>Dt&&(Dt=l[yt]);const L=c[yt];if(Dt===L)continue;const X=Dt>L?Math.min(Dt,L+Z):Math.max(Dt,L-nt);c[yt]=X;const et=Math.round(X*255);et!==u[yt]&&(u[yt]=et,xt++),X>L?X-L>Rt&&(Rt=X-L):L-X>Lt&&(Lt=L-X)}}v.easeTexels=(B.x1-B.x0)*(B.z1-B.z0),v.maxUp=Rt,v.maxDown=Lt,xt&&(d.needsUpdate=!0)}const tt={fog:s,mask:d,stats:v,get enabled(){return x},setEnabled(z){x=!!z,k==null||k.setEnabled(x)},configure(z={}){let B=!1;return z.sightRadius!==void 0&&z.sightRadius!==n.radius&&(n.radius=z.sightRadius,s.config.radius=z.sightRadius,B=!0),z.sightSoft!==void 0&&z.sightSoft!==s.config.falloff&&(s.config.falloff=z.sightSoft,B=!0),B&&s.invalidate(),z.revealStep!==void 0&&(s.config.moveEps=z.revealStep),z.revealRate!==void 0&&(n.up=z.revealRate),z.ghostFade!==void 0&&(n.down=(1-ii)/Math.max(.05,z.ghostFade),n.hold=Math.max(1.8,z.ghostFade*1.4+.5)),{...n}},get tuning(){return{...n,falloff:s.config.falloff,moveEps:s.config.moveEps}},update(z,B,Z=1/60){const nt=performance.now();if(b+=Z,v.maxUp=v.maxDown=0,!z.length)return;const xt=A(z[0].x,z[0].z);s.update(z,B),(xt||s.version!==S)&&(G(z.map(Rt=>({...Rt}))),S=s.version),H(),j(Z),k==null||k.setWindow(p,h),v.lastMs=performance.now()-nt,v.sightMs=s.stats.lastMs},settle(){for(let z=0;z<c.length;z++){const B=Math.max(o[z],a[z],l[z]);c[z]=B,u[z]=Math.round(B*255)}m.length=0,d.needsUpdate=!0},noteScan(z){return z.length?s.noteScanEvents(z):0},level(z,B){const Z=Math.floor(z*be),nt=Math.floor(B*be);return Z<p||Z>=p+ee||nt<h||nt>=h+ee?0:c[bn(nt)*ee+bn(Z)]},shows(z,B,Z="dynamic"){const nt=tt.level(z,B);return Z==="dynamic"?nt>.5:nt>.05},canShow:(z,B,Z="dynamic")=>s.canShow(z,B,Z),knows(z,B){return tt.level(z,B)>.05||s.canShow(z,B,"static")},dispose(){d.dispose()}};let k=null;return e!=null&&e.fogPass&&(k=e.fogPass,k.setMask(d)),tt}const uu={ping:{start:.4,build:1.6,hold:1,burn:2.2},sweep:{start:.3,build:5,hold:3,burn:5},echo:{start:.7,build:.5,hold:0,burn:2.6}},hu={ping:{speed:14,power:1,env:"ping"},sweep:{speed:9,power:1,env:"sweep"}},wi={active:{power:1,clarity:1,loudness:1,glimpseRadius:0},passive:{power:.45,clarity:.6,loudness:.2,glimpseRadius:2}},fu={default:300,device:150,adversary:355,decoy:45,unknown:300},$a={echo:{reveal:"on-arrival",playback:1,traceFloor:.05,scrambleJitter:1.2},floor:.03,hearFloor:.04,maxCells:2500,maxEchoes:16,maxGeneration:2,maxTime:1/0,maxWorkPerAdvance:2e4,echoKeep:64,lookahead:0,maxEvents:4e3,maskMaxCells:400,scrambleHops:3,ringRise:.5,ringTau:2.2},Sh=i=>i<=0?0:i>=1?1:i*i*(3-2*i);function Gs(i,t){return t<0?0:t<i.build?i.start+(1-i.start)*Sh(t/i.build):t<i.build+i.hold?1:Math.exp(-(t-i.build-i.hold)/i.burn)}function t_(i,t,e){return t>e?i.build+i.hold+i.burn*Math.log(t/e):t*i.start>=e?i.build:0}function Jo(i,t,e=$a){if(t<0)return 0;const n=e.ringRise>0?Sh(t/e.ringRise):1;return i*n*Math.exp(-Math.max(0,t-e.ringRise)/e.ringTau)}function ns(i,t){return i==="absorb"?Math.pow(t,1.4):i==="scramble"?.5*t:.3*t}function ts(i,...t){let e=2166136261^i>>>0;const n=t.join("|");for(let s=0;s<n.length;s++)e^=n.charCodeAt(s),e=Math.imul(e,16777619);return e^=e>>>15,e=Math.imul(e,739982445),e^=e>>>12,e=Math.imul(e,695872825),e^=e>>>15,(e>>>0)/4294967296}const es=(i,t,e)=>i<t?t:i>e?e:i,du=Object.freeze({transmission:1,scramble:null,spoofs:[],masks:[]});function e_({nav:i,getCell:t,cfg:e,now:n}){const s=new Map,r=new Map;let o=0;function a(h,g){if(g<h.createdAt||g>=h.expiresAt)return 0;const x=h.expiresAt-g;return x>=h.fade?h.opacity:h.opacity*(x/h.fade)}function l(h){if(h==null)return null;if(typeof h=="object"){const x=i.cellAt(h.x,h.z);return x?{id:x.id,x:h.x,z:h.z}:null}const g=t(h);return g?{id:g.id,x:g.cx,z:g.cz}:null}function c(h){const g=l(h.center);if(!g)return[];const x=h.radius??12,m=h.shape??"disc",f=h.heading??0,S=(h.arc??Math.PI/2)/2,b=w=>{const E=w.cx-g.x,y=w.cz-g.z,M=Math.hypot(E,y);if(M>x)return!1;if(m==="ring")return M>=x*.55;if(m==="cone"){if(M<1e-9)return!0;let A=Math.atan2(y,E)-f;return A=Math.atan2(Math.sin(A),Math.cos(A)),Math.abs(A)<=S}return!0},v=[],T=new Set([g.id]),_=[g.id];for(let w=0;w<_.length;w++){const E=t(_[w]);if(!(!E||E.solid)){if(b(E)&&v.push(E.id),v.length>=e.maskMaxCells)break;for(const y of E.neighbors){if(T.has(y.id))continue;const M=t(y.id);!M||M.solid||Math.hypot(M.cx-g.x,M.cz-g.z)>x+6||(T.add(y.id),_.push(y.id))}}}return v}function u(h={},g=n()){var _,w,E,y,M;const x=h.mode??"absorb";if(!["absorb","scramble","spoof"].includes(x))throw new Error(`unknown mask mode ${x}`);const m=h.cells?[...h.cells]:c(h),f=[];for(const A of m){const G=t(A);G&&!G.solid&&f.push(G.id)}if(!f.length)return null;let S=f[0];const b=h.center!=null?l(h.center):null;if(b){let A=1/0;for(const G of f){const H=t(G),j=Math.hypot(H.cx-b.x,H.cz-b.z);j<A&&(A=j,S=G)}}const v=h.duration??8,T={id:`mask-${++o}`,mode:x,opacity:Math.min(1,Math.max(0,h.opacity??.8)),createdAt:g,expiresAt:g+v,duration:v,fade:Math.min(v,h.fade??Math.min(1.5,v*.25)),shape:h.shape??(h.cells?"cells":"disc"),center:b?{x:b.x,z:b.z}:null,radius:h.radius??null,cells:new Set(f),anchor:S,owner:h.owner??null,spoof:x==="spoof"?{id:((_=h.spoof)==null?void 0:_.id)??`spoof-${o}`,kind:((w=h.spoof)==null?void 0:w.kind)??"device",signature:((E=h.spoof)==null?void 0:E.signature)??.8,strengthResponse:((y=h.spoof)==null?void 0:y.strengthResponse)??1,cell:((M=h.spoof)==null?void 0:M.cell)??S}:null};s.set(T.id,T);for(const A of T.cells){const G=r.get(A);G?G.push(T):r.set(A,[T])}return T}function d(h){s.delete(h.id);for(const g of h.cells){const x=r.get(g);if(!x)continue;const m=x.indexOf(h);m>=0&&x.splice(m,1),x.length||r.delete(g)}}function p(h,g){const x=r.get(h);if(!x)return du;let m=1,f=null,S=0,b=null,v=null;for(const T of x){const _=a(T,g);_<=0||((v??(v=[])).push(T),T.mode==="absorb"?m*=1-_:T.mode==="scramble"?(m*=1-.1*_,_>S&&(S=_,f=T)):(b??(b=[])).push(T))}return v?{transmission:m,scramble:f,scrambleOpacity:S,spoofs:b??[],masks:v}:du}return{create:u,remove:d,effects:p,opacityAt:a,get:h=>s.get(h)??null,all:()=>[...s.values()],isMasked:(h,g=n())=>p(h,g).masks.length>0,tell:(h,g=n())=>ns(h.mode,a(h,g))}}const is=(i,t)=>typeof i=="number"&&typeof t=="number"?i-t:String(i)<String(t)?-1:String(i)>String(t)?1:0,n_=(i,t)=>i.t-t.t||i.k-t.k||i.w-t.w||is(i.c,t.c)||t.m-i.m||i.seq-t.seq,pu=Object.freeze({transmission:1,scramble:null,scrambleOpacity:0,spoofs:[],masks:[]});function i_(i,t={}){const e={...$a,...t,echo:{...$a.echo,...t.echo??{}}};e.echo.reveal!=="on-arrival"&&e.echo.reveal!=="live"&&(e.echo.reveal="on-arrival");const n=t.seed??1,s=t.sources??(()=>null);let r=0,o=0;const a=new Map,l=R=>{let U=a.get(R);return U===void 0&&(U=$s(i,R),a.set(R,U)),U},c={cells:0,pops:0,pushes:0,sourceCalls:0,echoes:0,heard:0,navCells:0,droppedEvents:0,notices:0},u=new yh(n_),d=[],p=[],h=new Map;let g=[],x=0,m=0;const f=new Map,S=[],b=[];let v=0,T=1024;const _={n:0,version:0,cell:new Float64Array(T),arrival:new Float64Array(T),strength:new Float32Array(T),gen:new Uint8Array(T),wave:new Int32Array(T),speed:new Float32Array(T),flags:new Uint8Array(T)},w=new Map;function E(){T*=2;for(const[R,U]of[["cell",Float64Array],["arrival",Float64Array],["strength",Float32Array],["gen",Uint8Array],["wave",Int32Array],["speed",Float32Array],["flags",Uint8Array]]){const $=new U(T);$.set(_[R]),_[R]=$}}function y(R,U,$,W,St,ct){_.n===T&&E();const mt=_.n++;_.cell[mt]=typeof U=="number"?U:NaN,_.arrival[mt]=$,_.strength[mt]=W,_.gen[mt]=R.gen,_.wave[mt]=R.id,_.speed[mt]=R.speed,_.flags[mt]=(St?1:0)|(ct?2:0);const Ct=w.get(U);return Ct?Ct.push(mt):w.set(U,[mt]),_.version++,mt}const M=(R=3)=>e.ringRise+e.ringTau*Math.log(Math.max(1.0001,R/.01)),A=e_({nav:i,getCell:l,cfg:e,now:()=>r});function G(R,U,$=!1){if(g.push($?{type:R,...U,hidden:!0}:{type:R,...U}),g.length>e.maxEvents){const W=[];let St=g.length-Math.floor(e.maxEvents*.75);for(const ct of g)St>0&&ct.type==="cell-reached"?(St--,c.droppedEvents++):W.push(ct);g=W}}function H(R,U){const $=U.env,W={id:d.length+1,pingId:R.id,gen:U.gen,parent:U.parent??null,origin:U.origin,t0:U.t0,power:U.power,env:$,speed:R.speed,sourceId:U.sourceId??`ping:${R.id}`,claim:U.claim??null,life:t_($,U.power,e.floor),settled:new Map,best:new Map,touched:new Set,heardBy:new Set,pending:0,cells:0,burned:!1,cut:null,done:!1,cancelled:!1,wanted:null};if(U.gen>0){W.wanted=new Set(["origin"]);for(const St of h.values())for(const ct of St)W.wanted.add(ct.id);S.push(W)}return d.push(W),x++,j(W,U.t0,U.origin,1,!0),W}function j(R,U,$,W,St){u.push({t:U,k:1,w:R.id,c:$,m:W,o:St,seq:++o}),R.pending++,c.pushes++}function tt(R,U){if(R.done)return;R.done=!0;const $=f.get(R.id);$&&($.endT=U),x--,G("wave-exhausted",{t:U,waveId:R.id,pingId:R.pingId,generation:R.gen,sourceId:R.sourceId,cells:R.cells,reason:R.cut??(R.burned?"burnout":"frontier-empty")},R.gen>0)}function k(R,U,$){const W=[];let St=R;for(let ct=0;ct<U;ct++){const mt=l(St),Ct=[];for(const _t of mt.neighbors){if(_t.gate!==void 0&&Zo(i,_t.gate))continue;const O=l(_t.id);O&&!O.solid&&Ct.push(_t.id)}if(!Ct.length)break;Ct.sort(is),St=Ct[Math.floor(ts(n,"walk",$,ct)*Ct.length)],W.push(St)}return W}function z(R,U,$,W,St,ct,mt,Ct,_t=1){const O=es(W.signature??.7,0,1),K=es(W.strengthResponse??1,0,3),J=St*K*O*mt.transmission;if(U.echoed.has(W.id))return;let F=null;U.echoes>=e.maxEchoes?F="echo-cap":U.cells>=e.maxCells?F="budget-cells":J<e.floor&&(F=mt.transmission<.5?"masked":"too-faint");const ut={t:ct,waveId:R.id,pingId:U.id,cell:$,id:W.id,kind:W.kind??"unknown",strength:St,echoStrength:F?0:J,echo:!F,reason:F,spoofed:!!Ct};if(G("identifier-hit",ut,!0),F)return;U.echoed.add(W.id),U.echoes++,c.echoes++;let gt=$,At=O,q=1,P=!1,N=null;if(mt.scramble&&!Ct){const Ft=mt.scrambleOpacity,It=`${R.id}:${W.id}:${mt.scramble.id}`,kt=es(1+Math.round(Ft*(e.scrambleHops-1)*(.4+.6*ts(n,"hops",It))),1,e.scrambleHops);N=k($,kt,It),(!N.length||N[N.length-1]===$)&&(N=k($,1,`${It}:b`)),gt=N.length?N[N.length-1]:$,At=es(O+(ts(n,"sig",R.id,W.id)-.5)*1.6*Ft,0,1),q=es(1-.9*Ft,0,1),P=!0}let Y=_t<1?ns("absorb",1-_t):0;for(const Ft of mt.masks)Y=Math.max(Y,ns(Ft.mode,A.opacityAt(Ft,ct)));Ct&&(Y=Math.max(Y,ns("spoof",.8)));const at=W.kind??"unknown",ot={echoId:++m,id:W.id,kind:at,hue:W.hue??fu[at]??fu.default,signature:At,quality:q,garbled:P,spoofed:!!Ct,reorder:P?1-q:0,trueCell:$,trueSignature:O,level:Y},Mt=H(U,{gen:R.gen+1,parent:R.id,origin:gt,t0:ct,power:J,env:uu.echo,sourceId:W.id,claim:ot}),wt={sourceId:ot.id,kind:ot.kind,cell:gt,emitTime:ct,pingId:U.id,returnTime:null,endT:null,wave:Mt,claim:ot,e0:J,truth:{cell:$,garbled:ot.garbled,spoofed:ot.spoofed}};f.set(Mt.id,wt),G("echo-started",{t:ct,waveId:Mt.id,parent:R.id,pingId:U.id,generation:Mt.gen,id:W.id,kind:ot.kind,cell:gt,trueCell:$,strength:J,garbled:P,spoofed:!!Ct},!0)}const B=R=>R<=0?0:R>=1?1:R*R*(3-2*R);function Z(R,U,$,W,St){const ct=R.speed,mt=e.echo.playback,Ct=($.t-R.t0)*ct,_t=Math.max($.carry,1e-9),O=[];let K=!1;for(const[gt,At]of R.settled){if(At.dead||At.t>$.t+1e-9)continue;const q=W*Math.min(1,_t/Math.max(At.carry,1e-9));if(q<e.echo.traceFloor&&At!==$){K=!0;continue}O.push({id:gt,dist:(At.t-R.t0)*ct,q:Math.min(1.5,q)})}O.sort((gt,At)=>At.dist-gt.dist||is(gt.id,At.id));const J=O.length,F={hue:U.hue,kind:U.kind,sourceId:U.id,clarity:W,speed:ct,rate:mt,R:Ct,latchTime:St,count:J,cut:K,sourceCell:R.origin,cell:new Float64Array(J),dist:new Float32Array(J),arrival:new Float64Array(J),strength:new Float32Array(J),endTime:St},ut=U.reorder*e.echo.scrambleJitter;for(let gt=0;gt<J;gt++){const At=O[gt];F.cell[gt]=At.id,F.dist[gt]=At.dist,F.strength[gt]=At.q,F.arrival[gt]=St+(Ct-At.dist)/(ct*mt)}if(ut>0&&J>2){const gt=F.arrival[J-1];for(let at=0;at<J;at++){const ot=(ts(n,"jit",U.echoId,F.cell[at])-.5)*2*ut;F.arrival[at]=Math.min(gt,Math.max(St,F.arrival[at]+ot))}const At=Array.from({length:J},(at,ot)=>ot).sort((at,ot)=>F.arrival[at]-F.arrival[ot]||at-ot),q=new Float64Array(J),P=new Float32Array(J),N=new Float64Array(J),Y=new Float32Array(J);At.forEach((at,ot)=>{q[ot]=F.cell[at],P[ot]=F.dist[at],N[ot]=F.arrival[at],Y[ot]=F.strength[at]}),Object.assign(F,{cell:q,dist:P,arrival:N,strength:Y})}return F.endTime=J?F.arrival[J-1]:St,F}function nt(R,U){const $=[];for(const[ct,mt]of R.settled)!mt.dead&&mt.t<=U&&$.push({id:ct,t:mt.t,s:mt.strength});$.sort((ct,mt)=>ct.t-mt.t||is(ct.id,mt.id));const W=$.length,St={speed:R.speed,emitTime:R.t0,count:W,cell:new Float64Array(W),arrival:new Float64Array(W),strength:new Float32Array(W)};return $.forEach((ct,mt)=>{St.cell[mt]=ct.id,St.arrival[mt]=ct.t,St.strength[mt]=ct.s}),St}function xt(R,U){const $=R.claim,W=p[R.pingId-1],St=wi[W.mode]??wi.active,ct=$.quality*St.clarity*B(R.e0/.3);return{echoId:$.echoId,latched:!1,listener:"origin",pingId:W.id,sourceId:$.id,kind:$.kind,hue:$.hue,signature:$.signature,cell:R.cell,pingT0:W.t0,emitTime:R.emitTime,returnTime:null,delay:null,estDistance:null,strength:R.e0,clarity:ct,mode:W.mode,glimpse:{cell:R.cell,radius:Math.round((1-ct)*3)+St.glimpseRadius,stale:0},replay:null,forward:nt(R.wave,U),tell:{suspicious:!1}}}function Rt(R,U,$,W,St,ct){const mt=$.id;if(R.heardBy.has(mt))return;R.heardBy.add(mt),c.heard++;const Ct=R.claim,_t=wi[U.mode]??wi.active,O=ct-U.t0,K=Ct.quality*_t.clarity*B(St/.3),J=$.id==="origin"?Ct.echoId:`${Ct.echoId}:${$.id}`,F=R.settled.get(W),ut=Z(R,Ct,F,K,ct);let gt=Ct.level,At=F,q=0;for(;At&&At.parent!=null&&q++<200;){const Mt=A.effects(At.parent,ct);for(const wt of Mt.masks)gt=Math.max(gt,ns(wt.mode,A.opacityAt(wt,ct)));At=R.settled.get(At.parent)}const P={echoId:J,latched:!0,listener:$.id,listenerCell:W,pingId:U.id,sourceId:Ct.id,kind:Ct.kind,hue:Ct.hue,signature:Ct.signature,cell:R.origin,pingT0:U.t0,emitTime:R.t0,returnTime:ct,delay:O,estDistance:O*U.speed/2,strength:St,clarity:K,mode:U.mode,glimpse:{cell:R.origin,radius:Math.round((1-K)*3)+_t.glimpseRadius,stale:ct-R.t0},replay:ut,field:ut,R:ut.R,speed:ut.speed,latchTime:ct,tell:{suspicious:ts(n,"tell",J)<gt},truth:{cell:Ct.trueCell,signature:Ct.trueSignature,garbled:Ct.garbled,spoofed:Ct.spoofed,quality:Ct.quality,tellLevel:gt}};b.push(P);const N=f.get(R.id);N&&(N.returnTime=ct);const{truth:Y,replay:at,...ot}=P;G("echo-heard",{t:ct,waveId:R.id,generation:R.gen,...ot,replay:ut,id:Ct.id,truth:Y}),R.wanted.delete(mt),R.wanted.size===0&&!R.done&&(R.cancelled=!0,R.cut="heard",tt(R,ct))}function Lt(R,U){const $=p[R.pingId-1],W=U.t,St=l(U.c);if(!St||St.solid)return;const ct=W-R.t0;if(ct>R.life){R.burned=!0;return}if(ct>e.maxTime){R.cut??(R.cut="budget-time");return}const mt=R.settled.get(U.c);if(mt&&!mt.dead)return;const Ct=U.o?pu:A.effects(U.c,W),_t=U.m*Ct.transmission,O=R.power*Gs(R.env,ct)*_t,K=O>=e.floor||ct<R.env.build+R.env.hold&&R.power*_t>=e.floor;let J=mt;if(J){if(!K){J.up=!1;return}J.slot>=0&&(_.flags[J.slot]|=4,_.strength[J.slot]=0),J.dead=!1,J.t=W,J.strength=O,J.carry=_t,J.parent=U.p??J.parent,R.gen===0&&(J.slot=y(R,U.c,W,O,!1,Ct.masks.length>0))}else{if($.cells>=e.maxCells){R.cut??(R.cut="budget-cells");return}$.cells++,c.cells++,R.cells++,J={t:W,strength:O,carry:_t,dead:!K,up:!1,parent:U.p??null,slot:R.gen===0?y(R,U.c,W,O,!K,Ct.masks.length>0):-1},R.settled.set(U.c,J)}G("cell-reached",{t:W,waveId:R.id,cell:U.c,strength:O,generation:R.gen,dead:!K,masked:Ct.masks.length>0},R.gen>0);for(const F of Ct.masks){if(R.touched.has(F.id)||(R.touched.add(F.id),F.owner!=null&&F.owner===$.owner))continue;const ut=ns(F.mode,A.opacityAt(F,W)),gt=ut*es(.5+U.m*R.power*Gs(R.env,ct),0,1);ts(n,"notice",R.id,F.id)<gt&&(c.notices++,G("mask-noticed",{t:W,maskId:F.id,mode:F.mode,cell:U.c,waveId:R.id,pingId:$.id,detectability:ut,by:$.owner},R.gen>0))}if(K){if(R.claim&&R.gen>=1&&O>=e.hearFloor){U.c===$.hearer.cell&&Rt(R,$,$.hearer,U.c,O,W);const F=h.get(U.c);if(F)for(const ut of F)Rt(R,$,ut,U.c,O,W)}if(R.gen<e.maxGeneration){const F=s(U.c);if(c.sourceCalls++,F)for(const ut of F)z(R,$,U.c,ut,O,W,Ct,!1,_t);for(const ut of Ct.spoofs)ut.spoof.cell!==U.c||$.spoofed.has(ut.id)||($.spoofed.add(ut.id),z(R,$,U.c,ut.spoof,O,W,pu,!0,_t))}for(const F of St.neighbors){if(F.gate!==void 0&&Zo(i,F.gate))continue;const ut=l(F.id);if(!ut||ut.solid)continue;const gt=R.settled.get(F.id);if(gt&&!gt.dead)continue;const At=W+Math.hypot(St.cx-ut.cx,St.cz-ut.cz)/R.speed,q=At-R.t0;if(q>R.life){R.burned=!0;continue}if(q>e.maxTime){R.cut??(R.cut="budget-time");continue}if(gt){if(gt.up)continue;gt.up=!0}else{const P=R.best.get(F.id);if(P!==void 0&&P<=At)continue;R.best.set(F.id,At)}u.push({t:At,k:1,w:R.id,c:F.id,m:_t,o:!1,p:U.c,seq:++o}),R.pending++,c.pushes++}}}function lt(R){if(c.pops++,R.k===0){A.remove(R.mask),G("mask-expired",{t:R.t,maskId:R.mask.id});return}const U=d[R.w-1];U.pending--,!U.cancelled&&(Lt(U,R),U.pending===0&&tt(U,R.t))}function bt(R,{budgetMs:U=0}={}){const $=r+Math.max(0,R),W=$+e.lookahead,St=U>0?performance.now():0;let ct=0,mt=!1;for(;u.size&&u.peek().t<=W;){if(ct>=e.maxWorkPerAdvance){mt=!0;break}if(U>0&&(ct&63)===63&&performance.now()-St>=U){mt=!0;break}const Ct=u.pop();ct++,v=Math.max(v,Ct.t),lt(Ct)}return r=mt?Math.max(r,Math.min($,v)):$,Pt(),mt||(v=Math.max(v,W)),{t:r,work:ct,behind:mt,active:x,solvedUntil:v}}function Pt(){for(const[R,U]of f)U.endT!=null&&U.endT<=r&&f.delete(R)}function yt(R,U={}){var O;let $=R;R&&typeof R=="object"&&($=(O=i.cellAt(R.x,R.z))==null?void 0:O.id);const W=$==null?null:l($);if(!W||W.solid)return null;const St=U.kind??"ping",ct=hu[St]??hu.ping,mt=wi[U.mode]?U.mode:"active",Ct={id:p.length+1,kind:St,mode:mt,origin:W.id,t0:r,owner:U.owner??null,speed:U.speed??ct.speed,echoed:new Set,spoofed:new Set,cells:0,echoes:0,hearer:{id:"origin",cell:W.id}};p.push(Ct);const _t=H(Ct,{gen:0,origin:W.id,t0:r,power:(U.power??ct.power)*wi[mt].power,env:uu[ct.env]});return G("wave-started",{t:r,waveId:_t.id,pingId:Ct.id,kind:St,mode:mt,loudness:wi[mt].loudness,cell:W.id,speed:Ct.speed,power:_t.power,lifespan:_t.life,owner:Ct.owner}),Ct.id}const Dt=R=>{var W;let U=R;R&&typeof R=="object"&&(U=(W=i.cellAt(R.x,R.z))==null?void 0:W.id);const $=U==null?null:l(U);return $&&!$.solid?$.id:null};function L(R,U){for(const $ of S){if(U!=null&&$.pingId!==U||$.heardBy.has(R.id)||!$.wanted.has(R.id))continue;const W=$.settled.get(R.cell);!W||W.dead||W.t>r||W.strength<e.hearFloor||Rt($,p[$.pingId-1],R,R.cell,W.strength,r)}}function X(R,U=null){const $=Dt(R);if($==null)return!1;for(const W of p)U!=null&&W.id!==U||W.hearer.cell===$||(W.hearer.cell=$,L(W.hearer,W.id));return!0}function et(R,U){const $=Dt(U);if($==null)return!1;let W=null;for(const St of h.values())for(const ct of St)ct.id===R&&(W=ct);return!W||W.cell===$?!!W:(V(R),W.cell=$,pt(W),L(W,null),!0)}function st(R){const U=A.create(R,r);return U?(Number.isFinite(U.expiresAt)&&u.push({t:U.expiresAt,k:0,w:0,c:U.id,m:0,o:!1,mask:U,seq:++o}),G("mask-created",{t:r,maskId:U.id,mode:U.mode,opacity:U.opacity,cells:U.cells.size,duration:U.duration,detectability:A.tell(U),anchor:U.anchor,owner:U.owner}),U):null}function pt(R){const U=h.get(R.cell);U?U.push(R):h.set(R.cell,[R])}function V(R){for(const[U,$]of h){const W=$.filter(St=>St.id!==R);W.length?h.set(U,W):h.delete(U)}}(t.listeners??[]).forEach(pt);function zt({maxSeconds:R=120,step:U=.5}={}){let $=0;for(;x>0&&$<R;)bt(U),$+=U;return r}function vt({minMagnitude:R=0,debug:U=!1}={}){c.navCells=a.size;const $=new Map;for(const F of d)if(!(F.gen>0&&!U))for(const[ut,gt]of F.settled){const At=r-gt.t;if(At<0)continue;const q=Jo(gt.strength,At,e),P=$.get(ut);P&&(P.waves++,q<P.magnitude||q===P.magnitude&&F.gen>=P.generation)||$.set(ut,{id:ut,arrival:gt.t,strength:gt.strength,magnitude:q,age:At,generation:F.gen,sourceId:F.sourceId,waveId:F.id,pingId:F.pingId,dist:(gt.t-F.t0)*F.speed,dead:gt.dead,masked:!1,waves:P?P.waves:1})}const W=[];for(const F of $.values())F.magnitude<R||(F.masked=A.isMasked(F.id,r),W.push(F));W.sort((F,ut)=>is(F.id,ut.id));const St=new Map;for(const F of u.a){if(F.k!==1)continue;const ut=St.get(F.w);ut?ut.add(F.c):St.set(F.w,new Set([F.c]))}const ct=[],mt=[];for(const F of d){if(F.gen>0&&!U)continue;const ut=r-F.t0,gt={waveId:F.id,pingId:F.pingId,generation:F.gen,sourceId:F.sourceId,origin:F.origin,t0:F.t0,age:ut,radius:ut*F.speed,strength:F.power*Gs(F.env,ut),power:F.power,cells:F.cells,done:F.done,reason:F.done?F.cut??(F.burned?"burnout":"frontier-empty"):null};mt.push(gt),F.done||ct.push({...gt,frontier:[...St.get(F.id)??[]].sort(is)})}const Ct=e.echo.reveal==="live",_t=[];for(const F of b){if(F.returnTime>r)continue;const ut={...F,age:r-F.returnTime};U||delete ut.truth,_t.push(ut)}if(Ct)for(const F of f.values())F.emitTime>r||F.returnTime!=null&&F.returnTime<=r||_t.push({...xt(F,r),age:r-F.emitTime,...U?{truth:F.truth}:{}});const O=_t.slice(-e.echoKeep),K={...c};U||(delete K.echoes,delete K.heard);const J={t:r,outgoing:{cells:W,fronts:ct},echoes:O,cells:W,fronts:ct,waves:mt,masks:A.all().map(F=>({id:F.id,mode:F.mode,opacity:A.opacityAt(F,r),baseOpacity:F.opacity,remaining:Math.max(0,F.expiresAt-r),cells:[...F.cells],anchor:F.anchor,detectability:A.tell(F,r),owner:F.owner,shape:F.shape})),stats:K};return U&&(J.hiddenEchoes=[...f.values()].filter(F=>F.returnTime==null||F.returnTime>r)),J}function Tt({all:R=!1}={}){const U=[],$=[];for(const W of g)if(W.t>r)$.push(W);else if(R)U.push(W);else if(!W.hidden)if(W.truth){const{truth:St,...ct}=W;U.push(ct)}else U.push(W);return g=$,U}function Et(){const R=_.n;return{count:R,version:_.version,cell:_.cell.subarray(0,R),arrival:_.arrival.subarray(0,R),strength:_.strength.subarray(0,R),generation:_.gen.subarray(0,R),wave:_.wave.subarray(0,R),speed:_.speed.subarray(0,R),flags:_.flags.subarray(0,R)}}const Bt=R=>{let U=0,$=_.n;for(;U<$;){const W=U+$>>1;_.arrival[W]<R?U=W+1:$=W}return U};function ht(R,U=.5,$=3){const W=e.lookahead;return[Bt(R-M($)-W),Bt(R+U+1e-9)]}function I(R,U,$=.5){const[W,St]=ht(U,$);for(let ct=W;ct<St;ct++)R[ct]=_.flags[ct]&5?0:Jo(_.strength[ct],U-_.arrival[ct],e);return[W,St]}function C(R,U,$){const W=i.cellAt(R,U);if(!W||W.solid)return{intensity:0,cell:W?W.id:null,arrival:1/0};const St=l(W.id),ct=[St.id];for(const O of St.neighbors){if(O.gate!==void 0&&Zo(i,O.gate))continue;const K=l(O.id);K&&!K.solid&&ct.push(O.id)}const mt=new Map;for(const O of ct){const K=w.get(O);if(!K)continue;const J=l(O),F=Math.hypot(R-J.cx,U-J.cz);for(const ut of K){if(_.flags[ut]&5)continue;const gt=_.arrival[ut]+F/_.speed[ut],At=mt.get(_.wave[ut]);(!At||gt<At.a)&&mt.set(_.wave[ut],{a:gt,i:ut})}}let Ct=0,_t=1/0;for(const[O,{a:K,i:J}]of mt){K<_t&&(_t=K);const F=d[O-1],ut=Jo(_.strength[J]*(Gs(F.env,K-F.t0)/Gs(F.env,_.arrival[J]-F.t0)),$-K,e);ut>Ct&&(Ct=ut)}return{intensity:Ct,cell:St.id,arrival:_t}}return{advance:bt,runUntilIdle:zt,ping:yt,createMask:st,removeMask:R=>{const U=A.get(R);U&&(A.remove(U),G("mask-expired",{t:r,maskId:R}))},isMasked:R=>A.isMasked(R,r),maskAt:R=>A.effects(R,r).masks.map($=>({id:$.id,mode:$.mode,opacity:A.opacityAt($,r)})),maskTell:R=>{const U=A.get(R);return U?A.tell(U,r):0},addListener:pt,removeListener:V,moveOrigin:X,moveListener:et,snapshot:vt,drainEvents:Tt,field:Et,activeRange:ht,intensityRange:I,sampleAt:C,get solvedUntil(){return v},get time(){return r},get active(){return x},get stats(){return c.navCells=a.size,{...c}},config:e}}const Qo=(i,t)=>Math.round(i*1e3)*2e8+Math.round(t*1e3);function s_(i){const t=new Map,e=new Map;function n(r,o,a){const l=new Map([[o,r]]);for(const u of r.neighbors){const d=i(u.id);d&&l.set(u.id,d)}if(a){const u=[...l.values()];for(const d of u)for(const p of d.neighbors){if(l.has(p.id))continue;const h=i(p.id);h&&l.set(p.id,h)}}const c=new Map;for(const[u,d]of l)for(const p of d.poly){const h=Qo(p[0],p[1]),g=c.get(h);g?g.includes(u)||g.push(u):c.set(h,[u])}return{near:l,at:c}}function s(r){const o=i(r);if(!o)return[];let{near:a,at:l}=n(o,r,!1);o.poly.some(u=>(l.get(Qo(u[0],u[1]))??[]).length<3)&&({near:a,at:l}=n(o,r,!0));const c=[];for(const u of o.poly){const d=l.get(Qo(u[0],u[1]));if(!d||d.length<3)continue;const p=d.length===3?d:d.map(h=>{const g=a.get(h);return{cid:h,a:Math.atan2(g.cz-u[1],g.cx-u[0])}}).sort((h,g)=>h.a-g.a).map(h=>h.cid);for(let h=1;h+1<p.length;h++){const g=[p[0],p[h],p[h+1]].sort((f,S)=>f-S),x=g.join("|");let m=t.get(x);m||t.set(x,m={ids:g,key:x}),c.includes(m)||c.push(m)}}return c}return{of(r){let o=e.get(r);return o||(o=s(r),o.length&&e.set(r,o)),o},get size(){return t.size},clear(){t.clear(),e.clear()}}}function mu(i,{tris:t,cellOf:e,field:n,inside:s,speed:r=14,estimate:o=!0}){const a=new Set,l=[];for(const c of s)for(const u of t.of(c)){if(a.has(u))continue;a.add(u);const d=r_(u,i,e,n,r,o);d&&l.push(d)}return{chains:o_(l),segments:l.length,triangles:a.size}}function r_(i,t,e,n,s,r){const o=[];for(const _ of i.ids){const w=e(_);if(!w)return null;const E=!w.solid&&!n.blocked(_),y=E?n.value(_):void 0;o.push({id:_,c:w,open:E,v:y,k:E?n.strength(_):0,est:!1})}const a=o.filter(_=>_.open);if(a.length<2)return null;const l=a.filter(_=>_.v!==void 0);if(!l.length)return null;for(const _ of a){if(_.v!==void 0)continue;if(!r)return null;let w=1/0,E=0;for(const y of l){const M=y.v+Math.hypot(_.c.cx-y.c.cx,_.c.cz-y.c.cz)/s;M<w&&(w=M,E=y.k)}_.v=w,_.k=E,_.est=!0}const c=Math.max(...a.map(_=>_.v));for(const _ of o)_.open||(_.v=c,_.k=0);const u=o.map(_=>_.v<=t),d=u.filter(Boolean).length;if(d===0||d===3)return null;const p=[];for(let _=0;_<3;_++)for(let w=_+1;w<3;w++){if(u[_]===u[w])continue;const E=u[_]?o[_]:o[w],y=u[_]?o[w]:o[_];let M=(t-E.v)/(y.v-E.v);M=M<0?0:M>1?1:M,y.open||(M=Math.min(M,.5));const A=y.open?y.k:E.k;p.push({key:E.id<y.id?`${E.id}|${y.id}`:`${y.id}|${E.id}`,x:E.c.cx+(y.c.cx-E.c.cx)*M,z:E.c.cz+(y.c.cz-E.c.cz)*M,k:E.k+(A-E.k)*M,cell:E.id})}if(p.length!==2)return null;let h=0,g=0,x=0;for(let _=0;_<3;_++)u[_]&&(h+=o[_].c.cx,g+=o[_].c.cz,x++);h/=x,g/=x;const m=p[1].x-p[0].x,f=p[1].z-p[0].z,S=Math.hypot(m,f);let b=-f,v=m;S<1e-9&&(b=h-p[0].x,v=g-p[0].z);const T=Math.hypot(b,v)||1;return b/=T,v/=T,b*(h-p[0].x)+v*(g-p[0].z)<0&&(b=-b,v=-v),{a:p[0],b:p[1],nx:b,nz:v}}function o_(i){const t=new Map;i.forEach((l,c)=>{for(const u of[l.a,l.b]){let d=t.get(u.key);d||t.set(u.key,d=[]),d.push(c)}});const e=new Uint8Array(i.length),n=(l,c)=>l.a.key===c?l.b:l.a,s=(l,c)=>{for(const u of t.get(l)??[])if(!e[u]&&u!==c)return u;return-1},r=(l,c)=>{const u=[];let d=l,p=c;for(;;){const h=s(p,d);if(h<0)break;e[h]=1;const g=n(i[h],p);u.push({i:h,p:g}),p=g.key,d=h}return u},o=[],a=[...i.keys()].sort((l,c)=>t.get(i[l].a.key).length+t.get(i[l].b.key).length-(t.get(i[c].a.key).length+t.get(i[c].b.key).length));for(const l of a){if(e[l])continue;e[l]=1;const c=i[l],u=r(l,c.b.key),d=r(l,c.a.key),p=[],h=[];for(let f=d.length-1;f>=0;f--)p.push(d[f].p);p.push(c.a,c.b);for(const f of u)p.push(f.p);const g=[...d.map(f=>f.i).reverse(),l,...u.map(f=>f.i)];for(const f of g)h.push([i[f].nx,i[f].nz]);const x=p.length>3&&p[0].key===p[p.length-1].key;x&&p.pop();const m=p.map((f,S)=>{const b=h[Math.max(0,S-1)]??h[0],v=h[Math.min(h.length-1,S)]??h[0];let T=b[0]+v[0],_=b[1]+v[1];if(x&&S===0){const E=h[h.length-1];T=E[0]+h[0][0],_=E[1]+h[0][1]}const w=Math.hypot(T,_)||1;return{x:f.x,z:f.z,k:f.k,cell:f.cell,nx:T/w,nz:_/w}});o.push({pts:m,closed:x})}return o}function a_(i,t,e=80){const n=new Map,s=new Map;for(let c=0;c<i.count;c++)n.set(i.cell[c],i.dist[c]),s.set(i.cell[c],i.arrival[c]);let r=null,o=-1;for(const[c,u]of n)u>o&&(o=u,r=c);const a=[],l=new Set;for(let c=0;c<e&&r!=null&&!l.has(r);c++){l.add(r);const u=t(r);if(!u)break;a.push({x:u.cx,z:u.cz,t:s.get(r)});let d=null,p=n.get(r);for(const h of u.neighbors){const g=n.get(h.id);g!==void 0&&g<p&&(p=g,d=h.id)}r=d}return a}const bh=3e3,l_=18,gu=bh*l_,ta=9,xu=900,c_=2400,u_=120,vu=16,_u=48,h_=.02;function f_(i,t,e){const n=t*Math.min(e,1-e),s=r=>{const o=(r+i/30)%12;return e-n*Math.max(-1,Math.min(o-3,9-o,1))};return[s(0),s(8),s(4)]}const d_=[.25,.95,1],Ei=[[-.1,0],[0,1],[.35,.4],[1,0]];function p_({scene:i,map:t,seed:e=1,sources:n,options:s={}}){const r=i_(t,{seed:e,sources:n,...s}),o=L=>t.cell?t.cell(L):t.cells[L],a=s_(o);let l=s.band??3.2;const c=s.waveBudgetMs??6,u={cooldown:s.cooldown??0,maxWaves:s.maxWaves??16},d=new Float32Array(gu*3),p=new Float32Array(gu*3),h=new fe;h.setAttribute("position",new _e(d,3).setUsage(Ga)),h.setAttribute("color",new _e(p,3).setUsage(Ga)),h.setDrawRange(0,0);const g=new $t(h,He(new we({vertexColors:!0,transparent:!0,blending:Fe,side:ve,toneMapped:!1,depthTest:!1}),{depthTest:!1}));g.material.depthTest=!1,g.renderOrder=9100,g.frustumCulled=!1,g.name="scan",i.add(g);let x=0,m=0;const f=new Map;let S=0,b=0,v=0,T=[],_=-1e9;const w=new WeakMap;let E=[];const y={frontMs:0,chains:0,segments:0,triangles:0,lastMs:0,field:0,pings:0,arrows:0,waves:0,stale:0,refused:0,fused:0};function M(L,X,et,st,pt,V,zt,vt){const Tt=x*3;d[Tt]=L[0],d[Tt+1]=zt,d[Tt+2]=L[1],d[Tt+3]=X[0],d[Tt+4]=zt,d[Tt+5]=X[1],d[Tt+6]=et[0],d[Tt+7]=zt,d[Tt+8]=et[1];for(let Et=0;Et<3;Et++){const Bt=Et===0?st:Et===1?pt:V;p[Tt+Et*3]=vt[0]*Bt,p[Tt+Et*3+1]=vt[1]*Bt,p[Tt+Et*3+2]=vt[2]*Bt}x+=3}function A(L,X,et,st,pt,V){if(m>=bh)return;const zt=Ne(o(L.cell))+.07,vt=(Tt,Et)=>[Tt.x+Tt.nx*Ei[Et][0]*V,Tt.z+Tt.nz*Ei[Et][0]*V];for(let Tt=0;Tt+1<Ei.length;Tt++){const Et=vt(L,Tt),Bt=vt(L,Tt+1),ht=vt(X,Tt),I=vt(X,Tt+1),C=st*Ei[Tt][1],R=st*Ei[Tt+1][1],U=pt*Ei[Tt][1],$=pt*Ei[Tt+1][1];M(Et,Bt,ht,C,R,U,zt,et),M(ht,Bt,I,U,R,$,zt,et)}m++}function G(L,X,et){const st=L.pts.length;for(let pt=0;pt+1<st+(L.closed?1:0);pt++){const V=L.pts[pt],zt=L.pts[(pt+1)%st];A(V,zt,X,Math.min(1.1,V.k)*et,Math.min(1.1,zt.k)*et,l)}}function H(L,X,et,st,pt,V,zt,vt){const Tt=et-L,Et=st-X,Bt=Math.hypot(Tt,Et)||1,ht=-Et/Bt*pt*.5,I=Tt/Bt*pt*.5,C=[L+ht,X+I],R=[L-ht,X-I],U=[et+ht,st+I],$=[et-ht,st-I];M(C,R,U,zt,zt,zt,vt,V),M(U,R,$,zt,zt,zt,vt,V)}function j(L,X,et,st){const pt=Ne(L)+.07,V=18;for(let zt=0;zt<V;zt++){const vt=zt/V*Math.PI*2,Tt=(zt+1)/V*Math.PI*2;H(L.cx+Math.cos(vt)*X,L.cz+Math.sin(vt)*X,L.cx+Math.cos(Tt)*X,L.cz+Math.sin(Tt)*X,.28,et,st,pt)}}const tt=(L,X,et)=>{let st=0,pt=X;for(;st<pt;){const V=st+pt>>1;L[V]<et?st=V+1:pt=V}return st},k=new Set;function z(L){L.count<S&&(f.clear(),k.clear(),S=0);for(let X=S;X<L.count;X++){if(L.generation[X]!==0)continue;const et=L.wave[X];if(k.has(et))continue;let st=f.get(et);st||(st={id:et,slotOf:new Map,slots:[],speed:L.speed[X]||14,last:L.arrival[X],strength:0,stamp:-1,chains:[],segments:0},f.set(et,st),b=Math.max(0,b-1));const pt=L.cell[X],V=st.slotOf.get(pt);(V===void 0||L.flags[V]&5&&!(L.flags[X]&5))&&st.slotOf.set(pt,X),st.slots.push(X),st.last=L.arrival[X],L.flags[X]&5||(st.strength=L.strength[X]*.9)}S=L.count}function B(L){for(const[X,et]of f){const st=ta/et.speed,pt=L-et.last;(pt>2*st+.5||et.strength<h_&&pt>st)&&(f.delete(X),k.add(X),y.fused++)}}const Z=(L,X,et)=>{let st=0,pt=L.length;for(;st<pt;){const V=st+pt>>1;X[L[V]]<et?st=V+1:pt=V}return st};function nt(L,X,et,st){const pt=L.slotOf,V={value:Bt=>{const ht=pt.get(Bt);return ht===void 0||X.flags[ht]&5?void 0:X.arrival[ht]},strength:Bt=>{const ht=pt.get(Bt);return ht===void 0?0:X.strength[ht]*.9},blocked:Bt=>{const ht=pt.get(Bt);return ht!==void 0&&(X.flags[ht]&5)!==0}},zt=L.speed,vt=Z(L.slots,X.arrival,et-ta/zt),Tt=Z(L.slots,X.arrival,et),Et=[];for(let Bt=Tt-1;Bt>=vt&&Et.length<st;Bt--){const ht=L.slots[Bt];X.flags[ht]&5||Et.push(X.cell[ht])}return mu(et,{tris:a,cellOf:o,field:V,inside:Et,speed:zt,estimate:!0})}function xt(L={}){const X=L.cooldown??u.cooldown,et=L.maxWaves??u.maxWaves,st=X>0?Math.max(0,X-(r.time-_)):0,pt=f.size+b;return st>1e-9?{ok:!1,reason:"cooldown",left:st,active:pt,max:et}:pt>=et?{ok:!1,reason:"waves",left:0,active:pt,max:et}:{ok:!0,reason:null,left:0,active:pt,max:et}}function Rt(L){let X=w.get(L);if(!X){const et=new Map,st=new Map;for(let pt=0;pt<L.count;pt++)et.set(L.cell[pt],L.arrival[pt]),st.set(L.cell[pt],L.strength[pt]);X={when:et,str:st,path:null,arc:null,chev:null,rgb:f_(L.hue,.95,.6)},w.set(L,X)}return X}const Lt=new Set,lt=new Set;let bt=null;function Pt(L,X){if(X.chev)return X.chev;if(X.path=a_(L,o),X.path.length<2)return null;X.arc=[0];for(let pt=1;pt<X.path.length;pt++)X.arc.push(X.arc[pt-1]+Math.hypot(X.path[pt].x-X.path[pt-1].x,X.path[pt].z-X.path[pt-1].z));const et=X.path[X.path.length-1].t-X.path[0].t,st=et>0?X.arc[X.arc.length-1]/et*1.6:10;return X.chev=_h({parent:i,color:X.rgb,behind:Math.max(2,st)}),X.chev.configure(bt??{}),X.chev.set(X.path,.09),Lt.add(X),X.chev}function yt(L,X){const et=L.path;if(X<=et[0].t)return 0;for(let st=1;st<et.length;st++)if(X<et[st].t){const pt=(X-et[st-1].t)/Math.max(1e-6,et[st].t-et[st-1].t);return L.arc[st-1]+(L.arc[st]-L.arc[st-1])*pt}return L.arc[L.arc.length-1]}function Dt(L,X,et){const st={value:vt=>X.when.get(vt),strength:vt=>(X.str.get(vt)??0)*.95,blocked:()=>!1},pt=tt(L.arrival,L.count,et-ta/(L.speed||14)),V=tt(L.arrival,L.count,et),zt=[];for(let vt=V-1;vt>=pt&&zt.length<xu;vt--)zt.push(L.cell[vt]);return mu(et,{tris:a,cellOf:o,field:st,inside:zt,speed:L.speed||14,estimate:!1})}return{sim:r,mesh:g,stats:y,tris:a,configure(L){if(L&&Number.isFinite(L.scanBand)&&(l=L.scanBand),L&&Number.isFinite(L.pingCooldown)&&(u.cooldown=Math.max(0,L.pingCooldown)),L&&Number.isFinite(L.pingMaxWaves)&&(u.maxWaves=Math.max(1,Math.round(L.pingMaxWaves))),L){bt=L;for(const X of Lt)X.chev.configure(L)}},get band(){return l},get fronts(){return E},ping(L,X,et={}){if(!xt(et).ok)return y.refused++,null;const pt=r.ping({x:L,z:X},et);return pt!=null&&(_=r.time,y.pings++,b++),pt},get pingState(){const L=xt();return{ready:L.ok,reason:L.reason,left:L.left,active:L.active,max:L.max,cooldown:u.cooldown}},step(L,X=3){r.advance(L,{budgetMs:X});const et=r.drainEvents();for(const st of et)st.type==="echo-heard"&&st.replay&&st.replay.count&&T.push(st);return T.length>_u&&T.splice(0,T.length-_u),et},update(){const L=performance.now(),X=r.time;x=0,m=0,E=[],y.chains=0,y.segments=0,y.triangles=0,y.arrows=0,lt.clear();const et=r.field();y.field=et.count,a.size>6e4&&a.clear(),z(et),B(X),y.waves=f.size,y.stale=0;for(let st=T.length-1;st>=0;st--)X>T[st].replay.endTime+8&&T.splice(st,1);if(y.frontMs=0,f.size){const st=[...f.values()],pt=Math.max(u_,Math.min(xu,Math.floor(c_/st.length))),V=st.length>1?[...st].sort((Et,Bt)=>Et.stamp-Bt.stamp):st,zt=performance.now();let vt=0,Tt=0;for(const Et of V){if(Et.stamp>=0&&vt>0&&performance.now()-zt>=c){Tt++;continue}const Bt=nt(Et,et,X,pt);Et.chains=Bt.chains,Et.segments=Bt.segments,Et.stamp=++v,vt++,y.triangles+=Bt.triangles}y.frontMs=performance.now()-zt,y.stale=Tt;for(const Et of st)E.push({kind:"wave",wave:Et.id,chains:Et.chains});for(let Et=st.length-1;Et>=0;Et--){for(const Bt of st[Et].chains)G(Bt,d_,.9);y.chains+=st[Et].chains.length,y.segments+=st[Et].segments}}for(const st of T.length>vu?T.slice(-vu):T){const pt=st.replay,V=Rt(pt),zt=Dt(pt,V,X);E.push({kind:"echo",chains:zt.chains});for(const vt of zt.chains)G(vt,V.rgb,.95);if(y.chains+=zt.chains.length,y.segments+=zt.segments,y.triangles+=zt.triangles,X>pt.latchTime-.2&&X<pt.endTime+5){const vt=Pt(pt,V);vt&&(vt.setHead(yt(V,X)),vt.update(X),lt.add(V),y.arrows+=vt.stats.glyphs)}if(X>pt.endTime){const vt=Math.max(0,Math.min(1,(pt.endTime+7-X)/3)),Tt=o(st.glimpse.cell);Tt&&vt>0&&(j(Tt,.8+(X-pt.endTime)*.35,V.rgb,.9*vt),m+=6)}}for(const st of Lt)lt.has(st)||(st.chev.dispose(),st.chev=null,Lt.delete(st));h.setDrawRange(0,x),h.attributes.position.needsUpdate=!0,h.attributes.color.needsUpdate=!0,g.visible=x>0,y.lastMs=performance.now()-L},dispose(){var L;for(const X of Lt)(L=X.chev)==null||L.dispose();Lt.clear(),i.remove(g),h.dispose(),g.material.dispose()}}}function y_({canvas:i,map:t,seed:e=1,streamed:n=!0,fog:s=!0,mode:r="chase",embedded:o=!1,focus:a,storage:l,settings:c,onHover:u,onSelect:d,onStatus:p}){var v,T;const h=Nv({canvas:i,map:t,mode:r,fog:s,embedded:o,focus:a,makeBoard:n?({map:_,cut:w})=>kv({map:_,cut:w}):void 0,onHover:u,onSelect:d});n&&h.board.settle(t.startCell.cx,t.startCell.cz,30);const g=Zh(t,{spawnCell:t.startCell,seed:e}),x=yv(l);c&&x.set(c),h.rig.bindKeys(()=>x.keys()),x.subscribe(_=>h.applySettings(_));let m=null;const f=Fv({stage:h,actors:g,canvas:h.renderer.domElement,embedded:o,shows:(_,w,E)=>m?m.shows(_,w,E):!0,onStatus:p,keys:()=>x.keys()});m=s?Qv({map:t,stage:h}):null,m&&(h.setKnowledge((_,w)=>m.knows(_,w)),(T=(v=h.board).setShows)==null||T.call(v,(_,w,E)=>m.shows(_,w,E))),x.subscribe(_=>{var w,E;m==null||m.configure(_),(E=(w=h.board).configure)==null||E.call(w,_)});const S=p_({scene:h.scene,map:t,seed:e});x.subscribe(_=>S.configure(_)),h.on("frame",(_,w)=>{const E=g.snapshot(),y=M=>{const A=E[M],G=A.render??A;return{id:M,x:G.x,z:G.z}};if(m==null||m.update([y("avatar"),y("companion")],w,_),!f.paused){const M=S.step(_);M.length&&(m==null||m.noteScan(M))}S.update()});const b=()=>{const _=g.snapshot().avatar,w=_.render??_;return S.ping(w.x,w.z)};return f.bind("ping",b),{map:t,seed:e,streamed:n,stage:h,board:h.board,actors:g,settings:x,play:f,fogView:m,scanView:S,ping:b,dispose(){f.dispose(),S.dispose(),m==null||m.dispose(),h.dispose()}}}const Gr=1e7;function S_(i,{world:t,worldOptions:e,start:n=[0,0]}={}){const s=t??Ch(i,e),{field:r,coarse:o}=s,a=[],l=new Map,c=[],u=new Map,d=[],p=new Set,h={navMs:0,navN:0,cutMs:0,cutN:0,maxMs:0},g=(_,w)=>`${_},${w}`,x={seed:i,world:s,tileset:s,sectors:a,cells:c,gates:d,terrain:s.cfg,contours:[],sectorEdges:[],cuts:[],bounds:{x0:-Gr,z0:-Gr,x1:Gr,z1:Gr},stats:h};x.cell=_=>Number.isInteger(_)?c[_]??null:null,x.cellById=x.cell,x.gateLocked=_=>{var w;return!!((w=d[_])!=null&&w.locked)};function m(_,w){const E=performance.now(),y=w(),M=performance.now()-E;return h[`${_}Ms`]+=M,h[`${_}N`]++,h.maxMs=Math.max(h.maxMs,M),y}function f(_,w){for(const E of _.nav.portals){if(E.q[0]!==w.u||E.q[1]!==w.v)continue;const y=`${_.key}>${w.key}#${E.slot}`;if(p.has(y))continue;p.add(y);const M=c[_.base+E.cell],A=c[u.get(`${E.partner[0]},${E.partner[1]}`)];if(!M||!A)continue;const G=Math.abs(E.edge.a[0]-E.edge.b[0]),H=Math.abs(E.edge.a[1]-E.edge.b[1]),j=E.span.reduce((B,Z)=>B+Z.len,0),tt=[E.span.reduce((B,Z)=>B+Z.mid[0]*Z.len,0)/j,E.span.reduce((B,Z)=>B+Z.mid[1]*Z.len,0)/j],k={id:d.length,a:M.id,b:A.id,sa:_.id,sb:w.id,mid:tt,len:j,horiz:H>=G,slot:E.slot,locked:E.locked,edge:E.edge,span:E.span,faces:E.faces,soft:E.soft,cells:[],kind:E.kind,visible:E.visible,axis:E.axis,normal:E.normal},z=[...E.span].sort((B,Z)=>(Z.mid===E.edge.mid?1:0)-(B.mid===E.edge.mid?1:0));for(const B of z){const Z=c[_.base+B.cell],nt=c[u.get(`${B.partner[0]},${B.partner[1]}`)];!Z||!nt||Z.neighbors.some(xt=>xt.id===nt.id)||(Z.neighbors.push({id:nt.id,mid:B.mid,len:B.len,gate:k.id}),nt.neighbors.push({id:Z.id,mid:B.mid,len:B.len,gate:k.id}),k.cells.push([Z.id,nt.id]))}d.push(k),_.gates.push(k),w.gates.push(k)}}function S(_,w){const E=g(_,w);let y=l.get(E);if(y)return y;const M=m("nav",()=>s.nav(_,w));y={id:a.length,u:_,v:w,key:E,clearance:M.info.clearance,name:E,base:c.length,cellIds:[],nav:M,gates:[],cut:!1,kind:"",render:null,rect:null},a.push(y),l.set(E,y);let A=1/0,G=1/0,H=-1/0,j=-1/0;for(const tt of M.cells){for(const[z,B]of tt.poly)A=Math.min(A,z),G=Math.min(G,B),H=Math.max(H,z),j=Math.max(j,B);const k={id:c.length,sector:y.id,clearance:y.clearance,local:tt.local,solid:M.solid[tt.local],poly:tt.poly,cx:tt.cx,cz:tt.cz,area:tt.area,radius:tt.radius,sides:tt.sides,i:tt.i,j:tt.j,neighbors:[],cache:0};c.push(k),u.set(`${tt.i},${tt.j}`,k.id),y.cellIds.push(k.id)}y.rect={x0:A,z0:G,x1:H,z1:j};for(const tt of M.cells)for(const k of tt.nbl){if(k.j<tt.local)continue;const z=c[y.base+tt.local],B=c[y.base+k.j];z.neighbors.push({id:B.id,mid:k.mid,len:k.len}),B.neighbors.push({id:z.id,mid:k.mid,len:k.len})}for(const tt of Object.values(Ph)){const k=l.get(g(_+tt[0],w+tt[1]));k&&(Tl([y.u,y.v],[k.u,k.v])<=0?f(y,k):f(k,y))}return y}function b(_,w){if(!s.cfg.borders.openCross)return;const E=new Set(w.gapEdges);for(const y of _.nav.cells)if(!_.nav.solid[y.local])for(const M of y.ext){const A=l.get(g(M.u,M.v));if(!A||Tl([_.u,_.v],[A.u,A.v])>0)continue;const G=o.border([_.u,_.v],[A.u,A.v]).mode;if(G!=="open"&&G!=="wall"||G==="wall"&&!E.has(Mu(M.a,M.b)))continue;const H=u.get(`${M.i},${M.j}`);if(H===void 0||c[H].solid)continue;const j=c[_.base+y.local],tt=c[H];j.neighbors.some(k=>k.id===tt.id)||(j.neighbors.push({id:tt.id,mid:M.mid,len:M.len,open:!0}),tt.neighbors.push({id:j.id,mid:M.mid,len:M.len,open:!0}))}}const v=_=>s.sectorGeo(_.u,_.v).nbrs.filter(w=>o.inBounds(w.u,w.v));function T(_){if(_.cut)return _;for(const w of v(_))S(w.u,w.v);return m("cut",()=>{const w=s.render(_.u,_.v);for(const A of w.cuts??[]){const G=c[_.base+A.local];G.cut={poly:A.poly,open:A.open},x.cuts.push({cell:G.id,poly:A.poly,open:A.open})}const E=A=>S(A.u,A.v).base+A.local,y=s.detail(_.u,_.v);_.kind=y.kind;for(const A of y.caches){const G=c[_.base+A.cell];!G.role&&!G.solid&&(G.cache=A.amount)}const M=A=>A?S(A[0],A[1]).id:-1;_.render={contours:w.contours.map(A=>({a:A.a,b:A.b,solid:E(A.solid),open:E(A.open),...A.sliver?{sliver:!0}:{}})),sectorEdges:w.sectorEdges.map(A=>({a:A.a,b:A.b,sa:_.id,sb:M(A.sb),...A.sliver?{sliver:!0}:{},...A.open?{open:!0}:{},...A.gap?{gap:!0}:{}})),borderLines:w.borderLines.map(A=>({...A,sa:_.id,sb:M(A.sb)})),openings:w.openings.map(A=>({...A,sa:_.id,sb:M(A.sb)})),gapEdges:w.gapEdges},b(_,w)}),_.cut=!0,_}x.cellAt=(_,w)=>{const[E,y]=r.cellAtPoint(_,w);let M=u.get(`${E},${y}`);if(M===void 0){const[A,G]=r.sectorOf(E,y);S(A,G),M=u.get(`${E},${y}`)}return M===void 0?null:c[M]},x.sectorAt=(_,w)=>{const E=x.cellAt(_,w);return E?a[E.sector]:null},x.sectorIndexAt=(_,w)=>r.sectorOf(...r.cellAtPoint(_,w)),x.sector=S,x.prepare=T,x.has=(_,w)=>l.get(g(_,w)),x.chunkView=_=>{const w=[];for(const M of[_,...v(_).map(A=>l.get(g(A.u,A.v)))])if(M)for(const A of M.cellIds)w.push(c[A]);const E=_.cellIds.map(M=>c[M]),y=x.startCell;return{cells:E,edgeCells:w,gates:_.gates,drawsGate:M=>M.sa===_.id,sectors:a,cellById:x.cell,sectorEdges:_.render.sectorEdges,contours:_.render.contours,sectorLines:_.render.borderLines,sectorOpenings:_.render.openings,gapEdges:_.render.gapEdges,startCell:y,beacons:y&&y.sector===_.id?[[y,8256767,0,2.4,.5]]:[]}};{const _=T(S(n[0],n[1])),w=_.nav.cells[_.nav.seedLocal??0];let E=null,y=1/0;for(const M of _.cellIds){const A=c[M];if(A.solid)continue;const G=Math.hypot(A.cx-w.cx,A.cz-w.cz)-A.radius*.5;G<y&&(y=G,E=A)}E.role="start",x.startCell=E}return x.coarse=o,x}export{co as A,ln as D,__ as G,Nr as R,Ml as S,xh as a,S_ as b,cv as c,y_ as d,sv as e,M_ as f,nv as g,mn as h,yv as i,v_ as l};
