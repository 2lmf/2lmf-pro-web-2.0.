/**
 * NABAVA.NET XML FEED — 2LMF PRO
 *
 * Kako deployati:
 * 1. Otvori script.google.com → New project
 * 2. Zalijepi ovaj kod
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Kopiraj URL i daj ga nabava.net
 *
 * Ovaj script čita cijene iz Google Sheeta i generira XML.
 * Sheet mora imati stupce: A=SKU, B=Naziv, C=Cijena (s PDV-om)
 * ili koristi isti Sheet kao i kalkulator (prilagodi SHEET_NAME i col indekse dolje).
 */

const SHEET_NAME  = 'cjenik';   // ime lista u Sheetu
const COL_SKU     = 0;          // stupac A
const COL_PRICE   = 4;          // stupac E (prodajna cijena s PDV-om)
const BASE_URL    = 'https://2lmf-pro.hr';

// Podaci o proizvodima (sinkronizirani s kalkulator.html)
const PRODUCTS = [
  { sku:'5001', brand:'Pecron',   name:'Pecron E600LFP (V2), 614 Wh, 600W AC, LiFePO4, 9.4 kg',                img:'assets/pecron-e600.webp',              category:'Prijenosne elektrane > Solarne elektrane > Pecron',       desc:'Prijenosna solarna elektrana Pecron E600LFP V2. Kapacitet 614 Wh, snaga 1200W AC (2400W peak). LiFePO4 baterija 3.500+ ciklusa. Težina 9,4 kg. Max. solarno punjenje 350W. Idealna za kampiranje, plovidbu i hitnu pričuvu struje.', specs:[['Kapacitet','614 Wh'],['Snaga AC','1200W / 2400W peak'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Težina','9,4 kg'],['Max. solar','350W']] },
  { sku:'5002', brand:'Pecron',   name:'Pecron E1500LFP, 1440 Wh, 1500W AC, LiFePO4, proširivo do 18 kWh',     img:'assets/pecron-e1500.webp',             category:'Prijenosne elektrane > Solarne elektrane > Pecron',       desc:'Pecron E1500LFP — prijenosna elektrana 1440 Wh / 2200W AC (4400W peak). LiFePO4, 3.500+ ciklusa, max. solar 800W. Punjenje za 1,8h. Proširivo do 18.432 Wh. Idealna za vikendice, kampove i dulje isključenje struje.', specs:[['Kapacitet','1536 Wh'],['Snaga AC','2200W / 4400W peak'],['Baterija','LiFePO₄ — 3.500+ ciklusa'],['Max. solar','800W'],['Punjenje','1,8 h (AC)'],['Proširivost','do 18.432 Wh']] },
  { sku:'5003', brand:'Pecron',   name:'Pecron E2400LFP, 2048 Wh, 2400W AC, LiFePO4',                          img:'assets/pecron-e2400.jpg',              category:'Prijenosne elektrane > Solarne elektrane > Pecron',       desc:'Pecron E2400LFP — 2048 Wh, 2400W AC (4000W peak). LiFePO4, punjenje za 1,5h. Max. solar 800W.', specs:[['Kapacitet','2048 Wh'],['Snaga AC','2400W / 4000W peak'],['Max. solar','800W']] },
  { sku:'5004', brand:'Pecron',   name:'Pecron E3600LFP, 3072 Wh, 3600W AC, LiFePO4, proširivo',               img:'assets/pecron-e3600.jpg',              category:'Prijenosne elektrane > Solarne elektrane > Pecron',       desc:'Pecron E3600LFP — 3072 Wh, 3600W AC (7200W peak). Max. solar 2400W. Punjenje za 1,3h. Proširivo do 18.432 Wh.', specs:[['Kapacitet','3072 Wh'],['Snaga AC','3600W / 7200W peak'],['Max. solar','2400W']] },
  { sku:'5005', brand:'Pecron',   name:'Pecron E3000LFP, 3096 Wh, 3000W AC, LiFePO4',                          img:'assets/pecron-e3000.jpg',              category:'Prijenosne elektrane > Solarne elektrane > Pecron',       desc:'Pecron E3000LFP — 3096 Wh, 3000W AC. LiFePO4 baterija.', specs:[['Kapacitet','3096 Wh'],['Snaga AC','3000W']] },
  { sku:'5006', brand:'Pecron',   name:'Pecron E3000LFP Expansion Battery, 3072 Wh, 48V',                      img:'assets/pecron-e3000-exp.jpg',          category:'Prijenosne elektrane > Expansion baterije',              desc:'Expansion baterija za Pecron E3000LFP. Kapacitet 3072 Wh, napon 48V. Proširuje kapacitet elektrane.', specs:[['Kapacitet','3072 Wh'],['Kompatibilno','Pecron E3000LFP'],['Napon','48V']] },
  { sku:'5007', brand:'Aferiy',   name:'Aferiy Nano 100, 64 Wh, 100W AC, LiFePO4, ultra kompaktna',            img:'assets/aferiy-nano100.jpg',            category:'Prijenosne elektrane > Solarne elektrane > Aferiy',       desc:'Aferiy Nano 100 — ultra kompaktna prijenosna elektrana 64 Wh / 100W. LiFePO4, 2.000+ ciklusa. Težina ~0,9 kg. Za mobitel, laptop i male uređaje.', specs:[['Kapacitet','64 Wh'],['Snaga AC','100W'],['Težina','~0,9 kg']] },
  { sku:'5008', brand:'Aferiy',   name:'Aferiy P040, 256 Wh, 400W AC, LiFePO4',                                img:'assets/aferiy-p040.webp',              category:'Prijenosne elektrane > Solarne elektrane > Aferiy',       desc:'Aferiy P040 — 256 Wh / 400W AC. LiFePO4, 4.000+ ciklusa. Težina ~3,2 kg. Max. solar 150W.', specs:[['Kapacitet','256 Wh'],['Snaga AC','400W'],['Max. solar','150W']] },
  { sku:'5009', brand:'Aferiy',   name:'Aferiy P010, 512 Wh, 800W AC, LiFePO4',                                img:'assets/aferiy-p010.webp',              category:'Prijenosne elektrane > Solarne elektrane > Aferiy',       desc:'Aferiy P010 — 512 Wh / 800W AC. LiFePO4, 4.000+ ciklusa. Težina 6,25 kg. Max. solar 200W.', specs:[['Kapacitet','512 Wh'],['Snaga AC','800W'],['Težina','6,25 kg']] },
  { sku:'5012', brand:'Aferiy',   name:'Aferiy P210, 2048 Wh, 2400W AC, LiFePO4',                              img:'assets/aferiy-p210.webp',              category:'Prijenosne elektrane > Solarne elektrane > Aferiy',       desc:'Aferiy P210 — 2048 Wh / 2400W AC. LiFePO4, 4.000+ ciklusa. Težina 22 kg. Max. solar 600W.', specs:[['Kapacitet','2048 Wh'],['Snaga AC','2400W'],['Max. solar','600W']] },
  { sku:'5013', brand:'Aferiy',   name:'Aferiy P280, 2048 Wh, 2800W AC, LiFePO4, proširivo do 10 kWh',         img:'assets/aferiy-p280.webp',              category:'Prijenosne elektrane > Solarne elektrane > Aferiy',       desc:'Aferiy P280 — 2048 Wh / 2800W AC. LiFePO4, 4.000+ ciklusa. Punjenje 0-80% za 55 min. Proširivo do 10.240 Wh.', specs:[['Kapacitet','2048 Wh'],['Snaga AC','2800W'],['Punjenje','0–80% za 55 min']] },
  { sku:'5014', brand:'Aferiy',   name:'Aferiy P280 Expansion Battery, 2048 Wh',                               img:'assets/aferiy-p280-exp.jpg',           category:'Prijenosne elektrane > Expansion baterije',              desc:'Expansion baterija za Aferiy P280. Kapacitet 2048 Wh. Proširuje do 4× 2048 Wh.', specs:[['Kapacitet','2048 Wh'],['Kompatibilno','Aferiy P280']] },
  { sku:'5015', brand:'Aferiy',   name:'Aferiy P310, 3840 Wh, 3600W AC, LiFePO4, proširivo do 11 kWh',         img:'assets/aferiy-p310.webp',              category:'Prijenosne elektrane > Solarne elektrane > Aferiy',       desc:'Aferiy P310 — 3840 Wh / 3600W AC. LiFePO4, 4.000+ ciklusa. Max. solar 1200W. Proširivo do 11.520 Wh.', specs:[['Kapacitet','3840 Wh'],['Snaga AC','3600W'],['Max. solar','1200W']] },
  { sku:'5016', brand:'Aferiy',   name:'Aferiy P310 Expansion Battery, 3840 Wh',                               img:'assets/aferiy-p310-exp.jpg',           category:'Prijenosne elektrane > Expansion baterije',              desc:'Expansion baterija za Aferiy P310. Kapacitet 3840 Wh. Proširuje do 3× 3840 Wh.', specs:[['Kapacitet','3840 Wh'],['Kompatibilno','Aferiy P310']] },
  { sku:'5017', brand:'Aferiy',   name:'Aferiy AF-S100A1, 100W solarni panel, foldable, mono, XT60',           img:'assets/aferiy-solar100.webp',          category:'Prijenosne elektrane > Solarni paneli',                  desc:'Aferiy AF-S100A1 — 100W sklopivi solarni panel. Mono, efikasnost ~23%, konektor XT60.', specs:[['Snaga','100W'],['Tip','Foldable mono'],['Efikasnost','~23%']] },
  { sku:'5018', brand:'Aferiy',   name:'Aferiy AF-S200A1, 200W solarni panel, foldable, mono, XT60',           img:'assets/aferiy-solar200.jpg',           category:'Prijenosne elektrane > Solarni paneli',                  desc:'Aferiy AF-S200A1 — 200W sklopivi solarni panel. Mono, efikasnost ~23%, konektor XT60.', specs:[['Snaga','200W'],['Tip','Foldable mono'],['Efikasnost','~23%']] },
  { sku:'5019', brand:'Aferiy',   name:'Aferiy AF-S400A1, 400W solarni panel, foldable, mono, XT60/Anderson',  img:'assets/aferiy-solar400.jpg',           category:'Prijenosne elektrane > Solarni paneli',                  desc:'Aferiy AF-S400A1 — 400W sklopivi solarni panel. Mono, efikasnost ~23%, konektor XT60/Anderson.', specs:[['Snaga','400W'],['Tip','Foldable mono'],['Efikasnost','~23%']] },
  { sku:'5027', brand:'Aferiy',   name:'Aferiy Nomad1800 P180 Pro, 1024 Wh, 1800W AC, LiFePO4, proširivo',    img:'assets/aferiy-p180pro.webp',           category:'Prijenosne elektrane > Solarne elektrane > Aferiy',       desc:'Aferiy Nomad1800 P180 Pro — 1024 Wh / 1800W AC. LiFePO4, 4.000+ ciklusa. Proširivo s P180-B na 2048 Wh. Max. solar 600W.', specs:[['Kapacitet','1024 Wh'],['Snaga AC','1800W'],['Max. solar','600W']] },
  { sku:'5028', brand:'Aferiy',   name:'Aferiy P180-B Expansion Battery, 1024 Wh, hot-swap',                  img:'assets/aferiy-p180b.webp',             category:'Prijenosne elektrane > Expansion baterije',              desc:'Expansion baterija za Aferiy P180 Pro. Kapacitet 1024 Wh. Hot-swap spajanje bez gašenja.', specs:[['Kapacitet','1024 Wh'],['Kompatibilno','Aferiy P180 Pro'],['Spajanje','Hot-swap']] },
  { sku:'5029', brand:'OSCAL',    name:'OSCAL PowerMax 1800 SE, 1024 Wh, 1800W AC, LiFePO4',                  img:'assets/oscal-powermax1800se.jpg',      category:'Prijenosne elektrane > Solarne elektrane > OSCAL',       desc:'OSCAL PowerMax 1800 SE — 1024 Wh / 1800W AC. LiFePO4, 3.500+ ciklusa. Max. solar 400W.', specs:[['Kapacitet','1024 Wh'],['Snaga AC','1800W'],['Max. solar','400W']] },
  { sku:'5020', brand:'OSCAL',    name:'OSCAL PowerMax 2400 Pro, 2016 Wh, 2400W AC, LiFePO4, proširivo',      img:'assets/oscal-powermax2400.jpg',        category:'Prijenosne elektrane > Solarne elektrane > OSCAL',       desc:'OSCAL PowerMax 2400 Pro — 2016 Wh / 2400W AC (4800W peak). LiFePO4, 3.500+ ciklusa. Max. solar 600W. Punjenje ~2h. Proširivo s BP2400 Pro na 4032 Wh.', specs:[['Kapacitet','2016 Wh'],['Snaga AC','2400W / 4800W peak'],['Max. solar','600W']] },
  { sku:'5021', brand:'OSCAL',    name:'OSCAL BP2400 Pro Extension Battery, 2016 Wh, hot-swap',               img:'assets/oscal-bp2400.jpg',             category:'Prijenosne elektrane > Expansion baterije',              desc:'Expansion baterija za OSCAL PowerMax 2400 Pro. Kapacitet 2016 Wh. Hot-swap.', specs:[['Kapacitet','2016 Wh'],['Kompatibilno','OSCAL PowerMax 2400 Pro']] },
  { sku:'5022', brand:'OSCAL',    name:'OSCAL PowerMax 3600 SE, 3600 Wh, 3600W AC, LiFePO4',                  img:'assets/oscal-powermax3600se.webp',     category:'Prijenosne elektrane > Solarne elektrane > OSCAL',       desc:'OSCAL PowerMax 3600 SE — 3600 Wh / 3600W AC. LiFePO4, 3.500+ ciklusa. Max. solar 1200W.', specs:[['Kapacitet','3600 Wh'],['Snaga AC','3600W'],['Max. solar','1200W']] },
  { sku:'5023', brand:'OSCAL',    name:'OSCAL BP3600 Extension Battery, 3600 Wh, hot-swap',                   img:'assets/oscal-bp3600.jpg',             category:'Prijenosne elektrane > Expansion baterije',              desc:'Expansion baterija za OSCAL PowerMax 6000. Kapacitet 3600 Wh. Hot-swap.', specs:[['Kapacitet','3600 Wh'],['Kompatibilno','OSCAL PowerMax 6000']] },
  { sku:'5024', brand:'OSCAL',    name:'OSCAL PowerMax 6000, 3600 Wh, 6000W AC, LiFePO4',                     img:'assets/oscal-powermax6000.jpg',        category:'Prijenosne elektrane > Solarne elektrane > OSCAL',       desc:'OSCAL PowerMax 6000 — 3600 Wh / 6000W AC (12000W peak). LiFePO4, 3.500+ ciklusa. Max. solar 1200W.', specs:[['Kapacitet','3600 Wh'],['Snaga AC','6000W / 12000W peak'],['Max. solar','1200W']] },
  { sku:'5025', brand:'OSCAL',    name:'OSCAL PM200 Pro Solar, 200W, foldable, IP67, DC7909',                  img:'assets/oscal-pm200.jpg',              category:'Prijenosne elektrane > Solarni paneli',                  desc:'OSCAL PM200 Pro Solar — 200W sklopivi solarni panel. Zaštita IP67, konektor DC7909.', specs:[['Snaga','200W'],['Tip','Foldable mono'],['Zaštita','IP67']] },
  { sku:'5026', brand:'OSCAL',    name:'OSCAL PM400 Pro Solar, 400W, foldable, IP67, DC7909/XT60',             img:'assets/oscal-pm400.jpg',              category:'Prijenosne elektrane > Solarni paneli',                  desc:'OSCAL PM400 Pro Solar — 400W sklopivi solarni panel. Zaštita IP67, konektor DC7909/XT60. Efikasnost ~23%.', specs:[['Snaga','400W'],['Tip','Foldable mono'],['Zaštita','IP67']] },
  { sku:'5030', brand:'2LMF PRO', name:'Paket Solar Starter — OSCAL PowerMax 1800 SE + PM200 Pro Solar, 1024 Wh / 200W', img:'assets/oscal-powermax1800se.jpg', category:'Prijenosne elektrane > Paketi', desc:'2LMF PRO paket Solar Starter: OSCAL PowerMax 1800 SE (1024 Wh / 1800W AC) + OSCAL PM200 Pro Solar (200W). LiFePO4, punjenje solarom ~3-4h. Sve što trebate za neovisnost od struje.', specs:[['U paketu','OSCAL PowerMax 1800 SE + PM200 Pro Solar'],['Kapacitet','1024 Wh / 1800W AC'],['Solarni panel','200W foldable']] },
  { sku:'5031', brand:'2LMF PRO', name:'Paket Nomad Double — Aferiy P180 Pro + P180-B Expansion, 2048 Wh ukupno', img:'assets/aferiy-p180pro.webp',     category:'Prijenosne elektrane > Paketi', desc:'2LMF PRO paket Nomad Double: Aferiy Nomad1800 P180 Pro (1024 Wh / 1800W) + Aferiy P180-B Expansion (1024 Wh). Ukupno 2048 Wh. Hot-swap, LiFePO4 4.000+ ciklusa.', specs:[['U paketu','Aferiy P180 Pro + P180-B Expansion'],['Ukupni kapacitet','2048 Wh'],['Spajanje','Hot-swap']] },
  { sku:'5032', brand:'2LMF PRO', name:'Paket Power Base — OSCAL PowerMax 2400 Pro + PM400 Pro Solar, 2016 Wh / 400W', img:'assets/oscal-powermax2400.jpg', category:'Prijenosne elektrane > Paketi', desc:'2LMF PRO paket Power Base: OSCAL PowerMax 2400 Pro (2016 Wh / 2400W AC) + OSCAL PM400 Pro Solar (400W). LiFePO4, punjenje solarom ~3-4h. Proširivo s BP2400 Pro na 4032 Wh.', specs:[['U paketu','OSCAL PowerMax 2400 Pro + PM400 Pro Solar'],['Kapacitet','2016 Wh / 2400W AC'],['Solarni panel','400W foldable']] },
];

function doGet(e) {
  const prices = getPricesFromSheet();
  const xml = buildXml(prices);
  return ContentService.createTextOutput(xml).setMimeType(ContentService.MimeType.XML);
}

function getPricesFromSheet() {
  const priceMap = {};
  try {
    const ss = SpreadsheetApp.openById('1YmRZMeomWxAmfi6rsLN6qKrHrrAeHOnGVbnfsZXP3w4');
    const sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) return priceMap;
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {  // skip header row
      const sku = String(data[i][COL_SKU]).trim();
      const price = parseFloat(String(data[i][COL_PRICE]).replace(',', '.'));
      if (sku && !isNaN(price) && price > 0) priceMap[sku] = price;
    }
  } catch(e) {
    Logger.log('Sheet error: ' + e.toString());
  }
  return priceMap;
}

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function buildXml(prices) {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<products>'];

  for (const p of PRODUCTS) {
    const price = prices[p.sku];
    if (!price || price <= 0) continue;  // preskoči proizvode bez cijene

    const imgUrl = p.img.startsWith('http') ? p.img : `${BASE_URL}/${p.img}`;
    const productUrl = `${BASE_URL}/proizvod.html?sku=${p.sku}`;

    const specsXml = p.specs.map(([k, v]) =>
      `      <specification>\n        <key>${esc(k)}</key>\n        <value>${esc(v)}</value>\n      </specification>`
    ).join('\n');

    lines.push('  <product>');
    lines.push(`    <name>${esc(p.name)}</name>`);
    lines.push(`    <price>${price.toFixed(2).replace('.', ',')}</price>`);
    lines.push(`    <url>${esc(productUrl)}</url>`);
    lines.push(`    <availability>po narudžbi</availability>`);
    lines.push(`    <internal_product_id>${esc(p.sku)}</internal_product_id>`);
    lines.push(`    <category>${esc(p.category)}</category>`);
    lines.push(`    <image_url>${esc(imgUrl)}</image_url>`);
    lines.push(`    <description>${esc(p.desc)}</description>`);
    lines.push(`    <brand>${esc(p.brand)}</brand>`);
    lines.push(`    <shipping_cost>0</shipping_cost>`);
    lines.push(`    <warranty>24 mjeseca</warranty>`);
    if (specsXml) lines.push(specsXml);
    lines.push('  </product>');
  }

  lines.push('</products>');
  return lines.join('\n');
}
