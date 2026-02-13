import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  User,
  Briefcase,
  DollarSign,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  FileSearch,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { toast } from "sonner";

interface ApplicationDetail {
  id: string;
  company_name: string;
  loan_amount: number | null;
  loan_purpose: string | null;
  status: string;
  created_at: string;
  applicant_name: string | null;
  applicant_age: number | null;
  applicant_email: string | null;
  applicant_phone: string | null;
  employment_type: string | null;
  sector: string | null;
  annual_income: number | null;
  years_employed: number | null;
  interest_rate: number | null;
  loan_term: number | null;
  credit_history_length: number | null;
  existing_loans: number | null;
}

export default function ReviewApplication() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [application, setApplication] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        console.error("Error fetching application:", error);
        toast.error("Failed to load application.");
      } else {
        setApplication(data as ApplicationDetail | null);
      }
      setLoading(false);
    };

    fetchApplication();
  }, [id]);

  const handleDecision = async (decision: "approved" | "rejected") => {
    if (!profile?.id || !application) return;
    setSubmitting(true);

    // Generate a mock risk score based on decision
    const riskScore = decision === "approved" ? Math.floor(Math.random() * 33) + 5 : Math.floor(Math.random() * 34) + 67;
    const riskCategory = riskScore <= 33 ? "low" : riskScore <= 66 ? "medium" : "high";

    // Create assessment
    const { error: assessError } = await supabase.from("assessments").insert({
      application_id: application.id,
      lender_id: profile.id,
      status: decision,
      risk_score: riskScore,
      risk_category: riskCategory,
      notes: `Application ${decision} by lender review.`,
    });

    if (assessError) {
      console.error("Error creating assessment:", assessError);
      toast.error("Failed to submit review.");
      setSubmitting(false);
      return;
    }

    // Update application status
    const { error: appError } = await supabase
      .from("applications")
      .update({ status: decision })
      .eq("id", application.id);

    if (appError) {
      console.error("Error updating application:", appError);
    }

    toast.success(`Application ${decision} successfully!`);
    setSubmitting(false);
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h2 className="text-2xl font-bold text-foreground">Application not found</h2>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Review Application
              </h1>
              <p className="text-muted-foreground">
                {application.company_name} — Applied {new Date(application.created_at).toLocaleDateString()}
              </p>
            </div>
          </motion.div>

          {/* Application Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Personal Information</h3>
              </div>
              <div className="space-y-3">
                <InfoRow label="Name" value={application.applicant_name} />
                <InfoRow label="Age" value={application.applicant_age ? `${application.applicant_age} years` : null} />
                <InfoRow label="Email" value={application.applicant_email} />
                <InfoRow label="Phone" value={application.applicant_phone} />
              </div>
            </motion.div>

            {/* Employment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Employment Details</h3>
              </div>
              <div className="space-y-3">
                <InfoRow label="Employment Type" value={application.employment_type} />
                <InfoRow label="Sector" value={application.sector} />
                <InfoRow label="Annual Income" value={application.annual_income ? `₹${application.annual_income.toLocaleString()}` : null} />
                <InfoRow label="Years Employed" value={application.years_employed ? `${application.years_employed} years` : null} />
              </div>
            </motion.div>

            {/* Loan Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Loan Details</h3>
              </div>
              <div className="space-y-3">
                <InfoRow label="Loan Amount" value={application.loan_amount ? `₹${application.loan_amount.toLocaleString()}` : null} />
                <InfoRow label="Purpose" value={application.loan_purpose} />
                <InfoRow label="Interest Rate" value={application.interest_rate ? `${application.interest_rate}%` : null} />
                <InfoRow label="Term" value={application.loan_term ? `${application.loan_term} months` : null} />
              </div>
            </motion.div>

            {/* Credit Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-card rounded-2xl border border-border p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileSearch className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold">Credit Information</h3>
              </div>
              <div className="space-y-3">
                <InfoRow label="Credit History" value={application.credit_history_length ? `${application.credit_history_length} years` : null} />
                <InfoRow label="Existing Loans" value={application.existing_loans?.toString()} />
              </div>
            </motion.div>
          </div>

          {/* Decision Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-card rounded-2xl border border-border p-8 text-center"
          >
            <h3 className="font-display text-xl font-semibold mb-2">Your Decision</h3>
            <p className="text-muted-foreground mb-6">
              Review the details above and make your assessment decision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-risk-low hover:bg-risk-low/90 text-white min-w-[160px]"
                onClick={() => handleDecision("approved")}
                disabled={submitting}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-5 w-5 mr-2" />}
                Approve
              </Button>
              <Button
                size="lg"
                variant="destructive"
                className="min-w-[160px]"
                onClick={() => handleDecision("rejected")}
                disabled={submitting}
              >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <XCircle className="h-5 w-5 mr-2" />}
                Reject
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value || "—"}</span>
    </div>
  );
}
