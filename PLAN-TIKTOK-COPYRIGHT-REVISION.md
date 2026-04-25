# Chrome Web Store Resubmission Plan

## Context

"Tiktok eradicator" was removed from the Chrome Web Store on April 21, 2026 following a trademark complaint filed by Corporation Service Company (CSC) on behalf of TikTok (Case 53-1797492). Google confirmed the only realistic path to reinstatement is **submitting a brand-new extension under a new package name** — updating or appealing the removed listing is not an option. The complaint explicitly flagged "Tik" and "Tok" as infringing substrings, not just the full "TikTok" trademark.

---

## Critical constraints (from Google's email)

- The name, subtitle, description, and content must not contain "TikTok", "Tik", or "Tok"
- The Chrome Web Store package name (URL slug) must be entirely new — the old `tiktok-eradicator` listing is dead
- Any attempt to republish under the old listing will be denied

---

## Fix 1: Rename the Extension

**Recommended new name:** `Feed Eradicator`
- No TikTok trademark or substrings ("Tik", "Tok")
- Preserves the "eradicator" personality
- Descriptive: makes clear it blocks feeds

**New description (draft):**
> "Take back control of your time by blocking addictive short-video feeds. Feed Eradicator hides the For You and Following feeds so you can use the platform intentionally."

Note: If "TikTok" must be referenced (e.g., in store keywords/tags), use only `TikTok™` in secondary text — never in the extension name or subtitle.

**Files to update:**
- `browser-extensions/chrome/manifest.json` — `"name"` → `"Feed Eradicator"`, `"description"` → new copy, `"version"` → `"1.1.0"` (bump to mark compliance update)
- `package.json` — `"name"` → `"feed-eradicator"`, `"version"` → `"1.1.0"`

---

## Fix 2: Replace the Icon

`browser-extensions/chrome/images/default.png` uses TikTok's logo (the cyan/pink music note "d") with a red prohibition slash — must be replaced entirely. No part of TikTok's visual identity can appear.

**New icon concept:** An original design — e.g., a generic phone/screen with a feed silhouette and a block/shield symbol. No music notes, no TikTok brand colors.

**Deliverable needed:** A new `default.png` at 128×128px (the manifest uses this file for both 128 and 19 sizes).

If you can provide an SVG or PNG source, I'll handle resizing and manifest wiring. Alternatively, I can generate a minimal programmatic icon.

---

## Fix 3: Write and Host a Privacy Policy

**Required because:** The extension stores data via `chrome.storage.local` (`TIMESPENT_STORE`, `DISABLE_DURATION`, `DISABLE_REEL_OPTIONS`, `DISABLE_DURATION_SELECTION`, custom quotes). Chrome Web Store requires a privacy policy for any data-storing extension.

**Policy content must state:**
- What data is stored (time counter, preferences, custom quotes)
- That all data is stored locally on the user's device via `chrome.storage.local`
- That no data is collected, transmitted, or shared with any third party

**Hosting approach — GitHub Pages:**
1. Create `docs/privacy-policy.html` in the repo
2. Enable GitHub Pages (Settings → Pages → deploy from `main /docs`)
3. Privacy policy URL: `https://reciosonny.github.io/tiktok-reels-eradicator/privacy-policy`
4. Paste this URL into the new Chrome Web Store listing during submission (not in manifest.json)

---

## Fix 4: New Chrome Web Store Submission

Because the old listing is permanently removed, this must be submitted as an entirely new extension:

1. Go to the Chrome Web Store Developer Dashboard
2. Click **"New item"** — do NOT attempt to update the removed listing
3. Upload the new build ZIP
4. Set the new name (`Feed Eradicator`), new description, new icon
5. Paste the privacy policy URL
6. Choose a new package name / URL slug (e.g., `feed-eradicator` — avoid any "tik"/"tok" substring)

---

## Execution Order

1. **Decide/confirm the new name** — "Feed Eradicator" or an alternative (must avoid "Tik"/"Tok")
2. **Create a new icon** — replace `browser-extensions/chrome/images/default.png`
3. **Update `manifest.json`** — name, description, version bump
4. **Update `package.json`** — name, version sync
5. **Create `docs/privacy-policy.html`** — accurate local-storage-only policy text
6. **Enable GitHub Pages** on the repo and verify the policy URL is publicly accessible
7. **Run `pnpm build`** and verify build output is clean
8. **Reload the unpacked extension** in `chrome://extensions` and smoke-test
9. **Submit as a new item** in Chrome Web Store Developer Dashboard

---

## Verification

- Extension loads in Chrome with new name ("Feed Eradicator") visible in `chrome://extensions`
- Icon renders correctly in Chrome toolbar (original design, no TikTok logo)
- Privacy policy page is publicly accessible at the GitHub Pages URL
- Build passes `pnpm check` (type-check) without errors
- Blocking behavior still works on TikTok feed paths after rename
