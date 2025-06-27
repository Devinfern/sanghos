import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Wind, Heart, Brain, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeehiivNewsletterSignup from '@/components/BeehiivNewsletterSignup';
import BlogPostHero from '@/components/blog/BlogPostHero';
import BlogPostStory from '@/components/blog/BlogPostStory';
import BlogPostConclusion from '@/components/blog/BlogPostConclusion';
import BlogPostCTA from '@/components/blog/BlogPostCTA';
import RelatedReading from '@/components/blog/RelatedReading';
import ContentGate from '@/components/blog/ContentGate';
import { useScrollGate } from '@/hooks/useScrollGate';
import { Link } from 'react-router-dom';

const BlogPostBreathingTechniques = () => {
  const { shouldShowGate, dismissGate } = useScrollGate({ threshold: 0.4 });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const relatedLinks = {
    internalLinks: [
      { title: "Preparing for Your First Meditation Retreat", href: "/blog/meditation-retreat-preparation" },
      { title: "Why Wellness Retreats Are the Modern Solution to Burnout", href: "/blog/wellness-retreats-modern-burnout-solution" },
      { title: "7 Morning Rituals That Will Transform Your Day", href: "/blog/morning-wellness-rituals" }
    ],
    exploreLinks: [
      { title: "Find Breathwork Instructors", href: "/instructors" },
      { title: "Browse Meditation Retreats", href: "/retreats" },
      { title: "Discover Wellness Studios", href: "/wellness-studios" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Mindful Breathing Techniques: Your Gateway to Inner Peace | Sanghos</title>
        <meta name="description" content="Master powerful, evidence-based breathing practices that transform daily stress into moments of calm and clarity. Learn techniques used by meditation masters worldwide." />
      </Helmet>

      <Header />

      <main className="bg-white pt-20">
        <BlogPostHero
          title="Mindful Breathing Techniques: Your Gateway to Inner Peace"
          excerpt="Transform your daily stress into moments of calm and clarity with these powerful, evidence-based breathing practices that have been refined by meditation masters for centuries."
          author="Devin Fernandez"
          date="December 15, 2024"
          readTime="8 min read"
          category="Breathwork"
        />

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <div className="bg-sage-50 rounded-2xl p-8 mb-12">
                <p className="text-lg leading-relaxed mb-4">
                  In our hyperconnected world, the simple act of breathing has become one of our most powerful tools for <a href="https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/decrease-stress-by-using-your-breath/art-20267197" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">stress reduction and mental clarity</a>. While we breathe automatically throughout the day, conscious breathing practices can dramatically shift our nervous system from stress response to relaxation response in just minutes.
                </p>
                <p className="text-lg leading-relaxed">
                  <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7367555/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Scientific research</a> confirms what contemplative traditions have known for millennia: controlled breathing directly influences our mental state, emotional regulation, and physical health. Let's explore the most effective techniques that you can integrate into your daily routine for immediate and lasting benefits.
                </p>
              </div>

              <BlogPostStory
                icon={Brain}
                title="The Science of Conscious Breathing"
                subtitle="How breathwork directly impacts your nervous system and brain function"
              >
                <p className="text-lg leading-relaxed mb-6">
                  When we breathe consciously, we activate the <a href="https://www.healthline.com/health/vagus-nerve" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">vagus nerve</a>, which signals the parasympathetic nervous system to initiate the body's relaxation response. This isn't just about feeling calmer—it creates measurable changes in brain activity, hormone levels, and cardiovascular function.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Research shows that <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">controlled breathing practices</a> can reduce cortisol levels by up to 50%, improve heart rate variability, and increase activity in brain regions associated with emotional regulation and executive function.
                </p>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Physiological Benefits of Breathwork:</h4>
                  <ul className="space-y-2">
                    <li>• Reduced <a href="https://www.healthline.com/health/cortisol" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">cortisol and stress hormones</a></li>
                    <li>• Improved oxygen delivery to tissues</li>
                    <li>• Enhanced heart rate variability</li>
                    <li>• Increased GABA production (calming neurotransmitter)</li>
                    <li>• Better sleep quality and duration</li>
                    <li>• Strengthened immune system response</li>
                  </ul>
                </div>

                <blockquote className="border-l-4 border-brand-primary bg-brand-subtle/5 p-6 my-8 italic text-lg">
                  "Breath is the bridge which connects life to consciousness, which unites your body to your thoughts. Whenever your mind becomes scattered, use your breath as the means to take hold of your mind again."
                  <footer className="text-sm text-gray-600 mt-2">- Thich Nhat Hanh, Zen Master</footer>
                </blockquote>
              </BlogPostStory>

              <BlogPostStory
                icon={Wind}
                title="Essential Breathing Techniques for Daily Practice"
                subtitle="Master these foundational practices for immediate stress relief and long-term well-being"
                isGated={true}
              >
                <div className="bg-green-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-4">1. Box Breathing (4-4-4-4 Technique)</h4>
                  <p className="mb-4">Used by Navy SEALs and emergency responders for stress management under pressure.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Inhale for 4 counts</li>
                    <li>• Hold for 4 counts</li>
                    <li>• Exhale for 4 counts</li>
                    <li>• Hold empty for 4 counts</li>
                    <li>• Repeat 4-8 cycles</li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-4">2. 4-7-8 Breathing (The Relaxing Breath)</h4>
                  <p className="mb-4">Developed by Dr. Andrew Weil, this technique is particularly effective for anxiety and insomnia.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Inhale through nose for 4 counts</li>
                    <li>• Hold breath for 7 counts</li>
                    <li>• Exhale through mouth for 8 counts</li>
                    <li>• Repeat 4 cycles, practice twice daily</li>
                  </ul>
                </div>

                <div className="bg-amber-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-4">3. Alternate Nostril Breathing (Nadi Shodhana)</h4>
                  <p className="mb-4">An ancient <a href="https://www.healthline.com/health/what-is-yoga" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">yogic practice</a> for balancing the nervous system and enhancing focus.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Use right thumb to close right nostril</li>
                    <li>• Inhale through left nostril</li>
                    <li>• Close left nostril with ring finger</li>
                    <li>• Release thumb, exhale through right nostril</li>
                    <li>• Continue alternating for 5-10 minutes</li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  These techniques can be practiced anywhere—at your desk, in traffic, before important meetings, or as part of your <Link to="/blog/morning-wellness-rituals" className="text-brand-primary hover:underline">morning wellness routine</Link>. The key is consistency rather than duration; even 2-3 minutes of conscious breathing can shift your entire day.
                </p>
              </BlogPostStory>

              <BlogPostStory
                icon={Heart}
                title="Advanced Breathwork for Emotional Regulation"
                subtitle="Deepen your practice with techniques for processing difficult emotions and trauma"
                isGated={true}
              >
                <p className="text-lg leading-relaxed mb-6">
                  Beyond basic stress relief, advanced breathwork can be a powerful tool for emotional healing and <a href="https://www.traumainformedoregon.org/understanding-trauma/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">trauma processing</a>. These practices should be approached gradually and ideally under the guidance of experienced <Link to="/instructors" className="text-brand-primary hover:underline">breathwork facilitators</Link>.
                </p>

                <div className="bg-rose-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-4">Coherent Breathing (5-5 Rhythm)</h4>
                  <p className="mb-4">Optimizes heart rate variability and emotional coherence.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Inhale for 5 counts</li>
                    <li>• Exhale for 5 counts</li>
                    <li>• Practice for 10-20 minutes</li>
                    <li>• Focus on smooth, even breath flow</li>
                    <li>• Can be combined with gratitude meditation</li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-4">Three-Part Breath (Dirga Pranayama)</h4>
                  <p className="mb-4">Expands lung capacity while promoting deep relaxation.</p>
                  <ul className="space-y-2 text-sm">
                    <li>• Breathe into belly (expanding diaphragm)</li>
                    <li>• Continue breathing into ribs (expanding chest)</li>
                    <li>• Complete breath to collarbones (expanding upper chest)</li>
                    <li>• Exhale in reverse order: chest, ribs, belly</li>
                    <li>• Practice lying down initially</li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  These deeper practices are often integrated into <Link to="/retreats" className="text-brand-primary hover:underline">meditation retreats</Link> and therapeutic settings. <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4946729/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Research indicates</a> that regular advanced breathwork can be as effective as traditional therapy for certain anxiety and depression symptoms.
                </p>

                <blockquote className="border-l-4 border-brand-primary bg-brand-subtle/5 p-6 my-8 italic text-lg">
                  "The breath is one of the few automatic functions of the body that we can consciously control. This makes it a bridge between the conscious and unconscious, voluntary and involuntary, mind and body."
                  <footer className="text-sm text-gray-600 mt-2">- Dr. Elissa Epel, UCSF Stress and Aging Research Center</footer>
                </blockquote>
              </BlogPostStory>

              <BlogPostStory
                icon={Clock}
                title="Integrating Breathwork into Modern Life"
                subtitle="Practical strategies for maintaining consistent practice in busy schedules"
                isGated={true}
              >
                <p className="text-lg leading-relaxed mb-6">
                  The most effective breathwork practice is the one you actually do consistently. Rather than aiming for lengthy sessions, focus on integrating short practices throughout your day at natural transition points and stress triggers.
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-white border border-sage-200 rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-3">Daily Integration Points:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Upon waking (3 minutes)</li>
                      <li>• Before meals (1 minute)</li>
                      <li>• During work transitions (2 minutes)</li>
                      <li>• Before important conversations</li>
                      <li>• When feeling stressed or anxious</li>
                      <li>• Before sleep (5 minutes)</li>
                    </ul>
                  </div>
                  <div className="bg-white border border-sage-200 rounded-lg p-6">
                    <h4 className="font-semibold text-lg mb-3">Technology Support:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Breath training apps with guided sessions</li>
                      <li>• Smartwatch breathing reminders</li>
                      <li>• <a href="https://www.headspace.com/breathing-exercises" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Online guided practices</a></li>
                      <li>• Biofeedback devices for heart rate variability</li>
                      <li>• Calendar reminders for practice</li>
                    </ul>
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  Start with just one technique that resonates with you and practice it for a week before adding others. <a href="https://www.healthline.com/health/breathing-exercise" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Consistency trumps intensity</a> when building sustainable breathwork habits.
                </p>

                <div className="bg-sage-100 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Building Your Practice:</h4>
                  <ul className="space-y-2">
                    <li>• Week 1: Choose one basic technique, practice 2 minutes daily</li>
                    <li>• Week 2: Increase to 5 minutes, add a second daily session</li>
                    <li>• Week 3: Experiment with different techniques for different situations</li>
                    <li>• Week 4: Establish your personal rhythm and preferred practices</li>
                    <li>• Month 2+: Consider joining <Link to="/retreats" className="text-brand-primary hover:underline">breathwork workshops</Link> or classes</li>
                  </ul>
                </div>
              </BlogPostStory>

              <BlogPostConclusion title="Your Breath as a Lifelong Companion" isGated={true}>
                <p className="text-lg leading-relaxed mb-6">
                  Breathwork is perhaps the most accessible and immediately effective tool we have for managing stress, regulating emotions, and cultivating inner peace. Unlike other wellness practices that require special equipment or settings, your breath is always with you, ready to serve as an anchor in life's storms.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  The <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7367555/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">scientific evidence</a> supporting breathwork continues to grow, validating what practitioners have experienced for centuries: conscious breathing is a gateway to greater self-awareness, emotional resilience, and spiritual connection.
                </p>

                <p className="text-lg leading-relaxed">
                  As you begin or deepen your breathwork practice, remember that every conscious breath is a step toward greater well-being. Start where you are, use what resonates, and trust in the wisdom of this most fundamental life process. Your breath has been sustaining you since birth—now let it guide you toward the peace and clarity you seek.
                </p>
              </BlogPostConclusion>

              <RelatedReading 
                internalLinks={relatedLinks.internalLinks}
                exploreLinks={relatedLinks.exploreLinks}
              />

              <BlogPostCTA
                title="Ready to Deepen Your Breathwork Practice?"
                description="Discover guided breathwork sessions and meditation retreats that will help you master these powerful techniques for lasting transformation."
                primaryButtonText="Find Breathwork Instructors"
                primaryButtonLink="/instructors"
                secondaryButtonText="Explore Meditation Retreats"
                secondaryButtonLink="/retreats"
              />

            </motion.div>
          </div>
        </section>

        <BeehiivNewsletterSignup />
      </main>

      <ContentGate 
        isVisible={shouldShowGate}
        onDismiss={dismissGate}
        articleTitle="Mindful Breathing Techniques: Your Gateway to Inner Peace"
      />

      <Footer />
    </>
  );
};

export default BlogPostBreathingTechniques;
