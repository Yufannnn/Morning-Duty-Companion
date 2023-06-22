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
    const output = document.getElementById("output");
  
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
    removeCell.innerHTML = '<button class="btn btn-primary text-white">Remove</button>';
  
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

function displayError(message) {
  const outputElement = document.getElementById("output");
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("alert", "alert-error"); // Add the required classes for error styling
  errorDiv.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  <span>${message}</span>
  `;
  // clear previous error messages
  outputElement.innerHTML = "";
  outputElement.appendChild(errorDiv);
}
  
