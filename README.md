# Behind the Walls Mobile App

Official mobile app for [Bill Glass Behind the Walls](https://www.behindthewalls.com) — training, sending, and winning one soul at a time since 1969.

The website remains the source of truth for registration and donations; this app mirrors key ministry content and loads scraped event/position data from GitHub or bundled JSON when offline.

---

## Features

- Home, About, Churches, Events, Ways to Give, Media, Equipping Volunteers, Store, Prayer Requests, Profile
- Evangelism events with website-style sorting (by date, alphabetically, US-only, by state)
- Africa evangelism events, registration guides, and golf challenge pages
- Remote JSON feeds with bundled fallbacks for events and job opportunities

---

## Tech stack

- **Framework:** Expo SDK 54 + React Native
- **Language:** TypeScript
- **Navigation:** React Navigation (native stack)
- **Data:** Scraped JSON in `assets/` + GitHub raw URLs (see `src/config/`)

---

## Project layout

```
├── App.tsx                 # App entry
├── app.json                # Expo config
├── assets/                 # Images, video, scraped JSON
├── scripts/                # Event/position scrapers, dev build helpers
├── src/
│   ├── components/         # Shared UI (Navbar, HomeQuickLinks)
│   ├── config/             # Remote feed URLs, register step images
│   ├── content/            # Static copy (e.g. registration steps)
│   ├── navigation/         # Stack navigator
│   ├── screens/            # Feature screens by area
│   ├── services/           # Events & positions loading
│   ├── styles/             # Shared StyleSheet
│   ├── types/              # TypeScript types for scraped data
│   └── utils/              # Shared helpers (feed picker, event status)
└── package.json
```

---

## Development

```bash
npm install
npm start              # Expo Go (LAN)
npm run start:go       # Expo Go via tunnel (hotspot / remote devices)
npm run ios            # Native iOS dev build
npm run android        # Native Android dev build
npm run scrape:events  # Refresh assets/events.json from the website
npm run scrape:positions
npm run lint
```

GitHub Actions (`.github/workflows/`) run the scrapers on a schedule and commit updated JSON to `main`.

---

## License

Maintained by Bill Glass Behind the Walls. All rights reserved.

For media usage, partnerships, or content inquiries, contact the ministry through [behindthewalls.com](https://www.behindthewalls.com).
