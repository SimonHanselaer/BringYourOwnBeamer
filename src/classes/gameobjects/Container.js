export default class Container extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, color, teller) {
    super(scene, x, y, `container${color}`);
    this.state = teller;
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
  }
}
