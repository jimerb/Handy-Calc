# Deploy.md — Handy Calc as a standalone site

## What to use from this project

Two files, and they must sit in the **same folder**:

| File | Why |
| --- | --- |
| `index.html` | The whole app: markup, styles, and all the calculation/persistence logic. |
| `support.js` | The small runtime that the HTML file loads. Without it the page renders blank. |

Nothing else in the project is needed. `uploads/` and `.thumbnail` are workspace artifacts.

Recommended local layout:

```
task-calculator/
├── index.html        
├── support.js
└── README.md
```

Rename the HTML file to `index.html` so the site serves at the bare domain. Renaming is safe as long as `support.js` stays a sibling — the HTML references it by relative path (`support.js`), not by absolute URL.

## Hosting

The app is fully static: no server code, no database, no API keys, no build step. Any static host works.

**Local testing** — open `index.html` directly, or run `python3 -m http.server` in the folder and visit `http://localhost:8000`. Serving over `http://` or `https://` is preferable to `file://`, because browsers scope stored data per origin and `file://` origins are treated inconsistently.

One requirement worth stating: serve over **HTTPS** and keep the site on a **stable domain**. Browser storage is keyed to the origin, so moving the site from one domain to another, or switching between `http` and `https`, will look to the browser like a different site and the saved state will not follow.

## How the "remembers across sessions" behavior works

All state lives in the browser's `localStorage` under a single key, `taskcalc.v2`. Nothing is transmitted anywhere — there is no account, no sync, no server write. The stored value is a small JSON object holding the start time, the percent-done figure, and the days/hours/minutes fields.

The write happens on every input change. The read happens once on page load: if a saved object exists, the fields are repopulated from it; if not, the app seeds a sample start time and percentage so the interface isn't empty on a first visit.

What this gives the user: shut the browser off, come back the next day, and the inputs are exactly as they were left. The calculations are then re-evaluated against the **current** clock. So a task started at 9:00 AM yesterday and marked 42% complete still reads correctly today — the elapsed time has grown, the projected finish has moved out accordingly, and the Time-left countdown on the duration tab keeps ticking against the live clock.

Two consequences to document for users, because they are consequences of the design rather than bugs:

- Storage is per browser and per device. Chrome on the laptop and Safari on the phone hold separate state. Private/incognito windows discard it on close.
- Clearing site data, "clear cookies and other site data", or an aggressive privacy extension will wipe the saved task. Nothing is recoverable, because nothing left the machine.

If a future version needs to survive across devices, that is the point at which a backend becomes necessary. It isn't necessary now, and the current design deliberately avoids it.

## README.md to write

Write a `README.md` at the repo root aimed at someone who lands on the project cold. Keep it to a single screen. Cover, in this order:

1. **What it is** — one or two sentences. A calculator that answers "when will this finish?" two ways: from a start time plus a percent-complete figure, or from a duration you already know.
2. **Live link** — the deployed URL.
3. **The two tabs** — *By progress*: enter when the task started and how far along it is; get an estimated finish, elapsed, and remaining. *By duration*: enter days/hours/minutes remaining; get the wall-clock finish time and a live countdown to it.
4. **Nothing updates on its own** — say this plainly, because it is the app's central behavior. The percent-complete figure can only come from the user, so estimates are re-calculated when an input changes, and the "Last updated" / "Calculated" stamp shows which clock reading a given estimate was based on. The one exception is the Time-left countdown, which ticks live.
5. **Your data stays in your browser** — the `localStorage` explanation above, condensed to three or four sentences, including the per-browser and clear-site-data caveats.
6. **Running it locally** — clone, then either open `index.html` or serve the folder with `python3 -m http.server`.
7. **Files** — `index.html` and `support.js`, and the note that they must stay side by side.
8. **License** — pick one, MIT if you have no preference.

Skip badges, skip a feature bullet list that repeats section 3, and skip a roadmap unless you actually intend to build against it.

## Pre-launch checks

- Load the site, enter a start time and a percentage, close the tab entirely, reopen it — the values should return and the finish estimate should reflect today's clock.
- Confirm the − / + buttons step the percentage by 0.1 and that the slider fills.
- Confirm the "?" panel opens on both tabs and shows tab-specific instructions.
- Check the layout at a narrow phone width; the card is capped at 440px and should center with margin on either side.
- Confirm `support.js` returns 200 in the network panel. A blank page almost always means that file is missing or misplaced.
