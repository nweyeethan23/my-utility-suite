import ToolShell from '@/components/ToolShell';
import JsonFormatterClient from './JsonFormatterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['json-formatter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <JsonFormatterClient />
    </ToolShell>
  );
}
