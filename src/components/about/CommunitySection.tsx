
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Trophy, MessageCircle, Heart, ArrowRight } from "lucide-react";

interface CommunitySectionProps {
  isLoaded: boolean;
}

const CommunitySection = ({ isLoaded }: CommunitySectionProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Community</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">
            Join Our Wellness Community
          </h2>
          <p className="text-xl text-brand-slate max-w-3xl mx-auto">
            Connect with like-minded individuals, share experiences, and grow together on your wellness journey
          </p>
        </motion.div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Community Stats Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-brand-primary/10 to-brand-peach/10 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group hover:scale-105"
          >
            <div className="flex items-center justify-between mb-6">
              <Users className="h-12 w-12 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
              <span className="text-3xl font-bold text-brand-dark">2.5K+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-brand-dark">Active Members</h3>
            <p className="text-brand-slate">Join thousands of wellness enthusiasts sharing their journey</p>
          </motion.div>

          {/* Events Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-brand-peach/10 to-brand-sky/10 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group hover:scale-105"
          >
            <div className="flex items-center justify-between mb-6">
              <Calendar className="h-12 w-12 text-brand-peach group-hover:scale-110 transition-transform duration-300" />
              <span className="text-3xl font-bold text-brand-dark">150+</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-brand-dark">Monthly Events</h3>
            <p className="text-brand-slate">Participate in workshops, meetups, and virtual sessions</p>
          </motion.div>

          {/* Success Stories Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-brand-sky/10 to-brand-primary/10 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group hover:scale-105"
          >
            <div className="flex items-center justify-between mb-6">
              <Trophy className="h-12 w-12 text-brand-sky group-hover:scale-110 transition-transform duration-300" />
              <span className="text-3xl font-bold text-brand-dark">98%</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-brand-dark">Success Rate</h3>
            <p className="text-brand-slate">Members report improved well-being within 30 days</p>
          </motion.div>

          {/* Discussion Forum Card - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="md:col-span-2 bg-gradient-to-r from-brand-primary/5 to-brand-peach/5 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group"
          >
            <div className="flex items-start gap-6">
              <MessageCircle className="h-16 w-16 text-brand-primary group-hover:scale-110 transition-transform duration-300 mt-2" />
              <div className="flex-1">
                <h3 className="text-2xl font-semibold mb-3 text-brand-dark">Community Discussions</h3>
                <p className="text-brand-slate text-lg mb-4">
                  Share insights, ask questions, and connect with fellow practitioners in our supportive forum
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-medium">
                    Daily Check-ins
                  </span>
                  <span className="px-3 py-1 bg-brand-peach/10 text-brand-peach rounded-full text-sm font-medium">
                    Expert Q&A
                  </span>
                  <span className="px-3 py-1 bg-brand-sky/10 text-brand-sky rounded-full text-sm font-medium">
                    Success Stories
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mentorship Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-brand-peach/10 to-brand-primary/10 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group hover:scale-105"
          >
            <div className="text-center">
              <Heart className="h-12 w-12 text-brand-peach mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-semibold mb-2 text-brand-dark">1:1 Mentorship</h3>
              <p className="text-brand-slate mb-4">Get personalized guidance from certified wellness coaches</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-brand-peach text-brand-peach hover:bg-brand-peach/5 rounded-full"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button 
            size="lg" 
            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-10 py-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            asChild
          >
            <a href="/signup">
              Join Our Community
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 px-10 py-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            asChild
          >
            <a href="/community">
              Explore Community
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
