// Appliances left on: add/remove rows and sorting.
document.addEventListener("DOMContentLoaded", () => {
  if (!window.MDC) return;

  const addBtn = document.getElementById("add_appliance");
  const table = document.getElementById("appliance_table");
  if (!addBtn || !table) return;

  addBtn.addEventListener("click", () => {
    const levelEl = document.getElementById("level_dropdown");
    const roomEl = document.getElementById("room_dropdown");
    const applianceDropdown = document.getElementById("appliance_dropdown");
    const applianceText = document.getElementById("appliance_text");

    const level = levelEl ? levelEl.value : "0";
    const room = roomEl ? roomEl.value : "0";
    const selectedAppliance = applianceDropdown ? applianceDropdown.value : "0";
    const typedAppliance = applianceText ? applianceText.value.trim() : "";

    if (level === "0" || room === "0") {
      return MDC.alert.error("Please select both level and room number.");
    }

    const fullRoom = `${level}.${room}`;
    const appliance =
      typedAppliance !== ""
        ? typedAppliance
        : selectedAppliance !== "0"
          ? selectedAppliance
          : "";

    if (!appliance) return MDC.alert.error("Please enter or select an appliance.");

    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    for (const r of Array.from(tbody.rows)) {
      const existingRoom = r.cells && r.cells[0] ? r.cells[0].textContent : "";
      const existingAppliance = r.cells && r.cells[1] ? r.cells[1].textContent : "";
      if (existingRoom === fullRoom && existingAppliance === appliance) {
        return MDC.alert.error("That appliance record is already in the list.");
      }
    }

    const row = tbody.insertRow(0);
    row.classList.add("mdc-row-new");
    const roomCell = row.insertCell(0);
    const applianceCell = row.insertCell(1);
    const removeCell = row.insertCell(2);

    roomCell.textContent = fullRoom;
    applianceCell.textContent = appliance;

    const btn = document.createElement("button");
    btn.className = "mdc-mini-btn";
    btn.textContent = "Remove";
    removeCell.appendChild(btn);

    btn.addEventListener("click", () => {
      row.classList.add("mdc-row-out");
      window.setTimeout(() => row.remove(), 190);
      MDC.alert.success(`Removed ${fullRoom} - ${appliance}.`);
    });

    if (levelEl) levelEl.value = "0";
    if (roomEl) roomEl.value = "0";
    if (applianceDropdown) applianceDropdown.value = "0";
    if (applianceText) applianceText.value = "";

    MDC.alert.success(`Added ${fullRoom} - ${appliance}.`);

    // Remove "new row" highlight after animation finishes.
    window.setTimeout(() => row.classList.remove("mdc-row-new"), 520);
  });

  MDC.table.installSort({
    tableId: "appliance_table",
    columns: [
      { headerId: "appliance_room_header", colIndex: 0, key: "room", label: "Room" },
      {
        headerId: "appliance_name_header",
        colIndex: 1,
        key: "appliance",
        label: "Appliance",
      },
    ],
  });
});
