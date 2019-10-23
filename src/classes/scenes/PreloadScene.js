import './../../assets/images/grondstoffen-01.png';
import './../../assets/images/grondstoffen-02.png';
import './../../assets/images/grondstoffen-03.png';
import './../../assets/images/grondstoffen-04.png';
import './../../assets/images/player.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }
  preload() {
    this.load.image(`grondstof1`, `./assets/images/grondstoffen-01.png`);
    this.load.image(`grondstof2`, `./assets/images/grondstoffen-02.png`);
    this.load.image(`grondstof3`, `./assets/images/grondstoffen-03.png`);
    this.load.image(`grondstof4`, `./assets/images/grondstoffen-04.png`);
    this.load.image(`player`, `./assets/images/player.png`);
  }
  create() {
    this.scene.start(`game`);
  }
  update() { }
}
