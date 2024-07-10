import TextLintTester from "textlint-tester";
import rule from "../src/index";

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
        }
    ]
});
