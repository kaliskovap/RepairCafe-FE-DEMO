# Repair Café – interaktivní frontend demo

Prezentační prototyp podle dodaného dokumentu „Repair Café Design.pdf“ a exportů obrazovek. Obsahuje desktopové rozhraní i mobilní náhled, mezi kterými lze přepínat horním přepínačem.

## Spuštění lokálně

```bash
npm install
npm run dev
```

Pro produkční sestavení:

```bash
npm run build
```

## Co lze v demu vyzkoušet

- přepínání náhledu Desktop / Mobil;
- přepínání rolí Dobrovolník / Zákazník / Administrátor;
- procházení a filtrování dostupných oprav;
- detail požadavku, projevení zájmu, výběr dobrovolníka;
- vytvoření požadavku, plánování termínu a zaznamenání výsledku opravy;
- jednoduchý kalendář a správu kategorií.

## Poznámky

- Jde o frontendový prototyp s lokálním stavem v prohlížeči. Data se neukládají do databáze a nejsou sdílena mezi uživateli.
- Přihlášení, autorizace, OAuth, auditní log, API a skutečné nahrávání fotografií nejsou implementovány.
- Logo a fotografie produktů jsou výřezy z dodaného návrhového PDF, aby vizuální styl odpovídal návrhu.
- Mobilní zobrazení je samostatný náhled stejné aplikace s responzivním rozložením; tlačítko v horní liště přepíná mezi desktopovou a mobilní šířkou.
