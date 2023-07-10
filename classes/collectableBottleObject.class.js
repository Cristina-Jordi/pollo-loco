class CollectableBottle extends MovableObject {
  images_collectableBottle = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
  ];

  height = 80;
  width = 80;

  constructor(x) {
    super();
    this.loadImage("img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png");
    this.x = x;
    this.y = 185;
  }
}
