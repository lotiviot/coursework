var renderer, scene, camera, mesh;
function initiate() {
  canvas = document.getElementById("canvas");
  var width = canvas.width;
  var height = canvas.height;

  renderer = new THREE.WebGLRenderer({canvas: canvas, antialias:true});
  renderer.setClearColor(0xCCFFFF);  // RMB light blue-ish main canvas bkgd

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 150);

  var textcanvas = document.createElement("canvas");
  textcanvas.width = 400;
  textcanvas.height = 200;
  var context = textcanvas.getContext("2d");
  context.fillStyle = "rgba(255,0,0,0.95)";  // RMB red text on text canvas
  context.font = "bold 70px verdana, sans-serif";
  context.fillText("Text in 3D", 0, 60);

  var geometry = new THREE.PlaneGeometry(100, 40);
  var texture = new THREE.Texture(textcanvas);
  texture.needsUpdate = true;
  var material = new THREE.MeshPhongMaterial({map: texture, transparent: true, side: THREE.DoubleSide});
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 100, 250);
  scene.add(light);
  renderer.render(scene, camera);

  canvas.addEventListener("mousemove", move);
}
function move(event){
  mesh.rotation.y = event.pageX * 0.02;
  renderer.render(scene, camera);
}
window.addEventListener("load", initiate);
