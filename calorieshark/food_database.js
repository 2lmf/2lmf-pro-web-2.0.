const localFoodDB = [
    // === MLIJEKO I MLIJEČNI PROIZVODI ===
    {
        name: "Mlijeko kravlje, 3.2% mm",
        keywords: ["mlijeko 3.2", "mlijeko 3,2", "punomasno mlijeko", "mlijeka 3.2", "mlijeka 3,2", "domace mlijeko"],
        kcalPer100g: 61,
        macrosPer100g: { carbs: 4.7, protein: 3.3, fat: 3.2 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "salica": 200 },
        note: "1 dl ≈ 100g. Standardno punomasno mlijeko."
    },
    {
        name: "Mlijeko kravlje, 2.8% mm",
        keywords: ["mlijeko 2.8", "mlijeko 2,8", "trajno mlijeko", "mlijeka 2.8", "mlijeka 2,8"],
        kcalPer100g: 58,
        macrosPer100g: { carbs: 4.7, protein: 3.3, fat: 2.8 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "salica": 200 },
        note: "1 dl ≈ 100g. Standardno trajno mlijeko."
    },
    {
        name: "Mlijeko kravlje, 1.5% mm",
        keywords: ["mlijeko 1.5", "mlijeko 1,5", "niskomasno mlijeko", "mlijeka 1.5"],
        kcalPer100g: 45,
        macrosPer100g: { carbs: 4.8, protein: 3.4, fat: 1.5 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "salica": 200 },
        note: "1 dl ≈ 100g. Niskomasno mlijeko (light)."
    },
    {
        name: "Zobeno mlijeko (bez secera)",
        keywords: ["zobeno", "zobeno mlijeko", "zobenog mlijeka", "oat milk"],
        kcalPer100g: 42,
        macrosPer100g: { carbs: 6.8, protein: 1, fat: 1.5 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250 },
        note: "1 dl ≈ 100g. Nezaslađeni napitak."
    },
    {
        name: "Bademovo mlijeko (bez secera)",
        keywords: ["bademovo", "bademovo mlijeko", "bademovog mlijeka", "almond milk"],
        kcalPer100g: 13,
        macrosPer100g: { carbs: 0.1, protein: 0.5, fat: 1.1 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250 },
        note: "1 dl ≈ 100g. Najmanje kalorična alternativa."
    },
    {
        name: "Jogurt tekući, 3.2% mm",
        keywords: ["jogurt", "tekucu jogurt", "tekuci jogurt", "casa jogurta"],
        kcalPer100g: 60,
        macrosPer100g: { carbs: 4.5, protein: 3.3, fat: 3.2 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 200 },
        note: "Standarna čašica jogurta je cca 180-200g."
    },
    {
        name: "Kefir, 3.5% mm",
        keywords: ["kefir", "kefira", "casa kefira"],
        kcalPer100g: 65,
        macrosPer100g: { carbs: 4, protein: 3.3, fat: 3.5 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 200 },
        note: "Standardna procjena."
    },
    {
        name: "Svježi zrnati sir (Zagrebački sir/Posni)",
        keywords: ["posni sir", "svjezi sir", "zrnati sir", "bijeli sir", "zagrebacki sir", "domaci sir"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 3.8, protein: 12.5, fat: 2.5 },
        standardUnits: { "zlica": 20, "zlicica": 10, "porcija": 150 },
        note: "1 velika žlica ≈ 20g."
    },
    {
        name: "Sir Gouda / Edamer",
        keywords: ["sir gauda", "sir edamer", "zuti sir", "gauda", "edamer", "sir za pizzu", "gouda", "snita sira", "snita gaude"],
        kcalPer100g: 350,
        macrosPer100g: { carbs: 0, protein: 25, fat: 28 },
        standardUnits: { "snita": 20, "snite": 20, "listic": 15, "listica": 15 },
        note: "1 tanka šnita / listić ≈ 15-20g."
    },
    {
        name: "Sir Mozzarella",
        keywords: ["mozzarella", "mocarela", "kugla mozzarelle", "mozzarelle"],
        kcalPer100g: 280,
        macrosPer100g: { carbs: 2, protein: 28, fat: 17 },
        standardUnits: { "kom": 125, "komad": 125, "kugla": 125 },
        note: "Standardna kugla (ocijeđena) je cca 125g."
    },
    {
        name: "Maslac",
        keywords: ["maslac", "putar", "maslaca", "zlica maslaca", "malo putra"],
        kcalPer100g: 717,
        macrosPer100g: { carbs: 0.1, protein: 0.9, fat: 81 },
        standardUnits: { "zlicica": 5, "malazlica": 5, "zlica": 15, "porcija": 10 },
        note: "Hotelski paketić je 10g. 1 mala žličica je cca 5g."
    },

    // === JAJA ===
    {
        name: "Jaje (kuhano)",
        keywords: ["kuhano jaje", "jaje na tvrdo", "kuhana jaja"],
        kcalPer100g: 155,
        macrosPer100g: { carbs: 1.1, protein: 12.6, fat: 10.6 },
        standardUnits: { "kom": 60, "komad": 60, "komada": 60 },
        note: "1 kokošje jaje M-L = cca 60g."
    },
    {
        name: "Jaje na oko (pečeno na masnoći)",
        keywords: ["jaje na oko", "jaja na oko", "peceno jaje", "pecena jaja"],
        kcalPer100g: 196,
        macrosPer100g: { carbs: 1, protein: 14, fat: 15 },
        standardUnits: { "kom": 60, "komad": 60, "komada": 60 },
        note: "1 komad ≈ 60g (uračunata mala količina masnoće za pečenje)."
    },
    {
        name: "Kajgana (pečena na masnoći)",
        keywords: ["kajgana", "kajganu", "mucena jaja", "omlet od."],
        kcalPer100g: 210,
        macrosPer100g: { carbs: 1.5, protein: 13, fat: 17 },
        standardUnits: { "jaje": 60, "porcija": 180, "kom": 60 },
        note: "Standardna porcija od 3 jaja je cca 180g (s masnoćom)."
    },

    // === KRUH I PEKARSTVO ===
    {
        name: "Kruh, bijeli pšenični",
        keywords: ["bijeli kruh", "snita kruha", "snita bjelog kruha", "bjeli kruh", "komad kruha", "kruv", "snita kruva"],
        kcalPer100g: 265,
        macrosPer100g: { carbs: 49, protein: 9, fat: 3.2 },
        standardUnits: { "snita": 40, "komad": 40, "snite": 40, "feta": 40 },
        note: "1 prosječna šnita kruha ≈ 40 grama."
    },
    {
        name: "Kruh, crni / raženi miješani",
        keywords: ["crni kruh", "razeni kruh", "snita crnog kruha", "integralni kruh", "tamni kruh", "snita tamnog kruha"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 46, protein: 8, fat: 3.5 },
        standardUnits: { "snita": 45, "komad": 45, "snite": 45, "feta": 45 },
        note: "1 šnita tamanog kruha je gušća ≈ 45 grama."
    },
    {
        name: "Kruh, kukuruzni miješani",
        keywords: ["kukuruzni kruh", "snita kukuruznog kruha", "kukuruznog kruha"],
        kcalPer100g: 270,
        macrosPer100g: { carbs: 52, protein: 7, fat: 2.5 },
        standardUnits: { "snita": 50, "komad": 50, "snite": 50, "feta": 50 },
        note: "1 šnita kukuruznog kruha je prilično teška ≈ 50 grama."
    },
    {
        name: "Pecivo, bijelo (Kajzerica / Žemlja)",
        keywords: ["pecivo", "kajzerica", "zemlja", "bijelo pecivo", "zemicka"],
        kcalPer100g: 275,
        macrosPer100g: { carbs: 55, protein: 8, fat: 3 },
        standardUnits: { "kom": 60, "komad": 60, "komada": 60 },
        note: "1 standardna kajzerica/žemlja ≈ 60 do 70 grama."
    },
    {
        name: "Kifla (Slana)",
        keywords: ["kifla", "slana kifla", "slani klipic", "klipic"],
        kcalPer100g: 290,
        macrosPer100g: { carbs: 53, protein: 9, fat: 5 },
        standardUnits: { "kom": 80, "komad": 80, "komada": 80 },
        note: "1 kupovna kifla ili manji klipić = cca 80g."
    },
    {
        name: "Toast (Tost kruh)",
        keywords: ["tost", "toast", "snita tosta", "snita toast", "tost kruh"],
        kcalPer100g: 280,
        macrosPer100g: { carbs: 48, protein: 9, fat: 4 },
        standardUnits: { "snita": 25, "komad": 25, "snite": 25, "feta": 25 },
        note: "1 šnita tosta lagana je oko 25g."
    },
    {
        name: "Burek s mesom (Pekara)",
        keywords: ["burek s mesom", "burek s meson", "komad bureka s mesom", "struca bureka od mesa"],
        kcalPer100g: 310,
        macrosPer100g: { carbs: 32, protein: 12, fat: 15 },
        standardUnits: { "kom": 250, "komad": 250, "cetvrtina": 250, "polovina": 500, "cijeli": 1000 },
        note: "1 mlinarev/upanov komad (četvrtina tepsije ili štruca) ≈ 250g."
    },
    {
        name: "Burek sa sirom / Sirnica (Pekara)",
        keywords: ["burek sa sirom", "sirnica", "burek od sira", "burek sir"],
        kcalPer100g: 320,
        macrosPer100g: { carbs: 34, protein: 10, fat: 16 },
        standardUnits: { "kom": 250, "komad": 250, "cetvrtina": 250, "polovina": 500, "cijeli": 1000 },
        note: "1 standardni komad (četvrtina) ≈ 250g. Masnije od mesa."
    },
    {
        name: "Croissant (Kroasan) s čokoladom",
        keywords: ["kroasan", "croissant", "kroasan s cokoladom", "7days kroasan", "cokoladni kroasan"],
        kcalPer100g: 400,
        macrosPer100g: { carbs: 46, protein: 7, fat: 22 },
        standardUnits: { "kom": 80, "komad": 80, "komada": 80 },
        note: "1 pekarski kroasan (čokolada/lješnjak) je cca 80g. Manji, poput 7days, su 60g."
    },
    {
        name: "Krafna s marmeladom",
        keywords: ["krafna", "pokladnica", "krafna marmelada", "krofna"],
        kcalPer100g: 330,
        macrosPer100g: { carbs: 44, protein: 5, fat: 15 },
        standardUnits: { "kom": 80, "komad": 80, "komada": 80 },
        note: "1 standardna pekarska krafna ≈ 80g."
    },

    // === PIĆA I NAPITCI ===
    {
        name: "Espresso (Kava bez šećera i mlijeka)",
        keywords: ["espresso", "kratka kava", "crna kava", "kava bez", "turska kava prazna", "produzeni espresso"],
        kcalPer100g: 2,
        macrosPer100g: { carbs: 0, protein: 0, fat: 0 },
        standardUnits: { "salica": 30, "kava": 30 },
        note: "Čista kava nema kalorija. Tekućina ≈ 30ml."
    },
    {
        name: "Macchiato (Kava s malo mlijeka, bez šećera)",
        keywords: ["makijato", "macchiato", "kava s mlijekom", "espresso s mlijekom", "kava mlijeko bez secera", "kratka kava s mlijekom"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 1, protein: 1, fat: 1 },
        standardUnits: { "salica": 60, "kava": 60 },
        note: "Mala količina mlijeka (cca 30ml) dodaje ~20 kcal po šalici."
    },
    {
        name: "Bijela kava / Veliki Macchiato (Bez šećera)",
        keywords: ["veliki macchiato", "bijela kava", "cappuccino", "kapucino", "kava s puno mlijeka"],
        kcalPer100g: 35,
        macrosPer100g: { carbs: 3, protein: 2, fat: 2 },
        standardUnits: { "salica": 150, "kava": 150 },
        note: "Sadrži cca 1 deci mlijeka po šalici (cca 50-60 kcal)."
    },
    {
        name: "Dodatni paket šećera (Kafić)",
        keywords: ["paket secera", "vrecica secera", "paketic secera", "zlica secera", "bijeli secer"],
        kcalPer100g: 387,
        macrosPer100g: { carbs: 100, protein: 0, fat: 0 },
        standardUnits: { "vrecica": 5, "kom": 5, "zlicica": 5 },
        note: "1 vrećica iz kafića ili 1 žličica = ravno 5g (20 kcal čistih ugljikohidrata)."
    },
    {
        name: "Svijetlo pivo (Lager pivo)",
        keywords: ["pivo", "zujacka", "ozujsko", "karlovacko", "svijetlo pivo", "veliko pivo", "malo pivo", "toceno pivo", "lager pivo", "lager"],
        kcalPer100g: 43,
        macrosPer100g: { carbs: 3.6, protein: 0.5, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500 },
        note: "1 veliko (pola litre) sadrži oko 215 Kcal."
    },
    {
        name: "Tamno / Crno pivo",
        keywords: ["crno pivo", "tamno pivo", "tomislav", "stout", "porter", "crno"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 4.5, protein: 0.6, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500 },
        note: "Neznatno kaloričnije i jače od svijetlog. 1 veliko (pola litre) = 250 kcal."
    },
    {
        name: "Pšenično pivo (Hefeweizen)",
        keywords: ["psenicno pivo", "psenicno", "psenica", "paulaner", "erdinger", "weizen", "psenicno pivo", "psenicno", "pšenično pivo", "pšenično"],
        kcalPer100g: 45,
        macrosPer100g: { carbs: 3.5, protein: 0.5, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500 },
        note: "Kalorijski slično lageru, oko 225 kcal na pola litre."
    },
    {
        name: "Craft pivo (IPA / APA / Pale Ale)",
        keywords: ["craft pivo", "ipa", "apa", "pale ale", "ale pivo", "zahmeljeno pivo"],
        kcalPer100g: 55,
        macrosPer100g: { carbs: 4.0, protein: 0.6, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500 },
        note: "Craft piva i Pale Ale-ovi obično imaju veći postotak alkohola i ekstrakta pa su kaloričnija. 1 veliko = cca 275 kcal."
    },
    {
        name: "Bijelo vino",
        keywords: ["bijelo vino", "dec bijelog", "deci vina", "gemist (bez vode)"],
        kcalPer100g: 82,
        macrosPer100g: { carbs: 2.6, protein: 0.1, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 150, "deci": 100 },
        note: "1 dl (čistog vina) = cca 82 Kcal (gemišt 2v-1 voda je oko 130 Kcal)."
    },
    {
        name: "Crno vino (Crveno)",
        keywords: ["crno vino", "crveno vino", "dec crnog", "casa vina"],
        kcalPer100g: 85,
        macrosPer100g: { carbs: 2.6, protein: 0.1, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 150, "deci": 100 },
        note: "1 čaša restoranske mjere (1.5 dl) = cca 125 Kcal."
    },
    {
        name: "Gemišt / Bevanda / Špricer",
        keywords: ["gemist", "bevanda", "spricer", "casa gemista", "litra i voda", "bambus"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 1.5, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 200 },
        note: "Pola vino pola mineralna. 1 čaša (2 dl) = oko 100 Kcal."
    },
    {
        name: "Pelinkovac / Jägermeister / Biteri",
        keywords: ["pelinkovac", "pelin", "jegermeister", "jeger", "amaro", "campari", "biha", "rakija"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 12, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "cep": 30, "kratko": 30, "duplo": 60 },
        note: "Jako kalorično zbog šećera i alkohola. Žestice imaju oko 75 kcal po standardnoj (0.03l) čašici (čepa)."
    },
    {
        name: "Coca-Cola (Regularna)",
        keywords: ["coca cola", "kola", "koka kola", "pepsi"],
        kcalPer100g: 42,
        macrosPer100g: { carbs: 10.6, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "boca": 500, "limenka": 330, "casa": 250 },
        note: "Mala limenka (330ml) ima 140 kcal (sve iz šećera)."
    },
    {
        name: "Coca-Cola Zero / Pepsi Max",
        keywords: ["coca cola zero", "pepsi max", "coca cola bez secera", "kola zero"],
        kcalPer100g: 0.3,
        macrosPer100g: { carbs: 0, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "boca": 500, "limenka": 330, "casa": 250 },
        note: "Nema kalorija."
    },
    {
        name: "Cedevita (otopljena u vodi)",
        keywords: ["cedevita", "cedevite", "casa cedevite"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 3.5, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 250 },
        note: "Gleda se napitak (voda + prah). 1 velika čaša (3 dl) = cca 45 Kcal."
    },
    {
        name: "Voćni sok (Nektar, Jabuka/Naranča, 50% voće)",
        keywords: ["sok od jabuke", "sok od narance", "vocni sok", "cappy", "juicy", "sok juice"],
        kcalPer100g: 45,
        macrosPer100g: { carbs: 11, protein: 0.5, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "boca": 500, "casa": 200 },
        note: "Kalorijski identično Coca-Coli. Čaša (2dl) = 90 kcal."
    },

    // === MESO I PILETINA (SIROVO ILI PEČENO BEZ DODATNE MASTI) ===
    {
        name: "Pileća prsa (bijelo meso, sirovo)",
        keywords: ["pileca prsa", "piletina prsa", "bijelo meso", "file piletine", "pileci file"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 0, protein: 23, fat: 1.2 },
        standardUnits: { "odrezak": 150, "file": 200, "porcija": 150 },
        note: "Krt i niskokokaloričan protein. 1 manji odrezak ≈ 150g."
    },
    {
        name: "Pileći batak sa zabatkom (s kožom, sirovo)",
        keywords: ["pileci batak", "pileci zabatak", "otkosteni zabatak", "piletina batak"],
        kcalPer100g: 210,
        macrosPer100g: { carbs: 0, protein: 18, fat: 15 },
        standardUnits: { "kom": 200, "komad": 200 },
        note: "Više masti i kalorija zbog kože i kosti. Koža nosi većinu vate."
    },
    {
        name: "Svinjski but (bez kosti, sirovo)",
        keywords: ["svinjski but", "svinjetina but", "svinjski odrezak od buta"],
        kcalPer100g: 135,
        macrosPer100g: { carbs: 0, protein: 22, fat: 5 },
        standardUnits: { "odrezak": 150, "snita": 150, "porcija": 150 },
        note: "Relativno krto meso. 1 odrezak ≈ 150g."
    },
    {
        name: "Svinjski vrat (prošarani, sirovo)",
        keywords: ["svinjski vrat", "vratina", "svinjska vratina", "svinjski kotlet"],
        kcalPer100g: 260,
        macrosPer100g: { carbs: 0, protein: 16, fat: 22 },
        standardUnits: { "odrezak": 180, "komad": 180, "porcija": 180 },
        note: "Dosta masti, odlično za roštilj. 1 komad vratine je cca 180g."
    },
    {
        name: "Miješano mljeveno meso (Govedina/Svinjetina)",
        keywords: ["mljeveno meso", "mijesano mljeveno", "fasirano meso"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 0, protein: 18, fat: 20 },
        standardUnits: { "porcija": 200, "pakiranje": 500 },
        note: "Masnije mljeveno meso, učestalo se koristi za bolonjez i sarmu."
    },
    {
        name: "Ćevapi (Zapečeno meso, Roštilj)",
        keywords: ["cevapi", "cevapcici", "porcija cevapa", "cevap"],
        kcalPer100g: 260,
        macrosPer100g: { carbs: 2, protein: 15, fat: 21 },
        standardUnits: { "kom": 25, "komad": 25, "porcija": 250, "mali_cevapi": 125, "veliki_cevapi": 250 },
        note: "Velika porcija od 10 komada ima cca 250g samo mesa (650 Kcal)! Zasebno bilježi lepinju."
    },

    // === SUVOMESNATO (NARESCI) ===
    {
        name: "Pršut (sušeni)",
        keywords: ["prsut", "fetica prsuta", "snita prsuta", "dalmatinski prsut"],
        kcalPer100g: 270,
        macrosPer100g: { carbs: 1, protein: 26, fat: 18 },
        standardUnits: { "snita": 15, "feta": 15, "porcija": 100 },
        note: "1 jako tanka prozirna narezana feticica ≈ 15 grama."
    },
    {
        name: "Zimska / Srijemska kobasica (Salama)",
        keywords: ["zimska salama", "zimska kobasica", "cajna kobasica", "kulen", "srijemska", "gavrilovic", "snita cajne"],
        kcalPer100g: 480,
        macrosPer100g: { carbs: 2, protein: 22, fat: 43 },
        standardUnits: { "snita": 5, "feta": 5, "porcija": 50, "kom": 5 },
        note: "Jako kalorično! 1 industrijska šnita ≈ samo 5g."
    },
    {
        name: "Pikana šunka (Dimljena, Kuhana)",
        keywords: ["sunka", "kuhana sunka", "pizza sunka", "sunka u ovitku", "snita sunke"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 1, protein: 18, fat: 4 },
        standardUnits: { "snita": 15, "feta": 15, "porcija": 50 },
        note: "Vrlo krto u usporedbi sa salamama. 1 velika šnita ≈ 15 do 20 grama."
    },
    {
        name: "Panceta / Špek (Sušena slanina)",
        keywords: ["spek", "panceta", "slanine", "slanina", "suho meso mast", "snita pancete", "snita speka"],
        kcalPer100g: 420,
        macrosPer100g: { carbs: 0, protein: 15, fat: 40 },
        standardUnits: { "snita": 15, "feta": 15, "porcija": 50 },
        note: "Puna masnoće. 1 režanj slanine ≈ 15 grama."
    },
    {
        name: "Poli / Parizer / Hrenovka",
        keywords: ["parizer", "poli", "posebna", "hrenovka", "hrenovke", "snita parizera"],
        kcalPer100g: 280,
        macrosPer100g: { carbs: 3, protein: 11, fat: 25 },
        standardUnits: { "snita": 15, "kom": 60, "hrenovka": 60, "par": 120 },
        note: "Deblja šnita Poli salame je 15g. 1 klasična hrenovka iznosi oko 60g."
    },

    // === PRILOZI (KUHANO STANJE) ===
    {
        name: "Krumpir (Kuhani, pečeni bez ulja)",
        keywords: ["krumpir", "kuhani krumpir", "leso krumpir", "porcija krumpira", "krumpir salata"],
        kcalPer100g: 86,
        macrosPer100g: { carbs: 20, protein: 2, fat: 0.1 },
        standardUnits: { "kom": 150, "komad": 150, "porcija": 250 },
        note: "Krumpir sam po sebi slabo deblja. 1 srednji krumpir = 150g."
    },
    {
        name: "Pomfrit (Pržen u ulju)",
        keywords: ["pomfri", "pommes frites", "pomfrit", "przeni krumpirice", "porcija pomfrija", "mali pomfri", "veliki pomfri"],
        kcalPer100g: 312,
        macrosPer100g: { carbs: 41, protein: 3.5, fat: 15 },
        standardUnits: { "porcija": 150, "mali": 100, "srednji": 150, "veliki": 200 },
        note: "Prženje u ulju utrostruči kalorije krumpira. Standardna porcija uz roštilj = cca 150g."
    },
    {
        name: "Riža (Bijela, Kuhana)",
        keywords: ["riza", "kuhana riza", "bijela riza", "porcija rize"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 28, protein: 2.7, fat: 0.3 },
        standardUnits: { "porcija": 200, "zlica": 20, "salica": 150 },
        note: "Odnosi se isključivo na SKUHANU smjesu (nabubrenu vodom). Kuhana porcija u restoranu iznosi preko 200g."
    },
    {
        name: "Tjestenina / Makaruni (Kuhano, Bijelo tijesto)",
        keywords: ["tjesto", "tjestenina", "pasta", "makaruni", "spageti", "porcija paste", "kuhana tjestenina"],
        kcalPer100g: 158,
        macrosPer100g: { carbs: 31, protein: 5.8, fat: 0.9 },
        standardUnits: { "porcija": 200, "zlica": 20 },
        note: "Odnosi se isključivo na KUHANU smjesu (napuhana težina). Obična porcija iznosi cca 200g."
    },
    {
        name: "Grah s vodom (Iz konzerve / Skuhani)",
        keywords: ["grah", "pasulj", "kuhani grah", "grah salata", "zaprzeni grah"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 20, protein: 7, fat: 0.5 },
        standardUnits: { "porcija": 200, "konzerva": 400, "pola": 200 },
        note: "Odličan zasitan protein (iako sadrži puno UH). 1 standardna porcija (ne variva) = 200g."
    },

    // === VOĆE ===
    {
        name: "Banana",
        keywords: ["banana", "banane", "bananu"],
        kcalPer100g: 89,
        macrosPer100g: { carbs: 23, protein: 1.1, fat: 0.3 },
        standardUnits: { "kom": 120, "komad": 120, "bananu": 120 },
        note: "1 komad srednje veličine ≈ 120 grama jestivog djela."
    },
    {
        name: "Jabuka",
        keywords: ["jabuka", "jabuke", "jabuku", "zelena jabuka"],
        kcalPer100g: 52,
        macrosPer100g: { carbs: 14, protein: 0.3, fat: 0.2 },
        standardUnits: { "kom": 150, "komad": 150 },
        note: "1 komad srednje veličine ≈ 150 grama jestivog djela."
    },
    {
        name: "Zelena salata (Kristalka, Puterica)",
        keywords: ["zelena salata", "kristalka", "puterica", "salata mjesana"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 2.8, protein: 1.4, fat: 0.2 },
        standardUnits: { "porcija": 100, "zdjelica": 100 },
        note: "Brojke čiste salate. Kalorije su nebitne ukoliko je ne poliješ sa 3 žlice maslinovog ulja (3x90 Kcal!)."
    },
    {
        name: "Rajčica (Paradajz)",
        keywords: ["rajcica", "rajcice", "paradajz", "paradajza", "pomidor"],
        kcalPer100g: 18,
        macrosPer100g: { carbs: 3.9, protein: 0.9, fat: 0.2 },
        standardUnits: { "kom": 120, "komad": 120 },
        note: "1 srednje veliki paradajz = cca 120-150g."
    },
    {
        name: "Zeleno zelje / Kupus (Svježe)",
        keywords: ["zelje", "kupus", "salata od zelja"],
        kcalPer100g: 25,
        macrosPer100g: { carbs: 6, protein: 1.3, fat: 0.1 },
        standardUnits: { "porcija": 150, "zdjelica": 150 },
        note: "Izuzetno dijetalno. Ali pazi, varivo sa zaprškom mijenja matematiku."
    },

    // === OSTALO (ZAČINI / NAMIRE) ===
    {
        name: "Maslinovo ulje",
        keywords: ["maslinovo ulje", "zlica maslinovog", "maslinovog ulja", "domace ulje"],
        kcalPer100g: 884,
        macrosPer100g: { carbs: 0, protein: 0, fat: 100 },
        standardUnits: { "zlica": 15, "zlicica": 5, "dl": 100 },
        note: "OPREZ: 1 velika jušna žlica sadrži enormnih 130 Kcal čiste masti!"
    },
    {
        name: "Suncokretovo ulje",
        keywords: ["suncokretovo ulje", "ulje za przenje", "zlica ulja", "ulja"],
        kcalPer100g: 884,
        macrosPer100g: { carbs: 0, protein: 0, fat: 100 },
        standardUnits: { "zlica": 15, "zlicica": 5, "dl": 100 },
        note: "1 velika jušna žlica = cca 15g (130 Kcal)."
    },
    {
        name: "Čokolada (Mliječna klasična)",
        keywords: ["cokolada", "milka", "dorina", "kockica cokolade", "red cokolade"],
        kcalPer100g: 535,
        macrosPer100g: { carbs: 59, protein: 7.5, fat: 30 },
        standardUnits: { "kom": 100, "boca": 100, "kockica": 5, "red": 20 },
        note: "1 red (4 kockice) obične mliječne čokolade teži oko 20g."
    },
    {
        name: "Pahuljice zobene (Sirove, Suhe)",
        keywords: ["zobene", "zobene pahuljice", "porcija zobenih", "zobenih"],
        kcalPer100g: 389,
        macrosPer100g: { carbs: 66, protein: 17, fat: 7 },
        standardUnits: { "zlica": 10, "porcija": 60, "salica": 80 },
        note: "Kalorijski bogate. Porcija kojom napuniš manju zdjelicu (prije vode/mlijeka) je oko 60g."
    },
    {
        name: "Whey Protein prah",
        keywords: ["whey protein", "mjerice wheya", "mjerica wheya", "proteinski prah", "whey izolat"],
        kcalPer100g: 380,
        macrosPer100g: { carbs: 5, protein: 80, fat: 4 },
        standardUnits: { "mjerica": 30, "porcija": 30, "scoop": 30 },
        note: "1 standardna mjerica (scoop) koja dođe u kutiji teži oko 30g."
    },
    // === JUHE ===
    {
        name: "Bistra pileća juha / Goveđa juha",
        keywords: ["juha", "pileca juha", "goveda juha", "bistra juha", "tanjur juhe", "juhu", "pilecu juhu", "domaca juha"],
        kcalPer100g: 30,
        macrosPer100g: { carbs: 3, protein: 2, fat: 1 },
        standardUnits: { "tanjur": 250, "porcija": 250, "ml": 1, "dl": 100 },
        note: "Default prepoznata juha. 1 standardni tanjur je oko 250ml (75 kcal)."
    },
    {
        name: "Riblja juha",
        keywords: ["riblja juha", "tanjur riblje juhe", "riblju juhu"],
        kcalPer100g: 40,
        macrosPer100g: { carbs: 3, protein: 4, fat: 1.5 },
        standardUnits: { "tanjur": 250, "porcija": 250, "ml": 1, "dl": 100 },
        note: "Malo bogatija proteinima. 1 standardni tanjur je oko 250ml (100 kcal)."
    },
    // === MORSKI PLODOVI ===
    {
        name: "Škampi na žaru (ili kuhani)",
        keywords: ["skampi", "skampe", "skampi zar", "skampi na zaru", "peceni skampi", "kuhani skampi", "skampi zaru", "porcija skampa"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 0, protein: 18, fat: 1.5 },
        standardUnits: { "porcija": 300, "kom": 30, "grama": 1 },
        note: "Čisto meso škampa ima jako malo kalorija. Porcija s ljuskama od 300g donosi oko 100g čistog mesa."
    },
    {
        name: "Škampi na buzaru",
        keywords: ["skampi na buzaru", "buzara", "skampe na buzaru", "buzaru"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 2, protein: 15, fat: 6 },
        standardUnits: { "porcija": 350, "kom": 30, "grama": 1 },
        note: "Umak (buzara) sadrži maslinovo ulje, vino, krušne mrvice. Porcija ima više kalorija zbog safta."
    }
];

// Očisti dijakritičke znakove (š,đ,č,ć,ž -> s,d,c,c,z) i pretvori u mala slova
function normalizeString(str) {
    if (!str) return "";
    return str.toLowerCase()
        .replace(/š/g, 's').replace(/đ/g, 'd').replace(/č/g, 'c')
        .replace(/ć/g, 'c').replace(/ž/g, 'z')
        .replace(/[,\.]/g, ' ')
        .trim();
}

// Lokalni "AI" Parser koji pokušava dešifrirati rečenicu i spojiti ju s rječnikom
function searchLocalFoodDB(query) {
    let normalizedQuery = normalizeString(query);

    // Pronađi količinu: npr "2 jaja" -> 2. "mjerica wheya" -> 1. "Pola kile" -> 0.5 (za hardkodiranje kasnije, za sad obicne brojke)
    let quantity = 1;
    const numMatch = normalizedQuery.match(/([0-9]+[.,]?[0-9]*)/);
    if (numMatch) {
        quantity = parseFloat(numMatch[1].replace(',', '.'));
        normalizedQuery = normalizedQuery.replace(numMatch[0], '').trim(); // Mičemo broj iz upita ("2 decilitra mlijeka" -> "decilitra mlijeka")
    }

    // Pronađi moguću mjernu jedinicu kroz regex/string match, inače pretpostavljamo po defaultu prvo što nađemo
    let foundUnitType = null;
    let foundUnitFactor = null;

    // Levenshtein distance funkcija
    function levenshtein(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        let matrix = [];
        for (let i = 0; i <= b.length; i++) { matrix[i] = [i]; }
        for (let j = 0; j <= a.length; j++) { matrix[0][j] = j; }
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1));
                }
            }
        }
        return matrix[b.length][a.length];
    }

    // Lista definiranih namirnica iz baze sa Scoreom pretrage
    let bestMatch = null;
    let bestScore = -1; // Sada manji score znaci vecu udaljenost, mi trazimo blago bodovanje

    // Advanced fuzzy pronalazak baze:
    localFoodDB.forEach(food => {
        let score = 0;

        // Direktan pogodak
        if (normalizeString(food.name) === normalizedQuery) score += 100;

        food.keywords.forEach(kw => {
            const normalizedKw = normalizeString(kw);

            // 1. Exact contains (Kao i prije)
            if (normalizedQuery.includes(normalizedKw)) {
                score += normalizedKw.length * 2;
            }

            // 2. Levenshtein fuzzy match za tipfelere
            const distance = levenshtein(normalizedQuery, normalizedKw);
            // Ako je razlika vrlo mala u odnosu na duljinu rijeci (npr 1 ili 2 tipfelera)
            if (distance <= 2 && normalizedKw.length > 4) {
                score += (normalizedKw.length * 2) - distance; // Dodaj bodove ali umanji za greske
            }
        });

        if (score > bestScore && score > 6) { // Prag bodova, snizen zbog fuzzy-a
            bestScore = score;
            bestMatch = food;
        }
    });

    if (!bestMatch) {
        return null; // Nismo dovoljno uvjereni u lokalnoj bazi, šalji pravom Google AI-u!
    }

    // Pročeprkajmo preostali dio riječi (normalizedQuery) da vidimo jel se spominju mjerne jedinice iz tekućeg namirničkog rječnika
    if (bestMatch.standardUnits) {
        Object.keys(bestMatch.standardUnits).forEach(unitKw => {
            const unitKwNorm = normalizeString(unitKw);
            if (normalizedQuery.includes(unitKwNorm)) {
                foundUnitType = unitKw;
                foundUnitFactor = bestMatch.standardUnits[unitKw];
            } else {
                // Pokusaj fuzzy i za mjernu jedinicu (npr porija umjesto porcija)
                const dist = levenshtein(normalizedQuery, unitKwNorm);
                if (dist <= 1 && unitKwNorm.length >= 4) {
                    foundUnitType = unitKw;
                    foundUnitFactor = bestMatch.standardUnits[unitKw];
                }
            }
        });
    }

    // Da nismo detektirali jedinicu (korisnik pitao: "2 jabuke", ali ne kaze 2 komada jabuke), pokušavamo sa fallback-om:
    if (!foundUnitFactor) {
        // Fallback: Ako je namirnica tekućina (ima ml) tražimo ml, ako tvrda kom. Inače uzimamo prvi key.
        if (bestMatch.standardUnits['kom']) { foundUnitType = 'kom'; foundUnitFactor = bestMatch.standardUnits['kom']; }
        else if (bestMatch.standardUnits['komad']) { foundUnitType = 'komad'; foundUnitFactor = bestMatch.standardUnits['komad']; }
        else if (bestMatch.standardUnits['snita']) { foundUnitType = 'snita'; foundUnitFactor = bestMatch.standardUnits['snita']; }
        else if (bestMatch.standardUnits['tanjur']) { foundUnitType = 'tanjur'; foundUnitFactor = bestMatch.standardUnits['tanjur']; } // DODANO: Prioritet tanjuru nad ML
        else if (bestMatch.standardUnits['porcija']) { foundUnitType = 'porcija'; foundUnitFactor = bestMatch.standardUnits['porcija']; }
        else if (bestMatch.standardUnits['ml']) { foundUnitType = 'ml'; foundUnitFactor = 1; } // "200 mlijeka" -> pretpostavka 200ml
        else if (bestMatch.standardUnits['salica']) { foundUnitType = 'salica'; foundUnitFactor = bestMatch.standardUnits['salica']; }
        else {
            // Skroz slijepi fallback
            const firstKey = Object.keys(bestMatch.standardUnits)[0];
            foundUnitType = firstKey;
            foundUnitFactor = bestMatch.standardUnits[firstKey];
        }
    }

    // Ako je tip rekao npr "500 mesa" a failali smo naću mjernu jedinicu osim pukog broja, i to je broj debelo veći od normalnih komada, možemo guessat da su to grami.
    let finalGrams;
    if (quantity >= 20 && foundUnitType !== 'ml' && foundUnitType !== 'dl') {
        // Korisnik je vjerojatno izrekao baš točan broj grama (npr "200 svinjskog vrata" -> 200 grama svinjskog vrata)
        finalGrams = quantity;
    } else {
        finalGrams = quantity * foundUnitFactor;
    }

    return {
        name: bestMatch.name,
        estimatedWeightG: Math.round(finalGrams),
        kcalPer100g: bestMatch.kcalPer100g,
        macrosPer100g: bestMatch.macrosPer100g,
        note: `⚡ Offline AI (${foundUnitType} ≈ ${foundUnitFactor}g) | ${bestMatch.note}`
    };
}
