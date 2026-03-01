# AuraCode Landing Page - Product Requirements Document

## Original Problem Statement
Készíts egy modern landing page-et az AuraCode webdesigner vállalkozásnak. A jelenlegi honlap (auracode.hu) elavult, frissíteni kell egy modern, menő designnal. A tartalmi elemeket és véleményeket a meglévő oldalról kell felhasználni.

## User Personas
- **Kisvállalkozás tulajdonos**: Étterem, szalon, fitness stúdió, akik modern weboldalat szeretnének
- **Középvállalkozás vezető**: Ingatlaniroda, szálloda, webshop tulajdonos, komplex megoldásokkal

## Core Requirements (Static)
1. Sötét/dark mode elegáns tech-look neon zöld (#00FF00) akcentussal
2. Mix animációk - subtilis + erőteljes wow-faktor
3. Kapcsolati űrlap (design only)
4. Animált statisztikák/számláló
5. Parallax scrolling effekt
6. 3D elemek/effektek
7. Professzionális megjelenés

## What's Been Implemented ✅
**Date: 2025-03-01**

### Completed Features:
- **Hero Section**: 3D forgó kocka animáció, lebegő részecskék, parallax effekt
- **Navigation**: Sticky glassmorphism header, mobil menü animációkkal
- **Approach Section**: Pain pointok megjelenítése, stratégiai üzenet
- **Stats Section**: Animált számlálók (50+, 30 nap, 3x) react-countup-pal
- **Services Section**: Bento grid, hover effektek, neon glow
- **Process Section**: Timeline lépésekkel, alternáló layout
- **Portfolio Section**: Grayscale -> színes hover effekt, referencia kártyák
- **Testimonials Section**: Végtelen marquee animáció, 8 vélemény
- **FAQ Section**: Accordion shadcn/ui komponenssel
- **Contact Section**: Stílusos űrlap underline input designnal
- **Footer**: Navigáció, linkek, branding

### Technical Stack:
- React + Tailwind CSS
- Framer Motion (animációk)
- react-countup (számlálók)
- react-intersection-observer (scroll trigger)
- Shadcn/UI komponensek

## Prioritized Backlog

### P0 (Critical) - COMPLETED
- [x] Összes szekció implementálása
- [x] Mobil reszponzivitás
- [x] Animációk és effektek

### P1 (High Priority) - Következő fázis
- [ ] Működő kapcsolati űrlap (email küldés)
- [ ] Cookie banner / GDPR
- [ ] Google Analytics integráció

### P2 (Medium Priority)
- [ ] Adatvédelmi nyilatkozat oldal
- [ ] ÁSZF oldal
- [ ] Chatbot integráció

## Next Action Items
1. Email szolgáltatás integrálása a kapcsolati űrlaphoz (SendGrid/Resend)
2. Multi-language támogatás (EN)
3. Blog szekció hozzáadása
