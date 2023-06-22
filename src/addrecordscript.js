const addBtn = document.getElementById("add");
addBtn.addEventListener("click", addNameAndReason);

function addNameAndReason() {
  const nameText = document.getElementById("name_text");
  const typedName = nameText.value;

  const nameDropdown = document.getElementById("name_dropdown");
  const selectedName = nameDropdown.value;

  const reasonText = document.getElementById("reason_text");
  const typedReason = reasonText.value;

  const reasonDropdown = document.getElementById("reason_dropdown");
  const selectedReason = reasonDropdown.value;

  const table = document.getElementById("table");

  let theName = "";
  let reason = "";

  if (typedName !== "") {
    theName = typedName;
  } else if (selectedName !== "0") {
    theName = selectedName;
  } else {
    message = 'Please enter or select a name.';
    displayError(message);
    return;
  }

  if (typedReason !== "") {
    reason = typedReason;
  } else if (selectedReason !== "0") {
    reason = selectedReason;
  } else {
    message = 'Please enter or select a reason.';
    displayError(message);
    return;
  }

  const row = table.insertRow(1);
  const nameCell = row.insertCell(0);
  const reasonCell = row.insertCell(1);
  const removeCell = row.insertCell(2);
  nameCell.innerHTML = theName;
  reasonCell.innerHTML = reason;
  removeCell.innerHTML = '<button class="bg-green-dark hover:bg-green text-white px-3 my-1 rounded-md">Remove</button>';

  // Add 'text-center' class to each cell in the row
  nameCell.classList.add('text-center', 'border-r', 'border-green-dark');
  reasonCell.classList.add('text-center', 'border-r', 'border-green-dark');
  removeCell.classList.add('text-center');

  // Add 'border-b border-green-dark' class to the row
  row.classList.add('border-b', 'border-green-dark');
  
  const removeButton = removeCell.querySelector("button");
  removeButton.addEventListener("click", function () {
    table.deleteRow(row.rowIndex);
    displaySuccess('Successfully removed ' + theName + ' : ' + reason + '.');
  });

  nameDropdown.value = "0";
  reasonDropdown.value = "0";
  nameText.value = "";
  reasonText.value = "";
  message = 'Successfully added ' + theName + ' : ' + reason + '.';
  displaySuccess(message);
}

  
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
  successAlert.classList.add('bg-green-lighter', 'border', 'border-green-dark', 'text-green', 'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2');
  successAlert.setAttribute('role', 'alert');

  successAlert.innerHTML = `
    <strong class="font-bold">Welcome!</strong>
    <span class="block sm:inline">${message}</span>
  `;

  // Append the success alert element to the alert container
  alertContainer.appendChild(successAlert);
}
  
