import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import type { Accent, Architecture } from "@/lib/content-types";

type SystemFlowProps = {
  architecture: Architecture;
  accent?: Accent;
  title: string;
  description?: string;
  direction?: "horizontal" | "vertical" | "branching";
  compact?: boolean;
  className?: string;
};

export function SystemFlow({
  architecture,
  accent = "blue",
  title,
  description,
  direction = "horizontal",
  compact = false,
  className = ""
}: SystemFlowProps) {
  return (
    <ArchitectureDiagram
      accent={accent}
      architecture={architecture}
      className={className}
      compact={compact}
      description={description}
      direction={direction}
      title={title}
    />
  );
}
