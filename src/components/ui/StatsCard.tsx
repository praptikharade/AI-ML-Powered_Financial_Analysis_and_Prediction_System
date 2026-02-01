import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  variant?: "default" | "success" | "warning" | "danger";
  delay?: number;
}

export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  trend = "neutral",
  variant,
  delay = 0,
}: StatsCardProps) {
  const trendConfig = {
    up: {
      icon: TrendingUp,
      color: "text-risk-low",
      bg: "bg-risk-low/10",
    },
    down: {
      icon: TrendingDown,
      color: "text-risk-high",
      bg: "bg-risk-high/10",
    },
    neutral: {
      icon: Minus,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  };

  const variantStyles = {
    default: {
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    success: {
      iconBg: "bg-risk-low/10",
      iconColor: "text-risk-low",
    },
    warning: {
      iconBg: "bg-risk-medium/10",
      iconColor: "text-risk-medium",
    },
    danger: {
      iconBg: "bg-risk-high/10",
      iconColor: "text-risk-high",
    },
  };

  const config = trendConfig[trend];
  const TrendIcon = config.icon;
  const vStyles = variantStyles[variant || "default"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-2 rounded-lg", vStyles.iconBg)}>
          <Icon className={cn("h-5 w-5", vStyles.iconColor)} />
        </div>
        {change !== undefined && (
          <div className={cn("flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium", config.bg, config.color)}>
            <TrendIcon className="h-3 w-3" />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="font-display text-2xl font-bold text-foreground mt-1">{value}</p>
      </div>
    </motion.div>
  );
}
