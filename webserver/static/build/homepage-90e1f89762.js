(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"9768a95":[function(require,module,exports){
"use strict";

$(function () {
    var last_collected = $("#last_collected");
    var lc_time = last_collected.data("timestamp");
    if (lc_time > 0) {
        // lc_time of 0 means never
        var d = new Date(lc_time);
        var collected_str = d.getFullYear() + "-" + ('0' + (d.getMonth()+1)).slice(-2) + "-" + ('0' + d.getDate()).slice(-2) + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2);
        last_collected.html(collected_str);
    }
});

},{}]},{},["9768a95"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvY29kZS93ZWJzZXJ2ZXIvc3RhdGljL3NjcmlwdHMvaG9tZXBhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLEVBQUUsWUFBVztBQUNULFFBQUksaUJBQWlCLEVBQUUsaUJBQUYsQ0FBckI7QUFDQSxRQUFJLFVBQVUsZUFBZSxJQUFmLENBQW9CLFdBQXBCLENBQWQ7QUFDQSxRQUFJLFVBQVUsQ0FBZCxFQUFpQjtBQUNiO0FBQ0EsWUFBSSxJQUFJLElBQUksSUFBSixDQUFTLE9BQVQsQ0FBUjtBQUNBLFlBQUksZ0JBQWdCLEVBQUUsV0FBRixLQUFrQixHQUFsQixHQUF3QixDQUFDLE1BQUksRUFBRSxRQUFGLEVBQUwsRUFBbUIsS0FBbkIsQ0FBeUIsQ0FBQyxDQUExQixDQUF4QixHQUF1RCxHQUF2RCxHQUNoQixDQUFDLE1BQUksRUFBRSxPQUFGLEVBQUwsRUFBa0IsS0FBbEIsQ0FBd0IsQ0FBQyxDQUF6QixDQURnQixHQUNjLEdBRGQsR0FDb0IsQ0FBQyxNQUFJLEVBQUUsUUFBRixFQUFMLEVBQW1CLEtBQW5CLENBQXlCLENBQUMsQ0FBMUIsQ0FEcEIsR0FDbUQsR0FEbkQsR0FFaEIsQ0FBQyxNQUFJLEVBQUUsVUFBRixFQUFMLEVBQXFCLEtBQXJCLENBQTJCLENBQUMsQ0FBNUIsQ0FGSjtBQUdBLHVCQUFlLElBQWYsQ0FBb0IsYUFBcEI7QUFDSDtBQUNKLENBWEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbigpIHtcbiAgICB2YXIgbGFzdF9jb2xsZWN0ZWQgPSAkKFwiI2xhc3RfY29sbGVjdGVkXCIpO1xuICAgIHZhciBsY190aW1lID0gbGFzdF9jb2xsZWN0ZWQuZGF0YShcInRpbWVzdGFtcFwiKTtcbiAgICBpZiAobGNfdGltZSA+IDApIHtcbiAgICAgICAgLy8gbGNfdGltZSBvZiAwIG1lYW5zIG5ldmVyXG4gICAgICAgIHZhciBkID0gbmV3IERhdGUobGNfdGltZSk7XG4gICAgICAgIHZhciBjb2xsZWN0ZWRfc3RyID0gZC5nZXRGdWxsWWVhcigpICsgXCItXCIgKyAoJzAnK2QuZ2V0TW9udGgoKSkuc2xpY2UoLTIpICsgXCItXCIgK1xuICAgICAgICAgICAgKCcwJytkLmdldERhdGUoKSkuc2xpY2UoLTIpICsgXCIgXCIgKyAoJzAnK2QuZ2V0SG91cnMoKSkuc2xpY2UoLTIpICsgXCI6XCIgK1xuICAgICAgICAgICAgKCcwJytkLmdldE1pbnV0ZXMoKSkuc2xpY2UoLTIpO1xuICAgICAgICBsYXN0X2NvbGxlY3RlZC5odG1sKGNvbGxlY3RlZF9zdHIpO1xuICAgIH1cbn0pO1xuIl19
