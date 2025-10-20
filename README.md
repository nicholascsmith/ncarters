# ncarters.com

Personal website for Nicholas Carter Smith - a minimal portfolio site with photo grid functionality.

## Overview

This is the public-facing website at [ncarters.com](https://ncarters.com). It displays a grid of posts (photos with optional audio tracks) similar to an Instagram-style feed.

## Features

- **Photo Grid**: Instagram-style grid layout with grayscale filter
- **Individual Post View**: Full-size post view with audio playback
- **Music Integration**: Posts can have associated audio tracks with song/artist info
- **Responsive Design**: Mobile-first responsive layout
- **Dark/Light Mode**: Automatic color scheme based on system preferences
- **Static Site**: Pure HTML/CSS/JS with no build process required

## Architecture

This website is **content-only** - all management happens through a separate dashboard:

- **Website Repository**: `nicholascsmith/ncarters` (this repo)
- **Dashboard Repository**: [ncarters-dashboard](https://github.com/nicholascsmith/ncarters-dashboard)
- **Data Source**: `posts.json` (managed by dashboard via GitHub API)

## How It Works

### Data Flow

```
Dashboard → GitHub API → posts.json → Website Reads → Display
```

1. Dashboard uploads/manages content via GitHub API
2. Website reads `posts.json` and displays content
3. No backend server required - purely static

## File Structure

```
ncarters/
├── index.html          # Homepage with post grid
├── post.html           # Individual post view
├── styles.css          # Website styles
├── _headers            # Security headers (Netlify/Cloudflare)
├── posts.json          # Post database (managed by dashboard)
├── data/
│   └── site.json       # Site configuration and links
├── js/
│   ├── config.js       # JavaScript configuration
│   ├── pages/
│   │   ├── home.js     # Homepage logic
│   │   └── post.js     # Post view logic
│   ├── components/
│   │   ├── postGrid.js # Post grid component
│   │   └── audioPlayer.js # Audio player component
│   ├── api/
│   │   └── github.js   # GitHub API utilities (for dashboard)
│   └── utils/          # Utility functions
└── media/              # Photos and audio files
    ├── profile.jpg     # Profile photo
    ├── photo*.jpg      # Post photos
    └── *.m4a          # Audio tracks
```

## Data Format

### `posts.json` Schema

```json
[
  {
    "file": "photob6f329db.jpg",
    "song": "Just the Two of Us",
    "artist": "Grover Washington, Jr. with Bill Withers",
    "audio": "grover_washington_jr_with_bill_withers-just_the_two_of_us.m4a"
  }
]
```

- `file` (required): Photo filename in `media/` directory
- `song` (optional): Song title
- `artist` (optional): Artist name
- `audio` (optional): Audio filename in `media/` directory

### `data/site.json`

Contains site metadata, social links, playlists, and payment information.

## Development

### Local Testing

```bash
# Serve the website locally
python3 -m http.server 3000

# Open in browser
open http://localhost:3000
```

### Making Changes

**To update content** (add/edit/delete posts):
- Use the [dashboard](https://github.com/nicholascsmith/ncarters-dashboard)
- Dashboard handles all content management via GitHub API

**To update website code** (design, features, layout):
- Edit files in this repository
- Test locally
- Commit and push changes

## Deployment

This site is deployed on **Netlify** (or similar static hosting):

- **Auto-deploy**: Pushes to `main` branch trigger automatic deployment
- **Custom domain**: ncarters.com
- **HTTPS**: Automatic SSL certificate
- **Headers**: Security headers configured via `_headers` file

### Deployment Configuration

The `_headers` file configures:
- Content Security Policy (CSP)
- CORS headers
- Cache control policies
- Security headers (X-Frame-Options, etc.)

## Design Philosophy

- **Simplicity**: Minimal, clean design with no unnecessary features
- **Performance**: Static files, no build process, fast loading
- **Privacy**: No tracking, no analytics, no external dependencies
- **Accessibility**: Semantic HTML, proper contrast, keyboard navigation

## Content Management

**Do not manually edit** `posts.json` or media files in this repository.

Use the [dashboard](https://github.com/nicholascsmith/ncarters-dashboard) to:
- Upload new posts
- Edit post metadata
- Delete posts
- Manage audio files

The dashboard handles all GitHub API interactions and ensures data integrity.

## Related Repositories

- **Dashboard**: [ncarters-dashboard](https://github.com/nicholascsmith/ncarters-dashboard) - Content management interface

## License

Personal project - All rights reserved
