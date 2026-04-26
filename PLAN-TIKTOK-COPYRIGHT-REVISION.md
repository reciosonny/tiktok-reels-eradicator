# Chrome Web Store Resubmission Plan

## Context

"Tiktok Eradicator" was removed from the Chrome Web Store on April 21, 2026 following a trademark complaint filed by Corporation Service Company (CSC) on behalf of TikTok (Case 53-1797492). Google confirmed the only realistic path to reinstatement is **submitting a brand-new extension under a new package name** — updating or appealing the removed listing is not an option. The complaint explicitly flagged "Tik" and "Tok" as infringing substrings, not just the full "TikTok" trademark.

---

## Critical constraints (from Google's email)

- The name, subtitle, description, and content must not contain "TikTok", "Tik", or "Tok"
- The Chrome Web Store package name (URL slug) must be entirely new — the old `tiktok-eradicator` listing is dead
- Any attempt to republish under the old listing will be denied

---

## Fix 1: Rename the Extension
> Note by Sonny: "feed breaker" is the new extension name

**Recommended new name:** `Feed Breaker`
- No TikTok trademark or substrings ("Tik", "Tok")
- Descriptive: makes clear it blocks feeds

**New description (draft):**
> "Take back control of your time by blocking addictive feed and short-form contents."


---

## Fix 2: Write and Host a Privacy Policy

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

## Fix 3: New Chrome Web Store Submission

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
2. **Update `manifest.json`** — name, description, version bump
3. **Update `package.json`** — name, version sync
4. **Create `docs/privacy-policy.html`** — accurate local-storage-only policy text
5. **Enable GitHub Pages** on the repo and verify the policy URL is publicly accessible
6. **Run `pnpm build`** and verify build output is clean
7. **Reload the unpacked extension** in `chrome://extensions` and smoke-test
8. **Submit as a new item** in Chrome Web Store Developer Dashboard

---

## Verification

- Extension loads in Chrome with new name ("Feed Eradicator") visible in `chrome://extensions`
- Icon renders correctly in Chrome toolbar (original design, no TikTok logo)
- Privacy policy page is publicly accessible at the GitHub Pages URL
- Build passes `pnpm check` (type-check) without errors
- Blocking behavior still works on TikTok feed paths after rename
