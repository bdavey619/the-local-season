/**
 * The Local Season — page renderer
 *
 * Reads a PAGE object (defined in the HTML before this script runs) and
 * builds the full page inside <div id="page-root">. All content is driven
 * by the PAGE data — no hardcoded copy lives here.
 *
 * To add a new city-month:
 *   1. Copy san-diego-september.html (or any existing page) to a new file
 *   2. Replace the PAGE object with new city data — see the schema comments
 *   3. All rendering is automatic
 *
 * Next.js conversion path:
 *   - PAGE → a typed CityMonth data module in content/[city]-[month].ts
 *   - Each render function → a React component
 *   - CSS custom properties → Tailwind theme tokens via tailwind.config.ts
 *   - accentColor → a per-archetype theme variant
 */
(function () {

  // Override accent colours declared in PAGE
  if (PAGE.accentColor) {
    var root = document.documentElement;
    root.style.setProperty('--accent', PAGE.accentColor);
    root.style.setProperty('--accent-dim', PAGE.accentColorDim || 'rgba(0,0,0,0.08)');
  }

  document.title = PAGE.city + ' — ' + PAGE.month + ' \xB7 The Local Season';

  // Escape HTML entities in editorial strings
  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // ── Section builders ─────────────────────────────────────────────

  function nav() {
    return (
      '<nav class="site-nav">' +
        '<span class="site-nav__brand">The Local Season</span>' +
        '<span class="site-nav__label">A city is different every month</span>' +
      '</nav>'
    );
  }

  function hero(p) {
    return (
      '<header class="hero">' +
        '<div class="container">' +
          '<div class="hero__meta">' +
            '<span class="eyebrow">' + esc(p.city) + ' \xB7 ' + esc(p.month) + '</span>' +
            '<span class="archetype-badge">' + esc(p.archetype) + '</span>' +
          '</div>' +
          '<h1 class="hero__city">' + esc(p.city) + '<br/>— ' + esc(p.month) + '</h1>' +
          '<p class="hero__storyline">' + esc(p.storyline) + '</p>' +
          '<p class="hero__thesis">“' + esc(p.thesis) + '”</p>' +
        '</div>' +
      '</header>'
    );
  }

  function framing() {
    return (
      '<section class="framing">' +
        '<div class="container">' +
          '<p class="framing__text">' +
            "Travel isn't just where you go.<br/>" +
            "It's how a place <em>changes the way you live.</em>" +
          '</p>' +
        '</div>' +
      '</section>'
    );
  }

  function sceneAnchors(anchors) {
    if (!anchors || !anchors.length) return '';
    return (
      '<div class="scene-anchors">' +
      anchors.map(function (a) {
        return (
          '<div class="scene-anchor">' +
            '<p class="scene-anchor__place">' + esc(a.place) + '</p>' +
            '<p class="scene-anchor__text">' + esc(a.text) + '</p>' +
          '</div>'
        );
      }).join('') +
      '</div>'
    );
  }

  function section(heading, body, extra) {
    return (
      '<article class="section">' +
        '<h2 class="section__heading">' + esc(heading) + '</h2>' +
        '<div class="section__body"><p>' + esc(body) + '</p>' + (extra || '') + '</div>' +
      '</article>'
    );
  }

  function localWord(lw) {
    var pronHTML = lw.pronunciation
      ? ' <span class="word-section__pronunciation">' + esc(lw.pronunciation) + '</span>'
      : '';
    return (
      '<div class="container">' +
        '<div class="word-section">' +
          '<div class="word-section__label"><p class="eyebrow">A word for it</p></div>' +
          '<div>' +
            '<p class="word-section__term">' + esc(lw.term) + pronHTML + '</p>' +
            '<p class="word-section__def">' + esc(lw.translation) + '</p>' +
            '<p class="word-section__body">' + esc(lw.body) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function oneLine(p) {
    return (
      '<section class="one-line">' +
        '<div class="container">' +
          '<p class="eyebrow one-line__label">One line to remember</p>' +
          '<p class="one-line__text">“' + esc(p.remember) + '”</p>' +
        '</div>' +
      '</section>'
    );
  }

  function seasonalContrast(p) {
    var sc = p.seasonalContrast;
    return (
      '<section class="seasonal-contrast">' +
        '<div class="container">' +
          '<p class="seasonal-contrast__title">' + esc(sc.title) + '</p>' +
          '<div class="seasonal-contrast__grid">' +
          sc.items.map(function (item) {
            var cls = 'seasonal-contrast__item' +
              (item.current ? ' seasonal-contrast__item--current' : '');
            return (
              '<div class="' + cls + '">' +
                '<p class="seasonal-contrast__label">' + esc(item.label) + '</p>' +
                '<p class="seasonal-contrast__body">' + esc(item.body) + '</p>' +
              '</div>'
            );
          }).join('') +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function exploreNext(p) {
    return (
      '<section class="explore">' +
        '<div class="container container--wide">' +
          '<div class="explore__header"><p class="eyebrow">Explore next</p></div>' +
          '<div class="explore__grid">' +
          p.next.map(function (n) {
            return (
              '<a class="explore__card" href="' + esc(n.href || '#') + '">' +
                '<p class="explore__card-city">' + esc(n.city) + ' — ' + esc(n.month) + '</p>' +
                '<p class="explore__card-storyline">' + esc(n.storyline) + '</p>' +
                '<span class="explore__card-arrow">Read →</span>' +
              '</a>'
            );
          }).join('') +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  function footer() {
    return (
      '<footer class="site-footer">' +
        '<div class="container container--wide" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;width:100%;">' +
          '<span class="site-footer__brand">The Local Season</span>' +
          '<span class="site-footer__copy">A city is different every month. Travel is not just where you go.</span>' +
        '</div>' +
      '</footer>'
    );
  }

  function sections(p) {
    return (
      '<main class="sections">' +
        // The Scene + What locals are doing share one container
        '<div class="container">' +
          section('The Scene', p.scene, sceneAnchors(p.sceneAnchors)) +
          section('What locals are doing', p.locals) +
        '</div>' +

        // Local word: full-bleed within its own container
        localWord(p.localWord) +

        // Remaining editorial sections
        '<div class="container">' +
          section('What changes', p.changes) +
          section('What you start doing', p.start) +
          section('What you stop controlling', p.stop) +
          section('What returns', p.returns) +
        '</div>' +
      '</main>'
    );
  }

  // ── Assemble and inject ──────────────────────────────────────────

  document.getElementById('page-root').innerHTML = (
    nav() +
    hero(PAGE) +
    framing() +
    sections(PAGE) +
    oneLine(PAGE) +
    seasonalContrast(PAGE) +
    exploreNext(PAGE) +
    footer()
  );

}());
