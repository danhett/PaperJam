import Levels from 'levels/Levels';
import Maths from 'core/Maths';

var currentLevel = 0;
var maxLevels = 5;
var lastDir = "right";
var dead = false;

class GameState extends Phaser.State {
  create() {
    this.bg;
    this.walls;
    this.hazards;
    this.enemies;
    this.player;
    this.bullets;
    this.targets;
    this.emitter;
    this.playerEmitter;
    this.startingX;
    this.startingY;
    this.goal;
    this.dots;
    this.enemy;

    this.signsSmashed;
    this.totalSigns;

    this.worldWidth = 2300;
    this.worldHeight = 1080;
    this.playerAccelRate = 40;
    this.maxSpeed = 600;
    this.maxSpeedVert = 1200;
    this.jumpHeight = 1400;
    this.playerDrag = 1000;
    this.playerGravity = 2500;

    this.setupSound();
    this.setupGame();
    this.createPlayer();
    this.setupEmitter();
    this.addControls();
    this.createReadouts();

    dead = false;
    lastDir = "right";``
  }

  setupSound() {
    this.jumpSound = this.game.add.audio("jump");
    this.explode1 = this.game.add.audio("explode1");
    this.explode2 = this.game.add.audio("explode2");
    this.explode3 = this.game.add.audio("explode3");
    this.winSound = this.game.add.audio("win");
    this.loseSound = this.game.add.audio("lose");
    this.shoot1 = this.game.add.audio("shoot1");
    this.shoot2 = this.game.add.audio("shoot2");
    this.shoot3 = this.game.add.audio("shoot3");
    this.shoot4 = this.game.add.audio("shoot4");

    this.shootSounds = [this.shoot1, this.shoot2, this.shoot3, this.shoot4];
    this.explodeSounds = [this.explode1, this.explode2, this.explode3];
  }

  setupGame() {
    this.bg = this.game.add.tileSprite(0, 0, this.worldWidth, this.worldHeight, "clouds");

    this.walls = this.game.add.group();
    this.bullets = this.game.add.group();
    this.targets = this.game.add.group();
    this.hazards = this.game.add.group();
    this.enemies = this.game.add.group();

    var levelList = [Levels.level1(), Levels.level2(), Levels.level3(), Levels.level4(), Levels.level5()];
    var level = levelList[currentLevel];

    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {

        // BLOCK
        if (level[i][j] == 'x') {
            var wall = this.game.add.sprite(64*j, 64*i, 'block');
            this.game.physics.enable(wall, Phaser.Physics.ARCADE);
            wall.body.immovable = true;

            this.walls.add(wall);
        }

        // EDGE LEFT
        if (level[i][j] == '<') {
            var wall = this.game.add.sprite(64*j, 64*i, 'edgeleft');
            this.game.physics.enable(wall, Phaser.Physics.ARCADE);
            wall.body.immovable = true;

            this.walls.add(wall);
        }

        // EDGE RIGHT
        if (level[i][j] == '>') {
            var wall = this.game.add.sprite(64*j, 64*i, 'edgeright');
            this.game.physics.enable(wall, Phaser.Physics.ARCADE);
            wall.body.immovable = true;

            this.walls.add(wall);
        }

        // GO
        if (level[i][j] == 's') {
            var go = this.game.add.sprite(64*j, 64*i, 'go');
            this.startingX = go.x;
            this.startingY = go.y - 100;
        }

        // GOAL
        if (level[i][j] == 'e') {
            this.goal = this.game.add.sprite(64*j, 64*i, 'goal');
            this.game.physics.enable(this.goal, Phaser.Physics.ARCADE);
            this.goal.body.immovable = true;
        }

        // TARGETS
        if (level[i][j] == '}') {
            var target = this.game.add.sprite(64*j, 64*i - 58, 'targetLeft');
            this.game.physics.enable(target, Phaser.Physics.ARCADE);
            target.body.immovable = true;
            this.targets.add(target);
        }
        if (level[i][j] == '{') {
            var target = this.game.add.sprite(64*j, 64*i - 58, 'targetRight');
            this.game.physics.enable(target, Phaser.Physics.ARCADE);
            target.body.immovable = true;
            this.targets.add(target);
        }

        // INSTRUCTION
        if (level[i][j] == 'i') {
            var instruction = this.game.add.sprite(64*j, 64*i, 'instruction');
            instruction.scale.set(0.8, 0.8);
            this.game.add.tween(instruction).from({alpha:0}, 300, "Linear", true, 1000);
        }

        // SPIKES
        if (level[i][j] == '^') {
            var spikes = this.game.add.sprite(64*j, 64*i + 21, 'spikes');
            this.game.physics.enable(spikes, Phaser.Physics.ARCADE);
            spikes.body.immovable = true;
            this.hazards.add(spikes);
        }

        // ENEMY
        if (level[i][j] == 'o') {
            var enemy = this.game.add.sprite(64*j, 64*i, 'enemy-sheet');
            enemy.anchor.set(0.5, 0.5);
            this.game.physics.enable(enemy, Phaser.Physics.ARCADE);
            enemy.body.immovable = true;

            enemy.animations.add('spin', [0,1,2]);
            enemy.animations.play('spin', 10, true);

            if(Maths.flip()) {
              enemy.body.velocity.x = -150;
            }
            else {
              enemy.body.velocity.x = 150;
            }

            if(Maths.flip()) {
              enemy.body.velocity.y = -150;
            }
            else {
              enemy.body.velocity.y = 150;
            }

            enemy.body.collideWorldBounds = true;
            this.enemies.add(enemy);
        }
      }
    }
  }

  createPlayer() {
    this.player = this.game.add.sprite(this.startingX, this.startingY, 'player-sheet');
    this.player.anchor.set(0.5, 0.5);

    this.player.animations.add('idle', [0]);
    this.player.animations.add('run', [1,2]);
    this.player.animations.add('jump', [3,4]);

    this.player.animations.play('idle');

    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.maxVelocity.x = this.maxSpeed;
    this.player.body.maxVelocity.y = this.maxSpeedVert;
    this.player.body.drag.x = this.playerDrag;
    this.player.body.gravity.y = this.playerGravity;
    this.player.body.collideWorldBounds = true;

    this.game.world.setBounds(0, 0, this.worldWidth, this.worldHeight);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);
  }

  setupEmitter() {
    this.emitter = this.game.add.emitter(0, 0, 100);
    this.emitter.makeParticles(["particle1", "particle2", "particle3", "particle4", "particle5", "particle6", "particle7"]);
    this.emitter.setYSpeed(-200,200);
    this.emitter.setXSpeed(-200,200);
    this.emitter.gravity = 1000;

    this.playerEmitter = this.game.add.emitter(0, 0, 100);
    this.playerEmitter.makeParticles(["botparticle1", "botparticle2", "botparticle3", "botparticle4", "botparticle5", "botparticle6", "botparticle7"]);
    this.playerEmitter.setYSpeed(-200,200);
    this.playerEmitter.setXSpeed(-200,200);
    this.playerEmitter.gravity = 1000;
  }


  //----------------------------------------------------------------------------
  //  CONTROLS/PHYSICS
  //----------------------------------------------------------------------------
  addControls() {
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    this.jump.onDown.add(this.doJump, this);

    this.shootButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.shootButton.onDown.add(this.shootLaser, this);
  }

  doJump() {
    if(this.player.body.touching.down) {
      this.player.body.velocity.y -= this.jumpHeight;

      this.jumpSound.play();
    }
  }

  movePlayer() {
    if(this.cursors.left.isDown) {
      this.player.body.velocity.x -= this.playerAccelRate;
      this.player.scale.set(-1,1);
      this.setCorrectAnimationState(true);
    }
    else if(this.cursors.right.isDown) {
      this.player.body.velocity.x += this.playerAccelRate;
      this.player.scale.set(1,1);
      this.setCorrectAnimationState(true);
    }
    else {
      this.setCorrectAnimationState(false);
    }
  }

  setCorrectAnimationState(isPressing) {
    if(isPressing && this.player.body.touching.down) {
      this.player.animations.play('run', 15, true);
    }
    else {
      if(!this.player.body.touching.down) {
        this.player.animations.play('jump', 15, true);
      }
      else {
        this.player.animations.play('idle');
      }
    }
  }


  //------------------------------------------------------------------------
  //  SHOOTING
  //------------------------------------------------------------------------
  shootLaser() {
    if(this.player.body.velocity.x < 0)
      lastDir = "left";
    else if(this.player.body.velocity.x > 0)
      lastDir = "right"

    if(lastDir == "left") {
      this.bulletVel = -1000;
      this.spawnPos = this.player.x - 50;
      this.fireShot()
    }
    else if(lastDir == "right") {
      this.bulletVel = 1000;
      this.spawnPos = this.player.x + 50;
      this.fireShot();
    }
  }

  fireShot() {
    if(!dead) {
      var bullet = this.bullets.create(this.spawnPos, this.player.y, this.getBullet());
      bullet.anchor.set(0, 0.5);
      bullet.scale.set(0.5, 0.5);
      this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
      bullet.body.velocity.x = this.bulletVel;

      bullet.checkWorldBounds = true;
      bullet.events.onOutOfBounds.add(this.killBullet, this);

      this.getShootSound().play();
    }
  }

  getBullet() {
    return "bullet" + Maths.randIntRange(1,3);
  }

  getShootSound() {
    return this.shootSounds[Maths.randIntRange(0,3)];
  }

  getExplodeSound() {
    return this.explodeSounds[Maths.randIntRange(0,2)];
  }


  //------------------------------------------------------------------------
  //  TICK
  //------------------------------------------------------------------------
  update() {
    this.checkCollisions();
    this.movePlayer();
    this.scrollScenery();
    this.moveEnemies();
  }

  checkCollisions() {
    this.game.physics.arcade.collide(this.player, this.walls);
    this.game.physics.arcade.collide(this.bullets, this.targets, this.onTargetHit, null, this);
    this.game.physics.arcade.collide(this.player, this.goal, this.onLevelComplete, null, this);
    this.game.physics.arcade.collide(this.player, this.hazards, this.onPlayerDeath, null, this);
    this.game.physics.arcade.collide(this.player, this.enemies, this.onPlayerDeath, null, this);
    this.game.physics.arcade.collide(this.enemies, this.walls, this.bounceEnemy, null, this);
  }

  scrollScenery() {
    this.bg.tilePosition.x -= 0.5;
  }

  moveEnemies() {
    this.enemies.forEach(function(enemy) {
      if(enemy.x <= 50) {
        enemy.body.velocity.x = 150;
      }
      if(enemy.x >= 2200) { // rough number slightly less than world width, fuck knows
        enemy.body.velocity.x = -150;
      }
      if(enemy.y <= 50) {
        enemy.body.velocity.y = 150;
      }
      if(enemy.y >= this.worldHeight) { // shouldn't happen if there's floor
        enemy.body.velocity.y = -150;
      }
    }, this);
  }

  //------------------------------------------------------------------------
  //  READOUTS + SCORE
  //------------------------------------------------------------------------
  createReadouts() {
    this.dots = [];
    this.signsSmashed = 0;

    for(var i = 0; i < 5; i++) {
      var grey = this.game.add.sprite(660 + (i * 60), 20, 'dotOff');
      grey.scale.setTo(0.7, 0.7);
      grey.fixedToCamera = true;

      var red = this.game.add.sprite(660 + (i * 60), 20, 'dotOn');
      red.scale.setTo(0.7, 0.7);
      red.fixedToCamera = true;
      this.dots.push(red);
    }
  }

  markSignSmashed() {
    this.dots[this.signsSmashed].alpha = 0;
    this.signsSmashed++;
  }

  //------------------------------------------------------------------------
  //  COLLISION HANDLERS
  //------------------------------------------------------------------------
  onTargetHit(bullet, target) {
    this.emitter.x = target.x;
    this.emitter.y = target.y;

    this.emitter.start(true, 6000, null, 8);

    this.killBullet(bullet);
    this.killTarget(target);

    this.markSignSmashed();

    this.getExplodeSound().play();
  }

  killBullet(_bullet) {
    _bullet.kill();
  }

  killTarget(_target) {
    _target.kill();
  }

  onLevelComplete(player, goal) {
    if(currentLevel < (maxLevels-1)) {
      if(this.signsSmashed == 5) {
        currentLevel++;
        this.game.state.start("GameState");
        this.winSound.play();
      }
    }
    else {
      this.game.state.start("WinState");
      this.winSound.play();
    }
  }

  onPlayerDeath(player, hazard) {
    player.kill();

    this.playerEmitter.x = player.x;
    this.playerEmitter.y = player.y;

    this.playerEmitter.start(true, 6000, null, 8);

    this.loseSound.play();
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.resetGame, this);

    dead = true;
  }

  bounceEnemy(enemy, wall) {
    if(enemy.body.touching.down) {
      enemy.body.velocity.y = -150;
      return;
    }
    if(enemy.body.touching.up) {
      enemy.body.velocity.y = 150;
      return;
    }
    if(enemy.body.touching.left) {
      enemy.body.velocity.x = 150;
      return;
    }
    if(enemy.body.touching.right) {
      enemy.body.velocity.x = -150;
      return;
    }
  }

  resetGame() {
    this.game.state.start("GameState");
  }
}

export default GameState;
