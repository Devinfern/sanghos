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
import VideoBackground from "@/components/VideoBackground";

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
      image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1160&q=80",
      bio: "David ensures our platform connects people seamlessly, with a focus on creating intuitive and accessible digital experiences for our community.",
      className: "md:col-span-1"
    },
    {
      name: "Amara Wilson",
      role: "Host Relations",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1088&q=80",
      bio: "Amara works closely with our host community, helping them create welcoming and transformative spaces for our retreat participants.",
      className: "md:col-span-1"
    },
    {
      name: "Leo Kim",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80",
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

      <main className="bg-white">
        {/* Hero Section - With Video Background */}
        <section className="min-h-[80vh] py-16 md:py-24 px-4 relative overflow-hidden flex items-center">
          <VideoBackground 
            videoUrl="https://cdn.coverr.co/videos/coverr-hiking-in-the-forest-2527/1080p.mp4"
            overlayOpacity="bg-black/60"
          />
          <div className="max-w-7xl mx-auto relative z-10 w-full">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">About Sanghos</h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                We're on a mission to make mindfulness and wellness retreats accessible to everyone, 
                creating spaces for transformation and community.
              </p>
            </div>
          </div>
        </section>

        {/* Rest of the sections */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {missionCards.map((card, index) => (
                <div key={index} className="text-center p-8 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex justify-center mb-6">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-sage-900">{card.title}</h3>
                  <p className="text-sage-700">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 md:py-28 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-sage-950">Our Story</h2>
                <p className="text-lg text-sage-700 mb-6 leading-relaxed">
                  At Sanghos, we believe that meaningful connection and personal growth shouldn't require lengthy retreats or distant travel. We're dedicated to making transformative experiences accessible through curated daylong retreats in unique private spaces near you.
                </p>
                <p className="text-lg text-sage-700 leading-relaxed">
                  Founded in 2019 as a small community of mindfulness practitioners, we've grown into a platform that connects people seeking wellness experiences with skilled hosts and instructors who create spaces for transformation.
                </p>
              </div>
              <div className="md:w-1/2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden">
                <OptimizedImage 
                  src="https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3" 
                  alt="Our story"
                  className="w-full h-full"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-[#F7F3EE]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-sage-950">Our Values</h2>
              <p className="text-xl text-sage-700">
                These core principles guide everything we do at Sanghos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {valueCards.map((value, index) => (
                <div 
                  key={index} 
                  className="p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="mb-4 p-3 rounded-full bg-sage-50">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-sage-900">{value.title}</h3>
                  <p className="text-sage-700 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Retreat Types Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-sage-950">Explore by Retreat Type</h2>
              <p className="text-xl text-sage-700">
                Discover transformative experiences tailored to your wellness journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {retreatTypeCards.slice(0, 3).map((type) => (
                <div 
                  key={type.id} 
                  className="rounded-xl overflow-hidden shadow-md relative h-[400px] group"
                >
                  <OptimizedImage 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h3 className="text-2xl font-semibold mb-2">{type.title}</h3>
                    <p className="text-white/90">{type.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 bg-[#F7F3EE]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-sage-950">Meet Our Team</h2>
              <p className="text-xl text-sage-700">
                The passionate people behind Sanghos who are dedicated to creating meaningful experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.slice(0, 3).map((member) => (
                <div 
                  key={member.name} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="h-[280px] overflow-hidden">
                    <OptimizedImage 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-sage-900">{member.name}</h3>
                    <p className="text-sage-600 mb-3">{member.role}</p>
                    <p className="text-sage-700 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" className="text-sage-800 border-sage-200 hover:bg-sage-50">
                View All Team Members
              </Button>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-sage-950">Our Journey</h2>
              <p className="text-xl text-sage-700">
                From a small community gathering to a thriving platform
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-sage-200 z-0"></div>
              
              <div className="space-y-16 relative z-10">
                {timelineMilestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex flex-col md:flex-row items-center gap-8">
                    <div className={`md:w-1/2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:order-2'}`}>
                      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm max-w-lg">
                        <div className="text-2xl font-bold text-sage-500 mb-2">{milestone.year}</div>
                        <h3 className="text-xl font-semibold mb-3 text-sage-900">{milestone.title}</h3>
                        <p className="text-sage-700">{milestone.description}</p>
                      </div>
                    </div>
                    
                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2' : ''}`}>
                      <div className="w-12 h-12 rounded-full bg-sage-100 border-4 border-white flex items-center justify-center mx-auto md:mx-0">
                        <div className="w-4 h-4 rounded-full bg-sage-500"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join CTA Section */}
        <section className="py-24 px-4 relative overflow-hidden bg-sage-900 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1536623975707-c4b3b2af565d?ixlib=rb-4.0.3')] bg-cover bg-center"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              Whether you're seeking mindful experiences, looking to share your expertise as an instructor, or have a unique space to host retreats, we'd love to welcome you to the Sanghos community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-sage-900 hover:bg-white/90">
                Join as a Member
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Become a Host
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
