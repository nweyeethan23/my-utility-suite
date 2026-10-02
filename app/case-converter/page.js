import ToolShell from '@/components/ToolShell';
import CaseConverterClient from './CaseConverterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['case-converter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <CaseConverterClient />
    </ToolShell>
  );
}
