import Player from '../gameobjects/Player';
import Island from '../gameobjects/Island';
import Enemy from '../gameobjects/Enemy';
import Coin from '../gameobjects/Coin';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }
  init() {
    this.gameOver = false;
    this.boatPosY = this.sys.game.config.height - 100;
    this.screenWidth = this.sys.game.config.width;
    this.screenHeight = this.sys.game.config.height;
  }
  preload() {}

  create() {
    this.createBackground();
    this.createControls();
    this.createPlayer();
    this.createCoins();
    this.createIslands();
    this.createScore();
    this.createEnemies();
  }

  createBackground() {
    for (let index = 0;index < this.screenWidth;index ++) {
      this.tellerWidth = (index % 32) * 64;
      this.tellerHeight = Math.floor(index / 32) * 64;
      this.background = this.add.image(
        this.tellerWidth,
        this.tellerHeight,
        `water`
      );
    }
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
  }

  createCoins() {
    this.coin = new Coin(this, Math.random() * this.screenWidth, - 150);

    this.physics.add.overlap(
      this.coin,
      this.player,
      this.collectCoin,
      null,
      this
    );
  }

  collectCoin(coin) {
    coin.disableBody(true, true);
    this.score += 100;
    this.scoreText.setText('score: ' + this.score);
  }

  createIslands() {
    this.random = Math.ceil(Math.random() * 5);
    this.island = new Island(
      this,
      Math.random() * this.screenWidth,
      - 150,
      this.random
    );

    this.physics.add.overlap(
      this.player,
      this.island,
      this.createOverlap,
      null,
      this
    );
  }

  createScore() {
    this.scoreText = this.add.text(this.screenWidth * 0.75, 50, 'score: 0', {
      fontSize: '36px',
      fill: '#000',
      fontFamily: 'impact'
    });
    this.score = 0;
    this.scoreText.setDepth(1);
  }

  createEnemies() {
    this.islandPosition =
      this.island.x < this.screenWidth / 2
        ? Phaser.Math.Between(this.screenWidth / 2, this.screenWidth)
        : Phaser.Math.Between(0, this.screenWidth / 2);
    this.enemy = new Enemy(this, this.islandPosition, - 150);
    this.physics.add.overlap(
      this.enemy,
      this.player,
      this.createOverlap,
      null,
      this
    );
  }

  createOverlap() {
    this.gameOver = true;
    this.physics.pause();
  }

  update() {
    if (!this.gameOver) {
      if (this.cursors.left.isDown) {
        this.player.setVelocityX(- 500);
      } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(500);
      } else {
        this.player.setVelocityX(0);
      }

      if (this.island.y >= this.screenHeight + 300) {
        this.island.disableBody(true, true);
        this.createIslands();
        this.physics.world.gravity.y = this.physics.world.gravity.y + 30;
      }

      this.randomGetal = Math.floor(Math.random() * 150 + 1);
      this.randomGetalEnemy = Math.round(Math.random() * 300);

      if (this.randomGetalEnemy === 7) {
        this.createEnemies();
      }

      if (this.randomGetal === 17) {
        this.createCoins();
      }
    }
  }
}
