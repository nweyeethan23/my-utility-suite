import ToolShell from '@/components/ToolShell';
import QrCodeGeneratorClient from './QrCodeGeneratorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['qr-code-generator'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <QrCodeGeneratorClient />
    </ToolShell>
  );
}
