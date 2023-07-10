class Cloud extends MovableObject {
  y = 5;
  x = Math.random() * 720; // Random number between 0 and 1
  height = 220;
  width = 500;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
