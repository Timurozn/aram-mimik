# ARAM Mimik

Strafen-Glücksrad, Punktetabelle und Rangliste für unsere ARAM-Runden.

- **Glücksrad:** Optionen mit Anzahl 0–20. Jedes Feld ist gleich groß, Anzahl 0 nimmt eine Option aus dem Rad. Der Zufall kommt aus dem Browser (`crypto.getRandomValues`). Beim Drehen Klick-Sound und anschwellendes „Ooooh“, beim Ergebnis Knall, Fanfare, Jubel, Feuerwerk und Konfetti. Ton lässt sich unter dem Rad abschalten.
- **Punkte:** Platz nach Schaden je Spiel (1. = 5 P … 5. = 1 P), bis zu 4 Spiele pro Runde. „Runde beenden" ermittelt die Mimik und überträgt Spiele und Punkte in die Rangliste.
- **Rangliste:** Spiele, Runden, Punkte, Punkte-%, Mimiks, Mimik-Quote, dazu der Verlauf aller Runden.
- **? (Super-Mimik):** eigenes Glücksrad mit allen Optionen aus dem normalen Rad (je ein Feld, alles mit „doppelt“ im Namen ausgenommen) plus „Flasche sitzen“ als festes letztes Feld. Neue Optionen landen automatisch mit drin.

Die Seite ist eine einzelne `index.html` ohne Abhängigkeiten. Auf GitHub Pages speichert sie die Eingaben im Browser des jeweiligen Geräts.
