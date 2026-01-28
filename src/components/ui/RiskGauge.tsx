import { motion } from "framer-motion";

interface RiskGaugeProps {
  score: number; // 0-100
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function RiskGauge({ score, label, size = "md" }: RiskGaugeProps) {
  const sizeConfig = {
    sm: { width: 120, strokeWidth: 8, fontSize: "text-xl" },
    md: { width: 180, strokeWidth: 10, fontSize: "text-3xl" },
    lg: { width: 240, strokeWidth: 12, fontSize: "text-4xl" },
  };

  const config = sizeConfig[size];
  const radius = (config.width - config.strokeWidth) / 2;
  const circumference = radius * Math.PI; // Half circle
  const progress = (score / 100) * circumference;

  const getRiskColor = (score: number) => {
    if (score <= 33) return "hsl(var(--risk-low))";
    if (score <= 66) return "hsl(var(--risk-medium))";
    return "hsl(var(--risk-high))";
  };

  const getRiskLabel = (score: number) => {
    if (score <= 33) return "Low Risk";
    if (score <= 66) return "Medium Risk";
    return "High Risk";
  };

  const getRiskColorClass = (score: number) => {
    if (score <= 33) return "text-risk-low";
    if (score <= 66) return "text-risk-medium";
    return "text-risk-high";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: config.width, height: config.width / 2 + 20 }}>
        <svg
          width={config.width}
          height={config.width / 2 + 20}
          className="overflow-visible"
        >
          {/* Background arc */}
          <path
            d={`M ${config.strokeWidth / 2} ${config.width / 2} A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.width / 2}`}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />
          {/* Progress arc */}
          <motion.path
            d={`M ${config.strokeWidth / 2} ${config.width / 2} A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2} ${config.width / 2}`}
            fill="none"
            stroke={getRiskColor(score)}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <motion.span
            className={`font-display font-bold ${config.fontSize} ${getRiskColorClass(score)}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="text-center mt-2"
      >
        <span className={`font-semibold ${getRiskColorClass(score)}`}>
          {label || getRiskLabel(score)}
        </span>
      </motion.div>
    </div>
  );
}
