import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={logo} alt="ClariFin Logo" className="h-10 w-auto" />
              <span className="font-display font-bold text-xl text-foreground">ClariFin</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              See the why. Make confident decisions.
            </p>
            <p className="text-sm text-muted-foreground">
              AI-powered credit risk intelligence with complete explainability for modern financial institutions.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/auth?role=lender" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  For Lender
                </Link>
              </li>
              <li>
                <Link to="/auth?role=borrower" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  For Borrower
                </Link>
              </li>
            </ul>
          </div>

          {/* Terms */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Our Terms</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy & Security
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help & FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:contact@clarifin.ai"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  contact@clarifin.ai
                </a>
              </li>
              <li>
                <a
                  href="tel:+918765430002"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  +91 8765430002
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Plot+No.+2,+Sector-33,+Pethapada,+Kharghar,+Navi+Mumbai-410210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  Plot No. 2, Sector-33, Pethapada, Kharghar, Navi Mumbai-410210, Maharashtra
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ClariFin. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>SOC 2 Compliant • GDPR Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}