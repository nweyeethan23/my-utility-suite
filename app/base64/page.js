import ToolShell from '@/components/ToolShell';
import Base64Client from './Base64Client';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['base64'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <Base64Client />
    </ToolShell>
  );
}
