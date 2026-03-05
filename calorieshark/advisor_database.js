const advisorMeals = [
    // --- BREAKFAST (Doručak) ---
    {
        name: "Zobena kaša sa šumskim voćem",
        name_en: "Oatmeal with Forest Fruits",
        kcal: 350,
        protein: 12,
        carbs: 55,
        fat: 8,
        tags: ["vege", "vegan"],
        recipe: "Zobene pahuljice skuhane u bademovom mlijeku s mjerice smrznutog bobičastog voća i žličicom chia sjemenki.",
        recipe_en: "Oat flakes cooked in almond milk with a scoop of frozen berries and a teaspoon of chia seeds."
    },
    {
        name: "Omlet od 3 jaja s povrćem",
        name_en: "3-Egg Veggie Omelette",
        kcal: 320,
        protein: 24,
        carbs: 5,
        fat: 22,
        tags: ["vege", "glutenFree"],
        recipe: "3 jaja pečena na malo maslinovog ulja uz špinat, papriku i rajčice.",
        recipe_en: "3 eggs fried in a little olive oil with spinach, peppers and tomatoes."
    },
    {
        name: "Avokado tost s poširanim jajem",
        name_en: "Avocado Toast with Poached Egg",
        kcal: 410,
        protein: 15,
        carbs: 35,
        fat: 24,
        tags: ["vege"],
        recipe: "Dvije šnite integralnog tosta, pola gnječenog avokada, limunov sok i jedno poširano jaje.",
        recipe_en: "Two slices of whole grain toast, half a mashed avocado, lemon juice and one poached egg."
    },
    {
        name: "Grčki jogurt s medom i orasima",
        name_en: "Greek Yogurt with Honey and Walnuts",
        kcal: 280,
        protein: 18,
        carbs: 25,
        fat: 12,
        tags: ["vege", "glutenFree"],
        recipe: "200g grčkog jogurta, žlica meda i šaka sjeckanih oraha.",
        recipe_en: "200g of Greek yogurt, a tablespoon of honey and a handful of chopped walnuts."
    },
    {
        name: "Smoothie od banane i kikiriki maslaca",
        name_en: "Banana and Peanut Butter Smoothie",
        kcal: 450,
        protein: 15,
        carbs: 60,
        fat: 18,
        tags: ["vege", "vegan"],
        recipe: "Banana, biljno mlijeko, puna žlica maslaca od kikirikija i malo cimeta.",
        recipe_en: "Banana, plant milk, a full tablespoon of peanut butter and a little cinnamon."
    },

    // --- LUNCH / DINNER (Ručak i Večera) ---
    {
        name: "Pileća prsa sa slatkim krumpirom",
        name_en: "Chicken Breast with Sweet Potato",
        kcal: 480,
        protein: 45,
        carbs: 50,
        fat: 10,
        tags: ["meat", "glutenFree"],
        recipe: "200g pečenih pilećih prsa sa začinima, uz pečeni slatki krumpir i puno miješane salate.",
        recipe_en: "200g of roasted chicken breast with spices, served with roasted sweet potato and plenty of mixed salad."
    },
    {
        name: "Tuna salata s grahom",
        name_en: "Tuna Salad with Beans",
        kcal: 380,
        protein: 35,
        carbs: 30,
        fat: 12,
        tags: ["meat", "glutenFree"],
        recipe: "Konzerva tune u salamuri (cijeđena), pol konzerve crvenog graha, crveni luk, kukuruz, maslinovo ulje i ocat.",
        recipe_en: "A can of tuna in brine (drained), half a can of red beans, red onion, corn, olive oil and vinegar."
    },
    {
        name: "Losos na žaru s brokulom",
        name_en: "Grilled Salmon with Broccoli",
        kcal: 520,
        protein: 35,
        carbs: 10,
        fat: 35,
        tags: ["meat", "glutenFree"],
        recipe: "Srednji odrezak lososa pečen na limunu uz kuhanu brokulu prelivenu maslinovim uljem.",
        recipe_en: "Medium salmon steak grilled with lemon, served with boiled broccoli drizzled with olive oil."
    },
    {
        name: "Tofu tjestenina u umaku od rajčice",
        name_en: "Tofu Pasta in Tomato Sauce",
        kcal: 420,
        protein: 20,
        carbs: 65,
        fat: 10,
        tags: ["vege", "vegan"],
        recipe: "Integralna tjestenina s umakom od pasirane rajčice, češnjakom, bosiljkom i prženim kockicama dimljenog tofua.",
        recipe_en: "Whole grain pasta with pureed tomato sauce, garlic, basil and fried smoked tofu cubes."
    },
    {
        name: "Grah varivo (posno)",
        name_en: "Bean Stew (Meatless)",
        kcal: 350,
        protein: 18,
        carbs: 55,
        fat: 5,
        tags: ["vege", "vegan", "glutenFree"],
        recipe: "Klasično varivo od graha s mrkvom i lukom, bez zaprške i mesa. Gustoća od gnječenog graha.",
        recipe_en: "Classic bean stew with carrots and onions, without roux or meat. Thickness from mashed beans."
    },
    {
        name: "Njoki od cvjetače sa sirom",
        name_en: "Cauliflower Gnocchi with Cheese",
        kcal: 390,
        protein: 18,
        carbs: 35,
        fat: 20,
        tags: ["vege", "glutenFree"],
        recipe: "Kupovni njoki od cvjetače pečeni s mozzarellom i začinima.",
        recipe_en: "Store-bought cauliflower gnocchi baked with mozzarella and spices."
    },
    {
        name: "Juneći odrezak s pečenim povrćem",
        name_en: "Beef Steak with Roasted Vegetables",
        kcal: 600,
        protein: 45,
        carbs: 20,
        fat: 38,
        tags: ["meat", "glutenFree"],
        recipe: "Ramstek (200g) pečen na naglo uz tikvice, paprike i šampinjone sa žara.",
        recipe_en: "Rump steak (200g) seared with grilled zucchini, peppers and mushrooms."
    },
    {
        name: "Rižoto s gljivama",
        name_en: "Mushroom Risotto",
        kcal: 450,
        protein: 10,
        carbs: 70,
        fat: 15,
        tags: ["vege", "glutenFree"],
        recipe: "Arborio riža kuhana s povrtnim temeljcem, puno šampinjona/vrganja i parmezanom.",
        recipe_en: "Arborio rice cooked with vegetable stock, plenty of mushrooms and parmesan."
    },
    {
        name: "Sashimi ili lagani Sushi meni",
        name_en: "Sashimi or Light Sushi Menu",
        kcal: 350,
        protein: 25,
        carbs: 50,
        fat: 8,
        tags: ["meat"],
        recipe: "Nekoliko komada nigirija i sashimija (sirova riba). Odličan izvor proteina i zdravih masti.",
        recipe_en: "Several pieces of nigiri and sashimi (raw fish). Excellent source of proteins and healthy fats."
    },
    {
        name: "Bistra riblja juha",
        name_en: "Clear Fish Soup",
        kcal: 150,
        protein: 15,
        carbs: 10,
        fat: 5,
        tags: ["meat", "glutenFree"],
        recipe: "Tanjur tople riblje juhe s komadićima bijele ribe i malo riže. Lagana i hranjiva večera.",
        recipe_en: "A bowl of warm fish soup with pieces of white fish and some rice. Light and nutritious dinner."
    },

    // --- SNACKS (Međuobroci) ---
    {
        name: "Svježi zrnati sir s rajčicom",
        name_en: "Cottage Cheese with Tomato",
        kcal: 200,
        protein: 25,
        carbs: 8,
        fat: 6,
        tags: ["vege", "glutenFree"],
        recipe: "200g posnog sira pomiješano s narezanom rajčicom, vlascem i malo soli.",
        recipe_en: "200g of cottage cheese mixed with sliced tomatoes, chives and a little salt."
    },
    {
        name: "Jabuka i bademi",
        name_en: "Apple and Almonds",
        kcal: 220,
        protein: 6,
        carbs: 25,
        fat: 14,
        tags: ["vege", "vegan", "glutenFree"],
        recipe: "Jedna svježa jabuka i mala šaka (cca 20g) sirovih badema.",
        recipe_en: "One fresh apple and a small handful (approx. 20g) of raw almonds."
    },
    {
        name: "Skyr jogurt",
        name_en: "Skyr Yogurt",
        kcal: 120,
        protein: 20,
        carbs: 8,
        fat: 0,
        tags: ["vege", "glutenFree"],
        recipe: "1 čašica (200g) islandskog tipa jogurta. Visokoprotein, lak za ponijeti.",
        recipe_en: "1 cup (200g) of Icelandic-style yogurt. High protein, easy to carry."
    },
    {
        name: "Whey shake",
        name_en: "Whey shake",
        kcal: 120,
        protein: 25,
        carbs: 3,
        fat: 2,
        tags: ["vege", "glutenFree"],
        recipe: "Mjericu whey proteina pomiješana isključivo s vodom za brzi unos nakon treninga.",
        recipe_en: "A scoop of whey protein mixed exclusively with water for a quick post-workout intake."
    },
    {
        name: "Crna čokolada (2 reda)",
        name_en: "Dark Chocolate (2 rows)",
        kcal: 240,
        protein: 3,
        carbs: 18,
        fat: 16,
        tags: ["vege", "vegan", "glutenFree"],
        recipe: "Maksimalno 40g (dva reda) tamne čokolade s preko 75% kakaa.",
        recipe_en: "Maximum 40g (two rows) of dark chocolate with over 75% cocoa."
    }
];
