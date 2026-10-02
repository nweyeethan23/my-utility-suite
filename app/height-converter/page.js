import ToolShell from '@/components/ToolShell';
import HeightConverterClient from './HeightConverterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['height-converter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <HeightConverterClient />
    </ToolShell>
  );
}
