import * as T from 'three';
import {MToonMaterial} from 'vrm';
import {byId,footprint} from 'model';
export const materials=[];const cache=new Map();function mat(c){if(!cache.has(c)){let m=new MToonMaterial({color:new T.Color(c),shadeColorFactor:new T.Color(c).multiplyScalar(.58),shadingToonyFactor:.95});cache.set(c,m);materials.push(m);}return cache.get(c);}
export function createTile(t){const c=byId[t.type],g=new T.Group(),inner=new T.Group();g.add(inner);const w=c.w*10,d=c.d*10;inner.rotation.y=-t.rotation*Math.PI/180;const fp=footprint(t);g.position.set((t.x+fp.w/2)*10,0,(t.z+fp.d/2)*10);
function mesh(geo,color,x=0,y=0,z=0){let o=new T.Mesh(geo,mat(color));o.position.set(x,y,z);inner.add(o);return o;}
const box=(a,b,c,color,x=0,y=b/2,z=0)=>mesh(new T.BoxGeometry(a,b,c),color,x,y,z);
const cyl=(r,h,color,x=0,y=h/2,z=0,rt=r)=>mesh(new T.CylinderGeometry(rt,r,h,16),color,x,y,z);
const ball=(r,color,x,y,z)=>mesh(new T.SphereGeometry(r,12,8),color,x,y,z);
const cone=(r,h,color,x,y,z,sides=4)=>mesh(new T.ConeGeometry(r,h,sides),color,x,y,z);
function tree(x,z,pine=false,pink=false){cyl(.2,1.5,'#967457',x,1,z);if(pine)cone(1,3,'#436f62',x,2.6,z,7);else ball(1.2,pink?'#efb5c4':'#689a66',x,2.7,z);}
function home(x,z,sx=5,h=3,color='#e3c19b',roof='#a36f61'){box(sx,h,4,color,x,h/2+.35,z);const r=cone(sx*.8,1.8,roof,x,h+1.1,z);r.rotation.y=Math.PI/4;for(let dx of [-1.3,1.3])box(.7,.9,.1,'#6799aa',x+dx,1.9,z+2.06);box(.9,1.5,.12,'#755e4a',x,1.1,z+2.06);}
function spire(x,z,h=15,color='#c7bfaa'){cyl(1,h,color,x,h/2+.4,z);cone(1.2,3,'#647b7f',x,h+1.9,z,8);}
function tower(x,z,h=14,bw=3,color='#95b5bf'){box(bw,h,bw,color,x,h/2+.4,z);for(let y=2;y<h;y+=2)box(bw+.08,.35,bw+.08,'#d7e8de',x,y,z);}
function arch(x,z,width=7,height=7,color='#ddcba7'){box(1.6,height,2,color,x-width/2+.8,height/2+.4,z);box(1.6,height,2,color,x+width/2-.8,height/2+.4,z);box(width,2,2,color,x,height+.4,z);}
function pagoda(levels=4){for(let j=0;j<levels;j++){let a=8-j*1.3;box(a,1.5,a*.75,'#eee2c9',0,1+j*2,0);let roof=cone(a*.85,1.5,'#508780',0,2.4+j*2,0);roof.rotation.y=Math.PI/4;}spire(0,0,levels*2+.5,'#c5ad62');}
const groundColor=c.category==='土地'?['#8fbd80','#c6a46f','#89b8b3','#bac3c7','#eef2e9','#6cb4cd','#9fc866','#72a278','#9ba48a','#71b6ce'][Number(c.id.slice(4))]:'#a7bc91';box(w-.12,.35,d-.12,groundColor);
if(c.category==='土地'){let i=Number(c.id.slice(4));if(i===2){box(7,.15,7,'#73bdd0',0,.4,0);for(let x of [-4,4])box(.6,.3,8,'#b9b8a4',x,.4,0);}if(i===6)for(let x=-3.5;x<4;x+=1)box(.25,.35,8,'#769349',x,.5,0);if(i===7)for(let x of [-2.5,0,2.5])for(let z of [-2.5,1.5])tree(x,z);if(i===8){cone(4,6,'#89977d',-.8,3,0,6);cone(2,2,'#eeeae0',-.8,6,0,6);}if(i===9){cyl(3.7,.4,'#dbce92',0,.4,0);tree(0,0);}}
else if(c.category==='道路'){const color=c.road===2?'#bc996a':'#687984';const roadY=c.road===3?1.4:.4;let segments=c.shape===0?[[0,0,4,10]]:c.shape===1?[[0,0,4,10],[0,0,10,4]]:[[0,2.5,4,5],[2.5,0,5,4]];segments.forEach(([x,z,a,b])=>{box(a,b===0?.1:.2,b,color,x,roadY,z);if(c.road===0){if(a===4){for(let dx of [-2.7,2.7])box(1.1,.3,b,'#dad7c8',x+dx,roadY,z);}else for(let dz of [-2.7,2.7])box(a,.3,1.1,'#dad7c8',x,roadY,z+dz);}});if(c.road===3){for(let x of [-2.7,2.7]){box(.2,.25,10,'#d2c5a6',x,2.6,0);for(let z of [-4,0,4])box(.2,1.2,.2,'#d2c5a6',x,2,z);}box(2,1.2,2,'#999c8c',0,.6,3);box(2,1.2,2,'#999c8c',0,.6,-3);}else if(c.road<2)for(let z of [-3,0,3])box(.14,.03,1.4,'#f2e7b8',0,roadY+.12,z);}
else if(c.category==='建築'){let i=Number(c.id.slice(8));if(i<6){home(0,0,i===4?7:5,i===3?4:3,i===5?'#9e795b':'#e3c19b',i===5?'#ecefe7':'#a56e60');if(i===2){let wind=cyl(1.7,6,'#dcc99c',-1,3,0,1);for(let a of [0,Math.PI/2]){let blade=box(.45,7,.25,'#eae2c9',-1,5,1.85);blade.rotation.z=a+.65;}}else tree(-3.3,-2.5,i===5,i===1);if(i===3){tree(3.5,2);ball(.18,'#bb6251',3.5,2.8,2.9);}if(i===4){box(.1,4,4,'#c0a48b',-1.2,2.3,0);box(.1,4,4,'#c0a48b',1.2,2.3,0);}}
else if(i<9){box(6,3.7,5,'#c2c2b3');for(let x of [-3,3])for(let z of [-2.5,2.5]){cyl(.9,5+(i-6),i===8?'#bdad9b':'#c7ccbd',x,3,z);cone(1.2,2,'#6e8494',x,6.4+i-6,z,8);}for(let x of [-2,0,2])box(.6,.6,5.1,'#c7ccbd',x,4.1,0);}
else{tower(0,0,10+(i-9)*5,6,['#9ab6c0','#a2afb8','#c1bca9'][i-9]);if(i===11)box(2,4,2,'#cdd7d1',0,21,0);}}
else {let i=Number(c.id.slice(7));switch(i){
case 0:box(23,4,12,'#d5bc91');box(25,.6,14,'#8c7b6b',0,4.6,0);for(let x=-9;x<=9;x+=3)box(1.3,2,.1,'#698b95',x,2,6.1);box(7,2,7,'#bbaa8c',0,5.5,0);break;
case 1:for(let j=0;j<8;j++){let a=6.7-j*.45;box(a,3,a,'#70a99c',0,2+j*3,0);box(a+.8,.45,a+.8,'#c0d3b4',0,3.4+j*3,0);}spire(0,0,29,'#80a99c');break;
case 2:tower(-4,0,17,5);tower(4,0,17,5);box(12,3,5,'#8ea6af',0,17,0);tower(0,0,27,4);break;
case 3:case 9:{const color=i===9?'#cf795c':'#898d80';for(let a of [-1,1])for(let b of [-1,1]){let leg=box(.8,17,.8,color,a*3.7,8.5,b*3.7);leg.rotation.z=a*.22;leg.rotation.x=-b*.22;}box(10,.5,10,color,0,5,0);box(6,.5,6,color,0,13,0);cone(3,12,color,0,19,0,4);spire(0,0,25,color);break;}
case 4:arch(0,0,15,9);box(17,1,6,'#e5d1ac',0,11,0);break;
case 5:tower(0,0,15,4,'#b9a780');box(4.4,3,4.4,'#c6b891',0,15,0);ball(1.15,'#f4efd6',0,15,2.3);cone(3.1,5,'#617c79',0,19,0);break;
case 6:for(let j=0;j<6;j++){let x=(j%3-1)*7,z=(Math.floor(j/3)-.5)*12; tower(x,z,10+j*2,5);box(3,4,.2,['#da8a70','#8eafce','#dabd6c'][j%3],x,6,z+2.6);}break;
case 7:for(let j=0;j<5;j++){let o=mesh(new T.SphereGeometry(4,16,8,0,Math.PI), '#f1eee1',-8+j*4,2,0);o.scale.set(.7,1.5,1.6);o.rotation.z=-.6+j*.3;}break;
case 8:pagoda(5);break;
case 10:box(28,.2,9,'#78b2c8',0,.5,4);for(let j=0;j<5;j++)tower(-10+j*4,-4,5+j%3*3,2.8);{let wheel=mesh(new T.TorusGeometry(4,.2,6,32),'#e3dfd2',8,5,3);for(let j=0;j<8;j++){let a=j*Math.PI/4;ball(.55,'#db8d74',8+4*Math.cos(a),5+4*Math.sin(a),3);}box(.5,5,.5,'#c8c1a8',8,2.5,3);}break;
case 11:home(0,0,7,7,'#e2b465','#f0e3bb');box(7,1,.4,'#eddbad',0,5,2.2);arch(0,2.4,3.5,3.5);break;
case 12:cyl(.75,22,'#acb7b6');ball(4,'#d592a4',0,8,0);ball(2.5,'#d592a4',0,18,0);for(let x of [-3,3]){let leg=box(.7,9,.7,'#a3aead',x,4.5,0);leg.rotation.z=x*.1;}break;
case 13:box(10,6,18,'#c5b292');for(let x of [-5,-2,2,5])spire(x,4,15+(x%2===0?3:0),'#c5b292');for(let x of [-3,0,3])spire(x,-5,22,'#c5b292');break;
case 14:box(11,5,10,'#d8bc6d');cyl(2,9,'#d38e76',-6,4.5,0);cone(2.5,3,'#6e9fac',-6,10,0,8);tower(4,0,10,3,'#e4cb6e');arch(0,5.4,7,5,'#c97962');break;
case 15:for(let x=-8;x<=8;x+=3.2)cyl(.55,7,'#ded3b7',x,3.7,0);box(20,1.5,5,'#c7bea8',0,8,0);box(7,2,3,'#8aab9c',0,10,0);break;
case 16:for(let x of [-7,7]){home(x,0,8,3,'#d9ba70','#ba7159');spire(x,-4,10,'#c8b17c');}let buddha=cyl(1.1,10,'#dfb95e',0,1.7,0);buddha.rotation.z=Math.PI/2;ball(1.5,'#dfb95e',-5,2,0);break;
case 17:box(17,.2,7,'#72b2ca',0,.5,0);cyl(1,3,'#e9e5d5',-2,2,0,.55);ball(1.1,'#eeeadb',-2,4,0);cone(1,3,'#e0e5d7',-2,1.5,0,12);box(6,.12,2,'#d1dad0',3,.7,0);break;
case 18:for(let x of [-4,4]){tower(x,0,23,3.6,'#b2c6c8');spire(x,0,28,'#bacbc8');}box(8,1.2,2,'#c8d0c9',0,14,0);break;
case 19:box(7,2,7,'#c3bba8');cyl(1,17,'#dedbd0',0,10,0,.55);cone(1,2,'#d6b45d',0,19.5,0,8);break;
case 20:{let sail=mesh(new T.SphereGeometry(6,16,12,0,Math.PI),'#efeee3',0,12,0);sail.scale.set(1,2,.45);spire(-4,0,25,'#8faeb7');for(let y=5;y<23;y+=3)box(7,.2,3,'#97b9c0',0,y,0);break;}
case 21:{let lean=new T.Group();for(let j=0;j<7;j++){cyl(2.5,1,'#e6ddc6',j*.16,j*1.6+1,0);cyl(2.2,.5,'#bcb7a8',j*.16,j*1.6+1.7,0);}break;}
case 22:cone(11,13,'#d9b77f',0,6.6,0,4).rotation.y=Math.PI/4;break;
case 23:box(22,2,12,'#aa7769');for(let j=0;j<7;j++){let x=-9+j*3,z=j%2?2:-2;spire(x,z,6+j%3*2,['#b67d64','#6f9a86','#c4ae69'][j%3]);ball(1.3,['#c18d73','#7e9f87','#b5b27e'][j%3],x,8+j%3*2,z);}break;
case 24:tower(-3,0,19,5,'#acbfbc');tower(3,0,14,5,'#96b3bc');box(13,2,9,'#cad2c5',0,1,0);break;
case 25:ball(2,'#a2a093',0,1,0);cyl(.5,2,'#74958d',0,2.6,0,.35);ball(.5,'#74958d',0,4,0);break;
case 26:box(12,5,10,'#d4a18d');ball(3.7,'#76a497',0,6,0);for(let x=-4;x<5;x+=2)box(.3,4,.3,'#e4cfb1',x,2.5,5.1);break;
case 27:for(let j=0;j<6;j++){let part=box(7,.3,7,['#d98c69','#e0bd61','#7baf9c','#7a9fc4'][j%4],(j%3-1)*5,3+Math.floor(j/3)*2,(j%2-.5)*5);part.rotation.z=(j%2?1:-1)*.3;}for(let x of [-6,0,6])box(.35,4,.35,'#a6b0a8',x,2,0);break;
}}
g.userData={tile:t};g.traverse(o=>{if(o.isMesh)o.userData.tile=t;});return g;}
