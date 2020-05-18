(function(b) {
  (function() {
    var f = 0;
    var e = ["ms", "moz", "webkit", "o"];
    for (var a = 0; a < e.length && !window.requestAnimationFrame; ++a) {
      window.requestAnimationFrame = window[e[a] + "RequestAnimationFrame"];
      window.cancelAnimationFrame = window[e[a] + "CancelAnimationFrame"] || window[e[a] + "CancelRequestAnimationFrame"]
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(c, k) {
        var l = new Date().getTime();
        var j = Math.max(0, 16 - (l - f));
        var d = window.setTimeout(function() {
          c(l + j)
        }, j);
        f = l + j;
        return d
      }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(c) {
        clearTimeout(c)
      }
    }
  }());
  b.fn.sakura = function(a) {
    function s(c, d) {
      return Math.floor(Math.random() * (d - c + 1)) + c
    }
    var q = ["moz", "ms", "o", "webkit", ""];
    var p = q.length;

    function t(c, f, e) {
      for (var d = 0; d < p; d++) {
        if (!q[d]) {
          f = f.toLowerCase()
        }
        c.get(0).addEventListener(q[d] + f, e, false)
      }
    }
    var r = {
      blowAnimations: ["blow-soft-left", "blow-medium-left", "blow-hard-left", "blow-soft-right", "blow-medium-right", "blow-hard-right"],
      className: "sakura",
      fallSpeed: 4,
      maxSize: 50,
      minSize: 42,
      newOn: 3000,
      swayAnimations: ["sway-0", "sway-1", "sway-2", "sway-3", "sway-4", "sway-5", "sway-6", "sway-7", "sway-8"]
    };
    var a = b.extend({}, r, a);
    var l = b(document).height();
    var m = b(document).width();
    var o = b('<div class="' + a.className + '" />');
    var n = function() {
      setTimeout(function() {
        requestAnimationFrame(n)
      }, a.newOn);
      var h = a.blowAnimations[Math.floor(Math.random() * a.blowAnimations.length)];
      var f = a.swayAnimations[Math.floor(Math.random() * a.swayAnimations.length)];
      var j = (Math.round(l * 0.009) + Math.random() * 5) * a.fallSpeed;
      var e = "fall " + j + "s linear 0s 1, " + h + " " + (((j > 30 ? j : 30) - 20) + s(0, 20)) + "s linear 0s infinite, " + f + " " + s(2, 4) + "s linear 0s infinite";
      var c = o.clone();
      var i = s(a.minSize, a.maxSize);
      var d = Math.random() * m - 100;
      var g = -((Math.random() * 10) + 15);
      t(c, "AnimationEnd", function() {
        b(this).fadeOut()
      });
      t(c, "AnimationIteration", function(k) {
        if (b.inArray(k.animationName, a.blowAnimations) != -1) {
          b(this).remove()
        }
      });
      c.css({
        animation: e,
        height: i,
        left: d,
        "margin-top": g,
        width: i
      }).appendTo(".f_width")
    };
    b(window).resize(function() {
      l = b(document).height();
      m = b(document).width()
    });
    requestAnimationFrame(n)
  }
}(jQuery));