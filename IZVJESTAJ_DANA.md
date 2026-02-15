# 2LMF PRO & SHARPSHARK: Dnevni Izvještaj (14.02.2026.)

Ovaj dokument služi kao trajna arhiva svih današnjih zahvata na sustavu 2LMF PRO. Fokus je bio na postizanju apsolutne vizualne konzistentnosti i tehničke preciznosti kalkulatora.

## 1. Građevinski Kalkulator (Katalog & Ograde)

Postignuta je potpuna usklađenost s Vašim fizičkim cjenikom (SKU 1001-4109).

-   **Sinkronizacija Naziva (RAL)**: Svi elementi ogradnog sustava (paneli, stupovi, spojnice, vrata) sada u nazivu sadrže oznaku boje **"RAL 7016 ili 6005"**.
-   **Konačni Formati Panela**:
    -   **3D 4mm**: Unificiran naziv (npr. *Ogradni panel 3D 4/4 1230x2500...*).
    -   **3D 5mm**: Unificiran naziv (npr. *Ogradni panel 3D 5/5 1230x2500...*).
-   **Preciznost Stupova**: U rekapitulaciji se sada točno vidi duljina stupa (npr. stup za visinu 1.03m povlači stup s oznakom **d=1.50m** u nazivu).
-   **Logika Pakiranja (OSB)**: Implementiran množitelj od **1.6875 m2 po komadu**. Sustav sada zaokružuje komade na temelju ove precizne kvadrature.
-   **Vizualna Dorada Kataloga**:
    -   Uvedene žute akcentne linije za premium izgled.
    -   Kompaktne kontrole količine (bez viška naslova).
    -   Stabilizirane strelice za promjenu količine (bez bježanja fokusa).
-   **Vizualizacija Ograda**: Rafinirana linija tla kako bi verno prikazivala montažu panela u 2D i 3D prikazu.

## 2. Unifikacija Globalnog Dizajna (UI/UX)

Cilj je bio spajanje "dvije priče" (2LMF i SharpShark) u jedan fluidan doživljaj.

-   **1:1 Header Mirroring**:
    -   Podstranice Arhitektura (`architects_blueprint.html`) i Znanje (`blog_hub.html`) sada koriste **identičan kôd navigacije** kao i Početna stranica.
    -   SharpShark logotip je vraćen na sve stranice.
    -   Veličine fontova navigacije unificirane (1.25rem brend, 0.6rem tagline).
-   **Preciznost Širine (Layout Stability)**:
    -   Navigacija je izvučena iz kontejnera i postavljena direktno pod `body`.
    -   Time header počinje od samog ruba viewporta, eliminirajući "skakanje" navigacije i rezanje linkova pri prelasku stranica.
-   **ALL CAPS Navigacija**: Svi linkovi u gornjem izborniku su unificirani u velika tiskana slova za premium "luxury" dojam.
-   **Migracija Footera**:
    -   Čisti dizajn s podstranica je uspješno prenesen na `index.html`.
    -   Tema footera na Indexu: Crna pozadina, bijeli tekst, jarko narančasta "PRO" oznaka u copyrightu.
    -   Svi SEO hashtagovi su zadržani i vizualno rafinirani (decentna siva boja).

## 3. Tehnička Arhitektura (Backend)

-   **Google Apps Script**: Ažuriran `CRM_Complete_UPGRADED.gs` kako bi ispravno obrađivao nove nazive SKU stavki.
-   **Local V5 Test**: Kreirana testna okolina (`local_v5_test.html`) za brzu provjeru vizualnih promjena bez utjecaja na live sustav.

---

# 🚀 Plan za Sutra (SharpShark Expansion)

Fokus se seli s građevinskog dijela (2LMF) na digitalni dio (SharpShark).

1.  **Razdvajanje SharpShark Usluga**:
    -   Kreiranje **dvije zasebne landing stranice** (ili dvije velike sekcije) unutar SharpShark priče.
    -   **Cjelina A: Digitalna Automatizacija & Fiskalizacija**. Fokus na "0€ Modelu" (Narudžba -> Ponuda -> Račun), rješavanju straha od fiskalnih blagajni i besplatnom gamificiranom webshopu.
    -   **Cjelina B: Web Rješenja & Management**. Fokus na Booking sustave, Channel Managere, SEO optimizaciju i arhitektonsko "storytelling" predstavljanje objekata.
2.  **Povezivanje s Katalogom**: Implementacija dubokih linkova koji iz SharpShark opisa izravno otvaraju Katalog modula u kalkulatoru.
3.  **Finalna Optimizacija**: Brzina učitavanja vizuala i responsivnost na mobilnim uređajima za sve nove SharpShark sekcije.
