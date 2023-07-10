class ThrowableObject extends MovableObject {
  images_bottleRotation = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  images_bottleSplash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.images_bottleRotation);
    this.loadImages(this.images_bottleSplash);
    this.x = x;
    this.y = y;
    this.height = 50;
    this.width = 60;
    this.animate();
    this.throw();
  }

  animate() {
    setStoppableInterval(() => {
      if (this.y > 300) this.playAnimation(this.images_bottleSplash);
      else this.playAnimation(this.images_bottleRotation);
    }, 100);
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();
    setStoppableInterval(() => {
      this.x += 10;
    }, 25);
  }
}