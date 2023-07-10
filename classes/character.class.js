class Character extends MovableObject {
  y = 20;
  height = 250;
  width = 155;
  speed = 4;
  collectedCoins = 0;
  collectedBottles = 0;
  offset = {
    top: 120,
    left: 20,
    right: 20,
    bottom: 30,
  };
  boostHP = false;
  doAnimation = true;
  lastInteraction = 0;
  idle = false;
  longIdle = false;
  invulnerable = false;
  mute = false;

  images_walking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  images_jumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];
  images_idle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];
  images_longIdle = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];
  images_dying = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];
  images_hurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  image_dead = ["img/2_character_pepe/5_dead/D-57.png"];
  audio_collectCoin = new Audio("audio/coinCollect1.mp3");
  audio_jump = new Audio("audio/cartoon-jump-01.mp3");
  audio_collectBottle = new Audio("audio/collectBottle.mp3");
  audio_smashingBottle = new Audio("audio/bottleSmash.mp3");
  audio_bonusHP = new Audio("audio/chickenHitted.mp3");
  audio_hurt = new Audio("audio/hurt.mp3");
  audio_lost = new Audio("audio/lost.mp3");
  audio_win = new Audio("audio/win.mp3");
  audio_background = new Audio("audio/background-music.mp3");
  world;

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.images_walking);
    this.loadImages(this.images_jumping);
    this.loadImages(this.images_dying);
    this.loadImages(this.images_hurt);
    this.loadImages(this.images_idle);
    this.loadImages(this.images_longIdle);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setStoppableInterval(() => this.moveCharacter(), 1000 / 60);

    setStoppableInterval(() => this.playCharacterAnimations(), 60);
  }

  checkIdleMode() {
    setStoppableInterval(() => {
      if (this.inactive()) {
        let timepassed = new Date().getTime() - this.lastInteraction;
        timepassed = timepassed / 1000;
        if (timepassed > 3) {
          this.idle = true;
        }
        if (timepassed > 6) {
          this.idle = false;
          this.longIdle = true;
        }
      }
    }, 1000);
  }

  moveCharacter() {
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) {
      if (!this.mute) this.audio_jump.play();
      this.jump();
    }
    this.moveCamera();
  }

  playCharacterAnimations() {
    if (this.idle) this.playAnimation(this.images_idle);
    if (this.longIdle) this.playAnimation(this.images_longIdle);
    if (this.isDead()) this.playAnimation(this.images_dying);
    else if (this.isHurt()) this.playAnimation(this.images_hurt);
    else if (this.isAboveGround()) this.playAnimation(this.images_jumping);
    else if (this.characterIsWalkingOnGround())
      this.playAnimation(this.images_walking);
  }

  canMoveRight() {
    return this.world.keyboard.right && this.x < this.world.level.level_end_x;
  }

  moveRight() {
    super.moveRight();
    this.deactivateIdleMode();
    this.otherDirection = false;
    this.lastInteraction = new Date().getTime();
  }

  canMoveLeft() {
    return this.world.keyboard.left && this.x > 0;
  }

  moveLeft() {
    super.moveLeft();
    this.deactivateIdleMode();
    this.otherDirection = true;
    this.lastInteraction = new Date().getTime();
  }

  canJump() {
    return this.world.keyboard.space && !this.isAboveGround();
  }

  jump() {
    super.jump();
    this.deactivateIdleMode();
    this.lastInteraction = new Date().getTime();
  }

  deactivateIdleMode() {
    this.idle = false;
    this.longIdle = false;
  }

  moveCamera() {
    return (this.world.camera_x = -this.x + 100);
  }

  inactive() {
    return (
      !this.world.keyboard.right ||
      !this.world.keyboard.left ||
      !this.world.keyboard.space
    );
  }

  characterIsWalkingOnGround() {
    return (
      this.world.keyboard.right ||
      (this.world.keyboard.left && !this.isAboveGround())
    );
  }
}
