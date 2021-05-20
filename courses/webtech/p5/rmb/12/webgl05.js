var canvas, image, renderer, scene, camera, mesh;
function initiate() {
  canvas = document.getElementById("canvas");
  image = document.createElement("img");
  image.src = "crate.jpg";
  image.addEventListener("load", createworld);
}
function createworld() {
  var width = canvas.width;
  var height = canvas.height;

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
  renderer.setClearColor(0xFFFFFF);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 150);

  var geometry = new THREE.BoxGeometry(50, 50, 50);
  var texture = new THREE.Texture(image);
  texture.needsUpdate = true;
  var material = new THREE.MeshPhongMaterial({map: texture});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  var light = new THREE.SpotLight(0xFFFFFF, 1);
  light.position.set(0, 100, 250);
  scene.add(light);
  renderer.render(scene, camera);

  canvas.addEventListener("mousemove", move);
}
function move(event){
  mesh.rotation.z = -event.pageX * 0.01;
  mesh.rotation.x = event.pageY * 0.01;
  renderer.render(scene, camera);
}
window.addEventListener("load", initiate);
