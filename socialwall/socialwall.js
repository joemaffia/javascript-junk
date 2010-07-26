// JScript File
// Joe Maffia 06/01/2010

//socialwall
/** 
 * The main function. Starts the socialwall 
 * 
 * @param $start_id int The row id to start getting feeds from 
 * @return null 
 */ 
function socialwall() 
{         
    // Query the DB and get the fresh feeds 
    poll_db(true); 
     
    // Start the random feed speech bubble timer 
    shouter = setInterval("shout()", 6000); 
} 
 
/** 
 * Polls the database for new feeds and adds them to the 
 * stack of fresh feed we can feed from. 
 * 
 * @param $start booleans Tell the function if display all the item at once or at intervalled time
 * @return null 
 */ 
function poll_db(start) {
	$.ajax({
        type: "GET",
	    url: "socialfeeds.xml",
	    dataType: "xml",
	    success: function(data) {
	        //find all the nodes that match the text
            $(data).find('entry').each(function(){
                //console.log($(this));
                fresh_feeds = fresh_feeds.concat($(this));
                //Randomly order the array item
                function random() {
                    return Math.floor(Math.random() * fresh_feeds.length)
                }
                fresh_feeds.sort(random);
            });
            if(fresh_feeds.length != 0) {
                //XML not empty - starting insert feed
                (start == true) ? insertFeed(0) : insertFeed(3000); 
            } else { 
                //XML empty - calling again in 1min
                setTimeout("poll_db(false)", 60000); 
            }
	    }
    });
} 
 
/** 
* Removes the last feed on the page 
*/ 
function remove_last_feed() { 
    $('div.avatar:last-child').remove(); 
    //console.log("remove_last_feed");
} 
 
/** 
 * Inserts feeds from the fresh feeds array 
 * 
 * @param time int Milliseconds before refreshing
 * @return null 
 */ 
var counter = 0;
function insertFeed(time){
    
    counter++;
    
    // Chop off the last 
    if($socialwall.children('.avatar').size() >= max_feeds) { 
        remove_last_feed(); 
    }
    // Get the first feed from the pile 
    feed = fresh_feeds.shift();
    
    //get the XML nodes that we need
    var user            = feed.find('user').text();
    var profile_image   = feed.find('profile_img').text();
    var text            = feed.find('text').text();
    var link            = feed.find('link').text();
    var date            = feed.find('date').text();
    
    $img = $("<img />").error(function() {
            $(this).attr('src','default-profile.gif');
       }).load(function() {
            $(this) 
            .prependTo($socialwall) 
            .wrap('<div class="avatar"></div>') 
            .wrap('<a href="'+link+'" target="_blank" title="'+text+'"></a>') 
            .fadeOut(0).fadeIn((time==0)? 0 : 'slow', function () {
                if(fresh_feeds.length == 0) {
                    setTimeout("poll_db(false)", 60000); 
                    counter = 0;
                } else if (counter < max_feeds) {
                    setTimeout("insertFeed("+time+")", time); 
                } else {
                    setTimeout("insertFeed(3000)", 3000); 
                }
            });      
    }) 
    .attr({ 
        'src': profile_image, 
        'width': 48, 
        'height': 48, 
        'title': user+', '+date,
        'target': '_blank',
        'rel': 'external' 
    }); 
}
/** 
* Picks a random feed and shows the speech bubble 
* 
* @return null 
*/ 
function shout() {
    $('div.tooltip').parent().removeClass('active'); 
    $('div.tooltip').remove();
    
    var random_number = Math.floor(Math.random() * $socialwall.children('.avatar').size()); 
    $avatar = $('.avatar').eq(random_number); 
    
    var author = $avatar.children('a').children('img').attr('title'); 
    var title =  $avatar.children('a').attr('title'); 
    
    $avatar.addClass('active');
    $avatar.append('<div class="tooltip"><div class="tooltipTop">'+title+'<br/><br/><span>'+author+'</span></div><div class="tooltipEnd"></div></div>');

    $('div.tooltip').fadeIn('slow'); 
    $avatar = "";
}