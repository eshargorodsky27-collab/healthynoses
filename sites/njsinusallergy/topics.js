// Topic bank. The auto-poster rotates: allergy (Narisure may appear) -> research -> sinus -> allergy.
// Each topic has a PubMed search used to ground the article in real studies.
// When a bucket runs out, the writer invents a fresh topic in the same spirit.
module.exports = {
  rotation: ['allergy', 'research', 'sinus', 'allergy'],

  allergy: [
    { topic: 'Ragweed season in New Jersey: when it peaks and how to get through it', pubmed: 'ragweed pollen allergic rhinitis', category: 'pollen-seasons' },
    { topic: 'Spring tree pollen in New Jersey: oak, birch and maple allergies', pubmed: 'tree pollen allergic rhinitis birch oak', category: 'pollen-seasons' },
    { topic: 'Antihistamines and a dry nose: why allergy pills dry you out', pubmed: 'antihistamine adverse effects dry mouth nose', category: 'allergies' },
    { topic: 'Nasal steroid sprays: how to use them the right way', pubmed: 'intranasal corticosteroid spray technique epistaxis', category: 'allergies' },
    { topic: 'Dust mite allergy in New Jersey homes', pubmed: 'house dust mite allergic rhinitis avoidance', category: 'allergies' },
    { topic: 'Mold allergy after rain, storms and flooding', pubmed: 'mold allergy rhinitis indoor dampness', category: 'allergies' },
    { topic: 'Grass pollen allergies in late spring and early summer', pubmed: 'grass pollen allergic rhinitis', category: 'pollen-seasons' },
    { topic: 'Allergies or a cold? How to tell the difference', pubmed: 'allergic rhinitis common cold differential', category: 'allergies' },
    { topic: 'Pollen counts: how to read them and plan your day', pubmed: 'pollen count symptoms allergic rhinitis exposure', category: 'pollen-seasons' },
    { topic: 'Cat and dog allergies: living with pets when you sneeze', pubmed: 'cat dog allergen allergic rhinitis', category: 'allergies' },
    { topic: 'Allergy testing: skin prick test vs blood test', pubmed: 'skin prick test specific IgE comparison rhinitis', category: 'allergies' },
    { topic: 'Allergy shots and allergy tablets explained', pubmed: 'allergen immunotherapy allergic rhinitis efficacy', category: 'allergies' },
    { topic: 'Seasonal allergies in kids: signs parents miss', pubmed: 'pediatric allergic rhinitis symptoms diagnosis', category: 'allergies' },
    { topic: 'Indoor allergies in winter: dry heat, dust and closed windows', pubmed: 'indoor allergen winter heating rhinitis', category: 'allergies' },
  ],

  sinus: [
    { topic: 'Sinus pressure from allergies: why it happens and what helps', pubmed: 'allergic rhinitis rhinosinusitis association', category: 'sinus-pressure' },
    { topic: 'Sinus headache or migraine? How to tell', pubmed: 'sinus headache migraine misdiagnosis', category: 'sinus-pressure' },
    { topic: 'When does a sinus infection need antibiotics?', pubmed: 'acute bacterial rhinosinusitis antibiotics guideline', category: 'sinus-pressure' },
    { topic: 'Saline rinses for allergies and sinus congestion', pubmed: 'saline nasal irrigation allergic rhinitis', category: 'sinus-pressure' },
    { topic: 'Postnasal drip from allergies: causes and relief', pubmed: 'postnasal drip allergic rhinitis', category: 'sinus-pressure' },
    { topic: 'Weather changes and sinus pain: is it real?', pubmed: 'weather barometric pressure sinus symptoms', category: 'sinus-pressure' },
    { topic: 'Allergies and sleep: why congestion is worse at night', pubmed: 'allergic rhinitis sleep quality nasal congestion', category: 'sinus-pressure' },
    { topic: 'Chronic sinusitis: when sinus symptoms last 12 weeks or more', pubmed: 'chronic rhinosinusitis diagnosis symptoms', category: 'sinus-pressure' },
  ],

  research: [
    { topic: 'Research on longer pollen seasons in the United States', pubmed: 'pollen season length climate change North America', category: 'research' },
    { topic: 'Do HEPA air purifiers help allergy symptoms? What trials found', pubmed: 'HEPA air purifier allergic rhinitis randomized', category: 'research' },
    { topic: 'Studies on nasal saline irrigation for allergic rhinitis', pubmed: 'nasal saline irrigation allergic rhinitis meta-analysis', category: 'research' },
    { topic: 'Long-term results of allergy immunotherapy', pubmed: 'allergen immunotherapy long-term efficacy rhinitis', category: 'research' },
    { topic: 'Thunderstorm asthma and pollen: what research shows', pubmed: 'thunderstorm asthma pollen', category: 'research' },
    { topic: 'Air pollution and worse allergy symptoms: the evidence', pubmed: 'air pollution allergic rhinitis symptoms', category: 'research' },
    { topic: 'Probiotics for seasonal allergies: what trials found', pubmed: 'probiotics allergic rhinitis randomized', category: 'research' },
  ],
};
