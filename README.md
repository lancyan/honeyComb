# honeyComb
a js class for creating honey comb


![image](https://github.com/lancyan/honeyComb/blob/master/QQ%E6%88%AA%E5%9B%BE20170419004715.jpg)
![image](https://github.com/lancyan/honeyComb/blob/master/QQ%E6%88%AA%E5%9B%BE20170419004733.jpg)

sample:   
<script type="text/javascript" src="js/jquery-1.11.1.js"></script>    
<script type="text/javascript" src="js/jquery.transform2d.js"></script>   
<script type="text/javascript" src="js/jquery.easing.1.3.js"></script>    
<script type="text/javascript" src="js/jquery.mousewheel.js"></script>   
<script type="text/javascript" src="js/honeyComb.js"></script>   
<script type="text/javascript" src="js/loaderCover.js"></script>   
<script type="text/javascript" src="js/animation.js"></script>   
<script type="text/javascript" src="js/gestures/hammer.js"></script>   
<script type="text/javascript" src="js/deploy/parallax.js"></script>   
  
var pointArr = [   
{ id: 1, left: 534, top: 421, hcMoveLeft: 216, hcMoveTop: 137 },   
{ id: 2, left: 534, top: 421, hcMoveLeft: 534, hcMoveTop: 321 },   
{ id: 3, left: 534, top: 421, hcMoveLeft: 852, hcMoveTop: 139 },   
{ id: 4, left: 110, top: 321 },   
{ id: 5, left: 429, top: 136 },   
{ id: 6, left: 640, top: 136 },   
{ id: 7, left: 1064, top: 139 }];   

honeyComb.containerId = 'divItemCover';   
honeyComb.radius = 122;   
honeyComb.borderWidth = 2;   
honeyComb.borderColor = '#FFF';   

var hc1 = new honeyComb(pointArr[0], {}, { backgroundColor: '#FFF' }, { lineViewString: '002222' }, { text: 'Test1' });   
var hc2 = new honeyComb(pointArr[1], {}, { backgroundColor: '#FFF' }, { lineViewString: '022202' }, { text: 'Test2' });   
var hc3 = new honeyComb(pointArr[2], {}, { backgroundColor: '#FFF' }, { lineViewString: '202220' }, { text: 'Test3' });   
var hc4 = new honeyComb(pointArr[3], {}, {}, { lineViewString: '000200' });    
var hc5 = new honeyComb(pointArr[4], {}, {}, { lineViewString: '002000' });   
var hc6 = new honeyComb(pointArr[5], {}, {}, { lineViewString: '000000' });   
var hc7 = new honeyComb(pointArr[6], {}, {}, { lineViewString: '000020' });   
