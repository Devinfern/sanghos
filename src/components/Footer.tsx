
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Send, ArrowRight, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    
    // Validate email format with regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };
  
  return (
    <footer className="bg-gradient-to-b from-sand-50 to-sand-100 pt-20 pb-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/e38deb47-fbee-4a9f-9466-0ad53f2d7a19.png" 
                alt="Sanghos Logo" 
                className="h-12 w-auto" 
              />
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-sm">
              Connecting mindful seekers with transformative daylong retreats in unique private spaces.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
                <Instagram className="h-5 w-5 text-brand-primary" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
                <Facebook className="h-5 w-5 text-brand-primary" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-all hover:scale-110">
                <Twitter className="h-5 w-5 text-brand-primary" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-lg mb-5 text-sage-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/retreats" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Retreats</span>
                </Link>
              </li>
              <li>
                <Link to="/instructors" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Instructors</span>
                </Link>
              </li>
              <li>
                <Link to="/wellness-journal" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Wellness Journal</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="font-medium text-lg mb-5 text-sage-900">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Terms</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-brand-primary transition-colors flex items-center group">
                  <ArrowRight className="mr-1 h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span>Privacy</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="font-medium text-lg mb-5 text-sage-900">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with new retreats and wellness tips.
            </p>
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="flex space-x-2">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="pl-10 py-6 bg-white border-sand-200 focus:ring-brand-primary/20 focus:border-brand-primary/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="bg-brand-primary hover:bg-brand-primary/90">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </form>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-primary mr-2 mt-0.5" />
                <p className="text-muted-foreground">123 Wellness Way, San Francisco, CA 94105</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-brand-primary mr-2" />
                <a href="mailto:hello@sanghos.com" className="text-muted-foreground hover:text-brand-primary">hello@sanghos.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-brand-primary mr-2" />
                <a href="tel:+14155552671" className="text-muted-foreground hover:text-brand-primary">(415) 555-2671</a>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-sand-200 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Sanghos. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-muted-foreground hover:text-brand-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-muted-foreground hover:text-brand-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/accessibility" className="text-muted-foreground hover:text-brand-primary transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
