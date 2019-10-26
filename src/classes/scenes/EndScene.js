export default class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: `end`
    });
  }

  init() {
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;

    this.leaveTrainBoolean = false;

    this.timer = this.time.addEvent({
      delay: 4000,
      callback: this.leaveTrain,
      callbackScope: this,
      loop: false
    });

    this.timerRestart = this.time.addEvent({
      delay: 12000,
      callback: this.restartGame,
      callbackScope: this,
      loop: false
    });
  }
  preload() {}
  create() {
    //console.log('in create endscene');
    this.createBackground();
    this.createTrain();
  }

  createBackground() {
    this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');
  }

  createTrain() {
    this.train = this.add.image(
      this.screenWidth / 2,
      this.screenHeight / 2,
      'trainFull'
    );
  }

  leaveTrain() {
    //this.leaveTrainBoolean = !this.leaveTrainBoolean;
    this.leaveTrainBoolean = true;
    this.music = this.sound.add('leavingTrain');
    this.music.play();
  }

  restartGame() {
    console.log('herstart game');
    this.scene.start(`game`);
  }

  update() {
    if (this.leaveTrainBoolean === true) {
      console.log('tuuut tuuut');
      this.train.x += 10;
    }
  }
}
