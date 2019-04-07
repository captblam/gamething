ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.entity-spawner',
	'game.entities.player',
	'game.entities.crate',
	'game.levels.title2',
	'game.levels.title',
	'game.levels.end',
	'game.entities.dtrigger',
	
	'plugins.joncom.box2d.game'
)
.defines(function(){

MyTitle = ig.Game.extend({
	
		// The title image
	title: new ig.Image( 'media/title.png' ),
	gravity: 800, // All entities are affected by this
	m_Timeout: 20,
	m_main: false,
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: '#1b2026',
	
	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		
		if( ig.ua.mobile ) {
			ig.input.bindTouch( '#buttonLeft', 'left' );
			ig.input.bindTouch( '#buttonRight', 'right' );
			ig.input.bindTouch( '#buttonShoot', 'shoot' );
			ig.input.bindTouch( '#buttonJump', 'jump' );
		}
		
		// Load the LevelTest as required above ('game.level.test')
		this.loadLevel(LevelTitle2);
	},
	
	loadLevel: function( data ) {
		this.parent( data );
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].preRender = true;
		}
	},
	
	update: function() {
		// Update all entities and BackgroundMaps
		if (this.m_Timeout <= 0  && this.m_main == false){
			this.m_main = true;
			ig.system.setGame( MyGame );
		}
		else {
			this.m_Timeout -= ig.system.tick;
		}
		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/1.5;
		}
		else {
			this.loadLevel(LevelTitle2);
		}
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		//this.font.draw(ig.system.tick, 5,5);
		if( !ig.ua.mobile ) {
			this.font.draw( 'Arrow Keys, X, C', 2, 2 );
			
			this.font.draw('Score: ' + player.score, 2, 10);
			this.font.draw('Boxes Lost: ' + player.m_crateslost, 2, 18);
		}
		else {
			
			this.font.draw('Score: ' + player.score, 2, 10);
			this.font.draw('Boxes Lost: ' + player.m_crateslost, 2, 18);
		}
		
		var cx = ig.system.width/2;
		this.title.draw( cx - this.title.width/2, 20 );
	}
});

MyGame = ig.Game.extend({
	
	m_timeout: 20,
	gravity: 800, 
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: '#1b2026',
	
	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		
		if( ig.ua.mobile ) {
			ig.input.bindTouch( '#buttonLeft', 'left' );
			ig.input.bindTouch( '#buttonRight', 'right' );
			ig.input.bindTouch( '#buttonShoot', 'shoot' );
			ig.input.bindTouch( '#buttonJump', 'jump' );
		}
		
		// Load the LevelTest as required above ('game.level.test')
		this.loadLevel(LevelTitle);
	},
	
	loadLevel: function( data ) {
		this.parent( data );
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].preRender = true;
		}
	},
	
	update: function() {
		// Update all entities and BackgroundMaps
		
		
		// screen follows the player
		
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		if( player) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/1.5;
		}
		else {
			this.loadLevel(LevelTitle);
		}
		this.parent();
	},
	
	draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		//this.font.draw(ig.system.tick, 5,5);
		if( !ig.ua.mobile ) {
			this.font.draw( 'Arrow Keys, X, C', 2, 2 );
			if (player != null){
			this.font.draw('Score: ' + player.score, 2, 10);
			this.font.draw('Boxes Lost: ' + player.m_crateslost, 2, 18);}
		}
		if (player.m_crateslost > 25 && player != null){
			this.font.draw('Game Over!', 300, 108);
			this.font.draw('Score: ' + player.score, 300, 128);
			this.font.draw('Boxes Lost: ' + player.m_crateslost, 300, 148);
			this.gravity = 2000;
			if (this.m_timeout <= 0)
			ig.system.setGame( MyEnd );
			else this.m_timeout -= ig.system.tick;
		}
		else {
			this.font.draw('Score: ' + player.score, 2, 10);
			this.font.draw('Boxes Lost: ' + player.m_crateslost, 2, 18);
		}
		
	}
});

MyEnd = ig.Game.extend({
	m_score: 0,
		
	gravity: 0, 
	// The title image
	title: new ig.Image( 'media/end.png' ),
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	clearColor: '#1b2026',
	
	init: function() {
		// Bind keys
		ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
		ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
		ig.input.bind( ig.KEY.X, 'jump' );
		ig.input.bind( ig.KEY.C, 'shoot' );
		
		if( ig.ua.mobile ) {
			ig.input.bindTouch( '#buttonLeft', 'left' );
			ig.input.bindTouch( '#buttonRight', 'right' );
			ig.input.bindTouch( '#buttonShoot', 'shoot' );
			ig.input.bindTouch( '#buttonJump', 'jump' );
		}
		
		
		// Load the LevelTest as required above ('game.level.test')
		this.loadLevel(LevelEnd);
	},
	
	loadLevel: function( data ) {
		this.parent( data );
		for( var i = 0; i < this.backgroundMaps.length; i++ ) {
			this.backgroundMaps[i].preRender = true;
		}
	},
	
	update: function() {
		// Update all entities and BackgroundMaps
		
		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/1.5;
		}
	
	},
	
	draw: function() {
		// Draw all entities and BackgroundMaps
		this.parent();
		//this.font.draw(ig.system.tick, 5,5);
	
		var cx = ig.system.width/2;
		this.title.draw( cx - this.title.width/2, 20 );
	}
});


if( ig.ua.iPad ) {
	ig.Sound.enabled = false;
	ig.main('#canvas', MyTitle, 60, 640, 480, 2);
}
else if( ig.ua.mobile ) {	
	ig.Sound.enabled = false;
	ig.main('#canvas', MyTitle, 60, 640, 480, 2);
	this.font.draw('Score: ' + player.score, this.screen.width/2, this.screen.height/2);
	this.font.draw('Boxes Lost: ' + player.m_crateslost, this.screen.width/2, this.screen.height/1.5);
}
else {
	ig.main('#canvas', MyTitle, 60, 640, 480, 2);
}

});
