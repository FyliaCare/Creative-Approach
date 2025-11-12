import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Creative Approach - Professional Drone Services in Ghana',
  description = 'Leading drone services provider in Ghana offering aerial photography, surveying, inspection, and documentary production. GCAA certified with 500+ projects completed.',
  keywords = 'drone services ghana, aerial photography ghana, drone surveying, drone inspection, documentary production, GCAA certified drones, mapping services ghana, takoradi drone services',
  image = 'https://creative-approach.com.gh/og-image.jpg',
  url = 'https://creative-approach.com.gh',
  type = 'website',
  author = 'Creative Approach',
  publishedTime,
  modifiedTime,
  schemaType = 'Organization',
  schemaData = {}
}) {
  const siteName = 'Creative Approach';
  const twitterHandle = '@CreativeApproachGH';

  // Default Organization Schema
  const defaultOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Creative Approach',
    description: 'Professional drone services provider in Ghana',
    url: 'https://caghana.com',
    logo: 'https://caghana.com/creative-approach-black.png',
    image: 'https://caghana.com/og-image.jpg',
    telephone: '+233 541 500 716',
    email: 'sales@caghana.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Takoradi',
      addressRegion: 'Western Region',
      addressCountry: 'Ghana'
    },
    sameAs: [
      'https://facebook.com/creativeapproachgh',
      'https://instagram.com/creativeapproachgh',
      'https://linkedin.com/company/creative-approach',
      'https://twitter.com/creativeapproachgh'
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Ghana'
    },
    serviceType: [
      'Aerial Photography',
      'Drone Inspection',
      'Surveying and Mapping',
      'Documentary Production',
      'Drone Training'
    ]
  };

  // Merge custom schema data with defaults
  const schema = schemaType === 'Organization' 
    ? { ...defaultOrgSchema, ...schemaData }
    : schemaData;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_GH" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Geo Tags */}
      <meta name="geo.region" content="GH-WP" />
      <meta name="geo.placename" content="Takoradi" />
      <meta name="geo.position" content="4.8965;-1.7559" />
      <meta name="ICBM" content="4.8965, -1.7559" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Preset SEO configs for different page types
export const seoPresets = {
  home: {
    title: 'Creative Approach - Professional Drone Services in Ghana | Aerial Photography & Surveying',
    description: 'Ghana\'s leading drone services provider. GCAA certified aerial photography, surveying, inspection, and documentary production. 500+ projects completed. Based in Takoradi, serving all of Ghana.',
    keywords: 'drone services ghana, aerial photography ghana, drone surveying takoradi, GCAA certified drones, professional drone pilot ghana, mapping services, infrastructure inspection, real estate photography ghana',
    schemaType: 'Organization'
  },
  
  services: {
    title: 'Drone Services Ghana - Aerial Photography, Surveying, Inspection | Creative Approach',
    description: 'Comprehensive drone services: aerial photography/videography, infrastructure inspection, mapping & surveying, documentary production, training, and emergency response. GCAA certified operators.',
    keywords: 'drone services, aerial photography, drone inspection, surveying, mapping, 3D modeling, documentary production, drone training, emergency response ghana',
    schemaType: 'Service'
  },

  aerialPhotography: {
    title: 'Aerial Photography & Videography Ghana - 8K Drone Cinematography | Creative Approach',
    description: 'Professional aerial photography and videography services in Ghana. 8K ultra HD, cinematic quality, real estate marketing, events, tourism. 500+ projects completed. Prices from GHS 1,500.',
    keywords: 'aerial photography ghana, drone videography, 8K aerial footage, real estate photography, event coverage, tourism photography, commercial drone photography takoradi',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Aerial Photography & Videography',
      provider: {
        '@type': 'Organization',
        name: 'Creative Approach'
      },
      description: 'Professional aerial photography and videography using 8K drones',
      areaServed: 'Ghana',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GHS',
        price: '1500',
        priceRange: 'GHS 1,500 - 6,500'
      }
    }
  },

  droneInspection: {
    title: 'Drone Inspection Services Ghana - Infrastructure & Building Assessment | Creative Approach',
    description: 'Professional drone inspection services for buildings, infrastructure, solar panels, and industrial facilities. Thermal imaging, safety compliance, detailed reports. 99.5% accuracy guaranteed.',
    keywords: 'drone inspection ghana, building inspection, infrastructure assessment, thermal imaging, roof inspection, solar panel inspection, industrial inspection takoradi',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Drone Inspection & Monitoring',
      provider: {
        '@type': 'Organization',
        name: 'Creative Approach'
      },
      description: 'Safe and efficient infrastructure inspections using thermal imaging drones',
      areaServed: 'Ghana',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GHS',
        price: '2000',
        priceRange: 'GHS 2,000 - 8,000'
      }
    }
  },

  mappingSurveying: {
    title: 'Drone Surveying & Mapping Ghana - RTK Precision ±2cm Accuracy | Creative Approach',
    description: 'Survey-grade drone mapping and 3D modeling services. RTK positioning, orthomosaic maps, DEMs, volumetric analysis, GIS-ready data. ±2cm accuracy. 500+ projects completed.',
    keywords: 'drone surveying ghana, mapping services, 3D modeling, orthomosaic, topographic survey, volumetric analysis, GIS data, RTK surveying takoradi',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Mapping, Surveying & 3D Modelling',
      provider: {
        '@type': 'Organization',
        name: 'Creative Approach'
      },
      description: 'Survey-grade mapping with RTK accuracy for construction, mining, and land development',
      areaServed: 'Ghana',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GHS',
        price: '3500',
        priceRange: 'GHS 3,500 - 15,000'
      }
    }
  },

  documentaryFilms: {
    title: 'Documentary Film Production Ghana - Professional Aerial Cinematography | Creative Approach',
    description: 'Full-service documentary production with aerial cinematography. Corporate stories, cultural heritage, environmental films. 50+ films produced, 5M+ views, award-winning team.',
    keywords: 'documentary production ghana, film making, aerial cinematography, corporate video, cultural documentation, environmental films, professional videography takoradi',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Documentary Films & Photography',
      provider: {
        '@type': 'Organization',
        name: 'Creative Approach'
      },
      description: 'Professional documentary production combining aerial and ground cinematography',
      areaServed: 'Ghana',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GHS',
        price: '15000',
        priceRange: 'GHS 15,000+'
      }
    }
  },

  customTraining: {
    title: 'GCAA Drone Training Ghana - RPL License Certification | Creative Approach',
    description: 'Official GCAA-certified drone training programs. Remote Pilot License (RPL) certification, corporate training, data processing. 500+ graduates, 98% pass rate. Enroll today.',
    keywords: 'drone training ghana, GCAA certification, RPL license, drone pilot training, corporate drone training, drone license takoradi, aviation training',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: 'GCAA Drone Pilot Training',
      provider: {
        '@type': 'Organization',
        name: 'Creative Approach'
      },
      description: 'Complete GCAA Remote Pilot License certification program',
      areaServed: 'Ghana',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GHS',
        price: '8500',
        priceRange: 'GHS 3,500 - 8,500'
      }
    }
  },

  emergencyResponse: {
    title: '24/7 Emergency Drone Response Ghana - Search & Rescue, Disaster Assessment | Creative Approach',
    description: '24/7 rapid emergency drone deployment. Search & rescue, fire assessment, disaster response, security surveillance. <2hr response time. Thermal imaging, real-time streaming.',
    keywords: 'emergency drone response ghana, search and rescue, disaster assessment, fire monitoring, security surveillance, thermal imaging, 24/7 drone services takoradi',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Emergency Response & Surveillance',
      provider: {
        '@type': 'Organization',
        name: 'Creative Approach'
      },
      description: '24/7 rapid drone deployment for emergency situations with thermal imaging',
      areaServed: 'Ghana',
      availability: '24/7',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'GHS',
        price: '2500',
        priceRange: 'GHS 2,500+'
      }
    }
  },

  portfolio: {
    title: 'Drone Portfolio Ghana - Aerial Photography Projects | Creative Approach',
    description: 'Browse our portfolio of 500+ completed drone projects across Ghana. Aerial photography, surveying, inspections, and documentary work. See the quality of our GCAA-certified services.',
    keywords: 'drone portfolio ghana, aerial photography examples, drone project gallery, professional drone work, commercial drone photography samples',
    schemaType: 'ImageGallery'
  },

  about: {
    title: 'About Creative Approach - GCAA Certified Drone Company in Takoradi, Ghana',
    description: 'Leading drone services provider in Ghana since [year]. GCAA certified operators, 500+ projects completed, GHS 2M+ insurance coverage. Based in Takoradi, Western Region.',
    keywords: 'about creative approach, drone company ghana, GCAA certified, professional drone services, takoradi drone company, ghana drone operators',
    schemaType: 'AboutPage'
  },

  contact: {
    title: 'Contact Creative Approach - Get a Free Drone Services Quote | Ghana',
    description: 'Contact Ghana\'s leading drone services provider. Free quotes, 24/7 emergency hotline, offices in Takoradi. Call +233 541 500 716 or email sales@caghana.com',
    keywords: 'contact creative approach, drone services quote, free consultation, takoradi drone services, ghana drone contact',
    schemaData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      mainEntity: {
        '@type': 'Organization',
        name: 'Creative Approach',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+233-123-456-789',
          contactType: 'Customer Service',
          areaServed: 'GH',
          availableLanguage: ['English']
        }
      }
    }
  },

  blog: {
    title: 'Drone Blog Ghana - Aerial Photography Tips & Industry News | Creative Approach',
    description: 'Latest drone industry news, aerial photography tips, surveying techniques, and project showcases from Ghana\'s leading drone services provider.',
    keywords: 'drone blog ghana, aerial photography tips, drone industry news, surveying techniques, drone technology ghana',
    schemaType: 'Blog'
  },

  industries: {
    title: 'Industries We Serve - Professional Drone Services Across Sectors | Ghana',
    description: 'Providing specialized drone services across construction, real estate, agriculture, mining, oil & gas, media production, and infrastructure sectors in Ghana.',
    keywords: 'drone services industries, construction drones, real estate aerial photography, agriculture surveying, mining inspections, ghana drone sectors',
    schemaType: 'Service'
  },

  privacy: {
    title: 'Privacy Policy - Creative Approach Drone Services Ghana',
    description: 'Privacy policy for Creative Approach drone services. Learn how we collect, use, and protect your personal information in compliance with Ghana data protection laws.',
    keywords: 'privacy policy, data protection, creative approach privacy, ghana privacy law compliance'
  },

  terms: {
    title: 'Terms of Service - Creative Approach Drone Services Ghana',
    description: 'Terms and conditions for using Creative Approach drone services. Service agreements, liability, intellectual property rights, and legal information.',
    keywords: 'terms of service, service agreement, legal terms, drone services contract, ghana legal compliance'
  }
};
