# PF2e Leveler – German Edition & Fixes

Eine weiterentwickelte Version von **PF2e Leveler** für Foundry VTT. Das Modul unterstützt die Charaktererschaffung und die Planung von Stufenaufstiegen für Pathfinder 2E und Starfinder Second Edition.

Dieses Repository ist ein Fork von [roi007leaf/pf2e-leveler](https://github.com/roi007leaf/pf2e-leveler). Das ursprüngliche Modul und die grundlegende Architektur stammen von **RoiLeaf**. Die ausführliche Beschreibung der ursprünglichen Funktionen befindet sich im [Upstream-Projekt](https://github.com/roi007leaf/pf2e-leveler).

## Verbesserungen dieser Version

- Schnellere Suche in Ausrüstung, Talenten, Zaubern und Inhaltsvorgaben: Die Suche startet ab drei Zeichen, ist verzögert und verwirft veraltete Suchläufe.
- Wiederverwendbare Schnellausrüstungspakete mit Bild, Beschreibung, Klassen, Stufe, Seltenheit, Kategorien und enthaltenen PF2e-Gegenständen. Preis und Last werden aus dem Paketinhalt berechnet.
- Herkünfte können in den Inhaltsvorgaben wie Abstammungen empfohlen, eingeschränkt oder verboten werden. Dies schließt vielseitige, gemischte und eigene Herkünfte ein.
- Vollständige deutsche Moduloberfläche als zusätzliche Sprache. Englisch, Französisch und Chinesisch bleiben verfügbar.
- Deutsche PF2e-Begriffe wie „Abstammung“, „Herkunft“, „Attributsverbesserung“, „Fertigkeitsverbesserung“, „Last“ und „Zaubergrad“.

Namen und Beschreibungen von Talenten, Zaubern, Gegenständen und anderen Spielinhalten stammen aus den aktiven PF2e-/SF2e-Kompendien. Für übersetzte Spielinhalte muss daher auch eine passende System- oder Kompendiumsübersetzung aktiv sein.

## Installation in Foundry VTT

1. Öffne in Foundry VTT **Zusatzmodule** und anschließend **Modul installieren**.
2. Füge unter **Manifest-URL** diesen Link ein:

   ```text
   https://github.com/Darkiyus/pf2e-leveler/releases/latest/download/module.json
   ```

3. Klicke auf **Installieren**.
4. Aktiviere **PF2e Leveler – German Edition & Fixes** in der Modulverwaltung deiner Welt.

Die Manifest-URL verweist immer auf das neueste veröffentlichte Release dieses Forks. Die interne Modul-ID bleibt `pf2e-leveler`, damit bestehende Welten und Einstellungen kompatibel bleiben.

## Sprache auswählen

Deutsch ist optional. Die Sprache wird über die Foundry-Kernkonfiguration des jeweiligen Benutzers ausgewählt. Verfügbar sind:

- Deutsch
- Englisch
- Französisch
- Chinesisch

## Anforderungen

- Foundry VTT 13 oder 14
- Pathfinder-2E-System ab Version 7.0.0 oder Starfinder-2E-System ab Version 0.0.10
- `socketlib` wird für eine zuverlässige Übermittlung von Prüfanfragen empfohlen

## Ursprung und Lizenz

- Ursprüngliches Projekt und Entwickler: [RoiLeaf – PF2e Leveler](https://github.com/roi007leaf/pf2e-leveler)
- Weiterentwickelter Fork: [Darkiyus/pf2e-leveler](https://github.com/Darkiyus/pf2e-leveler)
- Lizenz: MIT

Diese Version ist ein eigenständiger Community-Fork und kein offizielles Release des ursprünglichen Entwicklers.
