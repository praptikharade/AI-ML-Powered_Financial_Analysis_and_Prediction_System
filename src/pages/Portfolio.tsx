import { motion } from "framer-motion";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Building2, 
  Users, 
  DollarSign,
  BarChart3,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StatsCard } from "@/components/ui/StatsCard";

// Mock data
const riskDistribution = [
  { name: "Low Risk", value: 45, color: "hsl(var(--risk-low))" },
  { name: "Medium Risk", value: 35, color: "hsl(var(--risk-medium))" },
  { name: "High Risk", value: 20, color: "hsl(var(--risk-high))" },
];

const sectorRisk = [
  { sector: "IT", current: 32, previous: 38 },
  { sector: "Finance", current: 28, previous: 30 },
  { sector: "Retail", current: 45, previous: 42 },
  { sector: "MSME", current: 52, previous: 48 },
  { sector: "Healthcare", current: 25, previous: 28 },
  { sector: "Manufacturing", current: 38, previous: 40 },
];

const defaultTrend = [
  { month: "Jul", rate: 3.2 },
  { month: "Aug", rate: 3.5 },
  { month: "Sep", rate: 3.8 },
  { month: "Oct", rate: 3.4 },
  { month: "Nov", rate: 3.1 },
  { month: "Dec", rate: 2.9 },
  { month: "Jan", rate: 2.7 },
];

const earlyWarnings = [
  { id: 1, type: "warning", message: "MSME sector showing elevated stress signals", sector: "MSME", impact: "Medium" },
  { id: 2, type: "alert", message: "Retail sector defaults up 7% MoM", sector: "Retail", impact: "High" },
  { id: 3, type: "info", message: "IT sector risk declining consistently", sector: "IT", impact: "Positive" },
];

export default function Portfolio() {
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
              Portfolio Overview
            </h1>
            <p className="text-lg text-muted-foreground">
              Aggregated risk analysis across all sectors and borrowers
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard
              title="Total Portfolio Value"
              value="₹245Cr"
              change={12}
              trend="up"
              icon={DollarSign}
              delay={0.1}
            />
            <StatsCard
              title="Active Borrowers"
              value="1,847"
              change={8}
              trend="up"
              icon={Users}
              delay={0.2}
            />
            <StatsCard
              title="Average Risk Score"
              value="38.2"
              change={-5}
              trend="up"
              icon={BarChart3}
              delay={0.3}
            />
            <StatsCard
              title="Default Rate"
              value="2.7%"
              change={-12}
              trend="up"
              icon={AlertTriangle}
              delay={0.4}
            />
          </div>

          {/* Charts Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Risk Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">
                Portfolio Risk Distribution
              </h3>
              <div className="flex items-center gap-8">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Portfolio Share']}
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-3">
                  {riskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                      </div>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Default Trend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-foreground">
                  Default Probability Trend
                </h3>
                <span className="flex items-center gap-1 text-risk-low text-sm">
                  <TrendingDown className="h-4 w-4" />
                  -15% vs last quarter
                </span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={defaultTrend} margin={{ left: -20, right: 10 }}>
                    <defs>
                      <linearGradient id="colorDefault" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis domain={[2, 4.5]} tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      formatter={(value: number) => [`${value}%`, 'Default Rate']}
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorDefault)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>

          {/* Charts Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sector Risk Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 bg-card rounded-xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">
                Risk by Sector (Current vs Previous Month)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sectorRisk} margin={{ left: -10, right: 10 }}>
                    <XAxis dataKey="sector" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 70]} tick={{ fontSize: 11 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="previous" fill="hsl(var(--muted-foreground))" opacity={0.3} radius={[4, 4, 0, 0]} name="Previous" />
                    <Bar dataKey="current" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Current" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Early Warning Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <h3 className="font-display font-semibold text-foreground mb-4">
                Early Warning Indicators
              </h3>
              <div className="space-y-3">
                {earlyWarnings.map((warning) => (
                  <div
                    key={warning.id}
                    className={`p-3 rounded-lg border ${
                      warning.type === "alert" 
                        ? "bg-risk-high/5 border-risk-high/20" 
                        : warning.type === "warning"
                        ? "bg-risk-medium/5 border-risk-medium/20"
                        : "bg-risk-low/5 border-risk-low/20"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {warning.type === "alert" ? (
                        <AlertCircle className="h-4 w-4 text-risk-high shrink-0 mt-0.5" />
                      ) : warning.type === "warning" ? (
                        <AlertTriangle className="h-4 w-4 text-risk-medium shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-risk-low shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm font-medium text-foreground">{warning.message}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{warning.sector}</span>
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            warning.impact === "High" 
                              ? "bg-risk-high/10 text-risk-high" 
                              : warning.impact === "Medium"
                              ? "bg-risk-medium/10 text-risk-medium"
                              : "bg-risk-low/10 text-risk-low"
                          }`}>
                            {warning.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
