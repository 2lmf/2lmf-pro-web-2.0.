const extendedFoodDB_2 = [
    // === VOĆE I POVRĆE (DODATNO) ===
    {
        name: "Kruška",
        keywords: ["kruska", "kruske"],
        kcalPer100g: 57,
        macrosPer100g: { carbs: 15, protein: 0.4, fat: 0.1 },
        standardUnits: { "kom": 150, "komad": 150 },
        note: "1 komad srednje veličine = 150g."
    },
    {
        name: "Lubenica",
        keywords: ["lubenica", "lubenice", "kriska lubenice"],
        kcalPer100g: 30,
        macrosPer100g: { carbs: 8, protein: 0.6, fat: 0.2 },
        standardUnits: { "kriska": 300, "komad": 300, "kom": 300 },
        note: "Vrlo velika količina vode. Velika kriška teži lako 300g (jestivog dijela)."
    },
    {
        name: "Grožđe (bijelo/crno)",
        keywords: ["grozde", "crno grozde", "bijelo grozde", "bobice grozda"],
        kcalPer100g: 69,
        macrosPer100g: { carbs: 18, protein: 0.7, fat: 0.2 },
        standardUnits: { "grozd": 200, "porcija": 150 },
        note: "Sitan grozd teži oko 200g."
    },
    {
        name: "Kivi",
        keywords: ["kivi", "kiwi", "kivija"],
        kcalPer100g: 61,
        macrosPer100g: { carbs: 15, protein: 1.1, fat: 0.5 },
        standardUnits: { "kom": 70, "komad": 70 },
        note: "1 standardni kivi = cca 70g."
    },
    {
        name: "Maline / Kupine",
        keywords: ["maline", "kupine", "sumsko voce", "salica malina"],
        kcalPer100g: 43,
        macrosPer100g: { carbs: 10, protein: 1.2, fat: 0.5 },
        standardUnits: { "salica": 100, "porcija": 100 },
        note: "Mjereno na manju šalicu (100g)."
    },
    {
        name: "Limun",
        keywords: ["limun", "limunov sok", "iscjeden limun", "limunada bez secera"],
        kcalPer100g: 29,
        macrosPer100g: { carbs: 9, protein: 1.1, fat: 0.3 },
        standardUnits: { "kom": 60, "komad": 60 },
        note: "Polovica iscijeđenog limuna za vodu/čaj iznosi max 30-40g tekućine. Cijeli limun = 60g."
    },
    {
        name: "Avokado",
        keywords: ["avokado", "guacamole"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 8.5, protein: 2, fat: 14.7 },
        standardUnits: { "kom": 150, "komad": 150, "pola": 75 },
        note: "Iznimno bogato zdravim mastima. Pola avokada teži oko 75g (120 Kcal)."
    },
    {
        name: "Brokula (Kuhana)",
        keywords: ["brokula", "brokule", "kuhana brokula"],
        kcalPer100g: 35,
        macrosPer100g: { carbs: 7, protein: 2.4, fat: 0.4 },
        standardUnits: { "porcija": 150, "zdjelica": 150 },
        note: "Jako nutritivna. Porcija (tanjur cvjetova) = 150g."
    },
    {
        name: "Cvjetača / Karfiol (Kuhana)",
        keywords: ["karfiol", "cvjetaca", "kuhani karfiol"],
        kcalPer100g: 23,
        macrosPer100g: { carbs: 4.1, protein: 1.8, fat: 0.5 },
        standardUnits: { "porcija": 150, "zdjelica": 150 },
        note: "Standardni prilog, cca 150g po porciji."
    },
    {
        name: "Gljive (Šampinjoni, Pirjani)",
        keywords: ["gljive", "sampinjoni", "pirjani sampinjoni"],
        kcalPer100g: 22,
        macrosPer100g: { carbs: 3.3, protein: 3.1, fat: 0.3 },
        standardUnits: { "porcija": 150, "zdjelica": 150 },
        note: "Nutritivno slabe dok ne upiju ulje na tavi."
    },
    {
        name: "Kukuruz šećerac (iz konzerve)",
        keywords: ["kukuruz", "secerac", "kukuruz iz konzerve", "salata s kukuruzom"],
        kcalPer100g: 86,
        macrosPer100g: { carbs: 19, protein: 3.2, fat: 1.2 },
        standardUnits: { "zlica": 20, "porcija": 100, "mala konzerva": 140 },
        note: "Često se dodaje salatama. Velika žlica (s brdom) ≈ 20g."
    },

    // === GOTOVA JELA, UMAZI I FAST FAST ===
    {
        name: "Bolognese umak (Bolonjez umak od mesa)",
        keywords: ["bolonjez", "bolognese", "mesni umak", "umak bolognes"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 6, protein: 8, fat: 8 },
        standardUnits: { "porcija": 150, "umaka": 150, "zlica": 30 },
        note: "Porcija samog umaka prelivenog preko porcije tjestenine. Upiši 'Tjestenina' odvojeno!"
    },
    {
        name: "Umak od rajčice (Šalša)",
        keywords: ["salsa", "umak od rajcice", "paradajz sos"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 7, protein: 1.5, fat: 2 },
        standardUnits: { "porcija": 150, "umaka": 150, "zlica": 30 },
        note: "Dosta manje kalorija od mesnih umaka, ovisno o količini maslinovog ulja pri kuhanju."
    },
    {
        name: "Carbonara umak (s jajima i slaninom)",
        keywords: ["carbonara", "karbonara", "tjestenina carbonara"],
        kcalPer100g: 220,
        macrosPer100g: { carbs: 4, protein: 10, fat: 18 },
        standardUnits: { "porcija": 150, "umaka": 150, "zlica": 30 },
        note: "Bomba! Računa se samo umak. Tjestenina je dodatnih 150 Kcal/100g."
    },
    {
        name: "Rižoto s plodovima mora / Crni rižoto",
        keywords: ["rizoto", "rizoto s morskim plodovima", "crni rizoto", "rizot"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 22, protein: 7, fat: 5 },
        standardUnits: { "porcija": 300, "tanjur": 300 },
        note: "Gotov obrok (riža i plodovi). 1 restoran porcija ≈ 300g."
    },
    {
        name: "Kebab (u lepinji)",
        keywords: ["kebab", "doner kebab", "sendvic kebab", "kebab u lepinji"],
        kcalPer100g: 230,
        macrosPer100g: { carbs: 25, protein: 12, fat: 10 },
        standardUnits: { "kom": 400, "komad": 400, "mali": 300, "veliki": 500, "kebab": 400 },
        note: "Prosječan kebab (meso, lepinja, puno umaka) premašuje 400 grama (skoro 1000 Kcal)!"
    },
    {
        name: "Hot Dog pecivo / Hamburger Pecivo",
        keywords: ["pecivo za burger", "burger pecivo", "hot dog pecivo", "lepinja za cevape", "somun", "lepinja"],
        kcalPer100g: 280,
        macrosPer100g: { carbs: 50, protein: 8, fat: 4 },
        standardUnits: { "komad": 80, "lepinja": 150 },
        note: "Lepinja iz pečenjare za ćevape zna imati do 150g (preko 400 Kcal sama od sebe)."
    },

    // === MESNE SPECIFIČNOSTI ===
    {
        name: "Kranjska kobasica / Domaća češnjovka",
        keywords: ["kranjska", "cesnjovka", "domaca kobasica", "kobasa", "pecena kobasica"],
        kcalPer100g: 310,
        macrosPer100g: { carbs: 2, protein: 14, fat: 28 },
        standardUnits: { "komad": 120, "par": 240, "kobasa": 120 },
        note: "1 klasična debela kranjska za kuhanje/pečenje je oko 120g masti i proteina."
    },
    {
        name: "Slanina / Špek (Pečeno na hrskavo)",
        keywords: ["hrskava slanina", "peceni spek", "bacon"],
        kcalPer100g: 540,
        macrosPer100g: { carbs: 1, protein: 35, fat: 42 },
        standardUnits: { "snita": 10, "feta": 10 },
        note: "Pečenjem izgubi vodu, kalorije se koncentriraju. 1 šnitica (tanka i pečena) = 10g."
    },
    {
        name: "Goveđi odrezak / Biftek (Juneći)",
        keywords: ["biftek", "junetina", "ramstek", "govedi odrezak", "steak"],
        kcalPer100g: 170,
        macrosPer100g: { carbs: 0, protein: 26, fat: 7 },
        standardUnits: { "odrezak": 250, "porcija": 250 },
        note: "Kralj crvenog mesa! Jedan ozbiljniji steak je 250g krtog proteina."
    },

    // === DESERTI I DODACI ===
    {
        name: "Sladoled (Mliječni / Kornet)",
        keywords: ["sladoled", "kuglica sladoleda", "kornet", "king", "snjeguljica", "slambac"],
        kcalPer100g: 220,
        macrosPer100g: { carbs: 28, protein: 4, fat: 10 },
        standardUnits: { "kuglica": 60, "kornet": 100, "komad": 80 },
        note: "1 kuglica u slastičarni je oko 60g. Sladoledi na štapiću su oko 80g."
    },
    {
        name: "Vocni sladoled na štapiću (Twinni, Rumenko)",
        keywords: ["rumenko", "vocni sladoled", "twinni", "vodeni sladoled"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 26, protein: 0, fat: 0 },
        standardUnits: { "kom": 70, "komad": 70 },
        note: "Isključivo šećerna vodica = cca 70g (manje od 80 kcal)."
    },
    {
        name: "Muesli / Čokoladne pahuljice (Čokolino)",
        keywords: ["cokolino", "cokolesnik", "muesli", "cokoladne pahuljice", "kelloggs", "pahuljice", "cornflakes"],
        kcalPer100g: 400,
        macrosPer100g: { carbs: 75, protein: 7, fat: 6 },
        standardUnits: { "zdjelica": 60, "porcija": 60, "zlica": 10 },
        note: "60g pahuljica mjereno NA SUHO."
    },
    {
        name: "Med pčelinji",
        keywords: ["med", "pcelinji med", "zlica meda", "meda"],
        kcalPer100g: 304,
        macrosPer100g: { carbs: 82, protein: 0.3, fat: 0 },
        standardUnits: { "zlica": 21, "zlicica": 7 },
        note: "Gušći od šećera - 1 puna jušna žlica ima 21g i oko 65 kcal."
    },
    {
        name: "Sirup za sok / Cedevita (Čisti šećer u prahu/tekućini)",
        keywords: ["sirup", "sok na razredivanje"],
        kcalPer100g: 300,
        macrosPer100g: { carbs: 75, protein: 0, fat: 0 },
        standardUnits: { "dl": 100, "ml": 1, "mjerica": 30 },
        note: "Pripazi ako radiš jako slatke sokove na razrjeđivanje!"
    },
    {
        name: "Suncokretove / Bučine sjemenke",
        keywords: ["bucino sjeme", "gostice", "suncokretove sjemenke", "spijice", "kostarika"],
        kcalPer100g: 580,
        macrosPer100g: { carbs: 20, protein: 21, fat: 51 },
        standardUnits: { "saka": 30, "paketic": 100 },
        note: "Ogromna kalorijska gustoća iz lipida."
    },

    // === ALKOHOLNA PIĆA (ŽESTOKA) ===
    {
        name: "Rakija / Vodka (Žestoko piće)",
        keywords: ["rakija", "votka", "vodka", "domaca rakija", "sljivovica", "loza", "pelinkovac", "viski", "whiskey"],
        kcalPer100g: 230,
        macrosPer100g: { carbs: 0, protein: 0, fat: 0 },
        standardUnits: { "bićerin": 30, "cokanic": 30, "velika": 50, "čašica": 30 },
        note: "U čašici čistog alkohola nema makrosa, ali sam etanol donosi 7 Kcal po gramu!"
    }
];

extendedFoodDB_2.forEach(item => {
    if (!localFoodDB.some(f => f.name === item.name)) {
        localFoodDB.push(item);
    }
});
