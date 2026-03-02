# Rhythmic Ribbon of Texas - Landing Website

## Live Site
**URL:** (to be added)

## Development

### Prerequisites
- Node.js (for local development if needed)
- Python 3 (for local server)

### Running Locally
```bash
cd RRT-landing
python3 -m http.server 3005
```
Then open http://localhost:3005

### Adding Media Files

This repository uses `.gitignore` for large media files. To fully deploy:

1. **Copy the media folder:**
   - Source: `Desktop/rrt-media/` 
   - Destination: `assets/rrt-media/`

2. **Structure:**
   ```
   assets/rrt-media/
   ├── apparatus-videos/  (5 mp4 videos)
   ├── art/              (home-page-video.mp4)
   ├── awards/           (11 photos)
   ├── backgrounds/      (7 images)
   ├── ballet/          (3-6 photos)
   ├── ella/            (ella-photo.png)
   └── flexibility/     (8 photos)
   ```

### Tech Stack
- Static HTML/CSS/JS
- No build step required

---

*Last updated: 2026-03-02*
