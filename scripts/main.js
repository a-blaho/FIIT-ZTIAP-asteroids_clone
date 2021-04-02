var keys = {};
var timer;
var pew = new Audio("sounds/shoot.ogg");
var music = new Audio("sounds/background.ogg");
var explode = new Audio("sounds/explosion.ogg");
var soundCheck = true;
var level = 0;
var score = 0;
var pressed = false;

function  checkCollision(ctx, object1, object2) {
  var x, y;
  x = Math.abs(object1.x - object2.x);
  y = Math.abs(object1.y - object2.y);
  if(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) < object2.width / 2 + object1.width / 2) {
    return true;
  }
}

function nextLevel(canvas, level, asteroids, satelite) {
  for(var i = 0; i < level  ; i++) {
    asteroids.push(new Asteroid(Math.floor(Math.random() * canvas.width),
    Math.floor(Math.random() * canvas.height), document.getElementById("asteroidBig"), 3, canvas));
    if(level % 3 == 0) {
      satelite.active = true;
    }
    else {
      satelite.active = false;
    }
  }
}

function game() {
  //define all objects
  score = 0;
  level = 0;
  var canvas = document.getElementById("gameArea");
  var ctx = canvas.getContext("2d");
  var background = new Background();
  var player = new Player(canvas);
  var asteroids = [];
  var lasers = [];
  var satelite = new Satelite(canvas);
  //start interval
  timer = setInterval(gameUpdate, 1000 / 60, canvas, ctx, player, background, asteroids, lasers, satelite);
};

function gameUpdate(canvas, ctx, player, background, asteroids, lasers, satelite) {
  //check if all asteroids are destroyed
  if(asteroids.length == 0) {
    level++;
    player.invincibility = 2;
    nextLevel(canvas, level, asteroids, satelite);
  }
  if(soundCheck) {
    music.play();
  }
  else {
    music.pause();
  }
  //check players lives
  if(player.lives == 0)
  {
    gameOver(ctx);
    clearInterval(timer);
    music.pause();
    music.currentTime = 0;
  }

  //check players invincibility
  if(player.invincibility > 0) {
    player.invincibility -= 1 / 60;
  }
  else {
    player.invincibility = 0;
  };

  //draw background
  background.drawBackground(ctx);
  //draw lasers
  if(lasers.length > 0) {
    for(var i = 0; i < lasers.length; i++) {
      lasers[i].drawLaser(ctx);
    }
  }
  //draw asteroids
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i].drawAsteroids(ctx);
  }
  //draw ship
  player.drawShip(ctx);
  //draw satelite
  satelite.drawSatelite(ctx);
  ctx.fillStyle = "white";
  ctx.font = "30px Tahoma";
  //draw score based on its value, so its fully visible
  if(score < 100) {
      ctx.fillText(`Score: ${score}`, canvas.width - 140, 30);
  }
  else if(score < 1000) {
    ctx.fillText(`Score: ${score}`, canvas.width - 150, 30);
  }
  else {
    ctx.fillText(`Score: ${score}`, canvas.width - 160, 30);
  }
  //draw lives
  for(var i = 1; i <= player.lives; i++) {
    ctx.drawImage(document.getElementById("heart"), 1400 + 40 * (player.lives - i - 1), 50);
  }

  //move ship
  player.moveShip(canvas, lasers);
  ///move lasers
  for(var i = 0; i < lasers.length; i++) {
    lasers[i].moveLaser();
  }
  //move asteroids
  for(var i = 0; i < asteroids.length; i++) {
    asteroids[i].moveAsteroid(canvas);
  }
  //move satelite
  satelite.moveSatelite(canvas);

  //collisions ship / asteroids
  for(var i = 0; i < asteroids.length; i++) {
    if(checkCollision(ctx, asteroids[i], player) && player.invincibility == 0) {
      splitAsteroid(asteroids[i], asteroids);
      asteroids.splice(i, 1);
      if(soundCheck) {
        explode.play();
      }
      if(player.lives > 1)
        player.resetShip(canvas);
      else {
        player.lives = 0;
      }
    }
  }
  //collision ship / satelite
  if(satelite.active == true && checkCollision(ctx, player, satelite)) {
    satelite.active = false;
    player.resetShip(canvas);
    if(soundCheck) {
      explode.play();
    }
    player.lives++;
  }
  //colision lasers / asteroids
  for(var i = 0; i < lasers.length; i++) {
    for(var j = 0; j < asteroids.length; j++) {
      if(lasers.length > 0 && checkCollision(ctx, asteroids[j], lasers[i])) {
        splitAsteroid(asteroids[j], asteroids);
        if(asteroids[j].lives == 3)
          score += 5;
        else if(asteroids[j].lives == 2)
          score += 10;
        else
          score += 15;
        asteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }
  //collision lasers / satelite
  if(satelite.active == true) {
    for(var i = 0; i < lasers.length; i++) {
        if(lasers.length > 0 && checkCollision(ctx, satelite, lasers[i])) {
          if(player.lives < 3) {
            player.lives++;
          }
        else {
          player.invincibility = 2;
        }
        lasers.splice(i, 1);
        satelite.active = false;
        break;
      }
    }
  }
  //collision lasers / edge of the canvas
  for(var i = 0; i < lasers.length; i++) {
    if(lasers.length > 0 && laserPassed(lasers[i], canvas)) {
     lasers.splice(i, 1);
     break;
    }
  }
};

window.onkeydown = function(event) {
  keys[event.keyCode] = true;
};
window.onkeyup = function(event) {
  keys[event.keyCode] = false;
};
