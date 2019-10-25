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
    this.progress = 0;
    this.orePosY = 0;
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;
    this.player;
    this.moveOreBoolean = true;
    this.oreSpeed = 5;

    this.containers = [];

    this.containerStaticGroup = this.physics.add.staticGroup();

    this.containerCount = [
      {id: 0, color: 'Yellow', count: 0},
      {id: 1, color: 'Blue', count: 0},
      {id: 2, color: 'Red', count: 0},
      {id: 3, color: 'Green', count: 0}
    ];

    this.colors = ['Yellow', 'Blue', 'Red', 'Green'];
  }

  preload() {}

  create() {
    this.createPlayer();
    this.createControls(this.player);
    this.createContainers();
    this.createOre();
    this.createProgressBar();
  }

  //Controls --------------------------------------------------------------------------------------

  createControls(player) {
    this.input.on('pointermove', pointer => {
      // console.log(player);
      // console.log(pointer);
      player.setPosition(pointer.x, this.sys.game.config.height / 2 - 150);
      console.log('pointer moved');
    });

    const controllerOptions = {enableGestures: true};
    Leap.loop(controllerOptions, frame => {
      if (frame.hands.length > 0) {
        const hand = frame.hands[0];
        const position = hand.palmPosition[0];

        let realPosition = map(position, - 200, 200, 0, this.screenWidth);

        if (realPosition < 0) {
          realPosition = 0;
        } else if (realPosition > this.screenWidth) {
          realPosition = this.screenWidth;
        }

        player.setPosition(realPosition, this.sys.game.config.height / 2 - 150);
      }
    });
  }

  //player --------------------------------------------------------------------------------------

  createPlayer() {
    this.player = new Player(
      this,
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2
    );
    this.player.setScale(0.1, 0.1);
  }

  //Container --------------------------------------------------------------------------------------

  createContainers() {
    this.containerPosX = 249;
    this.teller = 0;
    this.colors.forEach(color => {
      // this.container = new Container(
      //   this,
      //   this.containerPosX,
      //   this.sys.game.config.height,
      //   color,
      //   this.teller

      this.containerStaticGroup
        .create(
          this.containerPosX,
          this.screenHeight - 182,
          `container${color}`
        )
        .refreshBody();

      this.containerStaticGroup.children.entries[this.teller].color = color;
      console.log(this.containerStaticGroup.children.entries[this.teller]);

      // console.log(`container ${color} aangemaakt`);
      // console.log(this.container.width);
      // this.container.body.checkCollision.none = true;
      // this.container.body.checkCollision.up = false;
      // this.container.body.checkCollision.right = false;

      // console.log(this.container.body);
      this.containerPosX = this.containerPosX + 498 + 100;
      this.teller ++;
      // this.containers.push(this.container);
    });
  }

  //Ores --------------------------------------------------------------------------------------

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

    this.physics.add.collider(
      this.ore,
      this.player,
      this.createOverlapOre,
      null,
      this
    );

    console.log('ore', this.ore);
    console.log(this.physics);

    this.containerStaticGroup.children.entries.forEach(container => {
      this.containerCount.forEach(counts => {
        //console.log('Count: ', counts.color, counts.count);
        if (
          container.color === this.ore.color &&
          counts.color === this.ore.color &&
          counts.count < 3
        ) {
          this.physics.add.collider(this.ore, container, this.handleCollideA);
          if (this.ore.down) {
            this.createOre();
          }
          console.log('collider toegevoegd tussen ore en container');
        }
      });
    });
  }

  handleCollideA(e) {
    if (!e.down) {
      e.down = true;
      //
      console.log('een keer maar');
      return e.down;
    }
  }

  createOverlapOre() {
    this.moveOreBoolean = false;
    this.ore.body.gravity.y = 1600;
  }

  //progressBar --------------------------------------------------------------------------------------

  createProgressBar() {
    this.bar = this.add.rectangle(0, 0, this.progress * 320, 50, 0xec98a2);
    this.bar.setOrigin(0);
  }

  //update --------------------------------------------------------------------------------------

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
    if (this.ore.down) {
      this.containerCount.forEach(container => {
        if (this.ore.color === container.color) {
          container.count ++;
          this.progress ++;
          this.createProgressBar();
          console.log('container', container);
        }
        if (container.count === 3) {
          this.particles = this.add.particles('particle');
          const emitter = this.particles.createEmitter({
            speed: 100,
            scale: {start: 1, end: 0},
            blendMode: 'ADD'
          });
          emitter.setPosition(
            this.containerStaticGroup.children.entries[container.id].x,
            this.containerStaticGroup.children.entries[container.id].y
          );
          emitter.setSpeed(200);
          emitter.setBlendMode(Phaser.BlendModes.ADD);
          // console.log('Container is vol');
        }
      });
      this.createOre();
      !this.ore.down;

      console.log(this.containerCount);

      this.oreSpeed = this.oreSpeed + 0.1;
      this.moveOreBoolean = true;
    }
    // if (this.ore.body.onFloor()) {
    //   console.log('er is een collide');
    // }
  }
}
