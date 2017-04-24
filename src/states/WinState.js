class WinState extends Phaser.State {
	create() {
		var congrats = this.game.add.sprite(500, 280, 'congrats');
		congrats.scale.set(0.9, 0.9)
		congrats.anchor.set(0.5, 0.5);

		var subline = this.game.add.sprite(500, 610, 'subline');
		subline.scale.set(0.6, 0.6)
		subline.anchor.set(0.5, 0.5);

		this.game.add.tween(congrats.scale).to({x:0.94, y:0.94}, 300, "Linear", true).yoyo(true).repeat(-1);
	}
}

export default WinState;
