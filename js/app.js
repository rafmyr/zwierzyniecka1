/* Zwierzyniecka 1 · sprawdzarka gabarytu i formularz. Bez bibliotek. */
(function () {
  'use strict';

  /* ---------- Limity: zmieniasz tylko tutaj (komunikaty biorą liczby stąd) ---------- */
  var LIMITS = {
    proszek: { w: 140, h: 125, d: 60, minQty: 10 },
    mokro: { w: 200 },
    toczenie: { cnc: 30, uni: 100 }
  };

  var CONTACT = { tel: '32 219 84 62', mail: 'biuro@misiarz.pl' };

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

  var NAMES = { proszek: 'Malowanie proszkowe', mokro: 'Lakierowanie na mokro', toczenie: 'Toczenie / frezowanie' };

  var $ = function (id) { return document.getElementById(id); };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var form = $('checker');
  if (form) {
    var mode = 'proszek';
    var inA = $('in-a'), inB = $('in-b'), inC = $('in-c'), inQ = $('in-q');
    var verdict = $('verdict'), notes = $('notes'), cta = $('check-cta'), live = $('check-live');
    var modeBtns = form.querySelectorAll('.mode');
    var liveTimer = null;
    var announce = false;

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
        var maxTxt = L.w + ' × ' + L.h + ' × ' + L.d + ' cm';
        var have = W !== null && H !== null && D !== null;
        if (!have) add('maybe', 'Wpisz szerokość, wysokość i głębokość w centymetrach.');
        else if (W <= L.w && H <= L.h && D <= L.d) add('ok', 'Mieści się w piecu: ' + maxTxt + '.');
        else {
          var a = [W, H, D].sort(function (x, y) { return y - x; });
          if (a[0] <= L.w && a[1] <= L.h && a[2] <= L.d) add('maybe', 'Mieści się tylko obrócony. Zadzwoń, sprawdzimy, czy da się go tak zawiesić.');
          else add('no', 'Za duży na nasz piec. Maks. ' + maxTxt + '.');
        }
        if (Q === null) add('maybe', 'Ile sztuk? Proszek przyjmujemy od ' + L.minQty + '.');
        else if (Q < L.minQty) add('no', 'Poniżej ' + L.minQty + ' sztuk piec się nie opłaca. Dołóż do partii.');
        else add('ok', Math.round(Q) + ' szt. Powyżej progu ' + L.minQty + ' sztuk.');
        add('maybe', 'Element nowy i czysty, bez rdzy i starego lakieru? Inaczej nie przyjmiemy.');
        decided = have && Q !== null;
      } else if (mode === 'mokro') {
        var M = LIMITS.mokro;
        if (W === null) add('maybe', 'Wpisz szerokość w centymetrach.');
        else if (W <= M.w) add('ok', 'Szerokość mieści się w kabinie (' + M.w + ' cm).');
        else add('no', 'Za szeroki. Kabina ma ' + M.w + ' cm szerokości.');
        add('maybe', (H !== null || D !== null || Q !== null)
          ? 'Wysokość, głębokość i ilość przeniesiemy do zapytania. Potwierdzimy je przy wycenie.'
          : 'Wysokość, głębokość i ilość potwierdzimy przy wycenie.');
        add('maybe', 'Drewno, sklejka, MDF albo metal. Lakiery wodne bez zapachu.');
        decided = W !== null;
      } else {
        var T = LIMITS.toczenie;
        if (W === null) add('maybe', 'Wpisz długość detalu w centymetrach.');
        else if (W <= T.cnc) add('ok', 'Do ' + T.cnc + ' cm długości: automat CNC albo maszyny uniwersalne.');
        else if (W <= T.uni) add('ok', 'Do ' + T.uni + ' cm długości: tokarka lub frezarka uniwersalna.');
        else add('no', 'Ponad ' + T.uni + ' cm długości. Tego nie obrobimy.');
        add('ok', Q !== null ? Math.round(Q) + ' szt. Bez minimum, robimy nawet jedną sztukę.' : 'Bez minimum. Nawet jedna sztuka.');
        add('maybe', (H !== null || D !== null)
          ? 'Średnicę i wysokość przeniesiemy do zapytania. Przyślij też rysunek, szkic z wymiarami albo wzór.'
          : 'Średnicę i resztę wymiarów potwierdzimy przy wycenie. Przyślij rysunek, szkic z wymiarami albo wzór.');
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
        var sr = document.createElement('span');
        sr.className = 'sr';
        sr.textContent = SR[i.kind];
        t.appendChild(sr);
        t.appendChild(document.createTextNode(i.text));
        li.appendChild(t);
        notes.appendChild(li);
      });
      cta.hidden = state !== 'ok';

      /* Czytnik ekranu dostaje tylko werdykt i powody odmowy, z opóźnieniem, żeby nie mówił po każdym klawiszu */
      if (announce && live) {
        clearTimeout(liveTimer);
        var msg = verdict.textContent + ' ' + items
          .filter(function (i) { return i.kind === 'no'; })
          .map(function (i) { return i.text; }).join(' ');
        liveTimer = setTimeout(function () { live.textContent = msg.trim(); }, 800);
      }
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

    /* Przycisk „Wyślij zapytanie z tymi wymiarami” przenosi dane do formularza i ustawia kursor */
    cta.addEventListener('click', function (e) {
      var opis = $('opis');
      var inquiry = $('inquiry');
      if (!opis || !inquiry) return;
      e.preventDefault();

      var dims = [inA.value, inB.value, inC.value].map(function (v) { return v.trim(); }).filter(Boolean).join(' × ');
      var line = NAMES[mode] + ':';
      if (dims) line += ' ' + dims + ' cm';
      if (inQ.value.trim()) line += ', ' + inQ.value.trim() + ' szt.';
      var auto = line + '\nMateriał: \nKolor: \nTermin: ';

      if (!opis.value.trim() || opis.value === opis.dataset.auto) {
        opis.value = auto;
        opis.dataset.auto = auto;
      } else if (opis.value.indexOf(line) === -1) {
        opis.value = line + '\n' + opis.value;
        opis.dataset.auto = '';
      }

      var target = null;
      inquiry.querySelectorAll('input[required]').forEach(function (el) {
        if (!target && !el.value.trim()) target = el;
      });
      target = target || opis;
      $('kontakt').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      target.focus({ preventScroll: true });
    });

    render();
    announce = true;
  }

  /* ---------- Formularz zapytania ----------
     Dopóki action wskazuje na mailto, formularz otwiera program pocztowy i kopiuje treść do schowka.
     Po podpięciu Formspree (instrukcja w README) wysyła w tle. */
  var inq = $('inquiry');
  if (inq) {
    var status = $('form-status');
    var setStatus = function (state, text) { status.dataset.state = state; status.textContent = text; };
    var fallbackHelp = 'zadzwoń: ' + CONTACT.tel + ' albo napisz na ' + CONTACT.mail + '.';

    inq.addEventListener('submit', function (e) {
      if (!inq.checkValidity()) return;
      e.preventDefault();
      var fd = new FormData(inq);

      if (fd.get('_gotcha')) {
        inq.reset();
        setStatus('ok', 'Dostaliśmy zapytanie.');
        return;
      }

      var configured = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9]+$/.test(inq.getAttribute('action') || '');

      if (!configured) {
        var body = 'Firma: ' + fd.get('firma') + '\nNIP: ' + fd.get('nip') + '\nTelefon: ' + fd.get('telefon') +
          '\nE-mail: ' + (fd.get('email') || '-') + '\n\n' + fd.get('opis');
        var copied = navigator.clipboard && navigator.clipboard.writeText
          ? navigator.clipboard.writeText(body).then(function () { return true; }, function () { return false; })
          : Promise.resolve(false);
        window.location.href = 'mailto:' + CONTACT.mail + '?subject=' + encodeURIComponent('Zapytanie: ' + fd.get('firma')) +
          '&body=' + encodeURIComponent(body);
        copied.then(function (ok) {
          setStatus('', 'Otwieramy program pocztowy z gotową wiadomością. Zapytanie dojdzie dopiero, gdy klikniesz w nim „Wyślij”. ' +
            'Jeśli program się nie otworzył, ' + (ok ? 'treść jest już w schowku: wklej ją w wiadomość do ' + CONTACT.mail + ' albo zadzwoń: ' + CONTACT.tel + '.' : fallbackHelp));
        });
        return;
      }

      var btn = inq.querySelector('button[type="submit"]');
      btn.disabled = true;
      setStatus('', 'Wysyłamy…');
      fetch(inq.getAttribute('action'), { method: 'POST', body: fd, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error(r.status);
          inq.reset();
          setStatus('ok', 'Dostaliśmy zapytanie. Odezwiemy się w godzinach pracy, pon.–pt. 7:00–15:00.');
        })
        .catch(function () {
          setStatus('err', 'Nie udało się wysłać. ' + fallbackHelp.charAt(0).toUpperCase() + fallbackHelp.slice(1));
        })
        .then(function () { btn.disabled = false; });
    });
  }
})();
