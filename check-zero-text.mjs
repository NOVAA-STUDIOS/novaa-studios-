import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(4000)

const data = await page.evaluate(() => {
  const motionEls = [...document.querySelectorAll('[style*="opacity"]')]
    .filter(el => el.style.opacity === '0' || el.style.opacity === '1')
    .slice(0, 30)
    .map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().slice(0, 40),
      inlineOpacity: el.style.opacity,
      computedOpacity: getComputedStyle(el).opacity,
      rectTop: el.getBoundingClientRect().top,
      inView: el.getBoundingClientRect().top < innerHeight && el.getBoundingStyle?.() ,
    }))

  const zeroText = [...document.querySelectorAll('h1,h2,h3,p,button,span,a')]
    .filter(el => {
      const cs = getComputedStyle(el)
      const r = el.getBoundingClientRect()
      const text = el.textContent?.trim()
      return text && text.length > 2 && parseFloat(cs.opacity) < 0.05 && r.width > 10 && r.height > 5
    })
    .map(el => ({
      tag: el.tagName,
      text: el.textContent.trim().slice(0, 50),
      opacity: getComputedStyle(el).opacity,
      top: el.getBoundingClientRect().top,
      inView: el.getBoundingClientRect().top < innerHeight && el.getBoundingClientRect().bottom > 0,
    }))

  return { zeroTextCount: zeroText.length, zeroText: zeroText.slice(0, 15), motionZeroCount: motionEls.filter(e => e.inlineOpacity === '0').length }
})

console.log(JSON.stringify(data, null, 2))
await browser.close()
