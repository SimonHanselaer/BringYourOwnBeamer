import './../../assets/images/grondstoffen-01.png';
import './../../assets/images/player.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }
  preload() {
    this.load.image(`grondstof`, `./assets/images/grondstoffen-01.png`);
    this.load.image(`player`, `./assets/images/player.png`);
  }
  create() {
    this.scene.start(`game`);
  }
  update() {}
}
