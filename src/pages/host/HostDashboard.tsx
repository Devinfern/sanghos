
import { useEffect, useState } from "react";
import { useHost } from "@/contexts/HostContext";
import { Navigate } from "react-router-dom";
import HostHeader from "@/components/HostHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CalendarDays,
  Home,
  Users,
  DollarSign,
  AlertCircle,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { retreats } from "@/lib/data";
import { formatCurrency } from "@/lib/data";

const HostDashboard = () => {
  const { host } = useHost();
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalSpaces: 0,
    totalRetreats: 0,
    pendingBookings: 0,
  });

  useEffect(() => {
    // Simulate fetching stats
    const fetchStats = () => {
      // For demo purposes, we'll generate random stats
      setStats({
        totalBookings: Math.floor(Math.random() * 100) + 20,
        totalRevenue: Math.floor(Math.random() * 10000) + 2000,
        totalSpaces: Math.floor(Math.random() * 5) + 1,
        totalRetreats: retreats.length,
        pendingBookings: Math.floor(Math.random() * 10) + 1,
      });
    };

    fetchStats();
  }, []);

  // Redirect if not logged in
  if (!host) {
    return <Navigate to="/host/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-sand-50">
      <HostHeader />
      <div className="flex-1 container px-4 md:px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {host.name}</h1>
          <p className="text-muted-foreground">
            Manage your retreats and spaces from your dashboard
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon={<Users className="h-5 w-5" />}
            change={7.2}
            changeType="increase"
          />
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={<DollarSign className="h-5 w-5" />}
            change={12.5}
            changeType="increase"
          />
          <StatCard
            title="Active Retreats"
            value={stats.totalRetreats}
            icon={<CalendarDays className="h-5 w-5" />}
            change={0}
            changeType="neutral"
          />
          <StatCard
            title="Listed Spaces"
            value={stats.totalSpaces}
            icon={<Home className="h-5 w-5" />}
            change={-1}
            changeType="decrease"
          />
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>
                Your most recent retreat bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">
                          {"Guest " + (i + 1)} booked{" "}
                          {retreats[i % retreats.length].title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(
                            Date.now() - i * 86400000
                          ).toLocaleDateString()}{" "}
                          • {retreats[i % retreats.length].location.city}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatCurrency(
                          retreats[i % retreats.length].price
                        )}
                      </p>
                      <span className="text-sm px-2 py-1 bg-green-100 text-green-800 rounded">
                        Confirmed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Items */}
          <Card>
            <CardHeader>
              <CardTitle>Action Items</CardTitle>
              <CardDescription>Items requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-amber-200 bg-amber-50 flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-amber-800">
                      Pending Bookings
                    </h4>
                    <p className="text-sm text-amber-700">
                      You have {stats.pendingBookings} bookings waiting for
                      confirmation
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-blue-200 bg-blue-50 flex items-start gap-3">
                  <CalendarDays className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">
                      Upcoming Retreats
                    </h4>
                    <p className="text-sm text-blue-700">
                      You have 3 retreats scheduled in the next 30 days
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-green-200 bg-green-50 flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">
                      Payment Due
                    </h4>
                    <p className="text-sm text-green-700">
                      You have {formatCurrency(stats.totalRevenue * 0.3)} in
                      payments ready to withdraw
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: number;
  changeType: "increase" | "decrease" | "neutral";
}

const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType,
}: StatCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-muted-foreground">{title}</h3>
          <span className="p-2 rounded-full bg-primary/10">{icon}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-3xl font-bold">{value}</p>
          {changeType !== "neutral" && (
            <div
              className={cn(
                "flex items-center text-sm",
                changeType === "increase"
                  ? "text-green-600"
                  : "text-red-600"
              )}
            >
              {changeType === "increase" ? (
                <ArrowUp className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDown className="mr-1 h-4 w-4" />
              )}
              {change}%
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HostDashboard;
