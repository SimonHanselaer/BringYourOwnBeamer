export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }
  preload() {}
  create() {
    this.scene.start(`preload`);
  }
  update() {}
}
