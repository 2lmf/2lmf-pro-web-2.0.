/**
 * JEFTINIJE.HR XML FEED — 2LMF PRO
 * Specifikacija: CNJExport v1.6
 *
 * Opcija A — Živi URL (preporučeno):
 *   1. Otvori script.google.com → New project → zalijepi kod
 *   2. Deploy → New deployment → Web app
 *      Execute as: Me | Who has access: Anyone
 *   3. Kopiraj URL i pošalji jeftinije.hr timu
 *      (oni ga sami povlače, cijene uvijek aktualne)
 *
 * Opcija B — Statični XML fajl:
 *   1. Deplojaj kao web app (gore)
 *   2. Otvori URL u browseru → Spremi stranicu kao jeftinije-feed.xml
 *   3. Pošalji fajl jeftinije.hr timu
 *
 * Cijene se čitaju iz Google Sheeta — uvijek aktualne.
 */

const SHEET_ID   = '1YmRZMeomWxAmfi6rsLN6qKrHrrAeHOnGVbnfsZXP3w4';
const SHEET_NAME = 'CJENIK';
const COL_SKU    = 0;  // A = Šifra
const COL_PRICE  = 4;  // E = Prodajna Cijena (SA PDV)
const BASE_URL   = 'https://2lmf-pro.hr';

// fileUnder — separator je " - " prema jeftinije.hr/ceneje.si specifikaciji
const FU_ELECTRANE = 'Elektronika - Baterije i akumulatori - Prijenosne elektrane';
const FU_SOLAR     = 'Elektronika - Baterije i akumulatori - Solarni paneli';
const FU_SATOR     = 'Sport i rekreacija - Kampiranje - Krovni šatori za automobile';
const FU_KAMP_OPR  = 'Sport i rekreacija - Kampiranje - Oprema za kampiranje';

// groupId — expansion baterije i matična jedinica dijele isti groupId
// Proizvodi bez varijanti imaju prazan groupId.
const PRODUCTS = [
  // ── PECRON ────────────────────────────────────────────────────────────────
  { sku:'5001', groupId:'',              brand:'Pecron', fileUnder:FU_ELECTRANE,
    name:'Pecron E600LFP (V2), prijenosna elektrana, 614 Wh, 600W AC, LiFePO4',
    img:'assets/pecron-e600.webp',
    desc:'Pecron E600LFP V2 — prijenosna solarna elektrana 614 Wh / 600W AC (1200W peak). LiFePO4 baterija s više od 3.500 ciklusa. Težina 9,4 kg. Maksimalno solarno punjenje 350W. Idealna za kampiranje, plovidbu i hitnu pričuvu struje kod kuće.',
    specs:[['Kapacitet','614 Wh'],['Snaga AC','600W / 1200W peak'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Težina','9,4 kg'],['Max. solarno punjenje','350W']] },

  { sku:'5002', groupId:'',              brand:'Pecron', fileUnder:FU_ELECTRANE,
    name:'Pecron E1500LFP, prijenosna elektrana, 1440 Wh, 2200W AC, LiFePO4, proširivo do 18 kWh',
    img:'assets/pecron-e1500.webp',
    desc:'Pecron E1500LFP — prijenosna elektrana 1440 Wh / 2200W AC (4400W peak). LiFePO4, 3.500+ ciklusa, max. solar 800W. Punjenje za 1,8h. Proširivo do 18.432 Wh.',
    specs:[['Kapacitet','1440 Wh'],['Snaga AC','2200W / 4400W peak'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Max. solar','800W'],['Punjenje AC','1,8 h'],['Proširivost','do 18.432 Wh']] },

  { sku:'5003', groupId:'',              brand:'Pecron', fileUnder:FU_ELECTRANE,
    name:'Pecron E2400LFP, prijenosna elektrana, 2048 Wh, 2400W AC, LiFePO4',
    img:'assets/pecron-e2400.jpg',
    desc:'Pecron E2400LFP — 2048 Wh, 2400W AC (4000W peak). LiFePO4, punjenje za 1,5h. Max. solar 800W.',
    specs:[['Kapacitet','2048 Wh'],['Snaga AC','2400W / 4000W peak'],['Max. solar','800W'],['Punjenje AC','1,5 h']] },

  { sku:'5004', groupId:'',              brand:'Pecron', fileUnder:FU_ELECTRANE,
    name:'Pecron E3600LFP, prijenosna elektrana, 3072 Wh, 3600W AC, LiFePO4, proširivo',
    img:'assets/pecron-e3600.jpg',
    desc:'Pecron E3600LFP — 3072 Wh, 3600W AC (7200W peak). Max. solar 2400W. Punjenje za 1,3h. Proširivo do 18.432 Wh.',
    specs:[['Kapacitet','3072 Wh'],['Snaga AC','3600W / 7200W peak'],['Max. solar','2400W'],['Punjenje AC','1,3 h'],['Proširivost','do 18.432 Wh']] },

  { sku:'5005', groupId:'G-PECRON-E3000', brand:'Pecron', fileUnder:FU_ELECTRANE,
    name:'Pecron E3000LFP, prijenosna elektrana, 3096 Wh, 3000W AC, LiFePO4',
    img:'assets/pecron-e3000.jpg',
    desc:'Pecron E3000LFP — 3096 Wh, 3000W AC. LiFePO4 baterija, 3.500+ ciklusa.',
    specs:[['Kapacitet','3096 Wh'],['Snaga AC','3000W'],['Baterija','LiFePO₄ — 3.500+ ciklusa']] },

  { sku:'5006', groupId:'G-PECRON-E3000', brand:'Pecron', fileUnder:FU_ELECTRANE,
    name:'Pecron E3000LFP Expansion Battery, 3072 Wh, 48V',
    img:'assets/pecron-e3000-exp.jpg',
    desc:'Expansion baterija za Pecron E3000LFP. Kapacitet 3072 Wh, napon 48V. Proširuje kapacitet elektrane.',
    specs:[['Kapacitet','3072 Wh'],['Kompatibilno s','Pecron E3000LFP'],['Napon','48V']] },

  // ── AFERIY ────────────────────────────────────────────────────────────────
  { sku:'5007', groupId:'',              brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy Nano 100, prijenosna elektrana, 64 Wh, 100W AC, LiFePO4, ultra kompaktna',
    img:'assets/aferiy-nano100.jpg',
    desc:'Aferiy Nano 100 — ultra kompaktna prijenosna elektrana 64 Wh / 100W AC. LiFePO4, 2.000+ ciklusa. Težina ~0,9 kg. Za punjenje mobitela, laptopa i malih uređaja.',
    specs:[['Kapacitet','64 Wh'],['Snaga AC','100W'],['Baterija','LiFePO₄ — 2.000+ ciklusa'],['Težina','~0,9 kg']] },

  { sku:'5008', groupId:'',              brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P040, prijenosna elektrana, 256 Wh, 400W AC, LiFePO4',
    img:'assets/aferiy-p040.webp',
    desc:'Aferiy P040 — 256 Wh / 400W AC. LiFePO4, 4.000+ ciklusa. Težina ~3,2 kg. Max. solar 150W.',
    specs:[['Kapacitet','256 Wh'],['Snaga AC','400W'],['Baterija','LiFePO₄ — 4.000+ ciklusa'],['Težina','~3,2 kg'],['Max. solar','150W']] },

  { sku:'5009', groupId:'',              brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P010, prijenosna elektrana, 512 Wh, 800W AC, LiFePO4',
    img:'assets/aferiy-p010.webp',
    desc:'Aferiy P010 — 512 Wh / 800W AC. LiFePO4, 4.000+ ciklusa. Težina 6,25 kg. Max. solar 200W.',
    specs:[['Kapacitet','512 Wh'],['Snaga AC','800W'],['Baterija','LiFePO₄ — 4.000+ ciklusa'],['Težina','6,25 kg'],['Max. solar','200W']] },

  { sku:'5012', groupId:'',              brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P210, prijenosna elektrana, 2048 Wh, 2400W AC, LiFePO4',
    img:'assets/aferiy-p210.webp',
    desc:'Aferiy P210 — 2048 Wh / 2400W AC. LiFePO4, 4.000+ ciklusa. Težina 22 kg. Max. solar 600W.',
    specs:[['Kapacitet','2048 Wh'],['Snaga AC','2400W'],['Baterija','LiFePO₄ — 4.000+ ciklusa'],['Težina','22 kg'],['Max. solar','600W']] },

  { sku:'5013', groupId:'G-AFERIY-P280', brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P280, prijenosna elektrana, 2048 Wh, 2800W AC, LiFePO4, proširivo do 10 kWh',
    img:'assets/aferiy-p280.webp',
    desc:'Aferiy P280 — 2048 Wh / 2800W AC. LiFePO4, 4.000+ ciklusa. Punjenje 0–80% za 55 min. Proširivo do 10.240 Wh.',
    specs:[['Kapacitet','2048 Wh'],['Snaga AC','2800W'],['Baterija','LiFePO₄ — 4.000+ ciklusa'],['Brzo punjenje','0–80% za 55 min'],['Proširivost','do 10.240 Wh']] },

  { sku:'5014', groupId:'G-AFERIY-P280', brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P280 Expansion Battery, 2048 Wh',
    img:'assets/aferiy-p280-exp.jpg',
    desc:'Expansion baterija za Aferiy P280. Kapacitet 2048 Wh. Proširuje do 4× 2048 Wh.',
    specs:[['Kapacitet','2048 Wh'],['Kompatibilno s','Aferiy P280']] },

  { sku:'5015', groupId:'G-AFERIY-P310', brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P310, prijenosna elektrana, 3840 Wh, 3600W AC, LiFePO4, proširivo do 11 kWh',
    img:'assets/aferiy-p310.webp',
    desc:'Aferiy P310 — 3840 Wh / 3600W AC. LiFePO4, 4.000+ ciklusa. Max. solar 1200W. Proširivo do 11.520 Wh.',
    specs:[['Kapacitet','3840 Wh'],['Snaga AC','3600W'],['Baterija','LiFePO₄ — 4.000+ ciklusa'],['Max. solar','1200W'],['Proširivost','do 11.520 Wh']] },

  { sku:'5016', groupId:'G-AFERIY-P310', brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P310 Expansion Battery, 3840 Wh',
    img:'assets/aferiy-p310-exp.jpg',
    desc:'Expansion baterija za Aferiy P310. Kapacitet 3840 Wh. Proširuje do 3× 3840 Wh.',
    specs:[['Kapacitet','3840 Wh'],['Kompatibilno s','Aferiy P310']] },

  { sku:'5027', groupId:'G-AFERIY-P180', brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy Nomad1800 P180 Pro, prijenosna elektrana, 1024 Wh, 1800W AC, LiFePO4',
    img:'assets/aferiy-p180pro.webp',
    desc:'Aferiy Nomad1800 P180 Pro — 1024 Wh / 1800W AC. LiFePO4, 4.000+ ciklusa. Proširivo s P180-B na 2048 Wh. Max. solar 600W.',
    specs:[['Kapacitet','1024 Wh'],['Snaga AC','1800W'],['Baterija','LiFePO₄ — 4.000+ ciklusa'],['Max. solar','600W'],['Proširivost','do 2048 Wh']] },

  { sku:'5028', groupId:'G-AFERIY-P180', brand:'Aferiy', fileUnder:FU_ELECTRANE,
    name:'Aferiy P180-B Expansion Battery, 1024 Wh, hot-swap',
    img:'assets/aferiy-p180b.webp',
    desc:'Expansion baterija za Aferiy Nomad1800 P180 Pro. Kapacitet 1024 Wh. Hot-swap spajanje bez gašenja elektrane.',
    specs:[['Kapacitet','1024 Wh'],['Kompatibilno s','Aferiy P180 Pro'],['Spajanje','Hot-swap (bez gašenja)']] },

  // ── AFERIY SOLARNI PANELI ─────────────────────────────────────────────────
  { sku:'5017', groupId:'',              brand:'Aferiy', fileUnder:FU_SOLAR,
    name:'Aferiy AF-S100A1, 100W solarni panel, sklopivi, mono, XT60',
    img:'assets/aferiy-solar100.webp',
    desc:'Aferiy AF-S100A1 — 100W sklopivi solarni panel. Mono kristalni, efikasnost ~23%. Konektor XT60.',
    specs:[['Snaga','100W'],['Tip','Foldable monokristalni'],['Efikasnost','~23%'],['Konektor','XT60']] },

  { sku:'5018', groupId:'',              brand:'Aferiy', fileUnder:FU_SOLAR,
    name:'Aferiy AF-S200A1, 200W solarni panel, sklopivi, mono, XT60',
    img:'assets/aferiy-solar200.jpg',
    desc:'Aferiy AF-S200A1 — 200W sklopivi solarni panel. Mono kristalni, efikasnost ~23%. Konektor XT60.',
    specs:[['Snaga','200W'],['Tip','Foldable monokristalni'],['Efikasnost','~23%'],['Konektor','XT60']] },

  { sku:'5019', groupId:'',              brand:'Aferiy', fileUnder:FU_SOLAR,
    name:'Aferiy AF-S400A1, 400W solarni panel, sklopivi, mono, XT60/Anderson',
    img:'assets/aferiy-solar400.jpg',
    desc:'Aferiy AF-S400A1 — 400W sklopivi solarni panel. Mono kristalni, efikasnost ~23%. Konektori XT60/Anderson.',
    specs:[['Snaga','400W'],['Tip','Foldable monokristalni'],['Efikasnost','~23%'],['Konektor','XT60 / Anderson']] },

  // ── OSCAL ─────────────────────────────────────────────────────────────────
  { sku:'5029', groupId:'',              brand:'OSCAL', fileUnder:FU_ELECTRANE,
    name:'OSCAL PowerMax 1800 SE, prijenosna elektrana, 1024 Wh, 1800W AC, LiFePO4',
    img:'assets/oscal-powermax1800se.jpg',
    desc:'OSCAL PowerMax 1800 SE — 1024 Wh / 1800W AC. LiFePO4, 3.500+ ciklusa. Max. solar 400W.',
    specs:[['Kapacitet','1024 Wh'],['Snaga AC','1800W'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Max. solar','400W']] },

  { sku:'5020', groupId:'G-OSCAL-2400',  brand:'OSCAL', fileUnder:FU_ELECTRANE,
    name:'OSCAL PowerMax 2400 Pro, prijenosna elektrana, 2016 Wh, 2400W AC, LiFePO4, proširivo',
    img:'assets/oscal-powermax2400.jpg',
    desc:'OSCAL PowerMax 2400 Pro — 2016 Wh / 2400W AC (4800W peak). LiFePO4, 3.500+ ciklusa. Max. solar 600W. Punjenje ~2h. Proširivo s BP2400 Pro na 4032 Wh.',
    specs:[['Kapacitet','2016 Wh'],['Snaga AC','2400W / 4800W peak'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Max. solar','600W'],['Punjenje AC','~2 h'],['Proširivost','do 4032 Wh']] },

  { sku:'5021', groupId:'G-OSCAL-2400',  brand:'OSCAL', fileUnder:FU_ELECTRANE,
    name:'OSCAL BP2400 Pro Extension Battery, 2016 Wh, hot-swap',
    img:'assets/oscal-bp2400.jpg',
    desc:'Expansion baterija za OSCAL PowerMax 2400 Pro. Kapacitet 2016 Wh. Hot-swap.',
    specs:[['Kapacitet','2016 Wh'],['Kompatibilno s','OSCAL PowerMax 2400 Pro'],['Spajanje','Hot-swap']] },

  { sku:'5022', groupId:'',              brand:'OSCAL', fileUnder:FU_ELECTRANE,
    name:'OSCAL PowerMax 3600 SE, prijenosna elektrana, 3600 Wh, 3600W AC, LiFePO4',
    img:'assets/oscal-powermax3600se.webp',
    desc:'OSCAL PowerMax 3600 SE — 3600 Wh / 3600W AC. LiFePO4, 3.500+ ciklusa. Max. solar 1200W.',
    specs:[['Kapacitet','3600 Wh'],['Snaga AC','3600W'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Max. solar','1200W']] },

  { sku:'5023', groupId:'G-OSCAL-6000',  brand:'OSCAL', fileUnder:FU_ELECTRANE,
    name:'OSCAL BP3600 Extension Battery, 3600 Wh, hot-swap',
    img:'assets/oscal-bp3600.jpg',
    desc:'Expansion baterija za OSCAL PowerMax 6000. Kapacitet 3600 Wh. Hot-swap.',
    specs:[['Kapacitet','3600 Wh'],['Kompatibilno s','OSCAL PowerMax 6000'],['Spajanje','Hot-swap']] },

  { sku:'5024', groupId:'G-OSCAL-6000',  brand:'OSCAL', fileUnder:FU_ELECTRANE,
    name:'OSCAL PowerMax 6000, prijenosna elektrana, 3600 Wh, 6000W AC, LiFePO4',
    img:'assets/oscal-powermax6000.jpg',
    desc:'OSCAL PowerMax 6000 — 3600 Wh / 6000W AC (12000W peak). LiFePO4, 3.500+ ciklusa. Max. solar 1200W.',
    specs:[['Kapacitet','3600 Wh'],['Snaga AC','6000W / 12000W peak'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Max. solar','1200W']] },

  // ── OSCAL SOLARNI PANELI ──────────────────────────────────────────────────
  { sku:'5025', groupId:'',              brand:'OSCAL', fileUnder:FU_SOLAR,
    name:'OSCAL PM200 Pro Solar, 200W solarni panel, sklopivi, IP67, DC7909',
    img:'assets/oscal-pm200.jpg',
    desc:'OSCAL PM200 Pro Solar — 200W sklopivi solarni panel. Zaštita IP67 (vodootporan), konektor DC7909. Efikasnost ~23%.',
    specs:[['Snaga','200W'],['Tip','Foldable monokristalni'],['Zaštita','IP67 (vodootporan)'],['Konektor','DC7909'],['Efikasnost','~23%']] },

  { sku:'5026', groupId:'',              brand:'OSCAL', fileUnder:FU_SOLAR,
    name:'OSCAL PM400 Pro Solar, 400W solarni panel, sklopivi, IP67, DC7909/XT60',
    img:'assets/oscal-pm400.jpg',
    desc:'OSCAL PM400 Pro Solar — 400W sklopivi solarni panel. Zaštita IP67, konektori DC7909/XT60. Efikasnost ~23%.',
    specs:[['Snaga','400W'],['Tip','Foldable monokristalni'],['Zaštita','IP67 (vodootporan)'],['Konektor','DC7909 / XT60'],['Efikasnost','~23%']] },

  // ── PAKETI ────────────────────────────────────────────────────────────────
  { sku:'5030', groupId:'',              brand:'2LMF PRO', fileUnder:FU_ELECTRANE,
    name:'Paket Solar Starter — OSCAL PowerMax 1800 SE + OSCAL PM200 Pro Solar',
    img:'assets/oscal-powermax1800se.jpg',
    desc:'2LMF PRO paket Solar Starter: OSCAL PowerMax 1800 SE (1024 Wh / 1800W AC) + OSCAL PM200 Pro Solar (200W). LiFePO4, punjenje solarom ~3–4h.',
    specs:[['U paketu','OSCAL PowerMax 1800 SE + PM200 Pro Solar'],['Kapacitet elektrane','1024 Wh / 1800W AC'],['Solarni panel','200W sklopivi, IP67']] },

  { sku:'5031', groupId:'',              brand:'2LMF PRO', fileUnder:FU_ELECTRANE,
    name:'Paket Nomad Double — Aferiy Nomad1800 P180 Pro + Aferiy P180-B Expansion',
    img:'assets/aferiy-p180pro.webp',
    desc:'2LMF PRO paket Nomad Double: Aferiy Nomad1800 P180 Pro (1024 Wh / 1800W AC) + Aferiy P180-B Expansion (1024 Wh). Ukupno 2048 Wh. Hot-swap, LiFePO4.',
    specs:[['U paketu','Aferiy P180 Pro + P180-B Expansion'],['Ukupni kapacitet','2048 Wh / 1800W AC'],['Spajanje','Hot-swap (bez gašenja)']] },

  { sku:'5032', groupId:'',              brand:'2LMF PRO', fileUnder:FU_ELECTRANE,
    name:'Paket Power Base — OSCAL PowerMax 2400 Pro + OSCAL PM400 Pro Solar',
    img:'assets/oscal-powermax2400.jpg',
    desc:'2LMF PRO paket Power Base: OSCAL PowerMax 2400 Pro (2016 Wh / 2400W AC) + OSCAL PM400 Pro Solar (400W). LiFePO4, punjenje solarom ~3–4h. Proširivo s BP2400 Pro na 4032 Wh.',
    specs:[['U paketu','OSCAL PowerMax 2400 Pro + PM400 Pro Solar'],['Kapacitet','2016 Wh / 2400W AC'],['Solarni panel','400W sklopivi, IP67']] },

  // ── CAMPBOXI ──────────────────────────────────────────────────────────────
  { sku:'6001', groupId:'G-CAMPBOXI-NEST', brand:'CampBoxi', fileUnder:FU_SATOR,
    name:'CampBoxi Nest 160, krovni šator za automobil, 2 osobe, 160x240 cm',
    img:'assets/campboxi-nest160.webp',
    desc:'CampBoxi Nest 160 — krovni šator za automobil za 2 osobe. Dimenzije 160×240 cm. Aluminijska konstrukcija, vodonepropusna tkanina (3.000 mm). Brzo postavljanje, integrirana ljestvica i torba za transport.',
    specs:[['Kapacitet','2 osobe'],['Dimenzije (otvoreno)','160×240 cm'],['Materijal','Aluminij + poliester'],['Vodonepropusnost','3.000 mm'],['Tip','Soft-shell, sklopivi']] },

  { sku:'6002', groupId:'G-CAMPBOXI-NEST', brand:'CampBoxi', fileUnder:FU_SATOR,
    name:'CampBoxi Nest 130, krovni šator za automobil, 2 osobe, 130x240 cm',
    img:'assets/campboxi-nest130.webp',
    desc:'CampBoxi Nest 130 — kompaktniji krovni šator za automobil za 2 osobe. Dimenzije 130×240 cm. Aluminijska konstrukcija, vodonepropusna tkanina (3.000 mm).',
    specs:[['Kapacitet','2 osobe'],['Dimenzije (otvoreno)','130×240 cm'],['Materijal','Aluminij + poliester'],['Vodonepropusnost','3.000 mm'],['Tip','Soft-shell, sklopivi']] },

  { sku:'6003', groupId:'',              brand:'CampBoxi', fileUnder:FU_KAMP_OPR,
    name:'CampBoxi 270° Awning, tenda za krovni šator, 270° pokrivenost',
    img:'assets/campboxi-awning270.webp',
    desc:'CampBoxi 270° Awning — tenda koja pruža pokrivenost od 270° oko krovnog šatora. Idealna za hlad i zaštitu od kiše.',
    specs:[['Pokrivenost','270°'],['Kompatibilno s','CampBoxi Nest 160, Nest 130'],['Materijal','Poliester 210D']] },

  { sku:'6004', groupId:'',              brand:'CampBoxi', fileUnder:FU_KAMP_OPR,
    name:'CampBoxi UNI Awning, univerzalna tenda za krovni šator',
    img:'assets/campboxi-awning-uni.webp',
    desc:'CampBoxi UNI Awning — univerzalna tenda kompatibilna s većinom krovnih šatora. Brzo postavljanje.',
    specs:[['Kompatibilnost','Univerzalna'],['Materijal','Poliester']] },

  { sku:'6005', groupId:'',              brand:'CampBoxi', fileUnder:FU_KAMP_OPR,
    name:'CampBoxi LUX, podna prostirka za krovni šator',
    img:'assets/campboxi-lux.webp',
    desc:'CampBoxi LUX — podna prostirka za krovne šatore. Izolacija od hladnoće i udobnost.',
    specs:[['Tip','Podna prostirka za krovni šator'],['Materijal','EVA pjena']] },

  { sku:'6007', groupId:'',              brand:'CampBoxi', fileUnder:FU_KAMP_OPR,
    name:'CampBoxi Unifit, univerzalni krovni nosač za šator',
    img:'assets/campboxi-unifit.webp',
    desc:'CampBoxi Unifit — univerzalni krovni nosač koji omogućuje montažu CampBoxi šatora na gotovo svaki automobil s krovnim nosačima.',
    specs:[['Tip','Krovni nosač / montažni set'],['Kompatibilnost','Univerzalna (s krovnim nosačima)'],['Materijal','Aluminij']] },

  { sku:'6008', groupId:'',              brand:'CampBoxi', fileUnder:FU_KAMP_OPR,
    name:'CampBoxi Kitchenfit, kuhinjski modul za krovni šator',
    img:'assets/campboxi-kitchenfit.webp',
    desc:'CampBoxi Kitchenfit — integrirani kuhinjski modul za krovne šatore. Prostor za kuhalo, pribor i namirnice.',
    specs:[['Tip','Kuhinjski modul za kampiranje'],['Kompatibilno s','CampBoxi Nest serija'],['Materijal','Aluminij']] },

  // ── TENTBOX ───────────────────────────────────────────────────────────────
  { sku:'6009', groupId:'G-TENTBOX-SOFT', brand:'TentBox', fileUnder:FU_SATOR,
    name:'TentBox GO, kompaktni krovni šator za automobil, 2 osobe',
    img:'assets/tentbox-go.webp',
    desc:'TentBox GO — kompaktni krovni šator soft-shell konstrukcije za 2 osobe. Brzo postavljanje, aluminijska konstrukcija, vodonepropusna tkanina. Dolazi s integriranom ljestvinom i torbom.',
    specs:[['Kapacitet','2 osobe'],['Tip','Soft-shell, sklopivi'],['Materijal','Aluminij + rip-stop poliester'],['Vodonepropusnost','2.000 mm']] },

  { sku:'6010', groupId:'G-TENTBOX-SOFT', brand:'TentBox', fileUnder:FU_SATOR,
    name:'TentBox Lite, lagani krovni šator za automobil, 2 osobe',
    img:'assets/tentbox-lite.webp',
    desc:'TentBox Lite — lagani krovni šator za 2 osobe. Aluminijska konstrukcija, vodonepropusna tkanina 2.000+ mm. Integrirana ljestvina i torba.',
    specs:[['Kapacitet','2 osobe'],['Tip','Soft-shell, sklopivi'],['Materijal','Aluminij + polikoton'],['Vodonepropusnost','2.000+ mm']] },

  { sku:'6011', groupId:'G-TENTBOX-SOFT', brand:'TentBox', fileUnder:FU_SATOR,
    name:'TentBox Lite XL, prošireni krovni šator za automobil, 2-3 osobe',
    img:'assets/tentbox-lite-xl.webp',
    desc:'TentBox Lite XL — proširena verzija TentBox Lite, za 2–3 osobe. Veći unutarnji prostor.',
    specs:[['Kapacitet','2–3 osobe'],['Tip','Soft-shell, sklopivi'],['Materijal','Aluminij + polikoton'],['Vodonepropusnost','2.000+ mm']] },

  { sku:'6012', groupId:'G-TENTBOX-SOFT', brand:'TentBox', fileUnder:FU_SATOR,
    name:'TentBox Classic, klasični krovni šator za automobil, 2-3 osobe',
    img:'assets/tentbox-classic.webp',
    desc:'TentBox Classic — klasični krovni šator za 2–3 osobe. Robusna aluminijska konstrukcija, polikoton platno za optimalnu regulaciju temperature.',
    specs:[['Kapacitet','2–3 osobe'],['Tip','Soft-shell, sklopivi'],['Materijal','Aluminij + polikoton'],['Ventilacija','4 prozora s mrežicom']] },

  { sku:'6013', groupId:'',              brand:'TentBox', fileUnder:FU_SATOR,
    name:'TentBox Cargo, krovni šator za terensko vozilo, 2-3 osobe, pojačana nosivost',
    img:'assets/tentbox-cargo.webp',
    desc:'TentBox Cargo — krovni šator za terenska i 4×4 vozila s pojačanom nosivošću. Za 2–3 osobe. Otporan na teške uvjete.',
    specs:[['Kapacitet','2–3 osobe'],['Tip','Soft-shell, sklopivi'],['Primjena','Terenski / 4×4 off-road'],['Materijal','Aluminij + polikoton']] },

  { sku:'6014', groupId:'',              brand:'TentBox', fileUnder:FU_KAMP_OPR,
    name:'TentBox Kitchenbox, kuhinjska kutija za kampiranje',
    img:'assets/tentbox-kitchenbox.webp',
    desc:'TentBox Kitchenbox — kompaktna kuhinjska kutija za kampiranje. Montira se na krovni nosač uz TentBox šator.',
    specs:[['Tip','Kuhinjska kutija za kampiranje'],['Kompatibilno s','TentBox šatori i vozila s krovnim nosačima'],['Materijal','Aluminij']] },
];


// ── GOOGLE SHEETS: ČITANJE CIJENA ─────────────────────────────────────────────
function getPricesFromSheet() {
  const priceMap = {};
  try {
    const ss    = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) return priceMap;
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      const sku   = String(data[i][COL_SKU]).trim();
      const price = parseFloat(String(data[i][COL_PRICE]).replace(',', '.'));
      if (sku && !isNaN(price) && price > 0) priceMap[sku] = price;
    }
  } catch (e) {
    Logger.log('Sheet error: ' + e.toString());
  }
  return priceMap;
}


// ── XML HELPERS ───────────────────────────────────────────────────────────────
function cdata(str) {
  return '<![CDATA[' + String(str || '') + ']]>';
}

function priceHR(num) {
  return num.toFixed(2).replace('.', ',');
}


// ── XML BUILDER ───────────────────────────────────────────────────────────────
function buildXml(prices) {
  const L = ['<?xml version="1.0" encoding="UTF-8"?>', '<CNJExport>'];

  for (const p of PRODUCTS) {
    const price = prices[p.sku];
    if (!price || price <= 0) continue;

    const imgUrl     = p.img.startsWith('http') ? p.img : `${BASE_URL}/${p.img}`;
    const productUrl = `${BASE_URL}/proizvod.html?sku=${p.sku}`;

    const specsHtml = '<ul>' +
      p.specs.map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join('') +
      '</ul>';

    const attrsXml = p.specs.map(([k, v]) =>
      `      <attribute>\n        <name>${cdata(k)}</name>\n        <values><value>${cdata(v)}</value></values>\n      </attribute>`
    ).join('\n');

    L.push('  <Item>');
    L.push(`    <ID>${cdata(p.sku)}</ID>`);
    L.push(`    <groupId>${cdata(p.groupId)}</groupId>`);
    L.push(`    <name>${cdata(p.name)}</name>`);
    L.push(`    <description>${cdata('<p>' + p.desc + '</p>')}</description>`);
    L.push(`    <specifications>${cdata(specsHtml)}</specifications>`);
    L.push(`    <link>${cdata(productUrl)}</link>`);
    L.push(`    <mainImage>${cdata(imgUrl)}</mainImage>`);
    L.push(`    <moreImages></moreImages>`);
    L.push(`    <price>${priceHR(price)}</price>`);
    L.push(`    <curCode>EUR</curCode>`);
    L.push(`    <stock>preorder</stock>`);
    L.push(`    <fileUnder>${cdata(p.fileUnder)}</fileUnder>`);
    L.push(`    <brand>${cdata(p.brand)}</brand>`);
    L.push(`    <EAN></EAN>`);
    L.push(`    <productCode>${cdata(p.sku)}</productCode>`);
    L.push(`    <condition>${cdata('new')}</condition>`);
    L.push(`    <warranty>${cdata('24 mjeseca')}</warranty>`);
    L.push(`    <deliveryCost>0,00</deliveryCost>`);
    L.push(`    <deliveryTimeMin>3</deliveryTimeMin>`);
    L.push(`    <deliveryTimeMax>7</deliveryTimeMax>`);
    L.push(`    <attributes>`);
    L.push(`      <gender></gender>`);
    L.push(`      <color></color>`);
    L.push(`      <size></size>`);
    L.push(`      <ageGroup></ageGroup>`);
    L.push(attrsXml);
    L.push(`    </attributes>`);
    L.push('  </Item>');
  }

  L.push('</CNJExport>');
  return L.join('\n');
}


// ── WEB APP ENTRY POINT ───────────────────────────────────────────────────────
function doGet(e) {
  const prices = getPricesFromSheet();
  const xml    = buildXml(prices);
  return ContentService
    .createTextOutput(xml)
    .setMimeType(ContentService.MimeType.XML);
}
