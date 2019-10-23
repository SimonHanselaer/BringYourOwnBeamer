export default class Coin extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y) {
    super(scene, x, y, `coin`);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
