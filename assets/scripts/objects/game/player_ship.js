define(['createjs'], function(createJSPlacholder) {
	var playerShipSpriteSheet,
		PLAYERSHIPSPRITEIMAGES = ["assets/images/dist/player_ship/Spritesheet_64x29.png"],
		// Key codes
		KEY_LEFT_CODE = 37,
		KEY_UP_CODE = 38,
		KEY_RIGHT_CODE = 39,
		KEY_DOWN_CODE = 40,

		SPEED = 0.25,

		keysPressed = [];

	playerShipSpriteSheet = new createjs.SpriteSheet({
		//images: ["assets/images/dist/Ship/Spritesheet_64x29.png"],
		images: PLAYERSHIPSPRITEIMAGES,
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

	playerShipSprite = new createjs.Sprite(playerShipSpriteSheet, "idle");

	// Set the rotating point in the center of our image
	playerShipSprite.regX = 32;
	playerShipSprite.regY = 14;

	// ================
	// LISTENERS
	// ================
	window.onkeydown = function(event) {
		keysPressed[event.keyCode || event.which] = true
	};

	window.onkeyup = function(event) {
		delete keysPressed[event.keyCode || event.which];
	};

	playerShipSprite.addEventListener('tick', function(event) {
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
			if(playerShipSprite.currentAnimation != 'move') playerShipSprite.gotoAndPlay('move');
		}
		else
		{
			if(playerShipSprite.currentAnimation != 'idle') playerShipSprite.gotoAndPlay('idle');	
		}

		if(isKeyPressed == true)
		{
			if(keysPressed[KEY_UP_CODE] & keysPressed[KEY_LEFT_CODE])
			{
				// Up Left
				angle = 315;
			}
			else if(keysPressed[KEY_UP_CODE] & keysPressed[KEY_RIGHT_CODE])
			{
				// Up Right
				angle = 45;
			}
			else if(keysPressed[KEY_DOWN_CODE] & keysPressed[KEY_RIGHT_CODE])
			{
				// Down Right
				angle = 135;
			}
			else if(keysPressed[KEY_DOWN_CODE] & keysPressed[KEY_LEFT_CODE])
			{
				// Down Left
				angle = 225;	
			}
			else if(keysPressed[KEY_LEFT_CODE])
			{
				// Left
				angle = 270;
			}
			else if(keysPressed[KEY_UP_CODE])
			{
				// Up
				angle = 0;
			}
			else if(keysPressed[KEY_RIGHT_CODE])
			{
				// Right
				angle = 90;
			}
			else if(keysPressed[KEY_DOWN_CODE])
			{
				// Down
				angle = 180;
			}

			playerShipSprite.rotation = angle + angleAdjustment; 

			velocityX = Math.cos((angle + angleAdjustment) * Math.PI/180) * (SPEED * delta);
			velocityY = Math.sin((angle + angleAdjustment) * Math.PI/180) * (SPEED * delta);
			
			playerShipSprite.x = playerShipSprite.x + velocityX;
		    playerShipSprite.y = playerShipSprite.y + velocityY;
		}
	});

	return playerShipSprite;
});