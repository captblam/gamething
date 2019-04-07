ig.module(
	'game.entities.bluecoin'
)
.requires(
	'plugins.joncom.box2d.entity'
)
.defines(function(){

EntityBluecoin = ig.Entity.extend({
	size: {x: 36, y: 36},
    m_Timer: 20,
    m_reset: 0,
    m_active: false,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NEVER,
	
	animSheet: new ig.AnimationSheet( 'media/coin_blue.png', 36, 36 ),
	
	init: function( x, y, settings ) {
		this.addAnim( 'idle', 0.3, [0,1,2] );
		this.parent( x, y, settings );
        this.m_reset = this.m_Timer;
	},
    
    update: function(){
        var player = ig.game.getEntitiesByType( EntityPlayer )[0];
        
        if (this.m_active == true){
            this.m_active = false;
            this.m_Timer = this.m_reset;
            this.kill();
        }
		else if (this.m_Timer <= 0){
            this.m_Timer = this.m_reset;
            this.kill();
        }
        else {
            this.m_Timer -= ig.system.tick;
        }
        
        if( this.touches( player ) && player != null){
            player.score +=20;
            player.m_type = 3;
            player.Powered = true;
            this.m_active = true;
        }
        
        
        
        this.parent();
    }
});


});