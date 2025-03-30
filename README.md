# BlogHub - A Modern Blog Platform

BlogHub is a modern, responsive blog platform built with Next.js that fetches and displays articles from the Dev.to API. It features a beautiful UI with dark/light theme support, syntax highlighting for code blocks, and a clean, modern design.

## Features

- 📱 Responsive design for all devices
- 🌓 Dark/Light theme support
- 🎨 Modern UI with Tailwind CSS
- 📝 Syntax highlighting for code blocks
- 🔍 Search functionality
- 🏷️ Tag-based article organization
- ⚡ Fast page loads with Next.js
- 🎯 SEO optimized

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Theme**: Custom theme system with CSS variables
- **Code Highlighting**: highlight.js
- **API**: Dev.to API
- **Type Safety**: TypeScript

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bloghub.git
cd bloghub
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```


4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
bloghub/
├── app/
│   ├── components/     # Reusable components
│   ├── context/       # React context providers
│   ├── utils/         # Utility functions
│   ├── globals.css    # Global styles
│   └── page.tsx       # Home page
├── public/            # Static assets
└── package.json       # Project dependencies
```

## How to Use

### Viewing Articles

1. Visit the home page to see a list of latest articles
2. Click on any article to view its full content
3. Use the back button to return to the home page


## Customization

### Theme Colors

You can customize the theme colors by modifying the CSS variables in `app/globals.css`:

```css
:root {
  /* Light theme */
  --background: #f5f5f5;
  --foreground: #1a1b26;
  --primary: #1a1b26;
  /* ... other variables ... */
}

.dark {
  /* Dark theme */
  --background: #1a1b26;
  --foreground: #c0caf5;
  --primary: #c0caf5;
  /* ... other variables ... */
}
```

### Code Highlighting

To change the code highlighting theme:
1. Import a different theme from highlight.js in `ArticleContent.tsx`:
```typescript
import 'highlight.js/styles/github-dark.css'; // Change to your preferred theme
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Dev.to API](https://docs.forem.com/api/) for providing the article data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [highlight.js](https://highlightjs.org/) for code syntax highlighting
