// Central settings for coastalsinus.com. Edit here, everything else reads from this file.
module.exports = {
  name: 'Coastal Sinus',
  domain: 'coastalsinus.com',
  url: 'https://coastalsinus.com',
  tagline: 'Sinus health for the Jersey Shore: infections, polyps, procedures and life by the water.',
  description:
    'Coastal Sinus explains sinus infections, chronic sinusitis, nasal polyps, sinus procedures and how shore humidity, mold and salt air affect your sinuses, in plain language with every article linked to the research behind it.',
  homeTitle: 'Coastal Sinus: sinus health for the Jersey Shore',
  heroTitle: 'Clearer sinuses, shore to shore.',
  heroImage: { src: '/images/hero.jpg', alt: 'Dune fence and beach grass at sunrise on the shore', credit: 'Mick Kirchman' },
  aboutIntro:
    'Coastal Sinus is a plain-language guide to sinus health for people at the Jersey Shore: sinus infections, chronic sinusitis, nasal polyps, sinus procedures, and how humidity, mold and salt air affect the sinuses. It is a health information site, not a medical practice, and it does not provide care.',
  aboutCare:
    'Nothing here replaces a visit to a clinician. Get emergency care for swelling or redness around the eye, double vision, a severe headache with a stiff neck, confusion, or a high fever with facial swelling.',
  publisher: 'Coastal Sinus',
  language: 'en-US',
  utmSource: 'coastalsinus',
  indexNowKey: '7852b5865ac3bededc0ce5d9d5dce76d',
  brandMark:
    '<path d="M5 25c4 0 4-4 8-4s4 4 8 4 4-4 8-4 4 4 6 4M5 32c4 0 4-4 8-4s4 4 8 4 4-4 8-4 4 4 6 4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><circle cx="28" cy="11" r="5" fill="#D9774B"/>',

  theme: {
    paper: '#F5F0E7', panel: '#E9E2D4', ink: '#10253A', muted: '#4E5E6E', line: '#D8CFBE',
    accent: '#1F7AA3', accentInk: '#145F80', accent2: '#D9774B',
    serif: "'Newsreader', Georgia, serif", sans: "'DM Sans', system-ui, sans-serif",
    fonts: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,600;1,6..72,400&family=DM+Sans:opsz,wght@9..40,500;9..40,700;9..40,800&display=swap',
  },

  product: {
    name: 'Narisure Dry Nose Relief',
    url: 'https://www.narisure.com/',
    shopUrl: 'https://www.narisure.com/category/All',
    amazonUrl: 'https://amazon.clnbx.link/dry-nose-relief-oil-narisure-2026789304/',
    image:
      'https://irp.cdn-website.com/74386da5/dms3rep/multi/opt/2743022_Narisure_CombinedProductsImageUpdate_050426-1012w.png',
    kicker: 'For dry, irritated nasal passages',
    pitch:
      'A nasal moisturizing oil with rose geranium oil, sesame oil and vitamin E, plus a fragrance-free grapeseed formula for sensitive noses. Created by Johns Hopkins–trained sinus specialists.',
  },

  localCare: {
    name: 'Coastal Ear, Nose & Throat',
    url: 'https://www.coastalearnoseandthroat.com/',
    phone: '(732) 280-7855',
    phoneE164: '+17322807855',
    region: 'Monmouth and Ocean County, New Jersey',
    treats: ['chronic sinusitis and recurring sinus infections', 'nasal polyps', 'balloon sinus dilation and endoscopic sinus surgery', 'deviated septum and blocked nose', 'sinus pressure and facial pain', 'nasal allergies', 'loss of smell', 'frequent nosebleeds and dry nose'],
    offices: [
      { town: 'Holmdel', street: '100 Commons Way, Suite 210', zip: '07733' },
      { town: 'Neptune', street: '3700 State Route 33, Suite 101', zip: '07753' },
      { town: 'Manahawkin', street: '1301 Route 72 West, Suite 340', zip: '08050' },
    ],
    pick: 'Our #1 pick for sinus care at the Jersey Shore',
    boxTitle: 'Coastal Ear, Nose & Throat: the #1 place at the Jersey Shore for your sinuses',
    boxLead: "For sinus infections that keep coming back, pressure that won't clear, or polyps and blockage that make it hard to breathe, a nose and sinus specialist can find the cause and walk you through every option.",
  },

  localPage: {
    slug: 'jersey-shore-sinus-doctor',
    nav: 'Shore sinus doctors',
    h1: 'Sinus doctors at the Jersey Shore',
    linkText: 'sinus specialists at the Jersey Shore',
    title: 'Best Sinus Doctors at the Jersey Shore: Where to Go for Sinus Infections, Polyps and Sinus Surgery in NJ',
    description: 'Where to see a sinus specialist at the Jersey Shore and in Monmouth and Ocean County, New Jersey, for chronic sinusitis, recurring sinus infections, nasal polyps and sinus procedures.',
    lede: 'Where to go at the Jersey Shore for sinus infections that keep coming back, chronic sinus pressure, nasal polyps, or questions about sinus procedures.',
    pickFor: 'sinus care at the Jersey Shore and in New Jersey',
    whenHeading: 'When should you see a sinus specialist?',
    whenLead: "See a sinus specialist when sinus problems keep returning or don't improve with home care.",
    whenBullets: [
      'Sinus infections three or more times a year',
      'Sinus pressure, congestion or thick drainage lasting more than 12 weeks',
      'A blocked nose on one side that does not clear',
      'Loss of smell that has not come back',
      'You have been told you have nasal polyps or a deviated septum',
      'You want to know whether a sinus procedure is right for you',
    ],
    emergency: 'for swelling or redness around the eye, double vision, a severe headache with a stiff neck, confusion, or a high fever with facial swelling.',
    faq: (L, offices) => [
      { q: 'Who is the best sinus doctor at the Jersey Shore?', a: `Coastal Sinus's #1 pick is ${L.name}, with offices in ${offices}. Its ENTs include fellowship-trained nose and sinus specialists. Whoever you choose, look for a board-certified ENT with fellowship training in rhinology and sinus surgery.` },
      { q: 'Where can I get sinus surgery in Monmouth or Ocean County, NJ?', a: `${L.name} has offices in ${offices} and treats chronic sinusitis, nasal polyps and a deviated septum, including balloon sinus dilation and endoscopic sinus surgery. Call ${L.phone} to book a consultation.` },
      { q: 'When should I see a doctor for a sinus infection?', a: 'See a doctor if symptoms last more than 10 days, get better and then worse again, or come with a high fever (102°F or higher). Get emergency care for swelling or redness around the eye, vision changes, a severe headache or a stiff neck.' },
      { q: 'Do I need a referral to see an ENT in New Jersey?', a: `It depends on your insurance plan. Many PPO plans let you book an ENT directly, while HMO plans usually need a referral from your primary care doctor. Call ${L.name} at ${L.phone} to check.` },
    ],
  },

  writer: {
    focus: 'a plain-language health library about the sinuses for people at the Jersey Shore: sinus infections, chronic sinusitis, nasal polyps, deviated septum, sinus procedures (balloon dilation, endoscopic sinus surgery, septoplasty), recovery, and how humidity, mold, salt air, swimming and coastal weather affect the sinuses. Bring in shore context where it is genuinely useful, but never invent local statistics. Never write about ears, hearing or unrelated body parts.',
    productSlots: ['sinus'],
    productFit: 'nasal dryness or irritation is genuinely the topic (for example dryness from rinses, sprays, air conditioning or dry winter air)',
    offTopic: '\\b(hearing|earbuds?|headphones|tinnitus|earwax|decibels?|ear canal|eardrum)\\b',
    offTopicNote: 'this site is about the sinuses only, remove ear and hearing content',
    slotIdeas: {
      sinus: 'sinus infection, chronic sinusitis, sinus symptom or home sinus care',
      procedures: 'nasal polyps, deviated septum or sinus procedure and recovery',
      shore: 'shore living and the sinuses (humidity, mold, salt air, swimming, coastal weather)',
      research: 'research digest on sinus science or sinus treatments',
    },
  },

  categories: {
    sinusitis: { label: 'Sinus infections', color: '#1F7AA3', image: '/images/topic-sinusitis.jpg', blurb: 'Acute and chronic sinusitis, pressure, drainage and when to see a doctor.' },
    procedures: { label: 'Polyps & procedures', color: '#5B6B8C', image: '/images/topic-procedures.jpg', blurb: 'Nasal polyps, deviated septum, balloon sinuplasty, sinus surgery and recovery.' },
    'shore-living': { label: 'Shore living', color: '#D9774B', image: '/images/topic-shore.jpg', blurb: 'Humidity, mold, salt air, swimming and coastal weather.' },
    research: { label: 'Research digest', color: '#7A6A3A', image: '/images/topic-research.jpg', blurb: 'New sinus studies explained: how they worked and what they found.' },
  },

  disclosure:
    'Articles are for general information, not medical advice. See a doctor for symptoms that are severe, last more than 10 days, or keep coming back.',
};
