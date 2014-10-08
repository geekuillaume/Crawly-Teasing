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
        rotationSpeed = 0.01,
        rotation = 0;
    var color =  0xd0d0d0;

    var scene = new t.Scene();
    var camera = new t.PerspectiveCamera(45, width / height, 0.01, 10000);
    camera.position.z = 700;

    var renderer = new t.WebGLRenderer({alpha: true, antialias: true});
    renderer.setSize(width, height);

    scene.add(new t.AmbientLight(0x333333));

    var light = new t.PointLight(0xffffff);
    light.position.set(600, 600, 600);
    scene.add(light);

    var sphere = [];

    var sphereFaces = new t.SphereGeometry(200, 5, 3);


    var cube = new THREE.Mesh(new THREE.CubeGeometry(200, 200, 200), new THREE.MeshNormalMaterial());
    // cube.overdraw = true;

    // scene.add(cube);

    for (var i = 0; i < sphereFaces.faces.length; i++) {
        var face = sphereFaces.faces[i];
        var vertice = new t.Geometry();
        vertice.vertices.push(sphereFaces.vertices[face.a].clone());
        vertice.vertices.push(sphereFaces.vertices[face.b].clone());
        vertice.vertices.push(sphereFaces.vertices[face.c].clone());
        vertice.faces.push(new THREE.Face3(0, 1, 2, face.normal));
        getCenter(vertice);
        var innerPointsTranslate = vertice.center.clone().multiplyScalar(0.02);
        vertice.vertices.push(sphereFaces.vertices[face.a].clone().add(innerPointsTranslate));
        vertice.vertices.push(sphereFaces.vertices[face.b].clone().add(innerPointsTranslate));
        vertice.vertices.push(sphereFaces.vertices[face.c].clone().add(innerPointsTranslate));
        vertice.faces.push(new THREE.Face3(3, 4, 5, face.normal));
        vertice.faces.push(new THREE.Face3(0, 3, 4));
        vertice.faces.push(new THREE.Face3(0, 1, 4));
        vertice.faces.push(new THREE.Face3(1, 2, 5));
        vertice.faces.push(new THREE.Face3(1, 4, 5));
        vertice.faces.push(new THREE.Face3(2, 0, 3));
        vertice.faces.push(new THREE.Face3(2, 3, 5));
        vertice.computeFaceNormals();
        vertice.computeVertexNormals();
        explode(vertice, explosionRatio);

        var mesh = new THREE.Mesh(vertice, new THREE.MeshPhongMaterial({
            ambient: 0x030303,
            color: color,
            specular: 0x000000,
            shininess: 30,
            shading: t.FlatShading,
            side: t.DoubleSide
        }));
        scene.add(mesh);

        // var point = new t.Vector3(sphereFaces.vertices[face.a]);
        // vertice.vertices.push(point.add(triangle.normal().multiplyScalar(5)));
        // var point = new t.Vector3(sphereFaces.vertices[face.b]);
        // vertice.vertices.push(point.add(triangle.normal().multiplyScalar(5)));
        // var point = new t.Vector3(sphereFaces.vertices[face.c]);
        // vertice.vertices.push(point.add(triangle.normal().multiplyScalar(5)));

        // vertice.faces.push(new THREE.Face3(0, 1, 2));
        // var mesh = new THREE.Mesh(vertice, new THREE.MeshPhongMaterial({color: "red", side: t.DoubleSide}));
        // scene.add(mesh);

        sphere.push(mesh);
    };

    webglEl.appendChild(renderer.domElement);

    var controls = new t.TrackballControls(camera, renderer.domElement);
    render();

    function render() {
        rotation += rotationSpeed;
        camera.position.x = Math.sin(rotation) * 700;
        camera.position.z = Math.cos(rotation) * 700;
        camera.lookAt(scene.position);
        // controls.update();
        requestAnimationFrame(render);
        light.position.set(camera.position.x, camera.position.y, camera.position.z);
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
