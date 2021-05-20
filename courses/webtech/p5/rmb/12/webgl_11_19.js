// 11

var mygame = {
  renderer: "",
  scene: "",
  camera: "",
  light: "",
  car: {
    mesh: "",
    speed: 0,
    speedUP: false,
    left: false,
    right: false,
    wheelangle: 0
  },
  walls: [{x: 0, y: 100, z: -1000},
          {x: -1000, y: 100, z: 0},
          {x: 0, y: 100, z: 1000},
          {x: 1000, y: 100, z:0}],
  textures: {
    car: "",
    floor: "",
    walls: ""
  },
  targets: {
    mesh: "",
    edges: [],
  },
  input: []
};

// 12

mygame.initiate = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;
  var canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);

  mygame.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  mygame.scene = new THREE.Scene();
  mygame.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
  mygame.camera.position.set(0, 50, 150);

  mygame.light = new THREE.PointLight(0x999999, 1);
  mygame.light.position.set(0, 50, 150);
  mygame.scene.add(mygame.light);

  window.addEventListener("keydown", function(event) {
    mygame.input.push({type: "keydown", key: event.key});
  });
  window.addEventListener("keyup", function(event) {
    mygame.input.push({type: "keyup", key: event.key});
  });
  mygame.loading();
  // mygame.create();  // RMB commented out since loading calls create when done
};

// 13

mygame.loading = function() {
  var loader = new THREE.ColladaLoader();
  loader.load("police.dae", function(collada) {
    mygame.textures.car = collada;
  });
  var image1 = document.createElement("img");
  image1.src = "wet_asphalt.jpg";
  image1.addEventListener("load", function(event) {
    mygame.textures.floor = event.target;
  });
  var image2 = document.createElement("img");
  image2.src = "wall.jpg";
  image2.addEventListener("load", function(event) {
    mygame.textures.walls = event.target;
  });
  var controlloop = function() {
    if (mygame.textures.car && mygame.textures.floor && mygame.textures.walls) {
      mygame.create();
    } else {
      setTimeout(controlloop, 200);
    }
  };
  controlloop();
};

// 14

mygame.create = function() {
  var geometry, material, texture, mesh;
  mesh = mygame.textures.car.scene;
  mesh.scale.set(20, 20, 20);
  mesh.rotation.set(-Math.PI / 2, 0, Math.PI);
  mesh.position.y += 14;
  mygame.scene.add(mesh);
  mygame.car.mesh = mesh;

  geometry = new THREE.PlaneGeometry(2000, 2000, 10, 10);
  texture = new THREE.Texture(mygame.textures.floor, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping);
  texture.repeat.set(20, 20);

  texture.needsUpdate = true;

  material = new THREE.MeshPhongMaterial({map: texture});
  mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = Math.PI * 1.5;
  mygame.scene.add(mesh);

  for (var f = 0; f < 4; f++) {
    geometry = new THREE.PlaneGeometry(2000, 200, 10, 10);
    texture = new THREE.Texture(mygame.textures.walls, THREE.UVMapping, THREE.RepeatWrapping, THREE.RepeatWrapping);
    texture.repeat.set(10, 1);
    texture.needsUpdate = true;

    material = new THREE.MeshPhongMaterial({map: texture});
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(mygame.walls[f].x, mygame.walls[f].y, mygame.walls[f].z);
    mesh.rotation.y = Math.PI / 2 * f;
    mygame.scene.add(mesh);
  }
  mygame.loop();
};

// 15

mygame.control = function(event) {
  var action;
  while (mygame.input.length) {
    action = mygame.input.shift();
    switch (action.type) {
      case "keydown":
        switch(action.key){
          case "ArrowUp":
            mygame.car.speedUP = true;
            break;
          case "ArrowLeft":
            mygame.car.left = true;
            break;
          case "ArrowRight":
            mygame.car.right = true;
            break;
        }
        break;
      case "keyup":
        switch(action.key){
          case "ArrowUp":
            mygame.car.speedUP = false;
            break;
          case "ArrowLeft":
            mygame.car.left = false;
            break;
          case "ArrowRight":
            mygame.car.right = false;
            break;
        }
        break;
    }
  }
};


// 16

mygame.process = function() {
  if (mygame.car.speedUP) {
    if (mygame.car.speed < 8) {
      mygame.car.speed += 0.1;
    }
  } else {
    if (mygame.car.speed > 0) {
      mygame.car.speed -= 0.1;
    } else {
      mygame.car.speed += 0.1;
    }
  }
  if (mygame.car.left && mygame.car.wheelangle > - 0.5) {
    mygame.car.wheelangle -= 0.01;
  }
  if (!mygame.car.left && mygame.car.wheelangle < 0) {
    mygame.car.wheelangle += 0.02;
  }
  if (mygame.car.right && mygame.car.wheelangle < 0.5) {
    mygame.car.wheelangle += 0.01;
  }
  if (!mygame.car.right && mygame.car.wheelangle > 0) {
    mygame.car.wheelangle -= 0.02;
  }
  var angle = mygame.car.mesh.rotation.z;
  angle -= mygame.car.wheelangle * mygame.car.speed / 100;
  mygame.car.mesh.rotation.z = angle;

  mygame.car.mesh.position.x += Math.sin(angle) * mygame.car.speed;
  mygame.car.mesh.position.z += Math.cos(angle) * mygame.car.speed;

  var deviation = mygame.car.wheelangle / 3;
  posx = mygame.car.mesh.position.x - (Math.sin(mygame.car.mesh.rotation.z + deviation) * 150);
  posz = mygame.car.mesh.position.z - (Math.cos(mygame.car.mesh.rotation.z + deviation) * 150);
  mygame.camera.position.set(posx, 50, posz);
  mygame.camera.lookAt(mygame.car.mesh.position);
  mygame.light.position.set(posx, 50, posz);
};

// 17

mygame.draw = function() {
  if (!mygame.targets.mesh) {
    var geometry = new THREE.SphereGeometry(20, 10, 10);
    var material = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
    var mesh = new THREE.Mesh(geometry, material);
    var posx = (Math.random() * 1800) - 900;
    var posz = (Math.random() * 1800) - 900;
    mesh.position.set(posx, 30, posz);
    mygame.scene.add(mesh);

    mygame.targets.mesh = mesh;
    mygame.targets.edges[0] = posx - 30;
    mygame.targets.edges[1] = posx + 30;
    mygame.targets.edges[2] = posz - 30;
    mygame.targets.edges[3] = posz + 30;
  } else {
    mygame.targets.mesh.rotation.y += 0.02;
  }
  mygame.renderer.render(mygame.scene, mygame.camera);
};

// 18

mygame.detect = function() {
  var posx = mygame.car.mesh.position.x;
  var posz = mygame.car.mesh.position.z;
  if (posx < -980 || posx > 980 || posz < -980 || posz > 980) {
    mygame.car.speed = -7;
  }
  if (posx > mygame.targets.edges[0] && posx < mygame.targets.edges[1] && posz > mygame.targets.edges[2] && posz < mygame.targets.edges[3]) {
    mygame.scene.remove(mygame.targets.mesh);
    mygame.targets.mesh = "";
  }
};

// 19

mygame.loop = function() {
  mygame.control();
  mygame.process();
  mygame.detect();
  mygame.draw();

  requestAnimationFrame(function() {
    mygame.loop();
  });
};
window.addEventListener("load", function() {
  mygame.initiate();
});
