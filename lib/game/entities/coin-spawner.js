ig.module(
    'game.entities.coin-spawner'
)
.requires(
    'plugins.joncom.box2d.entity',
    'game.entities.coin',
    'game.entities.bluecoin',
    'game.entities.redcoin'
)
.defines(function () {

    EntityCoinSpawner = ig.Entity.extend({

        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 170, 66, 0.7)',
        TimeOut: 20,
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
                if (player.score < 100)
                ig.game.spawnEntity(EntityCoin, this.pos.x, this.pos.y);
                else if (player.score < 200)
                ig.game.spawnEntity(EntityBluecoin, this.pos.x, this.pos.y);
                else
                ig.game.spawnEntity(EntityRedcoin, this.pos.x, this.pos.y);
            }
            else {
                this.TimeOut -= ig.system.tick;
            }
        }

    });

});