# Carbon Sentinel

**By Alex Mureti**  
**Built with React & Vite**  
**October 2025**

## What's This About?

Carbon Sentinel is my take on fighting climate change in Kenya—one hotspot at a time. It's a web app where everyday folks like me can spot and report carbon pollution (think waste dumps burning or factory smoke), and local councils get the alerts to act fast. The idea? Turn "that's bad" into "we fixed it" by making reporting easy and data live. Started as a Phase 2 project, but it's got legs for real impact—starting in Nairobi and Rift Valley, where the air's thick with the stuff.

I built this because I've seen the dumps, felt the heat waves, and know we need tools that put power in people's hands, not just government's. No fancy stuff yet, but it's functional: Map shows live air data, report a spot with your phone, and watch it ping the right people.

## Why It Matters

Kenya's pumping out 20 million tons of CO2 a year from factories, farms, and trash piles. Methane from rotting waste is even worse—it traps heat like crazy. Citizens see it daily but have no way to flag it quick. Councils want to clean up but get buried in reports. This app bridges that: Live map from free APIs, easy photo pins, instant alerts. Goal? Cut emissions 10k tons a year in hot zones, build trust between us and them.

## Features (MVP Edition)

- **Live Map**: Pulls real air quality data (CO2 proxies like PM2.5) for Kenyan cities—pins hotspots on Leaflet map.
- **Report a Spot**: Snap a photo, add location/description, send to "council queue" (Firebase storage for now).
- **Citizen View**: See the map, submit reports, track what's happening nearby.
- **Council View**: Log in, review reports, mark as "fixed" (social auth via Google for quick access).
- **Responsive**: Works on phone or laptop—Tallwind makes it flex without breaking.

Future: AI to predict spikes, SMS alerts, partner with Octavia Carbon for capture teams.

## Tech Stack

Kept it lean and mean:

| Tool | Why I Chose It |
|------|----------------|
| React + Vite | Fast setup, hot reload—Vite's quicker than CRA for prototyping. |
| Tailwind CSS | Utility classes for quick, mobile-first styles—no CSS hell. |
| Firebase | Auth (email + Google/GitHub social), Firestore for reports/alerts—serverless, scales free. |
| Leaflet + React-Leaflet | Free maps, GPS pins—open-source, no API keys. |
| OpenAQ API | Live air data for Kenya stations—no signup, real-time CO2 proxies. |
| React Router | Nav between views without full reloads. |
| GitHub Actions + Netlify | Auto-deploy on push—Actions runs tests, Netlify hosts free.

No JSON Server—live API only, as required.

## How to Run It

1. **Clone & Install**
git clone https://github.com/alexmureti/carbon-sentinel.git
cd carbon-sentinel
npm install
text2. **Firebase Setup** (One-Time)  
- Go to console.firebase.google.com, create project "carbon-sentinel".
- Enable Auth (Email + Google/GitHub).
- Copy config to src/services/firebase.js (template in code).
- `npm install firebase`

3. **Start the App**
npm run dev
textOpens at http://localhost:5173. Test report a spot, see it on map.

4. **Deploy**  
- Push to GitHub.
- Netlify: Connect repo, auto-builds.
- Actions: .github/workflows/deploy.yml runs on push.

API Key? None—OpenAQ's open.

## Folder Structure
carbon-sentinel/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── MapView.js
│   │   ├── ReportForm.js
│   │   ├── ReportList.js
│   │   └── CouncilDashboard.js
│   ├── services/
│   │   └── firebase.js
│   ├── App.js
│   ├── main.jsx
│   └── index.css
├── .github/workflows/
│   └── deploy.yml
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
text## Learning & Challenges

This was my first Vite project—faster builds, but figuring Router + Leaflet CORS was a grind. useEffect for API fetch was new (runs on load, cleans up on unmount). Tailwind saved hours on responsive grid. Proud of the live data flow—no mocks, just real Kenyan air stats.

## Future Ideas

- AI image analysis for report photos (spot smoke automatically).
- SMS alerts via Twilio for councils.
- Expand to East Africa—Uganda/Rwanda stations.
- Carbon credit tracker for users who report.

