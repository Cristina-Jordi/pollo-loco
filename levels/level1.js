let level1;

function initLevel() {
  level1 = new Level(
    createChickens(),
    createSmallChicken(),
    createClouds(),
    createBackgroundLayers(),
    createRotationImg(),
    createCoins(),
    createBottles()
  );
}

function createChickens() {
  return [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
  ];
}

function createSmallChicken() {
  return [
    new smallChicken(),
    new smallChicken(),
    new smallChicken()
  ];
}

function createClouds() {
  return [(new Cloud(), new Cloud())];
}

function createBackgroundLayers() {
  return [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 2),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 3),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 4),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 4),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 4),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 5),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 5),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 5),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 5),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 6),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 6),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 6),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 6),
  ];
}

function createRotationImg() {
  return ["img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"];
}

function createCoins() {
  return [
    new CollectableObject(400),
    new CollectableObject(400 + 50),
    new CollectableObject(400 + 100),
    new CollectableObject(400 * 2),
    new CollectableObject(400 * 2 + 50),
    new CollectableObject(400 * 2 + 100),
    new CollectableObject(400 * 3),
    new CollectableObject(400 * 3 + 50),
    new CollectableObject(400 * 3 + 100),
    new CollectableObject(400 * 4),
    new CollectableObject(400 * 4 + 50),
    new CollectableObject(400 * 4 + 100),
    new CollectableObject(400 * 5),
    new CollectableObject(400 * 5 + 50),
    new CollectableObject(400 * 5 + 100),
  ];
}

function createBottles() {
  return [
    new CollectableBottle(650),
    new CollectableBottle(700),
    new CollectableBottle(1500),
    new CollectableBottle(1550),
    new CollectableBottle(2500),
    new CollectableBottle(2550),
  ];
}