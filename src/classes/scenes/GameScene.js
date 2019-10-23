import Ore from '../gameobjects/Ore';

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
    this.moveOreBoolean = true;
  }
  preload() { }

  create() {
    this.createControls();
    this.createOre();
  }

  createControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createOre() {
    this.ore = new Ore(
      this,
      this.orePosY,
      this.sys.game.config.height / 2 - 150
    );
    this.ore.setScale(.1, .1);
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
