
export const seoConfig = {
  // High-authority external links for wellness/mindfulness content
  authorityLinks: {
    // Medical & Health Organizations
    mayoClinic: 'https://www.mayoclinic.org',
    harvardHealth: 'https://www.health.harvard.edu',
    johnshopkins: 'https://www.hopkinsmedicine.org',
    who: 'https://www.who.int',
    nih: 'https://www.ncbi.nlm.nih.gov',
    apa: 'https://www.apa.org',
    
    // Educational & Research
    stanford: 'https://med.stanford.edu',
    edutopia: 'https://www.edutopia.org',
    childMind: 'https://www.childmind.org',
    
    // Wellness Organizations
    mindful: 'https://www.mindful.org',
    selfCompassion: 'https://self-compassion.org',
    healthline: 'https://www.healthline.com',
    
    // Sustainability & Social Impact
    sustainableBrands: 'https://www.sustainablebrands.com',
    epa: 'https://www.epa.gov',
    traumaInformed: 'https://www.traumainformedoregon.org'
  },
  
  // Common internal link patterns for cross-promotion
  internalLinks: {
    retreats: '/retreats',
    instructors: '/instructors',
    wellnessStudios: '/wellness-studios',
    blog: '/blog',
    community: '/community',
    about: '/about'
  },
  
  // Topic-specific external link databases
  topicLinks: {
    breathwork: {
      research: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7367555/',
      techniques: 'https://www.healthline.com/health/breathing-exercise',
      benefits: 'https://www.mayoclinic.org/healthy-lifestyle/stress-management/in-depth/decrease-stress-by-using-your-breath/art-20267197'
    },
    meditation: {
      science: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6971819/',
      mindfulness: 'https://www.mindful.org/meditation/mindfulness-getting-started/',
      retreats: 'https://www.health.harvard.edu/blog/meditation-offers-significant-heart-benefits-2013050616007'
    },
    yoga: {
      benefits: 'https://www.mayoclinic.org/healthy-lifestyle/fitness/in-depth/yoga/art-20044733',
      beginner: 'https://www.healthline.com/health/fitness/yoga-for-beginners',
      styles: 'https://www.yogajournal.com/yoga-101/types-of-yoga/'
    },
    wellness: {
      burnout: 'https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases',
      mentalHealth: 'https://www.apa.org/topics/stress/manage',
      workplace: 'https://www.cdc.gov/workplacehealthpromotion/tools-resources/workplace-health/mental-health/index.html'
    },
    natureTherapy: {
      forestBathing: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6225498/',
      benefits: 'https://www.healthline.com/health/forest-bathing',
      research: 'https://www.nature.com/articles/s41598-019-44097-3'
    },
    soundTherapy: {
      science: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4672022/',
      benefits: 'https://www.healthline.com/health/sound-healing',
      instruments: 'https://www.mindful.org/what-is-sound-healing/'
    }
  },
  
  // SEO-optimized anchor text patterns
  anchorTextPatterns: {
    meditation: ['meditation practices', 'contemplative practices', 'mindfulness meditation'],
    wellness: ['wellness programs', 'holistic wellness', 'well-being practices'],
    stress: ['stress reduction', 'stress management', 'anxiety relief'],
    research: ['scientific research', 'evidence-based studies', 'clinical studies'],
    education: ['mindfulness education', 'contemplative education', 'wellness training']
  },
  
  // Common meta descriptions for blog categories
  metaDescriptions: {
    meditation: 'Discover evidence-based meditation techniques and practices to enhance your mindfulness journey.',
    wellness: 'Expert wellness insights and holistic health practices for optimal well-being.',
    retreats: 'Comprehensive guides to meditation retreats and transformative wellness experiences.',
    breathwork: 'Master powerful breathing techniques for stress reduction and inner peace.',
    yoga: 'Explore yoga practices, philosophy, and their integration into modern wellness.',
    news: 'Latest developments in mindfulness, meditation, and wellness from around the world.',
    natureTherapy: 'Discover the healing power of nature and forest bathing practices.',
    soundTherapy: 'Explore the therapeutic benefits of sound healing and vibrational medicine.'
  }
};

// Helper function to generate structured data for blog posts
export const generateBlogStructuredData = (article: {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  image: string;
  category: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "datePublished": article.date,
    "image": article.image,
    "publisher": {
      "@type": "Organization",
      "name": "Sanghos",
      "url": "https://sanghos.com"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };
};
