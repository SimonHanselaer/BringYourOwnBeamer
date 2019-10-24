import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import '../leap-0.6.4';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 3840,
      height: 1080,
      title: `Big Bucks Buccaneers`,
      scene: [BootScene, PreloadScene, GameScene],
      backgroundColor: '#ffffff',
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          gravity: { y: 0 },
          debug: true
        }
      }
    });
    console.log(`Constructor Game class`);
  }
}
export default Game;
