// Topic bank. The auto-poster rotates through four slots:
//   nose (Narisure-relevant) -> research digest -> nose -> broader nose topics (sinus, allergy, smell, nasal breathing)
// Each topic has a PubMed search used to ground the article in real studies.
// When a bucket runs out, the writer invents a fresh topic in the same spirit.
module.exports = {
  rotation: ['nose', 'research', 'nose', 'ent'],

  nose: [
    { topic: 'Dry nose from CPAP machines and how to stay comfortable', pubmed: 'CPAP nasal dryness humidification', category: 'nose-care' },
    { topic: 'Nosebleeds in kids during winter: causes and what parents can do', pubmed: 'pediatric epistaxis prevention humidity', category: 'nose-care' },
    { topic: 'Dry nose on airplanes: why cabin air dries you out', pubmed: 'aircraft cabin humidity nasal mucosa', category: 'nose-care' },
    { topic: 'Rhinitis sicca: what a chronically dry nose means', pubmed: 'rhinitis sicca treatment', category: 'nose-care' },
    { topic: 'Overusing decongestant nasal sprays and rebound congestion', pubmed: 'rhinitis medicamentosa oxymetazoline', category: 'nose-care' },
    { topic: 'Dry nose and nasal oxygen tubes in older adults', pubmed: 'nasal cannula oxygen dryness humidification', category: 'nose-care' },
    { topic: 'Saline spray, gel or oil: choosing a nasal moisturizer', pubmed: 'nasal saline gel dryness randomized', category: 'nose-care' },
    { topic: 'Why your nose gets crusty and how to clear it safely', pubmed: 'nasal crusting management', category: 'nose-care' },
    { topic: 'Dry nose caused by antihistamines and allergy medicine', pubmed: 'antihistamine adverse effects nasal dryness', category: 'nose-care' },
    { topic: 'Dry nose and nosebleeds at high altitude and in the desert', pubmed: 'altitude epistaxis dry climate', category: 'nose-care' },
    { topic: 'Using a humidifier correctly for nasal comfort', pubmed: 'humidifier indoor humidity respiratory symptoms', category: 'nose-care' },
    { topic: 'Dry nose from isotretinoin and other acne medications', pubmed: 'isotretinoin epistaxis nasal dryness', category: 'nose-care' },
    { topic: 'Rose geranium oil and other botanical oils used in the nose', pubmed: 'Pelargonium graveolens nasal vestibulitis', category: 'nose-care' },
    { topic: 'How to stop a nosebleed the right way', pubmed: 'epistaxis first aid management', category: 'nose-care' },
    { topic: 'Dry, itchy nose in heated offices and classrooms', pubmed: 'low indoor humidity office symptoms mucous membranes', category: 'nose-care' },
  ],

  research: [
    { topic: 'New research on indoor humidity and respiratory infections', pubmed: 'indoor relative humidity respiratory virus transmission', category: 'research' },
    { topic: 'What studies say about nasal irrigation for sinus symptoms', pubmed: 'nasal saline irrigation chronic rhinosinusitis randomized', category: 'research' },
    { topic: 'Recent findings on loss of smell and what affects recovery', pubmed: 'olfactory dysfunction recovery olfactory training', category: 'research' },
    { topic: 'Research on vitamin E and skin and mucosal barrier health', pubmed: 'vitamin E topical barrier mucosa', category: 'research' },
    { topic: 'The nasal microbiome: what scientists are learning', pubmed: 'nasal microbiome health review', category: 'research' },
    { topic: 'Mouth breathing vs nose breathing: what the research shows', pubmed: 'nasal breathing versus mouth breathing effects', category: 'research' },
    { topic: 'Studies on air pollution and nasal symptoms', pubmed: 'air pollution rhinitis nasal symptoms', category: 'research' },
    { topic: 'Research on climate, season and nosebleeds', pubmed: 'epistaxis season temperature humidity', category: 'research' },
    { topic: 'What research shows about how the nose filters and humidifies air', pubmed: 'nasal air conditioning humidification airflow', category: 'research' },
    { topic: 'Evidence on sesame oil and plant oils for nasal dryness', pubmed: 'sesame oil nasal', category: 'research' },
  ],

  ent: [
    { topic: 'Why one nostril is always more blocked: the nasal cycle', pubmed: 'nasal cycle physiology', category: 'sinus-allergy' },
    { topic: 'Nasal saline rinses: how to do them safely', pubmed: 'nasal irrigation safety tap water', category: 'sinus-allergy' },
    { topic: 'Stuffy nose with no cold: causes of nonallergic rhinitis', pubmed: 'nonallergic rhinitis review', category: 'sinus-allergy' },
    { topic: 'Nasal polyps: symptoms and what they mean', pubmed: 'nasal polyps symptoms chronic rhinosinusitis', category: 'sinus-allergy' },
    { topic: 'Nose pressure and congestion on flights', pubmed: 'air travel nasal congestion sinus barotrauma', category: 'sinus-allergy' },
    { topic: 'Sinus infection or cold? How to tell the difference', pubmed: 'acute rhinosinusitis viral bacterial diagnosis', category: 'sinus-allergy' },
    { topic: 'Seasonal allergies and your nose: a fall survival guide', pubmed: 'allergic rhinitis ragweed management', category: 'sinus-allergy' },
    { topic: 'Deviated septum: symptoms and when it matters', pubmed: 'nasal septal deviation symptoms septoplasty outcomes', category: 'sinus-allergy' },
    { topic: 'Snoring and nasal congestion: how they are connected', pubmed: 'nasal obstruction snoring sleep', category: 'sleep-breathing' },
    { topic: 'Nasal strips and dilators: do they help you sleep?', pubmed: 'external nasal dilator strip sleep', category: 'sleep-breathing' },
    { topic: 'Postnasal drip: what causes it and how to calm it', pubmed: 'postnasal drip upper airway cough syndrome', category: 'sinus-allergy' },
    { topic: 'Sense of smell and taste: how they work together', pubmed: 'olfaction flavor perception retronasal', category: 'sinus-allergy' },
  ],
};
