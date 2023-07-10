class DrawableObject {
  x = 120;
  y = 0;
  height = 280;
  width = 100;
  img;
  imageCache = {};
  currentImg = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (
      this.canDrawFrame()
    ) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  canDrawFrame() {
    return this instanceof Character ||
      this instanceof Chicken ||
      this instanceof CollectableObject ||
      this instanceof Endboss
  }
}
