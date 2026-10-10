# Flowforge Systems — upute za Claude Code

<!-- Drži kratko. Ovaj fajl ulazi u svaku sesiju. Detalji idu u .claude/rules/. -->

## Šta je projekat

Premium web stranica agencije Flowforge Systems (usluge, paketi, kontakt forma, admin dio).
Next.js 14 (App Router) + TypeScript + Tailwind CSS, MongoDB za kontakt/admin (`app/api`,
`app/admin`), deploy na Vercel (Node 24.x).

## Komande

```bash
# dev:          npm run dev
# build:        npm run build
# testovi:      npm run test:e2e               # Playwright, e2e/
# lint/format:  npm run lint                   # next lint; format: npx prettier --write .
```

## Pravila

- Najmanja izmjena koja zadovoljava zadatak. Posao u blizini zadatka se zapisuje, ne gradi.
- Postojeći kod nije izvor istine kad se ne slaže s dokumentacijom — možda je stariji od pravila.
- Prije nove biblioteke, novog servisa ili promjene sigurnosnog modela: pitaj.
- Autorizacija se nikad ne premješta u UI ili klijent.

## Zabranjeno

- Commit bez izričitog zahtjeva. Gotov posao ostaje u radnom stablu na pregled.
- Otkrivanje ili commit tajni.
- Destruktivne komande nad ne-lokalnim bazama i cloudom.

## Izvještaj na kraju

Šta je urađeno, izmijenjeni fajlovi, šta je stvarno pokrenuto i s kojim rezultatom (uključujući
greške), preostali rizici. Generisan kod nije dokaz da radi, a zelen lokalni run nije dokaz da
radi svuda.

## Detaljna pravila

`.claude/rules/` — vidi `README.md` tamo.
