import ToolShell from '@/components/ToolShell';
import SplitterClient from './SplitterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['pdf-splitter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <SplitterClient />
    </ToolShell>
  );
}
