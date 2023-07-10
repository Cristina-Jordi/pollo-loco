class World {
  character = new Character();
  endboss = new Endboss();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  levelSize = 100;
  StatusBarHealth = new StatusBarHealth();
  StatusBarBottle = new StatusBarBottle();
  StatusBarCoins = new StatusBarCoins();
  StatusBarEndboss = new StatusBarEndboss();
  throwableObjects = [];
  doAnimation = true;
  clearIntervals;
  collectedCoinsStorage = [];
  mute = false;

  constructor(canvas, keyboard, clearIntervals, gameOver) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.clearIntervals = clearIntervals;
    this.gameOver = gameOver;

    this.draw();
    this.setWorld();
    this.run();
  }

  run() {
    setStoppableInterval(() => {
      this.checkThrow();
    }, 250);
    setStoppableInterval(() => {
      this.endboss.checkCondition();
    }, 150);
    setStoppableInterval(() => {
      this.checkEndbossKilled();
    }, 600);
    setStoppableInterval(() => {
      this.checkCollisions();
      this.checkCollectingCoins();
      this.checkCollectingBottles();
      this.checkOnTopOfEnemy();
      this.checkBonusHP(); // collect yellow chicken
      this.checkInvulnerable();
      this.checkBackgroundMusic();
      this.stopGame();
    }, 50);
    this.character.checkIdleMode();
  }

  resetLvl() {
    this.resetChickens();
    this.resetEndboss();
    this.resetCoins();
    this.resetBottles();
    this.resetSmallChickens();
  }

  checkBackgroundMusic() {
    if (this.bgMusicWanted()) {
      this.character.audio_background.play();
      this.character.audio_background.volume = 0.25;
    } else this.character.audio_background.pause();
  }

  stopGame() {
    if (this.character.energy == 0) {
      this.character.playAnimation(this.character.images_dying);
      setTimeout(() => {
        this.showEndscreenLost();
      }, 450);
    }
    if (this.endboss.energy == 0) {
      setTimeout(() => {
        this.showEndscreenWon();
      }, 2000);
    }
  }

  checkInvulnerable() {
    if (this.character.collectedCoins === 12) this.character.invulnerable = true;
    if (this.character.invulnerable === true) {
      document.getElementById("invulnerable").classList.remove("d-none");
      this.character.speed = 6;
      setTimeout(() => {
        this.stopInvulnerableMode();
      }, 3000);
    }
  }

  endbossAttacking() {
    if (this.character.x >= 3000) {
      this.endboss.attack();
    }
  }

  checkBonusHP() {
    for (let i = 0; i < this.level.smallChicken.length; i++) {
      const chicken = this.level.smallChicken[i];
      if (this.character.isCollidingChicken(chicken)) {
        let collectedChicken = this.level.smallChicken.indexOf(chicken);
        if (!this.character.mute) this.character.audio_bonusHP.play();
        this.level.smallChicken.splice(collectedChicken, 1);
        if (this.character.energy <= 100) this.character.energy += 20;
        if (this.character.energy > 100) this.character.energy = 100;
        this.StatusBarHealth.setPercentage(this.character.energy);
      }
    }
  }

  checkOnTopOfEnemy() {
    for (let i = 0; i < this.level.enemies.length; i++) {
      const enemy = this.level.enemies[i];
      if (
        this.character.isCollidingChicken(enemy) &&
        this.character.isAboveGround() &&
        !this.character.isHurt()
      ) {
        let hittedChicken = this.level.enemies.indexOf(enemy);
        if (!this.level.enemies[hittedChicken].hitted && !this.character.mute)
          this.level.enemies[hittedChicken].audio_hitted.play();
        this.level.enemies[hittedChicken].hitted = true;
      }
    }
  }

  checkEndbossKilled() {
    this.throwableObjects.forEach((tO) => {
      if (this.endboss.isCollidingCollectables(tO)) {
        let hittedsound = this.character.audio_smashingBottle;
        hittedsound.playbackRate = 3;
        if (!this.character.mute) hittedsound.play();
        this.endboss.hitted();
        this.StatusBarEndboss.setPercentage(this.endboss.energy);
      } else if (this.endboss.isCollidingCollectables(this.character)) {
        this.character.hit();
        let hurtsound = this.character.audio_hurt;
        hurtsound.playbackRate = 3;
        if (!this.character.mute) hurtsound.play();
        this.StatusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkCollectingBottles() {
    this.level.bottles.forEach((bottle) => {
      if (this.character.isCollidingCollectables(bottle)) {
        if (!this.character.mute) this.character.audio_collectBottle.play();
        this.character.collectedBottles++;
        this.StatusBarBottle.setPercentage(this.character.collectedBottles);
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
      }
    });
  }

  checkCollectingCoins() {
    this.level.coins.forEach((coin) => {
      if (this.character.isCollidingCollectables(coin)) {
        if (!this.character.mute) this.character.audio_collectCoin.play();
        this.character.collectedCoins++;
        this.collectedCoinsStorage.push(coin);
        this.StatusBarCoins.setPercentage(this.character.collectedCoins);
        this.level.coins.splice(coin, 1);
      }
    });
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.characterCanCollide(enemy)) {
        this.character.hit();
        let hurtsound = this.character.audio_hurt;
        hurtsound.playbackRate = 3;
        if (!this.character.mute) hurtsound.play();
        this.StatusBarHealth.setPercentage(this.character.energy);
      }
    });
  }

  checkThrow() {
    if (this.keyboard.d && this.character.collectedBottles > 0) {
      let bottle = new ThrowableObject(
        this.character.x + 100,
        this.character.y + 100
      );
      this.throwableObjects.push(bottle);
      this.character.collectedBottles--;
      this.StatusBarBottle.setPercentage(this.character.collectedBottles);
    }
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    if (this.character.doAnimation) {
      this.addToMap(this.character);
      this.addToMap(this.endboss);
      this.ctx.translate(-this.camera_x, 0);
      this.addStatusbars();
      this.ctx.translate(this.camera_x, 0);
      this.addAllObjects();
      this.ctx.translate(-this.camera_x, 0);
      let self = this;
      requestAnimationFrame(function () {
        self.draw();
      });
    }
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  resetChickens() {
    this.level.enemies.forEach((enemie) => {
      enemie.hitted = false;
      enemie.speed = 0.15 + Math.random() * 0.25;
    });
  }

  resetEndboss() {
    this.endboss.energy = 3;
  }

  resetCoins() {
    this.level.coins = createCoins();
  }

  resetBottles() {
    this.level.bottles = createBottles()
  }

  resetSmallChickens() {
    this.level.smallChicken = createSmallChicken()
  }

  bgMusicWanted() {
    return !gameOver && !this.character.mute
  }

  showEndscreenWon() {
    document.getElementById("endScreenContainerWon").style.display = "block";
    this.clearIntervals();
    this.resetLvl();
    this.character.audio_background.pause();
  }

  showEndscreenLost() {
    document.getElementById("endScreenContainerLost").style.display = "block";
    this.clearIntervals();
    this.resetLvl();
    this.character.audio_background.pause();
    this.character.audio_lost.play();
  }

  stopInvulnerableMode() {
    this.character.invulnerable = false;
    this.character.collectedCoins = 0;
    this.character.speed = 4;
    document.getElementById("invulnerable").classList.add("d-none");
    this.StatusBarCoins.setPercentage(this.character.collectedCoins);
  }

  characterCanBeHurt() {
    return (
      !this.character.isAboveGround() &&
      !this.character.isHurt() &&
      !this.character.invulnerable
    );
  }

  addAllObjects() {
    this.addObjectsToMap(this.level.clouds);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.smallChicken);
    this.addObjectsToMap(this.throwableObjects);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
  }

  addStatusbars() {
    this.addToMap(this.StatusBarHealth);
    this.addToMap(this.StatusBarBottle);
    this.addToMap(this.StatusBarCoins);
    if (this.character.x > 2950) {
      this.addToMap(this.StatusBarEndboss);
    }
  }

  characterCanCollide(enemy) {
    return (
      this.character.isCollidingChicken(enemy) &&
      !enemy.hitted &&
      this.characterCanBeHurt()
    );
  }
}