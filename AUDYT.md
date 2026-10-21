# Audyt zwierzyniecka1.pl

Stan po poprawkach z 21.10.2026.

## Naprawione

- **Formularz:** domyślnie `mailto:` z gotową wiadomością i kopią w schowku. Formspree włącza się sam po wpisaniu poprawnego adresu w `action`. Działa walidacja z komunikatami przy polach i pole-pułapka na boty.
- **Dane firmy:** Zakład Sprzętu Rehabilitacyjnego inż. S. Misiarz, ul. Zwierzyniecka 1, 43-100 Tychy, NIP 6461129924. Są w stopce, w polityce prywatności i w danych strukturalnych (JSON-LD).
- **RODO:** polityka bez placeholderów. Ma administratora, okresy przechowywania i transfer do USA (Vercel). Pole zgody zastąpiła klauzula informacyjna, bo podstawą jest art. 6 ust. 1 lit. b/f.
- **Dostępność:** klasy `.sr` i `.hp`, widoczny fokus na żółtym tle, `prefers-reduced-motion` także dla płynnego przewijania, czytelne wymiary dla czytników ekranu.
- **Hosting na Vercelu:** `vercel.json` (www → bez www, `/index.html` → `/`, nagłówki bezpieczeństwa, pamięć przeglądarki), `.vercelignore` ukrywa README, AUDYT i `.htaccess`.
- **Porządki:** wersjonowanie `?v=3` dla CSS i JS na wszystkich stronach, usunięte nieużywane style, brak stylów inline.

## Do zrobienia przez właściciela

1. Dodać domeny `zwierzyniecka1.pl` i `www.zwierzyniecka1.pl` w Vercel → Settings → Domains.
2. Opcjonalnie podpiąć Formspree (instrukcja w README) i dopisać go w polityce prywatności.
3. Dać politykę prywatności do przejrzenia prawnikowi.
4. Po kilku tygodniach bez zgłoszeń w konsoli zamienić w `vercel.json` `Content-Security-Policy-Report-Only` na `Content-Security-Policy`.
5. Założyć Profil Firmy w Google i zgłosić sitemapę w Search Console.
