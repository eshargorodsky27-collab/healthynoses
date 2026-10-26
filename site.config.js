// Central settings for healthynoses.com. Edit here, everything else reads from this file.
module.exports = {
  name: 'Healthy Noses',
  domain: 'healthynoses.com',
  url: 'https://healthynoses.com',
  tagline: 'Plain-language guides to the nose, sinuses, ears and the air you breathe.',
  description:
    'Healthy Noses explains dry nose, nosebleeds, sinus and allergy problems, hearing and ear health in plain language, with every article linked to the research behind it.',
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
    'nose-care': { label: 'Nose care', color: '#1FA5A0' },
    research: { label: 'Research digest', color: '#C7607D' },
    'ears-hearing': { label: 'Ears & hearing', color: '#4C6FA8' },
    'sinus-allergy': { label: 'Sinus & allergy', color: '#6E8B3D' },
    'sleep-breathing': { label: 'Sleep & breathing', color: '#7A5BA6' },
  },

  disclosure:
    'Healthy Noses is published by Healsdale, Inc., the maker of Narisure. Articles are written with AI assistance from published research and are for general information, not medical advice. See a doctor for symptoms that are severe, persistent, or one-sided.',
};
