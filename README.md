# Inner Map

Your compass for the inner journey—where psychology meets timeless wisdom.

## 1 · Why Inner Map?

Modern life bombards us with personality quizzes that slap on labels and call it a day. Inner Map goes further. It blends contemporary psychology with the tri-path teaching of the Bhagavad Gita—Devotion (Bhakti), Knowledge (Jñāna), and Action (Karma)—to reveal not just who you are, but how you can grow.

## 2 · What It Does

- **Wisdom Quote Library** — Over 500 Bhagavad Gita verses power the quote cards.
- **30-Question Assessment** — A carefully weighted quiz gauges your tendencies across Devotion, Knowledge, and Action.
- **Hybrid Archetype Engine** — Percentile-based scoring maps you to vivid personas such as “Pure Devotee,” “Sage-Warrior,” or “Seeker-Scholar.”
- **Personalized Guidance** — Each archetype unlocks curated quotes, daily practices, and recommended sacred texts.
- **Practice Tracker** — Check in on meditation, study, or service; watch streaks turn into achievements.
- **Progress Profile** — A dashboard shows your evolving balance of the three paths and celebrates milestones.
- **Responsive UI** — Optimized layouts scale across devices with a sleek dark mode.

## 3 · Under the Hood

| Layer        | Tech                                   |
| ------------ | -------------------------------------- |
| UI / State   | React (v18+) + Hooks                   |
| Styling      | Tailwind CSS + Framer Motion animations |
| Persistence  | Browser localStorage (no back-end required) |
| Build Tooling| Vite (fast dev server & bundle)        |

## 4 · Getting Started

```bash
# 1 Clone
$ git clone https://github.com/your-org/inner-map.git
$ cd inner-map

# 2 Install deps
$ npm install

# 3 Run locally
$ npm run dev   # open http://localhost:5173

# 4 Build for prod
$ npm run build
```

No database, keys, or server setup—everything lives in the browser.

## 5 · Project Structure

```
src/
├─ components/     # Reusable UI blocks
├─ data/           # Question sets & archetype definitions
├─ hooks/          # Custom React hooks
├─ pages/          # Landing, Quiz, Results, Profile
└─ utils/          # Scoring & mapping logic
```

## 6 · Roadmap

- ☑ Dark-mode toggle
- ☑ Achievement pop-ups with confetti
- ☐ Export/share results card (PNG)
- ☐ i18n (Hindi + Spanish)
- ☐ Progressive Web App (offline mode)

## 7 · Contributing

Fork & create a feature branch.

Follow Conventional Commits for clear history.

Run `npm test` & `npm run lint` before PRs.

PRs require at least one approving review.

## 8 · License

MIT © 2025 KitchenCraft Labs

## 9 · Acknowledgments

Inspiration from the Bhagavad Gita, Swami Vivekananda’s lectures, and modern personality research.

UI components by shadcn/ui and icons from lucide-react.

"As the mind, so the world." — Upanishads


## 10 · PDF Guides

Custom PDF resources for each personality type live in `public/pdfs/`. Feel free to replace the placeholder files with your own guides or translations.
