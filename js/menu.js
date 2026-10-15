(function () {
    /* ---------- Mark the current page in the menu ---------- */
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('header nav a').forEach(function (a) {
        var h = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
        if (h && h === page) { a.classList.add('active'); a.setAttribute('aria-current', 'page') }
    });

    /* ---------- Fade pictures in when they scroll into view ---------- */
    var pics = document.querySelectorAll('.arch .img, .svc-img, .ab-img');
    if ('IntersectionObserver' in window && pics.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target) }
            });
        }, { threshold: .15 });
        pics.forEach(function (p) { p.classList.add('fade-img'); io.observe(p) });
    }

    /* ---------- Mobile menu ---------- */
    var b = document.querySelector('.menu-btn'), n = document.querySelector('header nav');
    if (!b || !n) return;
    function close() { n.classList.remove('open'); b.classList.remove('open'); b.setAttribute('aria-expanded', 'false') }
    b.addEventListener('click', function () {
        var o = n.classList.toggle('open');
        b.classList.toggle('open', o);
        b.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
    n.addEventListener('click', function (e) { if (e.target.tagName === 'A') close() });
    window.addEventListener('resize', function () { if (window.innerWidth > 760) close() });
})();