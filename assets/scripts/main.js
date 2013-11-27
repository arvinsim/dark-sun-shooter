// IMPORTANT NOTES:
// Bitmaps will not be loaded when you first add them to the stage and call stage.update(). If you continue to update the stage, eventually they will show up. Usually we would have a Ticker updating the stage each frame.

// TODOs
// * Show background <-- done
// * Show your ship <-- done
// * Move your ship, linear <-- done
// * Move your ship, angular <-- done
// * Multiple keypresses <-- done
// * Show bullets
// * Show enemy ships
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

	SPEED = 0.25,

	keysPressed = [],

	// Sprites
	yourShipSpriteSheet,
	yourShipSprite;	

stage = new createjs.Stage('dark_sun_shooter_canvas');
starscapeBackground = new createjs.Bitmap(STARSCAPEIMAGEURL);

function globalTickEventListener(event)
{
	stage.update(event);
}

function yourSpriteTickEventListener(event)
{
	var delta = event.params[0].delta,
		angleAdjustment = -90, // Our Ship Sprite starts by facing right. This angle adjustment is so that all calculations will be correct by that assumption.
		isKeyPressed = false,
		angle,
		velocityX,
		velocityY;	

	// Evalutes to true if at least one key is pressed
	if(keysPressed[KEY_LEFT_CODE] | keysPressed[KEY_UP_CODE] | keysPressed[KEY_RIGHT_CODE] | keysPressed[KEY_DOWN_CODE])
	{
		isKeyPressed = true;
		if(yourShipSprite.currentAnimation != 'move') yourShipSprite.gotoAndPlay('move');
	}
	else
	{
		if(yourShipSprite.currentAnimation != 'idle') yourShipSprite.gotoAndPlay('idle');	
	}

	if(isKeyPressed == true)
	{
		console.log(event);

		if(keysPressed[KEY_UP_CODE] & keysPressed[KEY_LEFT_CODE])
		{
			// Up Left
			//console.log('up-left');
			angle = 315;
		}
		else if(keysPressed[KEY_UP_CODE] & keysPressed[KEY_RIGHT_CODE])
		{
			// Up Right
			//console.log('up-right');
			angle = 45;
		}
		else if(keysPressed[KEY_DOWN_CODE] & keysPressed[KEY_RIGHT_CODE])
		{
			// Down Right
			//console.log('down-right');
			angle = 135;
		}
		else if(keysPressed[KEY_DOWN_CODE] & keysPressed[KEY_LEFT_CODE])
		{
			// Down Left
			//console.log('down-left');
			angle = 225;	
		}
		else if(keysPressed[KEY_LEFT_CODE])
		{
			// Left
			//console.log('left');
			angle = 270;
		}
		else if(keysPressed[KEY_UP_CODE])
		{
			// Up
			//console.log('up');
			angle = 0;
		}
		else if(keysPressed[KEY_RIGHT_CODE])
		{
			// Right
			//console.log('rightt');
			angle = 90;
		}
		else if(keysPressed[KEY_DOWN_CODE])
		{
			// Down
			//console.log('down');
			angle = 180;
		}

		yourShipSprite.rotation = angle + angleAdjustment; 

		velocityX = Math.cos((angle + angleAdjustment) * Math.PI/180) * (SPEED * delta);
		velocityY = Math.sin((angle + angleAdjustment) * Math.PI/180) * (SPEED * delta);
		
		yourShipSprite.x = yourShipSprite.x + velocityX;
	    yourShipSprite.y = yourShipSprite.y + velocityY;
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

