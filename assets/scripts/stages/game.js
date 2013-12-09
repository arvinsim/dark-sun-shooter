define(['createjs', 'objects/game/background', 'objects/game/player_ship'], function(createJSPlaceholder, background, player_ship) {
	var stage,
		globalTickEventListener,
		mainGameScreenContainer;

	stage = new createjs.Stage('dark_sun_shooter_canvas');
	
	// Initialize containers
	mainGameScreenContainer = new createjs.Container();	

	mainGameScreenContainer.addChild(background);
	mainGameScreenContainer.addChild(player_ship);

	stage.addChild(mainGameScreenContainer);

	// Set FPS
	createjs.Ticker.setFPS(60);

	// ===============
	// LISTENERS
	// ===============
	createjs.Ticker.addEventListener('tick', function(event) {
		stage.update(event);
	});

	stage.update();
	
	return stage;
});