class StatusBarBottle extends DrawableObject {
  images_bottlebar = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
  ];

  percentage = 100;

  constructor() {
    super();
    this.loadImages(this.images_bottlebar);
    this.x = 30;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.images_bottlebar[this.getImageIndex()];
    this.img = this.imageCache[path];
  }

  getImageIndex() {
    if (this.percentage >= 5) return 5;
    else if (this.percentage == 4) return 4;
    else if (this.percentage == 3) return 3;
    else if (this.percentage == 2) return 2;
    else if (this.percentage == 1) return 1;
    else return 0;
  }
}