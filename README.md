# Seite100 — Appointment booking test website

**English** · [Deutsch](README-DE.md) · [فارسی](README-FA.md)

A static test website for a separate browser booking helper. No real appointments are booked.

## What to push to GitHub

Push the **contents of this `Seite100` folder** to your website repository. A ZIP file is not needed. The folder already contains the HTML pages, JavaScript, styles, logo, deployment configuration and these guides.

Keep the separate `Buchungshelfer-Chrome` extension on your computer. It does not need to be published with the website. Keep your private `ContactInfo-Test-3.html` file outside the website repository; the extension loads that file directly from your computer.

## Pages

| Page | Purpose |
| --- | --- |
| `index.html` | Appointment dates and expandable time buttons |
| `Settings.html` | Set when appointments become available |
| `ContactInfo-Test.html` | Empty contact form after selecting a time |
| `ErrorPage.html` | Conflict message and **Select another time** |
| `Success.html` | Confirmed test appointment, attempt count and elapsed time |

The website does not select appointments, fill forms or refresh automatically. Those actions belong to the separate Chrome extension.

## Set up a test

1. Open the published `Settings.html` page in Chrome.
2. Choose a future release date and time, then click **Freigabe speichern**. For a quick test, use **In 30 Sekunden öffnen**.
3. Open the appointment page using the link on the settings page.
4. Keep both pages on the same website and in the same Chrome profile. Settings are stored in that browser, not shared between devices or browser profiles.
5. Start the separate extension on the appointment tab, or select a time manually once it becomes available.

The appointment page reads availability when loaded or refreshed. The test booking window stays open for five minutes. Saving a new release time starts a new test.

The first Confirm attempt deliberately shows the “already booked by another person” error. A subsequent available appointment can succeed. This makes the retry flow testable.

## Appointment times

Each future date expands into the three rows shown in the reference screenshot:

| Row | Times |
| --- | --- |
| 1 | 9:30 a.m. · 9:45 a.m. |
| 2 | 10:15 a.m. · 10:30 a.m. |
| 3 | 11:00 a.m. · 11:15 a.m. · 11:45 a.m. |

The date list reproduces the captured reference: twelve unavailable dates and four later dates. This fixture does not represent current appointment availability or competition between real users.

## Push from a terminal

Open a terminal in this `Seite100` folder. For a **new, empty GitHub repository**, use:

```powershell
git init
git add .
git commit -m "Add appointment booking test website"
git branch -M main
git remote add origin https://github.com/ArmanDinarvand/tonder_termin.git
git push -u origin main
```

Target repository: [ArmanDinarvand/tonder_termin](https://github.com/ArmanDinarvand/tonder_termin). These instructions do not create a GitHub repository. If the remote already contains files or commits, clone it first and copy the website files into that checkout, then commit and push normally. Do not force-push over existing work.

## Publish

This is a static HTML website with no build step, package installation or backend. Connect the GitHub website repository to your hosting service. When this folder's contents are at the repository root, use that root as the website directory. If you instead commit the whole parent project, use `Seite100` as the website directory.

`index.html` is the entry page. `vercel.json` includes a route from `/` to `index.html`. Open `/Settings.html` separately to set the release time. Publishing has not been performed as part of creating these files.

## Separate Chrome helper

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**, choose **Load unpacked**, and select the separate `Buchungshelfer-Chrome` folder containing `manifest.json`.
3. Open your published test appointment page and click the extension icon.
4. Load your `ContactInfo-Test-3.html` file, or choose the sample-data button.
5. Choose the appointment date and preferred time; the defaults are November 26, 2026 and 10:15 a.m.
6. Click **Auf dieser Testseite starten**.

The helper refreshes every ten seconds while waiting, opens the date, chooses 10:15, fills the form and clicks Confirm. Following an explicit appointment conflict, it chooses another available time and retries. Later dates are only allowed when you select that option. It stops on success, an unknown error, exhausted availability, the attempt limit or the fifteen-minute time limit. **Stoppen** stops it manually; **Angaben löschen** clears the loaded profile.

The helper currently supports this test website over HTTP/HTTPS. It rejects the real booking domain and local `file://` pages. Keep Chrome and the tab open during a run. Its temporary access uses Chrome's [activeTab permission](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab).

## Verification

18 automated checks passed, covering release timing, screenshot time labels and row grouping, form filling, conflict/retry/success, stopping, profile import and extension messaging. Tests live separately in the parent project's `Pruefung` folder. A visible run of the installed extension in Chrome has not yet been completed; no five-second booking guarantee is made.
