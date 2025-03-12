import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import ScrollButton from "@/components/ScrollButton";
import { Heart, Compass, Target, Globe, Leaf, Users, Clock, Flower2, Cloud, Droplets, Wind, Brain, HandHeart } from "lucide-react";

const About = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
        staggerChildren: 0.1
      }
    }
  };

  const heroCards = [{
    title: "Our Mission",
    description: "Making mindfulness accessible to everyone",
    image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3",
    className: "md:col-span-2 row-span-2"
  }, {
    title: "Community First",
    description: "Join our growing wellness community",
    image: "",
    isSolid: true,
    className: "bg-sage-100"
  }, {
    title: "Expert Guidance",
    description: "Learn from experienced practitioners",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3",
    className: ""
  }];

  const missionCards = [{
    icon: <Users className="h-12 w-12 text-sage-600 mb-4" />,
    title: "Connect",
    description: "We bring together mindfulness seekers, skilled instructors, and welcoming hosts to create a vibrant community.",
    className: "bg-sage-50 md:col-span-1"
  }, {
    icon: <Leaf className="h-12 w-12 text-sand-600 mb-4" />,
    title: "Transform",
    description: "Our experiences help people disconnect from daily stresses and reconnect with themselves and others.",
    className: "bg-sand-50 md:col-span-1"
  }, {
    icon: <Globe className="h-12 w-12 text-sage-600 mb-4" />,
    title: "Cultivate",
    description: "We nurture a growing ecosystem of mindfulness that's accessible and welcoming to everyone.",
    className: "bg-sage-50 md:col-span-1"
  }];

  const valueCards = [{
    icon: <Heart className="h-10 w-10 text-rose-500" />,
    title: "Compassion",
    description: "We approach our work with empathy, kindness, and genuine care for the wellbeing of our community.",
    className: "bg-white border border-sand-100 md:col-span-1"
  }, {
    icon: <Compass className="h-10 w-10 text-emerald-500" />,
    title: "Authenticity",
    description: "We believe in creating spaces where people can show up as their true selves and experience genuine connection.",
    className: "bg-white border border-sand-100 md:col-span-1"
  }, {
    icon: <Target className="h-10 w-10 text-amber-500" />,
    title: "Intentionality",
    description: "Every retreat, space, and interaction is crafted with purpose and mindfulness to create meaningful experiences.",
    className: "bg-white border border-sand-100 md:col-span-1"
  }, {
    icon: <Globe className="h-10 w-10 text-blue-500" />,
    title: "Community",
    description: "We cultivate relationships that foster belonging, support, and growth for all members of our ecosystem.",
    className: "bg-white border border-sand-100 md:col-span-1"
  }, {
    icon: <Leaf className="h-10 w-10 text-green-500" />,
    title: "Sustainability",
    description: "We make choices that honor and protect the natural environment and promote long-term wellbeing.",
    className: "bg-white border border-sand-100 md:col-span-1"
  }];

  const retreatTypeCards = [{
    id: 1,
    icon: <Wind className="h-6 w-6 text-white" />,
    title: "Breathwork Day Long Retreats",
    description: "Experience transformative breathing techniques to release tension, boost energy, and find inner calm.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    className: "md:col-span-2 row-span-2"
  }, {
    id: 2,
    icon: <Cloud className="h-6 w-6 text-white" />,
    title: "Silent Day Long Retreats",
    description: "Discover the power of silence in a supportive environment to deepen mindfulness and self-awareness.",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3264&q=80"
  }, {
    id: 3,
    icon: <HandHeart className="h-6 w-6 text-white" />,
    title: "Therapy + Somatic Day Long Retreats",
    description: "Integrate body-based healing approaches with therapeutic practices for holistic emotional wellbeing.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=4608&q=80"
  }];

  const teamMembers = [{
    name: "Maya Johnson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    bio: "With over 15 years in wellness practice and a background in mindfulness education, Maya founded Sanghos to make transformative experiences more accessible.",
    className: "md:col-span-2"
  }, {
    name: "Raj Patel",
    role: "Head of Retreat Curation",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    bio: "Raj brings his expertise in retreat design and facilitation to curate experiences that balance introspection, connection, and transformation.",
    className: "md:col-span-1"
  }, {
    name: "Zoe Chen",
    role: "Community Director",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    bio: "As our Community Director, Zoe fosters meaningful connections between hosts, instructors, and participants to create a thriving ecosystem of wellness.",
    className: "md:col-span-1"
  }, {
    name: "David Torres",
    role: "Technology Lead",
    image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
    bio: "David ensures our platform connects people seamlessly, with a focus on creating intuitive and accessible digital experiences for our community.",
    className: "md:col-span-1"
  }, {
    name: "Amara Wilson",
    role: "Host Relations",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
    bio: "Amara works closely with our host community, helping them create welcoming and transformative spaces for our retreat participants.",
    className: "md:col-span-1"
  }, {
    name: "Leo Kim",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80",
    bio: "Leo crafts our brand story and connects Sanghos with mindfulness seekers who are looking for authentic experiences and community.",
    className: "md:col-span-1"
  }];

  const timelineMilestones = [{
    year: "2019",
    title: "The Beginning",
    description: "Sanghos started as a small community of mindfulness practitioners in San Francisco hosting informal gatherings."
  }, {
    year: "2020",
    title: "Digital Pivot",
    description: "During the pandemic, we created virtual retreat experiences, connecting people across distances when they needed it most."
  }, {
    year: "2021",
    title: "Official Launch",
    description: "Sanghos platform launched officially, connecting retreat hosts with spaces and participants for in-person experiences."
  }, {
    year: "2022",
    title: "Expansion",
    description: "Expanded to 5 major cities with over 100 hosts and 50 instructors joining our growing community."
  }, {
    year: "2023",
    title: "Community Growth",
    description: "Reached 10,000 retreat participants and launched our host certification program for quality experiences."
  }];

  return (
    <>
      <Helmet>
        <title>About Sanghos | Our Mission & Values</title>
        <meta name="description" content="Learn about Sanghos, our mission to make mindfulness accessible, our values, and the team behind our community-focused retreat platform." />
      </Helmet>
      
      <Header />
      
      <main className="bg-white">
        <section id="hero" className="min-h-[100vh] py-16 md:py-24 px-4 relative overflow-hidden flex items-center">
          <div className="container mx-auto relative z-10">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={staggerChildren}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                variants={fadeIn}
              >
                Making Mindfulness <span className="text-sage-600">Accessible</span> to All
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl text-gray-700 mb-8"
                variants={fadeIn}
              >
                We're creating a world where transformative retreat experiences are within everyone's reach.
              </motion.p>
              <motion.div variants={fadeIn}>
                <Button 
                  size="lg" 
                  className="bg-sage-600 hover:bg-sage-700 text-white"
                  asChild
                >
                  <a href="/join-now">Join Our Community</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-sage-50/80 to-transparent z-0"></div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
            <ScrollButton targetId="mission" label="Discover Our Story" />
          </div>
        </section>

        <section id="mission" className="py-16 md:py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-xl text-gray-700">We're building the infrastructure to make mindfulness practices more accessible, connecting people seeking transformative experiences with expert facilitators and welcoming spaces.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {missionCards.map((card, index) => (
                <Card key={index} className={cn("p-8 h-full", card.className)}>
                  {card.icon}
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{card.title}</h3>
                  <p className="text-gray-700">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24 px-4 bg-sand-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
              <p className="text-xl text-gray-700">These principles guide everything we do at Sanghos, from how we build our platform to how we interact with our community.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {valueCards.map((card, index) => (
                <Card key={index} className={cn("p-6 h-full flex flex-col", card.className)}>
                  <div className="bg-gray-50 p-3 rounded-full w-fit mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-700 mt-auto">{card.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Retreats</h2>
              <p className="text-xl text-gray-700">Discover the different types of transformative experiences we offer through our platform.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {retreatTypeCards.map((card) => (
                <Card key={card.id} className="overflow-hidden h-full group">
                  <div className="relative h-48 overflow-hidden">
                    <OptimizedImage
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-sage-600/90 p-2 rounded-full">
                          {card.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700">{card.description}</p>
                    <Button variant="link" className="text-sage-600 hover:text-sage-700 p-0 mt-4" asChild>
                      <a href="/retreats">View Retreats</a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-sand-50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
              <p className="text-xl text-gray-700">Meet the passionate people dedicated to making Sanghos a reality.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className={cn("overflow-hidden h-full", member.className)}>
                  <div className="relative h-64 overflow-hidden">
                    <OptimizedImage
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sage-600 mb-4">{member.role}</p>
                    <p className="text-gray-700">{member.bio}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
              <p className="text-xl text-gray-700">The story of Sanghos and how we've grown over the years.</p>
            </div>
            
            <div className="max-w-4xl mx-auto relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-sage-200"></div>
              
              {timelineMilestones.map((milestone, index) => (
                <div key={index} className="relative z-10 mb-12 last:mb-0">
                  <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="w-full md:w-1/2">
                      <Card className={`p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                        <div className="bg-sage-100 text-sage-800 text-sm font-medium py-1 px-3 rounded-full inline-block mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                        <p className="text-gray-700">{milestone.description}</p>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/4 flex flex-col items-center">
                      <div className="h-6 w-6 rounded-full bg-sage-500 border-4 border-white"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 bg-gradient-to-r from-sage-500 to-sage-700 text-white">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Growing Community</h2>
              <p className="text-xl mb-8">Whether you're seeking mindfulness experiences, hosting spaces, or sharing your expertise, there's a place for you at Sanghos.</p>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-sage-700"
                asChild
              >
                <a href="/join-now">Get Started Today</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default About;
