import GameState from 'states/GameState';
import MenuState from 'states/MenuState';
import PreloadState from 'states/PreloadState';
import BootState from 'states/BootState';
import GameOverState from 'states/GameOverState';
import WinState from 'states/WinState';
import Settings from 'core/Settings';

class Game extends Phaser.Game {

	constructor() {
		super(970, 690, Phaser.CANVAS, 'gameholder', null, true);

		this.state.add('BootState', BootState, false);
		this.state.add('PreloadState', PreloadState, false);
		this.state.add('MenuState', MenuState, false);
		this.state.add('GameState', GameState, false);
		this.state.add('GameOverState', GameOverState, false);
		this.state.add('WinState', WinState, false);

		this.state.start('BootState');
	}
}

new Game();
