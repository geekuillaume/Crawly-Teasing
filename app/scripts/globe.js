// Created by Bjorn Sandvik - thematicmapping.org
(function () {

    var t = THREE;
    var webglEl = document.getElementById('globe');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var width  = 634,
        height = 486,
        explosionRatio = 0.3,
        verticeDepth = -0.05,
        rotationSpeed = 0.005,
        rotation = 0;
    var color =  0xd0d0d0;

    var scene = new t.Scene();
    var camera = new t.PerspectiveCamera(45, width / height, 0.01, 10000);
    camera.position.z = 700;

    var renderer = new t.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(width, height);

    scene.add(new t.AmbientLight(0xa2a2a2));

    var light = new t.PointLight(0xa0a0a0);
    light.position.set(600, 500, 600);
    scene.add(light);

    var sphere = [];

    var sphereFaces = new t.IcosahedronGeometry(200, 0);

    for (var i = 0; i < sphereFaces.faces.length; i++) {
        var face = sphereFaces.faces[i];
        var vertice = new t.Geometry();
        vertice.vertices.push(sphereFaces.vertices[face.a].clone());
        vertice.vertices.push(sphereFaces.vertices[face.b].clone());
        vertice.vertices.push(sphereFaces.vertices[face.c].clone());
        vertice.faces.push(new THREE.Face3(0, 1, 2, face.normal.clone())); // Front
        getCenter(vertice);
        var innerPointsTranslate = vertice.center.clone().multiplyScalar(verticeDepth);
        vertice.vertices.push(sphereFaces.vertices[face.a].clone().add(innerPointsTranslate));
        vertice.vertices.push(sphereFaces.vertices[face.b].clone().add(innerPointsTranslate));
        vertice.vertices.push(sphereFaces.vertices[face.c].clone().add(innerPointsTranslate));
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
        explode(vertice, explosionRatio);

        var mesh = new THREE.Mesh(vertice, new THREE.MeshLambertMaterial({
            ambient: 0xa0a0a0,
            color: color,
            specular: 0x000000,
            shininess: 30,
            shading: t.NoShading,
            opacity: 0.8
        }));
        scene.add(mesh);
        sphere.push(mesh);
    };

    var outside = new t.Mesh(
        new t.IcosahedronGeometry(250, 2),
        new t.MeshLambertMaterial({
            wireframe: true,
            color: 0x000000,
            shininess: 0,
            specular: 0,
            ambient: 0x808080,
            opacity: 0.5
        }) )

    scene.add(outside);

    webglEl.appendChild(renderer.domElement);

    var controls = new t.TrackballControls(camera, renderer.domElement);
    render();

    function render() {
        rotation += rotationSpeed;
        camera.position.x = Math.sin(rotation) * 700;
        camera.position.z = Math.cos(rotation) * 700;
        camera.lookAt(scene.position);
        // camera.rotation.z = -1;
        // controls.update();
        requestAnimationFrame(render);
        light.position.x = Math.sin(rotation - rotationSpeed * 30) * 700;
        light.position.z = Math.cos(rotation - rotationSpeed * 30) * 700;
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

    function explode(geometry, ratio) {
        geometry.applyMatrix(new THREE.Matrix4().makeTranslation(geometry.center.x * ratio, geometry.center.y * ratio, geometry.center.z * ratio));
    }

}());
