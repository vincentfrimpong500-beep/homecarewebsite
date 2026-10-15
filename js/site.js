(function () {
    var track = document.getElementById('track'), slides = track.children, n = slides.length, i = 0, timer,
        dots = document.getElementById('dots'), hero = document.querySelector('.hero');
    for (var d = 0; d < n; d++) { (function (k) { var b = document.createElement('button'); b.setAttribute('aria-label', 'Go to slide ' + (k + 1)); b.onclick = function () { go(k) }; dots.appendChild(b) })(d) }
    function go(k) {
        i = (k + n) % n; track.style.transform = 'translateX(-' + i * 100 + '%)';
        Array.prototype.forEach.call(dots.children, function (b, j) { b.className = j === i ? 'on' : '' });
        Array.prototype.forEach.call(track.querySelectorAll('video'), function (v) {
            var active = v.parentNode === slides[i];
            if (active && v.getAttribute('src')) { v.play().catch(function () { }) } else { v.pause() }
        });
        start();
    }
    function start() { clearInterval(timer); timer = setInterval(function () { go(i + 1) }, 6000) }
    hero.querySelector('.prev').onclick = function () { go(i - 1) };
    hero.querySelector('.next').onclick = function () { go(i + 1) };
    hero.addEventListener('mouseenter', function () { clearInterval(timer) });
    hero.addEventListener('mouseleave', start);
    document.addEventListener('keydown', function (e) { if (e.key === 'ArrowLeft') go(i - 1); if (e.key === 'ArrowRight') go(i + 1) });
    var x0 = null;
    hero.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX }, { passive: true });
    hero.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1); x0 = null });
    go(0);
})();
var f = document.getElementById('contactForm');
if (f) {
    f.addEventListener('submit', function (e) {
        e.preventDefault();
        var b = f.querySelector('button'); b.textContent = 'Sending...';
        fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
            .then(function (r) { if (r.ok) { b.textContent = 'Sent ✓'; f.reset() } else { b.textContent = 'Try again' } })
            .catch(function () { b.textContent = 'Try again' });
    })
}

