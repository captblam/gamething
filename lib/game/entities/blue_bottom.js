ig.module(
	'game.entities.blue_bottom'
)
.requires(
	'plugins.joncom.box2d.entity'
)
.defines(function(){

EntityBlue_bottom = ig.Entity.extend({
	size: {x: 32, y: 25},
	m_Timer: 8,
	m_reset: 0,
	gravityFactor: 0.1,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/Blue_bottom.png', 32, 25 ),
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 0.3, [0,1,2,3,2,1,0] );
		this.parent( x, y, settings );
		this.m_reset = this.m_Timer;
        this.body.ApplyImpulse( new Box2D.Common.Math.b2Vec2(Math.floor((Math.random()*100)+1),-200), this.body.GetPosition() );
	},
	update: function(){
		
		if (this.m_Timer <= 0){
			this.m_Timer = this.m_reset;
			this.kill();
		}
		else {
			this.m_Timer -= ig.system.tick;
		}
		this.parent();
	}
});


});