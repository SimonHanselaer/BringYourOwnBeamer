import Player from '../gameobjects/Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }
  init() {
    this.boatPosY = this.sys.game.config.height - 100;
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;
  }
  preload() { }

  create() {
    this.createControls();
    this.createPlayer();
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlayer() {
    this.player = new Player(
      this,
      this.sys.game.config.width / 2,
      this.boatPosY
    );
    this.player.setScale(.1, .1);
  }

  update() {

  }
}
