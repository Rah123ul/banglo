# SNS Club React Website

A modern React-based website for the Science and Spirituality (SNS) Club at NIT Calicut.

## Features

- ✨ Modern React architecture with React Router
- 🎨 Responsive design with Tailwind CSS
- 🔄 Component-based structure for easy maintenance
- 🎭 Smooth animations with GSAP
- 📱 Mobile-friendly navigation
- 🎯 SEO-friendly routing

## Project Structure

```
sns-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js       # Reusable header component
│   │   └── Footer.js       # Reusable footer component
│   ├── pages/
│   │   ├── Index.js        # Landing page with animations
│   │   ├── Home.js         # Main home page
│   │   ├── Science.js      # Science section
│   │   ├── Spirituality.js # Spirituality section
│   │   ├── Events.js       # Events listing
│   │   ├── Gallery.js      # Photo gallery
│   │   └── Overview.js     # About/Overview page
│   ├── styles/
│   │   └── Index.css       # Index page specific styles
│   ├── App.js              # Main app with routing
│   ├── App.css             # Global styles
│   ├── index.js            # Entry point
│   └── index.css           # Base styles
└── package.json
```

## Installation & Setup

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/
   - Verify installation: `node --version`

2. **Navigate to project directory**
   ```bash
   cd sns-react
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm start
   ```
   The app will open at http://localhost:3000

## Building for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build/` folder with optimized files ready for deployment.

## Key Components

### Header Component
- Responsive navigation
- Mobile menu toggle
- Customizable nav links

### Footer Component
- Contact information
- Copyright notice
- Consistent across all pages

### Page Components
Each page is self-contained with its own:
- Hero section
- Content sections
- Call-to-action areas

## Customization

### Adding Images
- Place images in `public/images/` or `public/members/`
- Reference in components as `/images/filename.jpg`

### Updating Content
- Edit page components in `src/pages/`
- Modify text, add sections, or adjust layouts

### Styling
- Global styles: `src/App.css`
- Page-specific styles: Import in component
- Use Tailwind classes for quick styling

## Routes

- `/` - Landing page with animations
- `/home` - Main home page
- `/science` - Science exploration
- `/spirituality` - Spirituality section
- `/events` - Events calendar
- `/gallery` - Photo gallery
- `/overview` - Club overview

## Technologies Used

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **GSAP** - Animation library
- **Google Fonts** - Typography

## Development Tips

1. **Hot Reload**: Changes auto-refresh during development
2. **Component Reuse**: Header/Footer shared across pages
3. **Routing**: Use `<Link>` from react-router-dom for navigation
4. **Styling**: Combine Tailwind classes with custom CSS

## Deployment

### Deploy to Vercel, Netlify, or GitHub Pages

1. Build the project: `npm run build`
2. Deploy the `build/` folder to your hosting service

### Environment Variables
Create `.env` file for environment-specific variables:
```
REACT_APP_API_URL=your_api_url
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

© 2025 SNS Club. All rights reserved.

## Contact

For questions or support:
- Email: founder@snsclub.org
- Website: [Your Website URL]

---

Built with ❤️ by the SNS Club community
