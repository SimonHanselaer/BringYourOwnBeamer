import BootScene from './scenes/BootScene.js';
import PreloadScene from './scenes/PreloadScene.js';
import GameScene from './scenes/GameScene.js';
import EndScene from './scenes/EndScene.js';

import '../leap-0.6.4';

import {TransitionsPlugin} from 'phaser3-transitions';

class Game extends Phaser.Game {
  constructor() {
    super({
      type: Phaser.AUTO,
      width: 3840,
      height: 1080,
      title: `CarGO`,
      scene: [BootScene, PreloadScene, GameScene, EndScene],
      plugins: {
        scene: [
          {
            key: 'transitions',
            mapping: 'transitions',
            plugin: TransitionsPlugin
          }
        ]
      },
      backgroundColor: '#ffffff',
      version: `1.0`,
      physics: {
        default: `arcade`,
        arcade: {
          gravity: {y: 0},
          debug: true
        }
      }
    });
    console.log(`Constructor Game class`);
  }
}
export default Game;
