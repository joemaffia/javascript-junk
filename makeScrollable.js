//make item scrollable on mouseover
function makeScrollable(wrapper, scrollable){
    // Get jQuery elements
    var wrapper = $(wrapper), scrollable = $(scrollable);
    // height of area at the top at bottom, that don't respond to mousemove
    var inactiveMargin = 20;
    // Cache for performance
    var wrapperWidth = wrapper.width();
    var wrapperHeight = wrapper.height();
  
    // Using outer height to include padding too
    var scrollableHeight = scrollable.outerHeight() + 2*inactiveMargin;

    //When user move mouse over menu
    wrapper.mousemove(function(e){
        var wrapperOffset = wrapper.offset();
        // Scroll menu
        var top = (e.pageY -  wrapperOffset.top) * (scrollableHeight - wrapperHeight) / wrapperHeight  - inactiveMargin;
        if (top < 0) { top = 0; }
        wrapper.scrollTop(top);
    });
}