import './../../assets/boat.png';
import './../../assets/Water.png';
import './../../assets/Islands-01.png';
import './../../assets/Islands-03.png';
import './../../assets/Islands-04.png';
import './../../assets/Islands-05.png';
import './../../assets/Islands-06.png';
import './../../assets/coin.png';
import './../../assets/enemy.png';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: `preload`
    });
  }
  preload() {
    this.load.image(`boat`, `./assets/boat.png`);
    this.load.image(`water`, `./assets/Water.png`);
    this.load.image(`island1`, `./assets/Islands-01.png`);
    this.load.image(`island2`, `./assets/Islands-03.png`);
    this.load.image(`island3`, `./assets/Islands-04.png`);
    this.load.image(`island4`, `./assets/Islands-05.png`);
    this.load.image(`island5`, `./assets/Islands-06.png`);
    this.load.image(`coin`, `./assets/coin.png`);
    this.load.image(`enemy`, `./assets/enemy.png`);
  }
  create() {
    this.scene.start(`game`);
  }
  update() {}
}
