---
name: IFA Lite responsive layout
description: How responsive overlap/bleed bugs were solved in the IFA Lite React app
---

The IFA Lite app (artifacts/ifa-lite, React 18 + Vite + Tailwind v4) had content overlap and inputs bleeding outside Fieldset cards when the window narrowed.

Rule: any flex or grid child that contains an `<input>` (or other intrinsically-wide control) must carry `min-w-0`, otherwise the default `min-width:auto` prevents shrinking and the control overflows its container. For grid wrappers, apply `[&>*]:min-w-0`; for grid tracks that must shrink, use `minmax(0,1fr)` instead of `1fr`.

**Why:** CSS flex/grid items default to `min-width:auto` = intrinsic content size. Text inputs have an intrinsic min width (~180px), so they refuse to shrink and bleed/overlap at narrow widths.

**How to apply:**
- Shared form controls live in `src/components/shared/FormElements.tsx` — `min-w-0` is baked into FormInput/FormSelect/FormRadioGroup there, so most tabs inherit the fix.
- Fixed multi-column grids (`grid-cols-[1fr_1fr_1fr]`, `grid-cols-2`) must become responsive (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` etc.) or they never collapse.
- Scope `sticky` and `row-span-*` to wide breakpoints (`lg:sticky`, `lg:row-span-5`) so they don't collide when columns stack.
- Layout shell horizontal padding is responsive (`px-4 md:px-8 lg:px-16 2xl:px-[142px]`); tab bar is `overflow-x-auto`; toolbars use `flex-wrap`.
- Wide tables (Equity age-band table) need an `overflow-x-auto` wrapper + `min-w-[...]` on the table.
- The app has no routing; active tab is in-memory React state (`app-context.tsx`, default `'ifa-detail'`). To screenshot a specific tab, temporarily change the `useState<TabId>` default, then revert.
