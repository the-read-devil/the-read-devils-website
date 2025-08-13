## Product Requirements Document (PRD): The Read Devils Reading Club

### Product Overview
- **Product name**: The Read Devils Reading Club
- **Type**: Single-page static, invite-only marketing site
- **Primary goal**: Persuade visitors to request an invite by conveying the value, vibe, and activities of the club.
- **Secondary goals**: Establish a distinctive brand presence; make contact effortless via a prefilled mailto link; set a foundation for future member-only features.

### Scope
- **In scope (MVP)**
  - Single-page public website with sections outlined below.
  - Prominent, sticky “Request Invite” call-to-action (mailto) with prefilled template.
  - English-only content; India-focused audience.
  - Branding aligned with provided logo (black/red/white).
  - No member photos, event galleries, or CMS.
- **Out of scope (MVP)**
  - User accounts, private areas, or authentication.
  - Web forms, analytics, CMS, or third-party integrations.
  - Legal/privacy policy pages.

### Audience and Positioning
- **Audience**: People of any age in India who read or want to read; those who like discussing art, music, literature, poems, and films.
- **Positioning**: An invite-only circle for disciplined reading, energizing conversations, and real-life hangouts.
- **Tone**: Bold, energetic, inclusive; exclusive in format (invite-only) yet welcoming in spirit.

### Brand Guidelines
- **Colors**
  - Black: `#0E0E0E` (primary background)
  - Red: `#D13B3B` (accents, CTAs); hover `#B73333`
  - White: `#FFFFFF` (text on dark backgrounds)
- **Typography**
  - Headings: strong display family (e.g., League Spartan/Oswald/Bebas Neue) or system display equivalent.
  - Body: clean sans-serif (e.g., Inter, Work Sans, or system stack).
- **Imagery**
  - Logo-centric; no member/event photos in MVP.
  - Use subtle shapes/lines inspired by book spines and devil-horn accents from the logo.

### Information Architecture (Single Page)
1. **Hero** (`#top`)
   - Logo, headline, short subhead, primary CTA (Request Invite).
2. **Why Join** (`#why`)
   - Persuasive value propositions (5–6 bullets).
3. **What You’ll Do** (`#activities`)
   - Activity teasers; no photos.
4. **How It Works** (`#how`)
   - Simple 3–5 step explanation; invite-only.
5. **FAQs** (`#faqs`)
   - 6–8 concise Q&As.
6. **Request Invite** (`#invite`)
   - Mailto CTA with prefilled body; brief expectations.
7. **Footer**
   - Minimal links; copyright note; repeated CTA.

### Content Requirements (English-only)
- **Hero**
  - Title: “The Read Devils Reading Club”
  - Subhead (choose one; editable):
    - “Turn pages into experiences. Join a circle that actually reads.”
    - “Your new reading habit starts with the right people.”
  - Primary CTA: “Request Invite” (sticky and in-section)

- **Why Join (value props)**
  - Build a reading habit with gentle accountability.
  - Share “mind-blowing moments” from books, films, music, and art.
  - Real conversations, zero-judgement.
  - Small cohorts and real-world meetups when possible.
  - Curated prompts and theme months to keep you inspired.
  - Fun over pressure; progress over perfection.

- **What You’ll Do (activity teasers)**
  - 20-page/day commitment sprints.
  - “Mind-blowing moments” threads to swap insights.
  - Theme months (poetry, short stories, world cinema, etc.).
  - Lunches/outings, occasional book swaps, museum/film nights.

- **How It Works (invite-only)**
  - Request an invite (limited seats; we keep cohorts small).
  - Pick a reading pledge—pages per day or week.
  - Show up for check-ins; share one insight that moved you.
  - Join city meetups when you can.

- **FAQs (examples; editable)**
  - Who can join? Anyone curious about reading and conversations.
  - Is there a fee? Currently free; some events may be pay-your-own-way.
  - Online or in person? Both—online discussions plus optional city meetups.
  - Why invite-only? To keep groups focused, respectful, and consistent.
  - Do I need to be a heavy reader? No—beginners welcome.
  - Where are you based? Mostly India; online is open.

- **Request Invite**
  - Copy: “We review invite requests periodically. If selected, you’ll hear back within 1–2 weeks.”
  - CTA (prefilled mailto link):
    - `mailto:read.devils@gmail.com?subject=Request%20Invite%20-%20Read%20Devils&body=Name%3A%0ACity%3A%0AWhy%20I%20want%20to%20join%3A%0AFavorite%20book%20or%20film%3A%0AReferrer%20(if%20any)%3A`

### Functional Requirements
- Sticky CTA button that persists after scrolling past the hero.
- Smooth in-page anchor navigation.
- Mailto link opens default mail client with prefilled subject/body.
- Responsive across 320px–1920px, mobile-first layout.
- Favicon set and social meta for clean previews.

### Non-Functional Requirements
- **Accessibility (WCAG 2.1 AA)**
  - Color contrast ≥ 4.5:1 for text; visible focus states; keyboard navigable; ARIA landmarks.
- **Performance**
  - Lighthouse (mobile) ≥ 95 across Performance/Accessibility/Best Practices/SEO.
  - Page weight target ≤ 250KB excluding fonts; limit JS to essential interactions.
  - Inline critical CSS; lazy-load any noncritical images/icons.
- **SEO**
  - Title: “The Read Devils Reading Club — Invite-Only Readers’ Circle”
  - Meta description: 150–160 chars describing invite-only reading club in India.
  - Open Graph/Twitter: title, description, social image (1200×630) based on square logo.

### Technical Approach
- Stack: Pure HTML + CSS (or utility-first CSS) + minimal vanilla JS for anchors and sticky CTA.
- Hosting: Any static host (Vercel/Netlify/Cloudflare/GitHub Pages).
- Dependencies: None required; prefer system fonts or one display font with `font-display: swap`.

### Assets
- Use the provided logo to generate and include:
  - `logo.svg` (vectorized from the original file)
  - `logo-square.png` (minimum 1024×1024) for icons/social images
  - Favicons: 32×32, 48×48, 180×180 (apple touch), 512×512 (web app)
  - Social share image `og-image.png` (1200×630) derived from the square logo
- Provide a monochrome/knockout variant for dark/light contexts (optional for MVP).

### Future Roadmap (Post-MVP)
- Replace mailto with a request form (spam-safe, validation, backend or serverless forms).
- Public read-only events calendar; later a private member area.
- Lightweight CMS (Notion/Airtable) to edit activities/events.
- Newsletter and analytics.
- Photo galleries and member stories with consent workflows.

### Risks and Mitigations
- **Mailto friction**: Prefilled body, duplicate CTAs, clear response-time note.
- **No photos at launch**: Use strong copy, clear visual hierarchy, and brand elements.
- **Contrast on dark theme**: Enforce AA, test with accessibility tooling.

### Acceptance Criteria
- All sections present and visually consistent with brand.
- Sticky CTA works and remains visible; mailto opens with prefilled fields.
- Passes accessibility keyboard navigation and contrast checks.
- Mobile Lighthouse ≥ 95 in all categories.
- Favicons and OG/Twitter previews render correctly.
- Text content matches approved copy; no member/event imagery included.

### Launch Checklist
- Validate mailto across major OS/browsers and mobile clients.
- Verify anchors, skip-to-content link, and focus order.
- Check contrast with tooling (e.g., axe/Accessibility Insights).
- Confirm OG/Twitter previews via validators.
- Deploy to chosen static host; connect custom domain when available.

### Appendix: Mailto CTA (for implementation)
```
mailto:read.devils@gmail.com?subject=Request%20Invite%20-%20Read%20Devils&body=Name%3A%0ACity%3A%0AWhy%20I%20want%20to%20join%3A%0AFavorite%20book%20or%20film%3A%0AReferrer%20(if%20any)%3A
```


