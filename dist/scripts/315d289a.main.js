$(document).ready(function(){!function(){function a(){e=document.getElementById("large-header"),f=document.getElementById("content")}function b(){d=window.innerHeight,c=window.innerWidth,e.style.height=d+"px",e.style.width=c+"px",f.style.height=d+"px",f.style.width=c+"px"}var c,d,e,f;a(),b(),window.addEventListener("resize",b)}()}),function(){function a(){p=new l.Scene,q=new l.PerspectiveCamera(45,u/v,.01,1e4),q.position.z=z,r=new l.WebGLRenderer({alpha:!0,antialias:!0}),r.setSize(u,v),p.add(new l.AmbientLight(10658466)),s=new l.PointLight(10526880),s.position.set(600,500,600),p.add(s),o={x:A.x,y:A.y,scale:A.scale,explosion:A.explosion},d(),m.appendChild(r.domElement),window.addEventListener("resize",i),e()}function b(){group=new THREE.Object3D,t=[];for(var a=new l.IcosahedronGeometry(200,0),b=0;b<a.faces.length;b++){var c=a.faces[b],d=new l.Geometry,e=new THREE.Object3D;d.vertices.push(a.vertices[c.a].clone()),d.vertices.push(a.vertices[c.b].clone()),d.vertices.push(a.vertices[c.c].clone()),d.faces.push(new THREE.Face3(0,1,2,c.normal.clone())),f(d),d.vertices.push(a.vertices[c.a].clone().multiplyScalar(w)),d.vertices.push(a.vertices[c.b].clone().multiplyScalar(w)),d.vertices.push(a.vertices[c.c].clone().multiplyScalar(w)),d.faces.push(new THREE.Face3(5,4,3,c.normal.clone())),d.faces.push(new THREE.Face3(0,3,4)),d.faces.push(new THREE.Face3(4,1,0)),d.faces.push(new THREE.Face3(5,2,1)),d.faces.push(new THREE.Face3(1,4,5)),d.faces.push(new THREE.Face3(3,0,2)),d.faces.push(new THREE.Face3(5,3,2)),d.computeFaceNormals(),d.computeVertexNormals();var i=new THREE.Mesh(d,new THREE.MeshLambertMaterial({ambient:10526880,color:F,specular:0,shininess:30,shading:l.NoShading,opacity:C}));e.add(i),e.center=d.center,g(e),h(e,o.explosion),group.add(e),t.push(e)}return group}function c(){return new l.Mesh(new l.IcosahedronGeometry(250,2),new l.MeshLambertMaterial({wireframe:!0,color:0,shininess:0,specular:0,ambient:8421504,opacity:.5}))}function d(){group=new THREE.Object3D,group.add(b()),group.add(c()),group.position.x=o.x,group.position.y=o.y,group.scale.set(o.scale,o.scale,o.scale),p.add(group)}function e(){TWEEN.update(),y+=x,requestAnimationFrame(e),group.rotation.y=y,r.render(p,q)}function f(a){a.center=new l.Vector3((a.vertices[0].x+a.vertices[1].x+a.vertices[2].x)/3,(a.vertices[0].y+a.vertices[1].y+a.vertices[2].y)/3,(a.vertices[0].z+a.vertices[1].z+a.vertices[2].z)/3)}function g(a){a.initPosition={x:a.position.x,y:a.position.y,z:a.position.z}}function h(a,b){a.initPosition&&(a.position.x=a.initPosition.x+a.center.x*b,a.position.y=a.initPosition.y+a.center.y*b,a.position.z=a.initPosition.z+a.center.z*b)}function i(){u=window.innerWidth,v=window.innerHeight,r.setSize(u,v),q.aspect=u/v,q.updateProjectionMatrix()}function j(){group.position.x=o.x,group.position.y=o.y,group.scale.set(o.scale,o.scale,o.scale);for(var a=t.length-1;a>=0;a--)h(t[a],o.explosion)}function k(){document.body.scrollTop>v/2&&0==D?(n&&n.stop(),n=new TWEEN.Tween(o).to(B,1e3).easing(E).onUpdate(j).start(),D=!0):document.body.scrollTop<v/2&&1==D&&(n&&n.stop(),n=new TWEEN.Tween(o).to(A,1e3).easing(E).onUpdate(j).start(),D=!1)}var l=THREE,m=document.getElementById("globe");if(Detector.webgl){var n,o,p,q,r,s,t,u=window.innerWidth,v=window.innerHeight,w=.95,x=.002,y=0,z=700,A={x:-500,y:0,scale:1,explosion:.04},B={x:0,y:0,scale:.8,explosion:.7},C=1,D=!1,E=TWEEN.Easing.Sinusoidal.InOut,F=13684944;a(),window.addEventListener("scroll",k)}}();