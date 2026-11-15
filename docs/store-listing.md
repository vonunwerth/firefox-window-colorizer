# FoxTint: Store-Listing für addons.mozilla.org

Alles zum Kopieren in die Produktseite. Upload-Datei: `releases/foxtint-1.0.1.zip`
(Kanal **„Auf dieser Seite“ / On this site**, Quelltext-Frage: **Nein**).

## Allgemein

| Feld | Wert |
| --- | --- |
| Name | FoxTint |
| URL-Kürzel (Slug) | `foxtint` (falls vergeben: `foxtint-window-colors`) |
| Kategorien | Aussehen (Appearance), Tabs/Fensterverwaltung (Tabs) |
| Tags | window, color, theme, toolbar, productivity |
| Lizenz | MIT License |
| Support-Website | https://github.com/vonunwerth/firefox-window-colorizer |
| Support-E-Mail | maximilian@von-unwerth.de (nur eintragen, wenn gewünscht, sie ist dann öffentlich sichtbar) |
| Icon | `src/icons/foxtint-128.png` (größer: `foxtint-512.png`) |

## Kurzbeschreibung (max. 250 Zeichen)

**EN:** Give every Firefox window its own toolbar color. One click on the fox icon, pick a color, and you never mix up your windows again.

**DE:** Gib jedem Firefox-Fenster seine eigene Farbe. Ein Klick auf den Fuchs, Farbe wählen, und du verwechselst deine Fenster nie wieder.

## Ausführliche Beschreibung

### EN

Working with several Firefox windows at once? FoxTint tints the title bar, tabs and toolbar of each window in its own color, so you can tell them apart at a glance: work, private, research, project A and project B.

**How it works**
- Click the fox icon in the toolbar and pick a color from a small palette.
- Only the current window changes. Text and icon colors adapt automatically so everything stays readable.
- "Reset" brings back your normal theme.
- The color is remembered per window, also after restarting Firefox (with session restore).

**Your palette, your rules**
- Choose which of 12 preset colors appear in the popup, or keep just a few.
- Add your own colors with the color picker and give them names (up to 16 colors in total).

**Good to know**
- Works with your existing theme. Windows without a color keep your normal look.
- To use it in private windows, allow the add-on to run in private windows in about:addons.
- No data is collected or sent anywhere. Settings are stored in your Firefox profile.
- Open source (MIT): https://github.com/vonunwerth/firefox-window-colorizer

### DE

Du arbeitest mit mehreren Firefox-Fenstern gleichzeitig? FoxTint färbt Titelleiste, Tabs und Toolbar jedes Fensters in einer eigenen Farbe ein, damit du sie auf einen Blick unterscheiden kannst: Arbeit, Privat, Recherche, Projekt A und Projekt B.

**So funktioniert es**
- Klicke in der Toolleiste auf den Fuchs und wähle eine Farbe aus einer kleinen Palette.
- Es ändert sich nur das aktuelle Fenster. Text- und Symbolfarben passen sich automatisch an, damit alles lesbar bleibt.
- „Zurücksetzen“ stellt dein normales Theme wieder her.
- Die Farbe wird pro Fenster gemerkt, auch nach einem Neustart von Firefox (mit Sitzungswiederherstellung).

**Deine Palette, deine Regeln**
- Wähle aus 12 vorgegebenen Farben, welche im Popup erscheinen, oder nimm nur ein paar.
- Füge mit dem Farbwähler eigene Farben hinzu und gib ihnen Namen (insgesamt bis zu 16 Farben).

**Gut zu wissen**
- Funktioniert mit deinem bestehenden Theme. Fenster ohne Farbe behalten dein normales Aussehen.
- Für private Fenster erlaubst du das Addon in about:addons unter „In privaten Fenstern ausführen“.
- Es werden keine Daten gesammelt oder irgendwohin gesendet. Einstellungen liegen in deinem Firefox-Profil.
- Open Source (MIT): https://github.com/vonunwerth/firefox-window-colorizer

## Screenshots (Reihenfolge)

Dateien in `docs/screenshots/` (`en-…` für die englische, `de-…` für die deutsche Produktseite). Es sind Darstellungen der echten Oberfläche in einem nachgebauten Fensterrahmen, keine Fotos eines echten Firefox-Fensters. Wenn du magst, ersetze sie später durch echte Screenshots.

1. `*-popup.png`: Farbauswahl in der Toolleiste. Beschreibung: *One click on the fox icon and pick a color for this window.* / *Ein Klick auf den Fuchs und eine Farbe für dieses Fenster wählen.*
2. `*-windows.png`: Mehrere Fenster in verschiedenen Farben. Beschreibung: *Tell your windows apart at a glance.* / *Fenster auf einen Blick unterscheiden.*
3. `*-options.png`: Einstellungen. Beschreibung: *Choose your palette and add custom colors.* / *Palette wählen und eigene Farben hinzufügen.*

## Datenschutz

Datenschutzerklärung (optional, kurz):

> FoxTint collects no personal data and sends nothing over the network. The chosen colors and settings are stored locally in your Firefox profile (and synced through Firefox Sync if you have it enabled).

Das Manifest deklariert `data_collection_permissions: required: ["none"]`.

## Hinweise für die Prüfer (Notes to Reviewer)

> The add-on is plain JavaScript/HTML/CSS without any build step, minifier or bundler. The submitted ZIP is the content of the `src/` folder of https://github.com/vonunwerth/firefox-window-colorizer, unmodified. Permissions: `theme` (browser.theme.update per window), `sessions` (store the chosen color with the window for session restore), `storage` (palette settings).

## Berechtigungen kurz erklärt

| Berechtigung | Wofür |
| --- | --- |
| `theme` | Setzt das Theme für ein einzelnes Fenster (`browser.theme.update(windowId, …)`) |
| `sessions` | Speichert die Farbe am Fenster, damit sie nach dem Neustart zurückkommt |
| `storage` | Speichert die Palette-Einstellungen |

## Beim nächsten Update

Versionsnummer in `src/manifest.json` erhöhen, ZIP neu bauen (`npm run build` oder `cd src && zip -r ../releases/foxtint-X.Y.Z.zip .`), im Entwicklerbereich unter „Neue Version hochladen“ einreichen.
