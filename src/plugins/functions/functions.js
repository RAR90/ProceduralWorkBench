function scale(elm, ratio){
	var Elm = $(elm), ElmHeight = parseInt((Elm.width()/ratio), 0)+'px';
	Elm.css({'height':ElmHeight});
};
function newtab(url){
	window.open(url);
};
function nav(url){
	document.location.href=url;
}
$(document).ready(function($){
	//scalonate('.class', 1.5);
});
$(window).on('resize',function(){
	//scalonate('.class', 1.5);
});
// Click out
!function(a) {
    a.fn.clickout = function(b, c) {
        if ("function" == typeof b) {
            var d = b;
            b = c, c = d, delete d
        }
        var b = a.extend({
            onlyWhenVisible: !0,
            ignoreList: !1
        }, b);
        return this.each(function() {
            var d = a(this);
            if (d.data("cbClickOutsideTurnOff") && (d.data("cbClickOutsideTurnOff").call(), d.removeData("cbClickOutsideTurnOff")), !c) return !0;
            var e = function(e) {
                    var f = a(e.target),
                        g = f.parents();
                    if (!f.is(d) && g.index(d) == -1) {
                        if (b.onlyWhenVisible && !d.is(":visible")) return !0;
                        if (b.ignoreList && (f.is(b.ignoreList) || g.index(b.ignoreList) !== -1)) return !0;
                        c.call(d, f, e)
                    }
                },
                f = function() {
                    a(document).off("mousedown", e)
                };
            return a(document).on("mousedown", e), d.data("cbClickOutsideTurnOff", f), d
        }), this
    };
    var b = a.fn.remove;
    a.fn.remove = function() {
        return a(this).clickout(!1), b.apply(this, arguments)
    }
}(jQuery);
