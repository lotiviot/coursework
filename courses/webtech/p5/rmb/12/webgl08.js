var canvas, video, renderer, scene, camera, mesh;
function initiate() {
  canvas = document.getElementById("canvas");
  video = document.createElement("video");
  video.src = "trailer.ogg";
  video.addEventListener("canplaythrough", createworld);
}
function createworld() {
  var width = canvas.width;
  var height = canvas.height;

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setClearColor(0xFFFFFF);
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 250);

  texture = new THREE.Texture(video);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;

  var material = new THREE.MeshPhongMaterial({map: texture, side: THREE.DoubleSide});
  var geometry = new THREE.PlaneGeometry(240, 135);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 100, 250);
  scene.add(light);

  canvas.addEventListener("mousemove", move);
  video.play();
  render();
}
function move(event) {
  mesh.rotation.y = event.pageX * 0.02;
}
function render() {
  texture.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
window.addEventListener("load", initiate);
