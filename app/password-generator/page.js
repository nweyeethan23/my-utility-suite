import ToolShell from '@/components/ToolShell';
import PasswordGeneratorClient from './PasswordGeneratorClient';
import { TOOL_BY_ID } from '@/lib/tools';
import { toolMetadata } from '@/lib/seo';

const tool = TOOL_BY_ID['password-generator'];
export const metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolShell tool={tool}>
      <PasswordGeneratorClient />
    </ToolShell>
  );
}
