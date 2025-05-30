
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, MessageSquare, Calendar, Users, BookOpen, Star, Clock } from "lucide-react";
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="text-center py-6"
      >
        <h1 className="text-3xl font-bold text-brand-dark mb-2">
          Welcome to Your Wellness Community
        </h1>
        <p className="text-brand-dark/70 max-w-2xl mx-auto">
          Discover personalized content, connect with like-minded individuals, and explore trending wellness topics.
        </p>
      </motion.div>

      {/* Enhanced Search */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={1}
        className="max-w-2xl mx-auto"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search discussions, events, resources, and members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-3 text-lg rounded-full border-2 border-brand-subtle/30 focus:border-brand-primary transition-colors"
          />
          {searchQuery && (
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
            >
              Search
            </Button>
          )}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={2}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, index) => (
          <Card key={index} className="text-center hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-brand-primary" />
              <div className="text-2xl font-bold text-brand-dark">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trending Topics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={3}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-brand-primary" />
                Trending Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topicSuggestions.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-brand-subtle/10 hover:bg-brand-subtle/20 transition-colors cursor-pointer"
                    onClick={() => onSectionChange("discussions")}
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{topic.icon}</span>
                      <span className="font-medium">{topic.name}</span>
                    </div>
                    <Badge variant="secondary">{topic.count}</Badge>
                  </div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => onSectionChange("discussions")}
              >
                Explore All Topics
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={4}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-brand-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("discussions")}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start a Discussion
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("events")}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Browse Events
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("retreats")}
              >
                <Users className="h-4 w-4 mr-2" />
                Join Retreat Community
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => onSectionChange("resources")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Explore Resources
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        custom={5}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-brand-primary" />
              Recent Community Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {posts.slice(0, 3).map((post, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-brand-subtle/10 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-brand-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{post.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      by {post.user_profiles?.username || 'Anonymous'} • {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => onSectionChange("discussions")}
            >
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CommunityDashboard;
