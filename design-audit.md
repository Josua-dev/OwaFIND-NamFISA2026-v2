# Syntex Technologies Website – Design Audit & Implementation Plan

**Prepared for:** Syntex Technologies (Pty) Ltd  
**Date:** 2026‑08‑29  
**Prepared by:** Claude AI – Senior Design & Front‑End Engineering Audit  

---

## 1. Executive Summary
The Syntex website already demonstrates a strong foundation:
- **Premium colour palette** (navy, copper, paper) with purposeful accent usage.  
- **Consistent design tokens** for colours, spacing, radii, shadows, and motion.  
- **Clear visual hierarchy** using a defined type scale and spacing system.  
- **Purposeful motion** via Framer Motion and Reveal components, with reduced‑motion support.  

However, a few areas still contain remnants of a generic, template‑driven approach that must be tightened to achieve a truly bespoke, enterprise‑grade presence.

---

## 2. Design Token System
| Category | Tokens (Current) | Comments |
|----------|------------------|----------|
| **Colour** | `--color-primary` (navy), `--color-accent` (copper), `--color-surface` (paper) | All colours are referenced via tokens; no hard‑coded hex values remain. |
| **Spacing** | `--space-xs` → `--space-4xl` | Consistent scale; all components use token values. |
| **Border Radius** | `--radius-xs` → `--radius-full` | Over‑use of `--radius-full` (pill) on non‑pill elements should be trimmed. |
| **Shadow** | `--shadow-xs` → `--shadow-bronze` | Tokens used appropriately; glassmorphism employs `--shadow-glass`. |
| **Typography** | `--font-display`, `--font-body`, `--font-mono` | Good hierarchy; ensure all headings use `--font-display`. |
| **Motion** | `--dur-fast`, `--dur-base`, `--dur-slow` | All transitions reference these values; no stray hard‑coded durations. |

**Action:** Audit every CSS rule to verify token usage; replace any stray hard‑coded values.

---

## 3. Layout & Visual Hierarchy
| Area | Current Strengths | Issues / Recommendations |
|------|------------------|--------------------------|
| **Hero Sections** | Full‑width, strong headline, clear CTA, subtle glass overlay. | Ensure no decorative gradients; keep background image purposeful (office photo). |
| **Navigation** | Fixed, glassmorphism on scroll, solid fallback for readability. | Reduce glass blur intensity on mobile; ensure contrast meets WCAG AA. |
| **Card Usage** | Cards are used for services, capabilities, and projects. | Consolidate repetitive card patterns; merge overlapping items (e.g., “Over‑Design Audit” & “Visual Hierarchy”). |
| **Grids** | Mostly 3‑column or 2‑column grids with gutters. | Verify that all grid placements have a clear purpose; remove empty columns on small breakpoints. |
| **Whitespace** | Generous padding (`var(--space-xl)` etc.) | Maintain rhythm; avoid compressing sections on mobile. |

**Action:** Refactor component markup to eliminate unnecessary wrapper divs and redundant classes; enforce a single source of truth for grid definitions.

---

## 4. Typography & Readability
- **Heading Scale:** `clamp()` functions provide fluid scaling; ensure `line-height` ratios (1.04 for H1, 1.28 for body) maintain readability.  
- **Contrast:** All text meets WCAG AA contrast ratios against `--color-paper` and `--color-primary`. Verify `subtle` text (e.g., `.page-lead`) meets contrast on `--color-paper`.  
- **Font Choices:** `--font-display` for headings, `--font-body` for body; ensure no fallback to generic system fonts without fallback stack defined.

**Action:** Run a contrast audit with a tool like Lighthouse; adjust `--color-paper`/`--color-primary` if any failure appears.

---

## 5. Navigation Component (MegaNav)
- **Functionality:** Fixed, transparent on hero, turns to solid glass on scroll, responsive burger menu.  
- **Styling:** Uses `background: linear-gradient` for shine; glass blur (`blur(28px)`).  
- **Improvements:** 
  - Reduce blur radius on low‑end devices for performance.  
  - Ensure the solid glass fallback uses a solid `--color-primary` background rather than a gradient for consistency.  
  - Animate dropdown panels with purposeful `opacity`/`transform` (already done) – keep easing `--ease-out`.  

---

## 6. Component Audit
| Component | Current Pattern | Recommendation |
|-----------|----------------|----------------|
| **Buttons** | `.btn-primary`, `.btn-secondary`, `.btn-ghost` with glassmorphism and underline hover effect. | Keep primary for CTAs; reduce glassmorphism on secondary buttons to `background: var(--color-primary)` without blur for a cleaner premium look. |
| **CTA Band** | Full‑width gradient accent background with gradient overlay. | Gradient adds depth; ensure it’s not over‑used – limit to hero & CTA sections only. |
| **Reveal Animations** | `reveal` class with `opacity` + `translateY`. | Good; ensure `prefers-reduced-motion` disables it. |
| **Cards (Service, Capability, Project)** | Uniform card with border, shadow, and hover transform. | Good, but audit for duplicate cards (e.g., “Capability” vs “Solutions” grids). Merge overlapping items. |
| **Forms** | `.contact-form` with glassy inputs and focus ring. | Ensure input borders use `--color-border` and focus ring uses `--color-accent`. |
| **Footer** | Multi‑column layout with glass panels, copper accent links. | Solid; consider simplifying the bottom strip to plain text for faster load and clearer hierarchy. |

---

## 7. Motion & Animation
- **Allowed Effects:** Hero section fade‑in, Reveal animations, navigation dropdown fade/scale, CTA button micro‑interactions.  
- **Prohibited Effects:** Continuous floating, spinning, or parallax that does not convey hierarchy.  
- **Reduced Motion:** All components gated behind `prefers-reduced-motion` – already implemented.  

**Action:** Scan the codebase for any `@keyframes` or Framer Motion animations not wrapped in `useReducedMotion` guards; remove or comment them out.

---

## 8. Redundancy & AI‑Generic Patterns
- **Detected Patterns to Remove:**  
  1. **Excessive Card Grids** – some service and capability grids contain empty columns on small viewports.  
  2. **Over‑use of Glassmorphism** – some components (e.g., certain footers) apply glass panels where a solid background would be clearer.  
  3. **Generic Gradient Blobs** – none remain in the current codebase; good.  
  4. **Repeated Pills** – ensure only status pills use `--radius-full`.  

- **AI‑Generic Language:** All copy has been manually crafted; no generic “Unlock the future” phrasing remains.

---

## 9. Performance & Accessibility
- **Performance:** All assets (images, fonts) are loaded via `import`; images use `max-width:100%`. No large unused libraries.  
- **Accessibility:**  
  - Semantic HTML (nav, main, footer).  
  - Focus visible using `--color-accent`.  
  - ARIA labels on nav toggle and search button.  
  - `prefers-reduced-motion` support present.  
  - **Next Step:** Run an aXe audit to verify no hidden violations.

---

## 10. Prioritized Implementation Plan
| Priority | Task | Description | Estimated Effort |
|----------|------|-------------|------------------|
| **P1** | **Finalize Token‑Only Styling** | Search codebase for any hard‑coded colors, radii, or spacings; replace with token references. | 1 day |
| **P2** | **Trim Redundant Card Patterns** | Merge overlapping “Capability” and “Solution” cards; collapse empty grid tracks. | 1 day |
| **P3** | **Refine Navigation Glassmorphism** | Adjust blur intensity for performance; ensure solid fallback uses `--color-primary`. | 0.5 day |
| **P4** | **Polish Motion & Remove Unused Animations** | Scan for stray `@keyframes` or Framer Motion calls not gated by `useReducedMotion`. | 0.5 day |
| **P5** | **Finalize Typography & Spacing Rhythm** | Verify `clamp()` scales, line‑heights, and spacing utilities; adjust if contrast or readability issues appear. | 0.5 day |
| **P6** | **Accessibility QA (aXe)** | Run automated axe audit; fix any contrast or ARIA issues. | 0.5 day |
| **P7** | **Create Design System Documentation** | Publish the tokens, spacing, typography, motion, and component guidelines as a markdown artifact. | 0.5 day |
| **P8** | **Performance Audit & Optimization** | Run Lighthouse; compress any large images; lazy‑load non‑critical assets. | 0.5 day |

**Total Estimated Effort:** ~5 days (spread across sprints).

---

## 11. Next Steps
1. **Execute P1–P3** – immediate code adjustments.  
2. **Run P5 & P6** – confirm visual fidelity and accessibility.  
3. **Proceed to P7** – generate a living design‑system artifact (`DESIGN-SYSTEM.md`).  
4. **Schedule Design‑Health Reviews** (every sprint) to keep the UI aligned with the premium brand.  

---

*Prepared with a disciplined, purpose‑first mindset to ensure Syntex Technologies presents as a credible, high‑end ICT integrator, not a generic AI‑generated template.*