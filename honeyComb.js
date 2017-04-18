function honeyComb(hc, border, background, lineOptions, textOptions, shadow) {
    this.backgroundColor = background.backgroundColor || honeyComb.backgroundColor || 'transparent';
    this.borderColor = border.borderColor || honeyComb.borderColor || 'transparent';
    this.borderWidth = border.borderWidth >= 0 ? border.borderWidth : (honeyComb.borderWidth ? honeyComb.borderWidth : 0);
    //index
    this.index = hc.id;
    //id
    this.id = 'hexagon' + hc.id;
    this.cid = 'hexagonSpan' + hc.id;
    //parent id
    this.pid = 'honeyComb' + hc.id;
    if (document.getElementById(this.id)&& document.getElementById(this.pid)) {
        if (hcArr) {
            for (var i = 0, len = hcArr.length; i < len; i++) {
                if (this.index === hcArr[i].index) {
                    return hcArr[i];
                }
            }
        }
        return null;
    }
    //===============================================
    //container id
    var containerId = hc.containerId || honeyComb.containerId || 'divItemCover';
    //radius
    var radius = hc.radius || honeyComb.radius || 50;
    //six side
    var hcString = hc && hc.hexagonString || '111111';
    //hexagon opacity
    var hOpacity = hc && hc.opacity ? hc.opacity : 0;

    //===============================================
    this.hcLeft = hc.left + 'px';
    this.hcTop = hc.top + 'px';
    this.hcMoveLeft = hc.hcMoveLeft;
    this.hcMoveTop = hc.hcMoveTop;
    //================================================================================
    var lOpacity = (lineOptions && lineOptions.opacity) ? lineOptions.opacity : 1;
    var lineWidth = (lineOptions && lineOptions.lineWidth) ? lineOptions.lineWidth : radius;
    var lineHeight = (lineOptions && lineOptions.lineHeight) ? lineOptions.lineHeight : 2;
    var lineColor = (lineOptions && lineOptions.lineColor) ? lineOptions.lineColor : '#fff';
    var lineViewString = (lineOptions && lineOptions.lineViewString) ? lineOptions.lineViewString : '000000';
    var lineText = (lineOptions && lineOptions.text) ? lineOptions.text : [];
    var lineTextColor = (lineOptions && lineOptions.color) ? lineOptions.color : '#fff';
    var lineTextFontSize = (lineOptions && lineOptions.fontSize) ? lineOptions.fontSize : '14pt';
    var lineTextFontFamily = (lineOptions && lineOptions.fontFamily) ? lineOptions.fontFamily : 'segoe_wpsemilight';
    //===========================================================================================================
    var txt = textOptions && textOptions.text ? textOptions.text : '';
    var txtColor = textOptions && textOptions.color ? textOptions.color : ' #0e0808';
    var shadowBlur = (shadow && shadow.shadowBlur) ? shadow.shadowBlur : '30px';
    var shadowColor = (shadow && shadow.shadowColor) ? hexToRgb(shadow.shadowColor) : hexToRgb('#fff');
    var shadowAlpha = (shadow && shadow.shadowAlpha) ? shadow.shadowAlpha : '1';
    var fontSize = (textOptions && textOptions.fontSize) ? textOptions.fontSize : (radius < 100 ? (radius < 60 ? '10pt' : '14pt') : '24pt');
    var bigFontSize = '2em';
    var fontFamily = textOptions && textOptions.fontFamily ? textOptions.fontFamily : 'segoe_wpsemilight';
    var me = this;
    
    var hw = Math.sqrt(3) * radius;  //width
    var hh = 2 * radius; //height
    var bahw = hw / Math.sqrt(2);
    var babw = this.borderWidth * Math.sqrt(2);
    var margin = (radius * 0.5).toFixed(4);
    var marginLeft = hw * 0.5;
    var ml = marginLeft.toFixed(4);
    var top = bahw * 0.5;
    var bottom = bahw * 0.5;
    var left = shadow ? (marginLeft - top - this.borderWidth) : top * (Math.sqrt(2) - 1) - this.borderWidth;
    var hexagonSpanCls = '';
    var multline = '<div style="width:80%;height:' + lineHeight * 0.5 + 'px;background-color:inherit;top:' + (lineHeight + 4) + 'px; position:relative;margin:0 auto;opacity:0.6;"></div>';  //<div id="' + this.id + '"><span></span></div>  <div id="' + this.id + '"></div>
    var hexagonSpanDiv = $('<div id="' + this.cid + '">' + (shadow ? '<div id="' + this.id + '"><span></span></div>' : '<div id="' + this.id + '"></div>') + '</div>');
    var combDiv = $('<div class="hexagonOrigin" id="' + this.pid + '" style="display:none;position:absolute;left:' + this.hcLeft + ';top:' + this.hcTop + ';"></div>');
    combDiv.append(hexagonSpanDiv);
    $('#' + containerId).append(combDiv);

    //six lines for the hexagon
    var lineDiv1 = '<div class="origin" style="position:absolute; width:0px;height:' + lineHeight + 'px;background-color:' + lineColor + ';left:0px;top:' + margin + 'px">' + (lineViewString[0] == '2' ? multline : '') + '</div>';
    var lineDiv2 = '<div class="origin" style="position:absolute; width:0px;height:' + lineHeight + 'px;background-color:' + lineColor + ';left:' + ml + 'px;top:0px">' + (lineViewString[1] == '2' ? multline : '') + '</div>';
    var lineDiv3 = '<div class="origin" style="position:absolute; width:0px;height:' + lineHeight + 'px;background-color:' + lineColor + ';left:' + hw.toFixed(4) + 'px;top:' + margin + 'px">' + (lineViewString[2] == '2' ? multline : '') + '</div>';
    var lineDiv4 = '<div class="origin" style="position:absolute; width:0px;height:' + lineHeight + 'px;background-color:' + lineColor + ';left:' + hw.toFixed(4) + 'px;top:' + (1.5 * radius).toFixed(4) + 'px">' + (lineViewString[3] == '2' ? multline : '') + '</div>';
    var lineDiv5 = '<div class="origin" style="position:absolute; width:0px;height:' + lineHeight + 'px;background-color:' + lineColor + ';left:' + ml + 'px;top:' + hh.toFixed(4) + 'px">' + (lineViewString[4] == '2' ? multline : '') + '</div>';
    var lineDiv6 = '<div class="origin" style="position:absolute; width:0px;height:' + lineHeight + 'px;background-color:' + lineColor + ';left:0px;top:' + (1.5 * radius).toFixed(4) + 'px">' + (lineViewString[5] == '2' ? multline : '') + '</div>';

    var deg = -150, textIndexArr = [];
    //var oFragment = document.createDocumentFragment();
    for (var i = 0; i < 6; i++) {
        if (lineViewString[i] !== '0') {
            textIndexArr.push(i);
            var ld = (i == 0 ? lineDiv1 : (i == 1 ? lineDiv2 : (i == 2 ? lineDiv3 : (i == 3 ? lineDiv4 : (i == 4 ? lineDiv5 : lineDiv6)))));
            combDiv.append($(ld).css({ 'opacity': lOpacity, '-webkit-transform': 'rotate(' + deg + 'deg) translateZ(0)', '-moz-transform': 'rotate(' + deg + 'deg)', '-ms-transform': 'rotate(' + deg + 'deg)', '-o-transform': 'rotate(' + deg + 'deg)', 'transform': 'rotate(' + deg + 'deg)' }));
        }
        deg += 60;
    }
   
    if (lineText.length > 0) {
        for (var j = 0, textLen = textIndexArr.length; j < textLen ; j++) {
            var lt = lineText[j];
            var isString = typeof lt == 'string';
            if ((isString && lt.length > 0) || typeof lt == 'object') {
                var sb = '';
                var idx, lts;
                if (isString) {
                    idx = textIndexArr[j];
                    lts = lt;
                }
                else {
                    idx = lt.key;
                    lts = lt.value;
                }
               
                if (lts) {
                    var eh = lineTextCache[lts].eh;
                    var ew = lineTextCache[lts].ew;
                    var spanArr = [];
                    for (var k = 0, len = lts.length; k < len ; k++) {
                        spanArr.push('<span style="opacity: 0;font-size: ' + lineTextFontSize + ';font-family:\'' + lineTextFontFamily + '\';">' + lts[k] + '</span>');
                    }
                    var saStr = spanArr.join('');
                    if (lts == 'Smart campus' || lts == 'Windows activation') {
                        saStr = saStr + '&nbsp;&nbsp;<img style="opacity:0;cursor:pointer;margin-top:4px;"  src="images/camera.png" />';
                    }
                    
                    if (idx == 0) {
                        sb = '<span class="hexagonLineText" style="color:' + lineTextColor + ';left:-' + (marginLeft + ew).toFixed(4) + 'px;top:-' + (0.5 * eh) + 'px;">' + saStr + '</span>';
                    }
                    else if (idx == 1) {
                        sb = '<span class="hexagonLineText" style="color:' + lineTextColor + ';left:' + (marginLeft - 0.5 * ew).toFixed(4) + 'px;top:-' + (radius + eh) + 'px;">' + saStr + '</span>';
                    }
                    else if (idx == 2) {
                        sb = '<span class="hexagonLineText" style="color:' + lineTextColor + ';left:' + (hw * 1.5 + 5).toFixed(4) + 'px;top:' + (-0.5 * eh) + 'px;">' + saStr + '</span>';
                    }
                    else if (idx == 3) {
                        sb = '<span class="hexagonLineText" style="color:' + lineTextColor + ';left:' + (hw * 1.5 + 5).toFixed(4) + 'px;top:' + (hh - 0.5 * eh) + 'px;">' + saStr + '</span>';
                    }
                    else if (idx == 4) {
                        sb = '<span class="hexagonLineText" style="color:' + lineTextColor + ';left:' + (marginLeft - 0.5 * ew).toFixed(4) + 'px;top:' + (3 * radius) + 'px;">' + saStr + '</span>';
                    }
                    else {
                        sb = '<span class="hexagonLineText" style="color:' + lineTextColor + ';left:-' + (marginLeft + ew).toFixed(4) + 'px;top:' + (hh - 0.5 * eh) + 'px;">' + saStr + '</span>';
                    }
                    combDiv.append($(sb));
                }
            }
        }
    }
  
    if (txt.length > 0) {
        var txtArr = null;
        if (txt.indexOf(' & ') != -1) {
            var txtTempArr1 = txt.split(' & ');
            if (txtTempArr1.length == 2) {
                var txtTempArr2 = txtTempArr1[0].split(' ');
                if (txtTempArr2.length == 2) {
                    txtArr = [txtTempArr2[0], txtTempArr2[1] + ' & ' + txtTempArr1[1]];
                }
                else {
                    txtArr = [txtTempArr1[0], '& ' + txtTempArr1[1]];
                }
            }
        }
        else {
            var txtArr = txt.split(' ');
            if (txtArr.length == 3) {
                txtArr = [txtArr[0] + ' ' + txtArr[1], txtArr[2]];
            }
        }
        var isBig = false;
        var d2 = document.createElement("span");
        d2.style.fontFamily = fontFamily;
        d2.style.fontSize = fontSize;
        document.body.appendChild(d2);
        for (var i = 0, count = txtArr.length; i < count; i++) {
            var spanArr = [], ew = 0, eh = 0;
            for (var j = 0, len = txtArr[i].length; j < len ; j++) {
                spanArr.push('<span class="hexagonSpanItem" style="opacity: 0;">' + txtArr[i][j] + '</span>');
            }
            var sa = spanArr.join('');
            d2.innerHTML = sa;
            eh = d2.offsetHeight; 
            ew = d2.offsetWidth;
            var posLeft = ((hw - ew) * 0.5).toFixed(4);
            var posTop = (radius - count * eh * 0.5 + i * eh).toFixed(4);
            var txtSpan = '<span class="hexagonSpan" style="left:' + posLeft + 'px;top:' + posTop + 'px;">' + sa + '</span>';
            hexagonSpanDiv.append($(txtSpan));
        }
        hexagonSpanCls = '#' + this.pid + ' .hexagonSpan{\n' + 'position:absolute;\nfont-size:' + fontSize + ';\nfont-family:"' + fontFamily + '";\nz-index:2;\ncolor:' + txtColor + ';\n}\n';
        document.body.removeChild(d2);
    }
    //========================================================================
    var myHexagon = $('#' + this.cid);
    myHexagon.click(function (e) {
        return honeyComb.prototype.onclick(me);
    });
    myHexagon.mouseenter(function (e) {
        return honeyComb.prototype.onmouseenter(e, me);
    });
    myHexagon.mouseleave(function (e) {
        return honeyComb.prototype.onmouseleave(e, me);
    });
    var myHexagonLineText = $('#' + this.pid + ' .hexagonLineText');
    myHexagonLineText.click(function (e) {
        return honeyComb.prototype.onLineTextClick(e, me);
    });
    myHexagonLineText.mouseenter(function (e) {
        return honeyComb.prototype.onLineTextmouseenter(e, me);
    });
    myHexagonLineText.mouseleave(function (e) {
        return honeyComb.prototype.onLineTextmouseleave(e, me);
    });
    //===========================================================================



    var hexagonCls = '#' + this.id + '{\n' +
    'opacity:' + hOpacity + ';\n' +
    'position:relative;\n' +
    'width:' + hw.toFixed(4) + 'px;\n' +
    'height:' + (hw / Math.sqrt(3)).toFixed(4) + 'px;\n' +
    'margin:' + margin + 'px 0;\n' +
    'background-color:' + this.backgroundColor + ';\n';
    if (this.borderWidth > 0) {
        hexagonCls += 'border-left: ' + (hcString[5] == '1' ? (this.borderWidth + 'px solid ' + this.borderColor) : 'none') + ';\n' +
         'border-right: ' + (hcString[2] == '1' ? (this.borderWidth + 'px solid ' + this.borderColor) : 'none') + ';\n';
    }
    if (shadow) {
        hexagonCls += 'box-shadow: 0 0 ' + shadowBlur + ' rgba(' + shadowColor + ',' + shadowAlpha + ');';
    }
    hexagonCls += '}\n';
    //=============================================================================
    var hexagonBeforeAfterCls = '#' + this.id + ':before, ' + '#' + this.id + ':after {\nposition: absolute;\ncontent: "";\n';
    if (this.borderWidth > 0 || shadow) {
        hexagonBeforeAfterCls += 'width: ' + bahw.toFixed(4) + 'px;\nheight: ' + bahw.toFixed(4) + 'px;\n' +
        'left: ' + left.toFixed(4) + 'px;\nbackground-color: inherit;\n-webkit-transform: scaleY(0.5774) rotate(-45deg);\n-moz-transform: scaleY(0.5774) rotate(-45deg);\n-ms-transform: scaleY(0.5774) rotate(-45deg);\n-o-transform: scaleY(0.5774) rotate(-45deg);\ntransform: scaleY(0.5774) rotate(-45deg);\nz-index:1;\n';
    }
    else {
        hexagonBeforeAfterCls += 'border-left: ' + ml + 'px solid transparent;\nborder-right: ' + ml + 'px solid transparent;\nwidth:0;\n';
    }
    if (shadow) {
        hexagonBeforeAfterCls += 'box-shadow: 0 0 ' + shadowBlur + ' rgba(' + shadowColor + ',' + shadowAlpha + ');';
    }
    hexagonBeforeAfterCls += '}\n';
    //==============================================================================
    var hexagonBeforeCls = '#' + this.id + ':before{\n';
    if (this.borderWidth > 0) {
        hexagonBeforeCls += 'top: -' + top.toFixed(4) + 'px;\n' +
            'border-top: ' + (hcString[0] == '1' ? (babw.toFixed(4) + 'px solid ' + this.borderColor) : 'none') + ';\n' +
            'border-right: ' + (hcString[1] == '1' ? (babw.toFixed(4) + 'px solid ' + this.borderColor) : 'none') + ';\n';
    }
    else {
        if (shadow) {
            hexagonBeforeCls += 'top:-' + top.toFixed(4) + 'px;\n';
        }
        else {
            hexagonBeforeCls += 'bottom:100%;\nborder-bottom:' + margin + 'px solid ' + this.backgroundColor + ';\n';
        }
    }
    hexagonBeforeCls += '}\n';
    //===============================================================================
    var hexagonAfterCls = '#' + this.id + ':after{\n';
    if (this.borderWidth > 0) {
        hexagonAfterCls += 'bottom: -' + bottom.toFixed(4) + 'px; ' +
        'border-bottom: ' + (hcString[3] == '1' ? (babw.toFixed(4) + 'px solid ' + this.borderColor) : 'none') + ';\n' +
        'border-left: ' + (hcString[4] == '1' ? (babw.toFixed(4) + 'px solid ' + this.borderColor) : 'none') + ';\n';
    }
    else {
        if (shadow) {
            hexagonAfterCls += 'bottom:-' + bottom.toFixed(4) + 'px;\n';
        }
        else {
            hexagonAfterCls += 'top:100%;\nwidth:0;\nborder-top:' + margin + 'px solid ' + this.backgroundColor + ';\n';
        }
    }
    hexagonAfterCls += '}\n';
    //==================================================================================
    var hexagonShadowCls = '';
    if (shadow) {
        hexagonShadowCls += '#' + this.id + ' span{\n'
         + 'display: block;\n'
         + 'position: absolute;\n'
         + 'top:' + (this.borderWidth * this.scaleFactor).toFixed(4) + 'px;\n'
         + 'left: 0;\n'
         + 'width:' + (hw - (this.borderWidth * 2)).toFixed(4) + 'px;\n'
         + 'height:' + (radius - (this.borderWidth * this.scaleFactor * 2)).toFixed(4) + 'px;\n'
         + 'z-index: 2;\n'
         + 'background: inherit;\n}\n';
    }
    //=================================================================================
 
    addCSS(hexagonCls + hexagonBeforeAfterCls + hexagonBeforeCls + hexagonAfterCls + hexagonShadowCls + hexagonSpanCls);

    //$(cssTxt).appendTo("head");
    //registerCss(cssTxt);
    //======================================================================================
    //fade text on line
    this.fadeLineText = function (flag, delay, duration) {
        var txtArr = this.lineTextArr();
        for (var i = 0; i < txtArr.length; i++) {
            loopSpanText($(txtArr[i]).children().toArray(), flag, delay);
        }
    }
    //fade text in hexagon
    this.fadeText = function (val, delay, duration, ease) {
        var spanArr = $('#' + this.pid + ' .hexagonSpan').children().toArray();
        loopSpanText(spanArr, val, delay, duration, ease);
    }
    //init hexagon css
    this.restoreInit = function () {
        var p_obj = this.p_obj();
        p_obj.css({ 'display': 'block', left: this.hcLeft, top: this.hcTop, transform: 'scale(1)' });
        p_obj.find('.origin').css("width", 0);
        p_obj.find('#' + this.id).css("opacity", hOpacity);
        p_obj.find('.hexagonSpan span').css("opacity", 0);
        p_obj.find('.hexagonLineText span').css("opacity", 0);
    }

    function loopSpanText(spanArr, val, delay, duration, ease) {
        var len = spanArr.length;
        var d1 = Math.ceil((delay || 0) / len);
        var d2 = Math.ceil((duration || 300) / len);
        if (len > 0) {
            anim(spanArr, val, d1, d2, ease);
        }
    }
    function anim(animArr, val, delay, duration, ease) {
        var obj = typeof animArr[0] == 'string' ? '#' + animArr[0] : animArr[0];
        $(obj).delay(delay || 0).animate({ opacity: val}, {
            duration: (duration || 30), // Math.floor(Math.random() * 20), //(duration || 30),
            easing: ease || 'linear',
            queue: true,
            complete: function () {
                animArr.shift();
                if (animArr.length)
                    anim(animArr, val, delay, duration, ease);
            }
        });
    }

    function addCSS(cssText) {
        var hs = $("head style");
        if (hs.length > 0) {
            hs[0].innerHTML += cssText;
        }
        else {
            //window.style="body{background-color:blue;"; 
            //document.createStyleSheet("javascript:style");
            var css = document.createElement('style');
            css.type = 'text/css';

            if (css.styleSheet && css.styleSheet.cssText)
                css.styleSheet.cssText = cssText;
            else
                css.appendChild(document.createTextNode(cssText));
            document.getElementsByTagName("head")[0].appendChild(css);
        }
    }

    function hexToRgb(str) {
        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/ig.test(str)) {
            var hex = str.substr(1);
            hex = hex.length == 3 ? hex.replace(/(.)/g, '$1$1') : hex;
            var rgb = parseInt(hex, 16);
            return [(rgb >> 16) & 255, (rgb >> 8) & 255, rgb & 255].join(',');
        }
        return false;
    }

    this.getWidthHeight = function () {
        return { width: hw, height: hh };
    }
    this.pos = function () {
        var pos = this.p_obj().position();
        return pos;
    }
    this.lineArr = function () {
        return $('#' + this.pid + ' .origin');
    }
    this.p_obj = function () {
        return $('#' + this.pid)
    };
    this.c_obj = function () {
        return $('#' + this.id)
    };
    this.hideNullHexagon = function () {
        var c_obj = this.c_obj();
        if (c_obj.css('opacity') == 0 && this.backgroundColor == 'transparent') {
            c_obj.css('display', 'none');
        }
    }
    this.hideComb = function (flag) {
        var p_obj = this.p_obj();
        var c_obj = this.c_obj();
        flag ? p_obj.css('display', 'block') : p_obj.css('display', 'none');
        if (flag == 1) {
            if (this.borderWidth == 0 && this.backgroundColor == 'transparent') {
                c_obj.css('display', 'none');
            }
        }
    }
    this.lineTextArr = function () {
        return $('#' + this.pid + ' .hexagonLineText');
    }
    
    this.setBackgroundColor = function (bg, txtColor) {
        var s2 = '<style type="text/css">';
        //var ts = '-webkit-transition: all 1s ease-out;-moz-transition: all 1s ease-out;-ms-transition: all 1s ease-out;-o-transition: all 1s ease-out;transition: all 1s ease-out;';
        s2 += '#' + this.id + '{background-color:' + bg + ';' + 'border-left: solid ' + this.borderWidth + 'px ' + bg + ';border-right: solid ' + this.borderWidth + 'px ' + bg + ';}\n';
        s2 += '#' + this.id + ':before{top: -' + top.toFixed(4) + 'px;' + ' border-top: solid ' + babw.toFixed(4) + 'px ' + bg + '; border-right: solid ' + babw.toFixed(4) + 'px ' + bg + ';}\n';
        s2 += '#' + this.id + ':after{bottom: -' + bottom.toFixed(4) + 'px;' + ' border-bottom: solid ' + babw.toFixed(4) + 'px ' + bg + '; border-left: solid ' + babw.toFixed(4) + 'px ' + bg + ';}\n';
        s2 += '#' + this.pid + ' .hexagonSpan{color:' + txtColor + ';}';
        s2 += '</style>'
        $(s2).appendTo('head');
    }
    //======================================================================
    this.move = function (left, top, delay, duration, ease, callback) {
        var p_obj = this.p_obj();
        p_obj.delay(delay || 0).animate({ left: left, top: top }, {
            duration: (duration || 300),
            queue: true,
            easing: ease || 'linear',
            progress: function (a, p, r) { },
            step: function (n, t) { },
            complete: function () {
                callback && callback(me);
            }
        });
    }

    this.fade = function (flag, targetOpacity, delay, duration, ease, callback) {
        var p_obj = this.p_obj();
        var c_obj = this.c_obj();
        var obj = flag ? p_obj : c_obj;
        if (targetOpacity > 0) {
            p_obj.css('display', 'block');
            c_obj.css('display', 'block');
        }
        // 'backgroundColor': 'rgba(' + colorToRGB(color) + ',' + opacity + ')'   
        (obj).delay(delay || 0).animate({ opacity: targetOpacity }, {
            duration: (duration || 300),
            queue: true,
            easing: ease || 'linear',
            progress: function (a, p, r) { },
            step: function (n, t) { },
            complete: function () {
                if (targetOpacity == 0) {
                    obj.css('display', 'none');
                }
                callback && callback(me);
            }
        });
    }

    this.scale = function (ts, delay, duration, ease, callback) {
        var p_obj = this.p_obj();
        //=========================
        p_obj.addClass('origin');
        //=========================
        p_obj.delay(delay || 0).animate({ transform: 'scale(' + ts + ')' }, {
            duration: (duration || 300),
            queue: false,
            easing: ease || 'linear',
            progress: function (a, p, r) { },
            step: function (n, t) { },
            complete: function () {
                callback && callback(me);
                //callback && callback.apply(this, arguments);
            }
        });
    }

    this.changeArm = function (flag, armId, delay, duration, ease, callback) {
        var lineArr = this.lineArr();
        var w = flag == 0 ? 0 : lineWidth;
        var len = lineArr.length;
        if (len > 0) {
            var la = armId ? lineArr[armId] : lineArr[0];
            if (la) {
                $(la).delay(delay || 0).animate({ width: w }, {
                    duration: duration || 300,
                    queue: true,
                    easing: ease || 'linear',
                    progress: function (a, p, r) { },
                    step: function (n, t) { },
                    complete: function () {
                        callback && callback(me);
                    }
                });
            }
            else {
                callback && callback(me);
            }
        }
        else {
            callback && callback(me);
        }
    }

    this.changeArmArr = function (flag, min, max, duration, ease, callback) {
        var lineArr = this.lineArr();
        var w = flag == 0 ? 0 : lineWidth;
        var len = lineArr.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                var la = lineArr[i];
                if (la) {
                    var rdm = (i == 0) ? 0 : Math.floor(Math.random() * (max - min + 1) + min);
                    $(la).delay(rdm).animate({ width: w }, {
                        duration: duration || 300,
                        queue: false,
                        easing: ease || 'linear'
                    });
                }
            }
            $(lineArr).promise().done(function () {
                callback && callback(me);
            });
        }
        else {
            callback && callback(me);
        }
    }

    this.scaleMove = function (left, top, ts, delay, duration, ease, callback) {
        var p_obj = this.p_obj();
        //=========================
        p_obj.addClass('origin');
        //=========================
        p_obj.delay(delay || 0).animate({ left: left, top: top, transform: 'scale(' + ts + ')' }, {
            duration: (duration || 300),
            queue: false,
            easing: ease || 'linear',
            progress: function (a, p, r) { },
            step: function (n, t) { },
            complete: function () {
                callback && callback(me);
                //callback && callback.apply(this, arguments);
            }
        });
    }
}
//==custom events=======================================================================

function getSpanSize(words, fontFamily, bigFontSize) {
    var d1 = document.createElement("span");
    d1.style.whiteSpace = 'nowrap';
    d1.style.fontFamily = fontFamily;
    d1.style.fontSize = bigFontSize;
    d1.innerHTML = words;
    document.body.appendChild(d1);
    var _of = d1.offsetHeight
    document.body.removeChild(d1);
    return _of;
}



honeyComb.prototype.onclick = function (sender) {
    return false;
}

honeyComb.prototype.scaleFactor = Math.tan(30 * Math.PI / 180);
//===========================================================================================




