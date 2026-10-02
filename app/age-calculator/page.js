import ToolShell from '@/components/ToolShell';
import AgeCalculatorClient from './AgeCalculatorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['age-calculator'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <AgeCalculatorClient />
    </ToolShell>
  );
}
