## Getting Started

### Install dependencies:

```bash
npm install
```

### Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

### Homepage:

- Displays a catalog of content cards fetched from the Content API

- Each card shows:

* Title
* Genres
* Total views

- Filter support for:

* Title (search input)
* Provider (dropdown)
* Genre (checkboxes)

- Clicking a card navigates to a detailed content page

### Content Page:

Detailed view of each content item with description, duration, genre, and view comparison chart.

### Analytics Page:

Displays timeseries data from REST API as interactive charts.

### Technologies Used

- React.js
- Next.js
- Recharts
- TailwindCSS
- TypeScript
