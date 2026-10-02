import ToolShell from '@/components/ToolShell';
import ImageResizerClient from './ImageResizerClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['image-resizer'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ImageResizerClient />
    </ToolShell>
  );
}
