const exerciseDB = [
    // === MANUALNI UNOS ===
    {
        name: "Pametni Sat (Ručni unos)",
        met: 0,
        description: "Očitaj i prepiši točan broj potrošenih kalorija sa svog Garmin, Apple ili Huawei zaslona."
    },
    // === KARDIO I TRČANJE ===
    {
        name: "Hodanje (Lagano, 3 km/h)",
        met: 2.8,
        description: "Lagana opuštena šetnja po ravnom terenu."
    },
    {
        name: "Hodanje (Brzi tempo, 5 km/h)",
        met: 4.3,
        description: "Žustro hodanje koje podiže puls znojenjem."
    },
    {
        name: "Planinarenje (Uzbrdo)",
        met: 7.0,
        description: "Hodanje po neravnom terenu uzbrdo, s manjim ruksakom."
    },
    {
        name: "Jogging (Lagano trčanje, 7 km/h)",
        met: 7.0,
        description: "Lagano trčkaranje, moguće vođenje razgovora."
    },
    {
        name: "Trčanje (Srednji tempo, 10 km/h)",
        met: 9.8,
        description: "Kontinuirano trčanje srednjeg intenziteta."
    },
    {
        name: "Biciklizam (Lagano, 10-15 km/h)",
        met: 4.0,
        description: "Vožnja bicikla po ravnom, opušten tempo."
    },
    {
        name: "Biciklizam (Srednje, 15-20 km/h)",
        met: 6.8,
        description: "Dnevna brza vožnja, blagi usponi."
    },
    {
        name: "Kućni bicikl (Srednji otpor)",
        met: 7.0,
        description: "Vožnja sobnog bicikla / Orbitrek."
    },

    // === TERETANA I FITNES ===
    {
        name: "Trening snage (Utezi, umjereno)",
        met: 3.5,
        description: "Standardno dizanje utega s odmorima između serija."
    },
    {
        name: "Trening snage (Intenzivno, Bodybuilding)",
        met: 6.0,
        description: "Teška dizanja, kratki odmori, superserije."
    },
    {
        name: "Složeni Bodyweight (Sklekovi, Zgibovi)",
        met: 8.0,
        description: "Vježbe s vlastitom težinom (Street workout) bez dugih pauza."
    },
    {
        name: "Kružni trening / HIIT",
        met: 8.0,
        description: "Vrlo visok intenzitet s minimalnim pauzama (Burpees, skokovi)."
    },
    {
        name: "Joga (Hatha joga)",
        met: 2.5,
        description: "Polagano istezanje i zadržavanje poza."
    },
    {
        name: "Pilates",
        met: 3.0,
        description: "Vježbe za core komponentu na prostirci."
    },

    // === SPORTOVI ===
    {
        name: "Nogomet (Rekreativno)",
        met: 7.0,
        description: "Mali nogomet srednjeg tempa s prijateljima."
    },
    {
        name: "Košarka (Igra na pola terena)",
        met: 6.0,
        description: "Basketaški tempo (3x3)."
    },
    {
        name: "Tenis (Pojedinačno)",
        met: 8.0,
        description: "Igranje tenisa 1 na 1 uz stalna kretanja."
    },
    {
        name: "Padel",
        met: 6.0,
        description: "Dinamičan sport sličan tenisu koji se igra u parovima na manjem terenu."
    },
    {
        name: "Badminton (Rekreativno)",
        met: 5.5,
        description: "Igranje badmintona na terminu ili vani na travi."
    },
    {
        name: "Veslanje (Ergometar, Umjereno)",
        met: 7.0,
        description: "Veslanje na spravi (ergometru) umjerenim tempom (oko 100-150 W)."
    },
    {
        name: "Plivanje (Slobodni stil, lagano)",
        met: 5.8,
        description: "Lagano plivanje kraul ili prsno tehnikom bez utrkivanja."
    },
    {
        name: "Plivanje (Intezivno)",
        met: 9.8,
        description: "Brzo plivanje dužina u bazenu s kratkim pauzama."
    },
    {
        name: "Boks / Udaranje u vreću",
        met: 5.5,
        description: "Kombinacije udaraca po vreći."
    },

    // === KUĆANSTVO I AKTIVNOSTI ===
    {
        name: "Čišćenje kuće (Intenzivno)",
        met: 3.3,
        description: "Usisavanje, brisanje podova, pranje prozora."
    },
    {
        name: "Rad u vrtu (Kopanje, sađenje)",
        met: 4.0,
        description: "Fizički rad na zemljištu, plijevljenje korova."
    },
    {
        name: "Fizički rad (Nošenje tereta, bauštela)",
        met: 8.0,
        description: "Podizanje i nošenje teških materijala na gradilištu."
    },
    {
        name: "Kućni majstor (Popravci po kući)",
        met: 3.5,
        description: "Bušenje, krečenje pofarbanje zidova, preslagivanje soba i nošenje kutija."
    }
];
