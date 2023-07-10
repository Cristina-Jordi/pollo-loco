class Chicken extends MovableObject {
  height = 70;
  width = 70;
  y = 355;
  x = 400 + Math.random() * 3000; // Random number between 0 and 1

  images_walking = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  image_dead = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];
  offset = {
    top: 10,
    left: 0,
    right: 0,
    bottom: 10,
  };

  hitted = false;
  audio_hitted = new Audio("audio/chickenHitted.mp3");

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.image_dead);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.25;
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);

    setInterval(() => {
      if (!this.hitted) this.playAnimation(this.images_walking);
      else {
        this.playAnimation(this.image_dead);
        this.speed = 0;
      }
    }, 100);
  }
}
