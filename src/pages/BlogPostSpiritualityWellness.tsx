
import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostHero from '@/components/blog/BlogPostHero';
import BlogPostStory from '@/components/blog/BlogPostStory';
import BlogPostConclusion from '@/components/blog/BlogPostConclusion';
import BlogPostCTA from '@/components/blog/BlogPostCTA';
import RelatedReading from '@/components/blog/RelatedReading';
import SEOLink from '@/components/blog/SEOLink';
import OptimizedImage from '@/components/OptimizedImage';
import BeehiivNewsletterSignup from '@/components/BeehiivNewsletterSignup';
import { Heart, Brain, Users, Compass, Mountain, Star } from 'lucide-react';
import { generateBlogStructuredData } from '@/lib/seoConfig';

const BlogPostSpiritualityWellness = () => {
  const articleData = {
    title: 'The Science of Spiritual Wellness: Why Connection Matters More Than Ever',
    excerpt: 'Emerging research reveals how spiritual health—from finding purpose to fostering connection—directly impacts our physical and mental well-being, especially for younger generations seeking meaning.',
    author: 'Devin Fernandez',
    date: 'June 26, 2025',
    image: '/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg',
    category: 'Wellness Research'
  };

  const structuredData = generateBlogStructuredData(articleData);

  return (
    <>
      <Helmet>
        <title>{articleData.title} | Sanghos</title>
        <meta name="description" content={articleData.excerpt} />
        <meta property="og:title" content={articleData.title} />
        <meta property="og:description" content={articleData.excerpt} />
        <meta property="og:image" content={articleData.image} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={articleData.title} />
        <meta name="twitter:description" content={articleData.excerpt} />
        <meta name="twitter:image" content={articleData.image} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <Header />

      <main className="bg-white">
        <BlogPostHero
          title={articleData.title}
          excerpt={articleData.excerpt}
          author={articleData.author}
          date={articleData.date}
          readTime="8 min read"
          category={articleData.category}
        />

        {/* Hero Image */}
        <div className="container mx-auto max-w-4xl px-4 md:px-6 -mt-8 mb-16">
          <OptimizedImage
            src="/lovable-uploads/cf8fc774-aba1-4ccc-a684-8a94a89150ce.jpg"
            alt="Peaceful meditation scene representing spiritual wellness"
            className="w-full h-[400px] rounded-2xl shadow-lg"
            aspectRatio="custom"
            objectFit="cover"
          />
        </div>

        <div className="container mx-auto max-w-4xl px-4 md:px-6">
          <BlogPostStory
            icon={Heart}
            title="Beyond the Mystical: The Science of Spiritual Health"
          >
            <p className="mb-6">
              For too long, spirituality has been relegated to the realm of the "woo-woo"—dismissed by mainstream healthcare as unscientific or irrelevant. But a growing body of research is revealing something profound: our spiritual well-being may be just as crucial to our health as proper nutrition and regular exercise.
            </p>
            
            <p className="mb-6">
              Recent studies published in leading medical journals show that individuals with strong spiritual beliefs experience <SEOLink href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6349772/">significantly lower rates of all-cause mortality, depression, and substance use disorders</SEOLink>. This isn't about divine intervention—it's about the very real, measurable impact of having a sense of meaning, purpose, and connection to something larger than ourselves.
            </p>

            <p className="mb-6">
              Researchers are now calling spirituality a <SEOLink href="https://www.who.int/news/item/03-06-2021-social-determinants-of-health">social determinant of health</SEOLink> that deserves clinical attention. Yet despite this mounting evidence, only 7% of medical schools currently require coursework on spirituality's role in health, and nearly half of public health graduate students report that the topic is never even mentioned in their education.
            </p>

            <div className="bg-sage-50 rounded-xl p-6 my-8">
              <h4 className="font-semibold text-lg mb-3">What is Spiritual Health?</h4>
              <p className="text-brand-slate">
                Spiritual health encompasses having a sense of meaning and purpose in life, feeling connected to something greater than oneself (whether through religion, nature, or human connection), and maintaining hope and resilience in the face of challenges.
              </p>
            </div>
          </BlogPostStory>

          <BlogPostStory
            icon={Brain}
            title="The Generation Gap: Why Young People Are Struggling"
          >
            <p className="mb-6">
              While the science supports spirituality's importance, cultivating spiritual health is becoming increasingly challenging—especially for younger generations. The data reveals a concerning trend that affects not just individual well-being, but our collective future.
            </p>

            <p className="mb-6">
              <SEOLink href="https://www.apa.org/science/about/psa/2022/10/gen-z-mental-health">Gen Z individuals are three times more likely than baby boomers to struggle with spiritual health</SEOLink>. Even more striking, young people with poor spiritual health are up to four times less likely to have good mental health and twice as likely to experience poor physical and social health outcomes.
            </p>

            <p className="mb-6">
              This generation reports unprecedented levels of purposelessness and lack of resilience. In response, many are turning to wellness trends and paying premium prices for social experiences—desperately searching for the connection and meaning that previous generations often found through traditional spiritual communities.
            </p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
                <Star className="h-8 w-8 text-brand-primary mb-3" />
                <h4 className="font-semibold mb-2">The Search for Meaning</h4>
                <p className="text-sm text-brand-slate">
                  Young adults are increasingly seeking purpose through wellness retreats, meditation apps, and alternative spiritual practices.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-sage-50 rounded-xl p-6">
                <Users className="h-8 w-8 text-brand-primary mb-3" />
                <h4 className="font-semibold mb-2">Connection Crisis</h4>
                <p className="text-sm text-brand-slate">
                  Despite being hyper-connected digitally, many report feeling more isolated and disconnected than ever before.
                </p>
              </div>
            </div>
          </BlogPostStory>

          <BlogPostStory
            icon={Mountain}
            title="The Wellness Renaissance: Finding Faith in New Forms"
          >
            <p className="mb-6">
              As concepts like <SEOLink href="/blog/forest-bathing-guide" isExternal={false}>forest bathing</SEOLink>, <SEOLink href="/blog/sound-healing-benefits" isExternal={false}>sound healing</SEOLink>, and <SEOLink href="/blog/mindful-breathing-techniques" isExternal={false}>breathwork</SEOLink> enter the mainstream, we're witnessing a spiritual renaissance. Young people are rediscovering ancient wisdom through modern wellness practices.
            </p>

            <p className="mb-6">
              This shift represents more than just a trend—it's a fundamental reimagining of what spiritual health can look like in the 21st century. Whether through meditation retreats in nature, community yoga practices, or mindfulness-based stress reduction programs, people are finding new pathways to meaning and connection.
            </p>

            <p className="mb-6">
              <SEOLink href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6971819/">Research on meditation and mindfulness practices</SEOLink> shows they can provide many of the same benefits traditionally associated with religious practices: reduced anxiety, increased sense of purpose, stronger community connections, and greater resilience in facing life's challenges.
            </p>

            <div className="bg-white border border-sage-200 rounded-xl p-6 my-8">
              <h4 className="font-semibold text-lg mb-4">Modern Paths to Spiritual Wellness</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Compass className="h-5 w-5 text-brand-primary mt-0.5" />
                  <span><strong>Nature Connection:</strong> Forest bathing, hiking meditation, and outdoor mindfulness practices</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="h-5 w-5 text-brand-primary mt-0.5" />
                  <span><strong>Community Practices:</strong> Group meditation, yoga communities, and wellness retreats</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="h-5 w-5 text-brand-primary mt-0.5" />
                  <span><strong>Service & Purpose:</strong> Volunteer work, environmental activism, and social justice initiatives</span>
                </li>
                <li className="flex items-start gap-3">
                  <Compass className="h-5 w-5 text-brand-primary mt-0.5" />
                  <span><strong>Creative Expression:</strong> Art therapy, music meditation, and contemplative arts</span>
                </li>
              </ul>
            </div>
          </BlogPostStory>

          <BlogPostConclusion title="Coming Full Circle: The Future of Holistic Health">
            <p className="mb-6">
              We're witnessing a remarkable convergence. Post-Enlightenment thinking understandably separated organized religion from health science, creating necessary boundaries between faith and evidence-based medicine. Now, centuries later, we're coming full circle with a more nuanced understanding.
            </p>

            <p className="mb-6">
              Leading health experts are beginning to recognize that faith—whether rooted in religion, nature, or human connection—may be as vital to our well-being as proper nutrition and regular exercise. The key difference is that we now have the scientific tools to understand why and how spiritual practices benefit our health.
            </p>

            <p className="mb-6">
              As we face rising rates of anxiety, depression, and social isolation, particularly among young people, addressing spiritual health isn't just nice to have—it's essential. The future of wellness lies not in choosing between science and spirituality, but in understanding how they can work together to support human flourishing.
            </p>

            <p>
              Whether through traditional religious practice, meditation retreats, nature immersion, or community service, the path to spiritual wellness is deeply personal. What matters most is finding practices that connect you to something greater than yourself and provide a sense of meaning and purpose in your daily life.
            </p>
          </BlogPostConclusion>

          <BlogPostCTA
            title="Ready to Explore Your Spiritual Wellness Journey?"
            description="Discover retreats and practices that can help you cultivate deeper meaning, connection, and purpose in your life."
            primaryButtonText="Browse Spiritual Retreats"
            primaryButtonLink="/retreats"
            secondaryButtonText="Read More Wellness Insights"
            secondaryButtonLink="/blog"
          />

          <RelatedReading
            internalLinks={[
              { title: "Mindful Breathing Techniques: Your Gateway to Inner Peace", href: "/blog/mindful-breathing-techniques" },
              { title: "Forest Bathing: Why Nature Heals", href: "/blog/forest-bathing-guide" },
              { title: "Sound Healing: Ancient Practice for Modern Stress", href: "/blog/sound-healing-benefits" }
            ]}
            externalLinks={[
              { title: "Spirituality and Health Research", href: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6349772/" },
              { title: "WHO on Social Determinants of Health", href: "https://www.who.int/news/item/03-06-2021-social-determinants-of-health" },
              { title: "Gen Z Mental Health Research", href: "https://www.apa.org/science/about/psa/2022/10/gen-z-mental-health" }
            ]}
          />
        </div>

        <BeehiivNewsletterSignup />
      </main>

      <Footer />
    </>
  );
};

export default BlogPostSpiritualityWellness;
