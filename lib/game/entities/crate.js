ig.module(
	'game.entities.crate'
)
.requires(
	'plugins.joncom.box2d.entity',
	'game.entities.crate_top',
	'game.entities.crate_bottom',
	'game.entities.bluecoin'
)
.defines(function(){

EntityCrate = ig.Entity.extend({
	size: {x: 33, y: 32},
	m_Timer: 20,
	m_reset: 0,
	gravityFactor: 0.1,
	type: ig.Entity.TYPE.B,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/Box_gen.png', 33, 32 ),
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 1, [0,1,2,3,2,1,0] );
		this.parent( x, y, settings );
		this.m_reset = this.m_Timer;
	},
	update: function(){
		var player = ig.game.getEntitiesByType( EntityPlayer )[0];
		if (ig.game.getEntitiesByType( EntityProjectile ).length > 0)
		{
			for (i = 0; i < ig.game.getEntitiesByType( EntityProjectile ).length; i++)
			{
				var bullet = ig.game.getEntitiesByType( EntityProjectile )[i];
				
				if( this.touches( bullet ))
				{
					player.score +=10;
					if (bullet != null)
					bullet.kill();
					
					ig.game.spawnEntity( EntityCrate_top, this.pos.x, this.pos.y, {flip:this.flip} );
					ig.game.spawnEntity( EntityCrate_bottom, this.pos.x, this.pos.y, {flip:this.flip} );
					ig.game.spawnEntity (EntityCoin, this.pos.x, this.pos.y, {flip:this.flip});
					//spawn two halves and a coin
					
					this.kill();
				}
			}
		}
		for (i = 0; i < ig.game.getEntitiesByType (EntityCrate_bottom).length; i++) {
				var debris1 = ig.game.getEntitiesByType( EntityCrate_bottom )[i];
				var debris2 = ig.game.getEntitiesByType( EntityCrate_top )[i];
				if (this.touches(debris1) || this.touches(debris2)){
					ig.game.spawnEntity( EntityCrate_top, this.pos.x, this.pos.y, {flip:this.flip} );
					ig.game.spawnEntity( EntityCrate_bottom, this.pos.x, this.pos.y, {flip:this.flip} );
					ig.game.spawnEntity (EntityBluecoin, this.pos.x, this.pos.y, {flip:this.flip});
					//spawn two halves and a coin
					
					this.kill();
				}
			}
		if (this.m_Timer <= 0){
			player.m_crateslost++;
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