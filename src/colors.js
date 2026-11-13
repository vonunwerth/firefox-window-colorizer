// Shared helpers: default palette, settings access, theme generation.
// Loaded in the background script and in popup/options pages.

const FOXTINT_PRESETS = [
  { id: "blue", hex: "#0A84FF" },
  { id: "orange", hex: "#FF7139" },
  { id: "green", hex: "#30B05A" },
  { id: "purple", hex: "#7C4DDB" },
  { id: "pink", hex: "#E31587" },
  { id: "red", hex: "#D70022" },
  { id: "yellow", hex: "#D9A400" },
  { id: "teal", hex: "#00A6A6" },
  { id: "brown", hex: "#8A5A3C" },
  { id: "graphite", hex: "#4B5563" },
  { id: "navy", hex: "#1E3A8A" },
  { id: "lime", hex: "#7CB518" }
];

const FOXTINT_DEFAULT_SETTINGS = {
  // IDs of enabled presets, in display order
  enabledPresets: ["blue", "orange", "green", "purple", "pink", "red"],
  // user defined colors: [{ hex: "#RRGGBB", name: "optional" }]
  customColors: []
};

async function foxtintGetSettings() {
  const stored = await browser.storage.sync.get(FOXTINT_DEFAULT_SETTINGS);
  return {
    enabledPresets: Array.isArray(stored.enabledPresets)
      ? stored.enabledPresets
      : FOXTINT_DEFAULT_SETTINGS.enabledPresets,
    customColors: Array.isArray(stored.customColors) ? stored.customColors : []
  };
}

// Final list of colors shown in the popup: [{ hex, label }]
function foxtintBuildPalette(settings) {
  const list = [];
  for (const id of settings.enabledPresets) {
    const preset = FOXTINT_PRESETS.find((p) => p.id === id);
    if (preset) {
      list.push({
        hex: preset.hex,
        label: browser.i18n.getMessage("color_" + preset.id) || preset.id
      });
    }
  }
  for (const c of settings.customColors) {
    if (/^#[0-9a-fA-F]{6}$/.test(c.hex)) {
      list.push({ hex: c.hex.toUpperCase(), label: c.name || c.hex.toUpperCase() });
    }
  }
  return list;
}

function foxtintHexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function foxtintRgbToHex(r, g, b) {
  const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return "#" + c(r) + c(g) + c(b);
}

function foxtintLuminance(hex) {
  const lin = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const [r, g, b] = foxtintHexToRgb(hex).map(lin);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// mix(hexA, hexB, t): t=0 -> A, t=1 -> B
function foxtintMix(a, b, t) {
  const ra = foxtintHexToRgb(a);
  const rb = foxtintHexToRgb(b);
  return foxtintRgbToHex(
    ra[0] + (rb[0] - ra[0]) * t,
    ra[1] + (rb[1] - ra[1]) * t,
    ra[2] + (rb[2] - ra[2]) * t
  );
}

// Builds a Firefox theme object for one window from a single base color.
function foxtintBuildTheme(hex) {
  const dark = foxtintLuminance(hex) < 0.35;
  const text = dark ? "#FFFFFF" : "#15141A";
  const frame = hex;
  // Selected tab and toolbar: slightly lighter than the frame on dark colors,
  // slightly darker on light colors, so tabs remain distinguishable.
  const toolbar = dark ? foxtintMix(hex, "#FFFFFF", 0.14) : foxtintMix(hex, "#000000", 0.08);
  const field = dark ? foxtintMix(hex, "#000000", 0.25) : foxtintMix(hex, "#FFFFFF", 0.55);
  const fieldText = dark ? "#FFFFFF" : "#15141A";
  return {
    colors: {
      frame,
      frame_inactive: foxtintMix(frame, dark ? "#000000" : "#FFFFFF", 0.18),
      tab_background_text: text,
      tab_text: text,
      tab_selected: toolbar,
      toolbar,
      toolbar_text: text,
      toolbar_field: field,
      toolbar_field_text: fieldText,
      toolbar_field_border: foxtintMix(field, text, 0.15),
      toolbar_top_separator: "transparent",
      toolbar_bottom_separator: foxtintMix(toolbar, text, 0.2),
      icons: text,
      icons_attention: dark ? "#FFD866" : "#B3000F",
      popup: dark ? "#2B2A33" : "#FFFFFF",
      popup_text: dark ? "#FBFBFE" : "#15141A",
      sidebar: toolbar,
      sidebar_text: text,
      ntp_background: dark ? "#2B2A33" : "#F9F9FB",
      ntp_text: dark ? "#FBFBFE" : "#15141A"
    }
  };
}
