class StatusBarCoins extends DrawableObject {
  images_coinsbar = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.images_coinsbar);
    this.x = 30;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images_coinsbar[this.getImageIndex()];
    this.img = this.imageCache[path];
  }

  getImageIndex() {
    if (this.percentage >= 10) return 5;
    else if (this.percentage > 8) return 4;
    else if (this.percentage > 6) return 3;
    else if (this.percentage > 4) return 2;
    else if (this.percentage > 2) return 1;
    else return 0;
  }
}

