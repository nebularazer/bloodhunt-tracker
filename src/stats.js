const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


const defaultOptions = {
  // playerId: '2161482834880289651',  // TTVEttnix
  playerId: '3274030920083041469',  // TheSpudHunter
  stats: ['kills', 'wins'],
  winStreak: true,
  playlist: 'Bloodhunt_Ranked',
}

async function loadStats(chromePath = '/usr/bin/chromium-browser', options = defaultOptions) {
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chromePath,
  })
  const page = await browser.newPage()
  // BASIC STATS
  await page.goto(`https://api.tracker.gg/api/v2/bloodhunt/standard/profile/sharkmob/${options.playerId}`)
  // await page.waitForTimeout(5000)
  const content = await page.evaluate(() => document.body.innerText);
  const data = JSON.parse(content)

  const stats = options.stats.reduce((a, v) => ({...a, [v]: '0'}), {})
  for (const segment of data.data.segments) {
    if (segment.attributes.mode === "All" && segment.attributes.playlist === options.playlist) {
      for (const stat of options.stats) {
        stats[stat] = segment.stats[stat].displayValue
      }
    }
  }

  if (options.winStreak) {
    // MATCHES
    await page.goto(`https://api.tracker.gg/api/v2/bloodhunt/standard/matches/sharkmob/${options.playerId}?playlist=${options.playlist}`)
    const content = await page.evaluate(() => document.body.innerText);
    const data = JSON.parse(content)

    stats['currentWinStreak'] = 0;
    for (const match of data.data.matches) {
      if (match.segments[0].metadata.hasWon) {
        stats['currentWinStreak']++
      } else {
        break
      }
    }
    stats['currentWinStreak'] = stats['currentWinStreak'].toString()
  }

  await browser.close()

  return stats
}

module.exports = { loadStats }
