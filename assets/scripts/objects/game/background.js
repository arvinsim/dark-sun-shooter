define(["createjs"], function(createJSPlaceholder) {
	var starscapeBackground,
	STARSCAPEIMAGEURL = "assets/images/dist/backgrounds/starfield.png";

	starscapeBackground = new createjs.Bitmap(STARSCAPEIMAGEURL);

	starscapeBackground.image.onload = function()
	{
		starscapeBackground.width = 800;
    	starscapeBackground.height = 601;
	}

	return starscapeBackground;
});