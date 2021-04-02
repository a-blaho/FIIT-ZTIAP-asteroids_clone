class Satelite {
  constructor(canvas) {
    this.texture = document.getElementById("satelite");
    this.realwidth = this.texture.width;
    this.realheight = this.texture.height;
    this.width = 40;
    this.height = 40;
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = Math.floor(Math.random() * canvas.height);
    this.angle = 0 *  Math.PI / 180;
    this.forwx = 100 * Math.sin(Math.floor(Math.random() * (360 - 0 + 1) ) + 0);
    this.forwy = 100 * Math.cos(Math.floor(Math.random() * (360 - 0 + 1) ) + 0);
    this.active = false;
  }


  drawSatelite(ctx) {
    if(this.active) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.drawImage(this.texture, this.realwidth / -2, this.realheight / -2);
      ctx.restore();
    }
  }

  moveSatelite(canvas) {
    this.angle += 0.5 * Math.PI / 180;
    this.x += this.forwx / 60;
    this.y += this.forwy / 60;
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
