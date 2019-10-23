import Ore from '../gameobjects/Ore';
import Player from '../gameobjects/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }
  init() {
    this.orePosY = 0;
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;
    this.player;
  }
  preload() {}

  create() {
    this.createPlayer();
    this.createControls(this.player);
    this.createOre();
  }

  createControls(player) {
    this.input.on('pointermove', pointer => {
      // console.log(player);
      // console.log(pointer);
      player.setPosition(pointer.x, pointer.y);
      console.log('pointer moved');
    });
  }

  createOre() {
    this.ore = new Ore(
      this,
      this.orePosY,
      this.sys.game.config.height / 2 - 150
    );
    this.ore.setScale(0.1, 0.1);
  }

  createPlayer() {
    this.player = new Player(
      this,
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2
    );
    this.player.setScale(0.1, 0.1);
  }

  update() {}
}
