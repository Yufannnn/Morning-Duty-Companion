// Message generator + clipboard.
document.addEventListener("DOMContentLoaded", () => {
  if (!window.MDC) return;

  const generateBtn = document.getElementById("generate");
  const copyBtn = document.getElementById("copy");
  const messageTextarea = document.getElementById("message");
  const blockDropdown = document.getElementById("block_dropdown");
  const absentTable = document.getElementById("table");
  const applianceTable = document.getElementById("appliance_table");

  if (!generateBtn || !copyBtn || !messageTextarea || !absentTable) return;

  function getSubject() {
    const selectedBlock = blockDropdown ? blockDropdown.value : "none";
    if (selectedBlock === "H1") return "all Hullett 1 boarders";
    if (selectedBlock === "H2") return "all Hullett 2 boarders";
    if (selectedBlock === "H3") return "all Hullett 3 boarders";
    return "all boarders";
  }

  generateBtn.addEventListener("click", () => {
    if (blockDropdown && blockDropdown.value === "none") {
      return MDC.alert.error("Please select a block (Hullett 1 / 2 / 3) before generating.");
    }

    const subject = getSubject();
    const hasAbsentees = absentTable.rows.length > 1;
    const hasAppliances = !!(applianceTable && applianceTable.rows.length > 1);

    let out = "";

    if (!hasAbsentees) {
      out = `Morning BMs, ${subject} have left for school today!`;
    } else {
      out = `Morning BMs, ${subject} have left for school except:\n`;

      let sickFlag = false;
      const rows = absentTable.getElementsByTagName("tr");
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const name = row.cells[0].innerText;
        const reason = row.cells[1].innerText;
        if (reason === "MC" || reason === "unwell") sickFlag = true;
        out += `- ${name} (${reason})\n`;
      }

      out += "\n";
      if (sickFlag) out += "I have also asked those who are unwell to report to the office.\n";
    }

    // If there are appliance records, include them even when there are no absentees.
    if (hasAppliances) {
      out += "\n\nThe following rooms left their appliances switched on:\n";
      const applianceRows = applianceTable.getElementsByTagName("tr");
      for (let j = 1; j < applianceRows.length; j++) {
        const row = applianceRows[j];
        const room = row.cells[0].innerText;
        const appliance = row.cells[1].innerText;
        out += `- ${room} (${appliance})\n`;
      }
      out += "\nThank you!";
    } else if (hasAbsentees) {
      out += "Thank you!";
    }

    messageTextarea.value = out;
    // Programmatic value changes don't trigger input events; stats.js listens to input.
    messageTextarea.dispatchEvent(new Event("input", { bubbles: true }));
    MDC.alert.success("Message successfully generated!");
  });

  copyBtn.addEventListener("click", async () => {
    if (!messageTextarea.value.trim()) {
      return MDC.alert.error("Message is empty. Click Generate Message first.");
    }
    try {
      await navigator.clipboard.writeText(messageTextarea.value);
      MDC.alert.success("Message copied to clipboard!");
    } catch (err) {
      console.error(err);
      MDC.alert.error("Copy failed. Try selecting the text and copying manually.");
    }
  });
});
