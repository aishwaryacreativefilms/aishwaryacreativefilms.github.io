# Aishwarya Creative Films Website

This repository contains the source for the [Aishwarya Creative Films](https://www.aishwaryacreativefilms.com/) website. It is a small Jekyll site hosted on GitHub Pages and includes marketing material and privacy policies for our apps.

## Structure
- `index.html` – landing page with company overview.
- `magic-spell.html` – product page for the Magic Spelling iOS app.
- `magic-spell-privacy.html` – privacy policy dedicated to Magic Spelling.
- `privacy.html` – general privacy policy.
- `css/`, `images/`, and `js/` – static assets used across the site.

## Local development
1. Install [Ruby](https://www.ruby-lang.org/) and [Jekyll](https://jekyllrb.com/):
   ```bash
   gem install jekyll bundler
   ```
2. From the repository root, start a local server:
   ```bash
   jekyll serve
   ```
3. Open `http://localhost:4000` in your browser to preview the site.

## Linting
Run HTMLHint to check for markup issues:
```bash
npx --yes htmlhint .
```

## Contributing
Feel free to open issues or pull requests for improvements.
