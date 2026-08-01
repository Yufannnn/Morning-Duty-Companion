// Phone-first navigation, quick choices, local persistence, and reset workflow.
document.addEventListener("DOMContentLoaded", () => {
  if (!window.MDC) return;

  const STORAGE_KEY = "mdc-morning-state-v1";
  const navButtons = Array.from(document.querySelectorAll("[data-mobile-target]"));
  const panels = Array.from(document.querySelectorAll("[data-mobile-panel]"));
  const absentBody = document.querySelector("#table tbody");
  const applianceBody = document.querySelector("#appliance_table tbody");
  const blockDropdown = document.getElementById("block_dropdown");
  const message = document.getElementById("message");
  const addAbsent = document.getElementById("add");
  const addAppliance = document.getElementById("add_appliance");

  function setPanel(target, moveToTop) {
    for (const panel of panels) {
      panel.classList.toggle("is-mobile-active", panel.dataset.mobilePanel === target);
    }

    for (const button of navButtons) {
      const active = button.dataset.mobileTarget === target;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    }

    if (moveToTop && window.matchMedia("(max-width: 720px)").matches) {
      const main = document.querySelector(".mdc-main");
      if (main) main.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  for (const button of navButtons) {
    button.addEventListener("click", () => setPanel(button.dataset.mobileTarget, true));
  }
  setPanel("absentees", false);

  const choiceConfig = {
    reason: { selectId: "reason_dropdown", customId: "reason_text" },
    level: { selectId: "level_dropdown" },
    appliance: { selectId: "appliance_dropdown", customId: "appliance_text" },
  };

  function syncChoiceGroup(group) {
    const config = choiceConfig[group];
    const select = config ? document.getElementById(config.selectId) : null;
    const selected = select ? select.value : "0";
    const buttons = document.querySelectorAll(`[data-choice-group="${group}"] button`);
    for (const button of buttons) {
      const active = selected !== "0" && button.dataset.value === selected;
      button.classList.toggle("is-selected", active);
      button.setAttribute("aria-pressed", String(active));
    }
  }

  for (const [group, config] of Object.entries(choiceConfig)) {
    const container = document.querySelector(`[data-choice-group="${group}"]`);
    const select = document.getElementById(config.selectId);
    const custom = config.customId ? document.getElementById(config.customId) : null;
    if (!container || !select) continue;

    container.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-value]");
      if (!button) return;
      select.value = select.value === button.dataset.value ? "0" : button.dataset.value;
      if (custom) custom.value = "";
      select.dispatchEvent(new Event("change", { bubbles: true }));
      syncChoiceGroup(group);
    });

    select.addEventListener("change", () => syncChoiceGroup(group));
    if (custom) {
      custom.addEventListener("input", () => {
        if (custom.value.trim()) {
          select.value = "0";
          syncChoiceGroup(group);
        }
      });
    }
    syncChoiceGroup(group);
  }

  function rowsFrom(tableBody) {
    if (!tableBody) return [];
    return Array.from(tableBody.rows).map((row) => [
      row.cells[0] ? row.cells[0].textContent.trim() : "",
      row.cells[1] ? row.cells[1].textContent.trim() : "",
    ]).filter((record) => record[0] && record[1]);
  }

  function saveState() {
    try {
      const state = {
        absentees: rowsFrom(absentBody),
        appliances: rowsFrom(applianceBody),
        block: blockDropdown ? blockDropdown.value : "none",
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("Morning Duty Companion could not save local progress.", error);
    }
  }

  function restoreState() {
    let state = null;
    try {
      state = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    } catch (error) {
      console.warn("Morning Duty Companion could not restore local progress.", error);
    }
    if (!state || typeof state !== "object") return;

    MDC.alert.muted = true;

    if (Array.isArray(state.absentees) && addAbsent) {
      for (const record of state.absentees) {
        if (!Array.isArray(record) || record.length < 2) continue;
        const nameInput = document.getElementById("name_text");
        const reasonInput = document.getElementById("reason_text");
        if (nameInput) nameInput.value = record[0];
        if (reasonInput) reasonInput.value = record[1];
        addAbsent.click();
      }
    }

    if (Array.isArray(state.appliances) && addAppliance) {
      for (const record of state.appliances) {
        if (!Array.isArray(record) || record.length < 2) continue;
        const roomParts = String(record[0]).split(".");
        const level = document.getElementById("level_dropdown");
        const room = document.getElementById("room_dropdown");
        const customAppliance = document.getElementById("appliance_text");
        if (level) level.value = roomParts[0] || "0";
        if (room) room.value = roomParts[1] || "0";
        if (customAppliance) customAppliance.value = record[1];
        addAppliance.click();
      }
    }

    if (blockDropdown && ["H1", "H2", "H3"].includes(state.block)) {
      blockDropdown.value = state.block;
      blockDropdown.dispatchEvent(new Event("change", { bubbles: true }));
    }

    MDC.alert.muted = false;
  }

  function updateNavCounts() {
    const absentCount = document.getElementById("nav_absent_count");
    const applianceCount = document.getElementById("nav_appliance_count");
    if (absentCount) absentCount.textContent = String(absentBody ? absentBody.rows.length : 0);
    if (applianceCount) applianceCount.textContent = String(applianceBody ? applianceBody.rows.length : 0);
  }

  const stateObserver = new MutationObserver(() => {
    updateNavCounts();
    saveState();
    window.setTimeout(() => {
      syncChoiceGroup("reason");
      syncChoiceGroup("level");
      syncChoiceGroup("appliance");
    }, 0);
  });
  if (absentBody) stateObserver.observe(absentBody, { childList: true });
  if (applianceBody) stateObserver.observe(applianceBody, { childList: true });
  if (blockDropdown) blockDropdown.addEventListener("change", saveState);

  restoreState();
  updateNavCounts();

  const resetButton = document.getElementById("reset_morning");
  if (resetButton) {
    resetButton.addEventListener("click", () => {
      const confirmed = window.confirm("Clear all absentee and appliance records for a new morning?");
      if (!confirmed) return;

      if (absentBody) absentBody.innerHTML = "";
      if (applianceBody) applianceBody.innerHTML = "";
      if (message) {
        message.value = "";
        message.dispatchEvent(new Event("input", { bubbles: true }));
      }
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.warn("Morning Duty Companion could not clear local progress.", error);
      }
      saveState();
      if (MDC.message) MDC.message.scheduleGenerate();
      MDC.alert.success("Ready for a new morning.");
      setPanel("absentees", true);
    });
  }

  const enterBindings = [
    ["name_text", addAbsent],
    ["reason_text", addAbsent],
    ["appliance_text", addAppliance],
  ];
  for (const [inputId, button] of enterBindings) {
    const input = document.getElementById(inputId);
    if (!input || !button) continue;
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      button.click();
    });
  }
});
