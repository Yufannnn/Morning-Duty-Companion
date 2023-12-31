// Get the necessary elements from the DOM
const generateBtn = document.getElementById("generate");
const messageTextarea = document.getElementById("message");
const table = document.getElementById("table");

// Add a click event listener to the "Generate Message" button
generateBtn.addEventListener("click", generateMessage);

// Define the generateMessage function
function generateMessage() {
    // If the table is empty, display an error message
    if (table.rows.length === 1) {
        messageTextarea.value = "Morning BMs, all boarders have left for school today!";
        // Display a success message
        displaySuccess("Message successfully generated!");
        return;
    }

    // Clear the message textarea
    messageTextarea.value = "Morning BMs, all boarders have left for school excpet: \n";

    // Get all rows in the table
    const rows = table.getElementsByTagName("tr");

    sickFlag = false;

    // Iterate over each row (skip the first row which contains the table headers)
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const nameCell = row.cells[0];
        const reasonCell = row.cells[1];

        // Get the name and reason values
        const name = nameCell.innerText;
        const reason = reasonCell.innerText;

        if (reason === "MC" || reason === "unwell") {
            sickFlag = true;
        }

        // Append the name and reason to the message textarea
        messageTextarea.value += `- ${name} (${reason})\n`;
    }

    if (sickFlag) {
        messageTextarea.value += "I have also asked those who are unwell to report to the office.\n";
    } 
    messageTextarea.value += "Thank you!";

    // Display a success message
    displaySuccess("Message successfully generated!");
}

// Get the necessary elements from the DOM
const copyBtn = document.getElementById("copy");

// Add a click event listener to the "Copy to Clipboard" button
copyBtn.addEventListener("click", copyToClipboard);

// Add a click event listener to the "Copy to Clipboard" button
copyBtn.addEventListener("click", copyToClipboard);

// Define the copyToClipboard function
function copyToClipboard() {
  const textToCopy = messageTextarea.value;

  // Use the Clipboard API to copy the text to the clipboard
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      console.log("Text copied to clipboard:", textToCopy);
    })
    .catch((error) => {
      console.error("Error copying text to clipboard:", error);
    });

  // Display a success message
  displaySuccess("Message copied to clipboard!");
}

function displaySuccess(message) { 
  // Clear the content inside the alert container
  alertContainer.innerHTML = '';

  // Create a new success alert element
  const successAlert = document.createElement('div');
  successAlert.classList.add('bg-green-lighter', 'border', 'border-green-dark', 'text-green', 'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2', 'hover:bg-green-light', 'hover:text-white', 'hover:shadow-md');
  successAlert.setAttribute('role', 'alert');
  successAlert.setAttribute('role', 'alert');

  successAlert.innerHTML = `
    <strong class="font-bold">Success!</strong>
    <span class="block sm:inline">${message}</span>
  `;

  // Append the success alert element to the alert container
  alertContainer.appendChild(successAlert);
}

