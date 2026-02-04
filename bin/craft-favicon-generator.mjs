#!/usr/bin/env node

import { resolve } from 'path'
import { pathToFileURL } from 'url'
import { defaults } from '../src/defaults.mjs'
import { generate } from '../src/generate.mjs'

// 1. Opportunistic dotenv loading
try {
	await import('dotenv/config')
} catch {}

// 2. Load config file
const configPath = resolve(process.cwd(), 'craft-favicon-generator.config.mjs')
let mod
try {
	mod = await import(pathToFileURL(configPath).href)
} catch (err) {
	if (err.code === 'ERR_MODULE_NOT_FOUND') {
		console.error(
			`Error: Config file not found: craft-favicon-generator.config.mjs

Create a config file in your project root:

  export default {
    appName: 'Your Site Name',
  }
`
		)
		process.exit(1)
	}
	throw err
}

const userConfig = mod.default

// 3. Validate required fields
if (!userConfig || typeof userConfig !== 'object') {
	console.error(
		`Error: craft-favicon-generator.config.mjs must export a default object.

  export default {
    appName: 'Your Site Name',
  }
`
	)
	process.exit(1)
}

if (!userConfig.appName || typeof userConfig.appName !== 'string') {
	console.error(
		`Error: "appName" is required in craft-favicon-generator.config.mjs.

  export default {
    appName: 'Your Site Name',
  }
`
	)
	process.exit(1)
}

// 4. Merge user config with defaults
const projectRoot = process.cwd()

// Separate path options from favicons options
const { source, outputDir, pathPrefix, icons, ...userFaviconOptions } =
	userConfig

const config = {
	source: resolve(projectRoot, source ?? defaults.source),
	outputDir: resolve(projectRoot, outputDir ?? defaults.outputDir),
	pathPrefix: pathPrefix ?? defaults.pathPrefix,
	faviconOptions: {
		appName: userConfig.appName,
		appShortName:
			userFaviconOptions.appShortName ?? userConfig.appName,
		appDescription:
			userFaviconOptions.appDescription ?? defaults.appDescription,
		developerName:
			userFaviconOptions.developerName ?? defaults.developerName,
		developerURL:
			userFaviconOptions.developerURL ?? defaults.developerURL,
		lang: userFaviconOptions.lang ?? defaults.lang,
		background: userFaviconOptions.background ?? defaults.background,
		theme_color: userFaviconOptions.theme_color ?? defaults.theme_color,
		appleStatusBarStyle:
			userFaviconOptions.appleStatusBarStyle ??
			defaults.appleStatusBarStyle,
		display: userFaviconOptions.display ?? defaults.display,
		orientation: userFaviconOptions.orientation ?? defaults.orientation,
		scope: userFaviconOptions.scope ?? defaults.scope,
		start_url: userFaviconOptions.start_url ?? defaults.start_url,
		version: userFaviconOptions.version ?? defaults.version,
		pixel_art: userFaviconOptions.pixel_art ?? defaults.pixel_art,
		loadManifestWithCredentials:
			userFaviconOptions.loadManifestWithCredentials ??
			defaults.loadManifestWithCredentials,
		manifestMaskable:
			userFaviconOptions.manifestMaskable ?? defaults.manifestMaskable,
		preferRelatedApplications:
			userFaviconOptions.preferRelatedApplications ??
			defaults.preferRelatedApplications,
		icons: {
			...defaults.icons,
			...icons,
		},
	},
}

// 5. Call core logic
try {
	const result = await generate(config)
	process.exit(result.failed > 0 ? 1 : 0)
} catch (error) {
	console.error('Error generating favicons:', error.message)
	process.exit(1)
}
