const extendedFoodDB = [
    // === GOTOVA JELA / TRADICIONALNO ===
    {
        name: "Sarma",
        keywords: ["sarma", "sarme", "sarmu"],
        kcalPer100g: 130,
        macrosPer100g: { carbs: 9, protein: 7, fat: 8 },
        standardUnits: { "kom": 150, "komad": 150, "sarme": 150, "porcija": 300 },
        note: "1 komad sarme (prosječan) ≈ 150g."
    },
    {
        name: "Punjena paprika",
        keywords: ["punjena paprika", "punjene paprike", "paprika punjena", "filovana paprika"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 8, protein: 6, fat: 6 },
        standardUnits: { "kom": 200, "komad": 200, "paprika": 200, "porcija": 400 },
        note: "1 srednje velika punjena paprika (s umakom) ≈ 200g."
    },
    {
        name: "Grah s kobasicom",
        keywords: ["grah s kobasicom", "pasulj sa kobasicom", "grah varivo", "vojnicki grah"],
        kcalPer100g: 145,
        macrosPer100g: { carbs: 12, protein: 8, fat: 7 },
        standardUnits: { "porcija": 400, "tanjur": 400, "zdjelica": 250 },
        note: "1 standardni duboki tanjur (porcija) variva ≈ 400g."
    },
    {
        name: "Gulaš (Goveđi / Svinjski)",
        keywords: ["gulas", "govedi gulas", "svinjski gulas", "cobanac"],
        kcalPer100g: 135,
        macrosPer100g: { carbs: 5, protein: 12, fat: 8 },
        standardUnits: { "porcija": 350, "tanjur": 350 },
        note: "Porcija u restoranu je obično oko 350g (bez priloga)."
    },
    {
        name: "Pašticada",
        keywords: ["pasticada", "dalmatinska pasticada"],
        kcalPer100g: 170,
        macrosPer100g: { carbs: 6, protein: 15, fat: 9 },
        standardUnits: { "porcija": 250, "komad": 250 },
        note: "Porcija mesa s gustom slatko-slanom umakom. Prilog (njoki) mjeri se odvojeno."
    },
    {
        name: "Pizza Margarita",
        keywords: ["pizza", "pica margarita", "margarita", "margherita", "snita pizze", "komad pizze"],
        kcalPer100g: 266,
        macrosPer100g: { carbs: 33, protein: 11, fat: 10 },
        standardUnits: { "komad": 120, "snita": 120, "cijela": 400, "velika": 500, "pizza": 400 },
        note: "1 standardna kriška/šnita ≈ 120g. Cijela normalna pizza ≈ 400g."
    },
    {
        name: "Pizza Miješana (Capricciosa)",
        keywords: ["pizza mijesana", "capricciosa", "kapricoza", "pica mijesana", "mjesana pizza"],
        kcalPer100g: 275,
        macrosPer100g: { carbs: 30, protein: 12, fat: 12 },
        standardUnits: { "komad": 130, "snita": 130, "cijela": 450, "velika": 550, "pizza": 450 },
        note: "1 kriška miješane pizze ≈ 130g. Cijela normalna pizza ≈ 450g."
    },
    {
        name: "Hamburger (Fast Food)",
        keywords: ["hamburger", "burger", "mcdonalds hamburger"],
        kcalPer100g: 295,
        macrosPer100g: { carbs: 24, protein: 17, fat: 14 },
        standardUnits: { "komad": 250, "burger": 250 },
        note: "Standardni pub/craft hamburger je oko 250g. (Za razliku od sitnih McDonald's burgera od 100g)."
    },
    {
        name: "Cheeseburger (Fast Food)",
        keywords: ["cheeseburger", "cisburger", "kisburger", "burger sa sirom"],
        kcalPer100g: 305,
        macrosPer100g: { carbs: 25, protein: 18, fat: 15 },
        standardUnits: { "komad": 280, "burger": 280 },
        note: "Prosječan craft cheeseburger."
    },
    {
        name: "Tortilja s piletinom",
        keywords: ["tortilja", "wrap", "tortilja piletina", "tortilja s piletinom"],
        kcalPer100g: 210,
        macrosPer100g: { carbs: 20, protein: 15, fat: 8 },
        standardUnits: { "komad": 300, "porcija": 300, "tortilja": 300 },
        note: "Standarna fast-food/restoranska punjena tortilja = cca 300g."
    },
    {
        name: "Hot Dog",
        keywords: ["hot dog", "hotdog", "hrenovka u pecivu"],
        kcalPer100g: 290,
        macrosPer100g: { carbs: 28, protein: 10, fat: 15 },
        standardUnits: { "komad": 150, "hot dog": 150 },
        note: "Standardni ulični hot dog s 1 hrenovkom i pecivom."
    },
    {
        name: "Kebab (s piletinom)",
        keywords: ["kebab", "pileci kebab", "kebab u lepinji", "doner kebab"],
        kcalPer100g: 215,
        macrosPer100g: { carbs: 22, protein: 12, fat: 9 },
        standardUnits: { "porcija": 350, "veliki": 450, "mali": 250, "kebab": 350 },
        note: "Prosječan kebab u tortilji ili lepinji teži oko 350g."
    },
    {
        name: "Sir i vrhnje",
        keywords: ["sir i vrhnje", "svjezi sir", "posni sir s vrhnjem"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 4, protein: 12, fat: 5 },
        standardUnits: { "porcija": 200, "tanjur": 200, "zdjelica": 200 },
        note: "Izmiješani svježi kravlji sir s malo vrhnja. Za punomasno vrhnje dodaj kalorije."
    },

    {
        name: "Noodles (Azijski rezanci, kuhani)",
        keywords: ["noodles", "nudle", "azijski rezanci", "rižini rezanci"],
        kcalPer100g: 138,
        macrosPer100g: { carbs: 25, protein: 4, fat: 2 },
        standardUnits: { "porcija": 200, "tanjur": 200 },
        note: "Odnosi se na čiste kuhane noodlese bez puno umaka i mesa."
    },
    {
        name: "Wok / Noodles s povrćem",
        keywords: ["wok povrcem", "noodles s povrcem", "nudle povrce", "povrtni wok"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 16, protein: 3, fat: 4 },
        standardUnits: { "porcija": 350, "tanjur": 350 },
        note: "Manje kalorija na 100g od čistih rezanaca jer povrće razrjeđuje masu."
    },
    {
        name: "Wok / Noodles s piletinom",
        keywords: ["wok piletinom", "noodles s piletinom", "nudle piletina", "wok piletina"],
        kcalPer100g: 140,
        macrosPer100g: { carbs: 15, protein: 9, fat: 5 },
        standardUnits: { "porcija": 400, "tanjur": 400 },
        note: "Standardna restoranska wok porcija teži oko 400g."
    },
    {
        name: "Wok / Noodles sa svinjetinom",
        keywords: ["wok svinjetina", "noodles sa svinjetinom", "nudle svinjetina"],
        kcalPer100g: 160,
        macrosPer100g: { carbs: 15, protein: 10, fat: 7 },
        standardUnits: { "porcija": 400, "tanjur": 400 },
        note: "Svinjetina donosi vise masti nego pileci wok."
    },
    {
        name: "Wok / Noodles s kozicama",
        keywords: ["wok kozice", "noodles s kozicama", "nudle kozice", "pad thai kozice"],
        kcalPer100g: 125,
        macrosPer100g: { carbs: 16, protein: 8, fat: 3 },
        standardUnits: { "porcija": 400, "tanjur": 400 },
        note: "Lagana, proteinska verzija azijskih rezanaca."
    },

    // === JAPANSKA & AZIJSKA KUHINJA ===
    {
        name: "Sushi (Maki roll, losos)",
        keywords: ["sushi", "maki", "maki roll", "sushi losos", "sushi rolica", "sushi sa lososom"],
        kcalPer100g: 140,
        macrosPer100g: { carbs: 28, protein: 5, fat: 1 },
        standardUnits: { "komad": 25, "porcija": 150 },
        note: "Odnosi se na klasičnu Maki rolicu s lososom. Komad (1 kolutić) ≈ 25g."
    },
    {
        name: "Sushi (Nigiri, losos)",
        keywords: ["nigiri", "sushi nigiri", "nigiri losos", "sushi komad"],
        kcalPer100g: 155,
        macrosPer100g: { carbs: 20, protein: 8, fat: 4 },
        standardUnits: { "komad": 30, "porcija": 180 },
        note: "Riža s komadom sirove ribe na vrhu. 1 komad ≈ 30g."
    },
    {
        name: "Gyoza (punjena svinjetinom, pržena)",
        keywords: ["gyoza", "gioza", "japanski valjusci", "dumplings", "pržena gyoza", "gyoze"],
        kcalPer100g: 220,
        macrosPer100g: { carbs: 24, protein: 8, fat: 10 },
        standardUnits: { "komad": 25, "porcija": 125 },
        note: "Jedan komad japanskog dumplinga ≈ 25g. Porcija 5 komada ≈ 125g."
    },
    {
        name: "Ramen (mesna juha s rezancima i jajem)",
        keywords: ["ramen", "japanska juha", "juha s rezancima", "tonkotsu", "miso ramen"],
        kcalPer100g: 95,
        macrosPer100g: { carbs: 10, protein: 4, fat: 4 },
        standardUnits: { "tanjur": 500, "zdjela": 500 },
        note: "Odnosi se na čitavo jelo (tekućina + rezanci + meso + jaje). Velika zdjela ≈ 500-600g."
    },
    {
        name: "Wok s piletinom i povrćem",
        keywords: ["wok", "vok", "wok piletina", "kineski rezanci", "azijski wok", "vok piletina"],
        kcalPer100g: 135,
        macrosPer100g: { carbs: 16, protein: 8, fat: 4 },
        standardUnits: { "porcija": 350, "tanjur": 350 },
        note: "Standardna azijska wok mješavina s rezancima. Porcija ≈ 350-400g."
    },
    {
        name: "Spring rolice (pržene)",
        keywords: ["spring rolice", "proljetne rolice", "kineske rolice", "spring rolls"],
        kcalPer100g: 250,
        macrosPer100g: { carbs: 32, protein: 4, fat: 11 },
        standardUnits: { "komad": 40, "mala porcija": 120 },
        note: "Klasična pržena kineska proljetna rolica. 1 komad ≈ 40g."
    },
    {
        name: "Edamame (Kuhana soja)",
        keywords: ["edamame", "soja", "japanska soja"],
        kcalPer100g: 121,
        macrosPer100g: { carbs: 9, protein: 11, fat: 5 },
        standardUnits: { "porcija": 100, "šalica": 150 },
        note: "Popularno japansko predjelo, izvrstan izvor proteina."
    },

    // === JUHE ===
    {
        name: "Goveđa juha (bistra)",
        keywords: ["goveda juha", "bistra juha", "mesna juha", "juha od mesa"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 1, protein: 1, fat: 1 },
        standardUnits: { "tanjur": 250, "porcija": 250 },
        note: "Odnosi se na samu tekućinu (bez previše rezanaca i mesa)."
    },
    {
        name: "Pileća juha (bistra)",
        keywords: ["pileca juha", "pilece juhe", "domaca pileca juha"],
        kcalPer100g: 20,
        macrosPer100g: { carbs: 2, protein: 1.5, fat: 1 },
        standardUnits: { "tanjur": 250, "porcija": 250 },
        note: "Standardni tanjur ≈ 250g tekućine s malo rezanaca."
    },
    {
        name: "Krem juha od gljiva / rajčice",
        keywords: ["krem juha", "juha od gljiva", "krem juha od rajcice", "paradajz juha"],
        kcalPer100g: 45,
        macrosPer100g: { carbs: 5, protein: 1.5, fat: 2 },
        standardUnits: { "tanjur": 250, "porcija": 250 },
        note: "Zbog vrhnja za kuhanje/zapřske, kaloričnija od bistre juhe."
    },

    // === DODATNO POVRĆE ===
    {
        name: "Paprika (Svježa)",
        keywords: ["paprika", "svjeza paprika", "crvena paprika", "zelena paprika", "zuta paprika"],
        kcalPer100g: 30,
        macrosPer100g: { carbs: 6, protein: 1, fat: 0.2 },
        standardUnits: { "komad": 150, "pola": 75 },
        note: "1 komad srednje veličine = 150g jestivog mesa."
    },
    {
        name: "Krastavac (Svježi)",
        keywords: ["krastavac", "krastavci", "salata od krastavaca"],
        kcalPer100g: 15,
        macrosPer100g: { carbs: 3.6, protein: 0.6, fat: 0.1 },
        standardUnits: { "komad": 250, "pola": 125, "porcija": 150 },
        note: "Veoma niskokalorično."
    },
    {
        name: "Luk crveni / bijeli (Češnjak)",
        keywords: ["luk", "kapula", "crveni luk", "cesnjak", "bijeli luk"],
        kcalPer100g: 40,
        macrosPer100g: { carbs: 9, protein: 1.1, fat: 0.1 },
        standardUnits: { "glavica": 100, "reznac": 5 },
        note: "Prosječna glavica crvenog luka ≈ 100g."
    },
    {
        name: "Mrkva (Svježa ili kuhana)",
        keywords: ["mrkva", "mrkve"],
        kcalPer100g: 41,
        macrosPer100g: { carbs: 10, protein: 0.9, fat: 0.2 },
        standardUnits: { "komad": 60, "kom": 60 },
        note: "1 srednja mrkva ≈ 60g."
    },
    {
        name: "Špinat / Blitva (Kuhano, bez vrhnja)",
        keywords: ["spinat", "blitva", "blitva na leso"],
        kcalPer100g: 23,
        macrosPer100g: { carbs: 3.6, protein: 2.9, fat: 0.4 },
        standardUnits: { "porcija": 150, "zlica": 30 },
        note: "Odnosi se na obično kuhano. Sa krumpirom računaj krumpir zasebno."
    },
    {
        name: "Kupus salata (bez ulja)",
        keywords: ["salata od zelja", "kupus salata"],
        kcalPer100g: 25,
        macrosPer100g: { carbs: 6, protein: 1.3, fat: 0.1 },
        standardUnits: { "zdjelica": 150, "porcija": 150 },
        note: "Dodano ulje povećava kalorije (1 žlica = +130 Kcal)."
    },

    // === RIBA I MORSKI PLODOVI ===
    {
        name: "Bijela riba (Orada, Brancin - Žar / Lešo)",
        keywords: ["bijela riba", "orada", "brancin", "riba sa zara", "kuhana riba", "leso riba"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 0, protein: 20, fat: 3 },
        standardUnits: { "porcija": 300, "komad": 300 },
        note: "Odnosi se na cijelu porciju ribe (meso + kosti). Čisto meso teži manje, ali ovo je prosjek s roštilja."
    },
    {
        name: "Plava riba (Skuša, srdela - Žar)",
        keywords: ["plava riba", "skusa", "srdela", "srdela zar", "srdele na gradele", "skusa sa zara"],
        kcalPer100g: 205,
        macrosPer100g: { carbs: 0, protein: 20, fat: 14 },
        standardUnits: { "porcija": 250, "komad": 250, "srdele": 250 },
        note: "Izvrsna plava riba puna zdravih masti (Omega 3). Pržene u ulju su puno kaloričnije!"
    },
    {
        name: "Plava riba (Srdela, pržena u ulju)",
        keywords: ["srdela przena", "przene srdele", "fritirane srdele", "frigane srdele"],
        kcalPer100g: 300,
        macrosPer100g: { carbs: 8, protein: 18, fat: 22 },
        standardUnits: { "porcija": 250, "srdele": 250 },
        note: "Prženje brašnom i uljem značajno diže kalorije u odnosu na roštilj."
    },
    {
        name: "Lignje (Žar)",
        keywords: ["lignje", "lignje na zaru", "lignje zar", "porcija liganja"],
        kcalPer100g: 90,
        macrosPer100g: { carbs: 3, protein: 16, fat: 1.5 },
        standardUnits: { "porcija": 250, "tanjur": 250 },
        note: "Niskokaloričan obrok krcat proteinima."
    },
    {
        name: "Lignje (Pržene)",
        keywords: ["przene lignje", "lignje przene", "frigane lignje"],
        kcalPer100g: 220,
        macrosPer100g: { carbs: 15, protein: 15, fat: 11 },
        standardUnits: { "porcija": 250, "tanjur": 250 },
        note: "Paniranje i ulje utrostruče kalorije standardne porcije liganja."
    },
    {
        name: "Dagnje / Školjke (Buzara)",
        keywords: ["dagnje", "skoljke", "skoljke buzara", "musule", "buzara od skoljki", "buzara"],
        kcalPer100g: 80,
        macrosPer100g: { carbs: 4, protein: 12, fat: 2 },
        standardUnits: { "porcija": 500, "tanjur": 500, "kila": 1000 },
        note: "Tanjur od 500g su većinom ljušture! Samo jelo ima jako malo kalorija ako ne jedeš kruh s točem."
    },
    {
        name: "Kozice / Škampi (Žar ili Buzara)",
        keywords: ["kozice", "skampi", "skampi buzara", "kozice sa zara", "gamberi"],
        kcalPer100g: 105,
        macrosPer100g: { carbs: 1, protein: 20, fat: 2 },
        standardUnits: { "porcija": 300, "tanjur": 300 },
        note: "Vrhunski, vrlo čisti protein bez puno masnoće."
    },

    // === DODATNO VOĆE ===
    {
        name: "Naranča",
        keywords: ["naranca", "narance"],
        kcalPer100g: 47,
        macrosPer100g: { carbs: 12, protein: 0.9, fat: 0.1 },
        standardUnits: { "komad": 130, "kom": 130 },
        note: "1 normalna naranča (jestivi dio) = 130g."
    },
    {
        name: "Mandarina",
        keywords: ["mandarina", "mandarine"],
        kcalPer100g: 53,
        macrosPer100g: { carbs: 13, protein: 0.8, fat: 0.3 },
        standardUnits: { "komad": 80, "kom": 80 },
        note: "Mandarina je teška oko 80g."
    },
    {
        name: "Breskva / Nektarina",
        keywords: ["breskva", "nektarina", "breskve"],
        kcalPer100g: 39,
        macrosPer100g: { carbs: 10, protein: 0.9, fat: 0.3 },
        standardUnits: { "komad": 130, "kom": 130 },
        note: "Srednja breskva = 130g jestivog dijela."
    },
    {
        name: "Jagode",
        keywords: ["jagoda", "jagode"],
        kcalPer100g: 32,
        macrosPer100g: { carbs: 8, protein: 0.7, fat: 0.3 },
        standardUnits: { "salica": 150, "porcija": 150, "komad": 15 },
        note: "Mjereno na manju zdjelicu (150g)."
    },

    // === ORAŠASTI PLODOVI I SJEMENKE ===
    {
        name: "Orasi (jezgra)",
        keywords: ["orasi", "orah", "jezgra oraha"],
        kcalPer100g: 654,
        macrosPer100g: { carbs: 14, protein: 15, fat: 65 },
        standardUnits: { "saka": 30, "zlica": 15 },
        note: "Jako kalorično - zdrave masti. 1 obična šaka = cca 30g."
    },
    {
        name: "Bademi",
        keywords: ["badem", "bademi", "bajame"],
        kcalPer100g: 579,
        macrosPer100g: { carbs: 22, protein: 21, fat: 50 },
        standardUnits: { "saka": 30, "zlica": 15 },
        note: "1 šaka = cca 30g."
    },
    {
        name: "Kikiriki (prženi, slani)",
        keywords: ["kikiriki", "slani kikiriki"],
        kcalPer100g: 585,
        macrosPer100g: { carbs: 22, protein: 24, fat: 49 },
        standardUnits: { "saka": 30, "paketic": 100 },
        note: "Šaka je 30g. Mali paketić u kafiću = 50g."
    },
    {
        name: "Lješnjaci",
        keywords: ["ljesnjak", "ljesnjaci"],
        kcalPer100g: 628,
        macrosPer100g: { carbs: 17, protein: 15, fat: 61 },
        standardUnits: { "saka": 30, "zlica": 15 },
        note: "1 šaka = cca 30g."
    },

    // === RIBA I MORSKI PLODOVI ===
    {
        name: "Tuna (iz konzerve, ocijeđena)",
        keywords: ["tuna", "tuna konzerva", "tunjevina", "konzerva tune"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 0, protein: 25, fat: 1 },
        standardUnits: { "konzerva": 130, "mala konzerva": 80 },
        note: "Gleda se čista ocijeđena masa manje konzerve Rio Mare i sl. (salamura)."
    },
    {
        name: "Lignje (Pržene / Kolutići)",
        keywords: ["lignje", "przene lignje", "kolutici lignji", "frigane lignje"],
        kcalPer100g: 220,
        macrosPer100g: { carbs: 12, protein: 16, fat: 11 },
        standardUnits: { "porcija": 250 },
        note: "Standardna ugostiteljska porcija je oko 250g-300g (s puno ulja)."
    },
    {
        name: "Lignje (na žaru)",
        keywords: ["lignje na zaru", "lignje na gradele"],
        kcalPer100g: 140,
        macrosPer100g: { carbs: 3, protein: 21, fat: 4 },
        standardUnits: { "porcija": 250 },
        note: "Puno zdravija verzija, manje lipida od friganih."
    },
    {
        name: "Oslić (Panirani / Prženi)",
        keywords: ["oslic", "pohani oslic", "oslic fileti"],
        kcalPer100g: 190,
        macrosPer100g: { carbs: 10, protein: 14, fat: 10 },
        standardUnits: { "komad": 100, "filet": 100, "porcija": 250 },
        note: "1 prženi filet oslića iznosi cca 100g."
    },
    {
        name: "Gof / Brancin / Orada (Pečena bijela riba)",
        keywords: ["orada", "brancin", "gof", "riba s gradela", "riba na zaru"],
        kcalPer100g: 135,
        macrosPer100g: { carbs: 0, protein: 23, fat: 5 },
        standardUnits: { "komad": 300, "riba": 300, "porcija": 300 },
        note: "Računato samo jestivo meso (iz jedne ribe porcijaša dobije se oko 200-250g krtog mesa)."
    },

    // === DODACI, NAMAZI I UMAZI ===
    {
        name: "Ketchup (Kečap)",
        keywords: ["ketchup", "kecap"],
        kcalPer100g: 110,
        macrosPer100g: { carbs: 26, protein: 1, fat: 0 },
        standardUnits: { "zlica": 15, "porcija": 30 },
        note: "Standardna jušna žlica ketchupa = 15g (uglavnom šećer)."
    },
    {
        name: "Majoneza",
        keywords: ["majoneza", "majoneze"],
        kcalPer100g: 680,
        macrosPer100g: { carbs: 1, protein: 1, fat: 75 },
        standardUnits: { "zlica": 15, "porcija": 30 },
        note: "Izrazito kalorično! 1 velika žlica donosi preko 100 Kcal."
    },
    {
        name: "Pašteta (Jetrena)",
        keywords: ["pasteta", "jetrena pasteta", "kokosja pasteta", "gavrilovic pasteta"],
        kcalPer100g: 315,
        macrosPer100g: { carbs: 2.5, protein: 10, fat: 30 },
        standardUnits: { "snita": 20, "zlica": 20, "konzerva": 50, "velika konzerva": 100 },
        note: "Standardna mala doza / mazanje jedne šnite kruha = 20g."
    },
    {
        name: "Mliječni namaz (ABC, Philadelphia)",
        keywords: ["abc sir", "mlijecni namaz", "sirni namaz", "philadelphia"],
        kcalPer100g: 235,
        macrosPer100g: { carbs: 3.5, protein: 6, fat: 23 },
        standardUnits: { "snita": 20, "zlica": 20, "namaz": 20 },
        note: "Klasično mazanje jedne šnite kruha iznosi cca 20-25g."
    },
    {
        name: "Ajvar",
        keywords: ["ajvar", "ajvara"],
        kcalPer100g: 95,
        macrosPer100g: { carbs: 10, protein: 2, fat: 5 },
        standardUnits: { "zlica": 20, "porcija": 40 },
        note: "1 jušna žlica punjena ajvarom teži cca 20g."
    },
    {
        name: "Marmelada / Džem / Pekmez",
        keywords: ["marmelada", "dzem", "pekmez", "marmeladu"],
        kcalPer100g: 278,
        macrosPer100g: { carbs: 68, protein: 0.5, fat: 0.1 },
        standardUnits: { "zlica": 20, "zlicica": 10 },
        note: "1 jušna žlica marmelade (puna šećera) = 20g."
    },
    {
        name: "Nutella / Eurokrem",
        keywords: ["nutella", "nutela", "eurokrem", "linolada"],
        kcalPer100g: 539,
        macrosPer100g: { carbs: 57, protein: 6.3, fat: 30.9 },
        standardUnits: { "zlica": 25, "zlicica": 10 },
        note: "1 prepuna žlica Nutelle = preko 130 Kcal."
    },

    // === SLATKIŠI ===
    {
        name: "Palačinka (prazna)",
        keywords: ["palacinka", "palacinke", "palacinku"],
        kcalPer100g: 227,
        macrosPer100g: { carbs: 28, protein: 6, fat: 10 },
        standardUnits: { "kom": 60, "komad": 60 },
        note: "Težina ovisi o punjenju, no samo 1 ispečeno tijesto teži oko 60g."
    },
    {
        name: "Palačinka s čokoladom / Nutellom",
        keywords: ["palacinka s nutellom", "palacinka s cokoladom", "cokoladna palacinka"],
        kcalPer100g: 310,
        macrosPer100g: { carbs: 39, protein: 6, fat: 14 },
        standardUnits: { "kom": 100, "komad": 100 },
        note: "60g tijesto + 40g namaza = velika bomba od cca 310 Kcal po jednom komadu!"
    },
    {
        name: "Njoki (kuhani)",
        keywords: ["njoki", "kuhani njoki", "porcija njoka"],
        kcalPer100g: 133,
        macrosPer100g: { carbs: 30, protein: 3.5, fat: 0.5 },
        standardUnits: { "porcija": 250 },
        note: "Odnosi se na kuhane njoke. Standardni restoran daje 200-250g po porciji."
    },
    {
        name: "Keksi Domaćica",
        keywords: ["domacica", "keksi domacica"],
        kcalPer100g: 483,
        macrosPer100g: { carbs: 58, protein: 6.4, fat: 24 },
        standardUnits: { "keks": 12, "komad": 12, "kom": 12, "porcija": 50 },
        note: "1 keks teži oko 12g."
    },
    {
        name: "Keksi Plazma",
        keywords: ["plazma keksi", "slatki keksi", "petit beurre"],
        kcalPer100g: 440,
        macrosPer100g: { carbs: 70, protein: 11.9, fat: 12 },
        standardUnits: { "keks": 8, "komad": 8, "kom": 8, "porcija": 50 },
        note: "Vrlo suhi, lagani ali kalorični. 1 Plazma = cca 8g."
    },
    {
        name: "Čips (Slani) / Smoki",
        keywords: ["cips", "smoki", "slani cips", "vrecica cipsa", "flips"],
        kcalPer100g: 536,
        macrosPer100g: { carbs: 53, protein: 6, fat: 35 },
        standardUnits: { "vrecica": 150, "mala vrecica": 50, "saka": 30 },
        note: "Izrazito puno masti. Velika vrećica čipsa je obično 150g."
    },

    // === SUPLEMENTI ===
    {
        name: "Whey Protein (Mjerica sa vodom)",
        keywords: ["whey", "proteini", "whey protein", "mjerice proteina", "mjerica wheya"],
        kcalPer100g: 380, // Oko 380 kcal na 100g praha
        macrosPer100g: { carbs: 6, protein: 78, fat: 5 },
        standardUnits: { "mjerica": 30, "merica": 30, "porcija": 30 },
        note: "Jedna mjerica (scoop) praha je obično 30g. Ako piješ s mlijekom, dodaj mlijeko odvojeno."
    },
    {
        name: "Proteinska pločica (Protein Bar)",
        keywords: ["protein bar", "proteinska plocica", "proteinska cokoladica"],
        kcalPer100g: 360,
        macrosPer100g: { carbs: 32, protein: 32, fat: 12 },
        standardUnits: { "plocica": 55, "komad": 55, "kom": 55 },
        note: "Prosječna proteinska pločica teži od 50 do 60 grama."
    },
    // === DESERTI I KOLAČI ===
    {
        name: "Štrudla od jabuke (Pita)",
        keywords: ["strudla od jabuke", "pita od jabuke", "savijaca s jabukama", "pita jabuka"],
        kcalPer100g: 220,
        macrosPer100g: { carbs: 32, protein: 3, fat: 9 },
        standardUnits: { "komad": 120, "snita": 120, "porcija": 150 },
        note: "Manji pekarski komad ≈ 120g. Domaća debela šnita ≈ 150g."
    },
    {
        name: "Štrudla od sira (Pita, Savijača)",
        keywords: ["strudla od sira", "pita od sira", "savijaca sa sirom", "pita sir", "burek sir slatki"],
        kcalPer100g: 270,
        macrosPer100g: { carbs: 25, protein: 8, fat: 15 },
        standardUnits: { "komad": 120, "snita": 120, "porcija": 150 },
        note: "Malo više masti i proteina u odnosu na jabuku."
    },
    {
        name: "Mađarica",
        keywords: ["madarica", "kolac madarica", "kocka madarice"],
        kcalPer100g: 410,
        macrosPer100g: { carbs: 55, protein: 5, fat: 18 },
        standardUnits: { "komad": 60, "kocka": 60, "snita": 60 },
        note: "Koncentriran i kaloričan kolač. 1 klasična kocka ≈ 60g."
    },
    {
        name: "Cheesecake (Torta od sira)",
        keywords: ["cheesecake", "torta od sira", "cizkejk", "ciz kejk", "torta sir"],
        kcalPer100g: 322,
        macrosPer100g: { carbs: 25, protein: 6, fat: 22 },
        standardUnits: { "komad": 150, "snita": 150, "porcija": 150 },
        note: "1 srednja šnita u kafiću ili restoranu ≈ 150g."
    },
    {
        name: "Palačinke (s nutellom / čokoladom)",
        keywords: ["palacinke", "palacinka", "palacinke nutella", "palacinka s cokoladom"],
        kcalPer100g: 300,
        macrosPer100g: { carbs: 40, protein: 6, fat: 12 },
        standardUnits: { "komad": 100, "kom": 100, "porcija": 200 },
        note: "1 namazana pečena palačinka namazana nutellom teži oko 100g (cca 300 kcal po komadu)."
    },

    // === GRICKALICE I ORAŠASTI PLODOVI ===
    {
        name: "Čips (Slani, Paprika)",
        keywords: ["cips", "cipsa", "chips", "frank", "lays"],
        kcalPer100g: 536,
        macrosPer100g: { carbs: 53, protein: 6, fat: 35 },
        standardUnits: { "vreca": 150, "vrecica": 50, "saka": 30, "zdjelica": 75 },
        note: "Vrlo kalorično. Manja vrećica = 50g, veća = 150g. Šaka = cca 30g."
    },
    {
        name: "Kikiriki (Prženi, Slani)",
        keywords: ["kikiriki", "kikirikija", "kikiriki slani"],
        kcalPer100g: 600,
        macrosPer100g: { carbs: 16, protein: 25, fat: 50 },
        standardUnits: { "saka": 30, "vrecica": 100, "zdjelica": 100 },
        note: "Bombe kalorija i masnoće, ali s puno proteina. 1 šaka ≈ 30g."
    },
    {
        name: "Smoki (Flips sa kikirikijem)",
        keywords: ["smoki", "flips", "kikiriki flips", "stark smoki", "bobi"],
        kcalPer100g: 530,
        macrosPer100g: { carbs: 52, protein: 12, fat: 30 },
        standardUnits: { "vreca": 150, "mali smoki": 50, "saka": 20 },
        note: "Cca 50g je malo pakiranje."
    },

];

// Ovdje integriram proširenu listu u već postojeći foodDB iz prve iteracije.
extendedFoodDB.forEach(item => {
    // Ako već nije u bazi pod istim imenom (da se ne duplira ako dodamo dvaput)
    if (!localFoodDB.some(f => f.name === item.name)) {
        localFoodDB.push(item);
    }
});
