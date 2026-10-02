import ToolShell from '@/components/ToolShell';
import CompressorClient from './CompressorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['pdf-compressor'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <CompressorClient />
    </ToolShell>
  );
}
