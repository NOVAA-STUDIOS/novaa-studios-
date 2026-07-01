import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(3000)

const beforeScroll = await page.evaluate(() => {
  const inspect = (selector) => {
    const el = document.querySelector(selector)
    if (!el) return null
    const r = el.getBoundingClientRect()
    const cs = getComputedStyle(el)
    return {
      selector,
      opacity: cs.opacity,
      rect: { top: r.top, bottom: r.bottom, height: r.height },
      inViewport: r.top < window.innerHeight && r.bottom > 0,
      tag: el.tagName,
      inlineOpacity: el.style.opacity,
    }
  }
  return {
    servicesHeadingWrap: inspect('#services h1')?.inlineOpacity,
    servicesP: inspect('#services > div > p') || inspect('#services p'),
    aboutH1: inspect('#about h1'),
    aboutP: inspect('#about p'),
    viewport: { h: window.innerHeight, scrollY: window.scrollY },
  }
})

console.log('Before scroll:', JSON.stringify(beforeScroll, null, 2))

await page.evaluate(() => {
  document.querySelector('#about')?.scrollIntoView({ behavior: 'instant' })
})
await page.waitForTimeout(1500)

const afterAboutScroll = await page.evaluate(() => {
  const inspect = (selector) => {
    const el = document.querySelector(selector)
    if (!el) return null
    const r = el.getBoundingClientRect()
    return {
      selector,
      opacity: getComputedStyle(el).opacity,
      inlineOpacity: el.style.opacity,
      inViewport: r.top < window.innerHeight && r.bottom > 0,
      rect: { top: r.top, bottom: r.bottom },
    }
  }
  return {
    aboutH1: inspect('#about h1'),
    aboutP: inspect('#about p'),
    servicesP: inspect('#services p'),
    scrollY: window.scrollY,
  }
})

console.log('After about scroll:', JSON.stringify(afterAboutScroll, null, 2))
await browser.close()
