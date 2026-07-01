import { chromium } from 'playwright'

for (const reduced of [false, true]) {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    reducedMotion: reduced ? 'reduce' : 'no-preference',
  })
  const page = await context.newPage()
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(4000)

  const data = await page.evaluate(() => ({
    heroH1: getComputedStyle(document.querySelector('#home h1')).opacity,
    heroP: getComputedStyle(document.querySelector('#home p')).opacity,
    servicesP: getComputedStyle(document.querySelector('#services p')).opacity,
    aboutH1: getComputedStyle(document.querySelector('#about h1')).opacity,
  }))
  console.log(`reducedMotion=${reduced}`, data)
  await browser.close()
}
