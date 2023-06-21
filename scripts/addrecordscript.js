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
      output.innerHTML = '<div class="error">Please enter or select a name.</div>';
      return;
    }
  
    if (typedReason !== "") {
      reason = typedReason;
    } else if (selectedReason !== "0") {
      reason = selectedReason;
    } else {
      output.innerHTML = '<div class="error">Please enter or select a reason.</div>';
      return;
    }
  
    const row = table.insertRow(1);
    const nameCell = row.insertCell(0);
    const reasonCell = row.insertCell(1);
    const removeCell = row.insertCell(2);
    nameCell.innerHTML = theName;
    reasonCell.innerHTML = reason;
    removeCell.innerHTML = '<button class="btn">Remove</button>';
  
    const removeButton = removeCell.querySelector("button");
    removeButton.addEventListener("click", function () {
      table.deleteRow(row.rowIndex);
    });
  
    nameDropdown.value = "0";
    reasonDropdown.value = "0";
    nameText.value = "";
    reasonText.value = "";
    output.innerHTML = '<div class="success">Successfully added' + theName + ' for ' + reason + '.</div>';
  }
  
