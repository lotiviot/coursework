var mygame = {
  canvas: {
    ctx: "",
    offsetx: 0,
    offsety: 0
  },
  ship: {
    x: 300,
    y: 200,
    movex: 0,
    movey: 0,
    speed: 1
  },
  initiate: function() {
    var element = document.getElementById("canvas");
    mygame.canvas.ctx = element.getContext("2d");
    mygame.canvas.offsetx = element.offsetLeft;
    mygame.canvas.offsety = element.offsetTop;
    document.addEventListener("click", function(event) {
      mygame.control(event);
    });
    mygame.loop();
  },
  loop: function() {
    if (mygame.ship.speed) {
      mygame.process();
      mygame.detect();
      mygame.draw();
      requestAnimationFrame(function() {
        mygame.loop();
      });
    } else {
      mygame.canvas.ctx.font = "bold 36px verdana, sans-serif";
      mygame.canvas.ctx.fillText("GAME OVER", 182, 210);
    }
  },
  control: function(event) {
    var distancex = event.clientX - (mygame.canvas.offsetx + mygame.ship.x);
    var distancey = event.clientY - (mygame.canvas.offsety + mygame.ship.y);
    var ang = Math.atan2(distancex, distancey);
    mygame.ship.movex = Math.sin(ang);
    mygame.ship.movey = Math.cos(ang);
    mygame.ship.speed += 1;
  },
  draw: function() {
    mygame.canvas.ctx.clearRect(0, 0, 600, 400);
    mygame.canvas.ctx.beginPath();
    mygame.canvas.ctx.arc(mygame.ship.x, mygame.ship.y, 20, 0, Math.PI / 180 * 360, false);
    mygame.canvas.ctx.fill();
  },
  process: function() {
    mygame.ship.x += mygame.ship.movex * mygame.ship.speed;
    mygame.ship.y += mygame.ship.movey * mygame.ship.speed;
  },
  detect: function() {
    if (mygame.ship.x < 0 || mygame.ship.x > 600 || mygame.ship.y < 0 || mygame.ship.y > 400) {
      mygame.ship.speed = 0;
    }
  }
};
window.addEventListener("load", function() {
  mygame.initiate();
});