// FoxTint background script.
// Applies a per-window theme and stores the chosen color with the window
// (sessions.setWindowValue), so it survives Firefox session restore.

const KEY = "foxtintColor";

async function applyColor(windowId, hex) {
  if (!hex) {
    await browser.theme.reset(windowId);
    return;
  }
  await browser.theme.update(windowId, foxtintBuildTheme(hex));
}

async function setWindowColor(windowId, hex) {
  await applyColor(windowId, hex);
  if (hex) {
    await browser.sessions.setWindowValue(windowId, KEY, hex);
  } else {
    await browser.sessions.removeWindowValue(windowId, KEY);
  }
}

async function restoreWindow(windowId) {
  try {
    const hex = await browser.sessions.getWindowValue(windowId, KEY);
    if (typeof hex === "string" && /^#[0-9a-fA-F]{6}$/.test(hex)) {
      await applyColor(windowId, hex);
      return true;
    }
  } catch (e) {
    // window may already be gone
  }
  return false;
}

async function restoreAll() {
  const windows = await browser.windows.getAll();
  for (const w of windows) {
    await restoreWindow(w.id);
  }
}

// Session restore sets window values slightly after the window is created,
// so try a few times.
function restoreWithRetry(windowId) {
  for (const delay of [0, 500, 1500, 4000]) {
    setTimeout(() => restoreWindow(windowId), delay);
  }
}

browser.runtime.onStartup.addListener(restoreAll);
browser.runtime.onInstalled.addListener(restoreAll);
browser.windows.onCreated.addListener((w) => restoreWithRetry(w.id));
// Background page (re)loaded, e.g. after being suspended.
restoreAll();

browser.runtime.onMessage.addListener((msg) => {
  if (msg && msg.type === "setColor" && typeof msg.windowId === "number") {
    const hex = msg.hex && /^#[0-9a-fA-F]{6}$/.test(msg.hex) ? msg.hex : null;
    return setWindowColor(msg.windowId, hex).then(() => ({ ok: true }));
  }
  if (msg && msg.type === "getColor" && typeof msg.windowId === "number") {
    return browser.sessions
      .getWindowValue(msg.windowId, KEY)
      .then((hex) => ({ hex: hex || null }));
  }
});
