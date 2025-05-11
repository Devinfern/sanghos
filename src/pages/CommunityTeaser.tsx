
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const CommunityTeaser = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-16 flex-1 bg-gradient-to-b from-white to-brand-light/20">
        <motion.section 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-brand-dark"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Join Our Wellness Community
          </motion.h1>
          <motion.p 
            className="text-xl mb-8 text-brand-dark/80"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Connect with like-minded individuals on their wellness journey, share experiences,
            and learn from our community of practitioners and retreat participants.
          </motion.p>
          
          <motion.div 
            className="glass-morphism p-8 rounded-xl mb-12 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-brand-dark">Member Benefits</h2>
            
            <motion.ul 
              className="space-y-5 text-left max-w-md mx-auto mb-8"
              variants={container}
              initial="hidden"
              animate="visible"
            >
              {[
                "Access to exclusive community discussions",
                "Connect with retreat participants before and after events",
                "Share your wellness journey with supportive members",
                "Early access to new retreats and special discounts"
              ].map((benefit, index) => (
                <motion.li key={index} className="flex items-start" variants={item}>
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-brand-primary text-white mr-3 flex-shrink-0 text-sm">✓</span>
                  <span className="text-lg">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-6 text-lg">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 px-8 py-6 text-lg">
                <Link to="/signup">Join Sanghos</Link>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground">
              Already a member? <Link to="/login" className="text-brand-primary hover:underline font-medium">Sign in here</Link>
            </p>
            
            <div className="mt-16 p-8 rounded-xl bg-white/50 border border-brand-sand/20">
              <h3 className="text-xl font-semibold mb-4 text-brand-dark">What Our Community Members Say</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    quote: "Joining the Sanghos community changed my wellness journey. I've connected with amazing people who share my passion for mindfulness.",
                    name: "Sarah K.",
                    role: "Yoga Enthusiast"
                  },
                  {
                    quote: "The discussions and support in this community have been invaluable. I've discovered retreats I never would have found otherwise.",
                    name: "Michael T.",
                    role: "Meditation Practitioner" 
                  }
                ].map((testimonial, i) => (
                  <div key={i} className="glass-morphism p-5 rounded-lg">
                    <p className="italic mb-4">"{testimonial.quote}"</p>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
};

export default CommunityTeaser;
