# InnerMap

InnerMap is a reflective self-knowledge app that blends contemporary psychology with the three paths of the Bhagavad Gita: Devotion (Bhakti), Knowledge (Jñāna), and Action (Karma).

The experience maps a person’s natural balance across these three paths, translates the result into one of six archetypes, and turns that reading into daily contemplative practice.

## Experience

- 30-question reflective assessment
- Animated three-path “Inner Compass” visualization
- Six pure and hybrid spiritual archetypes
- Personalized Gita guidance and daily insights
- Five-question follow-up reading
- Daily practice tracker and streak milestones
- Downloadable wisdom cards and archetype PDF guides
- Warm light and reverent dark themes
- Fully designed desktop and mobile navigation
- Browser-only persistence; no database or API keys required

## Run locally

```bash
git clone https://github.com/Niamish/InnerMap.git
cd InnerMap
npm install
npm run dev
```

Vite will print the local preview URL. The sign-in screen is intentionally a demo gate: any non-empty email and passphrase will continue.

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
public/
  pdfs/                 Archetype guides
src/
  data/                 Questions, guidance, archetypes, and PDFs
  utils/quiz.js         Scoring and canvas text utilities
  InnerMapApp.jsx       Product screens and interactions
  quoteLibrary.js       Wisdom quote library
  styles.css            Responsive visual system and motion
  main.jsx              React entry point
index.html              Vite document shell and metadata
package.json            Scripts and dependencies
```

## Technology

- React 19
- Vite 7
- Local Fontsource packages for Cormorant Garamond and DM Sans
- Modern CSS with OKLCH color, container-ready tokens, reduced-motion support, and responsive layouts
- `localStorage` for theme and assessment persistence

## Privacy

InnerMap does not send assessment answers or credentials anywhere. The current prototype stores the completed assessment result and theme preference in the local browser only.

## License

MIT © 2025 KitchenCraft Labs
