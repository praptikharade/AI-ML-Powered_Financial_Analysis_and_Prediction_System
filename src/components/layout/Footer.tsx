import { Link } from "react-router-dom";
import { Shield, Mail, Linkedin, Twitter, User } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";

export function Footer() {
  const { user } = useAuth();

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

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/apply" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Risk Assessment
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Portfolio Analysis
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Technology
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Account</h4>
            <ul className="space-y-2">
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      My Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/apply" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      New Application
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Create Account
                    </Link>
                  </li>
                </>
              )}
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Connect</h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="#"
                className="p-2 rounded-lg bg-background border border-border hover:border-primary hover:text-primary transition-all"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background border border-border hover:border-primary hover:text-primary transition-all"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background border border-border hover:border-primary hover:text-primary transition-all"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              contact@clarifin.ai
            </p>
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
