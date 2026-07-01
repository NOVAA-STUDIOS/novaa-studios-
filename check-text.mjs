import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(3500)

const results = await page.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return { sel, found: false }
    const cs = getComputedStyle(el)
    const r = el.getBoundingClientRect()
    return {
      sel,
      found: true,
      text: el.textContent?.trim().slice(0, 60),
      opacity: cs.opacity,
      visibility: cs.visibility,
      display: cs.display,
      color: cs.color,
      webkitTextFillColor: cs.webkitTextFillColor,
      width: r.width,
      height: r.height,
      fontSize: cs.fontSize,
      maxWidth: cs.maxWidth,
    }
  }

  return [
    pick('#home h1'),
    pick('#home p'),
    pick('#home button'),
    pick('#services h1'),
    pick('#services p'),
    pick('#services h3'),
    pick('#about h1'),
    pick('#about p'),
    pick('footer p'),
    pick('.desktop-nav span'),
  ]
})

console.log(JSON.stringify(results, null, 2))
await browser.close()
