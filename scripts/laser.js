class Laser {
  constructor(player) {
    this.texture = document.getElementById("laser")
    this.angle = player.angle;
    this.x = player.x;
    this.y = player.y;
    this.width = this.texture.width;
    this.height = this.texture.height;
  }

  drawLaser(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.texture, this.width / -2, this.width / -2);
    ctx.restore();
  }

  moveLaser() {
      this.x += 1200 * Math.sin(this.angle) / 60;
      this.y -= 1200 * Math.cos(this.angle) / 60;
  }
}
function laserPassed(laser, canvas) {
  if(laser.x > canvas.width || laser.x + laser.width < 0
  || laser.y > canvas.height || laser.y + laser.height < 0) {
    return true;
  }
  else {
    return false;
  }
}
