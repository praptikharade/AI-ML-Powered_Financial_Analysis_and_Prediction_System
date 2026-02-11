import { motion } from "framer-motion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "Getting Started",
    questions: [
      {
        q: "What is ClariFin?",
        a: "ClariFin is an AI-powered credit risk intelligence platform that uses multiple specialized agents to analyze borrower risk. Unlike traditional scoring systems, ClariFin provides full explainability — showing you exactly why each decision was made using SHAP-powered explanations.",
      },
      {
        q: "Who is ClariFin designed for?",
        a: "ClariFin is built for banks, NBFCs, fintech companies, and risk teams who need transparent, auditable credit risk assessments. Both borrowers and lenders benefit from the platform's explainability features.",
      },
      {
        q: "How do I create an account?",
        a: "Click the Sign In button on the landing page, then select 'Create Account.' You'll choose your role (borrower or lender) during registration, which determines your dashboard and available features.",
      },
    ],
  },
  {
    title: "Risk Assessment",
    questions: [
      {
        q: "How does the AI risk assessment work?",
        a: "Our agentic AI architecture routes each application through specialized agents: a Financial Analysis Agent examines financial data, a Sector Trend Agent evaluates industry conditions, and a Risk Scoring Agent synthesizes everything into a final assessment with full explainability.",
      },
      {
        q: "What does 'See the Why' mean?",
        a: "Every risk score comes with SHAP-powered feature importance bars showing which factors (like debt-to-income ratio, industry outlook, or revenue trends) most influenced the decision, along with a plain-language justification. No more black-box scores.",
      },
      {
        q: "How accurate are the risk predictions?",
        a: "Our models are continuously validated against real-world outcomes and undergo regular bias audits. The multi-agent approach reduces single-model risk and provides more robust assessments than traditional scoring methods.",
      },
    ],
  },
  {
    title: "For Borrowers",
    questions: [
      {
        q: "How do I submit a loan application?",
        a: "After signing in as a borrower, navigate to 'Apply for Assessment' from the navigation menu. Fill in your company details, loan amount, and purpose, then submit for review.",
      },
      {
        q: "Can I see why my application received a particular score?",
        a: "Yes! On your dashboard, each application has a 'See Why' button that expands to show the detailed explainability panel with factor breakdowns and decision justification.",
      },
    ],
  },
  {
    title: "For Lenders",
    questions: [
      {
        q: "How do I review applications?",
        a: "As a lender, your dashboard shows all applications assigned to you. You can view detailed risk assessments, explainability reports, and make approval decisions with full context.",
      },
      {
        q: "Can I customize risk thresholds?",
        a: "The portfolio analysis view allows you to see risk distribution across your lending portfolio. Custom threshold configuration is available for enterprise accounts.",
      },
    ],
  },
  {
    title: "Security & Privacy",
    questions: [
      {
        q: "Is my financial data secure?",
        a: "Absolutely. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We maintain SOC 2 compliance and never share your data with third parties. See our Privacy & Security page for full details.",
      },
      {
        q: "Is ClariFin compliant with financial regulations?",
        a: "Yes. ClariFin is designed for regulatory compliance including GDPR and fair lending requirements. All AI decisions are fully explainable and auditable, maintaining comprehensive assessment trails.",
      },
    ],
  },
];

export default function FAQ() {
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
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about ClariFin's AI-powered credit risk platform.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-10">
            {faqCategories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <h2 className="font-display font-semibold text-xl text-foreground mb-4">
                  {category.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((item, qIndex) => (
                    <AccordionItem
                      key={qIndex}
                      value={`${catIndex}-${qIndex}`}
                      className="bg-card rounded-xl border border-border px-6 data-[state=open]:border-primary/20 transition-colors"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:no-underline py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="max-w-3xl mx-auto mt-16 text-center"
          >
            <div className="bg-muted/50 rounded-xl border border-border p-8">
              <HelpCircle className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                Still have questions?
              </h3>
              <p className="text-muted-foreground mb-4">
                Our team is here to help. Reach out and we'll get back to you within 24 hours.
              </p>
              <a
                href="/contact"
                className="text-primary font-medium hover:underline"
              >
                Contact Us →
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
