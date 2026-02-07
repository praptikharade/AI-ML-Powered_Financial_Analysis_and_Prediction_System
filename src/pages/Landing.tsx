import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight, 
  Sparkles,
  Building2,
  BarChart3,
  Lock,
  Zap,
  LogIn,
  Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowDiagram } from "@/components/ui/WorkflowDiagram";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { RiskGauge } from "@/components/ui/RiskGauge";
import { ExplainabilityPanel, generateMockFeatures, generateMockJustification } from "@/components/ui/ExplainabilityPanel";

const features = [
  {
    icon: Brain,
    title: "Agentic AI Architecture",
    description: "Multiple specialized AI agents work together to analyze risk from every angle.",
  },
  {
    icon: Sparkles,
    title: "Full Explainability",
    description: "SHAP-powered explanations show exactly why each decision was made.",
  },
  {
    icon: TrendingUp,
    title: "Dynamic Risk Adjustment",
    description: "Real-time sector trends automatically update risk assessments.",
  },
  {
    icon: Lock,
    title: "Regulatory Compliant",
    description: "Built for transparency and auditability from the ground up.",
  },
];

const targetUsers = [
  { icon: Building2, label: "Banks" },
  { icon: BarChart3, label: "NBFCs" },
  { icon: Zap, label: "Fintech" },
  { icon: Shield, label: "Risk Teams" },
];

export default function Landing() {
  const { user, profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                AI-Powered Risk Intelligence
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6"
            >
              Credit Risk Intelligence with{" "}
              <span className="gradient-text">Complete Explainability</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Dynamic credit risk prediction using borrower data, sector trends, and 
              machine learning — with transparent explanations for every decision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {user ? (
                <>
                  <Link to="/apply">
                    <Button variant="hero" size="xl">
                      New Risk Assessment
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/dashboard">
                    <Button variant="heroOutline" size="xl">
                      My Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="hero" size="xl">
                      Get Started Free
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="heroOutline" size="xl">
                      <LogIn className="h-5 w-5" />
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </motion.div>

            {/* Target Users */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-8 flex-wrap"
            >
              <span className="text-sm text-muted-foreground">Trusted by:</span>
              {targetUsers.map((user) => (
                <div key={user.label} className="flex items-center gap-2 text-muted-foreground">
                  <user.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our agentic AI architecture processes each application through multiple 
              specialized agents for comprehensive risk assessment.
            </p>
          </motion.div>

          <WorkflowDiagram />
        </div>
      </section>

      {/* Explainability Demo Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Eye className="h-4 w-4" />
              See the Why
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Complete Transparency for Every Decision
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our SHAP-powered explainability shows borrowers exactly why they received 
              their risk score — no black boxes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Demo Application Card */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="font-medium text-foreground text-lg">
                      Acme Tech Solutions
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium capitalize bg-risk-medium/10 text-risk-medium">
                      pending
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span>Amount: ₹50,00,000</span>
                    <span>Purpose: Working Capital</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">Risk Score</p>
                      <RiskGauge score={45} size="md" />
                    </div>
                  </div>
                </div>
                
                {/* Explainability Panel Demo */}
                <div className="flex-1">
                  <ExplainabilityPanel
                    features={generateMockFeatures(45)}
                    justification={generateMockJustification(45, "pending")}
                    confidence={0.87}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why ClariFin?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for modern financial institutions that demand transparency, 
              accuracy, and compliance in their risk assessment processes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 p-3 rounded-full bg-primary/10 mb-6">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Risk Assessment?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start making data-driven credit decisions with full transparency and 
              AI-powered insights today.
            </p>
            <Link to="/apply">
              <Button variant="glow" size="xl">
                Get Started Now
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
