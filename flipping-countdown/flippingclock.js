// JScript File
// Joe Maffia 06/01/2010

function animateSec(sec) {
    secA = -parseInt(sec.substr(0,1))*270;
    secB = -parseInt(sec.substr(1))*270;
    
    //digit 1
    if (previousSecA != secA) {
        if (previousSecA==0) previousSecA = -1620;
        secondsDgt1.css("top", previousSecA+=45);
        var idSecA = window.setInterval(function (a,b) {
            if (previousSecA==0) previousSecA = -1620;
            secondsDgt1.css("top", previousSecA+=45);            
        },stepAnimation);
        window.setTimeout(function (a,b) {
            clearInterval(idSecA);
            previousSecA = secA;
        },timeoutAnimation);
    }
    //digit 2
    if (previousSecB != secB) {
        if (previousSecB==0) previousSecB = -2700;
        secondsDgt2.css("top", previousSecB+=45);
        var idSecB = window.setInterval(function (a,b) {
            if (previousSecB==0) previousSecB = -2700;
            secondsDgt2.css("top", previousSecB+=45);            
        },stepAnimation);
        window.setTimeout(function (a,b) {
            clearInterval(idSecB);
            previousSecB = secB;
        },timeoutAnimation);
    }
}


function animateMin(min) {
    minA = -parseInt(min.substr(0,1))*270;
    minB = -parseInt(min.substr(1))*270;
    
    //digit1
    if (previousMinA != minA) {
        if (previousMinA==0) previousMinA = -1620;
        minutesDgt1.css("top", previousMinA+=45);
        var idminA = window.setInterval(function (a,b) {
            if (previousMinA==0) previousMinA = -1620;
            minutesDgt1.css("top", previousMinA+=45);            
        },stepAnimation);
        window.setTimeout(function (a,b) {
            clearInterval(idminA);
            previousMinA = minA;
        },timeoutAnimation);
    }
    //digit2
    if (previousMinB != minB) {
        if (previousMinB==0) previousMinB = -2700;
        minutesDgt2.css("top", previousMinB+=45);
        var idminB = window.setInterval(function (a,b) {
            if (previousMinB==0) previousMinB = -2700;
            minutesDgt2.css("top", previousMinB+=45);            
        },stepAnimation);
        window.setTimeout(function (a,b) {
            clearInterval(idminB);
            previousMinB = minB;
        },timeoutAnimation);
    }
}


function animateHrs(hrs) {
    hrsA = -parseInt(hrs.substr(0,1))*270;
    hrsB = -parseInt(hrs.substr(1))*270;
    
    //digit1
    if (previousHrsA != hrsA) {
        if (previousHrsA==0) previousHrsA = -810;
        hrsDgt1.css("top", previousHrsA+=45);
        var idhrsA = window.setInterval(function (a,b) {
            if (previousHrsA==0) previousHrsA = -810;
            hrsDgt1.css("top", previousHrsA+=45);            
        },stepAnimation);
        window.setTimeout(function (a,b) {
            clearInterval(idhrsA);
            previousHrsA = hrsA;
        },timeoutAnimation);
    }
    //digit2
    if (previousHrsB != hrsB) {
        if (previousHrsB==0) previousHrsB = -1350;
        hrsDgt2.css("top", previousHrsB+=45);
        var idhrsB = window.setInterval(function (a,b) {
            if (previousHrsB==0) previousHrsB = -1350;
            hrsDgt2.css("top", previousHrsB+=45);            
        },stepAnimation);
        window.setTimeout(function (a,b) {
            clearInterval(idhrsB);
            previousHrsB = hrsB;
        },timeoutAnimation);
    }
}