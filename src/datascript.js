// Name database for the absent boarders dropdown.
// NOTE: This file is intentionally "data-heavy". Keep logic minimal.

const nameDatabase = [
"6.01/A Alvin Muliady",
"6.01/B Nguyen Tuong Bach",
"6.02/A Jerico",
"6.02/B Pham Huy Bao Long",
"6.03/A Jayshawn Yeo Zi Xuan",
"6.03/B Joshua Foo Ren Hann",
"6.04/A Jayden Lee Jeishen",
"6.04/B Hein Htet Aung (Eddy)",
"6.05/A Ong Chen Jin",
"6.05/B Rayner Rolland Wiradi",
"6.06/A Yasshen Shanker",
"6.06/B Tayananthan Raja Segaran",
"6.07/A Phat Limpheng",
"6.07/B Lim Han Jay",
"6.08/A Damian Alexander",
"6.08/B Ha Dang Tuan Phap",
"6.09/A Felix Kanardy Sujono",
"6.09/B Kee Yu Zhe",
"6.10/A Chang Hua Keat",
"6.10/B Viederico Hardyson Jong",
"6.11/A Eugene Samuel Wibawa",
"6.11/B Edward Griffin Raofelo",
"6.13/A Derrich Piter",
"6.13/B Dang Lam Nguyen",
"6.14/A Tan An Kai",
"6.14/B Ko Khai Cheng",
"6.15/A Kam Jia Le",
"6.15/B Lum Kin Hou Hector",
"7.01/A Zheng Yisa",
"7.01/B Chen Yuhang",
"7.02/A Fan Yi",
"7.02/B Bao Binglin",
"7.03/A Zhan Li",
"7.03/B Zhou Zijie",
"7.04/A Zhao Enrui",
"7.04/B Zhang Jun",
"7.05/A Sun Jinjia",
"7.05/B Liu Hongyu",
"7.06/A Goh Yu Hong Charles",
"7.06/B Ong Yong Le",
"7.07/A Leow Zeng Yong",
"7.07/B Huang Linsen",
"7.08/A Zhang Zhonghan",
"7.08/B Li Shengrui",
"7.10/A Alden Chen Yun Cheng",
"7.10/B Eugene Tan Jun Yi",
"7.11/A Cornelius Ng Yang Wei",
"7.11/B Ong Yong Ren",
"7.13/A Low Xuan Yi",
"7.13/B Zhang Hanyu",
"7.14/A Caiden Lee Khai Hng",
"7.14/B Wong Khai Yean",
"7.15/A Zhou Zuhao",
"7.15/B Liu Chengming",
"7.16/A Zheng Wenhao",
"7.16/B Cao Gaoyuan",
"8.01/A Wu Yu Si Jerald",
"8.01/B Tea Chen Yu",
"8.02/A Ng Lyson",
"8.02/B Nguyen Dinh Anh",
"8.03/A Teo En Howe",
"8.05/A Dinh Hoang Nam",
"8.06/A Lohitashwan Balashanmugam",
"8.06/B Tran Minh Tu",
"8.07/A Tran Thien Tri",
"8.07/B Samuel Kok Zixi",
"8.08/A Shingo Ikuta",
"8.08/B Tristan Aurelius Chandra",
"8.10/A Ignacio Sutowo",
"8.10/B Brian Kenzo Kusumo",
"8.11/A Michael Hanson Sugiharto",
"8.11/B Felix Tatang",
"8.13/A Darren Michael Handoko",
"8.13/B Liew Xun Wah",
"8.14/A Justin Nathanael",
"8.14/B Nguyen Dinh Bach",
"8.15/A Samuel Christopher Titiheruw",
"8.15/B Le Khac Minh Dinh",
"8.16/A Chang Tristan",
"8.16/B Pham Nguyen Minh Khang"
];

window.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.getElementById("name_dropdown");
  if (!dropdown) return;

  for (const name of nameDatabase) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    dropdown.appendChild(option);
  }
});

