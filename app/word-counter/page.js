import ToolShell from '@/components/ToolShell';
import WordCounterClient from './WordCounterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['word-counter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <WordCounterClient />
    </ToolShell>
  );
}
