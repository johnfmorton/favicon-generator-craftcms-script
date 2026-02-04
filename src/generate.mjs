/**
 * Core favicon generation logic.
 *
 * Accepts a fully resolved config object and generates all favicon assets,
 * manifest files, and an HTML snippet file.
 *
 * @param {object} config
 * @param {string} config.source - Absolute path to the source PNG image
 * @param {string} config.outputDir - Absolute path to the output directory
 * @param {string} config.pathPrefix - URL path prefix for generated references
 * @param {object} config.faviconOptions - Options passed to the favicons package
 * @returns {Promise<{images: number, files: number, html: number, failed: number}>}
 */
import favicons from 'favicons'
import { mkdir, writeFile, rm } from 'fs/promises'
import { dirname, join } from 'path'

export async function generate(config) {
	const { source, outputDir, pathPrefix, faviconOptions } = config

	console.log('Generating favicons...\n')
	console.log(`Source: ${source}`)
	console.log(`Output: ${outputDir}`)
	console.log(`Path prefix: ${pathPrefix}\n`)

	// Clean output directory
	try {
		await rm(outputDir, { recursive: true })
		console.log('Cleaned previous favicon output directory')
	} catch {
		// Directory doesn't exist, that's fine
	}

	// Create output directory
	await mkdir(outputDir, { recursive: true })

	// Generate favicons
	const response = await favicons(source, {
		path: pathPrefix,
		...faviconOptions,
	})

	// Write image files
	let imageCount = 0
	for (const image of response.images) {
		const filePath = join(outputDir, image.name)
		await mkdir(dirname(filePath), { recursive: true })
		await writeFile(filePath, image.contents)
		imageCount++
	}
	console.log(`Generated ${imageCount} image files`)

	// Write manifest/config files
	let fileCount = 0
	for (const file of response.files) {
		const filePath = join(outputDir, file.name)
		await mkdir(dirname(filePath), { recursive: true })
		await writeFile(filePath, file.contents)
		fileCount++
	}
	console.log(`Generated ${fileCount} manifest/config files`)

	// Generate webapp.html with all the HTML tags
	const webappHtml = response.html.join('\n')
	await writeFile(join(outputDir, 'webapp.html'), webappHtml)
	console.log('Generated webapp.html')

	console.log('\nFavicon generation complete!')

	// List generated files
	console.log('\nGenerated files:')
	response.images.forEach((img) => console.log(`  - ${img.name}`))
	response.files.forEach((file) => console.log(`  - ${file.name}`))
	console.log('  - webapp.html')

	return {
		images: imageCount,
		files: fileCount,
		html: 1,
		failed: 0,
	}
}
