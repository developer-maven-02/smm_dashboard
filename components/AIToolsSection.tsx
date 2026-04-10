import DashboardCard from './DashboardCard';
import LinkButton from './LinkButton';
import { Bot, Sparkles, Search, Cpu } from 'lucide-react';

export default function AIToolsSection() {
  return (
    <DashboardCard title="Generate Content with AI" icon={<Cpu className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} delay={200} accentColor="hsl(270 70% 55%)">
      <div className="flex flex-col gap-2">
        <LinkButton label="Open ChatGPT" href="https://chat.openai.com/" icon={<Bot className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} />
        <LinkButton label="Open Gemini" href="https://gemini.google.com/" icon={<Sparkles className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} />
        <LinkButton label="Open Perplexity" href="https://www.perplexity.ai/" icon={<Search className="h-4 w-4" style={{ color: 'hsl(270 70% 55%)' }} />} />
      </div>
    </DashboardCard>
  );
}
