let current_scroll = window.scrollY;
let ticking = false;

// first add raf shim
// http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function getScroll() {
    let body = document.body,
        html = document.documentElement;

    let scrollY = window.scrollY || document.documentElement.scrollTop

    let pageHeight = Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight);

    let windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    return ((scrollY / (pageHeight - windowHeight)) * 100);
}

function updateScroll() {
    var scrollPercent = getScroll();
    var scroller = document.getElementById('scroller');
    var gradient = document.getElementById('bg');

    let windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    let scrollBy = (scrollPercent / 100) * (gradient.offsetHeight - scroller.offsetHeight);
    if (scrollBy < 0) {
        scrollBy = 0;
    }
    gradient.style.top = -scrollBy + 'px';
}

document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function (e) {
        if (!ticking) {
            window.requestAnimFrame(function () {
                updateScroll();
                ticking = false;
            });

            ticking = true;
        }
    });
    updateScroll(current_scroll);

    document.getElementById('scroll-down').addEventListener('click', function (e) {
        let windowHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: windowHeight
        });
    });

    document.getElementById('scroll-mobile').addEventListener('click', function (e) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    });

    document.getElementById('scroll-up').addEventListener('click', function (e) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: 0
        });
    });

    let windowHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    var headerDiv = document.getElementById('header');
    headerDiv.style.minHeight = windowHeight + 'px';

    var mainDiv = document.getElementById('main');
    mainDiv.style.minHeight = windowHeight + 'px';
})


