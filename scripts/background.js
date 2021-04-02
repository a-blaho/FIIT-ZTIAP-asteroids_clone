class Background {
  constructor() {
      this.backgroundTexture = document.getElementById("background");
  }
  drawBackground(ctx) {
    ctx.drawImage(this.backgroundTexture, 0, 0);
  }
}
