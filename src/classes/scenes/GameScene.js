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
    this.moveOreBoolean = true;
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

  createPlayer() {
    this.player = new Player(
      this,
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2
    );
    this.player.setScale(0.1, 0.1);
  }

  createOre() {
    this.ore = new Ore(
      this,
      this.orePosY,
      this.sys.game.config.height / 2 - 150
    );
    this.ore.setScale(0.1, 0.1);
    this.ore.setScale(0.1, 0.1);
    this.ore.setInteractive();

    this.ore.on('pointerdown', () => this.clickedOre());
  }

  clickedOre() {
    this.moveOreBoolean = false;
    this.physics.world.gravity.y = this.physics.world.gravity.y + 160;
  }

  update() {
    if (this.moveOreBoolean) {
      this.ore.x = this.ore.x + 2;
    }
  }
}
