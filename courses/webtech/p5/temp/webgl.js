function initiate() {
    
    
  var button = document.getElementById("Run") 
  //console.log(button)
  button.addEventListener('click', LoadCanvas);
}
window.addEventListener("load", initiate);

function LoadCanvas() {
  
  //console.log(document.getElementById("canvas"))
  var thing = document.getElementsByName("radio")
  var c = document.getElementById("canvas");
  var length = document.getElementById("length").value
  var count = document.getElementById("count").value
  // document.getElementById("canvas").width = length+"px";
  // document.getElementById("canvas").height = length+"px";
  //console.log(document.getElementById("canvas"))
  
  if(thing[0].checked == true){
    var c = document.getElementById("canvas");
    var rex = c.getContext("2d")
    rex.fillStyle = "red";
    rex.fillRect(0, 0, length, length);

    var ctx = c.getContext("2d");
    ctx.fillStyle = "green"
    ctx.beginPath();
    ctx.arc(length/2, length/2, length/2, 0, 2 * Math.PI);
    ctx.fill();

    var dot = c.getContext("2d");
    for(var i = 0 ; i < count ; i++){
      //console.log(length)
      x = Math.floor(Math.random()* parseInt(length))
      y = Math.floor(Math.random()* parseInt(length))
      //console.log()
      if(Math.sqrt(Math.pow(x-(length/2), 2) + Math.pow(y-(length/2),2)) < length/2)
      {
        dot.fillStyle = "blue"
        dot.beginPath();
        dot.arc(x, y, 3, 0, 2 * Math.PI);
        dot.fill();
      }
      else{
        dot.fillStyle = "yellow"
        dot.beginPath();
        dot.arc(x, y, 3, 0, 2 * Math.PI);
        dot.fill();
      } 
    }
    //for loop stuff now
  }
  else{
    var canvas = document.getElementById("canvas");
    var width = canvas.width;
    var height = canvas.height;

    length = parseInt(length)
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0xFFFFFF);
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, width / height, 1, 2500);
    camera.position.set(0, 0, length*1.3);
    var geometry = new THREE.BoxGeometry(length, length, length);
    var edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges , new THREE.LineBasicMaterial({color: 0x000000} ))
    //mesh = new THREE.Mesh(geometry, material);
    scene.add(line);

    var geometry2 = new THREE.SphereGeometry(length/2, 15, 15);
    var material2 = new THREE.MeshBasicMaterial({color: 0x0000FF, wireframe: true});
    mesh2 = new THREE.Mesh(geometry2, material2);
    scene.add(mesh2);

    for(var i = 0 ; i < count ; i++)
    {
      x = Math.floor(Math.random()* parseInt(length))
      y = Math.floor(Math.random()* parseInt(length))
      z = Math.floor(Math.random()* parseInt(length))
      
      dist = Math.sqrt(Math.pow(x-(length/2), 2) + Math.pow(y-(length/2),2) + Math.pow(z-(length/2),2))
      if(dist < length/2){
        geometry = new THREE.SphereGeometry( 8, 32, 32 );
        material = new THREE.MeshBasicMaterial( {color: "green"} );
        sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(x-(length/2),y-(length/2),z-(length/2))
        scene.add(sphere)
      }
      else{
        geometry = new THREE.SphereGeometry( 8, 32, 32 );
        material = new THREE.MeshBasicMaterial( {color: "red"} );
        sphere = new THREE.Mesh( geometry, material );
        sphere.position.set(x-(length/2),y-(length/2),z-(length/2))
        scene.add(sphere)
      }
    }


    renderer.render(scene, camera);
    canvas.addEventListener("mousemove", move);
  }
  
}

function move(event) {
scene.rotation.x = event.pageY * 0.01;
scene.rotation.z = -event.pageX * 0.01;
// mesh.position.z = -400;
renderer.render(scene, camera);
}