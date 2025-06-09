
interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  contactPoint?: {
    telephone?: string;
    contactType?: string;
    email?: string;
  };
}

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  organizer: {
    name: string;
    url?: string;
  };
  offers?: {
    price: number;
    currency: string;
    availability: string;
  };
  image?: string;
}

interface InstructorSchemaProps {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
}

export const createOrganizationSchema = ({
  name = "Sanghos",
  url = "https://sanghos.com",
  logo = "https://cdn.prod.website-files.com/5f4ea075a29c8a2cdbea8488/60cf78de347c3939651a25ef_Sanghos.jpg",
  description = "Transformative wellness retreats in private homes with expert instructors",
  address,
  contactPoint
}: OrganizationSchemaProps = {}) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name,
  url,
  logo: {
    "@type": "ImageObject",
    url: logo
  },
  description,
  ...(address && {
    address: {
      "@type": "PostalAddress",
      ...address
    }
  }),
  ...(contactPoint && {
    contactPoint: {
      "@type": "ContactPoint",
      ...contactPoint
    }
  }),
  sameAs: [
    "https://www.instagram.com/sanghos",
    "https://www.facebook.com/sanghos"
  ]
});

export const createEventSchema = ({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  offers,
  image
}: EventSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name,
  description,
  startDate,
  ...(endDate && { endDate }),
  location: {
    "@type": "Place",
    name: location.name,
    address: location.address
  },
  organizer: {
    "@type": "Organization",
    name: organizer.name,
    ...(organizer.url && { url: organizer.url })
  },
  ...(offers && {
    offers: {
      "@type": "Offer",
      price: offers.price,
      priceCurrency: offers.currency,
      availability: `https://schema.org/${offers.availability}`
    }
  }),
  ...(image && {
    image: {
      "@type": "ImageObject",
      url: image
    }
  })
});

export const createPersonSchema = ({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs = []
}: InstructorSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  jobTitle,
  ...(description && { description }),
  ...(image && {
    image: {
      "@type": "ImageObject",
      url: image
    }
  }),
  ...(url && { url }),
  ...(sameAs.length > 0 && { sameAs })
});

export const createLocalBusinessSchema = (locationName: string, address: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: `Sanghos Retreat - ${locationName}`,
  description: "Wellness retreat location offering mindfulness and meditation experiences",
  address: {
    "@type": "PostalAddress",
    streetAddress: address
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Sanghos"
  }
});

export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url
  }))
});
