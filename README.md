# zwierzyniecka1.pl

Statyczna strona usług B2B zaplecza Zakładu Sprzętu Rehabilitacyjnego inż. S. Misiarz (ul. Zwierzyniecka 1, 43-100 Tychy, NIP 6461129924): malowanie proszkowe, lakierowanie na mokro, obróbka skrawaniem.

Czysty HTML, CSS i JavaScript. Bez WordPressa, bez bazy danych, bez budowania. Hostowana na Vercelu, ale działa też na każdym zwykłym hostingu.

## Co jest w środku

| Plik / folder | Co to jest |
|---|---|
| `index.html` | Strona główna |
| `polityka-prywatnosci.html` | Polityka prywatności |
| `404.html` | Strona „nie ma takiej strony” |
| `css/style.css` | Wygląd. Kolory zmieniasz na górze pliku, w sekcji `:root` |
| `js/app.js` | Sprawdzarka wymiarów i wysyłka formularza. Limity (140/125/60, 10 szt., 200 cm, 30/100 cm) są na górze pliku |
| `img/` | Zdjęcia w formacie WebP, każde w dwóch rozmiarach |
| `fonts/` | Fonty Archivo i JetBrains Mono (licencja OFL, pliki licencji obok) |
| `vercel.json` | Vercel: przekierowanie www, nagłówki bezpieczeństwa, pamięć przeglądarki |
| `.vercelignore` | Pliki, których Vercel nie publikuje (README, AUDYT, `.htaccess`) |
| `.htaccess` | To samo co `vercel.json`, ale dla hostingu na Apache |
| `robots.txt`, `sitemap.xml` | Dla Google |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Ikonki |
| `AUDYT.md` | Wynik audytu jakości |

## Publikacja

**Vercel (obecnie):** każda zmiana na gałęzi `main` publikuje się sama. Domenę `zwierzyniecka1.pl` i `www.zwierzyniecka1.pl` dodaj w ustawieniach projektu na Vercelu (Settings → Domains). Certyfikat HTTPS Vercel wystawia sam.

**Zwykły hosting (Apache):** wgraj całą zawartość folderu do `public_html`, razem z ukrytym plikiem `.htaccess` (w FileZilli włącz „Pokaż ukryte pliki”). Wcześniej włącz w panelu darmowy certyfikat SSL.

## Po zmianie CSS albo JS

Podbij numer wersji w odnośnikach `?v=3` (w `index.html`, `polityka-prywatnosci.html` i `404.html`), np. na `?v=4`. Inaczej przeglądarki przez tydzień mogą pokazywać starą wersję.

## Formularz zapytania

Strona nie ma własnego serwera do wysyłki maili, więc formularz działa na dwa sposoby:

- **Teraz, bez konfiguracji:** po kliknięciu „Wyślij zapytanie” otwiera się program pocztowy klienta z gotową wiadomością na biuro@misiarz.pl, a treść trafia też do schowka. Klient musi kliknąć „Wyślij” w swojej poczcie.
- **Po podpięciu Formspree (zalecane):** wiadomość wysyła się w tle, klient zostaje na stronie.

Podpięcie Formspree:

1. Załóż konto na formspree.io (plan darmowy: ok. 50 zgłoszeń miesięcznie).
2. Utwórz nowy formularz, jako adres docelowy podaj biuro@misiarz.pl i potwierdź go mailem.
3. Skopiuj identyfikator formularza (ciąg znaków po `/f/`, np. `xabcdefg`).
4. W `index.html` w `<form id="inquiry">` zmień `action="mailto:biuro@misiarz.pl"` na `action="https://formspree.io/f/xabcdefg"`. Skrypt sam wykryje adres Formspree.
5. W `polityka-prywatnosci.html` dopisz Formspree (USA) w sekcji „Komu przekazujemy dane”.
6. Wyślij testowe zapytanie.

## Po starcie strony (żeby ktoś ją znalazł)

1. Załóż **Profil Firmy w Google** dla „Zwierzyniecka 1”, kategoria „Lakiernia proszkowa” plus usługa „Obróbka skrawaniem”. To główne źródło klientów z wyszukiwania „malowanie proszkowe Tychy”.
2. Dodaj stronę w Google Search Console i zgłoś `https://zwierzyniecka1.pl/sitemap.xml`.
3. Przy pierwszych zleceniach zrób zdjęcia gotowych detali: rząd elementów na wieszakach przed piecem, świeżo pomalowany wspornik w dłoni, wiór schodzący z noża tokarki.

## Zmiany w treści

Teksty są w `index.html`. Każda zmiana w liczbach (gabaryty, minimum sztuk) wymaga poprawki w trzech miejscach: tekst w `index.html`, limity na górze `js/app.js` i opis w `<script type="application/ld+json">` w `index.html`.
