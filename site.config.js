// Central settings for healthynoses.com. Edit here, everything else reads from this file.
module.exports = {
  name: 'Healthy Noses',
  domain: 'healthynoses.com',
  url: 'https://healthynoses.com',
  tagline: 'Plain-language guides to dry noses, nosebleeds, sinuses and the air you breathe.',
  description:
    'Healthy Noses explains dry nose, nosebleeds, stuffy noses, sinus and allergy problems, smell and nasal breathing in plain language, with every article linked to the research behind it.',
  publisher: 'Healsdale, Inc.',
  language: 'en-US',
  indexNowKey: 'fc5e908f4457c1930dabcbc4c5e7b903',

  // The product this site supports. Every post links here with tracking tags.
  product: {
    name: 'Narisure Dry Nose Relief',
    url: 'https://www.narisure.com/',
    shopUrl: 'https://www.narisure.com/category/All',
    amazonUrl: 'https://amazon.clnbx.link/dry-nose-relief-oil-narisure-2026789304/',
    image:
      'https://irp.cdn-website.com/74386da5/dms3rep/multi/opt/2743022_Narisure_CombinedProductsImageUpdate_050426-1012w.png',
    // Keep claims to what the product page itself says. No "cure", "treat", or "prevent".
    pitch:
      'A nasal moisturizing oil with rose geranium oil, sesame oil and vitamin E, plus a fragrance-free grapeseed formula for sensitive noses. Created by Johns Hopkins–trained sinus specialists.',
  },

  categories: {
    'nose-care': { label: 'Nose care', color: '#1FA5A0', image: '/images/topic-nose-care.jpg', blurb: 'Dry air, crusts, nosebleeds and keeping the lining comfortable.' },
    research: { label: 'Research digest', color: '#C7607D', image: '/images/topic-research.jpg', blurb: 'New studies explained: how they worked and what they found.' },
    'sinus-allergy': { label: 'Sinus & allergy', color: '#6E8B3D', image: '/images/topic-sinus.jpg', blurb: 'Stuffy noses, pollen season, sinus pressure, postnasal drip and smell.' },
    'sleep-breathing': { label: 'Sleep & breathing', color: '#7A5BA6', image: '/images/topic-sleep.jpg', blurb: 'Nighttime congestion, snoring, mouth breathing and CPAP dryness.' },
  },

  disclosure:
    'Healthy Noses is published by Healsdale, Inc., the maker of Narisure. Articles are written with AI assistance from published research and are for general information, not medical advice. See a doctor for symptoms that are severe, persistent, or one-sided.',
};
