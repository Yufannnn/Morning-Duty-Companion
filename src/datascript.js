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
"6.01/A Shawn Maximanuel Nalendra Patty",
"6.01/B Roderigo Maharay Berutu",
"6.02/A Kee Yu Zhe",
"6.02/B Chew E Foong",
"6.03/A Felix Kanardy Sujono",
"6.03/B Nguyen Manh Luan",
"6.04/A Nguyen Dat Man",
"6.04/B Luong Ba Phuoc Jack",
"6.05/A Eldan Kaiden Hodi",
"6.05/B Rayner Rolland Wiradi",
"6.06/A Yasshen Shanker",
"6.06/B Tayananthan Raja Segaran",
"6.07/A Phat Limpheng",
"6.07/B Lim Han Jay",
"6.08/A Le Phan Huy",
"6.08/B Nguyen Tien Quang",
"6.10/A Chang Hua Keat",
"6.10/B Viederico Hardyson Jong",
"6.11/A Eugene Samuel Wibawa",
"6.11/B Edward Griffin Raofelo",
"6.14/A Demarcus Chua Min Xu",
"6.14/B Lee Kwan Hao",
"6.15/A Le Nguyen Thanh Minh",
"6.15/B Sopheap Chanoudam",
"7.01/A Michael Hanson Sugiharto",
"7.01/B Felix Tatang",
"7.02/A Ong Yong Xiang",
"7.02/B Alden Chen Yun Cheng",
"7.03/A Pham Minh Quang",
"7.03/B Lee Yichen, Tristan",
"7.04/A Low Xuan Yi",
"7.04/B Caiden Lee Khai Hng",
"7.05/A Sun Jinjia",
"7.05/B Zhang Hanyu",
"7.06/A Goh Yu Hong Charles",
"7.06/B Ong Yong Le",
"7.07/A Leow Zeng Yong",
"7.07/B Huang Linsen",
"7.08/A Ong Chen Jin",
"7.08/B Tan En Hao",
"7.10/A Cornelius Ng Yang Wei",
"7.10/B Eugene Tan Jun Yi",
"7.11/A Yap Shi Thau",
"7.11/B Ong Yong Ren",
"7.13/A Tie Ivan",
"7.13/B Jonathan Supian",
"7.14/A David Teng Zhi Chian",
"7.14/B Jayden Cheah Kwan Wah",
"7.15/A Yin Jia Xuan",
"7.15/B Chong Yan Sek",
"8.01/A Wu Yu Si Jerald",
"8.01/B Tea Chen Yu",
"8.02/A Liew Jun Xuan",
"8.02/B Martin Soo Shen Siu",
"8.03/A Tan Jia Ler",
"8.03/B Lachlan Widjaja",
"8.04/A Nathanael Hans Winata",
"8.04/B Lim Chin Xin",
"8.05/A Ian Kerk Ee Yan",
"8.05/B Le Hoang Duong",
"8.06/A Lohitashwan Balashanmugam",
"8.06/B Tran Minh Tu",
"8.07/A Tran Thien Tri",
"8.07/B Bastian Ping Irawan",
"8.08/A Dave Bryan Tanady",
"8.08/B Paphangkorn Soponthammapan",
"8.10/A Ang Vo Fi",
"8.10/B Shi Yilai",
"8.13/A Darren Michael Handoko",
"8.13/B Liew Xun Wah"
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

