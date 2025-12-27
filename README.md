# Kupaa Health - Portfolio & E-Commerce Template

A modern portfolio and e-commerce template built with Vite, React, TypeScript, and Tailwind CSS.

## Features

- ⚡ Vite for blazing fast development
- ⚛️ React 18 with TypeScript
- 🎨 Tailwind CSS with custom color palette
- 📦 JSON-based data management
- 📱 Responsive design
- 🛍️ E-commerce product showcase
- 📰 Portfolio/blog section

## Color Palette

- Primary: `#dad7cd`
- Secondary: `#a3b18a`
- Tertiary: `#588157`
- Quaternary: `#3a5a40`
- Quinary: `#344e41`

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/      # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Products.tsx
│   ├── Portfolio.tsx
│   └── Footer.tsx
├── data/           # JSON data files
│   ├── hero.json
│   ├── products.json
│   └── portfolio.json
├── App.tsx         # Main app component
├── main.tsx        # Entry point
└── index.css       # Global styles
```

## Customization

All content is managed through JSON files in the `src/data` directory:

- `hero.json` - Hero section content
- `products.json` - E-commerce products
- `portfolio.json` - Portfolio/blog items

Edit these files to customize your content without touching the component code.

## License

MIT
