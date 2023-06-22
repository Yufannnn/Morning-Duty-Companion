const input = document.getElementById("input");
input.addEventListener("change", handleFiles);

function handleFiles() {
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsText(file);

  reader.onload = function () {
    const content = reader.result;
    Papa.parse(content, {
      header: true,
      complete: function (results) {
        const data = results.data;
        if (validateCSV(data)) {
            const filteredData = filterData(data);
            displayData(filteredData);
            displaySuccess("Successfully loaded data from CSV file.");
        } else {
            displayError("Invalid CSV format. Missing required sections: Name, Room, Contact");
        }
      }
    });
  };
}

function filterData(data) {
    // remove empty rows
    const filteredData = data.filter(row => row.Room && row.Name);
    // remove rows that name starts with "RA"
    return filteredData.filter(row => !row.Name.toLowerCase().startsWith("ra") 
    && !row.Name.toLowerCase().startsWith("reserve")
    && !row.Name.toLowerCase().startsWith("pending") 
    && !row.Name.toLowerCase().startsWith("mr"));
}

function validateCSV(data) {
  const requiredSections = ["Room", "Name", "Contact"];
  const header = Object.keys(data[0]);

  return requiredSections.every(section => header.includes(section));
}

function displayData(data) {
    const dropdownElement = document.getElementById("name_dropdown");
  
    for (const row of data) {
      if (row.Room && row.Name) {
        const roomName = `${row.Room} ${row.Name}`;
        // Check if the room name already exists in the dropdown list
        const existingOption = Array.from(dropdownElement.options).find(
          (option) => option.value === roomName
        );
  
        if (!existingOption) {
          // Add the room name to the dropdown list
          const optionElement = document.createElement("option");
          optionElement.value = roomName;
          optionElement.textContent = roomName;
          dropdownElement.appendChild(optionElement);
        }
      }
    }
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