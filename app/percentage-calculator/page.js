import ToolShell from '@/components/ToolShell';
import PercentageCalculatorClient from './PercentageCalculatorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['percentage-calculator'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <PercentageCalculatorClient />
    </ToolShell>
  );
}
