# John Chesiro Cheptai — Portfolio

A responsive personal portfolio and virtual CV showcasing selected projects, interests, skills and contact links.

## Features
- Responsive homepage with About, Skills, Projects and Contact sections
- Dedicated CV page at `cv.html`
- Mobile navigation
- Project links to GitHub repositories
- Accessible semantic HTML and reduced-motion support
- No build step or framework required

## Run locally
Open `index.html` in a browser, or serve the folder with any static web server.

## Deploy
This is a static website. It can be deployed on Vercel, GitHub Pages, Netlify or any static hosting provider. For Vercel, use the repository root as the project root and leave the build command and output directory empty/default for static files.

## Files
- `index.html` — homepage
- `styles.css` — layout, theme and responsive styles
- `script.js` — mobile navigation and footer year
- `cv.html` — virtual CV

## Personal links
- GitHub: https://github.com/johnnychess43
- LinkedIn: https://www.linkedin.com/in/john-chesiro-cheptai-20510140b/


## Portfolio content

The homepage now includes the five repositories currently visible in the owner's GitHub account:
- [Biashara Smart AI](https://github.com/johnnychess43/biashara-smart-ai)
- [Mbale High Website](https://github.com/johnnychess43/mbale-high-website)
- [Ushirika Journalism Club](https://github.com/johnnychess43/ushirika-journalism-club)
- [Jarvis Android](https://github.com/johnnychess43/Jarvis-Android)
- [CHESSY SCHOOLS](https://github.com/johnnychess43/CHESSY-SCHOOLS-)

It also highlights the Ashes of the Forgotten Kingdom game prototype and two school science projects (Flood Detector and Natural pH Indicator). These are presented as prototypes/projects, not as published GitHub repositories.

## Add a future project

In `index.html`, copy one existing `<article class="project-card">...</article>` block inside `.projects-grid`, then update its title, description, artwork class, and destination link. The two dashed **Future project** cards are visual placeholders and can be replaced with real project cards when new work is ready.

The ambient technology video is muted, loops automatically, and has a still-image fallback. Browsers may block autoplay in some circumstances; the dark gradient overlay keeps the page readable if the video does not play.
