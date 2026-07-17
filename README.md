# PF2e Leveler – German Edition & Fixes

Community-Fork von [PF2e Leveler](https://github.com/roi007leaf/pf2e-leveler) mit optionaler deutscher Oberfläche, Fehlerbehebungen und Performance-Verbesserungen. Die ursprüngliche Erweiterung und ihre grundlegende Architektur wurden von **RoiLeaf** entwickelt.

[Deutsch](#deutsch) · [English](#english)

## Deutsch

### Kurzbeschreibung

PF2e Leveler unterstützt die Charaktererschaffung und die Planung von Stufenaufstiegen in Foundry VTT für Pathfinder Second Edition und Starfinder Second Edition. Dieser Fork konzentriert sich auf eine flüssigere Bedienung, optionale deutsche Texte und eine bessere Verwaltung eigener Kampagneninhalte. Die interne Modul-ID bleibt `pf2e-leveler`, damit bestehende Welten und Einstellungen kompatibel bleiben.

### Was wurde geändert – und warum?

- **Schnellere Suche:** Die alte Suchlogik konnte bereits nach einem einzelnen Zeichen große Kompendien vollständig durchsuchen und Tausende DOM-Elemente erzeugen. Suchvorgänge beginnen nun erst ab drei Zeichen, werden um 250 ms verzögert und veraltete asynchrone Ergebnisse werden verworfen. Ausrüstung, Talente und Zauber zeigen höchstens 200 Ergebniszeilen gleichzeitig an. Unveränderliche Ausrüstungsfilter werden zwischengespeichert und mehrere Zauberkompendien parallel geladen.
- **Eigene Schnellausrüstungspakete:** Spielleiter können wiederverwendbare Pakete mit Name, Bild, Beschreibung, Klasse, Stufe, Seltenheit und Merkmalen erstellen. Ein Paket enthält Verweise auf normale PF2e-Gegenstände; Preis und Last werden automatisch aus Inhalt und Menge berechnet. Dadurch lassen sich vollständige Klassenausrüstungen verwalten, statt lediglich einen einzelnen Abenteurerrucksack anzubieten.
- **Herkünfte in den Inhaltsvorgaben:** Standardherkünfte, vielseitige Herkünfte, gemischte Abstammungen sowie Herkünfte aus Welten und Modulen können wie Abstammungen empfohlen, eingeschränkt oder verboten werden. Das schließt eine Lücke bei der Steuerung erlaubter Kampagneninhalte.
- **Optionale deutsche Oberfläche:** Deutsch wurde als zusätzliche Sprache ergänzt. Englisch, Französisch und Chinesisch bleiben verfügbar. Die Übersetzung verwendet PF2e-Begriffe wie „Abstammung“, „Herkunft“, „Attributsverbesserung“, „Fertigkeitsverbesserung“, „Last“ und „Zaubergrad“.
- **Stabilitätskorrekturen:** Suchläufe unterhalb der Mindestlänge lösen keine vollständigen Neuberechnungen mehr aus. Ergebnislisten bleiben begrenzt, und ein bereits geschlossenes Ausrüstungsfenster wird nach einem verspäteten Kompendium-Ladevorgang nicht erneut gerendert.

Namen und Beschreibungen von Talenten, Zaubern, Gegenständen und anderen Spielinhalten stammen aus den aktiven PF2e-/SF2e-Kompendien. Für übersetzte Spielinhalte muss zusätzlich eine passende System- oder Kompendiumsübersetzung aktiv sein.

### Getestete Umgebung

- Foundry VTT 14, Build 3654
- Pathfinder Second Edition 8.3.0

Die Moduldefinition unterstützt weiterhin Foundry VTT ab Version 13 sowie PF2e ab 7.0.0. Die oben genannten Versionen bezeichnen die konkret getestete Kombination.

### Anforderungen

- Foundry VTT 13 oder neuer
- Pathfinder Second Edition 7.0.0 oder neuer; alternativ Starfinder Second Edition 0.0.10 oder neuer
- `socketlib` wird für die zuverlässige Übermittlung von Prüfanfragen empfohlen

### Geplantes Feature: Homebrew-Götter

Geplant ist eine eigenständige Homebrew-Götter-Erweiterung mit Verbindung zu PF2e Leveler. Das vorgesehene technische Modell ist ein separates Foundry-Modul, das kompatible PF2e-Gegenstände vom Typ `deity` über ein Kompendium bereitstellt. PF2e Leveler soll dieses Kompendium anschließend als Gottheitenquelle verwenden können; Standardgottheiten sollen sich über Kompendiums- und Inhaltsvorgaben aus der Auswahl entfernen lassen.

Dies ist ein Roadmap-Eintrag und **noch nicht Bestandteil dieser Version**.

### Installation

1. Öffne in Foundry VTT **Zusatzmodule** und anschließend **Modul installieren**.
2. Füge diese Adresse unter **Manifest-URL** ein:

   ```text
   https://github.com/Darkiyus/pf2e-leveler/releases/latest/download/module.json
   ```

3. Klicke auf **Installieren** und aktiviere anschließend **PF2e Leveler – German Edition & Fixes** in deiner Welt.

Die Manifest-URL funktioniert, sobald in diesem Fork ein GitHub Release mit der Datei `module.json` veröffentlicht wurde.

### Sprache auswählen

Deutsch ist optional und wird wie jede andere Foundry-Sprache in der Kernkonfiguration des jeweiligen Benutzers ausgewählt. Verfügbar bleiben Deutsch, Englisch, Französisch und Chinesisch.

### Ursprung und Lizenz

- Ursprüngliches Projekt und Entwickler: [RoiLeaf – PF2e Leveler](https://github.com/roi007leaf/pf2e-leveler)
- Community-Fork: [Darkiyus/pf2e-leveler](https://github.com/Darkiyus/pf2e-leveler)
- Lizenz: MIT

Dieser Fork ist kein offizielles Release des ursprünglichen Entwicklers.

---

## English

### Overview

PF2e Leveler assists with character creation and level-up planning in Foundry VTT for Pathfinder Second Edition and Starfinder Second Edition. This fork focuses on responsive interaction, an optional German interface, and better control over campaign-specific content. The internal module ID remains `pf2e-leveler` to preserve existing worlds and settings.

### What changed – and why?

- **Faster search:** The previous search flow could scan large compendiums and create thousands of DOM elements after a single character. Searches now start at three characters, use a 250 ms debounce, and discard stale asynchronous results. Equipment, feat, and spell pickers render at most 200 result rows at once. Static equipment facets are cached, and multiple spell compendiums load in parallel.
- **Custom quick-equipment packages:** Game Masters can create reusable packages with a name, image, description, class, level, rarity, and traits. Each package references normal PF2e items, while price and Bulk are calculated automatically from its contents and quantities. This makes complete class loadouts possible instead of exposing only an adventurer's pack.
- **Heritages in content guidance:** Standard, versatile, mixed-ancestry, world, and module heritages can be suggested, restricted, or banned in the same way as ancestries. This closes a gap in campaign content control.
- **Optional German interface:** German is an additional language, not a replacement. English, French, and Chinese remain available. The German wording follows established PF2e terminology.
- **Stability fixes:** Queries below the minimum length no longer trigger full list rebuilds. Result lists remain bounded, and an equipment picker that has already been closed is not rendered again after a delayed compendium load completes.

Feat, spell, item, and other game-content names and descriptions come from the active PF2e/SF2e compendiums. A matching system or compendium translation is therefore required for translated game content.

### Tested environment

- Foundry VTT 14, Build 3654
- Pathfinder Second Edition 8.3.0

The manifest continues to support Foundry VTT 13 or newer and PF2e 7.0.0 or newer. The versions above identify the combination that was explicitly tested.

### Requirements

- Foundry VTT 13 or newer
- Pathfinder Second Edition 7.0.0 or newer; alternatively, Starfinder Second Edition 0.0.10 or newer
- `socketlib` is recommended for reliable review-request delivery

### Planned feature: homebrew deities

A separate homebrew deity add-on with PF2e Leveler integration is planned. The intended technical model is a companion Foundry module that provides compatible PF2e `deity` items in a compendium. PF2e Leveler can then use that compendium as a deity source, while standard deities can be removed from the available selection through compendium and content-guidance configuration.

This is a roadmap item and is **not included in the current version**.

### Installation

1. In Foundry VTT, open **Add-on Modules** and select **Install Module**.
2. Enter this address in the **Manifest URL** field:

   ```text
   https://github.com/Darkiyus/pf2e-leveler/releases/latest/download/module.json
   ```

3. Select **Install**, then enable **PF2e Leveler – German Edition & Fixes** in your world.

The manifest URL becomes usable once this fork publishes a GitHub Release containing `module.json`.

### Languages

German is optional and can be selected through each user's Foundry core language setting. German, English, French, and Chinese remain available.

### Origin and license

- Original project and developer: [RoiLeaf – PF2e Leveler](https://github.com/roi007leaf/pf2e-leveler)
- Community fork: [Darkiyus/pf2e-leveler](https://github.com/Darkiyus/pf2e-leveler)
- License: MIT

This community fork is not an official release by the original developer.
