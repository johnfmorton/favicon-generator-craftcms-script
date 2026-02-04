# craft-favicon-generator

Generate a complete set of favicon and web app assets from a single source PNG image. Built for Craft CMS + Vite projects, but works anywhere.

Uses the [favicons](https://github.com/itgalaxy/favicons) package (v7+, built on `sharp`) to produce icons for every major platform, manifest files, and a ready-to-include HTML snippet.

## Installation

```bash
npm install craft-favicon-generator
```

## Quick Start

### 1. Create a Config File

Add `craft-favicon-generator.config.mjs` to your project root:

```javascript
export default {
  appName: 'Your Site Name',
}
```

That's it for the minimum config. All other options have sensible defaults for Craft CMS projects.

### 2. Add a Source Image

Place a high-resolution PNG (at least 512x512, ideally 1024x1024) at `src/img/favicon-src.png`, or set a custom `source` path in your config.

### 3. Run the Generator

```bash
npx craft-favicon-generator
```

## Configuration

Only `appName` is required. Everything else has defaults tuned for Craft CMS + Vite projects.

### Full Example

```javascript
export default {
  // Required
  appName: 'My Site',

  // Paths (relative to project root)
  source: 'src/img/favicon-src.png',       // default
  outputDir: 'web/dist/assets/favicons',    // default
  pathPrefix: '/dist/assets/favicons',      // default

  // App metadata
  appDescription: 'A short description of your site.',
  appShortName: 'MySite',                   // defaults to appName
  developerName: 'Your Name',
  developerURL: 'https://your-site.com',

  // Appearance
  background: '#fff',
  theme_color: '#fff',

  // Platform toggles (all true by default)
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    favicons: true,
    windows: true,
    yandex: false,
  },
}
```

### Default Values

| Option | Default | Description |
|---|---|---|
| `source` | `src/img/favicon-src.png` | Path to source PNG image |
| `outputDir` | `web/dist/assets/favicons` | Where generated files are written |
| `pathPrefix` | `/dist/assets/favicons` | URL path prefix in generated HTML/manifests |
| `appDescription` | `''` | App description for manifests |
| `appShortName` | value of `appName` | Short name for home screen |
| `background` | `#fff` | Background color for splash screens |
| `theme_color` | `#fff` | Browser toolbar color on mobile |
| `lang` | `en-US` | Language |
| `display` | `minimal-ui` | PWA display mode |
| `icons.android` | `true` | Generate Android icons |
| `icons.appleIcon` | `true` | Generate Apple Touch icons |
| `icons.appleStartup` | `true` | Generate Apple startup images |
| `icons.favicons` | `true` | Generate standard favicons |
| `icons.windows` | `true` | Generate Windows tile images |
| `icons.yandex` | `true` | Generate Yandex browser assets |

See the [favicons documentation](https://github.com/itgalaxy/favicons#usage) for additional options.

## Craft CMS Integration

The generator produces a `webapp.html` file containing all `<link>` and `<meta>` tags. Use the [Craft Vite plugin](https://nystudio107.com/docs/vite/)'s `inline()` method to embed it in your template's `<head>`:

```twig
<head>
  {# Favicons, webapp manifests, etc. #}
  {{ craft.vite.inline("@webroot/dist/assets/favicons/webapp.html") }}
</head>
```

Without the Craft Vite plugin:

```twig
{{ source('@webroot/dist/assets/favicons/webapp.html', ignore_missing = true) }}
```

## Programmatic API

```javascript
import { generate } from 'craft-favicon-generator'

const result = await generate({
  source: '/absolute/path/to/favicon-src.png',
  outputDir: '/absolute/path/to/output',
  pathPrefix: '/dist/assets/favicons',
  faviconOptions: {
    appName: 'My App',
    background: '#fff',
    theme_color: '#fff',
    icons: { android: true, appleIcon: true, favicons: true },
  },
})

console.log(result)
// { images: 25, files: 3, html: 1, failed: 0 }
```

When using the programmatic API, all paths must be absolute. The `faviconOptions` object is passed directly to the [favicons](https://github.com/itgalaxy/favicons) package.

## Environment Variables

The CLI will load a `.env` file if [dotenv](https://www.npmjs.com/package/dotenv) is installed in your project. This is optional and not a hard dependency.

## When to Run

Favicons only need to be regenerated when:

- You change the source image
- You update app metadata (name, colors, etc.)
- You update the `favicons` npm package

There is no need to run this on every build.

## License

MIT
