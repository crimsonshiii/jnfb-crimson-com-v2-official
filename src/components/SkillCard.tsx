import React from 'react';
import { Activity } from 'lucide-react';
import { SkillCategory } from '../data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface SkillCardProps {
  category: SkillCategory;
  catIdx: number;
  key?: string | number;
}

export default function SkillCard({ category, catIdx }: SkillCardProps) {
  return (
    <Card className="bg-[#0c0c0c] border border-zinc-800/40 rounded-lg p-6 space-y-5 hover:border-[#dc2626]/30 transition-all duration-300">
      <div className="flex items-center justify-between border-b border-zinc-800/30 pb-2">
        <h3 className="font-mono text-xs font-bold tracking-wider text-[#dc2626] uppercase flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#dc2626] shrink-0" />
          {category.category.replace(' & ', ' // ').replace('Strategy', 'Core')}
        </h3>
        <Badge className="text-[10px] font-mono text-zinc-500 bg-[#0a0a0a] px-1.5 py-0.5 rounded border border-zinc-800/50 hover:bg-[#0a0a0a]">
          POOL_0{catIdx + 1}
        </Badge>
      </div>

      <div className="space-y-4">
        {category.skills.map((skill, sIdx) => {
          const content = (
            <div className="space-y-1 group select-none w-full text-left">
              <div className="flex items-center text-xs font-mono">
                <span className="text-zinc-300 font-semibold group-hover:text-red-500 transition-colors cursor-help">
                  • {skill.name}
                </span>
              </div>

              {skill.info && (
                <p className="text-[10px] text-zinc-500 group-hover:text-zinc-400 block transition-colors pl-3 leading-snug">
                  {skill.info}
                </p>
              )}
            </div>
          );

          if (skill.info) {
            return (
              <React.Fragment key={sIdx}>
                <Tooltip>
                  <TooltipTrigger render={<div className="w-full text-left" />}>
                    {content}
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-950 border border-zinc-800 text-zinc-200 p-2 text-[11px] max-w-xs font-sans">
                    {skill.info}
                  </TooltipContent>
                </Tooltip>
              </React.Fragment>
            );
          }

          return <div key={sIdx}>{content}</div>;
        })}
      </div>
    </Card>
  );
}
