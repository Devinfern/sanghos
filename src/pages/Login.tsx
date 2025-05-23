
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [connectionStatus, setConnectionStatus] = useState<"checking" | "connected" | "error" | "project_not_found">("checking");
  const [projectDetails, setProjectDetails] = useState({
    url: "https://raijubzrdhwizxtupguy.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....[truncated]"
  });

  useEffect(() => {
    // Check if this is a join request
    const urlParams = new URLSearchParams(window.location.search);
    const isJoin = urlParams.get('join') === 'true';
    
    if (isJoin) {
      console.log("Join mode detected");
    }
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('forum_posts').select('count', { count: 'exact', head: true });
        
        if (error) {
          console.error("Supabase connection error:", error);
          if (error.message.includes("The resource was not found") || error.message.includes("does not exist")) {
            setConnectionStatus("project_not_found");
            setError("The Supabase project does not exist or is no longer accessible. Please check your project configuration.");
          } else if (error.message.includes("connection") || error.message.includes("network") || error.message.includes("fetch")) {
            setConnectionStatus("error");
            setError("Unable to connect to Supabase. Please check your internet connection.");
          } else {
            setConnectionStatus("error");
            setError(error.message);
          }
        } else {
          setConnectionStatus("connected");
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
        setConnectionStatus("error");
        setError("Unable to establish a connection to the database.");
      }
    };

    checkConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (connectionStatus === "error") {
      setError("Cannot log in while database connection is unavailable.");
      return;
    }
    
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        console.error("Login error:", signInError);
        throw new Error(signInError.message);
      }

      if (!data.user) {
        throw new Error("No user returned from login");
      }

      localStorage.setItem("sanghos_user", JSON.stringify({
        email: data.user.email,
        name: data.user.email?.split('@')[0] || 'User'
      }));
      
      toast.success("Login successful!");
      
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        if (err.message.includes("Email not confirmed")) {
          setError("Your email has not been confirmed. Please check your inbox for a confirmation email.");
        } else if (err.message.includes("Invalid login credentials")) {
          setError("Invalid email or password. Please try again.");
        } else if (err.message.includes("connection") || err.message.includes("network")) {
          setError("Connection issue. Please check your internet and try again.");
        } else {
          setError(err.message);
        }
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>Login | Sanghos</title>
        <meta name="description" content="Login to your Sanghos account to access retreats, instructors, and community features." />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
            
            {connectionStatus === "checking" && (
              <Alert className="mb-4 bg-blue-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Checking connection to database...
                </AlertDescription>
              </Alert>
            )}
            
            {connectionStatus === "error" && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Database connection error. {error}
                </AlertDescription>
              </Alert>
            )}
            
            {connectionStatus === "project_not_found" && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  The Supabase project does not exist. Please check your project configuration.
                </AlertDescription>
              </Alert>
            )}

            {/* Social Login Buttons */}
            <div className="mb-6">
              <SocialLoginButtons 
                isLoading={isLoading} 
                onLoadingChange={setIsLoading}
              />
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>
            
            {error && connectionStatus !== "error" && connectionStatus !== "project_not_found" && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={connectionStatus === "error"}
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={connectionStatus === "error"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={toggleShowPassword}
                    disabled={connectionStatus === "error"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || connectionStatus === "error" || connectionStatus === "checking" || connectionStatus === "project_not_found"}
              >
                {isLoading ? "Logging in..." : connectionStatus === "checking" ? "Checking connection..." : "Login"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link to="/signup" className="text-sm text-primary hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
            
            {(connectionStatus === "error" || connectionStatus === "project_not_found") && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-sm font-medium mb-2">Supabase Project Information</h3>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li><span className="font-medium">Project URL:</span> {projectDetails.url}</li>
                  <li><span className="font-medium">API Key:</span> {projectDetails.key}</li>
                </ul>
                <div className="mt-3 text-xs text-muted-foreground">
                  <p>If you've created a new Supabase project, you need to update these values in:</p>
                  <code className="bg-gray-100 p-1 text-xs rounded">src/integrations/supabase/client.ts</code>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
