# ARAM Mimik

Strafen-Glücksrad, Punktetabelle, Rangliste und Super-Mimik für unsere ARAM-Runden.

- **Glücksrad:** Optionen mit Anzahl 0–20, jedes Feld gleich groß, Zufall aus dem Browser (`crypto.getRandomValues`). Das Ergebnis steht beim Drehen fest; Zitterphase, Trommelwirbel und Herzschlag sind nur Show.
- **Punkte:** Platz nach Schaden je Spiel (1. = 5 P … 5. = 1 P). Schalter „Doppelt“: Die Mimik der Runde zählt als 2. Gleichstand beim Letzten: 2 Spieler → 1 gegen 1, ab 3 Spielern → automatisch ein Zusatzspiel (bis Spiel 8).
- **Rangliste / Bestenliste:** aktuelle Rangliste mit Verlauf; „Rangliste beenden“ (4 Bestätigungen) bestimmt die Super-Mimik (meiste Mimiks, Gleichstand per Duell) und schiebt alles in die Bestenliste.
- **Super-Mimik:** Enthüllung mit eigener Stadion-Hymne, danach Abhakliste aller Mimiks, „Flasche sitzen“ als Finale.

Alle Klänge und Musikstücke werden im Browser erzeugt und sind eigene Kompositionen.
Die Seite ist eine einzelne `index.html`. Alle Eingaben liegen in einer Firebase Realtime Database (europe-west1) unter `spieler`, `rad`, `runden` und `super` und sind für alle mit dem Link live sichtbar und bearbeitbar.
