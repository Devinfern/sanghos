
import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "event";
  twitterCard?: "summary" | "summary_large_image";
  structuredData?: object;
  noIndex?: boolean;
  noFollow?: boolean;
}

const SEOHead = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = "https://cdn.prod.website-files.com/5f4ea075a29c8a2cdbea8488/60cf78de347c3939651a25ef_Sanghos.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false,
  noFollow = false
}: SEOHeadProps) => {
  const siteUrl = "https://sanghos.com";
  const defaultTitle = "Sanghos | Wellness Retreats in Private Homes";
  const defaultDescription = "Discover transformative daylong wellness retreats hosted by expert instructors in unique private spaces. Mindfulness, yoga, meditation, and more.";
  
  const finalTitle = title ? `${title} | Sanghos` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalCanonicalUrl = canonicalUrl || siteUrl;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  const robotsContent = [
    noIndex ? "noindex" : "index",
    noFollow ? "nofollow" : "follow"
  ].join(", ");

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <meta name="author" content="Sanghos" />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalCanonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:url" content={finalCanonicalUrl} />
      <meta property="og:site_name" content="Sanghos" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@sanghos" />
      <meta name="twitter:creator" content="@sanghos" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#8B7355" />
      <meta name="msapplication-TileColor" content="#8B7355" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
