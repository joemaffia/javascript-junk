/*
 * jCountdown
 * Creates a countdown timer from a jQuery object. Allows you to format
 * the way the time is displayed.
 *
 * $(<selector>).countdown({params});
 *
 * If you want to replace the 
 *
 */
jQuery.fn.countdown = function(params) {
    var self = this;

    //Properties
    //----------------------------------------------            
    //set the time and day to work with
    self.display = $(this);    
    self.target = new Date(params.date);        
    self.message = params.message?params.message:"It's Here!!";
    self.addZeros = params.addZeros?params.addZeros:false;
            
    //Events
    //----------------------------------------------
    self.onStart = params.onStart?params.onStart:function() { return true; };
    self.onTick = params.onTick?params.onTick:function() { return true; };
    self.onFinish = params.onFinish?params.onFinish:function() { return true; };

    //Methods
    //----------------------------------------------   
    //return difference as soon as it start
    if (!self.onStart((self.target - new Date()))) { ; }
    
    //Updates the text for the countdown timer
    self._tick = function() {

        //get the time difference
        var now = (self.target - new Date());
        
        //make sure success hasn't been reached
        if (now.valueOf() < 0) {

            //clear the interval and run the event
            window.clearInterval(self._interval);
            if (!self.onFinish(self.display)) { return; }
            
            //display the finish message
            self.display.html(self.message);
            return;
            
        };
        
        //update the values
        var seconds = now.valueOf()/1000;        
        var day = (Math.floor(seconds/86400))%86400;
        var hrs = (Math.floor(seconds/3600))%24;
        var min = (Math.floor(seconds/60))%60;
        var sec = (Math.floor(seconds/1))%60;
                
        //check for zeros
        if (self.addZeros) {
            hrs = (hrs+"").length<2?"0"+hrs:hrs+"";
            min = (min+"").length<2?"0"+min:min+"";
            sec = (sec+"").length<2?"0"+sec:sec+"";
        };
        
        //run the event if needed
        if (!self.onTick(self.display,day,hrs,min,sec)) { return; }; 
                
        //display the new time
        self.display.html(
            day+"<span>days</span>"+
            hrs+"<span>hrs</span>"+
            min+"<span>min</span>"+
            sec+"<span>sec</span>"
            );
    };
    
    
    //Setup Routine
    //----------------------------------------------
    var id = self._interval = window.setInterval(
        self._tick,
        params.interval?params.interval:1000
        );

    //return itself
    return this;

};