ig.module(
    'game.entities.dtrigger'
)
.requires(
    'plugins.joncom.box2d.entity',
    'game.entities.crate',
    'game.entities.coin',
	'plugins.joncom.box2d.game'
)
.defines(function () {

    EntityDtrigger = ig.Entity.extend({

        _wmScalable: true,
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255, 170, 66, 0.7)',

        type: ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.NEVER,
        
        init: function(x,y,settings) {
		  this.parent( x, y, settings ); 
        },

        update: function () {
            var player = ig.game.getEntitiesByType( EntityPlayer )[0];
            if (this.touches(player)){
                if (player)
              player.kill();
            }
        },
      
    });

});