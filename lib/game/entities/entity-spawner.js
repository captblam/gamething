ig.module(
    'game.entities.entity-spawner'
)
.requires(
    'plugins.joncom.box2d.entity',
    'game.entities.crate',
    'game.entities.coin',
    'game.entities.bluebox'
)
.defines(function () {

    EntityEntitySpawner = ig.Entity.extend({

        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 170, 66, 0.7)',
        TimeOut: 10,
        T_Reset:0,

        type: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        
        init: function(x,y,settings) {
          this.T_Reset = this.TimeOut; 
		  this.parent( x, y, settings ); 
        },

        update: function () {
            if (this.TimeOut <= 0){
                this.TimeOut = this.T_Reset;
                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if (player.score < 100){
                ig.game.spawnEntity(EntityCrate, this.pos.x, this.pos.y);}
                else {
                ig.game.spawnEntity(EntityBluebox, this.pos.x, this.pos.y);}
                }
            
            else {
                this.TimeOut -= ig.system.tick;
            }
        }

    });

});