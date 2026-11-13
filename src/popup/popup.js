(async () => {
  for (const el of document.querySelectorAll("[data-i18n]")) {
    el.textContent = browser.i18n.getMessage(el.dataset.i18n);
  }

  const win = await browser.windows.getCurrent();
  const settings = await foxtintGetSettings();
  const palette = foxtintBuildPalette(settings);
  const { hex: current } = await browser.runtime.sendMessage({
    type: "getColor",
    windowId: win.id
  });

  const container = document.getElementById("swatches");
  document.getElementById("empty").hidden = palette.length > 0;

  for (const color of palette) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "swatch";
    b.style.background = color.hex;
    b.title = color.label;
    b.setAttribute("role", "listitem");
    b.setAttribute("aria-label", color.label);
    if (current && current.toUpperCase() === color.hex) b.classList.add("active");
    b.addEventListener("click", async () => {
      await browser.runtime.sendMessage({ type: "setColor", windowId: win.id, hex: color.hex });
      window.close();
    });
    container.appendChild(b);
  }

  document.getElementById("reset").addEventListener("click", async () => {
    await browser.runtime.sendMessage({ type: "setColor", windowId: win.id, hex: null });
    window.close();
  });
  document.getElementById("settings").addEventListener("click", () => {
    browser.runtime.openOptionsPage();
    window.close();
  });
})();
