const generateBtn = document.getElementById("generate");
const messageTextarea = document.getElementById("message");
const table = document.getElementById("table");
const blockDropdown = document.getElementById("block_dropdown");

generateBtn.addEventListener("click", generateMessage);

function generateMessage() {
  if (table.rows.length === 1) {
    const header = getBlockMessagePrefix(true);
    messageTextarea.value = `${header} all boarders have left for school today!`;
    displaySuccess("Message successfully generated!");
    return;
  }

  const header = getBlockMessagePrefix(false);
  messageTextarea.value = `${header} all boarders have left for school except:\n`;

  const rows = table.getElementsByTagName("tr");
  let sickFlag = false;

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const name = row.cells[0].innerText;
    const reason = row.cells[1].innerText;

    if (reason === "MC" || reason === "unwell") {
      sickFlag = true;
    }

    messageTextarea.value += `- ${name} (${reason})\n`;
  }

  messageTextarea.value += "\n";

  if (sickFlag) {
    messageTextarea.value += "I have also asked those who are unwell to report to the office.\n";
  }

  // 🔌 Append appliance info
  const applianceTable = document.getElementById("appliance_table");
  if (applianceTable.rows.length > 1) {
    messageTextarea.value += "Also, the following rooms left their appliances switched on:\n";
    const applianceRows = applianceTable.getElementsByTagName("tr");
    for (let j = 1; j < applianceRows.length; j++) {
      const row = applianceRows[j];
      const room = row.cells[0].innerText;
      const appliance = row.cells[1].innerText;
      messageTextarea.value += `- ${room} (${appliance})\n`;
    }
    messageTextarea.value += "\n";
  }

  messageTextarea.value += "Thank you!";
  displaySuccess("Message successfully generated!");
}

function getBlockMessagePrefix(isEmpty) {
  const selectedBlock = blockDropdown ? blockDropdown.value : "none";
  if (selectedBlock === "H1") return "Morning BMs, all Hullett 1";
  if (selectedBlock === "H2") return "Morning BMs, all Hullett 2";
  return "Morning BMs, all";
}

// Copy functionality
const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  const textToCopy = messageTextarea.value;
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      console.log("Text copied to clipboard:", textToCopy);
    })
    .catch((error) => {
      console.error("Error copying text to clipboard:", error);
    });

  displaySuccess("Message copied to clipboard!");
}

function displaySuccess(message) {
  alertContainer.innerHTML = '';

  const successAlert = document.createElement('div');
  successAlert.classList.add('bg-green-lighter', 'border', 'border-green-dark', 'text-green', 'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2', 'hover:bg-green-light', 'hover:text-white', 'hover:shadow-md');
  successAlert.setAttribute('role', 'alert');

  successAlert.innerHTML = `
    <strong class="font-bold">Success!</strong>
    <span class="block sm:inline">${message}</span>
  `;

  alertContainer.appendChild(successAlert);
}
