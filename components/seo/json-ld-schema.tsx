import Script from 'next/script'

interface OrganizationSchemaProps {
  type?: 'Organization' | 'EducationalOrganization' | 'LocalBusiness'
}

export function OrganizationSchema({ type = 'EducationalOrganization' }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': type,
    name: 'Astrid Lindgren Zentrum',
    alternateName: 'ALZ',
    description: 'Eine moderne Privatschule in Wien mit ganzheitlichem Bildungskonzept',
    url: 'https://alz5.thesolution.at',
    logo: 'https://alz5.thesolution.at/images/logos/alz-logo.png',
    image: 'https://alz5.thesolution.at/og-image.svg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Breitenfurter Straße 401-413/1/R02',
      addressLocality: 'Wien',
      postalCode: '1230',
      addressCountry: 'AT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.140625,
      longitude: 16.285417,
    },
    telephone: '+43 1 887 40 53',
    email: 'office@astrid-lindgren-zentrum.at',
    sameAs: [],
    openingHours: ['Mo-Fr 08:00-17:00'],
    priceRange: '€€',
    areaServed: {
      '@type': 'City',
      name: 'Wien',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Bildungsangebote',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Vorschule',
            description: 'Vorschulische Bildung',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Grundschule',
            description: '1. bis 4. Schulstufe',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Unterstufe',
            description: '5. bis 8. Schulstufe',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Oberstufe',
            description: '9. Schulstufe',
          },
        },
      ],
    },
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
  category?: string
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author = 'Astrid Lindgren Zentrum',
  category,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    url: url,
    image: image || 'https://alz5.thesolution.at/og-image.svg',
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Astrid Lindgren Zentrum',
      logo: {
        '@type': 'ImageObject',
        url: 'https://alz5.thesolution.at/images/logos/alz-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    ...(category && { articleSection: category }),
  }

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    item: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface JobPostingSchemaProps {
  title: string
  description: string
  url: string
  datePosted: string
  validThrough?: string
  employmentType?: string
  location?: string
}

export function JobPostingSchema({
  title,
  description,
  url,
  datePosted,
  validThrough,
  employmentType = 'FULL_TIME',
  location = 'Wien',
}: JobPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: title,
    description: description,
    url: url,
    datePosted: datePosted,
    validThrough: validThrough,
    employmentType: employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Astrid Lindgren Zentrum',
      sameAs: 'https://alz5.thesolution.at',
      logo: 'https://alz5.thesolution.at/images/logos/alz-logo.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: location,
        addressCountry: 'AT',
      },
    },
  }

  return (
    <Script
      id="jobposting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface WebSiteSchemaProps {
  siteUrl: string
  siteName: string
  searchUrl?: string
}

export function WebSiteSchema({ siteUrl, siteName, searchUrl }: WebSiteSchemaProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: siteUrl,
    name: siteName,
    description: 'Eine moderne Privatschule in Wien mit ganzheitlichem Bildungskonzept',
    publisher: {
      '@type': 'Organization',
      name: siteName,
    },
  }

  if (searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    }
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
