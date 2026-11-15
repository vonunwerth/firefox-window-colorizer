<p align="center"><img src="src/icons/foxtint-128.png" alt="FoxTint logo" width="128"></p>

# FoxTint

Tint the toolbar of each Firefox window in its own color, so you can tell your windows apart at a glance.
Färbe die Symbolleiste jedes Firefox-Fensters individuell ein, damit du deine Fenster schneller unterscheiden kannst.

## Features

- Toolbar button with a small color palette, one click colors the current window (title bar, tabs, toolbar and address bar)
- Text and icon colors adapt automatically for readability
- The color is remembered per window, also across restarts (Firefox session restore)
- Settings: choose which preset colors appear and add your own custom colors (up to 16 in total)
- English and German UI

## Try it

```bash
npm install
npm start        # starts Firefox with the add-on loaded (web-ext)
```

Or in Firefox: `about:debugging#/runtime/this-firefox` → *Load Temporary Add-on…* → select `src/manifest.json`.

## Install (ready-made package)

Download [`releases/foxtint-1.0.1.zip`](releases/foxtint-1.0.1.zip). The `manifest.json` is at the root of this ZIP, so it can be uploaded to [addons.mozilla.org](https://addons.mozilla.org/developers/) as an unlisted (self-distributed) add-on to get a signed `.xpi`. Do **not** upload GitHub's "Download ZIP" of the repo; there the add-on sits in `src/`.

## Store listing

Texts, permission notes and screenshots for addons.mozilla.org: see [`docs/store-listing.md`](docs/store-listing.md).

## Build

```bash
npm run build    # creates a zip in dist/ (manifest.json at its root)
```

## Notes

- Uses the per-window `browser.theme.update(windowId, …)` API. It overrides your current theme in colored windows; *Reset* restores it.
- For private windows, allow the add-on to run in private windows in `about:addons`.
- Needs Firefox 140 or newer.

## License

MIT
