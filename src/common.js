// Shared helpers used across the app (kept as a plain script, no bundler required).
(function () {
  "use strict";

  const MDC = (window.MDC = window.MDC || {});

  function $(id) {
    return document.getElementById(id);
  }

  MDC.dom = { $ };

  MDC.alert = (function () {
    function show(kind, message) {
      const container = $("alert");
      if (!container) {
        // Keep the app usable even if the alert container is missing.
        if (kind === "error") console.error(message);
        else console.log(message);
        return;
      }

      container.innerHTML = "";
      const el = document.createElement("div");
      el.className = `mdc-alertbox mdc-alertbox--${kind === "error" ? "error" : "success"}`;
      el.setAttribute("role", "alert");

      const strong = document.createElement("strong");
      strong.textContent = kind === "error" ? "Error: " : "Success: ";

      const text = document.createElement("span");
      text.textContent = message;

      el.appendChild(strong);
      el.appendChild(text);
      container.appendChild(el);

      // Auto-fade to keep the UI clean (new alerts overwrite anyway).
      window.setTimeout(() => {
        if (!el.isConnected) return;
        el.classList.add("mdc-alertbox--out");
      }, 4200);
      window.setTimeout(() => {
        if (!el.isConnected) return;
        if (el.parentElement === container) container.innerHTML = "";
      }, 4520);
    }

    return {
      success(message) {
        show("success", message);
      },
      error(message) {
        show("error", message);
      },
    };
  })();

  MDC.table = (function () {
    function installSort({ tableId, columns }) {
      const table = $(tableId);
      if (!table) return;

      const sortStates = Object.create(null);
      for (const col of columns) sortStates[col.key] = "none";

      function sortBy(colIndex, key) {
        const tbody = table.querySelector("tbody");
        if (!tbody) return;

        const rows = Array.from(tbody.rows);
        const currentState = sortStates[key];
        const nextState = currentState === "asc" ? "desc" : "asc";
        sortStates[key] = nextState;

        rows.sort((a, b) => {
          const textA = a.cells[colIndex].innerText.trim().toLowerCase();
          const textB = b.cells[colIndex].innerText.trim().toLowerCase();
          if (textA < textB) return nextState === "asc" ? -1 : 1;
          if (textA > textB) return nextState === "asc" ? 1 : -1;
          return 0;
        });

        for (const row of rows) tbody.appendChild(row);

        // Reset headers, then add arrow to the active column.
        for (const col of columns) {
          const header = $(col.headerId);
          if (header) header.textContent = col.label;
        }

        const active = columns.find((c) => c.key === key);
        const header = active ? $(active.headerId) : null;
        if (header) header.textContent += nextState === "asc" ? " ^" : " v";
      }

      for (const col of columns) {
        const header = $(col.headerId);
        if (!header) continue;
        header.addEventListener("click", () => sortBy(col.colIndex, col.key));
      }
    }

    return { installSort };
  })();
})();
