import ToolShell from '@/components/ToolShell';
import MergerClient from './MergerClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['pdf-merger'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <MergerClient />
    </ToolShell>
  );
}
