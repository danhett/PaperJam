class PreloadState extends Phaser.State {
	drawPreloader() {
		this.loaderBase = this.game.add.graphics(100,185);
    this.loaderBase.beginFill(0x5b2033);
		this.loaderBase.drawRect(0, 0, 600, 30);

		this.loaderFill = this.game.add.graphics(110,195);
    this.loaderFill.beginFill(0xFFFFFF);
		this.loaderFill.drawRect(0, 0, 580, 10);
		this.loaderFill.scale.x = 0;
	}

	preload() {
		this.showLoaderText();

		this.game.load.image('start-button', 'assets/start.png');
		this.game.load.image('block', 'assets/block.png');
		this.game.load.image('edgeleft', 'assets/edgeleft.png');
		this.game.load.image('edgeright', 'assets/edgeright.png');
		this.game.load.image('go', 'assets/go.png');
		this.game.load.image('goal', 'assets/goal.png');
		this.game.load.image('title', 'assets/title.png');
		this.game.load.image('clouds', 'assets/clouds.png');
		this.game.load.image('biglogo', 'assets/biglogo.png');
		this.game.load.image('instructions', 'assets/instructions.png');
		this.game.load.image('startButton', 'assets/startButton.png');
		this.game.load.image('targetLeft', 'assets/targetLeft.png');
		this.game.load.image('targetRight', 'assets/targetRight.png');
		this.game.load.image('spikes', 'assets/spikes.png');
		this.game.load.image('enemy', 'assets/enemy.png');

		this.game.load.image('bullet1', 'assets/bullet1.png');
		this.game.load.image('bullet2', 'assets/bullet2.png');
		this.game.load.image('bullet3', 'assets/bullet3.png');

		this.game.load.image('particle1', 'assets/particle1.png');
		this.game.load.image('particle2', 'assets/particle2.png');
		this.game.load.image('particle3', 'assets/particle3.png');
		this.game.load.image('particle4', 'assets/particle4.png');
		this.game.load.image('particle5', 'assets/particle5.png');
		this.game.load.image('particle6', 'assets/particle6.png');
		this.game.load.image('particle7', 'assets/particle7.png');

		this.game.load.image('botparticle1', 'assets/botparticle1.png');
		this.game.load.image('botparticle2', 'assets/botparticle2.png');
		this.game.load.image('botparticle3', 'assets/botparticle3.png');
		this.game.load.image('botparticle4', 'assets/botparticle4.png');
		this.game.load.image('botparticle5', 'assets/botparticle5.png');
		this.game.load.image('botparticle6', 'assets/botparticle6.png');
		this.game.load.image('botparticle7', 'assets/botparticle7.png');

		this.game.load.image('dotOff', 'assets/dotOff.png');
		this.game.load.image('dotOn', 'assets/dotOn.png');
		this.game.load.image('congrats', 'assets/congrats.png');
		this.game.load.image('subline', 'assets/subline.png');
		this.game.load.image('instruction', 'assets/instruction.png');

		this.game.load.spritesheet('player-sheet', 'assets/player-sheet.png', 75, 140, 5);
		this.game.load.spritesheet('enemy-sheet', 'assets/enemySheet.png', 64, 64, 3);

		this.game.load.audio('game-music', 'assets/soundtrack.mp3');
		this.game.load.audio('explode1', 'assets/sfx/explode1.mp3');
		this.game.load.audio('explode2', 'assets/sfx/explode2.mp3');
		this.game.load.audio('explode3', 'assets/sfx/explode3.mp3');
		this.game.load.audio('jump', 'assets/sfx/jump.mp3');
		this.game.load.audio('win', 'assets/sfx/win.mp3');
		this.game.load.audio('lose', 'assets/sfx/lose.mp3');
		this.game.load.audio('shoot1', 'assets/sfx/shoot1.mp3');
		this.game.load.audio('shoot2', 'assets/sfx/shoot2.mp3');
		this.game.load.audio('shoot3', 'assets/sfx/shoot3.mp3');
		this.game.load.audio('shoot4', 'assets/sfx/shoot4.mp3');

	}

	showLoaderText() {
		/*
		var text = this.game.add.text(this.game.world.centerX, this.game.world.centerY,
														 "Loading...", { font: "18px Arial", fill: "#000000"});

    text.anchor.setTo(0.5, 0.5);
		*/

		// duncan is a wanker
		var load = this.game.add.sprite(230, 250, 'loading');
	}


  create() {
    this.state.start('MenuState');
	}
}

export default PreloadState;
