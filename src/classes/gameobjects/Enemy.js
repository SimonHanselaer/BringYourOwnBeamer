export default class Enemy extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, `enemy`);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
