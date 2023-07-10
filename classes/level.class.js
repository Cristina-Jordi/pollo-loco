class Level {
  enemies;
  smallChicken;
  clouds;
  backgroundObjects;
  throwableObjects;
  coins;
  bottles;
  level_end_x = 719 * 5.5;

  constructor(
    enemies,
    smallChicken,
    clouds,
    backgroundObjects,
    throwableObjects,
    coins,
    bottles
  ) {
    this.enemies = enemies;
    this.smallChicken = smallChicken;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.throwableObjects = throwableObjects;
    this.coins = coins;
    this.bottles = bottles;
  }
}