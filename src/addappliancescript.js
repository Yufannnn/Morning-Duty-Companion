document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add_appliance");

  addBtn.addEventListener("click", () => {
    const level = document.getElementById("level_dropdown").value;
    const room = document.getElementById("room_dropdown").value;
    const selectedAppliance = document.getElementById("appliance_dropdown").value;
    const typedAppliance = document.getElementById("appliance_text").value.trim();
    const table = document.getElementById("appliance_table");
    const tbody = table.querySelector("tbody");

    // Validate room
    if (level === "0" || room === "0") {
      displayError("Please select both level and room number.");
      return;
    }

    const fullRoom = `${level}.${room}`;

    // Validate appliance
    let appliance = "";
    if (typedAppliance !== "") {
      appliance = typedAppliance;
    } else if (selectedAppliance !== "0") {
      appliance = selectedAppliance;
    } else {
      displayError("Please enter or select an appliance.");
      return;
    }

    // Insert row
    const row = tbody.insertRow(0);
    const roomCell = row.insertCell(0);
    const applianceCell = row.insertCell(1);
    const removeCell = row.insertCell(2);

    roomCell.innerText = fullRoom;
    applianceCell.innerText = appliance;
    removeCell.innerHTML = `
      <button class="bg-green-dark hover:bg-green text-white px-3 my-1 rounded-md transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
        Remove
      </button>
    `;

    // Style
    roomCell.classList.add("text-center", "border-r", "border-green-dark");
    applianceCell.classList.add("text-center", "border-r", "border-green-dark");
    removeCell.classList.add("text-center");
    row.classList.add("border-b", "border-green-dark");

    // Remove logic
    const removeButton = removeCell.querySelector("button");
    removeButton.addEventListener("click", () => {
      table.deleteRow(row.rowIndex);
      displaySuccess(`Removed ${fullRoom} - ${appliance}.`);
    });

    // Reset form
    document.getElementById("level_dropdown").value = "0";
    document.getElementById("room_dropdown").value = "0";
    document.getElementById("appliance_dropdown").value = "0";
    document.getElementById("appliance_text").value = "";

    displaySuccess(`Added ${fullRoom} - ${appliance}.`);
  });

  function displaySuccess(message) {
    alertContainer.innerHTML = '';
    const success = document.createElement("div");
    success.className = 'bg-green-lighter border border-green-dark text-green px-4 py-3 rounded relative mt-2 mx-2 hover:bg-green-light hover:text-white hover:shadow-md';
    success.innerHTML = `<strong class="font-bold">Success!</strong> <span class="block sm:inline">${message}</span>`;
    alertContainer.appendChild(success);
  }

  function displayError(message) {
    alertContainer.innerHTML = '';
    const error = document.createElement("div");
    error.className = 'bg-red-lighter border border-red-dark text-red px-4 py-3 rounded relative mt-2 mx-2 hover:bg-red-light hover:text-white hover:shadow-md';
    error.innerHTML = `<strong class="font-bold">Error!</strong> <span class="block sm:inline">${message}</span>`;
    alertContainer.appendChild(error);
  }
});

  const sortStates = {
    room: 'none',
    appliance: 'none'
  };

  document.getElementById("appliance_room_header").addEventListener("click", () => {
    sortApplianceTableByColumn(0, 'room');
  });

  document.getElementById("appliance_name_header").addEventListener("click", () => {
    sortApplianceTableByColumn(1, 'appliance');
  });

  function sortApplianceTableByColumn(colIndex, key) {
    const tbody = document.getElementById("appliance_table").querySelector("tbody");
    const rows = Array.from(tbody.rows);

    const currentState = sortStates[key];
    const nextState = currentState === 'asc' ? 'desc' : 'asc';
    sortStates[key] = nextState;

    rows.sort((a, b) => {
      const textA = a.cells[colIndex].innerText.trim().toLowerCase();
      const textB = b.cells[colIndex].innerText.trim().toLowerCase();
      if (textA < textB) return nextState === 'asc' ? -1 : 1;
      if (textA > textB) return nextState === 'asc' ? 1 : -1;
      return 0;
    });

    for (const row of rows) {
      tbody.appendChild(row);
    }

    // Optional: add ▲▼ to indicate sorting (not required)
    document.getElementById("appliance_room_header").innerHTML = "Room";
    document.getElementById("appliance_name_header").innerHTML = "Appliance";
    const arrow = nextState === 'asc' ? ' ▲' : ' ▼';
    if (key === 'room') {
      document.getElementById("appliance_room_header").innerHTML += arrow;
    } else {
      document.getElementById("appliance_name_header").innerHTML += arrow;
    }
  }
