const advisorMeals = [
    // --- BREAKFAST (Doručak) ---
    {
        name: "Zobena kaša sa šumskim voćem",
        kcal: 350,
        protein: 12,
        carbs: 55,
        fat: 8,
        tags: ["vege", "vegan"],
        recipe: "Zobene pahuljice skuhane u bademovom mlijeku s mjerice smrznutog bobičastog voća i žličicom chia sjemenki."
    },
    {
        name: "Omlet od 3 jaja s povrćem",
        kcal: 320,
        protein: 24,
        carbs: 5,
        fat: 22,
        tags: ["vege", "glutenFree"],
        recipe: "3 jaja pečena na malo maslinovog ulja uz špinat, papriku i rajčice."
    },
    {
        name: "Avokado tost s poširanim jajem",
        kcal: 410,
        protein: 15,
        carbs: 35,
        fat: 24,
        tags: ["vege"],
        recipe: "Dvije šnite integralnog tosta, pola gnječenog avokada, limunov sok i jedno poširano jaje."
    },
    {
        name: "Grčki jogurt s medom i orasima",
        kcal: 280,
        protein: 18,
        carbs: 25,
        fat: 12,
        tags: ["vege", "glutenFree"],
        recipe: "200g grčkog jogurta, žlica meda i šaka sjeckanih oraha."
    },
    {
        name: "Smoothie od banane i kikiriki maslaca",
        kcal: 450,
        protein: 15,
        carbs: 60,
        fat: 18,
        tags: ["vege", "vegan"],
        recipe: "Banana, biljno mlijeko, puna žlica maslaca od kikirikija i malo cimeta."
    },

    // --- LUNCH / DINNER (Ručak i Večera) ---
    {
        name: "Pileća prsa sa slatkim krumpirom",
        kcal: 480,
        protein: 45,
        carbs: 50,
        fat: 10,
        tags: ["meat", "glutenFree"],
        recipe: "200g pečenih pilećih prsa sa začinima, uz pečeni slatki krumpir i puno miješane salate."
    },
    {
        name: "Tuna salata s grahom",
        kcal: 380,
        protein: 35,
        carbs: 30,
        fat: 12,
        tags: ["meat", "glutenFree"],
        recipe: "Konzerva tune u salamuri (cijeđena), pol konzerve crvenog graha, crveni luk, kukuruz, maslinovo ulje i ocat."
    },
    {
        name: "Losos na žaru s brokulom",
        kcal: 520,
        protein: 35,
        carbs: 10,
        fat: 35,
        tags: ["meat", "glutenFree"],
        recipe: "Srednji odrezak lososa pečen na limunu uz kuhanu brokulu prelivenu maslinovim uljem."
    },
    {
        name: "Tofu tjestenina u umaku od rajčice",
        kcal: 420,
        protein: 20,
        carbs: 65,
        fat: 10,
        tags: ["vege", "vegan"],
        recipe: "Integralna tjestenina s umakom od pasirane rajčice, češnjakom, bosiljkom i prženim kockicama dimljenog tofua."
    },
    {
        name: "Grah varivo (posno)",
        kcal: 350,
        protein: 18,
        carbs: 55,
        fat: 5,
        tags: ["vege", "vegan", "glutenFree"],
        recipe: "Klasično varivo od graha s mrkvom i lukom, bez zaprške i mesa. Gustoća od gnječenog graha."
    },
    {
        name: "Njoki od cvjetače sa sirom",
        kcal: 390,
        protein: 18,
        carbs: 35,
        fat: 20,
        tags: ["vege", "glutenFree"],
        recipe: "Kupovni njoki od cvjetače pečeni s mozzarellom i začinima."
    },
    {
        name: "Juneći odrezak s pečenim povrćem",
        kcal: 600,
        protein: 45,
        carbs: 20,
        fat: 38,
        tags: ["meat", "glutenFree"],
        recipe: "Ramstek (200g) pečen na naglo uz tikvice, paprike i šampinjone sa žara."
    },
    {
        name: "Rižoto s gljivama",
        kcal: 450,
        protein: 10,
        carbs: 70,
        fat: 15,
        tags: ["vege", "glutenFree"],
        recipe: "Arborio riža kuhana s povrtnim temeljcem, puno šampinjona/vrganja i parmezanom."
    },
    {
        name: "Sashimi ili lagani Sushi meni",
        kcal: 350,
        protein: 25,
        carbs: 50,
        fat: 8,
        tags: ["meat"],
        recipe: "Nekoliko komada nigirija i sashimija (sirova riba). Odličan izvor proteina i zdravih masti."
    },
    {
        name: "Bistra riblja juha",
        kcal: 150,
        protein: 15,
        carbs: 10,
        fat: 5,
        tags: ["meat", "glutenFree"],
        recipe: "Tanjur tople riblje juhe s komadićima bijele ribe i malo riže. Lagana i hranjiva večera."
    },

    // --- SNACKS (Međuobroci) ---
    {
        name: "Svježi zrnati sir s rajčicom",
        kcal: 200,
        protein: 25,
        carbs: 8,
        fat: 6,
        tags: ["vege", "glutenFree"],
        recipe: "200g posnog sira pomiješano s narezanom rajčicom, vlascem i malo soli."
    },
    {
        name: "Jabuka i bademi",
        kcal: 220,
        protein: 6,
        carbs: 25,
        fat: 14,
        tags: ["vege", "vegan", "glutenFree"],
        recipe: "Jedna svježa jabuka i mala šaka (cca 20g) sirovih badema."
    },
    {
        name: "Skyr jogurt",
        kcal: 120,
        protein: 20,
        carbs: 8,
        fat: 0,
        tags: ["vege", "glutenFree"],
        recipe: "1 čašica (200g) islandskog tipa jogurta. Visokoprotein, lak za ponijeti."
    },
    {
        name: "Whey shake",
        kcal: 120,
        protein: 25,
        carbs: 3,
        fat: 2,
        tags: ["vege", "glutenFree"],
        recipe: "Mjericu whey proteina pomiješana isključivo s vodom za brzi unos nakon treninga."
    },
    {
        name: "Crna čokolada (2 reda)",
        kcal: 240,
        protein: 3,
        carbs: 18,
        fat: 16,
        tags: ["vege", "vegan", "glutenFree"],
        recipe: "Maksimalno 40g (dva reda) tamne čokolade s preko 75% kakaa."
    }
];
