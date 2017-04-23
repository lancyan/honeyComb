var hcArr = [];
var duration_1_1 = 500, delay_1_1 = 100, duration_1_2 = 500, delay_1_2 = 100, duration_2_1 = 500, delay_2_1 = 100;
var duration_2_2 = 500, delay_2_2 = 100, duration_2_3 = 500, delay_2_3 = 100;
var duration_3_1 = 500, delay_3_1 = 100, duration_3_2 = 500, delay_3_2 = 100;
var random_delay_min = 30, random_delay_max = 200;
var ease = 'easeInOutQuad';
var lineTextCache = { 'Halo': {}, 'Xbox': {}, 'Remote collaboration': {}, 'Surface & Phone': {}, 'Machine learning': {}, 'Kinect': {}, 'Immersive show': {}, 'Workplace': {}, 'City next': {}, "Bing's power": {}, 'Xbox music': {}, 'Smart campus': {}, 'Big data': {}, 'Windows activation': {}, 'Office in cloud': {}, 'Microsoft Azure': {}, 'Smart kitchen': {}, 'Smart work': {} };
var isBusy = 0, of = 0, navIdx = 0, previousIdx = 0, ctrlMode = false, istimeout = false;

 
var pointArr = [
{ id: 1, left: 534, top: 421, hcMoveLeft: 216, hcMoveTop: 137 },
{ id: 2, left: 534, top: 421, hcMoveLeft: 534, hcMoveTop: 321 },
{ id: 3, left: 534, top: 421, hcMoveLeft: 852, hcMoveTop: 139 },
{ id: 4, left: 110, top: 321 },
{ id: 5, left: 429, top: 136 },
{ id: 6, left: 640, top: 136 },
{ id: 7, left: 1064, top: 139 },
{ id: 8, left: 301, top: 179 },
{ id: 9, left: 543, top: 392 },
{ id: 10, left: 788, top: 184 },
{ id: 11, left: 302, top: 178, hcMoveLeft: 120, hcMoveTop: 282 },
{ id: 12, left: 302, top: 178, hcMoveLeft: 485, hcMoveTop: 75 },
{ id: 13, left: 544, top: 394, hcMoveLeft: 362, hcMoveTop: 495 },
{ id: 14, left: 544, top: 394, hcMoveLeft: 725, hcMoveTop: 498 },
{ id: 15, left: 786, top: 184, hcMoveLeft: 970, hcMoveTop: 80 },
{ id: 16, left: 786, top: 184, hcMoveLeft: 970, hcMoveTop: 290 },
{ id: 17, left: 421, top: 392 },
{ id: 18, left: 179, top: 388 },
{ id: 19, left: 605, top: 288 },
{ id: 20, left: 483, top: 498 },
{ id: 21, left: 302, top: 389 },
{ id: 22, left: 546, top: 182 },
{ id: 23, left: 666, top: 184 },
{ id: 24, left: 849, top: 289 },
{ id: 25, left: 410, top: 267 },
{ id: 26, left: 583, top: 419 },
{ id: 27, left: 755, top: 270 },
{ id: 28, left: 410, top: 267, hcMoveLeft: 279, hcMoveTop: 341 },
{ id: 29, left: 410, top: 267, hcMoveLeft: 541, hcMoveTop: 192 },
{ id: 30, left: 583, top: 419, hcMoveLeft: 452, hcMoveTop: 492 },
{ id: 31, left: 583, top: 419, hcMoveLeft: 713, hcMoveTop: 494 },
{ id: 32, left: 757, top: 271, hcMoveLeft: 886, hcMoveTop: 196 },
{ id: 33, left: 757, top: 271, hcMoveLeft: 886, hcMoveTop: 345 },
{ id: 34, left: 237, top: 265 },
{ id: 35, left: 453, top: 342 },
{ id: 36, left: 626, top: 344 },
{ id: 37, left: 756, top: 420 },
{ id: 38, left: 756, top: 570 },
{ id: 39, left: 929, top: 421 },
{ id: 40, left: 797, top: 195 },
{ id: 41, left: 322, top: 417 },
{ id: 42, left: 842, top: 420 },
{ id: 43, left: 842, top: 120 },
{ id: 44, left: 928, top: 122 },
{ id: 45, left: 367, top: 343 },
{ id: 46, left: 496, top: 418 },
{ id: 47, left: 540, top: 343 },
{ id: 48, left: 713, top: 344 },
{ id: 49, left: 670, top: 419 },
{ id: 50, left: 799, top: 196 }];
 

function setLeftNavigation() {
    //Animation pop then disable left navigation.
    istimeout = navIdx == 0 ? false : true;
    judgeAnimation();
    Animation.changeImage(navIdx / 2);
}

function skipVideo() {
    $("#myVideo").unbind('ended', videoPlayEnd);
    $('.videoContainer').fadeOut(300, function () {
        initAnimation();
        initCovers();
    });
    //$('#myVideo')[0].currentTime = 16;
}

function videoPlayEnd() {
    initAnimation();
    $('.videoContainer').fadeOut(1000, function () {
        initCovers();
    });
}

$(window).resize(function () {
    Animation.resize();
});

$(function () {

    var elem = document.getElementById("myVideo");
 
    $(elem).bind('ended', videoPlayEnd);

   
    $('#ruleTooltip').hover(function () { $('#imgToolTip').fadeIn(500); }, function () { $('#imgToolTip').fadeOut(500); });

    $('body').css({ '-moz-user-select': '-moz-none', '-moz-user-select': 'none', '-o-user-select': 'none', '-khtml-user-select': 'none', '-webkit-user-select': 'none', '-ms-user-select': 'none', 'user-select': 'none' }).bind('selectstart', function () { return false; });

    $("#divLeftNavigation").click(function (e) {
        if (isBusy == 1) {
            return;
        }
        var objSrc = e.srcElement ? e.srcElement : e.target;
        if (objSrc.className == 'whiteBall') {
            if (isBusy == 0) {
                isBusy = 1;
            }
            navIdx = $(this).children().index(objSrc);
            setLeftNavigation();
        }
    });

    $('.close').click(function (e) {
        $(this).parent().fadeOut(1000, function () {
            $("#pbkImg").attr("src", "");
        });
        $('#divItemShow').fadeOut(1000);
        var video = $('#videoDiag');
        if (video.length > 0) {
            $('#pCon').css({ 'display': 'block' });
            video.parent().html('<img id="pbkImg" alt="" src="" style="background-position: center;" />');
        }
        if (navIdx == 6 && $('#registerBK').css('display') == 'none') {
            $('#registerBK').fadeIn(100);
        }
       
        Animation.enableScence();
      
    });

    initLineTextCache();
    initComb();

    //touch swipe event
    var mc = new Hammer(document.getElementById("divContent"));
    mc.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on("swipe", switchNavigation);
    
});

function switchNavigation(e) {
    if (ctrlMode == false) {
        if (isBusy == 1 || Animation.pop) {
            return;
        }
        else {
            isBusy = 1;
        }
        if (e.direction == 8) {
            navIdx += 2;
            if (navIdx > 6) {
                navIdx = 6;
            }
        }
        else if (e.direction == 16) {
            navIdx -= 2;
            if (navIdx < 0) {
                navIdx = 0;
            }
        }
        setLeftNavigation();
    }
}

function initCovers() {
    $('.leftNavigation').animate({ opacity: 1 }, { duration: 1000 });
    $('#footer').css('display', 'block');
    $('#divContent').fadeIn(10, function () {
        $(document).keydown(function (e) {
            ctrlMode = e.ctrlKey;
            if (isBusy == 1 || Animation.pop || e.ctrlKey || e.keyCode == 27) {
                return;
            }
            var isHit = false;
            if (e.keyCode == 38) {
                navIdx -= 2;
                if (navIdx < 0) {
                    navIdx = 0;
                }
                isHit = true;
            }
            else if (e.keyCode == 40) {
                navIdx += 2;
                if (navIdx > 6) {
                    navIdx = 6;
                }
                isHit = true;
            }
            if (isHit) {
                if (isBusy == 0) {
                    isBusy = 1;
                }
                setLeftNavigation();
            };
        });
        $(document).keyup(function (e) {
            ctrlMode = e.ctrlKey;
            if (e.keyCode == 27) {
                if (Animation.pop) {
                    $('#pop').fadeOut(1000);
                    $('#divItemShow').fadeOut(1000);
                    var hc445 = $('#honeyComb445'), hc446 = $('#honeyComb446'), hc447 = $('#honeyComb447');
                    if (navIdx == 0) {
                        if (hc445.css('display') == 'block') {
                            hc445.fadeOut(300);
                            var hCur = getHcById(1);
                            hCur.fade(false, 0.6);
                            hCur.fadeText(1);
                        }
                        if (hc446.css('display') == 'block') {
                            hc446.fadeOut(300);
                            var hCur = getHcById(2);
                            hCur.fade(false, 0.6);
                            hCur.fadeText(1);
                        }
                        if (hc447.css('display') == 'block') {
                            hc447.fadeOut(300);
                            var hCur = getHcById(3);
                            hCur.fade(false, 0.6);
                            hCur.fadeText(1);
                        }
                    }
                    else if (navIdx == 6) {
                        if ($('#registerBK').css('display') == 'none') {
                            $('#registerBK').fadeIn(100);
                        }
                    }
                }
               
                $("#popContent").fadeOut();
                var video = $('#videoDiag');
                if (video.length > 0) {
                    video.parent().html('<img id="pbkImg" alt="" src="" style="background-position: center;" />');
                }
                if ($('.rules').css('display') == 'block') {
                    $('#divItemShow,.rules').fadeOut(500, function () {
                        $("#registerBKImg,.email,.register").fadeIn();
                    });
                }
                else {
                    $('#popRegister').fadeOut(1000);
                    $("#registerBKImg,.email,.register").fadeIn();
                }
                Animation.enableScence();
            }
        });
        $(document).mousewheel(function (event, delta) {
            if (ctrlMode == false) {
                if (isBusy == 1 || Animation.pop) {
                    return;
                }
                else {
                    isBusy = 1;
                }
                if (delta > 0) {
                    navIdx -= 2;
                    if (navIdx < 0) {
                        navIdx = 0;
                    }
                }
                else {
                    navIdx += 2;
                    if (navIdx > 6) {
                        navIdx = 6;
                    }
                }
                setLeftNavigation();
            }
        });
        loadCover1();
    });
}

function initComb() {
    honeyComb.containerId = 'divItemCover';
    honeyComb.radius = 122;
    honeyComb.borderWidth = 2;
    honeyComb.borderColor = '#FFF';

    var hc1 = new honeyComb(pointArr[0], {}, { backgroundColor: '#FFF' }, { lineViewString: '002222' }, { text: 'Digital work & life' });
    var hc2 = new honeyComb(pointArr[1], {}, { backgroundColor: '#FFF' }, { lineViewString: '022202' }, { text: 'Productivity & platform' });
    var hc3 = new honeyComb(pointArr[2], {}, { backgroundColor: '#FFF' }, { lineViewString: '202220' }, { text: 'Mobile-first & cloud-first' });
    var hc4 = new honeyComb(pointArr[3], {}, {}, { lineViewString: '000200' });
    var hc5 = new honeyComb(pointArr[4], {}, {}, { lineViewString: '002000' });
    var hc6 = new honeyComb(pointArr[5], {}, {}, { lineViewString: '000000' });
    var hc7 = new honeyComb(pointArr[6], {}, {}, { lineViewString: '000020' });

    //=============================================================================
    honeyComb.radius = 70;
    //honeyComb.borderWidth = 0;
   

    var hc8 = new honeyComb(pointArr[7], {}, { backgroundColor: '#FFF' }, { lineViewString: '022212' }, { text: 'Digital work & life' });
    var hc9 = new honeyComb(pointArr[8], {}, { backgroundColor: '#FFF' }, { lineViewString: '211222' }, { text: 'Productivity & platform' });
    var hc10 = new honeyComb(pointArr[9], {}, { backgroundColor: '#FFF' }, { lineViewString: '022222' }, { text: 'Mobile-first & cloud-first' });
    var hc11 = new honeyComb(pointArr[10], {}, { backgroundColor: '#FFF' }, { lineViewString: '000100' }, { text: 'Digital work' });
    var hc12 = new honeyComb(pointArr[11], {}, { backgroundColor: '#FFF' }, { lineViewString: '200220' }, { text: 'Digital life' });
    var hc13 = new honeyComb(pointArr[12], {}, { backgroundColor: '#FFF' }, { lineViewString: '020101' }, { text: 'Entertainment' });
    var hc14 = new honeyComb(pointArr[13], {}, { backgroundColor: '#FFF' }, { lineViewString: '012200' }, { text: 'World of Windows' });
    var hc15 = new honeyComb(pointArr[14], {}, { backgroundColor: '#FFF' }, { lineViewString: '100220' }, { text: 'Cloud-first' });
    var hc16 = new honeyComb(pointArr[15], {}, { backgroundColor: '#FFF' }, { lineViewString: '001002' }, { text: 'Mobile-first' });

    var hc17 = new honeyComb(pointArr[16], {}, {}, { lineViewString: '020000' });
    var hc18 = new honeyComb(pointArr[17], {}, {}, { lineViewString: '002000' });
    var hc19 = new honeyComb(pointArr[18], {}, {}, { lineViewString: '220200' });
    var hc20 = new honeyComb(pointArr[19], {}, {}, { lineViewString: '000200' });
    var hc21 = new honeyComb(pointArr[20], {}, {}, { lineViewString: '002000' });
    var hc22 = new honeyComb(pointArr[21], {}, {}, { lineViewString: '000202' });
    var hc23 = new honeyComb(pointArr[22], {}, {}, { lineViewString: '000022' });
    var hc24 = new honeyComb(pointArr[23], {}, {}, { lineViewString: '000002' });
    //==================================================================================
    honeyComb.radius = 50;
    //honeyComb.borderWidth = 2;
    //honeyComb.borderColor = '#FFF';

    var hc25 = new honeyComb(pointArr[24], {}, { backgroundColor: '#FFF' }, { lineViewString: '011111' }, { text: 'Digital work & life' }); //INSPIRATION
    var hc26 = new honeyComb(pointArr[25], {}, { backgroundColor: '#FFF' }, { lineViewString: '011011' }, { text: 'Productivity & platform' });//INNOVATION
    var hc27 = new honeyComb(pointArr[26], {}, { backgroundColor: '#FFF' }, { lineViewString: '011100' }, { text: 'Mobile-first & cloud-first' });//INSIGHT

    var hc28 = new honeyComb(pointArr[27], {}, { backgroundColor: '#FFF' }, { lineViewString: '110120'}, { text: 'Digital work' });
    var hc29 = new honeyComb(pointArr[28], {}, { backgroundColor: '#FFF' }, { lineViewString: '020010', text: [{ key: 1, value: 'Smart kitchen' }] }, { text: 'Digital life' });

    var hc30 = new honeyComb(pointArr[29], {}, { backgroundColor: '#FFF' }, { lineViewString: '010011', text: [{ key: 4, value: 'Kinect' }, { key: 5, value: 'Xbox' }] }, { text: 'Entertainment' });
    var hc31 = new honeyComb(pointArr[30], {}, { backgroundColor: '#FFF' }, { lineViewString: '111221' }, { text: 'World of Windows' });

    var hc32 = new honeyComb(pointArr[31], {}, { backgroundColor: '#FFF' }, { lineViewString: '122210', text: [{ key: 2, value: 'Machine learning' }, { key: 3, value: 'City next' }] }, { text: 'Cloud-first' });
    var hc33 = new honeyComb(pointArr[32], {}, { backgroundColor: '#FFF' }, { lineViewString: '001211', text: [{ key: 2, value: 'Office in cloud' }] }, { text: 'Mobile-first' });

    var hc34 = new honeyComb(pointArr[33], { borderWidth: 0 }, {}, { lineViewString: '000002', text: ["Smart work"] }, {});
    var hc35 = new honeyComb(pointArr[34], { borderWidth: 0 }, {}, { lineViewString: '001100' }, {});
    var hc36 = new honeyComb(pointArr[35], { borderWidth: 0 }, {}, { lineViewString: '111000' }, {});
    var hc37 = new honeyComb(pointArr[36], { borderWidth: 0 }, {}, { lineViewString: '110000' }, {});
    var hc38 = new honeyComb(pointArr[37], { borderWidth: 0 }, {}, { lineViewString: '002000', text: ['Windows activation'] }, {});

    
    var hc39 = new honeyComb(pointArr[38], { borderWidth: 0 }, {}, { lineViewString: '002000', text: ['Bing\'s power'] }, {});
    var hc40 = new honeyComb(pointArr[39], { borderWidth: 0 }, {}, { lineViewString: '010000', text: ['Big data'] }, {});
    var hc41 = new honeyComb(pointArr[40], { borderWidth: 0 }, {}, { lineViewString: '001002', text: [{ key: 5, value: 'Remote collaboration' }] }, {});
    var hc42 = new honeyComb(pointArr[41], { borderWidth: 0 }, {}, { lineViewString: '100100', text: [{ key: 3, value: '' }] }, {});
    var hc43 = new honeyComb(pointArr[42], { borderWidth: 0 }, {}, { lineViewString: '022001', text: ['Smart campus', 'Microsoft Azure'] }, {}); 
    var hc44 = new honeyComb(pointArr[43], { borderWidth: 0 }, {}, { lineViewString: '200000' }, {});
    var hc45 = new honeyComb(pointArr[44], { borderWidth: 0 }, {}, { lineViewString: '000100' }, {});
    var hc46 = new honeyComb(pointArr[45], { borderWidth: 0 }, {}, { lineViewString: '010000' }, {});
    var hc47 = new honeyComb(pointArr[46], { borderWidth: 0 }, {}, { lineViewString: '001001' }, {});
    var hc48 = new honeyComb(pointArr[47], { borderWidth: 0 }, {}, { lineViewString: '100000' }, {});
    var hc49 = new honeyComb(pointArr[48], { borderWidth: 0 }, {}, { lineViewString: '010000' }, {});
    var hc50 = new honeyComb(pointArr[49], { borderWidth: 0 }, {}, { lineViewString: '100000' }, {});

    for (var i = 1; i <= 50; i++) {
        var hc = eval('hc' + i);
        hcArr.push(hc);
        //Drag.init(document.getElementById('honeyComb' + i));
    }
}

function loadCover1() {
    isBusy = 1;
    var hc1, hc2, hc3;
    for (var i = 1; i <= 7; i++) {
        var hc = getHcById(i);
        if (hc) {
            if (i == 1) {
                hc1 = hc;
            }
            else if (i == 2) {
                hc2 = hc;
            }
            else if (i == 3) {
                hc3 = hc;
            }
            hc.restoreInit();
            //Drag.init(document.getElementById('honeyComb' + i));
        }
    }
    loadItem1(hc1);
    loadItem2(hc2);
    loadItem3(hc3, function () {
        resetBusy(load1Lines(1));
    });
}

function loadCover2() {
    isBusy = 1;

    var hc8, hc9, hc10, hc11, hc12, hc13, hc14, hc15, hc16;
    for (var i = 8; i <= 24; i++) {
        var hc = getHcById(i);
        if (hc) {
            if (i == 8) {
                hc8 = hc;
            }
            else if (i == 9) {
                hc9 = hc;
            }
            else if (i == 10) {
                hc10 = hc;
            }
            else if (i == 11) {
                hc11 = hc;
            }
            else if (i == 12) {
                hc12 = hc;
            }
            else if (i == 13) {
                hc13 = hc;
            }
            else if (i == 14) {
                hc14 = hc;
            }
            else if (i == 15) {
                hc15 = hc;
            }
            else if (i == 16) {
                hc16 = hc;
            }
            hc.restoreInit();
            //Drag.init(document.getElementById('honeyComb' + i));
        }
    }

    loadItem8(hc8, hc11, hc12);
    loadItem9(hc9, hc13, hc14);
    loadItem10(hc10, hc15, hc16, function () {
        resetBusy(load2Lines(1));
    });

}

honeyComb.prototype.onclick = function (sender) {
    var idx = sender.index;
    if (idx == 1 || idx == 2 || idx == 3) {
        Animation.pop = false;
        myClick(1, idx);
    }
    else if (idx == 11 || idx == 12 || idx == 13 || idx == 14 || idx == 15 || idx == 16) {
        myClick(2, idx);
    }
    return false;
};

honeyComb.prototype.onmouseenter = function (e, sender) {
    var idx = sender.index;
    if (idx == 1 || idx == 2 || idx == 3 || idx == 11 || idx == 12 || idx == 13 || idx == 14 || idx == 15 || idx == 16) {
        var cur = getHcById(idx);
        if (cur) {
            var ct = $(e.currentTarget);
            ct.addClass('shadow');
            ct.css('cursor', 'pointer');
            cur.setBackgroundColor('#0cb5ed', '#fff');
        }
    }
};

honeyComb.prototype.onmouseleave = function (e, sender) {
    var idx = sender.index;
    if (idx == 1 || idx == 2 || idx == 3 || idx == 11 || idx == 12 || idx == 13 || idx == 14 || idx == 15 || idx == 16) {
        var head = $("head");
        var styles = head.find('style');
        if (styles) {
            var sl = styles.length;
            if (sl > 1) {
                var cssTxt = styles[sl - 1].innerHTML;
                var lineCount = cssTxt.split('\n').length;
                if (lineCount == 4) {
                    $(e.currentTarget).removeClass('shadow');
                    head[0].removeChild(styles[sl - 1]);
                }
            }
        }
    }
};

honeyComb.prototype.onLineTextClick = function (e, sender) {
    var lineText = e.currentTarget.innerText || e.currentTarget.textContent;
    if (lineText.indexOf('Smart campus') != -1) {
        var pop3Top = (720 - 560) / 2;
        $('#pop').css({ 'display': 'block', 'width': '1346px', 'height': '560px', 'left': '0px', 'top': pop3Top + 'px' });
        $('#pCon').css({ 'display': 'none' });
        $('#divItemShow').css({ 'z-index': 1000 }).fadeIn(500);
        var li = $('#pop li');
        var vd = $('#videoDiag');
        if (vd.length == 0) {
            var v = '<video controls id="videoDiag" width="1346px" height="560px"  poster="image" preload="auto" autoplay="autoplay">'
                      + '<source src="' + videoUrl2 + '" type="video/mp4" />'
                      + '<p>Your browser does not support the video tag.</p>'
                   + '</video>';
            li.html(v);
            Animation.pop = true;
        }
    }
    else if (lineText.indexOf('Windows activation') != -1) {
        var pop3Top = (720 - 560) / 2;
        $('#pop').css({ 'display': 'block', 'width': '1346px', 'height': '560px', 'left': '0px', 'top': pop3Top + 'px' });
        $('#pCon').css({ 'display': 'none' });
        $('#divItemShow').css({ 'z-index': 1000 }).fadeIn(500);
        var li = $('#pop li');
        var vd = $('#videoDiag');
        if (vd.length == 0) {
            var v = '<video controls id="videoDiag" width="1346px" height="560px"  poster="image" preload="auto" autoplay="autoplay">'
                      + '<source src="' + videoUrl3 + '" type="video/mp4" />'
                      + '<p>Your browser does not support the video tag.</p>'
                   + '</video>';
            li.html(v);
            Animation.pop = true;
        }
    }
    else {
        myClick(6, lineText);
    }
};

honeyComb.prototype.onLineTextmouseenter = function (e, sender) {
    var ec = $(e.currentTarget);
    ec.find('span').css('opacity', 0);
    ec.css({ 'color': '#00bcf3', 'text-shadow': '2px 2px 2px #000' });
    sender.fadeLineText(1, 0, 100);
};

honeyComb.prototype.onLineTextmouseleave = function (e, sender) {
    var ec = $(e.currentTarget);
    ec.find('span').css('opacity', 0);
    ec.css({ 'color': '#ffffff', 'text-shadow': 'none' });
    sender.fadeLineText(1, 0, 100);
};

function loadCover3() {
    isBusy = 1;
    var hc25, hc26, hc27, hc28, hc29, hc30, hc31, hc32, hc33;
    for (var i = 25, len = pointArr.length; i <= len; i++) {
        var hc = getHcById(i);
        if (hc) {
            if (i == 24) {
                hc24 = hc;
            }
            else if (i == 25) {
                hc25 = hc;
            }
            else if (i == 26) {
                hc26 = hc;
            }
            else if (i == 27) {
                hc27 = hc;
            }
            else if (i == 28) {
                hc28 = hc;
            }
            else if (i == 29) {
                hc29 = hc;
            }
            else if (i == 30) {
                hc30 = hc;
            }
            else if (i == 31) {
                hc31 = hc;
            }
            else if (i == 32) {
                hc32 = hc;
            }
            else if (i == 33) {
                hc33 = hc;
            }
            hc.restoreInit();

            //Drag.init(document.getElementById('honeyComb' + i));
        }
    }

    loadItem24(hc25, hc28, hc29);
    loadItem25(hc26, hc30, hc31);
    loadItem26(hc27, hc32, hc33, function () {
        resetBusy(load3Lines(1));
    });
}

function loadCover4() {
    isBusy = 1;
    Animation.showPop(3);
    isBusy = 0;

}
//======================================================
function loadItem1(hc1) {
    hc1.fade(false, 0.5, 0, duration_1_1);
    hc1.move(hc1.hcMoveLeft, hc1.hcMoveTop, delay_1_1, duration_1_1, ease, function (e) {
        e.fadeText(1);
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_1_1, ease);
    });
}

function loadItem2(hc2) {
    hc2.fade(false, 0.6, delay_1_1, duration_1_1);
    hc2.move(hc2.hcMoveLeft, hc2.hcMoveTop, delay_1_1, duration_1_1, ease, function (e) {
        e.fadeText(1, delay_1_1);
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_1_1, ease);
    });
}

function loadItem3(hc3, cb) {
    hc3.fade(false, 0.7, delay_1_1 * 2, duration_1_1);
    hc3.move(hc3.hcMoveLeft, hc3.hcMoveTop, delay_1_1 * 2, duration_1_1, ease, function (e) {
        e.fadeText(1, delay_1_1 * 2);
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_1_1, ease);
        cb && cb();
    });
}

function loadItem8(hc8, hc11, hc12) {
    hc8.fade(false, 0.3, 0, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        e.fadeText(1, 0, duration_2_1, ease);
    });
    
    hc11.fade(false, 0.8, 0, duration_2_1, ease, function (e) {
        e.fadeText(1, 0, duration_2_1, ease);
    });
    hc11.move(hc11.hcMoveLeft, hc11.hcMoveTop, 0, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
    });

    hc12.fade(false, 0.8, 0, duration_2_1, ease, function (e) {
        e.fadeText(1, 0, duration_2_1, ease);
    });
    hc12.move(hc12.hcMoveLeft, hc12.hcMoveTop, 0, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
    });
}

function loadItem9(hc9, hc13, hc14) {
    hc9.fade(false, 0.3, delay_2_1, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        e.fadeText(1, 0, duration_2_1, ease);
    });

    hc13.fade(false, 0.6, delay_2_1, duration_2_1, ease, function (e) {
        e.fadeText(1, delay_2_1, duration_2_1, ease);
    });
    hc13.move(hc13.hcMoveLeft, hc13.hcMoveTop, delay_2_1, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
    });
    hc14.fade(false, 0.6, delay_2_1, duration_2_1, ease, function (e) {
        e.fadeText(1, delay_2_1, duration_2_1, ease);
    });
    hc14.move(hc14.hcMoveLeft, hc14.hcMoveTop, delay_2_1, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
    });
}

function loadItem10(hc10, hc15, hc16, cb) {
    hc10.fade(false, 0.3, delay_2_1 * 2, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        e.fadeText(1, 0, duration_2_1, ease);
    });

    hc15.fade(false, 0.8, delay_2_1 * 2, duration_2_1, ease);
    hc15.move(hc15.hcMoveLeft, hc15.hcMoveTop, delay_2_1 * 2, duration_2_1, ease, function (e) {
        cb && cb();
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        e.fadeText(1, 0, duration_2_1, ease);
    });

    hc16.fade(false, 0.8, delay_2_1 * 2, duration_2_1, ease, function (e) {
        e.fadeText(1, 0, duration_2_1, ease);
    });
    hc16.move(hc16.hcMoveLeft, hc16.hcMoveTop, delay_2_1 * 2, duration_2_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
    });
}

function _loadItem8(hc8, hc11, hc12, cb) {
   
    hc8.fadeText(0, 0, duration_2_2, ease);
    hc8.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc8.fade(false, 0.3, 0, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
       
    });

   
    hc11.fadeText(0, 0, duration_2_2, ease);
    hc11.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc11.move(hc8.hcLeft, hc8.hcTop, 0, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        
    });
    

    hc12.fadeText(0, 0, duration_2_2, ease);
    hc12.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc12.move(hc8.hcLeft, hc8.hcTop, 0, duration_2_2, ease, function (e) {
        cb && cb();
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
       
    });
    
}

function _loadItem9(hc9, hc13, hc14, cb) {

    hc9.fadeText(0, delay_2_2, duration_2_2, ease);
    hc9.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc9.fade(false, 0.3, delay_2_2, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });

    hc13.fadeText(0, delay_2_2, duration_2_2, ease);
    hc13.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc13.move(hc9.hcLeft, hc9.hcTop, delay_2_2, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        cb && cb();
    });
    hc14.fadeText(0, delay_2_2, duration_2_2, ease);
    hc14.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc14.move(hc9.hcLeft, hc9.hcTop, delay_2_2, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        cb && cb();
    });
}

function _loadItem10(hc10, hc15, hc16, cb) {
  
    hc10.fadeText(0, delay_2_2 * 2, duration_2_2, ease);
    hc10.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc10.fade(false, 0.3, delay_2_2 * 2, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        
    });

    hc15.fadeText(0, delay_2_2 * 2, duration_2_2, ease);
    hc15.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc15.move(hc10.hcLeft, hc10.hcTop, delay_2_2 * 2, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        cb && cb();
    });

    hc16.fadeText(0, delay_2_2 * 2, duration_2_2, ease);
    hc16.changeArmArr(0, random_delay_min, random_delay_max, duration_2_2, ease);
    hc16.move(hc10.hcLeft, hc10.hcTop, delay_2_2 * 2, duration_2_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });
}

function __loadItem8(hc8, hc11, hc12, cb) {
 
    hc8.fadeText(0, 0, duration_2_3, ease);
    hc8.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc8.move(hc8.hcLeft, hc8.hcTop, 0, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[24].left, pointArr[24].top, 0.714, 0, duration_2_3, ease, function () {
            cb && cb();
            e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        });
    });

    hc11.fadeText(0, delay_2_3, duration_2_3, ease);
    hc11.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc11.move(hc8.hcLeft, hc8.hcTop, 0, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[24].left, pointArr[24].top, 0.714, 0, duration_2_3, ease);
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });

    hc12.fadeText(0, 0, duration_2_3, ease);
    hc12.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc12.move(hc8.hcLeft, hc8.hcTop, 0, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[24].left, pointArr[24].top, 0.714, 0, duration_2_3, ease);
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });
}

function __loadItem9(hc9, hc13, hc14) {

    hc9.fadeText(0, delay_2_3, duration_2_3, ease);
    hc9.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc9.move(hc9.hcLeft, hc9.hcTop, delay_2_3, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[25].left, pointArr[25].top, 0.714, 0, duration_2_3, ease, function () {
            //cb && cb();
            e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        });
    });

    hc13.fadeText(0, delay_2_3, duration_2_3, ease);
    hc13.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc13.move(hc9.hcLeft, hc9.hcTop, delay_2_3, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[25].left, pointArr[25].top, 0.714, 0, duration_2_3, ease);
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });

    hc14.fadeText(0, delay_2_3, duration_2_3, ease);
    hc14.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc14.move(hc9.hcLeft, hc9.hcTop, delay_2_3, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[25].left, pointArr[25].top, 0.714, 0, duration_2_3, ease);
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });
}

function __loadItem10(hc10, hc15, hc16) {

    hc10.fadeText(0, delay_2_3 * 2, duration_2_3, ease);
    hc10.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc10.move(hc10.hcLeft, hc10.hcTop, delay_2_3 * 2, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[26].left, pointArr[26].top, 0.714, 0, duration_2_3, ease, function () {
            //cb && cb();
            e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        });
    });

    hc15.fadeText(0, delay_2_3 * 2, duration_2_3, ease);
    hc15.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc15.move(hc10.hcLeft, hc10.hcTop, delay_2_3 * 2, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[26].left, pointArr[26].top, 0.714, 0, duration_2_3, ease);
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });

    hc16.fadeText(0, delay_2_3 * 2, duration_2_3, ease);
    hc16.changeArmArr(0, random_delay_min, random_delay_max, duration_2_3, ease);
    hc16.move(hc10.hcLeft, hc10.hcTop, delay_2_3 * 2, duration_2_3, ease, function (e) {
        e.scaleMove(pointArr[26].left, pointArr[26].top, 0.714, 0, duration_2_3, ease);
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });

}

function _loadItem24(hc25, hc28, hc29, cb) {

    hc25.fadeText(0, 0, duration_3_2, ease);
    hc25.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc25.fade(false, 0.3, 0, duration_3_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        cb && cb();
    });

    hc28.fadeLineText(0, 0, duration_3_2, ease);
    hc28.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc28.fadeText(0, 0, duration_3_2, ease);
    hc28.move(hc25.hcLeft, hc25.hcTop, 0, duration_3_2, ease);
    hc28.fade(false, 0, 0, duration_3_2, ease, function (e) { e.hideComb(); });

    hc29.fadeLineText(0, 0, duration_3_2, ease);
    hc29.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc29.fadeText(0, 0, duration_3_2, ease);
    hc29.move(hc25.hcLeft, hc25.hcTop, 0, duration_3_2, ease);
    hc29.fade(false, 0, 0, duration_3_2, ease, function (e) { e.hideComb(); });
}

function _loadItem25(hc26, hc30, hc31, cb) {

    hc26.fadeText(0, delay_3_2, duration_3_2, ease);
    hc26.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc26.fade(false, 0.3, delay_3_2, duration_3_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
        cb && cb();
    });

    hc30.fadeLineText(0, delay_3_2, duration_3_2, ease);
    hc30.fadeText(0, delay_3_2, duration_3_2, ease);
    hc30.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc30.move(hc26.hcLeft, hc26.hcTop, delay_3_2, duration_3_2, ease);
    hc30.fade(false, 0, delay_3_2, duration_3_2, ease, function (e) { e.hideComb(); });

    hc31.fadeLineText(0, delay_3_2, duration_3_2, ease);
    hc31.fadeText(0, delay_3_2, duration_3_2, ease);
    hc31.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc31.move(hc26.hcLeft, hc26.hcTop, delay_3_2, duration_3_2, ease);
    hc31.fade(false, 0, delay_3_2, duration_3_2, ease, function (e) { e.hideComb(); });
}

function _loadItem26(hc27, hc32, hc33, cb) {
   
    hc27.fadeText(0, delay_3_2 * 2, duration_3_2, ease);
    hc27.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc27.fade(false, 0.3, delay_3_2 * 2, duration_3_2, ease, function (e) {
        e.fade(false, 0, 0, 0, ease, function () { e.hideComb(); });
    });
    hc32.fadeLineText(0, delay_3_2 * 2, duration_3_2, ease);
    hc32.fadeText(0, delay_3_2 * 2, duration_3_2, ease);
    hc32.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc32.move(hc27.hcLeft, hc27.hcTop, delay_3_2 * 2, duration_3_2, ease);
    hc32.fade(false, 0, delay_3_2 * 2, duration_3_2, ease, function (e) { e.hideComb(); });

    hc33.fadeLineText(0, delay_3_2 * 2, duration_3_2, ease);
    hc33.fadeText(0, delay_3_2 * 2, duration_3_2, ease);
    hc33.changeArmArr(0, random_delay_min, random_delay_max, duration_3_2, ease);
    hc33.move(hc27.hcLeft, hc27.hcTop, delay_3_2 * 2, duration_3_2, ease, function () {
        cb && cb();
    });
    hc33.fade(false, 0, delay_3_2 * 2, duration_3_2, ease, function (e) { e.hideComb(); });
}

function loadItem24(hc25, hc28, hc29) {
    hc25.fade(false, 0.3, 0, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });
    hc25.fadeText(1, 0, duration_3_1, ease);
  

    hc28.fade(false, 0.8, 0, duration_3_1, ease);
    hc28.move(hc28.hcMoveLeft, hc28.hcMoveTop, 0, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });
    hc28.fadeText(1, 0, duration_3_1, ease);
    hc28.fadeLineText(1, 0, duration_3_1, ease);


    hc29.fade(false, 0.7, 0, duration_3_1, ease);
    hc29.move(hc29.hcMoveLeft, hc29.hcMoveTop, 0, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });
    hc29.fadeText(1, 0, duration_3_1, ease);
    hc29.fadeLineText(1, 0, duration_3_1, ease);

}

function loadItem25(hc26, hc30, hc31) {
    hc26.fade(false, 0.3, delay_3_1, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });
    hc26.fadeText(1, delay_3_1, duration_3_1, ease);


    hc30.fade(false, 0.9, delay_3_1, duration_3_1, ease, function (e29) { });
    hc30.move(hc30.hcMoveLeft, hc30.hcMoveTop, delay_3_1, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });
    hc30.fadeText(1, delay_3_1, duration_3_1, ease);
    hc30.fadeLineText(1, delay_3_1, duration_3_1, ease);

    hc31.fade(false, 0.9, delay_3_1, duration_3_1, ease, function (e29) { });
    hc31.move(hc31.hcMoveLeft, hc31.hcMoveTop, delay_3_1, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });
    hc31.fadeText(1, delay_3_1, duration_3_1, ease);
    hc31.fadeLineText(1, delay_3_1, duration_3_1, ease);
}

function loadItem26(hc27, hc32, hc33, cb) {
    hc27.fade(false, 0.3, delay_3_1 * 2, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });
    hc27.fadeText(1, delay_3_1 * 2, duration_3_1, ease);


    hc32.fade(false, 0.7, delay_3_1 * 2, duration_3_1, ease, function (e) { });
    hc32.move(hc32.hcMoveLeft, hc32.hcMoveTop, delay_3_1 * 2, duration_3_1, ease, function (e) {
        cb && cb();
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });

    hc32.fadeText(1, delay_3_1 * 2, duration_3_1, ease);
    hc32.fadeLineText(1, delay_3_1 * 2, duration_3_1, ease);

    hc33.fade(false, 0.6, delay_3_1 * 2, duration_3_1, ease, function (e) { });
    hc33.move(hc33.hcMoveLeft, hc33.hcMoveTop, delay_3_1 * 2, duration_3_1, ease, function (e) {
        e.changeArmArr(1, random_delay_min, random_delay_max, duration_3_1, ease);
    });

    hc33.fadeText(1, delay_3_1 * 2, duration_3_1, ease);
    hc33.fadeLineText(1, delay_3_1 * 2, duration_3_1, ease);
}

function load1Lines(flag) {
    var arrHC = findHc(4, 7);
    var idx = Math.floor(Math.random() * arrHC.length + 1) - 1;
    while (arrHC.length > 0) {
        arrHC[idx].hideNullHexagon();
        arrHC[idx].hideComb(flag);
        arrHC[idx].changeArmArr(flag, random_delay_min, random_delay_max, duration_1_1, ease);
        arrHC.splice(idx, 1);
        idx = Math.floor(Math.random() * arrHC.length + 1) - 1;
    }
    return random_delay_max + (flag ? duration_1_1 : duration_1_2);;
}

function load2Lines(flag) {
    var arrHC = findHc(17, 24);
    var idx = Math.floor(Math.random() * arrHC.length + 1) - 1;
    while (arrHC.length > 0) {
        arrHC[idx].hideNullHexagon();
        arrHC[idx].hideComb(flag);
        arrHC[idx].changeArmArr(flag, random_delay_min, random_delay_max, duration_2_1, ease);
        arrHC.splice(idx, 1);
        idx = Math.floor(Math.random() * arrHC.length + 1) - 1;
    }
    return random_delay_max + (flag ? duration_2_1 : duration_2_2);
}

function load3Lines(flag) {
    var arrHC = findHc(33, pointArr.length);
    var idx = Math.floor(Math.random() * arrHC.length + 1) - 1;
    var delay = 0;
    while (arrHC.length > 0) {
        arrHC[idx].fadeLineText(flag, delay_3_1, duration_3_1, ease);
        arrHC[idx].fade(false, flag, delay_3_1, duration_3_1, ease);
        arrHC[idx].hideComb(flag);
        arrHC[idx].changeArmArr(flag, random_delay_min, random_delay_max, duration_3_1, ease);
        arrHC.splice(idx, 1);
        idx = Math.floor(Math.random() * arrHC.length + 1) - 1;
    }
    return random_delay_max + (flag ? duration_3_1 : duration_3_2);
}


//show items 
function showItem1() {
    var hc1 = getHcById(1);
    if (hc1) {
        hc1.fade(false, 0.3);
        hc1.fadeText(1, 0, duration_1_1, ease);
        hc1.scaleMove(hc1.hcMoveLeft, hc1.hcMoveTop, 1, 0, duration_1_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_1_1, ease);
            hc1.fade(false, 0.5, 0, duration_1_1, ease);
        });
    }
}
function showItem2() {
    var hc2 = getHcById(2);
    if (hc2) {
        hc2.fade(false, 0.3);
        hc2.fadeText(1, 0, duration_1_1, ease);
        hc2.scaleMove(hc2.hcMoveLeft, hc2.hcMoveTop, 1, 0, duration_1_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_1_1, ease);
            e.fade(false, 0.6, 0, duration_1_1, ease);
        });
    }
}
function showItem3() {
    var hc3 = getHcById(3);
    if (hc3) {
        hc3.fade(false, 0.3);
        hc3.fadeText(1, 0, duration_1_1, ease);
        hc3.scaleMove(hc3.hcMoveLeft, hc3.hcMoveTop, 1, 0, duration_1_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_1_1, ease);
            hc3.fade(false, 0.7, 0, duration_1_1, ease);
            resetBusy(2 * load1Lines(1));
        });
    }
}
function showItem8() {
    var hc8 = getHcById(8), hc11 = getHcById(11), hc12 = getHcById(12);
    if (hc8 && hc11 && hc12) {
        hc8.fade(false, 0.3);
        hc8.fade(false, 0.3, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc8.scaleMove(hc8.hcLeft, hc8.hcTop, 1, 0, duration_2_1, ease, function (e) { });
        hc8.fadeText(1, 0, duration_2_1, ease);

        hc12.fade(false, 0.8, 0, duration_2_1, ease);
        hc12.scaleMove(hc12.hcMoveLeft, hc12.hcMoveTop, 1, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc12.fadeText(1, 0, duration_2_1, ease);

        hc11.fade(false, 0.8, 0, duration_2_1, ease);
        hc11.scaleMove(hc11.hcMoveLeft, hc11.hcMoveTop, 1, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc11.fadeText(1, 0, duration_2_1, ease);
    }
}
function showItem9() {
    var hc9 = getHcById(9), hc13 = getHcById(13), hc14 = getHcById(14);
    if (hc9 && hc13 && hc14) {
        hc9.fade(false, 0.3, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc9.scaleMove(hc9.hcLeft, hc9.hcTop, 1, 0, duration_2_1, ease, function (e) { });
        hc9.fadeText(1, 0, duration_2_1, ease);

        hc13.fade(false, 0.6, 0, duration_2_1, ease, function (e) { });
        hc13.scaleMove(hc13.hcMoveLeft, hc13.hcMoveTop, 1, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc13.fadeText(1, 0, duration_2_1, ease);

        hc14.fade(false, 0.6, 0, duration_2_1, ease, function (e) { });
        hc14.scaleMove(hc14.hcMoveLeft, hc14.hcMoveTop, 1, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc14.fadeText(1, 0, duration_2_1, ease);
    }
}
function showItem10() {
    var hc10 = getHcById(10), hc15 = getHcById(15), hc16 = getHcById(16);
    if (hc10 && hc15 && hc16) {
        hc10.fade(false, 0.3, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc10.scaleMove(hc10.hcLeft, hc10.hcTop, 1, 0, duration_2_1, ease, function (e) { });
        hc10.fadeText(1, 0, duration_2_1, ease);
     

        hc16.fade(false, 0.8, 0, duration_2_1, ease, function (e) { });
        hc16.scaleMove(hc16.hcMoveLeft, hc16.hcMoveTop, 1, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
        });
        hc16.fadeText(1, 0, duration_2_1, ease);

        hc15.fade(false, 0.8, 0, duration_2_1, ease, function (e) { });
        hc15.scaleMove(hc15.hcMoveLeft, hc15.hcMoveTop, 1, 0, duration_2_1, ease, function (e) {
            e.changeArmArr(1, random_delay_min, random_delay_max, duration_2_1, ease);
            resetBusy(2 * load2Lines(1));
        });
        hc15.fadeText(1, 0, duration_2_1, ease);
    }
}

//show covers
function showCover1() {
    var arrHoneyItem = findHc(1, 7);
    if (arrHoneyItem.length > 0) {
        showItem1();
        showItem2();
        showItem3();
    }
    else {
        loadCover1();
    }
}

function showCover2() {
    var arrHoneyItem = findHc(8, 16);
    if (arrHoneyItem.length > 0) {
        showItem8();
        showItem9();
        showItem10();
    }
    else {
        loadCover2();
    }
}

//hide covers
function hideCover1(cb) {
    var arrHoneyItem = findHc(1, 3);
    if (arrHoneyItem.length > 0) {
        load1Lines(0);
        var hc1 = arrHoneyItem[0], hc2 = arrHoneyItem[1], hc3 = arrHoneyItem[2];
        hc1.fadeText(0, 0, duration_1_2, ease);
        hc1.changeArmArr(0, random_delay_min, random_delay_max, duration_1_2, ease);
        hc1.scaleMove(pointArr[7].left, pointArr[7].top, 0.5773, 0, duration_1_2, ease, function (e) {
            e.fade(false, 0, 0, duration_1_2, ease, function () {
                e.hideComb();
            });
        });

        hc2.fadeText(0, delay_1_2, duration_1_2, ease);
        hc2.changeArmArr(0, random_delay_min, random_delay_max, duration_1_2, ease);
        hc2.scaleMove(pointArr[8].left, pointArr[8].top, 0.5773, delay_1_2, duration_1_2, ease, function (e) {
            e.fade(false, 0, 0, duration_1_2, ease, function () {
                e.hideComb();
            });
        });

        hc3.fadeText(0, delay_1_2 * 2, duration_1_2, ease);
        hc3.changeArmArr(0, random_delay_min, random_delay_max, duration_1_2, ease);
        hc3.scaleMove(pointArr[9].left, pointArr[9].top, 0.5773, delay_1_2 * 2, duration_1_2, ease, function (e) {
            e.fade(false, 0, 0, duration_1_2, ease, function () {
                e.hideComb();
            });
            cb && cb();
        });
    }
}

function hideCover20(cb1, cb2, cb3) {
    var arrHoneyItem = findHc(8, 16);
    if (arrHoneyItem.length > 0) {
        load2Lines(0);
        var hc8 = arrHoneyItem[0], hc9 = arrHoneyItem[1], hc10 = arrHoneyItem[2], hc11 = arrHoneyItem[3], hc12 = arrHoneyItem[4], hc13 = arrHoneyItem[5], hc14 = arrHoneyItem[6], hc15 = arrHoneyItem[7], hc16 = arrHoneyItem[8];
        _loadItem8(hc8, hc11, hc12, cb1);
        _loadItem9(hc9, hc13, hc14, cb2);
        _loadItem10(hc10, hc15, hc16, cb3);
    }
}

function hideCover21(cb1) {
    var arrHoneyItem = findHc(8, 16);
    if (arrHoneyItem.length > 0) {
        load2Lines(0);
        var hc8 = arrHoneyItem[0], hc9 = arrHoneyItem[1],
            hc10 = arrHoneyItem[2], hc11 = arrHoneyItem[3],
            hc12 = arrHoneyItem[4], hc13 = arrHoneyItem[5],
            hc14 = arrHoneyItem[6], hc15 = arrHoneyItem[7], hc16 = arrHoneyItem[8];
        __loadItem8(hc8, hc11, hc12, cb1);
        __loadItem9(hc9, hc13, hc14);
        __loadItem10(hc10, hc15, hc16);
    }
}

function hideCover30(cb1, cb2, cb3) {
    var arrHoneyItem = findHc(25, 33);
    if (arrHoneyItem.length > 0) {
        load3Lines(0);
        var hc25 = arrHoneyItem[0],
            hc26 = arrHoneyItem[1], hc27 = arrHoneyItem[2],
            hc28 = arrHoneyItem[3], hc29 = arrHoneyItem[4],
            hc30 = arrHoneyItem[5], hc31 = arrHoneyItem[6], hc32 = arrHoneyItem[7], hc33 = arrHoneyItem[8];
        _loadItem24(hc25, hc28, hc29, cb1);
        _loadItem25(hc26, hc30, hc31, cb2);
        _loadItem26(hc27, hc32, hc33, cb3);
    }
}

function hideCover4(cb) {
    $("#registerBK").fadeOut("slow", function () {
        cb && cb();
    });
   
}

//some public method
function setBall() {
    var objArr = $('#divLeftNavigation').children();
    for (var i = 0; i < objArr.length; i++) {
        if (objArr[i].className == 'blueBall') {
            previousIdx = i;
            objArr[i].className = 'whiteBall';
        }
    }
    objArr[navIdx].className = 'blueBall';
}

function judgeAnimation() {
   
    setBall();

    if (navIdx == 0) {
        if (previousIdx == 2) {
            hideCover20(function () {
                showItem1();
            }, function () {
                showItem2();
            }, function () {
                showItem3();
            });
        }
        else if (previousIdx == 4) {
            hideCover30(function () {
                showItem1();
            }, function () {
                showItem2();
            }, function () {
                showItem3();
            });
        }
        else if (previousIdx == 6) {
            hideCover4(function () {
                showCover1();
            });
        }
        else {
            isBusy = 0;
        }
    }
    else if (navIdx == 2) {
        if (previousIdx == 0) {
            hideCover1(function () {
                loadCover2();
            });
        }
        else if (previousIdx == 4) {
            if (getHcById(8)) {
                hideCover30(function () {
                    showItem8();
                }, function () {
                    showItem9();
                }, function () {
                    showItem10();
                });
            }
            else {
                hideCover30(function () { loadCover2() });
            }
        }
        else if (previousIdx == 6) {
            hideCover4(function () {
                showCover2();
            });
        }
    }
    else if (navIdx == 4) {
        if (previousIdx == 0) {
            hideCover1(function () {
                loadCover3();
            });
        }
        else if (previousIdx == 2) {
            hideCover21(function () {
                loadCover3();
            });
        }
        else if (previousIdx == 6) {
            hideCover4(function () {
                loadCover3();
            });
        }
    }
    else {
        if (previousIdx == 0) {
            hideCover1(function () {
                loadCover4();
            });
        }
        else if (previousIdx == 2) {
            hideCover21(function () {
                loadCover4();
            });
        }
        else if (previousIdx == 4) {
            hideCover30(function () {
                loadCover4();
            });
        }
        else {
            isBusy = 0;
        }
    }
}

function pushComb(hc) {
    if (hcArr) {
        var flag = true;
        for (var i = 0, len = hcArr.length; i < len; i++) {
            if (hc.index == hcArr[i].index) {
                flag = false;
                break;
            }
        }
        if (flag == true) {
            hcArr.push(hc);
        }
    }
}

function myClick(num, id) {
    $('#divItemShow').css({ 'z-index': 1000 }).fadeIn(800, function () {
        if (id) {
            Animation.showPop(num, id);
        }
    });
}

function getHcById(index) {
    var len = hcArr.length;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            if (index === hcArr[i].index) {
                return hcArr[i];
            }
        }
    }
}

function findHc(sid, eid) {
    //var sd = 'hexagon' + sid;
    //var ed = 'hexagon' + eid;
    var len = hcArr.length;
    var sidx = -1;
    var eidx = -1;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            if (sid === hcArr[i].index) {
                sidx = i;
            }
            else if (eid === hcArr[i].index) {
                eidx = i;
            }
        }
        return hcArr.slice(sidx, eidx + 1);
    }
}

function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function resetBusy(delay) {
    //$('#divTest').html('status:' + isBusy);
    //setTimeout(test, 10);
    setTimeout(function () { isBusy = 0; }, delay);
}

function setBreathing() {
    //var getCurrentHexagon = 
}

function setNextImg() {
    $('#imgNext').animate({ top: '+=40', opacity: 0 }, {
        duration: 2000,
        ease: 'linear',
        complete: function () {
            if (istimeout) {
                $(this).css({ top: '0', opacity: 0 });
            }
            else {
                $(this).css({ top: '0', opacity: 1 });
            }
            //setTimeout(arguments.callee, 600);
            setTimeout(setNextImg, 0)
        }
    });
}

function initLineTextCache() {
    var d = document.createElement("span");
    d.style.whiteSpace = 'nowrap';
    d.style.fontSize = '14pt';
    d.style.fontFamily = 'segoe_wpsemilight'; //Segoe WP SemiLight
    document.body.appendChild(d);
    for (var p in lineTextCache) {
        d.innerHTML = p;
        var eh = d.offsetHeight + 5;
        var ew = d.offsetWidth + 5;
        lineTextCache[p].ew = ew;
        lineTextCache[p].eh = eh;
    }
    document.body.removeChild(d);
}


