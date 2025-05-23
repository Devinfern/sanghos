
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import ConnectionStatusAlert from "@/components/auth/ConnectionStatusAlert";
import LoginForm from "@/components/auth/LoginForm";
import { useSupabaseConnection } from "@/hooks/useSupabaseConnection";
import { useLoginForm } from "@/hooks/useLoginForm";

const Login = () => {
  const { connectionStatus, error } = useSupabaseConnection();
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    setIsLoading,
    error: formError,
    handleSubmit
  } = useLoginForm(connectionStatus);

  const projectDetails = {
    url: "https://raijubzrdhwizxtupguy.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....[truncated]"
  };

  useEffect(() => {
    // Check if this is a join request
    const urlParams = new URLSearchParams(window.location.search);
    const isJoin = urlParams.get('join') === 'true';
    
    if (isJoin) {
      console.log("Join mode detected");
    }
  }, []);

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
            
            <ConnectionStatusAlert 
              connectionStatus={connectionStatus}
              error={error}
              projectDetails={projectDetails}
            />

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
            
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={formError}
              isLoading={isLoading}
              connectionStatus={connectionStatus}
              onSubmit={handleSubmit}
            />

            <div className="mt-4 text-center">
              <Link to="/signup" className="text-sm text-primary hover:underline">
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Login;
