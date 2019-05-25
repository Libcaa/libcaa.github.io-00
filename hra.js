const Game = function() {

  /* Vlatní objekt pro world */
  this.world = new Game.World();

  /* Funkce update */
  this.update = function() {

  this.world.update();
  };
};

Game.prototype = { 
  constructor : Game 
};

Game.Animator = function(frame_set, delay) {

  this.count       = 0;
  this.delay       = (delay >= 1) ? delay : 1;
  this.frame_set   = frame_set;
  this.frame_index = 0;
  this.frame_value = frame_set[0];
  this.mode        = "pause";
 
 };

 Game.Animator.prototype = {

  constructor:Game.Animator,
 
  animate:function() {
 
    switch(this.mode) {
 
      case "loop" : this.loop(); break;
      case "pause":              break;
 
    }
 
  },

  
 changeFrameSet(frame_set, mode, delay = 10, frame_index = 0) {

  if (this.frame_set === frame_set) { return; }

  this.count       = 0;
  this.delay       = delay;
  this.frame_set   = frame_set;
  this.frame_index = frame_index;
  this.frame_value = frame_set[frame_index];
  this.mode        = mode;

},

loop:function() {

  this.count ++;

  while(this.count > this.delay) {

    this.count -= this.delay;

    this.frame_index = (this.frame_index < this.frame_set.length - 1) ? this.frame_index + 1 : 0;

    this.frame_value = this.frame_set[this.frame_index];

  }

}
 };
 
/*Game.World = function(friction = 0.9, gravity = 3.5) {

  this.collider = new Game.World.Collider();

  this.friction = friction; rychlost pohybu (vytvoření tření ve hře, pohyb se nezastaví hned ale pokračuje a postupně spomaluje
  this.gravity  = gravity;  gravitace


  /*Zde je napsané, jak se má mapa vykreslit, pomocí TILE MAPY
  this.columns   = 12; // počet čtverců v řádku
  this.rows      = 8; // počet čtverců v sloupci

  this.tile_set = new Game.World.TileSet(8, 16);
  this.player   = new Game.World.Object.Player(100, 100);

///////////////////////////////////////////////////////////////////////

this.map = [26,24,18,18,18,18,18,18,18,18,24,26,
            11,25,25,25,25,25,25,25,25,25,25,17,
            11,25,25,25,25,25,25,25,25,25,25,25,
            11,25,25,25,25,25,25,25,25,25,25,25,
            11,25,25,25,25,25,25,25,25,25,25,25,
            18,06,06,06,06,02,15,03,25,27,25,01,
            25,25,25,25,25,09,26,11,41,41,41,09,
            42,42,42,42,42,09,26,26,02,02,02,26]; 

this.collision_map = [00,04,04,04,00,00,04,04,04,04,04,00,
                      06,00,00,00,12,06,00,00,00,00,00,12,
                      06,00,00,00,00,00,00,00,00,00,00,00,
                      06,00,00,00,00,00,00,00,00,00,00,00,
                      06,00,00,00,00,00,00,00,00,00,00,00,
                      08,05,05,05,05,05,05,05,00,02,00,09,
                      08,02,02,02,02,01,00,03,02,02,02,00,
                      00,00,00,00,00,00,00,00,00,00,00,00];*/

///////////////////////////////////////////////////////////////////////              

/*this.map = [26,26,18,24,18,18,24,18,18,18,26,26,
              26,19,25,25,25,25,25,25,25,25,17,26,
              19,25,25,25,25,25,25,25,25,25,25,17,
              25,25,25,25,25,25,25,25,25,25,25,25,
              25,25,25,25,25,25,27,25,25,25,25,25,
              03,25,27,25,27,25,25,25,25,27,25,01,
              16,41,41,41,41,41,41,41,41,41,41,23,
              26,02,02,02,02,02,02,02,02,15,02,26]; 

this.collision_map = [00,00,04,04,04,04,04,04,04,12,00,00,
                      00,06,00,00,00,00,00,00,00,00,12,00,
                      06,00,00,00,00,00,00,00,00,00,00,12,
                      00,00,00,00,00,00,00,00,00,00,00,00,
                      00,00,00,00,00,00,02,00,00,00,00,00,
                      08,00,02,00,02,00,00,00,00,02,00,09,
                      00,02,02,02,02,02,02,02,02,02,02,09,
                      00,00,00,00,00,00,00,00,00,00,00,00];*/
              

///////////////////////////////////////////////////////////////////////              

/*this.map = [26,26,18,24,18,18,24,18,18,18,26,26,
                26,19,25,25,25,25,25,25,25,25,17,26,
                19,25,25,25,25,25,25,25,25,25,25,23,
                25,25,25,25,25,25,25,25,25,25,25,09,
                25,25,25,25,25,25,25,25,25,25,25,09,
                03,25,27,25,25,25,25,27,25,25,27,09,
                16,41,41,41,08,25,08,41,41,41,41,09,
                26,02,02,02,02,25,02,02,02,15,02,26];

this.collision_map = [00,00,04,04,04,04,04,04,04,12,00,00,
                      00,06,00,00,00,00,00,00,00,00,12,00,
                      06,00,00,00,00,00,00,00,00,00,00,12,
                      00,00,00,00,00,00,00,00,00,00,00,01,
                      00,00,00,00,00,00,00,00,00,00,00,01,
                      08,00,02,00,00,00,00,02,00,00,02,01,
                      00,02,02,02,15,00,15,02,02,02,02,01,
                      00,00,00,00,00,00,00,00,00,00,00,00]; */

                

///////////////////////////////////////////////////////////////////////                

/*this.map = [26,26,18,24,08,25,08,18,18,18,26,26,
            26,19,25,25,25,25,25,25,25,25,17,26,
            11,25,25,25,25,25,25,25,25,25,25,23,
            11,25,25,25,25,25,25,25,25,25,25,09,
            11,25,25,25,25,25,25,25,25,25,25,09,
            11,25,27,25,25,25,25,27,25,25,27,09,
            11,41,41,41,08,25,08,41,41,41,41,09,
            26,02,02,02,02,25,02,02,02,15,02,26];
                
this.collision_map = [00,04,04,04,00,00,04,04,04,04,04,00,
                      06,00,00,00,12,06,00,00,00,00,00,12,
                      06,00,00,00,00,00,00,00,00,00,00,00,
                      00,00,00,00,00,00,00,00,00,00,00,09,
                      00,00,00,00,00,00,00,00,00,02,00,01,
                      08,00,02,00,00,09,02,08,00,00,00,01,
                      08,02,02,02,02,01,00,03,02,02,02,01,
                      00,00,00,00,00,00,00,00,00,00,00,00];*/ 
                
///////////////////////////////////////////////////////////////////////                

/*this.map = [26,24,18,18,26,26,18,18,18,18,24,26,
            11,25,25,25,17,19,25,25,25,25,25,17,
            19,25,25,25,25,25,25,25,25,25,25,25,
            25,25,25,25,25,25,25,25,25,25,25,01,
            25,25,25,25,25,25,25,25,25,27,25,09,
            03,25,27,25,25,01,15,03,25,25,25,09,
            11,41,41,41,41,09,26,11,41,41,41,09,
            26,02,02,02,02,26,26,26,02,02,02,26];
           
this.collision_map = [00,04,04,04,00,00,04,04,04,04,04,00,
                      06,00,00,00,12,06,00,00,00,00,00,12,
                      06,00,00,00,00,00,00,00,00,00,00,00,
                      00,00,00,00,00,00,00,00,00,00,00,09,
                      00,00,00,00,00,00,00,00,00,02,00,01,
                      08,00,02,00,00,09,02,08,00,00,00,01,
                      08,02,02,02,02,01,00,03,02,02,02,01,
                      00,00,00,00,00,00,00,00,00,00,00,00]; */          

///////////////////////////////////////////////////////////////////////            

/*this.map = [26,24,18,18,18,18,18,18,18,18,24,26,
            19,25,25,25,25,25,25,25,25,25,25,25,
            25,25,25,25,25,25,25,25,25,25,08,09,
            03,25,25,25,25,25,25,25,25,25,25,09,
            11,25,27,25,25,25,25,25,25,27,25,09,
            11,25,25,25,05,15,07,25,25,25,27,09,
            11,41,41,41,41,12,41,41,41,41,41,09,
            26,02,15,02,02,26,02,02,02,15,02,26];

this.collision_map = [00,04,04,04,04,04,04,04,04,04,04,00,
                      06,00,00,00,00,00,00,00,00,00,00,00,
                      00,00,00,00,00,00,00,00,00,00,15,02,
                      08,00,00,00,00,00,00,00,00,00,00,01,
                      03,00,02,00,00,00,00,00,00,02,00,01,
                      03,00,00,00,13,02,07,00,00,00,02,01,
                      00,02,02,02,00,05,00,02,02,02,02,01,
                      00,00,00,00,00,00,00,00,00,00,00,00];*/

///////////////////////////////////////////////////////////////////////            

/*this.map = [26,24,18,18,18,18,18,18,18,18,24,18,
            11,25,25,25,25,25,25,25,25,25,25,25,
            11,25,05,06,07,25,05,06,07,25,05,02,
            16,25,25,25,25,25,25,25,25,25,25,09,
            26,06,06,06,06,06,06,06,06,07,25,09,
            19,25,25,25,25,25,25,25,25,25,27,23,
            25,25,25,25,27,27,25,25,25,25,25,09,
            02,02,03,41,41,41,41,01,02,15,02,26];

this.collision_map = [00,04,04,04,04,04,04,04,04,04,04,00,
                      03,00,00,00,00,00,00,00,00,00,00,00,
                      03,00,13,05,07,00,13,05,07,00,15,02,
                      03,00,00,00,00,00,00,00,02,00,00,01,
                      03,05,05,05,05,05,05,05,05,07,00,01,
                      04,00,00,00,00,00,00,00,00,00,02,01,
                      00,00,00,00,02,02,00,00,00,00,00,01,
                      02,02,02,02,02,02,02,02,02,02,02,00]; */        

///////////////////////////////////////////////////////////////////////            

/*this.map = [26,26,26,18,18,18,18,18,18,18,24,26,
            26,26,19,25,25,25,25,25,25,25,25,25,
            26,19,25,25,25,25,25,25,25,25,08,09,
            11,25,25,25,25,25,25,25,27,25,25,09,
            11,25,25,25,25,25,25,27,25,25,25,09,
            19,25,25,25,25,27,25,25,25,25,25,09,
            25,25,25,27,25,25,25,25,25,25,25,09,
            02,03,08,41,41,41,41,41,41,41,41,09];

this.collision_map = [00,00,00,02,04,04,04,04,04,04,04,00,
                      00,00,06,00,00,00,00,00,00,00,00,00,
                      03,06,00,00,00,00,00,00,00,00,15,02,
                      03,00,00,00,00,00,00,00,02,00,00,01,
                      03,00,00,00,00,00,00,02,00,00,00,01,
                      04,00,00,00,00,02,00,00,00,00,00,12,
                      00,00,00,02,00,00,00,00,00,00,00,01,
                      02,02,02,02,02,02,02,02,02,02,02,02];*/
    

///////////////////////////////////////////////////////////////////////

/*this.map = [26,26,18,18,24,18,18,18,18,24,26,26,
            26,19,08,25,25,25,25,25,25,25,17,26,
            11,25,25,25,25,25,25,25,25,25,08,23,
            16,25,25,25,25,25,25,25,25,25,25,09,
            11,25,25,25,04,41,41,04,25,25,25,23,
            19,25,27,25,17,02,02,19,25,27,25,17,
            25,25,25,25,25,09,11,25,25,25,25,25,
            02,02,15,02,02,26,26,02,02,15,02,02];
            
this.collision_map = [00,04,04,04,04,04,04,04,04,04,04,00,
                      03,06,15,00,00,00,00,00,00,00,12,01,
                      03,00,00,00,00,00,00,00,00,00,15,01,
                      03,00,00,00,00,00,00,00,00,00,00,01,
                      03,00,00,00,11,02,02,11,00,00,00,01,
                      04,00,02,00,12,02,02,06,00,02,00,12,
                      00,00,00,00,00,01,03,00,00,00,00,00,
                      02,02,02,02,02,00,00,02,02,02,02,02];*/

///////////////////////////////////////////////////////////////////////

/*this.map = [26,24,24,24,24,24,24,24,24,24,24,26,
            16,25,25,25,25,25,25,25,25,25,25,23,
            16,25,13,14,06,06,06,06,06,03,25,23,
            16,25,21,22,25,25,25,25,25,12,27,23,
            16,25,25,25,25,27,27,27,27,12,25,23,
            18,06,06,06,06,06,06,06,06,19,27,23,
            25,25,25,25,25,25,25,25,25,25,25,23,
            02,15,15,15,15,15,15,15,15,15,15,26];

this.collision_map = [00,04,04,04,04,04,04,04,04,04,04,00,
                      03,00,00,00,00,00,00,00,00,00,00,01,
                      03,00,09,08,05,05,05,05,05,08,00,01,
                      03,00,12,06,00,00,00,00,00,10,02,01,
                      03,00,00,00,00,02,02,02,02,10,00,01,
                      04,05,05,05,05,05,05,05,05,06,02,01,
                      00,00,00,00,00,00,00,00,00,00,00,01,
                      02,02,02,02,02,02,02,02,02,02,02,00];*/

  /* Udává výšku a šířku herní scény */


Game.Collider = function() {

  /* This is the function routing method. Basically, you know what the tile looks like
  from its value. You know which object you want to collide with, and you know the
  x and y position of the tile as well as its dimensions. This function just decides
  which collision functions to use based on the value and allows you to tweak the
  other values to fit the specific tile shape. */
  this.collide = function(value, object, tile_x, tile_y, tile_size) {

    switch(value) { //switch pro vybrání hodnoty 

      //Zde jsou všechny typy colliderů, které jsou u čtverce možné a ve hře jsem je využil
      case  1: this.collidePlatformLeft(object, tile_x); break;

      case  2: this.collidePlatformTop(object, tile_y); break;

      case  3: this.collidePlatformRight(object, tile_x + tile_size); break;
      
      case  4: this.collidePlatformBottom(object, tile_y + tile_size); break;

      case  5: if (this.collidePlatformTop(object, tile_y)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;
               
      case  6: if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;

      case  7: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformRight(object, tile_x + tile_size)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;

      case  8: if (this.collidePlatformTop(object, tile_y)) return;
               this.collidePlatformRight(object, tile_x + tile_size); break; 
      
      case  9: if (this.collidePlatformTop(object, tile_y)) return;
               this.collidePlatformLeft(object, tile_x); break;

      case 10: if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformRight(object, tile_x + tile_size); break;

      case 11: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformRight(object, tile_x + tile_size); break;

      case 12: if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;

      case 13: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformLeft(object, tile_x)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;

      case 14: if (this.collidePlatformLeft(object, tile_x)) return;
               if (this.collidePlatformRight(object, tile_x)) return;
               this.collidePlatformBottom(object, tile_y + tile_size); break;

      case 15: if (this.collidePlatformTop(object, tile_y)) return;
               if (this.collidePlatformLeft(object, tile_x)) return;
               if (this.collidePlatformRight(object, tile_x + tile_size)) return;
              this.collidePlatformBottom(object, tile_y + tile_size); break;
    }
  }
};

Game.Collider.prototype = {

  constructor: Game.Collider,

  /* This will resolve a collision (if any) between an object and the y location of
  some tile's bottom. All of these functions are pretty much the same, just adjusted
  for different sides of a tile and different trajectories of the object. */
  collidePlatformBottom:function(object, tile_bottom) {

    /* If the top of the object is above the bottom of the tile and on the previous
    frame the top of the object was below the bottom of the tile, we have entered into
    this tile. Pretty simple stuff. */
    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {

      object.setTop(tile_bottom);// Move the top of the object to the bottom of the tile.
      object.velocity_y = 0;     // Stop moving in that direction.
      return true;               // Return true because there was a collision.

    } return false;              // Return false if there was no collision.
  },

  collidePlatformLeft:function(object, tile_left) {

    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

      object.setRight(tile_left - 0.01);// -0.01 is to fix a small problem with rounding
      object.velocity_x = 0;
      return true;

    } return false;
  },

  collidePlatformRight:function(object, tile_right) {

    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {

      object.setLeft(tile_right);
      object.velocity_x = 0;
      return true;

    } return false;
  },

  collidePlatformTop:function(object, tile_top) {

    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {

      object.setBottom(tile_top - 0.01);
      object.velocity_y = 0;
      object.jumping    = false;
      return true;

    } return false;
  }
 };

 Game.Frame = function(x, y, width, height, offset_x, offset_y) {

  this.x        = x;
  this.y        = y;
  this.width    = width;
  this.height   = height;
  this.offset_x = offset_x;
  this.offset_y = offset_y;

};


/* The object class is just a basic rectangle with a bunch of prototype functions
to help us work with positioning this rectangle. */
Game.Object = function(x, y, width, height) {

 this.height = height;
 this.width  = width;
 this.x = x;
 this.y = y;
};

Game.Object.prototype = {

  constructor:Game.Object,

  /* These functions are used to get and set the different side positions of the object. */

  getBottom : function()  { return this.y + this.height;       },
  getCenterX: function()  { return this.x + this.width  * 0.5; },
  getCenterY: function()  { return this.y + this.height * 0.5; },
  getLeft   : function()  { return this.x;                     },
  getRight  : function()  { return this.x + this.width;        },
  getTop    : function()  { return this.y;                     },
  setBottom : function(y) { this.y = y - this.height;          },
  setCenterX: function(x) { this.x = x - this.width  * 0.5;    },
  setCenterY: function(y) { this.y = y - this.height * 0.5;    },
  setLeft   : function(x) { this.x = x;                        },
  setRight  : function(x) { this.x = x - this.width;           },
  setTop    : function(y) { this.y = y;                        }

};

Game.MovingObject = function(x, y, width, height, velocity_max = 15) {

  Game.Object.call(this, x, y, width, height);

  this.jumping      = false;
  this.velocity_max = velocity_max;// added velocity_max so velocity can't go past 16
  this.velocity_x   = 0;
  this.velocity_y   = 0;
  this.x_old        = x;
  this.y_old        = y;

};


/* I added setCenterX, setCenterY, getCenterX, and getCenterY */
Game.MovingObject.prototype = {

  getOldBottom : function()  { return this.y_old + this.height;       },
  getOldCenterX: function()  { return this.x_old + this.width  * 0.5; },
  getOldCenterY: function()  { return this.y_old + this.height * 0.5; },
  getOldLeft   : function()  { return this.x_old;                     },
  getOldRight  : function()  { return this.x_old + this.width;        },
  getOldTop    : function()  { return this.y_old;                     },
  setOldBottom : function(y) { this.y_old = y    - this.height;       },
  setOldCenterX: function(x) { this.x_old = x    - this.width  * 0.5; },
  setOldCenterY: function(y) { this.y_old = y    - this.height * 0.5; },
  setOldLeft   : function(x) { this.x_old = x;                        },
  setOldRight  : function(x) { this.x_old = x    - this.width;        },
  setOldTop    : function(y) { this.y_old = y;                        }

};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;

Game.Door = function(door) {

  Game.Object.call(this, door.x, door.y, door.width, door.height);
 
  this.destination_x    = door.destination_x;
  this.destination_y    = door.destination_y;
  this.destination_zone = door.destination_zone;
 
 };
 Game.Door.prototype = {
 
  /* Tests for collision between this door object and a MovingObject. */
  collideObject(object) {
 
    let center_x = object.getCenterX();
    let center_y = object.getCenterY();
 
    if (center_x < this.getLeft() || center_x > this.getRight() ||
        center_y < this.getTop()  || center_y > this.getBottom()) return false;
 
    return true;
 
  }
 
 };

Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;

Game.Player = function(x, y) {

  Game.MovingObject.call(this, x, y, 7, 12);
  Game.Animator.call(this, Game.Player.prototype.frame_sets["idle-left"], 10);

  this.jumping     = true;
  this.direction_x = -1;
  this.velocity_x  = 0;
  this.velocity_y  = 0;

};


Game.Player.prototype = {

  /* The values in these arrays correspond to the TileSet.Frame objects in the tile_set.
  They are just hardcoded in here now, but when the tileset information is eventually
  loaded from a json file, this will be allocated dynamically in some sort of loading function. */
  frame_sets: { 
    "idle-left" : [0],
    "jump-left" : [1],
    "move-left" : [2, 3, 4, 5],
    "idle-right": [6],
    "jump-right": [7],
    "move-right": [8, 9, 10, 11],

   
    

  },

  jump: function() {

    if (!this.jumping && this.velocity_y < 10) {

      this.jumping     = true;
      this.velocity_y -= 13;

    }

  },

  moveLeft: function() {

    this.direction_x = -1;// Make sure to set the player's direction.
    this.velocity_x -= 0.45;

  },

  moveRight:function(frame_set) {

    this.direction_x = 1;
    this.velocity_x += 0.45;

  },

  /*Animace je vlatně pohybem hráče, proto je přidána funkce update,
  aby když se hráč dotkne se světem a s collidrama, tak aby se animace pausnula,
  a nebo byla zavolána po doteku s herním světem. */

  updateAnimation:function() {

  if (this.velocity_y < 0) {

      if (this.direction_x < 0) this.changeFrameSet(this.frame_sets["jump-left"], "pause");
      else this.changeFrameSet(this.frame_sets["jump-right"], "pause");

    } else if (this.direction_x < 0) {

      if (this.velocity_x < -0.1) this.changeFrameSet(this.frame_sets["move-left"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-left"], "pause");

    } else if (this.direction_x > 0) {

      if (this.velocity_x > 0.1) this.changeFrameSet(this.frame_sets["move-right"], "loop", 5);
      else this.changeFrameSet(this.frame_sets["idle-right"], "pause");

    }

    this.animate();
  },

  /* 
  Další update funkce, která bere gravitaci a friction jako parametr,
  proto player class ví, co s  nimi má dělat.*/
  updatePosition:function(gravity, friction) {

    this.x_old = this.x;
    this.y_old = this.y;

    this.velocity_y += gravity;

    this.velocity_x *= friction;

    if (Math.abs(this.velocity_x) > this.velocity_max)
    this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
    this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x    += this.velocity_x;
    this.y    += this.velocity_y;
  }

};

/* Dvojité prototypové dědictví z Object a Animator. */
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Object.assign(Game.Player.prototype, Game.Animator.prototype);
Game.Player.prototype.constructor = Game.Player;

/*Tilesheet class byla převzána z Dsiplay.js a přejmenována na TileSet
It does all the same stuff, but it doesn't have an image reference and it also
defines specific regions in the tile set image that correspond to the player's sprite
animation frames. Later, this will all be set in a level loading function just in case
I want to add functionality to add in another tile sheet graphic with different terrain. */
Game.TileSet = function(columns, tile_size) {

  this.columns    = columns;
  this.tile_size  = tile_size;

  let f = Game.Frame;

  /* Aniamce pohybu, získávání animace z tilemapy, -2 je naszavená, z důvodu posunutí postavy trochu nahoru, aby nechodila v zemi ale lehce nad zemí */
  this.frames = [new f(114/*x v tilemapě*/,  48/*y v tilemapě*/, 13/*velikost 1 obdélníku v px(osa x)*/, 16/*velikost 1 obdélníku v px(osa y)*/, 0/*prodleva mezi obrázky*/, -2/*odsazení nad zemí*/), // základní obrázek pro chůzi doleva, (pokaždé když skončí animace, tak se zobrazí tento obrázek, nastavené na řádku 529, hodnotou 0)
                 new f( 50,  48, 13, 16, 0, -2), // skok doleva
                 new f(101,  48, 13, 16, 0, -2), new f(88, 48, 13, 16, 0, -2), new f(75, 48, 13, 16, 0, -2), new f(62, 48, 13, 16, 0, -2), // animace chůze doleva, hodnoty v px, obrázky z tilemapy
                 new f(  0, 64, 13, 16, 0, -2), // základní obrázek pro chůzi doprava
                 new f( 65, 64, 13, 16, 0, -2), // skok doprava
                 new f( 13, 64, 13, 16, 0, -2), new f(26, 64, 13, 16, 0, -2), new f(39, 64, 13, 16, 0, -2), new f(52, 64, 13, 16, 0, -2) // chůze doprava
                ];

};

Game.TileSet.prototype = { 
  constructor: Game.TileSet 
};

/* The Frame class just defines a region in a tilesheet to cut out. It's a rectangle.
It has an x and y offset used for drawing the cut out sprite image to the screen,
which allows sprites to be positioned anywhere in the tile sheet image rather than
being forced to adhere to a grid like tile graphics. This is more natural because
sprites often fluctuate in size and won't always fit in a 16x16 grid. */
Game.World = function(friction = 0.85, gravity = 2) {

  this.collider  = new Game.Collider();

  this.friction  = friction;
  this.gravity   = gravity;

  this.columns   = 12;
  this.rows      = 9;

  this.tile_set  = new Game.TileSet(8, 16);
  this.player    = new Game.Player(32, 76);

  this.zone_id   = "00";// The current zone.

  this.doors     = [];// The array of doors in the level.
  this.door      = undefined; // If the player enters a door, the game will set this property to that door and the level will be loaded.

  this.height    = this.tile_set.tile_size * this.rows;
  this.width     = this.tile_set.tile_size * this.columns;

};
Game.World.prototype = {

  constructor: Game.World,

  collideObject:function(object) {

    /* I got rid of the world boundary collision. Now it's up to the tiles to keep
    the player from falling out of the world. */

    var bottom, left, right, top, value;

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

  },

  /* The setup function takes a zone object generated from a zoneXX.json file. It
  sets all the world values to values of zone. If the player just passed through a
  door, it uses the this.door variable to change the player's location to wherever
  that door's destination goes. */
  setup:function(zone) {

    /* Get the new tile maps, the new zone, and reset the doors array. */
    this.graphical_map      = zone.graphical_map;
    this.collision_map      = zone.collision_map;
    this.columns            = zone.columns;
    this.rows               = zone.rows;
    this.doors              = new Array();
    this.zone_id            = zone.id;

    /* Generate new doors. */
    for (let index = zone.doors.length - 1; index > -1; -- index) {

      let door = zone.doors[index];
      this.doors[index] = new Game.Door(door);

    }

    /* If the player entered into a door, this.door will reference that door. Here
    it will be used to set the player's location to the door's destination. */
    if (this.door) {

      /* if a destination is equal to -1, that means it won't be used. Since each zone
      spans from 0 to its width and height, any negative number would be invalid. If
      a door's destination is -1, the player will keep his current position for that axis. */
      if (this.door.destination_x != -1) {

        this.player.setCenterX   (this.door.destination_x);
        this.player.setOldCenterX(this.door.destination_x);// It's important to reset the old position as well.

      }

      if (this.door.destination_y != -1) {

        this.player.setCenterY   (this.door.destination_y);
        this.player.setOldCenterY(this.door.destination_y);

      }

      this.door = undefined;// Make sure to reset this.door so we don't trigger a zone load.

    }

  },

  update:function() {

    this.player.updatePosition(this.gravity, this.friction);

    this.collideObject(this.player);

    /* Here we loop through all the doors in the current zone and check to see
    if the player is colliding with any. If he does collide with one, we set the
    world's door variable equal to that door, so we know to use it to load the next zone. */
    for(let index = this.doors.length - 1; index > -1; -- index) {

      let door = this.doors[index];

      if (door.collideObject(this.player)) {

        this.door = door;

      };

    }

    this.player.updateAnimation();

  }

};