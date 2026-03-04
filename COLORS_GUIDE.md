# 🎨 How to Change Website Colors & Images

## Quick Start

All colors and the hero background image are controlled from **one file**:

### `src/app/variables.css`

Open this file to change your entire website's color scheme:

```css
:root {
  /* Color Variables - Change these to update entire website */
  --color-primary: #270A09;      /* Main color (headings, footer, backgrounds) */
  --color-secondary: #720E07;    /* Secondary color (borders, gradients) */
  --color-accent: #C3130B;       /* Accent color (hover states) */
  --color-highlight: #E94D1A;    /* Highlight color (buttons, icons, links) */
  
  /* Hero Background Image - Change this URL to update hero images */
  --hero-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80');
}
```

---

## Changing Colors

### Example: Blue Theme

Replace the colors with:

```css
:root {
  --color-primary: #1e3a5f;      /* Dark blue */
  --color-secondary: #2c5282;    /* Medium blue */
  --color-accent: #4299e1;       /* Bright blue */
  --color-highlight: #63b3ed;    /* Light blue */
}
```

### Example: Green Theme

```css
:root {
  --color-primary: #1a472a;      /* Dark green */
  --color-secondary: #2d5a3d;    /* Medium green */
  --color-accent: #48bb78;       /* Bright green */
  --color-highlight: #81e6d9;    /* Teal */
}
```

### Example: Purple Theme

```css
:root {
  --color-primary: #2d1b4e;      /* Dark purple */
  --color-secondary: #553c9a;    /* Medium purple */
  --color-accent: #9f7aea;       /* Light purple */
  --color-highlight: #d6bcfa;    /* Lavender */
}
```

---

## Changing Hero Background Image

Replace the `--hero-image` URL with any image:

```css
:root {
  /* Office image */
  --hero-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80');
}
```

### More Image Options:

**Team Collaboration:**
```css
--hero-image: url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80');
```

**Technology/Code:**
```css
--hero-image: url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80');
```

**Business Meeting:**
```css
--hero-image: url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80');
```

**Creative Workspace:**
```css
--hero-image: url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=80');
```

---

## Tips

1. **Test colors**: Use a color picker tool to find hex codes
2. **Contrast**: Make sure text is readable on colored backgrounds
3. **Consistency**: Use colors that match your brand/logo
4. **Image size**: Use images at least 1920px wide for best quality
5. **Reload**: After changing variables.css, refresh your browser

---

## What Changes When You Update Colors?

✅ Navigation links
✅ Buttons
✅ Icons
✅ Headings
✅ Footer
✅ Hero sections
✅ Pricing cards
✅ CTAs
✅ Form focus states
✅ Hover effects

**Everything updates automatically!**

---

## Need Help?

Edit: `src/app/variables.css`

That's the only file you need to change for global color/image updates!
