/**
 * Default configuration values for craft-favicon-generator.
 *
 * Users only need to override values that differ from these defaults
 * in their craft-favicon-generator.config.mjs file.
 */
export const defaults = {
	// Path to source PNG image (relative to project root)
	source: 'src/img/favicon-src.png',

	// Output directory for generated files (relative to project root)
	outputDir: 'web/dist/assets/favicons',

	// URL path prefix used in generated HTML tags and manifests
	pathPrefix: '/dist/assets/favicons',

	// Favicon library options (passed to favicons package)
	appDescription: '',
	developerName: '',
	developerURL: '',
	lang: 'en-US',
	background: '#fff',
	theme_color: '#fff',
	appleStatusBarStyle: 'black-translucent',
	display: 'minimal-ui',
	orientation: 'any',
	scope: '/',
	start_url: '/',
	version: '1.0',
	pixel_art: false,
	loadManifestWithCredentials: false,
	manifestMaskable: true,
	preferRelatedApplications: false,
	icons: {
		android: true,
		appleIcon: true,
		appleStartup: true,
		favicons: true,
		windows: true,
		yandex: true,
	},
}
