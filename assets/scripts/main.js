require.config({
	baseUrl: "assets/scripts/",
	paths: {
		"createjs": "http://code.createjs.com/createjs-2013.09.25.min"
	}
});

require(['stages/game'],function(game) {
});
