class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5; // Beschleunigung
  energy = 100;
  lastHit = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  playAnimation(images) {
    let i = this.currentImg % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImg++;
  }

  gameOver() {
    let endScreen = document.getElementById("endScreenContainer");
    endScreen.style.display = "block";
  }

  isOnTop(mo) {
    return (
      this.getUpPos() &&
      this.getRightPos() >= mo.getUpPos() &&
      mo.getRightPos()
    );
  }

  isCollidingCollectables(mo) {
    return (
      this.getRightPos() - this.offset.right > mo.x + mo.offset.left &&
      this.getUpPos() - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.getRightPos() - mo.offset.right &&
      this.y + this.y + this.offset.top < mo.getUpPos() - mo.offset.bottom
    );
  }

  isCollidingChicken(mo) {
    return (
      this.getRightPos() - this.offset.left > mo.x &&
      this.getUpPos() > mo.y &&
      this.x < mo.x - this.offset.left + mo.width &&
      this.y < mo.getUpPos()
    );
  }

  getRightPos(){
    return this.x + this.width
  }

  getUpPos(){
    return this.y + this.height
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
    timepassed = timepassed / 1000; // Differenz in sekunden
    return timepassed < 1;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  moveRight() {
    this.x += this.speed;
  }

  applyGravity() {
    setStoppableInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    else return this.y < 180;
  }

  jump() {
    this.speedY = 30;
  }
}