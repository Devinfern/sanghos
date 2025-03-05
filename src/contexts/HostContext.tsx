
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Host type definition
export interface Host {
  id: string;
  name: string;
  email: string;
  bio: string;
  image: string;
  specialties: string[];
  yearsExperience: number;
}

// Context type
interface HostContextType {
  host: Host | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (hostData: Omit<Host, "id"> & { password: string }) => Promise<void>;
}

// Create context with default values
const HostContext = createContext<HostContextType>({
  host: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

// Custom hook to use the host context
export const useHost = () => useContext(HostContext);

// Mock data for demo purposes
const MOCK_HOST: Host = {
  id: "host-1",
  name: "Maya Johnson",
  email: "maya@example.com",
  bio: "Yoga therapist with 15 years of experience in mindfulness practices.",
  image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  specialties: ["Hatha Yoga", "Meditation", "Stress Reduction", "Breathwork"],
  yearsExperience: 15,
};

export const HostProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [host, setHost] = useState<Host | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedHost = localStorage.getItem("sanghos_host");
    if (storedHost) {
      setHost(JSON.parse(storedHost));
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, we'll just check if email contains "maya"
      if (email.includes("maya")) {
        setHost(MOCK_HOST);
        localStorage.setItem("sanghos_host", JSON.stringify(MOCK_HOST));
        toast.success("Welcome back, Maya!");
        navigate("/host/dashboard");
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = () => {
    setHost(null);
    localStorage.removeItem("sanghos_host");
    toast.success("Logged out successfully");
    navigate("/host/login");
  };

  // Mock register function
  const register = async (hostData: Omit<Host, "id"> & { password: string }) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new host with fake ID
      const newHost: Host = {
        id: `host-${Date.now()}`,
        name: hostData.name,
        email: hostData.email,
        bio: hostData.bio,
        image: hostData.image,
        specialties: hostData.specialties,
        yearsExperience: hostData.yearsExperience,
      };
      
      setHost(newHost);
      localStorage.setItem("sanghos_host", JSON.stringify(newHost));
      toast.success("Registration successful!");
      navigate("/host/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <HostContext.Provider value={{ host, isLoading, login, logout, register }}>
      {children}
    </HostContext.Provider>
  );
};
