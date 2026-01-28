import { motion } from "framer-motion";
import { User, Brain, Search, CheckCircle, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: User,
    label: "User Applies",
    description: "Borrower submits application",
  },
  {
    icon: Brain,
    label: "Risk Agents",
    description: "AI analyzes multiple factors",
  },
  {
    icon: Search,
    label: "Explainability",
    description: "SHAP explains decisions",
  },
  {
    icon: CheckCircle,
    label: "Decision",
    description: "Clear, justified outcome",
  },
];

export function WorkflowDiagram() {
  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-lg">
                  <step.icon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </motion.div>
              <h4 className="font-display font-semibold text-foreground mt-3 text-sm md:text-base">
                {step.label}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground mt-1 max-w-[120px]">
                {step.description}
              </p>
            </motion.div>

            {/* Arrow */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
                className="hidden md:flex items-center mx-4"
              >
                <div className="w-8 lg:w-12 h-[2px] bg-gradient-to-r from-primary/50 to-primary/20" />
                <ArrowRight className="h-5 w-5 text-primary/50 -ml-1" />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
