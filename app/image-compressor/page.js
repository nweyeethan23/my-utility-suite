import ToolShell from '@/components/ToolShell';
import ImageCompressorClient from './ImageCompressorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['image-compressor'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ImageCompressorClient />
    </ToolShell>
  );
}
