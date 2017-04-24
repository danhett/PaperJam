class MenuState extends Phaser.State {
	create() {
		this.gameMusic = this.game.add.audio("game-music");
		this.gameMusic.loop = true;
    this.gameMusic.play();

		var start = this.game.add.sprite(500, 220, 'biglogo');
		start.scale.set(0.9, 0.9)
		start.anchor.set(0.5, 0.5);
		var inst = this.game.add.sprite(10, 420, 'instructions');
		inst.scale.set(0.7, 0.7);
		var startButton = this.game.add.sprite(800, 580, 'startButton');
		startButton.scale.set(0.7, 0.7);

		startButton.anchor.set(0.5, 0.5);
		startButton.inputEnabled = true;
		startButton.input.useHandCursor = true;
    startButton.events.onInputDown.add(this.startGame, this);

		this.game.add.tween(start.scale).to({x:1.01, y:1.01}, 600, "Linear", true).yoyo(true).repeat(-1);
	}

	startGame() {
		this.game.state.start("GameState");
	}
}

export default MenuState;
