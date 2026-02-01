import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle,
  Plus,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/ui/StatsCard";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RiskGauge } from "@/components/ui/RiskGauge";

interface Application {
  id: string;
  company_name: string;
  loan_amount: number | null;
  loan_purpose: string | null;
  status: string;
  created_at: string;
}

interface Assessment {
  id: string;
  risk_score: number | null;
  risk_category: string | null;
  status: string;
  notes: string | null;
}

export default function BorrowerDashboard() {
  const { profile } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [assessments, setAssessments] = useState<Record<string, Assessment>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile?.id) return;

      // Fetch applications
      const { data: appsData, error: appsError } = await supabase
        .from("applications")
        .select("*")
        .eq("borrower_id", profile.id)
        .order("created_at", { ascending: false });

      if (appsError) {
        console.error("Error fetching applications:", appsError);
      } else {
        setApplications(appsData || []);

        // Fetch assessments for these applications
        if (appsData && appsData.length > 0) {
          const appIds = appsData.map((app) => app.id);
          const { data: assessData } = await supabase
            .from("assessments")
            .select("*")
            .in("application_id", appIds);

          if (assessData) {
            const assessMap: Record<string, Assessment> = {};
            assessData.forEach((a) => {
              assessMap[a.application_id] = a;
            });
            setAssessments(assessMap);
          }
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [profile]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-risk-low" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-risk-high" />;
      case "pending":
        return <Clock className="h-4 w-4 text-risk-medium" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      approved: "bg-risk-low/10 text-risk-low",
      rejected: "bg-risk-high/10 text-risk-high",
      pending: "bg-risk-medium/10 text-risk-medium",
      default: "bg-muted text-muted-foreground",
    };
    return styles[status] || styles.default;
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    approved: applications.filter((a) => a.status === "approved").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
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
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4"
          >
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome, {profile?.first_name || "Borrower"}
              </h1>
              <p className="text-lg text-muted-foreground">
                Track your loan applications and assessments
              </p>
            </div>
            <Link to="/apply">
              <Button variant="hero" size="lg">
                <Plus className="h-5 w-5" />
                New Application
              </Button>
            </Link>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <StatsCard
              title="Total Applications"
              value={stats.total}
              icon={FileText}
            />
            <StatsCard
              title="Pending"
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

          {/* Applications List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl border border-border"
          >
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Your Applications
              </h2>
            </div>

            {loading ? (
              <div className="p-12 text-center">
                <div className="animate-pulse text-muted-foreground">
                  Loading applications...
                </div>
              </div>
            ) : applications.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="font-medium text-foreground mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by submitting your first loan application
                </p>
                <Link to="/apply">
                  <Button variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Application
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {applications.map((app) => {
                  const assessment = assessments[app.id];
                  return (
                    <div
                      key={app.id}
                      className="p-6 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-medium text-foreground">
                              {app.company_name}
                            </h3>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadge(
                                app.status
                              )}`}
                            >
                              {getStatusIcon(app.status)}
                              <span className="ml-1">{app.status}</span>
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>
                              Amount: ₹{(app.loan_amount || 0).toLocaleString()}
                            </span>
                            <span>Purpose: {app.loan_purpose || "N/A"}</span>
                            <span>
                              Applied:{" "}
                              {new Date(app.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {assessment && assessment.risk_score !== null && (
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground mb-1">
                                Risk Score
                              </p>
                              <RiskGauge score={assessment.risk_score} size="sm" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
