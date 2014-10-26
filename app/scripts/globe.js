// Created by Bjorn Sandvik - thematicmapping.org
(function () {

    var t = THREE;
    var webglEl = document.getElementById('globe');

    if (!Detector.webgl) {
        // Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var width  = window.innerWidth,
        height = window.innerHeight,
        verticeDepth = 0.95,
        rotationSpeed = 0.002,
        rotation = 0,
        cameraDistance = 700,
        startPosition = {x: -500, y: 0, scale: 1, explosion: 0.04},
        endPosition = {x: 0, y: 0, scale: 0.8, explosion: 0.7},
        opacity = 1,
        globeCenter = false,
        animation,
        globePosition,
        ease = TWEEN.Easing.Sinusoidal.InOut;
    var color =  0xd0d0d0;

    var scene, camera, renderer, light, sphere;

    init();

    function init() {
        scene = new t.Scene();
        camera = new t.PerspectiveCamera(45, width / height, 0.01, 10000);
        camera.position.z = cameraDistance;

        renderer = new t.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(width, height);

        scene.add(new t.AmbientLight(0xa2a2a2));

        light = new t.PointLight(0xa0a0a0);
        light.position.set(600, 500, 600);
        scene.add(light);
        globePosition = {
            x: startPosition.x,
            y: startPosition.y,
            scale: startPosition.scale,
            explosion: startPosition.explosion
        };
        createScene();
        webglEl.appendChild(renderer.domElement);
        window.addEventListener('resize', resize);
        render();
    }

    function createSphere() {
        group = new THREE.Object3D();

        sphere = [];
        var sphereFaces = new t.IcosahedronGeometry(200, 0);

        for (var i = 0; i < sphereFaces.faces.length; i++) {
            var face = sphereFaces.faces[i];
            var vertice = new t.Geometry();
            var faceGroup = new THREE.Object3D();
            vertice.vertices.push(sphereFaces.vertices[face.a].clone());
            vertice.vertices.push(sphereFaces.vertices[face.b].clone());
            vertice.vertices.push(sphereFaces.vertices[face.c].clone());
            vertice.faces.push(new THREE.Face3(0, 1, 2, face.normal.clone())); // Front
            getCenter(vertice);
            vertice.vertices.push(sphereFaces.vertices[face.a].clone().multiplyScalar(verticeDepth));
            vertice.vertices.push(sphereFaces.vertices[face.b].clone().multiplyScalar(verticeDepth));
            vertice.vertices.push(sphereFaces.vertices[face.c].clone().multiplyScalar(verticeDepth));
            vertice.faces.push(new THREE.Face3(5, 4, 3, face.normal.clone())); // Back Face
            // Sides faces
            vertice.faces.push(new THREE.Face3(0, 3, 4));
            vertice.faces.push(new THREE.Face3(4, 1, 0));
            vertice.faces.push(new THREE.Face3(5, 2, 1));
            vertice.faces.push(new THREE.Face3(1, 4, 5));
            vertice.faces.push(new THREE.Face3(3, 0, 2));
            vertice.faces.push(new THREE.Face3(5, 3, 2));

            // Compute normals for sides faces
            vertice.computeFaceNormals();
            vertice.computeVertexNormals();

            // Espace all faces

            var mesh = new THREE.Mesh(vertice, new THREE.MeshLambertMaterial({
                ambient: 0xa0a0a0,
                color: color,
                specular: 0x000000,
                shininess: 30,
                shading: t.NoShading,
                opacity: opacity
            }));
            faceGroup.add(mesh);
            faceGroup.center = vertice.center;
            initExplosion(faceGroup);
            explode(faceGroup, globePosition.explosion);
            group.add(faceGroup);//add a mesh with geometry to it
            sphere.push(faceGroup);
        };
        return group;
    }

    function createOutside() {
        return new t.Mesh(
            new t.IcosahedronGeometry(250, 2),
            new t.MeshLambertMaterial({
                wireframe: true,
                color: 0x000000,
                shininess: 0,
                specular: 0,
                ambient: 0x808080,
                opacity: 0.5
            }) )
    }

    function createScene() {
        group = new THREE.Object3D();
        group.add(createSphere());
        group.add(createOutside());

        group.position.x = globePosition.x;
        group.position.y = globePosition.y;
        group.scale.set(globePosition.scale, globePosition.scale, globePosition.scale);
        scene.add(group);
    }


    // var controls = new t.TrackballControls(camera, renderer.domElement);

    function render() {
        TWEEN.update();
        rotation += rotationSpeed;
        // controls.update();
        requestAnimationFrame(render);
        group.rotation.y = rotation;
        // light.position.x = Math.sin(rotation - rotationSpeed * 30) * cameraDistance;
        // light.position.z = Math.cos(rotation - rotationSpeed * 30) * cameraDistance;
        // light.position.set(camera.position.x + 500, camera.position.y + 300, camera.position.z);
        renderer.render(scene, camera);
    }

    function getCenter(geometry) {
        geometry.center = new t.Vector3(
            (geometry.vertices[0].x + geometry.vertices[1].x + geometry.vertices[2].x) / 3,
            (geometry.vertices[0].y + geometry.vertices[1].y + geometry.vertices[2].y) / 3,
            (geometry.vertices[0].z + geometry.vertices[1].z + geometry.vertices[2].z) / 3
        );
    }

    function initExplosion(object) {
        object.initPosition = {
            x: object.position.x,
            y: object.position.y,
            z: object.position.z
        }
    }

    function explode(object, ratio) {
        if (!object.initPosition)
            return;
        object.position.x = object.initPosition.x + object.center.x * ratio,
        object.position.y = object.initPosition.y + object.center.y * ratio,
        object.position.z = object.initPosition.z + object.center.z * ratio
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    window.addEventListener('scroll', scroll);

    function updateGroup() {
        group.position.x = globePosition.x;
        group.position.y = globePosition.y;
        group.scale.set(globePosition.scale, globePosition.scale, globePosition.scale);
        for (var i = sphere.length - 1; i >= 0; i--) {
            explode(sphere[i], globePosition.explosion);
        };
    }

    function scroll() {
        if (document.body.scrollTop > height / 2 && globeCenter == false) {
            animation && animation.stop();
            animation = new TWEEN.Tween(globePosition)
                .to(endPosition, 1000)
                .easing(ease)
                .onUpdate(updateGroup)
                .start();
            globeCenter = true;
        }
        else if (document.body.scrollTop < height / 2 && globeCenter == true) {
            animation && animation.stop();
            animation = new TWEEN.Tween(globePosition)
                .to(startPosition, 1000)
                .easing(ease)
                .onUpdate(updateGroup)
                .start();
            globeCenter = false;
        }
    }

}());
