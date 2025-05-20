// const input = document.getElementById("input");
// const alertContainer = document.getElementById("alert");
// input.addEventListener("change", handleFiles);

// function handleFiles() {
//   const file = input.files[0];
//   const reader = new FileReader();
//   reader.readAsText(file);

//   reader.onload = function () {
//     const content = reader.result;
//     Papa.parse(content, {
//       header: true,
//       complete: function (results) {
//         const data = results.data;
//         if (validateCSV(data)) {
//             const filteredData = filterData(data);
//             displayData(filteredData);
//             displaySuccess("Successfully loaded data from CSV file.");
//         } else {
//             displayError("Invalid CSV format. Missing required sections: Name, Room, Contact");
//         }
//       }
//     });
//   };
// }

// function filterData(data) {
//     // remove empty rows
//     const filteredData = data.filter(row => row.Room && row.Name);
//     // remove rows that name starts with "RA"
//     return filteredData.filter(row => !row.Name.toLowerCase().startsWith("ra") 
//     && !row.Name.toLowerCase().startsWith("reserve")
//     && !row.Name.toLowerCase().startsWith("pending") 
//     && !row.Name.toLowerCase().startsWith("mr"));
// }

// function validateCSV(data) {
//   const requiredSections = ["Room", "Name", "Contact"];
//   const header = Object.keys(data[0]);

//   return requiredSections.every(section => header.includes(section));
// }

// function displayData(data) {
//     const dropdownElement = document.getElementById("name_dropdown");
  
//     for (const row of data) {
//       if (row.Room && row.Name) {
//         const roomName = `${row.Room} ${row.Name}`;
//         // Check if the room name already exists in the dropdown list
//         const existingOption = Array.from(dropdownElement.options).find(
//           (option) => option.value === roomName
//         );
  
//         if (!existingOption) {
//           // Add the room name to the dropdown list
//           const optionElement = document.createElement("option");
//           optionElement.value = roomName;
//           optionElement.textContent = roomName;
//           dropdownElement.appendChild(optionElement);
//         }
//       }
//     }
//   }
  
  
// function displayError(message) {
//   // Clear the content inside the alert container
//   alertContainer.innerHTML = '';

//   // Create a new success alert element
//   const successAlert = document.createElement('div');
//   successAlert.classList.add('bg-red-lighter', 'border', 'border-red-dark', 'text-red', 'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2', 'hover:bg-red-light', 'hover:text-white', 'hover:shadow-md');
//   successAlert.setAttribute('role', 'alert');

//   successAlert.innerHTML = `
//     <strong class="font-bold">Error!</strong>
//     <span class="block sm:inline">${message}</span>
//   `;

//   // Append the success alert element to the alert container
//   alertContainer.appendChild(successAlert);
// }
  

// function displaySuccess(message) { 
//   // Clear the content inside the alert container
//   alertContainer.innerHTML = '';

//   // Create a new success alert element
//   const successAlert = document.createElement('div');
//   successAlert.classList.add('bg-green-lighter', 'border', 'border-green-dark', 'text-green', 'px-4', 'py-3', 'rounded', 'relative', 'mt-2', 'mx-2', 'hover:bg-green-light', 'hover:text-white', 'hover:shadow-md');
//   successAlert.setAttribute('role', 'alert');
//   successAlert.setAttribute('role', 'alert');

//   successAlert.innerHTML = `
//     <strong class="font-bold">Success!</strong>
//     <span class="block sm:inline">${message}</span>
//   `;

//   // Append the success alert element to the alert container
//   alertContainer.appendChild(successAlert);
// }

// src/data.js

const nameDatabase = [
"3.01/A Zachary Thomas Siytiu Sy",
"3.01/B Taechin Srikhajonlap",
"3.02/A Jayven Lee Jeishen",
"3.02/B Chiam You Xuan",
"3.03/A Arnt Hmue Ti Kyi (William)",
"3.03/B Joshua Yeoh Ong Yiqian",
"3.04/A Nguyen Ha Thai Son",
"3.04/B Le Tuong An",
"3.05/A Marcellino Yuka Susanto",
"3.05/B Boris Kevin Ganda",
"3.06/A Dang Anh Kiet",
"3.06/B Han Le Quang",
"3.07/A Dang Gia Huy",
"3.07/B Tran Tuan Kiet",
"3.08/A Tan Boon Liang",
"3.08/B Chow Jie Shen",
"3.10/A Nguyen Phan Khanh Gia",
"3.10/B Nguyen Duc Minh",
"3.11/A Tran Huu Bach",
"3.11/B Hua Khoa Minh",
"3.13/A Tan Ray Jie",
"3.13/B Manolo Javier Naz Flores",
"3.14/A Nguyen Gia Thinh",
"3.14/B Nguyen Phuc Thinh",
"3.15/A Lee Yao Yang",
"3.15/B Denzel David",
"3.16/A Nguyen Kim Khai Hoan (Adrien)",
"3.16/B Dao Nam Khang",
"4.01/A Randall Soh Jun En",
"4.01/B Titus Soh Yu Miao",
"4.02/A Phan The Duc",
"4.02/B Tran Hoang Viet",
"4.03/A Choo Yu Hong",
"4.03/B Raphael Damien Sinarta",
"4.04/A Li Hoi Yeung",
"4.04/B Yang Tiance",
"4.05/A Zhang Jiachen",
"4.06/A Lau Lip Kuan",
"4.06/B Bhone Pyae Sone",
"4.07/A Le Ba Hung",
"4.07/B Phung Cao Khanh Nam",
"4.08/A Phone Mon Soe",
"4.08/B Vladimir Hezel Bonapasogit",
"4.10/A Nguyen Hoang Minh",
"4.10/B Nguyen Tuan Dung",
"4.11/A Phan Thai Son",
"4.11/B Le Kha Nguyen An",
"4.13/A Julfa Ardhani Wisnumurti",
"4.13/B Tan Min Sen",
"4.14/A Samuel Tham Hua Shen",
"4.14/B Fook Ze Sing",
"4.15/A Nicholas Rafael Susanto",
"4.15/B Steve Constantine Wibowo",
"5.02/A Oliver Joshua Christano",
"5.02/B Bonifacio Dillan Vittorio Gyula",
"5.03/A Keeran Putta",
"5.03/B Matthiew Bartholomeuw Harjanto",
"5.04/A Chau Yong Lin",
"5.04/B Chan Wai Eu",
"5.06/A Theethus Hongkananukraw",
"5.06/B Nong Tuan Kiet",
"5.07/A Winsen Lee",
"5.07/B Jhofaylin Tores Sitorus",
"5.08/A Hoang Nguyen Bao Anh",
"5.08/B Vu Hung Anh",
"5.10/A Nicholas Weng",
"5.10/B George Alexander Surya",
"5.11/A Clinton Tan Yong Xiang",
"5.13/A Bhupunn Ingpalangsrikul",
"5.13/B Tristan Aurelius Chandra",
"5.14/A Han Phyo Oo Alan",
"5.14/B Ma Haoyang",
"5.15/A Nguyen Nghia Gia An",
"5.15/B Nguyen Dinh Anh",

];

// Populate dropdown on page load
window.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("name_dropdown");
  nameDatabase.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    dropdown.appendChild(option);
  });
});

