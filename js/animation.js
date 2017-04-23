var animation_config = {
    popWidth: 1346,
    popHeight: 715,
    fzindex: 3000,
    changedelay: 500,
    smallPopWidth: 1346,
    smallPopHeight: 715,
    fontsize: 26,
    smallFontSize: 16,
    path: ''
};

var Animation = {
    init: function () {
        var config = animation_config;

        this.screenWidth = window.innerWidth || document.body.clientWidth;
        this.screeHeight = window.innerHeight || document.body.clientHeight;

        this.popWidth = config.popWidth;
        this.popHeight = config.popHeight;

        this.pop3Width = config.smallPopWidth;
        this.pop3Height = config.smallPopHeight;
        this.pop3Left = (this.popWidth - this.pop3Width) / 2;
        this.pop3Top = (this.popHeight - this.pop3Height) / 2;

        this.fZindex = config.fzindex;

        this.changedelay = config.changedelay;

        this.left = (this.screenWidth - this.popWidth) / 2 + 50;
        this.top = (this.screeHeight - this.popHeight) / 2;

        this.resize();

        $("#popContent").css({ "left": this.left - 50 + "px", "top": this.top + "px" });
        $("#pop,#popRegister").css({ "width": this.popWidth + "px", "height": this.popHeight + "px" });

        $("#imgRegister").click(function () {
            $("#registerBK").fadeOut(100, function () {
               Animation.showPop(5);
            });
        });

        $("#registerBK > .email").click(function () {
            document.getElementById('mailto').click();
        });

        $("#popRegister > .close").click(function () {
            $("#registerBKImg,.email,.register,.weibo").fadeIn();
        });

        $("#completeclose").click(function () {
            Animation.hiddeRules(false);
            $("#registerBK").fadeIn(100);
            $("#complete").removeClass("completeShow").addClass("complete");
            $("#completeorg").remove();
            $("#completedatetime").remove();
            Booked.clearData();
        });

        $(".rules > .rule_btns > .accept").click(function () {
            Animation.hiddeRules(true);
        });

        $(".rules > .rule_btns > .cancel").click(function () {
            Animation.hiddeRules(false);
            $("#registerBK").fadeIn(100);
        });

        this.pop = false;
    },
    closeItem: function (obj) {
        
        $("#registerBKImg,.email,.register,.weibo").fadeIn();
    },
    resize: function () {
        divContentLeft = (window.innerWidth - animation_config.popWidth) / 2;
        divContentTop = (window.innerHeight - 720) / 2;

        $("#divContent").css({ "left": divContentLeft + "px", "top": divContentTop + "px" });

        $("#scene").css({ "width": window.innerWidth * 2553 / 1080 + "px", "height": window.innerHeight   + "px" });
        $(".sceneBKImage").css({ "height": window.innerHeight + "px" });
    },
    addScene: function (img) {
        $("#scene").css({ "width": window.innerWidth * 2553 / 1080 + "px", "height": window.innerHeight  + "px" });
        $(".sceneBKImage").css({ "height": window.innerHeight + "px" });

        this.allBKImgs = $("#scene img");
    },
    changeImage: function (index) {
        if (index == null) {
            return;
        }
        if (this.allBKImgs) {
            this.allBKImgs.stop();
            this.allBKImgs.eq(index).siblings().animate({ opacity: 0 }, this.changedelay);
            this.allBKImgs.eq(index).animate({ opacity: 1 }, this.changedelay + 300);
        }
    },
    showPop: function (num, id) {
        this.pop = true;
        if (num == 1) {
            this.showPopContent(id);
        } else if (num == 2) {
            this.showPopScene(id);
        } else if (num == 3) {
            this.pop = false;
            $("#registerBK").fadeIn("slow");
        } else if (num == 4) {
            this.pauseScene();
            $(".rules").fadeOut(500, function () {
                $("#popRegister").fadeIn();
            })
        } else if (num == 5) {
            this.pauseScene();
            $('#divItemShow').css({ 'z-index': 1000 }).fadeIn(500, function () {
                $(".rules").fadeIn();
            });
        } else if (num == 6) {
            this.showPopScene3(id);
        }
    },
    showPopContent: function (param) {
        var hCur = hcArr[param - 1];

        var posL = $("#" + param).css("left");
        var posT = $("#" + param).css("top");

        var pos = { left: hCur.hcMoveLeft, top: hCur.hcMoveTop };

        var wh = hCur.getWidthHeight();

        $("#popContent").css({ "left": pos.left - (800 - wh.width) / 2 + "px", "top": pos.top + wh.height + "px" }).fadeIn();

        var title = null, left = null, right = null, moveLeft = null, moveRight = null;
        switch (param) {
            case 1:
                title = "Digital work & life";
                left = "We will relentlessly focus on<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and life experiences with";
                right = "and build great digital work<br/>specific focus on dual use."
                moveLeft = "-252px";
                moveRight = "-246px";
                break;
            case 2:
                title = "Productivity & platform";
                left = "We will reinvent productivity to empower<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;on the planet to do more";
                right = 'every person and every organization<br/>and achieve more.';
                moveLeft = "-367px";
                moveRight = "-322px";
                break;
            case 3:
                title = "Mobile-first & cloud-first";
                left = 'We live in a mobile-first ';
                right = 'and cloud-first world.';
                moveLeft = "-215px";
                moveRight = "-190px";
                break;
            default:
                break;
        }

        $(".left").html(left).addClass('shadow').css({ "left": moveLeft }).animate({ "left": "+=400px" }, "slow");
        $(".right").html(right).addClass('shadow').css({ "right": moveRight }).animate({ "right": "+=400px" }, "slow");


        var i = 444 + param;

        if (document.getElementById("honeyComb" + i) != null) {
            $("#honeyComb" + i).remove();
        }

        var hcPopCon = new honeyComb(
            { id: i, containerId: 'divItemCover', radius: 122, left: pos.left, top: pos.top },
            { borderWidth: 2, borderColor: '#0cb5ed' },
            { backgroundColor: '#0cb5ed' }, 
            {},
            { text: title, color: "white" },
            {}
            );
        hcPopCon.fade(false, 1);
        hcPopCon.fadeText(1);

        $('#honeyComb' + i).css({ "z-index": this.fZindex });
        $('#hexagonSpan' + i).css({ "cursor": "pointer" });
        $("#hexagonSpan" + i).click(function () {
            hcPopCon.fadeText(0);
            $(this).fadeOut('slow');

            hCur.fade(false, 0.6);
            hCur.fadeText(1);

            $('#divItemShow').fadeOut();
            $("#popContent").fadeOut();

        });
        
        $("#divItemShow").click(function () {
            hcPopCon.fadeText(0);
            $("#hexagonSpan" + i).css({ "z-index": "auto" }).fadeOut('slow');

            hCur.fade(false, 0.6);
            hCur.fadeText(1);

            $('#divItemShow').fadeOut();
            $("#popContent").fadeOut();

        });
    },
    showPopScene: function (img) {
        this.pauseScene();

        $("#divItemShow").unbind("click");

        var im = null, content = null;
        switch (img) {
            case 15:
                im = "cloud"
                //content = "Feeling the insights of cloud computing and big data with grand visulization";
                content = "Our cloud OS represents the largest opportunity given we are working from a position of strength.";
                break;
            case 16:
                im = "Mobile"
                //content = "Touch the cutting edge devices in person, with various consumer services";
                content = "While today many people define mobile by devices, Microsoft defines it by experiences.";
                break;
            case 12:
                im = "Digital_life"
                //content = "The single biggest digital life category, measured in both time and money spent, in a mobile-first world ";
                content = "People are at the center and are empowered to do more and achieve more.";
                break;
            case 14:
                im = "WOW"
                //content = "Experiencing the windows OS which delivers the most rich and consistent user experience ";
                content = "Interconnected platforms for individuals, IT and developers.";
                break;
            case 11:
                im = "MechanicalHand"
                //content = "Lighting up the experiences in the most personal, intelligent, open and empowering ways.";
                content = "Microsoft will light up digital work and life experiences in the most personal, intelligent, open and empowering ways.";
                break;
            case 13:
                im = "IMG_7288";
                content = "The single biggest digital life category, measured in both time and money spent, in a mobile-first world is gaming.";
                break;
            default:
                break;
        }

        var smallPopHeight = 1346 * 715 / 1880;
        var smallPopWidth = 1346;
        var pop3Left = 0;
        var pop3Top = (715 - smallPopHeight) / 2;
        var popscene = "-40px";
        
        $("#pCon").css({ display: "block", "width": animation_config.popWidth + "px", "font-size": "18px" }).text(content);
        $("#pbkImg").attr("src", animation_config.path + "images/bg/" + im + ".jpg").css({ "width": smallPopWidth + "px", "height": smallPopHeight + "px" });
      
        $("#popScene").css({ "left": popscene });

        $("#pop").css({ "width": smallPopWidth + "px", "height": smallPopHeight + "px", "left": "0px", "top": pop3Top + "px" }).fadeIn(800, function () {
            $("#popScene").fadeIn("slow");
        });
    },
    showPopScene3: function (img) {
        this.pauseScene();

        $("#divItemShow").unbind("click");
        $("#pbkImg").attr("src", "");

        var pop3 = [
            { id: "Windows activation", im: "Windows_Activation.jpg", w: 1880, h: 715, content: "Welcome to Microsoft China Center One, Our connection begins." },
            { id: "Office in cloud", im: "DeviceZone.jpg", w: 1880, h: 715, l: 100, content: "Yes, it's easy. Nothing to install. Office when and where you need it." },
            { id: "Microsoft Azure", im: "Azure.jpg", w: 1880, h: 715, content: "Open and flexible cloud platform ever." },
            { id: "Big data", im: "big_data.jpg", w: 1880, h: 715, content: "Leave no insight unturned." },
            { id: "Machine learning", im: "machine_learning.jpg", w: 1880, h: 715, content: "Makes it possible for people without deep data science backgrounds to start mining data for predictions." },
            { id: "Halo", im: "IMG_8179.jpg", w: 1880, h: 715, content: "Let's meet our master chief and start an amazing journey in Xbox world" },
            { id: "Xbox", im: "XBox.jpg", w: 1880, h: 715, content: "Xbox is much more than a game console." },
            { id: "Immersive Show", im: "IMG_8206.jpg", w: 1880, h: 715, content: "Enable us see, express, and share our world in ways never before possible." },
            { id: "Smart kitchen", im: "IMG_7373.jpg", w: 1880, h: 715, content: "Digital Life, Future Life." },
            { id: "Smart work", im: "IMG_7323.jpg", w: 1880, h: 715, content: "New way to work. Inspiring and enabling your productivity." },
            { id: "Remote collaboration", im: "LyncRoom8.jpg", w: 1880, h: 715, content: "People will meet and collaborate more easily and effectively." },
            { id: "Bing's power", im: "bing-homepage.jpg", w: 1280, h: 649, l: 120, content: "Help you spend less time searching and more time doing." },
            { id: "Surface & Phone", im: "IMG_7370.jpg", w: 1024, h: 683, l: 80, content: "We’re focused on a broader range of devices with the new mobile capabilities they bring us." },
            { id: "City next", im: "CityNext.jpg", w: 1880, h: 395, l: 80, content: "Empowers people to make cities safer, smarter, healthier, and modern." },
            { id: "Smart campus", im: "IMG_6462.jpg", w: 1920, h: 800, content: "By using Big Data to make buildings smarter and more efficient." },
            { id: "Kinect", im: "Kinect.jpg", w: 1880, h: 715, l: 80, content: "Brings games and entertainment to life in extraordinary new ways without using a controller." }
        ];

        var im = null, content = null, item = null;
        for (var i = 0, len = pop3.length; i < len; i++) {
            item = pop3[i];
            if (img == item.id) {
                im = item.im;
                content = item.content;
                break;
            }
        }

        var smallPopWidth, smallPopHeight, pop3Left, pop3Top, fontize = animation_config.fontsize, popscene = "-100px";

        popscene = "-40px";
        if (item.w > 1346) {
            smallPopWidth = 1346;
            smallPopHeight = 1346 * 715 / 1880;
            if (smallPopHeight > item.h) {
                smallPopHeight = 1346 * item.h / 1880;
            }
            pop3Left = 0;
            pop3Top = (715 - smallPopHeight) / 2;
        } else {
            smallPopWidth = item.w;
            smallPopHeight = item.h;
            pop3Left = (1346 - item.w) / 2;
            pop3Top = (715 - item.h) / 2;
        }

        $("#popScene").css({ width: "1346px", left: popscene });

        $("#pCon").css({ display: "none", "width": smallPopWidth + "px", "font-size": fontize + "px" }).text(content);
        $("#pbkImg").css({ "width": smallPopWidth + "px", "height": smallPopHeight + "px" }).attr("src", animation_config.path + "images/3rd/" + im);
      
        $("#pop").css({ "width": smallPopWidth + "px", "height": smallPopHeight + "px", "left": pop3Left + "px", "top": pop3Top + "px" }).fadeIn(800, function () {
            $("#popScene").fadeIn("slow");
        });
    },
    enableScence: function () {
        this.pop = false;
        if (Animation.parallax != null) {
            Animation.parallax.enable();
        }
    },
    pause: function (id) {
        switch (id) {
            case "BK":
                Animation.parallax.disable();
                break;
            case "POP":
                Animation.popParallax.disable();
                break;
            default:
                break;
        }
    },
    pauseScene: function () {
        this.pause("BK");
    },
    disableCtrl: function (e) {
        // disabling
        e = e ? e : window.event;
        if (e.ctrlKey) {
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
    },
    hiddeRules: function (accept) {
        if (accept) {
            Animation.showPop(4);
        } else {
            $('#divItemShow,.rules').fadeOut(500, function () {
                $("#registerBKImg,.email,.register,.weibo").fadeIn();
                Animation.enableScence();
            });
        }
    }
}
function getWH() {
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;
    if (typeof pageWidth != "number") {
        if (document.compatMode == "number") {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = document.body.clientHeight;
        }
    }
}


function initAnimation() {
    Animation.init();
    Animation.addScene(1);

    var scene = document.getElementById('scene');
    Animation.parallax = new Parallax(scene);

    var popScene = document.getElementById('popScene');
    Animation.popParallax = new Parallax(popScene);
    Animation.popParallax.disable();
}

function checkImage(src, good, bad) {
    var img = new Image();
    img.onload = good;
    img.onerror = bad;
    img.src = src;
}

checkImage("images/loading.gif", function () { }, function () { animation_config.path = '../' });

