# SNS Club - React Conversion Setup Guide

## 🎯 What's Changed?

Your SNS Club website has been converted from static HTML to a modern React application with the following improvements:

### ✨ Key Features
- **Component-Based Architecture**: Reusable Header and Footer components
- **Client-Side Routing**: Fast navigation with React Router
- **Modern Build System**: Optimized performance and code splitting
- **Easy Maintenance**: Update content once, see changes everywhere
- **Better Developer Experience**: Hot reload during development
- **Production Ready**: Optimized builds for deployment

## 📁 Project Structure

```
sns-react/
├── public/
│   ├── index.html          # HTML template
│   ├── images/             # Your image assets (you'll add these)
│   └── members/            # Member photos (you'll add these)
│
├── src/
│   ├── components/
│   │   ├── Header.js       # Shared navigation header
│   │   └── Footer.js       # Shared footer
│   │
│   ├── pages/
│   │   ├── Index.js        # Landing page with animations
│   │   ├── Home.js         # Main home page
│   │   ├── Science.js      # Science section
│   │   ├── Spirituality.js # Spirituality section
│   │   ├── Events.js       # Events listing
│   │   ├── Gallery.js      # Photo gallery
│   │   └── Overview.js     # About/Overview
│   │
│   ├── styles/
│   │   └── Index.css       # Landing page styles
│   │
│   ├── App.js              # Main app with routing
│   ├── App.css             # Global styles
│   ├── index.js            # Entry point
│   └── index.css           # Base styles
│
├── package.json            # Dependencies
├── README.md               # Documentation
└── setup.sh                # Quick start script
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

### Step 1: Install Node.js
If you haven't already, download and install Node.js:
- Visit: https://nodejs.org/
- Download the LTS (Long Term Support) version
- Follow the installation wizard
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### Step 2: Install Dependencies
Open terminal/command prompt in the `sns-react` folder and run:

```bash
npm install
```

This will install:
- React & React DOM
- React Router
- GSAP (animation library)
- Development tools

### Step 3: Start Development Server
```bash
npm start
```

Your app will automatically open in the browser at:
**http://localhost:3000**

## 🎨 Adding Your Content

### 1. Add Images
Copy your images to:
```
public/
├── images/           # General images
└── members/          # Team member photos
```

Then reference them in components:
```jsx
<img src="/images/your-image.jpg" alt="Description" />
<img src="/members/member1.jpg" alt="Member name" />
```

### 2. Update Text Content
Edit the page files in `src/pages/`:

**Example: Updating the founder's name**
Open `src/pages/Home.js` and find:
```jsx
<p className="text-gray-500 mt-1">- [Your Name], Founder</p>
```
Replace `[Your Name]` with the actual name.

### 3. Update Events
In `src/pages/Events.js`, find the `upcomingEvents` array:
```jsx
const upcomingEvents = [
  {
    month: 'NOV',
    day: '01',
    title: 'Your Event Title',
    // ... other fields
  }
];
```

## 🎯 Development Workflow

### Making Changes
1. Edit files in `src/` folder
2. Save the file
3. Browser automatically refreshes with changes
4. No need to restart the server!

### Testing
- Test on different screen sizes (mobile, tablet, desktop)
- Check all navigation links work
- Verify images load correctly

## 📦 Building for Production

When ready to deploy:

```bash
npm run build
```

This creates an optimized `build/` folder with:
- Minified JavaScript
- Optimized CSS
- Compressed images
- Production-ready code

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)
1. Push code to GitHub
2. Import repository on vercel.com
3. Vercel auto-deploys on every push

### Option 2: Netlify
1. Drag `build/` folder to netlify.com
2. Or connect GitHub repository
3. Auto-deploys on push

### Option 3: GitHub Pages
```bash
npm install gh-pages --save-dev
```

Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/sns-club",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Then run:
```bash
npm run deploy
```

## 🔧 Customization Guide

### Changing Colors
Edit Tailwind classes in components:
- `bg-[#81b29a]` - Sage green
- `text-[#3d405b]` - Deep indigo
- `bg-[#e07a5f]` - Coral
- `bg-[#f2cc8f]` - Warm yellow

### Adding New Pages
1. Create new file in `src/pages/`, e.g., `Contact.js`
2. Add route in `src/App.js`:
```jsx
<Route path="/contact" element={<Contact />} />
```
3. Add link in navigation

### Modifying Animations
GSAP animations are in `src/pages/Index.js`
- Adjust timing with `duration`
- Change easing with `ease`
- Modify repetition with `repeat`

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Try a different port
PORT=3001 npm start
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Build Errors
```bash
# Clear cache and rebuild
npm run build -- --reset-cache
```

## 📚 Learning Resources

### React
- Official Docs: https://react.dev
- Tutorial: https://react.dev/learn

### React Router
- Docs: https://reactrouter.com

### Tailwind CSS
- Docs: https://tailwindcss.com
- Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet

## 🎓 Next Steps

1. **Add Real Content**: Replace placeholder text and images
2. **Connect Backend**: Add form submissions, database integration
3. **Add Features**: Search, filtering, user authentication
4. **Optimize**: Lazy loading, code splitting, caching
5. **Monitor**: Add analytics (Google Analytics, etc.)

## 🆘 Getting Help

If you encounter issues:
1. Check console for errors (F12 in browser)
2. Read error messages carefully
3. Search for solutions online
4. Check React and React Router documentation

## ✅ Checklist Before Launch

- [ ] All placeholder text replaced
- [ ] Images added and optimized
- [ ] Navigation links tested
- [ ] Mobile responsiveness verified
- [ ] Forms working (if any)
- [ ] Contact information updated
- [ ] SEO meta tags added
- [ ] Performance tested
- [ ] Cross-browser tested

## 🎉 You're Ready!

Your SNS Club website is now a modern React application. Start by running:

```bash
npm start
```

Happy coding! 🚀

---

**Questions?** Reach out to the development team or check the documentation.
