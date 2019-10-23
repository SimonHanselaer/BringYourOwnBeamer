import './../../assets/images/grondstoffen-01.png';
import './../../assets/images/player.png';

import './../../assets/images/containerTestBlue.png';
import './../../assets/images/containerTestGreen.png';
import './../../assets/images/containerTestRed.png';
import './../../assets/images/containerTestYellow.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }
  preload() {
    this.load.image(`grondstof`, `./assets/images/grondstoffen-01.png`);
    this.load.image(`player`, `./assets/images/player.png`);

    this.load.image(`containerBlue`, `./assets/images/containerTestBlue.png`);
    this.load.image(`containerGreen`, `./assets/images/containerTestGreen.png`);
    this.load.image(`containerRed`, `./assets/images/containerTestRed.png`);
    this.load.image(
      `containerYellow`,
      `./assets/images/containerTestYellow.png`
    );
  }
  create() {
    this.scene.start(`game`);
  }
  update() {}
}
