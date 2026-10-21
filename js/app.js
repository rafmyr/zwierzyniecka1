/* Zwierzyniecka 1 · sprawdzarka gabarytu i formularz. Bez bibliotek. */
(function () {
  'use strict';

  /* ---------- Limity: zmieniasz tylko tutaj ---------- */
  var LIMITS = {
    proszek: { w: 140, h: 125, d: 60, minQty: 10 },
    mokro: { w: 200 },
    toczenie: { cnc: 30, uni: 100 }
  };

  var ICONS = {
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    no: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    maybe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 16.5v.01M12 13c0-2 2.5-2 2.5-4a2.5 2.5 0 0 0-5 0"/></svg>'
  };
  var SR = { ok: 'Tak: ', no: 'Nie: ', maybe: 'Do sprawdzenia: ' };

  var LABELS = {
    proszek: ['Szerokość, cm', 'Wysokość, cm', 'Głębokość, cm'],
    mokro: ['Szerokość, cm', 'Wysokość (opc.)', 'Głębokość (opc.)'],
    toczenie: ['Długość, cm', 'Średnica (opc.)', 'Wysokość (opc.)']
  };

  var form = document.getElementById('checker');
  if (form) {
    var mode = 'proszek';
    var $ = function (id) { return document.getElementById(id); };
    var inA = $('in-a'), inB = $('in-b'), inC = $('in-c'), inQ = $('in-q');
    var verdict = $('verdict'), notes = $('notes'), cta = $('check-cta');
    var modeBtns = form.querySelectorAll('.mode');

    var num = function (el) {
      var x = parseFloat(String(el.value).replace(',', '.'));
      return isFinite(x) && x > 0 ? x : null;
    };

    var render = function () {
      var W = num(inA), H = num(inB), D = num(inC), Q = num(inQ);
      var items = [];
      var add = function (kind, text) { items.push({ kind: kind, text: text }); };
      var decided = false;

      if (mode === 'proszek') {
        var L = LIMITS.proszek;
        var have = W !== null && H !== null && D !== null;
        if (!have) add('maybe', 'Wpisz szerokość, wysokość i głębokość w centymetrach.');
        else if (W <= L.w && H <= L.h && D <= L.d) add('ok', 'Mieści się w piecu: 140 × 125 × 60 cm.');
        else {
          var a = [W, H, D].sort(function (x, y) { return y - x; });
          if (a[0] <= L.w && a[1] <= L.h && a[2] <= L.d) add('maybe', 'Mieści się tylko obrócony. Zadzwoń, sprawdzimy, czy da się go tak zawiesić.');
          else add('no', 'Za duży na nasz piec. Maks. 140 × 125 × 60 cm.');
        }
        if (Q === null) add('maybe', 'Ile sztuk? Proszek przyjmujemy od 10.');
        else if (Q < L.minQty) add('no', 'Poniżej 10 sztuk piec się nie opłaca. Dołóż do partii.');
        else add('ok', Math.round(Q) + ' szt. Powyżej progu 10 sztuk.');
        add('maybe', 'Element nowy i czysty, bez rdzy i starego lakieru? Inaczej nie przyjmiemy.');
        decided = have && Q !== null;
      } else if (mode === 'mokro') {
        if (W === null) add('maybe', 'Wpisz szerokość w centymetrach.');
        else if (W <= LIMITS.mokro.w) add('ok', 'Szerokość mieści się w kabinie (200 cm).');
        else add('no', 'Za szeroki. Kabina ma 200 cm szerokości.');
        add('maybe', 'Wysokość, głębokość i ilość potwierdzimy przy wycenie.');
        add('maybe', 'Drewno, sklejka, MDF albo metal. Lakiery wodne bez zapachu.');
        decided = W !== null;
      } else {
        if (W === null) add('maybe', 'Wpisz długość detalu w centymetrach.');
        else if (W <= LIMITS.toczenie.cnc) add('ok', 'Do 30 cm długości: automat CNC albo maszyny uniwersalne.');
        else if (W <= LIMITS.toczenie.uni) add('ok', 'Do 100 cm długości: tokarka lub frezarka uniwersalna.');
        else add('no', 'Ponad 100 cm długości. Tego nie obrobimy.');
        add('ok', 'Bez minimum. Nawet jedna sztuka.');
        add('maybe', 'Średnicę i resztę wymiarów potwierdzimy przy wycenie. Przyślij rysunek, szkic z wymiarami albo wzór.');
        decided = W !== null;
      }

      var anyNo = items.some(function (i) { return i.kind === 'no'; });
      var state = anyNo ? 'no' : (decided ? 'ok' : 'empty');
      verdict.dataset.state = state;
      verdict.textContent = state === 'no' ? 'Coś nie pasuje. Zobacz co.'
        : state === 'ok' ? 'Mieści się w limitach. Wyślij zapytanie.'
        : 'Wpisz wymiary i ilość.';

      notes.innerHTML = '';
      items.forEach(function (i) {
        var li = document.createElement('li');
        li.className = 'k-' + i.kind;
        li.innerHTML = ICONS[i.kind];
        var t = document.createElement('span');
        t.style.color = 'var(--text)';
        var sr = document.createElement('span');
        sr.className = 'sr';
        sr.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)';
        sr.textContent = SR[i.kind];
        t.appendChild(sr);
        t.appendChild(document.createTextNode(i.text));
        li.appendChild(t);
        notes.appendChild(li);
      });
      cta.hidden = state !== 'ok';
    };

    var setMode = function (m) {
      mode = m;
      modeBtns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === m)); });
      var l = LABELS[m];
      $('lab-a').textContent = l[0]; $('lab-b').textContent = l[1]; $('lab-c').textContent = l[2];
      render();
    };

    modeBtns.forEach(function (b) { b.addEventListener('click', function () { setMode(b.dataset.mode); }); });
    form.addEventListener('input', render);
    form.addEventListener('submit', function (e) { e.preventDefault(); });

    /* Przycisk „Wyślij zapytanie z tymi wymiarami” wpisuje dane do formularza */
    cta.addEventListener('click', function () {
      var opis = document.getElementById('opis');
      if (!opis || opis.value.trim()) return;
      var names = { proszek: 'Malowanie proszkowe', mokro: 'Lakierowanie na mokro', toczenie: 'Toczenie / frezowanie' };
      var dims = [inA.value, inB.value, inC.value].filter(function (v) { return v.trim(); }).join(' × ');
      var parts = [names[mode] + ':'];
      if (dims) parts.push(dims + ' cm');
      if (inQ.value.trim()) parts.push(inQ.value.trim() + ' szt.');
      opis.value = parts.join(' ') + '\nMateriał: \nKolor: \nTermin: ';
    });

    render();
  }

  /* ---------- Formularz zapytania ----------
     Dopóki w action jest TWOJ_ID, formularz otwiera program pocztowy (mailto).
     Po podpięciu Formspree (instrukcja w README) wysyła w tle. */
  var inq = document.getElementById('inquiry');
  if (inq) {
    var status = document.getElementById('form-status');
    inq.addEventListener('submit', function (e) {
      if (!inq.checkValidity()) return;
      e.preventDefault();
      var fd = new FormData(inq);
      var configured = inq.action.indexOf('TWOJ_ID') === -1;

      if (!configured) {
        var body = 'Firma: ' + fd.get('firma') + '\nNIP: ' + fd.get('nip') + '\nTelefon: ' + fd.get('telefon') +
          '\nE-mail: ' + (fd.get('email') || '-') + '\n\n' + fd.get('opis');
        window.location.href = 'mailto:biuro@misiarz.pl?subject=' + encodeURIComponent('Zapytanie: ' + fd.get('firma')) +
          '&body=' + encodeURIComponent(body);
        status.dataset.state = 'ok';
        status.textContent = 'Otwieramy Twój program pocztowy z gotową wiadomością. Wystarczy wysłać.';
        return;
      }

      var btn = inq.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.dataset.state = '';
      status.textContent = 'Wysyłamy…';
      fetch(inq.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          inq.reset();
          status.dataset.state = 'ok';
          status.textContent = 'Dostaliśmy zapytanie. Odezwiemy się w godzinach pracy, pon.–pt. 7:00–15:00.';
        })
        .catch(function () {
          status.dataset.state = 'err';
          status.textContent = 'Nie udało się wysłać. Zadzwoń: 32 219 84 62 albo napisz na biuro@misiarz.pl.';
        })
        .then(function () { btn.disabled = false; });
    });
  }
})();
