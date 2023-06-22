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
  const outputElement = document.getElementById("output");
  const successDiv = document.createElement("div");
  successDiv.classList.add("alert", "alert-success"); // Add the required classes for success styling
  successDiv.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>${message}</span>
  `;
  
  // clear previous error messages
  outputElement.innerHTML = "";
  outputElement.appendChild(successDiv);
}

