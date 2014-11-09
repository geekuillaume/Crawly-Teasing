(function () {
    if (window.innerWidth <= 650) {
        return;
    }

    var t = THREE;
    var webglEl = document.getElementById('globe');

    if (!Detector.webgl) {
        $("body").addClass("no-webgl");
        console.log("No WebGL Detected");
        return;
    }

    var width  = window.innerWidth,
        height = window.innerHeight,
        verticeDepth = 0.95,
        rotationSpeed = 0.002,
        rotation = 0,
        cameraDistance = 700,
        startPosition = {x: -500, y: 0, scale: 1, explosion: 0.04, opacity: 1},
        middlePosition = {x: 0, y: 0, scale: 0.8, explosion: 0.7, opacity: 0.8},
        endPosition = {x: 0, y: 160, scale: 0.1, explosion: 5, opacity: 0.8},
        opacity = 1,
        globeCenter = 0,
        animation,
        globePosition,
        ease = TWEEN.Easing.Sinusoidal.InOut,
        centerSize = 50,
        cubeColor = 0xd0d000;
    var color =  0xf0f0f0;

    var scene, camera, renderer, light, sphere = [], center;

    init();

    function init() {
        scene = new t.Scene();
        camera = new t.PerspectiveCamera(45, width / height, 0.01, 10000);
        camera.position.z = cameraDistance;

        renderer = new t.WebGLRenderer({alpha: true, antialias: true, preserveDrawingBuffer: true});
        renderer.setSize(width, height);

        scene.add(new t.AmbientLight(0xa2a2a2));

        light = new t.PointLight(0xa0a0a0);
        light.position.set(600, 500, 600);
        scene.add(light);
        globePosition = _.clone(startPosition);
        createScene();
        webglEl.appendChild(renderer.domElement);
        webglEl.style['z-index'] = 1;
        window.addEventListener('resize', resize);
        render();
    }

    function createSphere() {
        group = new THREE.Object3D();

        var sphereFaces = new t.IcosahedronGeometry(200, 0);

        for (var i = 0; i < sphereFaces.faces.length; i++) {
            var face = sphereFaces.faces[i];
            var vertice = new t.Geometry();
            var faceGroup = new t.Object3D();
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
                opacity: opacity,
                transparent: true
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
                color: 0xa0a0a0,
                shininess: 0,
                specular: 0,
                ambient: 0x808080,
                opacity: 0.5,
                transparent: true
            }) )
    }

    function createInside() {
        var geometry = new t.IcosahedronGeometry(centerSize, 0);
        animCenterVertice(geometry);
        // var material = new t.MeshLambertMaterial({
        //     ambient: 0xa0a0a0,
        //     color: cubeColor,
        //     specular: 0x000000,
        //     shininess: 30,
        //     shading: t.NoShading,
        //     opacity: opacity
        // });
        var material = new t.MeshNormalMaterial();
        var sphere = new t.Mesh(geometry, material);
        var obj = new t.Object3D();
        obj.add(sphere);
        center = obj;
        return obj;

        for (var i = 0; i < cubeNb; i++) {
            var geometry = new t.BoxGeometry(cubeSize, cubeSize, cubeSize);
            obj.rotation.x = Math.random() * 360;
            obj.rotation.y = Math.random() * 360;
            obj.rotation.z = Math.random() * 360;
        };
    }

    function createScene() {
        group = new THREE.Object3D();
        group.add(createSphere());
        group.add(createOutside());
        scene.add(createInside());

        group.position.x = globePosition.x;
        group.position.y = globePosition.y;
        center.position.x = globePosition.x;
        center.position.y = globePosition.y;

        group.scale.set(globePosition.scale, globePosition.scale, globePosition.scale);
        scene.add(group);
    }

    function render(time) {
        TWEEN.update();
        rotation += rotationSpeed;
        group.rotation.y = rotation;
        group.rotation.x = rotation;
        center.rotation.y = rotation * -1;
        center.rotation.z = rotation * -1;
        renderer.render(scene, camera);
        requestAnimationFrame(render);
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
        center.position.x = globePosition.x;
        center.position.y = globePosition.y;
        group.scale.set(globePosition.scale, globePosition.scale, globePosition.scale);
        _.each(group.children, function(el) {
            if (!el.initPosition)
                return;
            // console.log(el);
            el.children[0].material.opacity = globePosition.opacity;
        });
        for (var i = sphere.length - 1; i >= 0; i--) {
            explode(sphere[i], globePosition.explosion);
        };
    }

    window.changeSphereStep = function(index) {
        if (index == 0 && globeCenter != 0) {
            animation && animation.stop();
            animation = new TWEEN.Tween(globePosition)
                .to(startPosition, 1000)
                .easing(ease)
                .onUpdate(updateGroup)
                .start();
            globeCenter = 0;
            webglEl.style['z-index'] = 1;
        }
        else if (index == 1 && globeCenter != 1) {
            animation && animation.stop();
            animation = new TWEEN.Tween(globePosition)
                .to(middlePosition, 1000)
                .easing(ease)
                .onUpdate(updateGroup)
                .onComplete(function() {
                    webglEl.style['z-index'] = 0;
                })
                .start();
            globeCenter = 1;
        }
        else if (index == 2 && globeCenter != 2) {
            animation && animation.stop();
            animation = new TWEEN.Tween(globePosition)
                .to(endPosition, 1000)
                .easing(ease)
                .onUpdate(updateGroup)
                .start();
            globeCenter = 2;
            webglEl.style['z-index'] = 1;
        }
    }

    function animCenterVertice(geometry) {
        // var animations = new Array(geometry.vertices.length);
        // _.each(geometry.vertices, function(vertice) {
        //     vertice.init = {x: vertice.x, y: vertice.y, z: vertice.z};
        //     anim(vertice);
        // });
        // function anim(vertice) {
        //     console.log(vertice.init);
        //     var ratio = Math.random() / 5;
        //     new TWEEN.Tween(vertice)
        //     .to({
        //         x: vertice.init.x + vertice.init.x * ratio,
        //         y: vertice.init.y + vertice.init.y * ratio,
        //         x: vertice.init.z + vertice.init.z * ratio,
        //     })
        //     .easing(ease)
        //     .onComplete(anim.bind(this, vertice))
        //     .start()
        // }
    }

}());
