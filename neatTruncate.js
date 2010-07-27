// neat Truncate
// truncate a string without truncate a word
function neatTruncate(str, size) { 
    if ((str.length > size) && (str.length > 1)) { 
        var whitespaceposition = str.indexOf(" ", size);
        if ( whitespaceposition == -1 ) {
            return str.substring(0, size)+"...";
        } else { 
            return str.substring(0, whitespaceposition)+"...";
        }
    } else return str;
}