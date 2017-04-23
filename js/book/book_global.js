var Booking = {
    init: function () {
        this.curStep = 1;

        this.btnPreview = $(".buttons .btnPrev").click(function () {
            Booking.next(false);
        });
        this.btnNext = $(".buttons .btnNext").click(function () {
            Booking.next(true);
        });

        this.naviS01 = $("#naviS01");
        this.navi02 = $("#navi02");
        this.naviS02 = $("#naviS02");
        this.navi03 = $("#navi03");
        this.naviS03 = $("#naviS03");
        this.navi04 = $("#navi04");
        this.naviS04 = $("#naviS04");

        this.visitTime = $(".visitTime");
        this.myInfo = $(".myInfo");
        this.visitorInfo = $(".visitorInfo");
        this.opportunity = $(".opportunity");

        this.conArray = new Array(this.visitTime, this.myInfo, this.visitorInfo, this.opportunity);

        this.show(1);
    },
    view: function () { },
    cancel: function () { },
    next: function (move) {
        if (move) {
            if (this.curStep >= 4) {
                return;
            }
            this.curStep += 1;
        } else {
            if (this.curStep <= 1) {
                return;
            }
            this.curStep -= 1;
        }

        this.show(this.curStep);
        this.changeNavi(this.curStep);
    },
    show: function (i) {
        var cons = this.conArray;
        $.each(cons, function (key, item) {
            if (key == i - 1) {
                item.css({ "display": "" });
            }
            else {
                item.css({ "display": "none" });
            }
        })
    },
    changeNavi: function (curStep) {
        switch (curStep) {
            case 1:
                this.btnNext.removeClass("btnHover").addClass("btnOut");
                this.btnPreview.removeClass("btnOut").addClass("btnHover");

                break;
            case 2:
                this.naviS01.removeClass("li1").addClass("li3");
                this.navi02.removeClass("liout").addClass("lihover");
                this.naviS02.removeClass("li2").addClass("li1");

                break;
            case 3:
                this.naviS02.removeClass("li1").addClass("li3");
                this.navi03.removeClass("liout").addClass("lihover");
                this.naviS03.removeClass("li2").addClass("li1");

                break;
            case 4:
                this.naviS03.removeClass("li1").addClass("li3");
                this.navi04.removeClass("liout").addClass("lihover");
                this.naviS04.removeClass("li5").addClass("li4");

                this.btnNext.removeClass("btnOut").addClass("btnHover");
                this.btnPreview.removeClass("btnHover").addClass("btnOut");
                break;
            default:
                break;
        }
    }
}

$(function () {
    Booking.init();
});