// Topic bank. The auto-poster rotates: sinus (Narisure may appear) -> research -> shore -> procedures.
// Each topic has a PubMed search used to ground the article in real studies.
// When a bucket runs out, the writer invents a fresh topic in the same spirit.
module.exports = {
  rotation: ['sinus', 'research', 'shore', 'procedures'],

  sinus: [
    { topic: 'How long does a sinus infection last, and when to worry', pubmed: 'acute rhinosinusitis natural course duration', category: 'sinusitis' },
    { topic: 'Chronic sinusitis explained: symptoms that last 12 weeks', pubmed: 'chronic rhinosinusitis review diagnosis', category: 'sinusitis' },
    { topic: 'Sinus rinse bottles vs neti pots: how to rinse safely', pubmed: 'nasal irrigation safety device', category: 'sinusitis' },
    { topic: 'Tooth pain from your sinuses: how to tell', pubmed: 'odontogenic maxillary sinusitis', category: 'sinusitis' },
    { topic: 'Dry, irritated nose after sinus rinses and sprays', pubmed: 'nasal irrigation adverse effects dryness', category: 'sinusitis' },
    { topic: 'Sinus pressure when flying or diving', pubmed: 'sinus barotrauma air travel diving', category: 'sinusitis' },
    { topic: 'Sinus infections in kids: what parents should know', pubmed: 'pediatric acute sinusitis diagnosis', category: 'sinusitis' },
    { topic: 'Losing your sense of smell from sinus disease', pubmed: 'chronic rhinosinusitis olfactory dysfunction', category: 'sinusitis' },
    { topic: 'Steam, humidifiers and warm compresses for sinus pressure', pubmed: 'steam inhalation sinusitis randomized', category: 'sinusitis' },
  ],

  procedures: [
    { topic: 'Balloon sinuplasty: what it is and who it helps', pubmed: 'balloon sinus dilation outcomes', category: 'procedures' },
    { topic: 'Endoscopic sinus surgery: what to expect', pubmed: 'endoscopic sinus surgery quality of life outcomes', category: 'procedures' },
    { topic: 'Nasal polyps: symptoms, causes and treatment options', pubmed: 'chronic rhinosinusitis nasal polyps treatment', category: 'procedures' },
    { topic: 'Deviated septum and septoplasty', pubmed: 'septoplasty outcomes nasal obstruction', category: 'procedures' },
    { topic: 'Recovering from sinus surgery: the first two weeks', pubmed: 'endoscopic sinus surgery postoperative care', category: 'procedures' },
    { topic: 'Sinus CT scans: when you need one', pubmed: 'computed tomography rhinosinusitis indications', category: 'procedures' },
    { topic: 'Biologic medicines for nasal polyps', pubmed: 'biologic therapy nasal polyps dupilumab', category: 'procedures' },
  ],

  shore: [
    { topic: 'Summer humidity, mold and sinus flare-ups at the shore', pubmed: 'indoor dampness mold rhinosinusitis', category: 'shore-living' },
    { topic: 'Salt air and seawater: does the ocean help your sinuses?', pubmed: 'seawater nasal spray sinusitis', category: 'shore-living' },
    { topic: 'Swimming, chlorine and sinus problems', pubmed: 'swimming pool chlorine rhinitis', category: 'shore-living' },
    { topic: 'Mold in shore houses after storms and flooding', pubmed: 'flooding mold respiratory health', category: 'shore-living' },
    { topic: 'Air conditioning and your sinuses', pubmed: 'air conditioning nasal symptoms', category: 'shore-living' },
    { topic: 'Fall weather swings at the shore and sinus symptoms', pubmed: 'temperature humidity change nasal symptoms', category: 'shore-living' },
    { topic: 'Pollen near the coast: what sea breezes do to allergy season', pubmed: 'coastal pollen concentration', category: 'shore-living' },
  ],

  research: [
    { topic: 'Saline irrigation for chronic sinusitis: what the trials found', pubmed: 'saline irrigation chronic rhinosinusitis randomized', category: 'research' },
    { topic: 'Balloon dilation vs endoscopic sinus surgery: the evidence', pubmed: 'balloon dilation versus endoscopic sinus surgery', category: 'research' },
    { topic: 'Do antibiotics help sinus infections? Research explained', pubmed: 'antibiotics acute rhinosinusitis adults', category: 'research' },
    { topic: 'The sinus microbiome: new research', pubmed: 'sinus microbiome chronic rhinosinusitis', category: 'research' },
    { topic: 'Biologics for nasal polyps: what the trials showed', pubmed: 'biologic nasal polyps randomized trial', category: 'research' },
    { topic: 'Research on humidity and sinus symptoms', pubmed: 'humidity rhinosinusitis symptoms', category: 'research' },
  ],
};
