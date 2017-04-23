var Drag = {
    //当前被drag的对象   
    obj: null,
    //当前所有可脱拽对象中最大的zIndex;   
    maxZIndex: 100,
    //初始化    
    init: function (oo) {
        var o = typeof o == 'string' ? document.getElementById(oo) : oo;
        o.onmousedown = Drag.start;
        o.style.zIndex = Drag.maxZIndex;
        Drag.maxZIndex += 1;
    },
    start: function (e) {
        var o = Drag.obj = this;
        //lastMouseX，lastMouseY记录上次鼠标的位置   
        var dg = Drag.getEvent(e);
        o.lastMouseX = dg.x;
        o.lastMouseY = dg.y;
        //提高当前被推拽对象的zIndex使之处于最顶层   
        o.style.zIndex = Drag.maxZIndex;
        Drag.maxZIndex += 1;
        //status = o.maxZIndex;   
        //当onmousemove开始移动   
        document.onmousemove = Drag.move;
        //当onmouseup终止拖拽   
        document.onmouseup = Drag.end;
        //document.onselectstart = "return false";
        //window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    },
    move: function (e) {
        var o = Drag.obj;
        var dg1 = Drag.getEvent(e);
        var dx = dg1.x - o.lastMouseX;
        var dy = dg1.y - o.lastMouseY;
        var left = parseInt(o.style.left) + dx;
        var top = parseInt(o.style.top) + dy;
        o.style.left = left + 'px';
        o.style.top = top + 'px';
        o.lastMouseX = dg1.x;
        o.lastMouseY = dg1.y;
        stopDefault(e);
    },
    end: function (e) {
        var id = Drag.obj.id.replace('honeyComb', '');
        var dg = $("#divTest");
        var childNode = dg.find("#div" + id);
        //  {id:24,  left:'911',  top:'-27'}
        var str = '{id:' + id + ',&nbsp;left:' + parseInt(Drag.obj.style.left) + ',&nbsp;top:' + parseInt(Drag.obj.style.top) + '},';
        if (childNode.length > 0) {
            childNode[0].innerHTML = str;
        }
        else {
            dg[0].innerHTML = document.getElementById('divTest').innerHTML + '<div id="div' + id + '">' + str + '</div>';
        }
        document.onmousemove = null;
        document.onMouseup = null;
        //Drag.obj = null;
    },
    getEvent: function (e) {
        e = e || window.event;
        e.x = e.offsetX || e.layerX;
        e.y = e.offsetX || e.layerY;
        return e;
    }
};

function stopDefault(e) {
    //if (e && e.preventDefault) {
    //    e.preventDefault();
    //}
    //else {
    //    window.event.returnValue = false;
    //}
    //return false;

    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}
//document.onselectstart = function () {
//    window.getSelection().removeAllRanges();
//};