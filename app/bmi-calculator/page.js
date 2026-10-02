import ToolShell from '@/components/ToolShell';
import BmiCalculatorClient from './BmiCalculatorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['bmi-calculator'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <BmiCalculatorClient />
    </ToolShell>
  );
}
