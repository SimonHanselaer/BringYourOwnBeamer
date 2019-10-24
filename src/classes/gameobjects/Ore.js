export default class Ore extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, random) {
    super(scene, x, y, `grondstof${random}`);
    this.state = random;

    //fallen down or not
    this.down = false;

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);

    switch (random) {
    case 1:
      this.color = 'Yellow';
      break;

    case 2:
      this.color = 'Blue';
      break;

    case 3:
      this.color = 'Red';
      break;

    case 4:
      this.color = 'Green';
      break;
    }
  }
}
