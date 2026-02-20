# Arhitektura Sustava: Građevinski Web Kalkulator & Google CRM

Ovaj dokument detaljno opisuje tehničku arhitekturu, tok podataka i upute za implementaciju sustava koji spaja Web Kalkulator s Google Sheets CRM-om.

---

## 1. Pregled Sustava (Overview)

Sustav je hibridno rješenje koje koristi **Web Frontend** za interakciju s korisnikom i **Serverless Backend** (Google Apps Script) za obradu podataka, slanje emailova i pohranu.

**Ključne prednosti:**
*   **Bez troškova servera:** Koristi Google infrastrukturu (besplatno do određenih limita).
*   **Automatizacija:** Od upita do CRM zapisa i email ponude bez ljudske intervencije.
*   **Centralizacija:** Sve se slijeva u jednu Google Tablicu koja služi kao baza i upravljačka ploča.

---

## 2. Komponente Sustava

### A. Frontend (Web Stranica)
*   **Tehnologija:** HTML, CSS, JavaScript (Vanilla).
*   **Uloga:**
    *   Prikazuje kalkulator (Fasade, Ograde, itd.).
    *   Sadrži logiku izračuna materijala (na temelju formula i kvadratura).
    *   Sadrži bazu prodajnih cijena (`items_data.js`).
    *   Formira JSON paket s podacima i šalje ga na Backend.

### B. Backend (Google Apps Script)
*   **Tehnologija:** JavaScript (Google V8 Engine) u oblaku.
*   **Uloga:**
    *   Služi kao API Endpoint (`doPost`).
    *   **Sigurnost & ID:** Generira sekvencijalne brojeve ponuda (`u00001`, `u00002`...) koristeći `LockService` da se spriječi dupliranje.
    *   **Poslovna Logika:**
        *   Prima prodajne cijene od Frontenda.
        *   Pridružuje **nabavne cijene** (koje su tajne i nalaze se samo u skripti ili se računaju faktorom).
        *   Računa zaradu (Profit) za svaku stavku.
    *   **Email Servis:**
        *   Kupcu šalje "Informativnu ponudu" (HTML dizajn).
        *   Adminu šalje "Novi upit" s detaljnom analizom zarade.

### C. Baza Podataka & CRM (Google Sheets)
*   **Tablica "Upiti":** Kronološki zapis svih upita (Baza podataka).
*   **Tablica "Generator Ponuda":** Sučelje (UI) unutar Excela za Admina.
    *   Omogućuje učitavanje starog upita po ID-u.
    *   Omogućuje izmjenu stavki.
    *   Omogućuje slanje službene ponude jednim klikom (kvačicom).

---

## 3. Tijek Podataka (User Journey)

### Korak 1: Izračun i Slanje (Frontend)
1.  Korisnik na webu unese "100m2 Fasade" i klikne "Zatraži ponudu".
2.  `kalkulator.js` izračuna materijal (npr. 100m2 Stiropora, 110m2 Mrežice...).
3.  Funkcija `sendInstantData()` pakira te podatke u JSON objekt.
4.  Šalje se **POST Request** na `GAS_URL` (Google Apps Script link).

### Korak 2: Obrada i Obogaćivanje (Backend)
1.  Google Script prima zahtjev (`doPost(e)`).
2.  **Dodjela ID-a:** Skripta provjerava zadnji broj (npr. 55) i dodjeljuje novi ID: **u00056**.
3.  **Enrichment (Obogaćivanje):**
    *   Za svaku stavku (npr. "Stiropor 10cm"), skripta gleda svoju internu `MATERIAL_CONFIG`.
    *   Računa: `Nabavna Cijena = Prodajna * 0.80` (ili fiksna cijena ako je definirana).
    *   Računa: `Zarada = Prodajna - Nabavna`.

### Korak 3: Notifikacije (Email)
1.  **Email Kupcu:**
    *   Naslov: "INFORMATIVNA PONUDA".
    *   Sadržaj: Lijepo formatirana tablica s artiklima, cijenama i **QR kodom** za plaćanje.
    *   *Napomena:* Ovo je "neobvezujuća" ponuda.
2.  **Email Adminu (Vama):**
    *   Naslov: "🔔 NOVI UPIT: Ivo Ivić (u00056)".
    *   Sadržaj: Tablica koja prikazuje **Zaradu** po svakoj stavci i **Popis za nabavu** (što treba naručiti od dobavljača).

### Korak 4: Arhiviranje (CRM)
1.  Sustav upisuje novi red u tablicu **"Upiti"**:
    *   Datum, ID (u00056), Ime, Email, Iznos, Status (NOVO), Sirovi JSON podaci.

### Korak 5: Admin Intervencija (Opcionalno)
*Slučaj: Kupac želi izmjenu ili službenu ponudu.*
1.  Otvarate Google Sheet, tab **"Generator Ponuda"**.
2.  Upišete ID: `u00056` (ili samo `56`).
3.  Kliknete kvačicu **"Učitaj podatke"** (ili Meni "Učitaj").
4.  Podaci se učitaju u tablicu. Možete promijeniti količinu stiropora sa 100 na 105.
5.  Kliknete kvačicu **"Pošalji Ponudu"**.
6.  Sustav generira **novi PDF/Email** s naslovom "PONUDA ZA PLAĆANJE" i šalje kupcu.

---

## 4. Vodič za Implementaciju (Korak-po-Korak)

Ako ovo želite postaviti na neku drugu domenu/projekt, slijedite ove korake:

### Faza 1: Web Stranica
1.  Postavite HTML formu/kalkulator.
2.  Osigurajte da JavaScript formira array objekata: `[{name: "Artikl 1", qty: 10, price_sell: 5.50, unit: "m2"}, ...]`.
3.  Pripremite kod za slanje (AJAX/Fetch) na prazan URL (popunit ćemo ga kasnije).

### Faza 2: Google Backend
1.  Otvorite [Google Sheets](https://sheets.new) i kreirajte novu tablicu.
2.  Idite na **Extensions > Apps Script**.
3.  Zalijepite kod iz `backend_script.gs` (sve obrišite prije toga).
4.  Kliknite **Save** 💾.
5.  Pokrenite funkciju `setupCRM()` *samo jednom*:
    *   Odaberite funkciju u dropdownu i kliknite **Run**.
    *   Dobreite ovlasti (Review Permissions -> Allow).
    *   Ovo će kreirati tabove "Upiti" i "Generator Ponuda".

### Faza 3: Deployment (Puštanje u rad)
1.  U Apps Scriptu, kliknite **Deploy > New deployment**.
2.  Select type: **Web App**.
3.  Description: "Verzija 1".
4.  **Execute as: Me** (Važno: skripta se vrti pod vašim računom).
5.  **Who has access: Anyone** (Važno: da web stranica može slati podatke bez logiranja).
6.  Kliknite **Deploy**.
7.  **KOPIRAJTE "Web App URL"** (završava na `/exec`).

### Faza 4: Povezivanje
1.  Vratite se u JavaScript kod web stranice (`kalkulator.js`).
2.  Zalijepite kopirani URL u varijablu `const GAS_URL = "https://script.google..../exec";`.
3.  Objavite web stranicu.

**Gotovo! Sustav je povezan.**

---

## Sažetak Datoteka
*   `kalkulator.js`: Frontend logika + URL.
*   `items_data.js`: Cjenik (Prodajne cijene).
*   `backend_script.gs`: Mozak sustava (Backend).
