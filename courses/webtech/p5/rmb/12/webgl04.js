function initiate() {
  var canvas = document.getElementById("canvas");
  var width = canvas.width;
  var height = canvas.height;

  var renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
  renderer.setClearColor(0xFFFFFF);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 150);

  var geometry = new THREE.BoxGeometry(50, 50, 50);
  var material = new THREE.MeshPhongMaterial({color: 0x0000FF});
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  mesh.rotation.set(10, 10, 0);

  var light = new THREE.SpotLight(0xFFFFFF);
  light.position.set(50, 50, 150);
  scene.add(light);

  renderer.render(scene, camera);
}
window.addEventListener("load", initiate);
