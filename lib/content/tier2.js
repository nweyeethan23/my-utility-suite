// Long-form explanatory copy for developer and file utilities.

export const tier2 = {
  'json-formatter': {
    sections: [
      {
        h: 'Why formatting and validating JSON matters',
        p: [
          `JSON is the most common format for sending data between a browser, a server and the APIs in between. Machines do not care about whitespace, so API responses are usually delivered as one long line to save bandwidth. That is fine for a program but nearly impossible for a person to read. Beautifying the text, meaning adding line breaks and indentation, reveals the nesting of objects and arrays so you can spot a missing field or a wrong value in seconds. Validation matters just as much, because a single misplaced character makes the whole document unreadable to a parser, and the error messages produced by applications are often vague.`,
        ],
      },
      {
        h: 'Common JSON syntax errors',
        p: [
          `Most invalid JSON comes from habits carried over from JavaScript or from editing by hand. The mistakes below account for the large majority of parse errors, and the error message from the formatter points to where parsing failed so you can fix it quickly.`,
        ],
        list: [
          `Trailing commas after the last item in an object or array are not allowed.`,
          `Strings and keys must use double quotes. Single quotes and unquoted keys are invalid.`,
          `Quotes, backslashes and line breaks inside a string must be escaped, for example \\" and \\n.`,
          `Comments are not part of the JSON standard, so // and /* */ will break parsing.`,
          `Values such as undefined, NaN and Infinity do not exist in JSON. Use null, a number or a string instead.`,
        ],
      },
      {
        h: 'Beautify vs. minify',
        p: [
          `Beautifying is for reading and debugging, while minifying removes every unnecessary space and line break to produce the smallest valid text. Minified JSON is useful when you embed data in a request, store it in a database field or reduce payload size. Both operations leave the data itself unchanged, so you can switch between them freely. The processing happens in your browser, which means private payloads, tokens and customer records are not sent anywhere.`,
          `One technical note: the tool parses numbers the same way JavaScript does, so integers larger than 9,007,199,254,740,991 can lose precision, and if an object repeats a key the last value wins. If you work with very large identifiers, keep them as strings.`,
        ],
      },
    ],
    table: {
      title: 'The six JSON value types',
      head: ['Type', 'Example', 'Notes'],
      rows: [
        ['String', '"hello"', 'Always double-quoted'],
        ['Number', '42 or 3.14', 'No leading zeros, no NaN'],
        ['Boolean', 'true / false', 'Lowercase only'],
        ['Null', 'null', 'Represents "no value"'],
        ['Object', '{"a": 1}', 'Unordered key/value pairs'],
        ['Array', '[1, 2, 3]', 'Ordered list of values'],
      ],
    },
    faqs: [
      ['Why does my JSON fail with an unexpected token error?', 'This usually means a trailing comma, single quotes, an unquoted key or a stray character. Check the position mentioned in the message and compare it with the syntax rules above.'],
      ['What is the difference between JSON and a JavaScript object?', 'JSON is a text format with strict rules, such as double-quoted keys and no comments or trailing commas. A JavaScript object literal is more permissive and is code, not data.'],
    ],
  },

  base64: {
    sections: [
      {
        h: 'What Base64 is and why it exists',
        p: [
          `Base64 is a way of writing any data using only 64 safe characters: the letters A to Z and a to z, the digits 0 to 9, plus the symbols + and /, with = used as padding at the end. Many older systems, including email, were built to carry plain text and could corrupt raw binary data such as images or files. Base64 solves that by converting every group of three bytes into four printable characters, which is why encoded text is about one third larger than the original. You will meet it in email attachments, data URIs that embed small images directly in HTML or CSS, API payloads and authentication headers.`,
        ],
      },
      {
        h: 'Text, Unicode and URL-safe variants',
        p: [
          `Base64 works on bytes, not letters, so text has to be turned into bytes first. This tool encodes your text as UTF-8 before converting it, which means accented characters, Thai, Burmese, Chinese and emoji survive a round trip correctly. Problems usually appear when two systems assume different character encodings, producing garbled output after decoding.`,
          `A second variant, often called Base64URL, replaces + with - and / with _ and may drop the padding so the result can sit safely inside a web address or a token. JSON Web Tokens use this form. The decoder here accepts both versions, ignores stray whitespace and line breaks, and tells you when the input is not valid Base64.`,
        ],
      },
      {
        h: 'Encoding is not encryption',
        p: [
          `Base64 provides no secrecy at all. Anyone who sees the encoded text can decode it instantly, with this tool or with a single line of code. Never use it to hide passwords, API keys or personal data. If you need to protect information, use real encryption, and if you need to store passwords, use a dedicated password hashing method. Treat a Base64 string that looks like gibberish as fully readable by anyone who finds it.`,
        ],
      },
    ],
    table: {
      title: 'Base64 at a glance',
      head: ['Property', 'Standard Base64', 'URL-safe Base64'],
      rows: [
        ['Alphabet', 'A–Z a–z 0–9 + /', 'A–Z a–z 0–9 - _'],
        ['Padding', '= at the end', 'Often omitted'],
        ['Size change', 'About +33%', 'About +33%'],
        ['Typical use', 'Email, data URIs, APIs', 'URLs, JWT tokens, filenames'],
      ],
    },
    faqs: [
      ['Why does my decoded text look broken?', 'The text was probably encoded with a different character set, or the Base64 string is incomplete. Check that you copied the whole string, including any = signs at the end.'],
      ['Can I encode a file or image with this tool?', 'This tool works on text. To embed an image, convert it to Base64 in a file-based tool, or use a data URI in your own code.'],
    ],
  },

  'image-converter': {
    sections: [
      {
        h: 'Choosing between WebP, PNG and JPG',
        p: [
          `The right format depends on what the picture contains and where it will be used. JPG is the best all-round choice for photographs, because it produces small files and is accepted almost everywhere, from social networks to government forms. PNG preserves every pixel exactly and supports transparency, so it suits logos, icons, screenshots and anything with text or sharp edges. WebP is a modern format that can handle both photos and transparency at smaller sizes than JPG or PNG, and it is supported by all current major browsers, which makes it a strong default for websites.`,
        ],
      },
      {
        h: 'What happens during conversion',
        p: [
          `The image is drawn onto a canvas in your browser and saved again in the format you pick, using a high quality setting of 92 percent for lossy formats. Because JPG cannot store transparency, any transparent areas are filled with white when you convert to JPG. If you need to keep transparency, choose PNG or WebP instead.`,
          `Keep in mind that converting does not improve an image. Turning a low-quality JPG into a PNG will give you a bigger file that looks the same, and converting between lossy formats repeatedly adds new compression artifacts each time. Whenever you can, convert from the original or highest-quality version you have, and keep that original safe. Metadata such as camera details and location is not carried over, which is helpful when you want to share a photo without revealing where it was taken.`,
        ],
      },
      {
        h: 'Quality retention tips',
        p: [
          `For photos, convert once and avoid re-saving the result through several apps. For graphics, prefer PNG or lossless WebP to keep edges crisp. If file size is the goal rather than format, follow the conversion with the Image Compressor, and if the dimensions are too large, use the Image Resizer first, since fewer pixels reduce size more than any quality setting.`,
        ],
      },
    ],
    table: {
      title: 'When to use each format',
      head: ['Format', 'Transparency', 'Typical file size', 'Best for'],
      rows: [
        ['JPG', 'No (white fill)', 'Small for photos', 'Photos, forms, email, maximum compatibility'],
        ['PNG', 'Yes', 'Large for photos', 'Logos, screenshots, graphics with text'],
        ['WebP', 'Yes', 'Smallest overall', 'Websites and apps that need fast loading'],
      ],
    },
    faqs: [
      ['Will converting PNG to JPG make the file smaller?', 'Usually yes for photographs, because JPG uses lossy compression. For flat graphics with few colors, the JPG may be larger or show blurry edges, so test both.'],
      ['Why did my transparent background turn white?', 'JPG does not support transparency, so the tool fills transparent areas with white. Convert to PNG or WebP to keep the transparent background.'],
    ],
  },

  'image-to-pdf': {
    sections: [
      {
        h: 'Common reasons to turn images into a PDF',
        p: [
          `Many websites, banks, universities and government offices ask for documents as PDF, but the proof you actually have is a phone photo or a scan saved as JPG. Typical cases include ID cards and passport pages, receipts for an expense claim, signed forms, certificates, handwritten notes and multi-page homework. Putting several images into one PDF also keeps pages in a fixed order and means you attach one file instead of ten.`,
        ],
      },
      {
        h: 'Page size, margins and scaling',
        p: [
          `You can choose how each page is built. With the A4 option, every image is placed on an A4 page and scaled down proportionally to fit inside a margin of about 1 cm, then centered. The image is never stretched, so a tall photo will leave white space at the sides and a wide photo will leave space above and below. This gives you a tidy, printable document with consistent pages.`,
          `With the same-size option, each page takes the dimensions of its image, with no margins and no white space. It preserves the image edge to edge, but pages can have different sizes, and very large photos produce very large pages, which is fine on screen but awkward to print. Pick A4 for forms and anything that may be printed, and same-size for artwork or when you want the image untouched.`,
        ],
      },
      {
        h: 'Getting a clean result',
        p: [
          `Photograph documents on a flat surface in even light, hold the camera directly above to avoid skewed edges, and crop away the background before converting. JPG and PNG files are placed into the PDF without being recompressed, so the picture quality in the PDF matches the original, which also means the PDF size is close to the combined size of your images. If the result is too large for an upload limit, reduce the images with the Image Compressor first, or run the finished file through the PDF Compressor. Reorder the images with the arrows before creating the file, because the page order follows the list.`,
        ],
      },
    ],
    table: {
      title: 'Which page setting to choose',
      head: ['Goal', 'Recommended setting'],
      rows: [
        ['Submitting an ID, receipt or form', 'A4 page, image centered'],
        ['Printing the result', 'A4 page, image centered'],
        ['Keeping artwork or screenshots edge to edge', 'Same size as each image'],
        ['Reducing file size for upload', 'Compress the images first, then convert'],
      ],
    },
    faqs: [
      ['Does converting JPG to PDF reduce image quality?', 'No. The image data is embedded as it is, so quality is unchanged. The PDF will be about as large as the images you put in it.'],
      ['Can I put several photos into one PDF?', 'Yes. Add all your images, arrange the order with the arrow buttons, and each image becomes one page of the PDF.'],
    ],
  },

  'qr-code-generator': {
    sections: [
      {
        h: 'How a QR code is built',
        p: [
          `A QR code is a grid of small black and white squares called modules. Three large squares in the corners are finder patterns that let a camera detect the code and work out its orientation, so it can be scanned from any angle. Smaller timing and alignment patterns keep the grid straight, and the rest of the modules carry your data plus error-correction information. Because of that extra information, a code can still be read when part of it is dirty, scratched or covered. The code generated here uses the medium level, which can recover from roughly 15 percent damage. The amount of data you can store is large, but the more you put in, the denser and harder to scan the code becomes, so short links make for cleaner codes.`,
        ],
      },
      {
        h: 'URL, text and Wi-Fi codes',
        p: [
          `A code for a web address makes a phone open the page when scanned, and a plain text code simply shows the text. A Wi-Fi code uses a standard text format that phones understand, which looks like WIFI:T:WPA;S:NetworkName;P:Password;; and lets guests join your network without typing the password. Because the password is stored in the code itself, only print Wi-Fi codes where you are comfortable with visitors having access, and generate a new one if you change the password.`,
          `These are static codes. The data is written directly into the pattern, so they never expire, there is no tracking and no redirect service that could break later. The flip side is that a static code cannot be edited after printing, so double-check the content before you download it.`,
        ],
      },
      {
        h: 'Printing and scannability best practices',
        p: [
          `Scanning problems almost always come from contrast and size. Use a dark code on a light background, because many scanners cannot read inverted or low-contrast colors. Keep clear empty space around the code so it does not blend into surrounding artwork, and avoid stretching it, since the modules must stay square. For print, aim for at least 2 by 2 cm, and make the code larger if people will scan from a distance, a sensible rule being about one tenth of the scanning distance. Always test the final printed version with more than one phone before you produce a large batch.`,
        ],
      },
    ],
    table: {
      title: 'QR content formats',
      head: ['Content type', 'What to enter', 'What a phone does'],
      rows: [
        ['Website link', 'https://example.com/page', 'Offers to open the page'],
        ['Plain text', 'Any message or note', 'Displays the text'],
        ['Wi-Fi network', 'Network name, password, security type', 'Offers to join the network'],
      ],
    },
    faqs: [
      ['Why will my QR code not scan?', 'Common causes are low contrast, a code printed too small, a reflective surface, or too much data. Use dark on light, enlarge the code and shorten the link.'],
      ['Is it safe to scan QR codes from strangers?', 'Treat them like any link. Check the address your phone shows before opening it and avoid entering passwords on pages you reached from an unknown code.'],
    ],
  },

  'password-generator': {
    sections: [
      {
        h: 'What makes a password strong',
        p: [
          `Password strength is mostly about unpredictability and length. Security people measure it in bits of entropy: each extra bit doubles the number of guesses an attacker needs. Entropy is roughly the length multiplied by the logarithm of the pool of possible characters, so adding a few characters helps more than swapping a letter for a symbol. A random 16-character password drawn from letters, numbers and symbols has about 105 bits of entropy, far beyond what can be guessed. Human-made passwords are weaker because we choose words, names, dates and predictable substitutions, which attackers try first.`,
        ],
      },
      {
        h: 'Current guidance from NIST',
        p: [
          `The US National Institute of Standards and Technology publishes widely followed advice in its digital identity guidelines. The current direction is to favour length over complexity rules: allow long passwords and passphrases, avoid forcing odd combinations of symbols, stop requiring routine changes unless there is evidence of compromise, and check new passwords against lists of passwords exposed in breaches. In short, a long, random and unique password stored in a password manager beats a short, clever one you must memorise. Turn on multi-factor authentication wherever it is offered, since it protects you even if a password leaks.`,
        ],
      },
      {
        h: 'Why local generation protects you',
        p: [
          `This generator uses your browser's cryptographically secure random number source, the same facility used for encryption keys, rather than a weak pseudo-random function. The password is created on your device and is never sent to or stored on a server, so no one else ever sees it. Use a different password for every account, because reuse lets a breach at one site unlock your others, and save each one in a reputable password manager instead of trying to remember it.`,
        ],
      },
    ],
    table: {
      title: 'Illustrative offline cracking time at 100 billion guesses per second',
      head: ['Password', 'Approx. entropy', 'Time to try every combination'],
      rows: [
        ['8 characters, lowercase only', '38 bits', 'About 2 seconds'],
        ['8 characters, all types', '52 bits', 'About 17 hours'],
        ['12 characters, lowercase only', '56 bits', 'About 11 days'],
        ['12 characters, all types', '79 bits', 'About 150,000 years'],
        ['16 characters, all types', '105 bits', 'Trillions of years'],
      ],
    },
    faqs: [
      ['What do the strength labels mean?', 'The meter estimates entropy in bits from the length and the character types you selected. Higher is better, and for important accounts you should aim for the Strong or Very strong range.'],
      ['Are the cracking times guaranteed?', 'No. They are illustrations for a fast offline attack on weakly protected data. Real attacks vary, and well-run services slow guessing down, but longer random passwords are safer in every scenario.'],
    ],
  },
};
