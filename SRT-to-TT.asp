<%@  language="JScript" %>
<%
// Joe Maffia 11/02/2009
// script to convert multi-line srt caption files to tt XML caption files
// it will search for any .srt files inside this folder and create the equivalent .xml files
var fileio =  new ActiveXObject("Scripting.FileSystemObject"); 
var systemPath = "/master/ly/labs/SRTxTT/";
var assetPath = Server.MapPath(systemPath);

var f = fileio.GetFolder(assetPath);
var fc = new Enumerator(f.files);

for(; !fc.atEnd(); fc.moveNext()) { 
    //search for only SRT files.
    if ( fileio.GetExtensionName(fc.item()).search(/srt/i) != -1 )  {
        //Response.Write(assetPath+"\\"+fileio.GetBaseName(fc.item())+".xml");
        // write tt , head, and div elements for the new file
        
        var newfile = fileio.OpenTextFile(assetPath+"\\"+fileio.GetBaseName(fc.item())+".xml", 2, true, -1);
        newfile.Write("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        newfile.Write("<tt xml:lang='en' xmlns='http://www.w3.org/2006/10/ttaf1' xmlns:tts='http://www.w3.org/2006/10/ttaf1#style'>\n");
        newfile.Write("  <head>\n");
        newfile.Write("  </head>\n");
        newfile.Write("  <body>\n");
        newfile.Write("    <div xml:id=\"captions\">\n");
        
        var fs = fileio.OpenTextFile(fc.item(), 1, false, 0);  
        var stringArray = new Array(); 
        var outputStream = new String();
        //read line by line
        while (!fs.AtEndOfStream) {
            stringArray.push(fs.ReadLine());
        }
        for (i=0; i<stringArray.length; i++) {
            if (stringArray[i].match(/(.)/) != null) {
                if (stringArray[i].match(/^\d$/) != null || stringArray[i].match(/^(\d\d)$/) != null || stringArray[i].match(/^(\d\d\d)$/) != null) {
                    ;
                } else if (stringArray[i].match(/(\d\d):(\d\d):(\d\d),(\d\d\d) --> (\d\d):(\d\d):(\d\d),(\d\d\d)/g) != null ) {
                    var begin = stringArray[i].substr(0,2) + ":" + stringArray[i].substr(3,2) + ":" + stringArray[i].substr(6,2) + "." + stringArray[i].substr(9,3);
                    var end   = stringArray[i].substr(17,2) + ":" + stringArray[i].substr(20,2) + ":" + stringArray[i].substr(23,2) + "." + stringArray[i].substr(26,3);
                } else {
                    if (stringArray[i+1]=='') {
                        newfile.Write("      <p begin=\"" + begin + "\" end=\"" + end + "\"><![CDATA[" + stringArray[i] + "]]></p>\n");
                    } else {
                        newfile.Write("      <p begin=\"" + begin + "\" end=\"" + end + "\"><![CDATA[" + stringArray[i]+"<br/>"+stringArray[i+1] + "]]></p>\n");
                        i++;
                    }
                }   
            }
        }
        newfile.Write("    </div>\n");
        newfile.Write("  </body>\n");
        newfile.Write("</tt>\n");
        newfile.Close();
        Response.Write("File created: "+fileio.GetBaseName(fc.item())+".xml<br/>");
    }
}
%>