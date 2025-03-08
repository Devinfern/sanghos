
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Users, Briefcase, Target, MessageSquare, Compass, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const values = [
    {
      id: 1,
      icon: <Heart className="h-10 w-10 text-rose-500" />,
      title: "Compassion",
      description: "We approach our work with empathy, kindness, and genuine care for the wellbeing of our community."
    },
    {
      id: 2,
      icon: <Compass className="h-10 w-10 text-emerald-500" />,
      title: "Authenticity",
      description: "We believe in creating spaces where people can show up as their true selves and experience genuine connection."
    },
    {
      id: 3,
      icon: <Target className="h-10 w-10 text-amber-500" />,
      title: "Intentionality",
      description: "Every retreat, space, and interaction is crafted with purpose and mindfulness to create meaningful experiences."
    }
  ];

  const team = [
    {
      name: "Maya Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      bio: "With over 15 years in wellness practice and a background in mindfulness education, Maya founded Sanghos to make transformative experiences more accessible."
    },
    {
      name: "Raj Patel",
      role: "Head of Retreat Curation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      bio: "Raj brings his expertise in retreat design and facilitation to curate experiences that balance introspection, connection, and transformation."
    },
    {
      name: "Zoe Chen",
      role: "Community Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      bio: "As our Community Director, Zoe fosters meaningful connections between hosts, instructors, and participants to create a thriving ecosystem of wellness."
    }
  ];

  return (
    <>
      <Helmet>
        <title>About Us | Sanghos</title>
        <meta
          name="description"
          content="Learn about Sanghos - our story, mission, values, and the team behind our mindfulness and wellness retreats."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative bg-[url('https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80')] bg-cover bg-center py-24">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="container relative z-10 px-4 md:px-6 text-white">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
              <p className="text-xl md:text-2xl opacity-90">
                Connecting mindful seekers with transformative experiences in unique spaces
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-sand-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                At Sanghos, we believe that meaningful connection and personal growth shouldn't require lengthy retreats or distant travel. We're dedicated to making transformative experiences accessible through curated daylong retreats in unique private spaces near you.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground">
                We connect mindfulness seekers with skilled instructors and welcoming hosts to create spaces where people can disconnect from daily stresses, reconnect with themselves, and forge authentic connections with others.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at Sanghos
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.id}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.1 * index }
                    }
                  }}
                  className="bg-white p-8 rounded-lg shadow-sm border border-sand-100"
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-sage-50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind Sanghos who are dedicated to creating meaningful experiences
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial="hidden"
                  animate={isLoaded ? "visible" : "hidden"}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.1 * index }
                    }
                  }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-sand-100"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sage-600 mb-4">{member.role}</p>
                    <p className="text-muted-foreground">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Journey</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Sanghos was born from a simple observation: in our increasingly digital world, we're more connected than ever, yet many of us feel deeply disconnected from ourselves and others.
                  </p>
                  <p>
                    Founded in 2021, we started with a vision to make meaningful wellness experiences more accessible to everyone. We believed that you shouldn't have to travel far or commit to a week-long retreat to experience the benefits of mindfulness and community.
                  </p>
                  <p>
                    What began as a small community in San Francisco has grown into a network of hundreds of hosts, instructors, and thousands of participants across multiple cities, all united by the desire to create space for authentic connection and personal growth.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                animate={isLoaded ? "visible" : "hidden"}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
                }}
                className="rounded-2xl overflow-hidden shadow-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Sanghos retreat gathering"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Join Us CTA Section */}
        <section className="py-16 bg-gradient-to-r from-sage-100 to-sand-100">
          <div className="container px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Community</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're seeking mindful experiences, looking to share your expertise as an instructor, or have a unique space to host retreats, we'd love to welcome you to the Sanghos community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/signup" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
                  Join as a Member
                </a>
                <a href="/host/register" className="bg-white text-primary border border-primary px-6 py-3 rounded-md hover:bg-sand-50 transition-colors">
                  Become a Host
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default About;
