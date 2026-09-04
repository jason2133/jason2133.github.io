# Jason Jaeseung Lee — Academic Portfolio

This repository contains the static source for Jaeseung Lee's academic profile.

## Preview locally

Open `index.html` directly in a browser, or run a local static server from the
repository directory:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Design customization

The original Bootstrap theme remains in `css/styles.css`. The Korea University
crimson redesign is isolated in `css/ku-theme-v2.css`, which is loaded afterward.
Change the CSS variables at the top of that file to adjust the palette without
editing the page content.

## Version 2 — responsive navigation repair

- Desktop (1024px and wider): left profile sidebar with stacked section links.
- Smaller screens: compact top header with a collapsible Menu button.
- The new navigation uses independent class names, so Bootstrap's original
  desktop navbar rules cannot override its direction or size.
- `js/navigation-v2.js` handles the menu, active section, Escape key, and resizing
  without a Bootstrap JavaScript or CDN dependency.
- Existing biography, education, employment, publications, projects, awards, and
  academic-activity text is retained. Social profile links now have visible names.
- `css/ku-theme.css` and `js/scripts.js` are retained as inactive v1 files;
  `index.html` does not load them. Do not load both theme versions together.

## Apply the update

Extract the ZIP into a new folder for a local preview. For GitHub Pages, copy the
archive contents into the repository root (alongside the existing `index.html`),
then commit the updated files. Keep the `css`, `js`, and `assets` folders together.
No package installation or build step is required. If an old design remains
after deployment, reload without cache (Ctrl+Shift+R).
