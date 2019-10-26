import './../../assets/images/grondstoffen-01.png';
import './../../assets/images/grondstoffen-02.png';
import './../../assets/images/grondstoffen-03.png';
import './../../assets/images/grondstoffen-04.png';
import './../../assets/images/player.png';
import './../../assets/images/red.png';
import './../../assets/images/particleRed.png';
import './../../assets/images/particleYellow.png';
import './../../assets/images/particleGreen.png';
import './../../assets/images/particleBlue.png';

import './../../assets/images/containerBlue.png';
import './../../assets/images/containerGreen.png';
import './../../assets/images/containerRed.png';
import './../../assets/images/containerYellow.png';

import './../../assets/images/background.png';
import './../../assets/images/trainFull.png';
import './../../assets/images/trainEmpty.png';

import './../../assets/sounds/leavingTrain.mp3';
import './../../assets/sounds/match.mp3';
import './../../assets/sounds/close.mp3';
import './../../assets/sounds/full.mp3';
import './../../assets/sounds/arrive.mp3';
import './../../assets/sounds/ambient.mp3';

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
    this.load.image(`particle`, `./assets/images/red.png`);
    this.load.image(`particleRed`, `./assets/images/particleRed.png`);
    this.load.image(`particleYellow`, `./assets/images/particleYellow.png`);
    this.load.image(`particleGreen`, `./assets/images/particleGreen.png`);
    this.load.image(`particleBlue`, `./assets/images/particleBlue.png`);

    this.load.image(`containerBlue`, `./assets/images/containerBlue.png`);
    this.load.image(`containerGreen`, `./assets/images/containerGreen.png`);
    this.load.image(`containerRed`, `./assets/images/containerRed.png`);
    this.load.image(`containerYellow`, `./assets/images/containerYellow.png`);

    this.load.image(`background`, `./assets/images/background.png`);
    this.load.image(`trainFull`, `./assets/images/trainFull.png`);
    this.load.image(`trainEmpty`, `./assets/images/trainEmpty.png`);

    this.load.audio(`leavingTrain`, `./assets/sounds/leavingTrain.mp3`);
    this.load.audio(`match`, `./assets/sounds/match.mp3`);
    this.load.audio(`close`, `./assets/sounds/close.mp3`);
    this.load.audio(`full`, `./assets/sounds/full.mp3`);
    this.load.audio(`arrive`, `./assets/sounds/arrive.mp3`);
    this.load.audio(`ambient`, `./assets/sounds/ambient.mp3`);
  }
  create() {
    this.scene.start(`begin`);
  }
  update() {}
}
