# igor-hoc-cruz.github.io

Personal portfolio of **Igor Henrique de Oliveira Cruz**: digital marketing, CRM,
automation and applied AI.

- English: https://igor-hoc-cruz.github.io/
- Português: https://igor-hoc-cruz.github.io/pt/

## How it is built

Static HTML, CSS and a little JavaScript, served by GitHub Pages from `main`.
The two pages are generated from one template so both languages always match.

| Path | What it holds |
|---|---|
| `src/content.mjs` | Every word on the site, in English and Portuguese, and the nine cases |
| `src/template.mjs` | Page structure (header, hero, work, toolbox, principles, contact) |
| `assets/site.css` | The visual system (see below) |
| `assets/site.js` | Dark mode, copy email, case keys, filters, spatial tilt |
| `build.mjs` | Writes `index.html` and `pt/index.html` |

To change the site, edit the files above, then run:

```bash
node build.mjs
```

and commit the generated pages together with the sources.

## Visual system

Four materials, each with one job:

- **Neumorphism**: the ground. Panels, trays and switches are molded from the same plastic.
- **Claymorphism**: things with volume you can press: buttons, knobs, chips, the clay shapes.
- **Glassmorphism**: things that float: the header, the lead board and the contact window.
- **Spatial UI**: depth. Glass windows tilt toward the pointer and cases lift on hover.
  All motion is user-driven and switches off with "reduce motion".

Text never depends on a shadow or on glass for contrast; focus is always visible.
Cases are shared without client data.
