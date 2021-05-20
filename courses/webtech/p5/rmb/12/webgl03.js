var renderer, scene, camera, mesh;
function initiate() {
  var canvas = document.getElementById("canvas");
  var width = canvas.width;
  var height = canvas.height;
  renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setClearColor(0xFFFFFF);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 150);
  var geometry = new THREE.SphereGeometry(80, 15, 15);  var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  renderer.render(scene, camera);

  canvas.addEventListener("mousemove", move);
}
function move(event) {
  mesh.rotation.x = event.pageY * 0.01;
  mesh.rotation.z = -event.pageX * 0.01;
  // mesh.position.z = -400;
  renderer.render(scene, camera);
}
window.addEventListener("load", initiate);
