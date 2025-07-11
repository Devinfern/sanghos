import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, User, Mail, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AuthTest = () => {
  const { user, session, isLoading, signOut } = useAuth();

  const testResults = [
    {
      name: "Authentication Context",
      status: !isLoading ? "pass" : "loading",
      description: "Auth loading state completed"
    },
    {
      name: "User Session",
      status: session ? "pass" : "fail",
      description: session ? "User has active session" : "No active session found"
    },
    {
      name: "User Object",
      status: user ? "pass" : "fail", 
      description: user ? "User object is available" : "No user object found"
    },
    {
      name: "Protected Routes",
      status: user ? "pass" : "fail",
      description: user ? "Can access protected routes" : "Cannot access protected routes"
    }
  ];

  return (
    <>
      <Header />
      
      <main className="pt-24 pb-16 min-h-screen bg-gradient-to-b from-white to-brand-light/20">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-brand-dark">Authentication System Test</h1>
            <p className="text-muted-foreground">Verify your Sanghos authentication system is working correctly</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Authentication Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Authentication Status
                </CardTitle>
                <CardDescription>Current authentication state</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {testResults.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center gap-3">
                      {test.status === "pass" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : test.status === "loading" ? (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <p className="font-medium">{test.name}</p>
                        <p className="text-sm text-muted-foreground">{test.description}</p>
                      </div>
                    </div>
                    <Badge variant={test.status === "pass" ? "default" : test.status === "loading" ? "secondary" : "destructive"}>
                      {test.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  User Information
                </CardTitle>
                <CardDescription>Details from Supabase authentication</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user ? (
                  <>
                    <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                      <p className="font-medium text-green-800">✓ Authenticated User</p>
                      <div className="mt-2 space-y-1 text-sm">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>ID:</strong> {user.id}</p>
                        <p><strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                        <p><strong>Last Sign In:</strong> {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={signOut} 
                      variant="outline" 
                      className="w-full"
                    >
                      Sign Out (Test)
                    </Button>
                  </>
                ) : (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                    <p className="font-medium text-red-800">✗ Not Authenticated</p>
                    <p className="text-sm text-red-600 mt-1">Please sign in to test the authentication system</p>
                    <div className="mt-3 space-y-2">
                      <Button asChild className="w-full">
                        <a href="/login">Go to Login</a>
                      </Button>
                      <Button asChild variant="outline" className="w-full">
                        <a href="/signup">Create Account</a>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Test Instructions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Testing Instructions</CardTitle>
              <CardDescription>Follow these steps to verify your authentication system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold mb-2">Registration Test:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Go to <a href="/signup" className="text-blue-600 hover:underline">/signup</a></li>
                    <li>Create a new account with valid details</li>
                    <li>Verify you're redirected to onboarding</li>
                    <li>Check Supabase dashboard for new user</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Login Test:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Go to <a href="/login" className="text-blue-600 hover:underline">/login</a></li>
                    <li>Sign in with your credentials</li>
                    <li>Verify navigation shows "Dashboard"</li>
                    <li>Test protected routes work</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Protected Routes Test:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Visit <a href="/dashboard" className="text-blue-600 hover:underline">/dashboard</a> when logged out</li>
                    <li>Should redirect to login page</li>
                    <li>Log in and visit <a href="/dashboard" className="text-blue-600 hover:underline">/dashboard</a></li>
                    <li>Should show dashboard content</li>
                  </ol>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Session Test:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Log in to your account</li>
                    <li>Refresh the page</li>
                    <li>Should stay logged in</li>
                    <li>Test sign out functionality</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default AuthTest;