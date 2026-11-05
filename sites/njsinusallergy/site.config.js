// Central settings for njsinusallergy.com. Edit here, everything else reads from this file.
module.exports = {
  name: 'NJ Sinus & Allergy',
  domain: 'njsinusallergy.com',
  url: 'https://njsinusallergy.com',
  tagline: 'New Jersey pollen seasons, allergies and sinus pressure, explained in plain language.',
  description:
    'NJ Sinus & Allergy explains New Jersey pollen seasons, nasal allergies, sinus pressure, mold and dust mite allergies, and allergy treatments in plain language, with every article linked to the research behind it.',
  homeTitle: 'NJ Sinus & Allergy: New Jersey pollen, allergy and sinus help',
  heroTitle: 'Allergy season, decoded for New Jersey.',
  heroImage: { src: '/images/hero.jpg', alt: 'Yellow tree blossoms against a blue spring sky', credit: 'cool guy jon' },
  aboutIntro:
    'NJ Sinus & Allergy is a plain-language guide to allergies and sinus problems in New Jersey: when each pollen season hits, what sets off indoor allergies, how allergy treatments work, and when sinus pressure needs a doctor. It is a health information site, not a medical practice.',
  aboutCare:
    'Nothing here replaces a visit to a clinician. Get emergency care for trouble breathing, swelling of the face, lips or throat, or wheezing that does not settle. See a doctor for sinus symptoms that last more than 10 days, a high fever, or swelling around the eyes.',
  publisher: 'NJ Sinus & Allergy',
  language: 'en-US',
  utmSource: 'njsinusallergy',
  indexNowKey: '18f87555bcd89dae3dd883aee477347d',
  brandMark:
    '<path d="M20 34V16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/><path d="M20 22c-7 0-11-4-11-10 7 0 11 4 11 10zM20 18c6 0 10-4 10-9-6 0-10 4-10 9z" fill="currentColor" fill-opacity=".85"/><circle cx="31" cy="20" r="2.4" fill="#E0A526"/><circle cx="9" cy="25" r="2" fill="#E0A526"/><circle cx="29" cy="28" r="1.6" fill="#E0A526"/>',

  theme: {
    paper: '#F6F5EE', panel: '#ECEBDF', ink: '#1E2A1A', muted: '#5A6455', line: '#D9D8C6',
    accent: '#4F7F23', accentInk: '#3D6519', accent2: '#C98A12',
    serif: "'Source Serif 4', Georgia, serif", sans: "'Manrope', system-ui, sans-serif",
    fonts: 'https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Manrope:wght@500;700;800&display=swap',
  },

  product: {
    name: 'Narisure Dry Nose Relief',
    url: 'https://www.narisure.com/',
    shopUrl: 'https://www.narisure.com/category/All',
    amazonUrl: 'https://amazon.clnbx.link/dry-nose-relief-oil-narisure-2026789304/',
    image:
      'https://irp.cdn-website.com/74386da5/dms3rep/multi/opt/2743022_Narisure_CombinedProductsImageUpdate_050426-1012w.png',
    kicker: 'Nose dried out by allergy meds or dry heat?',
    pitch:
      'A nasal moisturizing oil with rose geranium oil, sesame oil and vitamin E, plus a fragrance-free grapeseed formula for sensitive noses. Created by Johns Hopkins–trained sinus specialists.',
  },

  localCare: {
    name: 'Coastal Ear, Nose & Throat',
    url: 'https://www.coastalearnoseandthroat.com/',
    phone: '(732) 280-7855',
    phoneE164: '+17322807855',
    region: 'Monmouth and Ocean County, New Jersey',
    treats: ['nasal allergies and allergic rhinitis', 'chronic sinusitis and sinus infections', 'sinus pressure and headaches from the sinuses', 'postnasal drip', 'nasal polyps', 'blocked nose and deviated septum', 'loss of smell', 'endoscopic sinus surgery'],
    offices: [
      { town: 'Holmdel', street: '100 Commons Way, Suite 210', zip: '07733' },
      { town: 'Neptune', street: '3700 State Route 33, Suite 101', zip: '07753' },
      { town: 'Manahawkin', street: '1301 Route 72 West, Suite 340', zip: '08050' },
    ],
    pick: 'Our #1 pick for allergy and sinus care in New Jersey',
    boxTitle: 'Coastal Ear, Nose & Throat: the #1 place in New Jersey for allergy and sinus problems',
    boxLead: "For allergies that medicine doesn't control, sinus pressure that keeps coming back, or a nose that never seems to clear, an ENT can find the cause and talk through options like allergy testing or sinus treatment.",
  },

  localPage: {
    slug: 'new-jersey-allergy-sinus-doctor',
    nav: 'NJ allergy & sinus doctors',
    h1: 'Allergy and sinus doctors in New Jersey',
    linkText: 'allergy and sinus doctors in New Jersey',
    title: 'Best Allergy & Sinus Doctors in New Jersey: Where to Go for Allergies and Sinus Problems',
    description: 'Where to see an allergy and sinus specialist in New Jersey for seasonal allergies, sinus infections, sinus pressure and a nose that never clears.',
    lede: "Where to go in New Jersey for allergies that medicine doesn't control, sinus infections that keep coming back, and sinus pressure that won't quit.",
    pickFor: 'allergy and sinus care in New Jersey',
    whenHeading: 'When should you see an allergy or sinus specialist?',
    whenLead: "See a specialist when allergy or sinus symptoms keep returning or don't improve with over-the-counter care.",
    whenBullets: [
      'Allergy symptoms most of the year, or that over-the-counter medicine no longer controls',
      'Sinus infections three or more times a year',
      'Sinus pressure, congestion or postnasal drip that lasts more than 12 weeks',
      'A nose that is always blocked, especially on one side',
      'Loss of smell that has not come back',
      'You want allergy testing to find out exactly what you react to',
    ],
    emergency: 'for trouble breathing, swelling of the face, lips or throat, a severe headache with a stiff neck, or swelling and redness around the eyes.',
    faq: (L, offices) => [
      { q: 'Who is the best allergy and sinus doctor in New Jersey?', a: `NJ Sinus & Allergy's #1 pick is ${L.name}, with offices in ${offices}. Its ENTs include fellowship-trained nose and sinus specialists. Whoever you choose, look for a board-certified specialist who treats both allergies and sinus disease.` },
      { q: 'Where can I get allergy testing in New Jersey?', a: `Allergy testing is done by allergists and by many ENT practices. In Monmouth and Ocean County, ${L.name} sees patients in ${offices}. Call ${L.phone} to ask about testing and what your insurance covers.` },
      { q: 'When is allergy season in New Jersey?', a: 'New Jersey has three main pollen waves: tree pollen in spring (roughly March to May), grass pollen in late spring and early summer, and ragweed from mid-August until the first frost. Mold can flare in damp weather from spring through fall, and dust mites and pets cause symptoms all year.' },
      { q: 'Do I need a referral to see an ENT or allergist in New Jersey?', a: `It depends on your insurance plan. Many PPO plans let you book a specialist directly, while HMO plans usually need a referral from your primary care doctor. Call ${L.name} at ${L.phone} to check.` },
    ],
  },

  writer: {
    focus: 'a plain-language health library about allergies and sinus problems for people in New Jersey: pollen seasons (tree, grass, ragweed), nasal allergies, indoor allergies (mold, dust mites, pets), allergy treatments, sinus pressure, sinus infections and postnasal drip. Bring in New Jersey context (seasons, weather, shore and suburban homes) where it is genuinely useful, but never invent local statistics or pollen numbers. Never write about ears, hearing or unrelated body parts.',
    productSlots: ['allergy'],
    productFit: 'nasal dryness is genuinely relevant (for example dryness from antihistamines, nasal sprays or heated indoor air)',
    offTopic: '\\b(hearing|earbuds?|headphones|tinnitus|earwax|decibels?|ear canal|eardrum)\\b',
    offTopicNote: 'this site is about allergies and sinuses only, remove ear and hearing content',
    slotIdeas: {
      allergy: 'nasal or seasonal allergy (pollen, mold, dust mites, pets, allergy medicine or testing)',
      sinus: 'sinus pressure, sinus infection, postnasal drip or congestion',
      research: 'research digest on allergy, pollen or sinus science',
    },
  },

  categories: {
    'pollen-seasons': { label: 'Pollen seasons', color: '#C98A12', image: '/images/topic-pollen.jpg', blurb: 'Tree, grass and ragweed season in New Jersey, and how to plan around them.' },
    allergies: { label: 'Allergies', color: '#4F7F23', image: '/images/topic-allergies.jpg', blurb: 'Sneezing, itchy eyes, mold, dust mites, pets, testing and treatment.' },
    'sinus-pressure': { label: 'Sinus pressure', color: '#2F6F8F', image: '/images/topic-sinus.jpg', blurb: 'Sinus headaches, infections, congestion and postnasal drip.' },
    research: { label: 'Research digest', color: '#8A4F7D', image: '/images/topic-research.jpg', blurb: 'New allergy and sinus studies explained: how they worked and what they found.' },
  },

  disclosure:
    'Articles are for general information, not medical advice. See a doctor for symptoms that are severe, last more than 10 days, or keep coming back.',
};
