import { motion } from "framer-motion";
import { Info, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface FeatureImportance {
  name: string;
  value: number; // -1 to 1, negative = reduces risk, positive = increases risk
  description?: string;
}

interface ExplainabilityPanelProps {
  features: FeatureImportance[];
  justification?: string;
  confidence?: number;
}

export function ExplainabilityPanel({ 
  features, 
  justification,
  confidence 
}: ExplainabilityPanelProps) {
  const sortedFeatures = [...features].sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
  const topFeatures = sortedFeatures.slice(0, 5);

  const getBarColor = (value: number) => {
    if (value > 0.1) return "bg-risk-high";
    if (value < -0.1) return "bg-risk-low";
    return "bg-risk-medium";
  };

  const getImpactIcon = (value: number) => {
    if (value > 0.1) return <TrendingUp className="h-3 w-3 text-risk-high" />;
    if (value < -0.1) return <TrendingDown className="h-3 w-3 text-risk-low" />;
    return <Minus className="h-3 w-3 text-muted-foreground" />;
  };

  const getImpactLabel = (value: number) => {
    if (value > 0.3) return "High risk factor";
    if (value > 0.1) return "Moderate risk factor";
    if (value < -0.3) return "Strong positive factor";
    if (value < -0.1) return "Positive factor";
    return "Neutral";
  };

  return (
    <div className="bg-muted/30 rounded-xl p-4 border border-border/50">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-4 w-4 text-primary" />
        <h4 className="text-sm font-medium text-foreground">Why This Decision</h4>
        {confidence !== undefined && (
          <span className="ml-auto text-xs text-muted-foreground">
            {Math.round(confidence * 100)}% confidence
          </span>
        )}
      </div>

      {/* SHAP-style Feature Importance Bars */}
      <div className="space-y-3 mb-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Key Factors</p>
        {topFeatures.map((feature, index) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-foreground cursor-help flex items-center gap-1">
                      {getImpactIcon(feature.value)}
                      {feature.name}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {feature.description || getImpactLabel(feature.value)}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <span className="text-xs text-muted-foreground">
                {feature.value > 0 ? "+" : ""}{(feature.value * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.abs(feature.value) * 100, 100)}%` }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`h-full rounded-full ${getBarColor(feature.value)}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decision Justification */}
      {justification && (
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
            Decision Justification
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {justification}
          </p>
        </div>
      )}
    </div>
  );
}

// Helper to generate mock SHAP features based on risk score
// In production, these would come from the AI agent's actual SHAP analysis
export function generateMockFeatures(riskScore: number): FeatureImportance[] {
  const isHighRisk = riskScore >= 70;
  const isMediumRisk = riskScore >= 40 && riskScore < 70;

  if (isHighRisk) {
    return [
      { name: "Debt-to-Income Ratio", value: 0.45, description: "Current debt levels are elevated relative to income" },
      { name: "Industry Outlook", value: 0.25, description: "Sector showing declining trends" },
      { name: "Cash Flow Stability", value: -0.15, description: "Consistent monthly cash flows observed" },
      { name: "Credit History", value: 0.35, description: "Some late payments in recent history" },
      { name: "Business Age", value: -0.10, description: "Established business track record" },
    ];
  } else if (isMediumRisk) {
    return [
      { name: "Revenue Growth", value: -0.20, description: "Positive revenue trend observed" },
      { name: "Debt-to-Income Ratio", value: 0.25, description: "Moderate debt relative to income" },
      { name: "Industry Outlook", value: 0.10, description: "Sector performance is stable" },
      { name: "Cash Flow Stability", value: -0.30, description: "Strong and consistent cash flows" },
      { name: "Collateral Coverage", value: -0.15, description: "Adequate collateral provided" },
    ];
  } else {
    return [
      { name: "Credit History", value: -0.40, description: "Excellent payment history" },
      { name: "Cash Flow Stability", value: -0.35, description: "Very strong cash flow patterns" },
      { name: "Debt-to-Income Ratio", value: -0.25, description: "Low debt relative to income" },
      { name: "Revenue Growth", value: -0.30, description: "Strong upward revenue trend" },
      { name: "Industry Outlook", value: -0.15, description: "Sector showing positive growth" },
    ];
  }
}

export function generateMockJustification(riskScore: number, status: string): string {
  if (status === "approved") {
    return "Based on comprehensive analysis, this application demonstrates strong financial fundamentals with consistent cash flows, manageable debt levels, and positive industry trends. The risk assessment agents have identified favorable conditions for loan approval.";
  } else if (status === "rejected") {
    return "The multi-agent analysis identified elevated risk factors including high debt-to-income ratio, inconsistent cash flows, and unfavorable sector trends. These factors combined exceed the acceptable risk threshold for approval.";
  } else {
    if (riskScore >= 70) {
      return "Initial assessment indicates elevated risk factors. The application requires additional review by our risk assessment team to evaluate mitigation strategies.";
    } else if (riskScore >= 40) {
      return "The application shows moderate risk indicators with some positive factors balancing areas of concern. Further analysis is in progress to determine final eligibility.";
    } else {
      return "Preliminary analysis shows favorable risk indicators. The application is being processed for final verification and approval decision.";
    }
  }
}
