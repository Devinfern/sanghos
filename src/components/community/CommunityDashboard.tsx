
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, MessageSquare, Calendar, Users, BookOpen, Star, Clock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCommunityPosts } from "@/hooks/useCommunityPosts";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { posts } = useCommunityPosts("", "");

  const topicSuggestions = [
    { name: "Beginner Yoga", icon: "🧘‍♀️", count: 24 },
    { name: "Meditation Tips", icon: "🧠", count: 18 },
    { name: "Sound Healing", icon: "🎵", count: 12 },
    { name: "Breathwork", icon: "💨", count: 15 },
    { name: "Wellness Journey", icon: "✨", count: 31 },
    { name: "Retreat Planning", icon: "🏔️", count: 9 }
  ];

  const quickStats = [
    { label: "Active Discussions", value: posts.length, icon: MessageSquare },
    { label: "Upcoming Events", value: currentEvents.length, icon: Calendar },
    { label: "Community Members", value: "2.4k", icon: Users },
    { label: "Resources", value: "156", icon: BookOpen }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Welcome Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center py-8"
      >
        <h1 className="text-4xl font-bold text-brand-dark mb-4">
          Welcome to Your Wellness Community
        </h1>
        <p className="text-brand-dark/70 max-w-2xl mx-auto text-lg">
          Discover personalized content, connect with like-minded individuals, and explore trending wellness topics.
        </p>
      </motion.div>

      {/* Enhanced Search */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
        className="max-w-3xl mx-auto mb-12"
      >
        <div className="relative">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-6 w-6" />
          <Input
            placeholder="Search discussions, events, resources, and members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-16 pr-6 py-4 text-lg rounded-2xl border-2 border-brand-subtle/30 focus:border-brand-primary transition-colors bg-white shadow-sm"
          />
          {searchQuery && (
            <Button
              size="sm"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 rounded-xl"
            >
              Search
            </Button>
          )}
        </div>
      </motion.div>

      {/* Bento Grid Layout */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
        className="bento-grid gap-6"
      >
        {/* Quick Stats - Top Row */}
        <div className="col-span-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="bento-card hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-brand-subtle/20">
                <CardContent className="pt-6 pb-6 text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-brand-primary" />
                  <div className="text-3xl font-bold text-brand-dark mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending Topics - Large Card */}
        <Card className="bento-card md:col-span-2 lg:col-span-3 bg-gradient-soft border-brand-subtle/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="h-6 w-6 mr-3 text-brand-primary" />
              Trending Topics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {topicSuggestions.map((topic, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/80 hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer border border-brand-subtle/10"
                  onClick={() => onSectionChange("discussions")}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{topic.icon}</span>
                    <span className="font-medium text-brand-dark">{topic.name}</span>
                  </div>
                  <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary border-brand-primary/20">
                    {topic.count}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-full mt-6 py-3 rounded-xl border-brand-primary/30 hover:bg-brand-primary hover:text-white transition-colors"
              onClick={() => onSectionChange("discussions")}
            >
              Explore All Topics
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions - Sidebar Card */}
        <Card className="bento-card md:col-span-1 lg:col-span-1 bg-white border-brand-subtle/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Star className="h-5 w-5 mr-2 text-brand-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
              variant="outline"
              onClick={() => onSectionChange("discussions")}
            >
              <MessageSquare className="h-4 w-4 mr-3" />
              Start Discussion
            </Button>
            <Button
              className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
              variant="outline"
              onClick={() => onSectionChange("events")}
            >
              <Calendar className="h-4 w-4 mr-3" />
              Browse Events
            </Button>
            <Button
              className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
              variant="outline"
              onClick={() => onSectionChange("retreats")}
            >
              <Users className="h-4 w-4 mr-3" />
              Join Retreat
            </Button>
            <Button
              className="w-full justify-start py-3 px-4 rounded-xl bg-brand-subtle/10 hover:bg-brand-primary hover:text-white transition-colors text-brand-dark border-0"
              variant="outline"
              onClick={() => onSectionChange("resources")}
            >
              <BookOpen className="h-4 w-4 mr-3" />
              Explore Resources
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity - Full Width Card */}
        <Card className="bento-card col-span-full bg-white border-brand-subtle/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-xl">
              <Clock className="h-5 w-5 mr-2 text-brand-primary" />
              Recent Community Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {posts.slice(0, 3).map((post, index) => (
                <div key={index} className="p-4 rounded-xl hover:bg-brand-subtle/5 transition-colors cursor-pointer border border-brand-subtle/10">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-brand-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-brand-dark mb-1 line-clamp-2">{post.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        by {post.user_profiles?.username || 'Anonymous'} • {new Date(post.created_at).toLocaleDateString()}
                      </p>
                      <Badge variant="outline" className="text-xs bg-brand-subtle/10 border-brand-subtle/30">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full py-3 rounded-xl hover:bg-brand-subtle/10 transition-colors"
              onClick={() => onSectionChange("discussions")}
            >
              View All Activity
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CommunityDashboard;
