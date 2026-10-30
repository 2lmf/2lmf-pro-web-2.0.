// Žive cijene i sidrene cijene za blog/landing stranice (iz CRM tablice, tab CJENIK, preko get_prices).
// U HTML-u se upisuje zadnja poznata cijena (za tražilice i bez JS-a), a skripta je osvježi:
//   <span data-lp="5020+5021">2.381,06 €</span>              -> cijena (zbroj više šifri)
//   <span data-lp-anchor="5020+5021">...</span>               -> "Cijena na 10.09.2026.: 2.381,06 €"
//   <span data-lp-wh="4032" data-lp-sku="5020+5021">0,59 €</span> -> cijena po Wh
//   <span data-lp-minwh>0,55</span>                           -> najniži €/Wh od svih data-lp-wh na stranici
(function () {
    const GAS_URL = "https://script.google.com/macros/s/AKfycbx4TQ6cFNr8X-fNRHE0Ai571pAioDeny_mSSrTVQm3OHbTKOhfIEDiKDFM2shZ5zDFLrA/exec";
    const fmt = n => new Intl.NumberFormat('hr-HR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

    function sum(skus, map, field) {
        let total = 0;
        for (const sku of skus.split('+')) {
            const v = map[sku.trim()];
            const n = field ? v && v[field] : v;
            if (typeof n !== 'number') return null;
            total += n;
        }
        return total;
    }

    function apply(data) {
        const prices = data.prices || {}, anchors = data.anchors || {};

        document.querySelectorAll('[data-lp]').forEach(el => {
            const p = sum(el.dataset.lp, prices);
            if (p !== null) el.textContent = fmt(p) + ' €';
        });

        document.querySelectorAll('[data-lp-anchor]').forEach(el => {
            const skus = el.dataset.lpAnchor;
            const p = sum(skus, anchors, 'p');
            const first = anchors[skus.split('+')[0].trim()];
            if (p !== null) el.textContent = `Cijena na ${first.d}.: ${fmt(p)} €`;
        });

        let minWh = null;
        document.querySelectorAll('[data-lp-wh]').forEach(el => {
            const p = sum(el.dataset.lpSku, prices);
            if (p === null) return;
            const perWh = p / parseFloat(el.dataset.lpWh);
            el.textContent = fmt(perWh) + ' €';
            if (minWh === null || perWh < minWh) minWh = perWh;
        });
        if (minWh !== null) document.querySelectorAll('[data-lp-minwh]').forEach(el => { el.textContent = fmt(minWh); });
    }

    fetch(`${GAS_URL}?action=get_prices&t=${Date.now()}`)
        .then(r => r.json())
        .then(apply)
        .catch(() => { /* ostaju upisane cijene iz HTML-a */ });
})();
