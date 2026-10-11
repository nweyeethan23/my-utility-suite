// Long-form explanatory copy for everyday text, calculation and conversion tools.

export const tier3 = {
  'word-counter': {
    sections: [
      {
        h: 'What the counts mean',
        p: [
          `The word counter reports words, characters with and without spaces, sentences and paragraphs, and estimates how long your text takes to read or speak. Words are counted by splitting on spaces and line breaks, so a hyphenated term such as well-known counts as one word. Character counts matter whenever a platform sets a hard limit, and the version without spaces is handy for fields that count only visible characters. Keyword frequency shows which meaningful words you repeat most, which helps you notice overused terms in an essay or check that an article actually covers its topic.`,
        ],
      },
      {
        h: 'Reading speed and speaking time',
        p: [
          `Adults typically read silently at around 200 to 250 words per minute for ordinary prose, and this tool uses 225 words per minute for its reading-time estimate. Technical, dense or unfamiliar material is read more slowly. Speaking is slower than reading: a comfortable presentation pace is roughly 130 words per minute, so a five-minute talk needs about 650 words. Treat these figures as planning estimates, since individual readers and speakers vary widely.`,
        ],
      },
      {
        h: 'How long should your text be?',
        p: [
          `The right length depends on the format. Short social posts work best when they are concise, while articles and essays need enough depth to answer the reader's question properly. School and university essays usually come with a required range, so check your assignment brief first. For web articles, aim to cover the topic completely rather than hitting an arbitrary number, and keep paragraphs short enough to scan on a phone. The table lists common character limits so you can check your text before posting.`,
        ],
      },
    ],
    table: {
      title: 'Common character limits',
      head: ['Where', 'Limit'],
      rows: [
        ['X (Twitter) post, standard account', '280 characters'],
        ['Instagram caption', '2,200 characters'],
        ['LinkedIn post', '3,000 characters'],
        ['YouTube video title', '100 characters'],
        ['YouTube video description', '5,000 characters'],
        ['Single SMS (standard characters)', '160 characters'],
        ['Search result title / description (guideline)', 'About 60 / 155 characters'],
      ],
    },
    faqs: [
      ['Does the counter include spaces?', 'It shows both counts: characters including spaces and characters without spaces, so you can match whichever rule your platform uses.'],
      ['Does the counter work for Thai, Chinese or Japanese?', 'These languages are written without spaces between words, and the counter splits words on spaces, so the word total will be unreliable. Use the character count instead.'],
    ],
  },

  'case-converter': {
    sections: [
      {
        h: 'The main text cases',
        p: [
          `Different cases exist because people and programs read text differently. UPPERCASE and lowercase change every letter. Title Case capitalises the main words of a heading and usually leaves short words such as a, of and the in lowercase unless they come first. Sentence case capitalises only the first word of each sentence and proper nouns, and is now common for interface text and headlines because it reads more naturally. The converter handles these in one click, but always read the result, since proper nouns, acronyms and style-guide exceptions are decisions a tool cannot fully make.`,
        ],
      },
      {
        h: 'Cases used in programming',
        p: [
          `Developers use cases that remove spaces so names can be valid identifiers. camelCase joins words and capitalises each one after the first, as in userAccountId. PascalCase capitalises every word, including the first, and is often used for classes and components. snake_case joins lowercase words with underscores and is the norm in Python and many databases, while kebab-case uses hyphens and is standard for CSS classes, file names and web addresses. Constants are often written in uppercase with underscores. Teams usually follow one convention per language, and consistent naming makes code easier to search and review.`,
        ],
      },
      {
        h: 'Copyediting tips',
        p: [
          `If you pasted text typed with caps lock on, convert it to sentence case and then fix names and acronyms by hand. For headings, decide on one style for the whole document, because mixing Title Case and sentence case looks careless. Title case rules differ between style guides, particularly for words of four or five letters and for prepositions, so check your guide when it matters. Cleaning case before you publish is quick and prevents small inconsistencies from creeping in.`,
        ],
      },
    ],
    table: {
      title: 'Case styles compared',
      head: ['Style', 'Example', 'Common use'],
      rows: [
        ['UPPERCASE', 'QUICK BROWN FOX', 'Emphasis, acronyms, constants'],
        ['Title Case', 'The Quick Brown Fox', 'Headings, book and article titles'],
        ['Sentence case', 'The quick brown fox', 'Body text, UI labels'],
        ['camelCase', 'quickBrownFox', 'JavaScript variables and functions'],
        ['PascalCase', 'QuickBrownFox', 'Classes and components'],
        ['snake_case', 'quick_brown_fox', 'Python, database columns'],
        ['kebab-case', 'quick-brown-fox', 'CSS classes, URLs, file names'],
      ],
    },
    faqs: [
      ['Why are some small words left lowercase in Title Case?', 'Most style guides keep short articles, conjunctions and prepositions lowercase unless they begin the title. Adjust by hand if your guide differs.'],
      ['Can I convert variable names between styles?', 'Yes. Paste words or an existing name and choose camelCase, snake_case or kebab-case. Review the result if your input contains numbers or acronyms.'],
    ],
  },

  'percentage-calculator': {
    sections: [
      {
        h: 'The three basic percentage questions',
        p: [
          `Almost every percentage problem is one of three questions. To find a percentage of a number, multiply the number by the percentage divided by 100: 20 percent of 80 is 80 × 0.20 = 16. To find what percentage one number is of another, divide the part by the whole and multiply by 100: 15 out of 60 is 15 ÷ 60 × 100 = 25 percent. To find a percentage change, subtract the old value from the new one, divide by the old value and multiply by 100: going from 50 to 65 is (65 − 50) ÷ 50 × 100 = a 30 percent increase.`,
        ],
      },
      {
        h: 'Discounts, tax and tips',
        p: [
          `For a discount, work out the percentage of the price and subtract it: 25 percent off 80 saves 20 and leaves 60. Adding tax or a service charge works the other way, so 7 percent tax on 100 gives 107. To reverse a discount and find the original price, divide the sale price by one minus the discount rate; if an item costs 80 after 20 percent off, the original was 80 ÷ 0.80 = 100. This is a common trap, because 20 percent of the sale price is not the amount that was taken off.`,
          `Percent increases and decreases are not symmetrical. If a price rises 50 percent and then falls 50 percent, it ends up 25 percent lower than where it started, because the second change applies to a larger number. Keep this in mind when comparing price changes, investment returns or exam scores.`,
        ],
      },
      {
        h: 'Percent vs. percentage points',
        p: [
          `A rate that moves from 10 percent to 12 percent has risen by 2 percentage points, but by 20 percent in relative terms. News reports and financial documents mix these up often, so check which one is meant. Use percentage points for the simple difference between two percentages, and percent change when you want the proportional difference.`,
        ],
      },
    ],
    table: {
      title: 'Percentage formulas at a glance',
      head: ['Question', 'Formula', 'Example'],
      rows: [
        ['X% of Y', 'Y × X ÷ 100', '20% of 80 = 16'],
        ['X is what % of Y', 'X ÷ Y × 100', '15 of 60 = 25%'],
        ['Percentage change', '(New − Old) ÷ Old × 100', '50 → 65 = +30%'],
        ['Price after discount', 'Price × (1 − rate)', '80 at 25% off = 60'],
        ['Original from sale price', 'Sale ÷ (1 − rate)', '80 after 20% off = 100'],
      ],
    },
    faqs: [
      ['How do I calculate a percentage increase?', 'Subtract the old number from the new one, divide by the old number, and multiply by 100. A positive result is an increase and a negative result is a decrease.'],
      ['Why does a 50% rise followed by a 50% fall not return to the start?', 'Because the second percentage is taken from the new, larger value. A 100 item raised 50% becomes 150, and a 50% drop takes it to 75.'],
    ],
  },

  'age-calculator': {
    sections: [
      {
        h: 'How age is calculated',
        p: [
          `Your age in years increases on each birthday. To work out exact age, the calculator subtracts the birth date from the chosen date in three parts: years, then months, then days. When the day of the month in the end date is earlier than in the birth date, it borrows the length of the previous month, which is how most people count in everyday life. You can also change the "age at" date to find how old someone was, or will be, on a particular day, such as a school enrolment deadline or a retirement date.`,
        ],
      },
      {
        h: 'Leap years and date math',
        p: [
          `The calendar year is slightly longer than 365 days, so an extra day is added to February in most years that divide by 4. The exception is century years: a year divisible by 100 is not a leap year unless it is also divisible by 400. That is why 2000 and 2024 were leap years while 1900 and 2100 are not. These extra days affect total day counts, which is why the number of days between two dates is not simply years multiplied by 365.`,
          `People born on 29 February are a special case. In non-leap years, different countries and institutions treat their legal birthday as either 28 February or 1 March, so check the rule that applies to you for official purposes.`,
        ],
      },
      {
        h: 'Chronological age and exact counts',
        p: [
          `Chronological age is the time since birth, shown as years, months and days. The calculator also converts it into total days, weeks and hours, which is useful for milestones, anniversaries or simple curiosity. Hours are shown as whole days times 24, so they are an approximation that does not account for the exact time of birth or daylight saving changes. Common practical uses include checking eligibility for school entry, insurance, pensions, driving licences and age-restricted services, and filling in forms that ask for age on a specific date.`,
        ],
      },
    ],
    table: {
      title: 'Is it a leap year?',
      head: ['Year', 'Divisible by 4', 'Divisible by 100', 'Divisible by 400', 'Leap year?'],
      rows: [
        ['2024', 'Yes', 'No', 'No', 'Yes'],
        ['2026', 'No', 'No', 'No', 'No'],
        ['1900', 'Yes', 'Yes', 'No', 'No'],
        ['2000', 'Yes', 'Yes', 'Yes', 'Yes'],
        ['2100', 'Yes', 'Yes', 'No', 'No'],
      ],
    },
    faqs: [
      ['What about people born on 29 February?', 'The next-birthday date follows standard date handling, which in non-leap years usually lands on 1 March. Legal rules differ by country, so check the one that applies for official purposes.'],
      ['Why does the hours figure not match my exact hours alive?', 'It is calculated from whole days, so it does not include your birth time or time zone changes. It is an estimate rather than an exact count.'],
    ],
  },

  'pdf-splitter': {
    sections: [
      {
        h: 'Extracting pages and page ranges',
        p: [
          `The splitter creates a new PDF that contains only the pages you choose from an existing one. Type the pages as a comma-separated list, using a hyphen for ranges. For example, 1-3, 5, 10-12 keeps pages 1, 2, 3, 5, 10, 11 and 12. Page numbers refer to the position in the file, not to any number printed on the page, so a document with a cover page may need an offset. The selected pages are saved in ascending order in a single new file, and your original is never changed.`,
        ],
      },
      {
        h: 'Common ways to use it',
        p: [
          `People most often split to send only the relevant part of a long document, such as one chapter of a report, a single signed page from a contract, or the pages that match a form requirement. It is also a good way to reduce file size before emailing, because removing pages you do not need cuts the weight directly. To separate a large document into several files, run the tool once for each section, using a different page range every time. Check your page count first: the tool shows how many pages the file has once it loads.`,
        ],
      },
      {
        h: 'Bookmarks, links and protected files',
        p: [
          `Pages are copied into a new document, so document-level features such as the bookmark outline, table-of-contents links and some form behaviour may not carry over to the extracted file. Visible text, images and layout are preserved. If your PDF is protected with a password or restrictions, it may not open here, and you will see a message that the file could not be read. Remove the protection in the program that created it, if you have permission to do so, then try again. Because everything runs in your browser, the document is not uploaded anywhere while you work.`,
        ],
      },
    ],
    table: {
      title: 'Page range examples',
      head: ['You type', 'Pages kept'],
      rows: [
        ['5', 'Page 5 only'],
        ['1-3', 'Pages 1, 2 and 3'],
        ['1-3, 5, 10-12', 'Pages 1, 2, 3, 5, 10, 11, 12'],
        ['2, 4, 6', 'Pages 2, 4 and 6'],
      ],
    },
    faqs: [
      ['Can I reorder pages with the splitter?', 'No. Pages are saved in ascending order. To combine or arrange documents, extract what you need and then use the PDF Merger.'],
      ['What happens if I enter a page number that does not exist?', 'Page numbers outside the document are ignored. If none of your numbers are valid, the tool shows a message with the allowed range.'],
    ],
  },

  'image-resizer': {
    sections: [
      {
        h: 'Pixels, dimensions and file size',
        p: [
          `Resizing changes how many pixels an image contains, measured as width by height. Fewer pixels mean less data to store, so shrinking the dimensions is one of the most effective ways to reduce file size, usually more effective than lowering quality. Resizing down is safe because the program only discards detail. Resizing up is different: the tool must invent pixels, so enlarging a small image makes it blurry rather than sharper. Start from the largest original you have and scale down to what you need.`,
        ],
      },
      {
        h: 'Aspect ratio lock explained',
        p: [
          `The aspect ratio is the proportion between width and height, such as 16:9 for widescreen video, 4:3 for older screens and many cameras, 3:2 for common photos and 1:1 for squares. With the lock switched on, changing the width automatically adjusts the height so the picture is not squeezed or stretched. Turn the lock off only when you intentionally want new proportions, for instance to fill a fixed banner space, and expect the content to look distorted unless you crop it first.`,
          `Files are saved in their own format when it is PNG or WebP, and as JPG otherwise, at a high quality setting. Processing happens in your browser, so your photos stay on your device.`,
        ],
      },
      {
        h: 'Typical social media image sizes',
        p: [
          `Platforms change their layouts from time to time, so treat the sizes below as common starting points and check the current guidance before designing something important. Uploading an image close to the target size avoids unwanted automatic cropping and extra compression by the platform.`,
        ],
      },
    ],
    table: {
      title: 'Common image sizes (pixels)',
      head: ['Use', 'Typical size', 'Ratio'],
      rows: [
        ['Instagram square post', '1080 × 1080', '1:1'],
        ['Instagram portrait post', '1080 × 1350', '4:5'],
        ['Stories and vertical video', '1080 × 1920', '9:16'],
        ['Facebook or link-share image', '1200 × 630', 'About 1.91:1'],
        ['YouTube thumbnail', '1280 × 720', '16:9'],
        ['X (Twitter) profile photo', '400 × 400', '1:1'],
      ],
    },
    faqs: [
      ['Why does my enlarged image look blurry?', 'Enlarging adds pixels that were not in the original, so detail cannot improve. Use a larger source image if you need a bigger result.'],
      ['Should I resize or compress to reduce file size?', 'Try resizing first, because fewer pixels shrink the file the most. Then compress if you need it smaller still.'],
    ],
  },

  'unit-converter': {
    sections: [
      {
        h: 'Metric and imperial systems',
        p: [
          `Most of the world uses the metric system, where units are linked by powers of ten: a kilometre is 1,000 metres and a metre is 100 centimetres. The United States still uses customary units such as inches, pounds and gallons in daily life, and the United Kingdom uses a mix of both. Conversion is easy when you know the exact factors, and every imperial unit today is officially defined in metric terms. An inch is exactly 2.54 centimetres, a pound is exactly 0.45359237 kilograms and a mile is exactly 1.609344 kilometres.`,
        ],
      },
      {
        h: 'Categories covered and common pitfalls',
        p: [
          `The converter handles length, weight, volume, speed and temperature. Temperature is different from the others because Celsius, Fahrenheit and Kelvin do not share a common zero. You convert it with a formula, not just a multiplier: Fahrenheit equals Celsius times 9/5 plus 32, and Kelvin equals Celsius plus 273.15. For that reason 20 degrees Celsius is 68 degrees Fahrenheit, not double or half of anything.`,
          `Volume has a well-known trap. A US gallon is about 3.785 litres, but a UK (imperial) gallon is about 4.546 litres, roughly 20 percent larger, and cups, teaspoons and tablespoons also differ between countries. The tool labels US units explicitly so you pick the right one, which matters when you follow a recipe or compare fuel economy figures. For cooking and baking, weight measurements are more reliable than volume.`,
        ],
      },
      {
        h: 'Tips for accurate conversion',
        p: [
          `Convert from the most precise number you have and round only at the end. For everyday use, a few decimal places are plenty. Use the swap button to reverse a conversion and double-check it, and watch for the unit names in the drop-down menus to avoid mixing similar units such as ounces of weight and fluid ounces.`,
        ],
      },
    ],
    table: {
      title: 'Quick conversion cheat sheet',
      head: ['From', 'To', 'Multiply or use'],
      rows: [
        ['1 inch', 'centimetres', '2.54'],
        ['1 foot', 'metres', '0.3048'],
        ['1 mile', 'kilometres', '1.609344'],
        ['1 pound', 'kilograms', '0.45359237'],
        ['1 US gallon', 'litres', '3.785'],
        ['1 knot', 'km/h', '1.852'],
        ['°C', '°F', '× 9/5 + 32'],
      ],
    },
    faqs: [
      ['Why is the temperature result not a simple multiple?', 'Celsius, Fahrenheit and Kelvin start from different zero points, so conversion needs an offset as well as a scale factor.'],
      ['Are US and UK gallons the same?', 'No. A US gallon is about 3.785 litres and a UK gallon is about 4.546 litres, so choose the correct one for your source.'],
    ],
  },

  'height-converter': {
    sections: [
      {
        h: 'Converting feet and inches to centimetres',
        p: [
          `Height is written in feet and inches in the United States and often in the United Kingdom, while most other countries use centimetres. To convert, first change the whole measurement into inches by multiplying the feet by 12 and adding the extra inches. Then multiply by 2.54, since an inch is exactly 2.54 centimetres. A person who is 5 feet 9 inches tall is 69 inches, which is 175.26 centimetres, usually rounded to 175 cm.`,
        ],
        formula: 'cm = (feet × 12 + inches) × 2.54',
      },
      {
        h: 'Converting centimetres back to feet and inches',
        p: [
          `Going the other way, divide the centimetres by 2.54 to get total inches, then divide by 12. The whole number is the feet, and the remainder is the inches. For example, 172 cm equals about 67.7 inches, which is 5 feet and 7.7 inches, commonly written as 5 ft 8 in after rounding. Because people round differently, you may see results that differ by an inch between websites, so round the way the form or document in front of you asks for.`,
        ],
      },
      {
        h: 'When you need this conversion',
        p: [
          `The conversion comes up with passport, visa and travel forms, job and school applications, medical records, sports registrations, dating profiles and clothing or furniture sizing. Many official forms ask for centimetres, so it helps to convert once and enter the whole number requested. When accuracy matters for an official document, use the measurement written on an existing ID or ask the issuing office which rounding rule it applies.`,
        ],
      },
    ],
    table: {
      title: 'Common heights in feet/inches and centimetres',
      head: ['Feet and inches', 'Centimetres'],
      rows: [
        ['5 ft 0 in', '152.4 cm'],
        ['5 ft 3 in', '160.0 cm'],
        ['5 ft 6 in', '167.6 cm'],
        ['5 ft 9 in', '175.3 cm'],
        ['6 ft 0 in', '182.9 cm'],
        ['6 ft 3 in', '190.5 cm'],
      ],
    },
    faqs: [
      ['Why do two converters give results one centimetre apart?', 'Different tools round differently. This one uses the exact factor of 2.54 cm per inch, so round the result the way your form asks.'],
      ['Should I round my height up or down?', 'Round to the nearest whole centimetre unless a form asks for something else. For official documents, match the figure on your existing ID.'],
    ],
  },

  'color-converter': {
    sections: [
      {
        h: 'HEX, RGB and HSL explained',
        p: [
          `The same color can be written in several ways. RGB describes how much red, green and blue light a screen mixes, each from 0 to 255, so pure red is rgb(255, 0, 0). Screens are additive: combining all three at full strength gives white and none gives black. HEX is simply RGB written in base 16, with two characters per channel, which makes pure red #FF0000. Three-digit shorthand such as #F00 repeats each digit. HSL describes color the way people think about it: hue as an angle from 0 to 360 on the color wheel, saturation as how vivid it is, and lightness as how close to white or black it sits.`,
        ],
      },
      {
        h: 'Which format should you use?',
        p: [
          `HEX is compact and the most common format in design tools and style sheets. RGB is useful when you work with transparency or need to calculate values in code. HSL is the easiest format for adjusting a color by hand, because you can make a lighter or darker shade by changing only the lightness number while keeping the same hue, which is ideal for building hover states and palettes. This converter accepts HEX, rgb() and hsl() values and shows all three, with a preview so you can confirm that you have the color you expect.`,
        ],
      },
      {
        h: 'Color contrast and accessibility',
        p: [
          `Choosing a color is not just about looks. Text must be readable by people with low vision or color blindness, and the Web Content Accessibility Guidelines set minimum contrast ratios between text and its background. Normal text should reach at least 4.5 to 1 for level AA, large text and user interface components need 3 to 1, and level AAA asks for 7 to 1 for normal text. Light gray text on white and pale colors on colored buttons are the most common failures. Never rely on color alone to convey meaning, such as marking errors only in red, and use a dedicated contrast checker once you have settled on your palette.`,
        ],
      },
    ],
    table: {
      title: 'Common colors in three formats',
      head: ['Color', 'HEX', 'RGB', 'HSL'],
      rows: [
        ['Black', '#000000', 'rgb(0, 0, 0)', 'hsl(0, 0%, 0%)'],
        ['White', '#FFFFFF', 'rgb(255, 255, 255)', 'hsl(0, 0%, 100%)'],
        ['Red', '#FF0000', 'rgb(255, 0, 0)', 'hsl(0, 100%, 50%)'],
        ['Yellow', '#FFFF00', 'rgb(255, 255, 0)', 'hsl(60, 100%, 50%)'],
        ['Blue', '#0000FF', 'rgb(0, 0, 255)', 'hsl(240, 100%, 50%)'],
        ['Gray', '#808080', 'rgb(128, 128, 128)', 'hsl(0, 0%, 50%)'],
      ],
    },
    faqs: [
      ['Why do HEX and RGB values look different but give the same color?', 'HEX is just RGB written in base 16. For example, FF in hex equals 255 in decimal, so #FF0000 and rgb(255, 0, 0) are identical.'],
      ['Can I enter a three-digit HEX code?', 'Yes. Shorthand such as #0F8 is expanded by repeating each digit, so it becomes #00FF88.'],
    ],
  },
};
