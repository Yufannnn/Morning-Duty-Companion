const input = document.getElementById("input");
const alertContainer = document.getElementById("alert");
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
  // Clear the content inside the alert container
  alertContainer.innerHTML = '';

  // Create a new success alert element
  const successAlert = document.createElement('div');
  successAlert.classList.add('bg-red-lighter', 'border', 'border-red-dark', 'text-red', 'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2', 'hover:bg-red-light', 'hover:text-white', 'hover:shadow-md');
  successAlert.setAttribute('role', 'alert');

  successAlert.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${message}</span>
  `;

  // Append the success alert element to the alert container
  alertContainer.appendChild(successAlert);
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
