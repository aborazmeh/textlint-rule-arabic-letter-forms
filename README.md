# textlint-rule-arabic-letter-forms

a rule to find strict forms of letters (isolated, initial, medial, final) and normalize them

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-arabic-letter-forms

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "arabic-letter-forms": true
    }
}
```

Via CLI

```
textlint --rule arabic-letter-forms README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## License

MIT © aborazmeh
