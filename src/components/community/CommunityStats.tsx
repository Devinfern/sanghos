
import { Users, MessageSquare, Calendar } from "lucide-react";

const CommunityStats = () => {
  const stats = [
    {
      icon: Users,
      label: "Active Members",
      value: "500+",
      description: "Growing mindful community"
    },
    {
      icon: MessageSquare,
      label: "Daily Discussions",
      value: "50+",
      description: "Engaging conversations"
    },
    {
      icon: Calendar,
      label: "Monthly Events",
      value: "20+",
      description: "Virtual & in-person gatherings"
    }
  ];

  return (
    <div className="bg-brand-subtle/5 py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex items-center space-x-4 p-6 bg-white rounded-lg border border-brand-subtle/30 shadow-sm"
            >
              <div className="p-3 rounded-full bg-brand-primary/10">
                <stat.icon className="h-6 w-6 text-brand-primary" />
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-brand-primary">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-brand-dark">
                    {stat.label}
                  </span>
                </div>
                <p className="text-sm text-brand-slate">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;
