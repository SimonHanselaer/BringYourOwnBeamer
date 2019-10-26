import Ore from '../gameobjects/Ore';
import Player from '../gameobjects/Player';
import {GrowTransition} from 'phaser3-transitions';

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
    this.oreSpeed = 10;

    this.positionState = 1;
    this.positionToDo = 'verhogen';

    this.completedContainers = 0;

    this.containers = [];

    this.containerStaticGroup = this.physics.add.staticGroup();

    this.containerCount = [
      {id: 0, color: 'Yellow', count: 0, particlesBoolean: false},
      {id: 1, color: 'Blue', count: 0, particlesBoolean: false},
      {id: 2, color: 'Red', count: 0, particlesBoolean: false},
      {id: 3, color: 'Green', count: 0, particlesBoolean: false}
    ];

    this.colors = ['Yellow', 'Blue', 'Red', 'Green'];

    this.timer = this.time.addEvent({
      delay: 3000,
      callback: this.moveTrain,
      loop: true
    });
  }

  preload() {}

  create() {
    this.createBackground();
    this.createPlayer();
    this.createControls(this.player);
    this.createContainers();
    this.createProgressBar();
    this.createTrain();
    this.createOre();
    this.createAmbient();
  }

  //Styling-----------------------------------------

  createBackground() {
    this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');
  }

  createTrain() {
    this.train = this.add.image(
      this.screenWidth / 2,
      this.screenHeight / 2,
      'trainEmpty'
    );

    this.containerStaticGroup.add(this.train);
  }

  createAmbient() {
    this.musicAmbient = this.sound.add('ambient', {volume: 0.7}, true);
    this.musicAmbient.play();
  }

  //Controls --------------------------------------------------------------------------------------

  createControls(player) {
    this.input.on('pointermove', pointer => {
      player.setPosition(pointer.x, this.sys.game.config.height / 2 - 50);
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

        player.setPosition(realPosition, this.sys.game.config.height / 2 - 50);
      }
    });
  }

  //player --------------------------------------------------------------------------------------

  createPlayer() {
    this.player = new Player(
      this,
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2 - 50
    );

    this.lastPos = this.player.x;
  }

  //Container --------------------------------------------------------------------------------------

  createContainers() {
    this.containerPosX = 475 + 276;
    this.teller = 0;
    this.colors.forEach(color => {
      this.containerStaticGroup
        .create(
          this.containerPosX,
          this.screenHeight / 2 + 170,
          `container${color}`
        )
        .refreshBody();

      this.containerStaticGroup.children.entries[this.teller].color = color;

      this.containerPosX = this.containerPosX + 552 + 116;
      this.teller ++;
    });
  }

  moveTrain() {
    this.moveTrainBoolean = !this.moveTrainBoolean;
  }

  //Ores --------------------------------------------------------------------------------------

  createOre() {
    this.random = Math.ceil(Math.random() * 4);
    this.containerCount.forEach(container => {
      if (container.count >= 3 && container.id + 1 === this.random) {
        this.random = Math.ceil(Math.random() * 4);
        if (container.count >= 3 && container.id + 1 === this.random) {
          this.random = Math.ceil(Math.random() * 4);
        }
      }
    });

    this.ore = new Ore(
      this,
      this.orePosY,
      this.sys.game.config.height / 2 - 50,
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

    this.containerStaticGroup.children.entries.forEach(container => {
      this.containerCount.forEach(counts => {
        if (
          container.color === this.ore.color &&
          counts.color === this.ore.color
        ) {
          this.physics.add.collider(this.ore, container, this.handleCollideA);
          if (this.ore.down) {
            this.createOre();
          }
        }
      });
    });
  }

  handleCollideA(e) {
    if (!e.down) {
      e.down = true;

      return e.down;
    }
  }

  createOverlapOre() {
    this.moveOreBoolean = false;
    this.ore.body.gravity.y = 1600;
  }

  //progressBar --------------------------------------------------------------------------------------

  createProgressBar() {
    this.bar = this.add.rectangle(0, 0, this.progress * 320, 390, 0xec98a2);

    this.bar2 = this.add.rectangle(0, 0, 0, 390, 0xec98a2);

    this.barArray = [this.bar, this.bar2];

    this.bar.setOrigin(0);

    this.enterConfig = {
      type: 'Grow',
      enterFrom: 'right'
    };

    this.exitConfig = {
      type: 'FadeSlide',
      exitTo: 'top'
    };

    this.config = {
      duration: 500,
      enterFrom: 'left'
    };

    this.enterTransitions = new GrowTransition(
      this,
      this.barArray,
      this.config
    );

    this.exitTransition = this.transitions.create(
      this.barArray,
      this.exitConfig
    );

    this.enterTransitions.enter();
  }

  //update --------------------------------------------------------------------------------------

  update() {
    if (this.moveOreBoolean) {
      this.ore.x = this.ore.x + this.oreSpeed;
    }

    if (this.timer.callback.moveTrainBoolean === true) {
      for (
        this.teller2 = 0;
        this.teller2 < this.containerStaticGroup.children.entries.length;
        this.teller2 ++
      ) {
        this.containerStaticGroup.children.entries[this.teller2].x ++;
        this.containerStaticGroup.children.entries[this.teller2].body.x ++;
      }
    } else {
      for (
        this.teller2 = 0;
        this.teller2 < this.containerStaticGroup.children.entries.length;
        this.teller2 ++
      ) {
        this.containerStaticGroup.children.entries[this.teller2].x --;
        this.containerStaticGroup.children.entries[this.teller2].body.x --;
      }
    }

    if (
      this.ore.x > this.screenWidth + this.ore.width / 20 ||
      this.ore.y > this.screenHeight + this.ore.height / 20
    ) {
      this.ore.destroy();
      this.createOre();
      this.oreSpeed = this.oreSpeed + 0.7;
      this.moveOreBoolean = true;
    }
    if (this.ore.down) {
      this.containerCount.forEach(container => {
        if (this.ore.color === container.color) {
          container.count ++;
          if (container.count < 4) {
            this.progress ++;
          }
          this.createProgressBar();

          this.completedContainers ++;

          this.musicMatch = this.sound.add('match', {volume: 0.5});
          this.musicMatch.play();
        }

        if (container.count === 3 && !container.particlesBoolean) {
          container.particlesBoolean = true;
          this.particles = this.add.particles(`particle${container.color}`);
          const emitter = this.particles.createEmitter({
            speed: 100,
            scale: {start: 0.4, end: 0},
            // blendMode: 'ADD',
            maxParticles: 75,

            accelerationY: - 500,
            frequency: 75,
            lifespan: 800
          });
          emitter.setPosition(
            this.containerStaticGroup.children.entries[container.id].x,
            this.containerStaticGroup.children.entries[container.id].y - 100
          );
          emitter.setSpeed(200);

          emitter.setAlpha(0.8);
          this.musicFull = this.sound.add('full', {volume: 0.5});
          this.musicFull.play();
        }
      });
      this.ore.disableBody();
      this.containerStaticGroup.add(this.ore);
      this.createOre();
      !this.ore.down;

      this.oreSpeed = this.oreSpeed + 0.7;
      this.moveOreBoolean = true;
    }

    if (
      this.containerCount[0].count >= 3 &&
      this.containerCount[1].count >= 3 &&
      this.containerCount[2].count >= 3 &&
      this.containerCount[3].count >= 3
    ) {
      this.scene.start(`end`, this.train.x);
    }

    if (this.lastPos > this.player.x) {
      this.lastPos = this.player.x;
      this.player.setRotation(- 0.5);
    }

    if (this.lastPos < this.player.x) {
      this.lastPos = this.player.x;
      this.player.setRotation(0.5);
    }
  }
}
