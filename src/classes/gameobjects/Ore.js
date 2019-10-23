export default class Ore extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, random) {
    super(scene, x, y, `grondstof${random}`);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);
  }
}
