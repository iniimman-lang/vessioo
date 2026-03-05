# Global Text Size Control Guide

## Overview
All text sizes across the website are now controlled using **rem**, **em**, and **percentage-based** units. This allows you to adjust all text sizes globally through CSS variables.

## How to Adjust All Text Sizes

### Method 1: Global Base Font Size (Recommended)

Edit `src/app/variables.css` to change the base font size:

```css
:root {
  /* Adjust this value to scale ALL text */
  --base-font-size: 100%;  /* Default: 16px base */
}

/* Mobile text sizes (automatically applied) */
@media (max-width: 768px) {
  :root {
    --base-font-size: 87.5%;  /* ~14px base on tablets */
  }
}

@media (max-width: 480px) {
  :root {
    --base-font-size: 81.25%;  /* ~13px base on phones */
  }
}
```

**Quick Reference:**
- `100%` = 16px base (default)
- `87.5%` = 14px base
- `81.25%` = 13px base
- `75%` = 12px base
- `112.5%` = 18px base
- `125%` = 20px base

### Method 2: Per-Element Responsive Classes

All pages now use Tailwind's responsive classes:
- `text-sm` = 0.875rem (14px)
- `text-base` = 1rem (16px)
- `text-lg` = 1.125rem (18px)
- `text-xl` = 1.25rem (20px)
- `text-2xl` = 1.5rem (24px)
- `text-3xl` = 1.875rem (30px)
- `text-4xl` = 2.25rem (36px)

**Usage Pattern:**
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>
<p className="text-sm sm:text-base md:text-lg">
  Responsive paragraph
</p>
```

## CSS Variables Used

### In `src/app/variables.css`:
- `--base-font-size`: Controls the root font size (percentage)

### In `src/app/globals.css`:
- All headings (h1-h6) use `clamp()` for fluid sizing
- Paragraphs use `rem` units
- Margins use `em` units for proportional spacing

## Files Modified

1. **`src/app/variables.css`** - Global font size control
2. **`src/app/globals.css`** - Typography scale with rem/em
3. **`tailwind.config.css`** - Tailwind theme configuration
4. **All page files** - Updated with responsive text classes:
   - `src/app/page.tsx` (Home)
   - `src/app/about/page.tsx`
   - `src/app/contact/page.tsx`
   - `src/app/services/page.tsx`
   - `src/app/team/page.tsx`
   - `src/app/projects/page.tsx`
   - `src/app/reviews/page.tsx`
   - `src/app/admin/dashboard/page.tsx`

## Mobile-First Approach

Text sizes automatically scale down on smaller screens:
- **Desktop (>768px)**: 100% base size
- **Tablet (480px - 768px)**: 87.5% base size
- **Mobile (<480px)**: 81.25% base size

## Example: Making All Text 20% Smaller

Edit `src/app/variables.css`:

```css
:root {
  --base-font-size: 80%;  /* Was 100% */
}

@media (max-width: 768px) {
  :root {
    --base-font-size: 70%;  /* Was 87.5% */
  }
}

@media (max-width: 480px) {
  :root {
    --base-font-size: 65%;  /* Was 81.25% */
  }
}
```

## Example: Making All Text 10% Larger

Edit `src/app/variables.css`:

```css
:root {
  --base-font-size: 110%;  /* Was 100% */
}

@media (max-width: 768px) {
  :root {
    --base-font-size: 95%;  /* Was 87.5% */
  }
}

@media (max-width: 480px) {
  :root {
    --base-font-size: 87.5%;  /* Was 81.25% */
  }
}
```

## Benefits

1. **Single Source of Truth**: Change `--base-font-size` to scale everything
2. **Responsive by Default**: Mobile text is automatically smaller
3. **Accessible**: Uses relative units (rem/em) for better accessibility
4. **Maintainable**: No hardcoded pixel values scattered throughout
5. **Flexible**: Can still override individual elements when needed
