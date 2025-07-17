import React from "react";
import { motion } from "framer-motion";
import { Users, MessageCircle, Calendar, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CommunityHeroProps {
  activeMembers: number;
  totalPosts: number;
  upcomingEvents: number;
  engagement: number;
}

const CommunityHero = ({ 
  activeMembers = 156, 
  totalPosts = 2847, 
  upcomingEvents = 12,
  engagement = 94 
}: CommunityHeroProps) => {
  const stats = [
    { icon: Users, label: "Active Members", value: activeMembers, color: "text-brand-primary" },
    { icon: MessageCircle, label: "Posts This Week", value: totalPosts, color: "text-brand-sand" },
    { icon: Calendar, label: "Upcoming Events", value: upcomingEvents, color: "text-brand-rose" },
    { icon: Heart, label: "Engagement Rate", value: `${engagement}%`, color: "text-sage-600" },
  ];

  const inspiringQuotes = [
    "Every journey begins with a single step toward mindfulness.",
    "In stillness, we find our truest selves.",
    "Community is where healing happens together.",
    "Your presence here is a gift to us all.",
  ];

  const randomQuote = inspiringQuotes[Math.floor(Math.random() * inspiringQuotes.length)];

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-brand-subtle/20 via-white to-sage-50/30 rounded-3xl mb-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-brand-primary rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-brand-sand rounded-full translate-x-12 translate-y-12"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-brand-rose rounded-full transform -translate-y-8"></div>
      </div>

      <div className="relative p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mb-3">
              Welcome to Our Wellness Community
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {randomQuote}
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="p-4 text-center bg-white/60 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-current/10 mb-2 ${stat.color}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-brand-dark">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Community Pulse */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-brand-primary/20">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-brand-dark">
                Community is live and active
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityHero;