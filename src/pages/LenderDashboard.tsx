import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FileSearch, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Users,
  TrendingUp,
  AlertTriangle,
  BarChart3
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/StatsCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

interface Assessment {
  id: string;
  application_id: string;
  risk_score: number | null;
  risk_category: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  applications?: {
    company_name: string;
    loan_amount: number | null;
    loan_purpose: string | null;
  };
}

interface Application {
  id: string;
  company_name: string;
  loan_amount: number | null;
  loan_purpose: string | null;
  status: string;
  created_at: string;
}

const RISK_COLORS = {
  low: "hsl(142, 76%, 36%)",
  medium: "hsl(38, 92%, 50%)",
  high: "hsl(0, 84%, 60%)",
};

export default function LenderDashboard() {
  const { profile } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [pendingApplications, setPendingApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;

      // Fetch assessments by this lender
      const { data: assessData, error: assessError } = await supabase
        .from("assessments")
        .select("*")
        .eq("lender_id", profile.id)
        .order("created_at", { ascending: false });

      if (assessError) {
        console.error("Error fetching assessments:", assessError);
      } else {
        setAssessments(assessData || []);
      }

      // Fetch all pending applications for review
      const { data: appsData, error: appsError } = await supabase
        .from("applications")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (appsError) {
        console.error("Error fetching applications:", appsError);
      } else {
        setPendingApplications(appsData || []);
      }

      setLoading(false);
    };

    fetchData();
  }, [profile]);

  const stats = {
    totalReviewed: assessments.length,
    pending: pendingApplications.length,
    approved: assessments.filter((a) => a.status === "approved").length,
    rejected: assessments.filter((a) => a.status === "rejected").length,
  };

  // Risk distribution for chart
  const riskDistribution = [
    { name: "Low Risk", value: assessments.filter((a) => (a.risk_score || 0) <= 33).length, color: RISK_COLORS.low },
    { name: "Medium Risk", value: assessments.filter((a) => (a.risk_score || 0) > 33 && (a.risk_score || 0) <= 66).length, color: RISK_COLORS.medium },
    { name: "High Risk", value: assessments.filter((a) => (a.risk_score || 0) > 66).length, color: RISK_COLORS.high },
  ];

  const handleStartAssessment = async (applicationId: string) => {
    if (!profile?.id) return;

    // Create a new assessment
    const { error } = await supabase.from("assessments").insert({
      application_id: applicationId,
      lender_id: profile.id,
      status: "in_progress",
    });

    if (error) {
      console.error("Error creating assessment:", error);
    } else {
      // Refresh the data
      window.location.reload();
    }
  };

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
              Lender Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Review and assess loan applications with AI-powered insights
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatsCard
              title="Total Reviewed"
              value={stats.totalReviewed}
              icon={FileSearch}
            />
            <StatsCard
              title="Pending Review"
              value={stats.pending}
              icon={Clock}
              variant="warning"
            />
            <StatsCard
              title="Approved"
              value={stats.approved}
              icon={CheckCircle2}
              variant="success"
            />
            <StatsCard
              title="Rejected"
              value={stats.rejected}
              icon={XCircle}
              variant="danger"
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Applications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 bg-card rounded-2xl border border-border"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Applications Pending Review
                </h2>
                <span className="px-3 py-1 rounded-full bg-risk-medium/10 text-risk-medium text-sm font-medium">
                  {pendingApplications.length} pending
                </span>
              </div>

              {loading ? (
                <div className="p-12 text-center">
                  <div className="animate-pulse text-muted-foreground">
                    Loading applications...
                  </div>
                </div>
              ) : pendingApplications.length === 0 ? (
                <div className="p-12 text-center">
                  <CheckCircle2 className="h-12 w-12 text-risk-low/50 mx-auto mb-4" />
                  <h3 className="font-medium text-foreground mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    No pending applications to review
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {pendingApplications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="p-6 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground mb-1">
                            {app.company_name}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>₹{(app.loan_amount || 0).toLocaleString()}</span>
                            <span>{app.loan_purpose || "General"}</span>
                            <span>
                              {new Date(app.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStartAssessment(app.id)}
                        >
                          <FileSearch className="h-4 w-4 mr-2" />
                          Start Review
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Risk Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                Risk Distribution
              </h3>
              
              {assessments.length === 0 ? (
                <div className="h-48 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm text-center">
                    No assessments yet.<br />Start reviewing to see analytics.
                  </p>
                </div>
              ) : (
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="mt-4 space-y-2">
                {riskDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Recent Assessments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 bg-card rounded-2xl border border-border"
          >
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Recent Assessments
              </h2>
            </div>

            {assessments.length === 0 ? (
              <div className="p-12 text-center">
                <BarChart3 className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No assessments yet</h3>
                <p className="text-muted-foreground">
                  Start reviewing pending applications above
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {assessments.slice(0, 5).map((assessment) => (
                  <div
                    key={assessment.id}
                    className="p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                              assessment.status === "approved"
                                ? "bg-risk-low/10 text-risk-low"
                                : assessment.status === "rejected"
                                ? "bg-risk-high/10 text-risk-high"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {assessment.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Assessed on {new Date(assessment.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {assessment.risk_score !== null && (
                        <RiskGauge score={assessment.risk_score} size="sm" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
