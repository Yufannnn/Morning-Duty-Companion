// Get the necessary elements from the DOM
const generateBtn = document.getElementById("generate");
const messageTextarea = document.getElementById("message");
const table = document.getElementById("table");

// Add a click event listener to the "Generate Message" button
generateBtn.addEventListener("click", generateMessage);

// Define the generateMessage function
function generateMessage() {
    // Clear the message textarea
    messageTextarea.value = "Morning BMs, all boarders has left for school, excpet for: \n";

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
        messageTextarea.value += "I have asked those who are unwell to report to the office\n";
    } 

    messageTextarea.value += "Thank you!";
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
}

