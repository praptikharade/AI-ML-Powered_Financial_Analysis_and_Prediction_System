import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Brain, 
  Search, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  Info,
  BarChart3,
  LineChart,
  XCircle,
  CheckCircle2
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart as RechartsLineChart, 
  Line,
  Area,
  AreaChart
} from "recharts";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { AgentCard } from "@/components/ui/AgentCard";

// Mock SHAP data
const shapData = [
  { feature: "Income-Loan Ratio", impact: 35, direction: "positive" },
  { feature: "Credit History", impact: 28, direction: "positive" },
  { feature: "Sector Risk", impact: -22, direction: "negative" },
  { feature: "Employment Type", impact: 18, direction: "positive" },
  { feature: "Age Factor", impact: 12, direction: "positive" },
  { feature: "Existing Loans", impact: -8, direction: "negative" },
];

// Mock sector trend data
const sectorTrendData = [
  { month: "Aug", risk: 42 },
  { month: "Sep", risk: 45 },
  { month: "Oct", risk: 48 },
  { month: "Nov", risk: 44 },
  { month: "Dec", risk: 41 },
  { month: "Jan", risk: 38 },
];

export default function Dashboard() {
  const [applicationData, setApplicationData] = useState<any>(null);
  const [riskScore] = useState(32);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("loanApplication");
    if (stored) {
      setApplicationData(JSON.parse(stored));
    }
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const getRiskCategory = (score: number) => {
    if (score <= 33) return { label: "Low Risk", color: "text-risk-low", bg: "bg-risk-low/10" };
    if (score <= 66) return { label: "Medium Risk", color: "text-risk-medium", bg: "bg-risk-medium/10" };
    return { label: "High Risk", color: "text-risk-high", bg: "bg-risk-high/10" };
  };

  const riskCategory = getRiskCategory(riskScore);

  const getDecision = (score: number) => {
    if (score <= 33) return { 
      status: "Approved", 
      icon: CheckCircle2, 
      color: "text-risk-low", 
      bg: "bg-risk-low/10",
      confidence: 94,
      message: "Application meets all risk criteria. Recommend standard terms."
    };
    if (score <= 66) return { 
      status: "Restricted", 
      icon: AlertTriangle, 
      color: "text-risk-medium", 
      bg: "bg-risk-medium/10",
      confidence: 78,
      message: "Moderate risk detected. Consider additional collateral or higher interest rate."
    };
    return { 
      status: "Rejected", 
      icon: XCircle, 
      color: "text-risk-high", 
      bg: "bg-risk-high/10",
      confidence: 89,
      message: "High default probability. Not recommended for approval at this time."
    };
  };

  const decision = getDecision(riskScore);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Risk Assessment Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive analysis by specialized AI agents
            </p>
          </motion.div>

          {/* Applicant Info Bar */}
          {applicationData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-xl border border-border p-4 mb-8 flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Applicant:</span>
                <span className="font-medium">{applicationData.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sector:</span>
                <span className="font-medium">{applicationData.sector}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Loan:</span>
                <span className="font-medium">₹{Number(applicationData.loanAmount).toLocaleString()}</span>
              </div>
              <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${riskCategory.bg} ${riskCategory.color}`}>
                {riskCategory.label}
              </div>
            </motion.div>
          )}

          {/* Agent Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Risk Assessment Agent */}
            <AgentCard
              title="Risk Assessment Agent"
              icon={Brain}
              status={isLoading ? "processing" : "complete"}
              delay={0.2}
            >
              <div className="flex flex-col items-center py-4">
                <RiskGauge score={riskScore} size="lg" />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Powered by XGBoost ensemble model
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-risk-low" />
                      <span className="text-xs text-muted-foreground">0-33</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-risk-medium" />
                      <span className="text-xs text-muted-foreground">34-66</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-risk-high" />
                      <span className="text-xs text-muted-foreground">67-100</span>
                    </div>
                  </div>
                </div>
              </div>
            </AgentCard>

            {/* Explainability Agent */}
            <AgentCard
              title="Explainability Agent"
              icon={Search}
              status={isLoading ? "processing" : "complete"}
              delay={0.3}
            >
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  SHAP analysis of top risk-contributing features:
                </p>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shapData} layout="vertical" margin={{ left: 0, right: 20 }}>
                      <XAxis type="number" domain={[-50, 50]} tickFormatter={(v) => `${v > 0 ? '+' : ''}${v}%`} />
                      <YAxis type="category" dataKey="feature" width={100} tick={{ fontSize: 11 }} />
                      <Tooltip 
                        formatter={(value: number) => [`${value > 0 ? '+' : ''}${value}%`, 'Impact']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar 
                        dataKey="impact" 
                        fill="hsl(var(--primary))"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg flex items-start gap-2">
                  <Info className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Why this score:</strong> Strong income-to-loan ratio and credit history offset by moderate sector risk in current market conditions.
                  </p>
                </div>
              </div>
            </AgentCard>

            {/* Sector Risk Agent */}
            <AgentCard
              title="Portfolio / Sector Risk Agent"
              icon={TrendingUp}
              status={isLoading ? "processing" : "complete"}
              delay={0.4}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {applicationData?.sector || "Information Technology"} Sector
                  </span>
                  <span className="px-2 py-1 rounded-full bg-risk-low/10 text-risk-low text-xs font-medium">
                    Improving ↗
                  </span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sectorTrendData} margin={{ left: -20, right: 10 }}>
                      <defs>
                        <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis domain={[30, 60]} tick={{ fontSize: 11 }} />
                      <Tooltip 
                        formatter={(value: number) => [`${value}`, 'Risk Index']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="risk" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorRisk)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground">
                  GRU model indicates declining sector risk over the past 6 months, 
                  positively impacting overall assessment.
                </p>
              </div>
            </AgentCard>

            {/* Decision Agent */}
            <AgentCard
              title="Decision Agent"
              icon={CheckCircle}
              status={isLoading ? "processing" : "complete"}
              delay={0.5}
            >
              <div className="space-y-4">
                <div className={`p-6 rounded-xl ${decision.bg} text-center`}>
                  <decision.icon className={`h-12 w-12 mx-auto ${decision.color}`} />
                  <h3 className={`font-display text-2xl font-bold mt-3 ${decision.color}`}>
                    {decision.status}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confidence: {decision.confidence}%
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium text-foreground mb-1">Recommendation</p>
                  <p className="text-sm text-muted-foreground">{decision.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="text-center p-3 bg-card rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">Default Probability</p>
                    <p className="font-display text-lg font-bold text-foreground">{(riskScore * 0.8).toFixed(1)}%</p>
                  </div>
                  <div className="text-center p-3 bg-card rounded-lg border border-border">
                    <p className="text-xs text-muted-foreground">Expected Loss</p>
                    <p className="font-display text-lg font-bold text-foreground">₹{((Number(applicationData?.loanAmount) || 500000) * riskScore * 0.008).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                  </div>
                </div>
              </div>
            </AgentCard>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
