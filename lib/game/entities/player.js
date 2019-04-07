ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'plugins.joncom.box2d.entity'
)
.defines(function(){
	


EntityPlayer = ig.Entity.extend({
	score: 0,
	m_crateslost: 0,
	Powered: false,
	m_type: 0,
	m_pTimer: 10,
	m_reset: 0,
	size: {x: 41, y: 69},
	offset: {x: 0, y: -2.5},

	type: ig.Entity.TYPE.A,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!

	animSheet: new ig.AnimationSheet( 'media/PISKPLAYER.png', 41, 69 ),

	flip: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.m_reset = this.m_pTimer;
		// Add the animations
		this.addAnim( 'idle', 1, [0,1] );
		this.addAnim( 'jump', 0.25, [3,4,5,6,7,8,9,8,7,6,5,4,3] );
		this.addAnim( 'moving', 0.25, [2,6]);

		if(!ig.global.wm) {
			this.body.SetFixedRotation(true);
		}
	},


	update: function() {
		
		if (this.Powered == true && this.m_pTimer <= 0){
			this.m_pTimer = this.m_reset;
			this.Powered = false;
		}
		else if (this.Powered == true) {
			this.m_pTimer -= ig.system.tick;
		}
		
		if( ig.input.state('jump') ) {
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(0,-5000), this.body.GetPosition() );
			this.currentAnim = this.anims.jump;
		}

		// move left or right
		else if( ig.input.state('left') ) {
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(-700,0), this.body.GetPosition() );
			this.flip = true;
			this.currentAnim = this.anims.moving;
		}
		else if( ig.input.state('right') ) {
			this.body.ApplyForce( new Box2D.Common.Math.b2Vec2(700,0), this.body.GetPosition() );
			this.flip = false;
			this.currentAnim = this.anims.moving;
		}
		if (this.body.GetLinearVelocity().y > 2) {
			this.currentAnim = this.anims.idle;
		}

		// shoot
		if( ig.input.pressed('shoot') ) {
			var x = this.pos.x + 12;
			var y = this.pos.y - 12;
			ig.game.spawnEntity( EntityProjectile, x, y, {flip:this.flip} );
			this.score--;
			if (this.Powered == true){
				ig.game.spawnEntity( EntityProjectile, x+9, y, {flip:this.flip} );
				ig.game.spawnEntity( EntityProjectile, x-9, y, {flip:this.flip} );
			}
			
		}

		this.currentAnim.flip.x = this.flip;
		
		

		// move!
		this.parent();
	}
});


EntityProjectile = ig.Entity.extend({
	m_Timeout: 10,
	
	size: {x: 4, y: 8},
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.NEVER, // Collision is already handled by Box2D!

	animSheet: new ig.AnimationSheet( 'media/projectile.png', 4, 8 ),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		this.addAnim( 'idle', 1, [player.m_type] );
		this.currentAnim.flip.x = settings.flip;
		this.body.ApplyImpulse( new Box2D.Common.Math.b2Vec2(0,-20), this.body.GetPosition() );
		
	},
	update: function(){
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		if (player){
			if( this.touches( player )){
				player.score++;
				this.kill();
			}
		}
		if (this.m_Timeout <=0 ){
			this.kill();
		}
		else {
			this.m_Timeout -= ig.system.tick;
		}
		this.parent();
	}
});
});