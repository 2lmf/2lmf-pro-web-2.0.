# 🦈 CalorieShark - Tehnička Dokumentacija v1.0

## 1. Pregled Aplikacije
**CalorieShark** je moderna PWA (Progressive Web App) aplikacija za "frictionless" praćenje kalorija. Cilj je omogućiti korisniku da u manje od 5 sekundi zabilježi obrok koristeći snagu **Google Gemini 1.5 Flash AI-ja**.

## 2. Ključne Funkcionalnosti
*   **AI Vision (Kamera):** Korisnik slika tanjur -> označava bitan dio (Cropper) -> AI vraća prepoznatu hranu, kalorije i makrose (P, U, M).
*   **Voice & Text Input:** Sustav razumije prirodni jezik. Možeš reći: *"Pojela sam tri bjelanjka i jednu šnitu crnog kruha"*, a AI će to razložiti na sastojke.
*   **Lead Generation (E-mail):** Prilikom prvog ulaska, aplikacija prikuplja e-mail korisnika i sprema ga u bazu za kasniji marketing ili kontakt.
*   **Dnevni Dnevnik:** Prati TDEE (dnevnu potrošnju), unose kalorija, makronutrijente i potrošnju kroz treninge.
*   **Cloud Sync:** Svi podaci se sinkroniziraju u Google Sheets u realnom vremenu.

## 3. Tehnička Arhitektura (Kako radi?)
Aplikacija radi na tri razine:
1.  **Front-End (HTML5/Vanilla JS):** Lagan i brz klijent koji koristi `LocalStorage` za trenutni prikaz i `Service Worker` (v34) za offline rad i PWA funkcionalnost.
2.  **API Bridge (Google Apps Script):** Služi kao sigurnosni most. On skriva tvoj Gemini API ključ i komunicira s Google Sheet bazom.
3.  **Baza (Google Sheets):** Koristi se kao baza podataka. Svaki unos obroka i svaki novi e-mail korisnika sprema se u posebne kolone (`ID`, `Timestamp`, `Email`, `Meal Data`...).

## 4. Specifična rješenja (Smart Logic)
*   **PWA Isolation:** Aplikacija ima strogo definiran `scope` i `ID` u manifestu kako se ne bi miješala s drugim aplikacijama na domeni `2lmf-pro.hr`.
*   **Custom Prompting:** Gemini AI dobiva upute da se ponaša kao nutricionist i da obraća pažnju na specifična jela s Balkana (Sarma, Ćevapi, Grah).
*   **Dynamic UI:** Koristi "Skeleton" loading ekrane i glatke animacije za premium osjećaj.

## 5. Planirani idući koraci (Roadmap)
*   **Fuzzy Search:** Implementacija lokalnog pretraživanja koje prepoznaje tipfelere (npr. *"Piletna"* -> *"Piletina"*).
*   **Voice Context (Slika + Glas):** Najbitnija nadogradnja. Omogućit ćemo korisniku da pošalje sliku obroka i istovremeno izgovori kontekst (npr. *"Ovo je samo četvrtina pizze i u čaši je kola, a ne pivo"*). Gemini će primati oba podatka (multimodalno) kako bi preciznost bila 100%.

---
*Dokument generiran: 25.02.2026.*
