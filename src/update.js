const fs = require("fs");
const path = require("path");
const Lo = require("unicode/category/Lo");

function buildNormalizeArabic(charactersObject) {
    const obj = {};
    for (const key in charactersObject) {
        const { name, symbol, mapping } = charactersObject[key];
        for (const match of mapping.matchAll(/^<(isolated|initial|final|medial)> (.*)/g)) {
          // 0640: kashida
          mappingCharacters = match[2].split(" ");
          if (mappingCharacters.length < 4) {
              // if the first character of mapping is space, remove it
              if (mappingCharacters[0] === '0020') {
                mappingCharacters.shift()
              }
                obj[symbol] = {
                    name: name,
                    replace: mappingCharacters.map((code) => String.fromCodePoint(parseInt(code, 16))).join(""),
                };
            }
        }
    }
    return obj;
}

const jsonData = JSON.stringify(buildNormalizeArabic(Lo), null, 2);
const filePath = path.join(__dirname, "..", "lib", "data.json");

fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
        console.error("Error writing file", err);
    } else {
        console.log("File has been written successfully");
    }
});
