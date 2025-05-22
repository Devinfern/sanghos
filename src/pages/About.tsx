import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  const staggerChildren = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Values data
  const values = [{
    icon: "❤️",
    title: "Compassion",
    description: "We approach our work with empathy, kindness, and genuine care for everyone's wellbeing."
  }, {
    icon: "🧭",
    title: "Authenticity",
    description: "We create spaces where people can show up as their true selves and experience genuine connection."
  }, {
    icon: "🎯",
    title: "Intentionality",
    description: "Every retreat, space and interaction is crafted with purpose and mindfulness."
  }];

  // Retreat types
  const retreatTypes = [{
    id: 1,
    title: "Breathwork",
    description: "Experience transformative breathing techniques to release tension, boost energy, and find inner calm.",
    image: "/lovable-uploads/d3e397b5-0ff3-412e-b6ce-537617953355.png"
  }, {
    id: 2,
    title: "Silent Meditation",
    description: "Discover the power of silence in a supportive environment to deepen mindfulness and self-awareness.",
    image: "/lovable-uploads/dc289f39-f518-4603-88f5-b92a074c6949.png"
  }, {
    id: 3,
    title: "Somatic Healing",
    description: "Integrate body-based healing approaches with therapeutic practices for holistic emotional wellbeing.",
    image: "/lovable-uploads/c664e811-a15f-43cf-b260-d4f59fdb6e80.png"
  }];
  return <>
      <Helmet>
        <title>About Us | Sanghos</title>
        <meta name="description" content="Learn about Sanghos - our story, mission, values, and the team behind our mindfulness and wellness retreats." />
      </Helmet>

      <Header />

      <main className="bg-white overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-brand-subtle/10 relative">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="max-w-3xl">
                <h1 className="text-6xl md:text-7xl font-bold mb-8 text-brand-dark leading-tight">Helping You Discover Local Wellness Retreats &amp; Experiences</h1>
                
                <ul className="space-y-4 mb-8 text-lg">
                  <li className="flex items-start">
                    <span className="mr-2 text-brand-primary">•</span>
                    <span>Curated retreats &amp; more</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-brand-primary">•</span>
                    <span>Services screened by experienced instructors</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-brand-primary">•</span>
                    <span>Filter by retreat type, price, location, and more</span>
                  </li>
                </ul>
                
                <Button size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white text-lg px-8 py-6 rounded-full">
                  Explore Our Retreats
                </Button>
              </motion.div>
              
              <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="relative rounded-3xl overflow-hidden">
                <OptimizedImage src="/lovable-uploads/60c5a966-4e10-4c09-af70-bfafe90c0630.png" alt="Peaceful retreat space" className="w-full h-full object-cover" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Purpose Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
              <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Our Purpose</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-12 text-brand-dark max-w-5xl mx-auto leading-tight">We're Bridging The Gap Between Wellness Retreat Access </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={isLoaded ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              delay: 0.2,
              duration: 0.6
            }} className="text-center">
                <div className="mx-auto mb-6 bg-brand-subtle/30 w-40 h-40 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🧠</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-dark">Building Community</h3>
                <p className="text-lg text-brand-slate">
                  We're tackling isolation through community-building experiences where we partner with diverse practitioners to shift perspectives about wellness.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={isLoaded ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              delay: 0.3,
              duration: 0.6
            }} className="text-center">
                <div className="mx-auto mb-6 bg-brand-peach/20 w-40 h-40 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-dark">Expanding Access</h3>
                <p className="text-lg text-brand-slate">
                  We've built a seamless platform for accessing transformative retreat experiences. Because finding wellness should be as easy as booking a flight.
                </p>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={isLoaded ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              delay: 0.4,
              duration: 0.6
            }} className="text-center">
                <div className="mx-auto mb-6 bg-brand-sky/20 w-40 h-40 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🔄</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-brand-dark">Transforming Lives</h3>
                <p className="text-lg text-brand-slate">
                  We're creating opportunities for profound personal growth through curated experiences that nurture both individual wellbeing and community connection.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-brand-subtle/10">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
              <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Our Values</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">
                Core Principles
              </h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                These core principles guide everything we do at Sanghos
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 20
            }} animate={isLoaded ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              delay: 0.2 + index * 0.1,
              duration: 0.6
            }} className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-6">{value.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-brand-dark">{value.title}</h3>
                  <p className="text-brand-slate text-lg">{value.description}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Retreat Types Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
              <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Explore</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">
                Retreat Experiences
              </h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                Discover transformative experiences tailored to your wellness journey
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {retreatTypes.map((type, index) => {
              const MotionCard = motion(Card);
              return <MotionCard key={type.id} initial={{
                opacity: 0,
                y: 20
              }} animate={isLoaded ? {
                opacity: 1,
                y: 0
              } : {
                opacity: 0,
                y: 20
              }} transition={{
                delay: 0.2 + index * 0.1,
                duration: 0.6
              }} className="overflow-hidden bg-white border-0 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="relative h-64 overflow-hidden">
                      <OptimizedImage src={type.image} alt={type.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                    </div>
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold mb-2 text-brand-dark">{type.title}</h3>
                      <p className="text-brand-slate text-lg mb-6">{type.description}</p>
                      <Button variant="outline" className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-medium rounded-full">
                        Learn More
                      </Button>
                    </CardContent>
                  </MotionCard>;
            })}
            </div>
          </div>
        </section>

        {/* Get Involved CTA Section */}
        <section className="py-24 bg-brand-primary/5">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="text-center mb-16">
              <span className="text-sm uppercase tracking-wider text-brand-primary font-semibold">Get Involved</span>
              <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-8 text-brand-dark">
                Let's Change Wellness, For Good
              </h2>
              <p className="text-xl text-brand-slate max-w-3xl mx-auto">
                Join our community and be part of the movement
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={isLoaded ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              delay: 0.2,
              duration: 0.6
            }} className="bg-brand-subtle/20 rounded-3xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-brand-dark">Partnerships</h3>
                  <p className="text-brand-slate mb-6">
                    Want to help shape the future of wellness? Partner with us to create meaningful experiences.
                  </p>
                  <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-medium group rounded-full">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={isLoaded ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              delay: 0.3,
              duration: 0.6
            }} className="bg-brand-primary/10 rounded-3xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-brand-dark">Become a Host</h3>
                  <p className="text-brand-slate mb-6">
                    Share your space and join our community of hosts offering transformative retreat venues.
                  </p>
                  <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-medium group rounded-full">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={isLoaded ? {
              opacity: 1,
              y: 0
            } : {
              opacity: 0,
              y: 20
            }} transition={{
              delay: 0.4,
              duration: 0.6
            }} className="bg-brand-peach/10 rounded-3xl overflow-hidden">
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-brand-dark">Teach With Us</h3>
                  <p className="text-brand-slate mb-6">
                    Are you a wellness practitioner? Join our instructor community and share your expertise.
                  </p>
                  <Button variant="outline" className="border-brand-primary text-brand-primary hover:bg-brand-primary/5 font-medium group rounded-full">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-24 bg-brand-dark relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute w-full h-full overflow-hidden z-0">
            <div className="absolute -right-20 top-20 w-72 h-72 bg-brand-primary/30 rounded-full blur-xl"></div>
            <div className="absolute -left-20 bottom-20 w-80 h-80 bg-brand-peach/20 rounded-full blur-xl"></div>
          </div>
          
          <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
            <motion.div initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={fadeIn} className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Join Our Community</h2>
              <p className="text-xl mb-10 text-white/80">
                Whether you're seeking mindful experiences, looking to share your expertise as an instructor, or have a unique space to host retreats, we'd love to welcome you to the Sanghos community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-brand-dark hover:bg-white/90 group rounded-full" asChild>
                  <a href="/signup">
                    Join as a Member
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 group rounded-full" asChild>
                  <a href="/host/register">
                    Become a Host
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>;
};
export default About;
