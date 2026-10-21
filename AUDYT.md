# Audyt jakości (impeccable audit) · 21.10.2026

Audyt objął projekt z kanwy (wersja przed poprawkami) i gotową stronę statyczną (po poprawkach). Sprawdzenie: kod źródłowy, detektor wzorców impeccable, render w Chromium 1440 px i 390 px, pomiar kontrastu i celów dotykowych w wyrenderowanej stronie, test sprawdzarki.

## Wynik

| # | Obszar | Przed | Po | Najważniejsze |
|---|---|---|---|---|
| 1 | Dostępność | 2 | 4 | Kontrast wszystkich tekstów ≥ 4.5:1 w renderze, link „Przejdź do treści”, ikony SVG zamiast znaków ✓ ✕, opisy dla czytników |
| 2 | Wydajność | 1 | 4 | Fonty z własnego serwera (bez Google Fonts), zdjęcia WebP 640/1280 px z srcset i leniwym ładowaniem, preload zdjęcia z hero, ok. 0,4 MB pierwszego widoku na telefonie |
| 3 | Kolory i tokeny | 1 | 3 | Wszystkie kolory w zmiennych `:root`; świadomie tylko ciemny motyw |
| 4 | Responsywność | 2 | 4 | Brak poziomego przewijania przy 390 px, cele dotykowe ≥ 44 px, nawigacja tekstowa chowa się na telefonie, telefon zostaje w pasku |
| 5 | Spójność wykonania | 2 | 4 | Brak niedziałających elementów, formularz działa od pierwszego dnia, istnieje polityka prywatności |
| | **Razem** | **8/20 (słabo)** | **19/20 (bardzo dobrze)** | |

## Co było nie tak (przed) i co zrobiono

**P0 · blokujące start**
- Link do polityki prywatności prowadził do nieistniejącej strony, a formularz zbierał dane osobowe (RODO). → Jest `polityka-prywatnosci.html` z szablonem do uzupełnienia.
- Formularz miał adres-wypełniacz i pole na plik, którego darmowe usługi formularzy nie obsługują. → Formularz bez pliku, działa przez program pocztowy, a po podpięciu Formspree wysyła w tle. Rysunki klient wysyła mailem.

**P1 · poważne**
- Fonty ładowane z Google: wolniej i przekazanie adresu IP do Google (ryzyko RODO). → Fonty na własnym serwerze, przycięte do znaków polskich.
- Zdjęcia JPEG 1600 px bez wariantów rozmiaru, bez leniwego ładowania i bez wymiarów (skaczący układ). → WebP w dwóch rozmiarach, `srcset`, `loading="lazy"`, `width`/`height`.
- Brak SEO: brak opisu strony, danych firmy dla Google, mapy strony, podglądu przy udostępnianiu. → Tytuł i opis pod frazy „lakiernia proszkowa Tychy”, dane strukturalne LocalBusiness z godzinami, adresem i usługami, `sitemap.xml`, `robots.txt`, obrazek do udostępnień, adres kanoniczny.
- Sprawdzarka podawała werdykt znakami ✓ ✕ bez opisu dla czytników ekranu. → Ikony SVG i ukryte opisy „Tak / Nie / Do sprawdzenia”.
- Pasek na telefonie zawijał się do dwóch wierszy i zjadał ekran. → Na telefonie tylko nazwa i przycisk telefonu.

**P2 · drobne**
- Wymagane pola formularza bez oznaczenia. → Gwiazdki i objaśnienie.
- Kolory wpisane na sztywno w kilkudziesięciu miejscach. → Zmienne w jednym miejscu.
- Brak `.htaccess`: brak wymuszenia HTTPS, kompresji i pamięci przeglądarki. → Dodany.
- Napisy-etykiety nad nagłówkami i numeracja „01 / 02 / 03” jako ozdobnik. → Usunięte, nagłówki mówią same za siebie.
- Trzy jednakowe karty usług. → Pełne wiersze z dużą liczbą-gabarytem dla każdej usługi.

## Co zostało (świadomie)

- Detektor zgłasza „brak odstępu” przy pełnych zdjęciach i żółtych pasach. To zamierzone krawędzie, nie błąd.
- Tylko ciemny motyw. Wybrany pod kontrast zdjęć hali i żółtego akcentu.
- [P3] Polityka prywatności wymaga uzupełnienia danych i przejrzenia przez prawnika.
