class Asteroid {
  constructor(x, y, source, lives, canvas) {
    this.texture = source;
    this.width = this.texture.width;
    this.height = this.texture.height;
    this.x = x;
    this.y = y;
    this.angle = Math.floor(Math.random() * 360) * Math.PI / 180;
    this.forwx = 400 * Math.sin(this.angle);
    this.forwy = 400 * Math.cos(this.angle);
    this.lives = lives;
  };

  drawAsteroids(ctx) {
    ctx.drawImage(this.texture, this.x - this.width / 2 , this.y - this.height / 2);
  }

  moveAsteroid(canvas) {
    //move asteroid
    this.x += this.forwx /(60 * this.lives);
    this.y += this.forwy / (60 * this.lives);
    //check edges
    if (this.x > canvas.width + this.width / 2)
      this.x  = 0 - this.width / 2;
    if (this.x < 0 - this.width / 2)
      this.x = canvas.width + this.width / 2;

    if (this.y > canvas.height + this.width / 2)
      this.y  = 0 - this.width / 2;
    if (this.y < 0 - this.width / 2)
      this.y = canvas.height + this.width / 2;
  }
}
function splitAsteroid(asteroid, asteroids) {
  if(asteroid.lives == 3) {
    for(var k = 0; k < 2; k++) {
      asteroids.push(new Asteroid(asteroid.x, asteroid.y, document.getElementById("asteroidMed"), 2));
    }
  }
  //if its a medium meteor
  else if(asteroid.lives == 2) {
    for(var k = 0; k < 2; k++) {
      asteroids.push(new Asteroid(asteroid.x, asteroid.y, document.getElementById("asteroidSmall"), 1));
    }
  }
}
