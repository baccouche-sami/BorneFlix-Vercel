import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product' | 'service';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  structuredData?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = 'bornes de recharge, BorneFlix, installation bornes électriques, véhicule électrique, copropriété, IRVE certifié, infrastructure collective, recharge VE, solution de recharge, ADVENIR, aides financières, droit à la prise, installation rapide, économies énergie, maintenance incluse',
  image = 'https://borneflix.fr/images/borneflix-social.jpg',
  url = 'https://borneflix.fr',
  type = 'website',
  author = 'BorneFlix',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  structuredData
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.name = 'description';
      newMetaDescription.content = description;
      document.head.appendChild(newMetaDescription);
    }
    
    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const newMetaKeywords = document.createElement('meta');
      newMetaKeywords.name = 'keywords';
      newMetaKeywords.content = keywords;
      document.head.appendChild(newMetaKeywords);
    }
    
    // Update robots meta tag
    const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`;
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', robotsContent);
    } else {
      metaRobots = document.createElement('meta');
      metaRobots.name = 'robots';
      metaRobots.content = robotsContent;
      document.head.appendChild(metaRobots);
    }
    
    // Update Open Graph tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };
    
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    updateMetaTag('og:url', url);
    updateMetaTag('og:image', image);
    updateMetaTag('og:site_name', 'BorneFlix');
    updateMetaTag('og:locale', 'fr_FR');
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');
    updateMetaTag('og:image:alt', title);
    
    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[name="twitter:${name}"]`);
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', `twitter:${name}`);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };
    
    updateTwitterTag('card', 'summary_large_image');
    updateTwitterTag('title', title);
    updateTwitterTag('description', description);
    updateTwitterTag('image', image);
    updateTwitterTag('site', '@borneflix');
    updateTwitterTag('creator', '@borneflix');
    
    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', url);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      canonicalLink.setAttribute('href', url);
      document.head.appendChild(canonicalLink);
    }
    
    // Add language meta tag
    let metaLang = document.querySelector('meta[http-equiv="content-language"]');
    if (!metaLang) {
      metaLang = document.createElement('meta');
      metaLang.setAttribute('http-equiv', 'content-language');
      metaLang.setAttribute('content', 'fr');
      document.head.appendChild(metaLang);
    }
    
    // Add viewport meta tag if not present
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.name = 'viewport';
      metaViewport.content = 'width=device-width, initial-scale=1, shrink-to-fit=no';
      document.head.appendChild(metaViewport);
    }
    
    // Add theme color meta tag
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.name = 'theme-color';
      metaThemeColor.content = '#003566';
      document.head.appendChild(metaThemeColor);
    }
    
    // Add structured data
    const defaultStructuredData = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebPage',
      headline: title,
      description: description,
      image: image,
      url: url,
      author: {
        '@type': 'Organization',
        name: author,
        url: 'https://borneflix.fr'
      },
      publisher: {
        '@type': 'Organization',
        name: 'BorneFlix',
        url: 'https://borneflix.fr',
        logo: {
          '@type': 'ImageObject',
          url: 'https://borneflix.fr/images/logo.png',
          width: 200,
          height: 60
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+33-1-80-91-90-80',
          contactType: 'customer service',
          areaServed: 'FR',
          availableLanguage: 'French'
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '3 Av. des Orangers',
          addressLocality: 'Bonneuil-sur-Marne',
          postalCode: '94380',
          addressCountry: 'FR'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': url
      }
    };
    
    // Add article specific data
    if (type === 'article' && publishedTime) {
      defaultStructuredData.datePublished = publishedTime;
      defaultStructuredData.dateModified = modifiedTime || publishedTime;
      if (section) {
        defaultStructuredData.articleSection = section;
      }
      if (tags.length > 0) {
        defaultStructuredData.keywords = tags.join(', ');
      }
    }
    
    // Add service specific data for BorneFlix
    if (type === 'service') {
      defaultStructuredData['@type'] = 'Service';
      defaultStructuredData.serviceType = 'Installation de bornes de recharge IRVE';
      defaultStructuredData.areaServed = {
        '@type': 'Country',
        name: 'France'
      };
      defaultStructuredData.hasOfferCatalog = {
        '@type': 'OfferCatalog',
        name: 'Services BorneFlix',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Installation de bornes de recharge',
              description: 'Installation de bornes de recharge IRVE pour copropriétés'
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Maintenance de bornes de recharge',
              description: 'Maintenance et dépannage de bornes de recharge'
            }
          }
        ]
      };
    }
    
    // Use custom structured data if provided, otherwise use default
    const finalStructuredData = structuredData || defaultStructuredData;
    
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(finalStructuredData);
    document.head.appendChild(script);
    
    // Add meta tags for section and tags
    if (section) {
      const metaSection = document.querySelector('meta[name="article:section"]');
      if (metaSection) {
        metaSection.setAttribute('content', section);
      } else {
        const newMetaSection = document.createElement('meta');
        newMetaSection.name = 'article:section';
        newMetaSection.content = section;
        document.head.appendChild(newMetaSection);
      }
    }
    
    if (tags.length > 0) {
      tags.forEach((tag, index) => {
        const metaTag = document.querySelector(`meta[name="article:tag:${index}"]`);
        if (metaTag) {
          metaTag.setAttribute('content', tag);
        } else {
          const newMetaTag = document.createElement('meta');
          newMetaTag.name = `article:tag:${index}`;
          newMetaTag.content = tag;
          document.head.appendChild(newMetaTag);
        }
      });
    }
    
    // Add hreflang tags for internationalization
    const hreflangTags = [
      { lang: 'fr', url: url },
      { lang: 'en', url: url.replace('borneflix.fr', 'borneflix.fr/en') }
    ];
    
    hreflangTags.forEach(({ lang, url }) => {
      let hreflangLink = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
      if (hreflangLink) {
        hreflangLink.setAttribute('href', url);
      } else {
        hreflangLink = document.createElement('link');
        hreflangLink.setAttribute('rel', 'alternate');
        hreflangLink.setAttribute('hreflang', lang);
        hreflangLink.setAttribute('href', url);
        document.head.appendChild(hreflangLink);
      }
    });
    
  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime, section, tags, noindex, nofollow, structuredData]);
  
  return null; // This component doesn't render anything
};

export default SEOHead; 