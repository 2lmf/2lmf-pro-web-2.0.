const localFoodDB = [
    // === MLIJEKO I MLIJEČNI PROIZVODI ===
    {
        name: "Mlijeko kravlje, 3.2% mm",
        name_en: "Cow Milk, 3.2% fat",
        keywords: ["mlijeko 3.2", "mlijeko 3,2", "punomasno mlijeko", "mlijeka 3.2", "mlijeka 3,2", "domace mlijeko", "milk", "whole milk"],
        kcalPer100g: 61,
        macrosPer100g: { carbs: 4.7, protein: 3.3, fat: 3.2 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "salica": 200, "cup": 200, "glass": 250 },
        note: "1 dl ≈ 100g. Standardno punomasno mlijeko."
    },
    {
        name: "Mlijeko kravlje, 2.8% mm",
        name_en: "Cow Milk, 2.8% fat",
        keywords: ["mlijeko 2.8", "mlijeko 2,8", "trajno mlijeko", "mlijeka 2.8", "mlijeka 2,8", "milk"],
        kcalPer100g: 58,
        macrosPer100g: { carbs: 4.7, protein: 3.3, fat: 2.8 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "salica": 200, "cup": 200, "glass": 250 },
        note: "1 dl ≈ 100g. Standardno trajno mlijeko."
    },
    {
        name: "Mlijeko kravlje, 1.5% mm",
        name_en: "Cow Milk, 1.5% fat",
        keywords: ["mlijeko 1.5", "mlijeko 1,5", "niskomasno mlijeko", "mlijeka 1.5", "milk", "low fat milk", "semi-skimmed"],
        kcalPer100g: 45,
        macrosPer100g: { carbs: 4.8, protein: 3.4, fat: 1.5 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "salica": 200, "cup": 200, "glass": 250 },
        note: "1 dl ≈ 100g. Niskomasno mlijeko (light)."
    },
    {
        name: "Zobeno mlijeko (bez secera)",
        name_en: "Oat Milk (unsweetened)",
        keywords: ["zobeno", "zobeno mlijeko", "zobenog mlijeka", "oat milk", "non-dairy"],
        kcalPer100g: 42,
        macrosPer100g: { carbs: 6.8, protein: 1, fat: 1.5 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "cup": 200 },
        note: "1 dl ≈ 100g. Nezaslađeni napitak."
    },
    {
        name: "Bademovo mlijeko (bez secera)",
        name_en: "Almond Milk (unsweetened)",
        keywords: ["bademovo", "bademovo mlijeko", "bademovog mlijeka", "almond milk", "non-dairy"],
        kcalPer100g: 13,
        macrosPer100g: { carbs: 0.1, protein: 0.5, fat: 1.1 },
        standardUnits: { "ml": 1, "dl": 100, "dcl": 100, "l": 1000, "litra": 1000, "casa": 250, "cup": 200 },
        note: "1 dl ≈ 100g. Najmanje kalorična alternativa."
    },
    {
        name: "Jogurt tekući, 3.2% mm",
        name_en: "Yogurt, 3.2% fat",
        keywords: ["jogurt", "tekucu jogurt", "tekuci jogurt", "casa jogurta", "yogurt"],
        kcalPer100g: 60,
        macrosPer100g: { carbs: 4.5, protein: 3.3, fat: 3.2 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 200, "cup": 200 },
        note: "Standarna čašica jogurta je cca 180-200g."
    },
    {
        name: "Kefir, 3.5% mm",
        name_en: "Kefir, 3.5% fat",
        keywords: ["kefir", "kefira", "casa kefira"],
        kcalPer100g: 65,
        macrosPer100g: { carbs: 4, protein: 3.3, fat: 3.5 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 200, "cup": 200 },
        note: "Standardna procjena."
    },
    {
        name: "Svježi zrnati sir (Zagrebački sir/Posni)",
        name_en: "Cottage Cheese / Low Fat",
        keywords: ["posni sir", "svjezi sir", "zrnati sir", "bijeli sir", "zagrebacki sir", "domaci sir", "cottage cheese"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 3.8, protein: 12.5, fat: 2.5 },
        standardUnits: { "zlica": 20, "zlicica": 10, "porcija": 150, "tbsp": 20, "tsp": 5 },
        note: "1 velika žlica ≈ 20g."
    },
    {
        name: "Sir Gouda / Edamer",
        name_en: "Gouda / Edam Cheese",
        keywords: ["sir gauda", "sir edamer", "zuti sir", "gauda", "edamer", "sir za pizzu", "gouda", "snita sira", "snita gaude", "cheese", "edam"],
        kcalPer100g: 350,
        macrosPer100g: { carbs: 0, protein: 25, fat: 28 },
        standardUnits: { "snita": 20, "snite": 20, "listic": 15, "listica": 15, "slice": 20 },
        note: "1 tanka šnita / listić ≈ 15-20g."
    },
    {
        name: "Sir Mozzarella",
        name_en: "Mozzarella Cheese",
        keywords: ["mozzarella", "mocarela", "kugla mozzarelle", "mozzarelle", "cheese"],
        kcalPer100g: 280,
        macrosPer100g: { carbs: 2, protein: 28, fat: 17 },
        standardUnits: { "kom": 125, "komad": 125, "kugla": 125, "ball": 125 },
        note: "Standardna kugla (ocijeđena) je cca 125g."
    },
    {
        name: "Maslac",
        name_en: "Butter",
        keywords: ["maslac", "putar", "maslaca", "zlica maslaca", "malo putra", "butter"],
        kcalPer100g: 717,
        macrosPer100g: { carbs: 0.1, protein: 0.9, fat: 81 },
        standardUnits: { "zlicica": 5, "malazlica": 5, "zlica": 15, "porcija": 10, "tbsp": 15, "tsp": 5 },
        note: "Hotelski paketić je 10g. 1 mala žličica je cca 5g."
    },

    // === JAJA ===
    {
        name: "Jaje (kuhano)",
        name_en: "Egg (boiled)",
        keywords: ["kuhano jaje", "jaje na tvrdo", "kuhana jaja", "egg", "boiled egg"],
        kcalPer100g: 155,
        macrosPer100g: { carbs: 1.1, protein: 12.6, fat: 10.6 },
        standardUnits: { "kom": 60, "komad": 60, "komada": 60, "piece": 60 },
        note: "1 kokošje jaje M-L = cca 60g."
    },
    {
        name: "Jaje na oko (pečeno na masnoći)",
        name_en: "Fried Egg (sunny side up)",
        keywords: ["jaje na oko", "jaja na oko", "peceno jaje", "pecena jaja", "fried egg"],
        kcalPer100g: 196,
        macrosPer100g: { carbs: 1, protein: 14, fat: 15 },
        standardUnits: { "kom": 60, "komad": 60, "komada": 60, "piece": 60 },
        note: "1 komad ≈ 60g (uračunata mala količina masnoće za pečenje)."
    },
    {
        name: "Kajgana (pečena na masnoći)",
        name_en: "Scrambled Eggs",
        keywords: ["kajgana", "kajganu", "mucena jaja", "omlet od.", "scrambled eggs", "omelette"],
        kcalPer100g: 210,
        macrosPer100g: { carbs: 1.5, protein: 13, fat: 17 },
        standardUnits: { "jaje": 60, "porcija": 180, "kom": 60, "egg": 60 },
        note: "Standardna porcija od 3 jaja je cca 180g (s masnoćom)."
    },

    // === KRUH I PEKARSTVO ===
    {
        name: "Kruh, bijeli pšenični",
        name_en: "Bread, White Wheat",
        keywords: ["bijeli kruh", "snita kruha", "snita bjelog kruha", "bjeli kruh", "komad kruha", "kruv", "snita kruva", "white bread", "bread slice"],
        kcalPer100g: 265,
        macrosPer100g: { carbs: 49, protein: 9, fat: 3.2 },
        standardUnits: { "snita": 40, "komad": 40, "snite": 40, "feta": 40, "slice": 40 },
        note: "1 prosječna šnita kruha ≈ 40 grama."
    },
    {
        name: "Kruh, crni / raženi miješani",
        name_en: "Bread, Dark / Rye Mixed",
        keywords: ["crni kruh", "razeni kruh", "snita crnog kruha", "integralni kruh", "tamni kruh", "snita tamnog kruha", "dark bread", "rye bread", "whole grain"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 46, protein: 8, fat: 3.5 },
        standardUnits: { "snita": 45, "komad": 45, "snite": 45, "feta": 45, "slice": 45 },
        note: "1 šnita tamanog kruha je gušća ≈ 45 grama."
    },
    {
        name: "Kruh, kukuruzni miješani",
        name_en: "Bread, Corn Mixed",
        keywords: ["kukuruzni kruh", "snita kukuruznog kruha", "kukuruznog kruha", "corn bread", "maize"],
        kcalPer100g: 270,
        macrosPer100g: { carbs: 52, protein: 7, fat: 2.5 },
        standardUnits: { "snita": 50, "komad": 50, "snite": 50, "feta": 50, "slice": 50 },
        note: "1 šnita kukuruznog kruha je prilično teška ≈ 50 grama."
    },
    {
        name: "Pecivo, bijelo (Kajzerica / Žemlja)",
        name_en: "Bread Roll, White (Kajzerica / Žemlja)",
        keywords: ["pecivo", "kajzerica", "zemlja", "bijelo pecivo", "zemicka", "roll", "bun"],
        kcalPer100g: 275,
        macrosPer100g: { carbs: 55, protein: 8, fat: 3 },
        standardUnits: { "kom": 60, "komad": 60, "komada": 60, "roll": 60, "piece": 60 },
        note: "1 standardna kajzerica/žemlja ≈ 60 do 70 grama."
    },
    {
        name: "Kifla (Slana)",
        name_en: "Salted Crescent Roll (Kifla)",
        keywords: ["kifla", "slana kifla", "slani klipic", "klipic", "krescent roll", "bread stick"],
        kcalPer100g: 290,
        macrosPer100g: { carbs: 53, protein: 9, fat: 5 },
        standardUnits: { "kom": 80, "komad": 80, "komada": 80, "piece": 80 },
        note: "1 kupovna kifla ili manji klipić = cca 80g."
    },
    {
        name: "Toast (Tost kruh)",
        name_en: "Toast Bread",
        keywords: ["tost", "toast", "snita tosta", "snita toast", "tost kruh"],
        kcalPer100g: 280,
        macrosPer100g: { carbs: 48, protein: 9, fat: 4 },
        standardUnits: { "snita": 25, "komad": 25, "snite": 25, "feta": 25, "slice": 25 },
        note: "1 šnita tosta lagana je oko 25g."
    },
    {
        name: "Burek s mesom (Pekara)",
        name_en: "Burek with Meat (Bakery)",
        keywords: ["burek s mesom", "burek s meson", "komad bureka s mesom", "struca bureka od mesa", "meat pie", "burek"],
        kcalPer100g: 310,
        macrosPer100g: { carbs: 32, protein: 12, fat: 15 },
        standardUnits: { "kom": 250, "komad": 250, "cetvrtina": 250, "polovina": 500, "cijeli": 1000, "quarter": 250, "piece": 250 },
        note: "1 mlinarev/upanov komad (četvrtina tepsije ili štruca) ≈ 250g."
    },
    {
        name: "Burek sa sirom / Sirnica (Pekara)",
        name_en: "Burek with Cheese (Bakery)",
        keywords: ["burek sa sirom", "sirnica", "burek od sira", "burek sir", "cheese pie", "burek"],
        kcalPer100g: 320,
        macrosPer100g: { carbs: 34, protein: 10, fat: 16 },
        standardUnits: { "kom": 250, "komad": 250, "cetvrtina": 250, "polovina": 500, "cijeli": 1000, "quarter": 250, "piece": 250 },
        note: "1 standardni komad (četvrtina) ≈ 250g. Masnije od mesa."
    },
    {
        name: "Croissant (Kroasan) s čokoladom",
        name_en: "Chocolate Croissant",
        keywords: ["kroasan", "croissant", "kroasan s cokoladom", "7days kroasan", "cokoladni kroasan", "chocolate croissant"],
        kcalPer100g: 400,
        macrosPer100g: { carbs: 46, protein: 7, fat: 22 },
        standardUnits: { "kom": 80, "komad": 80, "komada": 80, "piece": 80 },
        note: "1 pekarski kroasan (čokolada/lješnjak) je cca 80g. Manji, poput 7days, su 60g."
    },
    {
        name: "Krafna s marmeladom",
        name_en: "Donut with Jam",
        keywords: ["krafna", "pokladnica", "krafna marmelada", "krofna", "donut", "doughnut"],
        kcalPer100g: 330,
        macrosPer100g: { carbs: 44, protein: 5, fat: 15 },
        standardUnits: { "kom": 80, "komad": 80, "komada": 80, "piece": 80 },
        note: "1 standardna pekarska krafna ≈ 80g."
    },

    // === PIĆA I NAPITCI ===
    {
        name: "Espresso (Kava bez šećera i mlijeka)",
        name_en: "Espresso (Black coffee, no sugar)",
        keywords: ["espresso", "kratka kava", "crna kava", "kava bez", "turska kava prazna", "produzeni espresso", "black coffee", "turkish coffee"],
        kcalPer100g: 2,
        macrosPer100g: { carbs: 0, protein: 0, fat: 0 },
        standardUnits: { "salica": 30, "kava": 30, "cup": 30, "coffee": 30 },
        note: "Čista kava nema kalorija. Tekućina ≈ 30ml."
    },
    {
        name: "Macchiato (Kava s malo mlijeka, bez šećera)",
        name_en: "Macchiato (Coffee with milk, no sugar)",
        keywords: ["makijato", "macchiato", "kava s mlijekom", "espresso s mlijekom", "kava mlijeko bez secera", "kratka kava s mlijekom", "coffee with milk"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 1, protein: 1, fat: 1 },
        standardUnits: { "salica": 60, "kava": 60, "cup": 60, "coffee": 60 },
        note: "Mala količina mlijeka (cca 30ml) dodaje ~20 kcal po šalici."
    },
    {
        name: "Bijela kava / Veliki Macchiato (Bez šećera)",
        name_en: "White Coffee / Large Macchiato (No sugar)",
        keywords: ["veliki macchiato", "bijela kava", "cappuccino", "kapucino", "kava s puno mlijeka", "white coffee", "latte"],
        kcalPer100g: 35,
        macrosPer100g: { carbs: 3, protein: 2, fat: 2 },
        standardUnits: { "salica": 150, "kava": 150, "cup": 150, "coffee": 150 },
        note: "Sadrži cca 1 deci mlijeka po šalici (cca 50-60 kcal)."
    },
    {
        name: "Dodatni paket šećera (Kafić)",
        name_en: "Sugar Packet",
        keywords: ["paket secera", "vrecica secera", "paketic secera", "zlica secera", "bijeli secer", "sugar packet", "teaspoon sugar"],
        kcalPer100g: 387,
        macrosPer100g: { carbs: 100, protein: 0, fat: 0 },
        standardUnits: { "vrecica": 5, "kom": 5, "zlicica": 5, "packet": 5, "tsp": 5 },
        note: "1 vrećica iz kafića ili 1 žličica = ravno 5g (20 kcal čistih ugljikohidrata)."
    },
    {
        name: "Svijetlo pivo (Lager pivo)",
        name_en: "Lager Beer",
        keywords: ["pivo", "zujacka", "ozujsko", "karlovacko", "svijetlo pivo", "veliko pivo", "malo pivo", "toceno pivo", "lager pivo", "lager", "beer"],
        kcalPer100g: 43,
        macrosPer100g: { carbs: 3.6, protein: 0.5, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500, "pivo": 500, "bottle": 500, "can": 500, "large": 500, "small": 330 },
        note: "1 veliko (pola litre) sadrži oko 215 Kcal."
    },
    {
        name: "Tamno / Crno pivo",
        name_en: "Dark Beer",
        keywords: ["crno pivo", "tamno pivo", "tomislav", "stout", "porter", "crno", "dark beer"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 4.5, protein: 0.6, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500, "bottle": 500, "large": 500 },
        note: "Neznatno kaloričnije i jače od svijetlog. 1 veliko (pola litre) = 250 kcal."
    },
    {
        name: "Pšenično pivo (Hefeweizen)",
        name_en: "Wheat Beer (Hefeweizen)",
        keywords: ["psenicno pivo", "psenicno", "psenica", "paulaner", "erdinger", "weizen", "psenicno pivo", "psenicno", "pšenično pivo", "pšenično", "wheat beer"],
        kcalPer100g: 45,
        macrosPer100g: { carbs: 3.5, protein: 0.5, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500, "pivo": 500, "bottle": 500, "large": 500 },
        note: "Kalorijski slično lageru, oko 225 kcal na pola litre."
    },
    {
        name: "Craft pivo (IPA / APA / Pale Ale)",
        name_en: "Craft Beer (IPA / APA)",
        keywords: ["craft pivo", "ipa", "apa", "pale ale", "ale pivo", "zahmeljeno pivo", "craft beer"],
        kcalPer100g: 55,
        macrosPer100g: { carbs: 4.0, protein: 0.6, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "veliko": 500, "malo": 330, "boca": 500, "limenka": 500, "bottle": 500, "large": 500 },
        note: "Craft piva i Pale Ale-ovi obično imaju veći postotak alkohola i ekstrakta pa su kaloričnija. 1 veliko = cca 275 kcal."
    },
    {
        name: "Bijelo vino",
        name_en: "White Wine",
        keywords: ["bijelo vino", "dec bijelog", "deci vina", "gemist (bez vode)", "white wine"],
        kcalPer100g: 82,
        macrosPer100g: { carbs: 2.6, protein: 0.1, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 150, "deci": 100, "glass": 150 },
        note: "1 dl (čistog vina) = cca 82 Kcal (gemišt 2v-1 voda je oko 130 Kcal)."
    },
    {
        name: "Crno vino (Crveno)",
        name_en: "Red Wine",
        keywords: ["crno vino", "crveno vino", "dec crnog", "casa vina", "red wine"],
        kcalPer100g: 85,
        macrosPer100g: { carbs: 2.6, protein: 0.1, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 150, "deci": 100, "glass": 150 },
        note: "1 čaša restoranske mjere (1.5 dl) = cca 125 Kcal."
    },
    {
        name: "Gemišt / Bevanda / Špricer",
        name_en: "Wine Spritzer (Gemišt/Bevanda)",
        keywords: ["gemist", "bevanda", "spricer", "casa gemista", "litra i voda", "bambus", "spritzer", "white wine spritzer"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 1.5, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 200, "glass": 200 },
        note: "Pola vino pola mineralna. 1 čaša (2 dl) = oko 100 Kcal."
    },
    {
        name: "Pelinkovac / Jägermeister / Biteri",
        name_en: "Pelinkovac / Jägermeister / Bitters",
        keywords: ["pelinkovac", "pelin", "jegermeister", "jeger", "amaro", "campari", "biha", "rakija", "bitters", "herbal liqueur", "schnapps"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 12, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "cep": 30, "kratko": 30, "duplo": 60, "shot": 30 },
        note: "Jako kalorično zbog šećera i alkohola. Žestice imaju oko 75 kcal po standardnoj (0.03l) čašici (čepa)."
    },
    {
        name: "Coca-Cola (Regularna)",
        name_en: "Coca-Cola (Original)",
        keywords: ["coca cola", "kola", "koka kola", "pepsi", "coke", "soda"],
        kcalPer100g: 42,
        macrosPer100g: { carbs: 10.6, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "boca": 500, "limenka": 330, "casa": 250, "bottle": 500, "can": 330, "glass": 250 },
        note: "Mala limenka (330ml) ima 140 kcal (sve iz šećera)."
    },
    {
        name: "Coca-Cola Zero / Pepsi Max",
        name_en: "Coca-Cola Zero / Pepsi Max",
        keywords: ["coca cola zero", "pepsi max", "coca cola bez secera", "kola zero", "sugar free coke"],
        kcalPer100g: 0.3,
        macrosPer100g: { carbs: 0, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "boca": 500, "limenka": 330, "casa": 250, "bottle": 500, "can": 330, "glass": 250 },
        note: "Nema kalorija."
    },
    {
        name: "Cedevita (otopljena u vodi)",
        name_en: "Cedevita (Dissolved in water)",
        keywords: ["cedevita", "cedevite", "casa cedevite", "vitamin drink"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 3.5, protein: 0, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "casa": 250, "glass": 250 },
        note: "Gleda se napitak (voda + prah). 1 velika čaša (3 dl) = cca 45 Kcal."
    },
    {
        name: "Voćni sok (Nektar, Jabuka/Naranča, 50% voće)",
        name_en: "Fruit Juice (Apple/Orange)",
        keywords: ["sok od jabuke", "sok od narance", "vocni sok", "cappy", "juicy", "sok juice", "fruit juice", "apple juice", "orange juice"],
        kcalPer100g: 45,
        macrosPer100g: { carbs: 11, protein: 0.5, fat: 0 },
        standardUnits: { "ml": 1, "dl": 100, "l": 1000, "boca": 500, "casa": 200, "bottle": 500, "glass": 250 },
        note: "Kalorijski identično Coca-Coli. Čaša (2dl) = 90 kcal."
    },

    // === MESO I PILETINA (SIROVO ILI PEČENO BEZ DODATNE MASTI) ===
    {
        name: "Pileća prsa (bijelo meso, sirovo)",
        name_en: "Chicken Breast (white meat, raw)",
        keywords: ["pileca prsa", "piletina prsa", "bijelo meso", "file piletine", "pileci file", "chicken breast", "chicken file"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 0, protein: 23, fat: 1.2 },
        standardUnits: { "odrezak": 150, "file": 200, "porcija": 150, "steak": 150, "fillet": 200 },
        note: "Krt i niskokokaloričan protein. 1 manji odrezak ≈ 150g."
    },
    {
        name: "Pileći batak sa zabatkom (s kožom, sirovo)",
        name_en: "Chicken Leg Quarters (with skin, raw)",
        keywords: ["pileci batak", "pileci zabatak", "otkosteni zabatak", "piletina batak", "chicken leg", "chicken thigh"],
        kcalPer100g: 210,
        macrosPer100g: { carbs: 0, protein: 18, fat: 15 },
        standardUnits: { "kom": 200, "komad": 200, "piece": 200, "leg": 200 },
        note: "Više masti i kalorija zbog kože i kosti. Koža nosi većinu vate."
    },
    {
        name: "Svinjski but (bez kosti, sirovo)",
        name_en: "Pork Leg (boneless, raw)",
        keywords: ["svinjski but", "svinjetina but", "svinjski odrezak od buta", "pork leg", "pork steak"],
        kcalPer100g: 135,
        macrosPer100g: { carbs: 0, protein: 22, fat: 5 },
        standardUnits: { "odrezak": 150, "snita": 150, "porcija": 150, "steak": 150, "slice": 150 },
        note: "Relativno krto meso. 1 odrezak ≈ 150g."
    },
    {
        name: "Svinjski vrat (prošarani, sirovo)",
        name_en: "Pork Neck (marbled, raw)",
        keywords: ["svinjski vrat", "vratina", "svinjska vratina", "svinjski kotlet", "pork neck"],
        kcalPer100g: 260,
        macrosPer100g: { carbs: 0, protein: 16, fat: 22 },
        standardUnits: { "odrezak": 180, "komad": 180, "porcija": 180, "steak": 180 },
        note: "Dosta masti, odlično za roštilj. 1 komad vratine je cca 180g."
    },
    {
        name: "Miješano mljeveno meso (Govedina/Svinjetina)",
        name_en: "Mixed Ground Meat (Beef/Pork)",
        keywords: ["mljeveno meso", "mijesano mljeveno", "fasirano meso", "ground meat", "minced meat"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 0, protein: 18, fat: 20 },
        standardUnits: { "porcija": 200, "pakiranje": 500, "portion": 200, "pack": 500 },
        note: "Masnije mljeveno meso, učestalo se koristi za bolonjez i sarmu."
    },
    {
        name: "Ćevapi (Zapečeno meso, Roštilj)",
        name_en: "Ćevapi (Grilled meat, BBQ)",
        keywords: ["cevapi", "cevapcici", "porcija cevapa", "cevap", "grill"],
        kcalPer100g: 260,
        macrosPer100g: { carbs: 2, protein: 15, fat: 21 },
        standardUnits: { "kom": 25, "komad": 25, "porcija": 250, "mali_cevapi": 125, "veliki_cevapi": 250, "piece": 25, "portion": 250 },
        note: "Velika porcija od 10 komada ima cca 250g samo mesa (650 Kcal)! Zasebno bilježi lepinju."
    },

    // === SUVOMESNATO (NARESCI) ===
    {
        name: "Pršut (sušeni)",
        name_en: "Prosciutto (Cured ham)",
        keywords: ["prsut", "fetica prsuta", "snita prsuta", "dalmatinski prsut", "prosciutto", "cured ham"],
        kcalPer100g: 270,
        macrosPer100g: { carbs: 1, protein: 26, fat: 18 },
        standardUnits: { "snita": 15, "feta": 15, "porcija": 100, "slice": 15 },
        note: "1 jako tanka prozirna narezana feticica ≈ 15 grama."
    },
    {
        name: "Zimska / Srijemska kobasica (Salama)",
        name_en: "Winter / Srijem Salami",
        keywords: ["zimska salama", "zimska kobasica", "cajna kobasica", "kulen", "srijemska", "gavrilovic", "snita cajne", "salami"],
        kcalPer100g: 480,
        macrosPer100g: { carbs: 2, protein: 22, fat: 43 },
        standardUnits: { "snita": 5, "feta": 5, "porcija": 50, "kom": 5, "slice": 5 },
        note: "Jako kalorično! 1 industrijska šnita ≈ samo 5g."
    },
    {
        name: "Pikana šunka (Dimljena, Kuhana)",
        name_en: "Ham (Smoked, Cooked)",
        keywords: ["sunka", "kuhana sunka", "pizza sunka", "sunka u ovitku", "snita sunke", "ham", "cooked ham"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 1, protein: 18, fat: 4 },
        standardUnits: { "snita": 15, "feta": 15, "porcija": 50, "slice": 15 },
        note: "Vrlo krto u usporedbi sa salamama. 1 velika šnita ≈ 15 do 20 grama."
    },
    {
        name: "Panceta / Špek (Sušena slanina)",
        name_en: "Pancetta / Bacon",
        keywords: ["spek", "panceta", "slanine", "slanina", "suho meso mast", "snita pancete", "snita speka", "bacon", "pancetta"],
        kcalPer100g: 420,
        macrosPer100g: { carbs: 0, protein: 15, fat: 40 },
        standardUnits: { "snita": 15, "feta": 15, "porcija": 50, "slice": 15 },
        note: "Puna masnoće. 1 režanj slanine ≈ 15 grama."
    },
    {
        name: "Poli / Parizer / Hrenovka",
        name_en: "Pariser / Bologna / Hot Dog",
        keywords: ["parizer", "poli", "posebna", "hrenovka", "hrenovke", "snita parizera", "hot dog", "bologna"],
        kcalPer100g: 280,
        macrosPer100g: { carbs: 3, protein: 11, fat: 25 },
        standardUnits: { "snita": 15, "kom": 60, "hrenovka": 60, "par": 120, "slice": 15, "piece": 60 },
        note: "Deblja šnita Poli salame je 15g. 1 klasična hrenovka iznosi oko 60g."
    },

    // === PRILOZI (KUHANO STANJE) ===
    {
        name: "Krumpir (Kuhani, pečeni bez ulja)",
        name_en: "Potato (Boiled, roasted without oil)",
        keywords: ["krumpir", "kuhani krumpir", "leso krumpir", "porcija krumpira", "krumpir salata", "potato", "boiled potato"],
        kcalPer100g: 86,
        macrosPer100g: { carbs: 20, protein: 2, fat: 0.1 },
        standardUnits: { "kom": 150, "komad": 150, "porcija": 250, "piece": 150, "portion": 250 },
        note: "Krumpir sam po sebi slabo deblja. 1 srednji krumpir = 150g."
    },
    {
        name: "Pomfrit (Pržen u ulju)",
        name_en: "French Fries (Deep fried)",
        keywords: ["pomfri", "pommes frites", "pomfrit", "przeni krumpirice", "porcija pomfrija", "mali pomfri", "veliki pomfri", "french fries", "chips"],
        kcalPer100g: 312,
        macrosPer100g: { carbs: 41, protein: 3.5, fat: 15 },
        standardUnits: { "porcija": 150, "mali": 100, "srednji": 150, "veliki": 200, "portion": 150, "small": 100, "medium": 150, "large": 200 },
        note: "Prženje u ulju utrostruči kalorije krumpira. Standardna porcija uz roštilj = cca 150g."
    },
    {
        name: "Riža (Bijela, Kuhana)",
        name_en: "Rice (White, Boiled)",
        keywords: ["riza", "kuhana riza", "bijela riza", "porcija rize", "rice", "boiled rice"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 28, protein: 2.7, fat: 0.3 },
        standardUnits: { "porcija": 200, "zlica": 20, "salica": 150, "portion": 200, "tbsp": 20, "cup": 150 },
        note: "Odnosi se isključivo na SKUHANU smjesu (nabubrenu vodom). Kuhana porcija u restoranu iznosi preko 200g."
    },
    {
        name: "Tjestenina / Makaruni (Kuhano, Bijelo tijesto)",
        name_en: "Pasta / Macaroni (Cooked, White dough)",
        keywords: ["tjesto", "tjestenina", "pasta", "makaruni", "spageti", "porcija paste", "kuhana tjestenina", "spaghetti", "macaroni"],
        kcalPer100g: 158,
        macrosPer100g: { carbs: 31, protein: 5.8, fat: 0.9 },
        standardUnits: { "porcija": 200, "zlica": 20, "portion": 200, "tbsp": 20 },
        note: "Odnosi se isključivo na KUHANU smjesu (napuhana težina). Obična porcija iznosi cca 200g."
    },
    {
        name: "Grah s vodom (Iz konzerve / Skuhani)",
        name_en: "Beans in water (Canned / Boiled)",
        keywords: ["grah", "pasulj", "kuhani grah", "grah salata", "zaprzeni grah", "beans", "canned beans", "kidney beans"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 20, protein: 7, fat: 0.5 },
        standardUnits: { "porcija": 200, "konzerva": 400, "pola": 200, "portion": 200, "can": 400, "half": 200 },
        note: "Odličan zasitan protein (iako sadrži puno UH). 1 standardna porcija (ne variva) = 200g."
    },

    // === VOĆE ===
    {
        name: "Banana",
        name_en: "Banana",
        keywords: ["banana", "banane", "bananu", "fruit"],
        kcalPer100g: 89,
        macrosPer100g: { carbs: 23, protein: 1.1, fat: 0.3 },
        standardUnits: { "kom": 120, "komad": 120, "bananu": 120, "piece": 120 },
        note: "1 komad srednje veličine ≈ 120 grama jestivog djela."
    },
    {
        name: "Jabuka",
        name_en: "Apple",
        keywords: ["jabuka", "jabuke", "jabuku", "zelena jabuka", "apple", "fruit"],
        kcalPer100g: 52,
        macrosPer100g: { carbs: 14, protein: 0.3, fat: 0.2 },
        standardUnits: { "kom": 150, "komad": 150, "piece": 150 },
        note: "1 komad srednje veličine ≈ 150 grama jestivog djela."
    },
    {
        name: "Zelena salata (Kristalka, Puterica)",
        name_en: "Lettuce (Green salad)",
        keywords: ["zelena salata", "kristalka", "puterica", "salata mjesana", "lettuce", "salad", "greens"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 2.8, protein: 1.4, fat: 0.2 },
        standardUnits: { "porcija": 100, "zdjelica": 100, "portion": 100, "bowl": 100 },
        note: "Brojke čiste salate. Kalorije su nebitne ukoliko je ne poliješ sa 3 žlice maslinovog ulja (3x90 Kcal!)."
    },
    {
        name: "Rajčica (Paradajz)",
        name_en: "Tomato",
        keywords: ["rajcica", "rajcice", "paradajz", "paradajza", "pomidor", "tomato", "vegetable"],
        kcalPer100g: 18,
        macrosPer100g: { carbs: 3.9, protein: 0.9, fat: 0.2 },
        standardUnits: { "kom": 120, "komad": 120, "piece": 120 },
        note: "1 srednje veliki paradajz = cca 120-150g."
    },
    {
        name: "Zeleno zelje / Kupus (Svježe)",
        name_en: "Green Cabbage (Fresh)",
        keywords: ["zelje", "kupus", "salata od zelja", "cabbage", "slaw"],
        kcalPer100g: 25,
        macrosPer100g: { carbs: 6, protein: 1.3, fat: 0.1 },
        standardUnits: { "porcija": 150, "zdjelica": 150, "portion": 150, "bowl": 150 },
        note: "Izuzetno dijetalno. Ali pazi, varivo sa zaprškom mijenja matematiku."
    },

    // === OSTALO (ZAČINI / NAMIRE) ===
    {
        name: "Maslinovo ulje",
        name_en: "Olive Oil",
        keywords: ["maslinovo ulje", "zlica maslinovog", "maslinovog ulja", "domace ulje", "olive oil"],
        kcalPer100g: 884,
        macrosPer100g: { carbs: 0, protein: 0, fat: 100 },
        standardUnits: { "zlica": 15, "zlicica": 5, "dl": 100, "tbsp": 15, "tsp": 5 },
        note: "OPREZ: 1 velika jušna žlica sadrži enormnih 130 Kcal čiste masti!"
    },
    {
        name: "Suncokretovo ulje",
        name_en: "Sunflower Oil",
        keywords: ["suncokretovo ulje", "ulje za przenje", "zlica ulja", "ulja", "sunflower oil", "cooking oil"],
        kcalPer100g: 884,
        macrosPer100g: { carbs: 0, protein: 0, fat: 100 },
        standardUnits: { "zlica": 15, "zlicica": 5, "dl": 100, "tbsp": 15, "tsp": 5 },
        note: "1 velika jušna žlica = cca 15g (130 Kcal)."
    },
    {
        name: "Čokolada (Mliječna klasična)",
        name_en: "Milk Chocolate",
        keywords: ["cokolada", "milka", "dorina", "kockica cokolade", "red cokolade", "chocolate", "milk chocolate"],
        kcalPer100g: 535,
        macrosPer100g: { carbs: 59, protein: 7.5, fat: 30 },
        standardUnits: { "kom": 100, "boca": 100, "kockica": 5, "red": 20, "piece": 5, "bar": 100, "row": 20 },
        note: "1 red (4 kockice) obične mliječne čokolade teži oko 20g."
    },
    {
        name: "Pahuljice zobene (Sirove, Suhe)",
        name_en: "Oat Flakes (Raw, Dry)",
        keywords: ["zobene", "zobene pahuljice", "porcija zobenih", "zobenih", "oat flakes", "rolled oats"],
        kcalPer100g: 389,
        macrosPer100g: { carbs: 66, protein: 17, fat: 7 },
        standardUnits: { "zlica": 10, "porcija": 60, "salica": 80, "tbsp": 10, "portion": 60, "cup": 80 },
        note: "Kalorijski bogate. Porcija kojom napuniš manju zdjelicu (prije vode/mlijeka) je oko 60g."
    },
    {
        name: "Whey Protein prah",
        name_en: "Whey Protein Powder",
        keywords: ["whey protein", "mjerice wheya", "mjerica wheya", "proteinski prah", "whey izolat", "protein powder"],
        kcalPer100g: 380,
        macrosPer100g: { carbs: 5, protein: 80, fat: 4 },
        standardUnits: { "mjerica": 30, "porcija": 30, "scoop": 30 },
        note: "1 standardna mjerica (scoop) koja dođe u kutiji teži oko 30g."
    },
    // === SJEMENKE I ORAŠASTI PLODOVI ===
    {
        name: "Chia sjemenke",
        name_en: "Chia Seeds",
        keywords: ["chia sjemenke", "čia", "zlica chie", "chia", "seeds"],
        kcalPer100g: 486,
        macrosPer100g: { carbs: 42, protein: 16, fat: 31 },
        standardUnits: { "zlica": 15, "porcija": 15, "tbsp": 15 },
        note: "Vrlo kalorično, bogato vlaknima. 1 jušna žlica ≈ 15g (70 kcal)."
    },
    {
        name: "Lanene sjemenke",
        name_en: "Flax Seeds",
        keywords: ["lanene sjemenke", "lan", "mljeveni lan", "zlica lana", "flax seeds", "linseed"],
        kcalPer100g: 534,
        macrosPer100g: { carbs: 29, protein: 18, fat: 42 },
        standardUnits: { "zlica": 10, "porcija": 10, "tbsp": 10 },
        note: "Bogato omega-3 mastima, 1 žlica = 10g."
    },
    {
        name: "Sjemenke bundeve (Golice)",
        name_en: "Pumpkin Seeds",
        keywords: ["sjemenke bundeve", "bucine sjemenke", "golice", "bundeva", "pumpkin seeds"],
        kcalPer100g: 574,
        macrosPer100g: { carbs: 15, protein: 30, fat: 49 },
        standardUnits: { "sakica": 30, "porcija": 30, "zlica": 15, "handful": 30, "tbsp": 15 },
        note: "Visoko proteínaslko, ali i masno. 1 šakica = cca 30g (170 kcal)."
    },
    {
        name: "Kikiriki (Prženi, Slani)",
        name_en: "Peanuts (Roasted, Salted)",
        keywords: ["kikiriki", "kikirikija", "kiki riki", "slani kikiriki", "saka kikirikija", "peanuts"],
        kcalPer100g: 585,
        macrosPer100g: { carbs: 16, protein: 24, fat: 49 },
        standardUnits: { "saka": 30, "porcija": 30, "vreca": 100, "handful": 30, "portion": 30, "bag": 100 },
        note: "OPREZ: Pravi kalorični ubojica! Šaka je ~175 kcal."
    },
    // === SUHO VOĆE ===
    {
        name: "Grožđice (Suho grožđe)",
        name_en: "Raisins (Dried grapes)",
        keywords: ["grozdice", "suho grozdje", "cvebe", "saka grozdica", "raisins"],
        kcalPer100g: 300,
        macrosPer100g: { carbs: 79, protein: 3, fat: 0.5 },
        standardUnits: { "zlica": 15, "saka": 30, "porcija": 30, "tbsp": 15, "handful": 30 },
        note: "Čista energija/šećeri. 1 žlica ≈ 15g."
    },
    {
        name: "Suhe šljive",
        name_en: "Prunes (Dried plums)",
        keywords: ["suhe sljive", "suha sljiva", "sljive", "prunes", "dried plums"],
        kcalPer100g: 240,
        macrosPer100g: { carbs: 64, protein: 2, fat: 0.4 },
        standardUnits: { "kom": 10, "komad": 10, "porcija": 50, "piece": 10 },
        note: "1 komad bez koštice = cca 10g (24 kcal)."
    },
    {
        name: "Brusnice (Sušene, zašećerene)",
        name_en: "Cranberries (Dried, sweetened)",
        keywords: ["brusnice", "suhe brusnice", "brusnica", "cranberries"],
        kcalPer100g: 308,
        macrosPer100g: { carbs: 82, protein: 0.1, fat: 1.4 },
        standardUnits: { "zlica": 15, "saka": 30, "tbsp": 15, "handful": 30 },
        note: "Često sadrže velik postotak dodanog šećera."
    },
    // === ŽITARICE I DORUČAK ===
    {
        name: "Zobena kaša (S mlijekom/vodom)",
        name_en: "Oatmeal / Porridge (with milk/water)",
        keywords: ["zobena kasa", "zobene kasa", "kuhane zobene", "porcija zobene kase", "zobena doručak", "oatmeal", "porridge"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 18, protein: 4, fat: 2 },
        standardUnits: { "porcija": 250, "zdjelica": 250, "tanjur": 250, "portion": 250, "bowl": 250 },
        note: "Odražava *gotov* obrok pripremljen s vodom i malo mlijeka. Porcija je teža jer je voda upijena (~280 kcal/porcija)."
    },
    {
        name: "Muesli / Granola (S orasima, voćem)",
        name_en: "Muesli / Granola (with nuts, fruit)",
        keywords: ["muesli", "granola", "musle", "zobene s vocem"],
        kcalPer100g: 450,
        macrosPer100g: { carbs: 65, protein: 10, fat: 15 },
        standardUnits: { "zlica": 15, "porcija": 60, "zdjelica": 60, "tbsp": 15, "portion": 60, "bowl": 60 },
        note: "Puno kaloričnije od običnih zobenih zbog ulja i meda u pečenju."
    },
    {
        name: "Corn Flakes (Kukuruzne pahuljice)",
        name_en: "Corn Flakes",
        keywords: ["corn flakes", "kornfleks", "pahuljice", "kukuruzne pahuljice"],
        kcalPer100g: 357,
        macrosPer100g: { carbs: 84, protein: 7, fat: 0.4 },
        standardUnits: { "porcija": 40, "zdjelica": 40, "portion": 40, "bowl": 40 },
        note: "Porcija za manju zdjelicu obično varira oko 40 grama."
    },
    // === ZALEĐENO POVRĆE ===
    {
        name: "Zaleđeno miješano povrće (Grašak, Mrkva, Kukuruz)",
        name_en: "Frozen Mixed Vegetables (Peas, Carrots, Corn)",
        keywords: ["mjesano povrce", "zaledeno povrce", "smrznuto povrce", "carska mjesavina", "mixed vegetables"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 10, protein: 3, fat: 0.5 },
        standardUnits: { "porcija": 200, "zdjelica": 200, "tanjur": 200, "portion": 200, "bowl": 200 },
        note: "Odličan niskokalorični prilog uz meso."
    },
    {
        name: "Grašak (Kuhani / Zaleđeni pa kuhan)",
        name_en: "Peas (Boiled)",
        keywords: ["grasak", "graska", "kuhani grasak", "porcija graska", "peas"],
        kcalPer100g: 81,
        macrosPer100g: { carbs: 14, protein: 5, fat: 0.4 },
        standardUnits: { "porcija": 150, "zlica": 20, "portion": 150, "tbsp": 20 },
        note: "Kaloričniji od većine povrća (zbog veće razine UH)."
    },
    // === JUHE ===
    {
        name: "Bistra pileća juha / Goveđa juha",
        name_en: "Clear Chicken Soup / Beef Soup",
        keywords: ["juha", "pileca juha", "goveda juha", "bistra juha", "tanjur juhe", "juhu", "pilecu juhu", "domaca juha", "soup", "chicken soup"],
        kcalPer100g: 30,
        macrosPer100g: { carbs: 3, protein: 2, fat: 1 },
        standardUnits: { "tanjur": 250, "porcija": 250, "ml": 1, "dl": 100, "plate": 250 },
        note: "Default prepoznata juha. 1 standardni tanjur je oko 250ml (75 kcal)."
    },
    {
        name: "Riblja juha",
        name_en: "Fish Soup",
        keywords: ["riblja juha", "tanjur riblje juhe", "riblju juhu", "fish soup"],
        kcalPer100g: 40,
        macrosPer100g: { carbs: 3, protein: 4, fat: 1.5 },
        standardUnits: { "tanjur": 250, "porcija": 250, "ml": 1, "dl": 100, "plate": 250 },
        note: "Malo bogatija proteinima. 1 standardni tanjur je oko 250ml (100 kcal)."
    },
    // === MORSKI PLODOVI ===
    {
        name: "Škampi na žaru (ili kuhani)",
        name_en: "Grilled Shrimp (or boiled)",
        keywords: ["skampi", "skampe", "skampi zar", "skampi na zaru", "peceni skampi", "kuhani skampi", "skampi zaru", "porcija skampa", "grilled shrimp", "prawns"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 0, protein: 18, fat: 1.5 },
        standardUnits: { "porcija": 300, "kom": 30, "grama": 1, "portion": 300, "piece": 30 },
        note: "Čisto meso škampa ima jako malo kalorija. Porcija s ljuskama od 300g donosi oko 100g čistog mesa."
    },
    {
        name: "Škampi na buzaru",
        name_en: "Shrimp in Buzara Sauce",
        keywords: ["skampi na buzaru", "buzara", "skampe na buzaru", "buzaru"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 2, protein: 15, fat: 6 },
        standardUnits: { "porcija": 350, "kom": 30, "grama": 1, "portion": 350 },
        note: "Umak (buzara) sadrži maslinovo ulje, vino, krušne mrvice. Porcija ima više kalorija zbog safta."
    },
    // === SVJEŽE VOĆE I BOBIČASTO VOĆE ===
    {
        name: "Naranča",
        name_en: "Orange",
        keywords: ["naranca", "narancu", "narance", "orange"],
        kcalPer100g: 47,
        macrosPer100g: { carbs: 12, protein: 0.9, fat: 0.1 },
        standardUnits: { "kom": 130, "komad": 130, "piece": 130 },
        note: "1 srednja naranča (bez kore) ≈ 130g."
    },
    {
        name: "Mandarina",
        name_en: "Mandarin / Tangerine",
        keywords: ["mandarina", "mandarine", "mandarinu", "mandarin", "tangerine"],
        kcalPer100g: 53,
        macrosPer100g: { carbs: 13, protein: 0.8, fat: 0.3 },
        standardUnits: { "kom": 90, "komad": 90, "piece": 90 },
        note: "1 mandarina (bez kore) ≈ 90g."
    },
    {
        name: "Limun",
        name_en: "Lemon",
        keywords: ["limun", "limuna", "cijeđeni limun", "sok od limuna", "lemon", "juice"],
        kcalPer100g: 29,
        macrosPer100g: { carbs: 9, protein: 1.1, fat: 0.3 },
        standardUnits: { "kom": 60, "komad": 60, "dl": 100, "piece": 60 },
        note: "1 iscijeđeni limun daje oko 50-60 ml soka."
    },
    {
        name: "Jagode",
        name_en: "Strawberries",
        keywords: ["jagode", "jagoda", "zdjelica jagoda", "strawberries", "berries"],
        kcalPer100g: 32,
        macrosPer100g: { carbs: 8, protein: 0.7, fat: 0.3 },
        standardUnits: { "kom": 15, "porcija": 150, "zdjelica": 150, "piece": 15, "portion": 150, "bowl": 150 },
        note: "Vrlo niskokalorično i puno vode."
    },
    {
        name: "Maline",
        name_en: "Raspberries",
        keywords: ["maline", "malina", "raspberries"],
        kcalPer100g: 52,
        macrosPer100g: { carbs: 12, protein: 1.2, fat: 0.7 },
        standardUnits: { "porcija": 100, "zdjelica": 100, "portion": 100, "bowl": 100 },
        note: "Porcija od 100g."
    },
    {
        name: "Borovnice",
        name_en: "Blueberries",
        keywords: ["borovnice", "borovnica", "blueberries"],
        kcalPer100g: 57,
        macrosPer100g: { carbs: 14, protein: 0.7, fat: 0.3 },
        standardUnits: { "porcija": 100, "zdjelica": 100, "portion": 100, "bowl": 100 },
        note: "Porcija od 100g."
    },

    // === POVRĆE (SVJEŽE / KUHANO) ===
    {
        name: "Paprika (svježa)",
        name_en: "Bell Pepper (fresh)",
        keywords: ["paprika", "paprike", "crvena paprika", "zelena paprika", "bell pepper", "pepper"],
        kcalPer100g: 31,
        macrosPer100g: { carbs: 6, protein: 1, fat: 0.3 },
        standardUnits: { "kom": 150, "komad": 150, "piece": 150 },
        note: "1 velika paprika ≈ 150g."
    },
    {
        name: "Krastavac",
        name_en: "Cucumber",
        keywords: ["krastavac", "krastavci", "salata od krastavaca", "cucumber"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 3.6, protein: 0.7, fat: 0.1 },
        standardUnits: { "kom": 300, "komad": 300, "porcija": 150, "piece": 300, "portion": 150 },
        note: "Gotovo čista voda. Cijeli veliki je oko 300g."
    },
    {
        name: "Luk (Kapula)",
        name_en: "Onion",
        keywords: ["luk", "kapula", "crveni luk", "bijeli luk", "glavica luka", "veliki luk", "onion", "red onion", "garlic"],
        kcalPer100g: 40,
        macrosPer100g: { carbs: 9, protein: 1.1, fat: 0.1 },
        standardUnits: { "kom": 100, "glavica": 100, "polovina": 50, "piece": 100, "head": 100, "half": 50 },
        note: "1 srednja glavica ≈ 100g."
    },
    {
        name: "Mladi luk",
        name_en: "Spring Onion / Scallion",
        keywords: ["mladi luk", "mladog luka", "strucak mladog luka", "spring onion", "scallion"],
        kcalPer100g: 32,
        macrosPer100g: { carbs: 7, protein: 1.8, fat: 0.2 },
        standardUnits: { "kom": 15, "komad": 15, "strucak": 15, "porcija": 50, "piece": 15, "bunch": 50 },
        note: "1 komad s perima = cca 15-20g."
    },
    {
        name: "Tikvice (Grill ili Kuhane)",
        name_en: "Zucchini (Grilled or Boiled)",
        keywords: ["tikvica", "tikvice", "grilane tikvice", "kuhane tikvice", "zucchini", "courgette"],
        kcalPer100g: 17,
        macrosPer100g: { carbs: 3.1, protein: 1.2, fat: 0.3 },
        standardUnits: { "kom": 200, "komad": 200, "porcija": 150, "piece": 200, "portion": 150 },
        note: "Brojke su za samu tikvicu, pazi na ulje ako je grill!"
    },
    {
        name: "Brokula (Kuhana)",
        name_en: "Broccoli (Boiled)",
        keywords: ["brokula", "kuhana brokula", "brokule", "broccoli"],
        kcalPer100g: 35,
        macrosPer100g: { carbs: 7, protein: 2.4, fat: 0.4 },
        standardUnits: { "porcija": 150, "zdjelica": 150, "portion": 150, "bowl": 150 },
        note: "Zasitno i niskokalorično."
    },
    {
        name: "Cvjetača / Karfiol (Kuhana)",
        name_en: "Cauliflower (Boiled)",
        keywords: ["cvjetaca", "karfiol", "kuhana cvjetaca", "pohani karfiol", "cauliflower"],
        kcalPer100g: 25,
        macrosPer100g: { carbs: 5, protein: 1.9, fat: 0.3 },
        standardUnits: { "porcija": 150, "zdjelica": 150, "portion": 150, "bowl": 150 },
        note: "Pohana cvjetača ima puno više kalorija zbog mrvica i ulja!"
    },
    {
        name: "Kelj (Kuhani)",
        name_en: "Kale (Boiled)",
        keywords: ["kelj", "kelja", "kale", "kuhani kelj"],
        kcalPer100g: 50,
        macrosPer100g: { carbs: 9, protein: 4, fat: 0.9 },
        standardUnits: { "porcija": 150, "zdjelica": 150, "tanjur": 250, "portion": 150 },
        note: "Vrlo zdravo lisnato povrće, bogato vlaknima."
    },

    // === FAST FOOD I GRICKALICE ===
    {
        name: "Pizza Margherita / Miješana (Prosjek)",
        name_en: "Pizza Margherita / Mixed (Average)",
        keywords: ["pizza", "pica", "komad pizze", "mjesana pizza", "slavonska pizza", "margarita", "margherita"],
        kcalPer100g: 266,
        macrosPer100g: { carbs: 33, protein: 11, fat: 10 },
        standardUnits: { "komad": 150, "kom": 150, "snita": 150, "cijela": 450, "pola": 225, "slice": 150, "whole": 450 },
        note: "1 komad (trokut) iz pekare ili restorana ≈ 150g (oko 400 Kcal)."
    },
    {
        name: "Hamburger (Klasični / Fast food)",
        name_en: "Hamburger (Classic / Fast food)",
        keywords: ["hamburger", "burger", "mali hamburger", "veliki hamburger", "cheeseburger"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 24, protein: 12, fat: 12 },
        standardUnits: { "kom": 150, "mali": 150, "veliki": 250, "komad": 200, "piece": 150, "small": 150, "large": 250 },
        note: "Mali fast-food hamburger (npr. McDonald's) ≈ 100-150g. Veliki craft burger ≈ 250-300g."
    },
    {
        name: "Big Mac (McDonald's)",
        name_en: "Big Mac (McDonald's)",
        keywords: ["big mac", "big mek", "mcdonalds big mac"],
        kcalPer100g: 257,
        macrosPer100g: { carbs: 20, protein: 12, fat: 14 },
        standardUnits: { "kom": 215, "komad": 215, "piece": 215 },
        note: "Cijeli Big Mac ima 215g (550 Kcal)."
    },
    {
        name: "Chicken Nuggets (Pohani komadići)",
        name_en: "Chicken Nuggets (Breaded pieces)",
        keywords: ["chicken nuggets", "nuggets", "mcnuggets", "pohana piletina komadici"],
        kcalPer100g: 296,
        macrosPer100g: { carbs: 16, protein: 15, fat: 20 },
        standardUnits: { "kom": 16, "komad": 16, "porcija": 100, "piece": 16, "portion": 100 },
        note: "1 nugget iznosi oko 16 grama (cca 45 Kcal)."
    },
    {
        name: "Čips od krumpira (Slani)",
        name_en: "Potato Chips (Salted)",
        keywords: ["cips", "chips", "cipsa", "vrecica cipsa", "saka cipsa", "pringles", "crisps"],
        kcalPer100g: 536,
        macrosPer100g: { carbs: 53, protein: 7, fat: 35 },
        standardUnits: { "saka": 30, "vreca": 150, "mali": 50, "handful": 30, "bag": 150, "small": 50 },
        note: "Iznimno visoko kalorično! Velika vreća (150g) ima preko 800 kcal."
    },
    {
        name: "Flips / Smoki (Kikiriki)",
        name_en: "Peanut Flips (Smoki)",
        keywords: ["smoki", "flips", "kikiriki flips", "vrecica smokija", "saka smokija", "peanut flips"],
        kcalPer100g: 500,
        macrosPer100g: { carbs: 55, protein: 14, fat: 25 },
        standardUnits: { "saka": 20, "vreca": 80, "handful": 20, "bag": 80 },
        note: "Standardna vrećica Smokija obično ima oko 80g."
    },
    {
        name: "Kokice (Air-popped ili pečene)",
        keywords: ["kokice", "popcorn", "saka kokica", "zdjela kokica", "kino kokice"],
        kcalPer100g: 387,
        macrosPer100g: { carbs: 78, protein: 13, fat: 5 },
        standardUnits: { "saka": 10, "porcija": 50, "velika": 100 },
        note: "Kokice na zrak su zdrave, ali kino kokice plivaju u ulju i idu preko 500 kcal/100g."
    },

    // === RIBA I PLODOVI MORA ===
    {
        name: "Tuna (Konzerva, Ocijeđena)",
        name_en: "Tuna (Canned, Drained)",
        keywords: ["tuna", "tuna konzerva", "konzerva tune", "tuna u salamuri", "tuna u maslinovom", "tunjevina", "rio mare", "canned tuna"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 0, protein: 28, fat: 2 },
        standardUnits: { "konzerva": 100, "porcija": 100, "can": 100, "portion": 100 },
        note: "Odražava tunu u vlastitom soku ili ocijeđenu. Tuna s uljem (neocijeđena) ima puno više masti!"
    },
    {
        name: "Losos (Filet, Pečen)",
        name_en: "Salmon (Fillet, Baked)",
        keywords: ["losos", "lososa", "filet lososa", "porcija lososa", "dimljeni losos", "salmon"],
        kcalPer100g: 206,
        macrosPer100g: { carbs: 0, protein: 22, fat: 13 },
        standardUnits: { "filet": 150, "porcija": 150, "portion": 150, "steak": 150 },
        note: "Zdrave (omega-3) masti, ali dosta kaloričniji od bijele ribe."
    },
    {
        name: "Oslić (Kuhani / Pečen na malo ulja)",
        name_en: "Hake (Boiled / Pan-fried)",
        keywords: ["oslic", "oslica", "filet oslica", "kuhani oslic", "oslic na leso", "hake", "white fish"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 0, protein: 19, fat: 1.5 },
        standardUnits: { "filet": 150, "porcija": 200, "kom": 150, "portion": 200, "piece": 150 },
        note: "Jako krta i niskokalorična riba. Pohani oslić dupla kalorije."
    },
    {
        name: "Skuša",
        name_en: "Mackerel",
        keywords: ["skusa", "konzerva skuse", "pecena skusa", "filet skuse", "mackerel"],
        kcalPer100g: 205,
        macrosPer100g: { carbs: 0, protein: 19, fat: 14 },
        standardUnits: { "kom": 200, "filet": 150, "konzerva": 100, "porcija": 200, "piece": 200, "can": 100, "portion": 200 },
        note: "Plava riba, bogata masnoćama i proteinima."
    },
    {
        name: "Srdela (Pržena / Pečena)",
        name_en: "Sardine (Fried / Baked)",
        keywords: ["srdela", "srdele", "kilo srdela", "frigane srdele", "sardine"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 0, protein: 20, fat: 9 },
        standardUnits: { "kom": 20, "komad": 20, "porcija": 200, "piece": 20, "portion": 200 },
        note: "Frigane (pržene u dubokom ulju) imaju više kalorija zbog upijenog ulja (~250 kcal/100g)."
    },
    {
        name: "Lignje (Prženi kolutići)",
        name_en: "Squid (Fried rings)",
        keywords: ["lignje", "frigane lignje", "przeni kolutici", "porcija lignji", "squid", "calamari"],
        kcalPer100g: 175,
        macrosPer100g: { carbs: 8, protein: 15, fat: 9 },
        standardUnits: { "porcija": 200, "portion": 200 },
        note: "Lignje sa žara su drastično manje kalorične (~90 kcal/100g) jer nemaju tijesto i ulje."
    },

    // === NAMAZI I SLATKO ===
    {
        name: "Nutella / Lino Lada",
        name_en: "Nutella / Chocolate Spread",
        keywords: ["nutella", "nutela", "lino lada", "linolada", "eurokrem", "zlica nutelle", "hazelnut spread", "chocolate spread"],
        kcalPer100g: 539,
        macrosPer100g: { carbs: 57, protein: 6, fat: 31 },
        standardUnits: { "zlica": 15, "zlicica": 5, "mazanje": 25, "tbsp": 15, "tsp": 5 },
        note: "Bombolet za kalorije. 1 debeli namaz na kruh = cca 25-30g."
    },
    {
        name: "Med",
        name_en: "Honey",
        keywords: ["med", "zlica meda", "domaci med", "honey"],
        kcalPer100g: 304,
        macrosPer100g: { carbs: 82, protein: 0.3, fat: 0 },
        standardUnits: { "zlica": 20, "zlicica": 7, "tbsp": 20, "tsp": 7 },
        note: "Puno šećera (fruktoze), 1 jušna žlica ≈ 20g (60 Kcal)."
    },
    {
        name: "Džem / Pekmez (Miješani)",
        name_en: "Jam / Marmalade",
        keywords: ["dzem", "pekmez", "marmelada", "dzem od sljiva", "pekmez marelica", "jam", "marmalade"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 65, protein: 0.5, fat: 0 },
        standardUnits: { "zlica": 20, "zlicica": 7, "mazanje": 25, "tbsp": 20, "tsp": 7 },
        note: "Gotovo čist ugljikohidrat. Manje kalorija od nutelle."
    },
    {
        name: "Maslac od kikirikija (Peanut butter)",
        keywords: ["kikiriki maslac", "peanut butter", "kikiriki putar", "putar od kikirikija"],
        kcalPer100g: 588,
        macrosPer100g: { carbs: 20, protein: 25, fat: 50 },
        standardUnits: { "zlica": 15, "zlicica": 5, "mazanje": 25 },
        note: "Odličan izvor masti i proteina. 1 puna žlica = oko 90 kcal."
    },

    // === PIĆA I NAPITCI ===
    {
        name: "Čaj (Bez šećera)",
        name_en: "Tea (Unsweetened)",
        keywords: ["caj", "salica caja", "zeleni caj", "crni caj", "kamilica", "caj od", "tea"],
        kcalPer100g: 1,
        macrosPer100g: { carbs: 0, protein: 0, fat: 0 },
        standardUnits: { "salica": 200, "ml": 1, "dl": 100, "cup": 200 },
        note: "Čaj sam po sebi nema kalorija. Pripaziti med i šećer koje stavljate unutra."
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

    // Inicijaliziramo array sa svim pretraživim jelima i dodajemo NAUČENA JELA na početak baze
    let fullDatabase = [...localFoodDB];
    try {
        const learnedMealsStr = safeLocalStorage.getItem('calorieShark_learnedFoods');
        if (learnedMealsStr) {
            const learnedArr = JSON.parse(learnedMealsStr);
            if (Array.isArray(learnedArr) && learnedArr.length > 0) {
                // Stavi naučena jela na početak liste kako bi imala blagu prednost kod pretrage istog imena
                fullDatabase = [...learnedArr, ...fullDatabase];
            }
        }
    } catch (e) {
        console.warn("Nisam uspio pročitati learnedFoods bazu", e);
    }

    // Lista definiranih namirnica iz baze sa Scoreom pretrage
    let bestMatch = null;
    let bestScore = -1; // Sada manji score znaci vecu udaljenost, mi trazimo blago bodovanje

    // Advanced fuzzy pronalazak baze:
    fullDatabase.forEach(food => {
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
        return null; // Nismo dovoljno uvjereni u bazi, šalji API-ju!
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
        else if (bestMatch.standardUnits['pivo']) { foundUnitType = 'pivo'; foundUnitFactor = bestMatch.standardUnits['pivo']; }
        else if (bestMatch.standardUnits['veliko']) { foundUnitType = 'veliko'; foundUnitFactor = bestMatch.standardUnits['veliko']; }
        else if (bestMatch.standardUnits['snita']) { foundUnitType = 'snita'; foundUnitFactor = bestMatch.standardUnits['snita']; }
        else if (bestMatch.standardUnits['tanjur']) { foundUnitType = 'tanjur'; foundUnitFactor = bestMatch.standardUnits['tanjur']; }
        else if (bestMatch.standardUnits['porcija']) { foundUnitType = 'porcija'; foundUnitFactor = bestMatch.standardUnits['porcija']; }
        else if (bestMatch.standardUnits['ml']) { foundUnitType = 'ml'; foundUnitFactor = 1; }
        else if (bestMatch.standardUnits['dl']) { foundUnitType = 'dl'; foundUnitFactor = 100; }
        else if (bestMatch.standardUnits['salica']) { foundUnitType = 'salica'; foundUnitFactor = bestMatch.standardUnits['salica']; }
        else {
            // Skroz slijepi fallback
            const firstKey = Object.keys(bestMatch.standardUnits)[0];
            foundUnitType = firstKey;
            foundUnitFactor = bestMatch.standardUnits[firstKey] || 1;
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

    const finalName = (currentLang === 'en' && bestMatch.name_en) ? bestMatch.name_en : bestMatch.name;

    return {
        name: finalName,
        estimatedWeightG: Math.round(finalGrams),
        kcalPer100g: bestMatch.kcalPer100g,
        macrosPer100g: bestMatch.macrosPer100g,
        note: `⚡ AI Memorija/Baza (${foundUnitType} ≈ ${foundUnitFactor}g)`
    };
}
