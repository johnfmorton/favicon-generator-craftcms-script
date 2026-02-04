# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-02-04

### Added

- CLI command (`npx craft-favicon-generator`) that generates favicon assets from a single source PNG
- Config file support (`craft-favicon-generator.config.mjs`) with only `appName` required
- Sensible defaults for Craft CMS + Vite projects (output to `web/dist/assets/favicons`)
- Programmatic API via `import { generate } from '@johnfmorton/favicon-generator-craftcms'`
- Generates icons for all major platforms (Android, Apple, Windows, Yandex, desktop browsers)
- Generates `manifest.webmanifest`, `browserconfig.xml`, and `yandex-browser-manifest.json`
- Generates `webapp.html` containing all `<link>` and `<meta>` tags for use with Craft Vite plugin's `inline()` method
- Opportunistic dotenv loading for projects that use `.env` files

[Unreleased]: https://github.com/johnfmorton/favicon-generator-craftcms-script/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/johnfmorton/favicon-generator-craftcms-script/releases/tag/v0.1.0
