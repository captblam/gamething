ig.module(
	'game.entities.crate_bottom'
)
.requires(
	'plugins.joncom.box2d.entity'
)
.defines(function(){

EntityCrate_bottom = ig.Entity.extend({
	size: {x: 33, y: 29},
	m_Timer: 8,
	m_reset: 0,
	gravityFactor: 0.1,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/Box_bottom_gen.png', 33, 29 ),
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 1, [0,1,2,3,4,5,4,3,2,1,0] );
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