var renderer, scene, camera, mesh;
function initiate() {
  canvas = document.getElementById("canvas");
  var width = canvas.width;
  var height = canvas.height;

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
  renderer.setClearColor(0xFFFFFF);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 150);

  var materials = [
    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("dice3.jpg")}),
    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("dice4.jpg")}),
    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("dice5.jpg")}),
    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("dice2.jpg")}),
    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("dice1.jpg")}),
    new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture("dice6.jpg")})
  ];
  var geometry = new THREE.BoxGeometry(50, 50, 50, 1, 1, 1);
  mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
  scene.add(mesh);

  var light = new THREE.SpotLight(0xFFFFFF, 2);
  light.position.set(0, 100, 250);
  scene.add(light);
  renderer.render(scene, camera);

  canvas.addEventListener("mousemove", move);
}
function move(event){
  mesh.rotation.x = event.pageY * 0.01;
  mesh.rotation.z = -event.pageX * 0.01;
  renderer.render(scene, camera);
}
window.addEventListener("load", initiate);
