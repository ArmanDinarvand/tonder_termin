# Seite 100 – Termin-Testseite

[English](README.md) · **Deutsch** · [فارسی](README-FA.md)

Startseite: `index.html`. Einstellungen: `Settings.html`.

Nur den Ordner `Seite100` als statische Website veröffentlichen (kein Build, kein Backend). Die Chrome-Erweiterung liegt getrennt im Nachbarordner `Buchungshelfer-Chrome` und gehört nicht zum Website-Deployment.

## Verhalten

Die Website zeigt Termine und ein leeres Kontaktformular. Sie wählt keine Termine, füllt keine Felder aus und aktualisiert sich nicht automatisch. Die Seite übernimmt die eingestellte Freigabe erst beim Neuladen. Der erste Confirm-Versuch scheitert absichtlich mit der gespeicherten Original-Fehlermeldung und `Select another time`; der nächste verfügbare Termin kann bestätigt werden. Erfolg führt auf `Success.html`.

In `Settings.html` nur die Freigabezeit einstellen. Das Testfenster bleibt fünf Minuten offen. Die Einstellung wird im lokalen Speicher desselben Browsers und derselben Website gespeichert. Einstellungen und Terminseite in zwei Tabs desselben Chrome-Profils öffnen. Andere Geräte oder Browser teilen diese Einstellung nicht. Erneutes Speichern beginnt einen neuen Testlauf.

Die zwölf vergebenen Tage und vier späteren Tage stammen aus der abgelesenen Referenz. Die sieben Uhrzeiten und ihre drei Zeilen entsprechen dem bereitgestellten Screenshot: 9:30 / 9:45, 10:15 / 10:30, 11:00 / 11:15 / 11:45 a.m. Diese statische Testseite bildet keine Konkurrenz zwischen mehreren Nutzern ab.

## Separater Helfer

Die Erweiterung wird in Chrome unter `chrome://extensions` über Entwicklermodus > Entpackte Erweiterung laden aus dem Ordner `Buchungshelfer-Chrome` geladen. Sie arbeitet auf der veröffentlichten HTTP-/HTTPS-Testseite. In der Erweiterung Test3 als Datei laden, gewünschten Tag und 10:15 auswählen und starten. Sie lädt die Seite alle zehn Sekunden neu, solange die gewünschte Uhrzeit gesperrt ist. Bei einer eindeutigen Konfliktmeldung wählt sie eine andere freie Uhrzeit und versucht erneut. Bei Erfolg, unklarem Fehler, Zeitlimit oder erschöpfter Auswahl stoppt sie.

Eigene Kontaktdaten befinden sich nicht in diesem Projekt. Die Originaldatei Test3 nicht veröffentlichen. Die Erweiterung liest sie erst auf deinem Rechner. Die aktuelle Version unterstützt keine echten Buchungen auf frontdesksuite.com.

Ausführliche persische Anleitung: [README-FA.md](README-FA.md).

## Prüfung

Automatisierte Tests der Zustandslogik, simulierten DOM-Bedienung und Chrome-Nachrichtensteuerung liegen getrennt in `../Pruefung`. Ein vollständiger Lauf einschließlich Fehlerseite und zweitem erfolgreichen Versuch wurde dort geprüft. Ein sichtbarer Test der installierten Erweiterung in Chrome steht noch aus. Keine Zusage einer Buchung innerhalb von fünf Sekunden.
## Direkt zu GitHub pushen

Repository: https://github.com/ArmanDinarvand/tonder_termin

Die Dateien aus `Seite100` gehören direkt in dieses Website-Repository. ZIP-Dateien sind dafür nicht nötig. Die Chrome-Erweiterung und die Testwerkzeuge bleiben im übergeordneten Projektordner; die private Datei `ContactInfo-Test-3.html` wird nicht veröffentlicht.

Für ein neues, leeres Repository ein Terminal im Ordner `Seite100` öffnen:

```powershell
git init
git add .
git commit -m "Add appointment booking test website"
git branch -M main
git remote add origin https://github.com/ArmanDinarvand/tonder_termin.git
git push -u origin main
```

Wenn das Repository schon Dateien oder Commits enthält, zuerst klonen und die Website-Dateien in diesen Checkout kopieren. Anschließend normal committen und pushen. Bestehende Arbeit nicht mit einem Force-Push überschreiben.

## Veröffentlichen

Das Website-Repository mit dem Hosting-Dienst verbinden. Liegen die Dateien direkt im Repository-Hauptordner, ist dieser auch der Website-Ordner. Kein Build und keine Paketinstallation erforderlich. Bei einem Repository mit dem gesamten übergeordneten Projekt `Seite100` als Website-Ordner wählen.

Nach Veröffentlichung zuerst `/Settings.html` im selben Chrome-Profil öffnen, die Freigabe speichern und danach `/index.html` in einem zweiten Tab öffnen. Die Chrome-Erweiterung arbeitet in diesem zweiten Tab. Einstellungen werden nur innerhalb derselben Website und desselben Browserprofils geteilt.

18 automatisierte Prüfungen bestanden. Die Veröffentlichung und ein sichtbarer Test der installierten Chrome-Erweiterung sind von diesen Prüfungen getrennte Schritte.
## Bestätigte Angaben
Nach einer erfolgreichen Testbuchung erscheinen Datum, Uhrzeit, ausgewählte Telefonvorwahl und alle Formularwerte zum Zeitpunkt des Confirm-Klicks. Diese Angaben bleiben im Sitzungsspeicher dieses Browser-Tabs und werden nicht zu GitHub oder einem Server übertragen. Für alte Bestätigungen bitte einen neuen Test starten.
