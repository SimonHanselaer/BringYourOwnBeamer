import Ore from '../gameobjects/Ore';
import Player from '../gameobjects/Player';
import Container from '../gameobjects/Container';

const map = (value, in_min, in_max, out_min, out_max) => {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

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
    this.oreSpeed = 5;

    this.containers = [];

    this.containerCount = [
      { color: 'yellow', count: 0 },
      { color: 'blue', count: 0 },
      { color: 'red', count: 0 },
      { color: 'green', count: 0 }
    ];

    this.colors = ['Yellow', 'Blue', 'Red', 'Green'];
  }
  preload() { }

  create() {
    this.createPlayer();
    this.createControls(this.player);
    this.createContainers();
    this.createOre();
    this.checkForProgress();
    this.createProgressBar();
  }

  createControls(player) {
    this.input.on('pointermove', pointer => {
      // console.log(player);
      // console.log(pointer);
      player.setPosition(pointer.x, this.sys.game.config.height / 2 - 150);
      console.log('pointer moved');
    });

    const controllerOptions = { enableGestures: true };
    Leap.loop(controllerOptions, frame => {
      if (frame.hands.length > 0) {
        const hand = frame.hands[0];
        const position = hand.palmPosition[0];

        console.log(position, map(position, - 150, 150, 0, 1));

        player.setPosition(
          map(position, - 200, 200, 0, this.screenWidth),
          this.sys.game.config.height / 2 - 150
        );
      }
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

  createContainers() {
    this.containerPosX = 249;
    this.teller = 1;
    this.colors.forEach(color => {
      this.container = new Container(
        this,
        this.containerPosX,
        this.sys.game.config.height,
        color,
        this.teller
      );
      // console.log(`container ${color} aangemaakt`);
      // console.log(this.container.width);
      this.containerPosX = this.containerPosX + this.container.width + 100;
      this.teller++;
      this.containers.push(this.container);
    });
  }

  createOre() {
    this.random = Math.ceil(Math.random() * 4);
    this.ore = new Ore(
      this,
      this.orePosY,
      this.sys.game.config.height / 2 - 150,
      this.random
    );
    this.ore.setScale(0.1, 0.1);
    this.ore.setScale(0.1, 0.1);
    this.ore.setInteractive();

    this.physics.add.overlap(
      this.ore,
      this.player,
      this.createOverlapOre,
      null,
      this
    );

    this.containers.forEach(container => {
      if (container.state === this.ore.state) {
        this.physics.add.overlap(
          container,
          this.ore,
          this.createOverlapContainer,
          null,
          this
        );
      }
    });

    this.physics.add.overlap(
      this.ore,
      this.player,
      this.createOverlap,
      null,
      this
    );
  }

  createOverlapOre() {
    this.moveOreBoolean = false;
    this.ore.body.gravity.y = 1600;
  }

  checkForProgress() {
    console.log(this.ore.state);
  }

  createOverlapContainer() {
    this.orestate = this.ore.state - 1;
    if (this.ore.y > this.screenHeight) {
      this.containerCount[this.orestate].count++;

      if (this.containerCount[this.orestate].count == 3) {
        console.log(this.containerCount[this.orestate].color, 'vol!');
      }
    }
  }

  createProgressBar() {
    this.bar = this.add.rectangle(
      this.screenWidth / 2,
      0,
      this.screenWidth,
      20,
      0xec98a2
    );
  }

  update() {
    if (this.moveOreBoolean) {
      this.ore.x = this.ore.x + this.oreSpeed;
    }

    if (
      this.ore.x > this.screenWidth + this.ore.width / 20 ||
      this.ore.y > this.screenHeight + this.ore.height / 20
    ) {
      this.ore.destroy();
      this.createOre();
      this.oreSpeed = this.oreSpeed + 0.1;
      this.moveOreBoolean = true;
    }
  }
}
