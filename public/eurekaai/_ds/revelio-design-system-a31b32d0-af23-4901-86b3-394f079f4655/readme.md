# Revelio Design System

Design system for **Ревелио / Revelio Tech** (revelio.tech) — a Russian B2B consultancy and IT product shop: consulting (AS IS → TO BE audits), hypothesis prototyping, product development, and one self-serve product, **AI-оценка** (AI project estimation).

The look is deliberately editorial-engineering: warm paper instead of white, navy-tinted ink, one bright accent (cobalt), 1px hairlines, and a faint blueprint grid. No gradients, no "AI purple", no decorative shadows.

---

## Sources used

| Source | Access | Notes |
|---|---|---|
| Written design spec (`Revelio Design`, RU) supplied in the brief | ✅ full text | The authoritative token / typography / component spec. It names `app/globals.css` and `components/` as its own source of truth. |
| `app/globals.css` + `components/` in the product repo | ❌ **not attached** | Never reachable from this project — no repo, no local folder, no Figma link was mounted. All token values here are transcribed verbatim from the written spec, not read from code. |
| `https://revelio.tech/` | ✅ read (live) | Home page copy, IA, stats, cases, team, services, journal, process, contact form. |
| `https://revelio.tech/consulting/` | ✅ read (live) | Service page: formats, metrics, solution classes, a-la-carte artefact catalogue. |
| `https://revelio.tech/ai-evaluation/` | ✅ read (live) | AI-оценка product page: onboarding, analysis dimensions, error frequencies, risk register. |
| `https://revelio.tech/evaluate/` (the estimation wizard itself) | ❌ not read | Deliberately **not** recreated — see caveats. |
| Logos, illustrations, OG covers | ❌ not downloadable | URLs recorded in `assets/README.md`. |

## Products / surfaces

1. **Marketing site** — home, service pages (`/consulting/`), journal (`/media/`), research gate, legal. Recreated in `ui_kits/website/`.
2. **AI-оценка как сервис** — product landing (recreated) plus a gated estimation wizard at `/evaluate/` (not recreated).

---

## CONTENT FUNDAMENTALS

**Language.** Russian, with English technical vocabulary left untranslated and un-italicised: *CDP, Loyalty, DWH, НСИ, oCRM, Golden ID, WFM, LLM, k8s*. Latin and Cyrillic mix inside one line without apology — «Разработка eCom-платформы», «AI-оценка».

**Person.** The company speaks as **«мы»** to business buyers («Внедряем новую экспертизу в бизнес», «Помогаем заказчикам…»), and switches to informal **«ты»** inside the self-serve product («Загружаешь требования, отвечаешь на вопросы», «Дай контакты куда тебе придет результат»). Never «Вы» with a capital. Pick the register by surface: consulting = «мы», AI-оценка = «ты».

**No terminal periods** on headings, captions, chips, stat labels, or short single-sentence lines. Multi-sentence body copy keeps its internal punctuation but still drops the final dot. This is the single most visible copy rule.

**Headline shape.** Short verb-first claim, wrapped over two lines, uppercase in render: «Внедряем новую экспертизу в бизнес», «Три формата работы», «Успешные внедрения», «Как оцениваем и выполняем проекты». Questions are allowed as headings — «На какие вопросы отвечает AI-оценка», «Готовы оценить проект?»

**Numbers do the selling.** Almost every block leads with a measurable: «15 лет», «10 минут до ответа», «3–5 дней на оценку, бесплатно», «2 недели рабочий прототип», «от 345 000 ₽ / 1 неделя», «погрешность 10–20%», «300+ план-фактов», «экономия 20+ FTE». Ranges use an en dash with no spaces (`3–5`, `10–20%`, `2–7 дней`). Prices are spaced thousands + `₽` («530 000 ₽»). Fallback price is «по запросу».

**Arrows and dashes carry logic.** `→` for transformation («AS IS → TO BE», «От Excel к ML», «Анализ → проектирование → разработка»); `—` for the punchline half of a sentence («ответит не продавец, а консультант»); `·` as a separator in meta lines («Excel · 1 область», «Консультант · Технологии»).

**Section eyebrows are bracketed mono caps:** `[ Кейсы ]`, `[ Медиа ]`, `[ Онбординг ]`, `[ A-la-carte ]`, `[ Что AI ловит за вас ]`. Always singular-noun-phrase, never a sentence.

**Tone.** Confident practitioner, mildly wry, never breathless. It will say «Помогаем трансформировать ужасное → в феноменальное» and «Реальные (!) KPI» — humour is dry and rare. It names its own limits out loud: «Продукт не подходит для: инфраструктурные проекты ИТ», «Цифры — только на ощущениях 90%», «на схеме приведён пример». Never «инновационный», «уникальный», «лидер рынка».

**People** are first name + role only — «Анастасия · CEO», «Илья · Консультант · Технологии». Clients are named plainly in a ticker.

**Emoji** *are* part of the voice, but only in one job: a single leading glyph that categorises a card or block — 📊 Data/BI, ✈️ B2B Travel Tech, 🔥 Консалтинг, 🤖 AI-оценка, 📐 Как оцениваем, 🚀 Как выполняем, 💬 in the contact heading. Never inside body copy, never two in a row, never decorative.

---

## VISUAL FOUNDATIONS

**Colour.** Warm off-white paper (`--background` `oklch(0.971 0.008 85)`) — never `#fff`. Ink is navy-tinted (`oklch(0.205 0.04 265)`) — never neutral black. Deep navy `--primary` holds the composition (inverted panels, footer, CTA hover). **One** bright colour per screen: cobalt `oklch(0.55 0.2 255)` in light theme, warm amber `oklch(0.82 0.13 75)` in dark. `--destructive` appears in exactly one place — risk-impact deltas. Charts step navy → cobalt. Never hardcode a hex; always the semantic token.

**Type.** Inter Tight for display (uppercase, 900, `line-height: 1.04`, `letter-spacing: -0.02em`), Inter for body (`line-height: 1.625`), JetBrains Mono for every label, chip, eyebrow and button (11–12px, uppercase, tracking 0.16–0.2em). `body { letter-spacing: -0.02em }` globally — the whole system sits tight. H1 scale 36 → 60 → 72px.

**Spacing & layout.** One container: `max-width: 80rem`, gutter 1.25rem → 2rem. Sections step 6–8rem vertically. Hairline dividers separate sections and rows, used sparingly. Card mosaics are hand-built flex columns when order must be deterministic (CSS `columns` reflows unpredictably). Cases sit in an overlapping mosaic where covered and text-only tiles alternate.

**Backgrounds.** No photography as background, no full-bleed hero imagery, no gradients. The only texture is `.blueprint` — two 1px linear-gradient grids at 5% navy on a 48px pitch, used behind heroes and empty media slots. Inverted navy panels do the heavy lifting for contrast breaks.

**Imagery.** Case, journal and onboarding art are flat-colour vector illustrations and product screenshots in the brand's own cool navy/cobalt palette — no photographic warmth, no grain, no duotone filters. Covers sit **flush** to the card edge with zero inner padding, `object-fit: cover`; `object-contain` only for outlet logos and screenshots. (No image files were provided — see caveats.)

**Corners.** `--radius: 0.9rem` with a scaled set (0.6× … 2.6×). Buttons `--radius-lg`; chips and labels fully rounded; large cards `--radius-2xl`/`3xl`; inputs `--radius-md`.

**Cards.** `bg-card` (a half-step lighter than the page in light theme, lighter than the ground in dark), 1px hairline border, generous radius, **no shadow**. Hierarchy comes from border, density and type — the shadow tokens exist only as escape hatches. A featured card is marked by an accent-coloured hairline, nothing else.

**Borders & shadows.** `--border` is 14% navy; `--border-strong` 28% for hover and dashed guides. Dark theme uses white at 12%/24%. There is no inner-shadow system and no elevation ladder.

**Transparency & blur.** One use only: the sticky header is `background` at ~88% with `backdrop-filter: blur(12px)` and a bottom hairline. No frosted cards, no protection gradients over imagery — text never sits on a photo, so none are needed.

**Motion.** `.reveal` + `.in-view` → `fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1)` on scroll. `.animate-scale-in` → 0.4s, 0.98 → 1 with a small lift. `.animate-marquee` → 38s linear infinite, paused on hover. Hover transitions are 300ms and animate **colour and border only** — never transform (transform on cards triggers a Safari layer-flicker bug). `prefers-reduced-motion: reduce` kills everything.

**States.** Hover: primary button inverts cobalt → navy; secondary lightens its ground and turns its label cobalt; cards brighten their border; links go accent → navy; artefact rows tint their title cobalt. Press: no dedicated press state — no shrink, no darken. Focus: the input border switches to `--ring` (accent); no glow ring. Disabled: 45% opacity, pointer-events off. Everything interactive has `cursor: pointer` globally.

---

## ICONOGRAPHY

There is **no icon library, icon font, or SVG sprite** in this brand — and none has been substituted.

- **Emoji** are the icon system. One glyph leads a card's mono category line or a block heading: ✈️ 🛟 📊 🎮 🧩 🔁 💬 📞 🛡️ 🤖 📐 🚀 🔥 🔍 📦. They are rendered at 0.95–1.5rem, always beside mono-caps text, never coloured or boxed.
- **Unicode marks** carry the rest of the semantics: `→` (transformation, "read more"), `—` (bullet marker inside lists), `·` (meta separator), `«  »` (Russian quotes, used for product names), `[  ]` (section eyebrows), `✓` (checked consent box), zero-padded `01…04` mono numerals for steps.
- **Logotypes** (Forbes, Sostav, client marks) appear as supplied SVG/PNG files at their own colour; where a file is missing the client name is simply set in Inter Tight (see `Marquee`).
- If a future surface genuinely needs UI icons, use a **1.5px stroke, no-fill** set (Lucide is the closest match to the hairline aesthetic) and flag it — do not mix filled and stroked sets.

---

## Index

| Path | What |
|---|---|
| `styles.css` | Global entry — `@import` list only. Consumers link this one file. |
| `tokens/` | `fonts.css` · `colors.css` · `typography.css` · `radius.css` · `spacing.css` · `motion.css` · `base.css` (reset, `.blueprint`, `.rv-container`, `.rv-mono`) |
| `guidelines/` | 19 foundation specimen cards (Colors · Type · Spacing · Brand) |
| `components/` | Reusable primitives, grouped by concern (below) |
| `ui_kits/website/` | Click-through recreation of revelio.tech — see its `README.md` |
| `assets/` | **Empty** — `README.md` lists the asset URLs that still need to be dropped in |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent Skills entry point |

### Components

**`components/core/`** — `Button`, `Chip`, `SectionLabel`, `Wordmark`
**`components/surfaces/`** — `Card`, `CaseCard`, `ArticleCard`, `ServiceCard`, `TeamCard`, `StatBlock`
**`components/layout/`** — `Container`, `SectionHeading`, `Marquee`, `StepList`
**`components/forms/`** — `Field`, `Consent`, `ContactForm`
**`components/data/`** — `MetricBar`, `RiskItem`, `ArtifactRow`

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when + usage).

### Intentional additions

The written spec defines Button (primary/secondary), section label, chip, and cards; the rest of the inventory above was derived from the **live site's** actual composition (stat rows, step lists, marquee, artefact rows, risk rows, metric bars, contact form). Two are stand-ins rather than observed components:

- **`Wordmark`** — placeholder for `logo.svg`, which was not supplied. Replace it with an `<img>` as soon as the file lands in `assets/`.
- **`Container`** — the spec's container rule (`mx-auto max-w-7xl px-5 sm:px-8`) expressed as a component so kits can't drift.

### Caveats

1. **The repo was never accessible.** Tokens are transcribed from the written spec; if `app/globals.css` has drifted, this system is out of date. Attach the repo and the values can be diffed.
2. **No image or logo assets.** Every cover, portrait, illustration and client logo renders as a flat `--secondary` blueprint block.
3. **Fonts load from Google Fonts** (Inter, Inter Tight, JetBrains Mono — the genuine families, not substitutes). Swap in self-hosted `woff2` + `@font-face` if the repo ships them.
4. **`/evaluate/` wizard not recreated** — its screens were not readable, and inventing them would put non-existent UI into the kit.
