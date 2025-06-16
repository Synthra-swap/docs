# Synthra Protocol GitBook Theme Assets

This directory contains assets for the Synthra Protocol GitBook theme.

## Required Assets

To complete the theme setup, add the following assets to this directory:

### Logos and Icons
- `synthra-logo.svg` - Main Synthra logo (SVG format, white/transparent)
- `synthra-logo.png` - Main Synthra logo (PNG format, for fallbacks)
- `favicon.ico` - Favicon (32x32 ICO format)
- `favicon-16x16.png` - Small favicon (16x16 PNG)
- `favicon-32x32.png` - Medium favicon (32x32 PNG)
- `apple-touch-icon.png` - Apple touch icon (180x180 PNG)
- `safari-pinned-tab.svg` - Safari pinned tab icon (SVG, monochrome)

### Social Media Images
- `synthra-og-image.png` - Open Graph image (1200x630 PNG)
- `synthra-twitter-card.png` - Twitter card image (1200x675 PNG)

### Background Images (Optional)
- `hero-bg.svg` - Hero section background
- `pattern-bg.svg` - Subtle background pattern

### Manifest Files
- `site.webmanifest` - Web app manifest
- `browserconfig.xml` - Microsoft browser configuration

## Generating Assets

### Logo Creation
Create logos with the following specifications:
- **Primary Color**: #8B5CF6 (Purple)
- **Secondary Color**: #EC4899 (Pink)
- **Background**: Transparent or #0f0f23 (Dark)

### Favicon Generation
Use tools like:
- [Favicon.io](https://favicon.io/)
- [RealFaviconGenerator](https://realfavicongenerator.net/)

### Social Media Images
Dimensions:
- **Open Graph**: 1200x630px
- **Twitter Card**: 1200x675px
- Include Synthra branding and brief description

## Example site.webmanifest

```json
{
  "name": "Synthra Protocol Documentation",
  "short_name": "Synthra Docs",
  "description": "Complete documentation for Synthra Protocol",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#8b5cf6",
  "background_color": "#0f0f23",
  "icons": [
    {
      "src": "/assets/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "/assets/favicon-32x32.png", 
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "/assets/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png"
    }
  ]
}
```

## Integration

Once assets are added, update the `book.json` file to reference them:

```json
{
  "variables": {
    "logo": "/assets/synthra-logo.svg",
    "favicon": "/assets/favicon.ico",
    "appleTouchIcon": "/assets/apple-touch-icon.png"
  }
}
```
