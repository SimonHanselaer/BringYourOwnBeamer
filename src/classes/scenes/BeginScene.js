export default class BeginScene extends Phaser.Scene {
  constructor() {
    super({
      key: `begin`
    });
  }

  init() {
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;

    this.timer = this.time.addEvent({
      delay: 7000,
      callback: this.startGame,
      callbackScope: this,
      loop: false
    });
  }
  preload() {}
  create() {
    //console.log('in create endscene');
    this.createBackground();
    this.createTrain();
    this.arrive();
  }

  createBackground() {
    this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');
  }

  createTrain() {
    this.train = this.add.image(- 3840, 0, 'trainEmpty').setOrigin(0, 0);
  }

  arrive() {
    this.musicArrive = this.sound.add('arrive', {volume: 1});
    this.musicArrive.play();
  }

  startGame() {
    console.log('start game');
    this.scene.start(`game`);
  }

  update() {
    if (this.train.x < 0) {
      this.train.x += 10;
    }
  }
}
