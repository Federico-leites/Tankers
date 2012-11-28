var Tankaggedon = {
		Constants: {
			SPEED_NORMAL: 5,
			SCENARIO_WIDTH: 500,
			SCENARIO_HEIGHT: 500, 
			MODEL_TIME_STEP_MS : 500
		},
		Game: function () {
			var self = this;
			this.init = function(){
				this.scenario = new Tankaggedon.Scenario(Tankaggedon.Constants.SCENARIO_WIDTH,Tankaggedon.Constants.SCENARIO_HEIGHT, "backgroundImage.png");
				this.scenario.init();
				this.scenario.loadPlayerTank();
				this.scenario.loadEnemyTanks([{x:20,y:10},{x:30,y:15},{x:-10,y:25}]);
			};
			this.getScenario = function () {
				return this.scenario;
			};
			this.end = function (reason){
				if(reason == "player dead"){
					alert("You are dead!!");
				};
			};
			this.checkPlayerDurability  = function(playerDurability){
				if(playerDurability == 0){
					this.end("player dead");
				}
			};
			this.updateGameState = function () {
				this.checkPlayerDurability(this.getScenario().getPlayerDurability());
				
				this.getScenario().getPlayerTank().move();
				this.getScenario().moveEnemies();

			};
			this.toString = function(){
				return this.getScenario().toString();  
			};

			this.run = function () {
				self.updateGameState();
			};
		},
		Scenario: function (height, width, backgroundImage) {
			this.init = function(){


			};
			this.loadPlayerTank = function () {
				var self = this;
				this.playerTank = new Tankaggedon.Tank(150, 5, {front: 50, sides: 15, back: 0}, self.playerStartingPosition, self.playerStartingDirection);

			};
			this.loadEnemyTanks = function (listOfEnemiesPositions) {
				this.enemyTanks = [];
				for (var i = 0; i < listOfEnemiesPositions.length; i++) {
					this.enemyTanks.push(new Tankaggedon.Tank(100, 5, {front: 50, sides: 15, back: 0},listOfEnemiesPositions[i],{x:0, y:-1}));
				};
				
			};

			this.getPlayerTank = function () {
				return this.playerTank;
			}

			this.getPlayerDurability = function () {
				return this.playerTank.getDurability();
			}

			this.moveEnemies = function () {
				for (var i = 0; i < this.enemyTanks.length; i++) {
					this.enemyTanks[i].move();
				};
			}

			this.height = height;
			this.width = width;
			this.backgroundImage;
			this.playerStartingPosition = {x:250, y: 250};
			this.playerStartingDirection = {x:0, y: 1};

			this.toString = function () {
				var ScenarioString = "The Scenario has " + this.width + "px width and " + this.height + "px height \n";
				ScenarioString += "\t\t The Player tank is at "+ this.playerTank.toString();
				for (var i = 0; i < this.enemyTanks.length; i++) {
					ScenarioString += "\t\t An enemy is at " + this.enemyTanks[i].toString();
				};

				return ScenarioString;
			}
		},
		Tank: function (durability, speed, armor, startingPosition, startingDirection) {
			this.durability = durability;
			this.speed = speed;
			/* this.armor.front = armor.front;
			this.armor.front = armor.sides;
			this.armor.front = armor.back;*/
			this.speed = speed;
			this.position = new Tankaggedon.Vector(startingPosition.x, startingPosition.y);
			this.direction = new Tankaggedon.Vector(startingDirection.x,startingDirection.y);

			this.turret = new Tankaggedon.Turret();
			this.canon = new Tankaggedon.Canon();

			this.move = function () {
				this.position = this.position.sum(this.direction.multiply(this.speed));
			};

			this.advance = function(){
				this.speed = Tankaggedon.Constants.SPEED_NORMAL;
			};

			this.reverse = function(){
				this.speed = -Tankaggedon.Constants.SPEED_NORMAL;
			};

			this.rotateLeft = function () {
				if (this.direction.equalsCoords(1, 0)){
						this.direction = this.direction.update(0,-1);
					} else if (this.direction.equalsCoords(0, -1)) {
						this.direction = this.direction.update(-1,0);
					} else if (this.direction.equalsCoords(-1, 0))  {
					    this.direction = this.direction.update(0,1);
					} else if (this.direction.equalsCoords(0, 1)){
					    this.direction = this.direction.update(1,0);
					}
			};

			this.rotateRight = function () {
				if (this.direction.equalsCoords(1, 0)){
						this.direction = this.direction.update(0,1);
					} else if (this.direction.equalsCoords(0, -1)) {
						 this.direction = this.direction.update(1,0);
					} else if (this.direction.equalsCoords(-1, 0))  {
					    this.direction = this.direction.update(0,-1);
					} else if (this.direction.equalsCoords(0, 1)){
					    this.direction = this.direction.update(-1,0);
					} 
			};

			this.stop = function(){
				this.speed = 0;
			};

			this.toString = function () {
				return  this.position.toString() + " and is heading " + this.direction.toString() + " at a speed of " + this.speed.toString() + "\n";
			}

			this.getDurability = function () {
				return this.durability;
			}

		},
		Turret: function (speed, name) {
			this.speed = speed;
			this.name = name;			
		},
		Canon: function (name, power, reloadRate) {
			this.name = name;
			this.power = power;
			this.reloadRate = reloadRate;

			this.shoot = function(){
				var shot = new Tankaggedon.shot();
			};
		},
		Objective: function(description){
			this.description = description;

			this.checkObjectCompletion = function (){

			}
		},
		EnemyHQ: function(durability){
			this.durability = durability;
		},
		Vector: function(positionX, positionY){
			this.x = positionX;
			this.y = positionY;

			this.equalsCoords = function (x, y){
				return this.x == x && this.y == y;
			};
			this.equals2 = function (arg){
				return this.x == arg.x && this.y == arg.y;
			};
			this.multiply = function (scalar) {
				var aux = new Tankaggedon.Vector(scalar * this.x, scalar * this.y);
				return aux;
			};
			this.sum = function (vector){
				var aux = new Tankaggedon.Vector(this.x + vector.x, this.y + vector.y);
				return aux;
			};
			this.toString = function () {
				return "(" + this.x.toString() + ", " + this.y.toString() + ")";
			};
			this.update = function (x, y) {
				var aux = new Tankaggedon.Vector(x, y);
				return aux;
			}
		}
};

