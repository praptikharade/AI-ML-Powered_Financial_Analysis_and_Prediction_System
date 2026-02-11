import { motion } from "framer-motion";
import { Shield, Lock, Eye, Server, FileCheck, UserCheck } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const sections = [
  {
    icon: Lock,
    title: "Data Encryption",
    content:
      "All data transmitted to and from ClariFin is encrypted using industry-standard TLS 1.3. Sensitive financial data is encrypted at rest using AES-256 encryption, ensuring your information remains secure at every stage.",
  },
  {
    icon: Eye,
    title: "Data Collection & Usage",
    content:
      "We collect only the data necessary to perform credit risk assessments. This includes financial statements, borrower information, and sector data. We never sell your data to third parties or use it for purposes beyond risk assessment and platform improvement.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    content:
      "ClariFin is hosted on SOC 2 Type II certified infrastructure with continuous monitoring, automated threat detection, and regular penetration testing. Our systems are designed with redundancy and disaster recovery in mind.",
  },
  {
    icon: FileCheck,
    title: "Regulatory Compliance",
    content:
      "Our platform is built to comply with GDPR, CCPA, and financial industry regulations. We maintain comprehensive audit trails of all risk assessments, ensuring full traceability and accountability.",
  },
  {
    icon: UserCheck,
    title: "Access Control",
    content:
      "Role-based access control ensures that users only see data relevant to their role. Borrowers can only access their own applications, while lenders see only assessments assigned to them.",
  },
  {
    icon: Shield,
    title: "AI Model Governance",
    content:
      "Our AI models are subject to regular bias audits and fairness evaluations. All model decisions are fully explainable through SHAP values, ensuring transparency and compliance with fair lending practices.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Trust & Transparency
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy & Security
            </h1>
            <p className="text-lg text-muted-foreground">
              At ClariFin, protecting your data is foundational to everything we build. Here's how we keep your information safe and your trust earned.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto grid gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border p-6 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto mt-16 text-center"
          >
            <div className="bg-muted/50 rounded-xl border border-border p-8">
              <div className="flex items-center justify-center gap-2 text-primary mb-4">
                <Shield className="h-5 w-5" />
                <span className="font-display font-semibold">SOC 2 Compliant • GDPR Ready</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Last updated: February 2026. For questions about our privacy practices, contact us at{" "}
                <a href="mailto:privacy@clarifin.ai" className="text-primary hover:underline">
                  privacy@clarifin.ai
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
