const addBtn = document.getElementById("add");
addBtn.addEventListener("click", addNameAndReason);

function addNameAndReason() {
  const nameDropdown = document.getElementById("name_dropdown");
  const selectedName = nameDropdown.value;

  const nameText = document.getElementById("name_text");
  const typedName = nameText.value.trim();

  const reasonText = document.getElementById("reason_text");
  const typedReason = reasonText.value.trim();

  const reasonDropdown = document.getElementById("reason_dropdown");
  const selectedReason = reasonDropdown.value;

  const table = document.getElementById("table");

  let theName = "";
  let reason = "";

  // ✅ Prefer typed name if provided, else use dropdown
  if (typedName !== "") {
    theName = typedName;
  } else if (selectedName !== "0") {
    theName = selectedName;
  } else {
    displayError('Please enter or select a name.');
    return;
  }

  // ✅ Prefer typed reason if provided, else use dropdown
  if (typedReason !== "") {
    reason = typedReason;
  } else if (selectedReason !== "0") {
    reason = selectedReason;
  } else {
    displayError('Please enter or select a reason.');
    return;
  }

  const tbody = table.querySelector("tbody");
  const row = tbody.insertRow(0);
  const nameCell = row.insertCell(0);
  const reasonCell = row.insertCell(1);
  const removeCell = row.insertCell(2);

  nameCell.innerHTML = theName;
  reasonCell.innerHTML = reason;
  removeCell.innerHTML = `
    <button class="bg-green-dark hover:bg-green text-white px-3 my-1 rounded-md transform transition duration-300 ease-in-out hover:scale-110 hover:shadow-xl">
      Remove
    </button>
  `;

  nameCell.classList.add('text-center', 'border-r', 'border-green-dark');
  reasonCell.classList.add('text-center', 'border-r', 'border-green-dark');
  removeCell.classList.add('text-center');
  row.classList.add('border-b', 'border-green-dark');

  // ✅ Add remove logic
  const removeButton = removeCell.querySelector("button");
  removeButton.addEventListener("click", function () {
    table.deleteRow(row.rowIndex);
    displaySuccess(`Successfully removed ${theName} : ${reason}.`);
  });

  // ✅ Reset form
  nameDropdown.value = "0";
  nameText.value = "";
  reasonDropdown.value = "0";
  reasonText.value = "";

  displaySuccess(`Successfully added ${theName} : ${reason}.`);
}

function displaySuccess(message) {
  alertContainer.innerHTML = '';

  const successAlert = document.createElement('div');
  successAlert.classList.add(
    'bg-green-lighter', 'border', 'border-green-dark', 'text-green',
    'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2',
    'hover:bg-green-light', 'hover:text-white', 'hover:shadow-md'
  );
  successAlert.setAttribute('role', 'alert');

  successAlert.innerHTML = `
    <strong class="font-bold">Success!</strong>
    <span class="block sm:inline">${message}</span>
  `;

  alertContainer.appendChild(successAlert);
}

function displayError(message) {
  alertContainer.innerHTML = '';

  const errorAlert = document.createElement('div');
  errorAlert.classList.add(
    'bg-red-lighter', 'border', 'border-red-dark', 'text-red',
    'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2',
    'hover:bg-red-light', 'hover:text-white', 'hover:shadow-md'
  );
  errorAlert.setAttribute('role', 'alert');

  errorAlert.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${message}</span>
  `;

  alertContainer.appendChild(errorAlert);
}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("table");
  const nameHeader = document.getElementById("name_header");
  const reasonHeader = document.getElementById("reason_header");

  const sortStates = { name: 'none', reason: 'none' };

  nameHeader.addEventListener("click", () => sortTableByColumn(0, 'name'));
  reasonHeader.addEventListener("click", () => sortTableByColumn(1, 'reason'));

  function sortTableByColumn(colIndex, key) {
    const tbody = table.querySelector("tbody");
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

    nameHeader.innerHTML = "Name";
    reasonHeader.innerHTML = "Reason";
    const arrow = nextState === 'asc' ? ' ▲' : ' ▼';
    if (key === 'name') nameHeader.innerHTML += arrow;
    if (key === 'reason') reasonHeader.innerHTML += arrow;
  }
});
