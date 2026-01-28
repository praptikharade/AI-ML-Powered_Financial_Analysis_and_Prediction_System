import { motion } from "framer-motion";
import { 
  Brain, 
  Layers, 
  Search, 
  TrendingUp, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Cpu,
  BarChart3,
  Network
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const agents = [
  {
    icon: Brain,
    title: "Risk Assessment Agent",
    model: "XGBoost Ensemble",
    description: "Analyzes borrower features using gradient boosting to compute a comprehensive risk score based on historical default patterns.",
    features: ["Credit history analysis", "Income verification", "Loan-to-income ratio", "Employment stability"],
  },
  {
    icon: Search,
    title: "Explainability Agent",
    model: "SHAP (SHapley Additive exPlanations)",
    description: "Provides feature-level explanations for every prediction, ensuring transparency and regulatory compliance.",
    features: ["Feature importance ranking", "Individual contribution analysis", "Decision audit trails", "Compliance reporting"],
  },
  {
    icon: TrendingUp,
    title: "Sector Risk Agent",
    model: "GRU Neural Network",
    description: "Monitors sector-level trends using recurrent neural networks to dynamically adjust risk based on market conditions.",
    features: ["Time-series forecasting", "Sector correlation analysis", "Economic indicator tracking", "Early warning signals"],
  },
  {
    icon: CheckCircle,
    title: "Decision Agent",
    model: "Rule-based + ML Hybrid",
    description: "Synthesizes outputs from all agents to deliver a final, justified decision with confidence scores.",
    features: ["Multi-agent consensus", "Policy compliance check", "Recommendation generation", "Risk-adjusted pricing"],
  },
];

const principles = [
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Every decision is explainable. No black-box predictions.",
  },
  {
    icon: Layers,
    title: "Modular Architecture",
    description: "Specialized agents that can be updated independently.",
  },
  {
    icon: Cpu,
    title: "Real-time Processing",
    description: "Sub-second risk assessments at scale.",
  },
  {
    icon: Network,
    title: "Continuous Learning",
    description: "Models retrain on new data while maintaining stability.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Brain className="h-4 w-4" />
              Agentic AI Architecture
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
              The Technology Behind{" "}
              <span className="gradient-text">Intelligent Risk Assessment</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              ClariFin leverages a multi-agent AI architecture where specialized models 
              collaborate to deliver accurate, explainable, and compliant credit risk decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agentic Architecture */}
      <section className="py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our AI Agents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four specialized agents work together to analyze, explain, and decide — 
              ensuring no aspect of risk assessment is overlooked.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={agent.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 shrink-0">
                    <agent.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {agent.title}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-3">
                      {agent.model}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {agent.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {agent.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Core Principles
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built with enterprise requirements in mind — security, compliance, 
              and operational excellence at every layer.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Technical Stack
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    ML Models
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• XGBoost for classification</li>
                    <li>• GRU for time-series</li>
                    <li>• SHAP for explainability</li>
                    <li>• Ensemble methods</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    Infrastructure
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Cloud-native deployment</li>
                    <li>• Auto-scaling compute</li>
                    <li>• Real-time inference</li>
                    <li>• Edge caching</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Compliance
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• SOC 2 Type II</li>
                    <li>• GDPR compliant</li>
                    <li>• Audit logging</li>
                    <li>• Data encryption</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link to="/apply">
                <Button variant="glow" size="xl">
                  Experience It Yourself
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
