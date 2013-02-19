Tankaggedon.GameController = function (canvasId) {
	var self = this;

	this.model = new Tankaggedon.Game();
	this.model.init();
	this.view = new Tankaggedon.GameView(canvasId, game);
	this.modelInterval = setInterval(this.model.run, Tankaggedon.Constants.MODEL_TIME_STEP_MS);
    this.viewInterval = setInterval(this.view.draw, 1000 / Tankaggedon.Constants.FPS);
	
	this.testOperations = function () {
    	var timeOut = setTimeout(function() {
    		var tank = self.model.getScenario().getPlayerTank();
    		tank.rotateLeft();
    		tank.stop();
    	}, 1000);
        var timeOut = setTimeout(function() {
    		var tank = self.model.getScenario().getPlayerTank();
    		tank.rotateLeft();
    		tank.advance();
    		console.log("test");
    	}, 1300);

        var timeOut = setTimeout(function() {
    		clearInterval(self.modelInterval);
    		clearInterval(self.viewInterval);
    	}, 2300);
	};
};
