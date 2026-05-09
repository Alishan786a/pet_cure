import { site, getSiteUrl } from './siteContent'

export function buildLocalBusinessJsonLd(): object {
  const url = getSiteUrl() || 'https://petcure.example'
  return {
    '@context': 'https://schema.org',
    '@type': 'VeterinaryCare',
    '@id': `${url}/#organization`,
    name: site.clinicName,
    description: site.seo.description,
    url,
    telephone: site.phoneTel,
    email: site.email,
    image: url ? new URL(site.seo.defaultOgImage, `${url}/`).href : site.seo.defaultOgImage,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'F6QP+PXV, Niazbeg Road, Thokar Niaz Baig',
      addressLocality: 'Lahore',
      postalCode: '53700',
      addressCountry: 'PK',
    },
    hasMap: site.address.mapsUrl,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '08:00',
        closes: '22:00',
      },
    ],
    areaServed: {
      '@type': 'City',
      name: 'Lahore',
    },
  }
}
