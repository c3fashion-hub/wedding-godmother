// Renders Tales from the Aisle episodes from /data/episodes.json
// Newest episodes first. Add episodes via /admin - no code needed.
(function () {
  var grids = document.querySelectorAll('[data-episodes]');
  if (!grids.length) return;

  fetch('/data/episodes.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var eps = (data.episodes || []).slice().sort(function (a, b) {
        return (b.date || '').localeCompare(a.date || '');
      });

      grids.forEach(function (grid) {
        var limit = parseInt(grid.getAttribute('data-limit') || '0', 10);
        var list = limit > 0 ? eps.slice(0, limit) : eps;
        grid.innerHTML = list.map(function (ep) {
          var href = ep.video_url || ep.link_url || '#';
          return '<a class="episode" href="' + href + '"' + (ep.video_url ? ' target="_blank" rel="noopener"' : '') + '>' +
            '<div class="episode-frame"><span class="ep-tag">' + ep.number + '</span><span class="play">\u25B6</span></div>' +
            '<h3>' + ep.title + '</h3>' +
            '<span class="verdict">"' + ep.verdict + '"</span>' +
            (ep.link_label ? '<span class="ep-link">' + ep.link_label + '</span>' : '') +
          '</a>';
        }).join('');
      });
    })
    .catch(function () { /* leave static fallback */ });
})();
