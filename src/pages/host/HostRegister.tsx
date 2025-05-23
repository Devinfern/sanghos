import React, { useState } from "react";
import { useHost } from "@/contexts/HostContext";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import HostHeader from "@/components/HostHeader";
import { useSupabaseConnection } from "@/hooks/useSupabaseConnection";
import ConnectionStatusAlert from "@/components/auth/ConnectionStatusAlert";

const HostRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb", // Default image
    specialties: "",
    yearsExperience: "0",
  });
  const { host, register, isLoading } = useHost();
  const { connectionStatus, error } = useSupabaseConnection();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      bio: formData.bio,
      image: formData.image,
      specialties: formData.specialties.split(",").map((s) => s.trim()),
      yearsExperience: parseInt(formData.yearsExperience) || 0,
    });
  };

  // Redirect if already logged in
  if (host) {
    return <Navigate to="/host/dashboard" />;
  }
  
  const isFormDisabled = connectionStatus !== "connected";

  return (
    <div className="min-h-screen flex flex-col">
      <HostHeader />
      <div className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="max-w-lg w-full mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Become a Host</h1>
            <p className="text-muted-foreground mt-2">
              Create an account to list your retreats and spaces
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <ConnectionStatusAlert 
              connectionStatus={connectionStatus}
              error={error}
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Maya Johnson"
                  required
                  disabled={isFormDisabled}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="maya@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about your experience and background..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="specialties" className="text-sm font-medium">
                    Specialties (comma separated)
                  </label>
                  <Input
                    id="specialties"
                    name="specialties"
                    value={formData.specialties}
                    onChange={handleChange}
                    placeholder="Yoga, Meditation, Breathwork"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="yearsExperience" className="text-sm font-medium">
                    Years of Experience
                  </label>
                  <Input
                    id="yearsExperience"
                    name="yearsExperience"
                    type="number"
                    min="0"
                    value={formData.yearsExperience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || isFormDisabled}
                size="lg"
              >
                {isLoading ? "Registering..." : "Register as Host"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                Already have a host account?{" "}
                <Link
                  to="/host/login"
                  className="text-primary hover:underline font-medium"
                >
                  <ArrowLeft className="inline h-3 w-3" /> Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostRegister;
