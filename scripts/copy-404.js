import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const distIndex = join(process.cwd(), 'dist', 'index.html')
const dist404 = join(process.cwd(), 'dist', '404.html')

if (existsSync(distIndex)) {
  copyFileSync(distIndex, dist404)
  console.log('Copied dist/index.html -> dist/404.html (GitHub Pages SPA fallback)')
} else {
  console.warn('dist/index.html not found, skipping 404.html copy')
}
