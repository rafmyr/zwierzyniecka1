# zwierzyniecka1.pl

Statyczna strona usług B2B zaplecza Zakładu Sprzętu Rehabilitacyjnego inż. S. Misiarz (Tychy): malowanie proszkowe, lakierowanie na mokro, obróbka skrawaniem.

Czysty HTML, CSS i JavaScript. Bez WordPressa, bez bazy danych, bez budowania. Działa na każdym zwykłym hostingu.

## Co jest w środku

| Plik / folder | Co to jest |
|---|---|
| `index.html` | Strona główna |
| `polityka-prywatnosci.html` | Polityka prywatności (szablon do uzupełnienia) |
| `404.html` | Strona „nie ma takiej strony” |
| `css/style.css` | Wygląd. Kolory zmieniasz na górze pliku, w sekcji `:root` |
| `js/app.js` | Sprawdzarka wymiarów i wysyłka formularza. Limity (140/125/60, 10 szt., 200 cm, 30/100 cm) są na górze pliku |
| `img/` | Zdjęcia w formacie WebP, każde w dwóch rozmiarach |
| `fonts/` | Fonty Archivo i JetBrains Mono (licencja OFL, pliki licencji obok) |
| `.htaccess` | HTTPS, kompresja, pamięć przeglądarki, strona 404 |
| `robots.txt`, `sitemap.xml` | Dla Google |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Ikonki |
| `AUDYT.md` | Wynik audytu jakości |

## Wgranie na hosting, krok po kroku

1. Kup domenę `zwierzyniecka1.pl` i podepnij ją pod hosting (u większości firm robi się to jednym kliknięciem w panelu).
2. Włącz w panelu hostingu darmowy certyfikat SSL (Let's Encrypt). Bez tego `.htaccess` przekieruje na https, które nie zadziała.
3. Pobierz to repozytorium jako ZIP: na GitHubie zielony przycisk **Code** → **Download ZIP**. Rozpakuj.
4. Wgraj **całą zawartość** folderu (nie sam folder) do katalogu strony na serwerze, zwykle `public_html` albo `www`. Użyj menedżera plików w panelu hostingu albo programu FTP (np. FileZilla).
5. Upewnij się, że wgrał się plik `.htaccess`. Jest ukryty (zaczyna się od kropki), w FileZilli włącz „Pokaż ukryte pliki”.
6. Otwórz `https://zwierzyniecka1.pl` na telefonie i komputerze.

**Czego NIE robić:** nie wgrywaj pliku `README.md` ani `AUDYT.md`, jeśli nie chcesz, żeby były publiczne (nic złego się nie stanie, ale nie są potrzebne). Nie zmieniaj nazw folderów `css`, `js`, `img`, `fonts`.

## Co trzeba podmienić przed startem

Szukaj w plikach tekstu w nawiasach kwadratowych:

| Placeholder | Gdzie | Na co |
|---|---|---|
| `[NAZWA FIRMY]`, `[NIP]` | `index.html` (stopka) | Nazwa i NIP do faktur |
| `[NAZWA ADMINISTRATORA]` | `index.html` (zgoda pod formularzem), `polityka-prywatnosci.html` | Kto jest administratorem danych |
| `[ADRES ADMINISTRATORA]`, `[DOPRECYZUJ OKRES]`, `[NAZWA HOSTINGU]`, `[NAZWA DOSTAWCY FORMULARZA]` | `polityka-prywatnosci.html` | Uzupełnij i daj prawnikowi do przejrzenia |
| `TWOJ_ID` | `index.html`, formularz | Identyfikator z Formspree, patrz niżej |

Usuń też z `polityka-prywatnosci.html` pogrubiony akapit „Uwaga dla właściciela strony”.

## Formularz zapytania

Strona nie ma własnego serwera do wysyłki maili, więc formularz działa na dwa sposoby:

- **Od razu, bez konfiguracji:** po kliknięciu „Wyślij zapytanie” otwiera się program pocztowy klienta z gotową wiadomością na biuro@misiarz.pl. Klient musi tylko kliknąć „Wyślij”.
- **Po podpięciu Formspree (zalecane):** wiadomość wysyła się w tle, klient zostaje na stronie.

Podpięcie Formspree:

1. Załóż konto na formspree.io (plan darmowy: ok. 50 zgłoszeń miesięcznie).
2. Utwórz nowy formularz, jako adres docelowy podaj biuro@misiarz.pl i potwierdź go mailem.
3. Skopiuj identyfikator formularza (ciąg znaków po `/f/` w adresie, np. `xabcdefg`).
4. W `index.html` znajdź `https://formspree.io/f/TWOJ_ID` i zamień `TWOJ_ID` na swój identyfikator.
5. Wgraj zmieniony `index.html` na serwer i wyślij testowe zapytanie.
6. Dopisz Formspree w polityce prywatności jako dostawcę formularza.

## Po starcie strony (żeby ktoś ją znalazł)

1. Załóż **Profil Firmy w Google** (dawniej Google Moja Firma) dla „Zwierzyniecka 1”, kategoria „Lakiernia proszkowa” plus usługi „Obróbka skrawaniem”. To jest główne źródło klientów z wyszukiwania „malowanie proszkowe Tychy”, ważniejsze niż sama strona.
2. Dodaj stronę w Google Search Console i zgłoś `https://zwierzyniecka1.pl/sitemap.xml`.
3. Przy pierwszych zleceniach zrób zdjęcia gotowych detali: rząd elementów na wieszakach przed piecem, świeżo pomalowany wspornik w dłoni, wiór schodzący z noża tokarki. Strona na nich zyska najwięcej.

## Zmiany w treści

Teksty są w `index.html`. Każda zmiana w liczbach (gabaryty, minimum sztuk) wymaga poprawki w trzech miejscach: tekst w `index.html`, limity na górze `js/app.js` i opis w `<script type="application/ld+json">` w `index.html`.
