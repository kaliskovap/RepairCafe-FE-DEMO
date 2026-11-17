# Repair Café – React demo (Figma-aligned)

## Run locally
1. Extract the ZIP.
2. Open the project folder in a terminal.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite (normally http://localhost:5173).

## Build for Vercel
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Demo notes
- The initial screen is the public Repair Café landing page.
- The top preview bar switches between desktop and mobile widths.
- Use the in-app role selector on signed-in screens to switch between volunteer, customer and administrator flows.
- The interface uses local demo data only. It does not connect to a backend, database, OAuth provider or REST API.
- Source photography and the public landing-page hero/workflow artwork are cropped from the supplied Figma screen exports. The supplied screen exports are desktop designs; the mobile layout is a responsive adaptation, not a separate mobile Figma specification.


## Landing page update
- The public landing hero now uses a dedicated high-resolution photographic background.
- Hero heading, body copy and buttons are live React/HTML elements (not flattened into a screenshot), so text stays crisp and controls work.
- The 'O nás' navigation button scrolls to the information/cards section. 'Přihlásit se' enters the volunteer demo view.
