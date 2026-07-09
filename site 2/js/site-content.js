// Fills in editable site text from /data/site-content.json
// Edit these values via /admin -> Site Settings (no code needed)
(function () {
  fetch('/data/site-content.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      document.querySelectorAll('[data-content]').forEach(function (el) {
        var key = el.getAttribute('data-content');
        if (data[key] !== undefined) {
          el.textContent = data[key];
        }
      });
      // Special case: contact email is both text and a mailto href
      var mail = document.querySelector('[data-content-email]');
      if (mail && data.contact_email) {
        mail.textContent = data.contact_email;
        mail.setAttribute('href', 'mailto:' + data.contact_email);
      }
    })
    .catch(function () { /* leave static fallback text in place */ });
})();
