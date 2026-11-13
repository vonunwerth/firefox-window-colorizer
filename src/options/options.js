const MAX_COLORS = 16; // keeps the popup tidy

let settings;

function t(key) {
  return browser.i18n.getMessage(key);
}

let savedTimer;
async function save() {
  await browser.storage.sync.set(settings);
  const el = document.getElementById("saved");
  el.hidden = false;
  clearTimeout(savedTimer);
  savedTimer = setTimeout(() => (el.hidden = true), 1500);
  renderCount();
}

function totalColors() {
  return settings.enabledPresets.length + settings.customColors.length;
}

function renderCount() {
  document.getElementById("count").textContent = browser.i18n.getMessage("optCount", [
    String(totalColors()),
    String(MAX_COLORS)
  ]);
}

function dot(hex) {
  const d = document.createElement("span");
  d.className = "dot";
  d.style.background = hex;
  return d;
}

function renderPresets() {
  const box = document.getElementById("presets");
  box.textContent = "";
  for (const p of FOXTINT_PRESETS) {
    const item = document.createElement("div");
    item.className = "item";
    const label = document.createElement("label");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = settings.enabledPresets.includes(p.id);
    cb.addEventListener("change", async () => {
      if (cb.checked) {
        if (totalColors() >= MAX_COLORS) {
          cb.checked = false;
          return;
        }
        settings.enabledPresets.push(p.id);
      } else {
        settings.enabledPresets = settings.enabledPresets.filter((id) => id !== p.id);
      }
      await save();
    });
    label.append(cb, dot(p.hex), document.createTextNode(t("color_" + p.id)));
    item.appendChild(label);
    box.appendChild(item);
  }
}

function renderCustom() {
  const box = document.getElementById("custom");
  box.textContent = "";
  settings.customColors.forEach((c, i) => {
    const item = document.createElement("div");
    item.className = "item";
    const label = document.createElement("label");
    label.append(dot(c.hex), document.createTextNode(c.name || c.hex));
    const rm = document.createElement("button");
    rm.type = "button";
    rm.className = "remove";
    rm.textContent = "×";
    rm.title = t("optRemove");
    rm.addEventListener("click", async () => {
      settings.customColors.splice(i, 1);
      renderCustom();
      await save();
    });
    item.append(label, rm);
    box.appendChild(item);
  });
}

(async () => {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    el.textContent = t(el.dataset.i18n);
  }
  for (const el of document.querySelectorAll("[data-i18n-placeholder]")) {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  }

  settings = await foxtintGetSettings();
  renderPresets();
  renderCustom();
  renderCount();

  document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    if (totalColors() >= MAX_COLORS) return;
    const hex = document.getElementById("newHex").value.toUpperCase();
    const name = document.getElementById("newName").value.trim();
    settings.customColors.push({ hex, name });
    document.getElementById("newName").value = "";
    renderCustom();
    await save();
  });

  document.getElementById("resetDefaults").addEventListener("click", async () => {
    settings = JSON.parse(JSON.stringify(FOXTINT_DEFAULT_SETTINGS));
    renderPresets();
    renderCustom();
    await save();
  });
})();
