import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentCardProps {
  title: string;
  icon: LucideIcon;
  status?: "processing" | "complete" | "pending";
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AgentCard({
  title,
  icon: Icon,
  status = "complete",
  children,
  className,
  delay = 0,
}: AgentCardProps) {
  const statusConfig = {
    processing: {
      badge: "Processing",
      badgeClass: "bg-accent/20 text-accent",
      ring: "ring-accent/20",
    },
    complete: {
      badge: "Complete",
      badgeClass: "bg-risk-low/20 text-risk-low",
      ring: "ring-risk-low/20",
    },
    pending: {
      badge: "Pending",
      badgeClass: "bg-muted text-muted-foreground",
      ring: "ring-muted",
    },
  };

  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative bg-card rounded-xl border border-border p-6 shadow-sm hover:shadow-md transition-all duration-300",
        `ring-1 ${config.ring}`,
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground">{title}</h3>
        </div>
        <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", config.badgeClass)}>
          {config.badge}
        </span>
      </div>

      {/* Content */}
      <div>{children}</div>

      {/* Processing animation */}
      {status === "processing" && (
        <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent animate-shimmer" />
        </div>
      )}
    </motion.div>
  );
}
