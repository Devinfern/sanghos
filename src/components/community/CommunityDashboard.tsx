
import { motion } from "framer-motion";
import { Calendar, Users, MessageSquare, BookOpen, TrendingUp, ArrowRight, Star, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import "./BentoDashboard.css";

interface CommunityDashboardProps {
  isLoggedIn: boolean;
  currentEvents: any[];
  trendingPosts: any[];
  onSectionChange: (section: string) => void;
}

const CommunityDashboard = ({
  isLoggedIn,
  currentEvents,
  trendingPosts,
  onSectionChange
}: CommunityDashboardProps) => {
  const { user } = useAuth();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const userName = user?.user_metadata?.username || user?.email?.split('@')[0] || "Friend";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const quickActions = [
    {
      icon: MessageSquare,
      label: "Start Discussion",
      description: "Share your thoughts",
      action: () => onSectionChange("discussions"),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Calendar,
      label: "Browse Events",
      description: "Find upcoming events",
      action: () => onSectionChange("events"),
      color: "from-green-500 to-green-600"
    },
    {
      icon: Users,
      label: "View Retreats",
      description: "Join retreat communities",
      action: () => onSectionChange("retreats"),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BookOpen,
      label: "Resources",
      description: "Learn & grow",
      action: () => onSectionChange("resources"),
      color: "from-orange-500 to-orange-600"
    }
  ];

  const trendingTopics = [
    { name: "Beginner Yoga", count: 24, growth: "+12%" },
    { name: "Meditation Tips", count: 18, growth: "+8%" },
    { name: "Sound Healing", count: 12, growth: "+15%" },
    { name: "Wellness Journey", count: 31, growth: "+20%" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-primary via-brand-dark to-brand-primary/90 text-white p-8"
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-brand-rose/40 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-1/3 w-96 h-40 rounded-full bg-brand-sand/30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-3">
            {getGreeting()}, {userName}! ✨
          </h1>
          <p className="text-lg opacity-90 mb-6 max-w-2xl">
            Welcome to your wellness community. Connect, grow, and embark on your journey with like-minded souls.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              onClick={() => onSectionChange("retreats")}
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Explore Retreats
            </Button>
            <Button 
              size="lg"
              className="bg-brand-sand hover:bg-brand-sand/90 text-brand-dark border-2 border-brand-sand hover:border-brand-sand/90 transition-all duration-300 hover:scale-105"
              onClick={() => onSectionChange("discussions")}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Join Discussion
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {quickActions.map((action, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-brand-subtle/20 bg-white">
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-brand-dark mb-2">{action.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={action.action}
                  className="w-full justify-between group-hover:bg-brand-subtle/10"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={2}
          className="lg:col-span-2"
        >
          <Card className="border-brand-subtle/20 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-brand-primary" />
                Trending Topics
                <Badge className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                  Hot
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl hover:bg-brand-subtle/5 transition-colors cursor-pointer border border-brand-subtle/10 hover:border-brand-primary/30"
                    onClick={() => onSectionChange("discussions")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-brand-dark">{topic.name}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-brand-primary transition-colors" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary text-xs">
                        {topic.count} posts
                      </Badge>
                      <span className="text-xs text-emerald-600 font-medium">
                        {topic.growth}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-brand-primary/30 hover:bg-brand-primary hover:text-white"
                onClick={() => onSectionChange("discussions")}
              >
                Explore All Topics
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={3}
        >
          <Card className="border-brand-subtle/20 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-brand-sand" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentEvents.slice(0, 3).map((event, index) => (
                  <div key={index} className="p-3 rounded-lg hover:bg-brand-subtle/5 transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <div className="h-12 w-12 bg-brand-primary/10 rounded-lg flex flex-col items-center justify-center mr-3">
                        <span className="text-xs font-medium text-brand-primary">{event.date?.month}</span>
                        <span className="text-sm font-bold text-brand-primary">{event.date?.day}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
                        <p className="text-xs text-muted-foreground">{event.time} • {event.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => onSectionChange("events")}
                >
                  View All Events
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Community Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={4}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="border-brand-subtle/20 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-brand-dark">1,247</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </CardContent>
        </Card>

        <Card className="border-brand-subtle/20 bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-brand-dark">342</div>
            <div className="text-sm text-muted-foreground">Discussions</div>
          </CardContent>
        </Card>

        <Card className="border-brand-subtle/20 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-brand-dark">28</div>
            <div className="text-sm text-muted-foreground">Active Retreats</div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CommunityDashboard;
