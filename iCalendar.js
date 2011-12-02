var type = "google"; //could be msn, yahoo or iCal

//Clean start and end time from all characters, spaces, punctuation and return alway a string like HHMMSS
function cleanTime(string) {
    var temp = string.replace(/[A-Za-z]|[ \t\r\n\v\f]|[-!"#$%&'()*+,./:;<=>?@[\\\]_`{|}~]/g, "");
    if (temp.length == 4) { 
        return temp+"00";
    } else if (temp.length == 3) {
        return "0"+temp+"00";
    } else if (temp.length == 2) {
        return temp+"0000";
    } else if (temp.length == 1) {
        return "0"+temp+"0000";
    }
}

var day = "10";
if (day < 10) day = "0"+day;
var month = "6";
if (month < 10) month = "0"+month;
var year = "2010";
var starttime = cleanTime("11:4");
var endtime = cleanTime("16:34");
var city = "cupertino";
var addr1 = "1, Infinite Loop";
var addr2 = "";

// commonStartDate for Google, Yahoo, MSN 
// format YYYYMMDD
var commonStartDate = year+month+day;
//Duration for Yahoo. Format HHMM
function duration() {
    var HH = endtime.substring(0,2) - starttime.substring(0,2);
    if (HH<10) HH = "0"+HH; 
    var MM = endtime.substring(2,4) - starttime.substring(2,4);
    MM = (MM+"").replace("-","");
    if (MM<10) MM = "0"+MM;
    
    return HH+MM;//.replace(/[A-Za-z]|[ \t\r\n\v\f]|[-!"#$%&'()*+,./:;<=>?@[\\\]_`{|}~]/g, "");
}

/*
    Create URL for GoogleCalendar - MSN Calendar - Yahoo Claendar
*/
if(type=="google") {
    Response.Redirect("http://www.google.com/calendar/event?action=TEMPLATE&text=Infomeeting Reminder&dates="+commonStartDate+"T"+starttime+"/"+commonStartDate+"T"+endtime+"&sprop=website:www.ef.com/year&sprop=EF Academic Year&location="+getCodepageString(city)+" "+getCodepageString(addr1)+" "+getCodepageString(addr2));
} else if (type=="msn") {
    Response.Redirect("http://calendar.msn.com/calendar/isapi.dll?pid=5020&pn=EF Academic Year Abroad&id="+info_id+"&n=0&rurl=&s=Infomeeting Reminder&d="+commonStartDate+"T"+starttime+"Z/PT"+(endtime.substring(0,2) - starttime.substring(0,2))+"H"+(endtime.substring(2,4) - starttime.substring(2,4))+"M&l="+getCodepageString(city)+" "+getCodepageString(addr1)+" "+getCodepageString(addr2)+"&c=0&r=E15&m=");
} else if (type=="yahoo") {
    Response.Redirect("http://calendar.yahoo.com/?v=60&DUR="+duration()+"&TITLE=Infomeeting Reminder&ST="+commonStartDate+"T"+starttime+"&in_loc="+getCodepageString(city)+" "+getCodepageString(addr1)+" "+getCodepageString(addr2)+"&DESC=&URL=www.ef.com/year");
} else {
    /*
        Create on the fly an .ics file for Outlook and iCal 
    */    
    Response.ContentType = "text/calendar";
    Response.CharSet = "UTF-8";
    Response.AddHeader("Content-Disposition", "filename=iCalendar_"+info_id+"_"+ctr+".ics");
    Response.Write("BEGIN:VCALENDAR"+"\n") ;
    Response.Write("VERSION:2.0"+"\n") ;
    Response.Write("METHOD:PUBLISH"+"\n") ;
    Response.Write("PRODID:-//hacksw/handcal//NONSGML v1.0//EN"+"\n") ;
    Response.Write("BEGIN:VEVENT"+"\n") ;
    Response.Write("UID:"+info_id+"\n") ;
    Response.Write("DTSTAMP;VALUE=DATE:"+commonStartDate+"T"+starttime+"Z"+"\n") ;
    Response.Write("DTSTART;VALUE=DATE:"+commonStartDate+"T"+starttime+"Z"+"\n") ;
    Response.Write("DTEND;VALUE=DATE:"+commonStartDate+"T"+endtime+"Z"+"\n") ;
    Response.Write("SUMMARY:"+"whatver u wanna write..."+"\n");
    Response.Write("DESCRIPTION:"+city+" - "+addr1+" - "+addr2+"\n");
    Response.Write("LOCATION:"+city+"\n");
    Response.Write("BEGIN:VALARM"+"\n");
    Response.Write("TRIGGER:-PT1D"+"\n");
    Response.Write("ACTION:DISPLAY"+"\n");
    Response.Write("DESCRIPTION:"+"whatver u wanna write..."+"\n");
    Response.Write("END:VALARM"+"\n");
    Response.Write("END:VEVENT"+"\n");
    Response.Write("END:VCALENDAR"+"\n");
    Response.End();
}