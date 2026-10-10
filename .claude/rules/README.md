# Pravila za Claude Code

`CLAUDE.md` kaže **šta važi**. Fajlovi ovdje kažu **kako se to poštuje i šta to provjerava**.

## Oblik svakog pravila

Jedan fajl po temi (npr. `testing.md`, `security.md`, `architecture.md`), uvijek iste četiri sekcije:

1. **Izvor** — dokument koji je vlasnik pravila. Navedi ga, ne kopiraj.
2. **Kako se poštuje** — konkretan put u ovom kodu.
3. **Šta to provjerava** — test ili skripta koja pada kad se pravilo prekrši, ili iskreno "ništa".
4. **Traži odluku** — šta se ne smije mijenjati bez odluke čovjeka.

Ako lijepiš isto pravilo na dva mjesta, stani: poveži izvor. Kopije se razilaze i niko ne primijeti.

## Učitavanje

Pravilo koje treba u **svakoj** sesiji uvezi iz `CLAUDE.md` linijom `@.claude/rules/<ime>.md`.
Drži takvih malo — sve što je uvezeno ulazi u svaku sesiju, a pažnja na sve je pažnja ni na šta.
Ostala pravila Claude čita kad izmjena dotakne njihovu temu.
