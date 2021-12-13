const json = require("./myjsonfile.json");
const fs = require("fs");
const arr = [
  { id: "1", number: "Pf001", name: "88StageGrand", category: "PNO" },
];

json.map((item) => {
  const findIndex = arr.findIndex((el) => el.id === item.id);
  if (findIndex > -1) {
    arr[findIndex] = item;
    return;
  }
  arr.push(item);
});

var result = JSON.stringify(arr);
fs.writeFile("./myjsonfile2.json", result, "utf8", () => {
  console.log("terminou");
});
