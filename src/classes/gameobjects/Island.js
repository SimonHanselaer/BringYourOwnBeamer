export default class Island extends Phaser.Physics.Arcade.Image{
  constructor(scene,x,y,random){
    super(scene,x,y,`island${random}`);

    scene.add.existing(this);
    scene.physics.add.existing(this);
  }
}
