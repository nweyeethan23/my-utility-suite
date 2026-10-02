import ToolShell from '@/components/ToolShell';
import UnitConverterClient from './UnitConverterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['unit-converter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <UnitConverterClient />
    </ToolShell>
  );
}
