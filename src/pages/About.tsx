
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Users, Leaf, Globe, Heart, Target, Compass, Yoga, Flower, Cloud, Droplets, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const values = [
    {
      id: 1,
      icon: <Yoga className="h-6 w-6 text-white" />,
      title: "Yoga Retreats",
      description: "Find your center with immersive yoga experiences led by skilled practitioners.",
      image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      icon: <Flower className="h-6 w-6 text-white" />,
      title: "Psychedelic Retreats",
      description: "Explore consciousness and healing through guided psychedelic experiences.",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80"
    },
    {
      id: 3,
      icon: <Cloud className="h-6 w-6 text-white" />,
      title: "Meditation Retreats",
      description: "Cultivate mindfulness and inner peace through guided meditation practices.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4608&q=80"
    },
    {
      id: 4,
      icon: <Droplets className="h-6 w-6 text-white" />,
      title: "Ayahuasca Retreats",
      description: "Experience traditional plant medicine ceremonies in supportive settings.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5472&q=80"
    },
    {
      id: 5,
      icon: <Plus className="h-6 w-6 text-white" />,
      title: "Health & Wellness",
      description: "Revitalize your body and mind with holistic health and wellness programs.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=5909&q=80"
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
    },
    {
      name: "David Torres",
      role: "Technology Lead",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      bio: "David ensures our platform connects people seamlessly, with a focus on creating intuitive and accessible digital experiences for our community."
    },
    {
      name: "Amara Wilson",
      role: "Host Relations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      bio: "Amara works closely with our host community, helping them create welcoming and transformative spaces for our retreat participants."
    },
    {
      name: "Leo Kim",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80",
      bio: "Leo crafts our brand story and connects Sanghos with mindfulness seekers who are looking for authentic experiences and community."
    }
  ];

  const milestones = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Sanghos started as a small community of mindfulness practitioners in San Francisco hosting informal gatherings."
    },
    {
      year: "2020",
      title: "Digital Pivot",
      description: "During the pandemic, we created virtual retreat experiences, connecting people across distances when they needed it most."
    },
    {
      year: "2021",
      title: "Official Launch",
      description: "Sanghos platform launched officially, connecting retreat hosts with spaces and participants for in-person experiences."
    },
    {
      year: "2022",
      title: "Expansion",
      description: "Expanded to 5 major cities with over 100 hosts and 50 instructors joining our growing community."
    },
    {
      year: "2023",
      title: "Community Growth",
      description: "Reached 10,000 retreat participants and launched our host certification program for quality experiences."
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
        <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-sand-50 to-white">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">We're making mindfulness experiences more accessible</h1>
                <p className="text-xl text-muted-foreground">
                  Sanghos connects mindful seekers with transformative retreat experiences in unique spaces near you.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage-100 rounded-full z-0"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-sand-100 rounded-full z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="People at a mindfulness retreat" 
                  className="rounded-2xl w-full h-auto relative z-10 shadow-lg"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground">
                At Sanghos, we believe that meaningful connection and personal growth shouldn't require lengthy retreats or distant travel. We're dedicated to making transformative experiences accessible through curated daylong retreats in unique private spaces near you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-sage-50 p-8 rounded-xl"
              >
                <Users className="h-12 w-12 text-sage-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Connect</h3>
                <p className="text-muted-foreground">
                  We bring together mindfulness seekers, skilled instructors, and welcoming hosts to create a vibrant community.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-sand-50 p-8 rounded-xl"
              >
                <Leaf className="h-12 w-12 text-sand-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Transform</h3>
                <p className="text-muted-foreground">
                  Our experiences help people disconnect from daily stresses and reconnect with themselves and others.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-sage-50 p-8 rounded-xl"
              >
                <Globe className="h-12 w-12 text-sage-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">Cultivate</h3>
                <p className="text-muted-foreground">
                  We nurture a growing ecosystem of mindfulness that's accessible and welcoming to everyone.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Retreat Types Section (Formerly Values Section) */}
        <section className="py-20 bg-gradient-to-b from-white to-sand-50">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Explore by Retreat Type</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover transformative experiences tailored to your wellness journey
              </p>
            </motion.div>

            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
            >
              {values.map((value) => (
                <motion.div
                  key={value.id}
                  variants={fadeIn}
                  className="rounded-xl overflow-hidden shadow-md relative group h-[320px] md:h-[400px]"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
                  <img 
                    src={value.image} 
                    alt={value.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center gap-2 bg-black/70 text-white px-4 py-3 rounded-lg">
                      <span>{value.icon}</span>
                      <h3 className="text-lg font-medium">{value.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                These core principles guide everything we do at Sanghos
              </p>
            </motion.div>

            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
            >
              <motion.div
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm border border-sand-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4"><Heart className="h-10 w-10 text-rose-500" /></div>
                <h3 className="text-xl font-semibold mb-2">Compassion</h3>
                <p className="text-muted-foreground text-sm">We approach our work with empathy, kindness, and genuine care for the wellbeing of our community.</p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm border border-sand-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4"><Compass className="h-10 w-10 text-emerald-500" /></div>
                <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                <p className="text-muted-foreground text-sm">We believe in creating spaces where people can show up as their true selves and experience genuine connection.</p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm border border-sand-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4"><Target className="h-10 w-10 text-amber-500" /></div>
                <h3 className="text-xl font-semibold mb-2">Intentionality</h3>
                <p className="text-muted-foreground text-sm">Every retreat, space, and interaction is crafted with purpose and mindfulness to create meaningful experiences.</p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm border border-sand-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4"><Globe className="h-10 w-10 text-blue-500" /></div>
                <h3 className="text-xl font-semibold mb-2">Community</h3>
                <p className="text-muted-foreground text-sm">We cultivate relationships that foster belonging, support, and growth for all members of our ecosystem.</p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="bg-white p-6 rounded-xl shadow-sm border border-sand-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-4"><Leaf className="h-10 w-10 text-green-500" /></div>
                <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                <p className="text-muted-foreground text-sm">We make choices that honor and protect the natural environment and promote long-term wellbeing.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-sand-50">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Journey</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                From a small community gathering to a thriving platform
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-sand-200"></div>
              
              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                    className={`flex flex-col md:flex-row gap-8 relative ${
                      index % 2 === 0 ? "md:flex-row-reverse text-left md:text-right" : ""
                    }`}
                  >
                    <div className="md:w-1/2"></div>
                    <div className="z-10 absolute left-0 md:left-1/2 transform -translate-y-1/3 md:-translate-x-1/2 w-10 h-10 rounded-full bg-sage-500 border-4 border-white flex items-center justify-center">
                      <span className="text-white font-bold text-xs">{milestone.year}</span>
                    </div>
                    <div className="md:w-1/2 bg-white p-6 rounded-xl shadow-sm border border-sand-100">
                      <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                The passionate people behind Sanghos who are dedicated to creating meaningful experiences
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={fadeIn}
                  className="rounded-xl overflow-hidden bg-white shadow-sm border border-sand-100 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-sand-100">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sage-600 mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Join Us CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-sage-100 to-sand-100 z-0"></div>
          <div className="absolute -right-20 top-20 w-72 h-72 bg-sage-200 rounded-full opacity-30 z-0"></div>
          <div className="absolute -left-20 bottom-20 w-80 h-80 bg-sand-200 rounded-full opacity-30 z-0"></div>
          
          <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-6">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Community</h2>
              <p className="text-xl text-muted-foreground mb-10">
                Whether you're seeking mindful experiences, looking to share your expertise as an instructor, or have a unique space to host retreats, we'd love to welcome you to the Sanghos community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/signup">Join as a Member</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/host/register">Become a Host</a>
                </Button>
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
