# ARAM Mimik

Strafen-Glücksrad, Punktetabelle und Rangliste für unsere ARAM-Runden.

- **Glücksrad:** Optionen mit Anzahl 0–20. Jedes Feld ist gleich groß, Anzahl 0 nimmt eine Option aus dem Rad. Der Zufall kommt aus dem Browser (`crypto.getRandomValues`). Beim Drehen Klick-Sound und anschwellendes „Ooooh“, beim Ergebnis Knall, Fanfare, Jubel, Feuerwerk und Konfetti. Ton lässt sich unter dem Rad abschalten.
- **Punkte:** Platz nach Schaden je Spiel (1. = 5 P … 5. = 1 P), bis zu 4 Spiele pro Runde. „Runde beenden" ermittelt die Mimik und überträgt Spiele und Punkte in die Rangliste.
- **Rangliste:** Spiele, Runden, Punkte, Punkte-%, Mimiks, Mimik-Quote, dazu der Verlauf aller Runden.
- **Super-Mimik:** Abhakliste mit allen Optionen aus dem Glücksrad (auch Anzahl 0, alles mit „doppelt“ im Namen ausgenommen), der Reihe nach abzuhaken; „Flasche sitzen“ ist immer das Finale. Neue Optionen landen automatisch mit drin.

Die Seite ist eine einzelne `index.html`. Alle Eingaben liegen in einer Firebase Realtime Database (europe-west1) und sind für alle mit dem Link live sichtbar und bearbeitbar.
