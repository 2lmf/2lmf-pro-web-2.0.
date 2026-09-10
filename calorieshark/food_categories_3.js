// ==========================================
// CALORIESHARK - DODATNA OFFLINE BAZA (v3)
// Nova jela: mliječno, iznutrice, riba, povrće, voće,
// orašasti, žitarice/kruh, biljni protein, azijska kuhinja.
// Vrijednosti su na 100 g / 100 ml (kuhano/gotovo stanje osim gdje piše SUHO).
// ==========================================

const extendedFoodDB_3 = [

    // === MLIJEČNO I SIREVI (DODATNO) ===
    {
        name: "Mlijeko kravlje, 0.9% mm (obrano)",
        name_en: "Skimmed Milk (0.9% fat)",
        keywords: ["obrano mlijeko", "mlijeko 0.9", "mlijeko 0,9", "posno mlijeko", "skimmed milk", "skim milk"],
        kcalPer100g: 40,
        macrosPer100g: { carbs: 4.8, protein: 3.4, fat: 0.9 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 250, "salica": 200, "cup": 200 },
        note: "1 dl ≈ 100g. Obrano mlijeko."
    },
    {
        name: "Kiselo vrhnje, 18% mm",
        name_en: "Sour Cream (18% fat)",
        keywords: ["kiselo vrhnje", "vrhnje", "mileram", "kiseli mileram", "sour cream"],
        kcalPer100g: 190,
        macrosPer100g: { carbs: 3, protein: 3, fat: 18 },
        standardUnits: { "zlica": 20, "zlicica": 10, "casa": 180, "porcija": 50, "tbsp": 20 },
        note: "1 velika žlica ≈ 20g."
    },
    {
        name: "Slatko vrhnje, 32% mm (za šlag)",
        name_en: "Heavy Cream (32% fat)",
        keywords: ["slatko vrhnje", "vrhnje za slag", "vrhnje za kuhanje", "heavy cream", "whipping cream"],
        kcalPer100g: 317,
        macrosPer100g: { carbs: 3, protein: 2.5, fat: 32 },
        standardUnits: { "zlica": 15, "dl": 100, "ml": 1 },
        note: "1 dl ≈ 100g. Vrlo masno."
    },
    {
        name: "Puding (gotovi, čokolada/vanilija)",
        name_en: "Ready-made Pudding",
        keywords: ["puding", "cokoladni puding", "puding vanilija", "gotovi puding", "danette", "pudding"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 21, protein: 3.5, fat: 3.5 },
        standardUnits: { "casica": 125, "kom": 125, "porcija": 125 },
        note: "1 čašica gotovog pudinga ≈ 125g."
    },
    {
        name: "Topljeni sir (trokutići, 45% mm)",
        name_en: "Processed Melted Cheese",
        keywords: ["topljeni sir", "sir trokutic", "sir trokutici", "zdenka sir", "processed cheese"],
        kcalPer100g: 290,
        macrosPer100g: { carbs: 5, protein: 13, fat: 25 },
        standardUnits: { "trokutic": 18, "kom": 18, "porcija": 35 },
        note: "1 trokutić ≈ 17-18g."
    },
    {
        name: "Tvrdi sir (Parmezan / Paški / Grana)",
        name_en: "Hard Cheese (Parmesan type)",
        keywords: ["parmezan", "paski sir", "grana padano", "tvrdi sir", "ribani sir", "hard cheese", "parmesan"],
        kcalPer100g: 400,
        macrosPer100g: { carbs: 2, protein: 32, fat: 29 },
        standardUnits: { "zlica": 10, "zlicica": 5, "porcija": 20, "snita": 20 },
        note: "1 žlica ribanog ≈ 10g."
    },

    // === MESO I IZNUTRICE (DODATNO) ===
    {
        name: "Janjetina (pečena, srednje masna)",
        name_en: "Roast Lamb (medium fat)",
        keywords: ["janjetina", "pecena janjetina", "janje", "janjetina s raznja", "lamb"],
        kcalPer100g: 230,
        macrosPer100g: { carbs: 0, protein: 25, fat: 15 },
        standardUnits: { "porcija": 250, "komad": 200 },
        note: "1 restoranska porcija ≈ 200-250g."
    },
    {
        name: "Teletina (krti dio, pečena)",
        name_en: "Veal (lean, cooked)",
        keywords: ["teletina", "teleci odrezak", "teleci naravni", "telece meso", "veal"],
        kcalPer100g: 150,
        macrosPer100g: { carbs: 0, protein: 27, fat: 4.5 },
        standardUnits: { "odrezak": 150, "porcija": 150 },
        note: "Posno crveno meso."
    },
    {
        name: "Srnetina / Divljač (pečena)",
        name_en: "Venison / Game Meat (cooked)",
        keywords: ["srnetina", "divljac", "srneci odrezak", "meso divljaci", "venison", "game meat"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 0, protein: 30, fat: 3.5 },
        standardUnits: { "odrezak": 150, "porcija": 150 },
        note: "Vrlo posno meso divljači."
    },
    {
        name: "Kunić / Zec (pečeni)",
        name_en: "Rabbit Meat (cooked)",
        keywords: ["kunic", "zec", "meso od zeca", "pecena zecetina", "rabbit"],
        kcalPer100g: 135,
        macrosPer100g: { carbs: 0, protein: 21, fat: 5.5 },
        standardUnits: { "porcija": 200, "komad": 150 },
        note: "Posno bijelo meso."
    },
    {
        name: "Ovčetina (pečena)",
        name_en: "Mutton (cooked)",
        keywords: ["ovcetina", "ovcje meso", "pecena ovcetina", "mutton"],
        kcalPer100g: 260,
        macrosPer100g: { carbs: 0, protein: 25, fat: 18 },
        standardUnits: { "porcija": 200, "komad": 200 },
        note: "Masnije crveno meso."
    },
    {
        name: "Jetra (teleća / pileća, pirjana)",
        name_en: "Liver (veal / chicken, cooked)",
        keywords: ["jetra", "jetrica", "teleca jetra", "pileca jetra", "pirjana jetra", "liver"],
        kcalPer100g: 140,
        macrosPer100g: { carbs: 4, protein: 20, fat: 4.5 },
        standardUnits: { "porcija": 150, "odrezak": 120 },
        note: "Bogato željezom, malo masti."
    },
    {
        name: "Bubrezi (teleći / goveđi, kuhani)",
        name_en: "Kidneys (veal / beef, cooked)",
        keywords: ["bubrezi", "teleci bubrezi", "iznutrice bubrezi", "kidneys"],
        kcalPer100g: 105,
        macrosPer100g: { carbs: 0.5, protein: 17, fat: 3.5 },
        standardUnits: { "porcija": 150, "kom": 150 },
        note: "Niskokalorične iznutrice."
    },
    {
        name: "Hrenovke (goveđe + svinjske)",
        name_en: "Frankfurters (beef & pork)",
        keywords: ["hrenovke", "hrenovka", "virsle", "kobasice za kuhanje", "frankfurter", "hot dog sausage"],
        kcalPer100g: 290,
        macrosPer100g: { carbs: 2, protein: 11, fat: 26 },
        standardUnits: { "kom": 60, "hrenovka": 60, "par": 120 },
        note: "1 klasična hrenovka ≈ 60g."
    },
    {
        name: "Hrenovke pileće / pureće",
        name_en: "Chicken / Turkey Frankfurters",
        keywords: ["pilece hrenovke", "pileca hrenovka", "wudy", "pureca hrenovka", "chicken frankfurter"],
        kcalPer100g: 220,
        macrosPer100g: { carbs: 2, protein: 14, fat: 17 },
        standardUnits: { "kom": 50, "hrenovka": 50, "par": 100 },
        note: "1 pileća hrenovka ≈ 50g."
    },
    {
        name: "Krvavice (krvne kobasice)",
        name_en: "Blood Sausage",
        keywords: ["krvavice", "krvavica", "krvna kobasica", "blood sausage"],
        kcalPer100g: 380,
        macrosPer100g: { carbs: 1, protein: 14, fat: 35 },
        standardUnits: { "kom": 150, "par": 300 },
        note: "Masna zimska kobasica."
    },
    {
        name: "Mesni narezak (konzerva, svinjski)",
        name_en: "Canned Pork Luncheon Meat",
        keywords: ["mesni narezak", "narezak konzerva", "gavrilovic narezak", "spam", "luncheon meat"],
        kcalPer100g: 290,
        macrosPer100g: { carbs: 3, protein: 12, fat: 25 },
        standardUnits: { "snita": 25, "konzerva": 150, "porcija": 75 },
        note: "Konzervirano masno meso."
    },

    // === RIBA I PLODOVI MORA (DODATNO) ===
    {
        name: "Bakalar (svježi, kuhani / na lešo)",
        name_en: "Cod (fresh, boiled)",
        keywords: ["bakalar", "kuhani bakalar", "filet bakalara", "bakalar na leso", "cod"],
        kcalPer100g: 82,
        macrosPer100g: { carbs: 0, protein: 18, fat: 0.7 },
        standardUnits: { "filet": 150, "porcija": 200 },
        note: "Vrlo posna bijela riba."
    },
    {
        name: "Grgeč / Smuđ (slatkovodna, pečen)",
        name_en: "Perch / Pike-perch (cooked)",
        keywords: ["grgec", "smud", "smudj", "slatkovodna riba", "perch", "pike perch"],
        kcalPer100g: 85,
        macrosPer100g: { carbs: 0, protein: 18, fat: 1 },
        standardUnits: { "filet": 150, "porcija": 200 },
        note: "Posna riječna riba."
    },
    {
        name: "Pastrva (pečena / na žaru)",
        name_en: "Trout (baked / grilled)",
        keywords: ["pastrva", "pecena pastrva", "pastrva na zaru", "rijecna pastrva", "trout"],
        kcalPer100g: 140,
        macrosPer100g: { carbs: 0, protein: 20, fat: 6 },
        standardUnits: { "kom": 250, "filet": 150, "porcija": 200 },
        note: "1 cijela pastrva porcijaš ≈ 250g."
    },
    {
        name: "Šaran (pečeni)",
        name_en: "Carp (baked)",
        keywords: ["saran", "peceni saran", "dravski saran", "carp"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 0, protein: 20, fat: 8 },
        standardUnits: { "porcija": 200, "potkova": 150 },
        note: "Masnija riječna riba."
    },
    {
        name: "Štuka (kuhana / pečena)",
        name_en: "Pike (cooked)",
        keywords: ["stuka", "filet stuke", "pike fish"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 0, protein: 19, fat: 0.7 },
        standardUnits: { "filet": 150, "porcija": 200 },
        note: "Posna slatkovodna riba."
    },
    {
        name: "Jegulja (pečena)",
        name_en: "Eel (baked)",
        keywords: ["jegulja", "pecena jegulja", "eel"],
        kcalPer100g: 185,
        macrosPer100g: { carbs: 0, protein: 18, fat: 12 },
        standardUnits: { "porcija": 150, "komad": 150 },
        note: "Masna riba."
    },
    {
        name: "Haringa (svježa / dimljena)",
        name_en: "Herring",
        keywords: ["haringa", "dimljena haringa", "herring"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 0, protein: 18, fat: 9 },
        standardUnits: { "filet": 100, "porcija": 150 },
        note: "Plava riba bogata omega-3."
    },
    {
        name: "Inćuni (svježi)",
        name_en: "Anchovies (fresh)",
        keywords: ["incuni", "incun", "svjezi incuni", "brgljuni", "anchovies"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 0, protein: 20, fat: 5 },
        standardUnits: { "kom": 10, "porcija": 100 },
        note: "Sitna plava riba. Slani inćuni u ulju su ≈ 210 kcal."
    },
    {
        name: "Sardine u ulju (konzerva, ocijeđene)",
        name_en: "Canned Sardines in Oil (drained)",
        keywords: ["sardine", "sardine u ulju", "konzerva sardina", "eva sardine", "canned sardines"],
        kcalPer100g: 210,
        macrosPer100g: { carbs: 0, protein: 25, fat: 11 },
        standardUnits: { "konzerva": 90, "porcija": 90 },
        note: "1 konzerva ocijeđeno ≈ 90g."
    },
    {
        name: "Tuna u ulju (konzerva, ocijeđena)",
        name_en: "Canned Tuna in Oil (drained)",
        keywords: ["tuna u ulju", "tunjevina u ulju", "rio mare ulje", "tuna konzerva ulje"],
        kcalPer100g: 190,
        macrosPer100g: { carbs: 0, protein: 25, fat: 9 },
        standardUnits: { "konzerva": 105, "porcija": 105 },
        note: "Ocijeđeno iz ulja. Tuna u vodi je ≈ 115 kcal."
    },
    {
        name: "Jastog (kuhani)",
        name_en: "Lobster (boiled)",
        keywords: ["jastog", "meso jastoga", "hlap", "lobster"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 0.5, protein: 19, fat: 0.9 },
        standardUnits: { "porcija": 150, "kom": 400 },
        note: "Meso bez oklopa; cijeli jastog ≈ 400g s oklopom."
    },
    {
        name: "Kamenica / Ostriga (svježa)",
        name_en: "Oyster (fresh)",
        keywords: ["kamenica", "kamenice", "ostriga", "ostrige", "oyster", "oysters"],
        kcalPer100g: 70,
        macrosPer100g: { carbs: 4, protein: 7, fat: 2.5 },
        standardUnits: { "kom": 30, "komad": 30, "tucet": 360 },
        note: "1 svježa kamenica ≈ 30g s ljušturom."
    },

    // === POVRĆE (DODATNO) ===
    {
        name: "Šparoge (kuhane / na pari)",
        name_en: "Asparagus (cooked)",
        keywords: ["sparoge", "sparoga", "divlje sparoge", "asparagus"],
        kcalPer100g: 22,
        macrosPer100g: { carbs: 4, protein: 2.4, fat: 0.2 },
        standardUnits: { "porcija": 100, "strucak": 20 },
        note: "Niskokalorična proljetna namirnica."
    },
    {
        name: "Patlidžan (pečeni / kuhani, bez ulja)",
        name_en: "Eggplant (cooked, no oil)",
        keywords: ["patlidzan", "balancana", "modri patlidzan", "eggplant", "aubergine"],
        kcalPer100g: 25,
        macrosPer100g: { carbs: 6, protein: 1, fat: 0.2 },
        standardUnits: { "kom": 250, "porcija": 150 },
        note: "1 patlidžan ≈ 250g. Pečen na ulju ima puno više kalorija."
    },
    {
        name: "Poriluk (pirjani / u varivu)",
        name_en: "Leek (braised)",
        keywords: ["poriluk", "varivo od poriluka", "prazi luk", "leek"],
        kcalPer100g: 40,
        macrosPer100g: { carbs: 9, protein: 1.5, fat: 0.3 },
        standardUnits: { "kom": 150, "porcija": 150 },
        note: "1 stručak poriluka ≈ 150g."
    },
    {
        name: "Cikla (kuhana / salata)",
        name_en: "Beetroot (boiled / salad)",
        keywords: ["cikla", "salata od cikle", "kiseljena cikla", "beetroot", "beet"],
        kcalPer100g: 44,
        macrosPer100g: { carbs: 10, protein: 1.7, fat: 0.2 },
        standardUnits: { "porcija": 100, "zdjelica": 120 },
        note: "Zdravo korjenasto povrće."
    },
    {
        name: "Celer (korijen)",
        name_en: "Celeriac (celery root)",
        keywords: ["celer", "korijen celera", "celer korijen", "celeriac"],
        kcalPer100g: 42,
        macrosPer100g: { carbs: 9, protein: 1.5, fat: 0.3 },
        standardUnits: { "kom": 300, "porcija": 100 },
        note: "Aromatično korjenasto povrće."
    },
    {
        name: "Artičoke (kuhane)",
        name_en: "Artichokes (cooked)",
        keywords: ["articoke", "articoka", "artichoke"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 11, protein: 3, fat: 0.3 },
        standardUnits: { "kom": 120, "porcija": 100 },
        note: "Bogato vlaknima."
    },
    {
        name: "Kiseli kupus (dinstani / rasol)",
        name_en: "Sauerkraut",
        keywords: ["kiseli kupus", "kiselo zelje", "rasol", "dinstani kupus", "sauerkraut"],
        kcalPer100g: 22,
        macrosPer100g: { carbs: 3.5, protein: 1, fat: 0.2 },
        standardUnits: { "porcija": 150, "zdjelica": 150, "zlica": 25 },
        note: "Niskokaloričan; dinstan na masti ima više."
    },

    // === VOĆE (DODATNO) ===
    {
        name: "Ananas (svježi)",
        name_en: "Pineapple (fresh)",
        keywords: ["ananas", "kriska ananasa", "svjezi ananas", "pineapple"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 13, protein: 0.5, fat: 0.1 },
        standardUnits: { "kriska": 80, "porcija": 150 },
        note: "1 kolut/kriška ≈ 80g."
    },
    {
        name: "Dinja",
        name_en: "Melon (cantaloupe / honeydew)",
        keywords: ["dinja", "kriska dinje", "medna dinja", "melon", "cantaloupe"],
        kcalPer100g: 34,
        macrosPer100g: { carbs: 8, protein: 0.8, fat: 0.2 },
        standardUnits: { "kriska": 150, "porcija": 200 },
        note: "Puno vode, malo kalorija."
    },
    {
        name: "Grejp (Grejpfrut)",
        name_en: "Grapefruit",
        keywords: ["grejp", "grejpfrut", "grapefruit"],
        kcalPer100g: 42,
        macrosPer100g: { carbs: 11, protein: 0.8, fat: 0.1 },
        standardUnits: { "kom": 250, "polovina": 125, "porcija": 150 },
        note: "1 grejp bez kore ≈ 250g."
    },
    {
        name: "Marelice (svježe)",
        name_en: "Apricots (fresh)",
        keywords: ["marelica", "marelice", "kajsija", "apricot"],
        kcalPer100g: 48,
        macrosPer100g: { carbs: 11, protein: 1.4, fat: 0.4 },
        standardUnits: { "kom": 35, "porcija": 150 },
        note: "1 svježa marelica ≈ 35g."
    },
    {
        name: "Šljive (svježe)",
        name_en: "Plums (fresh)",
        keywords: ["sljiva", "sljive", "svjeze sljive", "plum", "plums"],
        kcalPer100g: 46,
        macrosPer100g: { carbs: 11, protein: 0.7, fat: 0.3 },
        standardUnits: { "kom": 30, "porcija": 150 },
        note: "1 svježa šljiva ≈ 30g."
    },
    {
        name: "Trešnje / Višnje",
        name_en: "Cherries / Sour Cherries",
        keywords: ["tresnje", "tresnja", "visnje", "visnja", "cherries"],
        kcalPer100g: 55,
        macrosPer100g: { carbs: 13, protein: 1, fat: 0.3 },
        standardUnits: { "kom": 8, "saka": 60, "porcija": 150 },
        note: "1 trešnja ≈ 8g."
    },
    {
        name: "Ribiz (crveni / crni)",
        name_en: "Currants (red / black)",
        keywords: ["ribiz", "ribizl", "crveni ribiz", "crni ribiz", "currants"],
        kcalPer100g: 56,
        macrosPer100g: { carbs: 14, protein: 1.4, fat: 0.4 },
        standardUnits: { "porcija": 100, "zdjelica": 100 },
        note: "Kiselo bobičasto voće."
    },

    // === SUHO VOĆE I ORAŠASTI PLODOVI (DODATNO) ===
    {
        name: "Indijski oraščići (Cashews)",
        name_en: "Cashew Nuts",
        keywords: ["indijski orascic", "indijski orascici", "kazu", "cashew", "cashews"],
        kcalPer100g: 553,
        macrosPer100g: { carbs: 30, protein: 18, fat: 44 },
        standardUnits: { "saka": 30, "zlica": 15 },
        note: "1 šaka ≈ 30g."
    },
    {
        name: "Pistacije (pržene, slane)",
        name_en: "Pistachios (roasted, salted)",
        keywords: ["pistacije", "pistacija", "pecene pistacije", "pistachio"],
        kcalPer100g: 560,
        macrosPer100g: { carbs: 28, protein: 20, fat: 45 },
        standardUnits: { "saka": 30, "porcija": 30 },
        note: "Vrijednosti za jezgru bez ljuske. 1 šaka ≈ 30g."
    },
    {
        name: "Suhe smokve",
        name_en: "Dried Figs",
        keywords: ["suhe smokve", "suha smokva", "dalmatinska smokva", "dried figs"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 64, protein: 3.3, fat: 0.9 },
        standardUnits: { "kom": 20, "porcija": 60 },
        note: "1 suha smokva ≈ 20g."
    },
    {
        name: "Datulje (sušene, bez koštice)",
        name_en: "Dried Dates (pitted)",
        keywords: ["datulje", "hurme", "urme", "suhe datulje", "dates"],
        kcalPer100g: 282,
        macrosPer100g: { carbs: 75, protein: 2.5, fat: 0.4 },
        standardUnits: { "kom": 8, "porcija": 40 },
        note: "1 datulja ≈ 8g. Prirodni zaslađivač."
    },

    // === ŽITARICE, KRUH I PRILOZI (DODATNO) ===
    {
        name: "Riža smeđa / integralna (kuhana)",
        name_en: "Brown Rice (cooked)",
        keywords: ["smeda riza", "integralna riza", "kuhana smeda riza", "brown rice"],
        kcalPer100g: 112,
        macrosPer100g: { carbs: 23.5, protein: 2.6, fat: 0.9 },
        standardUnits: { "porcija": 150, "salica": 150, "zlica": 25 },
        note: "Kuhano stanje."
    },
    {
        name: "Riža basmati / jasmin (kuhana)",
        name_en: "Basmati / Jasmine Rice (cooked)",
        keywords: ["basmati riza", "jasmin riza", "basmati kuhana", "jasmine rice"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 28, protein: 2.7, fat: 0.3 },
        standardUnits: { "porcija": 150, "salica": 150 },
        note: "Kuhano stanje."
    },
    {
        name: "Proso (kuhano)",
        name_en: "Millet (cooked)",
        keywords: ["proso", "prosena kasa", "kuhano proso", "millet"],
        kcalPer100g: 120,
        macrosPer100g: { carbs: 23, protein: 3.5, fat: 1 },
        standardUnits: { "porcija": 150, "salica": 150 },
        note: "Bezglutenska žitarica, kuhano stanje."
    },
    {
        name: "Palenta / Žganci (kuhano na vodi)",
        name_en: "Polenta / Cornmeal (cooked)",
        keywords: ["palenta", "zganci", "pura", "kukuruzna krupica kuhana", "polenta"],
        kcalPer100g: 70,
        macrosPer100g: { carbs: 15, protein: 1.6, fat: 0.4 },
        standardUnits: { "porcija": 200, "tanjur": 250 },
        note: "Kuhano na slanoj vodi, bez masti."
    },
    {
        name: "Rižini krekeri / vafli",
        name_en: "Puffed Rice Cakes",
        keywords: ["rizini krekeri", "rizini vafli", "vafli od rize", "stiropor krekeri", "rice cakes"],
        kcalPer100g: 385,
        macrosPer100g: { carbs: 82, protein: 8, fat: 2.8 },
        standardUnits: { "kolut": 9, "kom": 9, "porcija": 27 },
        note: "1 kolut ≈ 9g."
    },
    {
        name: "Kukuruzni krekeri / vafli",
        name_en: "Puffed Corn Cakes",
        keywords: ["kukuruzni krekeri", "vafli od kukuruza", "corn cakes"],
        kcalPer100g: 380,
        macrosPer100g: { carbs: 81, protein: 7.5, fat: 2.5 },
        standardUnits: { "kolut": 9, "kom": 9, "porcija": 27 },
        note: "1 kolut ≈ 9g."
    },
    {
        name: "Perec (pekarski, slani)",
        name_en: "Soft Pretzel",
        keywords: ["perec", "slani perec", "bavarski perec", "pretzel"],
        kcalPer100g: 320,
        macrosPer100g: { carbs: 62, protein: 9, fat: 3 },
        standardUnits: { "kom": 80, "pecivo": 80 },
        note: "1 pekarski perec ≈ 80g."
    },
    {
        name: "Klipić / Slani štapić (pecivo)",
        name_en: "Bread Stick Roll (Klipic)",
        keywords: ["klipic", "varazdinski klipic", "slani stapic", "slanac"],
        kcalPer100g: 300,
        macrosPer100g: { carbs: 54, protein: 8.5, fat: 5 },
        standardUnits: { "kom": 50, "pecivo": 50 },
        note: "1 klipić ≈ 50g."
    },
    {
        name: "Pogačica sa čvarcima",
        name_en: "Pork Crackling Scone",
        keywords: ["pogacica s cvarcima", "cvarkusa", "pogacice cvarci", "crackling scone"],
        kcalPer100g: 400,
        macrosPer100g: { carbs: 38, protein: 9.5, fat: 23 },
        standardUnits: { "kom": 60, "pecivo": 60 },
        note: "Masno lisnato pecivo. 1 kom ≈ 60g."
    },
    {
        name: "Dvopek (prepečenac)",
        name_en: "Rusk / Zwieback",
        keywords: ["dvopek", "prepecenac", "tostirani kruh dvopek", "rusk", "zwieback"],
        kcalPer100g: 390,
        macrosPer100g: { carbs: 75, protein: 11, fat: 5 },
        standardUnits: { "kom": 10, "porcija": 40 },
        note: "1 komad dvopeka ≈ 10g."
    },
    {
        name: "Kruh integralni (cjelovito zrno)",
        name_en: "Whole Grain Bread",
        keywords: ["integralni kruh", "kruh cjelovito zrno", "kruh sa sjemenkama", "whole grain bread"],
        kcalPer100g: 240,
        macrosPer100g: { carbs: 43, protein: 8, fat: 3 },
        standardUnits: { "snita": 45, "komad": 45 },
        note: "1 šnita ≈ 45g."
    },
    {
        name: "Pšenični griz (suhi)",
        name_en: "Semolina (dry)",
        keywords: ["psenicni griz", "griz", "griz suhi", "semolina"],
        kcalPer100g: 360,
        macrosPer100g: { carbs: 73, protein: 12, fat: 1 },
        standardUnits: { "zlica": 15, "porcija": 50 },
        note: "SUHO. 1 žlica ≈ 15g. Griz na mlijeku (kuhan) je ≈ 95 kcal."
    },
    {
        name: "Pšenično brašno (glatko / oštro)",
        name_en: "Wheat Flour",
        keywords: ["psenicno brasno", "brasno", "glatko brasno", "ostro brasno", "wheat flour"],
        kcalPer100g: 364,
        macrosPer100g: { carbs: 76, protein: 10, fat: 1 },
        standardUnits: { "zlica": 20, "salica": 120 },
        note: "SUHO. 1 žlica ≈ 20g."
    },
    {
        name: "Raženo brašno",
        name_en: "Rye Flour",
        keywords: ["razeno brasno", "brasno od razi", "rye flour"],
        kcalPer100g: 335,
        macrosPer100g: { carbs: 70, protein: 10, fat: 1.5 },
        standardUnits: { "zlica": 20, "salica": 120 },
        note: "SUHO."
    },
    {
        name: "Tjestenina jajčana (suha)",
        name_en: "Egg Pasta (dry)",
        keywords: ["tjestenina s jajima", "jajcana tjestenina", "uski rezanci suhi", "egg pasta"],
        kcalPer100g: 370,
        macrosPer100g: { carbs: 72, protein: 13, fat: 2.5 },
        standardUnits: { "porcija": 80, "gnijezdo": 30 },
        note: "SUHO. Kuhana tjestenina je ≈ 155 kcal/100g."
    },

    // === BILJNI PROTEIN ===
    {
        name: "Tofu (natur, čvrsti)",
        name_en: "Tofu (firm, plain)",
        keywords: ["tofu", "sojin sir", "biljni sir", "cvrsti tofu"],
        kcalPer100g: 76,
        macrosPer100g: { carbs: 2, protein: 8, fat: 4.8 },
        standardUnits: { "porcija": 100, "komad": 100, "kocka": 30 },
        note: "Niskokaloričan biljni protein."
    },
    {
        name: "Soja u zrnu (suha)",
        name_en: "Soybeans (dry)",
        keywords: ["soja", "soja u zrnu", "sojino zrno", "dry soybeans"],
        kcalPer100g: 420,
        macrosPer100g: { carbs: 30, protein: 36, fat: 20 },
        standardUnits: { "zlica": 15, "porcija": 50 },
        note: "SUHO. Kuhana soja je ≈ 170 kcal/100g."
    },

    // === AZIJSKA KUHINJA — JELA ===
    {
        name: "Sushi nigiri (svježa tuna)",
        name_en: "Tuna Nigiri Sushi",
        keywords: ["nigiri tuna", "tuna sushi", "sushi tuna", "nigiri"],
        kcalPer100g: 145,
        macrosPer100g: { carbs: 24, protein: 8.5, fat: 1.2 },
        standardUnits: { "kom": 35, "porcija": 140 },
        note: "1 nigiri ≈ 35g."
    },
    {
        name: "Miso juha s tofuom",
        name_en: "Miso Soup with Tofu",
        keywords: ["miso juha", "miso soup", "japanska juha miso", "dashi"],
        kcalPer100g: 40,
        macrosPer100g: { carbs: 4, protein: 3, fat: 1.5 },
        standardUnits: { "zdjelica": 200, "tanjur": 250 },
        note: "Bistra japanska juha; 1 zdjelica ≈ 200g."
    },
    {
        name: "Pad Thai s kozicama",
        name_en: "Pad Thai with Shrimp",
        keywords: ["pad thai", "pad taj", "kozice rezanci", "tajlandski rezanci"],
        kcalPer100g: 175,
        macrosPer100g: { carbs: 24, protein: 7.5, fat: 5.5 },
        standardUnits: { "porcija": 350, "tanjur": 400 },
        note: "Prženi rižini rezanci u woku. Porcija ≈ 350g."
    },
    {
        name: "Zeleni curry s piletinom (Thai)",
        name_en: "Thai Green Chicken Curry",
        keywords: ["zeleni curry", "green curry", "curry piletina", "tajlandski curry", "kari"],
        kcalPer100g: 140,
        macrosPer100g: { carbs: 9, protein: 8, fat: 8 },
        standardUnits: { "porcija": 350, "tanjur": 400 },
        note: "S kokosovim mlijekom, bez riže. Rižu upiši odvojeno."
    },
    {
        name: "Crveni curry s piletinom (Thai)",
        name_en: "Thai Red Chicken Curry",
        keywords: ["crveni curry", "red curry", "pileci crveni kari", "tajlandski crveni curry"],
        kcalPer100g: 145,
        macrosPer100g: { carbs: 9, protein: 8, fat: 8 },
        standardUnits: { "porcija": 350, "tanjur": 400 },
        note: "S kokosovim mlijekom, bez riže."
    },
    {
        name: "Gyoza s piletinom (pržene-parene)",
        name_en: "Chicken Gyoza Dumplings",
        keywords: ["gyoza piletina", "pilece gyoze", "japanski valjusci piletina", "dumplings"],
        kcalPer100g: 190,
        macrosPer100g: { carbs: 22, protein: 8.5, fat: 7 },
        standardUnits: { "kom": 25, "porcija": 150 },
        note: "1 gyoza ≈ 25g."
    },
    {
        name: "Slatko-kisela piletina (pohana)",
        name_en: "Sweet and Sour Chicken",
        keywords: ["slatko kisela piletina", "sweet sour chicken", "kineska piletina slatko kisela"],
        kcalPer100g: 180,
        macrosPer100g: { carbs: 21, protein: 10, fat: 6 },
        standardUnits: { "porcija": 300, "tanjur": 350 },
        note: "Pohani komadići u slatko-kiselom umaku."
    },
    {
        name: "Kung Pao / Gong Bao piletina",
        name_en: "Kung Pao Chicken",
        keywords: ["kung pao", "gong bao", "secuanska piletina", "piletina kikiriki wok"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 8.5, protein: 13, fat: 8 },
        standardUnits: { "porcija": 300, "tanjur": 350 },
        note: "Ljuta sečuanska piletina s kikirikijem."
    },
    {
        name: "Wok junetina s brokulom",
        name_en: "Beef and Broccoli Stir Fry",
        keywords: ["wok junetina", "junetina brokula", "beef stir fry", "kineska junetina brokula"],
        kcalPer100g: 135,
        macrosPer100g: { carbs: 5.5, protein: 13.5, fat: 6.5 },
        standardUnits: { "porcija": 300, "tanjur": 350 },
        note: "Junetina i brokula u soja/oyster umaku."
    },
    {
        name: "Pržena riža s jajima i povrćem",
        name_en: "Egg Fried Rice",
        keywords: ["przena riza", "riza s jajima", "fried rice", "kineska przena riza"],
        kcalPer100g: 170,
        macrosPer100g: { carbs: 26, protein: 4.8, fat: 5 },
        standardUnits: { "porcija": 250, "zdjelica": 200 },
        note: "Riža poprena s jajima, graškom i uljem."
    },
    {
        name: "Bao pecivo (kuhano na pari)",
        name_en: "Steamed Bao Bun",
        keywords: ["bao buns", "bao pecivo", "pareno pecivo", "bao"],
        kcalPer100g: 245,
        macrosPer100g: { carbs: 48, protein: 7, fat: 2.5 },
        standardUnits: { "kom": 50, "porcija": 100 },
        note: "1 prazno bao pecivo ≈ 50g."
    },
    {
        name: "Kimchi (fermentirani kupus)",
        name_en: "Kimchi",
        keywords: ["kimchi", "kimci", "fermentirani kupus", "korejski kupus"],
        kcalPer100g: 25,
        macrosPer100g: { carbs: 4, protein: 1.5, fat: 0.4 },
        standardUnits: { "porcija": 50, "zdjelica": 100 },
        note: "Pikantni korejski prilog."
    },
    {
        name: "Wakame salata od algi",
        name_en: "Wakame Seaweed Salad",
        keywords: ["wakame", "alge salata", "wakame salata", "morska trava salata"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 12, protein: 1.5, fat: 4 },
        standardUnits: { "porcija": 100, "zdjelica": 100 },
        note: "Marinirana s uljem sezama i rižinim octom."
    },
    {
        name: "Udon rezanci (kuhani)",
        name_en: "Udon Noodles (cooked)",
        keywords: ["udon", "udon rezanci", "debeli japanski rezanci"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 26, protein: 3.5, fat: 0.5 },
        standardUnits: { "porcija": 200, "zdjelica": 250 },
        note: "Kuhano stanje."
    },
    {
        name: "Rižini rezanci (kuhani)",
        name_en: "Rice Noodles (cooked)",
        keywords: ["rizini rezanci", "stakleni rezanci", "rice noodles", "rice vermicelli"],
        kcalPer100g: 108,
        macrosPer100g: { carbs: 24, protein: 1.8, fat: 0.2 },
        standardUnits: { "porcija": 150, "tanjur": 200 },
        note: "Kuhano stanje."
    },
    {
        name: "Klice graha (mungo, svježe)",
        name_en: "Mung Bean Sprouts (raw)",
        keywords: ["klice graha", "mung klice", "azijske klice", "bean sprouts"],
        kcalPer100g: 30,
        macrosPer100g: { carbs: 6, protein: 3, fat: 0.2 },
        standardUnits: { "porcija": 100, "saka": 50 },
        note: "Svježe klice za wok i salate."
    },
    {
        name: "Bambusovi izdanci (konzerva)",
        name_en: "Bamboo Shoots (canned)",
        keywords: ["bambus izdanci", "bambus konzerva", "bamboo shoots"],
        kcalPer100g: 20,
        macrosPer100g: { carbs: 3, protein: 1.7, fat: 0.3 },
        standardUnits: { "porcija": 100, "zlica": 30 },
        note: "Narezani izdanci u slanoj vodi."
    },
    {
        name: "Đumbir ukiseljeni za sushi (Gari)",
        name_en: "Pickled Sushi Ginger (Gari)",
        keywords: ["gari", "dumbir za sushi", "ukiseljeni dumbir", "pickled ginger"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 12, protein: 0.2, fat: 0.1 },
        standardUnits: { "porcija": 15, "zlicica": 10 },
        note: "Uz sushi, mala količina."
    },

    // === MEKSIČKO / BLISKOISTOČNO ===
    {
        name: "Chili con carne",
        name_en: "Chili Con Carne",
        keywords: ["chili con carne", "cili s mesom", "junetina s grahom pikantno", "cili con karne"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 8, protein: 9, fat: 6 },
        standardUnits: { "porcija": 300, "tanjur": 350 },
        note: "Varivo od mljevene junetine, graha i rajčice."
    },
    {
        name: "Tacos s mljevenim mesom",
        name_en: "Beef Tacos",
        keywords: ["tacos", "takos", "meksicki tacos", "taco"],
        kcalPer100g: 215,
        macrosPer100g: { carbs: 18, protein: 10.5, fat: 11 },
        standardUnits: { "kom": 100, "porcija": 200 },
        note: "1 taco (školjka + punjenje) ≈ 100g."
    },
    {
        name: "Quesadilla sa sirom i piletinom",
        name_en: "Chicken and Cheese Quesadilla",
        keywords: ["quesadilla", "kesadilja", "tortilja sir piletina"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 20, protein: 14.5, fat: 12 },
        standardUnits: { "trokut": 80, "cijela": 220 },
        note: "Zapečena tortilja s piletinom i sirom."
    },
    {
        name: "Falafel (pržene kuglice od slanutka)",
        name_en: "Falafel Balls",
        keywords: ["falafel", "kuglice od slanutka", "kroketi od slanutka"],
        kcalPer100g: 330,
        macrosPer100g: { carbs: 32, protein: 13, fat: 18 },
        standardUnits: { "kuglica": 25, "porcija": 150 },
        note: "1 kuglica ≈ 25g."
    },
    {
        name: "Tortilja pšenična (prazna)",
        name_en: "Wheat Tortilla Wrap (plain)",
        keywords: ["tortilja", "psenicna tortilja", "wrap tijesto", "tortilja prazna"],
        kcalPer100g: 300,
        macrosPer100g: { carbs: 50, protein: 8, fat: 7 },
        standardUnits: { "kom": 60, "velika": 70 },
        note: "1 tortilja ≈ 60g."
    },

    // === AZIJSKI UMACI I ULJA ===
    {
        name: "Soja umak (Soy sauce)",
        name_en: "Soy Sauce",
        keywords: ["soja umak", "soja sos", "soy sauce", "tamari", "kikkoman"],
        kcalPer100g: 60,
        macrosPer100g: { carbs: 6, protein: 6, fat: 0.1 },
        standardUnits: { "zlica": 15, "zlicica": 5 },
        note: "Slan; 1 žlica ≈ 15g."
    },
    {
        name: "Oyster umak (umak od kamenica)",
        name_en: "Oyster Sauce",
        keywords: ["oyster umak", "umak od kamenica", "oyster sos"],
        kcalPer100g: 115,
        macrosPer100g: { carbs: 22, protein: 3, fat: 0.2 },
        standardUnits: { "zlica": 18, "zlicica": 6 },
        note: "Gusti slatko-slani umak."
    },
    {
        name: "Slatki čili umak (Sweet chili)",
        name_en: "Sweet Chili Sauce",
        keywords: ["slatki cili umak", "sweet chili", "slatko ljuti umak", "chili dip"],
        kcalPer100g: 190,
        macrosPer100g: { carbs: 46, protein: 0.5, fat: 0.2 },
        standardUnits: { "zlica": 20, "dip": 40 },
        note: "Uglavnom šećer."
    },
    {
        name: "Sezamovo ulje (prženo)",
        name_en: "Toasted Sesame Oil",
        keywords: ["sezamovo ulje", "ulje sezama", "tamno sezamovo ulje", "sesame oil"],
        kcalPer100g: 884,
        macrosPer100g: { carbs: 0, protein: 0, fat: 100 },
        standardUnits: { "zlica": 14, "zlicica": 5 },
        note: "Aromatično; koristi se u malim količinama."
    },
    {
        name: "Rižin ocat (Rice vinegar)",
        name_en: "Rice Vinegar",
        keywords: ["rizin ocat", "ocat od rize", "sushi ocat", "rice vinegar"],
        kcalPer100g: 18,
        macrosPer100g: { carbs: 0.5, protein: 0.1, fat: 0 },
        standardUnits: { "zlica": 15, "zlicica": 5 },
        note: "Blagi ocat za sushi rižu."
    },
    {
        name: "Tahini pasta (od sezama)",
        name_en: "Tahini Paste",
        keywords: ["tahini", "sezam pasta", "tahin namaz", "mljeveni sezam", "tahina"],
        kcalPer100g: 595,
        macrosPer100g: { carbs: 21, protein: 17, fat: 54 },
        standardUnits: { "zlica": 20, "porcija": 30 },
        note: "Gusta masna pasta; osnova za humus."
    },
    {
        name: "Wasabi pasta",
        name_en: "Wasabi Paste",
        keywords: ["wasabi", "vazabi", "japanski hren", "wasabi pasta"],
        kcalPer100g: 240,
        macrosPer100g: { carbs: 40, protein: 3.5, fat: 6 },
        standardUnits: { "zlicica": 5, "porcija": 10 },
        note: "Vrlo mala količina uz sushi."
    }

];

// Integriraj proširenu listu v3 u localFoodDB (bez dupliranja po imenu)
extendedFoodDB_3.forEach(item => {
    if (!localFoodDB.some(f => f.name === item.name)) {
        localFoodDB.push(item);
    }
});
