// Editor-in-chief shown on all three sites. Every fact here comes from a public source listed beside it.
// To mark an article as medically reviewed, add `reviewed: YYYY-MM-DD` to its front matter
// (or run the "Mark article reviewed" workflow in GitHub Actions).
const EDITOR = {
  name: 'Josef Shargorodsky, MD',
  short: 'Josef Shargorodsky',
  slug: 'editor',
  role: 'Editor-in-chief',
  title: 'Board-certified otolaryngologist (ENT) and rhinologist',
  summary: 'Dr. Josef Shargorodsky is a board-certified ear, nose and throat surgeon who specializes in the nose and sinuses. He trained in otolaryngology at Massachusetts Eye and Ear / Harvard Medical School and completed a fellowship in rhinology and skull base surgery at Johns Hopkins. He has published more than 30 peer-reviewed studies, many on nasal allergies, sinus disease and nosebleeds.',
  disclosure: 'Dr. Shargorodsky practices at Coastal Ear, Nose & Throat and helped create Narisure.',
  training: [
    { what: 'MD', where: 'University of Michigan Medical School', when: '2006' },
    { what: 'Surgical internship', where: 'Beth Israel Deaconess Medical Center, Boston', when: '2007' },
    { what: 'Residency, Otolaryngology–Head and Neck Surgery', where: 'Massachusetts Eye and Ear / Harvard Medical School', when: '2006–2013' },
    { what: 'Fellowship, Rhinology and Skull Base Surgery', where: 'Johns Hopkins University School of Medicine', when: '2013–2014' },
    { what: 'Physician-investigator', where: 'Channing Laboratory, Brigham and Women\'s Hospital (Harvard Medical School)', when: '2010' },
  ],
  credentials: [
    'Board certified, American Board of Otolaryngology–Head and Neck Surgery (2014)',
    'Fellow, American Academy of Otolaryngic Allergy',
    'Attending surgeon, Hackensack Meridian Health Jersey Shore University Medical Center',
    'Practicing at Coastal Ear, Nose & Throat (Neptune, Holmdel and Manahawkin, NJ)',
  ],
  knowsAbout: ['Otolaryngology', 'Rhinology', 'Chronic rhinosinusitis', 'Allergic rhinitis', 'Epistaxis (nosebleeds)', 'Endoscopic sinus surgery', 'Nasal saline irrigation', 'Smell disorders'],
  profiles: [
    { name: 'Doximity profile', url: 'https://www.doximity.com/pub/josef-shargorodsky-md' },
    { name: 'Hackensack Meridian Health profile', url: 'https://www.getcare.hackensackmeridianhealth.org/provider/josef-shargorodsky/1315308' },
    { name: 'All publications on PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Shargorodsky+J%5BAuthor%5D&sort=date' },
  ],
  // Coverage of his research. Every item was checked to name him.
  media: [
    { outlet: 'PBS NewsHour', date: 'Aug 17, 2010', what: 'Quoted as the otolaryngologist who led the national study on rising teen hearing loss', url: 'https://www.pbs.org/newshour/health/study-hearing-loss-up-among-teens' },
    { outlet: 'Harvard Gazette', date: 'Aug 17, 2010', what: 'Profiled as lead author of the JAMA study', url: 'https://news.harvard.edu/gazette/story/2010/08/hard-on-the-ears/' },
    { outlet: 'American Medical Association press release (EurekAlert)', date: 'Aug 2010', what: 'JAMA study announcement naming him as lead researcher', url: 'https://www.eurekalert.org/news-releases/798574' },
    { outlet: 'TIME', date: 'Aug 18, 2010', what: 'Quote of the Day on teen noise exposure', url: 'https://content.time.com/time/quotes/0,26174,2011503,00.html' },
    { outlet: 'CNN', date: 'Aug 23, 2010', what: 'Interviewed on CNN Student News about the study', url: 'https://tingroom.com/print_110200.html' },
    { outlet: 'CBS News', date: 'Aug 23, 2010', what: 'Quoted as the study\'s lead researcher', url: 'https://www.cbsnews.com/news/headphones-and-hearing-loss-is-loud-music-making-teens-deaf' },
    { outlet: 'WAMU 88.5, The Kojo Nnamdi Show', date: 'Sep 9, 2010', what: 'Radio guest discussing the study', url: 'https://thekojonnamdishow.org/shows/2010-09-09/hearing-loss-loud-noise-blame' },
  ],
  publications: [
  { year: "2021", journal: "Am J Otolaryngol", title: "Characteristics of COVID-19 smell and taste dysfunction in hospitalized patients", lead: false, pmid: '33940252' },
  { year: "2019", journal: "J Allergy Clin Immunol Pract", title: "Association Between Rhinitis and Depression in United States Adults", lead: false, pmid: '30857940' },
  { year: "2018", journal: "Int Forum Allergy Rhinol", title: "Association between allergic rhinitis and poor sleep parameters in U.S. adults", lead: false, pmid: '29979840' },
  { year: "2017", journal: "Int Forum Allergy Rhinol", title: "Household pet exposure, allergic sensitization, and rhinitis in the U.S. population", lead: true, pmid: '28544629' },
  { year: "2016", journal: "Int Forum Allergy Rhinol", title: "The association between airline flight and sinonasal symptoms", lead: true, pmid: '26834039' },
  { year: "2016", journal: "Curr Opin Otolaryngol Head Neck Surg", title: "Secondhand smoke and rhinitis", lead: true, pmid: '27054622' },
  { year: "2015", journal: "PLoS One", title: "Allergic Sensitization, Rhinitis and Tobacco Smoke Exposure in US Adults", lead: true, pmid: '26172447' },
  { year: "2015", journal: "Laryngoscope", title: "What is the best modality to minimize bacterial contamination of nasal saline irrigation bottles?", lead: true, pmid: '25640956' },
  { year: "2015", journal: "Int Forum Allergy Rhinol", title: "Topical intranasal corticosteroids and growth velocity in children: a meta-analysis", lead: false, pmid: '25367369' },
  { year: "2015", journal: "Int Forum Allergy Rhinol", title: "Perioperative continuous cerebrospinal fluid pressure monitoring in patients with spontaneous cerebrospinal fluid leaks", lead: false, pmid: '25278379' },
  { year: "2015", journal: "Int Forum Allergy Rhinol", title: "Lead exposure and increased food allergic sensitization in U.S. children and adults", lead: false, pmid: '25524712' },
  { year: "2015", journal: "Int Forum Allergy Rhinol", title: "Allergic sensitization, rhinitis, and tobacco smoke exposure in U.S. children and adolescents", lead: true, pmid: '25884913' },
  { year: "2015", journal: "Allergy Rhinol (Providence)", title: "Ethmoid pneumocele presenting with exophthalmos 15 years after endoscopic sinus surgery", lead: false, pmid: '26302735' },
  { year: "2013", journal: "Otolaryngol Head Neck Surg", title: "Outcomes analysis in epistaxis management: development of a therapeutic algorithm", lead: true, pmid: '23764960' },
  { year: "2013", journal: "Laryngoscope", title: "What is the role of nasal endoscopy in the diagnosis of chronic rhinosinusitis?", lead: true, pmid: '23280937' },
  { year: "2012", journal: "Laryngoscope", title: "Dexamethasone and postoperative bleeding after tonsillectomy and adenotonsillectomy in children: A meta-analysis of prospective studies", lead: true, pmid: '22447657' },
  { year: "2012", journal: "Am J Epidemiol", title: "Analgesic use and the risk of hearing loss in women", lead: false, pmid: '22933387' },
  { year: "2011", journal: "Pediatr Allergy Immunol", title: "A meta-analysis of Th2 pathway genetic variants and risk for allergic rhinitis", lead: false, pmid: '21309855' },
  { year: "2011", journal: "Ear Hear", title: "Prospective study of alcohol use and hearing loss in men", lead: false, pmid: '20802338' },
  { year: "2011", journal: "Arch Otolaryngol Head Neck Surg", title: "Heavy metals exposure and hearing loss in US adolescents", lead: true, pmid: '22183895' },
  { year: "2010", journal: "Otolaryngol Head Neck Surg", title: "A prospective study of vitamin intake and the risk of hearing loss in men", lead: true, pmid: '20115980' },
  { year: "2010", journal: "Laryngoscope", title: "Bacterial tracheitis: a therapeutic approach", lead: true, pmid: '21225825' },
  { year: "2010", journal: "Laryngoscope", title: "A prospective study of cardiovascular risk factors and incident hearing loss in men", lead: true, pmid: '20715090' },
  { year: "2010", journal: "JAMA", title: "Change in prevalence of hearing loss in US adolescents", lead: true, pmid: '20716740' },
  { year: "2010", journal: "Clin Pediatr (Phila)", title: "Facial nerve palsy in the pediatric population", lead: true, pmid: '20139107' },
  { year: "2010", journal: "Clin Pediatr (Phila)", title: "Clinical strategies for the management of acute mastoiditis in the pediatric population", lead: false, pmid: '19734439' },
  { year: "2010", journal: "Am J Med", title: "Prevalence and characteristics of tinnitus among US adults", lead: true, pmid: '20670725' },
  { year: "2010", journal: "Am J Med", title: "Analgesic use and the risk of hearing loss in men", lead: false, pmid: '20193831' },
  { year: "2008", journal: "Head Neck", title: "Lateral oromandibular defect: when is it appropriate to use a bridging reconstruction plate combined with a soft tissue revascularized flap?", lead: false, pmid: '18286487' },
  { year: "2008", journal: "Arch Otolaryngol Head Neck Surg", title: "Rectangle tongue template for reconstruction of the hemiglossectomy defect", lead: false, pmid: '18794446' },
  { year: "2007", journal: "Surgery", title: "Inguinal node dissection for melanoma in the era of sentinel lymph node biopsy", lead: false, pmid: '17560249' },
  { year: "2002", journal: "J Neurooncol", title: "Tamoxifen increases photodynamic therapeutic response of U87 and U25ln human glioma cells", lead: false, pmid: '11949827' }
  ],
};

const escE = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rv = (v) => (v instanceof Date ? v.toISOString() : String(v)).slice(0, 10);
const fmtE = (d) => new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function editorLd(cfg) {
  return {
    '@type': 'Person', '@id': `${cfg.url}/${EDITOR.slug}/#person`, name: 'Josef Shargorodsky', honorificSuffix: 'MD',
    jobTitle: `${EDITOR.role}, ${cfg.name}`, description: EDITOR.summary, url: `${cfg.url}/${EDITOR.slug}/`,
    medicalSpecialty: 'Otolaryngologic', knowsAbout: EDITOR.knowsAbout,
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Michigan Medical School' },
      { '@type': 'Hospital', name: 'Massachusetts Eye and Ear' },
      { '@type': 'CollegeOrUniversity', name: 'Harvard Medical School' },
      { '@type': 'CollegeOrUniversity', name: 'Johns Hopkins University School of Medicine' },
    ],
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'Doctor of Medicine (MD)' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Board certification', name: 'American Board of Otolaryngology–Head and Neck Surgery', recognizedBy: { '@type': 'Organization', name: 'American Board of Otolaryngology' } },
    ],
    memberOf: { '@type': 'Organization', name: 'American Academy of Otolaryngic Allergy' },
    worksFor: { '@type': 'MedicalClinic', name: 'Coastal Ear, Nose & Throat', url: 'https://www.coastalearnoseandthroat.com/' },
    sameAs: EDITOR.profiles.map((p) => p.url),
  };
}

// Byline block at the end of every article
function bylineHtml(cfg, p) {
  const reviewed = p.reviewed ? rv(p.reviewed) : '';
  return `<aside class="editor-byline" aria-label="Editor">
  <p class="eb-name">Editor: <a href="/${EDITOR.slug}/">${escE(EDITOR.name)}</a></p>
  <p class="eb-note">${escE(EDITOR.title)}. ${reviewed ? `Medically reviewed on ${fmtE(reviewed)}.` : 'Written with AI assistance under his editorial standards from published research; not yet individually reviewed.'} <a href="/${EDITOR.slug}/">Credentials &amp; disclosures</a></p>
</aside>`;
}

// Fields to merge into an article's JSON-LD
function articleLd(cfg, p) {
  const person = { '@id': `${cfg.url}/${EDITOR.slug}/#person`, '@type': 'Person', name: EDITOR.name, url: `${cfg.url}/${EDITOR.slug}/` };
  const out = { editor: person };
  if (p.reviewed) { out.reviewedBy = person; out.lastReviewed = rv(p.reviewed); }
  return out;
}

function editorPage(cfg) {
  const pubs = EDITOR.publications.map((x) => `<li><a href="https://pubmed.ncbi.nlm.nih.gov/${x.pmid}/" rel="noopener">${escE(x.title)}</a>. <em>${escE(x.journal)}</em>, ${x.year}${x.lead ? ' <span class="tag">Lead author</span>' : ''}</li>`).join('');
  const body = `<article class="post editor-page"><header class="post-head">
  <p class="meta"><span>${escE(EDITOR.role)}</span></p>
  <h1>${escE(EDITOR.name)}</h1>
  <p class="lede">${escE(EDITOR.title)}. ${escE(EDITOR.role)} of ${escE(cfg.name)}.</p>
</header><div class="post-body prose">
<p>${escE(EDITOR.summary)}</p>
<h2>Training</h2><ul>${EDITOR.training.map((t) => `<li><strong>${escE(t.what)}</strong>, ${escE(t.where)} (${escE(t.when)})</li>`).join('')}</ul>
<h2>Credentials and current practice</h2><ul>${EDITOR.credentials.map((c) => `<li>${escE(c)}</li>`).join('')}</ul>
<h2>His research in the news</h2><p>His 2010 <em>JAMA</em> study on the rise in hearing loss among U.S. teenagers was covered nationally:</p>
<ul>${EDITOR.media.map((m) => `<li><a href="${escE(m.url)}" rel="noopener">${escE(m.outlet)}</a>, ${escE(m.date)}: ${escE(m.what)}</li>`).join('')}</ul>
<h2>Peer-reviewed publications</h2><p>${EDITOR.publications.length} papers indexed on PubMed, including work on allergic rhinitis, chronic sinusitis, nosebleed treatment, nasal saline irrigation and smell loss.</p>
<ol class="pubs">${pubs}</ol>
<h2>How articles are edited</h2><p>Articles on ${escE(cfg.name)} are drafted with AI assistance from peer-reviewed studies found on PubMed, checked automatically against a list of claims the site never makes, and published under Dr. Shargorodsky's editorial standards. Each article says at the bottom whether he has personally reviewed it and when.</p>
<h2>Disclosure</h2><p>${escE(EDITOR.disclosure)}</p>
<h2>Verify</h2><ul>${EDITOR.profiles.map((p) => `<li><a href="${escE(p.url)}" rel="noopener">${escE(p.name)}</a></li>`).join('')}</ul>
</div></article>`;
  const jsonld = [{ '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${cfg.url}/${EDITOR.slug}/`, name: `${EDITOR.name}, ${EDITOR.role}`, mainEntity: editorLd(cfg) }];
  return { body, jsonld, title: `${EDITOR.name}, ${EDITOR.role} | ${cfg.name}`, description: `${EDITOR.name}, board-certified ENT and rhinologist, Harvard- and Johns Hopkins-trained, edits ${cfg.name}. Training, credentials, publications and disclosures.` };
}

function llmsLines(cfg) {
  return `## Editor\n\n- [${EDITOR.name}](${cfg.url}/${EDITOR.slug}/): ${EDITOR.role}. ${EDITOR.summary} ${EDITOR.disclosure}\n`;
}

const EDITOR_CSS = `
.editor-byline{margin:28px 0 0;padding:16px 18px;border:1px solid var(--line);border-left:4px solid var(--teal);border-radius:12px;background:#fff}
.editor-byline p{margin:0}.eb-name{font:700 1rem/1.4 var(--sans)}.eb-note{margin-top:4px!important;font-size:.9rem;color:var(--muted)}
.editor-page .pubs li{margin-bottom:8px}.editor-page .tag{display:inline-block;padding:1px 8px;border-radius:999px;background:var(--paper-2);font:700 .75rem var(--sans)}
`;

module.exports = { EDITOR, editorLd, bylineHtml, articleLd, editorPage, llmsLines, EDITOR_CSS };
