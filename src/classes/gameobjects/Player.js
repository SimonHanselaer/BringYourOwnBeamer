export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, `boat`);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
  }
}
