$(document).ready(function(){function a(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var a=$(this.hash);if(a=a.length?a:$("[name="+this.hash.slice(1)+"]"),a.length)return $("html,body").animate({scrollTop:a.offset().top},500),!1}})}function b(){function a(){e=$(".fullHeight"),d=window.innerHeight,c=window.innerWidth}function b(){d=window.innerHeight,c=window.innerWidth,e.css("min-height",d+"px"),e.css("min-width",c+"px")}var c,d,e;a(),b(),window.addEventListener("resize",b)}$("body").removeClass("no-js"),window.innerWidth<=650?($("h1").fitText(.6),a(),b()):($(".moveDownButtton").click(function(a){a.preventDefault(),$(".main").moveDown()}),$(".main").onepage_scroll({sectionContainer:".section",easing:"ease",animationTime:1e3,pagination:!1,updateURL:!1,beforeMove:function(a){window.changeSphereStep&&window.changeSphereStep(a-1)},loop:!1,keyboard:!0,responsiveFallback:650,direction:"vertical"}))}),function(){function a(){q=new m.Scene,r=new m.PerspectiveCamera(45,v/w,.01,1e4),r.position.z=A,s=new m.WebGLRenderer({alpha:!0,antialias:!0,preserveDrawingBuffer:!0}),s.setSize(v,w),q.add(new m.AmbientLight(10658466)),t=new m.PointLight(10526880),t.position.set(600,500,600),q.add(t),p=_.clone(B),e(),n.appendChild(s.domElement),n.style["z-index"]=1,window.addEventListener("resize",j),f()}function b(){group=new THREE.Object3D;for(var a=new m.IcosahedronGeometry(200,0),b=0;b<a.faces.length;b++){var c=a.faces[b],d=new m.Geometry,e=new m.Object3D;d.vertices.push(a.vertices[c.a].clone()),d.vertices.push(a.vertices[c.b].clone()),d.vertices.push(a.vertices[c.c].clone()),d.faces.push(new THREE.Face3(0,1,2,c.normal.clone())),g(d),d.vertices.push(a.vertices[c.a].clone().multiplyScalar(x)),d.vertices.push(a.vertices[c.b].clone().multiplyScalar(x)),d.vertices.push(a.vertices[c.c].clone().multiplyScalar(x)),d.faces.push(new THREE.Face3(5,4,3,c.normal.clone())),d.faces.push(new THREE.Face3(0,3,4)),d.faces.push(new THREE.Face3(4,1,0)),d.faces.push(new THREE.Face3(5,2,1)),d.faces.push(new THREE.Face3(1,4,5)),d.faces.push(new THREE.Face3(3,0,2)),d.faces.push(new THREE.Face3(5,3,2)),d.computeFaceNormals(),d.computeVertexNormals();var f=new THREE.Mesh(d,new THREE.MeshLambertMaterial({ambient:10526880,color:I,specular:0,shininess:30,shading:m.NoShading,opacity:E,transparent:!0}));e.add(f),e.center=d.center,h(e),i(e,p.explosion),group.add(e),J.push(e)}return group}function c(){return new m.Mesh(new m.IcosahedronGeometry(250,2),new m.MeshLambertMaterial({wireframe:!0,color:10526880,shininess:0,specular:0,ambient:8421504,opacity:.5,transparent:!0}))}function d(){var a=new m.IcosahedronGeometry(H,0);l(a);var b=new m.MeshNormalMaterial,c=new m.Mesh(a,b),d=new m.Object3D;return d.add(c),u=d,d;var a}function e(){group=new THREE.Object3D,group.add(b()),group.add(c()),q.add(d()),group.position.x=p.x,group.position.y=p.y,u.position.x=p.x,u.position.y=p.y,group.scale.set(p.scale,p.scale,p.scale),q.add(group)}function f(){TWEEN.update(),z+=y,group.rotation.y=z,group.rotation.x=z,u.rotation.y=-1*z,u.rotation.z=-1*z,s.render(q,r),requestAnimationFrame(f)}function g(a){a.center=new m.Vector3((a.vertices[0].x+a.vertices[1].x+a.vertices[2].x)/3,(a.vertices[0].y+a.vertices[1].y+a.vertices[2].y)/3,(a.vertices[0].z+a.vertices[1].z+a.vertices[2].z)/3)}function h(a){a.initPosition={x:a.position.x,y:a.position.y,z:a.position.z}}function i(a,b){a.initPosition&&(a.position.x=a.initPosition.x+a.center.x*b,a.position.y=a.initPosition.y+a.center.y*b,a.position.z=a.initPosition.z+a.center.z*b)}function j(){v=window.innerWidth,w=window.innerHeight,s.setSize(v,w),r.aspect=v/w,r.updateProjectionMatrix()}function k(){group.position.x=p.x,group.position.y=p.y,u.position.x=p.x,u.position.y=p.y,group.scale.set(p.scale,p.scale,p.scale),_.each(group.children,function(a){a.initPosition&&(a.children[0].material.opacity=p.opacity)});for(var a=J.length-1;a>=0;a--)i(J[a],p.explosion)}function l(){}if(!(window.innerWidth<=650)){var m=THREE,n=document.getElementById("globe");if(!Detector.webgl)return void console.log("No WebGL Detected");$("body").removeClass("no-webgl");var o,p,q,r,s,t,u,v=window.innerWidth,w=window.innerHeight,x=.95,y=.002,z=0,A=700,B={x:-500,y:0,scale:1,explosion:.04,opacity:1},C={x:0,y:0,scale:.8,explosion:.7,opacity:.8},D={x:0,y:160,scale:.1,explosion:5,opacity:.8},E=1,F=0,G=TWEEN.Easing.Sinusoidal.InOut,H=50,I=15790320,J=[];a(),window.addEventListener("scroll",scroll),window.changeSphereStep=function(a){0==a&&0!=F?(o&&o.stop(),o=new TWEEN.Tween(p).to(B,1e3).easing(G).onUpdate(k).start(),F=0,n.style["z-index"]=1):1==a&&1!=F?(o&&o.stop(),o=new TWEEN.Tween(p).to(C,1e3).easing(G).onUpdate(k).onComplete(function(){n.style["z-index"]=0}).start(),F=1):2==a&&2!=F&&(o&&o.stop(),o=new TWEEN.Tween(p).to(D,1e3).easing(G).onUpdate(k).start(),F=2,n.style["z-index"]=1)}}}();