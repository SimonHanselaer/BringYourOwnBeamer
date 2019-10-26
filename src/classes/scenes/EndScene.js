export default class EndScene extends Phaser.Scene {
  constructor() {
    super({
      key: `end`
    });
  }

  init(data) {
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;

    this.trainPosX = data;

    this.leaveTrainBoolean = false;

    this.timer = this.time.addEvent({
      delay: 2000,
      callback: this.leaveTrain,
      callbackScope: this,
      loop: false
    });

    this.timerRestart = this.time.addEvent({
      delay: 10000,
      callback: this.restartGame,
      callbackScope: this,
      loop: false
    });
  }
  preload() {}
  create() {
    this.createBackground();
    this.createTrain();
    this.closeTrain();
  }

  createBackground() {
    this.add.image(this.screenWidth / 2, this.screenHeight / 2, 'background');
  }

  createTrain() {
    this.train = this.add.image(
      this.trainPosX,
      this.screenHeight / 2,
      'trainFull'
    );
  }

  closeTrain() {
    this.musicClose = this.sound.add('close', {volume: 0.7});
    this.musicClose.play();
  }

  leaveTrain() {
    this.leaveTrainBoolean = true;
    this.music = this.sound.add('leavingTrain');
    this.music.play();
  }

  restartGame() {
    this.scene.start(`begin`);
  }

  update() {
    if (this.leaveTrainBoolean === true) {
      this.train.x += 10;
    }
  }
}
