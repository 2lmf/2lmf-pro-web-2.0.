
// Baza cijena materijala (u EUR)
// Cijene su izra?ene sa PDV-om (MPC) kako bi se prikazivale korisniku
// SKU-ovi i Nazivi su uskla?eni sa master Excel tablicom korisnika

const prices = {
    // --- TERMOIZOLACIJA (XPS) ---
    xps: {
        2: { price: 2.7337500000000006, sku: "2001", name: "Ravatherm XPS, 2cm" },
        3: { price: 3.7968750000000004, sku: "2002", name: "Ravatherm XPS: 3cm" },
        4: { price: 5.0625, sku: "2003", name: "Ravatherm XPS: 4cm" },
        5: { price: 6.328125, sku: "2004", name: "Ravatherm XPS: 5cm" },
        6: { price: 7.593750000000001, sku: "2005", name: "Ravatherm XPS: 6cm" },
        8: { price: 10.125, sku: "2006", name: "Ravatherm XPS: 8cm" },
        10: { price: 12.65625, sku: "2007", name: "Ravatherm XPS: 10cm" },
        12: { price: 15.187500000000002, sku: "2008", name: "Ravatherm XPS: 12cm" },
        15: { price: 20.503125, sku: "2009", name: "Ravatherm XPS: 15cm" }
    },

    // --- KAMENA VUNA ---
    wool_facade: {
        5: { price: 9.75, sku: "3006", name: "Kamena vuna, 5cm, fasadna" },
        8: { price: 11.375, sku: "3005", name: "Kamena vuna, 8cm, fasadna" },
        10: { price: 14.137500000000001, sku: "3001", name: "Kamena vuna, 10cm, fasadna" },
        12: { price: 16.965, sku: "3002", name: "Kamena vuna, 12cm, fasadna" },
        14: { price: 19.7925, sku: "3003", name: "Kamena vuna, 14cm, fasadna" },
        15: { price: 21.2875, sku: "3004", name: "Kamena vuna, 15cm, fasadna" }
    },

    // --- HIDROIZOLACIJA (Membrane & Bitumen) ---
    membranes: {
        tpo_15: { price: 9.01875, sku: "2113", name: "FLAG TPO EP/PR 1,5 mm, krovna folija (bijela)" },
        tpo_18: { price: 11.2125, sku: "2114", name: "FLAG TPO EP/PR 1,8 mm, krovna folija (bijela)" },
        tpo_20: { price: 12.675, sku: "2115", name: "FLAG TPO EP/PR 2,0 mm, krovna folija (bijela)" },
        pvc_temelji: { price: 6.3375, sku: "2111", name: "FLAG BSL (PVC) 1,5 mm, folija za temelje" },
        pvc_krov: { price: 8.9375, sku: "2112", name: "FLAG SR (PVC) 1,5 mm, krovna folija" },
        cepasta: { price: 1.54375, sku: "2123", name: "?EPASTA FOLIJA" },
        geotextile_200: { price: 0.8125, sku: "2124", name: "Geotekstil, 200g" },
        geotextile_300: { price: 0.9750000000000001, sku: "2125", name: "Geotekstil, 300g" }
    },

    bitumen: {
        diamond_p4: { price: 6.453125, sku: "2117", name: "RAVAPROOF Diamond P 4, SBS, Polyester, s posipom, sivi" },
        ruby_v4: { price: 4.675, sku: "2118", name: "RAVAPROOF Ruby V-4" },
        sapphire_g3: { price: 2.55, sku: "2119", name: "RAVAPROOF Sapphire G3" },
        sapphire_g4: { price: 3.4, sku: "2120", name: "RAVAPROOF Sapphire G4" },
        vapor_al: { price: 5.95, sku: "2121", name: "RAVAPROOF Vapor Al-35 (3,5mm) , SBS" }
    },

    // --- FASADE (ETICS) ---
    facade_etics: {
        glue_eps: { price: 0.36, sku: "4101", name: "LJEPILO ZA EPS 25 KG" },
        glue_armor: { price: 0.39, sku: "4109", name: "UNITERM 25 KG" },
        mesh: { price: 1.125, sku: "4104", name: "STAKLENA MRE?ICA PRIMAFAS 160" },
        grund: { price: 2.8349999999999995, sku: "4105", name: "MINERALKVARC GRUND OBOJENI 65 15 L KANTI" },
        plaster_silicat: { price: 1.875, sku: "4108", name: "SILIKATNA ?BUKA Z 1000 (1.5 MM) 25 KG" },
        dowel: { price: 0.36, sku: "4107", name: "PRI?VRSNICA PTV 200 MM" },
        profile_pvc: { price: 0.5399999999999999, sku: "4103", name: "PROFIL PVC 2,50 M+MRE?ICA 10X15" },
        profile_alu: { price: 3.7350000000000003, sku: "4106", name: "PROFIL AL COKL 15 CM (0,8 MM) 2,50 M" },
        eps_base_cm: { price: 8.805, sku: "4102", name: "EPS F 1000X500X150 (TR150)" }
    },

    // --- PANEL OGRADE ---
    fence: {
        // 2D PANELI
        panel_2d: {
            83: { price: 25.675, sku: "1001", name: "Ogradni panel 2D 830x2500 6/5/6" },
            103: { price: 28.925, sku: "1002", name: "Ogradni panel 2D 1030x2500 6/5/6" },
            123: { price: 33.8, sku: "1003", name: "Ogradni panel 2D 1230x2500 6/5/6" },
            143: { price: 38.68, sku: "1004", name: "Ogradni panel 2D 1430x2500 6/5/6" },
            163: { price: 43.88, sku: "1005", name: "Ogradni panel 2D 1630x2500 6/5/6" },
            183: { price: 48.75, sku: "1006", name: "Ogradni panel 2D 1830x2500 6/5/6" },
            203: { price: 54.6, sku: "1007", name: "Ogradni panel 2D 2030x2500 6/5/6" }
        },

        // 3D PANELI (5mm)
        panel_3d_5: {
            83: { price: 18.904615384615386, sku: "1018", name: "Ogradni panel 3D 830x2500 5/5" },
            103: { price: 22.2, sku: "1009", name: "Ogradni panel 3D 1030x2500 5/5" },
            123: { price: 26.104615384615386, sku: "1011", name: "Ogradni panel 3D 1230x2500 5/5" },
            153: { price: 33, sku: "1013", name: "Ogradni panel 3D 1530x2500 5/5" },
            173: { price: 35.70461538461539, sku: "1015", name: "Ogradni panel 3D 1730x2500 5/5" },
            203: { price: 42.6, sku: "1017", name: "Ogradni panel 3D 2030x2500 5/5" }
        },

        // 3D PANELI (4mm)
        panel_3d_4: {
            83: { price: 12.304615384615383, sku: "1019", name: "Ogradni panel 3D 830x2500 4/4" },
            103: { price: 13.799999999999999, sku: "1008", name: "Ogradni panel 3D 1030x2500 4/4" },
            123: { price: 15.904615384615385, sku: "1010", name: "Ogradni panel 3D 1230x2500 4/4" },
            153: { price: 20.4, sku: "1012", name: "Ogradni panel 3D 1530x2500 4/4" },
            173: { price: 22.8, sku: "1014", name: "Ogradni panel 3D 1730x2500 4/4" },
            203: { price: 26.704615384615384, sku: "1016", name: "Ogradni panel 3D 2030x2500 4/4" }
        },

        // Stupovi (sa plo?icom)
        posts: {
            85: { price: 11.375, sku: "1020", name: "Stup sa plo?icom 0,85 m" },
            105: { price: 12.675, sku: "1021", name: "Stup sa plo?icom 1,05 m" },
            125: { price: 14.3, sku: "1022", name: "Stup sa plo?icom 1,25 m" },
            145: { price: 16.900000000000002, sku: "1023", name: "Stup sa plo?icom 1,45 m" },
            155: { price: 16.900000000000002, sku: "1024", name: "Stup sa plo?icom 1,55 m" },
            165: { price: 19.825, sku: "1025", name: "Stup sa plo?icom 1,65 m" },
            175: { price: 19.825, sku: "1026", name: "Stup sa plo?icom 1,75 m" },
            185: { price: 22.75, sku: "1027", name: "Stup sa plo?icom 1,85 m" },
            205: { price: 22.75, sku: "1028", name: "Stup sa plo?icom 2,05 m" }
        },

        // Stupovi (za beton)
        posts_concrete: {
            150: { price: 13, sku: "1029", name: "Stup za beton 1,5 m" },
            175: { price: 14.625, sku: "1030", name: "Stup za beton 1,75 m" },
            200: { price: 16.25, sku: "1031", name: "Stup za beton 2,00 m" },
            230: { price: 18.2, sku: "1032", name: "Stup za beton 2,30 m" },
            250: { price: 21.45, sku: "1033", name: "Stup za beton 2,50 m" }
        },

        // Vrata
        gate_prices: {
            '1000x1000': { plate: { p: 266.5, s: '1034' }, concrete: { p: 266.5, s: '1034' } },
            '1000x1200': { plate: { p: 315.25, s: '1035' }, concrete: { p: 315.25, s: '1035' } },
            '1000x1500': { plate: { p: 390, s: '1036' }, concrete: { p: 390, s: '1036' } },
            '1000x1700': { plate: { p: 448.5, s: '1037' }, concrete: { p: 448.5, s: '1037' } },
            '1000x2000': { plate: { p: 513.5, s: '1038' }, concrete: { p: 513.5, s: '1038' } }
        },

        set_spojnica: { price: 0.5850000000000001, sku: "1039", name: "PVC Spojnica (s vijkom)" },
        anker_vijci: { price: 0.6299999999999999, sku: "1040", name: "SIDRENI VIJAK ZN M10" },
        zastita_ok: { price: 44.85, sku: "1041", name: "ZA?TITA OD POGLEDA, REBRASTA, 26 m?" },
        pricvrsnica_traka: { price: 0.7475000000000002, sku: "1042", name: "PVC PRI?VRSNICA ZA TRAKU" },
        montaza_plate: { price: 25, sku: "1043", name: "monta?a na parapet/m'" },
        montaza_concrete: { price: 35, sku: "1044", name: "monta?a u beton/m'" }
    },

    // --- KEMIJA I OSTALO ---
    chemicals: {
        insta_stik: { price: 10.293750000000001, sku: "2010", name: "Dow Insta Stik, za pi?tolj" },
        ak20: { price: 0.44999999999999996, sku: "2122", name: "Isomat AK 20" },
        aquamat_elastic: { price: 2.25, sku: "2128", name: "Isomat Aquamat Elastic sivi, 35kg (A+B komp)" },
        pu_primer: { price: 12.025, sku: "2129", name: "Isomat PU pimer, 5kg" },
        isoflex_pu500: { price: 7.6375, sku: "2130", name: "Isomat: Isoflex PU500, bijeli, (poliuretan)" },
        fimizol: { price: 24.94375, sku: "2131", name: "FIMIZOL, 9L, bitumenski premaz" }
    },

    others: {
        tpo_lim: { price: 42.25, sku: "2126", name: "TPO LIM (2 X 1m)" },
        pvc_lim: { price: 39, sku: "2127", name: "PVC LIM (2 X 1m)" },
        bentoshield: { price: 6.90625, sku: "2116", name: "Bentoshiled MAX5 (bentonit, bentonitna traka)" },
        osb_12: { price: 5.909999999999999, sku: "3010", name: "OSB plo?e 12mm (2500 x 675mm)" },
        osb_15: { price: 7.38, sku: "3007", name: "OSB plo?e 15mm (2500 x 675mm)" },
        osb_18: { price: 8.85, sku: "3008", name: "OSB plo?e 18mm (2500 x 675mm)" },
        osb_22: { price: 10.83, sku: "3009", name: "OSB plo?e 22mm (2500 x 675mm)" }
    },
    new_products: {
        reflectix: { price: 3.5875, sku: "3011", name: "SEALED AIR REFLECTIX? (alu izolacija)" },
        ethafoam: { price: 1.9500000000000002, sku: "3012", name: "Ethafoam 2222 (izolacija od udarnog zvuka u podu)" }
    }
};

// --- POMO?NE FUNKCIJE ---
function getXPSPrice(thickness) {
    if (prices.xps[thickness]) return prices.xps[thickness].price;
    return 0;
}

function getWoolPrice(thickness) {
    if (prices.wool_facade[thickness]) return prices.wool_facade[thickness].price;
    return 0;
}

function getGeotextileData(weight) {
    if (weight == 300) return prices.membranes.geotextile_300;
    return prices.membranes.geotextile_200;
}
