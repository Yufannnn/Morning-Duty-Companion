// Absent boarders: add/remove rows and sorting.
document.addEventListener("DOMContentLoaded", () => {
  if (!window.MDC) return;

  const addBtn = document.getElementById("add");
  const table = document.getElementById("table");
  if (!addBtn || !table) return;

  addBtn.addEventListener("click", () => {
    const nameDropdown = document.getElementById("name_dropdown");
    const nameText = document.getElementById("name_text");
    const reasonDropdown = document.getElementById("reason_dropdown");
    const reasonText = document.getElementById("reason_text");
    const addRoommatesEl = document.getElementById("add_roommates");

    const selectedName = nameDropdown ? nameDropdown.value : "0";
    const typedName = nameText ? nameText.value.trim() : "";
    const selectedReason = reasonDropdown ? reasonDropdown.value : "0";
    const typedReason = reasonText ? reasonText.value.trim() : "";

    const theName = typedName !== "" ? typedName : selectedName !== "0" ? selectedName : "";
    const reason = typedReason !== "" ? typedReason : selectedReason !== "0" ? selectedReason : "";
    const addRoommates = !!(addRoommatesEl && addRoommatesEl.checked);

    if (!theName) return MDC.alert.error("Please enter or select a name.");
    if (!reason) return MDC.alert.error("Please enter or select a reason.");

    const tbody = table.querySelector("tbody");
    if (!tbody) return;

    function isAlreadyAdded(name) {
      for (const r of Array.from(tbody.rows)) {
        if (r.cells && r.cells[0] && r.cells[0].textContent === name) return true;
      }
      return false;
    }

    function insertRow(name, reason) {
      const row = tbody.insertRow(0);
      row.classList.add("mdc-row-new");
      const nameCell = row.insertCell(0);
      const reasonCell = row.insertCell(1);
      const removeCell = row.insertCell(2);

      // textContent avoids injecting HTML from user input.
      nameCell.textContent = name;

      const tag = document.createElement("span");
      tag.className = "mdc-tag";
      const r = String(reason || "").trim();
      const rLower = r.toLowerCase();
      if (rLower === "mc" || rLower === "unwell") tag.classList.add("mdc-tag--sick");
      else if (rLower.includes("parent")) tag.classList.add("mdc-tag--note");
      tag.textContent = r;
      reasonCell.textContent = "";
      reasonCell.appendChild(tag);

      const btn = document.createElement("button");
      btn.className = "mdc-mini-btn";
      btn.textContent = "Remove";
      removeCell.appendChild(btn);

      btn.addEventListener("click", () => {
        row.classList.add("mdc-row-out");
        window.setTimeout(() => row.remove(), 190);
        MDC.alert.success(`Successfully removed ${name} : ${reason}.`);
      });

      window.setTimeout(() => row.classList.remove("mdc-row-new"), 520);
    }

    let namesToAdd = [theName];
    let roommateResolved = false;

    if (addRoommates) {
      const src = selectedName !== "0" ? selectedName : theName;
      const m = /^(\d+\.\d{2})\/([A-Za-z])\b/.exec(src);
      if (m && typeof nameDatabase !== "undefined" && Array.isArray(nameDatabase)) {
        const prefix = `${m[1]}/`;
        const matches = nameDatabase.filter((n) => typeof n === "string" && n.startsWith(prefix));
        if (matches.length >= 2) {
          namesToAdd = matches;
          roommateResolved = true;
        } else if (matches.length === 1) {
          namesToAdd = matches;
          roommateResolved = true;
        }
      }
    }

    let added = 0;
    let skipped = 0;
    for (const n of namesToAdd) {
      if (!n) continue;
      if (isAlreadyAdded(n)) {
        skipped++;
        continue;
      }
      insertRow(n, reason);
      added++;
    }

    if (nameDropdown) nameDropdown.value = "0";
    if (nameText) nameText.value = "";
    if (reasonDropdown) reasonDropdown.value = "0";
    if (reasonText) reasonText.value = "";
    if (addRoommatesEl) addRoommatesEl.checked = false;

    if (added === 0) {
      return MDC.alert.error("That record is already in the list.");
    }

    if (addRoommates && !roommateResolved) {
      MDC.alert.success(
        added === 1
          ? `Added 1 record. (Could not auto-add roommate; select a name like 6.05/A ... from the dropdown.)`
          : `Added ${added} records. (Could not auto-add roommate; select a name like 6.05/A ... from the dropdown.)`
      );
      return;
    }

    if (added === 1) MDC.alert.success(`Successfully added ${namesToAdd[0]} : ${reason}.`);
    else MDC.alert.success(`Successfully added ${added} records for: ${reason}.` + (skipped ? ` (${skipped} skipped)` : ""));
  });

  MDC.table.installSort({
    tableId: "table",
    columns: [
      { headerId: "name_header", colIndex: 0, key: "name", label: "Name" },
      { headerId: "reason_header", colIndex: 1, key: "reason", label: "Reason" },
    ],
  });
});
