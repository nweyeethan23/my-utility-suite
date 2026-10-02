import ToolShell from '@/components/ToolShell';
import EmiCalculatorClient from './EmiCalculatorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['emi-calculator'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <EmiCalculatorClient />
    </ToolShell>
  );
}
