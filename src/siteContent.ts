/** Set VITE_SITE_URL in .env to your live domain (e.g. https://petcure.pk) for canonical & JSON-LD. */
export const site = {
  clinicName: 'PET CURE',
  tagline: 'Pet cure in Lahore — clinic visits, home calls, and emergency support when your pet needs it most.',
  phoneDisplay: '0304 9296100',
  phoneTel: '+923049296100',
  email: 'petcure00@gmail.com',
  address: {
    lines: [
      'F6QP+PXV, Niazbeg Road',
      'Thokar Niaz Baig, Lahore 53700',
      'Pakistan',
    ],
    mapsUrl: 'https://maps.app.goo.gl/EyCYN491RLMrXzDj6',
    mapsEmbedSrc:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8732.422556921143!2d74.23686486124112!3d31.496764316433488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903006e0860c3%3A0xe74082b95c55cf56!2sPet%20Cure%20Clinic%20and%20Medical%20Store!5e0!3m2!1sen!2s!4v1778334234899!5m2!1sen!2s',
  },
  whatsAppHref:
    'https://wa.me/923049296100?text=' +
    encodeURIComponent('Hello PET CURE, I would like to ask about '),
  establishedNote: 'Lahore · Clinic & home visits',
  heroCta: 'Hours & location',
  /** Short lines under the hero headline (checklist). */
  heroBullets: [
    'Clinic & home visits with one consistent care team',
    'Vaccination, treatment, and on-site pharmacy',
    'Emergency support when minutes matter',
  ],
  services: {
    title: 'What we offer',
    subtitle: 'From routine check-ups to urgent care — modern diagnostics with a gentle approach.',
    items: [
      'Clinic & home visits, check-ups, and emergency care — all under one roof.',
      'Modern technology with a caring touch — trusted care for every stage of your pet’s life.',
      'Vaccination and treatment to keep your pet healthy and safe.',
      'In-house medicine facility — convenient access to pet medications and supplements. Full-service medical store on premises.',
    ],
  },
  testimonials: {
    title: 'What pet parents say',
    lead: 'Honest feedback from people who have brought their companions to PET CURE.',
    items: [
      {
        name: 'Ali Shan',
        rating: 5,
        review:
          'Dr is a gem of a person and one of the very few vets that loves the animals as much as you do. been taking my cat to him for 2 years now and in any situation he is available and will give best advice. -Professionalism -Kindness -Putting scared animals at ease -Fair pricing -Truly caring about an animal’s well being',
      },
      {
        name: 'Abdullah Arshad',
        rating: 5,
        review: 'Nice doctors.',
      },
      {
        name: 'Naveedm Meher',
        rating: 5,
        review: '',
      },
      {
        name: 'Hamza Najam',
        rating: 5,
        review: '',
      },
    ],
  },
  hours: {
    title: 'Opening hours',
    rows: [{ day: 'Monday – Sunday', time: '8:00 a.m. – 10:00 p.m.' }],
    note: 'Same hours every day including weekends. For emergencies, call ahead so we can prepare for your arrival.',
  },
  contact: {
    title: 'Visit or call',
    body: 'Call or email to book an appointment or to ask about home visits. For urgent situations, phone us first for the fastest guidance.',
  },
  footer: {
    legal: 'PET CURE. All rights reserved.',
    disclaimer:
      'This site provides general information only and is not a substitute for professional veterinary advice. Always consult a qualified veterinarian for diagnosis and treatment.',
  },
  seo: {
    title: 'PET CURE | Pet Clinic Lahore — Home Visits & Emergency Care',
    description:
      'PET CURE pet clinic on Niazbeg Road, Thokar Niaz Baig, Lahore. Clinic & home visits, vaccination, emergency care, and on-site pet pharmacy. Open daily 8 AM – 10 PM.',
    keywords:
      'PET CURE, pet clinic Lahore, pet doctor Thokar Niaz Baig, home visit vet Pakistan, pet vaccination Lahore, emergency vet Lahore',
    locale: 'en_PK',
    defaultOgImage: 'favicon/favicon.svg',
  },
} as const

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) {
    return fromEnv.replace(/\/$/, '')
  }
  if (typeof window === 'undefined') {
    return ''
  }
  const { origin, pathname } = window.location
  const viteBase = import.meta.env.BASE_URL || '/'

  if (viteBase.startsWith('/') && viteBase.length > 1) {
    const path = viteBase.replace(/\/$/, '')
    return `${origin}${path}`
  }

  const pathOnly = pathname.endsWith('/')
    ? pathname.slice(0, -1)
    : pathname.replace(/\/[^/]+$/, '')
  const joined = pathOnly ? `${origin}${pathOnly}` : origin
  return joined.replace(/\/$/, '') || origin
}
