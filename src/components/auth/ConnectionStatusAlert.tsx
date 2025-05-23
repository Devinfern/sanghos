
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface ConnectionStatusAlertProps {
  connectionStatus: "checking" | "connected" | "error" | "project_not_found";
  error: string;
}

const ConnectionStatusAlert = ({ connectionStatus, error }: ConnectionStatusAlertProps) => {
  // Use the project constants directly
  const projectDetails = {
    url: "https://ordomvdrqjthpzfyrrzp.supabase.co",
    key: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // Truncate for security
  };

  if (connectionStatus === "checking") {
    return (
      <Alert className="mb-4 bg-blue-50">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Checking connection to database...
        </AlertDescription>
      </Alert>
    );
  }

  if (connectionStatus === "error") {
    return (
      <>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Database connection error. {error}
          </AlertDescription>
        </Alert>
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
      </>
    );
  }

  if (connectionStatus === "project_not_found") {
    return (
      <>
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            The Supabase project does not exist. Please check your project configuration.
          </AlertDescription>
        </Alert>
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
      </>
    );
  }

  return null;
};

export default ConnectionStatusAlert;
