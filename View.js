Tankaggedon.Constants.FPS = 50;
Tankaggedon.Constants.IMAGE_TANK = "tank.png";

Tankaggedon.TankView = function (tankModel) {
	var self = this;
	this.model = tankModel;

	this.draw = function (context) {
		var tankImage  = new Image();
		tankImage.onload = function () {
			context.drawImage(this,self.model.getPosition().getX(), self.model.getPosition().getY());
		};
		tankImage.src = Tankaggedon.Constants.IMAGE_TANK;
	};
};

Tankaggedon.GameView = function (canvasId, gameModel) {
	var self = this;
	this.model = gameModel;
	this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.subViews = [new Tankaggedon.TankView(this.model.getPlayerTank())];

	this.draw = function () {
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
		for (var i = 0; i < this.subViews.length; ++i) {
			this.subViews[i].draw(self.context);
		}
	};
};



