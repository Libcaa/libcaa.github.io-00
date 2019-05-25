const Engine = function(time_step, update, render) {

  this.accumulated_time        = 0;// za jakou dobu bude zavolán update
  this.animation_frame_request = undefined,// odkazuje na AFR
  this.time                    = undefined,// The most recent timestamp of loop execution.
  this.time_step               = time_step,// 1000/30, jsou snímky za sekundu (kolik snímků bude hra mít)
  
  this.updated = false;// proměnná zda byla funkce update volána v posdlením cyklu
  
  this.update = update;// funkce update
  this.render = render;// funkce render
  
  this.run = function(time_stamp) { //jeden cyklus herní scény
    
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
  
    this.accumulated_time += time_stamp - this.time;
    this.time = time_stamp;
  
    if (this.accumulated_time >= this.time_step * 3) {
  
      this.accumulated_time = this.time_step;
  
    }
  
    while(this.accumulated_time >= this.time_step) {
  
      this.accumulated_time -= this.time_step;
  
      this.update(time_stamp);
  
      this.updated = true;// znovu vykreslí hru
  
    }
  
    /* This allows us to only draw when the game has updated. */
    if (this.updated) {
  
      this.updated = false;
      this.render(time_stamp);
  
    }
  
  };
  
  this.handleRun = (time_step) => { this.run(time_step); };
  
  };
  
  Engine.prototype = {
  
  constructor:Engine,
  
  start:function() {
  
    this.accumulated_time = this.time_step;
    this.time = window.performance.now();
    this.animation_frame_request = window.requestAnimationFrame(this.handleRun);
  
  },
  
  stop:function() { window.cancelAnimationFrame(this.animation_frame_request); }
  
  };