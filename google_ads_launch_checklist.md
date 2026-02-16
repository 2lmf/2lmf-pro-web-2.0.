# Google Ads: Launch Checklist (2LMF PRO)
> **Status:** Čeka PDV ID broj i Google Ads Account Setup.

Ovaj vodič te vodi korak-po-korak kroz Google Ads sučelje kako bi ispravno lansirao kampanju koju smo pripremili.

---

## Korak 1: Izrada Računa (Account Setup)
Kada otvaraš novi račun na [ads.google.com](https://ads.google.com):
1.  **Skip Campaign Creation:** Ako ti Google odmah nudi da napraviš kampanju, potraži link *"Switch to Expert Mode"* ili *"Create an account without a campaign"*. Želimo potpunu kontrolu.
2.  **Billing Settings (Plaćanje):**
    *   **Account Type:** Obavezno odaberi **Organization** (Firma).
    *   **Tax Info:** Unesi svoj OIB s `HR` prefiksom (PDV ID).
    *   **Primary Payment:** Unesi poslovnu karticu.

---

## Korak 2: Postavljanje Konverzije (Conversion Tracking)
Ovo je najvažniji tehnički korak.
1.  U gornjem izborniku klikni na **Goals** -> **Conversions** -> **Summary**.
2.  Klikni na **+ New conversion action**.
3.  Odaberi **Website**.
4.  Upiši domenu: `2lmf-pro.hr`.
5.  Pod "Create conversion actions manually" klikni na **+ Add a conversion action manually**:
    *   **Goal category:** Submit lead form.
    *   **Conversion name:** "Web Upit - Kalkulator".
    *   **Value:** "Use the same value for each conversion" (stavi npr. 50€ kao procjenu vrijednosti jednog upita).
    *   **Count:** One (ne želimo brojati ako ista osoba pošalje upit 5 puta u 5 minuta).
6.  Klikni **Save and continue**.
7.  Pod **Tag setup** odaberi *"Use Google Tag Manager"* ili *"Install the tag yourself"*.
8.  **PRONAĐI OVE BROJEVE:**
    *   **Conversion ID:** (npr. `123456789`)
    *   **Conversion Label:** (npr. `abcdefghijklmnopqrstuvw`)
9.  **Javi mi te brojeve** da ih ubacim u tvoj `kalkulator.html`.

---

## Korak 3: Kreiranje Kampanje
Klikni na plavi **+** (New Campaign):
1.  **Objective:** Leads.
2.  **Campaign Type:** Search.
3.  **Bidding:** Fokus na "Clicks" (za početak) ili "Conversions" (ako već imaš podatke). Postavi *Max CPC limit* na npr. 0.70€.
4.  **Campaign Settings:** Isključi "Display Network" (želimo samo ljude koji traže na Googleu).
5.  **Keywords & Ads:** Kopiraj podatke iz `google_ads_strategy_kalkulator.md`.
    *   Napravi dvije Ad Grupe (Ograde i Hidroizolacija).
    *   Ubaci barem 5-10 naslova i 2-3 opisa koje sam ti napisao.

---

## Korak 4: Finalni "Go Live"
1.  Provjeri jesu li svi linkovi ispravni (vode na `kalkulator.html`).
2.  Provjeri jesu li dodana proširenja (Sitelinks, Callouts).
3.  Klikni **Publish**.

**Napomena:** Googleu obično treba 24-48 sati da pregleda oglase i odobri ih. Nakon toga, tvoj "morski pas" kreće u lov! 🦈🌐💰
