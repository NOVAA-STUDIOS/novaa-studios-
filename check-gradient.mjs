import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(4000)

const data = await page.evaluate(() => {
  const check = (sel) => {
    const el = document.querySelector(sel)
    if (!el) return null
    const cs = getComputedStyle(el)
    return {
      sel,
      text: el.textContent?.trim().slice(0, 40),
      opacity: cs.opacity,
      color: cs.color,
      webkitTextFillColor: cs.webkitTextFillColor,
      backgroundImage: cs.backgroundImage,
      backgroundClip: cs.backgroundClip,
      webkitBackgroundClip: cs.webkitBackgroundClip,
      visible: el.getBoundingClientRect().width > 0 && parseFloat(cs.opacity) > 0.5,
      inView: el.getBoundingClientRect().top < innerHeight && el.getBoundingClientRect().bottom > 0,
    }
  }
  return {
    heroH1: check('#home h1'),
    servicesH1: check('#services h1'),
    servicesP: check('#services p'),
    serviceCardTitle: check('#services h3'),
    serviceCardDesc: check('#services h3 + p'),
  }
})

console.log(JSON.stringify(data, null, 2))

// scroll services into view
await page.evaluate(() => document.querySelector('#services')?.scrollIntoView())
await page.waitForTimeout(1500)

const afterScroll = await page.evaluate(() => {
  const check = (sel) => {
    const el = document.querySelector(sel)
    const cs = getComputedStyle(el)
    return { sel, opacity: cs.opacity, webkitTextFillColor: cs.webkitTextFillColor, backgroundClip: cs.backgroundClip }
  }
  return {
    servicesH1: check('#services h1'),
    servicesP: check('#services p'),
    serviceCardDesc: check('#services h3 + p'),
  }
})
console.log('After services scroll:', JSON.stringify(afterScroll, null, 2))

await page.screenshot({ path: 'c:/Users/rohan/OneDrive/Documents/NOVAA/novaa-nexus/_screenshot.png', fullPage: false })
await browser.close()
