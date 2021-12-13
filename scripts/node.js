const fs = require("fs");
const readline = require("readline");

const category = [
  "PNO",
  "EP",
  "ORG",
  "KEY",
  "BEL",
  "MLT",
  "ACD",
  "HRM",
  "AGT",
  "EGT",
  "DGT",
  "BS",
  "SBS",
  "STR",
  "ORC",
  "HIT",
  "PLK",
  "ETH",
  "PRC",
  "SFX",
  "BTS",
  "DRM",
  "CMB",
  "FRT",
  "PRC",
  "BRS",
  "SBR",
  "SAX",
  "FLT",
  "WND",
  "BRS",
  "VOX",
  "BPD",
  "SPD",
  "HLD",
  "SLD",
  "SYN",
  "TEK",
  "PLS",
];

async function processLineByLine() {
  const fileStream = fs.createReadStream("./text.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  const obj = [];

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
    const arrLine = line.split(" ");
    arrLine.map((word, i) => {
      if (category.includes(word)) {
        obj.push({
          id: arrLine[0],
          number: arrLine[1],
          name: arrLine.slice(2, i).join(" "),
          category: arrLine[i],
        });
      }
    });
  }

  var json = JSON.stringify(obj);
  fs.writeFile("./myjsonfile.json", json, "utf8", () => {
    console.log("terminou");
  });
}

processLineByLine();
