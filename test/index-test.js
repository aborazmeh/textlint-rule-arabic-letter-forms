import TextLintTester from "textlint-tester";
import rule from "../src/index";
const fs = require("fs");
const path = require("path");

let characters;
try {
    const filePath = path.join(__dirname, "..", "lib", "data.json");
    characters = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (err) {
    console.error("Error reading data file", err);
}

const generateInvalid = text => {
    let errors = [];
    text.split("").forEach((c, idx) => {
        if (c in characters) {
            let range = [idx, idx + 1];
            errors.push({
                message: `Found letter ${characters[c].name}.`,
                range: range
            });
        }
    });

    return {
        text: text,
        output: text.replace(/./g, (char) => (characters[char] && characters[char].replace) || char),
        errors: errors
    };
}

const tester = new TextLintTester();
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: ["قد"],
    invalid: [
        {
            text: "ﻗﺩ",
            output: "قد",
            errors: [
                {
                    message: 'Found letter ARABIC LETTER QAF INITIAL FORM.',
                    range: [0,1]
                },
                {
                    message: 'Found letter ARABIC LETTER DAL ISOLATED FORM.',
                    range: [1, 2]
                }
            ]
        },
        generateInvalid(`
ﻗﺩ ﻴﺘﺭﺍﺀﻯ ﻓﻲ ﺍﻟﻭﻫﻠﺔ ﺍﻷﻭﻟﻰ ﺃﻥ ﺍﻟﺠﻴﻭﻟﻭﺠﻴﺎ، ﻭﺍﻟﻔﻴﺯﻴﺎﺀ ﻓﺭﻋﺎﻥ ﻤﻥ
ﺍﻟﻌﻠﻭﻡ ﺒﻌﻴﺩﺍﻥ ﺃﺤﺩﻫﻤﺎ ﻋﻥ ﺍﻵﺨﺭ. ﻟﻜﻥ ﺍﻟﺤﻘﻴﻘﺔ ﻏﻴﺭ ﺫﻟﻙ. ﻓﺎﻟﻔﻴﺯﻴﺎﺀ ،ﺘﺤﺩﻴﺩﺍﹰ،
ﻫﻲ ﺍﻟﺘﻲ ﺴﺎﻋﺩﺕ ﺍﻟﺠﻴﻭﻟﻭﺠﻴﻴﻥ ﻓﻲ ﺍﻟﻜﺸﻑ ﻋﻥ ﻋﺩﺩ ﻜﺒﻴﺭ ﻤﻥ ﻤﻜﺎﻤﻥ ﺍﻟﻨﺤﺎﺱ،
ﻭﺍﻟﺤﺩﻴﺩ، ﻭﺍﻟﻨﻔﻁ، ﻭﺍﻟﻔﺤﻡ، ﻭﺍﻟ ﻤ ﺎﺀ، ﻭﺍﻟﻤﻠﺢ، ﻭﻤﻭﺍﺩ ﺍﻟﺒﻨﺎﺀ، ﻭﻏﻴﺭﻫﺎ.
ﻜﺜﻴﺭﺍﹰ ﻤﺎ ﻴﺩﻫﺵ ﻤﻥ ﻴﻘﺭﺃ ﻜﺘﺎﺒﺎﹰ ﻓﻲ ﺍﻟﺠﻴﻭﻓﻴﺯﻴﺎﺀ ﻤﻥ ﺍﻟﻭﺍﻗﻌﺔ ﺍﻟﺘﺎﻟﻴﺔ:
ﺘﺘﺤﺩﺙ ﻫﺫﻩ ﺍﻟﻜﺘﺏ ﻋﻥ ﻋﻤﻠﻴﺎﺕ ﻭﻅﻭﺍﻫﺭ ﻴﺭﺼﺩﻫﺎ ﺍﻟﺠﻴﻭﻓﻴﺯﻴﺎﺌﻴﻭﻥ ﻓﻲ
ﺍﻟﻁﺒﻴﻌﺔ، ﻭﻟﻴﺱ ﻓﻲ ﻤﺨﺎﺒﺭ ﺍﻟﻔﻴﺯﻴﺎﺀ، ﺤﻴﺙ ﺍﻟﻅﻭﺍﻫﺭ ﺍﻟﻤﺨﺘﻠﻔﺔ ﻏﺎﻟﺒﺎﹰ ﻤﺎ ﺘﺤﺼل ﻋﻠﻰ
ﻨﺤﻭٍ ﻤﺘﺯﺍﻤﻥ، ﻭﻤﻌﻘﱠﺩ، ﻭﻤﺘﺩﺍﺨل. ﺜﻡ ﺇﻨﻪ ﻻﺒﺩ ﻫﻨﺎ ﻤﻥ ﺤلﱟ ﻟﻤﺎ ﻨﻭﺍﺠﻪ ﻤﻥ ﺃﻟﻐﺎﺯ.
      `)
    ]
});
