import './../../assets/images/grondstoffen-01.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }
  preload() {
    this.load.image(`grondstof`, `./assets/images/grondstoffen-01.png`);
  }
  create() {
    this.scene.start(`game`);
  }
  update() { }
}
