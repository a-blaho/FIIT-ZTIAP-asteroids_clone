class Player {
  constructor(canvas) {
    this.texture = document.getElementById("ship");
    this.shield = document.getElementById("shield");
    this.x = (canvas.width / 2);
    this.y = (canvas.height / 2);
    this.width = this.texture.width;
    this.height = this.texture.height;
    this.angle = 0 * Math.PI / 180;
    this.forwx = 0;
    this.forwy = 0;
    this.invincibility = 2;
    this.lives = 3;
  };

  moveShip(canvas, lasers) {
    if(keys[68])
      this.angle += 7 * Math.PI / 180 ;
    if(keys[65])
      this.angle -= 7 * Math.PI / 180 ;
    if(keys[87]) {
        this.forwx += 5 * Math.sin(this.angle) / 60;
        this.forwy -= 5 * Math.cos(this.angle) / 60;
    }
    if(keys[32]) {
        if(pressed == false) {
          lasers.push(new Laser(this));
          if(soundCheck) {
            pew.play();
          }
          pressed = true;
      }
    }
    else {
      pressed = false;
    }

    this.x += this.forwx;
    this.y += this.forwy;

    if (this.x > canvas.width + this.width / 2)
      this.x  = 0 - this.width / 2;
    if (this.x < 0 - this.width / 2)
      this.x = canvas.width + this.width / 2;

    if (this.y > canvas.height + this.width / 2)
      this.y  = 0 - this.width / 2;
    if (this.y < 0 - this.width / 2)
      this.y = canvas.height + this.width / 2;
  }

  drawShip(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if(this.invincibility > 0)
      ctx.drawImage(this.shield, 120 / -2, 120 / -2);
    ctx.drawImage(this.texture, this.width / -2, this.height / -2);
    ctx.restore();
  }
  resetShip(canvas) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.angle = 0 * Math.PI / 180;
    this.forwx = 0;
    this.forwy = 0;
    this.invincibility = 2;
    this.lives--;
  }
}
