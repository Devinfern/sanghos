import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Smartphone, Brain, Leaf, Shield } from 'lucide-react';
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

const BlogPostDigitalDetox = () => {
  const { shouldShowGate, dismissGate } = useScrollGate({ threshold: 0.4 });

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const relatedLinks = {
    internalLinks: [
      { title: "7 Morning Rituals That Will Transform Your Day", href: "/blog/morning-wellness-rituals" },
      { title: "Mindful Breathing Techniques: Your Gateway to Inner Peace", href: "/blog/mindful-breathing-techniques" },
      { title: "The Science Behind Forest Bathing: Why Nature Heals", href: "/blog/forest-bathing-guide" }
    ],
    exploreLinks: [
      { title: "Find Digital Wellness Retreats", href: "/retreats" },
      { title: "Connect with Mindfulness Instructors", href: "/instructors" },
      { title: "Join Our Wellness Community", href: "/community" }
    ]
  };

  return (
    <>
      <Helmet>
        <title>The Art of Digital Detox: Reclaiming Your Mental Space | Sanghos</title>
        <meta name="description" content="Learn how to disconnect from technology and reconnect with yourself through mindful digital boundaries and sustainable wellness practices." />
      </Helmet>

      <Header />

      <main className="bg-white pt-20">
        <BlogPostHero
          title="The Art of Digital Detox: Reclaiming Your Mental Space"
          excerpt="Discover how to break free from digital overwhelm and create healthy boundaries with technology while rekindling your connection to the present moment and authentic well-being."
          author="Devin Fernandez"
          date="December 3, 2024"
          readTime="6 min read"
          category="Mindfulness"
        />

        <section className="py-16">
          <div className="container mx-auto max-w-4xl px-4 md:px-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} className="prose prose-lg max-w-none">
              
              <div className="bg-sage-50 rounded-2xl p-8 mb-12">
                <p className="text-lg leading-relaxed mb-4">
                  We live in an age of unprecedented digital connectivity, yet many of us feel more disconnected than ever from ourselves and the world around us. <a href="https://www.apa.org/monitor/2017/09/strain-stress" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Research indicates</a> that the average person checks their phone 96 times per day, creating a constant state of partial attention that fragments our focus and diminishes our capacity for deep presence.
                </p>
                <p className="text-lg leading-relaxed">
                  A <a href="https://www.healthline.com/health/mental-health/digital-detox" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">digital detox</a> isn't about completely abandoning technology—it's about creating intentional boundaries that allow you to harness technology's benefits while protecting your mental space, relationships, and overall well-being. Let's explore how to reclaim your attention and cultivate a healthier relationship with the digital world.
                </p>
              </div>

              <BlogPostStory
                icon={Smartphone}
                title="Understanding Digital Overwhelm: The Hidden Cost of Constant Connection"
                subtitle="Recognizing how excessive screen time affects your brain, relationships, and well-being"
              >
                <p className="text-lg leading-relaxed mb-6">
                  Digital overwhelm manifests as more than just eye strain or neck pain from poor posture. <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6214874/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Neuroscience research</a> reveals that constant digital stimulation creates a state of chronic stress, flooding our brains with dopamine and cortisol in ways that disrupt natural attention patterns and emotional regulation.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  The phenomenon of "continuous partial attention," coined by researcher Linda Stone, describes how digital multitasking keeps us in a heightened state of alertness that was never meant to be sustained long-term. This state prevents us from accessing the deeper, more reflective brain states necessary for creativity, problem-solving, and emotional processing.
                </p>

                <div className="bg-red-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Signs of Digital Overwhelm:</h4>
                  <ul className="space-y-2">
                    <li>• Difficulty focusing on single tasks for extended periods</li>
                    <li>• <a href="https://www.sleepfoundation.org/how-sleep-works/blue-light-effects-on-sleep" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Sleep disruption</a> from evening screen use</li>
                    <li>• Anxiety when separated from devices</li>
                    <li>• Reduced face-to-face conversation quality</li>
                    <li>• Physical symptoms: eye strain, neck pain, headaches</li>
                    <li>• Decreased enjoyment of non-digital activities</li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  <a href="https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/sleep/art-20048379" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Studies show</a> that excessive screen time, particularly in the evening, disrupts circadian rhythms and melatonin production, leading to poor sleep quality that cascades into reduced cognitive function, mood instability, and weakened immune response. This creates a cycle where we turn to digital stimulation to combat fatigue, further exacerbating the problem.
                </p>

                <blockquote className="border-l-4 border-brand-primary bg-brand-subtle/5 p-6 my-8 italic text-lg">
                  "The cost of a thing is the amount of what I will call life which is required to be exchanged for it, immediately or in the long run."
                  <footer className="text-sm text-gray-600 mt-2">- Henry David Thoreau</footer>
                </blockquote>

                <p className="text-lg leading-relaxed mb-6">
                  Understanding these impacts helps us approach digital detox not as deprivation but as reclamation—reclaiming our attention, our time, and our capacity for deep presence. The goal isn't to demonize technology but to use it consciously rather than being used by it. This awareness becomes the foundation for creating sustainable <Link to="/blog/morning-wellness-rituals" className="text-brand-primary hover:underline">wellness practices</Link> that support both digital literacy and mental health.
                </p>
              </BlogPostStory>

              <BlogPostStory
                icon={Brain}
                title="The Neuroscience of Digital Detox: Rewiring Your Brain for Presence"
                subtitle="How strategic breaks from technology restore cognitive function and emotional balance"
                isGated={true}
              >
                <p className="text-lg leading-relaxed mb-6">
                  When we step away from digital stimulation, our brains begin to restore what neuroscientists call the "default mode network"—a state of neural activity that enables introspection, creativity, and emotional processing. <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4692319/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Research demonstrates</a> that regular periods of digital silence allow the prefrontal cortex to recover from overstimulation and return to more sustainable patterns of attention.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Digital detox periods, even as brief as 24 hours, can begin to restore what researchers term "cognitive control"—the ability to direct attention intentionally rather than reactively. This restoration improves working memory, emotional regulation, and the capacity for what psychologists call "sustained attention"—the foundation of both productivity and contemplative practice.
                </p>

                <div className="bg-green-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Neurological Benefits of Digital Detox:</h4>
                  <ul className="space-y-2">
                    <li>• Restored default mode network activity</li>
                    <li>• Improved <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4649707/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">working memory</a> capacity</li>
                    <li>• Enhanced emotional regulation</li>
                    <li>• Increased capacity for sustained attention</li>
                    <li>• Improved sleep quality and circadian rhythm regulation</li>
                    <li>• Reduced stress hormone production</li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  The brain's neuroplasticity means that positive changes from digital detox can compound over time. <a href="https://www.health.harvard.edu/blog/why-you-should-unplug-every-day-2018051813865" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Harvard research</a> suggests that individuals who regularly practice digital boundaries show increased gray matter density in areas associated with attention, compassion, and emotional stability—similar changes observed in long-term <Link to="/blog/mindful-breathing-techniques" className="text-brand-primary hover:underline">meditation practitioners</Link>.
                </p>

                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Progressive Detox Timeline:</h4>
                  <ul className="space-y-2">
                    <li>• <strong>24 Hours:</strong> Initial cortisol reduction, improved sleep</li>
                    <li>• <strong>3 Days:</strong> Enhanced focus, reduced anxiety</li>
                    <li>• <strong>1 Week:</strong> Restored attention span, creative insights</li>
                    <li>• <strong>1 Month:</strong> Sustainable habit formation, improved relationships</li>
                  </ul>
                </div>

                <blockquote className="border-l-4 border-brand-primary bg-brand-subtle/5 p-6 my-8 italic text-lg">
                  "In the depth of winter, I finally learned that within me there lay an invincible summer."
                  <footer className="text-sm text-gray-600 mt-2">- Albert Camus</footer>
                </blockquote>

                <p className="text-lg leading-relaxed mb-6">
                  This neurological restoration creates space for what many describe as a return to their "authentic self"—the version of themselves that exists beyond digital personas and constant stimulation. Many participants in <Link to="/retreats" className="text-brand-primary hover:underline">digital detox retreats</Link> report rediscovering interests, relationships, and aspects of themselves that had been overshadowed by digital overwhelm.
                </p>
              </BlogPostStory>

              <BlogPostStory
                icon={Leaf}
                title="Practical Digital Detox Strategies: From Micro-Breaks to Extended Retreats"
                subtitle="Sustainable approaches to creating healthy boundaries with technology in daily life"
                isGated={true}
              >
                <p className="text-lg leading-relaxed mb-6">
                  Effective digital detox doesn't require dramatic gestures or complete disconnection. The most sustainable approaches involve creating structured boundaries that can be maintained long-term. Start with small, manageable changes that gradually build into more significant transformations in your relationship with technology.
                </p>

                <div className="bg-purple-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Micro-Detox Strategies (Daily):</h4>
                  <ul className="space-y-2">
                    <li>• Phone-free meals and conversations</li>
                    <li>• <Link to="/blog/morning-wellness-rituals" className="text-brand-primary hover:underline">Morning routine</Link> before checking devices</li>
                    <li>• <a href="https://www.sleepfoundation.org/bedroom-environment/blue-light-and-sleep" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Digital sunset</a> 1-2 hours before bed</li>
                    <li>• Designated phone-free zones in home</li>
                    <li>• Mindful transitions between digital activities</li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  <a href="https://www.mindful.org/how-to-do-a-digital-detox/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Research supports</a> the effectiveness of gradual implementation over dramatic changes. The brain adapts more readily to incremental shifts, making sustainable behavior change more likely. Consider each boundary as an experiment rather than a rigid rule—notice what works for your lifestyle and adjust accordingly.
                </p>

                <div className="bg-amber-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Extended Detox Options:</h4>
                  <ul className="space-y-2">
                    <li>• Weekly digital sabbaths (24-hour periods)</li>
                    <li>• Weekend <Link to="/blog/forest-bathing-guide" className="text-brand-primary hover:underline">nature immersion</Link> without devices</li>
                    <li>• <Link to="/retreats" className="text-brand-primary hover:underline">Wellness retreats</Link> with digital policies</li>
                    <li>• Vacation periods with minimal connectivity</li>
                    <li>• Monthly solo retreats focused on <a href="https://www.apa.org/topics/mindfulness/meditation" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">contemplative practice</a></li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  Creating supportive structures enhances detox success. Use physical tools like analog alarm clocks, paper books, and dedicated spaces for non-digital activities. Many people find that replacing digital habits with positive alternatives—such as reading, <Link to="/blog/mindful-breathing-techniques" className="text-brand-primary hover:underline">breathing practices</Link>, or creative pursuits—feels more sustainable than simply removing technology.
                </p>

                <div className="bg-indigo-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Building Your Support System:</h4>
                  <ul className="space-y-2">
                    <li>• Communicate boundaries to family and colleagues</li>
                    <li>• Find accountability partners for digital wellness</li>
                    <li>• Join <Link to="/community" className="text-brand-primary hover:underline">communities</Link> focused on mindful technology use</li>
                    <li>• Create alternative activities for former screen time</li>
                    <li>• Use apps mindfully—set specific times and purposes</li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  Remember that digital detox is not about perfection but about conscious choice. <a href="https://www.cdc.gov/mentalhealth/stress-coping/cope.htm" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Mental health research</a> consistently shows that having control over our environment—including our digital environment—significantly impacts stress levels and overall well-being. The goal is to move from reactive to intentional technology use.
                </p>
              </BlogPostStory>

              <BlogPostStory
                icon={Shield}
                title="Maintaining Digital Wellness: Long-term Strategies for Healthy Tech Habits"
                subtitle="Creating sustainable practices that support both digital literacy and mental well-being"
                isGated={true}
              >
                <p className="text-lg leading-relaxed mb-6">
                  Long-term digital wellness requires moving beyond periodic detoxes toward sustainable daily practices that honor both technology's benefits and our need for presence. This involves developing what researchers call "digital wisdom"—the ability to use technology in ways that support rather than undermine our well-being and goals.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6214874/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Studies on technology use patterns</a> reveal that individuals who maintain healthy digital boundaries share common practices: they use technology purposefully rather than habitually, create clear transitions between digital and non-digital activities, and regularly assess whether their technology use aligns with their values and goals.
                </p>

                <div className="bg-rose-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Digital Wisdom Principles:</h4>
                  <ul className="space-y-2">
                    <li>• <strong>Intentional Use:</strong> Clear purpose for each digital interaction</li>
                    <li>• <strong>Time Boundaries:</strong> Defined periods for different tech activities</li>
                    <li>• <strong>Space Boundaries:</strong> Physical areas for digital and non-digital activities</li>
                    <li>• <strong>Quality Control:</strong> <a href="https://www.edutopia.org/article/digital-wellness-skills-students-need" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Curating content</a> that adds value</li>
                    <li>• <strong>Regular Assessment:</strong> Periodic evaluation of digital habits</li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed mb-6">
                  Building digital wellness into daily routines creates automatic support systems. Many practitioners integrate short <Link to="/blog/mindful-breathing-techniques" className="text-brand-primary hover:underline">mindfulness practices</Link> before and after significant digital activities, creating conscious transitions that prevent the mindless scrolling that often leads to overwhelm.
                </p>

                <div className="bg-cyan-50 rounded-lg p-6 mb-8">
                  <h4 className="font-semibold text-lg mb-3">Weekly Digital Wellness Check-in:</h4>
                  <ul className="space-y-2">
                    <li>• How did technology support your goals this week?</li>
                    <li>• What digital activities felt nourishing vs. draining?</li>
                    <li>• Did you maintain your intended boundaries?</li>
                    <li>• What adjustments would serve you better next week?</li>
                    <li>• How connected did you feel to yourself and others?</li>
                  </ul>
                </div>

                <blockquote className="border-l-4 border-brand-primary bg-brand-subtle/5 p-6 my-8 italic text-lg">
                  "The real question is not whether machines think but whether men do."
                  <footer className="text-sm text-gray-600 mt-2">- B.F. Skinner</footer>
                </blockquote>

                <p className="text-lg leading-relaxed mb-6">
                  Consider how digital wellness intersects with other aspects of well-being. Many people find that improvements in digital boundaries enhance their capacity for <a href="https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/stress-management/art-20044151" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">stress management</a>, relationship quality, and creative expression. Digital detox becomes not just about technology but about reclaiming space for the activities and connections that bring genuine fulfillment.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  Long-term success often involves finding community with others who share similar values around mindful technology use. <Link to="/retreats" className="text-brand-primary hover:underline">Wellness retreats</Link> focused on digital balance provide opportunities to reset habits and connect with like-minded individuals committed to conscious living in the digital age.
                </p>
              </BlogPostStory>

              <BlogPostConclusion title="Reclaiming Your Authentic Presence in a Digital World" isGated={true}>
                <p className="text-lg leading-relaxed mb-6">
                  Digital detox represents more than a temporary break from technology—it's a practice of reclaiming agency over your attention, time, and mental space. In a world designed to capture and monetize your focus, choosing presence becomes an act of self-respect and authentic living. <a href="https://www.apa.org/science/about/psa/2017/04/digital-wellness" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">Research consistently shows</a> that individuals who maintain healthy digital boundaries report higher life satisfaction, stronger relationships, and greater sense of purpose.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  The journey toward digital wellness is highly personal and requires ongoing adjustment as technology evolves and life circumstances change. What matters most is developing the awareness to notice when technology serves you versus when it controls you, and the skills to make conscious choices about how you engage with the digital world.
                </p>

                <p className="text-lg leading-relaxed">
                  Start small, be patient with yourself, and remember that every moment offers a fresh opportunity to choose presence over distraction. Whether you begin with a phone-free meal, a digital sunset routine, or a weekend retreat in nature, each step toward conscious technology use is a step toward greater freedom, authenticity, and well-being. The goal isn't to reject technology but to use it as a tool that supports your highest values and deepest aspirations.
                </p>
              </BlogPostConclusion>

              <RelatedReading 
                internalLinks={relatedLinks.internalLinks}
                exploreLinks={relatedLinks.exploreLinks}
              />

              <BlogPostCTA
                title="Ready to Reclaim Your Digital Well-being?"
                description="Discover retreats and programs that support healthy boundaries with technology while fostering deeper presence and authentic connection."
                primaryButtonText="Find Digital Wellness Retreats"
                primaryButtonLink="/retreats"
                secondaryButtonText="Connect with Mindfulness Instructors"
                secondaryButtonLink="/instructors"
              />

            </motion.div>
          </div>
        </section>

        <BeehiivNewsletterSignup />
      </main>

      <ContentGate 
        isVisible={shouldShowGate}
        onDismiss={dismissGate}
        articleTitle="The Art of Digital Detox: Reclaiming Your Mental Space"
      />

      <Footer />
    </>
  );
};

export default BlogPostDigitalDetox;
