# Interactive Portfolio Website

A professional, game-like portfolio website featuring a circular photo that moves smoothly between sections when clicked.

## 📁 Folder Structure

```
portfolio/
│
├── index.html          # Main HTML file with all sections
├── style.css           # All styling and responsive design
├── script.js           # Interactive functionality
├── README.md           # This file
│
└── assets/
    └── images/
        ├── profile.jpg     # Your circular profile photo (recommended: 400x400px)
        ├── project-1.jpg   # Project thumbnail (recommended: 600x400px)
        ├── project-2.jpg   # Project thumbnail
        ├── project-3.jpg   # Project thumbnail
        └── project-4.jpg   # Project thumbnail
```

## 🚀 Getting Started

1. **Add your images:**
   - Place your profile photo at `assets/images/profile.jpg`
   - Add project screenshots as `project-1.jpg`, `project-2.jpg`, etc.
   - Recommended sizes:
     - Profile: 400x400px (square, will be cropped to circle)
     - Projects: 600x400px (landscape)

2. **Customize content:**
   - Open `index.html` and replace placeholder text
   - Update your name, title, and description in the hero section
   - Modify skills percentages and categories
   - Add your real projects with links
   - Update contact information and social links

3. **Open in browser:**
   - Simply double-click `index.html` or use a local server
   - For best experience, use VS Code Live Server extension

## ✨ Features

- **Interactive Floating Photo:** Click the circular photo to navigate between sections
- **Smooth Animations:** Transitions, hover effects, and scroll-triggered animations
- **Responsive Design:** Works on desktop, tablet, and mobile devices
- **Modern Design:** Clean, professional aesthetic suitable for recruiters
- **Keyboard Navigation:** Use arrow keys, Page Up/Down, Home/End
- **Skill Progress Bars:** Animated bars that fill on scroll
- **Project Cards:** Hover effects with overlay links
- **Contact Form:** Frontend-ready form (needs backend for actual submission)

## 🎨 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --primary-color: #6366f1;     /* Main accent color */
    --accent-color: #06b6d4;      /* Secondary accent */
    --text-primary: #1e293b;      /* Main text */
    --bg-primary: #ffffff;        /* Background */
}
```

### Photo Positions
Edit positions in `script.js`:
```javascript
const photoPositions = {
    hero: { top: '50%', left: '75%', ... },
    about: { top: '35%', left: '15%', ... },
    // Customize these values
};
```

### Fonts
Change fonts in `index.html` (Google Fonts) and `style.css`:
```css
:root {
    --font-primary: 'Inter', sans-serif;
    --font-display: 'Poppins', sans-serif;
}
```

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** Below 768px
- **Small Mobile:** Below 480px

## 🔧 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## 📝 TODO / Enhancements

- [ ] Add dark mode toggle
- [ ] Implement actual form submission (needs backend)
- [ ] Add loading animation
- [ ] Create additional project pages
- [ ] Add testimonials section
- [ ] Implement blog section

## 📄 License

Feel free to use this template for your personal portfolio!

---

**Happy coding!** 🎉
