import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import { Heart, Compass, Target, Globe, Leaf, Users, Clock, Flower2, Cloud, Droplets, Plus } from "lucide-react";

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

  // Hero section cards
  const heroCards = [
    {
      title: "Our Mission",
      description: "Making mindfulness accessible to everyone",
      image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3",
      className: "md:col-span-2 row-span-2"
    },
    {
      title: "Community First",
      description: "Join our growing wellness community",
      image: "",
      isSolid: true,
      className: "bg-sage-100"
    },
    {
      title: "Expert Guidance",
      description: "Learn from experienced practitioners",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?ixlib=rb-4.0.3",
      className: ""
    }
  ];

  // Mission section cards
  const missionCards = [
    {
      icon: <Users className="h-12 w-12 text-sage-600 mb-4" />,
      title: "Connect",
      description: "We bring together mindfulness seekers, skilled instructors, and welcoming hosts to create a vibrant community.",
      className: "bg-sage-50 md:col-span-1"
    },
    {
      icon: <Leaf className="h-12 w-12 text-sand-600 mb-4" />,
      title: "Transform",
      description: "Our experiences help people disconnect from daily stresses and reconnect with themselves and others.",
      className: "bg-sand-50 md:col-span-1"
    },
    {
      icon: <Globe className="h-12 w-12 text-sage-600 mb-4" />,
      title: "Cultivate",
      description: "We nurture a growing ecosystem of mindfulness that's accessible and welcoming to everyone.",
      className: "bg-sage-50 md:col-span-1"
    }
  ];

  // Values section cards
  const valueCards = [
    {
      icon: <Heart className="h-10 w-10 text-rose-500" />,
      title: "Compassion",
      description: "We approach our work with empathy, kindness, and genuine care for the wellbeing of our community.",
      className: "bg-white border border-sand-100 md:col-span-1"
    },
    {
      icon: <Compass className="h-10 w-10 text-emerald-500" />,
      title: "Authenticity",
      description: "We believe in creating spaces where people can show up as their true selves and experience genuine connection.",
      className: "bg-white border border-sand-100 md:col-span-1"
    },
    {
      icon: <Target className="h-10 w-10 text-amber-500" />,
      title: "Intentionality",
      description: "Every retreat, space, and interaction is crafted with purpose and mindfulness to create meaningful experiences.",
      className: "bg-white border border-sand-100 md:col-span-1"
    },
    {
      icon: <Globe className="h-10 w-10 text-blue-500" />,
      title: "Community",
      description: "We cultivate relationships that foster belonging, support, and growth for all members of our ecosystem.",
      className: "bg-white border border-sand-100 md:col-span-1"
    },
    {
      icon: <Leaf className="h-10 w-10 text-green-500" />,
      title: "Sustainability",
      description: "We make choices that honor and protect the natural environment and promote long-term wellbeing.",
      className: "bg-white border border-sand-100 md:col-span-1"
    }
  ];

  // Retreat Types cards
  const retreatTypeCards = [
    {
      id: 1,
      icon: <Leaf className="h-6 w-6 text-white" />,
      title: "Yoga Retreats",
      description: "Find your center with immersive yoga experiences led by skilled practitioners.",
      image: "https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      className: "md:col-span-2 row-span-2"
    },
    {
      id: 2,
      icon: <Flower2 className="h-6 w-6 text-white" />,
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

  // Team Members
  const teamMembers = [
    {
      name: "Maya Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      bio: "With over 15 years in wellness practice and a background in mindfulness education, Maya founded Sanghos to make transformative experiences more accessible.",
      className: "md:col-span-2"
    },
    {
      name: "Raj Patel",
      role: "Head of Retreat Curation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      bio: "Raj brings his expertise in retreat design and facilitation to curate experiences that balance introspection, connection, and transformation.",
      className: "md:col-span-1"
    },
    {
      name: "Zoe Chen",
      role: "Community Director",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
      bio: "As our Community Director, Zoe fosters meaningful connections between hosts, instructors, and participants to create a thriving ecosystem of wellness.",
      className: "md:col-span-1"
    },
    {
      name: "David Torres",
      role: "Technology Lead",
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      bio: "David ensures our platform connects people seamlessly, with a focus on creating intuitive and accessible digital experiences for our community.",
      className: "md:col-span-1"
    },
    {
      name: "Amara Wilson",
      role: "Host Relations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      bio: "Amara works closely with our host community, helping them create welcoming and transformative spaces for our retreat participants.",
      className: "md:col-span-1"
    },
    {
      name: "Leo Kim",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80",
      bio: "Leo crafts our brand story and connects Sanghos with mindfulness seekers who are looking for authentic experiences and community.",
      className: "md:col-span-1"
    }
  ];

  // Company Timeline
  const timelineMilestones = [
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

      <main className="pt-24 pb-16 bg-background">
        {/* Hero Section */}
        <section className="py-12 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="mb-12 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sanghos</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                We're on a mission to make mindfulness and wellness retreats accessible to everyone, 
                creating spaces for transformation and community.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              variants={fadeIn}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-24"
            >
              {heroCards.map((card, index) => (
                <Card 
                  key={index}
                  className={cn(
                    "group relative overflow-hidden transition-all duration-300 hover:shadow-lg",
                    card.isSolid ? "h-[200px] md:h-[250px]" : "h-[300px] md:h-[400px]",
                    card.className
                  )}
                >
                  {!card.isSolid ? (
                    <>
                      <div className="absolute inset-0">
                        <OptimizedImage 
                          src={card.image} 
                          alt={card.title}
                          className="w-full h-full"
                          objectFit="cover"
                          aspectRatio="custom"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">{card.title}</h3>
                        <p className="text-white/80">{card.description}</p>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 h-full flex flex-col justify-between">
                      <h3 className="text-2xl md:text-3xl font-bold text-sage-900">{card.title}</h3>
                      <p className="text-sage-700">{card.description}</p>
                    </div>
                  )}
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-white px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
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

            <motion.div 
              variants={staggerChildren}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {missionCards.map((card, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={cn("p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow", card.className)}
                >
                  {card.icon}
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-muted-foreground">{card.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-white px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
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
              className="grid grid-cols-1 md:grid-cols-5 gap-6"
            >
              {valueCards.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn}
                  className={cn("p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow", value.className)}
                >
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Retreat Types */}
        <section className="py-20 bg-gradient-to-b from-white to-sand-50 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
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
              className="grid grid-cols-1 md:grid-cols-4 gap-6"
            >
              {retreatTypeCards.map((type, index) => (
                <motion.div
                  key={type.id}
                  variants={fadeIn}
                  className={cn(
                    "rounded-xl overflow-hidden shadow-md relative group h-[320px]",
                    index === 0 ? "md:col-span-2 md:row-span-2 md:h-[660px]" : ""
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 z-10"></div>
                  <img 
                    src={type.image} 
                    alt={type.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <div className="flex items-center gap-2 bg-black/70 text-white px-4 py-3 rounded-lg">
                      <span>{type.icon}</span>
                      <h3 className="text-lg font-medium">{type.title}</h3>
                    </div>
                    <p className="text-white mt-2 px-2">{type.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 bg-sand-50 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {timelineMilestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.6 }}
                  className="flex gap-4 relative"
                >
                  <div className="w-16 h-16 bg-sage-500 text-white rounded-full flex items-center justify-center shrink-0">
                    <Clock className="h-6 w-6 mb-1 mr-1" />
                    <span className="font-bold">{milestone.year}</span>
                  </div>
                  <Card className="p-6 flex-1 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
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
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  variants={fadeIn}
                  className={cn(
                    "rounded-xl overflow-hidden bg-white shadow-sm border border-sand-100 hover:shadow-md transition-shadow",
                    member.className
                  )}
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

        {/* Join CTA Section */}
        <section className="py-24 relative overflow-hidden px-4 md:px-6">
          <div className="absolute inset-0 bg-gradient-to-r from-sage-100 to-sand-100 z-0"></div>
          <div className="absolute -right-20 top-20 w-72 h-72 bg-sage-200 rounded-full opacity-30 z-0"></div>
          <div className="absolute -left-20 bottom-20 w-80 h-80 bg-sand-200 rounded-full opacity-30 z-0"></div>
          
          <div className="container relative z-10 mx-auto max-w-6xl">
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
