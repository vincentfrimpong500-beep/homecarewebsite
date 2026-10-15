(function () {
    var f = document.getElementById('contactForm');
    if (!f) return;
    var note = document.getElementById('formNote'), b = f.querySelector('button');
    f.addEventListener('submit', function (e) {
        e.preventDefault();
        b.disabled = true; b.textContent = 'Sending...'; note.textContent = '';
        fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
            .then(function (r) {
                if (r.ok) { f.reset(); b.textContent = 'Send Message'; note.textContent = 'Thank you! Your message was sent. We will contact you soon.' }
                else { b.textContent = 'Send Message'; note.textContent = 'Sorry, something went wrong. Please try again or call us.' }
            })
            .catch(function () { b.textContent = 'Send Message'; note.textContent = 'Could not send. Check your connection or call us.' })
            .then(function () { b.disabled = false });
    });
})();