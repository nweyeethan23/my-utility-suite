import ToolShell from '@/components/ToolShell';
import ImageToPdfClient from './ImageToPdfClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['image-to-pdf'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ImageToPdfClient />
    </ToolShell>
  );
}
