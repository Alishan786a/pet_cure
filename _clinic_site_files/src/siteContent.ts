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
  },
  establishedNote: 'Lahore · Clinic & home visits',
  heroCta: 'Hours & location',
  about: {
    title: 'Care built around your pet',
    lead: 'At PET CURE we treat every animal like family — calm handling, clear explanations, and treatment plans you can follow at home.',
    points: [
      {
        title: 'Clinic & home visits',
        text: 'Bring your pet to our facility or request a home visit when travel is difficult. Same team, consistent records.',
      },
      {
        title: 'Emergency-ready mindset',
        text: 'When something goes wrong, you need a team that responds quickly. We prioritize urgent cases and guide you on next steps.',
      },
      {
        title: 'On-site pharmacy',
        text: 'Prescribed medications and quality supplements available on premises so you can start treatment without an extra stop.',
      },
    ],
  },
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
    defaultOgImage: '/favicon/web-app-manifest-512x512.png',
  },
} as const

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) {
    return fromEnv.replace(/\/$/, '')
  }
  return typeof window !== 'undefined' ? window.location.origin : ''
}
