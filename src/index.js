const fs = require("fs");
const path = require("path");

let characters;
try {
    const filePath = path.join(__dirname, "..", "lib", "data.json");
    characters = JSON.parse(fs.readFileSync(filePath, "utf8"));
} catch (err) {
    console.error("Error reading data file", err);
}

/**
 * @param {import("@textlint/types").TextlintRuleContext} context
 * @returns {import("@textlint/types").TextlintRuleCreator}
 */
function report(context) {
    const { Syntax, RuleError, fixer, report, getSource, locator } = context;
    const regex = new RegExp(`[${Object.keys(characters).join("")}]`, "g");

    return {
        [Syntax.Str](node) {
            // "Str" node
            const text = getSource(node); // Get text
            const matches = text.matchAll(regex);
            for (const match of matches) {
                const index = match.index ?? 0;
                const matchRange = [index, index + match[0].length];
                const ruleError = new RuleError(`Found letter ${characters[match[0]].name}.`, {
                    padding: locator.range(matchRange),
                    fix: fixer.replaceTextRange(matchRange, characters[match[0]].replace),
                });
                report(node, ruleError);
            }
        },
    };
}

export default {
    linter: report,
    fixer: report,
};
