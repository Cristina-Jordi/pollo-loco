class StatusBarEndboss extends DrawableObject {
  images_healthbar = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png",
  ];

  percentage = 3;

  constructor() {
    super();
    this.loadImages(this.images_healthbar);
    this.x = 500;
    this.y = 50;
    this.width = 200;
    this.height = 60;
    this.setPercentage(3);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images_healthbar[this.getImageIndex()];
    this.img = this.imageCache[path];
  }

  getImageIndex() {
    if (this.percentage == 3) return 3;
    else if (this.percentage == 2) return 2;
    else if (this.percentage == 1) return 1;
    else return 0;
  }
}