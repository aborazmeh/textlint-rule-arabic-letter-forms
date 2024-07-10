const fs = require("fs");
const path = require("path");
const Lo = require("unicode/category/Lo");

function buildNormalizeArabic(charactersObject) {
    const obj = {};
    for (const key in charactersObject) {
        const { name, symbol, mapping } = charactersObject[key];
        for (const match of mapping.matchAll(/^<(isolated|initial|final|medial)> (.*)/g)) {
            // 0020: space
            // 0640: kashida
            mappingCharacters = match[2].split(" ");
            // TODO handle longer ligatures
            if (mappingCharacters.length < 4) {
                // replace(' 0020', '').replace(' 0640', '').split(' ')
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
