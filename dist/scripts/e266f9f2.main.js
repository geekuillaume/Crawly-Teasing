$(document).ready(function(){!function(){function a(){e=document.getElementById("large-header"),f=document.getElementById("content")}function b(){d=window.innerHeight,c=window.innerWidth,e.style.height=d+"px",e.style.width=c+"px",f.style.height=d+"px",f.style.width=c+"px"}var c,d,e,f;a(),b(),window.addEventListener("resize",b)}()}),function(){function a(){r=new n.Scene,s=new n.PerspectiveCamera(45,w/x,.01,1e4),s.position.z=B,t=new n.WebGLRenderer({alpha:!0,antialias:!0}),t.setSize(w,x),r.add(new n.AmbientLight(10658466)),u=new n.PointLight(10526880),u.position.set(600,500,600),r.add(u),q=_.clone(C),e(),o.appendChild(t.domElement),window.addEventListener("resize",j),f()}function b(){group=new THREE.Object3D;for(var a=new n.IcosahedronGeometry(200,0),b=0;b<a.faces.length;b++){var c=a.faces[b],d=new n.Geometry,e=new n.Object3D;d.vertices.push(a.vertices[c.a].clone()),d.vertices.push(a.vertices[c.b].clone()),d.vertices.push(a.vertices[c.c].clone()),d.faces.push(new THREE.Face3(0,1,2,c.normal.clone())),g(d),d.vertices.push(a.vertices[c.a].clone().multiplyScalar(y)),d.vertices.push(a.vertices[c.b].clone().multiplyScalar(y)),d.vertices.push(a.vertices[c.c].clone().multiplyScalar(y)),d.faces.push(new THREE.Face3(5,4,3,c.normal.clone())),d.faces.push(new THREE.Face3(0,3,4)),d.faces.push(new THREE.Face3(4,1,0)),d.faces.push(new THREE.Face3(5,2,1)),d.faces.push(new THREE.Face3(1,4,5)),d.faces.push(new THREE.Face3(3,0,2)),d.faces.push(new THREE.Face3(5,3,2)),d.computeFaceNormals(),d.computeVertexNormals();var f=new THREE.Mesh(d,new THREE.MeshLambertMaterial({ambient:10526880,color:I,specular:0,shininess:30,shading:n.NoShading,opacity:E,transparent:!0}));e.add(f),e.center=d.center,h(e),i(e,q.explosion),group.add(e),J.push(e)}return group}function c(){return new n.Mesh(new n.IcosahedronGeometry(250,2),new n.MeshLambertMaterial({wireframe:!0,color:10526880,shininess:0,specular:0,ambient:8421504,opacity:.5,transparent:!0}))}function d(){var a=new n.IcosahedronGeometry(H,0);m(a);var b=new n.MeshNormalMaterial,c=new n.Mesh(a,b),d=new n.Object3D;return d.add(c),v=d,d;var a}function e(){group=new THREE.Object3D,group.add(b()),group.add(c()),r.add(d()),group.position.x=q.x,group.position.y=q.y,v.position.x=q.x,v.position.y=q.y,group.scale.set(q.scale,q.scale,q.scale),r.add(group)}function f(){v.children[0].geometry.verticesNeedUpdate=!0,v.children[0].geometry.elementsNeedUpdate=!0,v.children[0].geometry.morphTargetsNeedUpdate=!0,v.children[0].geometry.uvsNeedUpdate=!0,v.children[0].geometry.normalsNeedUpdate=!0,v.children[0].geometry.colorsNeedUpdate=!0,v.children[0].geometry.tangentsNeedUpdate=!0,TWEEN.update(),A+=z,requestAnimationFrame(f),group.rotation.y=A,group.rotation.x=A,v.rotation.y=-1*A,v.rotation.z=-1*A,t.render(r,s)}function g(a){a.center=new n.Vector3((a.vertices[0].x+a.vertices[1].x+a.vertices[2].x)/3,(a.vertices[0].y+a.vertices[1].y+a.vertices[2].y)/3,(a.vertices[0].z+a.vertices[1].z+a.vertices[2].z)/3)}function h(a){a.initPosition={x:a.position.x,y:a.position.y,z:a.position.z}}function i(a,b){a.initPosition&&(a.position.x=a.initPosition.x+a.center.x*b,a.position.y=a.initPosition.y+a.center.y*b,a.position.z=a.initPosition.z+a.center.z*b)}function j(){w=window.innerWidth,x=window.innerHeight,t.setSize(w,x),s.aspect=w/x,s.updateProjectionMatrix()}function k(){group.position.x=q.x,group.position.y=q.y,v.position.x=q.x,v.position.y=q.y,group.scale.set(q.scale,q.scale,q.scale),_.each(group.children,function(a){a.initPosition&&(a.children[0].material.opacity=q.opacity)});for(var a=J.length-1;a>=0;a--)i(J[a],q.explosion)}function l(){document.body.scrollTop>x/2&&0==F?(p&&p.stop(),p=new TWEEN.Tween(q).to(D,1e3).easing(G).onUpdate(k).start(),F=!0):document.body.scrollTop<x/2&&1==F&&(p&&p.stop(),p=new TWEEN.Tween(q).to(C,1e3).easing(G).onUpdate(k).start(),F=!1)}function m(){}var n=THREE,o=document.getElementById("globe");if(Detector.webgl){var p,q,r,s,t,u,v,w=window.innerWidth,x=window.innerHeight,y=.95,z=.002,A=0,B=700,C={x:-500,y:0,scale:1,explosion:.04,opacity:1},D={x:0,y:0,scale:.8,explosion:.7,opacity:.8},E=1,F=!1,G=TWEEN.Easing.Sinusoidal.InOut,H=50,I=15790320,J=[];a(),window.addEventListener("scroll",l)}}();