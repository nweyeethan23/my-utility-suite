// Aggregates the long-form content written for each tool page.
// Keys match tool ids in lib/tools.js. Edit the copy in lib/content/*.js.
import { tier1 } from './content/tier1';
import { tier2 } from './content/tier2';
import { tier3 } from './content/tier3';

export const TOOL_CONTENT = { ...tier1, ...tier2, ...tier3 };
