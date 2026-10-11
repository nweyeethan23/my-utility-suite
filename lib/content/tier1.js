// Long-form explanatory copy for the highest-traffic tools.
// Shape per tool: { sections: [{ h, p: [..], formula? }], table: { title, head, rows }, faqs: [[q, a]] }

export const tier1 = {
  'pdf-compressor': {
    sections: [
      {
        h: 'Lossless vs. lossy PDF compression',
        p: [
          `A PDF is a container that holds text, fonts, vector drawings and images, plus a table that tells a reader where everything lives. "Compression" can mean two very different things. Lossless compression repacks that structure more efficiently without touching any visible content, so the document looks exactly the same afterwards. Lossy compression goes further by re-encoding images at lower quality or lower resolution, which can shrink a file dramatically but permanently throws away detail.`,
          `This compressor is lossless. It rebuilds the file with compact object streams, which groups many small internal objects together and compresses them as a block. Text stays selectable, fonts stay embedded, and images are not resampled. The trade-off is honest and simple: PDFs that were exported with a lot of overhead can shrink noticeably, while PDFs that are already tightly packed, or that are mostly large photographs or scans, may barely change. When that happens the tool tells you the file was already well optimised instead of pretending otherwise.`,
        ],
      },
      {
        h: 'Why file size matters: email and upload limits',
        p: [
          `Most size problems show up at a limit. Gmail lets you send attachments up to 25 MB in total, and anything larger is turned into a Google Drive link. Outlook.com and many company mail servers are stricter, commonly somewhere between 10 and 20 MB. Application portals for jobs, visas, universities and tax filings often set limits of just a few megabytes per document. Because a limit applies to the whole message, several moderate PDFs can add up to more than one large one, so it is worth checking the total before you press send.`,
          `If a lossless pass does not get you under a limit, the usual next steps are to remove unneeded pages with the PDF Splitter, to re-export the original document with a lower image quality setting, or to share a download link instead of an attachment.`,
        ],
      },
      {
        h: 'How the privacy model works',
        p: [
          `The compression runs entirely in your browser using JavaScript. Your PDF is read into memory on your own device, rebuilt there, and offered back as a download. The file is not uploaded to our servers, which is why it also works for contracts, invoices and ID scans that you would not want to hand to a stranger. Closing the tab clears it from memory.`,
        ],
      },
    ],
    table: {
      title: 'Typical attachment size limits',
      head: ['Service', 'Typical limit', 'What happens above it'],
      rows: [
        ['Gmail (sending)', '25 MB per message', 'Attachment becomes a Google Drive link'],
        ['Outlook.com', 'About 20 MB per message', 'Message is rejected or needs a cloud link'],
        ['Company mail servers', 'Often 10–20 MB', 'Message bounces back to the sender'],
        ['Government / job portals', 'Often 1–5 MB per file', 'Upload form refuses the file'],
      ],
    },
    faqs: [
      ['Will compressing a PDF reduce its quality?', 'Not with this tool. It uses lossless restructuring, so text, images and layout look identical. The cost is that the size reduction is modest compared with tools that downsample images.'],
    ],
  },

  'pdf-merger': {
    sections: [
      {
        h: 'Why people merge PDFs',
        p: [
          `Merging turns several separate documents into one file that is easier to send, store and review. Typical examples are combining a signed contract with its appendices, attaching a portfolio or certificates to a CV, joining scanned pages that came off a scanner one at a time, or building a single submission pack for a visa, loan or tender application. A single PDF also keeps the reading order under your control, which matters when the person on the other end will read it top to bottom.`,
        ],
      },
      {
        h: 'Getting the order and page layout right',
        p: [
          `Files are merged in the order shown in the list, and every page of each file is copied over in sequence. Use the up and down arrows to reorder before you merge. It is easier to fix the order first than to split pages apart afterwards.`,
          `Each page keeps the size and orientation it had in its source file. If you merge an A4 portrait report with a landscape slide export, the result contains both page shapes, and most readers display them correctly. If you need uniform pages, convert or re-export the odd one out first. Text, fonts and images are carried across as they are, because pages are copied rather than re-rendered.`,
          `One thing to keep in mind is that document-level features belong to the whole file, not to individual pages. Bookmarks, form fields tied to a document and metadata such as the title are not combined from every source, so if you rely on a navigation outline you may want to rebuild it in your PDF editor after merging.`,
        ],
      },
      {
        h: 'Troubleshooting encrypted or damaged files',
        p: [
          `The most common failure is a PDF that is protected with a password or has restrictions set by its creator. A protected file cannot be read by the merger, and you will see a message saying the file may be damaged or password-protected. Open the original in a PDF viewer you trust, remove the protection if you are allowed to, save a fresh copy and try again. Files that are truncated, such as incomplete downloads, fail in the same way. If only one file in a batch causes the error, remove it and merge the rest to find the culprit.`,
        ],
      },
    ],
    table: {
      title: 'Merge checklist',
      head: ['Situation', 'What to do'],
      rows: [
        ['Wrong page order in the result', 'Reorder the file list with the arrows and merge again'],
        ['"Password-protected" error', 'Remove protection in the original app, save a new copy, retry'],
        ['Mixed page sizes', 'Merge as is, or re-export the odd file to the size you want'],
        ['Result is too large to email', 'Run it through the PDF Compressor or split off unneeded pages'],
      ],
    },
    faqs: [
      ['Can I merge PDFs with different page sizes?', 'Yes. Each page keeps its own size and orientation, so the merged file can contain a mix of A4, letter and landscape pages.'],
    ],
  },

  'image-compressor': {
    sections: [
      {
        h: 'Why image weight affects page speed',
        p: [
          `Images are usually the heaviest part of a web page, and the largest image above the fold is often the element that decides how fast the page feels. Google measures this as Largest Contentful Paint, one of the Core Web Vitals, and treats 2.5 seconds or less as a good result. A hero photo that is several megabytes will push a page well past that on a mobile connection, while the same picture compressed to a few hundred kilobytes loads almost instantly. Smaller images also save visitors mobile data and reduce hosting bandwidth, so compression helps users and costs at the same time.`,
        ],
      },
      {
        h: 'JPEG, PNG and WebP compared',
        p: [
          `JPEG is a lossy format designed for photographs. It discards detail the eye is least likely to notice, and the quality slider controls how aggressively. PNG is lossless, which makes it ideal for screenshots, logos and graphics with sharp edges or transparency, but it produces large files for photos. WebP can work in either mode, supports transparency, and at similar visual quality is often 25 to 35 percent smaller than JPEG, which is why it is a popular choice for websites.`,
          `The quality setting only affects lossy output. In practice a quality of about 70 to 85 percent gives a large size reduction with differences that are hard to spot at normal viewing size. Going below roughly 60 percent tends to introduce visible blocky artifacts around edges and in smooth gradients such as skies. Because PNG is lossless, shrinking a PNG photo usually means converting it to JPG or WebP rather than adjusting a slider.`,
        ],
      },
      {
        h: 'How this tool works and what to expect',
        p: [
          `Your image is decoded and re-encoded inside your browser, so the original file is never uploaded. Re-encoding this way also removes embedded metadata such as camera model and GPS location, which is a useful privacy side effect when you share photos publicly. Compress a copy rather than your only original, because lossy compression cannot be reversed, and avoid compressing the same file repeatedly since the quality loss accumulates.`,
        ],
      },
    ],
    table: {
      title: 'Choosing an image format',
      head: ['Format', 'Compression', 'Transparency', 'Best for'],
      rows: [
        ['JPEG / JPG', 'Lossy', 'No', 'Photographs, wide compatibility'],
        ['PNG', 'Lossless', 'Yes', 'Screenshots, logos, sharp graphics'],
        ['WebP', 'Lossy or lossless', 'Yes', 'Websites that want small files'],
      ],
    },
    faqs: [
      ['Does compressing a photo remove its metadata?', 'Yes. The image is re-encoded in your browser, which drops details such as camera model and GPS location. That is helpful for privacy, but keep the original if you need that information.'],
      ['Why did my PNG not get much smaller?', 'PNG is lossless, so the quality slider has little effect on it. Converting photographic PNGs to JPG or WebP usually saves far more space.'],
    ],
  },

  'emi-calculator': {
    sections: [
      {
        h: 'The EMI formula explained',
        p: [
          `EMI stands for equated monthly instalment: a fixed payment you make every month until a loan is cleared. Lenders calculate it so that the same amount repays both the interest that builds up and a slice of the original loan. The standard formula is:`,
        ],
        formula: 'EMI = P × r × (1 + r)^n ÷ ((1 + r)^n − 1)',
        after: [
          `Here P is the principal (the amount you borrow), r is the monthly interest rate (the annual rate divided by 12 and by 100), and n is the number of monthly instalments. For example, a loan of 500,000 at 9 percent a year over 5 years has r = 0.0075 and n = 60, which gives an EMI of about 10,379. Over the full term you would pay roughly 622,750 in total, of which about 122,750 is interest.`,
        ],
      },
      {
        h: 'Principal vs. interest: how each payment is split',
        p: [
          `Every EMI is the same size, but what it is made of changes over time. Interest is charged on the outstanding balance, so early in the loan the balance is large and most of each payment goes to interest. As the balance falls, the interest portion shrinks and more of each payment reduces the principal. This is why paying off a loan early saves more than people expect: money used to cut the balance in the first years prevents the most interest from ever accruing.`,
          `The term has a big effect on the total cost. A longer term lowers the monthly payment but increases the total interest, sometimes dramatically, as the table below shows.`,
        ],
      },
      {
        h: 'Ways to reduce your loan burden',
        p: [
          `The most effective levers are a larger down payment, a shorter tenure if your budget allows it, and a lower interest rate. Compare the rate and also the processing fee, prepayment charges and whether the rate is fixed or floating, since a slightly lower headline rate with heavy fees can cost more overall. Making occasional part-prepayments towards the principal, or rounding up your EMI, shortens the loan and cuts interest. Before you commit, check that the EMI fits comfortably within your monthly income, leaving room for other obligations and emergencies.`,
        ],
      },
    ],
    table: {
      title: 'Effect of term on a 500,000 loan at 9% a year (approximate)',
      head: ['Term', 'Monthly EMI', 'Total paid', 'Total interest'],
      rows: [
        ['3 years', '15,900', '572,400', '72,400'],
        ['5 years', '10,379', '622,750', '122,750'],
        ['7 years', '8,045', '675,750', '175,750'],
        ['10 years', '6,334', '760,100', '260,100'],
      ],
    },
    faqs: [
      ['Why might my lender quote a slightly different EMI?', 'Lenders may round the rate, use a different day-count or calculate interest from a specific disbursal date. Treat this result as a close estimate and rely on your loan agreement for the exact figure.'],
    ],
  },

  'bmi-calculator': {
    sections: [
      {
        h: 'How BMI is calculated',
        p: [
          `Body mass index compares your weight with your height using a single number. In metric units it is your weight in kilograms divided by your height in metres squared. In imperial units you multiply your weight in pounds by 703 and divide by your height in inches squared. A person who weighs 70 kg and is 1.75 m tall has a BMI of about 22.9, since 70 divided by 3.0625 is 22.9.`,
        ],
        formula: 'BMI = kg ÷ m²   or   BMI = 703 × lb ÷ in²',
      },
      {
        h: 'WHO weight categories',
        p: [
          `The World Health Organization groups adult BMI values into broad categories, shown in the table below. A BMI from 18.5 to 24.9 is considered the normal range for most adults. Values below 18.5 are classed as underweight, 25 to 29.9 as overweight, and 30 or above as obesity, which is further divided into three classes. These bands were designed to describe patterns across populations, which is why they work best as a screening signal rather than a personal verdict.`,
        ],
      },
      {
        h: 'What BMI cannot tell you',
        p: [
          `BMI uses only height and weight, so it cannot distinguish muscle from fat or show where fat is stored. A muscular athlete can land in the overweight range with very little body fat, while an older adult who has lost muscle can have a normal BMI and still carry excess fat. Waist circumference, body fat percentage, blood pressure, blood tests and family history all add information that BMI lacks.`,
          `The standard adult categories also do not apply to children and teenagers, who are assessed with BMI-for-age percentile charts, and they are less reliable during pregnancy. Some health bodies suggest lower cut-offs for people of Asian descent, because health risks can rise at lower BMI values in some groups. If your result worries you, or if you are making decisions about diet or exercise, speak with a doctor or registered dietitian who can look at the whole picture.`,
        ],
      },
    ],
    table: {
      title: 'WHO adult BMI categories',
      head: ['BMI (kg/m²)', 'Category'],
      rows: [
        ['Below 18.5', 'Underweight'],
        ['18.5 – 24.9', 'Normal range'],
        ['25.0 – 29.9', 'Overweight'],
        ['30.0 – 34.9', 'Obesity, class I'],
        ['35.0 – 39.9', 'Obesity, class II'],
        ['40.0 and above', 'Obesity, class III'],
      ],
    },
    faqs: [
      ['Are BMI categories different for men and women?', 'The standard adult categories are the same for both. Body fat at the same BMI tends to differ between men and women, so BMI is a screening number and not a diagnosis.'],
      ['Can I use this BMI calculator for my child?', 'No. Children and teens are assessed using BMI-for-age percentiles that account for growth. Ask a paediatrician or use a growth chart designed for children.'],
    ],
  },

  'exchange-rate': {
    sections: [
      {
        h: 'How exchange rates move',
        p: [
          `An exchange rate is the price of one currency in terms of another, and it changes constantly during the week as banks, companies, funds and governments buy and sell currencies. Rates respond to interest-rate decisions, inflation, economic data, trade balances, political events and shifts in investor confidence. When a country raises interest rates, for instance, its currency can strengthen because holding it becomes more attractive, while uncertainty or weak growth can push it lower. Major currencies can move a fraction of a percent in a day, and smaller or more tightly managed currencies may behave quite differently.`,
        ],
      },
      {
        h: 'Mid-market rate vs. the rate you actually get',
        p: [
          `The figure shown by this converter is a mid-market rate, which is the midpoint between the prices at which currencies are bought and sold on global markets. It is the fairest reference point, but it is rarely the exact rate offered to customers. Banks, card networks, airport kiosks and money-transfer services add a spread, meaning they quote you a worse rate than mid-market, and some also charge a separate fee. The total difference can range from a fraction of a percent with some online transfer services to several percent at tourist exchange counters.`,
          `A practical way to compare providers is to convert a fixed amount, then check how much the recipient actually receives after the spread and fees, and measure that against the mid-market result here. The gap is the real cost of the transfer. Rates on this page are retrieved from an external provider and cached for up to one hour, so they are best treated as a guide for planning, budgeting and price comparison rather than a guaranteed quote.`,
        ],
      },
      {
        h: 'Common currency codes',
        p: [
          `Currencies are identified by three-letter ISO 4217 codes, usually made of the country code plus an initial for the currency name. Knowing the main codes makes it easier to pick the right pair. A few frequently searched ones are listed below, and the popular pair links on this page jump straight to common conversions.`,
        ],
      },
    ],
    table: {
      title: 'Frequently used currency codes',
      head: ['Code', 'Currency', 'Code', 'Currency'],
      rows: [
        ['USD', 'United States dollar', 'THB', 'Thai baht'],
        ['EUR', 'Euro', 'MMK', 'Myanmar kyat'],
        ['GBP', 'British pound', 'SGD', 'Singapore dollar'],
        ['JPY', 'Japanese yen', 'MYR', 'Malaysian ringgit'],
        ['CNY', 'Chinese yuan', 'KRW', 'South Korean won'],
        ['INR', 'Indian rupee', 'AUD', 'Australian dollar'],
      ],
    },
    faqs: [
      ['What is a mid-market rate?', 'It is the midpoint between the buy and sell prices on global currency markets. It is a fair reference point, but banks and transfer services usually quote a less favourable rate.'],
    ],
  },
};
