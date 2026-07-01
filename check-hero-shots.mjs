import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })

// Immediate snapshot
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' })
await page.screenshot({ path: 'c:/Users/rohan/OneDrive/Documents/NOVAA/novaa-nexus/_hero-0ms.png' })

await page.waitForTimeout(500)
await page.screenshot({ path: 'c:/Users/rohan/OneDrive/Documents/NOVAA/novaa-nexus/_hero-500ms.png' })

await page.waitForTimeout(3500)
await page.screenshot({ path: 'c:/Users/rohan/OneDrive/Documents/NOVAA/novaa-nexus/_hero-4s.png' })

const op = await page.evaluate(() => ({
  h1: getComputedStyle(document.querySelector('#home h1')).opacity,
  p: getComputedStyle(document.querySelector('#home p')).opacity,
}))
console.log('At 4s:', op)
await browser.close()
