import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  User, 
  Briefcase, 
  DollarSign, 
  CreditCard, 
  Building2,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const steps = [
  { id: 1, title: "Personal Info", icon: User },
  { id: 2, title: "Employment", icon: Briefcase },
  { id: 3, title: "Loan Details", icon: DollarSign },
  { id: 4, title: "Review", icon: CheckCircle },
];

const sectors = [
  "Information Technology",
  "Banking & Finance",
  "Healthcare",
  "Manufacturing",
  "Retail & E-commerce",
  "Real Estate",
  "MSME",
  "Agriculture",
  "Education",
  "Other",
];

const employmentTypes = [
  "Salaried - Private",
  "Salaried - Government",
  "Self-Employed",
  "Business Owner",
  "Freelancer",
  "Retired",
];

export default function LoanApplication() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    employmentType: "",
    sector: "",
    annualIncome: "",
    yearsEmployed: "",
    loanAmount: "",
    loanPurpose: "",
    interestRate: "",
    loanTerm: "",
    creditHistoryLength: "",
    existingLoans: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Store form data for dashboard
    localStorage.setItem("loanApplication", JSON.stringify(formData));
    navigate("/dashboard");
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.age && formData.email;
      case 2:
        return formData.employmentType && formData.sector && formData.annualIncome;
      case 3:
        return formData.loanAmount && formData.loanPurpose && formData.creditHistoryLength;
      default:
        return true;
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
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Loan Risk Assessment
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete the form below to receive an AI-powered risk assessment with full explainability.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        currentStep >= step.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <step.icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 md:w-24 h-1 mx-2 rounded transition-all ${
                        currentStep > step.id ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto bg-card rounded-2xl border border-border p-8 shadow-sm"
          >
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Personal Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="35"
                      value={formData.age}
                      onChange={(e) => updateField("age", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Employment Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Employment Type *</Label>
                    <Select
                      value={formData.employmentType}
                      onValueChange={(v) => updateField("employmentType", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Industry / Sector *</Label>
                    <Select
                      value={formData.sector}
                      onValueChange={(v) => updateField("sector", v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>
                            {sector}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Income (₹) *</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="1200000"
                      value={formData.annualIncome}
                      onChange={(e) => updateField("annualIncome", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years">Years Employed</Label>
                    <Input
                      id="years"
                      type="number"
                      placeholder="5"
                      value={formData.yearsEmployed}
                      onChange={(e) => updateField("yearsEmployed", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Loan Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount (₹) *</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="500000"
                      value={formData.loanAmount}
                      onChange={(e) => updateField("loanAmount", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">Loan Purpose *</Label>
                    <Input
                      id="purpose"
                      placeholder="Home Renovation"
                      value={formData.loanPurpose}
                      onChange={(e) => updateField("loanPurpose", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rate">Interest Rate (%)</Label>
                    <Input
                      id="rate"
                      type="number"
                      step="0.1"
                      placeholder="10.5"
                      value={formData.interestRate}
                      onChange={(e) => updateField("interestRate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="term">Loan Term (months)</Label>
                    <Input
                      id="term"
                      type="number"
                      placeholder="36"
                      value={formData.loanTerm}
                      onChange={(e) => updateField("loanTerm", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creditHistory">Credit History Length (years) *</Label>
                    <Input
                      id="creditHistory"
                      type="number"
                      placeholder="8"
                      value={formData.creditHistoryLength}
                      onChange={(e) => updateField("creditHistoryLength", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="existingLoans">Existing Loan Count</Label>
                    <Input
                      id="existingLoans"
                      type="number"
                      placeholder="1"
                      value={formData.existingLoans}
                      onChange={(e) => updateField("existingLoans", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h2 className="font-display text-xl font-semibold">Review Application</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Applicant</p>
                      <p className="font-medium">{formData.name || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{formData.age || "—"} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Employment</p>
                      <p className="font-medium">{formData.employmentType || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Sector</p>
                      <p className="font-medium">{formData.sector || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Annual Income</p>
                      <p className="font-medium">₹{Number(formData.annualIncome).toLocaleString() || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Loan Amount</p>
                      <p className="font-medium">₹{Number(formData.loanAmount).toLocaleString() || "—"}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Credit History</p>
                      <p className="font-medium">{formData.creditHistoryLength || "—"} years</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Purpose</p>
                      <p className="font-medium">{formData.loanPurpose || "—"}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-2">
                      By submitting, you agree to have your information analyzed by our AI risk assessment system.
                    </p>
                    <p className="text-sm font-medium text-primary">
                      Your data is processed securely and in compliance with regulations.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {currentStep < 4 ? (
                <Button
                  variant="hero"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  disabled={!canProceed()}
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button variant="glow" onClick={handleSubmit}>
                  Assess Risk
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
