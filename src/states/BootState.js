class BootState extends Phaser.State {
	preload() {
		this.game.load.image('loading', 'assets/loading.png');

	}

  create() {
    this.state.start('PreloadState');
	}
}

export default BootState;
