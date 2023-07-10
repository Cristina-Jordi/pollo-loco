class smallChicken extends MovableObject {
  height = 50;
  width = 50;
  y = 375;
  x = 400 + Math.random() * 3000;

  images_walking = [
    "./img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "./img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("./img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.images_walking);
    this.animate();
    this.speed = 1 + Math.random() * 1.5;
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.images_walking);
      this.moveLeft();
    }, 1000 / 60);
  }
}