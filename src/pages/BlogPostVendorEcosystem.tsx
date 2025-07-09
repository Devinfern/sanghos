import React from 'react';
import BlogPostLayout from '@/components/blog/BlogPostLayout';
import BlogPostIntro from '@/components/blog/BlogPostIntro';
import BlogPostStory from '@/components/blog/BlogPostStory';
import BlogPostConclusion from '@/components/blog/BlogPostConclusion';
import { Shield, Users, Award, CheckCircle, Heart, Target } from 'lucide-react';

const BlogPostVendorEcosystem = () => {
  const heroProps = {
    title: "Behind the Scenes: Building a Trust-First Vendor Ecosystem for Wellness Retreats",
    excerpt: "An inside look at how Sanghos is revolutionizing retreat planning through community-driven vendor vetting, rigorous quality standards, and authentic relationships that put trust first.",
    author: "Devin Fernandez",
    date: "January 9, 2025",
    readTime: "9 min read",
    category: "Behind the Scenes"
  };

  const relatedLinks = {
    internalLinks: [
      { title: "Why Wellness Retreats Are the Modern Solution to Burnout", href: "/blog/wellness-retreats-modern-burnout-solution" },
      { title: "The Science of Spiritual Wellness", href: "/blog/spirituality-wellness-science" },
      { title: "Join Our Community", href: "/community" }
    ],
    exploreLinks: [
      { title: "Vendors Marketplace Preview", href: "/vendors-marketplace-teaser" },
      { title: "Browse All Retreats", href: "/retreats" },
      { title: "Become a Host", href: "/become-host" }
    ]
  };

  const ctaProps = {
    title: "Ready to Experience the Future of Retreat Planning?",
    description: "Join our beta program and be among the first to access our curated vendor ecosystem.",
    primaryButtonText: "Join Beta Waitlist",
    primaryButtonLink: "/vendors-marketplace-teaser",
    secondaryButtonText: "Explore Retreats",
    secondaryButtonLink: "/retreats"
  };

  return (
    <BlogPostLayout
      title="Behind the Scenes: Building a Trust-First Vendor Ecosystem | Sanghos"
      description="An inside look at how Sanghos is revolutionizing retreat planning through community-driven vendor vetting and authentic relationships that put trust first."
      heroProps={heroProps}
      relatedLinks={relatedLinks}
      ctaProps={ctaProps}
    >
      <BlogPostIntro>
        <p>
          When Sarah, a yoga instructor from Portland, decided to host her first retreat in Costa Rica, 
          she spent three months researching vendors. Caterers who promised organic meals but delivered 
          processed food. Transportation companies that showed up two hours late. Accommodation hosts 
          who oversold their capacity.
        </p>
        <p>
          <strong>Her dream retreat turned into a logistical nightmare—and she's not alone.</strong>
        </p>
        <p>
          After hearing hundreds of similar stories, we knew the wellness industry needed something 
          different. Not another vendor directory, but a trust-first ecosystem built by and for the 
          retreat community itself.
        </p>
      </BlogPostIntro>

      <BlogPostStory 
        icon={Shield} 
        title="The Trust Problem in Wellness Services"
        subtitle="Why Traditional Vendor Platforms Fall Short"
      >
        <p>
          The wellness industry operates on trust, authenticity, and personal connection—values that 
          don't translate well to traditional B2B platforms. Generic vendor directories treat a retreat 
          chef the same as a corporate caterer, missing the nuanced requirements of wellness experiences.
        </p>
        
        <p>
          <strong>The fundamental issues we identified:</strong>
        </p>
        
        <ul>
          <li><strong>No wellness-specific vetting:</strong> Standard platforms check business licenses 
          but ignore whether vendors understand retreat participants' dietary restrictions, energy levels, 
          or spiritual practices</li>
          
          <li><strong>Transactional relationships:</strong> One-off connections without ongoing 
          accountability or community feedback</li>
          
          <li><strong>Missing context:</strong> Reviews from corporate events don't predict performance 
          at intimate wellness gatherings</li>
          
          <li><strong>Scale mismatch:</strong> Platforms built for large events struggle with the 
          personalized, small-group nature of most retreats</li>
        </ul>

        <blockquote className="border-l-4 border-brand-primary bg-brand-subtle/20 p-6 my-8">
          <p className="text-lg italic mb-4">
            "We needed vendors who understood that serving 15 people isn't just scaling down from 150—it's 
            an entirely different experience requiring different skills, sensitivity, and attention to detail."
          </p>
          <footer className="text-brand-slate">— Maria Santos, Mindfulness Retreat Host</footer>
        </blockquote>
      </BlogPostStory>

      <BlogPostStory 
        icon={Users} 
        title="Community-Driven Vetting: How We Build Trust"
        subtitle="The Three-Layer Approach to Vendor Verification"
      >
        <p>
          Rather than relying on algorithms or corporate reviewers, we built our vetting process around 
          the people who know wellness services best: experienced retreat hosts and participants.
        </p>

        <div className="bg-sage-50 rounded-lg p-6 my-8">
          <h4 className="font-bold text-lg mb-4 text-brand-dark">Layer 1: Community Nominations</h4>
          <p>
            Vendors enter our ecosystem through recommendations from verified retreat hosts. This ensures 
            every vendor has already proven themselves in real wellness settings, not just on paper.
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 my-8">
          <h4 className="font-bold text-lg mb-4 text-brand-dark">Layer 2: Wellness-Specific Assessment</h4>
          <p>
            Our evaluation criteria go beyond basic business metrics to include:
          </p>
          <ul className="mt-3">
            <li>Understanding of dietary restrictions and wellness nutrition</li>
            <li>Experience with meditation and mindfulness practices</li>
            <li>Sensitivity to different spiritual and cultural approaches</li>
            <li>Flexibility for last-minute changes common in retreat settings</li>
            <li>Communication style that aligns with wellness values</li>
          </ul>
        </div>

        <div className="bg-purple-50 rounded-lg p-6 my-8">
          <h4 className="font-bold text-lg mb-4 text-brand-dark">Layer 3: Ongoing Community Feedback</h4>
          <p>
            Post-retreat reviews focus on wellness-specific criteria, with input from both hosts and 
            participants. Vendors who consistently deliver authentic, supportive experiences rise in 
            our rankings.
          </p>
        </div>

        <p>
          This three-layer approach means when you find a vendor in our marketplace, they've been 
          vouched for by your peers, evaluated against wellness-specific standards, and continuously 
          validated by community feedback.
        </p>
      </BlogPostStory>

      <BlogPostStory 
        icon={Award} 
        title="Quality Standards That Actually Matter"
        subtitle="Beyond Certifications: What We Really Look For"
      >
        <p>
          Traditional vendor platforms focus on insurance, licenses, and basic credentials. While 
          important, these don't predict success in wellness environments. Our quality framework 
          evaluates what truly matters for retreat experiences.
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="border border-sage-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Heart className="h-5 w-5 text-red-500 mr-2" />
              <h4 className="font-bold">Wellness Alignment</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Understanding of holistic health principles</li>
              <li>• Respect for diverse spiritual practices</li>
              <li>• Commitment to sustainable, ethical practices</li>
              <li>• Genuine passion for supporting transformation</li>
            </ul>
          </div>

          <div className="border border-sage-200 rounded-lg p-6">
            <div className="flex items-center mb-3">
              <Target className="h-5 w-5 text-blue-500 mr-2" />
              <h4 className="font-bold">Retreat-Specific Skills</h4>
            </div>
            <ul className="text-sm space-y-1">
              <li>• Flexibility with group dynamics and energy</li>
              <li>• Experience with dietary restrictions/preferences</li>
              <li>• Understanding of retreat flow and timing</li>
              <li>• Ability to support rather than disrupt experiences</li>
            </ul>
          </div>
        </div>

        <p>
          We also prioritize vendors who understand that retreats aren't just events—they're transformative 
          experiences where every detail can impact a participant's journey.
        </p>

        <blockquote className="border-l-4 border-sage-400 bg-sage-50 p-6 my-8">
          <p className="text-lg italic mb-4">
            "The difference isn't just in what they do, but how they do it. Our recommended massage 
            therapist doesn't just provide treatments—she holds space for emotional releases and 
            understands how bodywork fits into someone's healing journey."
          </p>
          <footer className="text-brand-slate">— James Chen, Retreat Host & Sanghos Vendor Partner</footer>
        </blockquote>
      </BlogPostStory>

      <BlogPostStory 
        icon={CheckCircle} 
        title="Technology Meets Human Connection"
        subtitle="Building Tools That Strengthen Relationships, Not Replace Them"
        isGated={true}
      >
        <p>
          Our vendor marketplace isn't just a booking platform—it's designed to foster long-term 
          relationships between hosts and vendors who share similar values and approaches.
        </p>

        <p>
          <strong>Key features launching in our beta:</strong>
        </p>

        <ul>
          <li><strong>Values-based matching:</strong> Connect with vendors who align with your retreat's 
          specific approach, whether that's traditional yoga, modern mindfulness, or nature-based healing</li>
          
          <li><strong>Relationship tracking:</strong> Build vendor teams you can rely on retreat after retreat, 
          with tools to manage ongoing partnerships</li>
          
          <li><strong>Community insights:</strong> Access detailed feedback from hosts with similar retreat 
          styles, participant demographics, and wellness approaches</li>
          
          <li><strong>Transparent communication:</strong> Direct messaging system designed for the 
          collaborative, iterative planning process retreats require</li>
          
          <li><strong>Retreat-specific logistics:</strong> Specialized tools for managing dietary needs, 
          transportation coordination, and flexible scheduling</li>
        </ul>

        <p>
          The goal isn't efficiency for its own sake, but creating space for hosts to focus on what 
          they do best—facilitating transformation—while knowing their logistical partners truly 
          understand and support their mission.
        </p>
      </BlogPostStory>

      <BlogPostConclusion 
        title="Building the Future of Wellness Commerce"
        isGated={true}
      >
        <p>
          The Sanghos Vendor Marketplace represents more than a new platform—it's a shift toward 
          trust-first commerce in the wellness industry. By centering community vetting, authentic 
          relationships, and wellness-specific quality standards, we're creating an ecosystem where 
          both hosts and vendors can thrive.
        </p>

        <p>
          <strong>Our beta launch in Q2 2025 will include:</strong>
        </p>
        
        <ul>
          <li>50+ pre-vetted vendors across key categories</li>
          <li>Integration with retreat planning and booking tools</li>
          <li>Community feedback and rating system</li>
          <li>Direct communication and relationship management features</li>
          <li>Mobile-optimized experience for planning on the go</li>
        </ul>

        <p>
          Whether you're a first-time retreat host looking for trustworthy partners or an experienced 
          facilitator wanting to streamline your vendor relationships, our marketplace is being built 
          with your specific needs in mind.
        </p>

        <p className="text-brand-primary font-medium">
          Join our beta program to be among the first to experience vendor relationships built on 
          trust, aligned values, and genuine understanding of what makes wellness experiences truly 
          transformative.
        </p>
      </BlogPostConclusion>
    </BlogPostLayout>
  );
};

export default BlogPostVendorEcosystem;