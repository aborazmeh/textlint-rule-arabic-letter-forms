# textlint-rule-arabic-letter-forms [![Actions Status: test](https://github.com/aborazmeh/textlint-rule-arabic-letter-forms/workflows/test/badge.svg)](https://github.com/aborazmeh/textlint-rule-arabic-letter-forms/actions?query=workflow%3A"test") [![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/)


A rule to find strict forms of letters (isolated, initial, medial, final) and normalize them.

These forms usually cause problems with search as softwares don't look for other letter forms, for example try to look for `كلمة` and you won't probably get `ﻛﻠﻤﺔ` as a match:

- the character `ك` (`U+0643`) ≠ `ﻛ` (`U+FEDB`)
- the character `ل` (`U+0644`) ≠ `ﻠ` (`U+FEE0`)
- the character `م` (`U+0645`) ≠ `ﻤ` (`U+FEE4`)
- the character `ة` (`U+0629`) ≠ `ﺔ` (`U+FE94`)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-arabic-letter-forms

## Example

    ﻗﺩ ﻴﺘﺭﺍﺀﻯ ﻓﻲ ﺍﻟﻭﻫﻠﺔ ﺍﻷﻭﻟﻰ ﺃﻥ ﺍﻟﺠﻴﻭﻟﻭﺠﻴﺎ، ﻭﺍﻟﻔﻴﺯﻴﺎﺀ ﻓﺭﻋﺎﻥ ﻤﻥ
    ﺍﻟﻌﻠﻭﻡ ﺒﻌﻴﺩﺍﻥ ﺃﺤﺩﻫﻤﺎ ﻋﻥ ﺍﻵﺨﺭ. ﻟﻜﻥ ﺍﻟﺤﻘﻴﻘﺔ ﻏﻴﺭ ﺫﻟﻙ. ﻓﺎﻟﻔﻴﺯﻴﺎﺀ ،ﺘﺤﺩﻴﺩﺍﹰ،
    ﻫﻲ ﺍﻟﺘﻲ ﺴﺎﻋﺩﺕ ﺍﻟﺠﻴﻭﻟﻭﺠﻴﻴﻥ ﻓﻲ ﺍﻟﻜﺸﻑ ﻋﻥ ﻋﺩﺩ ﻜﺒﻴﺭ ﻤﻥ ﻤﻜﺎﻤﻥ ﺍﻟﻨﺤﺎﺱ،
    ﻭﺍﻟﺤﺩﻴﺩ، ﻭﺍﻟﻨﻔﻁ، ﻭﺍﻟﻔﺤﻡ، ﻭﺍﻟﻤﺎﺀ، ﻭﺍﻟﻤﻠﺢ، ﻭﻤﻭﺍﺩ ﺍﻟﺒﻨﺎﺀ، ﻭﻏﻴﺭﻫﺎ.
    ﻜﺜﻴﺭﺍﹰ ﻤﺎ ﻴﺩﻫﺵ ﻤﻥ ﻴﻘﺭﺃ ﻜﺘﺎﺒﺎﹰ ﻓﻲ ﺍﻟﺠﻴﻭﻓﻴﺯﻴﺎﺀ ﻤﻥ ﺍﻟﻭﺍﻗﻌﺔ ﺍﻟﺘﺎﻟﻴﺔ:
    ﺘﺘﺤﺩﺙ ﻫﺫﻩ ﺍﻟﻜﺘﺏ ﻋﻥ ﻋﻤﻠﻴﺎﺕ ﻭﻅﻭﺍﻫﺭ ﻴﺭﺼﺩﻫﺎ ﺍﻟﺠﻴﻭﻓﻴﺯﻴﺎﺌﻴﻭﻥ ﻓﻲ
    ﺍﻟﻁﺒﻴﻌﺔ، ﻭﻟﻴﺱ ﻓﻲ ﻤﺨﺎﺒﺭ ﺍﻟﻔﻴﺯﻴﺎﺀ، ﺤﻴﺙ ﺍﻟﻅﻭﺍﻫﺭ ﺍﻟﻤﺨﺘﻠﻔﺔ ﻏﺎﻟﺒﺎﹰ ﻤﺎ ﺘﺤﺼل ﻋﻠﻰ
    ﻨﺤﻭٍ ﻤﺘﺯﺍﻤﻥ، ﻭﻤﻌﻘﱠﺩ، ﻭﻤﺘﺩﺍﺨل. ﺜﻡ ﺇﻨﻪ ﻻﺒﺩ ﻫﻨﺎ ﻤﻥ ﺤلﱟ ﻟﻤﺎ ﻨﻭﺍﺠﻪ ﻤﻥ ﺃﻟﻐﺎﺯ.

Fixed text:

    قد يتراءى في الوهلة الأولى أن الجيولوجيا، والفيزياء فرعان من
    العلوم بعيدان أحدهما عن الآخر. لكن الحقيقة غير ذلك. فالفيزياء ،تحديداً،
    هي التي ساعدت الجيولوجيين في الكشف عن عدد كبير من مكامن النحاس،
    والحديد، والنفط، والفحم، والماء، والملح، ومواد البناء، وغيرها.
    كثيراً ما يدهش من يقرأ كتاباً في الجيوفيزياء من الواقعة التالية:
    تتحدث هذه الكتب عن عمليات وظواهر يرصدها الجيوفيزيائيون في
    الطبيعة، وليس في مخابر الفيزياء، حيث الظواهر المختلفة غالباً ما تحصل على
    نحوٍ متزامن، ومعقَّد، ومتداخل. ثم إنه لابد هنا من حلٍّ لما نواجه من ألغاز.

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

### Fixable

[![textlint rule](https://img.shields.io/badge/textlint-fixable-green.svg?style=social)](https://textlint.github.io/) 

```
textlint --rule arabic-letter-forms --fix README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

    npm test

## TODO

- Some characters have spaces in their mapping (like `U+FE70`, `U+FE72`, `U+FE74`), or a Kasheeda (Tatweel) (like `U+FE71`), the space and the Kasheeda should be probably removed, so the character will be on the previous letter as it should be.

## License

MIT © aborazmeh
