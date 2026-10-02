import ToolShell from '@/components/ToolShell';
import ColorConverterClient from './ColorConverterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['color-converter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ColorConverterClient />
    </ToolShell>
  );
}
