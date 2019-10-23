export default class Ore extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, `grondstof`);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(false);
  }
}
