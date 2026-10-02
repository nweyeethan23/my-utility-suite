import ToolShell from '@/components/ToolShell';
import ImageConverterClient from './ImageConverterClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['image-converter'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <ImageConverterClient />
    </ToolShell>
  );
}
