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






