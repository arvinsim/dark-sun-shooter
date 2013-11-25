// IMPORTANT NOTES:
// Bitmaps will not be loaded when you first add them to the stage and call stage.update(). If you continue to update the stage, eventually they will show up. Usually we would have a Ticker updating the stage each frame.

// TODOs
// * Show background <-- done
// * Show your ship <-- done
// * Show enemy ships
// * Move your ship, linear <-- done
// * Move your ship, angular
// * Multiple keypresses <-- done
// * Move enemy ships
// * Handle/Refactor global variables

var stage,
	starscapeBackground,

	// ================
	// Constants
	// ================
	// Key codes
	KEY_LEFT_CODE = 37,
	KEY_UP_CODE = 38,
	KEY_RIGHT_CODE = 39,
	KEY_DOWN_CODE = 40,

	STARSCAPEIMAGEURL = "assets/images/dist/backgrounds/starfield.png",	
	/*
	YOURSHIPSPRITEIMAGES = [
		"assets/images/dist/player_ship/f1.png",
		"assets/images/dist/player_ship/f2.png",
		"assets/images/dist/player_ship/f3.png",
		"assets/images/dist/player_ship/f4.png"
	],
	*/
	YOURSHIPSPRITEIMAGES = ["assets/images/dist/player_ship/Spritesheet_64x29.png"],

	SPEED = 4,

	keysPressed = [],

	// Sprites
	yourShipSpriteSheet,
	yourShipSprite;	

stage = new createjs.Stage('dark_sun_shooter_canvas');
starscapeBackground = new createjs.Bitmap(STARSCAPEIMAGEURL);

function globalTickEventListener(elapsedTime)
{
	stage.update();
}

function yourSpriteTickEventListener(elapsedTime)
{
	// Evalutes to true if at least one key is pressed
	if(keysPressed[KEY_LEFT_CODE] | keysPressed[KEY_UP_CODE] | keysPressed[KEY_RIGHT_CODE] | keysPressed[KEY_DOWN_CODE])
	{
		if(yourShipSprite.currentAnimation != 'move') yourShipSprite.gotoAndPlay('move');
	}
	else
	{
		if(yourShipSprite.currentAnimation != 'idle') yourShipSprite.gotoAndPlay('idle');	
	}

	if(keysPressed[KEY_LEFT_CODE] === true)
	{
		yourShipSprite.rotation = 270 + (-90);
		yourShipSprite.x -= SPEED;
	}

	if(keysPressed[KEY_UP_CODE] === true)
	{
		yourShipSprite.rotation = 0 + (-90);
		yourShipSprite.y -= SPEED;
	}

	if(keysPressed[KEY_RIGHT_CODE] === true)
	{
		yourShipSprite.rotation = 90 + (-90);
		yourShipSprite.x += SPEED;
	}

	if(keysPressed[KEY_DOWN_CODE] === true)
	{
		yourShipSprite.rotation = 180 + (-90);
		yourShipSprite.y += SPEED;
	}
}

function init()
{
	"use strict";

	starscapeBackground.image.onload = function()
	{
		starscapeBackground.width = 800;
    	starscapeBackground.height = 601;
	}

	yourShipSpriteSheet = new createjs.SpriteSheet({
		//images: ["assets/images/dist/Ship/Spritesheet_64x29.png"],
		images: YOURSHIPSPRITEIMAGES,
	    frames: {
	    	width: 64,
	    	height: 29,
	    	count: 4
	    },
	    animations: {
	    	idle: {
	    		frames: [0]
	    	},
	    	move: {
	    		frames: [0,1,2,3],
	    		speed: 0.25
	    	}
	   	}
	});
	yourShipSprite = new createjs.Sprite(yourShipSpriteSheet, "idle");

	// Set the rotating point in the center of our image
	yourShipSprite.regX = 32;
	yourShipSprite.regY = 14;

	// Initialize containers
	var mainGameScreenContainer = new createjs.Container();	

	mainGameScreenContainer.addChild(starscapeBackground);
	mainGameScreenContainer.addChild(yourShipSprite);

	stage.addChild(mainGameScreenContainer);

	stage.update();

	// Set FPS
	createjs.Ticker.setFPS(60);

	// Event Listeners
	createjs.Ticker.addEventListener('tick', globalTickEventListener);
	yourShipSprite.addEventListener('tick', yourSpriteTickEventListener);	
}

// Initialize
window.addEventListener('DOMContentLoaded', init);

window.onkeydown = function(event) {
	keysPressed[event.keyCode || event.which] = true
};

window.onkeyup = function(event) {
	delete keysPressed[event.keyCode || event.which];
};

