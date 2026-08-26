# Handy Calc

Handy Calc is a small browser-based tool for answering “when will this finish?” It can estimate a finish time from the progress made so far or add a known duration to the current time.

## Open the app

[Open Handy Calc on ChatGPT Sites](https://handy-calc.jimerb.chatgpt.site/)

[GitHub Pages mirror](https://jimerb.github.io/Handy-Calc/)

[Open the local preview](http://127.0.0.1:8000/)

The preview link works while a local web server is running from this folder. The app is fully static, so hosted deployment is not needed for development or testing.

The responsive layout targets current desktop Chrome, Chrome on iOS, and Safari across phone and tablet widths.

## Calculation modes

### By progress

Enter when the task started and its current percent complete. The app estimates the finish date and time and shows elapsed and remaining time.

### By duration

Enter the days, hours, and minutes remaining. The app shows the projected wall-clock finish time and a live countdown.

## Updates and saved data

Progress does not update automatically because the app cannot know how much work has been completed. Estimates are recalculated whenever an input changes, and the **Calculated** or **Last updated** stamp identifies the clock reading used. Only the duration countdown continues ticking live.

Inputs are saved in the browser under the `localStorage` key `taskcalc.v2`; nothing is sent to a server. Saved values are separate for each browser and device, do not survive a private/incognito session, and are lost if site data is cleared.

## Run locally

Keep `index.html` and `support.js` together. Either open `index.html` directly or, preferably, serve this folder over HTTP:

```powershell
python -m http.server 8000
```

Then open [http://127.0.0.1:8000/](http://127.0.0.1:8000/). There is no build step, backend, database, or API key. An internet connection is currently required to load React from unpkg and the Google Fonts used by the interface.

## Files

- `index.html` contains the interface, calculation logic, and browser-storage behavior.
- `support.js` provides the runtime used to render the app. Without it, the page is blank.

## License

MIT
